'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumSupport = require('appium-support');

var commands = {};

commands.mobileShell = function callee$0$0() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var args;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.relaxedSecurityEnabled) {
          _logger2['default'].errorAndThrow('Appium server must have relaxed security flag set in order to run any shell commands');
        }

        if (!_lodash2['default'].isString(opts.command)) {
          _logger2['default'].errorAndThrow('The \'command\' argument is mandatory\'');
        }
        args = opts.args;

        if (_appiumSupport.util.hasValue(args)) {
          if (!_lodash2['default'].isArray(args)) {
            args = [args];
          }
        } else {
          args = [];
        }

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.adb.shell([opts.command].concat(_toConsumableArray(args))));

      case 6:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

exports.commands = commands;
exports['default'] = commands;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9zaGVsbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7c0JBQWdCLFdBQVc7Ozs7c0JBQ2IsUUFBUTs7Ozs2QkFDRCxnQkFBZ0I7O0FBRXJDLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQzs7QUFFbEIsUUFBUSxDQUFDLFdBQVcsR0FBRztNQUFnQixJQUFJLHlEQUFHLEVBQUU7TUFRMUMsSUFBSTs7OztBQVBSLFlBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUU7QUFDaEMsOEJBQUksYUFBYSx3RkFBd0YsQ0FBQztTQUMzRzs7QUFFRCxZQUFJLENBQUMsb0JBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUM3Qiw4QkFBSSxhQUFhLDJDQUF3QyxDQUFDO1NBQzNEO0FBQ0csWUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJOztBQUNwQixZQUFJLG9CQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUN2QixjQUFJLENBQUMsb0JBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3BCLGdCQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztXQUNmO1NBQ0YsTUFBTTtBQUNMLGNBQUksR0FBRyxFQUFFLENBQUM7U0FDWDs7O3lDQUVZLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLDRCQUFLLElBQUksR0FBRTs7Ozs7Ozs7OztDQUNyRCxDQUFDOztRQUVPLFFBQVEsR0FBUixRQUFRO3FCQUNGLFFBQVEiLCJmaWxlIjoibGliL2NvbW1hbmRzL3NoZWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGxvZyBmcm9tICcuLi9sb2dnZXInO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyB1dGlsIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xyXG5cclxubGV0IGNvbW1hbmRzID0ge307XHJcblxyXG5jb21tYW5kcy5tb2JpbGVTaGVsbCA9IGFzeW5jIGZ1bmN0aW9uIChvcHRzID0ge30pIHtcclxuICBpZiAoIXRoaXMucmVsYXhlZFNlY3VyaXR5RW5hYmxlZCkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEFwcGl1bSBzZXJ2ZXIgbXVzdCBoYXZlIHJlbGF4ZWQgc2VjdXJpdHkgZmxhZyBzZXQgaW4gb3JkZXIgdG8gcnVuIGFueSBzaGVsbCBjb21tYW5kc2ApO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFfLmlzU3RyaW5nKG9wdHMuY29tbWFuZCkpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KGBUaGUgJ2NvbW1hbmQnIGFyZ3VtZW50IGlzIG1hbmRhdG9yeSdgKTtcclxuICB9XHJcbiAgbGV0IGFyZ3MgPSBvcHRzLmFyZ3M7XHJcbiAgaWYgKHV0aWwuaGFzVmFsdWUoYXJncykpIHtcclxuICAgIGlmICghXy5pc0FycmF5KGFyZ3MpKSB7XHJcbiAgICAgIGFyZ3MgPSBbYXJnc107XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGFyZ3MgPSBbXTtcclxuICB9XHJcblxyXG4gIHJldHVybiBhd2FpdCB0aGlzLmFkYi5zaGVsbChbb3B0cy5jb21tYW5kLCAuLi5hcmdzXSk7XHJcbn07XHJcblxyXG5leHBvcnQgeyBjb21tYW5kcyB9O1xyXG5leHBvcnQgZGVmYXVsdCBjb21tYW5kcztcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uIn0=
