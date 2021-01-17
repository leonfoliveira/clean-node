import { LogErrorRepository } from '@/data/interfaces/db';
import { MongodbLogRepository } from '@/infra/db/mongodb';

export const makeLogErrorRepository = (): LogErrorRepository => new MongodbLogRepository();
