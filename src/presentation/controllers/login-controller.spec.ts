import faker from 'faker';

import { AuthenticationStub } from '@/domain/mocks';
import { InvalidParamError, MissingParamError } from '@/presentation/errors';
import { HttpRequest, HttpResponse } from '@/presentation/interfaces';
import { EmailValidatorStub } from '@/presentation/mocks';

import { LoginController } from './login-controller';

const mockLoginHttpRequest = (): HttpRequest => ({
  body: {
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
});

type SutTypes = {
  sut: LoginController;
  emailValidatorStub: EmailValidatorStub;
  authenticationStub: AuthenticationStub;
};

const makeSut = (): SutTypes => {
  const emailValidatorStub = new EmailValidatorStub();
  const authenticationStub = new AuthenticationStub();
  const sut = new LoginController(emailValidatorStub, authenticationStub);

  return { sut, emailValidatorStub, authenticationStub };
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

  it('should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
    const httpRequest = mockLoginHttpRequest();

    await sut.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email);
  });

  it('should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = mockLoginHttpRequest();

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(HttpResponse.BadRequest(new InvalidParamError('email')));
  });

  it('should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const error = new Error(faker.random.words());
    error.stack = faker.random.words();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw error;
    });
    const httpRequest = mockLoginHttpRequest();

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(HttpResponse.InternalServerError(error));
  });

  it('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, 'auth');
    const httpRequest = mockLoginHttpRequest();

    await sut.handle(httpRequest);

    expect(authSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  it('should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut();
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(null);
    const httpRequest = mockLoginHttpRequest();

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(HttpResponse.Unauthorized());
  });
});
