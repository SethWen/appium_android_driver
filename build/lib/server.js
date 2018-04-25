'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _appiumBaseDriver = require('appium-base-driver');

var _driver = require('./driver');

var _driver2 = _interopRequireDefault(_driver);

function startServer(port, host) {
  var d, router, server;
  return _regeneratorRuntime.async(function startServer$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        d = new _driver2['default']();
        router = (0, _appiumBaseDriver.routeConfiguringFunction)(d);
        server = (0, _appiumBaseDriver.server)(router, port, host);

        _logger2['default'].info('AndroidDriver server listening on http://' + host + ':' + port);
        return context$1$0.abrupt('return', server);

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

exports.startServer = startServer;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9zZXJ2ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztzQkFBZ0IsVUFBVTs7OztnQ0FDcUMsb0JBQW9COztzQkFDekQsVUFBVTs7OztBQUdwQyxTQUFlLFdBQVcsQ0FBRSxJQUFJLEVBQUUsSUFBSTtNQUNoQyxDQUFDLEVBQ0QsTUFBTSxFQUNOLE1BQU07Ozs7QUFGTixTQUFDLEdBQUcseUJBQW1CO0FBQ3ZCLGNBQU0sR0FBRyxnREFBeUIsQ0FBQyxDQUFDO0FBQ3BDLGNBQU0sR0FBRyw4QkFBVyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzs7QUFDM0MsNEJBQUksSUFBSSwrQ0FBNkMsSUFBSSxTQUFJLElBQUksQ0FBRyxDQUFDOzRDQUM5RCxNQUFNOzs7Ozs7O0NBQ2Q7O1FBRVEsV0FBVyxHQUFYLFdBQVciLCJmaWxlIjoibGliL3NlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xyXG5pbXBvcnQgeyBzZXJ2ZXIgYXMgYmFzZVNlcnZlciwgcm91dGVDb25maWd1cmluZ0Z1bmN0aW9uIH0gZnJvbSAnYXBwaXVtLWJhc2UtZHJpdmVyJztcclxuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi9kcml2ZXInO1xyXG5cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHN0YXJ0U2VydmVyIChwb3J0LCBob3N0KSB7XHJcbiAgbGV0IGQgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xyXG4gIGxldCByb3V0ZXIgPSByb3V0ZUNvbmZpZ3VyaW5nRnVuY3Rpb24oZCk7XHJcbiAgbGV0IHNlcnZlciA9IGJhc2VTZXJ2ZXIocm91dGVyLCBwb3J0LCBob3N0KTtcclxuICBsb2cuaW5mbyhgQW5kcm9pZERyaXZlciBzZXJ2ZXIgbGlzdGVuaW5nIG9uIGh0dHA6Ly8ke2hvc3R9OiR7cG9ydH1gKTtcclxuICByZXR1cm4gc2VydmVyO1xyXG59XHJcblxyXG5leHBvcnQgeyBzdGFydFNlcnZlciB9O1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLiJ9
