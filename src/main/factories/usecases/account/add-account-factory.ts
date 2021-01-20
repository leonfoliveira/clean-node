import { DbAddAccount } from '@/data/usecases';
import { AddAccount } from '@/domain/usecases';
import {
  makeHashGenerator,
  makeAddAccountRepository,
  makeLoadAccountByEmailRepository,
} from '@/main/factories/infras';

export const makeAddAccount = (): AddAccount =>
  new DbAddAccount(
    makeHashGenerator(),
    makeAddAccountRepository(),
    makeLoadAccountByEmailRepository(),
  );
