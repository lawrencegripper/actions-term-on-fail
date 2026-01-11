"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var pty = __toESM(require("node-pty"));

// node_modules/otpauth/dist/otpauth.node.mjs
var crypto = __toESM(require("node:crypto"), 1);
var uintDecode = (num) => {
  const buf = new ArrayBuffer(8);
  const arr = new Uint8Array(buf);
  let acc = num;
  for (let i = 7; i >= 0; i--) {
    if (acc === 0) break;
    arr[i] = acc & 255;
    acc -= arr[i];
    acc /= 256;
  }
  return arr;
};
var globalScope = (() => {
  if (typeof globalThis === "object") return globalThis;
  else {
    Object.defineProperty(Object.prototype, "__GLOBALTHIS__", {
      get() {
        return this;
      },
      configurable: true
    });
    try {
      if (typeof __GLOBALTHIS__ !== "undefined") return __GLOBALTHIS__;
    } finally {
      delete Object.prototype.__GLOBALTHIS__;
    }
  }
  if (typeof self !== "undefined") return self;
  else if (typeof window !== "undefined") return window;
  else if (typeof global !== "undefined") return global;
  return void 0;
})();
var canonicalizeAlgorithm = (algorithm) => {
  switch (true) {
    case /^(?:SHA-?1|SSL3-SHA1)$/i.test(algorithm):
      return "SHA1";
    case /^SHA(?:2?-)?224$/i.test(algorithm):
      return "SHA224";
    case /^SHA(?:2?-)?256$/i.test(algorithm):
      return "SHA256";
    case /^SHA(?:2?-)?384$/i.test(algorithm):
      return "SHA384";
    case /^SHA(?:2?-)?512$/i.test(algorithm):
      return "SHA512";
    case /^SHA3-224$/i.test(algorithm):
      return "SHA3-224";
    case /^SHA3-256$/i.test(algorithm):
      return "SHA3-256";
    case /^SHA3-384$/i.test(algorithm):
      return "SHA3-384";
    case /^SHA3-512$/i.test(algorithm):
      return "SHA3-512";
    default:
      throw new TypeError(`Unknown hash algorithm: ${algorithm}`);
  }
};
var hmacDigest = (algorithm, key, message) => {
  if (crypto?.createHmac) {
    const hmac = crypto.createHmac(algorithm, globalScope.Buffer.from(key));
    hmac.update(globalScope.Buffer.from(message));
    return hmac.digest();
  } else {
    throw new Error("Missing HMAC function");
  }
};
var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
var base32Decode = (str) => {
  str = str.replace(/ /g, "");
  let end = str.length;
  while (str[end - 1] === "=") --end;
  str = (end < str.length ? str.substring(0, end) : str).toUpperCase();
  const buf = new ArrayBuffer(str.length * 5 / 8 | 0);
  const arr = new Uint8Array(buf);
  let bits = 0;
  let value = 0;
  let index = 0;
  for (let i = 0; i < str.length; i++) {
    const idx = ALPHABET.indexOf(str[i]);
    if (idx === -1) throw new TypeError(`Invalid character found: ${str[i]}`);
    value = value << 5 | idx;
    bits += 5;
    if (bits >= 8) {
      bits -= 8;
      arr[index++] = value >>> bits;
    }
  }
  return arr;
};
var base32Encode = (arr) => {
  let bits = 0;
  let value = 0;
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    value = value << 8 | arr[i];
    bits += 8;
    while (bits >= 5) {
      str += ALPHABET[value >>> bits - 5 & 31];
      bits -= 5;
    }
  }
  if (bits > 0) {
    str += ALPHABET[value << 5 - bits & 31];
  }
  return str;
};
var hexDecode = (str) => {
  str = str.replace(/ /g, "");
  const buf = new ArrayBuffer(str.length / 2);
  const arr = new Uint8Array(buf);
  for (let i = 0; i < str.length; i += 2) {
    arr[i / 2] = parseInt(str.substring(i, i + 2), 16);
  }
  return arr;
};
var hexEncode = (arr) => {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    const hex = arr[i].toString(16);
    if (hex.length === 1) str += "0";
    str += hex;
  }
  return str.toUpperCase();
};
var latin1Decode = (str) => {
  const buf = new ArrayBuffer(str.length);
  const arr = new Uint8Array(buf);
  for (let i = 0; i < str.length; i++) {
    arr[i] = str.charCodeAt(i) & 255;
  }
  return arr;
};
var latin1Encode = (arr) => {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    str += String.fromCharCode(arr[i]);
  }
  return str;
};
var ENCODER = globalScope.TextEncoder ? new globalScope.TextEncoder() : null;
var DECODER = globalScope.TextDecoder ? new globalScope.TextDecoder() : null;
var utf8Decode = (str) => {
  if (!ENCODER) {
    throw new Error("Encoding API not available");
  }
  return ENCODER.encode(str);
};
var utf8Encode = (arr) => {
  if (!DECODER) {
    throw new Error("Encoding API not available");
  }
  return DECODER.decode(arr);
};
var randomBytes2 = (size) => {
  if (crypto?.randomBytes) {
    return crypto.randomBytes(size);
  } else if (globalScope.crypto?.getRandomValues) {
    return globalScope.crypto.getRandomValues(new Uint8Array(size));
  } else {
    throw new Error("Cryptography API not available");
  }
};
var Secret = class _Secret {
  /**
  * Converts a Latin-1 string to a Secret object.
  * @param {string} str Latin-1 string.
  * @returns {Secret} Secret object.
  */
  static fromLatin1(str) {
    return new _Secret({
      buffer: latin1Decode(str).buffer
    });
  }
  /**
  * Converts an UTF-8 string to a Secret object.
  * @param {string} str UTF-8 string.
  * @returns {Secret} Secret object.
  */
  static fromUTF8(str) {
    return new _Secret({
      buffer: utf8Decode(str).buffer
    });
  }
  /**
  * Converts a base32 string to a Secret object.
  * @param {string} str Base32 string.
  * @returns {Secret} Secret object.
  */
  static fromBase32(str) {
    return new _Secret({
      buffer: base32Decode(str).buffer
    });
  }
  /**
  * Converts a hexadecimal string to a Secret object.
  * @param {string} str Hexadecimal string.
  * @returns {Secret} Secret object.
  */
  static fromHex(str) {
    return new _Secret({
      buffer: hexDecode(str).buffer
    });
  }
  /**
  * Secret key buffer.
  * @deprecated For backward compatibility, the "bytes" property should be used instead.
  * @type {ArrayBufferLike}
  */
  get buffer() {
    return this.bytes.buffer;
  }
  /**
  * Latin-1 string representation of secret key.
  * @type {string}
  */
  get latin1() {
    Object.defineProperty(this, "latin1", {
      enumerable: true,
      writable: false,
      configurable: false,
      value: latin1Encode(this.bytes)
    });
    return this.latin1;
  }
  /**
  * UTF-8 string representation of secret key.
  * @type {string}
  */
  get utf8() {
    Object.defineProperty(this, "utf8", {
      enumerable: true,
      writable: false,
      configurable: false,
      value: utf8Encode(this.bytes)
    });
    return this.utf8;
  }
  /**
  * Base32 string representation of secret key.
  * @type {string}
  */
  get base32() {
    Object.defineProperty(this, "base32", {
      enumerable: true,
      writable: false,
      configurable: false,
      value: base32Encode(this.bytes)
    });
    return this.base32;
  }
  /**
  * Hexadecimal string representation of secret key.
  * @type {string}
  */
  get hex() {
    Object.defineProperty(this, "hex", {
      enumerable: true,
      writable: false,
      configurable: false,
      value: hexEncode(this.bytes)
    });
    return this.hex;
  }
  /**
  * Creates a secret key object.
  * @param {Object} [config] Configuration options.
  * @param {ArrayBufferLike} [config.buffer] Secret key buffer.
  * @param {number} [config.size=20] Number of random bytes to generate, ignored if 'buffer' is provided.
  */
  constructor({ buffer, size = 20 } = {}) {
    this.bytes = typeof buffer === "undefined" ? randomBytes2(size) : new Uint8Array(buffer);
    Object.defineProperty(this, "bytes", {
      enumerable: true,
      writable: false,
      configurable: false,
      value: this.bytes
    });
  }
};
var timingSafeEqual2 = (a, b) => {
  if (crypto?.timingSafeEqual) {
    return crypto.timingSafeEqual(globalScope.Buffer.from(a), globalScope.Buffer.from(b));
  } else {
    if (a.length !== b.length) {
      throw new TypeError("Input strings must have the same length");
    }
    let i = -1;
    let out = 0;
    while (++i < a.length) {
      out |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return out === 0;
  }
};
var HOTP = class _HOTP {
  /**
  * Default configuration.
  * @type {{
  *   issuer: string,
  *   label: string,
  *   issuerInLabel: boolean,
  *   algorithm: string,
  *   digits: number,
  *   counter: number
  *   window: number
  * }}
  */
  static get defaults() {
    return {
      issuer: "",
      label: "OTPAuth",
      issuerInLabel: true,
      algorithm: "SHA1",
      digits: 6,
      counter: 0,
      window: 1
    };
  }
  /**
  * Generates an HOTP token.
  * @param {Object} config Configuration options.
  * @param {Secret} config.secret Secret key.
  * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
  * @param {number} [config.digits=6] Token length.
  * @param {number} [config.counter=0] Counter value.
  * @returns {string} Token.
  */
  static generate({ secret, algorithm = _HOTP.defaults.algorithm, digits = _HOTP.defaults.digits, counter = _HOTP.defaults.counter }) {
    const digest = hmacDigest(algorithm, secret.bytes, uintDecode(counter));
    const offset = digest[digest.byteLength - 1] & 15;
    const otp = ((digest[offset] & 127) << 24 | (digest[offset + 1] & 255) << 16 | (digest[offset + 2] & 255) << 8 | digest[offset + 3] & 255) % 10 ** digits;
    return otp.toString().padStart(digits, "0");
  }
  /**
  * Generates an HOTP token.
  * @param {Object} [config] Configuration options.
  * @param {number} [config.counter=this.counter++] Counter value.
  * @returns {string} Token.
  */
  generate({ counter = this.counter++ } = {}) {
    return _HOTP.generate({
      secret: this.secret,
      algorithm: this.algorithm,
      digits: this.digits,
      counter
    });
  }
  /**
  * Validates an HOTP token.
  * @param {Object} config Configuration options.
  * @param {string} config.token Token value.
  * @param {Secret} config.secret Secret key.
  * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
  * @param {number} [config.digits=6] Token length.
  * @param {number} [config.counter=0] Counter value.
  * @param {number} [config.window=1] Window of counter values to test.
  * @returns {number|null} Token delta or null if it is not found in the search window, in which case it should be considered invalid.
  */
  static validate({ token, secret, algorithm, digits = _HOTP.defaults.digits, counter = _HOTP.defaults.counter, window: window2 = _HOTP.defaults.window }) {
    if (token.length !== digits) return null;
    let delta = null;
    const check = (i) => {
      const generatedToken = _HOTP.generate({
        secret,
        algorithm,
        digits,
        counter: i
      });
      if (timingSafeEqual2(token, generatedToken)) {
        delta = i - counter;
      }
    };
    check(counter);
    for (let i = 1; i <= window2 && delta === null; ++i) {
      check(counter - i);
      if (delta !== null) break;
      check(counter + i);
      if (delta !== null) break;
    }
    return delta;
  }
  /**
  * Validates an HOTP token.
  * @param {Object} config Configuration options.
  * @param {string} config.token Token value.
  * @param {number} [config.counter=this.counter] Counter value.
  * @param {number} [config.window=1] Window of counter values to test.
  * @returns {number|null} Token delta or null if it is not found in the search window, in which case it should be considered invalid.
  */
  validate({ token, counter = this.counter, window: window2 }) {
    return _HOTP.validate({
      token,
      secret: this.secret,
      algorithm: this.algorithm,
      digits: this.digits,
      counter,
      window: window2
    });
  }
  /**
  * Returns a Google Authenticator key URI.
  * @returns {string} URI.
  */
  toString() {
    const e = encodeURIComponent;
    return `otpauth://hotp/${this.issuer.length > 0 ? this.issuerInLabel ? `${e(this.issuer)}:${e(this.label)}?issuer=${e(this.issuer)}&` : `${e(this.label)}?issuer=${e(this.issuer)}&` : `${e(this.label)}?`}secret=${e(this.secret.base32)}&algorithm=${e(this.algorithm)}&digits=${e(this.digits)}&counter=${e(this.counter)}`;
  }
  /**
  * Creates an HOTP object.
  * @param {Object} [config] Configuration options.
  * @param {string} [config.issuer=''] Account provider.
  * @param {string} [config.label='OTPAuth'] Account label.
  * @param {boolean} [config.issuerInLabel=true] Include issuer prefix in label.
  * @param {Secret|string} [config.secret=Secret] Secret key.
  * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
  * @param {number} [config.digits=6] Token length.
  * @param {number} [config.counter=0] Initial counter value.
  */
  constructor({ issuer = _HOTP.defaults.issuer, label = _HOTP.defaults.label, issuerInLabel = _HOTP.defaults.issuerInLabel, secret = new Secret(), algorithm = _HOTP.defaults.algorithm, digits = _HOTP.defaults.digits, counter = _HOTP.defaults.counter } = {}) {
    this.issuer = issuer;
    this.label = label;
    this.issuerInLabel = issuerInLabel;
    this.secret = typeof secret === "string" ? Secret.fromBase32(secret) : secret;
    this.algorithm = canonicalizeAlgorithm(algorithm);
    this.digits = digits;
    this.counter = counter;
  }
};
var TOTP = class _TOTP {
  /**
  * Default configuration.
  * @type {{
  *   issuer: string,
  *   label: string,
  *   issuerInLabel: boolean,
  *   algorithm: string,
  *   digits: number,
  *   period: number
  *   window: number
  * }}
  */
  static get defaults() {
    return {
      issuer: "",
      label: "OTPAuth",
      issuerInLabel: true,
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      window: 1
    };
  }
  /**
  * Calculates the counter. i.e. the number of periods since timestamp 0.
  * @param {Object} [config] Configuration options.
  * @param {number} [config.period=30] Token time-step duration.
  * @param {number} [config.timestamp=Date.now] Timestamp value in milliseconds.
  * @returns {number} Counter.
  */
  static counter({ period = _TOTP.defaults.period, timestamp = Date.now() } = {}) {
    return Math.floor(timestamp / 1e3 / period);
  }
  /**
  * Calculates the counter. i.e. the number of periods since timestamp 0.
  * @param {Object} [config] Configuration options.
  * @param {number} [config.timestamp=Date.now] Timestamp value in milliseconds.
  * @returns {number} Counter.
  */
  counter({ timestamp = Date.now() } = {}) {
    return _TOTP.counter({
      period: this.period,
      timestamp
    });
  }
  /**
  * Calculates the remaining time in milliseconds until the next token is generated.
  * @param {Object} [config] Configuration options.
  * @param {number} [config.period=30] Token time-step duration.
  * @param {number} [config.timestamp=Date.now] Timestamp value in milliseconds.
  * @returns {number} counter.
  */
  static remaining({ period = _TOTP.defaults.period, timestamp = Date.now() } = {}) {
    return period * 1e3 - timestamp % (period * 1e3);
  }
  /**
  * Calculates the remaining time in milliseconds until the next token is generated.
  * @param {Object} [config] Configuration options.
  * @param {number} [config.timestamp=Date.now] Timestamp value in milliseconds.
  * @returns {number} counter.
  */
  remaining({ timestamp = Date.now() } = {}) {
    return _TOTP.remaining({
      period: this.period,
      timestamp
    });
  }
  /**
  * Generates a TOTP token.
  * @param {Object} config Configuration options.
  * @param {Secret} config.secret Secret key.
  * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
  * @param {number} [config.digits=6] Token length.
  * @param {number} [config.period=30] Token time-step duration.
  * @param {number} [config.timestamp=Date.now] Timestamp value in milliseconds.
  * @returns {string} Token.
  */
  static generate({ secret, algorithm, digits, period = _TOTP.defaults.period, timestamp = Date.now() }) {
    return HOTP.generate({
      secret,
      algorithm,
      digits,
      counter: _TOTP.counter({
        period,
        timestamp
      })
    });
  }
  /**
  * Generates a TOTP token.
  * @param {Object} [config] Configuration options.
  * @param {number} [config.timestamp=Date.now] Timestamp value in milliseconds.
  * @returns {string} Token.
  */
  generate({ timestamp = Date.now() } = {}) {
    return _TOTP.generate({
      secret: this.secret,
      algorithm: this.algorithm,
      digits: this.digits,
      period: this.period,
      timestamp
    });
  }
  /**
  * Validates a TOTP token.
  * @param {Object} config Configuration options.
  * @param {string} config.token Token value.
  * @param {Secret} config.secret Secret key.
  * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
  * @param {number} [config.digits=6] Token length.
  * @param {number} [config.period=30] Token time-step duration.
  * @param {number} [config.timestamp=Date.now] Timestamp value in milliseconds.
  * @param {number} [config.window=1] Window of counter values to test.
  * @returns {number|null} Token delta or null if it is not found in the search window, in which case it should be considered invalid.
  */
  static validate({ token, secret, algorithm, digits, period = _TOTP.defaults.period, timestamp = Date.now(), window: window2 }) {
    return HOTP.validate({
      token,
      secret,
      algorithm,
      digits,
      counter: _TOTP.counter({
        period,
        timestamp
      }),
      window: window2
    });
  }
  /**
  * Validates a TOTP token.
  * @param {Object} config Configuration options.
  * @param {string} config.token Token value.
  * @param {number} [config.timestamp=Date.now] Timestamp value in milliseconds.
  * @param {number} [config.window=1] Window of counter values to test.
  * @returns {number|null} Token delta or null if it is not found in the search window, in which case it should be considered invalid.
  */
  validate({ token, timestamp, window: window2 }) {
    return _TOTP.validate({
      token,
      secret: this.secret,
      algorithm: this.algorithm,
      digits: this.digits,
      period: this.period,
      timestamp,
      window: window2
    });
  }
  /**
  * Returns a Google Authenticator key URI.
  * @returns {string} URI.
  */
  toString() {
    const e = encodeURIComponent;
    return `otpauth://totp/${this.issuer.length > 0 ? this.issuerInLabel ? `${e(this.issuer)}:${e(this.label)}?issuer=${e(this.issuer)}&` : `${e(this.label)}?issuer=${e(this.issuer)}&` : `${e(this.label)}?`}secret=${e(this.secret.base32)}&algorithm=${e(this.algorithm)}&digits=${e(this.digits)}&period=${e(this.period)}`;
  }
  /**
  * Creates a TOTP object.
  * @param {Object} [config] Configuration options.
  * @param {string} [config.issuer=''] Account provider.
  * @param {string} [config.label='OTPAuth'] Account label.
  * @param {boolean} [config.issuerInLabel=true] Include issuer prefix in label.
  * @param {Secret|string} [config.secret=Secret] Secret key.
  * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
  * @param {number} [config.digits=6] Token length.
  * @param {number} [config.period=30] Token time-step duration.
  */
  constructor({ issuer = _TOTP.defaults.issuer, label = _TOTP.defaults.label, issuerInLabel = _TOTP.defaults.issuerInLabel, secret = new Secret(), algorithm = _TOTP.defaults.algorithm, digits = _TOTP.defaults.digits, period = _TOTP.defaults.period } = {}) {
    this.issuer = issuer;
    this.label = label;
    this.issuerInLabel = issuerInLabel;
    this.secret = typeof secret === "string" ? Secret.fromBase32(secret) : secret;
    this.algorithm = canonicalizeAlgorithm(algorithm);
    this.digits = digits;
    this.period = period;
  }
};

// src/index.ts
var nodeDataChannel = __toESM(require("node-datachannel"));
var import_crypto = require("crypto");
var SERVER_URL = process.env.SERVER_URL || "http://localhost:7373";
var SHELL = process.env.SHELL || "/bin/bash";
var OTP_SECRET = process.env.OTP_SECRET || "";
var CONNECTION_TIMEOUT_MINUTES = parseInt(process.env.CONNECTION_TIMEOUT_MINUTES || "30", 10);
function createTOTP(secret) {
  return new TOTP({
    issuer: "ActionTerminal",
    label: "Terminal",
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: Secret.fromBase32(secret)
  });
}
function validateOTP(secret, code) {
  try {
    const totp = createTOTP(secret);
    const delta = totp.validate({ token: code, window: 1 });
    return delta !== null;
  } catch (err) {
    console.error("OTP validation error:", err);
    return false;
  }
}
async function getOIDCToken() {
  if (process.env.DEV_MODE === "true") {
    const actor = process.env.GITHUB_ACTOR || process.env.USER || "devuser";
    const repo = process.env.GITHUB_REPOSITORY || "dev/repo";
    const runId = process.env.GITHUB_RUN_ID || (0, import_crypto.randomInt)(1e3, 9999).toString();
    console.log(`DEV MODE: Using mock token for actor=${actor}`);
    return `dev:${actor}:${repo}:${runId}`;
  }
  const requestURL = process.env.ACTIONS_ID_TOKEN_REQUEST_URL;
  const requestToken = process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN;
  if (!requestURL || !requestToken) {
    throw new Error(
      'OIDC token not available. Ensure the workflow has "id-token: write" permission.'
    );
  }
  const url = new URL(requestURL);
  url.searchParams.set("audience", SERVER_URL);
  const resp = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${requestToken}`,
      Accept: "application/json"
    }
  });
  if (!resp.ok) {
    throw new Error(`Failed to get OIDC token: ${resp.status} ${await resp.text()}`);
  }
  const data = await resp.json();
  return data.value;
}
var EventSource = class {
  constructor(url, authHeader) {
    this.url = url;
    this.authHeader = authHeader;
    this.connect();
  }
  controller = null;
  retryCount = 0;
  maxRetries = 3;
  initialBackoffMs = 1e3;
  onopen = null;
  onerror = null;
  onmessage = null;
  onfatalerror = null;
  async connect() {
    this.controller = new AbortController();
    try {
      const headers = {
        "Accept": "text/event-stream",
        "Authorization": this.authHeader
      };
      const resp = await fetch(this.url, {
        headers,
        signal: this.controller.signal
      });
      if (!resp.ok || !resp.body) {
        throw new Error(`SSE connection failed: ${resp.status}`);
      }
      this.retryCount = 0;
      this.onopen?.();
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            this.onmessage?.({ data });
          }
        }
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        this.onerror?.(err);
        this.retryCount++;
        if (this.retryCount < this.maxRetries) {
          const backoffMs = this.initialBackoffMs * Math.pow(2, this.retryCount - 1);
          console.log(`SSE connection failed (attempt ${this.retryCount}/${this.maxRetries}): ${err.message}`);
          console.log(`Retrying in ${backoffMs}ms...`);
          setTimeout(() => this.connect(), backoffMs);
        } else {
          const fatalError = new Error(`SSE connection failed after ${this.maxRetries} attempts: ${err.message}`);
          console.error(fatalError.message);
          this.onfatalerror?.(fatalError);
        }
      }
    }
  }
  close() {
    this.controller?.abort();
  }
};
async function main() {
  console.log(`Starting terminal client, connecting to server: ${SERVER_URL}`);
  if (!OTP_SECRET && process.env.DEV_MODE !== "true") {
    console.error("OTP_SECRET is required for secure terminal access");
    process.exit(1);
  }
  if (OTP_SECRET) {
    try {
      createTOTP(OTP_SECRET);
      console.log("OTP secret configured - browser must provide valid code");
    } catch (err) {
      console.error("Invalid OTP secret:", err);
      process.exit(1);
    }
  }
  let oidcToken;
  try {
    oidcToken = await getOIDCToken();
    console.log("Obtained OIDC token");
  } catch (err) {
    console.error("Failed to get OIDC token:", err);
    process.exit(1);
  }
  const pc = new nodeDataChannel.PeerConnection("runnerClient", {
    iceServers: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"]
  });
  const iceCandidates = [];
  pc.onLocalCandidate((candidate, mid) => {
    iceCandidates.push({ candidate, mid });
  });
  let offer = null;
  pc.onLocalDescription((sdp, type) => {
    offer = { sdp, type };
  });
  const dc = pc.createDataChannel("terminal");
  dc.onOpen(() => {
    console.log("Local data channel opened");
  });
  await new Promise((resolve) => setTimeout(resolve, 15e3));
  if (iceCandidates.length === 0) {
    console.error("No ICE candidates gathered after 10 seconds");
    process.exit(1);
  }
  if (!offer) {
    console.error("No local description (offer) generated");
    process.exit(1);
  }
  console.log(`Gathered ICE candidates ${iceCandidates.length}`);
  try {
    const body = JSON.stringify({ ice: iceCandidates, offer });
    const resp = await fetch(`${SERVER_URL}/api/runner/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + oidcToken },
      body
    });
    if (!resp.ok) {
      throw new Error(`Registration failed: ${resp.status} - ${await resp.text()}`);
    }
    console.log("Registered with server");
  } catch (err) {
    console.error("Failed to register:", err);
    process.exit(1);
  }
  let shell = null;
  console.log("Connecting to signaling channel...");
  const eventSource = new EventSource(`${SERVER_URL}/api/runner/signal`, "Bearer " + oidcToken);
  eventSource.onopen = () => {
    console.log("SSE channel connected");
    console.log("Waiting for server to signal browser ICE Candidates. Press Ctrl+C to exit.");
    console.log(`Connect at: ${SERVER_URL}`);
  };
  eventSource.onerror = (err) => {
    console.error("SSE channel error:", err);
  };
  eventSource.onfatalerror = (err) => {
    console.error("Fatal SSE error, giving up:", err.message);
    process.exit(1);
  };
  const connectionTimeoutMs = CONNECTION_TIMEOUT_MINUTES * 60 * 1e3;
  let connectionEstablished = false;
  const connectionTimeout = setTimeout(() => {
    if (!connectionEstablished) {
      console.log(`No connection established within ${CONNECTION_TIMEOUT_MINUTES} minutes, exiting`);
      eventSource.close();
      process.exit(0);
    }
  }, connectionTimeoutMs);
  console.log(`Waiting for browser connection (timeout: ${CONNECTION_TIMEOUT_MINUTES} minutes)...`);
  pc.onStateChange((state) => {
    console.log("Connection state:", state);
    if (state === "connected") {
      connectionEstablished = true;
      clearTimeout(connectionTimeout);
      console.log("Browser connected - session active");
    } else if (state === "closed") {
      console.log("Connection closed, exiting");
      clearTimeout(connectionTimeout);
      if (shell) {
        shell.kill();
      }
      eventSource.close();
      process.exit(0);
    }
  });
  let dcOpen = false;
  let otpVerified = false;
  dc.onOpen(() => {
    console.log("Data channel opened, waiting for OTP verification");
    dcOpen = true;
  });
  dc.onMessage((data) => {
    const text = typeof data === "string" ? data : new TextDecoder().decode(data);
    if (!otpVerified) {
      try {
        const msg = JSON.parse(text);
        if (msg.type === "setup" && msg.code) {
          console.log("Received setup message, validating OTP...");
          const isDevBypass = process.env.DEV_MODE === "true" && msg.code === "000000";
          const isValid = isDevBypass || validateOTP(OTP_SECRET, msg.code);
          if (isValid) {
            console.log("OTP verified successfully");
            otpVerified = true;
            const cols = msg.cols && msg.cols > 0 ? msg.cols : 80;
            const rows = msg.rows && msg.rows > 0 ? msg.rows : 24;
            shell = pty.spawn(SHELL, [], {
              name: "xterm-256color",
              cols,
              rows,
              cwd: process.env.GITHUB_WORKSPACE || process.cwd(),
              env: process.env
            });
            console.log(`PTY started with dimensions ${cols}x${rows}, PID:`, shell.pid);
            shell.onData((shellData) => {
              if (dcOpen && otpVerified) {
                try {
                  dc.sendMessage(shellData);
                } catch (e) {
                  console.log(e);
                }
              }
            });
            setTimeout(() => {
              shell?.write('clear && echo "Terminal session started. Type commands below."\r');
            }, 1e3);
            dc.sendMessage(JSON.stringify({ type: "setup-complete", success: true }) + "\n");
          } else {
            console.log("OTP verification failed - invalid code");
            dc.sendMessage(JSON.stringify({ type: "setup-complete", success: false, message: "Invalid OTP code" }) + "\n");
            setTimeout(() => {
              dc.close();
            }, 100);
          }
        }
      } catch (e) {
        console.log("Received non-JSON message before OTP verification, ignoring");
      }
      return;
    }
    if (shell) {
      shell.write(text);
    }
  });
  dc.onClosed(() => {
    console.log("Data channel closed");
    dcOpen = false;
    if (shell) {
      shell.kill();
    }
  });
  let remoteDescriptionSet = false;
  const pendingCandidates = [];
  eventSource.onmessage = async (event) => {
    try {
      const msg = JSON.parse(event.data);
      if (msg.type === "answer" && msg.answer) {
        console.log("Setting remote description (answer)");
        pc.setRemoteDescription(msg.answer.sdp, "answer");
        remoteDescriptionSet = true;
        if (pendingCandidates.length > 0) {
          console.log(`Processing ${pendingCandidates.length} queued ICE candidates`);
          for (const { candidate, mid } of pendingCandidates) {
            pc.addRemoteCandidate(candidate, mid);
          }
          pendingCandidates.length = 0;
        }
      } else if (msg.type === "candidate" && msg.candidate && msg.mid) {
        if (remoteDescriptionSet) {
          pc.addRemoteCandidate(msg.candidate, msg.mid);
        } else {
          console.log("Queuing ICE candidate (remote description not set yet)");
          pendingCandidates.push({ candidate: msg.candidate, mid: msg.mid });
        }
      }
    } catch (err) {
      console.error("Error handling signal:", err);
    }
  };
  await new Promise(() => {
  });
}
main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
/*! Bundled license information:

otpauth/dist/otpauth.node.mjs:
  (*! otpauth 9.4.1 | (c) Héctor Molinero Fernández | MIT | https://github.com/hectorm/otpauth *)
*/
