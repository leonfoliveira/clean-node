import { LoadAccountByEmailRepository } from '@/data/interfaces';
import { MongodbAccountRepository } from '@/infra';

export const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository =>
  new MongodbAccountRepository();
