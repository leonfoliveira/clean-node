import { Encrypter } from '../protocols';

export class EncrypterStub implements Encrypter {
  async encrypt(): Promise<string> {
    return null;
  }
}
