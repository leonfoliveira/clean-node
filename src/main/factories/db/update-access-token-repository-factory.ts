import { UpdateAccessTokenRepository } from '@/data/interfaces';
import { MongodbAccountRepository } from '@/infra/db/mongodb';

export const makeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository =>
  new MongodbAccountRepository();
