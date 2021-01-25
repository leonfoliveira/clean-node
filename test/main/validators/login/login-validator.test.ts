import faker from 'faker';
import { Collection } from 'mongodb';
import request from 'supertest';

import { MongoHelper } from '@/infra';
import { app } from '@/main/config/app';
import { testInvalidParamResponse, generateStringWithLength } from '@/test/helpers';
import { mockLoginRequest } from '@/test/presentation/mocks/http-requests';

const mockHttpRequest = (): Record<string, any> => ({
  body: mockLoginRequest(),
});

describe('LoginValidator', () => {
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

  it('should return 400 if no email is provided', async () => {
    const httpRequest = mockHttpRequest();
    delete httpRequest.body.email;
    const httpResponse = await request(app).post('/api/login').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if email is not a string', async () => {
    const httpRequest = mockHttpRequest();
    httpRequest.body.email = faker.random.number();
    const httpResponse = await request(app).post('/api/login').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if email is an invalid email address', async () => {
    const httpRequest = mockHttpRequest();
    httpRequest.body.email = faker.random.word();
    const httpResponse = await request(app).post('/api/login').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if no password is provided', async () => {
    const httpRequest = mockHttpRequest();
    delete httpRequest.body.password;
    const httpResponse = await request(app).post('/api/login').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if password is not a string', async () => {
    const httpRequest = mockHttpRequest();
    httpRequest.body.password = faker.random.number();
    const httpResponse = await request(app).post('/api/login').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if password length is less than 8', async () => {
    const httpRequest = mockHttpRequest();
    httpRequest.body.password = generateStringWithLength(7);
    const httpResponse = await request(app).post('/api/login').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if password length is more than 32', async () => {
    const httpRequest = mockHttpRequest();
    httpRequest.body.password = generateStringWithLength(33);
    const httpResponse = await request(app).post('/api/login').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should not return InvalidParamError if validation passes', async () => {
    const httpRequest = mockHttpRequest();
    const httpResponse = await request(app).post('/api/login').send(httpRequest.body);
    expect(!httpResponse.body.error || !/Invalid Param/.test(httpResponse.body.error)).toBeTruthy();
  });
});
