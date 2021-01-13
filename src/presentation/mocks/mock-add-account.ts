import faker from 'faker';

import { AccountModel } from '@/domain/models';
import { AddAccount } from '@/domain/usecases';

export class AddAccountStub implements AddAccount {
  add(): AccountModel {
    return {
      id: faker.random.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }
}
