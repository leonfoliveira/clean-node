import faker from 'faker';

import { LoadAccountByEmailRepository } from '@/data/interfaces';
import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/test/domain/mocks';

export const mockLoadAccountByEmailRepositoryParams = faker.internet.email();

export class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
  response = mockAccountModel();

  async load(): Promise<AccountModel> {
    return this.response;
  }
}
