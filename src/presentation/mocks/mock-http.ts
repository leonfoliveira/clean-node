import faker from 'faker';

import { HttpRequest } from '../protocols';

export const mockHttpRequest = (): HttpRequest => ({
  body: {
    [faker.database.column()]: faker.random.words(),
  },
});
