import faker from 'faker';
import { Collection } from 'mongodb';
import request from 'supertest';

import { MongoHelper } from '@/infra';
import { app } from '@/main/config/app';
import { testInvalidParamResponse, generateStringWithLength } from '@/test/helpers';
import { mockSignupHttpRequest } from '@/test/presentation/mocks/http-requests';

describe('AddSurveyValidator', () => {
  let surveyCollection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});
  });

  it('should return 400 if no question is provided', async () => {
    const httpRequest = mockSignupHttpRequest();
    delete httpRequest.body.question;
    const httpResponse = await request(app).post('/api/surveys').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if question is not a string', async () => {
    const httpRequest = mockSignupHttpRequest();
    httpRequest.body.question = faker.random.number();
    const httpResponse = await request(app).post('/api/surveys').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if question is empty', async () => {
    const httpRequest = mockSignupHttpRequest();
    httpRequest.body.question = '';
    const httpResponse = await request(app).post('/api/surveys').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if question length is more than 100', async () => {
    const httpRequest = mockSignupHttpRequest();
    httpRequest.body.question = generateStringWithLength(101);
    const httpResponse = await request(app).post('/api/surveys').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });
});
