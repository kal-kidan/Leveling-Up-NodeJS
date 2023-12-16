const sharp = require('sharp');

const compressImage = async (input, fileName) => {
  const outputPath = `${__dirname}/../../uploads/${fileName}`;
  sharp(Buffer.from(input))
    .resize(600)
    .webp({ quality: 80 })
    .toFile(outputPath);
};

module.exports = { compressImage };
