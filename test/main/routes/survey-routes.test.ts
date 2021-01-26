import jwt from 'jsonwebtoken';
import { Collection } from 'mongodb';
import request from 'supertest';

import { MongoHelper } from '@/infra';
import { env } from '@/main/config';
import { app } from '@/main/config/app';
import { mockAccountEntity } from '@/test/infra/mocks';
import { mockAddSurveyRequest } from '@/test/presentation/mocks';

let accountCollection: Collection;
let surveyCollection: Collection;

const mockAddSurveyHttpRequest = (): Record<string, any> => ({
  body: mockAddSurveyRequest(),
});

const makeAccessToken = async (role?: string): Promise<string> => {
  const account = mockAccountEntity(role);
  const result = (await accountCollection.insertOne(account)).ops[0];

  const accessToken = jwt.sign({ id: result._id }, env.jwtSecret);
  await accountCollection.updateOne({ _id: result._id }, { $set: { accessToken } });
  return accessToken;
};

describe('SurveyRoutes', () => {
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
      const accessToken = await makeAccessToken('admin');
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
      const accessToken = await makeAccessToken();
      const httpResponse = await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .send(mockAddSurveyHttpRequest().body);

      expect(httpResponse.status).toBe(204);
    });
  });
});
