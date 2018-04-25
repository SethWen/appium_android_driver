'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _2 = require('../..');

var _helpers = require('./helpers');

var _desired = require('./desired');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumSupport = require('appium-support');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var AVD_ANDROID_24_WITHOUT_GMS = process.env.ANDROID_24_NO_GMS_AVD || 'Nexus_5_API_24';
var CHROMEDRIVER_2_20_EXECUTABLE = process.env.CHROME_2_20_EXECUTABLE;

// for reasons that remain unclear, this particular webview-based browser
// will not connect to localhost/loopback, even on emulators
var HOST = _appiumSupport.util.localIp();
var PORT = 4723;

describe('Android 7 Webview Browser tester', function () {
  var _this = this;

  var driver = undefined;
  var server = undefined;

  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!process.env.REAL_DEVICE) {
            context$2$0.next = 2;
            break;
          }

          return context$2$0.abrupt('return', this.skip());

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap((0, _helpers.ensureAVDExists)(this, AVD_ANDROID_24_WITHOUT_GMS));

        case 4:
          if (context$2$0.sent) {
            context$2$0.next = 6;
            break;
          }

          return context$2$0.abrupt('return');

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  beforeEach(function callee$1$0() {
    var capabilities;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.t0 = _lodash2['default'];
          context$2$0.t1 = AVD_ANDROID_24_WITHOUT_GMS;
          context$2$0.t2 = CHROMEDRIVER_2_20_EXECUTABLE;

          if (context$2$0.t2) {
            context$2$0.next = 7;
            break;
          }

          context$2$0.next = 6;
          return _regeneratorRuntime.awrap((0, _helpers.getChromedriver220Asset)());

        case 6:
          context$2$0.t2 = context$2$0.sent;

        case 7:
          context$2$0.t3 = context$2$0.t2;
          context$2$0.t4 = {
            browserName: 'chromium-webview',
            avd: context$2$0.t1,
            platformVersion: '7.0',
            chromedriverExecutable: context$2$0.t3
          };
          context$2$0.t5 = _desired.CHROME_CAPS;
          capabilities = context$2$0.t0.defaults.call(context$2$0.t0, context$2$0.t4, context$2$0.t5);

          driver = new _2.AndroidDriver();
          context$2$0.next = 14;
          return _regeneratorRuntime.awrap(driver.createSession(capabilities));

        case 14:
          context$2$0.next = 16;
          return _regeneratorRuntime.awrap((0, _2.startServer)(PORT, HOST));

        case 16:
          server = context$2$0.sent;

        case 17:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  afterEach(function callee$1$0() {
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
          if (!server) {
            context$2$0.next = 6;
            break;
          }

          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(server.close());

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('should start android session using webview browser tester', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.setUrl('http://' + HOST + ':' + PORT + '/test/guinea-pig'));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.getCurrentContext().should.eventually.eql("CHROMIUM"));

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'i am a link', false));

        case 6:
          el = context$2$0.sent;
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(driver.click(el.ELEMENT));

        case 9:
          context$2$0.next = 11;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'I am another page title', false));

        case 11:
          el = context$2$0.sent;

          el.should.exist;

        case 13:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});

// await driver.setUrl('http://google.com');

