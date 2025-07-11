import { NextRequest, NextResponse } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { ilike, or, sql, count } from "drizzle-orm";

function buildSearchConditions(search: string) {
  const pattern = `%${search.toLowerCase()}%`;

  return or(
    ilike(advocates.firstName, pattern),
    ilike(advocates.lastName, pattern),
    ilike(advocates.city, pattern),
    ilike(advocates.degree, pattern),
    sql.raw(`CAST(specialties AS TEXT) ILIKE '${pattern}'`), //casting raw SQL cause 'sql${advocates.yearsOfExperience}::text ILIKE ${pattern},' does not work in client, should be resolved in production for a better approach
    sql.raw(`CAST(years_of_experience AS TEXT) ILIKE '${pattern}'`),
    sql.raw(`CAST(phone_number AS TEXT) ILIKE '${pattern}'`)
  );
}

async function getAdvocates({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}) {
  const offset = (page - 1) * limit;

  const query = db.select().from(advocates).limit(limit).offset(offset);

  const filteredQuery = search
    ? query.where(buildSearchConditions(search))
    : query;

  return await filteredQuery.execute();
}

async function getTotalAdvocateCount(search?: string) {
  const countQuery = db.select({ count: count().as("count") }).from(advocates);

  const filteredQuery = search
    ? countQuery.where(buildSearchConditions(search))
    : countQuery;

  const result = await filteredQuery.execute();
  return Number(result[0]?.count ?? 0);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";

  const [data, total] = await Promise.all([
    getAdvocates({ page, limit, search }),
    getTotalAdvocateCount(search),
  ]);

  return NextResponse.json({
    data,
    page,
    limit,
    total,
  });
}
