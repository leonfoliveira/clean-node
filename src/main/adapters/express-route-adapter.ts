import { Request, Response } from 'express';

import { Controller, HttpRequest } from '@/presentation/interfaces';

export const adaptRoute = (controller: Controller) => async (
  req: Request,
  res: Response,
): Promise<void> => {
  const httpRequest: HttpRequest = {
    body: req.body,
  };

  const httpResponse = await controller.handle(httpRequest);

  if (httpResponse.statusCode >= 400) {
    res.status(httpResponse.statusCode).json({ error: httpResponse.body.message });
  } else {
    res.status(httpResponse.statusCode).json(httpResponse.body);
  }
};
