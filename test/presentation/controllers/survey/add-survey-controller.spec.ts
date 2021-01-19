import faker from 'faker';

import { AddSurveyController } from '@/presentation/controllers';
import { mockAddSurveyHttpRequest, ValidatorStub } from '@/test/presentation/mocks';

describe('AddSurveyController', () => {
  it('should call Validator with correct values', async () => {
    const validatorStub = new ValidatorStub(faker.database.column());
    const validateSpy = jest.spyOn(validatorStub, 'validate');
    const sut = new AddSurveyController(validatorStub);
    const httpRequest = mockAddSurveyHttpRequest();

    await sut.handle(httpRequest);

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
