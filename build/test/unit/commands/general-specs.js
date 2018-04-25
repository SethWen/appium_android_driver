'use strict';

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var _libCommandsGeneral = require('../../../lib/commands/general');

var _libAndroidHelpers = require('../../../lib/android-helpers');

var _libAndroidHelpers2 = _interopRequireDefault(_libAndroidHelpers);

var _appiumTestSupport = require('appium-test-support');

var _appiumSupport = require('appium-support');

var _appiumAndroidBootstrap = require('appium-android-bootstrap');

var _appiumAndroidBootstrap2 = _interopRequireDefault(_appiumAndroidBootstrap);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var sandbox = _sinon2['default'].sandbox.create();
var expect = _chai2['default'].expect;

describe('General', function () {
  beforeEach(function () {
    driver = new _2['default']();
    driver.bootstrap = new _appiumAndroidBootstrap2['default']();
    driver.adb = new _appiumAdb2['default']();
    driver.caps = {};
    driver.opts = {};
  });
  afterEach(function () {
    sandbox.restore();
  });
  describe('keys', function () {
    it('should send keys via setText bootstrap command', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.bootstrap, 'sendAction');
            driver.opts.unicodeKeyboard = true;
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.keys('keys'));

          case 4:
            driver.bootstrap.sendAction.calledWithExactly('setText', { text: 'keys', replace: false, unicodeKeyboard: true }).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should join keys if keys is array', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.bootstrap, 'sendAction');
            driver.opts.unicodeKeyboard = false;
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.keys(['k', 'e', 'y', 's']));

          case 4:
            driver.bootstrap.sendAction.calledWithExactly('setText', { text: 'keys', replace: false }).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('getDeviceTime', function () {
    it('should return device time', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'shell');
            driver.adb.shell.returns(' 11:12 ');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getDeviceTime().should.become('11:12'));

          case 4:
            driver.adb.shell.calledWithExactly(['date']).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should thorws error if shell command failed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'shell').throws();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getDeviceTime().should.be.rejectedWith('Could not capture'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('getPageSource', function () {
    it('should return page source', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.bootstrap, 'sendAction').withArgs('source').returns('sources');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getPageSource().should.be.equal('sources'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('back', function () {
    it('should press back', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.bootstrap, 'sendAction');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.back());

          case 3:
            driver.bootstrap.sendAction.calledWithExactly('pressBack').should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('isKeyboardShown', function () {
    it('should return true if the keyboard is shown', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.adb.isSoftKeyboardPresent = function () {
              return { isKeyboardShown: true, canCloseKeyboard: true };
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.isKeyboardShown());

          case 3:
            context$3$0.sent.should.equal(true);

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return false if the keyboard is not shown', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.adb.isSoftKeyboardPresent = function () {
              return { isKeyboardShown: false, canCloseKeyboard: true };
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.isKeyboardShown());

          case 3:
            context$3$0.sent.should.equal(false);

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('hideKeyboard', function () {
    it('should hide keyboard via back command', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'back');
            driver.adb.isSoftKeyboardPresent = function () {
              return { isKeyboardShown: true, canCloseKeyboard: true };
            };
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.hideKeyboard());

          case 4:
            driver.back.calledOnce.should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not call back command if can\'t close keyboard', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'back');
            driver.adb.isSoftKeyboardPresent = function () {
              return { isKeyboardShown: true, canCloseKeyboard: false };
            };
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.hideKeyboard());

          case 4:
            driver.back.notCalled.should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw an error if no keyboard is present', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.adb.isSoftKeyboardPresent = function () {
              return false;
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.hideKeyboard().should.be.rejectedWith(/not present/));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('openSettingsActivity', function () {
    it('should open settings activity', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'getFocusedPackageAndActivity').returns({ appPackage: 'pkg', appActivity: 'act' });
            sandbox.stub(driver.adb, 'shell');
            sandbox.stub(driver.adb, 'waitForNotActivity');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.openSettingsActivity('set1'));

          case 5:
            driver.adb.shell.calledWithExactly(['am', 'start', '-a', 'android.settings.set1']).should.be['true'];
            driver.adb.waitForNotActivity.calledWithExactly('pkg', 'act', 5000).should.be['true'];

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('getWindowSize', function () {
    it('should get window size', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.bootstrap, 'sendAction').withArgs('getDeviceSize').returns('size');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getWindowSize().should.be.equal('size'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('getCurrentActivity', function () {
    it('should get current activity', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'getFocusedPackageAndActivity').returns({ appActivity: 'act' });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getCurrentActivity().should.eventually.be.equal('act'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('getCurrentPackage', function () {
    it('should get current activity', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'getFocusedPackageAndActivity').returns({ appPackage: 'pkg' });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getCurrentPackage().should.eventually.equal('pkg'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('getLogTypes', function () {
    it('should get log types', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.getLogTypes().should.be.deep.equal(['logcat']));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('getLog', function () {
    it('should get log types', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'getLogcatLogs').returns('logs');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getLog('logcat').should.be.equal('logs'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throws exception if log type is unsupported', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            expect(function () {
              return driver.getLog('unsupported_type');
            }).to['throw']('Unsupported log type unsupported_type');

          case 1:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('isAppInstalled', function () {
    it('should return true if app is installed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'isAppInstalled').withArgs('pkg').returns(true);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.isAppInstalled('pkg').should.be['true']);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('removeApp', function () {
    it('should remove app', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'uninstallApk').withArgs('pkg').returns(true);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.removeApp('pkg').should.be['true']);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('installApp', function () {
    it('should install app', function callee$2$0() {
      var app, opts;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.fastReset = 'fastReset';
            app = 'app.apk';
            opts = { app: 'app.apk', appPackage: 'pkg', fastReset: 'fastReset' };

            sandbox.stub(driver.helpers, 'configureApp').withArgs('app', '.apk').returns(app);
            sandbox.stub(_appiumSupport.fs, 'exists').withArgs(app).returns(true);
            sandbox.stub(driver.adb, 'packageAndLaunchActivityFromManifest').withArgs(app).returns({ apkPackage: 'pkg' });
            sandbox.stub(_libAndroidHelpers2['default'], 'installApkRemotely').returns(true);
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(driver.installApp('app').should.eventually.be['true']);

          case 9:
            driver.helpers.configureApp.calledOnce.should.be['true'];
            _appiumSupport.fs.exists.calledOnce.should.be['true'];
            driver.adb.packageAndLaunchActivityFromManifest.calledOnce.should.be['true'];
            _libAndroidHelpers2['default'].installApkRemotely.calledWithExactly(driver.adb, opts).should.be['true'];

          case 13:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw an error if APK does not exist', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.installApp('non/existent/app.apk').should.be.rejectedWith(/Could not find/));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('background', function () {
    it('should bring app to background and back', function callee$2$0() {
      var appPackage, appActivity, params;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            appPackage = 'wpkg';
            appActivity = 'wacv';

            driver.opts = { appPackage: appPackage, appActivity: appActivity, intentAction: 'act',
              intentCategory: 'cat', intentFlags: 'flgs',
              optionalIntentArguments: 'opt' };
            params = { pkg: appPackage, activity: appActivity, action: 'act', category: 'cat',
              flags: 'flgs',
              optionalIntentArguments: 'opt', stopApp: false };

            sandbox.stub(driver.adb, 'goToHome');
            sandbox.stub(driver.adb, 'getFocusedPackageAndActivity').returns({ appPackage: appPackage, appActivity: appActivity });
            sandbox.stub(_bluebird2['default'], 'delay');
            sandbox.stub(driver.adb, 'startApp');
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(driver.background(10));

          case 10:
            driver.adb.getFocusedPackageAndActivity.calledOnce.should.be['true'];
            driver.adb.goToHome.calledOnce.should.be['true'];
            _bluebird2['default'].delay.calledWithExactly(10000).should.be['true'];
            driver.adb.startApp.calledWithExactly(params).should.be['true'];

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should bring app to background and back if started after session init', function callee$2$0() {
      var appPackage, appActivity, params;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            appPackage = 'newpkg';
            appActivity = 'newacv';

            driver.opts = { appPackage: 'pkg', appActivity: 'acv', intentAction: 'act',
              intentCategory: 'cat', intentFlags: 'flgs',
              optionalIntentArguments: 'opt' };
            params = { pkg: appPackage, activity: appActivity, action: 'act', category: 'cat',
              flags: 'flgs', waitPkg: 'wpkg', waitActivity: 'wacv',
              optionalIntentArguments: 'opt', stopApp: false };

            driver.opts.startActivityArgs = _defineProperty({}, appPackage + '/' + appActivity, params);
            sandbox.stub(driver.adb, 'goToHome');
            sandbox.stub(driver.adb, 'getFocusedPackageAndActivity').returns({ appPackage: appPackage, appActivity: appActivity });
            sandbox.stub(_bluebird2['default'], 'delay');
            sandbox.stub(driver.adb, 'startApp');
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(driver.background(10));

          case 11:
            driver.adb.getFocusedPackageAndActivity.calledOnce.should.be['true'];
            driver.adb.goToHome.calledOnce.should.be['true'];
            _bluebird2['default'].delay.calledWithExactly(10000).should.be['true'];
            driver.adb.startApp.calledWithExactly(params).should.be['true'];

          case 15:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should not bring app back if seconds are negative', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'goToHome');
            sandbox.stub(driver.adb, 'startApp');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.background(-1));

          case 4:
            driver.adb.goToHome.calledOnce.should.be['true'];
            driver.adb.startApp.notCalled.should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('getStrings', (0, _appiumTestSupport.withMocks)({ helpers: _libAndroidHelpers2['default'] }, function (mocks) {
    it('should return app strings', function callee$2$0() {
      var strings;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.bootstrap.sendAction = function () {
              return '';
            };
            mocks.helpers.expects("pushStrings").returns({ test: 'en_value' });
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getStrings('en'));

          case 4:
            strings = context$3$0.sent;

            strings.test.should.equal('en_value');
            mocks.helpers.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return cached app strings for the specified language', function callee$2$0() {
      var strings;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.adb.getDeviceLanguage = function () {
              return 'en';
            };
            driver.apkStrings.en = { test: 'en_value' };
            driver.apkStrings.fr = { test: 'fr_value' };
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.getStrings('fr'));

          case 5:
            strings = context$3$0.sent;

            strings.test.should.equal('fr_value');

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return cached app strings for the device language', function callee$2$0() {
      var strings;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.adb.getDeviceLanguage = function () {
              return 'en';
            };
            driver.apkStrings.en = { test: 'en_value' };
            driver.apkStrings.fr = { test: 'fr_value' };
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.getStrings());

          case 5:
            strings = context$3$0.sent;

            strings.test.should.equal('en_value');

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('launchApp', function () {
    it('should init and start app', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'initAUT');
            sandbox.stub(driver, 'startAUT');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.launchApp());

          case 4:
            driver.initAUT.calledOnce.should.be['true'];
            driver.startAUT.calledOnce.should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('startActivity', function () {
    var params = undefined;
    beforeEach(function () {
      params = { pkg: 'pkg', activity: 'act', waitPkg: 'wpkg', waitActivity: 'wact',
        action: 'act', category: 'cat', flags: 'flgs', optionalIntentArguments: 'opt' };
      sandbox.stub(driver.adb, 'startApp');
    });
    it('should start activity', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            params.optionalIntentArguments = 'opt';
            params.stopApp = false;
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.startActivity('pkg', 'act', 'wpkg', 'wact', 'act', 'cat', 'flgs', 'opt', true));

          case 4:
            driver.adb.startApp.calledWithExactly(params).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should use dontStopAppOnReset from opts if it is not passed as param', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.dontStopAppOnReset = true;
            params.stopApp = false;
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.startActivity('pkg', 'act', 'wpkg', 'wact', 'act', 'cat', 'flgs', 'opt'));

          case 4:
            driver.adb.startApp.calledWithExactly(params).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should use appPackage and appActivity if appWaitPackage and appWaitActivity are undefined', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            params.waitPkg = 'pkg';
            params.waitActivity = 'act';
            params.stopApp = true;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.startActivity('pkg', 'act', null, null, 'act', 'cat', 'flgs', 'opt', false));

          case 5:
            driver.adb.startApp.calledWithExactly(params).should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('reset', function () {
    it('should reset app via reinstall if fullReset is true', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.fullReset = true;
            driver.opts.appPackage = 'pkg';
            sandbox.stub(driver.adb, 'stopAndClear');
            sandbox.stub(driver.adb, 'uninstallApk');
            sandbox.stub(_libAndroidHelpers2['default'], 'installApkRemotely');
            sandbox.stub(driver, 'grantPermissions');
            sandbox.stub(driver, 'startAUT').returns('aut');
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(driver.reset().should.eventually.be.equal('aut'));

          case 9:
            driver.adb.stopAndClear.calledWithExactly('pkg').should.be['true'];
            driver.adb.uninstallApk.calledWithExactly('pkg').should.be['true'];
            _libAndroidHelpers2['default'].installApkRemotely.calledWithExactly(driver.adb, driver.opts).should.be['true'];
            driver.grantPermissions.calledOnce.should.be['true'];
            driver.startAUT.calledOnce.should.be['true'];

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should do fast reset if fullReset is false', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.fullReset = false;
            driver.opts.appPackage = 'pkg';
            sandbox.stub(driver.adb, 'stopAndClear');
            sandbox.stub(driver, 'grantPermissions');
            sandbox.stub(driver, 'startAUT').returns('aut');
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(driver.reset().should.eventually.be.equal('aut'));

          case 7:
            driver.adb.stopAndClear.calledWithExactly('pkg').should.be['true'];
            driver.grantPermissions.calledOnce.should.be['true'];
            driver.startAUT.calledOnce.should.be['true'];

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('startAUT', function () {
    it('should start AUT', function callee$2$0() {
      var params;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts = { appPackage: 'pkg', appActivity: 'act', intentAction: 'actn',
              intentCategory: 'cat', intentFlags: 'flgs', appWaitPackage: 'wpkg',
              appWaitActivity: 'wact', appWaitDuration: 'wdur',
              optionalIntentArguments: 'opt' };
            params = { pkg: 'pkg', activity: 'act', action: 'actn', category: 'cat',
              flags: 'flgs', waitPkg: 'wpkg', waitActivity: 'wact',
              waitDuration: 'wdur', optionalIntentArguments: 'opt', stopApp: false };

            driver.opts.dontStopAppOnReset = true;
            params.stopApp = false;
            sandbox.stub(driver.adb, 'startApp');
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(driver.startAUT());

          case 7:
            driver.adb.startApp.calledWithExactly(params).should.be['true'];

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('setUrl', function () {
    it('should set url', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts = { appPackage: 'pkg' };
            sandbox.stub(driver.adb, 'startUri');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.setUrl('url'));

          case 4:
            driver.adb.startUri.calledWithExactly('url', 'pkg').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('closeApp', function () {
    it('should close app', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts = { appPackage: 'pkg' };
            sandbox.stub(driver.adb, 'forceStop');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.closeApp());

          case 4:
            driver.adb.forceStop.calledWithExactly('pkg').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('getDisplayDensity', function () {
    it('should return the display density of a device', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.adb.shell = function () {
              return '123';
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getDisplayDensity());

          case 3:
            context$3$0.sent.should.equal(123);

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return the display density of an emulator', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.adb.shell = function (cmd) {
              var joinedCmd = cmd.join(' ');
              if (joinedCmd.indexOf('ro.sf') !== -1) {
                // device property look up
                return '';
              } else if (joinedCmd.indexOf('qemu.sf') !== -1) {
                // emulator property look up
                return '456';
              }
              return '';
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getDisplayDensity());

          case 3:
            context$3$0.sent.should.equal(456);

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw an error if the display density property can\'t be found', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.adb.shell = function () {
              return '';
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getDisplayDensity().should.be.rejectedWith(/Failed to get display density property/));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw and error if the display density is not a number', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.adb.shell = function () {
              return 'abc';
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getDisplayDensity().should.be.rejectedWith(/Failed to get display density property/));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('parseSurfaceLine', function () {
    it('should return visible true if the surface is visible', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            (0, _libCommandsGeneral.parseSurfaceLine)('shown=true rect=1 1 1 1').should.be.eql({
              visible: true,
              x: 1,
              y: 1,
              width: 1,
              height: 1
            });

          case 1:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return visible false if the surface is not visible', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            (0, _libCommandsGeneral.parseSurfaceLine)('shown=false rect=1 1 1 1').should.be.eql({
              visible: false,
              x: 1,
              y: 1,
              width: 1,
              height: 1
            });

          case 1:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return the parsed surface bounds', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            (0, _libCommandsGeneral.parseSurfaceLine)('shown=true rect=(1.0,2.0) 3.0 x 4.0').should.be.eql({
              visible: true,
              x: 1,
              y: 2,
              width: 3,
              height: 4
            });

          case 1:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });

  // these are used for both parseWindows and getSystemBars tests
  var validWindowOutput = ['  Window #1 Derp', '    stuff', '      Surface: derp shown=false lalalala rect=(9.0,8.0) 7.0 x 6.0', '    more stuff', '  Window #2 StatusBar', '    blah blah blah', '      Surface: blah blah shown=true blah blah rect=(1.0,2.0) 3.0 x 4.0', '    blah blah blah', '  Window #3 NavigationBar', '    womp womp', '      Surface: blah blah shown=false womp womp rect=(5.0,6.0) 50.0 x 60.0', '    qwerty asd zxc'].join('\n');
  var validSystemBars = {
    statusBar: { visible: true, x: 1, y: 2, width: 3, height: 4 },
    navigationBar: { visible: false, x: 5, y: 6, width: 50, height: 60 }
  };

  describe('parseWindows', function () {
    it('should throw an error if the status bar info wasn\'t found', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            expect(function () {
              (0, _libCommandsGeneral.parseWindows)('');
            }).to['throw'](Error, /Failed to parse status bar information./);

          case 1:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw an error if the navigation bar info wasn\'t found', function callee$2$0() {
      var windowOutput;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            windowOutput = ['  Window #1 StatusBar', '    blah blah blah', '      Surface: blah blah shown=true blah blah rect=(1.0,2.0) 3.0 x 4.0', '    blah blah blah'].join('\n');

            expect(function () {
              (0, _libCommandsGeneral.parseWindows)(windowOutput);
            }).to['throw'](Error, /Failed to parse navigation bar information./);

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return status and navigation bar info when both are given', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            (0, _libCommandsGeneral.parseWindows)(validWindowOutput).should.be.eql(validSystemBars);

          case 1:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('getSystemBars', function () {
    it('should throw an error if there\'s no window manager output', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            driver.adb = {};
            driver.adb.shell = function () {
              return '';
            };
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.getSystemBars().should.be.rejectedWith(/Did not get window manager output./));

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return the parsed system bar info', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            driver.adb = {};
            driver.adb.shell = function () {
              return validWindowOutput;
            };
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.getSystemBars());

          case 5:
            context$3$0.t0 = validSystemBars;
            context$3$0.sent.should.be.eql(context$3$0.t0);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9jb21tYW5kcy9nZW5lcmFsLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O3FCQUMzQixPQUFPOzs7O2dCQUNDLFVBQVU7Ozs7a0NBQ1csK0JBQStCOztpQ0FDMUQsOEJBQThCOzs7O2lDQUN4QixxQkFBcUI7OzZCQUM1QixnQkFBZ0I7O3NDQUNiLDBCQUEwQjs7Ozt3QkFDbEMsVUFBVTs7Ozt5QkFDUixZQUFZOzs7O0FBRTVCLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLElBQUksT0FBTyxHQUFHLG1CQUFNLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNyQyxJQUFJLE1BQU0sR0FBRyxrQkFBSyxNQUFNLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxTQUFTLEVBQUUsWUFBTTtBQUN4QixZQUFVLENBQUMsWUFBTTtBQUNmLFVBQU0sR0FBRyxtQkFBbUIsQ0FBQztBQUM3QixVQUFNLENBQUMsU0FBUyxHQUFHLHlDQUFlLENBQUM7QUFDbkMsVUFBTSxDQUFDLEdBQUcsR0FBRyw0QkFBUyxDQUFDO0FBQ3ZCLFVBQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLFVBQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0dBQ2xCLENBQUMsQ0FBQztBQUNILFdBQVMsQ0FBQyxZQUFNO0FBQ2QsV0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0dBQ25CLENBQUMsQ0FBQztBQUNILFVBQVEsQ0FBQyxNQUFNLEVBQUUsWUFBTTtBQUNyQixNQUFFLENBQUMsZ0RBQWdELEVBQUU7Ozs7QUFDbkQsbUJBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUM3QyxrQkFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcs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N0Isa0JBQU0sQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLGtCQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxZQUFNO0FBQUUscUJBQU8sRUFBRSxDQUFDO2FBQUUsQ0FBQzs7NkNBQ2xDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxvQ0FBb0MsQ0FBQzs7Ozs7OztLQUMxRixDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsMENBQTBDLEVBQUU7Ozs7QUFDN0Msa0JBQU0sR0FBRyxtQkFBbUIsQ0FBQztBQUM3QixrQkFBTSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDaEIsa0JBQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLFlBQU07QUFBRSxxQkFBTyxpQkFBaUIsQ0FBQzthQUFFLENBQUM7OzZDQUNoRCxNQUFNLENBQUMsYUFBYSxFQUFFOzs7NkJBQWdCLGVBQWU7NkJBQTdCLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRzs7Ozs7OztLQUM3QyxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L2NvbW1hbmRzL2dlbmVyYWwtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcclxuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xyXG5pbXBvcnQgc2lub24gZnJvbSAnc2lub24nO1xyXG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLic7XHJcbmltcG9ydCB7IHBhcnNlU3VyZmFjZUxpbmUsIHBhcnNlV2luZG93cyB9IGZyb20gJy4uLy4uLy4uL2xpYi9jb21tYW5kcy9nZW5lcmFsJztcclxuaW1wb3J0IGhlbHBlcnMgZnJvbSAnLi4vLi4vLi4vbGliL2FuZHJvaWQtaGVscGVycyc7XHJcbmltcG9ydCB7IHdpdGhNb2NrcyB9IGZyb20gJ2FwcGl1bS10ZXN0LXN1cHBvcnQnO1xyXG5pbXBvcnQgeyBmcyB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcclxuaW1wb3J0IEJvb3RzdHJhcCBmcm9tICdhcHBpdW0tYW5kcm9pZC1ib290c3RyYXAnO1xyXG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XHJcbmltcG9ydCBBREIgZnJvbSAnYXBwaXVtLWFkYic7XHJcblxyXG5jaGFpLnNob3VsZCgpO1xyXG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XHJcblxyXG5sZXQgZHJpdmVyO1xyXG5sZXQgc2FuZGJveCA9IHNpbm9uLnNhbmRib3guY3JlYXRlKCk7XHJcbmxldCBleHBlY3QgPSBjaGFpLmV4cGVjdDtcclxuXHJcbmRlc2NyaWJlKCdHZW5lcmFsJywgKCkgPT4ge1xyXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xyXG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcclxuICAgIGRyaXZlci5ib290c3RyYXAgPSBuZXcgQm9vdHN0cmFwKCk7XHJcbiAgICBkcml2ZXIuYWRiID0gbmV3IEFEQigpO1xyXG4gICAgZHJpdmVyLmNhcHMgPSB7fTtcclxuICAgIGRyaXZlci5vcHRzID0ge307XHJcbiAgfSk7XHJcbiAgYWZ0ZXJFYWNoKCgpID0+IHtcclxuICAgIHNhbmRib3gucmVzdG9yZSgpO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdrZXlzJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBzZW5kIGtleXMgdmlhIHNldFRleHQgYm9vdHN0cmFwIGNvbW1hbmQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYm9vdHN0cmFwLCAnc2VuZEFjdGlvbicpO1xyXG4gICAgICBkcml2ZXIub3B0cy51bmljb2RlS2V5Ym9hcmQgPSB0cnVlO1xyXG4gICAgICBhd2FpdCBkcml2ZXIua2V5cygna2V5cycpO1xyXG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb25cclxuICAgICAgICAuY2FsbGVkV2l0aEV4YWN0bHkoJ3NldFRleHQnLFxyXG4gICAgICAgICAge3RleHQ6ICdrZXlzJywgcmVwbGFjZTogZmFsc2UsIHVuaWNvZGVLZXlib2FyZDogdHJ1ZX0pXHJcbiAgICAgICAgLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGpvaW4ga2V5cyBpZiBrZXlzIGlzIGFycmF5JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmJvb3RzdHJhcCwgJ3NlbmRBY3Rpb24nKTtcclxuICAgICAgZHJpdmVyLm9wdHMudW5pY29kZUtleWJvYXJkID0gZmFsc2U7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5rZXlzKFsnaycsICdlJywgJ3knLCAncyddKTtcclxuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uXHJcbiAgICAgICAgLmNhbGxlZFdpdGhFeGFjdGx5KCdzZXRUZXh0Jywge3RleHQ6ICdrZXlzJywgcmVwbGFjZTogZmFsc2V9KVxyXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdnZXREZXZpY2VUaW1lJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZGV2aWNlIHRpbWUnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnc2hlbGwnKTtcclxuICAgICAgZHJpdmVyLmFkYi5zaGVsbC5yZXR1cm5zKCcgMTE6MTIgJyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5nZXREZXZpY2VUaW1lKCkuc2hvdWxkLmJlY29tZSgnMTE6MTInKTtcclxuICAgICAgZHJpdmVyLmFkYi5zaGVsbC5jYWxsZWRXaXRoRXhhY3RseShbJ2RhdGUnXSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdGhvcndzIGVycm9yIGlmIHNoZWxsIGNvbW1hbmQgZmFpbGVkJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ3NoZWxsJykudGhyb3dzKCk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5nZXREZXZpY2VUaW1lKCkuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgnQ291bGQgbm90IGNhcHR1cmUnKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdnZXRQYWdlU291cmNlJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gcGFnZSBzb3VyY2UnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYm9vdHN0cmFwLCAnc2VuZEFjdGlvbicpLndpdGhBcmdzKCdzb3VyY2UnKS5yZXR1cm5zKCdzb3VyY2VzJyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRQYWdlU291cmNlKCkuc2hvdWxkLmJlLmVxdWFsKCdzb3VyY2VzJyk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnYmFjaycsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgcHJlc3MgYmFjaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5ib290c3RyYXAsICdzZW5kQWN0aW9uJyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5iYWNrKCk7XHJcbiAgICAgIGRyaXZlci5ib290c3RyYXAuc2VuZEFjdGlvbi5jYWxsZWRXaXRoRXhhY3RseSgncHJlc3NCYWNrJykuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnaXNLZXlib2FyZFNob3duJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiB0aGUga2V5Ym9hcmQgaXMgc2hvd24nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGRyaXZlci5hZGIuaXNTb2Z0S2V5Ym9hcmRQcmVzZW50ID0gKCkgPT4geyByZXR1cm4ge2lzS2V5Ym9hcmRTaG93bjogdHJ1ZSwgY2FuQ2xvc2VLZXlib2FyZDogdHJ1ZX07IH07XHJcbiAgICAgIChhd2FpdCBkcml2ZXIuaXNLZXlib2FyZFNob3duKCkpLnNob3VsZC5lcXVhbCh0cnVlKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgdGhlIGtleWJvYXJkIGlzIG5vdCBzaG93bicsIGFzeW5jICgpID0+IHtcclxuICAgICAgZHJpdmVyLmFkYi5pc1NvZnRLZXlib2FyZFByZXNlbnQgPSAoKSA9PiB7IHJldHVybiB7aXNLZXlib2FyZFNob3duOiBmYWxzZSwgY2FuQ2xvc2VLZXlib2FyZDogdHJ1ZX07IH07XHJcbiAgICAgIChhd2FpdCBkcml2ZXIuaXNLZXlib2FyZFNob3duKCkpLnNob3VsZC5lcXVhbChmYWxzZSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnaGlkZUtleWJvYXJkJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBoaWRlIGtleWJvYXJkIHZpYSBiYWNrIGNvbW1hbmQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdiYWNrJyk7XHJcbiAgICAgIGRyaXZlci5hZGIuaXNTb2Z0S2V5Ym9hcmRQcmVzZW50ID0gKCkgPT4geyByZXR1cm4ge2lzS2V5Ym9hcmRTaG93bjogdHJ1ZSwgY2FuQ2xvc2VLZXlib2FyZDogdHJ1ZX07IH07XHJcbiAgICAgIGF3YWl0IGRyaXZlci5oaWRlS2V5Ym9hcmQoKTtcclxuICAgICAgZHJpdmVyLmJhY2suY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBub3QgY2FsbCBiYWNrIGNvbW1hbmQgaWYgY2FuXFwndCBjbG9zZSBrZXlib2FyZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2JhY2snKTtcclxuICAgICAgZHJpdmVyLmFkYi5pc1NvZnRLZXlib2FyZFByZXNlbnQgPSAoKSA9PiB7IHJldHVybiB7aXNLZXlib2FyZFNob3duOiB0cnVlLCBjYW5DbG9zZUtleWJvYXJkOiBmYWxzZX07IH07XHJcbiAgICAgIGF3YWl0IGRyaXZlci5oaWRlS2V5Ym9hcmQoKTtcclxuICAgICAgZHJpdmVyLmJhY2subm90Q2FsbGVkLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHRocm93IGFuIGVycm9yIGlmIG5vIGtleWJvYXJkIGlzIHByZXNlbnQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGRyaXZlci5hZGIuaXNTb2Z0S2V5Ym9hcmRQcmVzZW50ID0gKCkgPT4geyByZXR1cm4gZmFsc2U7IH07XHJcbiAgICAgIGF3YWl0IGRyaXZlci5oaWRlS2V5Ym9hcmQoKS5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKC9ub3QgcHJlc2VudC8pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ29wZW5TZXR0aW5nc0FjdGl2aXR5JywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBvcGVuIHNldHRpbmdzIGFjdGl2aXR5JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2dldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHknKVxyXG4gICAgICAgIC5yZXR1cm5zKHthcHBQYWNrYWdlOiAncGtnJywgYXBwQWN0aXZpdHk6ICdhY3QnfSk7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnc2hlbGwnKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICd3YWl0Rm9yTm90QWN0aXZpdHknKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLm9wZW5TZXR0aW5nc0FjdGl2aXR5KCdzZXQxJyk7XHJcbiAgICAgIGRyaXZlci5hZGIuc2hlbGwuY2FsbGVkV2l0aEV4YWN0bHkoWydhbScsICdzdGFydCcsICctYScsICdhbmRyb2lkLnNldHRpbmdzLnNldDEnXSlcclxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGRyaXZlci5hZGIud2FpdEZvck5vdEFjdGl2aXR5LmNhbGxlZFdpdGhFeGFjdGx5KCdwa2cnLCAnYWN0JywgNTAwMClcclxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnZ2V0V2luZG93U2l6ZScsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgZ2V0IHdpbmRvdyBzaXplJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmJvb3RzdHJhcCwgJ3NlbmRBY3Rpb24nKVxyXG4gICAgICAgIC53aXRoQXJncygnZ2V0RGV2aWNlU2l6ZScpLnJldHVybnMoJ3NpemUnKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdldFdpbmRvd1NpemUoKS5zaG91bGQuYmUuZXF1YWwoJ3NpemUnKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdnZXRDdXJyZW50QWN0aXZpdHknLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGdldCBjdXJyZW50IGFjdGl2aXR5JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2dldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHknKVxyXG4gICAgICAgIC5yZXR1cm5zKHthcHBBY3Rpdml0eTogJ2FjdCd9KTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdldEN1cnJlbnRBY3Rpdml0eSgpLnNob3VsZC5ldmVudHVhbGx5LmJlLmVxdWFsKCdhY3QnKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdnZXRDdXJyZW50UGFja2FnZScsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgZ2V0IGN1cnJlbnQgYWN0aXZpdHknLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnZ2V0Rm9jdXNlZFBhY2thZ2VBbmRBY3Rpdml0eScpXHJcbiAgICAgICAgLnJldHVybnMoe2FwcFBhY2thZ2U6ICdwa2cnfSk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRDdXJyZW50UGFja2FnZSgpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdwa2cnKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdnZXRMb2dUeXBlcycsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgZ2V0IGxvZyB0eXBlcycsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdldExvZ1R5cGVzKCkuc2hvdWxkLmJlLmRlZXAuZXF1YWwoWydsb2djYXQnXSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnZ2V0TG9nJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBnZXQgbG9nIHR5cGVzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2dldExvZ2NhdExvZ3MnKS5yZXR1cm5zKCdsb2dzJyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRMb2coJ2xvZ2NhdCcpLnNob3VsZC5iZS5lcXVhbCgnbG9ncycpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHRocm93cyBleGNlcHRpb24gaWYgbG9nIHR5cGUgaXMgdW5zdXBwb3J0ZWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGV4cGVjdCgoKSA9PiBkcml2ZXIuZ2V0TG9nKCd1bnN1cHBvcnRlZF90eXBlJykpXHJcbiAgICAgICAgLnRvLnRocm93KCdVbnN1cHBvcnRlZCBsb2cgdHlwZSB1bnN1cHBvcnRlZF90eXBlJyk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnaXNBcHBJbnN0YWxsZWQnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIGFwcCBpcyBpbnN0YWxsZWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnaXNBcHBJbnN0YWxsZWQnKS53aXRoQXJncygncGtnJykucmV0dXJucyh0cnVlKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmlzQXBwSW5zdGFsbGVkKCdwa2cnKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdyZW1vdmVBcHAnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIHJlbW92ZSBhcHAnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAndW5pbnN0YWxsQXBrJykud2l0aEFyZ3MoJ3BrZycpLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5yZW1vdmVBcHAoJ3BrZycpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ2luc3RhbGxBcHAnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGluc3RhbGwgYXBwJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBkcml2ZXIub3B0cy5mYXN0UmVzZXQgPSAnZmFzdFJlc2V0JztcclxuICAgICAgbGV0IGFwcCA9ICdhcHAuYXBrJztcclxuICAgICAgbGV0IG9wdHMgPSB7YXBwOiAnYXBwLmFwaycsIGFwcFBhY2thZ2U6ICdwa2cnLCBmYXN0UmVzZXQ6ICdmYXN0UmVzZXQnfTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5oZWxwZXJzLCAnY29uZmlndXJlQXBwJykud2l0aEFyZ3MoJ2FwcCcsICcuYXBrJylcclxuICAgICAgICAucmV0dXJucyhhcHApO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZnMsICdleGlzdHMnKS53aXRoQXJncyhhcHApLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAncGFja2FnZUFuZExhdW5jaEFjdGl2aXR5RnJvbU1hbmlmZXN0JylcclxuICAgICAgICAud2l0aEFyZ3MoYXBwKS5yZXR1cm5zKHthcGtQYWNrYWdlOiAncGtnJ30pO1xyXG4gICAgICBzYW5kYm94LnN0dWIoaGVscGVycywgJ2luc3RhbGxBcGtSZW1vdGVseScpXHJcbiAgICAgICAgLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5pbnN0YWxsQXBwKCdhcHAnKS5zaG91bGQuZXZlbnR1YWxseS5iZS50cnVlO1xyXG4gICAgICBkcml2ZXIuaGVscGVycy5jb25maWd1cmVBcHAuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgZnMuZXhpc3RzLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGRyaXZlci5hZGIucGFja2FnZUFuZExhdW5jaEFjdGl2aXR5RnJvbU1hbmlmZXN0LmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGhlbHBlcnMuaW5zdGFsbEFwa1JlbW90ZWx5LmNhbGxlZFdpdGhFeGFjdGx5KGRyaXZlci5hZGIsIG9wdHMpXHJcbiAgICAgICAgLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHRocm93IGFuIGVycm9yIGlmIEFQSyBkb2VzIG5vdCBleGlzdCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLmluc3RhbGxBcHAoJ25vbi9leGlzdGVudC9hcHAuYXBrJykuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgvQ291bGQgbm90IGZpbmQvKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdiYWNrZ3JvdW5kJywgZnVuY3Rpb24gKCkge1xyXG4gICAgaXQoJ3Nob3VsZCBicmluZyBhcHAgdG8gYmFja2dyb3VuZCBhbmQgYmFjaycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgY29uc3QgYXBwUGFja2FnZSA9ICd3cGtnJztcclxuICAgICAgY29uc3QgYXBwQWN0aXZpdHkgPSAnd2Fjdic7XHJcbiAgICAgIGRyaXZlci5vcHRzID0ge2FwcFBhY2thZ2UsIGFwcEFjdGl2aXR5LCBpbnRlbnRBY3Rpb246ICdhY3QnLFxyXG4gICAgICAgICAgICAgICAgICAgICBpbnRlbnRDYXRlZ29yeTogJ2NhdCcsIGludGVudEZsYWdzOiAnZmxncycsXHJcbiAgICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsSW50ZW50QXJndW1lbnRzOiAnb3B0J307XHJcbiAgICAgIGxldCBwYXJhbXMgPSB7cGtnOiBhcHBQYWNrYWdlLCBhY3Rpdml0eTogYXBwQWN0aXZpdHksIGFjdGlvbjogJ2FjdCcsIGNhdGVnb3J5OiAnY2F0JyxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnczogJ2ZsZ3MnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsSW50ZW50QXJndW1lbnRzOiAnb3B0Jywgc3RvcEFwcDogZmFsc2V9O1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2dvVG9Ib21lJyk7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnZ2V0Rm9jdXNlZFBhY2thZ2VBbmRBY3Rpdml0eScpXHJcbiAgICAgICAgLnJldHVybnMoe2FwcFBhY2thZ2UsIGFwcEFjdGl2aXR5fSk7XHJcbiAgICAgIHNhbmRib3guc3R1YihCLCAnZGVsYXknKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdzdGFydEFwcCcpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuYmFja2dyb3VuZCgxMCk7XHJcbiAgICAgIGRyaXZlci5hZGIuZ2V0Rm9jdXNlZFBhY2thZ2VBbmRBY3Rpdml0eS5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBkcml2ZXIuYWRiLmdvVG9Ib21lLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIEIuZGVsYXkuY2FsbGVkV2l0aEV4YWN0bHkoMTAwMDApLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBkcml2ZXIuYWRiLnN0YXJ0QXBwLmNhbGxlZFdpdGhFeGFjdGx5KHBhcmFtcykuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgYnJpbmcgYXBwIHRvIGJhY2tncm91bmQgYW5kIGJhY2sgaWYgc3RhcnRlZCBhZnRlciBzZXNzaW9uIGluaXQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGNvbnN0IGFwcFBhY2thZ2UgPSAnbmV3cGtnJztcclxuICAgICAgY29uc3QgYXBwQWN0aXZpdHkgPSAnbmV3YWN2JztcclxuICAgICAgZHJpdmVyLm9wdHMgPSB7YXBwUGFja2FnZTogJ3BrZycsIGFwcEFjdGl2aXR5OiAnYWN2JywgaW50ZW50QWN0aW9uOiAnYWN0JyxcclxuICAgICAgICAgICAgICAgICAgICAgaW50ZW50Q2F0ZWdvcnk6ICdjYXQnLCBpbnRlbnRGbGFnczogJ2ZsZ3MnLFxyXG4gICAgICAgICAgICAgICAgICAgICBvcHRpb25hbEludGVudEFyZ3VtZW50czogJ29wdCd9O1xyXG4gICAgICBsZXQgcGFyYW1zID0ge3BrZzogYXBwUGFja2FnZSwgYWN0aXZpdHk6IGFwcEFjdGl2aXR5LCBhY3Rpb246ICdhY3QnLCBjYXRlZ29yeTogJ2NhdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZ3M6ICdmbGdzJywgd2FpdFBrZzogJ3dwa2cnLCB3YWl0QWN0aXZpdHk6ICd3YWN2JyxcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25hbEludGVudEFyZ3VtZW50czogJ29wdCcsIHN0b3BBcHA6IGZhbHNlfTtcclxuICAgICAgZHJpdmVyLm9wdHMuc3RhcnRBY3Rpdml0eUFyZ3MgPSB7W2Ake2FwcFBhY2thZ2V9LyR7YXBwQWN0aXZpdHl9YF06IHBhcmFtc307XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnZ29Ub0hvbWUnKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdnZXRGb2N1c2VkUGFja2FnZUFuZEFjdGl2aXR5JylcclxuICAgICAgICAucmV0dXJucyh7YXBwUGFja2FnZSwgYXBwQWN0aXZpdHl9KTtcclxuICAgICAgc2FuZGJveC5zdHViKEIsICdkZWxheScpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ3N0YXJ0QXBwJyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5iYWNrZ3JvdW5kKDEwKTtcclxuICAgICAgZHJpdmVyLmFkYi5nZXRGb2N1c2VkUGFja2FnZUFuZEFjdGl2aXR5LmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGRyaXZlci5hZGIuZ29Ub0hvbWUuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgQi5kZWxheS5jYWxsZWRXaXRoRXhhY3RseSgxMDAwMCkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGRyaXZlci5hZGIuc3RhcnRBcHAuY2FsbGVkV2l0aEV4YWN0bHkocGFyYW1zKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBub3QgYnJpbmcgYXBwIGJhY2sgaWYgc2Vjb25kcyBhcmUgbmVnYXRpdmUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnZ29Ub0hvbWUnKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdzdGFydEFwcCcpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuYmFja2dyb3VuZCgtMSk7XHJcbiAgICAgIGRyaXZlci5hZGIuZ29Ub0hvbWUuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgZHJpdmVyLmFkYi5zdGFydEFwcC5ub3RDYWxsZWQuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnZ2V0U3RyaW5ncycsIHdpdGhNb2Nrcyh7aGVscGVyc30sIChtb2NrcykgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gYXBwIHN0cmluZ3MnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGRyaXZlci5ib290c3RyYXAuc2VuZEFjdGlvbiA9ICgpID0+IHsgcmV0dXJuICcnOyB9O1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoXCJwdXNoU3RyaW5nc1wiKVxyXG4gICAgICAgICAgLnJldHVybnMoe3Rlc3Q6ICdlbl92YWx1ZSd9KTtcclxuICAgICAgbGV0IHN0cmluZ3MgPSBhd2FpdCBkcml2ZXIuZ2V0U3RyaW5ncygnZW4nKTtcclxuICAgICAgc3RyaW5ncy50ZXN0LnNob3VsZC5lcXVhbCgnZW5fdmFsdWUnKTtcclxuICAgICAgbW9ja3MuaGVscGVycy52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gY2FjaGVkIGFwcCBzdHJpbmdzIGZvciB0aGUgc3BlY2lmaWVkIGxhbmd1YWdlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBkcml2ZXIuYWRiLmdldERldmljZUxhbmd1YWdlID0gKCkgPT4geyByZXR1cm4gJ2VuJzsgfTtcclxuICAgICAgZHJpdmVyLmFwa1N0cmluZ3MuZW4gPSB7dGVzdDogJ2VuX3ZhbHVlJ307XHJcbiAgICAgIGRyaXZlci5hcGtTdHJpbmdzLmZyID0ge3Rlc3Q6ICdmcl92YWx1ZSd9O1xyXG4gICAgICBsZXQgc3RyaW5ncyA9IGF3YWl0IGRyaXZlci5nZXRTdHJpbmdzKCdmcicpO1xyXG4gICAgICBzdHJpbmdzLnRlc3Quc2hvdWxkLmVxdWFsKCdmcl92YWx1ZScpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiBjYWNoZWQgYXBwIHN0cmluZ3MgZm9yIHRoZSBkZXZpY2UgbGFuZ3VhZ2UnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGRyaXZlci5hZGIuZ2V0RGV2aWNlTGFuZ3VhZ2UgPSAoKSA9PiB7IHJldHVybiAnZW4nOyB9O1xyXG4gICAgICBkcml2ZXIuYXBrU3RyaW5ncy5lbiA9IHt0ZXN0OiAnZW5fdmFsdWUnfTtcclxuICAgICAgZHJpdmVyLmFwa1N0cmluZ3MuZnIgPSB7dGVzdDogJ2ZyX3ZhbHVlJ307XHJcbiAgICAgIGxldCBzdHJpbmdzID0gYXdhaXQgZHJpdmVyLmdldFN0cmluZ3MoKTtcclxuICAgICAgc3RyaW5ncy50ZXN0LnNob3VsZC5lcXVhbCgnZW5fdmFsdWUnKTtcclxuICAgIH0pO1xyXG4gIH0pKTtcclxuICBkZXNjcmliZSgnbGF1bmNoQXBwJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBpbml0IGFuZCBzdGFydCBhcHAnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdpbml0QVVUJyk7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdzdGFydEFVVCcpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIubGF1bmNoQXBwKCk7XHJcbiAgICAgIGRyaXZlci5pbml0QVVULmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGRyaXZlci5zdGFydEFVVC5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ3N0YXJ0QWN0aXZpdHknLCAoKSA9PiB7XHJcbiAgICBsZXQgcGFyYW1zO1xyXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XHJcbiAgICAgIHBhcmFtcyA9IHtwa2c6ICdwa2cnLCBhY3Rpdml0eTogJ2FjdCcsIHdhaXRQa2c6ICd3cGtnJywgd2FpdEFjdGl2aXR5OiAnd2FjdCcsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246ICdhY3QnLCBjYXRlZ29yeTogJ2NhdCcsIGZsYWdzOiAnZmxncycsIG9wdGlvbmFsSW50ZW50QXJndW1lbnRzOiAnb3B0J307XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnc3RhcnRBcHAnKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBzdGFydCBhY3Rpdml0eScsIGFzeW5jICgpID0+IHtcclxuICAgICAgcGFyYW1zLm9wdGlvbmFsSW50ZW50QXJndW1lbnRzID0gJ29wdCc7XHJcbiAgICAgIHBhcmFtcy5zdG9wQXBwID0gZmFsc2U7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFjdGl2aXR5KCdwa2cnLCAnYWN0JywgJ3dwa2cnLCAnd2FjdCcsICdhY3QnLFxyXG4gICAgICAgICdjYXQnLCAnZmxncycsICdvcHQnLCB0cnVlKTtcclxuICAgICAgZHJpdmVyLmFkYi5zdGFydEFwcC5jYWxsZWRXaXRoRXhhY3RseShwYXJhbXMpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHVzZSBkb250U3RvcEFwcE9uUmVzZXQgZnJvbSBvcHRzIGlmIGl0IGlzIG5vdCBwYXNzZWQgYXMgcGFyYW0nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGRyaXZlci5vcHRzLmRvbnRTdG9wQXBwT25SZXNldCA9IHRydWU7XHJcbiAgICAgIHBhcmFtcy5zdG9wQXBwID0gZmFsc2U7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFjdGl2aXR5KCdwa2cnLCAnYWN0JywgJ3dwa2cnLCAnd2FjdCcsICdhY3QnLCAnY2F0JywgJ2ZsZ3MnLCAnb3B0Jyk7XHJcbiAgICAgIGRyaXZlci5hZGIuc3RhcnRBcHAuY2FsbGVkV2l0aEV4YWN0bHkocGFyYW1zKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB1c2UgYXBwUGFja2FnZSBhbmQgYXBwQWN0aXZpdHkgaWYgYXBwV2FpdFBhY2thZ2UgYW5kIGFwcFdhaXRBY3Rpdml0eSBhcmUgdW5kZWZpbmVkJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBwYXJhbXMud2FpdFBrZyA9ICdwa2cnO1xyXG4gICAgICBwYXJhbXMud2FpdEFjdGl2aXR5ID0gJ2FjdCc7XHJcbiAgICAgIHBhcmFtcy5zdG9wQXBwID0gdHJ1ZTtcclxuICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0QWN0aXZpdHkoJ3BrZycsICdhY3QnLCBudWxsLCBudWxsLCAnYWN0JywgJ2NhdCcsICdmbGdzJywgJ29wdCcsIGZhbHNlKTtcclxuICAgICAgZHJpdmVyLmFkYi5zdGFydEFwcC5jYWxsZWRXaXRoRXhhY3RseShwYXJhbXMpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ3Jlc2V0JywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCByZXNldCBhcHAgdmlhIHJlaW5zdGFsbCBpZiBmdWxsUmVzZXQgaXMgdHJ1ZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgZHJpdmVyLm9wdHMuZnVsbFJlc2V0ID0gdHJ1ZTtcclxuICAgICAgZHJpdmVyLm9wdHMuYXBwUGFja2FnZSA9ICdwa2cnO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ3N0b3BBbmRDbGVhcicpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ3VuaW5zdGFsbEFwaycpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoaGVscGVycywgJ2luc3RhbGxBcGtSZW1vdGVseScpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnZ3JhbnRQZXJtaXNzaW9ucycpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnc3RhcnRBVVQnKS5yZXR1cm5zKCdhdXQnKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLnJlc2V0KCkuc2hvdWxkLmV2ZW50dWFsbHkuYmUuZXF1YWwoJ2F1dCcpO1xyXG4gICAgICBkcml2ZXIuYWRiLnN0b3BBbmRDbGVhci5jYWxsZWRXaXRoRXhhY3RseSgncGtnJykuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGRyaXZlci5hZGIudW5pbnN0YWxsQXBrLmNhbGxlZFdpdGhFeGFjdGx5KCdwa2cnKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgaGVscGVycy5pbnN0YWxsQXBrUmVtb3RlbHkuY2FsbGVkV2l0aEV4YWN0bHkoZHJpdmVyLmFkYiwgZHJpdmVyLm9wdHMpXHJcbiAgICAgICAgLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBkcml2ZXIuZ3JhbnRQZXJtaXNzaW9ucy5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBkcml2ZXIuc3RhcnRBVVQuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBkbyBmYXN0IHJlc2V0IGlmIGZ1bGxSZXNldCBpcyBmYWxzZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgZHJpdmVyLm9wdHMuZnVsbFJlc2V0ID0gZmFsc2U7XHJcbiAgICAgIGRyaXZlci5vcHRzLmFwcFBhY2thZ2UgPSAncGtnJztcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdzdG9wQW5kQ2xlYXInKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2dyYW50UGVybWlzc2lvbnMnKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ3N0YXJ0QVVUJykucmV0dXJucygnYXV0Jyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5yZXNldCgpLnNob3VsZC5ldmVudHVhbGx5LmJlLmVxdWFsKCdhdXQnKTtcclxuICAgICAgZHJpdmVyLmFkYi5zdG9wQW5kQ2xlYXIuY2FsbGVkV2l0aEV4YWN0bHkoJ3BrZycpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBkcml2ZXIuZ3JhbnRQZXJtaXNzaW9ucy5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBkcml2ZXIuc3RhcnRBVVQuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdzdGFydEFVVCcsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgc3RhcnQgQVVUJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBkcml2ZXIub3B0cyA9IHthcHBQYWNrYWdlOiAncGtnJywgYXBwQWN0aXZpdHk6ICdhY3QnLCBpbnRlbnRBY3Rpb246ICdhY3RuJyxcclxuICAgICAgICAgICAgICAgICAgICAgaW50ZW50Q2F0ZWdvcnk6ICdjYXQnLCBpbnRlbnRGbGFnczogJ2ZsZ3MnLCBhcHBXYWl0UGFja2FnZTogJ3dwa2cnLFxyXG4gICAgICAgICAgICAgICAgICAgICBhcHBXYWl0QWN0aXZpdHk6ICd3YWN0JywgYXBwV2FpdER1cmF0aW9uOiAnd2R1cicsXHJcbiAgICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsSW50ZW50QXJndW1lbnRzOiAnb3B0J307XHJcbiAgICAgIGxldCBwYXJhbXMgPSB7cGtnOiAncGtnJywgYWN0aXZpdHk6ICdhY3QnLCBhY3Rpb246ICdhY3RuJywgY2F0ZWdvcnk6ICdjYXQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWdzOiAnZmxncycsIHdhaXRQa2c6ICd3cGtnJywgd2FpdEFjdGl2aXR5OiAnd2FjdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgd2FpdER1cmF0aW9uOiAnd2R1cicsIG9wdGlvbmFsSW50ZW50QXJndW1lbnRzOiAnb3B0Jywgc3RvcEFwcDogZmFsc2V9O1xyXG4gICAgICBkcml2ZXIub3B0cy5kb250U3RvcEFwcE9uUmVzZXQgPSB0cnVlO1xyXG4gICAgICBwYXJhbXMuc3RvcEFwcCA9IGZhbHNlO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ3N0YXJ0QXBwJyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFVVCgpO1xyXG4gICAgICBkcml2ZXIuYWRiLnN0YXJ0QXBwLmNhbGxlZFdpdGhFeGFjdGx5KHBhcmFtcykuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnc2V0VXJsJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBzZXQgdXJsJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBkcml2ZXIub3B0cyA9IHthcHBQYWNrYWdlOiAncGtnJ307XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnc3RhcnRVcmknKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLnNldFVybCgndXJsJyk7XHJcbiAgICAgIGRyaXZlci5hZGIuc3RhcnRVcmkuY2FsbGVkV2l0aEV4YWN0bHkoJ3VybCcsICdwa2cnKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdjbG9zZUFwcCcsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgY2xvc2UgYXBwJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBkcml2ZXIub3B0cyA9IHthcHBQYWNrYWdlOiAncGtnJ307XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnZm9yY2VTdG9wJyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5jbG9zZUFwcCgpO1xyXG4gICAgICBkcml2ZXIuYWRiLmZvcmNlU3RvcC5jYWxsZWRXaXRoRXhhY3RseSgncGtnJykuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnZ2V0RGlzcGxheURlbnNpdHknLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgZGlzcGxheSBkZW5zaXR5IG9mIGEgZGV2aWNlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBkcml2ZXIuYWRiLnNoZWxsID0gKCkgPT4geyByZXR1cm4gJzEyMyc7IH07XHJcbiAgICAgIChhd2FpdCBkcml2ZXIuZ2V0RGlzcGxheURlbnNpdHkoKSkuc2hvdWxkLmVxdWFsKDEyMyk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgcmV0dXJuIHRoZSBkaXNwbGF5IGRlbnNpdHkgb2YgYW4gZW11bGF0b3InLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGRyaXZlci5hZGIuc2hlbGwgPSAoY21kKSA9PiB7XHJcbiAgICAgICAgbGV0IGpvaW5lZENtZCA9IGNtZC5qb2luKCcgJyk7XHJcbiAgICAgICAgaWYgKGpvaW5lZENtZC5pbmRleE9mKCdyby5zZicpICE9PSAtMSkge1xyXG4gICAgICAgICAgLy8gZGV2aWNlIHByb3BlcnR5IGxvb2sgdXBcclxuICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9IGVsc2UgaWYgKGpvaW5lZENtZC5pbmRleE9mKCdxZW11LnNmJykgIT09IC0xKSB7XHJcbiAgICAgICAgICAvLyBlbXVsYXRvciBwcm9wZXJ0eSBsb29rIHVwXHJcbiAgICAgICAgICByZXR1cm4gJzQ1Nic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgICAgfTtcclxuICAgICAgKGF3YWl0IGRyaXZlci5nZXREaXNwbGF5RGVuc2l0eSgpKS5zaG91bGQuZXF1YWwoNDU2KTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgZGlzcGxheSBkZW5zaXR5IHByb3BlcnR5IGNhblxcJ3QgYmUgZm91bmQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGRyaXZlci5hZGIuc2hlbGwgPSAoKSA9PiB7IHJldHVybiAnJzsgfTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdldERpc3BsYXlEZW5zaXR5KCkuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgvRmFpbGVkIHRvIGdldCBkaXNwbGF5IGRlbnNpdHkgcHJvcGVydHkvKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBhbmQgZXJyb3IgaWYgdGhlIGRpc3BsYXkgZGVuc2l0eSBpcyBub3QgYSBudW1iZXInLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGRyaXZlci5hZGIuc2hlbGwgPSAoKSA9PiB7IHJldHVybiAnYWJjJzsgfTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdldERpc3BsYXlEZW5zaXR5KCkuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgvRmFpbGVkIHRvIGdldCBkaXNwbGF5IGRlbnNpdHkgcHJvcGVydHkvKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdwYXJzZVN1cmZhY2VMaW5lJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdmlzaWJsZSB0cnVlIGlmIHRoZSBzdXJmYWNlIGlzIHZpc2libGUnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHBhcnNlU3VyZmFjZUxpbmUoJ3Nob3duPXRydWUgcmVjdD0xIDEgMSAxJykuc2hvdWxkLmJlLmVxbCh7XHJcbiAgICAgICAgdmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICB4OiAxLFxyXG4gICAgICAgIHk6IDEsXHJcbiAgICAgICAgd2lkdGg6IDEsXHJcbiAgICAgICAgaGVpZ2h0OiAxXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiB2aXNpYmxlIGZhbHNlIGlmIHRoZSBzdXJmYWNlIGlzIG5vdCB2aXNpYmxlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBwYXJzZVN1cmZhY2VMaW5lKCdzaG93bj1mYWxzZSByZWN0PTEgMSAxIDEnKS5zaG91bGQuYmUuZXFsKHtcclxuICAgICAgICB2aXNpYmxlOiBmYWxzZSxcclxuICAgICAgICB4OiAxLFxyXG4gICAgICAgIHk6IDEsXHJcbiAgICAgICAgd2lkdGg6IDEsXHJcbiAgICAgICAgaGVpZ2h0OiAxXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgcGFyc2VkIHN1cmZhY2UgYm91bmRzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBwYXJzZVN1cmZhY2VMaW5lKCdzaG93bj10cnVlIHJlY3Q9KDEuMCwyLjApIDMuMCB4IDQuMCcpLnNob3VsZC5iZS5lcWwoe1xyXG4gICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgeDogMSxcclxuICAgICAgICB5OiAyLFxyXG4gICAgICAgIHdpZHRoOiAzLFxyXG4gICAgICAgIGhlaWdodDogNFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICAvLyB0aGVzZSBhcmUgdXNlZCBmb3IgYm90aCBwYXJzZVdpbmRvd3MgYW5kIGdldFN5c3RlbUJhcnMgdGVzdHNcclxuICBsZXQgdmFsaWRXaW5kb3dPdXRwdXQgPSBbXHJcbiAgICAnICBXaW5kb3cgIzEgRGVycCcsXHJcbiAgICAnICAgIHN0dWZmJyxcclxuICAgICcgICAgICBTdXJmYWNlOiBkZXJwIHNob3duPWZhbHNlIGxhbGFsYWxhIHJlY3Q9KDkuMCw4LjApIDcuMCB4IDYuMCcsXHJcbiAgICAnICAgIG1vcmUgc3R1ZmYnLFxyXG4gICAgJyAgV2luZG93ICMyIFN0YXR1c0JhcicsXHJcbiAgICAnICAgIGJsYWggYmxhaCBibGFoJyxcclxuICAgICcgICAgICBTdXJmYWNlOiBibGFoIGJsYWggc2hvd249dHJ1ZSBibGFoIGJsYWggcmVjdD0oMS4wLDIuMCkgMy4wIHggNC4wJyxcclxuICAgICcgICAgYmxhaCBibGFoIGJsYWgnLFxyXG4gICAgJyAgV2luZG93ICMzIE5hdmlnYXRpb25CYXInLFxyXG4gICAgJyAgICB3b21wIHdvbXAnLFxyXG4gICAgJyAgICAgIFN1cmZhY2U6IGJsYWggYmxhaCBzaG93bj1mYWxzZSB3b21wIHdvbXAgcmVjdD0oNS4wLDYuMCkgNTAuMCB4IDYwLjAnLFxyXG4gICAgJyAgICBxd2VydHkgYXNkIHp4YydcclxuICBdLmpvaW4oJ1xcbicpO1xyXG4gIGxldCB2YWxpZFN5c3RlbUJhcnMgPSB7XHJcbiAgICBzdGF0dXNCYXI6IHt2aXNpYmxlOiB0cnVlLCB4OiAxLCB5OiAyLCB3aWR0aDogMywgaGVpZ2h0OiA0fSxcclxuICAgIG5hdmlnYXRpb25CYXI6IHt2aXNpYmxlOiBmYWxzZSwgeDogNSwgeTogNiwgd2lkdGg6IDUwLCBoZWlnaHQ6IDYwfVxyXG4gIH07XHJcblxyXG4gIGRlc2NyaWJlKCdwYXJzZVdpbmRvd3MnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIHRocm93IGFuIGVycm9yIGlmIHRoZSBzdGF0dXMgYmFyIGluZm8gd2FzblxcJ3QgZm91bmQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGV4cGVjdCgoKSA9PiB7IHBhcnNlV2luZG93cygnJyk7IH0pXHJcbiAgICAgICAgLnRvLnRocm93KEVycm9yLCAvRmFpbGVkIHRvIHBhcnNlIHN0YXR1cyBiYXIgaW5mb3JtYXRpb24uLyk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIG5hdmlnYXRpb24gYmFyIGluZm8gd2FzblxcJ3QgZm91bmQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGxldCB3aW5kb3dPdXRwdXQgPSBbXHJcbiAgICAgICAgJyAgV2luZG93ICMxIFN0YXR1c0JhcicsXHJcbiAgICAgICAgJyAgICBibGFoIGJsYWggYmxhaCcsXHJcbiAgICAgICAgJyAgICAgIFN1cmZhY2U6IGJsYWggYmxhaCBzaG93bj10cnVlIGJsYWggYmxhaCByZWN0PSgxLjAsMi4wKSAzLjAgeCA0LjAnLFxyXG4gICAgICAgICcgICAgYmxhaCBibGFoIGJsYWgnXHJcbiAgICAgIF0uam9pbignXFxuJyk7XHJcbiAgICAgIGV4cGVjdCgoKSA9PiB7IHBhcnNlV2luZG93cyh3aW5kb3dPdXRwdXQpOyB9KVxyXG4gICAgICAgIC50by50aHJvdyhFcnJvciwgL0ZhaWxlZCB0byBwYXJzZSBuYXZpZ2F0aW9uIGJhciBpbmZvcm1hdGlvbi4vKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gc3RhdHVzIGFuZCBuYXZpZ2F0aW9uIGJhciBpbmZvIHdoZW4gYm90aCBhcmUgZ2l2ZW4nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHBhcnNlV2luZG93cyh2YWxpZFdpbmRvd091dHB1dCkuc2hvdWxkLmJlLmVxbCh2YWxpZFN5c3RlbUJhcnMpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ2dldFN5c3RlbUJhcnMnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIHRocm93IGFuIGVycm9yIGlmIHRoZXJlXFwncyBubyB3aW5kb3cgbWFuYWdlciBvdXRwdXQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XHJcbiAgICAgIGRyaXZlci5hZGIgPSB7fTtcclxuICAgICAgZHJpdmVyLmFkYi5zaGVsbCA9ICgpID0+IHsgcmV0dXJuICcnOyB9O1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0U3lzdGVtQmFycygpLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoL0RpZCBub3QgZ2V0IHdpbmRvdyBtYW5hZ2VyIG91dHB1dC4vKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdGhlIHBhcnNlZCBzeXN0ZW0gYmFyIGluZm8nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XHJcbiAgICAgIGRyaXZlci5hZGIgPSB7fTtcclxuICAgICAgZHJpdmVyLmFkYi5zaGVsbCA9ICgpID0+IHsgcmV0dXJuIHZhbGlkV2luZG93T3V0cHV0OyB9O1xyXG4gICAgICAoYXdhaXQgZHJpdmVyLmdldFN5c3RlbUJhcnMoKSkuc2hvdWxkLmJlLmVxbCh2YWxpZFN5c3RlbUJhcnMpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi5cXC4uIn0=
