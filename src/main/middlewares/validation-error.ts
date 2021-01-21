import { isCelebrateError } from 'celebrate';
import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

export const validationError = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  if (isCelebrateError(err)) {
    return res.status(400).json({
      error: `Invalid Param: ${[...err.details.entries()][0][1].message}`,
    });
  }

  return next(err);
};
