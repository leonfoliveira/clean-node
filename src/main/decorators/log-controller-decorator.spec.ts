import { LogRepositoryStub } from '@/data/mocks';
import { mockHttpRequest, ControllerStub } from '@/presentation/mocks';

import { LogControllerDecorator } from './log-controller-decorator';

type SutTypes = {
  sut: LogControllerDecorator;
  controllerStub: ControllerStub;
  logErrorRepository: LogRepositoryStub;
};

const makeSut = (): SutTypes => {
  const controllerStub = new ControllerStub();
  const logErrorRepository = new LogRepositoryStub();
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
});
