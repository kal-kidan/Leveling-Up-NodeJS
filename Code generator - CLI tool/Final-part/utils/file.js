const fs = require('fs');
const path = require('path');
const generateFile = async (filePath, content) => {
  const basename = path.basename(filePath);
  console.log(`Generating ${basename} file...`);
  await fs.promises.writeFile(filePath, content);
  console.log(`${basename} file generated successfully...`);
};

module.exports = { generateFile };
