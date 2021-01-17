import { LogRepository } from '@/data/interfaces/db';
import { Controller, HttpRequest, HttpResponse } from '@/presentation/interfaces';

export class LogControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly logRepository: LogRepository,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest);
    if (httpResponse.statusCode === 500) {
      await this.logRepository.logError(httpResponse.body.stack);
    }
    return httpResponse;
  }
}
