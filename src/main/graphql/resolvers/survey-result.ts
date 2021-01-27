import { adaptResolver } from '@/main/adapters';
import {
  makeLoadSurveyResultController,
  makeSaveSurveyResultController,
} from '@/main/factories/controllers';

export default {
  Query: {
    surveyResult: async (parent: any, args: any): Promise<any> =>
      adaptResolver(makeLoadSurveyResultController(), args),
  },

  Mutation: {
    saveSurveyResult: async (parent: any, args: any, context: any): Promise<any> =>
      adaptResolver(makeSaveSurveyResultController(), args, context),
  },
};
