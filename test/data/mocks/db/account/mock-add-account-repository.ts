import faker from 'faker';

import { AddAccountRepository } from '@/data/interfaces';
import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/test/domain/mocks/models';

export const mockAddAccountRepositoryParams = (): AddAccountRepository.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export class AddAccountRepositoryStub implements AddAccountRepository {
  response = mockAccountModel();

  async add(): Promise<AccountModel> {
    return this.response;
  }
}
