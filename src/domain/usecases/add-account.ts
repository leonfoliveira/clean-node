import { AccountModel } from '@/domain/models/account-model';

export interface AddAccount {
  add(account: AddAccount.Params): AccountModel;
}

export namespace AddAccount {
  export type Params = {
    name: string;
    email: string;
    password: string;
  };
}
