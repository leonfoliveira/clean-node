import bcrypt from 'bcrypt';
import faker from 'faker';

import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  hash: (): string => faker.random.uuid(),
}));

describe('BcryptAdapter', () => {
  it('should call bcrypt with correct value', async () => {
    const sut = new BcryptAdapter();
    const value = faker.random.word();
    const hashSpy = jest.spyOn(bcrypt, 'hash');

    await sut.encrypt(value);

    expect(hashSpy).toHaveBeenCalledWith(value, 12);
  });
});
