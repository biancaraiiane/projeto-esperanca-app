export type PartnerStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface PartnerRequest {
  id: string;
  companyName: string;
  email: string;
  phone: string;
  description: string;
  status: PartnerStatus;
  requestDate: string;
}