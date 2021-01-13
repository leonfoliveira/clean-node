import faker from 'faker';

import { EmailValidatorAdapter } from './email-validator-adapter';

describe('EmailValidatorAdapter', () => {
  it('should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter();

    const isValid = sut.isValid(faker.internet.email());

    expect(isValid).toBe(false);
  });
});
