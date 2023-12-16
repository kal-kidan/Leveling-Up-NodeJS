const ImageProcessorQueue = require('./queues/image-processor');

module.exports = {
  ImageProcessor: {
    Queue: ImageProcessorQueue,
  },
};
