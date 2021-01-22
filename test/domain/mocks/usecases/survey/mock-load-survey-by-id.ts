import faker from 'faker';

import { LoadSurveyByIdDTO } from '@/domain/usecases';

export const mockLoadSurveyByIdDTO = (): LoadSurveyByIdDTO => ({
  id: faker.random.uuid(),
});
