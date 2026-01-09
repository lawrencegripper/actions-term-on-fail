/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 854:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Copyright (c) 2019, Microsoft Corporation (MIT License).
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventEmitter2 = void 0;
var EventEmitter2 = /** @class */ (function () {
    function EventEmitter2() {
        this._listeners = [];
    }
    Object.defineProperty(EventEmitter2.prototype, "event", {
        get: function () {
            var _this = this;
            if (!this._event) {
                this._event = function (listener) {
                    _this._listeners.push(listener);
                    var disposable = {
                        dispose: function () {
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
    EventEmitter2.prototype.fire = function (data) {
        var queue = [];
        for (var i = 0; i < this._listeners.length; i++) {
            queue.push(this._listeners[i]);
        }
        for (var i = 0; i < queue.length; i++) {
            queue[i].call(undefined, data);
        }
    };
    return EventEmitter2;
}());
exports.EventEmitter2 = EventEmitter2;
//# sourceMappingURL=eventEmitter2.js.map

/***/ }),

/***/ 478:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


/**
 * Copyright (c) 2012-2015, Christopher Jeffrey, Peter Sunde (MIT License)
 * Copyright (c) 2016, Daniel Imms (MIT License).
 * Copyright (c) 2018, Microsoft Corporation (MIT License).
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.native = exports.open = exports.createTerminal = exports.fork = exports.spawn = void 0;
var utils_1 = __nccwpck_require__(463);
var terminalCtor;
if (process.platform === 'win32') {
    terminalCtor = (__nccwpck_require__(171).WindowsTerminal);
}
else {
    terminalCtor = (__nccwpck_require__(78).UnixTerminal);
}
/**
 * Forks a process as a pseudoterminal.
 * @param file The file to launch.
 * @param args The file's arguments as argv (string[]) or in a pre-escaped
 * CommandLine format (string). Note that the CommandLine option is only
 * available on Windows and is expected to be escaped properly.
 * @param options The options of the terminal.
 * @throws When the file passed to spawn with does not exists.
 * @see CommandLineToArgvW https://msdn.microsoft.com/en-us/library/windows/desktop/bb776391(v=vs.85).aspx
 * @see Parsing C++ Comamnd-Line Arguments https://msdn.microsoft.com/en-us/library/17w5ykft.aspx
 * @see GetCommandLine https://msdn.microsoft.com/en-us/library/windows/desktop/ms683156.aspx
 */
function spawn(file, args, opt) {
    return new terminalCtor(file, args, opt);
}
exports.spawn = spawn;
/** @deprecated */
function fork(file, args, opt) {
    return new terminalCtor(file, args, opt);
}
exports.fork = fork;
/** @deprecated */
function createTerminal(file, args, opt) {
    return new terminalCtor(file, args, opt);
}
exports.createTerminal = createTerminal;
function open(options) {
    return terminalCtor.open(options);
}
exports.open = open;
/**
 * Expose the native API when not Windows, note that this is not public API and
 * could be removed at any time.
 */
exports.native = (process.platform !== 'win32' ? utils_1.loadNativeModule('pty').module : null);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 208:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Copyright (c) 2020, Microsoft Corporation (MIT License).
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getWorkerPipeName = void 0;
function getWorkerPipeName(conoutPipeName) {
    return conoutPipeName + "-worker";
}
exports.getWorkerPipeName = getWorkerPipeName;
//# sourceMappingURL=conout.js.map

/***/ }),

/***/ 600:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


/**
 * Copyright (c) 2012-2015, Christopher Jeffrey (MIT License)
 * Copyright (c) 2016, Daniel Imms (MIT License).
 * Copyright (c) 2018, Microsoft Corporation (MIT License).
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Terminal = exports.DEFAULT_ROWS = exports.DEFAULT_COLS = void 0;
var events_1 = __nccwpck_require__(434);
var eventEmitter2_1 = __nccwpck_require__(854);
exports.DEFAULT_COLS = 80;
exports.DEFAULT_ROWS = 24;
/**
 * Default messages to indicate PAUSE/RESUME for automatic flow control.
 * To avoid conflicts with rebound XON/XOFF control codes (such as on-my-zsh),
 * the sequences can be customized in `IPtyForkOptions`.
 */
var FLOW_CONTROL_PAUSE = '\x13'; // defaults to XOFF
var FLOW_CONTROL_RESUME = '\x11'; // defaults to XON
var Terminal = /** @class */ (function () {
    function Terminal(opt) {
        this._pid = 0;
        this._fd = 0;
        this._cols = 0;
        this._rows = 0;
        this._readable = false;
        this._writable = false;
        this._onData = new eventEmitter2_1.EventEmitter2();
        this._onExit = new eventEmitter2_1.EventEmitter2();
        // for 'close'
        this._internalee = new events_1.EventEmitter();
        // setup flow control handling
        this.handleFlowControl = !!(opt === null || opt === void 0 ? void 0 : opt.handleFlowControl);
        this._flowControlPause = (opt === null || opt === void 0 ? void 0 : opt.flowControlPause) || FLOW_CONTROL_PAUSE;
        this._flowControlResume = (opt === null || opt === void 0 ? void 0 : opt.flowControlResume) || FLOW_CONTROL_RESUME;
        if (!opt) {
            return;
        }
        // Do basic type checks here in case node-pty is being used within JavaScript. If the wrong
        // types go through to the C++ side it can lead to hard to diagnose exceptions.
        this._checkType('name', opt.name ? opt.name : undefined, 'string');
        this._checkType('cols', opt.cols ? opt.cols : undefined, 'number');
        this._checkType('rows', opt.rows ? opt.rows : undefined, 'number');
        this._checkType('cwd', opt.cwd ? opt.cwd : undefined, 'string');
        this._checkType('env', opt.env ? opt.env : undefined, 'object');
        this._checkType('uid', opt.uid ? opt.uid : undefined, 'number');
        this._checkType('gid', opt.gid ? opt.gid : undefined, 'number');
        this._checkType('encoding', opt.encoding ? opt.encoding : undefined, 'string');
    }
    Object.defineProperty(Terminal.prototype, "onData", {
        get: function () { return this._onData.event; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Terminal.prototype, "onExit", {
        get: function () { return this._onExit.event; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Terminal.prototype, "pid", {
        get: function () { return this._pid; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Terminal.prototype, "cols", {
        get: function () { return this._cols; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Terminal.prototype, "rows", {
        get: function () { return this._rows; },
        enumerable: false,
        configurable: true
    });
    Terminal.prototype.write = function (data) {
        if (this.handleFlowControl) {
            // PAUSE/RESUME messages are not forwarded to the pty
            if (data === this._flowControlPause) {
                this.pause();
                return;
            }
            if (data === this._flowControlResume) {
                this.resume();
                return;
            }
        }
        // everything else goes to the real pty
        this._write(data);
    };
    Terminal.prototype._forwardEvents = function () {
        var _this = this;
        this.on('data', function (e) { return _this._onData.fire(e); });
        this.on('exit', function (exitCode, signal) { return _this._onExit.fire({ exitCode: exitCode, signal: signal }); });
    };
    Terminal.prototype._checkType = function (name, value, type, allowArray) {
        if (allowArray === void 0) { allowArray = false; }
        if (value === undefined) {
            return;
        }
        if (allowArray) {
            if (Array.isArray(value)) {
                value.forEach(function (v, i) {
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
    /** See net.Socket.end */
    Terminal.prototype.end = function (data) {
        this._socket.end(data);
    };
    /** See stream.Readable.pipe */
    Terminal.prototype.pipe = function (dest, options) {
        return this._socket.pipe(dest, options);
    };
    /** See net.Socket.pause */
    Terminal.prototype.pause = function () {
        return this._socket.pause();
    };
    /** See net.Socket.resume */
    Terminal.prototype.resume = function () {
        return this._socket.resume();
    };
    /** See net.Socket.setEncoding */
    Terminal.prototype.setEncoding = function (encoding) {
        if (this._socket._decoder) {
            delete this._socket._decoder;
        }
        if (encoding) {
            this._socket.setEncoding(encoding);
        }
    };
    Terminal.prototype.addListener = function (eventName, listener) { this.on(eventName, listener); };
    Terminal.prototype.on = function (eventName, listener) {
        if (eventName === 'close') {
            this._internalee.on('close', listener);
            return;
        }
        this._socket.on(eventName, listener);
    };
    Terminal.prototype.emit = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (eventName === 'close') {
            return this._internalee.emit.apply(this._internalee, arguments);
        }
        return this._socket.emit.apply(this._socket, arguments);
    };
    Terminal.prototype.listeners = function (eventName) {
        return this._socket.listeners(eventName);
    };
    Terminal.prototype.removeListener = function (eventName, listener) {
        this._socket.removeListener(eventName, listener);
    };
    Terminal.prototype.removeAllListeners = function (eventName) {
        this._socket.removeAllListeners(eventName);
    };
    Terminal.prototype.once = function (eventName, listener) {
        this._socket.once(eventName, listener);
    };
    Terminal.prototype._close = function () {
        this._socket.readable = false;
        this.write = function () { };
        this.end = function () { };
        this._writable = false;
        this._readable = false;
    };
    Terminal.prototype._parseEnv = function (env) {
        var keys = Object.keys(env || {});
        var pairs = [];
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] === undefined) {
                continue;
            }
            pairs.push(keys[i] + '=' + env[keys[i]]);
        }
        return pairs;
    };
    return Terminal;
}());
exports.Terminal = Terminal;
//# sourceMappingURL=terminal.js.map

/***/ }),

/***/ 78:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UnixTerminal = void 0;
/**
 * Copyright (c) 2012-2015, Christopher Jeffrey (MIT License)
 * Copyright (c) 2016, Daniel Imms (MIT License).
 * Copyright (c) 2018, Microsoft Corporation (MIT License).
 */
var fs = __nccwpck_require__(896);
var path = __nccwpck_require__(928);
var tty = __nccwpck_require__(18);
var terminal_1 = __nccwpck_require__(600);
var utils_1 = __nccwpck_require__(463);
var native = utils_1.loadNativeModule('pty');
var pty = native.module;
var helperPath = native.dir + '/spawn-helper';
helperPath = path.resolve(__dirname, helperPath);
helperPath = helperPath.replace('app.asar', 'app.asar.unpacked');
helperPath = helperPath.replace('node_modules.asar', 'node_modules.asar.unpacked');
var DEFAULT_FILE = 'sh';
var DEFAULT_NAME = 'xterm';
var DESTROY_SOCKET_TIMEOUT_MS = 200;
var UnixTerminal = /** @class */ (function (_super) {
    __extends(UnixTerminal, _super);
    function UnixTerminal(file, args, opt) {
        var _a, _b;
        var _this = _super.call(this, opt) || this;
        _this._boundClose = false;
        _this._emittedClose = false;
        if (typeof args === 'string') {
            throw new Error('args as a string is not supported on unix.');
        }
        // Initialize arguments
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
        var encoding = (opt.encoding === undefined ? 'utf8' : opt.encoding);
        var onexit = function (code, signal) {
            // XXX Sometimes a data event is emitted after exit. Wait til socket is
            // destroyed.
            if (!_this._emittedClose) {
                if (_this._boundClose) {
                    return;
                }
                _this._boundClose = true;
                // From macOS High Sierra 10.13.2 sometimes the socket never gets
                // closed. A timeout is applied here to avoid the terminal never being
                // destroyed when this occurs.
                var timeout_1 = setTimeout(function () {
                    timeout_1 = null;
                    // Destroying the socket now will cause the close event to fire
                    _this._socket.destroy();
                }, DESTROY_SOCKET_TIMEOUT_MS);
                _this.once('close', function () {
                    if (timeout_1 !== null) {
                        clearTimeout(timeout_1);
                    }
                    _this.emit('exit', code, signal);
                });
                return;
            }
            _this.emit('exit', code, signal);
        };
        // fork
        var term = pty.fork(file, args, parsedEnv, cwd, _this._cols, _this._rows, uid, gid, (encoding === 'utf8'), helperPath, onexit);
        _this._socket = new tty.ReadStream(term.fd);
        if (encoding !== null) {
            _this._socket.setEncoding(encoding);
        }
        _this._writeStream = new CustomWriteStream(term.fd, (encoding || undefined));
        // setup
        _this._socket.on('error', function (err) {
            // NOTE: fs.ReadStream gets EAGAIN twice at first:
            if (err.code) {
                if (~err.code.indexOf('EAGAIN')) {
                    return;
                }
            }
            // close
            _this._close();
            // EIO on exit from fs.ReadStream:
            if (!_this._emittedClose) {
                _this._emittedClose = true;
                _this.emit('close');
            }
            // EIO, happens when someone closes our child process: the only process in
            // the terminal.
            // node < 0.6.14: errno 5
            // node >= 0.6.14: read EIO
            if (err.code) {
                if (~err.code.indexOf('errno 5') || ~err.code.indexOf('EIO')) {
                    return;
                }
            }
            // throw anything else
            if (_this.listeners('error').length < 2) {
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
        _this._socket.on('close', function () {
            if (_this._emittedClose) {
                return;
            }
            _this._emittedClose = true;
            _this._close();
            _this.emit('close');
        });
        _this._forwardEvents();
        return _this;
    }
    Object.defineProperty(UnixTerminal.prototype, "master", {
        get: function () { return this._master; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnixTerminal.prototype, "slave", {
        get: function () { return this._slave; },
        enumerable: false,
        configurable: true
    });
    UnixTerminal.prototype._write = function (data) {
        this._writeStream.write(data);
    };
    Object.defineProperty(UnixTerminal.prototype, "fd", {
        /* Accessors */
        get: function () { return this._fd; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnixTerminal.prototype, "ptsName", {
        get: function () { return this._pty; },
        enumerable: false,
        configurable: true
    });
    /**
     * openpty
     */
    UnixTerminal.open = function (opt) {
        var self = Object.create(UnixTerminal.prototype);
        opt = opt || {};
        if (arguments.length > 1) {
            opt = {
                cols: arguments[1],
                rows: arguments[2]
            };
        }
        var cols = opt.cols || terminal_1.DEFAULT_COLS;
        var rows = opt.rows || terminal_1.DEFAULT_ROWS;
        var encoding = (opt.encoding === undefined ? 'utf8' : opt.encoding);
        // open
        var term = pty.open(cols, rows);
        self._master = new tty.ReadStream(term.master);
        if (encoding !== null) {
            self._master.setEncoding(encoding);
        }
        self._master.resume();
        self._slave = new tty.ReadStream(term.slave);
        if (encoding !== null) {
            self._slave.setEncoding(encoding);
        }
        self._slave.resume();
        self._socket = self._master;
        self._pid = -1;
        self._fd = term.master;
        self._pty = term.pty;
        self._file = process.argv[0] || 'node';
        self._name = process.env.TERM || '';
        self._readable = true;
        self._writable = true;
        self._socket.on('error', function (err) {
            self._close();
            if (self.listeners('error').length < 2) {
                throw err;
            }
        });
        self._socket.on('close', function () {
            self._close();
        });
        return self;
    };
    UnixTerminal.prototype.destroy = function () {
        var _this = this;
        this._close();
        // Need to close the read stream so node stops reading a dead file
        // descriptor. Then we can safely SIGHUP the shell.
        this._socket.once('close', function () {
            _this.kill('SIGHUP');
        });
        this._socket.destroy();
        this._writeStream.dispose();
    };
    UnixTerminal.prototype.kill = function (signal) {
        try {
            process.kill(this.pid, signal || 'SIGHUP');
        }
        catch (e) { /* swallow */ }
    };
    Object.defineProperty(UnixTerminal.prototype, "process", {
        /**
         * Gets the name of the process.
         */
        get: function () {
            if (process.platform === 'darwin') {
                var title = pty.process(this._fd);
                return (title !== 'kernel_task') ? title : this._file;
            }
            return pty.process(this._fd, this._pty) || this._file;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * TTY
     */
    UnixTerminal.prototype.resize = function (cols, rows) {
        if (cols <= 0 || rows <= 0 || isNaN(cols) || isNaN(rows) || cols === Infinity || rows === Infinity) {
            throw new Error('resizing must be done using positive cols and rows');
        }
        pty.resize(this._fd, cols, rows);
        this._cols = cols;
        this._rows = rows;
    };
    UnixTerminal.prototype.clear = function () {
    };
    UnixTerminal.prototype._sanitizeEnv = function (env) {
        // Make sure we didn't start our server from inside tmux.
        delete env['TMUX'];
        delete env['TMUX_PANE'];
        // Make sure we didn't start our server from inside screen.
        // http://web.mit.edu/gnu/doc/html/screen_20.html
        delete env['STY'];
        delete env['WINDOW'];
        // Delete some variables that might confuse our terminal.
        delete env['WINDOWID'];
        delete env['TERMCAP'];
        delete env['COLUMNS'];
        delete env['LINES'];
    };
    return UnixTerminal;
}(terminal_1.Terminal));
exports.UnixTerminal = UnixTerminal;
/**
 * A custom write stream that writes directly to a file descriptor with proper
 * handling of backpressure and errors. This avoids some event loop exhaustion
 * issues that can occur when using the standard APIs in Node.
 */
var CustomWriteStream = /** @class */ (function () {
    function CustomWriteStream(_fd, _encoding) {
        this._fd = _fd;
        this._encoding = _encoding;
        this._writeQueue = [];
    }
    CustomWriteStream.prototype.dispose = function () {
        clearImmediate(this._writeImmediate);
        this._writeImmediate = undefined;
    };
    CustomWriteStream.prototype.write = function (data) {
        // Writes are put in a queue and processed asynchronously in order to handle
        // backpressure from the kernel buffer.
        var buffer = typeof data === 'string'
            ? Buffer.from(data, this._encoding)
            : Buffer.from(data);
        if (buffer.byteLength !== 0) {
            this._writeQueue.push({ buffer: buffer, offset: 0 });
            if (this._writeQueue.length === 1) {
                this._processWriteQueue();
            }
        }
    };
    CustomWriteStream.prototype._processWriteQueue = function () {
        var _this = this;
        this._writeImmediate = undefined;
        if (this._writeQueue.length === 0) {
            return;
        }
        var task = this._writeQueue[0];
        // Write to the underlying file descriptor and handle it directly, rather
        // than using the `net.Socket`/`tty.WriteStream` wrappers which swallow and
        // mask errors like EAGAIN and can cause the thread to block indefinitely.
        fs.write(this._fd, task.buffer, task.offset, function (err, written) {
            if (err) {
                if ('code' in err && err.code === 'EAGAIN') {
                    // `setImmediate` is used to yield to the event loop and re-attempt
                    // the write later.
                    _this._writeImmediate = setImmediate(function () { return _this._processWriteQueue(); });
                }
                else {
                    // Stop processing immediately on unexpected error and log
                    _this._writeQueue.length = 0;
                    console.error('Unhandled pty write error', err);
                }
                return;
            }
            task.offset += written;
            if (task.offset >= task.buffer.byteLength) {
                _this._writeQueue.shift();
            }
            // Since there is more room in the kernel buffer, we can continue to write
            // until we hit EAGAIN or exhaust the queue.
            //
            // Note that old versions of bash, like v3.2 which ships in macOS, appears
            // to have a bug in its readline implementation that causes data
            // corruption when writes to the pty happens too quickly. Instead of
            // trying to workaround that we just accept it so that large pastes are as
            // fast as possible.
            // Context: https://github.com/microsoft/node-pty/issues/833
            _this._processWriteQueue();
        });
    };
    return CustomWriteStream;
}());
//# sourceMappingURL=unixTerminal.js.map

/***/ }),

/***/ 463:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Copyright (c) 2017, Daniel Imms (MIT License).
 * Copyright (c) 2018, Microsoft Corporation (MIT License).
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loadNativeModule = exports.assign = void 0;
function assign(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    sources.forEach(function (source) { return Object.keys(source).forEach(function (key) { return target[key] = source[key]; }); });
    return target;
}
exports.assign = assign;
function loadNativeModule(name) {
    // Check build, debug, and then prebuilds.
    var dirs = ['build/Release', 'build/Debug', "prebuilds/" + process.platform + "-" + process.arch];
    // Check relative to the parent dir for unbundled and then the current dir for bundled
    var relative = ['..', '.'];
    var lastError;
    for (var _i = 0, dirs_1 = dirs; _i < dirs_1.length; _i++) {
        var d = dirs_1[_i];
        for (var _a = 0, relative_1 = relative; _a < relative_1.length; _a++) {
            var r = relative_1[_a];
            var dir = r + "/" + d + "/";
            try {
                return { dir: dir, module: require(dir + "/" + name + ".node") };
            }
            catch (e) {
                lastError = e;
            }
        }
    }
    throw new Error("Failed to load native module: " + name + ".node, checked: " + dirs.join(', ') + ": " + lastError);
}
exports.loadNativeModule = loadNativeModule;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 931:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


/**
 * Copyright (c) 2020, Microsoft Corporation (MIT License).
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConoutConnection = void 0;
var worker_threads_1 = __nccwpck_require__(167);
var conout_1 = __nccwpck_require__(208);
var path_1 = __nccwpck_require__(928);
var eventEmitter2_1 = __nccwpck_require__(854);
/**
 * The amount of time to wait for additional data after the conpty shell process has exited before
 * shutting down the worker and sockets. The timer will be reset if a new data event comes in after
 * the timer has started.
 */
var FLUSH_DATA_INTERVAL = 1000;
/**
 * Connects to and manages the lifecycle of the conout socket. This socket must be drained on
 * another thread in order to avoid deadlocks where Conpty waits for the out socket to drain
 * when `ClosePseudoConsole` is called. This happens when data is being written to the terminal when
 * the pty is closed.
 *
 * See also:
 * - https://github.com/microsoft/node-pty/issues/375
 * - https://github.com/microsoft/vscode/issues/76548
 * - https://github.com/microsoft/terminal/issues/1810
 * - https://docs.microsoft.com/en-us/windows/console/closepseudoconsole
 */
var ConoutConnection = /** @class */ (function () {
    function ConoutConnection(_conoutPipeName, _useConptyDll) {
        var _this = this;
        this._conoutPipeName = _conoutPipeName;
        this._useConptyDll = _useConptyDll;
        this._isDisposed = false;
        this._onReady = new eventEmitter2_1.EventEmitter2();
        var workerData = {
            conoutPipeName: _conoutPipeName
        };
        var scriptPath = __dirname.replace('node_modules.asar', 'node_modules.asar.unpacked');
        this._worker = new worker_threads_1.Worker(path_1.join(scriptPath, 'worker/conoutSocketWorker.js'), { workerData: workerData });
        this._worker.on('message', function (message) {
            switch (message) {
                case 1 /* READY */:
                    _this._onReady.fire();
                    return;
                default:
                    console.warn('Unexpected ConoutWorkerMessage', message);
            }
        });
    }
    Object.defineProperty(ConoutConnection.prototype, "onReady", {
        get: function () { return this._onReady.event; },
        enumerable: false,
        configurable: true
    });
    ConoutConnection.prototype.dispose = function () {
        if (!this._useConptyDll && this._isDisposed) {
            return;
        }
        this._isDisposed = true;
        // Drain all data from the socket before closing
        this._drainDataAndClose();
    };
    ConoutConnection.prototype.connectSocket = function (socket) {
        socket.connect(conout_1.getWorkerPipeName(this._conoutPipeName));
    };
    ConoutConnection.prototype._drainDataAndClose = function () {
        var _this = this;
        if (this._drainTimeout) {
            clearTimeout(this._drainTimeout);
        }
        this._drainTimeout = setTimeout(function () { return _this._destroySocket(); }, FLUSH_DATA_INTERVAL);
    };
    ConoutConnection.prototype._destroySocket = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._worker.terminate()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ConoutConnection;
}());
exports.ConoutConnection = ConoutConnection;
//# sourceMappingURL=windowsConoutConnection.js.map

/***/ }),

/***/ 791:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


/**
 * Copyright (c) 2012-2015, Christopher Jeffrey, Peter Sunde (MIT License)
 * Copyright (c) 2016, Daniel Imms (MIT License).
 * Copyright (c) 2018, Microsoft Corporation (MIT License).
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.argsToCommandLine = exports.WindowsPtyAgent = void 0;
var fs = __nccwpck_require__(896);
var os = __nccwpck_require__(857);
var path = __nccwpck_require__(928);
var child_process_1 = __nccwpck_require__(317);
var net_1 = __nccwpck_require__(278);
var windowsConoutConnection_1 = __nccwpck_require__(931);
var utils_1 = __nccwpck_require__(463);
var conptyNative;
var winptyNative;
/**
 * The amount of time to wait for additional data after the conpty shell process has exited before
 * shutting down the socket. The timer will be reset if a new data event comes in after the timer
 * has started.
 */
var FLUSH_DATA_INTERVAL = 1000;
/**
 * This agent sits between the WindowsTerminal class and provides a common interface for both conpty
 * and winpty.
 */
var WindowsPtyAgent = /** @class */ (function () {
    function WindowsPtyAgent(file, args, env, cwd, cols, rows, debug, _useConpty, _useConptyDll, conptyInheritCursor) {
        var _this = this;
        if (_useConptyDll === void 0) { _useConptyDll = false; }
        if (conptyInheritCursor === void 0) { conptyInheritCursor = false; }
        this._useConpty = _useConpty;
        this._useConptyDll = _useConptyDll;
        this._pid = 0;
        this._innerPid = 0;
        if (this._useConpty === undefined || this._useConpty === true) {
            this._useConpty = this._getWindowsBuildNumber() >= 18309;
        }
        if (this._useConpty) {
            if (!conptyNative) {
                conptyNative = utils_1.loadNativeModule('conpty').module;
            }
        }
        else {
            if (!winptyNative) {
                winptyNative = utils_1.loadNativeModule('pty').module;
            }
        }
        this._ptyNative = this._useConpty ? conptyNative : winptyNative;
        // Sanitize input variable.
        cwd = path.resolve(cwd);
        // Compose command line
        var commandLine = argsToCommandLine(file, args);
        // Open pty session.
        var term;
        if (this._useConpty) {
            term = this._ptyNative.startProcess(file, cols, rows, debug, this._generatePipeName(), conptyInheritCursor, this._useConptyDll);
        }
        else {
            term = this._ptyNative.startProcess(file, commandLine, env, cwd, cols, rows, debug);
            this._pid = term.pid;
            this._innerPid = term.innerPid;
        }
        // Not available on windows.
        this._fd = term.fd;
        // Generated incremental number that has no real purpose besides  using it
        // as a terminal id.
        this._pty = term.pty;
        // Create terminal pipe IPC channel and forward to a local unix socket.
        this._outSocket = new net_1.Socket();
        this._outSocket.setEncoding('utf8');
        // The conout socket must be ready out on another thread to avoid deadlocks
        this._conoutSocketWorker = new windowsConoutConnection_1.ConoutConnection(term.conout, this._useConptyDll);
        this._conoutSocketWorker.onReady(function () {
            _this._conoutSocketWorker.connectSocket(_this._outSocket);
        });
        this._outSocket.on('connect', function () {
            _this._outSocket.emit('ready_datapipe');
        });
        var inSocketFD = fs.openSync(term.conin, 'w');
        this._inSocket = new net_1.Socket({
            fd: inSocketFD,
            readable: false,
            writable: true
        });
        this._inSocket.setEncoding('utf8');
        if (this._useConpty) {
            var connect = this._ptyNative.connect(this._pty, commandLine, cwd, env, this._useConptyDll, function (c) { return _this._$onProcessExit(c); });
            this._innerPid = connect.pid;
        }
    }
    Object.defineProperty(WindowsPtyAgent.prototype, "inSocket", {
        get: function () { return this._inSocket; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WindowsPtyAgent.prototype, "outSocket", {
        get: function () { return this._outSocket; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WindowsPtyAgent.prototype, "fd", {
        get: function () { return this._fd; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WindowsPtyAgent.prototype, "innerPid", {
        get: function () { return this._innerPid; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WindowsPtyAgent.prototype, "pty", {
        get: function () { return this._pty; },
        enumerable: false,
        configurable: true
    });
    WindowsPtyAgent.prototype.resize = function (cols, rows) {
        if (this._useConpty) {
            if (this._exitCode !== undefined) {
                throw new Error('Cannot resize a pty that has already exited');
            }
            this._ptyNative.resize(this._pty, cols, rows, this._useConptyDll);
            return;
        }
        this._ptyNative.resize(this._pid, cols, rows);
    };
    WindowsPtyAgent.prototype.clear = function () {
        if (this._useConpty) {
            this._ptyNative.clear(this._pty, this._useConptyDll);
        }
    };
    WindowsPtyAgent.prototype.kill = function () {
        var _this = this;
        // Tell the agent to kill the pty, this releases handles to the process
        if (this._useConpty) {
            if (!this._useConptyDll) {
                this._inSocket.readable = false;
                this._outSocket.readable = false;
                this._getConsoleProcessList().then(function (consoleProcessList) {
                    consoleProcessList.forEach(function (pid) {
                        try {
                            process.kill(pid);
                        }
                        catch (e) {
                            // Ignore if process cannot be found (kill ESRCH error)
                        }
                    });
                });
                this._ptyNative.kill(this._pty, this._useConptyDll);
                this._conoutSocketWorker.dispose();
            }
            else {
                // Close the input write handle to signal the end of session.
                this._inSocket.destroy();
                this._ptyNative.kill(this._pty, this._useConptyDll);
                this._outSocket.on('data', function () {
                    _this._conoutSocketWorker.dispose();
                });
            }
        }
        else {
            // Because pty.kill closes the handle, it will kill most processes by itself.
            // Process IDs can be reused as soon as all handles to them are
            // dropped, so we want to immediately kill the entire console process list.
            // If we do not force kill all processes here, node servers in particular
            // seem to become detached and remain running (see
            // Microsoft/vscode#26807).
            var processList = this._ptyNative.getProcessList(this._pid);
            this._ptyNative.kill(this._pid, this._innerPid);
            processList.forEach(function (pid) {
                try {
                    process.kill(pid);
                }
                catch (e) {
                    // Ignore if process cannot be found (kill ESRCH error)
                }
            });
        }
    };
    WindowsPtyAgent.prototype._getConsoleProcessList = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var agent = child_process_1.fork(path.join(__dirname, 'conpty_console_list_agent'), [_this._innerPid.toString()]);
            agent.on('message', function (message) {
                clearTimeout(timeout);
                resolve(message.consoleProcessList);
            });
            var timeout = setTimeout(function () {
                // Something went wrong, just send back the shell PID
                agent.kill();
                resolve([_this._innerPid]);
            }, 5000);
        });
    };
    Object.defineProperty(WindowsPtyAgent.prototype, "exitCode", {
        get: function () {
            if (this._useConpty) {
                return this._exitCode;
            }
            var winptyExitCode = this._ptyNative.getExitCode(this._innerPid);
            return winptyExitCode === -1 ? undefined : winptyExitCode;
        },
        enumerable: false,
        configurable: true
    });
    WindowsPtyAgent.prototype._getWindowsBuildNumber = function () {
        var osVersion = (/(\d+)\.(\d+)\.(\d+)/g).exec(os.release());
        var buildNumber = 0;
        if (osVersion && osVersion.length === 4) {
            buildNumber = parseInt(osVersion[3]);
        }
        return buildNumber;
    };
    WindowsPtyAgent.prototype._generatePipeName = function () {
        return "conpty-" + Math.random() * 10000000;
    };
    /**
     * Triggered from the native side when a contpy process exits.
     */
    WindowsPtyAgent.prototype._$onProcessExit = function (exitCode) {
        var _this = this;
        this._exitCode = exitCode;
        if (!this._useConptyDll) {
            this._flushDataAndCleanUp();
            this._outSocket.on('data', function () { return _this._flushDataAndCleanUp(); });
        }
    };
    WindowsPtyAgent.prototype._flushDataAndCleanUp = function () {
        var _this = this;
        if (this._useConptyDll) {
            return;
        }
        if (this._closeTimeout) {
            clearTimeout(this._closeTimeout);
        }
        this._closeTimeout = setTimeout(function () { return _this._cleanUpProcess(); }, FLUSH_DATA_INTERVAL);
    };
    WindowsPtyAgent.prototype._cleanUpProcess = function () {
        if (this._useConptyDll) {
            return;
        }
        this._inSocket.readable = false;
        this._outSocket.readable = false;
        this._outSocket.destroy();
    };
    return WindowsPtyAgent;
}());
exports.WindowsPtyAgent = WindowsPtyAgent;
// Convert argc/argv into a Win32 command-line following the escaping convention
// documented on MSDN (e.g. see CommandLineToArgvW documentation). Copied from
// winpty project.
function argsToCommandLine(file, args) {
    if (isCommandLine(args)) {
        if (args.length === 0) {
            return file;
        }
        return argsToCommandLine(file, []) + " " + args;
    }
    var argv = [file];
    Array.prototype.push.apply(argv, args);
    var result = '';
    for (var argIndex = 0; argIndex < argv.length; argIndex++) {
        if (argIndex > 0) {
            result += ' ';
        }
        var arg = argv[argIndex];
        // if it is empty or it contains whitespace and is not already quoted
        var hasLopsidedEnclosingQuote = xOr((arg[0] !== '"'), (arg[arg.length - 1] !== '"'));
        var hasNoEnclosingQuotes = ((arg[0] !== '"') && (arg[arg.length - 1] !== '"'));
        var quote = arg === '' ||
            (arg.indexOf(' ') !== -1 ||
                arg.indexOf('\t') !== -1) &&
                ((arg.length > 1) &&
                    (hasLopsidedEnclosingQuote || hasNoEnclosingQuotes));
        if (quote) {
            result += '\"';
        }
        var bsCount = 0;
        for (var i = 0; i < arg.length; i++) {
            var p = arg[i];
            if (p === '\\') {
                bsCount++;
            }
            else if (p === '"') {
                result += repeatText('\\', bsCount * 2 + 1);
                result += '"';
                bsCount = 0;
            }
            else {
                result += repeatText('\\', bsCount);
                bsCount = 0;
                result += p;
            }
        }
        if (quote) {
            result += repeatText('\\', bsCount * 2);
            result += '\"';
        }
        else {
            result += repeatText('\\', bsCount);
        }
    }
    return result;
}
exports.argsToCommandLine = argsToCommandLine;
function isCommandLine(args) {
    return typeof args === 'string';
}
function repeatText(text, count) {
    var result = '';
    for (var i = 0; i < count; i++) {
        result += text;
    }
    return result;
}
function xOr(arg1, arg2) {
    return ((arg1 && !arg2) || (!arg1 && arg2));
}
//# sourceMappingURL=windowsPtyAgent.js.map

/***/ }),

/***/ 171:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


/**
 * Copyright (c) 2012-2015, Christopher Jeffrey, Peter Sunde (MIT License)
 * Copyright (c) 2016, Daniel Imms (MIT License).
 * Copyright (c) 2018, Microsoft Corporation (MIT License).
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WindowsTerminal = void 0;
var terminal_1 = __nccwpck_require__(600);
var windowsPtyAgent_1 = __nccwpck_require__(791);
var utils_1 = __nccwpck_require__(463);
var DEFAULT_FILE = 'cmd.exe';
var DEFAULT_NAME = 'Windows Shell';
var WindowsTerminal = /** @class */ (function (_super) {
    __extends(WindowsTerminal, _super);
    function WindowsTerminal(file, args, opt) {
        var _this = _super.call(this, opt) || this;
        _this._checkType('args', args, 'string', true);
        // Initialize arguments
        args = args || [];
        file = file || DEFAULT_FILE;
        opt = opt || {};
        opt.env = opt.env || process.env;
        if (opt.encoding) {
            console.warn('Setting encoding on Windows is not supported');
        }
        var env = utils_1.assign({}, opt.env);
        _this._cols = opt.cols || terminal_1.DEFAULT_COLS;
        _this._rows = opt.rows || terminal_1.DEFAULT_ROWS;
        var cwd = opt.cwd || process.cwd();
        var name = opt.name || env.TERM || DEFAULT_NAME;
        var parsedEnv = _this._parseEnv(env);
        // If the terminal is ready
        _this._isReady = false;
        // Functions that need to run after `ready` event is emitted.
        _this._deferreds = [];
        // Create new termal.
        _this._agent = new windowsPtyAgent_1.WindowsPtyAgent(file, args, parsedEnv, cwd, _this._cols, _this._rows, false, opt.useConpty, opt.useConptyDll, opt.conptyInheritCursor);
        _this._socket = _this._agent.outSocket;
        // Not available until `ready` event emitted.
        _this._pid = _this._agent.innerPid;
        _this._fd = _this._agent.fd;
        _this._pty = _this._agent.pty;
        // The forked windows terminal is not available until `ready` event is
        // emitted.
        _this._socket.on('ready_datapipe', function () {
            // Run deferreds and set ready state once the first data event is received.
            _this._socket.once('data', function () {
                // Wait until the first data event is fired then we can run deferreds.
                if (!_this._isReady) {
                    // Terminal is now ready and we can avoid having to defer method
                    // calls.
                    _this._isReady = true;
                    // Execute all deferred methods
                    _this._deferreds.forEach(function (fn) {
                        // NB! In order to ensure that `this` has all its references
                        // updated any variable that need to be available in `this` before
                        // the deferred is run has to be declared above this forEach
                        // statement.
                        fn.run();
                    });
                    // Reset
                    _this._deferreds = [];
                }
            });
            // Shutdown if `error` event is emitted.
            _this._socket.on('error', function (err) {
                // Close terminal session.
                _this._close();
                // EIO, happens when someone closes our child process: the only process
                // in the terminal.
                // node < 0.6.14: errno 5
                // node >= 0.6.14: read EIO
                if (err.code) {
                    if (~err.code.indexOf('errno 5') || ~err.code.indexOf('EIO'))
                        return;
                }
                // Throw anything else.
                if (_this.listeners('error').length < 2) {
                    throw err;
                }
            });
            // Cleanup after the socket is closed.
            _this._socket.on('close', function () {
                _this.emit('exit', _this._agent.exitCode);
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
    WindowsTerminal.prototype._write = function (data) {
        this._defer(this._doWrite, data);
    };
    WindowsTerminal.prototype._doWrite = function (data) {
        this._agent.inSocket.write(data);
    };
    /**
     * openpty
     */
    WindowsTerminal.open = function (options) {
        throw new Error('open() not supported on windows, use Fork() instead.');
    };
    /**
     * TTY
     */
    WindowsTerminal.prototype.resize = function (cols, rows) {
        var _this = this;
        if (cols <= 0 || rows <= 0 || isNaN(cols) || isNaN(rows) || cols === Infinity || rows === Infinity) {
            throw new Error('resizing must be done using positive cols and rows');
        }
        this._deferNoArgs(function () {
            _this._agent.resize(cols, rows);
            _this._cols = cols;
            _this._rows = rows;
        });
    };
    WindowsTerminal.prototype.clear = function () {
        var _this = this;
        this._deferNoArgs(function () {
            _this._agent.clear();
        });
    };
    WindowsTerminal.prototype.destroy = function () {
        var _this = this;
        this._deferNoArgs(function () {
            _this.kill();
        });
    };
    WindowsTerminal.prototype.kill = function (signal) {
        var _this = this;
        this._deferNoArgs(function () {
            if (signal) {
                throw new Error('Signals not supported on windows.');
            }
            _this._close();
            _this._agent.kill();
        });
    };
    WindowsTerminal.prototype._deferNoArgs = function (deferredFn) {
        var _this = this;
        // If the terminal is ready, execute.
        if (this._isReady) {
            deferredFn.call(this);
            return;
        }
        // Queue until terminal is ready.
        this._deferreds.push({
            run: function () { return deferredFn.call(_this); }
        });
    };
    WindowsTerminal.prototype._defer = function (deferredFn, arg) {
        var _this = this;
        // If the terminal is ready, execute.
        if (this._isReady) {
            deferredFn.call(this, arg);
            return;
        }
        // Queue until terminal is ready.
        this._deferreds.push({
            run: function () { return deferredFn.call(_this, arg); }
        });
    };
    Object.defineProperty(WindowsTerminal.prototype, "process", {
        get: function () { return this._name; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WindowsTerminal.prototype, "master", {
        get: function () { throw new Error('master is not supported on Windows'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WindowsTerminal.prototype, "slave", {
        get: function () { throw new Error('slave is not supported on Windows'); },
        enumerable: false,
        configurable: true
    });
    return WindowsTerminal;
}(terminal_1.Terminal));
exports.WindowsTerminal = WindowsTerminal;
//# sourceMappingURL=windowsTerminal.js.map

/***/ }),

/***/ 407:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
const pty = __importStar(__nccwpck_require__(478));
const OTPAuth = __importStar(__nccwpck_require__(940));
const nodeDataChannel = __importStar(__nccwpck_require__(649));
const crypto_1 = __nccwpck_require__(982);
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:7373';
const SHELL = process.env.SHELL || '/bin/bash';
const OTP_SECRET = process.env.OTP_SECRET || '';
// Create TOTP instance for validation
function createTOTP(secret) {
    return new OTPAuth.TOTP({
        issuer: 'ActionTerminal',
        label: 'Terminal',
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(secret),
    });
}
// Validate OTP code against secret
function validateOTP(secret, code) {
    try {
        const totp = createTOTP(secret);
        const delta = totp.validate({ token: code, window: 1 });
        return delta !== null;
    }
    catch (err) {
        console.error('OTP validation error:', err);
        return false;
    }
}
// Get GitHub Actions OIDC token or dev token
async function getOIDCToken() {
    if (process.env.DEV_MODE === 'true') {
        const actor = process.env.GITHUB_ACTOR || process.env.USER || 'devuser';
        const repo = process.env.GITHUB_REPOSITORY || 'dev/repo';
        const runId = process.env.GITHUB_RUN_ID || (0, crypto_1.randomInt)(1000, 9999).toString();
        console.log(`DEV MODE: Using mock token for actor=${actor}`);
        return `dev:${actor}:${repo}:${runId}`;
    }
    const requestURL = process.env.ACTIONS_ID_TOKEN_REQUEST_URL;
    const requestToken = process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN;
    if (!requestURL || !requestToken) {
        throw new Error('OIDC token not available. Ensure the workflow has "id-token: write" permission.');
    }
    const url = new URL(requestURL);
    url.searchParams.set('audience', SERVER_URL);
    const resp = await fetch(url.toString(), {
        headers: {
            Authorization: `Bearer ${requestToken}`,
            Accept: 'application/json',
        },
    });
    if (!resp.ok) {
        throw new Error(`Failed to get OIDC token: ${resp.status} ${await resp.text()}`);
    }
    const data = await resp.json();
    return data.value;
}
// Polyfill EventSource for Node.js
class EventSource {
    url;
    authHeader;
    controller = null;
    onopen = null;
    onerror = null;
    onmessage = null;
    constructor(url, authHeader) {
        this.url = url;
        this.authHeader = authHeader;
        this.connect();
    }
    async connect() {
        this.controller = new AbortController();
        try {
            const headers = {
                'Accept': 'text/event-stream',
                'Authorization': this.authHeader,
            };
            const resp = await fetch(this.url, {
                headers: headers,
                signal: this.controller.signal,
            });
            if (!resp.ok || !resp.body) {
                throw new Error(`SSE connection failed: ${resp.status}`);
            }
            this.onopen?.();
            const reader = resp.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            while (true) {
                const { done, value } = await reader.read();
                if (done)
                    break;
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        this.onmessage?.({ data });
                    }
                }
            }
        }
        catch (err) {
            if (err.name !== 'AbortError') {
                this.onerror?.(err);
                // Reconnect after delay
                setTimeout(() => this.connect(), 5000);
            }
        }
    }
    close() {
        this.controller?.abort();
    }
}
async function main() {
    console.log(`Starting terminal client, connecting to server: ${SERVER_URL}`);
    // Validate OTP secret
    if (!OTP_SECRET && process.env.DEV_MODE !== 'true') {
        console.error('OTP_SECRET is required for secure terminal access');
        process.exit(1);
    }
    if (OTP_SECRET) {
        try {
            createTOTP(OTP_SECRET);
            console.log('OTP secret configured - browser must provide valid code');
        }
        catch (err) {
            console.error('Invalid OTP secret:', err);
            process.exit(1);
        }
    }
    // Get OIDC token
    let oidcToken;
    try {
        oidcToken = await getOIDCToken();
        console.log('Obtained OIDC token');
    }
    catch (err) {
        console.error('Failed to get OIDC token:', err);
        process.exit(1);
    }
    const pc = new nodeDataChannel.PeerConnection("runnerClient", {
        iceServers: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'],
    });
    const iceCandidates = [];
    pc.onLocalCandidate((candidate, mid) => {
        iceCandidates.push({ candidate, mid });
    });
    let offer = null;
    pc.onLocalDescription((sdp, type) => {
        offer = { sdp, type };
    });
    // Create a data channel to trigger offer generation
    const dc = pc.createDataChannel("terminal");
    dc.onOpen(() => {
        console.log('Local data channel opened');
    });
    // Wait for ICE candidates to be gathered
    await new Promise(resolve => setTimeout(resolve, 15000));
    if (iceCandidates.length === 0) {
        console.error('No ICE candidates gathered after 10 seconds');
        process.exit(1);
    }
    if (!offer) {
        console.error('No local description (offer) generated');
        process.exit(1);
    }
    console.log(`Gathered ICE candidates ${iceCandidates.length}`);
    // Register with server
    try {
        const body = JSON.stringify({ ice: iceCandidates, offer: offer });
        const resp = await fetch(`${SERVER_URL}/api/runner/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + oidcToken },
            body: body,
        });
        if (!resp.ok) {
            throw new Error(`Registration failed: ${resp.status} - ${await resp.text()}`);
        }
        console.log('Registered with server');
    }
    catch (err) {
        console.error('Failed to register:', err);
        process.exit(1);
    }
    // Shell will be created after setup message is received
    let shell = null;
    // Handle incoming signaling messages via SSE
    console.log('Connecting to signaling channel...');
    const eventSource = new EventSource(`${SERVER_URL}/api/runner/signal`, 'Bearer ' + oidcToken);
    eventSource.onopen = () => {
        console.log('SRE channel connected');
        console.log('Waiting for server to signal browser ICE Candidates. Press Ctrl+C to exit.');
        console.log(`Connect at: ${SERVER_URL}`);
    };
    eventSource.onerror = (err) => {
        console.error('SRE channel error:', err);
    };
    // Set up data channel handler before receiving answer
    pc.onStateChange((state) => {
        console.log('Connection state:', state);
        if (state === 'closed') {
            console.log('Connection closed, exiting');
            if (shell) {
                shell.kill();
            }
            eventSource.close();
            process.exit(0);
        }
    });
    // Track if data channel is open
    let dcOpen = false;
    let otpVerified = false;
    // The data channel we created will be used
    dc.onOpen(() => {
        console.log('Data channel opened, waiting for OTP verification');
        dcOpen = true;
        // Don't flush buffer yet - wait for OTP verification
    });
    dc.onMessage((data) => {
        const text = typeof data === 'string' ? data : new TextDecoder().decode(data);
        if (!otpVerified) {
            // Expecting setup message with OTP and terminal dimensions
            try {
                const msg = JSON.parse(text);
                if (msg.type === 'setup' && msg.code) {
                    console.log('Received setup message, validating OTP...');
                    // In dev mode, accept "000000" as a valid code for testing
                    const isDevBypass = process.env.DEV_MODE === 'true' && msg.code === '000000';
                    // In dev mode without OTP_SECRET, accept any code
                    const isValid = isDevBypass || validateOTP(OTP_SECRET, msg.code);
                    if (isValid) {
                        console.log('OTP verified successfully');
                        otpVerified = true;
                        // Create PTY with dimensions from setup message
                        const cols = msg.cols && msg.cols > 0 ? msg.cols : 80;
                        const rows = msg.rows && msg.rows > 0 ? msg.rows : 24;
                        shell = pty.spawn(SHELL, [], {
                            name: 'xterm-256color',
                            cols,
                            rows,
                            cwd: process.env.GITHUB_WORKSPACE || process.cwd(),
                            env: process.env,
                        });
                        console.log(`PTY started with dimensions ${cols}x${rows}, PID:`, shell.pid);
                        // Set up shell data handler
                        shell.onData((shellData) => {
                            if (dcOpen && otpVerified) {
                                try {
                                    dc.sendMessage(shellData);
                                }
                                catch (e) {
                                    console.log(e);
                                }
                            }
                        });
                        setTimeout(() => {
                            shell?.write('clear && echo "Terminal session started. Type commands below."\r');
                        }, 1000);
                        // Send success response
                        dc.sendMessage(JSON.stringify({ type: 'setup-complete', success: true }) + '\n');
                    }
                    else {
                        console.log('OTP verification failed - invalid code');
                        dc.sendMessage(JSON.stringify({ type: 'setup-complete', success: false, message: 'Invalid OTP code' }) + '\n');
                        // Close the connection after a brief delay to allow message to be sent
                        setTimeout(() => {
                            dc.close();
                        }, 100);
                    }
                }
            }
            catch (e) {
                console.log('Received non-JSON message before OTP verification, ignoring');
            }
            return;
        }
        // OTP verified - forward terminal data to PTY
        if (shell) {
            shell.write(text);
        }
    });
    dc.onClosed(() => {
        console.log('Data channel closed');
        dcOpen = false;
        if (shell) {
            shell.kill();
        }
    });
    let remoteDescriptionSet = false;
    eventSource.onmessage = async (event) => {
        try {
            const msg = JSON.parse(event.data);
            if (msg.type === 'answer' && msg.answer) {
                // Set the browser's answer as remote description
                console.log('Setting remote description (answer)');
                pc.setRemoteDescription(msg.answer.sdp, nodeDataChannel.DescriptionType.Answer);
                remoteDescriptionSet = true;
            }
            else if (msg.type === 'candidate' && msg.candidate && msg.mid) {
                // Add browser's ICE candidate
                if (remoteDescriptionSet) {
                    pc.addRemoteCandidate(msg.candidate, msg.mid);
                }
                else {
                    console.log('Queuing ICE candidate (remote description not set yet)');
                    // In a production app, you'd queue these and add them after setRemoteDescription
                    // For simplicity, we'll just try to add it anyway as node-datachannel may handle this
                    pc.addRemoteCandidate(msg.candidate, msg.mid);
                }
            }
        }
        catch (err) {
            console.error('Error handling signal:', err);
        }
    };
    // Keep alive
    await new Promise(() => { });
}
main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});


/***/ }),

/***/ 317:
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ 982:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 434:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 896:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 339:
/***/ ((module) => {

module.exports = require("module");

/***/ }),

/***/ 278:
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ 598:
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),

/***/ 857:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 928:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 203:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 18:
/***/ ((module) => {

module.exports = require("tty");

/***/ }),

/***/ 16:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 167:
/***/ ((module) => {

module.exports = require("worker_threads");

/***/ }),

/***/ 649:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {



Object.defineProperty(exports, "__esModule", ({ value: true }));

var module$1 = __nccwpck_require__(339);
var stream = __nccwpck_require__(203);
var events = __nccwpck_require__(434);

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
// createRequire is native in node version >= 12
const require$1 = module$1.createRequire((typeof document === 'undefined' ? (__nccwpck_require__(16).pathToFileURL)(__filename).href : (_documentCurrentScript && _documentCurrentScript.src || new URL('index.cjs', document.baseURI).href)));

const nodeDataChannel = require$1('../build/Release/node_datachannel.node');

/**
 * Turns a node-datachannel DataChannel into a real Node.js stream, complete with buffering,
 * backpressure (up to a point - if the buffer fills up, messages are dropped), and
 * support for piping data elsewhere.
 *
 * Read & written data may be either UTF-8 strings or Buffers - this difference exists at
 * the protocol level, and is preserved here throughout.
 */
class DataChannelStream extends stream.Duplex {
    constructor(rawChannel, streamOptions) {
        super({
            allowHalfOpen: false, // Default to autoclose on end().
            ...streamOptions,
            objectMode: true, // Preserve the string/buffer distinction (WebRTC treats them differently)
        });

        this._rawChannel = rawChannel;
        this._readActive = true;

        rawChannel.onMessage((msg) => {
            if (!this._readActive) return; // If the buffer is full, drop messages.

            // If the push is rejected, we pause reading until the next call to _read().
            this._readActive = this.push(msg);
        });

        // When the DataChannel closes, the readable & writable ends close
        rawChannel.onClosed(() => {
            this.push(null);
            this.destroy();
        });

        rawChannel.onError((errMsg) => {
            this.destroy(new Error(`DataChannel error: ${errMsg}`));
        });

        // Buffer all writes until the DataChannel opens
        if (!rawChannel.isOpen()) {
            this.cork();
            rawChannel.onOpen(() => this.uncork());
        }
    }

    _read() {
        // Stop dropping messages, if the buffer filling up meant we were doing so before.
        this._readActive = true;
    }

    _write(chunk, encoding, callback) {
        let sentOk;

        try {
            if (Buffer.isBuffer(chunk)) {
                sentOk = this._rawChannel.sendMessageBinary(chunk);
            } else if (typeof chunk === 'string') {
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
            callback(new Error('Failed to write to DataChannel'));
        }
    }

    _final(callback) {
        if (!this.allowHalfOpen) this.destroy();
        callback(null);
    }

    _destroy(maybeErr, callback) {
        // When the stream is destroyed, we close the DataChannel.
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
}

class WebSocketServer extends events.EventEmitter {
    #server;
    #clients = [];

    constructor(options) {
        super();
        this.#server = new nodeDataChannel.WebSocketServer(options);

        this.#server.onClient((client) => {
            this.emit('client', client);
            this.#clients.push(client);
        });
    }

    port() {
        return this.#server?.port() || 0;
    }

    stop() {
        this.#clients.forEach((client) => {
            client?.close();
        });
        this.#server?.stop();
        this.#server = null;
        this.removeAllListeners();
    }

    onClient(cb) {
        if (this.#server) this.on('client', cb);
    }
}

const {
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
    WebSocket,
} = nodeDataChannel;

const DescriptionType = {
    Unspec: 'unspec',
    Offer: 'offer',
    Answer: 'answer',
    Pranswer: 'pranswer',
    Rollback: 'rollback',
};

var index = {
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
    WebSocket,
    WebSocketServer,
    DataChannelStream,
};

exports.Audio = Audio;
exports.DataChannel = DataChannel;
exports.DataChannelStream = DataChannelStream;
exports.DescriptionType = DescriptionType;
exports.PeerConnection = PeerConnection;
exports.RtcpReceivingSession = RtcpReceivingSession;
exports.Track = Track;
exports.Video = Video;
exports.WebSocket = WebSocket;
exports.WebSocketServer = WebSocketServer;
exports.cleanup = cleanup;
exports["default"] = index;
exports.initLogger = initLogger;
exports.preload = preload;
exports.setSctpSettings = setSctpSettings;


/***/ }),

/***/ 940:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

//! otpauth 9.4.1 | (c) Héctor Molinero Fernández | MIT | https://github.com/hectorm/otpauth
/// <reference types="./otpauth.d.ts" />
// @ts-nocheck


var crypto = __nccwpck_require__(598);

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var crypto__namespace = /*#__PURE__*/_interopNamespaceDefault(crypto);

/**
 * Converts an integer to an Uint8Array.
 * @param {number} num Integer.
 * @returns {Uint8Array} Uint8Array.
 */ const uintDecode = (num)=>{
    const buf = new ArrayBuffer(8);
    const arr = new Uint8Array(buf);
    let acc = num;
    for(let i = 7; i >= 0; i--){
        if (acc === 0) break;
        arr[i] = acc & 255;
        acc -= arr[i];
        acc /= 256;
    }
    return arr;
};

/**
 * "globalThis" ponyfill.
 * @see [A horrifying globalThis polyfill in universal JavaScript](https://mathiasbynens.be/notes/globalthis)
 * @type {Object.<string, *>}
 */ const globalScope = (()=>{
    if (typeof globalThis === "object") return globalThis;
    else {
        Object.defineProperty(Object.prototype, "__GLOBALTHIS__", {
            get () {
                return this;
            },
            configurable: true
        });
        try {
            // @ts-expect-error
            // eslint-disable-next-line no-undef
            if (typeof __GLOBALTHIS__ !== "undefined") return __GLOBALTHIS__;
        } finally{
            // @ts-expect-error
            delete Object.prototype.__GLOBALTHIS__;
        }
    }
    // Still unable to determine "globalThis", fall back to a naive method.
    if (typeof self !== "undefined") return self;
    else if (typeof window !== "undefined") return window;
    else if (typeof global !== "undefined") return global;
    return undefined;
})();

/**
 * Canonicalizes a hash algorithm name.
 * @param {string} algorithm Hash algorithm name.
 * @returns {"SHA1"|"SHA224"|"SHA256"|"SHA384"|"SHA512"|"SHA3-224"|"SHA3-256"|"SHA3-384"|"SHA3-512"} Canonicalized hash algorithm name.
 */ const canonicalizeAlgorithm = (algorithm)=>{
    switch(true){
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
/**
 * Calculates an HMAC digest.
 * @param {string} algorithm Algorithm.
 * @param {Uint8Array} key Key.
 * @param {Uint8Array} message Message.
 * @returns {Uint8Array} Digest.
 */ const hmacDigest = (algorithm, key, message)=>{
    if (crypto__namespace?.createHmac) {
        const hmac = crypto__namespace.createHmac(algorithm, globalScope.Buffer.from(key));
        hmac.update(globalScope.Buffer.from(message));
        return hmac.digest();
    } else {
        throw new Error("Missing HMAC function");
    }
};

/**
 * RFC 4648 base32 alphabet without pad.
 * @type {string}
 */ const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
/**
 * Converts a base32 string to an Uint8Array (RFC 4648).
 * @see [LinusU/base32-decode](https://github.com/LinusU/base32-decode)
 * @param {string} str Base32 string.
 * @returns {Uint8Array} Uint8Array.
 */ const base32Decode = (str)=>{
    // Remove spaces (although they are not allowed by the spec, some issuers add them for readability).
    str = str.replace(/ /g, "");
    // Canonicalize to all upper case and remove padding if it exists.
    let end = str.length;
    while(str[end - 1] === "=")--end;
    str = (end < str.length ? str.substring(0, end) : str).toUpperCase();
    const buf = new ArrayBuffer(str.length * 5 / 8 | 0);
    const arr = new Uint8Array(buf);
    let bits = 0;
    let value = 0;
    let index = 0;
    for(let i = 0; i < str.length; i++){
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
/**
 * Converts an Uint8Array to a base32 string (RFC 4648).
 * @see [LinusU/base32-encode](https://github.com/LinusU/base32-encode)
 * @param {Uint8Array} arr Uint8Array.
 * @returns {string} Base32 string.
 */ const base32Encode = (arr)=>{
    let bits = 0;
    let value = 0;
    let str = "";
    for(let i = 0; i < arr.length; i++){
        value = value << 8 | arr[i];
        bits += 8;
        while(bits >= 5){
            str += ALPHABET[value >>> bits - 5 & 31];
            bits -= 5;
        }
    }
    if (bits > 0) {
        str += ALPHABET[value << 5 - bits & 31];
    }
    return str;
};

/**
 * Converts a hexadecimal string to an Uint8Array.
 * @param {string} str Hexadecimal string.
 * @returns {Uint8Array} Uint8Array.
 */ const hexDecode = (str)=>{
    // Remove spaces (although they are not allowed by the spec, some issuers add them for readability).
    str = str.replace(/ /g, "");
    const buf = new ArrayBuffer(str.length / 2);
    const arr = new Uint8Array(buf);
    for(let i = 0; i < str.length; i += 2){
        arr[i / 2] = parseInt(str.substring(i, i + 2), 16);
    }
    return arr;
};
/**
 * Converts an Uint8Array to a hexadecimal string.
 * @param {Uint8Array} arr Uint8Array.
 * @returns {string} Hexadecimal string.
 */ const hexEncode = (arr)=>{
    let str = "";
    for(let i = 0; i < arr.length; i++){
        const hex = arr[i].toString(16);
        if (hex.length === 1) str += "0";
        str += hex;
    }
    return str.toUpperCase();
};

/**
 * Converts a Latin-1 string to an Uint8Array.
 * @param {string} str Latin-1 string.
 * @returns {Uint8Array} Uint8Array.
 */ const latin1Decode = (str)=>{
    const buf = new ArrayBuffer(str.length);
    const arr = new Uint8Array(buf);
    for(let i = 0; i < str.length; i++){
        arr[i] = str.charCodeAt(i) & 0xff;
    }
    return arr;
};
/**
 * Converts an Uint8Array to a Latin-1 string.
 * @param {Uint8Array} arr Uint8Array.
 * @returns {string} Latin-1 string.
 */ const latin1Encode = (arr)=>{
    let str = "";
    for(let i = 0; i < arr.length; i++){
        str += String.fromCharCode(arr[i]);
    }
    return str;
};

/**
 * TextEncoder instance.
 * @type {TextEncoder|null}
 */ const ENCODER = globalScope.TextEncoder ? new globalScope.TextEncoder() : null;
/**
 * TextDecoder instance.
 * @type {TextDecoder|null}
 */ const DECODER = globalScope.TextDecoder ? new globalScope.TextDecoder() : null;
/**
 * Converts an UTF-8 string to an Uint8Array.
 * @param {string} str String.
 * @returns {Uint8Array} Uint8Array.
 */ const utf8Decode = (str)=>{
    if (!ENCODER) {
        throw new Error("Encoding API not available");
    }
    return ENCODER.encode(str);
};
/**
 * Converts an Uint8Array to an UTF-8 string.
 * @param {Uint8Array} arr Uint8Array.
 * @returns {string} String.
 */ const utf8Encode = (arr)=>{
    if (!DECODER) {
        throw new Error("Encoding API not available");
    }
    return DECODER.decode(arr);
};

/**
 * Returns random bytes.
 * @param {number} size Size.
 * @returns {Uint8Array} Random bytes.
 */ const randomBytes = (size)=>{
    if (crypto__namespace?.randomBytes) {
        return crypto__namespace.randomBytes(size);
    } else if (globalScope.crypto?.getRandomValues) {
        return globalScope.crypto.getRandomValues(new Uint8Array(size));
    } else {
        throw new Error("Cryptography API not available");
    }
};

/**
 * OTP secret key.
 */ class Secret {
    /**
   * Converts a Latin-1 string to a Secret object.
   * @param {string} str Latin-1 string.
   * @returns {Secret} Secret object.
   */ static fromLatin1(str) {
        return new Secret({
            buffer: latin1Decode(str).buffer
        });
    }
    /**
   * Converts an UTF-8 string to a Secret object.
   * @param {string} str UTF-8 string.
   * @returns {Secret} Secret object.
   */ static fromUTF8(str) {
        return new Secret({
            buffer: utf8Decode(str).buffer
        });
    }
    /**
   * Converts a base32 string to a Secret object.
   * @param {string} str Base32 string.
   * @returns {Secret} Secret object.
   */ static fromBase32(str) {
        return new Secret({
            buffer: base32Decode(str).buffer
        });
    }
    /**
   * Converts a hexadecimal string to a Secret object.
   * @param {string} str Hexadecimal string.
   * @returns {Secret} Secret object.
   */ static fromHex(str) {
        return new Secret({
            buffer: hexDecode(str).buffer
        });
    }
    /**
   * Secret key buffer.
   * @deprecated For backward compatibility, the "bytes" property should be used instead.
   * @type {ArrayBufferLike}
   */ get buffer() {
        return this.bytes.buffer;
    }
    /**
   * Latin-1 string representation of secret key.
   * @type {string}
   */ get latin1() {
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
   */ get utf8() {
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
   */ get base32() {
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
   */ get hex() {
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
   */ constructor({ buffer, size = 20 } = {}){
        /**
     * Secret key.
     * @type {Uint8Array}
     * @readonly
     */ this.bytes = typeof buffer === "undefined" ? randomBytes(size) : new Uint8Array(buffer);
        // Prevent the "bytes" property from being modified.
        Object.defineProperty(this, "bytes", {
            enumerable: true,
            writable: false,
            configurable: false,
            value: this.bytes
        });
    }
}

/**
 * Returns true if a is equal to b, without leaking timing information that would allow an attacker to guess one of the values.
 * @param {string} a String a.
 * @param {string} b String b.
 * @returns {boolean} Equality result.
 */ const timingSafeEqual = (a, b)=>{
    if (crypto__namespace?.timingSafeEqual) {
        return crypto__namespace.timingSafeEqual(globalScope.Buffer.from(a), globalScope.Buffer.from(b));
    } else {
        if (a.length !== b.length) {
            throw new TypeError("Input strings must have the same length");
        }
        let i = -1;
        let out = 0;
        while(++i < a.length){
            out |= a.charCodeAt(i) ^ b.charCodeAt(i);
        }
        return out === 0;
    }
};

/**
 * HOTP: An HMAC-based One-time Password Algorithm.
 * @see [RFC 4226](https://datatracker.ietf.org/doc/html/rfc4226)
 */ class HOTP {
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
   */ static get defaults() {
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
   */ static generate({ secret, algorithm = HOTP.defaults.algorithm, digits = HOTP.defaults.digits, counter = HOTP.defaults.counter }) {
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
   */ generate({ counter = this.counter++ } = {}) {
        return HOTP.generate({
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
   */ static validate({ token, secret, algorithm, digits = HOTP.defaults.digits, counter = HOTP.defaults.counter, window = HOTP.defaults.window }) {
        // Return early if the token length does not match the digit number.
        if (token.length !== digits) return null;
        let delta = null;
        const check = (/** @type {number} */ i)=>{
            const generatedToken = HOTP.generate({
                secret,
                algorithm,
                digits,
                counter: i
            });
            if (timingSafeEqual(token, generatedToken)) {
                delta = i - counter;
            }
        };
        check(counter);
        for(let i = 1; i <= window && delta === null; ++i){
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
   */ validate({ token, counter = this.counter, window }) {
        return HOTP.validate({
            token,
            secret: this.secret,
            algorithm: this.algorithm,
            digits: this.digits,
            counter,
            window
        });
    }
    /**
   * Returns a Google Authenticator key URI.
   * @returns {string} URI.
   */ toString() {
        const e = encodeURIComponent;
        return "otpauth://hotp/" + `${this.issuer.length > 0 ? this.issuerInLabel ? `${e(this.issuer)}:${e(this.label)}?issuer=${e(this.issuer)}&` : `${e(this.label)}?issuer=${e(this.issuer)}&` : `${e(this.label)}?`}` + `secret=${e(this.secret.base32)}&` + `algorithm=${e(this.algorithm)}&` + `digits=${e(this.digits)}&` + `counter=${e(this.counter)}`;
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
   */ constructor({ issuer = HOTP.defaults.issuer, label = HOTP.defaults.label, issuerInLabel = HOTP.defaults.issuerInLabel, secret = new Secret(), algorithm = HOTP.defaults.algorithm, digits = HOTP.defaults.digits, counter = HOTP.defaults.counter } = {}){
        /**
     * Account provider.
     * @type {string}
     */ this.issuer = issuer;
        /**
     * Account label.
     * @type {string}
     */ this.label = label;
        /**
     * Include issuer prefix in label.
     * @type {boolean}
     */ this.issuerInLabel = issuerInLabel;
        /**
     * Secret key.
     * @type {Secret}
     */ this.secret = typeof secret === "string" ? Secret.fromBase32(secret) : secret;
        /**
     * HMAC hashing algorithm.
     * @type {string}
     */ this.algorithm = canonicalizeAlgorithm(algorithm);
        /**
     * Token length.
     * @type {number}
     */ this.digits = digits;
        /**
     * Initial counter value.
     * @type {number}
     */ this.counter = counter;
    }
}

/**
 * TOTP: Time-Based One-Time Password Algorithm.
 * @see [RFC 6238](https://datatracker.ietf.org/doc/html/rfc6238)
 */ class TOTP {
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
   */ static get defaults() {
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
   */ static counter({ period = TOTP.defaults.period, timestamp = Date.now() } = {}) {
        return Math.floor(timestamp / 1000 / period);
    }
    /**
   * Calculates the counter. i.e. the number of periods since timestamp 0.
   * @param {Object} [config] Configuration options.
   * @param {number} [config.timestamp=Date.now] Timestamp value in milliseconds.
   * @returns {number} Counter.
   */ counter({ timestamp = Date.now() } = {}) {
        return TOTP.counter({
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
   */ static remaining({ period = TOTP.defaults.period, timestamp = Date.now() } = {}) {
        return period * 1000 - timestamp % (period * 1000);
    }
    /**
   * Calculates the remaining time in milliseconds until the next token is generated.
   * @param {Object} [config] Configuration options.
   * @param {number} [config.timestamp=Date.now] Timestamp value in milliseconds.
   * @returns {number} counter.
   */ remaining({ timestamp = Date.now() } = {}) {
        return TOTP.remaining({
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
   */ static generate({ secret, algorithm, digits, period = TOTP.defaults.period, timestamp = Date.now() }) {
        return HOTP.generate({
            secret,
            algorithm,
            digits,
            counter: TOTP.counter({
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
   */ generate({ timestamp = Date.now() } = {}) {
        return TOTP.generate({
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
   */ static validate({ token, secret, algorithm, digits, period = TOTP.defaults.period, timestamp = Date.now(), window }) {
        return HOTP.validate({
            token,
            secret,
            algorithm,
            digits,
            counter: TOTP.counter({
                period,
                timestamp
            }),
            window
        });
    }
    /**
   * Validates a TOTP token.
   * @param {Object} config Configuration options.
   * @param {string} config.token Token value.
   * @param {number} [config.timestamp=Date.now] Timestamp value in milliseconds.
   * @param {number} [config.window=1] Window of counter values to test.
   * @returns {number|null} Token delta or null if it is not found in the search window, in which case it should be considered invalid.
   */ validate({ token, timestamp, window }) {
        return TOTP.validate({
            token,
            secret: this.secret,
            algorithm: this.algorithm,
            digits: this.digits,
            period: this.period,
            timestamp,
            window
        });
    }
    /**
   * Returns a Google Authenticator key URI.
   * @returns {string} URI.
   */ toString() {
        const e = encodeURIComponent;
        return "otpauth://totp/" + `${this.issuer.length > 0 ? this.issuerInLabel ? `${e(this.issuer)}:${e(this.label)}?issuer=${e(this.issuer)}&` : `${e(this.label)}?issuer=${e(this.issuer)}&` : `${e(this.label)}?`}` + `secret=${e(this.secret.base32)}&` + `algorithm=${e(this.algorithm)}&` + `digits=${e(this.digits)}&` + `period=${e(this.period)}`;
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
   */ constructor({ issuer = TOTP.defaults.issuer, label = TOTP.defaults.label, issuerInLabel = TOTP.defaults.issuerInLabel, secret = new Secret(), algorithm = TOTP.defaults.algorithm, digits = TOTP.defaults.digits, period = TOTP.defaults.period } = {}){
        /**
     * Account provider.
     * @type {string}
     */ this.issuer = issuer;
        /**
     * Account label.
     * @type {string}
     */ this.label = label;
        /**
     * Include issuer prefix in label.
     * @type {boolean}
     */ this.issuerInLabel = issuerInLabel;
        /**
     * Secret key.
     * @type {Secret}
     */ this.secret = typeof secret === "string" ? Secret.fromBase32(secret) : secret;
        /**
     * HMAC hashing algorithm.
     * @type {string}
     */ this.algorithm = canonicalizeAlgorithm(algorithm);
        /**
     * Token length.
     * @type {number}
     */ this.digits = digits;
        /**
     * Token time-step duration.
     * @type {number}
     */ this.period = period;
    }
}

/**
 * Key URI regex (otpauth://TYPE/[ISSUER:]LABEL?PARAMETERS).
 * @type {RegExp}
 */ const OTPURI_REGEX = /^otpauth:\/\/([ht]otp)\/(.+)\?([A-Z0-9.~_-]+=[^?&]*(?:&[A-Z0-9.~_-]+=[^?&]*)*)$/i;
/**
 * RFC 4648 base32 alphabet with pad.
 * @type {RegExp}
 */ const SECRET_REGEX = /^[2-7A-Z]+=*$/i;
/**
 * Regex for supported algorithms.
 * @type {RegExp}
 */ const ALGORITHM_REGEX = /^SHA(?:1|224|256|384|512|3-224|3-256|3-384|3-512)$/i;
/**
 * Integer regex.
 * @type {RegExp}
 */ const INTEGER_REGEX = /^[+-]?\d+$/;
/**
 * Positive integer regex.
 * @type {RegExp}
 */ const POSITIVE_INTEGER_REGEX = /^\+?[1-9]\d*$/;
/**
 * HOTP/TOTP object/string conversion.
 * @see [Key URI Format](https://github.com/google/google-authenticator/wiki/Key-Uri-Format)
 */ class URI {
    /**
   * Parses a Google Authenticator key URI and returns an HOTP/TOTP object.
   * @param {string} uri Google Authenticator Key URI.
   * @returns {HOTP|TOTP} HOTP/TOTP object.
   */ static parse(uri) {
        let uriGroups;
        try {
            uriGroups = uri.match(OTPURI_REGEX);
        // eslint-disable-next-line no-unused-vars
        } catch (_) {
        /* Handled below */ }
        if (!Array.isArray(uriGroups)) {
            throw new URIError("Invalid URI format");
        }
        // Extract URI groups.
        const uriType = uriGroups[1].toLowerCase();
        const uriLabel = uriGroups[2].split(/(?::|%3A) *(.+)/i, 2).map(decodeURIComponent);
        /** @type {Object.<string, string>} */ const uriParams = uriGroups[3].split("&").reduce((acc, cur)=>{
            const pairArr = cur.split(/=(.*)/, 2).map(decodeURIComponent);
            const pairKey = pairArr[0].toLowerCase();
            const pairVal = pairArr[1];
            /** @type {Object.<string, string>} */ const pairAcc = acc;
            pairAcc[pairKey] = pairVal;
            return pairAcc;
        }, {});
        // 'OTP' will be instantiated with 'config' argument.
        let OTP;
        const config = {};
        if (uriType === "hotp") {
            OTP = HOTP;
            // Counter: required
            if (typeof uriParams.counter !== "undefined" && INTEGER_REGEX.test(uriParams.counter)) {
                config.counter = parseInt(uriParams.counter, 10);
            } else {
                throw new TypeError("Missing or invalid 'counter' parameter");
            }
        } else if (uriType === "totp") {
            OTP = TOTP;
            // Period: optional
            if (typeof uriParams.period !== "undefined") {
                if (POSITIVE_INTEGER_REGEX.test(uriParams.period)) {
                    config.period = parseInt(uriParams.period, 10);
                } else {
                    throw new TypeError("Invalid 'period' parameter");
                }
            }
        } else {
            throw new TypeError("Unknown OTP type");
        }
        // Label: required
        // Issuer: optional
        if (typeof uriParams.issuer !== "undefined") {
            config.issuer = uriParams.issuer;
        }
        if (uriLabel.length === 2) {
            config.label = uriLabel[1];
            if (typeof config.issuer === "undefined" || config.issuer === "") {
                config.issuer = uriLabel[0];
            } else if (uriLabel[0] === "") {
                config.issuerInLabel = false;
            }
        } else {
            config.label = uriLabel[0];
            if (typeof config.issuer !== "undefined" && config.issuer !== "") {
                config.issuerInLabel = false;
            }
        }
        // Secret: required
        if (typeof uriParams.secret !== "undefined" && SECRET_REGEX.test(uriParams.secret)) {
            config.secret = uriParams.secret;
        } else {
            throw new TypeError("Missing or invalid 'secret' parameter");
        }
        // Algorithm: optional
        if (typeof uriParams.algorithm !== "undefined") {
            if (ALGORITHM_REGEX.test(uriParams.algorithm)) {
                config.algorithm = uriParams.algorithm;
            } else {
                throw new TypeError("Invalid 'algorithm' parameter");
            }
        }
        // Digits: optional
        if (typeof uriParams.digits !== "undefined") {
            if (POSITIVE_INTEGER_REGEX.test(uriParams.digits)) {
                config.digits = parseInt(uriParams.digits, 10);
            } else {
                throw new TypeError("Invalid 'digits' parameter");
            }
        }
        return new OTP(config);
    }
    /**
   * Converts an HOTP/TOTP object to a Google Authenticator key URI.
   * @param {HOTP|TOTP} otp HOTP/TOTP object.
   * @returns {string} Google Authenticator Key URI.
   */ static stringify(otp) {
        if (otp instanceof HOTP || otp instanceof TOTP) {
            return otp.toString();
        }
        throw new TypeError("Invalid 'HOTP/TOTP' object");
    }
}

/**
 * Library version.
 * @type {string}
 */ const version = "9.4.1";

exports.HOTP = HOTP;
exports.Secret = Secret;
exports.TOTP = TOTP;
exports.URI = URI;
exports.version = version;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(407);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;