import { AccountModel } from '@/domain/models';

export interface AddAccountRepository {
  add: (account: AddAccountRepository.Params) => Promise<AccountModel>;
}

export namespace AddAccountRepository {
  export type Params = {
    name: string;
    email: string;
    password: string;
  };
}
