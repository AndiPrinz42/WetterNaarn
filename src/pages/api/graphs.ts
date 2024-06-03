import type { APIRoute } from "astro";
import { Database } from "../../scripts/database";
import { type GraphData, getDummyGraphData } from "../../scripts/models/graphs.model";
import * as unitConverter from "../../scripts/unitConverter";
import * as utils from "../../scripts/utils";

interface SingleSensorRow {
  dateTime: number[];
  outTemp: number[];
  appTemp: number[];
  dewpoint: number[];
  outHumidity: number[];
  barometer: number[];
  windspeed: number[];
  windDir: number[];
  rain: number[];
}

interface DayCommonSensorRow {
  average: number[];
  min: number[];
  max: number[];
}

export const GET: APIRoute = async ({ params, request }) => {
  const searchParams = new URLSearchParams(new URL(request.url).search);
  const from = Number(searchParams.get("from"));
  const to = Number(searchParams.get("to"));
  if (!from || !to || isNaN(from) || isNaN(to) || from > to) {
    return new Response(JSON.stringify({ error: "invalid parameters" }), { status: 400 });
  }
  const data = await getData(from, to);
  return new Response(JSON.stringify(data));
};

async function getData(from: number, to: number): Promise<GraphData> {
  const db = new Database();

  const minValues = 288;
  const intervalSingle = 300;
  const threshold = 86400;

  const stepSize = calculateStepSize((to - from) / intervalSingle, minValues);
  const dataSpacing = stepSize * intervalSingle;

  if (dataSpacing < threshold) {
    console.log("Single data");
    return await calculateWSingleData(db, from, to, intervalSingle, minValues);
  }
  console.log("Day data");
  return await calculateWDayData(db, from, to, minValues);
}

function calculateStepSize(length: number, recommendedLength: number): number {
  let stepsize = Math.round(length / recommendedLength);
  if (stepsize === 0) {
    stepsize = 1;
  }
  return stepsize;
}

