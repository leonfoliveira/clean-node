import faker from 'faker';

import { LoginController } from '@/presentation/controllers';
import { HttpResponse } from '@/presentation/interfaces';
import { AuthenticationStub } from '@/test/domain/mocks';
import { ValidatorStub, mockLoginHttpRequest } from '@/test/presentation/mocks';

type SutTypes = {
  sut: LoginController;
  authenticationStub: AuthenticationStub;
  validatorStub: ValidatorStub;
};

const makeSut = (): SutTypes => {
  const authenticationStub = new AuthenticationStub();
  const validatorStub = new ValidatorStub(faker.database.column());
  const sut = new LoginController(authenticationStub, validatorStub);

  return { sut, authenticationStub, validatorStub };
};

describe('LoginController', () => {
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

    const httpResponse = await sut.handle(mockLoginHttpRequest());

    expect(httpResponse).toEqual(HttpResponse.Unauthorized());
  });

  it('should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut();
    const error = new Error(faker.random.words());
    error.stack = faker.random.words();
    jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(error);

    const httpResponse = await sut.handle(mockLoginHttpRequest());

    expect(httpResponse).toEqual(HttpResponse.InternalServerError(error));
  });

  it('should return 200 if valid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut();

    const httpResponse = await sut.handle(mockLoginHttpRequest());

    expect(httpResponse).toEqual(HttpResponse.Ok(authenticationStub.response));
  });

  it('should returns 400 if Validation returns an error', async () => {
    const { sut, validatorStub } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(error);
    const httpRequest = mockLoginHttpRequest();

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(HttpResponse.BadRequest(error));
  });
});
