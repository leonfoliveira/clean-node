import faker from 'faker';

import { ValidationControllerProxy } from '@/main/utils';
import { ValidatorStub } from '@/test/data/mocks';

type SutTypes = {
  sut: ValidationControllerProxy;
  validatorStub: ValidatorStub;
};

const makeSut = (): SutTypes => {
  const validatorStub = new ValidatorStub();
  const sut = new ValidationControllerProxy(validatorStub);

  return { sut, validatorStub };
};

describe('ValidationControllerProxy', () => {
  it('should call Validator with correct values', async () => {
    const { sut, validatorStub } = makeSut();
    const validateSpy = jest.spyOn(validatorStub, 'validate');
    const request = { [faker.database.column()]: faker.random.words() };

    await sut.handle(request);

    expect(validateSpy).toHaveBeenCalledWith(request);
  });
});
