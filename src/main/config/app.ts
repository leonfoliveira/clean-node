import express, { Application } from 'express';

import {
  setupRoutes,
  setupSwagger,
  setupStaticFiles,
  setupRequestMiddlewares,
  setupResponseMiddlewares,
} from '@/main/config';

const app: Application = express();

setupStaticFiles(app);
setupSwagger(app);
setupRequestMiddlewares(app);
setupRoutes(app);
setupResponseMiddlewares(app);

export { app };
