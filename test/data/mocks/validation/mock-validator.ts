import { Validator } from '@/data/interfaces';

export class ValidatorStub implements Validator {
  validate(): Error {
    return null;
  }
}
