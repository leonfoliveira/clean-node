import fs from 'fs';

import { Application, Router } from 'express';

export const setupRoutes = (app: Application): void => {
  const router = Router();
  app.use('/api', router);

  fs.readdirSync(`${__dirname}/../routes`).map(async (file) => {
    if (/\.(js|ts)$/.test(file)) {
      (await import(`../routes/${file}`)).default(router);
    }
  });
};
