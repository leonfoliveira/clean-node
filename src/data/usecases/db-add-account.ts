import { AddAccountRepository, Encrypter } from '@/data/interfaces';
import { ProtectedAccountModel } from '@/domain/models';
import { AddAccount, AddAccountDTO } from '@/domain/usecases';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository,
  ) {}

  async add(params: AddAccountDTO): Promise<ProtectedAccountModel> {
    const hashedPassword = await this.encrypter.encrypt(params.password);

    const account = await this.addAccountRepository.add({
      ...params,
      password: hashedPassword,
    });
    delete account.password;

    return account;
  }
}
