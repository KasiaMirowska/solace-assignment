"use client";
import type { Advocate } from "./types";

interface Props {
  initialData: Advocate[];
  currentPage: number;
  searchQuery: string;
  total: number;
  limit: number;
}

export default function AdvocatesList({
  initialData,
  currentPage,
  searchQuery,
  total,
  limit,
}: Props) {
  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <h1>Solace Advocates</h1>

      {/* Search form */}
      <form method="GET" action="/">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          defaultValue={searchQuery}
          className="mb-4 px-2 py-1 border"
        />
        <button type="submit" className="ml-2 px-4 py-2 border rounded">
          Search
        </button>
      </form>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">First Name</th>
            <th className="border px-4 py-2">Last Name</th>
            <th className="border px-4 py-2">City</th>
            <th className="border px-4 py-2">Degree</th>
            <th className="border px-4 py-2">Specialties</th>
            <th className="border px-4 py-2">Years Exp</th>
            <th className="border px-4 py-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          {initialData.map((adv, i) => (
            <tr key={i}>
              <td className="border px-4 py-2">{adv.firstName}</td>
              <td className="border px-4 py-2">{adv.lastName}</td>
              <td className="border px-4 py-2">{adv.city}</td>
              <td className="border px-4 py-2">{adv.degree}</td>
              <td className="border px-4 py-2">
                {Array.isArray(adv.specialties)
                  ? adv.specialties.join(", ")
                  : adv.specialties}
              </td>
              <td className="border px-4 py-2">{adv.yearsOfExperience}</td>
              <td className="border px-4 py-2">{adv.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <a
            key={i}
            href={`/?page=${i + 1}&search=${searchQuery}`}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-200" : ""
            }`}
          >
            {i + 1}
          </a>
        ))}
      </div>
    </div>
  );
}
