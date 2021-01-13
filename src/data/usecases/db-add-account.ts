import { AddAccountRepository, Encrypter } from '@/data/protocols';
import { AccountModel } from '@/domain/models';
import { AddAccount } from '@/domain/usecases';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository,
  ) {}

  async add(params: AddAccount.Params): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(params.password);

    await this.addAccountRepository.add({
      ...params,
      password: hashedPassword,
    });

    return null;
  }
}
