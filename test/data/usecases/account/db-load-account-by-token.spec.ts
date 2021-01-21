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
});
