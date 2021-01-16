import { DbAddAccount } from '@/data/usecases';
import { AddAccount } from '@/domain/usecases';
import { makeEncrypter } from '@/main/factories/cryptography';
import { makeAddAccountRepository } from '@/main/factories/db';

export const makeAddAccount = (): AddAccount =>
  new DbAddAccount(makeEncrypter(), makeAddAccountRepository());
