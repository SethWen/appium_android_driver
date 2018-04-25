'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _2 = require('../..');

var _3 = _interopRequireDefault(_2);

var _desired = require('./desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);
var expect = _chai2['default'].expect;

var defaultCaps = _lodash2['default'].defaults({
  androidInstallTimeout: 90000
}, _desired2['default']);

describe('createSession', function () {
  var _this = this;

  var driver = undefined;
  before(function () {
    driver = new _3['default']();
  });
  afterEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.deleteSession());

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  function getPackageAndActivity(driver) {
    var appPackage, appActivity;
    return _regeneratorRuntime.async(function getPackageAndActivity$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getCurrentPackage());

        case 2:
          appPackage = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getCurrentActivity());

        case 5:
          appActivity = context$2$0.sent;
          return context$2$0.abrupt('return', { appPackage: appPackage, appActivity: appActivity });

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  }

  it('should start android session focusing on default pkg and act', function callee$1$0() {
    var _ref, appPackage, appActivity;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.createSession(defaultCaps));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(getPackageAndActivity(driver));

        case 4:
          _ref = context$2$0.sent;
          appPackage = _ref.appPackage;
          appActivity = _ref.appActivity;

          appPackage.should.equal('io.appium.android.apis');
          appActivity.should.equal('.ApiDemos');

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should start android session focusing on custom pkg and act', function callee$1$0() {
    var caps, _ref2, appPackage, appActivity;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.view.SplitTouchView';
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(getPackageAndActivity(driver));

        case 7:
          _ref2 = context$2$0.sent;
          appPackage = _ref2.appPackage;
          appActivity = _ref2.appActivity;

          appPackage.should.equal(caps.appPackage);
          appActivity.should.equal(caps.appActivity);

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should error out for not apk extention', function callee$1$0() {
    var caps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.app = 'foo';
          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.view.SplitTouchView';
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.createSession(caps).should.eventually.be.rejectedWith(/apk/));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should error out if neither an app or a browser is defined', function callee$1$0() {
    var caps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.app = '';
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.createSession(caps).should.eventually.be.rejectedWith(/include/));

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should error out for invalid app path', function callee$1$0() {
    var caps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.app = 'foo.apk';
          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.view.SplitTouchView';
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.createSession(caps).should.eventually.be.rejectedWith(/Could not find/));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to start session without launching or installing app', function callee$1$0() {
    var caps, _ref3, appPackage, appActivity;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.view.SplitTouchView';
          caps.autoLaunch = false;
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(getPackageAndActivity(driver));

        case 8:
          _ref3 = context$2$0.sent;
          appPackage = _ref3.appPackage;
          appActivity = _ref3.appActivity;

          expect(appPackage).to.not.equal(caps.appPackage);
          expect(appActivity).to.not.equal(caps.appActivity);

        case 13:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to launch activity with custom intent parameter category', function callee$1$0() {
    var caps, appActivity;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = 'io.appium.android.apis.app.HelloWorld';
          caps.intentCategory = 'appium.android.intent.category.SAMPLE_CODE';
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.getCurrentActivity());

        case 8:
          appActivity = context$2$0.sent;

          appActivity.should.include('HelloWorld');

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to load an app via package', function callee$1$0() {
    var caps, appPackage;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.app = '';
          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.ApiDemos';
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.getCurrentPackage());

        case 8:
          appPackage = context$2$0.sent;

          appPackage.should.include('io.appium.android.apis');

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should error out if package is not on the device', function callee$1$0() {
    var caps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.app = '';
          caps.appPackage = 'sipa.diordna.muippa.oi';
          caps.appActivity = '.ApiDemos';
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.createSession(caps).should.eventually.be.rejectedWith(/Could not find/));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should get updated capabilities', function callee$1$0() {
    var caps, serverCaps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.view.SplitTouchView';
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(driver.getSession());

        case 7:
          serverCaps = context$2$0.sent;

          serverCaps.takesScreenshot.should.exist;

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should get device name, udid, model, manufacturer and screen size in session details', function callee$1$0() {
    var caps, session, serverCaps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.view.SplitTouchView';
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 5:
          session = context$2$0.sent;

          session[1].deviceName.should.exist;
          session[1].deviceUDID.should.exist;

          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(driver.getSession());

        case 10:
          serverCaps = context$2$0.sent;

          serverCaps.deviceName.should.exist;
          serverCaps.deviceUDID.should.exist;
          serverCaps.deviceScreenSize.should.exist;
          serverCaps.deviceModel.should.exist;
          serverCaps.deviceManufacturer.should.exist;

        case 16:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should error out for activity that fails to load after app wait activity timeout', function callee$1$0() {
    var caps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.appWaitActivity = 'non.existent.activity';
          caps.appWaitDuration = 1000; // 1 second
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.createSession(caps).should.eventually.be.rejectedWith(/never started/));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to grant permissions', function callee$1$0() {
    var adb, apiLevel, caps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          adb = new _appiumAdb2['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.getApiLevel());

        case 3:
          apiLevel = context$2$0.sent;

          if (!(apiLevel < 23)) {
            context$2$0.next = 6;
            break;
          }

          return context$2$0.abrupt('return', this.skip());

        case 6:
          caps = _Object$assign({}, defaultCaps);

          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = 'io.appium.android.apis.app.HelloWorld';
          caps.intentCategory = 'appium.android.intent.category.SAMPLE_CODE';
          caps.autoGrantPermissions = true;
          context$2$0.next = 13;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 13:
          context$2$0.next = 15;
          return _regeneratorRuntime.awrap(driver.adb.getGrantedPermissions('io.appium.android.apis'));

        case 15:
          context$2$0.t0 = context$2$0.sent;
          context$2$0.t1 = ['android.permission.RECEIVE_SMS'];
          expect(context$2$0.t0).to.include.members(context$2$0.t1);

        case 18:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  describe('W3C compliance', function () {
    it('should accept W3C parameters', function callee$2$0() {
      var _ref4, _ref42, sessionId, caps;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession(null, null, {
              alwaysMatch: _Object$assign({}, defaultCaps),
              firstMatch: [{}]
            }));

          case 2:
            _ref4 = context$3$0.sent;
            _ref42 = _slicedToArray(_ref4, 2);
            sessionId = _ref42[0];
            caps = _ref42[1];

            sessionId.should.exist;
            caps.should.exist;

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});

describe('close', function () {
  var _this2 = this;

  var driver = undefined;
  before(function () {
    driver = new _3['default']();
  });
  afterEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.deleteSession());

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this2);
  });
  it('should close application', function callee$1$0() {
    var appPackage;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.createSession(defaultCaps));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.closeApp());

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.getCurrentPackage());

        case 6:
          appPackage = context$2$0.sent;

          if (appPackage) {
            appPackage.should.not.equal("io.appium.android.apis");
          }

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this2);
  });
});

