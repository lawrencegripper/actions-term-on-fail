// Post-job hook - runs terminal client on failure
const core = require('@actions/core');
const { spawn } = require('child_process');
const path = require('path');

async function run() {
  const serverUrl = core.getState('server-url');
  const timeout = parseInt(core.getState('timeout') || '30', 10);

  if (!serverUrl) {
    core.warning('No server URL configured, skipping terminal');
    return;
  }

  console.log('🖥️  Workflow failed - starting terminal session...');
  console.log(`Server: ${serverUrl}`);
  console.log(`Timeout: ${timeout} minutes`);

  // Run the pre-built client
  const clientDist = path.join(__dirname, '..', 'client', 'dist', 'index.js');
  
  try {
    const timeoutMs = timeout * 60 * 1000;
    await exec('node', [clientDist], {
      env: {
        ...process.env,
        SERVER_URL: serverUrl,
      },
      timeout: timeoutMs,
    });
  } catch (error) {
    if (error.killed) {
      console.log('Terminal session ended (timeout)');
    } else {
      core.warning(`Terminal error: ${error.message}`);
    }
  }
}

function exec(cmd, args, options = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, {
      stdio: 'inherit',
      ...options,
    });

    let killed = false;
    const timeoutId = options.timeout
      ? setTimeout(() => {
          killed = true;
          proc.kill('SIGTERM');
        }, options.timeout)
      : null;

    proc.on('close', (code) => {
      if (timeoutId) clearTimeout(timeoutId);
      if (killed) {
        reject({ killed: true });
      } else if (code !== 0) {
        reject(new Error(`Process exited with code ${code}`));
      } else {
        resolve();
      }
    });

    proc.on('error', (err) => {
      if (timeoutId) clearTimeout(timeoutId);
      reject(err);
    });
  });
}

run();
