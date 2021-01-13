import faker from 'faker';

import { InvalidParamError, MissingParamError, ServerError } from '@/presentation/errors';
import { AddAccountStub } from '@/presentation/mocks';
import { EmailValidator, HttpRequest } from '@/presentation/protocols';

import { SignUpController } from './signup';

class EmailValidatorStub implements EmailValidator {
  isValid(): boolean {
    return true;
  }
}

type SutTypes = {
  sut: SignUpController;
  emailValidatorStub: EmailValidatorStub;
  addAccountStub: AddAccountStub;
};

const makeSut = (): SutTypes => {
  const emailValidatorStub = new EmailValidatorStub();
  const addAccountStub = new AddAccountStub();
  const sut = new SignUpController(emailValidatorStub, addAccountStub);

  return { sut, emailValidatorStub, addAccountStub };
};

const mockSignupHttpRequest = (): HttpRequest => {
  const password = faker.internet.password();
  return {
    body: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password,
      passwordConfirmation: password,
    },
  };
};

describe('SignUp Controller', () => {
  it('should return 400 if no name is provided', () => {
    const { sut } = makeSut();
    const httpRequest = mockSignupHttpRequest();
    delete httpRequest.body.name;

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  it('should return 400 if no email is provided', () => {
    const { sut } = makeSut();
    const httpRequest = mockSignupHttpRequest();
    delete httpRequest.body.email;

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  it('should return 400 if no password is provided', () => {
    const { sut } = makeSut();
    const httpRequest = mockSignupHttpRequest();
    delete httpRequest.body.password;

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  it('should return 400 if no passwordConfirmation is provided', () => {
    const { sut } = makeSut();
    const httpRequest = mockSignupHttpRequest();
    delete httpRequest.body.passwordConfirmation;

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'));
  });

  it('should return 400 if an passwordConfirmation fails', () => {
    const { sut } = makeSut();
    const httpRequest = mockSignupHttpRequest();
    httpRequest.body.passwordConfirmation = `diff_${httpRequest.body.password}`;

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'));
  });

  it('should return 400 if an invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSut();
    const httpRequest = mockSignupHttpRequest();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  it('should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut();
    const httpRequest = mockSignupHttpRequest();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');

    sut.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email);
  });

  it('should return 500 if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut();
    const httpRequest = mockSignupHttpRequest();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error('any_error');
    });

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it('should call AddAccount with correct email', () => {
    const { sut, addAccountStub } = makeSut();
    const httpRequest = mockSignupHttpRequest();
    const addSpy = jest.spyOn(addAccountStub, 'add');
    const { passwordConfirmation, ...addAccountParams } = httpRequest.body;

    sut.handle(httpRequest);

    expect(addSpy).toHaveBeenCalledWith(addAccountParams);
  });
});
