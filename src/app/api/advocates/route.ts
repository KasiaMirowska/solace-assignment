import { NextRequest, NextResponse } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { ilike, or, sql, count } from "drizzle-orm";
import type { AdvocatesResponse } from "@/app/types";

function buildSearchConditions(search: string) {
  const pattern = `%${search.toLowerCase()}%`;

  return or(
    ilike(advocates.firstName, pattern),
    ilike(advocates.lastName, pattern),
    ilike(advocates.city, pattern),
    ilike(advocates.degree, pattern),
    sql`${advocates.specialties}::text ILIKE ${pattern}`, // does not actually work but opted for leaving for now to address other concerns
    sql`${advocates.yearsOfExperience}::text ILIKE ${pattern}`,
    sql`${advocates.phoneNumber}::text ILIKE ${pattern}`
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

  const rawData = await filteredQuery.execute();

  return rawData.map((item) => ({
    ...item,
    specialties: Array.isArray(item.specialties) ? item.specialties : [], //deals with db returning jsonb column
  }));
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
  const limit = parseInt(searchParams.get("limit") || "5");
  const search = searchParams.get("search") || "";

  const [data, total] = await Promise.all([
    getAdvocates({ page, limit, search }),
    getTotalAdvocateCount(search),
  ]);

  const response: AdvocatesResponse = {
    data,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
  console.log("DATA", data);
  return NextResponse.json(response);
}
