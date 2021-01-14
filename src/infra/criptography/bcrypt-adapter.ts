import bcrypt from 'bcrypt';

import { Encrypter } from '@/data/protocols';

export class BcryptAdapter implements Encrypter {
  constructor(private readonly rounds: number) {}

  async encrypt(value: string): Promise<string> {
    await bcrypt.hash(value, this.rounds);
    return null;
  }
}
