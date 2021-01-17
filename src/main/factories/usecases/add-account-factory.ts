import { DbAddAccount } from '@/data/usecases';
import { AddAccount } from '@/domain/usecases';
import { makeHashGenerator } from '@/main/factories/cryptography';
import { makeAccountRepository } from '@/main/factories/db';

export const makeAddAccount = (): AddAccount =>
  new DbAddAccount(makeHashGenerator(), makeAccountRepository());
