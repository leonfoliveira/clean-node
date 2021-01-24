import { DbLoadSurveyResult } from '@/data/usecases';
import { mockLoadSurveyResultDTO } from '@/test/domain/mocks/usecases';

import { LoadSurveyResultRepositoryStub } from '../../mocks';

type SutTypes = {
  sut: DbLoadSurveyResult;
  loadSurveyResultRepositoryStub: LoadSurveyResultRepositoryStub;
};

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = new LoadSurveyResultRepositoryStub();
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub);

  return { sut, loadSurveyResultRepositoryStub };
};

describe('DbLoadSurveyResult', () => {
  it('should call LoadSurveyResultRepository with correct value', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId');
    const params = mockLoadSurveyResultDTO();

    await sut.load(params);

    expect(loadBySurveyIdSpy).toHaveBeenCalledWith(params.surveyId);
  });
});
