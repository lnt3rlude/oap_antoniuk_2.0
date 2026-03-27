import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  statusCode?: number;
  status?: number;
  code?: string;
  details?: unknown[];
}

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = Number(err.statusCode || err.status) || 500;

  const errorResponse = {
    error: {
      code: err.code || (statusCode === 400 ? "VALIDATION_ERROR" : "SERVER_ERROR"),
      message: err.message || "Internal Server Error",
      details: err.details?.length ? err.details : undefined,
    }
  };

  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  } else {
    console.error(`[${errorResponse.error.code}] ${req.method} ${req.path}`);
  }

  res.status(statusCode).json(errorResponse);
};