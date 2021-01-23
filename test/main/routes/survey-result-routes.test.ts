import jwt from 'jsonwebtoken';
import { Collection } from 'mongodb';
import request from 'supertest';

import { MongoHelper } from '@/infra';
import { app } from '@/main/config/app';
import { env } from '@/main/config/env';
import { mockAccountModel, mockSurveyModel } from '@/test/domain/mocks/models';
import { mockSaveSurveyHttpRequest } from '@/test/presentation/mocks';

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

  describe('PUT /surveys/:surveyId/results', () => {
    it('should return 403 if no accessToken is provided', async () => {
      const httpResponse = await request(app)
        .put('/api/surveys/any_id/results')
        .send(mockSaveSurveyHttpRequest().body);

      expect(httpResponse.status).toBe(403);
    });

    it('should return 200 on SaveSurvey success', async () => {
      const survey = mockSurveyModel();
      delete survey.id;
      const surveyId = (await surveyCollection.insertOne(survey)).ops[0]._id;
      const httpResponse = await request(app)
        .put(`/api/surveys/${surveyId}/results`)
        .set('x-access-token', await makeAccessToken(accountCollection))
        .send({ answer: survey.answers[0].answer });

      expect(httpResponse.status).toBe(200);
    });
  });
});
