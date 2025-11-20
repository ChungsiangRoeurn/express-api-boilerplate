import type { NextFunction, Request, Response } from "express";
import { ErrorCode, HttpException } from "./exceptions/root.ts";
import { InternalException } from "./exceptions/internal-exception.ts";

export const ErrorHandle = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
      } else {
        exception = new InternalException(
          "Something went wrong!",
          error,
          ErrorCode.INTERNAL_EXCEPTION
        );
      }
      next(exception);
    }
  };
};
