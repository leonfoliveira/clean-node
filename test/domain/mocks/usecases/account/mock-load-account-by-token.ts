import faker from 'faker';

import { AccountModel } from '@/domain/models';
import { LoadAccountByToken, LoadAccountByTokenDTO } from '@/domain/usecases';
import { mockAccountModel } from '@/test/domain/mocks/models';

export const mockLoadAccountByTokenDTO = (): LoadAccountByTokenDTO => ({
  accessToken: faker.random.uuid(),
  role: faker.random.word(),
});

export class LoadAccountByTokenStub implements LoadAccountByToken {
  response = mockAccountModel();

  async load(): Promise<AccountModel> {
    return this.response;
  }
}
