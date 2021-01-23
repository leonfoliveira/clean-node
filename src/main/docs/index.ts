import badRequestComponent from './components/bad-request.json';
import conflictComponent from './components/conflict.json';
import forbiddenComponent from './components/forbidden.json';
import internalServerErrorComponent from './components/internal-server-error.json';
import notFoundComponent from './components/not-found.json';
import unauthorizedComponent from './components/unauthorized.json';
import loginPath from './paths/login-path.json';
import signupPath from './paths/signup-path.json';
import surveyPath from './paths/survey-path.json';
import apiKeyAuthSchema from './schemas/api-key-auth-schema.json';
import authorizationSchema from './schemas/authorization-schema.json';
import errorSchema from './schemas/error-schema.json';
import surveySchema from './schemas/survey-schema.json';

export const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: 'Fordevs API',
    description: 'Fordevs, surveys for programmers API',
    version: '1.0.0',
  },
  license: {
    name: 'GPL-3.0',
    url: 'https://www.gnu.org/licenses/gpl-3.0.en.html',
  },
  servers: [
    {
      url: '/api',
    },
  ],
  tags: [
    {
      name: 'Login',
    },
    {
      name: 'Survey',
    },
  ],
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema,
    },
    'bad-request': badRequestComponent,
    conflict: conflictComponent,
    forbidden: forbiddenComponent,
    'internal-server-error': internalServerErrorComponent,
    'not-found': notFoundComponent,
    unauthorized: unauthorizedComponent,
  },
  paths: {
    '/login': loginPath,
    '/signup': signupPath,
    '/survey': surveyPath,
  },
  schemas: {
    error: errorSchema,
    authorization: authorizationSchema,
    survey: surveySchema,
  },
};
