import { mockAddAccountRepositoryParams } from '@/data/mocks';
import { MongoHelper } from '@/infra/helpers';

import { MongodbAccountRepository } from './mongodb-account-repository';

describe('MongodbAccountRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  it('should return an account on success', async () => {
    const sut = new MongodbAccountRepository();
    const account = mockAddAccountRepositoryParams();

    const result = await sut.add(account);

    expect(result).toBeTruthy();
    expect(result.id).toBeTruthy();
    expect(result.name).toBe(account.name);
    expect(result.email).toBe(account.email);
    expect(result.password).toBe(account.password);
  });
});
