'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _2 = require('../..');

var _3 = _interopRequireDefault(_2);

var _helpers = require('./helpers');

var _desired = require('./desired');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var avd = process.env.ANDROID_25_AVD || 'Nexus_5_API_25';
var capabilities = _lodash2['default'].defaults({
  avd: avd,
  platformVersion: "7.1",
  chromeOptions: {
    args: ["--no-first-run"]
  }
}, _desired.CHROME_CAPS);

describe('createSession', function () {
  var _this = this;

  var driver = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _helpers.ensureAVDExists)(this, capabilities.avd));

        case 2:
          if (context$2$0.sent) {
            context$2$0.next = 4;
            break;
          }

          return context$2$0.abrupt('return');

        case 4:

          driver = new _3['default']();

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
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
  it('should start chrome and dismiss the welcome dialog', function callee$1$0() {
    var appActivity;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.createSession(capabilities));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.getCurrentActivity());

        case 4:
          appActivity = context$2$0.sent;

          appActivity.should.not.equal("org.chromium.chrome.browser.firstrun.FirstRunActivity");

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jaHJvbWUtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7aUJBQ25CLE9BQU87Ozs7dUJBQ0QsV0FBVzs7dUJBQ2YsV0FBVzs7c0JBQ3pCLFFBQVE7Ozs7QUFHdEIsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsSUFBSSxnQkFBZ0IsQ0FBQztBQUMzRCxJQUFNLFlBQVksR0FBRyxvQkFBRSxRQUFRLENBQUM7QUFDOUIsS0FBRyxFQUFILEdBQUc7QUFDSCxpQkFBZSxFQUFFLEtBQUs7QUFDdEIsZUFBYSxFQUFFO0FBQ2IsUUFBSSxFQUFFLENBQUMsZ0JBQWdCLENBQUM7R0FDekI7Q0FDRix1QkFBYyxDQUFDOztBQUVoQixRQUFRLENBQUMsZUFBZSxFQUFFLFlBQVk7OztBQUNwQyxNQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsUUFBTSxDQUFDOzs7OzsyQ0FDTSw4QkFBZ0IsSUFBSSxFQUFFLFlBQVksQ0FBQyxHQUFHLENBQUM7Ozs7Ozs7Ozs7OztBQUlsRCxnQkFBTSxHQUFHLG1CQUFtQixDQUFDOzs7Ozs7O0dBQzlCLENBQUMsQ0FBQztBQUNILFdBQVMsQ0FBQzs7Ozs7MkNBQ0YsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUM3QixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsb0RBQW9ELEVBQUU7UUFFbkQsV0FBVzs7Ozs7MkNBRFQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7Ozs7MkNBQ2hCLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRTs7O0FBQS9DLHFCQUFXOztBQUNmLHFCQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsdURBQXVELENBQUMsQ0FBQzs7Ozs7OztHQUN2RixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2Nocm9tZS1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcclxuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xyXG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLic7XHJcbmltcG9ydCB7IGVuc3VyZUFWREV4aXN0cyB9IGZyb20gJy4vaGVscGVycyc7XHJcbmltcG9ydCB7IENIUk9NRV9DQVBTIH0gZnJvbSAnLi9kZXNpcmVkJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuXHJcblxyXG5jaGFpLnNob3VsZCgpO1xyXG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XHJcblxyXG5jb25zdCBhdmQgPSBwcm9jZXNzLmVudi5BTkRST0lEXzI1X0FWRCB8fCAnTmV4dXNfNV9BUElfMjUnO1xyXG5jb25zdCBjYXBhYmlsaXRpZXMgPSBfLmRlZmF1bHRzKHtcclxuICBhdmQsXHJcbiAgcGxhdGZvcm1WZXJzaW9uOiBcIjcuMVwiLFxyXG4gIGNocm9tZU9wdGlvbnM6IHtcclxuICAgIGFyZ3M6IFtcIi0tbm8tZmlyc3QtcnVuXCJdXHJcbiAgfVxyXG59LCBDSFJPTUVfQ0FQUyk7XHJcblxyXG5kZXNjcmliZSgnY3JlYXRlU2Vzc2lvbicsIGZ1bmN0aW9uICgpIHtcclxuICBsZXQgZHJpdmVyO1xyXG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIWF3YWl0IGVuc3VyZUFWREV4aXN0cyh0aGlzLCBjYXBhYmlsaXRpZXMuYXZkKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcclxuICB9KTtcclxuICBhZnRlckVhY2goYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIHN0YXJ0IGNocm9tZSBhbmQgZGlzbWlzcyB0aGUgd2VsY29tZSBkaWFsb2cnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBhYmlsaXRpZXMpO1xyXG4gICAgbGV0IGFwcEFjdGl2aXR5ID0gYXdhaXQgZHJpdmVyLmdldEN1cnJlbnRBY3Rpdml0eSgpO1xyXG4gICAgYXBwQWN0aXZpdHkuc2hvdWxkLm5vdC5lcXVhbChcIm9yZy5jaHJvbWl1bS5jaHJvbWUuYnJvd3Nlci5maXJzdHJ1bi5GaXJzdFJ1bkFjdGl2aXR5XCIpO1xyXG4gIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uIn0=
