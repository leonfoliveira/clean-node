import { HashGenerator } from '@/data/interfaces/criptography';
import { BcryptHashGenerator } from '@/infra/criptography';

export const makeHashGenerator = (): HashGenerator => new BcryptHashGenerator(12);
