'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _2 = require('../../../..');

var _3 = _interopRequireDefault(_2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _desired = require('../../desired');

var _desired2 = _interopRequireDefault(_desired);

var _asyncbox = require('asyncbox');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var caps = _lodash2['default'].defaults({
  appActivity: '.view.TextFields'
}, _desired2['default']);

describe('element', function () {
  var _this = this;

  var el = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _3['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 3:
          context$2$0.t0 = _lodash2['default'];
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.EditText', true));

        case 6:
          context$2$0.t1 = context$2$0.sent;
          el = context$2$0.t0.last.call(context$2$0.t0, context$2$0.t1);

          el.should.exist;

        case 9:
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
  afterEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.clear(el.ELEMENT));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  describe('setValueImmediate', function () {
    it('should set the text on the element', function callee$2$0() {
      var retries;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        var _this2 = this;

        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            retries = process.env.TRAVIS ? 10 : 1;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(retries, 1000, function callee$3$0() {
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap(driver.clear(el.ELEMENT));

                  case 2:
                    context$4$0.next = 4;
                    return _regeneratorRuntime.awrap(driver.setValueImmediate('original value', el.ELEMENT));

                  case 4:
                    context$4$0.next = 6;
                    return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('original value'));

                  case 6:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, _this2);
            }));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('setValue', function () {
    it('should set the text on the element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setValue('original value', el.ELEMENT));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('original value'));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9iYXNpYy9lbGVtZW50LWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2lCQUNuQixhQUFhOzs7O3NCQUN6QixRQUFROzs7O3VCQUNHLGVBQWU7Ozs7d0JBQ1YsVUFBVTs7QUFHeEMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxJQUFJLEdBQUcsb0JBQUUsUUFBUSxDQUFDO0FBQ3BCLGFBQVcsRUFBRSxrQkFBa0I7Q0FDaEMsdUJBQWUsQ0FBQzs7QUFFakIsUUFBUSxDQUFDLFNBQVMsRUFBRSxZQUFZOzs7QUFDOUIsTUFBSSxFQUFFLFlBQUEsQ0FBQztBQUNQLFFBQU0sQ0FBQzs7OztBQUNMLGdCQUFNLEdBQUcsbUJBQW1CLENBQUM7OzJDQUN2QixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzs7Ozs7MkNBQ2QsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUseUJBQXlCLEVBQUUsSUFBSSxDQUFDOzs7O0FBQW5GLFlBQUUsa0JBQUssSUFBSTs7QUFDWCxZQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzs7Ozs7OztHQUNqQixDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDO0FBQ0gsV0FBUyxDQUFDOzs7OzsyQ0FDRixNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7Ozs7Ozs7R0FDL0IsQ0FBQyxDQUFDOztBQUVILFVBQVEsQ0FBQyxtQkFBbUIsRUFBRSxZQUFNO0FBQ2xDLE1BQUUsQ0FBQyxvQ0FBb0MsRUFBRTtVQUNuQyxPQUFPOzs7Ozs7QUFBUCxtQkFBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsR0FBRyxDQUFDOzs2Q0FDbkMsNkJBQWMsT0FBTyxFQUFFLElBQUksRUFBRTs7Ozs7cURBQzNCLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQzs7OztxREFDeEIsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUM7Ozs7cURBQ3RELE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDOzs7Ozs7O2FBQzNFLENBQUM7Ozs7Ozs7S0FDSCxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsVUFBVSxFQUFFLFlBQU07QUFDekIsTUFBRSxDQUFDLG9DQUFvQyxFQUFFOzs7Ozs2Q0FDakMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDOzs7OzZDQUM3QyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzs7Ozs7OztLQUMzRSxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL2Jhc2ljL2VsZW1lbnQtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XHJcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcclxuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4vLi4nO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgREVGQVVMVF9DQVBTIGZyb20gJy4uLy4uL2Rlc2lyZWQnO1xyXG5pbXBvcnQgeyByZXRyeUludGVydmFsIH0gZnJvbSAnYXN5bmNib3gnO1xyXG5cclxuXHJcbmNoYWkuc2hvdWxkKCk7XHJcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcclxuXHJcbmxldCBkcml2ZXI7XHJcbmxldCBjYXBzID0gXy5kZWZhdWx0cyh7XHJcbiAgYXBwQWN0aXZpdHk6ICcudmlldy5UZXh0RmllbGRzJ1xyXG59LCBERUZBVUxUX0NBUFMpO1xyXG5cclxuZGVzY3JpYmUoJ2VsZW1lbnQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgbGV0IGVsO1xyXG4gIGJlZm9yZShhc3luYyAoKSA9PiB7XHJcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xyXG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XHJcbiAgICBlbCA9IF8ubGFzdChhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2NsYXNzIG5hbWUnLCAnYW5kcm9pZC53aWRnZXQuRWRpdFRleHQnLCB0cnVlKSk7XHJcbiAgICBlbC5zaG91bGQuZXhpc3Q7XHJcbiAgfSk7XHJcbiAgYWZ0ZXIoYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcclxuICB9KTtcclxuICBhZnRlckVhY2goYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgZHJpdmVyLmNsZWFyKGVsLkVMRU1FTlQpO1xyXG4gIH0pO1xyXG5cclxuICBkZXNjcmliZSgnc2V0VmFsdWVJbW1lZGlhdGUnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIHNldCB0aGUgdGV4dCBvbiB0aGUgZWxlbWVudCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IHJldHJpZXMgPSBwcm9jZXNzLmVudi5UUkFWSVMgPyAxMCA6IDE7XHJcbiAgICAgIGF3YWl0IHJldHJ5SW50ZXJ2YWwocmV0cmllcywgMTAwMCwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGF3YWl0IGRyaXZlci5jbGVhcihlbC5FTEVNRU5UKTtcclxuICAgICAgICBhd2FpdCBkcml2ZXIuc2V0VmFsdWVJbW1lZGlhdGUoJ29yaWdpbmFsIHZhbHVlJywgZWwuRUxFTUVOVCk7XHJcbiAgICAgICAgYXdhaXQgZHJpdmVyLmdldFRleHQoZWwuRUxFTUVOVCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ29yaWdpbmFsIHZhbHVlJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ3NldFZhbHVlJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBzZXQgdGhlIHRleHQgb24gdGhlIGVsZW1lbnQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5zZXRWYWx1ZSgnb3JpZ2luYWwgdmFsdWUnLCBlbC5FTEVNRU5UKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdldFRleHQoZWwuRUxFTUVOVCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ29yaWdpbmFsIHZhbHVlJyk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLlxcLi5cXC4uIn0=
