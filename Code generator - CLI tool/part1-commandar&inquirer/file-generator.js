const { program } = require('commander');
const inquirer = require('inquirer');
const fs = require('fs');
program.version('1.0.0').description('A simple cli program.');

program.command('create <filename>').action(async (filename) => {
  const prompt = inquirer.createPromptModule();
  const answer = await prompt([
    {
      name: 'fileContent',
      message: 'Write the file content here.',
      type: 'input',
    },
  ]);
  fs.promises.writeFile(filename, answer.fileContent);
  console.log(`Your file is created successfully.`);
});

program.parse(process.argv);
