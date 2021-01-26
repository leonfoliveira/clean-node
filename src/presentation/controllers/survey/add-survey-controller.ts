import { AddSurvey } from '@/domain/usecases';
import { HttpResponseFactory } from '@/presentation/helpers';
import { Controller, HttpResponse } from '@/presentation/interfaces';

export class AddSurveyController implements Controller<AddSurveyController.Request, HttpResponse> {
  constructor(private readonly addSurvey: AddSurvey) {}

  async handle(request: AddSurveyController.Request): Promise<HttpResponse> {
    try {
      const { question, answers } = request;
      await this.addSurvey.add({ question, answers, date: new Date() });

      return HttpResponseFactory.makeCreated();
    } catch (error) {
      return HttpResponseFactory.makeInternalServerError(error);
    }
  }
}

export namespace AddSurveyController {
  export type Request = {
    question: string;
    answers: {
      image?: string;
      answer: string;
    }[];
  };
}
