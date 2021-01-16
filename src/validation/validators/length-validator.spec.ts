import faker from 'faker';

import { InvalidParamError } from '@/presentation/errors';

import { LengthValidator } from './length-validator';

const makeSut = (field: string, options = { min: 2, max: 3 }): LengthValidator =>
  new LengthValidator(field, options);

describe('LengthValidator', () => {
  it('should return error if min length is invalid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);

    const error = sut.validate({ [field]: '.' });

    expect(error).toEqual(new InvalidParamError(field));
  });

  it('should return error if max length is invalid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);

    const error = sut.validate({ [field]: '....' });

    expect(error).toEqual(new InvalidParamError(field));
  });

  it('should return null if length is valid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);

    const error = sut.validate({ [field]: '...' });

    expect(error).toBeNull();
  });
});
