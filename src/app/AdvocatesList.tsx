"use client";
import { useRef } from "react";
import type { Advocate } from "./types";
import { useVirtualizer } from "@tanstack/react-virtual";

interface Props {
  initialData: Advocate[];
  currentPage: number;
  searchQuery: string;
  totalPages: number;
}

export default function AdvocatesList({
  initialData,
  currentPage,
  searchQuery,
  totalPages,
}: Props) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: initialData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 150,
    overscan: 4,
  });

  return (
    <div>
      <h1>Solace Advocates</h1>

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

      <div className="overflow-x-auto">
        <div
          className="sticky top-0 z-10 border-b border-gray-300 text-sm font-semibold flex"
          style={{ background: "#f3f4f6" }}
        >
          <div style={{ flex: 0.5 }} className="px-2 py-1 border text-left">
            First Name
          </div>
          <div style={{ flex: 0.5 }} className="px-2 py-1 border text-left">
            Last Name
          </div>
          <div style={{ flex: 0.5 }} className="px-2 py-1 border text-left">
            City
          </div>
          <div style={{ flex: 0.5 }} className="px-2 py-1 border text-left">
            Degree
          </div>
          <div style={{ flex: 4.25 }} className="px-2 py-1 border text-left">
            Specialties
          </div>
          <div style={{ flex: 0.5 }} className="px-2 py-1 border text-left">
            Years Exp
          </div>
          <div style={{ flex: 0.5 }} className="px-2 py-1 border text-left">
            Phone
          </div>
        </div>

        <div
          ref={parentRef}
          style={{
            height: "600px",
            overflow: "auto",
            border: "1px solid #ccc",
          }}
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = initialData[virtualRow.index];
              return (
                <div
                  key={virtualRow.key}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "150px",
                    transform: `translateY(${virtualRow.start}px)`,
                    display: "flex",
                    padding: "1em",
                    borderBottom: "1px solid #eee",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div style={{ flex: 0.5 }}>{row.firstName}</div>
                  <div style={{ flex: 0.5 }}>{row.lastName}</div>
                  <div style={{ flex: 0.5 }}>{row.city}</div>
                  <div style={{ flex: 0.5 }}>{row.degree}</div>
                  <div style={{ flex: 4.25 }}>
                    {Array.isArray(row.specialties)
                      ? row.specialties.join(", ")
                      : row.specialties}
                  </div>
                  <div style={{ flex: 0.5 }}>{row.yearsOfExperience}</div>
                  <div style={{ flex: 0.5 }}>{row.phoneNumber}</div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Pagination */}
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            const isActive = pageNum === currentPage;
            return (
              <a
                key={pageNum}
                href={`/?page=${pageNum}&search=${searchQuery}`}
                className={`px-3 py-1 border rounded ${
                  isActive ? "bg-blue-200" : ""
                }`}
              >
                {pageNum}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
