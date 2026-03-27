import { userRepository } from "../repositories/user.repository";
import { applyFilters } from "../utils/applyFilters";

export interface CreateUserDto {
  userName: string;
}

export interface UpdateUserDto {
  userName?: string;
}

export class UserService {

  // GET ALL + FILTERS + PAGINATION
  getAll(filters: any = {}) {
    const users = userRepository.findAll();

    const filtered = applyFilters(users, filters);

    // PAGINATION
    const page = Number(filters.page) || 1;
    const pageSize = Number(filters.pageSize) || 10;

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return filtered.slice(start, end);
  }

  // GET BY ID
  getById(id: string) {
    const user = userRepository.findById(id);

    if (!user) {
      throw {
        status: 404,
        code: "USER_NOT_FOUND",
        message: "Користувача не знайдено"
      };
    }

    return user;
  }

  // CREATE
  create(dto: CreateUserDto) {
    if (!dto.userName) {
      throw {
        status: 400,
        code: "VALIDATION_ERROR",
        message: "userName обов'язковий"
      };
    }

    return userRepository.create({
      userName: dto.userName
    });
  }

  // UPDATE
  update(id: string, dto: UpdateUserDto) {
    const user = userRepository.findById(id);

    if (!user) {
      throw {
        status: 404,
        code: "USER_NOT_FOUND",
        message: "Користувача не знайдено"
      };
    }

    if (dto.userName !== undefined) {
      user.userName = dto.userName;
    }

    return userRepository.update(id, user);
  }

  // DELETE
  delete(id: string) {
    const success = userRepository.delete(id);

    if (!success) {
      throw {
        status: 404,
        code: "USER_NOT_FOUND",
        message: "Користувача не знайдено"
      };
    }
  }
}