import { ProtectedAccountModel } from '@/domain/models/account-model';

export interface AddAccount {
  add(params: AddAccountDTO): Promise<ProtectedAccountModel>;
}

export type AddAccountDTO = {
  name: string;
  email: string;
  password: string;
};
