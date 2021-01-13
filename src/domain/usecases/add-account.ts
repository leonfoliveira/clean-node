import { AccountModel } from '@/domain/models/account-model';

export interface AddAccount {
  add(params: AddAccount.Params): Promise<AccountModel>;
}

export namespace AddAccount {
  export type Params = {
    name: string;
    email: string;
    password: string;
  };
}
