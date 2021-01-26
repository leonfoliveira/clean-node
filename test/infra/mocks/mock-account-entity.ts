import faker from 'faker';

export const mockAccountEntity = (role?: string): any => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role,
});
