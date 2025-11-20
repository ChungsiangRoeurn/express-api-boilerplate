import type { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  error: any, // <-- was HttpException
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  res.status(statusCode).json({
    message,
    errorCode: error.errorCode || "INTERNAL_ERROR",
    errors: error.errors || null,
  });
};
