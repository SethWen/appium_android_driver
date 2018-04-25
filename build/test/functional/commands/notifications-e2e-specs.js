'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _2 = require('../../..');

var _3 = _interopRequireDefault(_2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _asyncbox = require('asyncbox');

var _desired = require('../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var defaultCaps = _lodash2['default'].defaults({
  appActivity: '.app.StatusBarNotifications'
}, _desired2['default']);

describe('apidemo - notifications', function () {
  var _this = this;

  before(function callee$1$0() {
    var adb, apiLevel;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          adb = new _appiumAdb2['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.getApiLevel());

        case 3:
          apiLevel = context$2$0.sent;

          if (!([21, 22].indexOf(apiLevel) >= 0)) {
            context$2$0.next = 6;
            break;
          }

          return context$2$0.abrupt('return', this.skip());

        case 6:
          driver = new _3['default']();
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(driver.createSession(defaultCaps));

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  after(function callee$1$0() {
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
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('should open the notification shade @skip-ci', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this2 = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('accessibility id', ':-|', false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.click(el.ELEMENT));

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(_bluebird2['default'].delay(1000));

        case 7:
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(driver.openNotifications());

        case 9:
          context$2$0.next = 11;
          return _regeneratorRuntime.awrap((0, _asyncbox.retry)(4, function callee$2$0() {
            var textViews, text, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, view;

            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.TextView', true));

                case 2:
                  textViews = context$3$0.sent;
                  text = [];
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  context$3$0.prev = 7;
                  _iterator = _getIterator(textViews);

                case 9:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    context$3$0.next = 19;
                    break;
                  }

                  view = _step.value;
                  context$3$0.t0 = text;
                  context$3$0.next = 14;
                  return _regeneratorRuntime.awrap(driver.getText(view.ELEMENT));

                case 14:
                  context$3$0.t1 = context$3$0.sent;
                  context$3$0.t0.push.call(context$3$0.t0, context$3$0.t1);

                case 16:
                  _iteratorNormalCompletion = true;
                  context$3$0.next = 9;
                  break;

                case 19:
                  context$3$0.next = 25;
                  break;

                case 21:
                  context$3$0.prev = 21;
                  context$3$0.t2 = context$3$0['catch'](7);
                  _didIteratorError = true;
                  _iteratorError = context$3$0.t2;

                case 25:
                  context$3$0.prev = 25;
                  context$3$0.prev = 26;

                  if (!_iteratorNormalCompletion && _iterator['return']) {
                    _iterator['return']();
                  }

                case 28:
                  context$3$0.prev = 28;

                  if (!_didIteratorError) {
                    context$3$0.next = 31;
                    break;
                  }

                  throw _iteratorError;

                case 31:
                  return context$3$0.finish(28);

                case 32:
                  return context$3$0.finish(25);

                case 33:
                  text.should.include('Mood ring');

                case 34:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this2, [[7, 21, 25, 33], [26,, 28, 32]]);
          }));

        case 11:
          context$2$0.next = 13;
          return _regeneratorRuntime.awrap(driver.keyevent(4));

        case 13:
          context$2$0.next = 15;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.become(':-|'));

        case 15:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});

// TODO: why does this fail?

// give the app a second to catch up before opening notifications

// go back to the app
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9ub3RpZmljYXRpb25zLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7aUJBQ25CLFVBQVU7Ozs7d0JBQ3RCLFVBQVU7Ozs7c0JBQ1YsUUFBUTs7Ozt5QkFDTixZQUFZOzs7O3dCQUNOLFVBQVU7O3VCQUNQLFlBQVk7Ozs7QUFHckMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxXQUFXLEdBQUcsb0JBQUUsUUFBUSxDQUFDO0FBQzNCLGFBQVcsRUFBRSw2QkFBNkI7Q0FDM0MsdUJBQWUsQ0FBQzs7QUFFakIsUUFBUSxDQUFDLHlCQUF5QixFQUFFLFlBQVk7OztBQUM5QyxRQUFNLENBQUM7UUFFRCxHQUFHLEVBQ0gsUUFBUTs7OztBQURSLGFBQUcsR0FBRyw0QkFBUzs7MkNBQ0UsR0FBRyxDQUFDLFdBQVcsRUFBRTs7O0FBQWxDLGtCQUFROztnQkFDUixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBOzs7Ozs4Q0FDMUIsSUFBSSxDQUFDLElBQUksRUFBRTs7O0FBRXBCLGdCQUFNLEdBQUcsbUJBQW1CLENBQUM7OzJDQUN2QixNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQzs7Ozs7OztHQUN4QyxDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7ZUFDQSxNQUFNOzs7Ozs7MkNBQ0YsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUUvQixDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLDZDQUE2QyxFQUFFO1FBQzVDLEVBQUU7Ozs7Ozs7MkNBQVMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDOzs7QUFBL0QsWUFBRTs7MkNBQ0EsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDOzs7OzJDQUd4QixzQkFBRSxLQUFLLENBQUMsSUFBSSxDQUFDOzs7OzJDQUNiLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRTs7OzsyQ0FFMUIscUJBQU0sQ0FBQyxFQUFFO2dCQUNULFNBQVMsRUFDVCxJQUFJLGtGQUNDLElBQUk7Ozs7OzttREFGUyxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSx5QkFBeUIsRUFBRSxJQUFJLENBQUM7OztBQUFuRiwyQkFBUztBQUNULHNCQUFJLEdBQUcsRUFBRTs7Ozs7MkNBQ0ksU0FBUzs7Ozs7Ozs7QUFBakIsc0JBQUk7bUNBQ1gsSUFBSTs7bURBQVksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDOzs7O2lDQUF2QyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWCxzQkFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7Ozs7Ozs7V0FDbEMsQ0FBQzs7OzsyQ0FHSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7OzsyQ0FDbEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Ozs7Ozs7R0FDdEQsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9ub3RpZmljYXRpb25zLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xyXG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XHJcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uJztcclxuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgQURCIGZyb20gJ2FwcGl1bS1hZGInO1xyXG5pbXBvcnQgeyByZXRyeSB9IGZyb20gJ2FzeW5jYm94JztcclxuaW1wb3J0IERFRkFVTFRfQ0FQUyBmcm9tICcuLi9kZXNpcmVkJztcclxuXHJcblxyXG5jaGFpLnNob3VsZCgpO1xyXG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XHJcblxyXG5sZXQgZHJpdmVyO1xyXG5sZXQgZGVmYXVsdENhcHMgPSBfLmRlZmF1bHRzKHtcclxuICBhcHBBY3Rpdml0eTogJy5hcHAuU3RhdHVzQmFyTm90aWZpY2F0aW9ucydcclxufSwgREVGQVVMVF9DQVBTKTtcclxuXHJcbmRlc2NyaWJlKCdhcGlkZW1vIC0gbm90aWZpY2F0aW9ucycsIGZ1bmN0aW9uICgpIHtcclxuICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gVE9ETzogd2h5IGRvZXMgdGhpcyBmYWlsP1xyXG4gICAgbGV0IGFkYiA9IG5ldyBBREIoKTtcclxuICAgIGxldCBhcGlMZXZlbCA9IGF3YWl0IGFkYi5nZXRBcGlMZXZlbCgpO1xyXG4gICAgaWYgKFsyMSwgMjJdLmluZGV4T2YoYXBpTGV2ZWwpID49IDApIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc2tpcCgpO1xyXG4gICAgfVxyXG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcclxuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGRlZmF1bHRDYXBzKTtcclxuICB9KTtcclxuICBhZnRlcihhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoZHJpdmVyKSB7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGl0KCdzaG91bGQgb3BlbiB0aGUgbm90aWZpY2F0aW9uIHNoYWRlIEBza2lwLWNpJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdhY2Nlc3NpYmlsaXR5IGlkJywgJzotfCcsIGZhbHNlKTtcclxuICAgIGF3YWl0IGRyaXZlci5jbGljayhlbC5FTEVNRU5UKTtcclxuXHJcbiAgICAvLyBnaXZlIHRoZSBhcHAgYSBzZWNvbmQgdG8gY2F0Y2ggdXAgYmVmb3JlIG9wZW5pbmcgbm90aWZpY2F0aW9uc1xyXG4gICAgYXdhaXQgQi5kZWxheSgxMDAwKTtcclxuICAgIGF3YWl0IGRyaXZlci5vcGVuTm90aWZpY2F0aW9ucygpO1xyXG5cclxuICAgIGF3YWl0IHJldHJ5KDQsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IHRleHRWaWV3cyA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnY2xhc3MgbmFtZScsICdhbmRyb2lkLndpZGdldC5UZXh0VmlldycsIHRydWUpO1xyXG4gICAgICBsZXQgdGV4dCA9IFtdO1xyXG4gICAgICBmb3IgKGxldCB2aWV3IG9mIHRleHRWaWV3cykge1xyXG4gICAgICAgIHRleHQucHVzaChhd2FpdCBkcml2ZXIuZ2V0VGV4dCh2aWV3LkVMRU1FTlQpKTtcclxuICAgICAgfVxyXG4gICAgICB0ZXh0LnNob3VsZC5pbmNsdWRlKCdNb29kIHJpbmcnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGdvIGJhY2sgdG8gdGhlIGFwcFxyXG4gICAgYXdhaXQgZHJpdmVyLmtleWV2ZW50KDQpO1xyXG4gICAgYXdhaXQgZHJpdmVyLmdldFRleHQoZWwuRUxFTUVOVCkuc2hvdWxkLmJlY29tZSgnOi18Jyk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi5cXC4uIn0=
