// Main entry - validates inputs and saves state for post hook
import * as core from '@actions/core';
import * as OTPAuth from 'otpauth';

// Validate OTP secret by attempting to create a TOTP instance (same as index.ts)
function validateOTPSecret(secret: string): { valid: boolean; error?: string } {
  try {
    new OTPAuth.TOTP({
      issuer: 'ActionTerminal',
      label: 'Terminal',
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: OTPAuth.Secret.fromBase32(secret),
    });
    return { valid: true };
  } catch (err) {
    return { valid: false, error: (err as Error).message };
  }
}

try {
  const serverUrl = core.getInput('server-url');
  const timeout = core.getInput('timeout') || '30';
  const otpSecret = core.getInput('otp-secret');

  // Validate required inputs
  if (!serverUrl) {
    core.setFailed('server-url is required');
    process.exit(1);
  }

  if (!otpSecret) {
    core.setFailed('otp-secret is required for secure terminal access');
    process.exit(1);
  }

  const validation = validateOTPSecret(otpSecret);
  if (!validation.valid) {
    core.setFailed(`otp-secret is invalid: ${validation.error}`);
    process.exit(1);
  }

  // Save inputs for the post hook
  core.saveState('server-url', serverUrl);
  core.saveState('timeout', timeout);
  core.saveState('otp-secret', otpSecret);
  console.log('Terminal on Fail action registered. Will start terminal in post-job hook if workflow fails.');
  console.log('OTP secret validated - browser will need to provide valid OTP code to access terminal.');
} catch (error) {
  core.setFailed((error as Error).message);
}
