import { TokenDecoder } from '@/data/interfaces';
import { JwtAdapter } from '@/infra';
import { env } from '@/main/config/env';

export const makeTokenDecoder = (): TokenDecoder => new JwtAdapter(env.jwtSecret);
