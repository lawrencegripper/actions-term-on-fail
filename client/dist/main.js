// src/main.ts
import * as core from "@actions/core";
import * as OTPAuth from "otpauth";
function validateOTPSecret(secret) {
  try {
    new OTPAuth.TOTP({
      issuer: "ActionTerminal",
      label: "Terminal",
      algorithm: "SHA256",
      digits: 6,
      period: 30,
      secret: OTPAuth.Secret.fromBase32(secret)
    });
    return { valid: true };
  } catch (err) {
    return { valid: false, error: err.message };
  }
}
try {
  const serverUrl = core.getInput("server-url");
  const timeout = core.getInput("timeout") || "30";
  const otpSecret = core.getInput("otp-secret");
  if (!serverUrl) {
    core.setFailed("server-url is required");
    process.exit(1);
  }
  if (!otpSecret) {
    core.setFailed("otp-secret is required for secure terminal access");
    process.exit(1);
  }
  const validation = validateOTPSecret(otpSecret);
  if (!validation.valid) {
    core.setFailed(`otp-secret is invalid: ${validation.error}`);
    process.exit(1);
  }
  core.saveState("server-url", serverUrl);
  core.saveState("timeout", timeout);
  core.saveState("otp-secret", otpSecret);
  console.log("Terminal on Fail action registered. Will start terminal in post-job hook if workflow fails.");
  console.log("OTP secret validated - browser will need to provide valid OTP code to access terminal.");
} catch (error) {
  core.setFailed(error.message);
}
