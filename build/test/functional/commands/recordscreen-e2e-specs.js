'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _2 = require('../../..');

var _3 = _interopRequireDefault(_2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _desired = require('../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var caps = _lodash2['default'].defaults({
  appPackage: 'io.appium.android.apis',
  appActivity: '.view.TextFields'
}, _desired2['default']);

describe('recording the screen', function () {
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

  it('should start and stop recording the screen', function callee$1$0() {
    var remoteFile, el, text;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.isEmulator());

        case 2:
          context$2$0.t0 = context$2$0.sent;

          if (context$2$0.t0) {
            context$2$0.next = 8;
            break;
          }

          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.adb.getApiLevel());

        case 6:
          context$2$0.t1 = context$2$0.sent;
          context$2$0.t0 = context$2$0.t1 < 19;

        case 8:
          if (!context$2$0.t0) {
            context$2$0.next = 10;
            break;
          }

          return context$2$0.abrupt('return', this.skip());

        case 10:
          remoteFile = '/sdcard/test.mp4';
          context$2$0.next = 13;
          return _regeneratorRuntime.awrap(driver.adb.fileExists(remoteFile));

        case 13:
          if (!context$2$0.sent) {
            context$2$0.next = 16;
            break;
          }

          context$2$0.next = 16;
          return _regeneratorRuntime.awrap(driver.adb.shell(['rm', remoteFile]));

        case 16:
          context$2$0.next = 18;
          return _regeneratorRuntime.awrap(driver.startRecordingScreen(remoteFile));

        case 18:
          context$2$0.next = 20;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.EditText', false));

        case 20:
          el = context$2$0.sent;

          el = el.ELEMENT;
          context$2$0.next = 24;
          return _regeneratorRuntime.awrap(driver.setValue('Recording the screen!', el));

        case 24:
          context$2$0.next = 26;
          return _regeneratorRuntime.awrap(driver.getText(el));

        case 26:
          text = context$2$0.sent;

          text.should.eql('Recording the screen!');

          context$2$0.next = 30;
          return _regeneratorRuntime.awrap(driver.stopRecordingScreen());

        case 30:
          context$2$0.next = 32;
          return _regeneratorRuntime.awrap(driver.adb.fileExists(remoteFile));

        case 32:
          context$2$0.sent.should.be['true'];

        case 33:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});

// make sure we don't already have the file on the device

