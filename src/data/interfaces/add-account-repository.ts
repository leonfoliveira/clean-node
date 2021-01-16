import { AccountModel } from '@/domain/models';
import { AddAccountDTO } from '@/domain/usecases';

export interface AddAccountRepository {
  add: (params: AddAccountRepositoryParams) => Promise<AccountModel>;
}

export type AddAccountRepositoryParams = AddAccountDTO;
