// Post-job hook - runs terminal client on failure
import * as core from '@actions/core';
import { spawn, ChildProcess, execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

// __dirname is available natively in CommonJS

interface ExecOptions {
  env?: NodeJS.ProcessEnv;
}

function exec(cmd: string, args: string[], options: ExecOptions = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc: ChildProcess = spawn(cmd, args, {
      stdio: 'inherit',
      ...options,
    });

    proc.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Process exited with code ${code}`));
      } else {
        resolve();
      }
    });

    proc.on('error', (err) => {
      reject(err);
    });
  });
}

async function ensureNativeModules(): Promise<void> {
  // Find the client directory (parent of dist)
  const clientDir = path.resolve(__dirname, '..');
  const nodeModulesDir = path.join(clientDir, 'node_modules');
  
  // Check if native modules exist
  const nodePtyPath = path.join(nodeModulesDir, 'node-pty');
  const nodeDataChannelPath = path.join(nodeModulesDir, 'node-datachannel');
  
  if (fs.existsSync(nodePtyPath) && fs.existsSync(nodeDataChannelPath)) {
    console.log('Native modules already installed');
    return;
  }
  
  console.log('Installing native modules (node-pty, node-datachannel)...');
  
  try {
    execSync('npm install --no-save node-pty node-datachannel', {
      cwd: clientDir,
      stdio: 'inherit',
    });
    console.log('Native modules installed successfully');
  } catch (error) {
    throw new Error(`Failed to install native modules: ${(error as Error).message}`);
  }
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

  // Ensure native modules are installed
  try {
    await ensureNativeModules();
  } catch (error) {
    core.setFailed(`Failed to install native modules: ${(error as Error).message}`);
    return;
  }

  // Run the pre-built client (index.js in same directory)
  const clientDist = path.join(__dirname, 'index.js');

  try {
    await exec('node', [clientDist], {
      env: {
        ...process.env,
        SERVER_URL: serverUrl,
        OTP_SECRET: otpSecret,
        CONNECTION_TIMEOUT_MINUTES: timeout.toString(),
      },
    });
  } catch (error) {
    core.warning(`Terminal error: ${(error as Error).message}`);
  }
}

run();
