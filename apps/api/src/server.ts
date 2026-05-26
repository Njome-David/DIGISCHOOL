import { createApp } from './app';
import { sequelize } from './db';
import { syncAppTables } from './db/models';
import { ENV } from './config/env';

async function bootstrap() {
  await sequelize.authenticate();
  console.log('? MySQL connected');
  await syncAppTables();
  console.log('? App tables synced');

  const app = createApp();
  app.listen(ENV.PORT, () => {
    console.log(`? API http://localhost:${ENV.PORT}/api/v1`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start:', err);
  process.exit(1);
});
