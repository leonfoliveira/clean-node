import { DbLoadAccountByToken } from '@/data/usecases';
import { TokenDecoderStub } from '@/test/data/mocks';
import { mockLoadAccountByTokenDTO } from '@/test/domain/mocks/usecases';

describe('DbLoadAccountByToken', () => {
  it('should call TokenDecoder with correct values', async () => {
    const tokenDecoderStub = new TokenDecoderStub();
    const decodeSpy = jest.spyOn(tokenDecoderStub, 'decode');
    const sut = new DbLoadAccountByToken(tokenDecoderStub);
    const params = mockLoadAccountByTokenDTO();

    await sut.load(params);

    expect(decodeSpy).toHaveBeenCalledWith(params.accessToken);
  });
});
