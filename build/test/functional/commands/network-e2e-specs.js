// This currently does not work reliably in CI
// Further, our CI does not respect skip or @skip-ci
// investigate and reinstate

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
var caps = _lodash2['default'].defaults({
  appActivity: '.view.TextFields'
}, _desired2['default']);

describe.skip('network connection', function () {
  var _this = this;

  this.timeout(120000);
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
  describe('setNetworkConnection @skip-ci', function () {
    function test(value) {
      var _this2 = this;

      it('should be able to set to ' + value, function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.setNetworkConnection(value));

            case 2:
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(driver.getNetworkConnection().should.eventually.equal(value));

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this2);
      });
    }
    var _arr = [1, 2, 4, 6];
    for (var _i = 0; _i < _arr.length; _i++) {
      var value = _arr[_i];
      test(value);
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9uZXR3b3JrLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O29CQUlpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztzQkFDL0IsUUFBUTs7OztpQkFDSSxVQUFVOzs7O3VCQUNYLFlBQVk7Ozs7QUFHckMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxJQUFJLEdBQUcsb0JBQUUsUUFBUSxDQUFDO0FBQ3BCLGFBQVcsRUFBRSxrQkFBa0I7Q0FDaEMsdUJBQWUsQ0FBQzs7QUFFakIsUUFBUSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxZQUFZOzs7QUFDOUMsTUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNyQixRQUFNLENBQUM7Ozs7QUFDTCxnQkFBTSxHQUFHLG1CQUFtQixDQUFDOzsyQ0FDdkIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7R0FDakMsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7OzsyQ0FDRSxNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7O0dBQzdCLENBQUMsQ0FBQztBQUNILFVBQVEsQ0FBQywrQkFBK0IsRUFBRSxZQUFNO0FBQzlDLGFBQVMsSUFBSSxDQUFFLEtBQUssRUFBRTs7O0FBQ3BCLFFBQUUsK0JBQTZCLEtBQUssRUFBSTs7Ozs7K0NBQ2hDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUM7Ozs7K0NBQ2xDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzs7Ozs7OztPQUNuRSxDQUFDLENBQUM7S0FDSjtlQUNpQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUE5Qiw2Q0FBZ0M7QUFBM0IsVUFBSSxLQUFLLFdBQUEsQ0FBQTtBQUNaLFVBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNiO0dBQ0YsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9uZXR3b3JrLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgY3VycmVudGx5IGRvZXMgbm90IHdvcmsgcmVsaWFibHkgaW4gQ0lcclxuLy8gRnVydGhlciwgb3VyIENJIGRvZXMgbm90IHJlc3BlY3Qgc2tpcCBvciBAc2tpcC1jaVxyXG4vLyBpbnZlc3RpZ2F0ZSBhbmQgcmVpbnN0YXRlXHJcblxyXG5pbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcclxuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLic7XHJcbmltcG9ydCBERUZBVUxUX0NBUFMgZnJvbSAnLi4vZGVzaXJlZCc7XHJcblxyXG5cclxuY2hhaS5zaG91bGQoKTtcclxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xyXG5cclxubGV0IGRyaXZlcjtcclxubGV0IGNhcHMgPSBfLmRlZmF1bHRzKHtcclxuICBhcHBBY3Rpdml0eTogJy52aWV3LlRleHRGaWVsZHMnXHJcbn0sIERFRkFVTFRfQ0FQUyk7XHJcblxyXG5kZXNjcmliZS5za2lwKCduZXR3b3JrIGNvbm5lY3Rpb24nLCBmdW5jdGlvbiAoKSB7XHJcbiAgdGhpcy50aW1lb3V0KDEyMDAwMCk7XHJcbiAgYmVmb3JlKGFzeW5jICgpID0+IHtcclxuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XHJcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKTtcclxuICB9KTtcclxuICBhZnRlcihhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdzZXROZXR3b3JrQ29ubmVjdGlvbiBAc2tpcC1jaScsICgpID0+IHtcclxuICAgIGZ1bmN0aW9uIHRlc3QgKHZhbHVlKSB7XHJcbiAgICAgIGl0KGBzaG91bGQgYmUgYWJsZSB0byBzZXQgdG8gJHt2YWx1ZX1gLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgYXdhaXQgZHJpdmVyLnNldE5ldHdvcmtDb25uZWN0aW9uKHZhbHVlKTtcclxuICAgICAgICBhd2FpdCBkcml2ZXIuZ2V0TmV0d29ya0Nvbm5lY3Rpb24oKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCh2YWx1ZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgdmFsdWUgb2YgWzEsIDIsIDQsIDZdKSB7XHJcbiAgICAgIHRlc3QodmFsdWUpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uXFwuLiJ9
