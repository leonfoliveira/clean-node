import faker from 'faker';

import { DbLoadSurveyResult } from '@/data/usecases';
import { LoadSurveyByIdRepositoryStub, LoadSurveyResultRepositoryStub } from '@/test/data/mocks';
import { mockLoadSurveyResultDTO } from '@/test/domain/mocks/usecases';

type SutTypes = {
  sut: DbLoadSurveyResult;
  loadSurveyResultRepositoryStub: LoadSurveyResultRepositoryStub;
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepositoryStub;
};

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = new LoadSurveyResultRepositoryStub();
  const loadSurveyByIdRepositoryStub = new LoadSurveyByIdRepositoryStub();
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub);

  return { sut, loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub };
};

describe('DbLoadSurveyResult', () => {
  it('should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId');
    const params = mockLoadSurveyResultDTO();

    await sut.load(params);

    expect(loadBySurveyIdSpy).toHaveBeenCalledWith(params.surveyId, params.accountId);
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

  it('should call LoadSurveyByIdRepository with correct values if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub } = makeSut();
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockResolvedValueOnce(null);
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');
    const params = mockLoadSurveyResultDTO();

    await sut.load(params);

    expect(loadByIdSpy).toHaveBeenCalledWith(params.surveyId);
  });

  it('should return a SurveyResultModel if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub } = makeSut();
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockResolvedValueOnce(null);
    const params = mockLoadSurveyResultDTO();

    const result = await sut.load(params);

    const exp = loadSurveyByIdRepositoryStub.response;
    expect(result).toEqual({
      ...exp,
      answers: exp.answers.map((a) => ({
        ...a,
        count: 0,
        percent: 0,
        isCurrentAccountAnswerCount: false,
      })),
    });
  });

  it('should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub } = makeSut();
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockResolvedValueOnce(null);
    const error = new Error(faker.random.words());
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockRejectedValueOnce(error);

    const promise = sut.load(mockLoadSurveyResultDTO());

    await expect(promise).rejects.toThrow(error);
  });
});
