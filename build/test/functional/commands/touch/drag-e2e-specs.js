'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _2 = require('../../../..');

var _3 = _interopRequireDefault(_2);

var _desired = require('../../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var caps = _lodash2['default'].defaults({
  appPackage: 'io.appium.android.apis',
  appActivity: '.view.DragAndDropDemo'
}, _desired2['default']);

describe('apidemo - touch', function () {
  var _this = this;

  var driver = undefined;
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
  afterEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.startActivity(caps.appPackage, caps.appActivity));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  describe('drag', function () {
    var _this2 = this;

    it('should drag by element', function callee$2$0() {
      var dot3, dot2, gestures, results;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'io.appium.android.apis:id/drag_dot_3', false));

          case 2:
            dot3 = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'io.appium.android.apis:id/drag_dot_2', false));

          case 5:
            dot2 = context$3$0.sent;
            gestures = [{ options: { element: dot3.ELEMENT } }, { options: { element: dot2.ELEMENT } }];
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(driver.doTouchDrag(gestures));

          case 9:
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'io.appium.android.apis:id/drag_result_text', false));

          case 11:
            results = context$3$0.sent;
            context$3$0.next = 14;
            return _regeneratorRuntime.awrap(driver.getText(results.ELEMENT).should.eventually.include('Dropped'));

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should drag by element with an offset', function callee$2$0() {
      var dot3, dot2, gestures, results;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'io.appium.android.apis:id/drag_dot_3', false));

          case 2:
            dot3 = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'io.appium.android.apis:id/drag_dot_2', false));

          case 5:
            dot2 = context$3$0.sent;
            gestures = [{ options: { element: dot3.ELEMENT, x: 5, y: 5 } }, { options: { element: dot2.ELEMENT, x: 5, y: 5 } }];
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(driver.doTouchDrag(gestures));

          case 9:
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'io.appium.android.apis:id/drag_result_text', false));

          case 11:
            results = context$3$0.sent;
            context$3$0.next = 14;
            return _regeneratorRuntime.awrap(driver.getText(results.ELEMENT).should.eventually.include('Dropped'));

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });
  describe('performTouch', function () {
    var _this3 = this;

    it('should drag by element', function callee$2$0() {
      var startEle, endEle, gestures, resultEle;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_dot_3"));

          case 2:
            startEle = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_dot_2"));

          case 5:
            endEle = context$3$0.sent;
            gestures = [{ action: "longPress", options: { element: startEle.ELEMENT } }, { action: "moveTo", options: { element: endEle.ELEMENT } }, { action: "release", options: {} }];
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(driver.performTouch(gestures));

          case 9:
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_result_text"));

          case 11:
            resultEle = context$3$0.sent;
            context$3$0.next = 14;
            return _regeneratorRuntime.awrap(driver.getText(resultEle.ELEMENT).should.eventually.equal("Dropped!"));

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this3);
    });
    it('should drag by element by offset', function callee$2$0() {
      var startEle, endEle, gestures, element3;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_dot_3"));

          case 2:
            startEle = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_dot_2"));

          case 5:
            endEle = context$3$0.sent;
            gestures = [{ action: "longPress",
              options: { element: startEle.ELEMENT, x: 5, y: 5 } }, { action: "moveTo", options: { element: endEle.ELEMENT, x: 5, y: 5 } }, { action: "release", options: {} }];
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(driver.performTouch(gestures));

          case 9:
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_result_text"));

          case 11:
            element3 = context$3$0.sent;
            context$3$0.next = 14;
            return _regeneratorRuntime.awrap(driver.getText(element3.ELEMENT).should.eventually.equal("Dropped!"));

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this3);
    });
    it('should drag by absolute position', function callee$2$0() {
      var startEle, startLoc, startSize, endEle, endLoc, endSize, gestures, resultEle;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_dot_3"));

          case 2:
            startEle = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.getLocationInView(startEle.ELEMENT));

          case 5:
            startLoc = context$3$0.sent;
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(driver.getSize(startEle.ELEMENT));

          case 8:
            startSize = context$3$0.sent;
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_dot_2"));

          case 11:
            endEle = context$3$0.sent;
            context$3$0.next = 14;
            return _regeneratorRuntime.awrap(driver.getLocationInView(endEle.ELEMENT));

          case 14:
            endLoc = context$3$0.sent;
            context$3$0.next = 17;
            return _regeneratorRuntime.awrap(driver.getSize(endEle.ELEMENT));

          case 17:
            endSize = context$3$0.sent;
            gestures = [{ action: "longPress",
              options: { x: startLoc.x + startSize.width / 2,
                y: startLoc.y + startSize.height / 2 } }, { action: "moveTo",
              options: { x: endLoc.x + endSize.width / 2,
                y: endLoc.y + endSize.height / 2 } }, { action: "release", options: {} }];
            context$3$0.next = 21;
            return _regeneratorRuntime.awrap(driver.performTouch(gestures));

          case 21:
            context$3$0.next = 23;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_result_text"));

          case 23:
            resultEle = context$3$0.sent;
            context$3$0.next = 26;
            return _regeneratorRuntime.awrap(driver.getText(resultEle.ELEMENT).should.eventually.equal("Dropped!"));

          case 26:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this3);
    });
  });
});

