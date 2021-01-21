import faker from 'faker';

import { TokenDecoder } from '@/data/interfaces';

export class TokenDecoderStub implements TokenDecoder {
  response = faker.random.uuid();

  async decode(): Promise<string> {
    return this.response;
  }
}
