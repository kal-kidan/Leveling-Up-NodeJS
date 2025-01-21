const {
  getSchematicDir,
  getSchematicContentGenerator,
} = require('../utils/schematic');
const {
  generateExportStatement,
  generateModelContent,
} = require('../utils/content');
const { generateFile } = require('../utils/file');
const { promptInput } = require('../utils/prompt');
const path = require('path');
const fs = require('fs');
const generateSchematic = async (schematicName) => {
  const answer = await promptInput([
    {
      name: 'fileName',
      message: `What is the ${schematicName} filename?`,
      type: 'input',
    },
    {
      name: 'projectName',
      message: `Enter the project.`,
      type: 'input',
    },
  ]);

  await generateSchematicFile(
    answer.projectName,
    schematicName,
    answer.fileName,
    { fileName: answer.fileName }
  );
};
const createSchematic = async (schematicName) => {
  const answer = await promptInput([
    {
      name: 'name',
      message: `What is the ${schematicName} name?`,
      type: 'input',
    },
    {
      name: 'projectName',
      message: `Enter the project.`,
      type: 'input',
    },
    {
      name: 'fields',
      message: `Enter the list of fields separating with comma.`,
      type: 'input',
    },
    {
      name: 'types',
      message: `Enter the list of types separating with comma.`,
      type: 'input',
    },
  ]);
  const fields = answer.fields.split(',');
  const types = answer.types.split(',');
  const schematics = [
    {
      name: 'model',
      argument: {
        fields,
        types,
        modelName: answer.name,
      },
    },
    {
      name: 'validation',
      argument: {
        fields,
        types,
        validationName: answer.name,
      },
    },
    {
      name: 'controller',
      argument: {
        fileName: answer.name,
      },
    },
    {
      name: 'route',
      argument: {
        fileName: answer.name,
      },
    },
    {
      name: 'service',
      argument: {
        fileName: answer.name,
      },
    },
  ];
  schematics.forEach(async (schematic) => {
    await generateSchematicFile(
      answer.projectName,
      schematic.name,
      answer.name,
      schematic.argument
    );
  });
};

const generateSchematicFile = async (
  projectName,
  schematicName,
  fileName,
  contentGenArg
) => {
  const projectPath = path.join(
    process.cwd(),
    projectName,
    getSchematicDir(schematicName),
    `${fileName}.${schematicName}.js`
  );
  if (fs.existsSync(projectPath)) {
    console.log(`${fileName} already exists`);
    return;
  }
  const contentGenerator = getSchematicContentGenerator(schematicName);
  await generateFile(projectPath, contentGenerator(contentGenArg));
  const indexPath = path.join(
    process.cwd(),
    projectName,
    getSchematicDir(schematicName),
    'index.js'
  );
  if (schematicName !== 'route') {
    await fs.promises.appendFile(
      indexPath,
      generateExportStatement(fileName, schematicName)
    );
  }
};

module.exports = { generateSchematic, createSchematic };
