import { Request, Response, NextFunction } from "express";
import { ApprovalService } from "../services/approval.service.js";
import {
  CreateApprovalDto,
  UpdateApprovalDto,
  ApprovalResponseDto
} from "../dtos/approval.dto";

type IdParam = {
  id: string;
};

type GetAllResponse = {
  items: ApprovalResponseDto[];
  total: number;
};

export class ApprovalController {
  constructor(private approvalService: ApprovalService) {}

  // CREATE
  create = (
    req: Request<{}, ApprovalResponseDto, CreateApprovalDto>,
    res: Response<ApprovalResponseDto>,
    next: NextFunction
  ) => {
    try {
      const result = this.approvalService.createApproval(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };

  // GET ALL
  getAll = (
    req: Request,
    res: Response<GetAllResponse>,
    next: NextFunction
  ) => {
    try {
      const records = this.approvalService.getAll();

      res.json({
        items: records,
        total: records.length
      });
    } catch (err) {
      next(err);
    }
  };

  // GET BY ID
  getById = (
    req: Request<IdParam>,
    res: Response<ApprovalResponseDto>,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      const approval = this.approvalService.getById(id);

      if (!approval) {
        return res.status(404).json({ message: "Не знайдено" } as any);
      }

      res.json(approval);
    } catch (err) {
      next(err);
    }
  };

  // UPDATE
  update = (
    req: Request<IdParam, ApprovalResponseDto, UpdateApprovalDto>,
    res: Response<ApprovalResponseDto>,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      const result = this.approvalService.update(id, req.body);

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
      const { id } = req.params;

      this.approvalService.delete(id);

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}