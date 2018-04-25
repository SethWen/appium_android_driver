'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _appiumSupport = require('appium-support');

var MOCHA_TIMEOUT = process.env.MOCHA_TIMEOUT ? process.env.MOCHA_TIMEOUT : process.env.TRAVIS ? 120000 : 15000;

var CHROMEDRIVER_2_20_ASSET_MAP = {
  windows: ['windows', 'chromedriver.exe'],
  mac: ['mac', 'chromedriver'],
  linux32: ['linux-32', 'chromedriver'],
  linux64: ['linux-64', 'chromedriver']
};

function getChromedriver220Asset() {
  var basePath, dir, cmd, _CHROMEDRIVER_2_20_ASSET_MAP$windows, _CHROMEDRIVER_2_20_ASSET_MAP$mac, _CHROMEDRIVER_2_20_ASSET_MAP;

  return _regeneratorRuntime.async(function getChromedriver220Asset$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        basePath = _path2['default'].resolve(__dirname, '..', '..', '..', 'test', 'assets', 'chromedriver-2.20');
        dir = undefined;
        cmd = undefined;

        if (!_appiumSupport.system.isWindows()) {
          context$1$0.next = 9;
          break;
        }

        _CHROMEDRIVER_2_20_ASSET_MAP$windows = _slicedToArray(CHROMEDRIVER_2_20_ASSET_MAP.windows, 2);
        dir = _CHROMEDRIVER_2_20_ASSET_MAP$windows[0];
        cmd = _CHROMEDRIVER_2_20_ASSET_MAP$windows[1];
        context$1$0.next = 23;
        break;

      case 9:
        if (!_appiumSupport.system.isMac()) {
          context$1$0.next = 15;
          break;
        }

        _CHROMEDRIVER_2_20_ASSET_MAP$mac = _slicedToArray(CHROMEDRIVER_2_20_ASSET_MAP.mac, 2);
        dir = _CHROMEDRIVER_2_20_ASSET_MAP$mac[0];
        cmd = _CHROMEDRIVER_2_20_ASSET_MAP$mac[1];
        context$1$0.next = 23;
        break;

      case 15:
        context$1$0.next = 17;
        return _regeneratorRuntime.awrap(_appiumSupport.system.arch());

      case 17:
        context$1$0.t0 = context$1$0.sent;
        context$1$0.t1 = 'linux' + context$1$0.t0;
        context$1$0.t2 = CHROMEDRIVER_2_20_ASSET_MAP[context$1$0.t1];
        _CHROMEDRIVER_2_20_ASSET_MAP = _slicedToArray(context$1$0.t2, 2);
        dir = _CHROMEDRIVER_2_20_ASSET_MAP[0];
        cmd = _CHROMEDRIVER_2_20_ASSET_MAP[1];

      case 23:
        return context$1$0.abrupt('return', _path2['default'].resolve(basePath, dir, cmd));

      case 24:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function ensureAVDExists(mochaContext, avdName) {
  var adb;
  return _regeneratorRuntime.async(function ensureAVDExists$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_appiumAdb2['default'].createADB());

      case 2:
        adb = context$1$0.sent;
        context$1$0.prev = 3;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(adb.checkAvdExist(avdName));

      case 6:
        context$1$0.next = 12;
        break;

      case 8:
        context$1$0.prev = 8;
        context$1$0.t0 = context$1$0['catch'](3);

        mochaContext.skip();
        return context$1$0.abrupt('return', false);

      case 12:
        return context$1$0.abrupt('return', true);

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[3, 8]]);
}

