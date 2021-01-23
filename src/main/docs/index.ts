import { components } from './components';
import { paths } from './paths';
import { schemas } from './schemas';

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
  servers: [{ url: '/api' }],
  tags: [{ name: 'Login' }, { name: 'Survey' }],
  components,
  paths,
  schemas,
};
