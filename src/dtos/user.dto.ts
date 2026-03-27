export interface CreateUserDto {
  userName: string;
}

export interface UserResponseDto {
  id: string;
  userName: string;
}

export interface UpdateUserDto {
  userName?: string;
}