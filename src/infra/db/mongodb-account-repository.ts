import {
  AddAccountRepository,
  AddAccountRepositoryParams,
  LoadAccountByEmailRepository,
  LoadAccountByTokenRepository,
  UpdateAccessTokenRepository,
} from '@/data/interfaces';
import { AccountModel } from '@/domain/models';
import { MongoHelper } from '@/infra';

export class MongodbAccountRepository
  implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
    LoadAccountByTokenRepository {
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

  async loadByToken(accessToken: string, role?: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({
      accessToken,
      $or: [{ role }, { role: 'admin' }],
    });

    return account && MongoHelper.mapId(account);
  }

  async updateAccessToken(id: string, accessToken: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.updateOne({ _id: id }, { $set: { accessToken } });
  }
}
