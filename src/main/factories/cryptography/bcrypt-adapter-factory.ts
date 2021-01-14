import { BcryptAdapter } from '@/infra/criptography';

export const makeBcryptAdapter = (): BcryptAdapter => new BcryptAdapter(12);
