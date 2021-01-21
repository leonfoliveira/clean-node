import { LoadSurveysController } from '@/presentation/controllers';
import { LoadSurveysStub } from '@/test/domain/mocks/usecases';

type SutTypes = {
  sut: LoadSurveysController;
  loadSurveysStub: LoadSurveysStub;
};

const makeSut = (): SutTypes => {
  const loadSurveysStub = new LoadSurveysStub();
  const sut = new LoadSurveysController(loadSurveysStub);

  return { sut, loadSurveysStub };
};

describe('LoadSurveysController', () => {
  it('should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveysStub, 'load');

    await sut.handle();

    expect(loadSpy).toHaveBeenCalled();
  });
});
