import { Application } from 'express';
import { serve, setup } from 'swagger-ui-express';

import { swaggerConfig } from '@/main/docs';

export const setupSwagger = (app: Application): void => {
  app.use('/docs', serve, setup(swaggerConfig));
};
