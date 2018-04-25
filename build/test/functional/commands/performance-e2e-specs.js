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

var _libCommandsPerformance = require('../../../lib/commands/performance');

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

describe('performance', function () {
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

  describe('getPerformanceData', function () {
    it('should get the performancedata', function callee$2$0() {
      var capability;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.getPerformanceDataTypes());

          case 2:
            capability = context$3$0.sent;

            capability.should.eql(_lodash2['default'].keys(_libCommandsPerformance.SUPPORTED_PERFORMANCE_DATA_TYPES));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should throw an Error for unsupported capability data type ', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.getPerformanceData(caps.appPackage, 'randominfo', 2).should.be.rejected);

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should get the amount of cpu by user and kernel process', function callee$2$0() {
      var apiLevel, cpu, i;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.adb.getApiLevel());

          case 2:
            apiLevel = context$3$0.sent;

            if (!([21, 24, 25].indexOf(apiLevel) >= 0)) {
              context$3$0.next = 5;
              break;
            }

            return context$3$0.abrupt('return', this.skip());

          case 5:
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(driver.getPerformanceData(caps.appPackage, 'cpuinfo', 50));

          case 7:
            cpu = context$3$0.sent;

            Array.isArray(cpu).should.be['true'];
            cpu.length.should.be.above(1);
            cpu[0].should.eql(_libCommandsPerformance.CPU_KEYS);
            if (cpu.length > 1) {
              for (i = 1; i < cpu.length; i++) {
                cpu[0].length.should.equal(cpu[i].length);
              }
            }

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should get the amount of memory used by the process', function callee$2$0() {
      var memory, i;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.getPerformanceData(caps.appPackage, 'memoryinfo', 2));

          case 2:
            memory = context$3$0.sent;

            Array.isArray(memory).should.be['true'];
            memory.length.should.be.above(1);
            memory[0].should.eql(_libCommandsPerformance.MEMORY_KEYS);
            if (memory.length > 1) {
              for (i = 1; i < memory.length; i++) {
                memory[0].length.should.equal(memory[i].length);
              }
            }

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get the remaining battery power', function callee$2$0() {
      var battery, i;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.getPerformanceData(caps.appPackage, 'batteryinfo', 2));

          case 2:
            battery = context$3$0.sent;

            Array.isArray(battery).should.be['true'];
            battery.length.should.be.above(1);
            battery[0].should.eql(_libCommandsPerformance.BATTERY_KEYS);
            if (battery.length > 1) {
              for (i = 1; i < battery.length; i++) {
                battery[0].length.should.equal(battery[i].length);
              }
            }

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get the network statistics', function callee$2$0() {
      var network, compare, j, i;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.adb.getApiLevel());

          case 2:
            context$3$0.t0 = context$3$0.sent;

            if (!(context$3$0.t0 === 22)) {
              context$3$0.next = 5;
              break;
            }

            return context$3$0.abrupt('return', this.skip());

          case 5:
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(driver.getPerformanceData(caps.appPackage, 'networkinfo', 2));

          case 7:
            network = context$3$0.sent;

            Array.isArray(network).should.be['true'];
            network.length.should.be.above(1);

            compare = false;

            for (j = 0; j < _libCommandsPerformance.NETWORK_KEYS.length; ++j) {
              if (_lodash2['default'].isEqual(_libCommandsPerformance.NETWORK_KEYS[j], network[0])) {
                compare = true;
              }
            }

            compare.should.equal(true);

            if (network.length > 1) {
              for (i = 1; i < network.length; ++i) {
                network[0].length.should.equal(network[i].length);
              }
            }

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});

// TODO: why does this fail?

