import { DbLoadSurveys } from '@/data/usecases';
import { LoadSurveys } from '@/domain/usecases';
import { makeLoadSurveysRepository } from '@/main/factories/infras';

export const makeLoadSurveys = (): LoadSurveys => new DbLoadSurveys(makeLoadSurveysRepository());
