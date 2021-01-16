import { AddAccountRepository, AddAccountRepositoryParams } from '@/data/interfaces';
import { AccountModel } from '@/domain/models';
import { MongoHelper } from '@/infra/db/mongodb';

export class MongodbAddAccountRepository implements AddAccountRepository {
  async add(params: AddAccountRepositoryParams): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');

    const result = await accountCollection.insertOne(params);

    return MongoHelper.mapId(result.ops[0]);
  }
}
