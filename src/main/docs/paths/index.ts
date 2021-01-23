import loginPath from './login-path.json';
import signupPath from './signup-path.json';
import surveyPath from './survey-path.json';
import surveyResultPath from './survey-result.json';

export const paths = {
  '/login': loginPath,
  '/signup': signupPath,
  '/survey': surveyPath,
  '/survey/{surveyId}/result': surveyResultPath,
};
