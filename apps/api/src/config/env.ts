import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '4000', 10),
  DB_HOST: process.env.DB_HOST || '163.123.183.89',
  DB_PORT: parseInt(process.env.DB_PORT || '17705', 10),
  DB_NAME: process.env.DB_NAME || 'ecole2026',
  DB_USER: process.env.DB_USER || 'ecole',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'dev_access_secret_minimum_32_chars_xx',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret_minimum_32_chars_yy',
  JWT_ACCESS_TTL: process.env.JWT_ACCESS_TTL || '15m',
  JWT_REFRESH_TTL: process.env.JWT_REFRESH_TTL || '7d',
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS || '12', 10),
  UPLOAD_DIR: process.env.UPLOAD_DIR || './uploads',
  FRONT_URL: process.env.FRONT_URL || 'http://localhost:5173',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};
