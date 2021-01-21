import { LoadSurveysRepository } from '@/data/interfaces';
import { MongodbSurveyRepository } from '@/infra';

export const makeLoadSurveysRepository = (): LoadSurveysRepository => new MongodbSurveyRepository();
