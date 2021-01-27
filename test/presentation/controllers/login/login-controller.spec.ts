import faker from 'faker';

import { LoginController } from '@/presentation/controllers';
import { InvalidParamError } from '@/presentation/errors';
import { HttpResponseFactory } from '@/presentation/helpers';
import { AuthenticationStub } from '@/test/domain/mocks/usecases';
import { mockLoginRequest, ValidatorStub } from '@/test/presentation/mocks';

type SutTypes = {
  sut: LoginController;
  validatorStub: ValidatorStub;
  authenticationStub: AuthenticationStub;
};

const makeSut = (): SutTypes => {
  const validatorStub = new ValidatorStub();
  const authenticationStub = new AuthenticationStub();
  const sut = new LoginController(validatorStub, authenticationStub);

  return { sut, validatorStub, authenticationStub };
};

describe('LoginController', () => {
  it('should call Validator with correct values', async () => {
    const { sut, validatorStub } = makeSut();
    const validateSpy = jest.spyOn(validatorStub, 'validate');
    const request = mockLoginRequest();

    await sut.handle(request);

    expect(validateSpy).toHaveBeenCalledWith(request);
  });

  it('should return 400 if Validator returns an error', async () => {
    const { sut, validatorStub } = makeSut();
    const error = new InvalidParamError(faker.random.words());
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(error);

    const httpResponse = await sut.handle(mockLoginRequest());

    expect(httpResponse).toEqual(HttpResponseFactory.makeBadRequest(error));
  });

  it('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, 'auth');
    const request = mockLoginRequest();

    await sut.handle(request);

    expect(authSpy).toHaveBeenCalledWith(request);
  });

  it('should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut();
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(null);

    const httpResponse = await sut.handle(mockLoginRequest());

    expect(httpResponse).toEqual(HttpResponseFactory.makeUnauthorized());
  });

  it('should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut();
    const error = new Error(faker.random.words());
    error.stack = faker.random.words();
    jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(error);

    const httpResponse = await sut.handle(mockLoginRequest());

    expect(httpResponse).toEqual(HttpResponseFactory.makeInternalServerError(error));
  });

  it('should return 200 if valid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut();

    const httpResponse = await sut.handle(mockLoginRequest());

    expect(httpResponse).toEqual(HttpResponseFactory.makeOk(authenticationStub.response));
  });
});
