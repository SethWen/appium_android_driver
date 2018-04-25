'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../../..');

var _2 = _interopRequireDefault(_);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _desired = require('../../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Find - basic', function () {
  var _this = this;

  var driver = undefined;
  var singleResourceId = undefined;
  before(function callee$1$0() {
    var adb;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _2['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(_desired2['default']));

        case 3:
          adb = new _appiumAdb2['default']({});
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(adb.getApiLevel());

        case 6:
          context$2$0.t0 = context$2$0.sent;

          if (!(context$2$0.t0 >= 21)) {
            context$2$0.next = 11;
            break;
          }

          context$2$0.t1 = 'decor_content_parent';
          context$2$0.next = 12;
          break;

        case 11:
          context$2$0.t1 = 'home';

        case 12:
          singleResourceId = context$2$0.t1;

        case 13:
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
  it('should find a single element by content-description', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('accessibility id', 'Animation', false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('Animation'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find an element by class name', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.TextView', false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('API Demos'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find multiple elements by class name', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.TextView', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should not find an element that doesnt exist', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'blargimarg', false).should.be.rejectedWith(/could not be located/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should not find multiple elements that doesnt exist', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'blargimarg', true).should.eventually.have.length(0));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should fail on empty locator', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', '', true).should.be.rejectedWith(/selector/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find a single element by string id @skip-android-all', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'activity_sample_code', false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('API Demos'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find a single element by resource-id', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'android:id/' + singleResourceId, false).should.eventually.exist);

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find multiple elements by resource-id', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'android:id/text1', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find multiple elements by resource-id even when theres just one', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'android:id/' + singleResourceId, true).should.eventually.have.length(1));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find a single element by resource-id with implicit package', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', singleResourceId, false).should.eventually.exist);

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find a single element by resource-id with implicit package', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'text1', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find multiple elements by resource-id with implicit package even when theres just one', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', singleResourceId, true).should.eventually.have.length(1));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  describe('implicit wait', function () {
    var implicitWait = 5000;
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.implicitWait(implicitWait));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should respect implicit wait with multiple elements', function callee$2$0() {
      var beforeMs, afterMs;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            beforeMs = Date.now();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'there_is_nothing_called_this', true).should.eventually.have.length(0));

          case 3:
            afterMs = Date.now();

            (afterMs - beforeMs).should.be.below(implicitWait + 5000);
            (afterMs - beforeMs).should.be.above(implicitWait);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should respect implicit wait with a single element', function callee$2$0() {
      var beforeMs, afterMs;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            beforeMs = Date.now();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'there_is_nothing_called_this', false).should.eventually.be.rejectedWith(/could not be located/));

          case 3:
            afterMs = Date.now();

            (afterMs - beforeMs).should.be.below(implicitWait + 5000);
            (afterMs - beforeMs).should.be.above(implicitWait);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
});

