import { Application } from 'express';

import { bodyParser, validationError, contentType, cors } from '@/main/middlewares';

export const setupRequestMiddlewares = (app: Application): void => {
  app.use(bodyParser);
  app.use(cors);
  app.use(contentType);
};

export const setupResponseMiddlewares = (app: Application): void => {
  app.use(validationError);
};
