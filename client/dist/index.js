var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// node_modules/node-pty/lib/utils.js
var require_utils = __commonJS({
  "node_modules/node-pty/lib/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.loadNativeModule = exports.assign = void 0;
    function assign(target) {
      var sources = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
      }
      sources.forEach(function(source) {
        return Object.keys(source).forEach(function(key) {
          return target[key] = source[key];
        });
      });
      return target;
    }
    exports.assign = assign;
    function loadNativeModule(name) {
      var dirs = ["build/Release", "build/Debug", "prebuilds/" + process.platform + "-" + process.arch];
      var relative = ["..", "."];
      var lastError;
      for (var _i = 0, dirs_1 = dirs; _i < dirs_1.length; _i++) {
        var d = dirs_1[_i];
        for (var _a = 0, relative_1 = relative; _a < relative_1.length; _a++) {
          var r = relative_1[_a];
          var dir = r + "/" + d + "/";
          try {
            return { dir, module: __require(dir + "/" + name + ".node") };
          } catch (e) {
            lastError = e;
          }
        }
      }
      throw new Error("Failed to load native module: " + name + ".node, checked: " + dirs.join(", ") + ": " + lastError);
    }
    exports.loadNativeModule = loadNativeModule;
  }
});

// node_modules/node-pty/lib/eventEmitter2.js
var require_eventEmitter2 = __commonJS({
  "node_modules/node-pty/lib/eventEmitter2.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventEmitter2 = void 0;
    var EventEmitter2 = (
      /** @class */
      function() {
        function EventEmitter22() {
          this._listeners = [];
        }
        Object.defineProperty(EventEmitter22.prototype, "event", {
          get: function() {
            var _this = this;
            if (!this._event) {
              this._event = function(listener) {
                _this._listeners.push(listener);
                var disposable = {
                  dispose: function() {
                    for (var i = 0; i < _this._listeners.length; i++) {
                      if (_this._listeners[i] === listener) {
                        _this._listeners.splice(i, 1);
                        return;
                      }
                    }
                  }
                };
                return disposable;
              };
            }
            return this._event;
          },
          enumerable: false,
          configurable: true
        });
        EventEmitter22.prototype.fire = function(data) {
          var queue = [];
          for (var i = 0; i < this._listeners.length; i++) {
            queue.push(this._listeners[i]);
          }
          for (var i = 0; i < queue.length; i++) {
            queue[i].call(void 0, data);
          }
        };
        return EventEmitter22;
      }()
    );
    exports.EventEmitter2 = EventEmitter2;
  }
});

