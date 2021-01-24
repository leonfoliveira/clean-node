export type SurveyModel = {
  id: string;
  question: string;
  answers: {
    image?: string;
    answer: string;
  }[];
  date: Date;
};

export type SurveyResultModel = {
  id: string;
  question: string;
  answers: {
    image?: string;
    answer: string;
    count: number;
    percent: number;
    isCurrentAccountAnswerCount: boolean;
  }[];
  date: Date;
};
