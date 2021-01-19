import faker from 'faker';

import { LogControllerDecorator } from '@/main/decorators';
import { HttpResponseFactory } from '@/presentation/helpers';
import { LogErrorRepositoryStub } from '@/test/data/mocks';
import { mockHttpRequest, ControllerStub } from '@/test/presentation/mocks';

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
    const httpRequest = mockHttpRequest();

    await sut.handle(httpRequest);

    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });

  it('should return the same as Controller', async () => {
    const { sut, controllerStub } = makeSut();
    const httpRequest = mockHttpRequest();

    const response = await sut.handle(httpRequest);

    expect(response).toEqual(controllerStub.response);
  });

  it('should not call LogErrorRepository when statusCode is not 500', async () => {
    const { sut, controllerStub, logErrorRepository } = makeSut();
    jest.spyOn(controllerStub, 'handle').mockResolvedValueOnce({
      statusCode: 200,
      body: { [faker.database.column()]: faker.random.words() },
    });
    const logErrorSpy = jest.spyOn(logErrorRepository, 'logError');
    const httpRequest = mockHttpRequest();

    await sut.handle(httpRequest);

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
    const httpRequest = mockHttpRequest();

    await sut.handle(httpRequest);

    expect(logErrorSpy).toHaveBeenCalledWith(error.stack);
  });
});
