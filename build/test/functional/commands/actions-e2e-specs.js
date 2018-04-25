'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

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

var PNG_MAGIC = '89504e47';
var PNG_MAGIC_LENGTH = 4;

var driver = undefined;
var caps = _lodash2['default'].defaults({
  appPackage: 'io.appium.android.apis',
  appActivity: '.view.TextFields'
}, _desired2['default']);

describe('actions', function () {
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
    }, null, _this);
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
    }, null, _this);
  });

  describe('replaceValue', function () {
    var _this2 = this;

    it('should replace existing value in a text field', function callee$2$0() {
      var el;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.t0 = _lodash2['default'];
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.EditText', true));

          case 3:
            context$3$0.t1 = context$3$0.sent;
            el = context$3$0.t0.last.call(context$3$0.t0, context$3$0.t1);

            el.should.exist;
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(driver.setValue('original value', el.ELEMENT));

          case 8:
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('original value'));

          case 10:
            context$3$0.next = 12;
            return _regeneratorRuntime.awrap(driver.replaceValue('replaced value', el.ELEMENT));

          case 12:
            context$3$0.next = 14;
            return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('replaced value'));

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });

  describe('key codes', function () {
    var _this3 = this;

    beforeEach(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.startActivity(caps.appPackage, caps.appActivity));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this3);
    });

    it('should press key code 3 without metastate', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.pressKeyCode(3).should.not.be.rejected);

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this3);
    });
    it('should press key code 3 with metastate', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.pressKeyCode(3, 193).should.not.be.rejected);

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this3);
    });
    it('should long press key code 3 without metastate', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.longPressKeyCode(3).should.not.be.rejected);

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this3);
    });
    it('should long press key code 3 with metastate', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.longPressKeyCode(3, 193).should.not.be.rejected);

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this3);
    });
  });

  describe('getScreenshot', function () {
    var _this4 = this;

    it('should return valid base64-encoded screenshot', function callee$2$0() {
      var base64screenshot, imageMagic;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.getScreenshot());

          case 2:
            base64screenshot = context$3$0.sent;
            imageMagic = new Buffer(base64screenshot, 'base64').toString('hex', 0, PNG_MAGIC_LENGTH);

            imageMagic.should.be.equal(PNG_MAGIC);

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this4);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9hY3Rpb25zLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7aUJBQ25CLFVBQVU7Ozs7c0JBQ3RCLFFBQVE7Ozs7dUJBQ0csWUFBWTs7OztBQUdyQyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQztBQUM3QixJQUFNLGdCQUFnQixHQUFHLENBQUMsQ0FBQzs7QUFFM0IsSUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLElBQUksSUFBSSxHQUFHLG9CQUFFLFFBQVEsQ0FBQztBQUNwQixZQUFVLEVBQUUsd0JBQXdCO0FBQ3BDLGFBQVcsRUFBRSxrQkFBa0I7Q0FDaEMsdUJBQWUsQ0FBQzs7QUFHakIsUUFBUSxDQUFDLFNBQVMsRUFBRSxZQUFNO0FBQ3hCLFFBQU0sQ0FBQzs7OztBQUNMLGdCQUFNLEdBQUcsbUJBQW1CLENBQUM7OzJDQUN2QixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzs7Ozs7OztHQUNqQyxDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDOztBQUVILFVBQVEsQ0FBQyxjQUFjLEVBQUUsWUFBWTs7O0FBQ25DLE1BQUUsQ0FBQywrQ0FBK0MsRUFBRTtVQUM5QyxFQUFFOzs7Ozs7NkNBQWdCLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLHlCQUF5QixFQUFFLElBQUksQ0FBQzs7OztBQUFuRixjQUFFLGtCQUFLLElBQUk7O0FBQ2YsY0FBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7OzZDQUNWLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQzs7Ozs2Q0FDN0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7Ozs7NkNBRXBFLE1BQU0sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQzs7Ozs2Q0FDakQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7Ozs7Ozs7S0FDM0UsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDOztBQUVILFVBQVEsQ0FBQyxXQUFXLEVBQUUsWUFBWTs7O0FBQ2hDLGNBQVUsQ0FBQzs7Ozs7NkNBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUM7Ozs7Ozs7S0FDOUQsQ0FBQyxDQUFDOztBQUVILE1BQUUsQ0FBQywyQ0FBMkMsRUFBRTs7Ozs7NkNBQ3hDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUTs7Ozs7OztLQUNwRCxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsd0NBQXdDLEVBQUU7Ozs7OzZDQUNyQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFROzs7Ozs7O0tBQ3pELENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyxnREFBZ0QsRUFBRTs7Ozs7NkNBQzdDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFROzs7Ozs7O0tBQ3hELENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyw2Q0FBNkMsRUFBRTs7Ozs7NkNBQzFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUTs7Ozs7OztLQUM3RCxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7O0FBRUgsVUFBUSxDQUFDLGVBQWUsRUFBRSxZQUFZOzs7QUFDcEMsTUFBRSxDQUFDLCtDQUErQyxFQUFFO1VBQzVDLGdCQUFnQixFQUNoQixVQUFVOzs7Ozs2Q0FEZSxNQUFNLENBQUMsYUFBYSxFQUFFOzs7QUFBL0MsNEJBQWdCO0FBQ2hCLHNCQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsZ0JBQWdCLENBQUM7O0FBQzlGLHNCQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7Ozs7Ozs7S0FDdkMsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9hY3Rpb25zLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xyXG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XHJcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IERFRkFVTFRfQ0FQUyBmcm9tICcuLi9kZXNpcmVkJztcclxuXHJcblxyXG5jaGFpLnNob3VsZCgpO1xyXG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XHJcblxyXG5jb25zdCBQTkdfTUFHSUMgPSAnODk1MDRlNDcnO1xyXG5jb25zdCBQTkdfTUFHSUNfTEVOR1RIID0gNDtcclxuXHJcbmxldCBkcml2ZXI7XHJcbmxldCBjYXBzID0gXy5kZWZhdWx0cyh7XHJcbiAgYXBwUGFja2FnZTogJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnLFxyXG4gIGFwcEFjdGl2aXR5OiAnLnZpZXcuVGV4dEZpZWxkcydcclxufSwgREVGQVVMVF9DQVBTKTtcclxuXHJcblxyXG5kZXNjcmliZSgnYWN0aW9ucycsICgpID0+IHtcclxuICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xyXG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcclxuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpO1xyXG4gIH0pO1xyXG4gIGFmdGVyKGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XHJcbiAgfSk7XHJcblxyXG4gIGRlc2NyaWJlKCdyZXBsYWNlVmFsdWUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpdCgnc2hvdWxkIHJlcGxhY2UgZXhpc3RpbmcgdmFsdWUgaW4gYSB0ZXh0IGZpZWxkJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgZWwgPSBfLmxhc3QoYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgJ2FuZHJvaWQud2lkZ2V0LkVkaXRUZXh0JywgdHJ1ZSkpO1xyXG4gICAgICBlbC5zaG91bGQuZXhpc3Q7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5zZXRWYWx1ZSgnb3JpZ2luYWwgdmFsdWUnLCBlbC5FTEVNRU5UKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdldFRleHQoZWwuRUxFTUVOVCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ29yaWdpbmFsIHZhbHVlJyk7XHJcblxyXG4gICAgICBhd2FpdCBkcml2ZXIucmVwbGFjZVZhbHVlKCdyZXBsYWNlZCB2YWx1ZScsIGVsLkVMRU1FTlQpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbC5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgncmVwbGFjZWQgdmFsdWUnKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICBkZXNjcmliZSgna2V5IGNvZGVzJywgZnVuY3Rpb24gKCkge1xyXG4gICAgYmVmb3JlRWFjaChhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFjdGl2aXR5KGNhcHMuYXBwUGFja2FnZSwgY2Fwcy5hcHBBY3Rpdml0eSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIHByZXNzIGtleSBjb2RlIDMgd2l0aG91dCBtZXRhc3RhdGUnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5wcmVzc0tleUNvZGUoMykuc2hvdWxkLm5vdC5iZS5yZWplY3RlZDtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBwcmVzcyBrZXkgY29kZSAzIHdpdGggbWV0YXN0YXRlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhd2FpdCBkcml2ZXIucHJlc3NLZXlDb2RlKDMsIDE5Mykuc2hvdWxkLm5vdC5iZS5yZWplY3RlZDtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBsb25nIHByZXNzIGtleSBjb2RlIDMgd2l0aG91dCBtZXRhc3RhdGUnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5sb25nUHJlc3NLZXlDb2RlKDMpLnNob3VsZC5ub3QuYmUucmVqZWN0ZWQ7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgbG9uZyBwcmVzcyBrZXkgY29kZSAzIHdpdGggbWV0YXN0YXRlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhd2FpdCBkcml2ZXIubG9uZ1ByZXNzS2V5Q29kZSgzLCAxOTMpLnNob3VsZC5ub3QuYmUucmVqZWN0ZWQ7XHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbiAgZGVzY3JpYmUoJ2dldFNjcmVlbnNob3QnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiB2YWxpZCBiYXNlNjQtZW5jb2RlZCBzY3JlZW5zaG90JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBjb25zdCBiYXNlNjRzY3JlZW5zaG90ID0gYXdhaXQgZHJpdmVyLmdldFNjcmVlbnNob3QoKTtcclxuICAgICAgY29uc3QgaW1hZ2VNYWdpYyA9IG5ldyBCdWZmZXIoYmFzZTY0c2NyZWVuc2hvdCwgJ2Jhc2U2NCcpLnRvU3RyaW5nKCdoZXgnLCAwLCBQTkdfTUFHSUNfTEVOR1RIKTtcclxuICAgICAgaW1hZ2VNYWdpYy5zaG91bGQuYmUuZXF1YWwoUE5HX01BR0lDKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uXFwuLiJ9
