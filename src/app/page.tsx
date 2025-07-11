// "use client";

// import { useEffect, useRef, useState } from "react";
// import type { Advocates } from "./types";

// export default function Home() {
//   const [advocates, setAdvocates] = useState<Advocates[]>([]);
//   const [filteredAdvocates, setFilteredAdvocates] = useState<Advocates[]>([]);

//   const hasFetched = useRef<boolean>(false);

//   useEffect(() => {
//     if (hasFetched.current) return;
//     hasFetched.current = true;

//     console.log("fetching advocates...");
//     const fetchAdvocates = async () => {
//       try {
//         const response = await fetch("/api/advocates");
//         const json: { data: Advocates[] } = await response.json();
//         setAdvocates(json.data);
//         setFilteredAdvocates(json.data);
//       } catch (e) {
//         console.log("ERROR FETCHING IN CLIENT", e);
//         throw e;
//       }
//     };
//     fetchAdvocates();
//   }, []);

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const searchTerm = e.target.value;

//     console.log("filtering advocates...");
//     const filteredAdvocates = advocates.filter((advocate) => {
//       return (
//         advocate.firstName.includes(searchTerm) ||
//         advocate.lastName.includes(searchTerm) ||
//         advocate.city.includes(searchTerm) ||
//         advocate.degree.includes(searchTerm) ||
//         advocate.specialties.includes(searchTerm) ||
//         advocate.yearsOfExperience.toString().includes(searchTerm)
//       );
//     });

//     setFilteredAdvocates(filteredAdvocates);
//   };

//   const onClick = () => {
//     console.log(advocates);
//     setFilteredAdvocates(advocates);
//   };

//   return (
//     <main style={{ margin: "24px" }}>
//       <h1>Solace Advocates</h1>
//       <br />
//       <br />
//       <div>
//         <p>Search</p>
//         <p>
//           Searching for: <span id="search-term"></span>
//         </p>
//         <input style={{ border: "1px solid black" }} onChange={onChange} />
//         <button onClick={onClick}>Reset Search</button>
//       </div>
//       <br />
//       <br />
//       <table>
//         <thead>
//           <tr>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>City</th>
//             <th>Degree</th>
//             <th>Specialties</th>
//             <th>Years of Experience</th>
//             <th>Phone Number</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredAdvocates.map((advocate, index) => {
//             return (
//               <tr key={`${advocate.phoneNumber}_${advocate.lastName}_${index}`}>
//                 <td>{advocate.firstName}</td>
//                 <td>{advocate.lastName}</td>
//                 <td>{advocate.city}</td>
//                 <td>{advocate.degree}</td>
//                 <td>
//                   {advocate.specialties.map((specialty, index) => (
//                     <div key={`${specialty}_${index}`}>{specialty}</div>
//                   ))}
//                 </td>
//                 <td>{advocate.yearsOfExperience}</td>
//                 <td>{advocate.phoneNumber}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </main>
//   );
// }

import AdvocatesList from "./AdvocatesList";
import type { Advocate, PageParams } from "./types";

export default async function Page(searchParams: PageParams) {
  const page = parseInt(searchParams?.page || "1");
  const search = searchParams?.search || "";

  const res = await fetch(
    `http://localhost:3000/api/advocates?page=${page}&search=${search}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch advocates");
  }

  const { data, total, limit } = await res.json();

  return (
    <AdvocatesList
      initialData={data}
      currentPage={page}
      searchQuery={search}
      total={total}
      limit={limit}
    />
  );
}
