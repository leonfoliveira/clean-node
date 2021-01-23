import pjson from '@/../package.json';

export const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: 'Fordevs API',
    description: 'Fordevs, surveys for programmers API',
    version: pjson.version,
  },
};
