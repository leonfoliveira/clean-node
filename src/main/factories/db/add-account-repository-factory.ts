import { AddAccountRepository } from '@/data/protocols';
import { MongodbAddAccountRepository } from '@/infra/db/mongodb';

export const makeAddAccountRepository = (): AddAccountRepository =>
  new MongodbAddAccountRepository();
