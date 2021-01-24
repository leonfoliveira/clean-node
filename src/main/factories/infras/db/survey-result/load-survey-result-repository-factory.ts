import { LoadSurveyResultRepository } from '@/data/interfaces';
import { MongodbSurveyResultRepository } from '@/infra';

export const makeLoadSurveyResultRepository = (): LoadSurveyResultRepository =>
  new MongodbSurveyResultRepository();