// TODO: why does adb fail with a null pointer exception on 5.1
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9wZXJmb3JtYW5jZS1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2lCQUNuQixVQUFVOzs7O3NDQUNnRSxtQ0FBbUM7O3NCQUN6SCxRQUFROzs7O3VCQUNHLFlBQVk7Ozs7QUFHckMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxJQUFJLEdBQUcsb0JBQUUsUUFBUSxDQUFDO0FBQ3BCLFlBQVUsRUFBRSx3QkFBd0I7QUFDcEMsYUFBVyxFQUFFLGtCQUFrQjtDQUNoQyx1QkFBZSxDQUFDOztBQUVqQixRQUFRLENBQUMsYUFBYSxFQUFFLFlBQU07QUFDNUIsUUFBTSxDQUFDOzs7O0FBQ0wsZ0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7MkNBQ3ZCLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDOzs7Ozs7O0dBQ2pDLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUM3QixDQUFDLENBQUM7O0FBRUgsVUFBUSxDQUFDLG9CQUFvQixFQUFFLFlBQU07QUFDbkMsTUFBRSxDQUFDLGdDQUFnQyxFQUFFO1VBQy9CLFVBQVU7Ozs7OzZDQUFTLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRTs7O0FBQW5ELHNCQUFVOztBQUNkLHNCQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQkFBRSxJQUFJLDBEQUFrQyxDQUFDLENBQUM7Ozs7Ozs7S0FDakUsQ0FBQyxDQUFDOztBQUVILE1BQUUsQ0FBQyw2REFBNkQsRUFBRTs7Ozs7NkNBQzFELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVE7Ozs7Ozs7S0FDckYsQ0FBQyxDQUFDOztBQUVILE1BQUUsQ0FBQyx5REFBeUQsRUFBRTtVQUV4RCxRQUFRLEVBSVIsR0FBRyxFQU1JLENBQUM7Ozs7OzZDQVZTLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFOzs7QUFBekMsb0JBQVE7O2tCQUNSLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBOzs7OztnREFDOUIsSUFBSSxDQUFDLElBQUksRUFBRTs7Ozs2Q0FFSixNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDOzs7QUFBckUsZUFBRzs7QUFFUCxpQkFBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFLLENBQUM7QUFDbEMsZUFBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5QixlQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsa0NBQVUsQ0FBQztBQUM1QixnQkFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUNsQixtQkFBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ25DLG1CQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2VBQzNDO2FBQ0Y7Ozs7Ozs7S0FDRixDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMscURBQXFELEVBQUU7VUFDcEQsTUFBTSxFQU1DLENBQUM7Ozs7OzZDQU5PLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7OztBQUExRSxrQkFBTTs7QUFFVixpQkFBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFLLENBQUM7QUFDckMsa0JBQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakMsa0JBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxxQ0FBYSxDQUFDO0FBQ2xDLGdCQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ3JCLG1CQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDdEMsc0JBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7ZUFDakQ7YUFDRjs7Ozs7OztLQUNGLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyx3Q0FBd0MsRUFBRTtVQUN2QyxPQUFPLEVBTUEsQ0FBQzs7Ozs7NkNBTlEsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQzs7O0FBQTVFLG1CQUFPOztBQUVYLGlCQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQUssQ0FBQztBQUN0QyxtQkFBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQyxtQkFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLHNDQUFjLENBQUM7QUFDcEMsZ0JBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDdEIsbUJBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN2Qyx1QkFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztlQUNuRDthQUNGOzs7Ozs7O0tBQ0YsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLG1DQUFtQyxFQUFFO1VBS2xDLE9BQU8sRUFLUCxPQUFPLEVBQ0YsQ0FBQyxFQVNDLENBQUM7Ozs7OzZDQWxCRixNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRTs7Ozs7cUNBQUssRUFBRTs7Ozs7Z0RBQ2hDLElBQUksQ0FBQyxJQUFJLEVBQUU7Ozs7NkNBRUEsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQzs7O0FBQTVFLG1CQUFPOztBQUVYLGlCQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQUssQ0FBQztBQUN0QyxtQkFBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFOUIsbUJBQU8sR0FBRyxLQUFLOztBQUNuQixpQkFBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxxQ0FBYSxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUU7QUFDNUMsa0JBQUksb0JBQUUsT0FBTyxDQUFDLHFDQUFhLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQzFDLHVCQUFPLEdBQUcsSUFBSSxDQUFDO2VBQ2hCO2FBQ0Y7O0FBRUQsbUJBQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUUzQixnQkFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUN0QixtQkFBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFO0FBQ3ZDLHVCQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2VBQ25EO2FBQ0Y7Ozs7Ozs7S0FDRixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL3BlcmZvcm1hbmNlLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xyXG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XHJcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uJztcclxuaW1wb3J0IHsgU1VQUE9SVEVEX1BFUkZPUk1BTkNFX0RBVEFfVFlQRVMsIENQVV9LRVlTLCBNRU1PUllfS0VZUywgQkFUVEVSWV9LRVlTLCBORVRXT1JLX0tFWVMgfSBmcm9tICcuLi8uLi8uLi9saWIvY29tbWFuZHMvcGVyZm9ybWFuY2UnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgREVGQVVMVF9DQVBTIGZyb20gJy4uL2Rlc2lyZWQnO1xyXG5cclxuXHJcbmNoYWkuc2hvdWxkKCk7XHJcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcclxuXHJcbmxldCBkcml2ZXI7XHJcbmxldCBjYXBzID0gXy5kZWZhdWx0cyh7XHJcbiAgYXBwUGFja2FnZTogJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnLFxyXG4gIGFwcEFjdGl2aXR5OiAnLnZpZXcuVGV4dEZpZWxkcydcclxufSwgREVGQVVMVF9DQVBTKTtcclxuXHJcbmRlc2NyaWJlKCdwZXJmb3JtYW5jZScsICgpID0+IHtcclxuICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xyXG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcclxuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpO1xyXG4gIH0pO1xyXG4gIGFmdGVyKGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XHJcbiAgfSk7XHJcblxyXG4gIGRlc2NyaWJlKCdnZXRQZXJmb3JtYW5jZURhdGEnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGdldCB0aGUgcGVyZm9ybWFuY2VkYXRhJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgY2FwYWJpbGl0eSA9IGF3YWl0IGRyaXZlci5nZXRQZXJmb3JtYW5jZURhdGFUeXBlcygpO1xyXG4gICAgICBjYXBhYmlsaXR5LnNob3VsZC5lcWwoXy5rZXlzKFNVUFBPUlRFRF9QRVJGT1JNQU5DRV9EQVRBX1RZUEVTKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIHRocm93IGFuIEVycm9yIGZvciB1bnN1cHBvcnRlZCBjYXBhYmlsaXR5IGRhdGEgdHlwZSAnLCBhc3luYyAgKCkgPT4ge1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0UGVyZm9ybWFuY2VEYXRhKGNhcHMuYXBwUGFja2FnZSwgJ3JhbmRvbWluZm8nLCAyKS5zaG91bGQuYmUucmVqZWN0ZWQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIGdldCB0aGUgYW1vdW50IG9mIGNwdSBieSB1c2VyIGFuZCBrZXJuZWwgcHJvY2VzcycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgLy8gVE9ETzogd2h5IGRvZXMgdGhpcyBmYWlsP1xyXG4gICAgICBsZXQgYXBpTGV2ZWwgPSBhd2FpdCBkcml2ZXIuYWRiLmdldEFwaUxldmVsKCk7XHJcbiAgICAgIGlmIChbMjEsIDI0LCAyNV0uaW5kZXhPZihhcGlMZXZlbCkgPj0gMCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNraXAoKTtcclxuICAgICAgfVxyXG4gICAgICBsZXQgY3B1ID0gYXdhaXQgZHJpdmVyLmdldFBlcmZvcm1hbmNlRGF0YShjYXBzLmFwcFBhY2thZ2UsICdjcHVpbmZvJywgNTApO1xyXG5cclxuICAgICAgQXJyYXkuaXNBcnJheShjcHUpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBjcHUubGVuZ3RoLnNob3VsZC5iZS5hYm92ZSgxKTtcclxuICAgICAgY3B1WzBdLnNob3VsZC5lcWwoQ1BVX0tFWVMpO1xyXG4gICAgICBpZiAoY3B1Lmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGNwdS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgY3B1WzBdLmxlbmd0aC5zaG91bGQuZXF1YWwoY3B1W2ldLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgZ2V0IHRoZSBhbW91bnQgb2YgbWVtb3J5IHVzZWQgYnkgdGhlIHByb2Nlc3MnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGxldCBtZW1vcnkgPSBhd2FpdCBkcml2ZXIuZ2V0UGVyZm9ybWFuY2VEYXRhKGNhcHMuYXBwUGFja2FnZSwgJ21lbW9yeWluZm8nLCAyKTtcclxuXHJcbiAgICAgIEFycmF5LmlzQXJyYXkobWVtb3J5KS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgbWVtb3J5Lmxlbmd0aC5zaG91bGQuYmUuYWJvdmUoMSk7XHJcbiAgICAgIG1lbW9yeVswXS5zaG91bGQuZXFsKE1FTU9SWV9LRVlTKTtcclxuICAgICAgaWYgKG1lbW9yeS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBtZW1vcnkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIG1lbW9yeVswXS5sZW5ndGguc2hvdWxkLmVxdWFsKG1lbW9yeVtpXS5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGdldCB0aGUgcmVtYWluaW5nIGJhdHRlcnkgcG93ZXInLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGxldCBiYXR0ZXJ5ID0gYXdhaXQgZHJpdmVyLmdldFBlcmZvcm1hbmNlRGF0YShjYXBzLmFwcFBhY2thZ2UsICdiYXR0ZXJ5aW5mbycsIDIpO1xyXG5cclxuICAgICAgQXJyYXkuaXNBcnJheShiYXR0ZXJ5KS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgYmF0dGVyeS5sZW5ndGguc2hvdWxkLmJlLmFib3ZlKDEpO1xyXG4gICAgICBiYXR0ZXJ5WzBdLnNob3VsZC5lcWwoQkFUVEVSWV9LRVlTKTtcclxuICAgICAgaWYgKGJhdHRlcnkubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgYmF0dGVyeS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgYmF0dGVyeVswXS5sZW5ndGguc2hvdWxkLmVxdWFsKGJhdHRlcnlbaV0ubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBnZXQgdGhlIG5ldHdvcmsgc3RhdGlzdGljcycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgLy8gVE9ETzogd2h5IGRvZXMgYWRiIGZhaWwgd2l0aCBhIG51bGwgcG9pbnRlciBleGNlcHRpb24gb24gNS4xXHJcbiAgICAgIGlmIChhd2FpdCBkcml2ZXIuYWRiLmdldEFwaUxldmVsKCkgPT09IDIyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2tpcCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBuZXR3b3JrID0gYXdhaXQgZHJpdmVyLmdldFBlcmZvcm1hbmNlRGF0YShjYXBzLmFwcFBhY2thZ2UsICduZXR3b3JraW5mbycsIDIpO1xyXG5cclxuICAgICAgQXJyYXkuaXNBcnJheShuZXR3b3JrKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgbmV0d29yay5sZW5ndGguc2hvdWxkLmJlLmFib3ZlKDEpO1xyXG5cclxuICAgICAgbGV0IGNvbXBhcmUgPSBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBORVRXT1JLX0tFWVMubGVuZ3RoOyArK2opIHtcclxuICAgICAgICBpZiAoXy5pc0VxdWFsKE5FVFdPUktfS0VZU1tqXSwgbmV0d29ya1swXSkpIHtcclxuICAgICAgICAgIGNvbXBhcmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY29tcGFyZS5zaG91bGQuZXF1YWwodHJ1ZSk7XHJcblxyXG4gICAgICBpZiAobmV0d29yay5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBuZXR3b3JrLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICBuZXR3b3JrWzBdLmxlbmd0aC5zaG91bGQuZXF1YWwobmV0d29ya1tpXS5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi5cXC4uIn0=
