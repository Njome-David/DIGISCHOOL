import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';
import { ENV } from '../config/env';

const uploadPath = path.resolve(ENV.UPLOAD_DIR);
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadPath),
  filename: (_req, file, cb) => {
    cb(null, `${randomUUID()}${path.extname(file.originalname)}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ok = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ].includes(file.mimetype);
    cb(null, ok);
  },
});
