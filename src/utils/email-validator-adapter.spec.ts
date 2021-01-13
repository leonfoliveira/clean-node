import faker from 'faker';
import validator from 'validator';

import { EmailValidatorAdapter } from './email-validator-adapter';

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true;
  },
}));

describe('EmailValidatorAdapter', () => {
  it('should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const isValid = sut.isValid(faker.internet.email());

    expect(isValid).toBe(false);
  });

  it('should return true if validator returns true', () => {
    const sut = new EmailValidatorAdapter();

    const isValid = sut.isValid(faker.internet.email());

    expect(isValid).toBe(true);
  });

  it('should call validator with correct email', () => {
    const sut = new EmailValidatorAdapter();
    const isEmailSpy = jest.spyOn(validator, 'isEmail');
    const email = faker.internet.email();
    sut.isValid(email);

    expect(isEmailSpy).toHaveBeenCalledWith(email);
  });
});
