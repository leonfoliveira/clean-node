import faker from 'faker';

import { MissingParamError } from '@/presentation/errors';

import { RequiredFieldValidator } from './required-field-validator';

const makeSut = (field: string): RequiredFieldValidator => new RequiredFieldValidator(field);

describe('RequiredFieldValidator', () => {
  it('should return error if field is empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);

    const error = sut.validate({ [field]: '' });
    expect(error).toEqual(new MissingParamError(field));
  });
});
