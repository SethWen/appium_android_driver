'use strict';

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _teen_process = require('teen_process');

var _asyncbox = require('asyncbox');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _appiumSupport = require('appium-support');

var _appiumAndroidIme = require('appium-android-ime');

var _ioAppiumSettings = require('io.appium.settings');

var _appiumUnlock = require('appium-unlock');

var _appiumAndroidBootstrap = require('appium-android-bootstrap');

var _appiumAndroidBootstrap2 = _interopRequireDefault(_appiumAndroidBootstrap);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _unlockHelpers = require('./unlock-helpers');

var _unlockHelpers2 = _interopRequireDefault(_unlockHelpers);

var REMOTE_TEMP_PATH = "/data/local/tmp";
var REMOTE_INSTALL_TIMEOUT = 90000; // milliseconds
var CHROME_BROWSERS = ["Chrome", "Chromium", "Chromebeta", "Browser", "chrome", "chromium", "chromebeta", "browser", "chromium-browser", "chromium-webview"];
var SETTINGS_HELPER_PKG_ID = 'io.appium.settings';
var SETTINGS_HELPER_PKG_ACTIVITY = ".Settings";
var UNLOCK_HELPER_PKG_ID = 'io.appium.unlock';
var UNLOCK_HELPER_PKG_ACTIVITY = ".Unlock";

var helpers = {};

helpers.parseJavaVersion = function (stderr) {
  var lines = stderr.split("\n");
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(lines), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var line = _step.value;

      if (new RegExp(/(java|openjdk) version/).test(line)) {
        return line.split(" ")[2].replace(/"/g, '');
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return null;
};

helpers.getJavaVersion = function callee$0$0() {
  var _ref, stderr, javaVer;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug("Getting Java version");

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('java', ['-version']));

      case 3:
        _ref = context$1$0.sent;
        stderr = _ref.stderr;
        javaVer = helpers.parseJavaVersion(stderr);

        if (!(javaVer === null)) {
          context$1$0.next = 8;
          break;
        }

        throw new Error("Could not get the Java version. Is Java installed?");

      case 8:
        _logger2['default'].info('Java version is: ' + javaVer);
        return context$1$0.abrupt('return', javaVer);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.prepareEmulator = function callee$0$0(adb, opts) {
  var avd, avdArgs, language, locale, avdLaunchTimeout, avdReadyTimeout, avdName, runningAVD;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        avd = opts.avd;
        avdArgs = opts.avdArgs;
        language = opts.language;
        locale = opts.locale;
        avdLaunchTimeout = opts.avdLaunchTimeout;
        avdReadyTimeout = opts.avdReadyTimeout;

        if (avd) {
          context$1$0.next = 8;
          break;
        }

        throw new Error("Cannot launch AVD without AVD name");

      case 8:
        avdName = avd.replace('@', '');
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(adb.getRunningAVD(avdName));

      case 11:
        runningAVD = context$1$0.sent;

        if (!(runningAVD !== null)) {
          context$1$0.next = 21;
          break;
        }

        if (!(avdArgs && avdArgs.toLowerCase().indexOf("-wipe-data") > -1)) {
          context$1$0.next = 19;
          break;
        }

        _logger2['default'].debug('Killing \'' + avdName + '\' because it needs to be wiped at start.');
        context$1$0.next = 17;
        return _regeneratorRuntime.awrap(adb.killEmulator(avdName));

      case 17:
        context$1$0.next = 21;
        break;

      case 19:
        _logger2['default'].debug("Not launching AVD because it is already running.");
        return context$1$0.abrupt('return');

      case 21:
        avdArgs = this.prepareAVDArgs(opts, adb, avdArgs);
        context$1$0.next = 24;
        return _regeneratorRuntime.awrap(adb.launchAVD(avd, avdArgs, language, locale, avdLaunchTimeout, avdReadyTimeout));

      case 24:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.prepareAVDArgs = function (opts, adb, avdArgs) {
  var args = [];
  if (!_lodash2['default'].isUndefined(opts.networkSpeed)) {
    var networkSpeed = this.ensureNetworkSpeed(adb, opts.networkSpeed);
    args.push('-netspeed', networkSpeed);
  }
  if (opts.isHeadless) {
    args.push('-no-window');
  }
  return args.length ? avdArgs + ' ' + args.join(' ') : avdArgs;
};

helpers.ensureNetworkSpeed = function (adb, networkSpeed) {
  if (_lodash2['default'].values(adb.NETWORK_SPEED).indexOf(networkSpeed) !== -1) {
    return networkSpeed;
  }
  _logger2['default'].warn('Wrong network speed param ' + networkSpeed + ', using default: full. Supported values: ' + _lodash2['default'].values(adb.NETWORK_SPEED));
  return adb.NETWORK_SPEED.FULL;
};

helpers.ensureDeviceLocale = function callee$0$0(adb, language, country) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(!_lodash2['default'].isString(language) && !_lodash2['default'].isString(country))) {
          context$1$0.next = 4;
          break;
        }

        _logger2['default'].warn('setDeviceLanguageCountry requires language or country.');
        _logger2['default'].warn('Got language: \'' + language + '\' and country: \'' + country + '\'');
        return context$1$0.abrupt('return');

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(adb.setDeviceLanguageCountry(language, country));

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(adb.ensureCurrentLocale(language, country));

      case 8:
        if (context$1$0.sent) {
          context$1$0.next = 10;
          break;
        }

        throw new Error('Failed to set language: ' + language + ' and country: ' + country);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.getDeviceInfoFromCaps = function callee$0$0() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var adb, udid, emPort, devices, availDevicesStr, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, device, deviceOS;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_appiumAdb2['default'].createADB({
          javaVersion: opts.javaVersion,
          adbPort: opts.adbPort,
          remoteAdbHost: opts.remoteAdbHost,
          clearDeviceLogsOnStart: opts.clearDeviceLogsOnStart
        }));

      case 2:
        adb = context$1$0.sent;
        udid = opts.udid;
        emPort = null;

        if (!opts.avd) {
          context$1$0.next = 12;
          break;
        }

        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(helpers.prepareEmulator(adb, opts));

      case 8:
        udid = adb.curDeviceId;
        emPort = adb.emulatorPort;
        context$1$0.next = 64;
        break;

      case 12:
        // no avd given. lets try whatever's plugged in devices/emulators
        _logger2['default'].info("Retrieving device list");
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(adb.getDevicesWithRetry());

      case 15:
        devices = context$1$0.sent;

        if (!udid) {
          context$1$0.next = 21;
          break;
        }

        if (!_lodash2['default'].includes(_lodash2['default'].map(devices, 'udid'), udid)) {
          _logger2['default'].errorAndThrow('Device ' + udid + ' was not in the list ' + 'of connected devices');
        }
        emPort = adb.getPortFromEmulatorString(udid);
        context$1$0.next = 64;
        break;

      case 21:
        if (!opts.platformVersion) {
          context$1$0.next = 62;
          break;
        }

        opts.platformVersion = ('' + opts.platformVersion).trim();

        // a platform version was given. lets try to find a device with the same os
        _logger2['default'].info('Looking for a device with Android \'' + opts.platformVersion + '\'');

        // in case we fail to find something, give the user a useful log that has
        // the device udids and os versions so they know what's available
        availDevicesStr = [];
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 28;
        _iterator2 = _getIterator(devices);

      case 30:
        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
          context$1$0.next = 44;
          break;
        }

        device = _step2.value;
        context$1$0.next = 34;
        return _regeneratorRuntime.awrap(adb.setDeviceId(device.udid));

      case 34:
        context$1$0.next = 36;
        return _regeneratorRuntime.awrap(adb.getPlatformVersion());

      case 36:
        deviceOS = context$1$0.sent;

        // build up our info string of available devices as we iterate
        availDevicesStr.push(device.udid + ' (' + deviceOS + ')');

        // we do a begins with check for implied wildcard matching
        // eg: 4 matches 4.1, 4.0, 4.1.3-samsung, etc

        if (!(deviceOS.indexOf(opts.platformVersion) === 0)) {
          context$1$0.next = 41;
          break;
        }

        udid = device.udid;
        return context$1$0.abrupt('break', 44);

      case 41:
        _iteratorNormalCompletion2 = true;
        context$1$0.next = 30;
        break;

      case 44:
        context$1$0.next = 50;
        break;

      case 46:
        context$1$0.prev = 46;
        context$1$0.t0 = context$1$0['catch'](28);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t0;

      case 50:
        context$1$0.prev = 50;
        context$1$0.prev = 51;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 53:
        context$1$0.prev = 53;

        if (!_didIteratorError2) {
          context$1$0.next = 56;
          break;
        }

        throw _iteratorError2;

      case 56:
        return context$1$0.finish(53);

      case 57:
        return context$1$0.finish(50);

      case 58:

        // we couldn't find anything! quit
        if (!udid) {
          _logger2['default'].errorAndThrow('Unable to find an active device or emulator ' + ('with OS ' + opts.platformVersion + '. The following ') + 'are available: ' + availDevicesStr.join(', '));
        }

        emPort = adb.getPortFromEmulatorString(udid);
        context$1$0.next = 64;
        break;

      case 62:
        // a udid was not given, grab the first device we see
        udid = devices[0].udid;
        emPort = adb.getPortFromEmulatorString(udid);

      case 64:

        _logger2['default'].info('Using device: ' + udid);
        return context$1$0.abrupt('return', { udid: udid, emPort: emPort });

      case 66:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[28, 46, 50, 58], [51,, 53, 57]]);
};

// returns a new adb instance with deviceId set
helpers.createADB = function callee$0$0(javaVersion, udid, emPort, adbPort, suppressKillServer, remoteAdbHost, clearDeviceLogsOnStart) {
  var adb;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_appiumAdb2['default'].createADB({
          javaVersion: javaVersion,
          adbPort: adbPort,
          suppressKillServer: suppressKillServer,
          remoteAdbHost: remoteAdbHost,
          clearDeviceLogsOnStart: clearDeviceLogsOnStart
        }));

      case 2:
        adb = context$1$0.sent;

        adb.setDeviceId(udid);
        if (emPort) {
          adb.setEmulatorPort(emPort);
        }

        return context$1$0.abrupt('return', adb);

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.getLaunchInfo = function callee$0$0(adb, opts) {
  var app, appPackage, appActivity, appWaitPackage, appWaitActivity, _ref2, apkPackage, apkActivity;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        app = opts.app;
        appPackage = opts.appPackage;
        appActivity = opts.appActivity;
        appWaitPackage = opts.appWaitPackage;
        appWaitActivity = opts.appWaitActivity;

        if (app) {
          context$1$0.next = 8;
          break;
        }

        _logger2['default'].warn("No app sent in, not parsing package/activity");
        return context$1$0.abrupt('return');

      case 8:
        if (!(appPackage && appActivity)) {
          context$1$0.next = 10;
          break;
        }

        return context$1$0.abrupt('return');

      case 10:

        _logger2['default'].debug("Parsing package and activity from app manifest");
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(adb.packageAndLaunchActivityFromManifest(app));

      case 13:
        _ref2 = context$1$0.sent;
        apkPackage = _ref2.apkPackage;
        apkActivity = _ref2.apkActivity;

        if (apkPackage && !appPackage) {
          appPackage = apkPackage;
        }
        if (!appWaitPackage) {
          appWaitPackage = appPackage;
        }
        if (apkActivity && !appActivity) {
          appActivity = apkActivity;
        }
        if (!appWaitActivity) {
          appWaitActivity = appActivity;
        }
        _logger2['default'].debug('Parsed package and activity are: ' + apkPackage + '/' + apkActivity);
        return context$1$0.abrupt('return', { appPackage: appPackage, appWaitPackage: appWaitPackage, appActivity: appActivity, appWaitActivity: appWaitActivity });

      case 22:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.getRemoteApkPath = function (localApkMd5, androidInstallPath) {
  var remotePath = _path2['default'].posix.join(androidInstallPath || REMOTE_TEMP_PATH, localApkMd5 + '.apk');
  _logger2['default'].info('Remote apk path is ' + remotePath);
  return remotePath;
};

helpers.resetApp = function callee$0$0(adb, localApkPath, pkg, fastReset) {
  var androidInstallTimeout = arguments.length <= 4 || arguments[4] === undefined ? REMOTE_INSTALL_TIMEOUT : arguments[4];
  var androidInstallPath = arguments.length <= 5 || arguments[5] === undefined ? REMOTE_TEMP_PATH : arguments[5];
  var apkMd5, remotePath;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!fastReset) {
          context$1$0.next = 6;
          break;
        }

        _logger2['default'].debug("Running fast reset (stop and clear)");
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(adb.stopAndClear(pkg));

      case 4:
        context$1$0.next = 17;
        break;

      case 6:
        _logger2['default'].debug("Running old fashion reset (reinstall)");
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.md5(localApkPath));

      case 9:
        apkMd5 = context$1$0.sent;
        remotePath = helpers.getRemoteApkPath(apkMd5, androidInstallPath);
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(adb.fileExists(remotePath));

      case 13:
        if (context$1$0.sent) {
          context$1$0.next = 15;
          break;
        }

        throw new Error("Can't run slow reset without a remote apk!");

      case 15:
        context$1$0.next = 17;
        return _regeneratorRuntime.awrap(helpers.reinstallRemoteApk(adb, localApkPath, pkg, remotePath, androidInstallTimeout));

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.reinstallRemoteApk = function callee$0$0(adb, localApkPath, pkg, remotePath, androidInstallTimeout) {
  var tries = arguments.length <= 5 || arguments[5] === undefined ? 2 : arguments[5];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _asyncbox.retry)(tries, function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.prev = 0;
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(adb.uninstallApk(pkg));

              case 3:
                context$2$0.next = 8;
                break;

              case 5:
                context$2$0.prev = 5;
                context$2$0.t0 = context$2$0['catch'](0);

                _logger2['default'].warn("Uninstalling remote APK failed, maybe it wasn't installed");

              case 8:
                context$2$0.prev = 8;
                context$2$0.next = 11;
                return _regeneratorRuntime.awrap(adb.installFromDevicePath(remotePath, { timeout: androidInstallTimeout }));

              case 11:
                context$2$0.next = 21;
                break;

              case 13:
                context$2$0.prev = 13;
                context$2$0.t1 = context$2$0['catch'](8);

                _logger2['default'].warn("Installing remote APK failed, going to uninstall and try " + "again");
                // if remote install failed, remove ALL the apks and re-push ours
                // to the remote cache
                context$2$0.next = 18;
                return _regeneratorRuntime.awrap(helpers.removeRemoteApks(adb));

              case 18:
                context$2$0.next = 20;
                return _regeneratorRuntime.awrap(adb.push(localApkPath, remotePath));

              case 20:
                throw context$2$0.t1;

              case 21:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this, [[0, 5], [8, 13]]);
        }));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// throw an error to trigger the retry
