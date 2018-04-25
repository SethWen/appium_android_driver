'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _this2 = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _2 = require('../../..');

var _3 = _interopRequireDefault(_2);

var _libCommandsPerformanceJs = require('../../../lib/commands/performance.js');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _asyncbox = require('asyncbox');

var asyncbox = _interopRequireWildcard(_asyncbox);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var PACKAGE_NAME = 'io.appium.android.apis';
var RETRY_PAUSE = 1000;
var RETRY_COUNT = 2;

var sandbox = _sinon2['default'].sandbox.create();
var adb = undefined;
var driver = undefined;

describe('performance data', function () {
  beforeEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          adb = new _appiumAdb2['default']();
          driver = new _3['default']();
          driver.adb = adb;
          sandbox.stub(adb);
          sandbox.stub(asyncbox, 'retryInterval', function callee$2$0(times, sleepMs, fn) {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(fn());

                case 2:
                  return context$3$0.abrupt('return', context$3$0.sent);

                case 3:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this2);
  });
  afterEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          sandbox.restore();

        case 1:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this2);
  });
  describe('getPerformanceDataTypes', function () {
    it('should get the list of available getPerformance data type', function () {
      var types = driver.getPerformanceDataTypes();
      types.should.eql(_lodash2['default'].keys(_libCommandsPerformanceJs.SUPPORTED_PERFORMANCE_DATA_TYPES));
    });
  });
  describe('getPerformanceData', function () {
    it('should return battery info', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getBatteryInfo').returns('data');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getPerformanceData(null, 'batteryinfo').should.become('data'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should return cpu info', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getCPUInfo').withArgs('pkg').returns('data');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getPerformanceData('pkg', 'cpuinfo').should.become('data'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should return memory info', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getMemoryInfo').withArgs('pkg').returns('data');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getPerformanceData('pkg', 'memoryinfo').should.become('data'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should return network info', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getNetworkTrafficInfo').returns('data');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getPerformanceData(null, 'networkinfo').should.become('data'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should throw error if data type is not valid', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.getPerformanceData(null, 'invalid').should.be.rejectedWith(/No performance data of type 'invalid' found./));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });
  describe('getCPUInfo', function () {
    it('should return cpu data', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.shell.withArgs(['dumpsys', 'cpuinfo', '|', 'grep', '\'' + PACKAGE_NAME + '\'']).returns(' +0% 2209/io.appium.android.apis: 14% user + 23% kernel');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getCPUInfo(PACKAGE_NAME));

          case 3:
            context$3$0.t0 = [_libCommandsPerformanceJs.CPU_KEYS, ['14', '23']];
            context$3$0.sent.should.be.deep.equal(context$3$0.t0);

            asyncbox.retryInterval.calledWith(RETRY_COUNT, RETRY_PAUSE).should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should throw error if no data', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.shell.returns(null);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getCPUInfo(PACKAGE_NAME, 1).should.be.rejectedWith(/No data from dumpsys/));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should throw error if cpu data is not in valid format', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.shell.returns('invalid data');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getCPUInfo(PACKAGE_NAME, 1).should.be.rejectedWith(/Unable to parse cpu data/));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });
  describe('getBatteryInfo', function () {
    it('should return battery info', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.shell.withArgs(['dumpsys', 'battery', '|', 'grep', 'level']).returns('  level: 47');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getBatteryInfo().should.become([_libCommandsPerformanceJs.BATTERY_KEYS, ['47']]));

          case 3:
            asyncbox.retryInterval.calledWith(RETRY_COUNT, RETRY_PAUSE).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should throw error if data is not valid', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.shell.returns('invalid data');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getBatteryInfo(1).should.be.rejectedWith(/Unable to parse battery data/));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should throw error if no data', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.shell.returns(null);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getBatteryInfo(1).should.be.rejectedWith(/No data from dumpsys/));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });
  describe('getMemoryInfo', function () {
    var shellArgs = ['dumpsys', 'meminfo', '\'' + PACKAGE_NAME + '\'', '|', 'grep', '-E', "'Native|Dalvik|EGL|GL|TOTAL'"];
    var dumpsysDataAPI19 = '\n                          Pss  Private  Private  Swapped     Heap     Heap     Heap\n                        Total    Dirty    Clean    Dirty     Size    Alloc     Free\n                       ------   ------   ------   ------   ------   ------   ------\n         Native Heap      107      102        0        0      112      111      555\n         Dalvik Heap      108      103        0        0      555      555      555\n        Dalvik Other      555      555        0        0\n          EGL mtrack      109      104        0      555        0        0        0\n           GL mtrack      110      105        0      555        0        0        0\n               TOTAL      555      555      555        0               555      555\n               TOTAL      106      101      555        0      555      555      555';
    var dumpsysDataAPI18 = '\n                                Shared  Private     Heap     Heap     Heap\n                          Pss    Dirty    Dirty     Size    Alloc     Free\n                       ------   ------   ------   ------   ------   ------\n              Native      107      555      102      112      111      555\n              Dalvik      108      555      103      555      555      555\n                 EGL      109      555      104      555        0        0\n                  GL      110      555      105      555        0        0\n               TOTAL      106      555      101      555      555      555';
    var expectedResult = [_libCommandsPerformanceJs.MEMORY_KEYS, ['101', '102', '103', '104', '105', // private dirty total|native|dalvik|egl|gl
    '106', '107', '108', '109', '110', // pss           total|native|dalvik|egl|gl
    '111', '112']]; // native        heap_alloc|heap_size
    it('should return memory info for API>18', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.getApiLevel.returns(19);
            adb.shell.withArgs(shellArgs).returns(dumpsysDataAPI19);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getMemoryInfo(PACKAGE_NAME));

          case 4:
            context$3$0.t0 = expectedResult;
            context$3$0.sent.should.be.deep.equal(context$3$0.t0);

            asyncbox.retryInterval.calledWith(RETRY_COUNT, RETRY_PAUSE).should.be['true'];

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should return memory info for API<=18', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.getApiLevel.returns(18);
            adb.shell.withArgs(shellArgs).returns(dumpsysDataAPI18);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getMemoryInfo(PACKAGE_NAME));

          case 4:
            context$3$0.t0 = expectedResult;
            context$3$0.sent.should.be.deep.equal(context$3$0.t0);

            asyncbox.retryInterval.calledWith(RETRY_COUNT, RETRY_PAUSE).should.be['true'];

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should throw error if data is not valid', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.shell.returns('TOTAL nodex nodex nodex nodex nodex nodex nodex');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getMemoryInfo(PACKAGE_NAME, 1).should.be.rejectedWith(/Unable to parse memory data/));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should throw error if no data', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.shell.returns(null);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getMemoryInfo(PACKAGE_NAME, 1).should.be.rejectedWith(/No data from dumpsys/));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });
  describe('getNetworkTrafficInfo', function () {
    var shellArgs = ['dumpsys', 'netstats'];
    var header = '\n      Xt stats:\n        Pending bytes: pbytes\n        History since boot:\n        ident=[[type=MOBILE, subType=COMBINED, subscriberId=555]] uid=-1 set=ALL tag=0x0\n          NetworkStatsHistory: bucketDuration=dur';
    var data = header + '\n            st=start1 rb=rb1 rp=rp1 tb=tb1 tp=tp1 op=op1\n            st=start2 rb=rb2 rp=rp2 tb=tb2 tp=tp2 op=op2';
    var dataInOldFormat = header + '\n            bucketStart=start1 activeTime=time1 rxBytes=rb1 rxPackets=rp1 txBytes=tb1 txPackets=tp1 operations=op1\n            bucketStart=start2 activeTime=time2 rxBytes=rb2 rxPackets=rp2 txBytes=tb2 txPackets=tp2 operations=op2';
    it('should return network stats', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.shell.withArgs(shellArgs).returns(data);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getNetworkTrafficInfo());

          case 3:
            context$3$0.t0 = [_libCommandsPerformanceJs.NETWORK_KEYS[1], ['start1', undefined, 'rb1', 'rp1', 'tb1', 'tp1', 'op1', 'dur'], ['start2', undefined, 'rb2', 'rp2', 'tb2', 'tp2', 'op2', 'dur']];
            context$3$0.sent.should.be.deep.equal(context$3$0.t0);

            asyncbox.retryInterval.calledWith(RETRY_COUNT, RETRY_PAUSE).should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should be able to parse data in old format', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.shell.withArgs(shellArgs).returns(dataInOldFormat);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getNetworkTrafficInfo());

          case 3:
            context$3$0.t0 = [_libCommandsPerformanceJs.NETWORK_KEYS[0], ['start1', 'time1', 'rb1', 'rp1', 'tb1', 'tp1', 'op1', 'dur'], ['start2', 'time2', 'rb2', 'rp2', 'tb2', 'tp2', 'op2', 'dur']];
            context$3$0.sent.should.be.deep.equal(context$3$0.t0);

            asyncbox.retryInterval.calledWith(RETRY_COUNT, RETRY_PAUSE).should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should be fulfilled if history is empty', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.shell.returns(header);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getNetworkTrafficInfo());

          case 3:
            context$3$0.t0 = [];
            context$3$0.sent.should.be.deep.equal(context$3$0.t0);

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should throw error if data is not valid', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.shell.returns('nodex');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getNetworkTrafficInfo(1).should.be.rejectedWith(/Unable to parse network traffic data/));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should throw error if no data', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.shell.returns(null);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getNetworkTrafficInfo(1).should.be.rejectedWith(/No data from dumpsys/));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9jb21tYW5kcy9wZXJmb3JtYW5jZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztxQkFDM0IsT0FBTzs7OztpQkFDQyxVQUFVOzs7O3dDQUVULHNDQUFzQzs7c0JBQ25ELFFBQVE7Ozs7eUJBQ04sWUFBWTs7Ozt3QkFDRixVQUFVOztJQUF4QixRQUFROztBQUVwQixrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQU0sWUFBWSxHQUFHLHdCQUF3QixDQUFDO0FBQzlDLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQztBQUN6QixJQUFNLFdBQVcsR0FBRyxDQUFDLENBQUM7O0FBRXRCLElBQUksT0FBTyxHQUFHLG1CQUFNLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNyQyxJQUFJLEdBQUcsWUFBQSxDQUFDO0FBQ1IsSUFBSSxNQUFNLFlBQUEsQ0FBQzs7QUFFWCxRQUFRLENBQUMsa0JBQWtCLEVBQUUsWUFBTTtBQUNqQyxZQUFVLENBQUM7Ozs7OztBQUNULGFBQUcsR0FBRyw0QkFBUyxDQUFDO0FBQ2hCLGdCQUFNLEdBQUcsbUJBQW1CLENBQUM7QUFDN0IsZ0JBQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQ2pCLGlCQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xCLGlCQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxlQUFlLEVBQUUsb0JBQU8sS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFOzs7OzttREFDbEQsRUFBRSxFQUFFOzs7Ozs7Ozs7O1dBQ2xCLENBQUMsQ0FBQzs7Ozs7OztHQUNKLENBQUMsQ0FBQztBQUNILFdBQVMsQ0FBQzs7OztBQUNSLGlCQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7Ozs7Ozs7R0FDbkIsQ0FBQyxDQUFDO0FBQ0gsVUFBUSxDQUFD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SyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQzs2QkFGbEQsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQ2xELEtBQUs7O0FBRVIsb0JBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFLLENBQUM7Ozs7Ozs7S0FDNUUsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLHlDQUF5QyxFQUFFOzs7O0FBQzVDLGVBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs2Q0FDbkIsTUFBTSxDQUFDLHFCQUFxQixFQUFFOzs7NkJBQXVCLEVBQUU7NkJBQXZCLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUs7Ozs7Ozs7S0FDNUQsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLHlDQUF5QyxFQUFFOzs7O0FBQzVDLGVBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs2Q0FDckIsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQzVDLFlBQVksQ0FBQyxzQ0FBc0MsQ0FBQzs7Ozs7OztLQUN4RCxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsK0JBQStCLEVBQUU7Ozs7QUFDbEMsZUFBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7OzZDQUNsQixNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDNUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDOzs7Ozs7O0tBQ3hDLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3VuaXQvY29tbWFuZHMvcGVyZm9ybWFuY2Utc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcclxuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xyXG5pbXBvcnQgc2lub24gZnJvbSAnc2lub24nO1xyXG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLic7XHJcbmltcG9ydCB7IFNVUFBPUlRFRF9QRVJGT1JNQU5DRV9EQVRBX1RZUEVTLCBORVRXT1JLX0tFWVMsIENQVV9LRVlTLCBCQVRURVJZX0tFWVMsXHJcbiAgICAgICAgIE1FTU9SWV9LRVlTfSBmcm9tICcuLi8uLi8uLi9saWIvY29tbWFuZHMvcGVyZm9ybWFuY2UuanMnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgQURCIGZyb20gJ2FwcGl1bS1hZGInO1xyXG5pbXBvcnQgKiBhcyBhc3luY2JveCBmcm9tICdhc3luY2JveCc7XHJcblxyXG5jaGFpLnNob3VsZCgpO1xyXG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XHJcblxyXG5jb25zdCBQQUNLQUdFX05BTUUgPSAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcyc7XHJcbmNvbnN0IFJFVFJZX1BBVVNFID0gMTAwMDtcclxuY29uc3QgUkVUUllfQ09VTlQgPSAyO1xyXG5cclxubGV0IHNhbmRib3ggPSBzaW5vbi5zYW5kYm94LmNyZWF0ZSgpO1xyXG5sZXQgYWRiO1xyXG5sZXQgZHJpdmVyO1xyXG5cclxuZGVzY3JpYmUoJ3BlcmZvcm1hbmNlIGRhdGEnLCAoKSA9PiB7XHJcbiAgYmVmb3JlRWFjaChhc3luYyAoKSA9PiB7XHJcbiAgICBhZGIgPSBuZXcgQURCKCk7XHJcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xyXG4gICAgZHJpdmVyLmFkYiA9IGFkYjtcclxuICAgIHNhbmRib3guc3R1YihhZGIpO1xyXG4gICAgc2FuZGJveC5zdHViKGFzeW5jYm94LCAncmV0cnlJbnRlcnZhbCcsIGFzeW5jICh0aW1lcywgc2xlZXBNcywgZm4pID0+IHtcclxuICAgICAgcmV0dXJuIGF3YWl0IGZuKCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBhZnRlckVhY2goYXN5bmMgKCkgPT4ge1xyXG4gICAgc2FuZGJveC5yZXN0b3JlKCk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ2dldFBlcmZvcm1hbmNlRGF0YVR5cGVzJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBnZXQgdGhlIGxpc3Qgb2YgYXZhaWxhYmxlIGdldFBlcmZvcm1hbmNlIGRhdGEgdHlwZScsICgpID0+IHtcclxuICAgICAgbGV0IHR5cGVzID0gZHJpdmVyLmdldFBlcmZvcm1hbmNlRGF0YVR5cGVzKCk7XHJcbiAgICAgIHR5cGVzLnNob3VsZC5lcWwoXy5rZXlzKFNVUFBPUlRFRF9QRVJGT1JNQU5DRV9EQVRBX1RZUEVTKSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnZ2V0UGVyZm9ybWFuY2VEYXRhJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gYmF0dGVyeSBpbmZvJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnZ2V0QmF0dGVyeUluZm8nKS5yZXR1cm5zKCdkYXRhJyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRQZXJmb3JtYW5jZURhdGEobnVsbCwgJ2JhdHRlcnlpbmZvJykuc2hvdWxkLmJlY29tZSgnZGF0YScpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiBjcHUgaW5mbycsIGFzeW5jICgpID0+IHtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2dldENQVUluZm8nKS53aXRoQXJncygncGtnJykucmV0dXJucygnZGF0YScpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0UGVyZm9ybWFuY2VEYXRhKCdwa2cnLCAnY3B1aW5mbycpLnNob3VsZC5iZWNvbWUoJ2RhdGEnKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gbWVtb3J5IGluZm8nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdnZXRNZW1vcnlJbmZvJykud2l0aEFyZ3MoJ3BrZycpLnJldHVybnMoJ2RhdGEnKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdldFBlcmZvcm1hbmNlRGF0YSgncGtnJywgJ21lbW9yeWluZm8nKS5zaG91bGQuYmVjb21lKCdkYXRhJyk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgcmV0dXJuIG5ldHdvcmsgaW5mbycsIGFzeW5jICgpID0+IHtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2dldE5ldHdvcmtUcmFmZmljSW5mbycpLnJldHVybnMoJ2RhdGEnKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdldFBlcmZvcm1hbmNlRGF0YShudWxsLCAnbmV0d29ya2luZm8nKS5zaG91bGQuYmVjb21lKCdkYXRhJyk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdGhyb3cgZXJyb3IgaWYgZGF0YSB0eXBlIGlzIG5vdCB2YWxpZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdldFBlcmZvcm1hbmNlRGF0YShudWxsLCAnaW52YWxpZCcpXHJcbiAgICAgICAgLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoL05vIHBlcmZvcm1hbmNlIGRhdGEgb2YgdHlwZSAnaW52YWxpZCcgZm91bmQuLyk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnZ2V0Q1BVSW5mbycsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGNwdSBkYXRhJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhZGIuc2hlbGwud2l0aEFyZ3MoWydkdW1wc3lzJywgJ2NwdWluZm8nLCAnfCcsICdncmVwJywgYCcke1BBQ0tBR0VfTkFNRX0nYF0pXHJcbiAgICAgICAgLnJldHVybnMoJyArMCUgMjIwOS9pby5hcHBpdW0uYW5kcm9pZC5hcGlzOiAxNCUgdXNlciArIDIzJSBrZXJuZWwnKTtcclxuICAgICAgKGF3YWl0IGRyaXZlci5nZXRDUFVJbmZvKFBBQ0tBR0VfTkFNRSkpLnNob3VsZC5iZS5kZWVwXHJcbiAgICAgICAgLmVxdWFsKFtDUFVfS0VZUywgWycxNCcsICcyMyddXSk7XHJcbiAgICAgIGFzeW5jYm94LnJldHJ5SW50ZXJ2YWwuY2FsbGVkV2l0aChSRVRSWV9DT1VOVCwgUkVUUllfUEFVU0UpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHRocm93IGVycm9yIGlmIG5vIGRhdGEnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGFkYi5zaGVsbC5yZXR1cm5zKG51bGwpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0Q1BVSW5mbyhQQUNLQUdFX05BTUUsIDEpLnNob3VsZC5iZVxyXG4gICAgICAgIC5yZWplY3RlZFdpdGgoL05vIGRhdGEgZnJvbSBkdW1wc3lzLyk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdGhyb3cgZXJyb3IgaWYgY3B1IGRhdGEgaXMgbm90IGluIHZhbGlkIGZvcm1hdCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgYWRiLnNoZWxsLnJldHVybnMoJ2ludmFsaWQgZGF0YScpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0Q1BVSW5mbyhQQUNLQUdFX05BTUUsIDEpLnNob3VsZC5iZVxyXG4gICAgICAgIC5yZWplY3RlZFdpdGgoL1VuYWJsZSB0byBwYXJzZSBjcHUgZGF0YS8pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ2dldEJhdHRlcnlJbmZvJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gYmF0dGVyeSBpbmZvJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhZGIuc2hlbGwud2l0aEFyZ3MoWydkdW1wc3lzJywgJ2JhdHRlcnknLCAnfCcsICdncmVwJywgJ2xldmVsJ10pXHJcbiAgICAgICAgLnJldHVybnMoJyAgbGV2ZWw6IDQ3Jyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRCYXR0ZXJ5SW5mbygpLnNob3VsZC5iZWNvbWUoW0JBVFRFUllfS0VZUywgWyc0NyddXSk7XHJcbiAgICAgIGFzeW5jYm94LnJldHJ5SW50ZXJ2YWwuY2FsbGVkV2l0aChSRVRSWV9DT1VOVCwgUkVUUllfUEFVU0UpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHRocm93IGVycm9yIGlmIGRhdGEgaXMgbm90IHZhbGlkJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhZGIuc2hlbGwucmV0dXJucygnaW52YWxpZCBkYXRhJyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRCYXR0ZXJ5SW5mbygxKS5zaG91bGQuYmVcclxuICAgICAgICAucmVqZWN0ZWRXaXRoKC9VbmFibGUgdG8gcGFyc2UgYmF0dGVyeSBkYXRhLyk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdGhyb3cgZXJyb3IgaWYgbm8gZGF0YScsIGFzeW5jICgpID0+IHtcclxuICAgICAgYWRiLnNoZWxsLnJldHVybnMobnVsbCk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRCYXR0ZXJ5SW5mbygxKS5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKC9ObyBkYXRhIGZyb20gZHVtcHN5cy8pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ2dldE1lbW9yeUluZm8nLCAoKSA9PiB7XHJcbiAgICBjb25zdCBzaGVsbEFyZ3MgPSBbJ2R1bXBzeXMnLCAnbWVtaW5mbycsIGAnJHtQQUNLQUdFX05BTUV9J2AsICd8JywgJ2dyZXAnLCAnLUUnLCBcIidOYXRpdmV8RGFsdmlrfEVHTHxHTHxUT1RBTCdcIl07XHJcbiAgICBjb25zdCBkdW1wc3lzRGF0YUFQSTE5ID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFBzcyAgUHJpdmF0ZSAgUHJpdmF0ZSAgU3dhcHBlZCAgICAgSGVhcCAgICAgSGVhcCAgICAgSGVhcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUb3RhbCAgICBEaXJ0eSAgICBDbGVhbiAgICBEaXJ0eSAgICAgU2l6ZSAgICBBbGxvYyAgICAgRnJlZVxyXG4gICAgICAgICAgICAgICAgICAgICAgIC0tLS0tLSAgIC0tLS0tLSAgIC0tLS0tLSAgIC0tLS0tLSAgIC0tLS0tLSAgIC0tLS0tLSAgIC0tLS0tLVxyXG4gICAgICAgICBOYXRpdmUgSGVhcCAgICAgIDEwNyAgICAgIDEwMiAgICAgICAgMCAgICAgICAgMCAgICAgIDExMiAgICAgIDExMSAgICAgIDU1NVxyXG4gICAgICAgICBEYWx2aWsgSGVhcCAgICAgIDEwOCAgICAgIDEwMyAgICAgICAgMCAgICAgICAgMCAgICAgIDU1NSAgICAgIDU1NSAgICAgIDU1NVxyXG4gICAgICAgIERhbHZpayBPdGhlciAgICAgIDU1NSAgICAgIDU1NSAgICAgICAgMCAgICAgICAgMFxyXG4gICAgICAgICAgRUdMIG10cmFjayAgICAgIDEwOSAgICAgIDEwNCAgICAgICAgMCAgICAgIDU1NSAgICAgICAgMCAgICAgICAgMCAgICAgICAgMFxyXG4gICAgICAgICAgIEdMIG10cmFjayAgICAgIDExMCAgICAgIDEwNSAgICAgICAgMCAgICAgIDU1NSAgICAgICAgMCAgICAgICAgMCAgICAgICAgMFxyXG4gICAgICAgICAgICAgICBUT1RBTCAgICAgIDU1NSAgICAgIDU1NSAgICAgIDU1NSAgICAgICAgMCAgICAgICAgICAgICAgIDU1NSAgICAgIDU1NVxyXG4gICAgICAgICAgICAgICBUT1RBTCAgICAgIDEwNiAgICAgIDEwMSAgICAgIDU1NSAgICAgICAgMCAgICAgIDU1NSAgICAgIDU1NSAgICAgIDU1NWA7XHJcbiAgICBjb25zdCBkdW1wc3lzRGF0YUFQSTE4ID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNoYXJlZCAgUHJpdmF0ZSAgICAgSGVhcCAgICAgSGVhcCAgICAgSGVhcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFBzcyAgICBEaXJ0eSAgICBEaXJ0eSAgICAgU2l6ZSAgICBBbGxvYyAgICAgRnJlZVxyXG4gICAgICAgICAgICAgICAgICAgICAgIC0tLS0tLSAgIC0tLS0tLSAgIC0tLS0tLSAgIC0tLS0tLSAgIC0tLS0tLSAgIC0tLS0tLVxyXG4gICAgICAgICAgICAgIE5hdGl2ZSAgICAgIDEwNyAgICAgIDU1NSAgICAgIDEwMiAgICAgIDExMiAgICAgIDExMSAgICAgIDU1NVxyXG4gICAgICAgICAgICAgIERhbHZpayAgICAgIDEwOCAgICAgIDU1NSAgICAgIDEwMyAgICAgIDU1NSAgICAgIDU1NSAgICAgIDU1NVxyXG4gICAgICAgICAgICAgICAgIEVHTCAgICAgIDEwOSAgICAgIDU1NSAgICAgIDEwNCAgICAgIDU1NSAgICAgICAgMCAgICAgICAgMFxyXG4gICAgICAgICAgICAgICAgICBHTCAgICAgIDExMCAgICAgIDU1NSAgICAgIDEwNSAgICAgIDU1NSAgICAgICAgMCAgICAgICAgMFxyXG4gICAgICAgICAgICAgICBUT1RBTCAgICAgIDEwNiAgICAgIDU1NSAgICAgIDEwMSAgICAgIDU1NSAgICAgIDU1NSAgICAgIDU1NWA7XHJcbiAgICBjb25zdCBleHBlY3RlZFJlc3VsdCA9IFtNRU1PUllfS0VZUyxcclxuICAgICAgWycxMDEnLCAnMTAyJywgJzEwMycsICcxMDQnLCAnMTA1JywgLy8gcHJpdmF0ZSBkaXJ0eSB0b3RhbHxuYXRpdmV8ZGFsdmlrfGVnbHxnbFxyXG4gICAgICAgJzEwNicsICcxMDcnLCAnMTA4JywgJzEwOScsICcxMTAnLCAvLyBwc3MgICAgICAgICAgIHRvdGFsfG5hdGl2ZXxkYWx2aWt8ZWdsfGdsXHJcbiAgICAgICAnMTExJywgJzExMiddXTsgICAgICAgICAgICAgICAgICAgIC8vIG5hdGl2ZSAgICAgICAgaGVhcF9hbGxvY3xoZWFwX3NpemVcclxuICAgIGl0KCdzaG91bGQgcmV0dXJuIG1lbW9yeSBpbmZvIGZvciBBUEk+MTgnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGFkYi5nZXRBcGlMZXZlbC5yZXR1cm5zKDE5KTtcclxuICAgICAgYWRiLnNoZWxsLndpdGhBcmdzKHNoZWxsQXJncykucmV0dXJucyhkdW1wc3lzRGF0YUFQSTE5KTtcclxuICAgICAgKGF3YWl0IGRyaXZlci5nZXRNZW1vcnlJbmZvKFBBQ0tBR0VfTkFNRSkpLnNob3VsZC5iZS5kZWVwXHJcbiAgICAgICAgLmVxdWFsKGV4cGVjdGVkUmVzdWx0KTtcclxuICAgICAgYXN5bmNib3gucmV0cnlJbnRlcnZhbC5jYWxsZWRXaXRoKFJFVFJZX0NPVU5ULCBSRVRSWV9QQVVTRSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgcmV0dXJuIG1lbW9yeSBpbmZvIGZvciBBUEk8PTE4JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhZGIuZ2V0QXBpTGV2ZWwucmV0dXJucygxOCk7XHJcbiAgICAgIGFkYi5zaGVsbC53aXRoQXJncyhzaGVsbEFyZ3MpLnJldHVybnMoZHVtcHN5c0RhdGFBUEkxOCk7XHJcbiAgICAgIChhd2FpdCBkcml2ZXIuZ2V0TWVtb3J5SW5mbyhQQUNLQUdFX05BTUUpKS5zaG91bGQuYmUuZGVlcFxyXG4gICAgICAgIC5lcXVhbChleHBlY3RlZFJlc3VsdCk7XHJcbiAgICAgIGFzeW5jYm94LnJldHJ5SW50ZXJ2YWwuY2FsbGVkV2l0aChSRVRSWV9DT1VOVCwgUkVUUllfUEFVU0UpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHRocm93IGVycm9yIGlmIGRhdGEgaXMgbm90IHZhbGlkJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhZGIuc2hlbGwucmV0dXJucygnVE9UQUwgbm9kZXggbm9kZXggbm9kZXggbm9kZXggbm9kZXggbm9kZXggbm9kZXgnKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdldE1lbW9yeUluZm8oUEFDS0FHRV9OQU1FLCAxKS5zaG91bGQuYmVcclxuICAgICAgICAucmVqZWN0ZWRXaXRoKC9VbmFibGUgdG8gcGFyc2UgbWVtb3J5IGRhdGEvKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBlcnJvciBpZiBubyBkYXRhJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhZGIuc2hlbGwucmV0dXJucyhudWxsKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdldE1lbW9yeUluZm8oUEFDS0FHRV9OQU1FLCAxKS5zaG91bGQuYmVcclxuICAgICAgICAucmVqZWN0ZWRXaXRoKC9ObyBkYXRhIGZyb20gZHVtcHN5cy8pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ2dldE5ldHdvcmtUcmFmZmljSW5mbycsICgpID0+IHtcclxuICAgIGNvbnN0IHNoZWxsQXJncyA9IFsnZHVtcHN5cycsICduZXRzdGF0cyddO1xyXG4gICAgY29uc3QgaGVhZGVyID0gYFxyXG4gICAgICBYdCBzdGF0czpcclxuICAgICAgICBQZW5kaW5nIGJ5dGVzOiBwYnl0ZXNcclxuICAgICAgICBIaXN0b3J5IHNpbmNlIGJvb3Q6XHJcbiAgICAgICAgaWRlbnQ9W1t0eXBlPU1PQklMRSwgc3ViVHlwZT1DT01CSU5FRCwgc3Vic2NyaWJlcklkPTU1NV1dIHVpZD0tMSBzZXQ9QUxMIHRhZz0weDBcclxuICAgICAgICAgIE5ldHdvcmtTdGF0c0hpc3Rvcnk6IGJ1Y2tldER1cmF0aW9uPWR1cmA7XHJcbiAgICBjb25zdCBkYXRhID0gaGVhZGVyICsgYFxyXG4gICAgICAgICAgICBzdD1zdGFydDEgcmI9cmIxIHJwPXJwMSB0Yj10YjEgdHA9dHAxIG9wPW9wMVxyXG4gICAgICAgICAgICBzdD1zdGFydDIgcmI9cmIyIHJwPXJwMiB0Yj10YjIgdHA9dHAyIG9wPW9wMmA7XHJcbiAgICBjb25zdCBkYXRhSW5PbGRGb3JtYXQgPSBoZWFkZXIgKyBgXHJcbiAgICAgICAgICAgIGJ1Y2tldFN0YXJ0PXN0YXJ0MSBhY3RpdmVUaW1lPXRpbWUxIHJ4Qnl0ZXM9cmIxIHJ4UGFja2V0cz1ycDEgdHhCeXRlcz10YjEgdHhQYWNrZXRzPXRwMSBvcGVyYXRpb25zPW9wMVxyXG4gICAgICAgICAgICBidWNrZXRTdGFydD1zdGFydDIgYWN0aXZlVGltZT10aW1lMiByeEJ5dGVzPXJiMiByeFBhY2tldHM9cnAyIHR4Qnl0ZXM9dGIyIHR4UGFja2V0cz10cDIgb3BlcmF0aW9ucz1vcDJgO1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gbmV0d29yayBzdGF0cycsIGFzeW5jICgpID0+IHtcclxuICAgICAgYWRiLnNoZWxsLndpdGhBcmdzKHNoZWxsQXJncykucmV0dXJucyhkYXRhKTtcclxuICAgICAgKGF3YWl0IGRyaXZlci5nZXROZXR3b3JrVHJhZmZpY0luZm8oKSkuc2hvdWxkLmJlLmRlZXBcclxuICAgICAgICAuZXF1YWwoW05FVFdPUktfS0VZU1sxXSwgWydzdGFydDEnLCB1bmRlZmluZWQsICdyYjEnLCAncnAxJywgJ3RiMScsICd0cDEnLCAnb3AxJywgJ2R1ciddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbJ3N0YXJ0MicsIHVuZGVmaW5lZCwgJ3JiMicsICdycDInLCAndGIyJywgJ3RwMicsICdvcDInLCAnZHVyJ11dKTtcclxuICAgICAgYXN5bmNib3gucmV0cnlJbnRlcnZhbC5jYWxsZWRXaXRoKFJFVFJZX0NPVU5ULCBSRVRSWV9QQVVTRSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBwYXJzZSBkYXRhIGluIG9sZCBmb3JtYXQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGFkYi5zaGVsbC53aXRoQXJncyhzaGVsbEFyZ3MpLnJldHVybnMoZGF0YUluT2xkRm9ybWF0KTtcclxuICAgICAgKGF3YWl0IGRyaXZlci5nZXROZXR3b3JrVHJhZmZpY0luZm8oKSkuc2hvdWxkLmJlLmRlZXBcclxuICAgICAgICAuZXF1YWwoW05FVFdPUktfS0VZU1swXSwgWydzdGFydDEnLCAndGltZTEnLCAncmIxJywgJ3JwMScsICd0YjEnLCAndHAxJywgJ29wMScsICdkdXInXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWydzdGFydDInLCAndGltZTInLCAncmIyJywgJ3JwMicsICd0YjInLCAndHAyJywgJ29wMicsICdkdXInXV0pO1xyXG4gICAgICBhc3luY2JveC5yZXRyeUludGVydmFsLmNhbGxlZFdpdGgoUkVUUllfQ09VTlQsIFJFVFJZX1BBVVNFKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBiZSBmdWxmaWxsZWQgaWYgaGlzdG9yeSBpcyBlbXB0eScsIGFzeW5jICgpID0+IHtcclxuICAgICAgYWRiLnNoZWxsLnJldHVybnMoaGVhZGVyKTtcclxuICAgICAgKGF3YWl0IGRyaXZlci5nZXROZXR3b3JrVHJhZmZpY0luZm8oKSkuc2hvdWxkLmJlLmRlZXAuZXF1YWwoW10pO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHRocm93IGVycm9yIGlmIGRhdGEgaXMgbm90IHZhbGlkJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhZGIuc2hlbGwucmV0dXJucygnbm9kZXgnKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdldE5ldHdvcmtUcmFmZmljSW5mbygxKS5zaG91bGQuYmVcclxuICAgICAgICAucmVqZWN0ZWRXaXRoKC9VbmFibGUgdG8gcGFyc2UgbmV0d29yayB0cmFmZmljIGRhdGEvKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBlcnJvciBpZiBubyBkYXRhJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhZGIuc2hlbGwucmV0dXJucyhudWxsKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdldE5ldHdvcmtUcmFmZmljSW5mbygxKS5zaG91bGQuYmVcclxuICAgICAgICAucmVqZWN0ZWRXaXRoKC9ObyBkYXRhIGZyb20gZHVtcHN5cy8pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi5cXC4uIn0=
