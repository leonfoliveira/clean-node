import { LoadAccountByTokenRepository, TokenDecoder } from '@/data/interfaces';
import { AccountModel } from '@/domain/models';
import { LoadAccountByToken, LoadAccountByTokenDTO } from '@/domain/usecases';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly tokenDecoder: TokenDecoder,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
  ) {}

  async load(params: LoadAccountByTokenDTO): Promise<AccountModel> {
    const id = await this.tokenDecoder.decode(params.accessToken);
    if (!id) {
      return null;
    }

    const account = await this.loadAccountByTokenRepository.loadByToken(
      params.accessToken,
      params.role,
    );
    return account;
  }
}
