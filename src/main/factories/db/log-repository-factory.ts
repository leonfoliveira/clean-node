import { LogRepository } from '@/data/interfaces';
import { MongodbLogRepository } from '@/infra/db/mongodb/mongodb-log-repository';

export const makeLogRepository = (): LogRepository => new MongodbLogRepository();
