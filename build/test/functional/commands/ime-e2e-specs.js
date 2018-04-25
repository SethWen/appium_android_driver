'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _2 = require('../../..');

var _3 = _interopRequireDefault(_2);

var _desired = require('../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var defaultCaps = _lodash2['default'].defaults({
  unicodeKeyboard: true,
  resetKeyboard: true
}, _desired2['default']);
var unicodeImeId = 'io.appium.android.ime/.UnicodeIME';

describe('apidemo - IME', function () {
  var _this = this;

  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _3['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(defaultCaps));

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  beforeEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.startActivity('io.appium.android.apis', 'io.appium.android.apis.ApiDemos'));

        case 2:
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
  it('should get the default (enabled) input method', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getActiveIMEEngine().should.eventually.equal(unicodeImeId));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should get the available input methods', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.availableIMEEngines().should.eventually.have.length.at.least(4));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should activate an installed input method', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.activateIMEEngine(unicodeImeId).should.not.be.rejected);

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should fail to activate an uninstalled input method', function callee$1$0() {
    var invalidImeId;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          invalidImeId = 'sdf.wer.gdasdfsf/.OsdfEfgd';
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.activateIMEEngine(invalidImeId).should.eventually.be.rejectedWith(/not available/));

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should deactivate the current input method', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.activateIMEEngine(unicodeImeId));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.getActiveIMEEngine().should.eventually.equal(unicodeImeId));

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.deactivateIMEEngine());

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.getActiveIMEEngine().should.eventually.not.equal(unicodeImeId));

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9pbWUtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7c0JBQy9CLFFBQVE7Ozs7aUJBQ0ksVUFBVTs7Ozt1QkFDWCxZQUFZOzs7O0FBR3JDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLElBQUksV0FBVyxHQUFHLG9CQUFFLFFBQVEsQ0FBQztBQUMzQixpQkFBZSxFQUFFLElBQUk7QUFDckIsZUFBYSxFQUFFLElBQUk7Q0FDcEIsdUJBQWUsQ0FBQztBQUNqQixJQUFJLFlBQVksR0FBRyxtQ0FBbUMsQ0FBQzs7QUFFdkQsUUFBUSxDQUFDLGVBQWUsRUFBRSxZQUFZOzs7QUFDcEMsUUFBTSxDQUFDOzs7O0FBQ0wsZ0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7MkNBQ3ZCLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDOzs7Ozs7O0dBQ3hDLENBQUMsQ0FBQztBQUNILFlBQVUsQ0FBQzs7Ozs7MkNBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsRUFBRSxpQ0FBaUMsQ0FBQzs7Ozs7OztHQUN4RixDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLCtDQUErQyxFQUFFOzs7OzsyQ0FDNUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDOzs7Ozs7O0dBQ3hFLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyx3Q0FBd0MsRUFBRTs7Ozs7MkNBQ3JDLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7Ozs7OztHQUM3RSxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsMkNBQTJDLEVBQUU7Ozs7OzJDQUN4QyxNQUFNLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUTs7Ozs7OztHQUNwRSxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMscURBQXFELEVBQUU7UUFDcEQsWUFBWTs7OztBQUFaLHNCQUFZLEdBQUcsNEJBQTRCOzsyQ0FDekMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUM7Ozs7Ozs7R0FDaEcsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLDRDQUE0QyxFQUFFOzs7OzsyQ0FDekMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQzs7OzsyQ0FDdEMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDOzs7OzJDQUNqRSxNQUFNLENBQUMsbUJBQW1CLEVBQUU7Ozs7MkNBQzVCLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7Ozs7Ozs7R0FDNUUsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9pbWUtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XHJcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4nO1xyXG5pbXBvcnQgREVGQVVMVF9DQVBTIGZyb20gJy4uL2Rlc2lyZWQnO1xyXG5cclxuXHJcbmNoYWkuc2hvdWxkKCk7XHJcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcclxuXHJcbmxldCBkcml2ZXI7XHJcbmxldCBkZWZhdWx0Q2FwcyA9IF8uZGVmYXVsdHMoe1xyXG4gIHVuaWNvZGVLZXlib2FyZDogdHJ1ZSxcclxuICByZXNldEtleWJvYXJkOiB0cnVlXHJcbn0sIERFRkFVTFRfQ0FQUyk7XHJcbmxldCB1bmljb2RlSW1lSWQgPSAnaW8uYXBwaXVtLmFuZHJvaWQuaW1lLy5Vbmljb2RlSU1FJztcclxuXHJcbmRlc2NyaWJlKCdhcGlkZW1vIC0gSU1FJywgZnVuY3Rpb24gKCkge1xyXG4gIGJlZm9yZShhc3luYyAoKSA9PiB7XHJcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xyXG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oZGVmYXVsdENhcHMpO1xyXG4gIH0pO1xyXG4gIGJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgZHJpdmVyLnN0YXJ0QWN0aXZpdHkoJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnLCAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcy5BcGlEZW1vcycpO1xyXG4gIH0pO1xyXG4gIGFmdGVyKGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBnZXQgdGhlIGRlZmF1bHQgKGVuYWJsZWQpIGlucHV0IG1ldGhvZCcsIGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGRyaXZlci5nZXRBY3RpdmVJTUVFbmdpbmUoKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCh1bmljb2RlSW1lSWQpO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgZ2V0IHRoZSBhdmFpbGFibGUgaW5wdXQgbWV0aG9kcycsIGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGRyaXZlci5hdmFpbGFibGVJTUVFbmdpbmVzKCkuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGguYXQubGVhc3QoNCk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBhY3RpdmF0ZSBhbiBpbnN0YWxsZWQgaW5wdXQgbWV0aG9kJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgZHJpdmVyLmFjdGl2YXRlSU1FRW5naW5lKHVuaWNvZGVJbWVJZCkuc2hvdWxkLm5vdC5iZS5yZWplY3RlZDtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGZhaWwgdG8gYWN0aXZhdGUgYW4gdW5pbnN0YWxsZWQgaW5wdXQgbWV0aG9kJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IGludmFsaWRJbWVJZCA9ICdzZGYud2VyLmdkYXNkZnNmLy5Pc2RmRWZnZCc7XHJcbiAgICBhd2FpdCBkcml2ZXIuYWN0aXZhdGVJTUVFbmdpbmUoaW52YWxpZEltZUlkKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL25vdCBhdmFpbGFibGUvKTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGRlYWN0aXZhdGUgdGhlIGN1cnJlbnQgaW5wdXQgbWV0aG9kJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgZHJpdmVyLmFjdGl2YXRlSU1FRW5naW5lKHVuaWNvZGVJbWVJZCk7XHJcbiAgICBhd2FpdCBkcml2ZXIuZ2V0QWN0aXZlSU1FRW5naW5lKCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwodW5pY29kZUltZUlkKTtcclxuICAgIGF3YWl0IGRyaXZlci5kZWFjdGl2YXRlSU1FRW5naW5lKCk7XHJcbiAgICBhd2FpdCBkcml2ZXIuZ2V0QWN0aXZlSU1FRW5naW5lKCkuc2hvdWxkLmV2ZW50dWFsbHkubm90LmVxdWFsKHVuaWNvZGVJbWVJZCk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi5cXC4uIn0=
