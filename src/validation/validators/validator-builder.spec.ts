import faker from 'faker';

import { CompareFieldsValidator, RequiredFieldValidator } from '@/validation/validators';

import { ValidatorBuilder as sut } from './validator-builder';

describe('ValidatorBuilder', () => {
  it('should return RequiredFieldValidator', () => {
    const field = faker.database.column();
    const validators = sut.field(field).required().build();

    expect(validators).toEqual([new RequiredFieldValidator(field)]);
  });

  it('should return CompareFieldsValidator', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const validators = sut.field(field).sameAs(fieldToCompare).build();

    expect(validators).toEqual([new CompareFieldsValidator(field, fieldToCompare)]);
  });
});