// reset the view by restarting the activity
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy90b3VjaC9kcmFnLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O3NCQUMvQixRQUFROzs7O2lCQUNJLGFBQWE7Ozs7dUJBQ2QsZUFBZTs7OztBQUd4QyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQUksSUFBSSxHQUFHLG9CQUFFLFFBQVEsQ0FBQztBQUNwQixZQUFVLEVBQUUsd0JBQXdCO0FBQ3BDLGFBQVcsRUFBRSx1QkFBdUI7Q0FDckMsdUJBQWUsQ0FBQzs7QUFFakIsUUFBUSxDQUFDLGlCQUFpQixFQUFFLFlBQVk7OztBQUN0QyxNQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsUUFBTSxDQUFDOzs7O0FBQ0wsZ0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7MkNBQ3ZCLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDOzs7Ozs7O0dBQ2pDLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUM3QixDQUFDLENBQUM7QUFDSCxXQUFTLENBQUM7Ozs7OzJDQUVGLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDOzs7Ozs7O0dBQzlELENBQUMsQ0FBQztBQUNILFVBQVEsQ0FBQyxNQUFNLEVBQUUsWUFBWTs7O0FBQzNCLE1BQUUsQ0FBQyx3QkFBd0IsRUFBRTtVQUN2QixJQUFJLEVBQ0osSUFBSSxFQUNKLFFBQVEsRUFNUixPQUFPOzs7Ozs2Q0FSTSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxzQ0FBc0MsRUFBRSxLQUFLLENBQUM7OztBQUFwRixnQkFBSTs7NkNBQ1MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsc0NBQXNDLEVBQUUsS0FBSyxDQUFDOzs7QUFBcEYsZ0JBQUk7QUFDSixvQkFBUSxHQUFHLENBQ2IsRUFBQyxPQUFPLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBQyxFQUFDLEVBQ2xDLEVBQUMsT0FBTyxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUMsRUFBQyxDQUNuQzs7NkNBQ0ssTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7Ozs7NkNBRWQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsNENBQTRDLEVBQUUsS0FBSyxDQUFDOzs7QUFBN0YsbUJBQU87OzZDQUNMLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQzs7Ozs7OztLQUMzRSxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsdUNBQXVDLEVBQUU7VUFDdEMsSUFBSSxFQUNKLElBQUksRUFDSixRQUFRLEVBS1IsT0FBTzs7Ozs7NkNBUE0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsc0NBQXNDLEVBQUUsS0FBSyxDQUFDOzs7QUFBcEYsZ0JBQUk7OzZDQUNTLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLHNDQUFzQyxFQUFFLEtBQUssQ0FBQzs7O0FBQXBGLGdCQUFJO0FBQ0osb0JBQVEsR0FBRyxDQUNiLEVBQUMsT0FBTyxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFDOUMsRUFBQyxPQUFPLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsRUFBQyxDQUMvQzs7NkNBQ0ssTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7Ozs7NkNBQ2QsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsNENBQTRDLEVBQUUsS0FBSyxDQUFDOzs7QUFBN0YsbUJBQU87OzZDQUNMLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQzs7Ozs7OztLQUMzRSxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsY0FBYyxFQUFFLFlBQVk7OztBQUNuQyxNQUFFLENBQUMsd0JBQXdCLEVBQUU7VUFDdkIsUUFBUSxFQUNSLE1BQU0sRUFDTixRQUFRLEVBSVIsU0FBUzs7Ozs7NkNBTlEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsc0NBQXNDLENBQUM7OztBQUFqRixvQkFBUTs7NkNBQ08sTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsc0NBQXNDLENBQUM7OztBQUEvRSxrQkFBTTtBQUNOLG9CQUFRLEdBQUcsQ0FBQyxFQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLEVBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPLEVBQUMsRUFBQyxFQUMzRCxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUMsRUFBQyxFQUN0RCxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBQyxDQUFDOzs2Q0FDM0MsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7Ozs7NkNBQ2IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsNENBQTRDLENBQUM7OztBQUF4RixxQkFBUzs7NkNBQ1AsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDOzs7Ozs7O0tBQzVFLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyxrQ0FBa0MsRUFBRTtVQUNqQyxRQUFRLEVBQ1IsTUFBTSxFQUNOLFFBQVEsRUFNUixRQUFROzs7Ozs2Q0FSUyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxzQ0FBc0MsQ0FBQzs7O0FBQWpGLG9CQUFROzs2Q0FDTyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxzQ0FBc0MsQ0FBQzs7O0FBQS9FLGtCQUFNO0FBQ04sb0JBQVEsR0FBRyxDQUFDLEVBQUMsTUFBTSxFQUFFLFdBQVc7QUFDbkIscUJBQU8sRUFBRSxFQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQ2xELEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQzFCLEVBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFDdEMsRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUMsQ0FBQzs7NkNBQzNDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDOzs7OzZDQUNkLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLDRDQUE0QyxDQUFDOzs7QUFBdkYsb0JBQVE7OzZDQUNOLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQzs7Ozs7OztLQUMzRSxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsa0NBQWtDLEVBQUU7VUFDakMsUUFBUSxFQUNSLFFBQVEsRUFDUixTQUFTLEVBQ1QsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsUUFBUSxFQVFSLFNBQVM7Ozs7OzZDQWRRLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLHNDQUFzQyxDQUFDOzs7QUFBakYsb0JBQVE7OzZDQUNTLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDOzs7QUFBM0Qsb0JBQVE7OzZDQUNVLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQzs7O0FBQWxELHFCQUFTOzs2Q0FDTSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxzQ0FBc0MsQ0FBQzs7O0FBQS9FLGtCQUFNOzs2Q0FDUyxNQUFNLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQzs7O0FBQXZELGtCQUFNOzs2Q0FDVSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7OztBQUE5QyxtQkFBTztBQUNQLG9CQUFRLEdBQUcsQ0FBQyxFQUFDLE1BQU0sRUFBRSxXQUFXO0FBQ25CLHFCQUFPLEVBQUUsRUFBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsR0FBSSxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsQUFBQztBQUNyQyxpQkFBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEFBQUMsRUFBQyxFQUFDLEVBQ25ELEVBQUMsTUFBTSxFQUFFLFFBQVE7QUFDaEIscUJBQU8sRUFBRSxFQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFJLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxBQUFDO0FBQ2pDLGlCQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQUFBQyxFQUFDLEVBQUMsRUFDL0MsRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUMsQ0FBQzs7NkNBQzNDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDOzs7OzZDQUNiLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLDRDQUE0QyxDQUFDOzs7QUFBeEYscUJBQVM7OzZDQUNQLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQzs7Ozs7OztLQUM1RSxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL3RvdWNoL2RyYWctZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XHJcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4vLi4nO1xyXG5pbXBvcnQgREVGQVVMVF9DQVBTIGZyb20gJy4uLy4uL2Rlc2lyZWQnO1xyXG5cclxuXHJcbmNoYWkuc2hvdWxkKCk7XHJcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcclxuXHJcbmxldCBjYXBzID0gXy5kZWZhdWx0cyh7XHJcbiAgYXBwUGFja2FnZTogJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnLFxyXG4gIGFwcEFjdGl2aXR5OiAnLnZpZXcuRHJhZ0FuZERyb3BEZW1vJ1xyXG59LCBERUZBVUxUX0NBUFMpO1xyXG5cclxuZGVzY3JpYmUoJ2FwaWRlbW8gLSB0b3VjaCcsIGZ1bmN0aW9uICgpIHtcclxuICBsZXQgZHJpdmVyO1xyXG4gIGJlZm9yZShhc3luYyAoKSA9PiB7XHJcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xyXG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XHJcbiAgfSk7XHJcbiAgYWZ0ZXIoYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcclxuICB9KTtcclxuICBhZnRlckVhY2goYXN5bmMgKCkgPT4ge1xyXG4gICAgLy8gcmVzZXQgdGhlIHZpZXcgYnkgcmVzdGFydGluZyB0aGUgYWN0aXZpdHlcclxuICAgIGF3YWl0IGRyaXZlci5zdGFydEFjdGl2aXR5KGNhcHMuYXBwUGFja2FnZSwgY2Fwcy5hcHBBY3Rpdml0eSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ2RyYWcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpdCgnc2hvdWxkIGRyYWcgYnkgZWxlbWVudCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IGRvdDMgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2lkJywgJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXM6aWQvZHJhZ19kb3RfMycsIGZhbHNlKTtcclxuICAgICAgbGV0IGRvdDIgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2lkJywgJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXM6aWQvZHJhZ19kb3RfMicsIGZhbHNlKTtcclxuICAgICAgbGV0IGdlc3R1cmVzID0gW1xyXG4gICAgICAgIHtvcHRpb25zOiB7ZWxlbWVudDogZG90My5FTEVNRU5UfX0sXHJcbiAgICAgICAge29wdGlvbnM6IHtlbGVtZW50OiBkb3QyLkVMRU1FTlR9fVxyXG4gICAgICBdO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZG9Ub3VjaERyYWcoZ2VzdHVyZXMpO1xyXG5cclxuICAgICAgbGV0IHJlc3VsdHMgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2lkJywgJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXM6aWQvZHJhZ19yZXN1bHRfdGV4dCcsIGZhbHNlKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdldFRleHQocmVzdWx0cy5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5pbmNsdWRlKCdEcm9wcGVkJyk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgZHJhZyBieSBlbGVtZW50IHdpdGggYW4gb2Zmc2V0JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgZG90MyA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnaWQnLCAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpczppZC9kcmFnX2RvdF8zJywgZmFsc2UpO1xyXG4gICAgICBsZXQgZG90MiA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnaWQnLCAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpczppZC9kcmFnX2RvdF8yJywgZmFsc2UpO1xyXG4gICAgICBsZXQgZ2VzdHVyZXMgPSBbXHJcbiAgICAgICAge29wdGlvbnM6IHtlbGVtZW50OiBkb3QzLkVMRU1FTlQsIHg6IDUsIHk6IDV9fSxcclxuICAgICAgICB7b3B0aW9uczoge2VsZW1lbnQ6IGRvdDIuRUxFTUVOVCwgeDogNSwgeTogNX19XHJcbiAgICAgIF07XHJcbiAgICAgIGF3YWl0IGRyaXZlci5kb1RvdWNoRHJhZyhnZXN0dXJlcyk7XHJcbiAgICAgIGxldCByZXN1bHRzID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdpZCcsICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzOmlkL2RyYWdfcmVzdWx0X3RleHQnLCBmYWxzZSk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KHJlc3VsdHMuRUxFTUVOVCkuc2hvdWxkLmV2ZW50dWFsbHkuaW5jbHVkZSgnRHJvcHBlZCcpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ3BlcmZvcm1Ub3VjaCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIGl0KCdzaG91bGQgZHJhZyBieSBlbGVtZW50JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgc3RhcnRFbGUgPSBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnQoXCJpZFwiLCBcImlvLmFwcGl1bS5hbmRyb2lkLmFwaXM6aWQvZHJhZ19kb3RfM1wiKTtcclxuICAgICAgbGV0IGVuZEVsZSA9IGF3YWl0IGRyaXZlci5maW5kRWxlbWVudChcImlkXCIsIFwiaW8uYXBwaXVtLmFuZHJvaWQuYXBpczppZC9kcmFnX2RvdF8yXCIpO1xyXG4gICAgICBsZXQgZ2VzdHVyZXMgPSBbe2FjdGlvbjogXCJsb25nUHJlc3NcIiwgb3B0aW9uczoge2VsZW1lbnQ6IHN0YXJ0RWxlLkVMRU1FTlR9fSxcclxuICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246IFwibW92ZVRvXCIsIG9wdGlvbnM6IHtlbGVtZW50OiBlbmRFbGUuRUxFTUVOVH19LFxyXG4gICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjogXCJyZWxlYXNlXCIsIG9wdGlvbnM6IHt9fV07XHJcbiAgICAgIGF3YWl0IGRyaXZlci5wZXJmb3JtVG91Y2goZ2VzdHVyZXMpO1xyXG4gICAgICBsZXQgcmVzdWx0RWxlID0gYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50KFwiaWRcIiwgXCJpby5hcHBpdW0uYW5kcm9pZC5hcGlzOmlkL2RyYWdfcmVzdWx0X3RleHRcIik7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KHJlc3VsdEVsZS5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbChcIkRyb3BwZWQhXCIpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGRyYWcgYnkgZWxlbWVudCBieSBvZmZzZXQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGxldCBzdGFydEVsZSA9IGF3YWl0IGRyaXZlci5maW5kRWxlbWVudChcImlkXCIsIFwiaW8uYXBwaXVtLmFuZHJvaWQuYXBpczppZC9kcmFnX2RvdF8zXCIpO1xyXG4gICAgICBsZXQgZW5kRWxlID0gYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50KFwiaWRcIiwgXCJpby5hcHBpdW0uYW5kcm9pZC5hcGlzOmlkL2RyYWdfZG90XzJcIik7XHJcbiAgICAgIGxldCBnZXN0dXJlcyA9IFt7YWN0aW9uOiBcImxvbmdQcmVzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtlbGVtZW50OiBzdGFydEVsZS5FTEVNRU5ULCB4OiA1LCB5OiA1fX0sXHJcbiAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOiBcIm1vdmVUb1wiLCBvcHRpb25zOlxyXG4gICAgICAgICAgICAgICAgICAgICAge2VsZW1lbnQ6IGVuZEVsZS5FTEVNRU5ULCB4OiA1LCB5OiA1fX0sXHJcbiAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOiBcInJlbGVhc2VcIiwgb3B0aW9uczoge319XTtcclxuICAgICAgYXdhaXQgZHJpdmVyLnBlcmZvcm1Ub3VjaChnZXN0dXJlcyk7XHJcbiAgICAgIGxldCBlbGVtZW50MyA9IGF3YWl0IGRyaXZlci5maW5kRWxlbWVudChcImlkXCIsIFwiaW8uYXBwaXVtLmFuZHJvaWQuYXBpczppZC9kcmFnX3Jlc3VsdF90ZXh0XCIpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbGVtZW50My5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbChcIkRyb3BwZWQhXCIpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGRyYWcgYnkgYWJzb2x1dGUgcG9zaXRpb24nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGxldCBzdGFydEVsZSA9IGF3YWl0IGRyaXZlci5maW5kRWxlbWVudChcImlkXCIsIFwiaW8uYXBwaXVtLmFuZHJvaWQuYXBpczppZC9kcmFnX2RvdF8zXCIpO1xyXG4gICAgICBsZXQgc3RhcnRMb2MgPSBhd2FpdCBkcml2ZXIuZ2V0TG9jYXRpb25JblZpZXcoc3RhcnRFbGUuRUxFTUVOVCk7XHJcbiAgICAgIGxldCBzdGFydFNpemUgPSBhd2FpdCBkcml2ZXIuZ2V0U2l6ZShzdGFydEVsZS5FTEVNRU5UKTtcclxuICAgICAgbGV0IGVuZEVsZSA9IGF3YWl0IGRyaXZlci5maW5kRWxlbWVudChcImlkXCIsIFwiaW8uYXBwaXVtLmFuZHJvaWQuYXBpczppZC9kcmFnX2RvdF8yXCIpO1xyXG4gICAgICBsZXQgZW5kTG9jID0gYXdhaXQgZHJpdmVyLmdldExvY2F0aW9uSW5WaWV3KGVuZEVsZS5FTEVNRU5UKTtcclxuICAgICAgbGV0IGVuZFNpemUgPSBhd2FpdCBkcml2ZXIuZ2V0U2l6ZShlbmRFbGUuRUxFTUVOVCk7XHJcbiAgICAgIGxldCBnZXN0dXJlcyA9IFt7YWN0aW9uOiBcImxvbmdQcmVzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHt4OiBzdGFydExvYy54ICsgKHN0YXJ0U2l6ZS53aWR0aCAvIDIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBzdGFydExvYy55ICsgKHN0YXJ0U2l6ZS5oZWlnaHQgLyAyKX19LFxyXG4gICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjogXCJtb3ZlVG9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7eDogZW5kTG9jLnggKyAoZW5kU2l6ZS53aWR0aCAvIDIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBlbmRMb2MueSArIChlbmRTaXplLmhlaWdodCAvIDIpfX0sXHJcbiAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOiBcInJlbGVhc2VcIiwgb3B0aW9uczoge319XTtcclxuICAgICAgYXdhaXQgZHJpdmVyLnBlcmZvcm1Ub3VjaChnZXN0dXJlcyk7XHJcbiAgICAgIGxldCByZXN1bHRFbGUgPSBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnQoXCJpZFwiLCBcImlvLmFwcGl1bS5hbmRyb2lkLmFwaXM6aWQvZHJhZ19yZXN1bHRfdGV4dFwiKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdldFRleHQocmVzdWx0RWxlLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKFwiRHJvcHBlZCFcIik7XHJcbiAgICB9KTtcclxuICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLlxcLi5cXC4uIn0=
