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

describe('Find - uiautomator', function () {
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
  it('should find elements with a boolean argument', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable(true)', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find elements within the context of another element', function callee$1$0() {
    var els;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().className("android.widget.TextView")', true));

        case 2:
          els = context$2$0.sent;

          els.length.should.be.above(8);
          els.length.should.be.below(14);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find elements without prepending "new UiSelector()"', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', '.clickable(true)', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find elements without prepending "new UiSelector()"', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', '.clickable(true)', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find elements without prepending "new UiSelector()"', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'clickable(true)', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find elements without prepending "new "', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'UiSelector().clickable(true)', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should ignore trailing semicolons', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable(true);', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find an element with an int argument', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().index(0)', false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getName(el.ELEMENT).should.eventually.equal('android.widget.FrameLayout'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find an element with a string argument', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().description("Animation")', false).should.eventually.exist);

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find an element with an overloaded method argument', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().className("android.widget.TextView")', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find an element with a Class<T> method argument', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().className(android.widget.TextView)', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find an element with a long chain of methods', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable(true).className(android.widget.TextView).index(1)', false));

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
  it('should find an element with recursive UiSelectors', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.adb.getApiLevel());

        case 2:
          context$2$0.t0 = context$2$0.sent;

          if (!(context$2$0.t0 >= 24)) {
            context$2$0.next = 5;
            break;
          }

          return context$2$0.abrupt('return', this.skip());

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().childSelector(new UiSelector().clickable(true)).clickable(true)', true).should.eventually.have.length(1));

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should not find an element with bad syntax', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable((true)', true).should.eventually.be.rejectedWith(/resource could not be found/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should not find an element with bad syntax', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().drinkable(true)', true).should.eventually.be.rejectedWith(/resource could not be found/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should not find an element which does not exist', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().description("chuckwudi")', true).should.eventually.have.length(0));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should allow multiple selector statements and return the Union of the two sets', function callee$1$0() {
    var clickable, notClickable, both;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable(true)', true));

        case 2:
          clickable = context$2$0.sent;

          clickable.length.should.be.above(0);
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable(false)', true));

        case 6:
          notClickable = context$2$0.sent;

          notClickable.length.should.be.above(0);
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable(true); new UiSelector().clickable(false);', true));

        case 10:
          both = context$2$0.sent;

          both.should.have.length(clickable.length + notClickable.length);

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should allow multiple selector statements and return the Union of the two sets', function callee$1$0() {
    var clickable, clickableClickable;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable(true)', true));

        case 2:
          clickable = context$2$0.sent;

          clickable.length.should.be.above(0);
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable(true); new UiSelector().clickable(true);', true));

        case 6:
          clickableClickable = context$2$0.sent;

          clickableClickable.length.should.be.above(0);
          clickableClickable.should.have.length(clickable.length);

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find an element in the second selector if the first finds no elements', function callee$1$0() {
    var selector;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          selector = 'new UiSelector().className("not.a.class"); new UiSelector().className("android.widget.TextView")';
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', selector, true).should.eventually.exist);

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should scroll to, and return elements using UiScrollable', function callee$1$0() {
    var selector, el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          selector = 'new UiScrollable(new UiSelector().scrollable(true).instance(0)).scrollIntoView(new UiSelector().text("Views").instance(0))';
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', selector, false));

        case 3:
          el = context$2$0.sent;
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('Views'));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should allow chaining UiScrollable methods', function callee$1$0() {
    var selector, el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          selector = 'new UiScrollable(new UiSelector().scrollable(true).instance(0)).setMaxSearchSwipes(10).scrollIntoView(new UiSelector().text("Views").instance(0))';
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', selector, false));

        case 3:
          el = context$2$0.sent;
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('Views'));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should allow UiScrollable scrollIntoView', function callee$1$0() {
    var selector, el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          selector = 'new UiScrollable(new UiSelector().scrollable(true).instance(0)).scrollIntoView(new UiSelector().text("Views").instance(0));';
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', selector, false));

        case 3:
          el = context$2$0.sent;
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('Views'));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should error reasonably if a UiScrollable does not return a UiObject', function callee$1$0() {
    var selector;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          selector = 'new UiScrollable(new UiSelector().scrollable(true).instance(0)).setMaxSearchSwipes(10)';
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', selector, false).should.eventually.be.rejectedWith(/resource could not be found/));

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should allow UiScrollable with unicode string', function callee$1$0() {
    var selector, el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.startActivity('io.appium.android.apis', '.text.Unicode'));

        case 2:
          selector = 'new UiSelector().text("عربي").instance(0);';
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', selector, false));

        case 5:
          el = context$2$0.sent;
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('عربي'));

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});

