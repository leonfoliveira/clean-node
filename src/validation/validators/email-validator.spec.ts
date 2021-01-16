import faker from 'faker';

import { InvalidParamError } from '@/presentation/errors';

import { EmailValidator } from './email-validator';

const makeSut = (field: string): EmailValidator => new EmailValidator(field);

describe('EmailValidator', () => {
  it('should return error if email is invalid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);

    const error = sut.validate({ [field]: faker.random.word() });

    expect(error).toEqual(new InvalidParamError(field));
  });

  it('should return null if email is valid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);

    const error = sut.validate({ [field]: faker.internet.email() });

    expect(error).toBeNull();
  });

  test('should return null if email is empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);

    const error = sut.validate({ [field]: '' });

    expect(error).toBeNull();
  });
});
