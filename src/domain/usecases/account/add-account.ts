import { AccountModel } from '@/domain/models/account-model';

export interface AddAccount {
  add(params: AddAccountDTO): Promise<AccountModel>;
}

export type AddAccountDTO = {
  name: string;
  email: string;
  password: string;
};
