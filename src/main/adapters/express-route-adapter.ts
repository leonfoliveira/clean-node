import { Request, Response } from 'express';

import { Controller, HttpRequest } from '@/presentation/protocols';

export const adaptRoute = (controller: Controller) => async (
  req: Request,
  res: Response,
): Promise<void> => {
  const httpRequest: HttpRequest = {
    body: req.body,
  };

  const httpResponse = await controller.handle(httpRequest);

  if ([200, 201].includes(httpResponse.statusCode)) {
    res.status(httpResponse.statusCode).json(httpResponse.body);
  } else {
    res.status(httpResponse.statusCode).json({ error: httpResponse.body.message });
  }
};
