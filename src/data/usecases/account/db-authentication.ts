import {
  HashComparer,
  TokenGenerator,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
} from '@/data/interfaces';
import { AuthorizationModel } from '@/domain/models';
import { Authentication, AuthenticationDTO } from '@/domain/usecases';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository,
  ) {}

  async auth(params: AuthenticationDTO): Promise<AuthorizationModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(params.email);
    if (!account) {
      return null;
    }

    const isValid = await this.hashComparer.compare(params.password, account.password);
    if (!isValid) {
      return null;
    }

    const accessToken = await this.tokenGenerator.generate(account.id);
    await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken);
    return { accessToken };
  }
}
