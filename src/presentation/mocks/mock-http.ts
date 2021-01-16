import faker from 'faker';

import { HttpRequest, HttpResponse } from '../interfaces';

export const mockHttpRequest = (): HttpRequest => ({
  body: {
    [faker.database.column()]: faker.random.words(),
  },
});

export const mockHttpResponse = (): HttpResponse => ({
  statusCode: faker.random.number(),
  body: {
    [faker.database.column()]: faker.random.words(),
  },
});