async function calculateWSingleData(db: Database, from: number, to: number, interval: number, minValues: number): Promise<GraphData> {
  const data = getDummyGraphData();
  const sensors = ["outTemp", "appTemp", "dewpoint", "outHumidity", "barometer", "windspeed", "windDir", "rain"];
  const singleData = await getDataSensors(db, sensors, from, to);
  if (singleData.dateTime.length === 0) {
    return data;
  }

  data.outTempMin = (await getDayMin(db, "outTemp", from, to)).map((value) => unitConverter.fahrenheitToCelsius(value, 1));
  data.outTempMax = (await getDayMax(db, "outTemp", from, to)).map((value) => unitConverter.fahrenheitToCelsius(value, 1));
  data.appTempMin = (await getDayMin(db, "appTemp", from, to)).map((value) => unitConverter.fahrenheitToCelsius(value, 1));
  data.appTempMax = (await getDayMax(db, "appTemp", from, to)).map((value) => unitConverter.fahrenheitToCelsius(value, 1));
  data.dewpointMin = (await getDayMin(db, "dewpoint", from, to)).map((value) => unitConverter.fahrenheitToCelsius(value, 1));
  data.dewpointMax = (await getDayMax(db, "dewpoint", from, to)).map((value) => unitConverter.fahrenheitToCelsius(value, 1));
  data.outHumidityMin = (await getDayMin(db, "outHumidity", from, to)).map((value) => utils.round(value, 0));
  data.outHumidityMax = await (await getDayMax(db, "outHumidity", from, to)).map((value) => utils.round(value, 0));
  data.barometerMin = (await getDayMin(db, "barometer", from, to)).map((value) => unitConverter.inHgToHpa(value, 1));
  data.barometerMax = await (await getDayMax(db, "barometer", from, to)).map((value) => unitConverter.inHgToHpa(value, 1));
  data.windspeedMax = (await getDayMax(db, "windGust", from, to)).map((value) => unitConverter.mphToKmh(value, 1));

  const valDatetimes = singleData.dateTime;
  const genDatetimes = generateDatetimes(valDatetimes[0], valDatetimes[valDatetimes.length - 1], interval);
  const shortenedDatetimes = shorten(genDatetimes, minValues);

  if (new Date(valDatetimes[0] * 1000).getFullYear() === new Date(valDatetimes[valDatetimes.length - 1] * 1000).getFullYear()) {
    data.dateTime = shortenedDatetimes.map((value) => utils.formatDateDDMMHHMM(new Date(value * 1000)));
  } else {
    data.dateTime = shortenedDatetimes.map((value) => utils.formatDateDDMMYYHHMM(new Date(value * 1000)));
  }

  data.outTemp = assignShortenAvgConvert(genDatetimes, singleData.outTemp, valDatetimes, minValues, unitConverter.fahrenheitToCelsius, 1);
  data.appTemp = assignShortenAvgConvert(genDatetimes, singleData.appTemp, valDatetimes, minValues, unitConverter.fahrenheitToCelsius, 1);
  data.outTemp = assignShortenAvgConvert(genDatetimes, singleData.outTemp, valDatetimes, minValues, unitConverter.fahrenheitToCelsius, 1);
  data.dewpoint = assignShortenAvgConvert(genDatetimes, singleData.dewpoint, valDatetimes, minValues, unitConverter.fahrenheitToCelsius, 1);
  data.outHumidity = assignShortenAvgConvert(genDatetimes, singleData.outHumidity, valDatetimes, minValues, (value, precision) => utils.round(value, precision), 0);
  data.barometer = assignShortenAvgConvert(genDatetimes, singleData.barometer, valDatetimes, minValues, unitConverter.inHgToHpa, 1);
  data.windspeed = assignShortenAvgConvert(genDatetimes, singleData.windspeed, valDatetimes, minValues, unitConverter.mphToKmh, 1);
  data.windDir = assignShortenAvgConvert(genDatetimes, singleData.windDir, valDatetimes, minValues, (value, precision) => utils.round(value, precision), 0);
  data.rain = assignValuesSum(genDatetimes, singleData.rain, valDatetimes);
  data.rain = shortenSum(data.rain, minValues);
  data.rain = accumulateArray(data.rain).map((value) => unitConverter.inchToMm(value, 1));

  return data;
}

