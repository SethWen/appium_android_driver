'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _2 = require('../..');

var _3 = _interopRequireDefault(_2);

var _desired = require('./desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var defaultCaps = _lodash2['default'].defaults({
  androidInstallTimeout: 90000
}, _desired2['default']);

var AVD_ANDROID_19_PIN_UNLOCK = "ANDROID_API_19_PIN_UNLOCK";
var AVD_ANDROID_23_PIN_UNLOCK = "ANDROID_API_23_PIN_UNLOCK";
var AVD_ANDROID_19_PASSWORD_UNLOCK = "ANDROID_API_19_PASSWORD_UNLOCK";
var AVD_ANDROID_23_PASSWORD_UNLOCK = "ANDROID_API_23_PASSWORD_UNLOCK";
var AVD_ANDROID_19_PATTERN_UNLOCK = "ANDROID_API_19_PATTERN_UNLOCK";
var AVD_ANDROID_23_PATTERN_UNLOCK = "ANDROID_API_23_PATTERN_UNLOCK";
var AVD_ANDROID_23_FINGERPRINT_UNLOCK = "ANDROID_API_23_FINGERPRINT_UNLOCK";

describe('unlock tests', function () {
  var driver = undefined;

  describe.skip('functional', function () {
    before(function () {
      driver = new _3['default']();
    });
    afterEach(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should unlock an Android 19 device using a PIN', function callee$2$0() {
      var caps, isLock;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = _lodash2['default'].extend(defaultCaps, { unlockType: "pin", unlockKey: "1111", avd: AVD_ANDROID_19_PIN_UNLOCK });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(caps));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.adb.isScreenLocked());

          case 5:
            isLock = context$3$0.sent;

            isLock.should.equal(false);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should unlock an Android 23 device using a PIN', function callee$2$0() {
      var caps, isLock;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = _lodash2['default'].extend(defaultCaps, { unlockType: "pin", unlockKey: "1111", avd: AVD_ANDROID_23_PIN_UNLOCK });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(caps));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.adb.isScreenLocked());

          case 5:
            isLock = context$3$0.sent;

            isLock.should.equal(false);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should unlock an Android 19 device using a PASSWORD', function callee$2$0() {
      var caps, isLock;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = _lodash2['default'].extend(defaultCaps, { unlockType: "password", unlockKey: "appium", avd: AVD_ANDROID_19_PASSWORD_UNLOCK });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(caps));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.adb.isScreenLocked());

          case 5:
            isLock = context$3$0.sent;

            isLock.should.equal(false);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should unlock an Android 23 device using a PASSWORD', function callee$2$0() {
      var caps, isLock;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = _lodash2['default'].extend(defaultCaps, { unlockType: "password", unlockKey: "appium", avd: AVD_ANDROID_23_PASSWORD_UNLOCK });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(caps));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.adb.isScreenLocked());

          case 5:
            isLock = context$3$0.sent;

            isLock.should.equal(false);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should unlock an Android 19 device using a PATTERN', function callee$2$0() {
      var caps, isLock;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = _lodash2['default'].extend(defaultCaps, { unlockType: "pattern", unlockKey: "729856143", avd: AVD_ANDROID_19_PATTERN_UNLOCK });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(caps));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.adb.isScreenLocked());

          case 5:
            isLock = context$3$0.sent;

            isLock.should.equal(false);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should unlock an Android 23 device using a PATTERN', function callee$2$0() {
      var caps, isLock;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = _lodash2['default'].extend(defaultCaps, { unlockType: "pattern", unlockKey: "729856143", avd: AVD_ANDROID_23_PATTERN_UNLOCK });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(caps));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.adb.isScreenLocked());

          case 5:
            isLock = context$3$0.sent;

            isLock.should.equal(false);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should unlock an Android 23 device using FINGERPRINT', function callee$2$0() {
      var caps, isLock;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = _lodash2['default'].extend(defaultCaps, { unlockType: "pattern", unlockKey: "729856143", avd: AVD_ANDROID_23_FINGERPRINT_UNLOCK });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(caps));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.adb.isScreenLocked());

          case 5:
            isLock = context$3$0.sent;

            isLock.should.equal(false);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC91bmxvY2tlci1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O3NCQUMvQixRQUFROzs7O2lCQUNJLE9BQU87Ozs7dUJBQ1IsV0FBVzs7OztBQUVwQyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQUksV0FBVyxHQUFHLG9CQUFFLFFBQVEsQ0FBQztBQUMzQix1QkFBcUIsRUFBRSxLQUFLO0NBQzdCLHVCQUFlLENBQUM7O0FBRWpCLElBQU0seUJBQXlCLEdBQUcsMkJBQTJCLENBQUM7QUFDOUQsSUFBTSx5QkFBeUIsR0FBRywyQkFBMkIsQ0FBQztBQUM5RCxJQUFNLDhCQUE4QixHQUFHLGdDQUFnQyxDQUFDO0FBQ3hFLElBQU0sOEJBQThCLEdBQUcsZ0NBQWdDLENBQUM7QUFDeEUsSUFBTSw2QkFBNkIsR0FBRywrQkFBK0IsQ0FBQztBQUN0RSxJQUFNLDZCQUE2QixHQUFHLCtCQUErQixDQUFDO0FBQ3RFLElBQU0saUNBQWlDLEdBQUcsbUNBQW1DLENBQUM7O0FBRTlFLFFBQVEsQ0FBQyxjQUFjLEVBQUUsWUFBTTtBQUM3QixNQUFJLE1BQU0sWUFBQSxDQUFDOztBQUVYLFVBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFlBQU07QUFDaEMsVUFBTSxDQUFDLFlBQU07QUFDWCxZQUFNLEdBQUcsbUJBQW1CLENBQUM7S0FDOUIsQ0FBQyxDQUFDO0FBQ0gsYUFBUyxDQUFDOzs7Ozs2Q0FDRixNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7O0tBQzdCLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyxnREFBZ0QsRUFBRTtVQUMvQyxJQUFJLEVBRUosTUFBTTs7OztBQUZOLGdCQUFJLEdBQUcsb0JBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FB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QyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7O0tBQzVCLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyxzREFBc0QsRUFBRTtVQUNyRCxJQUFJLEVBRUosTUFBTTs7OztBQUZOLGdCQUFJLEdBQUcsb0JBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsaUNBQWlDLEVBQUMsQ0FBQzs7NkNBQ25ILE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDOzs7OzZDQUNiLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFOzs7QUFBMUMsa0JBQU07O0FBQ1Ysa0JBQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7O0tBQzVCLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvdW5sb2NrZXItZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XHJcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4nO1xyXG5pbXBvcnQgREVGQVVMVF9DQVBTIGZyb20gJy4vZGVzaXJlZCc7XHJcblxyXG5jaGFpLnNob3VsZCgpO1xyXG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XHJcblxyXG5sZXQgZGVmYXVsdENhcHMgPSBfLmRlZmF1bHRzKHtcclxuICBhbmRyb2lkSW5zdGFsbFRpbWVvdXQ6IDkwMDAwXHJcbn0sIERFRkFVTFRfQ0FQUyk7XHJcblxyXG5jb25zdCBBVkRfQU5EUk9JRF8xOV9QSU5fVU5MT0NLID0gXCJBTkRST0lEX0FQSV8xOV9QSU5fVU5MT0NLXCI7XHJcbmNvbnN0IEFWRF9BTkRST0lEXzIzX1BJTl9VTkxPQ0sgPSBcIkFORFJPSURfQVBJXzIzX1BJTl9VTkxPQ0tcIjtcclxuY29uc3QgQVZEX0FORFJPSURfMTlfUEFTU1dPUkRfVU5MT0NLID0gXCJBTkRST0lEX0FQSV8xOV9QQVNTV09SRF9VTkxPQ0tcIjtcclxuY29uc3QgQVZEX0FORFJPSURfMjNfUEFTU1dPUkRfVU5MT0NLID0gXCJBTkRST0lEX0FQSV8yM19QQVNTV09SRF9VTkxPQ0tcIjtcclxuY29uc3QgQVZEX0FORFJPSURfMTlfUEFUVEVSTl9VTkxPQ0sgPSBcIkFORFJPSURfQVBJXzE5X1BBVFRFUk5fVU5MT0NLXCI7XHJcbmNvbnN0IEFWRF9BTkRST0lEXzIzX1BBVFRFUk5fVU5MT0NLID0gXCJBTkRST0lEX0FQSV8yM19QQVRURVJOX1VOTE9DS1wiO1xyXG5jb25zdCBBVkRfQU5EUk9JRF8yM19GSU5HRVJQUklOVF9VTkxPQ0sgPSBcIkFORFJPSURfQVBJXzIzX0ZJTkdFUlBSSU5UX1VOTE9DS1wiO1xyXG5cclxuZGVzY3JpYmUoJ3VubG9jayB0ZXN0cycsICgpID0+IHtcclxuICBsZXQgZHJpdmVyO1xyXG5cclxuICBkZXNjcmliZS5za2lwKCdmdW5jdGlvbmFsJywgKCkgPT4ge1xyXG4gICAgYmVmb3JlKCgpID0+IHtcclxuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcclxuICAgIH0pO1xyXG4gICAgYWZ0ZXJFYWNoKGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB1bmxvY2sgYW4gQW5kcm9pZCAxOSBkZXZpY2UgdXNpbmcgYSBQSU4nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGxldCBjYXBzID0gXy5leHRlbmQoZGVmYXVsdENhcHMsIHt1bmxvY2tUeXBlOiBcInBpblwiLCB1bmxvY2tLZXk6IFwiMTExMVwiLCBhdmQ6IEFWRF9BTkRST0lEXzE5X1BJTl9VTkxPQ0t9KTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XHJcbiAgICAgIGxldCBpc0xvY2sgPSBhd2FpdCBkcml2ZXIuYWRiLmlzU2NyZWVuTG9ja2VkKCk7XHJcbiAgICAgIGlzTG9jay5zaG91bGQuZXF1YWwoZmFsc2UpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHVubG9jayBhbiBBbmRyb2lkIDIzIGRldmljZSB1c2luZyBhIFBJTicsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IGNhcHMgPSBfLmV4dGVuZChkZWZhdWx0Q2Fwcywge3VubG9ja1R5cGU6IFwicGluXCIsIHVubG9ja0tleTogXCIxMTExXCIsIGF2ZDogQVZEX0FORFJPSURfMjNfUElOX1VOTE9DS30pO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKTtcclxuICAgICAgbGV0IGlzTG9jayA9IGF3YWl0IGRyaXZlci5hZGIuaXNTY3JlZW5Mb2NrZWQoKTtcclxuICAgICAgaXNMb2NrLnNob3VsZC5lcXVhbChmYWxzZSk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdW5sb2NrIGFuIEFuZHJvaWQgMTkgZGV2aWNlIHVzaW5nIGEgUEFTU1dPUkQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGxldCBjYXBzID0gXy5leHRlbmQoZGVmYXVsdENhcHMsIHt1bmxvY2tUeXBlOiBcInBhc3N3b3JkXCIsIHVubG9ja0tleTogXCJhcHBpdW1cIiwgYXZkOiBBVkRfQU5EUk9JRF8xOV9QQVNTV09SRF9VTkxPQ0t9KTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XHJcbiAgICAgIGxldCBpc0xvY2sgPSBhd2FpdCBkcml2ZXIuYWRiLmlzU2NyZWVuTG9ja2VkKCk7XHJcbiAgICAgIGlzTG9jay5zaG91bGQuZXF1YWwoZmFsc2UpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHVubG9jayBhbiBBbmRyb2lkIDIzIGRldmljZSB1c2luZyBhIFBBU1NXT1JEJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgY2FwcyA9IF8uZXh0ZW5kKGRlZmF1bHRDYXBzLCB7dW5sb2NrVHlwZTogXCJwYXNzd29yZFwiLCB1bmxvY2tLZXk6IFwiYXBwaXVtXCIsIGF2ZDogQVZEX0FORFJPSURfMjNfUEFTU1dPUkRfVU5MT0NLfSk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpO1xyXG4gICAgICBsZXQgaXNMb2NrID0gYXdhaXQgZHJpdmVyLmFkYi5pc1NjcmVlbkxvY2tlZCgpO1xyXG4gICAgICBpc0xvY2suc2hvdWxkLmVxdWFsKGZhbHNlKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB1bmxvY2sgYW4gQW5kcm9pZCAxOSBkZXZpY2UgdXNpbmcgYSBQQVRURVJOJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgY2FwcyA9IF8uZXh0ZW5kKGRlZmF1bHRDYXBzLCB7dW5sb2NrVHlwZTogXCJwYXR0ZXJuXCIsIHVubG9ja0tleTogXCI3Mjk4NTYxNDNcIiwgYXZkOiBBVkRfQU5EUk9JRF8xOV9QQVRURVJOX1VOTE9DS30pO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKTtcclxuICAgICAgbGV0IGlzTG9jayA9IGF3YWl0IGRyaXZlci5hZGIuaXNTY3JlZW5Mb2NrZWQoKTtcclxuICAgICAgaXNMb2NrLnNob3VsZC5lcXVhbChmYWxzZSk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdW5sb2NrIGFuIEFuZHJvaWQgMjMgZGV2aWNlIHVzaW5nIGEgUEFUVEVSTicsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IGNhcHMgPSBfLmV4dGVuZChkZWZhdWx0Q2Fwcywge3VubG9ja1R5cGU6IFwicGF0dGVyblwiLCB1bmxvY2tLZXk6IFwiNzI5ODU2MTQzXCIsIGF2ZDogQVZEX0FORFJPSURfMjNfUEFUVEVSTl9VTkxPQ0t9KTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XHJcbiAgICAgIGxldCBpc0xvY2sgPSBhd2FpdCBkcml2ZXIuYWRiLmlzU2NyZWVuTG9ja2VkKCk7XHJcbiAgICAgIGlzTG9jay5zaG91bGQuZXF1YWwoZmFsc2UpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHVubG9jayBhbiBBbmRyb2lkIDIzIGRldmljZSB1c2luZyBGSU5HRVJQUklOVCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IGNhcHMgPSBfLmV4dGVuZChkZWZhdWx0Q2Fwcywge3VubG9ja1R5cGU6IFwicGF0dGVyblwiLCB1bmxvY2tLZXk6IFwiNzI5ODU2MTQzXCIsIGF2ZDogQVZEX0FORFJPSURfMjNfRklOR0VSUFJJTlRfVU5MT0NLfSk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpO1xyXG4gICAgICBsZXQgaXNMb2NrID0gYXdhaXQgZHJpdmVyLmFkYi5pc1NjcmVlbkxvY2tlZCgpO1xyXG4gICAgICBpc0xvY2suc2hvdWxkLmVxdWFsKGZhbHNlKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uIn0=
