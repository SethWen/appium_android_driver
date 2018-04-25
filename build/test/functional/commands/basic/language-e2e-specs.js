'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _ = require('../../../..');

var _2 = _interopRequireDefault(_);

var _desired = require('../../desired');

var _desired2 = _interopRequireDefault(_desired);

var _helpers = require('../../helpers');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Localization - locale @skip-ci @skip-real-device', function () {
  var _this = this;

  this.timeout(_helpers.MOCHA_TIMEOUT);

  var initialLocale = undefined;

  before(function callee$1$0() {
    var adb;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!process.env.TRAVIS) {
            context$2$0.next = 2;
            break;
          }

          return context$2$0.abrupt('return', this.skip());

        case 2:
          adb = new _appiumAdb2['default']();
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(adb.getApiLevel());

        case 5:
          context$2$0.t0 = context$2$0.sent;

          if (!(context$2$0.t0 > 23)) {
            context$2$0.next = 8;
            break;
          }

          return context$2$0.abrupt('return', this.skip());

        case 8:
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(getLocale(adb));

        case 10:
          initialLocale = context$2$0.sent;

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  var driver = undefined;
  beforeEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _2['default']();

        case 1:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  after(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!driver) {
            context$2$0.next = 5;
            break;
          }

          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.adb.setDeviceCountry(initialLocale));

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.deleteSession());

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  function getLocale(adb) {
    return _regeneratorRuntime.async(function getLocale$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.getApiLevel());

        case 2:
          context$2$0.t0 = context$2$0.sent;

          if (!(context$2$0.t0 < 23)) {
            context$2$0.next = 9;
            break;
          }

          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(adb.getDeviceCountry());

        case 6:
          return context$2$0.abrupt('return', context$2$0.sent);

        case 9:
          context$2$0.next = 11;
          return _regeneratorRuntime.awrap(adb.getDeviceLocale());

        case 11:
          return context$2$0.abrupt('return', context$2$0.sent);

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  }

  it('should start as FR', function callee$1$0() {
    var frCaps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          frCaps = _Object$assign({}, _desired2['default'], { locale: 'FR' });
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(frCaps));

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(getLocale(driver.adb).should.eventually.equal('FR'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should start as US', function callee$1$0() {
    var usCaps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          usCaps = _Object$assign({}, _desired2['default'], { locale: 'US' });
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(usCaps));

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(getLocale(driver.adb).should.eventually.equal('US'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});
//eslint-disable-line curly

// restarting doesn't work on Android 7
//eslint-disable-line curly
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9iYXNpYy9sYW5ndWFnZS1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O3lCQUM3QixZQUFZOzs7O2dCQUNGLGFBQWE7Ozs7dUJBQ2QsZUFBZTs7Ozt1QkFDVixlQUFlOztBQUc3QyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxrREFBa0QsRUFBRSxZQUFZOzs7QUFDdkUsTUFBSSxDQUFDLE9BQU8sd0JBQWUsQ0FBQzs7QUFFNUIsTUFBSSxhQUFhLFlBQUEsQ0FBQzs7QUFFbEIsUUFBTSxDQUFDO1FBSUQsR0FBRzs7OztlQUhILE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTTs7Ozs7OENBQVMsSUFBSSxDQUFDLElBQUksRUFBRTs7O0FBR3RDLGFBQUcsR0FBRyw0QkFBUzs7MkNBQ1QsR0FBRyxDQUFDLFdBQVcsRUFBRTs7Ozs7aUNBQUcsRUFBRTs7Ozs7OENBQVMsSUFBSSxDQUFDLElBQUksRUFBRTs7OzsyQ0FFOUIsU0FBUyxDQUFDLEdBQUcsQ0FBQzs7O0FBQXBDLHVCQUFhOzs7Ozs7O0dBQ2QsQ0FBQyxDQUFDOztBQUVILE1BQUksTUFBTSxZQUFBLENBQUM7QUFDWCxZQUFVLENBQUM7Ozs7QUFDVCxnQkFBTSxHQUFHLG1CQUFtQixDQUFDOzs7Ozs7O0dBQzlCLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7OztlQUNBLE1BQU07Ozs7OzsyQ0FDRixNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQzs7OzsyQ0FFMUMsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUUvQixDQUFDLENBQUM7O0FBRUgsV0FBZSxTQUFTLENBQUUsR0FBRzs7Ozs7MkNBQ2pCLEdBQUcsQ0FBQyxXQUFXLEVBQUU7Ozs7O2lDQUFHLEVBQUU7Ozs7OzsyQ0FDakIsR0FBRyxDQUFDLGdCQUFnQixFQUFFOzs7Ozs7OzJDQUV0QixHQUFHLENBQUMsZUFBZSxFQUFFOzs7Ozs7Ozs7O0dBRXJDOztBQUVELElBQUUsQ0FBQyxvQkFBb0IsRUFBRTtRQUNuQixNQUFNOzs7O0FBQU4sZ0JBQU0sR0FBRyxlQUFjLEVBQUUsd0JBQWdCLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDOzsyQ0FDdEQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7Ozs7MkNBQzVCLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOzs7Ozs7O0dBQzFELENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxvQkFBb0IsRUFBRTtRQUNuQixNQUFNOzs7O0FBQU4sZ0JBQU0sR0FBRyxlQUFjLEVBQUUsd0JBQWdCLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDOzsyQ0FDdEQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7Ozs7MkNBQzVCLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOzs7Ozs7O0dBQzFELENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvYmFzaWMvbGFuZ3VhZ2UtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XHJcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcclxuaW1wb3J0IEFEQiBmcm9tICdhcHBpdW0tYWRiJztcclxuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4vLi4nO1xyXG5pbXBvcnQgREVGQVVMVF9DQVBTIGZyb20gJy4uLy4uL2Rlc2lyZWQnO1xyXG5pbXBvcnQgeyBNT0NIQV9USU1FT1VUIH0gZnJvbSAnLi4vLi4vaGVscGVycyc7XHJcblxyXG5cclxuY2hhaS5zaG91bGQoKTtcclxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xyXG5cclxuZGVzY3JpYmUoJ0xvY2FsaXphdGlvbiAtIGxvY2FsZSBAc2tpcC1jaSBAc2tpcC1yZWFsLWRldmljZScsIGZ1bmN0aW9uICgpIHtcclxuICB0aGlzLnRpbWVvdXQoTU9DSEFfVElNRU9VVCk7XHJcblxyXG4gIGxldCBpbml0aWFsTG9jYWxlO1xyXG5cclxuICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHByb2Nlc3MuZW52LlRSQVZJUykgcmV0dXJuIHRoaXMuc2tpcCgpOyAvL2VzbGludC1kaXNhYmxlLWxpbmUgY3VybHlcclxuXHJcbiAgICAvLyByZXN0YXJ0aW5nIGRvZXNuJ3Qgd29yayBvbiBBbmRyb2lkIDdcclxuICAgIGxldCBhZGIgPSBuZXcgQURCKCk7XHJcbiAgICBpZiAoYXdhaXQgYWRiLmdldEFwaUxldmVsKCkgPiAyMykgcmV0dXJuIHRoaXMuc2tpcCgpOyAvL2VzbGludC1kaXNhYmxlLWxpbmUgY3VybHlcclxuXHJcbiAgICBpbml0aWFsTG9jYWxlID0gYXdhaXQgZ2V0TG9jYWxlKGFkYik7XHJcbiAgfSk7XHJcblxyXG4gIGxldCBkcml2ZXI7XHJcbiAgYmVmb3JlRWFjaChhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xyXG4gIH0pO1xyXG4gIGFmdGVyKGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChkcml2ZXIpIHtcclxuICAgICAgYXdhaXQgZHJpdmVyLmFkYi5zZXREZXZpY2VDb3VudHJ5KGluaXRpYWxMb2NhbGUpO1xyXG5cclxuICAgICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYWxlIChhZGIpIHtcclxuICAgIGlmIChhd2FpdCBhZGIuZ2V0QXBpTGV2ZWwoKSA8IDIzKSB7XHJcbiAgICAgIHJldHVybiBhd2FpdCBhZGIuZ2V0RGV2aWNlQ291bnRyeSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGF3YWl0IGFkYi5nZXREZXZpY2VMb2NhbGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGl0KCdzaG91bGQgc3RhcnQgYXMgRlInLCBhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQgZnJDYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9DQVBTLCB7bG9jYWxlOiAnRlInfSk7XHJcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihmckNhcHMpO1xyXG4gICAgYXdhaXQgZ2V0TG9jYWxlKGRyaXZlci5hZGIpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdGUicpO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgc3RhcnQgYXMgVVMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQgdXNDYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9DQVBTLCB7bG9jYWxlOiAnVVMnfSk7XHJcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbih1c0NhcHMpO1xyXG4gICAgYXdhaXQgZ2V0TG9jYWxlKGRyaXZlci5hZGIpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdVUycpO1xyXG4gIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uXFwuLlxcLi4ifQ==
