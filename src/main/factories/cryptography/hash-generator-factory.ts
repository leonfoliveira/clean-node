import { HashGenerator } from '@/data/interfaces/criptography';
import { BcryptAdapter } from '@/infra/criptography';

export const makeHashGenerator = (): HashGenerator => new BcryptAdapter(12);
