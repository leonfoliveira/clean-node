import { HashComparer } from '@/data/interfaces/criptography';
import { BcryptAdapter } from '@/infra/criptography';

export const makeHashComparer = (): HashComparer => new BcryptAdapter(12);
