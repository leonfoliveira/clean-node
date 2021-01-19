import { LogErrorRepository } from '@/data/interfaces';
import { MongodbLogRepository } from '@/infra/db/mongodb';

export const makeLogErrorRepository = (): LogErrorRepository => new MongodbLogRepository();
