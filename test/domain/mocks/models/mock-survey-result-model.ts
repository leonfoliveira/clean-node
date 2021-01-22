import faker from 'faker';

import { SurveyResultModel } from '@/domain/models';

export const mockSurveyResultModel = (): SurveyResultModel => ({
  id: faker.random.uuid(),
  surveyId: faker.random.uuid(),
  accountId: faker.random.uuid(),
  answer: faker.random.words(),
  date: faker.date.past(),
});
