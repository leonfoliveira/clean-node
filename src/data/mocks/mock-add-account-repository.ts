import { AddAccountRepository } from '@/data/protocols';
import { mockAccountModel } from '@/domain/mocks';
import { AccountModel } from '@/domain/models';
import { mockAddAccountDTO } from '@/presentation/mocks';

export const mockAddAccountRepositoryParams = mockAddAccountDTO;

export class AddAccountRepositoryStub implements AddAccountRepository {
  response = mockAccountModel();

  async add(): Promise<AccountModel> {
    return this.response;
  }
}
