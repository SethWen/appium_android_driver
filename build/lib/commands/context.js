'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _appiumChromedriver = require('appium-chromedriver');

var _appiumChromedriver2 = _interopRequireDefault(_appiumChromedriver);

var _portfinder = require('portfinder');

var _portfinder2 = _interopRequireDefault(_portfinder);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _appiumBaseDriver = require('appium-base-driver');

var _webviewHelpers = require('../webview-helpers');

var _webviewHelpers2 = _interopRequireDefault(_webviewHelpers);

var commands = {},
    helpers = {},
    extensions = {};

/* -------------------------------
 * Actual MJSONWP command handlers
 * ------------------------------- */
commands.getCurrentContext = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        return context$1$0.abrupt('return', this.curContext);

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getContexts = function callee$0$0() {
  var webviews;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        webviews = undefined;

        if (!this.isChromeSession) {
          context$1$0.next = 5;
          break;
        }

        // if we have a Chrome browser session, we only care about the Chrome
        // context and the native context
        webviews = [_webviewHelpers.CHROMIUM_WIN];
        context$1$0.next = 8;
        break;

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(_webviewHelpers2['default'].getWebviews(this.adb, this.opts.androidDeviceSocket));

      case 7:
        webviews = context$1$0.sent;

      case 8:
        this.contexts = _lodash2['default'].union([_webviewHelpers.NATIVE_WIN], webviews);
        _logger2['default'].debug('Available contexts: ' + JSON.stringify(this.contexts));
        return context$1$0.abrupt('return', this.contexts);

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.setContext = function callee$0$0(name) {
  var contexts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (name === null) {
          name = this.defaultContextName();
        } else if (name === _webviewHelpers.WEBVIEW_WIN) {
          // handle setContext "WEBVIEW"
          name = this.defaultWebviewName();
        }
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.getContexts());

      case 3:
        contexts = context$1$0.sent;

        if (_lodash2['default'].includes(contexts, name)) {
          context$1$0.next = 6;
          break;
        }

        throw new _appiumBaseDriver.errors.NoSuchContextError();

      case 6:
        if (!(name === this.curContext)) {
          context$1$0.next = 8;
          break;
        }

        return context$1$0.abrupt('return');

      case 8:
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(this.switchContext(name));

      case 10:
        this.curContext = name;

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.switchContext = function callee$0$0(name) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isChromedriverContext(name)) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.startChromedriverProxy(name));

      case 3:
        context$1$0.next = 10;
        break;

      case 5:
        if (!this.isChromedriverContext(this.curContext)) {
          context$1$0.next = 9;
          break;
        }

        // if we're moving to a non-chromedriver webview, and our current context
        // _is_ a chromedriver webview, if caps recreateChromeDriverSessions is set
        // to true then kill chromedriver session using stopChromedriverProxies or
        // else simply suspend proxying to the latter
        if (this.opts.recreateChromeDriverSessions) {
          _logger2['default'].debug("recreateChromeDriverSessions set to true; killing existing chromedrivers");
          this.stopChromedriverProxies();
        } else {
          this.suspendChromedriverProxy();
        }
        context$1$0.next = 10;
        break;

      case 9:
        throw new Error('Didn\'t know how to handle switching to context \'' + name + '\'');

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/* ---------------------------------
 * On-object context-related helpers
 * --------------------------------- */

// The reason this is a function and not just a constant is that both android-
// driver and selendroid-driver use this logic, and each one returns
// a different default context name
helpers.defaultContextName = function () {
  return _webviewHelpers.NATIVE_WIN;
};

helpers.defaultWebviewName = function () {
  return _webviewHelpers.WEBVIEW_BASE + this.opts.appPackage;
};

helpers.isWebContext = function () {
  return this.curContext !== null && this.curContext !== _webviewHelpers.NATIVE_WIN;
};

