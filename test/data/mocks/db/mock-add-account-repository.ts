import { AddAccountRepository } from '@/data/interfaces';
import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/test/domain/mocks/models';
import { mockAddAccountDTO } from '@/test/domain/mocks/usecases';

export const mockAddAccountRepositoryParams = mockAddAccountDTO;

export class AddAccountRepositoryStub implements AddAccountRepository {
  response = mockAccountModel();

  async add(): Promise<AccountModel> {
    return this.response;
  }
}
