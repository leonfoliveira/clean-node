import faker from 'faker';

import { HttpRequest } from '@/presentation/interfaces';

export const mockLoginHttpRequest = (): HttpRequest => ({
  body: {
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
});
