import faker from 'faker';

import { TokenGenerator } from '@/data/interfaces';

export class TokenGeneratorStub implements TokenGenerator {
  response = faker.random.uuid();

  async generate(): Promise<string> {
    return this.response;
  }
}