async function calculateWDayData(db: Database, from: number, to: number, minValues: number): Promise<GraphData> {
  const data = getDummyGraphData();
  const dateTimes = await getDayDatetimes(db, from, to);
  if (dateTimes.length === 0) {
    return data;
  }

  const shortenedDatetimes = shorten(dateTimes, minValues);
  if (new Date(shortenedDatetimes[0] * 1000).getFullYear() === new Date(shortenedDatetimes[shortenedDatetimes.length - 1] * 1000).getFullYear()) {
    data.dateTime = shortenedDatetimes.map((value) => utils.formatDateDDMMHHMM(new Date(value * 1000)));
  } else {
    data.dateTime = shortenedDatetimes.map((value) => utils.formatDateDDMMYYHHMM(new Date(value * 1000)));
  }

  let commonSensorResult;
  commonSensorResult = await commonDaySensorQuery(db, "outTemp", from, to, minValues, unitConverter.fahrenheitToCelsius, 1);
  data.outTemp = commonSensorResult.average;
  data.outTempMin = commonSensorResult.min;
  data.outTempMax = commonSensorResult.max;

  commonSensorResult = await commonDaySensorQuery(db, "appTemp", from, to, minValues, unitConverter.fahrenheitToCelsius, 1);
  data.appTemp = commonSensorResult.average;
  data.appTempMin = commonSensorResult.min;
  data.appTempMax = commonSensorResult.max;

  commonSensorResult = await commonDaySensorQuery(db, "dewpoint", from, to, minValues, unitConverter.fahrenheitToCelsius, 1);
  data.dewpoint = commonSensorResult.average;
  data.dewpointMin = commonSensorResult.min;
  data.dewpointMax = commonSensorResult.max;

  commonSensorResult = await commonDaySensorQuery(db, "outHumidity", from, to, minValues, (value, precision) => utils.round(value, precision), 0);
  data.outHumidity = commonSensorResult.average;
  data.outHumidityMin = commonSensorResult.min;
  data.outHumidityMax = commonSensorResult.max;

  commonSensorResult = await commonDaySensorQuery(db, "barometer", from, to, minValues, unitConverter.inHgToHpa, 1);
  data.barometer = commonSensorResult.average;
  data.barometerMin = commonSensorResult.min;
  data.barometerMax = commonSensorResult.max;

  data.windspeed = await getDayAverage(db, "windSpeed", from, to);
  data.windspeed = shortenAverage(data.windspeed, minValues).map((value) => unitConverter.mphToKmh(value, 1));

  data.windspeedMax = await getDayMax(db, "windGust", from, to);
  data.windspeedMax = shortenMax(data.windspeedMax, minValues).map((value) => unitConverter.mphToKmh(value, 1));

  data.windDir = await getDayAverage(db, "windDir", from, to);
  data.windDir = shortenAverage(data.windDir, minValues).map((value) => utils.round(value, 0));

  data.rain = await getDaySum(db, "rain", from, to);
  data.rain = shortenSum(data.rain, minValues);
  data.rain = accumulateArray(data.rain).map((value) => unitConverter.inchToMm(value, 1));

  return data;
}

async function getDataSensors(db: Database, sensors: string[], from: number, to: number): Promise<SingleSensorRow> {
  interface ResultRow {
    dateTime: number;
    outTemp: number;
    appTemp: number;
    dewpoint: number;
    outHumidity: number;
    barometer: number;
    windspeed: number;
    windDir: number;
    rain: number;
  }

  const result: ResultRow[] = await db.query("weewx", `SELECT dateTime, ${sensors.join(", ")} FROM archive WHERE dateTime BETWEEN ? AND ? ORDER BY dateTime ASC`, [from, to]);
  const data: SingleSensorRow = {
    dateTime: [],
    outTemp: [],
    appTemp: [],
    dewpoint: [],
    outHumidity: [],
    barometer: [],
    windspeed: [],
    windDir: [],
    rain: [],
  };
  for (const row of result) {
    data.dateTime.push(row.dateTime);
    data.outTemp.push(row.outTemp);
    data.appTemp.push(row.appTemp);
    data.dewpoint.push(row.dewpoint);
    data.outHumidity.push(row.outHumidity);
    data.barometer.push(row.barometer);
    data.windspeed.push(row.windspeed);
    data.windDir.push(row.windDir);
    data.rain.push(row.rain);
  }
  return data;
}

async function getDayMin(db: Database, sensor: string, fromUnix: number, toUnix: number): Promise<number[]> {
  const from = new Date(fromUnix * 1000);
  from.setHours(0, 0, 0, 0);

  const to = new Date(toUnix * 1000);
  to.setHours(0, 0, 0, 0);

  const result = await db.query("weewx", `SELECT min FROM archive_day_${sensor} WHERE dateTime BETWEEN ? AND ? ORDER BY dateTime ASC`, [from.getTime() / 1000, to.getTime() / 1000]);
  return result.map((row: { min: number }) => row.min);
}

async function getDayMax(db: Database, sensor: string, fromUnix: number, toUnix: number): Promise<number[]> {
  const from = new Date(fromUnix * 1000);
  from.setHours(0, 0, 0, 0);

  const to = new Date(toUnix * 1000);
  to.setHours(0, 0, 0, 0);

  const result = await db.query("weewx", `SELECT max FROM archive_day_${sensor} WHERE dateTime BETWEEN ? AND ? ORDER BY dateTime ASC`, [from.getTime() / 1000, to.getTime() / 1000]);
  return result.map((row: { max: number }) => row.max);
}

