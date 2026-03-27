import { Approval } from "../models/approval.model";

class ApprovalRepository {
  private approvals: Approval[] = [];

  findAll(): Approval[] {
    return this.approvals;
  }

  findById(id: string): Approval | undefined {
    return this.approvals.find(a => a.id === id);
  }

  create(data: Omit<Approval, "id" | "createdAt">): Approval {
    const newApproval: Approval = {
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