import { LogErrorRepository } from '@/data/interfaces';

export class LogErrorRepositoryStub implements LogErrorRepository {
  async logError(): Promise<void> {
    return null;
  }
}
