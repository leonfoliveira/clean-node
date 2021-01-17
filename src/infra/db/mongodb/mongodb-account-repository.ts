import {
  AddAccountRepository,
  AddAccountRepositoryParams,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
} from '@/data/interfaces/db';
import { AccountModel } from '@/domain/models';
import { MongoHelper } from '@/infra/db/mongodb';

export class MongodbAccountRepository
  implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async add(params: AddAccountRepositoryParams): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(params);

    return MongoHelper.mapId(result.ops[0]);
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({ email });

    return account && MongoHelper.mapId(account);
  }

  async updateAccessToken(id: string, accessToken: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.updateOne(
      { _id: id },
      {
        $set: { accessToken },
      },
    );
  }
}
