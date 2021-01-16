import { Encrypter } from '@/data/protocols';
import { BcryptEncrypter } from '@/infra/criptography';

export const makeEncrypter = (): Encrypter => new BcryptEncrypter(12);
