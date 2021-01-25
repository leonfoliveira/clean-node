import faker from 'faker';

import { SignUpController } from '@/presentation/controllers';

export const mockSignupRequest = (): SignUpController.Request => {
  const password = faker.internet.password();
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
  };
};
