import faker from 'faker';
import { Collection } from 'mongodb';
import request from 'supertest';

import { MongoHelper } from '@/infra';
import { app } from '@/main/config/app';
import { testInvalidParamResponse } from '@/test/helpers';
import { mockLoginHttpRequest } from '@/test/presentation/mocks/http-requests';

describe('SignUpValidator', () => {
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

  it('should return 400 if no name is provided', async () => {
    const httpRequest = mockLoginHttpRequest();
    delete httpRequest.body.name;
    const httpResponse = await request(app).post('/api/signup').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if name is not a string', async () => {
    const httpRequest = mockLoginHttpRequest();
    httpRequest.body.name = faker.random.number();
    const httpResponse = await request(app).post('/api/signup').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if name is empty', async () => {
    const httpRequest = mockLoginHttpRequest();
    httpRequest.body.name = '';
    const httpResponse = await request(app).post('/api/signup').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if name length is more than 50', async () => {
    const httpRequest = mockLoginHttpRequest();
    httpRequest.body.name = [...Array.from({ length: 33 }).keys()].join('');
    const httpResponse = await request(app).post('/api/signup').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if no email is provided', async () => {
    const httpRequest = mockLoginHttpRequest();
    delete httpRequest.body.email;
    const httpResponse = await request(app).post('/api/signup').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if email is not a string', async () => {
    const httpRequest = mockLoginHttpRequest();
    httpRequest.body.email = faker.random.number();
    const httpResponse = await request(app).post('/api/signup').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if email is an invalid email address', async () => {
    const httpRequest = mockLoginHttpRequest();
    httpRequest.body.email = faker.random.word();
    const httpResponse = await request(app).post('/api/signup').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });
});
