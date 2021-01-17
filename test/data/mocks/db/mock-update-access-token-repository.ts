import { UpdateAccessTokenRepository } from '@/data/interfaces/db';

export class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
  async update(): Promise<void> {
    return null;
  }
}
