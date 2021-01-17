import { MongoHelper, MongodbAddAccountRepository } from '@/infra/db/mongodb';
import { mockAddAccountRepositoryParams } from '@/test/data/mocks/db';

const makeSut = (): MongodbAddAccountRepository => new MongodbAddAccountRepository();

describe('MongodbAddAccountRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  it('should return an AccountModel on success', async () => {
    const sut = makeSut();
    const account = mockAddAccountRepositoryParams();

    const result = await sut.add(account);

    expect(result).toBeTruthy();
    expect(result.id).toBeTruthy();
    expect(result.name).toBe(account.name);
    expect(result.email).toBe(account.email);
    expect(result.password).toBe(account.password);
  });
});
