export type UserStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  interestArea: string;
  status: UserStatus;
  registrationDate: string;
  avatarUrl?: string;
}