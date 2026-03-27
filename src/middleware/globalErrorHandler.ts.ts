import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  status?: number;
  code?: string;
  details?: unknown;
}

export const errorMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = Number(err.status) || 500;

  const response = {
    status: 'error',
    statusCode: status,
    code: err.code || (status === 400 ? 'VALIDATION_ERROR' : 'SERVER_ERROR'),
    message: err.message || 'Щось пішло не так на сервері',
    details: err.details || undefined,
  };

  console.error(
    `[ERROR] ${status} ${req.method} ${req.path} - ${err.message}`
  );

  res.status(status).json(response);
};