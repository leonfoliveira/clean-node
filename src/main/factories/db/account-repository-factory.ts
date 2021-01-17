import { AddAccountRepository } from '@/data/interfaces/db';
import { MongodbAccountRepository } from '@/infra/db/mongodb';

export const makeAccountRepository = (): AddAccountRepository => new MongodbAccountRepository();
