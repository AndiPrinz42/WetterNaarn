import type { APIRoute } from "astro";
import { Database } from "../../scripts/database";
import { type GraphData, getDummyGraphData } from "../../scripts/models/graphs.model";

export const GET: APIRoute = async ({ params, request }) => {
  const searchParams = new URLSearchParams(new URL(request.url).search);
  const from = Number(searchParams.get("from"));
  const to = Number(searchParams.get("to"));
  if (isNaN(from) || isNaN(to) || from > to) {
    return new Response(JSON.stringify({ error: "invalid parameters" }), { status: 400 });
  }
  const data = await getData(from, to);
  return new Response(JSON.stringify(data));
};

async function getData(from: number, to: number): Promise<GraphData> {
  const db = new Database();
  return getDummyGraphData();
}
