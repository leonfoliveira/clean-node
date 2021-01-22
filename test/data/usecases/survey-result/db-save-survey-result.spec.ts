import faker from 'faker';

import { DbSaveSurveyResult } from '@/data/usecases';
import { SaveSurveyResultRepositoryStub } from '@/test/data/mocks';
import { mockSaveSurveyResultDTO } from '@/test/domain/mocks/usecases';

type SutTypes = {
  sut: DbSaveSurveyResult;
  saveSurveyResultRepositoryStub: SaveSurveyResultRepositoryStub;
};

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = new SaveSurveyResultRepositoryStub();
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub);

  return { sut, saveSurveyResultRepositoryStub };
};

describe('DbSaveSurveyResult', () => {
  it('should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save');
    const params = mockSaveSurveyResultDTO();

    await sut.save(params);

    expect(saveSpy).toHaveBeenCalledWith(params);
  });

  it('should return a SurveyResult on success', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();

    const result = await sut.save(mockSaveSurveyResultDTO());

    expect(result).toEqual(saveSurveyResultRepositoryStub.response);
  });

  it('should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockRejectedValueOnce(error);

    const promise = sut.save(mockSaveSurveyResultDTO());

    await expect(promise).rejects.toThrow(error);
  });
});