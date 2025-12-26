// Main entry - just saves inputs for post hook
const core = require('@actions/core');

try {
  // Save inputs for the post hook
  core.saveState('server-url', core.getInput('server-url'));
  core.saveState('timeout', core.getInput('timeout') || '30');
  console.log('Terminal on Fail action registered. Will start terminal in post-job hook if workflow fails.');
} catch (error) {
  core.setFailed(error.message);
}
