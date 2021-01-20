import faker from 'faker';

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

describe('AuthMiddleware', () => {
  it('should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(HttpResponseFactory.makeForbidden(new AccessDeniedError()));
  });

  it('should call LoadAccountByToken with correct accessToken', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load');
    const httpRequest = {
      headers: {
        'x-access-token': faker.random.uuid(),
      },
    };

    await sut.handle(httpRequest);
    expect(loadSpy).toHaveBeenCalledWith(httpRequest.headers['x-access-token']);
  });
});