// TODO: why is there no entry for 5.1?
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9kcml2ZXItZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O3NCQUMvQixRQUFROzs7O3lCQUNOLFlBQVk7Ozs7aUJBQ0YsT0FBTzs7Ozt1QkFDUixXQUFXOzs7O0FBR3BDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQztBQUN6QixJQUFJLE1BQU0sR0FBRyxrQkFBSyxNQUFNLENBQUM7O0FBRXpCLElBQUksV0FBVyxHQUFHLG9CQUFFLFFBQVEsQ0FBQztBQUMzQix1QkFBcUIsRUFBRSxLQUFLO0NBQzdCLHVCQUFlLENBQUM7O0FBRWpCLFFBQVEsQ0FBQyxlQUFlLEVBQUUsWUFBWTs7O0FBQ3BDLE1BQUksTUFBTSxZQUFBLENBQUM7QUFDWCxRQUFNLENBQUMsWUFBTTtBQUNYLFVBQU0sR0FBRyxtQkFBbUIsQ0FBQztHQUM5QixDQUFDLENBQUM7QUFDSCxXQUFTLENBQUM7Ozs7OzJDQUNGLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDOztBQUVILFdBQWUscUJBQXFCLENBQUUsTUFBTTtRQUN0QyxVQUFVLEVBQ1YsV0FBVzs7Ozs7MkNBRFEsTUFBTSxDQUFDLGlCQUFpQixFQUFFOzs7QUFBN0Msb0JBQVU7OzJDQUNVLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRTs7O0FBQS9DLHFCQUFXOzhDQUNSLEVBQUMsVUFBVSxFQUFWLFVBQVUsRUFBRSxXQUFXLEVBQVgsV0FBVyxFQUFDOzs7Ozs7O0dBQ2pDOztBQUVELElBQUUsQ0FBQyw4REFBOEQsRUFBRTtjQUU1RCxVQUFVLEVBQUUsV0FBVzs7Ozs7OzJDQUR0QixNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQzs7OzsyQ0FDRCxxQkFBcUIsQ0FBQyxNQUFNLENBQUM7Ozs7QUFBOUQsb0JBQVUsUUFBVixVQUFVO0FBQUUscUJB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Ozs7OzJDQUZSLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDOzs7OzJDQUNqQyxNQUFNLENBQUMsUUFBUSxFQUFFOzs7OzJDQUNBLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRTs7O0FBQTdDLG9CQUFVOztBQUNkLGNBQUksVUFBVSxFQUFFO0FBQ2Qsc0JBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1dBQ3ZEOzs7Ozs7O0dBQ0YsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9kcml2ZXItZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XHJcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IEFEQiBmcm9tICdhcHBpdW0tYWRiJztcclxuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4nO1xyXG5pbXBvcnQgREVGQVVMVF9DQVBTIGZyb20gJy4vZGVzaXJlZCc7XHJcblxyXG5cclxuY2hhaS5zaG91bGQoKTtcclxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xyXG5sZXQgZXhwZWN0ID0gY2hhaS5leHBlY3Q7XHJcblxyXG5sZXQgZGVmYXVsdENhcHMgPSBfLmRlZmF1bHRzKHtcclxuICBhbmRyb2lkSW5zdGFsbFRpbWVvdXQ6IDkwMDAwXHJcbn0sIERFRkFVTFRfQ0FQUyk7XHJcblxyXG5kZXNjcmliZSgnY3JlYXRlU2Vzc2lvbicsIGZ1bmN0aW9uICgpIHtcclxuICBsZXQgZHJpdmVyO1xyXG4gIGJlZm9yZSgoKSA9PiB7XHJcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xyXG4gIH0pO1xyXG4gIGFmdGVyRWFjaChhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xyXG4gIH0pO1xyXG5cclxuICBhc3luYyBmdW5jdGlvbiBnZXRQYWNrYWdlQW5kQWN0aXZpdHkgKGRyaXZlcikge1xyXG4gICAgbGV0IGFwcFBhY2thZ2UgPSBhd2FpdCBkcml2ZXIuZ2V0Q3VycmVudFBhY2thZ2UoKTtcclxuICAgIGxldCBhcHBBY3Rpdml0eSA9IGF3YWl0IGRyaXZlci5nZXRDdXJyZW50QWN0aXZpdHkoKTtcclxuICAgIHJldHVybiB7YXBwUGFja2FnZSwgYXBwQWN0aXZpdHl9O1xyXG4gIH1cclxuXHJcbiAgaXQoJ3Nob3VsZCBzdGFydCBhbmRyb2lkIHNlc3Npb24gZm9jdXNpbmcgb24gZGVmYXVsdCBwa2cgYW5kIGFjdCcsIGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGRlZmF1bHRDYXBzKTtcclxuICAgIGxldCB7YXBwUGFja2FnZSwgYXBwQWN0aXZpdHl9ID0gYXdhaXQgZ2V0UGFja2FnZUFuZEFjdGl2aXR5KGRyaXZlcik7XHJcbiAgICBhcHBQYWNrYWdlLnNob3VsZC5lcXVhbCgnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcycpO1xyXG4gICAgYXBwQWN0aXZpdHkuc2hvdWxkLmVxdWFsKCcuQXBpRGVtb3MnKTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIHN0YXJ0IGFuZHJvaWQgc2Vzc2lvbiBmb2N1c2luZyBvbiBjdXN0b20gcGtnIGFuZCBhY3QnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQgY2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDYXBzKTtcclxuICAgIGNhcHMuYXBwUGFja2FnZSA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJztcclxuICAgIGNhcHMuYXBwQWN0aXZpdHkgPSAnLnZpZXcuU3BsaXRUb3VjaFZpZXcnO1xyXG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XHJcbiAgICBsZXQge2FwcFBhY2thZ2UsIGFwcEFjdGl2aXR5fSA9IGF3YWl0IGdldFBhY2thZ2VBbmRBY3Rpdml0eShkcml2ZXIpO1xyXG4gICAgYXBwUGFja2FnZS5zaG91bGQuZXF1YWwoY2Fwcy5hcHBQYWNrYWdlKTtcclxuICAgIGFwcEFjdGl2aXR5LnNob3VsZC5lcXVhbChjYXBzLmFwcEFjdGl2aXR5KTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGVycm9yIG91dCBmb3Igbm90IGFwayBleHRlbnRpb24nLCBhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQgY2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDYXBzKTtcclxuICAgIGNhcHMuYXBwID0gJ2Zvbyc7XHJcbiAgICBjYXBzLmFwcFBhY2thZ2UgPSAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcyc7XHJcbiAgICBjYXBzLmFwcEFjdGl2aXR5ID0gJy52aWV3LlNwbGl0VG91Y2hWaWV3JztcclxuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvYXBrLyk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBlcnJvciBvdXQgaWYgbmVpdGhlciBhbiBhcHAgb3IgYSBicm93c2VyIGlzIGRlZmluZWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQgY2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDYXBzKTtcclxuICAgIGNhcHMuYXBwID0gJyc7XHJcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL2luY2x1ZGUvKTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGVycm9yIG91dCBmb3IgaW52YWxpZCBhcHAgcGF0aCcsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCBjYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMpO1xyXG4gICAgY2Fwcy5hcHAgPSAnZm9vLmFwayc7XHJcbiAgICBjYXBzLmFwcFBhY2thZ2UgPSAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcyc7XHJcbiAgICBjYXBzLmFwcEFjdGl2aXR5ID0gJy52aWV3LlNwbGl0VG91Y2hWaWV3JztcclxuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvQ291bGQgbm90IGZpbmQvKTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gc3RhcnQgc2Vzc2lvbiB3aXRob3V0IGxhdW5jaGluZyBvciBpbnN0YWxsaW5nIGFwcCcsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCBjYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMpO1xyXG4gICAgY2Fwcy5hcHBQYWNrYWdlID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xyXG4gICAgY2Fwcy5hcHBBY3Rpdml0eSA9ICcudmlldy5TcGxpdFRvdWNoVmlldyc7XHJcbiAgICBjYXBzLmF1dG9MYXVuY2ggPSBmYWxzZTtcclxuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpO1xyXG4gICAgbGV0IHthcHBQYWNrYWdlLCBhcHBBY3Rpdml0eX0gPSBhd2FpdCBnZXRQYWNrYWdlQW5kQWN0aXZpdHkoZHJpdmVyKTtcclxuICAgIGV4cGVjdChhcHBQYWNrYWdlKS50by5ub3QuZXF1YWwoY2Fwcy5hcHBQYWNrYWdlKTtcclxuICAgIGV4cGVjdChhcHBBY3Rpdml0eSkudG8ubm90LmVxdWFsKGNhcHMuYXBwQWN0aXZpdHkpO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBsYXVuY2ggYWN0aXZpdHkgd2l0aCBjdXN0b20gaW50ZW50IHBhcmFtZXRlciBjYXRlZ29yeScsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCBjYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMpO1xyXG4gICAgY2Fwcy5hcHBQYWNrYWdlID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xyXG4gICAgY2Fwcy5hcHBBY3Rpdml0eSA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzLmFwcC5IZWxsb1dvcmxkJztcclxuICAgIGNhcHMuaW50ZW50Q2F0ZWdvcnkgPSAnYXBwaXVtLmFuZHJvaWQuaW50ZW50LmNhdGVnb3J5LlNBTVBMRV9DT0RFJztcclxuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpO1xyXG4gICAgbGV0IGFwcEFjdGl2aXR5ID0gYXdhaXQgZHJpdmVyLmdldEN1cnJlbnRBY3Rpdml0eSgpO1xyXG4gICAgYXBwQWN0aXZpdHkuc2hvdWxkLmluY2x1ZGUoJ0hlbGxvV29ybGQnKTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gbG9hZCBhbiBhcHAgdmlhIHBhY2thZ2UnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQgY2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDYXBzKTtcclxuICAgIGNhcHMuYXBwID0gJyc7XHJcbiAgICBjYXBzLmFwcFBhY2thZ2UgPSAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcyc7XHJcbiAgICBjYXBzLmFwcEFjdGl2aXR5ID0gJy5BcGlEZW1vcyc7XHJcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKTtcclxuICAgIGxldCBhcHBQYWNrYWdlID0gYXdhaXQgZHJpdmVyLmdldEN1cnJlbnRQYWNrYWdlKCk7XHJcbiAgICBhcHBQYWNrYWdlLnNob3VsZC5pbmNsdWRlKCdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJyk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBlcnJvciBvdXQgaWYgcGFja2FnZSBpcyBub3Qgb24gdGhlIGRldmljZScsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCBjYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMpO1xyXG4gICAgY2Fwcy5hcHAgPSAnJztcclxuICAgIGNhcHMuYXBwUGFja2FnZSA9ICdzaXBhLmRpb3JkbmEubXVpcHBhLm9pJztcclxuICAgIGNhcHMuYXBwQWN0aXZpdHkgPSAnLkFwaURlbW9zJztcclxuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvQ291bGQgbm90IGZpbmQvKTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGdldCB1cGRhdGVkIGNhcGFiaWxpdGllcycsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCBjYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMpO1xyXG4gICAgY2Fwcy5hcHBQYWNrYWdlID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xyXG4gICAgY2Fwcy5hcHBBY3Rpdml0eSA9ICcudmlldy5TcGxpdFRvdWNoVmlldyc7XHJcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKTtcclxuICAgIGxldCBzZXJ2ZXJDYXBzID0gYXdhaXQgZHJpdmVyLmdldFNlc3Npb24oKTtcclxuICAgIHNlcnZlckNhcHMudGFrZXNTY3JlZW5zaG90LnNob3VsZC5leGlzdDtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGdldCBkZXZpY2UgbmFtZSwgdWRpZCwgbW9kZWwsIG1hbnVmYWN0dXJlciBhbmQgc2NyZWVuIHNpemUgaW4gc2Vzc2lvbiBkZXRhaWxzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IGNhcHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0Q2Fwcyk7XHJcbiAgICBjYXBzLmFwcFBhY2thZ2UgPSAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcyc7XHJcbiAgICBjYXBzLmFwcEFjdGl2aXR5ID0gJy52aWV3LlNwbGl0VG91Y2hWaWV3JztcclxuICAgIGxldCBzZXNzaW9uID0gYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XHJcbiAgICBzZXNzaW9uWzFdLmRldmljZU5hbWUuc2hvdWxkLmV4aXN0O1xyXG4gICAgc2Vzc2lvblsxXS5kZXZpY2VVRElELnNob3VsZC5leGlzdDtcclxuXHJcbiAgICBsZXQgc2VydmVyQ2FwcyA9IGF3YWl0IGRyaXZlci5nZXRTZXNzaW9uKCk7XHJcbiAgICBzZXJ2ZXJDYXBzLmRldmljZU5hbWUuc2hvdWxkLmV4aXN0O1xyXG4gICAgc2VydmVyQ2Fwcy5kZXZpY2VVRElELnNob3VsZC5leGlzdDtcclxuICAgIHNlcnZlckNhcHMuZGV2aWNlU2NyZWVuU2l6ZS5zaG91bGQuZXhpc3Q7XHJcbiAgICBzZXJ2ZXJDYXBzLmRldmljZU1vZGVsLnNob3VsZC5leGlzdDtcclxuICAgIHNlcnZlckNhcHMuZGV2aWNlTWFudWZhY3R1cmVyLnNob3VsZC5leGlzdDtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGVycm9yIG91dCBmb3IgYWN0aXZpdHkgdGhhdCBmYWlscyB0byBsb2FkIGFmdGVyIGFwcCB3YWl0IGFjdGl2aXR5IHRpbWVvdXQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQgY2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDYXBzKTtcclxuICAgIGNhcHMuYXBwV2FpdEFjdGl2aXR5ID0gJ25vbi5leGlzdGVudC5hY3Rpdml0eSc7XHJcbiAgICBjYXBzLmFwcFdhaXREdXJhdGlvbiA9IDEwMDA7IC8vIDEgc2Vjb25kXHJcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL25ldmVyIHN0YXJ0ZWQvKTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gZ3JhbnQgcGVybWlzc2lvbnMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBUT0RPOiB3aHkgaXMgdGhlcmUgbm8gZW50cnkgZm9yIDUuMT9cclxuICAgIGxldCBhZGIgPSBuZXcgQURCKCk7XHJcbiAgICBsZXQgYXBpTGV2ZWwgPSBhd2FpdCBhZGIuZ2V0QXBpTGV2ZWwoKTtcclxuICAgIGlmIChhcGlMZXZlbCA8IDIzKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNraXAoKTtcclxuICAgIH1cclxuICAgIGxldCBjYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMpO1xyXG4gICAgY2Fwcy5hcHBQYWNrYWdlID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xyXG4gICAgY2Fwcy5hcHBBY3Rpdml0eSA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzLmFwcC5IZWxsb1dvcmxkJztcclxuICAgIGNhcHMuaW50ZW50Q2F0ZWdvcnkgPSAnYXBwaXVtLmFuZHJvaWQuaW50ZW50LmNhdGVnb3J5LlNBTVBMRV9DT0RFJztcclxuICAgIGNhcHMuYXV0b0dyYW50UGVybWlzc2lvbnMgPSB0cnVlO1xyXG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XHJcbiAgICBleHBlY3QoYXdhaXQgZHJpdmVyLmFkYi5nZXRHcmFudGVkUGVybWlzc2lvbnMoJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnKSkudG8uaW5jbHVkZS5tZW1iZXJzKFsnYW5kcm9pZC5wZXJtaXNzaW9uLlJFQ0VJVkVfU01TJ10pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdXM0MgY29tcGxpYW5jZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIGl0KCdzaG91bGQgYWNjZXB0IFczQyBwYXJhbWV0ZXJzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb25zdCBbc2Vzc2lvbklkLCBjYXBzXSA9IGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKG51bGwsIG51bGwsIHtcclxuICAgICAgICBhbHdheXNNYXRjaDogT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMpLFxyXG4gICAgICAgIGZpcnN0TWF0Y2g6IFt7fV0sXHJcbiAgICAgIH0pO1xyXG4gICAgICBzZXNzaW9uSWQuc2hvdWxkLmV4aXN0O1xyXG4gICAgICBjYXBzLnNob3VsZC5leGlzdDtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcbmRlc2NyaWJlKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcclxuICBsZXQgZHJpdmVyO1xyXG4gIGJlZm9yZSgoKSA9PiB7XHJcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xyXG4gIH0pO1xyXG4gIGFmdGVyRWFjaChhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgY2xvc2UgYXBwbGljYXRpb24nLCBhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihkZWZhdWx0Q2Fwcyk7XHJcbiAgICBhd2FpdCBkcml2ZXIuY2xvc2VBcHAoKTtcclxuICAgIGxldCBhcHBQYWNrYWdlID0gYXdhaXQgZHJpdmVyLmdldEN1cnJlbnRQYWNrYWdlKCk7XHJcbiAgICBpZiAoYXBwUGFja2FnZSkge1xyXG4gICAgICBhcHBQYWNrYWdlLnNob3VsZC5ub3QuZXF1YWwoXCJpby5hcHBpdW0uYW5kcm9pZC5hcGlzXCIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uIn0=
