import faker from 'faker';

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

  it('should return a SurveyModel on success', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();

    const result = await sut.add(mockAddSurveyDTO());

    expect(result).toEqual(addSurveyRepositoryStub.response);
  });

  it('should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(addSurveyRepositoryStub, 'add').mockRejectedValueOnce(error);
    const survey = mockAddSurveyDTO();

    const promise = sut.add(survey);

    await expect(promise).rejects.toThrow(error);
  });
});
