import bcrypt from 'bcrypt';
import faker from 'faker';

import { BcryptHashGenerator } from '@/infra/criptography';

jest.mock('bcrypt', () => ({
  hash: async (): Promise<string> => faker.random.uuid(),
}));

type SutTypes = {
  sut: BcryptHashGenerator;
  rounds: number;
};

const makeSut = (): SutTypes => {
  const rounds = 12;
  const sut = new BcryptHashGenerator(rounds);

  return { sut, rounds };
};

describe('BcryptHashGenerator', () => {
  it('should call bcrypt with correct values', async () => {
    const { sut, rounds } = makeSut();
    const value = faker.random.word();
    const hashSpy = jest.spyOn(bcrypt, 'hash');

    await sut.generate(value);

    expect(hashSpy).toHaveBeenCalledWith(value, rounds);
  });

  it('should return a hash on success', async () => {
    const { sut } = makeSut();
    const hash = faker.random.uuid();
    jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(hash);

    const result = await sut.generate(faker.random.word());

    expect(result).toBe(hash);
  });

  it('should throws if bcrypt throws', async () => {
    const { sut } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(error);

    const promise = sut.generate(faker.random.word());

    await expect(promise).rejects.toThrow(error);
  });
});
