import { Controller, HttpResponse } from '@/presentation/protocols';

export class ControllerStub implements Controller {
  async handle(): Promise<HttpResponse> {
    return null;
  }
}