// make sure we are in the right context
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC93ZWJ2aWV3LWJyb3dzZXItdGVzdGVyLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2lCQUNGLE9BQU87O3VCQUNPLFdBQVc7O3VCQUN4QyxXQUFXOztzQkFDekIsUUFBUTs7Ozs2QkFDRCxnQkFBZ0I7O0FBR3JDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBTSwwQkFBMEIsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixJQUFJLGdCQUFnQixDQUFDO0FBQ3pGLElBQU0sNEJBQTRCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQzs7OztBQUl4RSxJQUFNLElBQUksR0FBRyxvQkFBSyxPQUFPLEVBQUUsQ0FBQztBQUM1QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWxCLFFBQVEsQ0FBQyxrQ0FBa0MsRUFBRSxZQUFZOzs7QUFDdkQsTUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLE1BQUksTUFBTSxZQUFBLENBQUM7O0FBRVgsUUFBTSxDQUFDOzs7O2VBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXOzs7Ozs4Q0FDbEIsSUFBSSxDQUFDLElBQUksRUFBRTs7OzsyQ0FFVCw4QkFBZ0IsSUFBSSxFQUFFLDBCQUEwQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7R0FHN0QsQ0FBQyxDQUFDO0FBQ0gsWUFBVSxDQUFDO1FBQ0gsWUFBWTs7Ozs7MkJBRVgsMEJBQTBCOzJCQUVQLDRCQUE0Qjs7Ozs7Ozs7MkNBQVUsdUNBQXlCOzs7Ozs7OztBQUh2Rix1QkFBVyxFQUFFLGtCQUFrQjtBQUMvQixlQUFHO0FBQ0gsMkJBQWUsRUFBRSxLQUFLO0FBQ3RCLGtDQUFzQjs7O0FBSmxCLHNCQUFZLGtCQUFLLFFBQVE7O0FBTy9CLGdCQUFNLEdBQUcsc0JBQW1CLENBQUM7OzJDQUN2QixNQUFNLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQzs7OzsyQ0FDekIsb0JBQVksSUFBSSxFQUFFLElBQUksQ0FBQzs7O0FBQXRDLGdCQUFNOzs7Ozs7O0dBQ1AsQ0FBQyxDQUFDO0FBQ0gsV0FBUyxDQUFDOzs7O2VBQ0osTUFBTTs7Ozs7OzJDQUNGLE1BQU0sQ0FBQyxhQUFhLEVBQUU7OztlQUUxQixNQUFNOzs7Ozs7MkNBQ0YsTUFBTSxDQUFDLEtBQUssRUFBRTs7Ozs7OztHQUV2QixDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLDJEQUEyRCxFQUFFO1FBTzFELEVBQUU7Ozs7OzJDQUxBLE1BQU0sQ0FBQyxNQUFNLGFBQVcsSUFBSSxTQUFJLElBQUksc0JBQW1COzs7OzJDQUd2RCxNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7Ozs7MkNBRW5ELE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxLQUFLLENBQUM7OztBQUF6RCxZQUFFOzsyQ0FDQSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7Ozs7MkNBRW5CLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLHlCQUF5QixFQUFFLEtBQUssQ0FBQzs7O0FBQXJFLFlBQUU7O0FBQ0YsWUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Ozs7Ozs7R0FDakIsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC93ZWJ2aWV3LWJyb3dzZXItdGVzdGVyLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xyXG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XHJcbmltcG9ydCB7IEFuZHJvaWREcml2ZXIsIHN0YXJ0U2VydmVyIH0gZnJvbSAnLi4vLi4nO1xyXG5pbXBvcnQgeyBlbnN1cmVBVkRFeGlzdHMsIGdldENocm9tZWRyaXZlcjIyMEFzc2V0IH0gZnJvbSAnLi9oZWxwZXJzJztcclxuaW1wb3J0IHsgQ0hST01FX0NBUFMgfSBmcm9tICcuL2Rlc2lyZWQnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyB1dGlsIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xyXG5cclxuXHJcbmNoYWkuc2hvdWxkKCk7XHJcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcclxuXHJcbmNvbnN0IEFWRF9BTkRST0lEXzI0X1dJVEhPVVRfR01TID0gcHJvY2Vzcy5lbnYuQU5EUk9JRF8yNF9OT19HTVNfQVZEIHx8ICdOZXh1c181X0FQSV8yNCc7XHJcbmNvbnN0IENIUk9NRURSSVZFUl8yXzIwX0VYRUNVVEFCTEUgPSBwcm9jZXNzLmVudi5DSFJPTUVfMl8yMF9FWEVDVVRBQkxFO1xyXG5cclxuLy8gZm9yIHJlYXNvbnMgdGhhdCByZW1haW4gdW5jbGVhciwgdGhpcyBwYXJ0aWN1bGFyIHdlYnZpZXctYmFzZWQgYnJvd3NlclxyXG4vLyB3aWxsIG5vdCBjb25uZWN0IHRvIGxvY2FsaG9zdC9sb29wYmFjaywgZXZlbiBvbiBlbXVsYXRvcnNcclxuY29uc3QgSE9TVCA9IHV0aWwubG9jYWxJcCgpO1xyXG5jb25zdCBQT1JUID0gNDcyMztcclxuXHJcbmRlc2NyaWJlKCdBbmRyb2lkIDcgV2VidmlldyBCcm93c2VyIHRlc3RlcicsIGZ1bmN0aW9uICgpIHtcclxuICBsZXQgZHJpdmVyO1xyXG4gIGxldCBzZXJ2ZXI7XHJcblxyXG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAocHJvY2Vzcy5lbnYuUkVBTF9ERVZJQ0UpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc2tpcCgpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFhd2FpdCBlbnN1cmVBVkRFeGlzdHModGhpcywgQVZEX0FORFJPSURfMjRfV0lUSE9VVF9HTVMpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICB9KTtcclxuICBiZWZvcmVFYWNoKGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IGNhcGFiaWxpdGllcyA9IF8uZGVmYXVsdHMoe1xyXG4gICAgICBicm93c2VyTmFtZTogJ2Nocm9taXVtLXdlYnZpZXcnLFxyXG4gICAgICBhdmQ6IEFWRF9BTkRST0lEXzI0X1dJVEhPVVRfR01TLFxyXG4gICAgICBwbGF0Zm9ybVZlcnNpb246ICc3LjAnLFxyXG4gICAgICBjaHJvbWVkcml2ZXJFeGVjdXRhYmxlOiBDSFJPTUVEUklWRVJfMl8yMF9FWEVDVVRBQkxFIHx8IGF3YWl0IGdldENocm9tZWRyaXZlcjIyMEFzc2V0KCksXHJcbiAgICB9LCBDSFJPTUVfQ0FQUyk7XHJcblxyXG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcclxuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcGFiaWxpdGllcyk7XHJcbiAgICBzZXJ2ZXIgPSBhd2FpdCBzdGFydFNlcnZlcihQT1JULCBIT1NUKTtcclxuICB9KTtcclxuICBhZnRlckVhY2goYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGRyaXZlcikge1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xyXG4gICAgfVxyXG4gICAgaWYgKHNlcnZlcikge1xyXG4gICAgICBhd2FpdCBzZXJ2ZXIuY2xvc2UoKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgaXQoJ3Nob3VsZCBzdGFydCBhbmRyb2lkIHNlc3Npb24gdXNpbmcgd2VidmlldyBicm93c2VyIHRlc3RlcicsIGFzeW5jICgpID0+IHtcclxuICAgIC8vIGF3YWl0IGRyaXZlci5zZXRVcmwoJ2h0dHA6Ly9nb29nbGUuY29tJyk7XHJcbiAgICBhd2FpdCBkcml2ZXIuc2V0VXJsKGBodHRwOi8vJHtIT1NUfToke1BPUlR9L3Rlc3QvZ3VpbmVhLXBpZ2ApO1xyXG5cclxuICAgIC8vIG1ha2Ugc3VyZSB3ZSBhcmUgaW4gdGhlIHJpZ2h0IGNvbnRleHRcclxuICAgIGF3YWl0IGRyaXZlci5nZXRDdXJyZW50Q29udGV4dCgpLnNob3VsZC5ldmVudHVhbGx5LmVxbChcIkNIUk9NSVVNXCIpO1xyXG5cclxuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnaWQnLCAnaSBhbSBhIGxpbmsnLCBmYWxzZSk7XHJcbiAgICBhd2FpdCBkcml2ZXIuY2xpY2soZWwuRUxFTUVOVCk7XHJcblxyXG4gICAgZWwgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2lkJywgJ0kgYW0gYW5vdGhlciBwYWdlIHRpdGxlJywgZmFsc2UpO1xyXG4gICAgZWwuc2hvdWxkLmV4aXN0O1xyXG4gIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uIn0=
