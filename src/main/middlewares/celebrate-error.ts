import { isCelebrateError } from 'celebrate';
import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

export const celebrateError = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  if (isCelebrateError(err)) {
    for (const [, joiError] of err.details.entries()) {
      return res.status(400).json({
        error: `Invalid Param: ${joiError.message}`,
      });
    }
  }

  return next(err);
};
