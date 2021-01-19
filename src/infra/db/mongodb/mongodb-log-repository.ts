import { LogErrorRepository } from '@/data/interfaces';
import { MongoHelper } from '@/infra/db/mongodb';

export class MongodbLogRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors');
    await errorCollection.insertOne({ stack, date: new Date() });
  }
}
