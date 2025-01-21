const inquirer = require('inquirer');
const promptInput = async (questions) => {
  const prompt = inquirer.createPromptModule();
  return await prompt(questions);
};

module.exports = {
  promptInput,
};
