import { LogRepository } from '@/data/interfaces/db';
import { MongodbLogRepository } from '@/infra/db/mongodb';

export const makeLogRepository = (): LogRepository => new MongodbLogRepository();
