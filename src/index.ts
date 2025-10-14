import 'dotenv/config';
import 'reflect-metadata';
import fs from 'fs';
import path from 'path';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { dbCreateConnection } from './orm/dbCreateConnection';

const app = express();

// --- Middleware setup ---
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// --- Logging setup ---
try {
  const logDir = path.join(__dirname, '../log');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const accessLogStream = fs.createWriteStream(path.join(logDir, 'access.log'), { flags: 'a' });
  app.use(morgan('combined', { stream: accessLogStream }));
} catch (err) {
  console.error('Failed to create log stream:', err);
}

// Also log to console
app.use(morgan('dev'));

const port = process.env.PORT || 4000;

// --- Start server ---
(async () => {
  try {
    await dbCreateConnection();
    console.log('✅ Database connection established.');

    // Import routes only after DB connection is ready
    const parentRoutes = (await import('./routes/parent.routes')).parentRoutes;
    const studentRoutes = (await import('./routes/student.routes')).studentRoutes;

    // Register routes
    app.use('/parents', parentRoutes);
    app.use('/students', studentRoutes);

    // Default route
    app.get('/', (_req, res) => res.send('🚀 API is running'));

    // Global error handler
    app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
      console.error('❌ Error:', err);

      // Detect TypeORM duplicate key, validation, etc.
      if (err.code === '23505') {
        return res.status(400).json({ message: 'Duplicate value violates unique constraint' });
      }

      // If the error has a message, show it; otherwise fallback
      res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
      });
      return null;
    });

    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
})();
