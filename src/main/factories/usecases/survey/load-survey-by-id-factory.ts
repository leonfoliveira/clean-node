import { DbLoadSurveyById } from '@/data/usecases';
import { LoadSurveyById } from '@/domain/usecases';
import { makeLoadSurveyByIdRepository } from '@/main/factories/infras';

export const makeLoadSurveyById = (): LoadSurveyById =>
  new DbLoadSurveyById(makeLoadSurveyByIdRepository());
