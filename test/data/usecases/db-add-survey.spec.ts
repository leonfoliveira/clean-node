import { DbAddSurvey } from '@/data/usecases';
import { AddSurveyRepositoryStub } from '@/test/data/mocks';
import { mockAddSurveyDTO } from '@/test/domain/mocks/usecases';

type SutTypes = {
  sut: DbAddSurvey;
  addSurveyRepositoryStub: AddSurveyRepositoryStub;
};

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = new AddSurveyRepositoryStub();
  const sut = new DbAddSurvey(addSurveyRepositoryStub);

  return { sut, addSurveyRepositoryStub };
};

describe('DbAddSurvey', () => {
  it('should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');
    const survey = mockAddSurveyDTO();

    await sut.add(survey);

    expect(addSpy).toHaveBeenCalledWith(survey);
  });
});
