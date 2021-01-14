import bcrypt from 'bcrypt';
import faker from 'faker';

import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  hash: async (): Promise<string> => faker.random.uuid(),
}));

type SutTypes = {
  sut: BcryptAdapter;
  rounds: number;
};

const makeSut = (): SutTypes => {
  const rounds = 12;
  const sut = new BcryptAdapter(rounds);

  return { sut, rounds };
};

describe('BcryptAdapter', () => {
  it('should call bcrypt with correct values', async () => {
    const { sut, rounds } = makeSut();
    const value = faker.random.word();
    const hashSpy = jest.spyOn(bcrypt, 'hash');

    await sut.encrypt(value);

    expect(hashSpy).toHaveBeenCalledWith(value, rounds);
  });

  it('should return a hash on success', async () => {
    const { sut } = makeSut();
    const hash = faker.random.uuid();
    jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(hash);

    const result = await sut.encrypt(faker.random.word());

    expect(result).toBe(hash);
  });
});
