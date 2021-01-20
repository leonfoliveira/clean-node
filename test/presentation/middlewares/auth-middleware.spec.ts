import faker from 'faker';
import { HttpRequest } from 'presentation/interfaces';

import { AccessDeniedError } from '@/presentation/errors';
import { HttpResponseFactory } from '@/presentation/helpers';
import { AuthMiddleware } from '@/presentation/middlewares';
import { LoadAccountByTokenStub } from '@/test/domain/mocks/usecases';

type SutTypes = {
  sut: AuthMiddleware;
  loadAccountByTokenStub: LoadAccountByTokenStub;
};

const makeSut = (): SutTypes => {
  const loadAccountByTokenStub = new LoadAccountByTokenStub();
  const sut = new AuthMiddleware(loadAccountByTokenStub);

  return { sut, loadAccountByTokenStub };
};

const mockHttpRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': faker.random.uuid(),
  },
});

describe('AuthMiddleware', () => {
  it('should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(HttpResponseFactory.makeForbidden(new AccessDeniedError()));
  });

  it('should call LoadAccountByToken with correct accessToken', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load');
    const httpRequest = mockHttpRequest();

    await sut.handle(httpRequest);
    expect(loadSpy).toHaveBeenCalledWith(httpRequest.headers['x-access-token']);
  });

  it('should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    jest.spyOn(loadAccountByTokenStub, 'load').mockResolvedValueOnce(null);

    const httpResponse = await sut.handle(mockHttpRequest());

    expect(httpResponse).toEqual(HttpResponseFactory.makeForbidden(new AccessDeniedError()));
  });

  it('should return 200 if LoadAccountByToken returns an AccountModel', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();

    const httpResponse = await sut.handle(mockHttpRequest());

    expect(httpResponse).toEqual(
      HttpResponseFactory.makeOk({ accountId: loadAccountByTokenStub.response.id }),
    );
  });
});
