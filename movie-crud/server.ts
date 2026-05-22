import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { initializeDatabase } from './configs/database';
import indexRoutes from './src/routes/index.routes';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { responseMiddleware } from './middlewares/response.middleware';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || (process.env.NODE_ENV === 'production' ? false : 'http://localhost:5173'),
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(responseMiddleware);
app.use('/api', indexRoutes);
app.use(errorHandler);

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });

export default app;
