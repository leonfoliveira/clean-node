import { LogRepository } from '@/data/protocols';

export class LogRepositoryStub implements LogRepository {
  async logError(): Promise<void> {
    return null;
  }
}
