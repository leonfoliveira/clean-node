import authorizationSchema from './authorization-schema.json';
import errorSchema from './error-schema.json';
import surveyResultSchema from './survey-result-schema.json';
import surveySchema from './survey-schema.json';

export const schemas = {
  error: errorSchema,
  authorization: authorizationSchema,
  survey: surveySchema,
  'survey-result': surveyResultSchema,
};
