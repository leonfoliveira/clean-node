import { AddAccountRepository } from '@/data/interfaces';
import { MongodbAddAccountRepository } from '@/infra/db/mongodb';

export const makeAddAccountRepository = (): AddAccountRepository =>
  new MongodbAddAccountRepository();
