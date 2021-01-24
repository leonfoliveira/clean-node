import faker from 'faker';

import { DbLoadSurveyResult } from '@/data/usecases';
import { LoadSurveyResultRepositoryStub } from '@/test/data/mocks';
import { mockLoadSurveyResultDTO } from '@/test/domain/mocks/usecases';

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

  it('should return a SurveyResult on success', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();

    const result = await sut.load(mockLoadSurveyResultDTO());

    expect(result).toEqual(loadSurveyResultRepositoryStub.response);
  });

  it('should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockRejectedValueOnce(error);

    const promise = sut.load(mockLoadSurveyResultDTO());

    await expect(promise).rejects.toThrow(error);
  });
});
