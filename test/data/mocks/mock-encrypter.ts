import faker from 'faker';

import { Encrypter } from '@/data/interfaces/criptography';

export class EncrypterStub implements Encrypter {
  response = faker.random.uuid();

  async encrypt(): Promise<string> {
    return this.response;
  }
}
