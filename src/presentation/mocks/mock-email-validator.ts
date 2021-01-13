import { EmailValidator } from '@/presentation/protocols';

export class EmailValidatorStub implements EmailValidator {
  isValid(): boolean {
    return true;
  }
}
