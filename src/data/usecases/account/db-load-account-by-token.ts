import { TokenDecoder } from '@/data/interfaces';
import { AccountModel } from '@/domain/models';
import { LoadAccountByToken, LoadAccountByTokenDTO } from '@/domain/usecases';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(private readonly tokenDecoder: TokenDecoder) {}

  async load(params: LoadAccountByTokenDTO): Promise<AccountModel> {
    await this.tokenDecoder.decode(params.accessToken);
    return null;
  }
}
