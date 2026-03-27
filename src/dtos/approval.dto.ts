export type Decision = "Approved" | "Rejected";

export interface UpdateApprovalDto {
  decision?: Decision;
  remark?: string;
}

export interface CreateApprovalDto {
  requestId: string;
  adminId: string;
  decision: Decision;
  remark?: string;
}

export interface ApprovalResponseDto {
  id: string;
  requestId: string;
  adminName: string;
  decision: Decision;
  remark?: string;
  createdAt: string; // або Date, якщо це внутрішня модель
}