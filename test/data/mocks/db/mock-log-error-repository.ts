import { LogErrorRepository } from '@/data/interfaces/db';

export class LogErrorRepositoryStub implements LogErrorRepository {
  async logError(): Promise<void> {
    return null;
  }
}
