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

var atv = 'android.widget.TextView';
var alv = 'android.widget.ListView';

describe('Find - from element', function () {
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
  it('should find a single element by tag name', function callee$1$0() {
    var el, innerEl;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', alv, false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', atv, false, el.ELEMENT));

        case 5:
          innerEl = context$2$0.sent;
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.getText(innerEl.ELEMENT).should.eventually.equal("Access'ibility"));

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find multiple elements by tag name', function callee$1$0() {
    var el, innerEl;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', alv, false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', atv, true, el.ELEMENT));

        case 5:
          innerEl = context$2$0.sent;
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.getText(innerEl[0].ELEMENT).should.eventually.have.length.above(10));

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should not find an element that doesnt exist', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', alv, false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'blargimarg', false, el.ELEMENT).should.be.rejectedWith(/could not be located/));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should not find multiple elements that dont exist', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', alv, true));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'blargimarg', false, el.ELEMENT).should.be.rejectedWith(/could not be located/));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2Zyb20tZWwtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ25CLGFBQWE7Ozs7dUJBQ2QsZUFBZTs7OztBQUd4QyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQU0sR0FBRyxHQUFHLHlCQUF5QixDQUFDO0FBQ3RDLElBQU0sR0FBRyxHQUFHLHlCQUF5QixDQUFDOztBQUV0QyxRQUFRLENBQUMscUJBQXFCLEVBQUUsWUFBWTs7O0FBQzFDLE1BQUksTUFBTSxZQUFBLENBQUM7QUFDWCxRQUFNLENBQUM7Ozs7QUFDTCxnQkFBTSxHQUFHLG1CQUFtQixDQUFDOzsyQ0FDdkIsTUFBTSxDQUFDLGFBQWEsc0JBQWM7Ozs7Ozs7R0FDekMsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7OzsyQ0FDRSxNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7O0dBQzdCLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQywwQ0FBMEMsRUFBRTtRQUN6QyxFQUFFLEVBQ0YsT0FBTzs7Ozs7MkNBREksTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQzs7O0FBQXZELFlBQUU7OzJDQUNjLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQzs7O0FBQXhFLGlCQUFPOzsyQ0FDTCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzs7Ozs7OztHQUNoRixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsMkNBQTJDLEVBQUU7UUFDMUMsRUFBRSxFQUNGLE9BQU87Ozs7OzJDQURJLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUM7OztBQUF2RCxZQUFFOzsyQ0FDYyxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUM7OztBQUF2RSxpQkFBTzs7MkNBQ0wsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7Ozs7Ozs7R0FDakYsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLDhDQUE4QyxFQUFFO1FBQzdDLEVBQUU7Ozs7OzJDQUFTLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUM7OztBQUF2RCxZQUFFOzsyQ0FDQSxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FDcEUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUM7Ozs7Ozs7R0FDbEQsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLG1EQUFtRCxFQUFFO1FBQ2xELEVBQUU7Ozs7OzJDQUFTLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7OztBQUF0RCxZQUFFOzsyQ0FDQSxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FDcEUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUM7Ozs7Ozs7R0FDbEQsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2Zyb20tZWwtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XHJcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcclxuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4vLi4nO1xyXG5pbXBvcnQgREVGQVVMVF9DQVBTIGZyb20gJy4uLy4uL2Rlc2lyZWQnO1xyXG5cclxuXHJcbmNoYWkuc2hvdWxkKCk7XHJcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcclxuXHJcbmNvbnN0IGF0diA9ICdhbmRyb2lkLndpZGdldC5UZXh0Vmlldyc7XHJcbmNvbnN0IGFsdiA9ICdhbmRyb2lkLndpZGdldC5MaXN0Vmlldyc7XHJcblxyXG5kZXNjcmliZSgnRmluZCAtIGZyb20gZWxlbWVudCcsIGZ1bmN0aW9uICgpIHtcclxuICBsZXQgZHJpdmVyO1xyXG4gIGJlZm9yZShhc3luYyAoKSA9PiB7XHJcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xyXG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oREVGQVVMVF9DQVBTKTtcclxuICB9KTtcclxuICBhZnRlcihhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgZmluZCBhIHNpbmdsZSBlbGVtZW50IGJ5IHRhZyBuYW1lJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgYWx2LCBmYWxzZSk7XHJcbiAgICBsZXQgaW5uZXJFbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnY2xhc3MgbmFtZScsIGF0diwgZmFsc2UsIGVsLkVMRU1FTlQpO1xyXG4gICAgYXdhaXQgZHJpdmVyLmdldFRleHQoaW5uZXJFbC5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbChcIkFjY2VzcydpYmlsaXR5XCIpO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgZmluZCBtdWx0aXBsZSBlbGVtZW50cyBieSB0YWcgbmFtZScsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnY2xhc3MgbmFtZScsIGFsdiwgZmFsc2UpO1xyXG4gICAgbGV0IGlubmVyRWwgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2NsYXNzIG5hbWUnLCBhdHYsIHRydWUsIGVsLkVMRU1FTlQpO1xyXG4gICAgYXdhaXQgZHJpdmVyLmdldFRleHQoaW5uZXJFbFswXS5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aC5hYm92ZSgxMCk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBub3QgZmluZCBhbiBlbGVtZW50IHRoYXQgZG9lc250IGV4aXN0JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgYWx2LCBmYWxzZSk7XHJcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2NsYXNzIG5hbWUnLCAnYmxhcmdpbWFyZycsIGZhbHNlLCBlbC5FTEVNRU5UKVxyXG4gICAgICAuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgvY291bGQgbm90IGJlIGxvY2F0ZWQvKTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIG5vdCBmaW5kIG11bHRpcGxlIGVsZW1lbnRzIHRoYXQgZG9udCBleGlzdCcsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnY2xhc3MgbmFtZScsIGFsdiwgdHJ1ZSk7XHJcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2NsYXNzIG5hbWUnLCAnYmxhcmdpbWFyZycsIGZhbHNlLCBlbC5FTEVNRU5UKVxyXG4gICAgICAuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgvY291bGQgbm90IGJlIGxvY2F0ZWQvKTtcclxuICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLlxcLi5cXC4uIn0=
