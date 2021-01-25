import faker from 'faker';
import { Collection } from 'mongodb';
import request from 'supertest';

import { MongoHelper } from '@/infra';
import { app } from '@/main/config/app';
import {
  testInvalidParamResponse,
  generateStringWithLength,
  makeAccessToken,
} from '@/test/helpers';
import { mockAddSurveyRequest } from '@/test/presentation/mocks/http-requests';

const mockHttpRequest = (): Record<string, any> => ({
  body: mockAddSurveyRequest(),
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

  it('should return 400 if no question is provided', async () => {
    const httpRequest = mockHttpRequest();
    delete httpRequest.body.question;
    const httpResponse = await request(app)
      .post('/api/surveys')
      .set('x-access-token', await makeAccessToken(accountCollection))
      .send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if question is not a string', async () => {
    const httpRequest = mockHttpRequest();
    httpRequest.body.question = faker.random.number();
    const httpResponse = await request(app)
      .post('/api/surveys')
      .set('x-access-token', await makeAccessToken(accountCollection))
      .send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if question is empty', async () => {
    const httpRequest = mockHttpRequest();
    httpRequest.body.question = '';
    const httpResponse = await request(app)
      .post('/api/surveys')
      .set('x-access-token', await makeAccessToken(accountCollection))
      .send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if question length is more than 100', async () => {
    const httpRequest = mockHttpRequest();
    httpRequest.body.question = generateStringWithLength(101);
    const httpResponse = await request(app)
      .post('/api/surveys')
      .set('x-access-token', await makeAccessToken(accountCollection))
      .send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if answers is not provided', async () => {
    const httpRequest = mockHttpRequest();
    delete httpRequest.body.answers;
    const httpResponse = await request(app)
      .post('/api/surveys')
      .set('x-access-token', await makeAccessToken(accountCollection))
      .send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if answers is not an array', async () => {
    const httpRequest = mockHttpRequest();
    httpRequest.body.answers = faker.random.words();
    const httpResponse = await request(app)
      .post('/api/surveys')
      .set('x-access-token', await makeAccessToken(accountCollection))
      .send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if answers is not an array of objects', async () => {
    const httpRequest = mockHttpRequest();
    httpRequest.body.answers = [faker.random.words()];
    const httpResponse = await request(app)
      .post('/api/surveys')
      .set('x-access-token', await makeAccessToken(accountCollection))
      .send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if answers.answer is not provided', async () => {
    const httpRequest = mockHttpRequest();
    delete httpRequest.body.answers[0].answer;
    const httpResponse = await request(app)
      .post('/api/surveys')
      .set('x-access-token', await makeAccessToken(accountCollection))
      .send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if answers.answer is not a string', async () => {
    const httpRequest = mockHttpRequest();
    httpRequest.body.answers[0].answer = 1;
    const httpResponse = await request(app)
      .post('/api/surveys')
      .set('x-access-token', await makeAccessToken(accountCollection))
      .send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if answers.answer is empty', async () => {
    const httpRequest = mockHttpRequest();
    httpRequest.body.answers[0].answer = '';
    const httpResponse = await request(app)
      .post('/api/surveys')
      .set('x-access-token', await makeAccessToken(accountCollection))
      .send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if answers.answer length is more than 100', async () => {
    const httpRequest = mockHttpRequest();
    httpRequest.body.answers[0].answer = generateStringWithLength(101);
    const httpResponse = await request(app)
      .post('/api/surveys')
      .set('x-access-token', await makeAccessToken(accountCollection))
      .send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if answers.image is not a string', async () => {
    const httpRequest = mockHttpRequest();
    httpRequest.body.answers[0].image = 0;
    const httpResponse = await request(app)
      .post('/api/surveys')
      .set('x-access-token', await makeAccessToken(accountCollection))
      .send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if answers.image is empty', async () => {
    const httpRequest = mockHttpRequest();
    httpRequest.body.answers[0].image = '';
    const httpResponse = await request(app)
      .post('/api/surveys')
      .set('x-access-token', await makeAccessToken(accountCollection))
      .send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if answers.image not a valid URL', async () => {
    const httpRequest = mockHttpRequest();
    httpRequest.body.answers[0].image = faker.random.words();
    const httpResponse = await request(app)
      .post('/api/surveys')
      .set('x-access-token', await makeAccessToken(accountCollection))
      .send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should not return InvalidParamError if validation passes', async () => {
    const httpRequest = mockHttpRequest();
    const httpResponse = await request(app)
      .post('/api/surveys')
      .set('x-access-token', await makeAccessToken(accountCollection))
      .send(httpRequest.body);
    expect(!httpResponse.body.error || !/Invalid Param/.test(httpResponse.body.error)).toBeTruthy();
  });
});
