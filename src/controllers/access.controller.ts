import { Request, Response, NextFunction } from "express";
import { AccessService } from "../services/access.service";
import {
  CreateAccessDto,
  UpdateAccessDto,
  AccessResponseDto
} from "../dtos/access.dto";

/**
 * Query для getAll
 */
type GetAllQuery = {
  status?: string;
  search?: string;
};

/**
 * Response для getAll
 */
type GetAllResponse = {
  items: AccessResponseDto[];
  total: number;
};

export class AccessController {
  constructor(private accessService: AccessService) {}

  // GET ALL
  getAll = (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    try {
      const result = this.accessService.getAll(req.query);

      res.json({
        items: result.data,
        total: result.total
      });
    } catch (err) {
      next(err);
    }
  };

  // GET BY ID
  getById = (
    req: Request<{ id: string }>,
    res: Response<AccessResponseDto>,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      const result = this.accessService.getRecordById(id);

      res.json(result);
    } catch (err) {
      next(err);
    }
  };

  // CREATE
  create = (
    req: Request<{}, AccessResponseDto, CreateAccessDto>,
    res: Response<AccessResponseDto>,
    next: NextFunction
  ) => {
    try {
      const result = this.accessService.createRequest(req.body);

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };

  // UPDATE
  update = (
    req: Request<{ id: string }, AccessResponseDto, UpdateAccessDto>,
    res: Response<AccessResponseDto>,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      const result = this.accessService.updateRecord(id, req.body);

      res.json(result);
    } catch (err) {
      next(err);
    }
  };

  // DELETE
  delete = (
    req: Request<{ id: string }>,
    res: Response<void>,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      this.accessService.deleteRecord(id);

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}