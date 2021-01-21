import jwt from 'jsonwebtoken';
import { Collection } from 'mongodb';
import request from 'supertest';

import { MongoHelper } from '@/infra';
import { app } from '@/main/config/app';
import { env } from '@/main/config/env';
import { mockAccountModel } from '@/test/domain/mocks/models';
import { mockAddSurveyHttpRequest } from '@/test/presentation/mocks';

const makeAccessToken = async (accountCollection: Collection, role?: string): Promise<string> => {
  const account = mockAccountModel();
  delete account.id;
  const id = (await accountCollection.insertOne({ ...account, role })).ops[0]._id;
  const accessToken = jwt.sign({ id }, env.jwtSecret);
  await accountCollection.updateOne({ _id: id }, { $set: { accessToken } });
  return accessToken;
};

describe('SurveyRoutes', () => {
  let accountCollection: Collection;
  let surveyCollection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts');
    surveyCollection = await MongoHelper.getCollection('surveys');
    await accountCollection.deleteMany({});
    await surveyCollection.deleteMany({});
  });

  describe('POST /surveys', () => {
    it('should return 403 if no accessToken is provided', async () => {
      const httpResponse = await request(app)
        .post('/api/surveys')
        .send(mockAddSurveyHttpRequest().body);

      expect(httpResponse.status).toBe(403);
    });

    it('should return 201 if valid accessToken is provided', async () => {
      const accessToken = await makeAccessToken(accountCollection, 'admin');
      const httpResponse = await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send(mockAddSurveyHttpRequest().body);

      expect(httpResponse.status).toBe(201);
    });
  });

  describe('GET /surveys', () => {
    it('should return 403 if no accessToken is provided', async () => {
      const httpResponse = await request(app).get('/api/surveys');

      expect(httpResponse.status).toBe(403);
    });

    it('should return 204 if valid accessToken is provided', async () => {
      const accessToken = await makeAccessToken(accountCollection);
      const httpResponse = await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .send(mockAddSurveyHttpRequest().body);

      expect(httpResponse.status).toBe(204);
    });
  });
});
