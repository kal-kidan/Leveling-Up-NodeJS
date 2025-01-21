const simpleGit = require('simple-git');
const clone = async (repoUrl, projectName) => {
  const git = simpleGit();
  console.log(`Cloning from ${repoUrl}...`);
  await git.clone(repoUrl, projectName);
  console.log('Cloned successfully...');
};

module.exports = { clone };
