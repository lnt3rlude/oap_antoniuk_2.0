import { AccessResponseDto } from "../dtos/access.dto";

class AccessRepository {
  private records: AccessResponseDto[] = [];

  findAll(): AccessResponseDto[] { return this.records; }

  findById(id: string): AccessResponseDto | undefined {
  return this.records.find(r => r.id === id);
  }

  create(data: Omit<AccessResponseDto, "id">): AccessResponseDto {
    if (!data.userName || !data.status) 
        throw new Error("userName and status are required");
  const newRecord: AccessResponseDto = {
    ...data,
    id: `a${Date.now()}_${Math.random().toString(36).substring(2,6)}`
  };
  this.records.push(newRecord);
  return newRecord;
  }

  delete(id: string): boolean {
  const index = this.records.findIndex(r => r.id === id);
  if (index === -1) return false;
  this.records.splice(index, 1);
  return true;
  }

  // Для фільтрації (згідно з розділом Query Params)
  filter(status?: string, search?: string): AccessResponseDto[] {
    let list = this.records;
    if (status) list = list.filter(r => r.status === status);
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(r => r.userName.toLowerCase().includes(s));
    }
    return list;
  }
}
export const accessRepository = new AccessRepository();