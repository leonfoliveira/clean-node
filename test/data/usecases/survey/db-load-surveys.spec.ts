import { DbLoadSurveys } from '@/data/usecases';
import { LoadSurveysRepositoryStub } from '@/test/data/mocks';

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
  it('should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');

    await sut.load();

    expect(loadAllSpy).toHaveBeenCalled();
  });

  it('should return a list of surveys on success', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();

    const surveys = await sut.load();

    expect(surveys).toEqual(loadSurveysRepositoryStub.response);
  });
});
