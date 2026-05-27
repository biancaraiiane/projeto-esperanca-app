export type ApiStatus = "PENDENTE" | "ACEITA" | "NEGADA";

export interface AdminMeApi {
  id: string;
  name: string;
  email: string;
  birthDate: string;
}

export interface UpdateAdminMePayload {
  name: string;
  birthDate: string;
  password?: string;
}

export interface RegisterAdminPayload {
  name: string;
  email: string;
  password: string;
  birthDate: string;
}

export interface VolunteerApi {
  id: string;
  name: string;
  email: string;
  phone: string;
  availableSchedule: string;
  status: ApiStatus;
  createdAt: string;
}

export interface PartnershipApi {
  id: string;
  companyName: string;
  partnershipType: string;
  email: string;
  contact: string;
  phone: string;
  status: ApiStatus;
  createdAt: string;
}