const { compressImage } = require('../../utils/sharp');

module.exports = async (job) => {
  const { file, fileName } = job.data;
  await compressImage(file.buffer, fileName);
};
