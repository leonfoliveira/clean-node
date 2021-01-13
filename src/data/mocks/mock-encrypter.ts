import faker from 'faker';

import { Encrypter } from '@/data/protocols';

export class EncrypterStub implements Encrypter {
  response = faker.random.uuid();

  async encrypt(): Promise<string> {
    return this.response;
  }
}
