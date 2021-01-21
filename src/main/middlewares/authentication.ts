import { RequestHandler } from 'express';

import { adaptMiddleware } from '@/main/adapters';
import { makeAuthMiddleware } from '@/main/factories/middlewares';

export const authenticateAdmin = (): RequestHandler => adaptMiddleware(makeAuthMiddleware('admin'));

export const authenticateUser = (): RequestHandler => adaptMiddleware(makeAuthMiddleware());
