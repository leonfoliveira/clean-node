import faker from 'faker';

import { HttpRequest, HttpResponse } from '@/presentation/interfaces';

import { MissingParamError } from '../errors';

import { LoginController } from './login-controller';

const mockLoginHttpRequest = (): HttpRequest => ({
  body: {
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
});

type SutTypes = {
  sut: LoginController;
};

const makeSut = (): SutTypes => {
  const sut = new LoginController();

  return { sut };
};

describe('LoginController', () => {
  it('should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = mockLoginHttpRequest();
    delete httpRequest.body.email;

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(HttpResponse.BadRequest(new MissingParamError('email')));
  });

  it('should return 400 if no password is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = mockLoginHttpRequest();
    delete httpRequest.body.password;

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(HttpResponse.BadRequest(new MissingParamError('password')));
  });
});
