'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _appiumBaseDriver = require('appium-base-driver');

var _appiumChromedriver = require('appium-chromedriver');

var _appiumChromedriver2 = _interopRequireDefault(_appiumChromedriver);

var _desiredCaps = require('./desired-caps');

var _desiredCaps2 = _interopRequireDefault(_desiredCaps);

var _commandsIndex = require('./commands/index');

var _commandsIndex2 = _interopRequireDefault(_commandsIndex);

var _commandsContext = require('./commands/context');

var _androidHelpers = require('./android-helpers');

var _androidHelpers2 = _interopRequireDefault(_androidHelpers);

var _webviewHelpers = require('./webview-helpers');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumAdb = require('appium-adb');

var _appiumSupport = require('appium-support');

var _asyncbox = require('asyncbox');

var _sharedPreferencesBuilder = require('shared-preferences-builder');

var APP_EXTENSION = '.apk';
var DEVICE_PORT = 4724;

// This is a set of methods and paths that we never want to proxy to
// Chromedriver
var NO_PROXY = [['POST', new RegExp('^/session/[^/]+/context')], ['GET', new RegExp('^/session/[^/]+/context')], ['POST', new RegExp('^/session/[^/]+/appium')], ['GET', new RegExp('^/session/[^/]+/appium')], ['POST', new RegExp('^/session/[^/]+/touch/perform')], ['POST', new RegExp('^/session/[^/]+/touch/multi/perform')], ['POST', new RegExp('^/session/[^/]+/orientation')], ['GET', new RegExp('^/session/[^/]+/orientation')]];

