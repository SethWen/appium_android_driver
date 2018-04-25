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

var _asyncbox = require('asyncbox');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var defaultCaps = _lodash2['default'].defaults({
  androidInstallTimeout: 90000,
  browserName: 'chrome'
}, _desired2['default']);

describe('toggle wifi tests', function () {
  var driver = undefined;

  describe('functional', function () {
    before(function () {
      if (process.env.TRAVIS) {
        return this.skip();
      }
      if (!process.env.REAL_DEVICE) {
        return this.skip();
      }
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
    it('should toggle wifi on real devices', function callee$2$0() {
      var isWifiOn;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession(defaultCaps));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.isWifiOn());

          case 4:
            isWifiOn = context$3$0.sent;

            if (!isWifiOn) {
              context$3$0.next = 16;
              break;
            }

            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(driver.setWifiState(0, false));

          case 8:
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(500));

          case 10:
            context$3$0.next = 12;
            return _regeneratorRuntime.awrap(driver.isWifiOn());

          case 12:
            isWifiOn = context$3$0.sent;

            isWifiOn.should.be['false'];
            context$3$0.next = 24;
            break;

          case 16:
            context$3$0.next = 18;
            return _regeneratorRuntime.awrap(driver.setWifiState(1, false));

          case 18:
            context$3$0.next = 20;
            return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(2500));

          case 20:
            context$3$0.next = 22;
            return _regeneratorRuntime.awrap(driver.isWifiOn());

          case 22:
            isWifiOn = context$3$0.sent;

            isWifiOn.should.be['true'];

          case 24:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
});

// enabling wifi takes time
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9zZXR0aW5ncy1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O3NCQUMvQixRQUFROzs7O2lCQUNJLE9BQU87Ozs7dUJBQ1IsV0FBVzs7Ozt3QkFDZCxVQUFVOztBQUVoQyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQUksV0FBVyxHQUFHLG9CQUFFLFFBQVEsQ0FBQztBQUMzQix1QkFBcUIsRUFBRSxLQUFLO0FBQzVCLGFBQVcsRUFBRSxRQUFRO0NBQ3RCLHVCQUFlLENBQUM7O0FBRWpCLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxZQUFNO0FBQ2xDLE1BQUksTUFBTSxZQUFBLENBQUM7O0FBRVgsVUFBUSxDQUFDLFlBQVksRUFBRSxZQUFNO0FBQzNCLFVBQU0sQ0FBQyxZQUFZO0FBQ2pCLFVBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7QUFDdEIsZUFBTyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7T0FDcEI7QUFDRCxVQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUU7QUFDNUIsZUFBTyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7T0FDcEI7QUFDRCxZQUFNLEdBQUcsbUJBQW1CLENBQUM7S0FDOUIsQ0FBQyxDQUFDO0FBQ0gsYUFBUyxDQUFDOzs7Ozs2Q0FDRixNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7O0tBQzdCLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyxvQ0FBb0MsRUFBRTtVQUVuQyxRQUFROzs7Ozs2Q0FETixNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQzs7Ozs2Q0FDbEIsTUFBTSxDQUFDLFFBQVEsRUFBRTs7O0FBQWxDLG9CQUFROztpQkFDUixRQUFROzs7Ozs7NkNBQ0osTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDOzs7OzZDQUM3QixxQkFBTSxHQUFHLENBQUM7Ozs7NkNBQ0MsTUFBTSxDQUFDLFFBQVEsRUFBRTs7O0FBQWxDLG9CQUFROztBQUNSLG9CQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBTSxDQUFDOzs7Ozs7NkNBRW5CLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQzs7Ozs2Q0FFN0IscUJBQU0sSUFBSSxDQUFDOzs7OzZDQUNBLE1BQU0sQ0FBQyxRQUFRLEVBQUU7OztBQUFsQyxvQkFBUTs7QUFDUixvQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQUssQ0FBQzs7Ozs7OztLQUUzQixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL3NldHRpbmdzLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xyXG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uJztcclxuaW1wb3J0IERFRkFVTFRfQ0FQUyBmcm9tICcuL2Rlc2lyZWQnO1xyXG5pbXBvcnQgeyBzbGVlcCB9IGZyb20gJ2FzeW5jYm94JztcclxuXHJcbmNoYWkuc2hvdWxkKCk7XHJcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcclxuXHJcbmxldCBkZWZhdWx0Q2FwcyA9IF8uZGVmYXVsdHMoe1xyXG4gIGFuZHJvaWRJbnN0YWxsVGltZW91dDogOTAwMDAsXHJcbiAgYnJvd3Nlck5hbWU6ICdjaHJvbWUnXHJcbn0sIERFRkFVTFRfQ0FQUyk7XHJcblxyXG5kZXNjcmliZSgndG9nZ2xlIHdpZmkgdGVzdHMnLCAoKSA9PiB7XHJcbiAgbGV0IGRyaXZlcjtcclxuXHJcbiAgZGVzY3JpYmUoJ2Z1bmN0aW9uYWwnLCAoKSA9PiB7XHJcbiAgICBiZWZvcmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuVFJBVklTKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2tpcCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghcHJvY2Vzcy5lbnYuUkVBTF9ERVZJQ0UpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5za2lwKCk7XHJcbiAgICAgIH1cclxuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcclxuICAgIH0pO1xyXG4gICAgYWZ0ZXJFYWNoKGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0b2dnbGUgd2lmaSBvbiByZWFsIGRldmljZXMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGRlZmF1bHRDYXBzKTtcclxuICAgICAgbGV0IGlzV2lmaU9uID0gYXdhaXQgZHJpdmVyLmlzV2lmaU9uKCk7XHJcbiAgICAgIGlmIChpc1dpZmlPbikge1xyXG4gICAgICAgIGF3YWl0IGRyaXZlci5zZXRXaWZpU3RhdGUoMCwgZmFsc2UpO1xyXG4gICAgICAgIGF3YWl0IHNsZWVwKDUwMCk7XHJcbiAgICAgICAgaXNXaWZpT24gPSBhd2FpdCBkcml2ZXIuaXNXaWZpT24oKTtcclxuICAgICAgICBpc1dpZmlPbi5zaG91bGQuYmUuZmFsc2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXdhaXQgZHJpdmVyLnNldFdpZmlTdGF0ZSgxLCBmYWxzZSk7XHJcbiAgICAgICAgLy8gZW5hYmxpbmcgd2lmaSB0YWtlcyB0aW1lXHJcbiAgICAgICAgYXdhaXQgc2xlZXAoMjUwMCk7XHJcbiAgICAgICAgaXNXaWZpT24gPSBhd2FpdCBkcml2ZXIuaXNXaWZpT24oKTtcclxuICAgICAgICBpc1dpZmlPbi5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi4ifQ==
