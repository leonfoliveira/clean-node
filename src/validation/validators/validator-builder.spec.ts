import faker from 'faker';

import {
  CompareFieldsValidator,
  RequiredFieldValidator,
  EmailValidator,
  LengthValidator,
} from '@/validation/validators';

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

  it('should return EmailValidator', () => {
    const field = faker.database.column();
    const validators = sut.field(field).email().build();

    expect(validators).toEqual([new EmailValidator(field)]);
  });

  it('should return LengthValidator', () => {
    const field = faker.database.column();
    const options = {
      min: faker.random.number(),
      max: faker.random.number(),
    };
    const validators = sut.field(field).length(options).build();

    expect(validators).toEqual([new LengthValidator(field, options)]);
  });
});