async function getDayAverage(db: Database, sensor: string, fromUnix: number, toUnix: number): Promise<number[]> {
  const from = new Date(fromUnix * 1000);
  from.setHours(0, 0, 0, 0);

  const to = new Date(toUnix * 1000);
  to.setHours(0, 0, 0, 0);

  const result = await db.query("weewx", `SELECT sum, count FROM archive_day_${sensor} WHERE dateTime BETWEEN ? AND ? ORDER BY dateTime ASC`, [from.getTime() / 1000, to.getTime() / 1000]);
  return result.map((row: { sum: number; count: number }) => row.sum / row.count);
}

async function getDaySum(db: Database, sensor: string, fromUnix: number, toUnix: number): Promise<number[]> {
  const from = new Date(fromUnix * 1000);
  from.setHours(0, 0, 0, 0);

  const to = new Date(toUnix * 1000);
  to.setHours(0, 0, 0, 0);

  const result = await db.query("weewx", `SELECT sum FROM archive_day_${sensor} WHERE dateTime BETWEEN ? AND ? ORDER BY dateTime ASC`, [from.getTime() / 1000, to.getTime() / 1000]);
  return result.map((row: { sum: number }) => row.sum);
}

function generateDatetimes(from: number, to: number, interval: number): number[] {
  const datetimes: number[] = [];
  for (let i = from; i <= to; i += interval) {
    datetimes.push(i);
  }
  return datetimes;
}

function assignShortenAvgConvert(datetimes: number[], $values: number[], $valuedatetimes: number[], minValues: number, converter: (value: number, precision: number) => number, precision: number): number[] {
  const values = assignValues(datetimes, $values, $valuedatetimes);
  const shortenedValues = shortenAverage(values, minValues);
  return shortenedValues.map((value) => converter(value, precision));
}

function shorten(array: any[], recommendedLength: number): any[] {
  const stepSize = calculateStepSize(array.length, recommendedLength);
  const newArray: any[] = [];
  let i = 0;
  for (const value of array) {
    if (i % stepSize === 0) {
      newArray.push(value);
    }
    i++;
  }
  return newArray;
}

function shortenAverage(array: number[], recommendedLength: number): number[] {
  const stepSize = calculateStepSize(array.length, recommendedLength);
  const newArray: number[] = [];
  let sum = 0;
  let i = 0;
  let valueCount = 0;
  for (const value of array) {
    sum += value;
    valueCount++;
    if (i % stepSize === 0) {
      newArray.push(sum / valueCount);
      sum = 0;
      valueCount = 0;
    }
    i++;
  }
  return newArray;
}

function shortenSum(array: number[], recommendedLength: number): number[] {
  const stepSize = calculateStepSize(array.length, recommendedLength);
  const newArray: number[] = [];
  let sum = 0;
  let i = 0;
  for (const value of array) {
    sum += value;
    if (i % stepSize === 0) {
      newArray.push(sum);
      sum = 0;
    }
    i++;
  }
  if (sum !== 0) {
    newArray[newArray.length - 1] += sum;
  }

  return newArray;
}

function shortenMin(array: number[], recommendedLength: number): number[] {
  const stepSize = calculateStepSize(array.length, recommendedLength);
  const newArray: number[] = [];
  let min = Number.MAX_SAFE_INTEGER;
  let i = 0;
  for (const value of array) {
    if (value < min) {
      min = value;
    }
    if (i % stepSize === 0) {
      newArray.push(min);
      min = Number.MAX_SAFE_INTEGER;
    }
    i++;
  }

  return newArray;
}

