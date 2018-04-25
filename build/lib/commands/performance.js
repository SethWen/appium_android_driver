'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Number$isNaN = require('babel-runtime/core-js/number/is-nan')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _asyncbox = require('asyncbox');

var commands = {},
    helpers = {},
    extensions = {};

var NETWORK_KEYS = [['bucketStart', 'activeTime', 'rxBytes', 'rxPackets', 'txBytes', 'txPackets', 'operations', 'bucketDuration'], ['st', 'activeTime', 'rb', 'rp', 'tb', 'tp', 'op', 'bucketDuration']];
var CPU_KEYS = ['user', 'kernel'];
var BATTERY_KEYS = ['power'];
var MEMORY_KEYS = ['totalPrivateDirty', 'nativePrivateDirty', 'dalvikPrivateDirty', 'eglPrivateDirty', 'glPrivateDirty', 'totalPss', 'nativePss', 'dalvikPss', 'eglPss', 'glPss', 'nativeHeapAllocatedSize', 'nativeHeapSize'];

var SUPPORTED_PERFORMANCE_DATA_TYPES = {
  cpuinfo: 'the amount of cpu by user and kernel process - cpu information for applications on real devices and simulators',
  memoryinfo: 'the amount of memory used by the process - memory information for applications on real devices and simulators',
  batteryinfo: 'the remaining battery power - battery power information for applications on real devices and simulators',
  networkinfo: 'the network statistics - network rx/tx information for applications on real devices and simulators'
};

var RETRY_PAUSE = 1000;

//
// returns the information type of the system state which is supported to read as like cpu, memory, network traffic, and battery.
// output - array like below
//[cpuinfo, batteryinfo, networkinfo, memoryinfo]
//
commands.getPerformanceDataTypes = function () {
  return _lodash2['default'].keys(SUPPORTED_PERFORMANCE_DATA_TYPES);
};