// node_modules/node-pty/lib/terminal.js
var require_terminal = __commonJS({
  "node_modules/node-pty/lib/terminal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Terminal = exports.DEFAULT_ROWS = exports.DEFAULT_COLS = void 0;
    var events_1 = __require("events");
    var eventEmitter2_1 = require_eventEmitter2();
    exports.DEFAULT_COLS = 80;
    exports.DEFAULT_ROWS = 24;
    var FLOW_CONTROL_PAUSE = "";
    var FLOW_CONTROL_RESUME = "";
    var Terminal = (
      /** @class */
      function() {
        function Terminal2(opt) {
          this._pid = 0;
          this._fd = 0;
          this._cols = 0;
          this._rows = 0;
          this._readable = false;
          this._writable = false;
          this._onData = new eventEmitter2_1.EventEmitter2();
          this._onExit = new eventEmitter2_1.EventEmitter2();
          this._internalee = new events_1.EventEmitter();
          this.handleFlowControl = !!(opt === null || opt === void 0 ? void 0 : opt.handleFlowControl);
          this._flowControlPause = (opt === null || opt === void 0 ? void 0 : opt.flowControlPause) || FLOW_CONTROL_PAUSE;
          this._flowControlResume = (opt === null || opt === void 0 ? void 0 : opt.flowControlResume) || FLOW_CONTROL_RESUME;
          if (!opt) {
            return;
          }
          this._checkType("name", opt.name ? opt.name : void 0, "string");
          this._checkType("cols", opt.cols ? opt.cols : void 0, "number");
          this._checkType("rows", opt.rows ? opt.rows : void 0, "number");
          this._checkType("cwd", opt.cwd ? opt.cwd : void 0, "string");
          this._checkType("env", opt.env ? opt.env : void 0, "object");
          this._checkType("uid", opt.uid ? opt.uid : void 0, "number");
          this._checkType("gid", opt.gid ? opt.gid : void 0, "number");
          this._checkType("encoding", opt.encoding ? opt.encoding : void 0, "string");
        }
        Object.defineProperty(Terminal2.prototype, "onData", {
          get: function() {
            return this._onData.event;
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(Terminal2.prototype, "onExit", {
          get: function() {
            return this._onExit.event;
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(Terminal2.prototype, "pid", {
          get: function() {
            return this._pid;
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(Terminal2.prototype, "cols", {
          get: function() {
            return this._cols;
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(Terminal2.prototype, "rows", {
          get: function() {
            return this._rows;
          },
          enumerable: false,
          configurable: true
        });
        Terminal2.prototype.write = function(data) {
          if (this.handleFlowControl) {
            if (data === this._flowControlPause) {
              this.pause();
              return;
            }
            if (data === this._flowControlResume) {
              this.resume();
              return;
            }
          }
          this._write(data);
        };
        Terminal2.prototype._forwardEvents = function() {
          var _this = this;
          this.on("data", function(e) {
            return _this._onData.fire(e);
          });
          this.on("exit", function(exitCode, signal) {
            return _this._onExit.fire({ exitCode, signal });
          });
        };
        Terminal2.prototype._checkType = function(name, value, type, allowArray) {
          if (allowArray === void 0) {
            allowArray = false;
          }
          if (value === void 0) {
            return;
          }
          if (allowArray) {
            if (Array.isArray(value)) {
              value.forEach(function(v, i) {
                if (typeof v !== type) {
                  throw new Error(name + "[" + i + "] must be a " + type + " (not a " + typeof v[i] + ")");
                }
              });
              return;
            }
          }
          if (typeof value !== type) {
            throw new Error(name + " must be a " + type + " (not a " + typeof value + ")");
          }
        };
        Terminal2.prototype.end = function(data) {
          this._socket.end(data);
        };
        Terminal2.prototype.pipe = function(dest, options) {
          return this._socket.pipe(dest, options);
        };
        Terminal2.prototype.pause = function() {
          return this._socket.pause();
        };
        Terminal2.prototype.resume = function() {
          return this._socket.resume();
        };
        Terminal2.prototype.setEncoding = function(encoding) {
          if (this._socket._decoder) {
            delete this._socket._decoder;
          }
          if (encoding) {
            this._socket.setEncoding(encoding);
          }
        };
        Terminal2.prototype.addListener = function(eventName, listener) {
          this.on(eventName, listener);
        };
        Terminal2.prototype.on = function(eventName, listener) {
          if (eventName === "close") {
            this._internalee.on("close", listener);
            return;
          }
          this._socket.on(eventName, listener);
        };
        Terminal2.prototype.emit = function(eventName) {
          var args = [];
          for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
          }
          if (eventName === "close") {
            return this._internalee.emit.apply(this._internalee, arguments);
          }
          return this._socket.emit.apply(this._socket, arguments);
        };
        Terminal2.prototype.listeners = function(eventName) {
          return this._socket.listeners(eventName);
        };
        Terminal2.prototype.removeListener = function(eventName, listener) {
          this._socket.removeListener(eventName, listener);
        };
        Terminal2.prototype.removeAllListeners = function(eventName) {
          this._socket.removeAllListeners(eventName);
        };
        Terminal2.prototype.once = function(eventName, listener) {
          this._socket.once(eventName, listener);
        };
        Terminal2.prototype._close = function() {
          this._socket.readable = false;
          this.write = function() {
          };
          this.end = function() {
          };
          this._writable = false;
          this._readable = false;
        };
        Terminal2.prototype._parseEnv = function(env) {
          var keys = Object.keys(env || {});
          var pairs = [];
          for (var i = 0; i < keys.length; i++) {
            if (keys[i] === void 0) {
              continue;
            }
            pairs.push(keys[i] + "=" + env[keys[i]]);
          }
          return pairs;
        };
        return Terminal2;
      }()
    );
    exports.Terminal = Terminal;
  }
});

// node_modules/node-pty/lib/shared/conout.js
var require_conout = __commonJS({
  "node_modules/node-pty/lib/shared/conout.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getWorkerPipeName = void 0;
    function getWorkerPipeName(conoutPipeName) {
      return conoutPipeName + "-worker";
    }
    exports.getWorkerPipeName = getWorkerPipeName;
  }
});

// node_modules/node-pty/lib/windowsConoutConnection.js
var require_windowsConoutConnection = __commonJS({
  "node_modules/node-pty/lib/windowsConoutConnection.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConoutConnection = void 0;
    var worker_threads_1 = __require("worker_threads");
    var conout_1 = require_conout();
    var path_1 = __require("path");
    var eventEmitter2_1 = require_eventEmitter2();
    var FLUSH_DATA_INTERVAL = 1e3;
    var ConoutConnection = (
      /** @class */
      function() {
        function ConoutConnection2(_conoutPipeName, _useConptyDll) {
          var _this = this;
          this._conoutPipeName = _conoutPipeName;
          this._useConptyDll = _useConptyDll;
          this._isDisposed = false;
          this._onReady = new eventEmitter2_1.EventEmitter2();
          var workerData = {
            conoutPipeName: _conoutPipeName
          };
          var scriptPath = __dirname.replace("node_modules.asar", "node_modules.asar.unpacked");
          this._worker = new worker_threads_1.Worker(path_1.join(scriptPath, "worker/conoutSocketWorker.js"), { workerData });
          this._worker.on("message", function(message) {
            switch (message) {
              case 1:
                _this._onReady.fire();
                return;
              default:
                console.warn("Unexpected ConoutWorkerMessage", message);
            }
          });
        }
        Object.defineProperty(ConoutConnection2.prototype, "onReady", {
          get: function() {
            return this._onReady.event;
          },
          enumerable: false,
          configurable: true
        });
        ConoutConnection2.prototype.dispose = function() {
          if (!this._useConptyDll && this._isDisposed) {
            return;
          }
          this._isDisposed = true;
          this._drainDataAndClose();
        };
        ConoutConnection2.prototype.connectSocket = function(socket) {
          socket.connect(conout_1.getWorkerPipeName(this._conoutPipeName));
        };
        ConoutConnection2.prototype._drainDataAndClose = function() {
          var _this = this;
          if (this._drainTimeout) {
            clearTimeout(this._drainTimeout);
          }
          this._drainTimeout = setTimeout(function() {
            return _this._destroySocket();
          }, FLUSH_DATA_INTERVAL);
        };
        ConoutConnection2.prototype._destroySocket = function() {
          return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [4, this._worker.terminate()];
                case 1:
                  _a.sent();
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        return ConoutConnection2;
      }()
    );
    exports.ConoutConnection = ConoutConnection;
  }
});

// node_modules/node-pty/lib/windowsPtyAgent.js
var require_windowsPtyAgent = __commonJS({
  "node_modules/node-pty/lib/windowsPtyAgent.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.argsToCommandLine = exports.WindowsPtyAgent = void 0;
    var fs = __require("fs");
    var os = __require("os");
    var path = __require("path");
    var child_process_1 = __require("child_process");
    var net_1 = __require("net");
    var windowsConoutConnection_1 = require_windowsConoutConnection();
    var utils_1 = require_utils();
    var conptyNative;
    var winptyNative;
    var FLUSH_DATA_INTERVAL = 1e3;
    var WindowsPtyAgent = (
      /** @class */
      function() {
        function WindowsPtyAgent2(file, args, env, cwd, cols, rows, debug, _useConpty, _useConptyDll, conptyInheritCursor) {
          var _this = this;
          if (_useConptyDll === void 0) {
            _useConptyDll = false;
          }
          if (conptyInheritCursor === void 0) {
            conptyInheritCursor = false;
          }
          this._useConpty = _useConpty;
          this._useConptyDll = _useConptyDll;
          this._pid = 0;
          this._innerPid = 0;
          if (this._useConpty === void 0 || this._useConpty === true) {
            this._useConpty = this._getWindowsBuildNumber() >= 18309;
          }
          if (this._useConpty) {
            if (!conptyNative) {
              conptyNative = utils_1.loadNativeModule("conpty").module;
            }
          } else {
            if (!winptyNative) {
              winptyNative = utils_1.loadNativeModule("pty").module;
            }
          }
          this._ptyNative = this._useConpty ? conptyNative : winptyNative;
          cwd = path.resolve(cwd);
          var commandLine = argsToCommandLine(file, args);
          var term;
          if (this._useConpty) {
            term = this._ptyNative.startProcess(file, cols, rows, debug, this._generatePipeName(), conptyInheritCursor, this._useConptyDll);
          } else {
            term = this._ptyNative.startProcess(file, commandLine, env, cwd, cols, rows, debug);
            this._pid = term.pid;
            this._innerPid = term.innerPid;
          }
          this._fd = term.fd;
          this._pty = term.pty;
          this._outSocket = new net_1.Socket();
          this._outSocket.setEncoding("utf8");
          this._conoutSocketWorker = new windowsConoutConnection_1.ConoutConnection(term.conout, this._useConptyDll);
          this._conoutSocketWorker.onReady(function() {
            _this._conoutSocketWorker.connectSocket(_this._outSocket);
          });
          this._outSocket.on("connect", function() {
            _this._outSocket.emit("ready_datapipe");
          });
          var inSocketFD = fs.openSync(term.conin, "w");
          this._inSocket = new net_1.Socket({
            fd: inSocketFD,
            readable: false,
            writable: true
          });
          this._inSocket.setEncoding("utf8");
          if (this._useConpty) {
            var connect = this._ptyNative.connect(this._pty, commandLine, cwd, env, this._useConptyDll, function(c) {
              return _this._$onProcessExit(c);
            });
            this._innerPid = connect.pid;
          }
        }
        Object.defineProperty(WindowsPtyAgent2.prototype, "inSocket", {
          get: function() {
            return this._inSocket;
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(WindowsPtyAgent2.prototype, "outSocket", {
          get: function() {
            return this._outSocket;
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(WindowsPtyAgent2.prototype, "fd", {
          get: function() {
            return this._fd;
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(WindowsPtyAgent2.prototype, "innerPid", {
          get: function() {
            return this._innerPid;
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(WindowsPtyAgent2.prototype, "pty", {
          get: function() {
            return this._pty;
          },
          enumerable: false,
          configurable: true
        });
        WindowsPtyAgent2.prototype.resize = function(cols, rows) {
          if (this._useConpty) {
            if (this._exitCode !== void 0) {
              throw new Error("Cannot resize a pty that has already exited");
            }
            this._ptyNative.resize(this._pty, cols, rows, this._useConptyDll);
            return;
          }
          this._ptyNative.resize(this._pid, cols, rows);
        };
        WindowsPtyAgent2.prototype.clear = function() {
          if (this._useConpty) {
            this._ptyNative.clear(this._pty, this._useConptyDll);
          }
        };
        WindowsPtyAgent2.prototype.kill = function() {
          var _this = this;
          if (this._useConpty) {
            if (!this._useConptyDll) {
              this._inSocket.readable = false;
              this._outSocket.readable = false;
              this._getConsoleProcessList().then(function(consoleProcessList) {
                consoleProcessList.forEach(function(pid) {
                  try {
                    process.kill(pid);
                  } catch (e) {
                  }
                });
              });
              this._ptyNative.kill(this._pty, this._useConptyDll);
              this._conoutSocketWorker.dispose();
            } else {
              this._inSocket.destroy();
              this._ptyNative.kill(this._pty, this._useConptyDll);
              this._outSocket.on("data", function() {
                _this._conoutSocketWorker.dispose();
              });
            }
          } else {
            var processList = this._ptyNative.getProcessList(this._pid);
            this._ptyNative.kill(this._pid, this._innerPid);
            processList.forEach(function(pid) {
              try {
                process.kill(pid);
              } catch (e) {
              }
            });
          }
        };
        WindowsPtyAgent2.prototype._getConsoleProcessList = function() {
          var _this = this;
          return new Promise(function(resolve) {
            var agent = child_process_1.fork(path.join(__dirname, "conpty_console_list_agent"), [_this._innerPid.toString()]);
            agent.on("message", function(message) {
              clearTimeout(timeout);
              resolve(message.consoleProcessList);
            });
            var timeout = setTimeout(function() {
              agent.kill();
              resolve([_this._innerPid]);
            }, 5e3);
          });
        };
        Object.defineProperty(WindowsPtyAgent2.prototype, "exitCode", {
          get: function() {
            if (this._useConpty) {
              return this._exitCode;
            }
            var winptyExitCode = this._ptyNative.getExitCode(this._innerPid);
            return winptyExitCode === -1 ? void 0 : winptyExitCode;
          },
          enumerable: false,
          configurable: true
        });
        WindowsPtyAgent2.prototype._getWindowsBuildNumber = function() {
          var osVersion = /(\d+)\.(\d+)\.(\d+)/g.exec(os.release());
          var buildNumber = 0;
          if (osVersion && osVersion.length === 4) {
            buildNumber = parseInt(osVersion[3]);
          }
          return buildNumber;
        };
        WindowsPtyAgent2.prototype._generatePipeName = function() {
          return "conpty-" + Math.random() * 1e7;
        };
        WindowsPtyAgent2.prototype._$onProcessExit = function(exitCode) {
          var _this = this;
          this._exitCode = exitCode;
          if (!this._useConptyDll) {
            this._flushDataAndCleanUp();
            this._outSocket.on("data", function() {
              return _this._flushDataAndCleanUp();
            });
          }
        };
        WindowsPtyAgent2.prototype._flushDataAndCleanUp = function() {
          var _this = this;
          if (this._useConptyDll) {
            return;
          }
          if (this._closeTimeout) {
            clearTimeout(this._closeTimeout);
          }
          this._closeTimeout = setTimeout(function() {
            return _this._cleanUpProcess();
          }, FLUSH_DATA_INTERVAL);
        };
        WindowsPtyAgent2.prototype._cleanUpProcess = function() {
          if (this._useConptyDll) {
            return;
          }
          this._inSocket.readable = false;
          this._outSocket.readable = false;
          this._outSocket.destroy();
        };
        return WindowsPtyAgent2;
      }()
    );
    exports.WindowsPtyAgent = WindowsPtyAgent;
    function argsToCommandLine(file, args) {
      if (isCommandLine(args)) {
        if (args.length === 0) {
          return file;
        }
        return argsToCommandLine(file, []) + " " + args;
      }
      var argv = [file];
      Array.prototype.push.apply(argv, args);
      var result = "";
      for (var argIndex = 0; argIndex < argv.length; argIndex++) {
        if (argIndex > 0) {
          result += " ";
        }
        var arg = argv[argIndex];
        var hasLopsidedEnclosingQuote = xOr(arg[0] !== '"', arg[arg.length - 1] !== '"');
        var hasNoEnclosingQuotes = arg[0] !== '"' && arg[arg.length - 1] !== '"';
        var quote = arg === "" || (arg.indexOf(" ") !== -1 || arg.indexOf("	") !== -1) && (arg.length > 1 && (hasLopsidedEnclosingQuote || hasNoEnclosingQuotes));
        if (quote) {
          result += '"';
        }
        var bsCount = 0;
        for (var i = 0; i < arg.length; i++) {
          var p = arg[i];
          if (p === "\\") {
            bsCount++;
          } else if (p === '"') {
            result += repeatText("\\", bsCount * 2 + 1);
            result += '"';
            bsCount = 0;
          } else {
            result += repeatText("\\", bsCount);
            bsCount = 0;
            result += p;
          }
        }
        if (quote) {
          result += repeatText("\\", bsCount * 2);
          result += '"';
        } else {
          result += repeatText("\\", bsCount);
        }
      }
      return result;
    }
    exports.argsToCommandLine = argsToCommandLine;
    function isCommandLine(args) {
      return typeof args === "string";
    }
    function repeatText(text, count) {
      var result = "";
      for (var i = 0; i < count; i++) {
        result += text;
      }
      return result;
    }
    function xOr(arg1, arg2) {
      return arg1 && !arg2 || !arg1 && arg2;
    }
  }
});

// node_modules/node-pty/lib/windowsTerminal.js
var require_windowsTerminal = __commonJS({
  "node_modules/node-pty/lib/windowsTerminal.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WindowsTerminal = void 0;
    var terminal_1 = require_terminal();
    var windowsPtyAgent_1 = require_windowsPtyAgent();
    var utils_1 = require_utils();
    var DEFAULT_FILE = "cmd.exe";
    var DEFAULT_NAME = "Windows Shell";
    var WindowsTerminal = (
      /** @class */
      function(_super) {
        __extends(WindowsTerminal2, _super);
        function WindowsTerminal2(file, args, opt) {
          var _this = _super.call(this, opt) || this;
          _this._checkType("args", args, "string", true);
          args = args || [];
          file = file || DEFAULT_FILE;
          opt = opt || {};
          opt.env = opt.env || process.env;
          if (opt.encoding) {
            console.warn("Setting encoding on Windows is not supported");
          }
          var env = utils_1.assign({}, opt.env);
          _this._cols = opt.cols || terminal_1.DEFAULT_COLS;
          _this._rows = opt.rows || terminal_1.DEFAULT_ROWS;
          var cwd = opt.cwd || process.cwd();
          var name = opt.name || env.TERM || DEFAULT_NAME;
          var parsedEnv = _this._parseEnv(env);
          _this._isReady = false;
          _this._deferreds = [];
          _this._agent = new windowsPtyAgent_1.WindowsPtyAgent(file, args, parsedEnv, cwd, _this._cols, _this._rows, false, opt.useConpty, opt.useConptyDll, opt.conptyInheritCursor);
          _this._socket = _this._agent.outSocket;
          _this._pid = _this._agent.innerPid;
          _this._fd = _this._agent.fd;
          _this._pty = _this._agent.pty;
          _this._socket.on("ready_datapipe", function() {
            _this._socket.once("data", function() {
              if (!_this._isReady) {
                _this._isReady = true;
                _this._deferreds.forEach(function(fn) {
                  fn.run();
                });
                _this._deferreds = [];
              }
            });
            _this._socket.on("error", function(err) {
              _this._close();
              if (err.code) {
                if (~err.code.indexOf("errno 5") || ~err.code.indexOf("EIO"))
                  return;
              }
              if (_this.listeners("error").length < 2) {
                throw err;
              }
            });
            _this._socket.on("close", function() {
              _this.emit("exit", _this._agent.exitCode);
              _this._close();
            });
          });
          _this._file = file;
          _this._name = name;
          _this._readable = true;
          _this._writable = true;
          _this._forwardEvents();
          return _this;
        }
        WindowsTerminal2.prototype._write = function(data) {
          this._defer(this._doWrite, data);
        };
        WindowsTerminal2.prototype._doWrite = function(data) {
          this._agent.inSocket.write(data);
        };
        WindowsTerminal2.open = function(options) {
          throw new Error("open() not supported on windows, use Fork() instead.");
        };
        WindowsTerminal2.prototype.resize = function(cols, rows) {
          var _this = this;
          if (cols <= 0 || rows <= 0 || isNaN(cols) || isNaN(rows) || cols === Infinity || rows === Infinity) {
            throw new Error("resizing must be done using positive cols and rows");
          }
          this._deferNoArgs(function() {
            _this._agent.resize(cols, rows);
            _this._cols = cols;
            _this._rows = rows;
          });
        };
        WindowsTerminal2.prototype.clear = function() {
          var _this = this;
          this._deferNoArgs(function() {
            _this._agent.clear();
          });
        };
        WindowsTerminal2.prototype.destroy = function() {
          var _this = this;
          this._deferNoArgs(function() {
            _this.kill();
          });
        };
        WindowsTerminal2.prototype.kill = function(signal) {
          var _this = this;
          this._deferNoArgs(function() {
            if (signal) {
              throw new Error("Signals not supported on windows.");
            }
            _this._close();
            _this._agent.kill();
          });
        };
        WindowsTerminal2.prototype._deferNoArgs = function(deferredFn) {
          var _this = this;
          if (this._isReady) {
            deferredFn.call(this);
            return;
          }
          this._deferreds.push({
            run: function() {
              return deferredFn.call(_this);
            }
          });
        };
        WindowsTerminal2.prototype._defer = function(deferredFn, arg) {
          var _this = this;
          if (this._isReady) {
            deferredFn.call(this, arg);
            return;
          }
          this._deferreds.push({
            run: function() {
              return deferredFn.call(_this, arg);
            }
          });
        };
        Object.defineProperty(WindowsTerminal2.prototype, "process", {
          get: function() {
            return this._name;
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(WindowsTerminal2.prototype, "master", {
          get: function() {
            throw new Error("master is not supported on Windows");
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(WindowsTerminal2.prototype, "slave", {
          get: function() {
            throw new Error("slave is not supported on Windows");
          },
          enumerable: false,
          configurable: true
        });
        return WindowsTerminal2;
      }(terminal_1.Terminal)
    );
    exports.WindowsTerminal = WindowsTerminal;
  }
});

// node_modules/node-pty/lib/unixTerminal.js
var require_unixTerminal = __commonJS({
  "node_modules/node-pty/lib/unixTerminal.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UnixTerminal = void 0;
    var fs = __require("fs");
    var path = __require("path");
    var tty = __require("tty");
    var terminal_1 = require_terminal();
    var utils_1 = require_utils();
    var native = utils_1.loadNativeModule("pty");
    var pty2 = native.module;
    var helperPath = native.dir + "/spawn-helper";
    helperPath = path.resolve(__dirname, helperPath);
    helperPath = helperPath.replace("app.asar", "app.asar.unpacked");
    helperPath = helperPath.replace("node_modules.asar", "node_modules.asar.unpacked");
    var DEFAULT_FILE = "sh";
    var DEFAULT_NAME = "xterm";
    var DESTROY_SOCKET_TIMEOUT_MS = 200;
    var UnixTerminal = (
      /** @class */
      function(_super) {
        __extends(UnixTerminal2, _super);
        function UnixTerminal2(file, args, opt) {
          var _a, _b;
          var _this = _super.call(this, opt) || this;
          _this._boundClose = false;
          _this._emittedClose = false;
          if (typeof args === "string") {
            throw new Error("args as a string is not supported on unix.");
          }
          args = args || [];
          file = file || DEFAULT_FILE;
          opt = opt || {};
          opt.env = opt.env || process.env;
          _this._cols = opt.cols || terminal_1.DEFAULT_COLS;
          _this._rows = opt.rows || terminal_1.DEFAULT_ROWS;
          var uid = (_a = opt.uid) !== null && _a !== void 0 ? _a : -1;
          var gid = (_b = opt.gid) !== null && _b !== void 0 ? _b : -1;
          var env = utils_1.assign({}, opt.env);
          if (opt.env === process.env) {
            _this._sanitizeEnv(env);
          }
          var cwd = opt.cwd || process.cwd();
          env.PWD = cwd;
          var name = opt.name || env.TERM || DEFAULT_NAME;
          env.TERM = name;
          var parsedEnv = _this._parseEnv(env);
          var encoding = opt.encoding === void 0 ? "utf8" : opt.encoding;
          var onexit = function(code, signal) {
            if (!_this._emittedClose) {
              if (_this._boundClose) {
                return;
              }
              _this._boundClose = true;
              var timeout_1 = setTimeout(function() {
                timeout_1 = null;
                _this._socket.destroy();
              }, DESTROY_SOCKET_TIMEOUT_MS);
              _this.once("close", function() {
                if (timeout_1 !== null) {
                  clearTimeout(timeout_1);
                }
                _this.emit("exit", code, signal);
              });
              return;
            }
            _this.emit("exit", code, signal);
          };
          var term = pty2.fork(file, args, parsedEnv, cwd, _this._cols, _this._rows, uid, gid, encoding === "utf8", helperPath, onexit);
          _this._socket = new tty.ReadStream(term.fd);
          if (encoding !== null) {
            _this._socket.setEncoding(encoding);
          }
          _this._writeStream = new CustomWriteStream(term.fd, encoding || void 0);
          _this._socket.on("error", function(err) {
            if (err.code) {
              if (~err.code.indexOf("EAGAIN")) {
                return;
              }
            }
            _this._close();
            if (!_this._emittedClose) {
              _this._emittedClose = true;
              _this.emit("close");
            }
            if (err.code) {
              if (~err.code.indexOf("errno 5") || ~err.code.indexOf("EIO")) {
                return;
              }
            }
            if (_this.listeners("error").length < 2) {
              throw err;
            }
          });
          _this._pid = term.pid;
          _this._fd = term.fd;
          _this._pty = term.pty;
          _this._file = file;
          _this._name = name;
          _this._readable = true;
          _this._writable = true;
          _this._socket.on("close", function() {
            if (_this._emittedClose) {
              return;
            }
            _this._emittedClose = true;
            _this._close();
            _this.emit("close");
          });
          _this._forwardEvents();
          return _this;
        }
        Object.defineProperty(UnixTerminal2.prototype, "master", {
          get: function() {
            return this._master;
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(UnixTerminal2.prototype, "slave", {
          get: function() {
            return this._slave;
          },
          enumerable: false,
          configurable: true
        });
        UnixTerminal2.prototype._write = function(data) {
          this._writeStream.write(data);
        };
        Object.defineProperty(UnixTerminal2.prototype, "fd", {
          /* Accessors */
          get: function() {
            return this._fd;
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(UnixTerminal2.prototype, "ptsName", {
          get: function() {
            return this._pty;
          },
          enumerable: false,
          configurable: true
        });
        UnixTerminal2.open = function(opt) {
          var self2 = Object.create(UnixTerminal2.prototype);
          opt = opt || {};
          if (arguments.length > 1) {
            opt = {
              cols: arguments[1],
              rows: arguments[2]
            };
          }
          var cols = opt.cols || terminal_1.DEFAULT_COLS;
          var rows = opt.rows || terminal_1.DEFAULT_ROWS;
          var encoding = opt.encoding === void 0 ? "utf8" : opt.encoding;
          var term = pty2.open(cols, rows);
          self2._master = new tty.ReadStream(term.master);
          if (encoding !== null) {
            self2._master.setEncoding(encoding);
          }
          self2._master.resume();
          self2._slave = new tty.ReadStream(term.slave);
          if (encoding !== null) {
            self2._slave.setEncoding(encoding);
          }
          self2._slave.resume();
          self2._socket = self2._master;
          self2._pid = -1;
          self2._fd = term.master;
          self2._pty = term.pty;
          self2._file = process.argv[0] || "node";
          self2._name = process.env.TERM || "";
          self2._readable = true;
          self2._writable = true;
          self2._socket.on("error", function(err) {
            self2._close();
            if (self2.listeners("error").length < 2) {
              throw err;
            }
          });
          self2._socket.on("close", function() {
            self2._close();
          });
          return self2;
        };
        UnixTerminal2.prototype.destroy = function() {
          var _this = this;
          this._close();
          this._socket.once("close", function() {
            _this.kill("SIGHUP");
          });
          this._socket.destroy();
          this._writeStream.dispose();
        };
        UnixTerminal2.prototype.kill = function(signal) {
          try {
            process.kill(this.pid, signal || "SIGHUP");
          } catch (e) {
          }
        };
        Object.defineProperty(UnixTerminal2.prototype, "process", {
          /**
           * Gets the name of the process.
           */
          get: function() {
            if (process.platform === "darwin") {
              var title = pty2.process(this._fd);
              return title !== "kernel_task" ? title : this._file;
            }
            return pty2.process(this._fd, this._pty) || this._file;
          },
          enumerable: false,
          configurable: true
        });
        UnixTerminal2.prototype.resize = function(cols, rows) {
          if (cols <= 0 || rows <= 0 || isNaN(cols) || isNaN(rows) || cols === Infinity || rows === Infinity) {
            throw new Error("resizing must be done using positive cols and rows");
          }
          pty2.resize(this._fd, cols, rows);
          this._cols = cols;
          this._rows = rows;
        };
        UnixTerminal2.prototype.clear = function() {
        };
        UnixTerminal2.prototype._sanitizeEnv = function(env) {
          delete env["TMUX"];
          delete env["TMUX_PANE"];
          delete env["STY"];
          delete env["WINDOW"];
          delete env["WINDOWID"];
          delete env["TERMCAP"];
          delete env["COLUMNS"];
          delete env["LINES"];
        };
        return UnixTerminal2;
      }(terminal_1.Terminal)
    );
    exports.UnixTerminal = UnixTerminal;
    var CustomWriteStream = (
      /** @class */
      function() {
        function CustomWriteStream2(_fd, _encoding) {
          this._fd = _fd;
          this._encoding = _encoding;
          this._writeQueue = [];
        }
        CustomWriteStream2.prototype.dispose = function() {
          clearImmediate(this._writeImmediate);
          this._writeImmediate = void 0;
        };
        CustomWriteStream2.prototype.write = function(data) {
          var buffer = typeof data === "string" ? Buffer.from(data, this._encoding) : Buffer.from(data);
          if (buffer.byteLength !== 0) {
            this._writeQueue.push({ buffer, offset: 0 });
            if (this._writeQueue.length === 1) {
              this._processWriteQueue();
            }
          }
        };
        CustomWriteStream2.prototype._processWriteQueue = function() {
          var _this = this;
          this._writeImmediate = void 0;
          if (this._writeQueue.length === 0) {
            return;
          }
          var task = this._writeQueue[0];
          fs.write(this._fd, task.buffer, task.offset, function(err, written) {
            if (err) {
              if ("code" in err && err.code === "EAGAIN") {
                _this._writeImmediate = setImmediate(function() {
                  return _this._processWriteQueue();
                });
              } else {
                _this._writeQueue.length = 0;
                console.error("Unhandled pty write error", err);
              }
              return;
            }
            task.offset += written;
            if (task.offset >= task.buffer.byteLength) {
              _this._writeQueue.shift();
            }
            _this._processWriteQueue();
          });
        };
        return CustomWriteStream2;
      }()
    );
  }
});

// node_modules/node-pty/lib/index.js
var require_lib = __commonJS({
  "node_modules/node-pty/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.native = exports.open = exports.createTerminal = exports.fork = exports.spawn = void 0;
    var utils_1 = require_utils();
    var terminalCtor;
    if (process.platform === "win32") {
      terminalCtor = require_windowsTerminal().WindowsTerminal;
    } else {
      terminalCtor = require_unixTerminal().UnixTerminal;
    }
    function spawn2(file, args, opt) {
      return new terminalCtor(file, args, opt);
    }
    exports.spawn = spawn2;
    function fork(file, args, opt) {
      return new terminalCtor(file, args, opt);
    }
    exports.fork = fork;
    function createTerminal(file, args, opt) {
      return new terminalCtor(file, args, opt);
    }
    exports.createTerminal = createTerminal;
    function open(options) {
      return terminalCtor.open(options);
    }
    exports.open = open;
    exports.native = process.platform !== "win32" ? utils_1.loadNativeModule("pty").module : null;
  }
});

// src/index.ts
var pty = __toESM(require_lib(), 1);

// node_modules/otpauth/dist/otpauth.node.mjs
import * as crypto from "node:crypto";
var uintDecode = (num) => {
  const buf = new ArrayBuffer(8);
  const arr = new Uint8Array(buf);
  let acc = num;
  for (let i = 7; i >= 0; i--) {
    if (acc === 0)
      break;
    arr[i] = acc & 255;
    acc -= arr[i];
    acc /= 256;
  }
  return arr;
};
var globalScope = (() => {
  if (typeof globalThis === "object")
    return globalThis;
  else {
    Object.defineProperty(Object.prototype, "__GLOBALTHIS__", {
      get() {
        return this;
      },
      configurable: true
    });
    try {
      if (typeof __GLOBALTHIS__ !== "undefined")
        return __GLOBALTHIS__;
    } finally {
      delete Object.prototype.__GLOBALTHIS__;
    }
  }
  if (typeof self !== "undefined")
    return self;
  else if (typeof window !== "undefined")
    return window;
  else if (typeof global !== "undefined")
    return global;
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
  while (str[end - 1] === "=")
    --end;
  str = (end < str.length ? str.substring(0, end) : str).toUpperCase();
  const buf = new ArrayBuffer(str.length * 5 / 8 | 0);
  const arr = new Uint8Array(buf);
  let bits = 0;
  let value = 0;
  let index = 0;
  for (let i = 0; i < str.length; i++) {
    const idx = ALPHABET.indexOf(str[i]);
    if (idx === -1)
      throw new TypeError(`Invalid character found: ${str[i]}`);
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
    if (hex.length === 1)
      str += "0";
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
    if (token.length !== digits)
      return null;
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
      if (delta !== null)
        break;
      check(counter + i);
      if (delta !== null)
        break;
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

// node_modules/node-datachannel/lib/node-datachannel.js
import { createRequire } from "module";
var require2 = createRequire(import.meta.url);
var nodeDataChannel = require2("../build/Release/node_datachannel.node");
var node_datachannel_default = nodeDataChannel;

// node_modules/node-datachannel/lib/datachannel-stream.js
import stream from "stream";
var DataChannelStream = class extends stream.Duplex {
  constructor(rawChannel, streamOptions) {
    super({
      allowHalfOpen: false,
      // Default to autoclose on end().
      ...streamOptions,
      objectMode: true
      // Preserve the string/buffer distinction (WebRTC treats them differently)
    });
    this._rawChannel = rawChannel;
    this._readActive = true;
    rawChannel.onMessage((msg) => {
      if (!this._readActive)
        return;
      this._readActive = this.push(msg);
    });
    rawChannel.onClosed(() => {
      this.push(null);
      this.destroy();
    });
    rawChannel.onError((errMsg) => {
      this.destroy(new Error(`DataChannel error: ${errMsg}`));
    });
    if (!rawChannel.isOpen()) {
      this.cork();
      rawChannel.onOpen(() => this.uncork());
    }
  }
  _read() {
    this._readActive = true;
  }
  _write(chunk, encoding, callback) {
    let sentOk;
    try {
      if (Buffer.isBuffer(chunk)) {
        sentOk = this._rawChannel.sendMessageBinary(chunk);
      } else if (typeof chunk === "string") {
        sentOk = this._rawChannel.sendMessage(chunk);
      } else {
        const typeName = chunk.constructor.name || typeof chunk;
        throw new Error(`Cannot write ${typeName} to DataChannel stream`);
      }
    } catch (err) {
      return callback(err);
    }
    if (sentOk) {
      callback(null);
    } else {
      callback(new Error("Failed to write to DataChannel"));
    }
  }
  _final(callback) {
    if (!this.allowHalfOpen)
      this.destroy();
    callback(null);
  }
  _destroy(maybeErr, callback) {
    this._rawChannel.close();
    callback(maybeErr);
  }
  get label() {
    return this._rawChannel.getLabel();
  }
  get id() {
    return this._rawChannel.getId();
  }
  get protocol() {
    return this._rawChannel.getProtocol();
  }
};

// node_modules/node-datachannel/lib/index.js
var {
  initLogger,
  cleanup,
  preload,
  setSctpSettings,
  RtcpReceivingSession,
  Track,
  Video,
  Audio,
  DataChannel,
  PeerConnection,
  WebSocket
} = node_datachannel_default;

// src/index.ts
import { randomInt } from "crypto";
var SERVER_URL = process.env.SERVER_URL || "http://localhost:7373";
var SHELL = process.env.SHELL || "/bin/bash";
var OTP_SECRET = process.env.OTP_SECRET || "";
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
    const runId = process.env.GITHUB_RUN_ID || randomInt(1e3, 9999).toString();
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
  onopen = null;
  onerror = null;
  onmessage = null;
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
      this.onopen?.();
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done)
          break;
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
        setTimeout(() => this.connect(), 5e3);
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
  const pc = new PeerConnection("runnerClient", {
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
    console.log("SRE channel connected");
    console.log("Waiting for server to signal browser ICE Candidates. Press Ctrl+C to exit.");
    console.log(`Connect at: ${SERVER_URL}`);
  };
  eventSource.onerror = (err) => {
    console.error("SRE channel error:", err);
  };
  pc.onStateChange((state) => {
    console.log("Connection state:", state);
    if (state === "closed") {
      console.log("Connection closed, exiting");
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
  eventSource.onmessage = async (event) => {
    try {
      const msg = JSON.parse(event.data);
      if (msg.type === "answer" && msg.answer) {
        console.log("Setting remote description (answer)");
        pc.setRemoteDescription(msg.answer.sdp, msg.answer.type);
        remoteDescriptionSet = true;
      } else if (msg.type === "candidate" && msg.candidate && msg.mid) {
        if (remoteDescriptionSet) {
          pc.addRemoteCandidate(msg.candidate, msg.mid);
        } else {
          console.log("Queuing ICE candidate (remote description not set yet)");
          pc.addRemoteCandidate(msg.candidate, msg.mid);
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
