import faker from 'faker';

import { ValidationControllerProxy } from '@/main/utils';
import { InvalidParamError } from '@/presentation/errors';
import { HttpResponseFactory } from '@/presentation/helpers';
import { ValidatorStub } from '@/test/data/mocks';
import { mockLoginRequest } from '@/test/presentation/mocks';

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

  it('should return 400 if Validator returns an error', async () => {
    const { sut, validatorStub } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(error);

    const httpResponse = await sut.handle(mockLoginRequest());

    expect(httpResponse).toEqual(
      HttpResponseFactory.makeBadRequest(new InvalidParamError(error.message)),
    );
  });
});
