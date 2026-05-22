import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Response {
      ok(data?: unknown, message?: string, count?: number): void;
      fail(message: string, statusCode?: number): void;
    }
  }
}

export const responseMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.ok = (data?: unknown, message = 'OK', count?: number): void => {
    const statusCode = res.statusCode === 200 ? 200 : res.statusCode;
    const body: Record<string, unknown> = { success: true, statusCode, message };
    if (data !== undefined) body.data = data;
    if (count !== undefined) body.count = count;
    res.json(body);
  };

  res.fail = (message: string, statusCode = 400): void => {
    res.status(statusCode).json({ success: false, statusCode, message });
  };

  next();
};
