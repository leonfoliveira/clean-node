import { HashComparer } from '@/data/interfaces';
import { BcryptAdapter } from '@/infra';

export const makeHashComparer = (): HashComparer => new BcryptAdapter(12);
