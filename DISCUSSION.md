# Advocate List – README

A performant, styled advocate directory built using **Next.js App Router**, featuring server-side filtering, pagination, SSR, table virtualization, and styled-components.

---

## Features

- Server-rendered initial data (SSR)
- Server-side filtering and pagination
- URL-based search and page state
- Table virtualization for performance
- Server revalidation for fresh data
- Styled-components for a clean, flexible UI

---

## Stack

- **Next.js (App Router)**
- **Drizzle ORM + PostgreSQL**
- **React Window** (for virtualization)
- **styled-components**

---

## Design Highlights

- **Filtering is server-side**, applied to the full dataset before pagination for accuracy and scalability.
- **Pagination via query params** enables link sharing, browser nav, and SSR.
- **Virtualized table rendering** improves performance with large datasets.
- **Styled-components** were used to enhance reusability and control UI presentation.
- **Revalidation ensures fresh data** on every request, critical for healthcare applications.

---

## Logical next steps if this was a ticket

High Priority
**Fixing numeric search behavior**, as I was wrapping up I realized the years of experience search does not work as expected
**Split AdvocatesList, Pagination, and AdvocateRow into reusable components.**, for maintainability and reusability
**Input validation**, type check for query params
**Loading UI improvements and error handling**, add skeleton rows for nicer UX, add error handling
**Accesibility enhancements**
**Full test coverage**

Medium Priority
**Improve the table UI**
**Specialty truncation + hover card** for nicer UX
**Sorting support (e.g., by name or city)**,

Low Priority
**Persisting filters/search in localStorage or URL state**, for sharing the search results and to provide intuitive UX on page refresh
**Caching results**

---
