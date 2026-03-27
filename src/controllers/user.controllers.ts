import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto
} from "../dtos/user.dto";

type IdParam = {
  id: string;
};

export class UserController {
  constructor(private userService: UserService) {}

  // GET ALL
  getAll = (
    req: Request,
    res: Response<UserResponseDto[]>,
    next: NextFunction
  ) => {
    try {
      const users = this.userService.getAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  };

  // GET BY ID
  getById = (
    req: Request<IdParam>,
    res: Response<UserResponseDto>,
    next: NextFunction
  ) => {
    try {
      const user = this.userService.getById(req.params.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  };

  // CREATE
  create = (
    req: Request<{}, UserResponseDto, CreateUserDto>,
    res: Response<UserResponseDto>,
    next: NextFunction
  ) => {
    try {
      const result = this.userService.create(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };

  // UPDATE
  update = (
    req: Request<IdParam, UserResponseDto, UpdateUserDto>,
    res: Response<UserResponseDto>,
    next: NextFunction
  ) => {
    try {
      const result = this.userService.update(req.params.id, req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  };

  // DELETE
  delete = (
    req: Request<IdParam>,
    res: Response<void>,
    next: NextFunction
  ) => {
    try {
      this.userService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}