exports.MOCHA_TIMEOUT = MOCHA_TIMEOUT;
exports.ensureAVDExists = ensureAVDExists;
exports.getChromedriver220Asset = getChromedriver220Asset;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9oZWxwZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozt5QkFBZ0IsWUFBWTs7OztvQkFDWCxNQUFNOzs7OzZCQUNBLGdCQUFnQjs7QUFHdkMsSUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxHQUFHLEtBQUssQUFBQyxDQUFDOztBQUVwSCxJQUFNLDJCQUEyQixHQUFHO0FBQ2xDLFNBQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQztBQUN4QyxLQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsY0FBYyxDQUFDO0FBQzVCLFNBQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUM7QUFDckMsU0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQztDQUN0QyxDQUFDOztBQUVGLFNBQWUsdUJBQXVCO01BQ2hDLFFBQVEsRUFDUixHQUFHLEVBQ0gsR0FBRzs7Ozs7QUFGSCxnQkFBUSxHQUFHLGtCQUFLLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQztBQUMzRixXQUFHO0FBQ0gsV0FBRzs7YUFDSCxzQkFBTyxTQUFTLEVBQUU7Ozs7OzhEQUNQLDJCQUEyQixDQUFDLE9BQU87QUFBL0MsV0FBRztBQUFFLFdBQUc7Ozs7O2FBQ0Esc0JBQU8sS0FBSyxFQUFFOzs7OzswREFDViwyQkFBMkIsQ0FBQyxHQUFHO0FBQTNDLFdBQUc7QUFBRSxXQUFHOzs7Ozs7eUNBRThDLHNCQUFPLElBQUksRUFBRTs7Ozs7eUJBQXZELDJCQUEyQjs7QUFBdkMsV0FBRztBQUFFLFdBQUc7Ozs0Q0FFSixrQkFBSyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7Ozs7Ozs7Q0FDeEM7O0FBRUQsU0FBZSxlQUFlLENBQUUsWUFBWSxFQUFFLE9BQU87TUFDL0MsR0FBRzs7Ozs7eUNBQVMsdUJBQUksU0FBUyxFQUFFOzs7QUFBM0IsV0FBRzs7O3lDQUVDLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDOzs7Ozs7Ozs7O0FBRWhDLG9CQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7NENBQ2IsS0FBSzs7OzRDQUVQLElBQUk7Ozs7Ozs7Q0FDWjs7UUFHUSxhQUFhLEdBQWIsYUFBYTtRQUFFLGVBQWUsR0FBZixlQUFlO1FBQUUsdUJBQXVCLEdBQXZCLHVCQUF1QiIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvaGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBREIgZnJvbSAnYXBwaXVtLWFkYic7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgeyBzeXN0ZW0gfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XHJcblxyXG5cclxuY29uc3QgTU9DSEFfVElNRU9VVCA9IHByb2Nlc3MuZW52Lk1PQ0hBX1RJTUVPVVQgPyBwcm9jZXNzLmVudi5NT0NIQV9USU1FT1VUIDogKHByb2Nlc3MuZW52LlRSQVZJUyA/IDEyMDAwMCA6IDE1MDAwKTtcclxuXHJcbmNvbnN0IENIUk9NRURSSVZFUl8yXzIwX0FTU0VUX01BUCA9IHtcclxuICB3aW5kb3dzOiBbJ3dpbmRvd3MnLCAnY2hyb21lZHJpdmVyLmV4ZSddLFxyXG4gIG1hYzogWydtYWMnLCAnY2hyb21lZHJpdmVyJ10sXHJcbiAgbGludXgzMjogWydsaW51eC0zMicsICdjaHJvbWVkcml2ZXInXSxcclxuICBsaW51eDY0OiBbJ2xpbnV4LTY0JywgJ2Nocm9tZWRyaXZlciddLFxyXG59O1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0Q2hyb21lZHJpdmVyMjIwQXNzZXQgKCkge1xyXG4gIGxldCBiYXNlUGF0aCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLicsICcuLicsICcuLicsICd0ZXN0JywgJ2Fzc2V0cycsICdjaHJvbWVkcml2ZXItMi4yMCcpO1xyXG4gIGxldCBkaXI7XHJcbiAgbGV0IGNtZDtcclxuICBpZiAoc3lzdGVtLmlzV2luZG93cygpKSB7XHJcbiAgICBbZGlyLCBjbWRdID0gQ0hST01FRFJJVkVSXzJfMjBfQVNTRVRfTUFQLndpbmRvd3M7XHJcbiAgfSBlbHNlIGlmIChzeXN0ZW0uaXNNYWMoKSkge1xyXG4gICAgW2RpciwgY21kXSA9IENIUk9NRURSSVZFUl8yXzIwX0FTU0VUX01BUC5tYWM7XHJcbiAgfSBlbHNlIHtcclxuICAgIFtkaXIsIGNtZF0gPSBDSFJPTUVEUklWRVJfMl8yMF9BU1NFVF9NQVBbYGxpbnV4JHthd2FpdCBzeXN0ZW0uYXJjaCgpfWBdO1xyXG4gIH1cclxuICByZXR1cm4gcGF0aC5yZXNvbHZlKGJhc2VQYXRoLCBkaXIsIGNtZCk7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZUFWREV4aXN0cyAobW9jaGFDb250ZXh0LCBhdmROYW1lKSB7XHJcbiAgbGV0IGFkYiA9IGF3YWl0IEFEQi5jcmVhdGVBREIoKTtcclxuICB0cnkge1xyXG4gICAgYXdhaXQgYWRiLmNoZWNrQXZkRXhpc3QoYXZkTmFtZSk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBtb2NoYUNvbnRleHQuc2tpcCgpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IE1PQ0hBX1RJTUVPVVQsIGVuc3VyZUFWREV4aXN0cywgZ2V0Q2hyb21lZHJpdmVyMjIwQXNzZXQgfTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uIn0=
