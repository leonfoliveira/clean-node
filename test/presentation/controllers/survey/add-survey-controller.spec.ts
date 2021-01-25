import faker from 'faker';
import MockDate from 'mockdate';

import { AddSurveyController } from '@/presentation/controllers';
import { HttpResponseFactory } from '@/presentation/helpers';
import { AddSurveyStub } from '@/test/domain/mocks/usecases';
import { mockAddSurveyRequest } from '@/test/presentation/mocks';

type SutTypes = {
  sut: AddSurveyController;
  addSurveyStub: AddSurveyStub;
};

const makeSut = (): SutTypes => {
  const addSurveyStub = new AddSurveyStub();
  const sut = new AddSurveyController(addSurveyStub);

  return { sut, addSurveyStub };
};

describe('AddSurveyController', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('should call AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut();
    const addSpy = jest.spyOn(addSurveyStub, 'add');
    const request = mockAddSurveyRequest();

    await sut.handle(request);

    expect(addSpy).toHaveBeenCalledWith({ ...request, date: new Date() });
  });

  it('should return 500 if AddSurvey throws', async () => {
    const { sut, addSurveyStub } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(addSurveyStub, 'add').mockRejectedValueOnce(error);

    const httpResponse = await sut.handle(mockAddSurveyRequest());

    expect(httpResponse).toEqual(HttpResponseFactory.makeInternalServerError(error));
  });

  it('should return 201 on success', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(mockAddSurveyRequest());

    expect(httpResponse).toEqual(HttpResponseFactory.makeCreated());
  });
});
