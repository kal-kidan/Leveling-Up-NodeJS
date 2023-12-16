const ImageProcessorQueue = require('./queues/image-processor');
const CacheProcessorQueue = require('./queues/cache-processor');
const { startImageProcessor } = require('./workers');
const { startCacheProcessor } = require('./workers');

module.exports = {
  ImageProcessor: {
    Queue: ImageProcessorQueue,
    startWorker: startImageProcessor,
  },
  CacheProcessor: {
    Queue: CacheProcessorQueue,
    startWorker: startCacheProcessor,
  },
};
