import { Application } from 'express';

import { bodyParser } from '@/main/middlewares';

export const setupMiddlewares = (app: Application): void => {
  app.use(bodyParser);
};
