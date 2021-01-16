import faker from 'faker';

import { AuthenticationModel } from '@/domain/models';

export const mockAuthenticationModel = (): AuthenticationModel => ({
  accessToken: faker.random.uuid(),
});
