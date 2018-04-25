'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumBaseDriver = require('appium-base-driver');

var extensions = {};

extensions.execute = function callee$0$0(script, args) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!script.match(/^mobile\:/)) {
          context$1$0.next = 5;
          break;
        }

        script = script.replace(/^mobile\:/, '').trim();
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.executeMobile(script, _lodash2['default'].isArray(args) ? args[0] : args));

      case 4:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 5:
        throw new _appiumBaseDriver.errors.NotImplementedError();

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

extensions.executeMobile = function callee$0$0(mobileCommand) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var mobileCommandsMapping;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        mobileCommandsMapping = {
          shell: function shell(x) {
            return _regeneratorRuntime.async(function shell$(context$2$0) {
              while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                  context$2$0.next = 2;
                  return _regeneratorRuntime.awrap(this.mobileShell(x));

                case 2:
                  return context$2$0.abrupt('return', context$2$0.sent);

                case 3:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, _this);
          }
        };

        if (_lodash2['default'].has(mobileCommandsMapping, mobileCommand)) {
          context$1$0.next = 3;
          break;
        }

        throw new _appiumBaseDriver.errors.UnknownCommandError('Unknown mobile command "' + mobileCommand + '". ' + ('Only ' + _lodash2['default'].keys(mobileCommandsMapping) + ' commands are supported.'));

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(mobileCommandsMapping[mobileCommand](opts));

      case 5:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

exports['default'] = extensions;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9leGVjdXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7c0JBQWMsUUFBUTs7OztnQ0FDQyxvQkFBb0I7O0FBRTNDLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQzs7QUFFcEIsVUFBVSxDQUFDLE9BQU8sR0FBRyxvQkFBZ0IsTUFBTSxFQUFFLElBQUk7Ozs7YUFDM0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7Ozs7O0FBQzNCLGNBQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7eUNBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLG9CQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDOzs7Ozs7Y0FHckUsSUFBSSx5QkFBTyxtQkFBbUIsRUFBRTs7Ozs7OztDQUN2QyxDQUFDOztBQUVGLFVBQVUsQ0FBQyxhQUFhLEdBQUcsb0JBQWdCLGFBQWE7TUFBRSxJQUFJLHlEQUFHLEVBQUU7TUFDM0QscUJBQXFCOzs7Ozs7QUFBckIsNkJBQXFCLEdBQUc7QUFDNUIsZUFBSyxFQUFFLGVBQU8sQ0FBQzs7Ozs7bURBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7V0FBQTtTQUM5Qzs7WUFFSSxvQkFBRSxHQUFHLENBQUMscUJBQXFCLEVBQUUsYUFBYSxDQUFDOzs7OztjQUN4QyxJQUFJLHlCQUFPLG1CQUFtQixDQUFDLDZCQUEyQixhQUFhLHNCQUNoQyxvQkFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsOEJBQTBCLENBQUM7Ozs7eUNBRTFGLHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7OztDQUN4RCxDQUFDOztxQkFFYSxVQUFVIiwiZmlsZSI6ImxpYi9jb21tYW5kcy9leGVjdXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgZXJyb3JzIH0gZnJvbSAnYXBwaXVtLWJhc2UtZHJpdmVyJztcclxuXHJcbmxldCBleHRlbnNpb25zID0ge307XHJcblxyXG5leHRlbnNpb25zLmV4ZWN1dGUgPSBhc3luYyBmdW5jdGlvbiAoc2NyaXB0LCBhcmdzKSB7XHJcbiAgaWYgKHNjcmlwdC5tYXRjaCgvXm1vYmlsZVxcOi8pKSB7XHJcbiAgICBzY3JpcHQgPSBzY3JpcHQucmVwbGFjZSgvXm1vYmlsZVxcOi8sICcnKS50cmltKCk7XHJcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5leGVjdXRlTW9iaWxlKHNjcmlwdCwgXy5pc0FycmF5KGFyZ3MpID8gYXJnc1swXSA6IGFyZ3MpO1xyXG4gIH1cclxuXHJcbiAgdGhyb3cgbmV3IGVycm9ycy5Ob3RJbXBsZW1lbnRlZEVycm9yKCk7XHJcbn07XHJcblxyXG5leHRlbnNpb25zLmV4ZWN1dGVNb2JpbGUgPSBhc3luYyBmdW5jdGlvbiAobW9iaWxlQ29tbWFuZCwgb3B0cyA9IHt9KSB7XHJcbiAgY29uc3QgbW9iaWxlQ29tbWFuZHNNYXBwaW5nID0ge1xyXG4gICAgc2hlbGw6IGFzeW5jICh4KSA9PiBhd2FpdCB0aGlzLm1vYmlsZVNoZWxsKHgpLFxyXG4gIH07XHJcblxyXG4gIGlmICghXy5oYXMobW9iaWxlQ29tbWFuZHNNYXBwaW5nLCBtb2JpbGVDb21tYW5kKSkge1xyXG4gICAgdGhyb3cgbmV3IGVycm9ycy5Vbmtub3duQ29tbWFuZEVycm9yKGBVbmtub3duIG1vYmlsZSBjb21tYW5kIFwiJHttb2JpbGVDb21tYW5kfVwiLiBgICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgT25seSAke18ua2V5cyhtb2JpbGVDb21tYW5kc01hcHBpbmcpfSBjb21tYW5kcyBhcmUgc3VwcG9ydGVkLmApO1xyXG4gIH1cclxuICByZXR1cm4gYXdhaXQgbW9iaWxlQ29tbWFuZHNNYXBwaW5nW21vYmlsZUNvbW1hbmRdKG9wdHMpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXh0ZW5zaW9ucztcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uIn0=
