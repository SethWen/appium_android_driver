'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _appiumBaseDriver = require('appium-base-driver');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('IME', function () {
  var driver = undefined;
  var sandbox = _sinon2['default'].sandbox.create();
  beforeEach(function () {
    driver = new _2['default']();
    driver.adb = new _appiumAdb2['default']();
  });
  afterEach(function () {
    sandbox.restore();
  });
  describe('isIMEActivated', function () {
    it('should allways return true', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.isIMEActivated().should.eventually.be['true']);

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('availableIMEEngines', function () {
    it('should return available IMEEngines', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'availableIMEs').returns(['IME1', 'IME2']);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.availableIMEEngines().should.eventually.be.deep.equal(['IME1', 'IME2']));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('getActiveIMEEngine', function () {
    it('should return active IME engine', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'defaultIME').returns('default_ime_engine');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getActiveIMEEngine().should.become('default_ime_engine'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('activateIMEEngine', function () {
    it('should activate IME engine', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'availableIMEs').returns(['IME1', 'IME2']);
            sandbox.stub(driver.adb, 'enableIME');
            sandbox.stub(driver.adb, 'setIME');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.activateIMEEngine('IME2').should.be.fulfilled);

          case 5:
            driver.adb.enableIME.calledWithExactly('IME2').should.be['true'];
            driver.adb.setIME.calledWithExactly('IME2').should.be['true'];

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throws error if IME not found', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'availableIMEs').returns(['IME1', 'IME2']);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.activateIMEEngine('IME3').should.be.rejectedWith(_appiumBaseDriver.errors.IMENotAvailableError));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('deactivateIMEEngine', function () {
    it('should deactivate IME engine', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getActiveIMEEngine').returns('active_ime_engine');
            sandbox.stub(driver.adb, 'disableIME');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.deactivateIMEEngine().should.be.fulfilled);

          case 4:
            driver.adb.disableIME.calledWithExactly('active_ime_engine');

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9jb21tYW5kcy9pbWUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O3FCQUMzQixPQUFPOzs7O2dCQUNDLFVBQVU7Ozs7eUJBQ3BCLFlBQVk7Ozs7Z0NBQ0wsb0JBQW9COztBQUUzQyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsWUFBTTtBQUNwQixNQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsTUFBSSxPQUFPLEdBQUcsbUJBQU0sT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3JDLFlBQVUsQ0FBQyxZQUFNO0FBQ2YsVUFBTSxHQUFHLG1CQUFtQixDQUFDO0FBQzdCLFVBQU0sQ0FBQyxHQUFHLEdBQUcsNEJBQVMsQ0FBQztHQUN4QixDQUFDLENBQUM7QUFDSCxXQUFTLENBQUMsWUFBTTtBQUNkLFdBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztHQUNuQixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsZ0JBQWdCLEVBQUUsWUFBTTtBQUMvQixNQUFFLENBQUMsNEJBQTRCLEVBQUU7Ozs7OzZDQUN6QixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQUs7Ozs7Ozs7S0FDeEQsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0FBQ0gsVUFBUSxDQUFDLHFCQUFxQixFQUFFLFlBQU07QUFDcEMsTUFBRSxDQUFDLG9DQUFvQyxFQUFFOzs7O0FBQ3ZDLG1CQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7OzZDQUM5RCxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FDL0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzs7Ozs7OztLQUNyRCxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsb0JBQW9CLEVBQUUsWUFBTTtBQUNuQyxNQUFFLENBQUMsaUNBQWlDLEVBQUU7Ozs7QUFDcEMsbUJBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs7NkNBQy9ELE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUM7Ozs7Ozs7S0FDdEUsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0FBQ0gsVUFBUSxDQUFDLG1CQUFtQixFQUFFLFlBQU07QUFDbEMsTUFBRSxDQUFDLDRCQUE0QixFQUFFOzs7O0FBQy9CLG1CQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDcEUsbUJBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUN0QyxtQkFBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDOzs2Q0FDN0IsTUFBTSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUzs7O0FBQzFELGtCQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFLLENBQUM7QUFDOUQsa0JBQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQUssQ0FBQzs7Ozs7OztLQUM1RCxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsc0NBQXNDLEVBQUU7Ozs7QUFDekMsbUJBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQzs7NkNBQzlELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBRSxNQUFNLENBQUMsQ0FDcEMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMseUJBQU8sb0JBQW9CLENBQUM7Ozs7Ozs7S0FDdkQsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0FBQ0gsVUFBUSxDQUFDLHFCQUFxQixFQUFFLFlBQU07QUFDcEMsTUFBRSxDQUFDLDhCQUE4QixFQUFFOzs7O0FBQ2pDLG1CQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3hFLG1CQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7OzZDQUNqQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVM7OztBQUN0RCxrQkFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs7Ozs7OztLQUM5RCxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L2NvbW1hbmRzL2ltZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xyXG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XHJcbmltcG9ydCBzaW5vbiBmcm9tICdzaW5vbic7XHJcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uJztcclxuaW1wb3J0IEFEQiBmcm9tICdhcHBpdW0tYWRiJztcclxuaW1wb3J0IHsgZXJyb3JzIH0gZnJvbSAnYXBwaXVtLWJhc2UtZHJpdmVyJztcclxuXHJcbmNoYWkuc2hvdWxkKCk7XHJcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcclxuXHJcbmRlc2NyaWJlKCdJTUUnLCAoKSA9PiB7XHJcbiAgbGV0IGRyaXZlcjtcclxuICBsZXQgc2FuZGJveCA9IHNpbm9uLnNhbmRib3guY3JlYXRlKCk7XHJcbiAgYmVmb3JlRWFjaCgoKSA9PiB7XHJcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xyXG4gICAgZHJpdmVyLmFkYiA9IG5ldyBBREIoKTtcclxuICB9KTtcclxuICBhZnRlckVhY2goKCkgPT4ge1xyXG4gICAgc2FuZGJveC5yZXN0b3JlKCk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ2lzSU1FQWN0aXZhdGVkJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBhbGx3YXlzIHJldHVybiB0cnVlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhd2FpdCBkcml2ZXIuaXNJTUVBY3RpdmF0ZWQoKS5zaG91bGQuZXZlbnR1YWxseS5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ2F2YWlsYWJsZUlNRUVuZ2luZXMnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiBhdmFpbGFibGUgSU1FRW5naW5lcycsIGFzeW5jICgpID0+IHtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdhdmFpbGFibGVJTUVzJykucmV0dXJucyhbJ0lNRTEnLCAnSU1FMiddKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmF2YWlsYWJsZUlNRUVuZ2luZXMoKVxyXG4gICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5iZS5kZWVwLmVxdWFsKFsnSU1FMScsICdJTUUyJ10pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ2dldEFjdGl2ZUlNRUVuZ2luZScsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGFjdGl2ZSBJTUUgZW5naW5lJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2RlZmF1bHRJTUUnKS5yZXR1cm5zKCdkZWZhdWx0X2ltZV9lbmdpbmUnKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdldEFjdGl2ZUlNRUVuZ2luZSgpLnNob3VsZC5iZWNvbWUoJ2RlZmF1bHRfaW1lX2VuZ2luZScpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ2FjdGl2YXRlSU1FRW5naW5lJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBhY3RpdmF0ZSBJTUUgZW5naW5lJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2F2YWlsYWJsZUlNRXMnKS5yZXR1cm5zKFsnSU1FMScsICdJTUUyJ10pO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2VuYWJsZUlNRScpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ3NldElNRScpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuYWN0aXZhdGVJTUVFbmdpbmUoJ0lNRTInKS5zaG91bGQuYmUuZnVsZmlsbGVkO1xyXG4gICAgICBkcml2ZXIuYWRiLmVuYWJsZUlNRS5jYWxsZWRXaXRoRXhhY3RseSgnSU1FMicpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBkcml2ZXIuYWRiLnNldElNRS5jYWxsZWRXaXRoRXhhY3RseSgnSU1FMicpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHRocm93cyBlcnJvciBpZiBJTUUgbm90IGZvdW5kJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2F2YWlsYWJsZUlNRXMnKS5yZXR1cm5zKFsnSU1FMScsICdJTUUyJ10pO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuYWN0aXZhdGVJTUVFbmdpbmUgKCdJTUUzJylcclxuICAgICAgICAuc2hvdWxkLmJlLnJlamVjdGVkV2l0aChlcnJvcnMuSU1FTm90QXZhaWxhYmxlRXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ2RlYWN0aXZhdGVJTUVFbmdpbmUnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGRlYWN0aXZhdGUgSU1FIGVuZ2luZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2dldEFjdGl2ZUlNRUVuZ2luZScpLnJldHVybnMoJ2FjdGl2ZV9pbWVfZW5naW5lJyk7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnZGlzYWJsZUlNRScpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZGVhY3RpdmF0ZUlNRUVuZ2luZSgpLnNob3VsZC5iZS5mdWxmaWxsZWQ7XHJcbiAgICAgIGRyaXZlci5hZGIuZGlzYWJsZUlNRS5jYWxsZWRXaXRoRXhhY3RseSgnYWN0aXZlX2ltZV9lbmdpbmUnKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uXFwuLiJ9
