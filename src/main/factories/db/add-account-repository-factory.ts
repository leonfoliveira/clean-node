import { AddAccountRepository } from '@/data/interfaces/db';
import { MongodbAccountRepository } from '@/infra/db/mongodb';

export const makeAddAccountRepository = (): AddAccountRepository => new MongodbAccountRepository();