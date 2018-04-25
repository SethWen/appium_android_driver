'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _libAndroidHelpers = require('../../lib/android-helpers');

var _libAndroidHelpers2 = _interopRequireDefault(_libAndroidHelpers);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _appiumTestSupport = require('appium-test-support');

var _teen_process = require('teen_process');

var teen_process = _interopRequireWildcard(_teen_process);

var _appiumSupport = require('appium-support');

var _appiumUnlock = require('appium-unlock');

var _libUnlockHelpers = require('../../lib/unlock-helpers');

var _libUnlockHelpers2 = _interopRequireDefault(_libUnlockHelpers);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var should = _chai2['default'].should();
var REMOTE_TEMP_PATH = "/data/local/tmp";
var REMOTE_INSTALL_TIMEOUT = 90000;
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Android Helpers', function () {
  var adb = new _appiumAdb2['default']();
  describe('parseJavaVersion', function () {
    it('should correctly parse java version', function () {
      _libAndroidHelpers2['default'].parseJavaVersion('java version "1.8.0_40"\n        Java(TM) SE Runtime Environment (build 1.8.0_40-b27)').should.be.equal("1.8.0_40");
    });
    it('should return null if it cannot parse java verstion', function () {
      should.not.exist(_libAndroidHelpers2['default'].parseJavaVersion('foo bar'));
    });
    it('should parse OpenJDK versioning', function () {
      _libAndroidHelpers2['default'].parseJavaVersion('openjdk version 1.8').should.be.equal('1.8');
    });
  });

  describe('getJavaVersion', (0, _appiumTestSupport.withMocks)({ teen_process: teen_process }, function (mocks) {
    it('should correctly get java version', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.teen_process.expects('exec').withExactArgs('java', ['-version']).returns({ stderr: 'java version "1.8.0_40"' });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getJavaVersion());

          case 3:
            context$3$0.sent.should.equal('1.8.0_40');

            mocks.teen_process.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return null if it cannot parse java verstion', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.teen_process.expects('exec').withExactArgs('java', ['-version']).returns({ stderr: 'foo bar' });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getJavaVersion().should.eventually.be.rejectedWith('Java'));

          case 3:
            mocks.teen_process.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('prepareEmulator', (0, _appiumTestSupport.withMocks)({ adb: adb, helpers: _libAndroidHelpers2['default'] }, function (mocks) {
    var opts = { avd: "foo@bar", avdArgs: "", language: "en", locale: "us" };
    it('should not launch avd if one is already running', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getRunningAVD').withExactArgs('foobar').returns("foo");
            mocks.adb.expects('launchAVD').never();
            mocks.adb.expects('killEmulator').never();
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].prepareEmulator(adb, opts));

          case 5:
            mocks.adb.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should launch avd if one is already running', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getRunningAVD').withExactArgs('foobar').returns(null);
            mocks.adb.expects('launchAVD').withExactArgs('foo@bar', '', 'en', 'us', undefined, undefined).returns("");
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].prepareEmulator(adb, opts));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should kill emulator if avdArgs contains -wipe-data', function callee$2$0() {
      var opts;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            opts = { avd: "foo@bar", avdArgs: "-wipe-data" };

            mocks.adb.expects('getRunningAVD').withExactArgs('foobar').returns('foo');
            mocks.adb.expects('killEmulator').withExactArgs('foobar').once();
            mocks.adb.expects('launchAVD').once();
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].prepareEmulator(adb, opts));

          case 6:
            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should fail if avd name is not specified', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].prepareEmulator(adb, {}).should.eventually.be.rejected);

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('prepareAVDArgs', (0, _appiumTestSupport.withMocks)({ adb: adb, helpers: _libAndroidHelpers2['default'] }, function (mocks) {
    it('should set the correct avdArgs', function callee$2$0() {
      var avdArgs;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            avdArgs = '-wipe-data';

            _libAndroidHelpers2['default'].prepareAVDArgs({}, adb, avdArgs).should.equal(avdArgs);
            _libAndroidHelpers2['default'].prepareAVDArgs({ isHeadless: true }, adb, avdArgs).should.have.string('-no-window');
            mocks.helpers.expects('ensureNetworkSpeed').once().returns('edge');
            _libAndroidHelpers2['default'].prepareAVDArgs({ networkSpeed: 'edge' }, adb, avdArgs).should.have.string('-netspeed edge');
            mocks.adb.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('ensureNetworkSpeed', function () {
    it('should return value if network speed is valid', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.NETWORK_SPEED = { GSM: 'gsm' };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].ensureNetworkSpeed(adb, 'gsm').should.be.equal('gsm'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return ADB.NETWORK_SPEED.FULL if network speed is invalid', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.NETWORK_SPEED = { FULL: 'full' };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].ensureNetworkSpeed(adb, 'invalid').should.be.equal('full'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('ensureDeviceLocale', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call setDeviceLanguageCountry', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('setDeviceLanguageCountry').withExactArgs('en', 'US').once();
            mocks.adb.expects('ensureCurrentLocale').withExactArgs('en', 'US').once().returns(true);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].ensureDeviceLocale(adb, 'en', 'US'));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should never call setDeviceLanguageCountry', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('setDeviceLanguageCountry').never();
            mocks.adb.expects('getApiLevel').never();
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].ensureDeviceLocale(adb));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call setDeviceLanguageCountry with throw', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('setDeviceLanguageCountry').withExactArgs('fr', 'FR').once();
            mocks.adb.expects('ensureCurrentLocale').withExactArgs('fr', 'FR').once().returns(false);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].ensureDeviceLocale(adb, 'fr', 'FR').should.eventually.be.rejectedWith(Error, 'Failed to set language: fr and country: FR'));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));

  describe('getDeviceInfoFromCaps', function () {
    // list of device/emu udids to their os versions
    // using list instead of map to preserve order
    var devices = [{ udid: 'emulator-1234', os: '4.9.2' }, { udid: 'rotalume-1339', os: '5.1.5' }, { udid: 'rotalume-1338', os: '5.0.1' }, { udid: 'rotalume-1337', os: '5.0.1' }, { udid: 'roamulet-9000', os: '6.0' }, { udid: 'roamulet-0', os: '2.3' }, { udid: '0123456789', os: 'wellhellothere' }];
    var curDeviceId = '';

    before(function () {
      _sinon2['default'].stub(_appiumAdb2['default'], 'createADB', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          var _this2 = this;

          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              return context$4$0.abrupt('return', {
                getDevicesWithRetry: function getDevicesWithRetry() {
                  return _regeneratorRuntime.async(function getDevicesWithRetry$(context$5$0) {
                    while (1) switch (context$5$0.prev = context$5$0.next) {
                      case 0:
                        return context$5$0.abrupt('return', _lodash2['default'].map(devices, function (device) {
                          return { udid: device.udid };
                        }));

                      case 1:
                      case 'end':
                        return context$5$0.stop();
                    }
                  }, null, _this2);
                },
                getPortFromEmulatorString: function getPortFromEmulatorString() {
                  return 1234;
                },
                getRunningAVD: function getRunningAVD() {
                  return { udid: 'emulator-1234', port: 1234 };
                },
                setDeviceId: function setDeviceId(udid) {
                  curDeviceId = udid;
                },
                getPlatformVersion: function getPlatformVersion() {
                  return _lodash2['default'].filter(devices, { udid: curDeviceId })[0].os;
                },
                curDeviceId: 'emulator-1234',
                emulatorPort: 1234
              });

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });

    after(function () {
      _appiumAdb2['default'].createADB.restore();
    });

    it('should throw error when udid not in list', function callee$2$0() {
      var caps;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = {
              udid: 'foomulator'
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps(caps).should.be.rejectedWith('foomulator'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get deviceId and emPort when udid is present', function callee$2$0() {
      var caps, _ref, udid, emPort;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = {
              udid: 'emulator-1234'
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps(caps));

          case 3:
            _ref = context$3$0.sent;
            udid = _ref.udid;
            emPort = _ref.emPort;

            udid.should.equal('emulator-1234');
            emPort.should.equal(1234);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get first deviceId and emPort if avd, platformVersion, and udid aren\'t given', function callee$2$0() {
      var _ref2, udid, emPort;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps());

          case 2:
            _ref2 = context$3$0.sent;
            udid = _ref2.udid;
            emPort = _ref2.emPort;

            udid.should.equal('emulator-1234');
            emPort.should.equal(1234);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get deviceId and emPort when avd is present', function callee$2$0() {
      var caps, _ref3, udid, emPort;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = {
              avd: 'AVD_NAME'
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps(caps));

          case 3:
            _ref3 = context$3$0.sent;
            udid = _ref3.udid;
            emPort = _ref3.emPort;

            udid.should.equal('emulator-1234');
            emPort.should.equal(1234);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should fail if the given platformVersion is not found', function callee$2$0() {
      var caps;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = {
              platformVersion: '1234567890'
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps(caps).should.be.rejectedWith('Unable to find an active device or emulator with OS 1234567890'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get deviceId and emPort if platformVersion is found and unique', function callee$2$0() {
      var caps, _ref4, udid, emPort;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = {
              platformVersion: '6.0'
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps(caps));

          case 3:
            _ref4 = context$3$0.sent;
            udid = _ref4.udid;
            emPort = _ref4.emPort;

            udid.should.equal('roamulet-9000');
            emPort.should.equal(1234);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get the first deviceId and emPort if platformVersion is found multiple times', function callee$2$0() {
      var caps, _ref5, udid, emPort;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = {
              platformVersion: '5.0.1'
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps(caps));

          case 3:
            _ref5 = context$3$0.sent;
            udid = _ref5.udid;
            emPort = _ref5.emPort;

            udid.should.equal('rotalume-1338');
            emPort.should.equal(1234);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get the first deviceId and emPort if platformVersion is found multiple times and is a partial match', function callee$2$0() {
      var caps, _ref6, udid, emPort;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = {
              platformVersion: '5.0'
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps(caps));

          case 3:
            _ref6 = context$3$0.sent;
            udid = _ref6.udid;
            emPort = _ref6.emPort;

            udid.should.equal('rotalume-1338');
            emPort.should.equal(1234);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get deviceId and emPort by udid if udid and platformVersion are given', function callee$2$0() {
      var caps, _ref7, udid, emPort;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = {
              udid: '0123456789',
              platformVersion: '2.3'
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps(caps));

          case 3:
            _ref7 = context$3$0.sent;
            udid = _ref7.udid;
            emPort = _ref7.emPort;

            udid.should.equal('0123456789');
            emPort.should.equal(1234);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('createADB', function () {
    var curDeviceId = '';
    var emulatorPort = -1;
    before(function () {
      _sinon2['default'].stub(_appiumAdb2['default'], 'createADB', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              return context$4$0.abrupt('return', {
                setDeviceId: function setDeviceId(udid) {
                  curDeviceId = udid;
                },
                setEmulatorPort: function setEmulatorPort(emPort) {
                  emulatorPort = emPort;
                }
              });

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });
    after(function () {
      _appiumAdb2['default'].createADB.restore();
    });
    it('should create adb and set device id and emulator port', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].createADB("1.7", "111222", "111", "222", true, "remote_host", true));

          case 2:
            _appiumAdb2['default'].createADB.calledWithExactly({
              javaVersion: "1.7",
              adbPort: "222",
              suppressKillServer: true,
              remoteAdbHost: "remote_host",
              clearDeviceLogsOnStart: true
            }).should.be['true'];
            curDeviceId.should.equal("111222");
            emulatorPort.should.equal("111");

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not set emulator port if emPort is undefined', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            emulatorPort = 5555;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].createADB());

          case 3:
            emulatorPort.should.equal(5555);

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('getLaunchInfoFromManifest', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should return when no app present', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('packageAndLaunchActivityFromManifest').never();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getLaunchInfo(adb, {}));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return when appPackage & appActivity are already present', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('packageAndLaunchActivityFromManifest').never();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getLaunchInfo(adb, { app: "foo", appPackage: "bar",
              appActivity: "act" }));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return package and launch activity from manifest', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('packageAndLaunchActivityFromManifest').withExactArgs('foo').returns({ apkPackage: 'pkg', apkActivity: 'ack' });
            result = { appPackage: 'pkg', appWaitPackage: 'pkg',
              appActivity: 'ack', appWaitActivity: 'ack' };
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getLaunchInfo(adb, { app: "foo" }));

          case 4:
            context$3$0.t0 = result;
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not override appPackage, appWaitPackage, appActivity, appWaitActivity ' + 'from manifest if they are allready defined in opts', function callee$2$0() {
      var optsFromManifest, inOpts, outOpts;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            optsFromManifest = { apkPackage: 'mpkg', apkActivity: 'mack' };

            mocks.adb.expects('packageAndLaunchActivityFromManifest').withExactArgs('foo').twice().returns(optsFromManifest);

            inOpts = { app: 'foo', appActivity: 'ack', appWaitPackage: 'wpkg', appWaitActivity: 'wack' };
            outOpts = { appPackage: 'mpkg', appActivity: 'ack', appWaitPackage: 'wpkg', appWaitActivity: 'wack' };
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getLaunchInfo(adb, inOpts));

          case 6:
            context$3$0.t0 = outOpts;
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            inOpts = { app: 'foo', appPackage: 'pkg', appWaitPackage: 'wpkg', appWaitActivity: 'wack' };
            outOpts = { appPackage: 'pkg', appActivity: 'mack', appWaitPackage: 'wpkg', appWaitActivity: 'wack' };
            context$3$0.next = 12;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getLaunchInfo(adb, inOpts));

          case 12:
            context$3$0.t1 = outOpts;
            context$3$0.sent.should.deep.equal(context$3$0.t1);

            mocks.adb.verify();

          case 15:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('getRemoteApkPath', function () {
    it('should return remote path', function () {
      _libAndroidHelpers2['default'].getRemoteApkPath('foo').should.equal(REMOTE_TEMP_PATH + '/foo.apk');
    });
    it('should return custom install path', function () {
      _libAndroidHelpers2['default'].getRemoteApkPath('foo', '/sdcard/Download/').should.equal('/sdcard/Download/foo.apk');
    });
  });
  describe('resetApp', (0, _appiumTestSupport.withMocks)({ adb: adb, fs: _appiumSupport.fs, helpers: _libAndroidHelpers2['default'] }, function (mocks) {
    var localApkPath = 'local';
    var pkg = 'pkg';
    var androidInstallTimeout = 90000;
    it('should throw error if remote file does not exist', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.fs.expects('md5').withExactArgs(localApkPath).returns('apkmd5');
            mocks.adb.expects('fileExists').returns(false);
            mocks.helpers.expects('reinstallRemoteApk').never();
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].resetApp(adb, localApkPath, pkg, false, androidInstallTimeout).should.eventually.be.rejectedWith('slow'));

          case 5:
            mocks.adb.verify();
            mocks.fs.verify();
            mocks.helpers.verify();

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should reinstall apk', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.fs.expects('md5').withExactArgs(localApkPath).returns('apkmd5');
            mocks.adb.expects('fileExists').returns(true);
            mocks.helpers.expects('reinstallRemoteApk').once().returns('');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].resetApp(adb, localApkPath, pkg, false, androidInstallTimeout));

          case 5:
            mocks.adb.verify();
            mocks.fs.verify();
            mocks.helpers.verify();

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to do fast reset', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('stopAndClear').withExactArgs(pkg).once();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].resetApp(adb, localApkPath, pkg, true));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should use default timeout and remote temp path', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.fs.expects('md5').withExactArgs(localApkPath).returns('apkmd5');
            mocks.adb.expects('fileExists').returns(true);
            mocks.helpers.expects('getRemoteApkPath').withExactArgs('apkmd5', REMOTE_TEMP_PATH).returns('remote_path');
            mocks.helpers.expects('reinstallRemoteApk').withExactArgs(adb, localApkPath, pkg, 'remote_path', REMOTE_INSTALL_TIMEOUT).returns('');
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].resetApp(adb, localApkPath, pkg, false));

          case 6:
            mocks.adb.verify();
            mocks.fs.verify();
            mocks.helpers.verify();

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));

  describe('reinstallRemoteApk', (0, _appiumTestSupport.withMocks)({ adb: adb, helpers: _libAndroidHelpers2['default'] }, function (mocks) {
    var localApkPath = 'local';
    var pkg = 'pkg';
    var remotePath = 'remote';
    var androidInstallTimeout = 90000;
    it('should throw error if remote file does not exist', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('uninstallApk').withExactArgs(pkg).returns('');
            // install remote is not defines do we mean installApkRemotely?
            mocks.adb.expects('installFromDevicePath').withExactArgs(remotePath, { timeout: 90000 }).throws('');
            mocks.helpers.expects('removeRemoteApks').withExactArgs(adb);

            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].reinstallRemoteApk(adb, localApkPath, pkg, remotePath, androidInstallTimeout, 1).should.eventually.be.rejected);

          case 5:
            mocks.adb.verify();
            mocks.helpers.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should skip exception if uninstallApk failed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('uninstallApk').throws();
            mocks.adb.expects('installFromDevicePath').withExactArgs(remotePath, { timeout: 90000 });
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].reinstallRemoteApk(adb, localApkPath, pkg, remotePath, androidInstallTimeout, 1));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should do double tries by default', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('uninstallApk').twice();
            mocks.adb.expects('installFromDevicePath').twice().throws();
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].reinstallRemoteApk(adb, localApkPath, pkg, remotePath, androidInstallTimeout).should.be.rejected);

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('installApkRemotely', (0, _appiumTestSupport.withMocks)({ adb: adb, fs: _appiumSupport.fs, helpers: _libAndroidHelpers2['default'] }, function (mocks) {
    //use mock appium capabilities for this test
    var opts = {
      app: 'local',
      appPackage: 'pkg',
      fastReset: true,
      androidInstallTimeout: 90000
    };
    it('should complain if opts arent passed correctly', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].installApkRemotely(adb, {}).should.eventually.be.rejectedWith(/app.+appPackage/));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should reset app if already installed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.fs.expects('md5').withExactArgs(opts.app).returns('apkmd5');
            mocks.helpers.expects('getRemoteApkPath').returns(false);
            mocks.adb.expects('fileExists').returns(true);
            mocks.adb.expects('isAppInstalled').returns(true);
            mocks.helpers.expects('resetApp').once().returns("");
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].installApkRemotely(adb, opts));

          case 7:
            mocks.adb.verify();
            mocks.fs.verify();
            mocks.helpers.verify();

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should push and reinstall apk when apk is not installed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.fs.expects('md5').withExactArgs(opts.app).returns('apkmd5');
            mocks.helpers.expects('getRemoteApkPath').returns('remote_path');
            mocks.adb.expects('fileExists').returns(false);
            mocks.adb.expects('isAppInstalled').returns(false);
            mocks.adb.expects('mkdir').withExactArgs(REMOTE_TEMP_PATH).returns("");
            mocks.helpers.expects('removeRemoteApks').withExactArgs(adb, ['apkmd5']).returns('');
            mocks.adb.expects('push').withExactArgs(opts.app, 'remote_path', { timeout: opts.androidInstallTimeout });
            mocks.helpers.expects('reinstallRemoteApk').withExactArgs(adb, opts.app, opts.appPackage, 'remote_path', opts.androidInstallTimeout).returns("");

            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].installApkRemotely(adb, opts));

          case 10:

            mocks.adb.verify();
            mocks.fs.verify();
            mocks.helpers.verify();

          case 13:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should push apk if app is installed and remote apk is not exist', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.fs.expects('md5').withExactArgs(opts.app).returns('apkmd5');
            mocks.helpers.expects('getRemoteApkPath').returns('remote_path');
            mocks.adb.expects('fileExists').returns(false);
            mocks.adb.expects('isAppInstalled').returns(true);
            mocks.adb.expects('mkdir').once();
            mocks.helpers.expects('removeRemoteApks').once();
            mocks.adb.expects('push').once();
            mocks.helpers.expects('reinstallRemoteApk').once();

            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].installApkRemotely(adb, opts));

          case 10:

            mocks.adb.verify();
            mocks.fs.verify();
            mocks.helpers.verify();

          case 13:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('removeRemoteApks', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should return when no apks present', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('ls').returns([]);
            mocks.adb.expects('shell').never();
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].removeRemoteApks(adb));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return when only exceptMd5s are present', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('ls').returns(['foo']);
            mocks.adb.expects('shell').never();
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].removeRemoteApks(adb, ['foo']));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should remove all remote apks', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('ls').returns(['foo']);
            mocks.adb.expects('shell').withExactArgs(["rm", "-f", "foo"]).once();
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].removeRemoteApks(adb, ['bar']));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('initUnicodeKeyboard', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should install and enable unicodeIME', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('install').once().returns('');
            mocks.adb.expects('defaultIME').once().returns('defaultIME');
            mocks.adb.expects('enableIME').once().returns('');
            mocks.adb.expects('setIME').once().returns('');
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].initUnicodeKeyboard(adb));

          case 6:
            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('pushSettingsApp', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should install settingsApp', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('installOrUpgrade').once().returns(true);
            mocks.adb.expects('grantAllPermissions').withExactArgs('io.appium.settings').once().returns(true);
            mocks.adb.expects('processExists').withExactArgs('io.appium.settings').once().returns(true);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].pushSettingsApp(adb));

          case 5:
            mocks.adb.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should skip exception if installOrUpgrade or grantAllPermissions failed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('installOrUpgrade').throws();
            mocks.adb.expects('grantAllPermissions').throws();
            mocks.adb.expects('processExists').throws();
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].pushSettingsApp(adb).should.be.fulfilled);

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should launch settings app if it isnt running', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('installOrUpgrade').once().returns(true);
            mocks.adb.expects('grantAllPermissions').withExactArgs('io.appium.settings').once().returns(true);
            mocks.adb.expects('processExists').once().returns(false);
            mocks.adb.expects('startApp').once();
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].pushSettingsApp(adb));

          case 6:
            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('setMockLocationApp', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should enable mock location for api level below 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApiLevel').returns(_bluebird2['default'].resolve(18));
            mocks.adb.expects('shell').withExactArgs(['settings', 'put', 'secure', 'mock_location', '1']).once().returns('');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].setMockLocationApp(adb, 'io.appium.settings'));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should enable mock location for api level 23 and above', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApiLevel').returns(_bluebird2['default'].resolve(23));
            mocks.adb.expects('shell').withExactArgs(['appops', 'set', 'io.appium.settings', 'android:mock_location', 'allow']).once().returns('');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].setMockLocationApp(adb, 'io.appium.settings'));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('pushUnlock', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should install unlockApp', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('installOrUpgrade').withExactArgs(_appiumUnlock.path, 'io.appium.unlock').once().returns('');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].pushUnlock(adb));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('pushStrings', (0, _appiumTestSupport.withMocks)({ adb: adb, fs: _appiumSupport.fs }, function (mocks) {
    var opts = { app: 'app', tmpDir: '/tmp_dir', appPackage: 'pkg' };
    it('should extracts string.xml and converts it to string.json and pushes it', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('extractStringsFromApk').withArgs(opts.app, 'en').returns({ apkStrings: 'apk_strings', localPath: 'local_path' });
            mocks.adb.expects('push').withExactArgs('local_path', REMOTE_TEMP_PATH).once();
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].pushStrings('en', adb, opts).should.become('apk_strings'));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should delete remote strings.json if app is not present', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('extractStringsFromApk').throws();
            mocks.fs.expects('exists').withExactArgs(opts.app).returns(false);
            mocks.adb.expects('rimraf').withExactArgs(REMOTE_TEMP_PATH + '/strings.json');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].pushStrings('en', adb, opts).should.be.deep.equal({}));

          case 5:
            mocks.adb.verify();
            mocks.fs.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should push an empty json object if app does not have strings.xml', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('extractStringsFromApk').throws();
            mocks.fs.expects('exists').withExactArgs(opts.app).returns(true);
            mocks.adb.expects('shell').withExactArgs('echo', ['\'{}\' > ' + REMOTE_TEMP_PATH + '/strings.json']);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].pushStrings('en', adb, opts).should.be.deep.equal({}));

          case 5:
            mocks.adb.verify();
            mocks.fs.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('unlock', (0, _appiumTestSupport.withMocks)({ adb: adb, helpers: _libAndroidHelpers2['default'], unlocker: _libUnlockHelpers2['default'] }, function (mocks) {
    it('should return if screen is already unlocked', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('isScreenLocked').withExactArgs().once().returns(false);
            mocks.adb.expects('getApiLevel').never();
            mocks.adb.expects('startApp').never();
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].unlock(_libAndroidHelpers2['default'], adb, {}));

          case 5:
            mocks.adb.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should start unlock app', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('isScreenLocked').onCall(0).returns(true);
            mocks.adb.expects('isScreenLocked').returns(false);
            mocks.adb.expects('forceStop').once().returns('');
            mocks.adb.expects('startApp').twice().returns('');
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].unlock(_libAndroidHelpers2['default'], adb, {}));

          case 6:
            mocks.adb.verify();
            mocks.helpers.verify();

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should raise an error on undefined unlockKey when unlockType is defined', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('isScreenLocked').once().returns(true);
            mocks.unlocker.expects('isValidKey').once();
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].unlock(_libAndroidHelpers2['default'], adb, { unlockType: "pin" }).should.be.rejectedWith('unlockKey'));

          case 4:
            mocks.adb.verify();
            mocks.unlocker.verify();
            mocks.helpers.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call pinUnlock if unlockType is pin', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('isScreenLocked').onCall(0).returns(true);
            mocks.adb.expects('isScreenLocked').returns(false);
            mocks.unlocker.expects('pinUnlock').once();
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].unlock(_libAndroidHelpers2['default'], adb, { unlockType: "pin", unlockKey: "1111" }));

          case 5:
            mocks.adb.verify();
            mocks.helpers.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call passwordUnlock if unlockType is password', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('isScreenLocked').onCall(0).returns(true);
            mocks.adb.expects('isScreenLocked').returns(false);
            mocks.unlocker.expects('passwordUnlock').once();
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].unlock(_libAndroidHelpers2['default'], adb, { unlockType: "password", unlockKey: "appium" }));

          case 5:
            mocks.adb.verify();
            mocks.helpers.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call patternUnlock if unlockType is pattern', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('isScreenLocked').onCall(0).returns(true);
            mocks.adb.expects('isScreenLocked').returns(false);
            mocks.unlocker.expects('patternUnlock').once();
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].unlock(_libAndroidHelpers2['default'], adb, { unlockType: "pattern", unlockKey: "123456789" }));

          case 5:
            mocks.adb.verify();
            mocks.helpers.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call fingerprintUnlock if unlockType is fingerprint', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('isScreenLocked').onCall(0).returns(true);
            mocks.adb.expects('isScreenLocked').returns(false);
            mocks.unlocker.expects('fingerprintUnlock').once();
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].unlock(_libAndroidHelpers2['default'], adb, { unlockType: "fingerprint", unlockKey: "1111" }));

          case 5:
            mocks.adb.verify();
            mocks.unlocker.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw an error is api is lower than 23 and trying to use fingerprintUnlock', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('isScreenLocked').onCall(0).returns(true);
            mocks.adb.expects('isScreenLocked').returns(false);
            mocks.adb.expects('getApiLevel').once().returns(21);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].unlock(_libAndroidHelpers2['default'], adb, { unlockType: "fingerprint", unlockKey: "1111" }).should.eventually.be.rejectedWith('Fingerprint'));

          case 5:
            mocks.helpers.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('initDevice', (0, _appiumTestSupport.withMocks)({ helpers: _libAndroidHelpers2['default'], adb: adb }, function (mocks) {
    it('should init device', function callee$2$0() {
      var opts;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            opts = { language: "en", locale: "us" };

            mocks.adb.expects('waitForDevice').once();
            mocks.adb.expects('startLogcat').once();
            mocks.helpers.expects('pushSettingsApp').once();
            mocks.helpers.expects('ensureDeviceLocale').withExactArgs(adb, opts.language, opts.locale).once();
            mocks.helpers.expects('setMockLocationApp').withExactArgs(adb, 'io.appium.settings').once();
            mocks.helpers.expects('pushUnlock').withExactArgs(adb).once();
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].initDevice(adb, opts));

          case 9:
            mocks.helpers.verify();
            mocks.adb.verify();

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not install settings app and mock location on emulator', function callee$2$0() {
      var opts;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            opts = { avd: "avd" };

            mocks.adb.expects('waitForDevice').once();
            mocks.adb.expects('startLogcat').once();
            mocks.helpers.expects('pushSettingsApp').never();
            mocks.helpers.expects('ensureDeviceLocale').withArgs(adb).once();
            mocks.helpers.expects('setMockLocationApp').never();
            mocks.helpers.expects('pushUnlock').withExactArgs(adb).once();
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].initDevice(adb, opts));

          case 9:
            mocks.helpers.verify();
            mocks.adb.verify();

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return defaultIME if unicodeKeyboard is setted to true', function callee$2$0() {
      var opts;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            opts = { unicodeKeyboard: true };

            mocks.adb.expects('waitForDevice').once();
            mocks.adb.expects('startLogcat').once();
            mocks.helpers.expects('pushSettingsApp').once();
            mocks.helpers.expects('ensureDeviceLocale').once();
            mocks.helpers.expects('setMockLocationApp').once();
            mocks.helpers.expects('initUnicodeKeyboard').withExactArgs(adb).once().returns("defaultIME");
            mocks.helpers.expects('pushUnlock').withExactArgs(adb).once();
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].initDevice(adb, opts).should.become("defaultIME"));

          case 10:
            mocks.helpers.verify();
            mocks.adb.verify();

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return undefined if unicodeKeyboard is setted to false', function callee$2$0() {
      var opts;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            opts = { unicodeKeyboard: false };

            mocks.adb.expects('waitForDevice').once();
            mocks.adb.expects('startLogcat').once();
            mocks.helpers.expects('pushSettingsApp').once();
            mocks.helpers.expects('ensureDeviceLocale').once();
            mocks.helpers.expects('setMockLocationApp').once();
            mocks.helpers.expects('initUnicodeKeyboard').never();
            mocks.helpers.expects('pushUnlock').withExactArgs(adb).once();
            context$3$0.t0 = should.not;
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].initDevice(adb, opts));

          case 11:
            context$3$0.t1 = context$3$0.sent;
            context$3$0.t0.exist.call(context$3$0.t0, context$3$0.t1);

            mocks.helpers.verify();
            mocks.adb.verify();

          case 15:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not push unlock app if unlockType is defined', function callee$2$0() {
      var opts;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            opts = { unlockType: "unlock_type" };

            mocks.adb.expects('waitForDevice').once();
            mocks.adb.expects('startLogcat').once();
            mocks.helpers.expects('pushSettingsApp').once();
            mocks.helpers.expects('ensureDeviceLocale').once();
            mocks.helpers.expects('setMockLocationApp').once();
            mocks.helpers.expects('initUnicodeKeyboard').never();
            mocks.helpers.expects('pushUnlock').never();
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].initDevice(adb, opts));

          case 10:
            mocks.helpers.verify();
            mocks.adb.verify();

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('removeNullProperties', function () {
    it('should ignore null properties', function callee$2$0() {
      var test;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            test = { foo: null, bar: true };

            _libAndroidHelpers2['default'].removeNullProperties(test);
            _lodash2['default'].keys(test).length.should.equal(1);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should ignore undefined properties', function callee$2$0() {
      var test;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            test = { foo: undefined, bar: true };

            _libAndroidHelpers2['default'].removeNullProperties(test);
            _lodash2['default'].keys(test).length.should.equal(1);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not ignore falsy properties like 0 and false', function callee$2$0() {
      var test;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            test = { foo: false, bar: true, zero: 0 };

            _libAndroidHelpers2['default'].removeNullProperties(test);
            _lodash2['default'].keys(test).length.should.equal(3);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('truncateDecimals', function () {
    it('should use floor when number is positive', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            _libAndroidHelpers2['default'].truncateDecimals(12.345, 2).should.equal(12.34);

          case 1:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should use ceil when number is negative', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            _libAndroidHelpers2['default'].truncateDecimals(-12.345, 2).should.equal(-12.34);

          case 1:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('getChromePkg', function () {
    it('should return pakage for chromium', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            _libAndroidHelpers2['default'].getChromePkg('chromium').should.deep.equal({ pkg: 'org.chromium.chrome.shell', activity: '.ChromeShellActivity' });

          case 1:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return pakage for chromebeta', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            _libAndroidHelpers2['default'].getChromePkg('chromebeta').should.deep.equal({ pkg: 'com.chrome.beta', activity: 'com.google.android.apps.chrome.Main' });

          case 1:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return pakage for browser', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            _libAndroidHelpers2['default'].getChromePkg('browser').should.deep.equal({ pkg: 'com.android.browser', activity: 'com.android.browser.BrowserActivity' });

          case 1:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return pakage for chromium-browser', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            _libAndroidHelpers2['default'].getChromePkg('chromium-browser').should.deep.equal({ pkg: 'org.chromium.chrome', activity: 'com.google.android.apps.chrome.Main' });

          case 1:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return pakage for chromium-webview', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            _libAndroidHelpers2['default'].getChromePkg('chromium-webview').should.deep.equal({ pkg: 'org.chromium.webview_shell', activity: 'org.chromium.webview_shell.WebViewBrowserActivity' });

          case 1:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9hbmRyb2lkLWhlbHBlci1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztxQkFDM0IsT0FBTzs7OztpQ0FDTCwyQkFBMkI7Ozs7eUJBQy9CLFlBQVk7Ozs7aUNBQ0YscUJBQXFCOzs0QkFDakIsY0FBYzs7SUFBaEMsWUFBWTs7NkJBQ0wsZ0JBQWdCOzs0QkFDRyxlQUFlOztnQ0FDaEMsMEJBQTBCOzs7O3NCQUNqQyxRQUFROzs7O3dCQUNSLFVBQVU7Ozs7QUFHeEIsSUFBTSxNQUFNLEdBQUcsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDN0IsSUFBTSxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQztBQUMzQyxJQUFNLHNCQUFzQixHQUFHLEtBQUssQ0FBQztBQUNyQyxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUd6QixRQUFRLENBQUMsaUJBQWlCLEVBQUUsWUFBTTtBQUNoQyxNQUFJLEdBQUcsR0FBRyw0QkFBUyxDQUFDO0FBQ3BCLFVBQVEsQ0FBQyxrQkFBa0IsRUFBRSxZQUFNO0FBQ2pDLE1BQUUsQ0FBQyxxQ0FBcUMsRUFBRSxZQUFNO0FBQzlDLHFDQUFRLGdCQUFnQix5RkFDZ0MsQ0FBQyxNQUFNLENBQzVELEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDekIsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLHFEQUFxRCxFQUFFLFlBQU07QUFDOUQsWUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsK0JBQVEsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztLQUN2RCxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsaUNBQWlDLEVBQUUsWUFBWTtBQUNoRCxxQ0FBUSxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hFLENBQUMsQ0FB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QUNILE1BQUUsQ0FBQywyQ0FBMkMsRUFBRTs7OztBQUM5QywyQ0FBUSxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FDeEQsRUFBQyxHQUFHLEVBQUUsNEJBQTRCLEVBQUUsUUFBUSxFQUFFLG1EQUFtRCxFQUFDLENBQUMsQ0FBQzs7Ozs7OztLQUN2RyxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L2FuZHJvaWQtaGVscGVyLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XHJcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcclxuaW1wb3J0IHNpbm9uIGZyb20gJ3Npbm9uJztcclxuaW1wb3J0IGhlbHBlcnMgZnJvbSAnLi4vLi4vbGliL2FuZHJvaWQtaGVscGVycyc7XHJcbmltcG9ydCBBREIgZnJvbSAnYXBwaXVtLWFkYic7XHJcbmltcG9ydCB7IHdpdGhNb2NrcyB9IGZyb20gJ2FwcGl1bS10ZXN0LXN1cHBvcnQnO1xyXG5pbXBvcnQgKiBhcyB0ZWVuX3Byb2Nlc3MgZnJvbSAndGVlbl9wcm9jZXNzJztcclxuaW1wb3J0IHsgZnMgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XHJcbmltcG9ydCB7IHBhdGggYXMgdW5sb2NrQXBrUGF0aCB9IGZyb20gJ2FwcGl1bS11bmxvY2snO1xyXG5pbXBvcnQgdW5sb2NrZXIgZnJvbSAnLi4vLi4vbGliL3VubG9jay1oZWxwZXJzJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xyXG5cclxuXHJcbmNvbnN0IHNob3VsZCA9IGNoYWkuc2hvdWxkKCk7XHJcbmNvbnN0IFJFTU9URV9URU1QX1BBVEggPSBcIi9kYXRhL2xvY2FsL3RtcFwiO1xyXG5jb25zdCBSRU1PVEVfSU5TVEFMTF9USU1FT1VUID0gOTAwMDA7XHJcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcclxuXHJcblxyXG5kZXNjcmliZSgnQW5kcm9pZCBIZWxwZXJzJywgKCkgPT4ge1xyXG4gIGxldCBhZGIgPSBuZXcgQURCKCk7XHJcbiAgZGVzY3JpYmUoJ3BhcnNlSmF2YVZlcnNpb24nLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGNvcnJlY3RseSBwYXJzZSBqYXZhIHZlcnNpb24nLCAoKSA9PiB7XHJcbiAgICAgIGhlbHBlcnMucGFyc2VKYXZhVmVyc2lvbihgamF2YSB2ZXJzaW9uIFwiMS44LjBfNDBcIlxyXG4gICAgICAgIEphdmEoVE0pIFNFIFJ1bnRpbWUgRW52aXJvbm1lbnQgKGJ1aWxkIDEuOC4wXzQwLWIyNylgKS5zaG91bGRcclxuICAgICAgICAuYmUuZXF1YWwoXCIxLjguMF80MFwiKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gbnVsbCBpZiBpdCBjYW5ub3QgcGFyc2UgamF2YSB2ZXJzdGlvbicsICgpID0+IHtcclxuICAgICAgc2hvdWxkLm5vdC5leGlzdChoZWxwZXJzLnBhcnNlSmF2YVZlcnNpb24oJ2ZvbyBiYXInKSk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgcGFyc2UgT3BlbkpESyB2ZXJzaW9uaW5nJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBoZWxwZXJzLnBhcnNlSmF2YVZlcnNpb24oJ29wZW5qZGsgdmVyc2lvbiAxLjgnKS5zaG91bGQuYmUuZXF1YWwoJzEuOCcpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIGRlc2NyaWJlKCdnZXRKYXZhVmVyc2lvbicsIHdpdGhNb2Nrcyh7dGVlbl9wcm9jZXNzfSwgKG1vY2tzKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGNvcnJlY3RseSBnZXQgamF2YSB2ZXJzaW9uJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MuZXhwZWN0cygnZXhlYycpLndpdGhFeGFjdEFyZ3MoJ2phdmEnLCBbJy12ZXJzaW9uJ10pXHJcbiAgICAgICAgLnJldHVybnMoe3N0ZGVycjogJ2phdmEgdmVyc2lvbiBcIjEuOC4wXzQwXCInfSk7XHJcbiAgICAgIChhd2FpdCBoZWxwZXJzLmdldEphdmFWZXJzaW9uKCkpLnNob3VsZC5lcXVhbCgnMS44LjBfNDAnKTtcclxuICAgICAgbW9ja3MudGVlbl9wcm9jZXNzLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiBudWxsIGlmIGl0IGNhbm5vdCBwYXJzZSBqYXZhIHZlcnN0aW9uJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MuZXhwZWN0cygnZXhlYycpLndpdGhFeGFjdEFyZ3MoJ2phdmEnLCBbJy12ZXJzaW9uJ10pXHJcbiAgICAgICAgLnJldHVybnMoe3N0ZGVycjogJ2ZvbyBiYXInfSk7XHJcbiAgICAgIGF3YWl0IGhlbHBlcnMuZ2V0SmF2YVZlcnNpb24oKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoJ0phdmEnKTtcclxuICAgICAgbW9ja3MudGVlbl9wcm9jZXNzLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgfSkpO1xyXG4gIGRlc2NyaWJlKCdwcmVwYXJlRW11bGF0b3InLCB3aXRoTW9ja3Moe2FkYiwgaGVscGVyc30sIChtb2NrcykgPT4ge1xyXG4gICAgY29uc3Qgb3B0cyA9IHthdmQ6IFwiZm9vQGJhclwiLCBhdmRBcmdzOiBcIlwiLCBsYW5ndWFnZTogXCJlblwiLCBsb2NhbGU6IFwidXNcIn07XHJcbiAgICBpdCgnc2hvdWxkIG5vdCBsYXVuY2ggYXZkIGlmIG9uZSBpcyBhbHJlYWR5IHJ1bm5pbmcnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRSdW5uaW5nQVZEJykud2l0aEV4YWN0QXJncygnZm9vYmFyJylcclxuICAgICAgICAucmV0dXJucyhcImZvb1wiKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2xhdW5jaEFWRCcpLm5ldmVyKCk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdraWxsRW11bGF0b3InKS5uZXZlcigpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLnByZXBhcmVFbXVsYXRvcihhZGIsIG9wdHMpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgbGF1bmNoIGF2ZCBpZiBvbmUgaXMgYWxyZWFkeSBydW5uaW5nJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0UnVubmluZ0FWRCcpLndpdGhFeGFjdEFyZ3MoJ2Zvb2JhcicpXHJcbiAgICAgICAgLnJldHVybnMobnVsbCk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdsYXVuY2hBVkQnKS53aXRoRXhhY3RBcmdzKCdmb29AYmFyJywgJycsICdlbicsICd1cycsXHJcbiAgICAgICAgdW5kZWZpbmVkLCB1bmRlZmluZWQpXHJcbiAgICAgICAgLnJldHVybnMoXCJcIik7XHJcbiAgICAgIGF3YWl0IGhlbHBlcnMucHJlcGFyZUVtdWxhdG9yKGFkYiwgb3B0cyk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBraWxsIGVtdWxhdG9yIGlmIGF2ZEFyZ3MgY29udGFpbnMgLXdpcGUtZGF0YScsIGFzeW5jICgpID0+IHtcclxuICAgICAgY29uc3Qgb3B0cyA9IHthdmQ6IFwiZm9vQGJhclwiLCBhdmRBcmdzOiBcIi13aXBlLWRhdGFcIn07XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRSdW5uaW5nQVZEJykud2l0aEV4YWN0QXJncygnZm9vYmFyJykucmV0dXJucygnZm9vJyk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdraWxsRW11bGF0b3InKS53aXRoRXhhY3RBcmdzKCdmb29iYXInKS5vbmNlKCk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdsYXVuY2hBVkQnKS5vbmNlKCk7XHJcbiAgICAgIGF3YWl0IGhlbHBlcnMucHJlcGFyZUVtdWxhdG9yKGFkYiwgb3B0cyk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBmYWlsIGlmIGF2ZCBuYW1lIGlzIG5vdCBzcGVjaWZpZWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGhlbHBlcnMucHJlcGFyZUVtdWxhdG9yKGFkYiwge30pLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkO1xyXG4gICAgfSk7XHJcbiAgfSkpO1xyXG4gIGRlc2NyaWJlKCdwcmVwYXJlQVZEQXJncycsIHdpdGhNb2Nrcyh7YWRiLCBoZWxwZXJzfSwgKG1vY2tzKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIHNldCB0aGUgY29ycmVjdCBhdmRBcmdzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgYXZkQXJncyA9ICctd2lwZS1kYXRhJztcclxuICAgICAgKGhlbHBlcnMucHJlcGFyZUFWREFyZ3Moe30sIGFkYiwgYXZkQXJncykpLnNob3VsZC5lcXVhbChhdmRBcmdzKTtcclxuICAgICAgKGhlbHBlcnMucHJlcGFyZUFWREFyZ3Moe2lzSGVhZGxlc3M6IHRydWV9LCBhZGIsIGF2ZEFyZ3MpKS5zaG91bGQuaGF2ZS5zdHJpbmcoJy1uby13aW5kb3cnKTtcclxuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdlbnN1cmVOZXR3b3JrU3BlZWQnKS5vbmNlKClcclxuICAgICAgICAucmV0dXJucygnZWRnZScpO1xyXG4gICAgICAoaGVscGVycy5wcmVwYXJlQVZEQXJncyh7bmV0d29ya1NwZWVkOiAnZWRnZSd9LCBhZGIsIGF2ZEFyZ3MpKS5zaG91bGQuaGF2ZS5zdHJpbmcoJy1uZXRzcGVlZCBlZGdlJyk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gIH0pKTtcclxuICBkZXNjcmliZSgnZW5zdXJlTmV0d29ya1NwZWVkJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdmFsdWUgaWYgbmV0d29yayBzcGVlZCBpcyB2YWxpZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgYWRiLk5FVFdPUktfU1BFRUQgPSB7R1NNOiAnZ3NtJ307XHJcbiAgICAgIGF3YWl0IGhlbHBlcnMuZW5zdXJlTmV0d29ya1NwZWVkKGFkYiwgJ2dzbScpLnNob3VsZC5iZS5lcXVhbCgnZ3NtJyk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgcmV0dXJuIEFEQi5ORVRXT1JLX1NQRUVELkZVTEwgaWYgbmV0d29yayBzcGVlZCBpcyBpbnZhbGlkJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhZGIuTkVUV09SS19TUEVFRCA9IHtGVUxMOiAnZnVsbCd9O1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLmVuc3VyZU5ldHdvcmtTcGVlZChhZGIsICdpbnZhbGlkJykuc2hvdWxkLmJlLmVxdWFsKCdmdWxsJyk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnZW5zdXJlRGV2aWNlTG9jYWxlJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgIGl0KCdzaG91bGQgY2FsbCBzZXREZXZpY2VMYW5ndWFnZUNvdW50cnknLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXREZXZpY2VMYW5ndWFnZUNvdW50cnknKS53aXRoRXhhY3RBcmdzKCdlbicsICdVUycpLm9uY2UoKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2Vuc3VyZUN1cnJlbnRMb2NhbGUnKS53aXRoRXhhY3RBcmdzKCdlbicsICdVUycpLm9uY2UoKS5yZXR1cm5zKHRydWUpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLmVuc3VyZURldmljZUxvY2FsZShhZGIsICdlbicsICdVUycpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgbmV2ZXIgY2FsbCBzZXREZXZpY2VMYW5ndWFnZUNvdW50cnknLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXREZXZpY2VMYW5ndWFnZUNvdW50cnknKS5uZXZlcigpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0QXBpTGV2ZWwnKS5uZXZlcigpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLmVuc3VyZURldmljZUxvY2FsZShhZGIpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgY2FsbCBzZXREZXZpY2VMYW5ndWFnZUNvdW50cnkgd2l0aCB0aHJvdycsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NldERldmljZUxhbmd1YWdlQ291bnRyeScpLndpdGhFeGFjdEFyZ3MoJ2ZyJywgJ0ZSJykub25jZSgpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZW5zdXJlQ3VycmVudExvY2FsZScpLndpdGhFeGFjdEFyZ3MoJ2ZyJywgJ0ZSJykub25jZSgpLnJldHVybnMoZmFsc2UpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLmVuc3VyZURldmljZUxvY2FsZShhZGIsICdmcicsICdGUicpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aChFcnJvciwgYEZhaWxlZCB0byBzZXQgbGFuZ3VhZ2U6IGZyIGFuZCBjb3VudHJ5OiBGUmApO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICB9KSk7XHJcblxyXG4gIGRlc2NyaWJlKCdnZXREZXZpY2VJbmZvRnJvbUNhcHMnLCAoKSA9PiB7XHJcbiAgICAvLyBsaXN0IG9mIGRldmljZS9lbXUgdWRpZHMgdG8gdGhlaXIgb3MgdmVyc2lvbnNcclxuICAgIC8vIHVzaW5nIGxpc3QgaW5zdGVhZCBvZiBtYXAgdG8gcHJlc2VydmUgb3JkZXJcclxuICAgIGxldCBkZXZpY2VzID0gW1xyXG4gICAgICB7dWRpZDogJ2VtdWxhdG9yLTEyMzQnLCBvczogJzQuOS4yJ30sXHJcbiAgICAgIHt1ZGlkOiAncm90YWx1bWUtMTMzOScsIG9zOiAnNS4xLjUnfSxcclxuICAgICAge3VkaWQ6ICdyb3RhbHVtZS0xMzM4Jywgb3M6ICc1LjAuMSd9LFxyXG4gICAgICB7dWRpZDogJ3JvdGFsdW1lLTEzMzcnLCBvczogJzUuMC4xJ30sXHJcbiAgICAgIHt1ZGlkOiAncm9hbXVsZXQtOTAwMCcsIG9zOiAnNi4wJ30sXHJcbiAgICAgIHt1ZGlkOiAncm9hbXVsZXQtMCcsIG9zOiAnMi4zJ30sXHJcbiAgICAgIHt1ZGlkOiAnMDEyMzQ1Njc4OScsIG9zOiAnd2VsbGhlbGxvdGhlcmUnfVxyXG4gICAgXTtcclxuICAgIGxldCBjdXJEZXZpY2VJZCA9ICcnO1xyXG5cclxuICAgIGJlZm9yZSgoKSA9PiB7XHJcbiAgICAgIHNpbm9uLnN0dWIoQURCLCAnY3JlYXRlQURCJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBnZXREZXZpY2VzV2l0aFJldHJ5OiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBfLm1hcChkZXZpY2VzLCAoZGV2aWNlKSA9PiB7IHJldHVybiB7dWRpZDogZGV2aWNlLnVkaWR9OyB9KTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBnZXRQb3J0RnJvbUVtdWxhdG9yU3RyaW5nOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAxMjM0O1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGdldFJ1bm5pbmdBVkQ6ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHt1ZGlkOiAnZW11bGF0b3ItMTIzNCcsIHBvcnQ6IDEyMzR9O1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHNldERldmljZUlkOiAodWRpZCkgPT4ge1xyXG4gICAgICAgICAgICBjdXJEZXZpY2VJZCA9IHVkaWQ7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZ2V0UGxhdGZvcm1WZXJzaW9uOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBfLmZpbHRlcihkZXZpY2VzLCB7dWRpZDogY3VyRGV2aWNlSWR9KVswXS5vcztcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjdXJEZXZpY2VJZDogJ2VtdWxhdG9yLTEyMzQnLFxyXG4gICAgICAgICAgZW11bGF0b3JQb3J0OiAxMjM0XHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZnRlcigoKSA9PiB7XHJcbiAgICAgIEFEQi5jcmVhdGVBREIucmVzdG9yZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBlcnJvciB3aGVuIHVkaWQgbm90IGluIGxpc3QnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGxldCBjYXBzID0ge1xyXG4gICAgICAgIHVkaWQ6ICdmb29tdWxhdG9yJ1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgYXdhaXQgaGVscGVycy5nZXREZXZpY2VJbmZvRnJvbUNhcHMoY2Fwcykuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgnZm9vbXVsYXRvcicpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGdldCBkZXZpY2VJZCBhbmQgZW1Qb3J0IHdoZW4gdWRpZCBpcyBwcmVzZW50JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgY2FwcyA9IHtcclxuICAgICAgICB1ZGlkOiAnZW11bGF0b3ItMTIzNCdcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxldCB7dWRpZCwgZW1Qb3J0fSA9IGF3YWl0IGhlbHBlcnMuZ2V0RGV2aWNlSW5mb0Zyb21DYXBzKGNhcHMpO1xyXG4gICAgICB1ZGlkLnNob3VsZC5lcXVhbCgnZW11bGF0b3ItMTIzNCcpO1xyXG4gICAgICBlbVBvcnQuc2hvdWxkLmVxdWFsKDEyMzQpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGdldCBmaXJzdCBkZXZpY2VJZCBhbmQgZW1Qb3J0IGlmIGF2ZCwgcGxhdGZvcm1WZXJzaW9uLCBhbmQgdWRpZCBhcmVuXFwndCBnaXZlbicsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IHt1ZGlkLCBlbVBvcnR9ID0gYXdhaXQgaGVscGVycy5nZXREZXZpY2VJbmZvRnJvbUNhcHMoKTtcclxuICAgICAgdWRpZC5zaG91bGQuZXF1YWwoJ2VtdWxhdG9yLTEyMzQnKTtcclxuICAgICAgZW1Qb3J0LnNob3VsZC5lcXVhbCgxMjM0KTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBnZXQgZGV2aWNlSWQgYW5kIGVtUG9ydCB3aGVuIGF2ZCBpcyBwcmVzZW50JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgY2FwcyA9IHtcclxuICAgICAgICBhdmQ6ICdBVkRfTkFNRSdcclxuICAgICAgfTtcclxuICAgICAgbGV0IHt1ZGlkLCBlbVBvcnR9ID0gYXdhaXQgaGVscGVycy5nZXREZXZpY2VJbmZvRnJvbUNhcHMoY2Fwcyk7XHJcbiAgICAgIHVkaWQuc2hvdWxkLmVxdWFsKCdlbXVsYXRvci0xMjM0Jyk7XHJcbiAgICAgIGVtUG9ydC5zaG91bGQuZXF1YWwoMTIzNCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgZmFpbCBpZiB0aGUgZ2l2ZW4gcGxhdGZvcm1WZXJzaW9uIGlzIG5vdCBmb3VuZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IGNhcHMgPSB7XHJcbiAgICAgICAgcGxhdGZvcm1WZXJzaW9uOiAnMTIzNDU2Nzg5MCdcclxuICAgICAgfTtcclxuICAgICAgYXdhaXQgaGVscGVycy5nZXREZXZpY2VJbmZvRnJvbUNhcHMoY2FwcylcclxuICAgICAgICAuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgnVW5hYmxlIHRvIGZpbmQgYW4gYWN0aXZlIGRldmljZSBvciBlbXVsYXRvciB3aXRoIE9TIDEyMzQ1Njc4OTAnKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBnZXQgZGV2aWNlSWQgYW5kIGVtUG9ydCBpZiBwbGF0Zm9ybVZlcnNpb24gaXMgZm91bmQgYW5kIHVuaXF1ZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IGNhcHMgPSB7XHJcbiAgICAgICAgcGxhdGZvcm1WZXJzaW9uOiAnNi4wJ1xyXG4gICAgICB9O1xyXG4gICAgICBsZXQge3VkaWQsIGVtUG9ydH0gPSBhd2FpdCBoZWxwZXJzLmdldERldmljZUluZm9Gcm9tQ2FwcyhjYXBzKTtcclxuICAgICAgdWRpZC5zaG91bGQuZXF1YWwoJ3JvYW11bGV0LTkwMDAnKTtcclxuICAgICAgZW1Qb3J0LnNob3VsZC5lcXVhbCgxMjM0KTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBnZXQgdGhlIGZpcnN0IGRldmljZUlkIGFuZCBlbVBvcnQgaWYgcGxhdGZvcm1WZXJzaW9uIGlzIGZvdW5kIG11bHRpcGxlIHRpbWVzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgY2FwcyA9IHtcclxuICAgICAgICBwbGF0Zm9ybVZlcnNpb246ICc1LjAuMSdcclxuICAgICAgfTtcclxuICAgICAgbGV0IHt1ZGlkLCBlbVBvcnR9ID0gYXdhaXQgaGVscGVycy5nZXREZXZpY2VJbmZvRnJvbUNhcHMoY2Fwcyk7XHJcbiAgICAgIHVkaWQuc2hvdWxkLmVxdWFsKCdyb3RhbHVtZS0xMzM4Jyk7XHJcbiAgICAgIGVtUG9ydC5zaG91bGQuZXF1YWwoMTIzNCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgZ2V0IHRoZSBmaXJzdCBkZXZpY2VJZCBhbmQgZW1Qb3J0IGlmIHBsYXRmb3JtVmVyc2lvbiBpcyBmb3VuZCBtdWx0aXBsZSB0aW1lcyBhbmQgaXMgYSBwYXJ0aWFsIG1hdGNoJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgY2FwcyA9IHtcclxuICAgICAgICBwbGF0Zm9ybVZlcnNpb246ICc1LjAnXHJcbiAgICAgIH07XHJcbiAgICAgIGxldCB7dWRpZCwgZW1Qb3J0fSA9IGF3YWl0IGhlbHBlcnMuZ2V0RGV2aWNlSW5mb0Zyb21DYXBzKGNhcHMpO1xyXG4gICAgICB1ZGlkLnNob3VsZC5lcXVhbCgncm90YWx1bWUtMTMzOCcpO1xyXG4gICAgICBlbVBvcnQuc2hvdWxkLmVxdWFsKDEyMzQpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGdldCBkZXZpY2VJZCBhbmQgZW1Qb3J0IGJ5IHVkaWQgaWYgdWRpZCBhbmQgcGxhdGZvcm1WZXJzaW9uIGFyZSBnaXZlbicsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IGNhcHMgPSB7XHJcbiAgICAgICAgdWRpZDogJzAxMjM0NTY3ODknLFxyXG4gICAgICAgIHBsYXRmb3JtVmVyc2lvbjogJzIuMydcclxuICAgICAgfTtcclxuICAgICAgbGV0IHt1ZGlkLCBlbVBvcnR9ID0gYXdhaXQgaGVscGVycy5nZXREZXZpY2VJbmZvRnJvbUNhcHMoY2Fwcyk7XHJcbiAgICAgIHVkaWQuc2hvdWxkLmVxdWFsKCcwMTIzNDU2Nzg5Jyk7XHJcbiAgICAgIGVtUG9ydC5zaG91bGQuZXF1YWwoMTIzNCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnY3JlYXRlQURCJywgKCkgPT4ge1xyXG4gICAgbGV0IGN1ckRldmljZUlkID0gJyc7XHJcbiAgICBsZXQgZW11bGF0b3JQb3J0ID0gLTE7XHJcbiAgICBiZWZvcmUoKCkgPT4ge1xyXG4gICAgICBzaW5vbi5zdHViKEFEQiwgJ2NyZWF0ZUFEQicsIGFzeW5jICgpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgc2V0RGV2aWNlSWQ6ICh1ZGlkKSA9PiB7IGN1ckRldmljZUlkID0gdWRpZDsgfSxcclxuICAgICAgICAgIHNldEVtdWxhdG9yUG9ydDogKGVtUG9ydCkgPT4geyBlbXVsYXRvclBvcnQgPSBlbVBvcnQ7IH1cclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgYWZ0ZXIoKCkgPT4ge1xyXG4gICAgICBBREIuY3JlYXRlQURCLnJlc3RvcmUoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBjcmVhdGUgYWRiIGFuZCBzZXQgZGV2aWNlIGlkIGFuZCBlbXVsYXRvciBwb3J0JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLmNyZWF0ZUFEQihcIjEuN1wiLCBcIjExMTIyMlwiLCBcIjExMVwiLCBcIjIyMlwiLCB0cnVlLCBcInJlbW90ZV9ob3N0XCIsIHRydWUpO1xyXG4gICAgICBBREIuY3JlYXRlQURCLmNhbGxlZFdpdGhFeGFjdGx5KHtcclxuICAgICAgICBqYXZhVmVyc2lvbjogXCIxLjdcIixcclxuICAgICAgICBhZGJQb3J0OiBcIjIyMlwiLFxyXG4gICAgICAgIHN1cHByZXNzS2lsbFNlcnZlcjogdHJ1ZSxcclxuICAgICAgICByZW1vdGVBZGJIb3N0OiBcInJlbW90ZV9ob3N0XCIsXHJcbiAgICAgICAgY2xlYXJEZXZpY2VMb2dzT25TdGFydDogdHJ1ZSxcclxuICAgICAgfSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGN1ckRldmljZUlkLnNob3VsZC5lcXVhbChcIjExMTIyMlwiKTtcclxuICAgICAgZW11bGF0b3JQb3J0LnNob3VsZC5lcXVhbChcIjExMVwiKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBub3Qgc2V0IGVtdWxhdG9yIHBvcnQgaWYgZW1Qb3J0IGlzIHVuZGVmaW5lZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgZW11bGF0b3JQb3J0ID0gNTU1NTtcclxuICAgICAgYXdhaXQgaGVscGVycy5jcmVhdGVBREIoKTtcclxuICAgICAgZW11bGF0b3JQb3J0LnNob3VsZC5lcXVhbCg1NTU1KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdnZXRMYXVuY2hJbmZvRnJvbU1hbmlmZXN0Jywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgIGl0KCdzaG91bGQgcmV0dXJuIHdoZW4gbm8gYXBwIHByZXNlbnQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdwYWNrYWdlQW5kTGF1bmNoQWN0aXZpdHlGcm9tTWFuaWZlc3QnKS5uZXZlcigpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLmdldExhdW5jaEluZm8oYWRiLCB7fSk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gd2hlbiBhcHBQYWNrYWdlICYgYXBwQWN0aXZpdHkgYXJlIGFscmVhZHkgcHJlc2VudCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3BhY2thZ2VBbmRMYXVuY2hBY3Rpdml0eUZyb21NYW5pZmVzdCcpLm5ldmVyKCk7XHJcbiAgICAgIGF3YWl0IGhlbHBlcnMuZ2V0TGF1bmNoSW5mbyhhZGIsIHthcHA6IFwiZm9vXCIsIGFwcFBhY2thZ2U6IFwiYmFyXCIsXHJcbiAgICAgICAgYXBwQWN0aXZpdHk6IFwiYWN0XCJ9KTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiBwYWNrYWdlIGFuZCBsYXVuY2ggYWN0aXZpdHkgZnJvbSBtYW5pZmVzdCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3BhY2thZ2VBbmRMYXVuY2hBY3Rpdml0eUZyb21NYW5pZmVzdCcpLndpdGhFeGFjdEFyZ3MoJ2ZvbycpXHJcbiAgICAgICAgLnJldHVybnMoe2Fwa1BhY2thZ2U6ICdwa2cnLCBhcGtBY3Rpdml0eTogJ2Fjayd9KTtcclxuICAgICAgY29uc3QgcmVzdWx0ID0ge2FwcFBhY2thZ2U6ICdwa2cnLCBhcHBXYWl0UGFja2FnZTogJ3BrZycsXHJcbiAgICAgICAgICAgICAgICAgICAgICBhcHBBY3Rpdml0eTogJ2FjaycsIGFwcFdhaXRBY3Rpdml0eTogJ2Fjayd9O1xyXG4gICAgICAoYXdhaXQgaGVscGVycy5nZXRMYXVuY2hJbmZvKGFkYiwge2FwcDogXCJmb29cIn0pKS5zaG91bGQuZGVlcFxyXG4gICAgICAgIC5lcXVhbChyZXN1bHQpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgbm90IG92ZXJyaWRlIGFwcFBhY2thZ2UsIGFwcFdhaXRQYWNrYWdlLCBhcHBBY3Rpdml0eSwgYXBwV2FpdEFjdGl2aXR5ICcgK1xyXG4gICAgICAgJ2Zyb20gbWFuaWZlc3QgaWYgdGhleSBhcmUgYWxscmVhZHkgZGVmaW5lZCBpbiBvcHRzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgb3B0c0Zyb21NYW5pZmVzdCA9IHthcGtQYWNrYWdlOiAnbXBrZycsIGFwa0FjdGl2aXR5OiAnbWFjayd9O1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygncGFja2FnZUFuZExhdW5jaEFjdGl2aXR5RnJvbU1hbmlmZXN0JylcclxuICAgICAgICAud2l0aEV4YWN0QXJncygnZm9vJykudHdpY2UoKS5yZXR1cm5zKG9wdHNGcm9tTWFuaWZlc3QpO1xyXG5cclxuICAgICAgbGV0IGluT3B0cyA9IHthcHA6ICdmb28nLCBhcHBBY3Rpdml0eTogJ2FjaycsIGFwcFdhaXRQYWNrYWdlOiAnd3BrZycsIGFwcFdhaXRBY3Rpdml0eTogJ3dhY2snIH07XHJcbiAgICAgIGxldCBvdXRPcHRzID0ge2FwcFBhY2thZ2U6ICdtcGtnJywgYXBwQWN0aXZpdHk6ICdhY2snLCBhcHBXYWl0UGFja2FnZTogJ3dwa2cnLCBhcHBXYWl0QWN0aXZpdHk6ICd3YWNrJ307XHJcbiAgICAgIChhd2FpdCBoZWxwZXJzLmdldExhdW5jaEluZm8oYWRiLCBpbk9wdHMpKS5zaG91bGQuZGVlcC5lcXVhbChvdXRPcHRzKTtcclxuXHJcbiAgICAgIGluT3B0cyA9IHthcHA6ICdmb28nLCBhcHBQYWNrYWdlOiAncGtnJywgYXBwV2FpdFBhY2thZ2U6ICd3cGtnJywgYXBwV2FpdEFjdGl2aXR5OiAnd2Fjayd9O1xyXG4gICAgICBvdXRPcHRzID0ge2FwcFBhY2thZ2U6ICdwa2cnLCBhcHBBY3Rpdml0eTogJ21hY2snLCBhcHBXYWl0UGFja2FnZTogJ3dwa2cnLCBhcHBXYWl0QWN0aXZpdHk6ICd3YWNrJ307XHJcbiAgICAgIChhd2FpdCBoZWxwZXJzLmdldExhdW5jaEluZm8oYWRiLCBpbk9wdHMpKS5zaG91bGQuZGVlcC5lcXVhbChvdXRPcHRzKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgfSkpO1xyXG4gIGRlc2NyaWJlKCdnZXRSZW1vdGVBcGtQYXRoJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gcmVtb3RlIHBhdGgnLCAoKSA9PiB7XHJcbiAgICAgIGhlbHBlcnMuZ2V0UmVtb3RlQXBrUGF0aCgnZm9vJykuc2hvdWxkLmVxdWFsKGAke1JFTU9URV9URU1QX1BBVEh9L2Zvby5hcGtgKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gY3VzdG9tIGluc3RhbGwgcGF0aCcsICgpID0+IHtcclxuICAgICAgaGVscGVycy5nZXRSZW1vdGVBcGtQYXRoKCdmb28nLCAnL3NkY2FyZC9Eb3dubG9hZC8nKS5zaG91bGQuZXF1YWwoYC9zZGNhcmQvRG93bmxvYWQvZm9vLmFwa2ApO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ3Jlc2V0QXBwJywgd2l0aE1vY2tzKHthZGIsIGZzLCBoZWxwZXJzfSwgKG1vY2tzKSA9PiB7XHJcbiAgICBjb25zdCBsb2NhbEFwa1BhdGggPSAnbG9jYWwnO1xyXG4gICAgY29uc3QgcGtnID0gJ3BrZyc7XHJcbiAgICBjb25zdCBhbmRyb2lkSW5zdGFsbFRpbWVvdXQgPSA5MDAwMDtcclxuICAgIGl0KCdzaG91bGQgdGhyb3cgZXJyb3IgaWYgcmVtb3RlIGZpbGUgZG9lcyBub3QgZXhpc3QnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmZzLmV4cGVjdHMoJ21kNScpLndpdGhFeGFjdEFyZ3MobG9jYWxBcGtQYXRoKS5yZXR1cm5zKCdhcGttZDUnKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2ZpbGVFeGlzdHMnKS5yZXR1cm5zKGZhbHNlKTtcclxuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdyZWluc3RhbGxSZW1vdGVBcGsnKS5uZXZlcigpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLnJlc2V0QXBwKGFkYiwgbG9jYWxBcGtQYXRoLCBwa2csIGZhbHNlLCBhbmRyb2lkSW5zdGFsbFRpbWVvdXQpLnNob3VsZC5ldmVudHVhbGx5XHJcbiAgICAgICAgLmJlLnJlamVjdGVkV2l0aCgnc2xvdycpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIG1vY2tzLmZzLnZlcmlmeSgpO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHJlaW5zdGFsbCBhcGsnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmZzLmV4cGVjdHMoJ21kNScpLndpdGhFeGFjdEFyZ3MobG9jYWxBcGtQYXRoKS5yZXR1cm5zKCdhcGttZDUnKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2ZpbGVFeGlzdHMnKS5yZXR1cm5zKHRydWUpO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ3JlaW5zdGFsbFJlbW90ZUFwaycpLm9uY2UoKS5yZXR1cm5zKCcnKTtcclxuICAgICAgYXdhaXQgaGVscGVycy5yZXNldEFwcChhZGIsIGxvY2FsQXBrUGF0aCwgcGtnLCBmYWxzZSwgYW5kcm9pZEluc3RhbGxUaW1lb3V0KTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICBtb2Nrcy5mcy52ZXJpZnkoKTtcclxuICAgICAgbW9ja3MuaGVscGVycy52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGRvIGZhc3QgcmVzZXQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzdG9wQW5kQ2xlYXInKS53aXRoRXhhY3RBcmdzKHBrZykub25jZSgpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLnJlc2V0QXBwKGFkYiwgbG9jYWxBcGtQYXRoLCBwa2csIHRydWUpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdXNlIGRlZmF1bHQgdGltZW91dCBhbmQgcmVtb3RlIHRlbXAgcGF0aCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuZnMuZXhwZWN0cygnbWQ1Jykud2l0aEV4YWN0QXJncyhsb2NhbEFwa1BhdGgpLnJldHVybnMoJ2Fwa21kNScpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZmlsZUV4aXN0cycpLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygnZ2V0UmVtb3RlQXBrUGF0aCcpXHJcbiAgICAgICAgLndpdGhFeGFjdEFyZ3MoJ2Fwa21kNScsIFJFTU9URV9URU1QX1BBVEgpLnJldHVybnMoJ3JlbW90ZV9wYXRoJyk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygncmVpbnN0YWxsUmVtb3RlQXBrJylcclxuICAgICAgICAud2l0aEV4YWN0QXJncyhhZGIsIGxvY2FsQXBrUGF0aCwgcGtnLCAncmVtb3RlX3BhdGgnLCBSRU1PVEVfSU5TVEFMTF9USU1FT1VUKS5yZXR1cm5zKCcnKTtcclxuICAgICAgYXdhaXQgaGVscGVycy5yZXNldEFwcChhZGIsIGxvY2FsQXBrUGF0aCwgcGtnLCBmYWxzZSk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgbW9ja3MuZnMudmVyaWZ5KCk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICB9KSk7XHJcblxyXG4gIGRlc2NyaWJlKCdyZWluc3RhbGxSZW1vdGVBcGsnLCB3aXRoTW9ja3Moe2FkYiwgaGVscGVyc30sIChtb2NrcykgPT4ge1xyXG4gICAgY29uc3QgbG9jYWxBcGtQYXRoID0gJ2xvY2FsJztcclxuICAgIGNvbnN0IHBrZyA9ICdwa2cnO1xyXG4gICAgY29uc3QgcmVtb3RlUGF0aCA9ICdyZW1vdGUnO1xyXG4gICAgY29uc3QgYW5kcm9pZEluc3RhbGxUaW1lb3V0ID0gOTAwMDA7XHJcbiAgICBpdCgnc2hvdWxkIHRocm93IGVycm9yIGlmIHJlbW90ZSBmaWxlIGRvZXMgbm90IGV4aXN0JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygndW5pbnN0YWxsQXBrJykud2l0aEV4YWN0QXJncyhwa2cpLnJldHVybnMoJycpO1xyXG4gICAgICAvLyBpbnN0YWxsIHJlbW90ZSBpcyBub3QgZGVmaW5lcyBkbyB3ZSBtZWFuIGluc3RhbGxBcGtSZW1vdGVseT9cclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2luc3RhbGxGcm9tRGV2aWNlUGF0aCcpLndpdGhFeGFjdEFyZ3MocmVtb3RlUGF0aCwge3RpbWVvdXQ6IDkwMDAwfSlcclxuICAgICAgICAudGhyb3dzKCcnKTtcclxuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdyZW1vdmVSZW1vdGVBcGtzJykud2l0aEV4YWN0QXJncyhhZGIpO1xyXG5cclxuICAgICAgYXdhaXQgaGVscGVycy5yZWluc3RhbGxSZW1vdGVBcGsoYWRiLCBsb2NhbEFwa1BhdGgsIHBrZywgcmVtb3RlUGF0aCwgYW5kcm9pZEluc3RhbGxUaW1lb3V0LCAxKVxyXG4gICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZDtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHNraXAgZXhjZXB0aW9uIGlmIHVuaW5zdGFsbEFwayBmYWlsZWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCd1bmluc3RhbGxBcGsnKS50aHJvd3MoKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2luc3RhbGxGcm9tRGV2aWNlUGF0aCcpLndpdGhFeGFjdEFyZ3MocmVtb3RlUGF0aCwge3RpbWVvdXQ6IDkwMDAwfSk7XHJcbiAgICAgIGF3YWl0IGhlbHBlcnMucmVpbnN0YWxsUmVtb3RlQXBrKGFkYiwgbG9jYWxBcGtQYXRoLCBwa2csIHJlbW90ZVBhdGgsIGFuZHJvaWRJbnN0YWxsVGltZW91dCwgMSk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBkbyBkb3VibGUgdHJpZXMgYnkgZGVmYXVsdCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3VuaW5zdGFsbEFwaycpLnR3aWNlKCk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpbnN0YWxsRnJvbURldmljZVBhdGgnKS50d2ljZSgpLnRocm93cygpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLnJlaW5zdGFsbFJlbW90ZUFwayhhZGIsIGxvY2FsQXBrUGF0aCwgcGtnLCByZW1vdGVQYXRoLCBhbmRyb2lkSW5zdGFsbFRpbWVvdXQpXHJcbiAgICAgICAgLnNob3VsZC5iZS5yZWplY3RlZDtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgfSkpO1xyXG4gIGRlc2NyaWJlKCdpbnN0YWxsQXBrUmVtb3RlbHknLCB3aXRoTW9ja3Moe2FkYiwgZnMsIGhlbHBlcnN9LCAobW9ja3MpID0+IHtcclxuICAgIC8vdXNlIG1vY2sgYXBwaXVtIGNhcGFiaWxpdGllcyBmb3IgdGhpcyB0ZXN0XHJcbiAgICBjb25zdCBvcHRzID0ge1xyXG4gICAgICBhcHAgOiAnbG9jYWwnLFxyXG4gICAgICBhcHBQYWNrYWdlIDogJ3BrZycsXHJcbiAgICAgIGZhc3RSZXNldCA6IHRydWUsXHJcbiAgICAgIGFuZHJvaWRJbnN0YWxsVGltZW91dCA6IDkwMDAwXHJcbiAgICB9O1xyXG4gICAgaXQoJ3Nob3VsZCBjb21wbGFpbiBpZiBvcHRzIGFyZW50IHBhc3NlZCBjb3JyZWN0bHknLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGhlbHBlcnMuaW5zdGFsbEFwa1JlbW90ZWx5KGFkYiwge30pXHJcbiAgICAgICAgICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvYXBwLithcHBQYWNrYWdlLyk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgcmVzZXQgYXBwIGlmIGFscmVhZHkgaW5zdGFsbGVkJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5mcy5leHBlY3RzKCdtZDUnKS53aXRoRXhhY3RBcmdzKG9wdHMuYXBwKS5yZXR1cm5zKCdhcGttZDUnKTtcclxuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdnZXRSZW1vdGVBcGtQYXRoJykucmV0dXJucyhmYWxzZSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdmaWxlRXhpc3RzJykucmV0dXJucyh0cnVlKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2lzQXBwSW5zdGFsbGVkJykucmV0dXJucyh0cnVlKTtcclxuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdyZXNldEFwcCcpLm9uY2UoKS5yZXR1cm5zKFwiXCIpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLmluc3RhbGxBcGtSZW1vdGVseShhZGIsIG9wdHMpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIG1vY2tzLmZzLnZlcmlmeSgpO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHB1c2ggYW5kIHJlaW5zdGFsbCBhcGsgd2hlbiBhcGsgaXMgbm90IGluc3RhbGxlZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuZnMuZXhwZWN0cygnbWQ1Jykud2l0aEV4YWN0QXJncyhvcHRzLmFwcCkucmV0dXJucygnYXBrbWQ1Jyk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygnZ2V0UmVtb3RlQXBrUGF0aCcpLnJldHVybnMoJ3JlbW90ZV9wYXRoJyk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdmaWxlRXhpc3RzJykucmV0dXJucyhmYWxzZSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpc0FwcEluc3RhbGxlZCcpLnJldHVybnMoZmFsc2UpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnbWtkaXInKS53aXRoRXhhY3RBcmdzKFJFTU9URV9URU1QX1BBVEgpLnJldHVybnMoXCJcIik7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygncmVtb3ZlUmVtb3RlQXBrcycpLndpdGhFeGFjdEFyZ3MoYWRiLCBbJ2Fwa21kNSddKS5yZXR1cm5zKCcnKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3B1c2gnKVxyXG4gICAgICAgIC53aXRoRXhhY3RBcmdzKG9wdHMuYXBwLCAncmVtb3RlX3BhdGgnLCB7dGltZW91dDogb3B0cy5hbmRyb2lkSW5zdGFsbFRpbWVvdXR9KTtcclxuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdyZWluc3RhbGxSZW1vdGVBcGsnKVxyXG4gICAgICAgIC53aXRoRXhhY3RBcmdzKGFkYiwgb3B0cy5hcHAsIG9wdHMuYXBwUGFja2FnZSwgJ3JlbW90ZV9wYXRoJywgb3B0cy5hbmRyb2lkSW5zdGFsbFRpbWVvdXQpLnJldHVybnMoXCJcIik7XHJcblxyXG4gICAgICBhd2FpdCBoZWxwZXJzLmluc3RhbGxBcGtSZW1vdGVseShhZGIsIG9wdHMpO1xyXG5cclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICBtb2Nrcy5mcy52ZXJpZnkoKTtcclxuICAgICAgbW9ja3MuaGVscGVycy52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBwdXNoIGFwayBpZiBhcHAgaXMgaW5zdGFsbGVkIGFuZCByZW1vdGUgYXBrIGlzIG5vdCBleGlzdCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuZnMuZXhwZWN0cygnbWQ1Jykud2l0aEV4YWN0QXJncyhvcHRzLmFwcCkucmV0dXJucygnYXBrbWQ1Jyk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygnZ2V0UmVtb3RlQXBrUGF0aCcpLnJldHVybnMoJ3JlbW90ZV9wYXRoJyk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdmaWxlRXhpc3RzJykucmV0dXJucyhmYWxzZSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpc0FwcEluc3RhbGxlZCcpLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdta2RpcicpLm9uY2UoKTtcclxuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdyZW1vdmVSZW1vdGVBcGtzJykub25jZSgpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygncHVzaCcpLm9uY2UoKTtcclxuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdyZWluc3RhbGxSZW1vdGVBcGsnKS5vbmNlKCk7XHJcblxyXG4gICAgICBhd2FpdCBoZWxwZXJzLmluc3RhbGxBcGtSZW1vdGVseShhZGIsIG9wdHMpO1xyXG5cclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICBtb2Nrcy5mcy52ZXJpZnkoKTtcclxuICAgICAgbW9ja3MuaGVscGVycy52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gIH0pKTtcclxuICBkZXNjcmliZSgncmVtb3ZlUmVtb3RlQXBrcycsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiB3aGVuIG5vIGFwa3MgcHJlc2VudCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2xzJykucmV0dXJucyhbXSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpLm5ldmVyKCk7XHJcbiAgICAgIGF3YWl0IGhlbHBlcnMucmVtb3ZlUmVtb3RlQXBrcyhhZGIpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgcmV0dXJuIHdoZW4gb25seSBleGNlcHRNZDVzIGFyZSBwcmVzZW50JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnbHMnKS5yZXR1cm5zKFsnZm9vJ10pO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKS5uZXZlcigpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLnJlbW92ZVJlbW90ZUFwa3MoYWRiLCBbJ2ZvbyddKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHJlbW92ZSBhbGwgcmVtb3RlIGFwa3MnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdscycpLnJldHVybnMoWydmb28nXSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpLndpdGhFeGFjdEFyZ3MoW1wicm1cIiwgXCItZlwiLCBcImZvb1wiXSkub25jZSgpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLnJlbW92ZVJlbW90ZUFwa3MoYWRiLCBbJ2JhciddKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgfSkpO1xyXG4gIGRlc2NyaWJlKCdpbml0VW5pY29kZUtleWJvYXJkJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgIGl0KCdzaG91bGQgaW5zdGFsbCBhbmQgZW5hYmxlIHVuaWNvZGVJTUUnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpbnN0YWxsJykub25jZSgpLnJldHVybnMoJycpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZGVmYXVsdElNRScpLm9uY2UoKS5yZXR1cm5zKCdkZWZhdWx0SU1FJyk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdlbmFibGVJTUUnKS5vbmNlKCkucmV0dXJucygnJyk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXRJTUUnKS5vbmNlKCkucmV0dXJucygnJyk7XHJcbiAgICAgIGF3YWl0IGhlbHBlcnMuaW5pdFVuaWNvZGVLZXlib2FyZChhZGIpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICB9KSk7XHJcbiAgZGVzY3JpYmUoJ3B1c2hTZXR0aW5nc0FwcCcsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGluc3RhbGwgc2V0dGluZ3NBcHAnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpbnN0YWxsT3JVcGdyYWRlJykub25jZSgpXHJcbiAgICAgICAgLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdncmFudEFsbFBlcm1pc3Npb25zJykud2l0aEV4YWN0QXJncygnaW8uYXBwaXVtLnNldHRpbmdzJykub25jZSgpXHJcbiAgICAgICAgLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdwcm9jZXNzRXhpc3RzJylcclxuICAgICAgICAgIC53aXRoRXhhY3RBcmdzKCdpby5hcHBpdW0uc2V0dGluZ3MnKS5vbmNlKClcclxuICAgICAgICAgIC5yZXR1cm5zKHRydWUpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLnB1c2hTZXR0aW5nc0FwcChhZGIpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgc2tpcCBleGNlcHRpb24gaWYgaW5zdGFsbE9yVXBncmFkZSBvciBncmFudEFsbFBlcm1pc3Npb25zIGZhaWxlZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2luc3RhbGxPclVwZ3JhZGUnKS50aHJvd3MoKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dyYW50QWxsUGVybWlzc2lvbnMnKS50aHJvd3MoKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3Byb2Nlc3NFeGlzdHMnKS50aHJvd3MoKTtcclxuICAgICAgYXdhaXQgaGVscGVycy5wdXNoU2V0dGluZ3NBcHAoYWRiKS5zaG91bGQuYmUuZnVsZmlsbGVkO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGxhdW5jaCBzZXR0aW5ncyBhcHAgaWYgaXQgaXNudCBydW5uaW5nJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnaW5zdGFsbE9yVXBncmFkZScpLm9uY2UoKVxyXG4gICAgICAgIC5yZXR1cm5zKHRydWUpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ3JhbnRBbGxQZXJtaXNzaW9ucycpXHJcbiAgICAgICAgLndpdGhFeGFjdEFyZ3MoJ2lvLmFwcGl1bS5zZXR0aW5ncycpLm9uY2UoKVxyXG4gICAgICAgIC5yZXR1cm5zKHRydWUpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygncHJvY2Vzc0V4aXN0cycpLm9uY2UoKVxyXG4gICAgICAgIC5yZXR1cm5zKGZhbHNlKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3N0YXJ0QXBwJykub25jZSgpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLnB1c2hTZXR0aW5nc0FwcChhZGIpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICB9KSk7XHJcbiAgZGVzY3JpYmUoJ3NldE1vY2tMb2NhdGlvbkFwcCcsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGVuYWJsZSBtb2NrIGxvY2F0aW9uIGZvciBhcGkgbGV2ZWwgYmVsb3cgMjMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRBcGlMZXZlbCcpLnJldHVybnMoQi5yZXNvbHZlKDE4KSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpLndpdGhFeGFjdEFyZ3MoWydzZXR0aW5ncycsICdwdXQnLCAnc2VjdXJlJywgJ21vY2tfbG9jYXRpb24nLCAnMSddKS5vbmNlKClcclxuICAgICAgICAucmV0dXJucygnJyk7XHJcbiAgICAgIGF3YWl0IGhlbHBlcnMuc2V0TW9ja0xvY2F0aW9uQXBwKGFkYiwgJ2lvLmFwcGl1bS5zZXR0aW5ncycpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgZW5hYmxlIG1vY2sgbG9jYXRpb24gZm9yIGFwaSBsZXZlbCAyMyBhbmQgYWJvdmUnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRBcGlMZXZlbCcpLnJldHVybnMoQi5yZXNvbHZlKDIzKSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpLndpdGhFeGFjdEFyZ3MoWydhcHBvcHMnLCAnc2V0JywgJ2lvLmFwcGl1bS5zZXR0aW5ncycsICdhbmRyb2lkOm1vY2tfbG9jYXRpb24nLCAnYWxsb3cnXSkub25jZSgpXHJcbiAgICAgICAgLnJldHVybnMoJycpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLnNldE1vY2tMb2NhdGlvbkFwcChhZGIsICdpby5hcHBpdW0uc2V0dGluZ3MnKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgfSkpO1xyXG4gIGRlc2NyaWJlKCdwdXNoVW5sb2NrJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgIGl0KCdzaG91bGQgaW5zdGFsbCB1bmxvY2tBcHAnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpbnN0YWxsT3JVcGdyYWRlJykud2l0aEV4YWN0QXJncyh1bmxvY2tBcGtQYXRoLCAnaW8uYXBwaXVtLnVubG9jaycpLm9uY2UoKVxyXG4gICAgICAgIC5yZXR1cm5zKCcnKTtcclxuICAgICAgYXdhaXQgaGVscGVycy5wdXNoVW5sb2NrKGFkYik7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gIH0pKTtcclxuICBkZXNjcmliZSgncHVzaFN0cmluZ3MnLCB3aXRoTW9ja3Moe2FkYiwgZnN9LCAobW9ja3MpID0+IHtcclxuICAgIGNvbnN0IG9wdHMgPSB7YXBwOiAnYXBwJywgdG1wRGlyOiAnL3RtcF9kaXInLCBhcHBQYWNrYWdlOiAncGtnJ307XHJcbiAgICBpdCgnc2hvdWxkIGV4dHJhY3RzIHN0cmluZy54bWwgYW5kIGNvbnZlcnRzIGl0IHRvIHN0cmluZy5qc29uIGFuZCBwdXNoZXMgaXQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdleHRyYWN0U3RyaW5nc0Zyb21BcGsnKS53aXRoQXJncyhvcHRzLmFwcCwgJ2VuJylcclxuICAgICAgICAucmV0dXJucyh7YXBrU3RyaW5nczogJ2Fwa19zdHJpbmdzJywgbG9jYWxQYXRoOiAnbG9jYWxfcGF0aCd9KTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3B1c2gnKS53aXRoRXhhY3RBcmdzKCdsb2NhbF9wYXRoJywgUkVNT1RFX1RFTVBfUEFUSCkub25jZSgpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLnB1c2hTdHJpbmdzKCdlbicsIGFkYiwgb3B0cykuc2hvdWxkLmJlY29tZSgnYXBrX3N0cmluZ3MnKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGRlbGV0ZSByZW1vdGUgc3RyaW5ncy5qc29uIGlmIGFwcCBpcyBub3QgcHJlc2VudCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2V4dHJhY3RTdHJpbmdzRnJvbUFwaycpLnRocm93cygpO1xyXG4gICAgICBtb2Nrcy5mcy5leHBlY3RzKCdleGlzdHMnKS53aXRoRXhhY3RBcmdzKG9wdHMuYXBwKS5yZXR1cm5zKGZhbHNlKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3JpbXJhZicpLndpdGhFeGFjdEFyZ3MoYCR7UkVNT1RFX1RFTVBfUEFUSH0vc3RyaW5ncy5qc29uYCk7XHJcbiAgICAgIGF3YWl0IGhlbHBlcnMucHVzaFN0cmluZ3MoJ2VuJywgYWRiLCBvcHRzKS5zaG91bGQuYmUuZGVlcC5lcXVhbCh7fSk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgbW9ja3MuZnMudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgcHVzaCBhbiBlbXB0eSBqc29uIG9iamVjdCBpZiBhcHAgZG9lcyBub3QgaGF2ZSBzdHJpbmdzLnhtbCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2V4dHJhY3RTdHJpbmdzRnJvbUFwaycpLnRocm93cygpO1xyXG4gICAgICBtb2Nrcy5mcy5leHBlY3RzKCdleGlzdHMnKS53aXRoRXhhY3RBcmdzKG9wdHMuYXBwKS5yZXR1cm5zKHRydWUpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKS53aXRoRXhhY3RBcmdzKCdlY2hvJywgW2Ane30nID4gJHtSRU1PVEVfVEVNUF9QQVRIfS9zdHJpbmdzLmpzb25gXSk7XHJcbiAgICAgIGF3YWl0IGhlbHBlcnMucHVzaFN0cmluZ3MoJ2VuJywgYWRiLCBvcHRzKS5zaG91bGQuYmUuZGVlcC5lcXVhbCh7fSk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgbW9ja3MuZnMudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICB9KSk7XHJcbiAgZGVzY3JpYmUoJ3VubG9jaycsIHdpdGhNb2Nrcyh7YWRiLCBoZWxwZXJzLCB1bmxvY2tlcn0sIChtb2NrcykgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gaWYgc2NyZWVuIGlzIGFscmVhZHkgdW5sb2NrZWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpc1NjcmVlbkxvY2tlZCcpLndpdGhFeGFjdEFyZ3MoKS5vbmNlKClcclxuICAgICAgICAucmV0dXJucyhmYWxzZSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRBcGlMZXZlbCcpLm5ldmVyKCk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzdGFydEFwcCcpLm5ldmVyKCk7XHJcbiAgICAgIGF3YWl0IGhlbHBlcnMudW5sb2NrKGhlbHBlcnMsIGFkYiwge30pO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgc3RhcnQgdW5sb2NrIGFwcCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2lzU2NyZWVuTG9ja2VkJykub25DYWxsKDApLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpc1NjcmVlbkxvY2tlZCcpLnJldHVybnMoZmFsc2UpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZm9yY2VTdG9wJykub25jZSgpLnJldHVybnMoJycpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc3RhcnRBcHAnKS50d2ljZSgpLnJldHVybnMoJycpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLnVubG9jayhoZWxwZXJzLCBhZGIsIHt9KTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHJhaXNlIGFuIGVycm9yIG9uIHVuZGVmaW5lZCB1bmxvY2tLZXkgd2hlbiB1bmxvY2tUeXBlIGlzIGRlZmluZWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpc1NjcmVlbkxvY2tlZCcpLm9uY2UoKS5yZXR1cm5zKHRydWUpO1xyXG4gICAgICBtb2Nrcy51bmxvY2tlci5leHBlY3RzKCdpc1ZhbGlkS2V5Jykub25jZSgpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLnVubG9jayhoZWxwZXJzLCBhZGIsIHt1bmxvY2tUeXBlOiBcInBpblwifSkuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgndW5sb2NrS2V5Jyk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgbW9ja3MudW5sb2NrZXIudmVyaWZ5KCk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgY2FsbCBwaW5VbmxvY2sgaWYgdW5sb2NrVHlwZSBpcyBwaW4nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpc1NjcmVlbkxvY2tlZCcpLm9uQ2FsbCgwKS5yZXR1cm5zKHRydWUpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnaXNTY3JlZW5Mb2NrZWQnKS5yZXR1cm5zKGZhbHNlKTtcclxuICAgICAgbW9ja3MudW5sb2NrZXIuZXhwZWN0cygncGluVW5sb2NrJykub25jZSgpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLnVubG9jayhoZWxwZXJzLCBhZGIsIHt1bmxvY2tUeXBlOiBcInBpblwiLCB1bmxvY2tLZXk6IFwiMTExMVwifSk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgbW9ja3MuaGVscGVycy52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBjYWxsIHBhc3N3b3JkVW5sb2NrIGlmIHVubG9ja1R5cGUgaXMgcGFzc3dvcmQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpc1NjcmVlbkxvY2tlZCcpLm9uQ2FsbCgwKS5yZXR1cm5zKHRydWUpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnaXNTY3JlZW5Mb2NrZWQnKS5yZXR1cm5zKGZhbHNlKTtcclxuICAgICAgbW9ja3MudW5sb2NrZXIuZXhwZWN0cygncGFzc3dvcmRVbmxvY2snKS5vbmNlKCk7XHJcbiAgICAgIGF3YWl0IGhlbHBlcnMudW5sb2NrKGhlbHBlcnMsIGFkYiwge3VubG9ja1R5cGU6IFwicGFzc3dvcmRcIiwgdW5sb2NrS2V5OiBcImFwcGl1bVwifSk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgbW9ja3MuaGVscGVycy52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBjYWxsIHBhdHRlcm5VbmxvY2sgaWYgdW5sb2NrVHlwZSBpcyBwYXR0ZXJuJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnaXNTY3JlZW5Mb2NrZWQnKS5vbkNhbGwoMCkucmV0dXJucyh0cnVlKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2lzU2NyZWVuTG9ja2VkJykucmV0dXJucyhmYWxzZSk7XHJcbiAgICAgIG1vY2tzLnVubG9ja2VyLmV4cGVjdHMoJ3BhdHRlcm5VbmxvY2snKS5vbmNlKCk7XHJcbiAgICAgIGF3YWl0IGhlbHBlcnMudW5sb2NrKGhlbHBlcnMsIGFkYiwge3VubG9ja1R5cGU6IFwicGF0dGVyblwiLCB1bmxvY2tLZXk6IFwiMTIzNDU2Nzg5XCJ9KTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGNhbGwgZmluZ2VycHJpbnRVbmxvY2sgaWYgdW5sb2NrVHlwZSBpcyBmaW5nZXJwcmludCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2lzU2NyZWVuTG9ja2VkJykub25DYWxsKDApLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpc1NjcmVlbkxvY2tlZCcpLnJldHVybnMoZmFsc2UpO1xyXG4gICAgICBtb2Nrcy51bmxvY2tlci5leHBlY3RzKCdmaW5nZXJwcmludFVubG9jaycpLm9uY2UoKTtcclxuICAgICAgYXdhaXQgaGVscGVycy51bmxvY2soaGVscGVycywgYWRiLCB7dW5sb2NrVHlwZTogXCJmaW5nZXJwcmludFwiLCB1bmxvY2tLZXk6IFwiMTExMVwifSk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgbW9ja3MudW5sb2NrZXIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdGhyb3cgYW4gZXJyb3IgaXMgYXBpIGlzIGxvd2VyIHRoYW4gMjMgYW5kIHRyeWluZyB0byB1c2UgZmluZ2VycHJpbnRVbmxvY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpc1NjcmVlbkxvY2tlZCcpLm9uQ2FsbCgwKS5yZXR1cm5zKHRydWUpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnaXNTY3JlZW5Mb2NrZWQnKS5yZXR1cm5zKGZhbHNlKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldEFwaUxldmVsJykub25jZSgpLnJldHVybnMoMjEpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLnVubG9jayhoZWxwZXJzLCBhZGIsIHt1bmxvY2tUeXBlOiBcImZpbmdlcnByaW50XCIsIHVubG9ja0tleTogXCIxMTExXCJ9KS5zaG91bGQuZXZlbnR1YWxseVxyXG4gICAgICAgIC5iZS5yZWplY3RlZFdpdGgoJ0ZpbmdlcnByaW50Jyk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICB9KSk7XHJcbiAgZGVzY3JpYmUoJ2luaXREZXZpY2UnLCB3aXRoTW9ja3Moe2hlbHBlcnMsIGFkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBpbml0IGRldmljZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgY29uc3Qgb3B0cyA9IHtsYW5ndWFnZTogXCJlblwiLCBsb2NhbGU6IFwidXNcIn07XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCd3YWl0Rm9yRGV2aWNlJykub25jZSgpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc3RhcnRMb2djYXQnKS5vbmNlKCk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygncHVzaFNldHRpbmdzQXBwJykub25jZSgpO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ2Vuc3VyZURldmljZUxvY2FsZScpLndpdGhFeGFjdEFyZ3MoYWRiLCBvcHRzLmxhbmd1YWdlLCBvcHRzLmxvY2FsZSkub25jZSgpO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ3NldE1vY2tMb2NhdGlvbkFwcCcpLndpdGhFeGFjdEFyZ3MoYWRiLCAnaW8uYXBwaXVtLnNldHRpbmdzJykub25jZSgpO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ3B1c2hVbmxvY2snKS53aXRoRXhhY3RBcmdzKGFkYikub25jZSgpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLmluaXREZXZpY2UoYWRiLCBvcHRzKTtcclxuICAgICAgbW9ja3MuaGVscGVycy52ZXJpZnkoKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIG5vdCBpbnN0YWxsIHNldHRpbmdzIGFwcCBhbmQgbW9jayBsb2NhdGlvbiBvbiBlbXVsYXRvcicsIGFzeW5jICgpID0+IHtcclxuICAgICAgY29uc3Qgb3B0cyA9IHthdmQ6IFwiYXZkXCJ9O1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnd2FpdEZvckRldmljZScpLm9uY2UoKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3N0YXJ0TG9nY2F0Jykub25jZSgpO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ3B1c2hTZXR0aW5nc0FwcCcpLm5ldmVyKCk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygnZW5zdXJlRGV2aWNlTG9jYWxlJykud2l0aEFyZ3MoYWRiKS5vbmNlKCk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygnc2V0TW9ja0xvY2F0aW9uQXBwJykubmV2ZXIoKTtcclxuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdwdXNoVW5sb2NrJykud2l0aEV4YWN0QXJncyhhZGIpLm9uY2UoKTtcclxuICAgICAgYXdhaXQgaGVscGVycy5pbml0RGV2aWNlKGFkYiwgb3B0cyk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZGVmYXVsdElNRSBpZiB1bmljb2RlS2V5Ym9hcmQgaXMgc2V0dGVkIHRvIHRydWUnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IG9wdHMgPSB7dW5pY29kZUtleWJvYXJkIDogdHJ1ZX07XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCd3YWl0Rm9yRGV2aWNlJykub25jZSgpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc3RhcnRMb2djYXQnKS5vbmNlKCk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygncHVzaFNldHRpbmdzQXBwJykub25jZSgpO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ2Vuc3VyZURldmljZUxvY2FsZScpLm9uY2UoKTtcclxuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdzZXRNb2NrTG9jYXRpb25BcHAnKS5vbmNlKCk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygnaW5pdFVuaWNvZGVLZXlib2FyZCcpLndpdGhFeGFjdEFyZ3MoYWRiKS5vbmNlKCkucmV0dXJucyhcImRlZmF1bHRJTUVcIik7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygncHVzaFVubG9jaycpLndpdGhFeGFjdEFyZ3MoYWRiKS5vbmNlKCk7XHJcbiAgICAgIGF3YWl0IGhlbHBlcnMuaW5pdERldmljZShhZGIsIG9wdHMpLnNob3VsZC5iZWNvbWUoXCJkZWZhdWx0SU1FXCIpO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLnZlcmlmeSgpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgcmV0dXJuIHVuZGVmaW5lZCBpZiB1bmljb2RlS2V5Ym9hcmQgaXMgc2V0dGVkIHRvIGZhbHNlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBjb25zdCBvcHRzID0ge3VuaWNvZGVLZXlib2FyZCA6IGZhbHNlfTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3dhaXRGb3JEZXZpY2UnKS5vbmNlKCk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzdGFydExvZ2NhdCcpLm9uY2UoKTtcclxuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdwdXNoU2V0dGluZ3NBcHAnKS5vbmNlKCk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygnZW5zdXJlRGV2aWNlTG9jYWxlJykub25jZSgpO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ3NldE1vY2tMb2NhdGlvbkFwcCcpLm9uY2UoKTtcclxuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdpbml0VW5pY29kZUtleWJvYXJkJykubmV2ZXIoKTtcclxuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdwdXNoVW5sb2NrJykud2l0aEV4YWN0QXJncyhhZGIpLm9uY2UoKTtcclxuICAgICAgc2hvdWxkLm5vdC5leGlzdChhd2FpdCBoZWxwZXJzLmluaXREZXZpY2UoYWRiLCBvcHRzKSk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBub3QgcHVzaCB1bmxvY2sgYXBwIGlmIHVubG9ja1R5cGUgaXMgZGVmaW5lZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgY29uc3Qgb3B0cyA9IHt1bmxvY2tUeXBlOiBcInVubG9ja190eXBlXCJ9O1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnd2FpdEZvckRldmljZScpLm9uY2UoKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3N0YXJ0TG9nY2F0Jykub25jZSgpO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ3B1c2hTZXR0aW5nc0FwcCcpLm9uY2UoKTtcclxuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdlbnN1cmVEZXZpY2VMb2NhbGUnKS5vbmNlKCk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygnc2V0TW9ja0xvY2F0aW9uQXBwJykub25jZSgpO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ2luaXRVbmljb2RlS2V5Ym9hcmQnKS5uZXZlcigpO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ3B1c2hVbmxvY2snKS5uZXZlcigpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLmluaXREZXZpY2UoYWRiLCBvcHRzKTtcclxuICAgICAgbW9ja3MuaGVscGVycy52ZXJpZnkoKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgfSkpO1xyXG4gIGRlc2NyaWJlKCdyZW1vdmVOdWxsUHJvcGVydGllcycsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgaWdub3JlIG51bGwgcHJvcGVydGllcycsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IHRlc3QgPSB7Zm9vOiBudWxsLCBiYXI6IHRydWV9O1xyXG4gICAgICBoZWxwZXJzLnJlbW92ZU51bGxQcm9wZXJ0aWVzKHRlc3QpO1xyXG4gICAgICBfLmtleXModGVzdCkubGVuZ3RoLnNob3VsZC5lcXVhbCgxKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBpZ25vcmUgdW5kZWZpbmVkIHByb3BlcnRpZXMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGxldCB0ZXN0ID0ge2ZvbzogdW5kZWZpbmVkLCBiYXI6IHRydWV9O1xyXG4gICAgICBoZWxwZXJzLnJlbW92ZU51bGxQcm9wZXJ0aWVzKHRlc3QpO1xyXG4gICAgICBfLmtleXModGVzdCkubGVuZ3RoLnNob3VsZC5lcXVhbCgxKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBub3QgaWdub3JlIGZhbHN5IHByb3BlcnRpZXMgbGlrZSAwIGFuZCBmYWxzZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IHRlc3QgPSB7Zm9vOiBmYWxzZSwgYmFyOiB0cnVlLCB6ZXJvOiAwfTtcclxuICAgICAgaGVscGVycy5yZW1vdmVOdWxsUHJvcGVydGllcyh0ZXN0KTtcclxuICAgICAgXy5rZXlzKHRlc3QpLmxlbmd0aC5zaG91bGQuZXF1YWwoMyk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgndHJ1bmNhdGVEZWNpbWFscycsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgdXNlIGZsb29yIHdoZW4gbnVtYmVyIGlzIHBvc2l0aXZlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBoZWxwZXJzLnRydW5jYXRlRGVjaW1hbHMoMTIuMzQ1LCAyKS5zaG91bGQuZXF1YWwoMTIuMzQpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHVzZSBjZWlsIHdoZW4gbnVtYmVyIGlzIG5lZ2F0aXZlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBoZWxwZXJzLnRydW5jYXRlRGVjaW1hbHMoLTEyLjM0NSwgMikuc2hvdWxkLmVxdWFsKC0xMi4zNCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnZ2V0Q2hyb21lUGtnJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gcGFrYWdlIGZvciBjaHJvbWl1bScsIGFzeW5jICgpID0+IHtcclxuICAgICAgaGVscGVycy5nZXRDaHJvbWVQa2coJ2Nocm9taXVtJykuc2hvdWxkLmRlZXAuZXF1YWwoXHJcbiAgICAgICAge3BrZzogJ29yZy5jaHJvbWl1bS5jaHJvbWUuc2hlbGwnLCBhY3Rpdml0eTogJy5DaHJvbWVTaGVsbEFjdGl2aXR5J30pO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiBwYWthZ2UgZm9yIGNocm9tZWJldGEnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGhlbHBlcnMuZ2V0Q2hyb21lUGtnKCdjaHJvbWViZXRhJykuc2hvdWxkLmRlZXAuZXF1YWwoXHJcbiAgICAgICAge3BrZzogJ2NvbS5jaHJvbWUuYmV0YScsIGFjdGl2aXR5OiAnY29tLmdvb2dsZS5hbmRyb2lkLmFwcHMuY2hyb21lLk1haW4nfSk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgcmV0dXJuIHBha2FnZSBmb3IgYnJvd3NlcicsIGFzeW5jICgpID0+IHtcclxuICAgICAgaGVscGVycy5nZXRDaHJvbWVQa2coJ2Jyb3dzZXInKS5zaG91bGQuZGVlcC5lcXVhbChcclxuICAgICAgICB7cGtnOiAnY29tLmFuZHJvaWQuYnJvd3NlcicsIGFjdGl2aXR5OiAnY29tLmFuZHJvaWQuYnJvd3Nlci5Ccm93c2VyQWN0aXZpdHknfSk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgcmV0dXJuIHBha2FnZSBmb3IgY2hyb21pdW0tYnJvd3NlcicsIGFzeW5jICgpID0+IHtcclxuICAgICAgaGVscGVycy5nZXRDaHJvbWVQa2coJ2Nocm9taXVtLWJyb3dzZXInKS5zaG91bGQuZGVlcC5lcXVhbChcclxuICAgICAgICB7cGtnOiAnb3JnLmNocm9taXVtLmNocm9tZScsIGFjdGl2aXR5OiAnY29tLmdvb2dsZS5hbmRyb2lkLmFwcHMuY2hyb21lLk1haW4nfSk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgcmV0dXJuIHBha2FnZSBmb3IgY2hyb21pdW0td2VidmlldycsIGFzeW5jICgpID0+IHtcclxuICAgICAgaGVscGVycy5nZXRDaHJvbWVQa2coJ2Nocm9taXVtLXdlYnZpZXcnKS5zaG91bGQuZGVlcC5lcXVhbChcclxuICAgICAgICB7cGtnOiAnb3JnLmNocm9taXVtLndlYnZpZXdfc2hlbGwnLCBhY3Rpdml0eTogJ29yZy5jaHJvbWl1bS53ZWJ2aWV3X3NoZWxsLldlYlZpZXdCcm93c2VyQWN0aXZpdHknfSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLiJ9
