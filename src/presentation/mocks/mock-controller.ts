import { Controller, HttpResponse } from '@/presentation/interfaces';
import { mockHttpResponse } from '@/presentation/mocks';

export class ControllerStub implements Controller {
  response = mockHttpResponse();

  async handle(): Promise<HttpResponse> {
    return this.response;
  }
}
