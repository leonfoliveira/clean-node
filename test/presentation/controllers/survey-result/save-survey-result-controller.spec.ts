import { SaveSurveyResultController } from '@/presentation/controllers';
import { LoadSurveyByIdStub } from '@/test/domain/mocks/usecases';
import { mockSaveSurveyHttpRequest } from '@/test/presentation/mocks';

type SutTypes = {
  sut: SaveSurveyResultController;
  loadSurveyByIdStub: LoadSurveyByIdStub;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = new LoadSurveyByIdStub();
  const sut = new SaveSurveyResultController(loadSurveyByIdStub);

  return { sut, loadSurveyByIdStub };
};

describe('SaveSurveyResultController', () => {
  it('should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById');
    const params = mockSaveSurveyHttpRequest();

    await sut.handle(params);

    expect(loadByIdSpy).toHaveBeenCalledWith(params.params.surveyId);
  });
});
