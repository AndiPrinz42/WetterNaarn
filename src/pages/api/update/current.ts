import type { APIRoute } from "astro";
import { Database } from "../../../scripts/database";

export const GET: APIRoute = async ({ request }) => {
  const db = new Database();
  const result = await updateCurrent(db);
  db.close("weewx");
  db.close("forecast");
  return new Response(JSON.stringify({ status: result ? "success" : "error" }), { status: result ? 200 : 500 });
};

async function updateCurrent(db: Database): Promise<boolean> {
  return true;
}