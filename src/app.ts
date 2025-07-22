import express from 'express';

import dotenv from 'dotenv';

import { setupSwagger } from './docs/swagger';

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

import { errorHandler } from './middlewares/errorHandler';
import { authMiddleware } from './middlewares/authMiddleware';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes);

setupSwagger(app);

app.use(errorHandler);

export default app;
