import { UserResponseDto, CreateUserDto } from "../dtos/user.dto";

class UserRepository {
  private users: UserResponseDto[] = [];

  findAll(): UserResponseDto[] { return this.users; }

  findById(id: string): UserResponseDto | undefined {
    return this.users.find(u => u.id === id);
  }

  findByName(userName: string): UserResponseDto | undefined {
    return this.users.find(u => u.userName === userName);
  }

  create(data: CreateUserDto): UserResponseDto {
    if (!data.userName || data.userName.trim() === "") {
        throw new Error("Username is required");
    }
    const newUser: UserResponseDto = {
      id: `u${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      userName: data.userName
    };
    this.users.push(newUser);
    return newUser;
  }

  delete(id: string): boolean {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      return false; // Користувача не знайдено
    }
    this.users.splice(index, 1); // Видаляємо 1 елемент за знайденим індексом
    return true; // Видалення успішне
  }

  update(id: string, data: { userName: string }): any {
    const user = this.users.find(u => u.id === id);
    if (user) {
      user.userName = data.userName;
      return user;
    }
    return null;
  }
}
export const userRepository = new UserRepository();