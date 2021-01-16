import bcrypt from 'bcrypt';

import { Encrypter } from '@/data/protocols';

export class BcryptEncrypter implements Encrypter {
  constructor(private readonly rounds: number) {}

  async encrypt(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.rounds);
    return hash;
  }
}
