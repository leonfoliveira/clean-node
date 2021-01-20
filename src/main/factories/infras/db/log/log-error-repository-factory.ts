import { LogErrorRepository } from '@/data/interfaces';
import { MongodbLogRepository } from '@/infra';

export const makeLogErrorRepository = (): LogErrorRepository => new MongodbLogRepository();
