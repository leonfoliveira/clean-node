import faker from 'faker';

import { LoadSurveysController } from '@/presentation/controllers';

export const mockLoadSurveysRequest = (): LoadSurveysController.Request => ({
  accountId: faker.random.uuid(),
});
