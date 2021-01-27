import { Validator } from '@/data/interfaces';
import { InvalidParamError } from '@/presentation/errors';
import { HttpResponseFactory } from '@/presentation/helpers';
import { Controller } from '@/presentation/interfaces';

export class ValidationControllerProxy implements Controller {
  constructor(private readonly validator: Validator) {}

  async handle(request: Record<string, any>): Promise<any> {
    const error = this.validator.validate(request);
    if (error) {
      return HttpResponseFactory.makeBadRequest(new InvalidParamError(error.message));
    }
    return null;
  }
}
