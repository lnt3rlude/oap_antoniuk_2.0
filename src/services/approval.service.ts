import { approvalRepository } from "../repositories/approval.repository";
import { accessRepository } from "../repositories/access.repository";
import { userRepository } from "../repositories/user.repository";
import {
  CreateApprovalDto,
  ApprovalResponseDto,
  UpdateApprovalDto
} from "../dtos/approval.dto";
import { applyFilters } from "../utils/applyFilters";
import { Approval } from "../models/approval.model";
import { ApprovalFilters } from "../types/approval.types";

export class ApprovalService {

  // CREATE
  createApproval(dto: CreateApprovalDto): ApprovalResponseDto {
    const request = accessRepository.findById(dto.requestId);
    if (!request) throw { statusCode: 404, message: "Запит не знайдено" };

    const admin = userRepository.findById(dto.adminId);
    if (!admin) throw { statusCode: 404, message: "Адміна не знайдено" };

    request.status = dto.decision;

    const created = approvalRepository.create({
      requestId: dto.requestId,
      adminId: dto.adminId,
      decision: dto.decision,
      remark: dto.remark || ""
    });

    return this.mapToResponse(created, admin.userName);
  }

  // READ ALL + FILTERS + PAGINATION
  getAll(filters: ApprovalFilters = {}): ApprovalResponseDto[] {
  const records = approvalRepository.findAll();

  const filtered = applyFilters(records, filters);

  const page = filters.page || 1;
  const pageSize = filters.pageSize || 10;

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const paginated = filtered.slice(start, end);

  return paginated.map((a: Approval) => {
    const admin = userRepository.findById(a.adminId);
    return this.mapToResponse(a, admin?.userName || "Unknown");
  });
}

  getById(id: string): ApprovalResponseDto {
    const approval = approvalRepository.findById(id);
    if (!approval) throw { statusCode: 404, message: "Approval не знайдено" };

    const admin = userRepository.findById(approval.adminId);

    return this.mapToResponse(approval, admin?.userName || "Unknown");
  }

  update(id: string, dto: UpdateApprovalDto): ApprovalResponseDto {
    const approval = approvalRepository.findById(id);
    if (!approval) throw { statusCode: 404, message: "Approval не знайдено" };

    const admin = userRepository.findById(approval.adminId);

    if (dto.decision !== undefined) approval.decision = dto.decision;
    if (dto.remark !== undefined) approval.remark = dto.remark;

    return this.mapToResponse(approval, admin?.userName || "Unknown");
  }

  delete(id: string): void {
    const success = approvalRepository.delete(id);
    if (!success) {
      throw { statusCode: 404, message: "Схвалення не знайдено" };
    }
  }

  private mapToResponse(
    approval: Approval,
    adminName: string
  ): ApprovalResponseDto {
    return {
      id: approval.id,
      requestId: approval.requestId,
      adminName,
      decision: approval.decision,
      remark: approval.remark,
      createdAt: approval.createdAt
    };
  }
}