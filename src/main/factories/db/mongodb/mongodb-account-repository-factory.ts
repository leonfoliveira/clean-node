import { MongodbAccountRepository } from '@/infra/db/mongodb';

export const makeMongodbAccountRepository = (): MongodbAccountRepository =>
  new MongodbAccountRepository();
