import bcrypt from 'bcrypt';
import faker from 'faker';

import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  hash: (): string => faker.random.uuid(),
}));

describe('BcryptAdapter', () => {
  it('should call bcrypt with correct values', async () => {
    const rounds = 12;
    const sut = new BcryptAdapter(rounds);
    const value = faker.random.word();
    const hashSpy = jest.spyOn(bcrypt, 'hash');

    await sut.encrypt(value);

    expect(hashSpy).toHaveBeenCalledWith(value, rounds);
  });
});
