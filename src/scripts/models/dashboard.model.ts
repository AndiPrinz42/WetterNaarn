import { type ForecastData, getDummyForecastData } from "../models/forecast.model";

export interface DashboardData {
  date: string;
  icon: string;
  condition: string;
  outTemp: number;
  appTemp: number;
  outHumidity: string;
  humidityText: string;
  barometer: number;
  barometerText: string;
  barometerIcon: string;
  windspeed: number;
  windText: string;
  winddir: number;
  rain: number;
  morningtemp: number;
  noontemp: number;
  eveningtemp: number;
  nighttemp: number;
  forecasttoday: ForecastData;
  forecastin1d: ForecastData;
  forecastin2d: ForecastData;
  forecastin3d: ForecastData;
  forecastin4d: ForecastData;
  sunrise: string;
  sunset: string;
  moonphase: number;
  moonillumination: number;
  moonphaseText: string;
  moonphaseIcon: string;
}

export function getDummyDashboardData(): DashboardData {
  const dummyDashboardData: DashboardData = {
    date: "",
    icon: "09d",
    condition: "",
    outTemp: 0,
    appTemp: 0,
    outHumidity: "",
    humidityText: "",
    barometer: 0,
    barometerText: "",
    barometerIcon: "",
    windspeed: 0,
    windText: "",
    winddir: 0,
    rain: 0,
    morningtemp: 0,
    noontemp: 0,
    eveningtemp: 0,
    nighttemp: 0,
    forecasttoday: getDummyForecastData(),
    forecastin1d: getDummyForecastData(),
    forecastin2d: getDummyForecastData(),
    forecastin3d: getDummyForecastData(),
    forecastin4d: getDummyForecastData(),
    sunrise: "",
    sunset: "",
    moonphase: 0,
    moonillumination: 0,
    moonphaseText: "",
    moonphaseIcon: "",
  };
  return structuredClone(dummyDashboardData);
}