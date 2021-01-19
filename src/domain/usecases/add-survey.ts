import { SurveyModel } from '@/domain/models';

export interface AddSurvey {
  add: (params: AddSurveyDTO) => Promise<SurveyModel>;
}

export type AddSurveyDTO = {
  question: string;
  answers: {
    image?: string;
    answer: string;
  }[];
};
