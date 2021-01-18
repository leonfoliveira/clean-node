import { TokenGenerator } from '@/data/interfaces/criptography';
import { JwtAdapter } from '@/infra/criptography';
import { env } from '@/main/config/env';

export const makeTokenGenerator = (): TokenGenerator => new JwtAdapter(env.jwtSecret);
