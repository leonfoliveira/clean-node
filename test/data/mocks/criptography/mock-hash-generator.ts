import faker from 'faker';

import { HashGenerator } from '@/data/interfaces';

export class HashGeneratorStub implements HashGenerator {
  response = faker.random.uuid();

  async generate(): Promise<string> {
    return this.response;
  }
}
