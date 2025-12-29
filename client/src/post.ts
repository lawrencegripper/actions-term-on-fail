// Post-job hook - runs terminal client on failure
import * as core from '@actions/core';
import { spawn, ChildProcess } from 'child_process';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ExecError extends Error {
  killed?: boolean;
}

interface ExecOptions {
  env?: NodeJS.ProcessEnv;
  timeout?: number;
}

function exec(cmd: string, args: string[], options: ExecOptions = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc: ChildProcess = spawn(cmd, args, {
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
        const error: ExecError = new Error('Process killed due to timeout');
        error.killed = true;
        reject(error);
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

async function run(): Promise<void> {
  const serverUrl = core.getState('server-url');
  const timeout = parseInt(core.getState('timeout') || '30', 10);
  const otpSecret = core.getState('otp-secret');

  if (!serverUrl) {
    core.warning('No server URL configured, skipping terminal');
    return;
  }

  if (!otpSecret) {
    core.warning('No OTP secret configured, skipping terminal');
    return;
  }

  console.log('🖥️  Workflow failed - starting terminal session...');
  console.log(`Server: ${serverUrl}`);
  console.log(`Timeout: ${timeout} minutes`);

  // Run the pre-built client (index.js in same directory)
  const clientDist = path.join(__dirname, 'index.js');

  try {
    const timeoutMs = timeout * 60 * 1000;
    await exec('node', [clientDist], {
      env: {
        ...process.env,
        SERVER_URL: serverUrl,
        OTP_SECRET: otpSecret,
      },
      timeout: timeoutMs,
    });
  } catch (error) {
    const execError = error as ExecError;
    if (execError.killed) {
      console.log('Terminal session ended (timeout)');
    } else {
      core.warning(`Terminal error: ${execError.message}`);
    }
  }
}

run();
