import { TokenGenerator } from '@/data/interfaces';
import { JwtAdapter } from '@/infra/criptography';
import { env } from '@/main/config/env';

export const makeTokenGenerator = (): TokenGenerator => new JwtAdapter(env.jwtSecret);