// Turn on proxying to an existing Chromedriver session or a new one
helpers.startChromedriverProxy = function callee$0$0(context) {
  var cd, opts, androidPackage;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug('Connecting to chrome-backed webview context \'' + context + '\'');

        cd = undefined;

        if (!this.sessionChromedrivers[context]) {
          context$1$0.next = 9;
          break;
        }

        // in the case where we've already set up a chromedriver for a context,
        // we want to reconnect to it, not create a whole new one
        _logger2['default'].debug('Found existing Chromedriver for context \'' + context + '\'. Using it.');
        cd = this.sessionChromedrivers[context];
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(setupExistingChromedriver(cd));

      case 7:
        context$1$0.next = 17;
        break;

      case 9:
        opts = _lodash2['default'].cloneDeep(this.opts);

        opts.chromeUseRunningApp = true;
        if (opts.extractChromeAndroidPackageFromContextName) {
          androidPackage = context.match(_webviewHelpers.WEBVIEW_BASE + '(.+)');

          if (androidPackage && androidPackage.length > 0) {
            opts.chromeAndroidPackage = androidPackage[1];
          }
        }
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(setupNewChromedriver(opts, this.adb.curDeviceId, this.adb));

      case 14:
        cd = context$1$0.sent;

        // bind our stop/exit handler, passing in context so we know which
        // one stopped unexpectedly
        cd.on(_appiumChromedriver2['default'].EVENT_CHANGED, function (msg) {
          if (msg.state === _appiumChromedriver2['default'].STATE_STOPPED) {
            _this.onChromedriverStop(context);
          }
        });
        // save the chromedriver object under the context
        this.sessionChromedrivers[context] = cd;

      case 17:
        // hook up the local variables so we can proxy this biz
        this.chromedriver = cd;
        this.proxyReqRes = this.chromedriver.proxyReq.bind(this.chromedriver);
        this.jwpProxyActive = true;

      case 20:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// Stop proxying to any Chromedriver
helpers.suspendChromedriverProxy = function () {
  this.chromedriver = null;
  this.proxyReqRes = null;
  this.jwpProxyActive = false;
};

// Handle an out-of-band Chromedriver stop event
helpers.onChromedriverStop = function callee$0$0(context) {
  var err;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].warn('Chromedriver for context ' + context + ' stopped unexpectedly');

        if (!(context === this.curContext)) {
          context$1$0.next = 7;
          break;
        }

        err = new Error("Chromedriver quit unexpectedly during session");
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.startUnexpectedShutdown(err));

      case 5:
        context$1$0.next = 9;
        break;

      case 7:
        // if a Chromedriver in the non-active context barfs, we don't really
        // care, we'll just make a new one next time we need the context.
        _logger2['default'].warn("Chromedriver quit unexpectedly, but it wasn't the active " + "context, ignoring");
        delete this.sessionChromedrivers[context];

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// Intentionally stop all the chromedrivers currently active, and ignore
// their exit events
helpers.stopChromedriverProxies = function callee$0$0() {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, context, cd;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.suspendChromedriverProxy(); // make sure we turn off the proxy flag
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 4;
        _iterator = _getIterator(_lodash2['default'].keys(this.sessionChromedrivers));

      case 6:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 23;
          break;
        }

        context = _step.value;
        cd = this.sessionChromedrivers[context];

        _logger2['default'].debug('Stopping chromedriver for context ' + context);
        // stop listening for the stopped state event
        cd.removeAllListeners(_appiumChromedriver2['default'].EVENT_CHANGED);
        context$1$0.prev = 11;
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(cd.stop());

      case 14:
        context$1$0.next = 19;
        break;

      case 16:
        context$1$0.prev = 16;
        context$1$0.t0 = context$1$0['catch'](11);

        _logger2['default'].warn('Error stopping Chromedriver: ' + context$1$0.t0.message);

      case 19:
        delete this.sessionChromedrivers[context];

      case 20:
        _iteratorNormalCompletion = true;
        context$1$0.next = 6;
        break;

      case 23:
        context$1$0.next = 29;
        break;

      case 25:
        context$1$0.prev = 25;
        context$1$0.t1 = context$1$0['catch'](4);
        _didIteratorError = true;
        _iteratorError = context$1$0.t1;

      case 29:
        context$1$0.prev = 29;
        context$1$0.prev = 30;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 32:
        context$1$0.prev = 32;

        if (!_didIteratorError) {
          context$1$0.next = 35;
          break;
        }

        throw _iteratorError;

      case 35:
        return context$1$0.finish(32);

      case 36:
        return context$1$0.finish(29);

      case 37:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[4, 25, 29, 37], [11, 16], [30,, 32, 36]]);
};

helpers.isChromedriverContext = function (viewName) {
  return viewName.indexOf(_webviewHelpers.WEBVIEW_WIN) !== -1 || viewName === _webviewHelpers.CHROMIUM_WIN;
};

/* --------------------------
 * Internal library functions
 * -------------------------- */

