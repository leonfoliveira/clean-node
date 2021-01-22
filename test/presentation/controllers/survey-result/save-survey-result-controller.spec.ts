import { SaveSurveyResultController } from '@/presentation/controllers';
import { RegisterNotFoundError } from '@/presentation/errors';
import { HttpResponseFactory } from '@/presentation/helpers';
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

  it('should return 404 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    loadSurveyByIdStub.response = null;

    const httpResponse = await sut.handle(mockSaveSurveyHttpRequest());

    expect(httpResponse).toEqual(
      HttpResponseFactory.makeNotFound(new RegisterNotFoundError('survey')),
    );
  });
});
