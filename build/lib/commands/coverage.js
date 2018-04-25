'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _temp = require('temp');

var _temp2 = _interopRequireDefault(_temp);

var _appiumSupport = require('appium-support');

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var commands = {},
    helpers = {},
    extensions = {};

function unlinkFile(file) {
  return _regeneratorRuntime.async(function unlinkFile$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(file));

      case 2:
        if (!context$1$0.sent) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.unlink(file));

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

commands.endCoverage = function callee$0$0(intentToBroadcast, ecOnDevicePath) {
  var localFile, b64data, data;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        localFile = _temp2['default'].path({ prefix: 'appium', suffix: '.ec' });
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(unlinkFile(localFile));

      case 3:
        b64data = '';
        context$1$0.prev = 4;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.adb.rimraf(ecOnDevicePath));

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.adb.broadcastProcessEnd(intentToBroadcast, this.appProcess));

      case 9:
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(this.adb.pull(ecOnDevicePath, localFile));

      case 11:
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(localFile));

      case 13:
        data = context$1$0.sent;

        b64data = new Buffer(data).toString('base64');
        context$1$0.next = 17;
        return _regeneratorRuntime.awrap(unlinkFile(localFile));

      case 17:
        context$1$0.next = 22;
        break;

      case 19:
        context$1$0.prev = 19;
        context$1$0.t0 = context$1$0['catch'](4);

        _logger2['default'].debug('Error ending test coverage: ' + context$1$0.t0.message);

      case 22:
        return context$1$0.abrupt('return', b64data);

      case 23:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[4, 19]]);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;

// ensure the ec we're pulling is newly created as a result of the intent.
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9jb3ZlcmFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7NkJBQ0osZ0JBQWdCOztzQkFDbkIsV0FBVzs7OztBQUczQixJQUFJLFFBQVEsR0FBRyxFQUFFO0lBQUUsT0FBTyxHQUFHLEVBQUU7SUFBRSxVQUFVLEdBQUcsRUFBRSxDQUFDOztBQUVqRCxTQUFlLFVBQVUsQ0FBRSxJQUFJOzs7Ozt5Q0FDbkIsa0JBQUcsTUFBTSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7O3lDQUNqQixrQkFBRyxNQUFNLENBQUMsSUFBSSxDQUFDOzs7Ozs7O0NBRXhCOztBQUVELFFBQVEsQ0FBQyxXQUFXLEdBQUcsb0JBQWdCLGlCQUFpQixFQUFFLGNBQWM7TUFDbEUsU0FBUyxFQUdULE9BQU8sRUFRTCxJQUFJOzs7O0FBWE4saUJBQVMsR0FBRyxrQkFBSyxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQzs7eUNBQ3RELFVBQVUsQ0FBQyxTQUFTLENBQUM7OztBQUV2QixlQUFPLEdBQUcsRUFBRTs7O3lDQUdSLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQzs7Ozt5Q0FFL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDOzs7O3lDQUVoRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDOzs7O3lDQUM3QixrQkFBRyxRQUFRLENBQUMsU0FBUyxDQUFDOzs7QUFBbkMsWUFBSTs7QUFDUixlQUFPLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzt5Q0FDeEMsVUFBVSxDQUFDLFNBQVMsQ0FBQzs7Ozs7Ozs7OztBQUUzQiw0QkFBSSxLQUFLLGtDQUFnQyxlQUFJLE9BQU8sQ0FBRyxDQUFDOzs7NENBRW5ELE9BQU87Ozs7Ozs7Q0FDZixDQUFDOztBQUdGLGVBQWMsVUFBVSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQyxRQUFRLEdBQVIsUUFBUTtRQUFFLE9BQU8sR0FBUCxPQUFPO3FCQUNYLFVBQVUiLCJmaWxlIjoibGliL2NvbW1hbmRzL2NvdmVyYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRlbXAgZnJvbSAndGVtcCc7XHJcbmltcG9ydCB7IGZzIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xyXG5pbXBvcnQgbG9nIGZyb20gJy4uL2xvZ2dlcic7XHJcblxyXG5cclxubGV0IGNvbW1hbmRzID0ge30sIGhlbHBlcnMgPSB7fSwgZXh0ZW5zaW9ucyA9IHt9O1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gdW5saW5rRmlsZSAoZmlsZSkge1xyXG4gIGlmIChhd2FpdCBmcy5leGlzdHMoZmlsZSkpIHtcclxuICAgIGF3YWl0IGZzLnVubGluayhmaWxlKTtcclxuICB9XHJcbn1cclxuXHJcbmNvbW1hbmRzLmVuZENvdmVyYWdlID0gYXN5bmMgZnVuY3Rpb24gKGludGVudFRvQnJvYWRjYXN0LCBlY09uRGV2aWNlUGF0aCkge1xyXG4gIGxldCBsb2NhbEZpbGUgPSB0ZW1wLnBhdGgoe3ByZWZpeDogJ2FwcGl1bScsIHN1ZmZpeDogJy5lYyd9KTtcclxuICBhd2FpdCB1bmxpbmtGaWxlKGxvY2FsRmlsZSk7XHJcblxyXG4gIGxldCBiNjRkYXRhID0gJyc7XHJcbiAgdHJ5IHtcclxuICAgIC8vIGVuc3VyZSB0aGUgZWMgd2UncmUgcHVsbGluZyBpcyBuZXdseSBjcmVhdGVkIGFzIGEgcmVzdWx0IG9mIHRoZSBpbnRlbnQuXHJcbiAgICBhd2FpdCB0aGlzLmFkYi5yaW1yYWYoZWNPbkRldmljZVBhdGgpO1xyXG5cclxuICAgIGF3YWl0IHRoaXMuYWRiLmJyb2FkY2FzdFByb2Nlc3NFbmQoaW50ZW50VG9Ccm9hZGNhc3QsIHRoaXMuYXBwUHJvY2Vzcyk7XHJcblxyXG4gICAgYXdhaXQgdGhpcy5hZGIucHVsbChlY09uRGV2aWNlUGF0aCwgbG9jYWxGaWxlKTtcclxuICAgIGxldCBkYXRhID0gYXdhaXQgZnMucmVhZEZpbGUobG9jYWxGaWxlKTtcclxuICAgIGI2NGRhdGEgPSBuZXcgQnVmZmVyKGRhdGEpLnRvU3RyaW5nKCdiYXNlNjQnKTtcclxuICAgIGF3YWl0IHVubGlua0ZpbGUobG9jYWxGaWxlKTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGxvZy5kZWJ1ZyhgRXJyb3IgZW5kaW5nIHRlc3QgY292ZXJhZ2U6ICR7ZXJyLm1lc3NhZ2V9YCk7XHJcbiAgfVxyXG4gIHJldHVybiBiNjRkYXRhO1xyXG59O1xyXG5cclxuXHJcbk9iamVjdC5hc3NpZ24oZXh0ZW5zaW9ucywgY29tbWFuZHMsIGhlbHBlcnMpO1xyXG5leHBvcnQgeyBjb21tYW5kcywgaGVscGVycyB9O1xyXG5leHBvcnQgZGVmYXVsdCBleHRlbnNpb25zO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi4ifQ==
