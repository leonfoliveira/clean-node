import { AuthenticationModel } from '@/domain/models';

export interface Authentication {
  auth: (params: AuthenticationDTO) => Promise<AuthenticationModel>;
}

export type AuthenticationDTO = {
  email: string;
  password: string;
};
