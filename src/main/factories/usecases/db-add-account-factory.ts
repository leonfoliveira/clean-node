import { DbAddAccount } from '@/data/usecases';
import { makeBcryptAdapter } from '@/main/factories/cryptography';
import { makeMongodbAccountRepository } from '@/main/factories/db/mongodb';

export const makeDbAddAccount = (): DbAddAccount =>
  new DbAddAccount(makeBcryptAdapter(), makeMongodbAccountRepository());
