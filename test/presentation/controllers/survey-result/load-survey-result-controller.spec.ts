import { LoadSurveyResultController } from '@/presentation/controllers';
import { LoadSurveyResultStub } from '@/test/domain/mocks/usecases';
import { mockLoadSurveyResultHttpRequest } from '@/test/presentation/mocks';

type SutTypes = {
  sut: LoadSurveyResultController;
  loadSurveyResultStub: LoadSurveyResultStub;
};

const makeSut = (): SutTypes => {
  const loadSurveyResultStub = new LoadSurveyResultStub();
  const sut = new LoadSurveyResultController(loadSurveyResultStub);

  return { sut, loadSurveyResultStub };
};

describe('LoadSurveyResultController', () => {
  it('should call LoadSurveyByIdStub with correct values', async () => {
    const { sut, loadSurveyResultStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveyResultStub, 'load');
    const httpRequest = mockLoadSurveyResultHttpRequest();

    await sut.handle(httpRequest);

    expect(loadSpy).toHaveBeenCalledWith({
      surveyId: httpRequest.params.surveyId,
      accountId: httpRequest.headers.accountId,
    });
  });
});
