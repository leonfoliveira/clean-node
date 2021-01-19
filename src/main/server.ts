/* eslint-disable no-console */
import 'module-alias/register';
import { MongoHelper } from '@/infra';
import { env } from '@/main/config/env';

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const { app } = await import('./config/app');
    return app.listen(env.port, () =>
      console.log(`Server running at http://localhost:${env.port}`),
    );
  })
  .catch(console.error);
/* eslint-enable no-console */
