import { LogRepository } from '@/data/protocols';
import { MongodbLogRepository } from '@/infra/db/mongodb/mongodb-log-repository';

export const makeLogRepository = (): LogRepository => new MongodbLogRepository();
