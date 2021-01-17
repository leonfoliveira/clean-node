import { HashComparer } from '@/data/interfaces/criptography';
import { LoadAccountByEmailRepository } from '@/data/interfaces/db';
import { AuthorizationModel } from '@/domain/models';
import { Authentication, AuthenticationDTO } from '@/domain/usecases';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
  ) {}

  async auth(params: AuthenticationDTO): Promise<AuthorizationModel> {
    const account = await this.loadAccountByEmailRepository.load(params.email);
    if (account) {
      await this.hashComparer.compare(params.password, account.password);
    }
    return null;
  }
}
