import { Application } from 'express';
import { serve, setup } from 'swagger-ui-express';

import { swaggerConfig } from '@/main/docs';
import { noCache } from '@/main/middlewares';

export const setupSwagger = (app: Application): void => {
  app.use('/docs', noCache, serve, setup(swaggerConfig));
};
