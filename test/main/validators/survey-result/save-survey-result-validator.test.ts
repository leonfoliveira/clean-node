import faker from 'faker';
import { Collection } from 'mongodb';
import request from 'supertest';

import { MongoHelper } from '@/infra';
import { app } from '@/main/config/app';
import { testInvalidParamResponse, makeAccessToken } from '@/test/helpers';
import { mockSaveSurveyResultRequest } from '@/test/presentation/mocks/http-requests';

const mockHttpRequest = (): Record<string, any> => ({
  body: mockSaveSurveyResultRequest(),
});

describe('AddSurveyValidator', () => {
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

  it('should return 400 if no answer is provided', async () => {
    const httpRequest = mockHttpRequest();
    delete httpRequest.body.answer;
    const httpResponse = await request(app)
      .put('/api/surveys/any_id/results')
      .set('x-access-token', await makeAccessToken(accountCollection))
      .send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if answer is not a string', async () => {
    const httpRequest = mockHttpRequest();
    httpRequest.body.answer = faker.random.number();
    const httpResponse = await request(app)
      .put('/api/surveys/any_id/results')
      .set('x-access-token', await makeAccessToken(accountCollection))
      .send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if answer is empty', async () => {
    const httpRequest = mockHttpRequest();
    httpRequest.body.answer = '';
    const httpResponse = await request(app)
      .put('/api/surveys/any_id/results')
      .set('x-access-token', await makeAccessToken(accountCollection))
      .send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });
});
