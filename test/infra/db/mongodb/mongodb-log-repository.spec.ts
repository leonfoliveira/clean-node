import faker from 'faker';
import { Collection } from 'mongodb';

import { MongodbLogRepository, MongoHelper } from '@/infra/db/mongodb';

describe('MongodbLogRepository', () => {
  let errorCollection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors');
    await errorCollection.deleteMany({});
  });

  it('should create an error log on success', async () => {
    const sut = new MongodbLogRepository();
    await sut.logError(faker.random.words());
    const count = await errorCollection.countDocuments();
    expect(count).toBe(1);
  });
});
