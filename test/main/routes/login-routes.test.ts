import bcrypt from 'bcrypt';
import faker from 'faker';
import { Collection } from 'mongodb';
import request from 'supertest';

import { MongoHelper } from '@/infra/db/mongodb';
import { app } from '@/main/config/app';
import { mockLoginHttpRequest, mockSignupHttpRequest } from '@/test/presentation/mocks';

describe('LoginRoutes', () => {
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

  describe('POST /signup', () => {
    it('should return 200 on success', async () => {
      const response = await request(app).post('/api/signup').send(mockSignupHttpRequest().body);

      expect(response.status).toBe(200);
    });
  });

  describe('POST /login', () => {
    it('should return 200 on success', async () => {
      const httpRequest = mockLoginHttpRequest();
      const account = httpRequest.body;
      await accountCollection.insertOne({
        ...account,
        password: await bcrypt.hash(account.password, 12),
        name: faker.name.findName(),
      });
      const response = await request(app).post('/api/login').send(httpRequest.body);

      expect(response.status).toBe(200);
      expect(response.body.accessToken).toBeTruthy();
    });

    it('should return 401 on invalid credentials', async () => {
      const httpRequest = mockLoginHttpRequest();
      const response = await request(app).post('/api/login').send(httpRequest.body);

      expect(response.status).toBe(401);
    });
  });
});
