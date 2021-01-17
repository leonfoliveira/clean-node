import { Encrypter } from '@/data/interfaces/criptography';
import { BcryptEncrypter } from '@/infra/criptography';

export const makeEncrypter = (): Encrypter => new BcryptEncrypter(12);