// TODO: figure out why this fails with 7.1.1
//eslint-disable-line curly
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2J5LXVpYXV0b21hdG9yLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2dCQUNuQixhQUFhOzs7O3VCQUNkLGVBQWU7Ozs7QUFHeEMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixRQUFRLENBQUMsb0JBQW9CLEVBQUUsWUFBWTs7O0FBQ3pDLE1BQUksTUFBTSxZQUFBLENBQUM7QUFDWCxRQUFNLENBQUM7Ozs7QUFDTCxnQkFBTSxHQUFHLG1CQUFtQixDQUFDOzsyQ0FDdkIsTUFBTSxDQUFDLGFBQWEsc0JBQWM7Ozs7Ozs7R0FDekMsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7OzsyQ0FDRSxNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7O0dBQzdCLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyw4Q0FBOEMsRUFBRTs7Ozs7MkNBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsc0JBQXNCLEVBQUUsa0NBQWtDLEVBQUUsSUFBSSxDQUFDLENBQ3ZGLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQzs7Ozs7OztHQUM5QyxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsNERBQTRELEVBQUU7UUFDM0QsR0FBRzs7Ozs7MkNBQVMsTUFBTSxDQUNuQixXQUFXLENBQUMsc0JBQXNCLEVBQUUsdURBQXVELEVBQUUsSUFBSSxDQUFDOzs7QUFEakcsYUFBRzs7QUFFUCxhQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlCLGFBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENB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QUFNLENBQUMsV0FBVyxDQUFDLHNCQUFzQixFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUM7OztBQUF0RSxZQUFFOzsyQ0FDQSxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7Ozs7Ozs7R0FDbEUsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLHNFQUFzRSxFQUFFO1FBQ3JFLFFBQVE7Ozs7QUFBUixrQkFBUSxHQUFHLHdGQUF3Rjs7MkNBQ2pHLE1BQU0sQ0FBQyxXQUFXLENBQUMsc0JBQXNCLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUM5RCxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsNkJBQTZCLENBQUM7Ozs7Ozs7R0FDcEUsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLCtDQUErQyxFQUFFO1FBRTlDLFFBQVEsRUFDUixFQUFFOzs7OzsyQ0FGQSxNQUFNLENBQUMsYUFBYSxDQUFDLHdCQUF3QixFQUFFLGVBQWUsQ0FBQzs7O0FBQ2pFLGtCQUFRLEdBQUcsNENBQTRDOzsyQ0FDNUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDOzs7QUFBdEUsWUFBRTs7MkNBQ0EsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDOzs7Ozs7O0dBQ2pFLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvZmluZC9ieS11aWF1dG9tYXRvci1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcclxuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xyXG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLi8uLic7XHJcbmltcG9ydCBERUZBVUxUX0NBUFMgZnJvbSAnLi4vLi4vZGVzaXJlZCc7XHJcblxyXG5cclxuY2hhaS5zaG91bGQoKTtcclxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xyXG5cclxuZGVzY3JpYmUoJ0ZpbmQgLSB1aWF1dG9tYXRvcicsIGZ1bmN0aW9uICgpIHtcclxuICBsZXQgZHJpdmVyO1xyXG4gIGJlZm9yZShhc3luYyAoKSA9PiB7XHJcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xyXG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oREVGQVVMVF9DQVBTKTtcclxuICB9KTtcclxuICBhZnRlcihhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgZmluZCBlbGVtZW50cyB3aXRoIGEgYm9vbGVhbiBhcmd1bWVudCcsIGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCAnbmV3IFVpU2VsZWN0b3IoKS5jbGlja2FibGUodHJ1ZSknLCB0cnVlKVxyXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGguYXQubGVhc3QoMTApO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgZmluZCBlbGVtZW50cyB3aXRoaW4gdGhlIGNvbnRleHQgb2YgYW5vdGhlciBlbGVtZW50JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IGVscyA9IGF3YWl0IGRyaXZlclxyXG4gICAgICAuZmluZEVsT3JFbHMoJy1hbmRyb2lkIHVpYXV0b21hdG9yJywgJ25ldyBVaVNlbGVjdG9yKCkuY2xhc3NOYW1lKFwiYW5kcm9pZC53aWRnZXQuVGV4dFZpZXdcIiknLCB0cnVlKTtcclxuICAgIGVscy5sZW5ndGguc2hvdWxkLmJlLmFib3ZlKDgpO1xyXG4gICAgZWxzLmxlbmd0aC5zaG91bGQuYmUuYmVsb3coMTQpO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgZmluZCBlbGVtZW50cyB3aXRob3V0IHByZXBlbmRpbmcgXCJuZXcgVWlTZWxlY3RvcigpXCInLCBhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJy1hbmRyb2lkIHVpYXV0b21hdG9yJywgJy5jbGlja2FibGUodHJ1ZSknLCB0cnVlKVxyXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGguYXQubGVhc3QoMTApO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgZmluZCBlbGVtZW50cyB3aXRob3V0IHByZXBlbmRpbmcgXCJuZXcgVWlTZWxlY3RvcigpXCInLCBhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJy1hbmRyb2lkIHVpYXV0b21hdG9yJywgJy5jbGlja2FibGUodHJ1ZSknLCB0cnVlKVxyXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGguYXQubGVhc3QoMTApO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgZmluZCBlbGVtZW50cyB3aXRob3V0IHByZXBlbmRpbmcgXCJuZXcgVWlTZWxlY3RvcigpXCInLCBhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJy1hbmRyb2lkIHVpYXV0b21hdG9yJywgJ2NsaWNrYWJsZSh0cnVlKScsIHRydWUpXHJcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aC5hdC5sZWFzdCgxMCk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBmaW5kIGVsZW1lbnRzIHdpdGhvdXQgcHJlcGVuZGluZyBcIm5ldyBcIicsIGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCAnVWlTZWxlY3RvcigpLmNsaWNrYWJsZSh0cnVlKScsIHRydWUpXHJcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aC5hdC5sZWFzdCgxMCk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBpZ25vcmUgdHJhaWxpbmcgc2VtaWNvbG9ucycsIGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCAnbmV3IFVpU2VsZWN0b3IoKS5jbGlja2FibGUodHJ1ZSk7JywgdHJ1ZSlcclxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmhhdmUubGVuZ3RoLmF0LmxlYXN0KDEwKTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGZpbmQgYW4gZWxlbWVudCB3aXRoIGFuIGludCBhcmd1bWVudCcsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCAnbmV3IFVpU2VsZWN0b3IoKS5pbmRleCgwKScsIGZhbHNlKTtcclxuICAgIGF3YWl0IGRyaXZlci5nZXROYW1lKGVsLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdhbmRyb2lkLndpZGdldC5GcmFtZUxheW91dCcpO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgZmluZCBhbiBlbGVtZW50IHdpdGggYSBzdHJpbmcgYXJndW1lbnQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBkcml2ZXJcclxuICAgICAgLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsICduZXcgVWlTZWxlY3RvcigpLmRlc2NyaXB0aW9uKFwiQW5pbWF0aW9uXCIpJywgZmFsc2UpXHJcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5leGlzdDtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGZpbmQgYW4gZWxlbWVudCB3aXRoIGFuIG92ZXJsb2FkZWQgbWV0aG9kIGFyZ3VtZW50JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsICduZXcgVWlTZWxlY3RvcigpLmNsYXNzTmFtZShcImFuZHJvaWQud2lkZ2V0LlRleHRWaWV3XCIpJywgdHJ1ZSlcclxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmhhdmUubGVuZ3RoLmF0LmxlYXN0KDEwKTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGZpbmQgYW4gZWxlbWVudCB3aXRoIGEgQ2xhc3M8VD4gbWV0aG9kIGFyZ3VtZW50JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsICduZXcgVWlTZWxlY3RvcigpLmNsYXNzTmFtZShhbmRyb2lkLndpZGdldC5UZXh0VmlldyknLCB0cnVlKVxyXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGguYXQubGVhc3QoMTApO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgZmluZCBhbiBlbGVtZW50IHdpdGggYSBsb25nIGNoYWluIG9mIG1ldGhvZHMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJy1hbmRyb2lkIHVpYXV0b21hdG9yJywgJ25ldyBVaVNlbGVjdG9yKCkuY2xpY2thYmxlKHRydWUpLmNsYXNzTmFtZShhbmRyb2lkLndpZGdldC5UZXh0VmlldykuaW5kZXgoMSknLCBmYWxzZSk7XHJcbiAgICBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbC5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnQWNjZXNzaWJpbGl0eScpO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgZmluZCBhbiBlbGVtZW50IHdpdGggcmVjdXJzaXZlIFVpU2VsZWN0b3JzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gVE9ETzogZmlndXJlIG91dCB3aHkgdGhpcyBmYWlscyB3aXRoIDcuMS4xXHJcbiAgICBpZiAoYXdhaXQgZHJpdmVyLmFkYi5nZXRBcGlMZXZlbCgpID49IDI0KSByZXR1cm4gdGhpcy5za2lwKCk7IC8vZXNsaW50LWRpc2FibGUtbGluZSBjdXJseVxyXG5cclxuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCAnbmV3IFVpU2VsZWN0b3IoKS5jaGlsZFNlbGVjdG9yKG5ldyBVaVNlbGVjdG9yKCkuY2xpY2thYmxlKHRydWUpKS5jbGlja2FibGUodHJ1ZSknLCB0cnVlKVxyXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGgoMSk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBub3QgZmluZCBhbiBlbGVtZW50IHdpdGggYmFkIHN5bnRheCcsIGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCAnbmV3IFVpU2VsZWN0b3IoKS5jbGlja2FibGUoKHRydWUpJywgdHJ1ZSlcclxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvcmVzb3VyY2UgY291bGQgbm90IGJlIGZvdW5kLyk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBub3QgZmluZCBhbiBlbGVtZW50IHdpdGggYmFkIHN5bnRheCcsIGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCAnbmV3IFVpU2VsZWN0b3IoKS5kcmlua2FibGUodHJ1ZSknLCB0cnVlKVxyXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKC9yZXNvdXJjZSBjb3VsZCBub3QgYmUgZm91bmQvKTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIG5vdCBmaW5kIGFuIGVsZW1lbnQgd2hpY2ggZG9lcyBub3QgZXhpc3QnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJy1hbmRyb2lkIHVpYXV0b21hdG9yJywgJ25ldyBVaVNlbGVjdG9yKCkuZGVzY3JpcHRpb24oXCJjaHVja3d1ZGlcIiknLCB0cnVlKVxyXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGgoMCk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBhbGxvdyBtdWx0aXBsZSBzZWxlY3RvciBzdGF0ZW1lbnRzIGFuZCByZXR1cm4gdGhlIFVuaW9uIG9mIHRoZSB0d28gc2V0cycsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCBjbGlja2FibGUgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJy1hbmRyb2lkIHVpYXV0b21hdG9yJywgJ25ldyBVaVNlbGVjdG9yKCkuY2xpY2thYmxlKHRydWUpJywgdHJ1ZSk7XHJcbiAgICBjbGlja2FibGUubGVuZ3RoLnNob3VsZC5iZS5hYm92ZSgwKTtcclxuICAgIGxldCBub3RDbGlja2FibGUgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJy1hbmRyb2lkIHVpYXV0b21hdG9yJywgJ25ldyBVaVNlbGVjdG9yKCkuY2xpY2thYmxlKGZhbHNlKScsIHRydWUpO1xyXG4gICAgbm90Q2xpY2thYmxlLmxlbmd0aC5zaG91bGQuYmUuYWJvdmUoMCk7XHJcbiAgICBsZXQgYm90aCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCAnbmV3IFVpU2VsZWN0b3IoKS5jbGlja2FibGUodHJ1ZSk7IG5ldyBVaVNlbGVjdG9yKCkuY2xpY2thYmxlKGZhbHNlKTsnLCB0cnVlKTtcclxuICAgIGJvdGguc2hvdWxkLmhhdmUubGVuZ3RoKGNsaWNrYWJsZS5sZW5ndGggKyBub3RDbGlja2FibGUubGVuZ3RoKTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGFsbG93IG11bHRpcGxlIHNlbGVjdG9yIHN0YXRlbWVudHMgYW5kIHJldHVybiB0aGUgVW5pb24gb2YgdGhlIHR3byBzZXRzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IGNsaWNrYWJsZSA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCAnbmV3IFVpU2VsZWN0b3IoKS5jbGlja2FibGUodHJ1ZSknLCB0cnVlKTtcclxuICAgIGNsaWNrYWJsZS5sZW5ndGguc2hvdWxkLmJlLmFib3ZlKDApO1xyXG4gICAgbGV0IGNsaWNrYWJsZUNsaWNrYWJsZSA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCAnbmV3IFVpU2VsZWN0b3IoKS5jbGlja2FibGUodHJ1ZSk7IG5ldyBVaVNlbGVjdG9yKCkuY2xpY2thYmxlKHRydWUpOycsIHRydWUpO1xyXG4gICAgY2xpY2thYmxlQ2xpY2thYmxlLmxlbmd0aC5zaG91bGQuYmUuYWJvdmUoMCk7XHJcbiAgICBjbGlja2FibGVDbGlja2FibGUuc2hvdWxkLmhhdmUubGVuZ3RoKGNsaWNrYWJsZS5sZW5ndGgpO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgZmluZCBhbiBlbGVtZW50IGluIHRoZSBzZWNvbmQgc2VsZWN0b3IgaWYgdGhlIGZpcnN0IGZpbmRzIG5vIGVsZW1lbnRzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IHNlbGVjdG9yID0gJ25ldyBVaVNlbGVjdG9yKCkuY2xhc3NOYW1lKFwibm90LmEuY2xhc3NcIik7IG5ldyBVaVNlbGVjdG9yKCkuY2xhc3NOYW1lKFwiYW5kcm9pZC53aWRnZXQuVGV4dFZpZXdcIiknO1xyXG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsIHNlbGVjdG9yLCB0cnVlKVxyXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuZXhpc3Q7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBzY3JvbGwgdG8sIGFuZCByZXR1cm4gZWxlbWVudHMgdXNpbmcgVWlTY3JvbGxhYmxlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IHNlbGVjdG9yID0gJ25ldyBVaVNjcm9sbGFibGUobmV3IFVpU2VsZWN0b3IoKS5zY3JvbGxhYmxlKHRydWUpLmluc3RhbmNlKDApKS5zY3JvbGxJbnRvVmlldyhuZXcgVWlTZWxlY3RvcigpLnRleHQoXCJWaWV3c1wiKS5pbnN0YW5jZSgwKSknO1xyXG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsIHNlbGVjdG9yLCBmYWxzZSk7XHJcbiAgICBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbC5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnVmlld3MnKTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGFsbG93IGNoYWluaW5nIFVpU2Nyb2xsYWJsZSBtZXRob2RzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IHNlbGVjdG9yID0gJ25ldyBVaVNjcm9sbGFibGUobmV3IFVpU2VsZWN0b3IoKS5zY3JvbGxhYmxlKHRydWUpLmluc3RhbmNlKDApKS5zZXRNYXhTZWFyY2hTd2lwZXMoMTApLnNjcm9sbEludG9WaWV3KG5ldyBVaVNlbGVjdG9yKCkudGV4dChcIlZpZXdzXCIpLmluc3RhbmNlKDApKSc7XHJcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJy1hbmRyb2lkIHVpYXV0b21hdG9yJywgc2VsZWN0b3IsIGZhbHNlKTtcclxuICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdWaWV3cycpO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgYWxsb3cgVWlTY3JvbGxhYmxlIHNjcm9sbEludG9WaWV3JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IHNlbGVjdG9yID0gJ25ldyBVaVNjcm9sbGFibGUobmV3IFVpU2VsZWN0b3IoKS5zY3JvbGxhYmxlKHRydWUpLmluc3RhbmNlKDApKS5zY3JvbGxJbnRvVmlldyhuZXcgVWlTZWxlY3RvcigpLnRleHQoXCJWaWV3c1wiKS5pbnN0YW5jZSgwKSk7JztcclxuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCBzZWxlY3RvciwgZmFsc2UpO1xyXG4gICAgYXdhaXQgZHJpdmVyLmdldFRleHQoZWwuRUxFTUVOVCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ1ZpZXdzJyk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBlcnJvciByZWFzb25hYmx5IGlmIGEgVWlTY3JvbGxhYmxlIGRvZXMgbm90IHJldHVybiBhIFVpT2JqZWN0JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IHNlbGVjdG9yID0gJ25ldyBVaVNjcm9sbGFibGUobmV3IFVpU2VsZWN0b3IoKS5zY3JvbGxhYmxlKHRydWUpLmluc3RhbmNlKDApKS5zZXRNYXhTZWFyY2hTd2lwZXMoMTApJztcclxuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCBzZWxlY3RvciwgZmFsc2UpXHJcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL3Jlc291cmNlIGNvdWxkIG5vdCBiZSBmb3VuZC8pO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgYWxsb3cgVWlTY3JvbGxhYmxlIHdpdGggdW5pY29kZSBzdHJpbmcnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBkcml2ZXIuc3RhcnRBY3Rpdml0eSgnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcycsICcudGV4dC5Vbmljb2RlJyk7XHJcbiAgICBsZXQgc2VsZWN0b3IgPSAnbmV3IFVpU2VsZWN0b3IoKS50ZXh0KFwi2LnYsdio2YpcIikuaW5zdGFuY2UoMCk7JztcclxuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCBzZWxlY3RvciwgZmFsc2UpO1xyXG4gICAgYXdhaXQgZHJpdmVyLmdldFRleHQoZWwuRUxFTUVOVCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ9i52LHYqNmKJyk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi5cXC4uXFwuLiJ9
