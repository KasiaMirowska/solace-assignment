import type { Advocates } from "@/app/types";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET() {
  const data = (await db.select().from(advocates)) as Advocates[];

  return Response.json({ data });
}
