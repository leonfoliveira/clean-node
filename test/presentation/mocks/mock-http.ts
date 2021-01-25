import faker from 'faker';

import { HttpResponse } from '@/presentation/interfaces';

export const mockHttpResponse = (): HttpResponse => ({
  statusCode: faker.random.number(),
  body: {
    [faker.database.column()]: faker.random.words(),
  },
});
