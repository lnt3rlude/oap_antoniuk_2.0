export interface ApprovalFilters {
  page?: number;
  pageSize?: number;
  decision?: "Approved" | "Rejected";
  search?: string;
}