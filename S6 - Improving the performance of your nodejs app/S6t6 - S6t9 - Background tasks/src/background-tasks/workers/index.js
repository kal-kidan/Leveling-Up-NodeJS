const { Worker } = require('bullmq');
const path = require('path');
const config = require('../../config/config');
const logger = require('../../config/logger');

const start = async () => {
  const processorPath = path.join(__dirname, 'image-processor.js');
  const ImageProcessorWorker = new Worker('ImageProcessor', processorPath, {
    connection: {
      host: config.redis.host,
      port: config.redis.port,
    },
    removeOnComplete: true,
    concurrency: 3,
  });

  ImageProcessorWorker.on('completed', (job) =>
    logger.info(`job ${job.id} completed`),
  );
};

module.exports = { start };