var AndroidDriver = (function (_BaseDriver) {
  _inherits(AndroidDriver, _BaseDriver);

  function AndroidDriver() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var shouldValidateCaps = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    _classCallCheck(this, AndroidDriver);

    _get(Object.getPrototypeOf(AndroidDriver.prototype), 'constructor', this).call(this, opts, shouldValidateCaps);

    this.locatorStrategies = ['xpath', 'id', 'class name', 'accessibility id', '-android uiautomator'];
    this.desiredCapConstraints = _desiredCaps2['default'];
    this.sessionChromedrivers = {};
    this.jwpProxyActive = false;
    this.jwpProxyAvoid = _lodash2['default'].clone(NO_PROXY);
    this.settings = new _appiumBaseDriver.DeviceSettings({ ignoreUnimportantViews: false }, this.onSettingsUpdate.bind(this));
    this.chromedriver = null;
    this.apkStrings = {};
    this.bootstrapPort = opts.bootstrapPort || DEVICE_PORT;
    this.unlocker = _androidHelpers2['default'].unlocker;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(_lodash2['default'].toPairs(_commandsIndex2['default'])), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2);

        var cmd = _step$value[0];
        var fn = _step$value[1];

        AndroidDriver.prototype[cmd] = fn;
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
  }

  _createClass(AndroidDriver, [{
    key: 'createSession',
    value: function createSession() {
      var _len,
          args,
          _key,
          _ref,
          _ref2,
          sessionId,
          caps,
          serverDetails,
          defaultOpts,
          _helpers$getChromePkg,
          pkg,
          activity,
          _ref3,

      // get device udid for this session
      udid,
          emPort,
          networkSpeed,
          args$2$0 = arguments;

      return _regeneratorRuntime.async(function createSession$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.prev = 0;

            for (_len = args$2$0.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = args$2$0[_key];
            }

            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(_get(Object.getPrototypeOf(AndroidDriver.prototype), 'createSession', this).apply(this, args));

          case 4:
            _ref = context$2$0.sent;
            _ref2 = _slicedToArray(_ref, 2);
            sessionId = _ref2[0];
            caps = _ref2[1];
            serverDetails = { platform: 'LINUX',
              webStorageEnabled: false,
              takesScreenshot: true,
              javascriptEnabled: true,
              databaseEnabled: false,
              networkConnectionEnabled: true,
              locationContextEnabled: false,
              warnings: {},
              desired: this.caps };

            this.caps = _Object$assign(serverDetails, this.caps);

            // assigning defaults
            context$2$0.next = 12;
            return _regeneratorRuntime.awrap(_appiumSupport.tempDir.staticDir());

          case 12:
            context$2$0.t0 = context$2$0.sent;
            context$2$0.t1 = _appiumAdb.DEFAULT_ADB_PORT;
            defaultOpts = {
              action: "android.intent.action.MAIN",
              category: "android.intent.category.LAUNCHER",
              flags: "0x10200000",
              disableAndroidWatchers: false,
              tmpDir: context$2$0.t0,
              fullReset: false,
              autoLaunch: true,
              adbPort: context$2$0.t1,
              androidInstallTimeout: 90000
            };

            _lodash2['default'].defaults(this.opts, defaultOpts);

            if (this.opts.javaVersion) {
              context$2$0.next = 20;
              break;
            }

            context$2$0.next = 19;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].getJavaVersion());

          case 19:
            this.opts.javaVersion = context$2$0.sent;

          case 20:
            this.useUnlockHelperApp = _lodash2['default'].isUndefined(this.caps.unlockType);

            // not user visible via caps
            if (this.opts.noReset === true) {
              this.opts.fullReset = false;
            }
            if (this.opts.fullReset === true) {
              this.opts.noReset = false;
            }
            this.opts.fastReset = !this.opts.fullReset && !this.opts.noReset;
            this.opts.skipUninstall = this.opts.fastReset || this.opts.noReset;

            this.curContext = this.defaultContextName();

            if (this.isChromeSession) {
              _logger2['default'].info("We're going to run a Chrome-based session");
              _helpers$getChromePkg = _androidHelpers2['default'].getChromePkg(this.opts.browserName);
              pkg = _helpers$getChromePkg.pkg;
              activity = _helpers$getChromePkg.activity;

              this.opts.appPackage = pkg;
              this.opts.appActivity = activity;
              _logger2['default'].info('Chrome-type package and activity are ' + pkg + ' and ' + activity);
            }

            if (this.opts.nativeWebScreenshot) {
              this.jwpProxyAvoid.push(['GET', new RegExp('^/session/[^/]+/screenshot')]);
            }

            if (this.opts.reboot) {
              this.setAvdFromCapabilities(caps);
              this.addWipeDataToAvdArgs();
            }context$2$0.next = 31;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].getDeviceInfoFromCaps(this.opts));

          case 31:
            _ref3 = context$2$0.sent;
            udid = _ref3.udid;
            emPort = _ref3.emPort;

            this.opts.udid = udid;
            this.opts.emPort = emPort;

            // set up an instance of ADB
            context$2$0.next = 38;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].createADB(this.opts.javaVersion, this.opts.udid, this.opts.emPort, this.opts.adbPort, this.opts.suppressKillServer, this.opts.remoteAdbHost, this.opts.clearDeviceLogsOnStart));

          case 38:
            this.adb = context$2$0.sent;

            if (this.helpers.isPackageOrBundle(this.opts.app)) {
              // user provided package instead of app for 'app' capability, massage options
              this.opts.appPackage = this.opts.app;
              this.opts.app = null;
            }

            if (!this.opts.app) {
              context$2$0.next = 49;
              break;
            }

            context$2$0.next = 43;
            return _regeneratorRuntime.awrap(this.helpers.configureApp(this.opts.app, APP_EXTENSION));

          case 43:
            this.opts.app = context$2$0.sent;

            this.opts.appIsTemp = caps.app !== this.opts.app; // did we make a temporary copy?
            context$2$0.next = 47;
            return _regeneratorRuntime.awrap(this.checkAppPresent());

          case 47:
            context$2$0.next = 53;
            break;

          case 49:
            if (!this.appOnDevice) {
              context$2$0.next = 53;
              break;
            }

            // the app isn't an actual app file but rather something we want to
            // assume is on the device and just launch via the appPackage
            _logger2['default'].info('App file was not listed, instead we\'re going to run ' + (this.opts.appPackage + ' directly on the device'));
            context$2$0.next = 53;
            return _regeneratorRuntime.awrap(this.checkPackagePresent());

          case 53:
            if (!_appiumSupport.util.hasValue(this.opts.networkSpeed)) {
              context$2$0.next = 61;
              break;
            }

            if (this.isEmulator()) {
              context$2$0.next = 58;
              break;
            }

            _logger2['default'].warn("Sorry, networkSpeed capability is only available for emulators");
            context$2$0.next = 61;
            break;

          case 58:
            networkSpeed = _androidHelpers2['default'].ensureNetworkSpeed(this.adb, this.opts.networkSpeed);
            context$2$0.next = 61;
            return _regeneratorRuntime.awrap(this.adb.networkSpeed(networkSpeed));

          case 61:
            if (!_appiumSupport.util.hasValue(this.opts.gpsEnabled)) {
              context$2$0.next = 69;
              break;
            }

            if (!this.isEmulator()) {
              context$2$0.next = 68;
              break;
            }

            _logger2['default'].info('Trying to ' + (this.opts.gpsEnabled ? "enable" : "disable") + ' gps location provider');
            context$2$0.next = 66;
            return _regeneratorRuntime.awrap(this.adb.toggleGPSLocationProvider(this.opts.gpsEnabled));

          case 66:
            context$2$0.next = 69;
            break;

          case 68:
            _logger2['default'].warn('Sorry! gpsEnabled capability is only available for emulators');

          case 69:
            context$2$0.next = 71;
            return _regeneratorRuntime.awrap(this.startAndroidSession(this.opts));

          case 71:
            return context$2$0.abrupt('return', [sessionId, this.caps]);

          case 74:
            context$2$0.prev = 74;
            context$2$0.t2 = context$2$0['catch'](0);
            context$2$0.prev = 76;
            context$2$0.next = 79;
            return _regeneratorRuntime.awrap(this.deleteSession());

          case 79:
            context$2$0.next = 83;
            break;

          case 81:
            context$2$0.prev = 81;
            context$2$0.t3 = context$2$0['catch'](76);

          case 83:
            throw context$2$0.t2;

          case 84:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[0, 74], [76, 81]]);
    }
  }, {
    key: 'isEmulator',
    value: function isEmulator() {
      return !!(this.opts.avd || /emulator/.test(this.opts.udid));
    }
  }, {
    key: 'setAvdFromCapabilities',
    value: function setAvdFromCapabilities(caps) {
      if (this.opts.avd) {
        _logger2['default'].info('avd name defined, ignoring device name and platform version');
      } else {
        if (!caps.deviceName) {
          _logger2['default'].errorAndThrow('avd or deviceName should be specified when reboot option is enables');
        }
        if (!caps.platformVersion) {
          _logger2['default'].errorAndThrow('avd or platformVersion should be specified when reboot option is enabled');
        }
        var avdDevice = caps.deviceName.replace(/[^a-zA-Z0-9_.]/g, "-");
        this.opts.avd = avdDevice + '__' + caps.platformVersion;
      }
    }
  }, {
    key: 'addWipeDataToAvdArgs',
    value: function addWipeDataToAvdArgs() {
      if (!this.opts.avdArgs) {
        this.opts.avdArgs = '-wipe-data';
      } else if (this.opts.avdArgs.toLowerCase().indexOf("-wipe-data") === -1) {
        this.opts.avdArgs += ' -wipe-data';
      }
    }
  }, {
    key: 'onSettingsUpdate',
    value: function onSettingsUpdate(key, value) {
      return _regeneratorRuntime.async(function onSettingsUpdate$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!(key === "ignoreUnimportantViews")) {
              context$2$0.next = 3;
              break;
            }

            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.setCompressedLayoutHierarchy(value));

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'startAndroidSession',
    value: function startAndroidSession() {
      return _regeneratorRuntime.async(function startAndroidSession$(context$2$0) {
        var _this = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].info('Starting Android session');
            // set up the device to run on (real or emulator, etc)
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].initDevice(this.adb, this.opts));

          case 3:
            this.defaultIME = context$2$0.sent;

            // set actual device name, udid, platform version, screen size, model and manufacturer details
            this.caps.deviceName = this.adb.curDeviceId;
            this.caps.deviceUDID = this.opts.udid;
            context$2$0.next = 8;
            return _regeneratorRuntime.awrap(this.adb.getPlatformVersion());

          case 8:
            this.caps.platformVersion = context$2$0.sent;
            context$2$0.next = 11;
            return _regeneratorRuntime.awrap(this.adb.getScreenSize());

          case 11:
            this.caps.deviceScreenSize = context$2$0.sent;
            context$2$0.next = 14;
            return _regeneratorRuntime.awrap(this.adb.getModel());

          case 14:
            this.caps.deviceModel = context$2$0.sent;
            context$2$0.next = 17;
            return _regeneratorRuntime.awrap(this.adb.getManufacturer());

          case 17:
            this.caps.deviceManufacturer = context$2$0.sent;

            if (!this.opts.autoLaunch) {
              context$2$0.next = 21;
              break;
            }

            context$2$0.next = 21;
            return _regeneratorRuntime.awrap(this.initAUT());

          case 21:
            // start UiAutomator
            this.bootstrap = new _androidHelpers2['default'].bootstrap(this.adb, this.bootstrapPort, this.opts.websocket);
            context$2$0.next = 24;
            return _regeneratorRuntime.awrap(this.bootstrap.start(this.opts.appPackage, this.opts.disableAndroidWatchers, this.opts.acceptSslCerts));

          case 24:
            // handling unexpected shutdown
            this.bootstrap.onUnexpectedShutdown['catch'](function callee$2$0(err) {
              return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                  case 0:
                    if (this.bootstrap.ignoreUnexpectedShutdown) {
                      context$3$0.next = 3;
                      break;
                    }

                    context$3$0.next = 3;
                    return _regeneratorRuntime.awrap(this.startUnexpectedShutdown(err));

                  case 3:
                  case 'end':
                    return context$3$0.stop();
                }
              }, null, _this);
            });

            if (this.opts.skipUnlock) {
              context$2$0.next = 28;
              break;
            }

            context$2$0.next = 28;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].unlock(this, this.adb, this.caps));

          case 28:
            if (!this.opts.ignoreUnimportantViews) {
              context$2$0.next = 31;
              break;
            }

            context$2$0.next = 31;
            return _regeneratorRuntime.awrap(this.settings.update({ ignoreUnimportantViews: this.opts.ignoreUnimportantViews }));

          case 31:
            if (!this.isChromeSession) {
              context$2$0.next = 39;
              break;
            }

            context$2$0.next = 34;
            return _regeneratorRuntime.awrap(this.startChromeSession());

          case 34:
            if (!this.shouldDismissChromeWelcome()) {
              context$2$0.next = 37;
              break;
            }

            context$2$0.next = 37;
            return _regeneratorRuntime.awrap(this.dismissChromeWelcome());

          case 37:
            context$2$0.next = 42;
            break;

          case 39:
            if (!this.opts.autoLaunch) {
              context$2$0.next = 42;
              break;
            }

            context$2$0.next = 42;
            return _regeneratorRuntime.awrap(this.startAUT());

          case 42:
            if (!_appiumSupport.util.hasValue(this.opts.orientation)) {
              context$2$0.next = 46;
              break;
            }

            _logger2['default'].debug('Setting initial orientation to \'' + this.opts.orientation + '\'');
            context$2$0.next = 46;
            return _regeneratorRuntime.awrap(this.setOrientation(this.opts.orientation));

          case 46:
            context$2$0.next = 48;
            return _regeneratorRuntime.awrap(this.initAutoWebview());

          case 48:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'shouldDismissChromeWelcome',
    value: function shouldDismissChromeWelcome() {
      return !_lodash2['default'].isUndefined(this.opts.chromeOptions) && _lodash2['default'].isArray(this.opts.chromeOptions.args) && this.opts.chromeOptions.args.indexOf('--no-first-run') !== -1;
    }
  }, {
    key: 'dismissChromeWelcome',
    value: function dismissChromeWelcome() {
      var activity, el, _el;

      return _regeneratorRuntime.async(function dismissChromeWelcome$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].info("Trying to dismiss Chrome welcome");
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.getCurrentActivity());

          case 3:
            activity = context$2$0.sent;

            if (!(activity !== "org.chromium.chrome.browser.firstrun.FirstRunActivity")) {
              context$2$0.next = 7;
              break;
            }

            _logger2['default'].info("Chrome welcome dialog never showed up! Continuing");
            return context$2$0.abrupt('return');

          case 7:
            context$2$0.next = 9;
            return _regeneratorRuntime.awrap(this.findElOrEls('id', 'com.android.chrome:id/terms_accept', false));

          case 9:
            el = context$2$0.sent;
            context$2$0.next = 12;
            return _regeneratorRuntime.awrap(this.click(el.ELEMENT));

          case 12:
            context$2$0.prev = 12;
            context$2$0.next = 15;
            return _regeneratorRuntime.awrap(this.findElOrEls('id', 'com.android.chrome:id/negative_button', false));

          case 15:
            _el = context$2$0.sent;
            context$2$0.next = 18;
            return _regeneratorRuntime.awrap(this.click(_el.ELEMENT));

          case 18:
            context$2$0.next = 23;
            break;

          case 20:
            context$2$0.prev = 20;
            context$2$0.t0 = context$2$0['catch'](12);

            // DO NOTHING, THIS DEVICE DIDNT LAUNCH THE SIGNIN DIALOG
            // IT MUST BE A NON GMS DEVICE
            _logger2['default'].warn('This device didnt show Chrome SignIn dialog, ' + context$2$0.t0.message);

          case 23:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[12, 20]]);
    }
  }, {
    key: 'initAutoWebview',
    value: function initAutoWebview() {
      return _regeneratorRuntime.async(function initAutoWebview$(context$2$0) {
        var _this3 = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!this.opts.autoWebview) {
              context$2$0.next = 3;
              break;
            }

            context$2$0.next = 3;
            return _regeneratorRuntime.awrap((function callee$2$0() {
              var viewName, timeout;
              return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                var _this2 = this;

                while (1) switch (context$3$0.prev = context$3$0.next) {
                  case 0:
                    viewName = this.defaultWebviewName();
                    timeout = this.opts.autoWebviewTimeout || 2000;

                    _logger2['default'].info('Setting auto webview to context \'' + viewName + '\' with timeout ' + timeout + 'ms');

                    // try every 500ms until timeout is over
                    context$3$0.next = 5;
                    return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(timeout / 500, 500, function callee$3$0() {
                      return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                        while (1) switch (context$4$0.prev = context$4$0.next) {
                          case 0:
                            context$4$0.next = 2;
                            return _regeneratorRuntime.awrap(this.setContext(viewName));

                          case 2:
                          case 'end':
                            return context$4$0.stop();
                        }
                      }, null, _this2);
                    }));

                  case 5:
                  case 'end':
                    return context$3$0.stop();
                }
              }, null, _this3);
            })());

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'initAUT',
    value: function initAUT() {
      var launchInfo;
      return _regeneratorRuntime.async(function initAUT$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].getLaunchInfo(this.adb, this.opts));

          case 2:
            launchInfo = context$2$0.sent;

            _Object$assign(this.opts, launchInfo);
            _Object$assign(this.caps, launchInfo);
            // install app

            if (this.opts.app) {
              context$2$0.next = 14;
              break;
            }

            if (this.opts.fullReset) {
              _logger2['default'].errorAndThrow('Full reset requires an app capability, use fastReset if app is not provided');
            }
            _logger2['default'].debug('No app capability. Assuming it is already on the device');

            if (!this.opts.fastReset) {
              context$2$0.next = 11;
              break;
            }

            context$2$0.next = 11;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].resetApp(this.adb, this.opts.app, this.opts.appPackage, this.opts.fastReset));

          case 11:
            context$2$0.next = 13;
            return _regeneratorRuntime.awrap(this.grantPermissions());

          case 13:
            return context$2$0.abrupt('return');

          case 14:
            if (this.opts.skipUninstall) {
              context$2$0.next = 17;
              break;
            }

            context$2$0.next = 17;
            return _regeneratorRuntime.awrap(this.adb.uninstallApk(this.opts.appPackage));

          case 17:
            context$2$0.next = 19;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].installApkRemotely(this.adb, this.opts));

          case 19:
            context$2$0.next = 21;
            return _regeneratorRuntime.awrap(this.grantPermissions());

          case 21:
            context$2$0.next = 23;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].pushStrings(this.opts.language, this.adb, this.opts));

          case 23:
            this.apkStrings[this.opts.language] = context$2$0.sent;

            if (_lodash2['default'].isUndefined(this.opts.sharedPreferences)) {
              context$2$0.next = 27;
              break;
            }

            context$2$0.next = 27;
            return _regeneratorRuntime.awrap(this.setSharedPreferences(this.opts));

          case 27:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'startChromeSession',
    value: function startChromeSession() {
      var opts, knownPackages;
      return _regeneratorRuntime.async(function startChromeSession$(context$2$0) {
        var _this4 = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].info("Starting a chrome-based browser session");
            opts = _lodash2['default'].cloneDeep(this.opts);

            opts.chromeUseRunningApp = false;

            knownPackages = ["org.chromium.chrome.shell", "com.android.chrome", "com.chrome.beta", "org.chromium.chrome", "org.chromium.webview_shell"];

            if (!_lodash2['default'].includes(knownPackages, this.opts.appPackage)) {
              opts.chromeAndroidActivity = this.opts.appActivity;
            }
            context$2$0.next = 7;
            return _regeneratorRuntime.awrap((0, _commandsContext.setupNewChromedriver)(opts, this.adb.curDeviceId, this.adb));

          case 7:
            this.chromedriver = context$2$0.sent;

            this.chromedriver.on(_appiumChromedriver2['default'].EVENT_CHANGED, function (msg) {
              if (msg.state === _appiumChromedriver2['default'].STATE_STOPPED) {
                _this4.onChromedriverStop(_webviewHelpers.CHROMIUM_WIN);
              }
            });

            // Now that we have a Chrome session, we ensure that the context is
            // appropriately set and that this chromedriver is added to the list
            // of session chromedrivers so we can switch back and forth
            this.curContext = _webviewHelpers.CHROMIUM_WIN;
            this.sessionChromedrivers[_webviewHelpers.CHROMIUM_WIN] = this.chromedriver;
            this.proxyReqRes = this.chromedriver.proxyReq.bind(this.chromedriver);
            this.jwpProxyActive = true;

          case 13:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'checkAppPresent',
    value: function checkAppPresent() {
      return _regeneratorRuntime.async(function checkAppPresent$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].debug("Checking whether app is actually present");
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(this.opts.app));

          case 3:
            if (context$2$0.sent) {
              context$2$0.next = 5;
              break;
            }

            _logger2['default'].errorAndThrow('Could not find app apk at ' + this.opts.app);

          case 5:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'checkPackagePresent',
    value: function checkPackagePresent() {
      return _regeneratorRuntime.async(function checkPackagePresent$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].debug("Checking whether package is present on the device");
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.adb.shell(['pm', 'list', 'packages', this.opts.appPackage]));

          case 3:
            if (context$2$0.sent) {
              context$2$0.next = 5;
              break;
            }

            _logger2['default'].errorAndThrow('Could not find package ' + this.opts.appPackage + ' on the device');

          case 5:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'grantPermissions',
    value: function grantPermissions() {
      return _regeneratorRuntime.async(function grantPermissions$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!this.opts.autoGrantPermissions) {
              context$2$0.next = 9;
              break;
            }

            context$2$0.prev = 1;
            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(this.adb.grantAllPermissions(this.opts.appPackage, this.opts.app));

          case 4:
            context$2$0.next = 9;
            break;

          case 6:
            context$2$0.prev = 6;
            context$2$0.t0 = context$2$0['catch'](1);

            _logger2['default'].error('Unable to grant permissions requested. Original error: ' + context$2$0.t0.message);

          case 9:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[1, 6]]);
    }

    // Set CompressedLayoutHierarchy on the device
  }, {
    key: 'setCompressedLayoutHierarchy',
    value: function setCompressedLayoutHierarchy(compress) {
      return _regeneratorRuntime.async(function setCompressedLayoutHierarchy$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(this.bootstrap.sendAction("compressedLayoutHierarchy", { compressLayout: compress }));

          case 2:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'deleteSession',
    value: function deleteSession() {
      var avdName;
      return _regeneratorRuntime.async(function deleteSession$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].debug("Shutting down Android driver");
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(_get(Object.getPrototypeOf(AndroidDriver.prototype), 'deleteSession', this).call(this));

          case 3:
            if (!this.bootstrap) {
              context$2$0.next = 23;
              break;
            }

            context$2$0.next = 6;
            return _regeneratorRuntime.awrap(this.stopChromedriverProxies());

          case 6:
            if (!(this.opts.unicodeKeyboard && this.opts.resetKeyboard && this.defaultIME)) {
              context$2$0.next = 10;
              break;
            }

            _logger2['default'].debug('Resetting IME to ' + this.defaultIME);
            context$2$0.next = 10;
            return _regeneratorRuntime.awrap(this.adb.setIME(this.defaultIME));

          case 10:
            if (this.isChromeSession) {
              context$2$0.next = 13;
              break;
            }

            context$2$0.next = 13;
            return _regeneratorRuntime.awrap(this.adb.forceStop(this.opts.appPackage));

          case 13:
            context$2$0.next = 15;
            return _regeneratorRuntime.awrap(this.adb.goToHome());

          case 15:
            if (!(this.opts.fullReset && !this.opts.skipUninstall && !this.appOnDevice)) {
              context$2$0.next = 18;
              break;
            }

            context$2$0.next = 18;
            return _regeneratorRuntime.awrap(this.adb.uninstallApk(this.opts.appPackage));

          case 18:
            context$2$0.next = 20;
            return _regeneratorRuntime.awrap(this.bootstrap.shutdown());

          case 20:
            this.bootstrap = null;
            context$2$0.next = 24;
            break;

          case 23:
            _logger2['default'].debug("Called deleteSession but bootstrap wasn't active");

          case 24:
            context$2$0.next = 26;
            return _regeneratorRuntime.awrap(this.adb.stopLogcat());

          case 26:
            if (!this.useUnlockHelperApp) {
              context$2$0.next = 29;
              break;
            }

            context$2$0.next = 29;
            return _regeneratorRuntime.awrap(this.adb.forceStop('io.appium.unlock'));

          case 29:
            if (!this.opts.reboot) {
              context$2$0.next = 34;
              break;
            }

            avdName = this.opts.avd.replace('@', '');

            _logger2['default'].debug('closing emulator \'' + avdName + '\'');
            context$2$0.next = 34;
            return _regeneratorRuntime.awrap(this.adb.killEmulator(avdName));

          case 34:
            if (!this.opts.clearSystemFiles) {
              context$2$0.next = 50;
              break;
            }

            if (!this.opts.appIsTemp) {
              context$2$0.next = 47;
              break;
            }

            _logger2['default'].debug('Temporary copy of app was made: deleting \'' + this.opts.app + '\'');
            context$2$0.prev = 37;
            context$2$0.next = 40;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.rimraf(this.opts.app));

          case 40:
            context$2$0.next = 45;
            break;

          case 42:
            context$2$0.prev = 42;
            context$2$0.t0 = context$2$0['catch'](37);

            _logger2['default'].warn('Unable to delete temporary app: ' + context$2$0.t0.message);

          case 45:
            context$2$0.next = 48;
            break;

          case 47:
            _logger2['default'].debug('App was not copied, so not deleting');

          case 48:
            context$2$0.next = 51;
            break;

          case 50:
            _logger2['default'].debug('Not cleaning generated files. Add `clearSystemFiles` capability if wanted.');

          case 51:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[37, 42]]);
    }
  }, {
    key: 'setSharedPreferences',
    value: function setSharedPreferences() {
      var sharedPrefs, name, remotePath, remoteFile, localPath, builder;
      return _regeneratorRuntime.async(function setSharedPreferences$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            sharedPrefs = this.opts.sharedPreferences;

            _logger2['default'].info("Trying to set shared preferences");
            name = sharedPrefs.name;

            if (!_lodash2['default'].isUndefined(name)) {
              context$2$0.next = 6;
              break;
            }

            _logger2['default'].warn('Skipping setting Shared preferences, name is undefined: ' + JSON.stringify(sharedPrefs));
            return context$2$0.abrupt('return', false);

          case 6:
            remotePath = '/data/data/' + this.opts.appPackage + '/shared_prefs';
            remoteFile = remotePath + '/' + name + '.xml';
            localPath = '/tmp/' + name + '.xml';
            builder = this.getPrefsBuilder();

            builder.build(sharedPrefs.prefs);
            _logger2['default'].info('Creating temporary shared preferences: ' + localPath);
            builder.toFile(localPath);
            _logger2['default'].info('Creating shared_prefs remote folder: ' + remotePath);
            context$2$0.next = 16;
            return _regeneratorRuntime.awrap(this.adb.shell(['mkdir', '-p', remotePath]));

          case 16:
            _logger2['default'].info('Pushing shared_prefs to ' + remoteFile);
            context$2$0.next = 19;
            return _regeneratorRuntime.awrap(this.adb.push(localPath, remoteFile));

          case 19:
            context$2$0.prev = 19;

            _logger2['default'].info('Trying to remove shared preferences temporary file');
            context$2$0.next = 23;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(localPath));

          case 23:
            if (!context$2$0.sent) {
              context$2$0.next = 26;
              break;
            }

            context$2$0.next = 26;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.unlink(localPath));

          case 26:
            context$2$0.next = 31;
            break;

          case 28:
            context$2$0.prev = 28;
            context$2$0.t0 = context$2$0['catch'](19);

            _logger2['default'].warn('Error trying to remove temporary file ' + localPath);

          case 31:
            return context$2$0.abrupt('return', true);

          case 32:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[19, 28]]);
    }
  }, {
    key: 'getPrefsBuilder',
    value: function getPrefsBuilder() {
      /* Add this method to create a new SharedPrefsBuilder instead of
       * directly creating the object on setSharedPreferences for testing purposes
      */
      return new _sharedPreferencesBuilder.SharedPrefsBuilder();
    }
  }, {
    key: 'validateDesiredCaps',
    value: function validateDesiredCaps(caps) {
      // check with the base class, and return if it fails
      var res = _get(Object.getPrototypeOf(AndroidDriver.prototype), 'validateDesiredCaps', this).call(this, caps);
      if (!res) return res; // eslint-disable-line curly

      // make sure that the capabilities have one of `app`, `appPackage` or `browser`
      if ((!caps.browserName || !_androidHelpers2['default'].isChromeBrowser(caps.browserName)) && !caps.app && !caps.appPackage) {
        var msg = 'The desired capabilities must include either an app, appPackage or browserName';
        _logger2['default'].errorAndThrow(msg);
      }
      // warn if the capabilities have both `app` and `browser, although this
      // is common with selenium grid
      if (caps.browserName && caps.app) {
        var msg = 'The desired capabilities should generally not include both an app and a browserName';
        _logger2['default'].warn(msg);
      }
    }
  }, {
    key: 'proxyActive',
    value: function proxyActive(sessionId) {
      _get(Object.getPrototypeOf(AndroidDriver.prototype), 'proxyActive', this).call(this, sessionId);

      return this.jwpProxyActive;
    }
  }, {
    key: 'getProxyAvoidList',
    value: function getProxyAvoidList(sessionId) {
      _get(Object.getPrototypeOf(AndroidDriver.prototype), 'getProxyAvoidList', this).call(this, sessionId);

      return this.jwpProxyAvoid;
    }
  }, {
    key: 'canProxy',
    value: function canProxy(sessionId) {
      _get(Object.getPrototypeOf(AndroidDriver.prototype), 'canProxy', this).call(this, sessionId);

      // this will change depending on ChromeDriver status
      return _lodash2['default'].isFunction(this.proxyReqRes);
    }
  }, {
    key: 'appOnDevice',
    get: function get() {
      return this.helpers.isPackageOrBundle(this.opts.app) || !this.opts.app && this.helpers.isPackageOrBundle(this.opts.appPackage);
    }
  }, {
    key: 'isChromeSession',
    get: function get() {
      return _androidHelpers2['default'].isChromeBrowser(this.opts.browserName);
    }
  }]);

  return AndroidDriver;
})(_appiumBaseDriver.BaseDriver);

