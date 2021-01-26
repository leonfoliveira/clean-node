import faker from 'faker';

export const mockAccountEntity = (): any => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});