// the app behaves differently on different api levels when it comes to
// which resource ids are available for testing, so we switch here to make
// sure we're using the right resource id below
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2ZpbmQtYmFzaWMtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ25CLGFBQWE7Ozs7eUJBQ3ZCLFlBQVk7Ozs7dUJBQ0gsZUFBZTs7OztBQUd4QyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxjQUFjLEVBQUUsWUFBWTs7O0FBQ25DLE1BQUksTUFBTSxZQUFBLENBQUM7QUFDWCxNQUFJLGdCQUFnQixZQUFBLENBQUM7QUFDckIsUUFBTSxDQUFDO1FBR0QsR0FBRzs7OztBQUZQLGdCQUFNLEdBQUcsbUJBQW1CLENBQUM7OzJDQUN2QixNQUFNLENBQUMsYUFBYSxzQkFBYzs7O0FBQ3BDLGFBQUcsR0FBRywyQkFBUSxFQUFFLENBQUM7OzJDQUlJLEdBQUcsQ0FBQyxXQUFXLEVBQUU7Ozs7O2tDQUFJLEVBQUU7Ozs7OzJCQUFHLHNCQUFzQjs7Ozs7MkJBQUcsTUFBTTs7O0FBQWxGLDBCQUFnQjs7Ozs7OztHQUNqQixDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLHFEQUFxRCxFQUFFO1FBQ3BELEVBQUU7Ozs7OzJDQUFTLE1BQU0sQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQzs7O0FBQXJFLFlBQUU7OzJDQUNBLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7Ozs7OztHQUN0RSxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsc0NBQXNDLEVBQUU7UUFDckMsRUFBRTs7Ozs7MkNBQVMs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QUFIUCxvQkFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUU7OzZDQUNuQixNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSw4QkFBOEIsRUFBRSxLQUFLLENBQUMsQ0FDbEUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDOzs7QUFDeEQsbUJBQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFOztBQUN4QixhQUFDLE9BQU8sR0FBRyxRQUFRLENBQUEsQ0FBRSxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDMUQsYUFBQyxPQUFPLEdBQUcsUUFBUSxDQUFBLENBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7Ozs7Ozs7S0FDcEQsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2ZpbmQtYmFzaWMtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XHJcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcclxuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4vLi4nO1xyXG5pbXBvcnQgQURCIGZyb20gJ2FwcGl1bS1hZGInO1xyXG5pbXBvcnQgREVGQVVMVF9DQVBTIGZyb20gJy4uLy4uL2Rlc2lyZWQnO1xyXG5cclxuXHJcbmNoYWkuc2hvdWxkKCk7XHJcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcclxuXHJcbmRlc2NyaWJlKCdGaW5kIC0gYmFzaWMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgbGV0IGRyaXZlcjtcclxuICBsZXQgc2luZ2xlUmVzb3VyY2VJZDtcclxuICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xyXG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcclxuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKERFRkFVTFRfQ0FQUyk7XHJcbiAgICBsZXQgYWRiID0gbmV3IEFEQih7fSk7XHJcbiAgICAvLyB0aGUgYXBwIGJlaGF2ZXMgZGlmZmVyZW50bHkgb24gZGlmZmVyZW50IGFwaSBsZXZlbHMgd2hlbiBpdCBjb21lcyB0b1xyXG4gICAgLy8gd2hpY2ggcmVzb3VyY2UgaWRzIGFyZSBhdmFpbGFibGUgZm9yIHRlc3RpbmcsIHNvIHdlIHN3aXRjaCBoZXJlIHRvIG1ha2VcclxuICAgIC8vIHN1cmUgd2UncmUgdXNpbmcgdGhlIHJpZ2h0IHJlc291cmNlIGlkIGJlbG93XHJcbiAgICBzaW5nbGVSZXNvdXJjZUlkID0gYXdhaXQgYWRiLmdldEFwaUxldmVsKCkgPj0gMjEgPyAnZGVjb3JfY29udGVudF9wYXJlbnQnIDogJ2hvbWUnO1xyXG4gIH0pO1xyXG4gIGFmdGVyKGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBmaW5kIGEgc2luZ2xlIGVsZW1lbnQgYnkgY29udGVudC1kZXNjcmlwdGlvbicsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnYWNjZXNzaWJpbGl0eSBpZCcsICdBbmltYXRpb24nLCBmYWxzZSk7XHJcbiAgICBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbC5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnQW5pbWF0aW9uJyk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBmaW5kIGFuIGVsZW1lbnQgYnkgY2xhc3MgbmFtZScsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnY2xhc3MgbmFtZScsICdhbmRyb2lkLndpZGdldC5UZXh0VmlldycsIGZhbHNlKTtcclxuICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdBUEkgRGVtb3MnKTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGZpbmQgbXVsdGlwbGUgZWxlbWVudHMgYnkgY2xhc3MgbmFtZScsIGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnY2xhc3MgbmFtZScsICdhbmRyb2lkLndpZGdldC5UZXh0VmlldycsIHRydWUpXHJcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aC5hdC5sZWFzdCgxMCk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBub3QgZmluZCBhbiBlbGVtZW50IHRoYXQgZG9lc250IGV4aXN0JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgJ2JsYXJnaW1hcmcnLCBmYWxzZSlcclxuICAgICAgLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoL2NvdWxkIG5vdCBiZSBsb2NhdGVkLyk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBub3QgZmluZCBtdWx0aXBsZSBlbGVtZW50cyB0aGF0IGRvZXNudCBleGlzdCcsIGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnY2xhc3MgbmFtZScsICdibGFyZ2ltYXJnJywgdHJ1ZSlcclxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmhhdmUubGVuZ3RoKDApO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgZmFpbCBvbiBlbXB0eSBsb2NhdG9yJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgJycsIHRydWUpLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoL3NlbGVjdG9yLyk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBmaW5kIGEgc2luZ2xlIGVsZW1lbnQgYnkgc3RyaW5nIGlkIEBza2lwLWFuZHJvaWQtYWxsJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdpZCcsICdhY3Rpdml0eV9zYW1wbGVfY29kZScsIGZhbHNlKTtcclxuICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdBUEkgRGVtb3MnKTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGZpbmQgYSBzaW5nbGUgZWxlbWVudCBieSByZXNvdXJjZS1pZCcsIGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnaWQnLCBgYW5kcm9pZDppZC8ke3NpbmdsZVJlc291cmNlSWR9YCwgZmFsc2UpXHJcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5leGlzdDtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGZpbmQgbXVsdGlwbGUgZWxlbWVudHMgYnkgcmVzb3VyY2UtaWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2lkJywgJ2FuZHJvaWQ6aWQvdGV4dDEnLCB0cnVlKVxyXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGguYXQubGVhc3QoMTApO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgZmluZCBtdWx0aXBsZSBlbGVtZW50cyBieSByZXNvdXJjZS1pZCBldmVuIHdoZW4gdGhlcmVzIGp1c3Qgb25lJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdpZCcsIGBhbmRyb2lkOmlkLyR7c2luZ2xlUmVzb3VyY2VJZH1gLCB0cnVlKVxyXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGgoMSk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBmaW5kIGEgc2luZ2xlIGVsZW1lbnQgYnkgcmVzb3VyY2UtaWQgd2l0aCBpbXBsaWNpdCBwYWNrYWdlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdpZCcsIHNpbmdsZVJlc291cmNlSWQsIGZhbHNlKVxyXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuZXhpc3Q7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBmaW5kIGEgc2luZ2xlIGVsZW1lbnQgYnkgcmVzb3VyY2UtaWQgd2l0aCBpbXBsaWNpdCBwYWNrYWdlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdpZCcsICd0ZXh0MScsIHRydWUpXHJcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aC5hdC5sZWFzdCgxMCk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBmaW5kIG11bHRpcGxlIGVsZW1lbnRzIGJ5IHJlc291cmNlLWlkIHdpdGggaW1wbGljaXQgcGFja2FnZSBldmVuIHdoZW4gdGhlcmVzIGp1c3Qgb25lJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdpZCcsIHNpbmdsZVJlc291cmNlSWQsIHRydWUpXHJcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aCgxKTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnaW1wbGljaXQgd2FpdCcsICgpID0+IHtcclxuICAgIGxldCBpbXBsaWNpdFdhaXQgPSA1MDAwO1xyXG4gICAgYmVmb3JlKGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLmltcGxpY2l0V2FpdChpbXBsaWNpdFdhaXQpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHJlc3BlY3QgaW1wbGljaXQgd2FpdCB3aXRoIG11bHRpcGxlIGVsZW1lbnRzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgYmVmb3JlTXMgPSBEYXRlLm5vdygpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2lkJywgJ3RoZXJlX2lzX25vdGhpbmdfY2FsbGVkX3RoaXMnLCB0cnVlKVxyXG4gICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aCgwKTtcclxuICAgICAgbGV0IGFmdGVyTXMgPSBEYXRlLm5vdygpO1xyXG4gICAgICAoYWZ0ZXJNcyAtIGJlZm9yZU1zKS5zaG91bGQuYmUuYmVsb3coaW1wbGljaXRXYWl0ICsgNTAwMCk7XHJcbiAgICAgIChhZnRlck1zIC0gYmVmb3JlTXMpLnNob3VsZC5iZS5hYm92ZShpbXBsaWNpdFdhaXQpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHJlc3BlY3QgaW1wbGljaXQgd2FpdCB3aXRoIGEgc2luZ2xlIGVsZW1lbnQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGxldCBiZWZvcmVNcyA9IERhdGUubm93KCk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnaWQnLCAndGhlcmVfaXNfbm90aGluZ19jYWxsZWRfdGhpcycsIGZhbHNlKVxyXG4gICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL2NvdWxkIG5vdCBiZSBsb2NhdGVkLyk7XHJcbiAgICAgIGxldCBhZnRlck1zID0gRGF0ZS5ub3coKTtcclxuICAgICAgKGFmdGVyTXMgLSBiZWZvcmVNcykuc2hvdWxkLmJlLmJlbG93KGltcGxpY2l0V2FpdCArIDUwMDApO1xyXG4gICAgICAoYWZ0ZXJNcyAtIGJlZm9yZU1zKS5zaG91bGQuYmUuYWJvdmUoaW1wbGljaXRXYWl0KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uXFwuLlxcLi4ifQ==
