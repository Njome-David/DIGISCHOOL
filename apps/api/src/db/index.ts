import { Sequelize } from 'sequelize';
import { ENV } from '../config/env';

export const sequelize = new Sequelize(ENV.DB_NAME, ENV.DB_USER, ENV.DB_PASSWORD, {
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  dialect: 'mysql',
  timezone: '+01:00',
  logging: ENV.NODE_ENV === 'development' ? console.log : false,
  pool: { max: 10, min: 2, acquire: 30000, idle: 10000 },
  dialectOptions: { connectTimeout: 10000 },
});
