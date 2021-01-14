import { Application } from 'express';

import { bodyParser, contentType, cors } from '@/main/middlewares';

export const setupMiddlewares = (app: Application): void => {
  app.use(bodyParser);
  app.use(cors);
  app.use(contentType);
};
