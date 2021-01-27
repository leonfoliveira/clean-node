import express, { Application } from 'express';

import {
  setupApolloServer,
  setupRoutes,
  setupSwagger,
  setupStaticFiles,
  setupMiddlewares,
} from '@/main/config';

const app: Application = express();

setupApolloServer(app);
setupStaticFiles(app);
setupSwagger(app);
setupMiddlewares(app);
setupRoutes(app);

export { app };
