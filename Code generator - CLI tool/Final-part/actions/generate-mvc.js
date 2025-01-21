const { promptInput } = require('../utils/prompt');
const config = require('../config/config');
const { clone } = require('../utils/git');
const { generateFile } = require('../utils/file');
const { generateEnvContent } = require('../utils/content');
const { runCommand } = require('../utils/runner');
const path = require('path');
const fs = require('fs');
module.exports = async () => {
  const answer = await promptInput([
    {
      name: 'projectName',
      message: 'What is the project name?',
      type: 'input',
    },
  ]);
  const projectPath = path.join(process.cwd(), answer.projectName);
  if (fs.existsSync(projectPath)) {
    console.log(`${answer.projectName} already exists`);
    return;
  }
  try {
    //cloning from the git repository
    await clone(config.repoUrl, answer.projectName);
    //installing dependencies
    const npmCommand = process.platform == 'win32' ? 'npm.cmd' : 'npm';
    await runCommand(npmCommand, ['install'], { cwd: projectPath });
    //generating .env file
    const filePath = path.join(projectPath, '.env');
    await generateFile(filePath, generateEnvContent(answer.projectName));
  } catch (error) {
    console.log(error);
  }
};
