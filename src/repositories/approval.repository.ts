import { ApprovalResponseDto } from "../dtos/approval.dto";

class ApprovalRepository {
  private approvals: any[] = []; // Внутрішня модель

  findAll(): any[] {
    return this.approvals;
  }

  findById(id: string): any | undefined {
    return this.approvals.find(a => a.id === id);
  }

  create(data: any): any {
    const newApproval = {
      ...data,
      id: `appr-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.approvals.push(newApproval);
    return newApproval;
  }

  delete(id: string): boolean {
    const index = this.approvals.findIndex(a => a.id === id);
    if (index === -1) return false;
    this.approvals.splice(index, 1);
    return true;
  }
}

export const approvalRepository = new ApprovalRepository();