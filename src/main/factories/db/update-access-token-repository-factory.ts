import { UpdateAccessTokenRepository } from '@/data/interfaces/db';
import { MongodbAccountRepository } from '@/infra/db/mongodb';

export const makeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository =>
  new MongodbAccountRepository();
