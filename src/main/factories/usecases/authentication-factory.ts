import { DbAuthentication } from '@/data/usecases';
import { Authentication } from '@/domain/usecases';
import {
  makeLoadAccountByEmailRepository,
  makeUpdateAccessTokenRepository,
  makeHashComparer,
  makeTokenGenerator,
} from '@/main/factories/infras';

export const makeAuthentication = (): Authentication =>
  new DbAuthentication(
    makeLoadAccountByEmailRepository(),
    makeHashComparer(),
    makeTokenGenerator(),
    makeUpdateAccessTokenRepository(),
  );
