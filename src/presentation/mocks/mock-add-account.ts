import { mockAccountModel } from '@/domain/mocks';
import { AccountModel } from '@/domain/models';
import { AddAccount } from '@/domain/usecases';

export class AddAccountStub implements AddAccount {
  response = mockAccountModel();

  async add(): Promise<AccountModel> {
    return this.response;
  }
}
