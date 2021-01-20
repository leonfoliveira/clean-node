import { AddSurveyRepository } from '@/data/interfaces';
import { MongodbSurveyRepository } from '@/infra';

export const makeAddSurveyRepository = (): AddSurveyRepository => new MongodbSurveyRepository();
