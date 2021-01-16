import faker from 'faker';

import { AddAccountStub } from '@/domain/mocks';
import { InvalidParamError, MissingParamError, ServerError } from '@/presentation/errors';
import { Response } from '@/presentation/helpers';
import { EmailValidatorStub } from '@/presentation/mocks';
import { HttpRequest } from '@/presentation/protocols';

import { SignUpController } from './signup';

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
  it('should return 400 if no name is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = mockSignupHttpRequest();
    delete httpRequest.body.name;

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(Response.BadRequest(new MissingParamError('name')));
  });

  it('should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = mockSignupHttpRequest();
    delete httpRequest.body.email;

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(Response.BadRequest(new MissingParamError('email')));
  });

  it('should return 400 if no password is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = mockSignupHttpRequest();
    delete httpRequest.body.password;

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(Response.BadRequest(new MissingParamError('password')));
  });

  it('should return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = mockSignupHttpRequest();
    delete httpRequest.body.passwordConfirmation;

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(
      Response.BadRequest(new MissingParamError('passwordConfirmation')),
    );
  });

  it('should return 400 if an passwordConfirmation fails', async () => {
    const { sut } = makeSut();
    const httpRequest = mockSignupHttpRequest();
    httpRequest.body.passwordConfirmation = `diff_${httpRequest.body.password}`;

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(
      Response.BadRequest(new InvalidParamError('passwordConfirmation')),
    );
  });

  it('should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const httpRequest = mockSignupHttpRequest();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(Response.BadRequest(new InvalidParamError('email')));
  });

  it('should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const httpRequest = mockSignupHttpRequest();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');

    await sut.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email);
  });

  it('should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const httpRequest = mockSignupHttpRequest();
    const error = new Error(faker.random.words());
    error.stack = faker.random.words();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw error;
    });

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(Response.InternalServerError(new ServerError(error.stack)));
  });

  it('should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut();
    const httpRequest = mockSignupHttpRequest();
    const addSpy = jest.spyOn(addAccountStub, 'add');
    const { passwordConfirmation, ...addAccountParams } = httpRequest.body;

    await sut.handle(httpRequest);

    expect(addSpy).toHaveBeenCalledWith(addAccountParams);
  });

  it('should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut();
    const httpRequest = mockSignupHttpRequest();
    const error = new Error(faker.random.words());
    error.stack = faker.random.words();
    jest.spyOn(addAccountStub, 'add').mockRejectedValueOnce(error);

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(Response.InternalServerError(new ServerError(error.stack)));
  });

  it('should return 200 if valid data is provided', async () => {
    const { sut, addAccountStub } = makeSut();
    const httpRequest = mockSignupHttpRequest();

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(Response.Ok(addAccountStub.response));
  });
});
