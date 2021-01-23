import badRequestComponent from './components/bad-request.json';
import internalServerErrorComponent from './components/internal-server-error.json';
import notFoundComponent from './components/not-found.json';
import unauthorizedComponent from './components/unauthorized.json';
import loginPath from './paths/login-path.json';
import authorizationSchema from './schemas/authorization-schema.json';
import errorSchema from './schemas/error-schema.json';

export const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: 'Fordevs API',
    description: 'Fordevs, surveys for programmers API',
    version: '1.0.0',
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
  ],
  components: {
    'bad-request': badRequestComponent,
    'internal-server-error': internalServerErrorComponent,
    'not-found': notFoundComponent,
    unauthorized: unauthorizedComponent,
  },
  paths: {
    '/login': loginPath,
  },
  schemas: {
    error: errorSchema,
    authorization: authorizationSchema,
  },
};
