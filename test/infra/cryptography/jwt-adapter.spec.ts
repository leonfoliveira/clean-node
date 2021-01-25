import faker from 'faker';
import jwt from 'jsonwebtoken';

import { JwtAdapter } from '@/infra';

jest.mock('jsonwebtoken', () => ({
  sign: (): string => faker.random.uuid(),
  verify: (): any => null,
}));

type SutTypes = {
  sut: JwtAdapter;
};

const makeSut = (secret = faker.random.word()): SutTypes => {
  const sut = new JwtAdapter(secret);

  return { sut };
};

describe('JwtAdapter', () => {
  describe('TokenGenerator', () => {
    it('should call jwt.sign with correct values', async () => {
      const secret = faker.random.word();
      const { sut } = makeSut(secret);
      const signSpy = jest.spyOn(jwt, 'sign');
      const id = faker.random.uuid();

      await sut.generate(id);

      expect(signSpy).toHaveBeenCalledWith({ id }, secret);
    });

    it('should return a token on success', async () => {
      const { sut } = makeSut();
      const id = faker.random.uuid();
      const accessToken = faker.random.uuid();
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => accessToken);

      const result = await sut.generate(id);

      expect(result).toBe(accessToken);
    });

    it('should throw if jwt.sign throws', async () => {
      const { sut } = makeSut();
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error(faker.random.words());
      });

      const promise = sut.generate(faker.random.uuid());

      await expect(promise).rejects.toThrow();
    });
  });

  describe('TokenDecoder', () => {
    it('should call jwt.verify with correct values', async () => {
      const secret = faker.random.word();
      const { sut } = makeSut(secret);
      const verifySpy = jest.spyOn(jwt, 'verify');
      const accessToken = faker.random.uuid();

      await sut.decode(accessToken);

      expect(verifySpy).toHaveBeenCalledWith(accessToken, secret);
    });

    it('should return a value on success', async () => {
      const { sut } = makeSut();
      const id = faker.random.uuid();
      const accessToken = faker.random.uuid();
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => ({ id }));

      const result = await sut.decode(accessToken);

      expect(result).toEqual({ id });
    });

    it('should return null if jwt.verify throws', async () => {
      const { sut } = makeSut();
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error(faker.random.words());
      });

      const result = await sut.decode(faker.random.uuid());

      expect(result).toBeNull();
    });
  });
});
