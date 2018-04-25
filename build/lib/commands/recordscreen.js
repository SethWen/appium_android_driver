'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _asyncbox = require('asyncbox');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _appiumSupport = require('appium-support');

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var commands = {},
    extensions = {};

var RETRY_PAUSE = 1000;

/**
* record the display of devices running Android 4.4 (API level 19) and higher.
* It records screen activity to an MPEG-4 file. Audio is not recorded with the video file.
*
* @param filePath the video file name
*                 for example, "/sdcard/demo.mp4"
* @param videoSize the format is widthxheight.
*                  if it is "default", the default value is the device's native display resolution (if supported),
*                  1280x720 if not. For best results,
*                  use a size supported by your device's Advanced Video Coding (AVC) encoder.
*                  for example, "1280x720"
* @param timeLimit the maximum recording time, in seconds. if it is -1, the default and maximum value is 180 (3 minutes).
* @param bitRate the video bit rate for the video, in megabits per second.
*                if it is -1, the default value is 4Mbps. You can increase the bit rate to improve video quality,
*                but doing so results in larger movie files.
*                for example, 6000000
*
*/
commands.startRecordingScreen = function callee$0$0(filePath, videoSize, timeLimit, bitRate) {
  var apiLevel, cmd;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this2 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isEmulator()) {
          context$1$0.next = 2;
          break;
        }

        throw new Error('Screen recording does not work on emulators');

      case 2:
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.adb.getApiLevel());

      case 4:
        apiLevel = context$1$0.sent;

        if (!(apiLevel < 19)) {
          context$1$0.next = 7;
          break;
        }

        throw new Error('Screen recording not available on API Level ' + apiLevel + '. Minimum API Level is 19.');

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.adb.fileExists(filePath));

      case 9:
        if (!context$1$0.sent) {
          context$1$0.next = 11;
          break;
        }

        throw new Error('Screen recording failed: \'' + filePath + '\' already exists.');

      case 11:
        cmd = ['screenrecord', filePath];

        if (_appiumSupport.util.hasValue(videoSize)) {
          cmd.push('--size', videoSize);
        }
        if (_appiumSupport.util.hasValue(timeLimit)) {
          cmd.push('--time-limit', timeLimit);
        }
        if (_appiumSupport.util.hasValue(bitRate)) {
          cmd.push('--bit-rate', bitRate);
        }

        // wrap in a manual Promise so we can handle errors in adb shell operation
        context$1$0.next = 17;
        return _regeneratorRuntime.awrap(new _bluebird2['default'](function callee$1$0(resolve, reject) {
          var err;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            var _this = this;

            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                err = undefined;

                _logger2['default'].debug('Beginning screen recording with command: \'adb ' + cmd.join(' ') + '\'');
                // do not await here, as the call runs in the background and we check for its product
                this.adb.shell(cmd)['catch'](function (e) {
                  err = e;
                });

                // there is the delay time to start recording the screen, so, wait until it is ready.
                // the ready condition is
                //   1. check the movie file is created
                //   2. check it is started to capture the screen
                context$2$0.prev = 3;
                context$2$0.next = 6;
                return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(10, RETRY_PAUSE, function callee$2$0() {
                  var size;
                  return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                      case 0:
                        if (!err) {
                          context$3$0.next = 2;
                          break;
                        }

                        return context$3$0.abrupt('return');

                      case 2:
                        size = this.adb.fileSize(filePath);

                        if (!(size <= 32)) {
                          context$3$0.next = 5;
                          break;
                        }

                        throw new Error('Remote file \'' + filePath + '\' found but it is still too small: ' + size + ' bytes');

                      case 5:
                      case 'end':
                        return context$3$0.stop();
                    }
                  }, null, _this);
                }));

              case 6:
                context$2$0.next = 11;
                break;

              case 8:
                context$2$0.prev = 8;
                context$2$0.t0 = context$2$0['catch'](3);

                err = context$2$0.t0;

              case 11:
                if (!err) {
                  context$2$0.next = 14;
                  break;
                }

                _logger2['default'].error('Error recording screen: err.message');
                return context$2$0.abrupt('return', reject(err));

              case 14:
                resolve();

              case 15:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this2, [[3, 8]]);
        }));

      case 17:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
