import { DbLoadAccountByToken } from '@/data/usecases';
import { TokenDecoderStub } from '@/test/data/mocks';
import { mockLoadAccountByTokenDTO } from '@/test/domain/mocks/usecases';

type SutTypes = {
  sut: DbLoadAccountByToken;
  tokenDecoderStub: TokenDecoderStub;
};

const makeSut = (): SutTypes => {
  const tokenDecoderStub = new TokenDecoderStub();
  const sut = new DbLoadAccountByToken(tokenDecoderStub);

  return { sut, tokenDecoderStub };
};

describe('DbLoadAccountByToken', () => {
  it('should call TokenDecoder with correct values', async () => {
    const { sut, tokenDecoderStub } = makeSut();
    const decodeSpy = jest.spyOn(tokenDecoderStub, 'decode');
    const params = mockLoadAccountByTokenDTO();

    await sut.load(params);

    expect(decodeSpy).toHaveBeenCalledWith(params.accessToken);
  });
});
