import faker from 'faker';
import request from 'supertest';

import { MongoHelper } from '@/infra/db/mongodb';
import { app } from '@/main/config/app';

describe('SignupRoutes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  it('should return an account on success', async () => {
    const password = faker.internet.password();
    const response = await request(app).post('/api/signup').send({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password,
      passwordConfirmation: password,
    });

    expect(response.status).toBe(200);
  });
});
