import 'dotenv/config';
import 'reflect-metadata';
import fs from 'fs';
import path from 'path';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import './utils/response/customSuccess';
import { errorHandler } from './middleware/errorHandler';
import { dbCreateConnection } from './orm/dbCreateConnection';

export const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

try {
  const accessLogStream = fs.createWriteStream(path.join(__dirname, '../log/access.log'), {
    flags: 'a',
  });
  app.use(morgan('combined', { stream: accessLogStream }));
} catch (err) {
  console.log(err);
}
app.use(morgan('combined'));

const port = process.env.PORT || 4000;

(async () => {
  await dbCreateConnection();
  console.log('✅ DB connection established, now loading routes...');

  // 👇 Імпортуємо маршрути лише після створення з’єднання
  const parentRoutes = (await import('./routes/parent.routes')).default;
  const studentRoutes = (await import('./routes/student.routes')).default;

  app.use('/parents', parentRoutes);
  app.use('/students', studentRoutes);

  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
})();
