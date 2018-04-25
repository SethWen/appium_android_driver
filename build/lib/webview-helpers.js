'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _asyncbox = require('asyncbox');

var NATIVE_WIN = "NATIVE_APP";
var WEBVIEW_WIN = "WEBVIEW";
var WEBVIEW_BASE = WEBVIEW_WIN + '_';
var WEBVIEW_REGEXP = new RegExp('@?webview_devtools_remote_(\\d+)');
var WEBVIEW_PID_REGEXP = new RegExp(WEBVIEW_BASE + '(\\d+)');
var CHROMIUM_WIN = "CHROMIUM";
var CROSSWALK_SOCKET_SUFFIX = "_devtools_remote";
var CROSSWALK_REGEXP_STRING = '(\\S*)' + CROSSWALK_SOCKET_SUFFIX;
var CROSSWALK_REGEXP = new RegExp('@' + CROSSWALK_REGEXP_STRING);
var CROSSWALK_PROCESS_REGEXP = new RegExp(WEBVIEW_BASE + CROSSWALK_REGEXP_STRING);

var helpers = {};

// This function gets a list of android system processes and returns ones
// that look like webviews, with the appropriate webview prefix and their PID.
// If we pass in a deviceSocket, we only attempt to find webviews which match
// that socket name (this is for apps which embed Chromium, which isn't the
// same as chrome-backed webviews)
// TODO: some of this function belongs in appium-adb
function webviewsFromProcs(adb, deviceSocket) {
  var webviews, out, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, line, webviewPid, crosswalkWebviewSocket;

  return _regeneratorRuntime.async(function webviewsFromProcs$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        webviews = [];
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(adb.shell(["cat", "/proc/net/unix"]));

      case 3:
        out = context$1$0.sent;
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 7;
        _iterator = _getIterator(out.split("\n"));

      case 9:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 23;
          break;
        }

        line = _step.value;

        line = line.trim();

        if (!deviceSocket) {
          context$1$0.next = 17;
          break;
        }

        if (!(line.indexOf('@' + deviceSocket) === line.length - deviceSocket.length - 1)) {
          context$1$0.next = 17;
          break;
        }

        if (!(deviceSocket === "chrome_devtools_remote")) {
          context$1$0.next = 17;
          break;
        }

        webviews.push(CHROMIUM_WIN);
        return context$1$0.abrupt('continue', 20);

      case 17:
        webviewPid = undefined;
        crosswalkWebviewSocket = undefined;

        if (webviewPid = line.match(WEBVIEW_REGEXP)) {
          // for multiple webviews a list of 'WEBVIEW_<index>' will be returned
          // where <index> is zero based (same is in selendroid)
          webviews.push('' + WEBVIEW_BASE + webviewPid[1]);
        } else if (crosswalkWebviewSocket = line.match(CROSSWALK_REGEXP)) {
          if (deviceSocket) {
            if (crosswalkWebviewSocket[0].slice(1) === deviceSocket) {
              webviews.push('' + WEBVIEW_BASE + crosswalkWebviewSocket[1]);
            }
          } else {
            webviews.push('' + WEBVIEW_BASE + crosswalkWebviewSocket[1] + CROSSWALK_SOCKET_SUFFIX);
          }
        }

      case 20:
        _iteratorNormalCompletion = true;
        context$1$0.next = 9;
        break;

      case 23:
        context$1$0.next = 29;
        break;

      case 25:
        context$1$0.prev = 25;
        context$1$0.t0 = context$1$0['catch'](7);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 29:
        context$1$0.prev = 29;
        context$1$0.prev = 30;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 32:
        context$1$0.prev = 32;

        if (!_didIteratorError) {
          context$1$0.next = 35;
          break;
        }

        throw _iteratorError;

      case 35:
        return context$1$0.finish(32);

      case 36:
        return context$1$0.finish(29);

      case 37:
        return context$1$0.abrupt('return', _lodash2['default'].uniq(webviews));

      case 38:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[7, 25, 29, 37], [30,, 32, 36]]);
}

