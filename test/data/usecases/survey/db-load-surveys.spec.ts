import faker from 'faker';

import { DbLoadSurveys } from '@/data/usecases';
import { LoadSurveysRepositoryStub } from '@/test/data/mocks';
import { mockLoadSurveysDTO } from '@/test/domain/mocks/usecases';

type SutTypes = {
  sut: DbLoadSurveys;
  loadSurveysRepositoryStub: LoadSurveysRepositoryStub;
};

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = new LoadSurveysRepositoryStub();
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub);

  return { sut, loadSurveysRepositoryStub };
};

describe('DbLoadSurveys', () => {
  it('should call LoadSurveysRepository with correct values', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');
    const params = mockLoadSurveysDTO();

    await sut.loadAll(params);

    expect(loadAllSpy).toHaveBeenCalledWith(params.accountId);
  });

  it('should return a list of surveys on success', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();

    const surveys = await sut.loadAll(mockLoadSurveysDTO());

    expect(surveys).toEqual(loadSurveysRepositoryStub.response);
  });

  it('should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockRejectedValueOnce(error);

    const promise = sut.loadAll(mockLoadSurveysDTO());

    await expect(promise).rejects.toThrow(error);
  });
});
