import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import path from 'path';
import { randomUUID } from 'crypto';
import { ENV } from './config/env';
import apiRouter from './routes/api';
import { errorHandler, notFoundHandler } from './middlewares/error';

export function createApp() {
  const app = express();

  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.use(
    cors({
      origin: ENV.FRONT_URL,
      credentials: true,
    })
  );
  app.use(compression());
  app.use(express.json({ limit: '1mb' }));
  app.use(cookieParser());
  app.use(morgan('combined'));

  app.use((req, _res, next) => {
    req.requestId = randomUUID();
    next();
  });

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: ENV.NODE_ENV === 'production' ? 1000 : 5000,
  });
  app.use('/api/', limiter);

  const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 50,
    message: { error: { code: 'RATE_LIMIT', message: 'Trop de tentatives' } },
  });
  app.use('/api/v1/auth/login', loginLimiter);

  app.use('/uploads', express.static(path.resolve(ENV.UPLOAD_DIR)));
  app.use('/api/v1', apiRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
