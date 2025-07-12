"use client";
import { useRef } from "react";
import type { Advocate } from "./types";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  Cell,
  Container,
  Heading,
  InnerContainer,
  Pagination,
  ScrollContainer,
  SearchForm,
  TableHeader,
  VirtualRow,
} from "@/styles/components/AdvocateList.styles";

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
    estimateSize: () => 200,
    overscan: 4,
    measureElement: (el) => el.getBoundingClientRect().height,
  });

  return (
    <Container>
      <Heading>Solace Advocates</Heading>
      <SearchForm method="GET" action="/">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          defaultValue={searchQuery}
        />
        <button type="submit">Search</button>
      </SearchForm>
      <ScrollContainer ref={parentRef}>
        <TableHeader>
          <Cell $flex={0.5}>First Name</Cell>
          <Cell $flex={0.5}>Last Name</Cell>
          <Cell $flex={0.75}>City</Cell>
          <Cell $flex={0.5}>Degree</Cell>
          <Cell $flex={4.25}>Specialties</Cell>
          <Cell $flex={0.5}>Years Exp</Cell>
          <Cell $flex={0.5}>Phone</Cell>
        </TableHeader>

        <InnerContainer style={{ height: rowVirtualizer.getTotalSize() }}>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = initialData[virtualRow.index];
            return (
              <VirtualRow
                key={virtualRow.key}
                start={virtualRow.start}
                ref={rowVirtualizer.measureElement}
              >
                <Cell $flex={0.5}>{row.firstName}</Cell>
                <Cell $flex={0.5}>{row.lastName}</Cell>
                <Cell $flex={0.75}>{row.city}</Cell>
                <Cell $flex={0.5}>{row.degree}</Cell>
                <Cell $flex={4.25}>
                  {Array.isArray(row.specialties)
                    ? row.specialties.join(", ")
                    : row.specialties}
                </Cell>
                <Cell $flex={0.5}>{row.yearsOfExperience}</Cell>
                <Cell $flex={0.5}>{row.phoneNumber}</Cell>
              </VirtualRow>
            );
          })}
        </InnerContainer>
      </ScrollContainer>

      <Pagination>
        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNum = i + 1;
          return (
            <a
              key={pageNum}
              href={`/?page=${pageNum}&search=${searchQuery}`}
              className={pageNum === currentPage ? "active" : ""}
            >
              {pageNum}
            </a>
          );
        })}
      </Pagination>
    </Container>
  );
}
