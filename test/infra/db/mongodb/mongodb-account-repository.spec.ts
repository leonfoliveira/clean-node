import { Collection } from 'mongodb';

import { MongoHelper, MongodbAccountRepository } from '@/infra/db/mongodb';
import {
  mockAddAccountRepositoryParams,
  mockLoadAccountByEmailRepositoryParams,
} from '@/test/data/mocks/db';

const makeSut = (): MongodbAccountRepository => new MongodbAccountRepository();

describe('MongodbAccountRepository', () => {
  let accountCollection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  it('should return an AccountModel on add success', async () => {
    const sut = makeSut();
    const account = mockAddAccountRepositoryParams();

    const result = await sut.add(account);

    expect(result).toBeTruthy();
    expect(result.id).toBeTruthy();
    expect(result.name).toBe(account.name);
    expect(result.email).toBe(account.email);
    expect(result.password).toBe(account.password);
  });

  it('should return an AccountModel on loadByEmail success', async () => {
    const sut = makeSut();
    const account = mockAddAccountRepositoryParams();
    await accountCollection.insertOne(account);

    const result = await sut.loadByEmail(account.email);

    expect(result).toBeTruthy();
    expect(result.id).toBeTruthy();
    expect(result.name).toBe(account.name);
    expect(result.email).toBe(account.email);
    expect(result.password).toBe(account.password);
  });

  it('should return null on loadByEmail fail', async () => {
    const sut = makeSut();

    const result = await sut.loadByEmail(mockLoadAccountByEmailRepositoryParams());

    expect(result).toBeNull();
  });
});
