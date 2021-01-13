import { AddAccountRepository, Encrypter } from '@/data/protocols';
import { AccountModel } from '@/domain/models';
import { AddAccount } from '@/domain/usecases';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository,
  ) {}

  async add(account: AddAccount.Params): Promise<AccountModel> {
    const password = await this.encrypter.encrypt(account.password);

    await this.addAccountRepository.add({
      ...account,
      password,
    });

    return null;
  }
}
