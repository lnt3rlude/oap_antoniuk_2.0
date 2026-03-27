import express from "express";
import type { Request, Response } from "express";
import cors from "cors"; // Додай cors, щоб фронтенд міг підключитися
import accessRoutes from "./routes/access.routes";
import { globalErrorHandler } from './middleware/error.handler';
import { requestLogger } from './middleware/logger.middleware';


const app = express();

// 1. ПУНКТ 8: ЛОГУВАННЯ (має бути першим, щоб засікти час)
app.use(requestLogger);

// 2. БАЗОВІ НАЛАШТУВАННЯ
app.use(cors()); // Дозволяє запити з браузера (важливо для app.js)
app.use(express.json());

// 3. ТЕСТОВИЙ МАРШРУТ
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ ok: true, timestamp: new Date() });
});

// 4. ПУНКТ 3: РОУТИ
app.use('/api/access-requests', accessRoutes);

// 5. ПУНКТ 7: ЦЕНТРАЛІЗОВАНА ОБРОБКА ПОМИЛОК
// Використовуй тільки globalErrorHandler, він у нас найновіший
app.use(globalErrorHandler);

// ЗАПУСК
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`
  🚀 Сервер запущено!
  🔗 URL: http://localhost:${PORT}
  🏥 Health check: http://localhost:${PORT}/health
  `);
});