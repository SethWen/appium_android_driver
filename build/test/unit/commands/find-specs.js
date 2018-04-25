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

var _appiumAndroidBootstrap = require('appium-android-bootstrap');

var _appiumAndroidBootstrap2 = _interopRequireDefault(_appiumAndroidBootstrap);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var _appiumBaseDriver = require('appium-base-driver');

var driver = undefined;
var sandbox = _sinon2['default'].sandbox.create();
_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Find', function () {
  beforeEach(function () {
    driver = new _2['default']();
    driver.bootstrap = new _appiumAndroidBootstrap2['default']();
    driver.implicitWaitMs = 0;
    sandbox.stub(driver, 'validateLocatorStrategy');
    sandbox.stub(driver.bootstrap, 'sendAction');
    sandbox.stub(driver, 'doFindElementOrEls');
  });
  afterEach(function () {
    sandbox.restore();
  });
  describe('doFindElementOrEls', function () {
    it('should send find action to bootstrap', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.doFindElementOrEls.restore();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.doFindElementOrEls('params'));

          case 3:
            driver.bootstrap.sendAction.calledWithExactly('find', 'params').should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('findElorEls', function () {
    it('should throw an error if there is no selector', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.findElOrEls('xpath', null, false, 'some context').should.be.rejectedWith(/provide a selector/));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to find element', function callee$2$0() {
      var params;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            params = { strategy: 'xpath', selector: '//*[1]', context: 'context', multiple: false };

            driver.doFindElementOrEls.returns('el1');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.findElOrEls('xpath', '//*[1]', false, 'context').should.become('el1'));

          case 4:
            driver.doFindElementOrEls.calledWithExactly(params).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to find elements', function callee$2$0() {
      var params;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            params = { strategy: 'xpath', selector: '//*[1]', context: 'context', multiple: true };

            driver.doFindElementOrEls.returns(['el1', 'el2']);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.findElOrEls('xpath', '//*[1]', true, 'context').should.eventually.be.deep.equal(['el1', 'el2']));

          case 4:
            driver.doFindElementOrEls.calledWithExactly(params).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not throws NoSuchElementError when searching multiple if element does not exist', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.doFindElementOrEls.returns(null);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.findElOrEls('xpaht', '//*[1]', true).should.eventually.be.deep.equal([]));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throws NoSuchElementError if element does not exist', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.doFindElementOrEls.throws(new Error('An element could not be located'));
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.findElOrEls('xpaht', '//*[1]', false).should.be.rejectedWith(_appiumBaseDriver.errors.NoSuchElementError));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should fails if locator strategy is not valid', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.validateLocatorStrategy.throws();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.findElOrEls().should.be.rejected);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should fails if gets unexpected error', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.doFindElementOrEls.throws(new Error('unexpected_error'));
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.findElOrEls('x', 'loc').should.be.rejectedWith('unexpected_error'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9jb21tYW5kcy9maW5kLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztxQkFDM0IsT0FBTzs7OztzQ0FDSCwwQkFBMEI7Ozs7Z0JBQ3RCLFVBQVU7Ozs7Z0NBQ2Isb0JBQW9COztBQUUzQyxJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxPQUFPLEdBQUcsbUJBQU0sT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3JDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLE1BQU0sRUFBRSxZQUFNO0FBQ3JCLFlBQVUsQ0FBQyxZQUFNO0FBQ2YsVUFBTSxHQUFHLG1CQUFtQixDQUFDO0FBQzdCLFVBQU0sQ0FBQyxTQUFTLEdBQUcseUNBQWUsQ0FBQztBQUNuQyxVQUFNLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztBQUMxQixXQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0FBQ2hELFdBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUM3QyxXQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0dBQzVDLENBQUMsQ0FBQztBQUNILFdBQVMsQ0FBQyxZQUFNO0FBQ2QsV0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0dBQ25CLENBQUMsQ0FBQztBQUNILFVBQVEsQ0FBQyxvQkFBb0IsRUFBRSxZQUFNO0FBQ25DLE1BQUUsQ0FBQyxzQ0FBc0MsRUFBRTs7OztBQUN6QyxrQkFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxDQUFDOzs2Q0FDOUIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQzs7O0FBQ3pDLGtCQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FB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Q0FBQztBQUNILE1BQUUsQ0FBQyx1Q0FBdUMsRUFBRTs7OztBQUMxQyxrQkFBTSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7OzZDQUMxRCxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQzs7Ozs7OztLQUNoRixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L2NvbW1hbmRzL2ZpbmQtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcclxuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xyXG5pbXBvcnQgc2lub24gZnJvbSAnc2lub24nO1xyXG5pbXBvcnQgQm9vdHN0cmFwIGZyb20gJ2FwcGl1bS1hbmRyb2lkLWJvb3RzdHJhcCc7XHJcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uJztcclxuaW1wb3J0IHsgZXJyb3JzIH0gZnJvbSAnYXBwaXVtLWJhc2UtZHJpdmVyJztcclxuXHJcbmxldCBkcml2ZXI7XHJcbmxldCBzYW5kYm94ID0gc2lub24uc2FuZGJveC5jcmVhdGUoKTtcclxuY2hhaS5zaG91bGQoKTtcclxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xyXG5cclxuZGVzY3JpYmUoJ0ZpbmQnLCAoKSA9PiB7XHJcbiAgYmVmb3JlRWFjaCgoKSA9PiB7XHJcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xyXG4gICAgZHJpdmVyLmJvb3RzdHJhcCA9IG5ldyBCb290c3RyYXAoKTtcclxuICAgIGRyaXZlci5pbXBsaWNpdFdhaXRNcyA9IDA7XHJcbiAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAndmFsaWRhdGVMb2NhdG9yU3RyYXRlZ3knKTtcclxuICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYm9vdHN0cmFwLCAnc2VuZEFjdGlvbicpO1xyXG4gICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2RvRmluZEVsZW1lbnRPckVscycpO1xyXG4gIH0pO1xyXG4gIGFmdGVyRWFjaCgoKSA9PiB7XHJcbiAgICBzYW5kYm94LnJlc3RvcmUoKTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnZG9GaW5kRWxlbWVudE9yRWxzJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBzZW5kIGZpbmQgYWN0aW9uIHRvIGJvb3RzdHJhcCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgZHJpdmVyLmRvRmluZEVsZW1lbnRPckVscy5yZXN0b3JlKCk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5kb0ZpbmRFbGVtZW50T3JFbHMoJ3BhcmFtcycpO1xyXG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb24uY2FsbGVkV2l0aEV4YWN0bHkoJ2ZpbmQnLCAncGFyYW1zJykuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnZmluZEVsb3JFbHMnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIHRocm93IGFuIGVycm9yIGlmIHRoZXJlIGlzIG5vIHNlbGVjdG9yJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ3hwYXRoJywgbnVsbCwgZmFsc2UsICdzb21lIGNvbnRleHQnKVxyXG4gICAgICAgIC5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKC9wcm92aWRlIGEgc2VsZWN0b3IvKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGZpbmQgZWxlbWVudCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IHBhcmFtcyA9IHtzdHJhdGVneTogJ3hwYXRoJywgIHNlbGVjdG9yOiAnLy8qWzFdJywgY29udGV4dDogJ2NvbnRleHQnLCBtdWx0aXBsZTogZmFsc2V9O1xyXG4gICAgICBkcml2ZXIuZG9GaW5kRWxlbWVudE9yRWxzLnJldHVybnMoJ2VsMScpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ3hwYXRoJywgJy8vKlsxXScsIGZhbHNlLCAnY29udGV4dCcpLnNob3VsZC5iZWNvbWUoJ2VsMScpO1xyXG4gICAgICBkcml2ZXIuZG9GaW5kRWxlbWVudE9yRWxzLmNhbGxlZFdpdGhFeGFjdGx5KHBhcmFtcykuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBmaW5kIGVsZW1lbnRzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgcGFyYW1zID0ge3N0cmF0ZWd5OiAneHBhdGgnLCAgc2VsZWN0b3I6ICcvLypbMV0nLCBjb250ZXh0OiAnY29udGV4dCcsIG11bHRpcGxlOiB0cnVlfTtcclxuICAgICAgZHJpdmVyLmRvRmluZEVsZW1lbnRPckVscy5yZXR1cm5zKFsnZWwxJywgJ2VsMiddKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCd4cGF0aCcsICcvLypbMV0nLCB0cnVlLCAnY29udGV4dCcpXHJcbiAgICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmJlLmRlZXAuZXF1YWwoWydlbDEnLCAnZWwyJ10pO1xyXG4gICAgICBkcml2ZXIuZG9GaW5kRWxlbWVudE9yRWxzLmNhbGxlZFdpdGhFeGFjdGx5KHBhcmFtcykuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgbm90IHRocm93cyBOb1N1Y2hFbGVtZW50RXJyb3Igd2hlbiBzZWFyY2hpbmcgbXVsdGlwbGUgaWYgZWxlbWVudCBkb2VzIG5vdCBleGlzdCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgZHJpdmVyLmRvRmluZEVsZW1lbnRPckVscy5yZXR1cm5zKG51bGwpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ3hwYWh0JywgJy8vKlsxXScsIHRydWUpXHJcbiAgICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmJlLmRlZXAuZXF1YWwoW10pO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHRocm93cyBOb1N1Y2hFbGVtZW50RXJyb3IgaWYgZWxlbWVudCBkb2VzIG5vdCBleGlzdCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgZHJpdmVyLmRvRmluZEVsZW1lbnRPckVscy50aHJvd3MobmV3IEVycm9yKCdBbiBlbGVtZW50IGNvdWxkIG5vdCBiZSBsb2NhdGVkJykpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ3hwYWh0JywgJy8vKlsxXScsIGZhbHNlKVxyXG4gICAgICAgIC5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKGVycm9ycy5Ob1N1Y2hFbGVtZW50RXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGZhaWxzIGlmIGxvY2F0b3Igc3RyYXRlZ3kgaXMgbm90IHZhbGlkJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBkcml2ZXIudmFsaWRhdGVMb2NhdG9yU3RyYXRlZ3kudGhyb3dzKCk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygpLnNob3VsZC5iZS5yZWplY3RlZDtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBmYWlscyBpZiBnZXRzIHVuZXhwZWN0ZWQgZXJyb3InLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGRyaXZlci5kb0ZpbmRFbGVtZW50T3JFbHMudGhyb3dzKG5ldyBFcnJvcigndW5leHBlY3RlZF9lcnJvcicpKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCd4JywgJ2xvYycpLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoJ3VuZXhwZWN0ZWRfZXJyb3InKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uXFwuLiJ9
