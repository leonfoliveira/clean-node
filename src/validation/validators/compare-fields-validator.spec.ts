import faker from 'faker';

import { InvalidParamError } from '@/presentation/errors';

import { CompareFieldsValidator } from './compare-fields-validator';

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidator =>
  new CompareFieldsValidator(field, fieldToCompare);

describe('CompareFieldsValidator', () => {
  test('Should return error if compare is invalid', () => {
    const field = faker.database.column();
    const fieldToCompare = `diff_${field}`;
    const sut = makeSut(field, fieldToCompare);

    const fieldValue = faker.random.words();
    const error = sut.validate({
      [field]: fieldValue,
      [fieldToCompare]: `diff_${fieldValue}`,
    });

    expect(error).toEqual(new InvalidParamError(field));
  });

  test('Should return null if compare is valid', () => {
    const field = faker.database.column();
    const fieldToCompare = `diff_${field}`;
    const fieldValue = faker.random.words();
    const sut = makeSut(field, fieldToCompare);

    const error = sut.validate({ [field]: fieldValue, [fieldToCompare]: fieldValue });

    expect(error).toBeNull();
  });
});