helpers.installApkRemotely = function callee$0$0(adb, opts) {
  var app, appPackage, fastReset, androidInstallTimeout, apkMd5, remotePath, remoteApkExists, installed;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        app = opts.app;
        appPackage = opts.appPackage;
        fastReset = opts.fastReset;
        androidInstallTimeout = opts.androidInstallTimeout;

        if (!(!app || !appPackage)) {
          context$1$0.next = 6;
          break;
        }

        throw new Error("'app' and 'appPackage' options are required");

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.md5(app));

      case 8:
        apkMd5 = context$1$0.sent;
        remotePath = helpers.getRemoteApkPath(apkMd5, opts.androidInstallPath);
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(adb.fileExists(remotePath));

      case 12:
        remoteApkExists = context$1$0.sent;

        _logger2['default'].debug("Checking if app is installed");
        context$1$0.next = 16;
        return _regeneratorRuntime.awrap(adb.isAppInstalled(appPackage));

      case 16:
        installed = context$1$0.sent;

        if (!(installed && remoteApkExists && fastReset)) {
          context$1$0.next = 23;
          break;
        }

        _logger2['default'].info("Apk is already on remote and installed, resetting");
        context$1$0.next = 21;
        return _regeneratorRuntime.awrap(helpers.resetApp(adb, app, appPackage, fastReset, androidInstallTimeout));

      case 21:
        context$1$0.next = 37;
        break;

      case 23:
        if (!(!installed || !remoteApkExists && fastReset)) {
          context$1$0.next = 37;
          break;
        }

        if (!installed) {
          _logger2['default'].info("Apk is not yet installed");
        } else {
          _logger2['default'].info("Apk was already installed but not from our remote path");
        }
        _logger2['default'].info((installed ? 'Re' : '') + 'installing apk from remote');
        context$1$0.next = 28;
        return _regeneratorRuntime.awrap(adb.mkdir(REMOTE_TEMP_PATH));

      case 28:
        _logger2['default'].info("Clearing out any existing remote apks with the same hash");
        context$1$0.next = 31;
        return _regeneratorRuntime.awrap(helpers.removeRemoteApks(adb, [apkMd5]));

      case 31:
        if (remoteApkExists) {
          context$1$0.next = 35;
          break;
        }

        // push from local to remote
        _logger2['default'].info('Pushing ' + appPackage + ' to device. Will wait up to ' + androidInstallTimeout + ' ' + 'milliseconds before aborting');
        context$1$0.next = 35;
        return _regeneratorRuntime.awrap(adb.push(app, remotePath, { timeout: androidInstallTimeout }));

      case 35:
        context$1$0.next = 37;
        return _regeneratorRuntime.awrap(helpers.reinstallRemoteApk(adb, app, appPackage, remotePath, androidInstallTimeout));

      case 37:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.removeRemoteApks = function callee$0$0(adb) {
  var exceptMd5s = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  var apks, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, apk;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug("Removing any old apks");
        if (exceptMd5s) {
          _logger2['default'].debug('Except ' + JSON.stringify(exceptMd5s));
        } else {
          exceptMd5s = [];
        }
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(adb.ls(REMOTE_TEMP_PATH + '/*.apk'));

      case 4:
        apks = context$1$0.sent;

        if (!(apks.length < 1)) {
          context$1$0.next = 8;
          break;
        }

        _logger2['default'].debug("No apks to examine");
        return context$1$0.abrupt('return');

      case 8:
        apks = apks.filter(function (apk) {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = _getIterator(exceptMd5s), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var md5 = _step3.value;

              return apk.indexOf(md5) === -1;
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                _iterator3['return']();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        });
        _iteratorNormalCompletion4 = true;
        _didIteratorError4 = false;
        _iteratorError4 = undefined;
        context$1$0.prev = 12;
        _iterator4 = _getIterator(apks);

      case 14:
        if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
          context$1$0.next = 22;
          break;
        }

        apk = _step4.value;

        _logger2['default'].info('Will remove ' + apk);
        context$1$0.next = 19;
        return _regeneratorRuntime.awrap(adb.shell(['rm', '-f', apk]));

      case 19:
        _iteratorNormalCompletion4 = true;
        context$1$0.next = 14;
        break;

      case 22:
        context$1$0.next = 28;
        break;

      case 24:
        context$1$0.prev = 24;
        context$1$0.t0 = context$1$0['catch'](12);
        _didIteratorError4 = true;
        _iteratorError4 = context$1$0.t0;

      case 28:
        context$1$0.prev = 28;
        context$1$0.prev = 29;

        if (!_iteratorNormalCompletion4 && _iterator4['return']) {
          _iterator4['return']();
        }

      case 31:
        context$1$0.prev = 31;

        if (!_didIteratorError4) {
          context$1$0.next = 34;
          break;
        }

        throw _iteratorError4;

      case 34:
        return context$1$0.finish(31);

      case 35:
        return context$1$0.finish(28);

      case 36:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[12, 24, 28, 36], [29,, 31, 35]]);
};

helpers.initUnicodeKeyboard = function callee$0$0(adb) {
  var defaultIME, appiumIME;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug('Enabling Unicode keyboard support');
        _logger2['default'].debug("Pushing unicode ime to device...");

        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(adb.isAppInstalled('io.appium.android.ime'));

      case 4:
        if (context$1$0.sent) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(adb.install(_appiumAndroidIme.path, false));

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(adb.defaultIME());

      case 9:
        defaultIME = context$1$0.sent;

        _logger2['default'].debug('Unsetting previous IME ' + defaultIME);
        appiumIME = 'io.appium.android.ime/.UnicodeIME';

        _logger2['default'].debug('Setting IME to \'' + appiumIME + '\'');
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(adb.enableIME(appiumIME));

      case 15:
        context$1$0.next = 17;
        return _regeneratorRuntime.awrap(adb.setIME(appiumIME));

      case 17:
        return context$1$0.abrupt('return', defaultIME);

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.setMockLocationApp = function callee$0$0(adb, app) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(adb.getApiLevel());

      case 3:
        context$1$0.t0 = context$1$0.sent;

        if (!(context$1$0.t0 < 23)) {
          context$1$0.next = 9;
          break;
        }

        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(adb.shell(['settings', 'put', 'secure', 'mock_location', '1']));

      case 7:
        context$1$0.next = 11;
        break;

      case 9:
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(adb.shell(['appops', 'set', app, 'android:mock_location', 'allow']));

      case 11:
        context$1$0.next = 16;
        break;

      case 13:
        context$1$0.prev = 13;
        context$1$0.t1 = context$1$0['catch'](0);

        _logger2['default'].warn('Unable to set mock location for app \'' + app + '\': ' + context$1$0.t1.message);

      case 16:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 13]]);
};

helpers.installHelperApp = function callee$0$0(adb, apkPath, packageId, appName) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(adb.installOrUpgrade(apkPath, packageId));

      case 3:
        context$1$0.next = 8;
        break;

      case 5:
        context$1$0.prev = 5;
        context$1$0.t0 = context$1$0['catch'](0);

        _logger2['default'].warn('Ignored error while installing Appium ' + appName + ' helper: ' + ('\'' + context$1$0.t0.message + '\'. Manually uninstalling the application ') + ('with package id \'' + packageId + '\' may help. Expect some Appium ') + 'features may not work as expected unless this problem is ' + 'fixed.');

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 5]]);
};

helpers.pushSettingsApp = function callee$0$0(adb) {
  var throwError = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
  var startOpts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(adb.isAppInstalled(SETTINGS_HELPER_PKG_ID));

      case 2:
        if (context$1$0.sent) {
          context$1$0.next = 13;
          break;
        }

        // never update, added by shawn
        _logger2['default'].debug("Pushing settings apk to device...");

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(helpers.installHelperApp(adb, _ioAppiumSettings.path, SETTINGS_HELPER_PKG_ID, 'Settings'));

      case 6:
        context$1$0.prev = 6;
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(adb.grantAllPermissions(SETTINGS_HELPER_PKG_ID));

      case 9:
        context$1$0.next = 13;
        break;

      case 11:
        context$1$0.prev = 11;
        context$1$0.t0 = context$1$0['catch'](6);

      case 13:
        context$1$0.prev = 13;
        context$1$0.next = 16;
        return _regeneratorRuntime.awrap(adb.processExists(SETTINGS_HELPER_PKG_ID));

      case 16:
        if (context$1$0.sent) {
          context$1$0.next = 20;
          break;
        }

        startOpts = {
          pkg: SETTINGS_HELPER_PKG_ID,
          activity: SETTINGS_HELPER_PKG_ACTIVITY,
          action: "android.intent.action.MAIN",
          category: "android.intent.category.LAUNCHER",
          flags: "0x10200000",
          stopApp: false
        };
        context$1$0.next = 20;
        return _regeneratorRuntime.awrap(adb.startApp(startOpts));

      case 20:
        context$1$0.next = 27;
        break;

      case 22:
        context$1$0.prev = 22;
        context$1$0.t1 = context$1$0['catch'](13);

        _logger2['default'].warn('Failed to launch settings app: ' + context$1$0.t1.message);

        if (!throwError) {
          context$1$0.next = 27;
          break;
        }

        throw context$1$0.t1;

      case 27:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[6, 11], [13, 22]]);
};

