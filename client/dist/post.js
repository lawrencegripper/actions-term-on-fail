// src/post.ts
import * as core from "@actions/core";
import { spawn } from "child_process";
import * as path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
function exec(cmd, args, options = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, {
      stdio: "inherit",
      ...options
    });
    let killed = false;
    const timeoutId = options.timeout ? setTimeout(() => {
      killed = true;
      proc.kill("SIGTERM");
    }, options.timeout) : null;
    proc.on("close", (code) => {
      if (timeoutId)
        clearTimeout(timeoutId);
      if (killed) {
        const error = new Error("Process killed due to timeout");
        error.killed = true;
        reject(error);
      } else if (code !== 0) {
        reject(new Error(`Process exited with code ${code}`));
      } else {
        resolve();
      }
    });
    proc.on("error", (err) => {
      if (timeoutId)
        clearTimeout(timeoutId);
      reject(err);
    });
  });
}
async function run() {
  const serverUrl = core.getState("server-url");
  const timeout = parseInt(core.getState("timeout") || "30", 10);
  const otpSecret = core.getState("otp-secret");
  if (!serverUrl) {
    core.warning("No server URL configured, skipping terminal");
    return;
  }
  if (!otpSecret) {
    core.warning("No OTP secret configured, skipping terminal");
    return;
  }
  console.log("\u{1F5A5}\uFE0F  Workflow failed - starting terminal session...");
  console.log(`Server: ${serverUrl}`);
  console.log(`Timeout: ${timeout} minutes`);
  const clientDist = path.join(__dirname, "index.js");
  try {
    const timeoutMs = timeout * 60 * 1e3;
    await exec("node", [clientDist], {
      env: {
        ...process.env,
        SERVER_URL: serverUrl,
        OTP_SECRET: otpSecret
      },
      timeout: timeoutMs
    });
  } catch (error) {
    const execError = error;
    if (execError.killed) {
      console.log("Terminal session ended (timeout)");
    } else {
      core.warning(`Terminal error: ${execError.message}`);
    }
  }
}
run();
