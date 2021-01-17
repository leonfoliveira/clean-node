import { LogRepository } from '@/data/interfaces/db';

export class LogRepositoryStub implements LogRepository {
  async logError(): Promise<void> {
    return null;
  }
}
