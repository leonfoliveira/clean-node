import jwt from 'jsonwebtoken';

import { TokenGenerator, TokenDecoder } from '@/data/interfaces';

export class JwtAdapter implements TokenGenerator, TokenDecoder {
  constructor(private readonly secret: string) {}

  async generate(id: string): Promise<string> {
    return jwt.sign({ id }, this.secret);
  }

  async decode(accessToken: string): Promise<any> {
    return jwt.verify(accessToken, this.secret);
  }
}