helpers.pushUnlock = function callee$0$0(adb) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(adb.isAppInstalled(SETTINGS_HELPER_PKG_ID));

      case 2:
        if (context$1$0.sent) {
          context$1$0.next = 6;
          break;
        }

        // never update, added by shawn
        _logger2['default'].debug("Pushing unlock helper app to device...");

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(helpers.installHelperApp(adb, _appiumUnlock.path, UNLOCK_HELPER_PKG_ID, 'Unlock'));

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// pushStrings method extracts string.xml and converts it to string.json and pushes
// it to /data/local/tmp/string.json on for use of bootstrap
// if app is not present to extract string.xml it deletes remote strings.json
// if app does not have strings.xml we push an empty json object to remote
helpers.pushStrings = function callee$0$0(language, adb, opts) {
  var remotePath, stringsJson, stringsTmpDir, _ref3, apkStrings, localPath, remoteFile;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        remotePath = '/data/local/tmp';
        stringsJson = 'strings.json';
        stringsTmpDir = _path2['default'].resolve(opts.tmpDir, opts.appPackage);
        context$1$0.prev = 3;

        _logger2['default'].debug('Extracting strings from apk', opts.app, language, stringsTmpDir);
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(adb.extractStringsFromApk(opts.app, language, stringsTmpDir));

      case 7:
        _ref3 = context$1$0.sent;
        apkStrings = _ref3.apkStrings;
        localPath = _ref3.localPath;
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(adb.push(localPath, remotePath));

      case 12:
        return context$1$0.abrupt('return', apkStrings);

      case 15:
        context$1$0.prev = 15;
        context$1$0.t0 = context$1$0['catch'](3);
        context$1$0.next = 19;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(opts.app));

      case 19:
        if (context$1$0.sent) {
          context$1$0.next = 24;
          break;
        }

        context$1$0.next = 22;
        return _regeneratorRuntime.awrap(adb.rimraf(remotePath + '/' + stringsJson));

      case 22:
        context$1$0.next = 28;
        break;

      case 24:
        _logger2['default'].warn("Could not get strings, continuing anyway");
        remoteFile = remotePath + '/' + stringsJson;
        context$1$0.next = 28;
        return _regeneratorRuntime.awrap(adb.shell('echo', ['\'{}\' > ' + remoteFile]));

      case 28:
        return context$1$0.abrupt('return', {});

      case 29:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[3, 15]]);
};

helpers.unlockWithUIAutomation = function callee$0$0(driver, adb, unlockCapabilities) {
  var _PIN_UNLOCK$PASSWORD_UNLOCK$PATTERN_UNLOCK$FINGERPRINT_UNLOCK$unlockType;

  var unlockType, unlockKey, unlockMethod;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        unlockType = unlockCapabilities.unlockType;

        if (_unlockHelpers2['default'].isValidUnlockType(unlockType)) {
          context$1$0.next = 3;
          break;
        }

        throw new Error('Invalid unlock type ' + unlockType);

      case 3:
        unlockKey = unlockCapabilities.unlockKey;

        if (_unlockHelpers2['default'].isValidKey(unlockType, unlockKey)) {
          context$1$0.next = 6;
          break;
        }

        throw new Error('Missing unlockKey ' + unlockKey + ' capability for unlockType ' + unlockType);

      case 6:
        unlockMethod = (_PIN_UNLOCK$PASSWORD_UNLOCK$PATTERN_UNLOCK$FINGERPRINT_UNLOCK$unlockType = {}, _defineProperty(_PIN_UNLOCK$PASSWORD_UNLOCK$PATTERN_UNLOCK$FINGERPRINT_UNLOCK$unlockType, _unlockHelpers.PIN_UNLOCK, _unlockHelpers2['default'].pinUnlock), _defineProperty(_PIN_UNLOCK$PASSWORD_UNLOCK$PATTERN_UNLOCK$FINGERPRINT_UNLOCK$unlockType, _unlockHelpers.PASSWORD_UNLOCK, _unlockHelpers2['default'].passwordUnlock), _defineProperty(_PIN_UNLOCK$PASSWORD_UNLOCK$PATTERN_UNLOCK$FINGERPRINT_UNLOCK$unlockType, _unlockHelpers.PATTERN_UNLOCK, _unlockHelpers2['default'].patternUnlock), _defineProperty(_PIN_UNLOCK$PASSWORD_UNLOCK$PATTERN_UNLOCK$FINGERPRINT_UNLOCK$unlockType, _unlockHelpers.FINGERPRINT_UNLOCK, _unlockHelpers2['default'].fingerprintUnlock), _PIN_UNLOCK$PASSWORD_UNLOCK$PATTERN_UNLOCK$FINGERPRINT_UNLOCK$unlockType)[unlockType];
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(unlockMethod(adb, driver, unlockCapabilities));

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.unlockWithHelperApp = function callee$0$0(adb) {
  var startOpts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].info("Unlocking screen");
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(adb.forceStop(UNLOCK_HELPER_PKG_ID));

      case 3:
        startOpts = {
          pkg: UNLOCK_HELPER_PKG_ID,
          activity: UNLOCK_HELPER_PKG_ACTIVITY,
          action: "android.intent.action.MAIN",
          category: "android.intent.category.LAUNCHER",
          flags: "0x10200000",
          stopApp: false
        };
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(adb.startApp(startOpts));

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(adb.startApp(startOpts));

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.unlock = function callee$0$0(driver, adb, capabilities) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this2 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(adb.isScreenLocked());

      case 2:
        if (context$1$0.sent) {
          context$1$0.next = 5;
          break;
        }

        _logger2['default'].info("Screen already unlocked, doing nothing");
        return context$1$0.abrupt('return');

      case 5:
        if (!_lodash2['default'].isUndefined(capabilities.unlockType)) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 8;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(10, 1000, function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                _logger2['default'].debug("Screen is locked, trying to unlock");
                // check if it worked, twice
                _logger2['default'].warn("Using app unlock, this is going to be deprecated!");
                context$2$0.next = 4;
                return _regeneratorRuntime.awrap(helpers.unlockWithHelperApp(adb));

              case 4:
                context$2$0.next = 6;
                return _regeneratorRuntime.awrap(helpers.verifyUnlock(adb));

              case 6:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this2);
        }));

      case 8:
        context$1$0.next = 14;
        break;

      case 10:
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(helpers.unlockWithUIAutomation(driver, adb, { unlockType: capabilities.unlockType, unlockKey: capabilities.unlockKey }));

      case 12:
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(helpers.verifyUnlock(adb));

      case 14:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.verifyUnlock = function callee$0$0(adb) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this3 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(2, 1000, function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(adb.isScreenLocked());

              case 2:
                if (!context$2$0.sent) {
                  context$2$0.next = 4;
                  break;
                }

                throw new Error("Screen did not unlock successfully, retrying");

              case 4:
                _logger2['default'].debug("Screen unlocked successfully");

              case 5:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this3);
        }));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.initDevice = function callee$0$0(adb, opts) {
  var defaultIME;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(adb.waitForDevice());

      case 2:
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(helpers.ensureDeviceLocale(adb, opts.language, opts.locale));

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(adb.startLogcat());

      case 6:
        defaultIME = undefined;

        if (!opts.unicodeKeyboard) {
          context$1$0.next = 11;
          break;
        }

        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(helpers.initUnicodeKeyboard(adb));

      case 10:
        defaultIME = context$1$0.sent;

      case 11:
        if (opts.avd) {
          context$1$0.next = 16;
          break;
        }

        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(helpers.pushSettingsApp(adb));

      case 14:
        context$1$0.next = 16;
        return _regeneratorRuntime.awrap(helpers.setMockLocationApp(adb, SETTINGS_HELPER_PKG_ID));

      case 16:
        if (!_lodash2['default'].isUndefined(opts.unlockType)) {
          context$1$0.next = 19;
          break;
        }

        context$1$0.next = 19;
        return _regeneratorRuntime.awrap(helpers.pushUnlock(adb));

      case 19:
        return context$1$0.abrupt('return', defaultIME);

      case 20:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.removeNullProperties = function (obj) {
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = _getIterator(_lodash2['default'].keys(obj)), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var key = _step5.value;

      if (_lodash2['default'].isNull(obj[key]) || _lodash2['default'].isUndefined(obj[key])) {
        delete obj[key];
      }
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5['return']) {
        _iterator5['return']();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }
};

helpers.truncateDecimals = function (number, digits) {
  var multiplier = Math.pow(10, digits),
      adjustedNum = number * multiplier,
      truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

  return truncatedNum / multiplier;
};

helpers.isChromeBrowser = function (browser) {
  return _lodash2['default'].includes(CHROME_BROWSERS, browser);
};

helpers.getChromePkg = function (browser) {
  var pkg = undefined,
      activity = undefined;

  browser = browser.toLowerCase();
  if (browser === "chromium") {
    pkg = "org.chromium.chrome.shell";
    activity = ".ChromeShellActivity";
  } else if (browser === "chromebeta") {
    pkg = "com.chrome.beta";
    activity = "com.google.android.apps.chrome.Main";
  } else if (browser === "browser") {
    pkg = "com.android.browser";
    activity = "com.android.browser.BrowserActivity";
  } else if (browser === "chromium-browser") {
    pkg = "org.chromium.chrome";
    activity = "com.google.android.apps.chrome.Main";
  } else if (browser === "chromium-webview") {
    pkg = "org.chromium.webview_shell";
    activity = "org.chromium.webview_shell.WebViewBrowserActivity";
  } else {
    pkg = "com.android.chrome";
    activity = "com.google.android.apps.chrome.Main";
  }
  return { pkg: pkg, activity: activity };
};

helpers.bootstrap = _appiumAndroidBootstrap2['default'];
helpers.unlocker = _unlockHelpers2['default'];

exports['default'] = helpers;
exports.CHROME_BROWSERS = CHROME_BROWSERS;

// we can create a throwaway ADB instance here, so there is no dependency
// on instantiating on earlier (at this point, we have no udid)
// we can only use this ADB object for commands that would not be confused
// if multiple devices are connected

// a specific avd name was given. try to initialize with that

// udid was given, lets try to init with that device

// first try started devices/emulators

// direct adb calls to the specific device

// first do an uninstall of the package to make sure it's not there

// Next, install from the remote path. This can be flakey. If it doesn't
// work, clear out any cached apks, re-push from local, and try again

// get the default IME so we can return back to it later if we want

// errors are expected there, since the app contains non-changeable permissons

// lauch io.appium.settings app due to settings failing to be set
// if the app is not launched prior to start the session on android 7+
// see https://github.com/appium/appium/issues/8957

// delete remote string.json if present

// then start the app twice, as once is flakey

