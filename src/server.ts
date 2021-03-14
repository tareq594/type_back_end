import 'reflect-metadata';
import 'dotenv/config';
import App from './app';
import AuthRoute from './routes/auth.route';
import IndexRoute from './routes/index.route';
import UsersRoute from './routes/users.route';
import validateEnv from './utils/validateEnv';
import { createConnection } from 'typeorm';
import { dbConnection } from './database';
import { logger } from './utils/logger';

validateEnv();
// connect to typeorm
createConnection(dbConnection)
  .then(() => {
    logger.info('🟢 The database is connected.');
    const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute()]);
    app.listen();
  })
  .catch((error: Error) => {
    logger.error(`🔴 Unable to connect to the database: ${error}.`);
  });
