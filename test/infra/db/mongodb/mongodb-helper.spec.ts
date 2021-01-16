import { MongoHelper as sut } from '@/infra/db/mongodb';

describe('MongodbHelper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await sut.disconnect();
  });

  it('should reconnect if mongodb is down', async () => {
    await sut.disconnect();
    await sut.getCollection('accounts');
    expect(sut.client).toBeTruthy();
  });
});
