import { AccountModel, AuthorizationModel } from '@/domain/models';

export interface Authentication {
  auth: (params: AuthenticationDTO) => Promise<AuthorizationModel>;
}

export type AuthenticationDTO = Pick<AccountModel, 'email' | 'password'>;
