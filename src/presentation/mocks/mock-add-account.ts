import faker from 'faker';

import { mockAccountModel } from '@/domain/mocks';
import { AccountModel } from '@/domain/models';
import { AddAccount, AddAccountDTO } from '@/domain/usecases';

export const mockAddAccountDTO = (): AddAccountDTO => ({
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
