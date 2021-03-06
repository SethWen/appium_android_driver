'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var _desired = require('../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Commands', function () {
  var _this = this;

  var driver = undefined;
  before(function () {
    driver = new _2['default']();
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
  describe('Alerts', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this2 = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          it('should throw a notYetImplemented error for alert methods', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(driver.createSession(_desired2['default']));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(driver.getAlertText().should.eventually.be.rejectedWith(/implemented/));

                case 4:
                  context$3$0.next = 6;
                  return _regeneratorRuntime.awrap(driver.setAlertText('new text').should.eventually.be.rejectedWith(/implemented/));

                case 6:
                  context$3$0.next = 8;
                  return _regeneratorRuntime.awrap(driver.postAcceptAlert().should.eventually.be.rejectedWith(/implemented/));

                case 8:
                  context$3$0.next = 10;
                  return _regeneratorRuntime.awrap(driver.postDismissAlert().should.eventually.be.rejectedWith(/implemented/));

                case 10:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this2);
          });

        case 1:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9hbGVydHMtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ25CLFVBQVU7Ozs7dUJBQ1gsWUFBWTs7OztBQUdyQyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxVQUFVLEVBQUUsWUFBWTs7O0FBQy9CLE1BQUksTUFBTSxZQUFBLENBQUM7QUFDWCxRQUFNLENBQUMsWUFBTTtBQUNYLFVBQU0sR0FBRyxtQkFBbUIsQ0FBQztHQUM5QixDQUFDLENBQUM7QUFDSCxXQUFTLENBQUM7Ozs7OzJDQUNGLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDO0FBQ0gsVUFBUSxDQUFDLFFBQVEsRUFBRTs7Ozs7O0FBQ2pCLFlBQUUsQ0FBQywwREFBMEQsRUFBRTs7Ozs7bURBQ3ZELE1BQU0sQ0FBQyxhQUFhLHNCQUFjOzs7O21EQUNsQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQzs7OzttREFDdEUsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDOzs7O21EQUNoRixNQUFNLENBQUMsZUFBZSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQzs7OzttREFDekUsTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQzs7Ozs7OztXQUNqRixDQUFDLENBQUM7Ozs7Ozs7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL2FsZXJ0cy1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcclxuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xyXG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLic7XHJcbmltcG9ydCBERUZBVUxUX0NBUFMgZnJvbSAnLi4vZGVzaXJlZCc7XHJcblxyXG5cclxuY2hhaS5zaG91bGQoKTtcclxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xyXG5cclxuZGVzY3JpYmUoJ0NvbW1hbmRzJywgZnVuY3Rpb24gKCkge1xyXG4gIGxldCBkcml2ZXI7XHJcbiAgYmVmb3JlKCgpID0+IHtcclxuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XHJcbiAgfSk7XHJcbiAgYWZ0ZXJFYWNoKGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ0FsZXJ0cycsIGFzeW5jICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgdGhyb3cgYSBub3RZZXRJbXBsZW1lbnRlZCBlcnJvciBmb3IgYWxlcnQgbWV0aG9kcycsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oREVGQVVMVF9DQVBTKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdldEFsZXJ0VGV4dCgpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvaW1wbGVtZW50ZWQvKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLnNldEFsZXJ0VGV4dCgnbmV3IHRleHQnKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL2ltcGxlbWVudGVkLyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5wb3N0QWNjZXB0QWxlcnQoKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL2ltcGxlbWVudGVkLyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5wb3N0RGlzbWlzc0FsZXJ0KCkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKC9pbXBsZW1lbnRlZC8pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi5cXC4uIn0=
