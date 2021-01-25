import path from 'path';

import express, { Application } from 'express';

export const setupStaticFiles = (app: Application): void => {
  app.use('/static', express.static(path.resolve(__dirname, '../../static')));
};
