import { LoadAccountByTokenRepository } from '@/data/interfaces';
import { MongodbAccountRepository } from '@/infra';

export const makeLoadAccountByTokenRepository = (): LoadAccountByTokenRepository =>
  new MongodbAccountRepository();
