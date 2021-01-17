import { AddAccountRepository } from '@/data/interfaces/db';
import { AccountModel } from '@/domain/models';
import { mockAccountModel, mockAddAccountDTO } from '@/test/domain/mocks';

export const mockAddAccountRepositoryParams = mockAddAccountDTO;

export class AddAccountRepositoryStub implements AddAccountRepository {
  response = mockAccountModel();

  async add(): Promise<AccountModel> {
    return this.response;
  }
}
