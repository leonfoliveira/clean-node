import faker from 'faker';

import { DbLoadAccountByToken } from '@/data/usecases';
import { LoadAccountByTokenRepositoryStub, TokenDecoderStub } from '@/test/data/mocks';
import { mockLoadAccountByTokenDTO } from '@/test/domain/mocks/usecases';

type SutTypes = {
  sut: DbLoadAccountByToken;
  tokenDecoderStub: TokenDecoderStub;
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepositoryStub;
};

const makeSut = (): SutTypes => {
  const tokenDecoderStub = new TokenDecoderStub();
  const loadAccountByTokenRepositoryStub = new LoadAccountByTokenRepositoryStub();
  const sut = new DbLoadAccountByToken(tokenDecoderStub, loadAccountByTokenRepositoryStub);

  return { sut, tokenDecoderStub, loadAccountByTokenRepositoryStub };
};

describe('DbLoadAccountByToken', () => {
  it('should call TokenDecoder with correct values', async () => {
    const { sut, tokenDecoderStub } = makeSut();
    const decodeSpy = jest.spyOn(tokenDecoderStub, 'decode');
    const params = mockLoadAccountByTokenDTO();

    await sut.load(params);

    expect(decodeSpy).toHaveBeenCalledWith(params.accessToken);
  });

  it('should return null if TokenDecoder returns null', async () => {
    const { sut, tokenDecoderStub } = makeSut();
    tokenDecoderStub.response = null;
    const params = mockLoadAccountByTokenDTO();

    const account = await sut.load(params);

    expect(account).toBeNull();
  });

  it('should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken');
    const params = mockLoadAccountByTokenDTO();

    await sut.load(params);

    expect(loadByTokenSpy).toHaveBeenCalledWith(params.accessToken, params.role);
  });

  it('should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    loadAccountByTokenRepositoryStub.response = null;
    const params = mockLoadAccountByTokenDTO();

    const account = await sut.load(params);

    expect(account).toBeNull();
  });

  it('should return an AccountModel on success', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    const params = mockLoadAccountByTokenDTO();

    const account = await sut.load(params);

    expect(account).toEqual(loadAccountByTokenRepositoryStub.response);
  });

  it('should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockRejectedValueOnce(error);
    const params = mockLoadAccountByTokenDTO();

    const promise = sut.load(params);

    await expect(promise).rejects.toThrow(error);
  });
});
