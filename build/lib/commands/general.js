'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _androidHelpers = require('../android-helpers');

var _androidHelpers2 = _interopRequireDefault(_androidHelpers);

var _appiumSupport = require('appium-support');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var APP_EXTENSION = '.apk';

var commands = {},
    helpers = {},
    extensions = {};

var logTypesSupported = {
  'logcat': 'Logs for Android applications on real device and emulators via ADB'
};

commands.keys = function callee$0$0(keys) {
  var params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        // Protocol sends an array; rethink approach
        keys = _lodash2['default'].isArray(keys) ? keys.join('') : keys;
        params = {
          text: keys,
          replace: false
        };

        if (this.opts.unicodeKeyboard) {
          params.unicodeKeyboard = true;
        }
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.doSendKeys(params));

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.doSendKeys = function callee$0$0(params) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction('setText', params));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getDeviceTime = function callee$0$0() {
  var out;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].info('Attempting to capture android device date and time');
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.adb.shell(['date']));

      case 4:
        out = context$1$0.sent;
        return context$1$0.abrupt('return', out.trim());

      case 8:
        context$1$0.prev = 8;
        context$1$0.t0 = context$1$0['catch'](1);

        _logger2['default'].errorAndThrow('Could not capture device date and time: ' + context$1$0.t0);

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 8]]);
};

commands.getPageSource = function () {
  return this.bootstrap.sendAction('source');
};

commands.back = function () {
  return this.bootstrap.sendAction('pressBack');
};

commands.isKeyboardShown = function callee$0$0() {
  var keyboardInfo;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.isSoftKeyboardPresent());

      case 2:
        keyboardInfo = context$1$0.sent;
        return context$1$0.abrupt('return', keyboardInfo.isKeyboardShown);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.hideKeyboard = function callee$0$0() {
  var _ref, isKeyboardShown, canCloseKeyboard;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.isSoftKeyboardPresent());

      case 2:
        _ref = context$1$0.sent;
        isKeyboardShown = _ref.isKeyboardShown;
        canCloseKeyboard = _ref.canCloseKeyboard;

        if (isKeyboardShown) {
          context$1$0.next = 7;
          break;
        }

        throw new Error("Soft keyboard not present, cannot hide keyboard");

      case 7:
        if (!canCloseKeyboard) {
          context$1$0.next = 11;
          break;
        }

        return context$1$0.abrupt('return', this.back());

      case 11:
        _logger2['default'].info("Keyboard has no UI; no closing necessary");

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.openSettingsActivity = function callee$0$0(setting) {
  var _ref2, appPackage, appActivity;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.getFocusedPackageAndActivity());

      case 2:
        _ref2 = context$1$0.sent;
        appPackage = _ref2.appPackage;
        appActivity = _ref2.appActivity;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.adb.shell(['am', 'start', '-a', 'android.settings.' + setting]));

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.adb.waitForNotActivity(appPackage, appActivity, 5000));

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getWindowSize = function () {
  return this.bootstrap.sendAction('getDeviceSize');
};

commands.getCurrentActivity = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.getFocusedPackageAndActivity());

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent.appActivity);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getCurrentPackage = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.getFocusedPackageAndActivity());

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent.appPackage);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getLogTypes = function () {
  return _lodash2['default'].keys(logTypesSupported);
};

commands.getLog = function (logType) {
  if (!_lodash2['default'].has(logTypesSupported, logType)) {
    throw new Error('Unsupported log type ' + logType + '. ' + ('Supported types are ' + JSON.stringify(logTypesSupported)));
  }

  if (logType === 'logcat') {
    return this.adb.getLogcatLogs();
  }
};

commands.isAppInstalled = function (appPackage) {
  return this.adb.isAppInstalled(appPackage);
};

commands.removeApp = function (appPackage) {
  return this.adb.uninstallApk(appPackage);
};

