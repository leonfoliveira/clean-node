import faker from 'faker';

import { mockAccountModel } from '@/domain/mocks';
import { AccountModel } from '@/domain/models';
import { AddAccount } from '@/domain/usecases';

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export class AddAccountStub implements AddAccount {
  response = mockAccountModel();

  async add(): Promise<AccountModel> {
    return this.response;
  }
}
