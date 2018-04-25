'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _libLogger = require('../../lib/logger');

var _libLogger2 = _interopRequireDefault(_libLogger);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _libAndroidHelpers = require('../../lib/android-helpers');

var _libAndroidHelpers2 = _interopRequireDefault(_libAndroidHelpers);

var _appiumTestSupport = require('appium-test-support');

var _ = require('../..');

var _2 = _interopRequireDefault(_);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _appiumBaseDriver = require('appium-base-driver');

var _appiumSupport = require('appium-support');

var _sharedPreferencesBuilder = require('shared-preferences-builder');

var driver = undefined;
var sandbox = _sinon2['default'].sandbox.create();
var expect = _chai2['default'].expect;
_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('driver', function () {
  describe('constructor', function () {
    it('should call BaseDriver constructor with opts', function () {
      var driver = new _2['default']({ foo: 'bar' });
      driver.should.exist;
      driver.opts.foo.should.equal('bar');
    });
    it('should have this.findElOrEls', function () {
      var driver = new _2['default']({ foo: 'bar' });
      driver.findElOrEls.should.exist;
      driver.findElOrEls.should.be.a('function');
    });
  });

  describe('emulator methods', function () {
    describe('fingerprint', function () {
      it('should be rejected if isEmulator is false', function () {
        var driver = new _2['default']();
        sandbox.stub(driver, 'isEmulator').returns(false);
        driver.fingerprint(1111).should.eventually.be.rejectedWith("fingerprint method is only available for emulators");
        driver.isEmulator.calledOnce.should.be['true'];
      });
    });
    describe('sendSMS', function () {
      it('sendSMS should be rejected if isEmulator is false', function () {
        var driver = new _2['default']();
        sandbox.stub(driver, 'isEmulator').returns(false);
        driver.sendSMS(4509, "Hello Appium").should.eventually.be.rejectedWith("sendSMS method is only available for emulators");
        driver.isEmulator.calledOnce.should.be['true'];
      });
    });
  });
  describe('sharedPreferences', function () {
    driver = new _2['default']();
    var adb = new _appiumAdb2['default']();
    driver.adb = adb;
    var builder = new _sharedPreferencesBuilder.SharedPrefsBuilder();
    describe('should skip setting sharedPreferences', (0, _appiumTestSupport.withMocks)({ driver: driver }, function (mocks) {
      it('on undefined name', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              driver.opts.sharedPreferences = {};
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(driver.setSharedPreferences());

            case 3:
              context$4$0.sent.should.be['false'];

              mocks.driver.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('should set sharedPreferences', (0, _appiumTestSupport.withMocks)({ driver: driver, adb: adb, builder: builder, fs: _appiumSupport.fs }, function (mocks) {
      it('on defined sharedPreferences object', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              driver.opts.appPackage = 'io.appium.test';
              driver.opts.sharedPreferences = {
                name: 'com.appium.prefs',
                prefs: [{ type: 'string', name: 'mystr', value: 'appium rocks!' }]
              };
              mocks.driver.expects('getPrefsBuilder').once().returns(builder);
              mocks.builder.expects('build').once();
              mocks.builder.expects('toFile').once();
              mocks.adb.expects('shell').once().withExactArgs(['mkdir', '-p', '/data/data/io.appium.test/shared_prefs']);
              mocks.adb.expects('push').once().withExactArgs('/tmp/com.appium.prefs.xml', '/data/data/io.appium.test/shared_prefs/com.appium.prefs.xml');
              mocks.fs.expects('exists').once().withExactArgs('/tmp/com.appium.prefs.xml').returns(true);
              mocks.fs.expects('unlink').once().withExactArgs('/tmp/com.appium.prefs.xml');
              context$4$0.next = 11;
              return _regeneratorRuntime.awrap(driver.setSharedPreferences());

            case 11:
              mocks.driver.verify();
              mocks.adb.verify();
              mocks.builder.verify();
              mocks.fs.verify();

            case 15:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
  });

  describe('createSession', function () {
    beforeEach(function () {
      driver = new _2['default']();
      sandbox.stub(driver, 'checkAppPresent');
      sandbox.stub(driver, 'checkPackagePresent');
      sandbox.stub(driver, 'startAndroidSession');
      sandbox.stub(_appiumAdb2['default'], 'createADB', function callee$3$0(opts) {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          var _this2 = this;

          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              return context$4$0.abrupt('return', {
                getDevicesWithRetry: function getDevicesWithRetry() {
                  return _regeneratorRuntime.async(function getDevicesWithRetry$(context$5$0) {
                    while (1) switch (context$5$0.prev = context$5$0.next) {
                      case 0:
                        return context$5$0.abrupt('return', [{ udid: 'emulator-1234' }, { udid: 'rotalume-1337' }]);

                      case 1:
                      case 'end':
                        return context$5$0.stop();
                    }
                  }, null, _this2);
                },
                getPortFromEmulatorString: function getPortFromEmulatorString() {
                  return 1234;
                },
                setDeviceId: function setDeviceId() {},
                setEmulatorPort: function setEmulatorPort() {},
                adbPort: opts.adbPort,
                networkSpeed: function networkSpeed() {}
              });

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });
    afterEach(function () {
      sandbox.restore();
    });
    it('should verify device is an emulator', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.avd = "Nexus_5X_Api_23";
            driver.isEmulator().should.equal(true);
            driver.opts.avd = undefined;
            driver.opts.udid = "emulator-5554";
            driver.isEmulator().should.equal(true);
            driver.opts.udid = "01234567889";
            driver.isEmulator().should.equal(false);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get java version if none is provided', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession({ platformName: 'Android', deviceName: 'device', app: '/path/to/some.apk' }));

          case 2:
            driver.opts.javaVersion.should.exist;

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get browser package details if browserName is provided', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.spy(_libAndroidHelpers2['default'], 'getChromePkg');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession({ platformName: 'Android', deviceName: 'device', browserName: 'Chrome' }));

          case 3:
            _libAndroidHelpers2['default'].getChromePkg.calledOnce.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should check an app is present', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession({ platformName: 'Android', deviceName: 'device', app: '/path/to/some.apk' }));

          case 2:
            driver.checkAppPresent.calledOnce.should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should check a package is present', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession({ platformName: 'Android', deviceName: 'device', appPackage: 'some.app.package' }));

          case 2:
            driver.checkPackagePresent.calledOnce.should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should accept a package via the app capability', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession({ platformName: 'Android', deviceName: 'device', app: 'some.app.package' }));

          case 2:
            driver.checkPackagePresent.calledOnce.should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should add server details to caps', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession({ platformName: 'Android', deviceName: 'device', appPackage: 'some.app.package' }));

          case 2:
            driver.caps.webStorageEnabled.should.exist;

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should delete a session on failure', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            // Force an error to make sure deleteSession gets called
            sandbox.stub(_libAndroidHelpers2['default'], 'getJavaVersion').throws();
            sandbox.stub(driver, 'deleteSession');
            context$3$0.prev = 2;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.createSession({ platformName: 'Android', deviceName: 'device', appPackage: 'some.app.package' }));

          case 5:
            context$3$0.next = 9;
            break;

          case 7:
            context$3$0.prev = 7;
            context$3$0.t0 = context$3$0['catch'](2);

          case 9:
            driver.deleteSession.calledOnce.should.be['true'];

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this, [[2, 7]]);
    });
    it('should pass along adbPort capability to ADB', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession({ platformName: 'Android', deviceName: 'device', appPackage: 'some.app.package', adbPort: 1111 }));

          case 2:
            driver.adb.adbPort.should.equal(1111);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should proxy screenshot if nativeWebScreenshot is off', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession({ platformName: 'Android', deviceName: 'device', browserName: 'chrome', nativeWebScreenshot: false }));

          case 2:
            driver.getProxyAvoidList().should.have.length(8);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not proxy screenshot if nativeWebScreenshot is on', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession({ platformName: 'Android', deviceName: 'device', browserName: 'chrome', nativeWebScreenshot: true }));

          case 2:
            driver.getProxyAvoidList().should.have.length(9);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should set networkSpeed before launching app', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'isEmulator').returns(true);
            sandbox.stub(_libAndroidHelpers2['default'], 'ensureNetworkSpeed').returns('full');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.createSession({ platformName: 'Android', deviceName: 'device', appPackage: 'some.app.package', networkSpeed: 'edge' }));

          case 4:
            driver.isEmulator.calledOnce.should.be['true'];
            _libAndroidHelpers2['default'].ensureNetworkSpeed.calledOnce.should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('deleteSession', function () {
    beforeEach(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            driver.adb = new _appiumAdb2['default']();
            driver.bootstrap = new _libAndroidHelpers2['default'].bootstrap(driver.adb);
            sandbox.stub(driver, 'stopChromedriverProxies');
            sandbox.stub(driver.adb, 'setIME');
            sandbox.stub(driver.adb, 'forceStop');
            sandbox.stub(driver.adb, 'goToHome');
            sandbox.stub(driver.adb, 'uninstallApk');
            sandbox.stub(driver.adb, 'stopLogcat');
            sandbox.stub(driver.bootstrap, 'shutdown');
            sandbox.spy(_libLogger2['default'], 'debug');

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    afterEach(function () {
      sandbox.restore();
    });
    it('should not do anything if Android Driver has already shut down', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.bootstrap = null;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 3:
            _libLogger2['default'].debug.callCount.should.eql(3);
            driver.stopChromedriverProxies.called.should.be['false'];
            driver.adb.stopLogcat.called.should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should reset keyboard to default IME', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.unicodeKeyboard = true;
            driver.opts.resetKeyboard = true;
            driver.defaultIME = 'someDefaultIME';
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 5:
            driver.adb.setIME.calledOnce.should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should force stop non-Chrome sessions', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 2:
            driver.adb.forceStop.calledOnce.should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should uninstall APK if required', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.fullReset = true;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 3:
            driver.adb.uninstallApk.calledOnce.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('dismissChromeWelcome', function () {
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();

          case 1:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should verify chromeOptions args', function () {
      driver.opts = {};
      driver.shouldDismissChromeWelcome().should.be['false'];
      driver.opts = { chromeOptions: {} };
      driver.shouldDismissChromeWelcome().should.be['false'];
      driver.opts = { chromeOptions: { args: [] } };
      driver.shouldDismissChromeWelcome().should.be['false'];
      driver.opts = { chromeOptions: { args: "--no-first-run" } };
      driver.shouldDismissChromeWelcome().should.be['false'];
      driver.opts = { chromeOptions: { args: ["--disable-dinosaur-easter-egg"] } };
      driver.shouldDismissChromeWelcome().should.be['false'];
      driver.opts = { chromeOptions: { args: ["--no-first-run"] } };
      driver.shouldDismissChromeWelcome().should.be['true'];
    });
  });
  describe('initAUT', (0, _appiumTestSupport.withMocks)({ helpers: _libAndroidHelpers2['default'] }, function (mocks) {
    beforeEach(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            driver.caps = {};

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw error if run with full reset', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts = { appPackage: "app.package", appActivity: "act", fullReset: true };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.initAUT().should.be.rejectedWith(/Full reset requires an app capability/));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should reset if run with fast reset', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts = { appPackage: "app.package", appActivity: "act", fullReset: false, fastReset: true };
            driver.adb = "mock_adb";
            mocks.helpers.expects("resetApp").withExactArgs("mock_adb", undefined, "app.package", true);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.initAUT());

          case 5:
            mocks.helpers.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should keep data if run without reset', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts = { appPackage: "app.package", appActivity: "act", fullReset: false, fastReset: false };
            mocks.helpers.expects("resetApp").never();
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.initAUT());

          case 4:
            mocks.helpers.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('startAndroidSession', function () {
    beforeEach(function callee$2$0() {
      var fakeBootstrap;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            driver.adb = new _appiumAdb2['default']();
            driver.bootstrap = new _libAndroidHelpers2['default'].bootstrap(driver.adb);
            driver.settings = { update: function update() {} };
            driver.caps = {};

            // create a fake bootstrap because we can't mock
            // driver.bootstrap.<whatever> in advance
            fakeBootstrap = { start: function start() {},
              onUnexpectedShutdown: { 'catch': function _catch() {} }
            };

            sandbox.stub(_libAndroidHelpers2['default'], 'initDevice');
            sandbox.stub(_libAndroidHelpers2['default'], 'unlock');
            sandbox.stub(_libAndroidHelpers2['default'], 'bootstrap').returns(fakeBootstrap);
            sandbox.stub(driver, 'initAUT');
            sandbox.stub(driver, 'startAUT');
            sandbox.stub(driver, 'defaultWebviewName');
            sandbox.stub(driver, 'setContext');
            sandbox.stub(driver, 'startChromeSession');
            sandbox.stub(driver, 'dismissChromeWelcome');
            sandbox.stub(driver.settings, 'update');
            sandbox.stub(driver.adb, 'getPlatformVersion');
            sandbox.stub(driver.adb, 'getScreenSize');
            sandbox.stub(driver.adb, 'getModel');
            sandbox.stub(driver.adb, 'getManufacturer');

          case 20:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    afterEach(function () {
      sandbox.restore();
    });
    it('should set actual platform version', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.startAndroidSession());

          case 2:
            driver.adb.getPlatformVersion.calledOnce.should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should auto launch app if it is on the device', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.autoLaunch = true;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.startAndroidSession());

          case 3:
            driver.initAUT.calledOnce.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should handle chrome sessions', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.browserName = 'Chrome';
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.startAndroidSession());

          case 3:
            driver.startChromeSession.calledOnce.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should unlock the device', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.startAndroidSession());

          case 2:
            _libAndroidHelpers2['default'].unlock.calledOnce.should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should start AUT if auto lauching', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.autoLaunch = true;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.startAndroidSession());

          case 3:
            driver.initAUT.calledOnce.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not start AUT if not auto lauching', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.autoLaunch = false;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.startAndroidSession());

          case 3:
            driver.initAUT.calledOnce.should.be['false'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should set the context if autoWebview is requested', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.autoWebview = true;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.startAndroidSession());

          case 3:
            driver.defaultWebviewName.calledOnce.should.be['true'];
            driver.setContext.calledOnce.should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should set the context if autoWebview is requested using timeout', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.setContext.onCall(0).throws(_appiumBaseDriver.errors.NoSuchContextError);
            driver.setContext.onCall(1).returns();

            driver.opts.autoWebview = true;
            driver.opts.autoWebviewTimeout = 5000;
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.startAndroidSession());

          case 6:
            driver.defaultWebviewName.calledOnce.should.be['true'];
            driver.setContext.calledTwice.should.be['true'];

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should respect timeout if autoWebview is requested', function callee$2$0() {
      var begin, end;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            this.timeout(10000);
            driver.setContext.throws(new _appiumBaseDriver.errors.NoSuchContextError());

            begin = Date.now();

            driver.opts.autoWebview = true;
            driver.opts.autoWebviewTimeout = 5000;
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(driver.startAndroidSession().should.eventually.be.rejected);

          case 7:
            driver.defaultWebviewName.calledOnce.should.be['true'];

            // we have a timeout of 5000ms, retrying on 500ms, so expect 10 times
            driver.setContext.callCount.should.equal(10);

            end = Date.now();

            (end - begin).should.be.above(5000);

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should not set the context if autoWebview is not requested', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.startAndroidSession());

          case 2:
            driver.defaultWebviewName.calledOnce.should.be['false'];
            driver.setContext.calledOnce.should.be['false'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should set ignoreUnimportantViews cap', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.ignoreUnimportantViews = true;

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.startAndroidSession());

          case 3:
            driver.settings.update.calledOnce.should.be['true'];
            driver.settings.update.firstCall.args[0].ignoreUnimportantViews.should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not call dismissChromeWelcome on missing chromeOptions', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.browserName = 'Chrome';
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.startAndroidSession());

          case 3:
            driver.dismissChromeWelcome.calledOnce.should.be['false'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call dismissChromeWelcome', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.browserName = 'Chrome';
            driver.opts.chromeOptions = {
              "args": ["--no-first-run"]
            };
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.startAndroidSession());

          case 4:
            driver.dismissChromeWelcome.calledOnce.should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('validateDesiredCaps', function () {
    before(function () {
      driver = new _2['default']();
    });
    it('should throw an error if caps do not contain an app, package or valid browser', function () {
      expect(function () {
        driver.validateDesiredCaps({ platformName: 'Android', deviceName: 'device' });
      }).to['throw'](/must include/);
      expect(function () {
        driver.validateDesiredCaps({ platformName: 'Android', deviceName: 'device', browserName: 'Netscape Navigator' });
      }).to['throw'](/must include/);
    });
    it('should not throw an error if caps contain an app, package or valid browser', function () {
      expect(function () {
        driver.validateDesiredCaps({ platformName: 'Android', deviceName: 'device', app: '/path/to/some.apk' });
      }).to.not['throw'](Error);
      expect(function () {
        driver.validateDesiredCaps({ platformName: 'Android', deviceName: 'device', browserName: 'Chrome' });
      }).to.not['throw'](Error);
      expect(function () {
        driver.validateDesiredCaps({ platformName: 'Android', deviceName: 'device', appPackage: 'some.app.package' });
      }).to.not['throw'](/must include/);
    });
    it('should not be sensitive to platform name casing', function () {
      expect(function () {
        driver.validateDesiredCaps({ platformName: 'AnDrOiD', deviceName: 'device', app: '/path/to/some.apk' });
      }).to.not['throw'](Error);
    });
    it('should not throw an error if caps contain both an app and browser, for grid compatibility', function () {
      expect(function () {
        driver.validateDesiredCaps({ platformName: 'Android', deviceName: 'device', app: '/path/to/some.apk', browserName: 'iPhone' });
      }).to.not['throw'](Error);
    });
    it('should not throw an error if caps contain androidScreenshotPath capability', function () {
      expect(function () {
        driver.validateDesiredCaps({ platformName: 'Android', deviceName: 'device', app: '/path/to/some.apk', androidScreenshotPath: '/path/to/screenshotdir' });
      }).to.not['throw'](Error);
    });
  });
  describe('proxying', function () {
    before(function () {
      driver = new _2['default']();
      driver.sessionId = 'abc';
    });
    describe('#proxyActive', function () {
      it('should exist', function () {
        driver.proxyActive.should.be.an['instanceof'](Function);
      });
      it('should return false', function () {
        driver.proxyActive('abc').should.be['false'];
      });
      it('should throw an error if session id is wrong', function () {
        (function () {
          driver.proxyActive('aaa');
        }).should['throw'];
      });
    });

    describe('#getProxyAvoidList', function () {
      it('should exist', function () {
        driver.getProxyAvoidList.should.be.an['instanceof'](Function);
      });
      it('should return jwpProxyAvoid array', function () {
        var avoidList = driver.getProxyAvoidList('abc');
        avoidList.should.be.an['instanceof'](Array);
        avoidList.should.eql(driver.jwpProxyAvoid);
      });
      it('should throw an error if session id is wrong', function () {
        (function () {
          driver.getProxyAvoidList('aaa');
        }).should['throw'];
      });
    });

    describe('#canProxy', function () {
      it('should exist', function () {
        driver.canProxy.should.be.an['instanceof'](Function);
      });
      it('should return false', function () {
        driver.canProxy('abc').should.be['false'];
      });
      it('should throw an error if session id is wrong', function () {
        (function () {
          driver.canProxy('aaa');
        }).should['throw'];
      });
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9kcml2ZXItc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O3lCQUM3QixrQkFBa0I7Ozs7cUJBQ2hCLE9BQU87Ozs7aUNBQ0wsMkJBQTJCOzs7O2lDQUNyQixxQkFBcUI7O2dCQUNyQixPQUFPOzs7O3lCQUNqQixZQUFZOzs7O2dDQUNMLG9CQUFvQjs7NkJBQ3hCLGdCQUFnQjs7d0NBQ0EsNEJBQTRCOztBQUcvRCxJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxPQUFPLEdBQUcsbUJBQU0sT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3JDLElBQUksTUFBTSxHQUFHLGtCQUFLLE1BQU0sQ0FBQztBQUN6QixrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsWUFBTTtBQUN2QixVQUFRLENBQUMsYUFBYSxFQUFFLFlBQU07QUFDNUIsTUFBRSxDQUFDLDhDQUE4QyxFQUFFLFlBQU07QUFDdkQsVUFBSSxNQUFNLEdBQUcsa0JBQWtCLEVBQUMsR0FBRyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7QUFDN0MsWUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDcEIsWUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNyQyxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsOEJBQThCLEVBQUUsWUFBTTtBQUN2QyxVQUFJLE1BQU0sR0FBRyxrQkFBa0IsRUFBQyxHQUFHLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztBQUM3QyxZQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDaEMsWUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxV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LFlBQU07QUFDMUIsUUFBRSxDQUFDLGNBQWMsRUFBRSxZQUFNO0FBQ3ZCLGNBQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLGNBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztPQUNuRCxDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMscUJBQXFCLEVBQUUsWUFBTTtBQUM5QixjQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQU0sQ0FBQztPQUN4QyxDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMsOENBQThDLEVBQUUsWUFBTTtBQUN2RCxTQUFDLFlBQU07QUFBRSxnQkFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUFFLENBQUEsQ0FBRSxNQUFNLFNBQU0sQ0FBQztPQUNsRCxDQUFDLENBQUM7S0FDSixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L2RyaXZlci1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xyXG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XHJcbmltcG9ydCBsb2cgZnJvbSAnLi4vLi4vbGliL2xvZ2dlcic7XHJcbmltcG9ydCBzaW5vbiBmcm9tICdzaW5vbic7XHJcbmltcG9ydCBoZWxwZXJzIGZyb20gJy4uLy4uL2xpYi9hbmRyb2lkLWhlbHBlcnMnO1xyXG5pbXBvcnQgeyB3aXRoTW9ja3MgfSBmcm9tICdhcHBpdW0tdGVzdC1zdXBwb3J0JztcclxuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4nO1xyXG5pbXBvcnQgQURCIGZyb20gJ2FwcGl1bS1hZGInO1xyXG5pbXBvcnQgeyBlcnJvcnMgfSBmcm9tICdhcHBpdW0tYmFzZS1kcml2ZXInO1xyXG5pbXBvcnQgeyBmcyB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcclxuaW1wb3J0IHsgU2hhcmVkUHJlZnNCdWlsZGVyIH0gZnJvbSAnc2hhcmVkLXByZWZlcmVuY2VzLWJ1aWxkZXInO1xyXG5cclxuXHJcbmxldCBkcml2ZXI7XHJcbmxldCBzYW5kYm94ID0gc2lub24uc2FuZGJveC5jcmVhdGUoKTtcclxubGV0IGV4cGVjdCA9IGNoYWkuZXhwZWN0O1xyXG5jaGFpLnNob3VsZCgpO1xyXG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XHJcblxyXG5kZXNjcmliZSgnZHJpdmVyJywgKCkgPT4ge1xyXG4gIGRlc2NyaWJlKCdjb25zdHJ1Y3RvcicsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgY2FsbCBCYXNlRHJpdmVyIGNvbnN0cnVjdG9yIHdpdGggb3B0cycsICgpID0+IHtcclxuICAgICAgbGV0IGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKHtmb286ICdiYXInfSk7XHJcbiAgICAgIGRyaXZlci5zaG91bGQuZXhpc3Q7XHJcbiAgICAgIGRyaXZlci5vcHRzLmZvby5zaG91bGQuZXF1YWwoJ2JhcicpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGhhdmUgdGhpcy5maW5kRWxPckVscycsICgpID0+IHtcclxuICAgICAgbGV0IGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKHtmb286ICdiYXInfSk7XHJcbiAgICAgIGRyaXZlci5maW5kRWxPckVscy5zaG91bGQuZXhpc3Q7XHJcbiAgICAgIGRyaXZlci5maW5kRWxPckVscy5zaG91bGQuYmUuYSgnZnVuY3Rpb24nKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICBkZXNjcmliZSgnZW11bGF0b3IgbWV0aG9kcycsICgpID0+IHtcclxuICAgIGRlc2NyaWJlKCdmaW5nZXJwcmludCcsICgpID0+IHtcclxuICAgICAgaXQoJ3Nob3VsZCBiZSByZWplY3RlZCBpZiBpc0VtdWxhdG9yIGlzIGZhbHNlJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xyXG4gICAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdpc0VtdWxhdG9yJykucmV0dXJucyhmYWxzZSk7XHJcbiAgICAgICAgZHJpdmVyLmZpbmdlcnByaW50KDExMTEpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aChcImZpbmdlcnByaW50IG1ldGhvZCBpcyBvbmx5IGF2YWlsYWJsZSBmb3IgZW11bGF0b3JzXCIpO1xyXG4gICAgICAgIGRyaXZlci5pc0VtdWxhdG9yLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBkZXNjcmliZSgnc2VuZFNNUycsICgpID0+IHtcclxuICAgICAgaXQoJ3NlbmRTTVMgc2hvdWxkIGJlIHJlamVjdGVkIGlmIGlzRW11bGF0b3IgaXMgZmFsc2UnLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XHJcbiAgICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2lzRW11bGF0b3InKS5yZXR1cm5zKGZhbHNlKTtcclxuICAgICAgICBkcml2ZXIuc2VuZFNNUyg0NTA5LCBcIkhlbGxvIEFwcGl1bVwiKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoXCJzZW5kU01TIG1ldGhvZCBpcyBvbmx5IGF2YWlsYWJsZSBmb3IgZW11bGF0b3JzXCIpO1xyXG4gICAgICAgIGRyaXZlci5pc0VtdWxhdG9yLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ3NoYXJlZFByZWZlcmVuY2VzJywgKCkgPT4ge1xyXG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcclxuICAgIGxldCBhZGIgPSBuZXcgQURCKCk7XHJcbiAgICBkcml2ZXIuYWRiID0gYWRiO1xyXG4gICAgbGV0IGJ1aWxkZXIgPSBuZXcgU2hhcmVkUHJlZnNCdWlsZGVyKCk7XHJcbiAgICBkZXNjcmliZSgnc2hvdWxkIHNraXAgc2V0dGluZyBzaGFyZWRQcmVmZXJlbmNlcycsIHdpdGhNb2Nrcyh7ZHJpdmVyfSwgKG1vY2tzKSA9PiB7XHJcbiAgICAgIGl0KCdvbiB1bmRlZmluZWQgbmFtZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBkcml2ZXIub3B0cy5zaGFyZWRQcmVmZXJlbmNlcyA9IHt9O1xyXG4gICAgICAgIChhd2FpdCBkcml2ZXIuc2V0U2hhcmVkUHJlZmVyZW5jZXMoKSkuc2hvdWxkLmJlLmZhbHNlO1xyXG4gICAgICAgIG1vY2tzLmRyaXZlci52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KSk7XHJcbiAgICBkZXNjcmliZSgnc2hvdWxkIHNldCBzaGFyZWRQcmVmZXJlbmNlcycsIHdpdGhNb2Nrcyh7ZHJpdmVyLCBhZGIsIGJ1aWxkZXIsIGZzfSwgKG1vY2tzKSA9PiB7XHJcbiAgICAgIGl0KCdvbiBkZWZpbmVkIHNoYXJlZFByZWZlcmVuY2VzIG9iamVjdCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBkcml2ZXIub3B0cy5hcHBQYWNrYWdlID0gJ2lvLmFwcGl1bS50ZXN0JztcclxuICAgICAgICBkcml2ZXIub3B0cy5zaGFyZWRQcmVmZXJlbmNlcyA9IHtcclxuICAgICAgICAgIG5hbWU6ICdjb20uYXBwaXVtLnByZWZzJyxcclxuICAgICAgICAgIHByZWZzOiBbe3R5cGU6ICdzdHJpbmcnLCBuYW1lOiAnbXlzdHInLCB2YWx1ZTonYXBwaXVtIHJvY2tzISd9XVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbW9ja3MuZHJpdmVyLmV4cGVjdHMoJ2dldFByZWZzQnVpbGRlcicpLm9uY2UoKS5yZXR1cm5zKGJ1aWxkZXIpO1xyXG4gICAgICAgIG1vY2tzLmJ1aWxkZXIuZXhwZWN0cygnYnVpbGQnKS5vbmNlKCk7XHJcbiAgICAgICAgbW9ja3MuYnVpbGRlci5leHBlY3RzKCd0b0ZpbGUnKS5vbmNlKCk7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJykub25jZSgpXHJcbiAgICAgICAgICAud2l0aEV4YWN0QXJncyhbJ21rZGlyJywgJy1wJywgJy9kYXRhL2RhdGEvaW8uYXBwaXVtLnRlc3Qvc2hhcmVkX3ByZWZzJ10pO1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdwdXNoJykub25jZSgpXHJcbiAgICAgICAgICAud2l0aEV4YWN0QXJncygnL3RtcC9jb20uYXBwaXVtLnByZWZzLnhtbCcsICcvZGF0YS9kYXRhL2lvLmFwcGl1bS50ZXN0L3NoYXJlZF9wcmVmcy9jb20uYXBwaXVtLnByZWZzLnhtbCcpO1xyXG4gICAgICAgIG1vY2tzLmZzLmV4cGVjdHMoJ2V4aXN0cycpLm9uY2UoKVxyXG4gICAgICAgICAgLndpdGhFeGFjdEFyZ3MoJy90bXAvY29tLmFwcGl1bS5wcmVmcy54bWwnKVxyXG4gICAgICAgICAgLnJldHVybnModHJ1ZSk7XHJcbiAgICAgICAgbW9ja3MuZnMuZXhwZWN0cygndW5saW5rJykub25jZSgpXHJcbiAgICAgICAgICAud2l0aEV4YWN0QXJncygnL3RtcC9jb20uYXBwaXVtLnByZWZzLnhtbCcpO1xyXG4gICAgICAgIGF3YWl0IGRyaXZlci5zZXRTaGFyZWRQcmVmZXJlbmNlcygpO1xyXG4gICAgICAgIG1vY2tzLmRyaXZlci52ZXJpZnkoKTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgICAgbW9ja3MuYnVpbGRlci52ZXJpZnkoKTtcclxuICAgICAgICBtb2Nrcy5mcy52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KSk7XHJcbiAgfSk7XHJcblxyXG4gIGRlc2NyaWJlKCdjcmVhdGVTZXNzaW9uJywgKCkgPT4ge1xyXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XHJcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdjaGVja0FwcFByZXNlbnQnKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2NoZWNrUGFja2FnZVByZXNlbnQnKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ3N0YXJ0QW5kcm9pZFNlc3Npb24nKTtcclxuICAgICAgc2FuZGJveC5zdHViKEFEQiwgJ2NyZWF0ZUFEQicsIGFzeW5jIChvcHRzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGdldERldmljZXNXaXRoUmV0cnk6IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICB7dWRpZDogJ2VtdWxhdG9yLTEyMzQnfSxcclxuICAgICAgICAgICAgICB7dWRpZDogJ3JvdGFsdW1lLTEzMzcnfVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGdldFBvcnRGcm9tRW11bGF0b3JTdHJpbmc6ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIDEyMzQ7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc2V0RGV2aWNlSWQ6ICgpID0+IHt9LFxyXG4gICAgICAgICAgc2V0RW11bGF0b3JQb3J0OiAoKSA9PiB7fSxcclxuICAgICAgICAgIGFkYlBvcnQ6IG9wdHMuYWRiUG9ydCxcclxuICAgICAgICAgIG5ldHdvcmtTcGVlZDogKCkgPT4ge31cclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcclxuICAgICAgc2FuZGJveC5yZXN0b3JlKCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdmVyaWZ5IGRldmljZSBpcyBhbiBlbXVsYXRvcicsIGFzeW5jICgpID0+IHtcclxuICAgICAgZHJpdmVyLm9wdHMuYXZkID0gXCJOZXh1c181WF9BcGlfMjNcIjtcclxuICAgICAgZHJpdmVyLmlzRW11bGF0b3IoKS5zaG91bGQuZXF1YWwodHJ1ZSk7XHJcbiAgICAgIGRyaXZlci5vcHRzLmF2ZCA9IHVuZGVmaW5lZDtcclxuICAgICAgZHJpdmVyLm9wdHMudWRpZCA9IFwiZW11bGF0b3ItNTU1NFwiO1xyXG4gICAgICBkcml2ZXIuaXNFbXVsYXRvcigpLnNob3VsZC5lcXVhbCh0cnVlKTtcclxuICAgICAgZHJpdmVyLm9wdHMudWRpZCA9IFwiMDEyMzQ1Njc4ODlcIjtcclxuICAgICAgZHJpdmVyLmlzRW11bGF0b3IoKS5zaG91bGQuZXF1YWwoZmFsc2UpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGdldCBqYXZhIHZlcnNpb24gaWYgbm9uZSBpcyBwcm92aWRlZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oe3BsYXRmb3JtTmFtZTogJ0FuZHJvaWQnLCBkZXZpY2VOYW1lOiAnZGV2aWNlJywgYXBwOiAnL3BhdGgvdG8vc29tZS5hcGsnfSk7XHJcbiAgICAgIGRyaXZlci5vcHRzLmphdmFWZXJzaW9uLnNob3VsZC5leGlzdDtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBnZXQgYnJvd3NlciBwYWNrYWdlIGRldGFpbHMgaWYgYnJvd3Nlck5hbWUgaXMgcHJvdmlkZWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3B5KGhlbHBlcnMsICdnZXRDaHJvbWVQa2cnKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oe3BsYXRmb3JtTmFtZTogJ0FuZHJvaWQnLCBkZXZpY2VOYW1lOiAnZGV2aWNlJywgYnJvd3Nlck5hbWU6ICdDaHJvbWUnfSk7XHJcbiAgICAgIGhlbHBlcnMuZ2V0Q2hyb21lUGtnLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgY2hlY2sgYW4gYXBwIGlzIHByZXNlbnQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKHtwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJywgZGV2aWNlTmFtZTogJ2RldmljZScsIGFwcDogJy9wYXRoL3RvL3NvbWUuYXBrJ30pO1xyXG4gICAgICBkcml2ZXIuY2hlY2tBcHBQcmVzZW50LmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgY2hlY2sgYSBwYWNrYWdlIGlzIHByZXNlbnQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKHtwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJywgZGV2aWNlTmFtZTogJ2RldmljZScsIGFwcFBhY2thZ2U6ICdzb21lLmFwcC5wYWNrYWdlJ30pO1xyXG4gICAgICBkcml2ZXIuY2hlY2tQYWNrYWdlUHJlc2VudC5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGFjY2VwdCBhIHBhY2thZ2UgdmlhIHRoZSBhcHAgY2FwYWJpbGl0eScsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oe3BsYXRmb3JtTmFtZTogJ0FuZHJvaWQnLCBkZXZpY2VOYW1lOiAnZGV2aWNlJywgYXBwOiAnc29tZS5hcHAucGFja2FnZSd9KTtcclxuICAgICAgZHJpdmVyLmNoZWNrUGFja2FnZVByZXNlbnQuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBhZGQgc2VydmVyIGRldGFpbHMgdG8gY2FwcycsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oe3BsYXRmb3JtTmFtZTogJ0FuZHJvaWQnLCBkZXZpY2VOYW1lOiAnZGV2aWNlJywgYXBwUGFja2FnZTogJ3NvbWUuYXBwLnBhY2thZ2UnfSk7XHJcbiAgICAgIGRyaXZlci5jYXBzLndlYlN0b3JhZ2VFbmFibGVkLnNob3VsZC5leGlzdDtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBkZWxldGUgYSBzZXNzaW9uIG9uIGZhaWx1cmUnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIC8vIEZvcmNlIGFuIGVycm9yIHRvIG1ha2Ugc3VyZSBkZWxldGVTZXNzaW9uIGdldHMgY2FsbGVkXHJcbiAgICAgIHNhbmRib3guc3R1YihoZWxwZXJzLCAnZ2V0SmF2YVZlcnNpb24nKS50aHJvd3MoKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2RlbGV0ZVNlc3Npb24nKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbih7cGxhdGZvcm1OYW1lOiAnQW5kcm9pZCcsIGRldmljZU5hbWU6ICdkZXZpY2UnLCBhcHBQYWNrYWdlOiAnc29tZS5hcHAucGFja2FnZSd9KTtcclxuICAgICAgfSBjYXRjaCAoaWduKSB7fVxyXG4gICAgICBkcml2ZXIuZGVsZXRlU2Vzc2lvbi5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHBhc3MgYWxvbmcgYWRiUG9ydCBjYXBhYmlsaXR5IHRvIEFEQicsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oe3BsYXRmb3JtTmFtZTogJ0FuZHJvaWQnLCBkZXZpY2VOYW1lOiAnZGV2aWNlJywgYXBwUGFja2FnZTogJ3NvbWUuYXBwLnBhY2thZ2UnLCBhZGJQb3J0OiAxMTExfSk7XHJcbiAgICAgIGRyaXZlci5hZGIuYWRiUG9ydC5zaG91bGQuZXF1YWwoMTExMSk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgcHJveHkgc2NyZWVuc2hvdCBpZiBuYXRpdmVXZWJTY3JlZW5zaG90IGlzIG9mZicsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oe3BsYXRmb3JtTmFtZTogJ0FuZHJvaWQnLCBkZXZpY2VOYW1lOiAnZGV2aWNlJywgYnJvd3Nlck5hbWU6ICdjaHJvbWUnLCBuYXRpdmVXZWJTY3JlZW5zaG90OiBmYWxzZX0pO1xyXG4gICAgICBkcml2ZXIuZ2V0UHJveHlBdm9pZExpc3QoKS5zaG91bGQuaGF2ZS5sZW5ndGgoOCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgbm90IHByb3h5IHNjcmVlbnNob3QgaWYgbmF0aXZlV2ViU2NyZWVuc2hvdCBpcyBvbicsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oe3BsYXRmb3JtTmFtZTogJ0FuZHJvaWQnLCBkZXZpY2VOYW1lOiAnZGV2aWNlJywgYnJvd3Nlck5hbWU6ICdjaHJvbWUnLCBuYXRpdmVXZWJTY3JlZW5zaG90OiB0cnVlfSk7XHJcbiAgICAgIGRyaXZlci5nZXRQcm94eUF2b2lkTGlzdCgpLnNob3VsZC5oYXZlLmxlbmd0aCg5KTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBzZXQgbmV0d29ya1NwZWVkIGJlZm9yZSBsYXVuY2hpbmcgYXBwJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnaXNFbXVsYXRvcicpLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIHNhbmRib3guc3R1YihoZWxwZXJzLCAnZW5zdXJlTmV0d29ya1NwZWVkJykucmV0dXJucygnZnVsbCcpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbih7cGxhdGZvcm1OYW1lOiAnQW5kcm9pZCcsIGRldmljZU5hbWU6ICdkZXZpY2UnLCBhcHBQYWNrYWdlOiAnc29tZS5hcHAucGFja2FnZScsIG5ldHdvcmtTcGVlZDogJ2VkZ2UnfSk7XHJcbiAgICAgIGRyaXZlci5pc0VtdWxhdG9yLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGhlbHBlcnMuZW5zdXJlTmV0d29ya1NwZWVkLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnZGVsZXRlU2Vzc2lvbicsICgpID0+IHtcclxuICAgIGJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xyXG4gICAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xyXG4gICAgICBkcml2ZXIuYWRiID0gbmV3IEFEQigpO1xyXG4gICAgICBkcml2ZXIuYm9vdHN0cmFwID0gbmV3IGhlbHBlcnMuYm9vdHN0cmFwKGRyaXZlci5hZGIpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnc3RvcENocm9tZWRyaXZlclByb3hpZXMnKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdzZXRJTUUnKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdmb3JjZVN0b3AnKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdnb1RvSG9tZScpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ3VuaW5zdGFsbEFwaycpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ3N0b3BMb2djYXQnKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5ib290c3RyYXAsICdzaHV0ZG93bicpO1xyXG4gICAgICBzYW5kYm94LnNweShsb2csICdkZWJ1ZycpO1xyXG4gICAgfSk7XHJcbiAgICBhZnRlckVhY2goKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnJlc3RvcmUoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBub3QgZG8gYW55dGhpbmcgaWYgQW5kcm9pZCBEcml2ZXIgaGFzIGFscmVhZHkgc2h1dCBkb3duJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBkcml2ZXIuYm9vdHN0cmFwID0gbnVsbDtcclxuICAgICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcclxuICAgICAgbG9nLmRlYnVnLmNhbGxDb3VudC5zaG91bGQuZXFsKDMpO1xyXG4gICAgICBkcml2ZXIuc3RvcENocm9tZWRyaXZlclByb3hpZXMuY2FsbGVkLnNob3VsZC5iZS5mYWxzZTtcclxuICAgICAgZHJpdmVyLmFkYi5zdG9wTG9nY2F0LmNhbGxlZC5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCByZXNldCBrZXlib2FyZCB0byBkZWZhdWx0IElNRScsIGFzeW5jICgpID0+IHtcclxuICAgICAgZHJpdmVyLm9wdHMudW5pY29kZUtleWJvYXJkID0gdHJ1ZTtcclxuICAgICAgZHJpdmVyLm9wdHMucmVzZXRLZXlib2FyZCA9IHRydWU7XHJcbiAgICAgIGRyaXZlci5kZWZhdWx0SU1FID0gJ3NvbWVEZWZhdWx0SU1FJztcclxuICAgICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcclxuICAgICAgZHJpdmVyLmFkYi5zZXRJTUUuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBmb3JjZSBzdG9wIG5vbi1DaHJvbWUgc2Vzc2lvbnMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XHJcbiAgICAgIGRyaXZlci5hZGIuZm9yY2VTdG9wLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdW5pbnN0YWxsIEFQSyBpZiByZXF1aXJlZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgZHJpdmVyLm9wdHMuZnVsbFJlc2V0ID0gdHJ1ZTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcclxuICAgICAgZHJpdmVyLmFkYi51bmluc3RhbGxBcGsuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdkaXNtaXNzQ2hyb21lV2VsY29tZScsICgpID0+IHtcclxuICAgIGJlZm9yZShhc3luYyAoKSA9PiB7XHJcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdmVyaWZ5IGNocm9tZU9wdGlvbnMgYXJncycsICgpID0+IHtcclxuICAgICAgZHJpdmVyLm9wdHMgPSB7fTtcclxuICAgICAgZHJpdmVyLnNob3VsZERpc21pc3NDaHJvbWVXZWxjb21lKCkuc2hvdWxkLmJlLmZhbHNlO1xyXG4gICAgICBkcml2ZXIub3B0cyA9IHtjaHJvbWVPcHRpb25zOiB7fX07XHJcbiAgICAgIGRyaXZlci5zaG91bGREaXNtaXNzQ2hyb21lV2VsY29tZSgpLnNob3VsZC5iZS5mYWxzZTtcclxuICAgICAgZHJpdmVyLm9wdHMgPSB7Y2hyb21lT3B0aW9uczoge2FyZ3M6IFtdfX07XHJcbiAgICAgIGRyaXZlci5zaG91bGREaXNtaXNzQ2hyb21lV2VsY29tZSgpLnNob3VsZC5iZS5mYWxzZTtcclxuICAgICAgZHJpdmVyLm9wdHMgPSB7Y2hyb21lT3B0aW9uczoge2FyZ3M6IFwiLS1uby1maXJzdC1ydW5cIn19O1xyXG4gICAgICBkcml2ZXIuc2hvdWxkRGlzbWlzc0Nocm9tZVdlbGNvbWUoKS5zaG91bGQuYmUuZmFsc2U7XHJcbiAgICAgIGRyaXZlci5vcHRzID0ge2Nocm9tZU9wdGlvbnM6IHthcmdzOiBbXCItLWRpc2FibGUtZGlub3NhdXItZWFzdGVyLWVnZ1wiXX19O1xyXG4gICAgICBkcml2ZXIuc2hvdWxkRGlzbWlzc0Nocm9tZVdlbGNvbWUoKS5zaG91bGQuYmUuZmFsc2U7XHJcbiAgICAgIGRyaXZlci5vcHRzID0ge2Nocm9tZU9wdGlvbnM6IHthcmdzOiBbXCItLW5vLWZpcnN0LXJ1blwiXX19O1xyXG4gICAgICBkcml2ZXIuc2hvdWxkRGlzbWlzc0Nocm9tZVdlbGNvbWUoKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdpbml0QVVUJywgd2l0aE1vY2tzKHtoZWxwZXJzfSwgKG1vY2tzKSA9PiB7XHJcbiAgICBiZWZvcmVFYWNoKGFzeW5jICgpID0+IHtcclxuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcclxuICAgICAgZHJpdmVyLmNhcHMgPSB7fTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBlcnJvciBpZiBydW4gd2l0aCBmdWxsIHJlc2V0JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBkcml2ZXIub3B0cyA9IHthcHBQYWNrYWdlOiBcImFwcC5wYWNrYWdlXCIsIGFwcEFjdGl2aXR5OiBcImFjdFwiLCBmdWxsUmVzZXQ6IHRydWV9O1xyXG4gICAgICBhd2FpdCBkcml2ZXIuaW5pdEFVVCgpLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoL0Z1bGwgcmVzZXQgcmVxdWlyZXMgYW4gYXBwIGNhcGFiaWxpdHkvKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCByZXNldCBpZiBydW4gd2l0aCBmYXN0IHJlc2V0JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBkcml2ZXIub3B0cyA9IHthcHBQYWNrYWdlOiBcImFwcC5wYWNrYWdlXCIsIGFwcEFjdGl2aXR5OiBcImFjdFwiLCBmdWxsUmVzZXQ6IGZhbHNlLCBmYXN0UmVzZXQ6IHRydWV9O1xyXG4gICAgICBkcml2ZXIuYWRiID0gXCJtb2NrX2FkYlwiO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoXCJyZXNldEFwcFwiKS53aXRoRXhhY3RBcmdzKFwibW9ja19hZGJcIiwgdW5kZWZpbmVkLCBcImFwcC5wYWNrYWdlXCIsIHRydWUpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuaW5pdEFVVCgpO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGtlZXAgZGF0YSBpZiBydW4gd2l0aG91dCByZXNldCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgZHJpdmVyLm9wdHMgPSB7YXBwUGFja2FnZTogXCJhcHAucGFja2FnZVwiLCBhcHBBY3Rpdml0eTogXCJhY3RcIiwgZnVsbFJlc2V0OiBmYWxzZSwgZmFzdFJlc2V0OiBmYWxzZX07XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cyhcInJlc2V0QXBwXCIpLm5ldmVyKCk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5pbml0QVVUKCk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICB9KSk7XHJcbiAgZGVzY3JpYmUoJ3N0YXJ0QW5kcm9pZFNlc3Npb24nLCAoKSA9PiB7XHJcbiAgICBiZWZvcmVFYWNoKGFzeW5jICgpID0+IHtcclxuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcclxuICAgICAgZHJpdmVyLmFkYiA9IG5ldyBBREIoKTtcclxuICAgICAgZHJpdmVyLmJvb3RzdHJhcCA9IG5ldyBoZWxwZXJzLmJvb3RzdHJhcChkcml2ZXIuYWRiKTtcclxuICAgICAgZHJpdmVyLnNldHRpbmdzID0geyB1cGRhdGUgKCkge30gfTtcclxuICAgICAgZHJpdmVyLmNhcHMgPSB7fTtcclxuXHJcbiAgICAgIC8vIGNyZWF0ZSBhIGZha2UgYm9vdHN0cmFwIGJlY2F1c2Ugd2UgY2FuJ3QgbW9ja1xyXG4gICAgICAvLyBkcml2ZXIuYm9vdHN0cmFwLjx3aGF0ZXZlcj4gaW4gYWR2YW5jZVxyXG4gICAgICBsZXQgZmFrZUJvb3RzdHJhcCA9IHtzdGFydCAoKSB7fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb25VbmV4cGVjdGVkU2h1dGRvd246IHtjYXRjaCAoKSB7fX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgc2FuZGJveC5zdHViKGhlbHBlcnMsICdpbml0RGV2aWNlJyk7XHJcbiAgICAgIHNhbmRib3guc3R1YihoZWxwZXJzLCAndW5sb2NrJyk7XHJcbiAgICAgIHNhbmRib3guc3R1YihoZWxwZXJzLCAnYm9vdHN0cmFwJykucmV0dXJucyhmYWtlQm9vdHN0cmFwKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2luaXRBVVQnKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ3N0YXJ0QVVUJyk7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdkZWZhdWx0V2Vidmlld05hbWUnKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ3NldENvbnRleHQnKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ3N0YXJ0Q2hyb21lU2Vzc2lvbicpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnZGlzbWlzc0Nocm9tZVdlbGNvbWUnKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5zZXR0aW5ncywgJ3VwZGF0ZScpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2dldFBsYXRmb3JtVmVyc2lvbicpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2dldFNjcmVlblNpemUnKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdnZXRNb2RlbCcpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2dldE1hbnVmYWN0dXJlcicpO1xyXG4gICAgfSk7XHJcbiAgICBhZnRlckVhY2goKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnJlc3RvcmUoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBzZXQgYWN0dWFsIHBsYXRmb3JtIHZlcnNpb24nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFuZHJvaWRTZXNzaW9uKCk7XHJcbiAgICAgIGRyaXZlci5hZGIuZ2V0UGxhdGZvcm1WZXJzaW9uLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgYXV0byBsYXVuY2ggYXBwIGlmIGl0IGlzIG9uIHRoZSBkZXZpY2UnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGRyaXZlci5vcHRzLmF1dG9MYXVuY2ggPSB0cnVlO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBbmRyb2lkU2Vzc2lvbigpO1xyXG4gICAgICBkcml2ZXIuaW5pdEFVVC5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGhhbmRsZSBjaHJvbWUgc2Vzc2lvbnMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGRyaXZlci5vcHRzLmJyb3dzZXJOYW1lID0gJ0Nocm9tZSc7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFuZHJvaWRTZXNzaW9uKCk7XHJcbiAgICAgIGRyaXZlci5zdGFydENocm9tZVNlc3Npb24uY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB1bmxvY2sgdGhlIGRldmljZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0QW5kcm9pZFNlc3Npb24oKTtcclxuICAgICAgaGVscGVycy51bmxvY2suY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBzdGFydCBBVVQgaWYgYXV0byBsYXVjaGluZycsIGFzeW5jICgpID0+IHtcclxuICAgICAgZHJpdmVyLm9wdHMuYXV0b0xhdW5jaCA9IHRydWU7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFuZHJvaWRTZXNzaW9uKCk7XHJcbiAgICAgIGRyaXZlci5pbml0QVVULmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgbm90IHN0YXJ0IEFVVCBpZiBub3QgYXV0byBsYXVjaGluZycsIGFzeW5jICgpID0+IHtcclxuICAgICAgZHJpdmVyLm9wdHMuYXV0b0xhdW5jaCA9IGZhbHNlO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBbmRyb2lkU2Vzc2lvbigpO1xyXG4gICAgICBkcml2ZXIuaW5pdEFVVC5jYWxsZWRPbmNlLnNob3VsZC5iZS5mYWxzZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBzZXQgdGhlIGNvbnRleHQgaWYgYXV0b1dlYnZpZXcgaXMgcmVxdWVzdGVkJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBkcml2ZXIub3B0cy5hdXRvV2VidmlldyA9IHRydWU7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFuZHJvaWRTZXNzaW9uKCk7XHJcbiAgICAgIGRyaXZlci5kZWZhdWx0V2Vidmlld05hbWUuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgZHJpdmVyLnNldENvbnRleHQuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBzZXQgdGhlIGNvbnRleHQgaWYgYXV0b1dlYnZpZXcgaXMgcmVxdWVzdGVkIHVzaW5nIHRpbWVvdXQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGRyaXZlci5zZXRDb250ZXh0Lm9uQ2FsbCgwKS50aHJvd3MoZXJyb3JzLk5vU3VjaENvbnRleHRFcnJvcik7XHJcbiAgICAgIGRyaXZlci5zZXRDb250ZXh0Lm9uQ2FsbCgxKS5yZXR1cm5zKCk7XHJcblxyXG4gICAgICBkcml2ZXIub3B0cy5hdXRvV2VidmlldyA9IHRydWU7XHJcbiAgICAgIGRyaXZlci5vcHRzLmF1dG9XZWJ2aWV3VGltZW91dCA9IDUwMDA7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFuZHJvaWRTZXNzaW9uKCk7XHJcbiAgICAgIGRyaXZlci5kZWZhdWx0V2Vidmlld05hbWUuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgZHJpdmVyLnNldENvbnRleHQuY2FsbGVkVHdpY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgcmVzcGVjdCB0aW1lb3V0IGlmIGF1dG9XZWJ2aWV3IGlzIHJlcXVlc3RlZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy50aW1lb3V0KDEwMDAwKTtcclxuICAgICAgZHJpdmVyLnNldENvbnRleHQudGhyb3dzKG5ldyBlcnJvcnMuTm9TdWNoQ29udGV4dEVycm9yKCkpO1xyXG5cclxuICAgICAgbGV0IGJlZ2luID0gRGF0ZS5ub3coKTtcclxuXHJcbiAgICAgIGRyaXZlci5vcHRzLmF1dG9XZWJ2aWV3ID0gdHJ1ZTtcclxuICAgICAgZHJpdmVyLm9wdHMuYXV0b1dlYnZpZXdUaW1lb3V0ID0gNTAwMDtcclxuICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0QW5kcm9pZFNlc3Npb24oKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZDtcclxuICAgICAgZHJpdmVyLmRlZmF1bHRXZWJ2aWV3TmFtZS5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xyXG5cclxuICAgICAgLy8gd2UgaGF2ZSBhIHRpbWVvdXQgb2YgNTAwMG1zLCByZXRyeWluZyBvbiA1MDBtcywgc28gZXhwZWN0IDEwIHRpbWVzXHJcbiAgICAgIGRyaXZlci5zZXRDb250ZXh0LmNhbGxDb3VudC5zaG91bGQuZXF1YWwoMTApO1xyXG5cclxuICAgICAgbGV0IGVuZCA9IERhdGUubm93KCk7XHJcbiAgICAgIChlbmQgLSBiZWdpbikuc2hvdWxkLmJlLmFib3ZlKDUwMDApO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIG5vdCBzZXQgdGhlIGNvbnRleHQgaWYgYXV0b1dlYnZpZXcgaXMgbm90IHJlcXVlc3RlZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0QW5kcm9pZFNlc3Npb24oKTtcclxuICAgICAgZHJpdmVyLmRlZmF1bHRXZWJ2aWV3TmFtZS5jYWxsZWRPbmNlLnNob3VsZC5iZS5mYWxzZTtcclxuICAgICAgZHJpdmVyLnNldENvbnRleHQuY2FsbGVkT25jZS5zaG91bGQuYmUuZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgc2V0IGlnbm9yZVVuaW1wb3J0YW50Vmlld3MgY2FwJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBkcml2ZXIub3B0cy5pZ25vcmVVbmltcG9ydGFudFZpZXdzID0gdHJ1ZTtcclxuXHJcbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFuZHJvaWRTZXNzaW9uKCk7XHJcbiAgICAgIGRyaXZlci5zZXR0aW5ncy51cGRhdGUuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgZHJpdmVyLnNldHRpbmdzLnVwZGF0ZS5maXJzdENhbGwuYXJnc1swXS5pZ25vcmVVbmltcG9ydGFudFZpZXdzLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIG5vdCBjYWxsIGRpc21pc3NDaHJvbWVXZWxjb21lIG9uIG1pc3NpbmcgY2hyb21lT3B0aW9ucycsIGFzeW5jICgpID0+IHtcclxuICAgICAgZHJpdmVyLm9wdHMuYnJvd3Nlck5hbWUgPSAnQ2hyb21lJztcclxuICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0QW5kcm9pZFNlc3Npb24oKTtcclxuICAgICAgZHJpdmVyLmRpc21pc3NDaHJvbWVXZWxjb21lLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLmZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGNhbGwgZGlzbWlzc0Nocm9tZVdlbGNvbWUnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGRyaXZlci5vcHRzLmJyb3dzZXJOYW1lID0gJ0Nocm9tZSc7XHJcbiAgICAgIGRyaXZlci5vcHRzLmNocm9tZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgXCJhcmdzXCIgOiBbXCItLW5vLWZpcnN0LXJ1blwiXVxyXG4gICAgICB9O1xyXG4gICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBbmRyb2lkU2Vzc2lvbigpO1xyXG4gICAgICBkcml2ZXIuZGlzbWlzc0Nocm9tZVdlbGNvbWUuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCd2YWxpZGF0ZURlc2lyZWRDYXBzJywgKCkgPT4ge1xyXG4gICAgYmVmb3JlKCgpID0+IHtcclxuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBlcnJvciBpZiBjYXBzIGRvIG5vdCBjb250YWluIGFuIGFwcCwgcGFja2FnZSBvciB2YWxpZCBicm93c2VyJywgKCkgPT4ge1xyXG4gICAgICBleHBlY3QoKCkgPT4ge1xyXG4gICAgICAgIGRyaXZlci52YWxpZGF0ZURlc2lyZWRDYXBzKHtwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJywgZGV2aWNlTmFtZTogJ2RldmljZSd9KTtcclxuICAgICAgfSkudG8udGhyb3coL211c3QgaW5jbHVkZS8pO1xyXG4gICAgICBleHBlY3QoKCkgPT4ge1xyXG4gICAgICAgIGRyaXZlci52YWxpZGF0ZURlc2lyZWRDYXBzKHtwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJywgZGV2aWNlTmFtZTogJ2RldmljZScsIGJyb3dzZXJOYW1lOiAnTmV0c2NhcGUgTmF2aWdhdG9yJ30pO1xyXG4gICAgICB9KS50by50aHJvdygvbXVzdCBpbmNsdWRlLyk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgbm90IHRocm93IGFuIGVycm9yIGlmIGNhcHMgY29udGFpbiBhbiBhcHAsIHBhY2thZ2Ugb3IgdmFsaWQgYnJvd3NlcicsICgpID0+IHtcclxuICAgICAgZXhwZWN0KCgpID0+IHtcclxuICAgICAgICBkcml2ZXIudmFsaWRhdGVEZXNpcmVkQ2Fwcyh7cGxhdGZvcm1OYW1lOiAnQW5kcm9pZCcsIGRldmljZU5hbWU6ICdkZXZpY2UnLCBhcHA6ICcvcGF0aC90by9zb21lLmFwayd9KTtcclxuICAgICAgfSkudG8ubm90LnRocm93KEVycm9yKTtcclxuICAgICAgZXhwZWN0KCgpID0+IHtcclxuICAgICAgICBkcml2ZXIudmFsaWRhdGVEZXNpcmVkQ2Fwcyh7cGxhdGZvcm1OYW1lOiAnQW5kcm9pZCcsIGRldmljZU5hbWU6ICdkZXZpY2UnLCBicm93c2VyTmFtZTogJ0Nocm9tZSd9KTtcclxuICAgICAgfSkudG8ubm90LnRocm93KEVycm9yKTtcclxuICAgICAgZXhwZWN0KCgpID0+IHtcclxuICAgICAgICBkcml2ZXIudmFsaWRhdGVEZXNpcmVkQ2Fwcyh7cGxhdGZvcm1OYW1lOiAnQW5kcm9pZCcsIGRldmljZU5hbWU6ICdkZXZpY2UnLCBhcHBQYWNrYWdlOiAnc29tZS5hcHAucGFja2FnZSd9KTtcclxuICAgICAgfSkudG8ubm90LnRocm93KC9tdXN0IGluY2x1ZGUvKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBub3QgYmUgc2Vuc2l0aXZlIHRvIHBsYXRmb3JtIG5hbWUgY2FzaW5nJywgKCkgPT4ge1xyXG4gICAgICBleHBlY3QoKCkgPT4ge1xyXG4gICAgICAgIGRyaXZlci52YWxpZGF0ZURlc2lyZWRDYXBzKHtwbGF0Zm9ybU5hbWU6ICdBbkRyT2lEJywgZGV2aWNlTmFtZTogJ2RldmljZScsIGFwcDogJy9wYXRoL3RvL3NvbWUuYXBrJ30pO1xyXG4gICAgICB9KS50by5ub3QudGhyb3coRXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIG5vdCB0aHJvdyBhbiBlcnJvciBpZiBjYXBzIGNvbnRhaW4gYm90aCBhbiBhcHAgYW5kIGJyb3dzZXIsIGZvciBncmlkIGNvbXBhdGliaWxpdHknLCAoKSA9PiB7XHJcbiAgICAgIGV4cGVjdCgoKSA9PiB7XHJcbiAgICAgICAgZHJpdmVyLnZhbGlkYXRlRGVzaXJlZENhcHMoe3BsYXRmb3JtTmFtZTogJ0FuZHJvaWQnLCBkZXZpY2VOYW1lOiAnZGV2aWNlJywgYXBwOiAnL3BhdGgvdG8vc29tZS5hcGsnLCBicm93c2VyTmFtZTogJ2lQaG9uZSd9KTtcclxuICAgICAgfSkudG8ubm90LnRocm93KEVycm9yKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBub3QgdGhyb3cgYW4gZXJyb3IgaWYgY2FwcyBjb250YWluIGFuZHJvaWRTY3JlZW5zaG90UGF0aCBjYXBhYmlsaXR5JywgKCkgPT4ge1xyXG4gICAgICBleHBlY3QoKCkgPT4ge1xyXG4gICAgICAgIGRyaXZlci52YWxpZGF0ZURlc2lyZWRDYXBzKHtwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJywgZGV2aWNlTmFtZTogJ2RldmljZScsIGFwcDogJy9wYXRoL3RvL3NvbWUuYXBrJywgYW5kcm9pZFNjcmVlbnNob3RQYXRoOiAnL3BhdGgvdG8vc2NyZWVuc2hvdGRpcid9KTtcclxuICAgICAgfSkudG8ubm90LnRocm93KEVycm9yKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdwcm94eWluZycsICgpID0+IHtcclxuICAgIGJlZm9yZSgoKSA9PiB7XHJcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XHJcbiAgICAgIGRyaXZlci5zZXNzaW9uSWQgPSAnYWJjJztcclxuICAgIH0pO1xyXG4gICAgZGVzY3JpYmUoJyNwcm94eUFjdGl2ZScsICgpID0+IHtcclxuICAgICAgaXQoJ3Nob3VsZCBleGlzdCcsICgpID0+IHtcclxuICAgICAgICBkcml2ZXIucHJveHlBY3RpdmUuc2hvdWxkLmJlLmFuLmluc3RhbmNlb2YoRnVuY3Rpb24pO1xyXG4gICAgICB9KTtcclxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UnLCAoKSA9PiB7XHJcbiAgICAgICAgZHJpdmVyLnByb3h5QWN0aXZlKCdhYmMnKS5zaG91bGQuYmUuZmFsc2U7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpdCgnc2hvdWxkIHRocm93IGFuIGVycm9yIGlmIHNlc3Npb24gaWQgaXMgd3JvbmcnLCAoKSA9PiB7XHJcbiAgICAgICAgKCgpID0+IHsgZHJpdmVyLnByb3h5QWN0aXZlKCdhYWEnKTsgfSkuc2hvdWxkLnRocm93O1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCcjZ2V0UHJveHlBdm9pZExpc3QnLCAoKSA9PiB7XHJcbiAgICAgIGl0KCdzaG91bGQgZXhpc3QnLCAoKSA9PiB7XHJcbiAgICAgICAgZHJpdmVyLmdldFByb3h5QXZvaWRMaXN0LnNob3VsZC5iZS5hbi5pbnN0YW5jZW9mKEZ1bmN0aW9uKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGp3cFByb3h5QXZvaWQgYXJyYXknLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGF2b2lkTGlzdCA9IGRyaXZlci5nZXRQcm94eUF2b2lkTGlzdCgnYWJjJyk7XHJcbiAgICAgICAgYXZvaWRMaXN0LnNob3VsZC5iZS5hbi5pbnN0YW5jZW9mKEFycmF5KTtcclxuICAgICAgICBhdm9pZExpc3Quc2hvdWxkLmVxbChkcml2ZXIuandwUHJveHlBdm9pZCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpdCgnc2hvdWxkIHRocm93IGFuIGVycm9yIGlmIHNlc3Npb24gaWQgaXMgd3JvbmcnLCAoKSA9PiB7XHJcbiAgICAgICAgKCgpID0+IHsgZHJpdmVyLmdldFByb3h5QXZvaWRMaXN0KCdhYWEnKTsgfSkuc2hvdWxkLnRocm93O1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCcjY2FuUHJveHknLCAoKSA9PiB7XHJcbiAgICAgIGl0KCdzaG91bGQgZXhpc3QnLCAoKSA9PiB7XHJcbiAgICAgICAgZHJpdmVyLmNhblByb3h5LnNob3VsZC5iZS5hbi5pbnN0YW5jZW9mKEZ1bmN0aW9uKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlJywgKCkgPT4ge1xyXG4gICAgICAgIGRyaXZlci5jYW5Qcm94eSgnYWJjJykuc2hvdWxkLmJlLmZhbHNlO1xyXG4gICAgICB9KTtcclxuICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBlcnJvciBpZiBzZXNzaW9uIGlkIGlzIHdyb25nJywgKCkgPT4ge1xyXG4gICAgICAgICgoKSA9PiB7IGRyaXZlci5jYW5Qcm94eSgnYWFhJyk7IH0pLnNob3VsZC50aHJvdztcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLiJ9
