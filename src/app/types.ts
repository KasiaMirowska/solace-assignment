export interface Advocate {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[]; //maybe add enum later for clarity and type protection
  yearsOfExperience: number;
  phoneNumber: string;
  createdAt: string; //verify if we need a date later
}
