export interface SensorData {
  outTemp: SensorDataGeneric;
  appTemp: SensorDataGeneric;
  dewpoint: SensorDataGeneric;
  outHumidity: SensorDataGeneric;
  barometer: SensorDataGeneric;
  barometerRotation: number;
  wind: SensorDataWind;
  rain: SensorDataRain;
  suntoday: SensorDataSunriseSunset;
  suntomorrow: SensorDataSunriseSunset;
  daylength: string;
  daylengthdiff: string;
  moon: SensorDataMoon;
}

export interface SensorDataGeneric {
  current: number;
  avg: number;
  min: number;
  minTime: string;
  max: number;
  maxTime: string;
}

export interface SensorDataWind {
  current: number;
  avg: number;
  max: number;
  maxTime: string;
  currentDir: number;
  maxDir: number;
  maxGust: number;
  maxGustTime: string;
  maxGustDir: number;
}

export interface SensorDataRain {
  day: number;
  last: string;
  week: number;
  weekBefore: number;
  month: number;
  monthBefore: number;
}

export interface SensorDataSunriseSunset {
  sunrise: string;
  sunset: string;
}

export interface SensorDataMoon {
  phase: number;
  text: string;
  icon: string;
  illumination: number;
  nextFullMoon: string;
  nextFullMoonDays: number;
  nextFullMoonText: string;
  nextNewMoon: string;
  nextNewMoonDays: number;
  nextNewMoonText: string;
}

export function getDummySensorData(): SensorData {
  const dummySensorData: SensorData = {
    outTemp: getDummySensorDataGeneric(),
    appTemp: getDummySensorDataGeneric(),
    dewpoint: getDummySensorDataGeneric(),
    outHumidity: getDummySensorDataGeneric(),
    barometer: getDummySensorDataGeneric(),
    barometerRotation: 0,
    wind: getDummySensorDataWind(),
    rain: getDummySensorDataRain(),
    suntoday: getDummySensorDataSunriseSunset(),
    suntomorrow: getDummySensorDataSunriseSunset(),
    daylength: "",
    daylengthdiff: "",
    moon: getDummySensorDataMoon(),
  };
  return structuredClone(dummySensorData);
}

export function getDummySensorDataGeneric(): SensorDataGeneric {
  const dummySensorDataTemperature: SensorDataGeneric = {
    current: 0,
    avg: 0,
    min: 0,
    minTime: "",
    max: 0,
    maxTime: "",
  };
  return structuredClone(dummySensorDataTemperature);
}

export function getDummySensorDataWind(): SensorDataWind {
  const dummySensorDataWind: SensorDataWind = {
    current: 0,
    avg: 0,
    max: 0,
    maxTime: "",
    currentDir: 0,
    maxDir: 0,
    maxGust: 0,
    maxGustTime: "",
    maxGustDir: 0,
  };
  return structuredClone(dummySensorDataWind);
}

export function getDummySensorDataRain(): SensorDataRain {
  const dummySensorDataRain: SensorDataRain = {
    day: 0,
    last: "",
    week: 0,
    weekBefore: 0,
    month: 0,
    monthBefore: 0,
  };
  return structuredClone(dummySensorDataRain);
}

export function getDummySensorDataSunriseSunset(): SensorDataSunriseSunset {
  const dummySensorDataSunriseSunset: SensorDataSunriseSunset = {
    sunrise: "",
    sunset: "",
  };
  return structuredClone(dummySensorDataSunriseSunset);
}

export function getDummySensorDataMoon(): SensorDataMoon {
  const dummySensorDataMoon: SensorDataMoon = {
    phase: 0,
    text: "",
    icon: "",
    illumination: 0,
    nextFullMoon: "",
    nextFullMoonDays: 0,
    nextFullMoonText: "",
    nextNewMoon: "",
    nextNewMoonDays: 0,
    nextNewMoonText: "",
  };
  return structuredClone(dummySensorDataMoon);
}