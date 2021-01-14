import { Application, Router } from 'express';
import fg from 'fast-glob';

export const setupRoutes = (app: Application): void => {
  const router = Router();
  app.use('/api', router);

  fg.sync('**/src/main/routes/**-routes.ts').forEach(async (file) =>
    (await import(`../../../${file}`)).default(router),
  );
};
