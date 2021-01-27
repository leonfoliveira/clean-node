import { Validator } from '@/data/interfaces';
import { Controller } from '@/presentation/interfaces';

export class ValidationControllerProxy implements Controller {
  constructor(private readonly validator: Validator) {}

  async handle(request: Record<string, any>): Promise<any> {
    this.validator.validate(request);
    return null;
  }
}
