'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var caps = {
  browserName: 'Browser',
  deviceName: 'Android',
  platformName: 'Android'
};

describe('setUrl', function () {
  var _this = this;

  var urlId = 'com.android.browser:id/url';
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
          return _regeneratorRuntime.awrap(adb.isAppInstalled('com.android.browser'));

        case 5:
          if (context$2$0.sent) {
            context$2$0.next = 12;
            break;
          }

          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(adb.isAppInstalled('com.android.chrome'));

        case 8:
          if (context$2$0.sent) {
            context$2$0.next = 10;
            break;
          }

          throw new Error('Neither default browser nor chrome available');

        case 10:
          // `browser` is not available, so use `Chrome`
          caps.browserName = 'Chrome';
          urlId = 'com.android.chrome:id/url_bar';

        case 12:

          driver = new _2['default']();
          context$2$0.next = 15;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 15:
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
            context$2$0.next = 3;
            break;
          }

          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.deleteSession());

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('should be able to start a data uri via setUrl', function callee$1$0() {
    var btn, el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!(caps.browserName === 'Chrome')) {
            context$2$0.next = 16;
            break;
          }

          context$2$0.prev = 1;
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'com.android.chrome:id/terms_accept', false));

        case 4:
          btn = context$2$0.sent;
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(driver.click(btn.ELEMENT));

        case 7:
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'com.android.chrome:id/negative_button', false));

        case 9:
          btn = context$2$0.sent;
          context$2$0.next = 12;
          return _regeneratorRuntime.awrap(driver.click(btn.ELEMENT));

        case 12:
          context$2$0.next = 16;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t0 = context$2$0['catch'](1);

        case 16:
          context$2$0.next = 18;
          return _regeneratorRuntime.awrap(driver.setUrl('http://saucelabs.com'));

        case 18:
          context$2$0.next = 20;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', urlId, false));

        case 20:
          el = context$2$0.sent;
          context$2$0.next = 23;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.include('saucelabs.com'));

        case 23:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[1, 14]]);
  });
});
// eslint-disable-line curly

