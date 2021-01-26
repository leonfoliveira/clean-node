import { SurveyModel } from '@/domain/models';

export interface AddSurveyRepository {
  add: (survey: AddSurveyRepository.Params) => Promise<SurveyModel>;
}

export namespace AddSurveyRepository {
  export type Params = {
    question: string;
    answers: {
      image?: string;
      answer: string;
    }[];
    date: Date;
    didAnswer?: boolean;
  };
}
