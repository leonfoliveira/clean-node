import { DbLoadSurveyResult } from '@/data/usecases';
import { mockLoadSurveyResultDTO } from '@/test/domain/mocks/usecases';

import { LoadSurveyResultRepositoryStub } from '../../mocks';

describe('DbLoadSurveyResult', () => {
  it('should call LoadSurveyResultRepository with correct value', async () => {
    const params = mockLoadSurveyResultDTO();
    const loadSurveyResultRepositoryStub = new LoadSurveyResultRepositoryStub();
    const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub);
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId');

    await sut.load(params);

    expect(loadBySurveyIdSpy).toHaveBeenCalledWith(params.surveyId);
  });
});