// on some chrome systems, we always get the terms and conditions page
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy91cmwtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ25CLFVBQVU7Ozs7eUJBQ3BCLFlBQVk7Ozs7QUFHNUIsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxJQUFJLEdBQUc7QUFDVCxhQUFXLEVBQUUsU0FBUztBQUN0QixZQUFVLEVBQUUsU0FBUztBQUNyQixjQUFZLEVBQUUsU0FBUztDQUN4QixDQUFDOztBQUVGLFFBQVEsQ0FBQyxRQUFRLEVBQUUsWUFBWTs7O0FBQzdCLE1BQUksS0FBSyxHQUFHLDRCQUE0QixDQUFDO0FBQ3pDLFFBQU0sQ0FBQztRQUdELEdBQUc7Ozs7ZUFGSCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU07Ozs7OzhDQUFTLElBQUksQ0FBQyxJQUFJLEVBQUU7OztBQUV0QyxhQUFHLEdBQUcsNEJBQVM7OzJDQUNSLEdBQUcsQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQUM7Ozs7Ozs7OzsyQ0FDdkMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQzs7Ozs7Ozs7Z0JBQzNDLElBQUksS0FBSyxDQUFDLDhDQUE4QyxDQUFDOzs7O0FBR2pFLGNBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO0FBQzVCLGVBQUssR0FBRywrQkFBK0IsQ0FBQzs7OztBQUcxQyxnQkFBTSxHQUFHLG1CQUFtQixDQUFDOzsyQ0FDdkIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7R0FDakMsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7O2VBQ0EsTUFBTTs7Ozs7OzJDQUNGLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FFL0IsQ0FBQyxDQUFDOztBQUVILElBQUUsQ0FBQywrQ0FBK0MsRUFBRTtRQUkxQyxHQUFHLEVBVVAsRUFBRTs7OztnQkFiRixJQUFJLENBQUMsV0FBVyxLQUFLLFFBQVEsQ0FBQTs7Ozs7OzsyQ0FHYixNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxvQ0FBb0MsRUFBRSxLQUFLLENBQUM7OztBQUFqRixhQUFHOzsyQ0FDRCxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7Ozs7MkNBRW5CLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLHVDQUF1QyxFQUFFLEtBQUssQ0FBQzs7O0FBQXBGLGFBQUc7OzJDQUNHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQzs7Ozs7Ozs7Ozs7OzJDQUk3QixNQUFNLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDOzs7OzJDQUU1QixNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDOzs7QUFBakQsWUFBRTs7MkNBQ0EsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDOzs7Ozs7O0dBQzVFLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvdXJsLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xyXG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XHJcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uJztcclxuaW1wb3J0IEFEQiBmcm9tICdhcHBpdW0tYWRiJztcclxuXHJcblxyXG5jaGFpLnNob3VsZCgpO1xyXG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XHJcblxyXG5sZXQgZHJpdmVyO1xyXG5sZXQgY2FwcyA9IHtcclxuICBicm93c2VyTmFtZTogJ0Jyb3dzZXInLFxyXG4gIGRldmljZU5hbWU6ICdBbmRyb2lkJyxcclxuICBwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJ1xyXG59O1xyXG5cclxuZGVzY3JpYmUoJ3NldFVybCcsIGZ1bmN0aW9uICgpIHtcclxuICBsZXQgdXJsSWQgPSAnY29tLmFuZHJvaWQuYnJvd3NlcjppZC91cmwnO1xyXG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAocHJvY2Vzcy5lbnYuVFJBVklTKSByZXR1cm4gdGhpcy5za2lwKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY3VybHlcclxuXHJcbiAgICBsZXQgYWRiID0gbmV3IEFEQigpO1xyXG4gICAgaWYgKCFhd2FpdCBhZGIuaXNBcHBJbnN0YWxsZWQoJ2NvbS5hbmRyb2lkLmJyb3dzZXInKSkge1xyXG4gICAgICBpZiAoIWF3YWl0IGFkYi5pc0FwcEluc3RhbGxlZCgnY29tLmFuZHJvaWQuY2hyb21lJykpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05laXRoZXIgZGVmYXVsdCBicm93c2VyIG5vciBjaHJvbWUgYXZhaWxhYmxlJyk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gYGJyb3dzZXJgIGlzIG5vdCBhdmFpbGFibGUsIHNvIHVzZSBgQ2hyb21lYFxyXG4gICAgICBjYXBzLmJyb3dzZXJOYW1lID0gJ0Nocm9tZSc7XHJcbiAgICAgIHVybElkID0gJ2NvbS5hbmRyb2lkLmNocm9tZTppZC91cmxfYmFyJztcclxuICAgIH1cclxuXHJcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xyXG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XHJcbiAgfSk7XHJcbiAgYWZ0ZXIoYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGRyaXZlcikge1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gc3RhcnQgYSBkYXRhIHVyaSB2aWEgc2V0VXJsJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGNhcHMuYnJvd3Nlck5hbWUgPT09ICdDaHJvbWUnKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgLy8gb24gc29tZSBjaHJvbWUgc3lzdGVtcywgd2UgYWx3YXlzIGdldCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgcGFnZVxyXG4gICAgICAgIGxldCBidG4gPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2lkJywgJ2NvbS5hbmRyb2lkLmNocm9tZTppZC90ZXJtc19hY2NlcHQnLCBmYWxzZSk7XHJcbiAgICAgICAgYXdhaXQgZHJpdmVyLmNsaWNrKGJ0bi5FTEVNRU5UKTtcclxuXHJcbiAgICAgICAgYnRuID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdpZCcsICdjb20uYW5kcm9pZC5jaHJvbWU6aWQvbmVnYXRpdmVfYnV0dG9uJywgZmFsc2UpO1xyXG4gICAgICAgIGF3YWl0IGRyaXZlci5jbGljayhidG4uRUxFTUVOVCk7XHJcbiAgICAgIH0gY2F0Y2ggKGlnbikge31cclxuICAgIH1cclxuXHJcbiAgICBhd2FpdCBkcml2ZXIuc2V0VXJsKCdodHRwOi8vc2F1Y2VsYWJzLmNvbScpO1xyXG5cclxuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnaWQnLCB1cmxJZCwgZmFsc2UpO1xyXG4gICAgYXdhaXQgZHJpdmVyLmdldFRleHQoZWwuRUxFTUVOVCkuc2hvdWxkLmV2ZW50dWFsbHkuaW5jbHVkZSgnc2F1Y2VsYWJzLmNvbScpO1xyXG4gIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uXFwuLiJ9