commands.installApp = function callee$0$0(appPath) {
  var _ref3, apkPackage, opts;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.helpers.configureApp(appPath, APP_EXTENSION));

      case 2:
        appPath = context$1$0.sent;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(appPath));

      case 5:
        if (context$1$0.sent) {
          context$1$0.next = 7;
          break;
        }

        _logger2['default'].errorAndThrow('Could not find app apk at ' + appPath);

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.adb.packageAndLaunchActivityFromManifest(appPath));

      case 9:
        _ref3 = context$1$0.sent;
        apkPackage = _ref3.apkPackage;
        opts = {
          app: appPath,
          appPackage: apkPackage,
          fastReset: this.opts.fastReset
        };
        return context$1$0.abrupt('return', _androidHelpers2['default'].installApkRemotely(this.adb, opts));

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.background = function callee$0$0(seconds) {
  var _ref4, appPackage, appActivity, args;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(seconds < 0)) {
          context$1$0.next = 4;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.goToHome());

      case 3:
        return context$1$0.abrupt('return', true);

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.adb.getFocusedPackageAndActivity());

      case 6:
        _ref4 = context$1$0.sent;
        appPackage = _ref4.appPackage;
        appActivity = _ref4.appActivity;
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(this.adb.goToHome());

      case 11:
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(_bluebird2['default'].delay(seconds * 1000));

      case 13:
        args = undefined;

        if (this.opts.startActivityArgs && this.opts.startActivityArgs[appPackage + '/' + appActivity]) {
          // the activity was started with `startActivity`, so use those args to restart
          args = this.opts.startActivityArgs[appPackage + '/' + appActivity];
        } else if (appPackage === this.opts.appPackage && appActivity === this.opts.appActivity) {
          // the activity is the original session activity, so use the original args
          args = {
            pkg: appPackage,
            activity: appActivity,
            action: this.opts.intentAction,
            category: this.opts.intentCategory,
            flags: this.opts.intentFlags,
            waitPkg: this.opts.appWaitPackage,
            waitActivity: this.opts.appWaitActivity,
            optionalIntentArguments: this.opts.optionalIntentArguments,
            stopApp: false
          };
        } else {
          // the activity was started some other way, so use defaults
          args = {
            pkg: appPackage,
            activity: appActivity,
            waitPkg: appPackage,
            waitActivity: appActivity,
            stopApp: false
          };
        }
        context$1$0.next = 17;
        return _regeneratorRuntime.awrap(_appiumSupport.util.filterObject(args));

      case 17:
        args = context$1$0.sent;

        _logger2['default'].debug('Bringing application back to foreground with arguments: ' + JSON.stringify(args));
        context$1$0.next = 21;
        return _regeneratorRuntime.awrap(this.adb.startApp(args));

      case 21:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 22:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getStrings = function callee$0$0(language) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (language) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.getDeviceLanguage());

      case 3:
        language = context$1$0.sent;

        _logger2['default'].info('No language specified, returning strings for: ' + language);

      case 5:
        if (!this.apkStrings[language]) {
          context$1$0.next = 7;
          break;
        }

        return context$1$0.abrupt('return', this.apkStrings[language]);

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(_androidHelpers2['default'].pushStrings(language, this.adb, this.opts));

      case 9:
        this.apkStrings[language] = context$1$0.sent;
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction('updateStrings'));

      case 12:
        return context$1$0.abrupt('return', this.apkStrings[language]);

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.launchApp = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.initAUT());

      case 2:
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.startAUT());

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.startActivity = function callee$0$0(appPackage, appActivity, appWaitPackage, appWaitActivity, intentAction, intentCategory, intentFlags, optionalIntentArguments, dontStopAppOnReset) {
  var args;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug('Starting package \'' + appPackage + '\' and activity \'' + appActivity + '\'');

        // dontStopAppOnReset is both an argument here, and a desired capability
        // if the argument is set, use it, otherwise use the cap
        if (!_appiumSupport.util.hasValue(dontStopAppOnReset)) {
          dontStopAppOnReset = !!this.opts.dontStopAppOnReset;
        }

        args = {
          pkg: appPackage,
          activity: appActivity,
          waitPkg: appWaitPackage || appPackage,
          waitActivity: appWaitActivity || appActivity,
          action: intentAction,
          category: intentCategory,
          flags: intentFlags,
          optionalIntentArguments: optionalIntentArguments,
          stopApp: !dontStopAppOnReset
        };

        this.opts.startActivityArgs = this.opts.startActivityArgs || {};
        this.opts.startActivityArgs[appPackage + '/' + appActivity] = args;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.adb.startApp(args));

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.reset = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.opts.fullReset) {
          context$1$0.next = 10;
          break;
        }

        _logger2['default'].info("Running old fashion reset (reinstall)");
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.adb.stopAndClear(this.opts.appPackage));

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.adb.uninstallApk(this.opts.appPackage));

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(_androidHelpers2['default'].installApkRemotely(this.adb, this.opts));

      case 8:
        context$1$0.next = 13;
        break;

      case 10:
        _logger2['default'].info("Running fast reset (stop and clear)");
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(this.adb.stopAndClear(this.opts.appPackage));

      case 13:
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(this.grantPermissions());

      case 15:
        context$1$0.next = 17;
        return _regeneratorRuntime.awrap(this.startAUT());

      case 17:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.startAUT = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.startApp({
          pkg: this.opts.appPackage,
          activity: this.opts.appActivity,
          action: this.opts.intentAction,
          category: this.opts.intentCategory,
          flags: this.opts.intentFlags,
          waitPkg: this.opts.appWaitPackage,
          waitActivity: this.opts.appWaitActivity,
          waitDuration: this.opts.appWaitDuration,
          optionalIntentArguments: this.opts.optionalIntentArguments,
          stopApp: !this.opts.dontStopAppOnReset
        }));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// we override setUrl to take an android URI which can be used for deep-linking
// inside an app, similar to starting an intent
commands.setUrl = function callee$0$0(uri) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.startUri(uri, this.opts.appPackage));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// closing app using force stop
commands.closeApp = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.forceStop(this.opts.appPackage));

      case 2:
        // reset context since we don't know what kind on context we will end up after app launch.
        this.curContext = null;

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getDisplayDensity = function callee$0$0() {
  var out, val;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.shell(['getprop', 'ro.sf.lcd_density']));

      case 2:
        out = context$1$0.sent;

        if (!out) {
          context$1$0.next = 8;
          break;
        }

        val = parseInt(out, 10);

        if (isNaN(val)) {
          context$1$0.next = 7;
          break;
        }

        return context$1$0.abrupt('return', val);

      case 7:
        _logger2['default'].debug('Parsed density value was NaN: "' + out + '"');

      case 8:
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(this.adb.shell(['getprop', 'qemu.sf.lcd_density']));

      case 10:
        out = context$1$0.sent;

        if (!out) {
          context$1$0.next = 16;
          break;
        }

        val = parseInt(out, 10);

        if (isNaN(val)) {
          context$1$0.next = 15;
          break;
        }

        return context$1$0.abrupt('return', val);

      case 15:
        _logger2['default'].debug('Parsed density value was NaN: "' + out + '"');

      case 16:
        // couldn't get anything, so error out
        _logger2['default'].errorAndThrow('Failed to get display density property.');

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Parses the given window manager Surface string to get info.
 * @param line: To parse. This is assumed to be valid.
 * @return: Visibility and bounds of the Surface.
 */
function parseSurfaceLine(line) {
  // the surface bounds are in the format:
  // "rect=(0.0,1184.0) 768.0 x 96.0"
  //       ^ location   ^ size
  // cut out the stuff before the 'rect' and then split the numbers apart
  var bounds = line.split('rect=')[1].replace(/[\(\), x]+/g, ' ').trim().split(' ');

  return {
    visible: line.indexOf('shown=true') !== -1,
    x: parseFloat(bounds[0]),
    y: parseFloat(bounds[1]),
    width: parseFloat(bounds[2]),
    height: parseFloat(bounds[3])
  };
}

/**
 * Extracts status and navigation bar information from the window manager output.
 * @param lines: Output from dumpsys command
 * @return: Visibility and bounds info of status and navigation bar
 */
function parseWindows(lines) {
  var atStatusBar = false;
  var atNavBar = false;
  var statusBar = undefined;
  var navigationBar = undefined;
  // the window manager output looks like:
  // Window #1 ... WindowID
  //   A bunch of properties
  // Window #2 ... WindowID
  //   A bunch of properties
  lines.split('\n').forEach(function (line) {
    // the start of a new window section
    if (line.indexOf('  Window #') !== -1) {
      // determine which section we're in
      // only one will be true
      atStatusBar = line.indexOf('StatusBar') !== -1;
      atNavBar = line.indexOf('NavigationBar') !== -1;
      // don't need anything else. move to next line
      return;
    }
    // once we're in a window section, look for the surface data line
    if (line.indexOf('      Surface:') === -1) {
      return;
    }
    if (atStatusBar) {
      statusBar = parseSurfaceLine(line);
      atStatusBar = false;
    } else if (atNavBar) {
      navigationBar = parseSurfaceLine(line);
      atNavBar = false;
    }
  });

  if (!statusBar) {
    _logger2['default'].errorAndThrow('Failed to parse status bar information.');
  }
  if (!navigationBar) {
    _logger2['default'].errorAndThrow('Failed to parse navigation bar information.');
  }

  return { statusBar: statusBar, navigationBar: navigationBar };
}

