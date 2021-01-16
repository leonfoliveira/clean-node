import { AddAccountRepository } from '@/data/protocols';
import { mockAccountModel, mockAddAccountDTO } from '@/domain/mocks';
import { AccountModel } from '@/domain/models';

export const mockAddAccountRepositoryParams = mockAddAccountDTO;

export class AddAccountRepositoryStub implements AddAccountRepository {
  response = mockAccountModel();

  async add(): Promise<AccountModel> {
    return this.response;
  }
}
