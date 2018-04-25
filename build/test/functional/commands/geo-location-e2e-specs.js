'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _asyncbox = require('asyncbox');

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var _desired = require('../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe.skip("geo-location", function () {
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

  it('should set geo location @skip-ci', function callee$1$0() {
    var getText, latitude, longitude, text;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this2 = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          getText = function getText() {
            var els;
            return _regeneratorRuntime.async(function getText$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.TextView', true));

                case 2:
                  els = context$3$0.sent;
                  context$3$0.next = 5;
                  return _regeneratorRuntime.awrap(driver.getText(els[1].ELEMENT));

                case 5:
                  return context$3$0.abrupt('return', context$3$0.sent);

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this2);
          };

          latitude = '27.17';
          longitude = '78.04';
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(getText());

        case 5:
          text = context$2$0.sent;

          text.should.not.include('Latitude: ' + latitude);
          text.should.not.include('Longitude: ' + longitude);

          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(driver.setGeoLocation({ latitude: latitude, longitude: longitude }));

        case 10:
          context$2$0.next = 12;
          return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(6, 1000, function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(getText());

                case 2:
                  context$3$0.t0 = context$3$0.sent;

                  if (!(context$3$0.t0 === 'GPS Tutorial')) {
                    context$3$0.next = 5;
                    break;
                  }

                  throw new Error('Location not set yet. Retry.');

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this2);
          }));

        case 12:
          context$2$0.next = 14;
          return _regeneratorRuntime.awrap(getText());

        case 14:
          text = context$2$0.sent;

          text.should.include('Latitude: ' + latitude);
          text.should.include('Longitude: ' + longitude);

        case 17:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});

// wait for the text to change
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW8tbG9jYXRpb24tZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7d0JBQ2YsVUFBVTs7Z0JBQ2QsVUFBVTs7Ozt1QkFDWCxZQUFZOzs7O0FBR3JDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsWUFBWTs7O0FBQ3hDLE1BQUksTUFBTSxZQUFBLENBQUM7QUFDWCxRQUFNLENBQUM7Ozs7QUFDTCxnQkFBTSxHQUFHLG1CQUFtQixDQUFDOzsyQ0FDdkIsTUFBTSxDQUFDLGFBQWEsc0JBQWM7Ozs7Ozs7R0FDekMsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7OzsyQ0FDRSxNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7O0dBQzdCLENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMsa0NBQWtDLEVBQUU7UUFDakMsT0FBTyxFQUtQLFFBQVEsRUFDUixTQUFTLEVBRVQsSUFBSTs7Ozs7O0FBUkosaUJBQU8sR0FBRyxTQUFWLE9BQU87Z0JBQ0wsR0FBRzs7Ozs7bURBQVMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUseUJBQXlCLEVBQUUsSUFBSSxDQUFDOzs7QUFBN0UscUJBQUc7O21EQUNNLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQzs7Ozs7Ozs7OztXQUM1Qzs7QUFFRyxrQkFBUSxHQUFHLE9BQU87QUFDbEIsbUJBQVMsR0FBRyxPQUFPOzsyQ0FFTixPQUFPLEVBQUU7OztBQUF0QixjQUFJOztBQUNSLGNBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sZ0JBQWMsUUFBUSxDQUFHLENBQUM7QUFDakQsY0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxpQkFBZSxTQUFTLENBQUcsQ0FBQzs7OzJDQUU3QyxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUMsUUFBUSxFQUFSLFFBQVEsRUFBRSxTQUFTLEVBQVQsU0FBUyxFQUFDLENBQUM7Ozs7MkNBRzVDLDZCQUFjLENBQUMsRUFBRSxJQUFJLEVBQUU7Ozs7O21EQUNqQixPQUFPLEVBQUU7Ozs7OzJDQUFLLGNBQWM7Ozs7O3dCQUM5QixJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQzs7Ozs7OztXQUVsRCxDQUFDOzs7OzJDQUVXLE9BQU8sRUFBRTs7O0FBQXRCLGNBQUk7O0FBQ0osY0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLGdCQUFjLFFBQVEsQ0FBRyxDQUFDO0FBQzdDLGNBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxpQkFBZSxTQUFTLENBQUcsQ0FBQzs7Ozs7OztHQUNoRCxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL2dlby1sb2NhdGlvbi1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcclxuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xyXG5pbXBvcnQgeyByZXRyeUludGVydmFsIH0gZnJvbSAnYXN5bmNib3gnO1xyXG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLic7XHJcbmltcG9ydCBERUZBVUxUX0NBUFMgZnJvbSAnLi4vZGVzaXJlZCc7XHJcblxyXG5cclxuY2hhaS5zaG91bGQoKTtcclxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xyXG5cclxuZGVzY3JpYmUuc2tpcChcImdlby1sb2NhdGlvblwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgbGV0IGRyaXZlcjtcclxuICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xyXG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcclxuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKERFRkFVTFRfQ0FQUyk7XHJcbiAgfSk7XHJcbiAgYWZ0ZXIoYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcclxuICB9KTtcclxuXHJcbiAgaXQoJ3Nob3VsZCBzZXQgZ2VvIGxvY2F0aW9uIEBza2lwLWNpJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IGdldFRleHQgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGxldCBlbHMgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2NsYXNzIG5hbWUnLCAnYW5kcm9pZC53aWRnZXQuVGV4dFZpZXcnLCB0cnVlKTtcclxuICAgICAgcmV0dXJuIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsc1sxXS5FTEVNRU5UKTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGxhdGl0dWRlID0gJzI3LjE3JztcclxuICAgIGxldCBsb25naXR1ZGUgPSAnNzguMDQnO1xyXG5cclxuICAgIGxldCB0ZXh0ID0gYXdhaXQgZ2V0VGV4dCgpO1xyXG4gICAgdGV4dC5zaG91bGQubm90LmluY2x1ZGUoYExhdGl0dWRlOiAke2xhdGl0dWRlfWApO1xyXG4gICAgdGV4dC5zaG91bGQubm90LmluY2x1ZGUoYExvbmdpdHVkZTogJHtsb25naXR1ZGV9YCk7XHJcblxyXG4gICAgYXdhaXQgZHJpdmVyLnNldEdlb0xvY2F0aW9uKHtsYXRpdHVkZSwgbG9uZ2l0dWRlfSk7XHJcblxyXG4gICAgLy8gd2FpdCBmb3IgdGhlIHRleHQgdG8gY2hhbmdlXHJcbiAgICBhd2FpdCByZXRyeUludGVydmFsKDYsIDEwMDAsIGFzeW5jICgpID0+IHtcclxuICAgICAgaWYgKGF3YWl0IGdldFRleHQoKSA9PT0gJ0dQUyBUdXRvcmlhbCcpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xvY2F0aW9uIG5vdCBzZXQgeWV0LiBSZXRyeS4nKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGV4dCA9IGF3YWl0IGdldFRleHQoKTtcclxuICAgIHRleHQuc2hvdWxkLmluY2x1ZGUoYExhdGl0dWRlOiAke2xhdGl0dWRlfWApO1xyXG4gICAgdGV4dC5zaG91bGQuaW5jbHVkZShgTG9uZ2l0dWRlOiAke2xvbmdpdHVkZX1gKTtcclxuICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLlxcLi4ifQ==
