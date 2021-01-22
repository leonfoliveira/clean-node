import faker from 'faker';

import { SaveSurveyResultDTO } from '@/domain/usecases';

export const mockSaveSurveyResultDTO = (): SaveSurveyResultDTO => ({
  surveyId: faker.random.uuid(),
  accountId: faker.random.uuid(),
  answer: faker.random.words(),
  date: faker.date.past(),
});
