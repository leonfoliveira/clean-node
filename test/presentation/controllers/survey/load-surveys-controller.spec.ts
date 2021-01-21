import { LoadSurveysController } from '@/presentation/controllers';
import { LoadSurveysStub } from '@/test/domain/mocks/usecases';

describe('LoadSurveysController', () => {
  it('should call LoadSurveys', async () => {
    const loadSurveysStub = new LoadSurveysStub();
    const loadSpy = jest.spyOn(loadSurveysStub, 'load');
    const sut = new LoadSurveysController(loadSurveysStub);

    await sut.handle();

    expect(loadSpy).toHaveBeenCalled();
  });
});
