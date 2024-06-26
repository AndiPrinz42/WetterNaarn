export interface GraphData {
  outTempMin: number[],
  outTempMax: number[],
  appTempMin: number[],
  appTempMax: number[],
  dewpointMin: number[],
  dewpointMax: number[],
  outHumidityMin: number[],
  outHumidityMax: number[],
  barometerMin: number[],
  barometerMax: number[],
  windspeedMax: number[],
  dateTime: string[],
  outTemp: number[],
  appTemp: number[],
  dewpoint: number[],
  outHumidity: number[],
  barometer: number[],
  windspeed: number[],
  windDir: number[],
  rain: number[],
}

export function getDummyGraphData(): GraphData {
  const dummyGraphData: GraphData = {
    outTempMin: [],
    outTempMax: [],
    appTempMin: [],
    appTempMax: [],
    dewpointMin: [],
    dewpointMax: [],
    outHumidityMin: [],
    outHumidityMax: [],
    barometerMin: [],
    barometerMax: [],
    windspeedMax: [],
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
  return structuredClone(dummyGraphData);
}