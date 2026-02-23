import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import toolRoutes from './routes/tools.js';
import logger from './utils/logger.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Logging Middleware for requests (dev only)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    logger.debug(`${req.method} ${req.url}`);
    next();
  });
}

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tools', toolRoutes);

// MongoDB connection
const mongoURI = 'mongodb://saiiimiiir:DJ%24m3b310@127.0.0.1:27017/annuaire?authSource=admin';
mongoose.connect(mongoURI)
  .then(() => logger.info('MongoDB connected'))
  .catch(err => logger.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Annuaire IA Backend running');
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