commands.getSystemBars = function callee$0$0() {
  var out;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.shell(['dumpsys', 'window', 'windows']));

      case 2:
        out = context$1$0.sent;

        if (!out) {
          _logger2['default'].errorAndThrow('Did not get window manager output.');
        }
        return context$1$0.abrupt('return', parseWindows(out));

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;

// for unit tests
exports.parseWindows = parseWindows;
exports.parseSurfaceLine = parseSurfaceLine;

// if user passes in a negative seconds value, interpret that as the instruction
// to not bring the app back at all

// Return cached strings

// TODO: This is mutating the current language, but it's how appium currently works

// first try the property for devices

// if the value is NaN, try getting the emulator property

// fallback to trying property for emulators
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9nZW5lcmFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztzQkFBYyxRQUFROzs7OzhCQUNLLG9CQUFvQjs7Ozs2QkFDdEIsZ0JBQWdCOzt3QkFDM0IsVUFBVTs7OztzQkFDUixXQUFXOzs7O0FBRzNCLElBQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQzs7QUFFN0IsSUFBSSxRQUFRLEdBQUcsRUFBRTtJQUFFLE9BQU8sR0FBRyxFQUFFO0lBQUUsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7QUFFakQsSUFBTSxpQkFBaUIsR0FBRztBQUN4QixVQUFRLEVBQUcsb0VBQW9FO0NBQ2hGLENBQUM7O0FBRUYsUUFBUSxDQUFDLElBQUksR0FBRyxvQkFBZ0IsSUFBSTtNQUc5QixNQUFNOzs7OztBQURWLFlBQUksR0FBRyxvQkFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDMUMsY0FBTSxHQUFHO0FBQ1gsY0FBSSxFQUFFLElBQUk7QUFDVixpQkFBTyxFQUFFLEtBQUs7U0FDZjs7QUFDRCxZQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO0FBQzdCLGdCQUFNLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztTQUMvQjs7eUNBQ0ssSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7Ozs7Ozs7Q0FDOUIsQ0FBQzs7QUFFRixRQUFRLENBQUMsVUFBVSxHQUFHLG9CQUFnQixNQUFNOzs7Ozt5Q0FDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQzs7Ozs7Ozs7OztDQUMxRCxDQUFDOztBQUVGLFFBQVEsQ0FBQyxhQUFhLEdBQUc7TUFHakIsR0FBRzs7OztBQUZULDRCQUFJLElBQUksQ0FBQyxvREFBb0QsQ0FBQyxDQUFDOzs7eUNBRTdDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFD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Q0FBQzs7QUFFSCxNQUFJLENBQUMsU0FBUyxFQUFFO0FBQ2Qsd0JBQUksYUFBYSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7R0FDOUQ7QUFDRCxNQUFJLENBQUMsYUFBYSxFQUFFO0FBQ2xCLHdCQUFJLGFBQWEsQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO0dBQ2xFOztBQUVELFNBQU8sRUFBQyxTQUFTLEVBQVQsU0FBUyxFQUFFLGFBQWEsRUFBYixhQUFhLEVBQUMsQ0FBQztDQUNuQzs7QUFFRCxRQUFRLENBQUMsYUFBYSxHQUFHO01BQ25CLEdBQUc7Ozs7O3lDQUFTLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQzs7O0FBQTVELFdBQUc7O0FBQ1AsWUFBSSxDQUFDLEdBQUcsRUFBRTtBQUNSLDhCQUFJLGFBQWEsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1NBQ3pEOzRDQUNNLFlBQVksQ0FBQyxHQUFHLENBQUM7Ozs7Ozs7Q0FDekIsQ0FBQzs7QUFFRixlQUFjLFVBQVUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEMsUUFBUSxHQUFSLFFBQVE7UUFBRSxPQUFPLEdBQVAsT0FBTztxQkFDWCxVQUFVOzs7UUFFaEIsWUFBWSxHQUFaLFlBQVk7UUFBRSxnQkFBZ0IsR0FBaEIsZ0JBQWdCIiwiZmlsZSI6ImxpYi9jb21tYW5kcy9nZW5lcmFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IGFuZHJvaWRIZWxwZXJzIGZyb20gJy4uL2FuZHJvaWQtaGVscGVycyc7XHJcbmltcG9ydCB7IGZzLCB1dGlsIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xyXG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XHJcbmltcG9ydCBsb2cgZnJvbSAnLi4vbG9nZ2VyJztcclxuXHJcblxyXG5jb25zdCBBUFBfRVhURU5TSU9OID0gJy5hcGsnO1xyXG5cclxubGV0IGNvbW1hbmRzID0ge30sIGhlbHBlcnMgPSB7fSwgZXh0ZW5zaW9ucyA9IHt9O1xyXG5cclxuY29uc3QgbG9nVHlwZXNTdXBwb3J0ZWQgPSB7XHJcbiAgJ2xvZ2NhdCcgOiAnTG9ncyBmb3IgQW5kcm9pZCBhcHBsaWNhdGlvbnMgb24gcmVhbCBkZXZpY2UgYW5kIGVtdWxhdG9ycyB2aWEgQURCJ1xyXG59O1xyXG5cclxuY29tbWFuZHMua2V5cyA9IGFzeW5jIGZ1bmN0aW9uIChrZXlzKSB7XHJcbiAgLy8gUHJvdG9jb2wgc2VuZHMgYW4gYXJyYXk7IHJldGhpbmsgYXBwcm9hY2hcclxuICBrZXlzID0gXy5pc0FycmF5KGtleXMpID8ga2V5cy5qb2luKCcnKSA6IGtleXM7XHJcbiAgbGV0IHBhcmFtcyA9IHtcclxuICAgIHRleHQ6IGtleXMsXHJcbiAgICByZXBsYWNlOiBmYWxzZVxyXG4gIH07XHJcbiAgaWYgKHRoaXMub3B0cy51bmljb2RlS2V5Ym9hcmQpIHtcclxuICAgIHBhcmFtcy51bmljb2RlS2V5Ym9hcmQgPSB0cnVlO1xyXG4gIH1cclxuICBhd2FpdCB0aGlzLmRvU2VuZEtleXMocGFyYW1zKTtcclxufTtcclxuXHJcbmNvbW1hbmRzLmRvU2VuZEtleXMgPSBhc3luYyBmdW5jdGlvbiAocGFyYW1zKSB7XHJcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oJ3NldFRleHQnLCBwYXJhbXMpO1xyXG59O1xyXG5cclxuY29tbWFuZHMuZ2V0RGV2aWNlVGltZSA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICBsb2cuaW5mbygnQXR0ZW1wdGluZyB0byBjYXB0dXJlIGFuZHJvaWQgZGV2aWNlIGRhdGUgYW5kIHRpbWUnKTtcclxuICB0cnkge1xyXG4gICAgbGV0IG91dCA9IGF3YWl0IHRoaXMuYWRiLnNoZWxsKFsnZGF0ZSddKTtcclxuICAgIHJldHVybiBvdXQudHJpbSgpO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coYENvdWxkIG5vdCBjYXB0dXJlIGRldmljZSBkYXRlIGFuZCB0aW1lOiAke2Vycn1gKTtcclxuICB9XHJcbn07XHJcblxyXG5jb21tYW5kcy5nZXRQYWdlU291cmNlID0gZnVuY3Rpb24gKCkge1xyXG4gIHJldHVybiB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKCdzb3VyY2UnKTtcclxufTtcclxuXHJcbmNvbW1hbmRzLmJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oJ3ByZXNzQmFjaycpO1xyXG59O1xyXG5cclxuY29tbWFuZHMuaXNLZXlib2FyZFNob3duID0gYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gIGxldCBrZXlib2FyZEluZm8gPSBhd2FpdCB0aGlzLmFkYi5pc1NvZnRLZXlib2FyZFByZXNlbnQoKTtcclxuICByZXR1cm4ga2V5Ym9hcmRJbmZvLmlzS2V5Ym9hcmRTaG93bjtcclxufTtcclxuXHJcbmNvbW1hbmRzLmhpZGVLZXlib2FyZCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICBsZXQge2lzS2V5Ym9hcmRTaG93biwgY2FuQ2xvc2VLZXlib2FyZH0gPSBhd2FpdCB0aGlzLmFkYi5pc1NvZnRLZXlib2FyZFByZXNlbnQoKTtcclxuICBpZiAoIWlzS2V5Ym9hcmRTaG93bikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiU29mdCBrZXlib2FyZCBub3QgcHJlc2VudCwgY2Fubm90IGhpZGUga2V5Ym9hcmRcIik7XHJcbiAgfVxyXG5cclxuICBpZiAoY2FuQ2xvc2VLZXlib2FyZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYmFjaygpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsb2cuaW5mbyhcIktleWJvYXJkIGhhcyBubyBVSTsgbm8gY2xvc2luZyBuZWNlc3NhcnlcIik7XHJcbiAgfVxyXG59O1xyXG5cclxuY29tbWFuZHMub3BlblNldHRpbmdzQWN0aXZpdHkgPSBhc3luYyBmdW5jdGlvbiAoc2V0dGluZykge1xyXG4gIGxldCB7YXBwUGFja2FnZSwgYXBwQWN0aXZpdHl9ID0gYXdhaXQgdGhpcy5hZGIuZ2V0Rm9jdXNlZFBhY2thZ2VBbmRBY3Rpdml0eSgpO1xyXG4gIGF3YWl0IHRoaXMuYWRiLnNoZWxsKFsnYW0nLCAnc3RhcnQnLCAnLWEnLCBgYW5kcm9pZC5zZXR0aW5ncy4ke3NldHRpbmd9YF0pO1xyXG4gIGF3YWl0IHRoaXMuYWRiLndhaXRGb3JOb3RBY3Rpdml0eShhcHBQYWNrYWdlLCBhcHBBY3Rpdml0eSwgNTAwMCk7XHJcbn07XHJcblxyXG5jb21tYW5kcy5nZXRXaW5kb3dTaXplID0gZnVuY3Rpb24gKCkge1xyXG4gIHJldHVybiB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKCdnZXREZXZpY2VTaXplJyk7XHJcbn07XHJcblxyXG5jb21tYW5kcy5nZXRDdXJyZW50QWN0aXZpdHkgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIChhd2FpdCB0aGlzLmFkYi5nZXRGb2N1c2VkUGFja2FnZUFuZEFjdGl2aXR5KCkpLmFwcEFjdGl2aXR5O1xyXG59O1xyXG5cclxuY29tbWFuZHMuZ2V0Q3VycmVudFBhY2thZ2UgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIChhd2FpdCB0aGlzLmFkYi5nZXRGb2N1c2VkUGFja2FnZUFuZEFjdGl2aXR5KCkpLmFwcFBhY2thZ2U7XHJcbn07XHJcblxyXG5jb21tYW5kcy5nZXRMb2dUeXBlcyA9IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gXy5rZXlzKGxvZ1R5cGVzU3VwcG9ydGVkKTtcclxufTtcclxuXHJcbmNvbW1hbmRzLmdldExvZyA9IGZ1bmN0aW9uIChsb2dUeXBlKSB7XHJcbiAgaWYgKCFfLmhhcyhsb2dUeXBlc1N1cHBvcnRlZCwgbG9nVHlwZSkpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgbG9nIHR5cGUgJHtsb2dUeXBlfS4gYCArXHJcbiAgICAgICAgICAgICAgICAgICAgYFN1cHBvcnRlZCB0eXBlcyBhcmUgJHtKU09OLnN0cmluZ2lmeShsb2dUeXBlc1N1cHBvcnRlZCl9YCk7XHJcbiAgfVxyXG5cclxuICBpZiAobG9nVHlwZSA9PT0gJ2xvZ2NhdCcpIHtcclxuICAgIHJldHVybiB0aGlzLmFkYi5nZXRMb2djYXRMb2dzKCk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29tbWFuZHMuaXNBcHBJbnN0YWxsZWQgPSBmdW5jdGlvbiAoYXBwUGFja2FnZSkge1xyXG4gIHJldHVybiB0aGlzLmFkYi5pc0FwcEluc3RhbGxlZChhcHBQYWNrYWdlKTtcclxufTtcclxuXHJcbmNvbW1hbmRzLnJlbW92ZUFwcCA9IGZ1bmN0aW9uIChhcHBQYWNrYWdlKSB7XHJcbiAgcmV0dXJuIHRoaXMuYWRiLnVuaW5zdGFsbEFwayhhcHBQYWNrYWdlKTtcclxufTtcclxuXHJcbmNvbW1hbmRzLmluc3RhbGxBcHAgPSBhc3luYyBmdW5jdGlvbiAoYXBwUGF0aCkge1xyXG4gIGFwcFBhdGggPSBhd2FpdCB0aGlzLmhlbHBlcnMuY29uZmlndXJlQXBwKGFwcFBhdGgsIEFQUF9FWFRFTlNJT04pO1xyXG4gIGlmICghKGF3YWl0IGZzLmV4aXN0cyhhcHBQYXRoKSkpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KGBDb3VsZCBub3QgZmluZCBhcHAgYXBrIGF0ICR7YXBwUGF0aH1gKTtcclxuICB9XHJcblxyXG4gIGxldCB7YXBrUGFja2FnZX0gPSBhd2FpdCB0aGlzLmFkYi5wYWNrYWdlQW5kTGF1bmNoQWN0aXZpdHlGcm9tTWFuaWZlc3QoYXBwUGF0aCk7XHJcbiAgbGV0IG9wdHMgPSB7XHJcbiAgICBhcHA6IGFwcFBhdGgsXHJcbiAgICBhcHBQYWNrYWdlOiBhcGtQYWNrYWdlLFxyXG4gICAgZmFzdFJlc2V0OiB0aGlzLm9wdHMuZmFzdFJlc2V0XHJcbiAgfTtcclxuICByZXR1cm4gYW5kcm9pZEhlbHBlcnMuaW5zdGFsbEFwa1JlbW90ZWx5KHRoaXMuYWRiLCBvcHRzKTtcclxufTtcclxuXHJcbmNvbW1hbmRzLmJhY2tncm91bmQgPSBhc3luYyBmdW5jdGlvbiAoc2Vjb25kcykge1xyXG4gIGlmIChzZWNvbmRzIDwgMCkge1xyXG4gICAgLy8gaWYgdXNlciBwYXNzZXMgaW4gYSBuZWdhdGl2ZSBzZWNvbmRzIHZhbHVlLCBpbnRlcnByZXQgdGhhdCBhcyB0aGUgaW5zdHJ1Y3Rpb25cclxuICAgIC8vIHRvIG5vdCBicmluZyB0aGUgYXBwIGJhY2sgYXQgYWxsXHJcbiAgICBhd2FpdCB0aGlzLmFkYi5nb1RvSG9tZSgpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG4gIGxldCB7YXBwUGFja2FnZSwgYXBwQWN0aXZpdHl9ID0gYXdhaXQgdGhpcy5hZGIuZ2V0Rm9jdXNlZFBhY2thZ2VBbmRBY3Rpdml0eSgpO1xyXG4gIGF3YWl0IHRoaXMuYWRiLmdvVG9Ib21lKCk7XHJcbiAgYXdhaXQgQi5kZWxheShzZWNvbmRzICogMTAwMCk7XHJcblxyXG4gIGxldCBhcmdzO1xyXG4gIGlmICh0aGlzLm9wdHMuc3RhcnRBY3Rpdml0eUFyZ3MgJiYgdGhpcy5vcHRzLnN0YXJ0QWN0aXZpdHlBcmdzW2Ake2FwcFBhY2thZ2V9LyR7YXBwQWN0aXZpdHl9YF0pIHtcclxuICAgIC8vIHRoZSBhY3Rpdml0eSB3YXMgc3RhcnRlZCB3aXRoIGBzdGFydEFjdGl2aXR5YCwgc28gdXNlIHRob3NlIGFyZ3MgdG8gcmVzdGFydFxyXG4gICAgYXJncyA9IHRoaXMub3B0cy5zdGFydEFjdGl2aXR5QXJnc1tgJHthcHBQYWNrYWdlfS8ke2FwcEFjdGl2aXR5fWBdO1xyXG4gIH0gZWxzZSBpZiAoYXBwUGFja2FnZSA9PT0gdGhpcy5vcHRzLmFwcFBhY2thZ2UgJiYgYXBwQWN0aXZpdHkgPT09IHRoaXMub3B0cy5hcHBBY3Rpdml0eSkge1xyXG4gICAgLy8gdGhlIGFjdGl2aXR5IGlzIHRoZSBvcmlnaW5hbCBzZXNzaW9uIGFjdGl2aXR5LCBzbyB1c2UgdGhlIG9yaWdpbmFsIGFyZ3NcclxuICAgIGFyZ3MgPSB7XHJcbiAgICAgIHBrZzogYXBwUGFja2FnZSxcclxuICAgICAgYWN0aXZpdHk6IGFwcEFjdGl2aXR5LFxyXG4gICAgICBhY3Rpb246IHRoaXMub3B0cy5pbnRlbnRBY3Rpb24sXHJcbiAgICAgIGNhdGVnb3J5OiB0aGlzLm9wdHMuaW50ZW50Q2F0ZWdvcnksXHJcbiAgICAgIGZsYWdzOiB0aGlzLm9wdHMuaW50ZW50RmxhZ3MsXHJcbiAgICAgIHdhaXRQa2c6IHRoaXMub3B0cy5hcHBXYWl0UGFja2FnZSxcclxuICAgICAgd2FpdEFjdGl2aXR5OiB0aGlzLm9wdHMuYXBwV2FpdEFjdGl2aXR5LFxyXG4gICAgICBvcHRpb25hbEludGVudEFyZ3VtZW50czogdGhpcy5vcHRzLm9wdGlvbmFsSW50ZW50QXJndW1lbnRzLFxyXG4gICAgICBzdG9wQXBwOiBmYWxzZSxcclxuICAgIH07XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIHRoZSBhY3Rpdml0eSB3YXMgc3RhcnRlZCBzb21lIG90aGVyIHdheSwgc28gdXNlIGRlZmF1bHRzXHJcbiAgICBhcmdzID0ge1xyXG4gICAgICBwa2c6IGFwcFBhY2thZ2UsXHJcbiAgICAgIGFjdGl2aXR5OiBhcHBBY3Rpdml0eSxcclxuICAgICAgd2FpdFBrZzogYXBwUGFja2FnZSxcclxuICAgICAgd2FpdEFjdGl2aXR5OiBhcHBBY3Rpdml0eSxcclxuICAgICAgc3RvcEFwcDogZmFsc2VcclxuICAgIH07XHJcbiAgfVxyXG4gIGFyZ3MgPSBhd2FpdCB1dGlsLmZpbHRlck9iamVjdChhcmdzKTtcclxuICBsb2cuZGVidWcoYEJyaW5naW5nIGFwcGxpY2F0aW9uIGJhY2sgdG8gZm9yZWdyb3VuZCB3aXRoIGFyZ3VtZW50czogJHtKU09OLnN0cmluZ2lmeShhcmdzKX1gKTtcclxuICByZXR1cm4gYXdhaXQgdGhpcy5hZGIuc3RhcnRBcHAoYXJncyk7XHJcbn07XHJcblxyXG5jb21tYW5kcy5nZXRTdHJpbmdzID0gYXN5bmMgZnVuY3Rpb24gKGxhbmd1YWdlKSB7XHJcbiAgaWYgKCFsYW5ndWFnZSkge1xyXG4gICAgbGFuZ3VhZ2UgPSBhd2FpdCB0aGlzLmFkYi5nZXREZXZpY2VMYW5ndWFnZSgpO1xyXG4gICAgbG9nLmluZm8oYE5vIGxhbmd1YWdlIHNwZWNpZmllZCwgcmV0dXJuaW5nIHN0cmluZ3MgZm9yOiAke2xhbmd1YWdlfWApO1xyXG4gIH1cclxuXHJcbiAgaWYgKHRoaXMuYXBrU3RyaW5nc1tsYW5ndWFnZV0pIHtcclxuICAgIC8vIFJldHVybiBjYWNoZWQgc3RyaW5nc1xyXG4gICAgcmV0dXJuIHRoaXMuYXBrU3RyaW5nc1tsYW5ndWFnZV07XHJcbiAgfVxyXG5cclxuICAvLyBUT0RPOiBUaGlzIGlzIG11dGF0aW5nIHRoZSBjdXJyZW50IGxhbmd1YWdlLCBidXQgaXQncyBob3cgYXBwaXVtIGN1cnJlbnRseSB3b3Jrc1xyXG4gIHRoaXMuYXBrU3RyaW5nc1tsYW5ndWFnZV0gPSBhd2FpdCBhbmRyb2lkSGVscGVycy5wdXNoU3RyaW5ncyhsYW5ndWFnZSwgdGhpcy5hZGIsIHRoaXMub3B0cyk7XHJcbiAgYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbigndXBkYXRlU3RyaW5ncycpO1xyXG5cclxuICByZXR1cm4gdGhpcy5hcGtTdHJpbmdzW2xhbmd1YWdlXTtcclxufTtcclxuXHJcbmNvbW1hbmRzLmxhdW5jaEFwcCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICBhd2FpdCB0aGlzLmluaXRBVVQoKTtcclxuICBhd2FpdCB0aGlzLnN0YXJ0QVVUKCk7XHJcbn07XHJcblxyXG5jb21tYW5kcy5zdGFydEFjdGl2aXR5ID0gYXN5bmMgZnVuY3Rpb24gKGFwcFBhY2thZ2UsIGFwcEFjdGl2aXR5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcFdhaXRQYWNrYWdlLCBhcHBXYWl0QWN0aXZpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZW50QWN0aW9uLCBpbnRlbnRDYXRlZ29yeSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlbnRGbGFncywgb3B0aW9uYWxJbnRlbnRBcmd1bWVudHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9udFN0b3BBcHBPblJlc2V0KSB7XHJcbiAgbG9nLmRlYnVnKGBTdGFydGluZyBwYWNrYWdlICcke2FwcFBhY2thZ2V9JyBhbmQgYWN0aXZpdHkgJyR7YXBwQWN0aXZpdHl9J2ApO1xyXG5cclxuICAvLyBkb250U3RvcEFwcE9uUmVzZXQgaXMgYm90aCBhbiBhcmd1bWVudCBoZXJlLCBhbmQgYSBkZXNpcmVkIGNhcGFiaWxpdHlcclxuICAvLyBpZiB0aGUgYXJndW1lbnQgaXMgc2V0LCB1c2UgaXQsIG90aGVyd2lzZSB1c2UgdGhlIGNhcFxyXG4gIGlmICghdXRpbC5oYXNWYWx1ZShkb250U3RvcEFwcE9uUmVzZXQpKSB7XHJcbiAgICBkb250U3RvcEFwcE9uUmVzZXQgPSAhIXRoaXMub3B0cy5kb250U3RvcEFwcE9uUmVzZXQ7XHJcbiAgfVxyXG5cclxuICBsZXQgYXJncyA9IHtcclxuICAgIHBrZzogYXBwUGFja2FnZSxcclxuICAgIGFjdGl2aXR5OiBhcHBBY3Rpdml0eSxcclxuICAgIHdhaXRQa2c6IGFwcFdhaXRQYWNrYWdlIHx8IGFwcFBhY2thZ2UsXHJcbiAgICB3YWl0QWN0aXZpdHk6IGFwcFdhaXRBY3Rpdml0eSB8fCBhcHBBY3Rpdml0eSxcclxuICAgIGFjdGlvbjogaW50ZW50QWN0aW9uLFxyXG4gICAgY2F0ZWdvcnk6IGludGVudENhdGVnb3J5LFxyXG4gICAgZmxhZ3M6IGludGVudEZsYWdzLFxyXG4gICAgb3B0aW9uYWxJbnRlbnRBcmd1bWVudHMsXHJcbiAgICBzdG9wQXBwOiAhZG9udFN0b3BBcHBPblJlc2V0XHJcbiAgfTtcclxuICB0aGlzLm9wdHMuc3RhcnRBY3Rpdml0eUFyZ3MgPSB0aGlzLm9wdHMuc3RhcnRBY3Rpdml0eUFyZ3MgfHwge307XHJcbiAgdGhpcy5vcHRzLnN0YXJ0QWN0aXZpdHlBcmdzW2Ake2FwcFBhY2thZ2V9LyR7YXBwQWN0aXZpdHl9YF0gPSBhcmdzO1xyXG4gIGF3YWl0IHRoaXMuYWRiLnN0YXJ0QXBwKGFyZ3MpO1xyXG59O1xyXG5cclxuY29tbWFuZHMucmVzZXQgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKHRoaXMub3B0cy5mdWxsUmVzZXQpIHtcclxuICAgIGxvZy5pbmZvKFwiUnVubmluZyBvbGQgZmFzaGlvbiByZXNldCAocmVpbnN0YWxsKVwiKTtcclxuICAgIGF3YWl0IHRoaXMuYWRiLnN0b3BBbmRDbGVhcih0aGlzLm9wdHMuYXBwUGFja2FnZSk7XHJcbiAgICBhd2FpdCB0aGlzLmFkYi51bmluc3RhbGxBcGsodGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xyXG4gICAgYXdhaXQgYW5kcm9pZEhlbHBlcnMuaW5zdGFsbEFwa1JlbW90ZWx5KHRoaXMuYWRiLCB0aGlzLm9wdHMpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsb2cuaW5mbyhcIlJ1bm5pbmcgZmFzdCByZXNldCAoc3RvcCBhbmQgY2xlYXIpXCIpO1xyXG4gICAgYXdhaXQgdGhpcy5hZGIuc3RvcEFuZENsZWFyKHRoaXMub3B0cy5hcHBQYWNrYWdlKTtcclxuICB9XHJcblxyXG4gIGF3YWl0IHRoaXMuZ3JhbnRQZXJtaXNzaW9ucygpO1xyXG5cclxuICByZXR1cm4gYXdhaXQgdGhpcy5zdGFydEFVVCgpO1xyXG59O1xyXG5cclxuY29tbWFuZHMuc3RhcnRBVVQgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgYXdhaXQgdGhpcy5hZGIuc3RhcnRBcHAoe1xyXG4gICAgcGtnOiB0aGlzLm9wdHMuYXBwUGFja2FnZSxcclxuICAgIGFjdGl2aXR5OiB0aGlzLm9wdHMuYXBwQWN0aXZpdHksXHJcbiAgICBhY3Rpb246IHRoaXMub3B0cy5pbnRlbnRBY3Rpb24sXHJcbiAgICBjYXRlZ29yeTogdGhpcy5vcHRzLmludGVudENhdGVnb3J5LFxyXG4gICAgZmxhZ3M6IHRoaXMub3B0cy5pbnRlbnRGbGFncyxcclxuICAgIHdhaXRQa2c6IHRoaXMub3B0cy5hcHBXYWl0UGFja2FnZSxcclxuICAgIHdhaXRBY3Rpdml0eTogdGhpcy5vcHRzLmFwcFdhaXRBY3Rpdml0eSxcclxuICAgIHdhaXREdXJhdGlvbjogdGhpcy5vcHRzLmFwcFdhaXREdXJhdGlvbixcclxuICAgIG9wdGlvbmFsSW50ZW50QXJndW1lbnRzOiB0aGlzLm9wdHMub3B0aW9uYWxJbnRlbnRBcmd1bWVudHMsXHJcbiAgICBzdG9wQXBwOiAhdGhpcy5vcHRzLmRvbnRTdG9wQXBwT25SZXNldFxyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gd2Ugb3ZlcnJpZGUgc2V0VXJsIHRvIHRha2UgYW4gYW5kcm9pZCBVUkkgd2hpY2ggY2FuIGJlIHVzZWQgZm9yIGRlZXAtbGlua2luZ1xyXG4vLyBpbnNpZGUgYW4gYXBwLCBzaW1pbGFyIHRvIHN0YXJ0aW5nIGFuIGludGVudFxyXG5jb21tYW5kcy5zZXRVcmwgPSBhc3luYyBmdW5jdGlvbiAodXJpKSB7XHJcbiAgYXdhaXQgdGhpcy5hZGIuc3RhcnRVcmkodXJpLCB0aGlzLm9wdHMuYXBwUGFja2FnZSk7XHJcbn07XHJcblxyXG4vLyBjbG9zaW5nIGFwcCB1c2luZyBmb3JjZSBzdG9wXHJcbmNvbW1hbmRzLmNsb3NlQXBwID0gYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gIGF3YWl0IHRoaXMuYWRiLmZvcmNlU3RvcCh0aGlzLm9wdHMuYXBwUGFja2FnZSk7XHJcbiAgLy8gcmVzZXQgY29udGV4dCBzaW5jZSB3ZSBkb24ndCBrbm93IHdoYXQga2luZCBvbiBjb250ZXh0IHdlIHdpbGwgZW5kIHVwIGFmdGVyIGFwcCBsYXVuY2guXHJcbiAgdGhpcy5jdXJDb250ZXh0ID0gbnVsbDtcclxufTtcclxuXHJcbmNvbW1hbmRzLmdldERpc3BsYXlEZW5zaXR5ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gIC8vIGZpcnN0IHRyeSB0aGUgcHJvcGVydHkgZm9yIGRldmljZXNcclxuICBsZXQgb3V0ID0gYXdhaXQgdGhpcy5hZGIuc2hlbGwoWydnZXRwcm9wJywgJ3JvLnNmLmxjZF9kZW5zaXR5J10pO1xyXG4gIGlmIChvdXQpIHtcclxuICAgIGxldCB2YWwgPSBwYXJzZUludChvdXQsIDEwKTtcclxuICAgIC8vIGlmIHRoZSB2YWx1ZSBpcyBOYU4sIHRyeSBnZXR0aW5nIHRoZSBlbXVsYXRvciBwcm9wZXJ0eVxyXG4gICAgaWYgKCFpc05hTih2YWwpKSB7XHJcbiAgICAgIHJldHVybiB2YWw7XHJcbiAgICB9XHJcbiAgICBsb2cuZGVidWcoYFBhcnNlZCBkZW5zaXR5IHZhbHVlIHdhcyBOYU46IFwiJHtvdXR9XCJgKTtcclxuICB9XHJcbiAgLy8gZmFsbGJhY2sgdG8gdHJ5aW5nIHByb3BlcnR5IGZvciBlbXVsYXRvcnNcclxuICBvdXQgPSBhd2FpdCB0aGlzLmFkYi5zaGVsbChbJ2dldHByb3AnLCAncWVtdS5zZi5sY2RfZGVuc2l0eSddKTtcclxuICBpZiAob3V0KSB7XHJcbiAgICBsZXQgdmFsID0gcGFyc2VJbnQob3V0LCAxMCk7XHJcbiAgICBpZiAoIWlzTmFOKHZhbCkpIHtcclxuICAgICAgcmV0dXJuIHZhbDtcclxuICAgIH1cclxuICAgIGxvZy5kZWJ1ZyhgUGFyc2VkIGRlbnNpdHkgdmFsdWUgd2FzIE5hTjogXCIke291dH1cImApO1xyXG4gIH1cclxuICAvLyBjb3VsZG4ndCBnZXQgYW55dGhpbmcsIHNvIGVycm9yIG91dFxyXG4gIGxvZy5lcnJvckFuZFRocm93KCdGYWlsZWQgdG8gZ2V0IGRpc3BsYXkgZGVuc2l0eSBwcm9wZXJ0eS4nKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQYXJzZXMgdGhlIGdpdmVuIHdpbmRvdyBtYW5hZ2VyIFN1cmZhY2Ugc3RyaW5nIHRvIGdldCBpbmZvLlxyXG4gKiBAcGFyYW0gbGluZTogVG8gcGFyc2UuIFRoaXMgaXMgYXNzdW1lZCB0byBiZSB2YWxpZC5cclxuICogQHJldHVybjogVmlzaWJpbGl0eSBhbmQgYm91bmRzIG9mIHRoZSBTdXJmYWNlLlxyXG4gKi9cclxuZnVuY3Rpb24gcGFyc2VTdXJmYWNlTGluZSAobGluZSkge1xyXG4gIC8vIHRoZSBzdXJmYWNlIGJvdW5kcyBhcmUgaW4gdGhlIGZvcm1hdDpcclxuICAvLyBcInJlY3Q9KDAuMCwxMTg0LjApIDc2OC4wIHggOTYuMFwiXHJcbiAgLy8gICAgICAgXiBsb2NhdGlvbiAgIF4gc2l6ZVxyXG4gIC8vIGN1dCBvdXQgdGhlIHN0dWZmIGJlZm9yZSB0aGUgJ3JlY3QnIGFuZCB0aGVuIHNwbGl0IHRoZSBudW1iZXJzIGFwYXJ0XHJcbiAgbGV0IGJvdW5kcyA9IGxpbmUuc3BsaXQoJ3JlY3Q9JylbMV1cclxuICAucmVwbGFjZSgvW1xcKFxcKSwgeF0rL2csICcgJylcclxuICAudHJpbSgpXHJcbiAgLnNwbGl0KCcgJyk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB2aXNpYmxlOiAobGluZS5pbmRleE9mKCdzaG93bj10cnVlJykgIT09IC0xKSxcclxuICAgIHg6IHBhcnNlRmxvYXQoYm91bmRzWzBdKSxcclxuICAgIHk6IHBhcnNlRmxvYXQoYm91bmRzWzFdKSxcclxuICAgIHdpZHRoOiBwYXJzZUZsb2F0KGJvdW5kc1syXSksXHJcbiAgICBoZWlnaHQ6IHBhcnNlRmxvYXQoYm91bmRzWzNdKVxyXG4gIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFeHRyYWN0cyBzdGF0dXMgYW5kIG5hdmlnYXRpb24gYmFyIGluZm9ybWF0aW9uIGZyb20gdGhlIHdpbmRvdyBtYW5hZ2VyIG91dHB1dC5cclxuICogQHBhcmFtIGxpbmVzOiBPdXRwdXQgZnJvbSBkdW1wc3lzIGNvbW1hbmRcclxuICogQHJldHVybjogVmlzaWJpbGl0eSBhbmQgYm91bmRzIGluZm8gb2Ygc3RhdHVzIGFuZCBuYXZpZ2F0aW9uIGJhclxyXG4gKi9cclxuZnVuY3Rpb24gcGFyc2VXaW5kb3dzIChsaW5lcykge1xyXG4gIGxldCBhdFN0YXR1c0JhciA9IGZhbHNlO1xyXG4gIGxldCBhdE5hdkJhciA9IGZhbHNlO1xyXG4gIGxldCBzdGF0dXNCYXI7XHJcbiAgbGV0IG5hdmlnYXRpb25CYXI7XHJcbiAgLy8gdGhlIHdpbmRvdyBtYW5hZ2VyIG91dHB1dCBsb29rcyBsaWtlOlxyXG4gIC8vIFdpbmRvdyAjMSAuLi4gV2luZG93SURcclxuICAvLyAgIEEgYnVuY2ggb2YgcHJvcGVydGllc1xyXG4gIC8vIFdpbmRvdyAjMiAuLi4gV2luZG93SURcclxuICAvLyAgIEEgYnVuY2ggb2YgcHJvcGVydGllc1xyXG4gIGxpbmVzLnNwbGl0KCdcXG4nKS5mb3JFYWNoKChsaW5lKSA9PiB7XHJcbiAgICAvLyB0aGUgc3RhcnQgb2YgYSBuZXcgd2luZG93IHNlY3Rpb25cclxuICAgIGlmIChsaW5lLmluZGV4T2YoJyAgV2luZG93ICMnKSAhPT0gLTEpIHtcclxuICAgICAgLy8gZGV0ZXJtaW5lIHdoaWNoIHNlY3Rpb24gd2UncmUgaW5cclxuICAgICAgLy8gb25seSBvbmUgd2lsbCBiZSB0cnVlXHJcbiAgICAgIGF0U3RhdHVzQmFyID0gKGxpbmUuaW5kZXhPZignU3RhdHVzQmFyJykgIT09IC0xKTtcclxuICAgICAgYXROYXZCYXIgPSAobGluZS5pbmRleE9mKCdOYXZpZ2F0aW9uQmFyJykgIT09IC0xKTtcclxuICAgICAgLy8gZG9uJ3QgbmVlZCBhbnl0aGluZyBlbHNlLiBtb3ZlIHRvIG5leHQgbGluZVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAvLyBvbmNlIHdlJ3JlIGluIGEgd2luZG93IHNlY3Rpb24sIGxvb2sgZm9yIHRoZSBzdXJmYWNlIGRhdGEgbGluZVxyXG4gICAgaWYgKGxpbmUuaW5kZXhPZignICAgICAgU3VyZmFjZTonKSA9PT0gLTEpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGF0U3RhdHVzQmFyKSB7XHJcbiAgICAgIHN0YXR1c0JhciA9IHBhcnNlU3VyZmFjZUxpbmUobGluZSk7XHJcbiAgICAgIGF0U3RhdHVzQmFyID0gZmFsc2U7XHJcbiAgICB9IGVsc2UgaWYgKGF0TmF2QmFyKSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXIgPSBwYXJzZVN1cmZhY2VMaW5lKGxpbmUpO1xyXG4gICAgICBhdE5hdkJhciA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBpZiAoIXN0YXR1c0Jhcikge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coJ0ZhaWxlZCB0byBwYXJzZSBzdGF0dXMgYmFyIGluZm9ybWF0aW9uLicpO1xyXG4gIH1cclxuICBpZiAoIW5hdmlnYXRpb25CYXIpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KCdGYWlsZWQgdG8gcGFyc2UgbmF2aWdhdGlvbiBiYXIgaW5mb3JtYXRpb24uJyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge3N0YXR1c0JhciwgbmF2aWdhdGlvbkJhcn07XHJcbn1cclxuXHJcbmNvbW1hbmRzLmdldFN5c3RlbUJhcnMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgbGV0IG91dCA9IGF3YWl0IHRoaXMuYWRiLnNoZWxsKFsnZHVtcHN5cycsICd3aW5kb3cnLCAnd2luZG93cyddKTtcclxuICBpZiAoIW91dCkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coJ0RpZCBub3QgZ2V0IHdpbmRvdyBtYW5hZ2VyIG91dHB1dC4nKTtcclxuICB9XHJcbiAgcmV0dXJuIHBhcnNlV2luZG93cyhvdXQpO1xyXG59O1xyXG5cclxuT2JqZWN0LmFzc2lnbihleHRlbnNpb25zLCBjb21tYW5kcywgaGVscGVycyk7XHJcbmV4cG9ydCB7IGNvbW1hbmRzLCBoZWxwZXJzIH07XHJcbmV4cG9ydCBkZWZhdWx0IGV4dGVuc2lvbnM7XHJcbi8vIGZvciB1bml0IHRlc3RzXHJcbmV4cG9ydCB7IHBhcnNlV2luZG93cywgcGFyc2VTdXJmYWNlTGluZSB9O1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi4ifQ==
