import express, { Application } from 'express';

import { setupRequestMiddlewares, setupResponseMiddlewares } from '@/main/config/middlewares';
import { setupRoutes } from '@/main/config/routes';

const app: Application = express();

setupRequestMiddlewares(app);
setupRoutes(app);
setupResponseMiddlewares(app);

export { app };
