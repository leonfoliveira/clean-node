import { HashGenerator } from '@/data/interfaces';
import { BcryptAdapter } from '@/infra';

export const makeHashGenerator = (): HashGenerator => new BcryptAdapter(12);
