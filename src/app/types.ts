export interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[]; //maybe add enum later for clarity and type protection
  yearsOfExperience: number;
  phoneNumber: number;
  createdAt: Date | null;
}

type SearchParams = { search?: string; page?: string };
export type PageParams = { searchParams?: SearchParams };

export interface AdvocatesResponse {
  data: Advocate[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
