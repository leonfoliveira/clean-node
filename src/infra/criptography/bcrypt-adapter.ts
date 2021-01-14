import bcrypt from 'bcrypt';

import { Encrypter } from '@/data/protocols';

export class BcryptAdapter implements Encrypter {
  async encrypt(value: string): Promise<string> {
    await bcrypt.hash(value, 12);
    return null;
  }
}