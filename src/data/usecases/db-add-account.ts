import {
  HashGenerator,
  AddAccountRepository,
  LoadAccountByEmailRepository,
} from '@/data/interfaces';
import { ProtectedAccountModel } from '@/domain/models';
import { AddAccount, AddAccountDTO } from '@/domain/usecases';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hashGenerator: HashGenerator,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
  ) {}

  async add(params: AddAccountDTO): Promise<ProtectedAccountModel> {
    const isEmailInUse = await this.loadAccountByEmailRepository.loadByEmail(params.email);
    if (isEmailInUse) {
      return null;
    }

    const hashedPassword = await this.hashGenerator.generate(params.password);

    const account = await this.addAccountRepository.add({
      ...params,
      password: hashedPassword,
    });
    delete account.password;

    return account;
  }
}
