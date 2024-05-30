export interface ForecastData {
  maxTemp: number;
  minTemp: number;
  name: string;
  date: string;
  icon: string;
  condition: string;
}

export const dummyForecastData: ForecastData = {
  maxTemp: 0,
  minTemp: 0,
  name: "",
  date: "",
  icon: "09d",
  condition: "",
};