'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this2 = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var driver = undefined;
var adb = undefined;
var sandbox = _sinon2['default'].sandbox.create();
_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Network', function () {
  beforeEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _2['default']();
          adb = new _appiumAdb2['default']();
          driver.adb = adb;
          sandbox.stub(adb);
          sandbox.stub(driver, 'isEmulator');
          sandbox.stub(driver, 'wrapBootstrapDisconnect', function callee$2$0(fn) {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(fn());

                case 2:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });
          sandbox.stub(_bluebird2['default'], 'delay');

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this2);
  });
  afterEach(function () {
    sandbox.restore();
  });
  describe('getNetworkConnection', function () {
    beforeEach(function () {
      adb.isAirplaneModeOn.returns(false);
      adb.isDataOn.returns(false);
      sandbox.stub(driver, 'isWifiOn').returns(false);
    });
    it('should determine nothing enabled', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.getNetworkConnection().should.eventually.equal(0));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should determine airplane mode is on', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.isAirplaneModeOn.returns(true);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getNetworkConnection().should.eventually.equal(1));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should determine wifi is on', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.isWifiOn.returns(true);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getNetworkConnection().should.eventually.equal(2));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should determine data is on', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.isDataOn.returns(true);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getNetworkConnection().should.eventually.equal(4));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should determine wifi and data are on', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.isWifiOn.returns(true);
            adb.isDataOn.returns(true);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getNetworkConnection().should.eventually.equal(6));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });
  describe('isWifiOn', function () {
    it('should return wifi state', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.isWifiOn.returns('wifi_state');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.isWifiOn().should.become('wifi_state'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });
  describe('setNetworkConnection', function () {
    beforeEach(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getNetworkConnection').returns('res');
            sandbox.stub(driver, 'setWifiState');
            driver.isEmulator.returns(false);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should turn off wifi and data', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setNetworkConnection(0).should.become('res'));

          case 2:
            adb.setAirplaneMode.calledWithExactly(0).should.be['true'];
            adb.broadcastAirplaneMode.calledWithExactly(0).should.be['true'];
            driver.setWifiState.calledWithExactly(0).should.be['true'];
            adb.setDataState.calledWithExactly(0, false).should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should turn on and broadcast airplane mode', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setNetworkConnection(1));

          case 2:
            adb.setAirplaneMode.calledWithExactly(1).should.be['true'];
            adb.broadcastAirplaneMode.calledWithExactly(1).should.be['true'];
            driver.setWifiState.called.should.be['false'];
            adb.setDataState.called.should.be['false'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should turn on wifi', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setNetworkConnection(2));

          case 2:
            adb.setAirplaneMode.calledWithExactly(0).should.be['true'];
            adb.broadcastAirplaneMode.calledWithExactly(0).should.be['true'];
            driver.setWifiState.calledWithExactly(1).should.be['true'];
            adb.setDataState.calledWithExactly(0, false).should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should turn on data', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setNetworkConnection(4));

          case 2:
            adb.setAirplaneMode.calledWithExactly(0).should.be['true'];
            adb.broadcastAirplaneMode.calledWithExactly(0).should.be['true'];
            driver.setWifiState.calledWithExactly(0).should.be['true'];
            adb.setDataState.calledWithExactly(1, false).should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should turn on data and wifi', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setNetworkConnection(6));

          case 2:
            adb.setAirplaneMode.calledWithExactly(0).should.be['true'];
            adb.broadcastAirplaneMode.calledWithExactly(0).should.be['true'];
            driver.setWifiState.calledWithExactly(1).should.be['true'];
            adb.setDataState.calledWithExactly(1, false).should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });
  describe('setWifiState', function () {
    it('should set wifi state', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.isEmulator.returns('is_emu');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.setWifiState('wifi_state'));

          case 3:
            adb.setWifiState.calledWithExactly('wifi_state', 'is_emu').should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });
  describe('toggleData', function () {
    it('should toggle data', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.isDataOn.returns(false);
            driver.isEmulator.returns('is_emu');
            adb.setWifiAndData.returns('');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.toggleData());

          case 5:
            adb.setWifiAndData.calledWithExactly({ data: true }, 'is_emu').should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });
  describe('toggleWiFi', function () {
    it('should toggle wifi', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.isWifiOn.returns(false);
            driver.isEmulator.returns('is_emu');
            adb.setWifiAndData.returns('');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.toggleWiFi());

          case 5:
            adb.setWifiAndData.calledWithExactly({ wifi: true }, 'is_emu').should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });
  describe('toggleFlightMode', function () {
    it('should toggle flight mode', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.isAirplaneModeOn.returns(false);
            adb.setAirplaneMode.returns('');
            adb.broadcastAirplaneMode.returns('');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.toggleFlightMode());

          case 5:
            adb.setAirplaneMode.calledWithExactly(true).should.be['true'];
            adb.broadcastAirplaneMode.calledWithExactly(true).should.be['true'];

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });
  describe('setGeoLocation', function () {
    it('should set location', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.setGeoLocation.withArgs('location', 'is_emu').returns('res');
            driver.isEmulator.returns('is_emu');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.setGeoLocation('location').should.become('res'));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });
  describe('toggleLocationSettings', function () {
    beforeEach(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'toggleSetting');

          case 1:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should throw an error for API<16', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.getApiLevel.returns(15);
            driver.isEmulator.returns(false);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.toggleLocationServices().should.eventually.be.rejectedWith(/implemented/));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should generate the correct sequence of keys for API 16', function callee$2$0() {
      var sequence;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sequence = [19, 19, 20];

            adb.getApiLevel.returns(16);
            driver.isEmulator.returns(false);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.toggleLocationServices());

          case 5:
            driver.toggleSetting.calledWith('LOCATION_SOURCE_SETTINGS', sequence).should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should generate the correct sequence of keys for API >= 19', function callee$2$0() {
      var sequence;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sequence = [22, 22, 19];

            adb.getApiLevel.returns(19);
            driver.isEmulator.returns(false);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.toggleLocationServices());

          case 5:
            adb.keyevent.calledWithExactly(19).should.be['true'];
            driver.toggleSetting.calledWith('LOCATION_SOURCE_SETTINGS', sequence).should.be['true'];

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should set gps for emulators', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.getApiLevel.returns(19);
            driver.isEmulator.returns(true);
            adb.getLocationProviders.returns(['wifi']);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.toggleLocationServices());

          case 5:
            adb.toggleGPSLocationProvider.calledWithExactly(true).should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });
  describe('toggleSetting', function () {
    beforeEach(function () {
      sandbox.stub(driver, 'doKey').returns('');
      sandbox.stub(driver, 'openSettingsActivity').returns('');
      adb.getFocusedPackageAndActivity.returns({ appPackage: 'fpkg', appActivity: 'fact' });
    });
    it('should toggle setting', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.toggleSetting('set', [61, 72]));

          case 2:
            driver.doKey.getCall(0).args[0].should.be.equal(61);
            driver.doKey.getCall(1).args[0].should.be.equal(72);
            driver.doKey.getCall(2).args[0].should.be.equal(23);
            driver.doKey.getCall(3).args[0].should.be.equal(22);
            driver.doKey.getCall(4).args[0].should.be.equal(23);
            driver.openSettingsActivity.calledWithExactly('set').should.be['true'];
            adb.waitForNotActivity.calledTwice.should.be['true'];
            adb.waitForNotActivity.alwaysCalledWith('fpkg', 'fact').should.be['true'];
            adb.back.calledOnce.should.be['true'];

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should use default key sequence', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.toggleSetting('set', null));

          case 2:
            driver.doKey.getCall(0).args[0].should.be.equal(19);
            driver.doKey.getCall(1).args[0].should.be.equal(19);
            driver.doKey.getCall(2).args[0].should.be.equal(20);

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should skip errors from adb.waitForNotActivity', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.waitForNotActivity.throws();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.toggleSetting('set', null).should.be.fulfilled);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });
  describe('doKey', function () {
    it('should send key event', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.doKey(55));

          case 2:
            adb.keyevent.calledWithExactly(55).should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });
  describe('wrapBootstrapDisconnect', function () {
    it('should restart adb and start bootstrap', function callee$2$0() {
      var fn;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.wrapBootstrapDisconnect.restore();
            fn = sandbox.stub();

            driver.bootstrap = sandbox.stub();
            driver.bootstrap.start = sandbox.stub();
            driver.opts = { appPackage: 'pkg', disableAndroidWatchers: 'daw', acceptSslCerts: 'acert' };
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(driver.wrapBootstrapDisconnect(fn));

          case 7:
            _sinon2['default'].assert.callOrder(fn, adb.restart, driver.bootstrap.start);
            driver.bootstrap.calledWithExactly('pkg', 'daw', 'acert');
            driver.bootstrap.ignoreUnexpectedShutdown.should.be['false'];

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9jb21tYW5kcy9uZXR3b3JrLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztxQkFDM0IsT0FBTzs7Ozt5QkFDVCxZQUFZOzs7O2dCQUNGLFVBQVU7Ozs7d0JBQ3RCLFVBQVU7Ozs7QUFFeEIsSUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLElBQUksR0FBRyxZQUFBLENBQUM7QUFDUixJQUFJLE9BQU8sR0FBRyxtQkFBTSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDckMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixRQUFRLENBQUMsU0FBUyxFQUFFLFlBQU07QUFDeEIsWUFBVSxDQUFDOzs7Ozs7QUFDVCxnQkFBTSxHQUFHLG1CQUFtQixDQUFDO0FBQzdCLGFBQUcsR0FBRyw0QkFBUyxDQUFDO0FBQ2hCLGdCQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNqQixpQkFBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsQixpQkFBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDbkMsaUJBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLHlCQUF5QixFQUFFLG9CQUFPLEVBQUU7Ozs7O21EQUNqRCxFQUFFLEVBQUU7Ozs7Ozs7V0FDWCxDQUFDLENBQUM7QUFDSCxpQkFBTyxDQUFDLElBQUksd0JBQUksT0FBTyxDQUFDLENBQUM7Ozs7Ozs7R0FDMUIsQ0FBQyxDQUFDO0FBQ0gsV0FBUyxDQUFDLFlBQU07QUFDZCxXQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7R0FDbkIsQ0FBQyxDQUFDO0FBQ0gsVUFBUSxDQUFDLHNCQUFzQixFQUFFLFlBQU07QUFDckMsY0FBVSxDQUFDLFlBQU07QUFDZixTQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFD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LENBQUMsRUFBRSxDQUFDOzs7QUFDdEIsZUFBRyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFLLENBQUM7Ozs7Ozs7S0FDbkQsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0FBQ0gsVUFBUSxDQUFDLHlCQUF5QixFQUFFLFlBQU07QUFDeEMsTUFBRSxDQUFDLHdDQUF3QyxFQUFFO1VBRXZDLEVBQUU7Ozs7QUFETixrQkFBTSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3JDLGNBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFOztBQUN2QixrQkFBTSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDbEMsa0JBQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN4QyxrQkFBTSxDQUFDLElBQUksR0FBRyxFQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsc0JBQXNCLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUMsQ0FBQzs7NkNBQ3BGLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLENBQUM7OztBQUN4QywrQkFBTSxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDaEUsa0JBQU0sQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMxRCxrQkFBTSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFNLENBQUM7Ozs7Ozs7S0FDM0QsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvdW5pdC9jb21tYW5kcy9uZXR3b3JrLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XHJcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcclxuaW1wb3J0IHNpbm9uIGZyb20gJ3Npbm9uJztcclxuaW1wb3J0IEFEQiBmcm9tICdhcHBpdW0tYWRiJztcclxuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4nO1xyXG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XHJcblxyXG5sZXQgZHJpdmVyO1xyXG5sZXQgYWRiO1xyXG5sZXQgc2FuZGJveCA9IHNpbm9uLnNhbmRib3guY3JlYXRlKCk7XHJcbmNoYWkuc2hvdWxkKCk7XHJcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcclxuXHJcbmRlc2NyaWJlKCdOZXR3b3JrJywgKCkgPT4ge1xyXG4gIGJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xyXG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcclxuICAgIGFkYiA9IG5ldyBBREIoKTtcclxuICAgIGRyaXZlci5hZGIgPSBhZGI7XHJcbiAgICBzYW5kYm94LnN0dWIoYWRiKTtcclxuICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdpc0VtdWxhdG9yJyk7XHJcbiAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnd3JhcEJvb3RzdHJhcERpc2Nvbm5lY3QnLCBhc3luYyAoZm4pID0+IHtcclxuICAgICAgYXdhaXQgZm4oKTtcclxuICAgIH0pO1xyXG4gICAgc2FuZGJveC5zdHViKEIsICdkZWxheScpO1xyXG4gIH0pO1xyXG4gIGFmdGVyRWFjaCgoKSA9PiB7XHJcbiAgICBzYW5kYm94LnJlc3RvcmUoKTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnZ2V0TmV0d29ya0Nvbm5lY3Rpb24nLCAoKSA9PiB7XHJcbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcclxuICAgICAgYWRiLmlzQWlycGxhbmVNb2RlT24ucmV0dXJucyhmYWxzZSk7XHJcbiAgICAgIGFkYi5pc0RhdGFPbi5yZXR1cm5zKGZhbHNlKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2lzV2lmaU9uJykucmV0dXJucyhmYWxzZSk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgZGV0ZXJtaW5lIG5vdGhpbmcgZW5hYmxlZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdldE5ldHdvcmtDb25uZWN0aW9uKCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoMCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgZGV0ZXJtaW5lIGFpcnBsYW5lIG1vZGUgaXMgb24nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGFkYi5pc0FpcnBsYW5lTW9kZU9uLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5nZXROZXR3b3JrQ29ubmVjdGlvbigpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKDEpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGRldGVybWluZSB3aWZpIGlzIG9uJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBkcml2ZXIuaXNXaWZpT24ucmV0dXJucyh0cnVlKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdldE5ldHdvcmtDb25uZWN0aW9uKCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoMik7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgZGV0ZXJtaW5lIGRhdGEgaXMgb24nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGFkYi5pc0RhdGFPbi5yZXR1cm5zKHRydWUpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0TmV0d29ya0Nvbm5lY3Rpb24oKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCg0KTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBkZXRlcm1pbmUgd2lmaSBhbmQgZGF0YSBhcmUgb24nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGRyaXZlci5pc1dpZmlPbi5yZXR1cm5zKHRydWUpO1xyXG4gICAgICBhZGIuaXNEYXRhT24ucmV0dXJucyh0cnVlKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdldE5ldHdvcmtDb25uZWN0aW9uKCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoNik7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnaXNXaWZpT24nLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiB3aWZpIHN0YXRlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhZGIuaXNXaWZpT24ucmV0dXJucygnd2lmaV9zdGF0ZScpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuaXNXaWZpT24oKS5zaG91bGQuYmVjb21lKCd3aWZpX3N0YXRlJyk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnc2V0TmV0d29ya0Nvbm5lY3Rpb24nLCAoKSA9PiB7XHJcbiAgICBiZWZvcmVFYWNoKGFzeW5jICgpID0+IHtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2dldE5ldHdvcmtDb25uZWN0aW9uJykucmV0dXJucygncmVzJyk7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdzZXRXaWZpU3RhdGUnKTtcclxuICAgICAgZHJpdmVyLmlzRW11bGF0b3IucmV0dXJucyhmYWxzZSk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdHVybiBvZmYgd2lmaSBhbmQgZGF0YScsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLnNldE5ldHdvcmtDb25uZWN0aW9uKDApLnNob3VsZC5iZWNvbWUoJ3JlcycpO1xyXG4gICAgICBhZGIuc2V0QWlycGxhbmVNb2RlLmNhbGxlZFdpdGhFeGFjdGx5KDApLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBhZGIuYnJvYWRjYXN0QWlycGxhbmVNb2RlLmNhbGxlZFdpdGhFeGFjdGx5KDApLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBkcml2ZXIuc2V0V2lmaVN0YXRlLmNhbGxlZFdpdGhFeGFjdGx5KDApLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBhZGIuc2V0RGF0YVN0YXRlLmNhbGxlZFdpdGhFeGFjdGx5KDAsIGZhbHNlKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0dXJuIG9uIGFuZCBicm9hZGNhc3QgYWlycGxhbmUgbW9kZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLnNldE5ldHdvcmtDb25uZWN0aW9uKDEpO1xyXG4gICAgICBhZGIuc2V0QWlycGxhbmVNb2RlLmNhbGxlZFdpdGhFeGFjdGx5KDEpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBhZGIuYnJvYWRjYXN0QWlycGxhbmVNb2RlLmNhbGxlZFdpdGhFeGFjdGx5KDEpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBkcml2ZXIuc2V0V2lmaVN0YXRlLmNhbGxlZC5zaG91bGQuYmUuZmFsc2U7XHJcbiAgICAgIGFkYi5zZXREYXRhU3RhdGUuY2FsbGVkLnNob3VsZC5iZS5mYWxzZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0dXJuIG9uIHdpZmknLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5zZXROZXR3b3JrQ29ubmVjdGlvbigyKTtcclxuICAgICAgYWRiLnNldEFpcnBsYW5lTW9kZS5jYWxsZWRXaXRoRXhhY3RseSgwKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgYWRiLmJyb2FkY2FzdEFpcnBsYW5lTW9kZS5jYWxsZWRXaXRoRXhhY3RseSgwKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgZHJpdmVyLnNldFdpZmlTdGF0ZS5jYWxsZWRXaXRoRXhhY3RseSgxKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgYWRiLnNldERhdGFTdGF0ZS5jYWxsZWRXaXRoRXhhY3RseSgwLCBmYWxzZSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdHVybiBvbiBkYXRhJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhd2FpdCBkcml2ZXIuc2V0TmV0d29ya0Nvbm5lY3Rpb24oNCk7XHJcbiAgICAgIGFkYi5zZXRBaXJwbGFuZU1vZGUuY2FsbGVkV2l0aEV4YWN0bHkoMCkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGFkYi5icm9hZGNhc3RBaXJwbGFuZU1vZGUuY2FsbGVkV2l0aEV4YWN0bHkoMCkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGRyaXZlci5zZXRXaWZpU3RhdGUuY2FsbGVkV2l0aEV4YWN0bHkoMCkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGFkYi5zZXREYXRhU3RhdGUuY2FsbGVkV2l0aEV4YWN0bHkoMSwgZmFsc2UpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHR1cm4gb24gZGF0YSBhbmQgd2lmaScsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLnNldE5ldHdvcmtDb25uZWN0aW9uKDYpO1xyXG4gICAgICBhZGIuc2V0QWlycGxhbmVNb2RlLmNhbGxlZFdpdGhFeGFjdGx5KDApLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBhZGIuYnJvYWRjYXN0QWlycGxhbmVNb2RlLmNhbGxlZFdpdGhFeGFjdGx5KDApLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBkcml2ZXIuc2V0V2lmaVN0YXRlLmNhbGxlZFdpdGhFeGFjdGx5KDEpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBhZGIuc2V0RGF0YVN0YXRlLmNhbGxlZFdpdGhFeGFjdGx5KDEsIGZhbHNlKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdzZXRXaWZpU3RhdGUnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIHNldCB3aWZpIHN0YXRlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBkcml2ZXIuaXNFbXVsYXRvci5yZXR1cm5zKCdpc19lbXUnKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLnNldFdpZmlTdGF0ZSgnd2lmaV9zdGF0ZScpO1xyXG4gICAgICBhZGIuc2V0V2lmaVN0YXRlLmNhbGxlZFdpdGhFeGFjdGx5KCd3aWZpX3N0YXRlJywgJ2lzX2VtdScpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ3RvZ2dsZURhdGEnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIHRvZ2dsZSBkYXRhJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhZGIuaXNEYXRhT24ucmV0dXJucyhmYWxzZSk7XHJcbiAgICAgIGRyaXZlci5pc0VtdWxhdG9yLnJldHVybnMoJ2lzX2VtdScpO1xyXG4gICAgICBhZGIuc2V0V2lmaUFuZERhdGEucmV0dXJucygnJyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci50b2dnbGVEYXRhKCk7XHJcbiAgICAgIGFkYi5zZXRXaWZpQW5kRGF0YS5jYWxsZWRXaXRoRXhhY3RseSh7ZGF0YTogdHJ1ZX0sICdpc19lbXUnKVxyXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCd0b2dnbGVXaUZpJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCB0b2dnbGUgd2lmaScsIGFzeW5jICgpID0+IHtcclxuICAgICAgYWRiLmlzV2lmaU9uLnJldHVybnMoZmFsc2UpO1xyXG4gICAgICBkcml2ZXIuaXNFbXVsYXRvci5yZXR1cm5zKCdpc19lbXUnKTtcclxuICAgICAgYWRiLnNldFdpZmlBbmREYXRhLnJldHVybnMoJycpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIudG9nZ2xlV2lGaSgpO1xyXG4gICAgICBhZGIuc2V0V2lmaUFuZERhdGEuY2FsbGVkV2l0aEV4YWN0bHkoe3dpZmk6IHRydWV9LCAnaXNfZW11JylcclxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgndG9nZ2xlRmxpZ2h0TW9kZScsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgdG9nZ2xlIGZsaWdodCBtb2RlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhZGIuaXNBaXJwbGFuZU1vZGVPbi5yZXR1cm5zKGZhbHNlKTtcclxuICAgICAgYWRiLnNldEFpcnBsYW5lTW9kZS5yZXR1cm5zKCcnKTtcclxuICAgICAgYWRiLmJyb2FkY2FzdEFpcnBsYW5lTW9kZS5yZXR1cm5zKCcnKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLnRvZ2dsZUZsaWdodE1vZGUoKTtcclxuICAgICAgYWRiLnNldEFpcnBsYW5lTW9kZS5jYWxsZWRXaXRoRXhhY3RseSh0cnVlKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgYWRiLmJyb2FkY2FzdEFpcnBsYW5lTW9kZS5jYWxsZWRXaXRoRXhhY3RseSh0cnVlKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdzZXRHZW9Mb2NhdGlvbicsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgc2V0IGxvY2F0aW9uJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhZGIuc2V0R2VvTG9jYXRpb24ud2l0aEFyZ3MoJ2xvY2F0aW9uJywgJ2lzX2VtdScpLnJldHVybnMoJ3JlcycpO1xyXG4gICAgICBkcml2ZXIuaXNFbXVsYXRvci5yZXR1cm5zKCdpc19lbXUnKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLnNldEdlb0xvY2F0aW9uKCdsb2NhdGlvbicpLnNob3VsZC5iZWNvbWUoJ3JlcycpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ3RvZ2dsZUxvY2F0aW9uU2V0dGluZ3MnLCAoKSA9PiB7XHJcbiAgICBiZWZvcmVFYWNoKGFzeW5jICgpID0+IHtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ3RvZ2dsZVNldHRpbmcnKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBlcnJvciBmb3IgQVBJPDE2JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhZGIuZ2V0QXBpTGV2ZWwucmV0dXJucygxNSk7XHJcbiAgICAgIGRyaXZlci5pc0VtdWxhdG9yLnJldHVybnMoZmFsc2UpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIudG9nZ2xlTG9jYXRpb25TZXJ2aWNlcygpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvaW1wbGVtZW50ZWQvKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBnZW5lcmF0ZSB0aGUgY29ycmVjdCBzZXF1ZW5jZSBvZiBrZXlzIGZvciBBUEkgMTYnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGxldCBzZXF1ZW5jZSA9IFsxOSwgMTksIDIwXTtcclxuICAgICAgYWRiLmdldEFwaUxldmVsLnJldHVybnMoMTYpO1xyXG4gICAgICBkcml2ZXIuaXNFbXVsYXRvci5yZXR1cm5zKGZhbHNlKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLnRvZ2dsZUxvY2F0aW9uU2VydmljZXMoKTtcclxuICAgICAgZHJpdmVyLnRvZ2dsZVNldHRpbmcuY2FsbGVkV2l0aCgnTE9DQVRJT05fU09VUkNFX1NFVFRJTkdTJywgc2VxdWVuY2UpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGdlbmVyYXRlIHRoZSBjb3JyZWN0IHNlcXVlbmNlIG9mIGtleXMgZm9yIEFQSSA+PSAxOScsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IHNlcXVlbmNlID0gWzIyLCAyMiwgMTldO1xyXG4gICAgICBhZGIuZ2V0QXBpTGV2ZWwucmV0dXJucygxOSk7XHJcbiAgICAgIGRyaXZlci5pc0VtdWxhdG9yLnJldHVybnMoZmFsc2UpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIudG9nZ2xlTG9jYXRpb25TZXJ2aWNlcygpO1xyXG4gICAgICBhZGIua2V5ZXZlbnQuY2FsbGVkV2l0aEV4YWN0bHkoMTkpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBkcml2ZXIudG9nZ2xlU2V0dGluZy5jYWxsZWRXaXRoKCdMT0NBVElPTl9TT1VSQ0VfU0VUVElOR1MnLCBzZXF1ZW5jZSlcclxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgc2V0IGdwcyBmb3IgZW11bGF0b3JzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhZGIuZ2V0QXBpTGV2ZWwucmV0dXJucygxOSk7XHJcbiAgICAgIGRyaXZlci5pc0VtdWxhdG9yLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIGFkYi5nZXRMb2NhdGlvblByb3ZpZGVycy5yZXR1cm5zKFsnd2lmaSddKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLnRvZ2dsZUxvY2F0aW9uU2VydmljZXMoKTtcclxuICAgICAgYWRiLnRvZ2dsZUdQU0xvY2F0aW9uUHJvdmlkZXIuY2FsbGVkV2l0aEV4YWN0bHkodHJ1ZSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgndG9nZ2xlU2V0dGluZycsICgpID0+IHtcclxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnZG9LZXknKS5yZXR1cm5zKCcnKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ29wZW5TZXR0aW5nc0FjdGl2aXR5JykucmV0dXJucygnJyk7XHJcbiAgICAgIGFkYi5nZXRGb2N1c2VkUGFja2FnZUFuZEFjdGl2aXR5XHJcbiAgICAgICAgLnJldHVybnMoe2FwcFBhY2thZ2U6ICdmcGtnJywgYXBwQWN0aXZpdHk6J2ZhY3QnfSk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdG9nZ2xlIHNldHRpbmcnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGRyaXZlci50b2dnbGVTZXR0aW5nKCdzZXQnLCBbNjEsIDcyXSk7XHJcbiAgICAgIGRyaXZlci5kb0tleS5nZXRDYWxsKDApLmFyZ3NbMF0uc2hvdWxkLmJlLmVxdWFsKDYxKTtcclxuICAgICAgZHJpdmVyLmRvS2V5LmdldENhbGwoMSkuYXJnc1swXS5zaG91bGQuYmUuZXF1YWwoNzIpO1xyXG4gICAgICBkcml2ZXIuZG9LZXkuZ2V0Q2FsbCgyKS5hcmdzWzBdLnNob3VsZC5iZS5lcXVhbCgyMyk7XHJcbiAgICAgIGRyaXZlci5kb0tleS5nZXRDYWxsKDMpLmFyZ3NbMF0uc2hvdWxkLmJlLmVxdWFsKDIyKTtcclxuICAgICAgZHJpdmVyLmRvS2V5LmdldENhbGwoNCkuYXJnc1swXS5zaG91bGQuYmUuZXF1YWwoMjMpO1xyXG4gICAgICBkcml2ZXIub3BlblNldHRpbmdzQWN0aXZpdHkuY2FsbGVkV2l0aEV4YWN0bHkoJ3NldCcpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBhZGIud2FpdEZvck5vdEFjdGl2aXR5LmNhbGxlZFR3aWNlLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBhZGIud2FpdEZvck5vdEFjdGl2aXR5LmFsd2F5c0NhbGxlZFdpdGgoJ2Zwa2cnLCAnZmFjdCcpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBhZGIuYmFjay5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHVzZSBkZWZhdWx0IGtleSBzZXF1ZW5jZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLnRvZ2dsZVNldHRpbmcoJ3NldCcsIG51bGwpO1xyXG4gICAgICBkcml2ZXIuZG9LZXkuZ2V0Q2FsbCgwKS5hcmdzWzBdLnNob3VsZC5iZS5lcXVhbCgxOSk7XHJcbiAgICAgIGRyaXZlci5kb0tleS5nZXRDYWxsKDEpLmFyZ3NbMF0uc2hvdWxkLmJlLmVxdWFsKDE5KTtcclxuICAgICAgZHJpdmVyLmRvS2V5LmdldENhbGwoMikuYXJnc1swXS5zaG91bGQuYmUuZXF1YWwoMjApO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHNraXAgZXJyb3JzIGZyb20gYWRiLndhaXRGb3JOb3RBY3Rpdml0eScsIGFzeW5jICgpID0+IHtcclxuICAgICAgYWRiLndhaXRGb3JOb3RBY3Rpdml0eS50aHJvd3MoKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLnRvZ2dsZVNldHRpbmcoJ3NldCcsIG51bGwpLnNob3VsZC5iZS5mdWxmaWxsZWQ7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnZG9LZXknLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIHNlbmQga2V5IGV2ZW50JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZG9LZXkoNTUpO1xyXG4gICAgICBhZGIua2V5ZXZlbnQuY2FsbGVkV2l0aEV4YWN0bHkoNTUpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ3dyYXBCb290c3RyYXBEaXNjb25uZWN0JywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCByZXN0YXJ0IGFkYiBhbmQgc3RhcnQgYm9vdHN0cmFwJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBkcml2ZXIud3JhcEJvb3RzdHJhcERpc2Nvbm5lY3QucmVzdG9yZSgpO1xyXG4gICAgICBsZXQgZm4gPSBzYW5kYm94LnN0dWIoKTtcclxuICAgICAgZHJpdmVyLmJvb3RzdHJhcCA9IHNhbmRib3guc3R1YigpO1xyXG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnN0YXJ0ID0gc2FuZGJveC5zdHViKCk7XHJcbiAgICAgIGRyaXZlci5vcHRzID0ge2FwcFBhY2thZ2U6ICdwa2cnLCBkaXNhYmxlQW5kcm9pZFdhdGNoZXJzOiAnZGF3JywgYWNjZXB0U3NsQ2VydHM6ICdhY2VydCd9O1xyXG4gICAgICBhd2FpdCBkcml2ZXIud3JhcEJvb3RzdHJhcERpc2Nvbm5lY3QoZm4pO1xyXG4gICAgICBzaW5vbi5hc3NlcnQuY2FsbE9yZGVyKGZuLCBhZGIucmVzdGFydCwgZHJpdmVyLmJvb3RzdHJhcC5zdGFydCk7XHJcbiAgICAgIGRyaXZlci5ib290c3RyYXAuY2FsbGVkV2l0aEV4YWN0bHkoJ3BrZycsICdkYXcnLCAnYWNlcnQnKTtcclxuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5pZ25vcmVVbmV4cGVjdGVkU2h1dGRvd24uc2hvdWxkLmJlLmZhbHNlO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi5cXC4uIn0=
