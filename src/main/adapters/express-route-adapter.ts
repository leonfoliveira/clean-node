import { Request, Response } from 'express';

import { Controller } from '@/presentation/interfaces';

export const adaptRoute = (controller: Controller) => async (
  req: Request,
  res: Response,
): Promise<void> => {
  const request: Record<string, any> = {
    ...req.params,
    ...req.headers,
    ...req.body,
  };

  const httpResponse = await controller.handle(request);

  if (httpResponse.statusCode >= 400) {
    res.status(httpResponse.statusCode).json({ error: httpResponse.body.message });
  } else {
    res.status(httpResponse.statusCode).json(httpResponse.body);
  }
};