function setupExistingChromedriver(chromedriver) {
  return _regeneratorRuntime.async(function setupExistingChromedriver$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(chromedriver.hasWorkingWebview());

      case 2:
        if (context$1$0.sent) {
          context$1$0.next = 6;
          break;
        }

        _logger2['default'].debug("ChromeDriver is not associated with a window. " + "Re-initializing the session.");
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(chromedriver.restart());

      case 6:
        return context$1$0.abrupt('return', chromedriver);

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function setupNewChromedriver(opts, curDeviceId, adb) {
  var getPort, chromeArgs, chromedriver, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, opt, appPackage, caps;

  return _regeneratorRuntime.async(function setupNewChromedriver$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (opts.chromeDriverPort) {
          context$1$0.next = 6;
          break;
        }

        getPort = _bluebird2['default'].promisify(_portfinder2['default'].getPort, { context: _portfinder2['default'] });
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(getPort());

      case 4:
        opts.chromeDriverPort = context$1$0.sent;

        _logger2['default'].debug('A port was not given, using random port: ' + opts.chromeDriverPort);

      case 6:
        chromeArgs = {
          port: opts.chromeDriverPort,
          executable: opts.chromedriverExecutable,
          adb: adb,
          verbose: !!opts.showChromedriverLog
        };
        chromedriver = new _appiumChromedriver2['default'](chromeArgs);

        // make sure there are chromeOptions
        opts.chromeOptions = opts.chromeOptions || {};
        // try out any prefixed chromeOptions,
        // and strip the prefix
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 12;
        for (_iterator2 = _getIterator(_lodash2['default'].keys(opts)); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          opt = _step2.value;

          if (opt.endsWith(':chromeOptions')) {
            _logger2['default'].warn('Merging \'' + opt + '\' into \'chromeOptions\'. This may cause unexpected behavior');
            _lodash2['default'].merge(opts.chromeOptions, opts[opt]);
          }
        }

        context$1$0.next = 20;
        break;

      case 16:
        context$1$0.prev = 16;
        context$1$0.t0 = context$1$0['catch'](12);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t0;

      case 20:
        context$1$0.prev = 20;
        context$1$0.prev = 21;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 23:
        context$1$0.prev = 23;

        if (!_didIteratorError2) {
          context$1$0.next = 26;
          break;
        }

        throw _iteratorError2;

      case 26:
        return context$1$0.finish(23);

      case 27:
        return context$1$0.finish(20);

      case 28:
        appPackage = opts.chromeOptions.androidPackage || opts.appPackage;
        caps = {
          chromeOptions: {
            androidPackage: appPackage
          }
        };

        if (opts.chromeUseRunningApp) {
          caps.chromeOptions.androidUseRunningApp = opts.chromeUseRunningApp;
        }
        if (opts.chromeAndroidPackage) {
          caps.chromeOptions.androidPackage = opts.chromeAndroidPackage;
        }
        if (opts.chromeAndroidActivity) {
          caps.chromeOptions.androidActivity = opts.chromeAndroidActivity;
        }
        if (opts.chromeAndroidProcess) {
          caps.chromeOptions.androidProcess = opts.chromeAndroidProcess;
        }
        if (opts.enablePerformanceLogging) {
          caps.loggingPrefs = { performance: 'ALL' };
        }
        if (opts.browserName === 'chromium-webview') {
          caps.chromeOptions.androidActivity = opts.appActivity;
        }
        if (opts.pageLoadStrategy) {
          caps.pageLoadStrategy = opts.pageLoadStrategy;
        }
        caps = _webviewHelpers2['default'].decorateChromeOptions(caps, opts, curDeviceId);
        context$1$0.next = 40;
        return _regeneratorRuntime.awrap(chromedriver.start(caps));

      case 40:
        return context$1$0.abrupt('return', chromedriver);

      case 41:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[12, 16, 20, 28], [21,, 23, 27]]);
}

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports.setupNewChromedriver = setupNewChromedriver;
exports['default'] = extensions;

// otherwise we use ADB to figure out which webviews are available

// if the context we want doesn't exist, fail

// if we're already in the context we want, do nothing

// We have some options when it comes to webviews. If we want a
// Chromedriver webview, we can only control one at a time.

// start proxying commands directly to chromedriver

// we exited unexpectedly while automating the current context and so want
// to shut down the session and respond with an error

// check the status by sending a simple window-based command to ChromeDriver
// if there is an error, we want to recreate the ChromeDriver session

// if a port wasn't given, pick a random available one
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9jb250ZXh0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O3NCQUFjLFFBQVE7Ozs7c0JBQ0gsV0FBVzs7OztrQ0FDTCxxQkFBcUI7Ozs7MEJBQ3ZCLFlBQVk7Ozs7d0JBQ3JCLFVBQVU7Ozs7Z0NBQ0Qsb0JBQW9COzs4QkFFeUIsb0JBQW9COzs7O0FBR3hGLElBQUksUUFBUSxHQUFHLEVBQUU7SUFBRSxPQUFPLEdBQUcsRUFBRTtJQUFFLFVBQVUsR0FBRyxFQUFFLENBQUM7Ozs7O0FBTWpELFFBQVEsQ0FBQyxpQkFBaUIsR0FBRzs7Ozs0Q0FDcEIsSUFBSSxDQUFDLFVBQVU7Ozs7Ozs7Q0FDdkIsQ0FBQzs7QUFFRixRQUFRLENBQUMsV0FBVyxHQUFHO01BQ2pCLFFBQVE7Ozs7QUFBUixnQkFBUTs7YUFDUixJQUFJLENBQUMsZUFBZTs7Ozs7OztBQUd0QixnQkFBUSxHQUFHLDhCQUFjLENBQUM7Ozs7Ozt5Q0FHVCw0QkFBZSxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQzs7O0FBRGhDLGdCQUFROzs7QUFHVixZQUFJLENBQUMsUUFBUSxHQUFHLG9CQUFFLEtBQUssQ0FBQyw0QkFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2hELDRCQUFPLEtBQUssMEJBQXdCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFHLENBQUM7NENBQzlELElBQUksQ0FBQyxRQUFROzs7Ozs7O0NBQ3JCLENBQUM7O0FBRUYsUUFBUSxDQUFDLFVBQVUsR0FBRyxvQkFBZ0IsSUFBSTtNQU9wQyxRQUFROzs7O0FBTlosWUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO0FBQ2pCLGNBQUksR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUNsQyxNQUFNLElBQUksSUFBSSxnQ0FBZ0IsRUFBRTs7QUFFL0IsY0FBSSxHQUFHLElBQUks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QUMsZUFBZSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztTQUNqRTtBQUNELFlBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO0FBQzdCLGNBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztTQUMvRDtBQUNELFlBQUksSUFBSSxDQUFDLHdCQUF3QixFQUFFO0FBQ2pDLGNBQUksQ0FBQyxZQUFZLEdBQUcsRUFBQyxXQUFXLEVBQUUsS0FBSyxFQUFDLENBQUM7U0FDMUM7QUFDRCxZQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssa0JBQWtCLEVBQUU7QUFDM0MsY0FBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUN2RDtBQUNELFlBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO0FBQ3pCLGNBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7U0FDL0M7QUFDRCxZQUFJLEdBQUcsNEJBQWUscUJBQXFCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQzs7eUNBQy9ELFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOzs7NENBQ3ZCLFlBQVk7Ozs7Ozs7Q0FDcEI7O0FBRUQsZUFBYyxVQUFVLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLFFBQVEsR0FBUixRQUFRO1FBQUUsT0FBTyxHQUFQLE9BQU87UUFBRSxvQkFBb0IsR0FBcEIsb0JBQW9CO3FCQUNqQyxVQUFVIiwiZmlsZSI6ImxpYi9jb21tYW5kcy9jb250ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IGxvZ2dlciBmcm9tICcuLi9sb2dnZXInO1xyXG5pbXBvcnQgQ2hyb21lZHJpdmVyIGZyb20gJ2FwcGl1bS1jaHJvbWVkcml2ZXInO1xyXG5pbXBvcnQgUG9ydEZpbmRlciBmcm9tICdwb3J0ZmluZGVyJztcclxuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xyXG5pbXBvcnQgeyBlcnJvcnMgfSBmcm9tICdhcHBpdW0tYmFzZS1kcml2ZXInO1xyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIHdlYnZpZXdIZWxwZXJzLFxyXG4gICAgICAgICBOQVRJVkVfV0lOLCBXRUJWSUVXX0JBU0UsIFdFQlZJRVdfV0lOLCBDSFJPTUlVTV9XSU4gfSBmcm9tICcuLi93ZWJ2aWV3LWhlbHBlcnMnO1xyXG5cclxuXHJcbmxldCBjb21tYW5kcyA9IHt9LCBoZWxwZXJzID0ge30sIGV4dGVuc2lvbnMgPSB7fTtcclxuXHJcblxyXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEFjdHVhbCBNSlNPTldQIGNvbW1hbmQgaGFuZGxlcnNcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5jb21tYW5kcy5nZXRDdXJyZW50Q29udGV4dCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gdGhpcy5jdXJDb250ZXh0O1xyXG59O1xyXG5cclxuY29tbWFuZHMuZ2V0Q29udGV4dHMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgbGV0IHdlYnZpZXdzO1xyXG4gIGlmICh0aGlzLmlzQ2hyb21lU2Vzc2lvbikge1xyXG4gICAgLy8gaWYgd2UgaGF2ZSBhIENocm9tZSBicm93c2VyIHNlc3Npb24sIHdlIG9ubHkgY2FyZSBhYm91dCB0aGUgQ2hyb21lXHJcbiAgICAvLyBjb250ZXh0IGFuZCB0aGUgbmF0aXZlIGNvbnRleHRcclxuICAgIHdlYnZpZXdzID0gW0NIUk9NSVVNX1dJTl07XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIG90aGVyd2lzZSB3ZSB1c2UgQURCIHRvIGZpZ3VyZSBvdXQgd2hpY2ggd2Vidmlld3MgYXJlIGF2YWlsYWJsZVxyXG4gICAgd2Vidmlld3MgPSBhd2FpdCB3ZWJ2aWV3SGVscGVycy5nZXRXZWJ2aWV3cyh0aGlzLmFkYixcclxuICAgICAgdGhpcy5vcHRzLmFuZHJvaWREZXZpY2VTb2NrZXQpO1xyXG4gIH1cclxuICB0aGlzLmNvbnRleHRzID0gXy51bmlvbihbTkFUSVZFX1dJTl0sIHdlYnZpZXdzKTtcclxuICBsb2dnZXIuZGVidWcoYEF2YWlsYWJsZSBjb250ZXh0czogJHtKU09OLnN0cmluZ2lmeSh0aGlzLmNvbnRleHRzKX1gKTtcclxuICByZXR1cm4gdGhpcy5jb250ZXh0cztcclxufTtcclxuXHJcbmNvbW1hbmRzLnNldENvbnRleHQgPSBhc3luYyBmdW5jdGlvbiAobmFtZSkge1xyXG4gIGlmIChuYW1lID09PSBudWxsKSB7XHJcbiAgICBuYW1lID0gdGhpcy5kZWZhdWx0Q29udGV4dE5hbWUoKTtcclxuICB9IGVsc2UgaWYgKG5hbWUgPT09IFdFQlZJRVdfV0lOKSB7XHJcbiAgICAvLyBoYW5kbGUgc2V0Q29udGV4dCBcIldFQlZJRVdcIlxyXG4gICAgbmFtZSA9IHRoaXMuZGVmYXVsdFdlYnZpZXdOYW1lKCk7XHJcbiAgfVxyXG4gIGxldCBjb250ZXh0cyA9IGF3YWl0IHRoaXMuZ2V0Q29udGV4dHMoKTtcclxuICAvLyBpZiB0aGUgY29udGV4dCB3ZSB3YW50IGRvZXNuJ3QgZXhpc3QsIGZhaWxcclxuICBpZiAoIV8uaW5jbHVkZXMoY29udGV4dHMsIG5hbWUpKSB7XHJcbiAgICB0aHJvdyBuZXcgZXJyb3JzLk5vU3VjaENvbnRleHRFcnJvcigpO1xyXG4gIH1cclxuICAvLyBpZiB3ZSdyZSBhbHJlYWR5IGluIHRoZSBjb250ZXh0IHdlIHdhbnQsIGRvIG5vdGhpbmdcclxuICBpZiAobmFtZSA9PT0gdGhpcy5jdXJDb250ZXh0KSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBhd2FpdCB0aGlzLnN3aXRjaENvbnRleHQobmFtZSk7XHJcbiAgdGhpcy5jdXJDb250ZXh0ID0gbmFtZTtcclxufTtcclxuXHJcbmhlbHBlcnMuc3dpdGNoQ29udGV4dCA9IGFzeW5jIGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgLy8gV2UgaGF2ZSBzb21lIG9wdGlvbnMgd2hlbiBpdCBjb21lcyB0byB3ZWJ2aWV3cy4gSWYgd2Ugd2FudCBhXHJcbiAgLy8gQ2hyb21lZHJpdmVyIHdlYnZpZXcsIHdlIGNhbiBvbmx5IGNvbnRyb2wgb25lIGF0IGEgdGltZS5cclxuICBpZiAodGhpcy5pc0Nocm9tZWRyaXZlckNvbnRleHQobmFtZSkpIHtcclxuICAgIC8vIHN0YXJ0IHByb3h5aW5nIGNvbW1hbmRzIGRpcmVjdGx5IHRvIGNocm9tZWRyaXZlclxyXG4gICAgYXdhaXQgdGhpcy5zdGFydENocm9tZWRyaXZlclByb3h5KG5hbWUpO1xyXG4gIH0gZWxzZSBpZiAodGhpcy5pc0Nocm9tZWRyaXZlckNvbnRleHQodGhpcy5jdXJDb250ZXh0KSkge1xyXG4gICAgLy8gaWYgd2UncmUgbW92aW5nIHRvIGEgbm9uLWNocm9tZWRyaXZlciB3ZWJ2aWV3LCBhbmQgb3VyIGN1cnJlbnQgY29udGV4dFxyXG4gICAgLy8gX2lzXyBhIGNocm9tZWRyaXZlciB3ZWJ2aWV3LCBpZiBjYXBzIHJlY3JlYXRlQ2hyb21lRHJpdmVyU2Vzc2lvbnMgaXMgc2V0XHJcbiAgICAvLyB0byB0cnVlIHRoZW4ga2lsbCBjaHJvbWVkcml2ZXIgc2Vzc2lvbiB1c2luZyBzdG9wQ2hyb21lZHJpdmVyUHJveGllcyBvclxyXG4gICAgLy8gZWxzZSBzaW1wbHkgc3VzcGVuZCBwcm94eWluZyB0byB0aGUgbGF0dGVyXHJcbiAgICBpZiAodGhpcy5vcHRzLnJlY3JlYXRlQ2hyb21lRHJpdmVyU2Vzc2lvbnMpIHtcclxuICAgICAgbG9nZ2VyLmRlYnVnKFwicmVjcmVhdGVDaHJvbWVEcml2ZXJTZXNzaW9ucyBzZXQgdG8gdHJ1ZTsga2lsbGluZyBleGlzdGluZyBjaHJvbWVkcml2ZXJzXCIpO1xyXG4gICAgICB0aGlzLnN0b3BDaHJvbWVkcml2ZXJQcm94aWVzKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnN1c3BlbmRDaHJvbWVkcml2ZXJQcm94eSgpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYERpZG4ndCBrbm93IGhvdyB0byBoYW5kbGUgc3dpdGNoaW5nIHRvIGNvbnRleHQgJyR7bmFtZX0nYCk7XHJcbiAgfVxyXG59O1xyXG5cclxuXHJcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBPbi1vYmplY3QgY29udGV4dC1yZWxhdGVkIGhlbHBlcnNcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG4vLyBUaGUgcmVhc29uIHRoaXMgaXMgYSBmdW5jdGlvbiBhbmQgbm90IGp1c3QgYSBjb25zdGFudCBpcyB0aGF0IGJvdGggYW5kcm9pZC1cclxuLy8gZHJpdmVyIGFuZCBzZWxlbmRyb2lkLWRyaXZlciB1c2UgdGhpcyBsb2dpYywgYW5kIGVhY2ggb25lIHJldHVybnNcclxuLy8gYSBkaWZmZXJlbnQgZGVmYXVsdCBjb250ZXh0IG5hbWVcclxuaGVscGVycy5kZWZhdWx0Q29udGV4dE5hbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIE5BVElWRV9XSU47XHJcbn07XHJcblxyXG5oZWxwZXJzLmRlZmF1bHRXZWJ2aWV3TmFtZSA9IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gV0VCVklFV19CQVNFICsgdGhpcy5vcHRzLmFwcFBhY2thZ2U7XHJcbn07XHJcblxyXG5oZWxwZXJzLmlzV2ViQ29udGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gdGhpcy5jdXJDb250ZXh0ICE9PSBudWxsICYmIHRoaXMuY3VyQ29udGV4dCAhPT0gTkFUSVZFX1dJTjtcclxufTtcclxuXHJcbi8vIFR1cm4gb24gcHJveHlpbmcgdG8gYW4gZXhpc3RpbmcgQ2hyb21lZHJpdmVyIHNlc3Npb24gb3IgYSBuZXcgb25lXHJcbmhlbHBlcnMuc3RhcnRDaHJvbWVkcml2ZXJQcm94eSA9IGFzeW5jIGZ1bmN0aW9uIChjb250ZXh0KSB7XHJcbiAgbG9nZ2VyLmRlYnVnKGBDb25uZWN0aW5nIHRvIGNocm9tZS1iYWNrZWQgd2VidmlldyBjb250ZXh0ICcke2NvbnRleHR9J2ApO1xyXG5cclxuICBsZXQgY2Q7XHJcbiAgaWYgKHRoaXMuc2Vzc2lvbkNocm9tZWRyaXZlcnNbY29udGV4dF0pIHtcclxuICAgIC8vIGluIHRoZSBjYXNlIHdoZXJlIHdlJ3ZlIGFscmVhZHkgc2V0IHVwIGEgY2hyb21lZHJpdmVyIGZvciBhIGNvbnRleHQsXHJcbiAgICAvLyB3ZSB3YW50IHRvIHJlY29ubmVjdCB0byBpdCwgbm90IGNyZWF0ZSBhIHdob2xlIG5ldyBvbmVcclxuICAgIGxvZ2dlci5kZWJ1ZyhgRm91bmQgZXhpc3RpbmcgQ2hyb21lZHJpdmVyIGZvciBjb250ZXh0ICcke2NvbnRleHR9Jy4gVXNpbmcgaXQuYCk7XHJcbiAgICBjZCA9IHRoaXMuc2Vzc2lvbkNocm9tZWRyaXZlcnNbY29udGV4dF07XHJcbiAgICBhd2FpdCBzZXR1cEV4aXN0aW5nQ2hyb21lZHJpdmVyKGNkKTtcclxuICB9IGVsc2Uge1xyXG4gICAgbGV0IG9wdHMgPSBfLmNsb25lRGVlcCh0aGlzLm9wdHMpO1xyXG4gICAgb3B0cy5jaHJvbWVVc2VSdW5uaW5nQXBwID0gdHJ1ZTtcclxuICAgIGlmIChvcHRzLmV4dHJhY3RDaHJvbWVBbmRyb2lkUGFja2FnZUZyb21Db250ZXh0TmFtZSkge1xyXG4gICAgICBsZXQgYW5kcm9pZFBhY2thZ2UgPSBjb250ZXh0Lm1hdGNoKGAke1dFQlZJRVdfQkFTRX0oLispYCk7XHJcbiAgICAgIGlmIChhbmRyb2lkUGFja2FnZSAmJiBhbmRyb2lkUGFja2FnZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgb3B0cy5jaHJvbWVBbmRyb2lkUGFja2FnZSA9IGFuZHJvaWRQYWNrYWdlWzFdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjZCA9IGF3YWl0IHNldHVwTmV3Q2hyb21lZHJpdmVyKG9wdHMsIHRoaXMuYWRiLmN1ckRldmljZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYik7XHJcbiAgICAvLyBiaW5kIG91ciBzdG9wL2V4aXQgaGFuZGxlciwgcGFzc2luZyBpbiBjb250ZXh0IHNvIHdlIGtub3cgd2hpY2hcclxuICAgIC8vIG9uZSBzdG9wcGVkIHVuZXhwZWN0ZWRseVxyXG4gICAgY2Qub24oQ2hyb21lZHJpdmVyLkVWRU5UX0NIQU5HRUQsIChtc2cpID0+IHtcclxuICAgICAgaWYgKG1zZy5zdGF0ZSA9PT0gQ2hyb21lZHJpdmVyLlNUQVRFX1NUT1BQRUQpIHtcclxuICAgICAgICB0aGlzLm9uQ2hyb21lZHJpdmVyU3RvcChjb250ZXh0KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvLyBzYXZlIHRoZSBjaHJvbWVkcml2ZXIgb2JqZWN0IHVuZGVyIHRoZSBjb250ZXh0XHJcbiAgICB0aGlzLnNlc3Npb25DaHJvbWVkcml2ZXJzW2NvbnRleHRdID0gY2Q7XHJcbiAgfVxyXG4gIC8vIGhvb2sgdXAgdGhlIGxvY2FsIHZhcmlhYmxlcyBzbyB3ZSBjYW4gcHJveHkgdGhpcyBiaXpcclxuICB0aGlzLmNocm9tZWRyaXZlciA9IGNkO1xyXG4gIHRoaXMucHJveHlSZXFSZXMgPSB0aGlzLmNocm9tZWRyaXZlci5wcm94eVJlcS5iaW5kKHRoaXMuY2hyb21lZHJpdmVyKTtcclxuICB0aGlzLmp3cFByb3h5QWN0aXZlID0gdHJ1ZTtcclxufTtcclxuXHJcbi8vIFN0b3AgcHJveHlpbmcgdG8gYW55IENocm9tZWRyaXZlclxyXG5oZWxwZXJzLnN1c3BlbmRDaHJvbWVkcml2ZXJQcm94eSA9IGZ1bmN0aW9uICgpIHtcclxuICB0aGlzLmNocm9tZWRyaXZlciA9IG51bGw7XHJcbiAgdGhpcy5wcm94eVJlcVJlcyA9IG51bGw7XHJcbiAgdGhpcy5qd3BQcm94eUFjdGl2ZSA9IGZhbHNlO1xyXG59O1xyXG5cclxuLy8gSGFuZGxlIGFuIG91dC1vZi1iYW5kIENocm9tZWRyaXZlciBzdG9wIGV2ZW50XHJcbmhlbHBlcnMub25DaHJvbWVkcml2ZXJTdG9wID0gYXN5bmMgZnVuY3Rpb24gKGNvbnRleHQpIHtcclxuICBsb2dnZXIud2FybihgQ2hyb21lZHJpdmVyIGZvciBjb250ZXh0ICR7Y29udGV4dH0gc3RvcHBlZCB1bmV4cGVjdGVkbHlgKTtcclxuICBpZiAoY29udGV4dCA9PT0gdGhpcy5jdXJDb250ZXh0KSB7XHJcbiAgICAvLyB3ZSBleGl0ZWQgdW5leHBlY3RlZGx5IHdoaWxlIGF1dG9tYXRpbmcgdGhlIGN1cnJlbnQgY29udGV4dCBhbmQgc28gd2FudFxyXG4gICAgLy8gdG8gc2h1dCBkb3duIHRoZSBzZXNzaW9uIGFuZCByZXNwb25kIHdpdGggYW4gZXJyb3JcclxuICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoXCJDaHJvbWVkcml2ZXIgcXVpdCB1bmV4cGVjdGVkbHkgZHVyaW5nIHNlc3Npb25cIik7XHJcbiAgICBhd2FpdCB0aGlzLnN0YXJ0VW5leHBlY3RlZFNodXRkb3duKGVycik7XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIGlmIGEgQ2hyb21lZHJpdmVyIGluIHRoZSBub24tYWN0aXZlIGNvbnRleHQgYmFyZnMsIHdlIGRvbid0IHJlYWxseVxyXG4gICAgLy8gY2FyZSwgd2UnbGwganVzdCBtYWtlIGEgbmV3IG9uZSBuZXh0IHRpbWUgd2UgbmVlZCB0aGUgY29udGV4dC5cclxuICAgIGxvZ2dlci53YXJuKFwiQ2hyb21lZHJpdmVyIHF1aXQgdW5leHBlY3RlZGx5LCBidXQgaXQgd2Fzbid0IHRoZSBhY3RpdmUgXCIgK1xyXG4gICAgICAgICAgICAgICAgXCJjb250ZXh0LCBpZ25vcmluZ1wiKTtcclxuICAgIGRlbGV0ZSB0aGlzLnNlc3Npb25DaHJvbWVkcml2ZXJzW2NvbnRleHRdO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIEludGVudGlvbmFsbHkgc3RvcCBhbGwgdGhlIGNocm9tZWRyaXZlcnMgY3VycmVudGx5IGFjdGl2ZSwgYW5kIGlnbm9yZVxyXG4vLyB0aGVpciBleGl0IGV2ZW50c1xyXG5oZWxwZXJzLnN0b3BDaHJvbWVkcml2ZXJQcm94aWVzID0gYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMuc3VzcGVuZENocm9tZWRyaXZlclByb3h5KCk7IC8vIG1ha2Ugc3VyZSB3ZSB0dXJuIG9mZiB0aGUgcHJveHkgZmxhZ1xyXG4gIGZvciAobGV0IGNvbnRleHQgb2YgXy5rZXlzKHRoaXMuc2Vzc2lvbkNocm9tZWRyaXZlcnMpKSB7XHJcbiAgICBsZXQgY2QgPSB0aGlzLnNlc3Npb25DaHJvbWVkcml2ZXJzW2NvbnRleHRdO1xyXG4gICAgbG9nZ2VyLmRlYnVnKGBTdG9wcGluZyBjaHJvbWVkcml2ZXIgZm9yIGNvbnRleHQgJHtjb250ZXh0fWApO1xyXG4gICAgLy8gc3RvcCBsaXN0ZW5pbmcgZm9yIHRoZSBzdG9wcGVkIHN0YXRlIGV2ZW50XHJcbiAgICBjZC5yZW1vdmVBbGxMaXN0ZW5lcnMoQ2hyb21lZHJpdmVyLkVWRU5UX0NIQU5HRUQpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgY2Quc3RvcCgpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGxvZ2dlci53YXJuKGBFcnJvciBzdG9wcGluZyBDaHJvbWVkcml2ZXI6ICR7ZXJyLm1lc3NhZ2V9YCk7XHJcbiAgICB9XHJcbiAgICBkZWxldGUgdGhpcy5zZXNzaW9uQ2hyb21lZHJpdmVyc1tjb250ZXh0XTtcclxuICB9XHJcbn07XHJcblxyXG5oZWxwZXJzLmlzQ2hyb21lZHJpdmVyQ29udGV4dCA9IGZ1bmN0aW9uICh2aWV3TmFtZSkge1xyXG4gIHJldHVybiB2aWV3TmFtZS5pbmRleE9mKFdFQlZJRVdfV0lOKSAhPT0gLTEgfHwgdmlld05hbWUgPT09IENIUk9NSVVNX1dJTjtcclxufTtcclxuXHJcblxyXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBJbnRlcm5hbCBsaWJyYXJ5IGZ1bmN0aW9uc1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gc2V0dXBFeGlzdGluZ0Nocm9tZWRyaXZlciAoY2hyb21lZHJpdmVyKSB7XHJcbiAgLy8gY2hlY2sgdGhlIHN0YXR1cyBieSBzZW5kaW5nIGEgc2ltcGxlIHdpbmRvdy1iYXNlZCBjb21tYW5kIHRvIENocm9tZURyaXZlclxyXG4gIC8vIGlmIHRoZXJlIGlzIGFuIGVycm9yLCB3ZSB3YW50IHRvIHJlY3JlYXRlIHRoZSBDaHJvbWVEcml2ZXIgc2Vzc2lvblxyXG4gIGlmICghYXdhaXQgY2hyb21lZHJpdmVyLmhhc1dvcmtpbmdXZWJ2aWV3KCkpIHtcclxuICAgIGxvZ2dlci5kZWJ1ZyhcIkNocm9tZURyaXZlciBpcyBub3QgYXNzb2NpYXRlZCB3aXRoIGEgd2luZG93LiBcIiArXHJcbiAgICAgICAgICAgICAgICAgXCJSZS1pbml0aWFsaXppbmcgdGhlIHNlc3Npb24uXCIpO1xyXG4gICAgYXdhaXQgY2hyb21lZHJpdmVyLnJlc3RhcnQoKTtcclxuICB9XHJcbiAgcmV0dXJuIGNocm9tZWRyaXZlcjtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gc2V0dXBOZXdDaHJvbWVkcml2ZXIgKG9wdHMsIGN1ckRldmljZUlkLCBhZGIpIHtcclxuICAvLyBpZiBhIHBvcnQgd2Fzbid0IGdpdmVuLCBwaWNrIGEgcmFuZG9tIGF2YWlsYWJsZSBvbmVcclxuICBpZiAoIW9wdHMuY2hyb21lRHJpdmVyUG9ydCkge1xyXG4gICAgbGV0IGdldFBvcnQgPSBCLnByb21pc2lmeShQb3J0RmluZGVyLmdldFBvcnQsIHtjb250ZXh0OiBQb3J0RmluZGVyfSk7XHJcbiAgICBvcHRzLmNocm9tZURyaXZlclBvcnQgPSBhd2FpdCBnZXRQb3J0KCk7XHJcbiAgICBsb2dnZXIuZGVidWcoYEEgcG9ydCB3YXMgbm90IGdpdmVuLCB1c2luZyByYW5kb20gcG9ydDogJHtvcHRzLmNocm9tZURyaXZlclBvcnR9YCk7XHJcbiAgfVxyXG4gIGxldCBjaHJvbWVBcmdzID0ge1xyXG4gICAgcG9ydDogb3B0cy5jaHJvbWVEcml2ZXJQb3J0LFxyXG4gICAgZXhlY3V0YWJsZTogb3B0cy5jaHJvbWVkcml2ZXJFeGVjdXRhYmxlLFxyXG4gICAgYWRiLFxyXG4gICAgdmVyYm9zZTogISFvcHRzLnNob3dDaHJvbWVkcml2ZXJMb2csXHJcbiAgfTtcclxuICBsZXQgY2hyb21lZHJpdmVyID0gbmV3IENocm9tZWRyaXZlcihjaHJvbWVBcmdzKTtcclxuXHJcbiAgLy8gbWFrZSBzdXJlIHRoZXJlIGFyZSBjaHJvbWVPcHRpb25zXHJcbiAgb3B0cy5jaHJvbWVPcHRpb25zID0gb3B0cy5jaHJvbWVPcHRpb25zIHx8IHt9O1xyXG4gIC8vIHRyeSBvdXQgYW55IHByZWZpeGVkIGNocm9tZU9wdGlvbnMsXHJcbiAgLy8gYW5kIHN0cmlwIHRoZSBwcmVmaXhcclxuICBmb3IgKGxldCBvcHQgb2YgXy5rZXlzKG9wdHMpKSB7XHJcbiAgICBpZiAob3B0LmVuZHNXaXRoKCc6Y2hyb21lT3B0aW9ucycpKSB7XHJcbiAgICAgIGxvZ2dlci53YXJuKGBNZXJnaW5nICcke29wdH0nIGludG8gJ2Nocm9tZU9wdGlvbnMnLiBUaGlzIG1heSBjYXVzZSB1bmV4cGVjdGVkIGJlaGF2aW9yYCk7XHJcbiAgICAgIF8ubWVyZ2Uob3B0cy5jaHJvbWVPcHRpb25zLCBvcHRzW29wdF0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbGV0IGFwcFBhY2thZ2UgPSBvcHRzLmNocm9tZU9wdGlvbnMuYW5kcm9pZFBhY2thZ2UgfHwgb3B0cy5hcHBQYWNrYWdlO1xyXG4gIGxldCBjYXBzID0ge1xyXG4gICAgY2hyb21lT3B0aW9uczoge1xyXG4gICAgICBhbmRyb2lkUGFja2FnZTogYXBwUGFja2FnZSxcclxuICAgIH1cclxuICB9O1xyXG4gIGlmIChvcHRzLmNocm9tZVVzZVJ1bm5pbmdBcHApIHtcclxuICAgIGNhcHMuY2hyb21lT3B0aW9ucy5hbmRyb2lkVXNlUnVubmluZ0FwcCA9IG9wdHMuY2hyb21lVXNlUnVubmluZ0FwcDtcclxuICB9XHJcbiAgaWYgKG9wdHMuY2hyb21lQW5kcm9pZFBhY2thZ2UpIHtcclxuICAgIGNhcHMuY2hyb21lT3B0aW9ucy5hbmRyb2lkUGFja2FnZSA9IG9wdHMuY2hyb21lQW5kcm9pZFBhY2thZ2U7XHJcbiAgfVxyXG4gIGlmIChvcHRzLmNocm9tZUFuZHJvaWRBY3Rpdml0eSkge1xyXG4gICAgY2Fwcy5jaHJvbWVPcHRpb25zLmFuZHJvaWRBY3Rpdml0eSA9IG9wdHMuY2hyb21lQW5kcm9pZEFjdGl2aXR5O1xyXG4gIH1cclxuICBpZiAob3B0cy5jaHJvbWVBbmRyb2lkUHJvY2Vzcykge1xyXG4gICAgY2Fwcy5jaHJvbWVPcHRpb25zLmFuZHJvaWRQcm9jZXNzID0gb3B0cy5jaHJvbWVBbmRyb2lkUHJvY2VzcztcclxuICB9XHJcbiAgaWYgKG9wdHMuZW5hYmxlUGVyZm9ybWFuY2VMb2dnaW5nKSB7XHJcbiAgICBjYXBzLmxvZ2dpbmdQcmVmcyA9IHtwZXJmb3JtYW5jZTogJ0FMTCd9O1xyXG4gIH1cclxuICBpZiAob3B0cy5icm93c2VyTmFtZSA9PT0gJ2Nocm9taXVtLXdlYnZpZXcnKSB7XHJcbiAgICBjYXBzLmNocm9tZU9wdGlvbnMuYW5kcm9pZEFjdGl2aXR5ID0gb3B0cy5hcHBBY3Rpdml0eTtcclxuICB9XHJcbiAgaWYgKG9wdHMucGFnZUxvYWRTdHJhdGVneSkge1xyXG4gICAgY2Fwcy5wYWdlTG9hZFN0cmF0ZWd5ID0gb3B0cy5wYWdlTG9hZFN0cmF0ZWd5O1xyXG4gIH1cclxuICBjYXBzID0gd2Vidmlld0hlbHBlcnMuZGVjb3JhdGVDaHJvbWVPcHRpb25zKGNhcHMsIG9wdHMsIGN1ckRldmljZUlkKTtcclxuICBhd2FpdCBjaHJvbWVkcml2ZXIuc3RhcnQoY2Fwcyk7XHJcbiAgcmV0dXJuIGNocm9tZWRyaXZlcjtcclxufVxyXG5cclxuT2JqZWN0LmFzc2lnbihleHRlbnNpb25zLCBjb21tYW5kcywgaGVscGVycyk7XHJcbmV4cG9ydCB7IGNvbW1hbmRzLCBoZWxwZXJzLCBzZXR1cE5ld0Nocm9tZWRyaXZlciB9O1xyXG5leHBvcnQgZGVmYXVsdCBleHRlbnNpb25zO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi4ifQ==