// Take a webview name like WEBVIEW_4296 and use 'adb shell ps' to figure out
// which app package is associated with that webview. One of the reasons we
// want to do this is to make sure we're listing webviews for the actual AUT,
// not some other running app
// TODO: this should be called procFromPid and exist in appium-adb
helpers.procFromWebview = function callee$0$0(adb, webview) {
  var processName, pid, out, pkg, lines, fullHeader, header, pidColumn, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, line, entries, pidEntry;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(webview.match(WEBVIEW_PID_REGEXP) === null)) {
          context$1$0.next = 5;
          break;
        }

        processName = webview.match(CROSSWALK_PROCESS_REGEXP);

        if (!(processName === null)) {
          context$1$0.next = 4;
          break;
        }

        throw new Error('Could not find process name for webview ' + webview);

      case 4:
        return context$1$0.abrupt('return', processName[1]);

      case 5:
        pid = webview.match(/\d+$/);

        if (pid) {
          context$1$0.next = 8;
          break;
        }

        throw new Error('Could not find PID for webview ' + webview);

      case 8:
        pid = pid[0];
        _logger2['default'].debug(webview + ' mapped to pid ' + pid);
        _logger2['default'].debug("Getting process name for webview");
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(adb.shell("ps"));

      case 13:
        out = context$1$0.sent;
        pkg = "unknown";
        lines = out.split(/\r?\n/);
        fullHeader = lines[0].trim();
        header = fullHeader.split(/\s+/);
        pidColumn = header.indexOf('PID');
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 22;
        _iterator2 = _getIterator(lines);

      case 24:
        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
          context$1$0.next = 37;
          break;
        }

        line = _step2.value;
        entries = line.trim().split(/\s+/);
        pidEntry = entries[pidColumn];

        if (!(pidEntry === pid)) {
          context$1$0.next = 34;
          break;
        }

        pkg = _lodash2['default'].last(entries);
        _logger2['default'].debug('Parsed pid: \'' + pidEntry + '\' pkg: \'' + pkg + '\' from');
        _logger2['default'].debug('    ' + fullHeader);
        _logger2['default'].debug('    ' + line);

        return context$1$0.abrupt('break', 37);

      case 34:
        _iteratorNormalCompletion2 = true;
        context$1$0.next = 24;
        break;

      case 37:
        context$1$0.next = 43;
        break;

      case 39:
        context$1$0.prev = 39;
        context$1$0.t0 = context$1$0['catch'](22);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t0;

      case 43:
        context$1$0.prev = 43;
        context$1$0.prev = 44;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 46:
        context$1$0.prev = 46;

        if (!_didIteratorError2) {
          context$1$0.next = 49;
          break;
        }

        throw _iteratorError2;

      case 49:
        return context$1$0.finish(46);

      case 50:
        return context$1$0.finish(43);

      case 51:

        _logger2['default'].debug('Returning process name: \'' + pkg + '\'');
        return context$1$0.abrupt('return', pkg);

      case 53:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[22, 39, 43, 51], [44,, 46, 50]]);
};

