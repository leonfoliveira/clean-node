import { AuthorizationModel } from '@/domain/models';

export interface Authentication {
  auth: (params: AuthenticationDTO) => Promise<AuthorizationModel>;
}

export type AuthenticationDTO = {
  email: string;
  password: string;
};
