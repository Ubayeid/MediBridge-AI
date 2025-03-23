import mongoose from 'mongoose';
import { config } from 'dotenv';
import app from './app';
import { logger } from './utils/logger';

// Load environment variables
config();

// Connect to MongoDB
const DB = process.env.DATABASE_URL || 'mongodb://localhost:27017/medibridge';

mongoose.connect(DB)
  .then(() => logger.info('DB connection successful!'))
  .catch((err) => {
    logger.error('DB connection error:', err);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  process.exit(1);
});

// Start server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

// Handle SIGTERM signal
process.on('SIGTERM', () => {
  logger.info('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    logger.info('💥 Process terminated!');
  });
}); 