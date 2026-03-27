import { accessRepository } from "../repositories/access.repository";
import { userRepository } from "../repositories/user.repository";
import {
  CreateAccessDto,
  AccessResponseDto,
  UpdateAccessDto
} from "../dtos/access.dto";
import { applyFilters } from "../utils/applyFilters";
import { paginate } from "../utils/paginate";

export class AccessService {

  // READ ALL + FILTERS + PAGINATION
  getAll(query: any): {
    data: AccessResponseDto[];
    total: number;
    page: number | null;
    pageSize: number | null;
    skip: number;
    take: number;
  } {

    const records = accessRepository.findAll();

    // 1. FILTERS
    const filtered = applyFilters(records, query);

    // 2. PAGINATION
    const result = paginate(filtered, query);

    return {
      ...result,
      data: result.data.map(r => this.mapToResponse(r))
    };
  }

  // READ ONE
  getRecordById(id: string): AccessResponseDto {
    const record = accessRepository.findById(id);

    if (!record) {
      throw { status: 404, message: "Запис не знайдено" };
    }

    return this.mapToResponse(record);
  }

  // CREATE
  createRequest(dto: CreateAccessDto): AccessResponseDto {
    let user = userRepository.findByName(dto.userName);

    if (!user) {
      user = userRepository.create({
        userName: dto.userName,
      });
    }

    const created = accessRepository.create({
      userId: user.id,
      userName: user.userName,
      date: dto.date,
      accessType: dto.accessType,
      comments: dto.comments ?? "",
      status: dto.status ?? "Pending",
    });

    return this.mapToResponse(created);
  }

  // UPDATE
  updateRecord(id: string, dto: UpdateAccessDto): AccessResponseDto {
    const record = accessRepository.findById(id);

    if (!record) {
      throw { status: 404, message: "Запис не знайдено" };
    }

    const updated = {
      ...record,
      ...dto,
    };

    accessRepository.delete(id);
    const saved = accessRepository.create(updated);

    return this.mapToResponse(saved);
  }

  // DELETE
  deleteRecord(id: string): void {
    const success = accessRepository.delete(id);

    if (!success) {
      throw { status: 404, message: "Запис не знайдено" };
    }
  }

  // MAPPER
  private mapToResponse(record: any): AccessResponseDto {
    return {
      id: record.id,
      userId: record.userId,
      userName: record.userName,
      date: record.date,
      accessType: record.accessType,
      comments: record.comments,
      status: record.status
    };
  }
}