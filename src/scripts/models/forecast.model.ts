export interface ForecastData {
  maxTemp: number;
  minTemp: number;
  name: string;
  date: string;
  icon: string;
  condition: string;
}

export function getDummyForecastData(): ForecastData {
  const dummyForecastData: ForecastData = {
    maxTemp: 0,
    minTemp: 0,
    name: "",
    date: "",
    icon: "09d",
    condition: "",
  };
  return structuredClone(dummyForecastData);
}