import faker from 'faker';
import { Collection } from 'mongodb';
import request from 'supertest';

import { MongoHelper } from '@/infra';
import { app } from '@/main/config/app';
import { mockLoginHttpRequest } from '@/test/presentation/mocks/http-requests';

const testInvalidParamResponse = (httpResponse: request.Response): void => {
  expect(httpResponse.status).toBe(400);
  expect(httpResponse.body.error).toMatch(/Invalid Param/);
};

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
    const httpRequest = mockLoginHttpRequest();
    delete httpRequest.body.email;
    const httpResponse = await request(app).post('/api/login').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if email is not a string', async () => {
    const httpRequest = mockLoginHttpRequest();
    httpRequest.body.email = faker.random.number();
    const httpResponse = await request(app).post('/api/login').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if email is an invalid email address', async () => {
    const httpRequest = mockLoginHttpRequest();
    httpRequest.body.email = faker.random.word();
    const httpResponse = await request(app).post('/api/login').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if no password is provided', async () => {
    const httpRequest = mockLoginHttpRequest();
    delete httpRequest.body.password;
    const httpResponse = await request(app).post('/api/login').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if password is not a string', async () => {
    const httpRequest = mockLoginHttpRequest();
    httpRequest.body.password = faker.random.number();
    const httpResponse = await request(app).post('/api/login').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if password length is less than 8', async () => {
    const httpRequest = mockLoginHttpRequest();
    httpRequest.body.password = [...Array.from({ length: 7 }).keys()].join('');
    const httpResponse = await request(app).post('/api/login').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if password length is more than 32', async () => {
    const httpRequest = mockLoginHttpRequest();
    httpRequest.body.password = [...Array.from({ length: 33 }).keys()].join('');
    const httpResponse = await request(app).post('/api/login').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });
});
