import {
  AddAccountRepository,
  AddAccountRepositoryParams,
  LoadAccountByEmailRepository,
} from '@/data/interfaces/db';
import { AccountModel } from '@/domain/models';
import { MongoHelper } from '@/infra/db/mongodb';

export class MongodbAccountRepository
  implements AddAccountRepository, LoadAccountByEmailRepository {
  async add(params: AddAccountRepositoryParams): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(params);

    return MongoHelper.mapId(result.ops[0]);
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({ email });

    return MongoHelper.mapId(account);
  }
}
