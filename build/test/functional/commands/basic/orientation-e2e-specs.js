'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../../..');

var _2 = _interopRequireDefault(_);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _desired = require('../../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('apidemo - orientation -', function () {
  var driver = undefined;

  describe('initial -', function () {
    beforeEach(function () {
      driver = new _2['default']();
    });
    afterEach(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setOrientation('PORTRAIT'));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should have portrait orientation if requested', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession(_Object$assign({}, _desired2['default'], {
              appActivity: '.view.TextFields',
              orientation: 'PORTRAIT'
            })));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getOrientation().should.eventually.eql('PORTRAIT'));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should have landscape orientation if requested', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession(_Object$assign({}, _desired2['default'], {
              appActivity: '.view.TextFields',
              orientation: 'LANDSCAPE'
            })));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getOrientation().should.eventually.eql('LANDSCAPE'));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should have portrait orientation if nothing requested', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession(_Object$assign({}, _desired2['default'], {
              appActivity: '.view.TextFields'
            })));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getOrientation().should.eventually.eql('PORTRAIT'));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('setting -', function () {
    var _this = this;

    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(_Object$assign({}, _desired2['default'], {
              appActivity: '.view.TextFields'
            })));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
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
    it('should rotate screen to landscape', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setOrientation('PORTRAIT'));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_bluebird2['default'].delay(3000));

          case 4:
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.setOrientation('LANDSCAPE'));

          case 6:
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(_bluebird2['default'].delay(3000));

          case 8:
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(driver.getOrientation().should.eventually.become('LANDSCAPE'));

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should rotate screen to landscape', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setOrientation('LANDSCAPE'));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_bluebird2['default'].delay(3000));

          case 4:
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.setOrientation('PORTRAIT'));

          case 6:
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(_bluebird2['default'].delay(3000));

          case 8:
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(driver.getOrientation().should.eventually.become('PORTRAIT'));

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should not error when trying to rotate to portrait again', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setOrientation('PORTRAIT'));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_bluebird2['default'].delay(3000));

          case 4:
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.setOrientation('PORTRAIT'));

          case 6:
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(_bluebird2['default'].delay(3000));

          case 8:
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(driver.getOrientation().should.eventually.become('PORTRAIT'));

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9iYXNpYy9vcmllbnRhdGlvbi1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2dCQUNuQixhQUFhOzs7O3dCQUN6QixVQUFVOzs7O3VCQUNDLGVBQWU7Ozs7QUFHeEMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixRQUFRLENBQUMseUJBQXlCLEVBQUUsWUFBWTtBQUM5QyxNQUFJLE1BQU0sWUFBQSxDQUFDOztBQUVYLFVBQVEsQ0FBQyxXQUFXLEVBQUUsWUFBWTtBQUNoQyxjQUFVLENBQUMsWUFBWTtBQUNyQixZQUFNLEdBQUcsbUJBQW1CLENBQUM7S0FDOUIsQ0FBQyxDQUFDO0FBQ0gsYUFBUyxDQUFDOzs7Ozs2Q0FDRixNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQzs7Ozs2Q0FDakMsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztLQUM3QixDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsK0NBQStDLEVBQUU7Ozs7OzZDQUM1QyxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWMsRUFBRSx3QkFBZ0I7QUFDekQseUJBQVcsRUFBRSxrQkFBa0I7QUFDL0IseUJBQVcsRUFBRSxVQUFVO2FBQ3hCLENBQUMsQ0FBQzs7Ozs2Q0FDRyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDOzs7Ozs7O0tBQ2hFLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyxnREFBZ0QsRUFBRTs7Ozs7NkNBQzdDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBYyxFQUFFLHdCQUFnQjtBQUN6RCx5QkFBVyxFQUFFLGtCQUFrQjtBQUMvQix5QkFBVyxFQUFFLFdBQVc7YUFDekIsQ0FBQyxDQUFDOzs7OzZDQUNHLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7Ozs7Ozs7S0FDakUsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLHVEQUF1RCxFQUFFOzs7Ozs2Q0FDcEQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFjLEVBQUUsd0JBQWdCO0FBQ3pELHlCQUFXLEVBQUUsa0JBQWtCO2FBQ2hDLENBQUMsQ0FBQzs7Ozs2Q0FDRyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDOzs7Ozs7O0tBQ2hFLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztBQUNILFVBQVEsQ0FBQyxXQUFXLEVBQUUsWUFBWTs7O0FBQ2hDLFVBQU0sQ0FBQzs7OztBQUNMLGtCQUFNLEdBQUcsbUJBQW1CLENBQUM7OzZDQUN2QixNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWMsRUFBRSx3QkFBZ0I7QUFDekQseUJBQVcsRUFBRSxrQkFBa0I7YUFDaEMsQ0FBQyxDQUFDOzs7Ozs7O0tBQ0osQ0FBQyxDQUFDO0FBQ0gsU0FBSyxDQUFDOzs7Ozs2Q0FDRSxNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7O0tBQzdCLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyxtQ0FBbUMsRUFBRTs7Ozs7NkNBQ2hDLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDOzs7OzZDQUNqQyxzQkFBRSxLQUFLLENBQUMsSUFBSSxDQUFDOzs7OzZDQUNiLE1BQU0sQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDOzs7OzZDQUNsQyxzQkFBRSxLQUFLLENBQUMsSUFBSSxDQUFDOzs7OzZDQUNiLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7Ozs7Ozs7S0FDcEUsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLG1DQUFtQyxFQUFFOzs7Ozs2Q0FDaEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUM7Ozs7NkNBQ2xDLHNCQUFFLEtBQUssQ0FBQyxJQUFJLENBQUM7Ozs7NkNBQ2IsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUM7Ozs7NkNBQ2pDLHNCQUFFLEtBQUssQ0FBQyxJQUFJLENBQUM7Ozs7NkNBQ2IsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQzs7Ozs7OztLQUNuRSxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsMERBQTBELEVBQUU7Ozs7OzZDQUN2RCxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQzs7Ozs2Q0FDakMsc0JBQUUsS0FBSyxDQUFDLElBQUksQ0FBQzs7Ozs2Q0FDYixNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQzs7Ozs2Q0FDakMsc0JBQUUsS0FBSyxDQUFDLElBQUksQ0FBQzs7Ozs2Q0FDYixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDOzs7Ozs7O0tBQ25FLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvYmFzaWMvb3JpZW50YXRpb24tZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XHJcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcclxuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4vLi4nO1xyXG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XHJcbmltcG9ydCBERUZBVUxUX0NBUFMgZnJvbSAnLi4vLi4vZGVzaXJlZCc7XHJcblxyXG5cclxuY2hhaS5zaG91bGQoKTtcclxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xyXG5cclxuZGVzY3JpYmUoJ2FwaWRlbW8gLSBvcmllbnRhdGlvbiAtJywgZnVuY3Rpb24gKCkge1xyXG4gIGxldCBkcml2ZXI7XHJcblxyXG4gIGRlc2NyaWJlKCdpbml0aWFsIC0nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcclxuICAgIH0pO1xyXG4gICAgYWZ0ZXJFYWNoKGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgYXdhaXQgZHJpdmVyLnNldE9yaWVudGF0aW9uKCdQT1JUUkFJVCcpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGhhdmUgcG9ydHJhaXQgb3JpZW50YXRpb24gaWYgcmVxdWVzdGVkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX0NBUFMsIHtcclxuICAgICAgICBhcHBBY3Rpdml0eTogJy52aWV3LlRleHRGaWVsZHMnLFxyXG4gICAgICAgIG9yaWVudGF0aW9uOiAnUE9SVFJBSVQnLFxyXG4gICAgICB9KSk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRPcmllbnRhdGlvbigpLnNob3VsZC5ldmVudHVhbGx5LmVxbCgnUE9SVFJBSVQnKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBoYXZlIGxhbmRzY2FwZSBvcmllbnRhdGlvbiBpZiByZXF1ZXN0ZWQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfQ0FQUywge1xyXG4gICAgICAgIGFwcEFjdGl2aXR5OiAnLnZpZXcuVGV4dEZpZWxkcycsXHJcbiAgICAgICAgb3JpZW50YXRpb246ICdMQU5EU0NBUEUnLFxyXG4gICAgICB9KSk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRPcmllbnRhdGlvbigpLnNob3VsZC5ldmVudHVhbGx5LmVxbCgnTEFORFNDQVBFJyk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgaGF2ZSBwb3J0cmFpdCBvcmllbnRhdGlvbiBpZiBub3RoaW5nIHJlcXVlc3RlZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9DQVBTLCB7XHJcbiAgICAgICAgYXBwQWN0aXZpdHk6ICcudmlldy5UZXh0RmllbGRzJyxcclxuICAgICAgfSkpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0T3JpZW50YXRpb24oKS5zaG91bGQuZXZlbnR1YWxseS5lcWwoJ1BPUlRSQUlUJyk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnc2V0dGluZyAtJywgZnVuY3Rpb24gKCkge1xyXG4gICAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9DQVBTLCB7XHJcbiAgICAgICAgYXBwQWN0aXZpdHk6ICcudmlldy5UZXh0RmllbGRzJ1xyXG4gICAgICB9KSk7XHJcbiAgICB9KTtcclxuICAgIGFmdGVyKGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCByb3RhdGUgc2NyZWVuIHRvIGxhbmRzY2FwZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgYXdhaXQgZHJpdmVyLnNldE9yaWVudGF0aW9uKCdQT1JUUkFJVCcpO1xyXG4gICAgICBhd2FpdCBCLmRlbGF5KDMwMDApO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuc2V0T3JpZW50YXRpb24oJ0xBTkRTQ0FQRScpO1xyXG4gICAgICBhd2FpdCBCLmRlbGF5KDMwMDApO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0T3JpZW50YXRpb24oKS5zaG91bGQuZXZlbnR1YWxseS5iZWNvbWUoJ0xBTkRTQ0FQRScpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHJvdGF0ZSBzY3JlZW4gdG8gbGFuZHNjYXBlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBhd2FpdCBkcml2ZXIuc2V0T3JpZW50YXRpb24oJ0xBTkRTQ0FQRScpO1xyXG4gICAgICBhd2FpdCBCLmRlbGF5KDMwMDApO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuc2V0T3JpZW50YXRpb24oJ1BPUlRSQUlUJyk7XHJcbiAgICAgIGF3YWl0IEIuZGVsYXkoMzAwMCk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRPcmllbnRhdGlvbigpLnNob3VsZC5ldmVudHVhbGx5LmJlY29tZSgnUE9SVFJBSVQnKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBub3QgZXJyb3Igd2hlbiB0cnlpbmcgdG8gcm90YXRlIHRvIHBvcnRyYWl0IGFnYWluJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBhd2FpdCBkcml2ZXIuc2V0T3JpZW50YXRpb24oJ1BPUlRSQUlUJyk7XHJcbiAgICAgIGF3YWl0IEIuZGVsYXkoMzAwMCk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5zZXRPcmllbnRhdGlvbignUE9SVFJBSVQnKTtcclxuICAgICAgYXdhaXQgQi5kZWxheSgzMDAwKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdldE9yaWVudGF0aW9uKCkuc2hvdWxkLmV2ZW50dWFsbHkuYmVjb21lKCdQT1JUUkFJVCcpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi5cXC4uXFwuLiJ9
