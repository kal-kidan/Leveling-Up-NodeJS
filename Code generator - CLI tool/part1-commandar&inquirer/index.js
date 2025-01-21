const { program } = require('commander');
const inquirer = require('inquirer');

program.version('1.0.0').description('A simple CLI program.');

program.command('start').action(async () => {
  const prompt = inquirer.createPromptModule();
  const answer = await prompt([
    { name: 'username', message: 'What is your name?', type: 'input' },
    {
      name: 'experience',
      message: 'How many years of experience do you have?',
      type: 'list',
      choices: ['1-3', '3-5', '5-10', '>10'],
    },
  ]);
  console.log(
    `Hi ${answer.username} you have ${answer.experience} years of experience.`
  );
});

program.parse(process.argv);
const { program } = require('commander');
const inquirer = require('inquirer');

program.version('1.0.0').description('A simple CLI program.');

program.command('start').action(async () => {
  const prompt = inquirer.createPromptModule();
  const answer = await prompt([
    { name: 'username', message: 'What is your name?', type: 'input' },
    {
      name: 'experience',
      message: 'How many years of experience do you have?',
      type: 'list',
      choices: ['1-3', '3-5', '5-10', '>10'],
    },
  ]);
  console.log(
    `Hi ${answer.username} you have ${answer.experience} years of experience.`
  );
});

program.parse(process.argv);
