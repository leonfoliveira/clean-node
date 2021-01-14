import express, { Application } from 'express';

import { setupMiddlewares } from '@/main/config/middlewares';
import { setupRoutes } from '@/main/config/routes';

const app: Application = express();

setupMiddlewares(app);
setupRoutes(app);

export { app };
