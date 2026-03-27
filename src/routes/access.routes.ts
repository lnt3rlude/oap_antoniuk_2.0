import { Router } from "express";
import { AccessController } from "../controllers/access.controller";
import { validateAccessRequest } from "../middleware/validation.middleware";
import { AccessService } from "../services/access.service";

export const createAccessRouter = (accessService: AccessService) => {
  const router = Router();

  const controller = new AccessController(accessService);

  router.get("/", controller.getAll);
  router.get("/:id", controller.getById);
  router.post("/", validateAccessRequest, controller.create);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.delete);

  return router;
};