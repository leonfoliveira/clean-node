import { LoadSurveyResultDTO } from 'domain/usecases';

import faker from 'faker';

export const mockLoadSurveyResultDTO = (): LoadSurveyResultDTO => ({
  surveyId: faker.random.uuid(),
  accountId: faker.random.uuid(),
});