// do some interacting, to take some time
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9yZWNvcmRzY3JlZW4tZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztpQkFDbkIsVUFBVTs7OztzQkFDdEIsUUFBUTs7Ozt1QkFDRyxZQUFZOzs7O0FBR3JDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLElBQUksSUFBSSxHQUFHLG9CQUFFLFFBQVEsQ0FBQztBQUNwQixZQUFVLEVBQUUsd0JBQXdCO0FBQ3BDLGFBQVcsRUFBRSxrQkFBa0I7Q0FDaEMsdUJBQWUsQ0FBQzs7QUFFakIsUUFBUSxDQUFDLHNCQUFzQixFQUFFLFlBQU07QUFDckMsUUFBTSxDQUFDOzs7O0FBQ0wsZ0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7MkNBQ3ZCLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDOzs7Ozs7O0dBQ2pDLENBQUMsQ0FBQzs7QUFFSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDOztBQUVILElBQUUsQ0FBQyw0Q0FBNEMsRUFBRTtRQUszQyxVQUFVLEVBVVYsRUFBRSxFQUdGLElBQUk7Ozs7OzJDQWpCRSxNQUFNLENBQUMsVUFBVSxFQUFFOzs7Ozs7Ozs7OzsyQ0FBVSxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRTs7Ozs0Q0FBRyxFQUFFOzs7Ozs7Ozs4Q0FDM0QsSUFBSSxDQUFDLElBQUksRUFBRTs7O0FBR2hCLG9CQUFVLEdBQUcsa0JBQWtCOzsyQ0FHekIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDOzs7Ozs7Ozs7MkNBQ25DLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDOzs7OzJDQUd0QyxNQUFNLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDOzs7OzJDQUc5QixNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSx5QkFBeUIsRUFBRSxLQUFLLENBQUM7OztBQUE3RSxZQUFFOztBQUNOLFlBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDOzsyQ0FDVixNQUFNLENBQUMsUUFBUSxDQUFDLHVCQUF1QixFQUFFLEVBQUUsQ0FBQzs7OzsyQ0FDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7OztBQUEvQixjQUFJOztBQUNSLGNBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7OzsyQ0FFbkMsTUFBTSxDQUFDLG1CQUFtQixFQUFFOzs7OzJDQUUzQixNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7OzsyQkFBRSxNQUFNLENBQUMsRUFBRTs7Ozs7OztHQUNwRCxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL3JlY29yZHNjcmVlbi1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcclxuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xyXG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLic7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCBERUZBVUxUX0NBUFMgZnJvbSAnLi4vZGVzaXJlZCc7XHJcblxyXG5cclxuY2hhaS5zaG91bGQoKTtcclxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xyXG5cclxubGV0IGRyaXZlcjtcclxubGV0IGNhcHMgPSBfLmRlZmF1bHRzKHtcclxuICBhcHBQYWNrYWdlOiAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcycsXHJcbiAgYXBwQWN0aXZpdHk6ICcudmlldy5UZXh0RmllbGRzJ1xyXG59LCBERUZBVUxUX0NBUFMpO1xyXG5cclxuZGVzY3JpYmUoJ3JlY29yZGluZyB0aGUgc2NyZWVuJywgKCkgPT4ge1xyXG4gIGJlZm9yZShhc3luYyAoKSA9PiB7XHJcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xyXG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XHJcbiAgfSk7XHJcblxyXG4gIGFmdGVyKGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XHJcbiAgfSk7XHJcblxyXG4gIGl0KCdzaG91bGQgc3RhcnQgYW5kIHN0b3AgcmVjb3JkaW5nIHRoZSBzY3JlZW4nLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoYXdhaXQgZHJpdmVyLmlzRW11bGF0b3IoKSB8fCBhd2FpdCBkcml2ZXIuYWRiLmdldEFwaUxldmVsKCkgPCAxOSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5za2lwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJlbW90ZUZpbGUgPSAnL3NkY2FyZC90ZXN0Lm1wNCc7XHJcblxyXG4gICAgLy8gbWFrZSBzdXJlIHdlIGRvbid0IGFscmVhZHkgaGF2ZSB0aGUgZmlsZSBvbiB0aGUgZGV2aWNlXHJcbiAgICBpZiAoYXdhaXQgZHJpdmVyLmFkYi5maWxlRXhpc3RzKHJlbW90ZUZpbGUpKSB7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5hZGIuc2hlbGwoWydybScsIHJlbW90ZUZpbGVdKTtcclxuICAgIH1cclxuXHJcbiAgICBhd2FpdCBkcml2ZXIuc3RhcnRSZWNvcmRpbmdTY3JlZW4ocmVtb3RlRmlsZSk7XHJcblxyXG4gICAgLy8gZG8gc29tZSBpbnRlcmFjdGluZywgdG8gdGFrZSBzb21lIHRpbWVcclxuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnY2xhc3MgbmFtZScsICdhbmRyb2lkLndpZGdldC5FZGl0VGV4dCcsIGZhbHNlKTtcclxuICAgIGVsID0gZWwuRUxFTUVOVDtcclxuICAgIGF3YWl0IGRyaXZlci5zZXRWYWx1ZSgnUmVjb3JkaW5nIHRoZSBzY3JlZW4hJywgZWwpO1xyXG4gICAgbGV0IHRleHQgPSBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbCk7XHJcbiAgICB0ZXh0LnNob3VsZC5lcWwoJ1JlY29yZGluZyB0aGUgc2NyZWVuIScpO1xyXG5cclxuICAgIGF3YWl0IGRyaXZlci5zdG9wUmVjb3JkaW5nU2NyZWVuKCk7XHJcblxyXG4gICAgKGF3YWl0IGRyaXZlci5hZGIuZmlsZUV4aXN0cyhyZW1vdGVGaWxlKSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi5cXC4uIn0=
