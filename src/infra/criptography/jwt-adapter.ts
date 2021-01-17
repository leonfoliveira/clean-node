import jwt from 'jsonwebtoken';

import { TokenGenerator } from '@/data/interfaces/criptography';

export class JwtAdapter implements TokenGenerator {
  constructor(private readonly secret: string) {}

  async generate(id: string): Promise<string> {
    jwt.sign({ id }, this.secret);
    return null;
  }
}
