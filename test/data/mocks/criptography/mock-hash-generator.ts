import faker from 'faker';

import { HashGenerator } from '@/data/interfaces/criptography';

export class HashGeneratorStub implements HashGenerator {
  response = faker.random.uuid();

  async generate(): Promise<string> {
    return this.response;
  }
}
