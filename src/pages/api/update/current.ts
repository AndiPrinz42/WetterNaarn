import type { APIRoute } from "astro";
const env = import.meta.env;
import { Database } from "../../../scripts/database";
import * as utils from "../../../scripts/utils";
import { UpdateStatus } from "../../../scripts/updatestatus.enum";
import type { OpenWeatherCurrent } from "../../../scripts/models/openweathercurrent.model";

const UPDATE_INTERVAL = 450;

export const GET: APIRoute = async () => {
  const db = new Database();
  const status = await updateCurrent(db, env.OPENWEATHER_API_KEY, UPDATE_INTERVAL);
  db.close("weewx");
  db.close("forecast");
  if (status === UpdateStatus.Success || status === UpdateStatus.NoUpdateNecessary) {
    return new Response(JSON.stringify({ status: status }), { status: 200 });
  }
  return new Response(JSON.stringify({ status: status }), { status: 500 });
};

async function updateCurrent(db: Database, apikey: string, updateInterval: number): Promise<UpdateStatus> {
  const latestUpdate = await db.query("forecast", "SELECT updateTime FROM current ORDER BY updateTime DESC LIMIT 1;");
  if (new Date().getTime() / 1000 - latestUpdate[0].updateTime < updateInterval) {
    return UpdateStatus.NoUpdateNecessary;
  }

  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=48.22614470391373&lon=14.604870732818206&units=metric&appid=${apikey}`);
  if (!response.ok) {
    console.error("API error", response.status, response.statusText);
    return UpdateStatus.ApiError;
  }

  const data = (await response.json()) as OpenWeatherCurrent;
  const icon = utils.convertIconNumber(data.weather[0].icon);
  const condition = utils.getForecastCondition(icon);

  const sql = "INSERT INTO current (offsetTime, icon, `condition`, updateTime) VALUES (0, ?, ?, ?) ON DUPLICATE KEY UPDATE icon=VALUES(icon), `condition`=VALUES(`condition`), updateTime=VALUES(updateTime);";
  try {
    await db.query("forecast", sql, [icon, condition, Math.floor(Date.now() / 1000)]);
  } catch (e) {
    console.error(e);
    return UpdateStatus.DatabaseError;
  }
  return UpdateStatus.Success;
}
