'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../../..');

var _2 = _interopRequireDefault(_);

var _desired = require('../../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Find - invalid strategy', function () {
  var _this = this;

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
  it('should not accept -ios uiautomation locator strategy', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-ios uiautomation', '.elements()', false).should.eventually.be.rejectedWith(/not supported/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2ludmFsaWQtc3RyYXRlZ3ktZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ25CLGFBQWE7Ozs7dUJBQ2QsZUFBZTs7OztBQUd4QyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyx5QkFBeUIsRUFBRSxZQUFZOzs7QUFDOUMsTUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLFFBQU0sQ0FBQzs7OztBQUNMLGdCQUFNLEdBQUcsbUJBQW1CLENBQUM7OzJDQUN2QixNQUFNLENBQUMsYUFBYSxzQkFBYzs7Ozs7OztHQUN6QyxDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLHNEQUFzRCxFQUFFOzs7OzsyQ0FDbkQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQ2hFLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUM7Ozs7Ozs7R0FDdEQsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2ludmFsaWQtc3RyYXRlZ3ktZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XHJcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcclxuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4vLi4nO1xyXG5pbXBvcnQgREVGQVVMVF9DQVBTIGZyb20gJy4uLy4uL2Rlc2lyZWQnO1xyXG5cclxuXHJcbmNoYWkuc2hvdWxkKCk7XHJcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcclxuXHJcbmRlc2NyaWJlKCdGaW5kIC0gaW52YWxpZCBzdHJhdGVneScsIGZ1bmN0aW9uICgpIHtcclxuICBsZXQgZHJpdmVyO1xyXG4gIGJlZm9yZShhc3luYyAoKSA9PiB7XHJcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xyXG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oREVGQVVMVF9DQVBTKTtcclxuICB9KTtcclxuICBhZnRlcihhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgbm90IGFjY2VwdCAtaW9zIHVpYXV0b21hdGlvbiBsb2NhdG9yIHN0cmF0ZWd5JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCctaW9zIHVpYXV0b21hdGlvbicsICcuZWxlbWVudHMoKScsIGZhbHNlKVxyXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKC9ub3Qgc3VwcG9ydGVkLyk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi5cXC4uXFwuLiJ9