* stop recording the screen.
*/
commands.stopRecordingScreen = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.killProcessesByName('screenrecord'));

      case 3:
        context$1$0.next = 8;
        break;

      case 5:
        context$1$0.prev = 5;
        context$1$0.t0 = context$1$0['catch'](0);

        _logger2['default'].errorAndThrow('Unable to stop screen recording: ' + context$1$0.t0.message);

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 5]]);
};

_Object$assign(extensions, commands);
exports.commands = commands;
exports['default'] = extensions;

// this function is suppported on the device running android 4.4(api level 19)

//if there's same file in the path, then thorws error

//make adb command
// eslint-disable-line curly
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9yZWNvcmRzY3JlZW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3dCQUE4QixVQUFVOzt3QkFDMUIsVUFBVTs7Ozs2QkFDSCxnQkFBZ0I7O3NCQUNyQixXQUFXOzs7O0FBRzNCLElBQUksUUFBUSxHQUFHLEVBQUU7SUFBRSxVQUFVLEdBQUcsRUFBRSxDQUFDOztBQUVuQyxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0J6QixRQUFRLENBQUMsb0JBQW9CLEdBQUcsb0JBQWdCLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE9BQU87TUFNakYsUUFBUSxFQVlSLEdBQUc7Ozs7OzthQWpCSCxJQUFJLENBQUMsVUFBVSxFQUFFOzs7OztjQUNiLElBQUksS0FBSyxDQUFDLDZDQUE2QyxDQUFDOzs7O3lDQUkzQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRTs7O0FBQXZDLGdCQUFROztjQUNSLFFBQVEsR0FBRyxFQUFFLENBQUE7Ozs7O2NBQ1QsSUFBSSxLQUFLLGtEQUFnRCxRQUFRLGdDQUE2Qjs7Ozt5Q0FJNUYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDOzs7Ozs7OztjQUMvQixJQUFJLEtBQUssaUNBQThCLFFBQVEsd0JBQW9COzs7QUFLdkUsV0FBRyxHQUFHLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQzs7QUFDcEMsWUFBSSxvQkFBSyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7QUFDNUIsYUFBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDL0I7QUFDRCxZQUFJLG9CQUFLLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtBQUM1QixhQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNyQztBQUNELFlBQUksb0JBQUssUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQzFCLGFBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ2pDOzs7O3lDQUdZLDBCQUFNLG9CQUFPLE9BQU8sRUFBRSxNQUFNO2NBQ25DLEdBQUc7Ozs7OztBQUFILG1CQUFHOztBQUNQLG9DQUFJLEtBQUsscURBQWtELEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQUksQ0FBQzs7QUFFN0Usb0JBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFNLENBQUMsVUFBQyxDQUFDLEVBQUs7QUFDL0IscUJBQUcsR0FBRyxDQUFDLENBQUM7aUJBQ1QsQ0FBQyxDQUFDOzs7Ozs7OztpREFPSyw2QkFBYyxFQUFFLEVBQUUsV0FBVyxFQUFFO3NCQUcvQixJQUFJOzs7OzZCQUZKLEdBQUc7Ozs7Ozs7O0FBRUgsNEJBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7OzhCQUNsQyxJQUFJLElBQUksRUFBRSxDQUFBOzs7Ozs4QkFDTixJQUFJLEtBQUssb0JBQWlCLFFBQVEsNENBQXNDLElBQUksWUFBUzs7Ozs7OztpQkFFOUYsQ0FBQzs7Ozs7Ozs7OztBQUVGLG1CQUFHLGlCQUFJLENBQUM7OztxQkFHTixHQUFHOzs7OztBQUNMLG9DQUFJLEtBQUssdUNBQXVDLENBQUM7b0RBQzFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7OztBQUVwQix1QkFBTyxFQUFFLENBQUM7Ozs7Ozs7U0FDWCxDQUFDOzs7Ozs7Ozs7O0NBQ0gsQ0FBQzs7Ozs7QUFLRixRQUFRLENBQUMsbUJBQW1CLEdBQUc7Ozs7Ozt5Q0FFckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUM7Ozs7Ozs7Ozs7QUFFbEQsNEJBQUksYUFBYSx1Q0FBcUMsZUFBSSxPQUFPLENBQUcsQ0FBQzs7Ozs7OztDQUV4RSxDQUFDOztBQUVGLGVBQWMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNCLFFBQVEsR0FBUixRQUFRO3FCQUNGLFVBQVUiLCJmaWxlIjoibGliL2NvbW1hbmRzL3JlY29yZHNjcmVlbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJldHJ5SW50ZXJ2YWwgfSBmcm9tICdhc3luY2JveCc7XHJcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcclxuaW1wb3J0IHsgdXRpbCB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcclxuaW1wb3J0IGxvZyBmcm9tICcuLi9sb2dnZXInO1xyXG5cclxuXHJcbmxldCBjb21tYW5kcyA9IHt9LCBleHRlbnNpb25zID0ge307XHJcblxyXG5jb25zdCBSRVRSWV9QQVVTRSA9IDEwMDA7XHJcblxyXG4vKipcclxuKiByZWNvcmQgdGhlIGRpc3BsYXkgb2YgZGV2aWNlcyBydW5uaW5nIEFuZHJvaWQgNC40IChBUEkgbGV2ZWwgMTkpIGFuZCBoaWdoZXIuXHJcbiogSXQgcmVjb3JkcyBzY3JlZW4gYWN0aXZpdHkgdG8gYW4gTVBFRy00IGZpbGUuIEF1ZGlvIGlzIG5vdCByZWNvcmRlZCB3aXRoIHRoZSB2aWRlbyBmaWxlLlxyXG4qXHJcbiogQHBhcmFtIGZpbGVQYXRoIHRoZSB2aWRlbyBmaWxlIG5hbWVcclxuKiAgICAgICAgICAgICAgICAgZm9yIGV4YW1wbGUsIFwiL3NkY2FyZC9kZW1vLm1wNFwiXHJcbiogQHBhcmFtIHZpZGVvU2l6ZSB0aGUgZm9ybWF0IGlzIHdpZHRoeGhlaWdodC5cclxuKiAgICAgICAgICAgICAgICAgIGlmIGl0IGlzIFwiZGVmYXVsdFwiLCB0aGUgZGVmYXVsdCB2YWx1ZSBpcyB0aGUgZGV2aWNlJ3MgbmF0aXZlIGRpc3BsYXkgcmVzb2x1dGlvbiAoaWYgc3VwcG9ydGVkKSxcclxuKiAgICAgICAgICAgICAgICAgIDEyODB4NzIwIGlmIG5vdC4gRm9yIGJlc3QgcmVzdWx0cyxcclxuKiAgICAgICAgICAgICAgICAgIHVzZSBhIHNpemUgc3VwcG9ydGVkIGJ5IHlvdXIgZGV2aWNlJ3MgQWR2YW5jZWQgVmlkZW8gQ29kaW5nIChBVkMpIGVuY29kZXIuXHJcbiogICAgICAgICAgICAgICAgICBmb3IgZXhhbXBsZSwgXCIxMjgweDcyMFwiXHJcbiogQHBhcmFtIHRpbWVMaW1pdCB0aGUgbWF4aW11bSByZWNvcmRpbmcgdGltZSwgaW4gc2Vjb25kcy4gaWYgaXQgaXMgLTEsIHRoZSBkZWZhdWx0IGFuZCBtYXhpbXVtIHZhbHVlIGlzIDE4MCAoMyBtaW51dGVzKS5cclxuKiBAcGFyYW0gYml0UmF0ZSB0aGUgdmlkZW8gYml0IHJhdGUgZm9yIHRoZSB2aWRlbywgaW4gbWVnYWJpdHMgcGVyIHNlY29uZC5cclxuKiAgICAgICAgICAgICAgICBpZiBpdCBpcyAtMSwgdGhlIGRlZmF1bHQgdmFsdWUgaXMgNE1icHMuIFlvdSBjYW4gaW5jcmVhc2UgdGhlIGJpdCByYXRlIHRvIGltcHJvdmUgdmlkZW8gcXVhbGl0eSxcclxuKiAgICAgICAgICAgICAgICBidXQgZG9pbmcgc28gcmVzdWx0cyBpbiBsYXJnZXIgbW92aWUgZmlsZXMuXHJcbiogICAgICAgICAgICAgICAgZm9yIGV4YW1wbGUsIDYwMDAwMDBcclxuKlxyXG4qL1xyXG5jb21tYW5kcy5zdGFydFJlY29yZGluZ1NjcmVlbiA9IGFzeW5jIGZ1bmN0aW9uIChmaWxlUGF0aCwgdmlkZW9TaXplLCB0aW1lTGltaXQsIGJpdFJhdGUpIHtcclxuICBpZiAodGhpcy5pc0VtdWxhdG9yKCkpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignU2NyZWVuIHJlY29yZGluZyBkb2VzIG5vdCB3b3JrIG9uIGVtdWxhdG9ycycpO1xyXG4gIH1cclxuXHJcbiAgLy8gdGhpcyBmdW5jdGlvbiBpcyBzdXBwcG9ydGVkIG9uIHRoZSBkZXZpY2UgcnVubmluZyBhbmRyb2lkIDQuNChhcGkgbGV2ZWwgMTkpXHJcbiAgbGV0IGFwaUxldmVsID0gYXdhaXQgdGhpcy5hZGIuZ2V0QXBpTGV2ZWwoKTtcclxuICBpZiAoYXBpTGV2ZWwgPCAxOSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBTY3JlZW4gcmVjb3JkaW5nIG5vdCBhdmFpbGFibGUgb24gQVBJIExldmVsICR7YXBpTGV2ZWx9LiBNaW5pbXVtIEFQSSBMZXZlbCBpcyAxOS5gKTtcclxuICB9XHJcblxyXG4gIC8vaWYgdGhlcmUncyBzYW1lIGZpbGUgaW4gdGhlIHBhdGgsIHRoZW4gdGhvcndzIGVycm9yXHJcbiAgaWYgKGF3YWl0IHRoaXMuYWRiLmZpbGVFeGlzdHMoZmlsZVBhdGgpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFNjcmVlbiByZWNvcmRpbmcgZmFpbGVkOiAnJHtmaWxlUGF0aH0nIGFscmVhZHkgZXhpc3RzLmApO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vbWFrZSBhZGIgY29tbWFuZFxyXG4gIGxldCBjbWQgPSBbJ3NjcmVlbnJlY29yZCcsIGZpbGVQYXRoXTtcclxuICBpZiAodXRpbC5oYXNWYWx1ZSh2aWRlb1NpemUpKSB7XHJcbiAgICBjbWQucHVzaCgnLS1zaXplJywgdmlkZW9TaXplKTtcclxuICB9XHJcbiAgaWYgKHV0aWwuaGFzVmFsdWUodGltZUxpbWl0KSkge1xyXG4gICAgY21kLnB1c2goJy0tdGltZS1saW1pdCcsIHRpbWVMaW1pdCk7XHJcbiAgfVxyXG4gIGlmICh1dGlsLmhhc1ZhbHVlKGJpdFJhdGUpKSB7XHJcbiAgICBjbWQucHVzaCgnLS1iaXQtcmF0ZScsIGJpdFJhdGUpO1xyXG4gIH1cclxuXHJcbiAgLy8gd3JhcCBpbiBhIG1hbnVhbCBQcm9taXNlIHNvIHdlIGNhbiBoYW5kbGUgZXJyb3JzIGluIGFkYiBzaGVsbCBvcGVyYXRpb25cclxuICByZXR1cm4gYXdhaXQgbmV3IEIoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgbGV0IGVycjtcclxuICAgIGxvZy5kZWJ1ZyhgQmVnaW5uaW5nIHNjcmVlbiByZWNvcmRpbmcgd2l0aCBjb21tYW5kOiAnYWRiICR7Y21kLmpvaW4oJyAnKX0nYCk7XHJcbiAgICAvLyBkbyBub3QgYXdhaXQgaGVyZSwgYXMgdGhlIGNhbGwgcnVucyBpbiB0aGUgYmFja2dyb3VuZCBhbmQgd2UgY2hlY2sgZm9yIGl0cyBwcm9kdWN0XHJcbiAgICB0aGlzLmFkYi5zaGVsbChjbWQpLmNhdGNoKChlKSA9PiB7XHJcbiAgICAgIGVyciA9IGU7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyB0aGVyZSBpcyB0aGUgZGVsYXkgdGltZSB0byBzdGFydCByZWNvcmRpbmcgdGhlIHNjcmVlbiwgc28sIHdhaXQgdW50aWwgaXQgaXMgcmVhZHkuXHJcbiAgICAvLyB0aGUgcmVhZHkgY29uZGl0aW9uIGlzXHJcbiAgICAvLyAgIDEuIGNoZWNrIHRoZSBtb3ZpZSBmaWxlIGlzIGNyZWF0ZWRcclxuICAgIC8vICAgMi4gY2hlY2sgaXQgaXMgc3RhcnRlZCB0byBjYXB0dXJlIHRoZSBzY3JlZW5cclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IHJldHJ5SW50ZXJ2YWwoMTAsIFJFVFJZX1BBVVNFLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGVycikgcmV0dXJuOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGN1cmx5XHJcblxyXG4gICAgICAgIGxldCBzaXplID0gdGhpcy5hZGIuZmlsZVNpemUoZmlsZVBhdGgpO1xyXG4gICAgICAgIGlmIChzaXplIDw9IDMyKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlbW90ZSBmaWxlICcke2ZpbGVQYXRofScgZm91bmQgYnV0IGl0IGlzIHN0aWxsIHRvbyBzbWFsbDogJHtzaXplfSBieXRlc2ApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGVyciA9IGU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGVycikge1xyXG4gICAgICBsb2cuZXJyb3IoYEVycm9yIHJlY29yZGluZyBzY3JlZW46IGVyci5tZXNzYWdlYCk7XHJcbiAgICAgIHJldHVybiByZWplY3QoZXJyKTtcclxuICAgIH1cclxuICAgIHJlc29sdmUoKTtcclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4qIHN0b3AgcmVjb3JkaW5nIHRoZSBzY3JlZW4uXHJcbiovXHJcbmNvbW1hbmRzLnN0b3BSZWNvcmRpbmdTY3JlZW4gPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IHRoaXMuYWRiLmtpbGxQcm9jZXNzZXNCeU5hbWUoJ3NjcmVlbnJlY29yZCcpO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coYFVuYWJsZSB0byBzdG9wIHNjcmVlbiByZWNvcmRpbmc6ICR7ZXJyLm1lc3NhZ2V9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuT2JqZWN0LmFzc2lnbihleHRlbnNpb25zLCBjb21tYW5kcyk7XHJcbmV4cG9ydCB7IGNvbW1hbmRzIH07XHJcbmV4cG9ydCBkZWZhdWx0IGV4dGVuc2lvbnM7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLiJ9
