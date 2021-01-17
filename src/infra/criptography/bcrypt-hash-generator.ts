import bcrypt from 'bcrypt';

import { HashGenerator } from '@/data/interfaces/criptography';

export class BcryptHashGenerator implements HashGenerator {
  constructor(private readonly rounds: number) {}

  async generate(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.rounds);
    return hash;
  }
}
