import { AddAccountRepository } from '@/data/interfaces';
import { MongodbAccountRepository } from '@/infra/db/mongodb';

export const makeAddAccountRepository = (): AddAccountRepository => new MongodbAccountRepository();