function shortenMax(array: number[], recommendedLength: number): number[] {
  const stepSize = calculateStepSize(array.length, recommendedLength);
  const newArray: number[] = [];
  let max = Number.MIN_SAFE_INTEGER;
  let i = 0;
  for (const value of array) {
    if (value > max) {
      max = value;
    }
    if (i % stepSize === 0) {
      newArray.push(max);
      max = Number.MIN_SAFE_INTEGER;
    }
    i++;
  }

  return newArray;
}

function accumulateArray(array: number[]): number[] {
  if (array.length === 0) {
    return [];
  }
  if (array[0] === null) {
    array[0] = 0;
  }
  for (let i = 1; i < array.length; i++) {
    if (array[i] === null) {
      array[i] = 0;
    }
    array[i] += array[i - 1];
  }
  return array;
}

function assignValues(datetimes: number[], $values: number[], $valuedatetimes: number[]): number[] {
  const valueMap: { [key: number]: number } = {};
  for (let i = 0; i < $valuedatetimes.length; i++) {
    valueMap[$valuedatetimes[i]] = $values[i];
  }

  const newValues: number[] = [];
  for (const datetime of datetimes) {
    if (valueMap.hasOwnProperty(datetime)) {
      newValues.push(valueMap[datetime]);
    } else {
      newValues.push(Number.MAX_SAFE_INTEGER);
    }
  }

  if (newValues[0] === Number.MAX_SAFE_INTEGER) {
    for (let i = 1; i < newValues.length; i++) {
      if (newValues[i] !== Number.MAX_SAFE_INTEGER) {
        newValues[0] = newValues[i];
        break;
      }
    }
  }

  for (let i = 1; i < newValues.length; i++) {
    if (newValues[i] === Number.MAX_SAFE_INTEGER) {
      newValues[i] = newValues[i - 1];
    }
  }

  return newValues;
}

function assignValuesSum(datetimes: number[], values: number[], valuedatetimes: number[]): number[] {
  const newValues: number[] = [];

  for (let i = 0; i < datetimes.length; i++) {
    newValues.push(0);
  }

  let datetimeIndex = 0;
  let valueIndex = 0;
  while (datetimeIndex < datetimes.length && valueIndex < valuedatetimes.length) {
    if (datetimes[datetimeIndex] === valuedatetimes[valueIndex]) {
      newValues[datetimeIndex] = values[valueIndex];
      datetimeIndex++;
      valueIndex++;
    } else if (datetimes[datetimeIndex] < valuedatetimes[valueIndex]) {
      datetimeIndex++;
    } else {
      newValues[datetimeIndex] += values[valueIndex];
      valueIndex++;
    }
  }

  return newValues;
}

async function getDayDatetimes(db: Database, fromUnix: number, toUnix: number): Promise<number[]> {
  const from = new Date(fromUnix * 1000);
  from.setHours(0, 0, 0, 0);
  const to = new Date(toUnix * 1000);
  to.setHours(0, 0, 0, 0);

  const result = await db.query("weewx", "SELECT dateTime FROM archive_day_outTemp WHERE dateTime BETWEEN ? AND ? ORDER BY dateTime ASC", [from.getTime() / 1000, to.getTime() / 1000]);
  if (!result) {
    return [];
  }
  const data: number[] = [];
  for (const row of result) {
    data.push(row.dateTime);
  }
  return data;
}

async function commonDaySensorQuery(db: Database, sensor: string, from: number, to: number, minValues: number, converter: (number: number, precision: number) => number, precision: number): Promise<DayCommonSensorRow> {
  const data: DayCommonSensorRow = {
    average: [],
    min: [],
    max: [],
  };

  data.average = await getDayAverage(db, sensor, from, to);
  data.average = shortenAverage(data.average, minValues).map((value) => converter(value, precision));

  data.min = await getDayMin(db, sensor, from, to);
  data.min = shortenMin(data.min, minValues).map((value) => converter(value, precision));

  data.max = await getDayMax(db, sensor, from, to);
  data.max = shortenMax(data.max, minValues).map((value) => converter(value, precision));

  return data;
}