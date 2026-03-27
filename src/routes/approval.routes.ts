import { Router } from "express";
import { ApprovalService } from "../services/approval.service";
import { ApprovalController } from "../controllers/approval.controllers.ts";

const router = Router();

const approvalService = new ApprovalService();
const controller = new ApprovalController(approvalService);

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;