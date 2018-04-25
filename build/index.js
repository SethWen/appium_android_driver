#!/usr/bin/env node

require('source-map-support').install();

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _asyncbox = require('asyncbox');

var _libServer = require('./lib/server');

var _libDriver = require('./lib/driver');

var _libDriver2 = _interopRequireDefault(_libDriver);

var _libAndroidHelpers = require('./lib/android-helpers');

var _libAndroidHelpers2 = _interopRequireDefault(_libAndroidHelpers);

var _libCommandsIndex = require('./lib/commands/index');

var _libCommandsIndex2 = _interopRequireDefault(_libCommandsIndex);

var _libWebviewHelpers = require('./lib/webview-helpers');

var _libWebviewHelpers2 = _interopRequireDefault(_libWebviewHelpers);

var _libDesiredCaps = require('./lib/desired-caps');

var DEFAULT_HOST = "localhost";
var DEFAULT_PORT = 4723;

function main() {
  var port, host;
  return _regeneratorRuntime.async(function main$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        port = _yargs2['default'].argv.port || DEFAULT_PORT;
        host = _yargs2['default'].argv.host || DEFAULT_HOST;
        return context$1$0.abrupt('return', (0, _libServer.startServer)(port, host));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

if (require.main === module) {
  (0, _asyncbox.asyncify)(main);
}

exports['default'] = _libDriver2['default'];
exports.androidHelpers = _libAndroidHelpers2['default'];
exports.androidCommands = _libCommandsIndex2['default'];
exports.AndroidDriver = _libDriver2['default'];
exports.startServer = _libServer.startServer;
exports.commonCapConstraints = _libDesiredCaps.commonCapConstraints;
exports.webviewHelpers = _libWebviewHelpers2['default'];
exports.NATIVE_WIN = _libWebviewHelpers.NATIVE_WIN;
exports.WEBVIEW_WIN = _libWebviewHelpers.WEBVIEW_WIN;
exports.WEBVIEW_BASE = _libWebviewHelpers.WEBVIEW_BASE;
exports.CHROMIUM_WIN = _libWebviewHelpers.CHROMIUM_WIN;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7cUJBR2tCLE9BQU87Ozs7d0JBQ0EsVUFBVTs7eUJBQ1AsY0FBYzs7eUJBQ2hCLGNBQWM7Ozs7aUNBQ2IsdUJBQXVCOzs7O2dDQUN0QixzQkFBc0I7Ozs7aUNBRXJCLHVCQUF1Qjs7Ozs4QkFDZixvQkFBb0I7O0FBRXpELElBQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQztBQUNqQyxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUM7O0FBRTFCLFNBQWUsSUFBSTtNQUNiLElBQUksRUFDSixJQUFJOzs7O0FBREosWUFBSSxHQUFHLG1CQUFNLElBQUksQ0FBQyxJQUFJLElBQUksWUFBWTtBQUN0QyxZQUFJLEdBQUcsbUJBQU0sSUFBSSxDQUFDLElBQUksSUFBSSxZQUFZOzRDQUNuQyw0QkFBWSxJQUFJLEVBQUUsSUFBSSxDQUFDOzs7Ozs7O0NBQy9COztBQUVELElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7QUFDM0IsMEJBQVMsSUFBSSxDQUFDLENBQUM7Q0FDaEI7OztRQUdRLGNBQWM7UUFBRSxlQUFlO1FBQUUsYUFBYTtRQUFFLFdBQVc7UUFDM0Qsb0JBQW9CO1FBQUUsY0FBYztRQUFFLFVBQVU7UUFBRSxXQUFXO1FBQzdELFlBQVk7UUFBRSxZQUFZIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8vIHRyYW5zcGlsZTptYWluXHJcblxyXG5pbXBvcnQgeWFyZ3MgZnJvbSAneWFyZ3MnO1xyXG5pbXBvcnQgeyBhc3luY2lmeSB9IGZyb20gJ2FzeW5jYm94JztcclxuaW1wb3J0IHsgc3RhcnRTZXJ2ZXIgfSBmcm9tICcuL2xpYi9zZXJ2ZXInO1xyXG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuL2xpYi9kcml2ZXInO1xyXG5pbXBvcnQgYW5kcm9pZEhlbHBlcnMgZnJvbSAnLi9saWIvYW5kcm9pZC1oZWxwZXJzJztcclxuaW1wb3J0IGFuZHJvaWRDb21tYW5kcyBmcm9tICcuL2xpYi9jb21tYW5kcy9pbmRleCc7XHJcbmltcG9ydCB7IGRlZmF1bHQgYXMgd2Vidmlld0hlbHBlcnMsIE5BVElWRV9XSU4sIFdFQlZJRVdfV0lOLCBXRUJWSUVXX0JBU0UsXHJcbiAgICAgICAgIENIUk9NSVVNX1dJTiB9IGZyb20gJy4vbGliL3dlYnZpZXctaGVscGVycyc7XHJcbmltcG9ydCB7IGNvbW1vbkNhcENvbnN0cmFpbnRzIH0gZnJvbSAnLi9saWIvZGVzaXJlZC1jYXBzJztcclxuXHJcbmNvbnN0IERFRkFVTFRfSE9TVCA9IFwibG9jYWxob3N0XCI7XHJcbmNvbnN0IERFRkFVTFRfUE9SVCA9IDQ3MjM7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBtYWluICgpIHtcclxuICBsZXQgcG9ydCA9IHlhcmdzLmFyZ3YucG9ydCB8fCBERUZBVUxUX1BPUlQ7XHJcbiAgbGV0IGhvc3QgPSB5YXJncy5hcmd2Lmhvc3QgfHwgREVGQVVMVF9IT1NUO1xyXG4gIHJldHVybiBzdGFydFNlcnZlcihwb3J0LCBob3N0KTtcclxufVxyXG5cclxuaWYgKHJlcXVpcmUubWFpbiA9PT0gbW9kdWxlKSB7XHJcbiAgYXN5bmNpZnkobWFpbik7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuZHJvaWREcml2ZXI7XHJcbmV4cG9ydCB7IGFuZHJvaWRIZWxwZXJzLCBhbmRyb2lkQ29tbWFuZHMsIEFuZHJvaWREcml2ZXIsIHN0YXJ0U2VydmVyLFxyXG4gICAgICAgICBjb21tb25DYXBDb25zdHJhaW50cywgd2Vidmlld0hlbHBlcnMsIE5BVElWRV9XSU4sIFdFQlZJRVdfV0lOLFxyXG4gICAgICAgICBXRUJWSUVXX0JBU0UsIENIUk9NSVVNX1dJTiB9O1xyXG4iXSwic291cmNlUm9vdCI6Ii4uIn0=
