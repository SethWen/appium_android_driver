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

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('general', function () {
  var driver = undefined;
  describe('startActivity', function () {
    var _this = this;

    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(_desired.DEFAULT_CAPS));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    after(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should launch a new package and activity', function callee$2$0() {
      var _ref, appPackage, appActivity, startAppPackage, startAppActivity, _ref2, newAppPackage, newAppActivity;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

          case 2:
            _ref = context$3$0.sent;
            appPackage = _ref.appPackage;
            appActivity = _ref.appActivity;

            appPackage.should.equal('io.appium.android.apis');
            appActivity.should.equal('.ApiDemos');

            startAppPackage = 'io.appium.android.apis';
            startAppActivity = '.view.SplitTouchView';
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(driver.startActivity(startAppPackage, startAppActivity));

          case 11:
            context$3$0.next = 13;
            return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

          case 13:
            _ref2 = context$3$0.sent;
            newAppPackage = _ref2.appPackage;
            newAppActivity = _ref2.appActivity;

            newAppPackage.should.equal(startAppPackage);
            newAppActivity.should.equal(startAppActivity);

          case 18:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to launch activity with custom intent parameter category', function callee$2$0() {
      var startAppPackage, startAppActivity, startIntentCategory, _ref3, appActivity;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            startAppPackage = 'io.appium.android.apis';
            startAppActivity = 'io.appium.android.apis.app.HelloWorld';
            startIntentCategory = 'appium.android.intent.category.SAMPLE_CODE';
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.startActivity(startAppPackage, startAppActivity, undefined, undefined, startIntentCategory));

          case 5:
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

          case 7:
            _ref3 = context$3$0.sent;
            appActivity = _ref3.appActivity;

            appActivity.should.include('HelloWorld');

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to launch activity with dontStopAppOnReset = true', function callee$2$0() {
      var startAppPackage, startAppActivity, _ref4, appPackage, appActivity;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            startAppPackage = 'io.appium.android.apis';
            startAppActivity = '.os.MorseCode';
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.startActivity(startAppPackage, startAppActivity, startAppPackage, startAppActivity, undefined, undefined, undefined, undefined, true));

          case 4:
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

          case 6:
            _ref4 = context$3$0.sent;
            appPackage = _ref4.appPackage;
            appActivity = _ref4.appActivity;

            appPackage.should.equal(startAppPackage);
            appActivity.should.equal(startAppActivity);

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to launch activity with dontStopAppOnReset = false', function callee$2$0() {
      var startAppPackage, startAppActivity, _ref5, appPackage, appActivity;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            startAppPackage = 'io.appium.android.apis';
            startAppActivity = '.os.MorseCode';
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.startActivity(startAppPackage, startAppActivity, startAppPackage, startAppActivity, undefined, undefined, undefined, undefined, false));

          case 4:
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

          case 6:
            _ref5 = context$3$0.sent;
            appPackage = _ref5.appPackage;
            appActivity = _ref5.appActivity;

            appPackage.should.equal(startAppPackage);
            appActivity.should.equal(startAppActivity);

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('getStrings', function () {
    var _this2 = this;

    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(_desired.CONTACT_MANAGER_CAPS));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    after(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });

    it('should return app strings', function callee$2$0() {
      var strings;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.getStrings('en'));

          case 2:
            strings = context$3$0.sent;

            strings.save.should.equal('Save');

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should return app strings for the device language', function callee$2$0() {
      var strings;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.getStrings());

          case 2:
            strings = context$3$0.sent;

            strings.save.should.equal('Save');

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9iYXNpYy9nZW5lcmFsLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2dCQUNuQixhQUFhOzs7O3VCQUNZLGVBQWU7O0FBR2xFLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLFNBQVMsRUFBRSxZQUFZO0FBQzlCLE1BQUksTUFBTSxZQUFBLENBQUM7QUFDWCxVQUFRLENBQUMsZUFBZSxFQUFFLFlBQVk7OztBQUNwQyxVQUFNLENBQUM7Ozs7QUFDTCxrQkFBTSxHQUFHLG1CQUFtQixDQUFDOzs2Q0FDdkIsTUFBTSxDQUFDLGFBQWEsdUJBQWM7Ozs7Ozs7S0FDekMsQ0FBQyxDQUFDO0FBQ0gsU0FBSyxDQUFDOzs7Ozs2Q0FDRSxNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7O0tBQzdCLENBQUMsQ0FBQzs7QUFFSCxNQUFFLENBQUMsMENBQTBDLEVBQUU7Z0JBQ3hDLFVBQVUsRUFBRSxXQUFXLEVBSXhCLGVBQWUsRUFDZixnQkFBZ0IsU0FJSCxhQUFhLEVBQWUsY0FBYzs7Ozs7OzZDQVRyQixNQUFNLENBQUMsR0FBRyxDQUFDLDRCQUE0QixFQUFFOzs7O0FBQTFFLHNCQUFVLFFBQVYsVUFBVTtBQUFFLHVCQUFXLFFBQVgsV0FBVzs7QUFDNUIsc0JBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDbEQsdUJBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUVsQywyQkFBZSxHQUFHLHdCQUF3QjtBQUMxQyw0QkFBZ0IsR0FBRyxzQkFBc0I7OzZDQUV2QyxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQzs7Ozs2Q0FFUSxNQUFNLENBQUMsR0FBRyxDQUFDLDRCQUE0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QUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7S0FDbkMsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLG1EQUFtRCxFQUFFO1VBQ2xELE9BQU87Ozs7OzZDQUFTLE1BQU0sQ0FBQyxVQUFVLEVBQUU7OztBQUFuQyxtQkFBTzs7QUFDWCxtQkFBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7O0tBQ25DLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvYmFzaWMvZ2VuZXJhbC1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcclxuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xyXG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLi8uLic7XHJcbmltcG9ydCB7IERFRkFVTFRfQ0FQUywgQ09OVEFDVF9NQU5BR0VSX0NBUFMgfSBmcm9tICcuLi8uLi9kZXNpcmVkJztcclxuXHJcblxyXG5jaGFpLnNob3VsZCgpO1xyXG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XHJcblxyXG5kZXNjcmliZSgnZ2VuZXJhbCcsIGZ1bmN0aW9uICgpIHtcclxuICBsZXQgZHJpdmVyO1xyXG4gIGRlc2NyaWJlKCdzdGFydEFjdGl2aXR5JywgZnVuY3Rpb24gKCkge1xyXG4gICAgYmVmb3JlKGFzeW5jICgpID0+IHtcclxuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oREVGQVVMVF9DQVBTKTtcclxuICAgIH0pO1xyXG4gICAgYWZ0ZXIoYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3VsZCBsYXVuY2ggYSBuZXcgcGFja2FnZSBhbmQgYWN0aXZpdHknLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGxldCB7YXBwUGFja2FnZSwgYXBwQWN0aXZpdHl9ID0gYXdhaXQgZHJpdmVyLmFkYi5nZXRGb2N1c2VkUGFja2FnZUFuZEFjdGl2aXR5KCk7XHJcbiAgICAgIGFwcFBhY2thZ2Uuc2hvdWxkLmVxdWFsKCdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJyk7XHJcbiAgICAgIGFwcEFjdGl2aXR5LnNob3VsZC5lcXVhbCgnLkFwaURlbW9zJyk7XHJcblxyXG4gICAgICBsZXQgc3RhcnRBcHBQYWNrYWdlID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xyXG4gICAgICBsZXQgc3RhcnRBcHBBY3Rpdml0eSA9ICcudmlldy5TcGxpdFRvdWNoVmlldyc7XHJcblxyXG4gICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBY3Rpdml0eShzdGFydEFwcFBhY2thZ2UsIHN0YXJ0QXBwQWN0aXZpdHkpO1xyXG5cclxuICAgICAgbGV0IHthcHBQYWNrYWdlOiBuZXdBcHBQYWNrYWdlLCBhcHBBY3Rpdml0eTogbmV3QXBwQWN0aXZpdHl9ID0gYXdhaXQgZHJpdmVyLmFkYi5nZXRGb2N1c2VkUGFja2FnZUFuZEFjdGl2aXR5KCk7XHJcbiAgICAgIG5ld0FwcFBhY2thZ2Uuc2hvdWxkLmVxdWFsKHN0YXJ0QXBwUGFja2FnZSk7XHJcbiAgICAgIG5ld0FwcEFjdGl2aXR5LnNob3VsZC5lcXVhbChzdGFydEFwcEFjdGl2aXR5KTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGxhdW5jaCBhY3Rpdml0eSB3aXRoIGN1c3RvbSBpbnRlbnQgcGFyYW1ldGVyIGNhdGVnb3J5JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgc3RhcnRBcHBQYWNrYWdlID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xyXG4gICAgICBsZXQgc3RhcnRBcHBBY3Rpdml0eSA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzLmFwcC5IZWxsb1dvcmxkJztcclxuICAgICAgbGV0IHN0YXJ0SW50ZW50Q2F0ZWdvcnkgPSAnYXBwaXVtLmFuZHJvaWQuaW50ZW50LmNhdGVnb3J5LlNBTVBMRV9DT0RFJztcclxuXHJcbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFjdGl2aXR5KHN0YXJ0QXBwUGFja2FnZSwgc3RhcnRBcHBBY3Rpdml0eSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHN0YXJ0SW50ZW50Q2F0ZWdvcnkpO1xyXG5cclxuICAgICAgbGV0IHthcHBBY3Rpdml0eX0gPSBhd2FpdCBkcml2ZXIuYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcclxuICAgICAgYXBwQWN0aXZpdHkuc2hvdWxkLmluY2x1ZGUoJ0hlbGxvV29ybGQnKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGxhdW5jaCBhY3Rpdml0eSB3aXRoIGRvbnRTdG9wQXBwT25SZXNldCA9IHRydWUnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGxldCBzdGFydEFwcFBhY2thZ2UgPSAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcyc7XHJcbiAgICAgIGxldCBzdGFydEFwcEFjdGl2aXR5ID0gJy5vcy5Nb3JzZUNvZGUnO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBY3Rpdml0eShzdGFydEFwcFBhY2thZ2UsIHN0YXJ0QXBwQWN0aXZpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0QXBwUGFja2FnZSwgc3RhcnRBcHBBY3Rpdml0eSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkLCB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCwgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlKTtcclxuICAgICAgbGV0IHthcHBQYWNrYWdlLCBhcHBBY3Rpdml0eX0gPSBhd2FpdCBkcml2ZXIuYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcclxuICAgICAgYXBwUGFja2FnZS5zaG91bGQuZXF1YWwoc3RhcnRBcHBQYWNrYWdlKTtcclxuICAgICAgYXBwQWN0aXZpdHkuc2hvdWxkLmVxdWFsKHN0YXJ0QXBwQWN0aXZpdHkpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gbGF1bmNoIGFjdGl2aXR5IHdpdGggZG9udFN0b3BBcHBPblJlc2V0ID0gZmFsc2UnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGxldCBzdGFydEFwcFBhY2thZ2UgPSAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcyc7XHJcbiAgICAgIGxldCBzdGFydEFwcEFjdGl2aXR5ID0gJy5vcy5Nb3JzZUNvZGUnO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBY3Rpdml0eShzdGFydEFwcFBhY2thZ2UsIHN0YXJ0QXBwQWN0aXZpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0QXBwUGFja2FnZSwgc3RhcnRBcHBBY3Rpdml0eSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkLCB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCwgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSk7XHJcbiAgICAgIGxldCB7YXBwUGFja2FnZSwgYXBwQWN0aXZpdHl9ID0gYXdhaXQgZHJpdmVyLmFkYi5nZXRGb2N1c2VkUGFja2FnZUFuZEFjdGl2aXR5KCk7XHJcbiAgICAgIGFwcFBhY2thZ2Uuc2hvdWxkLmVxdWFsKHN0YXJ0QXBwUGFja2FnZSk7XHJcbiAgICAgIGFwcEFjdGl2aXR5LnNob3VsZC5lcXVhbChzdGFydEFwcEFjdGl2aXR5KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdnZXRTdHJpbmdzJywgZnVuY3Rpb24gKCkge1xyXG4gICAgYmVmb3JlKGFzeW5jICgpID0+IHtcclxuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oQ09OVEFDVF9NQU5BR0VSX0NBUFMpO1xyXG4gICAgfSk7XHJcbiAgICBhZnRlcihhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiBhcHAgc3RyaW5ncycsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IHN0cmluZ3MgPSBhd2FpdCBkcml2ZXIuZ2V0U3RyaW5ncygnZW4nKTtcclxuICAgICAgc3RyaW5ncy5zYXZlLnNob3VsZC5lcXVhbCgnU2F2ZScpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiBhcHAgc3RyaW5ncyBmb3IgdGhlIGRldmljZSBsYW5ndWFnZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IHN0cmluZ3MgPSBhd2FpdCBkcml2ZXIuZ2V0U3RyaW5ncygpO1xyXG4gICAgICBzdHJpbmdzLnNhdmUuc2hvdWxkLmVxdWFsKCdTYXZlJyk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLlxcLi5cXC4uIn0=
