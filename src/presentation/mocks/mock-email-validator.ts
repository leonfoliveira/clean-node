import { EmailValidator } from '@/presentation/interfaces';

export class EmailValidatorStub implements EmailValidator {
  isValid(): boolean {
    return true;
  }
}
