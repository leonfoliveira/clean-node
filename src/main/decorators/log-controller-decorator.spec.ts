import faker from 'faker';

import { LogRepositoryStub } from '@/data/mocks';
import { HttpResponse } from '@/presentation/interfaces';
import { mockHttpRequest, ControllerStub } from '@/presentation/mocks';

import { LogControllerDecorator } from './log-controller-decorator';

type SutTypes = {
  sut: LogControllerDecorator;
  controllerStub: ControllerStub;
  logRepository: LogRepositoryStub;
};

const makeSut = (): SutTypes => {
  const controllerStub = new ControllerStub();
  const logRepository = new LogRepositoryStub();
  const sut = new LogControllerDecorator(controllerStub, logRepository);

  return { sut, controllerStub, logRepository };
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
    const { sut, controllerStub, logRepository } = makeSut();
    jest.spyOn(controllerStub, 'handle').mockResolvedValueOnce({
      statusCode: 200,
      body: { [faker.database.column()]: faker.random.words() },
    });
    const logErrorSpy = jest.spyOn(logRepository, 'logError');
    const httpRequest = mockHttpRequest();

    await sut.handle(httpRequest);

    expect(logErrorSpy).not.toBeCalled();
  });

  it('should call LogErrorRepository on 500', async () => {
    const { sut, controllerStub, logRepository } = makeSut();
    const error = new Error(faker.random.words());
    error.stack = faker.random.words();
    jest
      .spyOn(controllerStub, 'handle')
      .mockResolvedValueOnce(HttpResponse.InternalServerError(error));
    const logErrorSpy = jest.spyOn(logRepository, 'logError');
    const httpRequest = mockHttpRequest();

    await sut.handle(httpRequest);

    expect(logErrorSpy).toHaveBeenCalledWith(error.stack);
  });
});
