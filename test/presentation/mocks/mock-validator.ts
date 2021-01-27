import { Validator } from '@/presentation/interfaces';

export class ValidatorStub implements Validator {
  validate(): Error {
    return null;
  }
}