// Get a list of available webviews by introspecting processes with adb, where
// webviews are listed. It's possible to pass in a 'deviceSocket' arg, which
// limits the webview possibilities to the one running on the Chromium devtools
// socket we're interested in (see note on webviewsFromProcs)
helpers.getWebviews = function callee$0$0(adb, deviceSocket) {
  var webviews;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug("Getting a list of available webviews");
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(webviewsFromProcs(adb, deviceSocket));

      case 3:
        webviews = context$1$0.sent;

        if (!deviceSocket) {
          context$1$0.next = 6;
          break;
        }

        return context$1$0.abrupt('return', webviews);

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap((0, _asyncbox.asyncmap)(webviews, function callee$1$0(webviewName) {
          var pkg;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(helpers.procFromWebview(adb, webviewName));

              case 2:
                pkg = context$2$0.sent;
                return context$2$0.abrupt('return', WEBVIEW_BASE + pkg);

              case 4:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        }));

      case 8:
        webviews = context$1$0.sent;

        _logger2['default'].debug('Found webviews: ' + JSON.stringify(webviews));
        return context$1$0.abrupt('return', webviews);

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.decorateChromeOptions = function (caps, opts, deviceId) {
  // add options from appium session caps
  if (opts.chromeOptions) {
    if (opts.chromeOptions.Arguments) {
      // merge `Arguments` and `args`
      opts.chromeOptions.args = [].concat(_toConsumableArray(opts.chromeOptions.args || []), _toConsumableArray(opts.chromeOptions.Arguments));
      delete opts.chromeOptions.Arguments;
    }
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = _getIterator(_lodash2['default'].toPairs(opts.chromeOptions)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _step3$value = _slicedToArray(_step3.value, 2);

        var opt = _step3$value[0];
        var val = _step3$value[1];

        if (_lodash2['default'].isUndefined(caps.chromeOptions[opt])) {
          caps.chromeOptions[opt] = val;
        } else {
          _logger2['default'].warn('Cannot pass option ' + caps.chromeOptions[opt] + ' because ' + "Appium needs it to make chromeDriver work");
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  }

  // add device id from adb
  caps.chromeOptions.androidDeviceSerial = deviceId;
  return caps;
};

exports['default'] = helpers;
exports.helpers = helpers;
exports.NATIVE_WIN = NATIVE_WIN;
exports.WEBVIEW_WIN = WEBVIEW_WIN;
exports.WEBVIEW_BASE = WEBVIEW_BASE;
exports.CHROMIUM_WIN = CHROMIUM_WIN;

// webview_devtools_remote_4296 => 4296

/* Output of ps is like:
 USER       PID  PPID  VSIZE  RSS   WCHAN    PC         NAME  _or_
 USER       PID  PPID  VSZ    RSS   WCHAN    ADDR     S NAME
 u0_a136   6248  179   946000 48144 ffffffff 4005903e R com.example.test
 u0_a136   6249  179   946000 48144 ffffffff          R com.example.test
*/
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi93ZWJ2aWV3LWhlbHBlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztzQkFBYyxRQUFROzs7O3NCQUNILFVBQVU7Ozs7d0JBQ0osVUFBVTs7QUFFbkMsSUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDO0FBQ2hDLElBQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQztBQUM5QixJQUFNLFlBQVksR0FBTSxXQUFXLE1BQUcsQ0FBQztBQUN2QyxJQUFNLGNBQWMsR0FBRyxJQUFJLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsSUFBTSxrQkFBa0IsR0FBRyxJQUFJLE1BQU0sQ0FBSSxZQUFZLFlBQVMsQ0FBQztBQUMvRCxJQUFNLFlBQVksR0FBRyxVQUFVLENBQUM7QUFDaEMsSUFBTSx1QkFBdUIsR0FBRyxrQkFBa0IsQ0FBQztBQUNuRCxJQUFNLHVCQUF1QixjQUFZLHVCQUF1QixBQUFFLENBQUM7QUFDbkUsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLE1BQU0sT0FBSyx1QkFBdUIsQ0FBRyxDQUFDO0FBQ25FLElBQU0sd0JBQXdCLEdBQUcsSUFBSSxNQUFNLENBQUMsWUFBWSxHQUFHLHVCQUF1QixDQUFDLENBQUM7O0FBR3BGLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7QUFRakIsU0FBZSxpQkFBaUIsQ0FBRSxHQUFHLEVBQUUsWUFBWTtNQUM3QyxRQUFRLEVBQ1IsR0FBRyxrRkFDRSxJQUFJLEVBWVAsVUFBVSxFQUNWLHNCQUFzQjs7Ozs7QUFmeEIsZ0JBQVEsR0FBRyxFQUFFOzt5Q0FDRCxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLGdCQUFnQixDQUFDLENBQUM7OztBQUFoRCxXQUFHOzs7OztpQ0FDVSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7QUFBdkIsWUFBSTs7QUFDWCxZQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDOzthQUVmLFlBQVk7Ozs7O2NBQ1YsSUFB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QWEsQ0FBQyxTQUFTLEVBQUMsQ0FBQztBQUNoRyxhQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO0tBQ3JDOzs7Ozs7QUFDRCx5Q0FBdUIsb0JBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsaUhBQUU7OztZQUE1QyxHQUFHO1lBQUUsR0FBRzs7QUFDaEIsWUFBSSxvQkFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQzFDLGNBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQy9CLE1BQU07QUFDTCw4QkFBTyxJQUFJLENBQUMsd0JBQXNCLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLGlCQUM3QywyQ0FBMkMsQ0FBQyxDQUFDO1NBQzFEO09BQ0Y7Ozs7Ozs7Ozs7Ozs7OztHQUNGOzs7QUFHRCxNQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixHQUFHLFFBQVEsQ0FBQztBQUNsRCxTQUFPLElBQUksQ0FBQztDQUNiLENBQUM7O3FCQUVhLE9BQU87UUFDYixPQUFPLEdBQVAsT0FBTztRQUFFLFVBQVUsR0FBVixVQUFVO1FBQUUsV0FBVyxHQUFYLFdBQVc7UUFBRSxZQUFZLEdBQVosWUFBWTtRQUFFLFlBQVksR0FBWixZQUFZIiwiZmlsZSI6ImxpYi93ZWJ2aWV3LWhlbHBlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcclxuaW1wb3J0IHsgYXN5bmNtYXAgfSBmcm9tICdhc3luY2JveCc7XHJcblxyXG5jb25zdCBOQVRJVkVfV0lOID0gXCJOQVRJVkVfQVBQXCI7XHJcbmNvbnN0IFdFQlZJRVdfV0lOID0gXCJXRUJWSUVXXCI7XHJcbmNvbnN0IFdFQlZJRVdfQkFTRSA9IGAke1dFQlZJRVdfV0lOfV9gO1xyXG5jb25zdCBXRUJWSUVXX1JFR0VYUCA9IG5ldyBSZWdFeHAoYEA/d2Vidmlld19kZXZ0b29sc19yZW1vdGVfKFxcXFxkKylgKTtcclxuY29uc3QgV0VCVklFV19QSURfUkVHRVhQID0gbmV3IFJlZ0V4cChgJHtXRUJWSUVXX0JBU0V9KFxcXFxkKylgKTtcclxuY29uc3QgQ0hST01JVU1fV0lOID0gXCJDSFJPTUlVTVwiO1xyXG5jb25zdCBDUk9TU1dBTEtfU09DS0VUX1NVRkZJWCA9IFwiX2RldnRvb2xzX3JlbW90ZVwiO1xyXG5jb25zdCBDUk9TU1dBTEtfUkVHRVhQX1NUUklORyA9IGAoXFxcXFMqKSR7Q1JPU1NXQUxLX1NPQ0tFVF9TVUZGSVh9YDtcclxuY29uc3QgQ1JPU1NXQUxLX1JFR0VYUCA9IG5ldyBSZWdFeHAoYEAke0NST1NTV0FMS19SRUdFWFBfU1RSSU5HfWApO1xyXG5jb25zdCBDUk9TU1dBTEtfUFJPQ0VTU19SRUdFWFAgPSBuZXcgUmVnRXhwKFdFQlZJRVdfQkFTRSArIENST1NTV0FMS19SRUdFWFBfU1RSSU5HKTtcclxuXHJcblxyXG5sZXQgaGVscGVycyA9IHt9O1xyXG5cclxuLy8gVGhpcyBmdW5jdGlvbiBnZXRzIGEgbGlzdCBvZiBhbmRyb2lkIHN5c3RlbSBwcm9jZXNzZXMgYW5kIHJldHVybnMgb25lc1xyXG4vLyB0aGF0IGxvb2sgbGlrZSB3ZWJ2aWV3cywgd2l0aCB0aGUgYXBwcm9wcmlhdGUgd2VidmlldyBwcmVmaXggYW5kIHRoZWlyIFBJRC5cclxuLy8gSWYgd2UgcGFzcyBpbiBhIGRldmljZVNvY2tldCwgd2Ugb25seSBhdHRlbXB0IHRvIGZpbmQgd2Vidmlld3Mgd2hpY2ggbWF0Y2hcclxuLy8gdGhhdCBzb2NrZXQgbmFtZSAodGhpcyBpcyBmb3IgYXBwcyB3aGljaCBlbWJlZCBDaHJvbWl1bSwgd2hpY2ggaXNuJ3QgdGhlXHJcbi8vIHNhbWUgYXMgY2hyb21lLWJhY2tlZCB3ZWJ2aWV3cylcclxuLy8gVE9ETzogc29tZSBvZiB0aGlzIGZ1bmN0aW9uIGJlbG9uZ3MgaW4gYXBwaXVtLWFkYlxyXG5hc3luYyBmdW5jdGlvbiB3ZWJ2aWV3c0Zyb21Qcm9jcyAoYWRiLCBkZXZpY2VTb2NrZXQpIHtcclxuICBsZXQgd2Vidmlld3MgPSBbXTtcclxuICBsZXQgb3V0ID0gYXdhaXQgYWRiLnNoZWxsKFtcImNhdFwiLCBcIi9wcm9jL25ldC91bml4XCJdKTtcclxuICBmb3IgKGxldCBsaW5lIG9mIG91dC5zcGxpdChcIlxcblwiKSkge1xyXG4gICAgbGluZSA9IGxpbmUudHJpbSgpO1xyXG5cclxuICAgIGlmIChkZXZpY2VTb2NrZXQpIHtcclxuICAgICAgaWYgKGxpbmUuaW5kZXhPZihgQCR7ZGV2aWNlU29ja2V0fWApID09PSBsaW5lLmxlbmd0aCAtIGRldmljZVNvY2tldC5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgaWYgKGRldmljZVNvY2tldCA9PT0gXCJjaHJvbWVfZGV2dG9vbHNfcmVtb3RlXCIpIHtcclxuICAgICAgICAgIHdlYnZpZXdzLnB1c2goQ0hST01JVU1fV0lOKTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCB3ZWJ2aWV3UGlkO1xyXG4gICAgbGV0IGNyb3Nzd2Fsa1dlYnZpZXdTb2NrZXQ7XHJcbiAgICBpZiAoKHdlYnZpZXdQaWQgPSBsaW5lLm1hdGNoKFdFQlZJRVdfUkVHRVhQKSkpIHtcclxuICAgICAgLy8gZm9yIG11bHRpcGxlIHdlYnZpZXdzIGEgbGlzdCBvZiAnV0VCVklFV188aW5kZXg+JyB3aWxsIGJlIHJldHVybmVkXHJcbiAgICAgIC8vIHdoZXJlIDxpbmRleD4gaXMgemVybyBiYXNlZCAoc2FtZSBpcyBpbiBzZWxlbmRyb2lkKVxyXG4gICAgICB3ZWJ2aWV3cy5wdXNoKGAke1dFQlZJRVdfQkFTRX0ke3dlYnZpZXdQaWRbMV19YCk7XHJcbiAgICB9IGVsc2UgaWYgKChjcm9zc3dhbGtXZWJ2aWV3U29ja2V0ID0gbGluZS5tYXRjaChDUk9TU1dBTEtfUkVHRVhQKSkpIHtcclxuICAgICAgaWYgKGRldmljZVNvY2tldCkge1xyXG4gICAgICAgIGlmIChjcm9zc3dhbGtXZWJ2aWV3U29ja2V0WzBdLnNsaWNlKDEpID09PSBkZXZpY2VTb2NrZXQpIHtcclxuICAgICAgICAgIHdlYnZpZXdzLnB1c2goYCR7V0VCVklFV19CQVNFfSR7Y3Jvc3N3YWxrV2Vidmlld1NvY2tldFsxXX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgd2Vidmlld3MucHVzaChgJHtXRUJWSUVXX0JBU0V9JHtjcm9zc3dhbGtXZWJ2aWV3U29ja2V0WzFdfSR7Q1JPU1NXQUxLX1NPQ0tFVF9TVUZGSVh9YCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIF8udW5pcSh3ZWJ2aWV3cyk7XHJcbn1cclxuXHJcbi8vIFRha2UgYSB3ZWJ2aWV3IG5hbWUgbGlrZSBXRUJWSUVXXzQyOTYgYW5kIHVzZSAnYWRiIHNoZWxsIHBzJyB0byBmaWd1cmUgb3V0XHJcbi8vIHdoaWNoIGFwcCBwYWNrYWdlIGlzIGFzc29jaWF0ZWQgd2l0aCB0aGF0IHdlYnZpZXcuIE9uZSBvZiB0aGUgcmVhc29ucyB3ZVxyXG4vLyB3YW50IHRvIGRvIHRoaXMgaXMgdG8gbWFrZSBzdXJlIHdlJ3JlIGxpc3Rpbmcgd2Vidmlld3MgZm9yIHRoZSBhY3R1YWwgQVVULFxyXG4vLyBub3Qgc29tZSBvdGhlciBydW5uaW5nIGFwcFxyXG4vLyBUT0RPOiB0aGlzIHNob3VsZCBiZSBjYWxsZWQgcHJvY0Zyb21QaWQgYW5kIGV4aXN0IGluIGFwcGl1bS1hZGJcclxuaGVscGVycy5wcm9jRnJvbVdlYnZpZXcgPSBhc3luYyBmdW5jdGlvbiAoYWRiLCB3ZWJ2aWV3KSB7XHJcbiAgaWYgKHdlYnZpZXcubWF0Y2goV0VCVklFV19QSURfUkVHRVhQKSA9PT0gbnVsbCkge1xyXG4gICAgbGV0IHByb2Nlc3NOYW1lID0gd2Vidmlldy5tYXRjaChDUk9TU1dBTEtfUFJPQ0VTU19SRUdFWFApO1xyXG4gICAgaWYgKHByb2Nlc3NOYW1lID09PSBudWxsKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgcHJvY2VzcyBuYW1lIGZvciB3ZWJ2aWV3ICR7d2Vidmlld31gKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcm9jZXNzTmFtZVsxXTtcclxuICB9XHJcblxyXG4gIC8vIHdlYnZpZXdfZGV2dG9vbHNfcmVtb3RlXzQyOTYgPT4gNDI5NlxyXG4gIGxldCBwaWQgPSB3ZWJ2aWV3Lm1hdGNoKC9cXGQrJC8pO1xyXG4gIGlmICghcGlkKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIFBJRCBmb3Igd2VidmlldyAke3dlYnZpZXd9YCk7XHJcbiAgfVxyXG4gIHBpZCA9IHBpZFswXTtcclxuICBsb2dnZXIuZGVidWcoYCR7d2Vidmlld30gbWFwcGVkIHRvIHBpZCAke3BpZH1gKTtcclxuICBsb2dnZXIuZGVidWcoXCJHZXR0aW5nIHByb2Nlc3MgbmFtZSBmb3Igd2Vidmlld1wiKTtcclxuICBsZXQgb3V0ID0gYXdhaXQgYWRiLnNoZWxsKFwicHNcIik7XHJcbiAgbGV0IHBrZyA9IFwidW5rbm93blwiO1xyXG4gIGxldCBsaW5lcyA9IG91dC5zcGxpdCgvXFxyP1xcbi8pO1xyXG5cclxuICAvKiBPdXRwdXQgb2YgcHMgaXMgbGlrZTpcclxuICAgVVNFUiAgICAgICBQSUQgIFBQSUQgIFZTSVpFICBSU1MgICBXQ0hBTiAgICBQQyAgICAgICAgIE5BTUUgIF9vcl9cclxuICAgVVNFUiAgICAgICBQSUQgIFBQSUQgIFZTWiAgICBSU1MgICBXQ0hBTiAgICBBRERSICAgICBTIE5BTUVcclxuICAgdTBfYTEzNiAgIDYyNDggIDE3OSAgIDk0NjAwMCA0ODE0NCBmZmZmZmZmZiA0MDA1OTAzZSBSIGNvbS5leGFtcGxlLnRlc3RcclxuICAgdTBfYTEzNiAgIDYyNDkgIDE3OSAgIDk0NjAwMCA0ODE0NCBmZmZmZmZmZiAgICAgICAgICBSIGNvbS5leGFtcGxlLnRlc3RcclxuICAqL1xyXG4gIGNvbnN0IGZ1bGxIZWFkZXIgPSBsaW5lc1swXS50cmltKCk7XHJcbiAgY29uc3QgaGVhZGVyID0gZnVsbEhlYWRlci5zcGxpdCgvXFxzKy8pO1xyXG4gIGNvbnN0IHBpZENvbHVtbiA9IGhlYWRlci5pbmRleE9mKCdQSUQnKTtcclxuXHJcbiAgZm9yIChsZXQgbGluZSBvZiBsaW5lcykge1xyXG4gICAgY29uc3QgZW50cmllcyA9IGxpbmUudHJpbSgpLnNwbGl0KC9cXHMrLyk7XHJcbiAgICBjb25zdCBwaWRFbnRyeSA9IGVudHJpZXNbcGlkQ29sdW1uXTtcclxuICAgIGlmIChwaWRFbnRyeSA9PT0gcGlkKSB7XHJcbiAgICAgIHBrZyA9IF8ubGFzdChlbnRyaWVzKTtcclxuICAgICAgbG9nZ2VyLmRlYnVnKGBQYXJzZWQgcGlkOiAnJHtwaWRFbnRyeX0nIHBrZzogJyR7cGtnfScgZnJvbWApO1xyXG4gICAgICBsb2dnZXIuZGVidWcoYCAgICAke2Z1bGxIZWFkZXJ9YCk7XHJcbiAgICAgIGxvZ2dlci5kZWJ1ZyhgICAgICR7bGluZX1gKTtcclxuXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbG9nZ2VyLmRlYnVnKGBSZXR1cm5pbmcgcHJvY2VzcyBuYW1lOiAnJHtwa2d9J2ApO1xyXG4gIHJldHVybiBwa2c7XHJcbn07XHJcblxyXG4vLyBHZXQgYSBsaXN0IG9mIGF2YWlsYWJsZSB3ZWJ2aWV3cyBieSBpbnRyb3NwZWN0aW5nIHByb2Nlc3NlcyB3aXRoIGFkYiwgd2hlcmVcclxuLy8gd2Vidmlld3MgYXJlIGxpc3RlZC4gSXQncyBwb3NzaWJsZSB0byBwYXNzIGluIGEgJ2RldmljZVNvY2tldCcgYXJnLCB3aGljaFxyXG4vLyBsaW1pdHMgdGhlIHdlYnZpZXcgcG9zc2liaWxpdGllcyB0byB0aGUgb25lIHJ1bm5pbmcgb24gdGhlIENocm9taXVtIGRldnRvb2xzXHJcbi8vIHNvY2tldCB3ZSdyZSBpbnRlcmVzdGVkIGluIChzZWUgbm90ZSBvbiB3ZWJ2aWV3c0Zyb21Qcm9jcylcclxuaGVscGVycy5nZXRXZWJ2aWV3cyA9IGFzeW5jIGZ1bmN0aW9uIChhZGIsIGRldmljZVNvY2tldCkge1xyXG4gIGxvZ2dlci5kZWJ1ZyhcIkdldHRpbmcgYSBsaXN0IG9mIGF2YWlsYWJsZSB3ZWJ2aWV3c1wiKTtcclxuICBsZXQgd2Vidmlld3MgPSBhd2FpdCB3ZWJ2aWV3c0Zyb21Qcm9jcyhhZGIsIGRldmljZVNvY2tldCk7XHJcblxyXG4gIGlmIChkZXZpY2VTb2NrZXQpIHtcclxuICAgIHJldHVybiB3ZWJ2aWV3cztcclxuICB9XHJcblxyXG4gIHdlYnZpZXdzID0gYXdhaXQgYXN5bmNtYXAod2Vidmlld3MsIGFzeW5jICh3ZWJ2aWV3TmFtZSkgPT4ge1xyXG4gICAgbGV0IHBrZyA9IGF3YWl0IGhlbHBlcnMucHJvY0Zyb21XZWJ2aWV3KGFkYiwgd2Vidmlld05hbWUpO1xyXG4gICAgcmV0dXJuIFdFQlZJRVdfQkFTRSArIHBrZztcclxuICB9KTtcclxuICBsb2dnZXIuZGVidWcoYEZvdW5kIHdlYnZpZXdzOiAke0pTT04uc3RyaW5naWZ5KHdlYnZpZXdzKX1gKTtcclxuICByZXR1cm4gd2Vidmlld3M7XHJcbn07XHJcblxyXG5oZWxwZXJzLmRlY29yYXRlQ2hyb21lT3B0aW9ucyA9IGZ1bmN0aW9uIChjYXBzLCBvcHRzLCBkZXZpY2VJZCkge1xyXG4gIC8vIGFkZCBvcHRpb25zIGZyb20gYXBwaXVtIHNlc3Npb24gY2Fwc1xyXG4gIGlmIChvcHRzLmNocm9tZU9wdGlvbnMpIHtcclxuICAgIGlmIChvcHRzLmNocm9tZU9wdGlvbnMuQXJndW1lbnRzKSB7XHJcbiAgICAgIC8vIG1lcmdlIGBBcmd1bWVudHNgIGFuZCBgYXJnc2BcclxuICAgICAgb3B0cy5jaHJvbWVPcHRpb25zLmFyZ3MgPSBbLi4uKG9wdHMuY2hyb21lT3B0aW9ucy5hcmdzIHx8IFtdKSwgLi4ub3B0cy5jaHJvbWVPcHRpb25zLkFyZ3VtZW50c107XHJcbiAgICAgIGRlbGV0ZSBvcHRzLmNocm9tZU9wdGlvbnMuQXJndW1lbnRzO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgW29wdCwgdmFsXSBvZiBfLnRvUGFpcnMob3B0cy5jaHJvbWVPcHRpb25zKSkge1xyXG4gICAgICBpZiAoXy5pc1VuZGVmaW5lZChjYXBzLmNocm9tZU9wdGlvbnNbb3B0XSkpIHtcclxuICAgICAgICBjYXBzLmNocm9tZU9wdGlvbnNbb3B0XSA9IHZhbDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsb2dnZXIud2FybihgQ2Fubm90IHBhc3Mgb3B0aW9uICR7Y2Fwcy5jaHJvbWVPcHRpb25zW29wdF19IGJlY2F1c2UgYCArXHJcbiAgICAgICAgICAgICAgICAgICAgXCJBcHBpdW0gbmVlZHMgaXQgdG8gbWFrZSBjaHJvbWVEcml2ZXIgd29ya1wiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gYWRkIGRldmljZSBpZCBmcm9tIGFkYlxyXG4gIGNhcHMuY2hyb21lT3B0aW9ucy5hbmRyb2lkRGV2aWNlU2VyaWFsID0gZGV2aWNlSWQ7XHJcbiAgcmV0dXJuIGNhcHM7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBoZWxwZXJzO1xyXG5leHBvcnQgeyBoZWxwZXJzLCBOQVRJVkVfV0lOLCBXRUJWSUVXX1dJTiwgV0VCVklFV19CQVNFLCBDSFJPTUlVTV9XSU4gfTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi4ifQ==
