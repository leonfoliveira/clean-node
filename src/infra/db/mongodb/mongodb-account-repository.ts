import { AddAccountRepository, AddAccountRepositoryParams } from '@/data/protocols';
import { AccountModel } from '@/domain/models';
import { MongoHelper } from '@/infra/helpers/mongo-helper';

export class MongodbAccountRepository implements AddAccountRepository {
  async add(params: AddAccountRepositoryParams): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');

    const result = await accountCollection.insertOne(params);

    const account = result.ops[0];
    account.id = account._id;
    delete account._id;
    return account;
  }
}
