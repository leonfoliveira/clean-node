import { mockHttpRequest, ControllerStub } from '@/presentation/mocks';

import { LogControllerDecorator } from './log-controller-decorator';

describe('LogControllerDecorator', () => {
  it('should call Controller with the same params', async () => {
    const controllerStub = new ControllerStub();
    const handleSpy = jest.spyOn(controllerStub, 'handle');
    const sut = new LogControllerDecorator(controllerStub);
    const httpRequest = mockHttpRequest();

    await sut.handle(httpRequest);

    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });
});
