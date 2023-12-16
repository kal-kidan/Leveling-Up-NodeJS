const redisClient = require('../../config/redis');
const logger = require('../../config/logger');

module.exports = async (req, res, next) => {
  try {
    const key = 'recent-blogs';
    const cachedBlogs = await redisClient.get(key);
    if (cachedBlogs) {
      res.json(JSON.parse(cachedBlogs));
    } else {
      next();
    }
  } catch (error) {
    logger.error(error);
    next();
  }
};
