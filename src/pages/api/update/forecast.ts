import type { APIRoute } from "astro";
const env = import.meta.env;
import { Database } from "../../../scripts/database";
import { Status } from "../../../scripts/updatestatus.enum";

const UPDATE_INTERVAL = 900;

export const GET: APIRoute = async ({ request }) => {
  const db = new Database();
  const status = await updateCurrent(db, env.OPENWEATHER_API_KEY, UPDATE_INTERVAL);
  db.close("weewx");
  db.close("forecast");
  if (status === Status.Success || status === Status.NoUpdateNecessary) {
    return new Response(JSON.stringify({ status: status }), { status: 200 });
  }
  return new Response(JSON.stringify({ status: status }), { status: 500 });
};

async function updateCurrent(db: Database, apikey: string, updateInterval: number): Promise<Status> {
  const latestUpdate = await db.query("forecast", "SELECT updateTime FROM three_hour_forecast ORDER BY updateTime DESC LIMIT 1;");
  if (new Date().getTime() / 1000 - latestUpdate[0].updateTime < updateInterval) {
    return Status.NoUpdateNecessary;
  }

  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=48.22614470391373&lon=14.604870732818206&units=metric&appid=${apikey}`);
  if (!response.ok) {
    console.error("API error", response.status, response.statusText);
    return Status.ApiError;
  }

  const data = (await response.json()) as OpenWeatherForecast;

  const apiresult = data.list;
  let sql = "INSERT INTO three_hour_forecast (dateTime, icon, temp, temp_min, temp_max, updateTime) VALUES ";
  const apiextract = [];
  const preparedValues = [];
  for (const [index, value] of apiresult.entries()) {
    apiextract[index] = {
      dt: value.dt,
      icon: value.weather[0].icon,
      temp: value.main.temp,
      temp_min: value.main.temp_min,
      temp_max: value.main.temp_max,
    };
    sql += "(?, ?, ?, ?, ?, ?), ";
    preparedValues.push(value.dt, value.weather[0].icon, value.main.temp, value.main.temp_min, value.main.temp_max, Math.floor(Date.now() / 1000));
  }

  sql = sql.slice(0, -2);
  sql += " ON DUPLICATE KEY UPDATE icon=VALUES(icon), temp=VALUES(temp), temp_min=VALUES(temp_min), temp_max=VALUES(temp_max), updateTime=VALUES(updateTime);";

  try {
    await db.query("forecast", sql, preparedValues);
  } catch (e) {
    console.error(e);
    return Status.DatabaseError;
  }

  try {
    await db.query("forecast", "DELETE FROM three_hour_forecast WHERE dateTime < ?;", [Math.floor(Date.now() / 1000) - 259200]);
  } catch (e) {
    console.error(e);
    return Status.DatabaseError;
  }

  return Status.Success;
}
