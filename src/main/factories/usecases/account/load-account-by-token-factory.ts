import { DbLoadAccountByToken } from '@/data/usecases';
import { LoadAccountByToken } from '@/domain/usecases';
import { makeTokenDecoder, makeLoadAccountByTokenRepository } from '@/main/factories/infras';

export const makeLoadAccountByToken = (): LoadAccountByToken =>
  new DbLoadAccountByToken(makeTokenDecoder(), makeLoadAccountByTokenRepository());
