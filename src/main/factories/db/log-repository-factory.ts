import { LogRepository } from '@/data/interfaces';
import { MongodbLogRepository } from '@/infra/db/mongodb';

export const makeLogRepository = (): LogRepository => new MongodbLogRepository();
