import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  const log = () => {
    const duration = Date.now() - start;

    const { method, originalUrl } = req;
    const { statusCode } = res;

    const ip = req.ip;
    const userAgent = req.get('user-agent');

    console.log(
      `[${new Date().toISOString()}] ${method} ${originalUrl} ${statusCode} - ${duration}ms - ${ip} - ${userAgent}`
    );
  };

  res.on('finish', log);
  res.on('close', log); // на випадок обриву

  next();
};