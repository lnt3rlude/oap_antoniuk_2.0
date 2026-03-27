export type AccessStatus = "Pending" | "Approved" | "Rejected";

export interface CreateAccessDto {
  userName: string;
  date: string;
  accessType: string;
  comments?: string;
  status: AccessStatus;
}

export interface AccessResponseDto {
  id: string;
  userId: string;
  userName: string;
  date: string;
  accessType: string;
  comments?: string; // ← виправили
  status: AccessStatus;
}

export interface UpdateAccessDto {
  userName?: string;
  date?: string;
  accessType?: string;
  comments?: string;
  status?: AccessStatus;
}