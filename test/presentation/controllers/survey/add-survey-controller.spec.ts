import faker from 'faker';

import { AddSurveyController } from '@/presentation/controllers';
import { HttpResponseFactory } from '@/presentation/helpers';
import { AddSurveyStub } from '@/test/domain/mocks/usecases';
import { mockAddSurveyHttpRequest, ValidatorStub } from '@/test/presentation/mocks';

type SutTypes = {
  sut: AddSurveyController;
  validatorStub: ValidatorStub;
  addSurveyStub: AddSurveyStub;
};

const makeSut = (): SutTypes => {
  const validatorStub = new ValidatorStub(faker.database.column());
  const addSurveyStub = new AddSurveyStub();
  const sut = new AddSurveyController(validatorStub, addSurveyStub);

  return { sut, validatorStub, addSurveyStub };
};

describe('AddSurveyController', () => {
  it('should call Validator with correct values', async () => {
    const { sut, validatorStub } = makeSut();
    const validateSpy = jest.spyOn(validatorStub, 'validate');
    const httpRequest = mockAddSurveyHttpRequest();

    await sut.handle(httpRequest);

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  it('should return 400 if Validation returns an error', async () => {
    const { sut, validatorStub } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(error);
    const httpRequest = mockAddSurveyHttpRequest();

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(HttpResponseFactory.makeBadRequest(error));
  });

  it('should call AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut();
    const addSpy = jest.spyOn(addSurveyStub, 'add');
    const httpRequest = mockAddSurveyHttpRequest();

    await sut.handle(httpRequest);

    expect(addSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
