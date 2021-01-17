import bcrypt from 'bcrypt';
import faker from 'faker';

import { BcryptAdapter } from '@/infra/criptography';

jest.mock('bcrypt', () => ({
  hash: async (): Promise<string> => faker.random.uuid(),
  compare: async (): Promise<boolean> => true,
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
  it('should call bcrypt.hash with correct values', async () => {
    const { sut, rounds } = makeSut();
    const value = faker.random.word();
    const hashSpy = jest.spyOn(bcrypt, 'hash');

    await sut.generate(value);

    expect(hashSpy).toHaveBeenCalledWith(value, rounds);
  });

  it('should return a valid hash on bcrypt.hash success', async () => {
    const { sut } = makeSut();
    const hash = faker.random.uuid();
    jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(hash);

    const result = await sut.generate(faker.random.word());

    expect(result).toBe(hash);
  });

  it('should throw if bcrypt.hash throws', async () => {
    const { sut } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(error);

    const promise = sut.generate(faker.random.word());

    await expect(promise).rejects.toThrow(error);
  });

  it('should call bcrypt.compare with correct values', async () => {
    const { sut } = makeSut();
    const value = faker.random.word();
    const hash = faker.random.uuid();
    const compareSpy = jest.spyOn(bcrypt, 'compare');

    await sut.compare(value, hash);

    expect(compareSpy).toHaveBeenCalledWith(value, hash);
  });

  it('should return true on bcrypt.compare success', async () => {
    const { sut } = makeSut();

    const result = await sut.compare(faker.random.word(), faker.random.uuid());

    expect(result).toBe(true);
  });

  it('should return false on bcrypt.compare fail', async () => {
    const { sut } = makeSut();
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);

    const result = await sut.compare(faker.random.word(), faker.random.uuid());

    expect(result).toBe(false);
  });

  it('should throw if bcrypt.compare throws', async () => {
    const { sut } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(bcrypt, 'compare').mockRejectedValueOnce(error);

    const promise = sut.compare(faker.random.word(), faker.random.uuid());

    await expect(promise).rejects.toThrow(error);
  });
});
