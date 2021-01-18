import { DbAuthentication } from '@/data/usecases';
import { Authentication } from '@/domain/usecases';
import { makeHashComparer, makeTokenGenerator } from '@/main/factories/cryptography';
import {
  makeLoadAccountByEmailRepository,
  makeUpdateAccessTokenRepository,
} from '@/main/factories/db';

export const makeAuthentication = (): Authentication =>
  new DbAuthentication(
    makeLoadAccountByEmailRepository(),
    makeHashComparer(),
    makeTokenGenerator(),
    makeUpdateAccessTokenRepository(),
  );
