import { mockHttpResponse } from '@/presentation/mocks';
import { Controller, HttpResponse } from '@/presentation/protocols';

export class ControllerStub implements Controller {
  response = mockHttpResponse();

  async handle(): Promise<HttpResponse> {
    return this.response;
  }
}
