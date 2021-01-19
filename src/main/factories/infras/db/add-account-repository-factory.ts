import { AddAccountRepository } from '@/data/interfaces';
import { MongodbAccountRepository } from '@/infra';

export const makeAddAccountRepository = (): AddAccountRepository => new MongodbAccountRepository();
