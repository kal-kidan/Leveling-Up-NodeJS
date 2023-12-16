const { Queue } = require('bullmq');
const config = require('../../config/config');

const CacheProcessorQueue = new Queue('Cache', {
  connection: {
    host: config.redis.host,
    port: config.redis.port,
  },
});

module.exports = CacheProcessorQueue;
