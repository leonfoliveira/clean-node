import faker from 'faker';

import { ValidatorStub } from '@/presentation/mocks';

import { ValidatorComposite } from './validator-composite';

type SutTypes = {
  sut: ValidatorComposite;
  validatorStubs: ValidatorStub[];
};

const makeSut = (fieldName: string): SutTypes => {
  const validatorStubs = [new ValidatorStub(fieldName), new ValidatorStub(fieldName)];
  const sut = new ValidatorComposite(validatorStubs);

  return { sut, validatorStubs };
};

describe('ValidatorComposite', () => {
  it('should return an error if any validator fails', () => {
    const fieldName = faker.database.column();
    const { sut, validatorStubs } = makeSut(fieldName);
    const response = new Error(faker.random.words());
    validatorStubs[0].response = response;
    validatorStubs[1].response = response;

    const error = sut.validate({ [fieldName]: faker.random.word() });

    expect(error).toBe(response);
  });

  test('Should return falsy if all validators succeed', () => {
    const fieldName = faker.database.column();
    const { sut } = makeSut(fieldName);

    const error = sut.validate({ [fieldName]: faker.random.word() });

    expect(error).toBeFalsy();
  });
});
