import { LoadSurveyByIdRepository } from '@/data/interfaces';
import { MongodbSurveyRepository } from '@/infra';

export const makeLoadSurveyByIdRepository = (): LoadSurveyByIdRepository =>
  new MongodbSurveyRepository();
