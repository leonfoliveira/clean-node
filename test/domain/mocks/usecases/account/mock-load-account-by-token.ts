import { AccountModel } from '@/domain/models';
import { LoadAccountByToken } from '@/domain/usecases';
import { mockAccountModel } from '@/test/domain/mocks/models';

export class LoadAccountByTokenStub implements LoadAccountByToken {
  response = mockAccountModel();

  async load(): Promise<AccountModel> {
    return this.response;
  }
}
