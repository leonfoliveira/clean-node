import faker from 'faker';

import { HttpRequest } from '@/presentation/interfaces';

export const mockLoadSurveysHttpRequest = (): HttpRequest => ({
  headers: {
    accountId: faker.random.uuid(),
  },
});
