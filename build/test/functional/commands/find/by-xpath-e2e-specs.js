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
var f = "android.widget.FrameLayout";

describe('Find - xpath', function () {
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
  it('should throw when matching nothing', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('xpath', '//whatthat', false).should.eventually.be.rejectedWith(/could not be located/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should throw with status 7 for hierarchy root', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('xpath', '/*', false).should.eventually.be.rejectedWith(/could not be located/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find element by type', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('xpath', '//' + atv, false));

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
  it('should find element by text', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('xpath', '//' + atv + '[@text=\'Accessibility\']', false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('Accessibility'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find exactly one element via elementsByXPath', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('xpath', '//' + atv + '[@text=\'Accessibility\']', true));

        case 2:
          el = context$2$0.sent;

          el.length.should.equal(1);
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.getText(el[0].ELEMENT).should.eventually.equal('Accessibility'));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find element by partial text', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('xpath', '//' + atv + '[contains(@text, \'Accessibility\')]', false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('Accessibility'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find the last element', function callee$1$0() {
    var el, text;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('xpath', '(//' + atv + ')[last()]', false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT));

        case 5:
          text = context$2$0.sent;

          ["OS", "Text", "Views", "Preference"].should.include(text);

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  // TODO: Doesn't work on CI. Works locally on API_LEVEL 23
  //it('should find element by xpath index and child @skip-ci', async () => {
  // let alv = 'android.widget.ListView';
  // let el = await driver.findElOrEls('xpath', `//${f}[2]/${alv}[1]/${atv}[4]`, false);
  // await driver.getText(el.ELEMENT).should.eventually.equal('App');
  //});

  it('should find element by index and embedded desc', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('xpath', '//' + f + '//' + atv + '[5]', false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('Content'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find all elements', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('xpath', '//*', true));

        case 2:
          el = context$2$0.sent;

          el.length.should.be.above(2);

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find the first element when searching for all elements', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('xpath', '//*', true));

        case 2:
          el = context$2$0.sent;

          el[0].should.exist;

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find less elements with compression turned on', function callee$1$0() {
    var elementsWithoutCompression, elementsWithCompression;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.updateSettings({ ignoreUnimportantViews: false }));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.findElOrEls('xpath', '//*', true));

        case 4:
          elementsWithoutCompression = context$2$0.sent;
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(driver.updateSettings({ ignoreUnimportantViews: true }));

        case 7:
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(driver.findElOrEls('xpath', '//*', true));

        case 9:
          elementsWithCompression = context$2$0.sent;

          elementsWithoutCompression.length.should.be.greaterThan(elementsWithCompression.length);

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2J5LXhwYXRoLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2dCQUNuQixhQUFhOzs7O3VCQUNkLGVBQWU7Ozs7QUFHeEMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFNLEdBQUcsR0FBRyx5QkFBeUIsQ0FBQztBQUN0QyxJQUFNLENBQUMsR0FBRyw0QkFBNEIsQ0FBQzs7QUFFdkMsUUFBUSxDQUFDLGNBQWMsRUFBRSxZQUFZOzs7QUFDbkMsTUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLFFBQU0sQ0FBQzs7OztBQUNMLGdCQUFNLEdBQUcsbUJBQW1CLENBQUM7OzJDQUN2QixNQUFNLENBQUMsYUFBYSxzQkFBYzs7Ozs7OztHQUN6QyxDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLG9DQUFvQyxFQUFFOzs7OzsyQ0FDakMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQzs7Ozs7OztHQUNqSCxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsK0NBQStDLEVBQUU7Ozs7OzJDQUM1QyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDOzs7Ozs7O0dBQ3pHLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyw2QkFBNkIsRUFBRTtRQUM1QixFQUFFOzs7OzsyQ0FBUyxNQUFN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Q0FBQyxLQUFLLENBQUM7Ozs7Ozs7R0FDcEIsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLHNEQUFzRCxFQUFFO1FBRXJELDBCQUEwQixFQUUxQix1QkFBdUI7Ozs7OzJDQUhyQixNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUMsc0JBQXNCLEVBQUUsS0FBSyxFQUFDLENBQUM7Ozs7MkNBQ3JCLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxTQUFTLElBQUksQ0FBQzs7O0FBQTNFLG9DQUEwQjs7MkNBQ3hCLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBQyxzQkFBc0IsRUFBRSxJQUFJLEVBQUMsQ0FBQzs7OzsyQ0FDdkIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLFNBQVMsSUFBSSxDQUFDOzs7QUFBeEUsaUNBQXVCOztBQUMzQixvQ0FBMEIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7R0FDekYsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2J5LXhwYXRoLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xyXG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XHJcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uLy4uJztcclxuaW1wb3J0IERFRkFVTFRfQ0FQUyBmcm9tICcuLi8uLi9kZXNpcmVkJztcclxuXHJcblxyXG5jaGFpLnNob3VsZCgpO1xyXG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XHJcblxyXG5jb25zdCBhdHYgPSAnYW5kcm9pZC53aWRnZXQuVGV4dFZpZXcnO1xyXG5jb25zdCBmID0gXCJhbmRyb2lkLndpZGdldC5GcmFtZUxheW91dFwiO1xyXG5cclxuZGVzY3JpYmUoJ0ZpbmQgLSB4cGF0aCcsIGZ1bmN0aW9uICgpIHtcclxuICBsZXQgZHJpdmVyO1xyXG4gIGJlZm9yZShhc3luYyAoKSA9PiB7XHJcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xyXG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oREVGQVVMVF9DQVBTKTtcclxuICB9KTtcclxuICBhZnRlcihhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgdGhyb3cgd2hlbiBtYXRjaGluZyBub3RoaW5nJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCd4cGF0aCcsICcvL3doYXR0aGF0JywgZmFsc2UpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvY291bGQgbm90IGJlIGxvY2F0ZWQvKTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIHRocm93IHdpdGggc3RhdHVzIDcgZm9yIGhpZXJhcmNoeSByb290JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCd4cGF0aCcsICcvKicsIGZhbHNlKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL2NvdWxkIG5vdCBiZSBsb2NhdGVkLyk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBmaW5kIGVsZW1lbnQgYnkgdHlwZScsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygneHBhdGgnLCBgLy8ke2F0dn1gLCBmYWxzZSk7XHJcbiAgICBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbC5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnQVBJIERlbW9zJyk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBmaW5kIGVsZW1lbnQgYnkgdGV4dCcsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygneHBhdGgnLCBgLy8ke2F0dn1bQHRleHQ9J0FjY2Vzc2liaWxpdHknXWAsIGZhbHNlKTtcclxuICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdBY2Nlc3NpYmlsaXR5Jyk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBmaW5kIGV4YWN0bHkgb25lIGVsZW1lbnQgdmlhIGVsZW1lbnRzQnlYUGF0aCcsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygneHBhdGgnLCBgLy8ke2F0dn1bQHRleHQ9J0FjY2Vzc2liaWxpdHknXWAsIHRydWUpO1xyXG4gICAgZWwubGVuZ3RoLnNob3VsZC5lcXVhbCgxKTtcclxuICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsWzBdLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdBY2Nlc3NpYmlsaXR5Jyk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBmaW5kIGVsZW1lbnQgYnkgcGFydGlhbCB0ZXh0JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCd4cGF0aCcsIGAvLyR7YXR2fVtjb250YWlucyhAdGV4dCwgJ0FjY2Vzc2liaWxpdHknKV1gLCBmYWxzZSk7XHJcbiAgICBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbC5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnQWNjZXNzaWJpbGl0eScpO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgZmluZCB0aGUgbGFzdCBlbGVtZW50JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCd4cGF0aCcsIGAoLy8ke2F0dn0pW2xhc3QoKV1gLCBmYWxzZSk7XHJcbiAgICBsZXQgdGV4dCA9IGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsLkVMRU1FTlQpO1xyXG4gICAgW1wiT1NcIiwgXCJUZXh0XCIsIFwiVmlld3NcIiwgXCJQcmVmZXJlbmNlXCJdLnNob3VsZC5pbmNsdWRlKHRleHQpO1xyXG4gIH0pO1xyXG5cclxuICAvLyBUT0RPOiBEb2Vzbid0IHdvcmsgb24gQ0kuIFdvcmtzIGxvY2FsbHkgb24gQVBJX0xFVkVMIDIzXHJcbiAgLy9pdCgnc2hvdWxkIGZpbmQgZWxlbWVudCBieSB4cGF0aCBpbmRleCBhbmQgY2hpbGQgQHNraXAtY2knLCBhc3luYyAoKSA9PiB7XHJcbiAgICAvLyBsZXQgYWx2ID0gJ2FuZHJvaWQud2lkZ2V0Lkxpc3RWaWV3JztcclxuICAgIC8vIGxldCBlbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygneHBhdGgnLCBgLy8ke2Z9WzJdLyR7YWx2fVsxXS8ke2F0dn1bNF1gLCBmYWxzZSk7XHJcbiAgICAvLyBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbC5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnQXBwJyk7XHJcbiAgLy99KTtcclxuXHJcbiAgaXQoJ3Nob3VsZCBmaW5kIGVsZW1lbnQgYnkgaW5kZXggYW5kIGVtYmVkZGVkIGRlc2MnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ3hwYXRoJywgYC8vJHtmfS8vJHthdHZ9WzVdYCwgZmFsc2UpO1xyXG4gICAgYXdhaXQgZHJpdmVyLmdldFRleHQoZWwuRUxFTUVOVCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ0NvbnRlbnQnKTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGZpbmQgYWxsIGVsZW1lbnRzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCd4cGF0aCcsIGAvLypgLCB0cnVlKTtcclxuICAgIGVsLmxlbmd0aC5zaG91bGQuYmUuYWJvdmUoMik7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBmaW5kIHRoZSBmaXJzdCBlbGVtZW50IHdoZW4gc2VhcmNoaW5nIGZvciBhbGwgZWxlbWVudHMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ3hwYXRoJywgYC8vKmAsIHRydWUpO1xyXG4gICAgZWxbMF0uc2hvdWxkLmV4aXN0O1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgZmluZCBsZXNzIGVsZW1lbnRzIHdpdGggY29tcHJlc3Npb24gdHVybmVkIG9uJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgZHJpdmVyLnVwZGF0ZVNldHRpbmdzKHtpZ25vcmVVbmltcG9ydGFudFZpZXdzOiBmYWxzZX0pO1xyXG4gICAgbGV0IGVsZW1lbnRzV2l0aG91dENvbXByZXNzaW9uID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCd4cGF0aCcsIGAvLypgLCB0cnVlKTtcclxuICAgIGF3YWl0IGRyaXZlci51cGRhdGVTZXR0aW5ncyh7aWdub3JlVW5pbXBvcnRhbnRWaWV3czogdHJ1ZX0pO1xyXG4gICAgbGV0IGVsZW1lbnRzV2l0aENvbXByZXNzaW9uID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCd4cGF0aCcsIGAvLypgLCB0cnVlKTtcclxuICAgIGVsZW1lbnRzV2l0aG91dENvbXByZXNzaW9uLmxlbmd0aC5zaG91bGQuYmUuZ3JlYXRlclRoYW4oZWxlbWVudHNXaXRoQ29tcHJlc3Npb24ubGVuZ3RoKTtcclxuICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLlxcLi5cXC4uIn0=
