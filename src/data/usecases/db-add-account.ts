import { Encrypter } from '@/data/protocols';
import { AccountModel } from '@/domain/models';
import { AddAccount } from '@/domain/usecases';

export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {}

  async add(account: AddAccount.Params): Promise<AccountModel> {
    this.encrypter.encrypt(account.password);
    return null;
  }
}
