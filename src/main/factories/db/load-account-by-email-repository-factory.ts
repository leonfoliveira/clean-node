import { LoadAccountByEmailRepository } from '@/data/interfaces/db';
import { MongodbAccountRepository } from '@/infra/db/mongodb';

export const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository =>
  new MongodbAccountRepository();
