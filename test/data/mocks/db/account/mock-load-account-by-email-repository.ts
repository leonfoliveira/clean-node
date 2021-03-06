import faker from 'faker';

import { LoadAccountByEmailRepository } from '@/data/interfaces';
import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/test/domain/mocks/models';

export const mockLoadAccountByEmailRepositoryParams = (): string => faker.internet.email();

export class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
  response = mockAccountModel();

  async loadByEmail(): Promise<AccountModel> {
    return this.response;
  }
}
