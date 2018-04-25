'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _2 = require('../../..');

var _3 = _interopRequireDefault(_2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _desired = require('../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var caps = _lodash2['default'].defaults({
  appPackage: 'io.appium.android.apis',
  appActivity: '.view.TextFields'
}, _desired2['default']);

describe('execute', function () {
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _3['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  after(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.deleteSession());

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should fail if one tries to execute non-mobile command in native context', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.execute('blabla').should.eventually.be.rejected);

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should fail if one tries to execute an unknown mobile command in native context', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.execute('mobile: blabla').should.eventually.be.rejectedWith(/Unknown mobile command/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should fail if one tries to execute a shell command without relaxed security flag set', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.execute('mobile: shell', { command: 'pm', args: ['list'] }).should.eventually.be.rejectedWith(/must have relaxed security flag set/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should fail if no command argument is provided to shell call', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver.relaxedSecurityEnabled = true;
          context$2$0.prev = 1;
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.execute('mobile: shell', { comand: 'pm', args: ['list'] }).should.eventually.be.rejectedWith(/argument is mandatory/));

        case 4:
          context$2$0.prev = 4;

          driver.relaxedSecurityEnabled = undefined;
          return context$2$0.finish(4);

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this, [[1,, 4, 7]]);
  });

  it('should return a result if correct shell command is provided', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver.relaxedSecurityEnabled = true;
          context$2$0.prev = 1;
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.execute('mobile: shell', { command: 'echo', args: 'hello' }));

        case 4:
          context$2$0.sent.should.not.be.empty;

        case 5:
          context$2$0.prev = 5;

          driver.relaxedSecurityEnabled = undefined;
          return context$2$0.finish(5);

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this, [[1,, 5, 8]]);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9leGVjdXRlLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2lCQUNuQixVQUFVOzs7O3NCQUN0QixRQUFROzs7O3VCQUNHLFlBQVk7Ozs7QUFHckMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxJQUFJLEdBQUcsb0JBQUUsUUFBUSxDQUFDO0FBQ3BCLFlBQVUsRUFBRSx3QkFBd0I7QUFDcEMsYUFBVyxFQUFFLGtCQUFrQjtDQUNoQyx1QkFBZSxDQUFDOztBQUVqQixRQUFRLENBQUMsU0FBUyxFQUFFLFlBQVk7QUFDOUIsUUFBTSxDQUFDOzs7O0FBQ0wsZ0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7MkNBQ3ZCLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDOzs7Ozs7O0dBQ2pDLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUM3QixDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLDBFQUEwRSxFQUFFOzs7OzsyQ0FDdkUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFROzs7Ozs7O0dBQzdELENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMsaUZBQWlGLEVBQUU7Ozs7OzJDQUM5RSxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLHdCQUF3QixDQUFDOzs7Ozs7O0dBQ25HLENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMsdUZBQXVGLEVBQUU7Ozs7OzJDQUNwRixNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxDQUNuRSxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMscUNBQXFDLENBQUM7Ozs7Ozs7R0FDNUUsQ0FBQyxDQUFDOztBQUVILElBQUUsQ0FBQyw4REFBOEQsRUFBRTs7OztBQUNqRSxnQkFBTSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQzs7OzJDQUU3QixNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxDQUNsRSxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsdUJBQXVCLENBQUM7Ozs7O0FBRTdELGdCQUFNLENBQUMsc0JBQXNCLEdBQUcsU0FBUyxDQUFDOzs7Ozs7OztHQUU3QyxDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLDZEQUE2RCxFQUFFOzs7O0FBQ2hFLGdCQUFNLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDOzs7MkNBRTVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUM7OzsyQkFDckUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSzs7Ozs7QUFFdEIsZ0JBQU0sQ0FBQyxzQkFBc0IsR0FBRyxTQUFTLENBQUM7Ozs7Ozs7O0dBRTdDLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvZXhlY3V0ZS1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcclxuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xyXG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLic7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCBERUZBVUxUX0NBUFMgZnJvbSAnLi4vZGVzaXJlZCc7XHJcblxyXG5cclxuY2hhaS5zaG91bGQoKTtcclxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xyXG5cclxubGV0IGRyaXZlcjtcclxubGV0IGNhcHMgPSBfLmRlZmF1bHRzKHtcclxuICBhcHBQYWNrYWdlOiAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcycsXHJcbiAgYXBwQWN0aXZpdHk6ICcudmlldy5UZXh0RmllbGRzJ1xyXG59LCBERUZBVUxUX0NBUFMpO1xyXG5cclxuZGVzY3JpYmUoJ2V4ZWN1dGUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XHJcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKTtcclxuICB9KTtcclxuICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xyXG4gIH0pO1xyXG5cclxuICBpdCgnc2hvdWxkIGZhaWwgaWYgb25lIHRyaWVzIHRvIGV4ZWN1dGUgbm9uLW1vYmlsZSBjb21tYW5kIGluIG5hdGl2ZSBjb250ZXh0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgYXdhaXQgZHJpdmVyLmV4ZWN1dGUoJ2JsYWJsYScpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkO1xyXG4gIH0pO1xyXG5cclxuICBpdCgnc2hvdWxkIGZhaWwgaWYgb25lIHRyaWVzIHRvIGV4ZWN1dGUgYW4gdW5rbm93biBtb2JpbGUgY29tbWFuZCBpbiBuYXRpdmUgY29udGV4dCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgIGF3YWl0IGRyaXZlci5leGVjdXRlKCdtb2JpbGU6IGJsYWJsYScpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvVW5rbm93biBtb2JpbGUgY29tbWFuZC8pO1xyXG4gIH0pO1xyXG5cclxuICBpdCgnc2hvdWxkIGZhaWwgaWYgb25lIHRyaWVzIHRvIGV4ZWN1dGUgYSBzaGVsbCBjb21tYW5kIHdpdGhvdXQgcmVsYXhlZCBzZWN1cml0eSBmbGFnIHNldCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgIGF3YWl0IGRyaXZlci5leGVjdXRlKCdtb2JpbGU6IHNoZWxsJywge2NvbW1hbmQ6ICdwbScsIGFyZ3M6IFsnbGlzdCddfSlcclxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvbXVzdCBoYXZlIHJlbGF4ZWQgc2VjdXJpdHkgZmxhZyBzZXQvKTtcclxuICB9KTtcclxuXHJcbiAgaXQoJ3Nob3VsZCBmYWlsIGlmIG5vIGNvbW1hbmQgYXJndW1lbnQgaXMgcHJvdmlkZWQgdG8gc2hlbGwgY2FsbCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgIGRyaXZlci5yZWxheGVkU2VjdXJpdHlFbmFibGVkID0gdHJ1ZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5leGVjdXRlKCdtb2JpbGU6IHNoZWxsJywge2NvbWFuZDogJ3BtJywgYXJnczogWydsaXN0J119KVxyXG4gICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL2FyZ3VtZW50IGlzIG1hbmRhdG9yeS8pO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgZHJpdmVyLnJlbGF4ZWRTZWN1cml0eUVuYWJsZWQgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGl0KCdzaG91bGQgcmV0dXJuIGEgcmVzdWx0IGlmIGNvcnJlY3Qgc2hlbGwgY29tbWFuZCBpcyBwcm92aWRlZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgIGRyaXZlci5yZWxheGVkU2VjdXJpdHlFbmFibGVkID0gdHJ1ZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIChhd2FpdCBkcml2ZXIuZXhlY3V0ZSgnbW9iaWxlOiBzaGVsbCcsIHtjb21tYW5kOiAnZWNobycsIGFyZ3M6ICdoZWxsbyd9KSlcclxuICAgICAgICAuc2hvdWxkLm5vdC5iZS5lbXB0eTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIGRyaXZlci5yZWxheGVkU2VjdXJpdHlFbmFibGVkID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uXFwuLiJ9
