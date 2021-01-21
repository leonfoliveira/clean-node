import faker from 'faker';

import { LoadAccountByTokenRepository } from '@/data/interfaces';
import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/test/domain/mocks/models';

export const mockLoadAccountByTokenRepositoryParams = (): [string, string?] => [
  faker.internet.email(),
  faker.random.word(),
];

export class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
  response = mockAccountModel();

  async loadByToken(): Promise<AccountModel> {
    return this.response;
  }
}
