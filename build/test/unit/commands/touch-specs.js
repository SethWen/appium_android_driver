'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var _appiumTestSupport = require('appium-test-support');

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Touch', function () {
  var adb = new _appiumAdb2['default']();
  var driver = new _2['default']();
  driver.adb = adb;

  describe('#parseTouch', function () {
    describe('given a touch sequence with absolute coordinates', function () {
      it('should use offsets for moveTo', function callee$3$0() {
        var actions, touchStates, parsedActions, index, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, state;

        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              actions = [{ action: 'press', options: { x: 100, y: 101 } }, { action: 'moveTo', options: { x: 50, y: 51 } }, { action: 'wait', options: { ms: 5000 } }, { action: 'moveTo', options: { x: -40, y: -41 } }, { action: 'release', options: {} }];
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(driver.parseTouch(actions, false));

            case 3:
              touchStates = context$4$0.sent;

              touchStates.length.should.equal(5);
              parsedActions = [{ action: 'press', x: 100, y: 101 }, { action: 'moveTo', x: 150, y: 152 }, { action: 'wait', x: 150, y: 152 }, { action: 'moveTo', x: 110, y: 111 }, { action: 'release' }];
              index = 0;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              context$4$0.prev = 10;

              for (_iterator = _getIterator(touchStates); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                state = _step.value;

                state.action.should.equal(parsedActions[index].action);
                if (actions[index].action !== 'release') {
                  state.options.x.should.equal(parsedActions[index].x);
                  state.options.y.should.equal(parsedActions[index].y);
                }
                index++;
              }
              context$4$0.next = 18;
              break;

            case 14:
              context$4$0.prev = 14;
              context$4$0.t0 = context$4$0['catch'](10);
              _didIteratorError = true;
              _iteratorError = context$4$0.t0;

            case 18:
              context$4$0.prev = 18;
              context$4$0.prev = 19;

              if (!_iteratorNormalCompletion && _iterator['return']) {
                _iterator['return']();
              }

            case 21:
              context$4$0.prev = 21;

              if (!_didIteratorError) {
                context$4$0.next = 24;
                break;
              }

              throw _iteratorError;

            case 24:
              return context$4$0.finish(21);

            case 25:
              return context$4$0.finish(18);

            case 26:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this, [[10, 14, 18, 26], [19,, 21, 25]]);
      });
    });
  });

  describe('fixRelease', (0, _appiumTestSupport.withMocks)({ driver: driver, adb: adb }, function (mocks) {
    it('should be able to get the correct release coordinates', function callee$2$0() {
      var actions, release;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            actions = [{ action: 'press', options: { x: 20, y: 21 } }, { action: 'moveTo', options: { x: 10, y: 11 } }, { action: 'release' }];
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.fixRelease(actions, false));

          case 3:
            release = context$3$0.sent;

            release.options.should.eql({ x: 10, y: 11 });

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to get the correct element release offset', function callee$2$0() {
      var actions, release;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.driver.expects('getLocationInView').withExactArgs(2).returns({ x: 100, y: 101 });
            actions = [{ action: 'press', options: { element: 1, x: 20, y: 21 } }, { action: 'moveTo', options: { element: 2, x: 10, y: 11 } }, { action: 'release' }];
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.fixRelease(actions, false));

          case 4:
            release = context$3$0.sent;

            release.options.should.eql({ x: 110, y: 112 });

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to get the correct element release', function callee$2$0() {
      var actions, release;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.driver.expects('getLocationInView').withExactArgs(2).returns({ x: 100, y: 101 });
            mocks.driver.expects('getSize').withExactArgs(2).returns({ width: 5, height: 6 });
            actions = [{ action: 'press', options: { element: 1, x: 20, y: 21 } }, { action: 'moveTo', options: { element: 2 } }, { action: 'release' }];
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.fixRelease(actions, false));

          case 5:
            release = context$3$0.sent;

            release.options.should.eql({ x: 102.5, y: 104 });

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));

  describe('doTouchDrag', (0, _appiumTestSupport.withMocks)({ driver: driver, adb: adb }, function (mocks) {
    var tests = function tests(apiLevel, defaultDuration) {
      return _regeneratorRuntime.async(function tests$(context$3$0) {
        var _this2 = this;

        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            it('should handle longPress not having duration', function callee$3$0() {
              var expectedDuration, actions;
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    expectedDuration = defaultDuration;
                    actions = [{ action: 'longPress', options: { x: 100, y: 101 } }, { action: 'moveTo', options: { x: 50, y: 51 } }, { action: 'release', options: {} }];

                    mocks.driver.expects('drag').withExactArgs(actions[0].options.x, actions[0].options.y, actions[1].options.x, actions[1].options.y, expectedDuration, 1, undefined, undefined).returns('');
                    context$4$0.next = 5;
                    return _regeneratorRuntime.awrap(driver.doTouchDrag(actions));

                  case 5:

                    mocks.driver.verify();

                  case 6:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, _this2);
            });
            it('should handle longPress having duration', function callee$3$0() {
              var expectedDuration, actions;
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    expectedDuration = 4;
                    actions = [{ action: 'longPress', options: { x: 100, y: 101, duration: expectedDuration * 1000 } }, { action: 'moveTo', options: { x: 50, y: 51 } }, { action: 'release', options: {} }];

                    mocks.driver.expects('drag').withExactArgs(actions[0].options.x, actions[0].options.y, actions[1].options.x, actions[1].options.y, expectedDuration, 1, undefined, undefined).returns('');
                    context$4$0.next = 5;
                    return _regeneratorRuntime.awrap(driver.doTouchDrag(actions));

                  case 5:

                    mocks.driver.verify();

                  case 6:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, _this2);
            });
            it('should handle longPress having duration less than minimum', function callee$3$0() {
              var expectedDuration, actions;
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    expectedDuration = defaultDuration;
                    actions = [{ action: 'longPress', options: { x: 100, y: 101, duration: 500 } }, { action: 'moveTo', options: { x: 50, y: 51 } }, { action: 'release', options: {} }];

                    mocks.driver.expects('drag').withExactArgs(actions[0].options.x, actions[0].options.y, actions[1].options.x, actions[1].options.y, expectedDuration, 1, undefined, undefined).returns('');
                    context$4$0.next = 5;
                    return _regeneratorRuntime.awrap(driver.doTouchDrag(actions));

                  case 5:

                    mocks.driver.verify();

                  case 6:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, _this2);
            });

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    };

    describe('android >5', function () {
      beforeEach(function () {
        mocks.adb.expects('getApiLevel').returns(5);
      });
      afterEach(function () {
        mocks.adb.verify();
        mocks.adb.restore();
      });
      tests(5, 2);
    });
    describe('android <5', function () {
      beforeEach(function () {
        mocks.adb.expects('getApiLevel').returns(4.4);
      });
      afterEach(function () {
        mocks.adb.verify();
        mocks.adb.restore();
      });
      tests(4.4, 1);
    });
  }));

  describe('parseTouch', function () {
    it('should handle actions starting with wait', function callee$2$0() {
      var actions, touchStateObject;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            actions = [{ action: 'wait', options: { ms: 500 } }, { action: 'tap', options: { x: 100, y: 101 } }];
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.parseTouch(actions, true));

          case 3:
            touchStateObject = context$3$0.sent;

            touchStateObject.should.eql([{
              action: 'wait',
              time: 0.5
            }, {
              action: 'tap',
              touch: { x: 100, y: 101 },
              time: 0.505
            }]);

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
});

// let driver = new AndroidDriver({foo: 'bar'});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9jb21tYW5kcy90b3VjaC1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztnQkFDbkIsVUFBVTs7OztpQ0FDVixxQkFBcUI7O3lCQUMvQixZQUFZOzs7O0FBRzVCLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLE9BQU8sRUFBRSxZQUFNO0FBQ3RCLE1BQUksR0FBRyxHQUFHLDRCQUFTLENBQUM7QUFDcEIsTUFBSSxNQUFNLEdBQUcsbUJBQW1CLENBQUM7QUFDakMsUUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7O0FBRWpCLFVBQVEsQ0FBQyxhQUFhLEVBQUUsWUFBTTtBQUM1QixZQUFRLENBQUMsa0RBQWtELEVBQUUsWUFBTTtBQUNqRSxRQUFFLENBQUMsK0JBQStCLEVBQUU7WUFFOUIsT0FBTyxFQUtQLFdBQVcsRUFFWCxhQUFhLEVBS2IsS0FBSyxrRkFDQSxLQUFLOzs7OztBQWJWLHFCQUFPLEdBQUcsQ0FBQyxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFDLEVBQUMsRUFDNUMsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBQyxFQUFDLEVBQzNDLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBQyxFQUFFLEVBQUUsSUFBSSxFQUFDLEVBQUMsRUFDckMsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsRUFBQyxFQUM3QyxFQUFDLE1BQU0sRUFBRSxTQUFT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QUFFLEdBQUcsRUFBQyxFQUFDLEVBQ3BDLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUMsRUFBQyxDQUFDOzs2Q0FFN0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7QUFBekQsNEJBQWdCOztBQUNwQiw0QkFBZ0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0Isb0JBQU0sRUFBRSxNQUFNO0FBQ2Qsa0JBQUksRUFBRSxHQUFHO2FBQ1YsRUFBRTtBQUNELG9CQUFNLEVBQUUsS0FBSztBQUNiLG1CQUFLLEVBQUUsRUFBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUM7QUFDdkIsa0JBQUksRUFBRSxLQUFLO2FBQ1osQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7S0FDTCxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L2NvbW1hbmRzL3RvdWNoLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XHJcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcclxuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4nO1xyXG5pbXBvcnQgeyB3aXRoTW9ja3MgfSBmcm9tICdhcHBpdW0tdGVzdC1zdXBwb3J0JztcclxuaW1wb3J0IEFEQiBmcm9tICdhcHBpdW0tYWRiJztcclxuXHJcblxyXG5jaGFpLnNob3VsZCgpO1xyXG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XHJcblxyXG5kZXNjcmliZSgnVG91Y2gnLCAoKSA9PiB7XHJcbiAgbGV0IGFkYiA9IG5ldyBBREIoKTtcclxuICBsZXQgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcclxuICBkcml2ZXIuYWRiID0gYWRiO1xyXG5cclxuICBkZXNjcmliZSgnI3BhcnNlVG91Y2gnLCAoKSA9PiB7XHJcbiAgICBkZXNjcmliZSgnZ2l2ZW4gYSB0b3VjaCBzZXF1ZW5jZSB3aXRoIGFic29sdXRlIGNvb3JkaW5hdGVzJywgKCkgPT4ge1xyXG4gICAgICBpdCgnc2hvdWxkIHVzZSBvZmZzZXRzIGZvciBtb3ZlVG8nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgLy8gbGV0IGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKHtmb286ICdiYXInfSk7XHJcbiAgICAgICAgbGV0IGFjdGlvbnMgPSBbe2FjdGlvbjogJ3ByZXNzJywgb3B0aW9uczoge3g6IDEwMCwgeTogMTAxfX0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjogJ21vdmVUbycsIG9wdGlvbnM6IHt4OiA1MCwgeTogNTF9fSxcclxuICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOiAnd2FpdCcsIG9wdGlvbnM6IHttczogNTAwMH19LFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246ICdtb3ZlVG8nLCBvcHRpb25zOiB7eDogLTQwLCB5OiAtNDF9fSxcclxuICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOiAncmVsZWFzZScsIG9wdGlvbnM6IHt9fV07XHJcbiAgICAgICAgbGV0IHRvdWNoU3RhdGVzID0gYXdhaXQgZHJpdmVyLnBhcnNlVG91Y2goYWN0aW9ucywgZmFsc2UpO1xyXG4gICAgICAgIHRvdWNoU3RhdGVzLmxlbmd0aC5zaG91bGQuZXF1YWwoNSk7XHJcbiAgICAgICAgbGV0IHBhcnNlZEFjdGlvbnMgPSBbe2FjdGlvbjogJ3ByZXNzJywgeDogMTAwLCB5OiAxMDF9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246ICdtb3ZlVG8nLCB4OiAxNTAsIHk6IDE1Mn0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjogJ3dhaXQnLCB4OiAxNTAsIHk6IDE1Mn0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjogJ21vdmVUbycsIHg6IDExMCwgeTogMTExfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOiAncmVsZWFzZSd9XTtcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIGZvciAobGV0IHN0YXRlIG9mIHRvdWNoU3RhdGVzKSB7XHJcbiAgICAgICAgICBzdGF0ZS5hY3Rpb24uc2hvdWxkLmVxdWFsKHBhcnNlZEFjdGlvbnNbaW5kZXhdLmFjdGlvbik7XHJcbiAgICAgICAgICBpZiAoYWN0aW9uc1tpbmRleF0uYWN0aW9uICE9PSAncmVsZWFzZScpIHtcclxuICAgICAgICAgICAgc3RhdGUub3B0aW9ucy54LnNob3VsZC5lcXVhbChwYXJzZWRBY3Rpb25zW2luZGV4XS54KTtcclxuICAgICAgICAgICAgc3RhdGUub3B0aW9ucy55LnNob3VsZC5lcXVhbChwYXJzZWRBY3Rpb25zW2luZGV4XS55KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICBkZXNjcmliZSgnZml4UmVsZWFzZScsIHdpdGhNb2Nrcyh7ZHJpdmVyLCBhZGJ9LCAobW9ja3MpID0+IHtcclxuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBnZXQgdGhlIGNvcnJlY3QgcmVsZWFzZSBjb29yZGluYXRlcycsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IGFjdGlvbnMgPSBbe2FjdGlvbjogJ3ByZXNzJywgb3B0aW9uczoge3g6IDIwLCB5OiAyMX19LFxyXG4gICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOiAnbW92ZVRvJywgb3B0aW9uczoge3g6IDEwLCB5OiAxMX19LFxyXG4gICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOiAncmVsZWFzZSd9XTtcclxuICAgICAgbGV0IHJlbGVhc2UgPSBhd2FpdCBkcml2ZXIuZml4UmVsZWFzZShhY3Rpb25zLCBmYWxzZSk7XHJcbiAgICAgIHJlbGVhc2Uub3B0aW9ucy5zaG91bGQuZXFsKHt4OiAxMCwgeTogMTF9KTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGdldCB0aGUgY29ycmVjdCBlbGVtZW50IHJlbGVhc2Ugb2Zmc2V0JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5kcml2ZXIuZXhwZWN0cygnZ2V0TG9jYXRpb25JblZpZXcnKVxyXG4gICAgICAgIC53aXRoRXhhY3RBcmdzKDIpXHJcbiAgICAgICAgLnJldHVybnMoe3g6IDEwMCwgeTogMTAxfSk7XHJcbiAgICAgIGxldCBhY3Rpb25zID0gW3thY3Rpb246ICdwcmVzcycsIG9wdGlvbnM6IHtlbGVtZW50OiAxLCB4OiAyMCwgeTogMjF9fSxcclxuICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjogJ21vdmVUbycsIG9wdGlvbnM6IHtlbGVtZW50OiAyLCB4OiAxMCwgeTogMTF9fSxcclxuICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjogJ3JlbGVhc2UnfV07XHJcbiAgICAgIGxldCByZWxlYXNlID0gYXdhaXQgZHJpdmVyLmZpeFJlbGVhc2UoYWN0aW9ucywgZmFsc2UpO1xyXG4gICAgICByZWxlYXNlLm9wdGlvbnMuc2hvdWxkLmVxbCh7eDogMTEwLCB5OiAxMTJ9KTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGdldCB0aGUgY29ycmVjdCBlbGVtZW50IHJlbGVhc2UnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmRyaXZlci5leHBlY3RzKCdnZXRMb2NhdGlvbkluVmlldycpXHJcbiAgICAgICAgLndpdGhFeGFjdEFyZ3MoMilcclxuICAgICAgICAucmV0dXJucyh7eDogMTAwLCB5OiAxMDF9KTtcclxuICAgICAgbW9ja3MuZHJpdmVyLmV4cGVjdHMoJ2dldFNpemUnKVxyXG4gICAgICAgIC53aXRoRXhhY3RBcmdzKDIpXHJcbiAgICAgICAgLnJldHVybnMoe3dpZHRoOiA1LCBoZWlnaHQ6IDZ9KTtcclxuICAgICAgbGV0IGFjdGlvbnMgPSBbe2FjdGlvbjogJ3ByZXNzJywgb3B0aW9uczoge2VsZW1lbnQ6IDEsIHg6IDIwLCB5OiAyMX19LFxyXG4gICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOiAnbW92ZVRvJywgb3B0aW9uczoge2VsZW1lbnQ6IDJ9fSxcclxuICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjogJ3JlbGVhc2UnfV07XHJcbiAgICAgIGxldCByZWxlYXNlID0gYXdhaXQgZHJpdmVyLmZpeFJlbGVhc2UoYWN0aW9ucywgZmFsc2UpO1xyXG4gICAgICByZWxlYXNlLm9wdGlvbnMuc2hvdWxkLmVxbCh7eDogMTAyLjUsIHk6IDEwNH0pO1xyXG4gICAgfSk7XHJcbiAgfSkpO1xyXG5cclxuICBkZXNjcmliZSgnZG9Ub3VjaERyYWcnLCB3aXRoTW9ja3Moe2RyaXZlciwgYWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICBsZXQgdGVzdHMgPSBhc3luYyAoYXBpTGV2ZWwsIGRlZmF1bHREdXJhdGlvbikgPT4ge1xyXG4gICAgICBpdCgnc2hvdWxkIGhhbmRsZSBsb25nUHJlc3Mgbm90IGhhdmluZyBkdXJhdGlvbicsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBsZXQgZXhwZWN0ZWREdXJhdGlvbiA9IGRlZmF1bHREdXJhdGlvbjtcclxuICAgICAgICBsZXQgYWN0aW9ucyA9IFt7YWN0aW9uOiAnbG9uZ1ByZXNzJywgb3B0aW9uczoge3g6IDEwMCwgeTogMTAxfX0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjogJ21vdmVUbycsIG9wdGlvbnM6IHt4OiA1MCwgeTogNTF9fSxcclxuICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOiAncmVsZWFzZScsIG9wdGlvbnM6IHt9fV07XHJcblxyXG4gICAgICAgIG1vY2tzLmRyaXZlci5leHBlY3RzKCdkcmFnJylcclxuICAgICAgICAgIC53aXRoRXhhY3RBcmdzKGFjdGlvbnNbMF0ub3B0aW9ucy54LCBhY3Rpb25zWzBdLm9wdGlvbnMueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnNbMV0ub3B0aW9ucy54LCBhY3Rpb25zWzFdLm9wdGlvbnMueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkRHVyYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAxLCB1bmRlZmluZWQsIHVuZGVmaW5lZClcclxuICAgICAgICAgIC5yZXR1cm5zKCcnKTtcclxuICAgICAgICBhd2FpdCBkcml2ZXIuZG9Ub3VjaERyYWcoYWN0aW9ucyk7XHJcblxyXG4gICAgICAgIG1vY2tzLmRyaXZlci52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGl0KCdzaG91bGQgaGFuZGxlIGxvbmdQcmVzcyBoYXZpbmcgZHVyYXRpb24nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGV4cGVjdGVkRHVyYXRpb24gPSA0O1xyXG4gICAgICAgIGxldCBhY3Rpb25zID0gW3thY3Rpb246ICdsb25nUHJlc3MnLCBvcHRpb25zOiB7eDogMTAwLCB5OiAxMDEsIGR1cmF0aW9uOiBleHBlY3RlZER1cmF0aW9uICogMTAwMH19LFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246ICdtb3ZlVG8nLCBvcHRpb25zOiB7eDogNTAsIHk6IDUxfX0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjogJ3JlbGVhc2UnLCBvcHRpb25zOiB7fX1dO1xyXG5cclxuICAgICAgICBtb2Nrcy5kcml2ZXIuZXhwZWN0cygnZHJhZycpXHJcbiAgICAgICAgICAud2l0aEV4YWN0QXJncyhhY3Rpb25zWzBdLm9wdGlvbnMueCwgYWN0aW9uc1swXS5vcHRpb25zLnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zWzFdLm9wdGlvbnMueCwgYWN0aW9uc1sxXS5vcHRpb25zLnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZER1cmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgMSwgdW5kZWZpbmVkLCB1bmRlZmluZWQpXHJcbiAgICAgICAgICAucmV0dXJucygnJyk7XHJcbiAgICAgICAgYXdhaXQgZHJpdmVyLmRvVG91Y2hEcmFnKGFjdGlvbnMpO1xyXG5cclxuICAgICAgICBtb2Nrcy5kcml2ZXIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpdCgnc2hvdWxkIGhhbmRsZSBsb25nUHJlc3MgaGF2aW5nIGR1cmF0aW9uIGxlc3MgdGhhbiBtaW5pbXVtJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGxldCBleHBlY3RlZER1cmF0aW9uID0gZGVmYXVsdER1cmF0aW9uO1xyXG4gICAgICAgIGxldCBhY3Rpb25zID0gW3thY3Rpb246ICdsb25nUHJlc3MnLCBvcHRpb25zOiB7eDogMTAwLCB5OiAxMDEsIGR1cmF0aW9uOiA1MDB9fSxcclxuICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOiAnbW92ZVRvJywgb3B0aW9uczoge3g6IDUwLCB5OiA1MX19LFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246ICdyZWxlYXNlJywgb3B0aW9uczoge319XTtcclxuXHJcbiAgICAgICAgbW9ja3MuZHJpdmVyLmV4cGVjdHMoJ2RyYWcnKVxyXG4gICAgICAgICAgLndpdGhFeGFjdEFyZ3MoYWN0aW9uc1swXS5vcHRpb25zLngsIGFjdGlvbnNbMF0ub3B0aW9ucy55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uc1sxXS5vcHRpb25zLngsIGFjdGlvbnNbMV0ub3B0aW9ucy55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgZXhwZWN0ZWREdXJhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIDEsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKVxyXG4gICAgICAgICAgLnJldHVybnMoJycpO1xyXG4gICAgICAgIGF3YWl0IGRyaXZlci5kb1RvdWNoRHJhZyhhY3Rpb25zKTtcclxuXHJcbiAgICAgICAgbW9ja3MuZHJpdmVyLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgZGVzY3JpYmUoJ2FuZHJvaWQgPjUnLCAoKSA9PiB7XHJcbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRBcGlMZXZlbCcpXHJcbiAgICAgICAgICAucmV0dXJucyg1KTtcclxuICAgICAgfSk7XHJcbiAgICAgIGFmdGVyRWFjaCgoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICAgIG1vY2tzLmFkYi5yZXN0b3JlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0ZXN0cyg1LCAyKTtcclxuICAgIH0pO1xyXG4gICAgZGVzY3JpYmUoJ2FuZHJvaWQgPDUnLCAoKSA9PiB7XHJcbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRBcGlMZXZlbCcpXHJcbiAgICAgICAgICAucmV0dXJucyg0LjQpO1xyXG4gICAgICB9KTtcclxuICAgICAgYWZ0ZXJFYWNoKCgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnJlc3RvcmUoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRlc3RzKDQuNCwgMSk7XHJcbiAgICB9KTtcclxuICB9KSk7XHJcblxyXG4gIGRlc2NyaWJlKCdwYXJzZVRvdWNoJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBoYW5kbGUgYWN0aW9ucyBzdGFydGluZyB3aXRoIHdhaXQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGxldCBhY3Rpb25zID0gW3thY3Rpb246ICd3YWl0Jywgb3B0aW9uczoge21zOiA1MDB9fSxcclxuICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjogJ3RhcCcsIG9wdGlvbnM6IHt4OiAxMDAsIHk6IDEwMX19XTtcclxuXHJcbiAgICAgIGxldCB0b3VjaFN0YXRlT2JqZWN0ID0gYXdhaXQgZHJpdmVyLnBhcnNlVG91Y2goYWN0aW9ucywgdHJ1ZSk7XHJcbiAgICAgIHRvdWNoU3RhdGVPYmplY3Quc2hvdWxkLmVxbChbe1xyXG4gICAgICAgIGFjdGlvbjogJ3dhaXQnLFxyXG4gICAgICAgIHRpbWU6IDAuNSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGFjdGlvbjogJ3RhcCcsXHJcbiAgICAgICAgdG91Y2g6IHt4OiAxMDAsIHk6IDEwMX0sXHJcbiAgICAgICAgdGltZTogMC41MDUsXHJcbiAgICAgIH1dKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uXFwuLiJ9
