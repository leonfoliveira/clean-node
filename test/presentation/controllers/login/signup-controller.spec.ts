import faker from 'faker';

import { SignUpController } from '@/presentation/controllers';
import { EmailInUseError, ServerError } from '@/presentation/errors';
import { HttpResponseFactory } from '@/presentation/helpers';
import { AddAccountStub, AuthenticationStub } from '@/test/domain/mocks/usecases';
import { ValidatorStub, mockSignupHttpRequest } from '@/test/presentation/mocks';

type SutTypes = {
  sut: SignUpController;
  addAccountStub: AddAccountStub;
  validatorStub: ValidatorStub;
  authenticationStub: AuthenticationStub;
};

const makeSut = (): SutTypes => {
  const validatorStub = new ValidatorStub(faker.database.column());
  const addAccountStub = new AddAccountStub();
  const authenticationStub = new AuthenticationStub();
  const sut = new SignUpController(validatorStub, addAccountStub, authenticationStub);

  return { sut, addAccountStub, validatorStub, authenticationStub };
};

describe('SignUp Controller', () => {
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

    expect(httpResponse).toEqual(
      HttpResponseFactory.makeInternalServerError(new ServerError(error.stack)),
    );
  });

  it('should return 403 if AddAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, 'add').mockResolvedValueOnce(null);
    const httpRequest = mockSignupHttpRequest();

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(HttpResponseFactory.makeForbidden(new EmailInUseError()));
  });

  it('should return 200 if valid data is provided', async () => {
    const { sut, authenticationStub } = makeSut();
    const httpRequest = mockSignupHttpRequest();

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(HttpResponseFactory.makeOk(authenticationStub.response));
  });

  it('should call Validation with correct value', async () => {
    const { sut, validatorStub } = makeSut();
    const validateSpy = jest.spyOn(validatorStub, 'validate');
    const httpRequest = mockSignupHttpRequest();

    await sut.handle(httpRequest);

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  it('should return 400 if Validation returns an error', async () => {
    const { sut, validatorStub } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(error);
    const httpRequest = mockSignupHttpRequest();

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(HttpResponseFactory.makeBadRequest(error));
  });

  it('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, 'auth');
    const httpRequest = mockSignupHttpRequest();

    await sut.handle(httpRequest);

    expect(authSpy).toHaveBeenCalledWith({
      email: httpRequest.body.email,
      password: httpRequest.body.password,
    });
  });

  it('should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut();
    const httpRequest = mockSignupHttpRequest();
    const error = new Error(faker.random.words());
    error.stack = faker.random.words();
    jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(error);

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(
      HttpResponseFactory.makeInternalServerError(new ServerError(error.stack)),
    );
  });
});