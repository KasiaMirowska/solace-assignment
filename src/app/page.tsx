import AdvocatesList from "./AdvocatesList";
import type { Advocate, PageParams } from "./types";

export const revalidate = 60; // to limit rerenders if user refreshes the page

export default async function Page({ searchParams }: PageParams) {
  const page = parseInt(searchParams?.page || "1");
  const search = searchParams?.search || "";

  const res = await fetch(
    `http://localhost:3000/api/advocates?page=${page}&search=${search}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch advocates");
  }

  const { data, totalPages } = await res.json();

  return (
    <AdvocatesList
      initialData={data}
      currentPage={page}
      searchQuery={search}
      totalPages={totalPages}
    />
  );
}
