import faker from 'faker';

import { AddSurveyController } from '@/presentation/controllers';
import { mockAddSurveyHttpRequest, ValidatorStub } from '@/test/presentation/mocks';

type SutTypes = {
  sut: AddSurveyController;
  validatorStub: ValidatorStub;
};

const makeSut = (): SutTypes => {
  const validatorStub = new ValidatorStub(faker.database.column());
  const sut = new AddSurveyController(validatorStub);

  return { sut, validatorStub };
};

describe('AddSurveyController', () => {
  it('should call Validator with correct values', async () => {
    const { sut, validatorStub } = makeSut();
    const validateSpy = jest.spyOn(validatorStub, 'validate');
    const httpRequest = mockAddSurveyHttpRequest();

    await sut.handle(httpRequest);

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
