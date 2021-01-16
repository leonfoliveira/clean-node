import { makeAddAccount } from '@/main/factories/usecases';
import { makeEmailValidatorAdapter } from '@/main/factories/utils';
import { SignUpController } from '@/presentation/controllers';

export const makeSignUpController = (): SignUpController =>
  new SignUpController(makeEmailValidatorAdapter(), makeAddAccount());
