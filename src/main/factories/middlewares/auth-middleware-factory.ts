import { makeLoadAccountByToken } from '@/main/factories/usecases';
import { AuthMiddleware } from '@/presentation/middlewares';

export const makeAuthMiddleware = (role?: string): AuthMiddleware =>
  new AuthMiddleware(makeLoadAccountByToken(), role);
