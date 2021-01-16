import bcrypt from 'bcrypt';
import faker from 'faker';

import { BcryptEncrypter } from './bcrypt-encrypter';

jest.mock('bcrypt', () => ({
  hash: async (): Promise<string> => faker.random.uuid(),
}));

type SutTypes = {
  sut: BcryptEncrypter;
  rounds: number;
};

const makeSut = (): SutTypes => {
  const rounds = 12;
  const sut = new BcryptEncrypter(rounds);

  return { sut, rounds };
};

describe('BcryptEncrypter', () => {
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

  it('should throws if bcrypt throws', async () => {
    const { sut } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(error);

    const promise = sut.encrypt(faker.random.word());

    await expect(promise).rejects.toThrow(error);
  });
});
