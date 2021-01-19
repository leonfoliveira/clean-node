import { UpdateAccessTokenRepository } from '@/data/interfaces';

export class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
  async updateAccessToken(): Promise<void> {
    return null;
  }
}
