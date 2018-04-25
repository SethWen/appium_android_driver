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
  appActivity: '.view.SplitTouchView'
}, _desired2['default']);

describe('apidemo - touch - multi-actions', function () {
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
  it('should scroll two different lists', function callee$1$0() {
    var lists, leftList, rightList, leftGestures, rightGestures;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.ListView', true));

        case 2:
          lists = context$2$0.sent;
          leftList = lists[0].ELEMENT;
          rightList = lists[1].ELEMENT;
          leftGestures = [{ action: 'press', options: { element: leftList } }, { action: 'moveTo', options: { element: leftList, x: 10, y: 0 } }, { action: 'moveTo', options: { element: leftList, x: 10, y: -75 } }, { action: 'moveTo', options: { element: leftList, x: 10, y: -150 } }];
          rightGestures = [{ action: 'press', options: { element: rightList } }, { action: 'moveTo', options: { element: rightList, x: 10, y: 0 } }, { action: 'moveTo', options: { element: rightList, x: 10, y: -75 } }, { action: 'moveTo', options: { element: rightList, x: 10, y: -150 } }];
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(driver.performMultiAction([leftGestures, rightGestures]));

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy90b3VjaC9tdWx0aS1hY3Rpb24tZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7c0JBQy9CLFFBQVE7Ozs7aUJBQ0ksYUFBYTs7Ozt1QkFDZCxlQUFlOzs7O0FBR3hDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBSSxJQUFJLEdBQUcsb0JBQUUsUUFBUSxDQUFDO0FBQ3BCLGFBQVcsRUFBRSxzQkFBc0I7Q0FDcEMsdUJBQWUsQ0FBQzs7QUFFakIsUUFBUSxDQUFDLGlDQUFpQyxFQUFFLFlBQVk7OztBQUN0RCxNQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsUUFBTSxDQUFDOzs7O0FBQ0wsZ0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7MkNBQ3ZCLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDOzs7Ozs7O0dBQ2pDLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUM3QixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsbUNBQW1DLEVBQUU7UUFDbEMsS0FBSyxFQUNMLFFBQVEsRUFDUixTQUFTLEVBQ1QsWUFBWSxFQU1aLGFBQWE7Ozs7OzJDQVRDLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLHlCQUF5QixFQUFFLElBQUksQ0FBQzs7O0FBQS9FLGVBQUs7QUFDTCxrQkFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPO0FBQzNCLG1CQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87QUFDNUIsc0JBQVksR0FBRyxDQUNqQixFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBQyxFQUFDLEVBQy9DLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQzdELEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLEVBQUMsRUFDL0QsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUMsRUFBQyxDQUNqRTtBQUNHLHVCQUFhLEdBQUcsQ0FDbEIsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUMsRUFBQyxFQUNoRCxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUM5RCxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxFQUFDLEVBQ2hFLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFDLEVBQUMsQ0FDbEU7OzJDQUNLLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQzs7Ozs7OztHQUMvRCxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL3RvdWNoL211bHRpLWFjdGlvbi1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcclxuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLi8uLic7XHJcbmltcG9ydCBERUZBVUxUX0NBUFMgZnJvbSAnLi4vLi4vZGVzaXJlZCc7XHJcblxyXG5cclxuY2hhaS5zaG91bGQoKTtcclxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xyXG5cclxubGV0IGNhcHMgPSBfLmRlZmF1bHRzKHtcclxuICBhcHBBY3Rpdml0eTogJy52aWV3LlNwbGl0VG91Y2hWaWV3J1xyXG59LCBERUZBVUxUX0NBUFMpO1xyXG5cclxuZGVzY3JpYmUoJ2FwaWRlbW8gLSB0b3VjaCAtIG11bHRpLWFjdGlvbnMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgbGV0IGRyaXZlcjtcclxuICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xyXG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcclxuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpO1xyXG4gIH0pO1xyXG4gIGFmdGVyKGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBzY3JvbGwgdHdvIGRpZmZlcmVudCBsaXN0cycsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCBsaXN0cyA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnY2xhc3MgbmFtZScsICdhbmRyb2lkLndpZGdldC5MaXN0VmlldycsIHRydWUpO1xyXG4gICAgbGV0IGxlZnRMaXN0ID0gbGlzdHNbMF0uRUxFTUVOVDtcclxuICAgIGxldCByaWdodExpc3QgPSBsaXN0c1sxXS5FTEVNRU5UO1xyXG4gICAgbGV0IGxlZnRHZXN0dXJlcyA9IFtcclxuICAgICAge2FjdGlvbjogJ3ByZXNzJywgb3B0aW9uczoge2VsZW1lbnQ6IGxlZnRMaXN0fX0sXHJcbiAgICAgIHthY3Rpb246ICdtb3ZlVG8nLCBvcHRpb25zOiB7ZWxlbWVudDogbGVmdExpc3QsIHg6IDEwLCB5OiAwfX0sXHJcbiAgICAgIHthY3Rpb246ICdtb3ZlVG8nLCBvcHRpb25zOiB7ZWxlbWVudDogbGVmdExpc3QsIHg6IDEwLCB5OiAtNzV9fSxcclxuICAgICAge2FjdGlvbjogJ21vdmVUbycsIG9wdGlvbnM6IHtlbGVtZW50OiBsZWZ0TGlzdCwgeDogMTAsIHk6IC0xNTB9fVxyXG4gICAgXTtcclxuICAgIGxldCByaWdodEdlc3R1cmVzID0gW1xyXG4gICAgICB7YWN0aW9uOiAncHJlc3MnLCBvcHRpb25zOiB7ZWxlbWVudDogcmlnaHRMaXN0fX0sXHJcbiAgICAgIHthY3Rpb246ICdtb3ZlVG8nLCBvcHRpb25zOiB7ZWxlbWVudDogcmlnaHRMaXN0LCB4OiAxMCwgeTogMH19LFxyXG4gICAgICB7YWN0aW9uOiAnbW92ZVRvJywgb3B0aW9uczoge2VsZW1lbnQ6IHJpZ2h0TGlzdCwgeDogMTAsIHk6IC03NX19LFxyXG4gICAgICB7YWN0aW9uOiAnbW92ZVRvJywgb3B0aW9uczoge2VsZW1lbnQ6IHJpZ2h0TGlzdCwgeDogMTAsIHk6IC0xNTB9fVxyXG4gICAgXTtcclxuICAgIGF3YWl0IGRyaXZlci5wZXJmb3JtTXVsdGlBY3Rpb24oW2xlZnRHZXN0dXJlcywgcmlnaHRHZXN0dXJlc10pO1xyXG4gIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uXFwuLlxcLi4ifQ==
