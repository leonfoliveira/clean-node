import { AddAccountRepository } from '@/data/interfaces/db';
import { MongodbAddAccountRepository } from '@/infra/db/mongodb';

export const makeAddAccountRepository = (): AddAccountRepository =>
  new MongodbAddAccountRepository();
