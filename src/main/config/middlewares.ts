import { Application } from 'express';

import { bodyParser, cors } from '@/main/middlewares';

export const setupMiddlewares = (app: Application): void => {
  app.use(bodyParser);
  app.use(cors);
};
