import { LoadAccountByEmailRepository } from '@/data/interfaces';
import { MongodbAccountRepository } from '@/infra/db/mongodb';

export const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository =>
  new MongodbAccountRepository();
