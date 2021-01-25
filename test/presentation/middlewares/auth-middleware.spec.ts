import faker from 'faker';

import { AccessDeniedError } from '@/presentation/errors';
import { HttpResponseFactory } from '@/presentation/helpers';
import { AuthMiddleware } from '@/presentation/middlewares';
import { LoadAccountByTokenStub } from '@/test/domain/mocks/usecases';

type SutTypes = {
  sut: AuthMiddleware;
  loadAccountByTokenStub: LoadAccountByTokenStub;
};

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenStub = new LoadAccountByTokenStub();
  const sut = new AuthMiddleware(loadAccountByTokenStub, role);

  return { sut, loadAccountByTokenStub };
};

const mockRequest = (): AuthMiddleware.Request => ({
  accessToken: faker.random.uuid(),
});

describe('AuthMiddleware', () => {
  it('should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({ accessToken: undefined });

    expect(httpResponse).toEqual(HttpResponseFactory.makeForbidden(new AccessDeniedError()));
  });

  it('should call LoadAccountByToken with correct values', async () => {
    const role = faker.random.word();
    const { sut, loadAccountByTokenStub } = makeSut(role);
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load');
    const request = mockRequest();

    await sut.handle(request);
    expect(loadSpy).toHaveBeenCalledWith({
      accessToken: request.accessToken,
      role,
    });
  });

  it('should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    jest.spyOn(loadAccountByTokenStub, 'load').mockResolvedValueOnce(null);

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(HttpResponseFactory.makeForbidden(new AccessDeniedError()));
  });

  it('should return 200 if LoadAccountByToken returns an AccountModel', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(
      HttpResponseFactory.makeOk({ accountId: loadAccountByTokenStub.response.id }),
    );
  });

  it('should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(loadAccountByTokenStub, 'load').mockRejectedValueOnce(error);

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(HttpResponseFactory.makeInternalServerError(error));
  });
});
