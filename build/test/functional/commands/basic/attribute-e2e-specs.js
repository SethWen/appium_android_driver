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

describe('apidemo - attributes', function () {
  var _this = this;

  var driver = undefined;
  var animationEl = undefined;

  before(function callee$1$0() {
    var animation;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _2['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(_desired2['default']));

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.findElOrEls('accessibility id', 'Animation', false));

        case 5:
          animation = context$2$0.sent;

          animationEl = animation.ELEMENT;

        case 7:
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
  it('should be able to find resourceId attribute', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getAttribute('resourceId', animationEl).should.eventually.become('android:id/text1'));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to find text attribute', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getAttribute('text', animationEl).should.eventually.become('Animation'));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to find name attribute', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getAttribute('name', animationEl).should.eventually.become('Animation'));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to find name attribute, falling back to text', function callee$1$0() {
    var textView, textViewEl;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.click(animationEl));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.TextView', true));

        case 4:
          textView = context$2$0.sent;
          textViewEl = textView[1].ELEMENT;
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.getAttribute('name', textViewEl).should.eventually.become('Bouncing Balls'));

        case 8:
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(driver.back());

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to find content description attribute', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getAttribute('contentDescription', animationEl).should.eventually.become("Animation"));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to find displayed attribute', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getAttribute('displayed', animationEl).should.eventually.become('true'));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to find displayed attribute through normal func', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementDisplayed(animationEl).should.eventually.become(true));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to get element location using getLocation', function callee$1$0() {
    var location;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getLocation(animationEl));

        case 2:
          location = context$2$0.sent;

          location.x.should.be.at.least(0);
          location.y.should.be.at.least(0);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to get element location using getLocationInView', function callee$1$0() {
    var location;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getLocationInView(animationEl));

        case 2:
          location = context$2$0.sent;

          location.x.should.be.at.least(0);
          location.y.should.be.at.least(0);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to get element size', function callee$1$0() {
    var size;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getSize(animationEl));

        case 2:
          size = context$2$0.sent;

          size.width.should.be.at.least(0);
          size.height.should.be.at.least(0);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9iYXNpYy9hdHRyaWJ1dGUtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ25CLGFBQWE7Ozs7dUJBQ2QsZUFBZTs7OztBQUd4QyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxZQUFZOzs7QUFDM0MsTUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLE1BQUksV0FBVyxZQUFBLENBQUM7O0FBRWhCLFFBQU0sQ0FBQztRQUdELFNBQVM7Ozs7QUFGYixnQkFBTSxHQUFHLG1CQUFtQixDQUFDOzsyQ0FDdkIsTUFBTSxDQUFDLGFBQWEsc0JBQWM7Ozs7MkNBQ2xCLE1BQU0sQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQzs7O0FBQTVFLG1CQUFTOztBQUNiLHFCQUFXLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQzs7Ozs7OztHQUNqQyxDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLDZDQUE2QyxFQUFFOzs7OzsyQ0FDMUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUM7Ozs7Ozs7R0FDbEcsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLHVDQUF1QyxFQUFFOzs7OzsyQ0FDcEMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDOzs7Ozs7O0dBQ3JGLENBQUMsQ0FBQztBQUNILElB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YW5kcy9iYXNpYy9hdHRyaWJ1dGUtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XHJcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcclxuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4vLi4nO1xyXG5pbXBvcnQgREVGQVVMVF9DQVBTIGZyb20gJy4uLy4uL2Rlc2lyZWQnO1xyXG5cclxuXHJcbmNoYWkuc2hvdWxkKCk7XHJcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcclxuXHJcbmRlc2NyaWJlKCdhcGlkZW1vIC0gYXR0cmlidXRlcycsIGZ1bmN0aW9uICgpIHtcclxuICBsZXQgZHJpdmVyO1xyXG4gIGxldCBhbmltYXRpb25FbDtcclxuXHJcbiAgYmVmb3JlKGFzeW5jICgpID0+IHtcclxuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XHJcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihERUZBVUxUX0NBUFMpO1xyXG4gICAgbGV0IGFuaW1hdGlvbiA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnYWNjZXNzaWJpbGl0eSBpZCcsICdBbmltYXRpb24nLCBmYWxzZSk7XHJcbiAgICBhbmltYXRpb25FbCA9IGFuaW1hdGlvbi5FTEVNRU5UO1xyXG4gIH0pO1xyXG4gIGFmdGVyKGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGZpbmQgcmVzb3VyY2VJZCBhdHRyaWJ1dGUnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBkcml2ZXIuZ2V0QXR0cmlidXRlKCdyZXNvdXJjZUlkJywgYW5pbWF0aW9uRWwpLnNob3VsZC5ldmVudHVhbGx5LmJlY29tZSgnYW5kcm9pZDppZC90ZXh0MScpO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBmaW5kIHRleHQgYXR0cmlidXRlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgZHJpdmVyLmdldEF0dHJpYnV0ZSgndGV4dCcsIGFuaW1hdGlvbkVsKS5zaG91bGQuZXZlbnR1YWxseS5iZWNvbWUoJ0FuaW1hdGlvbicpO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBmaW5kIG5hbWUgYXR0cmlidXRlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgZHJpdmVyLmdldEF0dHJpYnV0ZSgnbmFtZScsIGFuaW1hdGlvbkVsKS5zaG91bGQuZXZlbnR1YWxseS5iZWNvbWUoJ0FuaW1hdGlvbicpO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBmaW5kIG5hbWUgYXR0cmlidXRlLCBmYWxsaW5nIGJhY2sgdG8gdGV4dCcsIGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGRyaXZlci5jbGljayhhbmltYXRpb25FbCk7XHJcbiAgICBsZXQgdGV4dFZpZXcgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2NsYXNzIG5hbWUnLCAnYW5kcm9pZC53aWRnZXQuVGV4dFZpZXcnLCB0cnVlKTtcclxuICAgIGxldCB0ZXh0Vmlld0VsID0gdGV4dFZpZXdbMV0uRUxFTUVOVDtcclxuICAgIGF3YWl0IGRyaXZlci5nZXRBdHRyaWJ1dGUoJ25hbWUnLCB0ZXh0Vmlld0VsKS5zaG91bGQuZXZlbnR1YWxseS5iZWNvbWUoJ0JvdW5jaW5nIEJhbGxzJyk7XHJcbiAgICBhd2FpdCBkcml2ZXIuYmFjaygpO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBmaW5kIGNvbnRlbnQgZGVzY3JpcHRpb24gYXR0cmlidXRlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgZHJpdmVyLmdldEF0dHJpYnV0ZSgnY29udGVudERlc2NyaXB0aW9uJywgYW5pbWF0aW9uRWwpLnNob3VsZC5ldmVudHVhbGx5LmJlY29tZShcIkFuaW1hdGlvblwiKTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gZmluZCBkaXNwbGF5ZWQgYXR0cmlidXRlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgZHJpdmVyLmdldEF0dHJpYnV0ZSgnZGlzcGxheWVkJywgYW5pbWF0aW9uRWwpLnNob3VsZC5ldmVudHVhbGx5LmJlY29tZSgndHJ1ZScpO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBmaW5kIGRpc3BsYXllZCBhdHRyaWJ1dGUgdGhyb3VnaCBub3JtYWwgZnVuYycsIGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGRyaXZlci5lbGVtZW50RGlzcGxheWVkKGFuaW1hdGlvbkVsKS5zaG91bGQuZXZlbnR1YWxseS5iZWNvbWUodHJ1ZSk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGdldCBlbGVtZW50IGxvY2F0aW9uIHVzaW5nIGdldExvY2F0aW9uJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IGxvY2F0aW9uID0gYXdhaXQgZHJpdmVyLmdldExvY2F0aW9uKGFuaW1hdGlvbkVsKTtcclxuICAgIGxvY2F0aW9uLnguc2hvdWxkLmJlLmF0LmxlYXN0KDApO1xyXG4gICAgbG9jYXRpb24ueS5zaG91bGQuYmUuYXQubGVhc3QoMCk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGdldCBlbGVtZW50IGxvY2F0aW9uIHVzaW5nIGdldExvY2F0aW9uSW5WaWV3JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IGxvY2F0aW9uID0gYXdhaXQgZHJpdmVyLmdldExvY2F0aW9uSW5WaWV3KGFuaW1hdGlvbkVsKTtcclxuICAgIGxvY2F0aW9uLnguc2hvdWxkLmJlLmF0LmxlYXN0KDApO1xyXG4gICAgbG9jYXRpb24ueS5zaG91bGQuYmUuYXQubGVhc3QoMCk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGdldCBlbGVtZW50IHNpemUnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQgc2l6ZSA9IGF3YWl0IGRyaXZlci5nZXRTaXplKGFuaW1hdGlvbkVsKTtcclxuICAgIHNpemUud2lkdGguc2hvdWxkLmJlLmF0LmxlYXN0KDApO1xyXG4gICAgc2l6ZS5oZWlnaHQuc2hvdWxkLmJlLmF0LmxlYXN0KDApO1xyXG4gIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uXFwuLlxcLi4ifQ==
