import { Validator } from '@/data/interfaces';
import { InvalidParamError } from '@/presentation/errors';
import { HttpResponseFactory } from '@/presentation/helpers';
import { Controller } from '@/presentation/interfaces';

export class ValidationControllerProxy implements Controller {
  constructor(private readonly validator: Validator, private readonly controller: Controller) {}

  async handle(request: Record<string, any>): Promise<any> {
    try {
      const error = this.validator.validate(request);
      if (error) {
        return HttpResponseFactory.makeBadRequest(new InvalidParamError(error.message));
      }

      return this.controller.handle(request);
    } catch (error) {
      return HttpResponseFactory.makeInternalServerError(error);
    }
  }
}