exports['default'] = AndroidDriver;
module.exports = exports['default'];

// the whole createSession flow is surrounded in a try-catch statement
// if creating a session fails at any point, we teardown everything we
// set up before throwing the error.

// find and copy, or download and unzip an app url or path

// Some cloud services using appium launch the avd themselves, so we ensure netspeed
// is set for emulators by calling adb.networkSpeed before running the app

// check if we have to enable/disable gps before running the application

// ignoring delete session exception if any and throw the real error
// that happened while creating the session.

// If the user sets autoLaunch to false, they are responsible for initAUT() and startAUT()

// set up app under test
// eslint-disable-line promise/prefer-await-to-callbacks

// Let's try to unlock the device

// Set CompressedLayoutHierarchy on the device based on current settings object
// this has to happen _after_ bootstrap is initialized

// start a chromedriver session and proxy to it

// dismiss Chrome welcome dialog

// start app

// populate appPackage, appActivity, appWaitPackage, appWaitActivity,
// and the device being used
// in the opts and caps (so it gets back to the user on session creation)

// This must run after installing the apk, otherwise it would cause the
// install to fail. And before running the app.

// certain cleanup we only care to do if the bootstrap was ever run

// some cleanup we want to do regardless, in case we are shutting down
// mid-startup
//# sourceMappingURL=data:application/json;charset=utf8;base64,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LDRCQUFRLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ3ZEOzs7U0FoTUcsYUFBYTs7O3FCQXNnQkosYUFBYSIsImZpbGUiOiJsaWIvZHJpdmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZURyaXZlciwgRGV2aWNlU2V0dGluZ3MgfSBmcm9tICdhcHBpdW0tYmFzZS1kcml2ZXInO1xyXG5pbXBvcnQgQ2hyb21lZHJpdmVyIGZyb20gJ2FwcGl1bS1jaHJvbWVkcml2ZXInO1xyXG5pbXBvcnQgZGVzaXJlZENvbnN0cmFpbnRzIGZyb20gJy4vZGVzaXJlZC1jYXBzJztcclxuaW1wb3J0IGNvbW1hbmRzIGZyb20gJy4vY29tbWFuZHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBzZXR1cE5ld0Nocm9tZWRyaXZlciB9IGZyb20gJy4vY29tbWFuZHMvY29udGV4dCc7XHJcbmltcG9ydCBoZWxwZXJzIGZyb20gJy4vYW5kcm9pZC1oZWxwZXJzJztcclxuaW1wb3J0IHsgQ0hST01JVU1fV0lOIH0gZnJvbSAnLi93ZWJ2aWV3LWhlbHBlcnMnO1xyXG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgREVGQVVMVF9BREJfUE9SVCB9IGZyb20gJ2FwcGl1bS1hZGInO1xyXG5pbXBvcnQgeyBmcywgdGVtcERpciwgdXRpbCB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcclxuaW1wb3J0IHsgcmV0cnlJbnRlcnZhbCB9IGZyb20gJ2FzeW5jYm94JztcclxuaW1wb3J0IHsgU2hhcmVkUHJlZnNCdWlsZGVyIH0gZnJvbSAnc2hhcmVkLXByZWZlcmVuY2VzLWJ1aWxkZXInO1xyXG5cclxuY29uc3QgQVBQX0VYVEVOU0lPTiA9ICcuYXBrJztcclxuY29uc3QgREVWSUNFX1BPUlQgPSA0NzI0O1xyXG5cclxuLy8gVGhpcyBpcyBhIHNldCBvZiBtZXRob2RzIGFuZCBwYXRocyB0aGF0IHdlIG5ldmVyIHdhbnQgdG8gcHJveHkgdG9cclxuLy8gQ2hyb21lZHJpdmVyXHJcbmNvbnN0IE5PX1BST1hZID0gW1xyXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9jb250ZXh0JyldLFxyXG4gIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2NvbnRleHQnKV0sXHJcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bScpXSxcclxuICBbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9hcHBpdW0nKV0sXHJcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL3RvdWNoL3BlcmZvcm0nKV0sXHJcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL3RvdWNoL211bHRpL3BlcmZvcm0nKV0sXHJcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL29yaWVudGF0aW9uJyldLFxyXG4gIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL29yaWVudGF0aW9uJyldLFxyXG5dO1xyXG5cclxuY2xhc3MgQW5kcm9pZERyaXZlciBleHRlbmRzIEJhc2VEcml2ZXIge1xyXG4gIGNvbnN0cnVjdG9yIChvcHRzID0ge30sIHNob3VsZFZhbGlkYXRlQ2FwcyA9IHRydWUpIHtcclxuICAgIHN1cGVyKG9wdHMsIHNob3VsZFZhbGlkYXRlQ2Fwcyk7XHJcblxyXG4gICAgdGhpcy5sb2NhdG9yU3RyYXRlZ2llcyA9IFtcclxuICAgICAgJ3hwYXRoJyxcclxuICAgICAgJ2lkJyxcclxuICAgICAgJ2NsYXNzIG5hbWUnLFxyXG4gICAgICAnYWNjZXNzaWJpbGl0eSBpZCcsXHJcbiAgICAgICctYW5kcm9pZCB1aWF1dG9tYXRvcidcclxuICAgIF07XHJcbiAgICB0aGlzLmRlc2lyZWRDYXBDb25zdHJhaW50cyA9IGRlc2lyZWRDb25zdHJhaW50cztcclxuICAgIHRoaXMuc2Vzc2lvbkNocm9tZWRyaXZlcnMgPSB7fTtcclxuICAgIHRoaXMuandwUHJveHlBY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuandwUHJveHlBdm9pZCA9IF8uY2xvbmUoTk9fUFJPWFkpO1xyXG4gICAgdGhpcy5zZXR0aW5ncyA9IG5ldyBEZXZpY2VTZXR0aW5ncyh7aWdub3JlVW5pbXBvcnRhbnRWaWV3czogZmFsc2V9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU2V0dGluZ3NVcGRhdGUuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLmNocm9tZWRyaXZlciA9IG51bGw7XHJcbiAgICB0aGlzLmFwa1N0cmluZ3MgPSB7fTtcclxuICAgIHRoaXMuYm9vdHN0cmFwUG9ydCA9IG9wdHMuYm9vdHN0cmFwUG9ydCB8fCBERVZJQ0VfUE9SVDtcclxuICAgIHRoaXMudW5sb2NrZXIgPSBoZWxwZXJzLnVubG9ja2VyO1xyXG5cclxuICAgIGZvciAobGV0IFtjbWQsIGZuXSBvZiBfLnRvUGFpcnMoY29tbWFuZHMpKSB7XHJcbiAgICAgIEFuZHJvaWREcml2ZXIucHJvdG90eXBlW2NtZF0gPSBmbjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGNyZWF0ZVNlc3Npb24gKC4uLmFyZ3MpIHtcclxuICAgIC8vIHRoZSB3aG9sZSBjcmVhdGVTZXNzaW9uIGZsb3cgaXMgc3Vycm91bmRlZCBpbiBhIHRyeS1jYXRjaCBzdGF0ZW1lbnRcclxuICAgIC8vIGlmIGNyZWF0aW5nIGEgc2Vzc2lvbiBmYWlscyBhdCBhbnkgcG9pbnQsIHdlIHRlYXJkb3duIGV2ZXJ5dGhpbmcgd2VcclxuICAgIC8vIHNldCB1cCBiZWZvcmUgdGhyb3dpbmcgdGhlIGVycm9yLlxyXG4gICAgdHJ5IHtcclxuICAgICAgbGV0IFtzZXNzaW9uSWQsIGNhcHNdID0gYXdhaXQgc3VwZXIuY3JlYXRlU2Vzc2lvbiguLi5hcmdzKTtcclxuXHJcbiAgICAgIGxldCBzZXJ2ZXJEZXRhaWxzID0ge3BsYXRmb3JtOiAnTElOVVgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWJTdG9yYWdlRW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRha2VzU2NyZWVuc2hvdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFiYXNlRW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmtDb25uZWN0aW9uRW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb25Db250ZXh0RW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhcm5pbmdzOiB7fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzaXJlZDogdGhpcy5jYXBzfTtcclxuXHJcbiAgICAgIHRoaXMuY2FwcyA9IE9iamVjdC5hc3NpZ24oc2VydmVyRGV0YWlscywgdGhpcy5jYXBzKTtcclxuXHJcbiAgICAgIC8vIGFzc2lnbmluZyBkZWZhdWx0c1xyXG4gICAgICBsZXQgZGVmYXVsdE9wdHMgPSB7XHJcbiAgICAgICAgYWN0aW9uOiBcImFuZHJvaWQuaW50ZW50LmFjdGlvbi5NQUlOXCIsXHJcbiAgICAgICAgY2F0ZWdvcnk6IFwiYW5kcm9pZC5pbnRlbnQuY2F0ZWdvcnkuTEFVTkNIRVJcIixcclxuICAgICAgICBmbGFnczogXCIweDEwMjAwMDAwXCIsXHJcbiAgICAgICAgZGlzYWJsZUFuZHJvaWRXYXRjaGVyczogZmFsc2UsXHJcbiAgICAgICAgdG1wRGlyOiBhd2FpdCB0ZW1wRGlyLnN0YXRpY0RpcigpLFxyXG4gICAgICAgIGZ1bGxSZXNldDogZmFsc2UsXHJcbiAgICAgICAgYXV0b0xhdW5jaDogdHJ1ZSxcclxuICAgICAgICBhZGJQb3J0OiBERUZBVUxUX0FEQl9QT1JULFxyXG4gICAgICAgIGFuZHJvaWRJbnN0YWxsVGltZW91dDogOTAwMDBcclxuICAgICAgfTtcclxuICAgICAgXy5kZWZhdWx0cyh0aGlzLm9wdHMsIGRlZmF1bHRPcHRzKTtcclxuICAgICAgaWYgKCF0aGlzLm9wdHMuamF2YVZlcnNpb24pIHtcclxuICAgICAgICB0aGlzLm9wdHMuamF2YVZlcnNpb24gPSBhd2FpdCBoZWxwZXJzLmdldEphdmFWZXJzaW9uKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy51c2VVbmxvY2tIZWxwZXJBcHAgPSBfLmlzVW5kZWZpbmVkKHRoaXMuY2Fwcy51bmxvY2tUeXBlKTtcclxuXHJcbiAgICAgIC8vIG5vdCB1c2VyIHZpc2libGUgdmlhIGNhcHNcclxuICAgICAgaWYgKHRoaXMub3B0cy5ub1Jlc2V0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5vcHRzLmZ1bGxSZXNldCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLm9wdHMuZnVsbFJlc2V0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5vcHRzLm5vUmVzZXQgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm9wdHMuZmFzdFJlc2V0ID0gIXRoaXMub3B0cy5mdWxsUmVzZXQgJiYgIXRoaXMub3B0cy5ub1Jlc2V0O1xyXG4gICAgICB0aGlzLm9wdHMuc2tpcFVuaW5zdGFsbCA9IHRoaXMub3B0cy5mYXN0UmVzZXQgfHwgdGhpcy5vcHRzLm5vUmVzZXQ7XHJcblxyXG4gICAgICB0aGlzLmN1ckNvbnRleHQgPSB0aGlzLmRlZmF1bHRDb250ZXh0TmFtZSgpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuaXNDaHJvbWVTZXNzaW9uKSB7XHJcbiAgICAgICAgbG9nLmluZm8oXCJXZSdyZSBnb2luZyB0byBydW4gYSBDaHJvbWUtYmFzZWQgc2Vzc2lvblwiKTtcclxuICAgICAgICBsZXQge3BrZywgYWN0aXZpdHl9ID0gaGVscGVycy5nZXRDaHJvbWVQa2codGhpcy5vcHRzLmJyb3dzZXJOYW1lKTtcclxuICAgICAgICB0aGlzLm9wdHMuYXBwUGFja2FnZSA9IHBrZztcclxuICAgICAgICB0aGlzLm9wdHMuYXBwQWN0aXZpdHkgPSBhY3Rpdml0eTtcclxuICAgICAgICBsb2cuaW5mbyhgQ2hyb21lLXR5cGUgcGFja2FnZSBhbmQgYWN0aXZpdHkgYXJlICR7cGtnfSBhbmQgJHthY3Rpdml0eX1gKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMub3B0cy5uYXRpdmVXZWJTY3JlZW5zaG90KSB7XHJcbiAgICAgICAgdGhpcy5qd3BQcm94eUF2b2lkLnB1c2goWydHRVQnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvc2NyZWVuc2hvdCcpXSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLm9wdHMucmVib290KSB7XHJcbiAgICAgICAgdGhpcy5zZXRBdmRGcm9tQ2FwYWJpbGl0aWVzKGNhcHMpO1xyXG4gICAgICAgIHRoaXMuYWRkV2lwZURhdGFUb0F2ZEFyZ3MoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gZ2V0IGRldmljZSB1ZGlkIGZvciB0aGlzIHNlc3Npb25cclxuICAgICAgbGV0IHt1ZGlkLCBlbVBvcnR9ID0gYXdhaXQgaGVscGVycy5nZXREZXZpY2VJbmZvRnJvbUNhcHModGhpcy5vcHRzKTtcclxuICAgICAgdGhpcy5vcHRzLnVkaWQgPSB1ZGlkO1xyXG4gICAgICB0aGlzLm9wdHMuZW1Qb3J0ID0gZW1Qb3J0O1xyXG5cclxuICAgICAgLy8gc2V0IHVwIGFuIGluc3RhbmNlIG9mIEFEQlxyXG4gICAgICB0aGlzLmFkYiA9IGF3YWl0IGhlbHBlcnMuY3JlYXRlQURCKHRoaXMub3B0cy5qYXZhVmVyc2lvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdHMudWRpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdHMuZW1Qb3J0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0cy5hZGJQb3J0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0cy5zdXBwcmVzc0tpbGxTZXJ2ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRzLnJlbW90ZUFkYkhvc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRzLmNsZWFyRGV2aWNlTG9nc09uU3RhcnQpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuaGVscGVycy5pc1BhY2thZ2VPckJ1bmRsZSh0aGlzLm9wdHMuYXBwKSkge1xyXG4gICAgICAgIC8vIHVzZXIgcHJvdmlkZWQgcGFja2FnZSBpbnN0ZWFkIG9mIGFwcCBmb3IgJ2FwcCcgY2FwYWJpbGl0eSwgbWFzc2FnZSBvcHRpb25zXHJcbiAgICAgICAgdGhpcy5vcHRzLmFwcFBhY2thZ2UgPSB0aGlzLm9wdHMuYXBwO1xyXG4gICAgICAgIHRoaXMub3B0cy5hcHAgPSBudWxsO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5vcHRzLmFwcCkge1xyXG4gICAgICAgIC8vIGZpbmQgYW5kIGNvcHksIG9yIGRvd25sb2FkIGFuZCB1bnppcCBhbiBhcHAgdXJsIG9yIHBhdGhcclxuICAgICAgICB0aGlzLm9wdHMuYXBwID0gYXdhaXQgdGhpcy5oZWxwZXJzLmNvbmZpZ3VyZUFwcCh0aGlzLm9wdHMuYXBwLCBBUFBfRVhURU5TSU9OKTtcclxuICAgICAgICB0aGlzLm9wdHMuYXBwSXNUZW1wID0gY2Fwcy5hcHAgIT09IHRoaXMub3B0cy5hcHA7IC8vIGRpZCB3ZSBtYWtlIGEgdGVtcG9yYXJ5IGNvcHk/XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jaGVja0FwcFByZXNlbnQoKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmFwcE9uRGV2aWNlKSB7XHJcbiAgICAgICAgLy8gdGhlIGFwcCBpc24ndCBhbiBhY3R1YWwgYXBwIGZpbGUgYnV0IHJhdGhlciBzb21ldGhpbmcgd2Ugd2FudCB0b1xyXG4gICAgICAgIC8vIGFzc3VtZSBpcyBvbiB0aGUgZGV2aWNlIGFuZCBqdXN0IGxhdW5jaCB2aWEgdGhlIGFwcFBhY2thZ2VcclxuICAgICAgICBsb2cuaW5mbyhgQXBwIGZpbGUgd2FzIG5vdCBsaXN0ZWQsIGluc3RlYWQgd2UncmUgZ29pbmcgdG8gcnVuIGAgK1xyXG4gICAgICAgICAgICAgICAgIGAke3RoaXMub3B0cy5hcHBQYWNrYWdlfSBkaXJlY3RseSBvbiB0aGUgZGV2aWNlYCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jaGVja1BhY2thZ2VQcmVzZW50KCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFNvbWUgY2xvdWQgc2VydmljZXMgdXNpbmcgYXBwaXVtIGxhdW5jaCB0aGUgYXZkIHRoZW1zZWx2ZXMsIHNvIHdlIGVuc3VyZSBuZXRzcGVlZFxyXG4gICAgICAvLyBpcyBzZXQgZm9yIGVtdWxhdG9ycyBieSBjYWxsaW5nIGFkYi5uZXR3b3JrU3BlZWQgYmVmb3JlIHJ1bm5pbmcgdGhlIGFwcFxyXG4gICAgICBpZiAodXRpbC5oYXNWYWx1ZSh0aGlzLm9wdHMubmV0d29ya1NwZWVkKSkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0VtdWxhdG9yKCkpIHtcclxuICAgICAgICAgIGxvZy53YXJuKFwiU29ycnksIG5ldHdvcmtTcGVlZCBjYXBhYmlsaXR5IGlzIG9ubHkgYXZhaWxhYmxlIGZvciBlbXVsYXRvcnNcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGxldCBuZXR3b3JrU3BlZWQgPSBoZWxwZXJzLmVuc3VyZU5ldHdvcmtTcGVlZCh0aGlzLmFkYiwgdGhpcy5vcHRzLm5ldHdvcmtTcGVlZCk7XHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmFkYi5uZXR3b3JrU3BlZWQobmV0d29ya1NwZWVkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLy8gY2hlY2sgaWYgd2UgaGF2ZSB0byBlbmFibGUvZGlzYWJsZSBncHMgYmVmb3JlIHJ1bm5pbmcgdGhlIGFwcGxpY2F0aW9uXHJcbiAgICAgIGlmICh1dGlsLmhhc1ZhbHVlKHRoaXMub3B0cy5ncHNFbmFibGVkKSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRW11bGF0b3IoKSkge1xyXG4gICAgICAgICAgbG9nLmluZm8oYFRyeWluZyB0byAke3RoaXMub3B0cy5ncHNFbmFibGVkID8gXCJlbmFibGVcIiA6IFwiZGlzYWJsZVwifSBncHMgbG9jYXRpb24gcHJvdmlkZXJgKTtcclxuICAgICAgICAgIGF3YWl0IHRoaXMuYWRiLnRvZ2dsZUdQU0xvY2F0aW9uUHJvdmlkZXIodGhpcy5vcHRzLmdwc0VuYWJsZWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBsb2cud2FybignU29ycnkhIGdwc0VuYWJsZWQgY2FwYWJpbGl0eSBpcyBvbmx5IGF2YWlsYWJsZSBmb3IgZW11bGF0b3JzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBhd2FpdCB0aGlzLnN0YXJ0QW5kcm9pZFNlc3Npb24odGhpcy5vcHRzKTtcclxuICAgICAgcmV0dXJuIFtzZXNzaW9uSWQsIHRoaXMuY2Fwc107XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIC8vIGlnbm9yaW5nIGRlbGV0ZSBzZXNzaW9uIGV4Y2VwdGlvbiBpZiBhbnkgYW5kIHRocm93IHRoZSByZWFsIGVycm9yXHJcbiAgICAgIC8vIHRoYXQgaGFwcGVuZWQgd2hpbGUgY3JlYXRpbmcgdGhlIHNlc3Npb24uXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5kZWxldGVTZXNzaW9uKCk7XHJcbiAgICAgIH0gY2F0Y2ggKGlnbikge31cclxuICAgICAgdGhyb3cgZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzRW11bGF0b3IgKCkge1xyXG4gICAgcmV0dXJuICEhKHRoaXMub3B0cy5hdmQgfHwgL2VtdWxhdG9yLy50ZXN0KHRoaXMub3B0cy51ZGlkKSk7XHJcbiAgfVxyXG5cclxuICBzZXRBdmRGcm9tQ2FwYWJpbGl0aWVzIChjYXBzKSB7XHJcbiAgICBpZiAodGhpcy5vcHRzLmF2ZCkge1xyXG4gICAgICBsb2cuaW5mbygnYXZkIG5hbWUgZGVmaW5lZCwgaWdub3JpbmcgZGV2aWNlIG5hbWUgYW5kIHBsYXRmb3JtIHZlcnNpb24nKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICghY2Fwcy5kZXZpY2VOYW1lKSB7XHJcbiAgICAgICAgbG9nLmVycm9yQW5kVGhyb3coJ2F2ZCBvciBkZXZpY2VOYW1lIHNob3VsZCBiZSBzcGVjaWZpZWQgd2hlbiByZWJvb3Qgb3B0aW9uIGlzIGVuYWJsZXMnKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIWNhcHMucGxhdGZvcm1WZXJzaW9uKSB7XHJcbiAgICAgICAgbG9nLmVycm9yQW5kVGhyb3coJ2F2ZCBvciBwbGF0Zm9ybVZlcnNpb24gc2hvdWxkIGJlIHNwZWNpZmllZCB3aGVuIHJlYm9vdCBvcHRpb24gaXMgZW5hYmxlZCcpO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBhdmREZXZpY2UgPSBjYXBzLmRldmljZU5hbWUucmVwbGFjZSgvW15hLXpBLVowLTlfLl0vZywgXCItXCIpO1xyXG4gICAgICB0aGlzLm9wdHMuYXZkID0gYCR7YXZkRGV2aWNlfV9fJHtjYXBzLnBsYXRmb3JtVmVyc2lvbn1gO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWRkV2lwZURhdGFUb0F2ZEFyZ3MgKCkge1xyXG4gICAgaWYgKCF0aGlzLm9wdHMuYXZkQXJncykge1xyXG4gICAgICB0aGlzLm9wdHMuYXZkQXJncyA9ICctd2lwZS1kYXRhJztcclxuICAgIH0gZWxzZSAgaWYgKHRoaXMub3B0cy5hdmRBcmdzLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcIi13aXBlLWRhdGFcIikgPT09IC0xKSB7XHJcbiAgICAgIHRoaXMub3B0cy5hdmRBcmdzICs9ICcgLXdpcGUtZGF0YSc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgYXBwT25EZXZpY2UgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaGVscGVycy5pc1BhY2thZ2VPckJ1bmRsZSh0aGlzLm9wdHMuYXBwKSB8fCAoIXRoaXMub3B0cy5hcHAgJiZcclxuICAgICAgICAgICB0aGlzLmhlbHBlcnMuaXNQYWNrYWdlT3JCdW5kbGUodGhpcy5vcHRzLmFwcFBhY2thZ2UpKTtcclxuICB9XHJcblxyXG4gIGdldCBpc0Nocm9tZVNlc3Npb24gKCkge1xyXG4gICAgcmV0dXJuIGhlbHBlcnMuaXNDaHJvbWVCcm93c2VyKHRoaXMub3B0cy5icm93c2VyTmFtZSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBvblNldHRpbmdzVXBkYXRlIChrZXksIHZhbHVlKSB7XHJcbiAgICBpZiAoa2V5ID09PSBcImlnbm9yZVVuaW1wb3J0YW50Vmlld3NcIikge1xyXG4gICAgICBhd2FpdCB0aGlzLnNldENvbXByZXNzZWRMYXlvdXRIaWVyYXJjaHkodmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgc3RhcnRBbmRyb2lkU2Vzc2lvbiAoKSB7XHJcbiAgICBsb2cuaW5mbyhgU3RhcnRpbmcgQW5kcm9pZCBzZXNzaW9uYCk7XHJcbiAgICAvLyBzZXQgdXAgdGhlIGRldmljZSB0byBydW4gb24gKHJlYWwgb3IgZW11bGF0b3IsIGV0YylcclxuICAgIHRoaXMuZGVmYXVsdElNRSA9IGF3YWl0IGhlbHBlcnMuaW5pdERldmljZSh0aGlzLmFkYiwgdGhpcy5vcHRzKTtcclxuXHJcbiAgICAvLyBzZXQgYWN0dWFsIGRldmljZSBuYW1lLCB1ZGlkLCBwbGF0Zm9ybSB2ZXJzaW9uLCBzY3JlZW4gc2l6ZSwgbW9kZWwgYW5kIG1hbnVmYWN0dXJlciBkZXRhaWxzXHJcbiAgICB0aGlzLmNhcHMuZGV2aWNlTmFtZSA9IHRoaXMuYWRiLmN1ckRldmljZUlkO1xyXG4gICAgdGhpcy5jYXBzLmRldmljZVVESUQgPSB0aGlzLm9wdHMudWRpZDtcclxuICAgIHRoaXMuY2Fwcy5wbGF0Zm9ybVZlcnNpb24gPSBhd2FpdCB0aGlzLmFkYi5nZXRQbGF0Zm9ybVZlcnNpb24oKTtcclxuICAgIHRoaXMuY2Fwcy5kZXZpY2VTY3JlZW5TaXplID0gYXdhaXQgdGhpcy5hZGIuZ2V0U2NyZWVuU2l6ZSgpO1xyXG4gICAgdGhpcy5jYXBzLmRldmljZU1vZGVsID0gYXdhaXQgdGhpcy5hZGIuZ2V0TW9kZWwoKTtcclxuICAgIHRoaXMuY2Fwcy5kZXZpY2VNYW51ZmFjdHVyZXIgPSBhd2FpdCB0aGlzLmFkYi5nZXRNYW51ZmFjdHVyZXIoKTtcclxuXHJcbiAgICAvLyBJZiB0aGUgdXNlciBzZXRzIGF1dG9MYXVuY2ggdG8gZmFsc2UsIHRoZXkgYXJlIHJlc3BvbnNpYmxlIGZvciBpbml0QVVUKCkgYW5kIHN0YXJ0QVVUKClcclxuICAgIGlmICh0aGlzLm9wdHMuYXV0b0xhdW5jaCkge1xyXG4gICAgICAvLyBzZXQgdXAgYXBwIHVuZGVyIHRlc3RcclxuICAgICAgYXdhaXQgdGhpcy5pbml0QVVUKCk7XHJcbiAgICB9XHJcbiAgICAvLyBzdGFydCBVaUF1dG9tYXRvclxyXG4gICAgdGhpcy5ib290c3RyYXAgPSBuZXcgaGVscGVycy5ib290c3RyYXAodGhpcy5hZGIsIHRoaXMuYm9vdHN0cmFwUG9ydCwgdGhpcy5vcHRzLndlYnNvY2tldCk7XHJcbiAgICBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zdGFydCh0aGlzLm9wdHMuYXBwUGFja2FnZSwgdGhpcy5vcHRzLmRpc2FibGVBbmRyb2lkV2F0Y2hlcnMsIHRoaXMub3B0cy5hY2NlcHRTc2xDZXJ0cyk7XHJcbiAgICAvLyBoYW5kbGluZyB1bmV4cGVjdGVkIHNodXRkb3duXHJcbiAgICB0aGlzLmJvb3RzdHJhcC5vblVuZXhwZWN0ZWRTaHV0ZG93bi5jYXRjaChhc3luYyAoZXJyKSA9PiB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcHJvbWlzZS9wcmVmZXItYXdhaXQtdG8tY2FsbGJhY2tzXHJcbiAgICAgIGlmICghdGhpcy5ib290c3RyYXAuaWdub3JlVW5leHBlY3RlZFNodXRkb3duKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zdGFydFVuZXhwZWN0ZWRTaHV0ZG93bihlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIXRoaXMub3B0cy5za2lwVW5sb2NrKSB7XHJcbiAgICAgIC8vIExldCdzIHRyeSB0byB1bmxvY2sgdGhlIGRldmljZVxyXG4gICAgICBhd2FpdCBoZWxwZXJzLnVubG9jayh0aGlzLCB0aGlzLmFkYiwgdGhpcy5jYXBzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZXQgQ29tcHJlc3NlZExheW91dEhpZXJhcmNoeSBvbiB0aGUgZGV2aWNlIGJhc2VkIG9uIGN1cnJlbnQgc2V0dGluZ3Mgb2JqZWN0XHJcbiAgICAvLyB0aGlzIGhhcyB0byBoYXBwZW4gX2FmdGVyXyBib290c3RyYXAgaXMgaW5pdGlhbGl6ZWRcclxuICAgIGlmICh0aGlzLm9wdHMuaWdub3JlVW5pbXBvcnRhbnRWaWV3cykge1xyXG4gICAgICBhd2FpdCB0aGlzLnNldHRpbmdzLnVwZGF0ZSh7aWdub3JlVW5pbXBvcnRhbnRWaWV3czogdGhpcy5vcHRzLmlnbm9yZVVuaW1wb3J0YW50Vmlld3N9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc0Nocm9tZVNlc3Npb24pIHtcclxuICAgICAgLy8gc3RhcnQgYSBjaHJvbWVkcml2ZXIgc2Vzc2lvbiBhbmQgcHJveHkgdG8gaXRcclxuICAgICAgYXdhaXQgdGhpcy5zdGFydENocm9tZVNlc3Npb24oKTtcclxuICAgICAgaWYgKHRoaXMuc2hvdWxkRGlzbWlzc0Nocm9tZVdlbGNvbWUoKSkge1xyXG4gICAgICAgIC8vIGRpc21pc3MgQ2hyb21lIHdlbGNvbWUgZGlhbG9nXHJcbiAgICAgICAgYXdhaXQgdGhpcy5kaXNtaXNzQ2hyb21lV2VsY29tZSgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5vcHRzLmF1dG9MYXVuY2gpIHtcclxuICAgICAgICAvLyBzdGFydCBhcHBcclxuICAgICAgICBhd2FpdCB0aGlzLnN0YXJ0QVVUKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodXRpbC5oYXNWYWx1ZSh0aGlzLm9wdHMub3JpZW50YXRpb24pKSB7XHJcbiAgICAgIGxvZy5kZWJ1ZyhgU2V0dGluZyBpbml0aWFsIG9yaWVudGF0aW9uIHRvICcke3RoaXMub3B0cy5vcmllbnRhdGlvbn0nYCk7XHJcbiAgICAgIGF3YWl0IHRoaXMuc2V0T3JpZW50YXRpb24odGhpcy5vcHRzLm9yaWVudGF0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBhd2FpdCB0aGlzLmluaXRBdXRvV2VidmlldygpO1xyXG4gIH1cclxuXHJcbiAgc2hvdWxkRGlzbWlzc0Nocm9tZVdlbGNvbWUgKCkge1xyXG4gICAgcmV0dXJuICFfLmlzVW5kZWZpbmVkKHRoaXMub3B0cy5jaHJvbWVPcHRpb25zKSAmJlxyXG4gICAgICBfLmlzQXJyYXkodGhpcy5vcHRzLmNocm9tZU9wdGlvbnMuYXJncykgJiZcclxuICAgICAgdGhpcy5vcHRzLmNocm9tZU9wdGlvbnMuYXJncy5pbmRleE9mKCctLW5vLWZpcnN0LXJ1bicpICE9PSAtMTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGRpc21pc3NDaHJvbWVXZWxjb21lICgpIHtcclxuICAgIGxvZy5pbmZvKFwiVHJ5aW5nIHRvIGRpc21pc3MgQ2hyb21lIHdlbGNvbWVcIik7XHJcbiAgICBsZXQgYWN0aXZpdHkgPSBhd2FpdCB0aGlzLmdldEN1cnJlbnRBY3Rpdml0eSgpO1xyXG4gICAgaWYgKGFjdGl2aXR5ICE9PSBcIm9yZy5jaHJvbWl1bS5jaHJvbWUuYnJvd3Nlci5maXJzdHJ1bi5GaXJzdFJ1bkFjdGl2aXR5XCIpIHtcclxuICAgICAgbG9nLmluZm8oXCJDaHJvbWUgd2VsY29tZSBkaWFsb2cgbmV2ZXIgc2hvd2VkIHVwISBDb250aW51aW5nXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgZWwgPSBhd2FpdCB0aGlzLmZpbmRFbE9yRWxzKCdpZCcsICdjb20uYW5kcm9pZC5jaHJvbWU6aWQvdGVybXNfYWNjZXB0JywgZmFsc2UpO1xyXG4gICAgYXdhaXQgdGhpcy5jbGljayhlbC5FTEVNRU5UKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGxldCBlbCA9IGF3YWl0IHRoaXMuZmluZEVsT3JFbHMoJ2lkJywgJ2NvbS5hbmRyb2lkLmNocm9tZTppZC9uZWdhdGl2ZV9idXR0b24nLCBmYWxzZSk7XHJcbiAgICAgIGF3YWl0IHRoaXMuY2xpY2soZWwuRUxFTUVOVCk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIC8vIERPIE5PVEhJTkcsIFRISVMgREVWSUNFIERJRE5UIExBVU5DSCBUSEUgU0lHTklOIERJQUxPR1xyXG4gICAgICAvLyBJVCBNVVNUIEJFIEEgTk9OIEdNUyBERVZJQ0VcclxuICAgICAgbG9nLndhcm4oYFRoaXMgZGV2aWNlIGRpZG50IHNob3cgQ2hyb21lIFNpZ25JbiBkaWFsb2csICR7ZS5tZXNzYWdlfWApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgaW5pdEF1dG9XZWJ2aWV3ICgpIHtcclxuICAgIGlmICh0aGlzLm9wdHMuYXV0b1dlYnZpZXcpIHtcclxuICAgICAgbGV0IHZpZXdOYW1lID0gdGhpcy5kZWZhdWx0V2Vidmlld05hbWUoKTtcclxuICAgICAgbGV0IHRpbWVvdXQgPSAodGhpcy5vcHRzLmF1dG9XZWJ2aWV3VGltZW91dCkgfHwgMjAwMDtcclxuXHJcbiAgICAgIGxvZy5pbmZvKGBTZXR0aW5nIGF1dG8gd2VidmlldyB0byBjb250ZXh0ICcke3ZpZXdOYW1lfScgd2l0aCB0aW1lb3V0ICR7dGltZW91dH1tc2ApO1xyXG5cclxuICAgICAgLy8gdHJ5IGV2ZXJ5IDUwMG1zIHVudGlsIHRpbWVvdXQgaXMgb3ZlclxyXG4gICAgICBhd2FpdCByZXRyeUludGVydmFsKHRpbWVvdXQgLyA1MDAsIDUwMCwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2V0Q29udGV4dCh2aWV3TmFtZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgaW5pdEFVVCAoKSB7XHJcbiAgICAvLyBwb3B1bGF0ZSBhcHBQYWNrYWdlLCBhcHBBY3Rpdml0eSwgYXBwV2FpdFBhY2thZ2UsIGFwcFdhaXRBY3Rpdml0eSxcclxuICAgIC8vIGFuZCB0aGUgZGV2aWNlIGJlaW5nIHVzZWRcclxuICAgIC8vIGluIHRoZSBvcHRzIGFuZCBjYXBzIChzbyBpdCBnZXRzIGJhY2sgdG8gdGhlIHVzZXIgb24gc2Vzc2lvbiBjcmVhdGlvbilcclxuICAgIGxldCBsYXVuY2hJbmZvID0gYXdhaXQgaGVscGVycy5nZXRMYXVuY2hJbmZvKHRoaXMuYWRiLCB0aGlzLm9wdHMpO1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLm9wdHMsIGxhdW5jaEluZm8pO1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLmNhcHMsIGxhdW5jaEluZm8pO1xyXG4gICAgLy8gaW5zdGFsbCBhcHBcclxuICAgIGlmICghdGhpcy5vcHRzLmFwcCkge1xyXG4gICAgICBpZiAodGhpcy5vcHRzLmZ1bGxSZXNldCkge1xyXG4gICAgICAgIGxvZy5lcnJvckFuZFRocm93KCdGdWxsIHJlc2V0IHJlcXVpcmVzIGFuIGFwcCBjYXBhYmlsaXR5LCB1c2UgZmFzdFJlc2V0IGlmIGFwcCBpcyBub3QgcHJvdmlkZWQnKTtcclxuICAgICAgfVxyXG4gICAgICBsb2cuZGVidWcoJ05vIGFwcCBjYXBhYmlsaXR5LiBBc3N1bWluZyBpdCBpcyBhbHJlYWR5IG9uIHRoZSBkZXZpY2UnKTtcclxuICAgICAgaWYgKHRoaXMub3B0cy5mYXN0UmVzZXQpIHtcclxuICAgICAgICBhd2FpdCBoZWxwZXJzLnJlc2V0QXBwKHRoaXMuYWRiLCB0aGlzLm9wdHMuYXBwLCB0aGlzLm9wdHMuYXBwUGFja2FnZSwgdGhpcy5vcHRzLmZhc3RSZXNldCk7XHJcbiAgICAgIH1cclxuICAgICAgYXdhaXQgdGhpcy5ncmFudFBlcm1pc3Npb25zKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5vcHRzLnNraXBVbmluc3RhbGwpIHtcclxuICAgICAgYXdhaXQgdGhpcy5hZGIudW5pbnN0YWxsQXBrKHRoaXMub3B0cy5hcHBQYWNrYWdlKTtcclxuICAgIH1cclxuICAgIGF3YWl0IGhlbHBlcnMuaW5zdGFsbEFwa1JlbW90ZWx5KHRoaXMuYWRiLCB0aGlzLm9wdHMpO1xyXG4gICAgYXdhaXQgdGhpcy5ncmFudFBlcm1pc3Npb25zKCk7XHJcbiAgICB0aGlzLmFwa1N0cmluZ3NbdGhpcy5vcHRzLmxhbmd1YWdlXSA9IGF3YWl0IGhlbHBlcnMucHVzaFN0cmluZ3MoXHJcbiAgICAgICAgdGhpcy5vcHRzLmxhbmd1YWdlLCB0aGlzLmFkYiwgdGhpcy5vcHRzKTtcclxuXHJcbiAgICAvLyBUaGlzIG11c3QgcnVuIGFmdGVyIGluc3RhbGxpbmcgdGhlIGFwaywgb3RoZXJ3aXNlIGl0IHdvdWxkIGNhdXNlIHRoZVxyXG4gICAgLy8gaW5zdGFsbCB0byBmYWlsLiBBbmQgYmVmb3JlIHJ1bm5pbmcgdGhlIGFwcC5cclxuICAgIGlmICghXy5pc1VuZGVmaW5lZCh0aGlzLm9wdHMuc2hhcmVkUHJlZmVyZW5jZXMpKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMuc2V0U2hhcmVkUHJlZmVyZW5jZXModGhpcy5vcHRzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHN0YXJ0Q2hyb21lU2Vzc2lvbiAoKSB7XHJcbiAgICBsb2cuaW5mbyhcIlN0YXJ0aW5nIGEgY2hyb21lLWJhc2VkIGJyb3dzZXIgc2Vzc2lvblwiKTtcclxuICAgIGxldCBvcHRzID0gXy5jbG9uZURlZXAodGhpcy5vcHRzKTtcclxuICAgIG9wdHMuY2hyb21lVXNlUnVubmluZ0FwcCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IGtub3duUGFja2FnZXMgPSBbXCJvcmcuY2hyb21pdW0uY2hyb21lLnNoZWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tLmFuZHJvaWQuY2hyb21lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tLmNocm9tZS5iZXRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib3JnLmNocm9taXVtLmNocm9tZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9yZy5jaHJvbWl1bS53ZWJ2aWV3X3NoZWxsXCJdO1xyXG5cclxuICAgIGlmICghXy5pbmNsdWRlcyhrbm93blBhY2thZ2VzLCB0aGlzLm9wdHMuYXBwUGFja2FnZSkpIHtcclxuICAgICAgb3B0cy5jaHJvbWVBbmRyb2lkQWN0aXZpdHkgPSB0aGlzLm9wdHMuYXBwQWN0aXZpdHk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNocm9tZWRyaXZlciA9IGF3YWl0IHNldHVwTmV3Q2hyb21lZHJpdmVyKG9wdHMsIHRoaXMuYWRiLmN1ckRldmljZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYik7XHJcbiAgICB0aGlzLmNocm9tZWRyaXZlci5vbihDaHJvbWVkcml2ZXIuRVZFTlRfQ0hBTkdFRCwgKG1zZykgPT4ge1xyXG4gICAgICBpZiAobXNnLnN0YXRlID09PSBDaHJvbWVkcml2ZXIuU1RBVEVfU1RPUFBFRCkge1xyXG4gICAgICAgIHRoaXMub25DaHJvbWVkcml2ZXJTdG9wKENIUk9NSVVNX1dJTik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE5vdyB0aGF0IHdlIGhhdmUgYSBDaHJvbWUgc2Vzc2lvbiwgd2UgZW5zdXJlIHRoYXQgdGhlIGNvbnRleHQgaXNcclxuICAgIC8vIGFwcHJvcHJpYXRlbHkgc2V0IGFuZCB0aGF0IHRoaXMgY2hyb21lZHJpdmVyIGlzIGFkZGVkIHRvIHRoZSBsaXN0XHJcbiAgICAvLyBvZiBzZXNzaW9uIGNocm9tZWRyaXZlcnMgc28gd2UgY2FuIHN3aXRjaCBiYWNrIGFuZCBmb3J0aFxyXG4gICAgdGhpcy5jdXJDb250ZXh0ID0gQ0hST01JVU1fV0lOO1xyXG4gICAgdGhpcy5zZXNzaW9uQ2hyb21lZHJpdmVyc1tDSFJPTUlVTV9XSU5dID0gdGhpcy5jaHJvbWVkcml2ZXI7XHJcbiAgICB0aGlzLnByb3h5UmVxUmVzID0gdGhpcy5jaHJvbWVkcml2ZXIucHJveHlSZXEuYmluZCh0aGlzLmNocm9tZWRyaXZlcik7XHJcbiAgICB0aGlzLmp3cFByb3h5QWN0aXZlID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGNoZWNrQXBwUHJlc2VudCAoKSB7XHJcbiAgICBsb2cuZGVidWcoXCJDaGVja2luZyB3aGV0aGVyIGFwcCBpcyBhY3R1YWxseSBwcmVzZW50XCIpO1xyXG4gICAgaWYgKCEoYXdhaXQgZnMuZXhpc3RzKHRoaXMub3B0cy5hcHApKSkge1xyXG4gICAgICBsb2cuZXJyb3JBbmRUaHJvdyhgQ291bGQgbm90IGZpbmQgYXBwIGFwayBhdCAke3RoaXMub3B0cy5hcHB9YCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBjaGVja1BhY2thZ2VQcmVzZW50ICgpIHtcclxuICAgIGxvZy5kZWJ1ZyhcIkNoZWNraW5nIHdoZXRoZXIgcGFja2FnZSBpcyBwcmVzZW50IG9uIHRoZSBkZXZpY2VcIik7XHJcbiAgICBpZiAoIShhd2FpdCB0aGlzLmFkYi5zaGVsbChbJ3BtJywgJ2xpc3QnLCAncGFja2FnZXMnLCB0aGlzLm9wdHMuYXBwUGFja2FnZV0pKSkge1xyXG4gICAgICBsb2cuZXJyb3JBbmRUaHJvdyhgQ291bGQgbm90IGZpbmQgcGFja2FnZSAke3RoaXMub3B0cy5hcHBQYWNrYWdlfSBvbiB0aGUgZGV2aWNlYCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBncmFudFBlcm1pc3Npb25zICgpIHtcclxuICAgIGlmICh0aGlzLm9wdHMuYXV0b0dyYW50UGVybWlzc2lvbnMpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCB0aGlzLmFkYi5ncmFudEFsbFBlcm1pc3Npb25zKHRoaXMub3B0cy5hcHBQYWNrYWdlLCB0aGlzLm9wdHMuYXBwKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBsb2cuZXJyb3IoYFVuYWJsZSB0byBncmFudCBwZXJtaXNzaW9ucyByZXF1ZXN0ZWQuIE9yaWdpbmFsIGVycm9yOiAke2Vycm9yLm1lc3NhZ2V9YCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgLy8gU2V0IENvbXByZXNzZWRMYXlvdXRIaWVyYXJjaHkgb24gdGhlIGRldmljZVxyXG4gIGFzeW5jIHNldENvbXByZXNzZWRMYXlvdXRIaWVyYXJjaHkgKGNvbXByZXNzKSB7XHJcbiAgICBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiY29tcHJlc3NlZExheW91dEhpZXJhcmNoeVwiLCB7Y29tcHJlc3NMYXlvdXQ6IGNvbXByZXNzfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBkZWxldGVTZXNzaW9uICgpIHtcclxuICAgIGxvZy5kZWJ1ZyhcIlNodXR0aW5nIGRvd24gQW5kcm9pZCBkcml2ZXJcIik7XHJcbiAgICBhd2FpdCBzdXBlci5kZWxldGVTZXNzaW9uKCk7XHJcbiAgICBpZiAodGhpcy5ib290c3RyYXApIHtcclxuICAgICAgLy8gY2VydGFpbiBjbGVhbnVwIHdlIG9ubHkgY2FyZSB0byBkbyBpZiB0aGUgYm9vdHN0cmFwIHdhcyBldmVyIHJ1blxyXG4gICAgICBhd2FpdCB0aGlzLnN0b3BDaHJvbWVkcml2ZXJQcm94aWVzKCk7XHJcbiAgICAgIGlmICh0aGlzLm9wdHMudW5pY29kZUtleWJvYXJkICYmIHRoaXMub3B0cy5yZXNldEtleWJvYXJkICYmIHRoaXMuZGVmYXVsdElNRSkge1xyXG4gICAgICAgIGxvZy5kZWJ1ZyhgUmVzZXR0aW5nIElNRSB0byAke3RoaXMuZGVmYXVsdElNRX1gKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmFkYi5zZXRJTUUodGhpcy5kZWZhdWx0SU1FKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIXRoaXMuaXNDaHJvbWVTZXNzaW9uKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5hZGIuZm9yY2VTdG9wKHRoaXMub3B0cy5hcHBQYWNrYWdlKTtcclxuICAgICAgfVxyXG4gICAgICBhd2FpdCB0aGlzLmFkYi5nb1RvSG9tZSgpO1xyXG4gICAgICBpZiAodGhpcy5vcHRzLmZ1bGxSZXNldCAmJiAhdGhpcy5vcHRzLnNraXBVbmluc3RhbGwgJiYgIXRoaXMuYXBwT25EZXZpY2UpIHtcclxuICAgICAgICBhd2FpdCB0aGlzLmFkYi51bmluc3RhbGxBcGsodGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xyXG4gICAgICB9XHJcbiAgICAgIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNodXRkb3duKCk7XHJcbiAgICAgIHRoaXMuYm9vdHN0cmFwID0gbnVsbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxvZy5kZWJ1ZyhcIkNhbGxlZCBkZWxldGVTZXNzaW9uIGJ1dCBib290c3RyYXAgd2Fzbid0IGFjdGl2ZVwiKTtcclxuICAgIH1cclxuICAgIC8vIHNvbWUgY2xlYW51cCB3ZSB3YW50IHRvIGRvIHJlZ2FyZGxlc3MsIGluIGNhc2Ugd2UgYXJlIHNodXR0aW5nIGRvd25cclxuICAgIC8vIG1pZC1zdGFydHVwXHJcbiAgICBhd2FpdCB0aGlzLmFkYi5zdG9wTG9nY2F0KCk7XHJcbiAgICBpZiAodGhpcy51c2VVbmxvY2tIZWxwZXJBcHApIHtcclxuICAgICAgYXdhaXQgdGhpcy5hZGIuZm9yY2VTdG9wKCdpby5hcHBpdW0udW5sb2NrJyk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5vcHRzLnJlYm9vdCkge1xyXG4gICAgICBsZXQgYXZkTmFtZSA9IHRoaXMub3B0cy5hdmQucmVwbGFjZSgnQCcsICcnKTtcclxuICAgICAgbG9nLmRlYnVnKGBjbG9zaW5nIGVtdWxhdG9yICcke2F2ZE5hbWV9J2ApO1xyXG4gICAgICBhd2FpdCB0aGlzLmFkYi5raWxsRW11bGF0b3IoYXZkTmFtZSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5vcHRzLmNsZWFyU3lzdGVtRmlsZXMpIHtcclxuICAgICAgaWYgKHRoaXMub3B0cy5hcHBJc1RlbXApIHtcclxuICAgICAgICBsb2cuZGVidWcoYFRlbXBvcmFyeSBjb3B5IG9mIGFwcCB3YXMgbWFkZTogZGVsZXRpbmcgJyR7dGhpcy5vcHRzLmFwcH0nYCk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGF3YWl0IGZzLnJpbXJhZih0aGlzLm9wdHMuYXBwKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIGxvZy53YXJuKGBVbmFibGUgdG8gZGVsZXRlIHRlbXBvcmFyeSBhcHA6ICR7ZXJyLm1lc3NhZ2V9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxvZy5kZWJ1ZygnQXBwIHdhcyBub3QgY29waWVkLCBzbyBub3QgZGVsZXRpbmcnKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbG9nLmRlYnVnKCdOb3QgY2xlYW5pbmcgZ2VuZXJhdGVkIGZpbGVzLiBBZGQgYGNsZWFyU3lzdGVtRmlsZXNgIGNhcGFiaWxpdHkgaWYgd2FudGVkLicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgc2V0U2hhcmVkUHJlZmVyZW5jZXMgKCkge1xyXG4gICAgbGV0IHNoYXJlZFByZWZzID0gdGhpcy5vcHRzLnNoYXJlZFByZWZlcmVuY2VzO1xyXG4gICAgbG9nLmluZm8oXCJUcnlpbmcgdG8gc2V0IHNoYXJlZCBwcmVmZXJlbmNlc1wiKTtcclxuICAgIGxldCBuYW1lID0gc2hhcmVkUHJlZnMubmFtZTtcclxuICAgIGlmIChfLmlzVW5kZWZpbmVkKG5hbWUpKSB7XHJcbiAgICAgIGxvZy53YXJuKGBTa2lwcGluZyBzZXR0aW5nIFNoYXJlZCBwcmVmZXJlbmNlcywgbmFtZSBpcyB1bmRlZmluZWQ6ICR7SlNPTi5zdHJpbmdpZnkoc2hhcmVkUHJlZnMpfWApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBsZXQgcmVtb3RlUGF0aCA9IGAvZGF0YS9kYXRhLyR7dGhpcy5vcHRzLmFwcFBhY2thZ2V9L3NoYXJlZF9wcmVmc2A7XHJcbiAgICBsZXQgcmVtb3RlRmlsZSA9IGAke3JlbW90ZVBhdGh9LyR7bmFtZX0ueG1sYDtcclxuICAgIGxldCBsb2NhbFBhdGggPSBgL3RtcC8ke25hbWV9LnhtbGA7XHJcbiAgICBsZXQgYnVpbGRlciA9IHRoaXMuZ2V0UHJlZnNCdWlsZGVyKCk7XHJcbiAgICBidWlsZGVyLmJ1aWxkKHNoYXJlZFByZWZzLnByZWZzKTtcclxuICAgIGxvZy5pbmZvKGBDcmVhdGluZyB0ZW1wb3Jhcnkgc2hhcmVkIHByZWZlcmVuY2VzOiAke2xvY2FsUGF0aH1gKTtcclxuICAgIGJ1aWxkZXIudG9GaWxlKGxvY2FsUGF0aCk7XHJcbiAgICBsb2cuaW5mbyhgQ3JlYXRpbmcgc2hhcmVkX3ByZWZzIHJlbW90ZSBmb2xkZXI6ICR7cmVtb3RlUGF0aH1gKTtcclxuICAgIGF3YWl0IHRoaXMuYWRiLnNoZWxsKFsnbWtkaXInLCAnLXAnLCByZW1vdGVQYXRoXSk7XHJcbiAgICBsb2cuaW5mbyhgUHVzaGluZyBzaGFyZWRfcHJlZnMgdG8gJHtyZW1vdGVGaWxlfWApO1xyXG4gICAgYXdhaXQgdGhpcy5hZGIucHVzaChsb2NhbFBhdGgsIHJlbW90ZUZpbGUpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgbG9nLmluZm8oYFRyeWluZyB0byByZW1vdmUgc2hhcmVkIHByZWZlcmVuY2VzIHRlbXBvcmFyeSBmaWxlYCk7XHJcbiAgICAgIGlmIChhd2FpdCBmcy5leGlzdHMobG9jYWxQYXRoKSkge1xyXG4gICAgICAgIGF3YWl0IGZzLnVubGluayhsb2NhbFBhdGgpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGxvZy53YXJuKGBFcnJvciB0cnlpbmcgdG8gcmVtb3ZlIHRlbXBvcmFyeSBmaWxlICR7bG9jYWxQYXRofWApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBnZXRQcmVmc0J1aWxkZXIgKCkge1xyXG4gICAgLyogQWRkIHRoaXMgbWV0aG9kIHRvIGNyZWF0ZSBhIG5ldyBTaGFyZWRQcmVmc0J1aWxkZXIgaW5zdGVhZCBvZlxyXG4gICAgICogZGlyZWN0bHkgY3JlYXRpbmcgdGhlIG9iamVjdCBvbiBzZXRTaGFyZWRQcmVmZXJlbmNlcyBmb3IgdGVzdGluZyBwdXJwb3Nlc1xyXG4gICAgKi9cclxuICAgIHJldHVybiBuZXcgU2hhcmVkUHJlZnNCdWlsZGVyKCk7XHJcbiAgfVxyXG5cclxuICB2YWxpZGF0ZURlc2lyZWRDYXBzIChjYXBzKSB7XHJcbiAgICAvLyBjaGVjayB3aXRoIHRoZSBiYXNlIGNsYXNzLCBhbmQgcmV0dXJuIGlmIGl0IGZhaWxzXHJcbiAgICBsZXQgcmVzID0gc3VwZXIudmFsaWRhdGVEZXNpcmVkQ2FwcyhjYXBzKTtcclxuICAgIGlmICghcmVzKSByZXR1cm4gcmVzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGN1cmx5XHJcblxyXG4gICAgLy8gbWFrZSBzdXJlIHRoYXQgdGhlIGNhcGFiaWxpdGllcyBoYXZlIG9uZSBvZiBgYXBwYCwgYGFwcFBhY2thZ2VgIG9yIGBicm93c2VyYFxyXG4gICAgaWYgKCghY2Fwcy5icm93c2VyTmFtZSB8fCAhaGVscGVycy5pc0Nocm9tZUJyb3dzZXIoY2Fwcy5icm93c2VyTmFtZSkpICYmXHJcbiAgICAgICFjYXBzLmFwcCAmJiAhY2Fwcy5hcHBQYWNrYWdlKSB7XHJcbiAgICAgIGxldCBtc2cgPSAnVGhlIGRlc2lyZWQgY2FwYWJpbGl0aWVzIG11c3QgaW5jbHVkZSBlaXRoZXIgYW4gYXBwLCBhcHBQYWNrYWdlIG9yIGJyb3dzZXJOYW1lJztcclxuICAgICAgbG9nLmVycm9yQW5kVGhyb3cobXNnKTtcclxuICAgIH1cclxuICAgIC8vIHdhcm4gaWYgdGhlIGNhcGFiaWxpdGllcyBoYXZlIGJvdGggYGFwcGAgYW5kIGBicm93c2VyLCBhbHRob3VnaCB0aGlzXHJcbiAgICAvLyBpcyBjb21tb24gd2l0aCBzZWxlbml1bSBncmlkXHJcbiAgICBpZiAoY2Fwcy5icm93c2VyTmFtZSAmJiBjYXBzLmFwcCkge1xyXG4gICAgICBsZXQgbXNnID0gJ1RoZSBkZXNpcmVkIGNhcGFiaWxpdGllcyBzaG91bGQgZ2VuZXJhbGx5IG5vdCBpbmNsdWRlIGJvdGggYW4gYXBwIGFuZCBhIGJyb3dzZXJOYW1lJztcclxuICAgICAgbG9nLndhcm4obXNnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb3h5QWN0aXZlIChzZXNzaW9uSWQpIHtcclxuICAgIHN1cGVyLnByb3h5QWN0aXZlKHNlc3Npb25JZCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuandwUHJveHlBY3RpdmU7XHJcbiAgfVxyXG5cclxuICBnZXRQcm94eUF2b2lkTGlzdCAoc2Vzc2lvbklkKSB7XHJcbiAgICBzdXBlci5nZXRQcm94eUF2b2lkTGlzdChzZXNzaW9uSWQpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmp3cFByb3h5QXZvaWQ7XHJcbiAgfVxyXG5cclxuICBjYW5Qcm94eSAoc2Vzc2lvbklkKSB7XHJcbiAgICBzdXBlci5jYW5Qcm94eShzZXNzaW9uSWQpO1xyXG5cclxuICAgIC8vIHRoaXMgd2lsbCBjaGFuZ2UgZGVwZW5kaW5nIG9uIENocm9tZURyaXZlciBzdGF0dXNcclxuICAgIHJldHVybiBfLmlzRnVuY3Rpb24odGhpcy5wcm94eVJlcVJlcyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbmRyb2lkRHJpdmVyO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLiJ9
