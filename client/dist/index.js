"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod3) => function __require() {
  return mod3 || (0, cb[__getOwnPropNames(cb)[0]])((mod3 = { exports: {} }).exports, mod3), mod3.exports;
};
var __export = (target, all2) => {
  for (var name3 in all2)
    __defProp(target, name3, { get: all2[name3], enumerable: true });
};
var __copyProps = (to, from3, except, desc) => {
  if (from3 && typeof from3 === "object" || typeof from3 === "function") {
    for (let key of __getOwnPropNames(from3))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from3[key], enumerable: !(desc = __getOwnPropDesc(from3, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod3, isNodeMode, target) => (target = mod3 != null ? __create(__getProtoOf(mod3)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod3 || !mod3.__esModule ? __defProp(target, "default", { value: mod3, enumerable: true }) : target,
  mod3
));

// node_modules/hashlru/index.js
var require_hashlru = __commonJS({
  "node_modules/hashlru/index.js"(exports2, module2) {
    module2.exports = function(max) {
      if (!max)
        throw Error("hashlru must have a max value, of type number, greater than 0");
      var size = 0, cache3 = /* @__PURE__ */ Object.create(null), _cache = /* @__PURE__ */ Object.create(null);
      function update2(key, value2) {
        cache3[key] = value2;
        size++;
        if (size >= max) {
          size = 0;
          _cache = cache3;
          cache3 = /* @__PURE__ */ Object.create(null);
        }
      }
      return {
        has: function(key) {
          return cache3[key] !== void 0 || _cache[key] !== void 0;
        },
        remove: function(key) {
          if (cache3[key] !== void 0)
            cache3[key] = void 0;
          if (_cache[key] !== void 0)
            _cache[key] = void 0;
        },
        get: function(key) {
          var v = cache3[key];
          if (v !== void 0)
            return v;
          if ((v = _cache[key]) !== void 0) {
            update2(key, v);
            return v;
          }
        },
        set: function(key, value2) {
          if (cache3[key] !== void 0)
            cache3[key] = value2;
          else
            update2(key, value2);
        },
        clear: function() {
          cache3 = /* @__PURE__ */ Object.create(null);
          _cache = /* @__PURE__ */ Object.create(null);
        }
      };
    };
  }
});

// node_modules/netmask/lib/netmask.js
var require_netmask = __commonJS({
  "node_modules/netmask/lib/netmask.js"(exports2) {
    (function() {
      var Netmask2, atob, chr, chr0, chrA, chra, ip2long, long2ip;
      long2ip = function(long) {
        var a2, b, c2, d2;
        a2 = (long & 255 << 24) >>> 24;
        b = (long & 255 << 16) >>> 16;
        c2 = (long & 255 << 8) >>> 8;
        d2 = long & 255;
        return [a2, b, c2, d2].join(".");
      };
      ip2long = function(ip) {
        var b, c2, i2, j, n2, ref;
        b = [];
        for (i2 = j = 0; j <= 3; i2 = ++j) {
          if (ip.length === 0) {
            break;
          }
          if (i2 > 0) {
            if (ip[0] !== ".") {
              throw new Error("Invalid IP");
            }
            ip = ip.substring(1);
          }
          ref = atob(ip), n2 = ref[0], c2 = ref[1];
          ip = ip.substring(c2);
          b.push(n2);
        }
        if (ip.length !== 0) {
          throw new Error("Invalid IP");
        }
        switch (b.length) {
          case 1:
            if (b[0] > 4294967295) {
              throw new Error("Invalid IP");
            }
            return b[0] >>> 0;
          case 2:
            if (b[0] > 255 || b[1] > 16777215) {
              throw new Error("Invalid IP");
            }
            return (b[0] << 24 | b[1]) >>> 0;
          case 3:
            if (b[0] > 255 || b[1] > 255 || b[2] > 65535) {
              throw new Error("Invalid IP");
            }
            return (b[0] << 24 | b[1] << 16 | b[2]) >>> 0;
          case 4:
            if (b[0] > 255 || b[1] > 255 || b[2] > 255 || b[3] > 255) {
              throw new Error("Invalid IP");
            }
            return (b[0] << 24 | b[1] << 16 | b[2] << 8 | b[3]) >>> 0;
          default:
            throw new Error("Invalid IP");
        }
      };
      chr = function(b) {
        return b.charCodeAt(0);
      };
      chr0 = chr("0");
      chra = chr("a");
      chrA = chr("A");
      atob = function(s2) {
        var base3, dmax, i2, n2, start2;
        n2 = 0;
        base3 = 10;
        dmax = "9";
        i2 = 0;
        if (s2.length > 1 && s2[i2] === "0") {
          if (s2[i2 + 1] === "x" || s2[i2 + 1] === "X") {
            i2 += 2;
            base3 = 16;
          } else if ("0" <= s2[i2 + 1] && s2[i2 + 1] <= "9") {
            i2++;
            base3 = 8;
            dmax = "7";
          }
        }
        start2 = i2;
        while (i2 < s2.length) {
          if ("0" <= s2[i2] && s2[i2] <= dmax) {
            n2 = n2 * base3 + (chr(s2[i2]) - chr0) >>> 0;
          } else if (base3 === 16) {
            if ("a" <= s2[i2] && s2[i2] <= "f") {
              n2 = n2 * base3 + (10 + chr(s2[i2]) - chra) >>> 0;
            } else if ("A" <= s2[i2] && s2[i2] <= "F") {
              n2 = n2 * base3 + (10 + chr(s2[i2]) - chrA) >>> 0;
            } else {
              break;
            }
          } else {
            break;
          }
          if (n2 > 4294967295) {
            throw new Error("too large");
          }
          i2++;
        }
        if (i2 === start2) {
          throw new Error("empty octet");
        }
        return [n2, i2];
      };
      Netmask2 = function() {
        function Netmask3(net, mask) {
          var error, i2, j, ref;
          if (typeof net !== "string") {
            throw new Error("Missing `net' parameter");
          }
          if (!mask) {
            ref = net.split("/", 2), net = ref[0], mask = ref[1];
          }
          if (!mask) {
            mask = 32;
          }
          if (typeof mask === "string" && mask.indexOf(".") > -1) {
            try {
              this.maskLong = ip2long(mask);
            } catch (error1) {
              error = error1;
              throw new Error("Invalid mask: " + mask);
            }
            for (i2 = j = 32; j >= 0; i2 = --j) {
              if (this.maskLong === 4294967295 << 32 - i2 >>> 0) {
                this.bitmask = i2;
                break;
              }
            }
          } else if (mask || mask === 0) {
            this.bitmask = parseInt(mask, 10);
            this.maskLong = 0;
            if (this.bitmask > 0) {
              this.maskLong = 4294967295 << 32 - this.bitmask >>> 0;
            }
          } else {
            throw new Error("Invalid mask: empty");
          }
          try {
            this.netLong = (ip2long(net) & this.maskLong) >>> 0;
          } catch (error1) {
            error = error1;
            throw new Error("Invalid net address: " + net);
          }
          if (!(this.bitmask <= 32)) {
            throw new Error("Invalid mask for ip4: " + mask);
          }
          this.size = Math.pow(2, 32 - this.bitmask);
          this.base = long2ip(this.netLong);
          this.mask = long2ip(this.maskLong);
          this.hostmask = long2ip(~this.maskLong);
          this.first = this.bitmask <= 30 ? long2ip(this.netLong + 1) : this.base;
          this.last = this.bitmask <= 30 ? long2ip(this.netLong + this.size - 2) : long2ip(this.netLong + this.size - 1);
          this.broadcast = this.bitmask <= 30 ? long2ip(this.netLong + this.size - 1) : void 0;
        }
        Netmask3.prototype.contains = function(ip) {
          if (typeof ip === "string" && (ip.indexOf("/") > 0 || ip.split(".").length !== 4)) {
            ip = new Netmask3(ip);
          }
          if (ip instanceof Netmask3) {
            return this.contains(ip.base) && this.contains(ip.broadcast || ip.last);
          } else {
            return (ip2long(ip) & this.maskLong) >>> 0 === (this.netLong & this.maskLong) >>> 0;
          }
        };
        Netmask3.prototype.next = function(count) {
          if (count == null) {
            count = 1;
          }
          return new Netmask3(long2ip(this.netLong + this.size * count), this.mask);
        };
        Netmask3.prototype.forEach = function(fn) {
          var index, lastLong, long;
          long = ip2long(this.first);
          lastLong = ip2long(this.last);
          index = 0;
          while (long <= lastLong) {
            fn(long2ip(long), long, index);
            index++;
            long++;
          }
        };
        Netmask3.prototype.toString = function() {
          return this.base + "/" + this.bitmask;
        };
        return Netmask3;
      }();
      exports2.ip2long = ip2long;
      exports2.long2ip = long2ip;
      exports2.Netmask = Netmask2;
    }).call(exports2);
  }
});

// node_modules/retry/lib/retry_operation.js
var require_retry_operation = __commonJS({
  "node_modules/retry/lib/retry_operation.js"(exports2, module2) {
    function RetryOperation(timeouts, options) {
      if (typeof options === "boolean") {
        options = { forever: options };
      }
      this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
      this._timeouts = timeouts;
      this._options = options || {};
      this._maxRetryTime = options && options.maxRetryTime || Infinity;
      this._fn = null;
      this._errors = [];
      this._attempts = 1;
      this._operationTimeout = null;
      this._operationTimeoutCb = null;
      this._timeout = null;
      this._operationStart = null;
      this._timer = null;
      if (this._options.forever) {
        this._cachedTimeouts = this._timeouts.slice(0);
      }
    }
    module2.exports = RetryOperation;
    RetryOperation.prototype.reset = function() {
      this._attempts = 1;
      this._timeouts = this._originalTimeouts.slice(0);
    };
    RetryOperation.prototype.stop = function() {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
      if (this._timer) {
        clearTimeout(this._timer);
      }
      this._timeouts = [];
      this._cachedTimeouts = null;
    };
    RetryOperation.prototype.retry = function(err) {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
      if (!err) {
        return false;
      }
      var currentTime = (/* @__PURE__ */ new Date()).getTime();
      if (err && currentTime - this._operationStart >= this._maxRetryTime) {
        this._errors.push(err);
        this._errors.unshift(new Error("RetryOperation timeout occurred"));
        return false;
      }
      this._errors.push(err);
      var timeout = this._timeouts.shift();
      if (timeout === void 0) {
        if (this._cachedTimeouts) {
          this._errors.splice(0, this._errors.length - 1);
          timeout = this._cachedTimeouts.slice(-1);
        } else {
          return false;
        }
      }
      var self2 = this;
      this._timer = setTimeout(function() {
        self2._attempts++;
        if (self2._operationTimeoutCb) {
          self2._timeout = setTimeout(function() {
            self2._operationTimeoutCb(self2._attempts);
          }, self2._operationTimeout);
          if (self2._options.unref) {
            self2._timeout.unref();
          }
        }
        self2._fn(self2._attempts);
      }, timeout);
      if (this._options.unref) {
        this._timer.unref();
      }
      return true;
    };
    RetryOperation.prototype.attempt = function(fn, timeoutOps) {
      this._fn = fn;
      if (timeoutOps) {
        if (timeoutOps.timeout) {
          this._operationTimeout = timeoutOps.timeout;
        }
        if (timeoutOps.cb) {
          this._operationTimeoutCb = timeoutOps.cb;
        }
      }
      var self2 = this;
      if (this._operationTimeoutCb) {
        this._timeout = setTimeout(function() {
          self2._operationTimeoutCb();
        }, self2._operationTimeout);
      }
      this._operationStart = (/* @__PURE__ */ new Date()).getTime();
      this._fn(this._attempts);
    };
    RetryOperation.prototype.try = function(fn) {
      console.log("Using RetryOperation.try() is deprecated");
      this.attempt(fn);
    };
    RetryOperation.prototype.start = function(fn) {
      console.log("Using RetryOperation.start() is deprecated");
      this.attempt(fn);
    };
    RetryOperation.prototype.start = RetryOperation.prototype.try;
    RetryOperation.prototype.errors = function() {
      return this._errors;
    };
    RetryOperation.prototype.attempts = function() {
      return this._attempts;
    };
    RetryOperation.prototype.mainError = function() {
      if (this._errors.length === 0) {
        return null;
      }
      var counts = {};
      var mainError = null;
      var mainErrorCount = 0;
      for (var i2 = 0; i2 < this._errors.length; i2++) {
        var error = this._errors[i2];
        var message2 = error.message;
        var count = (counts[message2] || 0) + 1;
        counts[message2] = count;
        if (count >= mainErrorCount) {
          mainError = error;
          mainErrorCount = count;
        }
      }
      return mainError;
    };
  }
});

// node_modules/retry/lib/retry.js
var require_retry = __commonJS({
  "node_modules/retry/lib/retry.js"(exports2) {
    var RetryOperation = require_retry_operation();
    exports2.operation = function(options) {
      var timeouts = exports2.timeouts(options);
      return new RetryOperation(timeouts, {
        forever: options && (options.forever || options.retries === Infinity),
        unref: options && options.unref,
        maxRetryTime: options && options.maxRetryTime
      });
    };
    exports2.timeouts = function(options) {
      if (options instanceof Array) {
        return [].concat(options);
      }
      var opts = {
        retries: 10,
        factor: 2,
        minTimeout: 1 * 1e3,
        maxTimeout: Infinity,
        randomize: false
      };
      for (var key in options) {
        opts[key] = options[key];
      }
      if (opts.minTimeout > opts.maxTimeout) {
        throw new Error("minTimeout is greater than maxTimeout");
      }
      var timeouts = [];
      for (var i2 = 0; i2 < opts.retries; i2++) {
        timeouts.push(this.createTimeout(i2, opts));
      }
      if (options && options.forever && !timeouts.length) {
        timeouts.push(this.createTimeout(i2, opts));
      }
      timeouts.sort(function(a2, b) {
        return a2 - b;
      });
      return timeouts;
    };
    exports2.createTimeout = function(attempt, opts) {
      var random = opts.randomize ? Math.random() + 1 : 1;
      var timeout = Math.round(random * Math.max(opts.minTimeout, 1) * Math.pow(opts.factor, attempt));
      timeout = Math.min(timeout, opts.maxTimeout);
      return timeout;
    };
    exports2.wrap = function(obj, options, methods) {
      if (options instanceof Array) {
        methods = options;
        options = null;
      }
      if (!methods) {
        methods = [];
        for (var key in obj) {
          if (typeof obj[key] === "function") {
            methods.push(key);
          }
        }
      }
      for (var i2 = 0; i2 < methods.length; i2++) {
        var method = methods[i2];
        var original = obj[method];
        obj[method] = function retryWrapper(original2) {
          var op = exports2.operation(options);
          var args = Array.prototype.slice.call(arguments, 1);
          var callback = args.pop();
          args.push(function(err) {
            if (op.retry(err)) {
              return;
            }
            if (err) {
              arguments[0] = op.mainError();
            }
            callback.apply(this, arguments);
          });
          op.attempt(function() {
            original2.apply(obj, args);
          });
        }.bind(obj, original);
        obj[method].options = options;
      }
    };
  }
});

// node_modules/retry/index.js
var require_retry2 = __commonJS({
  "node_modules/retry/index.js"(exports2, module2) {
    module2.exports = require_retry();
  }
});

// node_modules/detect-browser/index.js
var require_detect_browser = __commonJS({
  "node_modules/detect-browser/index.js"(exports2) {
    "use strict";
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from3, pack) {
      if (pack || arguments.length === 2)
        for (var i2 = 0, l2 = from3.length, ar; i2 < l2; i2++) {
          if (ar || !(i2 in from3)) {
            if (!ar)
              ar = Array.prototype.slice.call(from3, 0, i2);
            ar[i2] = from3[i2];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from3));
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getNodeVersion = exports2.detectOS = exports2.parseUserAgent = exports2.browserName = exports2.detect = exports2.ReactNativeInfo = exports2.BotInfo = exports2.SearchBotDeviceInfo = exports2.NodeInfo = exports2.BrowserInfo = void 0;
    var BrowserInfo = (
      /** @class */
      /* @__PURE__ */ function() {
        function BrowserInfo2(name3, version2, os2) {
          this.name = name3;
          this.version = version2;
          this.os = os2;
          this.type = "browser";
        }
        return BrowserInfo2;
      }()
    );
    exports2.BrowserInfo = BrowserInfo;
    var NodeInfo = (
      /** @class */
      /* @__PURE__ */ function() {
        function NodeInfo2(version2) {
          this.version = version2;
          this.type = "node";
          this.name = "node";
          this.os = process.platform;
        }
        return NodeInfo2;
      }()
    );
    exports2.NodeInfo = NodeInfo;
    var SearchBotDeviceInfo = (
      /** @class */
      /* @__PURE__ */ function() {
        function SearchBotDeviceInfo2(name3, version2, os2, bot) {
          this.name = name3;
          this.version = version2;
          this.os = os2;
          this.bot = bot;
          this.type = "bot-device";
        }
        return SearchBotDeviceInfo2;
      }()
    );
    exports2.SearchBotDeviceInfo = SearchBotDeviceInfo;
    var BotInfo = (
      /** @class */
      /* @__PURE__ */ function() {
        function BotInfo2() {
          this.type = "bot";
          this.bot = true;
          this.name = "bot";
          this.version = null;
          this.os = null;
        }
        return BotInfo2;
      }()
    );
    exports2.BotInfo = BotInfo;
    var ReactNativeInfo = (
      /** @class */
      /* @__PURE__ */ function() {
        function ReactNativeInfo2() {
          this.type = "react-native";
          this.name = "react-native";
          this.version = null;
          this.os = null;
        }
        return ReactNativeInfo2;
      }()
    );
    exports2.ReactNativeInfo = ReactNativeInfo;
    var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
    var SEARCHBOT_OS_REGEX = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
    var REQUIRED_VERSION_PARTS = 3;
    var userAgentRules = [
      ["aol", /AOLShield\/([0-9\._]+)/],
      ["edge", /Edge\/([0-9\._]+)/],
      ["edge-ios", /EdgiOS\/([0-9\._]+)/],
      ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
      ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
      ["samsung", /SamsungBrowser\/([0-9\.]+)/],
      ["silk", /\bSilk\/([0-9._-]+)\b/],
      ["miui", /MiuiBrowser\/([0-9\.]+)$/],
      ["beaker", /BeakerBrowser\/([0-9\.]+)/],
      ["edge-chromium", /EdgA?\/([0-9\.]+)/],
      [
        "chromium-webview",
        /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
      ],
      ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
      ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
      ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
      ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
      ["fxios", /FxiOS\/([0-9\.]+)/],
      ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
      ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
      ["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
      ["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
      ["pie", /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],
      ["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
      ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
      ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
      ["ie", /MSIE\s(7\.0)/],
      ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
      ["android", /Android\s([0-9\.]+)/],
      ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
      ["safari", /Version\/([0-9\._]+).*Safari/],
      ["facebook", /FB[AS]V\/([0-9\.]+)/],
      ["instagram", /Instagram\s([0-9\.]+)/],
      ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
      ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
      ["curl", /^curl\/([0-9\.]+)$/],
      ["searchbot", SEARCHBOX_UA_REGEX]
    ];
    var operatingSystemRules = [
      ["iOS", /iP(hone|od|ad)/],
      ["Android OS", /Android/],
      ["BlackBerry OS", /BlackBerry|BB10/],
      ["Windows Mobile", /IEMobile/],
      ["Amazon OS", /Kindle/],
      ["Windows 3.11", /Win16/],
      ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
      ["Windows 98", /(Windows 98)|(Win98)/],
      ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
      ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
      ["Windows Server 2003", /(Windows NT 5.2)/],
      ["Windows Vista", /(Windows NT 6.0)/],
      ["Windows 7", /(Windows NT 6.1)/],
      ["Windows 8", /(Windows NT 6.2)/],
      ["Windows 8.1", /(Windows NT 6.3)/],
      ["Windows 10", /(Windows NT 10.0)/],
      ["Windows ME", /Windows ME/],
      ["Windows CE", /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
      ["Open BSD", /OpenBSD/],
      ["Sun OS", /SunOS/],
      ["Chrome OS", /CrOS/],
      ["Linux", /(Linux)|(X11)/],
      ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
      ["QNX", /QNX/],
      ["BeOS", /BeOS/],
      ["OS/2", /OS\/2/]
    ];
    function detect2(userAgent2) {
      if (!!userAgent2) {
        return parseUserAgent(userAgent2);
      }
      if (typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative") {
        return new ReactNativeInfo();
      }
      if (typeof navigator !== "undefined") {
        return parseUserAgent(navigator.userAgent);
      }
      return getNodeVersion();
    }
    exports2.detect = detect2;
    function matchUserAgent(ua) {
      return ua !== "" && userAgentRules.reduce(function(matched, _a) {
        var browser2 = _a[0], regex = _a[1];
        if (matched) {
          return matched;
        }
        var uaMatch = regex.exec(ua);
        return !!uaMatch && [browser2, uaMatch];
      }, false);
    }
    function browserName(ua) {
      var data = matchUserAgent(ua);
      return data ? data[0] : null;
    }
    exports2.browserName = browserName;
    function parseUserAgent(ua) {
      var matchedRule = matchUserAgent(ua);
      if (!matchedRule) {
        return null;
      }
      var name3 = matchedRule[0], match = matchedRule[1];
      if (name3 === "searchbot") {
        return new BotInfo();
      }
      var versionParts = match[1] && match[1].split(".").join("_").split("_").slice(0, 3);
      if (versionParts) {
        if (versionParts.length < REQUIRED_VERSION_PARTS) {
          versionParts = __spreadArray(__spreadArray([], versionParts, true), createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length), true);
        }
      } else {
        versionParts = [];
      }
      var version2 = versionParts.join(".");
      var os2 = detectOS(ua);
      var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
      if (searchBotMatch && searchBotMatch[1]) {
        return new SearchBotDeviceInfo(name3, version2, os2, searchBotMatch[1]);
      }
      return new BrowserInfo(name3, version2, os2);
    }
    exports2.parseUserAgent = parseUserAgent;
    function detectOS(ua) {
      for (var ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
        var _a = operatingSystemRules[ii], os2 = _a[0], regex = _a[1];
        var match = regex.exec(ua);
        if (match) {
          return os2;
        }
      }
      return null;
    }
    exports2.detectOS = detectOS;
    function getNodeVersion() {
      var isNode3 = typeof process !== "undefined" && process.version;
      return isNode3 ? new NodeInfo(process.version.slice(1)) : null;
    }
    exports2.getNodeVersion = getNodeVersion;
    function createVersionParts(count) {
      var output = [];
      for (var ii = 0; ii < count; ii++) {
        output.push("0");
      }
      return output;
    }
  }
});

// node_modules/@chainsafe/as-chacha20poly1305/lib/common/const.js
var require_const = __commonJS({
  "node_modules/@chainsafe/as-chacha20poly1305/lib/common/const.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TAG_LENGTH = exports2.DATA_CHUNK_LENGTH = exports2.NONCE_LENGTH = exports2.KEY_LENGTH = void 0;
    exports2.KEY_LENGTH = 32;
    exports2.NONCE_LENGTH = 12;
    exports2.DATA_CHUNK_LENGTH = 65536;
    exports2.TAG_LENGTH = 16;
  }
});

// node_modules/@chainsafe/as-chacha20poly1305/lib/src/chacha20poly1305.js
var require_chacha20poly1305 = __commonJS({
  "node_modules/@chainsafe/as-chacha20poly1305/lib/src/chacha20poly1305.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ChaCha20Poly1305 = void 0;
    var const_1 = require_const();
    var ChaCha20Poly13052 = class {
      constructor(ctx3) {
        this.ctx = ctx3;
        const wasmKeyValue = ctx3.cpKey.value;
        this.wasmKeyArr = new Uint8Array(ctx3.memory.buffer, wasmKeyValue, const_1.KEY_LENGTH);
        const wasmNonceValue = ctx3.cpNonce.value;
        this.wasmNonceArr = new Uint8Array(ctx3.memory.buffer, wasmNonceValue, const_1.NONCE_LENGTH);
        const wasmAdValue = ctx3.cpAssociatedData.value;
        this.wasmAdArr = new Uint8Array(ctx3.memory.buffer, wasmAdValue, const_1.KEY_LENGTH);
        const wasmSealedValue = ctx3.cpInput.value;
        this.wasmInputArr = new Uint8Array(ctx3.memory.buffer, wasmSealedValue, const_1.DATA_CHUNK_LENGTH);
        const wasmChacha20OutputValue = ctx3.chacha20Output.value;
        this.wasmChacha20OutputArr = new Uint8Array(ctx3.memory.buffer, wasmChacha20OutputValue, const_1.DATA_CHUNK_LENGTH);
        const wasmPoly1305OutputValue = ctx3.poly1305Output.value;
        this.wasmPoly1305OutputArr = new Uint8Array(ctx3.memory.buffer, wasmPoly1305OutputValue, const_1.TAG_LENGTH);
        const wasmDebugValue = ctx3.debug.value;
        this.wasmDebugArr = new Uint32Array(ctx3.memory.buffer, wasmDebugValue, 64);
      }
      /**
       * Encode function
       */
      seal(key, nonce, plaintext, associatedData, dst) {
        this.init(key, nonce, associatedData);
        const resultLength = plaintext.length + const_1.TAG_LENGTH;
        let result;
        if (dst) {
          if (dst.length !== resultLength) {
            throw new Error("ChaCha20Poly1305: incorrect destination length");
          }
          result = dst;
        } else {
          result = new Uint8Array(resultLength);
        }
        const asDataLength = associatedData?.length ?? 0;
        this.sealUpdate(plaintext, asDataLength, result);
        result.set(this.wasmPoly1305OutputArr, plaintext.length);
        return result;
      }
      /**
       * Decode function
       */
      open(key, nonce, sealed, associatedData, dst) {
        this.init(key, nonce, associatedData);
        const sealedNoTag = sealed.subarray(0, sealed.length - const_1.TAG_LENGTH);
        let result;
        if (dst) {
          if (dst.length !== sealedNoTag.length) {
            throw new Error("ChaCha20Poly1305: incorrect destination length");
          }
          result = dst;
        } else {
          result = new Uint8Array(sealedNoTag.length);
        }
        const asDataLength = associatedData?.length ?? 0;
        this.openUpdate(sealedNoTag, asDataLength, result);
        const tag = sealed.subarray(sealed.length - const_1.TAG_LENGTH, sealed.length);
        const isTagValid = this.isSameTag(tag);
        return isTagValid ? result : null;
      }
      init(key, nonce, ad = new Uint8Array(0)) {
        if (key.length != const_1.KEY_LENGTH) {
          throw Error(`Invalid chacha20poly1305 key length ${key.length}, expect ${const_1.KEY_LENGTH}`);
        }
        if (ad.length > const_1.KEY_LENGTH) {
          throw Error(`Invalid ad length ${ad.length}, expect <= ${const_1.KEY_LENGTH}`);
        }
        if (nonce.length !== const_1.NONCE_LENGTH) {
          throw Error(`Invalid nonce length ${nonce.length}, expect ${const_1.NONCE_LENGTH}`);
        }
        this.wasmKeyArr.set(key);
        this.wasmNonceArr.set(nonce);
        this.wasmAdArr.set(ad);
      }
      openUpdate(data, asDataLength, dst) {
        this.commonUpdate(data, this.ctx.openUpdate, asDataLength, dst);
      }
      sealUpdate(data, asDataLength, dst) {
        this.commonUpdate(data, this.ctx.sealUpdate, asDataLength, dst);
      }
      commonUpdate(data, updateFn, asDataLength, dst) {
        const length3 = data.length;
        if (data.length <= const_1.DATA_CHUNK_LENGTH) {
          this.wasmInputArr.set(data);
          updateFn(true, true, length3, length3, asDataLength);
          dst.set(length3 === const_1.DATA_CHUNK_LENGTH ? this.wasmChacha20OutputArr : this.wasmChacha20OutputArr.subarray(0, length3));
          return;
        }
        for (let offset = 0; offset < length3; offset += const_1.DATA_CHUNK_LENGTH) {
          const end = Math.min(length3, offset + const_1.DATA_CHUNK_LENGTH);
          this.wasmInputArr.set(data.subarray(offset, end));
          const isFirst = offset === 0;
          const isLast = offset + const_1.DATA_CHUNK_LENGTH >= length3;
          updateFn(isFirst, isLast, end - offset, length3, asDataLength);
          dst.set(end - offset === const_1.DATA_CHUNK_LENGTH ? this.wasmChacha20OutputArr : this.wasmChacha20OutputArr.subarray(0, end - offset), offset);
        }
      }
      isSameTag(tag) {
        let isSameTag = true;
        for (let i2 = 0; i2 < const_1.TAG_LENGTH; i2++) {
          if (this.wasmPoly1305OutputArr[i2] !== tag[i2]) {
            isSameTag = false;
            break;
          }
        }
        return isSameTag;
      }
    };
    exports2.ChaCha20Poly1305 = ChaCha20Poly13052;
  }
});

// node_modules/@chainsafe/as-chacha20poly1305/lib/src/poly1305.js
var require_poly1305 = __commonJS({
  "node_modules/@chainsafe/as-chacha20poly1305/lib/src/poly1305.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Poly1305 = void 0;
    var const_1 = require_const();
    var Poly13052 = class {
      constructor(ctx3) {
        this.ctx = ctx3;
        const wasmPoly1305KeyValue = ctx3.poly1305Key.value;
        this.wasmKeyArr = new Uint8Array(ctx3.memory.buffer, wasmPoly1305KeyValue, const_1.KEY_LENGTH);
        const wasmPoly1305InputValue = ctx3.poly1305Input.value;
        this.wasmInputArr = new Uint8Array(ctx3.memory.buffer, wasmPoly1305InputValue, const_1.DATA_CHUNK_LENGTH);
        const wasmPoly1305OutputValue = ctx3.poly1305Output.value;
        this.wasmOutputArr = new Uint8Array(ctx3.memory.buffer, wasmPoly1305OutputValue, const_1.TAG_LENGTH);
        const wasmPoly1305DebugValue = ctx3.debug.value;
        this.wasmDebugArr = new Uint32Array(ctx3.memory.buffer, wasmPoly1305DebugValue, 64);
      }
      init(key) {
        if (key.length != const_1.KEY_LENGTH) {
          throw Error(`Invalid poly1305 key length ${key.length}, expect ${const_1.KEY_LENGTH}`);
        }
        this.wasmKeyArr.set(key);
        this.ctx.poly1305Init();
      }
      update(data) {
        if (data.length <= const_1.DATA_CHUNK_LENGTH) {
          this.wasmInputArr.set(data);
          this.ctx.poly1305Update(data.length);
          return;
        }
        for (let offset = 0; offset < data.length; offset += const_1.DATA_CHUNK_LENGTH) {
          const end = Math.min(data.length, offset + const_1.DATA_CHUNK_LENGTH);
          this.wasmInputArr.set(data.subarray(offset, end));
          this.ctx.poly1305Update(end - offset);
        }
      }
      digest() {
        this.ctx.poly1305Digest();
        const out = new Uint8Array(const_1.TAG_LENGTH);
        out.set(this.wasmOutputArr);
        return out;
      }
    };
    exports2.Poly1305 = Poly13052;
  }
});

// node_modules/@chainsafe/as-chacha20poly1305/lib/src/wasmCode.js
var require_wasmCode = __commonJS({
  "node_modules/@chainsafe/as-chacha20poly1305/lib/src/wasmCode.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.wasmCode = void 0;
    exports2.wasmCode = Uint8Array.from([0, 97, 115, 109, 1, 0, 0, 0, 1, 58, 10, 96, 0, 0, 96, 2, 127, 127, 0, 96, 1, 127, 0, 96, 3, 127, 127, 127, 0, 96, 1, 127, 1, 127, 96, 4, 127, 127, 127, 127, 0, 96, 5, 127, 127, 127, 127, 127, 0, 96, 0, 1, 127, 96, 2, 127, 127, 1, 127, 96, 5, 127, 127, 127, 127, 127, 1, 127, 2, 13, 1, 3, 101, 110, 118, 5, 97, 98, 111, 114, 116, 0, 5, 3, 34, 33, 2, 8, 1, 4, 0, 4, 7, 0, 0, 3, 3, 2, 1, 9, 4, 2, 0, 3, 1, 2, 2, 1, 0, 0, 0, 5, 1, 1, 1, 6, 1, 6, 0, 5, 3, 1, 0, 1, 6, 238, 1, 47, 127, 0, 65, 32, 11, 127, 0, 65, 16, 11, 127, 0, 65, 128, 128, 4, 11, 127, 0, 65, 16, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 7, 226, 2, 23, 6, 109, 101, 109, 111, 114, 121, 2, 0, 21, 67, 72, 65, 67, 72, 65, 50, 48, 95, 73, 78, 80, 85, 84, 95, 76, 69, 78, 71, 84, 72, 3, 2, 23, 67, 72, 65, 67, 72, 65, 50, 48, 95, 67, 79, 85, 78, 84, 69, 82, 95, 76, 69, 78, 71, 84, 72, 3, 3, 13, 99, 104, 97, 99, 104, 97, 50, 48, 73, 110, 112, 117, 116, 3, 6, 11, 99, 104, 97, 99, 104, 97, 50, 48, 75, 101, 121, 3, 8, 15, 99, 104, 97, 99, 104, 97, 50, 48, 67, 111, 117, 110, 116, 101, 114, 3, 10, 14, 99, 104, 97, 99, 104, 97, 50, 48, 79, 117, 116, 112, 117, 116, 3, 12, 23, 99, 104, 97, 99, 104, 97, 50, 48, 83, 116, 114, 101, 97, 109, 88, 79, 82, 85, 112, 100, 97, 116, 101, 0, 15, 10, 75, 69, 89, 95, 76, 69, 78, 71, 84, 72, 3, 0, 10, 84, 65, 71, 95, 76, 69, 78, 71, 84, 72, 3, 1, 12, 112, 111, 108, 121, 49, 51, 48, 53, 73, 110, 105, 116, 0, 17, 14, 112, 111, 108, 121, 49, 51, 48, 53, 85, 112, 100, 97, 116, 101, 0, 20, 14, 112, 111, 108, 121, 49, 51, 48, 53, 68, 105, 103, 101, 115, 116, 0, 24, 13, 112, 111, 108, 121, 49, 51, 48, 53, 73, 110, 112, 117, 116, 3, 19, 11, 112, 111, 108, 121, 49, 51, 48, 53, 75, 101, 121, 3, 18, 14, 112, 111, 108, 121, 49, 51, 48, 53, 79, 117, 116, 112, 117, 116, 3, 20, 10, 111, 112, 101, 110, 85, 112, 100, 97, 116, 101, 0, 30, 10, 115, 101, 97, 108, 85, 112, 100, 97, 116, 101, 0, 32, 5, 99, 112, 75, 101, 121, 3, 37, 7, 99, 112, 78, 111, 110, 99, 101, 3, 39, 7, 99, 112, 73, 110, 112, 117, 116, 3, 43, 16, 99, 112, 65, 115, 115, 111, 99, 105, 97, 116, 101, 100, 68, 97, 116, 97, 3, 41, 5, 100, 101, 98, 117, 103, 3, 46, 8, 1, 33, 10, 195, 47, 33, 70, 1, 2, 127, 32, 0, 63, 0, 34, 2, 65, 16, 116, 34, 1, 75, 4, 64, 32, 2, 32, 0, 32, 1, 107, 65, 255, 255, 3, 106, 65, 128, 128, 124, 113, 65, 16, 118, 34, 1, 32, 2, 32, 1, 74, 27, 64, 0, 65, 0, 72, 4, 64, 32, 1, 64, 0, 65, 0, 72, 4, 64, 0, 11, 11, 11, 32, 0, 36, 5, 11, 82, 1, 3, 127, 32, 0, 65, 240, 255, 255, 255, 3, 75, 4, 64, 0, 11, 35, 5, 65, 16, 106, 34, 3, 32, 0, 65, 15, 106, 65, 112, 113, 34, 2, 65, 16, 32, 2, 65, 16, 75, 27, 34, 4, 106, 16, 1, 32, 3, 65, 16, 107, 34, 2, 32, 4, 54, 2, 0, 32, 2, 65, 1, 54, 2, 4, 32, 2, 32, 1, 54, 2, 8, 32, 2, 32, 0, 54, 2, 12, 32, 3, 11, 37, 1, 1, 127, 3, 64, 32, 1, 4, 64, 32, 0, 34, 2, 65, 1, 106, 33, 0, 32, 2, 65, 0, 58, 0, 0, 32, 1, 65, 1, 107, 33, 1, 12, 1, 11, 11, 11, 42, 1, 1, 127, 32, 0, 65, 240, 255, 255, 255, 3, 75, 4, 64, 65, 32, 65, 208, 0, 65, 54, 65, 42, 16, 0, 0, 11, 32, 0, 65, 0, 16, 2, 34, 1, 32, 0, 16, 3, 32, 1, 11, 67, 0, 65, 128, 3, 36, 4, 65, 128, 3, 36, 5, 65, 128, 128, 4, 16, 4, 36, 6, 35, 6, 36, 7, 65, 32, 16, 4, 36, 8, 35, 8, 36, 9, 65, 16, 16, 4, 36, 10, 35, 10, 36, 11, 65, 128, 128, 4, 16, 4, 36, 12, 35, 12, 36, 13, 65, 192, 0, 16, 4, 36, 14, 35, 14, 36, 15, 11, 83, 1, 1, 127, 65, 128, 2, 65, 0, 16, 2, 34, 1, 65, 128, 2, 16, 3, 32, 0, 69, 4, 64, 65, 12, 65, 2, 16, 2, 33, 0, 11, 32, 0, 65, 0, 54, 2, 0, 32, 0, 65, 0, 54, 2, 4, 32, 0, 65, 0, 54, 2, 8, 32, 0, 40, 2, 0, 26, 32, 0, 32, 1, 54, 2, 0, 32, 0, 32, 1, 54, 2, 4, 32, 0, 65, 128, 2, 54, 2, 8, 32, 0, 11, 10, 0, 65, 12, 65, 3, 16, 2, 16, 6, 11, 95, 0, 16, 7, 36, 16, 35, 16, 40, 2, 0, 36, 17, 65, 32, 16, 4, 36, 18, 65, 128, 128, 4, 16, 4, 36, 19, 65, 16, 16, 4, 36, 20, 35, 18, 36, 21, 35, 19, 36, 22, 35, 20, 36, 23, 65, 16, 16, 4, 36, 24, 35, 24, 36, 25, 65, 20, 16, 4, 36, 26, 35, 26, 36, 27, 65, 20, 16, 4, 36, 28, 35, 28, 36, 29, 65, 16, 16, 4, 36, 30, 35, 30, 36, 31, 65, 20, 16, 4, 36, 35, 35, 35, 36, 36, 11, 55, 0, 65, 32, 16, 4, 36, 37, 35, 37, 36, 38, 65, 12, 16, 4, 36, 39, 35, 39, 36, 40, 65, 32, 16, 4, 36, 41, 35, 41, 36, 42, 65, 128, 128, 4, 16, 4, 36, 43, 35, 43, 36, 44, 16, 7, 36, 45, 35, 45, 40, 2, 0, 36, 46, 11, 22, 0, 32, 1, 32, 2, 65, 255, 1, 113, 65, 4, 110, 65, 2, 116, 106, 32, 0, 54, 2, 0, 11, 188, 6, 1, 31, 127, 65, 229, 240, 193, 139, 6, 33, 5, 65, 238, 200, 129, 153, 3, 33, 6, 65, 178, 218, 136, 203, 7, 33, 14, 65, 244, 202, 129, 217, 6, 33, 7, 32, 2, 40, 2, 0, 34, 19, 33, 4, 32, 2, 65, 4, 106, 40, 2, 0, 34, 20, 33, 8, 32, 2, 65, 8, 106, 40, 2, 0, 34, 21, 33, 3, 32, 2, 65, 12, 106, 40, 2, 0, 34, 22, 33, 13, 32, 2, 65, 16, 106, 40, 2, 0, 34, 23, 33, 15, 32, 2, 65, 20, 106, 40, 2, 0, 34, 24, 33, 9, 32, 2, 65, 24, 106, 40, 2, 0, 34, 25, 33, 10, 32, 2, 65, 28, 106, 40, 2, 0, 34, 26, 33, 2, 32, 1, 40, 2, 0, 34, 27, 33, 11, 32, 1, 65, 4, 106, 40, 2, 0, 34, 28, 33, 16, 32, 1, 65, 8, 106, 40, 2, 0, 34, 29, 33, 12, 32, 1, 65, 12, 106, 40, 2, 0, 34, 30, 33, 1, 3, 64, 32, 18, 65, 20, 72, 4, 64, 32, 3, 32, 10, 32, 12, 32, 3, 32, 14, 106, 34, 3, 115, 65, 16, 119, 34, 14, 106, 34, 10, 115, 65, 12, 119, 34, 12, 32, 10, 32, 14, 32, 3, 32, 12, 106, 34, 3, 115, 65, 8, 119, 34, 14, 106, 34, 10, 115, 33, 12, 32, 13, 32, 2, 32, 1, 32, 7, 32, 13, 106, 34, 1, 115, 65, 16, 119, 34, 2, 106, 34, 13, 115, 65, 12, 119, 34, 7, 32, 13, 32, 2, 32, 1, 32, 7, 106, 34, 13, 115, 65, 8, 119, 34, 1, 106, 34, 2, 115, 33, 7, 32, 4, 32, 15, 32, 11, 32, 4, 32, 5, 106, 34, 4, 115, 65, 16, 119, 34, 5, 106, 34, 15, 115, 65, 12, 119, 34, 11, 32, 15, 32, 5, 32, 4, 32, 11, 106, 34, 4, 115, 65, 8, 119, 34, 5, 106, 34, 15, 115, 33, 11, 32, 10, 32, 1, 32, 8, 32, 9, 32, 16, 32, 6, 32, 8, 106, 34, 1, 115, 65, 16, 119, 34, 8, 106, 34, 6, 115, 65, 12, 119, 34, 9, 32, 6, 32, 8, 32, 1, 32, 9, 106, 34, 1, 115, 65, 8, 119, 34, 6, 106, 34, 9, 115, 65, 7, 119, 34, 10, 32, 4, 106, 34, 17, 115, 65, 16, 119, 34, 31, 106, 33, 8, 32, 2, 32, 5, 32, 12, 65, 7, 119, 34, 5, 32, 1, 106, 34, 32, 115, 65, 16, 119, 34, 33, 106, 33, 1, 32, 9, 32, 14, 32, 13, 32, 11, 65, 7, 119, 34, 9, 106, 34, 11, 115, 65, 16, 119, 34, 12, 106, 33, 4, 32, 15, 32, 6, 32, 3, 32, 7, 65, 7, 119, 34, 3, 106, 34, 6, 115, 65, 16, 119, 34, 7, 106, 34, 2, 32, 6, 32, 2, 32, 3, 115, 65, 12, 119, 34, 3, 106, 34, 14, 32, 7, 115, 65, 8, 119, 34, 16, 106, 34, 15, 32, 3, 115, 65, 7, 119, 33, 13, 32, 11, 32, 4, 32, 9, 115, 65, 12, 119, 34, 2, 106, 34, 7, 32, 12, 115, 65, 8, 119, 34, 12, 32, 4, 106, 34, 9, 32, 2, 115, 65, 7, 119, 33, 4, 32, 32, 32, 1, 32, 5, 115, 65, 12, 119, 34, 3, 106, 34, 6, 32, 33, 115, 65, 8, 119, 34, 11, 32, 1, 106, 34, 2, 32, 3, 115, 65, 7, 119, 33, 3, 32, 17, 32, 8, 32, 10, 115, 65, 12, 119, 34, 17, 106, 34, 5, 32, 31, 115, 65, 8, 119, 34, 1, 32, 8, 106, 34, 10, 32, 17, 115, 65, 7, 119, 33, 8, 32, 18, 65, 2, 106, 33, 18, 12, 1, 11, 11, 32, 5, 65, 229, 240, 193, 139, 6, 106, 32, 0, 65, 0, 16, 10, 32, 6, 65, 238, 200, 129, 153, 3, 106, 32, 0, 65, 4, 16, 10, 32, 14, 65, 178, 218, 136, 203, 7, 106, 32, 0, 65, 8, 16, 10, 32, 7, 65, 244, 202, 129, 217, 6, 106, 32, 0, 65, 12, 16, 10, 32, 4, 32, 19, 106, 32, 0, 65, 16, 16, 10, 32, 8, 32, 20, 106, 32, 0, 65, 20, 16, 10, 32, 3, 32, 21, 106, 32, 0, 65, 24, 16, 10, 32, 13, 32, 22, 106, 32, 0, 65, 28, 16, 10, 32, 15, 32, 23, 106, 32, 0, 65, 32, 16, 10, 32, 9, 32, 24, 106, 32, 0, 65, 36, 16, 10, 32, 10, 32, 25, 106, 32, 0, 65, 40, 16, 10, 32, 2, 32, 26, 106, 32, 0, 65, 44, 16, 10, 32, 11, 32, 27, 106, 32, 0, 65, 48, 16, 10, 32, 16, 32, 28, 106, 32, 0, 65, 52, 16, 10, 32, 12, 32, 29, 106, 32, 0, 65, 56, 16, 10, 32, 1, 32, 30, 106, 32, 0, 65, 60, 16, 10, 11, 97, 1, 4, 127, 65, 4, 33, 3, 65, 1, 33, 1, 3, 64, 32, 3, 34, 2, 65, 1, 107, 33, 3, 32, 2, 65, 255, 1, 113, 4, 64, 32, 1, 32, 0, 32, 4, 65, 255, 1, 113, 106, 34, 2, 45, 0, 0, 106, 33, 1, 32, 2, 32, 1, 58, 0, 0, 32, 1, 65, 8, 118, 33, 1, 32, 4, 65, 1, 106, 33, 4, 12, 1, 11, 11, 32, 1, 65, 0, 74, 4, 64, 65, 144, 1, 65, 208, 1, 65, 135, 2, 65, 4, 16, 0, 0, 11, 11, 8, 0, 32, 0, 32, 1, 16, 3, 11, 108, 1, 2, 127, 3, 64, 32, 6, 32, 1, 73, 4, 64, 35, 15, 32, 3, 32, 2, 16, 11, 32, 6, 33, 5, 3, 64, 32, 5, 32, 1, 73, 65, 0, 32, 5, 32, 6, 65, 64, 107, 73, 27, 4, 64, 32, 4, 32, 5, 106, 32, 0, 32, 5, 106, 45, 0, 0, 35, 15, 32, 5, 32, 6, 107, 106, 45, 0, 0, 115, 58, 0, 0, 32, 5, 65, 1, 106, 33, 5, 12, 1, 11, 11, 32, 3, 16, 12, 32, 6, 65, 64, 107, 33, 6, 12, 1, 11, 11, 35, 15, 65, 192, 0, 16, 13, 32, 1, 11, 14, 0, 35, 7, 32, 0, 35, 9, 35, 11, 35, 13, 16, 14, 11, 204, 4, 1, 1, 127, 35, 27, 32, 0, 45, 0, 0, 32, 0, 65, 1, 106, 45, 0, 0, 65, 8, 116, 114, 34, 1, 65, 255, 63, 113, 59, 1, 0, 35, 27, 65, 2, 106, 32, 1, 65, 13, 118, 32, 0, 65, 2, 106, 45, 0, 0, 32, 0, 65, 3, 106, 45, 0, 0, 65, 8, 116, 114, 34, 1, 65, 3, 116, 114, 65, 255, 63, 113, 59, 1, 0, 35, 27, 65, 4, 106, 32, 1, 65, 10, 118, 32, 0, 65, 4, 106, 45, 0, 0, 32, 0, 65, 5, 106, 45, 0, 0, 65, 8, 116, 114, 34, 1, 65, 6, 116, 114, 65, 131, 62, 113, 59, 1, 0, 35, 27, 65, 6, 106, 32, 1, 65, 7, 118, 32, 0, 65, 6, 106, 45, 0, 0, 32, 0, 65, 7, 106, 45, 0, 0, 65, 8, 116, 114, 34, 1, 65, 9, 116, 114, 65, 255, 63, 113, 59, 1, 0, 35, 27, 65, 8, 106, 32, 1, 65, 4, 118, 32, 0, 65, 8, 106, 45, 0, 0, 32, 0, 65, 9, 106, 45, 0, 0, 65, 8, 116, 114, 34, 1, 65, 12, 116, 114, 65, 255, 1, 113, 59, 1, 0, 35, 27, 65, 10, 106, 32, 1, 65, 1, 118, 65, 254, 63, 113, 59, 1, 0, 35, 27, 65, 12, 106, 32, 1, 65, 14, 118, 32, 0, 65, 10, 106, 45, 0, 0, 32, 0, 65, 11, 106, 45, 0, 0, 65, 8, 116, 114, 34, 1, 65, 2, 116, 114, 65, 255, 63, 113, 59, 1, 0, 35, 27, 65, 14, 106, 32, 1, 65, 11, 118, 32, 0, 65, 12, 106, 45, 0, 0, 32, 0, 65, 13, 106, 45, 0, 0, 65, 8, 116, 114, 34, 1, 65, 5, 116, 114, 65, 129, 63, 113, 59, 1, 0, 35, 27, 65, 16, 106, 32, 1, 65, 8, 118, 32, 0, 65, 14, 106, 45, 0, 0, 32, 0, 65, 15, 106, 45, 0, 0, 65, 8, 116, 114, 34, 1, 65, 8, 116, 114, 65, 255, 63, 113, 59, 1, 0, 35, 27, 65, 18, 106, 32, 1, 65, 5, 118, 65, 255, 0, 113, 59, 1, 0, 35, 31, 32, 0, 65, 16, 106, 45, 0, 0, 32, 0, 65, 17, 106, 45, 0, 0, 65, 8, 116, 114, 59, 1, 0, 35, 31, 65, 2, 106, 32, 0, 65, 18, 106, 45, 0, 0, 32, 0, 65, 19, 106, 45, 0, 0, 65, 8, 116, 114, 59, 1, 0, 35, 31, 65, 4, 106, 32, 0, 65, 20, 106, 45, 0, 0, 32, 0, 65, 21, 106, 45, 0, 0, 65, 8, 116, 114, 59, 1, 0, 35, 31, 65, 6, 106, 32, 0, 65, 22, 106, 45, 0, 0, 32, 0, 65, 23, 106, 45, 0, 0, 65, 8, 116, 114, 59, 1, 0, 35, 31, 65, 8, 106, 32, 0, 65, 24, 106, 45, 0, 0, 32, 0, 65, 25, 106, 45, 0, 0, 65, 8, 116, 114, 59, 1, 0, 35, 31, 65, 10, 106, 32, 0, 65, 26, 106, 45, 0, 0, 32, 0, 65, 27, 106, 45, 0, 0, 65, 8, 116, 114, 59, 1, 0, 35, 31, 65, 12, 106, 32, 0, 65, 28, 106, 45, 0, 0, 32, 0, 65, 29, 106, 45, 0, 0, 65, 8, 116, 114, 59, 1, 0, 35, 31, 65, 14, 106, 32, 0, 65, 30, 106, 45, 0, 0, 32, 0, 65, 31, 106, 45, 0, 0, 65, 8, 116, 114, 59, 1, 0, 11, 6, 0, 35, 21, 16, 16, 11, 166, 13, 1, 32, 127, 65, 0, 65, 128, 16, 35, 33, 27, 33, 34, 35, 29, 47, 1, 0, 33, 3, 35, 29, 65, 2, 106, 47, 1, 0, 33, 4, 35, 29, 65, 4, 106, 47, 1, 0, 33, 8, 35, 29, 65, 6, 106, 47, 1, 0, 33, 9, 35, 29, 65, 8, 106, 47, 1, 0, 33, 10, 35, 29, 65, 10, 106, 47, 1, 0, 33, 11, 35, 29, 65, 12, 106, 47, 1, 0, 33, 12, 35, 29, 65, 14, 106, 47, 1, 0, 33, 13, 35, 29, 65, 16, 106, 47, 1, 0, 33, 14, 35, 29, 65, 18, 106, 47, 1, 0, 33, 6, 35, 27, 47, 1, 0, 33, 17, 35, 27, 65, 2, 106, 47, 1, 0, 33, 18, 35, 27, 65, 4, 106, 47, 1, 0, 33, 20, 35, 27, 65, 6, 106, 47, 1, 0, 33, 22, 35, 27, 65, 8, 106, 47, 1, 0, 33, 24, 35, 27, 65, 10, 106, 47, 1, 0, 33, 26, 35, 27, 65, 12, 106, 47, 1, 0, 33, 29, 35, 27, 65, 14, 106, 47, 1, 0, 33, 30, 35, 27, 65, 16, 106, 47, 1, 0, 33, 31, 35, 27, 65, 18, 106, 47, 1, 0, 33, 33, 3, 64, 32, 2, 65, 16, 79, 4, 64, 32, 3, 32, 0, 32, 1, 106, 45, 0, 0, 32, 0, 32, 1, 65, 1, 106, 106, 45, 0, 0, 65, 8, 116, 114, 34, 15, 65, 255, 63, 113, 106, 34, 3, 32, 17, 108, 32, 4, 32, 0, 32, 1, 65, 2, 106, 106, 45, 0, 0, 32, 0, 32, 1, 65, 3, 106, 106, 45, 0, 0, 65, 8, 116, 114, 34, 16, 65, 3, 116, 32, 15, 65, 255, 255, 3, 113, 65, 13, 118, 114, 65, 255, 63, 113, 106, 34, 4, 32, 33, 65, 5, 108, 34, 15, 108, 106, 32, 8, 32, 0, 32, 1, 65, 4, 106, 106, 45, 0, 0, 32, 0, 32, 1, 65, 5, 106, 106, 45, 0, 0, 65, 8, 116, 114, 34, 19, 65, 6, 116, 32, 16, 65, 255, 255, 3, 113, 65, 10, 118, 114, 65, 255, 63, 113, 106, 34, 8, 32, 31, 65, 5, 108, 34, 16, 108, 106, 32, 9, 32, 0, 32, 1, 65, 6, 106, 106, 45, 0, 0, 32, 0, 32, 1, 65, 7, 106, 106, 45, 0, 0, 65, 8, 116, 114, 34, 21, 65, 9, 116, 32, 19, 65, 255, 255, 3, 113, 65, 7, 118, 114, 65, 255, 63, 113, 106, 34, 9, 32, 30, 65, 5, 108, 34, 19, 108, 106, 32, 10, 32, 0, 32, 1, 65, 8, 106, 106, 45, 0, 0, 32, 0, 32, 1, 65, 9, 106, 106, 45, 0, 0, 65, 8, 116, 114, 34, 23, 65, 12, 116, 32, 21, 65, 255, 255, 3, 113, 65, 4, 118, 114, 65, 255, 63, 113, 106, 34, 10, 32, 29, 65, 5, 108, 34, 21, 108, 106, 34, 32, 65, 255, 63, 113, 32, 11, 32, 23, 65, 255, 255, 3, 113, 65, 1, 118, 65, 255, 63, 113, 106, 34, 11, 32, 26, 65, 5, 108, 34, 27, 108, 106, 32, 12, 32, 0, 32, 1, 65, 10, 106, 106, 45, 0, 0, 32, 0, 32, 1, 65, 11, 106, 106, 45, 0, 0, 65, 8, 116, 114, 34, 28, 65, 2, 116, 32, 23, 65, 255, 255, 3, 113, 65, 14, 118, 114, 65, 255, 63, 113, 106, 34, 12, 32, 24, 65, 5, 108, 34, 23, 108, 106, 32, 13, 32, 0, 32, 1, 65, 12, 106, 106, 45, 0, 0, 32, 0, 32, 1, 65, 13, 106, 106, 45, 0, 0, 65, 8, 116, 114, 34, 25, 65, 5, 116, 32, 28, 65, 255, 255, 3, 113, 65, 11, 118, 114, 65, 255, 63, 113, 106, 34, 13, 32, 22, 65, 5, 108, 34, 28, 108, 106, 32, 14, 32, 25, 65, 255, 255, 3, 113, 65, 8, 118, 32, 0, 32, 1, 65, 14, 106, 106, 45, 0, 0, 32, 0, 32, 1, 65, 15, 106, 106, 45, 0, 0, 65, 8, 116, 114, 34, 25, 65, 8, 116, 114, 65, 255, 63, 113, 106, 34, 14, 32, 20, 65, 5, 108, 34, 7, 108, 106, 33, 5, 32, 11, 32, 21, 108, 32, 32, 65, 13, 118, 32, 5, 32, 6, 32, 34, 32, 25, 65, 255, 255, 3, 113, 65, 5, 118, 114, 65, 255, 255, 3, 113, 106, 34, 6, 32, 18, 65, 5, 108, 108, 106, 34, 32, 65, 13, 118, 106, 32, 3, 32, 18, 108, 106, 32, 4, 32, 17, 108, 106, 32, 8, 32, 15, 108, 106, 32, 9, 32, 16, 108, 106, 32, 10, 32, 19, 108, 106, 34, 25, 65, 255, 63, 113, 106, 32, 12, 32, 27, 108, 106, 32, 13, 32, 23, 108, 106, 32, 14, 32, 28, 108, 106, 33, 5, 32, 11, 32, 19, 108, 32, 25, 65, 13, 118, 32, 5, 32, 6, 32, 7, 108, 106, 34, 25, 65, 13, 118, 106, 32, 3, 32, 20, 108, 106, 32, 4, 32, 18, 108, 106, 32, 8, 32, 17, 108, 106, 32, 9, 32, 15, 108, 106, 32, 10, 32, 16, 108, 106, 34, 7, 65, 255, 63, 113, 106, 32, 12, 32, 21, 108, 106, 32, 13, 32, 27, 108, 106, 32, 14, 32, 23, 108, 106, 33, 5, 32, 11, 32, 16, 108, 32, 7, 65, 13, 118, 32, 5, 32, 6, 32, 28, 108, 106, 34, 28, 65, 13, 118, 106, 32, 3, 32, 22, 108, 106, 32, 4, 32, 20, 108, 106, 32, 8, 32, 18, 108, 106, 32, 9, 32, 17, 108, 106, 32, 10, 32, 15, 108, 106, 34, 7, 65, 255, 63, 113, 106, 32, 12, 32, 19, 108, 106, 32, 13, 32, 21, 108, 106, 32, 14, 32, 27, 108, 106, 33, 5, 32, 11, 32, 15, 108, 32, 7, 65, 13, 118, 32, 5, 32, 6, 32, 23, 108, 106, 34, 23, 65, 13, 118, 106, 32, 3, 32, 24, 108, 106, 32, 4, 32, 22, 108, 106, 32, 8, 32, 20, 108, 106, 32, 9, 32, 18, 108, 106, 32, 10, 32, 17, 108, 106, 34, 7, 65, 255, 63, 113, 106, 32, 12, 32, 16, 108, 106, 32, 13, 32, 19, 108, 106, 32, 14, 32, 21, 108, 106, 33, 5, 32, 11, 32, 17, 108, 32, 7, 65, 13, 118, 32, 5, 32, 6, 32, 27, 108, 106, 34, 27, 65, 13, 118, 106, 32, 3, 32, 26, 108, 106, 32, 4, 32, 24, 108, 106, 32, 8, 32, 22, 108, 106, 32, 9, 32, 20, 108, 106, 32, 10, 32, 18, 108, 106, 34, 7, 65, 255, 63, 113, 106, 32, 12, 32, 15, 108, 106, 32, 13, 32, 16, 108, 106, 32, 14, 32, 19, 108, 106, 33, 5, 32, 11, 32, 18, 108, 32, 7, 65, 13, 118, 32, 5, 32, 6, 32, 21, 108, 106, 34, 21, 65, 13, 118, 106, 32, 3, 32, 29, 108, 106, 32, 4, 32, 26, 108, 106, 32, 8, 32, 24, 108, 106, 32, 9, 32, 22, 108, 106, 32, 10, 32, 20, 108, 106, 34, 7, 65, 255, 63, 113, 106, 32, 12, 32, 17, 108, 106, 32, 13, 32, 15, 108, 106, 32, 14, 32, 16, 108, 106, 33, 5, 32, 11, 32, 20, 108, 32, 7, 65, 13, 118, 32, 5, 32, 6, 32, 19, 108, 106, 34, 19, 65, 13, 118, 106, 32, 3, 32, 30, 108, 106, 32, 4, 32, 29, 108, 106, 32, 8, 32, 26, 108, 106, 32, 9, 32, 24, 108, 106, 32, 10, 32, 22, 108, 106, 34, 7, 65, 255, 63, 113, 106, 32, 12, 32, 18, 108, 106, 32, 13, 32, 17, 108, 106, 32, 14, 32, 15, 108, 106, 33, 5, 32, 11, 32, 22, 108, 32, 7, 65, 13, 118, 32, 5, 32, 6, 32, 16, 108, 106, 34, 16, 65, 13, 118, 106, 32, 3, 32, 31, 108, 106, 32, 4, 32, 30, 108, 106, 32, 8, 32, 29, 108, 106, 32, 9, 32, 26, 108, 106, 32, 10, 32, 24, 108, 106, 34, 7, 65, 255, 63, 113, 106, 32, 12, 32, 20, 108, 106, 32, 13, 32, 18, 108, 106, 32, 14, 32, 17, 108, 106, 33, 5, 32, 11, 32, 24, 108, 32, 7, 65, 13, 118, 32, 5, 32, 6, 32, 15, 108, 106, 34, 15, 65, 13, 118, 106, 32, 3, 32, 33, 108, 106, 32, 4, 32, 31, 108, 106, 32, 8, 32, 30, 108, 106, 32, 9, 32, 29, 108, 106, 32, 10, 32, 26, 108, 106, 34, 3, 65, 255, 63, 113, 106, 32, 12, 32, 22, 108, 106, 32, 13, 32, 20, 108, 106, 32, 14, 32, 18, 108, 106, 33, 4, 32, 3, 65, 13, 118, 32, 4, 32, 6, 32, 17, 108, 106, 34, 6, 65, 13, 118, 106, 34, 3, 32, 3, 65, 2, 116, 106, 32, 32, 65, 255, 63, 113, 106, 34, 3, 65, 13, 118, 33, 4, 32, 3, 65, 255, 63, 113, 33, 3, 32, 25, 65, 255, 63, 113, 32, 4, 106, 33, 4, 32, 28, 65, 255, 63, 113, 33, 8, 32, 23, 65, 255, 63, 113, 33, 9, 32, 27, 65, 255, 63, 113, 33, 10, 32, 21, 65, 255, 63, 113, 33, 11, 32, 19, 65, 255, 63, 113, 33, 12, 32, 16, 65, 255, 63, 113, 33, 13, 32, 15, 65, 255, 63, 113, 33, 14, 32, 6, 65, 255, 63, 113, 33, 6, 32, 1, 65, 16, 106, 33, 1, 32, 2, 65, 16, 107, 33, 2, 12, 1, 11, 11, 35, 29, 32, 3, 59, 1, 0, 35, 29, 65, 2, 106, 32, 4, 59, 1, 0, 35, 29, 65, 4, 106, 32, 8, 59, 1, 0, 35, 29, 65, 6, 106, 32, 9, 59, 1, 0, 35, 29, 65, 8, 106, 32, 10, 59, 1, 0, 35, 29, 65, 10, 106, 32, 11, 59, 1, 0, 35, 29, 65, 12, 106, 32, 12, 59, 1, 0, 35, 29, 65, 14, 106, 32, 13, 59, 1, 0, 35, 29, 65, 16, 106, 32, 14, 59, 1, 0, 35, 29, 65, 18, 106, 32, 6, 59, 1, 0, 11, 203, 1, 1, 3, 127, 35, 32, 4, 64, 65, 16, 35, 32, 107, 34, 3, 32, 1, 75, 4, 64, 32, 1, 33, 3, 11, 3, 64, 32, 2, 32, 3, 73, 4, 64, 35, 25, 32, 2, 35, 32, 106, 106, 32, 0, 32, 2, 106, 45, 0, 0, 58, 0, 0, 32, 2, 65, 1, 106, 33, 2, 12, 1, 11, 11, 32, 1, 32, 3, 107, 33, 1, 32, 3, 33, 4, 32, 3, 35, 32, 106, 36, 32, 35, 32, 65, 16, 73, 4, 64, 15, 11, 35, 25, 65, 0, 65, 16, 16, 18, 65, 0, 36, 32, 11, 2, 127, 32, 1, 65, 16, 79, 4, 64, 32, 0, 32, 4, 32, 1, 32, 1, 65, 15, 113, 107, 34, 3, 16, 18, 32, 3, 32, 4, 106, 33, 4, 32, 1, 32, 3, 107, 33, 1, 11, 32, 1, 11, 4, 64, 65, 0, 33, 2, 3, 64, 32, 2, 32, 1, 73, 4, 64, 35, 25, 32, 2, 35, 32, 106, 106, 32, 0, 32, 2, 32, 4, 106, 106, 45, 0, 0, 58, 0, 0, 32, 2, 65, 1, 106, 33, 2, 12, 1, 11, 11, 32, 1, 35, 32, 106, 36, 32, 11, 11, 8, 0, 35, 22, 32, 0, 16, 19, 11, 149, 9, 1, 3, 127, 35, 32, 4, 64, 35, 32, 34, 1, 35, 25, 106, 65, 1, 58, 0, 0, 32, 1, 65, 1, 106, 33, 1, 3, 64, 32, 1, 65, 16, 73, 4, 64, 32, 1, 35, 25, 106, 65, 0, 58, 0, 0, 32, 1, 65, 1, 106, 33, 1, 12, 1, 11, 11, 65, 1, 36, 33, 35, 25, 65, 0, 65, 16, 16, 18, 11, 35, 29, 65, 2, 106, 47, 1, 0, 65, 13, 118, 33, 2, 35, 29, 65, 2, 106, 35, 29, 65, 2, 106, 47, 1, 0, 65, 255, 63, 113, 59, 1, 0, 65, 2, 33, 1, 3, 64, 32, 1, 65, 10, 73, 4, 64, 32, 1, 65, 1, 116, 34, 3, 35, 29, 106, 32, 2, 32, 3, 35, 29, 106, 47, 1, 0, 106, 59, 1, 0, 32, 3, 35, 29, 106, 47, 1, 0, 65, 13, 118, 33, 2, 32, 3, 35, 29, 106, 32, 3, 35, 29, 106, 47, 1, 0, 65, 255, 63, 113, 59, 1, 0, 32, 1, 65, 1, 106, 33, 1, 12, 1, 11, 11, 35, 29, 35, 29, 47, 1, 0, 32, 2, 65, 5, 108, 106, 59, 1, 0, 35, 29, 47, 1, 0, 33, 1, 35, 29, 35, 29, 47, 1, 0, 65, 255, 63, 113, 59, 1, 0, 35, 29, 65, 2, 106, 35, 29, 65, 2, 106, 47, 1, 0, 32, 1, 65, 255, 255, 3, 113, 65, 13, 118, 106, 59, 1, 0, 35, 29, 65, 2, 106, 47, 1, 0, 33, 1, 35, 29, 65, 2, 106, 35, 29, 65, 2, 106, 47, 1, 0, 65, 255, 63, 113, 59, 1, 0, 35, 29, 65, 4, 106, 35, 29, 65, 4, 106, 47, 1, 0, 32, 1, 65, 255, 255, 3, 113, 65, 13, 118, 106, 59, 1, 0, 35, 36, 35, 29, 47, 1, 0, 65, 5, 106, 59, 1, 0, 35, 36, 47, 1, 0, 65, 13, 118, 33, 2, 35, 36, 35, 36, 47, 1, 0, 65, 255, 63, 113, 59, 1, 0, 65, 1, 33, 1, 3, 64, 32, 1, 65, 10, 73, 4, 64, 32, 1, 65, 1, 116, 34, 3, 35, 36, 106, 32, 2, 32, 3, 35, 29, 106, 47, 1, 0, 106, 59, 1, 0, 32, 3, 35, 36, 106, 47, 1, 0, 65, 13, 118, 33, 2, 32, 3, 35, 36, 106, 32, 3, 35, 36, 106, 47, 1, 0, 65, 255, 63, 113, 59, 1, 0, 32, 1, 65, 1, 106, 33, 1, 12, 1, 11, 11, 35, 36, 65, 18, 106, 35, 36, 65, 18, 106, 47, 1, 0, 65, 128, 64, 106, 59, 1, 0, 32, 2, 65, 1, 115, 65, 1, 107, 33, 2, 65, 0, 33, 1, 3, 64, 32, 1, 65, 10, 73, 4, 64, 32, 1, 65, 1, 116, 34, 3, 35, 36, 106, 32, 2, 32, 3, 35, 36, 106, 47, 1, 0, 113, 59, 1, 0, 32, 1, 65, 1, 106, 33, 1, 12, 1, 11, 11, 32, 2, 65, 127, 115, 33, 3, 65, 0, 33, 1, 3, 64, 32, 1, 65, 10, 73, 4, 64, 32, 1, 65, 1, 116, 34, 2, 35, 29, 106, 32, 2, 35, 36, 106, 47, 1, 0, 32, 3, 32, 2, 35, 29, 106, 47, 1, 0, 113, 114, 59, 1, 0, 32, 1, 65, 1, 106, 33, 1, 12, 1, 11, 11, 35, 29, 35, 29, 47, 1, 0, 35, 29, 65, 2, 106, 47, 1, 0, 65, 13, 116, 114, 59, 1, 0, 35, 29, 65, 2, 106, 35, 29, 65, 4, 106, 47, 1, 0, 65, 10, 116, 35, 29, 65, 2, 106, 47, 1, 0, 65, 3, 118, 114, 59, 1, 0, 35, 29, 65, 4, 106, 35, 29, 65, 6, 106, 47, 1, 0, 65, 7, 116, 35, 29, 65, 4, 106, 47, 1, 0, 65, 6, 118, 114, 59, 1, 0, 35, 29, 65, 6, 106, 35, 29, 65, 8, 106, 47, 1, 0, 65, 4, 116, 35, 29, 65, 6, 106, 47, 1, 0, 65, 9, 118, 114, 59, 1, 0, 35, 29, 65, 8, 106, 35, 29, 65, 10, 106, 47, 1, 0, 65, 1, 116, 35, 29, 65, 8, 106, 47, 1, 0, 65, 12, 118, 114, 35, 29, 65, 12, 106, 47, 1, 0, 65, 14, 116, 114, 59, 1, 0, 35, 29, 65, 10, 106, 35, 29, 65, 14, 106, 47, 1, 0, 65, 11, 116, 35, 29, 65, 12, 106, 47, 1, 0, 65, 2, 118, 114, 59, 1, 0, 35, 29, 65, 12, 106, 35, 29, 65, 16, 106, 47, 1, 0, 65, 8, 116, 35, 29, 65, 14, 106, 47, 1, 0, 65, 5, 118, 114, 59, 1, 0, 35, 29, 65, 14, 106, 35, 29, 65, 18, 106, 47, 1, 0, 65, 5, 116, 35, 29, 65, 16, 106, 47, 1, 0, 65, 8, 118, 114, 59, 1, 0, 35, 29, 35, 29, 47, 1, 0, 35, 31, 47, 1, 0, 106, 34, 2, 59, 1, 0, 65, 1, 33, 1, 3, 64, 32, 1, 65, 8, 73, 4, 64, 32, 1, 65, 1, 116, 34, 3, 35, 29, 106, 47, 1, 0, 32, 3, 35, 31, 106, 47, 1, 0, 106, 32, 2, 65, 16, 118, 106, 33, 2, 35, 29, 32, 3, 106, 32, 2, 59, 1, 0, 32, 1, 65, 1, 106, 33, 1, 12, 1, 11, 11, 32, 0, 35, 29, 47, 1, 0, 58, 0, 0, 32, 0, 65, 1, 106, 35, 29, 47, 1, 0, 65, 8, 118, 58, 0, 0, 32, 0, 65, 2, 106, 35, 29, 65, 2, 106, 47, 1, 0, 58, 0, 0, 32, 0, 65, 3, 106, 35, 29, 65, 2, 106, 47, 1, 0, 65, 8, 118, 58, 0, 0, 32, 0, 65, 4, 106, 35, 29, 65, 4, 106, 47, 1, 0, 58, 0, 0, 32, 0, 65, 5, 106, 35, 29, 65, 4, 106, 47, 1, 0, 65, 8, 118, 58, 0, 0, 32, 0, 65, 6, 106, 35, 29, 65, 6, 106, 47, 1, 0, 58, 0, 0, 32, 0, 65, 7, 106, 35, 29, 65, 6, 106, 47, 1, 0, 65, 8, 118, 58, 0, 0, 32, 0, 65, 8, 106, 35, 29, 65, 8, 106, 47, 1, 0, 58, 0, 0, 32, 0, 65, 9, 106, 35, 29, 65, 8, 106, 47, 1, 0, 65, 8, 118, 58, 0, 0, 32, 0, 65, 10, 106, 35, 29, 65, 10, 106, 47, 1, 0, 58, 0, 0, 32, 0, 65, 11, 106, 35, 29, 65, 10, 106, 47, 1, 0, 65, 8, 118, 58, 0, 0, 32, 0, 65, 12, 106, 35, 29, 65, 12, 106, 47, 1, 0, 58, 0, 0, 32, 0, 65, 13, 106, 35, 29, 65, 12, 106, 47, 1, 0, 65, 8, 118, 58, 0, 0, 32, 0, 65, 14, 106, 35, 29, 65, 14, 106, 47, 1, 0, 58, 0, 0, 32, 0, 65, 15, 106, 35, 29, 65, 14, 106, 47, 1, 0, 65, 8, 118, 58, 0, 0, 65, 1, 36, 34, 11, 11, 0, 32, 0, 32, 1, 65, 1, 116, 16, 3, 11, 38, 0, 35, 25, 65, 16, 16, 13, 35, 27, 65, 10, 16, 22, 35, 29, 65, 10, 16, 22, 35, 31, 65, 8, 16, 22, 65, 0, 36, 32, 65, 0, 36, 33, 65, 0, 36, 34, 11, 33, 1, 1, 127, 35, 23, 33, 0, 35, 34, 4, 64, 65, 144, 2, 65, 208, 2, 65, 226, 3, 65, 4, 16, 0, 0, 11, 32, 0, 16, 21, 16, 23, 11, 39, 1, 1, 127, 3, 64, 32, 0, 65, 32, 73, 4, 64, 32, 0, 35, 7, 106, 65, 0, 58, 0, 0, 32, 0, 65, 1, 106, 33, 0, 12, 1, 11, 11, 65, 32, 16, 15, 26, 11, 152, 2, 1, 1, 127, 3, 64, 32, 4, 65, 32, 72, 4, 64, 32, 4, 35, 9, 106, 32, 0, 32, 4, 106, 45, 0, 0, 58, 0, 0, 32, 4, 65, 1, 106, 33, 4, 12, 1, 11, 11, 65, 0, 33, 4, 3, 64, 32, 4, 65, 4, 72, 4, 64, 32, 4, 35, 11, 106, 65, 0, 58, 0, 0, 32, 4, 65, 1, 106, 33, 4, 12, 1, 11, 11, 65, 4, 33, 4, 3, 64, 32, 4, 65, 16, 72, 4, 64, 32, 4, 35, 11, 106, 32, 1, 32, 4, 65, 4, 107, 106, 45, 0, 0, 58, 0, 0, 32, 4, 65, 1, 106, 33, 4, 12, 1, 11, 11, 16, 25, 65, 0, 33, 4, 3, 64, 32, 4, 65, 32, 72, 4, 64, 32, 4, 35, 21, 106, 32, 4, 35, 13, 106, 45, 0, 0, 58, 0, 0, 32, 4, 65, 1, 106, 33, 4, 12, 1, 11, 11, 35, 21, 16, 16, 32, 3, 65, 0, 75, 4, 64, 65, 0, 33, 4, 3, 64, 32, 4, 32, 3, 73, 4, 64, 32, 4, 35, 22, 106, 32, 2, 32, 4, 106, 45, 0, 0, 58, 0, 0, 32, 4, 65, 1, 106, 33, 4, 12, 1, 11, 11, 32, 3, 16, 20, 32, 3, 65, 15, 113, 65, 0, 75, 4, 64, 65, 16, 32, 3, 65, 15, 113, 107, 34, 1, 65, 0, 74, 4, 64, 65, 0, 33, 0, 3, 64, 32, 0, 32, 1, 72, 4, 64, 32, 0, 35, 22, 106, 65, 0, 58, 0, 0, 32, 0, 65, 1, 106, 33, 0, 12, 1, 11, 11, 32, 1, 16, 20, 11, 11, 11, 11, 65, 1, 1, 127, 3, 64, 32, 2, 32, 1, 73, 4, 64, 35, 22, 32, 2, 106, 32, 0, 32, 2, 106, 45, 0, 0, 58, 0, 0, 35, 7, 32, 2, 106, 32, 0, 32, 2, 106, 45, 0, 0, 58, 0, 0, 32, 2, 65, 1, 106, 33, 2, 12, 1, 11, 11, 32, 1, 16, 20, 32, 1, 16, 15, 26, 11, 27, 0, 32, 0, 32, 1, 65, 0, 16, 10, 32, 0, 173, 66, 128, 128, 128, 128, 16, 127, 167, 32, 1, 65, 4, 16, 10, 11, 87, 1, 2, 127, 32, 0, 65, 15, 113, 65, 0, 75, 4, 64, 65, 16, 32, 0, 65, 15, 113, 107, 34, 3, 65, 0, 74, 4, 64, 3, 64, 32, 2, 32, 3, 72, 4, 64, 32, 2, 35, 22, 106, 65, 0, 58, 0, 0, 32, 2, 65, 1, 106, 33, 2, 12, 1, 11, 11, 32, 3, 16, 20, 11, 11, 32, 1, 35, 22, 16, 28, 65, 8, 16, 20, 32, 0, 35, 22, 16, 28, 65, 8, 16, 20, 16, 24, 11, 34, 0, 32, 0, 4, 64, 35, 38, 35, 40, 35, 42, 32, 4, 16, 26, 11, 35, 44, 32, 2, 16, 27, 32, 1, 4, 64, 32, 3, 32, 4, 16, 29, 11, 11, 89, 1, 1, 127, 3, 64, 32, 2, 32, 1, 73, 4, 64, 35, 7, 32, 2, 106, 32, 0, 32, 2, 106, 45, 0, 0, 58, 0, 0, 32, 2, 65, 1, 106, 33, 2, 12, 1, 11, 11, 32, 1, 16, 15, 26, 65, 0, 33, 2, 3, 64, 32, 2, 32, 1, 73, 4, 64, 35, 22, 32, 2, 106, 32, 2, 35, 13, 106, 45, 0, 0, 58, 0, 0, 32, 2, 65, 1, 106, 33, 2, 12, 1, 11, 11, 32, 1, 16, 20, 11, 34, 0, 32, 0, 4, 64, 35, 38, 35, 40, 35, 42, 32, 4, 16, 26, 11, 35, 44, 32, 2, 16, 31, 32, 1, 4, 64, 32, 3, 32, 4, 16, 29, 11, 11, 8, 0, 16, 5, 16, 8, 16, 9, 11, 11, 234, 2, 6, 0, 65, 16, 11, 43, 28, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 28, 0, 0, 0, 73, 0, 110, 0, 118, 0, 97, 0, 108, 0, 105, 0, 100, 0, 32, 0, 108, 0, 101, 0, 110, 0, 103, 0, 116, 0, 104, 0, 65, 192, 0, 11, 53, 38, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 38, 0, 0, 0, 126, 0, 108, 0, 105, 0, 98, 0, 47, 0, 97, 0, 114, 0, 114, 0, 97, 0, 121, 0, 98, 0, 117, 0, 102, 0, 102, 0, 101, 0, 114, 0, 46, 0, 116, 0, 115, 0, 65, 128, 1, 11, 63, 48, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 48, 0, 0, 0, 67, 0, 104, 0, 97, 0, 67, 0, 104, 0, 97, 0, 58, 0, 32, 0, 99, 0, 111, 0, 117, 0, 110, 0, 116, 0, 101, 0, 114, 0, 32, 0, 111, 0, 118, 0, 101, 0, 114, 0, 102, 0, 108, 0, 111, 0, 119, 0, 65, 192, 1, 11, 55, 40, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 40, 0, 0, 0, 97, 0, 115, 0, 115, 0, 101, 0, 109, 0, 98, 0, 108, 0, 121, 0, 47, 0, 99, 0, 104, 0, 97, 0, 99, 0, 104, 0, 97, 0, 50, 0, 48, 0, 46, 0, 116, 0, 115, 0, 65, 128, 2, 11, 57, 42, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 42, 0, 0, 0, 80, 0, 111, 0, 108, 0, 121, 0, 49, 0, 51, 0, 48, 0, 53, 0, 32, 0, 119, 0, 97, 0, 115, 0, 32, 0, 102, 0, 105, 0, 110, 0, 105, 0, 115, 0, 104, 0, 101, 0, 100, 0, 65, 192, 2, 11, 55, 40, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 40, 0, 0, 0, 97, 0, 115, 0, 115, 0, 101, 0, 109, 0, 98, 0, 108, 0, 121, 0, 47, 0, 112, 0, 111, 0, 108, 0, 121, 0, 49, 0, 51, 0, 48, 0, 53, 0, 46, 0, 116, 0, 115]);
  }
});

// node_modules/@chainsafe/as-chacha20poly1305/lib/src/wasm.js
var require_wasm = __commonJS({
  "node_modules/@chainsafe/as-chacha20poly1305/lib/src/wasm.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.newInstance = void 0;
    var wasmCode_1 = require_wasmCode();
    var _module = new WebAssembly.Module(wasmCode_1.wasmCode);
    var importObj2 = {
      env: {
        // modified from https://github.com/AssemblyScript/assemblyscript/blob/v0.9.2/lib/loader/index.js#L70
        abort: function(msg, file, line, col) {
          throw Error(`abort: ${msg}:${file}:${line}:${col}`);
        }
      }
    };
    function newInstance3() {
      return new WebAssembly.Instance(_module, importObj2).exports;
    }
    exports2.newInstance = newInstance3;
  }
});

// node_modules/@chainsafe/as-chacha20poly1305/lib/src/chacha20.js
var require_chacha20 = __commonJS({
  "node_modules/@chainsafe/as-chacha20poly1305/lib/src/chacha20.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.chacha20StreamXOR = void 0;
    var wasm_1 = require_wasm();
    var ctx3 = wasm_1.newInstance();
    var wasmInputValue2 = ctx3.chacha20Input.value;
    var wasmOutputValue2 = ctx3.chacha20Output.value;
    var wasmKeyValue = ctx3.chacha20Key.value;
    var wasmCounterValue = ctx3.chacha20Counter.value;
    var { CHACHA20_INPUT_LENGTH, KEY_LENGTH, CHACHA20_COUNTER_LENGTH } = ctx3;
    var inputArr = new Uint8Array(ctx3.memory.buffer, wasmInputValue2, CHACHA20_INPUT_LENGTH);
    var outputArr = new Uint8Array(ctx3.memory.buffer, wasmOutputValue2, CHACHA20_INPUT_LENGTH);
    var keyArr = new Uint8Array(ctx3.memory.buffer, wasmKeyValue, KEY_LENGTH);
    var counterArr = new Uint8Array(ctx3.memory.buffer, wasmCounterValue, CHACHA20_COUNTER_LENGTH);
    function chacha20StreamXOR(key, nonce, src2) {
      if (key.length != KEY_LENGTH) {
        throw new Error("ChaCha: key size must be 32 bytes, expected " + KEY_LENGTH + " got " + key.length);
      }
      if (nonce.length != CHACHA20_COUNTER_LENGTH) {
        throw new Error("ChaCha nonce with counter must be 16 bytes");
      }
      keyArr.set(key);
      counterArr.set(nonce);
      const output = new Uint8Array(src2.length);
      const loop = Math.floor(src2.length / CHACHA20_INPUT_LENGTH);
      for (let i2 = 0; i2 <= loop; i2++) {
        const start2 = i2 * CHACHA20_INPUT_LENGTH;
        const end = Math.min((i2 + 1) * CHACHA20_INPUT_LENGTH, src2.length);
        inputArr.set(loop === 0 ? src2 : src2.subarray(start2, end));
        const length3 = end - start2;
        const dataLength = ctx3.chacha20StreamXORUpdate(length3);
        output.set(dataLength === CHACHA20_INPUT_LENGTH ? outputArr : outputArr.subarray(0, dataLength), start2);
      }
      return output;
    }
    exports2.chacha20StreamXOR = chacha20StreamXOR;
  }
});

// node_modules/@chainsafe/as-chacha20poly1305/lib/src/index.js
var require_src = __commonJS({
  "node_modules/@chainsafe/as-chacha20poly1305/lib/src/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.newInstance = exports2.chacha20StreamXOR = exports2.Poly1305 = exports2.ChaCha20Poly1305 = void 0;
    var chacha20poly1305_1 = require_chacha20poly1305();
    Object.defineProperty(exports2, "ChaCha20Poly1305", { enumerable: true, get: function() {
      return chacha20poly1305_1.ChaCha20Poly1305;
    } });
    var poly1305_1 = require_poly1305();
    Object.defineProperty(exports2, "Poly1305", { enumerable: true, get: function() {
      return poly1305_1.Poly1305;
    } });
    var chacha20_1 = require_chacha20();
    Object.defineProperty(exports2, "chacha20StreamXOR", { enumerable: true, get: function() {
      return chacha20_1.chacha20StreamXOR;
    } });
    var wasm_1 = require_wasm();
    Object.defineProperty(exports2, "newInstance", { enumerable: true, get: function() {
      return wasm_1.newInstance;
    } });
  }
});

// node_modules/is-electron/index.js
var require_is_electron = __commonJS({
  "node_modules/is-electron/index.js"(exports2, module2) {
    function isElectron2() {
      if (typeof window !== "undefined" && typeof window.process === "object" && window.process.type === "renderer") {
        return true;
      }
      if (typeof process !== "undefined" && typeof process.versions === "object" && !!process.versions.electron) {
        return true;
      }
      if (typeof navigator === "object" && typeof navigator.userAgent === "string" && navigator.userAgent.indexOf("Electron") >= 0) {
        return true;
      }
      return false;
    }
    module2.exports = isElectron2;
  }
});

// node_modules/@libp2p/crypto/node_modules/@libp2p/interface/dist/src/errors.js
var InvalidParametersError = class extends Error {
  static name = "InvalidParametersError";
  constructor(message2 = "Invalid parameters") {
    super(message2);
    this.name = "InvalidParametersError";
  }
};
var InvalidPublicKeyError = class extends Error {
  static name = "InvalidPublicKeyError";
  constructor(message2 = "Invalid public key") {
    super(message2);
    this.name = "InvalidPublicKeyError";
  }
};
var InvalidPrivateKeyError = class extends Error {
  static name = "InvalidPrivateKeyError";
  constructor(message2 = "Invalid private key") {
    super(message2);
    this.name = "InvalidPrivateKeyError";
  }
};
var UnsupportedKeyTypeError = class extends Error {
  static name = "UnsupportedKeyTypeError";
  constructor(message2 = "Unsupported key type") {
    super(message2);
    this.name = "UnsupportedKeyTypeError";
  }
};

// node_modules/main-event/dist/src/events.js
var import_node_events = require("node:events");
var setMaxListeners = (n2, ...eventTargets) => {
  try {
    (0, import_node_events.setMaxListeners)(n2, ...eventTargets);
  } catch {
  }
};

// node_modules/main-event/dist/src/index.js
var TypedEventEmitter = class extends EventTarget {
  #listeners = /* @__PURE__ */ new Map();
  constructor() {
    super();
    setMaxListeners(Infinity, this);
  }
  listenerCount(type) {
    const listeners = this.#listeners.get(type);
    if (listeners == null) {
      return 0;
    }
    return listeners.length;
  }
  addEventListener(type, listener, options) {
    super.addEventListener(type, listener, options);
    let list = this.#listeners.get(type);
    if (list == null) {
      list = [];
      this.#listeners.set(type, list);
    }
    list.push({
      callback: listener,
      once: (options !== true && options !== false && options?.once) ?? false
    });
  }
  removeEventListener(type, listener, options) {
    super.removeEventListener(type.toString(), listener ?? null, options);
    let list = this.#listeners.get(type);
    if (list == null) {
      return;
    }
    list = list.filter(({ callback }) => callback !== listener);
    this.#listeners.set(type, list);
  }
  dispatchEvent(event) {
    const result = super.dispatchEvent(event);
    let list = this.#listeners.get(event.type);
    if (list == null) {
      return result;
    }
    list = list.filter(({ once }) => !once);
    this.#listeners.set(event.type, list);
    return result;
  }
  safeDispatchEvent(type, detail = {}) {
    return this.dispatchEvent(new CustomEvent(type, detail));
  }
};

// node_modules/multiformats/dist/src/bases/base58.js
var base58_exports = {};
__export(base58_exports, {
  base58btc: () => base58btc,
  base58flickr: () => base58flickr
});

// node_modules/multiformats/dist/src/bytes.js
var empty = new Uint8Array(0);
function equals(aa, bb) {
  if (aa === bb) {
    return true;
  }
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
}
function coerce(o2) {
  if (o2 instanceof Uint8Array && o2.constructor.name === "Uint8Array") {
    return o2;
  }
  if (o2 instanceof ArrayBuffer) {
    return new Uint8Array(o2);
  }
  if (ArrayBuffer.isView(o2)) {
    return new Uint8Array(o2.buffer, o2.byteOffset, o2.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
}
function fromString(str) {
  return new TextEncoder().encode(str);
}
function toString(b) {
  return new TextDecoder().decode(b);
}

// node_modules/multiformats/dist/src/vendor/base-x.js
function base(ALPHABET, name3) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i2 = 0; i2 < ALPHABET.length; i2++) {
    var x = ALPHABET.charAt(i2);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i2;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode7(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length3 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i3 = 0;
      for (var it1 = size - 1; (carry !== 0 || i3 < length3) && it1 !== -1; it1--, i3++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length3 = i3;
      pbegin++;
    }
    var it2 = size - length3;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length3 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i3 = 0;
      for (var it3 = size - 1; (carry !== 0 || i3 < length3) && it3 !== -1; it3--, i3++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length3 = i3;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length3;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode8(string2) {
    var buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name3} character`);
  }
  return {
    encode: encode7,
    decodeUnsafe,
    decode: decode8
  };
}
var src = base;
var _brrp__multiformats_scope_baseX = src;
var base_x_default = _brrp__multiformats_scope_baseX;

// node_modules/multiformats/dist/src/bases/base.js
var Encoder = class {
  name;
  prefix;
  baseEncode;
  constructor(name3, prefix, baseEncode) {
    this.name = name3;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes) {
    if (bytes instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder = class {
  name;
  prefix;
  baseDecode;
  prefixCodePoint;
  constructor(name3, prefix, baseDecode) {
    this.name = name3;
    this.prefix = prefix;
    const prefixCodePoint = prefix.codePointAt(0);
    if (prefixCodePoint === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefixCodePoint;
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or(this, decoder);
  }
};
var ComposedDecoder = class {
  decoders;
  constructor(decoders3) {
    this.decoders = decoders3;
  }
  or(decoder) {
    return or(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder != null) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
function or(left, right) {
  return new ComposedDecoder({
    ...left.decoders ?? { [left.prefix]: left },
    ...right.decoders ?? { [right.prefix]: right }
  });
}
var Codec = class {
  name;
  prefix;
  baseEncode;
  baseDecode;
  encoder;
  decoder;
  constructor(name3, prefix, baseEncode, baseDecode) {
    this.name = name3;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder(name3, prefix, baseEncode);
    this.decoder = new Decoder(name3, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
};
function from({ name: name3, prefix, encode: encode7, decode: decode8 }) {
  return new Codec(name3, prefix, encode7, decode8);
}
function baseX({ name: name3, prefix, alphabet: alphabet2 }) {
  const { encode: encode7, decode: decode8 } = base_x_default(alphabet2, name3);
  return from({
    prefix,
    name: name3,
    encode: encode7,
    decode: (text) => coerce(decode8(text))
  });
}
function decode(string2, alphabetIdx, bitsPerChar, name3) {
  let end = string2.length;
  while (string2[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer = 0;
  let written = 0;
  for (let i2 = 0; i2 < end; ++i2) {
    const value2 = alphabetIdx[string2[i2]];
    if (value2 === void 0) {
      throw new SyntaxError(`Non-${name3} character`);
    }
    buffer = buffer << bitsPerChar | value2;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || (255 & buffer << 8 - bits) !== 0) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
}
function encode(data, alphabet2, bitsPerChar) {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i2 = 0; i2 < data.length; ++i2) {
    buffer = buffer << 8 | data[i2];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer >> bits];
    }
  }
  if (bits !== 0) {
    out += alphabet2[mask & buffer << bitsPerChar - bits];
  }
  if (pad) {
    while ((out.length * bitsPerChar & 7) !== 0) {
      out += "=";
    }
  }
  return out;
}
function createAlphabetIdx(alphabet2) {
  const alphabetIdx = {};
  for (let i2 = 0; i2 < alphabet2.length; ++i2) {
    alphabetIdx[alphabet2[i2]] = i2;
  }
  return alphabetIdx;
}
function rfc4648({ name: name3, prefix, bitsPerChar, alphabet: alphabet2 }) {
  const alphabetIdx = createAlphabetIdx(alphabet2);
  return from({
    prefix,
    name: name3,
    encode(input) {
      return encode(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode(input, alphabetIdx, bitsPerChar, name3);
    }
  });
}

// node_modules/multiformats/dist/src/bases/base58.js
var base58btc = baseX({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr = baseX({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// node_modules/multiformats/dist/src/bases/base32.js
var base32_exports = {};
__export(base32_exports, {
  base32: () => base32,
  base32hex: () => base32hex,
  base32hexpad: () => base32hexpad,
  base32hexpadupper: () => base32hexpadupper,
  base32hexupper: () => base32hexupper,
  base32pad: () => base32pad,
  base32padupper: () => base32padupper,
  base32upper: () => base32upper,
  base32z: () => base32z
});
var base32 = rfc4648({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper = rfc4648({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad = rfc4648({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper = rfc4648({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex = rfc4648({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper = rfc4648({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad = rfc4648({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper = rfc4648({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z = rfc4648({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// node_modules/multiformats/dist/src/bases/base36.js
var base36_exports = {};
__export(base36_exports, {
  base36: () => base36,
  base36upper: () => base36upper
});
var base36 = baseX({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
var base36upper = baseX({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});

// node_modules/multiformats/dist/src/vendor/varint.js
var encode_1 = encode2;
var MSB = 128;
var REST = 127;
var MSBALL = ~REST;
var INT = Math.pow(2, 31);
function encode2(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT) {
    out[offset++] = num & 255 | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    out[offset++] = num & 255 | MSB;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode2.bytes = offset - oldOffset + 1;
  return out;
}
var decode2 = read;
var MSB$1 = 128;
var REST$1 = 127;
function read(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l2 = buf.length;
  do {
    if (counter >= l2) {
      read.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf[counter++];
    res += shift < 28 ? (b & REST$1) << shift : (b & REST$1) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$1);
  read.bytes = counter - offset;
  return res;
}
var N1 = Math.pow(2, 7);
var N2 = Math.pow(2, 14);
var N3 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);
var length = function(value2) {
  return value2 < N1 ? 1 : value2 < N2 ? 2 : value2 < N3 ? 3 : value2 < N4 ? 4 : value2 < N5 ? 5 : value2 < N6 ? 6 : value2 < N7 ? 7 : value2 < N8 ? 8 : value2 < N9 ? 9 : 10;
};
var varint = {
  encode: encode_1,
  decode: decode2,
  encodingLength: length
};
var _brrp_varint = varint;
var varint_default = _brrp_varint;

// node_modules/multiformats/dist/src/varint.js
function decode3(data, offset = 0) {
  const code3 = varint_default.decode(data, offset);
  return [code3, varint_default.decode.bytes];
}
function encodeTo(int, target, offset = 0) {
  varint_default.encode(int, target, offset);
  return target;
}
function encodingLength(int) {
  return varint_default.encodingLength(int);
}

// node_modules/multiformats/dist/src/hashes/digest.js
function create(code3, digest3) {
  const size = digest3.byteLength;
  const sizeOffset = encodingLength(code3);
  const digestOffset = sizeOffset + encodingLength(size);
  const bytes = new Uint8Array(digestOffset + size);
  encodeTo(code3, bytes, 0);
  encodeTo(size, bytes, sizeOffset);
  bytes.set(digest3, digestOffset);
  return new Digest(code3, size, digest3, bytes);
}
function decode4(multihash) {
  const bytes = coerce(multihash);
  const [code3, sizeOffset] = decode3(bytes);
  const [size, digestOffset] = decode3(bytes.subarray(sizeOffset));
  const digest3 = bytes.subarray(sizeOffset + digestOffset);
  if (digest3.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest(code3, size, digest3, bytes);
}
function equals2(a2, b) {
  if (a2 === b) {
    return true;
  } else {
    const data = b;
    return a2.code === data.code && a2.size === data.size && data.bytes instanceof Uint8Array && equals(a2.bytes, data.bytes);
  }
}
var Digest = class {
  code;
  size;
  digest;
  bytes;
  /**
   * Creates a multihash digest.
   */
  constructor(code3, size, digest3, bytes) {
    this.code = code3;
    this.size = size;
    this.digest = digest3;
    this.bytes = bytes;
  }
};

// node_modules/multiformats/dist/src/cid.js
function format(link, base3) {
  const { bytes, version: version2 } = link;
  switch (version2) {
    case 0:
      return toStringV0(bytes, baseCache(link), base3 ?? base58btc.encoder);
    default:
      return toStringV1(bytes, baseCache(link), base3 ?? base32.encoder);
  }
}
var cache = /* @__PURE__ */ new WeakMap();
function baseCache(cid) {
  const baseCache2 = cache.get(cid);
  if (baseCache2 == null) {
    const baseCache3 = /* @__PURE__ */ new Map();
    cache.set(cid, baseCache3);
    return baseCache3;
  }
  return baseCache2;
}
var CID = class _CID {
  code;
  version;
  multihash;
  bytes;
  "/";
  /**
   * @param version - Version of the CID
   * @param code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param multihash - (Multi)hash of the of the content.
   */
  constructor(version2, code3, multihash, bytes) {
    this.code = code3;
    this.version = version2;
    this.multihash = multihash;
    this.bytes = bytes;
    this["/"] = bytes;
  }
  /**
   * Signalling `cid.asCID === cid` has been replaced with `cid['/'] === cid.bytes`
   * please either use `CID.asCID(cid)` or switch to new signalling mechanism
   *
   * @deprecated
   */
  get asCID() {
    return this;
  }
  // ArrayBufferView
  get byteOffset() {
    return this.bytes.byteOffset;
  }
  // ArrayBufferView
  get byteLength() {
    return this.bytes.byteLength;
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      case 1: {
        const { code: code3, multihash } = this;
        if (code3 !== DAG_PB_CODE) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return _CID.createV0(multihash);
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code3, digest: digest3 } = this.multihash;
        const multihash = create(code3, digest3);
        return _CID.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 1. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return _CID.equals(this, other);
  }
  static equals(self2, other) {
    const unknown = other;
    return unknown != null && self2.code === unknown.code && self2.version === unknown.version && equals2(self2.multihash, unknown.multihash);
  }
  toString(base3) {
    return format(this, base3);
  }
  toJSON() {
    return { "/": format(this) };
  }
  link() {
    return this;
  }
  [Symbol.toStringTag] = "CID";
  // Legacy
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `CID(${this.toString()})`;
  }
  /**
   * Takes any input `value` and returns a `CID` instance if it was
   * a `CID` otherwise returns `null`. If `value` is instanceof `CID`
   * it will return value back. If `value` is not instance of this CID
   * class, but is compatible CID it will return new instance of this
   * `CID` class. Otherwise returns null.
   *
   * This allows two different incompatible versions of CID library to
   * co-exist and interop as long as binary interface is compatible.
   */
  static asCID(input) {
    if (input == null) {
      return null;
    }
    const value2 = input;
    if (value2 instanceof _CID) {
      return value2;
    } else if (value2["/"] != null && value2["/"] === value2.bytes || value2.asCID === value2) {
      const { version: version2, code: code3, multihash, bytes } = value2;
      return new _CID(version2, code3, multihash, bytes ?? encodeCID(version2, code3, multihash.bytes));
    } else if (value2[cidSymbol] === true) {
      const { version: version2, multihash, code: code3 } = value2;
      const digest3 = decode4(multihash);
      return _CID.create(version2, code3, digest3);
    } else {
      return null;
    }
  }
  /**
   * @param version - Version of the CID
   * @param code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param digest - (Multi)hash of the of the content.
   */
  static create(version2, code3, digest3) {
    if (typeof code3 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    if (!(digest3.bytes instanceof Uint8Array)) {
      throw new Error("Invalid digest");
    }
    switch (version2) {
      case 0: {
        if (code3 !== DAG_PB_CODE) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
        } else {
          return new _CID(version2, code3, digest3, digest3.bytes);
        }
      }
      case 1: {
        const bytes = encodeCID(version2, code3, digest3.bytes);
        return new _CID(version2, code3, digest3, bytes);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  /**
   * Simplified version of `create` for CIDv0.
   */
  static createV0(digest3) {
    return _CID.create(0, DAG_PB_CODE, digest3);
  }
  /**
   * Simplified version of `create` for CIDv1.
   *
   * @param code - Content encoding format code.
   * @param digest - Multihash of the content.
   */
  static createV1(code3, digest3) {
    return _CID.create(1, code3, digest3);
  }
  /**
   * Decoded a CID from its binary representation. The byte array must contain
   * only the CID with no additional bytes.
   *
   * An error will be thrown if the bytes provided do not contain a valid
   * binary representation of a CID.
   */
  static decode(bytes) {
    const [cid, remainder] = _CID.decodeFirst(bytes);
    if (remainder.length !== 0) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  /**
   * Decoded a CID from its binary representation at the beginning of a byte
   * array.
   *
   * Returns an array with the first element containing the CID and the second
   * element containing the remainder of the original byte array. The remainder
   * will be a zero-length byte array if the provided bytes only contained a
   * binary CID representation.
   */
  static decodeFirst(bytes) {
    const specs = _CID.inspectBytes(bytes);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest3 = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? _CID.createV0(digest3) : _CID.createV1(specs.codec, digest3);
    return [cid, bytes.subarray(specs.size)];
  }
  /**
   * Inspect the initial bytes of a CID to determine its properties.
   *
   * Involves decoding up to 4 varints. Typically this will require only 4 to 6
   * bytes but for larger multicodec code values and larger multihash digest
   * lengths these varints can be quite large. It is recommended that at least
   * 10 bytes be made available in the `initialBytes` argument for a complete
   * inspection.
   */
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i2, length3] = decode3(initialBytes.subarray(offset));
      offset += length3;
      return i2;
    };
    let version2 = next();
    let codec = DAG_PB_CODE;
    if (version2 === 18) {
      version2 = 0;
      offset = 0;
    } else {
      codec = next();
    }
    if (version2 !== 0 && version2 !== 1) {
      throw new RangeError(`Invalid CID version ${version2}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return { version: version2, codec, multihashCode, digestSize, multihashSize, size };
  }
  /**
   * Takes cid in a string representation and creates an instance. If `base`
   * decoder is not provided will use a default from the configuration. It will
   * throw an error if encoding of the CID is not compatible with supplied (or
   * a default decoder).
   */
  static parse(source, base3) {
    const [prefix, bytes] = parseCIDtoBytes(source, base3);
    const cid = _CID.decode(bytes);
    if (cid.version === 0 && source[0] !== "Q") {
      throw Error("Version 0 CID string must not include multibase prefix");
    }
    baseCache(cid).set(prefix, source);
    return cid;
  }
};
function parseCIDtoBytes(source, base3) {
  switch (source[0]) {
    case "Q": {
      const decoder = base3 ?? base58btc;
      return [
        base58btc.prefix,
        decoder.decode(`${base58btc.prefix}${source}`)
      ];
    }
    case base58btc.prefix: {
      const decoder = base3 ?? base58btc;
      return [base58btc.prefix, decoder.decode(source)];
    }
    case base32.prefix: {
      const decoder = base3 ?? base32;
      return [base32.prefix, decoder.decode(source)];
    }
    case base36.prefix: {
      const decoder = base3 ?? base36;
      return [base36.prefix, decoder.decode(source)];
    }
    default: {
      if (base3 == null) {
        throw Error("To parse non base32, base36 or base58btc encoded CID multibase decoder must be provided");
      }
      return [source[0], base3.decode(source)];
    }
  }
}
function toStringV0(bytes, cache3, base3) {
  const { prefix } = base3;
  if (prefix !== base58btc.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache3.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes).slice(1);
    cache3.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
}
function toStringV1(bytes, cache3, base3) {
  const { prefix } = base3;
  const cid = cache3.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes);
    cache3.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
}
var DAG_PB_CODE = 112;
var SHA_256_CODE = 18;
function encodeCID(version2, code3, multihash) {
  const codeOffset = encodingLength(version2);
  const hashOffset = codeOffset + encodingLength(code3);
  const bytes = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo(version2, bytes, 0);
  encodeTo(code3, bytes, codeOffset);
  bytes.set(multihash, hashOffset);
  return bytes;
}
var cidSymbol = Symbol.for("@ipld/js-cid/CID");

// node_modules/multiformats/dist/src/hashes/identity.js
var identity_exports = {};
__export(identity_exports, {
  identity: () => identity
});
var code = 0;
var name = "identity";
var encode3 = coerce;
function digest(input, options) {
  if (options?.truncate != null && options.truncate !== input.byteLength) {
    if (options.truncate < 0 || options.truncate > input.byteLength) {
      throw new Error(`Invalid truncate option, must be less than or equal to ${input.byteLength}`);
    }
    input = input.subarray(0, options.truncate);
  }
  return create(code, encode3(input));
}
var identity = { code, name, encode: encode3, digest };

// node_modules/uint8arrays/dist/src/equals.js
function equals3(a2, b) {
  if (a2 === b) {
    return true;
  }
  if (a2.byteLength !== b.byteLength) {
    return false;
  }
  for (let i2 = 0; i2 < a2.byteLength; i2++) {
    if (a2[i2] !== b[i2]) {
      return false;
    }
  }
  return true;
}

// node_modules/uint8arrays/dist/src/alloc.node.js
var import_node_buffer = require("node:buffer");

// node_modules/uint8arrays/dist/src/util/as-uint8array.node.js
function asUint8Array(buf) {
  return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
}

// node_modules/uint8arrays/dist/src/alloc.node.js
function alloc(size = 0) {
  return asUint8Array(import_node_buffer.Buffer.alloc(size));
}
function allocUnsafe(size = 0) {
  return asUint8Array(import_node_buffer.Buffer.allocUnsafe(size));
}

// node_modules/uint8arrays/dist/src/concat.node.js
var import_node_buffer2 = require("node:buffer");
function concat(arrays, length3) {
  return asUint8Array(import_node_buffer2.Buffer.concat(arrays, length3));
}

// node_modules/uint8arraylist/dist/src/index.js
var symbol = Symbol.for("@achingbrain/uint8arraylist");
function findBufAndOffset(bufs, index) {
  if (index == null || index < 0) {
    throw new RangeError("index is out of bounds");
  }
  let offset = 0;
  for (const buf of bufs) {
    const bufEnd = offset + buf.byteLength;
    if (index < bufEnd) {
      return {
        buf,
        index: index - offset
      };
    }
    offset = bufEnd;
  }
  throw new RangeError("index is out of bounds");
}
function isUint8ArrayList(value2) {
  return Boolean(value2?.[symbol]);
}
var Uint8ArrayList = class _Uint8ArrayList {
  bufs;
  length;
  [symbol] = true;
  constructor(...data) {
    this.bufs = [];
    this.length = 0;
    if (data.length > 0) {
      this.appendAll(data);
    }
  }
  *[Symbol.iterator]() {
    yield* this.bufs;
  }
  get byteLength() {
    return this.length;
  }
  /**
   * Add one or more `bufs` to the end of this Uint8ArrayList
   */
  append(...bufs) {
    this.appendAll(bufs);
  }
  /**
   * Add all `bufs` to the end of this Uint8ArrayList
   */
  appendAll(bufs) {
    let length3 = 0;
    for (const buf of bufs) {
      if (buf instanceof Uint8Array) {
        length3 += buf.byteLength;
        this.bufs.push(buf);
      } else if (isUint8ArrayList(buf)) {
        length3 += buf.byteLength;
        this.bufs.push(...buf.bufs);
      } else {
        throw new Error("Could not append value, must be an Uint8Array or a Uint8ArrayList");
      }
    }
    this.length += length3;
  }
  /**
   * Add one or more `bufs` to the start of this Uint8ArrayList
   */
  prepend(...bufs) {
    this.prependAll(bufs);
  }
  /**
   * Add all `bufs` to the start of this Uint8ArrayList
   */
  prependAll(bufs) {
    let length3 = 0;
    for (const buf of bufs.reverse()) {
      if (buf instanceof Uint8Array) {
        length3 += buf.byteLength;
        this.bufs.unshift(buf);
      } else if (isUint8ArrayList(buf)) {
        length3 += buf.byteLength;
        this.bufs.unshift(...buf.bufs);
      } else {
        throw new Error("Could not prepend value, must be an Uint8Array or a Uint8ArrayList");
      }
    }
    this.length += length3;
  }
  /**
   * Read the value at `index`
   */
  get(index) {
    const res = findBufAndOffset(this.bufs, index);
    return res.buf[res.index];
  }
  /**
   * Set the value at `index` to `value`
   */
  set(index, value2) {
    const res = findBufAndOffset(this.bufs, index);
    res.buf[res.index] = value2;
  }
  /**
   * Copy bytes from `buf` to the index specified by `offset`
   */
  write(buf, offset = 0) {
    if (buf instanceof Uint8Array) {
      for (let i2 = 0; i2 < buf.length; i2++) {
        this.set(offset + i2, buf[i2]);
      }
    } else if (isUint8ArrayList(buf)) {
      for (let i2 = 0; i2 < buf.length; i2++) {
        this.set(offset + i2, buf.get(i2));
      }
    } else {
      throw new Error("Could not write value, must be an Uint8Array or a Uint8ArrayList");
    }
  }
  /**
   * Remove bytes from the front of the pool
   */
  consume(bytes) {
    bytes = Math.trunc(bytes);
    if (Number.isNaN(bytes) || bytes <= 0) {
      return;
    }
    if (bytes === this.byteLength) {
      this.bufs = [];
      this.length = 0;
      return;
    }
    while (this.bufs.length > 0) {
      if (bytes >= this.bufs[0].byteLength) {
        bytes -= this.bufs[0].byteLength;
        this.length -= this.bufs[0].byteLength;
        this.bufs.shift();
      } else {
        this.bufs[0] = this.bufs[0].subarray(bytes);
        this.length -= bytes;
        break;
      }
    }
  }
  /**
   * Extracts a section of an array and returns a new array.
   *
   * This is a copy operation as it is with Uint8Arrays and Arrays
   * - note this is different to the behaviour of Node Buffers.
   */
  slice(beginInclusive, endExclusive) {
    const { bufs, length: length3 } = this._subList(beginInclusive, endExclusive);
    return concat(bufs, length3);
  }
  /**
   * Returns a alloc from the given start and end element index.
   *
   * In the best case where the data extracted comes from a single Uint8Array
   * internally this is a no-copy operation otherwise it is a copy operation.
   */
  subarray(beginInclusive, endExclusive) {
    const { bufs, length: length3 } = this._subList(beginInclusive, endExclusive);
    if (bufs.length === 1) {
      return bufs[0];
    }
    return concat(bufs, length3);
  }
  /**
   * Returns a allocList from the given start and end element index.
   *
   * This is a no-copy operation.
   */
  sublist(beginInclusive, endExclusive) {
    const { bufs, length: length3 } = this._subList(beginInclusive, endExclusive);
    const list = new _Uint8ArrayList();
    list.length = length3;
    list.bufs = [...bufs];
    return list;
  }
  _subList(beginInclusive, endExclusive) {
    beginInclusive = beginInclusive ?? 0;
    endExclusive = endExclusive ?? this.length;
    if (beginInclusive < 0) {
      beginInclusive = this.length + beginInclusive;
    }
    if (endExclusive < 0) {
      endExclusive = this.length + endExclusive;
    }
    if (beginInclusive < 0 || endExclusive > this.length) {
      throw new RangeError("index is out of bounds");
    }
    if (beginInclusive === endExclusive) {
      return { bufs: [], length: 0 };
    }
    if (beginInclusive === 0 && endExclusive === this.length) {
      return { bufs: this.bufs, length: this.length };
    }
    const bufs = [];
    let offset = 0;
    for (let i2 = 0; i2 < this.bufs.length; i2++) {
      const buf = this.bufs[i2];
      const bufStart = offset;
      const bufEnd = bufStart + buf.byteLength;
      offset = bufEnd;
      if (beginInclusive >= bufEnd) {
        continue;
      }
      const sliceStartInBuf = beginInclusive >= bufStart && beginInclusive < bufEnd;
      const sliceEndsInBuf = endExclusive > bufStart && endExclusive <= bufEnd;
      if (sliceStartInBuf && sliceEndsInBuf) {
        if (beginInclusive === bufStart && endExclusive === bufEnd) {
          bufs.push(buf);
          break;
        }
        const start2 = beginInclusive - bufStart;
        bufs.push(buf.subarray(start2, start2 + (endExclusive - beginInclusive)));
        break;
      }
      if (sliceStartInBuf) {
        if (beginInclusive === 0) {
          bufs.push(buf);
          continue;
        }
        bufs.push(buf.subarray(beginInclusive - bufStart));
        continue;
      }
      if (sliceEndsInBuf) {
        if (endExclusive === bufEnd) {
          bufs.push(buf);
          break;
        }
        bufs.push(buf.subarray(0, endExclusive - bufStart));
        break;
      }
      bufs.push(buf);
    }
    return { bufs, length: endExclusive - beginInclusive };
  }
  indexOf(search, offset = 0) {
    if (!isUint8ArrayList(search) && !(search instanceof Uint8Array)) {
      throw new TypeError('The "value" argument must be a Uint8ArrayList or Uint8Array');
    }
    const needle = search instanceof Uint8Array ? search : search.subarray();
    offset = Number(offset ?? 0);
    if (isNaN(offset)) {
      offset = 0;
    }
    if (offset < 0) {
      offset = this.length + offset;
    }
    if (offset < 0) {
      offset = 0;
    }
    if (search.length === 0) {
      return offset > this.length ? this.length : offset;
    }
    const M = needle.byteLength;
    if (M === 0) {
      throw new TypeError("search must be at least 1 byte long");
    }
    const radix = 256;
    const rightmostPositions = new Int32Array(radix);
    for (let c2 = 0; c2 < radix; c2++) {
      rightmostPositions[c2] = -1;
    }
    for (let j = 0; j < M; j++) {
      rightmostPositions[needle[j]] = j;
    }
    const right = rightmostPositions;
    const lastIndex = this.byteLength - needle.byteLength;
    const lastPatIndex = needle.byteLength - 1;
    let skip;
    for (let i2 = offset; i2 <= lastIndex; i2 += skip) {
      skip = 0;
      for (let j = lastPatIndex; j >= 0; j--) {
        const char = this.get(i2 + j);
        if (needle[j] !== char) {
          skip = Math.max(1, j - right[char]);
          break;
        }
      }
      if (skip === 0) {
        return i2;
      }
    }
    return -1;
  }
  getInt8(byteOffset) {
    const buf = this.subarray(byteOffset, byteOffset + 1);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    return view.getInt8(0);
  }
  setInt8(byteOffset, value2) {
    const buf = allocUnsafe(1);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    view.setInt8(0, value2);
    this.write(buf, byteOffset);
  }
  getInt16(byteOffset, littleEndian) {
    const buf = this.subarray(byteOffset, byteOffset + 2);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    return view.getInt16(0, littleEndian);
  }
  setInt16(byteOffset, value2, littleEndian) {
    const buf = alloc(2);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    view.setInt16(0, value2, littleEndian);
    this.write(buf, byteOffset);
  }
  getInt32(byteOffset, littleEndian) {
    const buf = this.subarray(byteOffset, byteOffset + 4);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    return view.getInt32(0, littleEndian);
  }
  setInt32(byteOffset, value2, littleEndian) {
    const buf = alloc(4);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    view.setInt32(0, value2, littleEndian);
    this.write(buf, byteOffset);
  }
  getBigInt64(byteOffset, littleEndian) {
    const buf = this.subarray(byteOffset, byteOffset + 8);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    return view.getBigInt64(0, littleEndian);
  }
  setBigInt64(byteOffset, value2, littleEndian) {
    const buf = alloc(8);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    view.setBigInt64(0, value2, littleEndian);
    this.write(buf, byteOffset);
  }
  getUint8(byteOffset) {
    const buf = this.subarray(byteOffset, byteOffset + 1);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    return view.getUint8(0);
  }
  setUint8(byteOffset, value2) {
    const buf = allocUnsafe(1);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    view.setUint8(0, value2);
    this.write(buf, byteOffset);
  }
  getUint16(byteOffset, littleEndian) {
    const buf = this.subarray(byteOffset, byteOffset + 2);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    return view.getUint16(0, littleEndian);
  }
  setUint16(byteOffset, value2, littleEndian) {
    const buf = alloc(2);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    view.setUint16(0, value2, littleEndian);
    this.write(buf, byteOffset);
  }
  getUint32(byteOffset, littleEndian) {
    const buf = this.subarray(byteOffset, byteOffset + 4);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    return view.getUint32(0, littleEndian);
  }
  setUint32(byteOffset, value2, littleEndian) {
    const buf = alloc(4);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    view.setUint32(0, value2, littleEndian);
    this.write(buf, byteOffset);
  }
  getBigUint64(byteOffset, littleEndian) {
    const buf = this.subarray(byteOffset, byteOffset + 8);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    return view.getBigUint64(0, littleEndian);
  }
  setBigUint64(byteOffset, value2, littleEndian) {
    const buf = alloc(8);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    view.setBigUint64(0, value2, littleEndian);
    this.write(buf, byteOffset);
  }
  getFloat32(byteOffset, littleEndian) {
    const buf = this.subarray(byteOffset, byteOffset + 4);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    return view.getFloat32(0, littleEndian);
  }
  setFloat32(byteOffset, value2, littleEndian) {
    const buf = alloc(4);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    view.setFloat32(0, value2, littleEndian);
    this.write(buf, byteOffset);
  }
  getFloat64(byteOffset, littleEndian) {
    const buf = this.subarray(byteOffset, byteOffset + 8);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    return view.getFloat64(0, littleEndian);
  }
  setFloat64(byteOffset, value2, littleEndian) {
    const buf = alloc(8);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    view.setFloat64(0, value2, littleEndian);
    this.write(buf, byteOffset);
  }
  equals(other) {
    if (other == null) {
      return false;
    }
    if (!(other instanceof _Uint8ArrayList)) {
      return false;
    }
    if (other.bufs.length !== this.bufs.length) {
      return false;
    }
    for (let i2 = 0; i2 < this.bufs.length; i2++) {
      if (!equals3(this.bufs[i2], other.bufs[i2])) {
        return false;
      }
    }
    return true;
  }
  /**
   * Create a Uint8ArrayList from a pre-existing list of Uint8Arrays.  Use this
   * method if you know the total size of all the Uint8Arrays ahead of time.
   */
  static fromUint8Arrays(bufs, length3) {
    const list = new _Uint8ArrayList();
    list.bufs = bufs;
    if (length3 == null) {
      length3 = bufs.reduce((acc, curr) => acc + curr.byteLength, 0);
    }
    list.length = length3;
    return list;
  }
};

// node_modules/uint8arrays/dist/src/from-string.node.js
var import_node_buffer3 = require("node:buffer");

// node_modules/multiformats/dist/src/bases/base10.js
var base10_exports = {};
__export(base10_exports, {
  base10: () => base10
});
var base10 = baseX({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});

// node_modules/multiformats/dist/src/bases/base16.js
var base16_exports = {};
__export(base16_exports, {
  base16: () => base16,
  base16upper: () => base16upper
});
var base16 = rfc4648({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
var base16upper = rfc4648({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});

// node_modules/multiformats/dist/src/bases/base2.js
var base2_exports = {};
__export(base2_exports, {
  base2: () => base2
});
var base2 = rfc4648({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});

// node_modules/multiformats/dist/src/bases/base256emoji.js
var base256emoji_exports = {};
__export(base256emoji_exports, {
  base256emoji: () => base256emoji
});
var alphabet = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
var alphabetBytesToChars = alphabet.reduce((p2, c2, i2) => {
  p2[i2] = c2;
  return p2;
}, []);
var alphabetCharsToBytes = alphabet.reduce((p2, c2, i2) => {
  const codePoint = c2.codePointAt(0);
  if (codePoint == null) {
    throw new Error(`Invalid character: ${c2}`);
  }
  p2[codePoint] = i2;
  return p2;
}, []);
function encode4(data) {
  return data.reduce((p2, c2) => {
    p2 += alphabetBytesToChars[c2];
    return p2;
  }, "");
}
function decode5(str) {
  const byts = [];
  for (const char of str) {
    const codePoint = char.codePointAt(0);
    if (codePoint == null) {
      throw new Error(`Invalid character: ${char}`);
    }
    const byt = alphabetCharsToBytes[codePoint];
    if (byt == null) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
var base256emoji = from({
  prefix: "\u{1F680}",
  name: "base256emoji",
  encode: encode4,
  decode: decode5
});

// node_modules/multiformats/dist/src/bases/base64.js
var base64_exports = {};
__export(base64_exports, {
  base64: () => base64,
  base64pad: () => base64pad,
  base64url: () => base64url,
  base64urlpad: () => base64urlpad
});
var base64 = rfc4648({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad = rfc4648({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url = rfc4648({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad = rfc4648({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// node_modules/multiformats/dist/src/bases/base8.js
var base8_exports = {};
__export(base8_exports, {
  base8: () => base8
});
var base8 = rfc4648({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});

// node_modules/multiformats/dist/src/bases/identity.js
var identity_exports2 = {};
__export(identity_exports2, {
  identity: () => identity2
});
var identity2 = from({
  prefix: "\0",
  name: "identity",
  encode: (buf) => toString(buf),
  decode: (str) => fromString(str)
});

// node_modules/multiformats/dist/src/codecs/json.js
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder();

// node_modules/multiformats/dist/src/hashes/sha2.js
var sha2_exports = {};
__export(sha2_exports, {
  sha256: () => sha256,
  sha512: () => sha512
});
var import_crypto = __toESM(require("crypto"), 1);

// node_modules/multiformats/dist/src/hashes/hasher.js
var DEFAULT_MIN_DIGEST_LENGTH = 20;
function from2({ name: name3, code: code3, encode: encode7, minDigestLength, maxDigestLength }) {
  return new Hasher(name3, code3, encode7, minDigestLength, maxDigestLength);
}
var Hasher = class {
  name;
  code;
  encode;
  minDigestLength;
  maxDigestLength;
  constructor(name3, code3, encode7, minDigestLength, maxDigestLength) {
    this.name = name3;
    this.code = code3;
    this.encode = encode7;
    this.minDigestLength = minDigestLength ?? DEFAULT_MIN_DIGEST_LENGTH;
    this.maxDigestLength = maxDigestLength;
  }
  digest(input, options) {
    if (options?.truncate != null) {
      if (options.truncate < this.minDigestLength) {
        throw new Error(`Invalid truncate option, must be greater than or equal to ${this.minDigestLength}`);
      }
      if (this.maxDigestLength != null && options.truncate > this.maxDigestLength) {
        throw new Error(`Invalid truncate option, must be less than or equal to ${this.maxDigestLength}`);
      }
    }
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      if (result instanceof Uint8Array) {
        return createDigest(result, this.code, options?.truncate);
      }
      return result.then((digest3) => createDigest(digest3, this.code, options?.truncate));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
function createDigest(digest3, code3, truncate) {
  if (truncate != null && truncate !== digest3.byteLength) {
    if (truncate > digest3.byteLength) {
      throw new Error(`Invalid truncate option, must be less than or equal to ${digest3.byteLength}`);
    }
    digest3 = digest3.subarray(0, truncate);
  }
  return create(code3, digest3);
}

// node_modules/multiformats/dist/src/hashes/sha2.js
var sha256 = from2({
  name: "sha2-256",
  code: 18,
  encode: (input) => coerce(import_crypto.default.createHash("sha256").update(input).digest())
});
var sha512 = from2({
  name: "sha2-512",
  code: 19,
  encode: (input) => coerce(import_crypto.default.createHash("sha512").update(input).digest())
});

// node_modules/multiformats/dist/src/basics.js
var bases = { ...identity_exports2, ...base2_exports, ...base8_exports, ...base10_exports, ...base16_exports, ...base32_exports, ...base36_exports, ...base58_exports, ...base64_exports, ...base256emoji_exports };
var hashes = { ...sha2_exports, ...identity_exports };

// node_modules/uint8arrays/dist/src/util/bases.js
function createCodec(name3, prefix, encode7, decode8) {
  return {
    name: name3,
    prefix,
    encoder: {
      name: name3,
      prefix,
      encode: encode7
    },
    decoder: {
      decode: decode8
    }
  };
}
var string = createCodec("utf8", "u", (buf) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf);
}, (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str.substring(1));
});
var ascii = createCodec("ascii", "a", (buf) => {
  let string2 = "a";
  for (let i2 = 0; i2 < buf.length; i2++) {
    string2 += String.fromCharCode(buf[i2]);
  }
  return string2;
}, (str) => {
  str = str.substring(1);
  const buf = allocUnsafe(str.length);
  for (let i2 = 0; i2 < str.length; i2++) {
    buf[i2] = str.charCodeAt(i2);
  }
  return buf;
});
var BASES = {
  utf8: string,
  "utf-8": string,
  hex: bases.base16,
  latin1: ascii,
  ascii,
  binary: ascii,
  ...bases
};
var bases_default = BASES;

// node_modules/uint8arrays/dist/src/from-string.node.js
function fromString2(string2, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (base3 == null) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if (encoding === "utf8" || encoding === "utf-8") {
    return asUint8Array(import_node_buffer3.Buffer.from(string2, "utf-8"));
  }
  return base3.decoder.decode(`${base3.prefix}${string2}`);
}

// node_modules/uint8arrays/dist/src/to-string.node.js
var import_node_buffer4 = require("node:buffer");
function toString2(array, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (base3 == null) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if (encoding === "utf8" || encoding === "utf-8") {
    return import_node_buffer4.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
  }
  return base3.encoder.encode(array).substring(1);
}

// node_modules/@libp2p/crypto/dist/src/keys/rsa/der.js
var TAG_MASK = parseInt("11111", 2);
var LONG_LENGTH_MASK = parseInt("10000000", 2);
var LONG_LENGTH_BYTES_MASK = parseInt("01111111", 2);
var decoders = {
  0: readSequence,
  1: readSequence,
  2: readInteger,
  3: readBitString,
  4: readOctetString,
  5: readNull,
  6: readObjectIdentifier,
  16: readSequence,
  22: readSequence,
  48: readSequence
};
function decodeDer(buf, context = { offset: 0 }) {
  const tag = buf[context.offset] & TAG_MASK;
  context.offset++;
  if (decoders[tag] != null) {
    return decoders[tag](buf, context);
  }
  throw new Error("No decoder for tag " + tag);
}
function readLength(buf, context) {
  let length3 = 0;
  if ((buf[context.offset] & LONG_LENGTH_MASK) === LONG_LENGTH_MASK) {
    const count = buf[context.offset] & LONG_LENGTH_BYTES_MASK;
    let str = "0x";
    context.offset++;
    for (let i2 = 0; i2 < count; i2++, context.offset++) {
      str += buf[context.offset].toString(16).padStart(2, "0");
    }
    length3 = parseInt(str, 16);
  } else {
    length3 = buf[context.offset];
    context.offset++;
  }
  return length3;
}
function readSequence(buf, context) {
  readLength(buf, context);
  const entries = [];
  while (true) {
    if (context.offset >= buf.byteLength) {
      break;
    }
    const result = decodeDer(buf, context);
    if (result === null) {
      break;
    }
    entries.push(result);
  }
  return entries;
}
function readInteger(buf, context) {
  const length3 = readLength(buf, context);
  const start2 = context.offset;
  const end = context.offset + length3;
  const vals = [];
  for (let i2 = start2; i2 < end; i2++) {
    if (i2 === start2 && buf[i2] === 0) {
      continue;
    }
    vals.push(buf[i2]);
  }
  context.offset += length3;
  return Uint8Array.from(vals);
}
function readObjectIdentifier(buf, context) {
  const count = readLength(buf, context);
  const finalOffset = context.offset + count;
  const byte = buf[context.offset];
  context.offset++;
  let val1 = 0;
  let val2 = 0;
  if (byte < 40) {
    val1 = 0;
    val2 = byte;
  } else if (byte < 80) {
    val1 = 1;
    val2 = byte - 40;
  } else {
    val1 = 2;
    val2 = byte - 80;
  }
  let oid = `${val1}.${val2}`;
  let num = [];
  while (context.offset < finalOffset) {
    const byte2 = buf[context.offset];
    context.offset++;
    num.push(byte2 & 127);
    if (byte2 < 128) {
      num.reverse();
      let val = 0;
      for (let i2 = 0; i2 < num.length; i2++) {
        val += num[i2] << i2 * 7;
      }
      oid += `.${val}`;
      num = [];
    }
  }
  return oid;
}
function readNull(buf, context) {
  context.offset++;
  return null;
}
function readBitString(buf, context) {
  const length3 = readLength(buf, context);
  const unusedBits = buf[context.offset];
  context.offset++;
  const bytes = buf.subarray(context.offset, context.offset + length3 - 1);
  context.offset += length3;
  if (unusedBits !== 0) {
    throw new Error("Unused bits in bit string is unimplemented");
  }
  return bytes;
}
function readOctetString(buf, context) {
  const length3 = readLength(buf, context);
  const bytes = buf.subarray(context.offset, context.offset + length3);
  context.offset += length3;
  return bytes;
}
function encodeNumber(value2) {
  let number = value2.toString(16);
  if (number.length % 2 === 1) {
    number = "0" + number;
  }
  const array = new Uint8ArrayList();
  for (let i2 = 0; i2 < number.length; i2 += 2) {
    array.append(Uint8Array.from([parseInt(`${number[i2]}${number[i2 + 1]}`, 16)]));
  }
  return array;
}
function encodeLength(bytes) {
  if (bytes.byteLength < 128) {
    return Uint8Array.from([bytes.byteLength]);
  }
  const length3 = encodeNumber(bytes.byteLength);
  return new Uint8ArrayList(Uint8Array.from([
    length3.byteLength | LONG_LENGTH_MASK
  ]), length3);
}
function encodeInteger(value2) {
  const contents = new Uint8ArrayList();
  const mask = 128;
  const positive2 = (value2.subarray()[0] & mask) === mask;
  if (positive2) {
    contents.append(Uint8Array.from([0]));
  }
  contents.append(value2);
  return new Uint8ArrayList(Uint8Array.from([2]), encodeLength(contents), contents);
}
function encodeBitString(value2) {
  const unusedBits = Uint8Array.from([0]);
  const contents = new Uint8ArrayList(unusedBits, value2);
  return new Uint8ArrayList(Uint8Array.from([3]), encodeLength(contents), contents);
}
function encodeOctetString(value2) {
  return new Uint8ArrayList(Uint8Array.from([4]), encodeLength(value2), value2);
}
function encodeSequence(values, tag = 48) {
  const output = new Uint8ArrayList();
  for (const buf of values) {
    output.append(buf);
  }
  return new Uint8ArrayList(Uint8Array.from([tag]), encodeLength(output), output);
}

// node_modules/@libp2p/crypto/dist/src/keys/ecdsa/index.js
async function generateECDSAKey(curve = "P-256") {
  const keyPair = await crypto.subtle.generateKey({
    name: "ECDSA",
    namedCurve: curve
  }, true, ["sign", "verify"]);
  return {
    publicKey: await crypto.subtle.exportKey("jwk", keyPair.publicKey),
    privateKey: await crypto.subtle.exportKey("jwk", keyPair.privateKey)
  };
}
async function hashAndSign(key, msg, options) {
  const privateKey = await crypto.subtle.importKey("jwk", key, {
    name: "ECDSA",
    namedCurve: key.crv ?? "P-256"
  }, false, ["sign"]);
  options?.signal?.throwIfAborted();
  const signature = await crypto.subtle.sign({
    name: "ECDSA",
    hash: {
      name: "SHA-256"
    }
  }, privateKey, msg.subarray());
  options?.signal?.throwIfAborted();
  return new Uint8Array(signature, 0, signature.byteLength);
}
async function hashAndVerify(key, sig, msg, options) {
  const publicKey = await crypto.subtle.importKey("jwk", key, {
    name: "ECDSA",
    namedCurve: key.crv ?? "P-256"
  }, false, ["verify"]);
  options?.signal?.throwIfAborted();
  const result = await crypto.subtle.verify({
    name: "ECDSA",
    hash: {
      name: "SHA-256"
    }
  }, publicKey, sig, msg.subarray());
  options?.signal?.throwIfAborted();
  return result;
}

// node_modules/@libp2p/crypto/dist/src/keys/ecdsa/utils.js
var OID_256 = Uint8Array.from([6, 8, 42, 134, 72, 206, 61, 3, 1, 7]);
var OID_384 = Uint8Array.from([6, 5, 43, 129, 4, 0, 34]);
var OID_521 = Uint8Array.from([6, 5, 43, 129, 4, 0, 35]);
var P_256_KEY_JWK = {
  ext: true,
  kty: "EC",
  crv: "P-256"
};
var P_384_KEY_JWK = {
  ext: true,
  kty: "EC",
  crv: "P-384"
};
var P_521_KEY_JWK = {
  ext: true,
  kty: "EC",
  crv: "P-521"
};
var P_256_KEY_LENGTH = 32;
var P_384_KEY_LENGTH = 48;
var P_521_KEY_LENGTH = 66;
function unmarshalECDSAPublicKey(bytes) {
  const message2 = decodeDer(bytes);
  return pkiMessageToECDSAPublicKey(message2);
}
function pkiMessageToECDSAPublicKey(message2) {
  const coordinates = message2[1][1][0];
  const offset = 1;
  let x;
  let y;
  if (coordinates.byteLength === P_256_KEY_LENGTH * 2 + 1) {
    x = toString2(coordinates.subarray(offset, offset + P_256_KEY_LENGTH), "base64url");
    y = toString2(coordinates.subarray(offset + P_256_KEY_LENGTH), "base64url");
    return new ECDSAPublicKey({
      ...P_256_KEY_JWK,
      key_ops: ["verify"],
      x,
      y
    });
  }
  if (coordinates.byteLength === P_384_KEY_LENGTH * 2 + 1) {
    x = toString2(coordinates.subarray(offset, offset + P_384_KEY_LENGTH), "base64url");
    y = toString2(coordinates.subarray(offset + P_384_KEY_LENGTH), "base64url");
    return new ECDSAPublicKey({
      ...P_384_KEY_JWK,
      key_ops: ["verify"],
      x,
      y
    });
  }
  if (coordinates.byteLength === P_521_KEY_LENGTH * 2 + 1) {
    x = toString2(coordinates.subarray(offset, offset + P_521_KEY_LENGTH), "base64url");
    y = toString2(coordinates.subarray(offset + P_521_KEY_LENGTH), "base64url");
    return new ECDSAPublicKey({
      ...P_521_KEY_JWK,
      key_ops: ["verify"],
      x,
      y
    });
  }
  throw new InvalidParametersError(`coordinates were wrong length, got ${coordinates.byteLength}, expected 65, 97 or 133`);
}
function privateKeyToPKIMessage(privateKey) {
  return encodeSequence([
    encodeInteger(Uint8Array.from([1])),
    // header
    encodeOctetString(fromString2(privateKey.d ?? "", "base64url")),
    // body
    encodeSequence([
      getOID(privateKey.crv)
    ], 160),
    encodeSequence([
      encodeBitString(new Uint8ArrayList(Uint8Array.from([4]), fromString2(privateKey.x ?? "", "base64url"), fromString2(privateKey.y ?? "", "base64url")))
    ], 161)
  ]).subarray();
}
function publicKeyToPKIMessage(publicKey) {
  return encodeSequence([
    encodeInteger(Uint8Array.from([1])),
    // header
    encodeSequence([
      getOID(publicKey.crv)
    ], 160),
    encodeSequence([
      encodeBitString(new Uint8ArrayList(Uint8Array.from([4]), fromString2(publicKey.x ?? "", "base64url"), fromString2(publicKey.y ?? "", "base64url")))
    ], 161)
  ]).subarray();
}
function getOID(curve) {
  if (curve === "P-256") {
    return OID_256;
  }
  if (curve === "P-384") {
    return OID_384;
  }
  if (curve === "P-521") {
    return OID_521;
  }
  throw new InvalidParametersError(`Invalid curve ${curve}`);
}
async function generateECDSAKeyPair(curve = "P-256") {
  const key = await generateECDSAKey(curve);
  return new ECDSAPrivateKey(key.privateKey);
}

// node_modules/@libp2p/crypto/dist/src/keys/ecdsa/ecdsa.js
var ECDSAPublicKey = class {
  type = "ECDSA";
  jwk;
  _raw;
  constructor(jwk) {
    this.jwk = jwk;
  }
  get raw() {
    if (this._raw == null) {
      this._raw = publicKeyToPKIMessage(this.jwk);
    }
    return this._raw;
  }
  toMultihash() {
    return identity.digest(publicKeyToProtobuf(this));
  }
  toCID() {
    return CID.createV1(114, this.toMultihash());
  }
  toString() {
    return base58btc.encode(this.toMultihash().bytes).substring(1);
  }
  equals(key) {
    if (key == null || !(key.raw instanceof Uint8Array)) {
      return false;
    }
    return equals3(this.raw, key.raw);
  }
  async verify(data, sig, options) {
    return hashAndVerify(this.jwk, sig, data, options);
  }
};
var ECDSAPrivateKey = class {
  type = "ECDSA";
  jwk;
  publicKey;
  _raw;
  constructor(jwk) {
    this.jwk = jwk;
    this.publicKey = new ECDSAPublicKey({
      crv: jwk.crv,
      ext: jwk.ext,
      key_ops: ["verify"],
      kty: "EC",
      x: jwk.x,
      y: jwk.y
    });
  }
  get raw() {
    if (this._raw == null) {
      this._raw = privateKeyToPKIMessage(this.jwk);
    }
    return this._raw;
  }
  equals(key) {
    if (key == null || !(key.raw instanceof Uint8Array)) {
      return false;
    }
    return equals3(this.raw, key.raw);
  }
  async sign(message2, options) {
    return hashAndSign(this.jwk, message2, options);
  }
};

// node_modules/@libp2p/crypto/dist/src/keys/ed25519/index.js
var import_crypto2 = __toESM(require("crypto"), 1);
var keypair = import_crypto2.default.generateKeyPairSync;
var PUBLIC_KEY_BYTE_LENGTH = 32;
var PRIVATE_KEY_BYTE_LENGTH = 64;
var KEYS_BYTE_LENGTH = 32;
var SIGNATURE_BYTE_LENGTH = 64;
function derivePublicKey(privateKey) {
  const keyObject = import_crypto2.default.createPrivateKey({
    format: "jwk",
    key: {
      crv: "Ed25519",
      x: "",
      d: toString2(privateKey, "base64url"),
      kty: "OKP"
    }
  });
  const jwk = keyObject.export({
    format: "jwk"
  });
  if (jwk.x == null || jwk.x === "") {
    throw new Error("Could not export JWK public key");
  }
  return fromString2(jwk.x, "base64url");
}
function generateKey() {
  const key = keypair("ed25519", {
    publicKeyEncoding: { type: "spki", format: "jwk" },
    privateKeyEncoding: { type: "pkcs8", format: "jwk" }
  });
  const privateKeyRaw = fromString2(key.privateKey.d, "base64url");
  const publicKeyRaw = fromString2(key.publicKey.x, "base64url");
  return {
    privateKey: concat([privateKeyRaw, publicKeyRaw], privateKeyRaw.byteLength + publicKeyRaw.byteLength),
    publicKey: publicKeyRaw
  };
}
function hashAndSign2(key, msg) {
  if (!(key instanceof Uint8Array)) {
    throw new TypeError('"key" must be a node.js Buffer, or Uint8Array.');
  }
  let privateKey;
  let publicKey;
  if (key.byteLength === PRIVATE_KEY_BYTE_LENGTH) {
    privateKey = key.subarray(0, 32);
    publicKey = key.subarray(32);
  } else if (key.byteLength === KEYS_BYTE_LENGTH) {
    privateKey = key.subarray(0, 32);
    publicKey = derivePublicKey(privateKey);
  } else {
    throw new TypeError('"key" must be 64 or 32 bytes in length.');
  }
  const obj = import_crypto2.default.createPrivateKey({
    format: "jwk",
    key: {
      crv: "Ed25519",
      d: toString2(privateKey, "base64url"),
      x: toString2(publicKey, "base64url"),
      kty: "OKP"
    }
  });
  return import_crypto2.default.sign(null, msg instanceof Uint8Array ? msg : msg.subarray(), obj);
}
function hashAndVerify2(key, sig, msg) {
  if (key.byteLength !== PUBLIC_KEY_BYTE_LENGTH) {
    throw new TypeError('"key" must be 32 bytes in length.');
  } else if (!(key instanceof Uint8Array)) {
    throw new TypeError('"key" must be a node.js Buffer, or Uint8Array.');
  }
  if (sig.byteLength !== SIGNATURE_BYTE_LENGTH) {
    throw new TypeError('"sig" must be 64 bytes in length.');
  } else if (!(sig instanceof Uint8Array)) {
    throw new TypeError('"sig" must be a node.js Buffer, or Uint8Array.');
  }
  const obj = import_crypto2.default.createPublicKey({
    format: "jwk",
    key: {
      crv: "Ed25519",
      x: toString2(key, "base64url"),
      kty: "OKP"
    }
  });
  return import_crypto2.default.verify(null, msg instanceof Uint8Array ? msg : msg.subarray(), obj, sig);
}

// node_modules/@libp2p/crypto/dist/src/util.js
function isPromise(thing) {
  if (thing == null) {
    return false;
  }
  return typeof thing.then === "function" && typeof thing.catch === "function" && typeof thing.finally === "function";
}

// node_modules/@libp2p/crypto/dist/src/keys/ed25519/ed25519.js
var Ed25519PublicKey = class {
  type = "Ed25519";
  raw;
  constructor(key) {
    this.raw = ensureEd25519Key(key, PUBLIC_KEY_BYTE_LENGTH);
  }
  toMultihash() {
    return identity.digest(publicKeyToProtobuf(this));
  }
  toCID() {
    return CID.createV1(114, this.toMultihash());
  }
  toString() {
    return base58btc.encode(this.toMultihash().bytes).substring(1);
  }
  equals(key) {
    if (key == null || !(key.raw instanceof Uint8Array)) {
      return false;
    }
    return equals3(this.raw, key.raw);
  }
  verify(data, sig, options) {
    options?.signal?.throwIfAborted();
    const result = hashAndVerify2(this.raw, sig, data);
    if (isPromise(result)) {
      return result.then((res) => {
        options?.signal?.throwIfAborted();
        return res;
      });
    }
    return result;
  }
};
var Ed25519PrivateKey = class {
  type = "Ed25519";
  raw;
  publicKey;
  // key       - 64 byte Uint8Array containing private key
  // publicKey - 32 byte Uint8Array containing public key
  constructor(key, publicKey) {
    this.raw = ensureEd25519Key(key, PRIVATE_KEY_BYTE_LENGTH);
    this.publicKey = new Ed25519PublicKey(publicKey);
  }
  equals(key) {
    if (key == null || !(key.raw instanceof Uint8Array)) {
      return false;
    }
    return equals3(this.raw, key.raw);
  }
  sign(message2, options) {
    options?.signal?.throwIfAborted();
    const sig = hashAndSign2(this.raw, message2);
    if (isPromise(sig)) {
      return sig.then((res) => {
        options?.signal?.throwIfAborted();
        return res;
      });
    }
    options?.signal?.throwIfAborted();
    return sig;
  }
};

// node_modules/@libp2p/crypto/dist/src/keys/ed25519/utils.js
function unmarshalEd25519PublicKey(bytes) {
  bytes = ensureEd25519Key(bytes, PUBLIC_KEY_BYTE_LENGTH);
  return new Ed25519PublicKey(bytes);
}
async function generateEd25519KeyPair() {
  const { privateKey, publicKey } = generateKey();
  return new Ed25519PrivateKey(privateKey, publicKey);
}
function ensureEd25519Key(key, length3) {
  key = Uint8Array.from(key ?? []);
  if (key.length !== length3) {
    throw new InvalidParametersError(`Key must be a Uint8Array of length ${length3}, got ${key.length}`);
  }
  return key;
}

// node_modules/uint8-varint/dist/src/index.js
var N12 = Math.pow(2, 7);
var N22 = Math.pow(2, 14);
var N32 = Math.pow(2, 21);
var N42 = Math.pow(2, 28);
var N52 = Math.pow(2, 35);
var N62 = Math.pow(2, 42);
var N72 = Math.pow(2, 49);
var MSB2 = 128;
var REST2 = 127;
function encodingLength2(value2) {
  if (value2 < N12) {
    return 1;
  }
  if (value2 < N22) {
    return 2;
  }
  if (value2 < N32) {
    return 3;
  }
  if (value2 < N42) {
    return 4;
  }
  if (value2 < N52) {
    return 5;
  }
  if (value2 < N62) {
    return 6;
  }
  if (value2 < N72) {
    return 7;
  }
  if (Number.MAX_SAFE_INTEGER != null && value2 > Number.MAX_SAFE_INTEGER) {
    throw new RangeError("Could not encode varint");
  }
  return 8;
}
function encodeUint8Array(value2, buf, offset = 0) {
  switch (encodingLength2(value2)) {
    case 8: {
      buf[offset++] = value2 & 255 | MSB2;
      value2 /= 128;
    }
    case 7: {
      buf[offset++] = value2 & 255 | MSB2;
      value2 /= 128;
    }
    case 6: {
      buf[offset++] = value2 & 255 | MSB2;
      value2 /= 128;
    }
    case 5: {
      buf[offset++] = value2 & 255 | MSB2;
      value2 /= 128;
    }
    case 4: {
      buf[offset++] = value2 & 255 | MSB2;
      value2 >>>= 7;
    }
    case 3: {
      buf[offset++] = value2 & 255 | MSB2;
      value2 >>>= 7;
    }
    case 2: {
      buf[offset++] = value2 & 255 | MSB2;
      value2 >>>= 7;
    }
    case 1: {
      buf[offset++] = value2 & 255;
      value2 >>>= 7;
      break;
    }
    default:
      throw new Error("unreachable");
  }
  return buf;
}
function encodeUint8ArrayList(value2, buf, offset = 0) {
  switch (encodingLength2(value2)) {
    case 8: {
      buf.set(offset++, value2 & 255 | MSB2);
      value2 /= 128;
    }
    case 7: {
      buf.set(offset++, value2 & 255 | MSB2);
      value2 /= 128;
    }
    case 6: {
      buf.set(offset++, value2 & 255 | MSB2);
      value2 /= 128;
    }
    case 5: {
      buf.set(offset++, value2 & 255 | MSB2);
      value2 /= 128;
    }
    case 4: {
      buf.set(offset++, value2 & 255 | MSB2);
      value2 >>>= 7;
    }
    case 3: {
      buf.set(offset++, value2 & 255 | MSB2);
      value2 >>>= 7;
    }
    case 2: {
      buf.set(offset++, value2 & 255 | MSB2);
      value2 >>>= 7;
    }
    case 1: {
      buf.set(offset++, value2 & 255);
      value2 >>>= 7;
      break;
    }
    default:
      throw new Error("unreachable");
  }
  return buf;
}
function decodeUint8Array(buf, offset) {
  let b = buf[offset];
  let res = 0;
  res += b & REST2;
  if (b < MSB2) {
    return res;
  }
  b = buf[offset + 1];
  res += (b & REST2) << 7;
  if (b < MSB2) {
    return res;
  }
  b = buf[offset + 2];
  res += (b & REST2) << 14;
  if (b < MSB2) {
    return res;
  }
  b = buf[offset + 3];
  res += (b & REST2) << 21;
  if (b < MSB2) {
    return res;
  }
  b = buf[offset + 4];
  res += (b & REST2) * N42;
  if (b < MSB2) {
    return res;
  }
  b = buf[offset + 5];
  res += (b & REST2) * N52;
  if (b < MSB2) {
    return res;
  }
  b = buf[offset + 6];
  res += (b & REST2) * N62;
  if (b < MSB2) {
    return res;
  }
  b = buf[offset + 7];
  res += (b & REST2) * N72;
  if (b < MSB2) {
    return res;
  }
  throw new RangeError("Could not decode varint");
}
function decodeUint8ArrayList(buf, offset) {
  let b = buf.get(offset);
  let res = 0;
  res += b & REST2;
  if (b < MSB2) {
    return res;
  }
  b = buf.get(offset + 1);
  res += (b & REST2) << 7;
  if (b < MSB2) {
    return res;
  }
  b = buf.get(offset + 2);
  res += (b & REST2) << 14;
  if (b < MSB2) {
    return res;
  }
  b = buf.get(offset + 3);
  res += (b & REST2) << 21;
  if (b < MSB2) {
    return res;
  }
  b = buf.get(offset + 4);
  res += (b & REST2) * N42;
  if (b < MSB2) {
    return res;
  }
  b = buf.get(offset + 5);
  res += (b & REST2) * N52;
  if (b < MSB2) {
    return res;
  }
  b = buf.get(offset + 6);
  res += (b & REST2) * N62;
  if (b < MSB2) {
    return res;
  }
  b = buf.get(offset + 7);
  res += (b & REST2) * N72;
  if (b < MSB2) {
    return res;
  }
  throw new RangeError("Could not decode varint");
}
function encode5(value2, buf, offset = 0) {
  if (buf == null) {
    buf = allocUnsafe(encodingLength2(value2));
  }
  if (buf instanceof Uint8Array) {
    return encodeUint8Array(value2, buf, offset);
  } else {
    return encodeUint8ArrayList(value2, buf, offset);
  }
}
function decode6(buf, offset = 0) {
  if (buf instanceof Uint8Array) {
    return decodeUint8Array(buf, offset);
  } else {
    return decodeUint8ArrayList(buf, offset);
  }
}

// node_modules/protons-runtime/dist/src/utils/float.js
var f32 = new Float32Array([-0]);
var f8b = new Uint8Array(f32.buffer);
function writeFloatLE(val, buf, pos) {
  f32[0] = val;
  buf[pos] = f8b[0];
  buf[pos + 1] = f8b[1];
  buf[pos + 2] = f8b[2];
  buf[pos + 3] = f8b[3];
}
function readFloatLE(buf, pos) {
  f8b[0] = buf[pos];
  f8b[1] = buf[pos + 1];
  f8b[2] = buf[pos + 2];
  f8b[3] = buf[pos + 3];
  return f32[0];
}
var f64 = new Float64Array([-0]);
var d8b = new Uint8Array(f64.buffer);
function writeDoubleLE(val, buf, pos) {
  f64[0] = val;
  buf[pos] = d8b[0];
  buf[pos + 1] = d8b[1];
  buf[pos + 2] = d8b[2];
  buf[pos + 3] = d8b[3];
  buf[pos + 4] = d8b[4];
  buf[pos + 5] = d8b[5];
  buf[pos + 6] = d8b[6];
  buf[pos + 7] = d8b[7];
}
function readDoubleLE(buf, pos) {
  d8b[0] = buf[pos];
  d8b[1] = buf[pos + 1];
  d8b[2] = buf[pos + 2];
  d8b[3] = buf[pos + 3];
  d8b[4] = buf[pos + 4];
  d8b[5] = buf[pos + 5];
  d8b[6] = buf[pos + 6];
  d8b[7] = buf[pos + 7];
  return f64[0];
}

// node_modules/protons-runtime/dist/src/utils/longbits.js
var MAX_SAFE_NUMBER_INTEGER = BigInt(Number.MAX_SAFE_INTEGER);
var MIN_SAFE_NUMBER_INTEGER = BigInt(Number.MIN_SAFE_INTEGER);
var LongBits = class _LongBits {
  lo;
  hi;
  constructor(lo, hi) {
    this.lo = lo | 0;
    this.hi = hi | 0;
  }
  /**
   * Converts this long bits to a possibly unsafe JavaScript number
   */
  toNumber(unsigned = false) {
    if (!unsigned && this.hi >>> 31 > 0) {
      const lo = ~this.lo + 1 >>> 0;
      let hi = ~this.hi >>> 0;
      if (lo === 0) {
        hi = hi + 1 >>> 0;
      }
      return -(lo + hi * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
  }
  /**
   * Converts this long bits to a bigint
   */
  toBigInt(unsigned = false) {
    if (unsigned) {
      return BigInt(this.lo >>> 0) + (BigInt(this.hi >>> 0) << 32n);
    }
    if (this.hi >>> 31 !== 0) {
      const lo = ~this.lo + 1 >>> 0;
      let hi = ~this.hi >>> 0;
      if (lo === 0) {
        hi = hi + 1 >>> 0;
      }
      return -(BigInt(lo) + (BigInt(hi) << 32n));
    }
    return BigInt(this.lo >>> 0) + (BigInt(this.hi >>> 0) << 32n);
  }
  /**
   * Converts this long bits to a string
   */
  toString(unsigned = false) {
    return this.toBigInt(unsigned).toString();
  }
  /**
   * Zig-zag encodes this long bits
   */
  zzEncode() {
    const mask = this.hi >> 31;
    this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    this.lo = (this.lo << 1 ^ mask) >>> 0;
    return this;
  }
  /**
   * Zig-zag decodes this long bits
   */
  zzDecode() {
    const mask = -(this.lo & 1);
    this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    this.hi = (this.hi >>> 1 ^ mask) >>> 0;
    return this;
  }
  /**
   * Calculates the length of this longbits when encoded as a varint.
   */
  length() {
    const part0 = this.lo;
    const part1 = (this.lo >>> 28 | this.hi << 4) >>> 0;
    const part2 = this.hi >>> 24;
    return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
  }
  /**
   * Constructs new long bits from the specified number
   */
  static fromBigInt(value2) {
    if (value2 === 0n) {
      return zero;
    }
    if (value2 < MAX_SAFE_NUMBER_INTEGER && value2 > MIN_SAFE_NUMBER_INTEGER) {
      return this.fromNumber(Number(value2));
    }
    const negative = value2 < 0n;
    if (negative) {
      value2 = -value2;
    }
    let hi = value2 >> 32n;
    let lo = value2 - (hi << 32n);
    if (negative) {
      hi = ~hi | 0n;
      lo = ~lo | 0n;
      if (++lo > TWO_32) {
        lo = 0n;
        if (++hi > TWO_32) {
          hi = 0n;
        }
      }
    }
    return new _LongBits(Number(lo), Number(hi));
  }
  /**
   * Constructs new long bits from the specified number
   */
  static fromNumber(value2) {
    if (value2 === 0) {
      return zero;
    }
    const sign = value2 < 0;
    if (sign) {
      value2 = -value2;
    }
    let lo = value2 >>> 0;
    let hi = (value2 - lo) / 4294967296 >>> 0;
    if (sign) {
      hi = ~hi >>> 0;
      lo = ~lo >>> 0;
      if (++lo > 4294967295) {
        lo = 0;
        if (++hi > 4294967295) {
          hi = 0;
        }
      }
    }
    return new _LongBits(lo, hi);
  }
  /**
   * Constructs new long bits from a number, long or string
   */
  static from(value2) {
    if (typeof value2 === "number") {
      return _LongBits.fromNumber(value2);
    }
    if (typeof value2 === "bigint") {
      return _LongBits.fromBigInt(value2);
    }
    if (typeof value2 === "string") {
      return _LongBits.fromBigInt(BigInt(value2));
    }
    return value2.low != null || value2.high != null ? new _LongBits(value2.low >>> 0, value2.high >>> 0) : zero;
  }
};
var zero = new LongBits(0, 0);
zero.toBigInt = function() {
  return 0n;
};
zero.zzEncode = zero.zzDecode = function() {
  return this;
};
zero.length = function() {
  return 1;
};
var TWO_32 = 4294967296n;

// node_modules/protons-runtime/dist/src/utils/utf8.js
function length2(string2) {
  let len = 0;
  let c2 = 0;
  for (let i2 = 0; i2 < string2.length; ++i2) {
    c2 = string2.charCodeAt(i2);
    if (c2 < 128) {
      len += 1;
    } else if (c2 < 2048) {
      len += 2;
    } else if ((c2 & 64512) === 55296 && (string2.charCodeAt(i2 + 1) & 64512) === 56320) {
      ++i2;
      len += 4;
    } else {
      len += 3;
    }
  }
  return len;
}
function read2(buffer, start2, end) {
  const len = end - start2;
  if (len < 1) {
    return "";
  }
  let parts;
  const chunk = [];
  let i2 = 0;
  let t2;
  while (start2 < end) {
    t2 = buffer[start2++];
    if (t2 < 128) {
      chunk[i2++] = t2;
    } else if (t2 > 191 && t2 < 224) {
      chunk[i2++] = (t2 & 31) << 6 | buffer[start2++] & 63;
    } else if (t2 > 239 && t2 < 365) {
      t2 = ((t2 & 7) << 18 | (buffer[start2++] & 63) << 12 | (buffer[start2++] & 63) << 6 | buffer[start2++] & 63) - 65536;
      chunk[i2++] = 55296 + (t2 >> 10);
      chunk[i2++] = 56320 + (t2 & 1023);
    } else {
      chunk[i2++] = (t2 & 15) << 12 | (buffer[start2++] & 63) << 6 | buffer[start2++] & 63;
    }
    if (i2 > 8191) {
      (parts ?? (parts = [])).push(String.fromCharCode.apply(String, chunk));
      i2 = 0;
    }
  }
  if (parts != null) {
    if (i2 > 0) {
      parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
    }
    return parts.join("");
  }
  return String.fromCharCode.apply(String, chunk.slice(0, i2));
}
function write(string2, buffer, offset) {
  const start2 = offset;
  let c1;
  let c2;
  for (let i2 = 0; i2 < string2.length; ++i2) {
    c1 = string2.charCodeAt(i2);
    if (c1 < 128) {
      buffer[offset++] = c1;
    } else if (c1 < 2048) {
      buffer[offset++] = c1 >> 6 | 192;
      buffer[offset++] = c1 & 63 | 128;
    } else if ((c1 & 64512) === 55296 && ((c2 = string2.charCodeAt(i2 + 1)) & 64512) === 56320) {
      c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
      ++i2;
      buffer[offset++] = c1 >> 18 | 240;
      buffer[offset++] = c1 >> 12 & 63 | 128;
      buffer[offset++] = c1 >> 6 & 63 | 128;
      buffer[offset++] = c1 & 63 | 128;
    } else {
      buffer[offset++] = c1 >> 12 | 224;
      buffer[offset++] = c1 >> 6 & 63 | 128;
      buffer[offset++] = c1 & 63 | 128;
    }
  }
  return offset - start2;
}

// node_modules/protons-runtime/dist/src/utils/reader.js
function indexOutOfRange(reader, writeLength) {
  return RangeError(`index out of range: ${reader.pos} + ${writeLength ?? 1} > ${reader.len}`);
}
function readFixed32End(buf, end) {
  return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
}
var Uint8ArrayReader = class {
  buf;
  pos;
  len;
  _slice = Uint8Array.prototype.subarray;
  constructor(buffer) {
    this.buf = buffer;
    this.pos = 0;
    this.len = buffer.length;
  }
  /**
   * Reads a varint as an unsigned 32 bit value
   */
  uint32() {
    let value2 = 4294967295;
    value2 = (this.buf[this.pos] & 127) >>> 0;
    if (this.buf[this.pos++] < 128) {
      return value2;
    }
    value2 = (value2 | (this.buf[this.pos] & 127) << 7) >>> 0;
    if (this.buf[this.pos++] < 128) {
      return value2;
    }
    value2 = (value2 | (this.buf[this.pos] & 127) << 14) >>> 0;
    if (this.buf[this.pos++] < 128) {
      return value2;
    }
    value2 = (value2 | (this.buf[this.pos] & 127) << 21) >>> 0;
    if (this.buf[this.pos++] < 128) {
      return value2;
    }
    value2 = (value2 | (this.buf[this.pos] & 15) << 28) >>> 0;
    if (this.buf[this.pos++] < 128) {
      return value2;
    }
    if ((this.pos += 5) > this.len) {
      this.pos = this.len;
      throw indexOutOfRange(this, 10);
    }
    return value2;
  }
  /**
   * Reads a varint as a signed 32 bit value
   */
  int32() {
    return this.uint32() | 0;
  }
  /**
   * Reads a zig-zag encoded varint as a signed 32 bit value
   */
  sint32() {
    const value2 = this.uint32();
    return value2 >>> 1 ^ -(value2 & 1) | 0;
  }
  /**
   * Reads a varint as a boolean
   */
  bool() {
    return this.uint32() !== 0;
  }
  /**
   * Reads fixed 32 bits as an unsigned 32 bit integer
   */
  fixed32() {
    if (this.pos + 4 > this.len) {
      throw indexOutOfRange(this, 4);
    }
    const res = readFixed32End(this.buf, this.pos += 4);
    return res;
  }
  /**
   * Reads fixed 32 bits as a signed 32 bit integer
   */
  sfixed32() {
    if (this.pos + 4 > this.len) {
      throw indexOutOfRange(this, 4);
    }
    const res = readFixed32End(this.buf, this.pos += 4) | 0;
    return res;
  }
  /**
   * Reads a float (32 bit) as a number
   */
  float() {
    if (this.pos + 4 > this.len) {
      throw indexOutOfRange(this, 4);
    }
    const value2 = readFloatLE(this.buf, this.pos);
    this.pos += 4;
    return value2;
  }
  /**
   * Reads a double (64 bit float) as a number
   */
  double() {
    if (this.pos + 8 > this.len) {
      throw indexOutOfRange(this, 4);
    }
    const value2 = readDoubleLE(this.buf, this.pos);
    this.pos += 8;
    return value2;
  }
  /**
   * Reads a sequence of bytes preceded by its length as a varint
   */
  bytes() {
    const length3 = this.uint32();
    const start2 = this.pos;
    const end = this.pos + length3;
    if (end > this.len) {
      throw indexOutOfRange(this, length3);
    }
    this.pos += length3;
    return start2 === end ? new Uint8Array(0) : this.buf.subarray(start2, end);
  }
  /**
   * Reads a string preceded by its byte length as a varint
   */
  string() {
    const bytes = this.bytes();
    return read2(bytes, 0, bytes.length);
  }
  /**
   * Skips the specified number of bytes if specified, otherwise skips a varint
   */
  skip(length3) {
    if (typeof length3 === "number") {
      if (this.pos + length3 > this.len) {
        throw indexOutOfRange(this, length3);
      }
      this.pos += length3;
    } else {
      do {
        if (this.pos >= this.len) {
          throw indexOutOfRange(this);
        }
      } while ((this.buf[this.pos++] & 128) !== 0);
    }
    return this;
  }
  /**
   * Skips the next element of the specified wire type
   */
  skipType(wireType) {
    switch (wireType) {
      case 0:
        this.skip();
        break;
      case 1:
        this.skip(8);
        break;
      case 2:
        this.skip(this.uint32());
        break;
      case 3:
        while ((wireType = this.uint32() & 7) !== 4) {
          this.skipType(wireType);
        }
        break;
      case 5:
        this.skip(4);
        break;
      default:
        throw Error(`invalid wire type ${wireType} at offset ${this.pos}`);
    }
    return this;
  }
  readLongVarint() {
    const bits = new LongBits(0, 0);
    let i2 = 0;
    if (this.len - this.pos > 4) {
      for (; i2 < 4; ++i2) {
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i2 * 7) >>> 0;
        if (this.buf[this.pos++] < 128) {
          return bits;
        }
      }
      bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
      bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
      if (this.buf[this.pos++] < 128) {
        return bits;
      }
      i2 = 0;
    } else {
      for (; i2 < 3; ++i2) {
        if (this.pos >= this.len) {
          throw indexOutOfRange(this);
        }
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i2 * 7) >>> 0;
        if (this.buf[this.pos++] < 128) {
          return bits;
        }
      }
      bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i2 * 7) >>> 0;
      return bits;
    }
    if (this.len - this.pos > 4) {
      for (; i2 < 5; ++i2) {
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i2 * 7 + 3) >>> 0;
        if (this.buf[this.pos++] < 128) {
          return bits;
        }
      }
    } else {
      for (; i2 < 5; ++i2) {
        if (this.pos >= this.len) {
          throw indexOutOfRange(this);
        }
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i2 * 7 + 3) >>> 0;
        if (this.buf[this.pos++] < 128) {
          return bits;
        }
      }
    }
    throw Error("invalid varint encoding");
  }
  readFixed64() {
    if (this.pos + 8 > this.len) {
      throw indexOutOfRange(this, 8);
    }
    const lo = readFixed32End(this.buf, this.pos += 4);
    const hi = readFixed32End(this.buf, this.pos += 4);
    return new LongBits(lo, hi);
  }
  /**
   * Reads a varint as a signed 64 bit value
   */
  int64() {
    return this.readLongVarint().toBigInt();
  }
  /**
   * Reads a varint as a signed 64 bit value returned as a possibly unsafe
   * JavaScript number
   */
  int64Number() {
    return this.readLongVarint().toNumber();
  }
  /**
   * Reads a varint as a signed 64 bit value returned as a string
   */
  int64String() {
    return this.readLongVarint().toString();
  }
  /**
   * Reads a varint as an unsigned 64 bit value
   */
  uint64() {
    return this.readLongVarint().toBigInt(true);
  }
  /**
   * Reads a varint as an unsigned 64 bit value returned as a possibly unsafe
   * JavaScript number
   */
  uint64Number() {
    const value2 = decodeUint8Array(this.buf, this.pos);
    this.pos += encodingLength2(value2);
    return value2;
  }
  /**
   * Reads a varint as an unsigned 64 bit value returned as a string
   */
  uint64String() {
    return this.readLongVarint().toString(true);
  }
  /**
   * Reads a zig-zag encoded varint as a signed 64 bit value
   */
  sint64() {
    return this.readLongVarint().zzDecode().toBigInt();
  }
  /**
   * Reads a zig-zag encoded varint as a signed 64 bit value returned as a
   * possibly unsafe JavaScript number
   */
  sint64Number() {
    return this.readLongVarint().zzDecode().toNumber();
  }
  /**
   * Reads a zig-zag encoded varint as a signed 64 bit value returned as a
   * string
   */
  sint64String() {
    return this.readLongVarint().zzDecode().toString();
  }
  /**
   * Reads fixed 64 bits
   */
  fixed64() {
    return this.readFixed64().toBigInt();
  }
  /**
   * Reads fixed 64 bits returned as a possibly unsafe JavaScript number
   */
  fixed64Number() {
    return this.readFixed64().toNumber();
  }
  /**
   * Reads fixed 64 bits returned as a string
   */
  fixed64String() {
    return this.readFixed64().toString();
  }
  /**
   * Reads zig-zag encoded fixed 64 bits
   */
  sfixed64() {
    return this.readFixed64().toBigInt();
  }
  /**
   * Reads zig-zag encoded fixed 64 bits returned as a possibly unsafe
   * JavaScript number
   */
  sfixed64Number() {
    return this.readFixed64().toNumber();
  }
  /**
   * Reads zig-zag encoded fixed 64 bits returned as a string
   */
  sfixed64String() {
    return this.readFixed64().toString();
  }
};
function createReader(buf) {
  return new Uint8ArrayReader(buf instanceof Uint8Array ? buf : buf.subarray());
}

// node_modules/protons-runtime/dist/src/decode.js
function decodeMessage(buf, codec, opts) {
  const reader = createReader(buf);
  return codec.decode(reader, void 0, opts);
}

// node_modules/protons-runtime/dist/src/utils/pool.js
function pool(size) {
  const SIZE = size ?? 8192;
  const MAX = SIZE >>> 1;
  let slab;
  let offset = SIZE;
  return function poolAlloc(size2) {
    if (size2 < 1 || size2 > MAX) {
      return allocUnsafe(size2);
    }
    if (offset + size2 > SIZE) {
      slab = allocUnsafe(SIZE);
      offset = 0;
    }
    const buf = slab.subarray(offset, offset += size2);
    if ((offset & 7) !== 0) {
      offset = (offset | 7) + 1;
    }
    return buf;
  };
}

// node_modules/protons-runtime/dist/src/utils/writer.js
var Op = class {
  /**
   * Function to call
   */
  fn;
  /**
   * Value byte length
   */
  len;
  /**
   * Next operation
   */
  next;
  /**
   * Value to write
   */
  val;
  constructor(fn, len, val) {
    this.fn = fn;
    this.len = len;
    this.next = void 0;
    this.val = val;
  }
};
function noop() {
}
var State = class {
  /**
   * Current head
   */
  head;
  /**
   * Current tail
   */
  tail;
  /**
   * Current buffer length
   */
  len;
  /**
   * Next state
   */
  next;
  constructor(writer) {
    this.head = writer.head;
    this.tail = writer.tail;
    this.len = writer.len;
    this.next = writer.states;
  }
};
var bufferPool = pool();
function alloc2(size) {
  if (globalThis.Buffer != null) {
    return allocUnsafe(size);
  }
  return bufferPool(size);
}
var Uint8ArrayWriter = class {
  /**
   * Current length
   */
  len;
  /**
   * Operations head
   */
  head;
  /**
   * Operations tail
   */
  tail;
  /**
   * Linked forked states
   */
  states;
  constructor() {
    this.len = 0;
    this.head = new Op(noop, 0, 0);
    this.tail = this.head;
    this.states = null;
  }
  /**
   * Pushes a new operation to the queue
   */
  _push(fn, len, val) {
    this.tail = this.tail.next = new Op(fn, len, val);
    this.len += len;
    return this;
  }
  /**
   * Writes an unsigned 32 bit value as a varint
   */
  uint32(value2) {
    this.len += (this.tail = this.tail.next = new VarintOp((value2 = value2 >>> 0) < 128 ? 1 : value2 < 16384 ? 2 : value2 < 2097152 ? 3 : value2 < 268435456 ? 4 : 5, value2)).len;
    return this;
  }
  /**
   * Writes a signed 32 bit value as a varint`
   */
  int32(value2) {
    return value2 < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value2)) : this.uint32(value2);
  }
  /**
   * Writes a 32 bit value as a varint, zig-zag encoded
   */
  sint32(value2) {
    return this.uint32((value2 << 1 ^ value2 >> 31) >>> 0);
  }
  /**
   * Writes an unsigned 64 bit value as a varint
   */
  uint64(value2) {
    const bits = LongBits.fromBigInt(value2);
    return this._push(writeVarint64, bits.length(), bits);
  }
  /**
   * Writes an unsigned 64 bit value as a varint
   */
  uint64Number(value2) {
    return this._push(encodeUint8Array, encodingLength2(value2), value2);
  }
  /**
   * Writes an unsigned 64 bit value as a varint
   */
  uint64String(value2) {
    return this.uint64(BigInt(value2));
  }
  /**
   * Writes a signed 64 bit value as a varint
   */
  int64(value2) {
    return this.uint64(value2);
  }
  /**
   * Writes a signed 64 bit value as a varint
   */
  int64Number(value2) {
    return this.uint64Number(value2);
  }
  /**
   * Writes a signed 64 bit value as a varint
   */
  int64String(value2) {
    return this.uint64String(value2);
  }
  /**
   * Writes a signed 64 bit value as a varint, zig-zag encoded
   */
  sint64(value2) {
    const bits = LongBits.fromBigInt(value2).zzEncode();
    return this._push(writeVarint64, bits.length(), bits);
  }
  /**
   * Writes a signed 64 bit value as a varint, zig-zag encoded
   */
  sint64Number(value2) {
    const bits = LongBits.fromNumber(value2).zzEncode();
    return this._push(writeVarint64, bits.length(), bits);
  }
  /**
   * Writes a signed 64 bit value as a varint, zig-zag encoded
   */
  sint64String(value2) {
    return this.sint64(BigInt(value2));
  }
  /**
   * Writes a boolish value as a varint
   */
  bool(value2) {
    return this._push(writeByte, 1, value2 ? 1 : 0);
  }
  /**
   * Writes an unsigned 32 bit value as fixed 32 bits
   */
  fixed32(value2) {
    return this._push(writeFixed32, 4, value2 >>> 0);
  }
  /**
   * Writes a signed 32 bit value as fixed 32 bits
   */
  sfixed32(value2) {
    return this.fixed32(value2);
  }
  /**
   * Writes an unsigned 64 bit value as fixed 64 bits
   */
  fixed64(value2) {
    const bits = LongBits.fromBigInt(value2);
    return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
  }
  /**
   * Writes an unsigned 64 bit value as fixed 64 bits
   */
  fixed64Number(value2) {
    const bits = LongBits.fromNumber(value2);
    return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
  }
  /**
   * Writes an unsigned 64 bit value as fixed 64 bits
   */
  fixed64String(value2) {
    return this.fixed64(BigInt(value2));
  }
  /**
   * Writes a signed 64 bit value as fixed 64 bits
   */
  sfixed64(value2) {
    return this.fixed64(value2);
  }
  /**
   * Writes a signed 64 bit value as fixed 64 bits
   */
  sfixed64Number(value2) {
    return this.fixed64Number(value2);
  }
  /**
   * Writes a signed 64 bit value as fixed 64 bits
   */
  sfixed64String(value2) {
    return this.fixed64String(value2);
  }
  /**
   * Writes a float (32 bit)
   */
  float(value2) {
    return this._push(writeFloatLE, 4, value2);
  }
  /**
   * Writes a double (64 bit float).
   *
   * @function
   * @param {number} value - Value to write
   * @returns {Writer} `this`
   */
  double(value2) {
    return this._push(writeDoubleLE, 8, value2);
  }
  /**
   * Writes a sequence of bytes
   */
  bytes(value2) {
    const len = value2.length >>> 0;
    if (len === 0) {
      return this._push(writeByte, 1, 0);
    }
    return this.uint32(len)._push(writeBytes, len, value2);
  }
  /**
   * Writes a string
   */
  string(value2) {
    const len = length2(value2);
    return len !== 0 ? this.uint32(len)._push(write, len, value2) : this._push(writeByte, 1, 0);
  }
  /**
   * Forks this writer's state by pushing it to a stack.
   * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
   */
  fork() {
    this.states = new State(this);
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
    return this;
  }
  /**
   * Resets this instance to the last state
   */
  reset() {
    if (this.states != null) {
      this.head = this.states.head;
      this.tail = this.states.tail;
      this.len = this.states.len;
      this.states = this.states.next;
    } else {
      this.head = this.tail = new Op(noop, 0, 0);
      this.len = 0;
    }
    return this;
  }
  /**
   * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
   */
  ldelim() {
    const head = this.head;
    const tail = this.tail;
    const len = this.len;
    this.reset().uint32(len);
    if (len !== 0) {
      this.tail.next = head.next;
      this.tail = tail;
      this.len += len;
    }
    return this;
  }
  /**
   * Finishes the write operation
   */
  finish() {
    let head = this.head.next;
    const buf = alloc2(this.len);
    let pos = 0;
    while (head != null) {
      head.fn(head.val, buf, pos);
      pos += head.len;
      head = head.next;
    }
    return buf;
  }
};
function writeByte(val, buf, pos) {
  buf[pos] = val & 255;
}
function writeVarint32(val, buf, pos) {
  while (val > 127) {
    buf[pos++] = val & 127 | 128;
    val >>>= 7;
  }
  buf[pos] = val;
}
var VarintOp = class extends Op {
  next;
  constructor(len, val) {
    super(writeVarint32, len, val);
    this.next = void 0;
  }
};
function writeVarint64(val, buf, pos) {
  while (val.hi !== 0) {
    buf[pos++] = val.lo & 127 | 128;
    val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
    val.hi >>>= 7;
  }
  while (val.lo > 127) {
    buf[pos++] = val.lo & 127 | 128;
    val.lo = val.lo >>> 7;
  }
  buf[pos++] = val.lo;
}
function writeFixed32(val, buf, pos) {
  buf[pos] = val & 255;
  buf[pos + 1] = val >>> 8 & 255;
  buf[pos + 2] = val >>> 16 & 255;
  buf[pos + 3] = val >>> 24;
}
function writeBytes(val, buf, pos) {
  buf.set(val, pos);
}
if (globalThis.Buffer != null) {
  Uint8ArrayWriter.prototype.bytes = function(value2) {
    const len = value2.length >>> 0;
    this.uint32(len);
    if (len > 0) {
      this._push(writeBytesBuffer, len, value2);
    }
    return this;
  };
  Uint8ArrayWriter.prototype.string = function(value2) {
    const len = globalThis.Buffer.byteLength(value2);
    this.uint32(len);
    if (len > 0) {
      this._push(writeStringBuffer, len, value2);
    }
    return this;
  };
}
function writeBytesBuffer(val, buf, pos) {
  buf.set(val, pos);
}
function writeStringBuffer(val, buf, pos) {
  if (val.length < 40) {
    write(val, buf, pos);
  } else if (buf.utf8Write != null) {
    buf.utf8Write(val, pos);
  } else {
    buf.set(fromString2(val), pos);
  }
}
function createWriter() {
  return new Uint8ArrayWriter();
}

// node_modules/protons-runtime/dist/src/encode.js
function encodeMessage(message2, codec) {
  const w = createWriter();
  codec.encode(message2, w, {
    lengthDelimited: false
  });
  return w.finish();
}

// node_modules/protons-runtime/dist/src/codec.js
var CODEC_TYPES;
(function(CODEC_TYPES2) {
  CODEC_TYPES2[CODEC_TYPES2["VARINT"] = 0] = "VARINT";
  CODEC_TYPES2[CODEC_TYPES2["BIT64"] = 1] = "BIT64";
  CODEC_TYPES2[CODEC_TYPES2["LENGTH_DELIMITED"] = 2] = "LENGTH_DELIMITED";
  CODEC_TYPES2[CODEC_TYPES2["START_GROUP"] = 3] = "START_GROUP";
  CODEC_TYPES2[CODEC_TYPES2["END_GROUP"] = 4] = "END_GROUP";
  CODEC_TYPES2[CODEC_TYPES2["BIT32"] = 5] = "BIT32";
})(CODEC_TYPES || (CODEC_TYPES = {}));
function createCodec2(name3, type, encode7, decode8) {
  return {
    name: name3,
    type,
    encode: encode7,
    decode: decode8
  };
}

// node_modules/protons-runtime/dist/src/codecs/enum.js
function enumeration(v) {
  function findValue(val) {
    if (v[val.toString()] == null) {
      throw new Error("Invalid enum value");
    }
    return v[val];
  }
  const encode7 = function enumEncode(val, writer) {
    const enumValue = findValue(val);
    writer.int32(enumValue);
  };
  const decode8 = function enumDecode(reader) {
    const val = reader.int32();
    return findValue(val);
  };
  return createCodec2("enum", CODEC_TYPES.VARINT, encode7, decode8);
}

// node_modules/protons-runtime/dist/src/codecs/message.js
function message(encode7, decode8) {
  return createCodec2("message", CODEC_TYPES.LENGTH_DELIMITED, encode7, decode8);
}

// node_modules/protons-runtime/dist/src/index.js
var MaxLengthError = class extends Error {
  /**
   * This will be removed in a future release
   *
   * @deprecated use the `.name` property instead
   */
  code = "ERR_MAX_LENGTH";
  name = "MaxLengthError";
};
var MaxSizeError = class extends Error {
  /**
   * This will be removed in a future release
   *
   * @deprecated use the `.name` property instead
   */
  code = "ERR_MAX_SIZE";
  name = "MaxSizeError";
};

// node_modules/@libp2p/crypto/dist/src/keys/keys.js
var KeyType;
(function(KeyType2) {
  KeyType2["RSA"] = "RSA";
  KeyType2["Ed25519"] = "Ed25519";
  KeyType2["secp256k1"] = "secp256k1";
  KeyType2["ECDSA"] = "ECDSA";
})(KeyType || (KeyType = {}));
var __KeyTypeValues;
(function(__KeyTypeValues2) {
  __KeyTypeValues2[__KeyTypeValues2["RSA"] = 0] = "RSA";
  __KeyTypeValues2[__KeyTypeValues2["Ed25519"] = 1] = "Ed25519";
  __KeyTypeValues2[__KeyTypeValues2["secp256k1"] = 2] = "secp256k1";
  __KeyTypeValues2[__KeyTypeValues2["ECDSA"] = 3] = "ECDSA";
})(__KeyTypeValues || (__KeyTypeValues = {}));
(function(KeyType2) {
  KeyType2.codec = () => {
    return enumeration(__KeyTypeValues);
  };
})(KeyType || (KeyType = {}));
var PublicKey;
(function(PublicKey2) {
  let _codec;
  PublicKey2.codec = () => {
    if (_codec == null) {
      _codec = message((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork();
        }
        if (obj.Type != null) {
          w.uint32(8);
          KeyType.codec().encode(obj.Type, w);
        }
        if (obj.Data != null) {
          w.uint32(18);
          w.bytes(obj.Data);
        }
        if (opts.lengthDelimited !== false) {
          w.ldelim();
        }
      }, (reader, length3, opts = {}) => {
        const obj = {};
        const end = length3 == null ? reader.len : reader.pos + length3;
        while (reader.pos < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1: {
              obj.Type = KeyType.codec().decode(reader);
              break;
            }
            case 2: {
              obj.Data = reader.bytes();
              break;
            }
            default: {
              reader.skipType(tag & 7);
              break;
            }
          }
        }
        return obj;
      });
    }
    return _codec;
  };
  PublicKey2.encode = (obj) => {
    return encodeMessage(obj, PublicKey2.codec());
  };
  PublicKey2.decode = (buf, opts) => {
    return decodeMessage(buf, PublicKey2.codec(), opts);
  };
})(PublicKey || (PublicKey = {}));
var PrivateKey;
(function(PrivateKey2) {
  let _codec;
  PrivateKey2.codec = () => {
    if (_codec == null) {
      _codec = message((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork();
        }
        if (obj.Type != null) {
          w.uint32(8);
          KeyType.codec().encode(obj.Type, w);
        }
        if (obj.Data != null) {
          w.uint32(18);
          w.bytes(obj.Data);
        }
        if (opts.lengthDelimited !== false) {
          w.ldelim();
        }
      }, (reader, length3, opts = {}) => {
        const obj = {};
        const end = length3 == null ? reader.len : reader.pos + length3;
        while (reader.pos < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1: {
              obj.Type = KeyType.codec().decode(reader);
              break;
            }
            case 2: {
              obj.Data = reader.bytes();
              break;
            }
            default: {
              reader.skipType(tag & 7);
              break;
            }
          }
        }
        return obj;
      });
    }
    return _codec;
  };
  PrivateKey2.encode = (obj) => {
    return encodeMessage(obj, PrivateKey2.codec());
  };
  PrivateKey2.decode = (buf, opts) => {
    return decodeMessage(buf, PrivateKey2.codec(), opts);
  };
})(PrivateKey || (PrivateKey = {}));

// node_modules/@libp2p/crypto/dist/src/keys/rsa/index.js
var import_node_crypto = __toESM(require("node:crypto"), 1);
var import_node_util = require("node:util");

// node_modules/@libp2p/crypto/node_modules/@noble/hashes/utils.js
function isBytes(a2) {
  return a2 instanceof Uint8Array || ArrayBuffer.isView(a2) && a2.constructor.name === "Uint8Array";
}
function anumber(n2, title = "") {
  if (!Number.isSafeInteger(n2) || n2 < 0) {
    const prefix = title && `"${title}" `;
    throw new Error(`${prefix}expected integer >= 0, got ${n2}`);
  }
}
function abytes(value2, length3, title = "") {
  const bytes = isBytes(value2);
  const len = value2?.length;
  const needsLen = length3 !== void 0;
  if (!bytes || needsLen && len !== length3) {
    const prefix = title && `"${title}" `;
    const ofLen = needsLen ? ` of length ${length3}` : "";
    const got = bytes ? `length=${len}` : `type=${typeof value2}`;
    throw new Error(prefix + "expected Uint8Array" + ofLen + ", got " + got);
  }
  return value2;
}
function ahash(h) {
  if (typeof h !== "function" || typeof h.create !== "function")
    throw new Error("Hash must wrapped by utils.createHasher");
  anumber(h.outputLen);
  anumber(h.blockLen);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out, void 0, "digestInto() output");
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error('"digestInto() output" expected to be of length >=' + min);
  }
}
function clean(...arrays) {
  for (let i2 = 0; i2 < arrays.length; i2++) {
    arrays[i2].fill(0);
  }
}
function createView(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
  return word << 32 - shift | word >>> shift;
}
var hasHexBuiltin = /* @__PURE__ */ (() => (
  // @ts-ignore
  typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
))();
var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i2) => i2.toString(16).padStart(2, "0"));
function bytesToHex(bytes) {
  abytes(bytes);
  if (hasHexBuiltin)
    return bytes.toHex();
  let hex = "";
  for (let i2 = 0; i2 < bytes.length; i2++) {
    hex += hexes[bytes[i2]];
  }
  return hex;
}
var asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function asciiToBase16(ch) {
  if (ch >= asciis._0 && ch <= asciis._9)
    return ch - asciis._0;
  if (ch >= asciis.A && ch <= asciis.F)
    return ch - (asciis.A - 10);
  if (ch >= asciis.a && ch <= asciis.f)
    return ch - (asciis.a - 10);
  return;
}
function hexToBytes(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  if (hasHexBuiltin)
    return Uint8Array.fromHex(hex);
  const hl = hex.length;
  const al = hl / 2;
  if (hl % 2)
    throw new Error("hex string expected, got unpadded hex of length " + hl);
  const array = new Uint8Array(al);
  for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
    const n1 = asciiToBase16(hex.charCodeAt(hi));
    const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
    if (n1 === void 0 || n2 === void 0) {
      const char = hex[hi] + hex[hi + 1];
      throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
    }
    array[ai] = n1 * 16 + n2;
  }
  return array;
}
function concatBytes(...arrays) {
  let sum = 0;
  for (let i2 = 0; i2 < arrays.length; i2++) {
    const a2 = arrays[i2];
    abytes(a2);
    sum += a2.length;
  }
  const res = new Uint8Array(sum);
  for (let i2 = 0, pad = 0; i2 < arrays.length; i2++) {
    const a2 = arrays[i2];
    res.set(a2, pad);
    pad += a2.length;
  }
  return res;
}
function createHasher(hashCons, info = {}) {
  const hashC = (msg, opts) => hashCons(opts).update(msg).digest();
  const tmp = hashCons(void 0);
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = (opts) => hashCons(opts);
  Object.assign(hashC, info);
  return Object.freeze(hashC);
}
function randomBytes(bytesLength = 32) {
  const cr = typeof globalThis === "object" ? globalThis.crypto : null;
  if (typeof cr?.getRandomValues !== "function")
    throw new Error("crypto.getRandomValues must be defined");
  return cr.getRandomValues(new Uint8Array(bytesLength));
}
var oidNist = (suffix) => ({
  oid: Uint8Array.from([6, 9, 96, 134, 72, 1, 101, 3, 4, 2, suffix])
});

// node_modules/@libp2p/crypto/dist/src/random-bytes.js
function randomBytes2(length3) {
  if (isNaN(length3) || length3 <= 0) {
    throw new InvalidParametersError("random bytes length must be a Number bigger than 0");
  }
  return randomBytes(length3);
}

// node_modules/@libp2p/crypto/dist/src/keys/rsa/utils.js
var utils_exports = {};
__export(utils_exports, {
  MAX_RSA_KEY_SIZE: () => MAX_RSA_KEY_SIZE,
  generateRSAKeyPair: () => generateRSAKeyPair,
  jwkToJWKKeyPair: () => jwkToJWKKeyPair,
  jwkToPkcs1: () => jwkToPkcs1,
  jwkToPkix: () => jwkToPkix,
  jwkToRSAPrivateKey: () => jwkToRSAPrivateKey,
  pkcs1MessageToJwk: () => pkcs1MessageToJwk,
  pkcs1MessageToRSAPrivateKey: () => pkcs1MessageToRSAPrivateKey,
  pkcs1ToJwk: () => pkcs1ToJwk,
  pkcs1ToRSAPrivateKey: () => pkcs1ToRSAPrivateKey,
  pkixMessageToJwk: () => pkixMessageToJwk,
  pkixMessageToRSAPublicKey: () => pkixMessageToRSAPublicKey,
  pkixToJwk: () => pkixToJwk,
  pkixToRSAPublicKey: () => pkixToRSAPublicKey
});

// node_modules/@libp2p/crypto/node_modules/@noble/hashes/_md.js
function Chi(a2, b, c2) {
  return a2 & b ^ ~a2 & c2;
}
function Maj(a2, b, c2) {
  return a2 & b ^ a2 & c2 ^ b & c2;
}
var HashMD = class {
  blockLen;
  outputLen;
  padOffset;
  isLE;
  // For partial updates less than block size
  buffer;
  view;
  finished = false;
  length = 0;
  pos = 0;
  destroyed = false;
  constructor(blockLen, outputLen, padOffset, isLE2) {
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE2;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView(this.buffer);
  }
  update(data) {
    aexists(this);
    abytes(data);
    const { view, buffer, blockLen } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take2 = Math.min(blockLen - this.pos, len - pos);
      if (take2 === blockLen) {
        const dataView = createView(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take2), this.pos);
      this.pos += take2;
      pos += take2;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    aexists(this);
    aoutput(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE: isLE2 } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    clean(this.buffer.subarray(pos));
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i2 = pos; i2 < blockLen; i2++)
      buffer[i2] = 0;
    view.setBigUint64(blockLen - 8, BigInt(this.length * 8), isLE2);
    this.process(view, 0);
    const oview = createView(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen must be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i2 = 0; i2 < outLen; i2++)
      oview.setUint32(4 * i2, state[i2], isLE2);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    to ||= new this.constructor();
    to.set(...this.get());
    const { blockLen, buffer, length: length3, finished, destroyed, pos } = this;
    to.destroyed = destroyed;
    to.finished = finished;
    to.length = length3;
    to.pos = pos;
    if (length3 % blockLen)
      to.buffer.set(buffer);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
};
var SHA256_IV = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);

// node_modules/@libp2p/crypto/node_modules/@noble/hashes/sha2.js
var SHA256_K = /* @__PURE__ */ Uint32Array.from([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
var SHA2_32B = class extends HashMD {
  constructor(outputLen) {
    super(64, outputLen, 8, false);
  }
  get() {
    const { A, B, C, D, E, F, G, H } = this;
    return [A, B, C, D, E, F, G, H];
  }
  // prettier-ignore
  set(A, B, C, D, E, F, G, H) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
    this.F = F | 0;
    this.G = G | 0;
    this.H = H | 0;
  }
  process(view, offset) {
    for (let i2 = 0; i2 < 16; i2++, offset += 4)
      SHA256_W[i2] = view.getUint32(offset, false);
    for (let i2 = 16; i2 < 64; i2++) {
      const W15 = SHA256_W[i2 - 15];
      const W2 = SHA256_W[i2 - 2];
      const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
      const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
      SHA256_W[i2] = s1 + SHA256_W[i2 - 7] + s0 + SHA256_W[i2 - 16] | 0;
    }
    let { A, B, C, D, E, F, G, H } = this;
    for (let i2 = 0; i2 < 64; i2++) {
      const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
      const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i2] + SHA256_W[i2] | 0;
      const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
      const T2 = sigma0 + Maj(A, B, C) | 0;
      H = G;
      G = F;
      F = E;
      E = D + T1 | 0;
      D = C;
      C = B;
      B = A;
      A = T1 + T2 | 0;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    F = F + this.F | 0;
    G = G + this.G | 0;
    H = H + this.H | 0;
    this.set(A, B, C, D, E, F, G, H);
  }
  roundClean() {
    clean(SHA256_W);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    clean(this.buffer);
  }
};
var _SHA256 = class extends SHA2_32B {
  // We cannot use array here since array allows indexing by variable
  // which means optimizer/compiler cannot use registers.
  A = SHA256_IV[0] | 0;
  B = SHA256_IV[1] | 0;
  C = SHA256_IV[2] | 0;
  D = SHA256_IV[3] | 0;
  E = SHA256_IV[4] | 0;
  F = SHA256_IV[5] | 0;
  G = SHA256_IV[6] | 0;
  H = SHA256_IV[7] | 0;
  constructor() {
    super(32);
  }
};
var sha2562 = /* @__PURE__ */ createHasher(
  () => new _SHA256(),
  /* @__PURE__ */ oidNist(1)
);

// node_modules/@libp2p/crypto/dist/src/keys/rsa/rsa.js
var RSAPublicKey = class {
  type = "RSA";
  jwk;
  _raw;
  _multihash;
  constructor(jwk, digest3) {
    this.jwk = jwk;
    this._multihash = digest3;
  }
  get raw() {
    if (this._raw == null) {
      this._raw = utils_exports.jwkToPkix(this.jwk);
    }
    return this._raw;
  }
  toMultihash() {
    return this._multihash;
  }
  toCID() {
    return CID.createV1(114, this._multihash);
  }
  toString() {
    return base58btc.encode(this.toMultihash().bytes).substring(1);
  }
  equals(key) {
    if (key == null || !(key.raw instanceof Uint8Array)) {
      return false;
    }
    return equals3(this.raw, key.raw);
  }
  verify(data, sig, options) {
    return hashAndVerify3(this.jwk, sig, data, options);
  }
};
var RSAPrivateKey = class {
  type = "RSA";
  jwk;
  _raw;
  publicKey;
  constructor(jwk, publicKey) {
    this.jwk = jwk;
    this.publicKey = publicKey;
  }
  get raw() {
    if (this._raw == null) {
      this._raw = utils_exports.jwkToPkcs1(this.jwk);
    }
    return this._raw;
  }
  equals(key) {
    if (key == null || !(key.raw instanceof Uint8Array)) {
      return false;
    }
    return equals3(this.raw, key.raw);
  }
  sign(message2, options) {
    return hashAndSign3(this.jwk, message2, options);
  }
};

// node_modules/@libp2p/crypto/dist/src/keys/rsa/utils.js
var MAX_RSA_KEY_SIZE = 8192;
var SHA2_256_CODE = 18;
var MAX_RSA_JWK_SIZE = 1062;
var RSA_ALGORITHM_IDENTIFIER = Uint8Array.from([
  48,
  13,
  6,
  9,
  42,
  134,
  72,
  134,
  247,
  13,
  1,
  1,
  1,
  5,
  0
]);
function pkcs1ToJwk(bytes) {
  const message2 = decodeDer(bytes);
  return pkcs1MessageToJwk(message2);
}
function pkcs1MessageToJwk(message2) {
  return {
    n: toString2(message2[1], "base64url"),
    e: toString2(message2[2], "base64url"),
    d: toString2(message2[3], "base64url"),
    p: toString2(message2[4], "base64url"),
    q: toString2(message2[5], "base64url"),
    dp: toString2(message2[6], "base64url"),
    dq: toString2(message2[7], "base64url"),
    qi: toString2(message2[8], "base64url"),
    kty: "RSA"
  };
}
function jwkToPkcs1(jwk) {
  if (jwk.n == null || jwk.e == null || jwk.d == null || jwk.p == null || jwk.q == null || jwk.dp == null || jwk.dq == null || jwk.qi == null) {
    throw new InvalidParametersError("JWK was missing components");
  }
  return encodeSequence([
    encodeInteger(Uint8Array.from([0])),
    encodeInteger(fromString2(jwk.n, "base64url")),
    encodeInteger(fromString2(jwk.e, "base64url")),
    encodeInteger(fromString2(jwk.d, "base64url")),
    encodeInteger(fromString2(jwk.p, "base64url")),
    encodeInteger(fromString2(jwk.q, "base64url")),
    encodeInteger(fromString2(jwk.dp, "base64url")),
    encodeInteger(fromString2(jwk.dq, "base64url")),
    encodeInteger(fromString2(jwk.qi, "base64url"))
  ]).subarray();
}
function pkixToJwk(bytes) {
  const message2 = decodeDer(bytes, {
    offset: 0
  });
  return pkixMessageToJwk(message2);
}
function pkixMessageToJwk(message2) {
  const keys = decodeDer(message2[1], {
    offset: 0
  });
  return {
    kty: "RSA",
    n: toString2(keys[0], "base64url"),
    e: toString2(keys[1], "base64url")
  };
}
function jwkToPkix(jwk) {
  if (jwk.n == null || jwk.e == null) {
    throw new InvalidParametersError("JWK was missing components");
  }
  const subjectPublicKeyInfo = encodeSequence([
    RSA_ALGORITHM_IDENTIFIER,
    encodeBitString(encodeSequence([
      encodeInteger(fromString2(jwk.n, "base64url")),
      encodeInteger(fromString2(jwk.e, "base64url"))
    ]))
  ]);
  return subjectPublicKeyInfo.subarray();
}
function pkcs1ToRSAPrivateKey(bytes) {
  const message2 = decodeDer(bytes);
  return pkcs1MessageToRSAPrivateKey(message2);
}
function pkcs1MessageToRSAPrivateKey(message2) {
  const jwk = pkcs1MessageToJwk(message2);
  return jwkToRSAPrivateKey(jwk);
}
function pkixToRSAPublicKey(bytes, digest3) {
  if (bytes.byteLength >= MAX_RSA_JWK_SIZE) {
    throw new InvalidPublicKeyError("Key size is too large");
  }
  const message2 = decodeDer(bytes, {
    offset: 0
  });
  return pkixMessageToRSAPublicKey(message2, bytes, digest3);
}
function pkixMessageToRSAPublicKey(message2, bytes, digest3) {
  const jwk = pkixMessageToJwk(message2);
  if (digest3 == null) {
    const hash = sha2562(PublicKey.encode({
      Type: KeyType.RSA,
      Data: bytes
    }));
    digest3 = create(SHA2_256_CODE, hash);
  }
  return new RSAPublicKey(jwk, digest3);
}
function jwkToRSAPrivateKey(jwk) {
  if (rsaKeySize(jwk) > MAX_RSA_KEY_SIZE) {
    throw new InvalidParametersError("Key size is too large");
  }
  const keys = jwkToJWKKeyPair(jwk);
  const hash = sha2562(PublicKey.encode({
    Type: KeyType.RSA,
    Data: jwkToPkix(keys.publicKey)
  }));
  const digest3 = create(SHA2_256_CODE, hash);
  return new RSAPrivateKey(keys.privateKey, new RSAPublicKey(keys.publicKey, digest3));
}
async function generateRSAKeyPair(bits) {
  if (bits > MAX_RSA_KEY_SIZE) {
    throw new InvalidParametersError("Key size is too large");
  }
  const keys = await generateRSAKey(bits);
  const hash = sha2562(PublicKey.encode({
    Type: KeyType.RSA,
    Data: jwkToPkix(keys.publicKey)
  }));
  const digest3 = create(SHA2_256_CODE, hash);
  return new RSAPrivateKey(keys.privateKey, new RSAPublicKey(keys.publicKey, digest3));
}
function jwkToJWKKeyPair(key) {
  if (key == null) {
    throw new InvalidParametersError("Missing key parameter");
  }
  return {
    privateKey: key,
    publicKey: {
      kty: key.kty,
      n: key.n,
      e: key.e
    }
  };
}

// node_modules/@libp2p/crypto/dist/src/keys/rsa/index.js
var keypair2 = (0, import_node_util.promisify)(import_node_crypto.default.generateKeyPair);
async function generateRSAKey(bits, options) {
  const key = await keypair2("rsa", {
    modulusLength: bits,
    publicKeyEncoding: { type: "pkcs1", format: "jwk" },
    privateKeyEncoding: { type: "pkcs1", format: "jwk" }
  });
  options?.signal?.throwIfAborted();
  return {
    // @ts-expect-error node types are missing jwk as a format
    privateKey: key.privateKey,
    // @ts-expect-error node types are missing jwk as a format
    publicKey: key.publicKey
  };
}
function hashAndSign3(key, msg, options) {
  options?.signal?.throwIfAborted();
  const hash = import_node_crypto.default.createSign("RSA-SHA256");
  if (msg instanceof Uint8Array) {
    hash.update(msg);
  } else {
    for (const buf of msg) {
      hash.update(buf);
    }
  }
  return hash.sign({ format: "jwk", key });
}
function hashAndVerify3(key, sig, msg, options) {
  options?.signal?.throwIfAborted();
  const hash = import_node_crypto.default.createVerify("RSA-SHA256");
  if (msg instanceof Uint8Array) {
    hash.update(msg);
  } else {
    for (const buf of msg) {
      hash.update(buf);
    }
  }
  return hash.verify({ format: "jwk", key }, sig);
}
function rsaKeySize(jwk) {
  if (jwk.kty !== "RSA") {
    throw new InvalidParametersError("Invalid key type");
  } else if (jwk.n == null) {
    throw new InvalidParametersError("Invalid key modulus");
  }
  const modulus = fromString2(jwk.n, "base64url");
  return modulus.length * 8;
}

// node_modules/@libp2p/crypto/dist/src/keys/secp256k1/index.js
var import_node_crypto2 = __toESM(require("node:crypto"), 1);

// node_modules/@libp2p/crypto/node_modules/@noble/curves/utils.js
var _0n = /* @__PURE__ */ BigInt(0);
var _1n = /* @__PURE__ */ BigInt(1);
function abool(value2, title = "") {
  if (typeof value2 !== "boolean") {
    const prefix = title && `"${title}" `;
    throw new Error(prefix + "expected boolean, got type=" + typeof value2);
  }
  return value2;
}
function abignumber(n2) {
  if (typeof n2 === "bigint") {
    if (!isPosBig(n2))
      throw new Error("positive bigint expected, got " + n2);
  } else
    anumber(n2);
  return n2;
}
function numberToHexUnpadded(num) {
  const hex = abignumber(num).toString(16);
  return hex.length & 1 ? "0" + hex : hex;
}
function hexToNumber(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  return hex === "" ? _0n : BigInt("0x" + hex);
}
function bytesToNumberBE(bytes) {
  return hexToNumber(bytesToHex(bytes));
}
function bytesToNumberLE(bytes) {
  return hexToNumber(bytesToHex(copyBytes(abytes(bytes)).reverse()));
}
function numberToBytesBE(n2, len) {
  anumber(len);
  n2 = abignumber(n2);
  const res = hexToBytes(n2.toString(16).padStart(len * 2, "0"));
  if (res.length !== len)
    throw new Error("number too large");
  return res;
}
function numberToBytesLE(n2, len) {
  return numberToBytesBE(n2, len).reverse();
}
function copyBytes(bytes) {
  return Uint8Array.from(bytes);
}
var isPosBig = (n2) => typeof n2 === "bigint" && _0n <= n2;
function inRange(n2, min, max) {
  return isPosBig(n2) && isPosBig(min) && isPosBig(max) && min <= n2 && n2 < max;
}
function aInRange(title, n2, min, max) {
  if (!inRange(n2, min, max))
    throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n2);
}
function bitLen(n2) {
  let len;
  for (len = 0; n2 > _0n; n2 >>= _1n, len += 1)
    ;
  return len;
}
var bitMask = (n2) => (_1n << BigInt(n2)) - _1n;
function createHmacDrbg(hashLen, qByteLen, hmacFn) {
  anumber(hashLen, "hashLen");
  anumber(qByteLen, "qByteLen");
  if (typeof hmacFn !== "function")
    throw new Error("hmacFn must be a function");
  const u8n = (len) => new Uint8Array(len);
  const NULL = Uint8Array.of();
  const byte0 = Uint8Array.of(0);
  const byte1 = Uint8Array.of(1);
  const _maxDrbgIters = 1e3;
  let v = u8n(hashLen);
  let k = u8n(hashLen);
  let i2 = 0;
  const reset = () => {
    v.fill(1);
    k.fill(0);
    i2 = 0;
  };
  const h = (...msgs) => hmacFn(k, concatBytes(v, ...msgs));
  const reseed = (seed = NULL) => {
    k = h(byte0, seed);
    v = h();
    if (seed.length === 0)
      return;
    k = h(byte1, seed);
    v = h();
  };
  const gen = () => {
    if (i2++ >= _maxDrbgIters)
      throw new Error("drbg: tried max amount of iterations");
    let len = 0;
    const out = [];
    while (len < qByteLen) {
      v = h();
      const sl = v.slice();
      out.push(sl);
      len += v.length;
    }
    return concatBytes(...out);
  };
  const genUntil = (seed, pred) => {
    reset();
    reseed(seed);
    let res = void 0;
    while (!(res = pred(gen())))
      reseed();
    reset();
    return res;
  };
  return genUntil;
}
function validateObject(object, fields = {}, optFields = {}) {
  if (!object || typeof object !== "object")
    throw new Error("expected valid options object");
  function checkField(fieldName, expectedType, isOpt) {
    const val = object[fieldName];
    if (isOpt && val === void 0)
      return;
    const current = typeof val;
    if (current !== expectedType || val === null)
      throw new Error(`param "${fieldName}" is invalid: expected ${expectedType}, got ${current}`);
  }
  const iter = (f2, isOpt) => Object.entries(f2).forEach(([k, v]) => checkField(k, v, isOpt));
  iter(fields, false);
  iter(optFields, true);
}
function memoized(fn) {
  const map = /* @__PURE__ */ new WeakMap();
  return (arg, ...args) => {
    const val = map.get(arg);
    if (val !== void 0)
      return val;
    const computed = fn(arg, ...args);
    map.set(arg, computed);
    return computed;
  };
}

// node_modules/@libp2p/crypto/node_modules/@noble/curves/abstract/modular.js
var _0n2 = /* @__PURE__ */ BigInt(0);
var _1n2 = /* @__PURE__ */ BigInt(1);
var _2n = /* @__PURE__ */ BigInt(2);
var _3n = /* @__PURE__ */ BigInt(3);
var _4n = /* @__PURE__ */ BigInt(4);
var _5n = /* @__PURE__ */ BigInt(5);
var _7n = /* @__PURE__ */ BigInt(7);
var _8n = /* @__PURE__ */ BigInt(8);
var _9n = /* @__PURE__ */ BigInt(9);
var _16n = /* @__PURE__ */ BigInt(16);
function mod(a2, b) {
  const result = a2 % b;
  return result >= _0n2 ? result : b + result;
}
function pow2(x, power, modulo) {
  let res = x;
  while (power-- > _0n2) {
    res *= res;
    res %= modulo;
  }
  return res;
}
function invert(number, modulo) {
  if (number === _0n2)
    throw new Error("invert: expected non-zero number");
  if (modulo <= _0n2)
    throw new Error("invert: expected positive modulus, got " + modulo);
  let a2 = mod(number, modulo);
  let b = modulo;
  let x = _0n2, y = _1n2, u = _1n2, v = _0n2;
  while (a2 !== _0n2) {
    const q = b / a2;
    const r2 = b % a2;
    const m2 = x - u * q;
    const n2 = y - v * q;
    b = a2, a2 = r2, x = u, y = v, u = m2, v = n2;
  }
  const gcd = b;
  if (gcd !== _1n2)
    throw new Error("invert: does not exist");
  return mod(x, modulo);
}
function assertIsSquare(Fp2, root, n2) {
  if (!Fp2.eql(Fp2.sqr(root), n2))
    throw new Error("Cannot find square root");
}
function sqrt3mod4(Fp2, n2) {
  const p1div4 = (Fp2.ORDER + _1n2) / _4n;
  const root = Fp2.pow(n2, p1div4);
  assertIsSquare(Fp2, root, n2);
  return root;
}
function sqrt5mod8(Fp2, n2) {
  const p5div8 = (Fp2.ORDER - _5n) / _8n;
  const n22 = Fp2.mul(n2, _2n);
  const v = Fp2.pow(n22, p5div8);
  const nv = Fp2.mul(n2, v);
  const i2 = Fp2.mul(Fp2.mul(nv, _2n), v);
  const root = Fp2.mul(nv, Fp2.sub(i2, Fp2.ONE));
  assertIsSquare(Fp2, root, n2);
  return root;
}
function sqrt9mod16(P) {
  const Fp_ = Field(P);
  const tn = tonelliShanks(P);
  const c1 = tn(Fp_, Fp_.neg(Fp_.ONE));
  const c2 = tn(Fp_, c1);
  const c3 = tn(Fp_, Fp_.neg(c1));
  const c4 = (P + _7n) / _16n;
  return (Fp2, n2) => {
    let tv1 = Fp2.pow(n2, c4);
    let tv2 = Fp2.mul(tv1, c1);
    const tv3 = Fp2.mul(tv1, c2);
    const tv4 = Fp2.mul(tv1, c3);
    const e1 = Fp2.eql(Fp2.sqr(tv2), n2);
    const e2 = Fp2.eql(Fp2.sqr(tv3), n2);
    tv1 = Fp2.cmov(tv1, tv2, e1);
    tv2 = Fp2.cmov(tv4, tv3, e2);
    const e3 = Fp2.eql(Fp2.sqr(tv2), n2);
    const root = Fp2.cmov(tv1, tv2, e3);
    assertIsSquare(Fp2, root, n2);
    return root;
  };
}
function tonelliShanks(P) {
  if (P < _3n)
    throw new Error("sqrt is not defined for small field");
  let Q = P - _1n2;
  let S = 0;
  while (Q % _2n === _0n2) {
    Q /= _2n;
    S++;
  }
  let Z = _2n;
  const _Fp = Field(P);
  while (FpLegendre(_Fp, Z) === 1) {
    if (Z++ > 1e3)
      throw new Error("Cannot find square root: probably non-prime P");
  }
  if (S === 1)
    return sqrt3mod4;
  let cc = _Fp.pow(Z, Q);
  const Q1div2 = (Q + _1n2) / _2n;
  return function tonelliSlow(Fp2, n2) {
    if (Fp2.is0(n2))
      return n2;
    if (FpLegendre(Fp2, n2) !== 1)
      throw new Error("Cannot find square root");
    let M = S;
    let c2 = Fp2.mul(Fp2.ONE, cc);
    let t2 = Fp2.pow(n2, Q);
    let R = Fp2.pow(n2, Q1div2);
    while (!Fp2.eql(t2, Fp2.ONE)) {
      if (Fp2.is0(t2))
        return Fp2.ZERO;
      let i2 = 1;
      let t_tmp = Fp2.sqr(t2);
      while (!Fp2.eql(t_tmp, Fp2.ONE)) {
        i2++;
        t_tmp = Fp2.sqr(t_tmp);
        if (i2 === M)
          throw new Error("Cannot find square root");
      }
      const exponent = _1n2 << BigInt(M - i2 - 1);
      const b = Fp2.pow(c2, exponent);
      M = i2;
      c2 = Fp2.sqr(b);
      t2 = Fp2.mul(t2, c2);
      R = Fp2.mul(R, b);
    }
    return R;
  };
}
function FpSqrt(P) {
  if (P % _4n === _3n)
    return sqrt3mod4;
  if (P % _8n === _5n)
    return sqrt5mod8;
  if (P % _16n === _9n)
    return sqrt9mod16(P);
  return tonelliShanks(P);
}
var FIELD_FIELDS = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function validateField(field) {
  const initial = {
    ORDER: "bigint",
    BYTES: "number",
    BITS: "number"
  };
  const opts = FIELD_FIELDS.reduce((map, val) => {
    map[val] = "function";
    return map;
  }, initial);
  validateObject(field, opts);
  return field;
}
function FpPow(Fp2, num, power) {
  if (power < _0n2)
    throw new Error("invalid exponent, negatives unsupported");
  if (power === _0n2)
    return Fp2.ONE;
  if (power === _1n2)
    return num;
  let p2 = Fp2.ONE;
  let d2 = num;
  while (power > _0n2) {
    if (power & _1n2)
      p2 = Fp2.mul(p2, d2);
    d2 = Fp2.sqr(d2);
    power >>= _1n2;
  }
  return p2;
}
function FpInvertBatch(Fp2, nums, passZero = false) {
  const inverted = new Array(nums.length).fill(passZero ? Fp2.ZERO : void 0);
  const multipliedAcc = nums.reduce((acc, num, i2) => {
    if (Fp2.is0(num))
      return acc;
    inverted[i2] = acc;
    return Fp2.mul(acc, num);
  }, Fp2.ONE);
  const invertedAcc = Fp2.inv(multipliedAcc);
  nums.reduceRight((acc, num, i2) => {
    if (Fp2.is0(num))
      return acc;
    inverted[i2] = Fp2.mul(acc, inverted[i2]);
    return Fp2.mul(acc, num);
  }, invertedAcc);
  return inverted;
}
function FpLegendre(Fp2, n2) {
  const p1mod2 = (Fp2.ORDER - _1n2) / _2n;
  const powered = Fp2.pow(n2, p1mod2);
  const yes = Fp2.eql(powered, Fp2.ONE);
  const zero2 = Fp2.eql(powered, Fp2.ZERO);
  const no = Fp2.eql(powered, Fp2.neg(Fp2.ONE));
  if (!yes && !zero2 && !no)
    throw new Error("invalid Legendre symbol result");
  return yes ? 1 : zero2 ? 0 : -1;
}
function nLength(n2, nBitLength) {
  if (nBitLength !== void 0)
    anumber(nBitLength);
  const _nBitLength = nBitLength !== void 0 ? nBitLength : n2.toString(2).length;
  const nByteLength = Math.ceil(_nBitLength / 8);
  return { nBitLength: _nBitLength, nByteLength };
}
var _Field = class {
  ORDER;
  BITS;
  BYTES;
  isLE;
  ZERO = _0n2;
  ONE = _1n2;
  _lengths;
  _sqrt;
  // cached sqrt
  _mod;
  constructor(ORDER, opts = {}) {
    if (ORDER <= _0n2)
      throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
    let _nbitLength = void 0;
    this.isLE = false;
    if (opts != null && typeof opts === "object") {
      if (typeof opts.BITS === "number")
        _nbitLength = opts.BITS;
      if (typeof opts.sqrt === "function")
        this.sqrt = opts.sqrt;
      if (typeof opts.isLE === "boolean")
        this.isLE = opts.isLE;
      if (opts.allowedLengths)
        this._lengths = opts.allowedLengths?.slice();
      if (typeof opts.modFromBytes === "boolean")
        this._mod = opts.modFromBytes;
    }
    const { nBitLength, nByteLength } = nLength(ORDER, _nbitLength);
    if (nByteLength > 2048)
      throw new Error("invalid field: expected ORDER of <= 2048 bytes");
    this.ORDER = ORDER;
    this.BITS = nBitLength;
    this.BYTES = nByteLength;
    this._sqrt = void 0;
    Object.preventExtensions(this);
  }
  create(num) {
    return mod(num, this.ORDER);
  }
  isValid(num) {
    if (typeof num !== "bigint")
      throw new Error("invalid field element: expected bigint, got " + typeof num);
    return _0n2 <= num && num < this.ORDER;
  }
  is0(num) {
    return num === _0n2;
  }
  // is valid and invertible
  isValidNot0(num) {
    return !this.is0(num) && this.isValid(num);
  }
  isOdd(num) {
    return (num & _1n2) === _1n2;
  }
  neg(num) {
    return mod(-num, this.ORDER);
  }
  eql(lhs, rhs) {
    return lhs === rhs;
  }
  sqr(num) {
    return mod(num * num, this.ORDER);
  }
  add(lhs, rhs) {
    return mod(lhs + rhs, this.ORDER);
  }
  sub(lhs, rhs) {
    return mod(lhs - rhs, this.ORDER);
  }
  mul(lhs, rhs) {
    return mod(lhs * rhs, this.ORDER);
  }
  pow(num, power) {
    return FpPow(this, num, power);
  }
  div(lhs, rhs) {
    return mod(lhs * invert(rhs, this.ORDER), this.ORDER);
  }
  // Same as above, but doesn't normalize
  sqrN(num) {
    return num * num;
  }
  addN(lhs, rhs) {
    return lhs + rhs;
  }
  subN(lhs, rhs) {
    return lhs - rhs;
  }
  mulN(lhs, rhs) {
    return lhs * rhs;
  }
  inv(num) {
    return invert(num, this.ORDER);
  }
  sqrt(num) {
    if (!this._sqrt)
      this._sqrt = FpSqrt(this.ORDER);
    return this._sqrt(this, num);
  }
  toBytes(num) {
    return this.isLE ? numberToBytesLE(num, this.BYTES) : numberToBytesBE(num, this.BYTES);
  }
  fromBytes(bytes, skipValidation = false) {
    abytes(bytes);
    const { _lengths: allowedLengths, BYTES, isLE: isLE2, ORDER, _mod: modFromBytes } = this;
    if (allowedLengths) {
      if (!allowedLengths.includes(bytes.length) || bytes.length > BYTES) {
        throw new Error("Field.fromBytes: expected " + allowedLengths + " bytes, got " + bytes.length);
      }
      const padded = new Uint8Array(BYTES);
      padded.set(bytes, isLE2 ? 0 : padded.length - bytes.length);
      bytes = padded;
    }
    if (bytes.length !== BYTES)
      throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes.length);
    let scalar = isLE2 ? bytesToNumberLE(bytes) : bytesToNumberBE(bytes);
    if (modFromBytes)
      scalar = mod(scalar, ORDER);
    if (!skipValidation) {
      if (!this.isValid(scalar))
        throw new Error("invalid field element: outside of range 0..ORDER");
    }
    return scalar;
  }
  // TODO: we don't need it here, move out to separate fn
  invertBatch(lst) {
    return FpInvertBatch(this, lst);
  }
  // We can't move this out because Fp6, Fp12 implement it
  // and it's unclear what to return in there.
  cmov(a2, b, condition) {
    return condition ? b : a2;
  }
};
function Field(ORDER, opts = {}) {
  return new _Field(ORDER, opts);
}
function getFieldBytesLength(fieldOrder) {
  if (typeof fieldOrder !== "bigint")
    throw new Error("field order must be bigint");
  const bitLength = fieldOrder.toString(2).length;
  return Math.ceil(bitLength / 8);
}
function getMinHashLength(fieldOrder) {
  const length3 = getFieldBytesLength(fieldOrder);
  return length3 + Math.ceil(length3 / 2);
}
function mapHashToField(key, fieldOrder, isLE2 = false) {
  abytes(key);
  const len = key.length;
  const fieldLen = getFieldBytesLength(fieldOrder);
  const minLen = getMinHashLength(fieldOrder);
  if (len < 16 || len < minLen || len > 1024)
    throw new Error("expected " + minLen + "-1024 bytes of input, got " + len);
  const num = isLE2 ? bytesToNumberLE(key) : bytesToNumberBE(key);
  const reduced = mod(num, fieldOrder - _1n2) + _1n2;
  return isLE2 ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
}

// node_modules/@libp2p/crypto/node_modules/@noble/curves/abstract/curve.js
var _0n3 = /* @__PURE__ */ BigInt(0);
var _1n3 = /* @__PURE__ */ BigInt(1);
function negateCt(condition, item) {
  const neg = item.negate();
  return condition ? neg : item;
}
function normalizeZ(c2, points) {
  const invertedZs = FpInvertBatch(c2.Fp, points.map((p2) => p2.Z));
  return points.map((p2, i2) => c2.fromAffine(p2.toAffine(invertedZs[i2])));
}
function validateW(W, bits) {
  if (!Number.isSafeInteger(W) || W <= 0 || W > bits)
    throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W);
}
function calcWOpts(W, scalarBits) {
  validateW(W, scalarBits);
  const windows = Math.ceil(scalarBits / W) + 1;
  const windowSize = 2 ** (W - 1);
  const maxNumber = 2 ** W;
  const mask = bitMask(W);
  const shiftBy = BigInt(W);
  return { windows, windowSize, mask, maxNumber, shiftBy };
}
function calcOffsets(n2, window2, wOpts) {
  const { windowSize, mask, maxNumber, shiftBy } = wOpts;
  let wbits = Number(n2 & mask);
  let nextN = n2 >> shiftBy;
  if (wbits > windowSize) {
    wbits -= maxNumber;
    nextN += _1n3;
  }
  const offsetStart = window2 * windowSize;
  const offset = offsetStart + Math.abs(wbits) - 1;
  const isZero = wbits === 0;
  const isNeg = wbits < 0;
  const isNegF = window2 % 2 !== 0;
  const offsetF = offsetStart;
  return { nextN, offset, isZero, isNeg, isNegF, offsetF };
}
var pointPrecomputes = /* @__PURE__ */ new WeakMap();
var pointWindowSizes = /* @__PURE__ */ new WeakMap();
function getW(P) {
  return pointWindowSizes.get(P) || 1;
}
function assert0(n2) {
  if (n2 !== _0n3)
    throw new Error("invalid wNAF");
}
var wNAF = class {
  BASE;
  ZERO;
  Fn;
  bits;
  // Parametrized with a given Point class (not individual point)
  constructor(Point, bits) {
    this.BASE = Point.BASE;
    this.ZERO = Point.ZERO;
    this.Fn = Point.Fn;
    this.bits = bits;
  }
  // non-const time multiplication ladder
  _unsafeLadder(elm, n2, p2 = this.ZERO) {
    let d2 = elm;
    while (n2 > _0n3) {
      if (n2 & _1n3)
        p2 = p2.add(d2);
      d2 = d2.double();
      n2 >>= _1n3;
    }
    return p2;
  }
  /**
   * Creates a wNAF precomputation window. Used for caching.
   * Default window size is set by `utils.precompute()` and is equal to 8.
   * Number of precomputed points depends on the curve size:
   * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
   * - 𝑊 is the window size
   * - 𝑛 is the bitlength of the curve order.
   * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
   * @param point Point instance
   * @param W window size
   * @returns precomputed point tables flattened to a single array
   */
  precomputeWindow(point, W) {
    const { windows, windowSize } = calcWOpts(W, this.bits);
    const points = [];
    let p2 = point;
    let base3 = p2;
    for (let window2 = 0; window2 < windows; window2++) {
      base3 = p2;
      points.push(base3);
      for (let i2 = 1; i2 < windowSize; i2++) {
        base3 = base3.add(p2);
        points.push(base3);
      }
      p2 = base3.double();
    }
    return points;
  }
  /**
   * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
   * More compact implementation:
   * https://github.com/paulmillr/noble-secp256k1/blob/47cb1669b6e506ad66b35fe7d76132ae97465da2/index.ts#L502-L541
   * @returns real and fake (for const-time) points
   */
  wNAF(W, precomputes, n2) {
    if (!this.Fn.isValid(n2))
      throw new Error("invalid scalar");
    let p2 = this.ZERO;
    let f2 = this.BASE;
    const wo = calcWOpts(W, this.bits);
    for (let window2 = 0; window2 < wo.windows; window2++) {
      const { nextN, offset, isZero, isNeg, isNegF, offsetF } = calcOffsets(n2, window2, wo);
      n2 = nextN;
      if (isZero) {
        f2 = f2.add(negateCt(isNegF, precomputes[offsetF]));
      } else {
        p2 = p2.add(negateCt(isNeg, precomputes[offset]));
      }
    }
    assert0(n2);
    return { p: p2, f: f2 };
  }
  /**
   * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
   * @param acc accumulator point to add result of multiplication
   * @returns point
   */
  wNAFUnsafe(W, precomputes, n2, acc = this.ZERO) {
    const wo = calcWOpts(W, this.bits);
    for (let window2 = 0; window2 < wo.windows; window2++) {
      if (n2 === _0n3)
        break;
      const { nextN, offset, isZero, isNeg } = calcOffsets(n2, window2, wo);
      n2 = nextN;
      if (isZero) {
        continue;
      } else {
        const item = precomputes[offset];
        acc = acc.add(isNeg ? item.negate() : item);
      }
    }
    assert0(n2);
    return acc;
  }
  getPrecomputes(W, point, transform) {
    let comp = pointPrecomputes.get(point);
    if (!comp) {
      comp = this.precomputeWindow(point, W);
      if (W !== 1) {
        if (typeof transform === "function")
          comp = transform(comp);
        pointPrecomputes.set(point, comp);
      }
    }
    return comp;
  }
  cached(point, scalar, transform) {
    const W = getW(point);
    return this.wNAF(W, this.getPrecomputes(W, point, transform), scalar);
  }
  unsafe(point, scalar, transform, prev) {
    const W = getW(point);
    if (W === 1)
      return this._unsafeLadder(point, scalar, prev);
    return this.wNAFUnsafe(W, this.getPrecomputes(W, point, transform), scalar, prev);
  }
  // We calculate precomputes for elliptic curve point multiplication
  // using windowed method. This specifies window size and
  // stores precomputed values. Usually only base point would be precomputed.
  createCache(P, W) {
    validateW(W, this.bits);
    pointWindowSizes.set(P, W);
    pointPrecomputes.delete(P);
  }
  hasCache(elm) {
    return getW(elm) !== 1;
  }
};
function mulEndoUnsafe(Point, point, k1, k2) {
  let acc = point;
  let p1 = Point.ZERO;
  let p2 = Point.ZERO;
  while (k1 > _0n3 || k2 > _0n3) {
    if (k1 & _1n3)
      p1 = p1.add(acc);
    if (k2 & _1n3)
      p2 = p2.add(acc);
    acc = acc.double();
    k1 >>= _1n3;
    k2 >>= _1n3;
  }
  return { p1, p2 };
}
function createField(order, field, isLE2) {
  if (field) {
    if (field.ORDER !== order)
      throw new Error("Field.ORDER must match order: Fp == p, Fn == n");
    validateField(field);
    return field;
  } else {
    return Field(order, { isLE: isLE2 });
  }
}
function createCurveFields(type, CURVE, curveOpts = {}, FpFnLE) {
  if (FpFnLE === void 0)
    FpFnLE = type === "edwards";
  if (!CURVE || typeof CURVE !== "object")
    throw new Error(`expected valid ${type} CURVE object`);
  for (const p2 of ["p", "n", "h"]) {
    const val = CURVE[p2];
    if (!(typeof val === "bigint" && val > _0n3))
      throw new Error(`CURVE.${p2} must be positive bigint`);
  }
  const Fp2 = createField(CURVE.p, curveOpts.Fp, FpFnLE);
  const Fn2 = createField(CURVE.n, curveOpts.Fn, FpFnLE);
  const _b = type === "weierstrass" ? "b" : "d";
  const params = ["Gx", "Gy", "a", _b];
  for (const p2 of params) {
    if (!Fp2.isValid(CURVE[p2]))
      throw new Error(`CURVE.${p2} must be valid field element of CURVE.Fp`);
  }
  CURVE = Object.freeze(Object.assign({}, CURVE));
  return { CURVE, Fp: Fp2, Fn: Fn2 };
}
function createKeygen(randomSecretKey, getPublicKey) {
  return function keygen(seed) {
    const secretKey = randomSecretKey(seed);
    return { secretKey, publicKey: getPublicKey(secretKey) };
  };
}

// node_modules/@libp2p/crypto/node_modules/@noble/hashes/hmac.js
var _HMAC = class {
  oHash;
  iHash;
  blockLen;
  outputLen;
  finished = false;
  destroyed = false;
  constructor(hash, key) {
    ahash(hash);
    abytes(key, void 0, "key");
    this.iHash = hash.create();
    if (typeof this.iHash.update !== "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen;
    this.outputLen = this.iHash.outputLen;
    const blockLen = this.blockLen;
    const pad = new Uint8Array(blockLen);
    pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
    for (let i2 = 0; i2 < pad.length; i2++)
      pad[i2] ^= 54;
    this.iHash.update(pad);
    this.oHash = hash.create();
    for (let i2 = 0; i2 < pad.length; i2++)
      pad[i2] ^= 54 ^ 92;
    this.oHash.update(pad);
    clean(pad);
  }
  update(buf) {
    aexists(this);
    this.iHash.update(buf);
    return this;
  }
  digestInto(out) {
    aexists(this);
    abytes(out, this.outputLen, "output");
    this.finished = true;
    this.iHash.digestInto(out);
    this.oHash.update(out);
    this.oHash.digestInto(out);
    this.destroy();
  }
  digest() {
    const out = new Uint8Array(this.oHash.outputLen);
    this.digestInto(out);
    return out;
  }
  _cloneInto(to) {
    to ||= Object.create(Object.getPrototypeOf(this), {});
    const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
    to = to;
    to.finished = finished;
    to.destroyed = destroyed;
    to.blockLen = blockLen;
    to.outputLen = outputLen;
    to.oHash = oHash._cloneInto(to.oHash);
    to.iHash = iHash._cloneInto(to.iHash);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
  destroy() {
    this.destroyed = true;
    this.oHash.destroy();
    this.iHash.destroy();
  }
};
var hmac = (hash, key, message2) => new _HMAC(hash, key).update(message2).digest();
hmac.create = (hash, key) => new _HMAC(hash, key);

// node_modules/@libp2p/crypto/node_modules/@noble/curves/abstract/weierstrass.js
var divNearest = (num, den) => (num + (num >= 0 ? den : -den) / _2n2) / den;
function _splitEndoScalar(k, basis, n2) {
  const [[a1, b1], [a2, b2]] = basis;
  const c1 = divNearest(b2 * k, n2);
  const c2 = divNearest(-b1 * k, n2);
  let k1 = k - c1 * a1 - c2 * a2;
  let k2 = -c1 * b1 - c2 * b2;
  const k1neg = k1 < _0n4;
  const k2neg = k2 < _0n4;
  if (k1neg)
    k1 = -k1;
  if (k2neg)
    k2 = -k2;
  const MAX_NUM = bitMask(Math.ceil(bitLen(n2) / 2)) + _1n4;
  if (k1 < _0n4 || k1 >= MAX_NUM || k2 < _0n4 || k2 >= MAX_NUM) {
    throw new Error("splitScalar (endomorphism): failed, k=" + k);
  }
  return { k1neg, k1, k2neg, k2 };
}
function validateSigFormat(format2) {
  if (!["compact", "recovered", "der"].includes(format2))
    throw new Error('Signature format must be "compact", "recovered", or "der"');
  return format2;
}
function validateSigOpts(opts, def) {
  const optsn = {};
  for (let optName of Object.keys(def)) {
    optsn[optName] = opts[optName] === void 0 ? def[optName] : opts[optName];
  }
  abool(optsn.lowS, "lowS");
  abool(optsn.prehash, "prehash");
  if (optsn.format !== void 0)
    validateSigFormat(optsn.format);
  return optsn;
}
var DERErr = class extends Error {
  constructor(m2 = "") {
    super(m2);
  }
};
var DER = {
  // asn.1 DER encoding utils
  Err: DERErr,
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: (tag, data) => {
      const { Err: E } = DER;
      if (tag < 0 || tag > 256)
        throw new E("tlv.encode: wrong tag");
      if (data.length & 1)
        throw new E("tlv.encode: unpadded data");
      const dataLen = data.length / 2;
      const len = numberToHexUnpadded(dataLen);
      if (len.length / 2 & 128)
        throw new E("tlv.encode: long form length too big");
      const lenLen = dataLen > 127 ? numberToHexUnpadded(len.length / 2 | 128) : "";
      const t2 = numberToHexUnpadded(tag);
      return t2 + lenLen + len + data;
    },
    // v - value, l - left bytes (unparsed)
    decode(tag, data) {
      const { Err: E } = DER;
      let pos = 0;
      if (tag < 0 || tag > 256)
        throw new E("tlv.encode: wrong tag");
      if (data.length < 2 || data[pos++] !== tag)
        throw new E("tlv.decode: wrong tlv");
      const first = data[pos++];
      const isLong = !!(first & 128);
      let length3 = 0;
      if (!isLong)
        length3 = first;
      else {
        const lenLen = first & 127;
        if (!lenLen)
          throw new E("tlv.decode(long): indefinite length not supported");
        if (lenLen > 4)
          throw new E("tlv.decode(long): byte length is too big");
        const lengthBytes = data.subarray(pos, pos + lenLen);
        if (lengthBytes.length !== lenLen)
          throw new E("tlv.decode: length bytes not complete");
        if (lengthBytes[0] === 0)
          throw new E("tlv.decode(long): zero leftmost byte");
        for (const b of lengthBytes)
          length3 = length3 << 8 | b;
        pos += lenLen;
        if (length3 < 128)
          throw new E("tlv.decode(long): not minimal encoding");
      }
      const v = data.subarray(pos, pos + length3);
      if (v.length !== length3)
        throw new E("tlv.decode: wrong value length");
      return { v, l: data.subarray(pos + length3) };
    }
  },
  // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
  // since we always use positive integers here. It must always be empty:
  // - add zero byte if exists
  // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
  _int: {
    encode(num) {
      const { Err: E } = DER;
      if (num < _0n4)
        throw new E("integer: negative integers are not allowed");
      let hex = numberToHexUnpadded(num);
      if (Number.parseInt(hex[0], 16) & 8)
        hex = "00" + hex;
      if (hex.length & 1)
        throw new E("unexpected DER parsing assertion: unpadded hex");
      return hex;
    },
    decode(data) {
      const { Err: E } = DER;
      if (data[0] & 128)
        throw new E("invalid signature integer: negative");
      if (data[0] === 0 && !(data[1] & 128))
        throw new E("invalid signature integer: unnecessary leading zero");
      return bytesToNumberBE(data);
    }
  },
  toSig(bytes) {
    const { Err: E, _int: int, _tlv: tlv } = DER;
    const data = abytes(bytes, void 0, "signature");
    const { v: seqBytes, l: seqLeftBytes } = tlv.decode(48, data);
    if (seqLeftBytes.length)
      throw new E("invalid signature: left bytes after parsing");
    const { v: rBytes, l: rLeftBytes } = tlv.decode(2, seqBytes);
    const { v: sBytes, l: sLeftBytes } = tlv.decode(2, rLeftBytes);
    if (sLeftBytes.length)
      throw new E("invalid signature: left bytes after parsing");
    return { r: int.decode(rBytes), s: int.decode(sBytes) };
  },
  hexFromSig(sig) {
    const { _tlv: tlv, _int: int } = DER;
    const rs = tlv.encode(2, int.encode(sig.r));
    const ss = tlv.encode(2, int.encode(sig.s));
    const seq = rs + ss;
    return tlv.encode(48, seq);
  }
};
var _0n4 = BigInt(0);
var _1n4 = BigInt(1);
var _2n2 = BigInt(2);
var _3n2 = BigInt(3);
var _4n2 = BigInt(4);
function weierstrass(params, extraOpts = {}) {
  const validated = createCurveFields("weierstrass", params, extraOpts);
  const { Fp: Fp2, Fn: Fn2 } = validated;
  let CURVE = validated.CURVE;
  const { h: cofactor, n: CURVE_ORDER } = CURVE;
  validateObject(extraOpts, {}, {
    allowInfinityPoint: "boolean",
    clearCofactor: "function",
    isTorsionFree: "function",
    fromBytes: "function",
    toBytes: "function",
    endo: "object"
  });
  const { endo } = extraOpts;
  if (endo) {
    if (!Fp2.is0(CURVE.a) || typeof endo.beta !== "bigint" || !Array.isArray(endo.basises)) {
      throw new Error('invalid endo: expected "beta": bigint and "basises": array');
    }
  }
  const lengths = getWLengths(Fp2, Fn2);
  function assertCompressionIsSupported() {
    if (!Fp2.isOdd)
      throw new Error("compression is not supported: Field does not have .isOdd()");
  }
  function pointToBytes(_c, point, isCompressed) {
    const { x, y } = point.toAffine();
    const bx = Fp2.toBytes(x);
    abool(isCompressed, "isCompressed");
    if (isCompressed) {
      assertCompressionIsSupported();
      const hasEvenY = !Fp2.isOdd(y);
      return concatBytes(pprefix(hasEvenY), bx);
    } else {
      return concatBytes(Uint8Array.of(4), bx, Fp2.toBytes(y));
    }
  }
  function pointFromBytes(bytes) {
    abytes(bytes, void 0, "Point");
    const { publicKey: comp, publicKeyUncompressed: uncomp } = lengths;
    const length3 = bytes.length;
    const head = bytes[0];
    const tail = bytes.subarray(1);
    if (length3 === comp && (head === 2 || head === 3)) {
      const x = Fp2.fromBytes(tail);
      if (!Fp2.isValid(x))
        throw new Error("bad point: is not on curve, wrong x");
      const y2 = weierstrassEquation(x);
      let y;
      try {
        y = Fp2.sqrt(y2);
      } catch (sqrtError) {
        const err = sqrtError instanceof Error ? ": " + sqrtError.message : "";
        throw new Error("bad point: is not on curve, sqrt error" + err);
      }
      assertCompressionIsSupported();
      const evenY = Fp2.isOdd(y);
      const evenH = (head & 1) === 1;
      if (evenH !== evenY)
        y = Fp2.neg(y);
      return { x, y };
    } else if (length3 === uncomp && head === 4) {
      const L = Fp2.BYTES;
      const x = Fp2.fromBytes(tail.subarray(0, L));
      const y = Fp2.fromBytes(tail.subarray(L, L * 2));
      if (!isValidXY(x, y))
        throw new Error("bad point: is not on curve");
      return { x, y };
    } else {
      throw new Error(`bad point: got length ${length3}, expected compressed=${comp} or uncompressed=${uncomp}`);
    }
  }
  const encodePoint = extraOpts.toBytes || pointToBytes;
  const decodePoint = extraOpts.fromBytes || pointFromBytes;
  function weierstrassEquation(x) {
    const x2 = Fp2.sqr(x);
    const x3 = Fp2.mul(x2, x);
    return Fp2.add(Fp2.add(x3, Fp2.mul(x, CURVE.a)), CURVE.b);
  }
  function isValidXY(x, y) {
    const left = Fp2.sqr(y);
    const right = weierstrassEquation(x);
    return Fp2.eql(left, right);
  }
  if (!isValidXY(CURVE.Gx, CURVE.Gy))
    throw new Error("bad curve params: generator point");
  const _4a3 = Fp2.mul(Fp2.pow(CURVE.a, _3n2), _4n2);
  const _27b2 = Fp2.mul(Fp2.sqr(CURVE.b), BigInt(27));
  if (Fp2.is0(Fp2.add(_4a3, _27b2)))
    throw new Error("bad curve params: a or b");
  function acoord(title, n2, banZero = false) {
    if (!Fp2.isValid(n2) || banZero && Fp2.is0(n2))
      throw new Error(`bad point coordinate ${title}`);
    return n2;
  }
  function aprjpoint(other) {
    if (!(other instanceof Point))
      throw new Error("Weierstrass Point expected");
  }
  function splitEndoScalarN(k) {
    if (!endo || !endo.basises)
      throw new Error("no endo");
    return _splitEndoScalar(k, endo.basises, Fn2.ORDER);
  }
  const toAffineMemo = memoized((p2, iz) => {
    const { X, Y, Z } = p2;
    if (Fp2.eql(Z, Fp2.ONE))
      return { x: X, y: Y };
    const is0 = p2.is0();
    if (iz == null)
      iz = is0 ? Fp2.ONE : Fp2.inv(Z);
    const x = Fp2.mul(X, iz);
    const y = Fp2.mul(Y, iz);
    const zz = Fp2.mul(Z, iz);
    if (is0)
      return { x: Fp2.ZERO, y: Fp2.ZERO };
    if (!Fp2.eql(zz, Fp2.ONE))
      throw new Error("invZ was invalid");
    return { x, y };
  });
  const assertValidMemo = memoized((p2) => {
    if (p2.is0()) {
      if (extraOpts.allowInfinityPoint && !Fp2.is0(p2.Y))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x, y } = p2.toAffine();
    if (!Fp2.isValid(x) || !Fp2.isValid(y))
      throw new Error("bad point: x or y not field elements");
    if (!isValidXY(x, y))
      throw new Error("bad point: equation left != right");
    if (!p2.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return true;
  });
  function finishEndo(endoBeta, k1p, k2p, k1neg, k2neg) {
    k2p = new Point(Fp2.mul(k2p.X, endoBeta), k2p.Y, k2p.Z);
    k1p = negateCt(k1neg, k1p);
    k2p = negateCt(k2neg, k2p);
    return k1p.add(k2p);
  }
  class Point {
    // base / generator point
    static BASE = new Point(CURVE.Gx, CURVE.Gy, Fp2.ONE);
    // zero / infinity / identity point
    static ZERO = new Point(Fp2.ZERO, Fp2.ONE, Fp2.ZERO);
    // 0, 1, 0
    // math field
    static Fp = Fp2;
    // scalar field
    static Fn = Fn2;
    X;
    Y;
    Z;
    /** Does NOT validate if the point is valid. Use `.assertValidity()`. */
    constructor(X, Y, Z) {
      this.X = acoord("x", X);
      this.Y = acoord("y", Y, true);
      this.Z = acoord("z", Z);
      Object.freeze(this);
    }
    static CURVE() {
      return CURVE;
    }
    /** Does NOT validate if the point is valid. Use `.assertValidity()`. */
    static fromAffine(p2) {
      const { x, y } = p2 || {};
      if (!p2 || !Fp2.isValid(x) || !Fp2.isValid(y))
        throw new Error("invalid affine point");
      if (p2 instanceof Point)
        throw new Error("projective point not allowed");
      if (Fp2.is0(x) && Fp2.is0(y))
        return Point.ZERO;
      return new Point(x, y, Fp2.ONE);
    }
    static fromBytes(bytes) {
      const P = Point.fromAffine(decodePoint(abytes(bytes, void 0, "point")));
      P.assertValidity();
      return P;
    }
    static fromHex(hex) {
      return Point.fromBytes(hexToBytes(hex));
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     *
     * @param windowSize
     * @param isLazy true will defer table computation until the first multiplication
     * @returns
     */
    precompute(windowSize = 8, isLazy = true) {
      wnaf.createCache(this, windowSize);
      if (!isLazy)
        this.multiply(_3n2);
      return this;
    }
    // TODO: return `this`
    /** A point on curve is valid if it conforms to equation. */
    assertValidity() {
      assertValidMemo(this);
    }
    hasEvenY() {
      const { y } = this.toAffine();
      if (!Fp2.isOdd)
        throw new Error("Field doesn't support isOdd");
      return !Fp2.isOdd(y);
    }
    /** Compare one point to another. */
    equals(other) {
      aprjpoint(other);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const { X: X2, Y: Y2, Z: Z2 } = other;
      const U1 = Fp2.eql(Fp2.mul(X1, Z2), Fp2.mul(X2, Z1));
      const U2 = Fp2.eql(Fp2.mul(Y1, Z2), Fp2.mul(Y2, Z1));
      return U1 && U2;
    }
    /** Flips point to one corresponding to (x, -y) in Affine coordinates. */
    negate() {
      return new Point(this.X, Fp2.neg(this.Y), this.Z);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: a2, b } = CURVE;
      const b3 = Fp2.mul(b, _3n2);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      let X3 = Fp2.ZERO, Y3 = Fp2.ZERO, Z3 = Fp2.ZERO;
      let t0 = Fp2.mul(X1, X1);
      let t1 = Fp2.mul(Y1, Y1);
      let t2 = Fp2.mul(Z1, Z1);
      let t3 = Fp2.mul(X1, Y1);
      t3 = Fp2.add(t3, t3);
      Z3 = Fp2.mul(X1, Z1);
      Z3 = Fp2.add(Z3, Z3);
      X3 = Fp2.mul(a2, Z3);
      Y3 = Fp2.mul(b3, t2);
      Y3 = Fp2.add(X3, Y3);
      X3 = Fp2.sub(t1, Y3);
      Y3 = Fp2.add(t1, Y3);
      Y3 = Fp2.mul(X3, Y3);
      X3 = Fp2.mul(t3, X3);
      Z3 = Fp2.mul(b3, Z3);
      t2 = Fp2.mul(a2, t2);
      t3 = Fp2.sub(t0, t2);
      t3 = Fp2.mul(a2, t3);
      t3 = Fp2.add(t3, Z3);
      Z3 = Fp2.add(t0, t0);
      t0 = Fp2.add(Z3, t0);
      t0 = Fp2.add(t0, t2);
      t0 = Fp2.mul(t0, t3);
      Y3 = Fp2.add(Y3, t0);
      t2 = Fp2.mul(Y1, Z1);
      t2 = Fp2.add(t2, t2);
      t0 = Fp2.mul(t2, t3);
      X3 = Fp2.sub(X3, t0);
      Z3 = Fp2.mul(t2, t1);
      Z3 = Fp2.add(Z3, Z3);
      Z3 = Fp2.add(Z3, Z3);
      return new Point(X3, Y3, Z3);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(other) {
      aprjpoint(other);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const { X: X2, Y: Y2, Z: Z2 } = other;
      let X3 = Fp2.ZERO, Y3 = Fp2.ZERO, Z3 = Fp2.ZERO;
      const a2 = CURVE.a;
      const b3 = Fp2.mul(CURVE.b, _3n2);
      let t0 = Fp2.mul(X1, X2);
      let t1 = Fp2.mul(Y1, Y2);
      let t2 = Fp2.mul(Z1, Z2);
      let t3 = Fp2.add(X1, Y1);
      let t4 = Fp2.add(X2, Y2);
      t3 = Fp2.mul(t3, t4);
      t4 = Fp2.add(t0, t1);
      t3 = Fp2.sub(t3, t4);
      t4 = Fp2.add(X1, Z1);
      let t5 = Fp2.add(X2, Z2);
      t4 = Fp2.mul(t4, t5);
      t5 = Fp2.add(t0, t2);
      t4 = Fp2.sub(t4, t5);
      t5 = Fp2.add(Y1, Z1);
      X3 = Fp2.add(Y2, Z2);
      t5 = Fp2.mul(t5, X3);
      X3 = Fp2.add(t1, t2);
      t5 = Fp2.sub(t5, X3);
      Z3 = Fp2.mul(a2, t4);
      X3 = Fp2.mul(b3, t2);
      Z3 = Fp2.add(X3, Z3);
      X3 = Fp2.sub(t1, Z3);
      Z3 = Fp2.add(t1, Z3);
      Y3 = Fp2.mul(X3, Z3);
      t1 = Fp2.add(t0, t0);
      t1 = Fp2.add(t1, t0);
      t2 = Fp2.mul(a2, t2);
      t4 = Fp2.mul(b3, t4);
      t1 = Fp2.add(t1, t2);
      t2 = Fp2.sub(t0, t2);
      t2 = Fp2.mul(a2, t2);
      t4 = Fp2.add(t4, t2);
      t0 = Fp2.mul(t1, t4);
      Y3 = Fp2.add(Y3, t0);
      t0 = Fp2.mul(t5, t4);
      X3 = Fp2.mul(t3, X3);
      X3 = Fp2.sub(X3, t0);
      t0 = Fp2.mul(t3, t1);
      Z3 = Fp2.mul(t5, Z3);
      Z3 = Fp2.add(Z3, t0);
      return new Point(X3, Y3, Z3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    is0() {
      return this.equals(Point.ZERO);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(scalar) {
      const { endo: endo2 } = extraOpts;
      if (!Fn2.isValidNot0(scalar))
        throw new Error("invalid scalar: out of range");
      let point, fake;
      const mul = (n2) => wnaf.cached(this, n2, (p2) => normalizeZ(Point, p2));
      if (endo2) {
        const { k1neg, k1, k2neg, k2 } = splitEndoScalarN(scalar);
        const { p: k1p, f: k1f } = mul(k1);
        const { p: k2p, f: k2f } = mul(k2);
        fake = k1f.add(k2f);
        point = finishEndo(endo2.beta, k1p, k2p, k1neg, k2neg);
      } else {
        const { p: p2, f: f2 } = mul(scalar);
        point = p2;
        fake = f2;
      }
      return normalizeZ(Point, [point, fake])[0];
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed secret key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(sc) {
      const { endo: endo2 } = extraOpts;
      const p2 = this;
      if (!Fn2.isValid(sc))
        throw new Error("invalid scalar: out of range");
      if (sc === _0n4 || p2.is0())
        return Point.ZERO;
      if (sc === _1n4)
        return p2;
      if (wnaf.hasCache(this))
        return this.multiply(sc);
      if (endo2) {
        const { k1neg, k1, k2neg, k2 } = splitEndoScalarN(sc);
        const { p1, p2: p22 } = mulEndoUnsafe(Point, p2, k1, k2);
        return finishEndo(endo2.beta, p1, p22, k1neg, k2neg);
      } else {
        return wnaf.unsafe(p2, sc);
      }
    }
    /**
     * Converts Projective point to affine (x, y) coordinates.
     * @param invertedZ Z^-1 (inverted zero) - optional, precomputation is useful for invertBatch
     */
    toAffine(invertedZ) {
      return toAffineMemo(this, invertedZ);
    }
    /**
     * Checks whether Point is free of torsion elements (is in prime subgroup).
     * Always torsion-free for cofactor=1 curves.
     */
    isTorsionFree() {
      const { isTorsionFree } = extraOpts;
      if (cofactor === _1n4)
        return true;
      if (isTorsionFree)
        return isTorsionFree(Point, this);
      return wnaf.unsafe(this, CURVE_ORDER).is0();
    }
    clearCofactor() {
      const { clearCofactor } = extraOpts;
      if (cofactor === _1n4)
        return this;
      if (clearCofactor)
        return clearCofactor(Point, this);
      return this.multiplyUnsafe(cofactor);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(cofactor).is0();
    }
    toBytes(isCompressed = true) {
      abool(isCompressed, "isCompressed");
      this.assertValidity();
      return encodePoint(Point, this, isCompressed);
    }
    toHex(isCompressed = true) {
      return bytesToHex(this.toBytes(isCompressed));
    }
    toString() {
      return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
    }
  }
  const bits = Fn2.BITS;
  const wnaf = new wNAF(Point, extraOpts.endo ? Math.ceil(bits / 2) : bits);
  Point.BASE.precompute(8);
  return Point;
}
function pprefix(hasEvenY) {
  return Uint8Array.of(hasEvenY ? 2 : 3);
}
function getWLengths(Fp2, Fn2) {
  return {
    secretKey: Fn2.BYTES,
    publicKey: 1 + Fp2.BYTES,
    publicKeyUncompressed: 1 + 2 * Fp2.BYTES,
    publicKeyHasPrefix: true,
    signature: 2 * Fn2.BYTES
  };
}
function ecdh(Point, ecdhOpts = {}) {
  const { Fn: Fn2 } = Point;
  const randomBytes_ = ecdhOpts.randomBytes || randomBytes;
  const lengths = Object.assign(getWLengths(Point.Fp, Fn2), { seed: getMinHashLength(Fn2.ORDER) });
  function isValidSecretKey(secretKey) {
    try {
      const num = Fn2.fromBytes(secretKey);
      return Fn2.isValidNot0(num);
    } catch (error) {
      return false;
    }
  }
  function isValidPublicKey(publicKey, isCompressed) {
    const { publicKey: comp, publicKeyUncompressed } = lengths;
    try {
      const l2 = publicKey.length;
      if (isCompressed === true && l2 !== comp)
        return false;
      if (isCompressed === false && l2 !== publicKeyUncompressed)
        return false;
      return !!Point.fromBytes(publicKey);
    } catch (error) {
      return false;
    }
  }
  function randomSecretKey(seed = randomBytes_(lengths.seed)) {
    return mapHashToField(abytes(seed, lengths.seed, "seed"), Fn2.ORDER);
  }
  function getPublicKey(secretKey, isCompressed = true) {
    return Point.BASE.multiply(Fn2.fromBytes(secretKey)).toBytes(isCompressed);
  }
  function isProbPub(item) {
    const { secretKey, publicKey, publicKeyUncompressed } = lengths;
    if (!isBytes(item))
      return void 0;
    if ("_lengths" in Fn2 && Fn2._lengths || secretKey === publicKey)
      return void 0;
    const l2 = abytes(item, void 0, "key").length;
    return l2 === publicKey || l2 === publicKeyUncompressed;
  }
  function getSharedSecret(secretKeyA, publicKeyB, isCompressed = true) {
    if (isProbPub(secretKeyA) === true)
      throw new Error("first arg must be private key");
    if (isProbPub(publicKeyB) === false)
      throw new Error("second arg must be public key");
    const s2 = Fn2.fromBytes(secretKeyA);
    const b = Point.fromBytes(publicKeyB);
    return b.multiply(s2).toBytes(isCompressed);
  }
  const utils = {
    isValidSecretKey,
    isValidPublicKey,
    randomSecretKey
  };
  const keygen = createKeygen(randomSecretKey, getPublicKey);
  return Object.freeze({ getPublicKey, getSharedSecret, keygen, Point, utils, lengths });
}
function ecdsa(Point, hash, ecdsaOpts = {}) {
  ahash(hash);
  validateObject(ecdsaOpts, {}, {
    hmac: "function",
    lowS: "boolean",
    randomBytes: "function",
    bits2int: "function",
    bits2int_modN: "function"
  });
  ecdsaOpts = Object.assign({}, ecdsaOpts);
  const randomBytes4 = ecdsaOpts.randomBytes || randomBytes;
  const hmac3 = ecdsaOpts.hmac || ((key, msg) => hmac(hash, key, msg));
  const { Fp: Fp2, Fn: Fn2 } = Point;
  const { ORDER: CURVE_ORDER, BITS: fnBits } = Fn2;
  const { keygen, getPublicKey, getSharedSecret, utils, lengths } = ecdh(Point, ecdsaOpts);
  const defaultSigOpts = {
    prehash: true,
    lowS: typeof ecdsaOpts.lowS === "boolean" ? ecdsaOpts.lowS : true,
    format: "compact",
    extraEntropy: false
  };
  const hasLargeCofactor = CURVE_ORDER * _2n2 < Fp2.ORDER;
  function isBiggerThanHalfOrder(number) {
    const HALF = CURVE_ORDER >> _1n4;
    return number > HALF;
  }
  function validateRS(title, num) {
    if (!Fn2.isValidNot0(num))
      throw new Error(`invalid signature ${title}: out of range 1..Point.Fn.ORDER`);
    return num;
  }
  function assertSmallCofactor() {
    if (hasLargeCofactor)
      throw new Error('"recovered" sig type is not supported for cofactor >2 curves');
  }
  function validateSigLength(bytes, format2) {
    validateSigFormat(format2);
    const size = lengths.signature;
    const sizer = format2 === "compact" ? size : format2 === "recovered" ? size + 1 : void 0;
    return abytes(bytes, sizer);
  }
  class Signature {
    r;
    s;
    recovery;
    constructor(r2, s2, recovery) {
      this.r = validateRS("r", r2);
      this.s = validateRS("s", s2);
      if (recovery != null) {
        assertSmallCofactor();
        if (![0, 1, 2, 3].includes(recovery))
          throw new Error("invalid recovery id");
        this.recovery = recovery;
      }
      Object.freeze(this);
    }
    static fromBytes(bytes, format2 = defaultSigOpts.format) {
      validateSigLength(bytes, format2);
      let recid;
      if (format2 === "der") {
        const { r: r3, s: s3 } = DER.toSig(abytes(bytes));
        return new Signature(r3, s3);
      }
      if (format2 === "recovered") {
        recid = bytes[0];
        format2 = "compact";
        bytes = bytes.subarray(1);
      }
      const L = lengths.signature / 2;
      const r2 = bytes.subarray(0, L);
      const s2 = bytes.subarray(L, L * 2);
      return new Signature(Fn2.fromBytes(r2), Fn2.fromBytes(s2), recid);
    }
    static fromHex(hex, format2) {
      return this.fromBytes(hexToBytes(hex), format2);
    }
    assertRecovery() {
      const { recovery } = this;
      if (recovery == null)
        throw new Error("invalid recovery id: must be present");
      return recovery;
    }
    addRecoveryBit(recovery) {
      return new Signature(this.r, this.s, recovery);
    }
    recoverPublicKey(messageHash) {
      const { r: r2, s: s2 } = this;
      const recovery = this.assertRecovery();
      const radj = recovery === 2 || recovery === 3 ? r2 + CURVE_ORDER : r2;
      if (!Fp2.isValid(radj))
        throw new Error("invalid recovery id: sig.r+curve.n != R.x");
      const x = Fp2.toBytes(radj);
      const R = Point.fromBytes(concatBytes(pprefix((recovery & 1) === 0), x));
      const ir = Fn2.inv(radj);
      const h = bits2int_modN(abytes(messageHash, void 0, "msgHash"));
      const u1 = Fn2.create(-h * ir);
      const u2 = Fn2.create(s2 * ir);
      const Q = Point.BASE.multiplyUnsafe(u1).add(R.multiplyUnsafe(u2));
      if (Q.is0())
        throw new Error("invalid recovery: point at infinify");
      Q.assertValidity();
      return Q;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return isBiggerThanHalfOrder(this.s);
    }
    toBytes(format2 = defaultSigOpts.format) {
      validateSigFormat(format2);
      if (format2 === "der")
        return hexToBytes(DER.hexFromSig(this));
      const { r: r2, s: s2 } = this;
      const rb = Fn2.toBytes(r2);
      const sb = Fn2.toBytes(s2);
      if (format2 === "recovered") {
        assertSmallCofactor();
        return concatBytes(Uint8Array.of(this.assertRecovery()), rb, sb);
      }
      return concatBytes(rb, sb);
    }
    toHex(format2) {
      return bytesToHex(this.toBytes(format2));
    }
  }
  const bits2int = ecdsaOpts.bits2int || function bits2int_def(bytes) {
    if (bytes.length > 8192)
      throw new Error("input is too large");
    const num = bytesToNumberBE(bytes);
    const delta = bytes.length * 8 - fnBits;
    return delta > 0 ? num >> BigInt(delta) : num;
  };
  const bits2int_modN = ecdsaOpts.bits2int_modN || function bits2int_modN_def(bytes) {
    return Fn2.create(bits2int(bytes));
  };
  const ORDER_MASK = bitMask(fnBits);
  function int2octets(num) {
    aInRange("num < 2^" + fnBits, num, _0n4, ORDER_MASK);
    return Fn2.toBytes(num);
  }
  function validateMsgAndHash(message2, prehash) {
    abytes(message2, void 0, "message");
    return prehash ? abytes(hash(message2), void 0, "prehashed message") : message2;
  }
  function prepSig(message2, secretKey, opts) {
    const { lowS, prehash, extraEntropy } = validateSigOpts(opts, defaultSigOpts);
    message2 = validateMsgAndHash(message2, prehash);
    const h1int = bits2int_modN(message2);
    const d2 = Fn2.fromBytes(secretKey);
    if (!Fn2.isValidNot0(d2))
      throw new Error("invalid private key");
    const seedArgs = [int2octets(d2), int2octets(h1int)];
    if (extraEntropy != null && extraEntropy !== false) {
      const e2 = extraEntropy === true ? randomBytes4(lengths.secretKey) : extraEntropy;
      seedArgs.push(abytes(e2, void 0, "extraEntropy"));
    }
    const seed = concatBytes(...seedArgs);
    const m2 = h1int;
    function k2sig(kBytes) {
      const k = bits2int(kBytes);
      if (!Fn2.isValidNot0(k))
        return;
      const ik = Fn2.inv(k);
      const q = Point.BASE.multiply(k).toAffine();
      const r2 = Fn2.create(q.x);
      if (r2 === _0n4)
        return;
      const s2 = Fn2.create(ik * Fn2.create(m2 + r2 * d2));
      if (s2 === _0n4)
        return;
      let recovery = (q.x === r2 ? 0 : 2) | Number(q.y & _1n4);
      let normS = s2;
      if (lowS && isBiggerThanHalfOrder(s2)) {
        normS = Fn2.neg(s2);
        recovery ^= 1;
      }
      return new Signature(r2, normS, hasLargeCofactor ? void 0 : recovery);
    }
    return { seed, k2sig };
  }
  function sign(message2, secretKey, opts = {}) {
    const { seed, k2sig } = prepSig(message2, secretKey, opts);
    const drbg = createHmacDrbg(hash.outputLen, Fn2.BYTES, hmac3);
    const sig = drbg(seed, k2sig);
    return sig.toBytes(opts.format);
  }
  function verify(signature, message2, publicKey, opts = {}) {
    const { lowS, prehash, format: format2 } = validateSigOpts(opts, defaultSigOpts);
    publicKey = abytes(publicKey, void 0, "publicKey");
    message2 = validateMsgAndHash(message2, prehash);
    if (!isBytes(signature)) {
      const end = signature instanceof Signature ? ", use sig.toBytes()" : "";
      throw new Error("verify expects Uint8Array signature" + end);
    }
    validateSigLength(signature, format2);
    try {
      const sig = Signature.fromBytes(signature, format2);
      const P = Point.fromBytes(publicKey);
      if (lowS && sig.hasHighS())
        return false;
      const { r: r2, s: s2 } = sig;
      const h = bits2int_modN(message2);
      const is = Fn2.inv(s2);
      const u1 = Fn2.create(h * is);
      const u2 = Fn2.create(r2 * is);
      const R = Point.BASE.multiplyUnsafe(u1).add(P.multiplyUnsafe(u2));
      if (R.is0())
        return false;
      const v = Fn2.create(R.x);
      return v === r2;
    } catch (e2) {
      return false;
    }
  }
  function recoverPublicKey(signature, message2, opts = {}) {
    const { prehash } = validateSigOpts(opts, defaultSigOpts);
    message2 = validateMsgAndHash(message2, prehash);
    return Signature.fromBytes(signature, "recovered").recoverPublicKey(message2).toBytes();
  }
  return Object.freeze({
    keygen,
    getPublicKey,
    getSharedSecret,
    utils,
    lengths,
    Point,
    sign,
    verify,
    recoverPublicKey,
    Signature,
    hash
  });
}

// node_modules/@libp2p/crypto/node_modules/@noble/curves/secp256k1.js
var secp256k1_CURVE = {
  p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),
  n: BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),
  h: BigInt(1),
  a: BigInt(0),
  b: BigInt(7),
  Gx: BigInt("0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"),
  Gy: BigInt("0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8")
};
var secp256k1_ENDO = {
  beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
  basises: [
    [BigInt("0x3086d221a7d46bcde86c90e49284eb15"), -BigInt("0xe4437ed6010e88286f547fa90abfe4c3")],
    [BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), BigInt("0x3086d221a7d46bcde86c90e49284eb15")]
  ]
};
var _2n3 = /* @__PURE__ */ BigInt(2);
function sqrtMod(y) {
  const P = secp256k1_CURVE.p;
  const _3n5 = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
  const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
  const b2 = y * y * y % P;
  const b3 = b2 * b2 * y % P;
  const b6 = pow2(b3, _3n5, P) * b3 % P;
  const b9 = pow2(b6, _3n5, P) * b3 % P;
  const b11 = pow2(b9, _2n3, P) * b2 % P;
  const b22 = pow2(b11, _11n, P) * b11 % P;
  const b44 = pow2(b22, _22n, P) * b22 % P;
  const b88 = pow2(b44, _44n, P) * b44 % P;
  const b176 = pow2(b88, _88n, P) * b88 % P;
  const b220 = pow2(b176, _44n, P) * b44 % P;
  const b223 = pow2(b220, _3n5, P) * b3 % P;
  const t1 = pow2(b223, _23n, P) * b22 % P;
  const t2 = pow2(t1, _6n, P) * b2 % P;
  const root = pow2(t2, _2n3, P);
  if (!Fpk1.eql(Fpk1.sqr(root), y))
    throw new Error("Cannot find square root");
  return root;
}
var Fpk1 = Field(secp256k1_CURVE.p, { sqrt: sqrtMod });
var Pointk1 = /* @__PURE__ */ weierstrass(secp256k1_CURVE, {
  Fp: Fpk1,
  endo: secp256k1_ENDO
});
var secp256k1 = /* @__PURE__ */ ecdsa(Pointk1, sha2562);

// node_modules/@libp2p/crypto/dist/src/errors.js
var SigningError = class extends Error {
  constructor(message2 = "An error occurred while signing a message") {
    super(message2);
    this.name = "SigningError";
  }
};
var VerificationError = class extends Error {
  constructor(message2 = "An error occurred while verifying a message") {
    super(message2);
    this.name = "VerificationError";
  }
};

// node_modules/@libp2p/crypto/dist/src/keys/secp256k1/index.js
function hashAndSign4(key, msg, options) {
  options?.signal?.throwIfAborted();
  const hash = import_node_crypto2.default.createHash("sha256");
  if (msg instanceof Uint8Array) {
    hash.update(msg);
  } else {
    for (const buf of msg) {
      hash.update(buf);
    }
  }
  const digest3 = hash.digest();
  try {
    return secp256k1.sign(digest3, key, {
      prehash: false,
      format: "der"
    });
  } catch (err) {
    throw new SigningError(String(err));
  }
}
function hashAndVerify4(key, sig, msg, options) {
  options?.signal?.throwIfAborted();
  const hash = import_node_crypto2.default.createHash("sha256");
  if (msg instanceof Uint8Array) {
    hash.update(msg);
  } else {
    for (const buf of msg) {
      hash.update(buf);
    }
  }
  const digest3 = hash.digest();
  try {
    return secp256k1.verify(sig, digest3, key, {
      prehash: false,
      format: "der"
    });
  } catch (err) {
    throw new VerificationError(String(err));
  }
}

// node_modules/@libp2p/crypto/dist/src/keys/secp256k1/secp256k1.js
var Secp256k1PublicKey = class {
  type = "secp256k1";
  raw;
  _key;
  constructor(key) {
    this._key = validateSecp256k1PublicKey(key);
    this.raw = compressSecp256k1PublicKey(this._key);
  }
  toMultihash() {
    return identity.digest(publicKeyToProtobuf(this));
  }
  toCID() {
    return CID.createV1(114, this.toMultihash());
  }
  toString() {
    return base58btc.encode(this.toMultihash().bytes).substring(1);
  }
  equals(key) {
    if (key == null || !(key.raw instanceof Uint8Array)) {
      return false;
    }
    return equals3(this.raw, key.raw);
  }
  verify(data, sig, options) {
    return hashAndVerify4(this._key, sig, data, options);
  }
};
var Secp256k1PrivateKey = class {
  type = "secp256k1";
  raw;
  publicKey;
  constructor(key, publicKey) {
    this.raw = validateSecp256k1PrivateKey(key);
    this.publicKey = new Secp256k1PublicKey(publicKey ?? computeSecp256k1PublicKey(key));
  }
  equals(key) {
    if (key == null || !(key.raw instanceof Uint8Array)) {
      return false;
    }
    return equals3(this.raw, key.raw);
  }
  sign(message2, options) {
    return hashAndSign4(this.raw, message2, options);
  }
};

// node_modules/@libp2p/crypto/dist/src/keys/secp256k1/utils.js
function unmarshalSecp256k1PublicKey(bytes) {
  return new Secp256k1PublicKey(bytes);
}
async function generateSecp256k1KeyPair() {
  const privateKeyBytes = generateSecp256k1PrivateKey();
  return new Secp256k1PrivateKey(privateKeyBytes);
}
function compressSecp256k1PublicKey(key) {
  return secp256k1.Point.fromBytes(key).toBytes();
}
function validateSecp256k1PrivateKey(key) {
  try {
    secp256k1.getPublicKey(key, true);
    return key;
  } catch (err) {
    throw new InvalidPrivateKeyError(String(err));
  }
}
function validateSecp256k1PublicKey(key) {
  try {
    secp256k1.Point.fromBytes(key);
    return key;
  } catch (err) {
    throw new InvalidPublicKeyError(String(err));
  }
}
function computeSecp256k1PublicKey(privateKey) {
  try {
    return secp256k1.getPublicKey(privateKey, true);
  } catch (err) {
    throw new InvalidPrivateKeyError(String(err));
  }
}
function generateSecp256k1PrivateKey() {
  return secp256k1.utils.randomSecretKey();
}

// node_modules/@libp2p/crypto/dist/src/keys/index.js
async function generateKeyPair(type, bits) {
  if (type === "Ed25519") {
    return generateEd25519KeyPair();
  }
  if (type === "secp256k1") {
    return generateSecp256k1KeyPair();
  }
  if (type === "RSA") {
    return generateRSAKeyPair(toBits(bits));
  }
  if (type === "ECDSA") {
    return generateECDSAKeyPair(toCurve(bits));
  }
  throw new UnsupportedKeyTypeError();
}
function publicKeyFromProtobuf(buf, digest3) {
  const { Type, Data } = PublicKey.decode(buf);
  const data = Data ?? new Uint8Array();
  switch (Type) {
    case KeyType.RSA:
      return pkixToRSAPublicKey(data, digest3);
    case KeyType.Ed25519:
      return unmarshalEd25519PublicKey(data);
    case KeyType.secp256k1:
      return unmarshalSecp256k1PublicKey(data);
    case KeyType.ECDSA:
      return unmarshalECDSAPublicKey(data);
    default:
      throw new UnsupportedKeyTypeError();
  }
}
function publicKeyFromMultihash(digest3) {
  const { Type, Data } = PublicKey.decode(digest3.digest);
  const data = Data ?? new Uint8Array();
  switch (Type) {
    case KeyType.Ed25519:
      return unmarshalEd25519PublicKey(data);
    case KeyType.secp256k1:
      return unmarshalSecp256k1PublicKey(data);
    case KeyType.ECDSA:
      return unmarshalECDSAPublicKey(data);
    default:
      throw new UnsupportedKeyTypeError();
  }
}
function publicKeyToProtobuf(key) {
  return PublicKey.encode({
    Type: KeyType[key.type],
    Data: key.raw
  });
}
function toBits(bits) {
  if (bits == null) {
    return 2048;
  }
  return parseInt(bits, 10);
}
function toCurve(curve) {
  if (curve === "P-256" || curve == null) {
    return "P-256";
  }
  if (curve === "P-384") {
    return "P-384";
  }
  if (curve === "P-521") {
    return "P-521";
  }
  throw new InvalidParametersError("Unsupported curve, should be P-256, P-384 or P-521");
}

// node_modules/@libp2p/interface/dist/src/connection.js
var connectionSymbol = Symbol.for("@libp2p/connection");

// node_modules/@libp2p/interface/dist/src/content-routing.js
var contentRoutingSymbol = Symbol.for("@libp2p/content-routing");

// node_modules/@libp2p/interface/dist/src/peer-discovery.js
var peerDiscoverySymbol = Symbol.for("@libp2p/peer-discovery");

// node_modules/@libp2p/interface/dist/src/peer-id.js
var peerIdSymbol = Symbol.for("@libp2p/peer-id");
function isPeerId(other) {
  return Boolean(other?.[peerIdSymbol]);
}

// node_modules/@libp2p/interface/dist/src/peer-routing.js
var peerRoutingSymbol = Symbol.for("@libp2p/peer-routing");

// node_modules/@libp2p/interface/dist/src/peer-store.js
var KEEP_ALIVE = "keep-alive";

// node_modules/@libp2p/interface/dist/src/transport.js
var transportSymbol = Symbol.for("@libp2p/transport");
var FaultTolerance;
(function(FaultTolerance2) {
  FaultTolerance2[FaultTolerance2["FATAL_ALL"] = 0] = "FATAL_ALL";
  FaultTolerance2[FaultTolerance2["NO_FATAL"] = 1] = "NO_FATAL";
})(FaultTolerance || (FaultTolerance = {}));

// node_modules/@libp2p/interface/dist/src/errors.js
var AbortError = class extends Error {
  static name = "AbortError";
  constructor(message2 = "The operation was aborted") {
    super(message2);
    this.name = "AbortError";
  }
};
var UnexpectedPeerError = class extends Error {
  static name = "UnexpectedPeerError";
  constructor(message2 = "Unexpected Peer") {
    super(message2);
    this.name = "UnexpectedPeerError";
  }
};
var InvalidCryptoExchangeError = class extends Error {
  static name = "InvalidCryptoExchangeError";
  constructor(message2 = "Invalid crypto exchange") {
    super(message2);
    this.name = "InvalidCryptoExchangeError";
  }
};
var InvalidParametersError2 = class extends Error {
  static name = "InvalidParametersError";
  constructor(message2 = "Invalid parameters") {
    super(message2);
    this.name = "InvalidParametersError";
  }
};
var ConnectionClosingError = class extends Error {
  static name = "ConnectionClosingError";
  constructor(message2 = "The connection is closing") {
    super(message2);
    this.name = "ConnectionClosingError";
  }
};
var ConnectionClosedError = class extends Error {
  static name = "ConnectionClosedError";
  constructor(message2 = "The connection is closed") {
    super(message2);
    this.name = "ConnectionClosedError";
  }
};
var ConnectionFailedError = class extends Error {
  static name = "ConnectionFailedError";
  constructor(message2 = "Connection failed") {
    super(message2);
    this.name = "ConnectionFailedError";
  }
};
var MuxerClosedError = class extends Error {
  static name = "MuxerClosedError";
  constructor(message2 = "The muxer is closed") {
    super(message2);
    this.name = "MuxerClosedError";
  }
};
var StreamResetError = class extends Error {
  static name = "StreamResetError";
  constructor(message2 = "The stream has been reset") {
    super(message2);
    this.name = "StreamResetError";
  }
};
var StreamStateError = class extends Error {
  static name = "StreamStateError";
  constructor(message2 = "The stream is in an invalid state") {
    super(message2);
    this.name = "StreamStateError";
  }
};
var NotFoundError = class extends Error {
  static name = "NotFoundError";
  constructor(message2 = "Not found") {
    super(message2);
    this.name = "NotFoundError";
  }
};
var InvalidPeerIdError = class extends Error {
  static name = "InvalidPeerIdError";
  constructor(message2 = "Invalid PeerID") {
    super(message2);
    this.name = "InvalidPeerIdError";
  }
};
var InvalidMultiaddrError = class extends Error {
  static name = "InvalidMultiaddrError";
  constructor(message2 = "Invalid multiaddr") {
    super(message2);
    this.name = "InvalidMultiaddrError";
  }
};
var InvalidCIDError = class extends Error {
  static name = "InvalidCIDError";
  constructor(message2 = "Invalid CID") {
    super(message2);
    this.name = "InvalidCIDError";
  }
};
var InvalidMultihashError = class extends Error {
  static name = "InvalidMultihashError";
  constructor(message2 = "Invalid Multihash") {
    super(message2);
    this.name = "InvalidMultihashError";
  }
};
var UnsupportedProtocolError = class extends Error {
  static name = "UnsupportedProtocolError";
  constructor(message2 = "Unsupported protocol error") {
    super(message2);
    this.name = "UnsupportedProtocolError";
  }
};
var InvalidMessageError = class extends Error {
  static name = "InvalidMessageError";
  constructor(message2 = "Invalid message") {
    super(message2);
    this.name = "InvalidMessageError";
  }
};
var TimeoutError = class extends Error {
  static name = "TimeoutError";
  constructor(message2 = "Timed out") {
    super(message2);
    this.name = "TimeoutError";
  }
};
var NotStartedError = class extends Error {
  static name = "NotStartedError";
  constructor(message2 = "Not started") {
    super(message2);
    this.name = "NotStartedError";
  }
};
var DialError = class extends Error {
  static name = "DialError";
  constructor(message2 = "Dial error") {
    super(message2);
    this.name = "DialError";
  }
};
var LimitedConnectionError = class extends Error {
  static name = "LimitedConnectionError";
  constructor(message2 = "Limited connection") {
    super(message2);
    this.name = "LimitedConnectionError";
  }
};
var TooManyInboundProtocolStreamsError = class extends Error {
  static name = "TooManyInboundProtocolStreamsError";
  constructor(message2 = "Too many inbound protocol streams") {
    super(message2);
    this.name = "TooManyInboundProtocolStreamsError";
  }
};
var TooManyOutboundProtocolStreamsError = class extends Error {
  static name = "TooManyOutboundProtocolStreamsError";
  constructor(message2 = "Too many outbound protocol streams") {
    super(message2);
    this.name = "TooManyOutboundProtocolStreamsError";
  }
};
var UnsupportedKeyTypeError2 = class extends Error {
  static name = "UnsupportedKeyTypeError";
  constructor(message2 = "Unsupported key type") {
    super(message2);
    this.name = "UnsupportedKeyTypeError";
  }
};

// node_modules/@libp2p/interface/dist/src/startable.js
function isStartable(obj) {
  return obj != null && typeof obj.start === "function" && typeof obj.stop === "function";
}
async function start(...objs) {
  const startables = [];
  for (const obj of objs) {
    if (isStartable(obj)) {
      startables.push(obj);
    }
  }
  await Promise.all(startables.map(async (s2) => {
    if (s2.beforeStart != null) {
      await s2.beforeStart();
    }
  }));
  await Promise.all(startables.map(async (s2) => {
    await s2.start();
  }));
  await Promise.all(startables.map(async (s2) => {
    if (s2.afterStart != null) {
      await s2.afterStart();
    }
  }));
}
async function stop(...objs) {
  const startables = [];
  for (const obj of objs) {
    if (isStartable(obj)) {
      startables.push(obj);
    }
  }
  await Promise.all(startables.map(async (s2) => {
    if (s2.beforeStop != null) {
      await s2.beforeStop();
    }
  }));
  await Promise.all(startables.map(async (s2) => {
    await s2.stop();
  }));
  await Promise.all(startables.map(async (s2) => {
    if (s2.afterStop != null) {
      await s2.afterStop();
    }
  }));
}

// node_modules/@libp2p/interface/dist/src/index.js
var serviceCapabilities = Symbol.for("@libp2p/service-capabilities");
var serviceDependencies = Symbol.for("@libp2p/service-dependencies");

// node_modules/@libp2p/peer-id/dist/src/peer-id.js
var inspect = Symbol.for("nodejs.util.inspect.custom");
var LIBP2P_KEY_CODE = 114;
var PeerIdImpl = class {
  type;
  multihash;
  publicKey;
  string;
  constructor(init2) {
    this.type = init2.type;
    this.multihash = init2.multihash;
    Object.defineProperty(this, "string", {
      enumerable: false,
      writable: true
    });
  }
  get [Symbol.toStringTag]() {
    return `PeerId(${this.toString()})`;
  }
  [peerIdSymbol] = true;
  toString() {
    if (this.string == null) {
      this.string = base58btc.encode(this.multihash.bytes).slice(1);
    }
    return this.string;
  }
  toMultihash() {
    return this.multihash;
  }
  // return self-describing String representation
  // in default format from RFC 0001: https://github.com/libp2p/specs/pull/209
  toCID() {
    return CID.createV1(LIBP2P_KEY_CODE, this.multihash);
  }
  toJSON() {
    return this.toString();
  }
  /**
   * Checks the equality of `this` peer against a given PeerId
   */
  equals(id) {
    if (id == null) {
      return false;
    }
    if (id instanceof Uint8Array) {
      return equals3(this.multihash.bytes, id);
    } else if (typeof id === "string") {
      return this.toString() === id;
    } else if (id?.toMultihash()?.bytes != null) {
      return equals3(this.multihash.bytes, id.toMultihash().bytes);
    } else {
      throw new Error("not valid Id");
    }
  }
  /**
   * Returns PeerId as a human-readable string
   * https://nodejs.org/api/util.html#utilinspectcustom
   *
   * @example
   * ```TypeScript
   * import { peerIdFromString } from '@libp2p/peer-id'
   *
   * console.info(peerIdFromString('QmFoo'))
   * // 'PeerId(QmFoo)'
   * ```
   */
  [inspect]() {
    return `PeerId(${this.toString()})`;
  }
};
var RSAPeerId = class extends PeerIdImpl {
  type = "RSA";
  publicKey;
  constructor(init2) {
    super({ ...init2, type: "RSA" });
    this.publicKey = init2.publicKey;
  }
};
var Ed25519PeerId = class extends PeerIdImpl {
  type = "Ed25519";
  publicKey;
  constructor(init2) {
    super({ ...init2, type: "Ed25519" });
    this.publicKey = init2.publicKey;
  }
};
var Secp256k1PeerId = class extends PeerIdImpl {
  type = "secp256k1";
  publicKey;
  constructor(init2) {
    super({ ...init2, type: "secp256k1" });
    this.publicKey = init2.publicKey;
  }
};
var TRANSPORT_IPFS_GATEWAY_HTTP_CODE = 2336;
var URLPeerId = class {
  type = "url";
  multihash;
  publicKey;
  url;
  constructor(url) {
    this.url = url.toString();
    this.multihash = identity.digest(fromString2(this.url));
  }
  [inspect]() {
    return `PeerId(${this.url})`;
  }
  [peerIdSymbol] = true;
  toString() {
    return this.toCID().toString();
  }
  toMultihash() {
    return this.multihash;
  }
  toCID() {
    return CID.createV1(TRANSPORT_IPFS_GATEWAY_HTTP_CODE, this.toMultihash());
  }
  toJSON() {
    return this.toString();
  }
  equals(other) {
    if (other == null) {
      return false;
    }
    if (other instanceof Uint8Array) {
      other = toString2(other);
    }
    return other.toString() === this.toString();
  }
};

// node_modules/@libp2p/peer-id/dist/src/index.js
var LIBP2P_KEY_CODE2 = 114;
var TRANSPORT_IPFS_GATEWAY_HTTP_CODE2 = 2336;
function peerIdFromString(str, decoder) {
  let multihash;
  if (str.charAt(0) === "1" || str.charAt(0) === "Q") {
    multihash = decode4(base58btc.decode(`z${str}`));
  } else if (str.startsWith("k51qzi5uqu5") || str.startsWith("kzwfwjn5ji4") || str.startsWith("k2k4r8") || str.startsWith("bafz")) {
    return peerIdFromCID(CID.parse(str));
  } else {
    if (decoder == null) {
      throw new InvalidParametersError2('Please pass a multibase decoder for strings that do not start with "1" or "Q"');
    }
    multihash = decode4(decoder.decode(str));
  }
  return peerIdFromMultihash(multihash);
}
function peerIdFromPublicKey(publicKey) {
  if (publicKey.type === "Ed25519") {
    return new Ed25519PeerId({
      multihash: publicKey.toCID().multihash,
      publicKey
    });
  } else if (publicKey.type === "secp256k1") {
    return new Secp256k1PeerId({
      multihash: publicKey.toCID().multihash,
      publicKey
    });
  } else if (publicKey.type === "RSA") {
    return new RSAPeerId({
      multihash: publicKey.toCID().multihash,
      publicKey
    });
  }
  throw new UnsupportedKeyTypeError2();
}
function peerIdFromPrivateKey(privateKey) {
  return peerIdFromPublicKey(privateKey.publicKey);
}
function peerIdFromMultihash(multihash) {
  if (isSha256Multihash(multihash)) {
    return new RSAPeerId({ multihash });
  } else if (isIdentityMultihash(multihash)) {
    try {
      const publicKey = publicKeyFromMultihash(multihash);
      if (publicKey.type === "Ed25519") {
        return new Ed25519PeerId({ multihash, publicKey });
      } else if (publicKey.type === "secp256k1") {
        return new Secp256k1PeerId({ multihash, publicKey });
      }
    } catch (err) {
      const url = toString2(multihash.digest);
      return new URLPeerId(new URL(url));
    }
  }
  throw new InvalidMultihashError("Supplied PeerID Multihash is invalid");
}
function peerIdFromCID(cid) {
  if (cid?.multihash == null || cid.version == null || cid.version === 1 && cid.code !== LIBP2P_KEY_CODE2 && cid.code !== TRANSPORT_IPFS_GATEWAY_HTTP_CODE2) {
    throw new InvalidCIDError("Supplied PeerID CID is invalid");
  }
  if (cid.code === TRANSPORT_IPFS_GATEWAY_HTTP_CODE2) {
    const url = toString2(cid.multihash.digest);
    return new URLPeerId(new URL(url));
  }
  return peerIdFromMultihash(cid.multihash);
}
function isIdentityMultihash(multihash) {
  return multihash.code === identity.code;
}
function isSha256Multihash(multihash) {
  return multihash.code === sha256.code;
}

// node_modules/is-plain-obj/index.js
function isPlainObject(value2) {
  if (typeof value2 !== "object" || value2 === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value2);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value2) && !(Symbol.iterator in value2);
}

// node_modules/@libp2p/utils/dist/src/merge-options.js
var { hasOwnProperty } = Object.prototype;
var { propertyIsEnumerable } = Object;
var defineProperty = (object, name3, value2) => {
  Object.defineProperty(object, name3, {
    value: value2,
    writable: true,
    enumerable: true,
    configurable: true
  });
};
var globalThis2 = void 0;
var defaultMergeOptions = {
  concatArrays: false,
  ignoreUndefined: false
};
var getEnumerableOwnPropertyKeys = (value2) => {
  const keys = [];
  for (const key in value2) {
    if (hasOwnProperty.call(value2, key)) {
      keys.push(key);
    }
  }
  if (Object.getOwnPropertySymbols) {
    const symbols = Object.getOwnPropertySymbols(value2);
    for (const symbol3 of symbols) {
      if (propertyIsEnumerable.call(value2, symbol3)) {
        keys.push(symbol3);
      }
    }
  }
  return keys;
};
function clone(value2) {
  if (Array.isArray(value2)) {
    return cloneArray(value2);
  }
  if (isPlainObject(value2)) {
    return cloneOptionObject(value2);
  }
  return value2;
}
function cloneArray(array) {
  const result = array.slice(0, 0);
  getEnumerableOwnPropertyKeys(array).forEach((key) => {
    defineProperty(result, key, clone(array[key]));
  });
  return result;
}
function cloneOptionObject(object) {
  const result = Object.getPrototypeOf(object) === null ? /* @__PURE__ */ Object.create(null) : {};
  getEnumerableOwnPropertyKeys(object).forEach((key) => {
    defineProperty(result, key, clone(object[key]));
  });
  return result;
}
var mergeKeys = (merged, source, keys, config) => {
  keys.forEach((key) => {
    if (typeof source[key] === "undefined" && config.ignoreUndefined) {
      return;
    }
    if (key in merged && merged[key] !== Object.getPrototypeOf(merged)) {
      defineProperty(merged, key, merge(merged[key], source[key], config));
    } else {
      defineProperty(merged, key, clone(source[key]));
    }
  });
  return merged;
};
var concatArrays = (merged, source, config) => {
  let result = merged.slice(0, 0);
  let resultIndex = 0;
  [merged, source].forEach((array) => {
    const indices = [];
    for (let k = 0; k < array.length; k++) {
      if (!hasOwnProperty.call(array, k)) {
        continue;
      }
      indices.push(String(k));
      if (array === merged) {
        defineProperty(result, resultIndex++, array[k]);
      } else {
        defineProperty(result, resultIndex++, clone(array[k]));
      }
    }
    result = mergeKeys(result, array, getEnumerableOwnPropertyKeys(array).filter((key) => !indices.includes(key)), config);
  });
  return result;
};
function merge(merged, source, config) {
  if (config.concatArrays && Array.isArray(merged) && Array.isArray(source)) {
    return concatArrays(merged, source, config);
  }
  if (!isPlainObject(source) || !isPlainObject(merged)) {
    return clone(source);
  }
  return mergeKeys(merged, source, getEnumerableOwnPropertyKeys(source), config);
}
function mergeOptions(...options) {
  const config = merge(clone(defaultMergeOptions), this !== globalThis2 && this || {}, defaultMergeOptions);
  let merged = { _: {} };
  for (const option of options) {
    if (option === void 0) {
      continue;
    }
    if (!isPlainObject(option)) {
      throw new TypeError("`" + option + "` is not an Option Object");
    }
    merged = merge(merged, { _: option }, config);
  }
  return merged._;
}

// node_modules/progress-events/dist/src/index.js
var CustomProgressEvent = class extends Event {
  type;
  detail;
  constructor(type, detail) {
    super(type);
    this.type = type;
    this.detail = detail;
  }
};

// node_modules/@multiformats/dns/dist/src/errors.js
var DNSQueryFailedError = class extends AggregateError {
  static name = "DNSQueryFailedError";
  name = "DNSQueryFailedError";
};

// node_modules/@multiformats/dns/dist/src/resolvers/default.js
var import_promises = require("dns/promises");

// node_modules/@multiformats/dns/dist/src/utils/get-types.js
function getTypes(types) {
  const DEFAULT_TYPES = [
    RecordType.A
  ];
  if (types == null) {
    return DEFAULT_TYPES;
  }
  if (Array.isArray(types)) {
    if (types.length === 0) {
      return DEFAULT_TYPES;
    }
    return types;
  }
  return [
    types
  ];
}

// node_modules/@multiformats/dns/dist/src/utils/to-dns-response.js
var DEFAULT_TTL = 60;
function toDNSResponse(obj) {
  return {
    Status: obj.Status ?? 0,
    TC: obj.TC ?? obj.flag_tc ?? false,
    RD: obj.RD ?? obj.flag_rd ?? false,
    RA: obj.RA ?? obj.flag_ra ?? false,
    AD: obj.AD ?? obj.flag_ad ?? false,
    CD: obj.CD ?? obj.flag_cd ?? false,
    Question: (obj.Question ?? obj.questions ?? []).map((question) => {
      return {
        name: question.name,
        type: RecordType[question.type]
      };
    }),
    Answer: (obj.Answer ?? obj.answers ?? []).map((answer) => {
      return {
        name: answer.name,
        type: RecordType[answer.type],
        TTL: answer.TTL ?? answer.ttl ?? DEFAULT_TTL,
        data: answer.data instanceof Uint8Array ? toString2(answer.data) : answer.data
      };
    })
  };
}

// node_modules/@multiformats/dns/dist/src/resolvers/default.js
var nodeResolver = async (fqdn, options = {}) => {
  const resolver = new import_promises.Resolver();
  const listener = () => {
    resolver.cancel();
  };
  const types = getTypes(options.types);
  try {
    options.signal?.addEventListener("abort", listener);
    const answers = await Promise.all(types.map(async (type) => {
      if (type === RecordType.A) {
        return mapToAnswers(fqdn, type, await resolver.resolve4(fqdn));
      }
      if (type === RecordType.CNAME) {
        return mapToAnswers(fqdn, type, await resolver.resolveCname(fqdn));
      }
      if (type === RecordType.TXT) {
        return mapToAnswers(fqdn, type, await resolver.resolveTxt(fqdn));
      }
      if (type === RecordType.AAAA) {
        return mapToAnswers(fqdn, type, await resolver.resolve6(fqdn));
      }
      throw new TypeError("Unsupported DNS record type");
    }));
    return toDNSResponse({
      Question: types.map((type) => ({
        name: fqdn,
        type
      })),
      Answer: answers.flat()
    });
  } finally {
    options.signal?.removeEventListener("abort", listener);
  }
};
function defaultResolver() {
  return [
    nodeResolver
  ];
}
function mapToAnswer(name3, type, data) {
  return {
    name: name3,
    type,
    data
  };
}
function mapToAnswers(name3, type, data) {
  if (!Array.isArray(data)) {
    data = [data];
  }
  return data.map((data2) => {
    if (Array.isArray(data2)) {
      return data2.map((data3) => mapToAnswer(name3, type, data3));
    }
    return mapToAnswer(name3, type, data2);
  }).flat();
}

// node_modules/@multiformats/dns/dist/src/utils/cache.js
var import_hashlru = __toESM(require_hashlru(), 1);
var CachedAnswers = class {
  lru;
  constructor(maxSize) {
    this.lru = (0, import_hashlru.default)(maxSize);
  }
  get(fqdn, types) {
    let foundAllAnswers = true;
    const answers = [];
    for (const type of types) {
      const cached = this.getAnswers(fqdn, type);
      if (cached.length === 0) {
        foundAllAnswers = false;
        break;
      }
      answers.push(...cached);
    }
    if (foundAllAnswers) {
      return toDNSResponse({ answers });
    }
  }
  getAnswers(domain, type) {
    const key = `${domain.toLowerCase()}-${type}`;
    const answers = this.lru.get(key);
    if (answers != null) {
      const cachedAnswers = answers.filter((entry) => {
        return entry.expires > Date.now();
      }).map(({ expires, value: value2 }) => ({
        ...value2,
        TTL: Math.round((expires - Date.now()) / 1e3),
        type: RecordType[value2.type]
      }));
      if (cachedAnswers.length === 0) {
        this.lru.remove(key);
      }
      return cachedAnswers;
    }
    return [];
  }
  add(domain, answer) {
    const key = `${domain.toLowerCase()}-${answer.type}`;
    const answers = this.lru.get(key) ?? [];
    answers.push({
      expires: Date.now() + (answer.TTL ?? DEFAULT_TTL) * 1e3,
      value: answer
    });
    this.lru.set(key, answers);
  }
  remove(domain, type) {
    const key = `${domain.toLowerCase()}-${type}`;
    this.lru.remove(key);
  }
  clear() {
    this.lru.clear();
  }
};
function cache2(size) {
  return new CachedAnswers(size);
}

// node_modules/@multiformats/dns/dist/src/dns.js
var DEFAULT_ANSWER_CACHE_SIZE = 1e3;
var DNS = class {
  resolvers;
  cache;
  constructor(init2) {
    this.resolvers = {};
    this.cache = cache2(init2.cacheSize ?? DEFAULT_ANSWER_CACHE_SIZE);
    Object.entries(init2.resolvers ?? {}).forEach(([tld, resolver]) => {
      if (!Array.isArray(resolver)) {
        resolver = [resolver];
      }
      if (!tld.endsWith(".")) {
        tld = `${tld}.`;
      }
      this.resolvers[tld] = resolver;
    });
    if (this.resolvers["."] == null) {
      this.resolvers["."] = defaultResolver();
    }
  }
  /**
   * Queries DNS resolvers for the passed record types for the passed domain.
   *
   * If cached records exist for all desired types they will be returned
   * instead.
   *
   * Any new responses will be added to the cache for subsequent requests.
   */
  async query(domain, options = {}) {
    const types = getTypes(options.types);
    const cached = options.cached !== false ? this.cache.get(domain, types) : void 0;
    if (cached != null) {
      options.onProgress?.(new CustomProgressEvent("dns:cache", cached));
      return cached;
    }
    const tld = `${domain.split(".").pop()}.`;
    const resolvers2 = (this.resolvers[tld] ?? this.resolvers["."]).sort(() => {
      return Math.random() > 0.5 ? -1 : 1;
    });
    const errors = [];
    for (const resolver of resolvers2) {
      if (options.signal?.aborted === true) {
        break;
      }
      try {
        const result = await resolver(domain, {
          ...options,
          types
        });
        for (const answer of result.Answer) {
          this.cache.add(domain, answer);
        }
        return result;
      } catch (err) {
        errors.push(err);
        options.onProgress?.(new CustomProgressEvent("dns:error", err));
      }
    }
    throw new DNSQueryFailedError(errors, `DNS lookup of ${domain} ${types} failed`);
  }
};

// node_modules/@multiformats/dns/dist/src/index.js
var RecordType;
(function(RecordType2) {
  RecordType2[RecordType2["A"] = 1] = "A";
  RecordType2[RecordType2["CNAME"] = 5] = "CNAME";
  RecordType2[RecordType2["TXT"] = 16] = "TXT";
  RecordType2[RecordType2["AAAA"] = 28] = "AAAA";
})(RecordType || (RecordType = {}));
function dns(init2 = {}) {
  return new DNS(init2);
}

// node_modules/@multiformats/multiaddr/dist/src/errors.js
var InvalidMultiaddrError2 = class extends Error {
  static name = "InvalidMultiaddrError";
  name = "InvalidMultiaddrError";
};
var ValidationError = class extends Error {
  static name = "ValidationError";
  name = "ValidationError";
};
var InvalidParametersError3 = class extends Error {
  static name = "InvalidParametersError";
  name = "InvalidParametersError";
};
var UnknownProtocolError = class extends Error {
  static name = "UnknownProtocolError";
  name = "UnknownProtocolError";
};

// node_modules/@chainsafe/is-ip/lib/is-ip.node.js
var import_node_net = require("node:net");

// node_modules/@multiformats/multiaddr/dist/src/constants.js
var CODE_IP4 = 4;
var CODE_TCP = 6;
var CODE_UDP = 273;
var CODE_DCCP = 33;
var CODE_IP6 = 41;
var CODE_IP6ZONE = 42;
var CODE_IPCIDR = 43;
var CODE_DNS = 53;
var CODE_DNS4 = 54;
var CODE_DNS6 = 55;
var CODE_DNSADDR = 56;
var CODE_SCTP = 132;
var CODE_UDT = 301;
var CODE_UTP = 302;
var CODE_UNIX = 400;
var CODE_P2P = 421;
var CODE_ONION = 444;
var CODE_ONION3 = 445;
var CODE_GARLIC64 = 446;
var CODE_GARLIC32 = 447;
var CODE_TLS = 448;
var CODE_SNI = 449;
var CODE_NOISE = 454;
var CODE_QUIC = 460;
var CODE_QUIC_V1 = 461;
var CODE_WEBTRANSPORT = 465;
var CODE_CERTHASH = 466;
var CODE_HTTP = 480;
var CODE_HTTP_PATH = 481;
var CODE_HTTPS = 443;
var CODE_WS = 477;
var CODE_WSS = 478;
var CODE_P2P_WEBSOCKET_STAR = 479;
var CODE_P2P_STARDUST = 277;
var CODE_P2P_WEBRTC_STAR = 275;
var CODE_P2P_WEBRTC_DIRECT = 276;
var CODE_WEBRTC_DIRECT = 280;
var CODE_WEBRTC = 281;
var CODE_P2P_CIRCUIT = 290;
var CODE_MEMORY = 777;

// node_modules/@multiformats/multiaddr/dist/src/utils.js
function bytesToString(base3) {
  return (buf) => {
    return toString2(buf, base3);
  };
}
function stringToBytes(base3) {
  return (buf) => {
    return fromString2(buf, base3);
  };
}
function bytes2port(buf) {
  const view = new DataView(buf.buffer);
  return view.getUint16(buf.byteOffset).toString();
}
function port2bytes(port) {
  const buf = new ArrayBuffer(2);
  const view = new DataView(buf);
  view.setUint16(0, typeof port === "string" ? parseInt(port) : port);
  return new Uint8Array(buf);
}
function onion2bytes(str) {
  const addr = str.split(":");
  if (addr.length !== 2) {
    throw new Error(`failed to parse onion addr: ["'${addr.join('", "')}'"]' does not contain a port number`);
  }
  if (addr[0].length !== 16) {
    throw new Error(`failed to parse onion addr: ${addr[0]} not a Tor onion address.`);
  }
  const buf = fromString2(addr[0], "base32");
  const port = parseInt(addr[1], 10);
  if (port < 1 || port > 65536) {
    throw new Error("Port number is not in range(1, 65536)");
  }
  const portBuf = port2bytes(port);
  return concat([buf, portBuf], buf.length + portBuf.length);
}
function onion32bytes(str) {
  const addr = str.split(":");
  if (addr.length !== 2) {
    throw new Error(`failed to parse onion addr: ["'${addr.join('", "')}'"]' does not contain a port number`);
  }
  if (addr[0].length !== 56) {
    throw new Error(`failed to parse onion addr: ${addr[0]} not a Tor onion3 address.`);
  }
  const buf = base32.decode(`b${addr[0]}`);
  const port = parseInt(addr[1], 10);
  if (port < 1 || port > 65536) {
    throw new Error("Port number is not in range(1, 65536)");
  }
  const portBuf = port2bytes(port);
  return concat([buf, portBuf], buf.length + portBuf.length);
}
function bytes2onion(buf) {
  const addrBytes = buf.subarray(0, buf.length - 2);
  const portBytes = buf.subarray(buf.length - 2);
  const addr = toString2(addrBytes, "base32");
  const port = bytes2port(portBytes);
  return `${addr}:${port}`;
}
var ip4ToBytes = function(ip) {
  ip = ip.toString().trim();
  const bytes = new Uint8Array(4);
  ip.split(/\./g).forEach((byte, index) => {
    const value2 = parseInt(byte, 10);
    if (isNaN(value2) || value2 < 0 || value2 > 255) {
      throw new InvalidMultiaddrError2("Invalid byte value in IP address");
    }
    bytes[index] = value2;
  });
  return bytes;
};
var ip6ToBytes = function(ip) {
  let offset = 0;
  ip = ip.toString().trim();
  const sections = ip.split(":", 8);
  let i2;
  for (i2 = 0; i2 < sections.length; i2++) {
    const isv4 = (0, import_node_net.isIPv4)(sections[i2]);
    let v4Buffer;
    if (isv4) {
      v4Buffer = ip4ToBytes(sections[i2]);
      sections[i2] = toString2(v4Buffer.subarray(0, 2), "base16");
    }
    if (v4Buffer != null && ++i2 < 8) {
      sections.splice(i2, 0, toString2(v4Buffer.subarray(2, 4), "base16"));
    }
  }
  if (sections[0] === "") {
    while (sections.length < 8) {
      sections.unshift("0");
    }
  } else if (sections[sections.length - 1] === "") {
    while (sections.length < 8) {
      sections.push("0");
    }
  } else if (sections.length < 8) {
    for (i2 = 0; i2 < sections.length && sections[i2] !== ""; i2++) {
    }
    const argv = [i2, 1];
    for (i2 = 9 - sections.length; i2 > 0; i2--) {
      argv.push("0");
    }
    sections.splice.apply(sections, argv);
  }
  const bytes = new Uint8Array(offset + 16);
  for (i2 = 0; i2 < sections.length; i2++) {
    if (sections[i2] === "") {
      sections[i2] = "0";
    }
    const word = parseInt(sections[i2], 16);
    if (isNaN(word) || word < 0 || word > 65535) {
      throw new InvalidMultiaddrError2("Invalid byte value in IP address");
    }
    bytes[offset++] = word >> 8 & 255;
    bytes[offset++] = word & 255;
  }
  return bytes;
};
var ip4ToString = function(buf) {
  if (buf.byteLength !== 4) {
    throw new InvalidMultiaddrError2("IPv4 address was incorrect length");
  }
  const result = [];
  for (let i2 = 0; i2 < buf.byteLength; i2++) {
    result.push(buf[i2]);
  }
  return result.join(".");
};
var ip6ToString = function(buf) {
  if (buf.byteLength !== 16) {
    throw new InvalidMultiaddrError2("IPv6 address was incorrect length");
  }
  const result = [];
  for (let i2 = 0; i2 < buf.byteLength; i2 += 2) {
    const byte1 = buf[i2];
    const byte2 = buf[i2 + 1];
    const tuple = `${byte1.toString(16).padStart(2, "0")}${byte2.toString(16).padStart(2, "0")}`;
    result.push(tuple);
  }
  const ip = result.join(":");
  try {
    const url = new URL(`http://[${ip}]`);
    return url.hostname.substring(1, url.hostname.length - 1);
  } catch {
    throw new InvalidMultiaddrError2(`Invalid IPv6 address "${ip}"`);
  }
};
function ip6StringToValue(str) {
  try {
    const url = new URL(`http://[${str}]`);
    return url.hostname.substring(1, url.hostname.length - 1);
  } catch {
    throw new InvalidMultiaddrError2(`Invalid IPv6 address "${str}"`);
  }
}
var decoders2 = Object.values(bases).map((c2) => c2.decoder);
var anybaseDecoder = function() {
  let acc = decoders2[0].or(decoders2[1]);
  decoders2.slice(2).forEach((d2) => acc = acc.or(d2));
  return acc;
}();
function mb2bytes(mbstr) {
  return anybaseDecoder.decode(mbstr);
}
function bytes2mb(base3) {
  return (buf) => {
    return base3.encoder.encode(buf);
  };
}

// node_modules/@multiformats/multiaddr/dist/src/validation.js
function integer(value2) {
  const int = parseInt(value2);
  if (int.toString() !== value2) {
    throw new ValidationError("Value must be an integer");
  }
}
function positive(value2) {
  if (value2 < 0) {
    throw new ValidationError("Value must be a positive integer, or zero");
  }
}
function maxValue(max) {
  return (value2) => {
    if (value2 > max) {
      throw new ValidationError(`Value must be smaller than or equal to ${max}`);
    }
  };
}
function validate(...funcs) {
  return (value2) => {
    for (const fn of funcs) {
      fn(value2);
    }
  };
}
var validatePort = validate(integer, positive, maxValue(65535));

// node_modules/@multiformats/multiaddr/dist/src/registry.js
var V = -1;
var Registry = class {
  protocolsByCode = /* @__PURE__ */ new Map();
  protocolsByName = /* @__PURE__ */ new Map();
  getProtocol(key) {
    let codec;
    if (typeof key === "string") {
      codec = this.protocolsByName.get(key);
    } else {
      codec = this.protocolsByCode.get(key);
    }
    if (codec == null) {
      throw new UnknownProtocolError(`Protocol ${key} was unknown`);
    }
    return codec;
  }
  addProtocol(codec) {
    this.protocolsByCode.set(codec.code, codec);
    this.protocolsByName.set(codec.name, codec);
    codec.aliases?.forEach((alias) => {
      this.protocolsByName.set(alias, codec);
    });
  }
  removeProtocol(code3) {
    const codec = this.protocolsByCode.get(code3);
    if (codec == null) {
      return;
    }
    this.protocolsByCode.delete(codec.code);
    this.protocolsByName.delete(codec.name);
    codec.aliases?.forEach((alias) => {
      this.protocolsByName.delete(alias);
    });
  }
};
var registry = new Registry();
var codecs = [{
  code: CODE_IP4,
  name: "ip4",
  size: 32,
  valueToBytes: ip4ToBytes,
  bytesToValue: ip4ToString,
  validate: (value2) => {
    if (!(0, import_node_net.isIPv4)(value2)) {
      throw new ValidationError(`Invalid IPv4 address "${value2}"`);
    }
  }
}, {
  code: CODE_TCP,
  name: "tcp",
  size: 16,
  valueToBytes: port2bytes,
  bytesToValue: bytes2port,
  validate: validatePort
}, {
  code: CODE_UDP,
  name: "udp",
  size: 16,
  valueToBytes: port2bytes,
  bytesToValue: bytes2port,
  validate: validatePort
}, {
  code: CODE_DCCP,
  name: "dccp",
  size: 16,
  valueToBytes: port2bytes,
  bytesToValue: bytes2port,
  validate: validatePort
}, {
  code: CODE_IP6,
  name: "ip6",
  size: 128,
  valueToBytes: ip6ToBytes,
  bytesToValue: ip6ToString,
  stringToValue: ip6StringToValue,
  validate: (value2) => {
    if (!(0, import_node_net.isIPv6)(value2)) {
      throw new ValidationError(`Invalid IPv6 address "${value2}"`);
    }
  }
}, {
  code: CODE_IP6ZONE,
  name: "ip6zone",
  size: V
}, {
  code: CODE_IPCIDR,
  name: "ipcidr",
  size: 8,
  bytesToValue: bytesToString("base10"),
  valueToBytes: stringToBytes("base10")
}, {
  code: CODE_DNS,
  name: "dns",
  size: V,
  resolvable: true
}, {
  code: CODE_DNS4,
  name: "dns4",
  size: V,
  resolvable: true
}, {
  code: CODE_DNS6,
  name: "dns6",
  size: V,
  resolvable: true
}, {
  code: CODE_DNSADDR,
  name: "dnsaddr",
  size: V,
  resolvable: true
}, {
  code: CODE_SCTP,
  name: "sctp",
  size: 16,
  valueToBytes: port2bytes,
  bytesToValue: bytes2port,
  validate: validatePort
}, {
  code: CODE_UDT,
  name: "udt"
}, {
  code: CODE_UTP,
  name: "utp"
}, {
  code: CODE_UNIX,
  name: "unix",
  size: V,
  path: true,
  stringToValue: (str) => decodeURIComponent(str),
  valueToString: (val) => encodeURIComponent(val)
}, {
  code: CODE_P2P,
  name: "p2p",
  aliases: ["ipfs"],
  size: V,
  bytesToValue: bytesToString("base58btc"),
  valueToBytes: (val) => {
    if (val.startsWith("Q") || val.startsWith("1")) {
      return stringToBytes("base58btc")(val);
    }
    return CID.parse(val).multihash.bytes;
  }
}, {
  code: CODE_ONION,
  name: "onion",
  size: 96,
  bytesToValue: bytes2onion,
  valueToBytes: onion2bytes
}, {
  code: CODE_ONION3,
  name: "onion3",
  size: 296,
  bytesToValue: bytes2onion,
  valueToBytes: onion32bytes
}, {
  code: CODE_GARLIC64,
  name: "garlic64",
  size: V
}, {
  code: CODE_GARLIC32,
  name: "garlic32",
  size: V
}, {
  code: CODE_TLS,
  name: "tls"
}, {
  code: CODE_SNI,
  name: "sni",
  size: V
}, {
  code: CODE_NOISE,
  name: "noise"
}, {
  code: CODE_QUIC,
  name: "quic"
}, {
  code: CODE_QUIC_V1,
  name: "quic-v1"
}, {
  code: CODE_WEBTRANSPORT,
  name: "webtransport"
}, {
  code: CODE_CERTHASH,
  name: "certhash",
  size: V,
  bytesToValue: bytes2mb(base64url),
  valueToBytes: mb2bytes
}, {
  code: CODE_HTTP,
  name: "http"
}, {
  code: CODE_HTTP_PATH,
  name: "http-path",
  size: V,
  stringToValue: (str) => `/${decodeURIComponent(str)}`,
  valueToString: (val) => encodeURIComponent(val.substring(1))
}, {
  code: CODE_HTTPS,
  name: "https"
}, {
  code: CODE_WS,
  name: "ws"
}, {
  code: CODE_WSS,
  name: "wss"
}, {
  code: CODE_P2P_WEBSOCKET_STAR,
  name: "p2p-websocket-star"
}, {
  code: CODE_P2P_STARDUST,
  name: "p2p-stardust"
}, {
  code: CODE_P2P_WEBRTC_STAR,
  name: "p2p-webrtc-star"
}, {
  code: CODE_P2P_WEBRTC_DIRECT,
  name: "p2p-webrtc-direct"
}, {
  code: CODE_WEBRTC_DIRECT,
  name: "webrtc-direct"
}, {
  code: CODE_WEBRTC,
  name: "webrtc"
}, {
  code: CODE_P2P_CIRCUIT,
  name: "p2p-circuit"
}, {
  code: CODE_MEMORY,
  name: "memory",
  size: V
}];
codecs.forEach((codec) => {
  registry.addProtocol(codec);
});

// node_modules/@multiformats/multiaddr/dist/src/components.js
function bytesToComponents(bytes) {
  const components = [];
  let i2 = 0;
  while (i2 < bytes.length) {
    const code3 = decode6(bytes, i2);
    const codec = registry.getProtocol(code3);
    const codeLength = encodingLength2(code3);
    const size = sizeForAddr(codec, bytes, i2 + codeLength);
    let sizeLength = 0;
    if (size > 0 && codec.size === V) {
      sizeLength = encodingLength2(size);
    }
    const componentLength = codeLength + sizeLength + size;
    const component = {
      code: code3,
      name: codec.name,
      bytes: bytes.subarray(i2, i2 + componentLength)
    };
    if (size > 0) {
      const valueOffset = i2 + codeLength + sizeLength;
      const valueBytes = bytes.subarray(valueOffset, valueOffset + size);
      component.value = codec.bytesToValue?.(valueBytes) ?? toString2(valueBytes);
    }
    components.push(component);
    i2 += componentLength;
  }
  return components;
}
function componentsToBytes(components) {
  let length3 = 0;
  const bytes = [];
  for (const component of components) {
    if (component.bytes == null) {
      const codec = registry.getProtocol(component.code);
      const codecLength = encodingLength2(component.code);
      let valueBytes;
      let valueLength = 0;
      let valueLengthLength = 0;
      if (component.value != null) {
        valueBytes = codec.valueToBytes?.(component.value) ?? fromString2(component.value);
        valueLength = valueBytes.byteLength;
        if (codec.size === V) {
          valueLengthLength = encodingLength2(valueLength);
        }
      }
      const bytes2 = new Uint8Array(codecLength + valueLengthLength + valueLength);
      let offset = 0;
      encodeUint8Array(component.code, bytes2, offset);
      offset += codecLength;
      if (valueBytes != null) {
        if (codec.size === V) {
          encodeUint8Array(valueLength, bytes2, offset);
          offset += valueLengthLength;
        }
        bytes2.set(valueBytes, offset);
      }
      component.bytes = bytes2;
    }
    bytes.push(component.bytes);
    length3 += component.bytes.byteLength;
  }
  return concat(bytes, length3);
}
function stringToComponents(string2) {
  if (string2.charAt(0) !== "/") {
    throw new InvalidMultiaddrError2('String multiaddr must start with "/"');
  }
  const components = [];
  let collecting = "protocol";
  let value2 = "";
  let protocol = "";
  for (let i2 = 1; i2 < string2.length; i2++) {
    const char = string2.charAt(i2);
    if (char !== "/") {
      if (collecting === "protocol") {
        protocol += string2.charAt(i2);
      } else {
        value2 += string2.charAt(i2);
      }
    }
    const ended = i2 === string2.length - 1;
    if (char === "/" || ended) {
      const codec = registry.getProtocol(protocol);
      if (collecting === "protocol") {
        if (codec.size == null || codec.size === 0) {
          components.push({
            code: codec.code,
            name: codec.name
          });
          value2 = "";
          protocol = "";
          collecting = "protocol";
          continue;
        } else if (ended) {
          throw new InvalidMultiaddrError2(`Component ${protocol} was missing value`);
        }
        collecting = "value";
      } else if (collecting === "value") {
        const component = {
          code: codec.code,
          name: codec.name
        };
        if (codec.size != null && codec.size !== 0) {
          if (value2 === "") {
            throw new InvalidMultiaddrError2(`Component ${protocol} was missing value`);
          }
          component.value = codec.stringToValue?.(value2) ?? value2;
        }
        components.push(component);
        value2 = "";
        protocol = "";
        collecting = "protocol";
      }
    }
  }
  if (protocol !== "" && value2 !== "") {
    throw new InvalidMultiaddrError2("Incomplete multiaddr");
  }
  return components;
}
function componentsToString(components) {
  return `/${components.flatMap((component) => {
    if (component.value == null) {
      return component.name;
    }
    const codec = registry.getProtocol(component.code);
    if (codec == null) {
      throw new InvalidMultiaddrError2(`Unknown protocol code ${component.code}`);
    }
    return [
      component.name,
      codec.valueToString?.(component.value) ?? component.value
    ];
  }).join("/")}`;
}
function sizeForAddr(codec, bytes, offset) {
  if (codec.size == null || codec.size === 0) {
    return 0;
  }
  if (codec.size > 0) {
    return codec.size / 8;
  }
  return decode6(bytes, offset);
}

// node_modules/@multiformats/multiaddr/dist/src/multiaddr.js
var inspect2 = Symbol.for("nodejs.util.inspect.custom");
var symbol2 = Symbol.for("@multiformats/multiaddr");
var DNS_CODES = [
  CODE_DNS,
  CODE_DNS4,
  CODE_DNS6,
  CODE_DNSADDR
];
var NoAvailableResolverError = class extends Error {
  constructor(message2 = "No available resolver") {
    super(message2);
    this.name = "NoAvailableResolverError";
  }
};
function toComponents(addr) {
  if (addr == null) {
    addr = "/";
  }
  if (isMultiaddr(addr)) {
    return addr.getComponents();
  }
  if (addr instanceof Uint8Array) {
    return bytesToComponents(addr);
  }
  if (typeof addr === "string") {
    addr = addr.replace(/\/(\/)+/, "/").replace(/(\/)+$/, "");
    if (addr === "") {
      addr = "/";
    }
    return stringToComponents(addr);
  }
  if (Array.isArray(addr)) {
    return addr;
  }
  throw new InvalidMultiaddrError2("Must be a string, Uint8Array, Component[], or another Multiaddr");
}
var Multiaddr = class _Multiaddr {
  [symbol2] = true;
  #components;
  // cache string representation
  #string;
  // cache byte representation
  #bytes;
  constructor(addr = "/", options = {}) {
    this.#components = toComponents(addr);
    if (options.validate !== false) {
      validate2(this);
    }
  }
  get bytes() {
    if (this.#bytes == null) {
      this.#bytes = componentsToBytes(this.#components);
    }
    return this.#bytes;
  }
  toString() {
    if (this.#string == null) {
      this.#string = componentsToString(this.#components);
    }
    return this.#string;
  }
  toJSON() {
    return this.toString();
  }
  toOptions() {
    let family;
    let transport;
    let host;
    let port;
    let zone = "";
    for (const { code: code3, name: name3, value: value2 } of this.#components) {
      if (code3 === CODE_IP6ZONE) {
        zone = `%${value2 ?? ""}`;
      }
      if (DNS_CODES.includes(code3)) {
        transport = "tcp";
        port = 443;
        host = `${value2 ?? ""}${zone}`;
        family = code3 === CODE_DNS6 ? 6 : 4;
      }
      if (code3 === CODE_TCP || code3 === CODE_UDP) {
        transport = name3 === "tcp" ? "tcp" : "udp";
        port = parseInt(value2 ?? "");
      }
      if (code3 === CODE_IP4 || code3 === CODE_IP6) {
        transport = "tcp";
        host = `${value2 ?? ""}${zone}`;
        family = code3 === CODE_IP6 ? 6 : 4;
      }
    }
    if (family == null || transport == null || host == null || port == null) {
      throw new Error('multiaddr must have a valid format: "/{ip4, ip6, dns4, dns6, dnsaddr}/{address}/{tcp, udp}/{port}".');
    }
    const opts = {
      family,
      host,
      transport,
      port
    };
    return opts;
  }
  getComponents() {
    return [
      ...this.#components
    ];
  }
  protos() {
    return this.#components.map(({ code: code3, value: value2 }) => {
      const codec = registry.getProtocol(code3);
      return {
        code: code3,
        size: codec.size ?? 0,
        name: codec.name,
        resolvable: Boolean(codec.resolvable),
        path: Boolean(codec.path)
      };
    });
  }
  protoCodes() {
    return this.#components.map(({ code: code3 }) => code3);
  }
  protoNames() {
    return this.#components.map(({ name: name3 }) => name3);
  }
  tuples() {
    return this.#components.map(({ code: code3, value: value2 }) => {
      if (value2 == null) {
        return [code3];
      }
      const codec = registry.getProtocol(code3);
      const output = [code3];
      if (value2 != null) {
        output.push(codec.valueToBytes?.(value2) ?? fromString2(value2));
      }
      return output;
    });
  }
  stringTuples() {
    return this.#components.map(({ code: code3, value: value2 }) => {
      if (value2 == null) {
        return [code3];
      }
      return [code3, value2];
    });
  }
  encapsulate(addr) {
    const ma = new _Multiaddr(addr);
    return new _Multiaddr([
      ...this.#components,
      ...ma.getComponents()
    ], {
      validate: false
    });
  }
  decapsulate(addr) {
    const addrString = addr.toString();
    const s2 = this.toString();
    const i2 = s2.lastIndexOf(addrString);
    if (i2 < 0) {
      throw new InvalidParametersError3(`Address ${this.toString()} does not contain subaddress: ${addr.toString()}`);
    }
    return new _Multiaddr(s2.slice(0, i2), {
      validate: false
    });
  }
  decapsulateCode(code3) {
    let index;
    for (let i2 = this.#components.length - 1; i2 > -1; i2--) {
      if (this.#components[i2].code === code3) {
        index = i2;
        break;
      }
    }
    return new _Multiaddr(this.#components.slice(0, index), {
      validate: false
    });
  }
  getPeerId() {
    try {
      let tuples = [];
      this.#components.forEach(({ code: code3, value: value2 }) => {
        if (code3 === CODE_P2P) {
          tuples.push([code3, value2]);
        }
        if (code3 === CODE_P2P_CIRCUIT) {
          tuples = [];
        }
      });
      const tuple = tuples.pop();
      if (tuple?.[1] != null) {
        const peerIdStr = tuple[1];
        if (peerIdStr[0] === "Q" || peerIdStr[0] === "1") {
          return toString2(base58btc.decode(`z${peerIdStr}`), "base58btc");
        }
        return toString2(CID.parse(peerIdStr).multihash.bytes, "base58btc");
      }
      return null;
    } catch (e2) {
      return null;
    }
  }
  getPath() {
    for (const component of this.#components) {
      const codec = registry.getProtocol(component.code);
      if (!codec.path) {
        continue;
      }
      return component.value ?? null;
    }
    return null;
  }
  equals(addr) {
    return equals3(this.bytes, addr.bytes);
  }
  async resolve(options) {
    const resolvableProto = this.protos().find((p2) => p2.resolvable);
    if (resolvableProto == null) {
      return [this];
    }
    const resolver = resolvers.get(resolvableProto.name);
    if (resolver == null) {
      throw new NoAvailableResolverError(`no available resolver for ${resolvableProto.name}`);
    }
    const result = await resolver(this, options);
    return result.map((str) => multiaddr(str));
  }
  nodeAddress() {
    const options = this.toOptions();
    if (options.transport !== "tcp" && options.transport !== "udp") {
      throw new Error(`multiaddr must have a valid format - no protocol with name: "${options.transport}". Must have a valid transport protocol: "{tcp, udp}"`);
    }
    return {
      family: options.family,
      address: options.host,
      port: options.port
    };
  }
  isThinWaistAddress() {
    if (this.#components.length !== 2) {
      return false;
    }
    if (this.#components[0].code !== CODE_IP4 && this.#components[0].code !== CODE_IP6) {
      return false;
    }
    if (this.#components[1].code !== CODE_TCP && this.#components[1].code !== CODE_UDP) {
      return false;
    }
    return true;
  }
  /**
   * Returns Multiaddr as a human-readable string
   * https://nodejs.org/api/util.html#utilinspectcustom
   *
   * @example
   * ```js
   * import { multiaddr } from '@multiformats/multiaddr'
   *
   * console.info(multiaddr('/ip4/127.0.0.1/tcp/4001'))
   * // 'Multiaddr(/ip4/127.0.0.1/tcp/4001)'
   * ```
   */
  [inspect2]() {
    return `Multiaddr(${this.toString()})`;
  }
};
function validate2(addr) {
  addr.getComponents().forEach((component) => {
    const codec = registry.getProtocol(component.code);
    if (component.value == null) {
      return;
    }
    codec.validate?.(component.value);
  });
}

// node_modules/@chainsafe/is-ip/lib/parser.js
var Parser = class {
  index = 0;
  input = "";
  new(input) {
    this.index = 0;
    this.input = input;
    return this;
  }
  /** Run a parser, and restore the pre-parse state if it fails. */
  readAtomically(fn) {
    const index = this.index;
    const result = fn();
    if (result === void 0) {
      this.index = index;
    }
    return result;
  }
  /** Run a parser, but fail if the entire input wasn't consumed. Doesn't run atomically. */
  parseWith(fn) {
    const result = fn();
    if (this.index !== this.input.length) {
      return void 0;
    }
    return result;
  }
  /** Peek the next character from the input */
  peekChar() {
    if (this.index >= this.input.length) {
      return void 0;
    }
    return this.input[this.index];
  }
  /** Read the next character from the input */
  readChar() {
    if (this.index >= this.input.length) {
      return void 0;
    }
    return this.input[this.index++];
  }
  /** Read the next character from the input if it matches the target. */
  readGivenChar(target) {
    return this.readAtomically(() => {
      const char = this.readChar();
      if (char !== target) {
        return void 0;
      }
      return char;
    });
  }
  /**
   * Helper for reading separators in an indexed loop. Reads the separator
   * character iff index > 0, then runs the parser. When used in a loop,
   * the separator character will only be read on index > 0 (see
   * readIPv4Addr for an example)
   */
  readSeparator(sep, index, inner) {
    return this.readAtomically(() => {
      if (index > 0) {
        if (this.readGivenChar(sep) === void 0) {
          return void 0;
        }
      }
      return inner();
    });
  }
  /**
   * Read a number off the front of the input in the given radix, stopping
   * at the first non-digit character or eof. Fails if the number has more
   * digits than max_digits or if there is no number.
   */
  readNumber(radix, maxDigits, allowZeroPrefix, maxBytes) {
    return this.readAtomically(() => {
      let result = 0;
      let digitCount = 0;
      const leadingChar = this.peekChar();
      if (leadingChar === void 0) {
        return void 0;
      }
      const hasLeadingZero = leadingChar === "0";
      const maxValue2 = 2 ** (8 * maxBytes) - 1;
      while (true) {
        const digit = this.readAtomically(() => {
          const char = this.readChar();
          if (char === void 0) {
            return void 0;
          }
          const num = Number.parseInt(char, radix);
          if (Number.isNaN(num)) {
            return void 0;
          }
          return num;
        });
        if (digit === void 0) {
          break;
        }
        result *= radix;
        result += digit;
        if (result > maxValue2) {
          return void 0;
        }
        digitCount += 1;
        if (maxDigits !== void 0) {
          if (digitCount > maxDigits) {
            return void 0;
          }
        }
      }
      if (digitCount === 0) {
        return void 0;
      } else if (!allowZeroPrefix && hasLeadingZero && digitCount > 1) {
        return void 0;
      } else {
        return result;
      }
    });
  }
  /** Read an IPv4 address. */
  readIPv4Addr() {
    return this.readAtomically(() => {
      const out = new Uint8Array(4);
      for (let i2 = 0; i2 < out.length; i2++) {
        const ix = this.readSeparator(".", i2, () => this.readNumber(10, 3, false, 1));
        if (ix === void 0) {
          return void 0;
        }
        out[i2] = ix;
      }
      return out;
    });
  }
  /** Read an IPv6 Address. */
  readIPv6Addr() {
    const readGroups = (groups) => {
      for (let i2 = 0; i2 < groups.length / 2; i2++) {
        const ix = i2 * 2;
        if (i2 < groups.length - 3) {
          const ipv4 = this.readSeparator(":", i2, () => this.readIPv4Addr());
          if (ipv4 !== void 0) {
            groups[ix] = ipv4[0];
            groups[ix + 1] = ipv4[1];
            groups[ix + 2] = ipv4[2];
            groups[ix + 3] = ipv4[3];
            return [ix + 4, true];
          }
        }
        const group = this.readSeparator(":", i2, () => this.readNumber(16, 4, true, 2));
        if (group === void 0) {
          return [ix, false];
        }
        groups[ix] = group >> 8;
        groups[ix + 1] = group & 255;
      }
      return [groups.length, false];
    };
    return this.readAtomically(() => {
      const head = new Uint8Array(16);
      const [headSize, headIp4] = readGroups(head);
      if (headSize === 16) {
        return head;
      }
      if (headIp4) {
        return void 0;
      }
      if (this.readGivenChar(":") === void 0) {
        return void 0;
      }
      if (this.readGivenChar(":") === void 0) {
        return void 0;
      }
      const tail = new Uint8Array(14);
      const limit = 16 - (headSize + 2);
      const [tailSize] = readGroups(tail.subarray(0, limit));
      head.set(tail.subarray(0, tailSize), 16 - tailSize);
      return head;
    });
  }
  /** Read an IP Address, either IPv4 or IPv6. */
  readIPAddr() {
    return this.readIPv4Addr() ?? this.readIPv6Addr();
  }
};

// node_modules/@chainsafe/is-ip/lib/parse.js
var MAX_IPV6_LENGTH = 45;
var MAX_IPV4_LENGTH = 15;
var parser = new Parser();
function parseIPv4(input) {
  if (input.length > MAX_IPV4_LENGTH) {
    return void 0;
  }
  return parser.new(input).parseWith(() => parser.readIPv4Addr());
}
function parseIPv6(input) {
  if (input.includes("%")) {
    input = input.split("%")[0];
  }
  if (input.length > MAX_IPV6_LENGTH) {
    return void 0;
  }
  return parser.new(input).parseWith(() => parser.readIPv6Addr());
}
function parseIP(input, mapIPv4ToIPv6 = false) {
  if (input.includes("%")) {
    input = input.split("%")[0];
  }
  if (input.length > MAX_IPV6_LENGTH) {
    return void 0;
  }
  const addr = parser.new(input).parseWith(() => parser.readIPAddr());
  if (!addr) {
    return void 0;
  }
  if (mapIPv4ToIPv6 && addr.length === 4) {
    return Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, addr[0], addr[1], addr[2], addr[3]]);
  }
  return addr;
}

// node_modules/@chainsafe/netmask/dist/src/util.js
function allFF(a2, from3, to) {
  let i2 = 0;
  for (const e2 of a2) {
    if (i2 < from3)
      continue;
    if (i2 > to)
      break;
    if (e2 !== 255)
      return false;
    i2++;
  }
  return true;
}
function deepEqual(a2, b, from3, to) {
  let i2 = 0;
  for (const e2 of a2) {
    if (i2 < from3)
      continue;
    if (i2 > to)
      break;
    if (e2 !== b[i2])
      return false;
    i2++;
  }
  return true;
}
function ipToString(ip) {
  switch (ip.length) {
    case IPv4Len: {
      return ip.join(".");
    }
    case IPv6Len: {
      const result = [];
      for (let i2 = 0; i2 < ip.length; i2++) {
        if (i2 % 2 === 0) {
          result.push(ip[i2].toString(16).padStart(2, "0") + ip[i2 + 1].toString(16).padStart(2, "0"));
        }
      }
      return result.join(":");
    }
    default: {
      throw new Error("Invalid ip length");
    }
  }
}
function simpleMaskLength(mask) {
  let ones = 0;
  for (let [index, byte] of mask.entries()) {
    if (byte === 255) {
      ones += 8;
      continue;
    }
    while ((byte & 128) != 0) {
      ones++;
      byte = byte << 1;
    }
    if ((byte & 128) != 0) {
      return -1;
    }
    for (let i2 = index + 1; i2 < mask.length; i2++) {
      if (mask[i2] != 0) {
        return -1;
      }
    }
    break;
  }
  return ones;
}
function maskToHex(mask) {
  let hex = "0x";
  for (const byte of mask) {
    hex += (byte >> 4).toString(16) + (byte & 15).toString(16);
  }
  return hex;
}

// node_modules/@chainsafe/netmask/dist/src/ip.js
var IPv4Len = 4;
var IPv6Len = 16;
var maxIPv6Octet = parseInt("0xFFFF", 16);
var ipv4Prefix = new Uint8Array([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  255,
  255
]);
function maskIp(ip, mask) {
  if (mask.length === IPv6Len && ip.length === IPv4Len && allFF(mask, 0, 11)) {
    mask = mask.slice(12);
  }
  if (mask.length === IPv4Len && ip.length === IPv6Len && deepEqual(ip, ipv4Prefix, 0, 11)) {
    ip = ip.slice(12);
  }
  const n2 = ip.length;
  if (n2 != mask.length) {
    throw new Error("Failed to mask ip");
  }
  const out = new Uint8Array(n2);
  for (let i2 = 0; i2 < n2; i2++) {
    out[i2] = ip[i2] & mask[i2];
  }
  return out;
}
function containsIp(net, ip) {
  if (typeof ip === "string") {
    ip = parseIP(ip);
  }
  if (ip == null)
    throw new Error("Invalid ip");
  if (ip.length !== net.network.length) {
    return false;
  }
  for (let i2 = 0; i2 < ip.length; i2++) {
    if ((net.network[i2] & net.mask[i2]) !== (ip[i2] & net.mask[i2])) {
      return false;
    }
  }
  return true;
}

// node_modules/@chainsafe/netmask/dist/src/cidr.js
function parseCidr(s2) {
  const [address, maskString] = s2.split("/");
  if (!address || !maskString)
    throw new Error("Failed to parse given CIDR: " + s2);
  let ipLength = IPv4Len;
  let ip = parseIPv4(address);
  if (ip == null) {
    ipLength = IPv6Len;
    ip = parseIPv6(address);
    if (ip == null)
      throw new Error("Failed to parse given CIDR: " + s2);
  }
  const m2 = parseInt(maskString, 10);
  if (Number.isNaN(m2) || String(m2).length !== maskString.length || m2 < 0 || m2 > ipLength * 8) {
    throw new Error("Failed to parse given CIDR: " + s2);
  }
  const mask = cidrMask(m2, 8 * ipLength);
  return {
    network: maskIp(ip, mask),
    mask
  };
}
function cidrMask(ones, bits) {
  if (bits !== 8 * IPv4Len && bits !== 8 * IPv6Len)
    throw new Error("Invalid CIDR mask");
  if (ones < 0 || ones > bits)
    throw new Error("Invalid CIDR mask");
  const l2 = bits / 8;
  const m2 = new Uint8Array(l2);
  for (let i2 = 0; i2 < l2; i2++) {
    if (ones >= 8) {
      m2[i2] = 255;
      ones -= 8;
      continue;
    }
    m2[i2] = 255 - (255 >> ones);
    ones = 0;
  }
  return m2;
}

// node_modules/@chainsafe/netmask/dist/src/ipnet.js
var IpNet = class {
  /**
   *
   * @param ipOrCidr either network ip or full cidr address
   * @param mask in case ipOrCidr is network this can be either mask in decimal format or as ip address
   */
  constructor(ipOrCidr, mask) {
    if (mask == null) {
      ({ network: this.network, mask: this.mask } = parseCidr(ipOrCidr));
    } else {
      const ipResult = parseIP(ipOrCidr);
      if (ipResult == null) {
        throw new Error("Failed to parse network");
      }
      mask = String(mask);
      const m2 = parseInt(mask, 10);
      if (Number.isNaN(m2) || String(m2).length !== mask.length || m2 < 0 || m2 > ipResult.length * 8) {
        const maskResult = parseIP(mask);
        if (maskResult == null) {
          throw new Error("Failed to parse mask");
        }
        this.mask = maskResult;
      } else {
        this.mask = cidrMask(m2, 8 * ipResult.length);
      }
      this.network = maskIp(ipResult, this.mask);
    }
  }
  /**
   * Checks if netmask contains ip address
   * @param ip
   * @returns
   */
  contains(ip) {
    return containsIp({ network: this.network, mask: this.mask }, ip);
  }
  /**Serializes back to string format */
  toString() {
    const l2 = simpleMaskLength(this.mask);
    const mask = l2 !== -1 ? String(l2) : maskToHex(this.mask);
    return ipToString(this.network) + "/" + mask;
  }
};

// node_modules/@multiformats/multiaddr/dist/src/convert.js
function convertToIpNet(multiaddr2) {
  let mask;
  let addr;
  multiaddr2.getComponents().forEach((component) => {
    if (component.name === "ip4" || component.name === "ip6") {
      addr = component.value;
    }
    if (component.name === "ipcidr") {
      mask = component.value;
    }
  });
  if (mask == null || addr == null) {
    throw new Error("Invalid multiaddr");
  }
  return new IpNet(addr, mask);
}

// node_modules/@multiformats/multiaddr/dist/src/index.js
var resolvers = /* @__PURE__ */ new Map();
function isMultiaddr(value2) {
  return Boolean(value2?.[symbol2]);
}
function multiaddr(addr) {
  return new Multiaddr(addr);
}
function protocols(proto) {
  const codec = registry.getProtocol(proto);
  return {
    code: codec.code,
    size: codec.size ?? 0,
    name: codec.name,
    resolvable: Boolean(codec.resolvable),
    path: Boolean(codec.path)
  };
}

// node_modules/libp2p/dist/src/connection-manager/resolvers/dnsaddr.js
var DNSAddrResolver = class {
  dns;
  canResolve(ma) {
    return ma.getComponents().some(({ name: name3 }) => name3 === "dnsaddr");
  }
  async resolve(ma, options) {
    const hostname = ma.getComponents().find((component) => component.name === "dnsaddr")?.value;
    if (hostname == null) {
      return [ma];
    }
    const resolver = this.getDNS(options);
    const result = await resolver.query(`_dnsaddr.${hostname}`, {
      signal: options?.signal,
      types: [
        RecordType.TXT
      ]
    });
    const peerId = ma.getComponents().find((component) => component.name === "p2p")?.value;
    const output = [];
    for (const answer of result.Answer) {
      const addr = answer.data.replace(/["']/g, "").trim().split("=")[1];
      if (addr == null) {
        continue;
      }
      if (peerId != null && !addr.includes(peerId)) {
        continue;
      }
      output.push(multiaddr(addr));
    }
    return output;
  }
  getDNS(options) {
    if (options.dns != null) {
      return options.dns;
    }
    if (this.dns == null) {
      this.dns = dns();
    }
    return this.dns;
  }
};
var dnsaddrResolver = new DNSAddrResolver();

// node_modules/libp2p/dist/src/config.js
var DefaultConfig = {
  addresses: {
    listen: [],
    announce: [],
    noAnnounce: [],
    announceFilter: (multiaddrs) => multiaddrs
  },
  connectionManager: {
    resolvers: {
      dnsaddr: dnsaddrResolver
    }
  },
  transportManager: {
    faultTolerance: FaultTolerance.FATAL_ALL
  }
};
async function validateConfig(opts) {
  const resultingOptions = mergeOptions(DefaultConfig, opts);
  if (resultingOptions.connectionProtector === null && globalThis.process?.env?.LIBP2P_FORCE_PNET != null) {
    throw new InvalidParametersError2("Private network is enforced, but no protector was provided");
  }
  return resultingOptions;
}

// node_modules/weald/dist/src/node.js
var import_node_tty2 = __toESM(require("node:tty"), 1);
var import_node_util2 = __toESM(require("node:util"), 1);

// node_modules/weald/node_modules/ms/dist/index.js
var e = 1e3;
var t = e * 60;
var n = t * 60;
var r = n * 24;
var i = r * 7;
var a = r * 365.25;
var o = a / 12;
function s(e2, t2) {
  if (typeof e2 == `string`)
    return l(e2);
  if (typeof e2 == `number`)
    return p(e2, t2);
  throw Error(`Value provided to ms() must be a string or number. value=${JSON.stringify(e2)}`);
}
var c = s;
function l(s2) {
  if (typeof s2 != `string` || s2.length === 0 || s2.length > 100)
    throw Error(`Value provided to ms.parse() must be a string with length between 1 and 99. value=${JSON.stringify(s2)}`);
  let c2 = /^(?<value>-?\d*\.?\d+) *(?<unit>milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|months?|mo|years?|yrs?|y)?$/i.exec(s2);
  if (!c2?.groups)
    return NaN;
  let { value: l2, unit: u = `ms` } = c2.groups, d2 = parseFloat(l2), f2 = u.toLowerCase();
  switch (f2) {
    case `years`:
    case `year`:
    case `yrs`:
    case `yr`:
    case `y`:
      return d2 * a;
    case `months`:
    case `month`:
    case `mo`:
      return d2 * o;
    case `weeks`:
    case `week`:
    case `w`:
      return d2 * i;
    case `days`:
    case `day`:
    case `d`:
      return d2 * r;
    case `hours`:
    case `hour`:
    case `hrs`:
    case `hr`:
    case `h`:
      return d2 * n;
    case `minutes`:
    case `minute`:
    case `mins`:
    case `min`:
    case `m`:
      return d2 * t;
    case `seconds`:
    case `second`:
    case `secs`:
    case `sec`:
    case `s`:
      return d2 * e;
    case `milliseconds`:
    case `millisecond`:
    case `msecs`:
    case `msec`:
    case `ms`:
      return d2;
    default:
      throw Error(`Unknown unit "${f2}" provided to ms.parse(). value=${JSON.stringify(s2)}`);
  }
}
function d(s2) {
  let c2 = Math.abs(s2);
  return c2 >= a ? `${Math.round(s2 / a)}y` : c2 >= o ? `${Math.round(s2 / o)}mo` : c2 >= i ? `${Math.round(s2 / i)}w` : c2 >= r ? `${Math.round(s2 / r)}d` : c2 >= n ? `${Math.round(s2 / n)}h` : c2 >= t ? `${Math.round(s2 / t)}m` : c2 >= e ? `${Math.round(s2 / e)}s` : `${s2}ms`;
}
function f(s2) {
  let c2 = Math.abs(s2);
  return c2 >= a ? m(s2, c2, a, `year`) : c2 >= o ? m(s2, c2, o, `month`) : c2 >= i ? m(s2, c2, i, `week`) : c2 >= r ? m(s2, c2, r, `day`) : c2 >= n ? m(s2, c2, n, `hour`) : c2 >= t ? m(s2, c2, t, `minute`) : c2 >= e ? m(s2, c2, e, `second`) : `${s2} ms`;
}
function p(e2, t2) {
  if (typeof e2 != `number` || !Number.isFinite(e2))
    throw Error(`Value provided to ms.format() must be of type number.`);
  return t2?.long ? f(e2) : d(e2);
}
function m(e2, t2, n2, r2) {
  let i2 = t2 >= n2 * 1.5;
  return `${Math.round(e2 / n2)} ${r2}${i2 ? `s` : ``}`;
}

// node_modules/weald/node_modules/supports-color/index.js
var import_node_process = __toESM(require("node:process"), 1);
var import_node_os = __toESM(require("node:os"), 1);
var import_node_tty = __toESM(require("node:tty"), 1);
function hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : import_node_process.default.argv) {
  const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
  const position = argv.indexOf(prefix + flag);
  const terminatorPosition = argv.indexOf("--");
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
var { env } = import_node_process.default;
var flagForceColor;
if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
  flagForceColor = 0;
} else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
  flagForceColor = 1;
}
function envForceColor() {
  if (!("FORCE_COLOR" in env)) {
    return;
  }
  if (env.FORCE_COLOR === "true") {
    return 1;
  }
  if (env.FORCE_COLOR === "false") {
    return 0;
  }
  if (env.FORCE_COLOR.length === 0) {
    return 1;
  }
  const level = Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
  if (![0, 1, 2, 3].includes(level)) {
    return;
  }
  return level;
}
function translateLevel(level) {
  if (level === 0) {
    return false;
  }
  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
  const noFlagForceColor = envForceColor();
  if (noFlagForceColor !== void 0) {
    flagForceColor = noFlagForceColor;
  }
  const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
  if (forceColor === 0) {
    return 0;
  }
  if (sniffFlags) {
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
  }
  if ("TF_BUILD" in env && "AGENT_NAME" in env) {
    return 1;
  }
  if (haveStream && !streamIsTTY && forceColor === void 0) {
    return 0;
  }
  const min = forceColor || 0;
  if (env.TERM === "dumb") {
    return min;
  }
  if (import_node_process.default.platform === "win32") {
    const osRelease = import_node_os.default.release().split(".");
    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }
    return 1;
  }
  if ("CI" in env) {
    if (["GITHUB_ACTIONS", "GITEA_ACTIONS", "CIRCLECI"].some((key) => key in env)) {
      return 3;
    }
    if (["TRAVIS", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
      return 1;
    }
    return min;
  }
  if ("TEAMCITY_VERSION" in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }
  if (env.COLORTERM === "truecolor") {
    return 3;
  }
  if (env.TERM === "xterm-kitty") {
    return 3;
  }
  if (env.TERM === "xterm-ghostty") {
    return 3;
  }
  if (env.TERM === "wezterm") {
    return 3;
  }
  if ("TERM_PROGRAM" in env) {
    const version2 = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (env.TERM_PROGRAM) {
      case "iTerm.app": {
        return version2 >= 3 ? 3 : 2;
      }
      case "Apple_Terminal": {
        return 2;
      }
    }
  }
  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }
  if ("COLORTERM" in env) {
    return 1;
  }
  return min;
}
function createSupportsColor(stream, options = {}) {
  const level = _supportsColor(stream, {
    streamIsTTY: stream && stream.isTTY,
    ...options
  });
  return translateLevel(level);
}
var supportsColor = {
  stdout: createSupportsColor({ isTTY: import_node_tty.default.isatty(1) }),
  stderr: createSupportsColor({ isTTY: import_node_tty.default.isatty(2) })
};
var supports_color_default = supportsColor;

// node_modules/weald/dist/src/common.js
function setup(env2) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce2;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = c;
  createDebug.destroy = destroy;
  Object.keys(env2).forEach((key) => {
    createDebug[key] = env2[key];
  });
  createDebug.names = [];
  createDebug.skips = [];
  createDebug.formatters = {};
  function selectColor(namespace) {
    let hash = 0;
    for (let i2 = 0; i2 < namespace.length; i2++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i2);
      hash |= 0;
    }
    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }
  createDebug.selectColor = selectColor;
  function createDebug(namespace, options) {
    let prevTime;
    let enableOverride = null;
    let namespacesCache;
    let enabledCache;
    function debug(...args) {
      if (!debug.enabled) {
        return;
      }
      const self2 = debug;
      const curr = Number(/* @__PURE__ */ new Date());
      const ms = curr - (prevTime || curr);
      self2.diff = ms;
      self2.prev = prevTime;
      self2.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);
      if (typeof args[0] !== "string") {
        args.unshift("%O");
      }
      let index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format2) => {
        if (match === "%%") {
          return "%";
        }
        index++;
        const formatter = createDebug.formatters[format2];
        if (typeof formatter === "function") {
          const val = args[index];
          match = formatter.call(self2, val);
          args.splice(index, 1);
          index--;
        }
        return match;
      });
      createDebug.formatArgs.call(self2, args);
      if (options?.onLog != null) {
        options.onLog(...args);
      }
      const logFn = self2.log || createDebug.log;
      logFn.apply(self2, args);
    }
    debug.namespace = namespace;
    debug.useColors = createDebug.useColors();
    debug.color = createDebug.selectColor(namespace);
    debug.extend = extend;
    debug.destroy = createDebug.destroy;
    Object.defineProperty(debug, "enabled", {
      enumerable: true,
      configurable: false,
      get: () => {
        if (enableOverride !== null) {
          return enableOverride;
        }
        if (namespacesCache !== createDebug.namespaces) {
          namespacesCache = createDebug.namespaces;
          enabledCache = createDebug.enabled(namespace);
        }
        return enabledCache;
      },
      set: (v) => {
        enableOverride = v;
      }
    });
    if (typeof createDebug.init === "function") {
      createDebug.init(debug);
    }
    return debug;
  }
  function extend(namespace, delimiter) {
    const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
    newDebug.log = this.log;
    return newDebug;
  }
  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.namespaces = namespaces;
    createDebug.names = [];
    createDebug.skips = [];
    let i2;
    const split2 = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
    const len = split2.length;
    for (i2 = 0; i2 < len; i2++) {
      if (!split2[i2]) {
        continue;
      }
      namespaces = split2[i2].replace(/\*/g, ".*?");
      if (namespaces[0] === "-") {
        createDebug.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
      } else {
        createDebug.names.push(new RegExp("^" + namespaces + "$"));
      }
    }
  }
  function disable() {
    const namespaces = [
      ...createDebug.names.map(toNamespace),
      ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
    ].join(",");
    createDebug.enable("");
    return namespaces;
  }
  function enabled(name3) {
    if (name3[name3.length - 1] === "*") {
      return true;
    }
    let i2;
    let len;
    for (i2 = 0, len = createDebug.skips.length; i2 < len; i2++) {
      if (createDebug.skips[i2].test(name3)) {
        return false;
      }
    }
    for (i2 = 0, len = createDebug.names.length; i2 < len; i2++) {
      if (createDebug.names[i2].test(name3)) {
        return true;
      }
    }
    return false;
  }
  function toNamespace(regexp) {
    return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function coerce2(val) {
    if (val instanceof Error) {
      return val.stack ?? val.message;
    }
    return val;
  }
  function destroy() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  createDebug.setupFormatters(createDebug.formatters);
  createDebug.enable(createDebug.load());
  return createDebug;
}

// node_modules/weald/dist/src/node.js
var colors = [6, 2, 3, 4, 5, 1];
if (supports_color_default.stderr !== false && (supports_color_default.stderr ?? supports_color_default).level >= 2) {
  colors = [
    20,
    21,
    26,
    27,
    32,
    33,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    56,
    57,
    62,
    63,
    68,
    69,
    74,
    75,
    76,
    77,
    78,
    79,
    80,
    81,
    92,
    93,
    98,
    99,
    112,
    113,
    128,
    129,
    134,
    135,
    148,
    149,
    160,
    161,
    162,
    163,
    164,
    165,
    166,
    167,
    168,
    169,
    170,
    171,
    172,
    173,
    178,
    179,
    184,
    185,
    196,
    197,
    198,
    199,
    200,
    201,
    202,
    203,
    204,
    205,
    206,
    207,
    208,
    209,
    214,
    215,
    220,
    221
  ];
}
var inspectOpts = Object.keys(process.env).filter((key) => {
  return /^debug_/i.test(key);
}).reduce((obj, key) => {
  const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
    return k.toUpperCase();
  });
  let val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) {
    val = true;
  } else if (/^(no|off|false|disabled)$/i.test(val)) {
    val = false;
  } else if (val === "null") {
    val = null;
  } else {
    val = Number(val);
  }
  obj[prop] = val;
  return obj;
}, {});
function useColors() {
  return "colors" in inspectOpts ? Boolean(inspectOpts.colors) : import_node_tty2.default.isatty(process.stderr.fd);
}
function formatArgs(args) {
  const { namespace: name3, useColors: useColors2 } = this;
  if (useColors2 === true) {
    const c2 = this.color;
    const colorCode = "\x1B[3" + (c2 < 8 ? c2 : "8;5;" + c2);
    const prefix = `  ${colorCode};1m${name3} \x1B[0m`;
    args[0] = prefix + args[0].split("\n").join("\n" + prefix);
    args.push(colorCode + "m+" + c(this.diff) + "\x1B[0m");
  } else {
    args[0] = getDate() + name3 + " " + args[0];
  }
}
function getDate() {
  if (inspectOpts.hideDate != null) {
    return "";
  }
  return (/* @__PURE__ */ new Date()).toISOString() + " ";
}
function log(...args) {
  return process.stderr.write(import_node_util2.default.format(...args) + "\n");
}
function save(namespaces) {
  if (namespaces != null) {
    process.env.DEBUG = namespaces;
  } else {
    delete process.env.DEBUG;
  }
}
function load() {
  return process.env.DEBUG;
}
function init(debug) {
  debug.inspectOpts = {};
  const keys = Object.keys(inspectOpts);
  for (let i2 = 0; i2 < keys.length; i2++) {
    debug.inspectOpts[keys[i2]] = inspectOpts[keys[i2]];
  }
}
function setupFormatters(formatters) {
  formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return import_node_util2.default.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
  };
  formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return import_node_util2.default.inspect(v, this.inspectOpts);
  };
}
var node_default = setup({ init, log, formatArgs, save, load, useColors, setupFormatters, colors, inspectOpts });

// node_modules/weald/dist/src/index.js
var src_default = node_default;

// node_modules/@libp2p/logger/dist/src/index.js
src_default.formatters.b = (v) => {
  return v == null ? "undefined" : base58btc.baseEncode(v);
};
src_default.formatters.t = (v) => {
  return v == null ? "undefined" : base32.baseEncode(v);
};
src_default.formatters.m = (v) => {
  return v == null ? "undefined" : base64.baseEncode(v);
};
src_default.formatters.p = (v) => {
  return v == null ? "undefined" : v.toString();
};
src_default.formatters.c = (v) => {
  return v == null ? "undefined" : v.toString();
};
src_default.formatters.k = (v) => {
  return v == null ? "undefined" : v.toString();
};
src_default.formatters.a = (v) => {
  return v == null ? "undefined" : v.toString();
};
src_default.formatters.e = (v) => {
  return v == null ? "undefined" : notEmpty(v.stack) ?? notEmpty(v.message) ?? v.toString();
};
function createDisabledLogger(namespace) {
  const logger2 = () => {
  };
  logger2.enabled = false;
  logger2.color = "";
  logger2.diff = 0;
  logger2.log = () => {
  };
  logger2.namespace = namespace;
  logger2.destroy = () => true;
  logger2.extend = () => logger2;
  return logger2;
}
function defaultLogger() {
  return {
    forComponent(name3) {
      return logger(name3);
    }
  };
}
function logger(name3) {
  let trace = createDisabledLogger(`${name3}:trace`);
  if (src_default.enabled(`${name3}:trace`) && src_default.names.map((r2) => r2.toString()).find((n2) => n2.includes(":trace")) != null) {
    trace = src_default(`${name3}:trace`);
  }
  return Object.assign(src_default(name3), {
    error: src_default(`${name3}:error`),
    trace,
    newScope: (scope) => logger(`${name3}:${scope}`)
  });
}
function notEmpty(str) {
  if (str == null) {
    return;
  }
  str = str.trim();
  if (str.length === 0) {
    return;
  }
  return str;
}

// node_modules/@libp2p/peer-collections/dist/src/util.js
function mapIterable(iter, map) {
  const iterator = {
    [Symbol.iterator]: () => {
      return iterator;
    },
    next: () => {
      const next = iter.next();
      const val = next.value;
      if (next.done === true || val == null) {
        const result = {
          done: true,
          value: void 0
        };
        return result;
      }
      return {
        done: false,
        value: map(val)
      };
    }
  };
  return iterator;
}
function peerIdFromString2(str) {
  const multihash = decode4(base58btc.decode(`z${str}`));
  return peerIdFromMultihash(multihash);
}

// node_modules/@libp2p/peer-collections/dist/src/map.js
var PeerMap = class {
  map;
  constructor(map) {
    this.map = /* @__PURE__ */ new Map();
    if (map != null) {
      for (const [key, value2] of map.entries()) {
        this.map.set(key.toString(), { key, value: value2 });
      }
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  clear() {
    this.map.clear();
  }
  delete(peer) {
    return this.map.delete(peer.toString());
  }
  entries() {
    return mapIterable(this.map.entries(), (val) => {
      return [val[1].key, val[1].value];
    });
  }
  forEach(fn) {
    this.map.forEach((value2, key) => {
      fn(value2.value, value2.key, this);
    });
  }
  get(peer) {
    return this.map.get(peer.toString())?.value;
  }
  has(peer) {
    return this.map.has(peer.toString());
  }
  set(peer, value2) {
    this.map.set(peer.toString(), { key: peer, value: value2 });
  }
  keys() {
    return mapIterable(this.map.values(), (val) => {
      return val.key;
    });
  }
  values() {
    return mapIterable(this.map.values(), (val) => val.value);
  }
  get size() {
    return this.map.size;
  }
};

// node_modules/@libp2p/peer-collections/dist/src/set.js
var PeerSet = class _PeerSet {
  set;
  constructor(set) {
    this.set = /* @__PURE__ */ new Set();
    if (set != null) {
      for (const key of set) {
        this.set.add(key.toString());
      }
    }
  }
  get size() {
    return this.set.size;
  }
  [Symbol.iterator]() {
    return this.values();
  }
  add(peer) {
    this.set.add(peer.toString());
  }
  clear() {
    this.set.clear();
  }
  delete(peer) {
    this.set.delete(peer.toString());
  }
  entries() {
    return mapIterable(this.set.entries(), (val) => {
      const peerId = peerIdFromString2(val[0]);
      return [peerId, peerId];
    });
  }
  forEach(predicate) {
    this.set.forEach((str) => {
      const peerId = peerIdFromString2(str);
      predicate(peerId, peerId, this);
    });
  }
  has(peer) {
    return this.set.has(peer.toString());
  }
  values() {
    return mapIterable(this.set.values(), (val) => {
      return peerIdFromString2(val);
    });
  }
  intersection(other) {
    const output = new _PeerSet();
    for (const peerId of other) {
      if (this.has(peerId)) {
        output.add(peerId);
      }
    }
    return output;
  }
  difference(other) {
    const output = new _PeerSet();
    for (const peerId of this) {
      if (!other.has(peerId)) {
        output.add(peerId);
      }
    }
    return output;
  }
  union(other) {
    const output = new _PeerSet();
    for (const peerId of other) {
      output.add(peerId);
    }
    for (const peerId of this) {
      output.add(peerId);
    }
    return output;
  }
};

// node_modules/@sindresorhus/fnv1a/index.js
var FNV_PRIMES = {
  32: 16777619n,
  64: 1099511628211n,
  128: 309485009821345068724781371n,
  256: 374144419156711147060143317175368453031918731002211n,
  512: 35835915874844867368919076489095108449946327955754392558399825615420669938882575126094039892345713852759n,
  1024: 5016456510113118655434598811035278955030765345404790744303017523831112055108147451509157692220295382716162651878526895249385292291816524375083746691371804094271873160484737966720260389217684476157468082573n
};
var FNV_OFFSETS = {
  32: 2166136261n,
  64: 14695981039346656037n,
  128: 144066263297769815596495629667062367629n,
  256: 100029257958052580907070968620625704837092796014241193945225284501741471925557n,
  512: 9659303129496669498009435400716310466090418745672637896108374329434462657994582932197716438449813051892206539805784495328239340083876191928701583869517785n,
  1024: 14197795064947621068722070641403218320880622795441933960878474914617582723252296732303717722150864096521202355549365628174669108571814760471015076148029755969804077320157692458563003215304957150157403644460363550505412711285966361610267868082893823963790439336411086884584107735010676915n
};
var cachedEncoder = new globalThis.TextEncoder();
function fnv1aUint8Array(uint8Array, size) {
  const fnvPrime = FNV_PRIMES[size];
  let hash = FNV_OFFSETS[size];
  for (let index = 0; index < uint8Array.length; index++) {
    hash ^= BigInt(uint8Array[index]);
    hash = BigInt.asUintN(size, hash * fnvPrime);
  }
  return hash;
}
function fnv1aEncodeInto(string2, size, utf8Buffer) {
  if (utf8Buffer.length === 0) {
    throw new Error("The `utf8Buffer` option must have a length greater than zero");
  }
  const fnvPrime = FNV_PRIMES[size];
  let hash = FNV_OFFSETS[size];
  let remaining = string2;
  while (remaining.length > 0) {
    const result = cachedEncoder.encodeInto(remaining, utf8Buffer);
    remaining = remaining.slice(result.read);
    for (let index = 0; index < result.written; index++) {
      hash ^= BigInt(utf8Buffer[index]);
      hash = BigInt.asUintN(size, hash * fnvPrime);
    }
  }
  return hash;
}
function fnv1a(value2, { size = 32, utf8Buffer } = {}) {
  if (!FNV_PRIMES[size]) {
    throw new Error("The `size` option must be one of 32, 64, 128, 256, 512, or 1024");
  }
  if (typeof value2 === "string") {
    if (utf8Buffer) {
      return fnv1aEncodeInto(value2, size, utf8Buffer);
    }
    value2 = cachedEncoder.encode(value2);
  }
  return fnv1aUint8Array(value2, size);
}

// node_modules/@libp2p/utils/dist/src/filters/hashes.js
var fnv1a2 = {
  hash: (input) => {
    return Number(fnv1a(input, {
      size: 32
    }));
  },
  hashV: (input, seed) => {
    return numberToBuffer(fnv1a2.hash(input, seed));
  }
};
function numberToBuffer(num) {
  let hex = num.toString(16);
  if (hex.length % 2 === 1) {
    hex = `0${hex}`;
  }
  return fromString2(hex, "base16");
}

// node_modules/@libp2p/utils/dist/src/filters/fingerprint.js
var MAX_FINGERPRINT_SIZE = 64;
var Fingerprint = class {
  fp;
  h;
  seed;
  constructor(buf, hash, seed, fingerprintSize = 2) {
    if (fingerprintSize > MAX_FINGERPRINT_SIZE) {
      throw new TypeError("Invalid Fingerprint Size");
    }
    const fnv = hash.hashV(buf, seed);
    const fp = alloc(fingerprintSize);
    for (let i2 = 0; i2 < fp.length; i2++) {
      fp[i2] = fnv[i2];
    }
    if (fp.length === 0) {
      fp[0] = 7;
    }
    this.fp = fp;
    this.h = hash;
    this.seed = seed;
  }
  hash() {
    return this.h.hash(this.fp, this.seed);
  }
  equals(other) {
    if (!(other?.fp instanceof Uint8Array)) {
      return false;
    }
    return equals3(this.fp, other.fp);
  }
};

// node_modules/@libp2p/utils/dist/src/filters/utils.js
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// node_modules/@libp2p/utils/dist/src/filters/bucket.js
var Bucket = class {
  contents;
  constructor(size) {
    this.contents = new Array(size).fill(null);
  }
  has(fingerprint) {
    if (!(fingerprint instanceof Fingerprint)) {
      throw new TypeError("Invalid Fingerprint");
    }
    return this.contents.some((fp) => {
      return fingerprint.equals(fp);
    });
  }
  add(fingerprint) {
    if (!(fingerprint instanceof Fingerprint)) {
      throw new TypeError("Invalid Fingerprint");
    }
    for (let i2 = 0; i2 < this.contents.length; i2++) {
      if (this.contents[i2] == null) {
        this.contents[i2] = fingerprint;
        return true;
      }
    }
    return true;
  }
  swap(fingerprint) {
    if (!(fingerprint instanceof Fingerprint)) {
      throw new TypeError("Invalid Fingerprint");
    }
    const i2 = getRandomInt(0, this.contents.length - 1);
    const current = this.contents[i2];
    this.contents[i2] = fingerprint;
    return current;
  }
  remove(fingerprint) {
    if (!(fingerprint instanceof Fingerprint)) {
      throw new TypeError("Invalid Fingerprint");
    }
    const found = this.contents.findIndex((fp) => {
      return fingerprint.equals(fp);
    });
    if (found > -1) {
      this.contents[found] = null;
      return true;
    } else {
      return false;
    }
  }
};

// node_modules/@libp2p/utils/dist/src/filters/cuckoo-filter.js
var maxCuckooCount = 500;
var CuckooFilter = class {
  bucketSize;
  filterSize;
  fingerprintSize;
  buckets;
  count;
  hash;
  seed;
  constructor(init2) {
    this.filterSize = init2.filterSize;
    this.bucketSize = init2.bucketSize ?? 4;
    this.fingerprintSize = init2.fingerprintSize ?? 2;
    this.count = 0;
    this.buckets = [];
    this.hash = init2.hash ?? fnv1a2;
    this.seed = init2.seed ?? getRandomInt(0, Math.pow(2, 10));
  }
  add(item) {
    if (typeof item === "string") {
      item = fromString2(item);
    }
    const fingerprint = new Fingerprint(item, this.hash, this.seed, this.fingerprintSize);
    const j = this.hash.hash(item, this.seed) % this.filterSize;
    const k = (j ^ fingerprint.hash()) % this.filterSize;
    if (this.buckets[j] == null) {
      this.buckets[j] = new Bucket(this.bucketSize);
    }
    if (this.buckets[k] == null) {
      this.buckets[k] = new Bucket(this.bucketSize);
    }
    if (this.buckets[j].add(fingerprint) || this.buckets[k].add(fingerprint)) {
      this.count++;
      return true;
    }
    const rand = [j, k];
    let i2 = rand[getRandomInt(0, rand.length - 1)];
    if (this.buckets[i2] == null) {
      this.buckets[i2] = new Bucket(this.bucketSize);
    }
    for (let n2 = 0; n2 < maxCuckooCount; n2++) {
      const swapped = this.buckets[i2].swap(fingerprint);
      if (swapped == null) {
        continue;
      }
      i2 = (i2 ^ swapped.hash()) % this.filterSize;
      if (this.buckets[i2] == null) {
        this.buckets[i2] = new Bucket(this.bucketSize);
      }
      if (this.buckets[i2].add(swapped)) {
        this.count++;
        return true;
      } else {
        continue;
      }
    }
    return false;
  }
  has(item) {
    if (typeof item === "string") {
      item = fromString2(item);
    }
    const fingerprint = new Fingerprint(item, this.hash, this.seed, this.fingerprintSize);
    const j = this.hash.hash(item, this.seed) % this.filterSize;
    const inJ = this.buckets[j]?.has(fingerprint) ?? false;
    if (inJ) {
      return inJ;
    }
    const k = (j ^ fingerprint.hash()) % this.filterSize;
    return this.buckets[k]?.has(fingerprint) ?? false;
  }
  remove(item) {
    if (typeof item === "string") {
      item = fromString2(item);
    }
    const fingerprint = new Fingerprint(item, this.hash, this.seed, this.fingerprintSize);
    const j = this.hash.hash(item, this.seed) % this.filterSize;
    const inJ = this.buckets[j]?.remove(fingerprint) ?? false;
    if (inJ) {
      this.count--;
      return inJ;
    }
    const k = (j ^ fingerprint.hash()) % this.filterSize;
    const inK = this.buckets[k]?.remove(fingerprint) ?? false;
    if (inK) {
      this.count--;
    }
    return inK;
  }
  get reliable() {
    return Math.floor(100 * (this.count / this.filterSize)) <= 90;
  }
};
var MAX_LOAD = {
  1: 0.5,
  2: 0.84,
  4: 0.95,
  8: 0.98
};
function calculateBucketSize(errorRate = 1e-3) {
  if (errorRate > 2e-3) {
    return 2;
  }
  if (errorRate > 1e-5) {
    return 4;
  }
  return 8;
}
function optimize(maxItems, errorRate = 1e-3) {
  const bucketSize = calculateBucketSize(errorRate);
  const load2 = MAX_LOAD[bucketSize];
  const filterSize = Math.round(maxItems / load2);
  const fingerprintSize = Math.min(Math.ceil(Math.log2(1 / errorRate) + Math.log2(2 * bucketSize)), MAX_FINGERPRINT_SIZE);
  return {
    filterSize,
    bucketSize,
    fingerprintSize
  };
}

// node_modules/@libp2p/utils/dist/src/filters/scalable-cuckoo-filter.js
var ScalableCuckooFilter = class {
  filterSize;
  bucketSize;
  fingerprintSize;
  scale;
  filterSeries;
  hash;
  seed;
  constructor(init2) {
    this.bucketSize = init2.bucketSize ?? 4;
    this.filterSize = init2.filterSize ?? (1 << 18) / this.bucketSize;
    this.fingerprintSize = init2.fingerprintSize ?? 2;
    this.scale = init2.scale ?? 2;
    this.hash = init2.hash ?? fnv1a2;
    this.seed = init2.seed ?? getRandomInt(0, Math.pow(2, 10));
    this.filterSeries = [
      new CuckooFilter({
        filterSize: this.filterSize,
        bucketSize: this.bucketSize,
        fingerprintSize: this.fingerprintSize,
        hash: this.hash,
        seed: this.seed
      })
    ];
  }
  add(item) {
    if (typeof item === "string") {
      item = fromString2(item);
    }
    if (this.has(item)) {
      return true;
    }
    let current = this.filterSeries.find((cuckoo) => {
      return cuckoo.reliable;
    });
    if (current == null) {
      const curSize = this.filterSize * Math.pow(this.scale, this.filterSeries.length);
      current = new CuckooFilter({
        filterSize: curSize,
        bucketSize: this.bucketSize,
        fingerprintSize: this.fingerprintSize,
        hash: this.hash,
        seed: this.seed
      });
      this.filterSeries.push(current);
    }
    return current.add(item);
  }
  has(item) {
    if (typeof item === "string") {
      item = fromString2(item);
    }
    for (let i2 = 0; i2 < this.filterSeries.length; i2++) {
      if (this.filterSeries[i2].has(item)) {
        return true;
      }
    }
    return false;
  }
  remove(item) {
    if (typeof item === "string") {
      item = fromString2(item);
    }
    for (let i2 = 0; i2 < this.filterSeries.length; i2++) {
      if (this.filterSeries[i2].remove(item)) {
        return true;
      }
    }
    return false;
  }
  get count() {
    return this.filterSeries.reduce((acc, curr) => {
      return acc + curr.count;
    }, 0);
  }
};
function createScalableCuckooFilter(maxItems, errorRate = 1e-3, options) {
  return new ScalableCuckooFilter({
    ...optimize(maxItems, errorRate),
    ...options ?? {}
  });
}

// node_modules/@libp2p/peer-collections/dist/src/tracked-map.js
var TrackedPeerMap = class extends PeerMap {
  metric;
  constructor(init2) {
    super();
    const { name: name3, metrics } = init2;
    this.metric = metrics.registerMetric(name3);
    this.updateComponentMetric();
  }
  set(key, value2) {
    super.set(key, value2);
    this.updateComponentMetric();
    return this;
  }
  delete(key) {
    const deleted = super.delete(key);
    this.updateComponentMetric();
    return deleted;
  }
  clear() {
    super.clear();
    this.updateComponentMetric();
  }
  updateComponentMetric() {
    this.metric.update(this.size);
  }
};
function trackedPeerMap(config) {
  const { name: name3, metrics } = config;
  let map;
  if (metrics != null) {
    map = new TrackedPeerMap({ name: name3, metrics });
  } else {
    map = new PeerMap();
  }
  return map;
}

// node_modules/@libp2p/peer-record/dist/src/envelope/envelope.js
var Envelope;
(function(Envelope2) {
  let _codec;
  Envelope2.codec = () => {
    if (_codec == null) {
      _codec = message((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork();
        }
        if (obj.publicKey != null && obj.publicKey.byteLength > 0) {
          w.uint32(10);
          w.bytes(obj.publicKey);
        }
        if (obj.payloadType != null && obj.payloadType.byteLength > 0) {
          w.uint32(18);
          w.bytes(obj.payloadType);
        }
        if (obj.payload != null && obj.payload.byteLength > 0) {
          w.uint32(26);
          w.bytes(obj.payload);
        }
        if (obj.signature != null && obj.signature.byteLength > 0) {
          w.uint32(42);
          w.bytes(obj.signature);
        }
        if (opts.lengthDelimited !== false) {
          w.ldelim();
        }
      }, (reader, length3, opts = {}) => {
        const obj = {
          publicKey: alloc(0),
          payloadType: alloc(0),
          payload: alloc(0),
          signature: alloc(0)
        };
        const end = length3 == null ? reader.len : reader.pos + length3;
        while (reader.pos < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1: {
              obj.publicKey = reader.bytes();
              break;
            }
            case 2: {
              obj.payloadType = reader.bytes();
              break;
            }
            case 3: {
              obj.payload = reader.bytes();
              break;
            }
            case 5: {
              obj.signature = reader.bytes();
              break;
            }
            default: {
              reader.skipType(tag & 7);
              break;
            }
          }
        }
        return obj;
      });
    }
    return _codec;
  };
  Envelope2.encode = (obj) => {
    return encodeMessage(obj, Envelope2.codec());
  };
  Envelope2.decode = (buf, opts) => {
    return decodeMessage(buf, Envelope2.codec(), opts);
  };
})(Envelope || (Envelope = {}));

// node_modules/@libp2p/peer-record/dist/src/envelope/errors.js
var InvalidSignatureError = class extends Error {
  constructor(message2 = "Invalid signature") {
    super(message2);
    this.name = "InvalidSignatureError";
  }
};

// node_modules/@libp2p/peer-record/dist/src/envelope/index.js
var RecordEnvelope = class _RecordEnvelope {
  /**
   * Unmarshal a serialized Envelope protobuf message
   */
  static createFromProtobuf = (data) => {
    const envelopeData = Envelope.decode(data);
    const publicKey = publicKeyFromProtobuf(envelopeData.publicKey);
    return new _RecordEnvelope({
      publicKey,
      payloadType: envelopeData.payloadType,
      payload: envelopeData.payload,
      signature: envelopeData.signature
    });
  };
  /**
   * Seal marshals the given Record, places the marshaled bytes inside an Envelope
   * and signs it with the given peerId's private key
   */
  static seal = async (record, privateKey, options) => {
    if (privateKey == null) {
      throw new Error("Missing private key");
    }
    const domain = record.domain;
    const payloadType = record.codec;
    const payload = record.marshal();
    const signData = formatSignaturePayload(domain, payloadType, payload);
    const signature = await privateKey.sign(signData.subarray(), options);
    return new _RecordEnvelope({
      publicKey: privateKey.publicKey,
      payloadType,
      payload,
      signature
    });
  };
  /**
   * Open and certify a given marshaled envelope.
   * Data is unmarshaled and the signature validated for the given domain.
   */
  static openAndCertify = async (data, domain, options) => {
    const envelope = _RecordEnvelope.createFromProtobuf(data);
    const valid = await envelope.validate(domain, options);
    if (!valid) {
      throw new InvalidSignatureError("Envelope signature is not valid for the given domain");
    }
    return envelope;
  };
  publicKey;
  payloadType;
  payload;
  signature;
  marshaled;
  /**
   * The Envelope is responsible for keeping an arbitrary signed record
   * by a libp2p peer.
   */
  constructor(init2) {
    const { publicKey, payloadType, payload, signature } = init2;
    this.publicKey = publicKey;
    this.payloadType = payloadType;
    this.payload = payload;
    this.signature = signature;
  }
  /**
   * Marshal the envelope content
   */
  marshal() {
    if (this.marshaled == null) {
      this.marshaled = Envelope.encode({
        publicKey: publicKeyToProtobuf(this.publicKey),
        payloadType: this.payloadType,
        payload: this.payload.subarray(),
        signature: this.signature
      });
    }
    return this.marshaled;
  }
  /**
   * Verifies if the other Envelope is identical to this one
   */
  equals(other) {
    if (other == null) {
      return false;
    }
    return equals3(this.marshal(), other.marshal());
  }
  /**
   * Validate envelope data signature for the given domain
   */
  async validate(domain, options) {
    const signData = formatSignaturePayload(domain, this.payloadType, this.payload);
    return this.publicKey.verify(signData.subarray(), this.signature, options);
  }
};
var formatSignaturePayload = (domain, payloadType, payload) => {
  const domainUint8Array = fromString2(domain);
  const domainLength = encode5(domainUint8Array.byteLength);
  const payloadTypeLength = encode5(payloadType.length);
  const payloadLength = encode5(payload.length);
  return new Uint8ArrayList(domainLength, domainUint8Array, payloadTypeLength, payloadType, payloadLength, payload);
};

// node_modules/@libp2p/utils/dist/src/array-equals.js
function arrayEquals(a2, b) {
  const sort2 = (a3, b2) => a3.toString().localeCompare(b2.toString());
  if (a2.length !== b.length) {
    return false;
  }
  b.sort(sort2);
  return a2.sort(sort2).every((item, index) => b[index].equals(item));
}

// node_modules/@libp2p/peer-record/dist/src/peer-record/consts.js
var ENVELOPE_DOMAIN_PEER_RECORD = "libp2p-peer-record";
var ENVELOPE_PAYLOAD_TYPE_PEER_RECORD = Uint8Array.from([3, 1]);

// node_modules/@libp2p/peer-record/dist/src/peer-record/peer-record.js
var PeerRecord;
(function(PeerRecord3) {
  let AddressInfo;
  (function(AddressInfo2) {
    let _codec2;
    AddressInfo2.codec = () => {
      if (_codec2 == null) {
        _codec2 = message((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork();
          }
          if (obj.multiaddr != null && obj.multiaddr.byteLength > 0) {
            w.uint32(10);
            w.bytes(obj.multiaddr);
          }
          if (opts.lengthDelimited !== false) {
            w.ldelim();
          }
        }, (reader, length3, opts = {}) => {
          const obj = {
            multiaddr: alloc(0)
          };
          const end = length3 == null ? reader.len : reader.pos + length3;
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                obj.multiaddr = reader.bytes();
                break;
              }
              default: {
                reader.skipType(tag & 7);
                break;
              }
            }
          }
          return obj;
        });
      }
      return _codec2;
    };
    AddressInfo2.encode = (obj) => {
      return encodeMessage(obj, AddressInfo2.codec());
    };
    AddressInfo2.decode = (buf, opts) => {
      return decodeMessage(buf, AddressInfo2.codec(), opts);
    };
  })(AddressInfo = PeerRecord3.AddressInfo || (PeerRecord3.AddressInfo = {}));
  let _codec;
  PeerRecord3.codec = () => {
    if (_codec == null) {
      _codec = message((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork();
        }
        if (obj.peerId != null && obj.peerId.byteLength > 0) {
          w.uint32(10);
          w.bytes(obj.peerId);
        }
        if (obj.seq != null && obj.seq !== 0n) {
          w.uint32(16);
          w.uint64(obj.seq);
        }
        if (obj.addresses != null) {
          for (const value2 of obj.addresses) {
            w.uint32(26);
            PeerRecord3.AddressInfo.codec().encode(value2, w);
          }
        }
        if (opts.lengthDelimited !== false) {
          w.ldelim();
        }
      }, (reader, length3, opts = {}) => {
        const obj = {
          peerId: alloc(0),
          seq: 0n,
          addresses: []
        };
        const end = length3 == null ? reader.len : reader.pos + length3;
        while (reader.pos < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1: {
              obj.peerId = reader.bytes();
              break;
            }
            case 2: {
              obj.seq = reader.uint64();
              break;
            }
            case 3: {
              if (opts.limits?.addresses != null && obj.addresses.length === opts.limits.addresses) {
                throw new MaxLengthError('Decode error - map field "addresses" had too many elements');
              }
              obj.addresses.push(PeerRecord3.AddressInfo.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.addresses$
              }));
              break;
            }
            default: {
              reader.skipType(tag & 7);
              break;
            }
          }
        }
        return obj;
      });
    }
    return _codec;
  };
  PeerRecord3.encode = (obj) => {
    return encodeMessage(obj, PeerRecord3.codec());
  };
  PeerRecord3.decode = (buf, opts) => {
    return decodeMessage(buf, PeerRecord3.codec(), opts);
  };
})(PeerRecord || (PeerRecord = {}));

// node_modules/@libp2p/peer-record/dist/src/peer-record/index.js
var PeerRecord2 = class _PeerRecord {
  /**
   * Unmarshal Peer Record Protobuf
   */
  static createFromProtobuf = (buf) => {
    const peerRecord = PeerRecord.decode(buf);
    const peerId = peerIdFromMultihash(decode4(peerRecord.peerId));
    const multiaddrs = (peerRecord.addresses ?? []).map((a2) => multiaddr(a2.multiaddr));
    const seqNumber = peerRecord.seq;
    return new _PeerRecord({ peerId, multiaddrs, seqNumber });
  };
  static DOMAIN = ENVELOPE_DOMAIN_PEER_RECORD;
  static CODEC = ENVELOPE_PAYLOAD_TYPE_PEER_RECORD;
  peerId;
  multiaddrs;
  seqNumber;
  domain = _PeerRecord.DOMAIN;
  codec = _PeerRecord.CODEC;
  marshaled;
  constructor(init2) {
    const { peerId, multiaddrs, seqNumber } = init2;
    this.peerId = peerId;
    this.multiaddrs = multiaddrs ?? [];
    this.seqNumber = seqNumber ?? BigInt(Date.now());
  }
  /**
   * Marshal a record to be used in an envelope
   */
  marshal() {
    if (this.marshaled == null) {
      this.marshaled = PeerRecord.encode({
        peerId: this.peerId.toMultihash().bytes,
        seq: BigInt(this.seqNumber),
        addresses: this.multiaddrs.map((m2) => ({
          multiaddr: m2.bytes
        }))
      });
    }
    return this.marshaled;
  }
  /**
   * Returns true if `this` record equals the `other`
   */
  equals(other) {
    if (!(other instanceof _PeerRecord)) {
      return false;
    }
    if (!this.peerId.equals(other.peerId)) {
      return false;
    }
    if (this.seqNumber !== other.seqNumber) {
      return false;
    }
    if (!arrayEquals(this.multiaddrs, other.multiaddrs)) {
      return false;
    }
    return true;
  }
};

// node_modules/it-all/dist/src/index.js
function isAsyncIterable(thing) {
  return thing[Symbol.asyncIterator] != null;
}
function all(source) {
  if (isAsyncIterable(source)) {
    return (async () => {
      const arr2 = [];
      for await (const entry of source) {
        arr2.push(entry);
      }
      return arr2;
    })();
  }
  const arr = [];
  for (const entry of source) {
    arr.push(entry);
  }
  return arr;
}
var src_default2 = all;

// node_modules/abort-error/dist/src/index.js
var AbortError2 = class extends Error {
  static name = "AbortError";
  name = "AbortError";
  constructor(message2 = "The operation was aborted", ...rest) {
    super(message2, ...rest);
  }
};

// node_modules/p-defer/index.js
function pDefer() {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
}

// node_modules/it-pushable/dist/src/fifo.js
var FixedFIFO = class {
  buffer;
  mask;
  top;
  btm;
  next;
  constructor(hwm) {
    if (!(hwm > 0) || (hwm - 1 & hwm) !== 0) {
      throw new Error("Max size for a FixedFIFO should be a power of two");
    }
    this.buffer = new Array(hwm);
    this.mask = hwm - 1;
    this.top = 0;
    this.btm = 0;
    this.next = null;
  }
  push(data) {
    if (this.buffer[this.top] !== void 0) {
      return false;
    }
    this.buffer[this.top] = data;
    this.top = this.top + 1 & this.mask;
    return true;
  }
  shift() {
    const last = this.buffer[this.btm];
    if (last === void 0) {
      return void 0;
    }
    this.buffer[this.btm] = void 0;
    this.btm = this.btm + 1 & this.mask;
    return last;
  }
  isEmpty() {
    return this.buffer[this.btm] === void 0;
  }
};
var FIFO = class {
  size;
  hwm;
  head;
  tail;
  constructor(options = {}) {
    this.hwm = options.splitLimit ?? 16;
    this.head = new FixedFIFO(this.hwm);
    this.tail = this.head;
    this.size = 0;
  }
  calculateSize(obj) {
    if (obj?.byteLength != null) {
      return obj.byteLength;
    }
    return 1;
  }
  push(val) {
    if (val?.value != null) {
      this.size += this.calculateSize(val.value);
    }
    if (!this.head.push(val)) {
      const prev = this.head;
      this.head = prev.next = new FixedFIFO(2 * this.head.buffer.length);
      this.head.push(val);
    }
  }
  shift() {
    let val = this.tail.shift();
    if (val === void 0 && this.tail.next != null) {
      const next = this.tail.next;
      this.tail.next = null;
      this.tail = next;
      val = this.tail.shift();
    }
    if (val?.value != null) {
      this.size -= this.calculateSize(val.value);
    }
    return val;
  }
  isEmpty() {
    return this.head.isEmpty();
  }
};

// node_modules/it-pushable/dist/src/index.js
var AbortError3 = class extends Error {
  type;
  code;
  constructor(message2, code3) {
    super(message2 ?? "The operation was aborted");
    this.type = "aborted";
    this.code = code3 ?? "ABORT_ERR";
  }
};
function pushable(options = {}) {
  const getNext = (buffer) => {
    const next = buffer.shift();
    if (next == null) {
      return { done: true };
    }
    if (next.error != null) {
      throw next.error;
    }
    return {
      done: next.done === true,
      // @ts-expect-error if done is false, value will be present
      value: next.value
    };
  };
  return _pushable(getNext, options);
}
function _pushable(getNext, options) {
  options = options ?? {};
  let onEnd = options.onEnd;
  let buffer = new FIFO();
  let pushable2;
  let onNext;
  let ended;
  let drain2 = pDefer();
  const waitNext = async () => {
    try {
      if (!buffer.isEmpty()) {
        return getNext(buffer);
      }
      if (ended) {
        return { done: true };
      }
      return await new Promise((resolve, reject) => {
        onNext = (next) => {
          onNext = null;
          buffer.push(next);
          try {
            resolve(getNext(buffer));
          } catch (err) {
            reject(err);
          }
          return pushable2;
        };
      });
    } finally {
      if (buffer.isEmpty()) {
        queueMicrotask(() => {
          drain2.resolve();
          drain2 = pDefer();
        });
      }
    }
  };
  const bufferNext = (next) => {
    if (onNext != null) {
      return onNext(next);
    }
    buffer.push(next);
    return pushable2;
  };
  const bufferError = (err) => {
    buffer = new FIFO();
    if (onNext != null) {
      return onNext({ error: err });
    }
    buffer.push({ error: err });
    return pushable2;
  };
  const push = (value2) => {
    if (ended) {
      return pushable2;
    }
    if (options?.objectMode !== true && value2?.byteLength == null) {
      throw new Error("objectMode was not true but tried to push non-Uint8Array value");
    }
    return bufferNext({ done: false, value: value2 });
  };
  const end = (err) => {
    if (ended)
      return pushable2;
    ended = true;
    return err != null ? bufferError(err) : bufferNext({ done: true });
  };
  const _return = () => {
    buffer = new FIFO();
    end();
    return { done: true };
  };
  const _throw = (err) => {
    end(err);
    return { done: true };
  };
  pushable2 = {
    [Symbol.asyncIterator]() {
      return this;
    },
    next: waitNext,
    return: _return,
    throw: _throw,
    push,
    end,
    get readableLength() {
      return buffer.size;
    },
    onEmpty: async (options2) => {
      const signal = options2?.signal;
      signal?.throwIfAborted();
      if (buffer.isEmpty()) {
        return;
      }
      let cancel;
      let listener;
      if (signal != null) {
        cancel = new Promise((resolve, reject) => {
          listener = () => {
            reject(new AbortError3());
          };
          signal.addEventListener("abort", listener);
        });
      }
      try {
        await Promise.race([
          drain2.promise,
          cancel
        ]);
      } finally {
        if (listener != null && signal != null) {
          signal?.removeEventListener("abort", listener);
        }
      }
    }
  };
  if (onEnd == null) {
    return pushable2;
  }
  const _pushable2 = pushable2;
  pushable2 = {
    [Symbol.asyncIterator]() {
      return this;
    },
    next() {
      return _pushable2.next();
    },
    throw(err) {
      _pushable2.throw(err);
      if (onEnd != null) {
        onEnd(err);
        onEnd = void 0;
      }
      return { done: true };
    },
    return() {
      _pushable2.return();
      if (onEnd != null) {
        onEnd();
        onEnd = void 0;
      }
      return { done: true };
    },
    push,
    end(err) {
      _pushable2.end(err);
      if (onEnd != null) {
        onEnd(err);
        onEnd = void 0;
      }
      return pushable2;
    },
    get readableLength() {
      return _pushable2.readableLength;
    },
    onEmpty: (opts) => {
      return _pushable2.onEmpty(opts);
    }
  };
  return pushable2;
}

// node_modules/race-event/dist/src/index.js
async function raceEvent(emitter, eventName, signal, opts) {
  const error = new AbortError2(opts?.errorMessage);
  if (opts?.errorCode != null) {
    error.code = opts.errorCode;
  }
  const errorEvent = opts?.errorEvent ?? "error";
  if (signal?.aborted === true) {
    return Promise.reject(error);
  }
  return new Promise((resolve, reject) => {
    function removeListeners() {
      removeListener(signal, "abort", abortListener);
      removeListener(emitter, eventName, eventListener);
      removeListener(emitter, errorEvent, errorEventListener);
    }
    const eventListener = (evt) => {
      try {
        if (opts?.filter?.(evt) === false) {
          return;
        }
      } catch (err) {
        removeListeners();
        reject(err);
        return;
      }
      removeListeners();
      resolve(evt);
    };
    const errorEventListener = (evt) => {
      removeListeners();
      if (evt instanceof Error) {
        reject(evt);
        return;
      }
      reject(evt.detail ?? opts?.error ?? new Error(`The "${opts?.errorEvent}" event was emitted but the event had no '.detail' field. Pass an 'error' option to race-event to change this message.`));
    };
    const abortListener = () => {
      removeListeners();
      reject(error);
    };
    addListener(signal, "abort", abortListener);
    addListener(emitter, eventName, eventListener);
    addListener(emitter, errorEvent, errorEventListener);
  });
}
function addListener(emitter, event, listener) {
  if (emitter == null) {
    return;
  }
  if (isEventTarget(emitter)) {
    emitter.addEventListener(event, listener);
  } else {
    emitter.addListener(event, listener);
  }
}
function removeListener(emitter, event, listener) {
  if (emitter == null) {
    return;
  }
  if (isEventTarget(emitter)) {
    emitter.removeEventListener(event, listener);
  } else {
    emitter.removeListener(event, listener);
  }
}
function isEventTarget(emitter) {
  return typeof emitter.addEventListener === "function" && typeof emitter.removeEventListener === "function";
}

// node_modules/it-queue/dist/src/errors.js
var QueueFullError = class extends Error {
  static name = "QueueFullError";
  constructor(message2 = "The queue was full") {
    super(message2);
    this.name = "QueueFullError";
  }
};

// node_modules/it-queue/node_modules/race-signal/dist/src/index.js
function defaultTranslate(signal) {
  return signal.reason;
}
async function raceSignal(promise, signal, opts) {
  if (signal == null) {
    return promise;
  }
  const translateError = opts?.translateError ?? defaultTranslate;
  if (signal.aborted) {
    promise.catch(() => {
    });
    return Promise.reject(translateError(signal));
  }
  let listener;
  try {
    return await Promise.race([
      promise,
      new Promise((resolve, reject) => {
        listener = () => {
          reject(translateError(signal));
        };
        signal.addEventListener("abort", listener);
      })
    ]);
  } finally {
    if (listener != null) {
      signal.removeEventListener("abort", listener);
    }
  }
}

// node_modules/it-queue/dist/src/recipient.js
var JobRecipient = class {
  deferred;
  signal;
  constructor(signal) {
    this.signal = signal;
    this.deferred = Promise.withResolvers();
    this.onAbort = this.onAbort.bind(this);
    this.signal?.addEventListener("abort", this.onAbort);
  }
  onAbort() {
    this.deferred.reject(this.signal?.reason ?? new AbortError2());
  }
  cleanup() {
    this.signal?.removeEventListener("abort", this.onAbort);
  }
};

// node_modules/it-queue/dist/src/job.js
function randomId() {
  return `${parseInt(String(Math.random() * 1e9), 10).toString()}${Date.now()}`;
}
var Job = class {
  id;
  fn;
  options;
  recipients;
  status;
  timeline;
  controller;
  constructor(fn, options) {
    this.id = randomId();
    this.status = "queued";
    this.fn = fn;
    this.options = options;
    this.recipients = [];
    this.timeline = {
      created: Date.now()
    };
    this.controller = new AbortController();
    setMaxListeners(Infinity, this.controller.signal);
    this.onAbort = this.onAbort.bind(this);
  }
  abort(err) {
    this.controller.abort(err);
  }
  onAbort() {
    const allAborted = this.recipients.reduce((acc, curr) => {
      return acc && curr.signal?.aborted === true;
    }, true);
    if (allAborted) {
      this.controller.abort(new AbortError2());
      this.cleanup();
    }
  }
  async join(options = {}) {
    const recipient = new JobRecipient(options.signal);
    this.recipients.push(recipient);
    options.signal?.addEventListener("abort", this.onAbort);
    return recipient.deferred.promise;
  }
  async run() {
    this.status = "running";
    this.timeline.started = Date.now();
    try {
      this.controller.signal.throwIfAborted();
      const result = await raceSignal(this.fn({
        ...this.options ?? {},
        signal: this.controller.signal
      }), this.controller.signal);
      this.recipients.forEach((recipient) => {
        recipient.deferred.resolve(result);
      });
      this.status = "complete";
    } catch (err) {
      this.recipients.forEach((recipient) => {
        recipient.deferred.reject(err);
      });
      this.status = "errored";
    } finally {
      this.timeline.finished = Date.now();
      this.cleanup();
    }
  }
  cleanup() {
    this.recipients.forEach((recipient) => {
      recipient.cleanup();
      recipient.signal?.removeEventListener("abort", this.onAbort);
    });
  }
};

// node_modules/it-queue/dist/src/utils.js
function debounce(func, wait) {
  let timeout;
  const output = function() {
    const later = function() {
      timeout = void 0;
      void func();
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
  output.start = () => {
  };
  output.stop = () => {
    clearTimeout(timeout);
  };
  return output;
}

// node_modules/it-queue/dist/src/index.js
var Queue = class extends TypedEventEmitter {
  concurrency;
  maxSize;
  queue;
  pending;
  sort;
  autoStart;
  constructor(init2 = {}) {
    super();
    this.concurrency = init2.concurrency ?? Number.POSITIVE_INFINITY;
    this.maxSize = init2.maxSize ?? Number.POSITIVE_INFINITY;
    this.pending = 0;
    this.autoStart = init2.autoStart ?? true;
    this.sort = init2.sort;
    this.queue = [];
    this.emitEmpty = debounce(this.emitEmpty.bind(this), 1);
    this.emitIdle = debounce(this.emitIdle.bind(this), 1);
  }
  [Symbol.asyncIterator]() {
    return this.toGenerator();
  }
  emitEmpty() {
    if (this.size !== 0) {
      return;
    }
    this.safeDispatchEvent("empty");
  }
  emitIdle() {
    if (this.running !== 0) {
      return;
    }
    this.safeDispatchEvent("idle");
  }
  tryToStartAnother() {
    if (this.size === 0) {
      this.emitEmpty();
      if (this.running === 0) {
        this.emitIdle();
      }
      return false;
    }
    if (this.pending < this.concurrency) {
      let job;
      for (const j of this.queue) {
        if (j.status === "queued") {
          job = j;
          break;
        }
      }
      if (job == null) {
        return false;
      }
      this.safeDispatchEvent("active");
      this.pending++;
      void job.run().finally(() => {
        for (let i2 = 0; i2 < this.queue.length; i2++) {
          if (this.queue[i2] === job) {
            this.queue.splice(i2, 1);
            break;
          }
        }
        this.pending--;
        this.safeDispatchEvent("next");
        if (this.autoStart) {
          this.tryToStartAnother();
        }
      });
      return true;
    }
    return false;
  }
  enqueue(job) {
    this.queue.push(job);
    if (this.sort != null) {
      this.queue.sort(this.sort);
    }
  }
  /**
   * Start the queue. If the `autoStart` parameter passed to the constructor was
   * not `false` this is a no-op
   */
  start() {
    if (this.autoStart !== false) {
      return;
    }
    this.autoStart = true;
    this.tryToStartAnother();
  }
  /**
   * Prevent further jobs from running - call `.start` to start the queue again
   */
  pause() {
    this.autoStart = false;
  }
  /**
   * Adds a sync or async task to the queue. Always returns a promise.
   */
  async add(fn, options) {
    options?.signal?.throwIfAborted();
    if (this.size === this.maxSize) {
      throw new QueueFullError();
    }
    const job = new Job(fn, options);
    this.enqueue(job);
    this.safeDispatchEvent("add");
    if (this.autoStart) {
      this.tryToStartAnother();
    }
    return job.join(options).then((result) => {
      this.safeDispatchEvent("success", { detail: { job, result } });
      return result;
    }).catch((err) => {
      if (job.status === "queued") {
        for (let i2 = 0; i2 < this.queue.length; i2++) {
          if (this.queue[i2] === job) {
            this.queue.splice(i2, 1);
            break;
          }
        }
      }
      this.safeDispatchEvent("failure", { detail: { job, error: err } });
      throw err;
    });
  }
  /**
   * Clear the queue
   */
  clear() {
    this.queue.splice(0, this.queue.length);
  }
  /**
   * Abort all jobs in the queue and clear it
   */
  abort() {
    this.queue.forEach((job) => {
      job.abort(new AbortError2());
    });
    this.clear();
  }
  /**
   * Can be called multiple times. Useful if you for example add additional items at a later time.
   *
   * @returns A promise that settles when the queue becomes empty.
   */
  async onEmpty(options) {
    if (this.size === 0) {
      return;
    }
    await raceEvent(this, "empty", options?.signal);
  }
  /**
   * @returns A promise that settles when the queue size is less than the given
   * limit: `queue.size < limit`.
   *
   * If you want to avoid having the queue grow beyond a certain size you can
   * `await queue.onSizeLessThan()` before adding a new item.
   *
   * Note that this only limits the number of items waiting to start. There
   * could still be up to `concurrency` jobs already running that this call does
   * not include in its calculation.
   */
  async onSizeLessThan(limit, options) {
    if (this.size < limit) {
      return;
    }
    await raceEvent(this, "next", options?.signal, {
      filter: () => this.size < limit
    });
  }
  /**
   * The difference with `.onEmpty` is that `.onIdle` guarantees that all work
   * from the queue has finished. `.onEmpty` merely signals that the queue is
   * empty, but it could mean that some promises haven't completed yet.
   *
   * @returns A promise that settles when the queue becomes empty, and all
   * promises have completed; `queue.size === 0 && queue.pending === 0`.
   */
  async onIdle(options) {
    if (this.pending === 0 && this.size === 0) {
      return;
    }
    await raceEvent(this, "idle", options?.signal);
  }
  /**
   * Size of the queue including running items
   */
  get size() {
    return this.queue.length;
  }
  /**
   * The number of queued items waiting to run.
   */
  get queued() {
    return this.queue.length - this.pending;
  }
  /**
   * The number of items currently running.
   */
  get running() {
    return this.pending;
  }
  /**
   * Returns an async generator that makes it easy to iterate over the results
   * of jobs added to the queue.
   *
   * The generator will end when the queue becomes idle, that is there are no
   * jobs running and no jobs that have yet to run.
   *
   * If you need to keep the queue open indefinitely, consider using it-pushable
   * instead.
   */
  async *toGenerator(options) {
    options?.signal?.throwIfAborted();
    const stream = pushable({
      objectMode: true
    });
    const cleanup = (err) => {
      if (err != null) {
        this.abort();
      } else {
        this.clear();
      }
      stream.end(err);
    };
    const onQueueJobComplete = (evt) => {
      if (evt.detail != null) {
        stream.push(evt.detail.result);
      }
    };
    const onQueueError = (evt) => {
      cleanup(evt.detail.error);
    };
    const onQueueIdle = () => {
      cleanup();
    };
    const onSignalAbort = () => {
      cleanup(new AbortError2("Queue aborted"));
    };
    this.addEventListener("success", onQueueJobComplete);
    this.addEventListener("failure", onQueueError);
    this.addEventListener("idle", onQueueIdle);
    options?.signal?.addEventListener("abort", onSignalAbort);
    try {
      yield* stream;
    } finally {
      this.removeEventListener("success", onQueueJobComplete);
      this.removeEventListener("failure", onQueueError);
      this.removeEventListener("idle", onQueueIdle);
      options?.signal?.removeEventListener("abort", onSignalAbort);
      cleanup();
    }
  }
};

// node_modules/mortice/dist/src/node.js
var import_node_cluster = __toESM(require("node:cluster"), 1);
var import_node_worker_threads = __toESM(require("node:worker_threads"), 1);

// node_modules/mortice/dist/src/constants.js
var WORKER_REQUEST_READ_LOCK = "lock:worker:request-read";
var WORKER_ABORT_READ_LOCK_REQUEST = "lock:worker:abort-read-request";
var WORKER_RELEASE_READ_LOCK = "lock:worker:release-read";
var MASTER_GRANT_READ_LOCK = "lock:master:grant-read";
var MASTER_READ_LOCK_ERROR = "lock:master:error-read";
var WORKER_REQUEST_WRITE_LOCK = "lock:worker:request-write";
var WORKER_ABORT_WRITE_LOCK_REQUEST = "lock:worker:abort-write-request";
var WORKER_RELEASE_WRITE_LOCK = "lock:worker:release-write";
var MASTER_GRANT_WRITE_LOCK = "lock:master:grant-write";
var MASTER_WRITE_LOCK_ERROR = "lock:master:error-write";
var WORKER_FINALIZE = "lock:worker:finalize";
var BROADCAST_CHANNEL_NAME = "mortice";
var defaultOptions = {
  singleProcess: false
};

// node_modules/mortice/dist/src/main/channel.js
var handleChannelWorkerLockRequest = (emitter, channel, masterEvent, abortMasterEvent, requestType, abortType, errorType, releaseType, grantType) => {
  return (event) => {
    if (event.data == null) {
      return;
    }
    const requestEvent = {
      type: event.data.type,
      name: event.data.name,
      identifier: event.data.identifier
    };
    if (requestEvent.type === requestType) {
      emitter.safeDispatchEvent(masterEvent, {
        detail: {
          name: requestEvent.name,
          identifier: requestEvent.identifier,
          handler: async () => {
            channel.postMessage({
              type: grantType,
              name: requestEvent.name,
              identifier: requestEvent.identifier
            });
            await new Promise((resolve) => {
              const releaseEventListener = (event2) => {
                if (event2?.data == null) {
                  return;
                }
                const releaseEvent = {
                  type: event2.data.type,
                  name: event2.data.name,
                  identifier: event2.data.identifier
                };
                if (releaseEvent.type === releaseType && releaseEvent.identifier === requestEvent.identifier) {
                  channel.removeEventListener("message", releaseEventListener);
                  resolve();
                }
              };
              channel.addEventListener("message", releaseEventListener);
            });
          },
          onError: (err) => {
            channel.postMessage({
              type: errorType,
              name: requestEvent.name,
              identifier: requestEvent.identifier,
              error: {
                message: err.message,
                name: err.name,
                stack: err.stack
              }
            });
          }
        }
      });
    }
    if (requestEvent.type === abortType) {
      emitter.safeDispatchEvent(abortMasterEvent, {
        detail: {
          name: requestEvent.name,
          identifier: requestEvent.identifier
        }
      });
    }
    if (requestEvent.type === WORKER_FINALIZE) {
      emitter.safeDispatchEvent("finalizeRequest", {
        detail: {
          name: requestEvent.name
        }
      });
    }
  };
};

// node_modules/mortice/dist/src/main/cluster.js
var handleClusterWorkerLockRequest = (emitter, masterEvent, abortMasterEvent, requestType, abortType, errorType, releaseType, grantType) => {
  return (worker2, requestEvent) => {
    if (requestEvent == null) {
      return;
    }
    if (requestEvent.type === requestType) {
      emitter.safeDispatchEvent(masterEvent, {
        detail: {
          name: requestEvent.name,
          identifier: requestEvent.identifier,
          handler: async () => {
            worker2.send({
              type: grantType,
              name: requestEvent.name,
              identifier: requestEvent.identifier
            });
            await new Promise((resolve) => {
              const releaseEventListener = (releaseEvent) => {
                if (releaseEvent.type === releaseType && releaseEvent.identifier === requestEvent.identifier) {
                  worker2.removeListener("message", releaseEventListener);
                  resolve();
                }
              };
              worker2.on("message", releaseEventListener);
            });
          },
          onError: (err) => {
            worker2.send({
              type: errorType,
              name: requestEvent.name,
              identifier: requestEvent.identifier,
              error: {
                message: err.message,
                name: err.name,
                stack: err.stack
              }
            });
          }
        }
      });
    }
    if (requestEvent.type === abortType) {
      emitter.safeDispatchEvent(abortMasterEvent, {
        detail: {
          name: requestEvent.name,
          identifier: requestEvent.identifier
        }
      });
    }
    if (requestEvent.type === WORKER_FINALIZE) {
      emitter.safeDispatchEvent("finalizeRequest", {
        detail: {
          name: requestEvent.name
        }
      });
    }
  };
};

// node_modules/mortice/dist/src/utils.js
var nanoid = (size = 10) => {
  return Math.random().toString().substring(2, size + 2);
};

// node_modules/mortice/dist/src/workers/channel.js
var MorticeChannelWorker = class {
  name;
  channel;
  constructor(name3) {
    this.name = name3;
    this.channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
  }
  readLock(options) {
    return this.sendRequest(WORKER_REQUEST_READ_LOCK, WORKER_ABORT_READ_LOCK_REQUEST, MASTER_GRANT_READ_LOCK, MASTER_READ_LOCK_ERROR, WORKER_RELEASE_READ_LOCK, options);
  }
  writeLock(options) {
    return this.sendRequest(WORKER_REQUEST_WRITE_LOCK, WORKER_ABORT_WRITE_LOCK_REQUEST, MASTER_GRANT_WRITE_LOCK, MASTER_WRITE_LOCK_ERROR, WORKER_RELEASE_WRITE_LOCK, options);
  }
  finalize() {
    this.channel.postMessage({
      type: WORKER_FINALIZE,
      name: this.name
    });
    this.channel.close();
  }
  async sendRequest(requestType, abortType, grantType, errorType, releaseType, options) {
    options?.signal?.throwIfAborted();
    const id = nanoid();
    this.channel.postMessage({
      type: requestType,
      identifier: id,
      name: this.name
    });
    return new Promise((resolve, reject) => {
      const abortListener = () => {
        this.channel.postMessage({
          type: abortType,
          identifier: id,
          name: this.name
        });
      };
      options?.signal?.addEventListener("abort", abortListener, {
        once: true
      });
      const listener = (event) => {
        if (event.data?.identifier !== id) {
          return;
        }
        if (event.data?.type === grantType) {
          this.channel.removeEventListener("message", listener);
          options?.signal?.removeEventListener("abort", abortListener);
          resolve(() => {
            this.channel.postMessage({
              type: releaseType,
              identifier: id,
              name: this.name
            });
          });
        }
        if (event.data.type === errorType) {
          this.channel.removeEventListener("message", listener);
          options?.signal?.removeEventListener("abort", abortListener);
          const err = new Error();
          if (event.data.error != null) {
            err.message = event.data.error.message;
            err.name = event.data.error.name;
            err.stack = event.data.error.stack;
          }
          reject(err);
        }
      };
      this.channel.addEventListener("message", listener);
    });
  }
};

// node_modules/mortice/dist/src/workers/cluster.js
var MorticeClusterWorker = class {
  name;
  constructor(name3) {
    this.name = name3;
  }
  readLock(options) {
    return this.sendRequest(WORKER_REQUEST_READ_LOCK, WORKER_ABORT_READ_LOCK_REQUEST, MASTER_GRANT_READ_LOCK, MASTER_READ_LOCK_ERROR, WORKER_RELEASE_READ_LOCK, options);
  }
  writeLock(options) {
    return this.sendRequest(WORKER_REQUEST_WRITE_LOCK, WORKER_ABORT_WRITE_LOCK_REQUEST, MASTER_GRANT_WRITE_LOCK, MASTER_WRITE_LOCK_ERROR, WORKER_RELEASE_WRITE_LOCK, options);
  }
  finalize() {
    if (process.send == null) {
      throw new Error("No send method on process - are we a cluster worker?");
    }
    process.send({
      type: WORKER_FINALIZE,
      identifier: nanoid(),
      name: this.name
    });
  }
  async sendRequest(requestType, abortType, grantType, errorType, releaseType, options) {
    options?.signal?.throwIfAborted();
    const id = nanoid();
    if (process.send == null) {
      throw new Error("No send method on process - are we a cluster worker?");
    }
    process.send({
      type: requestType,
      identifier: id,
      name: this.name
    });
    return new Promise((resolve, reject) => {
      const abortListener = () => {
        process.send?.({
          type: abortType,
          identifier: id,
          name: this.name
        });
      };
      options?.signal?.addEventListener("abort", abortListener, {
        once: true
      });
      const listener = (event) => {
        if (event.identifier !== id) {
          return;
        }
        if (event.type === grantType) {
          process.removeListener("message", listener);
          options?.signal?.removeEventListener("abort", abortListener);
          resolve(() => {
            process.send?.({
              type: releaseType,
              identifier: id,
              name: this.name
            });
          });
        }
        if (event.type === errorType) {
          process.removeListener("message", listener);
          options?.signal?.removeEventListener("abort", abortListener);
          const err = new Error();
          if (event.error != null) {
            err.message = event.error.message;
            err.name = event.error.name;
            err.stack = event.error.stack;
          }
          reject(err);
        }
      };
      process.on("message", listener);
    });
  }
};

// node_modules/mortice/dist/src/node.js
function isMain() {
  if (import_node_worker_threads.default.isMainThread === false) {
    return false;
  }
  if (import_node_worker_threads.default.isInternalThread === true) {
    return false;
  }
  return import_node_cluster.default.isPrimary;
}
var node_default2 = (options) => {
  options = Object.assign({}, defaultOptions, options);
  if (isMain() || options.singleProcess) {
    const emitter = new TypedEventEmitter();
    import_node_cluster.default.on("message", handleClusterWorkerLockRequest(emitter, "requestReadLock", "abortReadLockRequest", WORKER_REQUEST_READ_LOCK, WORKER_ABORT_READ_LOCK_REQUEST, MASTER_READ_LOCK_ERROR, WORKER_RELEASE_READ_LOCK, MASTER_GRANT_READ_LOCK));
    import_node_cluster.default.on("message", handleClusterWorkerLockRequest(emitter, "requestWriteLock", "abortWriteLockRequest", WORKER_REQUEST_WRITE_LOCK, WORKER_ABORT_WRITE_LOCK_REQUEST, MASTER_WRITE_LOCK_ERROR, WORKER_RELEASE_WRITE_LOCK, MASTER_GRANT_WRITE_LOCK));
    const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
    channel.addEventListener("message", handleChannelWorkerLockRequest(emitter, channel, "requestReadLock", "abortReadLockRequest", WORKER_REQUEST_READ_LOCK, WORKER_ABORT_READ_LOCK_REQUEST, MASTER_READ_LOCK_ERROR, WORKER_RELEASE_READ_LOCK, MASTER_GRANT_READ_LOCK));
    channel.addEventListener("message", handleChannelWorkerLockRequest(emitter, channel, "requestWriteLock", "abortWriteLockRequest", WORKER_REQUEST_WRITE_LOCK, WORKER_ABORT_WRITE_LOCK_REQUEST, MASTER_WRITE_LOCK_ERROR, WORKER_RELEASE_WRITE_LOCK, MASTER_GRANT_WRITE_LOCK));
    channel.unref?.();
    return emitter;
  }
  if (import_node_cluster.default.isWorker) {
    return new MorticeClusterWorker(options.name);
  }
  if (import_node_worker_threads.default.isMainThread === false) {
    return new MorticeChannelWorker(options.name);
  }
  throw new Error("Not a cluster worker or worker thread");
};

// node_modules/mortice/dist/src/mortice.js
var mutexes = /* @__PURE__ */ new Map();
var implementation;
function isMortice(obj) {
  return typeof obj?.readLock === "function" && typeof obj?.writeLock === "function";
}
function getImplementation(opts) {
  if (implementation == null) {
    implementation = node_default2(opts);
    if (!isMortice(implementation)) {
      const emitter = implementation;
      emitter.addEventListener("requestReadLock", (event) => {
        const mutexName = event.detail.name;
        const identifier = event.detail.identifier;
        const mutex = mutexes.get(mutexName);
        if (mutex == null) {
          return;
        }
        const abortController = new AbortController();
        const abortListener = (event2) => {
          if (event2.detail.name !== mutexName || event2.detail.identifier !== identifier) {
            return;
          }
          abortController.abort();
        };
        emitter.addEventListener("abortReadLockRequest", abortListener);
        void mutex.readLock({
          signal: abortController.signal
        }).then(async (release) => {
          await event.detail.handler().finally(() => {
            release();
          });
        }).catch((err) => {
          event.detail.onError(err);
        }).finally(() => {
          emitter.removeEventListener("abortReadLockRequest", abortListener);
        });
      });
      emitter.addEventListener("requestWriteLock", (event) => {
        const mutexName = event.detail.name;
        const identifier = event.detail.identifier;
        const mutex = mutexes.get(mutexName);
        if (mutex == null) {
          return;
        }
        const abortController = new AbortController();
        const abortListener = (event2) => {
          if (event2.detail.name !== mutexName || event2.detail.identifier !== identifier) {
            return;
          }
          abortController.abort();
        };
        emitter.addEventListener("abortWriteLockRequest", abortListener);
        void mutex.writeLock({
          signal: abortController.signal
        }).then(async (release) => {
          await event.detail.handler().finally(() => {
            release();
          });
        }).catch((err) => {
          event.detail.onError(err);
        }).finally(() => {
          emitter.removeEventListener("abortWriteLockRequest", abortListener);
        });
      });
      emitter.addEventListener("finalizeRequest", (event) => {
        const mutexName = event.detail.name;
        const mutex = mutexes.get(mutexName);
        if (mutex == null) {
          return;
        }
        mutex.finalize();
      });
    }
  }
  return implementation;
}
async function createReleasable(queue, options) {
  let res;
  let rej;
  const p2 = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  const listener = () => {
    rej(new AbortError2());
  };
  options?.signal?.addEventListener("abort", listener, {
    once: true
  });
  queue.add(async () => {
    await new Promise((resolve) => {
      res(() => {
        options?.signal?.removeEventListener("abort", listener);
        resolve();
      });
    });
  }, {
    signal: options?.signal
  }).catch((err) => {
    rej(err);
  });
  return p2;
}
var createMutex = (name3, options) => {
  let mutex = mutexes.get(name3);
  if (mutex != null) {
    return mutex;
  }
  const implementation2 = getImplementation(options);
  if (isMortice(implementation2)) {
    mutex = implementation2;
    mutexes.set(name3, mutex);
    return mutex;
  }
  const masterQueue = new Queue({
    concurrency: 1
  });
  let readQueue;
  mutex = {
    async readLock(opts) {
      if (readQueue != null) {
        return createReleasable(readQueue, opts);
      }
      readQueue = new Queue({
        concurrency: options.concurrency,
        autoStart: false
      });
      const localReadQueue = readQueue;
      const readPromise = createReleasable(readQueue, opts);
      void masterQueue.add(async () => {
        localReadQueue.start();
        await localReadQueue.onIdle().then(() => {
          if (readQueue === localReadQueue) {
            readQueue = null;
          }
        });
      });
      return readPromise;
    },
    async writeLock(opts) {
      readQueue = null;
      return createReleasable(masterQueue, opts);
    },
    finalize: () => {
      mutexes.delete(name3);
    },
    queue: masterQueue
  };
  mutexes.set(name3, mutex);
  if (options.autoFinalize === true) {
    masterQueue.addEventListener("idle", () => {
      mutex.finalize();
    }, {
      once: true
    });
  }
  return mutex;
};

// node_modules/mortice/dist/src/index.js
var defaultOptions2 = {
  name: "lock",
  concurrency: Infinity,
  singleProcess: false,
  autoFinalize: false
};
function createMortice(options) {
  const opts = Object.assign({}, defaultOptions2, options);
  return createMutex(opts.name, opts);
}

// node_modules/@libp2p/peer-store/dist/src/constants.js
var MAX_ADDRESS_AGE = 36e5;
var MAX_PEER_AGE = 216e5;

// node_modules/@libp2p/peer-store/dist/src/pb/peer.js
var Peer;
(function(Peer2) {
  let Peer$metadataEntry;
  (function(Peer$metadataEntry2) {
    let _codec2;
    Peer$metadataEntry2.codec = () => {
      if (_codec2 == null) {
        _codec2 = message((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork();
          }
          if (obj.key != null && obj.key !== "") {
            w.uint32(10);
            w.string(obj.key);
          }
          if (obj.value != null && obj.value.byteLength > 0) {
            w.uint32(18);
            w.bytes(obj.value);
          }
          if (opts.lengthDelimited !== false) {
            w.ldelim();
          }
        }, (reader, length3, opts = {}) => {
          const obj = {
            key: "",
            value: alloc(0)
          };
          const end = length3 == null ? reader.len : reader.pos + length3;
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                obj.key = reader.string();
                break;
              }
              case 2: {
                obj.value = reader.bytes();
                break;
              }
              default: {
                reader.skipType(tag & 7);
                break;
              }
            }
          }
          return obj;
        });
      }
      return _codec2;
    };
    Peer$metadataEntry2.encode = (obj) => {
      return encodeMessage(obj, Peer$metadataEntry2.codec());
    };
    Peer$metadataEntry2.decode = (buf, opts) => {
      return decodeMessage(buf, Peer$metadataEntry2.codec(), opts);
    };
  })(Peer$metadataEntry = Peer2.Peer$metadataEntry || (Peer2.Peer$metadataEntry = {}));
  let Peer$tagsEntry;
  (function(Peer$tagsEntry2) {
    let _codec2;
    Peer$tagsEntry2.codec = () => {
      if (_codec2 == null) {
        _codec2 = message((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork();
          }
          if (obj.key != null && obj.key !== "") {
            w.uint32(10);
            w.string(obj.key);
          }
          if (obj.value != null) {
            w.uint32(18);
            Tag.codec().encode(obj.value, w);
          }
          if (opts.lengthDelimited !== false) {
            w.ldelim();
          }
        }, (reader, length3, opts = {}) => {
          const obj = {
            key: ""
          };
          const end = length3 == null ? reader.len : reader.pos + length3;
          while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                obj.key = reader.string();
                break;
              }
              case 2: {
                obj.value = Tag.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.value
                });
                break;
              }
              default: {
                reader.skipType(tag & 7);
                break;
              }
            }
          }
          return obj;
        });
      }
      return _codec2;
    };
    Peer$tagsEntry2.encode = (obj) => {
      return encodeMessage(obj, Peer$tagsEntry2.codec());
    };
    Peer$tagsEntry2.decode = (buf, opts) => {
      return decodeMessage(buf, Peer$tagsEntry2.codec(), opts);
    };
  })(Peer$tagsEntry = Peer2.Peer$tagsEntry || (Peer2.Peer$tagsEntry = {}));
  let _codec;
  Peer2.codec = () => {
    if (_codec == null) {
      _codec = message((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork();
        }
        if (obj.addresses != null) {
          for (const value2 of obj.addresses) {
            w.uint32(10);
            Address.codec().encode(value2, w);
          }
        }
        if (obj.protocols != null) {
          for (const value2 of obj.protocols) {
            w.uint32(18);
            w.string(value2);
          }
        }
        if (obj.publicKey != null) {
          w.uint32(34);
          w.bytes(obj.publicKey);
        }
        if (obj.peerRecordEnvelope != null) {
          w.uint32(42);
          w.bytes(obj.peerRecordEnvelope);
        }
        if (obj.metadata != null && obj.metadata.size !== 0) {
          for (const [key, value2] of obj.metadata.entries()) {
            w.uint32(50);
            Peer2.Peer$metadataEntry.codec().encode({ key, value: value2 }, w);
          }
        }
        if (obj.tags != null && obj.tags.size !== 0) {
          for (const [key, value2] of obj.tags.entries()) {
            w.uint32(58);
            Peer2.Peer$tagsEntry.codec().encode({ key, value: value2 }, w);
          }
        }
        if (obj.updated != null) {
          w.uint32(64);
          w.uint64Number(obj.updated);
        }
        if (opts.lengthDelimited !== false) {
          w.ldelim();
        }
      }, (reader, length3, opts = {}) => {
        const obj = {
          addresses: [],
          protocols: [],
          metadata: /* @__PURE__ */ new Map(),
          tags: /* @__PURE__ */ new Map()
        };
        const end = length3 == null ? reader.len : reader.pos + length3;
        while (reader.pos < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.addresses != null && obj.addresses.length === opts.limits.addresses) {
                throw new MaxLengthError('Decode error - map field "addresses" had too many elements');
              }
              obj.addresses.push(Address.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.addresses$
              }));
              break;
            }
            case 2: {
              if (opts.limits?.protocols != null && obj.protocols.length === opts.limits.protocols) {
                throw new MaxLengthError('Decode error - map field "protocols" had too many elements');
              }
              obj.protocols.push(reader.string());
              break;
            }
            case 4: {
              obj.publicKey = reader.bytes();
              break;
            }
            case 5: {
              obj.peerRecordEnvelope = reader.bytes();
              break;
            }
            case 6: {
              if (opts.limits?.metadata != null && obj.metadata.size === opts.limits.metadata) {
                throw new MaxSizeError('Decode error - map field "metadata" had too many elements');
              }
              const entry = Peer2.Peer$metadataEntry.codec().decode(reader, reader.uint32());
              obj.metadata.set(entry.key, entry.value);
              break;
            }
            case 7: {
              if (opts.limits?.tags != null && obj.tags.size === opts.limits.tags) {
                throw new MaxSizeError('Decode error - map field "tags" had too many elements');
              }
              const entry = Peer2.Peer$tagsEntry.codec().decode(reader, reader.uint32(), {
                limits: {
                  value: opts.limits?.tags$value
                }
              });
              obj.tags.set(entry.key, entry.value);
              break;
            }
            case 8: {
              obj.updated = reader.uint64Number();
              break;
            }
            default: {
              reader.skipType(tag & 7);
              break;
            }
          }
        }
        return obj;
      });
    }
    return _codec;
  };
  Peer2.encode = (obj) => {
    return encodeMessage(obj, Peer2.codec());
  };
  Peer2.decode = (buf, opts) => {
    return decodeMessage(buf, Peer2.codec(), opts);
  };
})(Peer || (Peer = {}));
var Address;
(function(Address2) {
  let _codec;
  Address2.codec = () => {
    if (_codec == null) {
      _codec = message((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork();
        }
        if (obj.multiaddr != null && obj.multiaddr.byteLength > 0) {
          w.uint32(10);
          w.bytes(obj.multiaddr);
        }
        if (obj.isCertified != null) {
          w.uint32(16);
          w.bool(obj.isCertified);
        }
        if (obj.observed != null) {
          w.uint32(24);
          w.uint64Number(obj.observed);
        }
        if (opts.lengthDelimited !== false) {
          w.ldelim();
        }
      }, (reader, length3, opts = {}) => {
        const obj = {
          multiaddr: alloc(0)
        };
        const end = length3 == null ? reader.len : reader.pos + length3;
        while (reader.pos < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1: {
              obj.multiaddr = reader.bytes();
              break;
            }
            case 2: {
              obj.isCertified = reader.bool();
              break;
            }
            case 3: {
              obj.observed = reader.uint64Number();
              break;
            }
            default: {
              reader.skipType(tag & 7);
              break;
            }
          }
        }
        return obj;
      });
    }
    return _codec;
  };
  Address2.encode = (obj) => {
    return encodeMessage(obj, Address2.codec());
  };
  Address2.decode = (buf, opts) => {
    return decodeMessage(buf, Address2.codec(), opts);
  };
})(Address || (Address = {}));
var Tag;
(function(Tag2) {
  let _codec;
  Tag2.codec = () => {
    if (_codec == null) {
      _codec = message((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork();
        }
        if (obj.value != null && obj.value !== 0) {
          w.uint32(8);
          w.uint32(obj.value);
        }
        if (obj.expiry != null) {
          w.uint32(16);
          w.uint64(obj.expiry);
        }
        if (opts.lengthDelimited !== false) {
          w.ldelim();
        }
      }, (reader, length3, opts = {}) => {
        const obj = {
          value: 0
        };
        const end = length3 == null ? reader.len : reader.pos + length3;
        while (reader.pos < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1: {
              obj.value = reader.uint32();
              break;
            }
            case 2: {
              obj.expiry = reader.uint64();
              break;
            }
            default: {
              reader.skipType(tag & 7);
              break;
            }
          }
        }
        return obj;
      });
    }
    return _codec;
  };
  Tag2.encode = (obj) => {
    return encodeMessage(obj, Tag2.codec());
  };
  Tag2.decode = (buf, opts) => {
    return decodeMessage(buf, Tag2.codec(), opts);
  };
})(Tag || (Tag = {}));

// node_modules/@libp2p/peer-store/dist/src/utils/bytes-to-peer.js
function populatePublicKey(peerId, protobuf) {
  if (peerId.publicKey != null || protobuf.publicKey == null) {
    return peerId;
  }
  let digest3;
  if (peerId.type === "RSA") {
    digest3 = peerId.toMultihash();
  }
  const publicKey = publicKeyFromProtobuf(protobuf.publicKey, digest3);
  return peerIdFromPublicKey(publicKey);
}
function bytesToPeer(peerId, buf, maxAddressAge) {
  const peer = Peer.decode(buf);
  return pbToPeer(peerId, peer, maxAddressAge);
}
function pbToPeer(peerId, peer, maxAddressAge) {
  const tags = /* @__PURE__ */ new Map();
  const now = BigInt(Date.now());
  for (const [key, tag] of peer.tags.entries()) {
    if (tag.expiry != null && tag.expiry < now) {
      continue;
    }
    tags.set(key, tag);
  }
  return {
    ...peer,
    id: populatePublicKey(peerId, peer),
    addresses: peer.addresses.filter(({ observed }) => observed != null && observed > Date.now() - maxAddressAge).map(({ multiaddr: ma, isCertified }) => {
      return {
        multiaddr: multiaddr(ma),
        isCertified: isCertified ?? false
      };
    }),
    metadata: peer.metadata,
    peerRecordEnvelope: peer.peerRecordEnvelope ?? void 0,
    tags
  };
}

// node_modules/@libp2p/peer-store/dist/src/utils/peer-equals.js
function peerEquals(peerA, peerB) {
  return addressesEqual(peerA.addresses, peerB.addresses) && protocolsEqual(peerA.protocols, peerB.protocols) && publicKeyEqual(peerA.publicKey, peerB.publicKey) && peerRecordEnvelope(peerA.peerRecordEnvelope, peerB.peerRecordEnvelope) && metadataEqual(peerA.metadata, peerB.metadata) && tagsEqual(peerA.tags, peerB.tags);
}
function addressesEqual(addressesA, addressesB) {
  return compareArrays(addressesA, addressesB, (a2, b) => {
    if (a2.isCertified !== b.isCertified) {
      return false;
    }
    if (!equals3(a2.multiaddr, b.multiaddr)) {
      return false;
    }
    return true;
  });
}
function protocolsEqual(protocolsA, protocolsB) {
  return compareArrays(protocolsA, protocolsB, (a2, b) => a2 === b);
}
function publicKeyEqual(publicKeyA, publicKeyB) {
  return compareOptionalUint8Arrays(publicKeyA, publicKeyB);
}
function peerRecordEnvelope(envelopeA, envelopeB) {
  return compareOptionalUint8Arrays(envelopeA, envelopeB);
}
function metadataEqual(metadataA, metadataB) {
  return compareMaps(metadataA, metadataB, (a2, b) => equals3(a2, b));
}
function tagsEqual(metadataA, metadataB) {
  return compareMaps(metadataA, metadataB, (a2, b) => a2.value === b.value && a2.expiry === b.expiry);
}
function compareOptionalUint8Arrays(arrA, arrB) {
  if (arrA == null && arrB == null) {
    return true;
  }
  if (arrA != null && arrB != null) {
    return equals3(arrA, arrB);
  }
  return false;
}
function compareArrays(arrA, arrB, compare2) {
  if (arrA.length !== arrB.length) {
    return false;
  }
  for (let i2 = 0; i2 < arrA.length; i2++) {
    if (!compare2(arrA[i2], arrB[i2])) {
      return false;
    }
  }
  return true;
}
function compareMaps(mapA, mapB, compare2) {
  if (mapA.size !== mapB.size) {
    return false;
  }
  for (const [key, value2] of mapA.entries()) {
    const valueB = mapB.get(key);
    if (valueB == null) {
      return false;
    }
    if (!compare2(value2, valueB)) {
      return false;
    }
  }
  return true;
}

// node_modules/interface-datastore/dist/src/key.js
var pathSepS = "/";
var pathSepB = new TextEncoder().encode(pathSepS);
var pathSep = pathSepB[0];
var Key = class _Key {
  _buf;
  /**
   * @param {string | Uint8Array} s
   * @param {boolean} [clean]
   */
  constructor(s2, clean4) {
    if (typeof s2 === "string") {
      this._buf = fromString2(s2);
    } else if (s2 instanceof Uint8Array) {
      this._buf = s2;
    } else {
      throw new Error("Invalid key, should be String of Uint8Array");
    }
    if (clean4 == null) {
      clean4 = true;
    }
    if (clean4) {
      this.clean();
    }
    if (this._buf.byteLength === 0 || this._buf[0] !== pathSep) {
      throw new Error("Invalid key");
    }
  }
  /**
   * Convert to the string representation
   *
   * @param {import('uint8arrays/to-string').SupportedEncodings} [encoding] - The encoding to use.
   * @returns {string}
   */
  toString(encoding = "utf8") {
    return toString2(this._buf, encoding);
  }
  /**
   * Return the Uint8Array representation of the key
   *
   * @returns {Uint8Array}
   */
  uint8Array() {
    return this._buf;
  }
  /**
   * Return string representation of the key
   *
   * @returns {string}
   */
  get [Symbol.toStringTag]() {
    return `Key(${this.toString()})`;
  }
  /**
   * Constructs a key out of a namespace array.
   *
   * @param {Array<string>} list - The array of namespaces
   * @returns {Key}
   *
   * @example
   * ```js
   * Key.withNamespaces(['one', 'two'])
   * // => Key('/one/two')
   * ```
   */
  static withNamespaces(list) {
    return new _Key(list.join(pathSepS));
  }
  /**
   * Returns a randomly (uuid) generated key.
   *
   * @returns {Key}
   *
   * @example
   * ```js
   * Key.random()
   * // => Key('/344502982398')
   * ```
   */
  static random() {
    return new _Key(Math.random().toString().substring(2));
  }
  /**
   * @param {*} other
   */
  static asKey(other) {
    if (other instanceof Uint8Array || typeof other === "string") {
      return new _Key(other);
    }
    if (typeof other.uint8Array === "function") {
      return new _Key(other.uint8Array());
    }
    return null;
  }
  /**
   * Cleanup the current key
   *
   * @returns {void}
   */
  clean() {
    if (this._buf == null || this._buf.byteLength === 0) {
      this._buf = pathSepB;
    }
    if (this._buf[0] !== pathSep) {
      const bytes = new Uint8Array(this._buf.byteLength + 1);
      bytes.fill(pathSep, 0, 1);
      bytes.set(this._buf, 1);
      this._buf = bytes;
    }
    while (this._buf.byteLength > 1 && this._buf[this._buf.byteLength - 1] === pathSep) {
      this._buf = this._buf.subarray(0, -1);
    }
  }
  /**
   * Check if the given key is sorted lower than ourself.
   *
   * @param {Key} key - The other Key to check against
   * @returns {boolean}
   */
  less(key) {
    const list1 = this.list();
    const list2 = key.list();
    for (let i2 = 0; i2 < list1.length; i2++) {
      if (list2.length < i2 + 1) {
        return false;
      }
      const c1 = list1[i2];
      const c2 = list2[i2];
      if (c1 < c2) {
        return true;
      } else if (c1 > c2) {
        return false;
      }
    }
    return list1.length < list2.length;
  }
  /**
   * Returns the key with all parts in reversed order.
   *
   * @returns {Key}
   *
   * @example
   * ```js
   * new Key('/Comedy/MontyPython/Actor:JohnCleese').reverse()
   * // => Key('/Actor:JohnCleese/MontyPython/Comedy')
   * ```
   */
  reverse() {
    return _Key.withNamespaces(this.list().slice().reverse());
  }
  /**
   * Returns the `namespaces` making up this Key.
   *
   * @returns {Array<string>}
   */
  namespaces() {
    return this.list();
  }
  /**
   * Returns the "base" namespace of this key.
   *
   * @returns {string}
   *
   * @example
   * ```js
   * new Key('/Comedy/MontyPython/Actor:JohnCleese').baseNamespace()
   * // => 'Actor:JohnCleese'
   * ```
   */
  baseNamespace() {
    const ns = this.namespaces();
    return ns[ns.length - 1];
  }
  /**
   * Returns the `list` representation of this key.
   *
   * @returns {Array<string>}
   *
   * @example
   * ```js
   * new Key('/Comedy/MontyPython/Actor:JohnCleese').list()
   * // => ['Comedy', 'MontyPythong', 'Actor:JohnCleese']
   * ```
   */
  list() {
    return this.toString().split(pathSepS).slice(1);
  }
  /**
   * Returns the "type" of this key (value of last namespace).
   *
   * @returns {string}
   *
   * @example
   * ```js
   * new Key('/Comedy/MontyPython/Actor:JohnCleese').type()
   * // => 'Actor'
   * ```
   */
  type() {
    return namespaceType(this.baseNamespace());
  }
  /**
   * Returns the "name" of this key (field of last namespace).
   *
   * @returns {string}
   *
   * @example
   * ```js
   * new Key('/Comedy/MontyPython/Actor:JohnCleese').name()
   * // => 'JohnCleese'
   * ```
   */
  name() {
    return namespaceValue(this.baseNamespace());
  }
  /**
   * Returns an "instance" of this type key (appends value to namespace).
   *
   * @param {string} s - The string to append.
   * @returns {Key}
   *
   * @example
   * ```js
   * new Key('/Comedy/MontyPython/Actor').instance('JohnClesse')
   * // => Key('/Comedy/MontyPython/Actor:JohnCleese')
   * ```
   */
  instance(s2) {
    return new _Key(this.toString() + ":" + s2);
  }
  /**
   * Returns the "path" of this key (parent + type).
   *
   * @returns {Key}
   *
   * @example
   * ```js
   * new Key('/Comedy/MontyPython/Actor:JohnCleese').path()
   * // => Key('/Comedy/MontyPython/Actor')
   * ```
   */
  path() {
    let p2 = this.parent().toString();
    if (!p2.endsWith(pathSepS)) {
      p2 += pathSepS;
    }
    p2 += this.type();
    return new _Key(p2);
  }
  /**
   * Returns the `parent` Key of this Key.
   *
   * @returns {Key}
   *
   * @example
   * ```js
   * new Key("/Comedy/MontyPython/Actor:JohnCleese").parent()
   * // => Key("/Comedy/MontyPython")
   * ```
   */
  parent() {
    const list = this.list();
    if (list.length === 1) {
      return new _Key(pathSepS);
    }
    return new _Key(list.slice(0, -1).join(pathSepS));
  }
  /**
   * Returns the `child` Key of this Key.
   *
   * @param {Key} key - The child Key to add
   * @returns {Key}
   *
   * @example
   * ```js
   * new Key('/Comedy/MontyPython').child(new Key('Actor:JohnCleese'))
   * // => Key('/Comedy/MontyPython/Actor:JohnCleese')
   * ```
   */
  child(key) {
    if (this.toString() === pathSepS) {
      return key;
    } else if (key.toString() === pathSepS) {
      return this;
    }
    return new _Key(this.toString() + key.toString(), false);
  }
  /**
   * Returns whether this key is a prefix of `other`
   *
   * @param {Key} other - The other key to test against
   * @returns {boolean}
   *
   * @example
   * ```js
   * new Key('/Comedy').isAncestorOf('/Comedy/MontyPython')
   * // => true
   * ```
   */
  isAncestorOf(other) {
    if (other.toString() === this.toString()) {
      return false;
    }
    return other.toString().startsWith(this.toString());
  }
  /**
   * Returns whether this key is a contains another as prefix.
   *
   * @param {Key} other - The other Key to test against
   * @returns {boolean}
   *
   * @example
   * ```js
   * new Key('/Comedy/MontyPython').isDecendantOf('/Comedy')
   * // => true
   * ```
   */
  isDecendantOf(other) {
    if (other.toString() === this.toString()) {
      return false;
    }
    return this.toString().startsWith(other.toString());
  }
  /**
   * Checks if this key has only one namespace.
   *
   * @returns {boolean}
   */
  isTopLevel() {
    return this.list().length === 1;
  }
  /**
   * Concats one or more Keys into one new Key.
   *
   * @param {Array<Key>} keys - The array of keys to concatenate
   * @returns {Key}
   */
  concat(...keys) {
    return _Key.withNamespaces([...this.namespaces(), ...flatten(keys.map((key) => key.namespaces()))]);
  }
};
function namespaceType(ns) {
  const parts = ns.split(":");
  if (parts.length < 2) {
    return "";
  }
  return parts.slice(0, -1).join(":");
}
function namespaceValue(ns) {
  const parts = ns.split(":");
  return parts[parts.length - 1];
}
function flatten(arr) {
  return [].concat(...arr);
}

// node_modules/@libp2p/peer-store/dist/src/utils/peer-id-to-datastore-key.js
var NAMESPACE_COMMON = "/peers/";
function peerIdToDatastoreKey(peerId) {
  if (!isPeerId(peerId) || peerId.type == null) {
    throw new InvalidParametersError2("Invalid PeerId");
  }
  const b32key = peerId.toCID().toString();
  return new Key(`${NAMESPACE_COMMON}${b32key}`);
}

// node_modules/@libp2p/peer-store/dist/src/utils/dedupe-addresses.js
async function dedupeFilterAndSortAddresses(peerId, filter2, addresses, existingAddresses, options) {
  const addressMap = /* @__PURE__ */ new Map();
  for (const addr of addresses) {
    if (addr == null) {
      continue;
    }
    if (addr.multiaddr instanceof Uint8Array) {
      addr.multiaddr = multiaddr(addr.multiaddr);
    }
    if (!isMultiaddr(addr.multiaddr)) {
      throw new InvalidParametersError2("Multiaddr was invalid");
    }
    if (!await filter2(peerId, addr.multiaddr, options)) {
      continue;
    }
    const isCertified = addr.isCertified ?? false;
    const maStr = addr.multiaddr.toString();
    const existingAddr = addressMap.get(maStr);
    if (existingAddr != null) {
      addr.isCertified = existingAddr.isCertified || isCertified;
    } else {
      addressMap.set(maStr, {
        multiaddr: addr.multiaddr,
        isCertified
      });
    }
  }
  return [...addressMap.values()].sort((a2, b) => {
    return a2.multiaddr.toString().localeCompare(b.multiaddr.toString());
  }).map(({ isCertified, multiaddr: ma }) => {
    const addrPeer = ma.getPeerId();
    if (peerId.equals(addrPeer)) {
      ma = ma.decapsulate(multiaddr(`/p2p/${peerId}`));
    }
    return {
      isCertified,
      multiaddr: ma.bytes
    };
  });
}

// node_modules/@libp2p/peer-store/dist/src/utils/to-peer-pb.js
async function toPeerPB(peerId, data, strategy, options) {
  if (data == null) {
    throw new InvalidParametersError2("Invalid PeerData");
  }
  if (data.publicKey != null && peerId.publicKey != null && !data.publicKey.equals(peerId.publicKey)) {
    throw new InvalidParametersError2("publicKey bytes do not match peer id publicKey bytes");
  }
  const existingPeer = options.existingPeer?.peer;
  if (existingPeer != null && !peerId.equals(existingPeer.id)) {
    throw new InvalidParametersError2("peer id did not match existing peer id");
  }
  let addresses = existingPeer?.addresses ?? [];
  let protocols2 = new Set(existingPeer?.protocols ?? []);
  let metadata = existingPeer?.metadata ?? /* @__PURE__ */ new Map();
  let tags = existingPeer?.tags ?? /* @__PURE__ */ new Map();
  let peerRecordEnvelope2 = existingPeer?.peerRecordEnvelope;
  if (strategy === "patch") {
    if (data.multiaddrs != null || data.addresses != null) {
      addresses = [];
      if (data.multiaddrs != null) {
        addresses.push(...data.multiaddrs.map((multiaddr2) => ({
          isCertified: false,
          multiaddr: multiaddr2
        })));
      }
      if (data.addresses != null) {
        addresses.push(...data.addresses);
      }
    }
    if (data.protocols != null) {
      protocols2 = new Set(data.protocols);
    }
    if (data.metadata != null) {
      const metadataEntries = data.metadata instanceof Map ? [...data.metadata.entries()] : Object.entries(data.metadata);
      metadata = createSortedMap(metadataEntries, {
        validate: validateMetadata
      });
    }
    if (data.tags != null) {
      const tagsEntries = data.tags instanceof Map ? [...data.tags.entries()] : Object.entries(data.tags);
      tags = createSortedMap(tagsEntries, {
        validate: validateTag,
        map: mapTag
      });
    }
    if (data.peerRecordEnvelope != null) {
      peerRecordEnvelope2 = data.peerRecordEnvelope;
    }
  }
  if (strategy === "merge") {
    if (data.multiaddrs != null) {
      addresses.push(...data.multiaddrs.map((multiaddr2) => ({
        isCertified: false,
        multiaddr: multiaddr2
      })));
    }
    if (data.addresses != null) {
      addresses.push(...data.addresses);
    }
    if (data.protocols != null) {
      protocols2 = /* @__PURE__ */ new Set([...protocols2, ...data.protocols]);
    }
    if (data.metadata != null) {
      const metadataEntries = data.metadata instanceof Map ? [...data.metadata.entries()] : Object.entries(data.metadata);
      for (const [key, value2] of metadataEntries) {
        if (value2 == null) {
          metadata.delete(key);
        } else {
          metadata.set(key, value2);
        }
      }
      metadata = createSortedMap([...metadata.entries()], {
        validate: validateMetadata
      });
    }
    if (data.tags != null) {
      const tagsEntries = data.tags instanceof Map ? [...data.tags.entries()] : Object.entries(data.tags);
      const mergedTags = new Map(tags);
      for (const [key, value2] of tagsEntries) {
        if (value2 == null) {
          mergedTags.delete(key);
        } else {
          mergedTags.set(key, value2);
        }
      }
      tags = createSortedMap([...mergedTags.entries()], {
        validate: validateTag,
        map: mapTag
      });
    }
    if (data.peerRecordEnvelope != null) {
      peerRecordEnvelope2 = data.peerRecordEnvelope;
    }
  }
  let publicKey;
  if (existingPeer?.id.publicKey != null) {
    publicKey = publicKeyToProtobuf(existingPeer.id.publicKey);
  } else if (data.publicKey != null) {
    publicKey = publicKeyToProtobuf(data.publicKey);
  } else if (peerId.publicKey != null) {
    publicKey = publicKeyToProtobuf(peerId.publicKey);
  }
  const output = {
    addresses: await dedupeFilterAndSortAddresses(peerId, options.addressFilter ?? (async () => true), addresses, options.existingPeer?.peerPB.addresses, options),
    protocols: [...protocols2.values()].sort((a2, b) => {
      return a2.localeCompare(b);
    }),
    metadata,
    tags,
    publicKey,
    peerRecordEnvelope: peerRecordEnvelope2
  };
  output.addresses.forEach((addr) => {
    addr.observed = options.existingPeer?.peerPB.addresses?.find((addr2) => equals3(addr2.multiaddr, addr2.multiaddr))?.observed ?? Date.now();
  });
  if (peerId.type !== "RSA") {
    delete output.publicKey;
  }
  return output;
}
function createSortedMap(entries, options) {
  const output = /* @__PURE__ */ new Map();
  for (const [key, value2] of entries) {
    if (value2 == null) {
      continue;
    }
    options.validate(key, value2);
  }
  for (const [key, value2] of entries.sort(([a2], [b]) => {
    return a2.localeCompare(b);
  })) {
    if (value2 != null) {
      output.set(key, options.map?.(key, value2) ?? value2);
    }
  }
  return output;
}
function validateMetadata(key, value2) {
  if (typeof key !== "string") {
    throw new InvalidParametersError2("Metadata key must be a string");
  }
  if (!(value2 instanceof Uint8Array)) {
    throw new InvalidParametersError2("Metadata value must be a Uint8Array");
  }
}
function validateTag(key, tag) {
  if (typeof key !== "string") {
    throw new InvalidParametersError2("Tag name must be a string");
  }
  if (tag.value != null) {
    if (parseInt(`${tag.value}`, 10) !== tag.value) {
      throw new InvalidParametersError2("Tag value must be an integer");
    }
    if (tag.value < 0 || tag.value > 100) {
      throw new InvalidParametersError2("Tag value must be between 0-100");
    }
  }
  if (tag.ttl != null) {
    if (parseInt(`${tag.ttl}`, 10) !== tag.ttl) {
      throw new InvalidParametersError2("Tag ttl must be an integer");
    }
    if (tag.ttl < 0) {
      throw new InvalidParametersError2("Tag ttl must be between greater than 0");
    }
  }
}
function mapTag(key, tag) {
  let expiry;
  if (tag.expiry != null) {
    expiry = tag.expiry;
  }
  if (tag.ttl != null) {
    expiry = BigInt(Date.now() + Number(tag.ttl));
  }
  const output = {
    value: tag.value ?? 0
  };
  if (expiry != null) {
    output.expiry = expiry;
  }
  return output;
}

// node_modules/@libp2p/peer-store/dist/src/store.js
function keyToPeerId(key) {
  const base32Str = key.toString().split("/")[2];
  const buf = CID.parse(base32Str, base32);
  return peerIdFromCID(buf);
}
function decodePeer(key, value2, maxAddressAge) {
  const peerId = keyToPeerId(key);
  return bytesToPeer(peerId, value2, maxAddressAge);
}
function mapQuery(query, maxAddressAge) {
  return {
    prefix: NAMESPACE_COMMON,
    filters: (query.filters ?? []).map((fn) => ({ key, value: value2 }) => {
      return fn(decodePeer(key, value2, maxAddressAge));
    }),
    orders: (query.orders ?? []).map((fn) => (a2, b) => {
      return fn(decodePeer(a2.key, a2.value, maxAddressAge), decodePeer(b.key, b.value, maxAddressAge));
    })
  };
}
var PersistentStore = class {
  peerId;
  datastore;
  locks;
  addressFilter;
  log;
  maxAddressAge;
  maxPeerAge;
  constructor(components, init2 = {}) {
    this.log = components.logger.forComponent("libp2p:peer-store");
    this.peerId = components.peerId;
    this.datastore = components.datastore;
    this.addressFilter = init2.addressFilter;
    this.locks = trackedPeerMap({
      name: "libp2p_peer_store_locks",
      metrics: components.metrics
    });
    this.maxAddressAge = init2.maxAddressAge ?? MAX_ADDRESS_AGE;
    this.maxPeerAge = init2.maxPeerAge ?? MAX_PEER_AGE;
  }
  getLock(peerId) {
    let lock = this.locks.get(peerId);
    if (lock == null) {
      lock = {
        refs: 0,
        lock: createMortice({
          name: peerId.toString(),
          singleProcess: true
        })
      };
      this.locks.set(peerId, lock);
    }
    lock.refs++;
    return lock;
  }
  maybeRemoveLock(peerId, lock) {
    lock.refs--;
    if (lock.refs === 0) {
      lock.lock.finalize();
      this.locks.delete(peerId);
    }
  }
  async getReadLock(peerId, options) {
    const lock = this.getLock(peerId);
    try {
      const release = await lock.lock.readLock(options);
      return () => {
        release();
        this.maybeRemoveLock(peerId, lock);
      };
    } catch (err) {
      this.maybeRemoveLock(peerId, lock);
      throw err;
    }
  }
  async getWriteLock(peerId, options) {
    const lock = this.getLock(peerId);
    try {
      const release = await lock.lock.writeLock(options);
      return () => {
        release();
        this.maybeRemoveLock(peerId, lock);
      };
    } catch (err) {
      this.maybeRemoveLock(peerId, lock);
      throw err;
    }
  }
  async has(peerId, options) {
    try {
      await this.load(peerId, options);
      return true;
    } catch (err) {
      if (err.name !== "NotFoundError") {
        throw err;
      }
    }
    return false;
  }
  async delete(peerId, options) {
    if (this.peerId.equals(peerId)) {
      return;
    }
    await this.datastore.delete(peerIdToDatastoreKey(peerId), options);
  }
  async load(peerId, options) {
    const key = peerIdToDatastoreKey(peerId);
    const buf = await this.datastore.get(key, options);
    const peer = Peer.decode(buf);
    if (this.#peerIsExpired(peerId, peer)) {
      await this.datastore.delete(key, options);
      throw new NotFoundError();
    }
    return pbToPeer(peerId, peer, this.peerId.equals(peerId) ? Infinity : this.maxAddressAge);
  }
  async save(peerId, data, options) {
    const existingPeer = await this.#findExistingPeer(peerId, options);
    const peerPb = await toPeerPB(peerId, data, "patch", {
      ...options,
      addressFilter: this.addressFilter
    });
    return this.#saveIfDifferent(peerId, peerPb, existingPeer);
  }
  async patch(peerId, data, options) {
    const existingPeer = await this.#findExistingPeer(peerId, options);
    const peerPb = await toPeerPB(peerId, data, "patch", {
      ...options,
      addressFilter: this.addressFilter,
      existingPeer
    });
    return this.#saveIfDifferent(peerId, peerPb, existingPeer);
  }
  async merge(peerId, data, options) {
    const existingPeer = await this.#findExistingPeer(peerId, options);
    const peerPb = await toPeerPB(peerId, data, "merge", {
      addressFilter: this.addressFilter,
      existingPeer
    });
    return this.#saveIfDifferent(peerId, peerPb, existingPeer);
  }
  async *all(options) {
    for await (const { key, value: value2 } of this.datastore.query(mapQuery(options ?? {}, this.maxAddressAge), options)) {
      const peerId = keyToPeerId(key);
      if (peerId.equals(this.peerId)) {
        continue;
      }
      const peer = Peer.decode(value2);
      if (this.#peerIsExpired(peerId, peer)) {
        await this.datastore.delete(key, options);
        continue;
      }
      yield pbToPeer(peerId, peer, this.peerId.equals(peerId) ? Infinity : this.maxAddressAge);
    }
  }
  async #findExistingPeer(peerId, options) {
    try {
      const key = peerIdToDatastoreKey(peerId);
      const buf = await this.datastore.get(key, options);
      const peerPB = Peer.decode(buf);
      if (this.#peerIsExpired(peerId, peerPB)) {
        await this.datastore.delete(key, options);
        throw new NotFoundError();
      }
      return {
        peerPB,
        peer: pbToPeer(peerId, peerPB, this.maxAddressAge)
      };
    } catch (err) {
      if (err.name !== "NotFoundError") {
        this.log.error("invalid peer data found in peer store - %e", err);
      }
    }
  }
  async #saveIfDifferent(peerId, peer, existingPeer, options) {
    peer.updated = Date.now();
    const buf = Peer.encode(peer);
    await this.datastore.put(peerIdToDatastoreKey(peerId), buf, options);
    return {
      peer: pbToPeer(peerId, peer, this.maxAddressAge),
      previous: existingPeer?.peer,
      updated: existingPeer == null || !peerEquals(peer, existingPeer.peerPB)
    };
  }
  #peerIsExpired(peerId, peer) {
    if (peer.updated == null) {
      return true;
    }
    if (this.peerId.equals(peerId)) {
      return false;
    }
    const expired = peer.updated < Date.now() - this.maxPeerAge;
    const minAddressObserved = Date.now() - this.maxAddressAge;
    const addrs = peer.addresses.filter((addr) => {
      return addr.observed != null && addr.observed > minAddressObserved;
    });
    return expired && addrs.length === 0;
  }
};

// node_modules/@libp2p/peer-store/dist/src/index.js
var PersistentPeerStore = class {
  store;
  events;
  peerId;
  log;
  constructor(components, init2 = {}) {
    this.log = components.logger.forComponent("libp2p:peer-store");
    this.events = components.events;
    this.peerId = components.peerId;
    this.store = new PersistentStore(components, init2);
  }
  [Symbol.toStringTag] = "@libp2p/peer-store";
  async forEach(fn, query) {
    for await (const peer of this.store.all(query)) {
      fn(peer);
    }
  }
  async all(query) {
    return src_default2(this.store.all(query));
  }
  async delete(peerId, options) {
    const release = await this.store.getReadLock(peerId, options);
    try {
      await this.store.delete(peerId, options);
    } finally {
      release();
    }
  }
  async has(peerId, options) {
    const release = await this.store.getReadLock(peerId, options);
    try {
      return await this.store.has(peerId, options);
    } finally {
      this.log.trace("has release read lock");
      release?.();
    }
  }
  async get(peerId, options) {
    const release = await this.store.getReadLock(peerId, options);
    try {
      return await this.store.load(peerId, options);
    } finally {
      release?.();
    }
  }
  async getInfo(peerId, options) {
    const peer = await this.get(peerId, options);
    return {
      id: peer.id,
      multiaddrs: peer.addresses.map(({ multiaddr: multiaddr2 }) => multiaddr2)
    };
  }
  async save(id, data, options) {
    const release = await this.store.getWriteLock(id, options);
    try {
      const result = await this.store.save(id, data, options);
      this.#emitIfUpdated(id, result);
      return result.peer;
    } finally {
      release?.();
    }
  }
  async patch(id, data, options) {
    const release = await this.store.getWriteLock(id, options);
    try {
      const result = await this.store.patch(id, data, options);
      this.#emitIfUpdated(id, result);
      return result.peer;
    } finally {
      release?.();
    }
  }
  async merge(id, data, options) {
    const release = await this.store.getWriteLock(id, options);
    try {
      const result = await this.store.merge(id, data, options);
      this.#emitIfUpdated(id, result);
      return result.peer;
    } finally {
      release?.();
    }
  }
  async consumePeerRecord(buf, arg1, arg2) {
    const expectedPeer = isPeerId(arg1) ? arg1 : isPeerId(arg1?.expectedPeer) ? arg1.expectedPeer : void 0;
    const options = isPeerId(arg1) ? arg2 : arg1 === void 0 ? arg2 : arg1;
    const envelope = await RecordEnvelope.openAndCertify(buf, PeerRecord2.DOMAIN, options);
    const peerId = peerIdFromCID(envelope.publicKey.toCID());
    if (expectedPeer?.equals(peerId) === false) {
      this.log("envelope peer id was not the expected peer id - expected: %p received: %p", expectedPeer, peerId);
      return false;
    }
    const peerRecord = PeerRecord2.createFromProtobuf(envelope.payload);
    let peer;
    try {
      peer = await this.get(peerId, options);
    } catch (err) {
      if (err.name !== "NotFoundError") {
        throw err;
      }
    }
    if (peer?.peerRecordEnvelope != null) {
      const storedEnvelope = RecordEnvelope.createFromProtobuf(peer.peerRecordEnvelope);
      const storedRecord = PeerRecord2.createFromProtobuf(storedEnvelope.payload);
      if (storedRecord.seqNumber >= peerRecord.seqNumber) {
        this.log("sequence number was lower or equal to existing sequence number - stored: %d received: %d", storedRecord.seqNumber, peerRecord.seqNumber);
        return false;
      }
    }
    await this.patch(peerRecord.peerId, {
      peerRecordEnvelope: buf,
      addresses: peerRecord.multiaddrs.map((multiaddr2) => ({
        isCertified: true,
        multiaddr: multiaddr2
      }))
    }, options);
    return true;
  }
  #emitIfUpdated(id, result) {
    if (!result.updated) {
      return;
    }
    if (this.peerId.equals(id)) {
      this.events.safeDispatchEvent("self:peer:update", { detail: result });
    } else {
      this.events.safeDispatchEvent("peer:update", { detail: result });
    }
  }
};
function persistentPeerStore(components, init2 = {}) {
  return new PersistentPeerStore(components, init2);
}

// node_modules/interface-store/dist/src/errors.js
var NotFoundError2 = class _NotFoundError extends Error {
  static name = "NotFoundError";
  static code = "ERR_NOT_FOUND";
  name = _NotFoundError.name;
  code = _NotFoundError.code;
  constructor(message2 = "Not Found") {
    super(message2);
  }
};

// node_modules/it-drain/dist/src/index.js
function isAsyncIterable2(thing) {
  return thing[Symbol.asyncIterator] != null;
}
function drain(source) {
  if (isAsyncIterable2(source)) {
    return (async () => {
      for await (const _ of source) {
      }
    })();
  } else {
    for (const _ of source) {
    }
  }
}
var src_default3 = drain;

// node_modules/it-peekable/dist/src/index.js
function peekable(iterable) {
  const [iterator, symbol3] = iterable[Symbol.asyncIterator] != null ? [iterable[Symbol.asyncIterator](), Symbol.asyncIterator] : [iterable[Symbol.iterator](), Symbol.iterator];
  const queue = [];
  return {
    peek: () => {
      return iterator.next();
    },
    push: (value2) => {
      queue.push(value2);
    },
    next: () => {
      if (queue.length > 0) {
        return {
          done: false,
          value: queue.shift()
        };
      }
      return iterator.next();
    },
    [symbol3]() {
      return this;
    }
  };
}
var src_default4 = peekable;

// node_modules/it-filter/dist/src/index.js
function isAsyncIterable3(thing) {
  return thing[Symbol.asyncIterator] != null;
}
function filter(source, fn) {
  let index = 0;
  if (isAsyncIterable3(source)) {
    return async function* () {
      for await (const entry of source) {
        if (await fn(entry, index++)) {
          yield entry;
        }
      }
    }();
  }
  const peekable2 = src_default4(source);
  const { value: value2, done } = peekable2.next();
  if (done === true) {
    return function* () {
    }();
  }
  const res = fn(value2, index++);
  if (typeof res.then === "function") {
    return async function* () {
      if (await res) {
        yield value2;
      }
      for (const entry of peekable2) {
        if (await fn(entry, index++)) {
          yield entry;
        }
      }
    }();
  }
  const func = fn;
  return function* () {
    if (res === true) {
      yield value2;
    }
    for (const entry of peekable2) {
      if (func(entry, index++)) {
        yield entry;
      }
    }
  }();
}
var src_default5 = filter;

// node_modules/it-sort/dist/src/index.js
function isAsyncIterable4(thing) {
  return thing[Symbol.asyncIterator] != null;
}
function sort(source, sorter) {
  if (isAsyncIterable4(source)) {
    return async function* () {
      const arr = await src_default2(source);
      yield* arr.sort(sorter);
    }();
  }
  return function* () {
    const arr = src_default2(source);
    yield* arr.sort(sorter);
  }();
}
var src_default6 = sort;

// node_modules/it-take/dist/src/index.js
function isAsyncIterable5(thing) {
  return thing[Symbol.asyncIterator] != null;
}
function take(source, limit) {
  if (isAsyncIterable5(source)) {
    return async function* () {
      let items = 0;
      if (limit < 1) {
        return;
      }
      for await (const entry of source) {
        yield entry;
        items++;
        if (items === limit) {
          return;
        }
      }
    }();
  }
  return function* () {
    let items = 0;
    if (limit < 1) {
      return;
    }
    for (const entry of source) {
      yield entry;
      items++;
      if (items === limit) {
        return;
      }
    }
  }();
}
var src_default7 = take;

// node_modules/datastore-core/dist/src/base.js
var BaseDatastore = class {
  put(key, val, options) {
    return Promise.reject(new Error(".put is not implemented"));
  }
  get(key, options) {
    return Promise.reject(new Error(".get is not implemented"));
  }
  has(key, options) {
    return Promise.reject(new Error(".has is not implemented"));
  }
  delete(key, options) {
    return Promise.reject(new Error(".delete is not implemented"));
  }
  async *putMany(source, options = {}) {
    for await (const { key, value: value2 } of source) {
      await this.put(key, value2, options);
      yield key;
    }
  }
  async *getMany(source, options = {}) {
    for await (const key of source) {
      yield {
        key,
        value: await this.get(key, options)
      };
    }
  }
  async *deleteMany(source, options = {}) {
    for await (const key of source) {
      await this.delete(key, options);
      yield key;
    }
  }
  batch() {
    let puts = [];
    let dels = [];
    return {
      put(key, value2) {
        puts.push({ key, value: value2 });
      },
      delete(key) {
        dels.push(key);
      },
      commit: async (options) => {
        await src_default3(this.putMany(puts, options));
        puts = [];
        await src_default3(this.deleteMany(dels, options));
        dels = [];
      }
    };
  }
  /**
   * Extending classes should override `query` or implement this method
   */
  // eslint-disable-next-line require-yield
  async *_all(q, options) {
    throw new Error("._all is not implemented");
  }
  /**
   * Extending classes should override `queryKeys` or implement this method
   */
  // eslint-disable-next-line require-yield
  async *_allKeys(q, options) {
    throw new Error("._allKeys is not implemented");
  }
  query(q, options) {
    let it = this._all(q, options);
    if (q.prefix != null) {
      const prefix = q.prefix;
      it = src_default5(it, (e2) => e2.key.toString().startsWith(prefix));
    }
    if (Array.isArray(q.filters)) {
      it = q.filters.reduce((it2, f2) => src_default5(it2, f2), it);
    }
    if (Array.isArray(q.orders)) {
      it = q.orders.reduce((it2, f2) => src_default6(it2, f2), it);
    }
    if (q.offset != null) {
      let i2 = 0;
      const offset = q.offset;
      it = src_default5(it, () => i2++ >= offset);
    }
    if (q.limit != null) {
      it = src_default7(it, q.limit);
    }
    return it;
  }
  queryKeys(q, options) {
    let it = this._allKeys(q, options);
    if (q.prefix != null) {
      const prefix = q.prefix;
      it = src_default5(it, (key) => key.toString().startsWith(prefix));
    }
    if (Array.isArray(q.filters)) {
      it = q.filters.reduce((it2, f2) => src_default5(it2, f2), it);
    }
    if (Array.isArray(q.orders)) {
      it = q.orders.reduce((it2, f2) => src_default6(it2, f2), it);
    }
    if (q.offset != null) {
      const offset = q.offset;
      let i2 = 0;
      it = src_default5(it, () => i2++ >= offset);
    }
    if (q.limit != null) {
      it = src_default7(it, q.limit);
    }
    return it;
  }
};

// node_modules/datastore-core/dist/src/memory.js
var MemoryDatastore = class extends BaseDatastore {
  data;
  constructor() {
    super();
    this.data = /* @__PURE__ */ new Map();
  }
  put(key, val, options) {
    options?.signal?.throwIfAborted();
    this.data.set(key.toString(), val);
    return key;
  }
  get(key, options) {
    options?.signal?.throwIfAborted();
    const result = this.data.get(key.toString());
    if (result == null) {
      throw new NotFoundError2();
    }
    return result;
  }
  has(key, options) {
    options?.signal?.throwIfAborted();
    return this.data.has(key.toString());
  }
  delete(key, options) {
    options?.signal?.throwIfAborted();
    this.data.delete(key.toString());
  }
  *_all(q, options) {
    options?.signal?.throwIfAborted();
    for (const [key, value2] of this.data.entries()) {
      yield { key: new Key(key), value: value2 };
      options?.signal?.throwIfAborted();
    }
  }
  *_allKeys(q, options) {
    options?.signal?.throwIfAborted();
    for (const key of this.data.keys()) {
      yield new Key(key);
      options?.signal?.throwIfAborted();
    }
  }
};

// node_modules/@libp2p/utils/dist/src/debounce.js
function debounce2(func, wait) {
  let timeout;
  const output = function() {
    const later = function() {
      timeout = void 0;
      void func();
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
  output.start = () => {
  };
  output.stop = () => {
    clearTimeout(timeout);
  };
  return output;
}

// node_modules/@libp2p/utils/dist/src/private-ip.js
var import_netmask2 = __toESM(require_netmask(), 1);
var PRIVATE_IP_RANGES = [
  "0.0.0.0/8",
  "10.0.0.0/8",
  "100.64.0.0/10",
  "127.0.0.0/8",
  "169.254.0.0/16",
  "172.16.0.0/12",
  "192.0.0.0/24",
  "192.0.0.0/29",
  "192.0.0.8/32",
  "192.0.0.9/32",
  "192.0.0.10/32",
  "192.0.0.170/32",
  "192.0.0.171/32",
  "192.0.2.0/24",
  "192.31.196.0/24",
  "192.52.193.0/24",
  "192.88.99.0/24",
  "192.168.0.0/16",
  "192.175.48.0/24",
  "198.18.0.0/15",
  "198.51.100.0/24",
  "203.0.113.0/24",
  "240.0.0.0/4",
  "255.255.255.255/32"
];
var NETMASK_RANGES = PRIVATE_IP_RANGES.map((ipRange) => new import_netmask2.Netmask(ipRange));
function ipv4Check(ipAddr) {
  for (const r2 of NETMASK_RANGES) {
    if (r2.contains(ipAddr)) {
      return true;
    }
  }
  return false;
}
function isIpv4MappedIpv6(ipAddr) {
  return /^::ffff:([0-9a-fA-F]{1,4}):([0-9a-fA-F]{1,4})$/.test(ipAddr);
}
function ipv4MappedIpv6Check(ipAddr) {
  const parts = ipAddr.split(":");
  if (parts.length < 2) {
    return false;
  }
  const octet34 = parts[parts.length - 1].padStart(4, "0");
  const octet12 = parts[parts.length - 2].padStart(4, "0");
  const ip4 = `${parseInt(octet12.substring(0, 2), 16)}.${parseInt(octet12.substring(2), 16)}.${parseInt(octet34.substring(0, 2), 16)}.${parseInt(octet34.substring(2), 16)}`;
  return ipv4Check(ip4);
}
function isIpv4EmbeddedIpv6(ipAddr) {
  return /^::ffff:([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/.test(ipAddr);
}
function ipv4EmbeddedIpv6Check(ipAddr) {
  const parts = ipAddr.split(":");
  const ip4 = parts[parts.length - 1];
  return ipv4Check(ip4);
}
function ipv6Check(ipAddr) {
  return /^::$/.test(ipAddr) || /^::1$/.test(ipAddr) || /^64:ff9b::([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/.test(ipAddr) || /^100::([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4})$/.test(ipAddr) || /^2001::([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4})$/.test(ipAddr) || /^2001:2[0-9a-fA-F]:([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4})$/.test(ipAddr) || /^2001:db8:([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4})$/.test(ipAddr) || /^2002:([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4}):?([0-9a-fA-F]{0,4})$/.test(ipAddr) || /^f[c-d]([0-9a-fA-F]{2,2}):/i.test(ipAddr) || /^fe[8-9a-bA-B][0-9a-fA-F]:/i.test(ipAddr) || /^ff([0-9a-fA-F]{2,2}):/i.test(ipAddr);
}
function isPrivateIp(ip) {
  if ((0, import_node_net.isIPv4)(ip)) {
    return ipv4Check(ip);
  }
  if (isIpv4MappedIpv6(ip)) {
    return ipv4MappedIpv6Check(ip);
  }
  if (isIpv4EmbeddedIpv6(ip)) {
    return ipv4EmbeddedIpv6Check(ip);
  }
  if ((0, import_node_net.isIPv6)(ip)) {
    return ipv6Check(ip);
  }
}

// node_modules/@multiformats/multiaddr-matcher/dist/src/utils.js
var code2 = (code3) => {
  return {
    match: (vals) => {
      const component = vals[0];
      if (component == null) {
        return false;
      }
      if (component.code !== code3) {
        return false;
      }
      if (component.value != null) {
        return false;
      }
      return vals.slice(1);
    }
  };
};
var value = (code3, value2) => {
  return {
    match: (vals) => {
      const component = vals[0];
      if (component?.code !== code3) {
        return false;
      }
      if (component.value == null) {
        return false;
      }
      if (value2 != null && component.value !== value2) {
        return false;
      }
      return vals.slice(1);
    }
  };
};
var optional = (matcher) => {
  return {
    match: (vals) => {
      const result = matcher.match(vals);
      if (result === false) {
        return vals;
      }
      return result;
    }
  };
};
var or2 = (...matchers) => {
  return {
    match: (vals) => {
      let matches;
      for (const matcher of matchers) {
        const result = matcher.match(vals);
        if (result === false) {
          continue;
        }
        if (matches == null || result.length < matches.length) {
          matches = result;
        }
      }
      if (matches == null) {
        return false;
      }
      return matches;
    }
  };
};
var and = (...matchers) => {
  return {
    match: (vals) => {
      for (const matcher of matchers) {
        const result = matcher.match(vals);
        if (result === false) {
          return false;
        }
        vals = result;
      }
      return vals;
    }
  };
};
function fmt(...matchers) {
  function match(ma) {
    if (ma == null) {
      return false;
    }
    let parts = ma.getComponents();
    for (const matcher of matchers) {
      const result = matcher.match(parts);
      if (result === false) {
        return false;
      }
      parts = result;
    }
    return parts;
  }
  function matches(ma) {
    const result = match(ma);
    return result !== false;
  }
  function exactMatch(ma) {
    const result = match(ma);
    if (result === false) {
      return false;
    }
    return result.length === 0;
  }
  return {
    matchers,
    matches,
    exactMatch
  };
}

// node_modules/@multiformats/multiaddr-matcher/dist/src/index.js
var _PEER_ID = value(CODE_P2P);
var PEER_ID = fmt(_PEER_ID);
var _DNS4 = value(CODE_DNS4);
var _DNS6 = value(CODE_DNS6);
var _DNSADDR = value(CODE_DNSADDR);
var _DNS = value(CODE_DNS);
var DNS4 = fmt(_DNS4, optional(value(CODE_P2P)));
var DNS6 = fmt(_DNS6, optional(value(CODE_P2P)));
var DNSADDR = fmt(_DNSADDR, optional(value(CODE_P2P)));
var DNS2 = fmt(or2(_DNS, _DNSADDR, _DNS4, _DNS6), optional(value(CODE_P2P)));
var _IP4 = and(value(CODE_IP4), optional(value(CODE_IPCIDR)));
var _IP6 = and(optional(value(CODE_IP6ZONE)), value(CODE_IP6), optional(value(CODE_IPCIDR)));
var _IP = or2(_IP4, _IP6);
var _IP_OR_DOMAIN = or2(_IP, _DNS, _DNS4, _DNS6, _DNSADDR);
var IP_OR_DOMAIN = fmt(or2(_IP, and(or2(_DNS, _DNSADDR, _DNS4, _DNS6), optional(value(CODE_P2P)))));
var IP4 = fmt(_IP4);
var IP6 = fmt(_IP6);
var IP = fmt(_IP);
var _TCP = and(_IP_OR_DOMAIN, value(CODE_TCP));
var _UDP = and(_IP_OR_DOMAIN, value(CODE_UDP));
var TCP = fmt(and(_TCP, optional(value(CODE_P2P))));
var UDP = fmt(_UDP);
var _QUIC = and(_UDP, code2(CODE_QUIC), optional(value(CODE_P2P)));
var _QUIC_V1 = and(_UDP, code2(CODE_QUIC_V1), optional(value(CODE_P2P)));
var QUIC_V0_OR_V1 = or2(_QUIC, _QUIC_V1);
var QUIC = fmt(_QUIC);
var QUIC_V1 = fmt(_QUIC_V1);
var _WEB = or2(_IP_OR_DOMAIN, _TCP, _UDP, _QUIC, _QUIC_V1);
var _WebSockets = or2(and(_WEB, code2(CODE_WS), optional(value(CODE_P2P))));
var WebSockets = fmt(_WebSockets);
var _WebSocketsSecure = or2(and(_WEB, code2(CODE_WSS), optional(value(CODE_P2P))), and(_WEB, code2(CODE_TLS), optional(value(CODE_SNI)), code2(CODE_WS), optional(value(CODE_P2P))));
var WebSocketsSecure = fmt(_WebSocketsSecure);
var _WebRTCDirect = and(_UDP, code2(CODE_WEBRTC_DIRECT), optional(value(CODE_CERTHASH)), optional(value(CODE_CERTHASH)), optional(value(CODE_P2P)));
var WebRTCDirect = fmt(_WebRTCDirect);
var _WebTransport = and(_QUIC_V1, code2(CODE_WEBTRANSPORT), optional(value(CODE_CERTHASH)), optional(value(CODE_CERTHASH)), optional(value(CODE_P2P)));
var WebTransport = fmt(_WebTransport);
var _P2P = or2(_WebSockets, _WebSocketsSecure, and(_TCP, optional(value(CODE_P2P))), and(QUIC_V0_OR_V1, optional(value(CODE_P2P))), and(_IP_OR_DOMAIN, optional(value(CODE_P2P))), _WebRTCDirect, _WebTransport, value(CODE_P2P));
var P2P = fmt(_P2P);
var _Circuit = and(_P2P, code2(CODE_P2P_CIRCUIT), value(CODE_P2P));
var Circuit = fmt(_Circuit);
var _WebRTC = or2(and(_P2P, code2(CODE_P2P_CIRCUIT), code2(CODE_WEBRTC), optional(value(CODE_P2P))), and(_P2P, code2(CODE_WEBRTC), optional(value(CODE_P2P))), and(code2(CODE_WEBRTC), optional(value(CODE_P2P))));
var WebRTC = fmt(_WebRTC);
var _HTTP = or2(and(_IP_OR_DOMAIN, value(CODE_TCP), code2(CODE_HTTP), optional(value(CODE_P2P))), and(_IP_OR_DOMAIN, code2(CODE_HTTP), optional(value(CODE_P2P))));
var HTTP = fmt(_HTTP);
var _HTTPS = and(_IP_OR_DOMAIN, or2(and(value(CODE_TCP, "443"), code2(CODE_HTTP)), and(value(CODE_TCP), code2(CODE_HTTPS)), and(value(CODE_TCP), code2(CODE_TLS), code2(CODE_HTTP)), and(code2(CODE_TLS), code2(CODE_HTTP)), code2(CODE_TLS), code2(CODE_HTTPS)), optional(value(CODE_P2P)));
var HTTPS = fmt(_HTTPS);
var _Memory = or2(and(value(CODE_MEMORY), optional(value(CODE_P2P))));
var Memory = fmt(_Memory);
var _Unix = or2(and(value(CODE_UNIX), optional(value(CODE_P2P))));
var Unix = fmt(_Unix);

// node_modules/@libp2p/utils/dist/src/tracked-map.js
var TrackedMap = class extends Map {
  metric;
  constructor(init2) {
    super();
    const { name: name3, metrics } = init2;
    this.metric = metrics.registerMetric(name3);
    this.updateComponentMetric();
  }
  set(key, value2) {
    super.set(key, value2);
    this.updateComponentMetric();
    return this;
  }
  delete(key) {
    const deleted = super.delete(key);
    this.updateComponentMetric();
    return deleted;
  }
  clear() {
    super.clear();
    this.updateComponentMetric();
  }
  updateComponentMetric() {
    this.metric.update(this.size);
  }
};
function trackedMap(config) {
  const { name: name3, metrics } = config;
  let map;
  if (metrics != null) {
    map = new TrackedMap({ name: name3, metrics });
  } else {
    map = /* @__PURE__ */ new Map();
  }
  return map;
}

// node_modules/libp2p/dist/src/address-manager/dns-mappings.js
var MAX_DATE = 864e13;
var CODEC_TLS = 448;
var CODEC_SNI = 449;
var CODEC_DNS = 53;
var CODEC_DNS4 = 54;
var CODEC_DNS6 = 55;
var CODEC_DNSADDR = 56;
var DNSMappings = class {
  log;
  mappings;
  constructor(components, init2 = {}) {
    this.log = components.logger.forComponent("libp2p:address-manager:dns-mappings");
    this.mappings = trackedMap({
      name: "libp2p_address_manager_dns_mappings",
      metrics: components.metrics
    });
  }
  has(ma) {
    const host = this.findHost(ma);
    for (const mapping of this.mappings.values()) {
      if (mapping.domain === host) {
        return true;
      }
    }
    return false;
  }
  add(domain, addresses) {
    addresses.forEach((ip) => {
      this.log("add DNS mapping %s to %s", ip, domain);
      const verified = isPrivateIp(ip) === true;
      this.mappings.set(ip, {
        domain,
        verified,
        expires: verified ? MAX_DATE - Date.now() : 0,
        lastVerified: verified ? MAX_DATE - Date.now() : void 0
      });
    });
  }
  remove(ma) {
    const host = this.findHost(ma);
    let wasConfident = false;
    for (const [ip, mapping] of this.mappings.entries()) {
      if (mapping.domain === host) {
        this.log("removing %s to %s DNS mapping %e", ip, mapping.domain);
        this.mappings.delete(ip);
        wasConfident = wasConfident || mapping.verified;
      }
    }
    return wasConfident;
  }
  getAll(addresses) {
    const dnsMappedAddresses = [];
    for (let i2 = 0; i2 < addresses.length; i2++) {
      const address = addresses[i2];
      const tuples = address.multiaddr.stringTuples();
      const host = tuples[0][1];
      if (host == null) {
        continue;
      }
      for (const [ip, mapping] of this.mappings.entries()) {
        if (host !== ip) {
          continue;
        }
        const mappedIp = this.maybeAddSNITuple(tuples, mapping.domain);
        if (mappedIp) {
          addresses.splice(i2, 1);
          i2--;
          dnsMappedAddresses.push({
            multiaddr: multiaddr(`/${tuples.map((tuple) => {
              return [
                protocols(tuple[0]).name,
                tuple[1]
              ].join("/");
            }).join("/")}`),
            verified: mapping.verified,
            type: "dns-mapping",
            expires: mapping.expires,
            lastVerified: mapping.lastVerified
          });
        }
      }
    }
    return dnsMappedAddresses;
  }
  maybeAddSNITuple(tuples, domain) {
    for (let j = 0; j < tuples.length; j++) {
      if (tuples[j][0] === CODEC_TLS && tuples[j + 1]?.[0] !== CODEC_SNI) {
        tuples.splice(j + 1, 0, [CODEC_SNI, domain]);
        return true;
      }
    }
    return false;
  }
  confirm(ma, ttl) {
    const host = this.findHost(ma);
    let startingConfidence = false;
    for (const [ip, mapping] of this.mappings.entries()) {
      if (mapping.domain === host) {
        this.log("marking %s to %s DNS mapping as verified", ip, mapping.domain);
        startingConfidence = mapping.verified;
        mapping.verified = true;
        mapping.expires = Date.now() + ttl;
        mapping.lastVerified = Date.now();
      }
    }
    return startingConfidence;
  }
  unconfirm(ma, ttl) {
    const host = this.findHost(ma);
    let wasConfident = false;
    for (const [ip, mapping] of this.mappings.entries()) {
      if (mapping.domain === host) {
        this.log("removing verification of %s to %s DNS mapping", ip, mapping.domain);
        wasConfident = wasConfident || mapping.verified;
        mapping.verified = false;
        mapping.expires = Date.now() + ttl;
      }
    }
    return wasConfident;
  }
  findHost(ma) {
    for (const tuple of ma.stringTuples()) {
      if (tuple[0] === CODEC_SNI) {
        return tuple[1];
      }
      if (tuple[0] === CODEC_DNS || tuple[0] === CODEC_DNS4 || tuple[0] === CODEC_DNS6 || tuple[0] === CODEC_DNSADDR) {
        return tuple[1];
      }
    }
  }
};

// node_modules/libp2p/dist/src/address-manager/ip-mappings.js
var CODEC_IP4 = 4;
var CODEC_IP6 = 41;
var CODEC_TCP = 6;
var CODEC_UDP = 273;
var IPMappings = class {
  log;
  mappings;
  constructor(components, init2 = {}) {
    this.log = components.logger.forComponent("libp2p:address-manager:ip-mappings");
    this.mappings = trackedMap({
      name: "libp2p_address_manager_ip_mappings",
      metrics: components.metrics
    });
  }
  has(ma) {
    const tuples = ma.stringTuples();
    for (const mappings of this.mappings.values()) {
      for (const mapping of mappings) {
        if (mapping.externalIp === tuples[0][1]) {
          return true;
        }
      }
    }
    return false;
  }
  add(internalIp, internalPort, externalIp, externalPort = internalPort, protocol = "tcp") {
    const key = `${internalIp}-${internalPort}-${protocol}`;
    const mappings = this.mappings.get(key) ?? [];
    const mapping = {
      internalIp,
      internalPort,
      externalIp,
      externalPort,
      externalFamily: (0, import_node_net.isIPv4)(externalIp) ? 4 : 6,
      protocol,
      verified: false,
      expires: 0
    };
    mappings.push(mapping);
    this.mappings.set(key, mappings);
  }
  remove(ma) {
    const tuples = ma.stringTuples();
    const host = tuples[0][1] ?? "";
    const protocol = tuples[1][0] === CODEC_TCP ? "tcp" : "udp";
    const port = parseInt(tuples[1][1] ?? "0");
    let wasConfident = false;
    for (const [key, mappings] of this.mappings.entries()) {
      for (let i2 = 0; i2 < mappings.length; i2++) {
        const mapping = mappings[i2];
        if (mapping.externalIp === host && mapping.externalPort === port && mapping.protocol === protocol) {
          this.log("removing %s:%s to %s:%s %s IP mapping", mapping.externalIp, mapping.externalPort, host, port, protocol);
          wasConfident = wasConfident || mapping.verified;
          mappings.splice(i2, 1);
          i2--;
        }
      }
      if (mappings.length === 0) {
        this.mappings.delete(key);
      }
    }
    return wasConfident;
  }
  getAll(addresses) {
    const ipMappedAddresses = [];
    for (const { multiaddr: ma } of addresses) {
      const tuples = ma.stringTuples();
      let tuple;
      if ((tuples[0][0] === CODEC_IP4 || tuples[0][0] === CODEC_IP6) && tuples[1][0] === CODEC_TCP) {
        tuple = `${tuples[0][1]}-${tuples[1][1]}-tcp`;
      } else if ((tuples[0][0] === CODEC_IP4 || tuples[0][0] === CODEC_IP6) && tuples[1][0] === CODEC_UDP) {
        tuple = `${tuples[0][1]}-${tuples[1][1]}-udp`;
      }
      if (tuple == null) {
        continue;
      }
      const mappings = this.mappings.get(tuple);
      if (mappings == null) {
        continue;
      }
      for (const mapping of mappings) {
        tuples[0][0] = mapping.externalFamily === 4 ? CODEC_IP4 : CODEC_IP6;
        tuples[0][1] = mapping.externalIp;
        tuples[1][1] = `${mapping.externalPort}`;
        ipMappedAddresses.push({
          multiaddr: multiaddr(`/${tuples.map((tuple2) => {
            return [
              protocols(tuple2[0]).name,
              tuple2[1]
            ].join("/");
          }).join("/")}`),
          verified: mapping.verified,
          type: "ip-mapping",
          expires: mapping.expires,
          lastVerified: mapping.lastVerified
        });
      }
    }
    return ipMappedAddresses;
  }
  confirm(ma, ttl) {
    const tuples = ma.stringTuples();
    const host = tuples[0][1];
    let startingConfidence = false;
    for (const mappings of this.mappings.values()) {
      for (const mapping of mappings) {
        if (mapping.externalIp === host) {
          this.log("marking %s to %s IP mapping as verified", mapping.internalIp, mapping.externalIp);
          startingConfidence = mapping.verified;
          mapping.verified = true;
          mapping.expires = Date.now() + ttl;
          mapping.lastVerified = Date.now();
        }
      }
    }
    return startingConfidence;
  }
  unconfirm(ma, ttl) {
    const tuples = ma.stringTuples();
    const host = tuples[0][1] ?? "";
    const protocol = tuples[1][0] === CODEC_TCP ? "tcp" : "udp";
    const port = parseInt(tuples[1][1] ?? "0");
    let wasConfident = false;
    for (const mappings of this.mappings.values()) {
      for (let i2 = 0; i2 < mappings.length; i2++) {
        const mapping = mappings[i2];
        if (mapping.externalIp === host && mapping.externalPort === port && mapping.protocol === protocol) {
          this.log("removing verification of %s:%s to %s:%s %s IP mapping", mapping.externalIp, mapping.externalPort, host, port, protocol);
          wasConfident = wasConfident || mapping.verified;
          mapping.verified = false;
          mapping.expires = Date.now() + ttl;
        }
      }
    }
    return wasConfident;
  }
};

// node_modules/@libp2p/utils/dist/src/multiaddr/is-link-local.js
function isLinkLocal(ma) {
  try {
    for (const { code: code3, value: value2 } of ma.getComponents()) {
      if (code3 === CODE_IP6ZONE) {
        continue;
      }
      if (value2 == null) {
        continue;
      }
      if (code3 === CODE_IP4) {
        return value2.startsWith("169.254.");
      }
      if (code3 === CODE_IP6) {
        return value2.toLowerCase().startsWith("fe80");
      }
    }
  } catch {
  }
  return false;
}

// node_modules/@libp2p/utils/dist/src/multiaddr/is-ip-based.js
function isIpBased(ma) {
  try {
    for (const { code: code3 } of ma.getComponents()) {
      if (code3 === CODE_IP6ZONE) {
        continue;
      }
      return code3 === CODE_IP4 || code3 === CODE_IP6;
    }
  } catch {
  }
  return false;
}

// node_modules/@libp2p/utils/dist/src/multiaddr/is-private.js
function isPrivate(ma) {
  try {
    if (!isIpBased(ma)) {
      return false;
    }
    const [[, value2]] = ma.stringTuples();
    if (value2 == null) {
      return false;
    }
    return isPrivateIp(value2) ?? false;
  } catch {
  }
  return true;
}

// node_modules/libp2p/dist/src/address-manager/observed-addresses.js
var defaultValues = {
  maxObservedAddresses: 10
};
var ObservedAddresses = class {
  log;
  addresses;
  maxObservedAddresses;
  constructor(components, init2 = {}) {
    this.log = components.logger.forComponent("libp2p:address-manager:observed-addresses");
    this.addresses = trackedMap({
      name: "libp2p_address_manager_observed_addresses",
      metrics: components.metrics
    });
    this.maxObservedAddresses = init2.maxObservedAddresses ?? defaultValues.maxObservedAddresses;
  }
  has(ma) {
    return this.addresses.has(ma.toString());
  }
  removePrefixed(prefix) {
    for (const key of this.addresses.keys()) {
      if (key.toString().startsWith(prefix)) {
        this.addresses.delete(key);
      }
    }
  }
  add(ma) {
    if (this.addresses.size === this.maxObservedAddresses) {
      return;
    }
    if (isPrivate(ma) || isLinkLocal(ma)) {
      return;
    }
    this.log("adding observed address %a", ma);
    this.addresses.set(ma.toString(), {
      verified: false,
      expires: 0
    });
  }
  getAll() {
    return Array.from(this.addresses).map(([ma, metadata]) => ({
      multiaddr: multiaddr(ma),
      verified: metadata.verified,
      type: "observed",
      expires: metadata.expires,
      lastVerified: metadata.lastVerified
    }));
  }
  remove(ma) {
    const startingConfidence = this.addresses.get(ma.toString())?.verified ?? false;
    this.log("removing observed address %a", ma);
    this.addresses.delete(ma.toString());
    return startingConfidence;
  }
  confirm(ma, ttl) {
    const addrString = ma.toString();
    const metadata = this.addresses.get(addrString) ?? {
      verified: false,
      expires: Date.now() + ttl,
      lastVerified: Date.now()
    };
    const startingConfidence = metadata.verified;
    metadata.verified = true;
    metadata.expires = Date.now() + ttl;
    metadata.lastVerified = Date.now();
    this.log("marking observed address %a as verified", addrString);
    this.addresses.set(addrString, metadata);
    return startingConfidence;
  }
};

// node_modules/@libp2p/utils/dist/src/multiaddr/is-network-address.js
var NETWORK_CODECS = [
  CODE_IP4,
  CODE_IP6,
  CODE_DNS,
  CODE_DNS4,
  CODE_DNS6,
  CODE_DNSADDR
];
function isNetworkAddress(ma) {
  try {
    for (const { code: code3 } of ma.getComponents()) {
      if (code3 === CODE_IP6ZONE) {
        continue;
      }
      return NETWORK_CODECS.includes(code3);
    }
  } catch {
  }
  return false;
}

// node_modules/libp2p/dist/src/address-manager/transport-addresses.js
var defaultValues2 = {
  maxObservedAddresses: 10
};
var TransportAddresses = class {
  log;
  addresses;
  maxObservedAddresses;
  constructor(components, init2 = {}) {
    this.log = components.logger.forComponent("libp2p:address-manager:observed-addresses");
    this.addresses = trackedMap({
      name: "libp2p_address_manager_transport_addresses",
      metrics: components.metrics
    });
    this.maxObservedAddresses = init2.maxObservedAddresses ?? defaultValues2.maxObservedAddresses;
  }
  get(multiaddr2, ttl) {
    if (isPrivate(multiaddr2)) {
      return {
        multiaddr: multiaddr2,
        verified: true,
        type: "transport",
        expires: Date.now() + ttl,
        lastVerified: Date.now()
      };
    }
    const key = this.toKey(multiaddr2);
    let metadata = this.addresses.get(key);
    if (metadata == null) {
      metadata = {
        verified: !isNetworkAddress(multiaddr2),
        expires: 0
      };
      this.addresses.set(key, metadata);
    }
    return {
      multiaddr: multiaddr2,
      verified: metadata.verified,
      type: "transport",
      expires: metadata.expires,
      lastVerified: metadata.lastVerified
    };
  }
  has(ma) {
    const key = this.toKey(ma);
    return this.addresses.has(key);
  }
  remove(ma) {
    const key = this.toKey(ma);
    const startingConfidence = this.addresses.get(key)?.verified ?? false;
    this.log("removing observed address %a", ma);
    this.addresses.delete(key);
    return startingConfidence;
  }
  confirm(ma, ttl) {
    const key = this.toKey(ma);
    const metadata = this.addresses.get(key) ?? {
      verified: false,
      expires: 0,
      lastVerified: 0
    };
    const startingConfidence = metadata.verified;
    metadata.verified = true;
    metadata.expires = Date.now() + ttl;
    metadata.lastVerified = Date.now();
    this.addresses.set(key, metadata);
    return startingConfidence;
  }
  unconfirm(ma, ttl) {
    const key = this.toKey(ma);
    const metadata = this.addresses.get(key) ?? {
      verified: false,
      expires: 0
    };
    const startingConfidence = metadata.verified;
    metadata.verified = false;
    metadata.expires = Date.now() + ttl;
    this.addresses.set(key, metadata);
    return startingConfidence;
  }
  toKey(ma) {
    if (isNetworkAddress(ma)) {
      const options = ma.toOptions();
      return `${options.host}-${options.port}-${options.transport}`;
    }
    return ma.toString();
  }
};

// node_modules/libp2p/dist/src/address-manager/index.js
var ONE_MINUTE = 6e4;
var defaultValues3 = {
  maxObservedAddresses: 10,
  addressVerificationTTL: ONE_MINUTE * 10,
  addressVerificationRetry: ONE_MINUTE * 5
};
var defaultAddressFilter = (addrs) => addrs;
function stripPeerId(ma, peerId) {
  const observedPeerIdStr = ma.getPeerId();
  if (observedPeerIdStr != null) {
    const observedPeerId = peerIdFromString(observedPeerIdStr);
    if (observedPeerId.equals(peerId)) {
      ma = ma.decapsulate(multiaddr(`/p2p/${peerId.toString()}`));
    }
  }
  return ma;
}
var AddressManager = class {
  log;
  components;
  // this is an array to allow for duplicates, e.g. multiples of `/ip4/0.0.0.0/tcp/0`
  listen;
  announce;
  appendAnnounce;
  announceFilter;
  observed;
  dnsMappings;
  ipMappings;
  transportAddresses;
  observedAddressFilter;
  addressVerificationTTL;
  addressVerificationRetry;
  /**
   * Responsible for managing the peer addresses.
   * Peers can specify their listen and announce addresses.
   * The listen addresses will be used by the libp2p transports to listen for new connections,
   * while the announce addresses will be used for the peer addresses' to other peers in the network.
   */
  constructor(components, init2 = {}) {
    const { listen = [], announce = [], appendAnnounce = [] } = init2;
    this.components = components;
    this.log = components.logger.forComponent("libp2p:address-manager");
    this.listen = listen.map((ma) => ma.toString());
    this.announce = new Set(announce.map((ma) => ma.toString()));
    this.appendAnnounce = new Set(appendAnnounce.map((ma) => ma.toString()));
    this.observed = new ObservedAddresses(components, init2);
    this.dnsMappings = new DNSMappings(components, init2);
    this.ipMappings = new IPMappings(components, init2);
    this.transportAddresses = new TransportAddresses(components, init2);
    this.announceFilter = init2.announceFilter ?? defaultAddressFilter;
    this.observedAddressFilter = createScalableCuckooFilter(1024);
    this.addressVerificationTTL = init2.addressVerificationTTL ?? defaultValues3.addressVerificationTTL;
    this.addressVerificationRetry = init2.addressVerificationRetry ?? defaultValues3.addressVerificationRetry;
    this._updatePeerStoreAddresses = debounce2(this._updatePeerStoreAddresses.bind(this), 1e3);
    components.events.addEventListener("transport:listening", () => {
      this._updatePeerStoreAddresses();
    });
    components.events.addEventListener("transport:close", () => {
      this._updatePeerStoreAddresses();
    });
  }
  [Symbol.toStringTag] = "@libp2p/address-manager";
  _updatePeerStoreAddresses() {
    const addrs = this.getAddresses().map((ma) => {
      if (ma.getPeerId() === this.components.peerId.toString()) {
        return ma.decapsulate(`/p2p/${this.components.peerId.toString()}`);
      }
      return ma;
    });
    this.components.peerStore.patch(this.components.peerId, {
      multiaddrs: addrs
    }).catch((err) => {
      this.log.error("error updating addresses", err);
    });
  }
  /**
   * Get peer listen multiaddrs
   */
  getListenAddrs() {
    return Array.from(this.listen).map((a2) => multiaddr(a2));
  }
  /**
   * Get peer announcing multiaddrs
   */
  getAnnounceAddrs() {
    return Array.from(this.announce).map((a2) => multiaddr(a2));
  }
  /**
   * Get peer announcing multiaddrs
   */
  getAppendAnnounceAddrs() {
    return Array.from(this.appendAnnounce).map((a2) => multiaddr(a2));
  }
  /**
   * Get observed multiaddrs
   */
  getObservedAddrs() {
    return this.observed.getAll().map((addr) => addr.multiaddr);
  }
  /**
   * Add peer observed addresses
   */
  addObservedAddr(addr) {
    const tuples = addr.stringTuples();
    const socketAddress = `${tuples[0][1]}:${tuples[1][1]}`;
    if (this.observedAddressFilter.has(socketAddress)) {
      return;
    }
    this.observedAddressFilter.add(socketAddress);
    addr = stripPeerId(addr, this.components.peerId);
    if (this.ipMappings.has(addr)) {
      return;
    }
    if (this.dnsMappings.has(addr)) {
      return;
    }
    this.observed.add(addr);
  }
  confirmObservedAddr(addr, options) {
    addr = stripPeerId(addr, this.components.peerId);
    let startingConfidence = true;
    if (options?.type === "transport" || this.transportAddresses.has(addr)) {
      const transportStartingConfidence = this.transportAddresses.confirm(addr, options?.ttl ?? this.addressVerificationTTL);
      if (!transportStartingConfidence && startingConfidence) {
        startingConfidence = false;
      }
    }
    if (options?.type === "dns-mapping" || this.dnsMappings.has(addr)) {
      const dnsMappingStartingConfidence = this.dnsMappings.confirm(addr, options?.ttl ?? this.addressVerificationTTL);
      if (!dnsMappingStartingConfidence && startingConfidence) {
        startingConfidence = false;
      }
    }
    if (options?.type === "ip-mapping" || this.ipMappings.has(addr)) {
      const ipMappingStartingConfidence = this.ipMappings.confirm(addr, options?.ttl ?? this.addressVerificationTTL);
      if (!ipMappingStartingConfidence && startingConfidence) {
        startingConfidence = false;
      }
    }
    if (options?.type === "observed" || this.observed.has(addr)) {
      if (this.maybeUpgradeToIPMapping(addr)) {
        this.ipMappings.confirm(addr, options?.ttl ?? this.addressVerificationTTL);
        startingConfidence = false;
      } else {
        const observedStartingConfidence = this.observed.confirm(addr, options?.ttl ?? this.addressVerificationTTL);
        if (!observedStartingConfidence && startingConfidence) {
          startingConfidence = false;
        }
      }
    }
    if (!startingConfidence) {
      this._updatePeerStoreAddresses();
    }
  }
  removeObservedAddr(addr, options) {
    addr = stripPeerId(addr, this.components.peerId);
    let startingConfidence = false;
    if (this.observed.has(addr)) {
      const observedStartingConfidence = this.observed.remove(addr);
      if (!observedStartingConfidence && startingConfidence) {
        startingConfidence = false;
      }
    }
    if (this.transportAddresses.has(addr)) {
      const transportStartingConfidence = this.transportAddresses.unconfirm(addr, options?.ttl ?? this.addressVerificationRetry);
      if (!transportStartingConfidence && startingConfidence) {
        startingConfidence = false;
      }
    }
    if (this.dnsMappings.has(addr)) {
      const dnsMappingStartingConfidence = this.dnsMappings.unconfirm(addr, options?.ttl ?? this.addressVerificationRetry);
      if (!dnsMappingStartingConfidence && startingConfidence) {
        startingConfidence = false;
      }
    }
    if (this.ipMappings.has(addr)) {
      const ipMappingStartingConfidence = this.ipMappings.unconfirm(addr, options?.ttl ?? this.addressVerificationRetry);
      if (!ipMappingStartingConfidence && startingConfidence) {
        startingConfidence = false;
      }
    }
    if (startingConfidence) {
      this._updatePeerStoreAddresses();
    }
  }
  getAddresses() {
    const addresses = /* @__PURE__ */ new Set();
    const multiaddrs = this.getAddressesWithMetadata().filter((addr) => {
      if (!addr.verified) {
        return false;
      }
      const maStr = addr.multiaddr.toString();
      if (addresses.has(maStr)) {
        return false;
      }
      addresses.add(maStr);
      return true;
    }).map((address) => address.multiaddr);
    return this.announceFilter(multiaddrs.map((str) => {
      const ma = multiaddr(str);
      const lastComponent = ma.getComponents().pop();
      if (lastComponent?.value === this.components.peerId.toString()) {
        return ma;
      }
      return ma.encapsulate(`/p2p/${this.components.peerId.toString()}`);
    }));
  }
  getAddressesWithMetadata() {
    const announceMultiaddrs = this.getAnnounceAddrs();
    if (announceMultiaddrs.length > 0) {
      this.components.transportManager.getListeners().forEach((listener) => {
        listener.updateAnnounceAddrs(announceMultiaddrs);
      });
      return announceMultiaddrs.map((multiaddr2) => ({
        multiaddr: multiaddr2,
        verified: true,
        type: "announce",
        expires: Date.now() + this.addressVerificationTTL,
        lastVerified: Date.now()
      }));
    }
    let addresses = [];
    addresses = addresses.concat(this.components.transportManager.getAddrs().map((multiaddr2) => this.transportAddresses.get(multiaddr2, this.addressVerificationTTL)));
    const appendAnnounceMultiaddrs = this.getAppendAnnounceAddrs();
    if (appendAnnounceMultiaddrs.length > 0) {
      this.components.transportManager.getListeners().forEach((listener) => {
        listener.updateAnnounceAddrs(appendAnnounceMultiaddrs);
      });
      addresses = addresses.concat(appendAnnounceMultiaddrs.map((multiaddr2) => ({
        multiaddr: multiaddr2,
        verified: true,
        type: "announce",
        expires: Date.now() + this.addressVerificationTTL,
        lastVerified: Date.now()
      })));
    }
    addresses = addresses.concat(this.observed.getAll());
    addresses = addresses.concat(this.ipMappings.getAll(addresses));
    addresses = addresses.concat(this.dnsMappings.getAll(addresses));
    return addresses;
  }
  addDNSMapping(domain, addresses) {
    this.dnsMappings.add(domain, addresses);
  }
  removeDNSMapping(domain) {
    if (this.dnsMappings.remove(multiaddr(`/dns/${domain}`))) {
      this._updatePeerStoreAddresses();
    }
  }
  addPublicAddressMapping(internalIp, internalPort, externalIp, externalPort = internalPort, protocol = "tcp") {
    this.ipMappings.add(internalIp, internalPort, externalIp, externalPort, protocol);
    this.observed.removePrefixed(`/ip${(0, import_node_net.isIPv4)(externalIp) ? 4 : 6}/${externalIp}/${protocol}/${externalPort}`);
  }
  removePublicAddressMapping(internalIp, internalPort, externalIp, externalPort = internalPort, protocol = "tcp") {
    if (this.ipMappings.remove(multiaddr(`/ip${(0, import_node_net.isIPv4)(externalIp) ? 4 : 6}/${externalIp}/${protocol}/${externalPort}`))) {
      this._updatePeerStoreAddresses();
    }
  }
  /**
   * Where an external service (router, gateway, etc) is forwarding traffic to
   * us, attempt to add an IP mapping for the external address - this will
   * include the observed mapping in the address list where we also have a DNS
   * mapping for the external IP.
   *
   * Returns true if we added a new mapping
   */
  maybeUpgradeToIPMapping(ma) {
    if (this.ipMappings.has(ma)) {
      return false;
    }
    const maOptions = ma.toOptions();
    if (maOptions.family === 6 || maOptions.host === "127.0.0.1" || isPrivateIp(maOptions.host) === true) {
      return false;
    }
    const listeners = this.components.transportManager.getListeners();
    const transportMatchers = [
      (ma2) => WebSockets.exactMatch(ma2) || WebSocketsSecure.exactMatch(ma2),
      (ma2) => TCP.exactMatch(ma2),
      (ma2) => QUIC_V1.exactMatch(ma2)
    ];
    for (const matcher of transportMatchers) {
      if (!matcher(ma)) {
        continue;
      }
      const transportListeners = listeners.filter((listener) => {
        return listener.getAddrs().filter((ma2) => {
          return ma2.toOptions().family === 4 && matcher(ma2);
        }).length > 0;
      });
      if (transportListeners.length !== 1) {
        continue;
      }
      const linkLocalAddr = transportListeners[0].getAddrs().filter((ma2) => {
        return ma2.toOptions().host !== "127.0.0.1";
      }).pop();
      if (linkLocalAddr == null) {
        continue;
      }
      const linkLocalOptions = linkLocalAddr.toOptions();
      this.observed.remove(ma);
      this.ipMappings.add(linkLocalOptions.host, linkLocalOptions.port, maOptions.host, maOptions.port, maOptions.transport);
      return true;
    }
    return false;
  }
};

// node_modules/libp2p/dist/src/errors.js
var messages;
(function(messages2) {
  messages2["NOT_STARTED_YET"] = "The libp2p node is not started yet";
  messages2["NOT_FOUND"] = "Not found";
})(messages || (messages = {}));
var MissingServiceError = class extends Error {
  constructor(message2 = "Missing service") {
    super(message2);
    this.name = "MissingServiceError";
  }
};
var UnmetServiceDependenciesError = class extends Error {
  constructor(message2 = "Unmet service dependencies") {
    super(message2);
    this.name = "UnmetServiceDependenciesError";
  }
};
var NoContentRoutersError = class extends Error {
  constructor(message2 = "No content routers available") {
    super(message2);
    this.name = "NoContentRoutersError";
  }
};
var NoPeerRoutersError = class extends Error {
  constructor(message2 = "No peer routers available") {
    super(message2);
    this.name = "NoPeerRoutersError";
  }
};
var QueriedForSelfError = class extends Error {
  constructor(message2 = "Should not try to find self") {
    super(message2);
    this.name = "QueriedForSelfError";
  }
};
var UnhandledProtocolError = class extends Error {
  constructor(message2 = "Unhandled protocol error") {
    super(message2);
    this.name = "UnhandledProtocolError";
  }
};
var DuplicateProtocolHandlerError = class extends Error {
  constructor(message2 = "Duplicate protocol handler error") {
    super(message2);
    this.name = "DuplicateProtocolHandlerError";
  }
};
var DialDeniedError = class extends Error {
  constructor(message2 = "Dial denied error") {
    super(message2);
    this.name = "DialDeniedError";
  }
};
var UnsupportedListenAddressError = class extends Error {
  constructor(message2 = "No transport was configured to listen on this address") {
    super(message2);
    this.name = "UnsupportedListenAddressError";
  }
};
var UnsupportedListenAddressesError = class extends Error {
  constructor(message2 = "Configured listen addresses could not be listened on") {
    super(message2);
    this.name = "UnsupportedListenAddressesError";
  }
};
var NoValidAddressesError = class extends Error {
  constructor(message2 = "No valid addresses") {
    super(message2);
    this.name = "NoValidAddressesError";
  }
};
var ConnectionInterceptedError = class extends Error {
  constructor(message2 = "Connection intercepted") {
    super(message2);
    this.name = "ConnectionInterceptedError";
  }
};
var ConnectionDeniedError = class extends Error {
  constructor(message2 = "Connection denied") {
    super(message2);
    this.name = "ConnectionDeniedError";
  }
};
var MuxerUnavailableError = class extends Error {
  constructor(message2 = "Stream is not multiplexed") {
    super(message2);
    this.name = "MuxerUnavailableError";
  }
};
var EncryptionFailedError = class extends Error {
  constructor(message2 = "Encryption failed") {
    super(message2);
    this.name = "EncryptionFailedError";
  }
};
var TransportUnavailableError = class extends Error {
  constructor(message2 = "Transport unavailable") {
    super(message2);
    this.name = "TransportUnavailableError";
  }
};
var RecursionLimitError = class extends Error {
  constructor(message2 = "Max recursive depth reached") {
    super(message2);
    this.name = "RecursionLimitError";
  }
};

// node_modules/libp2p/dist/src/components.js
var DefaultComponents = class {
  components = {};
  _started = false;
  constructor(init2 = {}) {
    this.components = {};
    for (const [key, value2] of Object.entries(init2)) {
      this.components[key] = value2;
    }
    if (this.components.logger == null) {
      this.components.logger = defaultLogger();
    }
  }
  isStarted() {
    return this._started;
  }
  async _invokeStartableMethod(methodName) {
    await Promise.all(Object.values(this.components).filter((obj) => isStartable(obj)).map(async (startable) => {
      await startable[methodName]?.();
    }));
  }
  async beforeStart() {
    await this._invokeStartableMethod("beforeStart");
  }
  async start() {
    await this._invokeStartableMethod("start");
    this._started = true;
  }
  async afterStart() {
    await this._invokeStartableMethod("afterStart");
  }
  async beforeStop() {
    await this._invokeStartableMethod("beforeStop");
  }
  async stop() {
    await this._invokeStartableMethod("stop");
    this._started = false;
  }
  async afterStop() {
    await this._invokeStartableMethod("afterStop");
  }
};
var OPTIONAL_SERVICES = [
  "metrics",
  "connectionProtector",
  "dns"
];
var NON_SERVICE_PROPERTIES = [
  "components",
  "isStarted",
  "beforeStart",
  "start",
  "afterStart",
  "beforeStop",
  "stop",
  "afterStop",
  "then",
  "_invokeStartableMethod"
];
function defaultComponents(init2 = {}) {
  const components = new DefaultComponents(init2);
  const proxy = new Proxy(components, {
    get(target, prop, receiver) {
      if (typeof prop === "string" && !NON_SERVICE_PROPERTIES.includes(prop)) {
        const service = components.components[prop];
        if (service == null && !OPTIONAL_SERVICES.includes(prop)) {
          throw new MissingServiceError(`${prop} not set`);
        }
        return service;
      }
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value2) {
      if (typeof prop === "string") {
        components.components[prop] = value2;
      } else {
        Reflect.set(target, prop, value2);
      }
      return true;
    }
  });
  return proxy;
}
function checkServiceDependencies(components) {
  const serviceCapabilities2 = {};
  for (const service of Object.values(components.components)) {
    for (const capability of getServiceCapabilities(service)) {
      serviceCapabilities2[capability] = true;
    }
  }
  for (const service of Object.values(components.components)) {
    for (const capability of getServiceDependencies(service)) {
      if (serviceCapabilities2[capability] !== true) {
        throw new UnmetServiceDependenciesError(`Service "${getServiceName(service)}" required capability "${capability}" but it was not provided by any component, you may need to add additional configuration when creating your node.`);
      }
    }
  }
}
function getServiceCapabilities(service) {
  if (Array.isArray(service?.[serviceCapabilities])) {
    return service[serviceCapabilities];
  }
  return [];
}
function getServiceDependencies(service) {
  if (Array.isArray(service?.[serviceDependencies])) {
    return service[serviceDependencies];
  }
  return [];
}
function getServiceName(service) {
  return service?.[Symbol.toStringTag] ?? service?.toString() ?? "unknown";
}

// node_modules/libp2p/dist/src/config/connection-gater.js
function connectionGater(gater = {}) {
  return {
    denyDialPeer: async () => false,
    denyDialMultiaddr: async () => false,
    denyInboundConnection: async () => false,
    denyOutboundConnection: async () => false,
    denyInboundEncryptedConnection: async () => false,
    denyOutboundEncryptedConnection: async () => false,
    denyInboundUpgradedConnection: async () => false,
    denyOutboundUpgradedConnection: async () => false,
    filterMultiaddrForPeer: async () => true,
    ...gater
  };
}

// node_modules/delay/index.js
var createAbortError = () => {
  const error = new Error("Delay aborted");
  error.name = "AbortError";
  return error;
};
var clearMethods = /* @__PURE__ */ new WeakMap();
function createDelay({ clearTimeout: defaultClear, setTimeout: defaultSet } = {}) {
  return (milliseconds, { value: value2, signal } = {}) => {
    if (signal?.aborted) {
      return Promise.reject(createAbortError());
    }
    let timeoutId;
    let settle;
    let rejectFunction;
    const clear = defaultClear ?? clearTimeout;
    const signalListener = () => {
      clear(timeoutId);
      rejectFunction(createAbortError());
    };
    const cleanup = () => {
      if (signal) {
        signal.removeEventListener("abort", signalListener);
      }
    };
    const delayPromise = new Promise((resolve, reject) => {
      settle = () => {
        cleanup();
        resolve(value2);
      };
      rejectFunction = reject;
      timeoutId = (defaultSet ?? setTimeout)(settle, milliseconds);
    });
    if (signal) {
      signal.addEventListener("abort", signalListener, { once: true });
    }
    clearMethods.set(delayPromise, () => {
      clear(timeoutId);
      timeoutId = null;
      settle();
    });
    return delayPromise;
  };
}
var delay = createDelay();
var delay_default = delay;

// node_modules/@libp2p/utils/dist/src/errors.js
var RateLimitError = class extends Error {
  remainingPoints;
  msBeforeNext;
  consumedPoints;
  isFirstInDuration;
  constructor(message2 = "Rate limit exceeded", props) {
    super(message2);
    this.name = "RateLimitError";
    this.remainingPoints = props.remainingPoints;
    this.msBeforeNext = props.msBeforeNext;
    this.consumedPoints = props.consumedPoints;
    this.isFirstInDuration = props.isFirstInDuration;
  }
};
var QueueFullError2 = class extends Error {
  static name = "QueueFullError";
  constructor(message2 = "The queue was full") {
    super(message2);
    this.name = "QueueFullError";
  }
};

// node_modules/@libp2p/utils/dist/src/rate-limiter.js
var RateLimiter = class {
  memoryStorage;
  points;
  duration;
  blockDuration;
  execEvenly;
  execEvenlyMinDelayMs;
  keyPrefix;
  constructor(opts = {}) {
    this.points = opts.points ?? 4;
    this.duration = opts.duration ?? 1;
    this.blockDuration = opts.blockDuration ?? 0;
    this.execEvenly = opts.execEvenly ?? false;
    this.execEvenlyMinDelayMs = opts.execEvenlyMinDelayMs ?? this.duration * 1e3 / this.points;
    this.keyPrefix = opts.keyPrefix ?? "rlflx";
    this.memoryStorage = new MemoryStorage();
  }
  async consume(key, pointsToConsume = 1, options = {}) {
    const rlKey = this.getKey(key);
    const secDuration = this._getKeySecDuration(options);
    let res = this.memoryStorage.incrby(rlKey, pointsToConsume, secDuration);
    res.remainingPoints = Math.max(this.points - res.consumedPoints, 0);
    if (res.consumedPoints > this.points) {
      if (this.blockDuration > 0 && res.consumedPoints <= this.points + pointsToConsume) {
        res = this.memoryStorage.set(rlKey, res.consumedPoints, this.blockDuration);
      }
      throw new RateLimitError("Rate limit exceeded", res);
    } else if (this.execEvenly && res.msBeforeNext > 0 && !res.isFirstInDuration) {
      let delayMs = Math.ceil(res.msBeforeNext / (res.remainingPoints + 2));
      if (delayMs < this.execEvenlyMinDelayMs) {
        delayMs = res.consumedPoints * this.execEvenlyMinDelayMs;
      }
      await delay_default(delayMs);
    }
    return res;
  }
  penalty(key, points = 1, options = {}) {
    const rlKey = this.getKey(key);
    const secDuration = this._getKeySecDuration(options);
    const res = this.memoryStorage.incrby(rlKey, points, secDuration);
    res.remainingPoints = Math.max(this.points - res.consumedPoints, 0);
    return res;
  }
  reward(key, points = 1, options = {}) {
    const rlKey = this.getKey(key);
    const secDuration = this._getKeySecDuration(options);
    const res = this.memoryStorage.incrby(rlKey, -points, secDuration);
    res.remainingPoints = Math.max(this.points - res.consumedPoints, 0);
    return res;
  }
  /**
   * Block any key for secDuration seconds
   *
   * @param key
   * @param secDuration
   */
  block(key, secDuration) {
    const msDuration = secDuration * 1e3;
    const initPoints = this.points + 1;
    this.memoryStorage.set(this.getKey(key), initPoints, secDuration);
    return {
      remainingPoints: 0,
      msBeforeNext: msDuration === 0 ? -1 : msDuration,
      consumedPoints: initPoints,
      isFirstInDuration: false
    };
  }
  set(key, points, secDuration = 0) {
    const msDuration = (secDuration >= 0 ? secDuration : this.duration) * 1e3;
    this.memoryStorage.set(this.getKey(key), points, secDuration);
    return {
      remainingPoints: 0,
      msBeforeNext: msDuration === 0 ? -1 : msDuration,
      consumedPoints: points,
      isFirstInDuration: false
    };
  }
  get(key) {
    const res = this.memoryStorage.get(this.getKey(key));
    if (res != null) {
      res.remainingPoints = Math.max(this.points - res.consumedPoints, 0);
    }
    return res;
  }
  delete(key) {
    this.memoryStorage.delete(this.getKey(key));
  }
  _getKeySecDuration(options) {
    if (options?.customDuration != null && options.customDuration >= 0) {
      return options.customDuration;
    }
    return this.duration;
  }
  getKey(key) {
    return this.keyPrefix.length > 0 ? `${this.keyPrefix}:${key}` : key;
  }
  parseKey(rlKey) {
    return rlKey.substring(this.keyPrefix.length);
  }
};
var MemoryStorage = class {
  storage;
  constructor() {
    this.storage = /* @__PURE__ */ new Map();
  }
  incrby(key, value2, durationSec) {
    const existing = this.storage.get(key);
    if (existing != null) {
      const msBeforeExpires = existing.expiresAt != null ? existing.expiresAt.getTime() - (/* @__PURE__ */ new Date()).getTime() : -1;
      if (existing.expiresAt == null || msBeforeExpires > 0) {
        existing.value += value2;
        return {
          remainingPoints: 0,
          msBeforeNext: msBeforeExpires,
          consumedPoints: existing.value,
          isFirstInDuration: false
        };
      }
      return this.set(key, value2, durationSec);
    }
    return this.set(key, value2, durationSec);
  }
  set(key, value2, durationSec) {
    const durationMs = durationSec * 1e3;
    const existing = this.storage.get(key);
    if (existing != null) {
      clearTimeout(existing.timeoutId);
    }
    const record = {
      value: value2,
      expiresAt: durationMs > 0 ? new Date(Date.now() + durationMs) : void 0
    };
    this.storage.set(key, record);
    if (durationMs > 0) {
      record.timeoutId = setTimeout(() => {
        this.storage.delete(key);
      }, durationMs);
      if (record.timeoutId.unref != null) {
        record.timeoutId.unref();
      }
    }
    return {
      remainingPoints: 0,
      msBeforeNext: durationMs === 0 ? -1 : durationMs,
      consumedPoints: record.value,
      isFirstInDuration: true
    };
  }
  get(key) {
    const existing = this.storage.get(key);
    if (existing != null) {
      const msBeforeExpires = existing.expiresAt != null ? existing.expiresAt.getTime() - (/* @__PURE__ */ new Date()).getTime() : -1;
      return {
        remainingPoints: 0,
        msBeforeNext: msBeforeExpires,
        consumedPoints: existing.value,
        isFirstInDuration: false
      };
    }
  }
  delete(key) {
    const record = this.storage.get(key);
    if (record != null) {
      if (record.timeoutId != null) {
        clearTimeout(record.timeoutId);
      }
      this.storage.delete(key);
      return true;
    }
    return false;
  }
};

// node_modules/libp2p/dist/src/get-peer.js
function getPeerAddress(peer) {
  if (isPeerId(peer)) {
    return { peerId: peer, multiaddrs: [] };
  }
  let multiaddrs = Array.isArray(peer) ? peer : [peer];
  let peerId;
  if (multiaddrs.length > 0) {
    const peerIdStr = multiaddrs[0].getPeerId();
    peerId = peerIdStr == null ? void 0 : peerIdFromString(peerIdStr);
    multiaddrs.forEach((ma) => {
      if (!isMultiaddr(ma)) {
        throw new InvalidMultiaddrError("Invalid multiaddr");
      }
      const maPeerIdStr = ma.getPeerId();
      if (maPeerIdStr == null) {
        if (peerId != null) {
          throw new InvalidParametersError2("Multiaddrs must all have the same peer id or have no peer id");
        }
      } else {
        const maPeerId = peerIdFromString(maPeerIdStr);
        if (peerId?.equals(maPeerId) !== true) {
          throw new InvalidParametersError2("Multiaddrs must all have the same peer id or have no peer id");
        }
      }
    });
  }
  multiaddrs = multiaddrs.filter((ma) => {
    return !PEER_ID.exactMatch(ma);
  });
  return {
    peerId,
    multiaddrs
  };
}

// node_modules/@libp2p/utils/dist/src/close.js
var DEFAULT_CLOSABLE_PROTOCOLS = [
  // identify
  "/ipfs/id/1.0.0",
  // identify-push
  "/ipfs/id/push/1.0.0",
  // autonat
  "/libp2p/autonat/1.0.0",
  // dcutr
  "/libp2p/dcutr"
];
async function safelyCloseConnectionIfUnused(connection, options) {
  const streamProtocols = connection?.streams?.map((stream) => stream.protocol) ?? [];
  const closableProtocols = options?.closableProtocols ?? DEFAULT_CLOSABLE_PROTOCOLS;
  if (streamProtocols.filter((proto) => proto != null && !closableProtocols.includes(proto)).length > 0) {
    return;
  }
  try {
    await connection?.close(options);
  } catch (err) {
    connection?.abort(err);
  }
}

// node_modules/libp2p/dist/src/connection-manager/utils.js
function multiaddrToIpNet(ma) {
  try {
    let parsedMa;
    if (typeof ma === "string") {
      parsedMa = multiaddr(ma);
    } else {
      parsedMa = ma;
    }
    const protoNames = /* @__PURE__ */ new Set([...parsedMa.getComponents().map((component) => component.name)]);
    if (!protoNames.has("ipcidr")) {
      const isIPv62 = protoNames.has("ip6");
      const cidr = isIPv62 ? "/ipcidr/128" : "/ipcidr/32";
      parsedMa = parsedMa.encapsulate(cidr);
    }
    return convertToIpNet(parsedMa);
  } catch (error) {
    throw new Error(`Can't convert to IpNet, Invalid multiaddr format: ${ma}`);
  }
}

// node_modules/libp2p/dist/src/connection-manager/connection-pruner.js
var ConnectionPruner = class {
  connectionManager;
  peerStore;
  allow;
  events;
  log;
  constructor(components, init2 = {}) {
    this.allow = (init2.allow ?? []).map((ma) => multiaddrToIpNet(ma));
    this.connectionManager = components.connectionManager;
    this.peerStore = components.peerStore;
    this.events = components.events;
    this.log = components.logger.forComponent("libp2p:connection-manager:connection-pruner");
    this.maybePruneConnections = this.maybePruneConnections.bind(this);
  }
  start() {
    this.events.addEventListener("connection:open", this.maybePruneConnections);
  }
  stop() {
    this.events.removeEventListener("connection:open", this.maybePruneConnections);
  }
  maybePruneConnections() {
    this._maybePruneConnections().catch((err) => {
      this.log.error("error while pruning connections %e", err);
    });
  }
  /**
   * If we have more connections than our maximum, select some excess connections
   * to prune based on peer value
   */
  async _maybePruneConnections() {
    const connections = this.connectionManager.getConnections();
    const numConnections = connections.length;
    const maxConnections = this.connectionManager.getMaxConnections();
    this.log("checking max connections limit %d/%d", numConnections, maxConnections);
    if (numConnections <= maxConnections) {
      return;
    }
    const peerValues = new PeerMap();
    for (const connection of connections) {
      const remotePeer = connection.remotePeer;
      if (peerValues.has(remotePeer)) {
        continue;
      }
      peerValues.set(remotePeer, 0);
      try {
        const peer = await this.peerStore.get(remotePeer);
        peerValues.set(remotePeer, [...peer.tags.values()].reduce((acc, curr) => {
          return acc + curr.value;
        }, 0));
      } catch (err) {
        if (err.name !== "NotFoundError") {
          this.log.error("error loading peer tags", err);
        }
      }
    }
    const sortedConnections = this.sortConnections(connections, peerValues);
    const toPrune = Math.max(numConnections - maxConnections, 0);
    const toClose = [];
    for (const connection of sortedConnections) {
      this.log("too many connections open - closing a connection to %p", connection.remotePeer);
      const connectionInAllowList = this.allow.some((ipNet) => {
        return ipNet.contains(connection.remoteAddr.nodeAddress().address);
      });
      if (!connectionInAllowList) {
        toClose.push(connection);
      }
      if (toClose.length === toPrune) {
        break;
      }
    }
    await Promise.all(toClose.map(async (connection) => {
      await safelyCloseConnectionIfUnused(connection, {
        signal: AbortSignal.timeout(1e3)
      });
    }));
    this.events.safeDispatchEvent("connection:prune", { detail: toClose });
  }
  sortConnections(connections, peerValues) {
    return connections.sort((a2, b) => {
      const connectionALifespan = a2.timeline.open;
      const connectionBLifespan = b.timeline.open;
      if (connectionALifespan < connectionBLifespan) {
        return 1;
      }
      if (connectionALifespan > connectionBLifespan) {
        return -1;
      }
      return 0;
    }).sort((a2, b) => {
      if (a2.direction === "outbound" && b.direction === "inbound") {
        return 1;
      }
      if (a2.direction === "inbound" && b.direction === "outbound") {
        return -1;
      }
      return 0;
    }).sort((a2, b) => {
      if (a2.streams.length > b.streams.length) {
        return 1;
      }
      if (a2.streams.length < b.streams.length) {
        return -1;
      }
      return 0;
    }).sort((a2, b) => {
      const peerAValue = peerValues.get(a2.remotePeer) ?? 0;
      const peerBValue = peerValues.get(b.remotePeer) ?? 0;
      if (peerAValue > peerBValue) {
        return 1;
      }
      if (peerAValue < peerBValue) {
        return -1;
      }
      return 0;
    });
  }
};

// node_modules/libp2p/dist/src/connection-manager/constants.defaults.js
var DIAL_TIMEOUT = 1e4;
var INBOUND_UPGRADE_TIMEOUT = 1e4;
var PROTOCOL_NEGOTIATION_TIMEOUT = 1e4;
var MAX_PEER_ADDRS_TO_DIAL = 25;
var INBOUND_CONNECTION_THRESHOLD = 5;
var MAX_INCOMING_PENDING_CONNECTIONS = 10;
var MAX_PARALLEL_RECONNECTS = 5;
var LAST_DIAL_FAILURE_KEY = "last-dial-failure";
var LAST_DIAL_SUCCESS_KEY = "last-dial-success";
var MAX_DIAL_QUEUE_LENGTH = 500;
var MAX_RECURSIVE_DEPTH = 32;

// node_modules/libp2p/dist/src/connection-manager/constants.js
var MAX_CONNECTIONS = 300;
var MAX_PARALLEL_DIALS = 100;

// node_modules/race-signal/dist/src/index.js
var AbortError4 = class extends Error {
  type;
  code;
  constructor(message2, code3, name3) {
    super(message2 ?? "The operation was aborted");
    this.type = "aborted";
    this.name = name3 ?? "AbortError";
    this.code = code3 ?? "ABORT_ERR";
  }
};
async function raceSignal2(promise, signal, opts) {
  if (signal == null) {
    return promise;
  }
  if (signal.aborted) {
    promise.catch(() => {
    });
    return Promise.reject(new AbortError4(opts?.errorMessage, opts?.errorCode, opts?.errorName));
  }
  let listener;
  const error = new AbortError4(opts?.errorMessage, opts?.errorCode, opts?.errorName);
  try {
    return await Promise.race([
      promise,
      new Promise((resolve, reject) => {
        listener = () => {
          reject(error);
        };
        signal.addEventListener("abort", listener);
      })
    ]);
  } finally {
    if (listener != null) {
      signal.removeEventListener("abort", listener);
    }
  }
}

// node_modules/@libp2p/utils/dist/src/queue/recipient.js
var JobRecipient2 = class {
  deferred;
  signal;
  constructor(signal) {
    this.signal = signal;
    this.deferred = pDefer();
    this.onAbort = this.onAbort.bind(this);
    this.signal?.addEventListener("abort", this.onAbort);
  }
  onAbort() {
    this.deferred.reject(this.signal?.reason ?? new AbortError());
  }
  cleanup() {
    this.signal?.removeEventListener("abort", this.onAbort);
  }
};

// node_modules/@libp2p/utils/dist/src/queue/job.js
function randomId2() {
  return `${parseInt(String(Math.random() * 1e9), 10).toString()}${Date.now()}`;
}
var Job2 = class {
  id;
  fn;
  options;
  recipients;
  status;
  timeline;
  controller;
  constructor(fn, options) {
    this.id = randomId2();
    this.status = "queued";
    this.fn = fn;
    this.options = options;
    this.recipients = [];
    this.timeline = {
      created: Date.now()
    };
    this.controller = new AbortController();
    setMaxListeners(Infinity, this.controller.signal);
    this.onAbort = this.onAbort.bind(this);
  }
  abort(err) {
    this.controller.abort(err);
  }
  onAbort() {
    const allAborted = this.recipients.reduce((acc, curr) => {
      return acc && curr.signal?.aborted === true;
    }, true);
    if (allAborted) {
      this.controller.abort(new AbortError());
      this.cleanup();
    }
  }
  async join(options = {}) {
    const recipient = new JobRecipient2(options.signal);
    this.recipients.push(recipient);
    options.signal?.addEventListener("abort", this.onAbort);
    return recipient.deferred.promise;
  }
  async run() {
    this.status = "running";
    this.timeline.started = Date.now();
    try {
      this.controller.signal.throwIfAborted();
      const result = await raceSignal2(this.fn({
        ...this.options ?? {},
        signal: this.controller.signal
      }), this.controller.signal);
      this.recipients.forEach((recipient) => {
        recipient.deferred.resolve(result);
      });
      this.status = "complete";
    } catch (err) {
      this.recipients.forEach((recipient) => {
        recipient.deferred.reject(err);
      });
      this.status = "errored";
    } finally {
      this.timeline.finished = Date.now();
      this.cleanup();
    }
  }
  cleanup() {
    this.recipients.forEach((recipient) => {
      recipient.cleanup();
      recipient.signal?.removeEventListener("abort", this.onAbort);
    });
  }
};

// node_modules/@libp2p/utils/dist/src/queue/index.js
var Queue2 = class extends TypedEventEmitter {
  concurrency;
  maxSize;
  queue;
  pending;
  sort;
  constructor(init2 = {}) {
    super();
    this.concurrency = init2.concurrency ?? Number.POSITIVE_INFINITY;
    this.maxSize = init2.maxSize ?? Number.POSITIVE_INFINITY;
    this.pending = 0;
    if (init2.metricName != null) {
      init2.metrics?.registerMetricGroup(init2.metricName, {
        calculate: () => {
          return {
            size: this.queue.length,
            running: this.pending,
            queued: this.queue.length - this.pending
          };
        }
      });
    }
    this.sort = init2.sort;
    this.queue = [];
    this.emitEmpty = debounce2(this.emitEmpty.bind(this), 1);
    this.emitIdle = debounce2(this.emitIdle.bind(this), 1);
  }
  emitEmpty() {
    if (this.size !== 0) {
      return;
    }
    this.safeDispatchEvent("empty");
  }
  emitIdle() {
    if (this.running !== 0) {
      return;
    }
    this.safeDispatchEvent("idle");
  }
  tryToStartAnother() {
    if (this.size === 0) {
      this.emitEmpty();
      if (this.running === 0) {
        this.emitIdle();
      }
      return false;
    }
    if (this.pending < this.concurrency) {
      let job;
      for (const j of this.queue) {
        if (j.status === "queued") {
          job = j;
          break;
        }
      }
      if (job == null) {
        return false;
      }
      this.safeDispatchEvent("active");
      this.pending++;
      void job.run().finally(() => {
        for (let i2 = 0; i2 < this.queue.length; i2++) {
          if (this.queue[i2] === job) {
            this.queue.splice(i2, 1);
            break;
          }
        }
        this.pending--;
        this.tryToStartAnother();
        this.safeDispatchEvent("next");
      });
      return true;
    }
    return false;
  }
  enqueue(job) {
    this.queue.push(job);
    if (this.sort != null) {
      this.queue.sort(this.sort);
    }
  }
  /**
   * Adds a sync or async task to the queue. Always returns a promise.
   */
  async add(fn, options) {
    options?.signal?.throwIfAborted();
    if (this.size === this.maxSize) {
      throw new QueueFullError2();
    }
    const job = new Job2(fn, options);
    this.enqueue(job);
    this.safeDispatchEvent("add");
    this.tryToStartAnother();
    return job.join(options).then((result) => {
      this.safeDispatchEvent("completed", { detail: result });
      this.safeDispatchEvent("success", { detail: { job, result } });
      return result;
    }).catch((err) => {
      if (job.status === "queued") {
        for (let i2 = 0; i2 < this.queue.length; i2++) {
          if (this.queue[i2] === job) {
            this.queue.splice(i2, 1);
            break;
          }
        }
      }
      this.safeDispatchEvent("failure", { detail: { job, error: err } });
      throw err;
    });
  }
  /**
   * Clear the queue
   */
  clear() {
    this.queue.splice(0, this.queue.length);
  }
  /**
   * Abort all jobs in the queue and clear it
   */
  abort() {
    this.queue.forEach((job) => {
      job.abort(new AbortError());
    });
    this.clear();
  }
  /**
   * Can be called multiple times. Useful if you for example add additional items at a later time.
   *
   * @returns A promise that settles when the queue becomes empty.
   */
  async onEmpty(options) {
    if (this.size === 0) {
      return;
    }
    await raceEvent(this, "empty", options?.signal);
  }
  /**
   * @returns A promise that settles when the queue size is less than the given
   * limit: `queue.size < limit`.
   *
   * If you want to avoid having the queue grow beyond a certain size you can
   * `await queue.onSizeLessThan()` before adding a new item.
   *
   * Note that this only limits the number of items waiting to start. There
   * could still be up to `concurrency` jobs already running that this call does
   * not include in its calculation.
   */
  async onSizeLessThan(limit, options) {
    if (this.size < limit) {
      return;
    }
    await raceEvent(this, "next", options?.signal, {
      filter: () => this.size < limit
    });
  }
  /**
   * The difference with `.onEmpty` is that `.onIdle` guarantees that all work
   * from the queue has finished. `.onEmpty` merely signals that the queue is
   * empty, but it could mean that some promises haven't completed yet.
   *
   * @returns A promise that settles when the queue becomes empty, and all
   * promises have completed; `queue.size === 0 && queue.pending === 0`.
   */
  async onIdle(options) {
    if (this.pending === 0 && this.size === 0) {
      return;
    }
    await raceEvent(this, "idle", options?.signal);
  }
  /**
   * Size of the queue including running items
   */
  get size() {
    return this.queue.length;
  }
  /**
   * The number of queued items waiting to run.
   */
  get queued() {
    return this.queue.length - this.pending;
  }
  /**
   * The number of items currently running.
   */
  get running() {
    return this.pending;
  }
  /**
   * Returns an async generator that makes it easy to iterate over the results
   * of jobs added to the queue.
   *
   * The generator will end when the queue becomes idle, that is there are no
   * jobs running and no jobs that have yet to run.
   *
   * If you need to keep the queue open indefinitely, consider using it-pushable
   * instead.
   */
  async *toGenerator(options) {
    options?.signal?.throwIfAborted();
    const stream = pushable({
      objectMode: true
    });
    const cleanup = (err) => {
      if (err != null) {
        this.abort();
      } else {
        this.clear();
      }
      stream.end(err);
    };
    const onQueueJobComplete = (evt) => {
      if (evt.detail != null) {
        stream.push(evt.detail);
      }
    };
    const onQueueFailure = (evt) => {
      cleanup(evt.detail.error);
    };
    const onQueueIdle = () => {
      cleanup();
    };
    const onSignalAbort = () => {
      cleanup(new AbortError("Queue aborted"));
    };
    this.addEventListener("completed", onQueueJobComplete);
    this.addEventListener("failure", onQueueFailure);
    this.addEventListener("idle", onQueueIdle);
    options?.signal?.addEventListener("abort", onSignalAbort);
    try {
      yield* stream;
    } finally {
      this.removeEventListener("completed", onQueueJobComplete);
      this.removeEventListener("failure", onQueueFailure);
      this.removeEventListener("idle", onQueueIdle);
      options?.signal?.removeEventListener("abort", onSignalAbort);
      cleanup();
    }
  }
};

// node_modules/@libp2p/utils/dist/src/priority-queue.js
var PriorityQueue = class extends Queue2 {
  constructor(init2 = {}) {
    super({
      ...init2,
      sort: (a2, b) => {
        if (a2.options.priority > b.options.priority) {
          return -1;
        }
        if (a2.options.priority < b.options.priority) {
          return 1;
        }
        return 0;
      }
    });
  }
};

// node_modules/any-signal/dist/src/index.js
function anySignal(signals) {
  const controller = new globalThis.AbortController();
  function onAbort() {
    const reason = signals.filter((s2) => s2?.aborted === true).map((s2) => s2?.reason).pop();
    controller.abort(reason);
    for (const signal2 of signals) {
      if (signal2?.removeEventListener != null) {
        signal2.removeEventListener("abort", onAbort);
      }
    }
  }
  for (const signal2 of signals) {
    if (signal2?.aborted === true) {
      onAbort();
      break;
    }
    if (signal2?.addEventListener != null) {
      signal2.addEventListener("abort", onAbort);
    }
  }
  function clear() {
    for (const signal2 of signals) {
      if (signal2?.removeEventListener != null) {
        signal2.removeEventListener("abort", onAbort);
      }
    }
  }
  const signal = controller.signal;
  signal.clear = clear;
  return signal;
}

// node_modules/is-loopback-addr/dist/src/index.js
function isLoopbackAddr(ip) {
  return /^127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(ip) || /^::1$/.test(ip);
}

// node_modules/@libp2p/utils/dist/src/multiaddr/is-loopback.js
function isLoopback(ma) {
  if (!isIpBased(ma)) {
    return false;
  }
  const { address } = ma.nodeAddress();
  return isLoopbackAddr(address);
}

// node_modules/libp2p/dist/src/connection-manager/address-sorter.js
function reliableTransportsFirst(a2, b) {
  const isATcp = TCP.exactMatch(a2.multiaddr);
  const isBTcp = TCP.exactMatch(b.multiaddr);
  if (isATcp && !isBTcp) {
    return -1;
  }
  if (!isATcp && isBTcp) {
    return 1;
  }
  const isAWebSocketSecure = WebSocketsSecure.exactMatch(a2.multiaddr);
  const isBWebSocketSecure = WebSocketsSecure.exactMatch(b.multiaddr);
  if (isAWebSocketSecure && !isBWebSocketSecure) {
    return -1;
  }
  if (!isAWebSocketSecure && isBWebSocketSecure) {
    return 1;
  }
  const isAWebSocket = WebSockets.exactMatch(a2.multiaddr);
  const isBWebSocket = WebSockets.exactMatch(b.multiaddr);
  if (isAWebSocket && !isBWebSocket) {
    return -1;
  }
  if (!isAWebSocket && isBWebSocket) {
    return 1;
  }
  const isAWebRTC = WebRTC.exactMatch(a2.multiaddr);
  const isBWebRTC = WebRTC.exactMatch(b.multiaddr);
  if (isAWebRTC && !isBWebRTC) {
    return -1;
  }
  if (!isAWebRTC && isBWebRTC) {
    return 1;
  }
  const isAWebRTCDirect = WebRTCDirect.exactMatch(a2.multiaddr);
  const isBWebRTCDirect = WebRTCDirect.exactMatch(b.multiaddr);
  if (isAWebRTCDirect && !isBWebRTCDirect) {
    return -1;
  }
  if (!isAWebRTCDirect && isBWebRTCDirect) {
    return 1;
  }
  const isAWebTransport = WebTransport.exactMatch(a2.multiaddr);
  const isBWebTransport = WebTransport.exactMatch(b.multiaddr);
  if (isAWebTransport && !isBWebTransport) {
    return -1;
  }
  if (!isAWebTransport && isBWebTransport) {
    return 1;
  }
  return 0;
}
function loopbackAddressLast(a2, b) {
  const isALoopback = isLoopback(a2.multiaddr);
  const isBLoopback = isLoopback(b.multiaddr);
  if (isALoopback && !isBLoopback) {
    return 1;
  } else if (!isALoopback && isBLoopback) {
    return -1;
  }
  return 0;
}
function publicAddressesFirst(a2, b) {
  const isAPrivate = isPrivate(a2.multiaddr);
  const isBPrivate = isPrivate(b.multiaddr);
  if (isAPrivate && !isBPrivate) {
    return 1;
  } else if (!isAPrivate && isBPrivate) {
    return -1;
  }
  return 0;
}
function certifiedAddressesFirst(a2, b) {
  if (a2.isCertified && !b.isCertified) {
    return -1;
  } else if (!a2.isCertified && b.isCertified) {
    return 1;
  }
  return 0;
}
function circuitRelayAddressesLast(a2, b) {
  const isACircuit = Circuit.exactMatch(a2.multiaddr);
  const isBCircuit = Circuit.exactMatch(b.multiaddr);
  if (isACircuit && !isBCircuit) {
    return 1;
  } else if (!isACircuit && isBCircuit) {
    return -1;
  }
  return 0;
}
function defaultAddressSorter(addresses) {
  return addresses.sort(reliableTransportsFirst).sort(certifiedAddressesFirst).sort(circuitRelayAddressesLast).sort(publicAddressesFirst).sort(loopbackAddressLast);
}

// node_modules/libp2p/dist/src/connection-manager/resolvers/index.js
async function resolveMultiaddr(address, resolvers2, options) {
  const depth = options.depth ?? 0;
  if (depth > (options.maxRecursiveDepth ?? MAX_RECURSIVE_DEPTH)) {
    throw new RecursionLimitError("Max recursive depth reached");
  }
  let resolved = false;
  const output = [];
  for (const resolver of Object.values(resolvers2)) {
    if (resolver.canResolve(address)) {
      resolved = true;
      const addresses = await resolver.resolve(address, options);
      for (const address2 of addresses) {
        output.push(...await resolveMultiaddr(address2, resolvers2, {
          ...options,
          depth: depth + 1
        }));
      }
    }
  }
  if (resolved === false) {
    output.push(address);
  }
  return output;
}

// node_modules/libp2p/dist/src/connection-manager/dial-queue.js
var defaultOptions3 = {
  maxParallelDials: MAX_PARALLEL_DIALS,
  maxDialQueueLength: MAX_DIAL_QUEUE_LENGTH,
  maxPeerAddrsToDial: MAX_PEER_ADDRS_TO_DIAL,
  dialTimeout: DIAL_TIMEOUT,
  resolvers: {
    dnsaddr: dnsaddrResolver
  }
};
var DialQueue = class {
  queue;
  components;
  addressSorter;
  maxPeerAddrsToDial;
  maxDialQueueLength;
  dialTimeout;
  shutDownController;
  connections;
  log;
  resolvers;
  constructor(components, init2 = {}) {
    this.addressSorter = init2.addressSorter;
    this.maxPeerAddrsToDial = init2.maxPeerAddrsToDial ?? defaultOptions3.maxPeerAddrsToDial;
    this.maxDialQueueLength = init2.maxDialQueueLength ?? defaultOptions3.maxDialQueueLength;
    this.dialTimeout = init2.dialTimeout ?? defaultOptions3.dialTimeout;
    this.connections = init2.connections ?? new PeerMap();
    this.log = components.logger.forComponent("libp2p:connection-manager:dial-queue");
    this.components = components;
    this.resolvers = init2.resolvers ?? defaultOptions3.resolvers;
    this.shutDownController = new AbortController();
    setMaxListeners(Infinity, this.shutDownController.signal);
    this.queue = new PriorityQueue({
      concurrency: init2.maxParallelDials ?? defaultOptions3.maxParallelDials,
      metricName: "libp2p_dial_queue",
      metrics: components.metrics
    });
    this.queue.addEventListener("failure", (event) => {
      if (event.detail?.error.name !== AbortError.name) {
        this.log.error("error in dial queue - %e", event.detail);
      }
    });
  }
  start() {
    this.shutDownController = new AbortController();
    setMaxListeners(Infinity, this.shutDownController.signal);
  }
  /**
   * Clears any pending dials
   */
  stop() {
    this.shutDownController.abort();
    this.queue.abort();
  }
  /**
   * Connects to a given peer, multiaddr or list of multiaddrs.
   *
   * If a peer is passed, all known multiaddrs will be tried. If a multiaddr or
   * multiaddrs are passed only those will be dialled.
   *
   * Where a list of multiaddrs is passed, if any contain a peer id then all
   * multiaddrs in the list must contain the same peer id.
   *
   * The dial to the first address that is successfully able to upgrade a
   * connection will be used, all other dials will be aborted when that happens.
   */
  async dial(peerIdOrMultiaddr, options = {}) {
    const { peerId, multiaddrs } = getPeerAddress(peerIdOrMultiaddr);
    const existingConnection = Array.from(this.connections.values()).flat().find((conn) => {
      if (options.force === true) {
        return false;
      }
      if (conn.limits != null) {
        return false;
      }
      if (conn.remotePeer.equals(peerId)) {
        return true;
      }
      return multiaddrs.find((addr) => {
        return addr.equals(conn.remoteAddr);
      });
    });
    if (existingConnection?.status === "open") {
      this.log("already connected to %a", existingConnection.remoteAddr);
      options.onProgress?.(new CustomProgressEvent("dial-queue:already-connected"));
      return existingConnection;
    }
    const existingDial = this.queue.queue.find((job) => {
      if (peerId?.equals(job.options.peerId) === true) {
        return true;
      }
      const addresses = job.options.multiaddrs;
      if (addresses == null) {
        return false;
      }
      for (const multiaddr2 of multiaddrs) {
        if (addresses.has(multiaddr2.toString())) {
          return true;
        }
      }
      return false;
    });
    if (existingDial != null) {
      this.log("joining existing dial target for %p", peerId);
      for (const multiaddr2 of multiaddrs) {
        existingDial.options.multiaddrs.add(multiaddr2.toString());
      }
      options.onProgress?.(new CustomProgressEvent("dial-queue:already-in-dial-queue"));
      return existingDial.join(options);
    }
    if (this.queue.size >= this.maxDialQueueLength) {
      throw new DialError("Dial queue is full");
    }
    this.log("creating dial target for %p", peerId, multiaddrs.map((ma) => ma.toString()));
    options.onProgress?.(new CustomProgressEvent("dial-queue:add-to-dial-queue"));
    return this.queue.add(async (options2) => {
      options2.onProgress?.(new CustomProgressEvent("dial-queue:start-dial"));
      const signal = anySignal([
        this.shutDownController.signal,
        options2.signal
      ]);
      setMaxListeners(Infinity, signal);
      try {
        return await this.dialPeer(options2, signal);
      } finally {
        signal.clear();
      }
    }, {
      peerId,
      priority: options.priority ?? DEFAULT_DIAL_PRIORITY,
      multiaddrs: new Set(multiaddrs.map((ma) => ma.toString())),
      signal: options.signal ?? AbortSignal.timeout(this.dialTimeout),
      onProgress: options.onProgress
    });
  }
  async dialPeer(options, signal) {
    const peerId = options.peerId;
    const multiaddrs = options.multiaddrs;
    const failedMultiaddrs = /* @__PURE__ */ new Set();
    let forcePeerLookup = options.multiaddrs.size === 0;
    let dialed = 0;
    let dialIteration = 0;
    const errors = [];
    this.log("starting dial to %p", peerId);
    while (forcePeerLookup || multiaddrs.size > 0) {
      dialIteration++;
      forcePeerLookup = false;
      const addrsToDial = [];
      const addrs = new Set(options.multiaddrs);
      multiaddrs.clear();
      this.log("calculating addrs to dial %p from %s", peerId, [...addrs]);
      const calculatedAddrs = await this.calculateMultiaddrs(peerId, addrs, {
        ...options,
        signal
      });
      for (const addr of calculatedAddrs) {
        if (failedMultiaddrs.has(addr.multiaddr.toString())) {
          this.log.trace("skipping previously failed multiaddr %a while dialing %p", addr.multiaddr, peerId);
          continue;
        }
        addrsToDial.push(addr);
      }
      this.log("%s dial to %p with %s", dialIteration === 1 ? "starting" : "continuing", peerId, addrsToDial.map((ma) => ma.multiaddr.toString()));
      options?.onProgress?.(new CustomProgressEvent("dial-queue:calculated-addresses", addrsToDial));
      for (const address of addrsToDial) {
        if (dialed === this.maxPeerAddrsToDial) {
          this.log("dialed maxPeerAddrsToDial (%d) addresses for %p, not trying any others", dialed, options.peerId);
          throw new DialError("Peer had more than maxPeerAddrsToDial");
        }
        dialed++;
        try {
          const conn = await this.components.transportManager.dial(address.multiaddr, {
            ...options,
            signal
          });
          this.log("dial to %a succeeded", address.multiaddr);
          try {
            await this.components.peerStore.merge(conn.remotePeer, {
              multiaddrs: [
                conn.remoteAddr
              ],
              metadata: {
                [LAST_DIAL_SUCCESS_KEY]: fromString2(Date.now().toString())
              }
            });
          } catch (err) {
            this.log.error("could not update last dial failure key for %p", peerId, err);
          }
          return conn;
        } catch (err) {
          this.log.error("dial failed to %a", address.multiaddr, err);
          failedMultiaddrs.add(address.multiaddr.toString());
          if (peerId != null) {
            try {
              await this.components.peerStore.merge(peerId, {
                metadata: {
                  [LAST_DIAL_FAILURE_KEY]: fromString2(Date.now().toString())
                }
              });
            } catch (err2) {
              this.log.error("could not update last dial failure key for %p", peerId, err2);
            }
          }
          if (signal.aborted) {
            throw new TimeoutError(err.message);
          }
          errors.push(err);
        }
      }
    }
    if (errors.length === 1) {
      throw errors[0];
    }
    throw new AggregateError(errors, "All multiaddr dials failed");
  }
  // eslint-disable-next-line complexity
  async calculateMultiaddrs(peerId, multiaddrs = /* @__PURE__ */ new Set(), options = {}) {
    const addrs = [...multiaddrs].map((ma) => ({
      multiaddr: multiaddr(ma),
      isCertified: false
    }));
    if (peerId != null) {
      if (this.components.peerId.equals(peerId)) {
        throw new DialError("Tried to dial self");
      }
      if (await this.components.connectionGater.denyDialPeer?.(peerId) === true) {
        throw new DialDeniedError("The dial request is blocked by gater.allowDialPeer");
      }
      if (addrs.length === 0) {
        this.log("loading multiaddrs for %p", peerId);
        try {
          const peer = await this.components.peerStore.get(peerId);
          addrs.push(...peer.addresses);
          this.log("loaded multiaddrs for %p", peerId, addrs.map(({ multiaddr: multiaddr2 }) => multiaddr2.toString()));
        } catch (err) {
          if (err.name !== "NotFoundError") {
            throw err;
          }
        }
      }
      if (addrs.length === 0) {
        this.log("looking up multiaddrs for %p in the peer routing", peerId);
        try {
          const peerInfo = await this.components.peerRouting.findPeer(peerId, options);
          this.log("found multiaddrs for %p in the peer routing", peerId, addrs.map(({ multiaddr: multiaddr2 }) => multiaddr2.toString()));
          addrs.push(...peerInfo.multiaddrs.map((multiaddr2) => ({
            multiaddr: multiaddr2,
            isCertified: false
          })));
        } catch (err) {
          if (err.name === "NoPeerRoutersError") {
            this.log("no peer routers configured", peerId);
          } else {
            this.log.error("looking up multiaddrs for %p in the peer routing failed - %e", peerId, err);
          }
        }
      }
    }
    let resolvedAddresses = (await Promise.all(addrs.map(async (addr) => {
      const result = await resolveMultiaddr(addr.multiaddr, this.resolvers, {
        dns: this.components.dns,
        log: this.log,
        ...options
      });
      if (result.length === 1 && result[0].equals(addr.multiaddr)) {
        return addr;
      }
      return result.map((multiaddr2) => ({
        multiaddr: multiaddr2,
        isCertified: false
      }));
    }))).flat();
    if (peerId != null) {
      const peerIdMultiaddr = `/p2p/${peerId.toString()}`;
      resolvedAddresses = resolvedAddresses.map((addr) => {
        const lastComponent = addr.multiaddr.getComponents().pop();
        if (lastComponent?.name !== "p2p") {
          return {
            multiaddr: addr.multiaddr.encapsulate(peerIdMultiaddr),
            isCertified: addr.isCertified
          };
        }
        return addr;
      });
    }
    const filteredAddrs = resolvedAddresses.filter((addr) => {
      if (this.components.transportManager.dialTransportForMultiaddr(addr.multiaddr) == null) {
        return false;
      }
      const addrPeerId = addr.multiaddr.getPeerId();
      if (peerId != null && addrPeerId != null) {
        return peerId.equals(addrPeerId);
      }
      return true;
    });
    const dedupedAddrs = /* @__PURE__ */ new Map();
    for (const addr of filteredAddrs) {
      const maStr = addr.multiaddr.toString();
      const existing = dedupedAddrs.get(maStr);
      if (existing != null) {
        existing.isCertified = existing.isCertified || addr.isCertified || false;
        continue;
      }
      dedupedAddrs.set(maStr, addr);
    }
    const dedupedMultiaddrs = [...dedupedAddrs.values()];
    if (dedupedMultiaddrs.length === 0) {
      throw new NoValidAddressesError("The dial request has no valid addresses");
    }
    const gatedAddrs = [];
    for (const addr of dedupedMultiaddrs) {
      if (this.components.connectionGater.denyDialMultiaddr != null && await this.components.connectionGater.denyDialMultiaddr(addr.multiaddr)) {
        continue;
      }
      gatedAddrs.push(addr);
    }
    const sortedGatedAddrs = this.addressSorter == null ? defaultAddressSorter(gatedAddrs) : gatedAddrs.sort(this.addressSorter);
    if (sortedGatedAddrs.length === 0) {
      throw new DialDeniedError("The connection gater denied all addresses in the dial request");
    }
    this.log.trace("addresses for %p before filtering", peerId ?? "unknown peer", resolvedAddresses.map(({ multiaddr: multiaddr2 }) => multiaddr2.toString()));
    this.log.trace("addresses for %p after filtering", peerId ?? "unknown peer", sortedGatedAddrs.map(({ multiaddr: multiaddr2 }) => multiaddr2.toString()));
    return sortedGatedAddrs;
  }
  async isDialable(multiaddr2, options = {}) {
    if (!Array.isArray(multiaddr2)) {
      multiaddr2 = [multiaddr2];
    }
    try {
      const addresses = await this.calculateMultiaddrs(void 0, new Set(multiaddr2.map((ma) => ma.toString())), options);
      if (options.runOnLimitedConnection === false) {
        return addresses.find((addr) => {
          return !Circuit.matches(addr.multiaddr);
        }) != null;
      }
      return true;
    } catch (err) {
      this.log.trace("error calculating if multiaddr(s) were dialable", err);
    }
    return false;
  }
};

// node_modules/@libp2p/utils/dist/src/peer-queue.js
var PeerQueue = class extends Queue2 {
  has(peerId) {
    return this.find(peerId) != null;
  }
  find(peerId) {
    return this.queue.find((job) => {
      return peerId.equals(job.options.peerId);
    });
  }
};

// node_modules/p-retry/index.js
var import_retry = __toESM(require_retry2(), 1);

// node_modules/is-network-error/index.js
var objectToString = Object.prototype.toString;
var isError = (value2) => objectToString.call(value2) === "[object Error]";
var errorMessages = /* @__PURE__ */ new Set([
  "network error",
  // Chrome
  "Failed to fetch",
  // Chrome
  "NetworkError when attempting to fetch resource.",
  // Firefox
  "The Internet connection appears to be offline.",
  // Safari 16
  "Network request failed",
  // `cross-fetch`
  "fetch failed",
  // Undici (Node.js)
  "terminated",
  // Undici (Node.js)
  " A network error occurred.",
  // Bun (WebKit)
  "Network connection lost"
  // Cloudflare Workers (fetch)
]);
function isNetworkError(error) {
  const isValid = error && isError(error) && error.name === "TypeError" && typeof error.message === "string";
  if (!isValid) {
    return false;
  }
  const { message: message2, stack } = error;
  if (message2 === "Load failed") {
    return stack === void 0 || "__sentry_captured__" in error;
  }
  if (message2.startsWith("error sending request for url")) {
    return true;
  }
  return errorMessages.has(message2);
}

// node_modules/p-retry/index.js
var AbortError5 = class extends Error {
  constructor(message2) {
    super();
    if (message2 instanceof Error) {
      this.originalError = message2;
      ({ message: message2 } = message2);
    } else {
      this.originalError = new Error(message2);
      this.originalError.stack = this.stack;
    }
    this.name = "AbortError";
    this.message = message2;
  }
};
var decorateErrorWithCounts = (error, attemptNumber, options) => {
  const retriesLeft = options.retries - (attemptNumber - 1);
  error.attemptNumber = attemptNumber;
  error.retriesLeft = retriesLeft;
  return error;
};
async function pRetry(input, options) {
  return new Promise((resolve, reject) => {
    options = { ...options };
    options.onFailedAttempt ??= () => {
    };
    options.shouldRetry ??= () => true;
    options.retries ??= 10;
    const operation = import_retry.default.operation(options);
    const abortHandler = () => {
      operation.stop();
      reject(options.signal?.reason);
    };
    if (options.signal && !options.signal.aborted) {
      options.signal.addEventListener("abort", abortHandler, { once: true });
    }
    const cleanUp = () => {
      options.signal?.removeEventListener("abort", abortHandler);
      operation.stop();
    };
    operation.attempt(async (attemptNumber) => {
      try {
        const result = await input(attemptNumber);
        cleanUp();
        resolve(result);
      } catch (error) {
        try {
          if (!(error instanceof Error)) {
            throw new TypeError(`Non-error was thrown: "${error}". You should only throw errors.`);
          }
          if (error instanceof AbortError5) {
            throw error.originalError;
          }
          if (error instanceof TypeError && !isNetworkError(error)) {
            throw error;
          }
          decorateErrorWithCounts(error, attemptNumber, options);
          if (!await options.shouldRetry(error)) {
            operation.stop();
            reject(error);
          }
          await options.onFailedAttempt(error);
          if (!operation.retry(error)) {
            throw operation.mainError();
          }
        } catch (finalError) {
          decorateErrorWithCounts(finalError, attemptNumber, options);
          cleanUp();
          reject(finalError);
        }
      }
    });
  });
}

// node_modules/libp2p/dist/src/connection-manager/reconnect-queue.js
var ReconnectQueue = class {
  log;
  queue;
  started;
  peerStore;
  retries;
  retryInterval;
  backoffFactor;
  connectionManager;
  events;
  constructor(components, init2 = {}) {
    this.log = components.logger.forComponent("libp2p:reconnect-queue");
    this.peerStore = components.peerStore;
    this.connectionManager = components.connectionManager;
    this.queue = new PeerQueue({
      concurrency: init2.maxParallelReconnects ?? MAX_PARALLEL_RECONNECTS,
      metricName: "libp2p_reconnect_queue",
      metrics: components.metrics
    });
    this.started = false;
    this.retries = init2.retries ?? 5;
    this.backoffFactor = init2.backoffFactor;
    this.retryInterval = init2.retryInterval;
    this.events = components.events;
    components.events.addEventListener("peer:disconnect", (evt) => {
      this.maybeReconnect(evt.detail).catch((err) => {
        this.log.error("failed to maybe reconnect to %p - %e", evt.detail, err);
      });
    });
  }
  async maybeReconnect(peerId) {
    if (!this.started) {
      return;
    }
    const peer = await this.peerStore.get(peerId);
    if (!hasKeepAliveTag(peer)) {
      return;
    }
    if (this.queue.has(peerId)) {
      return;
    }
    this.queue.add(async (options) => {
      await pRetry(async (attempt) => {
        if (!this.started) {
          return;
        }
        try {
          await this.connectionManager.openConnection(peerId, {
            signal: options?.signal
          });
        } catch (err) {
          this.log("reconnecting to %p attempt %d of %d failed - %e", peerId, attempt, this.retries, err);
          throw err;
        }
      }, {
        signal: options?.signal,
        retries: this.retries,
        factor: this.backoffFactor,
        minTimeout: this.retryInterval
      });
    }, {
      peerId
    }).catch(async (err) => {
      this.log.error("failed to reconnect to %p - %e", peerId, err);
      const tags = {};
      [...peer.tags.keys()].forEach((key) => {
        if (key.startsWith(KEEP_ALIVE)) {
          tags[key] = void 0;
        }
      });
      await this.peerStore.merge(peerId, {
        tags
      });
      this.events.safeDispatchEvent("peer:reconnect-failure", {
        detail: peerId
      });
    }).catch(async (err) => {
      this.log.error("failed to remove keep-alive tag from %p - %e", peerId, err);
    });
  }
  start() {
    this.started = true;
  }
  async afterStart() {
    void Promise.resolve().then(async () => {
      const keepAlivePeers = await this.peerStore.all({
        filters: [
          (peer) => hasKeepAliveTag(peer)
        ]
      });
      await Promise.all(keepAlivePeers.map(async (peer) => {
        await this.connectionManager.openConnection(peer.id).catch((err) => {
          this.log.error(err);
        });
      }));
    }).catch((err) => {
      this.log.error(err);
    });
  }
  stop() {
    this.started = false;
    this.queue.abort();
  }
};
function hasKeepAliveTag(peer) {
  for (const tag of peer.tags.keys()) {
    if (tag.startsWith(KEEP_ALIVE)) {
      return true;
    }
  }
  return false;
}

// node_modules/libp2p/dist/src/connection-manager/index.js
var DEFAULT_DIAL_PRIORITY = 50;
var defaultOptions4 = {
  maxConnections: MAX_CONNECTIONS,
  inboundConnectionThreshold: INBOUND_CONNECTION_THRESHOLD,
  maxIncomingPendingConnections: MAX_INCOMING_PENDING_CONNECTIONS
};
var DefaultConnectionManager = class {
  started;
  connections;
  allow;
  deny;
  maxIncomingPendingConnections;
  incomingPendingConnections;
  outboundPendingConnections;
  maxConnections;
  dialQueue;
  reconnectQueue;
  connectionPruner;
  inboundConnectionRateLimiter;
  peerStore;
  metrics;
  events;
  log;
  peerId;
  constructor(components, init2 = {}) {
    this.maxConnections = init2.maxConnections ?? defaultOptions4.maxConnections;
    if (this.maxConnections < 1) {
      throw new InvalidParametersError2("Connection Manager maxConnections must be greater than 0");
    }
    this.connections = new PeerMap();
    this.started = false;
    this.peerId = components.peerId;
    this.peerStore = components.peerStore;
    this.metrics = components.metrics;
    this.events = components.events;
    this.log = components.logger.forComponent("libp2p:connection-manager");
    this.onConnect = this.onConnect.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
    this.allow = (init2.allow ?? []).map((str) => multiaddrToIpNet(str));
    this.deny = (init2.deny ?? []).map((str) => multiaddrToIpNet(str));
    this.incomingPendingConnections = 0;
    this.maxIncomingPendingConnections = init2.maxIncomingPendingConnections ?? defaultOptions4.maxIncomingPendingConnections;
    this.outboundPendingConnections = 0;
    this.inboundConnectionRateLimiter = new RateLimiter({
      points: init2.inboundConnectionThreshold ?? defaultOptions4.inboundConnectionThreshold,
      duration: 1
    });
    this.connectionPruner = new ConnectionPruner({
      connectionManager: this,
      peerStore: components.peerStore,
      events: components.events,
      logger: components.logger
    }, {
      allow: init2.allow?.map((a2) => multiaddr(a2))
    });
    this.dialQueue = new DialQueue(components, {
      addressSorter: init2.addressSorter,
      maxParallelDials: init2.maxParallelDials ?? MAX_PARALLEL_DIALS,
      maxDialQueueLength: init2.maxDialQueueLength ?? MAX_DIAL_QUEUE_LENGTH,
      maxPeerAddrsToDial: init2.maxPeerAddrsToDial ?? MAX_PEER_ADDRS_TO_DIAL,
      dialTimeout: init2.dialTimeout ?? DIAL_TIMEOUT,
      resolvers: init2.resolvers ?? {
        dnsaddr: dnsaddrResolver
      },
      connections: this.connections
    });
    this.reconnectQueue = new ReconnectQueue({
      events: components.events,
      peerStore: components.peerStore,
      logger: components.logger,
      connectionManager: this
    }, {
      retries: init2.reconnectRetries,
      retryInterval: init2.reconnectRetryInterval,
      backoffFactor: init2.reconnectBackoffFactor,
      maxParallelReconnects: init2.maxParallelReconnects
    });
  }
  [Symbol.toStringTag] = "@libp2p/connection-manager";
  /**
   * Starts the Connection Manager. If Metrics are not enabled on libp2p
   * only event loop and connection limits will be monitored.
   */
  async start() {
    this.metrics?.registerMetricGroup("libp2p_connection_manager_connections", {
      calculate: () => {
        const metric = {
          inbound: 0,
          "inbound pending": this.incomingPendingConnections,
          outbound: 0,
          "outbound pending": this.outboundPendingConnections
        };
        for (const conns of this.connections.values()) {
          for (const conn of conns) {
            metric[conn.direction]++;
          }
        }
        return metric;
      }
    });
    this.metrics?.registerMetricGroup("libp2p_protocol_streams_total", {
      label: "protocol",
      calculate: () => {
        const metric = {};
        for (const conns of this.connections.values()) {
          for (const conn of conns) {
            for (const stream of conn.streams) {
              const key = `${stream.direction} ${stream.protocol ?? "unnegotiated"}`;
              metric[key] = (metric[key] ?? 0) + 1;
            }
          }
        }
        return metric;
      }
    });
    this.metrics?.registerMetricGroup("libp2p_connection_manager_protocol_streams_per_connection_90th_percentile", {
      label: "protocol",
      calculate: () => {
        const allStreams = {};
        for (const conns of this.connections.values()) {
          for (const conn of conns) {
            const streams = {};
            for (const stream of conn.streams) {
              const key = `${stream.direction} ${stream.protocol ?? "unnegotiated"}`;
              streams[key] = (streams[key] ?? 0) + 1;
            }
            for (const [protocol, count] of Object.entries(streams)) {
              allStreams[protocol] = allStreams[protocol] ?? [];
              allStreams[protocol].push(count);
            }
          }
        }
        const metric = {};
        for (let [protocol, counts] of Object.entries(allStreams)) {
          counts = counts.sort((a2, b) => a2 - b);
          const index = Math.floor(counts.length * 0.9);
          metric[protocol] = counts[index];
        }
        return metric;
      }
    });
    this.events.addEventListener("connection:open", this.onConnect);
    this.events.addEventListener("connection:close", this.onDisconnect);
    await start(this.dialQueue, this.reconnectQueue, this.connectionPruner);
    this.started = true;
    this.log("started");
  }
  /**
   * Stops the Connection Manager
   */
  async stop() {
    this.events.removeEventListener("connection:open", this.onConnect);
    this.events.removeEventListener("connection:close", this.onDisconnect);
    await stop(this.reconnectQueue, this.dialQueue, this.connectionPruner);
    const tasks = [];
    for (const connectionList of this.connections.values()) {
      for (const connection of connectionList) {
        tasks.push((async () => {
          try {
            await connection.close();
          } catch (err) {
            this.log.error(err);
          }
        })());
      }
    }
    this.log("closing %d connections", tasks.length);
    await Promise.all(tasks);
    this.connections.clear();
    this.log("stopped");
  }
  getMaxConnections() {
    return this.maxConnections;
  }
  setMaxConnections(maxConnections) {
    if (this.maxConnections < 1) {
      throw new InvalidParametersError2("Connection Manager maxConnections must be greater than 0");
    }
    let needsPrune = false;
    if (maxConnections < this.maxConnections) {
      needsPrune = true;
    }
    this.maxConnections = maxConnections;
    if (needsPrune) {
      this.connectionPruner.maybePruneConnections();
    }
  }
  onConnect(evt) {
    void this._onConnect(evt).catch((err) => {
      this.log.error(err);
    });
  }
  /**
   * Tracks the incoming connection and check the connection limit
   */
  async _onConnect(evt) {
    const { detail: connection } = evt;
    if (!this.started) {
      await connection.close();
      return;
    }
    if (connection.status !== "open") {
      return;
    }
    const peerId = connection.remotePeer;
    const isNewPeer = !this.connections.has(peerId);
    const storedConns = this.connections.get(peerId) ?? [];
    storedConns.push(connection);
    this.connections.set(peerId, storedConns);
    if (peerId.publicKey != null && peerId.type === "RSA") {
      await this.peerStore.patch(peerId, {
        publicKey: peerId.publicKey
      });
    }
    if (isNewPeer) {
      this.events.safeDispatchEvent("peer:connect", { detail: connection.remotePeer });
    }
  }
  /**
   * Removes the connection from tracking
   */
  onDisconnect(evt) {
    const { detail: connection } = evt;
    const peerId = connection.remotePeer;
    const peerConns = this.connections.get(peerId) ?? [];
    const filteredPeerConns = peerConns.filter((conn) => conn.id !== connection.id);
    this.connections.set(peerId, filteredPeerConns);
    if (filteredPeerConns.length === 0) {
      this.log.trace("peer %p disconnected, removing connection map entry", peerId);
      this.connections.delete(peerId);
      this.events.safeDispatchEvent("peer:disconnect", { detail: connection.remotePeer });
    }
  }
  getConnections(peerId) {
    if (peerId != null) {
      return this.connections.get(peerId) ?? [];
    }
    let conns = [];
    for (const c2 of this.connections.values()) {
      conns = conns.concat(c2);
    }
    return conns;
  }
  getConnectionsMap() {
    return this.connections;
  }
  async openConnection(peerIdOrMultiaddr, options = {}) {
    if (!this.started) {
      throw new NotStartedError("Not started");
    }
    this.outboundPendingConnections++;
    try {
      options.signal?.throwIfAborted();
      const { peerId } = getPeerAddress(peerIdOrMultiaddr);
      if (this.peerId.equals(peerId)) {
        throw new InvalidPeerIdError("Can not dial self");
      }
      if (peerId != null && options.force !== true) {
        this.log("dial %p", peerId);
        const existingConnection = this.getConnections(peerId).find((conn) => conn.limits == null);
        if (existingConnection != null) {
          this.log("had an existing non-limited connection to %p as %a", peerId, existingConnection.remoteAddr);
          options.onProgress?.(new CustomProgressEvent("dial-queue:already-connected"));
          return existingConnection;
        }
      }
      const connection = await this.dialQueue.dial(peerIdOrMultiaddr, {
        ...options,
        priority: options.priority ?? DEFAULT_DIAL_PRIORITY
      });
      if (connection.status !== "open") {
        throw new ConnectionClosedError("Remote closed connection during opening");
      }
      let peerConnections = this.connections.get(connection.remotePeer);
      if (peerConnections == null) {
        peerConnections = [];
        this.connections.set(connection.remotePeer, peerConnections);
      }
      let trackedConnection = false;
      for (const conn of peerConnections) {
        if (conn.id === connection.id) {
          trackedConnection = true;
        }
        if (options.force !== true && conn.id !== connection.id && conn.remoteAddr.equals(connection.remoteAddr)) {
          connection.abort(new InvalidMultiaddrError("Duplicate multiaddr connection"));
          return conn;
        }
      }
      if (!trackedConnection) {
        peerConnections.push(connection);
      }
      return connection;
    } finally {
      this.outboundPendingConnections--;
    }
  }
  async closeConnections(peerId, options = {}) {
    const connections = this.connections.get(peerId) ?? [];
    await Promise.all(connections.map(async (connection) => {
      try {
        await connection.close(options);
      } catch (err) {
        connection.abort(err);
      }
    }));
  }
  async acceptIncomingConnection(maConn) {
    const denyConnection = this.deny.some((ma) => {
      return ma.contains(maConn.remoteAddr.nodeAddress().address);
    });
    if (denyConnection) {
      this.log("connection from %a refused - connection remote address was in deny list", maConn.remoteAddr);
      return false;
    }
    const allowConnection = this.allow.some((ipNet) => {
      return ipNet.contains(maConn.remoteAddr.nodeAddress().address);
    });
    if (allowConnection) {
      this.incomingPendingConnections++;
      return true;
    }
    if (this.incomingPendingConnections === this.maxIncomingPendingConnections) {
      this.log("connection from %a refused - incomingPendingConnections exceeded by host", maConn.remoteAddr);
      return false;
    }
    if (maConn.remoteAddr.isThinWaistAddress()) {
      const host = maConn.remoteAddr.nodeAddress().address;
      try {
        await this.inboundConnectionRateLimiter.consume(host, 1);
      } catch {
        this.log("connection from %a refused - inboundConnectionThreshold exceeded by host %s", maConn.remoteAddr, host);
        return false;
      }
    }
    if (this.getConnections().length < this.maxConnections) {
      this.incomingPendingConnections++;
      return true;
    }
    this.log("connection from %a refused - maxConnections exceeded", maConn.remoteAddr);
    return false;
  }
  afterUpgradeInbound() {
    this.incomingPendingConnections--;
  }
  getDialQueue() {
    const statusMap = {
      queued: "queued",
      running: "active",
      errored: "error",
      complete: "success"
    };
    return this.dialQueue.queue.queue.map((job) => {
      return {
        id: job.id,
        status: statusMap[job.status],
        peerId: job.options.peerId,
        multiaddrs: [...job.options.multiaddrs].map((ma) => multiaddr(ma))
      };
    });
  }
  async isDialable(multiaddr2, options = {}) {
    return this.dialQueue.isDialable(multiaddr2, options);
  }
};

// node_modules/@libp2p/utils/dist/src/moving-average.js
var MovingAverage = class {
  movingAverage;
  variance;
  deviation;
  forecast;
  timeSpan;
  previousTime;
  constructor(timeSpan) {
    this.timeSpan = timeSpan;
    this.movingAverage = 0;
    this.variance = 0;
    this.deviation = 0;
    this.forecast = 0;
  }
  alpha(t2, pt) {
    return 1 - Math.exp(-(t2 - pt) / this.timeSpan);
  }
  push(value2, time = Date.now()) {
    if (this.previousTime != null) {
      const a2 = this.alpha(time, this.previousTime);
      const diff = value2 - this.movingAverage;
      const incr = a2 * diff;
      this.movingAverage = a2 * value2 + (1 - a2) * this.movingAverage;
      this.variance = (1 - a2) * (this.variance + diff * incr);
      this.deviation = Math.sqrt(this.variance);
      this.forecast = this.movingAverage + a2 * diff;
    } else {
      this.movingAverage = value2;
    }
    this.previousTime = time;
  }
};

// node_modules/@libp2p/utils/dist/src/adaptive-timeout.js
var DEFAULT_TIMEOUT_MULTIPLIER = 1.2;
var DEFAULT_FAILURE_MULTIPLIER = 2;
var DEFAULT_MIN_TIMEOUT = 5e3;
var DEFAULT_MAX_TIMEOUT = 6e4;
var DEFAULT_INTERVAL = 5e3;
var AdaptiveTimeout = class {
  success;
  failure;
  next;
  metric;
  timeoutMultiplier;
  failureMultiplier;
  minTimeout;
  maxTimeout;
  constructor(init2 = {}) {
    const interval = init2.interval ?? DEFAULT_INTERVAL;
    this.success = new MovingAverage(interval);
    this.failure = new MovingAverage(interval);
    this.next = new MovingAverage(interval);
    this.failureMultiplier = init2.failureMultiplier ?? DEFAULT_FAILURE_MULTIPLIER;
    this.timeoutMultiplier = init2.timeoutMultiplier ?? DEFAULT_TIMEOUT_MULTIPLIER;
    this.minTimeout = init2.minTimeout ?? DEFAULT_MIN_TIMEOUT;
    this.maxTimeout = init2.maxTimeout ?? DEFAULT_MAX_TIMEOUT;
    if (init2.metricName != null) {
      this.metric = init2.metrics?.registerMetricGroup(init2.metricName);
    }
  }
  getTimeoutSignal(options = {}) {
    let timeout = Math.round(this.next.movingAverage * (options.timeoutFactor ?? this.timeoutMultiplier));
    if (timeout < this.minTimeout) {
      timeout = this.minTimeout;
    }
    if (timeout > this.maxTimeout) {
      timeout = this.maxTimeout;
    }
    const sendTimeout = AbortSignal.timeout(timeout);
    const timeoutSignal = anySignal([options.signal, sendTimeout]);
    setMaxListeners(Infinity, timeoutSignal, sendTimeout);
    timeoutSignal.start = Date.now();
    timeoutSignal.timeout = timeout;
    return timeoutSignal;
  }
  cleanUp(signal) {
    const time = Date.now() - signal.start;
    if (signal.aborted) {
      this.failure.push(time);
      this.next.push(time * this.failureMultiplier);
      this.metric?.update({
        failureMovingAverage: this.failure.movingAverage,
        failureDeviation: this.failure.deviation,
        failureForecast: this.failure.forecast,
        failureVariance: this.failure.variance,
        failure: time
      });
    } else {
      this.success.push(time);
      this.next.push(time);
      this.metric?.update({
        successMovingAverage: this.success.movingAverage,
        successDeviation: this.success.deviation,
        successForecast: this.success.forecast,
        successVariance: this.success.variance,
        success: time
      });
    }
  }
};

// node_modules/it-queueless-pushable/node_modules/race-signal/dist/src/index.js
function defaultTranslate2(signal) {
  return signal.reason;
}
async function raceSignal3(promise, signal, opts) {
  if (signal == null) {
    return promise;
  }
  const translateError = opts?.translateError ?? defaultTranslate2;
  if (signal.aborted) {
    promise.catch(() => {
    });
    return Promise.reject(translateError(signal));
  }
  let listener;
  try {
    return await Promise.race([
      promise,
      new Promise((resolve, reject) => {
        listener = () => {
          reject(translateError(signal));
        };
        signal.addEventListener("abort", listener);
      })
    ]);
  } finally {
    if (listener != null) {
      signal.removeEventListener("abort", listener);
    }
  }
}

// node_modules/it-queueless-pushable/dist/src/index.js
var QueuelessPushable = class {
  readNext;
  haveNext;
  ended;
  nextResult;
  error;
  constructor() {
    this.ended = false;
    this.readNext = pDefer();
    this.haveNext = pDefer();
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  async next() {
    if (this.nextResult == null) {
      await this.haveNext.promise;
    }
    if (this.nextResult == null) {
      throw new Error("HaveNext promise resolved but nextResult was undefined");
    }
    const nextResult = this.nextResult;
    this.nextResult = void 0;
    this.readNext.resolve();
    this.readNext = pDefer();
    return nextResult;
  }
  async throw(err) {
    this.ended = true;
    this.error = err;
    if (err != null) {
      this.haveNext.promise.catch(() => {
      });
      this.haveNext.reject(err);
    }
    const result = {
      done: true,
      value: void 0
    };
    return result;
  }
  async return() {
    const result = {
      done: true,
      value: void 0
    };
    this.ended = true;
    this.nextResult = result;
    this.haveNext.resolve();
    return result;
  }
  async push(value2, options) {
    await this._push(value2, options);
  }
  async end(err, options) {
    if (err != null) {
      await this.throw(err);
    } else {
      await this._push(void 0, options);
    }
  }
  async _push(value2, options) {
    if (value2 != null && this.ended) {
      throw this.error ?? new Error("Cannot push value onto an ended pushable");
    }
    while (this.nextResult != null) {
      await this.readNext.promise;
    }
    if (value2 != null) {
      this.nextResult = { done: false, value: value2 };
    } else {
      this.ended = true;
      this.nextResult = { done: true, value: void 0 };
    }
    this.haveNext.resolve();
    this.haveNext = pDefer();
    await raceSignal3(this.readNext.promise, options?.signal, options);
  }
};
function queuelessPushable() {
  return new QueuelessPushable();
}

// node_modules/it-byte-stream/node_modules/race-signal/dist/src/index.js
function defaultTranslate3(signal) {
  return signal.reason;
}
async function raceSignal4(promise, signal, opts) {
  if (signal == null) {
    return promise;
  }
  const translateError = opts?.translateError ?? defaultTranslate3;
  if (signal.aborted) {
    promise.catch(() => {
    });
    return Promise.reject(translateError(signal));
  }
  let listener;
  try {
    return await Promise.race([
      promise,
      new Promise((resolve, reject) => {
        listener = () => {
          reject(translateError(signal));
        };
        signal.addEventListener("abort", listener);
      })
    ]);
  } finally {
    if (listener != null) {
      signal.removeEventListener("abort", listener);
    }
  }
}

// node_modules/it-byte-stream/dist/src/errors.js
var UnexpectedEOFError = class extends Error {
  name = "UnexpectedEOFError";
  code = "ERR_UNEXPECTED_EOF";
};

// node_modules/it-byte-stream/dist/src/index.js
function byteStream(duplex, opts) {
  const write3 = queuelessPushable();
  duplex.sink(write3).catch(async (err) => {
    await write3.end(err);
  });
  duplex.sink = async (source2) => {
    for await (const buf of source2) {
      await write3.push(buf);
    }
    await write3.end();
  };
  let source = duplex.source;
  if (duplex.source[Symbol.iterator] != null) {
    source = duplex.source[Symbol.iterator]();
  } else if (duplex.source[Symbol.asyncIterator] != null) {
    source = duplex.source[Symbol.asyncIterator]();
  }
  const readBuffer = new Uint8ArrayList();
  const W = {
    read: async (options) => {
      options?.signal?.throwIfAborted();
      if (options?.bytes == null) {
        const { done, value: value2 } = await raceSignal4(source.next(), options?.signal);
        if (done === true) {
          return null;
        }
        return value2;
      }
      while (readBuffer.byteLength < options.bytes) {
        const { value: value2, done } = await raceSignal4(source.next(), options?.signal);
        if (done === true) {
          throw new UnexpectedEOFError("unexpected end of input");
        }
        readBuffer.append(value2);
      }
      const buf = readBuffer.sublist(0, options.bytes);
      readBuffer.consume(options.bytes);
      return buf;
    },
    write: async (data, options) => {
      options?.signal?.throwIfAborted();
      if (data instanceof Uint8Array) {
        await write3.push(data, options);
      } else {
        await write3.push(data.subarray(), options);
      }
    },
    unwrap: () => {
      if (readBuffer.byteLength > 0) {
        const originalStream = duplex.source;
        duplex.source = async function* () {
          if (opts?.yieldBytes === false) {
            yield readBuffer;
          } else {
            yield* readBuffer;
          }
          yield* originalStream;
        }();
      }
      return duplex;
    }
  };
  return W;
}

// node_modules/libp2p/dist/src/connection-monitor.js
var DEFAULT_PING_INTERVAL_MS = 1e4;
var PROTOCOL_VERSION = "1.0.0";
var PROTOCOL_NAME = "ping";
var PROTOCOL_PREFIX = "ipfs";
var PING_LENGTH = 32;
var DEFAULT_ABORT_CONNECTION_ON_PING_FAILURE = true;
var ConnectionMonitor = class {
  protocol;
  components;
  log;
  heartbeatInterval;
  pingIntervalMs;
  abortController;
  timeout;
  abortConnectionOnPingFailure;
  constructor(components, init2 = {}) {
    this.components = components;
    this.protocol = `/${init2.protocolPrefix ?? PROTOCOL_PREFIX}/${PROTOCOL_NAME}/${PROTOCOL_VERSION}`;
    this.log = components.logger.forComponent("libp2p:connection-monitor");
    this.pingIntervalMs = init2.pingInterval ?? DEFAULT_PING_INTERVAL_MS;
    this.abortConnectionOnPingFailure = init2.abortConnectionOnPingFailure ?? DEFAULT_ABORT_CONNECTION_ON_PING_FAILURE;
    this.timeout = new AdaptiveTimeout({
      ...init2.pingTimeout ?? {},
      metrics: components.metrics,
      metricName: "libp2p_connection_monitor_ping_time_milliseconds"
    });
  }
  [Symbol.toStringTag] = "@libp2p/connection-monitor";
  [serviceCapabilities] = [
    "@libp2p/connection-monitor"
  ];
  start() {
    this.abortController = new AbortController();
    setMaxListeners(Infinity, this.abortController.signal);
    this.heartbeatInterval = setInterval(() => {
      this.components.connectionManager.getConnections().forEach((conn) => {
        Promise.resolve().then(async () => {
          let start2 = Date.now();
          try {
            const signal = this.timeout.getTimeoutSignal({
              signal: this.abortController?.signal
            });
            const stream = await conn.newStream(this.protocol, {
              signal,
              runOnLimitedConnection: true
            });
            const bs = byteStream(stream);
            start2 = Date.now();
            await Promise.all([
              bs.write(randomBytes2(PING_LENGTH), {
                signal
              }),
              bs.read({
                bytes: PING_LENGTH,
                signal
              })
            ]);
            conn.rtt = Date.now() - start2;
            await bs.unwrap().close({
              signal
            });
          } catch (err) {
            if (err.name !== "UnsupportedProtocolError") {
              throw err;
            }
            conn.rtt = (Date.now() - start2) / 2;
          }
        }).catch((err) => {
          this.log.error("error during heartbeat", err);
          if (this.abortConnectionOnPingFailure) {
            this.log.error("aborting connection due to ping failure");
            conn.abort(err);
          } else {
            this.log("connection ping failed, but not aborting due to abortConnectionOnPingFailure flag");
          }
        });
      });
    }, this.pingIntervalMs);
  }
  stop() {
    this.abortController?.abort();
    if (this.heartbeatInterval != null) {
      clearInterval(this.heartbeatInterval);
    }
  }
};

// node_modules/it-merge/dist/src/index.js
function isAsyncIterable6(thing) {
  return thing[Symbol.asyncIterator] != null;
}
async function addAllToPushable(sources, output, signal) {
  try {
    await Promise.all(sources.map(async (source) => {
      for await (const item of source) {
        await output.push(item, {
          signal
        });
        signal.throwIfAborted();
      }
    }));
    await output.end(void 0, {
      signal
    });
  } catch (err) {
    await output.end(err, {
      signal
    }).catch(() => {
    });
  }
}
async function* mergeSources(sources) {
  const controller = new AbortController();
  const output = queuelessPushable();
  addAllToPushable(sources, output, controller.signal).catch(() => {
  });
  try {
    yield* output;
  } finally {
    controller.abort();
  }
}
function* mergeSyncSources(syncSources) {
  for (const source of syncSources) {
    yield* source;
  }
}
function merge2(...sources) {
  const syncSources = [];
  for (const source of sources) {
    if (!isAsyncIterable6(source)) {
      syncSources.push(source);
    }
  }
  if (syncSources.length === sources.length) {
    return mergeSyncSources(syncSources);
  }
  return mergeSources(sources);
}
var src_default8 = merge2;

// node_modules/libp2p/dist/src/content-routing.js
var CompoundContentRouting = class {
  routers;
  started;
  components;
  constructor(components, init2) {
    this.routers = init2.routers ?? [];
    this.started = false;
    this.components = components;
    this.findProviders = components.metrics?.traceFunction("libp2p.contentRouting.findProviders", this.findProviders.bind(this), {
      optionsIndex: 1,
      getAttributesFromArgs: ([cid], attrs) => {
        return {
          ...attrs,
          cid: cid.toString()
        };
      },
      getAttributesFromYieldedValue: (value2, attrs) => {
        return {
          ...attrs,
          providers: [...Array.isArray(attrs.providers) ? attrs.providers : [], value2.id.toString()]
        };
      }
    }) ?? this.findProviders;
    this.provide = components.metrics?.traceFunction("libp2p.contentRouting.provide", this.provide.bind(this), {
      optionsIndex: 1,
      getAttributesFromArgs: ([cid], attrs) => {
        return {
          ...attrs,
          cid: cid.toString()
        };
      }
    }) ?? this.provide;
    this.cancelReprovide = components.metrics?.traceFunction("libp2p.contentRouting.cancelReprovide", this.cancelReprovide.bind(this), {
      optionsIndex: 1,
      getAttributesFromArgs: ([cid], attrs) => {
        return {
          ...attrs,
          cid: cid.toString()
        };
      }
    }) ?? this.cancelReprovide;
    this.put = components.metrics?.traceFunction("libp2p.contentRouting.put", this.put.bind(this), {
      optionsIndex: 2,
      getAttributesFromArgs: ([key]) => {
        return {
          key: toString2(key, "base36")
        };
      }
    }) ?? this.put;
    this.get = components.metrics?.traceFunction("libp2p.contentRouting.get", this.get.bind(this), {
      optionsIndex: 1,
      getAttributesFromArgs: ([key]) => {
        return {
          key: toString2(key, "base36")
        };
      }
    }) ?? this.get;
  }
  [Symbol.toStringTag] = "@libp2p/content-routing";
  isStarted() {
    return this.started;
  }
  async start() {
    this.started = true;
  }
  async stop() {
    this.started = false;
  }
  /**
   * Iterates over all content routers in parallel to find providers of the given key
   */
  async *findProviders(key, options = {}) {
    if (this.routers.length === 0) {
      throw new NoContentRoutersError("No content routers available");
    }
    const self2 = this;
    const seen = new PeerSet();
    for await (const peer of src_default8(...self2.routers.filter((router) => router.findProviders instanceof Function).map((router) => router.findProviders(key, options)))) {
      if (peer == null) {
        continue;
      }
      if (peer.multiaddrs.length > 0) {
        await this.components.peerStore.merge(peer.id, {
          multiaddrs: peer.multiaddrs
        }, options);
      }
      if (seen.has(peer.id)) {
        continue;
      }
      seen.add(peer.id);
      yield peer;
    }
  }
  /**
   * Iterates over all content routers in parallel to notify it is
   * a provider of the given key
   */
  async provide(key, options = {}) {
    if (this.routers.length === 0) {
      throw new NoContentRoutersError("No content routers available");
    }
    await Promise.all(this.routers.filter((router) => router.provide instanceof Function).map(async (router) => {
      await router.provide(key, options);
    }));
  }
  async cancelReprovide(key, options = {}) {
    if (this.routers.length === 0) {
      throw new NoContentRoutersError("No content routers available");
    }
    await Promise.all(this.routers.filter((router) => router.cancelReprovide instanceof Function).map(async (router) => {
      await router.cancelReprovide(key, options);
    }));
  }
  /**
   * Store the given key/value pair in the available content routings
   */
  async put(key, value2, options) {
    if (!this.isStarted()) {
      throw new NotStartedError();
    }
    await Promise.all(this.routers.filter((router) => router.put instanceof Function).map(async (router) => {
      await router.put(key, value2, options);
    }));
  }
  /**
   * Get the value to the given key.
   * Times out after 1 minute by default.
   */
  async get(key, options) {
    if (!this.isStarted()) {
      throw new NotStartedError();
    }
    return Promise.any(this.routers.filter((router) => router.get instanceof Function).map(async (router) => {
      return router.get(key, options);
    }));
  }
};

// node_modules/it-parallel/dist/src/index.js
var CustomEvent2 = globalThis.CustomEvent ?? Event;
async function* parallel(source, options = {}) {
  let concurrency = options.concurrency ?? Infinity;
  if (concurrency < 1) {
    concurrency = Infinity;
  }
  const ordered = options.ordered ?? false;
  const emitter = new EventTarget();
  const ops = [];
  let slotAvailable = pDefer();
  let resultAvailable = pDefer();
  let sourceFinished = false;
  let sourceErr;
  let opErred = false;
  emitter.addEventListener("task-complete", () => {
    resultAvailable.resolve();
  });
  void Promise.resolve().then(async () => {
    try {
      for await (const task of source) {
        if (ops.length === concurrency) {
          slotAvailable = pDefer();
          await slotAvailable.promise;
        }
        if (opErred) {
          break;
        }
        const op = {
          done: false
        };
        ops.push(op);
        task().then((result) => {
          op.done = true;
          op.ok = true;
          op.value = result;
          emitter.dispatchEvent(new CustomEvent2("task-complete"));
        }, (err) => {
          op.done = true;
          op.err = err;
          emitter.dispatchEvent(new CustomEvent2("task-complete"));
        });
      }
      sourceFinished = true;
      emitter.dispatchEvent(new CustomEvent2("task-complete"));
    } catch (err) {
      sourceErr = err;
      emitter.dispatchEvent(new CustomEvent2("task-complete"));
    }
  });
  function valuesAvailable() {
    if (ordered) {
      return ops[0]?.done;
    }
    return Boolean(ops.find((op) => op.done));
  }
  function* yieldOrderedValues() {
    while (ops.length > 0 && ops[0].done) {
      const op = ops[0];
      ops.shift();
      if (op.ok) {
        yield op.value;
      } else {
        opErred = true;
        slotAvailable.resolve();
        throw op.err;
      }
      slotAvailable.resolve();
    }
  }
  function* yieldUnOrderedValues() {
    while (valuesAvailable()) {
      for (let i2 = 0; i2 < ops.length; i2++) {
        if (ops[i2].done) {
          const op = ops[i2];
          ops.splice(i2, 1);
          i2--;
          if (op.ok) {
            yield op.value;
          } else {
            opErred = true;
            slotAvailable.resolve();
            throw op.err;
          }
          slotAvailable.resolve();
        }
      }
    }
  }
  while (true) {
    if (!valuesAvailable()) {
      resultAvailable = pDefer();
      await resultAvailable.promise;
    }
    if (sourceErr != null) {
      throw sourceErr;
    }
    if (ordered) {
      yield* yieldOrderedValues();
    } else {
      yield* yieldUnOrderedValues();
    }
    if (sourceErr != null) {
      throw sourceErr;
    }
    if (sourceFinished && ops.length === 0) {
      break;
    }
  }
}

// node_modules/libp2p/dist/src/peer-routing.js
var DefaultPeerRouting = class {
  log;
  peerId;
  peerStore;
  routers;
  constructor(components, init2 = {}) {
    this.log = components.logger.forComponent("libp2p:peer-routing");
    this.peerId = components.peerId;
    this.peerStore = components.peerStore;
    this.routers = init2.routers ?? [];
    this.findPeer = components.metrics?.traceFunction("libp2p.peerRouting.findPeer", this.findPeer.bind(this), {
      optionsIndex: 1,
      getAttributesFromArgs: ([peer], attrs) => {
        return {
          ...attrs,
          peer: peer.toString()
        };
      }
    }) ?? this.findPeer;
    this.getClosestPeers = components.metrics?.traceFunction("libp2p.peerRouting.getClosestPeers", this.getClosestPeers.bind(this), {
      optionsIndex: 1,
      getAttributesFromArgs: ([key], attrs) => {
        return {
          ...attrs,
          key: toString2(key, "base36")
        };
      },
      getAttributesFromYieldedValue: (value2, attrs) => {
        return {
          ...attrs,
          peers: [...Array.isArray(attrs.peers) ? attrs.peers : [], value2.id.toString()]
        };
      }
    }) ?? this.getClosestPeers;
  }
  [Symbol.toStringTag] = "@libp2p/peer-routing";
  /**
   * Iterates over all peer routers in parallel to find the given peer
   */
  async findPeer(id, options) {
    if (this.routers.length === 0) {
      throw new NoPeerRoutersError("No peer routers available");
    }
    if (id.toString() === this.peerId.toString()) {
      throw new QueriedForSelfError("Should not try to find self");
    }
    const self2 = this;
    const source = src_default8(...this.routers.filter((router) => router.findPeer instanceof Function).map((router) => async function* () {
      try {
        yield await router.findPeer(id, options);
      } catch (err) {
        self2.log.error(err);
      }
    }()));
    for await (const peer of source) {
      if (peer == null) {
        continue;
      }
      if (peer.multiaddrs.length > 0) {
        await this.peerStore.merge(peer.id, {
          multiaddrs: peer.multiaddrs
        }, options);
      }
      return peer;
    }
    throw new NotFoundError();
  }
  /**
   * Attempt to find the closest peers on the network to the given key
   */
  async *getClosestPeers(key, options = {}) {
    if (this.routers.length === 0) {
      throw new NoPeerRoutersError("No peer routers available");
    }
    const self2 = this;
    const seen = createScalableCuckooFilter(1024);
    for await (const peer of parallel(async function* () {
      const source = src_default8(...self2.routers.filter((router) => router.getClosestPeers instanceof Function).map((router) => router.getClosestPeers(key, options)));
      for await (let peer2 of source) {
        yield async () => {
          if (peer2.multiaddrs.length === 0) {
            try {
              peer2 = await self2.findPeer(peer2.id, {
                ...options,
                useCache: false
              });
            } catch (err) {
              self2.log.error("could not find peer multiaddrs", err);
              return;
            }
          }
          return peer2;
        };
      }
    }())) {
      if (peer == null) {
        continue;
      }
      if (peer.multiaddrs.length > 0) {
        await this.peerStore.merge(peer.id, {
          multiaddrs: peer.multiaddrs
        }, options);
      }
      if (seen.has(peer.id.toMultihash().bytes)) {
        continue;
      }
      seen.add(peer.id.toMultihash().bytes);
      yield peer;
    }
  }
};

// node_modules/libp2p/dist/src/random-walk.js
var RandomWalk = class extends TypedEventEmitter {
  peerRouting;
  log;
  walking;
  walkers;
  shutdownController;
  walkController;
  needNext;
  constructor(components) {
    super();
    this.log = components.logger.forComponent("libp2p:random-walk");
    this.peerRouting = components.peerRouting;
    this.walkers = 0;
    this.walking = false;
    this.shutdownController = new AbortController();
    setMaxListeners(Infinity, this.shutdownController.signal);
  }
  [Symbol.toStringTag] = "@libp2p/random-walk";
  start() {
    this.shutdownController = new AbortController();
    setMaxListeners(Infinity, this.shutdownController.signal);
  }
  stop() {
    this.shutdownController.abort();
  }
  async *walk(options) {
    if (!this.walking) {
      this.startWalk();
    }
    this.walkers++;
    const signal = anySignal([this.shutdownController.signal, options?.signal]);
    setMaxListeners(Infinity, signal);
    try {
      while (true) {
        this.needNext?.resolve();
        this.needNext = pDefer();
        const event = await raceEvent(this, "walk:peer", signal, {
          errorEvent: "walk:error"
        });
        yield event.detail;
      }
    } finally {
      signal.clear();
      this.walkers--;
      if (this.walkers === 0) {
        this.walkController?.abort();
        this.walkController = void 0;
      }
    }
  }
  startWalk() {
    this.walking = true;
    this.walkController = new AbortController();
    setMaxListeners(Infinity, this.walkController.signal);
    const signal = anySignal([this.walkController.signal, this.shutdownController.signal]);
    setMaxListeners(Infinity, signal);
    const start2 = Date.now();
    let found = 0;
    Promise.resolve().then(async () => {
      this.log("start walk");
      while (this.walkers > 0) {
        try {
          const data = randomBytes2(32);
          let s2 = Date.now();
          for await (const peer of this.peerRouting.getClosestPeers(data, { signal })) {
            if (signal.aborted) {
              this.log("aborting walk");
            }
            signal.throwIfAborted();
            this.log("found peer %p after %dms for %d walkers", peer.id, Date.now() - s2, this.walkers);
            found++;
            this.safeDispatchEvent("walk:peer", {
              detail: peer
            });
            if (this.walkers === 1 && this.needNext != null) {
              this.log("wait for need next");
              await raceSignal2(this.needNext.promise, signal);
            }
            s2 = Date.now();
          }
          this.log("walk iteration for %b and %d walkers finished, found %d peers", data, this.walkers, found);
        } catch (err) {
          this.log.error("random walk errored", err);
          this.safeDispatchEvent("walk:error", {
            detail: err
          });
        }
      }
      this.log("no walkers left, ended walk");
    }).catch((err) => {
      this.log.error("random walk errored", err);
    }).finally(() => {
      this.log("finished walk, found %d peers after %dms", found, Date.now() - start2);
      this.walking = false;
    });
  }
};

// node_modules/libp2p/dist/src/registrar.js
var DEFAULT_MAX_INBOUND_STREAMS = 32;
var DEFAULT_MAX_OUTBOUND_STREAMS = 64;
var Registrar = class {
  log;
  topologies;
  handlers;
  components;
  constructor(components) {
    this.components = components;
    this.log = components.logger.forComponent("libp2p:registrar");
    this.topologies = /* @__PURE__ */ new Map();
    components.metrics?.registerMetricGroup("libp2p_registrar_topologies", {
      calculate: () => {
        const output = {};
        for (const [key, value2] of this.topologies) {
          output[key] = value2.size;
        }
        return output;
      }
    });
    this.handlers = trackedMap({
      name: "libp2p_registrar_protocol_handlers",
      metrics: components.metrics
    });
    this._onDisconnect = this._onDisconnect.bind(this);
    this._onPeerUpdate = this._onPeerUpdate.bind(this);
    this._onPeerIdentify = this._onPeerIdentify.bind(this);
    this.components.events.addEventListener("peer:disconnect", this._onDisconnect);
    this.components.events.addEventListener("peer:update", this._onPeerUpdate);
    this.components.events.addEventListener("peer:identify", this._onPeerIdentify);
  }
  [Symbol.toStringTag] = "@libp2p/registrar";
  getProtocols() {
    return Array.from(/* @__PURE__ */ new Set([
      ...this.handlers.keys()
    ])).sort();
  }
  getHandler(protocol) {
    const handler = this.handlers.get(protocol);
    if (handler == null) {
      throw new UnhandledProtocolError(`No handler registered for protocol ${protocol}`);
    }
    return handler;
  }
  getTopologies(protocol) {
    const topologies = this.topologies.get(protocol);
    if (topologies == null) {
      return [];
    }
    return [
      ...topologies.values()
    ];
  }
  /**
   * Registers the `handler` for each protocol
   */
  async handle(protocol, handler, opts) {
    if (this.handlers.has(protocol) && opts?.force !== true) {
      throw new DuplicateProtocolHandlerError(`Handler already registered for protocol ${protocol}`);
    }
    const options = mergeOptions.bind({ ignoreUndefined: true })({
      maxInboundStreams: DEFAULT_MAX_INBOUND_STREAMS,
      maxOutboundStreams: DEFAULT_MAX_OUTBOUND_STREAMS
    }, opts);
    this.handlers.set(protocol, {
      handler,
      options
    });
    await this.components.peerStore.merge(this.components.peerId, {
      protocols: [protocol]
    }, opts);
  }
  /**
   * Removes the handler for each protocol. The protocol
   * will no longer be supported on streams.
   */
  async unhandle(protocols2, options) {
    const protocolList = Array.isArray(protocols2) ? protocols2 : [protocols2];
    protocolList.forEach((protocol) => {
      this.handlers.delete(protocol);
    });
    await this.components.peerStore.patch(this.components.peerId, {
      protocols: this.getProtocols()
    }, options);
  }
  /**
   * Register handlers for a set of multicodecs given
   */
  async register(protocol, topology) {
    if (topology == null) {
      throw new InvalidParametersError2("invalid topology");
    }
    const id = `${(Math.random() * 1e9).toString(36)}${Date.now()}`;
    let topologies = this.topologies.get(protocol);
    if (topologies == null) {
      topologies = /* @__PURE__ */ new Map();
      this.topologies.set(protocol, topologies);
    }
    topologies.set(id, topology);
    return id;
  }
  /**
   * Unregister topology
   */
  unregister(id) {
    for (const [protocol, topologies] of this.topologies.entries()) {
      if (topologies.has(id)) {
        topologies.delete(id);
        if (topologies.size === 0) {
          this.topologies.delete(protocol);
        }
      }
    }
  }
  /**
   * Remove a disconnected peer from the record
   */
  _onDisconnect(evt) {
    const remotePeer = evt.detail;
    const options = {
      signal: AbortSignal.timeout(5e3)
    };
    void this.components.peerStore.get(remotePeer, options).then((peer) => {
      for (const protocol of peer.protocols) {
        const topologies = this.topologies.get(protocol);
        if (topologies == null) {
          continue;
        }
        for (const topology of topologies.values()) {
          if (topology.filter?.has(remotePeer) === false) {
            continue;
          }
          topology.filter?.remove(remotePeer);
          topology.onDisconnect?.(remotePeer);
        }
      }
    }).catch((err) => {
      if (err.name === "NotFoundError") {
        return;
      }
      this.log.error("could not inform topologies of disconnecting peer %p", remotePeer, err);
    });
  }
  /**
   * When a peer is updated, if they have removed supported protocols notify any
   * topologies interested in the removed protocols.
   */
  _onPeerUpdate(evt) {
    const { peer, previous } = evt.detail;
    const removed = (previous?.protocols ?? []).filter((protocol) => !peer.protocols.includes(protocol));
    for (const protocol of removed) {
      const topologies = this.topologies.get(protocol);
      if (topologies == null) {
        continue;
      }
      for (const topology of topologies.values()) {
        if (topology.filter?.has(peer.id) === false) {
          continue;
        }
        topology.filter?.remove(peer.id);
        topology.onDisconnect?.(peer.id);
      }
    }
  }
  /**
   * After identify has completed and we have received the list of supported
   * protocols, notify any topologies interested in those protocols.
   */
  _onPeerIdentify(evt) {
    const protocols2 = evt.detail.protocols;
    const connection = evt.detail.connection;
    const peerId = evt.detail.peerId;
    for (const protocol of protocols2) {
      const topologies = this.topologies.get(protocol);
      if (topologies == null) {
        continue;
      }
      for (const topology of topologies.values()) {
        if (connection.limits != null && topology.notifyOnLimitedConnection !== true) {
          continue;
        }
        if (topology.filter?.has(peerId) === true) {
          continue;
        }
        topology.filter?.add(peerId);
        topology.onConnect?.(peerId, connection);
      }
    }
  }
};

// node_modules/libp2p/dist/src/transport-manager.js
var DefaultTransportManager = class {
  log;
  components;
  transports;
  listeners;
  faultTolerance;
  started;
  constructor(components, init2 = {}) {
    this.log = components.logger.forComponent("libp2p:transports");
    this.components = components;
    this.started = false;
    this.transports = trackedMap({
      name: "libp2p_transport_manager_transports",
      metrics: this.components.metrics
    });
    this.listeners = trackedMap({
      name: "libp2p_transport_manager_listeners",
      metrics: this.components.metrics
    });
    this.faultTolerance = init2.faultTolerance ?? FaultTolerance.FATAL_ALL;
  }
  [Symbol.toStringTag] = "@libp2p/transport-manager";
  /**
   * Adds a `Transport` to the manager
   */
  add(transport) {
    const tag = transport[Symbol.toStringTag];
    if (tag == null) {
      throw new InvalidParametersError2("Transport must have a valid tag");
    }
    if (this.transports.has(tag)) {
      throw new InvalidParametersError2(`There is already a transport with the tag ${tag}`);
    }
    this.log("adding transport %s", tag);
    this.transports.set(tag, transport);
    if (!this.listeners.has(tag)) {
      this.listeners.set(tag, []);
    }
  }
  isStarted() {
    return this.started;
  }
  start() {
    this.started = true;
  }
  async afterStart() {
    const addrs = this.components.addressManager.getListenAddrs();
    await this.listen(addrs);
  }
  /**
   * Stops all listeners
   */
  async stop() {
    const tasks = [];
    for (const [key, listeners] of this.listeners) {
      this.log("closing listeners for %s", key);
      while (listeners.length > 0) {
        const listener = listeners.pop();
        if (listener == null) {
          continue;
        }
        tasks.push(listener.close());
      }
    }
    await Promise.all(tasks);
    this.log("all listeners closed");
    for (const key of this.listeners.keys()) {
      this.listeners.set(key, []);
    }
    this.started = false;
  }
  /**
   * Dials the given Multiaddr over it's supported transport
   */
  async dial(ma, options) {
    const transport = this.dialTransportForMultiaddr(ma);
    if (transport == null) {
      throw new TransportUnavailableError(`No transport available for address ${String(ma)}`);
    }
    options?.onProgress?.(new CustomProgressEvent("transport-manager:selected-transport", transport[Symbol.toStringTag]));
    return transport.dial(ma, {
      ...options,
      upgrader: this.components.upgrader
    });
  }
  /**
   * Returns all Multiaddr's the listeners are using
   */
  getAddrs() {
    let addrs = [];
    for (const listeners of this.listeners.values()) {
      for (const listener of listeners) {
        addrs = [...addrs, ...listener.getAddrs()];
      }
    }
    return addrs;
  }
  /**
   * Returns all the transports instances
   */
  getTransports() {
    return Array.of(...this.transports.values());
  }
  /**
   * Returns all the listener instances
   */
  getListeners() {
    return Array.of(...this.listeners.values()).flat();
  }
  /**
   * Finds a transport that matches the given Multiaddr
   */
  dialTransportForMultiaddr(ma) {
    for (const transport of this.transports.values()) {
      const addrs = transport.dialFilter([ma]);
      if (addrs.length > 0) {
        return transport;
      }
    }
  }
  /**
   * Finds a transport that matches the given Multiaddr
   */
  listenTransportForMultiaddr(ma) {
    for (const transport of this.transports.values()) {
      const addrs = transport.listenFilter([ma]);
      if (addrs.length > 0) {
        return transport;
      }
    }
  }
  /**
   * Starts listeners for each listen Multiaddr
   */
  async listen(addrs) {
    if (!this.isStarted()) {
      throw new NotStartedError("Not started");
    }
    if (addrs == null || addrs.length === 0) {
      this.log("no addresses were provided for listening, this node is dial only");
      return;
    }
    const listenStats = {
      errors: /* @__PURE__ */ new Map(),
      ipv4: {
        success: 0,
        attempts: 0
      },
      ipv6: {
        success: 0,
        attempts: 0
      }
    };
    addrs.forEach((ma) => {
      listenStats.errors.set(ma.toString(), new UnsupportedListenAddressError());
    });
    const tasks = [];
    for (const [key, transport] of this.transports.entries()) {
      const supportedAddrs = transport.listenFilter(addrs);
      for (const addr of supportedAddrs) {
        this.log("creating listener for %s on %a", key, addr);
        const listener = transport.createListener({
          upgrader: this.components.upgrader
        });
        let listeners = this.listeners.get(key) ?? [];
        if (listeners == null) {
          listeners = [];
          this.listeners.set(key, listeners);
        }
        listeners.push(listener);
        listener.addEventListener("listening", () => {
          this.components.events.safeDispatchEvent("transport:listening", {
            detail: listener
          });
        });
        listener.addEventListener("close", () => {
          const index = listeners.findIndex((l2) => l2 === listener);
          listeners.splice(index, 1);
          this.components.events.safeDispatchEvent("transport:close", {
            detail: listener
          });
        });
        if (IP4.matches(addr)) {
          listenStats.ipv4.attempts++;
        } else if (IP6.matches(addr)) {
          listenStats.ipv6.attempts++;
        }
        tasks.push(listener.listen(addr).then(() => {
          listenStats.errors.delete(addr.toString());
          if (IP4.matches(addr)) {
            listenStats.ipv4.success++;
          }
          if (IP6.matches(addr)) {
            listenStats.ipv6.success++;
          }
        }, (err) => {
          this.log.error("transport %s could not listen on address %a - %e", key, addr, err);
          listenStats.errors.set(addr.toString(), err);
          throw err;
        }));
      }
    }
    const results = await Promise.allSettled(tasks);
    if (results.length > 0 && results.every((res) => res.status === "fulfilled")) {
      return;
    }
    if (this.ipv6Unsupported(listenStats)) {
      this.log("all IPv4 addresses succeed but all IPv6 failed");
      return;
    }
    if (this.faultTolerance === FaultTolerance.NO_FATAL) {
      this.log("failed to listen on any address but fault tolerance allows this");
      return;
    }
    throw new UnsupportedListenAddressesError(`Some configured addresses failed to be listened on, you may need to remove one or more listen addresses from your configuration or set \`transportManager.faultTolerance\` to NO_FATAL:
${[...listenStats.errors.entries()].map(([addr, err]) => {
      return `
  ${addr}: ${`${err.stack ?? err}`.split("\n").join("\n  ")}
`;
    }).join("")}`);
  }
  ipv6Unsupported(listenStats) {
    if (listenStats.ipv4.attempts === 0 || listenStats.ipv6.attempts === 0) {
      return false;
    }
    const allIpv4Succeeded = listenStats.ipv4.attempts === listenStats.ipv4.success;
    const allIpv6Failed = listenStats.ipv6.success === 0;
    return allIpv4Succeeded && allIpv6Failed;
  }
  /**
   * Removes the given transport from the manager.
   * If a transport has any running listeners, they will be closed.
   */
  async remove(key) {
    const listeners = this.listeners.get(key) ?? [];
    this.log.trace("removing transport %s", key);
    const tasks = [];
    this.log.trace("closing listeners for %s", key);
    while (listeners.length > 0) {
      const listener = listeners.pop();
      if (listener == null) {
        continue;
      }
      tasks.push(listener.close());
    }
    await Promise.all(tasks);
    this.transports.delete(key);
    this.listeners.delete(key);
  }
  /**
   * Removes all transports from the manager.
   * If any listeners are running, they will be closed.
   *
   * @async
   */
  async removeAll() {
    const tasks = [];
    for (const key of this.transports.keys()) {
      tasks.push(this.remove(key));
    }
    await Promise.all(tasks);
  }
};

// node_modules/@libp2p/multistream-select/dist/src/constants.js
var PROTOCOL_ID = "/multistream/1.0.0";
var MAX_PROTOCOL_LENGTH = 1024;

// node_modules/it-length-prefixed-stream/dist/src/errors.js
var InvalidMessageLengthError = class extends Error {
  name = "InvalidMessageLengthError";
  code = "ERR_INVALID_MSG_LENGTH";
};
var InvalidDataLengthError = class extends Error {
  name = "InvalidDataLengthError";
  code = "ERR_MSG_DATA_TOO_LONG";
};
var InvalidDataLengthLengthError = class extends Error {
  name = "InvalidDataLengthLengthError";
  code = "ERR_MSG_LENGTH_TOO_LONG";
};

// node_modules/it-length-prefixed-stream/dist/src/index.js
function lpStream(duplex, opts = {}) {
  const bytes = byteStream(duplex, opts);
  if (opts.maxDataLength != null && opts.maxLengthLength == null) {
    opts.maxLengthLength = encodingLength2(opts.maxDataLength);
  }
  const decodeLength = opts?.lengthDecoder ?? decode6;
  const encodeLength2 = opts?.lengthEncoder ?? encode5;
  const W = {
    read: async (options) => {
      let dataLength = -1;
      const lengthBuffer = new Uint8ArrayList();
      while (true) {
        lengthBuffer.append(await bytes.read({
          ...options,
          bytes: 1
        }));
        try {
          dataLength = decodeLength(lengthBuffer);
        } catch (err) {
          if (err instanceof RangeError) {
            continue;
          }
          throw err;
        }
        if (dataLength < 0) {
          throw new InvalidMessageLengthError("Invalid message length");
        }
        if (opts?.maxLengthLength != null && lengthBuffer.byteLength > opts.maxLengthLength) {
          throw new InvalidDataLengthLengthError("message length length too long");
        }
        if (dataLength > -1) {
          break;
        }
      }
      if (opts?.maxDataLength != null && dataLength > opts.maxDataLength) {
        throw new InvalidDataLengthError("message length too long");
      }
      return bytes.read({
        ...options,
        bytes: dataLength
      });
    },
    write: async (data, options) => {
      await bytes.write(new Uint8ArrayList(encodeLength2(data.byteLength), data), options);
    },
    writeV: async (data, options) => {
      const list = new Uint8ArrayList(...data.flatMap((buf) => [encodeLength2(buf.byteLength), buf]));
      await bytes.write(list, options);
    },
    unwrap: () => {
      return bytes.unwrap();
    }
  };
  return W;
}

// node_modules/@libp2p/multistream-select/dist/src/multistream.js
var NewLine = fromString2("\n");
async function write2(writer, buffer, options) {
  await writer.write(buffer, options);
}
async function writeAll(writer, buffers, options) {
  await writer.writeV(buffers, options);
}
async function read3(reader, options) {
  const buf = await reader.read(options);
  if (buf.byteLength === 0 || buf.get(buf.byteLength - 1) !== NewLine[0]) {
    options.log.error("Invalid mss message - missing newline", buf);
    throw new InvalidMessageError("Missing newline");
  }
  return buf.sublist(0, -1);
}
async function readString(reader, options) {
  const buf = await read3(reader, options);
  return toString2(buf.subarray());
}

// node_modules/@libp2p/multistream-select/dist/src/select.js
async function select(stream, protocols2, options) {
  protocols2 = Array.isArray(protocols2) ? [...protocols2] : [protocols2];
  if (protocols2.length === 1 && options.negotiateFully === false) {
    return optimisticSelect(stream, protocols2[0], options);
  }
  const lp = lpStream(stream, {
    ...options,
    maxDataLength: MAX_PROTOCOL_LENGTH
  });
  const protocol = protocols2.shift();
  if (protocol == null) {
    throw new Error("At least one protocol must be specified");
  }
  options.log.trace('select: write ["%s", "%s"]', PROTOCOL_ID, protocol);
  const p1 = fromString2(`${PROTOCOL_ID}
`);
  const p2 = fromString2(`${protocol}
`);
  await writeAll(lp, [p1, p2], options);
  options.log.trace("select: reading multistream-select header");
  let response = await readString(lp, options);
  options.log.trace('select: read "%s"', response);
  if (response === PROTOCOL_ID) {
    options.log.trace("select: reading protocol response");
    response = await readString(lp, options);
    options.log.trace('select: read "%s"', response);
  }
  if (response === protocol) {
    return { stream: lp.unwrap(), protocol };
  }
  for (const protocol2 of protocols2) {
    options.log.trace('select: write "%s"', protocol2);
    await write2(lp, fromString2(`${protocol2}
`), options);
    options.log.trace("select: reading protocol response");
    const response2 = await readString(lp, options);
    options.log.trace('select: read "%s" for "%s"', response2, protocol2);
    if (response2 === protocol2) {
      return { stream: lp.unwrap(), protocol: protocol2 };
    }
  }
  throw new UnsupportedProtocolError("protocol selection failed");
}
function optimisticSelect(stream, protocol, options) {
  const originalSink = stream.sink.bind(stream);
  const originalSource = stream.source;
  let negotiated = false;
  let negotiating = false;
  const doneNegotiating = pDefer();
  let sentProtocol = false;
  let sendingProtocol = false;
  const doneSendingProtocol = pDefer();
  let readProtocol = false;
  let readingProtocol = false;
  const doneReadingProtocol = pDefer();
  const lp = lpStream({
    sink: originalSink,
    source: originalSource
  }, {
    ...options,
    maxDataLength: MAX_PROTOCOL_LENGTH
  });
  stream.sink = async (source) => {
    const { sink } = lp.unwrap();
    await sink(async function* () {
      let sentData = false;
      for await (const buf of source) {
        if (sendingProtocol) {
          await doneSendingProtocol.promise;
        }
        if (!sentProtocol) {
          sendingProtocol = true;
          options.log.trace('optimistic: write ["%s", "%s", data(%d)] in sink', PROTOCOL_ID, protocol, buf.byteLength);
          const protocolString = `${protocol}
`;
          yield new Uint8ArrayList(
            Uint8Array.from([19]),
            // length of PROTOCOL_ID plus newline
            fromString2(`${PROTOCOL_ID}
`),
            encode5(protocolString.length),
            fromString2(protocolString),
            buf
          ).subarray();
          options.log.trace('optimistic: wrote ["%s", "%s", data(%d)] in sink', PROTOCOL_ID, protocol, buf.byteLength);
          sentProtocol = true;
          sendingProtocol = false;
          doneSendingProtocol.resolve();
          negotiate().catch((err) => {
            options.log.error("could not finish optimistic protocol negotiation of %s", protocol, err);
          });
        } else {
          yield buf;
        }
        sentData = true;
      }
      if (!sentData) {
        await negotiate();
      }
    }());
  };
  async function negotiate() {
    if (negotiating) {
      options.log.trace("optimistic: already negotiating %s stream", protocol);
      await doneNegotiating.promise;
      return;
    }
    negotiating = true;
    try {
      if (!sentProtocol) {
        options.log.trace("optimistic: doing send protocol for %s stream", protocol);
        await doSendProtocol();
      }
      if (!readProtocol) {
        options.log.trace("optimistic: doing read protocol for %s stream", protocol);
        await doReadProtocol();
      }
    } finally {
      negotiating = false;
      negotiated = true;
      doneNegotiating.resolve();
    }
  }
  async function doSendProtocol() {
    if (sendingProtocol) {
      await doneSendingProtocol.promise;
      return;
    }
    sendingProtocol = true;
    try {
      options.log.trace('optimistic: write ["%s", "%s", data] in source', PROTOCOL_ID, protocol);
      await lp.writeV([
        fromString2(`${PROTOCOL_ID}
`),
        fromString2(`${protocol}
`)
      ]);
      options.log.trace('optimistic: wrote ["%s", "%s", data] in source', PROTOCOL_ID, protocol);
    } finally {
      sentProtocol = true;
      sendingProtocol = false;
      doneSendingProtocol.resolve();
    }
  }
  async function doReadProtocol() {
    if (readingProtocol) {
      await doneReadingProtocol.promise;
      return;
    }
    readingProtocol = true;
    try {
      options.log.trace("optimistic: reading multistream select header");
      let response = await readString(lp, options);
      options.log.trace('optimistic: read multistream select header "%s"', response);
      if (response === PROTOCOL_ID) {
        response = await readString(lp, options);
      }
      options.log.trace('optimistic: read protocol "%s", expecting "%s"', response, protocol);
      if (response !== protocol) {
        throw new UnsupportedProtocolError("protocol selection failed");
      }
    } finally {
      readProtocol = true;
      readingProtocol = false;
      doneReadingProtocol.resolve();
    }
  }
  stream.source = async function* () {
    await negotiate();
    options.log.trace('optimistic: reading data from "%s" stream', protocol);
    yield* lp.unwrap().source;
  }();
  if (stream.closeRead != null) {
    const originalCloseRead = stream.closeRead.bind(stream);
    stream.closeRead = async (opts) => {
      if (!negotiated) {
        await negotiate().catch((err) => {
          options.log.error("could not negotiate protocol before close read", err);
        });
      }
      await originalCloseRead(opts);
    };
  }
  if (stream.closeWrite != null) {
    const originalCloseWrite = stream.closeWrite.bind(stream);
    stream.closeWrite = async (opts) => {
      if (!negotiated) {
        await negotiate().catch((err) => {
          options.log.error("could not negotiate protocol before close write", err);
        });
      }
      await originalCloseWrite(opts);
    };
  }
  if (stream.close != null) {
    const originalClose = stream.close.bind(stream);
    stream.close = async (opts) => {
      const tasks = [];
      if (sendingProtocol) {
        tasks.push(doneSendingProtocol.promise);
      }
      if (readingProtocol) {
        tasks.push(doneReadingProtocol.promise);
      }
      if (tasks.length > 0) {
        await raceSignal2(Promise.all(tasks), opts?.signal);
      } else {
        negotiated = true;
        negotiating = false;
        doneNegotiating.resolve();
      }
      await originalClose(opts);
    };
  }
  return {
    stream,
    protocol
  };
}

// node_modules/it-length-prefixed/dist/src/constants.js
var MAX_LENGTH_LENGTH = 8;
var MAX_DATA_LENGTH = 1024 * 1024 * 4;

// node_modules/it-length-prefixed/dist/src/errors.js
var InvalidMessageLengthError2 = class extends Error {
  name = "InvalidMessageLengthError";
  code = "ERR_INVALID_MSG_LENGTH";
};
var InvalidDataLengthError2 = class extends Error {
  name = "InvalidDataLengthError";
  code = "ERR_MSG_DATA_TOO_LONG";
};
var InvalidDataLengthLengthError2 = class extends Error {
  name = "InvalidDataLengthLengthError";
  code = "ERR_MSG_LENGTH_TOO_LONG";
};
var UnexpectedEOFError2 = class extends Error {
  name = "UnexpectedEOFError";
  code = "ERR_UNEXPECTED_EOF";
};

// node_modules/it-length-prefixed/dist/src/utils.js
function isAsyncIterable7(thing) {
  return thing[Symbol.asyncIterator] != null;
}

// node_modules/it-length-prefixed/dist/src/encode.js
function validateMaxDataLength(chunk, maxDataLength) {
  if (chunk.byteLength > maxDataLength) {
    throw new InvalidDataLengthError2("Message length too long");
  }
}
var defaultEncoder = (length3) => {
  const lengthLength = encodingLength2(length3);
  const lengthBuf = allocUnsafe(lengthLength);
  encode5(length3, lengthBuf);
  defaultEncoder.bytes = lengthLength;
  return lengthBuf;
};
defaultEncoder.bytes = 0;
function encode6(source, options) {
  options = options ?? {};
  const encodeLength2 = options.lengthEncoder ?? defaultEncoder;
  const maxDataLength = options?.maxDataLength ?? MAX_DATA_LENGTH;
  function* maybeYield(chunk) {
    validateMaxDataLength(chunk, maxDataLength);
    const length3 = encodeLength2(chunk.byteLength);
    if (length3 instanceof Uint8Array) {
      yield length3;
    } else {
      yield* length3;
    }
    if (chunk instanceof Uint8Array) {
      yield chunk;
    } else {
      yield* chunk;
    }
  }
  if (isAsyncIterable7(source)) {
    return async function* () {
      for await (const chunk of source) {
        yield* maybeYield(chunk);
      }
    }();
  }
  return function* () {
    for (const chunk of source) {
      yield* maybeYield(chunk);
    }
  }();
}
encode6.single = (chunk, options) => {
  options = options ?? {};
  const encodeLength2 = options.lengthEncoder ?? defaultEncoder;
  const maxDataLength = options?.maxDataLength ?? MAX_DATA_LENGTH;
  validateMaxDataLength(chunk, maxDataLength);
  return new Uint8ArrayList(encodeLength2(chunk.byteLength), chunk);
};

// node_modules/it-length-prefixed/dist/src/decode.js
var ReadMode;
(function(ReadMode2) {
  ReadMode2[ReadMode2["LENGTH"] = 0] = "LENGTH";
  ReadMode2[ReadMode2["DATA"] = 1] = "DATA";
})(ReadMode || (ReadMode = {}));
var defaultDecoder = (buf) => {
  const length3 = decode6(buf);
  defaultDecoder.bytes = encodingLength2(length3);
  return length3;
};
defaultDecoder.bytes = 0;
function decode7(source, options) {
  const buffer = new Uint8ArrayList();
  let mode = ReadMode.LENGTH;
  let dataLength = -1;
  const lengthDecoder = options?.lengthDecoder ?? defaultDecoder;
  const maxLengthLength = options?.maxLengthLength ?? MAX_LENGTH_LENGTH;
  const maxDataLength = options?.maxDataLength ?? MAX_DATA_LENGTH;
  function* maybeYield() {
    while (buffer.byteLength > 0) {
      if (mode === ReadMode.LENGTH) {
        try {
          dataLength = lengthDecoder(buffer);
          if (dataLength < 0) {
            throw new InvalidMessageLengthError2("Invalid message length");
          }
          if (dataLength > maxDataLength) {
            throw new InvalidDataLengthError2("Message length too long");
          }
          const dataLengthLength = lengthDecoder.bytes;
          buffer.consume(dataLengthLength);
          if (options?.onLength != null) {
            options.onLength(dataLength);
          }
          mode = ReadMode.DATA;
        } catch (err) {
          if (err instanceof RangeError) {
            if (buffer.byteLength > maxLengthLength) {
              throw new InvalidDataLengthLengthError2("Message length length too long");
            }
            break;
          }
          throw err;
        }
      }
      if (mode === ReadMode.DATA) {
        if (buffer.byteLength < dataLength) {
          break;
        }
        const data = buffer.sublist(0, dataLength);
        buffer.consume(dataLength);
        if (options?.onData != null) {
          options.onData(data);
        }
        yield data;
        mode = ReadMode.LENGTH;
      }
    }
  }
  if (isAsyncIterable7(source)) {
    return async function* () {
      for await (const buf of source) {
        buffer.append(buf);
        yield* maybeYield();
      }
      if (buffer.byteLength > 0) {
        throw new UnexpectedEOFError2("Unexpected end of input");
      }
    }();
  }
  return function* () {
    for (const buf of source) {
      buffer.append(buf);
      yield* maybeYield();
    }
    if (buffer.byteLength > 0) {
      throw new UnexpectedEOFError2("Unexpected end of input");
    }
  }();
}
decode7.fromReader = (reader, options) => {
  let byteLength = 1;
  const varByteSource = async function* () {
    while (true) {
      try {
        const { done, value: value2 } = await reader.next(byteLength);
        if (done === true) {
          return;
        }
        if (value2 != null) {
          yield value2;
        }
      } catch (err) {
        if (err.code === "ERR_UNDER_READ") {
          return { done: true, value: null };
        }
        throw err;
      } finally {
        byteLength = 1;
      }
    }
  }();
  const onLength = (l2) => {
    byteLength = l2;
  };
  return decode7(varByteSource, {
    ...options ?? {},
    onLength
  });
};

// node_modules/@libp2p/multistream-select/dist/src/handle.js
async function handle(stream, protocols2, options) {
  protocols2 = Array.isArray(protocols2) ? protocols2 : [protocols2];
  options.log.trace("handle: available protocols %s", protocols2);
  const lp = lpStream(stream, {
    ...options,
    maxDataLength: MAX_PROTOCOL_LENGTH,
    maxLengthLength: 2
    // 2 bytes is enough to length-prefix MAX_PROTOCOL_LENGTH
  });
  while (true) {
    options.log.trace("handle: reading incoming string");
    const protocol = await readString(lp, options);
    options.log.trace('handle: read "%s"', protocol);
    if (protocol === PROTOCOL_ID) {
      options.log.trace('handle: respond with "%s" for "%s"', PROTOCOL_ID, protocol);
      await write2(lp, fromString2(`${PROTOCOL_ID}
`), options);
      options.log.trace('handle: responded with "%s" for "%s"', PROTOCOL_ID, protocol);
      continue;
    }
    if (protocols2.includes(protocol)) {
      options.log.trace('handle: respond with "%s" for "%s"', protocol, protocol);
      await write2(lp, fromString2(`${protocol}
`), options);
      options.log.trace('handle: responded with "%s" for "%s"', protocol, protocol);
      return { stream: lp.unwrap(), protocol };
    }
    if (protocol === "ls") {
      const protos = new Uint8ArrayList(...protocols2.map((p2) => encode6.single(fromString2(`${p2}
`))), fromString2("\n"));
      options.log.trace('handle: respond with "%s" for %s', protocols2, protocol);
      await write2(lp, protos, options);
      options.log.trace('handle: responded with "%s" for %s', protocols2, protocol);
      continue;
    }
    options.log.trace('handle: respond with "na" for "%s"', protocol);
    await write2(lp, fromString2("na\n"), options);
    options.log('handle: responded with "na" for "%s"', protocol);
  }
}

// node_modules/libp2p/dist/src/connection.js
var CLOSE_TIMEOUT = 500;
var Connection = class {
  id;
  remoteAddr;
  remotePeer;
  direction;
  timeline;
  multiplexer;
  encryption;
  status;
  limits;
  log;
  tags;
  maConn;
  muxer;
  components;
  outboundStreamProtocolNegotiationTimeout;
  inboundStreamProtocolNegotiationTimeout;
  constructor(components, init2) {
    this.components = components;
    this.id = init2.id;
    this.remoteAddr = init2.maConn.remoteAddr;
    this.remotePeer = init2.remotePeer;
    this.direction = init2.direction ?? "outbound";
    this.status = "open";
    this.timeline = init2.maConn.timeline;
    this.encryption = init2.encryption;
    this.limits = init2.limits;
    this.maConn = init2.maConn;
    this.log = init2.maConn.log;
    this.outboundStreamProtocolNegotiationTimeout = init2.outboundStreamProtocolNegotiationTimeout ?? PROTOCOL_NEGOTIATION_TIMEOUT;
    this.inboundStreamProtocolNegotiationTimeout = init2.inboundStreamProtocolNegotiationTimeout ?? PROTOCOL_NEGOTIATION_TIMEOUT;
    if (this.remoteAddr.getPeerId() == null) {
      this.remoteAddr = this.remoteAddr.encapsulate(`/p2p/${this.remotePeer}`);
    }
    this.tags = [];
    if (init2.muxerFactory != null) {
      this.multiplexer = init2.muxerFactory.protocol;
      this.muxer = init2.muxerFactory.createStreamMuxer({
        direction: this.direction,
        log: this.log,
        // Run anytime a remote stream is created
        onIncomingStream: (stream) => {
          this.onIncomingStream(stream);
        }
      });
      void Promise.all([
        this.muxer.sink(this.maConn.source),
        this.maConn.sink(this.muxer.source)
      ]).catch((err) => {
        this.log.error("error piping data through muxer - %e", err);
      });
    }
  }
  [Symbol.toStringTag] = "Connection";
  [connectionSymbol] = true;
  get streams() {
    return this.muxer?.streams ?? [];
  }
  /**
   * Create a new stream over this connection
   */
  newStream = async (protocols2, options = {}) => {
    if (this.status === "closing") {
      throw new ConnectionClosingError("the connection is being closed");
    }
    if (this.status === "closed") {
      throw new ConnectionClosedError("the connection is closed");
    }
    if (!Array.isArray(protocols2)) {
      protocols2 = [protocols2];
    }
    if (this.limits != null && options?.runOnLimitedConnection !== true) {
      throw new LimitedConnectionError("Cannot open protocol stream on limited connection");
    }
    if (this.muxer == null) {
      throw new MuxerUnavailableError("Connection is not multiplexed");
    }
    this.log.trace("starting new stream for protocols %s", protocols2);
    const muxedStream = await this.muxer.newStream();
    this.log.trace("started new stream %s for protocols %s", muxedStream.id, protocols2);
    try {
      if (options.signal == null) {
        muxedStream.log("no abort signal was passed while trying to negotiate protocols %s falling back to default timeout", protocols2);
        const signal = AbortSignal.timeout(this.outboundStreamProtocolNegotiationTimeout);
        setMaxListeners(Infinity, signal);
        options = {
          ...options,
          signal
        };
      }
      muxedStream.log.trace("selecting protocol from protocols %s", protocols2);
      const { stream, protocol } = await select(muxedStream, protocols2, {
        ...options,
        log: muxedStream.log,
        yieldBytes: true
      });
      muxedStream.log("selected protocol %s", protocol);
      const outgoingLimit = findOutgoingStreamLimit(protocol, this.components.registrar, options);
      const streamCount = countStreams(protocol, "outbound", this);
      if (streamCount >= outgoingLimit) {
        const err = new TooManyOutboundProtocolStreamsError(`Too many outbound protocol streams for protocol "${protocol}" - ${streamCount}/${outgoingLimit}`);
        muxedStream.abort(err);
        throw err;
      }
      await this.components.peerStore.merge(this.remotePeer, {
        protocols: [protocol]
      });
      muxedStream.source = stream.source;
      muxedStream.sink = stream.sink;
      muxedStream.protocol = protocol;
      if (stream.closeWrite != null) {
        muxedStream.closeWrite = stream.closeWrite;
      }
      if (stream.closeRead != null) {
        muxedStream.closeRead = stream.closeRead;
      }
      if (stream.close != null) {
        muxedStream.close = stream.close;
      }
      this.components.metrics?.trackProtocolStream(muxedStream, this);
      muxedStream.direction = "outbound";
      return muxedStream;
    } catch (err) {
      this.log.error("could not create new outbound stream on connection %s %a for protocols %s - %e", this.direction === "inbound" ? "from" : "to", this.remoteAddr, protocols2, err);
      if (muxedStream.timeline.close == null) {
        muxedStream.abort(err);
      }
      throw err;
    }
  };
  onIncomingStream(muxedStream) {
    const signal = AbortSignal.timeout(this.inboundStreamProtocolNegotiationTimeout);
    setMaxListeners(Infinity, signal);
    void Promise.resolve().then(async () => {
      const protocols2 = this.components.registrar.getProtocols();
      const { stream, protocol } = await handle(muxedStream, protocols2, {
        signal,
        log: muxedStream.log,
        yieldBytes: false
      });
      this.log("incoming %s stream opened", protocol);
      const incomingLimit = findIncomingStreamLimit(protocol, this.components.registrar);
      const streamCount = countStreams(protocol, "inbound", this);
      if (streamCount === incomingLimit) {
        const err = new TooManyInboundProtocolStreamsError(`Too many inbound protocol streams for protocol "${protocol}" - limit ${incomingLimit}`);
        muxedStream.abort(err);
        throw err;
      }
      muxedStream.source = stream.source;
      muxedStream.sink = stream.sink;
      muxedStream.protocol = protocol;
      if (stream.closeWrite != null) {
        muxedStream.closeWrite = stream.closeWrite;
      }
      if (stream.closeRead != null) {
        muxedStream.closeRead = stream.closeRead;
      }
      if (stream.close != null) {
        muxedStream.close = stream.close;
      }
      await this.components.peerStore.merge(this.remotePeer, {
        protocols: [protocol]
      }, {
        signal
      });
      this.components.metrics?.trackProtocolStream(muxedStream, this);
      const { handler, options } = this.components.registrar.getHandler(protocol);
      if (this.limits != null && options.runOnLimitedConnection !== true) {
        throw new LimitedConnectionError("Cannot open protocol stream on limited connection");
      }
      await handler({ connection: this, stream: muxedStream });
    }).catch(async (err) => {
      this.log.error("error handling incoming stream id %s - %e", muxedStream.id, err);
      muxedStream.abort(err);
    });
  }
  /**
   * Close the connection
   */
  async close(options = {}) {
    if (this.status === "closed" || this.status === "closing") {
      return;
    }
    this.log("closing connection to %a", this.remoteAddr);
    this.status = "closing";
    if (options.signal == null) {
      const signal = AbortSignal.timeout(CLOSE_TIMEOUT);
      setMaxListeners(Infinity, signal);
      options = {
        ...options,
        signal
      };
    }
    try {
      this.log.trace("closing underlying transport");
      await this.muxer?.close(options);
      await this.maConn.close(options);
      this.log.trace("updating timeline with close time");
      this.status = "closed";
      this.timeline.close = Date.now();
    } catch (err) {
      this.log.error("error encountered during graceful close of connection to %a", this.remoteAddr, err);
      this.abort(err);
    }
  }
  abort(err) {
    if (this.status === "closed") {
      return;
    }
    this.log.error("aborting connection to %a due to error", this.remoteAddr, err);
    this.status = "closing";
    this.muxer?.abort(err);
    this.maConn.abort(err);
    this.status = "closed";
    this.timeline.close = Date.now();
  }
};
function createConnection(components, init2) {
  return new Connection(components, init2);
}
function findIncomingStreamLimit(protocol, registrar) {
  try {
    const { options } = registrar.getHandler(protocol);
    return options.maxInboundStreams;
  } catch (err) {
    if (err.name !== "UnhandledProtocolError") {
      throw err;
    }
  }
  return DEFAULT_MAX_INBOUND_STREAMS;
}
function findOutgoingStreamLimit(protocol, registrar, options = {}) {
  try {
    const { options: options2 } = registrar.getHandler(protocol);
    if (options2.maxOutboundStreams != null) {
      return options2.maxOutboundStreams;
    }
  } catch (err) {
    if (err.name !== "UnhandledProtocolError") {
      throw err;
    }
  }
  return options.maxOutboundStreams ?? DEFAULT_MAX_OUTBOUND_STREAMS;
}
function countStreams(protocol, direction, connection) {
  let streamCount = 0;
  connection.streams.forEach((stream) => {
    if (stream.direction === direction && stream.protocol === protocol) {
      streamCount++;
    }
  });
  return streamCount;
}

// node_modules/libp2p/dist/src/upgrader.js
var Upgrader = class {
  components;
  connectionEncrypters;
  streamMuxers;
  inboundUpgradeTimeout;
  inboundStreamProtocolNegotiationTimeout;
  outboundStreamProtocolNegotiationTimeout;
  events;
  metrics;
  constructor(components, init2) {
    this.components = components;
    this.connectionEncrypters = trackedMap({
      name: "libp2p_upgrader_connection_encrypters",
      metrics: this.components.metrics
    });
    init2.connectionEncrypters.forEach((encrypter) => {
      this.connectionEncrypters.set(encrypter.protocol, encrypter);
    });
    this.streamMuxers = trackedMap({
      name: "libp2p_upgrader_stream_multiplexers",
      metrics: this.components.metrics
    });
    init2.streamMuxers.forEach((muxer) => {
      this.streamMuxers.set(muxer.protocol, muxer);
    });
    this.inboundUpgradeTimeout = init2.inboundUpgradeTimeout ?? INBOUND_UPGRADE_TIMEOUT;
    this.inboundStreamProtocolNegotiationTimeout = init2.inboundStreamProtocolNegotiationTimeout ?? PROTOCOL_NEGOTIATION_TIMEOUT;
    this.outboundStreamProtocolNegotiationTimeout = init2.outboundStreamProtocolNegotiationTimeout ?? PROTOCOL_NEGOTIATION_TIMEOUT;
    this.events = components.events;
    this.metrics = {
      dials: components.metrics?.registerCounterGroup("libp2p_connection_manager_dials_total"),
      errors: components.metrics?.registerCounterGroup("libp2p_connection_manager_dial_errors_total"),
      inboundErrors: components.metrics?.registerCounterGroup("libp2p_connection_manager_dials_inbound_errors_total"),
      outboundErrors: components.metrics?.registerCounterGroup("libp2p_connection_manager_dials_outbound_errors_total")
    };
  }
  [Symbol.toStringTag] = "@libp2p/upgrader";
  async shouldBlockConnection(method, ...args) {
    const denyOperation = this.components.connectionGater[method];
    if (denyOperation == null) {
      return;
    }
    const result = await denyOperation.apply(this.components.connectionGater, args);
    if (result === true) {
      throw new ConnectionInterceptedError(`The multiaddr connection is blocked by gater.${method}`);
    }
  }
  createInboundAbortSignal(signal) {
    const output = anySignal([
      AbortSignal.timeout(this.inboundUpgradeTimeout),
      signal
    ]);
    setMaxListeners(Infinity, output);
    return output;
  }
  /**
   * Upgrades an inbound connection
   */
  async upgradeInbound(maConn, opts) {
    let accepted = false;
    const signal = this.createInboundAbortSignal(opts.signal);
    try {
      this.metrics.dials?.increment({
        inbound: true
      });
      accepted = await raceSignal2(this.components.connectionManager.acceptIncomingConnection(maConn), signal);
      if (!accepted) {
        throw new ConnectionDeniedError("Connection denied");
      }
      await raceSignal2(this.shouldBlockConnection("denyInboundConnection", maConn), signal);
      await this._performUpgrade(maConn, "inbound", {
        ...opts,
        signal
      });
    } catch (err) {
      this.metrics.errors?.increment({
        inbound: true
      });
      this.metrics.inboundErrors?.increment({
        [err.name ?? "Error"]: true
      });
      throw err;
    } finally {
      signal.clear();
      if (accepted) {
        this.components.connectionManager.afterUpgradeInbound();
      }
    }
  }
  /**
   * Upgrades an outbound connection
   */
  async upgradeOutbound(maConn, opts) {
    try {
      this.metrics.dials?.increment({
        outbound: true
      });
      const idStr = maConn.remoteAddr.getPeerId();
      let remotePeerId;
      if (idStr != null) {
        remotePeerId = peerIdFromString(idStr);
        await raceSignal2(this.shouldBlockConnection("denyOutboundConnection", remotePeerId, maConn), opts.signal);
      }
      let direction = "outbound";
      if (opts.initiator === false) {
        direction = "inbound";
      }
      return await this._performUpgrade(maConn, direction, opts);
    } catch (err) {
      this.metrics.errors?.increment({
        outbound: true
      });
      this.metrics.outboundErrors?.increment({
        [err.name ?? "Error"]: true
      });
      throw err;
    }
  }
  async _performUpgrade(maConn, direction, opts) {
    let encryptedConn;
    let remotePeer;
    let upgradedConn;
    let muxerFactory;
    let cryptoProtocol;
    const id = `${parseInt(String(Math.random() * 1e9)).toString(36)}${Date.now()}`;
    maConn.log = maConn.log.newScope(`${direction}:${id}`);
    this.components.metrics?.trackMultiaddrConnection(maConn);
    maConn.log.trace("starting the %s connection upgrade", direction);
    let protectedConn = maConn;
    if (opts?.skipProtection !== true) {
      const protector = this.components.connectionProtector;
      if (protector != null) {
        maConn.log("protecting the %s connection", direction);
        protectedConn = await protector.protect(maConn, opts);
      }
    }
    try {
      encryptedConn = protectedConn;
      if (opts?.skipEncryption !== true) {
        opts?.onProgress?.(new CustomProgressEvent(`upgrader:encrypt-${direction}-connection`));
        ({
          conn: encryptedConn,
          remotePeer,
          protocol: cryptoProtocol,
          streamMuxer: muxerFactory
        } = await (direction === "inbound" ? this._encryptInbound(protectedConn, opts) : this._encryptOutbound(protectedConn, opts)));
        const maConn2 = {
          ...protectedConn,
          ...encryptedConn
        };
        await this.shouldBlockConnection(direction === "inbound" ? "denyInboundEncryptedConnection" : "denyOutboundEncryptedConnection", remotePeer, maConn2);
      } else {
        const idStr = maConn.remoteAddr.getPeerId();
        if (idStr == null) {
          throw new InvalidMultiaddrError(`${direction} connection that skipped encryption must have a peer id`);
        }
        const remotePeerId = peerIdFromString(idStr);
        cryptoProtocol = "native";
        remotePeer = remotePeerId;
      }
      if (remotePeer.equals(this.components.peerId)) {
        const err = new InvalidPeerIdError("Can not dial self");
        maConn.abort(err);
        throw err;
      }
      upgradedConn = encryptedConn;
      if (opts?.muxerFactory != null) {
        muxerFactory = opts.muxerFactory;
      } else if (muxerFactory == null && this.streamMuxers.size > 0) {
        opts?.onProgress?.(new CustomProgressEvent(`upgrader:multiplex-${direction}-connection`));
        const multiplexed = await (direction === "inbound" ? this._multiplexInbound({
          ...protectedConn,
          ...encryptedConn
        }, this.streamMuxers, opts) : this._multiplexOutbound({
          ...protectedConn,
          ...encryptedConn
        }, this.streamMuxers, opts));
        muxerFactory = multiplexed.muxerFactory;
        upgradedConn = multiplexed.stream;
      }
    } catch (err) {
      maConn.log.error("failed to upgrade inbound connection %s %a - %e", direction === "inbound" ? "from" : "to", maConn.remoteAddr, err);
      throw err;
    }
    await this.shouldBlockConnection(direction === "inbound" ? "denyInboundUpgradedConnection" : "denyOutboundUpgradedConnection", remotePeer, maConn);
    const conn = this._createConnection({
      id,
      cryptoProtocol,
      direction,
      maConn,
      upgradedConn,
      muxerFactory,
      remotePeer,
      limits: opts?.limits
    });
    conn.log("successfully upgraded %s connection", direction);
    return conn;
  }
  /**
   * A convenience method for generating a new `Connection`
   */
  _createConnection(opts) {
    const { id, cryptoProtocol, direction, maConn, upgradedConn, remotePeer, muxerFactory, limits } = opts;
    let connection;
    const _timeline = maConn.timeline;
    maConn.timeline = new Proxy(_timeline, {
      set: (...args) => {
        if (args[1] === "close" && args[2] != null && _timeline.close == null) {
          (async () => {
            try {
              if (connection.status === "open") {
                await connection.close();
              }
            } catch (err) {
              connection.log.error("error closing connection after timeline close %e", err);
            } finally {
              this.events.safeDispatchEvent("connection:close", {
                detail: connection
              });
            }
          })().catch((err) => {
            connection.log.error("error thrown while dispatching connection:close event %e", err);
          });
        }
        return Reflect.set(...args);
      }
    });
    maConn.timeline.upgraded = Date.now();
    connection = createConnection(this.components, {
      id,
      maConn: upgradedConn,
      remotePeer,
      direction,
      muxerFactory,
      encryption: cryptoProtocol,
      limits,
      outboundStreamProtocolNegotiationTimeout: this.outboundStreamProtocolNegotiationTimeout,
      inboundStreamProtocolNegotiationTimeout: this.inboundStreamProtocolNegotiationTimeout
    });
    this.events.safeDispatchEvent("connection:open", {
      detail: connection
    });
    return connection;
  }
  /**
   * Attempts to encrypt the incoming `connection` with the provided `cryptos`
   */
  async _encryptInbound(connection, options) {
    const protocols2 = Array.from(this.connectionEncrypters.keys());
    try {
      const { stream, protocol } = await handle(connection, protocols2, {
        ...options,
        log: connection.log
      });
      const encrypter = this.connectionEncrypters.get(protocol);
      if (encrypter == null) {
        throw new EncryptionFailedError(`no crypto module found for ${protocol}`);
      }
      connection.log("encrypting inbound connection to %a using %s", connection.remoteAddr, protocol);
      return {
        ...await encrypter.secureInbound(stream, options),
        protocol
      };
    } catch (err) {
      connection.log.error("encrypting inbound connection from %a failed", connection.remoteAddr, err);
      throw new EncryptionFailedError(err.message);
    }
  }
  /**
   * Attempts to encrypt the given `connection` with the provided connection encrypters.
   * The first `ConnectionEncrypter` module to succeed will be used
   */
  async _encryptOutbound(connection, options) {
    const protocols2 = Array.from(this.connectionEncrypters.keys());
    try {
      connection.log.trace("selecting encrypter from %s", protocols2);
      const { stream, protocol } = await select(connection, protocols2, {
        ...options,
        log: connection.log,
        yieldBytes: true
      });
      const encrypter = this.connectionEncrypters.get(protocol);
      if (encrypter == null) {
        throw new EncryptionFailedError(`no crypto module found for ${protocol}`);
      }
      connection.log("encrypting outbound connection to %a using %s", connection.remoteAddr, protocol);
      return {
        ...await encrypter.secureOutbound(stream, options),
        protocol
      };
    } catch (err) {
      connection.log.error("encrypting outbound connection to %a failed", connection.remoteAddr, err);
      throw new EncryptionFailedError(err.message);
    }
  }
  /**
   * Selects one of the given muxers via multistream-select. That
   * muxer will be used for all future streams on the connection.
   */
  async _multiplexOutbound(connection, muxers, options) {
    const protocols2 = Array.from(muxers.keys());
    connection.log("outbound selecting muxer %s", protocols2);
    try {
      connection.log.trace("selecting stream muxer from %s", protocols2);
      const { stream, protocol } = await select(connection, protocols2, {
        ...options,
        log: connection.log,
        yieldBytes: true
      });
      connection.log("selected %s as muxer protocol", protocol);
      const muxerFactory = muxers.get(protocol);
      return { stream, muxerFactory };
    } catch (err) {
      connection.log.error("error multiplexing outbound connection", err);
      throw new MuxerUnavailableError(String(err));
    }
  }
  /**
   * Registers support for one of the given muxers via multistream-select. The
   * selected muxer will be used for all future streams on the connection.
   */
  async _multiplexInbound(connection, muxers, options) {
    const protocols2 = Array.from(muxers.keys());
    connection.log("inbound handling muxers %s", protocols2);
    try {
      const { stream, protocol } = await handle(connection, protocols2, {
        ...options,
        log: connection.log
      });
      const muxerFactory = muxers.get(protocol);
      return { stream, muxerFactory };
    } catch (err) {
      connection.log.error("error multiplexing inbound connection", err);
      throw new MuxerUnavailableError(String(err));
    }
  }
  getConnectionEncrypters() {
    return this.connectionEncrypters;
  }
  getStreamMuxers() {
    return this.streamMuxers;
  }
};

// node_modules/libp2p/dist/src/user-agent.js
var import_node_process2 = __toESM(require("node:process"), 1);

// node_modules/libp2p/dist/src/version.js
var version = "2.10.0";
var name2 = "js-libp2p";

// node_modules/libp2p/dist/src/user-agent.js
function userAgent(name3, version2) {
  let platform = "node";
  let platformVersion = import_node_process2.default.versions.node;
  if (import_node_process2.default.versions.deno != null) {
    platform = "deno";
    platformVersion = import_node_process2.default.versions.deno;
  }
  if (import_node_process2.default.versions.bun != null) {
    platform = "bun";
    platformVersion = import_node_process2.default.versions.bun;
  }
  if (import_node_process2.default.versions.electron != null) {
    platform = "electron";
    platformVersion = import_node_process2.default.versions.electron;
  }
  return `${name3 ?? name2}/${version2 ?? version} ${platform}/${platformVersion.replaceAll("v", "")}`;
}

// node_modules/libp2p/dist/src/libp2p.js
var Libp2p = class extends TypedEventEmitter {
  peerId;
  peerStore;
  contentRouting;
  peerRouting;
  metrics;
  services;
  logger;
  status;
  components;
  log;
  // eslint-disable-next-line complexity
  constructor(init2) {
    super();
    this.status = "stopped";
    const events = new TypedEventEmitter();
    const originalDispatch = events.dispatchEvent.bind(events);
    events.dispatchEvent = (evt) => {
      const internalResult = originalDispatch(evt);
      const externalResult = this.dispatchEvent(new CustomEvent(evt.type, { detail: evt.detail }));
      return internalResult || externalResult;
    };
    setMaxListeners(Infinity, events);
    this.peerId = init2.peerId;
    this.logger = init2.logger ?? defaultLogger();
    this.log = this.logger.forComponent("libp2p");
    this.services = {};
    const nodeInfoName = init2.nodeInfo?.name ?? name2;
    const nodeInfoVersion = init2.nodeInfo?.version ?? version;
    const components = this.components = defaultComponents({
      peerId: init2.peerId,
      privateKey: init2.privateKey,
      nodeInfo: {
        name: nodeInfoName,
        version: nodeInfoVersion,
        userAgent: init2.nodeInfo?.userAgent ?? userAgent(nodeInfoName, nodeInfoVersion)
      },
      logger: this.logger,
      events,
      datastore: init2.datastore ?? new MemoryDatastore(),
      connectionGater: connectionGater(init2.connectionGater),
      dns: init2.dns
    });
    if (init2.metrics != null) {
      this.metrics = this.configureComponent("metrics", init2.metrics(this.components));
    }
    this.peerStore = this.configureComponent("peerStore", persistentPeerStore(components, {
      addressFilter: this.components.connectionGater.filterMultiaddrForPeer,
      ...init2.peerStore
    }));
    components.events.addEventListener("peer:update", (evt) => {
      if (evt.detail.previous == null) {
        const peerInfo = {
          id: evt.detail.peer.id,
          multiaddrs: evt.detail.peer.addresses.map((a2) => a2.multiaddr)
        };
        components.events.safeDispatchEvent("peer:discovery", { detail: peerInfo });
      }
    });
    if (init2.connectionProtector != null) {
      this.configureComponent("connectionProtector", init2.connectionProtector(components));
    }
    this.components.upgrader = new Upgrader(this.components, {
      connectionEncrypters: (init2.connectionEncrypters ?? []).map((fn, index) => this.configureComponent(`connection-encryption-${index}`, fn(this.components))),
      streamMuxers: (init2.streamMuxers ?? []).map((fn, index) => this.configureComponent(`stream-muxers-${index}`, fn(this.components))),
      inboundUpgradeTimeout: init2.connectionManager?.inboundUpgradeTimeout,
      inboundStreamProtocolNegotiationTimeout: init2.connectionManager?.inboundStreamProtocolNegotiationTimeout ?? init2.connectionManager?.protocolNegotiationTimeout,
      outboundStreamProtocolNegotiationTimeout: init2.connectionManager?.outboundStreamProtocolNegotiationTimeout ?? init2.connectionManager?.protocolNegotiationTimeout
    });
    this.configureComponent("transportManager", new DefaultTransportManager(this.components, init2.transportManager));
    this.configureComponent("connectionManager", new DefaultConnectionManager(this.components, init2.connectionManager));
    if (init2.connectionMonitor?.enabled !== false) {
      this.configureComponent("connectionMonitor", new ConnectionMonitor(this.components, init2.connectionMonitor));
    }
    this.configureComponent("registrar", new Registrar(this.components));
    this.configureComponent("addressManager", new AddressManager(this.components, init2.addresses));
    const peerRouters = (init2.peerRouters ?? []).map((fn, index) => this.configureComponent(`peer-router-${index}`, fn(this.components)));
    this.peerRouting = this.components.peerRouting = this.configureComponent("peerRouting", new DefaultPeerRouting(this.components, {
      routers: peerRouters
    }));
    const contentRouters = (init2.contentRouters ?? []).map((fn, index) => this.configureComponent(`content-router-${index}`, fn(this.components)));
    this.contentRouting = this.components.contentRouting = this.configureComponent("contentRouting", new CompoundContentRouting(this.components, {
      routers: contentRouters
    }));
    this.configureComponent("randomWalk", new RandomWalk(this.components));
    (init2.peerDiscovery ?? []).forEach((fn, index) => {
      const service = this.configureComponent(`peer-discovery-${index}`, fn(this.components));
      service.addEventListener("peer", (evt) => {
        this.#onDiscoveryPeer(evt);
      });
    });
    init2.transports?.forEach((fn, index) => {
      this.components.transportManager.add(this.configureComponent(`transport-${index}`, fn(this.components)));
    });
    if (init2.services != null) {
      for (const name3 of Object.keys(init2.services)) {
        const createService = init2.services[name3];
        const service = createService(this.components);
        if (service == null) {
          this.log.error("service factory %s returned null or undefined instance", name3);
          continue;
        }
        this.services[name3] = service;
        this.configureComponent(name3, service);
        if (service[contentRoutingSymbol] != null) {
          this.log("registering service %s for content routing", name3);
          contentRouters.push(service[contentRoutingSymbol]);
        }
        if (service[peerRoutingSymbol] != null) {
          this.log("registering service %s for peer routing", name3);
          peerRouters.push(service[peerRoutingSymbol]);
        }
        if (service[peerDiscoverySymbol] != null) {
          this.log("registering service %s for peer discovery", name3);
          service[peerDiscoverySymbol].addEventListener?.("peer", (evt) => {
            this.#onDiscoveryPeer(evt);
          });
        }
      }
    }
    checkServiceDependencies(components);
  }
  configureComponent(name3, component) {
    if (component == null) {
      this.log.error("component %s was null or undefined", name3);
    }
    this.components[name3] = component;
    return component;
  }
  /**
   * Starts the libp2p node and all its subsystems
   */
  async start() {
    if (this.status !== "stopped") {
      return;
    }
    this.status = "starting";
    this.log("libp2p is starting");
    try {
      await this.components.beforeStart?.();
      await this.components.start();
      await this.components.afterStart?.();
      this.status = "started";
      this.safeDispatchEvent("start", { detail: this });
      this.log("libp2p has started");
    } catch (err) {
      this.log.error("An error occurred starting libp2p", err);
      this.status = "started";
      await this.stop();
      throw err;
    }
  }
  /**
   * Stop the libp2p node by closing its listeners and open connections
   */
  async stop() {
    if (this.status !== "started") {
      return;
    }
    this.log("libp2p is stopping");
    this.status = "stopping";
    await this.components.beforeStop?.();
    await this.components.stop();
    await this.components.afterStop?.();
    this.status = "stopped";
    this.safeDispatchEvent("stop", { detail: this });
    this.log("libp2p has stopped");
  }
  getConnections(peerId) {
    return this.components.connectionManager.getConnections(peerId);
  }
  getDialQueue() {
    return this.components.connectionManager.getDialQueue();
  }
  getPeers() {
    const peerSet2 = new PeerSet();
    for (const conn of this.components.connectionManager.getConnections()) {
      peerSet2.add(conn.remotePeer);
    }
    return Array.from(peerSet2);
  }
  async dial(peer, options = {}) {
    return this.components.connectionManager.openConnection(peer, {
      // ensure any userland dials take top priority in the queue
      priority: 75,
      ...options
    });
  }
  async dialProtocol(peer, protocols2, options = {}) {
    if (protocols2 == null) {
      throw new InvalidParametersError2("no protocols were provided to open a stream");
    }
    protocols2 = Array.isArray(protocols2) ? protocols2 : [protocols2];
    if (protocols2.length === 0) {
      throw new InvalidParametersError2("no protocols were provided to open a stream");
    }
    const connection = await this.dial(peer, options);
    return connection.newStream(protocols2, options);
  }
  getMultiaddrs() {
    return this.components.addressManager.getAddresses();
  }
  getProtocols() {
    return this.components.registrar.getProtocols();
  }
  async hangUp(peer, options = {}) {
    if (isMultiaddr(peer)) {
      peer = peerIdFromString(peer.getPeerId() ?? "");
    }
    await this.components.connectionManager.closeConnections(peer, options);
  }
  async getPublicKey(peer, options = {}) {
    this.log("getPublicKey %p", peer);
    if (peer.publicKey != null) {
      return peer.publicKey;
    }
    try {
      const peerInfo = await this.peerStore.get(peer, options);
      if (peerInfo.id.publicKey != null) {
        return peerInfo.id.publicKey;
      }
    } catch (err) {
      if (err.name !== "NotFoundError") {
        throw err;
      }
    }
    const peerKey = concat([
      fromString2("/pk/"),
      peer.toMultihash().bytes
    ]);
    const bytes = await this.contentRouting.get(peerKey, options);
    const publicKey = publicKeyFromProtobuf(bytes);
    await this.peerStore.patch(peer, {
      publicKey
    }, options);
    return publicKey;
  }
  async handle(protocols2, handler, options) {
    if (!Array.isArray(protocols2)) {
      protocols2 = [protocols2];
    }
    await Promise.all(protocols2.map(async (protocol) => {
      await this.components.registrar.handle(protocol, handler, options);
    }));
  }
  async unhandle(protocols2, options) {
    if (!Array.isArray(protocols2)) {
      protocols2 = [protocols2];
    }
    await Promise.all(protocols2.map(async (protocol) => {
      await this.components.registrar.unhandle(protocol, options);
    }));
  }
  async register(protocol, topology, options) {
    return this.components.registrar.register(protocol, topology, options);
  }
  unregister(id) {
    this.components.registrar.unregister(id);
  }
  async isDialable(multiaddr2, options = {}) {
    return this.components.connectionManager.isDialable(multiaddr2, options);
  }
  /**
   * Called whenever peer discovery services emit `peer` events and adds peers
   * to the peer store.
   */
  #onDiscoveryPeer(evt) {
    const { detail: peer } = evt;
    if (peer.id.toString() === this.peerId.toString()) {
      this.log.error("peer discovery mechanism discovered self");
      return;
    }
    void this.components.peerStore.merge(peer.id, {
      multiaddrs: peer.multiaddrs
    }).catch((err) => {
      this.log.error(err);
    });
  }
};

// node_modules/libp2p/dist/src/index.js
async function createLibp2p(options = {}) {
  options.privateKey ??= await generateKeyPair("Ed25519");
  const node = new Libp2p({
    ...await validateConfig(options),
    peerId: peerIdFromPrivateKey(options.privateKey)
  });
  if (options.start !== false) {
    await node.start();
  }
  return node;
}

// node_modules/@libp2p/webrtc/dist/src/private-to-public/pb/message.js
var Message;
(function(Message3) {
  let Flag2;
  (function(Flag3) {
    Flag3["FIN"] = "FIN";
    Flag3["STOP_SENDING"] = "STOP_SENDING";
    Flag3["RESET"] = "RESET";
    Flag3["FIN_ACK"] = "FIN_ACK";
  })(Flag2 = Message3.Flag || (Message3.Flag = {}));
  let __FlagValues;
  (function(__FlagValues2) {
    __FlagValues2[__FlagValues2["FIN"] = 0] = "FIN";
    __FlagValues2[__FlagValues2["STOP_SENDING"] = 1] = "STOP_SENDING";
    __FlagValues2[__FlagValues2["RESET"] = 2] = "RESET";
    __FlagValues2[__FlagValues2["FIN_ACK"] = 3] = "FIN_ACK";
  })(__FlagValues || (__FlagValues = {}));
  (function(Flag3) {
    Flag3.codec = () => {
      return enumeration(__FlagValues);
    };
  })(Flag2 = Message3.Flag || (Message3.Flag = {}));
  let _codec;
  Message3.codec = () => {
    if (_codec == null) {
      _codec = message((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork();
        }
        if (obj.flag != null) {
          w.uint32(8);
          Message3.Flag.codec().encode(obj.flag, w);
        }
        if (obj.message != null) {
          w.uint32(18);
          w.bytes(obj.message);
        }
        if (opts.lengthDelimited !== false) {
          w.ldelim();
        }
      }, (reader, length3, opts = {}) => {
        const obj = {};
        const end = length3 == null ? reader.len : reader.pos + length3;
        while (reader.pos < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1: {
              obj.flag = Message3.Flag.codec().decode(reader);
              break;
            }
            case 2: {
              obj.message = reader.bytes();
              break;
            }
            default: {
              reader.skipType(tag & 7);
              break;
            }
          }
        }
        return obj;
      });
    }
    return _codec;
  };
  Message3.encode = (obj) => {
    return encodeMessage(obj, Message3.codec());
  };
  Message3.decode = (buf, opts) => {
    return decodeMessage(buf, Message3.codec(), opts);
  };
})(Message || (Message = {}));

// node_modules/@libp2p/webrtc/dist/src/constants.js
var DEFAULT_ICE_SERVERS = [
  "stun:stun.l.google.com:19302",
  "stun:global.stun.twilio.com:3478",
  "stun:stun.cloudflare.com:3478",
  "stun:stun.services.mozilla.com:3478"
];
var UFRAG_ALPHABET = Array.from("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
var MAX_BUFFERED_AMOUNT = 2 * 1024 * 1024;
var BUFFERED_AMOUNT_LOW_TIMEOUT = 30 * 1e3;
var MAX_MESSAGE_SIZE = 16 * 1024;
function calculateProtobufOverhead(maxMessageSize = MAX_MESSAGE_SIZE) {
  const messageLength = encodingLength2(maxMessageSize - encodingLength2(maxMessageSize));
  const flagField = 1 + encodingLength2(Object.keys(Message.Flag).length - 1);
  const messageFieldIdType = 1;
  const available = maxMessageSize - messageLength - flagField - messageFieldIdType;
  const messageFieldLengthLength = encodingLength2(available);
  return messageLength + flagField + messageFieldIdType + messageFieldLengthLength;
}
var PROTOBUF_OVERHEAD = calculateProtobufOverhead();
var FIN_ACK_TIMEOUT = 5e3;
var OPEN_TIMEOUT = 5e3;
var DATA_CHANNEL_DRAIN_TIMEOUT = 3e4;
var MUXER_PROTOCOL = "/webrtc";
var SIGNALING_PROTOCOL = "/webrtc-signaling/0.0.1";

// node_modules/@libp2p/webrtc/dist/src/util.js
var import_detect_browser = __toESM(require_detect_browser(), 1);

// node_modules/p-timeout/index.js
var TimeoutError2 = class extends Error {
  constructor(message2) {
    super(message2);
    this.name = "TimeoutError";
  }
};
var AbortError6 = class extends Error {
  constructor(message2) {
    super();
    this.name = "AbortError";
    this.message = message2;
  }
};
var getDOMException = (errorMessage) => globalThis.DOMException === void 0 ? new AbortError6(errorMessage) : new DOMException(errorMessage);
var getAbortedReason = (signal) => {
  const reason = signal.reason === void 0 ? getDOMException("This operation was aborted.") : signal.reason;
  return reason instanceof Error ? reason : getDOMException(reason);
};
function pTimeout(promise, options) {
  const {
    milliseconds,
    fallback,
    message: message2,
    customTimers = { setTimeout, clearTimeout }
  } = options;
  let timer;
  let abortHandler;
  const wrappedPromise = new Promise((resolve, reject) => {
    if (typeof milliseconds !== "number" || Math.sign(milliseconds) !== 1) {
      throw new TypeError(`Expected \`milliseconds\` to be a positive number, got \`${milliseconds}\``);
    }
    if (options.signal) {
      const { signal } = options;
      if (signal.aborted) {
        reject(getAbortedReason(signal));
      }
      abortHandler = () => {
        reject(getAbortedReason(signal));
      };
      signal.addEventListener("abort", abortHandler, { once: true });
    }
    if (milliseconds === Number.POSITIVE_INFINITY) {
      promise.then(resolve, reject);
      return;
    }
    const timeoutError = new TimeoutError2();
    timer = customTimers.setTimeout.call(void 0, () => {
      if (fallback) {
        try {
          resolve(fallback());
        } catch (error) {
          reject(error);
        }
        return;
      }
      if (typeof promise.cancel === "function") {
        promise.cancel();
      }
      if (message2 === false) {
        resolve();
      } else if (message2 instanceof Error) {
        reject(message2);
      } else {
        timeoutError.message = message2 ?? `Promise timed out after ${milliseconds} milliseconds`;
        reject(timeoutError);
      }
    }, milliseconds);
    (async () => {
      try {
        resolve(await promise);
      } catch (error) {
        reject(error);
      }
    })();
  });
  const cancelablePromise = wrappedPromise.finally(() => {
    cancelablePromise.clear();
    if (abortHandler && options.signal) {
      options.signal.removeEventListener("abort", abortHandler);
    }
  });
  cancelablePromise.clear = () => {
    customTimers.clearTimeout.call(void 0, timer);
    timer = void 0;
  };
  return cancelablePromise;
}

// node_modules/@libp2p/webrtc/dist/src/util.js
var browser = (0, import_detect_browser.detect)();
var isFirefox = browser != null && browser.name === "firefox";
var nopSource = async function* nop() {
};
var nopSink = async (_) => {
};
function drainAndClose(channel, direction, drainTimeout = DATA_CHANNEL_DRAIN_TIMEOUT, options) {
  if (channel.readyState !== "open") {
    return;
  }
  void Promise.resolve().then(async () => {
    if (channel.bufferedAmount > 0) {
      options.log("%s drain channel with %d buffered bytes", direction, channel.bufferedAmount);
      const deferred = pDefer();
      let drained = false;
      channel.bufferedAmountLowThreshold = 0;
      const closeListener = () => {
        if (!drained) {
          options.log("%s drain channel closed before drain", direction);
          deferred.resolve();
        }
      };
      channel.addEventListener("close", closeListener, {
        once: true
      });
      channel.addEventListener("bufferedamountlow", () => {
        drained = true;
        channel.removeEventListener("close", closeListener);
        deferred.resolve();
      });
      await pTimeout(deferred.promise, {
        milliseconds: drainTimeout
      });
    }
  }).then(async () => {
    if (channel.readyState === "open") {
      channel.close();
    }
  }).catch((err) => {
    options.log.error("error closing outbound stream", err);
  });
}
async function getRtcConfiguration(config) {
  config = config ?? {};
  if (typeof config === "function") {
    config = await config();
  }
  config.iceServers = config.iceServers ?? DEFAULT_ICE_SERVERS.map((url) => ({
    urls: [
      url
    ]
  }));
  return config;
}

// node_modules/@libp2p/webrtc/dist/src/maconn.js
var WebRTCMultiaddrConnection = class {
  log;
  /**
   * WebRTC Peer Connection
   */
  peerConnection;
  /**
   * The multiaddr address used to communicate with the remote peer
   */
  remoteAddr;
  /**
   * Holds the life cycle times of the connection
   */
  timeline;
  /**
   * Optional metrics counter group for this connection
   */
  metrics;
  /**
   * The stream source, a no-op as the transport natively supports multiplexing
   */
  source = nopSource();
  /**
   * The stream destination, a no-op as the transport natively supports multiplexing
   */
  sink = nopSink;
  constructor(components, init2) {
    this.log = components.logger.forComponent("libp2p:webrtc:maconn");
    this.remoteAddr = init2.remoteAddr;
    this.timeline = init2.timeline;
    this.peerConnection = init2.peerConnection;
    const peerConnection = this.peerConnection;
    const initialState = peerConnection.connectionState;
    this.peerConnection.onconnectionstatechange = () => {
      this.log.trace("peer connection state change", peerConnection.connectionState, "initial state", initialState);
      if (peerConnection.connectionState === "disconnected" || peerConnection.connectionState === "failed" || peerConnection.connectionState === "closed") {
        this.timeline.close = Date.now();
      }
    };
  }
  async close(options) {
    this.log.trace("closing connection");
    this.peerConnection.close();
    this.timeline.close = Date.now();
    this.metrics?.increment({ close: true });
  }
  abort(err) {
    this.log.error("closing connection due to error", err);
    this.peerConnection.close();
    this.timeline.close = Date.now();
    this.metrics?.increment({ abort: true });
  }
};

// node_modules/get-iterator/dist/src/index.js
function getIterator(obj) {
  if (obj != null) {
    if (typeof obj[Symbol.iterator] === "function") {
      return obj[Symbol.iterator]();
    }
    if (typeof obj[Symbol.asyncIterator] === "function") {
      return obj[Symbol.asyncIterator]();
    }
    if (typeof obj.next === "function") {
      return obj;
    }
  }
  throw new Error("argument is not an iterator or iterable");
}

// node_modules/@libp2p/utils/dist/src/is-promise.js
function isPromise2(thing) {
  if (thing == null) {
    return false;
  }
  return typeof thing.then === "function" && typeof thing.catch === "function" && typeof thing.finally === "function";
}

// node_modules/@libp2p/utils/dist/src/close-source.js
function closeSource(source, log2) {
  const res = getIterator(source).return?.();
  if (isPromise2(res)) {
    res.catch((err) => {
      log2.error("could not cause iterator to return", err);
    });
  }
}

// node_modules/@libp2p/utils/dist/src/abstract-stream.js
var DEFAULT_SEND_CLOSE_WRITE_TIMEOUT = 5e3;
function isPromise3(thing) {
  if (thing == null) {
    return false;
  }
  return typeof thing.then === "function" && typeof thing.catch === "function" && typeof thing.finally === "function";
}
var AbstractStream = class {
  id;
  direction;
  timeline;
  protocol;
  metadata;
  source;
  status;
  readStatus;
  writeStatus;
  log;
  sinkController;
  sinkEnd;
  closed;
  endErr;
  streamSource;
  onEnd;
  onCloseRead;
  onCloseWrite;
  onReset;
  onAbort;
  sendCloseWriteTimeout;
  sendingData;
  constructor(init2) {
    this.sinkController = new AbortController();
    this.sinkEnd = pDefer();
    this.closed = pDefer();
    this.log = init2.log;
    this.status = "open";
    this.readStatus = "ready";
    this.writeStatus = "ready";
    this.id = init2.id;
    this.metadata = init2.metadata ?? {};
    this.direction = init2.direction;
    this.timeline = {
      open: Date.now()
    };
    this.sendCloseWriteTimeout = init2.sendCloseWriteTimeout ?? DEFAULT_SEND_CLOSE_WRITE_TIMEOUT;
    this.onEnd = init2.onEnd;
    this.onCloseRead = init2.onCloseRead;
    this.onCloseWrite = init2.onCloseWrite;
    this.onReset = init2.onReset;
    this.onAbort = init2.onAbort;
    this.source = this.streamSource = pushable({
      onEnd: (err) => {
        if (err != null) {
          this.log.trace("source ended with error", err);
        } else {
          this.log.trace("source ended");
        }
        this.onSourceEnd(err);
      }
    });
    this.sink = this.sink.bind(this);
  }
  async sink(source) {
    if (this.writeStatus !== "ready") {
      throw new StreamStateError(`writable end state is "${this.writeStatus}" not "ready"`);
    }
    try {
      this.writeStatus = "writing";
      const options = {
        signal: this.sinkController.signal
      };
      if (this.direction === "outbound") {
        const res = this.sendNewStream(options);
        if (isPromise3(res)) {
          await res;
        }
      }
      const abortListener = () => {
        closeSource(source, this.log);
      };
      try {
        this.sinkController.signal.addEventListener("abort", abortListener);
        this.log.trace("sink reading from source");
        for await (let data of source) {
          data = data instanceof Uint8Array ? new Uint8ArrayList(data) : data;
          const res = this.sendData(data, options);
          if (isPromise3(res)) {
            this.sendingData = pDefer();
            await res;
            this.sendingData.resolve();
            this.sendingData = void 0;
          }
        }
      } finally {
        this.sinkController.signal.removeEventListener("abort", abortListener);
      }
      this.log.trace('sink finished reading from source, write status is "%s"', this.writeStatus);
      if (this.writeStatus === "writing") {
        this.writeStatus = "closing";
        this.log.trace("send close write to remote");
        await this.sendCloseWrite({
          signal: AbortSignal.timeout(this.sendCloseWriteTimeout)
        });
        this.writeStatus = "closed";
      }
      this.onSinkEnd();
    } catch (err) {
      this.log.trace("sink ended with error, calling abort with error", err);
      this.abort(err);
      throw err;
    } finally {
      this.log.trace("resolve sink end");
      this.sinkEnd.resolve();
    }
  }
  onSourceEnd(err) {
    if (this.timeline.closeRead != null) {
      return;
    }
    this.timeline.closeRead = Date.now();
    this.readStatus = "closed";
    if (err != null && this.endErr == null) {
      this.endErr = err;
    }
    this.onCloseRead?.();
    if (this.timeline.closeWrite != null) {
      this.log.trace("source and sink ended");
      this.timeline.close = Date.now();
      if (this.status !== "aborted" && this.status !== "reset") {
        this.status = "closed";
      }
      if (this.onEnd != null) {
        this.onEnd(this.endErr);
      }
      this.closed.resolve();
    } else {
      this.log.trace("source ended, waiting for sink to end");
    }
  }
  onSinkEnd(err) {
    if (this.timeline.closeWrite != null) {
      return;
    }
    this.timeline.closeWrite = Date.now();
    this.writeStatus = "closed";
    if (err != null && this.endErr == null) {
      this.endErr = err;
    }
    this.onCloseWrite?.();
    if (this.timeline.closeRead != null) {
      this.log.trace("sink and source ended");
      this.timeline.close = Date.now();
      if (this.status !== "aborted" && this.status !== "reset") {
        this.status = "closed";
      }
      if (this.onEnd != null) {
        this.onEnd(this.endErr);
      }
      this.closed.resolve();
    } else {
      this.log.trace("sink ended, waiting for source to end");
    }
  }
  // Close for both Reading and Writing
  async close(options) {
    if (this.status !== "open") {
      return;
    }
    this.log.trace("closing gracefully");
    this.status = "closing";
    await raceSignal2(Promise.all([
      this.closeWrite(options),
      this.closeRead(options),
      this.closed.promise
    ]), options?.signal);
    this.status = "closed";
    this.log.trace("closed gracefully");
  }
  async closeRead(options = {}) {
    if (this.readStatus === "closing" || this.readStatus === "closed") {
      return;
    }
    this.log.trace('closing readable end of stream with starting read status "%s"', this.readStatus);
    const readStatus = this.readStatus;
    this.readStatus = "closing";
    if (this.status !== "reset" && this.status !== "aborted" && this.timeline.closeRead == null) {
      this.log.trace("send close read to remote");
      await this.sendCloseRead(options);
    }
    if (readStatus === "ready") {
      this.log.trace("ending internal source queue with %d queued bytes", this.streamSource.readableLength);
      this.streamSource.end();
    }
    this.log.trace("closed readable end of stream");
  }
  async closeWrite(options = {}) {
    if (this.writeStatus === "closing" || this.writeStatus === "closed") {
      return;
    }
    this.log.trace('closing writable end of stream with starting write status "%s"', this.writeStatus);
    if (this.writeStatus === "ready") {
      this.log.trace("sink was never sunk, sink an empty array");
      await raceSignal2(this.sink([]), options.signal);
    }
    if (this.writeStatus === "writing") {
      if (this.sendingData != null) {
        await raceSignal2(this.sendingData.promise, options.signal);
      }
      this.log.trace("aborting source passed to .sink");
      this.sinkController.abort();
      await raceSignal2(this.sinkEnd.promise, options.signal);
    }
    this.writeStatus = "closed";
    this.log.trace("closed writable end of stream");
  }
  /**
   * Close immediately for reading and writing and send a reset message (local
   * error)
   */
  abort(err) {
    if (this.status === "closed" || this.status === "aborted" || this.status === "reset") {
      return;
    }
    this.log("abort with error", err);
    this.log("try to send reset to remote");
    const res = this.sendReset();
    if (isPromise3(res)) {
      res.catch((err2) => {
        this.log.error("error sending reset message", err2);
      });
    }
    this.status = "aborted";
    this.timeline.abort = Date.now();
    this._closeSinkAndSource(err);
    this.onAbort?.(err);
  }
  /**
   * Receive a reset message - close immediately for reading and writing (remote
   * error)
   */
  reset() {
    if (this.status === "closed" || this.status === "aborted" || this.status === "reset") {
      return;
    }
    const err = new StreamResetError("stream reset");
    this.status = "reset";
    this.timeline.reset = Date.now();
    this._closeSinkAndSource(err);
    this.onReset?.();
  }
  _closeSinkAndSource(err) {
    this._closeSink(err);
    this._closeSource(err);
  }
  _closeSink(err) {
    if (this.writeStatus === "writing") {
      this.log.trace("end sink source");
      this.sinkController.abort();
    }
    this.onSinkEnd(err);
  }
  _closeSource(err) {
    if (this.readStatus !== "closing" && this.readStatus !== "closed") {
      this.log.trace("ending source with %d bytes to be read by consumer", this.streamSource.readableLength);
      this.readStatus = "closing";
      this.streamSource.end(err);
    }
  }
  /**
   * The remote closed for writing so we should expect to receive no more
   * messages
   */
  remoteCloseWrite() {
    if (this.readStatus === "closing" || this.readStatus === "closed") {
      this.log("received remote close write but local source is already closed");
      return;
    }
    this.log.trace("remote close write");
    this._closeSource();
  }
  /**
   * The remote closed for reading so we should not send any more
   * messages
   */
  remoteCloseRead() {
    if (this.writeStatus === "closing" || this.writeStatus === "closed") {
      this.log("received remote close read but local sink is already closed");
      return;
    }
    this.log.trace("remote close read");
    this._closeSink();
  }
  /**
   * The underlying muxer has closed, no more messages can be sent or will
   * be received, close immediately to free up resources
   */
  destroy() {
    if (this.status === "closed" || this.status === "aborted" || this.status === "reset") {
      this.log("received destroy but we are already closed");
      return;
    }
    this.log.trace("stream destroyed");
    this._closeSinkAndSource();
  }
  /**
   * When an extending class reads data from it's implementation-specific source,
   * call this method to allow the stream consumer to read the data.
   */
  sourcePush(data) {
    this.streamSource.push(data);
  }
  /**
   * Returns the amount of unread data - can be used to prevent large amounts of
   * data building up when the stream consumer is too slow.
   */
  sourceReadableLength() {
    return this.streamSource.readableLength;
  }
};

// node_modules/@libp2p/webrtc/dist/src/stream.js
var WebRTCStream = class extends AbstractStream {
  /**
   * The data channel used to send and receive data
   */
  channel;
  /**
   * push data from the underlying datachannel to the length prefix decoder
   * and then the protobuf decoder.
   */
  incomingData;
  maxBufferedAmount;
  bufferedAmountLowEventTimeout;
  /**
   * The maximum size of a message in bytes
   */
  maxMessageSize;
  /**
   * When this promise is resolved, the remote has sent us a FIN flag
   */
  receiveFinAck;
  finAckTimeout;
  openTimeout;
  closeController;
  constructor(init2) {
    const originalOnEnd = init2.onEnd;
    init2.onEnd = (err) => {
      this.log.trace('readable and writeable ends closed with status "%s"', this.status);
      void Promise.resolve(async () => {
        if (this.timeline.abort != null || this.timeline.reset !== null) {
          return;
        }
        try {
          await pTimeout(this.receiveFinAck.promise, {
            milliseconds: this.finAckTimeout
          });
        } catch (err2) {
          this.log.error("error receiving FIN_ACK", err2);
        }
      }).then(() => {
        this.incomingData.end();
        originalOnEnd?.(err);
      }).catch((err2) => {
        this.log.error("error ending stream", err2);
      }).finally(() => {
        this.channel.close();
      });
    };
    super(init2);
    this.channel = init2.channel;
    this.channel.binaryType = "arraybuffer";
    this.incomingData = pushable();
    this.bufferedAmountLowEventTimeout = init2.bufferedAmountLowEventTimeout ?? BUFFERED_AMOUNT_LOW_TIMEOUT;
    this.maxBufferedAmount = init2.maxBufferedAmount ?? MAX_BUFFERED_AMOUNT;
    this.maxMessageSize = (init2.maxMessageSize ?? MAX_MESSAGE_SIZE) - PROTOBUF_OVERHEAD;
    this.receiveFinAck = pDefer();
    this.finAckTimeout = init2.closeTimeout ?? FIN_ACK_TIMEOUT;
    this.openTimeout = init2.openTimeout ?? OPEN_TIMEOUT;
    this.closeController = new AbortController();
    switch (this.channel.readyState) {
      case "open":
        this.timeline.open = (/* @__PURE__ */ new Date()).getTime();
        break;
      case "closed":
      case "closing":
        if (this.timeline.close === void 0 || this.timeline.close === 0) {
          this.timeline.close = Date.now();
        }
        break;
      case "connecting":
        break;
      default:
        this.log.error("unknown datachannel state %s", this.channel.readyState);
        throw new StreamStateError("Unknown datachannel state");
    }
    this.channel.onopen = (_evt) => {
      this.timeline.open = (/* @__PURE__ */ new Date()).getTime();
    };
    this.channel.onclose = (_evt) => {
      this.log.trace("received onclose event");
      this.closeController.abort();
      this.receiveFinAck.resolve();
      void this.close().catch((err) => {
        this.log.error("error closing stream after channel closed", err);
      });
    };
    this.channel.onerror = (evt) => {
      this.log.trace("received onerror event");
      this.closeController.abort();
      const err = evt.error;
      this.abort(err);
    };
    this.channel.onmessage = async (event) => {
      const { data } = event;
      if (data === null || data.byteLength === 0) {
        return;
      }
      this.incomingData.push(new Uint8Array(data, 0, data.byteLength));
    };
    const self2 = this;
    Promise.resolve().then(async () => {
      for await (const buf of decode7(this.incomingData)) {
        const message2 = self2.processIncomingProtobuf(buf);
        if (message2 != null) {
          self2.sourcePush(new Uint8ArrayList(message2));
        }
      }
    }).catch((err) => {
      this.log.error("error processing incoming data channel messages", err);
    });
  }
  sendNewStream() {
  }
  async _sendMessage(data, checkBuffer = true) {
    if (this.channel.readyState === "closed" || this.channel.readyState === "closing") {
      throw new StreamStateError(`Invalid datachannel state - ${this.channel.readyState}`);
    }
    if (this.channel.readyState !== "open") {
      const timeout = AbortSignal.timeout(this.openTimeout);
      const signal = anySignal([
        this.closeController.signal,
        timeout
      ]);
      try {
        this.log('channel state is "%s" and not "open", waiting for "open" event before sending data', this.channel.readyState);
        await raceEvent(this.channel, "open", signal);
      } finally {
        signal.clear();
      }
      this.log('channel state is now "%s", sending data', this.channel.readyState);
    }
    if (checkBuffer && this.channel.bufferedAmount > this.maxBufferedAmount) {
      const timeout = AbortSignal.timeout(this.bufferedAmountLowEventTimeout);
      const signal = anySignal([
        this.closeController.signal,
        timeout
      ]);
      try {
        this.log('channel buffer is %d, wait for "bufferedamountlow" event', this.channel.bufferedAmount);
        await raceEvent(this.channel, "bufferedamountlow", signal);
      } catch (err) {
        if (timeout.aborted) {
          throw new TimeoutError(`Timed out waiting for DataChannel buffer to clear after ${this.bufferedAmountLowEventTimeout}ms`);
        }
        throw err;
      } finally {
        signal.clear();
      }
    }
    try {
      this.log.trace('sending message, channel state "%s"', this.channel.readyState);
      this.channel.send(data.subarray());
    } catch (err) {
      this.log.error("error while sending message", err);
    }
  }
  async sendData(data) {
    const bytesTotal = data.byteLength;
    data = data.sublist();
    while (data.byteLength > 0) {
      const toSend = Math.min(data.byteLength, this.maxMessageSize);
      const buf = data.subarray(0, toSend);
      const messageBuf = Message.encode({ message: buf });
      const sendBuf = encode6.single(messageBuf);
      this.log.trace("sending %d/%d bytes on channel", buf.byteLength, bytesTotal);
      await this._sendMessage(sendBuf);
      data.consume(toSend);
    }
    this.log.trace('finished sending data, channel state "%s"', this.channel.readyState);
  }
  async sendReset() {
    try {
      await this._sendFlag(Message.Flag.RESET);
    } catch (err) {
      this.log.error("failed to send reset - %e", err);
    } finally {
      this.channel.close();
    }
  }
  async sendCloseWrite(options) {
    if (this.channel.readyState !== "open") {
      this.receiveFinAck.resolve();
      return;
    }
    const sent = await this._sendFlag(Message.Flag.FIN);
    if (sent) {
      this.log.trace("awaiting FIN_ACK");
      try {
        await raceSignal2(this.receiveFinAck.promise, options?.signal, {
          errorMessage: "sending close-write was aborted before FIN_ACK was received",
          errorName: "FinAckNotReceivedError"
        });
      } catch (err) {
        this.log.error("failed to await FIN_ACK", err);
      }
    } else {
      this.log.trace("sending FIN failed, not awaiting FIN_ACK");
    }
    this.receiveFinAck.resolve();
  }
  async sendCloseRead() {
    if (this.channel.readyState !== "open") {
      return;
    }
    await this._sendFlag(Message.Flag.STOP_SENDING);
  }
  /**
   * Handle incoming
   */
  processIncomingProtobuf(buffer) {
    const message2 = Message.decode(buffer);
    if (message2.flag !== void 0) {
      this.log.trace('incoming flag %s, write status "%s", read status "%s"', message2.flag, this.writeStatus, this.readStatus);
      if (message2.flag === Message.Flag.FIN) {
        this.remoteCloseWrite();
        this.log.trace("sending FIN_ACK");
        void this._sendFlag(Message.Flag.FIN_ACK).catch((err) => {
          this.log.error("error sending FIN_ACK immediately", err);
        });
      }
      if (message2.flag === Message.Flag.RESET) {
        this.reset();
      }
      if (message2.flag === Message.Flag.STOP_SENDING) {
        this.remoteCloseRead();
      }
      if (message2.flag === Message.Flag.FIN_ACK) {
        this.log.trace("received FIN_ACK");
        this.receiveFinAck.resolve();
      }
    }
    if (this.readStatus === "ready") {
      return message2.message;
    }
  }
  async _sendFlag(flag) {
    if (this.channel.readyState !== "open") {
      this.log.trace('not sending flag %s because channel is "%s" and not "open"', flag.toString(), this.channel.readyState);
      return false;
    }
    this.log.trace("sending flag %s", flag.toString());
    const messageBuf = Message.encode({ flag });
    const prefixedBuf = encode6.single(messageBuf);
    try {
      await this._sendMessage(prefixedBuf, false);
      return true;
    } catch (err) {
      this.log.error("could not send flag %s - %e", flag.toString(), err);
    }
    return false;
  }
};
function createStream(options) {
  const { channel, direction, handshake } = options;
  return new WebRTCStream({
    ...options,
    id: `${channel.id}`,
    log: options.log.newScope(`${handshake === true ? "handshake" : direction}:${channel.id}`)
  });
}

// node_modules/@libp2p/webrtc/dist/src/muxer.js
var DataChannelMuxerFactory = class {
  protocol;
  /**
   * WebRTC Peer Connection
   */
  peerConnection;
  bufferedStreams = [];
  metrics;
  dataChannelOptions;
  components;
  log;
  constructor(components, init2) {
    this.components = components;
    this.peerConnection = init2.peerConnection;
    this.metrics = init2.metrics;
    this.protocol = init2.protocol ?? MUXER_PROTOCOL;
    this.dataChannelOptions = init2.dataChannelOptions ?? {};
    this.log = components.logger.forComponent("libp2p:webrtc:muxerfactory");
    this.peerConnection.ondatachannel = ({ channel }) => {
      this.log.trace('incoming early datachannel with channel id %d and label "%s"', channel.id);
      if (channel.label === "init") {
        this.log.trace("closing early init channel");
        channel.close();
        return;
      }
      const bufferedStream = {};
      const stream = createStream({
        channel,
        direction: "inbound",
        onEnd: (err) => {
          bufferedStream.onEnd(err);
        },
        log: this.log,
        ...this.dataChannelOptions
      });
      bufferedStream.stream = stream;
      bufferedStream.channel = channel;
      bufferedStream.onEnd = () => {
        this.bufferedStreams = this.bufferedStreams.filter((s2) => s2.stream.id !== stream.id);
      };
      this.bufferedStreams.push(bufferedStream);
    };
  }
  createStreamMuxer(init2) {
    return new DataChannelMuxer(this.components, {
      ...init2,
      peerConnection: this.peerConnection,
      dataChannelOptions: this.dataChannelOptions,
      metrics: this.metrics,
      streams: this.bufferedStreams,
      protocol: this.protocol
    });
  }
};
var DataChannelMuxer = class {
  init;
  /**
   * Array of streams in the data channel
   */
  streams;
  protocol;
  log;
  peerConnection;
  dataChannelOptions;
  metrics;
  logger;
  constructor(components, init2) {
    this.init = init2;
    this.log = init2.log?.newScope("muxer") ?? components.logger.forComponent("libp2p:webrtc:muxer");
    this.logger = components.logger;
    this.streams = init2.streams.map((s2) => s2.stream);
    this.peerConnection = init2.peerConnection;
    this.protocol = init2.protocol ?? MUXER_PROTOCOL;
    this.metrics = init2.metrics;
    this.dataChannelOptions = init2.dataChannelOptions ?? {};
    this.peerConnection.ondatachannel = ({ channel }) => {
      this.log.trace("incoming datachannel with channel id %d", channel.id);
      if (channel.label === "init") {
        this.log.trace("closing init channel");
        channel.close();
        return;
      }
      const id = channel.id;
      const stream = createStream({
        channel,
        direction: "inbound",
        onEnd: () => {
          this.#onStreamEnd(stream, channel);
          this.log("incoming channel %s ended", id);
        },
        log: this.log,
        ...this.dataChannelOptions
      });
      this.streams.push(stream);
      this.metrics?.increment({ incoming_stream: true });
      init2?.onIncomingStream?.(stream);
    };
    if (this.init.streams.length > 0) {
      queueMicrotask(() => {
        this.init.streams.forEach((bufferedStream) => {
          bufferedStream.onEnd = () => {
            this.log("incoming early channel %s ended with state %s", bufferedStream.channel.id, bufferedStream.channel.readyState);
            this.#onStreamEnd(bufferedStream.stream, bufferedStream.channel);
          };
          this.metrics?.increment({ incoming_stream: true });
          this.init?.onIncomingStream?.(bufferedStream.stream);
        });
      });
    }
  }
  #onStreamEnd(stream, channel) {
    this.log.trace("stream %s %s %s onEnd", stream.direction, stream.id, stream.protocol);
    drainAndClose(channel, `${stream.direction} ${stream.id} ${stream.protocol}`, this.dataChannelOptions.drainTimeout, {
      log: this.log
    });
    this.streams = this.streams.filter((s2) => s2.id !== stream.id);
    this.metrics?.increment({ stream_end: true });
    this.init?.onStreamEnd?.(stream);
  }
  /**
   * Gracefully close all tracked streams and stop the muxer
   */
  async close(options) {
    try {
      await Promise.all(this.streams.map(async (stream) => stream.close(options)));
    } catch (err) {
      this.abort(err);
    }
  }
  /**
   * Abort all tracked streams and stop the muxer
   */
  abort(err) {
    for (const stream of this.streams) {
      stream.abort(err);
    }
  }
  /**
   * The stream source, a no-op as the transport natively supports multiplexing
   */
  source = nopSource();
  /**
   * The stream destination, a no-op as the transport natively supports multiplexing
   */
  sink = nopSink;
  newStream() {
    const channel = this.peerConnection.createDataChannel("");
    const id = channel.id;
    this.log.trace("opened outgoing datachannel with channel id %s", id);
    const stream = createStream({
      channel,
      direction: "outbound",
      onEnd: () => {
        this.#onStreamEnd(stream, channel);
        this.log("outgoing channel %s ended", id);
      },
      log: this.log,
      ...this.dataChannelOptions
    });
    this.streams.push(stream);
    this.metrics?.increment({ outgoing_stream: true });
    return stream;
  }
};

// node_modules/@ipshipyard/node-datachannel/dist/esm/polyfill/RTCCertificate.mjs
var _expires;
var _fingerprints;
_expires = /* @__PURE__ */ new WeakMap();
_fingerprints = /* @__PURE__ */ new WeakMap();

// node_modules/@ipshipyard/node-datachannel/dist/esm/polyfill/Exception.mjs
var InvalidStateError = class extends DOMException {
  constructor(msg) {
    super(msg, "InvalidStateError");
  }
};
var OperationError = class extends DOMException {
  constructor(msg) {
    super(msg, "OperationError");
  }
};
var NotFoundError3 = class extends DOMException {
  constructor(msg) {
    super(msg, "NotFoundError");
  }
};
var InvalidAccessError = class extends DOMException {
  constructor(msg) {
    super(msg, "InvalidAccessError");
  }
};
var SyntaxError2 = class extends DOMException {
  constructor(msg) {
    super(msg, "SyntaxError");
  }
};

// node_modules/@ipshipyard/node-datachannel/dist/esm/polyfill/RTCDataChannel.mjs
var __defProp2 = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value2) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value: value2 }) : obj[key] = value2;
var __publicField = (obj, key, value2) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value2);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value2) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value2);
var __privateSet = (obj, member, value2, setter) => (__accessCheck(obj, member, "write to private field"), member.set(obj, value2), value2);
var _dataChannel;
var _readyState;
var _bufferedAmountLowThreshold;
var _binaryType;
var _maxPacketLifeTime;
var _maxRetransmits;
var _negotiated;
var _ordered;
var _closeRequested;
var RTCDataChannel = class extends EventTarget {
  constructor(dataChannel, opts = {}) {
    super();
    __privateAdd(this, _dataChannel);
    __privateAdd(this, _readyState);
    __privateAdd(this, _bufferedAmountLowThreshold);
    __privateAdd(this, _binaryType);
    __privateAdd(this, _maxPacketLifeTime);
    __privateAdd(this, _maxRetransmits);
    __privateAdd(this, _negotiated);
    __privateAdd(this, _ordered);
    __privateAdd(this, _closeRequested, false);
    __publicField(this, "onbufferedamountlow");
    __publicField(this, "onclose");
    __publicField(this, "onclosing");
    __publicField(this, "onerror");
    __publicField(this, "onmessage");
    __publicField(this, "onopen");
    __privateSet(this, _dataChannel, dataChannel);
    __privateSet(this, _binaryType, "blob");
    __privateSet(this, _readyState, __privateGet(this, _dataChannel).isOpen() ? "open" : "connecting");
    __privateSet(this, _bufferedAmountLowThreshold, 0);
    __privateSet(this, _maxPacketLifeTime, opts.maxPacketLifeTime || null);
    __privateSet(this, _maxRetransmits, opts.maxRetransmits || null);
    __privateSet(this, _negotiated, opts.negotiated || false);
    __privateSet(this, _ordered, opts.ordered || true);
    __privateGet(this, _dataChannel).onOpen(() => {
      __privateSet(this, _readyState, "open");
      this.dispatchEvent(new Event("open", {}));
    });
    __privateGet(this, _dataChannel).onClosed(() => {
      if (!__privateGet(this, _closeRequested)) {
        __privateSet(this, _readyState, "closing");
        this.dispatchEvent(new Event("closing"));
      }
      setImmediate(() => {
        __privateSet(this, _readyState, "closed");
        this.dispatchEvent(new Event("close"));
      });
    });
    __privateGet(this, _dataChannel).onError((msg) => {
      this.dispatchEvent(
        new globalThis.RTCErrorEvent("error", {
          error: new RTCError(
            {
              errorDetail: "data-channel-failure"
            },
            msg
          )
        })
      );
    });
    __privateGet(this, _dataChannel).onBufferedAmountLow(() => {
      this.dispatchEvent(new Event("bufferedamountlow"));
    });
    __privateGet(this, _dataChannel).onMessage((data) => {
      if (ArrayBuffer.isView(data)) {
        if (this.binaryType == "arraybuffer")
          data = data.buffer;
        else
          data = Buffer.from(data.buffer);
      }
      this.dispatchEvent(new MessageEvent("message", { data }));
    });
    this.addEventListener("message", (e2) => {
      if (this.onmessage)
        this.onmessage(e2);
    });
    this.addEventListener("bufferedamountlow", (e2) => {
      if (this.onbufferedamountlow)
        this.onbufferedamountlow(e2);
    });
    this.addEventListener("error", (e2) => {
      if (this.onerror)
        this.onerror(e2);
    });
    this.addEventListener("close", (e2) => {
      if (this.onclose)
        this.onclose(e2);
    });
    this.addEventListener("closing", (e2) => {
      if (this.onclosing)
        this.onclosing(e2);
    });
    this.addEventListener("open", (e2) => {
      if (this.onopen)
        this.onopen(e2);
    });
  }
  set binaryType(type) {
    if (type !== "blob" && type !== "arraybuffer") {
      throw new DOMException(
        "Failed to set the 'binaryType' property on 'RTCDataChannel': Unknown binary type : " + type,
        "TypeMismatchError"
      );
    }
    __privateSet(this, _binaryType, type);
  }
  get binaryType() {
    return __privateGet(this, _binaryType);
  }
  get bufferedAmount() {
    return __privateGet(this, _dataChannel).bufferedAmount();
  }
  get bufferedAmountLowThreshold() {
    return __privateGet(this, _bufferedAmountLowThreshold);
  }
  set bufferedAmountLowThreshold(value2) {
    const number = Number(value2) || 0;
    __privateSet(this, _bufferedAmountLowThreshold, number);
    __privateGet(this, _dataChannel).setBufferedAmountLowThreshold(number);
  }
  get id() {
    return __privateGet(this, _dataChannel).getId();
  }
  get label() {
    return __privateGet(this, _dataChannel).getLabel();
  }
  get maxPacketLifeTime() {
    return __privateGet(this, _maxPacketLifeTime);
  }
  get maxRetransmits() {
    return __privateGet(this, _maxRetransmits);
  }
  get negotiated() {
    return __privateGet(this, _negotiated);
  }
  get ordered() {
    return __privateGet(this, _ordered);
  }
  get protocol() {
    return __privateGet(this, _dataChannel).getProtocol();
  }
  get readyState() {
    return __privateGet(this, _readyState);
  }
  send(data) {
    if (__privateGet(this, _readyState) !== "open") {
      throw new InvalidStateError(
        "Failed to execute 'send' on 'RTCDataChannel': RTCDataChannel.readyState is not 'open'"
      );
    }
    if (typeof data === "string") {
      __privateGet(this, _dataChannel).sendMessage(data);
    } else if (data instanceof Blob) {
      data.arrayBuffer().then((ab) => {
        if (process?.versions?.bun) {
          __privateGet(this, _dataChannel).sendMessageBinary(Buffer.from(ab));
        } else {
          __privateGet(this, _dataChannel).sendMessageBinary(new Uint8Array(ab));
        }
      });
    } else if (data instanceof Uint8Array) {
      __privateGet(this, _dataChannel).sendMessageBinary(data);
    } else {
      if (process?.versions?.bun) {
        __privateGet(this, _dataChannel).sendMessageBinary(Buffer.from(data));
      } else {
        __privateGet(this, _dataChannel).sendMessageBinary(new Uint8Array(data));
      }
    }
  }
  close() {
    __privateSet(this, _closeRequested, true);
    setImmediate(() => {
      __privateGet(this, _dataChannel).close();
    });
  }
};
_dataChannel = /* @__PURE__ */ new WeakMap();
_readyState = /* @__PURE__ */ new WeakMap();
_bufferedAmountLowThreshold = /* @__PURE__ */ new WeakMap();
_binaryType = /* @__PURE__ */ new WeakMap();
_maxPacketLifeTime = /* @__PURE__ */ new WeakMap();
_maxRetransmits = /* @__PURE__ */ new WeakMap();
_negotiated = /* @__PURE__ */ new WeakMap();
_ordered = /* @__PURE__ */ new WeakMap();
_closeRequested = /* @__PURE__ */ new WeakMap();

// node_modules/@ipshipyard/node-datachannel/dist/esm/polyfill/RTCIceCandidate.mjs
var __typeError2 = (msg) => {
  throw TypeError(msg);
};
var __accessCheck2 = (obj, member, msg) => member.has(obj) || __typeError2("Cannot " + msg);
var __privateGet2 = (obj, member, getter) => (__accessCheck2(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd2 = (obj, member, value2) => member.has(obj) ? __typeError2("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value2);
var __privateSet2 = (obj, member, value2, setter) => (__accessCheck2(obj, member, "write to private field"), member.set(obj, value2), value2);
var _address;
var _candidate;
var _component;
var _foundation;
var _port;
var _priority;
var _protocol;
var _relatedAddress;
var _relatedPort;
var _sdpMLineIndex;
var _sdpMid;
var _tcpType;
var _type;
var _usernameFragment;
var RTCIceCandidate = class {
  constructor({ candidate, sdpMLineIndex, sdpMid, usernameFragment }) {
    __privateAdd2(this, _address);
    __privateAdd2(this, _candidate);
    __privateAdd2(this, _component);
    __privateAdd2(this, _foundation);
    __privateAdd2(this, _port);
    __privateAdd2(this, _priority);
    __privateAdd2(this, _protocol);
    __privateAdd2(this, _relatedAddress);
    __privateAdd2(this, _relatedPort);
    __privateAdd2(this, _sdpMLineIndex);
    __privateAdd2(this, _sdpMid);
    __privateAdd2(this, _tcpType);
    __privateAdd2(this, _type);
    __privateAdd2(this, _usernameFragment);
    if (sdpMLineIndex == null && sdpMid == null)
      throw new TypeError("At least one of sdpMLineIndex or sdpMid must be specified");
    __privateSet2(this, _candidate, candidate === null ? "null" : candidate ?? "");
    __privateSet2(this, _sdpMLineIndex, sdpMLineIndex ?? null);
    __privateSet2(this, _sdpMid, sdpMid ?? null);
    __privateSet2(this, _usernameFragment, usernameFragment ?? null);
    if (candidate) {
      const fields = candidate.split(" ");
      __privateSet2(this, _foundation, fields[0].replace("candidate:", ""));
      __privateSet2(this, _component, fields[1] == "1" ? "rtp" : "rtcp");
      __privateSet2(this, _protocol, fields[2]);
      __privateSet2(this, _priority, parseInt(fields[3], 10));
      __privateSet2(this, _address, fields[4]);
      __privateSet2(this, _port, parseInt(fields[5], 10));
      __privateSet2(this, _type, fields[7]);
      __privateSet2(this, _tcpType, null);
      __privateSet2(this, _relatedAddress, null);
      __privateSet2(this, _relatedPort, null);
      for (let i2 = 8; i2 < fields.length; i2++) {
        const field = fields[i2];
        if (field === "raddr") {
          __privateSet2(this, _relatedAddress, fields[i2 + 1]);
        } else if (field === "rport") {
          __privateSet2(this, _relatedPort, parseInt(fields[i2 + 1], 10));
        }
        if (__privateGet2(this, _protocol) === "tcp" && field === "tcptype") {
          __privateSet2(this, _tcpType, fields[i2 + 1]);
        }
      }
    }
  }
  get address() {
    return __privateGet2(this, _address) || null;
  }
  get candidate() {
    return __privateGet2(this, _candidate);
  }
  get component() {
    return __privateGet2(this, _component);
  }
  get foundation() {
    return __privateGet2(this, _foundation) || null;
  }
  get port() {
    return __privateGet2(this, _port) || null;
  }
  get priority() {
    return __privateGet2(this, _priority) || null;
  }
  get protocol() {
    return __privateGet2(this, _protocol) || null;
  }
  get relatedAddress() {
    return __privateGet2(this, _relatedAddress);
  }
  get relatedPort() {
    return __privateGet2(this, _relatedPort) || null;
  }
  get sdpMLineIndex() {
    return __privateGet2(this, _sdpMLineIndex);
  }
  get sdpMid() {
    return __privateGet2(this, _sdpMid);
  }
  get tcpType() {
    return __privateGet2(this, _tcpType);
  }
  get type() {
    return __privateGet2(this, _type) || null;
  }
  get usernameFragment() {
    return __privateGet2(this, _usernameFragment);
  }
  toJSON() {
    return {
      candidate: __privateGet2(this, _candidate),
      sdpMLineIndex: __privateGet2(this, _sdpMLineIndex),
      sdpMid: __privateGet2(this, _sdpMid),
      usernameFragment: __privateGet2(this, _usernameFragment)
    };
  }
};
_address = /* @__PURE__ */ new WeakMap();
_candidate = /* @__PURE__ */ new WeakMap();
_component = /* @__PURE__ */ new WeakMap();
_foundation = /* @__PURE__ */ new WeakMap();
_port = /* @__PURE__ */ new WeakMap();
_priority = /* @__PURE__ */ new WeakMap();
_protocol = /* @__PURE__ */ new WeakMap();
_relatedAddress = /* @__PURE__ */ new WeakMap();
_relatedPort = /* @__PURE__ */ new WeakMap();
_sdpMLineIndex = /* @__PURE__ */ new WeakMap();
_sdpMid = /* @__PURE__ */ new WeakMap();
_tcpType = /* @__PURE__ */ new WeakMap();
_type = /* @__PURE__ */ new WeakMap();
_usernameFragment = /* @__PURE__ */ new WeakMap();

// node_modules/@ipshipyard/node-datachannel/dist/esm/polyfill/RTCIceTransport.mjs
var __defProp3 = Object.defineProperty;
var __typeError3 = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp2 = (obj, key, value2) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value: value2 }) : obj[key] = value2;
var __publicField2 = (obj, key, value2) => __defNormalProp2(obj, typeof key !== "symbol" ? key + "" : key, value2);
var __accessCheck3 = (obj, member, msg) => member.has(obj) || __typeError3("Cannot " + msg);
var __privateGet3 = (obj, member, getter) => (__accessCheck3(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd3 = (obj, member, value2) => member.has(obj) ? __typeError3("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value2);
var __privateSet3 = (obj, member, value2, setter) => (__accessCheck3(obj, member, "write to private field"), member.set(obj, value2), value2);
var _pc;
var _extraFunctions;
var RTCIceTransport = class extends EventTarget {
  constructor(init2) {
    super();
    __privateAdd3(this, _pc, null);
    __privateAdd3(this, _extraFunctions, null);
    __publicField2(this, "ongatheringstatechange", null);
    __publicField2(this, "onselectedcandidatepairchange", null);
    __publicField2(this, "onstatechange", null);
    __privateSet3(this, _pc, init2.pc);
    __privateSet3(this, _extraFunctions, init2.extraFunctions);
    __privateGet3(this, _pc).addEventListener("icegatheringstatechange", () => {
      this.dispatchEvent(new Event("gatheringstatechange"));
    });
    __privateGet3(this, _pc).addEventListener("iceconnectionstatechange", () => {
      this.dispatchEvent(new Event("statechange"));
    });
    this.addEventListener("gatheringstatechange", (e2) => {
      if (this.ongatheringstatechange)
        this.ongatheringstatechange(e2);
    });
    this.addEventListener("statechange", (e2) => {
      if (this.onstatechange)
        this.onstatechange(e2);
    });
  }
  get component() {
    const cp = this.getSelectedCandidatePair();
    if (!cp)
      return null;
    return cp.local.component;
  }
  get gatheringState() {
    return __privateGet3(this, _pc) ? __privateGet3(this, _pc).iceGatheringState : "new";
  }
  get role() {
    return __privateGet3(this, _pc).localDescription.type == "offer" ? "controlling" : "controlled";
  }
  get state() {
    return __privateGet3(this, _pc) ? __privateGet3(this, _pc).iceConnectionState : "new";
  }
  getLocalCandidates() {
    return __privateGet3(this, _pc) ? __privateGet3(this, _extraFunctions).localCandidates() : [];
  }
  getLocalParameters() {
  }
  getRemoteCandidates() {
    return __privateGet3(this, _pc) ? __privateGet3(this, _extraFunctions).remoteCandidates() : [];
  }
  getRemoteParameters() {
  }
  getSelectedCandidatePair() {
    const cp = __privateGet3(this, _extraFunctions).selectedCandidatePair();
    if (!cp)
      return null;
    return {
      local: new RTCIceCandidate({
        candidate: cp.local.candidate,
        sdpMid: cp.local.mid
      }),
      remote: new RTCIceCandidate({
        candidate: cp.remote.candidate,
        sdpMid: cp.remote.mid
      })
    };
  }
};
_pc = /* @__PURE__ */ new WeakMap();
_extraFunctions = /* @__PURE__ */ new WeakMap();

// node_modules/@ipshipyard/node-datachannel/dist/esm/polyfill/RTCDtlsTransport.mjs
var __defProp4 = Object.defineProperty;
var __typeError4 = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp3 = (obj, key, value2) => key in obj ? __defProp4(obj, key, { enumerable: true, configurable: true, writable: true, value: value2 }) : obj[key] = value2;
var __publicField3 = (obj, key, value2) => __defNormalProp3(obj, typeof key !== "symbol" ? key + "" : key, value2);
var __accessCheck4 = (obj, member, msg) => member.has(obj) || __typeError4("Cannot " + msg);
var __privateGet4 = (obj, member, getter) => (__accessCheck4(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd4 = (obj, member, value2) => member.has(obj) ? __typeError4("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value2);
var __privateSet4 = (obj, member, value2, setter) => (__accessCheck4(obj, member, "write to private field"), member.set(obj, value2), value2);
var _pc2;
var _iceTransport;
var RTCDtlsTransport = class extends EventTarget {
  constructor(init2) {
    super();
    __privateAdd4(this, _pc2, null);
    __privateAdd4(this, _iceTransport, null);
    __publicField3(this, "onstatechange", null);
    __publicField3(this, "onerror", null);
    __privateSet4(this, _pc2, init2.pc);
    __privateSet4(this, _iceTransport, new RTCIceTransport({ pc: init2.pc, extraFunctions: init2.extraFunctions }));
    __privateGet4(this, _pc2).addEventListener("connectionstatechange", () => {
      this.dispatchEvent(new Event("statechange"));
    });
    this.addEventListener("statechange", (e2) => {
      if (this.onstatechange)
        this.onstatechange(e2);
    });
  }
  get iceTransport() {
    return __privateGet4(this, _iceTransport);
  }
  get state() {
    let state = __privateGet4(this, _pc2) ? __privateGet4(this, _pc2).connectionState : "new";
    if (state === "disconnected") {
      state = "closed";
    }
    return state;
  }
  getRemoteCertificates() {
    return [new ArrayBuffer(0)];
  }
};
_pc2 = /* @__PURE__ */ new WeakMap();
_iceTransport = /* @__PURE__ */ new WeakMap();

// node_modules/@ipshipyard/node-datachannel/dist/esm/lib/node-datachannel.mjs
var import_node_url = __toESM(require("node:url"), 1);
var import_node_path = __toESM(require("node:path"), 1);
var import_node_module = __toESM(require("node:module"), 1);
var import_meta = {};
var __filename = import_node_url.default.fileURLToPath(import_meta.url);
var __dirname = import_node_path.default.dirname(__filename);
var require2 = import_node_module.default.createRequire(import_meta.url);
var nodeDataChannel = require2("../../../build/Release/node_datachannel.node");

// node_modules/@ipshipyard/node-datachannel/dist/esm/lib/websocket-server.mjs
var _server;
var _clients;
_server = /* @__PURE__ */ new WeakMap();
_clients = /* @__PURE__ */ new WeakMap();

// node_modules/@ipshipyard/node-datachannel/dist/esm/lib/websocket.mjs
var WebSocket = nodeDataChannel.WebSocket;

// node_modules/@ipshipyard/node-datachannel/dist/esm/lib/index.mjs
var Audio = nodeDataChannel.Audio;
var Video = nodeDataChannel.Video;
var Track = nodeDataChannel.Track;
var DataChannel = nodeDataChannel.DataChannel;
var PeerConnection = nodeDataChannel.PeerConnection;
var IceUdpMuxListener = nodeDataChannel.IceUdpMuxListener;
var RtcpReceivingSession = nodeDataChannel.RtcpReceivingSession;

// node_modules/@ipshipyard/node-datachannel/dist/esm/polyfill/RTCSessionDescription.mjs
var __typeError5 = (msg) => {
  throw TypeError(msg);
};
var __accessCheck5 = (obj, member, msg) => member.has(obj) || __typeError5("Cannot " + msg);
var __privateGet5 = (obj, member, getter) => (__accessCheck5(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd5 = (obj, member, value2) => member.has(obj) ? __typeError5("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value2);
var __privateSet5 = (obj, member, value2, setter) => (__accessCheck5(obj, member, "write to private field"), member.set(obj, value2), value2);
var _type2;
var _sdp;
var RTCSessionDescription = class {
  constructor(init2) {
    __privateAdd5(this, _type2);
    __privateAdd5(this, _sdp);
    __privateSet5(this, _type2, init2 ? init2.type : null);
    __privateSet5(this, _sdp, init2 ? init2.sdp : null);
  }
  get type() {
    return __privateGet5(this, _type2);
  }
  get sdp() {
    return __privateGet5(this, _sdp);
  }
  toJSON() {
    return {
      sdp: __privateGet5(this, _sdp),
      type: __privateGet5(this, _type2)
    };
  }
};
_type2 = /* @__PURE__ */ new WeakMap();
_sdp = /* @__PURE__ */ new WeakMap();

// node_modules/@ipshipyard/node-datachannel/dist/esm/polyfill/Events.mjs
var __typeError6 = (msg) => {
  throw TypeError(msg);
};
var __accessCheck6 = (obj, member, msg) => member.has(obj) || __typeError6("Cannot " + msg);
var __privateGet6 = (obj, member, getter) => (__accessCheck6(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd6 = (obj, member, value2) => member.has(obj) ? __typeError6("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value2);
var __privateSet6 = (obj, member, value2, setter) => (__accessCheck6(obj, member, "write to private field"), member.set(obj, value2), value2);
var _candidate2;
var _channel;
var RTCPeerConnectionIceEvent = class extends Event {
  constructor(candidate) {
    super("icecandidate");
    __privateAdd6(this, _candidate2);
    __privateSet6(this, _candidate2, candidate);
  }
  get candidate() {
    return __privateGet6(this, _candidate2);
  }
};
_candidate2 = /* @__PURE__ */ new WeakMap();
var RTCDataChannelEvent = class extends Event {
  constructor(type, eventInitDict) {
    super(type);
    __privateAdd6(this, _channel);
    if (type && !eventInitDict.channel)
      throw new TypeError("channel member is required");
    __privateSet6(this, _channel, eventInitDict?.channel);
  }
  get channel() {
    return __privateGet6(this, _channel);
  }
};
_channel = /* @__PURE__ */ new WeakMap();

// node_modules/@ipshipyard/node-datachannel/dist/esm/polyfill/RTCSctpTransport.mjs
var __defProp5 = Object.defineProperty;
var __typeError7 = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp4 = (obj, key, value2) => key in obj ? __defProp5(obj, key, { enumerable: true, configurable: true, writable: true, value: value2 }) : obj[key] = value2;
var __publicField4 = (obj, key, value2) => __defNormalProp4(obj, key + "", value2);
var __accessCheck7 = (obj, member, msg) => member.has(obj) || __typeError7("Cannot " + msg);
var __privateGet7 = (obj, member, getter) => (__accessCheck7(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd7 = (obj, member, value2) => member.has(obj) ? __typeError7("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value2);
var __privateSet7 = (obj, member, value2, setter) => (__accessCheck7(obj, member, "write to private field"), member.set(obj, value2), value2);
var _pc3;
var _extraFunctions2;
var _transport;
var RTCSctpTransport = class extends EventTarget {
  constructor(initial) {
    super();
    __privateAdd7(this, _pc3, null);
    __privateAdd7(this, _extraFunctions2, null);
    __privateAdd7(this, _transport, null);
    __publicField4(this, "onstatechange", null);
    __privateSet7(this, _pc3, initial.pc);
    __privateSet7(this, _extraFunctions2, initial.extraFunctions);
    __privateSet7(this, _transport, new RTCDtlsTransport({ pc: initial.pc, extraFunctions: initial.extraFunctions }));
    __privateGet7(this, _pc3).addEventListener("connectionstatechange", () => {
      this.dispatchEvent(new Event("statechange"));
    });
    this.addEventListener("statechange", (e2) => {
      if (this.onstatechange)
        this.onstatechange(e2);
    });
  }
  get maxChannels() {
    if (this.state !== "connected")
      return null;
    return __privateGet7(this, _pc3) ? __privateGet7(this, _extraFunctions2).maxDataChannelId() : 0;
  }
  get maxMessageSize() {
    if (this.state !== "connected")
      return null;
    return __privateGet7(this, _pc3) ? __privateGet7(this, _extraFunctions2).maxMessageSize() : 0;
  }
  get state() {
    let state = __privateGet7(this, _pc3).connectionState;
    if (state === "new" || state === "connecting") {
      state = "connecting";
    } else if (state === "disconnected" || state === "failed" || state === "closed") {
      state = "closed";
    }
    return state;
  }
  get transport() {
    return __privateGet7(this, _transport);
  }
};
_pc3 = /* @__PURE__ */ new WeakMap();
_extraFunctions2 = /* @__PURE__ */ new WeakMap();
_transport = /* @__PURE__ */ new WeakMap();

// node_modules/@ipshipyard/node-datachannel/dist/esm/polyfill/RTCPeerConnection.mjs
var __defProp6 = Object.defineProperty;
var __typeError8 = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp5 = (obj, key, value2) => key in obj ? __defProp6(obj, key, { enumerable: true, configurable: true, writable: true, value: value2 }) : obj[key] = value2;
var __publicField5 = (obj, key, value2) => __defNormalProp5(obj, typeof key !== "symbol" ? key + "" : key, value2);
var __accessCheck8 = (obj, member, msg) => member.has(obj) || __typeError8("Cannot " + msg);
var __privateGet8 = (obj, member, getter) => (__accessCheck8(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd8 = (obj, member, value2) => member.has(obj) ? __typeError8("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value2);
var __privateSet8 = (obj, member, value2, setter) => (__accessCheck8(obj, member, "write to private field"), member.set(obj, value2), value2);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value2) {
    __privateSet8(obj, member, value2);
  },
  get _() {
    return __privateGet8(obj, member, getter);
  }
});
var _peerConnection;
var _localOffer;
var _localAnswer;
var _dataChannels;
var _dataChannelsClosed;
var _config;
var _canTrickleIceCandidates;
var _sctp;
var _localCandidates;
var _remoteCandidates;
var RTCPeerConnection = class extends EventTarget {
  constructor(config = { iceServers: [], iceTransportPolicy: "all" }) {
    super();
    __privateAdd8(this, _peerConnection);
    __privateAdd8(this, _localOffer);
    __privateAdd8(this, _localAnswer);
    __privateAdd8(this, _dataChannels);
    __privateAdd8(this, _dataChannelsClosed, 0);
    __privateAdd8(this, _config);
    __privateAdd8(this, _canTrickleIceCandidates);
    __privateAdd8(this, _sctp);
    __privateAdd8(this, _localCandidates, []);
    __privateAdd8(this, _remoteCandidates, []);
    __publicField5(this, "onconnectionstatechange");
    __publicField5(this, "ondatachannel");
    __publicField5(this, "onicecandidate");
    __publicField5(this, "onicecandidateerror");
    __publicField5(this, "oniceconnectionstatechange");
    __publicField5(this, "onicegatheringstatechange");
    __publicField5(this, "onnegotiationneeded");
    __publicField5(this, "onsignalingstatechange");
    __publicField5(this, "ontrack");
    this._checkConfiguration(config);
    __privateSet8(this, _config, config);
    __privateSet8(this, _localOffer, createDeferredPromise());
    __privateSet8(this, _localAnswer, createDeferredPromise());
    __privateSet8(this, _dataChannels, /* @__PURE__ */ new Set());
    __privateSet8(this, _canTrickleIceCandidates, null);
    try {
      const peerIdentity = config?.peerIdentity ?? `peer-${getRandomString(7)}`;
      __privateSet8(this, _peerConnection, config?.peerConnection ?? new PeerConnection(
        peerIdentity,
        {
          ...config,
          iceServers: config?.iceServers?.map((server) => {
            const urls = Array.isArray(server.urls) ? server.urls : [server.urls];
            return urls.map((url) => {
              if (server.username && server.credential) {
                const [protocol, rest] = url.split(/:(.*)/);
                return `${protocol}:${server.username}:${server.credential}@${rest}`;
              }
              return url;
            });
          }).flat() ?? []
        }
      ));
    } catch (error) {
      if (!error || !error.message)
        throw new NotFoundError3("Unknown error");
      throw new SyntaxError2(error.message);
    }
    __privateGet8(this, _peerConnection).onStateChange(() => {
      this.dispatchEvent(new Event("connectionstatechange"));
    });
    __privateGet8(this, _peerConnection).onIceStateChange(() => {
      this.dispatchEvent(new Event("iceconnectionstatechange"));
    });
    __privateGet8(this, _peerConnection).onSignalingStateChange(() => {
      this.dispatchEvent(new Event("signalingstatechange"));
    });
    __privateGet8(this, _peerConnection).onGatheringStateChange(() => {
      this.dispatchEvent(new Event("icegatheringstatechange"));
    });
    __privateGet8(this, _peerConnection).onDataChannel((channel) => {
      const dc = new RTCDataChannel(channel);
      __privateGet8(this, _dataChannels).add(dc);
      this.dispatchEvent(new RTCDataChannelEvent("datachannel", { channel: dc }));
    });
    __privateGet8(this, _peerConnection).onLocalDescription((sdp, type) => {
      if (type === "offer") {
        __privateGet8(this, _localOffer).resolve({ sdp, type });
      }
      if (type === "answer") {
        __privateGet8(this, _localAnswer).resolve({ sdp, type });
      }
    });
    __privateGet8(this, _peerConnection).onLocalCandidate((candidate, sdpMid) => {
      if (sdpMid === "unspec") {
        __privateGet8(this, _localAnswer).reject(new Error(`Invalid description type ${sdpMid}`));
        return;
      }
      __privateGet8(this, _localCandidates).push(new RTCIceCandidate({ candidate, sdpMid }));
      this.dispatchEvent(new RTCPeerConnectionIceEvent(new RTCIceCandidate({ candidate, sdpMid })));
    });
    this.addEventListener("connectionstatechange", (e2) => {
      if (this.onconnectionstatechange)
        this.onconnectionstatechange(e2);
    });
    this.addEventListener("signalingstatechange", (e2) => {
      if (this.onsignalingstatechange)
        this.onsignalingstatechange(e2);
    });
    this.addEventListener("iceconnectionstatechange", (e2) => {
      if (this.oniceconnectionstatechange)
        this.oniceconnectionstatechange(e2);
    });
    this.addEventListener("icegatheringstatechange", (e2) => {
      if (this.onicegatheringstatechange)
        this.onicegatheringstatechange(e2);
    });
    this.addEventListener("datachannel", (e2) => {
      if (this.ondatachannel)
        this.ondatachannel(e2);
    });
    this.addEventListener("icecandidate", (e2) => {
      if (this.onicecandidate)
        this.onicecandidate(e2);
    });
    __privateSet8(this, _sctp, new RTCSctpTransport({
      pc: this,
      extraFunctions: {
        maxDataChannelId: () => {
          return __privateGet8(this, _peerConnection).maxDataChannelId();
        },
        maxMessageSize: () => {
          return __privateGet8(this, _peerConnection).maxMessageSize();
        },
        localCandidates: () => {
          return __privateGet8(this, _localCandidates);
        },
        remoteCandidates: () => {
          return __privateGet8(this, _remoteCandidates);
        },
        selectedCandidatePair: () => {
          return __privateGet8(this, _peerConnection).getSelectedCandidatePair();
        }
      }
    }));
  }
  static async generateCertificate() {
    throw new DOMException("Not implemented");
  }
  _checkConfiguration(config) {
    if (config && config.iceServers === void 0)
      config.iceServers = [];
    if (config && config.iceTransportPolicy === void 0)
      config.iceTransportPolicy = "all";
    if (config?.iceServers === null)
      throw new TypeError("IceServers cannot be null");
    if (Array.isArray(config?.iceServers)) {
      for (let i2 = 0; i2 < config.iceServers.length; i2++) {
        if (config.iceServers[i2] === null)
          throw new TypeError("IceServers cannot be null");
        if (config.iceServers[i2] === void 0)
          throw new TypeError("IceServers cannot be undefined");
        if (Object.keys(config.iceServers[i2]).length === 0)
          throw new TypeError("IceServers cannot be empty");
        if (typeof config.iceServers[i2].urls === "string")
          config.iceServers[i2].urls = [config.iceServers[i2].urls];
        if (config.iceServers[i2].urls?.some((url) => url == ""))
          throw new SyntaxError2("IceServers urls cannot be empty");
        if (config.iceServers[i2].urls?.some(
          (url) => {
            try {
              const parsedURL = new URL(url);
              return !/^(stun:|turn:|turns:)$/.test(parsedURL.protocol);
            } catch (error) {
              return true;
            }
          }
        ))
          throw new SyntaxError2("IceServers urls wrong format");
        if (config.iceServers[i2].urls?.some((url) => url.startsWith("turn"))) {
          if (!config.iceServers[i2].username)
            throw new InvalidAccessError("IceServers username cannot be null");
          if (!config.iceServers[i2].credential)
            throw new InvalidAccessError("IceServers username cannot be undefined");
        }
        if (config.iceServers[i2].urls?.length === 0)
          throw new SyntaxError2("IceServers urls cannot be empty");
      }
    }
    if (config && config.iceTransportPolicy && config.iceTransportPolicy !== "all" && config.iceTransportPolicy !== "relay")
      throw new TypeError('IceTransportPolicy must be either "all" or "relay"');
  }
  setConfiguration(config) {
    this._checkConfiguration(config);
    __privateSet8(this, _config, config);
  }
  get canTrickleIceCandidates() {
    return __privateGet8(this, _canTrickleIceCandidates);
  }
  get connectionState() {
    return __privateGet8(this, _peerConnection).state();
  }
  get iceConnectionState() {
    let state = __privateGet8(this, _peerConnection).iceState();
    if (state == "completed")
      state = "connected";
    return state;
  }
  get iceGatheringState() {
    return __privateGet8(this, _peerConnection).gatheringState();
  }
  get currentLocalDescription() {
    return new RTCSessionDescription(__privateGet8(this, _peerConnection).localDescription());
  }
  get currentRemoteDescription() {
    return new RTCSessionDescription(__privateGet8(this, _peerConnection).remoteDescription());
  }
  get localDescription() {
    return new RTCSessionDescription(__privateGet8(this, _peerConnection).localDescription());
  }
  get pendingLocalDescription() {
    return new RTCSessionDescription(__privateGet8(this, _peerConnection).localDescription());
  }
  get pendingRemoteDescription() {
    return new RTCSessionDescription(__privateGet8(this, _peerConnection).remoteDescription());
  }
  get remoteDescription() {
    return new RTCSessionDescription(__privateGet8(this, _peerConnection).remoteDescription());
  }
  get sctp() {
    return __privateGet8(this, _sctp);
  }
  get signalingState() {
    return __privateGet8(this, _peerConnection).signalingState();
  }
  async addIceCandidate(candidate) {
    if (!candidate || !candidate.candidate) {
      return;
    }
    if (candidate.sdpMid === null && candidate.sdpMLineIndex === null) {
      throw new TypeError("sdpMid must be set");
    }
    if (candidate.sdpMid === void 0 && candidate.sdpMLineIndex == void 0) {
      throw new TypeError("sdpMid must be set");
    }
    if (candidate.sdpMid && candidate.sdpMid.length > 3) {
      throw new OperationError("Invalid sdpMid format");
    }
    if (!candidate.sdpMid && candidate.sdpMLineIndex > 1) {
      throw new OperationError("This is only for test case.");
    }
    try {
      __privateGet8(this, _peerConnection).addRemoteCandidate(candidate.candidate, candidate.sdpMid || "0");
      __privateGet8(this, _remoteCandidates).push(
        new RTCIceCandidate({ candidate: candidate.candidate, sdpMid: candidate.sdpMid || "0" })
      );
    } catch (error) {
      if (!error || !error.message)
        throw new NotFoundError3("Unknown error");
      if (error.message.includes("remote candidate without remote description"))
        throw new InvalidStateError(error.message);
      if (error.message.includes("Invalid candidate format"))
        throw new OperationError(error.message);
      throw new NotFoundError3(error.message);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addTrack(_track, ..._streams) {
    throw new DOMException("Not implemented");
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addTransceiver(_trackOrKind, _init) {
    throw new DOMException("Not implemented");
  }
  close() {
    __privateGet8(this, _dataChannels).forEach((channel) => {
      channel.close();
      __privateWrapper(this, _dataChannelsClosed)._++;
    });
    __privateGet8(this, _peerConnection).close();
  }
  createAnswer() {
    return __privateGet8(this, _localAnswer);
  }
  createDataChannel(label, opts = {}) {
    const channel = __privateGet8(this, _peerConnection).createDataChannel(label, opts);
    const dataChannel = new RTCDataChannel(channel, opts);
    __privateGet8(this, _dataChannels).add(dataChannel);
    dataChannel.addEventListener("close", () => {
      __privateGet8(this, _dataChannels).delete(dataChannel);
      __privateWrapper(this, _dataChannelsClosed)._++;
    });
    return dataChannel;
  }
  createOffer() {
    return __privateGet8(this, _localOffer);
  }
  getConfiguration() {
    return __privateGet8(this, _config);
  }
  getReceivers() {
    throw new DOMException("Not implemented");
  }
  getSenders() {
    throw new DOMException("Not implemented");
  }
  getStats() {
    return new Promise((resolve) => {
      const report = /* @__PURE__ */ new Map();
      const cp = __privateGet8(this, _peerConnection)?.getSelectedCandidatePair();
      const bytesSent = __privateGet8(this, _peerConnection)?.bytesSent();
      const bytesReceived = __privateGet8(this, _peerConnection)?.bytesReceived();
      const rtt = __privateGet8(this, _peerConnection)?.rtt();
      if (!cp) {
        return resolve(report);
      }
      const localIdRs = getRandomString(8);
      const localId = "RTCIceCandidate_" + localIdRs;
      report.set(localId, {
        id: localId,
        type: "local-candidate",
        timestamp: Date.now(),
        candidateType: cp.local.type,
        ip: cp.local.address,
        port: cp.local.port
      });
      const remoteIdRs = getRandomString(8);
      const remoteId = "RTCIceCandidate_" + remoteIdRs;
      report.set(remoteId, {
        id: remoteId,
        type: "remote-candidate",
        timestamp: Date.now(),
        candidateType: cp.remote.type,
        ip: cp.remote.address,
        port: cp.remote.port
      });
      const candidateId = "RTCIceCandidatePair_" + localIdRs + "_" + remoteIdRs;
      report.set(candidateId, {
        id: candidateId,
        type: "candidate-pair",
        timestamp: Date.now(),
        localCandidateId: localId,
        remoteCandidateId: remoteId,
        state: "succeeded",
        nominated: true,
        writable: true,
        bytesSent,
        bytesReceived,
        totalRoundTripTime: rtt,
        currentRoundTripTime: rtt
      });
      const transportId = "RTCTransport_0_1";
      report.set(transportId, {
        id: transportId,
        timestamp: Date.now(),
        type: "transport",
        bytesSent,
        bytesReceived,
        dtlsState: "connected",
        selectedCandidatePairId: candidateId,
        selectedCandidatePairChanges: 1
      });
      report.set("P", {
        id: "P",
        type: "peer-connection",
        timestamp: Date.now(),
        dataChannelsOpened: __privateGet8(this, _dataChannels).size,
        dataChannelsClosed: __privateGet8(this, _dataChannelsClosed)
      });
      return resolve(report);
    });
  }
  getTransceivers() {
    return [];
  }
  removeTrack() {
    throw new DOMException("Not implemented");
  }
  restartIce() {
    throw new DOMException("Not implemented");
  }
  async setLocalDescription(description) {
    if (description?.type !== "offer") {
      return;
    }
    __privateGet8(this, _peerConnection).setLocalDescription(description?.type);
  }
  async setRemoteDescription(description) {
    if (description.sdp == null) {
      throw new DOMException("Remote SDP must be set");
    }
    __privateGet8(this, _peerConnection).setRemoteDescription(description.sdp, description.type);
  }
};
_peerConnection = /* @__PURE__ */ new WeakMap();
_localOffer = /* @__PURE__ */ new WeakMap();
_localAnswer = /* @__PURE__ */ new WeakMap();
_dataChannels = /* @__PURE__ */ new WeakMap();
_dataChannelsClosed = /* @__PURE__ */ new WeakMap();
_config = /* @__PURE__ */ new WeakMap();
_canTrickleIceCandidates = /* @__PURE__ */ new WeakMap();
_sctp = /* @__PURE__ */ new WeakMap();
_localCandidates = /* @__PURE__ */ new WeakMap();
_remoteCandidates = /* @__PURE__ */ new WeakMap();
function createDeferredPromise() {
  let resolve, reject;
  const promise = new Promise(function(_resolve, _reject) {
    resolve = _resolve;
    reject = _reject;
  });
  promise.resolve = resolve;
  promise.reject = reject;
  return promise;
}
function getRandomString(length3) {
  return Math.random().toString(36).substring(2, 2 + length3);
}

// node_modules/@ipshipyard/node-datachannel/dist/esm/polyfill/RTCError.mjs
var _errorDetail;
var _receivedAlert;
var _sctpCauseCode;
var _sdpLineNumber;
var _sentAlert;
_errorDetail = /* @__PURE__ */ new WeakMap();
_receivedAlert = /* @__PURE__ */ new WeakMap();
_sctpCauseCode = /* @__PURE__ */ new WeakMap();
_sdpLineNumber = /* @__PURE__ */ new WeakMap();
_sentAlert = /* @__PURE__ */ new WeakMap();

// node_modules/it-protobuf-stream/dist/src/index.js
function pbStream(duplex, opts) {
  const lp = lpStream(duplex, opts);
  const W = {
    read: async (proto, options) => {
      const value2 = await lp.read(options);
      return proto.decode(value2);
    },
    write: async (message2, proto, options) => {
      await lp.write(proto.encode(message2), options);
    },
    writeV: async (messages2, proto, options) => {
      await lp.writeV(messages2.map((message2) => proto.encode(message2)), options);
    },
    pb: (proto) => {
      return {
        read: async (options) => W.read(proto, options),
        write: async (d2, options) => W.write(d2, proto, options),
        writeV: async (d2, options) => W.writeV(d2, proto, options),
        unwrap: () => W
      };
    },
    unwrap: () => {
      return lp.unwrap();
    }
  };
  return W;
}

// node_modules/@libp2p/webrtc/dist/src/error.js
var WebRTCTransportError = class extends Error {
  constructor(msg) {
    super(`WebRTC transport error: ${msg}`);
    this.name = "WebRTCTransportError";
  }
};
var SDPHandshakeFailedError = class extends WebRTCTransportError {
  constructor(message2 = "SDP handshake failed") {
    super(message2);
    this.name = "SDPHandshakeFailedError";
  }
};

// node_modules/@libp2p/webrtc/dist/src/private-to-private/pb/message.js
var Message2;
(function(Message3) {
  let Type;
  (function(Type2) {
    Type2["SDP_OFFER"] = "SDP_OFFER";
    Type2["SDP_ANSWER"] = "SDP_ANSWER";
    Type2["ICE_CANDIDATE"] = "ICE_CANDIDATE";
  })(Type = Message3.Type || (Message3.Type = {}));
  let __TypeValues;
  (function(__TypeValues2) {
    __TypeValues2[__TypeValues2["SDP_OFFER"] = 0] = "SDP_OFFER";
    __TypeValues2[__TypeValues2["SDP_ANSWER"] = 1] = "SDP_ANSWER";
    __TypeValues2[__TypeValues2["ICE_CANDIDATE"] = 2] = "ICE_CANDIDATE";
  })(__TypeValues || (__TypeValues = {}));
  (function(Type2) {
    Type2.codec = () => {
      return enumeration(__TypeValues);
    };
  })(Type = Message3.Type || (Message3.Type = {}));
  let _codec;
  Message3.codec = () => {
    if (_codec == null) {
      _codec = message((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork();
        }
        if (obj.type != null) {
          w.uint32(8);
          Message3.Type.codec().encode(obj.type, w);
        }
        if (obj.data != null) {
          w.uint32(18);
          w.string(obj.data);
        }
        if (opts.lengthDelimited !== false) {
          w.ldelim();
        }
      }, (reader, length3, opts = {}) => {
        const obj = {};
        const end = length3 == null ? reader.len : reader.pos + length3;
        while (reader.pos < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1: {
              obj.type = Message3.Type.codec().decode(reader);
              break;
            }
            case 2: {
              obj.data = reader.string();
              break;
            }
            default: {
              reader.skipType(tag & 7);
              break;
            }
          }
        }
        return obj;
      });
    }
    return _codec;
  };
  Message3.encode = (obj) => {
    return encodeMessage(obj, Message3.codec());
  };
  Message3.decode = (buf, opts) => {
    return decodeMessage(buf, Message3.codec(), opts);
  };
})(Message2 || (Message2 = {}));

// node_modules/@libp2p/webrtc/dist/src/private-to-private/util.js
var readCandidatesUntilConnected = async (pc, stream, options) => {
  try {
    const connectedPromise = pDefer();
    resolveOnConnected(pc, connectedPromise);
    while (true) {
      const message2 = await Promise.race([
        connectedPromise.promise,
        stream.read({
          signal: options.signal
        }).catch(() => {
        })
      ]);
      if (message2 == null) {
        options.signal?.throwIfAborted();
        break;
      }
      if (message2.type !== Message2.Type.ICE_CANDIDATE) {
        throw new InvalidMessageError("ICE candidate message expected");
      }
      const candidateInit = JSON.parse(message2.data ?? "null");
      if (candidateInit === "" || candidateInit === null) {
        options.onProgress?.(new CustomProgressEvent("webrtc:end-of-ice-candidates"));
        options.log.trace("end-of-candidates received");
        continue;
      }
      const candidate = new RTCIceCandidate(candidateInit);
      options.log.trace("%s received new ICE candidate %o", options.direction, candidateInit);
      try {
        options.onProgress?.(new CustomProgressEvent("webrtc:add-ice-candidate", candidate.candidate));
        await pc.addIceCandidate(candidate);
      } catch (err) {
        options.log.error("%s bad candidate received", options.direction, candidateInit, err);
      }
    }
  } catch (err) {
    options.log.error("%s error parsing ICE candidate", options.direction, err);
    if (options.signal?.aborted === true && getConnectionState(pc) !== "connected") {
      throw err;
    }
  }
};
function getConnectionState(pc) {
  return isFirefox ? pc.iceConnectionState : pc.connectionState;
}
function resolveOnConnected(pc, promise) {
  pc[isFirefox ? "oniceconnectionstatechange" : "onconnectionstatechange"] = (_) => {
    switch (getConnectionState(pc)) {
      case "connected":
        promise.resolve();
        break;
      case "failed":
      case "disconnected":
      case "closed":
        promise.reject(new ConnectionFailedError("RTCPeerConnection was closed"));
        break;
      default:
        break;
    }
  };
}

// node_modules/@libp2p/webrtc/dist/src/private-to-private/initiate-connection.js
async function initiateConnection({ rtcConfiguration, dataChannel, signal, metrics, multiaddr: ma, connectionManager, transportManager, log: log2, logger: logger2, onProgress }) {
  const { circuitAddress, targetPeer } = splitAddr(ma);
  metrics?.dialerEvents.increment({ open: true });
  log2.trace("dialing circuit address: %a", circuitAddress);
  const connections = connectionManager.getConnections(targetPeer);
  let connection;
  if (connections.length === 0) {
    onProgress?.(new CustomProgressEvent("webrtc:dial-relay"));
    connection = await transportManager.dial(circuitAddress, {
      signal,
      onProgress
    });
  } else {
    onProgress?.(new CustomProgressEvent("webrtc:reuse-relay-connection"));
    connection = connections[0];
  }
  onProgress?.(new CustomProgressEvent("webrtc:open-signaling-stream"));
  const stream = await connection.newStream(SIGNALING_PROTOCOL, {
    signal,
    runOnLimitedConnection: true
  });
  const messageStream = pbStream(stream).pb(Message2);
  const peerConnection = new RTCPeerConnection(rtcConfiguration);
  const muxerFactory = new DataChannelMuxerFactory({
    logger: logger2
  }, {
    peerConnection,
    dataChannelOptions: dataChannel
  });
  try {
    const channel = peerConnection.createDataChannel("init");
    peerConnection.onicecandidate = ({ candidate }) => {
      const data = JSON.stringify(candidate?.toJSON() ?? null);
      log2.trace("initiator sending ICE candidate %o", candidate);
      void messageStream.write({
        type: Message2.Type.ICE_CANDIDATE,
        data
      }, {
        signal
      }).catch((err) => {
        log2.error("error sending ICE candidate", err);
      });
    };
    peerConnection.onicecandidateerror = (event) => {
      log2.error("initiator ICE candidate error", event);
    };
    const offerSdp = await peerConnection.createOffer().catch((err) => {
      log2.error("could not execute createOffer", err);
      throw new SDPHandshakeFailedError("Failed to set createOffer");
    });
    log2.trace("initiator send SDP offer %s", offerSdp.sdp);
    onProgress?.(new CustomProgressEvent("webrtc:send-sdp-offer"));
    await messageStream.write({ type: Message2.Type.SDP_OFFER, data: offerSdp.sdp }, {
      signal
    });
    await peerConnection.setLocalDescription(offerSdp).catch((err) => {
      log2.error("could not execute setLocalDescription", err);
      throw new SDPHandshakeFailedError("Failed to set localDescription");
    });
    onProgress?.(new CustomProgressEvent("webrtc:read-sdp-answer"));
    log2.trace("initiator read SDP answer");
    const answerMessage = await messageStream.read({
      signal
    });
    if (answerMessage.type !== Message2.Type.SDP_ANSWER) {
      throw new SDPHandshakeFailedError("Remote should send an SDP answer");
    }
    log2.trace("initiator received SDP answer %s", answerMessage.data);
    const answerSdp = new RTCSessionDescription({ type: "answer", sdp: answerMessage.data });
    await peerConnection.setRemoteDescription(answerSdp).catch((err) => {
      log2.error("could not execute setRemoteDescription", err);
      throw new SDPHandshakeFailedError("Failed to set remoteDescription");
    });
    log2.trace("initiator read candidates until connected");
    onProgress?.(new CustomProgressEvent("webrtc:read-ice-candidates"));
    await readCandidatesUntilConnected(peerConnection, messageStream, {
      direction: "initiator",
      signal,
      log: log2,
      onProgress
    });
    log2.trace("initiator connected, closing init channel");
    channel.close();
    onProgress?.(new CustomProgressEvent("webrtc:close-signaling-stream"));
    log2.trace("closing signaling channel");
    await stream.close({
      signal
    });
    log2.trace("initiator connected to remote address %s", ma);
    return {
      remoteAddress: ma,
      peerConnection,
      muxerFactory
    };
  } catch (err) {
    log2.error("outgoing signaling error", err);
    peerConnection.close();
    stream.abort(err);
    throw err;
  } finally {
    peerConnection.onicecandidate = null;
    peerConnection.onicecandidateerror = null;
  }
}

// node_modules/@libp2p/webrtc/dist/src/private-to-private/listener.js
var Circuit2 = fmt(P2P.matchers[0], code2(CODE_P2P_CIRCUIT));
var WebRTCPeerListener = class _WebRTCPeerListener extends TypedEventEmitter {
  transportManager;
  shutdownController;
  events;
  constructor(components, init2) {
    super();
    this.transportManager = components.transportManager;
    this.events = components.events;
    this.shutdownController = init2.shutdownController;
    this.onTransportListening = this.onTransportListening.bind(this);
  }
  async listen() {
    this.events.addEventListener("transport:listening", this.onTransportListening);
  }
  onTransportListening(event) {
    const circuitAddresses = event.detail.getAddrs().filter((ma) => Circuit2.exactMatch(ma)).map((ma) => {
      return ma.encapsulate("/webrtc");
    });
    if (circuitAddresses.length > 0) {
      this.safeDispatchEvent("listening");
    }
  }
  getAddrs() {
    return this.transportManager.getListeners().filter((l2) => !(l2 instanceof _WebRTCPeerListener)).map((l2) => l2.getAddrs().filter((ma) => Circuit2.exactMatch(ma)).map((ma) => {
      return ma.encapsulate("/webrtc");
    })).flat();
  }
  updateAnnounceAddrs() {
  }
  async close() {
    this.events.removeEventListener("transport:listening", this.onTransportListening);
    this.shutdownController.abort();
    queueMicrotask(() => {
      this.safeDispatchEvent("close");
    });
  }
};

// node_modules/@libp2p/webrtc/dist/src/private-to-private/signaling-stream-handler.js
async function handleIncomingStream({ peerConnection, stream, signal, connection, log: log2 }) {
  log2.trace("new inbound signaling stream");
  const messageStream = pbStream(stream).pb(Message2);
  try {
    peerConnection.onicecandidate = ({ candidate }) => {
      const data = JSON.stringify(candidate?.toJSON() ?? null);
      log2.trace("recipient sending ICE candidate %s", data);
      messageStream.write({
        type: Message2.Type.ICE_CANDIDATE,
        data
      }, {
        signal
      }).catch((err) => {
        log2.error("error sending ICE candidate", err);
      });
    };
    log2.trace("recipient read SDP offer");
    const pbOffer = await messageStream.read({
      signal
    });
    if (pbOffer.type !== Message2.Type.SDP_OFFER) {
      throw new SDPHandshakeFailedError(`expected message type SDP_OFFER, received: ${pbOffer.type ?? "undefined"} `);
    }
    log2.trace("recipient received SDP offer %s", pbOffer.data);
    const offer = new RTCSessionDescription({
      type: "offer",
      sdp: pbOffer.data
    });
    await peerConnection.setRemoteDescription(offer).catch((err) => {
      log2.error("could not execute setRemoteDescription", err);
      throw new SDPHandshakeFailedError("Failed to set remoteDescription");
    });
    const answer = await peerConnection.createAnswer().catch((err) => {
      log2.error("could not execute createAnswer", err);
      throw new SDPHandshakeFailedError("Failed to create answer");
    });
    log2.trace("recipient send SDP answer %s", answer.sdp);
    await messageStream.write({ type: Message2.Type.SDP_ANSWER, data: answer.sdp }, {
      signal
    });
    await peerConnection.setLocalDescription(answer).catch((err) => {
      log2.error("could not execute setLocalDescription", err);
      throw new SDPHandshakeFailedError("Failed to set localDescription");
    });
    log2.trace("recipient read candidates until connected");
    await readCandidatesUntilConnected(peerConnection, messageStream, {
      direction: "recipient",
      signal,
      log: log2
    });
  } catch (err) {
    if (getConnectionState(peerConnection) !== "connected") {
      log2.error("error while handling signaling stream from peer %a", connection.remoteAddr, err);
      peerConnection.close();
      throw err;
    } else {
      log2("error while handling signaling stream from peer %a, ignoring as the RTCPeerConnection is already connected", connection.remoteAddr, err);
    }
  }
  const remoteAddress = multiaddr(`/webrtc/p2p/${connection.remoteAddr.getPeerId()}`);
  log2.trace("recipient connected to remote address %s", remoteAddress);
  return { remoteAddress };
}

// node_modules/@libp2p/webrtc/dist/src/private-to-private/transport.js
var WebRTCTransport = class {
  components;
  init;
  log;
  _started = false;
  metrics;
  shutdownController;
  constructor(components, init2 = {}) {
    this.components = components;
    this.init = init2;
    this.log = components.logger.forComponent("libp2p:webrtc");
    this.shutdownController = new AbortController();
    setMaxListeners(Infinity, this.shutdownController.signal);
    if (components.metrics != null) {
      this.metrics = {
        dialerEvents: components.metrics.registerCounterGroup("libp2p_webrtc_dialer_events_total", {
          label: "event",
          help: "Total count of WebRTC dialer events by type"
        }),
        listenerEvents: components.metrics.registerCounterGroup("libp2p_webrtc_listener_events_total", {
          label: "event",
          help: "Total count of WebRTC listener events by type"
        })
      };
    }
  }
  [transportSymbol] = true;
  [Symbol.toStringTag] = "@libp2p/webrtc";
  [serviceCapabilities] = [
    "@libp2p/transport"
  ];
  [serviceDependencies] = [
    "@libp2p/identify",
    "@libp2p/circuit-relay-v2-transport"
  ];
  isStarted() {
    return this._started;
  }
  async start() {
    await this.components.registrar.handle(SIGNALING_PROTOCOL, (data) => {
      const signal = this.components.upgrader.createInboundAbortSignal(this.shutdownController.signal);
      this._onProtocol(data, signal).catch((err) => {
        this.log.error("failed to handle incoming connect from %p", data.connection.remotePeer, err);
      }).finally(() => {
        signal.clear();
      });
    }, {
      runOnLimitedConnection: true
    });
    this._started = true;
  }
  async stop() {
    await this.components.registrar.unhandle(SIGNALING_PROTOCOL);
    this._started = false;
  }
  createListener(options) {
    return new WebRTCPeerListener(this.components, {
      shutdownController: this.shutdownController
    });
  }
  /**
   * Filter check for all Multiaddrs that this transport can listen on
   */
  listenFilter(multiaddrs) {
    return multiaddrs.filter(WebRTC.exactMatch);
  }
  /**
   * Filter check for all Multiaddrs that this transport can dial
   */
  dialFilter(multiaddrs) {
    return this.listenFilter(multiaddrs);
  }
  /*
   * dial connects to a remote via the circuit relay or any other protocol
   * and proceeds to upgrade to a webrtc connection.
   * multiaddr of the form: <multiaddr>/webrtc/p2p/<destination-peer>
   * For a circuit relay, this will be of the form
   * <relay address>/p2p/<relay-peer>/p2p-circuit/webrtc/p2p/<destination-peer>
  */
  async dial(ma, options) {
    this.log.trace("dialing address: %a", ma);
    const { remoteAddress, peerConnection, muxerFactory } = await initiateConnection({
      rtcConfiguration: await getRtcConfiguration(this.init.rtcConfiguration),
      dataChannel: this.init.dataChannel,
      multiaddr: ma,
      dataChannelOptions: this.init.dataChannel,
      signal: options.signal,
      connectionManager: this.components.connectionManager,
      transportManager: this.components.transportManager,
      log: this.log,
      logger: this.components.logger,
      onProgress: options.onProgress
    });
    const webRTCConn = new WebRTCMultiaddrConnection(this.components, {
      peerConnection,
      timeline: { open: Date.now() },
      remoteAddr: remoteAddress,
      metrics: this.metrics?.dialerEvents
    });
    const connection = await options.upgrader.upgradeOutbound(webRTCConn, {
      skipProtection: true,
      skipEncryption: true,
      muxerFactory,
      onProgress: options.onProgress,
      signal: options.signal
    });
    this._closeOnShutdown(peerConnection, webRTCConn);
    return connection;
  }
  async _onProtocol({ connection, stream }, signal) {
    const peerConnection = new RTCPeerConnection(await getRtcConfiguration(this.init.rtcConfiguration));
    const muxerFactory = new DataChannelMuxerFactory(this.components, {
      peerConnection,
      dataChannelOptions: this.init.dataChannel
    });
    try {
      const { remoteAddress } = await handleIncomingStream({
        peerConnection,
        connection,
        stream,
        signal,
        log: this.log
      });
      await stream.close({
        signal
      });
      const webRTCConn = new WebRTCMultiaddrConnection(this.components, {
        peerConnection,
        timeline: { open: (/* @__PURE__ */ new Date()).getTime() },
        remoteAddr: remoteAddress,
        metrics: this.metrics?.listenerEvents
      });
      await this.components.upgrader.upgradeInbound(webRTCConn, {
        skipEncryption: true,
        skipProtection: true,
        muxerFactory,
        signal
      });
      this._closeOnShutdown(peerConnection, webRTCConn);
    } catch (err) {
      this.log.error("incoming signaling error", err);
      peerConnection.close();
      stream.abort(err);
      throw err;
    }
  }
  _closeOnShutdown(pc, webRTCConn) {
    const shutDownListener = () => {
      webRTCConn.close().catch((err) => {
        this.log.error("could not close WebRTCMultiaddrConnection", err);
      });
    };
    this.shutdownController.signal.addEventListener("abort", shutDownListener);
    pc.addEventListener("close", () => {
      this.shutdownController.signal.removeEventListener("abort", shutDownListener);
    });
  }
};
function splitAddr(ma) {
  const target = ma.getComponents().filter(({ name: name3 }) => name3 === "p2p").map(({ value: value2 }) => value2).pop();
  if (target == null) {
    throw new InvalidParametersError2("Destination peer id was missing");
  }
  const circuitAddress = multiaddr(ma.getComponents().filter(({ name: name3 }) => name3 !== "webrtc"));
  return { circuitAddress, targetPeer: peerIdFromString(target) };
}

// node_modules/it-pair/dist/src/index.js
function pair() {
  const deferred = pDefer();
  let piped = false;
  return {
    sink: async (source) => {
      if (piped) {
        throw new Error("already piped");
      }
      piped = true;
      deferred.resolve(source);
    },
    source: async function* () {
      const source = await deferred.promise;
      yield* source;
    }()
  };
}

// node_modules/it-pair/dist/src/duplex.js
function duplexPair() {
  const a2 = pair();
  const b = pair();
  return [
    {
      source: a2.source,
      sink: b.sink
    },
    {
      source: b.source,
      sink: a2.sink
    }
  ];
}

// node_modules/it-pipe/dist/src/index.js
function pipe(first, ...rest) {
  if (first == null) {
    throw new Error("Empty pipeline");
  }
  if (isDuplex(first)) {
    const duplex = first;
    first = () => duplex.source;
  } else if (isIterable(first) || isAsyncIterable8(first)) {
    const source = first;
    first = () => source;
  }
  const fns = [first, ...rest];
  if (fns.length > 1) {
    if (isDuplex(fns[fns.length - 1])) {
      fns[fns.length - 1] = fns[fns.length - 1].sink;
    }
  }
  if (fns.length > 2) {
    for (let i2 = 1; i2 < fns.length - 1; i2++) {
      if (isDuplex(fns[i2])) {
        fns[i2] = duplexPipelineFn(fns[i2]);
      }
    }
  }
  return rawPipe(...fns);
}
var rawPipe = (...fns) => {
  let res;
  while (fns.length > 0) {
    res = fns.shift()(res);
  }
  return res;
};
var isAsyncIterable8 = (obj) => {
  return obj?.[Symbol.asyncIterator] != null;
};
var isIterable = (obj) => {
  return obj?.[Symbol.iterator] != null;
};
var isDuplex = (obj) => {
  if (obj == null) {
    return false;
  }
  return obj.sink != null && obj.source != null;
};
var duplexPipelineFn = (duplex) => {
  return (source) => {
    const p2 = duplex.sink(source);
    if (p2?.then != null) {
      const stream = pushable({
        objectMode: true
      });
      p2.then(() => {
        stream.end();
      }, (err) => {
        stream.end(err);
      });
      let sourceWrap;
      const source2 = duplex.source;
      if (isAsyncIterable8(source2)) {
        sourceWrap = async function* () {
          yield* source2;
          stream.end();
        };
      } else if (isIterable(source2)) {
        sourceWrap = function* () {
          yield* source2;
          stream.end();
        };
      } else {
        throw new Error("Unknown duplex source type - must be Iterable or AsyncIterable");
      }
      return src_default8(stream, sourceWrap());
    }
    return duplex.source;
  };
};

// node_modules/@chainsafe/libp2p-noise/dist/src/constants.js
var NOISE_MSG_MAX_LENGTH_BYTES = 65535;
var NOISE_MSG_MAX_LENGTH_BYTES_WITHOUT_TAG = NOISE_MSG_MAX_LENGTH_BYTES - 16;
var DUMP_SESSION_KEYS = Boolean(globalThis.process?.env?.DUMP_SESSION_KEYS);

// node_modules/@chainsafe/libp2p-noise/dist/src/crypto/index.js
var import_node_crypto3 = __toESM(require("node:crypto"), 1);
var import_as_chacha20poly1305 = __toESM(require_src(), 1);

// node_modules/@chainsafe/as-sha256/lib/alloc.js
var isNode = typeof process !== "undefined" && process.versions != null && process.versions.node != null;
var allocUnsafe2 = isNode ? _allocUnsafeNode : _allocUnsafe;
function _allocUnsafe(size = 0) {
  return new Uint8Array(size);
}
function _allocUnsafeNode(size = 0) {
  const out = Buffer.allocUnsafe(size);
  return new Uint8Array(out.buffer, out.byteOffset, out.byteLength);
}

// node_modules/@chainsafe/as-sha256/lib/wasmCode.js
var wasmCode = Uint8Array.from([0, 97, 115, 109, 1, 0, 0, 0, 1, 43, 8, 96, 2, 127, 127, 0, 96, 1, 127, 0, 96, 1, 127, 1, 127, 96, 2, 127, 127, 1, 127, 96, 0, 0, 96, 3, 127, 127, 127, 0, 96, 4, 127, 127, 127, 127, 0, 96, 3, 127, 127, 126, 0, 2, 13, 1, 3, 101, 110, 118, 5, 97, 98, 111, 114, 116, 0, 6, 3, 23, 22, 0, 0, 0, 0, 0, 7, 2, 3, 3, 2, 4, 5, 1, 2, 5, 0, 1, 1, 0, 1, 1, 4, 5, 3, 1, 0, 1, 6, 187, 1, 37, 127, 0, 65, 4, 11, 127, 0, 65, 128, 4, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 0, 65, 0, 11, 7, 169, 1, 13, 8, 72, 65, 83, 95, 83, 73, 77, 68, 3, 36, 22, 98, 97, 116, 99, 104, 72, 97, 115, 104, 52, 85, 105, 110, 116, 65, 114, 114, 97, 121, 54, 52, 115, 0, 17, 26, 98, 97, 116, 99, 104, 72, 97, 115, 104, 52, 72, 97, 115, 104, 79, 98, 106, 101, 99, 116, 73, 110, 112, 117, 116, 115, 0, 18, 12, 73, 78, 80, 85, 84, 95, 76, 69, 78, 71, 84, 72, 3, 1, 15, 80, 65, 82, 65, 76, 76, 69, 76, 95, 70, 65, 67, 84, 79, 82, 3, 0, 5, 105, 110, 112, 117, 116, 3, 30, 6, 111, 117, 116, 112, 117, 116, 3, 32, 4, 105, 110, 105, 116, 0, 11, 6, 117, 112, 100, 97, 116, 101, 0, 19, 5, 102, 105, 110, 97, 108, 0, 20, 6, 100, 105, 103, 101, 115, 116, 0, 21, 8, 100, 105, 103, 101, 115, 116, 54, 52, 0, 16, 6, 109, 101, 109, 111, 114, 121, 2, 0, 8, 1, 22, 12, 1, 18, 10, 153, 23, 22, 9, 0, 32, 0, 32, 1, 54, 2, 0, 11, 9, 0, 32, 0, 32, 1, 54, 2, 4, 11, 9, 0, 32, 0, 32, 1, 54, 2, 8, 11, 192, 1, 1, 4, 127, 32, 1, 40, 2, 0, 65, 124, 113, 34, 3, 65, 128, 2, 73, 4, 127, 32, 3, 65, 4, 118, 5, 65, 31, 65, 252, 255, 255, 255, 3, 32, 3, 32, 3, 65, 252, 255, 255, 255, 3, 79, 27, 34, 3, 103, 107, 34, 4, 65, 7, 107, 33, 2, 32, 3, 32, 4, 65, 4, 107, 118, 65, 16, 115, 11, 33, 3, 32, 1, 40, 2, 8, 33, 5, 32, 1, 40, 2, 4, 34, 4, 4, 64, 32, 4, 32, 5, 16, 3, 11, 32, 5, 4, 64, 32, 5, 32, 4, 16, 2, 11, 32, 1, 32, 0, 32, 2, 65, 4, 116, 32, 3, 106, 65, 2, 116, 106, 34, 1, 40, 2, 96, 70, 4, 64, 32, 1, 32, 5, 54, 2, 96, 32, 5, 69, 4, 64, 32, 0, 32, 2, 65, 2, 116, 106, 34, 1, 40, 2, 4, 65, 126, 32, 3, 119, 113, 33, 3, 32, 1, 32, 3, 54, 2, 4, 32, 3, 69, 4, 64, 32, 0, 32, 0, 40, 2, 0, 65, 126, 32, 2, 119, 113, 16, 1, 11, 11, 11, 11, 181, 2, 1, 5, 127, 32, 1, 40, 2, 0, 33, 3, 32, 1, 65, 4, 106, 32, 1, 40, 2, 0, 65, 124, 113, 106, 34, 4, 40, 2, 0, 34, 2, 65, 1, 113, 4, 64, 32, 0, 32, 4, 16, 4, 32, 1, 32, 3, 65, 4, 106, 32, 2, 65, 124, 113, 106, 34, 3, 16, 1, 32, 1, 65, 4, 106, 32, 1, 40, 2, 0, 65, 124, 113, 106, 34, 4, 40, 2, 0, 33, 2, 11, 32, 3, 65, 2, 113, 4, 64, 32, 1, 65, 4, 107, 40, 2, 0, 34, 1, 40, 2, 0, 33, 6, 32, 0, 32, 1, 16, 4, 32, 1, 32, 6, 65, 4, 106, 32, 3, 65, 124, 113, 106, 34, 3, 16, 1, 11, 32, 4, 32, 2, 65, 2, 114, 16, 1, 32, 4, 65, 4, 107, 32, 1, 54, 2, 0, 32, 0, 32, 3, 65, 124, 113, 34, 2, 65, 128, 2, 73, 4, 127, 32, 2, 65, 4, 118, 5, 65, 31, 65, 252, 255, 255, 255, 3, 32, 2, 32, 2, 65, 252, 255, 255, 255, 3, 79, 27, 34, 2, 103, 107, 34, 3, 65, 7, 107, 33, 5, 32, 2, 32, 3, 65, 4, 107, 118, 65, 16, 115, 11, 34, 2, 32, 5, 65, 4, 116, 106, 65, 2, 116, 106, 40, 2, 96, 33, 3, 32, 1, 65, 0, 16, 2, 32, 1, 32, 3, 16, 3, 32, 3, 4, 64, 32, 3, 32, 1, 16, 2, 11, 32, 0, 32, 5, 65, 4, 116, 32, 2, 106, 65, 2, 116, 106, 32, 1, 54, 2, 96, 32, 0, 32, 0, 40, 2, 0, 65, 1, 32, 5, 116, 114, 16, 1, 32, 0, 32, 5, 65, 2, 116, 106, 34, 0, 32, 0, 40, 2, 4, 65, 1, 32, 2, 116, 114, 54, 2, 4, 11, 130, 1, 1, 3, 127, 32, 1, 65, 19, 106, 65, 112, 113, 65, 4, 107, 33, 1, 32, 0, 40, 2, 160, 12, 34, 3, 4, 64, 32, 3, 32, 1, 65, 16, 107, 34, 5, 70, 4, 64, 32, 3, 40, 2, 0, 33, 4, 32, 5, 33, 1, 11, 11, 32, 2, 167, 65, 112, 113, 32, 1, 107, 34, 3, 65, 20, 73, 4, 64, 15, 11, 32, 1, 32, 4, 65, 2, 113, 32, 3, 65, 8, 107, 34, 3, 65, 1, 114, 114, 16, 1, 32, 1, 65, 0, 16, 2, 32, 1, 65, 0, 16, 3, 32, 1, 65, 4, 106, 32, 3, 106, 34, 3, 65, 2, 16, 1, 32, 0, 32, 3, 54, 2, 160, 12, 32, 0, 32, 1, 16, 5, 11, 29, 0, 32, 0, 65, 1, 65, 27, 32, 0, 103, 107, 116, 106, 65, 1, 107, 32, 0, 32, 0, 65, 254, 255, 255, 255, 1, 73, 27, 11, 142, 1, 1, 2, 127, 32, 1, 65, 128, 2, 73, 4, 127, 32, 1, 65, 4, 118, 5, 65, 31, 32, 1, 16, 7, 34, 1, 103, 107, 34, 3, 65, 7, 107, 33, 2, 32, 1, 32, 3, 65, 4, 107, 118, 65, 16, 115, 11, 33, 1, 32, 0, 32, 2, 65, 2, 116, 106, 40, 2, 4, 65, 127, 32, 1, 116, 113, 34, 1, 4, 127, 32, 0, 32, 1, 104, 32, 2, 65, 4, 116, 106, 65, 2, 116, 106, 40, 2, 96, 5, 32, 0, 40, 2, 0, 65, 127, 32, 2, 65, 1, 106, 116, 113, 34, 1, 4, 127, 32, 0, 32, 0, 32, 1, 104, 34, 0, 65, 2, 116, 106, 40, 2, 4, 104, 32, 0, 65, 4, 116, 106, 65, 2, 116, 106, 40, 2, 96, 5, 65, 0, 11, 11, 11, 148, 2, 1, 3, 127, 32, 1, 65, 252, 255, 255, 255, 3, 75, 4, 64, 65, 176, 14, 65, 176, 15, 65, 205, 3, 65, 29, 16, 0, 0, 11, 32, 0, 65, 12, 32, 1, 65, 19, 106, 65, 112, 113, 65, 4, 107, 32, 1, 65, 12, 77, 27, 34, 1, 16, 8, 34, 2, 69, 4, 64, 32, 1, 65, 128, 2, 79, 4, 127, 32, 1, 16, 7, 5, 32, 1, 11, 33, 2, 63, 0, 34, 3, 32, 2, 65, 4, 32, 0, 40, 2, 160, 12, 32, 3, 65, 16, 116, 65, 4, 107, 71, 116, 106, 65, 255, 255, 3, 106, 65, 128, 128, 124, 113, 65, 16, 118, 34, 2, 32, 2, 32, 3, 72, 27, 64, 0, 65, 0, 72, 4, 64, 32, 2, 64, 0, 65, 0, 72, 4, 64, 0, 11, 11, 32, 0, 32, 3, 65, 16, 116, 63, 0, 172, 66, 16, 134, 16, 6, 32, 0, 32, 1, 16, 8, 33, 2, 11, 32, 2, 40, 2, 0, 26, 32, 0, 32, 2, 16, 4, 32, 2, 40, 2, 0, 34, 3, 65, 124, 113, 32, 1, 107, 34, 4, 65, 16, 79, 4, 64, 32, 2, 32, 1, 32, 3, 65, 2, 113, 114, 16, 1, 32, 2, 65, 4, 106, 32, 1, 106, 34, 1, 32, 4, 65, 4, 107, 65, 1, 114, 16, 1, 32, 0, 32, 1, 16, 5, 5, 32, 2, 32, 3, 65, 126, 113, 16, 1, 32, 2, 65, 4, 106, 32, 2, 40, 2, 0, 65, 124, 113, 106, 34, 0, 32, 0, 40, 2, 0, 65, 125, 113, 16, 1, 11, 32, 2, 11, 169, 2, 1, 3, 127, 32, 0, 65, 252, 255, 255, 255, 3, 75, 4, 64, 65, 192, 13, 65, 240, 13, 65, 52, 65, 43, 16, 0, 0, 11, 32, 0, 65, 236, 255, 255, 255, 3, 75, 4, 64, 65, 176, 14, 65, 240, 14, 65, 253, 0, 65, 30, 16, 0, 0, 11, 35, 23, 69, 4, 64, 63, 0, 34, 2, 65, 0, 76, 4, 127, 65, 1, 32, 2, 107, 64, 0, 65, 0, 72, 5, 65, 0, 11, 4, 64, 0, 11, 65, 128, 16, 65, 0, 16, 1, 65, 160, 28, 65, 0, 54, 2, 0, 3, 64, 32, 1, 65, 23, 73, 4, 64, 32, 1, 65, 2, 116, 65, 128, 16, 106, 65, 0, 54, 2, 4, 65, 0, 33, 2, 3, 64, 32, 2, 65, 16, 73, 4, 64, 32, 1, 65, 4, 116, 32, 2, 106, 65, 2, 116, 65, 128, 16, 106, 65, 0, 54, 2, 96, 32, 2, 65, 1, 106, 33, 2, 12, 1, 11, 11, 32, 1, 65, 1, 106, 33, 1, 12, 1, 11, 11, 65, 128, 16, 65, 164, 28, 63, 0, 172, 66, 16, 134, 16, 6, 65, 128, 16, 36, 23, 11, 35, 23, 32, 0, 65, 16, 106, 16, 9, 34, 2, 65, 1, 54, 2, 12, 32, 2, 32, 0, 54, 2, 16, 35, 24, 34, 3, 40, 2, 8, 33, 1, 32, 2, 32, 3, 16, 2, 32, 2, 32, 1, 16, 3, 32, 1, 32, 2, 32, 1, 40, 2, 4, 65, 3, 113, 114, 16, 2, 32, 3, 32, 2, 16, 3, 35, 25, 32, 2, 40, 2, 0, 65, 124, 113, 65, 4, 106, 106, 36, 25, 32, 2, 65, 20, 106, 34, 1, 65, 0, 32, 0, 252, 11, 0, 32, 1, 11, 74, 0, 65, 231, 204, 167, 208, 6, 36, 4, 65, 133, 221, 158, 219, 123, 36, 5, 65, 242, 230, 187, 227, 3, 36, 6, 65, 186, 234, 191, 170, 122, 36, 7, 65, 255, 164, 185, 136, 5, 36, 8, 65, 140, 209, 149, 216, 121, 36, 9, 65, 171, 179, 143, 252, 1, 36, 10, 65, 153, 154, 131, 223, 5, 36, 11, 65, 0, 36, 34, 65, 0, 36, 35, 11, 233, 3, 1, 1, 127, 35, 4, 36, 12, 35, 5, 36, 13, 35, 6, 36, 14, 35, 7, 36, 15, 35, 8, 36, 16, 35, 9, 36, 17, 35, 10, 36, 18, 35, 11, 36, 19, 65, 0, 36, 20, 3, 64, 35, 20, 65, 16, 73, 4, 64, 32, 0, 35, 20, 65, 2, 116, 106, 32, 1, 35, 20, 32, 2, 108, 65, 2, 116, 34, 3, 65, 3, 106, 106, 45, 0, 0, 32, 1, 32, 3, 106, 45, 0, 0, 65, 24, 116, 32, 1, 32, 3, 65, 1, 106, 106, 45, 0, 0, 65, 16, 116, 114, 32, 1, 32, 3, 65, 2, 106, 106, 45, 0, 0, 65, 8, 116, 114, 114, 54, 2, 0, 35, 20, 65, 1, 106, 36, 20, 12, 1, 11, 11, 65, 16, 36, 20, 3, 64, 35, 20, 65, 192, 0, 73, 4, 64, 32, 0, 35, 20, 65, 2, 116, 106, 32, 0, 35, 20, 65, 16, 107, 65, 2, 116, 106, 40, 2, 0, 32, 0, 35, 20, 65, 7, 107, 65, 2, 116, 106, 40, 2, 0, 32, 0, 35, 20, 65, 2, 107, 65, 2, 116, 106, 40, 2, 0, 34, 1, 65, 17, 120, 32, 1, 65, 19, 120, 115, 32, 1, 65, 10, 118, 115, 106, 32, 0, 35, 20, 65, 15, 107, 65, 2, 116, 106, 40, 2, 0, 34, 1, 65, 7, 120, 32, 1, 65, 18, 120, 115, 32, 1, 65, 3, 118, 115, 106, 106, 54, 2, 0, 35, 20, 65, 1, 106, 36, 20, 12, 1, 11, 11, 65, 0, 36, 20, 3, 64, 35, 20, 65, 192, 0, 73, 4, 64, 32, 0, 35, 20, 65, 2, 116, 34, 1, 106, 40, 2, 0, 32, 1, 35, 2, 106, 40, 2, 0, 35, 19, 35, 16, 34, 1, 65, 6, 120, 32, 1, 65, 11, 120, 115, 32, 1, 65, 25, 120, 115, 106, 35, 16, 34, 1, 35, 17, 113, 35, 18, 32, 1, 65, 127, 115, 113, 115, 106, 106, 106, 36, 21, 35, 12, 34, 1, 65, 2, 120, 32, 1, 65, 13, 120, 115, 32, 1, 65, 22, 120, 115, 35, 13, 34, 1, 35, 14, 34, 2, 113, 32, 1, 35, 12, 34, 1, 113, 32, 1, 32, 2, 113, 115, 115, 106, 36, 22, 35, 18, 36, 19, 35, 17, 36, 18, 35, 16, 36, 17, 35, 15, 35, 21, 106, 36, 16, 35, 14, 36, 15, 35, 13, 36, 14, 35, 12, 36, 13, 35, 21, 35, 22, 106, 36, 12, 35, 20, 65, 1, 106, 36, 20, 12, 1, 11, 11, 35, 4, 35, 12, 106, 36, 4, 35, 5, 35, 13, 106, 36, 5, 35, 6, 35, 14, 106, 36, 6, 35, 7, 35, 15, 106, 36, 7, 35, 8, 35, 16, 106, 36, 8, 35, 9, 35, 17, 106, 36, 9, 35, 10, 35, 18, 106, 36, 10, 35, 11, 35, 19, 106, 36, 11, 11, 253, 1, 1, 2, 127, 35, 4, 36, 12, 35, 5, 36, 13, 35, 6, 36, 14, 35, 7, 36, 15, 35, 8, 36, 16, 35, 9, 36, 17, 35, 10, 36, 18, 35, 11, 36, 19, 65, 0, 36, 20, 3, 64, 35, 20, 65, 192, 0, 73, 4, 64, 32, 0, 35, 20, 65, 2, 116, 106, 40, 2, 0, 35, 19, 35, 16, 34, 1, 65, 6, 120, 32, 1, 65, 11, 120, 115, 32, 1, 65, 25, 120, 115, 106, 35, 16, 34, 1, 35, 17, 113, 35, 18, 32, 1, 65, 127, 115, 113, 115, 106, 106, 36, 21, 35, 12, 34, 1, 65, 2, 120, 32, 1, 65, 13, 120, 115, 32, 1, 65, 22, 120, 115, 35, 13, 34, 2, 35, 14, 34, 1, 113, 32, 2, 35, 12, 34, 2, 113, 32, 1, 32, 2, 113, 115, 115, 106, 36, 22, 35, 18, 36, 19, 35, 17, 36, 18, 35, 16, 36, 17, 35, 15, 35, 21, 106, 36, 16, 35, 14, 36, 15, 35, 13, 36, 14, 35, 12, 36, 13, 35, 21, 35, 22, 106, 36, 12, 35, 20, 65, 1, 106, 36, 20, 12, 1, 11, 11, 35, 4, 35, 12, 106, 36, 4, 35, 5, 35, 13, 106, 36, 5, 35, 6, 35, 14, 106, 36, 6, 35, 7, 35, 15, 106, 36, 7, 35, 8, 35, 16, 106, 36, 8, 35, 9, 35, 17, 106, 36, 9, 35, 10, 35, 18, 106, 36, 10, 35, 11, 35, 19, 106, 36, 11, 11, 25, 0, 32, 0, 65, 128, 254, 131, 120, 113, 65, 8, 119, 32, 0, 65, 255, 129, 252, 7, 113, 65, 8, 120, 114, 11, 88, 0, 16, 11, 35, 29, 32, 0, 32, 2, 16, 12, 35, 3, 16, 13, 32, 1, 35, 4, 16, 14, 54, 2, 0, 32, 1, 35, 5, 16, 14, 54, 2, 4, 32, 1, 35, 6, 16, 14, 54, 2, 8, 32, 1, 35, 7, 16, 14, 54, 2, 12, 32, 1, 35, 8, 16, 14, 54, 2, 16, 32, 1, 35, 9, 16, 14, 54, 2, 20, 32, 1, 35, 10, 16, 14, 54, 2, 24, 32, 1, 35, 11, 16, 14, 54, 2, 28, 11, 10, 0, 32, 0, 32, 1, 65, 1, 16, 15, 11, 42, 1, 1, 127, 3, 64, 32, 1, 65, 4, 72, 4, 64, 35, 31, 32, 1, 65, 6, 116, 106, 32, 0, 32, 1, 65, 5, 116, 106, 16, 16, 32, 1, 65, 1, 106, 33, 1, 12, 1, 11, 11, 11, 44, 1, 1, 127, 3, 64, 32, 1, 65, 4, 72, 4, 64, 35, 31, 32, 1, 65, 2, 116, 106, 32, 0, 32, 1, 65, 5, 116, 106, 65, 4, 16, 15, 32, 1, 65, 1, 106, 33, 1, 12, 1, 11, 11, 11, 178, 1, 1, 2, 127, 35, 35, 32, 1, 106, 36, 35, 35, 34, 4, 64, 65, 192, 0, 35, 34, 107, 34, 2, 32, 1, 76, 4, 64, 35, 27, 35, 34, 106, 32, 0, 32, 2, 252, 10, 0, 0, 35, 34, 32, 2, 106, 36, 34, 65, 192, 0, 35, 34, 107, 33, 2, 32, 1, 65, 192, 0, 35, 34, 107, 107, 33, 1, 35, 29, 35, 27, 65, 1, 16, 12, 65, 0, 36, 34, 5, 35, 27, 35, 34, 106, 32, 0, 32, 1, 252, 10, 0, 0, 35, 34, 32, 1, 106, 36, 34, 15, 11, 11, 3, 64, 32, 3, 32, 1, 65, 192, 0, 109, 72, 4, 64, 35, 29, 32, 0, 32, 2, 106, 65, 1, 16, 12, 32, 3, 65, 1, 106, 33, 3, 32, 2, 65, 64, 107, 33, 2, 12, 1, 11, 11, 32, 1, 65, 63, 113, 34, 1, 4, 64, 35, 27, 35, 34, 106, 32, 0, 32, 2, 106, 32, 1, 252, 10, 0, 0, 35, 34, 32, 1, 106, 36, 34, 11, 11, 235, 1, 1, 2, 127, 35, 27, 35, 34, 106, 65, 128, 1, 58, 0, 0, 35, 34, 65, 1, 106, 36, 34, 35, 34, 65, 56, 74, 4, 64, 35, 27, 35, 34, 106, 34, 1, 65, 192, 0, 35, 34, 107, 106, 33, 2, 3, 64, 32, 1, 32, 2, 73, 4, 64, 32, 1, 65, 0, 58, 0, 0, 32, 1, 65, 1, 106, 33, 1, 12, 1, 11, 11, 35, 29, 35, 27, 65, 1, 16, 12, 65, 0, 36, 34, 11, 35, 27, 35, 34, 106, 34, 1, 65, 56, 35, 34, 107, 106, 33, 2, 3, 64, 32, 1, 32, 2, 73, 4, 64, 32, 1, 65, 0, 58, 0, 0, 32, 1, 65, 1, 106, 33, 1, 12, 1, 11, 11, 35, 27, 35, 35, 65, 128, 128, 128, 128, 2, 109, 16, 14, 54, 2, 56, 35, 27, 35, 35, 65, 3, 116, 16, 14, 54, 2, 60, 35, 29, 35, 27, 65, 1, 16, 12, 32, 0, 35, 4, 16, 14, 54, 2, 0, 32, 0, 35, 5, 16, 14, 54, 2, 4, 32, 0, 35, 6, 16, 14, 54, 2, 8, 32, 0, 35, 7, 16, 14, 54, 2, 12, 32, 0, 35, 8, 16, 14, 54, 2, 16, 32, 0, 35, 9, 16, 14, 54, 2, 20, 32, 0, 35, 10, 16, 14, 54, 2, 24, 32, 0, 35, 11, 16, 14, 54, 2, 28, 11, 14, 0, 16, 11, 35, 31, 32, 0, 16, 19, 35, 33, 16, 20, 11, 82, 0, 65, 196, 10, 40, 2, 0, 36, 2, 65, 148, 13, 40, 2, 0, 36, 3, 65, 224, 15, 65, 224, 15, 16, 2, 65, 224, 15, 65, 224, 15, 16, 3, 65, 224, 15, 36, 24, 65, 192, 0, 16, 10, 36, 26, 35, 26, 36, 27, 65, 128, 8, 16, 10, 36, 28, 35, 28, 36, 29, 65, 128, 4, 16, 10, 36, 30, 35, 30, 36, 31, 65, 32, 16, 10, 36, 32, 35, 32, 36, 33, 11, 11, 253, 6, 18, 0, 65, 140, 8, 11, 2, 28, 1, 0, 65, 152, 8, 11, 136, 2, 1, 0, 0, 0, 0, 1, 0, 0, 152, 47, 138, 66, 145, 68, 55, 113, 207, 251, 192, 181, 165, 219, 181, 233, 91, 194, 86, 57, 241, 17, 241, 89, 164, 130, 63, 146, 213, 94, 28, 171, 152, 170, 7, 216, 1, 91, 131, 18, 190, 133, 49, 36, 195, 125, 12, 85, 116, 93, 190, 114, 254, 177, 222, 128, 167, 6, 220, 155, 116, 241, 155, 193, 193, 105, 155, 228, 134, 71, 190, 239, 198, 157, 193, 15, 204, 161, 12, 36, 111, 44, 233, 45, 170, 132, 116, 74, 220, 169, 176, 92, 218, 136, 249, 118, 82, 81, 62, 152, 109, 198, 49, 168, 200, 39, 3, 176, 199, 127, 89, 191, 243, 11, 224, 198, 71, 145, 167, 213, 81, 99, 202, 6, 103, 41, 41, 20, 133, 10, 183, 39, 56, 33, 27, 46, 252, 109, 44, 77, 19, 13, 56, 83, 84, 115, 10, 101, 187, 10, 106, 118, 46, 201, 194, 129, 133, 44, 114, 146, 161, 232, 191, 162, 75, 102, 26, 168, 112, 139, 75, 194, 163, 81, 108, 199, 25, 232, 146, 209, 36, 6, 153, 214, 133, 53, 14, 244, 112, 160, 106, 16, 22, 193, 164, 25, 8, 108, 55, 30, 76, 119, 72, 39, 181, 188, 176, 52, 179, 12, 28, 57, 74, 170, 216, 78, 79, 202, 156, 91, 243, 111, 46, 104, 238, 130, 143, 116, 111, 99, 165, 120, 20, 120, 200, 132, 8, 2, 199, 140, 250, 255, 190, 144, 235, 108, 80, 164, 247, 163, 249, 190, 242, 120, 113, 198, 0, 65, 172, 10, 11, 1, 44, 0, 65, 184, 10, 11, 21, 4, 0, 0, 0, 16, 0, 0, 0, 32, 4, 0, 0, 32, 4, 0, 0, 0, 1, 0, 0, 64, 0, 65, 220, 10, 11, 2, 28, 1, 0, 65, 232, 10, 11, 136, 2, 1, 0, 0, 0, 0, 1, 0, 0, 152, 47, 138, 194, 145, 68, 55, 113, 207, 251, 192, 181, 165, 219, 181, 233, 91, 194, 86, 57, 241, 17, 241, 89, 164, 130, 63, 146, 213, 94, 28, 171, 152, 170, 7, 216, 1, 91, 131, 18, 190, 133, 49, 36, 195, 125, 12, 85, 116, 93, 190, 114, 254, 177, 222, 128, 167, 6, 220, 155, 116, 243, 155, 193, 193, 105, 155, 100, 134, 71, 254, 240, 198, 237, 225, 15, 84, 242, 12, 36, 111, 52, 233, 79, 190, 132, 201, 108, 30, 65, 185, 97, 250, 136, 249, 22, 82, 81, 198, 242, 109, 90, 142, 168, 101, 252, 25, 176, 199, 158, 217, 185, 195, 49, 18, 154, 160, 234, 14, 231, 43, 35, 177, 253, 176, 62, 53, 199, 213, 186, 105, 48, 95, 109, 151, 203, 143, 17, 15, 90, 253, 238, 30, 220, 137, 182, 53, 10, 4, 122, 11, 222, 157, 202, 244, 88, 22, 91, 93, 225, 134, 62, 127, 0, 128, 137, 8, 55, 50, 234, 7, 165, 55, 149, 171, 111, 16, 97, 64, 23, 241, 214, 140, 13, 109, 59, 170, 205, 55, 190, 187, 192, 218, 59, 97, 131, 99, 163, 72, 219, 49, 233, 2, 11, 167, 92, 209, 111, 202, 250, 26, 82, 49, 132, 51, 49, 149, 26, 212, 110, 144, 120, 67, 109, 242, 145, 156, 195, 189, 171, 204, 158, 230, 160, 201, 181, 60, 182, 47, 83, 198, 65, 199, 210, 163, 126, 35, 7, 104, 75, 149, 164, 118, 29, 25, 76, 0, 65, 252, 12, 11, 1, 44, 0, 65, 136, 13, 11, 21, 4, 0, 0, 0, 16, 0, 0, 0, 112, 5, 0, 0, 112, 5, 0, 0, 0, 1, 0, 0, 64, 0, 65, 172, 13, 11, 1, 44, 0, 65, 184, 13, 11, 35, 2, 0, 0, 0, 28, 0, 0, 0, 73, 0, 110, 0, 118, 0, 97, 0, 108, 0, 105, 0, 100, 0, 32, 0, 108, 0, 101, 0, 110, 0, 103, 0, 116, 0, 104, 0, 65, 220, 13, 11, 1, 60, 0, 65, 232, 13, 11, 45, 2, 0, 0, 0, 38, 0, 0, 0, 126, 0, 108, 0, 105, 0, 98, 0, 47, 0, 97, 0, 114, 0, 114, 0, 97, 0, 121, 0, 98, 0, 117, 0, 102, 0, 102, 0, 101, 0, 114, 0, 46, 0, 116, 0, 115, 0, 65, 156, 14, 11, 1, 60, 0, 65, 168, 14, 11, 47, 2, 0, 0, 0, 40, 0, 0, 0, 65, 0, 108, 0, 108, 0, 111, 0, 99, 0, 97, 0, 116, 0, 105, 0, 111, 0, 110, 0, 32, 0, 116, 0, 111, 0, 111, 0, 32, 0, 108, 0, 97, 0, 114, 0, 103, 0, 101, 0, 65, 220, 14, 11, 1, 60, 0, 65, 232, 14, 11, 37, 2, 0, 0, 0, 30, 0, 0, 0, 126, 0, 108, 0, 105, 0, 98, 0, 47, 0, 114, 0, 116, 0, 47, 0, 116, 0, 99, 0, 109, 0, 115, 0, 46, 0, 116, 0, 115, 0, 65, 156, 15, 11, 1, 60, 0, 65, 168, 15, 11, 37, 2, 0, 0, 0, 30, 0, 0, 0, 126, 0, 108, 0, 105, 0, 98, 0, 47, 0, 114, 0, 116, 0, 47, 0, 116, 0, 108, 0, 115, 0, 102, 0, 46, 0, 116, 0, 115]);

// node_modules/@chainsafe/as-sha256/lib/wasmSimdCode.js
var wasmSimdCode = Uint8Array.from([0, 97, 115, 109, 1, 0, 0, 0, 1, 37, 7, 96, 2, 127, 127, 0, 96, 1, 127, 1, 127, 96, 2, 127, 127, 1, 127, 96, 1, 127, 0, 96, 0, 0, 96, 4, 127, 127, 127, 127, 0, 96, 3, 127, 127, 126, 0, 2, 13, 1, 3, 101, 110, 118, 5, 97, 98, 111, 114, 116, 0, 5, 3, 30, 29, 0, 0, 0, 0, 0, 6, 1, 2, 2, 2, 1, 2, 1, 1, 2, 4, 4, 1, 0, 3, 3, 4, 0, 0, 3, 3, 3, 0, 4, 5, 3, 1, 0, 1, 6, 227, 4, 61, 123, 1, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 123, 1, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 123, 1, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 123, 1, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 123, 1, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 123, 1, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 123, 1, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 123, 1, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 123, 1, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 123, 1, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 123, 1, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 123, 1, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 123, 1, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 123, 1, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 123, 1, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 123, 1, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 123, 1, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 123, 1, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 127, 1, 65, 0, 11, 123, 1, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 0, 65, 4, 11, 127, 0, 65, 128, 4, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 0, 65, 1, 11, 7, 169, 1, 13, 8, 72, 65, 83, 95, 83, 73, 77, 68, 3, 60, 22, 98, 97, 116, 99, 104, 72, 97, 115, 104, 52, 85, 105, 110, 116, 65, 114, 114, 97, 121, 54, 52, 115, 0, 20, 26, 98, 97, 116, 99, 104, 72, 97, 115, 104, 52, 72, 97, 115, 104, 79, 98, 106, 101, 99, 116, 73, 110, 112, 117, 116, 115, 0, 21, 12, 73, 78, 80, 85, 84, 95, 76, 69, 78, 71, 84, 72, 3, 28, 15, 80, 65, 82, 65, 76, 76, 69, 76, 95, 70, 65, 67, 84, 79, 82, 3, 27, 5, 105, 110, 112, 117, 116, 3, 54, 6, 111, 117, 116, 112, 117, 116, 3, 56, 4, 105, 110, 105, 116, 0, 22, 6, 117, 112, 100, 97, 116, 101, 0, 24, 5, 102, 105, 110, 97, 108, 0, 25, 6, 100, 105, 103, 101, 115, 116, 0, 26, 8, 100, 105, 103, 101, 115, 116, 54, 52, 0, 28, 6, 109, 101, 109, 111, 114, 121, 2, 0, 8, 1, 29, 12, 1, 38, 10, 243, 111, 29, 9, 0, 32, 0, 32, 1, 54, 2, 0, 11, 9, 0, 32, 0, 32, 1, 54, 2, 4, 11, 9, 0, 32, 0, 32, 1, 54, 2, 8, 11, 192, 1, 1, 4, 127, 32, 1, 40, 2, 0, 65, 124, 113, 34, 3, 65, 128, 2, 73, 4, 127, 32, 3, 65, 4, 118, 5, 65, 31, 65, 252, 255, 255, 255, 3, 32, 3, 32, 3, 65, 252, 255, 255, 255, 3, 79, 27, 34, 3, 103, 107, 34, 4, 65, 7, 107, 33, 2, 32, 3, 32, 4, 65, 4, 107, 118, 65, 16, 115, 11, 33, 3, 32, 1, 40, 2, 8, 33, 5, 32, 1, 40, 2, 4, 34, 4, 4, 64, 32, 4, 32, 5, 16, 3, 11, 32, 5, 4, 64, 32, 5, 32, 4, 16, 2, 11, 32, 1, 32, 0, 32, 2, 65, 4, 116, 32, 3, 106, 65, 2, 116, 106, 34, 1, 40, 2, 96, 70, 4, 64, 32, 1, 32, 5, 54, 2, 96, 32, 5, 69, 4, 64, 32, 0, 32, 2, 65, 2, 116, 106, 34, 1, 40, 2, 4, 65, 126, 32, 3, 119, 113, 33, 3, 32, 1, 32, 3, 54, 2, 4, 32, 3, 69, 4, 64, 32, 0, 32, 0, 40, 2, 0, 65, 126, 32, 2, 119, 113, 16, 1, 11, 11, 11, 11, 181, 2, 1, 5, 127, 32, 1, 40, 2, 0, 33, 3, 32, 1, 65, 4, 106, 32, 1, 40, 2, 0, 65, 124, 113, 106, 34, 4, 40, 2, 0, 34, 2, 65, 1, 113, 4, 64, 32, 0, 32, 4, 16, 4, 32, 1, 32, 3, 65, 4, 106, 32, 2, 65, 124, 113, 106, 34, 3, 16, 1, 32, 1, 65, 4, 106, 32, 1, 40, 2, 0, 65, 124, 113, 106, 34, 4, 40, 2, 0, 33, 2, 11, 32, 3, 65, 2, 113, 4, 64, 32, 1, 65, 4, 107, 40, 2, 0, 34, 1, 40, 2, 0, 33, 6, 32, 0, 32, 1, 16, 4, 32, 1, 32, 6, 65, 4, 106, 32, 3, 65, 124, 113, 106, 34, 3, 16, 1, 11, 32, 4, 32, 2, 65, 2, 114, 16, 1, 32, 4, 65, 4, 107, 32, 1, 54, 2, 0, 32, 0, 32, 3, 65, 124, 113, 34, 2, 65, 128, 2, 73, 4, 127, 32, 2, 65, 4, 118, 5, 65, 31, 65, 252, 255, 255, 255, 3, 32, 2, 32, 2, 65, 252, 255, 255, 255, 3, 79, 27, 34, 2, 103, 107, 34, 3, 65, 7, 107, 33, 5, 32, 2, 32, 3, 65, 4, 107, 118, 65, 16, 115, 11, 34, 2, 32, 5, 65, 4, 116, 106, 65, 2, 116, 106, 40, 2, 96, 33, 3, 32, 1, 65, 0, 16, 2, 32, 1, 32, 3, 16, 3, 32, 3, 4, 64, 32, 3, 32, 1, 16, 2, 11, 32, 0, 32, 5, 65, 4, 116, 32, 2, 106, 65, 2, 116, 106, 32, 1, 54, 2, 96, 32, 0, 32, 0, 40, 2, 0, 65, 1, 32, 5, 116, 114, 16, 1, 32, 0, 32, 5, 65, 2, 116, 106, 34, 0, 32, 0, 40, 2, 4, 65, 1, 32, 2, 116, 114, 54, 2, 4, 11, 130, 1, 1, 3, 127, 32, 1, 65, 19, 106, 65, 112, 113, 65, 4, 107, 33, 1, 32, 0, 40, 2, 160, 12, 34, 3, 4, 64, 32, 3, 32, 1, 65, 16, 107, 34, 5, 70, 4, 64, 32, 3, 40, 2, 0, 33, 4, 32, 5, 33, 1, 11, 11, 32, 2, 167, 65, 112, 113, 32, 1, 107, 34, 3, 65, 20, 73, 4, 64, 15, 11, 32, 1, 32, 4, 65, 2, 113, 32, 3, 65, 8, 107, 34, 3, 65, 1, 114, 114, 16, 1, 32, 1, 65, 0, 16, 2, 32, 1, 65, 0, 16, 3, 32, 1, 65, 4, 106, 32, 3, 106, 34, 3, 65, 2, 16, 1, 32, 0, 32, 3, 54, 2, 160, 12, 32, 0, 32, 1, 16, 5, 11, 29, 0, 32, 0, 65, 1, 65, 27, 32, 0, 103, 107, 116, 106, 65, 1, 107, 32, 0, 32, 0, 65, 254, 255, 255, 255, 1, 73, 27, 11, 142, 1, 1, 2, 127, 32, 1, 65, 128, 2, 73, 4, 127, 32, 1, 65, 4, 118, 5, 65, 31, 32, 1, 16, 7, 34, 1, 103, 107, 34, 3, 65, 7, 107, 33, 2, 32, 1, 32, 3, 65, 4, 107, 118, 65, 16, 115, 11, 33, 1, 32, 0, 32, 2, 65, 2, 116, 106, 40, 2, 4, 65, 127, 32, 1, 116, 113, 34, 1, 4, 127, 32, 0, 32, 1, 104, 32, 2, 65, 4, 116, 106, 65, 2, 116, 106, 40, 2, 96, 5, 32, 0, 40, 2, 0, 65, 127, 32, 2, 65, 1, 106, 116, 113, 34, 1, 4, 127, 32, 0, 32, 0, 32, 1, 104, 34, 0, 65, 2, 116, 106, 40, 2, 4, 104, 32, 0, 65, 4, 116, 106, 65, 2, 116, 106, 40, 2, 96, 5, 65, 0, 11, 11, 11, 148, 2, 1, 3, 127, 32, 1, 65, 252, 255, 255, 255, 3, 75, 4, 64, 65, 176, 14, 65, 176, 15, 65, 205, 3, 65, 29, 16, 0, 0, 11, 32, 0, 65, 12, 32, 1, 65, 19, 106, 65, 112, 113, 65, 4, 107, 32, 1, 65, 12, 77, 27, 34, 1, 16, 8, 34, 2, 69, 4, 64, 32, 1, 65, 128, 2, 79, 4, 127, 32, 1, 16, 7, 5, 32, 1, 11, 33, 2, 63, 0, 34, 3, 32, 2, 65, 4, 32, 0, 40, 2, 160, 12, 32, 3, 65, 16, 116, 65, 4, 107, 71, 116, 106, 65, 255, 255, 3, 106, 65, 128, 128, 124, 113, 65, 16, 118, 34, 2, 32, 2, 32, 3, 72, 27, 64, 0, 65, 0, 72, 4, 64, 32, 2, 64, 0, 65, 0, 72, 4, 64, 0, 11, 11, 32, 0, 32, 3, 65, 16, 116, 63, 0, 172, 66, 16, 134, 16, 6, 32, 0, 32, 1, 16, 8, 33, 2, 11, 32, 2, 40, 2, 0, 26, 32, 0, 32, 2, 16, 4, 32, 2, 40, 2, 0, 34, 3, 65, 124, 113, 32, 1, 107, 34, 4, 65, 16, 79, 4, 64, 32, 2, 32, 1, 32, 3, 65, 2, 113, 114, 16, 1, 32, 2, 65, 4, 106, 32, 1, 106, 34, 1, 32, 4, 65, 4, 107, 65, 1, 114, 16, 1, 32, 0, 32, 1, 16, 5, 5, 32, 2, 32, 3, 65, 126, 113, 16, 1, 32, 2, 65, 4, 106, 32, 2, 40, 2, 0, 65, 124, 113, 106, 34, 0, 32, 0, 40, 2, 0, 65, 125, 113, 16, 1, 11, 32, 2, 11, 133, 2, 1, 2, 127, 32, 0, 65, 236, 255, 255, 255, 3, 75, 4, 64, 65, 176, 14, 65, 240, 14, 65, 253, 0, 65, 30, 16, 0, 0, 11, 35, 20, 69, 4, 64, 63, 0, 34, 3, 65, 0, 76, 4, 127, 65, 1, 32, 3, 107, 64, 0, 65, 0, 72, 5, 65, 0, 11, 4, 64, 0, 11, 65, 208, 21, 65, 0, 16, 1, 65, 240, 33, 65, 0, 54, 2, 0, 3, 64, 32, 2, 65, 23, 73, 4, 64, 32, 2, 65, 2, 116, 65, 208, 21, 106, 65, 0, 54, 2, 4, 65, 0, 33, 3, 3, 64, 32, 3, 65, 16, 73, 4, 64, 32, 2, 65, 4, 116, 32, 3, 106, 65, 2, 116, 65, 208, 21, 106, 65, 0, 54, 2, 96, 32, 3, 65, 1, 106, 33, 3, 12, 1, 11, 11, 32, 2, 65, 1, 106, 33, 2, 12, 1, 11, 11, 65, 208, 21, 65, 244, 33, 63, 0, 172, 66, 16, 134, 16, 6, 65, 208, 21, 36, 20, 11, 35, 20, 32, 0, 65, 16, 106, 16, 9, 34, 2, 32, 1, 54, 2, 12, 32, 2, 32, 0, 54, 2, 16, 35, 21, 34, 0, 40, 2, 8, 33, 1, 32, 2, 32, 0, 16, 2, 32, 2, 32, 1, 16, 3, 32, 1, 32, 2, 32, 1, 40, 2, 4, 65, 3, 113, 114, 16, 2, 32, 0, 32, 2, 16, 3, 35, 22, 32, 2, 40, 2, 0, 65, 124, 113, 65, 4, 106, 106, 36, 22, 32, 2, 65, 20, 106, 11, 46, 1, 1, 127, 32, 0, 65, 252, 255, 255, 255, 3, 75, 4, 64, 65, 192, 13, 65, 240, 13, 65, 52, 65, 43, 16, 0, 0, 11, 32, 0, 65, 1, 16, 10, 34, 1, 65, 0, 32, 0, 252, 11, 0, 32, 1, 11, 41, 0, 32, 1, 32, 0, 40, 2, 12, 79, 4, 64, 65, 144, 16, 65, 208, 16, 65, 242, 0, 65, 42, 16, 0, 0, 11, 32, 0, 40, 2, 4, 32, 1, 65, 2, 116, 106, 40, 2, 0, 11, 181, 1, 1, 4, 127, 32, 0, 69, 4, 64, 65, 192, 18, 15, 11, 65, 0, 32, 0, 107, 32, 0, 32, 0, 65, 31, 118, 65, 1, 116, 34, 1, 27, 34, 0, 65, 10, 79, 65, 1, 106, 32, 0, 65, 144, 206, 0, 79, 65, 3, 106, 32, 0, 65, 232, 7, 79, 106, 32, 0, 65, 228, 0, 73, 27, 32, 0, 65, 192, 132, 61, 79, 65, 6, 106, 32, 0, 65, 128, 148, 235, 220, 3, 79, 65, 8, 106, 32, 0, 65, 128, 194, 215, 47, 79, 106, 32, 0, 65, 128, 173, 226, 4, 73, 27, 32, 0, 65, 160, 141, 6, 73, 27, 34, 2, 65, 1, 116, 32, 1, 106, 65, 2, 16, 10, 34, 3, 32, 1, 106, 33, 4, 3, 64, 32, 4, 32, 2, 65, 1, 107, 34, 2, 65, 1, 116, 106, 32, 0, 65, 10, 112, 65, 48, 106, 59, 1, 0, 32, 0, 65, 10, 110, 34, 0, 13, 0, 11, 32, 1, 4, 64, 32, 3, 65, 45, 59, 1, 0, 11, 32, 3, 11, 13, 0, 32, 0, 65, 20, 107, 40, 2, 16, 65, 1, 118, 11, 64, 1, 3, 127, 32, 0, 16, 14, 65, 1, 116, 34, 2, 32, 1, 16, 14, 65, 1, 116, 34, 3, 106, 34, 4, 69, 4, 64, 65, 160, 20, 15, 11, 32, 4, 65, 2, 16, 10, 34, 4, 32, 0, 32, 2, 252, 10, 0, 0, 32, 2, 32, 4, 106, 32, 1, 32, 3, 252, 10, 0, 0, 32, 4, 11, 145, 16, 2, 2, 127, 1, 123, 65, 224, 15, 65, 224, 15, 16, 2, 65, 224, 15, 65, 224, 15, 16, 3, 65, 224, 15, 36, 21, 65, 128, 8, 16, 11, 36, 23, 35, 23, 36, 24, 2, 64, 3, 64, 32, 0, 65, 192, 0, 72, 4, 64, 35, 24, 33, 1, 65, 192, 10, 32, 0, 16, 12, 253, 17, 33, 2, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 32, 0, 14, 64, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 67, 11, 32, 1, 32, 2, 253, 11, 4, 0, 12, 63, 11, 32, 1, 32, 2, 253, 11, 4, 16, 12, 62, 11, 32, 1, 32, 2, 253, 11, 4, 32, 12, 61, 11, 32, 1, 32, 2, 253, 11, 4, 48, 12, 60, 11, 32, 1, 32, 2, 253, 11, 4, 64, 12, 59, 11, 32, 1, 32, 2, 253, 11, 4, 80, 12, 58, 11, 32, 1, 32, 2, 253, 11, 4, 96, 12, 57, 11, 32, 1, 32, 2, 253, 11, 4, 112, 12, 56, 11, 32, 1, 32, 2, 253, 11, 4, 128, 1, 12, 55, 11, 32, 1, 32, 2, 253, 11, 4, 144, 1, 12, 54, 11, 32, 1, 32, 2, 253, 11, 4, 160, 1, 12, 53, 11, 32, 1, 32, 2, 253, 11, 4, 176, 1, 12, 52, 11, 32, 1, 32, 2, 253, 11, 4, 192, 1, 12, 51, 11, 32, 1, 32, 2, 253, 11, 4, 208, 1, 12, 50, 11, 32, 1, 32, 2, 253, 11, 4, 224, 1, 12, 49, 11, 32, 1, 32, 2, 253, 11, 4, 240, 1, 12, 48, 11, 32, 1, 32, 2, 253, 11, 4, 128, 2, 12, 47, 11, 32, 1, 32, 2, 253, 11, 4, 144, 2, 12, 46, 11, 32, 1, 32, 2, 253, 11, 4, 160, 2, 12, 45, 11, 32, 1, 32, 2, 253, 11, 4, 176, 2, 12, 44, 11, 32, 1, 32, 2, 253, 11, 4, 192, 2, 12, 43, 11, 32, 1, 32, 2, 253, 11, 4, 208, 2, 12, 42, 11, 32, 1, 32, 2, 253, 11, 4, 224, 2, 12, 41, 11, 32, 1, 32, 2, 253, 11, 4, 240, 2, 12, 40, 11, 32, 1, 32, 2, 253, 11, 4, 128, 3, 12, 39, 11, 32, 1, 32, 2, 253, 11, 4, 144, 3, 12, 38, 11, 32, 1, 32, 2, 253, 11, 4, 160, 3, 12, 37, 11, 32, 1, 32, 2, 253, 11, 4, 176, 3, 12, 36, 11, 32, 1, 32, 2, 253, 11, 4, 192, 3, 12, 35, 11, 32, 1, 32, 2, 253, 11, 4, 208, 3, 12, 34, 11, 32, 1, 32, 2, 253, 11, 4, 224, 3, 12, 33, 11, 32, 1, 32, 2, 253, 11, 4, 240, 3, 12, 32, 11, 32, 1, 32, 2, 253, 11, 4, 128, 4, 12, 31, 11, 32, 1, 32, 2, 253, 11, 4, 144, 4, 12, 30, 11, 32, 1, 32, 2, 253, 11, 4, 160, 4, 12, 29, 11, 32, 1, 32, 2, 253, 11, 4, 176, 4, 12, 28, 11, 32, 1, 32, 2, 253, 11, 4, 192, 4, 12, 27, 11, 32, 1, 32, 2, 253, 11, 4, 208, 4, 12, 26, 11, 32, 1, 32, 2, 253, 11, 4, 224, 4, 12, 25, 11, 32, 1, 32, 2, 253, 11, 4, 240, 4, 12, 24, 11, 32, 1, 32, 2, 253, 11, 4, 128, 5, 12, 23, 11, 32, 1, 32, 2, 253, 11, 4, 144, 5, 12, 22, 11, 32, 1, 32, 2, 253, 11, 4, 160, 5, 12, 21, 11, 32, 1, 32, 2, 253, 11, 4, 176, 5, 12, 20, 11, 32, 1, 32, 2, 253, 11, 4, 192, 5, 12, 19, 11, 32, 1, 32, 2, 253, 11, 4, 208, 5, 12, 18, 11, 32, 1, 32, 2, 253, 11, 4, 224, 5, 12, 17, 11, 32, 1, 32, 2, 253, 11, 4, 240, 5, 12, 16, 11, 32, 1, 32, 2, 253, 11, 4, 128, 6, 12, 15, 11, 32, 1, 32, 2, 253, 11, 4, 144, 6, 12, 14, 11, 32, 1, 32, 2, 253, 11, 4, 160, 6, 12, 13, 11, 32, 1, 32, 2, 253, 11, 4, 176, 6, 12, 12, 11, 32, 1, 32, 2, 253, 11, 4, 192, 6, 12, 11, 11, 32, 1, 32, 2, 253, 11, 4, 208, 6, 12, 10, 11, 32, 1, 32, 2, 253, 11, 4, 224, 6, 12, 9, 11, 32, 1, 32, 2, 253, 11, 4, 240, 6, 12, 8, 11, 32, 1, 32, 2, 253, 11, 4, 128, 7, 12, 7, 11, 32, 1, 32, 2, 253, 11, 4, 144, 7, 12, 6, 11, 32, 1, 32, 2, 253, 11, 4, 160, 7, 12, 5, 11, 32, 1, 32, 2, 253, 11, 4, 176, 7, 12, 4, 11, 32, 1, 32, 2, 253, 11, 4, 192, 7, 12, 3, 11, 32, 1, 32, 2, 253, 11, 4, 208, 7, 12, 2, 11, 32, 1, 32, 2, 253, 11, 4, 224, 7, 12, 1, 11, 32, 1, 32, 2, 253, 11, 4, 240, 7, 11, 32, 0, 65, 1, 106, 33, 0, 12, 1, 11, 11, 65, 128, 8, 16, 11, 36, 25, 35, 25, 36, 26, 65, 0, 33, 0, 3, 64, 32, 0, 65, 192, 0, 72, 4, 64, 35, 26, 33, 1, 65, 144, 13, 32, 0, 16, 12, 253, 17, 33, 2, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 32, 0, 14, 64, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 67, 11, 32, 1, 32, 2, 253, 11, 4, 0, 12, 63, 11, 32, 1, 32, 2, 253, 11, 4, 16, 12, 62, 11, 32, 1, 32, 2, 253, 11, 4, 32, 12, 61, 11, 32, 1, 32, 2, 253, 11, 4, 48, 12, 60, 11, 32, 1, 32, 2, 253, 11, 4, 64, 12, 59, 11, 32, 1, 32, 2, 253, 11, 4, 80, 12, 58, 11, 32, 1, 32, 2, 253, 11, 4, 96, 12, 57, 11, 32, 1, 32, 2, 253, 11, 4, 112, 12, 56, 11, 32, 1, 32, 2, 253, 11, 4, 128, 1, 12, 55, 11, 32, 1, 32, 2, 253, 11, 4, 144, 1, 12, 54, 11, 32, 1, 32, 2, 253, 11, 4, 160, 1, 12, 53, 11, 32, 1, 32, 2, 253, 11, 4, 176, 1, 12, 52, 11, 32, 1, 32, 2, 253, 11, 4, 192, 1, 12, 51, 11, 32, 1, 32, 2, 253, 11, 4, 208, 1, 12, 50, 11, 32, 1, 32, 2, 253, 11, 4, 224, 1, 12, 49, 11, 32, 1, 32, 2, 253, 11, 4, 240, 1, 12, 48, 11, 32, 1, 32, 2, 253, 11, 4, 128, 2, 12, 47, 11, 32, 1, 32, 2, 253, 11, 4, 144, 2, 12, 46, 11, 32, 1, 32, 2, 253, 11, 4, 160, 2, 12, 45, 11, 32, 1, 32, 2, 253, 11, 4, 176, 2, 12, 44, 11, 32, 1, 32, 2, 253, 11, 4, 192, 2, 12, 43, 11, 32, 1, 32, 2, 253, 11, 4, 208, 2, 12, 42, 11, 32, 1, 32, 2, 253, 11, 4, 224, 2, 12, 41, 11, 32, 1, 32, 2, 253, 11, 4, 240, 2, 12, 40, 11, 32, 1, 32, 2, 253, 11, 4, 128, 3, 12, 39, 11, 32, 1, 32, 2, 253, 11, 4, 144, 3, 12, 38, 11, 32, 1, 32, 2, 253, 11, 4, 160, 3, 12, 37, 11, 32, 1, 32, 2, 253, 11, 4, 176, 3, 12, 36, 11, 32, 1, 32, 2, 253, 11, 4, 192, 3, 12, 35, 11, 32, 1, 32, 2, 253, 11, 4, 208, 3, 12, 34, 11, 32, 1, 32, 2, 253, 11, 4, 224, 3, 12, 33, 11, 32, 1, 32, 2, 253, 11, 4, 240, 3, 12, 32, 11, 32, 1, 32, 2, 253, 11, 4, 128, 4, 12, 31, 11, 32, 1, 32, 2, 253, 11, 4, 144, 4, 12, 30, 11, 32, 1, 32, 2, 253, 11, 4, 160, 4, 12, 29, 11, 32, 1, 32, 2, 253, 11, 4, 176, 4, 12, 28, 11, 32, 1, 32, 2, 253, 11, 4, 192, 4, 12, 27, 11, 32, 1, 32, 2, 253, 11, 4, 208, 4, 12, 26, 11, 32, 1, 32, 2, 253, 11, 4, 224, 4, 12, 25, 11, 32, 1, 32, 2, 253, 11, 4, 240, 4, 12, 24, 11, 32, 1, 32, 2, 253, 11, 4, 128, 5, 12, 23, 11, 32, 1, 32, 2, 253, 11, 4, 144, 5, 12, 22, 11, 32, 1, 32, 2, 253, 11, 4, 160, 5, 12, 21, 11, 32, 1, 32, 2, 253, 11, 4, 176, 5, 12, 20, 11, 32, 1, 32, 2, 253, 11, 4, 192, 5, 12, 19, 11, 32, 1, 32, 2, 253, 11, 4, 208, 5, 12, 18, 11, 32, 1, 32, 2, 253, 11, 4, 224, 5, 12, 17, 11, 32, 1, 32, 2, 253, 11, 4, 240, 5, 12, 16, 11, 32, 1, 32, 2, 253, 11, 4, 128, 6, 12, 15, 11, 32, 1, 32, 2, 253, 11, 4, 144, 6, 12, 14, 11, 32, 1, 32, 2, 253, 11, 4, 160, 6, 12, 13, 11, 32, 1, 32, 2, 253, 11, 4, 176, 6, 12, 12, 11, 32, 1, 32, 2, 253, 11, 4, 192, 6, 12, 11, 11, 32, 1, 32, 2, 253, 11, 4, 208, 6, 12, 10, 11, 32, 1, 32, 2, 253, 11, 4, 224, 6, 12, 9, 11, 32, 1, 32, 2, 253, 11, 4, 240, 6, 12, 8, 11, 32, 1, 32, 2, 253, 11, 4, 128, 7, 12, 7, 11, 32, 1, 32, 2, 253, 11, 4, 144, 7, 12, 6, 11, 32, 1, 32, 2, 253, 11, 4, 160, 7, 12, 5, 11, 32, 1, 32, 2, 253, 11, 4, 176, 7, 12, 4, 11, 32, 1, 32, 2, 253, 11, 4, 192, 7, 12, 3, 11, 32, 1, 32, 2, 253, 11, 4, 208, 7, 12, 2, 11, 32, 1, 32, 2, 253, 11, 4, 224, 7, 12, 1, 11, 32, 1, 32, 2, 253, 11, 4, 240, 7, 11, 32, 0, 65, 1, 106, 33, 0, 12, 1, 11, 11, 15, 11, 65, 192, 19, 32, 0, 16, 13, 16, 15, 65, 192, 20, 65, 201, 1, 65, 7, 16, 0, 0, 11, 192, 10, 2, 2, 123, 2, 127, 35, 0, 36, 8, 35, 1, 36, 9, 35, 2, 36, 10, 35, 3, 36, 11, 35, 4, 36, 12, 35, 5, 36, 13, 35, 6, 36, 14, 35, 7, 36, 15, 65, 0, 36, 18, 3, 64, 35, 18, 65, 192, 0, 72, 4, 64, 35, 15, 35, 12, 34, 0, 65, 6, 253, 173, 1, 32, 0, 65, 26, 253, 171, 1, 253, 80, 32, 0, 65, 11, 253, 173, 1, 32, 0, 65, 21, 253, 171, 1, 253, 80, 253, 81, 32, 0, 65, 25, 253, 173, 1, 32, 0, 65, 7, 253, 171, 1, 253, 80, 253, 81, 253, 174, 1, 35, 12, 34, 0, 35, 13, 253, 78, 32, 0, 253, 77, 35, 14, 253, 78, 253, 81, 253, 174, 1, 33, 1, 35, 26, 33, 2, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 35, 18, 34, 3, 14, 64, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 11, 32, 2, 253, 0, 4, 0, 33, 0, 12, 64, 11, 32, 2, 253, 0, 4, 16, 33, 0, 12, 63, 11, 32, 2, 253, 0, 4, 32, 33, 0, 12, 62, 11, 32, 2, 253, 0, 4, 48, 33, 0, 12, 61, 11, 32, 2, 253, 0, 4, 64, 33, 0, 12, 60, 11, 32, 2, 253, 0, 4, 80, 33, 0, 12, 59, 11, 32, 2, 253, 0, 4, 96, 33, 0, 12, 58, 11, 32, 2, 253, 0, 4, 112, 33, 0, 12, 57, 11, 32, 2, 253, 0, 4, 128, 1, 33, 0, 12, 56, 11, 32, 2, 253, 0, 4, 144, 1, 33, 0, 12, 55, 11, 32, 2, 253, 0, 4, 160, 1, 33, 0, 12, 54, 11, 32, 2, 253, 0, 4, 176, 1, 33, 0, 12, 53, 11, 32, 2, 253, 0, 4, 192, 1, 33, 0, 12, 52, 11, 32, 2, 253, 0, 4, 208, 1, 33, 0, 12, 51, 11, 32, 2, 253, 0, 4, 224, 1, 33, 0, 12, 50, 11, 32, 2, 253, 0, 4, 240, 1, 33, 0, 12, 49, 11, 32, 2, 253, 0, 4, 128, 2, 33, 0, 12, 48, 11, 32, 2, 253, 0, 4, 144, 2, 33, 0, 12, 47, 11, 32, 2, 253, 0, 4, 160, 2, 33, 0, 12, 46, 11, 32, 2, 253, 0, 4, 176, 2, 33, 0, 12, 45, 11, 32, 2, 253, 0, 4, 192, 2, 33, 0, 12, 44, 11, 32, 2, 253, 0, 4, 208, 2, 33, 0, 12, 43, 11, 32, 2, 253, 0, 4, 224, 2, 33, 0, 12, 42, 11, 32, 2, 253, 0, 4, 240, 2, 33, 0, 12, 41, 11, 32, 2, 253, 0, 4, 128, 3, 33, 0, 12, 40, 11, 32, 2, 253, 0, 4, 144, 3, 33, 0, 12, 39, 11, 32, 2, 253, 0, 4, 160, 3, 33, 0, 12, 38, 11, 32, 2, 253, 0, 4, 176, 3, 33, 0, 12, 37, 11, 32, 2, 253, 0, 4, 192, 3, 33, 0, 12, 36, 11, 32, 2, 253, 0, 4, 208, 3, 33, 0, 12, 35, 11, 32, 2, 253, 0, 4, 224, 3, 33, 0, 12, 34, 11, 32, 2, 253, 0, 4, 240, 3, 33, 0, 12, 33, 11, 32, 2, 253, 0, 4, 128, 4, 33, 0, 12, 32, 11, 32, 2, 253, 0, 4, 144, 4, 33, 0, 12, 31, 11, 32, 2, 253, 0, 4, 160, 4, 33, 0, 12, 30, 11, 32, 2, 253, 0, 4, 176, 4, 33, 0, 12, 29, 11, 32, 2, 253, 0, 4, 192, 4, 33, 0, 12, 28, 11, 32, 2, 253, 0, 4, 208, 4, 33, 0, 12, 27, 11, 32, 2, 253, 0, 4, 224, 4, 33, 0, 12, 26, 11, 32, 2, 253, 0, 4, 240, 4, 33, 0, 12, 25, 11, 32, 2, 253, 0, 4, 128, 5, 33, 0, 12, 24, 11, 32, 2, 253, 0, 4, 144, 5, 33, 0, 12, 23, 11, 32, 2, 253, 0, 4, 160, 5, 33, 0, 12, 22, 11, 32, 2, 253, 0, 4, 176, 5, 33, 0, 12, 21, 11, 32, 2, 253, 0, 4, 192, 5, 33, 0, 12, 20, 11, 32, 2, 253, 0, 4, 208, 5, 33, 0, 12, 19, 11, 32, 2, 253, 0, 4, 224, 5, 33, 0, 12, 18, 11, 32, 2, 253, 0, 4, 240, 5, 33, 0, 12, 17, 11, 32, 2, 253, 0, 4, 128, 6, 33, 0, 12, 16, 11, 32, 2, 253, 0, 4, 144, 6, 33, 0, 12, 15, 11, 32, 2, 253, 0, 4, 160, 6, 33, 0, 12, 14, 11, 32, 2, 253, 0, 4, 176, 6, 33, 0, 12, 13, 11, 32, 2, 253, 0, 4, 192, 6, 33, 0, 12, 12, 11, 32, 2, 253, 0, 4, 208, 6, 33, 0, 12, 11, 11, 32, 2, 253, 0, 4, 224, 6, 33, 0, 12, 10, 11, 32, 2, 253, 0, 4, 240, 6, 33, 0, 12, 9, 11, 32, 2, 253, 0, 4, 128, 7, 33, 0, 12, 8, 11, 32, 2, 253, 0, 4, 144, 7, 33, 0, 12, 7, 11, 32, 2, 253, 0, 4, 160, 7, 33, 0, 12, 6, 11, 32, 2, 253, 0, 4, 176, 7, 33, 0, 12, 5, 11, 32, 2, 253, 0, 4, 192, 7, 33, 0, 12, 4, 11, 32, 2, 253, 0, 4, 208, 7, 33, 0, 12, 3, 11, 32, 2, 253, 0, 4, 224, 7, 33, 0, 12, 2, 11, 32, 2, 253, 0, 4, 240, 7, 33, 0, 12, 1, 11, 65, 128, 21, 32, 3, 16, 13, 16, 15, 65, 192, 20, 65, 213, 2, 65, 7, 16, 0, 0, 11, 32, 1, 32, 0, 253, 174, 1, 36, 16, 35, 8, 34, 0, 65, 2, 253, 173, 1, 32, 0, 65, 30, 253, 171, 1, 253, 80, 32, 0, 65, 13, 253, 173, 1, 32, 0, 65, 19, 253, 171, 1, 253, 80, 253, 81, 32, 0, 65, 22, 253, 173, 1, 32, 0, 65, 10, 253, 171, 1, 253, 80, 253, 81, 35, 8, 34, 0, 35, 9, 34, 1, 253, 78, 32, 0, 35, 10, 34, 0, 253, 78, 253, 81, 32, 1, 32, 0, 253, 78, 253, 81, 253, 174, 1, 36, 17, 35, 14, 36, 15, 35, 13, 36, 14, 35, 12, 36, 13, 35, 11, 35, 16, 253, 174, 1, 36, 12, 35, 10, 36, 11, 35, 9, 36, 10, 35, 8, 36, 9, 35, 16, 35, 17, 253, 174, 1, 36, 8, 35, 18, 65, 1, 106, 36, 18, 12, 1, 11, 11, 35, 0, 35, 8, 253, 174, 1, 36, 0, 35, 1, 35, 9, 253, 174, 1, 36, 1, 35, 2, 35, 10, 253, 174, 1, 36, 2, 35, 3, 35, 11, 253, 174, 1, 36, 3, 35, 4, 35, 12, 253, 174, 1, 36, 4, 35, 5, 35, 13, 253, 174, 1, 36, 5, 35, 6, 35, 14, 253, 174, 1, 36, 6, 35, 7, 35, 15, 253, 174, 1, 36, 7, 11, 25, 0, 32, 0, 65, 128, 254, 131, 120, 113, 65, 8, 119, 32, 0, 65, 255, 129, 252, 7, 113, 65, 8, 120, 114, 11, 157, 57, 2, 2, 123, 2, 127, 253, 12, 103, 230, 9, 106, 103, 230, 9, 106, 103, 230, 9, 106, 103, 230, 9, 106, 36, 0, 253, 12, 133, 174, 103, 187, 133, 174, 103, 187, 133, 174, 103, 187, 133, 174, 103, 187, 36, 1, 253, 12, 114, 243, 110, 60, 114, 243, 110, 60, 114, 243, 110, 60, 114, 243, 110, 60, 36, 2, 253, 12, 58, 245, 79, 165, 58, 245, 79, 165, 58, 245, 79, 165, 58, 245, 79, 165, 36, 3, 253, 12, 127, 82, 14, 81, 127, 82, 14, 81, 127, 82, 14, 81, 127, 82, 14, 81, 36, 4, 253, 12, 140, 104, 5, 155, 140, 104, 5, 155, 140, 104, 5, 155, 140, 104, 5, 155, 36, 5, 253, 12, 171, 217, 131, 31, 171, 217, 131, 31, 171, 217, 131, 31, 171, 217, 131, 31, 36, 6, 253, 12, 25, 205, 224, 91, 25, 205, 224, 91, 25, 205, 224, 91, 25, 205, 224, 91, 36, 7, 253, 12, 103, 230, 9, 106, 103, 230, 9, 106, 103, 230, 9, 106, 103, 230, 9, 106, 36, 8, 253, 12, 133, 174, 103, 187, 133, 174, 103, 187, 133, 174, 103, 187, 133, 174, 103, 187, 36, 9, 253, 12, 114, 243, 110, 60, 114, 243, 110, 60, 114, 243, 110, 60, 114, 243, 110, 60, 36, 10, 253, 12, 58, 245, 79, 165, 58, 245, 79, 165, 58, 245, 79, 165, 58, 245, 79, 165, 36, 11, 253, 12, 127, 82, 14, 81, 127, 82, 14, 81, 127, 82, 14, 81, 127, 82, 14, 81, 36, 12, 253, 12, 140, 104, 5, 155, 140, 104, 5, 155, 140, 104, 5, 155, 140, 104, 5, 155, 36, 13, 253, 12, 171, 217, 131, 31, 171, 217, 131, 31, 171, 217, 131, 31, 171, 217, 131, 31, 36, 14, 253, 12, 25, 205, 224, 91, 25, 205, 224, 91, 25, 205, 224, 91, 25, 205, 224, 91, 36, 15, 65, 0, 36, 18, 2, 64, 3, 64, 35, 18, 65, 192, 0, 72, 4, 64, 35, 18, 65, 16, 72, 4, 123, 2, 123, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 35, 18, 34, 4, 14, 64, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 68, 11, 32, 0, 253, 0, 4, 0, 12, 63, 11, 32, 0, 253, 0, 4, 16, 12, 62, 11, 32, 0, 253, 0, 4, 32, 12, 61, 11, 32, 0, 253, 0, 4, 48, 12, 60, 11, 32, 0, 253, 0, 4, 64, 12, 59, 11, 32, 0, 253, 0, 4, 80, 12, 58, 11, 32, 0, 253, 0, 4, 96, 12, 57, 11, 32, 0, 253, 0, 4, 112, 12, 56, 11, 32, 0, 253, 0, 4, 128, 1, 12, 55, 11, 32, 0, 253, 0, 4, 144, 1, 12, 54, 11, 32, 0, 253, 0, 4, 160, 1, 12, 53, 11, 32, 0, 253, 0, 4, 176, 1, 12, 52, 11, 32, 0, 253, 0, 4, 192, 1, 12, 51, 11, 32, 0, 253, 0, 4, 208, 1, 12, 50, 11, 32, 0, 253, 0, 4, 224, 1, 12, 49, 11, 32, 0, 253, 0, 4, 240, 1, 12, 48, 11, 32, 0, 253, 0, 4, 128, 2, 12, 47, 11, 32, 0, 253, 0, 4, 144, 2, 12, 46, 11, 32, 0, 253, 0, 4, 160, 2, 12, 45, 11, 32, 0, 253, 0, 4, 176, 2, 12, 44, 11, 32, 0, 253, 0, 4, 192, 2, 12, 43, 11, 32, 0, 253, 0, 4, 208, 2, 12, 42, 11, 32, 0, 253, 0, 4, 224, 2, 12, 41, 11, 32, 0, 253, 0, 4, 240, 2, 12, 40, 11, 32, 0, 253, 0, 4, 128, 3, 12, 39, 11, 32, 0, 253, 0, 4, 144, 3, 12, 38, 11, 32, 0, 253, 0, 4, 160, 3, 12, 37, 11, 32, 0, 253, 0, 4, 176, 3, 12, 36, 11, 32, 0, 253, 0, 4, 192, 3, 12, 35, 11, 32, 0, 253, 0, 4, 208, 3, 12, 34, 11, 32, 0, 253, 0, 4, 224, 3, 12, 33, 11, 32, 0, 253, 0, 4, 240, 3, 12, 32, 11, 32, 0, 253, 0, 4, 128, 4, 12, 31, 11, 32, 0, 253, 0, 4, 144, 4, 12, 30, 11, 32, 0, 253, 0, 4, 160, 4, 12, 29, 11, 32, 0, 253, 0, 4, 176, 4, 12, 28, 11, 32, 0, 253, 0, 4, 192, 4, 12, 27, 11, 32, 0, 253, 0, 4, 208, 4, 12, 26, 11, 32, 0, 253, 0, 4, 224, 4, 12, 25, 11, 32, 0, 253, 0, 4, 240, 4, 12, 24, 11, 32, 0, 253, 0, 4, 128, 5, 12, 23, 11, 32, 0, 253, 0, 4, 144, 5, 12, 22, 11, 32, 0, 253, 0, 4, 160, 5, 12, 21, 11, 32, 0, 253, 0, 4, 176, 5, 12, 20, 11, 32, 0, 253, 0, 4, 192, 5, 12, 19, 11, 32, 0, 253, 0, 4, 208, 5, 12, 18, 11, 32, 0, 253, 0, 4, 224, 5, 12, 17, 11, 32, 0, 253, 0, 4, 240, 5, 12, 16, 11, 32, 0, 253, 0, 4, 128, 6, 12, 15, 11, 32, 0, 253, 0, 4, 144, 6, 12, 14, 11, 32, 0, 253, 0, 4, 160, 6, 12, 13, 11, 32, 0, 253, 0, 4, 176, 6, 12, 12, 11, 32, 0, 253, 0, 4, 192, 6, 12, 11, 11, 32, 0, 253, 0, 4, 208, 6, 12, 10, 11, 32, 0, 253, 0, 4, 224, 6, 12, 9, 11, 32, 0, 253, 0, 4, 240, 6, 12, 8, 11, 32, 0, 253, 0, 4, 128, 7, 12, 7, 11, 32, 0, 253, 0, 4, 144, 7, 12, 6, 11, 32, 0, 253, 0, 4, 160, 7, 12, 5, 11, 32, 0, 253, 0, 4, 176, 7, 12, 4, 11, 32, 0, 253, 0, 4, 192, 7, 12, 3, 11, 32, 0, 253, 0, 4, 208, 7, 12, 2, 11, 32, 0, 253, 0, 4, 224, 7, 12, 1, 11, 32, 0, 253, 0, 4, 240, 7, 11, 5, 2, 123, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 35, 18, 65, 2, 107, 34, 4, 14, 64, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 68, 11, 32, 0, 253, 0, 4, 0, 12, 63, 11, 32, 0, 253, 0, 4, 16, 12, 62, 11, 32, 0, 253, 0, 4, 32, 12, 61, 11, 32, 0, 253, 0, 4, 48, 12, 60, 11, 32, 0, 253, 0, 4, 64, 12, 59, 11, 32, 0, 253, 0, 4, 80, 12, 58, 11, 32, 0, 253, 0, 4, 96, 12, 57, 11, 32, 0, 253, 0, 4, 112, 12, 56, 11, 32, 0, 253, 0, 4, 128, 1, 12, 55, 11, 32, 0, 253, 0, 4, 144, 1, 12, 54, 11, 32, 0, 253, 0, 4, 160, 1, 12, 53, 11, 32, 0, 253, 0, 4, 176, 1, 12, 52, 11, 32, 0, 253, 0, 4, 192, 1, 12, 51, 11, 32, 0, 253, 0, 4, 208, 1, 12, 50, 11, 32, 0, 253, 0, 4, 224, 1, 12, 49, 11, 32, 0, 253, 0, 4, 240, 1, 12, 48, 11, 32, 0, 253, 0, 4, 128, 2, 12, 47, 11, 32, 0, 253, 0, 4, 144, 2, 12, 46, 11, 32, 0, 253, 0, 4, 160, 2, 12, 45, 11, 32, 0, 253, 0, 4, 176, 2, 12, 44, 11, 32, 0, 253, 0, 4, 192, 2, 12, 43, 11, 32, 0, 253, 0, 4, 208, 2, 12, 42, 11, 32, 0, 253, 0, 4, 224, 2, 12, 41, 11, 32, 0, 253, 0, 4, 240, 2, 12, 40, 11, 32, 0, 253, 0, 4, 128, 3, 12, 39, 11, 32, 0, 253, 0, 4, 144, 3, 12, 38, 11, 32, 0, 253, 0, 4, 160, 3, 12, 37, 11, 32, 0, 253, 0, 4, 176, 3, 12, 36, 11, 32, 0, 253, 0, 4, 192, 3, 12, 35, 11, 32, 0, 253, 0, 4, 208, 3, 12, 34, 11, 32, 0, 253, 0, 4, 224, 3, 12, 33, 11, 32, 0, 253, 0, 4, 240, 3, 12, 32, 11, 32, 0, 253, 0, 4, 128, 4, 12, 31, 11, 32, 0, 253, 0, 4, 144, 4, 12, 30, 11, 32, 0, 253, 0, 4, 160, 4, 12, 29, 11, 32, 0, 253, 0, 4, 176, 4, 12, 28, 11, 32, 0, 253, 0, 4, 192, 4, 12, 27, 11, 32, 0, 253, 0, 4, 208, 4, 12, 26, 11, 32, 0, 253, 0, 4, 224, 4, 12, 25, 11, 32, 0, 253, 0, 4, 240, 4, 12, 24, 11, 32, 0, 253, 0, 4, 128, 5, 12, 23, 11, 32, 0, 253, 0, 4, 144, 5, 12, 22, 11, 32, 0, 253, 0, 4, 160, 5, 12, 21, 11, 32, 0, 253, 0, 4, 176, 5, 12, 20, 11, 32, 0, 253, 0, 4, 192, 5, 12, 19, 11, 32, 0, 253, 0, 4, 208, 5, 12, 18, 11, 32, 0, 253, 0, 4, 224, 5, 12, 17, 11, 32, 0, 253, 0, 4, 240, 5, 12, 16, 11, 32, 0, 253, 0, 4, 128, 6, 12, 15, 11, 32, 0, 253, 0, 4, 144, 6, 12, 14, 11, 32, 0, 253, 0, 4, 160, 6, 12, 13, 11, 32, 0, 253, 0, 4, 176, 6, 12, 12, 11, 32, 0, 253, 0, 4, 192, 6, 12, 11, 11, 32, 0, 253, 0, 4, 208, 6, 12, 10, 11, 32, 0, 253, 0, 4, 224, 6, 12, 9, 11, 32, 0, 253, 0, 4, 240, 6, 12, 8, 11, 32, 0, 253, 0, 4, 128, 7, 12, 7, 11, 32, 0, 253, 0, 4, 144, 7, 12, 6, 11, 32, 0, 253, 0, 4, 160, 7, 12, 5, 11, 32, 0, 253, 0, 4, 176, 7, 12, 4, 11, 32, 0, 253, 0, 4, 192, 7, 12, 3, 11, 32, 0, 253, 0, 4, 208, 7, 12, 2, 11, 32, 0, 253, 0, 4, 224, 7, 12, 1, 11, 32, 0, 253, 0, 4, 240, 7, 11, 34, 2, 65, 17, 253, 173, 1, 32, 2, 65, 15, 253, 171, 1, 253, 80, 32, 2, 65, 19, 253, 173, 1, 32, 2, 65, 13, 253, 171, 1, 253, 80, 253, 81, 32, 2, 65, 10, 253, 173, 1, 253, 81, 2, 123, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 35, 18, 65, 7, 107, 34, 4, 14, 64, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 68, 11, 32, 0, 253, 0, 4, 0, 12, 63, 11, 32, 0, 253, 0, 4, 16, 12, 62, 11, 32, 0, 253, 0, 4, 32, 12, 61, 11, 32, 0, 253, 0, 4, 48, 12, 60, 11, 32, 0, 253, 0, 4, 64, 12, 59, 11, 32, 0, 253, 0, 4, 80, 12, 58, 11, 32, 0, 253, 0, 4, 96, 12, 57, 11, 32, 0, 253, 0, 4, 112, 12, 56, 11, 32, 0, 253, 0, 4, 128, 1, 12, 55, 11, 32, 0, 253, 0, 4, 144, 1, 12, 54, 11, 32, 0, 253, 0, 4, 160, 1, 12, 53, 11, 32, 0, 253, 0, 4, 176, 1, 12, 52, 11, 32, 0, 253, 0, 4, 192, 1, 12, 51, 11, 32, 0, 253, 0, 4, 208, 1, 12, 50, 11, 32, 0, 253, 0, 4, 224, 1, 12, 49, 11, 32, 0, 253, 0, 4, 240, 1, 12, 48, 11, 32, 0, 253, 0, 4, 128, 2, 12, 47, 11, 32, 0, 253, 0, 4, 144, 2, 12, 46, 11, 32, 0, 253, 0, 4, 160, 2, 12, 45, 11, 32, 0, 253, 0, 4, 176, 2, 12, 44, 11, 32, 0, 253, 0, 4, 192, 2, 12, 43, 11, 32, 0, 253, 0, 4, 208, 2, 12, 42, 11, 32, 0, 253, 0, 4, 224, 2, 12, 41, 11, 32, 0, 253, 0, 4, 240, 2, 12, 40, 11, 32, 0, 253, 0, 4, 128, 3, 12, 39, 11, 32, 0, 253, 0, 4, 144, 3, 12, 38, 11, 32, 0, 253, 0, 4, 160, 3, 12, 37, 11, 32, 0, 253, 0, 4, 176, 3, 12, 36, 11, 32, 0, 253, 0, 4, 192, 3, 12, 35, 11, 32, 0, 253, 0, 4, 208, 3, 12, 34, 11, 32, 0, 253, 0, 4, 224, 3, 12, 33, 11, 32, 0, 253, 0, 4, 240, 3, 12, 32, 11, 32, 0, 253, 0, 4, 128, 4, 12, 31, 11, 32, 0, 253, 0, 4, 144, 4, 12, 30, 11, 32, 0, 253, 0, 4, 160, 4, 12, 29, 11, 32, 0, 253, 0, 4, 176, 4, 12, 28, 11, 32, 0, 253, 0, 4, 192, 4, 12, 27, 11, 32, 0, 253, 0, 4, 208, 4, 12, 26, 11, 32, 0, 253, 0, 4, 224, 4, 12, 25, 11, 32, 0, 253, 0, 4, 240, 4, 12, 24, 11, 32, 0, 253, 0, 4, 128, 5, 12, 23, 11, 32, 0, 253, 0, 4, 144, 5, 12, 22, 11, 32, 0, 253, 0, 4, 160, 5, 12, 21, 11, 32, 0, 253, 0, 4, 176, 5, 12, 20, 11, 32, 0, 253, 0, 4, 192, 5, 12, 19, 11, 32, 0, 253, 0, 4, 208, 5, 12, 18, 11, 32, 0, 253, 0, 4, 224, 5, 12, 17, 11, 32, 0, 253, 0, 4, 240, 5, 12, 16, 11, 32, 0, 253, 0, 4, 128, 6, 12, 15, 11, 32, 0, 253, 0, 4, 144, 6, 12, 14, 11, 32, 0, 253, 0, 4, 160, 6, 12, 13, 11, 32, 0, 253, 0, 4, 176, 6, 12, 12, 11, 32, 0, 253, 0, 4, 192, 6, 12, 11, 11, 32, 0, 253, 0, 4, 208, 6, 12, 10, 11, 32, 0, 253, 0, 4, 224, 6, 12, 9, 11, 32, 0, 253, 0, 4, 240, 6, 12, 8, 11, 32, 0, 253, 0, 4, 128, 7, 12, 7, 11, 32, 0, 253, 0, 4, 144, 7, 12, 6, 11, 32, 0, 253, 0, 4, 160, 7, 12, 5, 11, 32, 0, 253, 0, 4, 176, 7, 12, 4, 11, 32, 0, 253, 0, 4, 192, 7, 12, 3, 11, 32, 0, 253, 0, 4, 208, 7, 12, 2, 11, 32, 0, 253, 0, 4, 224, 7, 12, 1, 11, 32, 0, 253, 0, 4, 240, 7, 11, 253, 174, 1, 2, 123, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 35, 18, 65, 15, 107, 34, 4, 14, 64, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 68, 11, 32, 0, 253, 0, 4, 0, 12, 63, 11, 32, 0, 253, 0, 4, 16, 12, 62, 11, 32, 0, 253, 0, 4, 32, 12, 61, 11, 32, 0, 253, 0, 4, 48, 12, 60, 11, 32, 0, 253, 0, 4, 64, 12, 59, 11, 32, 0, 253, 0, 4, 80, 12, 58, 11, 32, 0, 253, 0, 4, 96, 12, 57, 11, 32, 0, 253, 0, 4, 112, 12, 56, 11, 32, 0, 253, 0, 4, 128, 1, 12, 55, 11, 32, 0, 253, 0, 4, 144, 1, 12, 54, 11, 32, 0, 253, 0, 4, 160, 1, 12, 53, 11, 32, 0, 253, 0, 4, 176, 1, 12, 52, 11, 32, 0, 253, 0, 4, 192, 1, 12, 51, 11, 32, 0, 253, 0, 4, 208, 1, 12, 50, 11, 32, 0, 253, 0, 4, 224, 1, 12, 49, 11, 32, 0, 253, 0, 4, 240, 1, 12, 48, 11, 32, 0, 253, 0, 4, 128, 2, 12, 47, 11, 32, 0, 253, 0, 4, 144, 2, 12, 46, 11, 32, 0, 253, 0, 4, 160, 2, 12, 45, 11, 32, 0, 253, 0, 4, 176, 2, 12, 44, 11, 32, 0, 253, 0, 4, 192, 2, 12, 43, 11, 32, 0, 253, 0, 4, 208, 2, 12, 42, 11, 32, 0, 253, 0, 4, 224, 2, 12, 41, 11, 32, 0, 253, 0, 4, 240, 2, 12, 40, 11, 32, 0, 253, 0, 4, 128, 3, 12, 39, 11, 32, 0, 253, 0, 4, 144, 3, 12, 38, 11, 32, 0, 253, 0, 4, 160, 3, 12, 37, 11, 32, 0, 253, 0, 4, 176, 3, 12, 36, 11, 32, 0, 253, 0, 4, 192, 3, 12, 35, 11, 32, 0, 253, 0, 4, 208, 3, 12, 34, 11, 32, 0, 253, 0, 4, 224, 3, 12, 33, 11, 32, 0, 253, 0, 4, 240, 3, 12, 32, 11, 32, 0, 253, 0, 4, 128, 4, 12, 31, 11, 32, 0, 253, 0, 4, 144, 4, 12, 30, 11, 32, 0, 253, 0, 4, 160, 4, 12, 29, 11, 32, 0, 253, 0, 4, 176, 4, 12, 28, 11, 32, 0, 253, 0, 4, 192, 4, 12, 27, 11, 32, 0, 253, 0, 4, 208, 4, 12, 26, 11, 32, 0, 253, 0, 4, 224, 4, 12, 25, 11, 32, 0, 253, 0, 4, 240, 4, 12, 24, 11, 32, 0, 253, 0, 4, 128, 5, 12, 23, 11, 32, 0, 253, 0, 4, 144, 5, 12, 22, 11, 32, 0, 253, 0, 4, 160, 5, 12, 21, 11, 32, 0, 253, 0, 4, 176, 5, 12, 20, 11, 32, 0, 253, 0, 4, 192, 5, 12, 19, 11, 32, 0, 253, 0, 4, 208, 5, 12, 18, 11, 32, 0, 253, 0, 4, 224, 5, 12, 17, 11, 32, 0, 253, 0, 4, 240, 5, 12, 16, 11, 32, 0, 253, 0, 4, 128, 6, 12, 15, 11, 32, 0, 253, 0, 4, 144, 6, 12, 14, 11, 32, 0, 253, 0, 4, 160, 6, 12, 13, 11, 32, 0, 253, 0, 4, 176, 6, 12, 12, 11, 32, 0, 253, 0, 4, 192, 6, 12, 11, 11, 32, 0, 253, 0, 4, 208, 6, 12, 10, 11, 32, 0, 253, 0, 4, 224, 6, 12, 9, 11, 32, 0, 253, 0, 4, 240, 6, 12, 8, 11, 32, 0, 253, 0, 4, 128, 7, 12, 7, 11, 32, 0, 253, 0, 4, 144, 7, 12, 6, 11, 32, 0, 253, 0, 4, 160, 7, 12, 5, 11, 32, 0, 253, 0, 4, 176, 7, 12, 4, 11, 32, 0, 253, 0, 4, 192, 7, 12, 3, 11, 32, 0, 253, 0, 4, 208, 7, 12, 2, 11, 32, 0, 253, 0, 4, 224, 7, 12, 1, 11, 32, 0, 253, 0, 4, 240, 7, 11, 34, 2, 65, 7, 253, 173, 1, 32, 2, 65, 25, 253, 171, 1, 253, 80, 32, 2, 65, 18, 253, 173, 1, 32, 2, 65, 14, 253, 171, 1, 253, 80, 253, 81, 32, 2, 65, 3, 253, 173, 1, 253, 81, 253, 174, 1, 2, 123, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 35, 18, 65, 16, 107, 34, 4, 14, 64, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 68, 11, 32, 0, 253, 0, 4, 0, 12, 63, 11, 32, 0, 253, 0, 4, 16, 12, 62, 11, 32, 0, 253, 0, 4, 32, 12, 61, 11, 32, 0, 253, 0, 4, 48, 12, 60, 11, 32, 0, 253, 0, 4, 64, 12, 59, 11, 32, 0, 253, 0, 4, 80, 12, 58, 11, 32, 0, 253, 0, 4, 96, 12, 57, 11, 32, 0, 253, 0, 4, 112, 12, 56, 11, 32, 0, 253, 0, 4, 128, 1, 12, 55, 11, 32, 0, 253, 0, 4, 144, 1, 12, 54, 11, 32, 0, 253, 0, 4, 160, 1, 12, 53, 11, 32, 0, 253, 0, 4, 176, 1, 12, 52, 11, 32, 0, 253, 0, 4, 192, 1, 12, 51, 11, 32, 0, 253, 0, 4, 208, 1, 12, 50, 11, 32, 0, 253, 0, 4, 224, 1, 12, 49, 11, 32, 0, 253, 0, 4, 240, 1, 12, 48, 11, 32, 0, 253, 0, 4, 128, 2, 12, 47, 11, 32, 0, 253, 0, 4, 144, 2, 12, 46, 11, 32, 0, 253, 0, 4, 160, 2, 12, 45, 11, 32, 0, 253, 0, 4, 176, 2, 12, 44, 11, 32, 0, 253, 0, 4, 192, 2, 12, 43, 11, 32, 0, 253, 0, 4, 208, 2, 12, 42, 11, 32, 0, 253, 0, 4, 224, 2, 12, 41, 11, 32, 0, 253, 0, 4, 240, 2, 12, 40, 11, 32, 0, 253, 0, 4, 128, 3, 12, 39, 11, 32, 0, 253, 0, 4, 144, 3, 12, 38, 11, 32, 0, 253, 0, 4, 160, 3, 12, 37, 11, 32, 0, 253, 0, 4, 176, 3, 12, 36, 11, 32, 0, 253, 0, 4, 192, 3, 12, 35, 11, 32, 0, 253, 0, 4, 208, 3, 12, 34, 11, 32, 0, 253, 0, 4, 224, 3, 12, 33, 11, 32, 0, 253, 0, 4, 240, 3, 12, 32, 11, 32, 0, 253, 0, 4, 128, 4, 12, 31, 11, 32, 0, 253, 0, 4, 144, 4, 12, 30, 11, 32, 0, 253, 0, 4, 160, 4, 12, 29, 11, 32, 0, 253, 0, 4, 176, 4, 12, 28, 11, 32, 0, 253, 0, 4, 192, 4, 12, 27, 11, 32, 0, 253, 0, 4, 208, 4, 12, 26, 11, 32, 0, 253, 0, 4, 224, 4, 12, 25, 11, 32, 0, 253, 0, 4, 240, 4, 12, 24, 11, 32, 0, 253, 0, 4, 128, 5, 12, 23, 11, 32, 0, 253, 0, 4, 144, 5, 12, 22, 11, 32, 0, 253, 0, 4, 160, 5, 12, 21, 11, 32, 0, 253, 0, 4, 176, 5, 12, 20, 11, 32, 0, 253, 0, 4, 192, 5, 12, 19, 11, 32, 0, 253, 0, 4, 208, 5, 12, 18, 11, 32, 0, 253, 0, 4, 224, 5, 12, 17, 11, 32, 0, 253, 0, 4, 240, 5, 12, 16, 11, 32, 0, 253, 0, 4, 128, 6, 12, 15, 11, 32, 0, 253, 0, 4, 144, 6, 12, 14, 11, 32, 0, 253, 0, 4, 160, 6, 12, 13, 11, 32, 0, 253, 0, 4, 176, 6, 12, 12, 11, 32, 0, 253, 0, 4, 192, 6, 12, 11, 11, 32, 0, 253, 0, 4, 208, 6, 12, 10, 11, 32, 0, 253, 0, 4, 224, 6, 12, 9, 11, 32, 0, 253, 0, 4, 240, 6, 12, 8, 11, 32, 0, 253, 0, 4, 128, 7, 12, 7, 11, 32, 0, 253, 0, 4, 144, 7, 12, 6, 11, 32, 0, 253, 0, 4, 160, 7, 12, 5, 11, 32, 0, 253, 0, 4, 176, 7, 12, 4, 11, 32, 0, 253, 0, 4, 192, 7, 12, 3, 11, 32, 0, 253, 0, 4, 208, 7, 12, 2, 11, 32, 0, 253, 0, 4, 224, 7, 12, 1, 11, 32, 0, 253, 0, 4, 240, 7, 11, 253, 174, 1, 11, 36, 19, 35, 18, 65, 16, 78, 4, 64, 35, 19, 33, 2, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 35, 18, 34, 4, 14, 64, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 11, 32, 0, 32, 2, 253, 11, 4, 0, 12, 64, 11, 32, 0, 32, 2, 253, 11, 4, 16, 12, 63, 11, 32, 0, 32, 2, 253, 11, 4, 32, 12, 62, 11, 32, 0, 32, 2, 253, 11, 4, 48, 12, 61, 11, 32, 0, 32, 2, 253, 11, 4, 64, 12, 60, 11, 32, 0, 32, 2, 253, 11, 4, 80, 12, 59, 11, 32, 0, 32, 2, 253, 11, 4, 96, 12, 58, 11, 32, 0, 32, 2, 253, 11, 4, 112, 12, 57, 11, 32, 0, 32, 2, 253, 11, 4, 128, 1, 12, 56, 11, 32, 0, 32, 2, 253, 11, 4, 144, 1, 12, 55, 11, 32, 0, 32, 2, 253, 11, 4, 160, 1, 12, 54, 11, 32, 0, 32, 2, 253, 11, 4, 176, 1, 12, 53, 11, 32, 0, 32, 2, 253, 11, 4, 192, 1, 12, 52, 11, 32, 0, 32, 2, 253, 11, 4, 208, 1, 12, 51, 11, 32, 0, 32, 2, 253, 11, 4, 224, 1, 12, 50, 11, 32, 0, 32, 2, 253, 11, 4, 240, 1, 12, 49, 11, 32, 0, 32, 2, 253, 11, 4, 128, 2, 12, 48, 11, 32, 0, 32, 2, 253, 11, 4, 144, 2, 12, 47, 11, 32, 0, 32, 2, 253, 11, 4, 160, 2, 12, 46, 11, 32, 0, 32, 2, 253, 11, 4, 176, 2, 12, 45, 11, 32, 0, 32, 2, 253, 11, 4, 192, 2, 12, 44, 11, 32, 0, 32, 2, 253, 11, 4, 208, 2, 12, 43, 11, 32, 0, 32, 2, 253, 11, 4, 224, 2, 12, 42, 11, 32, 0, 32, 2, 253, 11, 4, 240, 2, 12, 41, 11, 32, 0, 32, 2, 253, 11, 4, 128, 3, 12, 40, 11, 32, 0, 32, 2, 253, 11, 4, 144, 3, 12, 39, 11, 32, 0, 32, 2, 253, 11, 4, 160, 3, 12, 38, 11, 32, 0, 32, 2, 253, 11, 4, 176, 3, 12, 37, 11, 32, 0, 32, 2, 253, 11, 4, 192, 3, 12, 36, 11, 32, 0, 32, 2, 253, 11, 4, 208, 3, 12, 35, 11, 32, 0, 32, 2, 253, 11, 4, 224, 3, 12, 34, 11, 32, 0, 32, 2, 253, 11, 4, 240, 3, 12, 33, 11, 32, 0, 32, 2, 253, 11, 4, 128, 4, 12, 32, 11, 32, 0, 32, 2, 253, 11, 4, 144, 4, 12, 31, 11, 32, 0, 32, 2, 253, 11, 4, 160, 4, 12, 30, 11, 32, 0, 32, 2, 253, 11, 4, 176, 4, 12, 29, 11, 32, 0, 32, 2, 253, 11, 4, 192, 4, 12, 28, 11, 32, 0, 32, 2, 253, 11, 4, 208, 4, 12, 27, 11, 32, 0, 32, 2, 253, 11, 4, 224, 4, 12, 26, 11, 32, 0, 32, 2, 253, 11, 4, 240, 4, 12, 25, 11, 32, 0, 32, 2, 253, 11, 4, 128, 5, 12, 24, 11, 32, 0, 32, 2, 253, 11, 4, 144, 5, 12, 23, 11, 32, 0, 32, 2, 253, 11, 4, 160, 5, 12, 22, 11, 32, 0, 32, 2, 253, 11, 4, 176, 5, 12, 21, 11, 32, 0, 32, 2, 253, 11, 4, 192, 5, 12, 20, 11, 32, 0, 32, 2, 253, 11, 4, 208, 5, 12, 19, 11, 32, 0, 32, 2, 253, 11, 4, 224, 5, 12, 18, 11, 32, 0, 32, 2, 253, 11, 4, 240, 5, 12, 17, 11, 32, 0, 32, 2, 253, 11, 4, 128, 6, 12, 16, 11, 32, 0, 32, 2, 253, 11, 4, 144, 6, 12, 15, 11, 32, 0, 32, 2, 253, 11, 4, 160, 6, 12, 14, 11, 32, 0, 32, 2, 253, 11, 4, 176, 6, 12, 13, 11, 32, 0, 32, 2, 253, 11, 4, 192, 6, 12, 12, 11, 32, 0, 32, 2, 253, 11, 4, 208, 6, 12, 11, 11, 32, 0, 32, 2, 253, 11, 4, 224, 6, 12, 10, 11, 32, 0, 32, 2, 253, 11, 4, 240, 6, 12, 9, 11, 32, 0, 32, 2, 253, 11, 4, 128, 7, 12, 8, 11, 32, 0, 32, 2, 253, 11, 4, 144, 7, 12, 7, 11, 32, 0, 32, 2, 253, 11, 4, 160, 7, 12, 6, 11, 32, 0, 32, 2, 253, 11, 4, 176, 7, 12, 5, 11, 32, 0, 32, 2, 253, 11, 4, 192, 7, 12, 4, 11, 32, 0, 32, 2, 253, 11, 4, 208, 7, 12, 3, 11, 32, 0, 32, 2, 253, 11, 4, 224, 7, 12, 2, 11, 32, 0, 32, 2, 253, 11, 4, 240, 7, 12, 1, 11, 65, 192, 19, 32, 4, 16, 13, 16, 15, 65, 192, 20, 65, 201, 1, 65, 7, 16, 0, 0, 11, 11, 35, 15, 35, 12, 34, 2, 65, 6, 253, 173, 1, 32, 2, 65, 26, 253, 171, 1, 253, 80, 32, 2, 65, 11, 253, 173, 1, 32, 2, 65, 21, 253, 171, 1, 253, 80, 253, 81, 32, 2, 65, 25, 253, 173, 1, 32, 2, 65, 7, 253, 171, 1, 253, 80, 253, 81, 253, 174, 1, 35, 12, 34, 2, 35, 13, 253, 78, 32, 2, 253, 77, 35, 14, 253, 78, 253, 81, 253, 174, 1, 33, 3, 35, 24, 33, 4, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 2, 64, 35, 18, 34, 5, 14, 64, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 11, 32, 4, 253, 0, 4, 0, 33, 2, 12, 64, 11, 32, 4, 253, 0, 4, 16, 33, 2, 12, 63, 11, 32, 4, 253, 0, 4, 32, 33, 2, 12, 62, 11, 32, 4, 253, 0, 4, 48, 33, 2, 12, 61, 11, 32, 4, 253, 0, 4, 64, 33, 2, 12, 60, 11, 32, 4, 253, 0, 4, 80, 33, 2, 12, 59, 11, 32, 4, 253, 0, 4, 96, 33, 2, 12, 58, 11, 32, 4, 253, 0, 4, 112, 33, 2, 12, 57, 11, 32, 4, 253, 0, 4, 128, 1, 33, 2, 12, 56, 11, 32, 4, 253, 0, 4, 144, 1, 33, 2, 12, 55, 11, 32, 4, 253, 0, 4, 160, 1, 33, 2, 12, 54, 11, 32, 4, 253, 0, 4, 176, 1, 33, 2, 12, 53, 11, 32, 4, 253, 0, 4, 192, 1, 33, 2, 12, 52, 11, 32, 4, 253, 0, 4, 208, 1, 33, 2, 12, 51, 11, 32, 4, 253, 0, 4, 224, 1, 33, 2, 12, 50, 11, 32, 4, 253, 0, 4, 240, 1, 33, 2, 12, 49, 11, 32, 4, 253, 0, 4, 128, 2, 33, 2, 12, 48, 11, 32, 4, 253, 0, 4, 144, 2, 33, 2, 12, 47, 11, 32, 4, 253, 0, 4, 160, 2, 33, 2, 12, 46, 11, 32, 4, 253, 0, 4, 176, 2, 33, 2, 12, 45, 11, 32, 4, 253, 0, 4, 192, 2, 33, 2, 12, 44, 11, 32, 4, 253, 0, 4, 208, 2, 33, 2, 12, 43, 11, 32, 4, 253, 0, 4, 224, 2, 33, 2, 12, 42, 11, 32, 4, 253, 0, 4, 240, 2, 33, 2, 12, 41, 11, 32, 4, 253, 0, 4, 128, 3, 33, 2, 12, 40, 11, 32, 4, 253, 0, 4, 144, 3, 33, 2, 12, 39, 11, 32, 4, 253, 0, 4, 160, 3, 33, 2, 12, 38, 11, 32, 4, 253, 0, 4, 176, 3, 33, 2, 12, 37, 11, 32, 4, 253, 0, 4, 192, 3, 33, 2, 12, 36, 11, 32, 4, 253, 0, 4, 208, 3, 33, 2, 12, 35, 11, 32, 4, 253, 0, 4, 224, 3, 33, 2, 12, 34, 11, 32, 4, 253, 0, 4, 240, 3, 33, 2, 12, 33, 11, 32, 4, 253, 0, 4, 128, 4, 33, 2, 12, 32, 11, 32, 4, 253, 0, 4, 144, 4, 33, 2, 12, 31, 11, 32, 4, 253, 0, 4, 160, 4, 33, 2, 12, 30, 11, 32, 4, 253, 0, 4, 176, 4, 33, 2, 12, 29, 11, 32, 4, 253, 0, 4, 192, 4, 33, 2, 12, 28, 11, 32, 4, 253, 0, 4, 208, 4, 33, 2, 12, 27, 11, 32, 4, 253, 0, 4, 224, 4, 33, 2, 12, 26, 11, 32, 4, 253, 0, 4, 240, 4, 33, 2, 12, 25, 11, 32, 4, 253, 0, 4, 128, 5, 33, 2, 12, 24, 11, 32, 4, 253, 0, 4, 144, 5, 33, 2, 12, 23, 11, 32, 4, 253, 0, 4, 160, 5, 33, 2, 12, 22, 11, 32, 4, 253, 0, 4, 176, 5, 33, 2, 12, 21, 11, 32, 4, 253, 0, 4, 192, 5, 33, 2, 12, 20, 11, 32, 4, 253, 0, 4, 208, 5, 33, 2, 12, 19, 11, 32, 4, 253, 0, 4, 224, 5, 33, 2, 12, 18, 11, 32, 4, 253, 0, 4, 240, 5, 33, 2, 12, 17, 11, 32, 4, 253, 0, 4, 128, 6, 33, 2, 12, 16, 11, 32, 4, 253, 0, 4, 144, 6, 33, 2, 12, 15, 11, 32, 4, 253, 0, 4, 160, 6, 33, 2, 12, 14, 11, 32, 4, 253, 0, 4, 176, 6, 33, 2, 12, 13, 11, 32, 4, 253, 0, 4, 192, 6, 33, 2, 12, 12, 11, 32, 4, 253, 0, 4, 208, 6, 33, 2, 12, 11, 11, 32, 4, 253, 0, 4, 224, 6, 33, 2, 12, 10, 11, 32, 4, 253, 0, 4, 240, 6, 33, 2, 12, 9, 11, 32, 4, 253, 0, 4, 128, 7, 33, 2, 12, 8, 11, 32, 4, 253, 0, 4, 144, 7, 33, 2, 12, 7, 11, 32, 4, 253, 0, 4, 160, 7, 33, 2, 12, 6, 11, 32, 4, 253, 0, 4, 176, 7, 33, 2, 12, 5, 11, 32, 4, 253, 0, 4, 192, 7, 33, 2, 12, 4, 11, 32, 4, 253, 0, 4, 208, 7, 33, 2, 12, 3, 11, 32, 4, 253, 0, 4, 224, 7, 33, 2, 12, 2, 11, 32, 4, 253, 0, 4, 240, 7, 33, 2, 12, 1, 11, 65, 128, 21, 32, 5, 16, 13, 16, 15, 65, 192, 20, 65, 213, 2, 65, 7, 16, 0, 0, 11, 32, 3, 32, 2, 253, 174, 1, 35, 19, 253, 174, 1, 36, 16, 35, 8, 34, 2, 65, 2, 253, 173, 1, 32, 2, 65, 30, 253, 171, 1, 253, 80, 32, 2, 65, 13, 253, 173, 1, 32, 2, 65, 19, 253, 171, 1, 253, 80, 253, 81, 32, 2, 65, 22, 253, 173, 1, 32, 2, 65, 10, 253, 171, 1, 253, 80, 253, 81, 35, 8, 34, 2, 35, 9, 34, 3, 253, 78, 32, 2, 35, 10, 34, 2, 253, 78, 253, 81, 32, 3, 32, 2, 253, 78, 253, 81, 253, 174, 1, 36, 17, 35, 14, 36, 15, 35, 13, 36, 14, 35, 12, 36, 13, 35, 11, 35, 16, 253, 174, 1, 36, 12, 35, 10, 36, 11, 35, 9, 36, 10, 35, 8, 36, 9, 35, 16, 35, 17, 253, 174, 1, 36, 8, 35, 18, 65, 1, 106, 36, 18, 12, 1, 11, 11, 35, 0, 35, 8, 253, 174, 1, 36, 0, 35, 1, 35, 9, 253, 174, 1, 36, 1, 35, 2, 35, 10, 253, 174, 1, 36, 2, 35, 3, 35, 11, 253, 174, 1, 36, 3, 35, 4, 35, 12, 253, 174, 1, 36, 4, 35, 5, 35, 13, 253, 174, 1, 36, 5, 35, 6, 35, 14, 253, 174, 1, 36, 6, 35, 7, 35, 15, 253, 174, 1, 36, 7, 16, 17, 32, 1, 35, 0, 253, 27, 0, 16, 18, 54, 2, 0, 32, 1, 35, 1, 253, 27, 0, 16, 18, 54, 2, 4, 32, 1, 35, 2, 253, 27, 0, 16, 18, 54, 2, 8, 32, 1, 35, 3, 253, 27, 0, 16, 18, 54, 2, 12, 32, 1, 35, 4, 253, 27, 0, 16, 18, 54, 2, 16, 32, 1, 35, 5, 253, 27, 0, 16, 18, 54, 2, 20, 32, 1, 35, 6, 253, 27, 0, 16, 18, 54, 2, 24, 32, 1, 35, 7, 253, 27, 0, 16, 18, 54, 2, 28, 32, 1, 35, 0, 253, 27, 1, 16, 18, 54, 2, 32, 32, 1, 35, 1, 253, 27, 1, 16, 18, 54, 2, 36, 32, 1, 35, 2, 253, 27, 1, 16, 18, 54, 2, 40, 32, 1, 35, 3, 253, 27, 1, 16, 18, 54, 2, 44, 32, 1, 35, 4, 253, 27, 1, 16, 18, 54, 2, 48, 32, 1, 35, 5, 253, 27, 1, 16, 18, 54, 2, 52, 32, 1, 35, 6, 253, 27, 1, 16, 18, 54, 2, 56, 32, 1, 35, 7, 253, 27, 1, 16, 18, 54, 2, 60, 32, 1, 65, 64, 107, 35, 0, 253, 27, 2, 16, 18, 54, 2, 0, 32, 1, 35, 1, 253, 27, 2, 16, 18, 54, 2, 68, 32, 1, 35, 2, 253, 27, 2, 16, 18, 54, 2, 72, 32, 1, 35, 3, 253, 27, 2, 16, 18, 54, 2, 76, 32, 1, 35, 4, 253, 27, 2, 16, 18, 54, 2, 80, 32, 1, 35, 5, 253, 27, 2, 16, 18, 54, 2, 84, 32, 1, 35, 6, 253, 27, 2, 16, 18, 54, 2, 88, 32, 1, 35, 7, 253, 27, 2, 16, 18, 54, 2, 92, 32, 1, 35, 0, 253, 27, 3, 16, 18, 54, 2, 96, 32, 1, 35, 1, 253, 27, 3, 16, 18, 54, 2, 100, 32, 1, 35, 2, 253, 27, 3, 16, 18, 54, 2, 104, 32, 1, 35, 3, 253, 27, 3, 16, 18, 54, 2, 108, 32, 1, 35, 4, 253, 27, 3, 16, 18, 54, 2, 112, 32, 1, 35, 5, 253, 27, 3, 16, 18, 54, 2, 116, 32, 1, 35, 6, 253, 27, 3, 16, 18, 54, 2, 120, 32, 1, 35, 7, 253, 27, 3, 16, 18, 54, 2, 124, 15, 11, 65, 128, 21, 32, 4, 16, 13, 16, 15, 65, 192, 20, 65, 213, 2, 65, 7, 16, 0, 0, 11, 203, 2, 1, 5, 127, 3, 64, 32, 1, 65, 16, 72, 4, 64, 32, 1, 65, 2, 116, 34, 2, 65, 1, 106, 33, 3, 35, 53, 32, 2, 65, 2, 116, 106, 32, 2, 65, 3, 106, 34, 4, 35, 55, 34, 5, 106, 45, 0, 0, 32, 2, 32, 5, 106, 45, 0, 0, 65, 24, 116, 32, 3, 32, 5, 106, 45, 0, 0, 65, 16, 116, 114, 32, 2, 65, 2, 106, 34, 2, 32, 5, 106, 45, 0, 0, 65, 8, 116, 114, 114, 54, 2, 0, 35, 53, 32, 3, 65, 2, 116, 106, 35, 55, 34, 3, 32, 1, 65, 16, 106, 65, 2, 116, 34, 5, 65, 3, 106, 106, 45, 0, 0, 32, 3, 32, 5, 106, 45, 0, 0, 65, 24, 116, 32, 5, 65, 1, 106, 32, 3, 106, 45, 0, 0, 65, 16, 116, 114, 32, 5, 65, 2, 106, 32, 3, 106, 45, 0, 0, 65, 8, 116, 114, 114, 54, 2, 0, 35, 53, 32, 2, 65, 2, 116, 106, 35, 55, 34, 2, 32, 1, 65, 32, 106, 65, 2, 116, 34, 3, 65, 3, 106, 106, 45, 0, 0, 32, 2, 32, 3, 106, 45, 0, 0, 65, 24, 116, 32, 3, 65, 1, 106, 32, 2, 106, 45, 0, 0, 65, 16, 116, 114, 32, 3, 65, 2, 106, 32, 2, 106, 45, 0, 0, 65, 8, 116, 114, 114, 54, 2, 0, 35, 53, 32, 4, 65, 2, 116, 106, 35, 55, 34, 2, 32, 1, 65, 48, 106, 65, 2, 116, 34, 3, 65, 3, 106, 106, 45, 0, 0, 32, 2, 32, 3, 106, 45, 0, 0, 65, 24, 116, 32, 3, 65, 1, 106, 32, 2, 106, 45, 0, 0, 65, 16, 116, 114, 32, 3, 65, 2, 106, 32, 2, 106, 45, 0, 0, 65, 8, 116, 114, 114, 54, 2, 0, 32, 1, 65, 1, 106, 33, 1, 12, 1, 11, 11, 35, 53, 32, 0, 16, 19, 11, 99, 1, 3, 127, 3, 64, 32, 2, 65, 192, 0, 72, 4, 64, 32, 2, 65, 2, 116, 34, 1, 35, 53, 106, 35, 55, 34, 3, 32, 1, 65, 3, 106, 106, 45, 0, 0, 32, 1, 32, 3, 106, 45, 0, 0, 65, 24, 116, 32, 1, 65, 1, 106, 32, 3, 106, 45, 0, 0, 65, 16, 116, 114, 32, 1, 65, 2, 106, 32, 3, 106, 45, 0, 0, 65, 8, 116, 114, 114, 54, 2, 0, 32, 2, 65, 1, 106, 33, 2, 12, 1, 11, 11, 35, 53, 32, 0, 16, 19, 11, 74, 0, 65, 231, 204, 167, 208, 6, 36, 31, 65, 133, 221, 158, 219, 123, 36, 32, 65, 242, 230, 187, 227, 3, 36, 33, 65, 186, 234, 191, 170, 122, 36, 34, 65, 255, 164, 185, 136, 5, 36, 35, 65, 140, 209, 149, 216, 121, 36, 36, 65, 171, 179, 143, 252, 1, 36, 37, 65, 153, 154, 131, 223, 5, 36, 38, 65, 0, 36, 58, 65, 0, 36, 59, 11, 227, 3, 1, 2, 127, 35, 31, 36, 39, 35, 32, 36, 40, 35, 33, 36, 41, 35, 34, 36, 42, 35, 35, 36, 43, 35, 36, 36, 44, 35, 37, 36, 45, 35, 38, 36, 46, 65, 0, 36, 47, 3, 64, 35, 47, 65, 16, 73, 4, 64, 35, 47, 65, 2, 116, 34, 2, 32, 0, 106, 32, 1, 32, 2, 65, 3, 106, 106, 45, 0, 0, 32, 1, 32, 2, 106, 45, 0, 0, 65, 24, 116, 32, 1, 32, 2, 65, 1, 106, 106, 45, 0, 0, 65, 16, 116, 114, 32, 1, 32, 2, 65, 2, 106, 106, 45, 0, 0, 65, 8, 116, 114, 114, 54, 2, 0, 35, 47, 65, 1, 106, 36, 47, 12, 1, 11, 11, 65, 16, 36, 47, 3, 64, 35, 47, 65, 192, 0, 73, 4, 64, 32, 0, 35, 47, 65, 2, 116, 106, 32, 0, 35, 47, 65, 16, 107, 65, 2, 116, 106, 40, 2, 0, 32, 0, 35, 47, 65, 7, 107, 65, 2, 116, 106, 40, 2, 0, 32, 0, 35, 47, 65, 2, 107, 65, 2, 116, 106, 40, 2, 0, 34, 1, 65, 17, 120, 32, 1, 65, 19, 120, 115, 32, 1, 65, 10, 118, 115, 106, 32, 0, 35, 47, 65, 15, 107, 65, 2, 116, 106, 40, 2, 0, 34, 1, 65, 7, 120, 32, 1, 65, 18, 120, 115, 32, 1, 65, 3, 118, 115, 106, 106, 54, 2, 0, 35, 47, 65, 1, 106, 36, 47, 12, 1, 11, 11, 65, 0, 36, 47, 3, 64, 35, 47, 65, 192, 0, 73, 4, 64, 35, 47, 65, 2, 116, 34, 1, 32, 0, 106, 40, 2, 0, 32, 1, 35, 29, 106, 40, 2, 0, 35, 46, 35, 43, 34, 1, 65, 6, 120, 32, 1, 65, 11, 120, 115, 32, 1, 65, 25, 120, 115, 106, 35, 43, 34, 1, 35, 44, 113, 35, 45, 32, 1, 65, 127, 115, 113, 115, 106, 106, 106, 36, 48, 35, 39, 34, 1, 65, 2, 120, 32, 1, 65, 13, 120, 115, 32, 1, 65, 22, 120, 115, 35, 40, 34, 2, 35, 41, 34, 3, 113, 35, 39, 34, 1, 32, 2, 113, 32, 1, 32, 3, 113, 115, 115, 106, 36, 49, 35, 45, 36, 46, 35, 44, 36, 45, 35, 43, 36, 44, 35, 42, 35, 48, 106, 36, 43, 35, 41, 36, 42, 35, 40, 36, 41, 35, 39, 36, 40, 35, 48, 35, 49, 106, 36, 39, 35, 47, 65, 1, 106, 36, 47, 12, 1, 11, 11, 35, 31, 35, 39, 106, 36, 31, 35, 32, 35, 40, 106, 36, 32, 35, 33, 35, 41, 106, 36, 33, 35, 34, 35, 42, 106, 36, 34, 35, 35, 35, 43, 106, 36, 35, 35, 36, 35, 44, 106, 36, 36, 35, 37, 35, 45, 106, 36, 37, 35, 38, 35, 46, 106, 36, 38, 11, 174, 1, 1, 2, 127, 35, 59, 32, 1, 106, 36, 59, 35, 58, 4, 64, 65, 192, 0, 35, 58, 107, 34, 2, 32, 1, 76, 4, 64, 35, 51, 35, 58, 106, 32, 0, 32, 2, 252, 10, 0, 0, 35, 58, 32, 2, 106, 36, 58, 65, 192, 0, 35, 58, 107, 33, 2, 32, 1, 65, 192, 0, 35, 58, 107, 107, 33, 1, 35, 53, 35, 51, 16, 23, 65, 0, 36, 58, 5, 35, 51, 35, 58, 106, 32, 0, 32, 1, 252, 10, 0, 0, 35, 58, 32, 1, 106, 36, 58, 15, 11, 11, 3, 64, 32, 3, 32, 1, 65, 192, 0, 109, 72, 4, 64, 35, 53, 32, 0, 32, 2, 106, 16, 23, 32, 3, 65, 1, 106, 33, 3, 32, 2, 65, 64, 107, 33, 2, 12, 1, 11, 11, 32, 1, 65, 63, 113, 34, 1, 4, 64, 35, 51, 35, 58, 106, 32, 0, 32, 2, 106, 32, 1, 252, 10, 0, 0, 35, 58, 32, 1, 106, 36, 58, 11, 11, 231, 1, 1, 2, 127, 35, 51, 35, 58, 106, 65, 128, 1, 58, 0, 0, 35, 58, 65, 1, 106, 36, 58, 35, 58, 65, 56, 74, 4, 64, 35, 51, 35, 58, 106, 34, 1, 65, 192, 0, 35, 58, 107, 106, 33, 2, 3, 64, 32, 1, 32, 2, 73, 4, 64, 32, 1, 65, 0, 58, 0, 0, 32, 1, 65, 1, 106, 33, 1, 12, 1, 11, 11, 35, 53, 35, 51, 16, 23, 65, 0, 36, 58, 11, 35, 51, 35, 58, 106, 34, 1, 65, 56, 35, 58, 107, 106, 33, 2, 3, 64, 32, 1, 32, 2, 73, 4, 64, 32, 1, 65, 0, 58, 0, 0, 32, 1, 65, 1, 106, 33, 1, 12, 1, 11, 11, 35, 51, 35, 59, 65, 128, 128, 128, 128, 2, 109, 16, 18, 54, 2, 56, 35, 51, 35, 59, 65, 3, 116, 16, 18, 54, 2, 60, 35, 53, 35, 51, 16, 23, 32, 0, 35, 31, 16, 18, 54, 2, 0, 32, 0, 35, 32, 16, 18, 54, 2, 4, 32, 0, 35, 33, 16, 18, 54, 2, 8, 32, 0, 35, 34, 16, 18, 54, 2, 12, 32, 0, 35, 35, 16, 18, 54, 2, 16, 32, 0, 35, 36, 16, 18, 54, 2, 20, 32, 0, 35, 37, 16, 18, 54, 2, 24, 32, 0, 35, 38, 16, 18, 54, 2, 28, 11, 14, 0, 16, 22, 35, 55, 32, 0, 16, 24, 35, 57, 16, 25, 11, 253, 1, 1, 2, 127, 35, 31, 36, 39, 35, 32, 36, 40, 35, 33, 36, 41, 35, 34, 36, 42, 35, 35, 36, 43, 35, 36, 36, 44, 35, 37, 36, 45, 35, 38, 36, 46, 65, 0, 36, 47, 3, 64, 35, 47, 65, 192, 0, 73, 4, 64, 32, 0, 35, 47, 65, 2, 116, 106, 40, 2, 0, 35, 46, 35, 43, 34, 1, 65, 6, 120, 32, 1, 65, 11, 120, 115, 32, 1, 65, 25, 120, 115, 106, 35, 43, 34, 1, 35, 44, 113, 35, 45, 32, 1, 65, 127, 115, 113, 115, 106, 106, 36, 48, 35, 39, 34, 1, 65, 2, 120, 32, 1, 65, 13, 120, 115, 32, 1, 65, 22, 120, 115, 35, 40, 34, 2, 35, 41, 34, 1, 113, 32, 2, 35, 39, 34, 2, 113, 32, 1, 32, 2, 113, 115, 115, 106, 36, 49, 35, 45, 36, 46, 35, 44, 36, 45, 35, 43, 36, 44, 35, 42, 35, 48, 106, 36, 43, 35, 41, 36, 42, 35, 40, 36, 41, 35, 39, 36, 40, 35, 48, 35, 49, 106, 36, 39, 35, 47, 65, 1, 106, 36, 47, 12, 1, 11, 11, 35, 31, 35, 39, 106, 36, 31, 35, 32, 35, 40, 106, 36, 32, 35, 33, 35, 41, 106, 36, 33, 35, 34, 35, 42, 106, 36, 34, 35, 35, 35, 43, 106, 36, 35, 35, 36, 35, 44, 106, 36, 36, 35, 37, 35, 45, 106, 36, 37, 35, 38, 35, 46, 106, 36, 38, 11, 86, 0, 16, 22, 35, 53, 32, 0, 16, 23, 35, 30, 16, 27, 32, 1, 35, 31, 16, 18, 54, 2, 0, 32, 1, 35, 32, 16, 18, 54, 2, 4, 32, 1, 35, 33, 16, 18, 54, 2, 8, 32, 1, 35, 34, 16, 18, 54, 2, 12, 32, 1, 35, 35, 16, 18, 54, 2, 16, 32, 1, 35, 36, 16, 18, 54, 2, 20, 32, 1, 35, 37, 16, 18, 54, 2, 24, 32, 1, 35, 38, 16, 18, 54, 2, 28, 11, 63, 0, 16, 16, 65, 196, 10, 40, 2, 0, 36, 29, 65, 148, 13, 40, 2, 0, 36, 30, 65, 192, 0, 16, 11, 36, 50, 35, 50, 36, 51, 65, 128, 8, 16, 11, 36, 52, 35, 52, 36, 53, 65, 128, 4, 16, 11, 36, 54, 35, 54, 36, 55, 65, 32, 16, 11, 36, 56, 35, 56, 36, 57, 11, 11, 141, 12, 38, 0, 65, 140, 8, 11, 2, 28, 1, 0, 65, 152, 8, 11, 136, 2, 1, 0, 0, 0, 0, 1, 0, 0, 152, 47, 138, 66, 145, 68, 55, 113, 207, 251, 192, 181, 165, 219, 181, 233, 91, 194, 86, 57, 241, 17, 241, 89, 164, 130, 63, 146, 213, 94, 28, 171, 152, 170, 7, 216, 1, 91, 131, 18, 190, 133, 49, 36, 195, 125, 12, 85, 116, 93, 190, 114, 254, 177, 222, 128, 167, 6, 220, 155, 116, 241, 155, 193, 193, 105, 155, 228, 134, 71, 190, 239, 198, 157, 193, 15, 204, 161, 12, 36, 111, 44, 233, 45, 170, 132, 116, 74, 220, 169, 176, 92, 218, 136, 249, 118, 82, 81, 62, 152, 109, 198, 49, 168, 200, 39, 3, 176, 199, 127, 89, 191, 243, 11, 224, 198, 71, 145, 167, 213, 81, 99, 202, 6, 103, 41, 41, 20, 133, 10, 183, 39, 56, 33, 27, 46, 252, 109, 44, 77, 19, 13, 56, 83, 84, 115, 10, 101, 187, 10, 106, 118, 46, 201, 194, 129, 133, 44, 114, 146, 161, 232, 191, 162, 75, 102, 26, 168, 112, 139, 75, 194, 163, 81, 108, 199, 25, 232, 146, 209, 36, 6, 153, 214, 133, 53, 14, 244, 112, 160, 106, 16, 22, 193, 164, 25, 8, 108, 55, 30, 76, 119, 72, 39, 181, 188, 176, 52, 179, 12, 28, 57, 74, 170, 216, 78, 79, 202, 156, 91, 243, 111, 46, 104, 238, 130, 143, 116, 111, 99, 165, 120, 20, 120, 200, 132, 8, 2, 199, 140, 250, 255, 190, 144, 235, 108, 80, 164, 247, 163, 249, 190, 242, 120, 113, 198, 0, 65, 172, 10, 11, 1, 44, 0, 65, 184, 10, 11, 21, 4, 0, 0, 0, 16, 0, 0, 0, 32, 4, 0, 0, 32, 4, 0, 0, 0, 1, 0, 0, 64, 0, 65, 220, 10, 11, 2, 28, 1, 0, 65, 232, 10, 11, 136, 2, 1, 0, 0, 0, 0, 1, 0, 0, 152, 47, 138, 194, 145, 68, 55, 113, 207, 251, 192, 181, 165, 219, 181, 233, 91, 194, 86, 57, 241, 17, 241, 89, 164, 130, 63, 146, 213, 94, 28, 171, 152, 170, 7, 216, 1, 91, 131, 18, 190, 133, 49, 36, 195, 125, 12, 85, 116, 93, 190, 114, 254, 177, 222, 128, 167, 6, 220, 155, 116, 243, 155, 193, 193, 105, 155, 100, 134, 71, 254, 240, 198, 237, 225, 15, 84, 242, 12, 36, 111, 52, 233, 79, 190, 132, 201, 108, 30, 65, 185, 97, 250, 136, 249, 22, 82, 81, 198, 242, 109, 90, 142, 168, 101, 252, 25, 176, 199, 158, 217, 185, 195, 49, 18, 154, 160, 234, 14, 231, 43, 35, 177, 253, 176, 62, 53, 199, 213, 186, 105, 48, 95, 109, 151, 203, 143, 17, 15, 90, 253, 238, 30, 220, 137, 182, 53, 10, 4, 122, 11, 222, 157, 202, 244, 88, 22, 91, 93, 225, 134, 62, 127, 0, 128, 137, 8, 55, 50, 234, 7, 165, 55, 149, 171, 111, 16, 97, 64, 23, 241, 214, 140, 13, 109, 59, 170, 205, 55, 190, 187, 192, 218, 59, 97, 131, 99, 163, 72, 219, 49, 233, 2, 11, 167, 92, 209, 111, 202, 250, 26, 82, 49, 132, 51, 49, 149, 26, 212, 110, 144, 120, 67, 109, 242, 145, 156, 195, 189, 171, 204, 158, 230, 160, 201, 181, 60, 182, 47, 83, 198, 65, 199, 210, 163, 126, 35, 7, 104, 75, 149, 164, 118, 29, 25, 76, 0, 65, 252, 12, 11, 1, 44, 0, 65, 136, 13, 11, 21, 4, 0, 0, 0, 16, 0, 0, 0, 112, 5, 0, 0, 112, 5, 0, 0, 0, 1, 0, 0, 64, 0, 65, 172, 13, 11, 1, 44, 0, 65, 184, 13, 11, 35, 2, 0, 0, 0, 28, 0, 0, 0, 73, 0, 110, 0, 118, 0, 97, 0, 108, 0, 105, 0, 100, 0, 32, 0, 108, 0, 101, 0, 110, 0, 103, 0, 116, 0, 104, 0, 65, 220, 13, 11, 1, 60, 0, 65, 232, 13, 11, 45, 2, 0, 0, 0, 38, 0, 0, 0, 126, 0, 108, 0, 105, 0, 98, 0, 47, 0, 97, 0, 114, 0, 114, 0, 97, 0, 121, 0, 98, 0, 117, 0, 102, 0, 102, 0, 101, 0, 114, 0, 46, 0, 116, 0, 115, 0, 65, 156, 14, 11, 1, 60, 0, 65, 168, 14, 11, 47, 2, 0, 0, 0, 40, 0, 0, 0, 65, 0, 108, 0, 108, 0, 111, 0, 99, 0, 97, 0, 116, 0, 105, 0, 111, 0, 110, 0, 32, 0, 116, 0, 111, 0, 111, 0, 32, 0, 108, 0, 97, 0, 114, 0, 103, 0, 101, 0, 65, 220, 14, 11, 1, 60, 0, 65, 232, 14, 11, 37, 2, 0, 0, 0, 30, 0, 0, 0, 126, 0, 108, 0, 105, 0, 98, 0, 47, 0, 114, 0, 116, 0, 47, 0, 116, 0, 99, 0, 109, 0, 115, 0, 46, 0, 116, 0, 115, 0, 65, 156, 15, 11, 1, 60, 0, 65, 168, 15, 11, 37, 2, 0, 0, 0, 30, 0, 0, 0, 126, 0, 108, 0, 105, 0, 98, 0, 47, 0, 114, 0, 116, 0, 47, 0, 116, 0, 108, 0, 115, 0, 102, 0, 46, 0, 116, 0, 115, 0, 65, 252, 15, 11, 1, 60, 0, 65, 136, 16, 11, 43, 2, 0, 0, 0, 36, 0, 0, 0, 73, 0, 110, 0, 100, 0, 101, 0, 120, 0, 32, 0, 111, 0, 117, 0, 116, 0, 32, 0, 111, 0, 102, 0, 32, 0, 114, 0, 97, 0, 110, 0, 103, 0, 101, 0, 65, 188, 16, 11, 1, 44, 0, 65, 200, 16, 11, 33, 2, 0, 0, 0, 26, 0, 0, 0, 126, 0, 108, 0, 105, 0, 98, 0, 47, 0, 97, 0, 114, 0, 114, 0, 97, 0, 121, 0, 46, 0, 116, 0, 115, 0, 65, 236, 16, 11, 1, 124, 0, 65, 248, 16, 11, 107, 2, 0, 0, 0, 100, 0, 0, 0, 116, 0, 111, 0, 83, 0, 116, 0, 114, 0, 105, 0, 110, 0, 103, 0, 40, 0, 41, 0, 32, 0, 114, 0, 97, 0, 100, 0, 105, 0, 120, 0, 32, 0, 97, 0, 114, 0, 103, 0, 117, 0, 109, 0, 101, 0, 110, 0, 116, 0, 32, 0, 109, 0, 117, 0, 115, 0, 116, 0, 32, 0, 98, 0, 101, 0, 32, 0, 98, 0, 101, 0, 116, 0, 119, 0, 101, 0, 101, 0, 110, 0, 32, 0, 50, 0, 32, 0, 97, 0, 110, 0, 100, 0, 32, 0, 51, 0, 54, 0, 65, 236, 17, 11, 1, 60, 0, 65, 248, 17, 11, 45, 2, 0, 0, 0, 38, 0, 0, 0, 126, 0, 108, 0, 105, 0, 98, 0, 47, 0, 117, 0, 116, 0, 105, 0, 108, 0, 47, 0, 110, 0, 117, 0, 109, 0, 98, 0, 101, 0, 114, 0, 46, 0, 116, 0, 115, 0, 65, 172, 18, 11, 1, 28, 0, 65, 184, 18, 11, 9, 2, 0, 0, 0, 2, 0, 0, 0, 48, 0, 65, 204, 18, 11, 1, 92, 0, 65, 216, 18, 11, 79, 2, 0, 0, 0, 72, 0, 0, 0, 48, 0, 49, 0, 50, 0, 51, 0, 52, 0, 53, 0, 54, 0, 55, 0, 56, 0, 57, 0, 97, 0, 98, 0, 99, 0, 100, 0, 101, 0, 102, 0, 103, 0, 104, 0, 105, 0, 106, 0, 107, 0, 108, 0, 109, 0, 110, 0, 111, 0, 112, 0, 113, 0, 114, 0, 115, 0, 116, 0, 117, 0, 118, 0, 119, 0, 120, 0, 121, 0, 122, 0, 65, 172, 19, 11, 1, 92, 0, 65, 184, 19, 11, 79, 2, 0, 0, 0, 72, 0, 0, 0, 115, 0, 101, 0, 116, 0, 86, 0, 49, 0, 50, 0, 56, 0, 58, 0, 32, 0, 101, 0, 120, 0, 112, 0, 101, 0, 99, 0, 116, 0, 32, 0, 105, 0, 32, 0, 102, 0, 114, 0, 111, 0, 109, 0, 32, 0, 48, 0, 32, 0, 116, 0, 111, 0, 32, 0, 54, 0, 51, 0, 44, 0, 32, 0, 103, 0, 111, 0, 116, 0, 32, 0, 65, 140, 20, 11, 1, 28, 0, 65, 152, 20, 11, 1, 2, 0, 65, 172, 20, 11, 1, 60, 0, 65, 184, 20, 11, 51, 2, 0, 0, 0, 44, 0, 0, 0, 97, 0, 115, 0, 115, 0, 101, 0, 109, 0, 98, 0, 108, 0, 121, 0, 47, 0, 117, 0, 116, 0, 105, 0, 108, 0, 115, 0, 47, 0, 118, 0, 49, 0, 50, 0, 56, 0, 46, 0, 116, 0, 115, 0, 65, 236, 20, 11, 1, 92, 0, 65, 248, 20, 11, 79, 2, 0, 0, 0, 72, 0, 0, 0, 103, 0, 101, 0, 116, 0, 86, 0, 49, 0, 50, 0, 56, 0, 58, 0, 32, 0, 101, 0, 120, 0, 112, 0, 101, 0, 99, 0, 116, 0, 32, 0, 105, 0, 32, 0, 102, 0, 114, 0, 111, 0, 109, 0, 32, 0, 48, 0, 32, 0, 116, 0, 111, 0, 32, 0, 54, 0, 51, 0, 44, 0, 32, 0, 103, 0, 111, 0, 116, 0, 32]);

// node_modules/@chainsafe/as-sha256/lib/wasm.js
var importObj = {
  env: {
    // modified from https://github.com/AssemblyScript/assemblyscript/blob/v0.9.2/lib/loader/index.js#L70
    abort: (msg, file, line, col) => {
      throw Error(`abort: ${msg}:${file}:${line}:${col}`);
    }
  }
};
function newInstance(useSimd) {
  const enableSimd = useSimd !== void 0 ? useSimd : WebAssembly.validate(wasmSimdCode);
  return enableSimd ? new WebAssembly.Instance(new WebAssembly.Module(wasmSimdCode), importObj).exports : new WebAssembly.Instance(new WebAssembly.Module(wasmCode), importObj).exports;
}

// node_modules/@chainsafe/as-sha256/lib/index.js
var ctx;
var simdEnabled;
var wasmInputValue;
var wasmOutputValue;
var inputUint8Array;
var outputUint8Array;
var outputUint8Array32;
var inputUint32Array;
function reinitializeInstance(useSimd) {
  ctx = newInstance(useSimd);
  simdEnabled = Boolean(ctx.HAS_SIMD.valueOf());
  wasmInputValue = ctx.input.value;
  wasmOutputValue = ctx.output.value;
  inputUint8Array = new Uint8Array(ctx.memory.buffer, wasmInputValue, ctx.INPUT_LENGTH);
  outputUint8Array = new Uint8Array(ctx.memory.buffer, wasmOutputValue, ctx.PARALLEL_FACTOR * 32);
  outputUint8Array32 = new Uint8Array(ctx.memory.buffer, wasmOutputValue, 32);
  inputUint32Array = new Uint32Array(ctx.memory.buffer, wasmInputValue, ctx.INPUT_LENGTH);
}
reinitializeInstance();
function digest2(data) {
  if (data.length === 64) {
    return digest64(data);
  }
  if (data.length <= ctx.INPUT_LENGTH) {
    inputUint8Array.set(data);
    ctx.digest(data.length);
    return allocDigest();
  }
  ctx.init();
  update(data);
  return final();
}
function digest64(data) {
  if (data.length === 64) {
    inputUint8Array.set(data);
    ctx.digest64(wasmInputValue, wasmOutputValue);
    return allocDigest();
  }
  throw new Error("InvalidLengthForDigest64");
}
function update(data) {
  const inputLength = ctx.INPUT_LENGTH;
  if (data.length > inputLength) {
    for (let i2 = 0; i2 < data.length; i2 += inputLength) {
      const sliced = data.subarray(i2, i2 + inputLength);
      inputUint8Array.set(sliced);
      ctx.update(wasmInputValue, sliced.length);
    }
  } else {
    inputUint8Array.set(data);
    ctx.update(wasmInputValue, data.length);
  }
}
function final() {
  ctx.final(wasmOutputValue);
  return allocDigest();
}
function allocDigest() {
  const out = allocUnsafe2(32);
  out.set(outputUint8Array32);
  return out;
}

// node_modules/wherearewe/src/index.js
var import_is_electron = __toESM(require_is_electron(), 1);
var isEnvWithDom = typeof window === "object" && typeof document === "object" && document.nodeType === 9;
var isElectron = (0, import_is_electron.default)();
var isElectronMain = isElectron && !isEnvWithDom;
var isNode2 = typeof globalThis.process !== "undefined" && typeof globalThis.process.release !== "undefined" && globalThis.process.release.name === "node" && !isElectron;
var isWebWorker = typeof importScripts === "function" && typeof self !== "undefined" && typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
var isTest = typeof globalThis.process !== "undefined" && typeof globalThis.process.env !== "undefined" && globalThis.process.env["NODE" + /* @__PURE__ */ (() => "_")() + "ENV"] === "test";
var isReactNative = typeof navigator !== "undefined" && navigator.product === "ReactNative";

// node_modules/@noble/ciphers/esm/utils.js
function isBytes2(a2) {
  return a2 instanceof Uint8Array || ArrayBuffer.isView(a2) && a2.constructor.name === "Uint8Array";
}
function abool2(b) {
  if (typeof b !== "boolean")
    throw new Error(`boolean expected, not ${b}`);
}
function anumber2(n2) {
  if (!Number.isSafeInteger(n2) || n2 < 0)
    throw new Error("positive integer expected, got " + n2);
}
function abytes2(b, ...lengths) {
  if (!isBytes2(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
}
function aexists2(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput2(out, instance) {
  abytes2(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
function u32(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean2(...arrays) {
  for (let i2 = 0; i2 < arrays.length; i2++) {
    arrays[i2].fill(0);
  }
}
function createView2(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
var isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  else if (isBytes2(data))
    data = copyBytes2(data);
  else
    throw new Error("Uint8Array expected, got " + typeof data);
  return data;
}
function checkOpts(defaults, opts) {
  if (opts == null || typeof opts !== "object")
    throw new Error("options must be defined");
  const merged = Object.assign(defaults, opts);
  return merged;
}
function equalBytes(a2, b) {
  if (a2.length !== b.length)
    return false;
  let diff = 0;
  for (let i2 = 0; i2 < a2.length; i2++)
    diff |= a2[i2] ^ b[i2];
  return diff === 0;
}
var wrapCipher = /* @__NO_SIDE_EFFECTS__ */ (params, constructor) => {
  function wrappedCipher(key, ...args) {
    abytes2(key);
    if (!isLE)
      throw new Error("Non little-endian hardware is not yet supported");
    if (params.nonceLength !== void 0) {
      const nonce = args[0];
      if (!nonce)
        throw new Error("nonce / iv required");
      if (params.varSizeNonce)
        abytes2(nonce);
      else
        abytes2(nonce, params.nonceLength);
    }
    const tagl = params.tagLength;
    if (tagl && args[1] !== void 0) {
      abytes2(args[1]);
    }
    const cipher = constructor(key, ...args);
    const checkOutput = (fnLength, output) => {
      if (output !== void 0) {
        if (fnLength !== 2)
          throw new Error("cipher output not supported");
        abytes2(output);
      }
    };
    let called = false;
    const wrCipher = {
      encrypt(data, output) {
        if (called)
          throw new Error("cannot encrypt() twice with same key + nonce");
        called = true;
        abytes2(data);
        checkOutput(cipher.encrypt.length, output);
        return cipher.encrypt(data, output);
      },
      decrypt(data, output) {
        abytes2(data);
        if (tagl && data.length < tagl)
          throw new Error("invalid ciphertext length: smaller than tagLength=" + tagl);
        checkOutput(cipher.decrypt.length, output);
        return cipher.decrypt(data, output);
      }
    };
    return wrCipher;
  }
  Object.assign(wrappedCipher, params);
  return wrappedCipher;
};
function getOutput(expectedLength, out, onlyAligned = true) {
  if (out === void 0)
    return new Uint8Array(expectedLength);
  if (out.length !== expectedLength)
    throw new Error("invalid output length, expected " + expectedLength + ", got: " + out.length);
  if (onlyAligned && !isAligned32(out))
    throw new Error("invalid output, must be aligned");
  return out;
}
function setBigUint64(view, byteOffset, value2, isLE2) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value2, isLE2);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value2 >> _32n2 & _u32_max);
  const wl = Number(value2 & _u32_max);
  const h = isLE2 ? 4 : 0;
  const l2 = isLE2 ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE2);
  view.setUint32(byteOffset + l2, wl, isLE2);
}
function u64Lengths(dataLength, aadLength, isLE2) {
  abool2(isLE2);
  const num = new Uint8Array(16);
  const view = createView2(num);
  setBigUint64(view, 0, BigInt(aadLength), isLE2);
  setBigUint64(view, 8, BigInt(dataLength), isLE2);
  return num;
}
function isAligned32(bytes) {
  return bytes.byteOffset % 4 === 0;
}
function copyBytes2(bytes) {
  return Uint8Array.from(bytes);
}

// node_modules/@noble/ciphers/esm/_arx.js
var _utf8ToBytes = (str) => Uint8Array.from(str.split("").map((c2) => c2.charCodeAt(0)));
var sigma16 = _utf8ToBytes("expand 16-byte k");
var sigma32 = _utf8ToBytes("expand 32-byte k");
var sigma16_32 = u32(sigma16);
var sigma32_32 = u32(sigma32);
function rotl(a2, b) {
  return a2 << b | a2 >>> 32 - b;
}
function isAligned322(b) {
  return b.byteOffset % 4 === 0;
}
var BLOCK_LEN = 64;
var BLOCK_LEN32 = 16;
var MAX_COUNTER = 2 ** 32 - 1;
var U32_EMPTY = new Uint32Array();
function runCipher(core, sigma, key, nonce, data, output, counter, rounds) {
  const len = data.length;
  const block = new Uint8Array(BLOCK_LEN);
  const b32 = u32(block);
  const isAligned = isAligned322(data) && isAligned322(output);
  const d32 = isAligned ? u32(data) : U32_EMPTY;
  const o32 = isAligned ? u32(output) : U32_EMPTY;
  for (let pos = 0; pos < len; counter++) {
    core(sigma, key, nonce, b32, counter, rounds);
    if (counter >= MAX_COUNTER)
      throw new Error("arx: counter overflow");
    const take2 = Math.min(BLOCK_LEN, len - pos);
    if (isAligned && take2 === BLOCK_LEN) {
      const pos32 = pos / 4;
      if (pos % 4 !== 0)
        throw new Error("arx: invalid block position");
      for (let j = 0, posj; j < BLOCK_LEN32; j++) {
        posj = pos32 + j;
        o32[posj] = d32[posj] ^ b32[j];
      }
      pos += BLOCK_LEN;
      continue;
    }
    for (let j = 0, posj; j < take2; j++) {
      posj = pos + j;
      output[posj] = data[posj] ^ block[j];
    }
    pos += take2;
  }
}
function createCipher(core, opts) {
  const { allowShortKeys, extendNonceFn, counterLength, counterRight, rounds } = checkOpts({ allowShortKeys: false, counterLength: 8, counterRight: false, rounds: 20 }, opts);
  if (typeof core !== "function")
    throw new Error("core must be a function");
  anumber2(counterLength);
  anumber2(rounds);
  abool2(counterRight);
  abool2(allowShortKeys);
  return (key, nonce, data, output, counter = 0) => {
    abytes2(key);
    abytes2(nonce);
    abytes2(data);
    const len = data.length;
    if (output === void 0)
      output = new Uint8Array(len);
    abytes2(output);
    anumber2(counter);
    if (counter < 0 || counter >= MAX_COUNTER)
      throw new Error("arx: counter overflow");
    if (output.length < len)
      throw new Error(`arx: output (${output.length}) is shorter than data (${len})`);
    const toClean = [];
    let l2 = key.length;
    let k;
    let sigma;
    if (l2 === 32) {
      toClean.push(k = copyBytes2(key));
      sigma = sigma32_32;
    } else if (l2 === 16 && allowShortKeys) {
      k = new Uint8Array(32);
      k.set(key);
      k.set(key, 16);
      sigma = sigma16_32;
      toClean.push(k);
    } else {
      throw new Error(`arx: invalid 32-byte key, got length=${l2}`);
    }
    if (!isAligned322(nonce))
      toClean.push(nonce = copyBytes2(nonce));
    const k32 = u32(k);
    if (extendNonceFn) {
      if (nonce.length !== 24)
        throw new Error(`arx: extended nonce must be 24 bytes`);
      extendNonceFn(sigma, k32, u32(nonce.subarray(0, 16)), k32);
      nonce = nonce.subarray(16);
    }
    const nonceNcLen = 16 - counterLength;
    if (nonceNcLen !== nonce.length)
      throw new Error(`arx: nonce must be ${nonceNcLen} or 16 bytes`);
    if (nonceNcLen !== 12) {
      const nc2 = new Uint8Array(12);
      nc2.set(nonce, counterRight ? 0 : 12 - nonce.length);
      nonce = nc2;
      toClean.push(nonce);
    }
    const n32 = u32(nonce);
    runCipher(core, sigma, k32, n32, data, output, counter, rounds);
    clean2(...toClean);
    return output;
  };
}

// node_modules/@noble/ciphers/esm/_poly1305.js
var u8to16 = (a2, i2) => a2[i2++] & 255 | (a2[i2++] & 255) << 8;
var Poly1305 = class {
  constructor(key) {
    this.blockLen = 16;
    this.outputLen = 16;
    this.buffer = new Uint8Array(16);
    this.r = new Uint16Array(10);
    this.h = new Uint16Array(10);
    this.pad = new Uint16Array(8);
    this.pos = 0;
    this.finished = false;
    key = toBytes(key);
    abytes2(key, 32);
    const t0 = u8to16(key, 0);
    const t1 = u8to16(key, 2);
    const t2 = u8to16(key, 4);
    const t3 = u8to16(key, 6);
    const t4 = u8to16(key, 8);
    const t5 = u8to16(key, 10);
    const t6 = u8to16(key, 12);
    const t7 = u8to16(key, 14);
    this.r[0] = t0 & 8191;
    this.r[1] = (t0 >>> 13 | t1 << 3) & 8191;
    this.r[2] = (t1 >>> 10 | t2 << 6) & 7939;
    this.r[3] = (t2 >>> 7 | t3 << 9) & 8191;
    this.r[4] = (t3 >>> 4 | t4 << 12) & 255;
    this.r[5] = t4 >>> 1 & 8190;
    this.r[6] = (t4 >>> 14 | t5 << 2) & 8191;
    this.r[7] = (t5 >>> 11 | t6 << 5) & 8065;
    this.r[8] = (t6 >>> 8 | t7 << 8) & 8191;
    this.r[9] = t7 >>> 5 & 127;
    for (let i2 = 0; i2 < 8; i2++)
      this.pad[i2] = u8to16(key, 16 + 2 * i2);
  }
  process(data, offset, isLast = false) {
    const hibit = isLast ? 0 : 1 << 11;
    const { h, r: r2 } = this;
    const r0 = r2[0];
    const r1 = r2[1];
    const r22 = r2[2];
    const r3 = r2[3];
    const r4 = r2[4];
    const r5 = r2[5];
    const r6 = r2[6];
    const r7 = r2[7];
    const r8 = r2[8];
    const r9 = r2[9];
    const t0 = u8to16(data, offset + 0);
    const t1 = u8to16(data, offset + 2);
    const t2 = u8to16(data, offset + 4);
    const t3 = u8to16(data, offset + 6);
    const t4 = u8to16(data, offset + 8);
    const t5 = u8to16(data, offset + 10);
    const t6 = u8to16(data, offset + 12);
    const t7 = u8to16(data, offset + 14);
    let h0 = h[0] + (t0 & 8191);
    let h1 = h[1] + ((t0 >>> 13 | t1 << 3) & 8191);
    let h2 = h[2] + ((t1 >>> 10 | t2 << 6) & 8191);
    let h3 = h[3] + ((t2 >>> 7 | t3 << 9) & 8191);
    let h4 = h[4] + ((t3 >>> 4 | t4 << 12) & 8191);
    let h5 = h[5] + (t4 >>> 1 & 8191);
    let h6 = h[6] + ((t4 >>> 14 | t5 << 2) & 8191);
    let h7 = h[7] + ((t5 >>> 11 | t6 << 5) & 8191);
    let h8 = h[8] + ((t6 >>> 8 | t7 << 8) & 8191);
    let h9 = h[9] + (t7 >>> 5 | hibit);
    let c2 = 0;
    let d0 = c2 + h0 * r0 + h1 * (5 * r9) + h2 * (5 * r8) + h3 * (5 * r7) + h4 * (5 * r6);
    c2 = d0 >>> 13;
    d0 &= 8191;
    d0 += h5 * (5 * r5) + h6 * (5 * r4) + h7 * (5 * r3) + h8 * (5 * r22) + h9 * (5 * r1);
    c2 += d0 >>> 13;
    d0 &= 8191;
    let d1 = c2 + h0 * r1 + h1 * r0 + h2 * (5 * r9) + h3 * (5 * r8) + h4 * (5 * r7);
    c2 = d1 >>> 13;
    d1 &= 8191;
    d1 += h5 * (5 * r6) + h6 * (5 * r5) + h7 * (5 * r4) + h8 * (5 * r3) + h9 * (5 * r22);
    c2 += d1 >>> 13;
    d1 &= 8191;
    let d2 = c2 + h0 * r22 + h1 * r1 + h2 * r0 + h3 * (5 * r9) + h4 * (5 * r8);
    c2 = d2 >>> 13;
    d2 &= 8191;
    d2 += h5 * (5 * r7) + h6 * (5 * r6) + h7 * (5 * r5) + h8 * (5 * r4) + h9 * (5 * r3);
    c2 += d2 >>> 13;
    d2 &= 8191;
    let d3 = c2 + h0 * r3 + h1 * r22 + h2 * r1 + h3 * r0 + h4 * (5 * r9);
    c2 = d3 >>> 13;
    d3 &= 8191;
    d3 += h5 * (5 * r8) + h6 * (5 * r7) + h7 * (5 * r6) + h8 * (5 * r5) + h9 * (5 * r4);
    c2 += d3 >>> 13;
    d3 &= 8191;
    let d4 = c2 + h0 * r4 + h1 * r3 + h2 * r22 + h3 * r1 + h4 * r0;
    c2 = d4 >>> 13;
    d4 &= 8191;
    d4 += h5 * (5 * r9) + h6 * (5 * r8) + h7 * (5 * r7) + h8 * (5 * r6) + h9 * (5 * r5);
    c2 += d4 >>> 13;
    d4 &= 8191;
    let d5 = c2 + h0 * r5 + h1 * r4 + h2 * r3 + h3 * r22 + h4 * r1;
    c2 = d5 >>> 13;
    d5 &= 8191;
    d5 += h5 * r0 + h6 * (5 * r9) + h7 * (5 * r8) + h8 * (5 * r7) + h9 * (5 * r6);
    c2 += d5 >>> 13;
    d5 &= 8191;
    let d6 = c2 + h0 * r6 + h1 * r5 + h2 * r4 + h3 * r3 + h4 * r22;
    c2 = d6 >>> 13;
    d6 &= 8191;
    d6 += h5 * r1 + h6 * r0 + h7 * (5 * r9) + h8 * (5 * r8) + h9 * (5 * r7);
    c2 += d6 >>> 13;
    d6 &= 8191;
    let d7 = c2 + h0 * r7 + h1 * r6 + h2 * r5 + h3 * r4 + h4 * r3;
    c2 = d7 >>> 13;
    d7 &= 8191;
    d7 += h5 * r22 + h6 * r1 + h7 * r0 + h8 * (5 * r9) + h9 * (5 * r8);
    c2 += d7 >>> 13;
    d7 &= 8191;
    let d8 = c2 + h0 * r8 + h1 * r7 + h2 * r6 + h3 * r5 + h4 * r4;
    c2 = d8 >>> 13;
    d8 &= 8191;
    d8 += h5 * r3 + h6 * r22 + h7 * r1 + h8 * r0 + h9 * (5 * r9);
    c2 += d8 >>> 13;
    d8 &= 8191;
    let d9 = c2 + h0 * r9 + h1 * r8 + h2 * r7 + h3 * r6 + h4 * r5;
    c2 = d9 >>> 13;
    d9 &= 8191;
    d9 += h5 * r4 + h6 * r3 + h7 * r22 + h8 * r1 + h9 * r0;
    c2 += d9 >>> 13;
    d9 &= 8191;
    c2 = (c2 << 2) + c2 | 0;
    c2 = c2 + d0 | 0;
    d0 = c2 & 8191;
    c2 = c2 >>> 13;
    d1 += c2;
    h[0] = d0;
    h[1] = d1;
    h[2] = d2;
    h[3] = d3;
    h[4] = d4;
    h[5] = d5;
    h[6] = d6;
    h[7] = d7;
    h[8] = d8;
    h[9] = d9;
  }
  finalize() {
    const { h, pad } = this;
    const g = new Uint16Array(10);
    let c2 = h[1] >>> 13;
    h[1] &= 8191;
    for (let i2 = 2; i2 < 10; i2++) {
      h[i2] += c2;
      c2 = h[i2] >>> 13;
      h[i2] &= 8191;
    }
    h[0] += c2 * 5;
    c2 = h[0] >>> 13;
    h[0] &= 8191;
    h[1] += c2;
    c2 = h[1] >>> 13;
    h[1] &= 8191;
    h[2] += c2;
    g[0] = h[0] + 5;
    c2 = g[0] >>> 13;
    g[0] &= 8191;
    for (let i2 = 1; i2 < 10; i2++) {
      g[i2] = h[i2] + c2;
      c2 = g[i2] >>> 13;
      g[i2] &= 8191;
    }
    g[9] -= 1 << 13;
    let mask = (c2 ^ 1) - 1;
    for (let i2 = 0; i2 < 10; i2++)
      g[i2] &= mask;
    mask = ~mask;
    for (let i2 = 0; i2 < 10; i2++)
      h[i2] = h[i2] & mask | g[i2];
    h[0] = (h[0] | h[1] << 13) & 65535;
    h[1] = (h[1] >>> 3 | h[2] << 10) & 65535;
    h[2] = (h[2] >>> 6 | h[3] << 7) & 65535;
    h[3] = (h[3] >>> 9 | h[4] << 4) & 65535;
    h[4] = (h[4] >>> 12 | h[5] << 1 | h[6] << 14) & 65535;
    h[5] = (h[6] >>> 2 | h[7] << 11) & 65535;
    h[6] = (h[7] >>> 5 | h[8] << 8) & 65535;
    h[7] = (h[8] >>> 8 | h[9] << 5) & 65535;
    let f2 = h[0] + pad[0];
    h[0] = f2 & 65535;
    for (let i2 = 1; i2 < 8; i2++) {
      f2 = (h[i2] + pad[i2] | 0) + (f2 >>> 16) | 0;
      h[i2] = f2 & 65535;
    }
    clean2(g);
  }
  update(data) {
    aexists2(this);
    data = toBytes(data);
    abytes2(data);
    const { buffer, blockLen } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take2 = Math.min(blockLen - this.pos, len - pos);
      if (take2 === blockLen) {
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(data, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take2), this.pos);
      this.pos += take2;
      pos += take2;
      if (this.pos === blockLen) {
        this.process(buffer, 0, false);
        this.pos = 0;
      }
    }
    return this;
  }
  destroy() {
    clean2(this.h, this.r, this.buffer, this.pad);
  }
  digestInto(out) {
    aexists2(this);
    aoutput2(out, this);
    this.finished = true;
    const { buffer, h } = this;
    let { pos } = this;
    if (pos) {
      buffer[pos++] = 1;
      for (; pos < 16; pos++)
        buffer[pos] = 0;
      this.process(buffer, 0, true);
    }
    this.finalize();
    let opos = 0;
    for (let i2 = 0; i2 < 8; i2++) {
      out[opos++] = h[i2] >>> 0;
      out[opos++] = h[i2] >>> 8;
    }
    return out;
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
};
function wrapConstructorWithKey(hashCons) {
  const hashC = (msg, key) => hashCons(key).update(toBytes(msg)).digest();
  const tmp = hashCons(new Uint8Array(32));
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = (key) => hashCons(key);
  return hashC;
}
var poly1305 = wrapConstructorWithKey((key) => new Poly1305(key));

// node_modules/@noble/ciphers/esm/chacha.js
function chachaCore(s2, k, n2, out, cnt, rounds = 20) {
  let y00 = s2[0], y01 = s2[1], y02 = s2[2], y03 = s2[3], y04 = k[0], y05 = k[1], y06 = k[2], y07 = k[3], y08 = k[4], y09 = k[5], y10 = k[6], y11 = k[7], y12 = cnt, y13 = n2[0], y14 = n2[1], y15 = n2[2];
  let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
  for (let r2 = 0; r2 < rounds; r2 += 2) {
    x00 = x00 + x04 | 0;
    x12 = rotl(x12 ^ x00, 16);
    x08 = x08 + x12 | 0;
    x04 = rotl(x04 ^ x08, 12);
    x00 = x00 + x04 | 0;
    x12 = rotl(x12 ^ x00, 8);
    x08 = x08 + x12 | 0;
    x04 = rotl(x04 ^ x08, 7);
    x01 = x01 + x05 | 0;
    x13 = rotl(x13 ^ x01, 16);
    x09 = x09 + x13 | 0;
    x05 = rotl(x05 ^ x09, 12);
    x01 = x01 + x05 | 0;
    x13 = rotl(x13 ^ x01, 8);
    x09 = x09 + x13 | 0;
    x05 = rotl(x05 ^ x09, 7);
    x02 = x02 + x06 | 0;
    x14 = rotl(x14 ^ x02, 16);
    x10 = x10 + x14 | 0;
    x06 = rotl(x06 ^ x10, 12);
    x02 = x02 + x06 | 0;
    x14 = rotl(x14 ^ x02, 8);
    x10 = x10 + x14 | 0;
    x06 = rotl(x06 ^ x10, 7);
    x03 = x03 + x07 | 0;
    x15 = rotl(x15 ^ x03, 16);
    x11 = x11 + x15 | 0;
    x07 = rotl(x07 ^ x11, 12);
    x03 = x03 + x07 | 0;
    x15 = rotl(x15 ^ x03, 8);
    x11 = x11 + x15 | 0;
    x07 = rotl(x07 ^ x11, 7);
    x00 = x00 + x05 | 0;
    x15 = rotl(x15 ^ x00, 16);
    x10 = x10 + x15 | 0;
    x05 = rotl(x05 ^ x10, 12);
    x00 = x00 + x05 | 0;
    x15 = rotl(x15 ^ x00, 8);
    x10 = x10 + x15 | 0;
    x05 = rotl(x05 ^ x10, 7);
    x01 = x01 + x06 | 0;
    x12 = rotl(x12 ^ x01, 16);
    x11 = x11 + x12 | 0;
    x06 = rotl(x06 ^ x11, 12);
    x01 = x01 + x06 | 0;
    x12 = rotl(x12 ^ x01, 8);
    x11 = x11 + x12 | 0;
    x06 = rotl(x06 ^ x11, 7);
    x02 = x02 + x07 | 0;
    x13 = rotl(x13 ^ x02, 16);
    x08 = x08 + x13 | 0;
    x07 = rotl(x07 ^ x08, 12);
    x02 = x02 + x07 | 0;
    x13 = rotl(x13 ^ x02, 8);
    x08 = x08 + x13 | 0;
    x07 = rotl(x07 ^ x08, 7);
    x03 = x03 + x04 | 0;
    x14 = rotl(x14 ^ x03, 16);
    x09 = x09 + x14 | 0;
    x04 = rotl(x04 ^ x09, 12);
    x03 = x03 + x04 | 0;
    x14 = rotl(x14 ^ x03, 8);
    x09 = x09 + x14 | 0;
    x04 = rotl(x04 ^ x09, 7);
  }
  let oi = 0;
  out[oi++] = y00 + x00 | 0;
  out[oi++] = y01 + x01 | 0;
  out[oi++] = y02 + x02 | 0;
  out[oi++] = y03 + x03 | 0;
  out[oi++] = y04 + x04 | 0;
  out[oi++] = y05 + x05 | 0;
  out[oi++] = y06 + x06 | 0;
  out[oi++] = y07 + x07 | 0;
  out[oi++] = y08 + x08 | 0;
  out[oi++] = y09 + x09 | 0;
  out[oi++] = y10 + x10 | 0;
  out[oi++] = y11 + x11 | 0;
  out[oi++] = y12 + x12 | 0;
  out[oi++] = y13 + x13 | 0;
  out[oi++] = y14 + x14 | 0;
  out[oi++] = y15 + x15 | 0;
}
function hchacha(s2, k, i2, o32) {
  let x00 = s2[0], x01 = s2[1], x02 = s2[2], x03 = s2[3], x04 = k[0], x05 = k[1], x06 = k[2], x07 = k[3], x08 = k[4], x09 = k[5], x10 = k[6], x11 = k[7], x12 = i2[0], x13 = i2[1], x14 = i2[2], x15 = i2[3];
  for (let r2 = 0; r2 < 20; r2 += 2) {
    x00 = x00 + x04 | 0;
    x12 = rotl(x12 ^ x00, 16);
    x08 = x08 + x12 | 0;
    x04 = rotl(x04 ^ x08, 12);
    x00 = x00 + x04 | 0;
    x12 = rotl(x12 ^ x00, 8);
    x08 = x08 + x12 | 0;
    x04 = rotl(x04 ^ x08, 7);
    x01 = x01 + x05 | 0;
    x13 = rotl(x13 ^ x01, 16);
    x09 = x09 + x13 | 0;
    x05 = rotl(x05 ^ x09, 12);
    x01 = x01 + x05 | 0;
    x13 = rotl(x13 ^ x01, 8);
    x09 = x09 + x13 | 0;
    x05 = rotl(x05 ^ x09, 7);
    x02 = x02 + x06 | 0;
    x14 = rotl(x14 ^ x02, 16);
    x10 = x10 + x14 | 0;
    x06 = rotl(x06 ^ x10, 12);
    x02 = x02 + x06 | 0;
    x14 = rotl(x14 ^ x02, 8);
    x10 = x10 + x14 | 0;
    x06 = rotl(x06 ^ x10, 7);
    x03 = x03 + x07 | 0;
    x15 = rotl(x15 ^ x03, 16);
    x11 = x11 + x15 | 0;
    x07 = rotl(x07 ^ x11, 12);
    x03 = x03 + x07 | 0;
    x15 = rotl(x15 ^ x03, 8);
    x11 = x11 + x15 | 0;
    x07 = rotl(x07 ^ x11, 7);
    x00 = x00 + x05 | 0;
    x15 = rotl(x15 ^ x00, 16);
    x10 = x10 + x15 | 0;
    x05 = rotl(x05 ^ x10, 12);
    x00 = x00 + x05 | 0;
    x15 = rotl(x15 ^ x00, 8);
    x10 = x10 + x15 | 0;
    x05 = rotl(x05 ^ x10, 7);
    x01 = x01 + x06 | 0;
    x12 = rotl(x12 ^ x01, 16);
    x11 = x11 + x12 | 0;
    x06 = rotl(x06 ^ x11, 12);
    x01 = x01 + x06 | 0;
    x12 = rotl(x12 ^ x01, 8);
    x11 = x11 + x12 | 0;
    x06 = rotl(x06 ^ x11, 7);
    x02 = x02 + x07 | 0;
    x13 = rotl(x13 ^ x02, 16);
    x08 = x08 + x13 | 0;
    x07 = rotl(x07 ^ x08, 12);
    x02 = x02 + x07 | 0;
    x13 = rotl(x13 ^ x02, 8);
    x08 = x08 + x13 | 0;
    x07 = rotl(x07 ^ x08, 7);
    x03 = x03 + x04 | 0;
    x14 = rotl(x14 ^ x03, 16);
    x09 = x09 + x14 | 0;
    x04 = rotl(x04 ^ x09, 12);
    x03 = x03 + x04 | 0;
    x14 = rotl(x14 ^ x03, 8);
    x09 = x09 + x14 | 0;
    x04 = rotl(x04 ^ x09, 7);
  }
  let oi = 0;
  o32[oi++] = x00;
  o32[oi++] = x01;
  o32[oi++] = x02;
  o32[oi++] = x03;
  o32[oi++] = x12;
  o32[oi++] = x13;
  o32[oi++] = x14;
  o32[oi++] = x15;
}
var chacha20 = /* @__PURE__ */ createCipher(chachaCore, {
  counterRight: false,
  counterLength: 4,
  allowShortKeys: false
});
var xchacha20 = /* @__PURE__ */ createCipher(chachaCore, {
  counterRight: false,
  counterLength: 8,
  extendNonceFn: hchacha,
  allowShortKeys: false
});
var ZEROS16 = /* @__PURE__ */ new Uint8Array(16);
var updatePadded = (h, msg) => {
  h.update(msg);
  const left = msg.length % 16;
  if (left)
    h.update(ZEROS16.subarray(left));
};
var ZEROS32 = /* @__PURE__ */ new Uint8Array(32);
function computeTag(fn, key, nonce, data, AAD) {
  const authKey = fn(key, nonce, ZEROS32);
  const h = poly1305.create(authKey);
  if (AAD)
    updatePadded(h, AAD);
  updatePadded(h, data);
  const num = u64Lengths(data.length, AAD ? AAD.length : 0, true);
  h.update(num);
  const res = h.digest();
  clean2(authKey, num);
  return res;
}
var _poly1305_aead = (xorStream) => (key, nonce, AAD) => {
  const tagLength = 16;
  return {
    encrypt(plaintext, output) {
      const plength = plaintext.length;
      output = getOutput(plength + tagLength, output, false);
      output.set(plaintext);
      const oPlain = output.subarray(0, -tagLength);
      xorStream(key, nonce, oPlain, oPlain, 1);
      const tag = computeTag(xorStream, key, nonce, oPlain, AAD);
      output.set(tag, plength);
      clean2(tag);
      return output;
    },
    decrypt(ciphertext, output) {
      output = getOutput(ciphertext.length - tagLength, output, false);
      const data = ciphertext.subarray(0, -tagLength);
      const passedTag = ciphertext.subarray(-tagLength);
      const tag = computeTag(xorStream, key, nonce, data, AAD);
      if (!equalBytes(passedTag, tag))
        throw new Error("invalid tag");
      output.set(ciphertext.subarray(0, -tagLength));
      xorStream(key, nonce, output, output, 1);
      clean2(tag);
      return output;
    }
  };
};
var chacha20poly1305 = /* @__PURE__ */ wrapCipher({ blockSize: 64, nonceLength: 12, tagLength: 16 }, _poly1305_aead(chacha20));
var xchacha20poly1305 = /* @__PURE__ */ wrapCipher({ blockSize: 64, nonceLength: 24, tagLength: 16 }, _poly1305_aead(xchacha20));

// node_modules/@noble/hashes/esm/cryptoNode.js
var nc = __toESM(require("node:crypto"), 1);
var crypto6 = nc && typeof nc === "object" && "webcrypto" in nc ? nc.webcrypto : nc && typeof nc === "object" && "randomBytes" in nc ? nc : void 0;

// node_modules/@noble/hashes/esm/utils.js
function isBytes3(a2) {
  return a2 instanceof Uint8Array || ArrayBuffer.isView(a2) && a2.constructor.name === "Uint8Array";
}
function anumber3(n2) {
  if (!Number.isSafeInteger(n2) || n2 < 0)
    throw new Error("positive integer expected, got " + n2);
}
function abytes3(b, ...lengths) {
  if (!isBytes3(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
}
function ahash2(h) {
  if (typeof h !== "function" || typeof h.create !== "function")
    throw new Error("Hash should be wrapped by utils.createHasher");
  anumber3(h.outputLen);
  anumber3(h.blockLen);
}
function aexists3(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput3(out, instance) {
  abytes3(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
function clean3(...arrays) {
  for (let i2 = 0; i2 < arrays.length; i2++) {
    arrays[i2].fill(0);
  }
}
function createView3(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr2(word, shift) {
  return word << 32 - shift | word >>> shift;
}
var hasHexBuiltin2 = /* @__PURE__ */ (() => (
  // @ts-ignore
  typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
))();
var hexes2 = /* @__PURE__ */ Array.from({ length: 256 }, (_, i2) => i2.toString(16).padStart(2, "0"));
function bytesToHex2(bytes) {
  abytes3(bytes);
  if (hasHexBuiltin2)
    return bytes.toHex();
  let hex = "";
  for (let i2 = 0; i2 < bytes.length; i2++) {
    hex += hexes2[bytes[i2]];
  }
  return hex;
}
var asciis2 = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function asciiToBase162(ch) {
  if (ch >= asciis2._0 && ch <= asciis2._9)
    return ch - asciis2._0;
  if (ch >= asciis2.A && ch <= asciis2.F)
    return ch - (asciis2.A - 10);
  if (ch >= asciis2.a && ch <= asciis2.f)
    return ch - (asciis2.a - 10);
  return;
}
function hexToBytes2(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  if (hasHexBuiltin2)
    return Uint8Array.fromHex(hex);
  const hl = hex.length;
  const al = hl / 2;
  if (hl % 2)
    throw new Error("hex string expected, got unpadded hex of length " + hl);
  const array = new Uint8Array(al);
  for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
    const n1 = asciiToBase162(hex.charCodeAt(hi));
    const n2 = asciiToBase162(hex.charCodeAt(hi + 1));
    if (n1 === void 0 || n2 === void 0) {
      const char = hex[hi] + hex[hi + 1];
      throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
    }
    array[ai] = n1 * 16 + n2;
  }
  return array;
}
function utf8ToBytes2(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes2(data) {
  if (typeof data === "string")
    data = utf8ToBytes2(data);
  abytes3(data);
  return data;
}
function concatBytes2(...arrays) {
  let sum = 0;
  for (let i2 = 0; i2 < arrays.length; i2++) {
    const a2 = arrays[i2];
    abytes3(a2);
    sum += a2.length;
  }
  const res = new Uint8Array(sum);
  for (let i2 = 0, pad = 0; i2 < arrays.length; i2++) {
    const a2 = arrays[i2];
    res.set(a2, pad);
    pad += a2.length;
  }
  return res;
}
var Hash2 = class {
};
function createHasher2(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes2(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function randomBytes3(bytesLength = 32) {
  if (crypto6 && typeof crypto6.getRandomValues === "function") {
    return crypto6.getRandomValues(new Uint8Array(bytesLength));
  }
  if (crypto6 && typeof crypto6.randomBytes === "function") {
    return Uint8Array.from(crypto6.randomBytes(bytesLength));
  }
  throw new Error("crypto.getRandomValues must be defined");
}

// node_modules/@noble/hashes/esm/_md.js
function setBigUint642(view, byteOffset, value2, isLE2) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value2, isLE2);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value2 >> _32n2 & _u32_max);
  const wl = Number(value2 & _u32_max);
  const h = isLE2 ? 4 : 0;
  const l2 = isLE2 ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE2);
  view.setUint32(byteOffset + l2, wl, isLE2);
}
function Chi2(a2, b, c2) {
  return a2 & b ^ ~a2 & c2;
}
function Maj2(a2, b, c2) {
  return a2 & b ^ a2 & c2 ^ b & c2;
}
var HashMD2 = class extends Hash2 {
  constructor(blockLen, outputLen, padOffset, isLE2) {
    super();
    this.finished = false;
    this.length = 0;
    this.pos = 0;
    this.destroyed = false;
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE2;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView3(this.buffer);
  }
  update(data) {
    aexists3(this);
    data = toBytes2(data);
    abytes3(data);
    const { view, buffer, blockLen } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take2 = Math.min(blockLen - this.pos, len - pos);
      if (take2 === blockLen) {
        const dataView = createView3(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take2), this.pos);
      this.pos += take2;
      pos += take2;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    aexists3(this);
    aoutput3(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE: isLE2 } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    clean3(this.buffer.subarray(pos));
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i2 = pos; i2 < blockLen; i2++)
      buffer[i2] = 0;
    setBigUint642(view, blockLen - 8, BigInt(this.length * 8), isLE2);
    this.process(view, 0);
    const oview = createView3(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i2 = 0; i2 < outLen; i2++)
      oview.setUint32(4 * i2, state[i2], isLE2);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    to || (to = new this.constructor());
    to.set(...this.get());
    const { blockLen, buffer, length: length3, finished, destroyed, pos } = this;
    to.destroyed = destroyed;
    to.finished = finished;
    to.length = length3;
    to.pos = pos;
    if (length3 % blockLen)
      to.buffer.set(buffer);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
};
var SHA256_IV2 = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);
var SHA512_IV2 = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  4089235720,
  3144134277,
  2227873595,
  1013904242,
  4271175723,
  2773480762,
  1595750129,
  1359893119,
  2917565137,
  2600822924,
  725511199,
  528734635,
  4215389547,
  1541459225,
  327033209
]);

// node_modules/@noble/hashes/esm/_u64.js
var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
var _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n2, le = false) {
  if (le)
    return { h: Number(n2 & U32_MASK64), l: Number(n2 >> _32n & U32_MASK64) };
  return { h: Number(n2 >> _32n & U32_MASK64) | 0, l: Number(n2 & U32_MASK64) | 0 };
}
function split(lst, le = false) {
  const len = lst.length;
  let Ah = new Uint32Array(len);
  let Al = new Uint32Array(len);
  for (let i2 = 0; i2 < len; i2++) {
    const { h, l: l2 } = fromBig(lst[i2], le);
    [Ah[i2], Al[i2]] = [h, l2];
  }
  return [Ah, Al];
}
var shrSH = (h, _l, s2) => h >>> s2;
var shrSL = (h, l2, s2) => h << 32 - s2 | l2 >>> s2;
var rotrSH = (h, l2, s2) => h >>> s2 | l2 << 32 - s2;
var rotrSL = (h, l2, s2) => h << 32 - s2 | l2 >>> s2;
var rotrBH = (h, l2, s2) => h << 64 - s2 | l2 >>> s2 - 32;
var rotrBL = (h, l2, s2) => h >>> s2 - 32 | l2 << 64 - s2;
function add(Ah, Al, Bh, Bl) {
  const l2 = (Al >>> 0) + (Bl >>> 0);
  return { h: Ah + Bh + (l2 / 2 ** 32 | 0) | 0, l: l2 | 0 };
}
var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;

// node_modules/@noble/hashes/esm/sha2.js
var SHA256_K2 = /* @__PURE__ */ Uint32Array.from([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
var SHA256_W2 = /* @__PURE__ */ new Uint32Array(64);
var SHA2562 = class extends HashMD2 {
  constructor(outputLen = 32) {
    super(64, outputLen, 8, false);
    this.A = SHA256_IV2[0] | 0;
    this.B = SHA256_IV2[1] | 0;
    this.C = SHA256_IV2[2] | 0;
    this.D = SHA256_IV2[3] | 0;
    this.E = SHA256_IV2[4] | 0;
    this.F = SHA256_IV2[5] | 0;
    this.G = SHA256_IV2[6] | 0;
    this.H = SHA256_IV2[7] | 0;
  }
  get() {
    const { A, B, C, D, E, F, G, H } = this;
    return [A, B, C, D, E, F, G, H];
  }
  // prettier-ignore
  set(A, B, C, D, E, F, G, H) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
    this.F = F | 0;
    this.G = G | 0;
    this.H = H | 0;
  }
  process(view, offset) {
    for (let i2 = 0; i2 < 16; i2++, offset += 4)
      SHA256_W2[i2] = view.getUint32(offset, false);
    for (let i2 = 16; i2 < 64; i2++) {
      const W15 = SHA256_W2[i2 - 15];
      const W2 = SHA256_W2[i2 - 2];
      const s0 = rotr2(W15, 7) ^ rotr2(W15, 18) ^ W15 >>> 3;
      const s1 = rotr2(W2, 17) ^ rotr2(W2, 19) ^ W2 >>> 10;
      SHA256_W2[i2] = s1 + SHA256_W2[i2 - 7] + s0 + SHA256_W2[i2 - 16] | 0;
    }
    let { A, B, C, D, E, F, G, H } = this;
    for (let i2 = 0; i2 < 64; i2++) {
      const sigma1 = rotr2(E, 6) ^ rotr2(E, 11) ^ rotr2(E, 25);
      const T1 = H + sigma1 + Chi2(E, F, G) + SHA256_K2[i2] + SHA256_W2[i2] | 0;
      const sigma0 = rotr2(A, 2) ^ rotr2(A, 13) ^ rotr2(A, 22);
      const T2 = sigma0 + Maj2(A, B, C) | 0;
      H = G;
      G = F;
      F = E;
      E = D + T1 | 0;
      D = C;
      C = B;
      B = A;
      A = T1 + T2 | 0;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    F = F + this.F | 0;
    G = G + this.G | 0;
    H = H + this.H | 0;
    this.set(A, B, C, D, E, F, G, H);
  }
  roundClean() {
    clean3(SHA256_W2);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    clean3(this.buffer);
  }
};
var K512 = /* @__PURE__ */ (() => split([
  "0x428a2f98d728ae22",
  "0x7137449123ef65cd",
  "0xb5c0fbcfec4d3b2f",
  "0xe9b5dba58189dbbc",
  "0x3956c25bf348b538",
  "0x59f111f1b605d019",
  "0x923f82a4af194f9b",
  "0xab1c5ed5da6d8118",
  "0xd807aa98a3030242",
  "0x12835b0145706fbe",
  "0x243185be4ee4b28c",
  "0x550c7dc3d5ffb4e2",
  "0x72be5d74f27b896f",
  "0x80deb1fe3b1696b1",
  "0x9bdc06a725c71235",
  "0xc19bf174cf692694",
  "0xe49b69c19ef14ad2",
  "0xefbe4786384f25e3",
  "0x0fc19dc68b8cd5b5",
  "0x240ca1cc77ac9c65",
  "0x2de92c6f592b0275",
  "0x4a7484aa6ea6e483",
  "0x5cb0a9dcbd41fbd4",
  "0x76f988da831153b5",
  "0x983e5152ee66dfab",
  "0xa831c66d2db43210",
  "0xb00327c898fb213f",
  "0xbf597fc7beef0ee4",
  "0xc6e00bf33da88fc2",
  "0xd5a79147930aa725",
  "0x06ca6351e003826f",
  "0x142929670a0e6e70",
  "0x27b70a8546d22ffc",
  "0x2e1b21385c26c926",
  "0x4d2c6dfc5ac42aed",
  "0x53380d139d95b3df",
  "0x650a73548baf63de",
  "0x766a0abb3c77b2a8",
  "0x81c2c92e47edaee6",
  "0x92722c851482353b",
  "0xa2bfe8a14cf10364",
  "0xa81a664bbc423001",
  "0xc24b8b70d0f89791",
  "0xc76c51a30654be30",
  "0xd192e819d6ef5218",
  "0xd69906245565a910",
  "0xf40e35855771202a",
  "0x106aa07032bbd1b8",
  "0x19a4c116b8d2d0c8",
  "0x1e376c085141ab53",
  "0x2748774cdf8eeb99",
  "0x34b0bcb5e19b48a8",
  "0x391c0cb3c5c95a63",
  "0x4ed8aa4ae3418acb",
  "0x5b9cca4f7763e373",
  "0x682e6ff3d6b2b8a3",
  "0x748f82ee5defb2fc",
  "0x78a5636f43172f60",
  "0x84c87814a1f0ab72",
  "0x8cc702081a6439ec",
  "0x90befffa23631e28",
  "0xa4506cebde82bde9",
  "0xbef9a3f7b2c67915",
  "0xc67178f2e372532b",
  "0xca273eceea26619c",
  "0xd186b8c721c0c207",
  "0xeada7dd6cde0eb1e",
  "0xf57d4f7fee6ed178",
  "0x06f067aa72176fba",
  "0x0a637dc5a2c898a6",
  "0x113f9804bef90dae",
  "0x1b710b35131c471b",
  "0x28db77f523047d84",
  "0x32caab7b40c72493",
  "0x3c9ebe0a15c9bebc",
  "0x431d67c49c100d4c",
  "0x4cc5d4becb3e42b6",
  "0x597f299cfc657e2a",
  "0x5fcb6fab3ad6faec",
  "0x6c44198c4a475817"
].map((n2) => BigInt(n2))))();
var SHA512_Kh = /* @__PURE__ */ (() => K512[0])();
var SHA512_Kl = /* @__PURE__ */ (() => K512[1])();
var SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
var SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
var SHA512 = class extends HashMD2 {
  constructor(outputLen = 64) {
    super(128, outputLen, 16, false);
    this.Ah = SHA512_IV2[0] | 0;
    this.Al = SHA512_IV2[1] | 0;
    this.Bh = SHA512_IV2[2] | 0;
    this.Bl = SHA512_IV2[3] | 0;
    this.Ch = SHA512_IV2[4] | 0;
    this.Cl = SHA512_IV2[5] | 0;
    this.Dh = SHA512_IV2[6] | 0;
    this.Dl = SHA512_IV2[7] | 0;
    this.Eh = SHA512_IV2[8] | 0;
    this.El = SHA512_IV2[9] | 0;
    this.Fh = SHA512_IV2[10] | 0;
    this.Fl = SHA512_IV2[11] | 0;
    this.Gh = SHA512_IV2[12] | 0;
    this.Gl = SHA512_IV2[13] | 0;
    this.Hh = SHA512_IV2[14] | 0;
    this.Hl = SHA512_IV2[15] | 0;
  }
  // prettier-ignore
  get() {
    const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
  }
  // prettier-ignore
  set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
    this.Ah = Ah | 0;
    this.Al = Al | 0;
    this.Bh = Bh | 0;
    this.Bl = Bl | 0;
    this.Ch = Ch | 0;
    this.Cl = Cl | 0;
    this.Dh = Dh | 0;
    this.Dl = Dl | 0;
    this.Eh = Eh | 0;
    this.El = El | 0;
    this.Fh = Fh | 0;
    this.Fl = Fl | 0;
    this.Gh = Gh | 0;
    this.Gl = Gl | 0;
    this.Hh = Hh | 0;
    this.Hl = Hl | 0;
  }
  process(view, offset) {
    for (let i2 = 0; i2 < 16; i2++, offset += 4) {
      SHA512_W_H[i2] = view.getUint32(offset);
      SHA512_W_L[i2] = view.getUint32(offset += 4);
    }
    for (let i2 = 16; i2 < 80; i2++) {
      const W15h = SHA512_W_H[i2 - 15] | 0;
      const W15l = SHA512_W_L[i2 - 15] | 0;
      const s0h = rotrSH(W15h, W15l, 1) ^ rotrSH(W15h, W15l, 8) ^ shrSH(W15h, W15l, 7);
      const s0l = rotrSL(W15h, W15l, 1) ^ rotrSL(W15h, W15l, 8) ^ shrSL(W15h, W15l, 7);
      const W2h = SHA512_W_H[i2 - 2] | 0;
      const W2l = SHA512_W_L[i2 - 2] | 0;
      const s1h = rotrSH(W2h, W2l, 19) ^ rotrBH(W2h, W2l, 61) ^ shrSH(W2h, W2l, 6);
      const s1l = rotrSL(W2h, W2l, 19) ^ rotrBL(W2h, W2l, 61) ^ shrSL(W2h, W2l, 6);
      const SUMl = add4L(s0l, s1l, SHA512_W_L[i2 - 7], SHA512_W_L[i2 - 16]);
      const SUMh = add4H(SUMl, s0h, s1h, SHA512_W_H[i2 - 7], SHA512_W_H[i2 - 16]);
      SHA512_W_H[i2] = SUMh | 0;
      SHA512_W_L[i2] = SUMl | 0;
    }
    let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    for (let i2 = 0; i2 < 80; i2++) {
      const sigma1h = rotrSH(Eh, El, 14) ^ rotrSH(Eh, El, 18) ^ rotrBH(Eh, El, 41);
      const sigma1l = rotrSL(Eh, El, 14) ^ rotrSL(Eh, El, 18) ^ rotrBL(Eh, El, 41);
      const CHIh = Eh & Fh ^ ~Eh & Gh;
      const CHIl = El & Fl ^ ~El & Gl;
      const T1ll = add5L(Hl, sigma1l, CHIl, SHA512_Kl[i2], SHA512_W_L[i2]);
      const T1h = add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i2], SHA512_W_H[i2]);
      const T1l = T1ll | 0;
      const sigma0h = rotrSH(Ah, Al, 28) ^ rotrBH(Ah, Al, 34) ^ rotrBH(Ah, Al, 39);
      const sigma0l = rotrSL(Ah, Al, 28) ^ rotrBL(Ah, Al, 34) ^ rotrBL(Ah, Al, 39);
      const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
      const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
      Hh = Gh | 0;
      Hl = Gl | 0;
      Gh = Fh | 0;
      Gl = Fl | 0;
      Fh = Eh | 0;
      Fl = El | 0;
      ({ h: Eh, l: El } = add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
      Dh = Ch | 0;
      Dl = Cl | 0;
      Ch = Bh | 0;
      Cl = Bl | 0;
      Bh = Ah | 0;
      Bl = Al | 0;
      const All = add3L(T1l, sigma0l, MAJl);
      Ah = add3H(All, T1h, sigma0h, MAJh);
      Al = All | 0;
    }
    ({ h: Ah, l: Al } = add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
    ({ h: Bh, l: Bl } = add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
    ({ h: Ch, l: Cl } = add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
    ({ h: Dh, l: Dl } = add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
    ({ h: Eh, l: El } = add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
    ({ h: Fh, l: Fl } = add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
    ({ h: Gh, l: Gl } = add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
    ({ h: Hh, l: Hl } = add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
    this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
  }
  roundClean() {
    clean3(SHA512_W_H, SHA512_W_L);
  }
  destroy() {
    clean3(this.buffer);
    this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
};
var sha2563 = /* @__PURE__ */ createHasher2(() => new SHA2562());
var sha5122 = /* @__PURE__ */ createHasher2(() => new SHA512());

// node_modules/@noble/curves/esm/utils.js
var _0n5 = /* @__PURE__ */ BigInt(0);
var _1n5 = /* @__PURE__ */ BigInt(1);
function _abool2(value2, title = "") {
  if (typeof value2 !== "boolean") {
    const prefix = title && `"${title}"`;
    throw new Error(prefix + "expected boolean, got type=" + typeof value2);
  }
  return value2;
}
function _abytes2(value2, length3, title = "") {
  const bytes = isBytes3(value2);
  const len = value2?.length;
  const needsLen = length3 !== void 0;
  if (!bytes || needsLen && len !== length3) {
    const prefix = title && `"${title}" `;
    const ofLen = needsLen ? ` of length ${length3}` : "";
    const got = bytes ? `length=${len}` : `type=${typeof value2}`;
    throw new Error(prefix + "expected Uint8Array" + ofLen + ", got " + got);
  }
  return value2;
}
function hexToNumber2(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  return hex === "" ? _0n5 : BigInt("0x" + hex);
}
function bytesToNumberBE2(bytes) {
  return hexToNumber2(bytesToHex2(bytes));
}
function bytesToNumberLE2(bytes) {
  abytes3(bytes);
  return hexToNumber2(bytesToHex2(Uint8Array.from(bytes).reverse()));
}
function numberToBytesBE2(n2, len) {
  return hexToBytes2(n2.toString(16).padStart(len * 2, "0"));
}
function numberToBytesLE2(n2, len) {
  return numberToBytesBE2(n2, len).reverse();
}
function ensureBytes(title, hex, expectedLength) {
  let res;
  if (typeof hex === "string") {
    try {
      res = hexToBytes2(hex);
    } catch (e2) {
      throw new Error(title + " must be hex string or Uint8Array, cause: " + e2);
    }
  } else if (isBytes3(hex)) {
    res = Uint8Array.from(hex);
  } else {
    throw new Error(title + " must be hex string or Uint8Array");
  }
  const len = res.length;
  if (typeof expectedLength === "number" && len !== expectedLength)
    throw new Error(title + " of length " + expectedLength + " expected, got " + len);
  return res;
}
function equalBytes2(a2, b) {
  if (a2.length !== b.length)
    return false;
  let diff = 0;
  for (let i2 = 0; i2 < a2.length; i2++)
    diff |= a2[i2] ^ b[i2];
  return diff === 0;
}
function copyBytes3(bytes) {
  return Uint8Array.from(bytes);
}
var isPosBig2 = (n2) => typeof n2 === "bigint" && _0n5 <= n2;
function inRange2(n2, min, max) {
  return isPosBig2(n2) && isPosBig2(min) && isPosBig2(max) && min <= n2 && n2 < max;
}
function aInRange2(title, n2, min, max) {
  if (!inRange2(n2, min, max))
    throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n2);
}
function bitLen2(n2) {
  let len;
  for (len = 0; n2 > _0n5; n2 >>= _1n5, len += 1)
    ;
  return len;
}
var bitMask2 = (n2) => (_1n5 << BigInt(n2)) - _1n5;
function _validateObject(object, fields, optFields = {}) {
  if (!object || typeof object !== "object")
    throw new Error("expected valid options object");
  function checkField(fieldName, expectedType, isOpt) {
    const val = object[fieldName];
    if (isOpt && val === void 0)
      return;
    const current = typeof val;
    if (current !== expectedType || val === null)
      throw new Error(`param "${fieldName}" is invalid: expected ${expectedType}, got ${current}`);
  }
  Object.entries(fields).forEach(([k, v]) => checkField(k, v, false));
  Object.entries(optFields).forEach(([k, v]) => checkField(k, v, true));
}
var notImplemented = () => {
  throw new Error("not implemented");
};
function memoized2(fn) {
  const map = /* @__PURE__ */ new WeakMap();
  return (arg, ...args) => {
    const val = map.get(arg);
    if (val !== void 0)
      return val;
    const computed = fn(arg, ...args);
    map.set(arg, computed);
    return computed;
  };
}

// node_modules/@noble/curves/esm/abstract/modular.js
var _0n6 = BigInt(0);
var _1n6 = BigInt(1);
var _2n4 = /* @__PURE__ */ BigInt(2);
var _3n3 = /* @__PURE__ */ BigInt(3);
var _4n3 = /* @__PURE__ */ BigInt(4);
var _5n2 = /* @__PURE__ */ BigInt(5);
var _7n2 = /* @__PURE__ */ BigInt(7);
var _8n2 = /* @__PURE__ */ BigInt(8);
var _9n2 = /* @__PURE__ */ BigInt(9);
var _16n2 = /* @__PURE__ */ BigInt(16);
function mod2(a2, b) {
  const result = a2 % b;
  return result >= _0n6 ? result : b + result;
}
function pow22(x, power, modulo) {
  let res = x;
  while (power-- > _0n6) {
    res *= res;
    res %= modulo;
  }
  return res;
}
function invert2(number, modulo) {
  if (number === _0n6)
    throw new Error("invert: expected non-zero number");
  if (modulo <= _0n6)
    throw new Error("invert: expected positive modulus, got " + modulo);
  let a2 = mod2(number, modulo);
  let b = modulo;
  let x = _0n6, y = _1n6, u = _1n6, v = _0n6;
  while (a2 !== _0n6) {
    const q = b / a2;
    const r2 = b % a2;
    const m2 = x - u * q;
    const n2 = y - v * q;
    b = a2, a2 = r2, x = u, y = v, u = m2, v = n2;
  }
  const gcd = b;
  if (gcd !== _1n6)
    throw new Error("invert: does not exist");
  return mod2(x, modulo);
}
function assertIsSquare2(Fp2, root, n2) {
  if (!Fp2.eql(Fp2.sqr(root), n2))
    throw new Error("Cannot find square root");
}
function sqrt3mod42(Fp2, n2) {
  const p1div4 = (Fp2.ORDER + _1n6) / _4n3;
  const root = Fp2.pow(n2, p1div4);
  assertIsSquare2(Fp2, root, n2);
  return root;
}
function sqrt5mod82(Fp2, n2) {
  const p5div8 = (Fp2.ORDER - _5n2) / _8n2;
  const n22 = Fp2.mul(n2, _2n4);
  const v = Fp2.pow(n22, p5div8);
  const nv = Fp2.mul(n2, v);
  const i2 = Fp2.mul(Fp2.mul(nv, _2n4), v);
  const root = Fp2.mul(nv, Fp2.sub(i2, Fp2.ONE));
  assertIsSquare2(Fp2, root, n2);
  return root;
}
function sqrt9mod162(P) {
  const Fp_ = Field2(P);
  const tn = tonelliShanks2(P);
  const c1 = tn(Fp_, Fp_.neg(Fp_.ONE));
  const c2 = tn(Fp_, c1);
  const c3 = tn(Fp_, Fp_.neg(c1));
  const c4 = (P + _7n2) / _16n2;
  return (Fp2, n2) => {
    let tv1 = Fp2.pow(n2, c4);
    let tv2 = Fp2.mul(tv1, c1);
    const tv3 = Fp2.mul(tv1, c2);
    const tv4 = Fp2.mul(tv1, c3);
    const e1 = Fp2.eql(Fp2.sqr(tv2), n2);
    const e2 = Fp2.eql(Fp2.sqr(tv3), n2);
    tv1 = Fp2.cmov(tv1, tv2, e1);
    tv2 = Fp2.cmov(tv4, tv3, e2);
    const e3 = Fp2.eql(Fp2.sqr(tv2), n2);
    const root = Fp2.cmov(tv1, tv2, e3);
    assertIsSquare2(Fp2, root, n2);
    return root;
  };
}
function tonelliShanks2(P) {
  if (P < _3n3)
    throw new Error("sqrt is not defined for small field");
  let Q = P - _1n6;
  let S = 0;
  while (Q % _2n4 === _0n6) {
    Q /= _2n4;
    S++;
  }
  let Z = _2n4;
  const _Fp = Field2(P);
  while (FpLegendre2(_Fp, Z) === 1) {
    if (Z++ > 1e3)
      throw new Error("Cannot find square root: probably non-prime P");
  }
  if (S === 1)
    return sqrt3mod42;
  let cc = _Fp.pow(Z, Q);
  const Q1div2 = (Q + _1n6) / _2n4;
  return function tonelliSlow(Fp2, n2) {
    if (Fp2.is0(n2))
      return n2;
    if (FpLegendre2(Fp2, n2) !== 1)
      throw new Error("Cannot find square root");
    let M = S;
    let c2 = Fp2.mul(Fp2.ONE, cc);
    let t2 = Fp2.pow(n2, Q);
    let R = Fp2.pow(n2, Q1div2);
    while (!Fp2.eql(t2, Fp2.ONE)) {
      if (Fp2.is0(t2))
        return Fp2.ZERO;
      let i2 = 1;
      let t_tmp = Fp2.sqr(t2);
      while (!Fp2.eql(t_tmp, Fp2.ONE)) {
        i2++;
        t_tmp = Fp2.sqr(t_tmp);
        if (i2 === M)
          throw new Error("Cannot find square root");
      }
      const exponent = _1n6 << BigInt(M - i2 - 1);
      const b = Fp2.pow(c2, exponent);
      M = i2;
      c2 = Fp2.sqr(b);
      t2 = Fp2.mul(t2, c2);
      R = Fp2.mul(R, b);
    }
    return R;
  };
}
function FpSqrt2(P) {
  if (P % _4n3 === _3n3)
    return sqrt3mod42;
  if (P % _8n2 === _5n2)
    return sqrt5mod82;
  if (P % _16n2 === _9n2)
    return sqrt9mod162(P);
  return tonelliShanks2(P);
}
var isNegativeLE = (num, modulo) => (mod2(num, modulo) & _1n6) === _1n6;
var FIELD_FIELDS2 = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function validateField2(field) {
  const initial = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "number",
    BITS: "number"
  };
  const opts = FIELD_FIELDS2.reduce((map, val) => {
    map[val] = "function";
    return map;
  }, initial);
  _validateObject(field, opts);
  return field;
}
function FpPow2(Fp2, num, power) {
  if (power < _0n6)
    throw new Error("invalid exponent, negatives unsupported");
  if (power === _0n6)
    return Fp2.ONE;
  if (power === _1n6)
    return num;
  let p2 = Fp2.ONE;
  let d2 = num;
  while (power > _0n6) {
    if (power & _1n6)
      p2 = Fp2.mul(p2, d2);
    d2 = Fp2.sqr(d2);
    power >>= _1n6;
  }
  return p2;
}
function FpInvertBatch2(Fp2, nums, passZero = false) {
  const inverted = new Array(nums.length).fill(passZero ? Fp2.ZERO : void 0);
  const multipliedAcc = nums.reduce((acc, num, i2) => {
    if (Fp2.is0(num))
      return acc;
    inverted[i2] = acc;
    return Fp2.mul(acc, num);
  }, Fp2.ONE);
  const invertedAcc = Fp2.inv(multipliedAcc);
  nums.reduceRight((acc, num, i2) => {
    if (Fp2.is0(num))
      return acc;
    inverted[i2] = Fp2.mul(acc, inverted[i2]);
    return Fp2.mul(acc, num);
  }, invertedAcc);
  return inverted;
}
function FpLegendre2(Fp2, n2) {
  const p1mod2 = (Fp2.ORDER - _1n6) / _2n4;
  const powered = Fp2.pow(n2, p1mod2);
  const yes = Fp2.eql(powered, Fp2.ONE);
  const zero2 = Fp2.eql(powered, Fp2.ZERO);
  const no = Fp2.eql(powered, Fp2.neg(Fp2.ONE));
  if (!yes && !zero2 && !no)
    throw new Error("invalid Legendre symbol result");
  return yes ? 1 : zero2 ? 0 : -1;
}
function nLength2(n2, nBitLength) {
  if (nBitLength !== void 0)
    anumber3(nBitLength);
  const _nBitLength = nBitLength !== void 0 ? nBitLength : n2.toString(2).length;
  const nByteLength = Math.ceil(_nBitLength / 8);
  return { nBitLength: _nBitLength, nByteLength };
}
function Field2(ORDER, bitLenOrOpts, isLE2 = false, opts = {}) {
  if (ORDER <= _0n6)
    throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
  let _nbitLength = void 0;
  let _sqrt = void 0;
  let modFromBytes = false;
  let allowedLengths = void 0;
  if (typeof bitLenOrOpts === "object" && bitLenOrOpts != null) {
    if (opts.sqrt || isLE2)
      throw new Error("cannot specify opts in two arguments");
    const _opts = bitLenOrOpts;
    if (_opts.BITS)
      _nbitLength = _opts.BITS;
    if (_opts.sqrt)
      _sqrt = _opts.sqrt;
    if (typeof _opts.isLE === "boolean")
      isLE2 = _opts.isLE;
    if (typeof _opts.modFromBytes === "boolean")
      modFromBytes = _opts.modFromBytes;
    allowedLengths = _opts.allowedLengths;
  } else {
    if (typeof bitLenOrOpts === "number")
      _nbitLength = bitLenOrOpts;
    if (opts.sqrt)
      _sqrt = opts.sqrt;
  }
  const { nBitLength: BITS, nByteLength: BYTES } = nLength2(ORDER, _nbitLength);
  if (BYTES > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let sqrtP;
  const f2 = Object.freeze({
    ORDER,
    isLE: isLE2,
    BITS,
    BYTES,
    MASK: bitMask2(BITS),
    ZERO: _0n6,
    ONE: _1n6,
    allowedLengths,
    create: (num) => mod2(num, ORDER),
    isValid: (num) => {
      if (typeof num !== "bigint")
        throw new Error("invalid field element: expected bigint, got " + typeof num);
      return _0n6 <= num && num < ORDER;
    },
    is0: (num) => num === _0n6,
    // is valid and invertible
    isValidNot0: (num) => !f2.is0(num) && f2.isValid(num),
    isOdd: (num) => (num & _1n6) === _1n6,
    neg: (num) => mod2(-num, ORDER),
    eql: (lhs, rhs) => lhs === rhs,
    sqr: (num) => mod2(num * num, ORDER),
    add: (lhs, rhs) => mod2(lhs + rhs, ORDER),
    sub: (lhs, rhs) => mod2(lhs - rhs, ORDER),
    mul: (lhs, rhs) => mod2(lhs * rhs, ORDER),
    pow: (num, power) => FpPow2(f2, num, power),
    div: (lhs, rhs) => mod2(lhs * invert2(rhs, ORDER), ORDER),
    // Same as above, but doesn't normalize
    sqrN: (num) => num * num,
    addN: (lhs, rhs) => lhs + rhs,
    subN: (lhs, rhs) => lhs - rhs,
    mulN: (lhs, rhs) => lhs * rhs,
    inv: (num) => invert2(num, ORDER),
    sqrt: _sqrt || ((n2) => {
      if (!sqrtP)
        sqrtP = FpSqrt2(ORDER);
      return sqrtP(f2, n2);
    }),
    toBytes: (num) => isLE2 ? numberToBytesLE2(num, BYTES) : numberToBytesBE2(num, BYTES),
    fromBytes: (bytes, skipValidation = true) => {
      if (allowedLengths) {
        if (!allowedLengths.includes(bytes.length) || bytes.length > BYTES) {
          throw new Error("Field.fromBytes: expected " + allowedLengths + " bytes, got " + bytes.length);
        }
        const padded = new Uint8Array(BYTES);
        padded.set(bytes, isLE2 ? 0 : padded.length - bytes.length);
        bytes = padded;
      }
      if (bytes.length !== BYTES)
        throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes.length);
      let scalar = isLE2 ? bytesToNumberLE2(bytes) : bytesToNumberBE2(bytes);
      if (modFromBytes)
        scalar = mod2(scalar, ORDER);
      if (!skipValidation) {
        if (!f2.isValid(scalar))
          throw new Error("invalid field element: outside of range 0..ORDER");
      }
      return scalar;
    },
    // TODO: we don't need it here, move out to separate fn
    invertBatch: (lst) => FpInvertBatch2(f2, lst),
    // We can't move this out because Fp6, Fp12 implement it
    // and it's unclear what to return in there.
    cmov: (a2, b, c2) => c2 ? b : a2
  });
  return Object.freeze(f2);
}

// node_modules/@noble/curves/esm/abstract/curve.js
var _0n7 = BigInt(0);
var _1n7 = BigInt(1);
function negateCt2(condition, item) {
  const neg = item.negate();
  return condition ? neg : item;
}
function normalizeZ2(c2, points) {
  const invertedZs = FpInvertBatch2(c2.Fp, points.map((p2) => p2.Z));
  return points.map((p2, i2) => c2.fromAffine(p2.toAffine(invertedZs[i2])));
}
function validateW2(W, bits) {
  if (!Number.isSafeInteger(W) || W <= 0 || W > bits)
    throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W);
}
function calcWOpts2(W, scalarBits) {
  validateW2(W, scalarBits);
  const windows = Math.ceil(scalarBits / W) + 1;
  const windowSize = 2 ** (W - 1);
  const maxNumber = 2 ** W;
  const mask = bitMask2(W);
  const shiftBy = BigInt(W);
  return { windows, windowSize, mask, maxNumber, shiftBy };
}
function calcOffsets2(n2, window2, wOpts) {
  const { windowSize, mask, maxNumber, shiftBy } = wOpts;
  let wbits = Number(n2 & mask);
  let nextN = n2 >> shiftBy;
  if (wbits > windowSize) {
    wbits -= maxNumber;
    nextN += _1n7;
  }
  const offsetStart = window2 * windowSize;
  const offset = offsetStart + Math.abs(wbits) - 1;
  const isZero = wbits === 0;
  const isNeg = wbits < 0;
  const isNegF = window2 % 2 !== 0;
  const offsetF = offsetStart;
  return { nextN, offset, isZero, isNeg, isNegF, offsetF };
}
function validateMSMPoints(points, c2) {
  if (!Array.isArray(points))
    throw new Error("array expected");
  points.forEach((p2, i2) => {
    if (!(p2 instanceof c2))
      throw new Error("invalid point at index " + i2);
  });
}
function validateMSMScalars(scalars, field) {
  if (!Array.isArray(scalars))
    throw new Error("array of scalars expected");
  scalars.forEach((s2, i2) => {
    if (!field.isValid(s2))
      throw new Error("invalid scalar at index " + i2);
  });
}
var pointPrecomputes2 = /* @__PURE__ */ new WeakMap();
var pointWindowSizes2 = /* @__PURE__ */ new WeakMap();
function getW2(P) {
  return pointWindowSizes2.get(P) || 1;
}
function assert02(n2) {
  if (n2 !== _0n7)
    throw new Error("invalid wNAF");
}
var wNAF2 = class {
  // Parametrized with a given Point class (not individual point)
  constructor(Point, bits) {
    this.BASE = Point.BASE;
    this.ZERO = Point.ZERO;
    this.Fn = Point.Fn;
    this.bits = bits;
  }
  // non-const time multiplication ladder
  _unsafeLadder(elm, n2, p2 = this.ZERO) {
    let d2 = elm;
    while (n2 > _0n7) {
      if (n2 & _1n7)
        p2 = p2.add(d2);
      d2 = d2.double();
      n2 >>= _1n7;
    }
    return p2;
  }
  /**
   * Creates a wNAF precomputation window. Used for caching.
   * Default window size is set by `utils.precompute()` and is equal to 8.
   * Number of precomputed points depends on the curve size:
   * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
   * - 𝑊 is the window size
   * - 𝑛 is the bitlength of the curve order.
   * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
   * @param point Point instance
   * @param W window size
   * @returns precomputed point tables flattened to a single array
   */
  precomputeWindow(point, W) {
    const { windows, windowSize } = calcWOpts2(W, this.bits);
    const points = [];
    let p2 = point;
    let base3 = p2;
    for (let window2 = 0; window2 < windows; window2++) {
      base3 = p2;
      points.push(base3);
      for (let i2 = 1; i2 < windowSize; i2++) {
        base3 = base3.add(p2);
        points.push(base3);
      }
      p2 = base3.double();
    }
    return points;
  }
  /**
   * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
   * More compact implementation:
   * https://github.com/paulmillr/noble-secp256k1/blob/47cb1669b6e506ad66b35fe7d76132ae97465da2/index.ts#L502-L541
   * @returns real and fake (for const-time) points
   */
  wNAF(W, precomputes, n2) {
    if (!this.Fn.isValid(n2))
      throw new Error("invalid scalar");
    let p2 = this.ZERO;
    let f2 = this.BASE;
    const wo = calcWOpts2(W, this.bits);
    for (let window2 = 0; window2 < wo.windows; window2++) {
      const { nextN, offset, isZero, isNeg, isNegF, offsetF } = calcOffsets2(n2, window2, wo);
      n2 = nextN;
      if (isZero) {
        f2 = f2.add(negateCt2(isNegF, precomputes[offsetF]));
      } else {
        p2 = p2.add(negateCt2(isNeg, precomputes[offset]));
      }
    }
    assert02(n2);
    return { p: p2, f: f2 };
  }
  /**
   * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
   * @param acc accumulator point to add result of multiplication
   * @returns point
   */
  wNAFUnsafe(W, precomputes, n2, acc = this.ZERO) {
    const wo = calcWOpts2(W, this.bits);
    for (let window2 = 0; window2 < wo.windows; window2++) {
      if (n2 === _0n7)
        break;
      const { nextN, offset, isZero, isNeg } = calcOffsets2(n2, window2, wo);
      n2 = nextN;
      if (isZero) {
        continue;
      } else {
        const item = precomputes[offset];
        acc = acc.add(isNeg ? item.negate() : item);
      }
    }
    assert02(n2);
    return acc;
  }
  getPrecomputes(W, point, transform) {
    let comp = pointPrecomputes2.get(point);
    if (!comp) {
      comp = this.precomputeWindow(point, W);
      if (W !== 1) {
        if (typeof transform === "function")
          comp = transform(comp);
        pointPrecomputes2.set(point, comp);
      }
    }
    return comp;
  }
  cached(point, scalar, transform) {
    const W = getW2(point);
    return this.wNAF(W, this.getPrecomputes(W, point, transform), scalar);
  }
  unsafe(point, scalar, transform, prev) {
    const W = getW2(point);
    if (W === 1)
      return this._unsafeLadder(point, scalar, prev);
    return this.wNAFUnsafe(W, this.getPrecomputes(W, point, transform), scalar, prev);
  }
  // We calculate precomputes for elliptic curve point multiplication
  // using windowed method. This specifies window size and
  // stores precomputed values. Usually only base point would be precomputed.
  createCache(P, W) {
    validateW2(W, this.bits);
    pointWindowSizes2.set(P, W);
    pointPrecomputes2.delete(P);
  }
  hasCache(elm) {
    return getW2(elm) !== 1;
  }
};
function pippenger(c2, fieldN, points, scalars) {
  validateMSMPoints(points, c2);
  validateMSMScalars(scalars, fieldN);
  const plength = points.length;
  const slength = scalars.length;
  if (plength !== slength)
    throw new Error("arrays of points and scalars must have equal length");
  const zero2 = c2.ZERO;
  const wbits = bitLen2(BigInt(plength));
  let windowSize = 1;
  if (wbits > 12)
    windowSize = wbits - 3;
  else if (wbits > 4)
    windowSize = wbits - 2;
  else if (wbits > 0)
    windowSize = 2;
  const MASK = bitMask2(windowSize);
  const buckets = new Array(Number(MASK) + 1).fill(zero2);
  const lastBits = Math.floor((fieldN.BITS - 1) / windowSize) * windowSize;
  let sum = zero2;
  for (let i2 = lastBits; i2 >= 0; i2 -= windowSize) {
    buckets.fill(zero2);
    for (let j = 0; j < slength; j++) {
      const scalar = scalars[j];
      const wbits2 = Number(scalar >> BigInt(i2) & MASK);
      buckets[wbits2] = buckets[wbits2].add(points[j]);
    }
    let resI = zero2;
    for (let j = buckets.length - 1, sumI = zero2; j > 0; j--) {
      sumI = sumI.add(buckets[j]);
      resI = resI.add(sumI);
    }
    sum = sum.add(resI);
    if (i2 !== 0)
      for (let j = 0; j < windowSize; j++)
        sum = sum.double();
  }
  return sum;
}
function createField2(order, field, isLE2) {
  if (field) {
    if (field.ORDER !== order)
      throw new Error("Field.ORDER must match order: Fp == p, Fn == n");
    validateField2(field);
    return field;
  } else {
    return Field2(order, { isLE: isLE2 });
  }
}
function _createCurveFields(type, CURVE, curveOpts = {}, FpFnLE) {
  if (FpFnLE === void 0)
    FpFnLE = type === "edwards";
  if (!CURVE || typeof CURVE !== "object")
    throw new Error(`expected valid ${type} CURVE object`);
  for (const p2 of ["p", "n", "h"]) {
    const val = CURVE[p2];
    if (!(typeof val === "bigint" && val > _0n7))
      throw new Error(`CURVE.${p2} must be positive bigint`);
  }
  const Fp2 = createField2(CURVE.p, curveOpts.Fp, FpFnLE);
  const Fn2 = createField2(CURVE.n, curveOpts.Fn, FpFnLE);
  const _b = type === "weierstrass" ? "b" : "d";
  const params = ["Gx", "Gy", "a", _b];
  for (const p2 of params) {
    if (!Fp2.isValid(CURVE[p2]))
      throw new Error(`CURVE.${p2} must be valid field element of CURVE.Fp`);
  }
  CURVE = Object.freeze(Object.assign({}, CURVE));
  return { CURVE, Fp: Fp2, Fn: Fn2 };
}

// node_modules/@noble/curves/esm/abstract/edwards.js
var _0n8 = BigInt(0);
var _1n8 = BigInt(1);
var _2n5 = BigInt(2);
var _8n3 = BigInt(8);
function isEdValidXY(Fp2, CURVE, x, y) {
  const x2 = Fp2.sqr(x);
  const y2 = Fp2.sqr(y);
  const left = Fp2.add(Fp2.mul(CURVE.a, x2), y2);
  const right = Fp2.add(Fp2.ONE, Fp2.mul(CURVE.d, Fp2.mul(x2, y2)));
  return Fp2.eql(left, right);
}
function edwards(params, extraOpts = {}) {
  const validated = _createCurveFields("edwards", params, extraOpts, extraOpts.FpFnLE);
  const { Fp: Fp2, Fn: Fn2 } = validated;
  let CURVE = validated.CURVE;
  const { h: cofactor } = CURVE;
  _validateObject(extraOpts, {}, { uvRatio: "function" });
  const MASK = _2n5 << BigInt(Fn2.BYTES * 8) - _1n8;
  const modP = (n2) => Fp2.create(n2);
  const uvRatio2 = extraOpts.uvRatio || ((u, v) => {
    try {
      return { isValid: true, value: Fp2.sqrt(Fp2.div(u, v)) };
    } catch (e2) {
      return { isValid: false, value: _0n8 };
    }
  });
  if (!isEdValidXY(Fp2, CURVE, CURVE.Gx, CURVE.Gy))
    throw new Error("bad curve params: generator point");
  function acoord(title, n2, banZero = false) {
    const min = banZero ? _1n8 : _0n8;
    aInRange2("coordinate " + title, n2, min, MASK);
    return n2;
  }
  function aextpoint(other) {
    if (!(other instanceof Point))
      throw new Error("ExtendedPoint expected");
  }
  const toAffineMemo = memoized2((p2, iz) => {
    const { X, Y, Z } = p2;
    const is0 = p2.is0();
    if (iz == null)
      iz = is0 ? _8n3 : Fp2.inv(Z);
    const x = modP(X * iz);
    const y = modP(Y * iz);
    const zz = Fp2.mul(Z, iz);
    if (is0)
      return { x: _0n8, y: _1n8 };
    if (zz !== _1n8)
      throw new Error("invZ was invalid");
    return { x, y };
  });
  const assertValidMemo = memoized2((p2) => {
    const { a: a2, d: d2 } = CURVE;
    if (p2.is0())
      throw new Error("bad point: ZERO");
    const { X, Y, Z, T } = p2;
    const X2 = modP(X * X);
    const Y2 = modP(Y * Y);
    const Z2 = modP(Z * Z);
    const Z4 = modP(Z2 * Z2);
    const aX2 = modP(X2 * a2);
    const left = modP(Z2 * modP(aX2 + Y2));
    const right = modP(Z4 + modP(d2 * modP(X2 * Y2)));
    if (left !== right)
      throw new Error("bad point: equation left != right (1)");
    const XY = modP(X * Y);
    const ZT = modP(Z * T);
    if (XY !== ZT)
      throw new Error("bad point: equation left != right (2)");
    return true;
  });
  class Point {
    constructor(X, Y, Z, T) {
      this.X = acoord("x", X);
      this.Y = acoord("y", Y);
      this.Z = acoord("z", Z, true);
      this.T = acoord("t", T);
      Object.freeze(this);
    }
    static CURVE() {
      return CURVE;
    }
    static fromAffine(p2) {
      if (p2 instanceof Point)
        throw new Error("extended point not allowed");
      const { x, y } = p2 || {};
      acoord("x", x);
      acoord("y", y);
      return new Point(x, y, _1n8, modP(x * y));
    }
    // Uses algo from RFC8032 5.1.3.
    static fromBytes(bytes, zip215 = false) {
      const len = Fp2.BYTES;
      const { a: a2, d: d2 } = CURVE;
      bytes = copyBytes3(_abytes2(bytes, len, "point"));
      _abool2(zip215, "zip215");
      const normed = copyBytes3(bytes);
      const lastByte = bytes[len - 1];
      normed[len - 1] = lastByte & ~128;
      const y = bytesToNumberLE2(normed);
      const max = zip215 ? MASK : Fp2.ORDER;
      aInRange2("point.y", y, _0n8, max);
      const y2 = modP(y * y);
      const u = modP(y2 - _1n8);
      const v = modP(d2 * y2 - a2);
      let { isValid, value: x } = uvRatio2(u, v);
      if (!isValid)
        throw new Error("bad point: invalid y coordinate");
      const isXOdd = (x & _1n8) === _1n8;
      const isLastByteOdd = (lastByte & 128) !== 0;
      if (!zip215 && x === _0n8 && isLastByteOdd)
        throw new Error("bad point: x=0 and x_0=1");
      if (isLastByteOdd !== isXOdd)
        x = modP(-x);
      return Point.fromAffine({ x, y });
    }
    static fromHex(bytes, zip215 = false) {
      return Point.fromBytes(ensureBytes("point", bytes), zip215);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    precompute(windowSize = 8, isLazy = true) {
      wnaf.createCache(this, windowSize);
      if (!isLazy)
        this.multiply(_2n5);
      return this;
    }
    // Useful in fromAffine() - not for fromBytes(), which always created valid points.
    assertValidity() {
      assertValidMemo(this);
    }
    // Compare one point to another.
    equals(other) {
      aextpoint(other);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const { X: X2, Y: Y2, Z: Z2 } = other;
      const X1Z2 = modP(X1 * Z2);
      const X2Z1 = modP(X2 * Z1);
      const Y1Z2 = modP(Y1 * Z2);
      const Y2Z1 = modP(Y2 * Z1);
      return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
    }
    is0() {
      return this.equals(Point.ZERO);
    }
    negate() {
      return new Point(modP(-this.X), this.Y, this.Z, modP(-this.T));
    }
    // Fast algo for doubling Extended Point.
    // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#doubling-dbl-2008-hwcd
    // Cost: 4M + 4S + 1*a + 6add + 1*2.
    double() {
      const { a: a2 } = CURVE;
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const A = modP(X1 * X1);
      const B = modP(Y1 * Y1);
      const C = modP(_2n5 * modP(Z1 * Z1));
      const D = modP(a2 * A);
      const x1y1 = X1 + Y1;
      const E = modP(modP(x1y1 * x1y1) - A - B);
      const G = D + B;
      const F = G - C;
      const H = D - B;
      const X3 = modP(E * F);
      const Y3 = modP(G * H);
      const T3 = modP(E * H);
      const Z3 = modP(F * G);
      return new Point(X3, Y3, Z3, T3);
    }
    // Fast algo for adding 2 Extended Points.
    // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#addition-add-2008-hwcd
    // Cost: 9M + 1*a + 1*d + 7add.
    add(other) {
      aextpoint(other);
      const { a: a2, d: d2 } = CURVE;
      const { X: X1, Y: Y1, Z: Z1, T: T1 } = this;
      const { X: X2, Y: Y2, Z: Z2, T: T2 } = other;
      const A = modP(X1 * X2);
      const B = modP(Y1 * Y2);
      const C = modP(T1 * d2 * T2);
      const D = modP(Z1 * Z2);
      const E = modP((X1 + Y1) * (X2 + Y2) - A - B);
      const F = D - C;
      const G = D + C;
      const H = modP(B - a2 * A);
      const X3 = modP(E * F);
      const Y3 = modP(G * H);
      const T3 = modP(E * H);
      const Z3 = modP(F * G);
      return new Point(X3, Y3, Z3, T3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    // Constant-time multiplication.
    multiply(scalar) {
      if (!Fn2.isValidNot0(scalar))
        throw new Error("invalid scalar: expected 1 <= sc < curve.n");
      const { p: p2, f: f2 } = wnaf.cached(this, scalar, (p3) => normalizeZ2(Point, p3));
      return normalizeZ2(Point, [p2, f2])[0];
    }
    // Non-constant-time multiplication. Uses double-and-add algorithm.
    // It's faster, but should only be used when you don't care about
    // an exposed private key e.g. sig verification.
    // Does NOT allow scalars higher than CURVE.n.
    // Accepts optional accumulator to merge with multiply (important for sparse scalars)
    multiplyUnsafe(scalar, acc = Point.ZERO) {
      if (!Fn2.isValid(scalar))
        throw new Error("invalid scalar: expected 0 <= sc < curve.n");
      if (scalar === _0n8)
        return Point.ZERO;
      if (this.is0() || scalar === _1n8)
        return this;
      return wnaf.unsafe(this, scalar, (p2) => normalizeZ2(Point, p2), acc);
    }
    // Checks if point is of small order.
    // If you add something to small order point, you will have "dirty"
    // point with torsion component.
    // Multiplies point by cofactor and checks if the result is 0.
    isSmallOrder() {
      return this.multiplyUnsafe(cofactor).is0();
    }
    // Multiplies point by curve order and checks if the result is 0.
    // Returns `false` is the point is dirty.
    isTorsionFree() {
      return wnaf.unsafe(this, CURVE.n).is0();
    }
    // Converts Extended point to default (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    toAffine(invertedZ) {
      return toAffineMemo(this, invertedZ);
    }
    clearCofactor() {
      if (cofactor === _1n8)
        return this;
      return this.multiplyUnsafe(cofactor);
    }
    toBytes() {
      const { x, y } = this.toAffine();
      const bytes = Fp2.toBytes(y);
      bytes[bytes.length - 1] |= x & _1n8 ? 128 : 0;
      return bytes;
    }
    toHex() {
      return bytesToHex2(this.toBytes());
    }
    toString() {
      return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
    }
    // TODO: remove
    get ex() {
      return this.X;
    }
    get ey() {
      return this.Y;
    }
    get ez() {
      return this.Z;
    }
    get et() {
      return this.T;
    }
    static normalizeZ(points) {
      return normalizeZ2(Point, points);
    }
    static msm(points, scalars) {
      return pippenger(Point, Fn2, points, scalars);
    }
    _setWindowSize(windowSize) {
      this.precompute(windowSize);
    }
    toRawBytes() {
      return this.toBytes();
    }
  }
  Point.BASE = new Point(CURVE.Gx, CURVE.Gy, _1n8, modP(CURVE.Gx * CURVE.Gy));
  Point.ZERO = new Point(_0n8, _1n8, _1n8, _0n8);
  Point.Fp = Fp2;
  Point.Fn = Fn2;
  const wnaf = new wNAF2(Point, Fn2.BITS);
  Point.BASE.precompute(8);
  return Point;
}
var PrimeEdwardsPoint = class {
  constructor(ep) {
    this.ep = ep;
  }
  // Static methods that must be implemented by subclasses
  static fromBytes(_bytes) {
    notImplemented();
  }
  static fromHex(_hex) {
    notImplemented();
  }
  get x() {
    return this.toAffine().x;
  }
  get y() {
    return this.toAffine().y;
  }
  // Common implementations
  clearCofactor() {
    return this;
  }
  assertValidity() {
    this.ep.assertValidity();
  }
  toAffine(invertedZ) {
    return this.ep.toAffine(invertedZ);
  }
  toHex() {
    return bytesToHex2(this.toBytes());
  }
  toString() {
    return this.toHex();
  }
  isTorsionFree() {
    return true;
  }
  isSmallOrder() {
    return false;
  }
  add(other) {
    this.assertSame(other);
    return this.init(this.ep.add(other.ep));
  }
  subtract(other) {
    this.assertSame(other);
    return this.init(this.ep.subtract(other.ep));
  }
  multiply(scalar) {
    return this.init(this.ep.multiply(scalar));
  }
  multiplyUnsafe(scalar) {
    return this.init(this.ep.multiplyUnsafe(scalar));
  }
  double() {
    return this.init(this.ep.double());
  }
  negate() {
    return this.init(this.ep.negate());
  }
  precompute(windowSize, isLazy) {
    return this.init(this.ep.precompute(windowSize, isLazy));
  }
  /** @deprecated use `toBytes` */
  toRawBytes() {
    return this.toBytes();
  }
};
function eddsa(Point, cHash, eddsaOpts = {}) {
  if (typeof cHash !== "function")
    throw new Error('"hash" function param is required');
  _validateObject(eddsaOpts, {}, {
    adjustScalarBytes: "function",
    randomBytes: "function",
    domain: "function",
    prehash: "function",
    mapToCurve: "function"
  });
  const { prehash } = eddsaOpts;
  const { BASE, Fp: Fp2, Fn: Fn2 } = Point;
  const randomBytes4 = eddsaOpts.randomBytes || randomBytes3;
  const adjustScalarBytes2 = eddsaOpts.adjustScalarBytes || ((bytes) => bytes);
  const domain = eddsaOpts.domain || ((data, ctx3, phflag) => {
    _abool2(phflag, "phflag");
    if (ctx3.length || phflag)
      throw new Error("Contexts/pre-hash are not supported");
    return data;
  });
  function modN_LE(hash) {
    return Fn2.create(bytesToNumberLE2(hash));
  }
  function getPrivateScalar(key) {
    const len = lengths.secretKey;
    key = ensureBytes("private key", key, len);
    const hashed = ensureBytes("hashed private key", cHash(key), 2 * len);
    const head = adjustScalarBytes2(hashed.slice(0, len));
    const prefix = hashed.slice(len, 2 * len);
    const scalar = modN_LE(head);
    return { head, prefix, scalar };
  }
  function getExtendedPublicKey(secretKey) {
    const { head, prefix, scalar } = getPrivateScalar(secretKey);
    const point = BASE.multiply(scalar);
    const pointBytes = point.toBytes();
    return { head, prefix, scalar, point, pointBytes };
  }
  function getPublicKey(secretKey) {
    return getExtendedPublicKey(secretKey).pointBytes;
  }
  function hashDomainToScalar(context = Uint8Array.of(), ...msgs) {
    const msg = concatBytes2(...msgs);
    return modN_LE(cHash(domain(msg, ensureBytes("context", context), !!prehash)));
  }
  function sign(msg, secretKey, options = {}) {
    msg = ensureBytes("message", msg);
    if (prehash)
      msg = prehash(msg);
    const { prefix, scalar, pointBytes } = getExtendedPublicKey(secretKey);
    const r2 = hashDomainToScalar(options.context, prefix, msg);
    const R = BASE.multiply(r2).toBytes();
    const k = hashDomainToScalar(options.context, R, pointBytes, msg);
    const s2 = Fn2.create(r2 + k * scalar);
    if (!Fn2.isValid(s2))
      throw new Error("sign failed: invalid s");
    const rs = concatBytes2(R, Fn2.toBytes(s2));
    return _abytes2(rs, lengths.signature, "result");
  }
  const verifyOpts = { zip215: true };
  function verify(sig, msg, publicKey, options = verifyOpts) {
    const { context, zip215 } = options;
    const len = lengths.signature;
    sig = ensureBytes("signature", sig, len);
    msg = ensureBytes("message", msg);
    publicKey = ensureBytes("publicKey", publicKey, lengths.publicKey);
    if (zip215 !== void 0)
      _abool2(zip215, "zip215");
    if (prehash)
      msg = prehash(msg);
    const mid = len / 2;
    const r2 = sig.subarray(0, mid);
    const s2 = bytesToNumberLE2(sig.subarray(mid, len));
    let A, R, SB;
    try {
      A = Point.fromBytes(publicKey, zip215);
      R = Point.fromBytes(r2, zip215);
      SB = BASE.multiplyUnsafe(s2);
    } catch (error) {
      return false;
    }
    if (!zip215 && A.isSmallOrder())
      return false;
    const k = hashDomainToScalar(context, R.toBytes(), A.toBytes(), msg);
    const RkA = R.add(A.multiplyUnsafe(k));
    return RkA.subtract(SB).clearCofactor().is0();
  }
  const _size = Fp2.BYTES;
  const lengths = {
    secretKey: _size,
    publicKey: _size,
    signature: 2 * _size,
    seed: _size
  };
  function randomSecretKey(seed = randomBytes4(lengths.seed)) {
    return _abytes2(seed, lengths.seed, "seed");
  }
  function keygen(seed) {
    const secretKey = utils.randomSecretKey(seed);
    return { secretKey, publicKey: getPublicKey(secretKey) };
  }
  function isValidSecretKey(key) {
    return isBytes3(key) && key.length === Fn2.BYTES;
  }
  function isValidPublicKey(key, zip215) {
    try {
      return !!Point.fromBytes(key, zip215);
    } catch (error) {
      return false;
    }
  }
  const utils = {
    getExtendedPublicKey,
    randomSecretKey,
    isValidSecretKey,
    isValidPublicKey,
    /**
     * Converts ed public key to x public key. Uses formula:
     * - ed25519:
     *   - `(u, v) = ((1+y)/(1-y), sqrt(-486664)*u/x)`
     *   - `(x, y) = (sqrt(-486664)*u/v, (u-1)/(u+1))`
     * - ed448:
     *   - `(u, v) = ((y-1)/(y+1), sqrt(156324)*u/x)`
     *   - `(x, y) = (sqrt(156324)*u/v, (1+u)/(1-u))`
     */
    toMontgomery(publicKey) {
      const { y } = Point.fromBytes(publicKey);
      const size = lengths.publicKey;
      const is25519 = size === 32;
      if (!is25519 && size !== 57)
        throw new Error("only defined for 25519 and 448");
      const u = is25519 ? Fp2.div(_1n8 + y, _1n8 - y) : Fp2.div(y - _1n8, y + _1n8);
      return Fp2.toBytes(u);
    },
    toMontgomerySecret(secretKey) {
      const size = lengths.secretKey;
      _abytes2(secretKey, size);
      const hashed = cHash(secretKey.subarray(0, size));
      return adjustScalarBytes2(hashed).subarray(0, size);
    },
    /** @deprecated */
    randomPrivateKey: randomSecretKey,
    /** @deprecated */
    precompute(windowSize = 8, point = Point.BASE) {
      return point.precompute(windowSize, false);
    }
  };
  return Object.freeze({
    keygen,
    getPublicKey,
    sign,
    verify,
    utils,
    Point,
    lengths
  });
}
function _eddsa_legacy_opts_to_new(c2) {
  const CURVE = {
    a: c2.a,
    d: c2.d,
    p: c2.Fp.ORDER,
    n: c2.n,
    h: c2.h,
    Gx: c2.Gx,
    Gy: c2.Gy
  };
  const Fp2 = c2.Fp;
  const Fn2 = Field2(CURVE.n, c2.nBitLength, true);
  const curveOpts = { Fp: Fp2, Fn: Fn2, uvRatio: c2.uvRatio };
  const eddsaOpts = {
    randomBytes: c2.randomBytes,
    adjustScalarBytes: c2.adjustScalarBytes,
    domain: c2.domain,
    prehash: c2.prehash,
    mapToCurve: c2.mapToCurve
  };
  return { CURVE, curveOpts, hash: c2.hash, eddsaOpts };
}
function _eddsa_new_output_to_legacy(c2, eddsa2) {
  const Point = eddsa2.Point;
  const legacy = Object.assign({}, eddsa2, {
    ExtendedPoint: Point,
    CURVE: c2,
    nBitLength: Point.Fn.BITS,
    nByteLength: Point.Fn.BYTES
  });
  return legacy;
}
function twistedEdwards(c2) {
  const { CURVE, curveOpts, hash, eddsaOpts } = _eddsa_legacy_opts_to_new(c2);
  const Point = edwards(CURVE, curveOpts);
  const EDDSA = eddsa(Point, hash, eddsaOpts);
  return _eddsa_new_output_to_legacy(c2, EDDSA);
}

// node_modules/@noble/curves/esm/abstract/montgomery.js
var _0n9 = BigInt(0);
var _1n9 = BigInt(1);
var _2n6 = BigInt(2);
function validateOpts(curve) {
  _validateObject(curve, {
    adjustScalarBytes: "function",
    powPminus2: "function"
  });
  return Object.freeze({ ...curve });
}
function montgomery(curveDef) {
  const CURVE = validateOpts(curveDef);
  const { P, type, adjustScalarBytes: adjustScalarBytes2, powPminus2, randomBytes: rand } = CURVE;
  const is25519 = type === "x25519";
  if (!is25519 && type !== "x448")
    throw new Error("invalid type");
  const randomBytes_ = rand || randomBytes3;
  const montgomeryBits = is25519 ? 255 : 448;
  const fieldLen = is25519 ? 32 : 56;
  const Gu = is25519 ? BigInt(9) : BigInt(5);
  const a24 = is25519 ? BigInt(121665) : BigInt(39081);
  const minScalar = is25519 ? _2n6 ** BigInt(254) : _2n6 ** BigInt(447);
  const maxAdded = is25519 ? BigInt(8) * _2n6 ** BigInt(251) - _1n9 : BigInt(4) * _2n6 ** BigInt(445) - _1n9;
  const maxScalar = minScalar + maxAdded + _1n9;
  const modP = (n2) => mod2(n2, P);
  const GuBytes = encodeU(Gu);
  function encodeU(u) {
    return numberToBytesLE2(modP(u), fieldLen);
  }
  function decodeU(u) {
    const _u = ensureBytes("u coordinate", u, fieldLen);
    if (is25519)
      _u[31] &= 127;
    return modP(bytesToNumberLE2(_u));
  }
  function decodeScalar(scalar) {
    return bytesToNumberLE2(adjustScalarBytes2(ensureBytes("scalar", scalar, fieldLen)));
  }
  function scalarMult(scalar, u) {
    const pu = montgomeryLadder(decodeU(u), decodeScalar(scalar));
    if (pu === _0n9)
      throw new Error("invalid private or public key received");
    return encodeU(pu);
  }
  function scalarMultBase(scalar) {
    return scalarMult(scalar, GuBytes);
  }
  function cswap(swap, x_2, x_3) {
    const dummy = modP(swap * (x_2 - x_3));
    x_2 = modP(x_2 - dummy);
    x_3 = modP(x_3 + dummy);
    return { x_2, x_3 };
  }
  function montgomeryLadder(u, scalar) {
    aInRange2("u", u, _0n9, P);
    aInRange2("scalar", scalar, minScalar, maxScalar);
    const k = scalar;
    const x_1 = u;
    let x_2 = _1n9;
    let z_2 = _0n9;
    let x_3 = u;
    let z_3 = _1n9;
    let swap = _0n9;
    for (let t2 = BigInt(montgomeryBits - 1); t2 >= _0n9; t2--) {
      const k_t = k >> t2 & _1n9;
      swap ^= k_t;
      ({ x_2, x_3 } = cswap(swap, x_2, x_3));
      ({ x_2: z_2, x_3: z_3 } = cswap(swap, z_2, z_3));
      swap = k_t;
      const A = x_2 + z_2;
      const AA = modP(A * A);
      const B = x_2 - z_2;
      const BB = modP(B * B);
      const E = AA - BB;
      const C = x_3 + z_3;
      const D = x_3 - z_3;
      const DA = modP(D * A);
      const CB = modP(C * B);
      const dacb = DA + CB;
      const da_cb = DA - CB;
      x_3 = modP(dacb * dacb);
      z_3 = modP(x_1 * modP(da_cb * da_cb));
      x_2 = modP(AA * BB);
      z_2 = modP(E * (AA + modP(a24 * E)));
    }
    ({ x_2, x_3 } = cswap(swap, x_2, x_3));
    ({ x_2: z_2, x_3: z_3 } = cswap(swap, z_2, z_3));
    const z2 = powPminus2(z_2);
    return modP(x_2 * z2);
  }
  const lengths = {
    secretKey: fieldLen,
    publicKey: fieldLen,
    seed: fieldLen
  };
  const randomSecretKey = (seed = randomBytes_(fieldLen)) => {
    abytes3(seed, lengths.seed);
    return seed;
  };
  function keygen(seed) {
    const secretKey = randomSecretKey(seed);
    return { secretKey, publicKey: scalarMultBase(secretKey) };
  }
  const utils = {
    randomSecretKey,
    randomPrivateKey: randomSecretKey
  };
  return {
    keygen,
    getSharedSecret: (secretKey, publicKey) => scalarMult(secretKey, publicKey),
    getPublicKey: (secretKey) => scalarMultBase(secretKey),
    scalarMult,
    scalarMultBase,
    utils,
    GuBytes: GuBytes.slice(),
    lengths
  };
}

// node_modules/@noble/curves/esm/ed25519.js
var _0n10 = /* @__PURE__ */ BigInt(0);
var _1n10 = BigInt(1);
var _2n7 = BigInt(2);
var _3n4 = BigInt(3);
var _5n3 = BigInt(5);
var _8n4 = BigInt(8);
var ed25519_CURVE_p = BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed");
var ed25519_CURVE = /* @__PURE__ */ (() => ({
  p: ed25519_CURVE_p,
  n: BigInt("0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed"),
  h: _8n4,
  a: BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec"),
  d: BigInt("0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3"),
  Gx: BigInt("0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a"),
  Gy: BigInt("0x6666666666666666666666666666666666666666666666666666666666666658")
}))();
function ed25519_pow_2_252_3(x) {
  const _10n = BigInt(10), _20n = BigInt(20), _40n = BigInt(40), _80n = BigInt(80);
  const P = ed25519_CURVE_p;
  const x2 = x * x % P;
  const b2 = x2 * x % P;
  const b4 = pow22(b2, _2n7, P) * b2 % P;
  const b5 = pow22(b4, _1n10, P) * x % P;
  const b10 = pow22(b5, _5n3, P) * b5 % P;
  const b20 = pow22(b10, _10n, P) * b10 % P;
  const b40 = pow22(b20, _20n, P) * b20 % P;
  const b80 = pow22(b40, _40n, P) * b40 % P;
  const b160 = pow22(b80, _80n, P) * b80 % P;
  const b240 = pow22(b160, _80n, P) * b80 % P;
  const b250 = pow22(b240, _10n, P) * b10 % P;
  const pow_p_5_8 = pow22(b250, _2n7, P) * x % P;
  return { pow_p_5_8, b2 };
}
function adjustScalarBytes(bytes) {
  bytes[0] &= 248;
  bytes[31] &= 127;
  bytes[31] |= 64;
  return bytes;
}
var ED25519_SQRT_M1 = /* @__PURE__ */ BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
function uvRatio(u, v) {
  const P = ed25519_CURVE_p;
  const v3 = mod2(v * v * v, P);
  const v7 = mod2(v3 * v3 * v, P);
  const pow = ed25519_pow_2_252_3(u * v7).pow_p_5_8;
  let x = mod2(u * v3 * pow, P);
  const vx2 = mod2(v * x * x, P);
  const root1 = x;
  const root2 = mod2(x * ED25519_SQRT_M1, P);
  const useRoot1 = vx2 === u;
  const useRoot2 = vx2 === mod2(-u, P);
  const noRoot = vx2 === mod2(-u * ED25519_SQRT_M1, P);
  if (useRoot1)
    x = root1;
  if (useRoot2 || noRoot)
    x = root2;
  if (isNegativeLE(x, P))
    x = mod2(-x, P);
  return { isValid: useRoot1 || useRoot2, value: x };
}
var Fp = /* @__PURE__ */ (() => Field2(ed25519_CURVE.p, { isLE: true }))();
var Fn = /* @__PURE__ */ (() => Field2(ed25519_CURVE.n, { isLE: true }))();
var ed25519Defaults = /* @__PURE__ */ (() => ({
  ...ed25519_CURVE,
  Fp,
  hash: sha5122,
  adjustScalarBytes,
  // dom2
  // Ratio of u to v. Allows us to combine inversion and square root. Uses algo from RFC8032 5.1.3.
  // Constant-time, u/√v
  uvRatio
}))();
var ed25519 = /* @__PURE__ */ (() => twistedEdwards(ed25519Defaults))();
var x25519 = /* @__PURE__ */ (() => {
  const P = Fp.ORDER;
  return montgomery({
    P,
    type: "x25519",
    powPminus2: (x) => {
      const { pow_p_5_8, b2 } = ed25519_pow_2_252_3(x);
      return mod2(pow22(pow_p_5_8, _3n4, P) * b2, P);
    },
    adjustScalarBytes
  });
})();
var SQRT_M1 = ED25519_SQRT_M1;
var SQRT_AD_MINUS_ONE = /* @__PURE__ */ BigInt("25063068953384623474111414158702152701244531502492656460079210482610430750235");
var INVSQRT_A_MINUS_D = /* @__PURE__ */ BigInt("54469307008909316920995813868745141605393597292927456921205312896311721017578");
var ONE_MINUS_D_SQ = /* @__PURE__ */ BigInt("1159843021668779879193775521855586647937357759715417654439879720876111806838");
var D_MINUS_ONE_SQ = /* @__PURE__ */ BigInt("40440834346308536858101042469323190826248399146238708352240133220865137265952");
var invertSqrt = (number) => uvRatio(_1n10, number);
var MAX_255B = /* @__PURE__ */ BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
var bytes255ToNumberLE = (bytes) => ed25519.Point.Fp.create(bytesToNumberLE2(bytes) & MAX_255B);
function calcElligatorRistrettoMap(r0) {
  const { d: d2 } = ed25519_CURVE;
  const P = ed25519_CURVE_p;
  const mod3 = (n2) => Fp.create(n2);
  const r2 = mod3(SQRT_M1 * r0 * r0);
  const Ns = mod3((r2 + _1n10) * ONE_MINUS_D_SQ);
  let c2 = BigInt(-1);
  const D = mod3((c2 - d2 * r2) * mod3(r2 + d2));
  let { isValid: Ns_D_is_sq, value: s2 } = uvRatio(Ns, D);
  let s_ = mod3(s2 * r0);
  if (!isNegativeLE(s_, P))
    s_ = mod3(-s_);
  if (!Ns_D_is_sq)
    s2 = s_;
  if (!Ns_D_is_sq)
    c2 = r2;
  const Nt = mod3(c2 * (r2 - _1n10) * D_MINUS_ONE_SQ - D);
  const s22 = s2 * s2;
  const W0 = mod3((s2 + s2) * D);
  const W1 = mod3(Nt * SQRT_AD_MINUS_ONE);
  const W2 = mod3(_1n10 - s22);
  const W3 = mod3(_1n10 + s22);
  return new ed25519.Point(mod3(W0 * W3), mod3(W2 * W1), mod3(W1 * W3), mod3(W0 * W2));
}
function ristretto255_map(bytes) {
  abytes3(bytes, 64);
  const r1 = bytes255ToNumberLE(bytes.subarray(0, 32));
  const R1 = calcElligatorRistrettoMap(r1);
  const r2 = bytes255ToNumberLE(bytes.subarray(32, 64));
  const R2 = calcElligatorRistrettoMap(r2);
  return new _RistrettoPoint(R1.add(R2));
}
var _RistrettoPoint = class __RistrettoPoint extends PrimeEdwardsPoint {
  constructor(ep) {
    super(ep);
  }
  static fromAffine(ap) {
    return new __RistrettoPoint(ed25519.Point.fromAffine(ap));
  }
  assertSame(other) {
    if (!(other instanceof __RistrettoPoint))
      throw new Error("RistrettoPoint expected");
  }
  init(ep) {
    return new __RistrettoPoint(ep);
  }
  /** @deprecated use `import { ristretto255_hasher } from '@noble/curves/ed25519.js';` */
  static hashToCurve(hex) {
    return ristretto255_map(ensureBytes("ristrettoHash", hex, 64));
  }
  static fromBytes(bytes) {
    abytes3(bytes, 32);
    const { a: a2, d: d2 } = ed25519_CURVE;
    const P = ed25519_CURVE_p;
    const mod3 = (n2) => Fp.create(n2);
    const s2 = bytes255ToNumberLE(bytes);
    if (!equalBytes2(Fp.toBytes(s2), bytes) || isNegativeLE(s2, P))
      throw new Error("invalid ristretto255 encoding 1");
    const s22 = mod3(s2 * s2);
    const u1 = mod3(_1n10 + a2 * s22);
    const u2 = mod3(_1n10 - a2 * s22);
    const u1_2 = mod3(u1 * u1);
    const u2_2 = mod3(u2 * u2);
    const v = mod3(a2 * d2 * u1_2 - u2_2);
    const { isValid, value: I } = invertSqrt(mod3(v * u2_2));
    const Dx = mod3(I * u2);
    const Dy = mod3(I * Dx * v);
    let x = mod3((s2 + s2) * Dx);
    if (isNegativeLE(x, P))
      x = mod3(-x);
    const y = mod3(u1 * Dy);
    const t2 = mod3(x * y);
    if (!isValid || isNegativeLE(t2, P) || y === _0n10)
      throw new Error("invalid ristretto255 encoding 2");
    return new __RistrettoPoint(new ed25519.Point(x, y, _1n10, t2));
  }
  /**
   * Converts ristretto-encoded string to ristretto point.
   * Described in [RFC9496](https://www.rfc-editor.org/rfc/rfc9496#name-decode).
   * @param hex Ristretto-encoded 32 bytes. Not every 32-byte string is valid ristretto encoding
   */
  static fromHex(hex) {
    return __RistrettoPoint.fromBytes(ensureBytes("ristrettoHex", hex, 32));
  }
  static msm(points, scalars) {
    return pippenger(__RistrettoPoint, ed25519.Point.Fn, points, scalars);
  }
  /**
   * Encodes ristretto point to Uint8Array.
   * Described in [RFC9496](https://www.rfc-editor.org/rfc/rfc9496#name-encode).
   */
  toBytes() {
    let { X, Y, Z, T } = this.ep;
    const P = ed25519_CURVE_p;
    const mod3 = (n2) => Fp.create(n2);
    const u1 = mod3(mod3(Z + Y) * mod3(Z - Y));
    const u2 = mod3(X * Y);
    const u2sq = mod3(u2 * u2);
    const { value: invsqrt } = invertSqrt(mod3(u1 * u2sq));
    const D1 = mod3(invsqrt * u1);
    const D2 = mod3(invsqrt * u2);
    const zInv = mod3(D1 * D2 * T);
    let D;
    if (isNegativeLE(T * zInv, P)) {
      let _x = mod3(Y * SQRT_M1);
      let _y = mod3(X * SQRT_M1);
      X = _x;
      Y = _y;
      D = mod3(D1 * INVSQRT_A_MINUS_D);
    } else {
      D = D2;
    }
    if (isNegativeLE(X * zInv, P))
      Y = mod3(-Y);
    let s2 = mod3((Z - Y) * D);
    if (isNegativeLE(s2, P))
      s2 = mod3(-s2);
    return Fp.toBytes(s2);
  }
  /**
   * Compares two Ristretto points.
   * Described in [RFC9496](https://www.rfc-editor.org/rfc/rfc9496#name-equals).
   */
  equals(other) {
    this.assertSame(other);
    const { X: X1, Y: Y1 } = this.ep;
    const { X: X2, Y: Y2 } = other.ep;
    const mod3 = (n2) => Fp.create(n2);
    const one = mod3(X1 * Y2) === mod3(Y1 * X2);
    const two = mod3(Y1 * Y2) === mod3(X1 * X2);
    return one || two;
  }
  is0() {
    return this.equals(__RistrettoPoint.ZERO);
  }
};
_RistrettoPoint.BASE = /* @__PURE__ */ (() => new _RistrettoPoint(ed25519.Point.BASE))();
_RistrettoPoint.ZERO = /* @__PURE__ */ (() => new _RistrettoPoint(ed25519.Point.ZERO))();
_RistrettoPoint.Fp = /* @__PURE__ */ (() => Fp)();
_RistrettoPoint.Fn = /* @__PURE__ */ (() => Fn)();

// node_modules/@noble/hashes/esm/hmac.js
var HMAC = class extends Hash2 {
  constructor(hash, _key) {
    super();
    this.finished = false;
    this.destroyed = false;
    ahash2(hash);
    const key = toBytes2(_key);
    this.iHash = hash.create();
    if (typeof this.iHash.update !== "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen;
    this.outputLen = this.iHash.outputLen;
    const blockLen = this.blockLen;
    const pad = new Uint8Array(blockLen);
    pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
    for (let i2 = 0; i2 < pad.length; i2++)
      pad[i2] ^= 54;
    this.iHash.update(pad);
    this.oHash = hash.create();
    for (let i2 = 0; i2 < pad.length; i2++)
      pad[i2] ^= 54 ^ 92;
    this.oHash.update(pad);
    clean3(pad);
  }
  update(buf) {
    aexists3(this);
    this.iHash.update(buf);
    return this;
  }
  digestInto(out) {
    aexists3(this);
    abytes3(out, this.outputLen);
    this.finished = true;
    this.iHash.digestInto(out);
    this.oHash.update(out);
    this.oHash.digestInto(out);
    this.destroy();
  }
  digest() {
    const out = new Uint8Array(this.oHash.outputLen);
    this.digestInto(out);
    return out;
  }
  _cloneInto(to) {
    to || (to = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
    to = to;
    to.finished = finished;
    to.destroyed = destroyed;
    to.blockLen = blockLen;
    to.outputLen = outputLen;
    to.oHash = oHash._cloneInto(to.oHash);
    to.iHash = iHash._cloneInto(to.iHash);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
  destroy() {
    this.destroyed = true;
    this.oHash.destroy();
    this.iHash.destroy();
  }
};
var hmac2 = (hash, key, message2) => new HMAC(hash, key).update(message2).digest();
hmac2.create = (hash, key) => new HMAC(hash, key);

// node_modules/@noble/hashes/esm/hkdf.js
function extract(hash, ikm, salt) {
  ahash2(hash);
  if (salt === void 0)
    salt = new Uint8Array(hash.outputLen);
  return hmac2(hash, toBytes2(salt), toBytes2(ikm));
}
var HKDF_COUNTER = /* @__PURE__ */ Uint8Array.from([0]);
var EMPTY_BUFFER = /* @__PURE__ */ Uint8Array.of();
function expand(hash, prk, info, length3 = 32) {
  ahash2(hash);
  anumber3(length3);
  const olen = hash.outputLen;
  if (length3 > 255 * olen)
    throw new Error("Length should be <= 255*HashLen");
  const blocks = Math.ceil(length3 / olen);
  if (info === void 0)
    info = EMPTY_BUFFER;
  const okm = new Uint8Array(blocks * olen);
  const HMAC2 = hmac2.create(hash, prk);
  const HMACTmp = HMAC2._cloneInto();
  const T = new Uint8Array(HMAC2.outputLen);
  for (let counter = 0; counter < blocks; counter++) {
    HKDF_COUNTER[0] = counter + 1;
    HMACTmp.update(counter === 0 ? EMPTY_BUFFER : T).update(info).update(HKDF_COUNTER).digestInto(T);
    okm.set(T, olen * counter);
    HMAC2._cloneInto(HMACTmp);
  }
  HMAC2.destroy();
  HMACTmp.destroy();
  clean3(T, HKDF_COUNTER);
  return okm.slice(0, length3);
}

// node_modules/@noble/hashes/esm/sha256.js
var sha2564 = sha2563;

// node_modules/@chainsafe/libp2p-noise/dist/src/crypto/js.js
var pureJsCrypto = {
  hashSHA256(data) {
    return sha2564(data.subarray());
  },
  getHKDF(ck, ikm) {
    const prk = extract(sha2564, ikm, ck);
    const okmU8Array = expand(sha2564, prk, void 0, 96);
    const okm = okmU8Array;
    const k1 = okm.subarray(0, 32);
    const k2 = okm.subarray(32, 64);
    const k3 = okm.subarray(64, 96);
    return [k1, k2, k3];
  },
  generateX25519KeyPair() {
    const secretKey = x25519.utils.randomPrivateKey();
    const publicKey = x25519.getPublicKey(secretKey);
    return {
      publicKey,
      privateKey: secretKey
    };
  },
  generateX25519KeyPairFromSeed(seed) {
    const publicKey = x25519.getPublicKey(seed);
    return {
      publicKey,
      privateKey: seed
    };
  },
  generateX25519SharedKey(privateKey, publicKey) {
    return x25519.getSharedSecret(privateKey.subarray(), publicKey.subarray());
  },
  chaCha20Poly1305Encrypt(plaintext, nonce, ad, k) {
    return chacha20poly1305(k, nonce, ad).encrypt(plaintext.subarray());
  },
  chaCha20Poly1305Decrypt(ciphertext, nonce, ad, k, dst) {
    return chacha20poly1305(k, nonce, ad).decrypt(ciphertext.subarray(), dst);
  }
};

// node_modules/@chainsafe/libp2p-noise/dist/src/crypto/index.js
var ctx2 = (0, import_as_chacha20poly1305.newInstance)();
var asImpl = new import_as_chacha20poly1305.ChaCha20Poly1305(ctx2);
var CHACHA_POLY1305 = "chacha20-poly1305";
var PKCS8_PREFIX = Buffer.from([48, 46, 2, 1, 0, 48, 5, 6, 3, 43, 101, 110, 4, 34, 4, 32]);
var X25519_PREFIX = Buffer.from([48, 42, 48, 5, 6, 3, 43, 101, 110, 3, 33, 0]);
var nodeCrypto = {
  hashSHA256(data) {
    const hash = import_node_crypto3.default.createHash("sha256");
    if (data instanceof Uint8Array) {
      return hash.update(data).digest();
    }
    for (const buf of data) {
      hash.update(buf);
    }
    return hash.digest();
  },
  chaCha20Poly1305Encrypt(plaintext, nonce, ad, k) {
    const cipher = import_node_crypto3.default.createCipheriv(CHACHA_POLY1305, k, nonce, {
      authTagLength: 16
    });
    cipher.setAAD(ad, { plaintextLength: plaintext.byteLength });
    if (plaintext instanceof Uint8Array) {
      const updated = cipher.update(plaintext);
      const final3 = cipher.final();
      const tag = cipher.getAuthTag();
      return Buffer.concat([updated, final3, tag], updated.byteLength + final3.byteLength + tag.byteLength);
    }
    const output = new Uint8ArrayList();
    for (const buf of plaintext) {
      output.append(cipher.update(buf));
    }
    const final2 = cipher.final();
    if (final2.byteLength > 0) {
      output.append(final2);
    }
    output.append(cipher.getAuthTag());
    return output;
  },
  chaCha20Poly1305Decrypt(ciphertext, nonce, ad, k, _dst) {
    const authTag = ciphertext.subarray(ciphertext.length - 16);
    const decipher = import_node_crypto3.default.createDecipheriv(CHACHA_POLY1305, k, nonce, {
      authTagLength: 16
    });
    let text;
    if (ciphertext instanceof Uint8Array) {
      text = ciphertext.subarray(0, ciphertext.length - 16);
    } else {
      text = ciphertext.sublist(0, ciphertext.length - 16);
    }
    decipher.setAAD(ad, {
      plaintextLength: text.byteLength
    });
    decipher.setAuthTag(authTag);
    if (text instanceof Uint8Array) {
      const output2 = decipher.update(text);
      const final3 = decipher.final();
      if (final3.byteLength > 0) {
        return Buffer.concat([output2, final3], output2.byteLength + final3.byteLength);
      }
      return output2;
    }
    const output = new Uint8ArrayList();
    for (const buf of text) {
      output.append(decipher.update(buf));
    }
    const final2 = decipher.final();
    if (final2.byteLength > 0) {
      output.append(final2);
    }
    return output;
  }
};
var asCrypto = {
  hashSHA256(data) {
    return digest2(data.subarray());
  },
  chaCha20Poly1305Encrypt(plaintext, nonce, ad, k) {
    return asImpl.seal(k, nonce, plaintext.subarray(), ad);
  },
  chaCha20Poly1305Decrypt(ciphertext, nonce, ad, k, dst) {
    const plaintext = asImpl.open(k, nonce, ciphertext.subarray(), ad, dst);
    if (!plaintext) {
      throw new Error("Invalid chacha20poly1305 decryption");
    }
    return plaintext;
  }
};
var defaultCrypto = {
  ...pureJsCrypto,
  hashSHA256(data) {
    return nodeCrypto.hashSHA256(data);
  },
  chaCha20Poly1305Encrypt(plaintext, nonce, ad, k) {
    if (plaintext.byteLength < 1200) {
      return asCrypto.chaCha20Poly1305Encrypt(plaintext, nonce, ad, k);
    }
    return nodeCrypto.chaCha20Poly1305Encrypt(plaintext, nonce, ad, k);
  },
  chaCha20Poly1305Decrypt(ciphertext, nonce, ad, k, dst) {
    if (ciphertext.byteLength < 1200) {
      return asCrypto.chaCha20Poly1305Decrypt(ciphertext, nonce, ad, k, dst);
    }
    return nodeCrypto.chaCha20Poly1305Decrypt(ciphertext, nonce, ad, k, dst);
  },
  generateX25519KeyPair() {
    const { publicKey, privateKey } = import_node_crypto3.default.generateKeyPairSync("x25519", {
      publicKeyEncoding: {
        type: "spki",
        format: "der"
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "der"
      }
    });
    return {
      publicKey: publicKey.subarray(X25519_PREFIX.length),
      privateKey: privateKey.subarray(PKCS8_PREFIX.length)
    };
  },
  generateX25519KeyPairFromSeed(seed) {
    const privateKey = import_node_crypto3.default.createPrivateKey({
      key: Buffer.concat([
        PKCS8_PREFIX,
        seed
      ], PKCS8_PREFIX.byteLength + seed.byteLength),
      type: "pkcs8",
      format: "der"
    });
    const publicKey = import_node_crypto3.default.createPublicKey(privateKey).export({
      type: "spki",
      format: "der"
    }).subarray(X25519_PREFIX.length);
    return {
      publicKey,
      privateKey: seed
    };
  },
  generateX25519SharedKey(privateKey, publicKey) {
    if (publicKey instanceof Uint8Array) {
      publicKey = Buffer.concat([
        X25519_PREFIX,
        publicKey
      ], X25519_PREFIX.byteLength + publicKey.byteLength);
    } else {
      publicKey = new Uint8ArrayList(X25519_PREFIX, publicKey).subarray();
    }
    if (privateKey instanceof Uint8Array) {
      privateKey = Buffer.concat([
        PKCS8_PREFIX,
        privateKey
      ], PKCS8_PREFIX.byteLength + privateKey.byteLength);
    } else {
      privateKey = new Uint8ArrayList(PKCS8_PREFIX, privateKey).subarray();
    }
    return import_node_crypto3.default.diffieHellman({
      publicKey: import_node_crypto3.default.createPublicKey({
        key: Buffer.from(publicKey.buffer, publicKey.byteOffset, publicKey.byteLength),
        type: "spki",
        format: "der"
      }),
      privateKey: import_node_crypto3.default.createPrivateKey({
        key: Buffer.from(privateKey.buffer, privateKey.byteOffset, privateKey.byteLength),
        type: "pkcs8",
        format: "der"
      })
    });
  }
};
if (isElectronMain) {
  defaultCrypto.chaCha20Poly1305Encrypt = asCrypto.chaCha20Poly1305Encrypt;
  defaultCrypto.chaCha20Poly1305Decrypt = asCrypto.chaCha20Poly1305Decrypt;
}

// node_modules/@chainsafe/libp2p-noise/dist/src/crypto.js
function wrapCrypto(crypto8) {
  return {
    generateKeypair: crypto8.generateX25519KeyPair,
    dh: (keypair3, publicKey) => crypto8.generateX25519SharedKey(keypair3.privateKey, publicKey).subarray(0, 32),
    encrypt: crypto8.chaCha20Poly1305Encrypt,
    decrypt: crypto8.chaCha20Poly1305Decrypt,
    hash: crypto8.hashSHA256,
    hkdf: crypto8.getHKDF
  };
}

// node_modules/@chainsafe/libp2p-noise/dist/src/encoder.js
var uint16BEEncode = (value2) => {
  const target = allocUnsafe(2);
  target[0] = value2 >> 8;
  target[1] = value2;
  return target;
};
uint16BEEncode.bytes = 2;
var uint16BEDecode = (data) => {
  if (data.length < 2) {
    throw RangeError("Could not decode int16BE");
  }
  if (data instanceof Uint8Array) {
    let value2 = 0;
    value2 += data[0] << 8;
    value2 += data[1];
    return value2;
  }
  return data.getUint16(0);
};
uint16BEDecode.bytes = 2;

// node_modules/@chainsafe/libp2p-noise/dist/src/metrics.js
function registerMetrics(metrics) {
  return {
    xxHandshakeSuccesses: metrics.registerCounter("libp2p_noise_xxhandshake_successes_total", {
      help: "Total count of noise xxHandshakes successes_"
    }),
    xxHandshakeErrors: metrics.registerCounter("libp2p_noise_xxhandshake_error_total", {
      help: "Total count of noise xxHandshakes errors"
    }),
    encryptedPackets: metrics.registerCounter("libp2p_noise_encrypted_packets_total", {
      help: "Total count of noise encrypted packets successfully"
    }),
    decryptedPackets: metrics.registerCounter("libp2p_noise_decrypted_packets_total", {
      help: "Total count of noise decrypted packets"
    }),
    decryptErrors: metrics.registerCounter("libp2p_noise_decrypt_errors_total", {
      help: "Total count of noise decrypt errors"
    })
  };
}

// node_modules/@chainsafe/libp2p-noise/dist/src/logger.js
function logLocalStaticKeys(s2, keyLogger) {
  if (!keyLogger.enabled || !DUMP_SESSION_KEYS) {
    return;
  }
  if (s2) {
    keyLogger(`LOCAL_STATIC_PUBLIC_KEY ${toString2(s2.publicKey, "hex")}`);
    keyLogger(`LOCAL_STATIC_PRIVATE_KEY ${toString2(s2.privateKey, "hex")}`);
  } else {
    keyLogger("Missing local static keys.");
  }
}
function logLocalEphemeralKeys(e2, keyLogger) {
  if (!keyLogger.enabled || !DUMP_SESSION_KEYS) {
    return;
  }
  if (e2) {
    keyLogger(`LOCAL_PUBLIC_EPHEMERAL_KEY ${toString2(e2.publicKey, "hex")}`);
    keyLogger(`LOCAL_PRIVATE_EPHEMERAL_KEY ${toString2(e2.privateKey, "hex")}`);
  } else {
    keyLogger("Missing local ephemeral keys.");
  }
}
function logRemoteStaticKey(rs, keyLogger) {
  if (!keyLogger.enabled || !DUMP_SESSION_KEYS) {
    return;
  }
  if (rs) {
    keyLogger(`REMOTE_STATIC_PUBLIC_KEY ${toString2(rs.subarray(), "hex")}`);
  } else {
    keyLogger("Missing remote static public key.");
  }
}
function logRemoteEphemeralKey(re, keyLogger) {
  if (!keyLogger.enabled || !DUMP_SESSION_KEYS) {
    return;
  }
  if (re) {
    keyLogger(`REMOTE_EPHEMERAL_PUBLIC_KEY ${toString2(re.subarray(), "hex")}`);
  } else {
    keyLogger("Missing remote ephemeral keys.");
  }
}
function logCipherState(cs1, cs2, keyLogger) {
  if (!keyLogger.enabled || !DUMP_SESSION_KEYS) {
    return;
  }
  keyLogger(`CIPHER_STATE_1 ${cs1.n.getUint64()} ${cs1.k && toString2(cs1.k, "hex")}`);
  keyLogger(`CIPHER_STATE_2 ${cs2.n.getUint64()} ${cs2.k && toString2(cs2.k, "hex")}`);
}

// node_modules/@chainsafe/libp2p-noise/dist/src/errors.js
var InvalidCryptoExchangeError2 = class _InvalidCryptoExchangeError extends Error {
  code;
  constructor(message2 = "Invalid crypto exchange") {
    super(message2);
    this.code = _InvalidCryptoExchangeError.code;
  }
  static code = "ERR_INVALID_CRYPTO_EXCHANGE";
};

// node_modules/@chainsafe/libp2p-noise/dist/src/nonce.js
var MIN_NONCE = 0;
var MAX_NONCE = 4294967295;
var ERR_MAX_NONCE = "Cipherstate has reached maximum n, a new handshake must be performed";
var Nonce = class {
  n;
  bytes;
  view;
  constructor(n2 = MIN_NONCE) {
    this.n = n2;
    this.bytes = alloc(12);
    this.view = new DataView(this.bytes.buffer, this.bytes.byteOffset, this.bytes.byteLength);
    this.view.setUint32(4, n2, true);
  }
  increment() {
    this.n++;
    this.view.setUint32(4, this.n, true);
  }
  getBytes() {
    return this.bytes;
  }
  getUint64() {
    return this.n;
  }
  assertValue() {
    if (this.n > MAX_NONCE) {
      throw new Error(ERR_MAX_NONCE);
    }
  }
};

// node_modules/@chainsafe/libp2p-noise/dist/src/protocol.js
var ZEROLEN = alloc(0);
var CipherState = class {
  k;
  n;
  crypto;
  constructor(crypto8, k = void 0, n2 = 0) {
    this.crypto = crypto8;
    this.k = k;
    this.n = new Nonce(n2);
  }
  hasKey() {
    return Boolean(this.k);
  }
  encryptWithAd(ad, plaintext) {
    if (!this.hasKey()) {
      return plaintext;
    }
    this.n.assertValue();
    const e2 = this.crypto.encrypt(plaintext, this.n.getBytes(), ad, this.k);
    this.n.increment();
    return e2;
  }
  decryptWithAd(ad, ciphertext, dst) {
    if (!this.hasKey()) {
      return ciphertext;
    }
    this.n.assertValue();
    const plaintext = this.crypto.decrypt(ciphertext, this.n.getBytes(), ad, this.k, dst);
    this.n.increment();
    return plaintext;
  }
};
var SymmetricState = class {
  cs;
  ck;
  h;
  crypto;
  constructor(crypto8, protocolName) {
    this.crypto = crypto8;
    const protocolNameBytes = fromString2(protocolName, "utf-8");
    this.h = hashProtocolName(crypto8, protocolNameBytes);
    this.ck = this.h;
    this.cs = new CipherState(crypto8);
  }
  mixKey(ikm) {
    const [ck, tempK] = this.crypto.hkdf(this.ck, ikm);
    this.ck = ck;
    this.cs = new CipherState(this.crypto, tempK);
  }
  mixHash(data) {
    this.h = this.crypto.hash(new Uint8ArrayList(this.h, data));
  }
  encryptAndHash(plaintext) {
    const ciphertext = this.cs.encryptWithAd(this.h, plaintext);
    this.mixHash(ciphertext);
    return ciphertext;
  }
  decryptAndHash(ciphertext) {
    const plaintext = this.cs.decryptWithAd(this.h, ciphertext);
    this.mixHash(ciphertext);
    return plaintext;
  }
  split() {
    const [tempK1, tempK2] = this.crypto.hkdf(this.ck, ZEROLEN);
    return [new CipherState(this.crypto, tempK1), new CipherState(this.crypto, tempK2)];
  }
};
var AbstractHandshakeState = class {
  ss;
  s;
  e;
  rs;
  re;
  initiator;
  crypto;
  constructor(init2) {
    const { crypto: crypto8, protocolName, prologue, initiator, s: s2, e: e2, rs, re } = init2;
    this.crypto = crypto8;
    this.ss = new SymmetricState(crypto8, protocolName);
    this.ss.mixHash(prologue);
    this.initiator = initiator;
    this.s = s2;
    this.e = e2;
    this.rs = rs;
    this.re = re;
  }
  writeE() {
    if (this.e) {
      throw new Error("ephemeral keypair is already set");
    }
    const e2 = this.crypto.generateKeypair();
    this.ss.mixHash(e2.publicKey);
    this.e = e2;
    return e2.publicKey;
  }
  writeS() {
    if (!this.s) {
      throw new Error("static keypair is not set");
    }
    return this.ss.encryptAndHash(this.s.publicKey);
  }
  writeEE() {
    if (!this.e) {
      throw new Error("ephemeral keypair is not set");
    }
    if (!this.re) {
      throw new Error("remote ephemeral public key is not set");
    }
    this.ss.mixKey(this.crypto.dh(this.e, this.re));
  }
  writeES() {
    if (this.initiator) {
      if (!this.e) {
        throw new Error("ephemeral keypair is not set");
      }
      if (!this.rs) {
        throw new Error("remote static public key is not set");
      }
      this.ss.mixKey(this.crypto.dh(this.e, this.rs));
    } else {
      if (!this.s) {
        throw new Error("static keypair is not set");
      }
      if (!this.re) {
        throw new Error("remote ephemeral public key is not set");
      }
      this.ss.mixKey(this.crypto.dh(this.s, this.re));
    }
  }
  writeSE() {
    if (this.initiator) {
      if (!this.s) {
        throw new Error("static keypair is not set");
      }
      if (!this.re) {
        throw new Error("remote ephemeral public key is not set");
      }
      this.ss.mixKey(this.crypto.dh(this.s, this.re));
    } else {
      if (!this.e) {
        throw new Error("ephemeral keypair is not set");
      }
      if (!this.rs) {
        throw new Error("remote static public key is not set");
      }
      this.ss.mixKey(this.crypto.dh(this.e, this.rs));
    }
  }
  readE(message2, offset = 0) {
    if (this.re) {
      throw new Error("remote ephemeral public key is already set");
    }
    if (message2.byteLength < offset + 32) {
      throw new Error("message is not long enough");
    }
    this.re = message2.sublist(offset, offset + 32);
    this.ss.mixHash(this.re);
  }
  readS(message2, offset = 0) {
    if (this.rs) {
      throw new Error("remote static public key is already set");
    }
    const cipherLength = 32 + (this.ss.cs.hasKey() ? 16 : 0);
    if (message2.byteLength < offset + cipherLength) {
      throw new Error("message is not long enough");
    }
    const temp = message2.sublist(offset, offset + cipherLength);
    this.rs = this.ss.decryptAndHash(temp);
    return cipherLength;
  }
  readEE() {
    this.writeEE();
  }
  readES() {
    this.writeES();
  }
  readSE() {
    this.writeSE();
  }
};
var XXHandshakeState = class extends AbstractHandshakeState {
  // e
  writeMessageA(payload) {
    return new Uint8ArrayList(this.writeE(), this.ss.encryptAndHash(payload));
  }
  // e, ee, s, es
  writeMessageB(payload) {
    const e2 = this.writeE();
    this.writeEE();
    const encS = this.writeS();
    this.writeES();
    return new Uint8ArrayList(e2, encS, this.ss.encryptAndHash(payload));
  }
  // s, se
  writeMessageC(payload) {
    const encS = this.writeS();
    this.writeSE();
    return new Uint8ArrayList(encS, this.ss.encryptAndHash(payload));
  }
  // e
  readMessageA(message2) {
    try {
      this.readE(message2);
      return this.ss.decryptAndHash(message2.sublist(32));
    } catch (e2) {
      throw new InvalidCryptoExchangeError2(`handshake stage 0 validation fail: ${e2.message}`);
    }
  }
  // e, ee, s, es
  readMessageB(message2) {
    try {
      this.readE(message2);
      this.readEE();
      const consumed = this.readS(message2, 32);
      this.readES();
      return this.ss.decryptAndHash(message2.sublist(32 + consumed));
    } catch (e2) {
      throw new InvalidCryptoExchangeError2(`handshake stage 1 validation fail: ${e2.message}`);
    }
  }
  // s, se
  readMessageC(message2) {
    try {
      const consumed = this.readS(message2);
      this.readSE();
      return this.ss.decryptAndHash(message2.sublist(consumed));
    } catch (e2) {
      throw new InvalidCryptoExchangeError2(`handshake stage 2 validation fail: ${e2.message}`);
    }
  }
};
function hashProtocolName(crypto8, protocolName) {
  if (protocolName.length <= 32) {
    const h = alloc(32);
    h.set(protocolName);
    return h;
  } else {
    return crypto8.hash(protocolName);
  }
}

// node_modules/@chainsafe/libp2p-noise/dist/src/proto/payload.js
var NoiseExtensions;
(function(NoiseExtensions2) {
  let _codec;
  NoiseExtensions2.codec = () => {
    if (_codec == null) {
      _codec = message((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork();
        }
        if (obj.webtransportCerthashes != null) {
          for (const value2 of obj.webtransportCerthashes) {
            w.uint32(10);
            w.bytes(value2);
          }
        }
        if (obj.streamMuxers != null) {
          for (const value2 of obj.streamMuxers) {
            w.uint32(18);
            w.string(value2);
          }
        }
        if (opts.lengthDelimited !== false) {
          w.ldelim();
        }
      }, (reader, length3, opts = {}) => {
        const obj = {
          webtransportCerthashes: [],
          streamMuxers: []
        };
        const end = length3 == null ? reader.len : reader.pos + length3;
        while (reader.pos < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.webtransportCerthashes != null && obj.webtransportCerthashes.length === opts.limits.webtransportCerthashes) {
                throw new MaxLengthError('Decode error - map field "webtransportCerthashes" had too many elements');
              }
              obj.webtransportCerthashes.push(reader.bytes());
              break;
            }
            case 2: {
              if (opts.limits?.streamMuxers != null && obj.streamMuxers.length === opts.limits.streamMuxers) {
                throw new MaxLengthError('Decode error - map field "streamMuxers" had too many elements');
              }
              obj.streamMuxers.push(reader.string());
              break;
            }
            default: {
              reader.skipType(tag & 7);
              break;
            }
          }
        }
        return obj;
      });
    }
    return _codec;
  };
  NoiseExtensions2.encode = (obj) => {
    return encodeMessage(obj, NoiseExtensions2.codec());
  };
  NoiseExtensions2.decode = (buf, opts) => {
    return decodeMessage(buf, NoiseExtensions2.codec(), opts);
  };
})(NoiseExtensions || (NoiseExtensions = {}));
var NoiseHandshakePayload;
(function(NoiseHandshakePayload2) {
  let _codec;
  NoiseHandshakePayload2.codec = () => {
    if (_codec == null) {
      _codec = message((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork();
        }
        if (obj.identityKey != null && obj.identityKey.byteLength > 0) {
          w.uint32(10);
          w.bytes(obj.identityKey);
        }
        if (obj.identitySig != null && obj.identitySig.byteLength > 0) {
          w.uint32(18);
          w.bytes(obj.identitySig);
        }
        if (obj.extensions != null) {
          w.uint32(34);
          NoiseExtensions.codec().encode(obj.extensions, w);
        }
        if (opts.lengthDelimited !== false) {
          w.ldelim();
        }
      }, (reader, length3, opts = {}) => {
        const obj = {
          identityKey: alloc(0),
          identitySig: alloc(0)
        };
        const end = length3 == null ? reader.len : reader.pos + length3;
        while (reader.pos < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1: {
              obj.identityKey = reader.bytes();
              break;
            }
            case 2: {
              obj.identitySig = reader.bytes();
              break;
            }
            case 4: {
              obj.extensions = NoiseExtensions.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.extensions
              });
              break;
            }
            default: {
              reader.skipType(tag & 7);
              break;
            }
          }
        }
        return obj;
      });
    }
    return _codec;
  };
  NoiseHandshakePayload2.encode = (obj) => {
    return encodeMessage(obj, NoiseHandshakePayload2.codec());
  };
  NoiseHandshakePayload2.decode = (buf, opts) => {
    return decodeMessage(buf, NoiseHandshakePayload2.codec(), opts);
  };
})(NoiseHandshakePayload || (NoiseHandshakePayload = {}));

// node_modules/@chainsafe/libp2p-noise/dist/src/utils.js
async function createHandshakePayload(privateKey, staticPublicKey, extensions) {
  const identitySig = await privateKey.sign(getSignaturePayload(staticPublicKey));
  return NoiseHandshakePayload.encode({
    identityKey: publicKeyToProtobuf(privateKey.publicKey),
    identitySig,
    extensions
  });
}
async function decodeHandshakePayload(payloadBytes, remoteStaticKey, remoteIdentityKey) {
  try {
    const payload = NoiseHandshakePayload.decode(payloadBytes);
    const publicKey = publicKeyFromProtobuf(payload.identityKey);
    if (remoteIdentityKey?.equals(publicKey) === false) {
      throw new Error(`Payload identity key ${publicKey} does not match expected remote identity key ${remoteIdentityKey}`);
    }
    if (!remoteStaticKey) {
      throw new Error("Remote static does not exist");
    }
    const signaturePayload = getSignaturePayload(remoteStaticKey);
    if (!await publicKey.verify(signaturePayload, payload.identitySig)) {
      throw new Error("Invalid payload signature");
    }
    return payload;
  } catch (e2) {
    throw new UnexpectedPeerError(e2.message);
  }
}
function getSignaturePayload(publicKey) {
  const prefix = fromString2("noise-libp2p-static-key:");
  if (publicKey instanceof Uint8Array) {
    return concat([prefix, publicKey], prefix.length + publicKey.length);
  }
  publicKey.prepend(prefix);
  return publicKey;
}

// node_modules/@chainsafe/libp2p-noise/dist/src/performHandshake.js
async function performHandshakeInitiator(init2, options) {
  const { log: log2, connection, crypto: crypto8, privateKey, prologue, s: s2, remoteIdentityKey, extensions } = init2;
  const payload = await createHandshakePayload(privateKey, s2.publicKey, extensions);
  const xx = new XXHandshakeState({
    crypto: crypto8,
    protocolName: "Noise_XX_25519_ChaChaPoly_SHA256",
    initiator: true,
    prologue,
    s: s2
  });
  logLocalStaticKeys(xx.s, log2);
  log2.trace("Stage 0 - Initiator starting to send first message.");
  await connection.write(xx.writeMessageA(ZEROLEN), options);
  log2.trace("Stage 0 - Initiator finished sending first message.");
  logLocalEphemeralKeys(xx.e, log2);
  log2.trace("Stage 1 - Initiator waiting to receive first message from responder...");
  const plaintext = xx.readMessageB(await connection.read(options));
  log2.trace("Stage 1 - Initiator received the message.");
  logRemoteEphemeralKey(xx.re, log2);
  logRemoteStaticKey(xx.rs, log2);
  log2.trace("Initiator going to check remote's signature...");
  const receivedPayload = await decodeHandshakePayload(plaintext, xx.rs, remoteIdentityKey);
  log2.trace("All good with the signature!");
  log2.trace("Stage 2 - Initiator sending third handshake message.");
  await connection.write(xx.writeMessageC(payload), options);
  log2.trace("Stage 2 - Initiator sent message with signed payload.");
  const [cs1, cs2] = xx.ss.split();
  logCipherState(cs1, cs2, log2);
  return {
    payload: receivedPayload,
    encrypt: (plaintext2) => cs1.encryptWithAd(ZEROLEN, plaintext2),
    decrypt: (ciphertext, dst) => cs2.decryptWithAd(ZEROLEN, ciphertext, dst)
  };
}
async function performHandshakeResponder(init2, options) {
  const { log: log2, connection, crypto: crypto8, privateKey, prologue, s: s2, remoteIdentityKey, extensions } = init2;
  const payload = await createHandshakePayload(privateKey, s2.publicKey, extensions);
  const xx = new XXHandshakeState({
    crypto: crypto8,
    protocolName: "Noise_XX_25519_ChaChaPoly_SHA256",
    initiator: false,
    prologue,
    s: s2
  });
  logLocalStaticKeys(xx.s, log2);
  log2.trace("Stage 0 - Responder waiting to receive first message.");
  xx.readMessageA(await connection.read(options));
  log2.trace("Stage 0 - Responder received first message.");
  logRemoteEphemeralKey(xx.re, log2);
  log2.trace("Stage 1 - Responder sending out first message with signed payload and static key.");
  await connection.write(xx.writeMessageB(payload), options);
  log2.trace("Stage 1 - Responder sent the second handshake message with signed payload.");
  logLocalEphemeralKeys(xx.e, log2);
  log2.trace("Stage 2 - Responder waiting for third handshake message...");
  const plaintext = xx.readMessageC(await connection.read(options));
  log2.trace("Stage 2 - Responder received the message, finished handshake.");
  const receivedPayload = await decodeHandshakePayload(plaintext, xx.rs, remoteIdentityKey);
  const [cs1, cs2] = xx.ss.split();
  logCipherState(cs1, cs2, log2);
  return {
    payload: receivedPayload,
    encrypt: (plaintext2) => cs2.encryptWithAd(ZEROLEN, plaintext2),
    decrypt: (ciphertext, dst) => cs1.decryptWithAd(ZEROLEN, ciphertext, dst)
  };
}

// node_modules/@chainsafe/libp2p-noise/dist/src/streaming.js
var CHACHA_TAG_LENGTH = 16;
function encryptStream(handshake, metrics) {
  return async function* (source) {
    for await (const chunk of source) {
      for (let i2 = 0; i2 < chunk.length; i2 += NOISE_MSG_MAX_LENGTH_BYTES_WITHOUT_TAG) {
        let end = i2 + NOISE_MSG_MAX_LENGTH_BYTES_WITHOUT_TAG;
        if (end > chunk.length) {
          end = chunk.length;
        }
        let data;
        if (chunk instanceof Uint8Array) {
          data = handshake.encrypt(chunk.subarray(i2, end));
        } else {
          data = handshake.encrypt(chunk.sublist(i2, end));
        }
        metrics?.encryptedPackets.increment();
        yield new Uint8ArrayList(uint16BEEncode(data.byteLength), data);
      }
    }
  };
}
function decryptStream(handshake, metrics) {
  return async function* (source) {
    for await (const chunk of source) {
      for (let i2 = 0; i2 < chunk.length; i2 += NOISE_MSG_MAX_LENGTH_BYTES) {
        let end = i2 + NOISE_MSG_MAX_LENGTH_BYTES;
        if (end > chunk.length) {
          end = chunk.length;
        }
        if (end - CHACHA_TAG_LENGTH < i2) {
          throw new Error("Invalid chunk");
        }
        const encrypted = chunk.sublist(i2, end);
        const dst = chunk.subarray(i2, end - CHACHA_TAG_LENGTH);
        try {
          const plaintext = handshake.decrypt(encrypted, dst);
          metrics?.decryptedPackets.increment();
          yield plaintext;
        } catch (e2) {
          metrics?.decryptErrors.increment();
          throw e2;
        }
      }
    }
  };
}

// node_modules/@chainsafe/libp2p-noise/dist/src/noise.js
var Noise = class {
  protocol = "/noise";
  crypto;
  prologue;
  staticKey;
  extensions;
  metrics;
  components;
  constructor(components, init2 = {}) {
    const { staticNoiseKey, extensions, crypto: crypto8, prologueBytes } = init2;
    const { metrics } = components;
    this.components = components;
    const _crypto = crypto8 ?? defaultCrypto;
    this.crypto = wrapCrypto(_crypto);
    this.extensions = {
      webtransportCerthashes: [],
      ...extensions
    };
    this.metrics = metrics ? registerMetrics(metrics) : void 0;
    if (staticNoiseKey) {
      this.staticKey = _crypto.generateX25519KeyPairFromSeed(staticNoiseKey);
    } else {
      this.staticKey = _crypto.generateX25519KeyPair();
    }
    this.prologue = prologueBytes ?? alloc(0);
  }
  [Symbol.toStringTag] = "@chainsafe/libp2p-noise";
  [serviceCapabilities] = [
    "@libp2p/connection-encryption",
    "@chainsafe/libp2p-noise"
  ];
  /**
   * Encrypt outgoing data to the remote party (handshake as initiator)
   *
   * @param connection - streaming iterable duplex that will be encrypted
   * @param options
   * @param options.remotePeer - PeerId of the remote peer. Used to validate the integrity of the remote peer
   * @param options.signal - Used to abort the operation
   */
  async secureOutbound(connection, options) {
    const wrappedConnection = lpStream(connection, {
      lengthEncoder: uint16BEEncode,
      lengthDecoder: uint16BEDecode,
      maxDataLength: NOISE_MSG_MAX_LENGTH_BYTES
    });
    const handshake = await this.performHandshakeInitiator(wrappedConnection, this.components.privateKey, options?.remotePeer?.publicKey, options);
    const conn = await this.createSecureConnection(wrappedConnection, handshake);
    connection.source = conn.source;
    connection.sink = conn.sink;
    const publicKey = publicKeyFromProtobuf(handshake.payload.identityKey);
    return {
      conn: connection,
      remoteExtensions: handshake.payload.extensions,
      remotePeer: peerIdFromPublicKey(publicKey),
      streamMuxer: options?.skipStreamMuxerNegotiation === true ? void 0 : this.getStreamMuxer(handshake.payload.extensions?.streamMuxers)
    };
  }
  getStreamMuxer(protocols2) {
    if (protocols2 == null || protocols2.length === 0) {
      return;
    }
    const streamMuxers = this.components.upgrader.getStreamMuxers();
    if (streamMuxers != null) {
      for (const protocol of protocols2) {
        const streamMuxer = streamMuxers.get(protocol);
        if (streamMuxer != null) {
          return streamMuxer;
        }
      }
    }
    if (protocols2.length) {
      throw new InvalidCryptoExchangeError("Early muxer negotiation was requested but the initiator and responder had no common muxers");
    }
  }
  /**
   * Decrypt incoming data (handshake as responder).
   *
   * @param connection - streaming iterable duplex that will be encrypted
   * @param options
   * @param options.remotePeer - PeerId of the remote peer. Used to validate the integrity of the remote peer
   * @param options.signal - Used to abort the operation
   */
  async secureInbound(connection, options) {
    const wrappedConnection = lpStream(connection, {
      lengthEncoder: uint16BEEncode,
      lengthDecoder: uint16BEDecode,
      maxDataLength: NOISE_MSG_MAX_LENGTH_BYTES
    });
    const handshake = await this.performHandshakeResponder(wrappedConnection, this.components.privateKey, options?.remotePeer?.publicKey, options);
    const conn = await this.createSecureConnection(wrappedConnection, handshake);
    connection.source = conn.source;
    connection.sink = conn.sink;
    const publicKey = publicKeyFromProtobuf(handshake.payload.identityKey);
    return {
      conn: connection,
      remoteExtensions: handshake.payload.extensions,
      remotePeer: peerIdFromPublicKey(publicKey),
      streamMuxer: options?.skipStreamMuxerNegotiation === true ? void 0 : this.getStreamMuxer(handshake.payload.extensions?.streamMuxers)
    };
  }
  /**
   * Perform XX handshake as initiator.
   */
  async performHandshakeInitiator(connection, privateKey, remoteIdentityKey, options) {
    let result;
    const streamMuxers = options?.skipStreamMuxerNegotiation === true ? [] : [...this.components.upgrader.getStreamMuxers().keys()];
    try {
      result = await performHandshakeInitiator({
        connection,
        privateKey,
        remoteIdentityKey,
        log: this.components.logger.forComponent("libp2p:noise:xxhandshake"),
        crypto: this.crypto,
        prologue: this.prologue,
        s: this.staticKey,
        extensions: {
          streamMuxers,
          webtransportCerthashes: [],
          ...this.extensions
        }
      }, options);
      this.metrics?.xxHandshakeSuccesses.increment();
    } catch (e2) {
      this.metrics?.xxHandshakeErrors.increment();
      throw e2;
    }
    return result;
  }
  /**
   * Perform XX handshake as responder.
   */
  async performHandshakeResponder(connection, privateKey, remoteIdentityKey, options) {
    let result;
    const streamMuxers = options?.skipStreamMuxerNegotiation === true ? [] : [...this.components.upgrader.getStreamMuxers().keys()];
    try {
      result = await performHandshakeResponder({
        connection,
        privateKey,
        remoteIdentityKey,
        log: this.components.logger.forComponent("libp2p:noise:xxhandshake"),
        crypto: this.crypto,
        prologue: this.prologue,
        s: this.staticKey,
        extensions: {
          streamMuxers,
          webtransportCerthashes: [],
          ...this.extensions
        }
      }, options);
      this.metrics?.xxHandshakeSuccesses.increment();
    } catch (e2) {
      this.metrics?.xxHandshakeErrors.increment();
      throw e2;
    }
    return result;
  }
  async createSecureConnection(connection, handshake) {
    const [secure, user] = duplexPair();
    const network = connection.unwrap();
    await pipe(
      secure,
      // write to wrapper
      encryptStream(handshake, this.metrics),
      // encrypt data + prefix with message length
      network,
      // send to the remote peer
      (source) => decode7(source, { lengthDecoder: uint16BEDecode }),
      // read message length prefix
      decryptStream(handshake, this.metrics),
      // decrypt the incoming data
      secure
      // pipe to the wrapper
    );
    return user;
  }
};

// node_modules/@chainsafe/libp2p-noise/dist/src/index.js
function noise(init2 = {}) {
  return (components) => new Noise(components, init2);
}

// node_modules/@libp2p/webrtc/dist/src/index.js
function webRTC(init2) {
  return (components) => new WebRTCTransport(components, init2);
}

// node_modules/@chainsafe/libp2p-yamux/dist/src/errors.js
var InvalidFrameError = class extends Error {
  static name = "InvalidFrameError";
  constructor(message2 = "The frame was invalid") {
    super(message2);
    this.name = "InvalidFrameError";
  }
};
var UnrequestedPingError = class extends Error {
  static name = "UnrequestedPingError";
  constructor(message2 = "Unrequested ping error") {
    super(message2);
    this.name = "UnrequestedPingError";
  }
};
var NotMatchingPingError = class extends Error {
  static name = "NotMatchingPingError";
  constructor(message2 = "Unrequested ping error") {
    super(message2);
    this.name = "NotMatchingPingError";
  }
};
var InvalidStateError2 = class extends Error {
  static name = "InvalidStateError";
  constructor(message2 = "Invalid state") {
    super(message2);
    this.name = "InvalidStateError";
  }
};
var StreamAlreadyExistsError = class extends Error {
  static name = "StreamAlreadyExistsError";
  constructor(message2 = "Strean already exists") {
    super(message2);
    this.name = "StreamAlreadyExistsError";
  }
};
var DecodeInvalidVersionError = class extends Error {
  static name = "DecodeInvalidVersionError";
  constructor(message2 = "Decode invalid version") {
    super(message2);
    this.name = "DecodeInvalidVersionError";
  }
};
var BothClientsError = class extends Error {
  static name = "BothClientsError";
  constructor(message2 = "Both clients") {
    super(message2);
    this.name = "BothClientsError";
  }
};
var ReceiveWindowExceededError = class extends Error {
  static name = "ReceiveWindowExceededError";
  constructor(message2 = "Receive window exceeded") {
    super(message2);
    this.name = "ReceiveWindowExceededError";
  }
};

// node_modules/@chainsafe/libp2p-yamux/dist/src/constants.js
var PROTOCOL_ERRORS = /* @__PURE__ */ new Set([
  InvalidFrameError.name,
  UnrequestedPingError.name,
  NotMatchingPingError.name,
  StreamAlreadyExistsError.name,
  DecodeInvalidVersionError.name,
  BothClientsError.name,
  ReceiveWindowExceededError.name
]);
var INITIAL_STREAM_WINDOW = 256 * 1024;
var MAX_STREAM_WINDOW = 16 * 1024 * 1024;

// node_modules/@chainsafe/libp2p-yamux/dist/src/config.js
var defaultConfig = {
  enableKeepAlive: true,
  keepAliveInterval: 3e4,
  maxInboundStreams: 1e3,
  maxOutboundStreams: 1e3,
  initialStreamWindowSize: INITIAL_STREAM_WINDOW,
  maxStreamWindowSize: MAX_STREAM_WINDOW,
  maxMessageSize: 64 * 1024
};
function verifyConfig(config) {
  if (config.keepAliveInterval <= 0) {
    throw new InvalidParametersError2("keep-alive interval must be positive");
  }
  if (config.maxInboundStreams < 0) {
    throw new InvalidParametersError2("max inbound streams must be larger or equal 0");
  }
  if (config.maxOutboundStreams < 0) {
    throw new InvalidParametersError2("max outbound streams must be larger or equal 0");
  }
  if (config.initialStreamWindowSize < INITIAL_STREAM_WINDOW) {
    throw new InvalidParametersError2("InitialStreamWindowSize must be larger or equal 256 kB");
  }
  if (config.maxStreamWindowSize < config.initialStreamWindowSize) {
    throw new InvalidParametersError2("MaxStreamWindowSize must be larger than the InitialStreamWindowSize");
  }
  if (config.maxStreamWindowSize > 2 ** 32 - 1) {
    throw new InvalidParametersError2("MaxStreamWindowSize must be less than equal MAX_UINT32");
  }
  if (config.maxMessageSize < 1024) {
    throw new InvalidParametersError2("MaxMessageSize must be greater than a kilobyte");
  }
}

// node_modules/@chainsafe/libp2p-yamux/dist/src/frame.js
var FrameType;
(function(FrameType2) {
  FrameType2[FrameType2["Data"] = 0] = "Data";
  FrameType2[FrameType2["WindowUpdate"] = 1] = "WindowUpdate";
  FrameType2[FrameType2["Ping"] = 2] = "Ping";
  FrameType2[FrameType2["GoAway"] = 3] = "GoAway";
})(FrameType || (FrameType = {}));
var Flag;
(function(Flag2) {
  Flag2[Flag2["SYN"] = 1] = "SYN";
  Flag2[Flag2["ACK"] = 2] = "ACK";
  Flag2[Flag2["FIN"] = 4] = "FIN";
  Flag2[Flag2["RST"] = 8] = "RST";
})(Flag || (Flag = {}));
var flagCodes = Object.values(Flag).filter((x) => typeof x !== "string");
var YAMUX_VERSION = 0;
var GoAwayCode;
(function(GoAwayCode2) {
  GoAwayCode2[GoAwayCode2["NormalTermination"] = 0] = "NormalTermination";
  GoAwayCode2[GoAwayCode2["ProtocolError"] = 1] = "ProtocolError";
  GoAwayCode2[GoAwayCode2["InternalError"] = 2] = "InternalError";
})(GoAwayCode || (GoAwayCode = {}));
var HEADER_LENGTH = 12;

// node_modules/@chainsafe/libp2p-yamux/dist/src/decode.js
var twoPow24 = 2 ** 24;
function decodeHeader(data) {
  if (data[0] !== YAMUX_VERSION) {
    throw new InvalidFrameError("Invalid frame version");
  }
  return {
    type: data[1],
    flag: (data[2] << 8) + data[3],
    streamID: data[4] * twoPow24 + (data[5] << 16) + (data[6] << 8) + data[7],
    length: data[8] * twoPow24 + (data[9] << 16) + (data[10] << 8) + data[11]
  };
}
var Decoder2 = class {
  source;
  /** Buffer for in-progress frames */
  buffer;
  /** Used to sanity check against decoding while in an inconsistent state */
  frameInProgress;
  constructor(source) {
    this.source = returnlessSource(source);
    this.buffer = new Uint8ArrayList();
    this.frameInProgress = false;
  }
  /**
   * Emits frames from the decoder source.
   *
   * Note: If `readData` is emitted, it _must_ be called before the next iteration
   * Otherwise an error is thrown
   */
  async *emitFrames() {
    for await (const chunk of this.source) {
      this.buffer.append(chunk);
      while (true) {
        const header = this.readHeader();
        if (header === void 0) {
          break;
        }
        const { type, length: length3 } = header;
        if (type === FrameType.Data) {
          this.frameInProgress = true;
          yield {
            header,
            readData: this.readBytes.bind(this, length3)
          };
        } else {
          yield { header };
        }
      }
    }
  }
  readHeader() {
    if (this.frameInProgress) {
      throw new InvalidStateError2("decoding frame already in progress");
    }
    if (this.buffer.length < HEADER_LENGTH) {
      return;
    }
    const header = decodeHeader(this.buffer.subarray(0, HEADER_LENGTH));
    this.buffer.consume(HEADER_LENGTH);
    return header;
  }
  async readBytes(length3) {
    if (this.buffer.length < length3) {
      for await (const chunk of this.source) {
        this.buffer.append(chunk);
        if (this.buffer.length >= length3) {
          break;
        }
      }
    }
    const out = this.buffer.sublist(0, length3);
    this.buffer.consume(length3);
    this.frameInProgress = false;
    return out;
  }
};
function returnlessSource(source) {
  if (source[Symbol.iterator] !== void 0) {
    const iterator = source[Symbol.iterator]();
    iterator.return = void 0;
    return {
      [Symbol.iterator]() {
        return iterator;
      }
    };
  } else if (source[Symbol.asyncIterator] !== void 0) {
    const iterator = source[Symbol.asyncIterator]();
    iterator.return = void 0;
    return {
      [Symbol.asyncIterator]() {
        return iterator;
      }
    };
  } else {
    throw new Error("a source must be either an iterable or an async iterable");
  }
}

// node_modules/@chainsafe/libp2p-yamux/dist/src/encode.js
function encodeHeader(header) {
  const frame = new Uint8Array(HEADER_LENGTH);
  frame[1] = header.type;
  frame[2] = header.flag >>> 8;
  frame[3] = header.flag;
  frame[4] = header.streamID >>> 24;
  frame[5] = header.streamID >>> 16;
  frame[6] = header.streamID >>> 8;
  frame[7] = header.streamID;
  frame[8] = header.length >>> 24;
  frame[9] = header.length >>> 16;
  frame[10] = header.length >>> 8;
  frame[11] = header.length;
  return frame;
}

// node_modules/it-foreach/dist/src/index.js
function isAsyncIterable9(thing) {
  return thing[Symbol.asyncIterator] != null;
}
function isPromise4(thing) {
  return thing?.then != null;
}
function forEach(source, fn) {
  let index = 0;
  if (isAsyncIterable9(source)) {
    return async function* () {
      for await (const val of source) {
        const res2 = fn(val, index++);
        if (isPromise4(res2)) {
          await res2;
        }
        yield val;
      }
    }();
  }
  const peekable2 = src_default4(source);
  const { value: value2, done } = peekable2.next();
  if (done === true) {
    return function* () {
    }();
  }
  const res = fn(value2, index++);
  if (typeof res?.then === "function") {
    return async function* () {
      await res;
      yield value2;
      for (const val of peekable2) {
        const res2 = fn(val, index++);
        if (isPromise4(res2)) {
          await res2;
        }
        yield val;
      }
    }();
  }
  const func = fn;
  return function* () {
    yield value2;
    for (const val of peekable2) {
      func(val, index++);
      yield val;
    }
  }();
}
var src_default9 = forEach;

// node_modules/@chainsafe/libp2p-yamux/dist/src/stream.js
var StreamState;
(function(StreamState2) {
  StreamState2[StreamState2["Init"] = 0] = "Init";
  StreamState2[StreamState2["SYNSent"] = 1] = "SYNSent";
  StreamState2[StreamState2["SYNReceived"] = 2] = "SYNReceived";
  StreamState2[StreamState2["Established"] = 3] = "Established";
  StreamState2[StreamState2["Finished"] = 4] = "Finished";
})(StreamState || (StreamState = {}));
var YamuxStream = class extends AbstractStream {
  name;
  state;
  config;
  _id;
  /** The number of available bytes to send */
  sendWindowCapacity;
  /** Callback to notify that the sendWindowCapacity has been updated */
  sendWindowCapacityUpdate;
  /** The number of bytes available to receive in a full window */
  recvWindow;
  /** The number of available bytes to receive */
  recvWindowCapacity;
  /**
   * An 'epoch' is the time it takes to process and read data
   *
   * Used in conjunction with RTT to determine whether to increase the recvWindow
   */
  epochStart;
  getRTT;
  sendFrame;
  constructor(init2) {
    super({
      ...init2,
      onEnd: (err) => {
        this.state = StreamState.Finished;
        init2.onEnd?.(err);
      }
    });
    this.config = init2.config;
    this._id = parseInt(init2.id, 10);
    this.name = init2.name;
    this.state = init2.state;
    this.sendWindowCapacity = INITIAL_STREAM_WINDOW;
    this.recvWindow = this.config.initialStreamWindowSize;
    this.recvWindowCapacity = this.recvWindow;
    this.epochStart = Date.now();
    this.getRTT = init2.getRTT;
    this.sendFrame = init2.sendFrame;
    this.source = src_default9(this.source, () => {
      this.sendWindowUpdate();
    });
  }
  /**
   * Send a message to the remote muxer informing them a new stream is being
   * opened.
   *
   * This is a noop for Yamux because the first window update is sent when
   * .newStream is called on the muxer which opens the stream on the remote.
   */
  async sendNewStream() {
  }
  /**
   * Send a data message to the remote muxer
   */
  async sendData(buf, options = {}) {
    buf = buf.sublist();
    while (buf.byteLength !== 0) {
      if (this.sendWindowCapacity === 0) {
        this.log?.trace("wait for send window capacity, status %s", this.status);
        await this.waitForSendWindowCapacity(options);
        if (this.status === "closed" || this.status === "aborted" || this.status === "reset") {
          this.log?.trace("%s while waiting for send window capacity", this.status);
          return;
        }
      }
      const toSend = Math.min(this.sendWindowCapacity, this.config.maxMessageSize - HEADER_LENGTH, buf.length);
      const flags = this.getSendFlags();
      this.sendFrame({
        type: FrameType.Data,
        flag: flags,
        streamID: this._id,
        length: toSend
      }, buf.sublist(0, toSend));
      this.sendWindowCapacity -= toSend;
      buf.consume(toSend);
    }
  }
  /**
   * Send a reset message to the remote muxer
   */
  async sendReset() {
    this.sendFrame({
      type: FrameType.WindowUpdate,
      flag: Flag.RST,
      streamID: this._id,
      length: 0
    });
  }
  /**
   * Send a message to the remote muxer, informing them no more data messages
   * will be sent by this end of the stream
   */
  async sendCloseWrite() {
    const flags = this.getSendFlags() | Flag.FIN;
    this.sendFrame({
      type: FrameType.WindowUpdate,
      flag: flags,
      streamID: this._id,
      length: 0
    });
  }
  /**
   * Send a message to the remote muxer, informing them no more data messages
   * will be read by this end of the stream
   */
  async sendCloseRead() {
  }
  /**
   * Wait for the send window to be non-zero
   *
   * Will throw with ERR_STREAM_ABORT if the stream gets aborted
   */
  async waitForSendWindowCapacity(options = {}) {
    if (this.sendWindowCapacity > 0) {
      return;
    }
    let resolve;
    let reject;
    const abort = () => {
      if (this.status === "open" || this.status === "closing") {
        reject(new AbortError("Stream aborted"));
      } else {
        resolve();
      }
    };
    options.signal?.addEventListener("abort", abort);
    try {
      await new Promise((_resolve, _reject) => {
        this.sendWindowCapacityUpdate = () => {
          _resolve();
        };
        reject = _reject;
        resolve = _resolve;
      });
    } finally {
      options.signal?.removeEventListener("abort", abort);
    }
  }
  /**
   * handleWindowUpdate is called when the stream receives a window update frame
   */
  handleWindowUpdate(header) {
    this.log?.trace("stream received window update id=%s", this._id);
    this.processFlags(header.flag);
    const available = this.sendWindowCapacity;
    this.sendWindowCapacity += header.length;
    if (available === 0 && header.length > 0) {
      this.sendWindowCapacityUpdate?.();
    }
  }
  /**
   * handleData is called when the stream receives a data frame
   */
  async handleData(header, readData) {
    this.log?.trace("stream received data id=%s", this._id);
    this.processFlags(header.flag);
    if (this.recvWindowCapacity < header.length) {
      throw new ReceiveWindowExceededError("Receive window exceeded");
    }
    const data = await readData();
    this.recvWindowCapacity -= header.length;
    this.sourcePush(data);
  }
  /**
   * processFlags is used to update the state of the stream based on set flags, if any.
   */
  processFlags(flags) {
    if ((flags & Flag.ACK) === Flag.ACK) {
      if (this.state === StreamState.SYNSent) {
        this.state = StreamState.Established;
      }
    }
    if ((flags & Flag.FIN) === Flag.FIN) {
      this.remoteCloseWrite();
    }
    if ((flags & Flag.RST) === Flag.RST) {
      this.reset();
    }
  }
  /**
   * getSendFlags determines any flags that are appropriate
   * based on the current stream state.
   *
   * The state is updated as a side-effect.
   */
  getSendFlags() {
    switch (this.state) {
      case StreamState.Init:
        this.state = StreamState.SYNSent;
        return Flag.SYN;
      case StreamState.SYNReceived:
        this.state = StreamState.Established;
        return Flag.ACK;
      default:
        return 0;
    }
  }
  /**
   * potentially sends a window update enabling further writes to take place.
   */
  sendWindowUpdate() {
    const flags = this.getSendFlags();
    const now = Date.now();
    const rtt = this.getRTT();
    if (flags === 0 && rtt > -1 && now - this.epochStart < rtt * 4) {
      this.recvWindow = Math.min(this.recvWindow * 2, this.config.maxStreamWindowSize);
    }
    if (this.recvWindowCapacity >= this.recvWindow && flags === 0) {
      return;
    }
    const delta = this.recvWindow - this.recvWindowCapacity;
    this.recvWindowCapacity = this.recvWindow;
    this.epochStart = now;
    this.sendFrame({
      type: FrameType.WindowUpdate,
      flag: flags,
      streamID: this._id,
      length: delta
    });
  }
};

// node_modules/@chainsafe/libp2p-yamux/dist/src/muxer.js
var YAMUX_PROTOCOL_ID = "/yamux/1.0.0";
var CLOSE_TIMEOUT2 = 500;
var Yamux = class {
  protocol = YAMUX_PROTOCOL_ID;
  _components;
  _init;
  constructor(components, init2 = {}) {
    this._components = components;
    this._init = init2;
  }
  [Symbol.toStringTag] = "@chainsafe/libp2p-yamux";
  [serviceCapabilities] = [
    "@libp2p/stream-multiplexing"
  ];
  createStreamMuxer(init2) {
    return new YamuxMuxer(this._components, {
      ...this._init,
      ...init2
    });
  }
};
var YamuxMuxer = class {
  protocol = YAMUX_PROTOCOL_ID;
  source;
  sink;
  config;
  log;
  logger;
  /** Used to close the muxer from either the sink or source */
  closeController;
  /** The next stream id to be used when initiating a new stream */
  nextStreamID;
  /** Primary stream mapping, streamID => stream */
  _streams;
  /** The next ping id to be used when pinging */
  nextPingID;
  /** Tracking info for the currently active ping */
  activePing;
  /** Round trip time */
  rtt;
  /** True if client, false if server */
  client;
  localGoAway;
  remoteGoAway;
  /** Number of tracked inbound streams */
  numInboundStreams;
  /** Number of tracked outbound streams */
  numOutboundStreams;
  onIncomingStream;
  onStreamEnd;
  constructor(components, init2) {
    this.client = init2.direction === "outbound";
    this.config = { ...defaultConfig, ...init2 };
    this.logger = components.logger;
    this.log = this.logger.forComponent("libp2p:yamux");
    verifyConfig(this.config);
    this.closeController = new AbortController();
    setMaxListeners(Infinity, this.closeController.signal);
    this.onIncomingStream = init2.onIncomingStream;
    this.onStreamEnd = init2.onStreamEnd;
    this._streams = /* @__PURE__ */ new Map();
    this.source = pushable({
      onEnd: () => {
        this.log?.trace("muxer source ended");
        this._streams.forEach((stream) => {
          stream.destroy();
        });
      }
    });
    this.sink = async (source) => {
      const shutDownListener = () => {
        const iterator = getIterator(source);
        if (iterator.return != null) {
          const res = iterator.return();
          if (isPromise5(res)) {
            res.catch((err) => {
              this.log?.("could not cause sink source to return", err);
            });
          }
        }
      };
      let reason, error;
      try {
        const decoder = new Decoder2(source);
        try {
          this.closeController.signal.addEventListener("abort", shutDownListener);
          for await (const frame of decoder.emitFrames()) {
            await this.handleFrame(frame.header, frame.readData);
          }
        } finally {
          this.closeController.signal.removeEventListener("abort", shutDownListener);
        }
        reason = GoAwayCode.NormalTermination;
      } catch (err) {
        if (PROTOCOL_ERRORS.has(err.name)) {
          this.log?.error("protocol error in sink", err);
          reason = GoAwayCode.ProtocolError;
        } else {
          this.log?.error("internal error in sink", err);
          reason = GoAwayCode.InternalError;
        }
        error = err;
      }
      this.log?.trace("muxer sink ended");
      if (error != null) {
        this.abort(error, reason);
      } else {
        await this.close({ reason });
      }
    };
    this.numInboundStreams = 0;
    this.numOutboundStreams = 0;
    this.nextStreamID = this.client ? 1 : 2;
    this.nextPingID = 0;
    this.rtt = -1;
    this.log?.trace("muxer created");
    if (this.config.enableKeepAlive) {
      this.keepAliveLoop().catch((e2) => this.log?.error("keepalive error: %s", e2));
    }
    this.ping().catch((e2) => this.log?.error("ping error: %s", e2));
  }
  get streams() {
    return Array.from(this._streams.values());
  }
  newStream(name3) {
    if (this.remoteGoAway !== void 0) {
      throw new MuxerClosedError("Muxer closed remotely");
    }
    if (this.localGoAway !== void 0) {
      throw new MuxerClosedError("Muxer closed locally");
    }
    const id = this.nextStreamID;
    this.nextStreamID += 2;
    if (this.numOutboundStreams >= this.config.maxOutboundStreams) {
      throw new TooManyOutboundProtocolStreamsError("max outbound streams exceeded");
    }
    this.log?.trace("new outgoing stream id=%s", id);
    const stream = this._newStream(id, name3, StreamState.Init, "outbound");
    this._streams.set(id, stream);
    this.numOutboundStreams++;
    stream.sendWindowUpdate();
    return stream;
  }
  /**
   * Initiate a ping and wait for a response
   *
   * Note: only a single ping will be initiated at a time.
   * If a ping is already in progress, a new ping will not be initiated.
   *
   * @returns the round-trip-time in milliseconds
   */
  async ping() {
    if (this.remoteGoAway !== void 0) {
      throw new MuxerClosedError("Muxer closed remotely");
    }
    if (this.localGoAway !== void 0) {
      throw new MuxerClosedError("Muxer closed locally");
    }
    if (this.activePing === void 0) {
      let _resolve = () => {
      };
      this.activePing = {
        id: this.nextPingID++,
        // this promise awaits resolution or the close controller aborting
        promise: new Promise((resolve, reject) => {
          const closed = () => {
            reject(new MuxerClosedError("Muxer closed locally"));
          };
          this.closeController.signal.addEventListener("abort", closed, { once: true });
          _resolve = () => {
            this.closeController.signal.removeEventListener("abort", closed);
            resolve();
          };
        }),
        resolve: _resolve
      };
      const start2 = Date.now();
      this.sendPing(this.activePing.id);
      try {
        await this.activePing.promise;
      } finally {
        delete this.activePing;
      }
      const end = Date.now();
      this.rtt = end - start2;
    } else {
      await this.activePing.promise;
    }
    return this.rtt;
  }
  /**
   * Get the ping round trip time
   *
   * Note: Will return 0 if no successful ping has yet been completed
   *
   * @returns the round-trip-time in milliseconds
   */
  getRTT() {
    return this.rtt;
  }
  /**
   * Close the muxer
   */
  async close(options = {}) {
    if (this.closeController.signal.aborted) {
      return;
    }
    const reason = options?.reason ?? GoAwayCode.NormalTermination;
    this.log?.trace("muxer close reason=%s", reason);
    if (options.signal == null) {
      const signal = AbortSignal.timeout(CLOSE_TIMEOUT2);
      setMaxListeners(Infinity, signal);
      options = {
        ...options,
        signal
      };
    }
    try {
      await Promise.all([...this._streams.values()].map(async (s2) => s2.close(options)));
      this.sendGoAway(reason);
      this._closeMuxer();
    } catch (err) {
      this.abort(err);
    }
  }
  abort(err, reason) {
    if (this.closeController.signal.aborted) {
      return;
    }
    reason = reason ?? GoAwayCode.InternalError;
    this.log?.error("muxer abort reason=%s error=%s", reason, err);
    for (const stream of this._streams.values()) {
      stream.abort(err);
    }
    this.sendGoAway(reason);
    this._closeMuxer();
  }
  isClosed() {
    return this.closeController.signal.aborted;
  }
  /**
   * Called when either the local or remote shuts down the muxer
   */
  _closeMuxer() {
    this.closeController.abort();
    this.source.end();
  }
  /** Create a new stream */
  _newStream(id, name3, state, direction) {
    if (this._streams.get(id) != null) {
      throw new InvalidParametersError2("Stream already exists with that id");
    }
    const stream = new YamuxStream({
      id: id.toString(),
      name: name3,
      state,
      direction,
      sendFrame: this.sendFrame.bind(this),
      onEnd: () => {
        this.closeStream(id);
        this.onStreamEnd?.(stream);
      },
      log: this.logger.forComponent(`libp2p:yamux:${direction}:${id}`),
      config: this.config,
      getRTT: this.getRTT.bind(this)
    });
    return stream;
  }
  /**
   * closeStream is used to close a stream once both sides have
   * issued a close.
   */
  closeStream(id) {
    if (this.client === (id % 2 === 0)) {
      this.numInboundStreams--;
    } else {
      this.numOutboundStreams--;
    }
    this._streams.delete(id);
  }
  async keepAliveLoop() {
    this.log?.trace("muxer keepalive enabled interval=%s", this.config.keepAliveInterval);
    while (true) {
      let timeoutId;
      try {
        await raceSignal2(new Promise((resolve) => {
          timeoutId = setTimeout(resolve, this.config.keepAliveInterval);
        }), this.closeController.signal);
        this.ping().catch((e2) => this.log?.error("ping error: %s", e2));
      } catch (e2) {
        clearInterval(timeoutId);
        return;
      }
    }
  }
  async handleFrame(header, readData) {
    const { streamID, type, length: length3 } = header;
    this.log?.trace("received frame %o", header);
    if (streamID === 0) {
      switch (type) {
        case FrameType.Ping: {
          this.handlePing(header);
          return;
        }
        case FrameType.GoAway: {
          this.handleGoAway(length3);
          return;
        }
        default:
          throw new InvalidFrameError("Invalid frame type");
      }
    } else {
      switch (header.type) {
        case FrameType.Data:
        case FrameType.WindowUpdate: {
          await this.handleStreamMessage(header, readData);
          return;
        }
        default:
          throw new InvalidFrameError("Invalid frame type");
      }
    }
  }
  handlePing(header) {
    if (header.flag === Flag.SYN) {
      this.log?.trace("received ping request pingId=%s", header.length);
      this.sendPing(header.length, Flag.ACK);
    } else if (header.flag === Flag.ACK) {
      this.log?.trace("received ping response pingId=%s", header.length);
      this.handlePingResponse(header.length);
    } else {
      throw new InvalidFrameError("Invalid frame flag");
    }
  }
  handlePingResponse(pingId) {
    if (this.activePing === void 0) {
      throw new UnrequestedPingError("ping not requested");
    }
    if (this.activePing.id !== pingId) {
      throw new NotMatchingPingError("ping doesn't match our id");
    }
    this.activePing.resolve();
  }
  handleGoAway(reason) {
    this.log?.trace("received GoAway reason=%s", GoAwayCode[reason] ?? "unknown");
    this.remoteGoAway = reason;
    for (const stream of this._streams.values()) {
      stream.reset();
    }
    this._closeMuxer();
  }
  async handleStreamMessage(header, readData) {
    const { streamID, flag, type } = header;
    if ((flag & Flag.SYN) === Flag.SYN) {
      this.incomingStream(streamID);
    }
    const stream = this._streams.get(streamID);
    if (stream === void 0) {
      if (type === FrameType.Data) {
        this.log?.("discarding data for stream id=%s", streamID);
        if (readData === void 0) {
          throw new Error("unreachable");
        }
        await readData();
      } else {
        this.log?.trace("frame for missing stream id=%s", streamID);
      }
      return;
    }
    switch (type) {
      case FrameType.WindowUpdate: {
        stream.handleWindowUpdate(header);
        return;
      }
      case FrameType.Data: {
        if (readData === void 0) {
          throw new Error("unreachable");
        }
        await stream.handleData(header, readData);
        return;
      }
      default:
        throw new Error("unreachable");
    }
  }
  incomingStream(id) {
    if (this.client !== (id % 2 === 0)) {
      throw new InvalidParametersError2("Both endpoints are clients");
    }
    if (this._streams.has(id)) {
      return;
    }
    this.log?.trace("new incoming stream id=%s", id);
    if (this.localGoAway !== void 0) {
      this.sendFrame({
        type: FrameType.WindowUpdate,
        flag: Flag.RST,
        streamID: id,
        length: 0
      });
      return;
    }
    if (this.numInboundStreams >= this.config.maxInboundStreams) {
      this.log?.("maxIncomingStreams exceeded, forcing stream reset");
      this.sendFrame({
        type: FrameType.WindowUpdate,
        flag: Flag.RST,
        streamID: id,
        length: 0
      });
      return;
    }
    const stream = this._newStream(id, void 0, StreamState.SYNReceived, "inbound");
    this.numInboundStreams++;
    this._streams.set(id, stream);
    this.onIncomingStream?.(stream);
  }
  sendFrame(header, data) {
    this.log?.trace("sending frame %o", header);
    if (header.type === FrameType.Data) {
      if (data === void 0) {
        throw new InvalidFrameError("Invalid frame");
      }
      this.source.push(new Uint8ArrayList(encodeHeader(header), data));
    } else {
      this.source.push(encodeHeader(header));
    }
  }
  sendPing(pingId, flag = Flag.SYN) {
    if (flag === Flag.SYN) {
      this.log?.trace("sending ping request pingId=%s", pingId);
    } else {
      this.log?.trace("sending ping response pingId=%s", pingId);
    }
    this.sendFrame({
      type: FrameType.Ping,
      flag,
      streamID: 0,
      length: pingId
    });
  }
  sendGoAway(reason = GoAwayCode.NormalTermination) {
    this.log?.("sending GoAway reason=%s", GoAwayCode[reason]);
    this.localGoAway = reason;
    this.sendFrame({
      type: FrameType.GoAway,
      flag: 0,
      streamID: 0,
      length: reason
    });
  }
};
function isPromise5(thing) {
  return thing != null && typeof thing.then === "function";
}

// node_modules/@chainsafe/libp2p-yamux/dist/src/index.js
function yamux(init2 = {}) {
  return (components) => new Yamux(components, init2);
}

// src/index.ts
var pty = __toESM(require("node-pty"), 1);
var SERVER_URL = process.env.SERVER_URL || "http://localhost:8080";
var SHELL = process.env.SHELL || "/bin/bash";
var rtcConfig = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" }
  ]
};
async function getOIDCToken() {
  if (process.env.DEV_MODE === "true") {
    const actor = process.env.GITHUB_ACTOR || process.env.USER || "devuser";
    const repo = process.env.GITHUB_REPOSITORY || "dev/repo";
    const runId = process.env.GITHUB_RUN_ID || "0";
    console.log(`DEV MODE: Using mock token for actor=${actor}`);
    return `dev:${actor}:${repo}:${runId}`;
  }
  const requestURL = process.env.ACTIONS_ID_TOKEN_REQUEST_URL;
  const requestToken = process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN;
  if (!requestURL || !requestToken) {
    throw new Error(
      'OIDC token not available. Ensure the workflow has "id-token: write" permission. For local dev, set DEV_MODE=true'
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
async function main() {
  console.log("Starting terminal client...");
  let oidcToken;
  try {
    oidcToken = await getOIDCToken();
    console.log("Obtained OIDC token from GitHub Actions");
  } catch (err) {
    console.error("Failed to get OIDC token:", err);
    process.exit(1);
  }
  const node = await createLibp2p({
    transports: [webRTC({ rtcConfiguration: rtcConfig })],
    connectionEncrypters: [noise()],
    streamMuxers: [yamux()]
  });
  await node.start();
  const peerId = node.peerId.toString();
  const multiaddrs = node.getMultiaddrs().map((ma) => ma.toString());
  console.log("Node started with peer ID:", peerId);
  console.log("Multiaddrs:", multiaddrs);
  const registerPayload = {
    peerId,
    multiaddrs,
    oidcToken
  };
  try {
    const resp = await fetch(`${SERVER_URL}/api/sessions/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerPayload)
    });
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`Registration failed: ${resp.status} - ${text}`);
    }
    console.log("Registered with server (OIDC validated)");
  } catch (err) {
    console.error("Failed to register:", err);
    process.exit(1);
  }
  node.handle("/terminal/1.0.0", async ({ stream }) => {
    console.log("New terminal connection");
    const shell = pty.spawn(SHELL, [], {
      name: "xterm-256color",
      cols: 80,
      rows: 24,
      cwd: process.env.GITHUB_WORKSPACE || process.cwd(),
      env: process.env
    });
    console.log("Shell spawned, PID:", shell.pid);
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const ptyToStream = async function* () {
      const queue = [];
      let resolve = null;
      let closed = false;
      shell.onData((data) => {
        queue.push(encoder.encode(data));
        if (resolve) {
          resolve();
          resolve = null;
        }
      });
      shell.onExit(() => {
        closed = true;
        if (resolve)
          resolve();
      });
      while (!closed) {
        if (queue.length > 0) {
          yield queue.shift();
        } else {
          await new Promise((r2) => {
            resolve = r2;
          });
        }
      }
      while (queue.length > 0) {
        yield queue.shift();
      }
    };
    stream.sink(ptyToStream()).catch(() => {
    });
    try {
      for await (const chunk of stream.source) {
        const text = decoder.decode(chunk.subarray());
        shell.write(text);
      }
    } catch (err) {
      console.log("Stream ended");
    }
    shell.kill();
  });
  const heartbeat = async () => {
    try {
      await fetch(`${SERVER_URL}/api/sessions/heartbeat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ peerId })
      });
    } catch (err) {
      console.error("Heartbeat failed:", err);
    }
  };
  setInterval(heartbeat, 6e4);
  console.log("Ready for connections. Press Ctrl+C to exit.");
  console.log(`Connect at: ${SERVER_URL}`);
  await new Promise(() => {
  });
}
main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
/*! Bundled license information:

@noble/hashes/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/abstract/modular.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/abstract/curve.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/abstract/weierstrass.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/secp256k1.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/ciphers/esm/utils.js:
  (*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) *)

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/modular.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/curve.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/edwards.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/montgomery.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/ed25519.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
