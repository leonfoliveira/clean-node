export interface SaveSurveyResultRepository {
  save: (surveyResult: SaveSurveyResultRepository.Params) => Promise<void>;
}

export namespace SaveSurveyResultRepository {
  export type Params = {
    surveyId: string;
    accountId: string;
    answer: string;
    date: Date;
  };
}
