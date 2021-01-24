import faker from 'faker';

import { DbSaveSurveyResult } from '@/data/usecases';
import { LoadSurveyResultRepositoryStub, SaveSurveyResultRepositoryStub } from '@/test/data/mocks';
import { mockSaveSurveyResultDTO } from '@/test/domain/mocks/usecases';

type SutTypes = {
  sut: DbSaveSurveyResult;
  saveSurveyResultRepositoryStub: SaveSurveyResultRepositoryStub;
  loadSurveyResultRepositoryStub: LoadSurveyResultRepositoryStub;
};

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = new SaveSurveyResultRepositoryStub();
  const loadSurveyResultRepositoryStub = new LoadSurveyResultRepositoryStub();
  const sut = new DbSaveSurveyResult(
    saveSurveyResultRepositoryStub,
    loadSurveyResultRepositoryStub,
  );

  return { sut, saveSurveyResultRepositoryStub, loadSurveyResultRepositoryStub };
};

describe('DbSaveSurveyResult', () => {
  it('should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save');
    const params = mockSaveSurveyResultDTO();

    await sut.save(params);

    expect(saveSpy).toHaveBeenCalledWith(params);
  });

  it('should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId');
    const params = mockSaveSurveyResultDTO();

    await sut.save(params);

    expect(loadBySurveyIdSpy).toHaveBeenCalledWith(params.surveyId, params.accountId);
  });

  it('should return a SurveyResult on success', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();

    const result = await sut.save(mockSaveSurveyResultDTO());

    expect(result).toEqual(loadSurveyResultRepositoryStub.response);
  });

  it('should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockRejectedValueOnce(error);

    const promise = sut.save(mockSaveSurveyResultDTO());

    await expect(promise).rejects.toThrow(error);
  });

  it('should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockRejectedValueOnce(error);

    const promise = sut.save(mockSaveSurveyResultDTO());

    await expect(promise).rejects.toThrow(error);
  });
});
