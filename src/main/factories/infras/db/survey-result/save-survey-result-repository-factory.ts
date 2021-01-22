import { SaveSurveyResultRepository } from '@/data/interfaces';
import { MongodbSurveyResultRepository } from '@/infra';

export const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository =>
  new MongodbSurveyResultRepository();
