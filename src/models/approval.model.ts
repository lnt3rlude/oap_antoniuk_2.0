export interface Approval {
  id: string;
  requestId: string;
  adminId: string;
  decision: "Approved" | "Rejected";
  remark: string;
  createdAt: string;
}