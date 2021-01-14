import { AccountModel } from '@/domain/models';
import { AddAccountDTO } from '@/domain/usecases';

export interface AddAccountRepository {
  add: (account: AddAccountDTO) => Promise<AccountModel>;
}
