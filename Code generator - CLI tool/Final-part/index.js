const { program } = require('commander');

const generateMvc = require('./actions/generate-mvc');
const {
  generateSchematic,
  createSchematic,
} = require('./actions/generate-schematic');
program
  .version('1.0.0')
  .description('A CLI tool to generate an MVC boilerplate code.');

program
  .command('generate-mvc')
  .description('Clone an mvc code and initialize git')
  .action(generateMvc);

program
  .command('generate <schematicName>')
  .description(
    'Generate different schematics such as controller, route, middleware and service.'
  )
  .action(generateSchematic);
program
  .command('create <schematicName>')
  .description(
    'Generate different schematics such as module, models and validations.'
  )
  .action(createSchematic);

program.parse(process.argv);
