const redis = require('redis');
const logger = require('./logger');

const client = redis.createClient();

client.on('error', (err) => logger.error(err));

module.exports = client;
