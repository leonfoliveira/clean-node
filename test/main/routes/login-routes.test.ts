import request from 'supertest';

import { MongoHelper } from '@/infra/db/mongodb';
import { app } from '@/main/config/app';
import { mockSignupHttpRequest } from '@/test/presentation/mocks';

describe('LoginRoutes', () => {
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

  describe('POST /signup', () => {
    it('should return 200 on signup', async () => {
      const response = await request(app).post('/api/signup').send(mockSignupHttpRequest().body);

      expect(response.status).toBe(200);
    });
  });
});
