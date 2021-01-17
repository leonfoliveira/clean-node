import { LoadAccountByEmailRepository } from '@/data/interfaces/db';
import { AuthorizationModel } from '@/domain/models';
import { Authentication, AuthenticationDTO } from '@/domain/usecases';

export class DbAuthentication implements Authentication {
  constructor(private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}

  async auth(params: AuthenticationDTO): Promise<AuthorizationModel> {
    await this.loadAccountByEmailRepository.load(params.email);
    return null;
  }
}
