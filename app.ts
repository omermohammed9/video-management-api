import express from 'express';
import videoRoutes from './routes/videoRoutes';

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Routes
app.use('/api/videos', videoRoutes);

export default app;
