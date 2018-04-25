'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../../..');

var _2 = _interopRequireDefault(_);

var _xmldom = require('xmldom');

var _xpath = require('xpath');

var _xpath2 = _interopRequireDefault(_xpath);

var _desired = require('../../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var assertSource = function assertSource(source) {
  var dom, nodes;
  return _regeneratorRuntime.async(function assertSource$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        source.should.exist;
        dom = new _xmldom.DOMParser().parseFromString(source);
        nodes = _xpath2['default'].select('//android.widget.TextView[@content-desc="App"]', dom);

        nodes.length.should.equal(1);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this);
};

describe('apidemo - source', function () {
  var _this2 = this;

  var driver = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _2['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(_desired2['default']));

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this2);
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
    }, null, _this2);
  });
  it('should return the page source', function callee$1$0() {
    var source;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getPageSource());

        case 2:
          source = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(assertSource(source));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this2);
  });
  it('should get less source when compression is enabled', function callee$1$0() {
    var getSourceWithoutCompression, getSourceWithCompression, sourceWithoutCompression, sourceWithCompression;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this3 = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          getSourceWithoutCompression = function getSourceWithoutCompression() {
            return _regeneratorRuntime.async(function getSourceWithoutCompression$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(driver.updateSettings({ ignoreUnimportantViews: false }));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(driver.getPageSource());

                case 4:
                  return context$3$0.abrupt('return', context$3$0.sent);

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this3);
          };

          getSourceWithCompression = function getSourceWithCompression() {
            return _regeneratorRuntime.async(function getSourceWithCompression$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(driver.updateSettings({ ignoreUnimportantViews: true }));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(driver.getPageSource());

                case 4:
                  return context$3$0.abrupt('return', context$3$0.sent);

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this3);
          };

          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(getSourceWithoutCompression());

        case 4:
          sourceWithoutCompression = context$2$0.sent;
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(getSourceWithCompression());

        case 7:
          sourceWithCompression = context$2$0.sent;

          sourceWithoutCompression.length.should.be.greaterThan(sourceWithCompression.length);

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this2);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9iYXNpYy9zb3VyY2UtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztnQkFDbkIsYUFBYTs7OztzQkFDYixRQUFROztxQkFDaEIsT0FBTzs7Ozt1QkFDQSxlQUFlOzs7O0FBR3hDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBSSxZQUFZLEdBQUcsU0FBZixZQUFZLENBQVUsTUFBTTtNQUUxQixHQUFHLEVBQ0gsS0FBSzs7OztBQUZULGNBQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2hCLFdBQUcsR0FBRyx1QkFBZSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7QUFDN0MsYUFBSyxHQUFHLG1CQUFNLE1BQU0sQ0FBQyxnREFBZ0QsRUFBRSxHQUFHLENBQUM7O0FBQy9FLGFBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7OztDQUM5QixDQUFDOztBQUVGLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxZQUFZOzs7QUFDdkMsTUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLFFBQU0sQ0FBQzs7OztBQUNMLGdCQUFNLEdBQUcsbUJBQW1CLENBQUM7OzJDQUN2QixNQUFNLENBQUMsYUFBYSxzQkFBYzs7Ozs7OztHQUN6QyxDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLCtCQUErQixFQUFFO1FBQzlCLE1BQU07Ozs7OzJDQUFTLE1BQU0sQ0FBQyxhQUFhLEVBQUU7OztBQUFyQyxnQkFBTTs7MkNBQ0osWUFBWSxDQUFDLE1BQU0sQ0FBQzs7Ozs7OztHQUMzQixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsb0RBQW9ELEVBQUU7UUFDbkQsMkJBQTJCLEVBSTNCLHdCQUF3QixFQUl4Qix3QkFBd0IsRUFDeEIscUJBQXFCOzs7Ozs7QUFUckIscUNBQTJCLEdBQUcsU0FBOUIsMkJBQTJCOzs7OzttREFDdkIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFDLHNCQUFzQixFQUFFLEtBQUssRUFBQyxDQUFDOzs7O21EQUMvQyxNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7Ozs7O1dBQ3BDOztBQUNHLGtDQUF3QixHQUFHLFNBQTNCLHdCQUF3Qjs7Ozs7bURBQ3BCLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBQyxzQkFBc0IsRUFBRSxJQUFJLEVBQUMsQ0FBQzs7OzttREFDOUMsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7Ozs7OztXQUNwQzs7OzJDQUNvQywyQkFBMkIsRUFBRTs7O0FBQTlELGtDQUF3Qjs7MkNBQ00sd0JBQXdCLEVBQUU7OztBQUF4RCwrQkFBcUI7O0FBQ3pCLGtDQUF3QixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7OztHQUNyRixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL2Jhc2ljL3NvdXJjZS1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcclxuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xyXG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLi8uLic7XHJcbmltcG9ydCB7IERPTVBhcnNlciB9IGZyb20gJ3htbGRvbSc7XHJcbmltcG9ydCB4cGF0aCBmcm9tICd4cGF0aCc7XHJcbmltcG9ydCBERUZBVUxUX0NBUFMgZnJvbSAnLi4vLi4vZGVzaXJlZCc7XHJcblxyXG5cclxuY2hhaS5zaG91bGQoKTtcclxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xyXG5cclxubGV0IGFzc2VydFNvdXJjZSA9IGFzeW5jIChzb3VyY2UpID0+IHtcclxuICBzb3VyY2Uuc2hvdWxkLmV4aXN0O1xyXG4gIGxldCBkb20gPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKHNvdXJjZSk7XHJcbiAgbGV0IG5vZGVzID0geHBhdGguc2VsZWN0KCcvL2FuZHJvaWQud2lkZ2V0LlRleHRWaWV3W0Bjb250ZW50LWRlc2M9XCJBcHBcIl0nLCBkb20pO1xyXG4gIG5vZGVzLmxlbmd0aC5zaG91bGQuZXF1YWwoMSk7XHJcbn07XHJcblxyXG5kZXNjcmliZSgnYXBpZGVtbyAtIHNvdXJjZScsIGZ1bmN0aW9uICgpIHtcclxuICBsZXQgZHJpdmVyO1xyXG4gIGJlZm9yZShhc3luYyAoKSA9PiB7XHJcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xyXG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oREVGQVVMVF9DQVBTKTtcclxuICB9KTtcclxuICBhZnRlcihhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgcmV0dXJuIHRoZSBwYWdlIHNvdXJjZScsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCBzb3VyY2UgPSBhd2FpdCBkcml2ZXIuZ2V0UGFnZVNvdXJjZSgpO1xyXG4gICAgYXdhaXQgYXNzZXJ0U291cmNlKHNvdXJjZSk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBnZXQgbGVzcyBzb3VyY2Ugd2hlbiBjb21wcmVzc2lvbiBpcyBlbmFibGVkJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IGdldFNvdXJjZVdpdGhvdXRDb21wcmVzc2lvbiA9IGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLnVwZGF0ZVNldHRpbmdzKHtpZ25vcmVVbmltcG9ydGFudFZpZXdzOiBmYWxzZX0pO1xyXG4gICAgICByZXR1cm4gYXdhaXQgZHJpdmVyLmdldFBhZ2VTb3VyY2UoKTtcclxuICAgIH07XHJcbiAgICBsZXQgZ2V0U291cmNlV2l0aENvbXByZXNzaW9uID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhd2FpdCBkcml2ZXIudXBkYXRlU2V0dGluZ3Moe2lnbm9yZVVuaW1wb3J0YW50Vmlld3M6IHRydWV9KTtcclxuICAgICAgcmV0dXJuIGF3YWl0IGRyaXZlci5nZXRQYWdlU291cmNlKCk7XHJcbiAgICB9O1xyXG4gICAgbGV0IHNvdXJjZVdpdGhvdXRDb21wcmVzc2lvbiA9IGF3YWl0IGdldFNvdXJjZVdpdGhvdXRDb21wcmVzc2lvbigpO1xyXG4gICAgbGV0IHNvdXJjZVdpdGhDb21wcmVzc2lvbiA9IGF3YWl0IGdldFNvdXJjZVdpdGhDb21wcmVzc2lvbigpO1xyXG4gICAgc291cmNlV2l0aG91dENvbXByZXNzaW9uLmxlbmd0aC5zaG91bGQuYmUuZ3JlYXRlclRoYW4oc291cmNlV2l0aENvbXByZXNzaW9uLmxlbmd0aCk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi5cXC4uXFwuLiJ9
