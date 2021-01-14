import bcrypt from 'bcrypt';
import faker from 'faker';

import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  hash: async (): Promise<string> => faker.random.uuid(),
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

  it('should return a hash on success', async () => {
    const rounds = 12;
    const sut = new BcryptAdapter(rounds);
    const value = faker.random.uuid();
    jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(value);

    const hash = await sut.encrypt(faker.random.word());

    expect(hash).toBe(value);
  });
});
