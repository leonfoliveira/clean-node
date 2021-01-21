import { DbLoadSurveys } from '@/data/usecases';
import { LoadSurveysRepositoryStub } from '@/test/data/mocks';

describe('DbLoadSurveys', () => {
  it('should call LoadSurveysRepository', async () => {
    const loadSurveysRepositoryStub = new LoadSurveysRepositoryStub();
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');
    const sut = new DbLoadSurveys(loadSurveysRepositoryStub);

    await sut.load();

    expect(loadAllSpy).toHaveBeenCalled();
  });
});
