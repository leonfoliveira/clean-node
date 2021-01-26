import express, { Application } from 'express';

import {
  setupApolloServer,
  setupRoutes,
  setupSwagger,
  setupStaticFiles,
  setupRequestMiddlewares,
  setupResponseMiddlewares,
} from '@/main/config';

const app: Application = express();

setupApolloServer(app);
setupStaticFiles(app);
setupSwagger(app);
setupRequestMiddlewares(app);
setupRoutes(app);
setupResponseMiddlewares(app);

export { app };
