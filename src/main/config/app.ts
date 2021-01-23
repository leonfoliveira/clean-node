import express, { Application } from 'express';

import { setupRequestMiddlewares, setupResponseMiddlewares } from '@/main/config/middlewares';
import { setupRoutes } from '@/main/config/routes';
import { setupSwagger } from '@/main/config/swagger';

const app: Application = express();

setupSwagger(app);
setupRequestMiddlewares(app);
setupRoutes(app);
setupResponseMiddlewares(app);

export { app };
