import faker from 'faker';

import { LogControllerDecorator } from '@/main/utils';
import { HttpResponseFactory } from '@/presentation/helpers';
import { LogErrorRepositoryStub } from '@/test/data/mocks';
import { ControllerStub } from '@/test/presentation/mocks';

const mockRequest = (): Record<string, any> => ({
  [faker.database.column()]: faker.random.words(),
});

type SutTypes = {
  sut: LogControllerDecorator;
  controllerStub: ControllerStub;
  logErrorRepository: LogErrorRepositoryStub;
};

const makeSut = (): SutTypes => {
  const controllerStub = new ControllerStub();
  const logErrorRepository = new LogErrorRepositoryStub();
  const sut = new LogControllerDecorator(controllerStub, logErrorRepository);

  return { sut, controllerStub, logErrorRepository };
};

describe('LogControllerDecorator', () => {
  it('should call Controller with the same params', async () => {
    const { sut, controllerStub } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, 'handle');
    const request = mockRequest();

    await sut.handle(request);

    expect(handleSpy).toHaveBeenCalledWith(request);
  });

  it('should return the same as Controller', async () => {
    const { sut, controllerStub } = makeSut();
    const request = mockRequest();

    const response = await sut.handle(request);

    expect(response).toEqual(controllerStub.response);
  });

  it('should not call LogErrorRepository when statusCode is not 500', async () => {
    const { sut, controllerStub, logErrorRepository } = makeSut();
    jest.spyOn(controllerStub, 'handle').mockResolvedValueOnce({
      statusCode: 200,
      body: { [faker.database.column()]: faker.random.words() },
    });
    const logErrorSpy = jest.spyOn(logErrorRepository, 'logError');
    const request = mockRequest();

    await sut.handle(request);

    expect(logErrorSpy).not.toBeCalled();
  });

  it('should call LogErrorRepository on 500', async () => {
    const { sut, controllerStub, logErrorRepository } = makeSut();
    const error = new Error(faker.random.words());
    error.stack = faker.random.words();
    jest
      .spyOn(controllerStub, 'handle')
      .mockResolvedValueOnce(HttpResponseFactory.makeInternalServerError(error));
    const logErrorSpy = jest.spyOn(logErrorRepository, 'logError');
    const request = mockRequest();

    await sut.handle(request);

    expect(logErrorSpy).toHaveBeenCalledWith(error.stack);
  });

  it('should log error to console if LogErrorRepository throws', async () => {
    const { sut, controllerStub, logErrorRepository } = makeSut();
    const controllerError = new Error(faker.random.words());
    controllerError.stack = faker.random.words();
    jest
      .spyOn(controllerStub, 'handle')
      .mockResolvedValueOnce(HttpResponseFactory.makeInternalServerError(controllerError));
    const error = new Error(faker.random.words());
    jest.spyOn(logErrorRepository, 'logError').mockRejectedValueOnce(error);
    const consoleSpy = jest.spyOn(console, 'error');

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(HttpResponseFactory.makeInternalServerError(controllerError));
    expect(consoleSpy).toHaveBeenCalledWith(error);
  });
});
