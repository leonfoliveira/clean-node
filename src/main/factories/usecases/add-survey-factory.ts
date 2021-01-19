import { DbAddSurvey } from '@/data/usecases';
import { AddSurvey } from '@/domain/usecases';
import { makeAddSurveyRepository } from '@/main/factories/infras';

export const makeAddSurvey = (): AddSurvey => new DbAddSurvey(makeAddSurveyRepository());
