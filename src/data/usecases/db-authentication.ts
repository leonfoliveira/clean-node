import { HashComparer, TokenGenerator } from '@/data/interfaces/criptography';
import { LoadAccountByEmailRepository } from '@/data/interfaces/db';
import { AuthorizationModel } from '@/domain/models';
import { Authentication, AuthenticationDTO } from '@/domain/usecases';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
  ) {}

  async auth(params: AuthenticationDTO): Promise<AuthorizationModel> {
    const account = await this.loadAccountByEmailRepository.load(params.email);
    if (account) {
      const isValid = await this.hashComparer.compare(params.password, account.password);
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id);
        return { accessToken };
      }
    }
    return null;
  }
}
