import { AddAccountRepository } from '@/data/protocols';
import { AccountModel } from '@/domain/models';

export class AddAccountRepositoryStub implements AddAccountRepository {
  async add(): Promise<AccountModel> {
    return null;
  }
}
