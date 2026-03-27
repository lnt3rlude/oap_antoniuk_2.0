import express from "express";
import type { Request, Response } from "express";
import cors from "cors";

import { AccessService } from "./services/access.service";
import { createAccessRouter } from "./routes/access.routes";

import { globalErrorHandler } from "./middleware/error.handler";
import { requestLogger } from "./middleware/logger.middleware";

const app = express();

// middleware
app.use(requestLogger);
app.use(cors());
app.use(express.json());

// health
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ ok: true, timestamp: new Date() });
});

// 🔥 CREATE SERVICE + ROUTER (ОЦЕ ГОЛОВНЕ)
const accessService = new AccessService();
const accessRoutes = createAccessRouter(accessService);

app.use("/api/access-requests", accessRoutes);

// error handler
app.use(globalErrorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running: http://localhost:${PORT}`);
});