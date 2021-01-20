import { AccountModel } from '@/domain/models';

export interface LoadAccountByToken {
  load: (params: LoadAccountByTokenDTO) => Promise<AccountModel>;
}

export type LoadAccountByTokenDTO = {
  accessToken: string;
  role?: string;
};
