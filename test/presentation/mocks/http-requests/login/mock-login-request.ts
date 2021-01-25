import faker from 'faker';

import { LoginController } from '@/presentation/controllers';

export const mockLoginRequest = (): LoginController.Request => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
