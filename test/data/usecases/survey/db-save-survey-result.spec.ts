import { DbSaveSurveyResult } from '@/data/usecases';
import { SaveSurveyResultRepositoryStub } from '@/test/data/mocks';
import { mockAddSurveyDTO } from '@/test/domain/mocks/usecases';

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
    const params = mockAddSurveyDTO();

    await sut.save(params);

    expect(saveSpy).toHaveBeenCalledWith(params);
  });
});
