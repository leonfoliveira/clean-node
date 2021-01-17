import faker from 'faker';

import { DbAuthentication } from '@/data/usecases';
import { HashComparerStub, TokenGeneratorStub } from '@/test/data/mocks/criptography';
import {
  LoadAccountByEmailRepositoryStub,
  UpdateAccessTokenRepositoryStub,
} from '@/test/data/mocks/db';
import { mockAuthenticationDTO } from '@/test/domain/mocks';

type SutTypes = {
  sut: DbAuthentication;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepositoryStub;
  hashComparerStub: HashComparerStub;
  tokenGeneratorStub: TokenGeneratorStub;
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepositoryStub;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub();
  const hashComparerStub = new HashComparerStub();
  const tokenGeneratorStub = new TokenGeneratorStub();
  const updateAccessTokenRepositoryStub = new UpdateAccessTokenRepositoryStub();
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub,
  );

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub,
  };
};

describe('DbAuthentication', () => {
  it('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadByEmail = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail');
    const authenticationDTO = mockAuthenticationDTO();

    await sut.auth(authenticationDTO);

    expect(loadByEmail).toHaveBeenCalledWith(authenticationDTO.email);
  });

  it('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockRejectedValueOnce(new Error(faker.random.words()));

    const promise = sut.auth(mockAuthenticationDTO());

    await expect(promise).rejects.toThrow();
  });

  it('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockResolvedValueOnce(null);

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

  it('should throw if TokenGenerator throws', async () => {
    const { sut, tokenGeneratorStub } = makeSut();
    jest
      .spyOn(tokenGeneratorStub, 'generate')
      .mockRejectedValueOnce(new Error(faker.random.words()));

    const promise = sut.auth(mockAuthenticationDTO());

    await expect(promise).rejects.toThrow();
  });

  it('should return an AuthorizationModel on success', async () => {
    const { sut, tokenGeneratorStub } = makeSut();

    const authorization = await sut.auth(mockAuthenticationDTO());

    expect(authorization).toEqual({ accessToken: tokenGeneratorStub.response });
  });

  it('should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub, loadAccountByEmailRepositoryStub } = makeSut();
    const updateAccessTokenSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken');

    const authorization = await sut.auth(mockAuthenticationDTO());

    expect(updateAccessTokenSpy).toBeCalledWith(
      loadAccountByEmailRepositoryStub.response.id,
      authorization.accessToken,
    );
  });

  it('should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut();
    jest
      .spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
      .mockRejectedValueOnce(new Error(faker.random.words()));

    const promise = sut.auth(mockAuthenticationDTO());

    await expect(promise).rejects.toThrow();
  });
});
