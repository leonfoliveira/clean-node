import jwt from 'jsonwebtoken';
import { Collection } from 'mongodb';
import request from 'supertest';

import { MongoHelper } from '@/infra';
import { env } from '@/main/config';
import { app } from '@/main/config/app';
import { mockAccountEntity, mockSurveyEntity } from '@/test/infra/mocks';
import { mockSaveSurveyResultRequest } from '@/test/presentation/mocks';

let accountCollection: Collection;
let surveyCollection: Collection;

const mockSaveSurveyResultHttpRequest = (): Record<string, any> => ({
  body: mockSaveSurveyResultRequest(),
});

const makeAccessToken = async (role?: string): Promise<string> => {
  const account = mockAccountEntity(role);
  const result = (await accountCollection.insertOne(account)).ops[0];

  const accessToken = jwt.sign({ id: result._id }, env.jwtSecret);
  await accountCollection.updateOne({ _id: result._id }, { $set: { accessToken } });
  return accessToken;
};

const createSurvey = async (): Promise<any> => {
  const survey = mockSurveyEntity();
  return (await surveyCollection.insertOne(survey)).ops[0];
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

  describe('PUT /surveys/:surveyId/results', () => {
    it('should return 403 if no accessToken is provided', async () => {
      const httpResponse = await request(app)
        .put('/api/surveys/any_id/results')
        .send(mockSaveSurveyResultHttpRequest().body);

      expect(httpResponse.status).toBe(403);
    });

    it('should return 200 on SaveSurveyResult success', async () => {
      const survey = await createSurvey();
      const httpResponse = await request(app)
        .put(`/api/surveys/${survey._id}/results`)
        .set('x-access-token', await makeAccessToken())
        .send({ answer: survey.answers[0].answer });

      expect(httpResponse.status).toBe(200);
    });
  });

  describe('GET /surveys/:surveyId/results', () => {
    it('should return 403 if no accessToken is provided', async () => {
      const httpResponse = await request(app).get('/api/surveys/any_id/results');

      expect(httpResponse.status).toBe(403);
    });

    it('should return 200 on LoadSurveyResult success', async () => {
      const accessToken = await makeAccessToken();
      const survey = await createSurvey();
      const httpResponse = await request(app)
        .get(`/api/surveys/${survey._id}/results`)
        .set('x-access-token', accessToken);

      expect(httpResponse.status).toBe(200);
    });
  });
});