// returns the information type of the system state which is supported to read as like cpu, memory, network traffic, and battery.
//input - (packageName) the package name of the application
//        (dataType) the type of system state which wants to read. It should be one of the keys of the SUPPORTED_PERFORMANCE_DATA_TYPES
//        (dataReadTimeout) the number of attempts to read
// output - table of the performance data, The first line of the table represents the type of data. The remaining lines represent the values of the data.
//
// in case of battery info : [[power], [23]]
// in case of memory info :  [[totalPrivateDirty, nativePrivateDirty, dalvikPrivateDirty, eglPrivateDirty, glPrivateDirty, totalPss, nativePss, dalvikPss, eglPss, glPss, nativeHeapAllocatedSize, nativeHeapSize], [18360, 8296, 6132, null, null, 42588, 8406, 7024, null, null, 26519, 10344]]
// in case of network info : [[bucketStart, activeTime, rxBytes, rxPackets, txBytes, txPackets, operations, bucketDuration,], [1478091600000, null, 1099075, 610947, 928, 114362, 769, 0, 3600000], [1478095200000, null, 1306300, 405997, 509, 46359, 370, 0, 3600000]]
// in case of network info : [[st, activeTime, rb, rp, tb, tp, op, bucketDuration], [1478088000, null, null, 32115296, 34291, 2956805, 25705, 0, 3600], [1478091600, null, null, 2714683, 11821, 1420564, 12650, 0, 3600], [1478095200, null, null, 10079213, 19962, 2487705, 20015, 0, 3600], [1478098800, null, null, 4444433, 10227, 1430356, 10493, 0, 3600]]
// in case of cpu info : [[user, kernel], [0.9, 1.3]]
//
commands.getPerformanceData = function callee$0$0(packageName, dataType) {
  var dataReadTimeout = arguments.length <= 2 || arguments[2] === undefined ? 2 : arguments[2];
  var data;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        data = undefined;
        context$1$0.t0 = dataType;
        context$1$0.next = context$1$0.t0 === 'batteryinfo' ? 4 : context$1$0.t0 === 'cpuinfo' ? 8 : context$1$0.t0 === 'memoryinfo' ? 12 : context$1$0.t0 === 'networkinfo' ? 16 : 20;
        break;

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.getBatteryInfo(dataReadTimeout));

      case 6:
        data = context$1$0.sent;
        return context$1$0.abrupt('break', 21);

      case 8:
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(this.getCPUInfo(packageName, dataReadTimeout));

      case 10:
        data = context$1$0.sent;
        return context$1$0.abrupt('break', 21);

      case 12:
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(this.getMemoryInfo(packageName, dataReadTimeout));

      case 14:
        data = context$1$0.sent;
        return context$1$0.abrupt('break', 21);

      case 16:
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(this.getNetworkTrafficInfo(dataReadTimeout));

      case 18:
        data = context$1$0.sent;
        return context$1$0.abrupt('break', 21);

      case 20:
        throw new Error('No performance data of type \'' + dataType + '\' found.');

      case 21:
        return context$1$0.abrupt('return', data);

      case 22:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.getCPUInfo = function callee$0$0(packageName) {
  var dataReadTimeout = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(dataReadTimeout, RETRY_PAUSE, function callee$1$0() {
          var cmd, data, match, user, kernel;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                cmd = ['dumpsys', 'cpuinfo', '|', 'grep', '\'' + packageName + '\''];
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(this.adb.shell(cmd));

              case 3:
                data = context$2$0.sent;

                if (data) {
                  context$2$0.next = 6;
                  break;
                }

                throw new Error('No data from dumpsys');

              case 6:
                match = /(\d+)% user \+ (\d+)% kernel/.exec(data);

                if (match) {
                  context$2$0.next = 9;
                  break;
                }

                throw new Error('Unable to parse cpu data: \'' + data + '\'');

              case 9:
                user = match[1];
                kernel = match[2];
                return context$2$0.abrupt('return', [_lodash2['default'].clone(CPU_KEYS), [user, kernel]]);

              case 12:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.getBatteryInfo = function callee$0$0() {
  var dataReadTimeout = arguments.length <= 0 || arguments[0] === undefined ? 2 : arguments[0];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this2 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(dataReadTimeout, RETRY_PAUSE, function callee$1$0() {
          var cmd, data, power;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                cmd = ['dumpsys', 'battery', '|', 'grep', 'level'];
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(this.adb.shell(cmd));

              case 3:
                data = context$2$0.sent;

                if (data) {
                  context$2$0.next = 6;
                  break;
                }

                throw new Error('No data from dumpsys');

              case 6:
                power = parseInt((data.split(':')[1] || '').trim(), 10);

                if (_Number$isNaN(power)) {
                  context$2$0.next = 11;
                  break;
                }

                return context$2$0.abrupt('return', [_lodash2['default'].clone(BATTERY_KEYS), [power.toString()]]);

              case 11:
                throw new Error('Unable to parse battery data: \'' + data + '\'');

              case 12:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this2);
        }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.getMemoryInfo = function callee$0$0(packageName) {
  var dataReadTimeout = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this3 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(dataReadTimeout, RETRY_PAUSE, function callee$1$0() {
          var cmd, data, totalPrivateDirty, totalPss, nativePrivateDirty, nativePss, nativeHeapSize, nativeHeapAllocatedSize, dalvikPrivateDirty, dalvikPss, eglPrivateDirty, eglPss, glPrivateDirty, glPss, apilevel, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, line, entries, type, subType, headers, _data;

          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                cmd = ['dumpsys', 'meminfo', '\'' + packageName + '\'', '|', 'grep', '-E', "'Native|Dalvik|EGL|GL|TOTAL'"];
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(this.adb.shell(cmd));

              case 3:
                data = context$2$0.sent;

                if (data) {
                  context$2$0.next = 6;
                  break;
                }

                throw new Error('No data from dumpsys');

              case 6:
                totalPrivateDirty = undefined, totalPss = undefined, nativePrivateDirty = undefined, nativePss = undefined, nativeHeapSize = undefined, nativeHeapAllocatedSize = undefined, dalvikPrivateDirty = undefined, dalvikPss = undefined, eglPrivateDirty = undefined, eglPss = undefined, glPrivateDirty = undefined, glPss = undefined;
                context$2$0.next = 9;
                return _regeneratorRuntime.awrap(this.adb.getApiLevel());

              case 9:
                apilevel = context$2$0.sent;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                context$2$0.prev = 13;

                for (_iterator = _getIterator(data.split('\n')); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  line = _step.value;
                  entries = line.trim().split(' ').filter(Boolean);

                  // entries will have the values
                  //   ['<System Type>', '<Memory Type>', <pss total>, <private dirty>, <private clean>, <swapPss dirty>, <heap size>, <heap alloc>, <heap free>]
                  // except 'TOTAL', which skips the second type name
                  //
                  // and on API level 18 and below
                  //   ['<System Type', '<pps>', '<shared dirty>', '<private dirty>', '<heap size>', '<heap alloc>', '<heap free>']

                  if (apilevel > 18) {
                    type = entries[0];
                    subType = entries[1];

                    if (type === 'Native' && subType === 'Heap') {
                      // native heap
                      nativePss = entries[2];
                      nativePrivateDirty = entries[3];
                      nativeHeapSize = entries[6];
                      nativeHeapAllocatedSize = entries[7];
                    } else if (type === 'Dalvik' && subType === 'Heap') {
                      // dalvik heap
                      dalvikPss = entries[2];
                      dalvikPrivateDirty = entries[3];
                    } else if (type === 'EGL' && subType === 'mtrack') {
                      // egl
                      eglPss = entries[2];
                      eglPrivateDirty = entries[3];
                    } else if (type === 'GL' && subType === 'mtrack') {
                      // gl
                      glPss = entries[2];
                      glPrivateDirty = entries[3];
                    } else if (type === 'TOTAL' && entries.length === 8) {
                      // there are two totals, and we only want the full listing, which has 8 entries
                      totalPss = entries[1];
                      totalPrivateDirty = entries[2];
                    }
                  } else {
                    type = entries[0];

                    if (type === 'Native') {
                      nativePss = entries[1];
                      nativePrivateDirty = entries[3];
                      nativeHeapSize = entries[4];
                      nativeHeapAllocatedSize = entries[5];
                    } else if (type === 'Dalvik') {
                      dalvikPss = entries[1];
                      dalvikPrivateDirty = entries[3];
                    } else if (type === 'EGL') {
                      eglPss = entries[1];
                      eglPrivateDirty = entries[3];
                    } else if (type === 'GL') {
                      glPss = entries[1];
                      glPrivateDirty = entries[3];
                    } else if (type === 'TOTAL') {
                      totalPss = entries[1];
                      totalPrivateDirty = entries[3];
                    }
                  }
                }

                context$2$0.next = 21;
                break;

              case 17:
                context$2$0.prev = 17;
                context$2$0.t0 = context$2$0['catch'](13);
                _didIteratorError = true;
                _iteratorError = context$2$0.t0;

              case 21:
                context$2$0.prev = 21;
                context$2$0.prev = 22;

                if (!_iteratorNormalCompletion && _iterator['return']) {
                  _iterator['return']();
                }

              case 24:
                context$2$0.prev = 24;

                if (!_didIteratorError) {
                  context$2$0.next = 27;
                  break;
                }

                throw _iteratorError;

              case 27:
                return context$2$0.finish(24);

              case 28:
                return context$2$0.finish(21);

              case 29:
                if (!(totalPrivateDirty && totalPrivateDirty !== 'nodex')) {
                  context$2$0.next = 35;
                  break;
                }

                headers = _lodash2['default'].clone(MEMORY_KEYS);
                _data = [totalPrivateDirty, nativePrivateDirty, dalvikPrivateDirty, eglPrivateDirty, glPrivateDirty, totalPss, nativePss, dalvikPss, eglPss, glPss, nativeHeapAllocatedSize, nativeHeapSize];
                return context$2$0.abrupt('return', [headers, _data]);

              case 35:
                throw new Error('Unable to parse memory data: \'' + data + '\'');

              case 36:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this3, [[13, 17, 21, 29], [22,, 24, 28]]);
        }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.getNetworkTrafficInfo = function callee$0$0() {
  var dataReadTimeout = arguments.length <= 0 || arguments[0] === undefined ? 2 : arguments[0];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this4 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(dataReadTimeout, RETRY_PAUSE, function callee$1$0() {
          var returnValue, bucketDuration, bucketStart, activeTime, rxBytes, rxPackets, txBytes, txPackets, operations, cmd, data, index, fromXtstats, start, delimiter, end, pendingBytes, arrayList, j, k, returnIndex, i;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                returnValue = [];
                bucketDuration = undefined, bucketStart = undefined, activeTime = undefined, rxBytes = undefined, rxPackets = undefined, txBytes = undefined, txPackets = undefined, operations = undefined;
                cmd = ['dumpsys', 'netstats'];
                context$2$0.next = 5;
                return _regeneratorRuntime.awrap(this.adb.shell(cmd));

              case 5:
                data = context$2$0.sent;

                if (data) {
                  context$2$0.next = 8;
                  break;
                }

                throw new Error('No data from dumpsys');

              case 8:
                index = 0;
                fromXtstats = data.indexOf("Xt stats:");
                start = data.indexOf("Pending bytes:", fromXtstats);
                delimiter = data.indexOf(":", start + 1);
                end = data.indexOf("\n", delimiter + 1);
                pendingBytes = data.substring(delimiter + 1, end).trim();

                if (end > delimiter) {
                  start = data.indexOf("bucketDuration", end + 1);
                  delimiter = data.indexOf("=", start + 1);
                  end = data.indexOf("\n", delimiter + 1);
                  bucketDuration = data.substring(delimiter + 1, end).trim();
                }

                if (!(start >= 0)) {
                  context$2$0.next = 33;
                  break;
                }

                data = data.substring(end + 1, data.length);
                arrayList = data.split("\n");

                if (!(arrayList.length > 0)) {
                  context$2$0.next = 33;
                  break;
                }

                start = -1;

                j = 0;

              case 21:
                if (!(j < NETWORK_KEYS.length)) {
                  context$2$0.next = 31;
                  break;
                }

                start = arrayList[0].indexOf(NETWORK_KEYS[j][0]);

                if (!(start >= 0)) {
                  context$2$0.next = 28;
                  break;
                }

                index = j;
                returnValue[0] = [];

                for (k = 0; k < NETWORK_KEYS[j].length; ++k) {
                  returnValue[0][k] = NETWORK_KEYS[j][k];
                }
                return context$2$0.abrupt('break', 31);

              case 28:
                ++j;
                context$2$0.next = 21;
                break;

              case 31:
                returnIndex = 1;

                for (i = 0; i < arrayList.length; i++) {
                  data = arrayList[i];
                  start = data.indexOf(NETWORK_KEYS[index][0]);

                  if (start >= 0) {
                    delimiter = data.indexOf("=", start + 1);
                    end = data.indexOf(" ", delimiter + 1);
                    bucketStart = data.substring(delimiter + 1, end).trim();

                    if (end > delimiter) {
                      start = data.indexOf(NETWORK_KEYS[index][1], end + 1);
                      if (start >= 0) {
                        delimiter = data.indexOf("=", start + 1);
                        end = data.indexOf(" ", delimiter + 1);
                        activeTime = data.substring(delimiter + 1, end).trim();
                      }
                    }

                    if (end > delimiter) {
                      start = data.indexOf(NETWORK_KEYS[index][2], end + 1);
                      if (start >= 0) {
                        delimiter = data.indexOf("=", start + 1);
                        end = data.indexOf(" ", delimiter + 1);
                        rxBytes = data.substring(delimiter + 1, end).trim();
                      }
                    }

                    if (end > delimiter) {
                      start = data.indexOf(NETWORK_KEYS[index][3], end + 1);
                      if (start >= 0) {
                        delimiter = data.indexOf("=", start + 1);
                        end = data.indexOf(" ", delimiter + 1);
                        rxPackets = data.substring(delimiter + 1, end).trim();
                      }
                    }

                    if (end > delimiter) {
                      start = data.indexOf(NETWORK_KEYS[index][4], end + 1);
                      if (start >= 0) {
                        delimiter = data.indexOf("=", start + 1);
                        end = data.indexOf(" ", delimiter + 1);
                        txBytes = data.substring(delimiter + 1, end).trim();
                      }
                    }

                    if (end > delimiter) {
                      start = data.indexOf(NETWORK_KEYS[index][5], end + 1);
                      if (start >= 0) {
                        delimiter = data.indexOf("=", start + 1);
                        end = data.indexOf(" ", delimiter + 1);
                        txPackets = data.substring(delimiter + 1, end).trim();
                      }
                    }

                    if (end > delimiter) {
                      start = data.indexOf(NETWORK_KEYS[index][6], end + 1);
                      if (start >= 0) {
                        delimiter = data.indexOf("=", start + 1);
                        end = data.length;
                        operations = data.substring(delimiter + 1, end).trim();
                      }
                    }
                    returnValue[returnIndex++] = [bucketStart, activeTime, rxBytes, rxPackets, txBytes, txPackets, operations, bucketDuration];
                  }
                }

              case 33:
                if (!(!_lodash2['default'].isEqual(pendingBytes, "") && !_lodash2['default'].isUndefined(pendingBytes) && !_lodash2['default'].isEqual(pendingBytes, "nodex"))) {
                  context$2$0.next = 37;
                  break;
                }

                return context$2$0.abrupt('return', returnValue);

              case 37:
                throw new Error('Unable to parse network traffic data: \'' + data + '\'');

              case 38:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this4);
        }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports.SUPPORTED_PERFORMANCE_DATA_TYPES = SUPPORTED_PERFORMANCE_DATA_TYPES;
exports.CPU_KEYS = CPU_KEYS;
exports.MEMORY_KEYS = MEMORY_KEYS;
exports.BATTERY_KEYS = BATTERY_KEYS;
exports.NETWORK_KEYS = NETWORK_KEYS;
exports['default'] = extensions;

// TODO: figure out why this is
// sometimes, the function of 'adb.shell' fails. when I tested this function on the target of 'Galaxy Note5',
// adb.shell(dumpsys cpuinfo) returns cpu datas for other application packages, but I can't find the data for packageName.
// It usually fails 30 times and success for the next time,
// Since then, he has continued to succeed.
//eslint-disable-line curly
// `data` will be something like
//    +0% 2209/io.appium.android.apis: 0% user + 0% kernel

//eslint-disable-line curly

//eslint-disable-line curly

//eslint-disable-line curly

//eslint-disable-line curly

// In case of network traffic information, it is different for the return data between emulator and real device.
// the return data of emulator
//   Xt stats:
//   Pending bytes: 39250
//   History since boot:
//   ident=[[type=WIFI, subType=COMBINED, networkId="WiredSSID"]] uid=-1 set=ALL tag=0x0
//   NetworkStatsHistory: bucketDuration=3600000
//   bucketStart=1478098800000 activeTime=31824 rxBytes=21502 rxPackets=78 txBytes=17748 txPackets=90 operations=0
//
// 7.1
//   Xt stats:
//   Pending bytes: 481487
//   History since boot:
//   ident=[{type=MOBILE, subType=COMBINED, subscriberId=310260..., metered=true}] uid=-1 set=ALL tag=0x0
//     NetworkStatsHistory: bucketDuration=3600
//       st=1483984800 rb=0 rp=0 tb=12031 tp=184 op=0
//       st=1483988400 rb=0 rp=0 tb=38476 tp=587 op=0
//       st=1483999200 rb=315616 rp=400 tb=94800 tp=362 op=0
//       st=1484002800 rb=15826 rp=20 tb=4738 tp=16 op=0
//
// the return data of real device
//   Xt stats:
//   Pending bytes: 0
//   History since boot:
//   ident=[{type=MOBILE, subType=COMBINED, subscriberId=450050...}] uid=-1 set=ALL tag=0x0
//   NetworkStatsHistory: bucketDuration=3600
//   st=1478088000 rb=32115296 rp=34291 tb=2956805 tp=25705 op=0
//   st=1478091600 rb=2714683 rp=11821 tb=1420564 tp=12650 op=0
//   st=1478095200 rb=10079213 rp=19962 tb=2487705 tp=20015 op=0
//   st=1478098800 rb=4444433 rp=10227 tb=1430356 tp=10493 op=0
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9wZXJmb3JtYW5jZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O3NCQUFjLFFBQVE7Ozs7d0JBQ1EsVUFBVTs7QUFHeEMsSUFBSSxRQUFRLEdBQUcsRUFBRTtJQUFFLE9BQU8sR0FBRyxFQUFFO0lBQUUsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7QUFFakQsSUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQztBQUMzTSxJQUFNLFFBQVEsR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNwQyxJQUFNLFlBQVksR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLElBQU0sV0FBVyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDOztBQUVqTyxJQUFNLGdDQUFnQyxHQUFHO0FBQ3ZDLFNBQU8sRUFBRSxnSEFBZ0g7QUFDekgsWUFBVSxFQUFFLCtHQUErRztBQUMzSCxhQUFXLEVBQUUseUdBQXlHO0FBQ3RILGFBQVcsRUFBRSxvR0FBb0c7Q0FDbEgsQ0FBQzs7QUFFRixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUM7Ozs7Ozs7QUFPekIsUUFBUSxDQUFDLHVCQUF1QixHQUFHLFlBQVk7QUFDN0MsU0FBTyxvQkFBRSxJQUFJLENBQUMsZ0NBQWdDLENBQUMs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QyxDQUFDO1FBQ3BDLFFBQVEsR0FBUixRQUFRO1FBQUUsT0FBTyxHQUFQLE9BQU87UUFBRSxnQ0FBZ0MsR0FBaEMsZ0NBQWdDO1FBQUUsUUFBUSxHQUFSLFFBQVE7UUFDN0QsV0FBVyxHQUFYLFdBQVc7UUFBRSxZQUFZLEdBQVosWUFBWTtRQUFFLFlBQVksR0FBWixZQUFZO3FCQUNqQyxVQUFVIiwiZmlsZSI6ImxpYi9jb21tYW5kcy9wZXJmb3JtYW5jZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IHJldHJ5SW50ZXJ2YWwgfSBmcm9tICdhc3luY2JveCc7XHJcblxyXG5cclxubGV0IGNvbW1hbmRzID0ge30sIGhlbHBlcnMgPSB7fSwgZXh0ZW5zaW9ucyA9IHt9O1xyXG5cclxuY29uc3QgTkVUV09SS19LRVlTID0gW1snYnVja2V0U3RhcnQnLCAnYWN0aXZlVGltZScsICdyeEJ5dGVzJywgJ3J4UGFja2V0cycsICd0eEJ5dGVzJywgJ3R4UGFja2V0cycsICdvcGVyYXRpb25zJywgJ2J1Y2tldER1cmF0aW9uJ10sIFsnc3QnLCAnYWN0aXZlVGltZScsICdyYicsICdycCcsICd0YicsICd0cCcsICdvcCcsICdidWNrZXREdXJhdGlvbiddXTtcclxuY29uc3QgQ1BVX0tFWVMgPSBbJ3VzZXInLCAna2VybmVsJ107XHJcbmNvbnN0IEJBVFRFUllfS0VZUyA9IFsncG93ZXInXTtcclxuY29uc3QgTUVNT1JZX0tFWVMgPSBbJ3RvdGFsUHJpdmF0ZURpcnR5JywgJ25hdGl2ZVByaXZhdGVEaXJ0eScsICdkYWx2aWtQcml2YXRlRGlydHknLCAnZWdsUHJpdmF0ZURpcnR5JywgJ2dsUHJpdmF0ZURpcnR5JywgJ3RvdGFsUHNzJywgJ25hdGl2ZVBzcycsICdkYWx2aWtQc3MnLCAnZWdsUHNzJywgJ2dsUHNzJywgJ25hdGl2ZUhlYXBBbGxvY2F0ZWRTaXplJywgJ25hdGl2ZUhlYXBTaXplJ107XHJcblxyXG5jb25zdCBTVVBQT1JURURfUEVSRk9STUFOQ0VfREFUQV9UWVBFUyA9IHtcclxuICBjcHVpbmZvOiAndGhlIGFtb3VudCBvZiBjcHUgYnkgdXNlciBhbmQga2VybmVsIHByb2Nlc3MgLSBjcHUgaW5mb3JtYXRpb24gZm9yIGFwcGxpY2F0aW9ucyBvbiByZWFsIGRldmljZXMgYW5kIHNpbXVsYXRvcnMnLFxyXG4gIG1lbW9yeWluZm86ICd0aGUgYW1vdW50IG9mIG1lbW9yeSB1c2VkIGJ5IHRoZSBwcm9jZXNzIC0gbWVtb3J5IGluZm9ybWF0aW9uIGZvciBhcHBsaWNhdGlvbnMgb24gcmVhbCBkZXZpY2VzIGFuZCBzaW11bGF0b3JzJyxcclxuICBiYXR0ZXJ5aW5mbzogJ3RoZSByZW1haW5pbmcgYmF0dGVyeSBwb3dlciAtIGJhdHRlcnkgcG93ZXIgaW5mb3JtYXRpb24gZm9yIGFwcGxpY2F0aW9ucyBvbiByZWFsIGRldmljZXMgYW5kIHNpbXVsYXRvcnMnLFxyXG4gIG5ldHdvcmtpbmZvOiAndGhlIG5ldHdvcmsgc3RhdGlzdGljcyAtIG5ldHdvcmsgcngvdHggaW5mb3JtYXRpb24gZm9yIGFwcGxpY2F0aW9ucyBvbiByZWFsIGRldmljZXMgYW5kIHNpbXVsYXRvcnMnXHJcbn07XHJcblxyXG5jb25zdCBSRVRSWV9QQVVTRSA9IDEwMDA7XHJcblxyXG4vL1xyXG4vLyByZXR1cm5zIHRoZSBpbmZvcm1hdGlvbiB0eXBlIG9mIHRoZSBzeXN0ZW0gc3RhdGUgd2hpY2ggaXMgc3VwcG9ydGVkIHRvIHJlYWQgYXMgbGlrZSBjcHUsIG1lbW9yeSwgbmV0d29yayB0cmFmZmljLCBhbmQgYmF0dGVyeS5cclxuLy8gb3V0cHV0IC0gYXJyYXkgbGlrZSBiZWxvd1xyXG4vL1tjcHVpbmZvLCBiYXR0ZXJ5aW5mbywgbmV0d29ya2luZm8sIG1lbW9yeWluZm9dXHJcbi8vXHJcbmNvbW1hbmRzLmdldFBlcmZvcm1hbmNlRGF0YVR5cGVzID0gZnVuY3Rpb24gKCkge1xyXG4gIHJldHVybiBfLmtleXMoU1VQUE9SVEVEX1BFUkZPUk1BTkNFX0RBVEFfVFlQRVMpO1xyXG59O1xyXG5cclxuLy8gcmV0dXJucyB0aGUgaW5mb3JtYXRpb24gdHlwZSBvZiB0aGUgc3lzdGVtIHN0YXRlIHdoaWNoIGlzIHN1cHBvcnRlZCB0byByZWFkIGFzIGxpa2UgY3B1LCBtZW1vcnksIG5ldHdvcmsgdHJhZmZpYywgYW5kIGJhdHRlcnkuXHJcbi8vaW5wdXQgLSAocGFja2FnZU5hbWUpIHRoZSBwYWNrYWdlIG5hbWUgb2YgdGhlIGFwcGxpY2F0aW9uXHJcbi8vICAgICAgICAoZGF0YVR5cGUpIHRoZSB0eXBlIG9mIHN5c3RlbSBzdGF0ZSB3aGljaCB3YW50cyB0byByZWFkLiBJdCBzaG91bGQgYmUgb25lIG9mIHRoZSBrZXlzIG9mIHRoZSBTVVBQT1JURURfUEVSRk9STUFOQ0VfREFUQV9UWVBFU1xyXG4vLyAgICAgICAgKGRhdGFSZWFkVGltZW91dCkgdGhlIG51bWJlciBvZiBhdHRlbXB0cyB0byByZWFkXHJcbi8vIG91dHB1dCAtIHRhYmxlIG9mIHRoZSBwZXJmb3JtYW5jZSBkYXRhLCBUaGUgZmlyc3QgbGluZSBvZiB0aGUgdGFibGUgcmVwcmVzZW50cyB0aGUgdHlwZSBvZiBkYXRhLiBUaGUgcmVtYWluaW5nIGxpbmVzIHJlcHJlc2VudCB0aGUgdmFsdWVzIG9mIHRoZSBkYXRhLlxyXG4vL1xyXG4vLyBpbiBjYXNlIG9mIGJhdHRlcnkgaW5mbyA6IFtbcG93ZXJdLCBbMjNdXVxyXG4vLyBpbiBjYXNlIG9mIG1lbW9yeSBpbmZvIDogIFtbdG90YWxQcml2YXRlRGlydHksIG5hdGl2ZVByaXZhdGVEaXJ0eSwgZGFsdmlrUHJpdmF0ZURpcnR5LCBlZ2xQcml2YXRlRGlydHksIGdsUHJpdmF0ZURpcnR5LCB0b3RhbFBzcywgbmF0aXZlUHNzLCBkYWx2aWtQc3MsIGVnbFBzcywgZ2xQc3MsIG5hdGl2ZUhlYXBBbGxvY2F0ZWRTaXplLCBuYXRpdmVIZWFwU2l6ZV0sIFsxODM2MCwgODI5NiwgNjEzMiwgbnVsbCwgbnVsbCwgNDI1ODgsIDg0MDYsIDcwMjQsIG51bGwsIG51bGwsIDI2NTE5LCAxMDM0NF1dXHJcbi8vIGluIGNhc2Ugb2YgbmV0d29yayBpbmZvIDogW1tidWNrZXRTdGFydCwgYWN0aXZlVGltZSwgcnhCeXRlcywgcnhQYWNrZXRzLCB0eEJ5dGVzLCB0eFBhY2tldHMsIG9wZXJhdGlvbnMsIGJ1Y2tldER1cmF0aW9uLF0sIFsxNDc4MDkxNjAwMDAwLCBudWxsLCAxMDk5MDc1LCA2MTA5NDcsIDkyOCwgMTE0MzYyLCA3NjksIDAsIDM2MDAwMDBdLCBbMTQ3ODA5NTIwMDAwMCwgbnVsbCwgMTMwNjMwMCwgNDA1OTk3LCA1MDksIDQ2MzU5LCAzNzAsIDAsIDM2MDAwMDBdXVxyXG4vLyBpbiBjYXNlIG9mIG5ldHdvcmsgaW5mbyA6IFtbc3QsIGFjdGl2ZVRpbWUsIHJiLCBycCwgdGIsIHRwLCBvcCwgYnVja2V0RHVyYXRpb25dLCBbMTQ3ODA4ODAwMCwgbnVsbCwgbnVsbCwgMzIxMTUyOTYsIDM0MjkxLCAyOTU2ODA1LCAyNTcwNSwgMCwgMzYwMF0sIFsxNDc4MDkxNjAwLCBudWxsLCBudWxsLCAyNzE0NjgzLCAxMTgyMSwgMTQyMDU2NCwgMTI2NTAsIDAsIDM2MDBdLCBbMTQ3ODA5NTIwMCwgbnVsbCwgbnVsbCwgMTAwNzkyMTMsIDE5OTYyLCAyNDg3NzA1LCAyMDAxNSwgMCwgMzYwMF0sIFsxNDc4MDk4ODAwLCBudWxsLCBudWxsLCA0NDQ0NDMzLCAxMDIyNywgMTQzMDM1NiwgMTA0OTMsIDAsIDM2MDBdXVxyXG4vLyBpbiBjYXNlIG9mIGNwdSBpbmZvIDogW1t1c2VyLCBrZXJuZWxdLCBbMC45LCAxLjNdXVxyXG4vL1xyXG5jb21tYW5kcy5nZXRQZXJmb3JtYW5jZURhdGEgPSBhc3luYyBmdW5jdGlvbiAocGFja2FnZU5hbWUsIGRhdGFUeXBlLCBkYXRhUmVhZFRpbWVvdXQgPSAyKSB7XHJcbiAgbGV0IGRhdGE7XHJcbiAgc3dpdGNoIChkYXRhVHlwZSkge1xyXG4gICAgY2FzZSAnYmF0dGVyeWluZm8nOlxyXG4gICAgICBkYXRhID0gYXdhaXQgdGhpcy5nZXRCYXR0ZXJ5SW5mbyhkYXRhUmVhZFRpbWVvdXQpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ2NwdWluZm8nOlxyXG4gICAgICBkYXRhID0gYXdhaXQgdGhpcy5nZXRDUFVJbmZvKHBhY2thZ2VOYW1lLCBkYXRhUmVhZFRpbWVvdXQpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ21lbW9yeWluZm8nOlxyXG4gICAgICBkYXRhID0gYXdhaXQgdGhpcy5nZXRNZW1vcnlJbmZvKHBhY2thZ2VOYW1lLCBkYXRhUmVhZFRpbWVvdXQpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ25ldHdvcmtpbmZvJzpcclxuICAgICAgZGF0YSA9IGF3YWl0IHRoaXMuZ2V0TmV0d29ya1RyYWZmaWNJbmZvKGRhdGFSZWFkVGltZW91dCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBwZXJmb3JtYW5jZSBkYXRhIG9mIHR5cGUgJyR7ZGF0YVR5cGV9JyBmb3VuZC5gKTtcclxuICB9XHJcbiAgcmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5oZWxwZXJzLmdldENQVUluZm8gPSBhc3luYyBmdW5jdGlvbiAocGFja2FnZU5hbWUsIGRhdGFSZWFkVGltZW91dCA9IDIpIHtcclxuICAvLyBUT0RPOiBmaWd1cmUgb3V0IHdoeSB0aGlzIGlzXHJcbiAgLy8gc29tZXRpbWVzLCB0aGUgZnVuY3Rpb24gb2YgJ2FkYi5zaGVsbCcgZmFpbHMuIHdoZW4gSSB0ZXN0ZWQgdGhpcyBmdW5jdGlvbiBvbiB0aGUgdGFyZ2V0IG9mICdHYWxheHkgTm90ZTUnLFxyXG4gIC8vIGFkYi5zaGVsbChkdW1wc3lzIGNwdWluZm8pIHJldHVybnMgY3B1IGRhdGFzIGZvciBvdGhlciBhcHBsaWNhdGlvbiBwYWNrYWdlcywgYnV0IEkgY2FuJ3QgZmluZCB0aGUgZGF0YSBmb3IgcGFja2FnZU5hbWUuXHJcbiAgLy8gSXQgdXN1YWxseSBmYWlscyAzMCB0aW1lcyBhbmQgc3VjY2VzcyBmb3IgdGhlIG5leHQgdGltZSxcclxuICAvLyBTaW5jZSB0aGVuLCBoZSBoYXMgY29udGludWVkIHRvIHN1Y2NlZWQuXHJcbiAgcmV0dXJuIGF3YWl0IHJldHJ5SW50ZXJ2YWwoZGF0YVJlYWRUaW1lb3V0LCBSRVRSWV9QQVVTRSwgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IGNtZCA9IFsnZHVtcHN5cycsICdjcHVpbmZvJywgJ3wnLCAnZ3JlcCcsIGAnJHtwYWNrYWdlTmFtZX0nYF07XHJcbiAgICBsZXQgZGF0YSA9IGF3YWl0IHRoaXMuYWRiLnNoZWxsKGNtZCk7XHJcbiAgICBpZiAoIWRhdGEpIHRocm93IG5ldyBFcnJvcignTm8gZGF0YSBmcm9tIGR1bXBzeXMnKTsgLy9lc2xpbnQtZGlzYWJsZS1saW5lIGN1cmx5XHJcbiAgICAvLyBgZGF0YWAgd2lsbCBiZSBzb21ldGhpbmcgbGlrZVxyXG4gICAgLy8gICAgKzAlIDIyMDkvaW8uYXBwaXVtLmFuZHJvaWQuYXBpczogMCUgdXNlciArIDAlIGtlcm5lbFxyXG5cclxuICAgIGxldCBtYXRjaCA9IC8oXFxkKyklIHVzZXIgXFwrIChcXGQrKSUga2VybmVsLy5leGVjKGRhdGEpO1xyXG4gICAgaWYgKCFtYXRjaCkgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gcGFyc2UgY3B1IGRhdGE6ICcke2RhdGF9J2ApOyAvL2VzbGludC1kaXNhYmxlLWxpbmUgY3VybHlcclxuXHJcbiAgICBsZXQgdXNlciA9IG1hdGNoWzFdO1xyXG4gICAgbGV0IGtlcm5lbCA9IG1hdGNoWzJdO1xyXG4gICAgcmV0dXJuIFtfLmNsb25lKENQVV9LRVlTKSwgW3VzZXIsIGtlcm5lbF1dO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuaGVscGVycy5nZXRCYXR0ZXJ5SW5mbyA9IGFzeW5jIGZ1bmN0aW9uIChkYXRhUmVhZFRpbWVvdXQgPSAyKSB7XHJcbiAgcmV0dXJuIGF3YWl0IHJldHJ5SW50ZXJ2YWwoZGF0YVJlYWRUaW1lb3V0LCBSRVRSWV9QQVVTRSwgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IGNtZCA9IFsnZHVtcHN5cycsICdiYXR0ZXJ5JywgJ3wnLCAnZ3JlcCcsICdsZXZlbCddO1xyXG4gICAgbGV0IGRhdGEgPSBhd2FpdCB0aGlzLmFkYi5zaGVsbChjbWQpO1xyXG4gICAgaWYgKCFkYXRhKSB0aHJvdyBuZXcgRXJyb3IoJ05vIGRhdGEgZnJvbSBkdW1wc3lzJyk7IC8vZXNsaW50LWRpc2FibGUtbGluZSBjdXJseVxyXG5cclxuICAgIGxldCBwb3dlciA9IHBhcnNlSW50KChkYXRhLnNwbGl0KCc6JylbMV0gfHwgJycpLnRyaW0oKSwgMTApO1xyXG5cclxuICAgIGlmICghTnVtYmVyLmlzTmFOKHBvd2VyKSkge1xyXG4gICAgICByZXR1cm4gW18uY2xvbmUoQkFUVEVSWV9LRVlTKSwgW3Bvd2VyLnRvU3RyaW5nKCldXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIHBhcnNlIGJhdHRlcnkgZGF0YTogJyR7ZGF0YX0nYCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG59O1xyXG5cclxuaGVscGVycy5nZXRNZW1vcnlJbmZvID0gYXN5bmMgZnVuY3Rpb24gKHBhY2thZ2VOYW1lLCBkYXRhUmVhZFRpbWVvdXQgPSAyKSB7XHJcbiAgcmV0dXJuIGF3YWl0IHJldHJ5SW50ZXJ2YWwoZGF0YVJlYWRUaW1lb3V0LCBSRVRSWV9QQVVTRSwgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IGNtZCA9IFsnZHVtcHN5cycsICdtZW1pbmZvJywgYCcke3BhY2thZ2VOYW1lfSdgLCAnfCcsICdncmVwJywgJy1FJywgXCInTmF0aXZlfERhbHZpa3xFR0x8R0x8VE9UQUwnXCJdO1xyXG4gICAgbGV0IGRhdGEgPSBhd2FpdCB0aGlzLmFkYi5zaGVsbChjbWQpO1xyXG4gICAgaWYgKCFkYXRhKSB0aHJvdyBuZXcgRXJyb3IoJ05vIGRhdGEgZnJvbSBkdW1wc3lzJyk7IC8vZXNsaW50LWRpc2FibGUtbGluZSBjdXJseVxyXG5cclxuICAgIGxldCB0b3RhbFByaXZhdGVEaXJ0eSwgdG90YWxQc3MsXHJcbiAgICAgICAgbmF0aXZlUHJpdmF0ZURpcnR5LCBuYXRpdmVQc3MsIG5hdGl2ZUhlYXBTaXplLCBuYXRpdmVIZWFwQWxsb2NhdGVkU2l6ZSxcclxuICAgICAgICBkYWx2aWtQcml2YXRlRGlydHksIGRhbHZpa1BzcyxcclxuICAgICAgICBlZ2xQcml2YXRlRGlydHksIGVnbFBzcyxcclxuICAgICAgICBnbFByaXZhdGVEaXJ0eSwgZ2xQc3M7XHJcbiAgICBsZXQgYXBpbGV2ZWwgPSBhd2FpdCB0aGlzLmFkYi5nZXRBcGlMZXZlbCgpO1xyXG4gICAgZm9yIChsZXQgbGluZSBvZiBkYXRhLnNwbGl0KCdcXG4nKSkge1xyXG4gICAgICBsZXQgZW50cmllcyA9IGxpbmUudHJpbSgpLnNwbGl0KCcgJykuZmlsdGVyKEJvb2xlYW4pO1xyXG4gICAgICAvLyBlbnRyaWVzIHdpbGwgaGF2ZSB0aGUgdmFsdWVzXHJcbiAgICAgIC8vICAgWyc8U3lzdGVtIFR5cGU+JywgJzxNZW1vcnkgVHlwZT4nLCA8cHNzIHRvdGFsPiwgPHByaXZhdGUgZGlydHk+LCA8cHJpdmF0ZSBjbGVhbj4sIDxzd2FwUHNzIGRpcnR5PiwgPGhlYXAgc2l6ZT4sIDxoZWFwIGFsbG9jPiwgPGhlYXAgZnJlZT5dXHJcbiAgICAgIC8vIGV4Y2VwdCAnVE9UQUwnLCB3aGljaCBza2lwcyB0aGUgc2Vjb25kIHR5cGUgbmFtZVxyXG4gICAgICAvL1xyXG4gICAgICAvLyBhbmQgb24gQVBJIGxldmVsIDE4IGFuZCBiZWxvd1xyXG4gICAgICAvLyAgIFsnPFN5c3RlbSBUeXBlJywgJzxwcHM+JywgJzxzaGFyZWQgZGlydHk+JywgJzxwcml2YXRlIGRpcnR5PicsICc8aGVhcCBzaXplPicsICc8aGVhcCBhbGxvYz4nLCAnPGhlYXAgZnJlZT4nXVxyXG5cclxuICAgICAgaWYgKGFwaWxldmVsID4gMTgpIHtcclxuICAgICAgICBsZXQgdHlwZSA9IGVudHJpZXNbMF07XHJcbiAgICAgICAgbGV0IHN1YlR5cGUgPSBlbnRyaWVzWzFdO1xyXG4gICAgICAgIGlmICh0eXBlID09PSAnTmF0aXZlJyAmJiBzdWJUeXBlID09PSAnSGVhcCcpIHtcclxuICAgICAgICAgIC8vIG5hdGl2ZSBoZWFwXHJcbiAgICAgICAgICBuYXRpdmVQc3MgPSBlbnRyaWVzWzJdO1xyXG4gICAgICAgICAgbmF0aXZlUHJpdmF0ZURpcnR5ID0gZW50cmllc1szXTtcclxuICAgICAgICAgIG5hdGl2ZUhlYXBTaXplID0gZW50cmllc1s2XTtcclxuICAgICAgICAgIG5hdGl2ZUhlYXBBbGxvY2F0ZWRTaXplID0gZW50cmllc1s3XTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdEYWx2aWsnICYmIHN1YlR5cGUgPT09ICdIZWFwJykge1xyXG4gICAgICAgICAgLy8gZGFsdmlrIGhlYXBcclxuICAgICAgICAgIGRhbHZpa1BzcyA9IGVudHJpZXNbMl07XHJcbiAgICAgICAgICBkYWx2aWtQcml2YXRlRGlydHkgPSBlbnRyaWVzWzNdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ0VHTCcgJiYgc3ViVHlwZSA9PT0gJ210cmFjaycpIHtcclxuICAgICAgICAgIC8vIGVnbFxyXG4gICAgICAgICAgZWdsUHNzID0gZW50cmllc1syXTtcclxuICAgICAgICAgIGVnbFByaXZhdGVEaXJ0eSA9IGVudHJpZXNbM107XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnR0wnICYmIHN1YlR5cGUgPT09ICdtdHJhY2snKSB7XHJcbiAgICAgICAgICAvLyBnbFxyXG4gICAgICAgICAgZ2xQc3MgPSBlbnRyaWVzWzJdO1xyXG4gICAgICAgICAgZ2xQcml2YXRlRGlydHkgPSBlbnRyaWVzWzNdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ1RPVEFMJyAmJiBlbnRyaWVzLmxlbmd0aCA9PT0gOCkge1xyXG4gICAgICAgICAgLy8gdGhlcmUgYXJlIHR3byB0b3RhbHMsIGFuZCB3ZSBvbmx5IHdhbnQgdGhlIGZ1bGwgbGlzdGluZywgd2hpY2ggaGFzIDggZW50cmllc1xyXG4gICAgICAgICAgdG90YWxQc3MgPSBlbnRyaWVzWzFdO1xyXG4gICAgICAgICAgdG90YWxQcml2YXRlRGlydHkgPSBlbnRyaWVzWzJdO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgdHlwZSA9IGVudHJpZXNbMF07XHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdOYXRpdmUnKSB7XHJcbiAgICAgICAgICBuYXRpdmVQc3MgPSBlbnRyaWVzWzFdO1xyXG4gICAgICAgICAgbmF0aXZlUHJpdmF0ZURpcnR5ID0gZW50cmllc1szXTtcclxuICAgICAgICAgIG5hdGl2ZUhlYXBTaXplID0gZW50cmllc1s0XTtcclxuICAgICAgICAgIG5hdGl2ZUhlYXBBbGxvY2F0ZWRTaXplID0gZW50cmllc1s1XTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdEYWx2aWsnKSB7XHJcbiAgICAgICAgICBkYWx2aWtQc3MgPSBlbnRyaWVzWzFdO1xyXG4gICAgICAgICAgZGFsdmlrUHJpdmF0ZURpcnR5ID0gZW50cmllc1szXTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdFR0wnKSB7XHJcbiAgICAgICAgICBlZ2xQc3MgPSBlbnRyaWVzWzFdO1xyXG4gICAgICAgICAgZWdsUHJpdmF0ZURpcnR5ID0gZW50cmllc1szXTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdHTCcpIHtcclxuICAgICAgICAgIGdsUHNzID0gZW50cmllc1sxXTtcclxuICAgICAgICAgIGdsUHJpdmF0ZURpcnR5ID0gZW50cmllc1szXTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdUT1RBTCcpIHtcclxuICAgICAgICAgIHRvdGFsUHNzID0gZW50cmllc1sxXTtcclxuICAgICAgICAgIHRvdGFsUHJpdmF0ZURpcnR5ID0gZW50cmllc1szXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodG90YWxQcml2YXRlRGlydHkgJiYgdG90YWxQcml2YXRlRGlydHkgIT09ICdub2RleCcpIHtcclxuICAgICAgbGV0IGhlYWRlcnMgPSBfLmNsb25lKE1FTU9SWV9LRVlTKTtcclxuICAgICAgbGV0IGRhdGEgPSBbdG90YWxQcml2YXRlRGlydHksIG5hdGl2ZVByaXZhdGVEaXJ0eSwgZGFsdmlrUHJpdmF0ZURpcnR5LCBlZ2xQcml2YXRlRGlydHksIGdsUHJpdmF0ZURpcnR5LCB0b3RhbFBzcywgbmF0aXZlUHNzLCBkYWx2aWtQc3MsIGVnbFBzcywgZ2xQc3MsIG5hdGl2ZUhlYXBBbGxvY2F0ZWRTaXplLCBuYXRpdmVIZWFwU2l6ZV07XHJcbiAgICAgIHJldHVybiBbaGVhZGVycywgZGF0YV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuYWJsZSB0byBwYXJzZSBtZW1vcnkgZGF0YTogJyR7ZGF0YX0nYCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcblxyXG5oZWxwZXJzLmdldE5ldHdvcmtUcmFmZmljSW5mbyA9IGFzeW5jIGZ1bmN0aW9uIChkYXRhUmVhZFRpbWVvdXQgPSAyKSB7XHJcbiAgcmV0dXJuIGF3YWl0IHJldHJ5SW50ZXJ2YWwoZGF0YVJlYWRUaW1lb3V0LCBSRVRSWV9QQVVTRSwgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IHJldHVyblZhbHVlID0gW107XHJcbiAgICBsZXQgYnVja2V0RHVyYXRpb24sIGJ1Y2tldFN0YXJ0LCBhY3RpdmVUaW1lLCByeEJ5dGVzLCByeFBhY2tldHMsIHR4Qnl0ZXMsIHR4UGFja2V0cywgb3BlcmF0aW9ucztcclxuXHJcbiAgICBsZXQgY21kID0gWydkdW1wc3lzJywgJ25ldHN0YXRzJ107XHJcbiAgICBsZXQgZGF0YSA9IGF3YWl0IHRoaXMuYWRiLnNoZWxsKGNtZCk7XHJcbiAgICBpZiAoIWRhdGEpIHRocm93IG5ldyBFcnJvcignTm8gZGF0YSBmcm9tIGR1bXBzeXMnKTsgLy9lc2xpbnQtZGlzYWJsZS1saW5lIGN1cmx5XHJcblxyXG4gICAgLy8gSW4gY2FzZSBvZiBuZXR3b3JrIHRyYWZmaWMgaW5mb3JtYXRpb24sIGl0IGlzIGRpZmZlcmVudCBmb3IgdGhlIHJldHVybiBkYXRhIGJldHdlZW4gZW11bGF0b3IgYW5kIHJlYWwgZGV2aWNlLlxyXG4gICAgLy8gdGhlIHJldHVybiBkYXRhIG9mIGVtdWxhdG9yXHJcbiAgICAvLyAgIFh0IHN0YXRzOlxyXG4gICAgLy8gICBQZW5kaW5nIGJ5dGVzOiAzOTI1MFxyXG4gICAgLy8gICBIaXN0b3J5IHNpbmNlIGJvb3Q6XHJcbiAgICAvLyAgIGlkZW50PVtbdHlwZT1XSUZJLCBzdWJUeXBlPUNPTUJJTkVELCBuZXR3b3JrSWQ9XCJXaXJlZFNTSURcIl1dIHVpZD0tMSBzZXQ9QUxMIHRhZz0weDBcclxuICAgIC8vICAgTmV0d29ya1N0YXRzSGlzdG9yeTogYnVja2V0RHVyYXRpb249MzYwMDAwMFxyXG4gICAgLy8gICBidWNrZXRTdGFydD0xNDc4MDk4ODAwMDAwIGFjdGl2ZVRpbWU9MzE4MjQgcnhCeXRlcz0yMTUwMiByeFBhY2tldHM9NzggdHhCeXRlcz0xNzc0OCB0eFBhY2tldHM9OTAgb3BlcmF0aW9ucz0wXHJcbiAgICAvL1xyXG4gICAgLy8gNy4xXHJcbiAgICAvLyAgIFh0IHN0YXRzOlxyXG4gICAgLy8gICBQZW5kaW5nIGJ5dGVzOiA0ODE0ODdcclxuICAgIC8vICAgSGlzdG9yeSBzaW5jZSBib290OlxyXG4gICAgLy8gICBpZGVudD1be3R5cGU9TU9CSUxFLCBzdWJUeXBlPUNPTUJJTkVELCBzdWJzY3JpYmVySWQ9MzEwMjYwLi4uLCBtZXRlcmVkPXRydWV9XSB1aWQ9LTEgc2V0PUFMTCB0YWc9MHgwXHJcbiAgICAvLyAgICAgTmV0d29ya1N0YXRzSGlzdG9yeTogYnVja2V0RHVyYXRpb249MzYwMFxyXG4gICAgLy8gICAgICAgc3Q9MTQ4Mzk4NDgwMCByYj0wIHJwPTAgdGI9MTIwMzEgdHA9MTg0IG9wPTBcclxuICAgIC8vICAgICAgIHN0PTE0ODM5ODg0MDAgcmI9MCBycD0wIHRiPTM4NDc2IHRwPTU4NyBvcD0wXHJcbiAgICAvLyAgICAgICBzdD0xNDgzOTk5MjAwIHJiPTMxNTYxNiBycD00MDAgdGI9OTQ4MDAgdHA9MzYyIG9wPTBcclxuICAgIC8vICAgICAgIHN0PTE0ODQwMDI4MDAgcmI9MTU4MjYgcnA9MjAgdGI9NDczOCB0cD0xNiBvcD0wXHJcbiAgICAvL1xyXG4gICAgLy8gdGhlIHJldHVybiBkYXRhIG9mIHJlYWwgZGV2aWNlXHJcbiAgICAvLyAgIFh0IHN0YXRzOlxyXG4gICAgLy8gICBQZW5kaW5nIGJ5dGVzOiAwXHJcbiAgICAvLyAgIEhpc3Rvcnkgc2luY2UgYm9vdDpcclxuICAgIC8vICAgaWRlbnQ9W3t0eXBlPU1PQklMRSwgc3ViVHlwZT1DT01CSU5FRCwgc3Vic2NyaWJlcklkPTQ1MDA1MC4uLn1dIHVpZD0tMSBzZXQ9QUxMIHRhZz0weDBcclxuICAgIC8vICAgTmV0d29ya1N0YXRzSGlzdG9yeTogYnVja2V0RHVyYXRpb249MzYwMFxyXG4gICAgLy8gICBzdD0xNDc4MDg4MDAwIHJiPTMyMTE1Mjk2IHJwPTM0MjkxIHRiPTI5NTY4MDUgdHA9MjU3MDUgb3A9MFxyXG4gICAgLy8gICBzdD0xNDc4MDkxNjAwIHJiPTI3MTQ2ODMgcnA9MTE4MjEgdGI9MTQyMDU2NCB0cD0xMjY1MCBvcD0wXHJcbiAgICAvLyAgIHN0PTE0NzgwOTUyMDAgcmI9MTAwNzkyMTMgcnA9MTk5NjIgdGI9MjQ4NzcwNSB0cD0yMDAxNSBvcD0wXHJcbiAgICAvLyAgIHN0PTE0NzgwOTg4MDAgcmI9NDQ0NDQzMyBycD0xMDIyNyB0Yj0xNDMwMzU2IHRwPTEwNDkzIG9wPTBcclxuICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICBsZXQgZnJvbVh0c3RhdHMgPSBkYXRhLmluZGV4T2YoXCJYdCBzdGF0czpcIik7XHJcblxyXG4gICAgbGV0IHN0YXJ0ID0gZGF0YS5pbmRleE9mKFwiUGVuZGluZyBieXRlczpcIiwgZnJvbVh0c3RhdHMpO1xyXG4gICAgbGV0IGRlbGltaXRlciA9IGRhdGEuaW5kZXhPZihcIjpcIiwgc3RhcnQgKyAxKTtcclxuICAgIGxldCBlbmQgPSBkYXRhLmluZGV4T2YoXCJcXG5cIiwgZGVsaW1pdGVyICsgMSk7XHJcbiAgICBsZXQgcGVuZGluZ0J5dGVzID0gZGF0YS5zdWJzdHJpbmcoZGVsaW1pdGVyICsgMSwgZW5kKS50cmltKCk7XHJcblxyXG4gICAgaWYgKGVuZCA+IGRlbGltaXRlcikge1xyXG4gICAgICBzdGFydCA9IGRhdGEuaW5kZXhPZihcImJ1Y2tldER1cmF0aW9uXCIsIGVuZCArIDEpO1xyXG4gICAgICBkZWxpbWl0ZXIgPSBkYXRhLmluZGV4T2YoXCI9XCIsIHN0YXJ0ICsgMSk7XHJcbiAgICAgIGVuZCA9IGRhdGEuaW5kZXhPZihcIlxcblwiLCBkZWxpbWl0ZXIgKyAxKTtcclxuICAgICAgYnVja2V0RHVyYXRpb24gPSBkYXRhLnN1YnN0cmluZyhkZWxpbWl0ZXIgKyAxLCBlbmQpLnRyaW0oKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc3RhcnQgPj0gMCkge1xyXG4gICAgICBkYXRhID0gZGF0YS5zdWJzdHJpbmcoZW5kICsgMSwgZGF0YS5sZW5ndGgpO1xyXG4gICAgICBsZXQgYXJyYXlMaXN0ID0gZGF0YS5zcGxpdChcIlxcblwiKTtcclxuXHJcbiAgICAgIGlmIChhcnJheUxpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHN0YXJ0ID0gLTE7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgTkVUV09SS19LRVlTLmxlbmd0aDsgKytqKSB7XHJcbiAgICAgICAgICBzdGFydCA9IGFycmF5TGlzdFswXS5pbmRleE9mKE5FVFdPUktfS0VZU1tqXVswXSk7XHJcblxyXG4gICAgICAgICAgaWYgKHN0YXJ0ID49IDApIHtcclxuICAgICAgICAgICAgaW5kZXggPSBqO1xyXG4gICAgICAgICAgICByZXR1cm5WYWx1ZVswXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBORVRXT1JLX0tFWVNbal0ubGVuZ3RoOyArK2spIHtcclxuICAgICAgICAgICAgICByZXR1cm5WYWx1ZVswXVtrXSA9IE5FVFdPUktfS0VZU1tqXVtrXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByZXR1cm5JbmRleCA9IDE7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGRhdGEgPSBhcnJheUxpc3RbaV07XHJcbiAgICAgICAgICBzdGFydCA9IGRhdGEuaW5kZXhPZihORVRXT1JLX0tFWVNbaW5kZXhdWzBdKTtcclxuXHJcbiAgICAgICAgICBpZiAoc3RhcnQgPj0gMCkge1xyXG4gICAgICAgICAgICBkZWxpbWl0ZXIgPSBkYXRhLmluZGV4T2YoXCI9XCIsIHN0YXJ0ICsgMSk7XHJcbiAgICAgICAgICAgIGVuZCA9IGRhdGEuaW5kZXhPZihcIiBcIiwgZGVsaW1pdGVyICsgMSk7XHJcbiAgICAgICAgICAgIGJ1Y2tldFN0YXJ0ID0gZGF0YS5zdWJzdHJpbmcoZGVsaW1pdGVyICsgMSwgZW5kKS50cmltKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZW5kID4gZGVsaW1pdGVyKSB7XHJcbiAgICAgICAgICAgICAgc3RhcnQgPSBkYXRhLmluZGV4T2YoTkVUV09SS19LRVlTW2luZGV4XVsxXSwgZW5kKzEpO1xyXG4gICAgICAgICAgICAgIGlmIChzdGFydCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxpbWl0ZXIgPSBkYXRhLmluZGV4T2YoXCI9XCIsIHN0YXJ0ICsgMSk7XHJcbiAgICAgICAgICAgICAgICBlbmQgPSBkYXRhLmluZGV4T2YoXCIgXCIsIGRlbGltaXRlciArIDEpO1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlVGltZSA9IGRhdGEuc3Vic3RyaW5nKGRlbGltaXRlciArIDEsIGVuZCkudHJpbSgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGVuZCA+IGRlbGltaXRlcikge1xyXG4gICAgICAgICAgICAgIHN0YXJ0ID0gZGF0YS5pbmRleE9mKE5FVFdPUktfS0VZU1tpbmRleF1bMl0sIGVuZCsxKTtcclxuICAgICAgICAgICAgICBpZiAoc3RhcnQgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgZGVsaW1pdGVyID0gZGF0YS5pbmRleE9mKFwiPVwiLCBzdGFydCArIDEpO1xyXG4gICAgICAgICAgICAgICAgZW5kID0gZGF0YS5pbmRleE9mKFwiIFwiLCBkZWxpbWl0ZXIgKyAxKTtcclxuICAgICAgICAgICAgICAgIHJ4Qnl0ZXMgPSBkYXRhLnN1YnN0cmluZyhkZWxpbWl0ZXIgKyAxLCBlbmQpLnRyaW0oKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChlbmQgPiBkZWxpbWl0ZXIpIHtcclxuICAgICAgICAgICAgICBzdGFydCA9IGRhdGEuaW5kZXhPZihORVRXT1JLX0tFWVNbaW5kZXhdWzNdLCBlbmQrMSk7XHJcbiAgICAgICAgICAgICAgaWYgKHN0YXJ0ID49IDApIHtcclxuICAgICAgICAgICAgICAgIGRlbGltaXRlciA9IGRhdGEuaW5kZXhPZihcIj1cIiwgc3RhcnQgKyAxKTtcclxuICAgICAgICAgICAgICAgIGVuZCA9IGRhdGEuaW5kZXhPZihcIiBcIiwgZGVsaW1pdGVyICsgMSk7XHJcbiAgICAgICAgICAgICAgICByeFBhY2tldHMgPSBkYXRhLnN1YnN0cmluZyhkZWxpbWl0ZXIgKyAxLCBlbmQpLnRyaW0oKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChlbmQgPiBkZWxpbWl0ZXIpIHtcclxuICAgICAgICAgICAgICBzdGFydCA9IGRhdGEuaW5kZXhPZihORVRXT1JLX0tFWVNbaW5kZXhdWzRdLCBlbmQrMSk7XHJcbiAgICAgICAgICAgICAgaWYgKHN0YXJ0ID49IDApIHtcclxuICAgICAgICAgICAgICAgIGRlbGltaXRlciA9IGRhdGEuaW5kZXhPZihcIj1cIiwgc3RhcnQgKyAxKTtcclxuICAgICAgICAgICAgICAgIGVuZCA9IGRhdGEuaW5kZXhPZihcIiBcIiwgZGVsaW1pdGVyICsgMSk7XHJcbiAgICAgICAgICAgICAgICB0eEJ5dGVzID0gZGF0YS5zdWJzdHJpbmcoZGVsaW1pdGVyICsgMSwgZW5kKS50cmltKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZW5kID4gZGVsaW1pdGVyKSB7XHJcbiAgICAgICAgICAgICAgc3RhcnQgPSBkYXRhLmluZGV4T2YoTkVUV09SS19LRVlTW2luZGV4XVs1XSwgZW5kKzEpO1xyXG4gICAgICAgICAgICAgIGlmIChzdGFydCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxpbWl0ZXIgPSBkYXRhLmluZGV4T2YoXCI9XCIsIHN0YXJ0ICsgMSk7XHJcbiAgICAgICAgICAgICAgICBlbmQgPSBkYXRhLmluZGV4T2YoXCIgXCIsIGRlbGltaXRlciArIDEpO1xyXG4gICAgICAgICAgICAgICAgdHhQYWNrZXRzID0gZGF0YS5zdWJzdHJpbmcoZGVsaW1pdGVyICsgMSwgZW5kKS50cmltKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZW5kID4gZGVsaW1pdGVyKSB7XHJcbiAgICAgICAgICAgICAgc3RhcnQgPSBkYXRhLmluZGV4T2YoTkVUV09SS19LRVlTW2luZGV4XVs2XSwgZW5kKzEpO1xyXG4gICAgICAgICAgICAgIGlmIChzdGFydCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxpbWl0ZXIgPSBkYXRhLmluZGV4T2YoXCI9XCIsIHN0YXJ0ICsgMSk7XHJcbiAgICAgICAgICAgICAgICBlbmQgPSBkYXRhLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIG9wZXJhdGlvbnMgPSBkYXRhLnN1YnN0cmluZyhkZWxpbWl0ZXIgKyAxLCBlbmQpLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVyblZhbHVlW3JldHVybkluZGV4KytdID0gW2J1Y2tldFN0YXJ0LCBhY3RpdmVUaW1lLCByeEJ5dGVzLCByeFBhY2tldHMsIHR4Qnl0ZXMsIHR4UGFja2V0cywgb3BlcmF0aW9ucywgYnVja2V0RHVyYXRpb25dO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICghXy5pc0VxdWFsKHBlbmRpbmdCeXRlcywgXCJcIikgJiYgIV8uaXNVbmRlZmluZWQocGVuZGluZ0J5dGVzKSAmJiAhXy5pc0VxdWFsKHBlbmRpbmdCeXRlcywgXCJub2RleFwiKSkge1xyXG4gICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuYWJsZSB0byBwYXJzZSBuZXR3b3JrIHRyYWZmaWMgZGF0YTogJyR7ZGF0YX0nYCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcblxyXG5PYmplY3QuYXNzaWduKGV4dGVuc2lvbnMsIGNvbW1hbmRzLCBoZWxwZXJzKTtcclxuZXhwb3J0IHsgY29tbWFuZHMsIGhlbHBlcnMsIFNVUFBPUlRFRF9QRVJGT1JNQU5DRV9EQVRBX1RZUEVTLCBDUFVfS0VZUyxcclxuICAgICAgICAgTUVNT1JZX0tFWVMsIEJBVFRFUllfS0VZUywgTkVUV09SS19LRVlTIH07XHJcbmV4cG9ydCBkZWZhdWx0IGV4dGVuc2lvbnM7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLiJ9
