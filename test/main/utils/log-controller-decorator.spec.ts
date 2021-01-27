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

const mockControllerError = (controllerStub: ControllerStub): Error => {
  const error = new Error(faker.random.words());
  error.stack = faker.random.words();
  jest
    .spyOn(controllerStub, 'handle')
    .mockResolvedValueOnce(HttpResponseFactory.makeInternalServerError(error));
  return error;
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

    const response = await sut.handle(mockRequest());

    expect(response).toEqual(controllerStub.response);
  });

  it('should not call LogErrorRepository when statusCode is not 500', async () => {
    const { sut, controllerStub, logErrorRepository } = makeSut();
    jest.spyOn(controllerStub, 'handle').mockResolvedValueOnce({
      statusCode: 200,
      body: { [faker.database.column()]: faker.random.words() },
    });
    const logErrorSpy = jest.spyOn(logErrorRepository, 'logError');

    await sut.handle(mockRequest());

    expect(logErrorSpy).not.toBeCalled();
  });

  it('should call LogErrorRepository on 500', async () => {
    const { sut, controllerStub, logErrorRepository } = makeSut();
    const error = mockControllerError(controllerStub);
    const logErrorSpy = jest.spyOn(logErrorRepository, 'logError');

    await sut.handle(mockRequest());

    expect(logErrorSpy).toHaveBeenCalledWith(error.stack);
  });

  it('should log error to console if LogErrorRepository throws', async () => {
    const { sut, controllerStub, logErrorRepository } = makeSut();
    const controllerError = mockControllerError(controllerStub);
    const error = new Error(faker.random.words());
    jest.spyOn(logErrorRepository, 'logError').mockRejectedValueOnce(error);
    const consoleSpy = jest.spyOn(console, 'error');

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(HttpResponseFactory.makeInternalServerError(controllerError));
    expect(consoleSpy).toHaveBeenCalledWith(error);
  });
});
