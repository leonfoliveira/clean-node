import { UpdateAccessTokenRepository } from '@/data/interfaces/db';

export class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
  async updateAccessToken(): Promise<void> {
    return null;
  }
}
