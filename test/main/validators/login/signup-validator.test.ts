import faker from 'faker';
import { Collection } from 'mongodb';
import request from 'supertest';

import { MongoHelper } from '@/infra';
import { app } from '@/main/config/app';
import {
  testInvalidParamResponse,
  generateStringWithLength,
  generateStringDifferent,
} from '@/test/helpers';
import { mockSignupRequest } from '@/test/presentation/mocks/http-requests';

const mockRequest = (): Record<string, any> => ({
  body: mockSignupRequest(),
});

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
    const httpRequest = mockRequest();
    delete httpRequest.body.name;
    const httpResponse = await request(app).post('/api/signup').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if name is not a string', async () => {
    const httpRequest = mockRequest();
    httpRequest.body.name = faker.random.number();
    const httpResponse = await request(app).post('/api/signup').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if name is empty', async () => {
    const httpRequest = mockRequest();
    httpRequest.body.name = '';
    const httpResponse = await request(app).post('/api/signup').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if name length is more than 50', async () => {
    const httpRequest = mockRequest();
    httpRequest.body.name = [...Array.from({ length: 33 }).keys()].join('');
    const httpResponse = await request(app).post('/api/signup').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if no email is provided', async () => {
    const httpRequest = mockRequest();
    delete httpRequest.body.email;
    const httpResponse = await request(app).post('/api/signup').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if email is not a string', async () => {
    const httpRequest = mockRequest();
    httpRequest.body.email = faker.random.number();
    const httpResponse = await request(app).post('/api/signup').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if email is an invalid email address', async () => {
    const httpRequest = mockRequest();
    httpRequest.body.email = faker.random.word();
    const httpResponse = await request(app).post('/api/signup').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if no password is provided', async () => {
    const httpRequest = mockRequest();
    delete httpRequest.body.password;
    const httpResponse = await request(app).post('/api/signup').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if password is not a string', async () => {
    const httpRequest = mockRequest();
    httpRequest.body.password = faker.random.number();
    httpRequest.body.passwordConfirmation = httpRequest.body.password;
    const httpResponse = await request(app).post('/api/signup').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if password length is less than 8', async () => {
    const httpRequest = mockRequest();
    httpRequest.body.password = generateStringWithLength(7);
    httpRequest.body.passwordConfirmation = httpRequest.body.password;
    const httpResponse = await request(app).post('/api/signup').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if password length is more than 32', async () => {
    const httpRequest = mockRequest();
    httpRequest.body.password = generateStringWithLength(33);
    httpRequest.body.passwordConfirmation = httpRequest.body.password;
    const httpResponse = await request(app).post('/api/signup').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if no passwordConfirmation is provided', async () => {
    const httpRequest = mockRequest();
    delete httpRequest.body.passwordConfirmation;
    const httpResponse = await request(app).post('/api/signup').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should return 400 if passwordConfirmation is not equal password', async () => {
    const httpRequest = mockRequest();
    httpRequest.body.passwordConfirmation = generateStringDifferent(httpRequest.body.password);
    const httpResponse = await request(app).post('/api/signup').send(httpRequest.body);
    testInvalidParamResponse(httpResponse);
  });

  it('should not return InvalidParamError if validation passes', async () => {
    const httpRequest = mockRequest();
    const httpResponse = await request(app).post('/api/signup').send(httpRequest.body);
    expect(!httpResponse.body.error || !/Invalid Param/.test(httpResponse.body.error)).toBeTruthy();
  });
});
