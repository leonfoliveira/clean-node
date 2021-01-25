import faker from 'faker';

import { AuthorizationModel } from '@/domain/models';

export const mockAuthorizationModel = (): AuthorizationModel => ({
  accessToken: faker.random.uuid(),
  name: faker.name.findName(),
});
