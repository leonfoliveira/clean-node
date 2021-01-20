import faker from 'faker';

import { AccountModel } from '@/domain/models';
import { AddAccount, AddAccountDTO } from '@/domain/usecases';
import { mockAccountModel } from '@/test/domain/mocks/models';

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
