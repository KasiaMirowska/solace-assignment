"use client";

import { useState } from "react";
import type { Advocate } from "./types";

export default function AdvocatesList({
  initialData,
}: {
  initialData: Advocate[];
}) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(initialData);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);

    const newFiltered = initialData.filter((adv) =>
      Object.values(adv).some((val) =>
        String(val).toLowerCase().includes(searchTerm)
      )
    );

    setFiltered(newFiltered);
  };
  const handleButtonClick = () => {
    alert("clicked- we will figure out if we need it later :)");
  };

  return (
    <div>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input
          placeholder="Search advocates..."
          value={query}
          onChange={onChange}
          className="mb-4 px-2 py-1 border"
        />

        <button
          onClick={handleButtonClick}
          className="mb-4 px-4 py-2 border rounded"
        >
          Click Me
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">First Name</th>
            <th className="border border-gray-300 px-4 py-2">Last Name</th>
            <th className="border border-gray-300 px-4 py-2">City</th>
            <th className="border border-gray-300 px-4 py-2">Degree</th>
            <th className="border border-gray-300 px-4 py-2">Specialties</th>
            <th className="border border-gray-300 px-4 py-2">Years Exp</th>
            <th className="border border-gray-300 px-4 py-2">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((advocate, i) => (
            <tr key={i}>
              <td className="border border-gray-300 px-4 py-2">
                {advocate.firstName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {advocate.lastName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {advocate.city}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {advocate.degree}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {Array.isArray(advocate.specialties)
                  ? advocate.specialties.join(", ")
                  : advocate.specialties}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {advocate.yearsOfExperience}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {advocate.phoneNumber}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
