import { LogErrorRepository } from '@/data/interfaces';
import { Controller, HttpResponse } from '@/presentation/interfaces';

export class LogControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository,
  ) {}

  async handle(request: Record<string, any>): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(request);
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack);
    }
    return httpResponse;
  }
}
