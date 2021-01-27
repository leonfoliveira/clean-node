import faker from 'faker';

import { LoginController } from '@/presentation/controllers';
import { HttpResponseFactory } from '@/presentation/helpers';
import { AuthenticationStub } from '@/test/domain/mocks/usecases';
import { mockLoginRequest } from '@/test/presentation/mocks';

type SutTypes = {
  sut: LoginController;
  authenticationStub: AuthenticationStub;
};

const makeSut = (): SutTypes => {
  const authenticationStub = new AuthenticationStub();
  const sut = new LoginController(authenticationStub);

  return { sut, authenticationStub };
};

describe('LoginController', () => {
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
