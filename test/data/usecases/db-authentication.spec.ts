import faker from 'faker';

import { DbAuthentication } from '@/data/usecases';
import { HashComparerStub, TokenGeneratorStub } from '@/test/data/mocks/criptography';
import { LoadAccountByEmailRepositoryStub } from '@/test/data/mocks/db';
import { mockAuthenticationDTO } from '@/test/domain/mocks';

type SutTypes = {
  sut: DbAuthentication;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepositoryStub;
  hashComparerStub: HashComparerStub;
  tokenGeneratorStub: TokenGeneratorStub;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub();
  const hashComparerStub = new HashComparerStub();
  const tokenGeneratorStub = new TokenGeneratorStub();
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub,
  );

  return { sut, loadAccountByEmailRepositoryStub, hashComparerStub, tokenGeneratorStub };
};

describe('DbAuthentication', () => {
  it('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load');
    const authenticationDTO = mockAuthenticationDTO();

    await sut.auth(authenticationDTO);

    expect(loadSpy).toHaveBeenCalledWith(authenticationDTO.email);
  });

  it('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockRejectedValueOnce(new Error(faker.random.words()));

    const promise = sut.auth(mockAuthenticationDTO());

    await expect(promise).rejects.toThrow();
  });

  it('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockResolvedValueOnce(null);

    const authorization = await sut.auth(mockAuthenticationDTO());

    expect(authorization).toBeNull();
  });

  it('should call HashComparer with correct values', async () => {
    const { sut, loadAccountByEmailRepositoryStub, hashComparerStub } = makeSut();
    const compareSpy = jest.spyOn(hashComparerStub, 'compare');
    const authenticationDTO = mockAuthenticationDTO();

    await sut.auth(authenticationDTO);

    expect(compareSpy).toBeCalledWith(
      authenticationDTO.password,
      loadAccountByEmailRepositoryStub.response.password,
    );
  });

  it('should throw if HashCompare throws', async () => {
    const { sut, hashComparerStub } = makeSut();
    jest.spyOn(hashComparerStub, 'compare').mockRejectedValueOnce(new Error(faker.random.words()));

    const promise = sut.auth(mockAuthenticationDTO());

    await expect(promise).rejects.toThrow();
  });

  it('should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut();
    jest.spyOn(hashComparerStub, 'compare').mockResolvedValueOnce(false);

    const authorization = await sut.auth(mockAuthenticationDTO());

    expect(authorization).toBeNull();
  });

  it('should call TokenGenerator with correct id', async () => {
    const { sut, loadAccountByEmailRepositoryStub, tokenGeneratorStub } = makeSut();
    const generateSpy = jest.spyOn(tokenGeneratorStub, 'generate');
    const authenticationDTO = mockAuthenticationDTO();

    await sut.auth(authenticationDTO);

    expect(generateSpy).toBeCalledWith(loadAccountByEmailRepositoryStub.response.id);
  });
});
