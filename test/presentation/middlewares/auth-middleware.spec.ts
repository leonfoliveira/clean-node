import { AccessDeniedError } from '@/presentation/errors';
import { HttpResponseFactory } from '@/presentation/helpers';
import { AuthMiddleware } from '@/presentation/middlewares';

describe('AuthMiddleware', () => {
  it('should return 403 if no x-access-token exists in headers', async () => {
    const sut = new AuthMiddleware();

    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(HttpResponseFactory.makeForbidden(new AccessDeniedError()));
  });
});
