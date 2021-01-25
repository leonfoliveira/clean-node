import { NextFunction, Request, Response } from 'express';

import { Middleware } from '@/presentation/interfaces';

export const adaptMiddleware = (middleware: Middleware) => async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const request: Record<string, any> = {
    ...req.headers,
    accessToken: req.headers?.['x-access-token'],
  };

  const httpResponse = await middleware.handle(request);

  if (httpResponse.statusCode === 200) {
    Object.assign(req.headers, httpResponse.body);
    next();
  } else {
    res.status(httpResponse.statusCode).json({ error: httpResponse.body.message });
  }
};