// Leave the old unlock to avoid breaking existing tests
//# sourceMappingURL=data:application/json;charset=utf8;base64,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O0FBQzlCLE9BQU8sQ0FBQyxRQUFRLDZCQUFXLENBQUM7O3FCQUViLE9BQU87UUFDYixlQUFlLEdBQWYsZUFBZSIsImZpbGUiOiJsaWIvYW5kcm9pZC1oZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IGV4ZWMgfSBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xyXG5pbXBvcnQgeyByZXRyeSwgcmV0cnlJbnRlcnZhbCB9IGZyb20gJ2FzeW5jYm94JztcclxuaW1wb3J0IGxvZ2dlciBmcm9tICcuL2xvZ2dlcic7XHJcbmltcG9ydCB7IGZzIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xyXG5pbXBvcnQgeyBwYXRoIGFzIHVuaWNvZGVJTUVQYXRoIH0gZnJvbSAnYXBwaXVtLWFuZHJvaWQtaW1lJztcclxuaW1wb3J0IHsgcGF0aCBhcyBzZXR0aW5nc0Fwa1BhdGggfSBmcm9tICdpby5hcHBpdW0uc2V0dGluZ3MnO1xyXG5pbXBvcnQgeyBwYXRoIGFzIHVubG9ja0Fwa1BhdGggfSBmcm9tICdhcHBpdW0tdW5sb2NrJztcclxuaW1wb3J0IEJvb3RzdHJhcCBmcm9tICdhcHBpdW0tYW5kcm9pZC1ib290c3RyYXAnO1xyXG5pbXBvcnQgQURCIGZyb20gJ2FwcGl1bS1hZGInO1xyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIHVubG9ja2VyLCBQSU5fVU5MT0NLLCBQQVNTV09SRF9VTkxPQ0ssIFBBVFRFUk5fVU5MT0NLLCBGSU5HRVJQUklOVF9VTkxPQ0sgfSBmcm9tICcuL3VubG9jay1oZWxwZXJzJztcclxuXHJcblxyXG5jb25zdCBSRU1PVEVfVEVNUF9QQVRIID0gXCIvZGF0YS9sb2NhbC90bXBcIjtcclxuY29uc3QgUkVNT1RFX0lOU1RBTExfVElNRU9VVCA9IDkwMDAwOyAvLyBtaWxsaXNlY29uZHNcclxuY29uc3QgQ0hST01FX0JST1dTRVJTID0gW1wiQ2hyb21lXCIsIFwiQ2hyb21pdW1cIiwgXCJDaHJvbWViZXRhXCIsIFwiQnJvd3NlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJjaHJvbWVcIiwgXCJjaHJvbWl1bVwiLCBcImNocm9tZWJldGFcIiwgXCJicm93c2VyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBcImNocm9taXVtLWJyb3dzZXJcIiwgXCJjaHJvbWl1bS13ZWJ2aWV3XCJdO1xyXG5jb25zdCBTRVRUSU5HU19IRUxQRVJfUEtHX0lEID0gJ2lvLmFwcGl1bS5zZXR0aW5ncyc7XHJcbmNvbnN0IFNFVFRJTkdTX0hFTFBFUl9QS0dfQUNUSVZJVFkgPSBcIi5TZXR0aW5nc1wiO1xyXG5jb25zdCBVTkxPQ0tfSEVMUEVSX1BLR19JRCA9ICdpby5hcHBpdW0udW5sb2NrJztcclxuY29uc3QgVU5MT0NLX0hFTFBFUl9QS0dfQUNUSVZJVFkgPSBcIi5VbmxvY2tcIjtcclxuXHJcbmxldCBoZWxwZXJzID0ge307XHJcblxyXG5oZWxwZXJzLnBhcnNlSmF2YVZlcnNpb24gPSBmdW5jdGlvbiAoc3RkZXJyKSB7XHJcbiAgbGV0IGxpbmVzID0gc3RkZXJyLnNwbGl0KFwiXFxuXCIpO1xyXG4gIGZvciAobGV0IGxpbmUgb2YgbGluZXMpIHtcclxuICAgIGlmIChuZXcgUmVnRXhwKC8oamF2YXxvcGVuamRrKSB2ZXJzaW9uLykudGVzdChsaW5lKSkge1xyXG4gICAgICByZXR1cm4gbGluZS5zcGxpdChcIiBcIilbMl0ucmVwbGFjZSgvXCIvZywgJycpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmhlbHBlcnMuZ2V0SmF2YVZlcnNpb24gPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgbG9nZ2VyLmRlYnVnKFwiR2V0dGluZyBKYXZhIHZlcnNpb25cIik7XHJcblxyXG4gIGxldCB7c3RkZXJyfSA9IGF3YWl0IGV4ZWMoJ2phdmEnLCBbJy12ZXJzaW9uJ10pO1xyXG4gIGxldCBqYXZhVmVyID0gaGVscGVycy5wYXJzZUphdmFWZXJzaW9uKHN0ZGVycik7XHJcbiAgaWYgKGphdmFWZXIgPT09IG51bGwpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBnZXQgdGhlIEphdmEgdmVyc2lvbi4gSXMgSmF2YSBpbnN0YWxsZWQ/XCIpO1xyXG4gIH1cclxuICBsb2dnZXIuaW5mbyhgSmF2YSB2ZXJzaW9uIGlzOiAke2phdmFWZXJ9YCk7XHJcbiAgcmV0dXJuIGphdmFWZXI7XHJcbn07XHJcblxyXG5oZWxwZXJzLnByZXBhcmVFbXVsYXRvciA9IGFzeW5jIGZ1bmN0aW9uIChhZGIsIG9wdHMpIHtcclxuICBsZXQge2F2ZCwgYXZkQXJncywgbGFuZ3VhZ2UsIGxvY2FsZSwgYXZkTGF1bmNoVGltZW91dCxcclxuICAgICAgIGF2ZFJlYWR5VGltZW91dH0gPSBvcHRzO1xyXG4gIGlmICghYXZkKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgbGF1bmNoIEFWRCB3aXRob3V0IEFWRCBuYW1lXCIpO1xyXG4gIH1cclxuICBsZXQgYXZkTmFtZSA9IGF2ZC5yZXBsYWNlKCdAJywgJycpO1xyXG4gIGxldCBydW5uaW5nQVZEID0gYXdhaXQgYWRiLmdldFJ1bm5pbmdBVkQoYXZkTmFtZSk7XHJcbiAgaWYgKHJ1bm5pbmdBVkQgIT09IG51bGwpIHtcclxuICAgIGlmIChhdmRBcmdzICYmIGF2ZEFyZ3MudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwiLXdpcGUtZGF0YVwiKSA+IC0xKSB7XHJcbiAgICAgIGxvZ2dlci5kZWJ1ZyhgS2lsbGluZyAnJHthdmROYW1lfScgYmVjYXVzZSBpdCBuZWVkcyB0byBiZSB3aXBlZCBhdCBzdGFydC5gKTtcclxuICAgICAgYXdhaXQgYWRiLmtpbGxFbXVsYXRvcihhdmROYW1lKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxvZ2dlci5kZWJ1ZyhcIk5vdCBsYXVuY2hpbmcgQVZEIGJlY2F1c2UgaXQgaXMgYWxyZWFkeSBydW5uaW5nLlwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gIH1cclxuICBhdmRBcmdzID0gdGhpcy5wcmVwYXJlQVZEQXJncyhvcHRzLCBhZGIsIGF2ZEFyZ3MpO1xyXG4gIGF3YWl0IGFkYi5sYXVuY2hBVkQoYXZkLCBhdmRBcmdzLCBsYW5ndWFnZSwgbG9jYWxlLCBhdmRMYXVuY2hUaW1lb3V0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgYXZkUmVhZHlUaW1lb3V0KTtcclxufTtcclxuXHJcbmhlbHBlcnMucHJlcGFyZUFWREFyZ3MgPSBmdW5jdGlvbiAob3B0cywgYWRiLCBhdmRBcmdzKSB7XHJcbiAgbGV0IGFyZ3MgPSBbXTtcclxuICBpZiAoIV8uaXNVbmRlZmluZWQob3B0cy5uZXR3b3JrU3BlZWQpKSB7XHJcbiAgICBsZXQgbmV0d29ya1NwZWVkID0gdGhpcy5lbnN1cmVOZXR3b3JrU3BlZWQoYWRiLCBvcHRzLm5ldHdvcmtTcGVlZCk7XHJcbiAgICBhcmdzLnB1c2goJy1uZXRzcGVlZCcsIG5ldHdvcmtTcGVlZCk7XHJcbiAgfVxyXG4gIGlmIChvcHRzLmlzSGVhZGxlc3MpIHtcclxuICAgIGFyZ3MucHVzaCgnLW5vLXdpbmRvdycpO1xyXG4gIH1cclxuICByZXR1cm4gYXJncy5sZW5ndGggPyBgJHthdmRBcmdzfSAke2FyZ3Muam9pbignICcpfWAgOiBhdmRBcmdzO1xyXG59O1xyXG5cclxuaGVscGVycy5lbnN1cmVOZXR3b3JrU3BlZWQgPSBmdW5jdGlvbiAoYWRiLCBuZXR3b3JrU3BlZWQpIHtcclxuICBpZiAoXy52YWx1ZXMoYWRiLk5FVFdPUktfU1BFRUQpLmluZGV4T2YobmV0d29ya1NwZWVkKSAhPT0gLTEpIHtcclxuICAgIHJldHVybiBuZXR3b3JrU3BlZWQ7XHJcbiAgfVxyXG4gIGxvZ2dlci53YXJuKGBXcm9uZyBuZXR3b3JrIHNwZWVkIHBhcmFtICR7bmV0d29ya1NwZWVkfSwgdXNpbmcgZGVmYXVsdDogZnVsbC4gU3VwcG9ydGVkIHZhbHVlczogJHtfLnZhbHVlcyhhZGIuTkVUV09SS19TUEVFRCl9YCk7XHJcbiAgcmV0dXJuIGFkYi5ORVRXT1JLX1NQRUVELkZVTEw7XHJcbn07XHJcblxyXG5oZWxwZXJzLmVuc3VyZURldmljZUxvY2FsZSA9IGFzeW5jIGZ1bmN0aW9uIChhZGIsIGxhbmd1YWdlLCBjb3VudHJ5KSB7XHJcbiAgaWYgKCFfLmlzU3RyaW5nKGxhbmd1YWdlKSAmJiAhXy5pc1N0cmluZyhjb3VudHJ5KSkge1xyXG4gICAgbG9nZ2VyLndhcm4oYHNldERldmljZUxhbmd1YWdlQ291bnRyeSByZXF1aXJlcyBsYW5ndWFnZSBvciBjb3VudHJ5LmApO1xyXG4gICAgbG9nZ2VyLndhcm4oYEdvdCBsYW5ndWFnZTogJyR7bGFuZ3VhZ2V9JyBhbmQgY291bnRyeTogJyR7Y291bnRyeX0nYCk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBhd2FpdCBhZGIuc2V0RGV2aWNlTGFuZ3VhZ2VDb3VudHJ5KGxhbmd1YWdlLCBjb3VudHJ5KTtcclxuXHJcbiAgaWYgKCFhd2FpdCBhZGIuZW5zdXJlQ3VycmVudExvY2FsZShsYW5ndWFnZSwgY291bnRyeSkpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIHNldCBsYW5ndWFnZTogJHtsYW5ndWFnZX0gYW5kIGNvdW50cnk6ICR7Y291bnRyeX1gKTtcclxuICB9XHJcbn07XHJcblxyXG5oZWxwZXJzLmdldERldmljZUluZm9Gcm9tQ2FwcyA9IGFzeW5jIGZ1bmN0aW9uIChvcHRzID0ge30pIHtcclxuICAvLyB3ZSBjYW4gY3JlYXRlIGEgdGhyb3dhd2F5IEFEQiBpbnN0YW5jZSBoZXJlLCBzbyB0aGVyZSBpcyBubyBkZXBlbmRlbmN5XHJcbiAgLy8gb24gaW5zdGFudGlhdGluZyBvbiBlYXJsaWVyIChhdCB0aGlzIHBvaW50LCB3ZSBoYXZlIG5vIHVkaWQpXHJcbiAgLy8gd2UgY2FuIG9ubHkgdXNlIHRoaXMgQURCIG9iamVjdCBmb3IgY29tbWFuZHMgdGhhdCB3b3VsZCBub3QgYmUgY29uZnVzZWRcclxuICAvLyBpZiBtdWx0aXBsZSBkZXZpY2VzIGFyZSBjb25uZWN0ZWRcclxuICBsZXQgYWRiID0gYXdhaXQgQURCLmNyZWF0ZUFEQih7XHJcbiAgICBqYXZhVmVyc2lvbjogb3B0cy5qYXZhVmVyc2lvbixcclxuICAgIGFkYlBvcnQ6IG9wdHMuYWRiUG9ydCxcclxuICAgIHJlbW90ZUFkYkhvc3Q6IG9wdHMucmVtb3RlQWRiSG9zdCxcclxuICAgIGNsZWFyRGV2aWNlTG9nc09uU3RhcnQ6IG9wdHMuY2xlYXJEZXZpY2VMb2dzT25TdGFydCxcclxuICB9KTtcclxuICBsZXQgdWRpZCA9IG9wdHMudWRpZDtcclxuICBsZXQgZW1Qb3J0ID0gbnVsbDtcclxuXHJcbiAgLy8gYSBzcGVjaWZpYyBhdmQgbmFtZSB3YXMgZ2l2ZW4uIHRyeSB0byBpbml0aWFsaXplIHdpdGggdGhhdFxyXG4gIGlmIChvcHRzLmF2ZCkge1xyXG4gICAgYXdhaXQgaGVscGVycy5wcmVwYXJlRW11bGF0b3IoYWRiLCBvcHRzKTtcclxuICAgIHVkaWQgPSBhZGIuY3VyRGV2aWNlSWQ7XHJcbiAgICBlbVBvcnQgPSBhZGIuZW11bGF0b3JQb3J0O1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBubyBhdmQgZ2l2ZW4uIGxldHMgdHJ5IHdoYXRldmVyJ3MgcGx1Z2dlZCBpbiBkZXZpY2VzL2VtdWxhdG9yc1xyXG4gICAgbG9nZ2VyLmluZm8oXCJSZXRyaWV2aW5nIGRldmljZSBsaXN0XCIpO1xyXG4gICAgbGV0IGRldmljZXMgPSBhd2FpdCBhZGIuZ2V0RGV2aWNlc1dpdGhSZXRyeSgpO1xyXG5cclxuICAgIC8vIHVkaWQgd2FzIGdpdmVuLCBsZXRzIHRyeSB0byBpbml0IHdpdGggdGhhdCBkZXZpY2VcclxuICAgIGlmICh1ZGlkKSB7XHJcbiAgICAgIGlmICghXy5pbmNsdWRlcyhfLm1hcChkZXZpY2VzLCAndWRpZCcpLCB1ZGlkKSkge1xyXG4gICAgICAgIGxvZ2dlci5lcnJvckFuZFRocm93KGBEZXZpY2UgJHt1ZGlkfSB3YXMgbm90IGluIHRoZSBsaXN0IGAgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBvZiBjb25uZWN0ZWQgZGV2aWNlc2ApO1xyXG4gICAgICB9XHJcbiAgICAgIGVtUG9ydCA9IGFkYi5nZXRQb3J0RnJvbUVtdWxhdG9yU3RyaW5nKHVkaWQpO1xyXG4gICAgfSBlbHNlIGlmIChvcHRzLnBsYXRmb3JtVmVyc2lvbikge1xyXG4gICAgICBvcHRzLnBsYXRmb3JtVmVyc2lvbiA9IGAke29wdHMucGxhdGZvcm1WZXJzaW9ufWAudHJpbSgpO1xyXG5cclxuICAgICAgLy8gYSBwbGF0Zm9ybSB2ZXJzaW9uIHdhcyBnaXZlbi4gbGV0cyB0cnkgdG8gZmluZCBhIGRldmljZSB3aXRoIHRoZSBzYW1lIG9zXHJcbiAgICAgIGxvZ2dlci5pbmZvKGBMb29raW5nIGZvciBhIGRldmljZSB3aXRoIEFuZHJvaWQgJyR7b3B0cy5wbGF0Zm9ybVZlcnNpb259J2ApO1xyXG5cclxuICAgICAgLy8gaW4gY2FzZSB3ZSBmYWlsIHRvIGZpbmQgc29tZXRoaW5nLCBnaXZlIHRoZSB1c2VyIGEgdXNlZnVsIGxvZyB0aGF0IGhhc1xyXG4gICAgICAvLyB0aGUgZGV2aWNlIHVkaWRzIGFuZCBvcyB2ZXJzaW9ucyBzbyB0aGV5IGtub3cgd2hhdCdzIGF2YWlsYWJsZVxyXG4gICAgICBsZXQgYXZhaWxEZXZpY2VzU3RyID0gW107XHJcblxyXG4gICAgICAvLyBmaXJzdCB0cnkgc3RhcnRlZCBkZXZpY2VzL2VtdWxhdG9yc1xyXG4gICAgICBmb3IgKGxldCBkZXZpY2Ugb2YgZGV2aWNlcykge1xyXG4gICAgICAgIC8vIGRpcmVjdCBhZGIgY2FsbHMgdG8gdGhlIHNwZWNpZmljIGRldmljZVxyXG4gICAgICAgIGF3YWl0IGFkYi5zZXREZXZpY2VJZChkZXZpY2UudWRpZCk7XHJcbiAgICAgICAgbGV0IGRldmljZU9TID0gYXdhaXQgYWRiLmdldFBsYXRmb3JtVmVyc2lvbigpO1xyXG5cclxuICAgICAgICAvLyBidWlsZCB1cCBvdXIgaW5mbyBzdHJpbmcgb2YgYXZhaWxhYmxlIGRldmljZXMgYXMgd2UgaXRlcmF0ZVxyXG4gICAgICAgIGF2YWlsRGV2aWNlc1N0ci5wdXNoKGAke2RldmljZS51ZGlkfSAoJHtkZXZpY2VPU30pYCk7XHJcblxyXG4gICAgICAgIC8vIHdlIGRvIGEgYmVnaW5zIHdpdGggY2hlY2sgZm9yIGltcGxpZWQgd2lsZGNhcmQgbWF0Y2hpbmdcclxuICAgICAgICAvLyBlZzogNCBtYXRjaGVzIDQuMSwgNC4wLCA0LjEuMy1zYW1zdW5nLCBldGNcclxuICAgICAgICBpZiAoZGV2aWNlT1MuaW5kZXhPZihvcHRzLnBsYXRmb3JtVmVyc2lvbikgPT09IDApIHtcclxuICAgICAgICAgIHVkaWQgPSBkZXZpY2UudWRpZDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gd2UgY291bGRuJ3QgZmluZCBhbnl0aGluZyEgcXVpdFxyXG4gICAgICBpZiAoIXVkaWQpIHtcclxuICAgICAgICBsb2dnZXIuZXJyb3JBbmRUaHJvdyhgVW5hYmxlIHRvIGZpbmQgYW4gYWN0aXZlIGRldmljZSBvciBlbXVsYXRvciBgICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgd2l0aCBPUyAke29wdHMucGxhdGZvcm1WZXJzaW9ufS4gVGhlIGZvbGxvd2luZyBgICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgYXJlIGF2YWlsYWJsZTogYCArIGF2YWlsRGV2aWNlc1N0ci5qb2luKCcsICcpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZW1Qb3J0ID0gYWRiLmdldFBvcnRGcm9tRW11bGF0b3JTdHJpbmcodWRpZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBhIHVkaWQgd2FzIG5vdCBnaXZlbiwgZ3JhYiB0aGUgZmlyc3QgZGV2aWNlIHdlIHNlZVxyXG4gICAgICB1ZGlkID0gZGV2aWNlc1swXS51ZGlkO1xyXG4gICAgICBlbVBvcnQgPSBhZGIuZ2V0UG9ydEZyb21FbXVsYXRvclN0cmluZyh1ZGlkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxvZ2dlci5pbmZvKGBVc2luZyBkZXZpY2U6ICR7dWRpZH1gKTtcclxuICByZXR1cm4ge3VkaWQsIGVtUG9ydH07XHJcbn07XHJcblxyXG4vLyByZXR1cm5zIGEgbmV3IGFkYiBpbnN0YW5jZSB3aXRoIGRldmljZUlkIHNldFxyXG5oZWxwZXJzLmNyZWF0ZUFEQiA9IGFzeW5jIGZ1bmN0aW9uIChqYXZhVmVyc2lvbiwgdWRpZCwgZW1Qb3J0LCBhZGJQb3J0LCBzdXBwcmVzc0tpbGxTZXJ2ZXIsIHJlbW90ZUFkYkhvc3QsIGNsZWFyRGV2aWNlTG9nc09uU3RhcnQpIHtcclxuICBsZXQgYWRiID0gYXdhaXQgQURCLmNyZWF0ZUFEQih7XHJcbiAgICBqYXZhVmVyc2lvbixcclxuICAgIGFkYlBvcnQsXHJcbiAgICBzdXBwcmVzc0tpbGxTZXJ2ZXIsXHJcbiAgICByZW1vdGVBZGJIb3N0LFxyXG4gICAgY2xlYXJEZXZpY2VMb2dzT25TdGFydCxcclxuICB9KTtcclxuXHJcbiAgYWRiLnNldERldmljZUlkKHVkaWQpO1xyXG4gIGlmIChlbVBvcnQpIHtcclxuICAgIGFkYi5zZXRFbXVsYXRvclBvcnQoZW1Qb3J0KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBhZGI7XHJcbn07XHJcblxyXG5oZWxwZXJzLmdldExhdW5jaEluZm8gPSBhc3luYyBmdW5jdGlvbiAoYWRiLCBvcHRzKSB7XHJcbiAgbGV0IHthcHAsIGFwcFBhY2thZ2UsIGFwcEFjdGl2aXR5LCBhcHBXYWl0UGFja2FnZSwgYXBwV2FpdEFjdGl2aXR5fSA9IG9wdHM7XHJcbiAgaWYgKCFhcHApIHtcclxuICAgIGxvZ2dlci53YXJuKFwiTm8gYXBwIHNlbnQgaW4sIG5vdCBwYXJzaW5nIHBhY2thZ2UvYWN0aXZpdHlcIik7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGlmIChhcHBQYWNrYWdlICYmIGFwcEFjdGl2aXR5KSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBsb2dnZXIuZGVidWcoXCJQYXJzaW5nIHBhY2thZ2UgYW5kIGFjdGl2aXR5IGZyb20gYXBwIG1hbmlmZXN0XCIpO1xyXG4gIGxldCB7YXBrUGFja2FnZSwgYXBrQWN0aXZpdHl9ID1cclxuICAgIGF3YWl0IGFkYi5wYWNrYWdlQW5kTGF1bmNoQWN0aXZpdHlGcm9tTWFuaWZlc3QoYXBwKTtcclxuICBpZiAoYXBrUGFja2FnZSAmJiAhYXBwUGFja2FnZSkge1xyXG4gICAgYXBwUGFja2FnZSA9IGFwa1BhY2thZ2U7XHJcbiAgfVxyXG4gIGlmICghYXBwV2FpdFBhY2thZ2UpIHtcclxuICAgIGFwcFdhaXRQYWNrYWdlID0gYXBwUGFja2FnZTtcclxuICB9XHJcbiAgaWYgKGFwa0FjdGl2aXR5ICYmICFhcHBBY3Rpdml0eSkge1xyXG4gICAgYXBwQWN0aXZpdHkgPSBhcGtBY3Rpdml0eTtcclxuICB9XHJcbiAgaWYgKCFhcHBXYWl0QWN0aXZpdHkpIHtcclxuICAgIGFwcFdhaXRBY3Rpdml0eSA9IGFwcEFjdGl2aXR5O1xyXG4gIH1cclxuICBsb2dnZXIuZGVidWcoYFBhcnNlZCBwYWNrYWdlIGFuZCBhY3Rpdml0eSBhcmU6ICR7YXBrUGFja2FnZX0vJHthcGtBY3Rpdml0eX1gKTtcclxuICByZXR1cm4ge2FwcFBhY2thZ2UsIGFwcFdhaXRQYWNrYWdlLCBhcHBBY3Rpdml0eSwgYXBwV2FpdEFjdGl2aXR5fTtcclxufTtcclxuXHJcbmhlbHBlcnMuZ2V0UmVtb3RlQXBrUGF0aCA9IGZ1bmN0aW9uIChsb2NhbEFwa01kNSwgYW5kcm9pZEluc3RhbGxQYXRoKSB7XHJcbiAgbGV0IHJlbW90ZVBhdGggPSBwYXRoLnBvc2l4LmpvaW4oYW5kcm9pZEluc3RhbGxQYXRoIHx8IFJFTU9URV9URU1QX1BBVEgsIGAke2xvY2FsQXBrTWQ1fS5hcGtgKTtcclxuICBsb2dnZXIuaW5mbyhgUmVtb3RlIGFwayBwYXRoIGlzICR7cmVtb3RlUGF0aH1gKTtcclxuICByZXR1cm4gcmVtb3RlUGF0aDtcclxufTtcclxuXHJcbmhlbHBlcnMucmVzZXRBcHAgPSBhc3luYyBmdW5jdGlvbiAoYWRiLCBsb2NhbEFwa1BhdGgsIHBrZywgZmFzdFJlc2V0LFxyXG4gIGFuZHJvaWRJbnN0YWxsVGltZW91dCA9IFJFTU9URV9JTlNUQUxMX1RJTUVPVVQsIGFuZHJvaWRJbnN0YWxsUGF0aCA9IFJFTU9URV9URU1QX1BBVEgpIHtcclxuICBpZiAoZmFzdFJlc2V0KSB7XHJcbiAgICBsb2dnZXIuZGVidWcoXCJSdW5uaW5nIGZhc3QgcmVzZXQgKHN0b3AgYW5kIGNsZWFyKVwiKTtcclxuICAgIGF3YWl0IGFkYi5zdG9wQW5kQ2xlYXIocGtnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgbG9nZ2VyLmRlYnVnKFwiUnVubmluZyBvbGQgZmFzaGlvbiByZXNldCAocmVpbnN0YWxsKVwiKTtcclxuICAgIGxldCBhcGtNZDUgPSBhd2FpdCBmcy5tZDUobG9jYWxBcGtQYXRoKTtcclxuICAgIGxldCByZW1vdGVQYXRoID0gaGVscGVycy5nZXRSZW1vdGVBcGtQYXRoKGFwa01kNSwgYW5kcm9pZEluc3RhbGxQYXRoKTtcclxuICAgIGlmICghYXdhaXQgYWRiLmZpbGVFeGlzdHMocmVtb3RlUGF0aCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgcnVuIHNsb3cgcmVzZXQgd2l0aG91dCBhIHJlbW90ZSBhcGshXCIpO1xyXG4gICAgfVxyXG4gICAgYXdhaXQgaGVscGVycy5yZWluc3RhbGxSZW1vdGVBcGsoYWRiLCBsb2NhbEFwa1BhdGgsIHBrZywgcmVtb3RlUGF0aCwgYW5kcm9pZEluc3RhbGxUaW1lb3V0KTtcclxuICB9XHJcbn07XHJcblxyXG5oZWxwZXJzLnJlaW5zdGFsbFJlbW90ZUFwayA9IGFzeW5jIGZ1bmN0aW9uIChhZGIsIGxvY2FsQXBrUGF0aCwgcGtnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdGVQYXRoLCBhbmRyb2lkSW5zdGFsbFRpbWVvdXQsIHRyaWVzID0gMikge1xyXG4gIGF3YWl0IHJldHJ5KHRyaWVzLCBhc3luYyAoKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBmaXJzdCBkbyBhbiB1bmluc3RhbGwgb2YgdGhlIHBhY2thZ2UgdG8gbWFrZSBzdXJlIGl0J3Mgbm90IHRoZXJlXHJcbiAgICAgIGF3YWl0IGFkYi51bmluc3RhbGxBcGsocGtnKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgbG9nZ2VyLndhcm4oXCJVbmluc3RhbGxpbmcgcmVtb3RlIEFQSyBmYWlsZWQsIG1heWJlIGl0IHdhc24ndCBpbnN0YWxsZWRcIik7XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCBhZGIuaW5zdGFsbEZyb21EZXZpY2VQYXRoKHJlbW90ZVBhdGgsIHt0aW1lb3V0OiBhbmRyb2lkSW5zdGFsbFRpbWVvdXR9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgbG9nZ2VyLndhcm4oXCJJbnN0YWxsaW5nIHJlbW90ZSBBUEsgZmFpbGVkLCBnb2luZyB0byB1bmluc3RhbGwgYW5kIHRyeSBcIiArXHJcbiAgICAgICAgICAgICAgICAgIFwiYWdhaW5cIik7XHJcbiAgICAgIC8vIGlmIHJlbW90ZSBpbnN0YWxsIGZhaWxlZCwgcmVtb3ZlIEFMTCB0aGUgYXBrcyBhbmQgcmUtcHVzaCBvdXJzXHJcbiAgICAgIC8vIHRvIHRoZSByZW1vdGUgY2FjaGVcclxuICAgICAgYXdhaXQgaGVscGVycy5yZW1vdmVSZW1vdGVBcGtzKGFkYik7XHJcbiAgICAgIGF3YWl0IGFkYi5wdXNoKGxvY2FsQXBrUGF0aCwgcmVtb3RlUGF0aCk7XHJcbiAgICAgIHRocm93IGU7IC8vIHRocm93IGFuIGVycm9yIHRvIHRyaWdnZXIgdGhlIHJldHJ5XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcblxyXG5oZWxwZXJzLmluc3RhbGxBcGtSZW1vdGVseSA9IGFzeW5jIGZ1bmN0aW9uIChhZGIsIG9wdHMpIHtcclxuICBsZXQge2FwcCwgYXBwUGFja2FnZSwgZmFzdFJlc2V0LCBhbmRyb2lkSW5zdGFsbFRpbWVvdXR9ID0gb3B0cztcclxuXHJcbiAgaWYgKCFhcHAgfHwgIWFwcFBhY2thZ2UpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIidhcHAnIGFuZCAnYXBwUGFja2FnZScgb3B0aW9ucyBhcmUgcmVxdWlyZWRcIik7XHJcbiAgfVxyXG5cclxuICBsZXQgYXBrTWQ1ID0gYXdhaXQgZnMubWQ1KGFwcCk7XHJcbiAgbGV0IHJlbW90ZVBhdGggPSBoZWxwZXJzLmdldFJlbW90ZUFwa1BhdGgoYXBrTWQ1LCBvcHRzLmFuZHJvaWRJbnN0YWxsUGF0aCk7XHJcbiAgbGV0IHJlbW90ZUFwa0V4aXN0cyA9IGF3YWl0IGFkYi5maWxlRXhpc3RzKHJlbW90ZVBhdGgpO1xyXG4gIGxvZ2dlci5kZWJ1ZyhcIkNoZWNraW5nIGlmIGFwcCBpcyBpbnN0YWxsZWRcIik7XHJcbiAgbGV0IGluc3RhbGxlZCA9IGF3YWl0IGFkYi5pc0FwcEluc3RhbGxlZChhcHBQYWNrYWdlKTtcclxuXHJcbiAgaWYgKGluc3RhbGxlZCAmJiByZW1vdGVBcGtFeGlzdHMgJiYgZmFzdFJlc2V0KSB7XHJcbiAgICBsb2dnZXIuaW5mbyhcIkFwayBpcyBhbHJlYWR5IG9uIHJlbW90ZSBhbmQgaW5zdGFsbGVkLCByZXNldHRpbmdcIik7XHJcbiAgICBhd2FpdCBoZWxwZXJzLnJlc2V0QXBwKGFkYiwgYXBwLCBhcHBQYWNrYWdlLCBmYXN0UmVzZXQsIGFuZHJvaWRJbnN0YWxsVGltZW91dCk7XHJcbiAgfSBlbHNlIGlmICghaW5zdGFsbGVkIHx8ICghcmVtb3RlQXBrRXhpc3RzICYmIGZhc3RSZXNldCkpIHtcclxuICAgIGlmICghaW5zdGFsbGVkKSB7XHJcbiAgICAgIGxvZ2dlci5pbmZvKFwiQXBrIGlzIG5vdCB5ZXQgaW5zdGFsbGVkXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbG9nZ2VyLmluZm8oXCJBcGsgd2FzIGFscmVhZHkgaW5zdGFsbGVkIGJ1dCBub3QgZnJvbSBvdXIgcmVtb3RlIHBhdGhcIik7XHJcbiAgICB9XHJcbiAgICBsb2dnZXIuaW5mbyhgJHtpbnN0YWxsZWQgPyAnUmUnIDogJyd9aW5zdGFsbGluZyBhcGsgZnJvbSByZW1vdGVgKTtcclxuICAgIGF3YWl0IGFkYi5ta2RpcihSRU1PVEVfVEVNUF9QQVRIKTtcclxuICAgIGxvZ2dlci5pbmZvKFwiQ2xlYXJpbmcgb3V0IGFueSBleGlzdGluZyByZW1vdGUgYXBrcyB3aXRoIHRoZSBzYW1lIGhhc2hcIik7XHJcbiAgICBhd2FpdCBoZWxwZXJzLnJlbW92ZVJlbW90ZUFwa3MoYWRiLCBbYXBrTWQ1XSk7XHJcbiAgICBpZiAoIXJlbW90ZUFwa0V4aXN0cykge1xyXG4gICAgICAvLyBwdXNoIGZyb20gbG9jYWwgdG8gcmVtb3RlXHJcbiAgICAgIGxvZ2dlci5pbmZvKGBQdXNoaW5nICR7YXBwUGFja2FnZX0gdG8gZGV2aWNlLiBXaWxsIHdhaXQgdXAgdG8gJHthbmRyb2lkSW5zdGFsbFRpbWVvdXR9IGAgK1xyXG4gICAgICAgICAgICAgICAgICBgbWlsbGlzZWNvbmRzIGJlZm9yZSBhYm9ydGluZ2ApO1xyXG4gICAgICBhd2FpdCBhZGIucHVzaChhcHAsIHJlbW90ZVBhdGgsIHt0aW1lb3V0OiBhbmRyb2lkSW5zdGFsbFRpbWVvdXR9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBOZXh0LCBpbnN0YWxsIGZyb20gdGhlIHJlbW90ZSBwYXRoLiBUaGlzIGNhbiBiZSBmbGFrZXkuIElmIGl0IGRvZXNuJ3RcclxuICAgIC8vIHdvcmssIGNsZWFyIG91dCBhbnkgY2FjaGVkIGFwa3MsIHJlLXB1c2ggZnJvbSBsb2NhbCwgYW5kIHRyeSBhZ2FpblxyXG4gICAgYXdhaXQgaGVscGVycy5yZWluc3RhbGxSZW1vdGVBcGsoYWRiLCBhcHAsIGFwcFBhY2thZ2UsIHJlbW90ZVBhdGgsIGFuZHJvaWRJbnN0YWxsVGltZW91dCk7XHJcbiAgfVxyXG59O1xyXG5cclxuaGVscGVycy5yZW1vdmVSZW1vdGVBcGtzID0gYXN5bmMgZnVuY3Rpb24gKGFkYiwgZXhjZXB0TWQ1cyA9IG51bGwpIHtcclxuICBsb2dnZXIuZGVidWcoXCJSZW1vdmluZyBhbnkgb2xkIGFwa3NcIik7XHJcbiAgaWYgKGV4Y2VwdE1kNXMpIHtcclxuICAgIGxvZ2dlci5kZWJ1ZyhgRXhjZXB0ICR7SlNPTi5zdHJpbmdpZnkoZXhjZXB0TWQ1cyl9YCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGV4Y2VwdE1kNXMgPSBbXTtcclxuICB9XHJcbiAgbGV0IGFwa3MgPSBhd2FpdCBhZGIubHMoYCR7UkVNT1RFX1RFTVBfUEFUSH0vKi5hcGtgKTtcclxuICBpZiAoYXBrcy5sZW5ndGggPCAxKSB7XHJcbiAgICBsb2dnZXIuZGVidWcoXCJObyBhcGtzIHRvIGV4YW1pbmVcIik7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGFwa3MgPSBhcGtzLmZpbHRlcigoYXBrKSA9PiB7XHJcbiAgICBmb3IgKGxldCBtZDUgb2YgZXhjZXB0TWQ1cykge1xyXG4gICAgICByZXR1cm4gYXBrLmluZGV4T2YobWQ1KSA9PT0gLTE7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgZm9yIChsZXQgYXBrIG9mIGFwa3MpIHtcclxuICAgIGxvZ2dlci5pbmZvKGBXaWxsIHJlbW92ZSAke2Fwa31gKTtcclxuICAgIGF3YWl0IGFkYi5zaGVsbChbJ3JtJywgJy1mJywgYXBrXSk7XHJcbiAgfVxyXG59O1xyXG5cclxuaGVscGVycy5pbml0VW5pY29kZUtleWJvYXJkID0gYXN5bmMgZnVuY3Rpb24gKGFkYikge1xyXG4gIGxvZ2dlci5kZWJ1ZygnRW5hYmxpbmcgVW5pY29kZSBrZXlib2FyZCBzdXBwb3J0Jyk7XHJcbiAgbG9nZ2VyLmRlYnVnKFwiUHVzaGluZyB1bmljb2RlIGltZSB0byBkZXZpY2UuLi5cIik7XHJcblxyXG4gIGlmICghYXdhaXQgYWRiLmlzQXBwSW5zdGFsbGVkKCdpby5hcHBpdW0uYW5kcm9pZC5pbWUnKSkge1xyXG4gICAgYXdhaXQgYWRiLmluc3RhbGwodW5pY29kZUlNRVBhdGgsIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIC8vIGdldCB0aGUgZGVmYXVsdCBJTUUgc28gd2UgY2FuIHJldHVybiBiYWNrIHRvIGl0IGxhdGVyIGlmIHdlIHdhbnRcclxuICBsZXQgZGVmYXVsdElNRSA9IGF3YWl0IGFkYi5kZWZhdWx0SU1FKCk7XHJcblxyXG4gIGxvZ2dlci5kZWJ1ZyhgVW5zZXR0aW5nIHByZXZpb3VzIElNRSAke2RlZmF1bHRJTUV9YCk7XHJcbiAgY29uc3QgYXBwaXVtSU1FID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmltZS8uVW5pY29kZUlNRSc7XHJcbiAgbG9nZ2VyLmRlYnVnKGBTZXR0aW5nIElNRSB0byAnJHthcHBpdW1JTUV9J2ApO1xyXG4gIGF3YWl0IGFkYi5lbmFibGVJTUUoYXBwaXVtSU1FKTtcclxuICBhd2FpdCBhZGIuc2V0SU1FKGFwcGl1bUlNRSk7XHJcbiAgcmV0dXJuIGRlZmF1bHRJTUU7XHJcbn07XHJcblxyXG5oZWxwZXJzLnNldE1vY2tMb2NhdGlvbkFwcCA9IGFzeW5jIGZ1bmN0aW9uIChhZGIsIGFwcCkge1xyXG4gIHRyeSB7XHJcbiAgICBpZiAoYXdhaXQgYWRiLmdldEFwaUxldmVsKCkgPCAyMykge1xyXG4gICAgICBhd2FpdCBhZGIuc2hlbGwoWydzZXR0aW5ncycsICdwdXQnLCAnc2VjdXJlJywgJ21vY2tfbG9jYXRpb24nLCAnMSddKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGF3YWl0IGFkYi5zaGVsbChbJ2FwcG9wcycsICdzZXQnLCBhcHAsICdhbmRyb2lkOm1vY2tfbG9jYXRpb24nLCAnYWxsb3cnXSk7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBsb2dnZXIud2FybihgVW5hYmxlIHRvIHNldCBtb2NrIGxvY2F0aW9uIGZvciBhcHAgJyR7YXBwfSc6ICR7ZXJyLm1lc3NhZ2V9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuaGVscGVycy5pbnN0YWxsSGVscGVyQXBwID0gYXN5bmMgZnVuY3Rpb24gKGFkYiwgYXBrUGF0aCwgcGFja2FnZUlkLCBhcHBOYW1lKSB7XHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IGFkYi5pbnN0YWxsT3JVcGdyYWRlKGFwa1BhdGgsIHBhY2thZ2VJZCk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBsb2dnZXIud2FybihgSWdub3JlZCBlcnJvciB3aGlsZSBpbnN0YWxsaW5nIEFwcGl1bSAke2FwcE5hbWV9IGhlbHBlcjogYCArXHJcbiAgICAgICAgICAgICAgICBgJyR7ZXJyLm1lc3NhZ2V9Jy4gTWFudWFsbHkgdW5pbnN0YWxsaW5nIHRoZSBhcHBsaWNhdGlvbiBgICtcclxuICAgICAgICAgICAgICAgIGB3aXRoIHBhY2thZ2UgaWQgJyR7cGFja2FnZUlkfScgbWF5IGhlbHAuIEV4cGVjdCBzb21lIEFwcGl1bSBgICtcclxuICAgICAgICAgICAgICAgIGBmZWF0dXJlcyBtYXkgbm90IHdvcmsgYXMgZXhwZWN0ZWQgdW5sZXNzIHRoaXMgcHJvYmxlbSBpcyBgICtcclxuICAgICAgICAgICAgICAgIGBmaXhlZC5gKTtcclxuICB9XHJcbn07XHJcblxyXG5oZWxwZXJzLnB1c2hTZXR0aW5nc0FwcCA9IGFzeW5jIGZ1bmN0aW9uIChhZGIsIHRocm93RXJyb3IgPSBmYWxzZSkge1xyXG4gIGlmICghKGF3YWl0IGFkYi5pc0FwcEluc3RhbGxlZChTRVRUSU5HU19IRUxQRVJfUEtHX0lEKSkpIHsgLy8gbmV2ZXIgdXBkYXRlLCBhZGRlZCBieSBzaGF3blxyXG4gICAgbG9nZ2VyLmRlYnVnKFwiUHVzaGluZyBzZXR0aW5ncyBhcGsgdG8gZGV2aWNlLi4uXCIpO1xyXG5cclxuICAgIGF3YWl0IGhlbHBlcnMuaW5zdGFsbEhlbHBlckFwcChhZGIsIHNldHRpbmdzQXBrUGF0aCwgU0VUVElOR1NfSEVMUEVSX1BLR19JRCwgJ1NldHRpbmdzJyk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgYWRiLmdyYW50QWxsUGVybWlzc2lvbnMoU0VUVElOR1NfSEVMUEVSX1BLR19JRCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgLy8gZXJyb3JzIGFyZSBleHBlY3RlZCB0aGVyZSwgc2luY2UgdGhlIGFwcCBjb250YWlucyBub24tY2hhbmdlYWJsZSBwZXJtaXNzb25zXHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIGxhdWNoIGlvLmFwcGl1bS5zZXR0aW5ncyBhcHAgZHVlIHRvIHNldHRpbmdzIGZhaWxpbmcgdG8gYmUgc2V0XHJcbiAgLy8gaWYgdGhlIGFwcCBpcyBub3QgbGF1bmNoZWQgcHJpb3IgdG8gc3RhcnQgdGhlIHNlc3Npb24gb24gYW5kcm9pZCA3K1xyXG4gIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYXBwaXVtL2FwcGl1bS9pc3N1ZXMvODk1N1xyXG4gIHRyeSB7XHJcbiAgICBpZiAoIShhd2FpdCBhZGIucHJvY2Vzc0V4aXN0cyhTRVRUSU5HU19IRUxQRVJfUEtHX0lEKSkpIHtcclxuICAgICAgbGV0IHN0YXJ0T3B0cyA9IHtcclxuICAgICAgICBwa2c6IFNFVFRJTkdTX0hFTFBFUl9QS0dfSUQsXHJcbiAgICAgICAgYWN0aXZpdHk6IFNFVFRJTkdTX0hFTFBFUl9QS0dfQUNUSVZJVFksXHJcbiAgICAgICAgYWN0aW9uOiBcImFuZHJvaWQuaW50ZW50LmFjdGlvbi5NQUlOXCIsXHJcbiAgICAgICAgY2F0ZWdvcnk6IFwiYW5kcm9pZC5pbnRlbnQuY2F0ZWdvcnkuTEFVTkNIRVJcIixcclxuICAgICAgICBmbGFnczogXCIweDEwMjAwMDAwXCIsXHJcbiAgICAgICAgc3RvcEFwcDogZmFsc2VcclxuICAgICAgfTtcclxuICAgICAgYXdhaXQgYWRiLnN0YXJ0QXBwKHN0YXJ0T3B0cyk7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBsb2dnZXIud2FybihgRmFpbGVkIHRvIGxhdW5jaCBzZXR0aW5ncyBhcHA6ICR7ZXJyLm1lc3NhZ2V9YCk7XHJcbiAgICBpZiAodGhyb3dFcnJvcikge1xyXG4gICAgICB0aHJvdyBlcnI7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuaGVscGVycy5wdXNoVW5sb2NrID0gYXN5bmMgZnVuY3Rpb24gKGFkYikge1xyXG4gIGlmICghKGF3YWl0IGFkYi5pc0FwcEluc3RhbGxlZChTRVRUSU5HU19IRUxQRVJfUEtHX0lEKSkpIHsgLy8gbmV2ZXIgdXBkYXRlLCBhZGRlZCBieSBzaGF3blxyXG4gICAgbG9nZ2VyLmRlYnVnKFwiUHVzaGluZyB1bmxvY2sgaGVscGVyIGFwcCB0byBkZXZpY2UuLi5cIik7XHJcblxyXG4gICAgYXdhaXQgaGVscGVycy5pbnN0YWxsSGVscGVyQXBwKGFkYiwgdW5sb2NrQXBrUGF0aCwgVU5MT0NLX0hFTFBFUl9QS0dfSUQsICdVbmxvY2snKTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBwdXNoU3RyaW5ncyBtZXRob2QgZXh0cmFjdHMgc3RyaW5nLnhtbCBhbmQgY29udmVydHMgaXQgdG8gc3RyaW5nLmpzb24gYW5kIHB1c2hlc1xyXG4vLyBpdCB0byAvZGF0YS9sb2NhbC90bXAvc3RyaW5nLmpzb24gb24gZm9yIHVzZSBvZiBib290c3RyYXBcclxuLy8gaWYgYXBwIGlzIG5vdCBwcmVzZW50IHRvIGV4dHJhY3Qgc3RyaW5nLnhtbCBpdCBkZWxldGVzIHJlbW90ZSBzdHJpbmdzLmpzb25cclxuLy8gaWYgYXBwIGRvZXMgbm90IGhhdmUgc3RyaW5ncy54bWwgd2UgcHVzaCBhbiBlbXB0eSBqc29uIG9iamVjdCB0byByZW1vdGVcclxuaGVscGVycy5wdXNoU3RyaW5ncyA9IGFzeW5jIGZ1bmN0aW9uIChsYW5ndWFnZSwgYWRiLCBvcHRzKSB7XHJcbiAgbGV0IHJlbW90ZVBhdGggPSAnL2RhdGEvbG9jYWwvdG1wJztcclxuICBsZXQgc3RyaW5nc0pzb24gPSAnc3RyaW5ncy5qc29uJztcclxuICBsZXQgc3RyaW5nc1RtcERpciA9IHBhdGgucmVzb2x2ZShvcHRzLnRtcERpciwgb3B0cy5hcHBQYWNrYWdlKTtcclxuICB0cnkge1xyXG4gICAgbG9nZ2VyLmRlYnVnKCdFeHRyYWN0aW5nIHN0cmluZ3MgZnJvbSBhcGsnLCBvcHRzLmFwcCwgbGFuZ3VhZ2UsIHN0cmluZ3NUbXBEaXIpO1xyXG4gICAgbGV0IHthcGtTdHJpbmdzLCBsb2NhbFBhdGh9ID0gYXdhaXQgYWRiLmV4dHJhY3RTdHJpbmdzRnJvbUFwayhcclxuICAgICAgICAgIG9wdHMuYXBwLCBsYW5ndWFnZSwgc3RyaW5nc1RtcERpcik7XHJcbiAgICBhd2FpdCBhZGIucHVzaChsb2NhbFBhdGgsIHJlbW90ZVBhdGgpO1xyXG4gICAgcmV0dXJuIGFwa1N0cmluZ3M7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBpZiAoIShhd2FpdCBmcy5leGlzdHMob3B0cy5hcHApKSkge1xyXG4gICAgICAvLyBkZWxldGUgcmVtb3RlIHN0cmluZy5qc29uIGlmIHByZXNlbnRcclxuICAgICAgYXdhaXQgYWRiLnJpbXJhZihgJHtyZW1vdGVQYXRofS8ke3N0cmluZ3NKc29ufWApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbG9nZ2VyLndhcm4oXCJDb3VsZCBub3QgZ2V0IHN0cmluZ3MsIGNvbnRpbnVpbmcgYW55d2F5XCIpO1xyXG4gICAgICBsZXQgcmVtb3RlRmlsZSA9IGAke3JlbW90ZVBhdGh9LyR7c3RyaW5nc0pzb259YDtcclxuICAgICAgYXdhaXQgYWRiLnNoZWxsKCdlY2hvJywgW2Ane30nID4gJHtyZW1vdGVGaWxlfWBdKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHt9O1xyXG59O1xyXG5cclxuaGVscGVycy51bmxvY2tXaXRoVUlBdXRvbWF0aW9uID0gYXN5bmMgZnVuY3Rpb24gKGRyaXZlciwgYWRiLCB1bmxvY2tDYXBhYmlsaXRpZXMpIHtcclxuICBsZXQgdW5sb2NrVHlwZSA9IHVubG9ja0NhcGFiaWxpdGllcy51bmxvY2tUeXBlO1xyXG4gIGlmICghdW5sb2NrZXIuaXNWYWxpZFVubG9ja1R5cGUodW5sb2NrVHlwZSkpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB1bmxvY2sgdHlwZSAke3VubG9ja1R5cGV9YCk7XHJcbiAgfVxyXG4gIGxldCB1bmxvY2tLZXkgPSB1bmxvY2tDYXBhYmlsaXRpZXMudW5sb2NrS2V5O1xyXG4gIGlmICghdW5sb2NrZXIuaXNWYWxpZEtleSh1bmxvY2tUeXBlLCB1bmxvY2tLZXkpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE1pc3NpbmcgdW5sb2NrS2V5ICR7dW5sb2NrS2V5fSBjYXBhYmlsaXR5IGZvciB1bmxvY2tUeXBlICR7dW5sb2NrVHlwZX1gKTtcclxuICB9XHJcbiAgY29uc3QgdW5sb2NrTWV0aG9kID0ge1xyXG4gICAgW1BJTl9VTkxPQ0tdOiB1bmxvY2tlci5waW5VbmxvY2ssXHJcbiAgICBbUEFTU1dPUkRfVU5MT0NLXTogdW5sb2NrZXIucGFzc3dvcmRVbmxvY2ssXHJcbiAgICBbUEFUVEVSTl9VTkxPQ0tdOiB1bmxvY2tlci5wYXR0ZXJuVW5sb2NrLFxyXG4gICAgW0ZJTkdFUlBSSU5UX1VOTE9DS106IHVubG9ja2VyLmZpbmdlcnByaW50VW5sb2NrXHJcbiAgfVt1bmxvY2tUeXBlXTtcclxuICBhd2FpdCB1bmxvY2tNZXRob2QoYWRiLCBkcml2ZXIsIHVubG9ja0NhcGFiaWxpdGllcyk7XHJcbn07XHJcblxyXG5oZWxwZXJzLnVubG9ja1dpdGhIZWxwZXJBcHAgPSBhc3luYyBmdW5jdGlvbiAoYWRiKSB7XHJcbiAgbG9nZ2VyLmluZm8oXCJVbmxvY2tpbmcgc2NyZWVuXCIpO1xyXG4gIGF3YWl0IGFkYi5mb3JjZVN0b3AoVU5MT0NLX0hFTFBFUl9QS0dfSUQpO1xyXG4gIC8vIHRoZW4gc3RhcnQgdGhlIGFwcCB0d2ljZSwgYXMgb25jZSBpcyBmbGFrZXlcclxuICBsZXQgc3RhcnRPcHRzID0ge1xyXG4gICAgcGtnOiBVTkxPQ0tfSEVMUEVSX1BLR19JRCxcclxuICAgIGFjdGl2aXR5OiBVTkxPQ0tfSEVMUEVSX1BLR19BQ1RJVklUWSxcclxuICAgIGFjdGlvbjogXCJhbmRyb2lkLmludGVudC5hY3Rpb24uTUFJTlwiLFxyXG4gICAgY2F0ZWdvcnk6IFwiYW5kcm9pZC5pbnRlbnQuY2F0ZWdvcnkuTEFVTkNIRVJcIixcclxuICAgIGZsYWdzOiBcIjB4MTAyMDAwMDBcIixcclxuICAgIHN0b3BBcHA6IGZhbHNlXHJcbiAgfTtcclxuICBhd2FpdCBhZGIuc3RhcnRBcHAoc3RhcnRPcHRzKTtcclxuICBhd2FpdCBhZGIuc3RhcnRBcHAoc3RhcnRPcHRzKTtcclxufTtcclxuXHJcbmhlbHBlcnMudW5sb2NrID0gYXN5bmMgZnVuY3Rpb24gKGRyaXZlciwgYWRiLCBjYXBhYmlsaXRpZXMpIHtcclxuICBpZiAoIShhd2FpdCBhZGIuaXNTY3JlZW5Mb2NrZWQoKSkpIHtcclxuICAgIGxvZ2dlci5pbmZvKFwiU2NyZWVuIGFscmVhZHkgdW5sb2NrZWQsIGRvaW5nIG5vdGhpbmdcIik7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGlmIChfLmlzVW5kZWZpbmVkKGNhcGFiaWxpdGllcy51bmxvY2tUeXBlKSkge1xyXG4gICAgLy8gTGVhdmUgdGhlIG9sZCB1bmxvY2sgdG8gYXZvaWQgYnJlYWtpbmcgZXhpc3RpbmcgdGVzdHNcclxuICAgIGF3YWl0IHJldHJ5SW50ZXJ2YWwoMTAsIDEwMDAsIGFzeW5jICgpID0+IHtcclxuICAgICAgbG9nZ2VyLmRlYnVnKFwiU2NyZWVuIGlzIGxvY2tlZCwgdHJ5aW5nIHRvIHVubG9ja1wiKTtcclxuICAgICAgLy8gY2hlY2sgaWYgaXQgd29ya2VkLCB0d2ljZVxyXG4gICAgICBsb2dnZXIud2FybihcIlVzaW5nIGFwcCB1bmxvY2ssIHRoaXMgaXMgZ29pbmcgdG8gYmUgZGVwcmVjYXRlZCFcIik7XHJcbiAgICAgIGF3YWl0IGhlbHBlcnMudW5sb2NrV2l0aEhlbHBlckFwcChhZGIpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLnZlcmlmeVVubG9jayhhZGIpO1xyXG4gICAgfSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGF3YWl0IGhlbHBlcnMudW5sb2NrV2l0aFVJQXV0b21hdGlvbihkcml2ZXIsIGFkYiwge3VubG9ja1R5cGU6IGNhcGFiaWxpdGllcy51bmxvY2tUeXBlLCB1bmxvY2tLZXk6IGNhcGFiaWxpdGllcy51bmxvY2tLZXl9KTtcclxuICAgIGF3YWl0IGhlbHBlcnMudmVyaWZ5VW5sb2NrKGFkYik7XHJcbiAgfVxyXG59O1xyXG5cclxuaGVscGVycy52ZXJpZnlVbmxvY2sgPSBhc3luYyBmdW5jdGlvbiAoYWRiKSB7XHJcbiAgYXdhaXQgcmV0cnlJbnRlcnZhbCgyLCAxMDAwLCBhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYXdhaXQgYWRiLmlzU2NyZWVuTG9ja2VkKCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2NyZWVuIGRpZCBub3QgdW5sb2NrIHN1Y2Nlc3NmdWxseSwgcmV0cnlpbmdcIik7XHJcbiAgICB9XHJcbiAgICBsb2dnZXIuZGVidWcoXCJTY3JlZW4gdW5sb2NrZWQgc3VjY2Vzc2Z1bGx5XCIpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuaGVscGVycy5pbml0RGV2aWNlID0gYXN5bmMgZnVuY3Rpb24gKGFkYiwgb3B0cykge1xyXG4gIGF3YWl0IGFkYi53YWl0Rm9yRGV2aWNlKCk7XHJcblxyXG4gIGF3YWl0IGhlbHBlcnMuZW5zdXJlRGV2aWNlTG9jYWxlKGFkYiwgb3B0cy5sYW5ndWFnZSwgb3B0cy5sb2NhbGUpO1xyXG4gIGF3YWl0IGFkYi5zdGFydExvZ2NhdCgpO1xyXG4gIGxldCBkZWZhdWx0SU1FO1xyXG4gIGlmIChvcHRzLnVuaWNvZGVLZXlib2FyZCkge1xyXG4gICAgZGVmYXVsdElNRSA9IGF3YWl0IGhlbHBlcnMuaW5pdFVuaWNvZGVLZXlib2FyZChhZGIpO1xyXG4gIH1cclxuICBpZiAoIW9wdHMuYXZkKSB7XHJcbiAgICBhd2FpdCBoZWxwZXJzLnB1c2hTZXR0aW5nc0FwcChhZGIpO1xyXG4gICAgYXdhaXQgaGVscGVycy5zZXRNb2NrTG9jYXRpb25BcHAoYWRiLCBTRVRUSU5HU19IRUxQRVJfUEtHX0lEKTtcclxuICB9XHJcbiAgaWYgKF8uaXNVbmRlZmluZWQob3B0cy51bmxvY2tUeXBlKSkge1xyXG4gICAgYXdhaXQgaGVscGVycy5wdXNoVW5sb2NrKGFkYik7XHJcbiAgfVxyXG4gIHJldHVybiBkZWZhdWx0SU1FO1xyXG59O1xyXG5cclxuaGVscGVycy5yZW1vdmVOdWxsUHJvcGVydGllcyA9IGZ1bmN0aW9uIChvYmopIHtcclxuICBmb3IgKGxldCBrZXkgb2YgXy5rZXlzKG9iaikpIHtcclxuICAgIGlmIChfLmlzTnVsbChvYmpba2V5XSkgfHwgXy5pc1VuZGVmaW5lZChvYmpba2V5XSkpIHtcclxuICAgICAgZGVsZXRlIG9ialtrZXldO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmhlbHBlcnMudHJ1bmNhdGVEZWNpbWFscyA9IGZ1bmN0aW9uIChudW1iZXIsIGRpZ2l0cykge1xyXG4gIGxldCBtdWx0aXBsaWVyID0gTWF0aC5wb3coMTAsIGRpZ2l0cyksXHJcbiAgICAgIGFkanVzdGVkTnVtID0gbnVtYmVyICogbXVsdGlwbGllcixcclxuICAgICAgdHJ1bmNhdGVkTnVtID0gTWF0aFthZGp1c3RlZE51bSA8IDAgPyAnY2VpbCcgOiAnZmxvb3InXShhZGp1c3RlZE51bSk7XHJcblxyXG4gIHJldHVybiB0cnVuY2F0ZWROdW0gLyBtdWx0aXBsaWVyO1xyXG59O1xyXG5cclxuaGVscGVycy5pc0Nocm9tZUJyb3dzZXIgPSBmdW5jdGlvbiAoYnJvd3Nlcikge1xyXG4gIHJldHVybiBfLmluY2x1ZGVzKENIUk9NRV9CUk9XU0VSUywgYnJvd3Nlcik7XHJcbn07XHJcblxyXG5oZWxwZXJzLmdldENocm9tZVBrZyA9IGZ1bmN0aW9uIChicm93c2VyKSB7XHJcbiAgbGV0IHBrZywgYWN0aXZpdHk7XHJcblxyXG4gIGJyb3dzZXIgPSBicm93c2VyLnRvTG93ZXJDYXNlKCk7XHJcbiAgaWYgKGJyb3dzZXIgPT09IFwiY2hyb21pdW1cIikge1xyXG4gICAgcGtnID0gXCJvcmcuY2hyb21pdW0uY2hyb21lLnNoZWxsXCI7XHJcbiAgICBhY3Rpdml0eSA9IFwiLkNocm9tZVNoZWxsQWN0aXZpdHlcIjtcclxuICB9IGVsc2UgaWYgKGJyb3dzZXIgPT09IFwiY2hyb21lYmV0YVwiKSB7XHJcbiAgICBwa2cgPSBcImNvbS5jaHJvbWUuYmV0YVwiO1xyXG4gICAgYWN0aXZpdHkgPSBcImNvbS5nb29nbGUuYW5kcm9pZC5hcHBzLmNocm9tZS5NYWluXCI7XHJcbiAgfSBlbHNlIGlmIChicm93c2VyID09PSBcImJyb3dzZXJcIikge1xyXG4gICAgcGtnID0gXCJjb20uYW5kcm9pZC5icm93c2VyXCI7XHJcbiAgICBhY3Rpdml0eSA9IFwiY29tLmFuZHJvaWQuYnJvd3Nlci5Ccm93c2VyQWN0aXZpdHlcIjtcclxuICB9IGVsc2UgaWYgKGJyb3dzZXIgPT09IFwiY2hyb21pdW0tYnJvd3NlclwiKSB7XHJcbiAgICBwa2cgPSBcIm9yZy5jaHJvbWl1bS5jaHJvbWVcIjtcclxuICAgIGFjdGl2aXR5ID0gXCJjb20uZ29vZ2xlLmFuZHJvaWQuYXBwcy5jaHJvbWUuTWFpblwiO1xyXG4gIH0gZWxzZSBpZiAoYnJvd3NlciA9PT0gXCJjaHJvbWl1bS13ZWJ2aWV3XCIpIHtcclxuICAgIHBrZyA9IFwib3JnLmNocm9taXVtLndlYnZpZXdfc2hlbGxcIjtcclxuICAgIGFjdGl2aXR5ID0gXCJvcmcuY2hyb21pdW0ud2Vidmlld19zaGVsbC5XZWJWaWV3QnJvd3NlckFjdGl2aXR5XCI7XHJcbiAgfSBlbHNlIHtcclxuICAgIHBrZyA9IFwiY29tLmFuZHJvaWQuY2hyb21lXCI7XHJcbiAgICBhY3Rpdml0eSA9IFwiY29tLmdvb2dsZS5hbmRyb2lkLmFwcHMuY2hyb21lLk1haW5cIjtcclxuICB9XHJcbiAgcmV0dXJuIHtwa2csIGFjdGl2aXR5fTtcclxufTtcclxuXHJcbmhlbHBlcnMuYm9vdHN0cmFwID0gQm9vdHN0cmFwO1xyXG5oZWxwZXJzLnVubG9ja2VyID0gdW5sb2NrZXI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBoZWxwZXJzO1xyXG5leHBvcnQgeyBDSFJPTUVfQlJPV1NFUlMgfTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi4ifQ==
