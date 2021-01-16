import { Validation } from '@/presentation/interfaces';

export class ValidationStub implements Validation {
  validate(input: Record<string, any>): Error {
    return null;
  }
}
