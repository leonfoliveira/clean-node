import { UpdateAccessTokenRepository } from '@/data/interfaces';
import { MongodbAccountRepository } from '@/infra';

export const makeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository =>
  new MongodbAccountRepository();
