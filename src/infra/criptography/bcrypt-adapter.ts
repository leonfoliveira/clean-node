import bcrypt from 'bcrypt';

import { HashComparer, HashGenerator } from '@/data/interfaces/criptography';

export class BcryptAdapter implements HashGenerator, HashComparer {
  constructor(private readonly rounds: number) {}

  async generate(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.rounds);
    return hash;
  }

  async compare(value: string, hash: string): Promise<boolean> {
    await bcrypt.compare(value, hash);
    return null;
  }
}
