import { DbLoadSurveyById } from '@/data/usecases';
import { LoadSurveyByIdRepositoryStub } from '@/test/data/mocks';
import { mockLoadSurveyByIdDTO } from '@/test/domain/mocks/usecases';

type SutTypes = {
  sut: DbLoadSurveyById;
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepositoryStub;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = new LoadSurveyByIdRepositoryStub();
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub);

  return { sut, loadSurveyByIdRepositoryStub };
};

describe('DbLoadSurveyById', () => {
  it('should call LoadSurveyByIdRepository with correct value', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');
    const params = mockLoadSurveyByIdDTO();

    await sut.loadById(params);

    expect(loadByIdSpy).toHaveBeenCalledWith(params.id);
  });

  it('should return a SurveyModel on success', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();

    const result = await sut.loadById(mockLoadSurveyByIdDTO());

    expect(result).toEqual(loadSurveyByIdRepositoryStub.response);
  });
});
