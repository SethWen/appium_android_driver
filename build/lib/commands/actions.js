'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _androidHelpers = require('../android-helpers');

var _androidHelpers2 = _interopRequireDefault(_androidHelpers);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _temp = require('temp');

var _temp2 = _interopRequireDefault(_temp);

var _appiumSupport = require('appium-support');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _jimp = require('jimp');

var _jimp2 = _interopRequireDefault(_jimp);

var _teen_process = require('teen_process');

var swipeStepsPerSec = 28;
var dragStepsPerSec = 40;
var CONTAINER_PATH_MARKER = '@';
// https://regex101.com/r/PLdB0G/2
var CONTAINER_PATH_PATTERN = new RegExp('^' + CONTAINER_PATH_MARKER + '([^/]+)/(.+)');

var commands = {},
    helpers = {},
    extensions = {};

commands.keyevent = function callee$0$0(keycode) {
  var metastate = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        // TODO deprecate keyevent; currently wd only implements keyevent
        _logger2['default'].warn("keyevent will be deprecated use pressKeyCode");
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.pressKeyCode(keycode, metastate));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.pressKeyCode = function callee$0$0(keycode) {
  var metastate = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("pressKeyCode", { keycode: keycode, metastate: metastate }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.longPressKeyCode = function callee$0$0(keycode) {
  var metastate = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("longPressKeyCode", { keycode: keycode, metastate: metastate }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getOrientation = function callee$0$0() {
  var params, orientation;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        params = {
          naturalOrientation: !!this.opts.androidNaturalOrientation
        };
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("orientation", params));

      case 3:
        orientation = context$1$0.sent;
        return context$1$0.abrupt('return', orientation.toUpperCase());

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.setOrientation = function callee$0$0(orientation) {
  var params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        orientation = orientation.toUpperCase();
        params = {
          orientation: orientation,
          naturalOrientation: !!this.opts.androidNaturalOrientation
        };
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("orientation", params));

      case 4:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.fakeFlick = function callee$0$0(xSpeed, ySpeed) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction('flick', { xSpeed: xSpeed, ySpeed: ySpeed }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.fakeFlickElement = function callee$0$0(elementId, xoffset, yoffset, speed) {
  var params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        params = { xoffset: xoffset, yoffset: yoffset, speed: speed, elementId: elementId };
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction('element:flick', params));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.swipe = function callee$0$0(startX, startY, endX, endY, duration, touchCount, elId) {
  var swipeOpts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (startX === 'null') {
          startX = 0.5;
        }
        if (startY === 'null') {
          startY = 0.5;
        }
        swipeOpts = { startX: startX, startY: startY, endX: endX, endY: endY,
          steps: Math.round(duration * swipeStepsPerSec) };

        // going the long way and checking for undefined and null since
        // we can't be assured `elId` is a string and not an int
        if (_appiumSupport.util.hasValue(elId)) {
          swipeOpts.elementId = elId;
        }
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.doSwipe(swipeOpts));

      case 6:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.doSwipe = function callee$0$0(swipeOpts) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!_appiumSupport.util.hasValue(swipeOpts.elementId)) {
          context$1$0.next = 6;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:swipe", swipeOpts));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("swipe", swipeOpts));

      case 8:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.pinchClose = function callee$0$0(startX, startY, endX, endY, duration, percent, steps, elId) {
  var pinchOpts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        pinchOpts = {
          direction: 'in',
          elementId: elId,
          percent: percent,
          steps: steps
        };
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:pinch", pinchOpts));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.pinchOpen = function callee$0$0(startX, startY, endX, endY, duration, percent, steps, elId) {
  var pinchOpts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        pinchOpts = { direction: 'out', elementId: elId, percent: percent, steps: steps };
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:pinch", pinchOpts));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.flick = function callee$0$0(element, xSpeed, ySpeed, xOffset, yOffset, speed) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!element) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.fakeFlickElement(element, xOffset, yOffset, speed));

      case 3:
        context$1$0.next = 7;
        break;

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.fakeFlick(xSpeed, ySpeed));

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.drag = function callee$0$0(startX, startY, endX, endY, duration, touchCount, elementId, destElId) {
  var dragOpts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        dragOpts = {
          elementId: elementId, destElId: destElId, startX: startX, startY: startY, endX: endX, endY: endY,
          steps: Math.round(duration * dragStepsPerSec)
        };
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.doDrag(dragOpts));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.doDrag = function callee$0$0(dragOpts) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!_appiumSupport.util.hasValue(dragOpts.elementId)) {
          context$1$0.next = 6;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:drag", dragOpts));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("drag", dragOpts));

      case 8:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.lock = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.lock());

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.isLocked = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.isScreenLocked());

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.unlock = function callee$0$0(unlockCapabilities) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_androidHelpers2['default'].unlock(this, this.adb, unlockCapabilities));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.openNotifications = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("openNotification"));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.setLocation = function callee$0$0(latitude, longitude) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.sendTelnetCommand('geo fix ' + longitude + ' ' + latitude));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

function parseContainerPath(remotePath) {
  var match = CONTAINER_PATH_PATTERN.exec(remotePath);
  if (!match) {
    _logger2['default'].errorAndThrow('It is expected that package identifier is separated from the relative path with a single slash. ' + ('\'' + remotePath + '\' is given instead'));
  }
  return [match[1], _path2['default'].posix.resolve('/data/data/' + match[1], match[2])];
}

commands.pullFile = function callee$0$0(remotePath) {
  var tmpDestination, _parseContainerPath, _parseContainerPath2, packageId, pathInContainer, localFile, data;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (remotePath.endsWith('/')) {
          _logger2['default'].errorAndThrow('It is expected that remote path points to a file and not to a folder. ' + ('\'' + remotePath + '\' is given instead'));
        }
        tmpDestination = null;

        if (!remotePath.startsWith(CONTAINER_PATH_MARKER)) {
          context$1$0.next = 19;
          break;
        }

        _parseContainerPath = parseContainerPath(remotePath);
        _parseContainerPath2 = _slicedToArray(_parseContainerPath, 2);
        packageId = _parseContainerPath2[0];
        pathInContainer = _parseContainerPath2[1];

        _logger2['default'].info('Parsed package identifier \'' + packageId + '\' from \'' + remotePath + '\'. Will get the data from \'' + pathInContainer + '\'');
        tmpDestination = '/data/local/tmp/' + _path2['default'].posix.basename(pathInContainer);
        context$1$0.prev = 9;
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(this.adb.shell(['run-as', packageId, 'chmod 777 \'' + pathInContainer.replace(/'/g, '\\\'') + '\'']));

      case 12:
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(this.adb.shell(['cp', '-f', pathInContainer, tmpDestination]));

      case 14:
        context$1$0.next = 19;
        break;

      case 16:
        context$1$0.prev = 16;
        context$1$0.t0 = context$1$0['catch'](9);

        _logger2['default'].errorAndThrow('Cannot access the container of \'' + packageId + '\' application. ' + 'Is the application installed and has \'debuggable\' build option set to true? ' + ('Original error: ' + context$1$0.t0.message));

      case 19:
        localFile = _temp2['default'].path({ prefix: 'appium', suffix: '.tmp' });
        context$1$0.prev = 20;
        context$1$0.next = 23;
        return _regeneratorRuntime.awrap(this.adb.pull(_lodash2['default'].isString(tmpDestination) ? tmpDestination : remotePath, localFile));

      case 23:
        context$1$0.next = 25;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(localFile));

      case 25:
        data = context$1$0.sent;
        return context$1$0.abrupt('return', new Buffer(data).toString('base64'));

      case 27:
        context$1$0.prev = 27;
        context$1$0.next = 30;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(localFile));

      case 30:
        if (!context$1$0.sent) {
          context$1$0.next = 33;
          break;
        }

        context$1$0.next = 33;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.unlink(localFile));

      case 33:
        if (!_lodash2['default'].isString(tmpDestination)) {
          context$1$0.next = 36;
          break;
        }

        context$1$0.next = 36;
        return _regeneratorRuntime.awrap(this.adb.shell(['rm', '-f', tmpDestination]));

      case 36:
        return context$1$0.finish(27);

      case 37:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[9, 16], [20,, 27, 37]]);
};

commands.pushFile = function callee$0$0(remotePath, base64Data) {
  var localFile, content, tmpDestination, _parseContainerPath3, _parseContainerPath32, packageId, pathInContainer;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (remotePath.endsWith('/')) {
          _logger2['default'].errorAndThrow('It is expected that remote path points to a file and not to a folder. ' + ('\'' + remotePath + '\' is given instead'));
        }
        localFile = _temp2['default'].path({ prefix: 'appium', suffix: '.tmp' });
        content = new Buffer(base64Data, 'base64');
        tmpDestination = null;
        context$1$0.prev = 4;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.writeFile(localFile, content.toString('binary'), 'binary'));

      case 7:
        if (!remotePath.startsWith(CONTAINER_PATH_MARKER)) {
          context$1$0.next = 32;
          break;
        }

        _parseContainerPath3 = parseContainerPath(remotePath);
        _parseContainerPath32 = _slicedToArray(_parseContainerPath3, 2);
        packageId = _parseContainerPath32[0];
        pathInContainer = _parseContainerPath32[1];

        _logger2['default'].info('Parsed package identifier \'' + packageId + '\' from \'' + remotePath + '\'. Will put the data into \'' + pathInContainer + '\'');
        tmpDestination = '/data/local/tmp/' + _path2['default'].posix.basename(pathInContainer);
        context$1$0.prev = 14;
        context$1$0.next = 17;
        return _regeneratorRuntime.awrap(this.adb.shell(['run-as', packageId, 'mkdir -p \'' + _path2['default'].posix.dirname(pathInContainer).replace(/'/g, '\\\'') + '\'']));

      case 17:
        context$1$0.next = 19;
        return _regeneratorRuntime.awrap(this.adb.shell(['run-as', packageId, 'touch \'' + pathInContainer.replace(/'/g, '\\\'') + '\'']));

      case 19:
        context$1$0.next = 21;
        return _regeneratorRuntime.awrap(this.adb.shell(['run-as', packageId, 'chmod 777 \'' + pathInContainer.replace(/'/g, '\\\'') + '\'']));

      case 21:
        context$1$0.next = 23;
        return _regeneratorRuntime.awrap(this.adb.push(localFile, tmpDestination));

      case 23:
        context$1$0.next = 25;
        return _regeneratorRuntime.awrap(this.adb.shell(['cp', '-f', tmpDestination, pathInContainer]));

      case 25:
        context$1$0.next = 30;
        break;

      case 27:
        context$1$0.prev = 27;
        context$1$0.t0 = context$1$0['catch'](14);

        _logger2['default'].errorAndThrow('Cannot access the container of \'' + packageId + '\' application. ' + 'Is the application installed and has \'debuggable\' build option set to true? ' + ('Original error: ' + context$1$0.t0.message));

      case 30:
        context$1$0.next = 34;
        break;

      case 32:
        context$1$0.next = 34;
        return _regeneratorRuntime.awrap(this.adb.push(localFile, remotePath));

      case 34:
        context$1$0.prev = 34;
        context$1$0.next = 37;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(localFile));

      case 37:
        if (!context$1$0.sent) {
          context$1$0.next = 40;
          break;
        }

        context$1$0.next = 40;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.unlink(localFile));

      case 40:
        if (!_lodash2['default'].isString(tmpDestination)) {
          context$1$0.next = 43;
          break;
        }

        context$1$0.next = 43;
        return _regeneratorRuntime.awrap(this.adb.shell(['rm', '-f', tmpDestination]));

      case 43:
        return context$1$0.finish(34);

      case 44:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[4,, 34, 44], [14, 27]]);
};

commands.pullFolder = function callee$0$0(remotePath) {
  var localFolder;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        localFolder = _temp2['default'].path({ prefix: 'appium' });
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.pull(remotePath, localFolder));

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(_appiumSupport.zip.toInMemoryZip(localFolder));

      case 5:
        return context$1$0.abrupt('return', context$1$0.sent.toString('base64'));

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.fingerprint = function callee$0$0(fingerprintId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isEmulator()) {
          _logger2['default'].errorAndThrow("fingerprint method is only available for emulators");
        }
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.fingerprint(fingerprintId));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.sendSMS = function callee$0$0(phoneNumber, message) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isEmulator()) {
          _logger2['default'].errorAndThrow("sendSMS method is only available for emulators");
        }
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.sendSMS(phoneNumber, message));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.gsmCall = function callee$0$0(phoneNumber, action) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isEmulator()) {
          _logger2['default'].errorAndThrow("gsmCall method is only available for emulators");
        }
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.gsmCall(phoneNumber, action));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.gsmSignal = function callee$0$0(signalStrengh) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isEmulator()) {
          _logger2['default'].errorAndThrow("gsmSignal method is only available for emulators");
        }
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.gsmSignal(signalStrengh));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.gsmVoice = function callee$0$0(state) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isEmulator()) {
          _logger2['default'].errorAndThrow("gsmVoice method is only available for emulators");
        }
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.gsmVoice(state));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.powerAC = function callee$0$0(state) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isEmulator()) {
          _logger2['default'].errorAndThrow("powerAC method is only available for emulators");
        }
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.powerAC(state));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.powerCapacity = function callee$0$0(batteryPercent) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isEmulator()) {
          _logger2['default'].errorAndThrow("powerCapacity method is only available for emulators");
        }
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.powerCapacity(batteryPercent));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.networkSpeed = function callee$0$0(networkSpeed) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isEmulator()) {
          _logger2['default'].errorAndThrow("networkSpeed method is only available for emulators");
        }
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.networkSpeed(networkSpeed));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.getScreenshotDataWithAdbShell = function callee$0$0(adb, opts) {
  var localFile, pngDir, png, cmd;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        localFile = _temp2['default'].path({ prefix: 'appium', suffix: '.png' });
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(localFile));

      case 3:
        if (!context$1$0.sent) {
          context$1$0.next = 6;
          break;
        }

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.unlink(localFile));

      case 6:
        context$1$0.prev = 6;
        pngDir = opts.androidScreenshotPath || '/data/local/tmp/';
        png = _path2['default'].posix.resolve(pngDir, 'screenshot.png');
        cmd = ['/system/bin/rm', png + ';', '/system/bin/screencap', '-p', png];
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(adb.shell(cmd));

      case 12:
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(adb.fileSize(png));

      case 14:
        if (context$1$0.sent) {
          context$1$0.next = 16;
          break;
        }

        throw new Error('The size of the taken screenshot equals to zero.');

      case 16:
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(adb.pull(png, localFile));

      case 18:
        context$1$0.next = 20;
        return _regeneratorRuntime.awrap(_jimp2['default'].read(localFile));

      case 20:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 21:
        context$1$0.prev = 21;
        context$1$0.next = 24;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(localFile));

      case 24:
        if (!context$1$0.sent) {
          context$1$0.next = 27;
          break;
        }

        context$1$0.next = 27;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.unlink(localFile));

      case 27:
        return context$1$0.finish(21);

      case 28:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[6,, 21, 28]]);
};

helpers.getScreenshotDataWithAdbExecOut = function callee$0$0(adb) {
  var _ref, stdout, stderr, code;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(adb.executable.path, adb.executable.defaultArgs.concat(['exec-out', '/system/bin/screencap', '-p']), { encoding: 'binary', isBuffer: true }));

      case 2:
        _ref = context$1$0.sent;
        stdout = _ref.stdout;
        stderr = _ref.stderr;
        code = _ref.code;

        if (!(code || stderr.length)) {
          context$1$0.next = 8;
          break;
        }

        throw new Error('Screenshot returned error, code: \'' + code + '\', stderr: \'' + stderr.toString() + '\'');

      case 8:
        if (stdout.length) {
          context$1$0.next = 10;
          break;
        }

        throw new Error('Screenshot returned no data');

      case 10:
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(_jimp2['default'].read(stdout));

      case 12:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getScreenshot = function callee$0$0() {
  var apiLevel, image, err, screenOrientation, getBuffer, imgBuffer;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.getApiLevel());

      case 2:
        apiLevel = context$1$0.sent;
        image = null;

        if (!(apiLevel > 20)) {
          context$1$0.next = 14;
          break;
        }

        context$1$0.prev = 5;
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.getScreenshotDataWithAdbExecOut(this.adb));

      case 8:
        image = context$1$0.sent;
        context$1$0.next = 14;
        break;

      case 11:
        context$1$0.prev = 11;
        context$1$0.t0 = context$1$0['catch'](5);

        _logger2['default'].info('Cannot get screenshot data with \'adb exec-out\' because of \'' + context$1$0.t0.message + '\'. ' + 'Defaulting to \'adb shell\' call');

      case 14:
        if (image) {
          context$1$0.next = 25;
          break;
        }

        context$1$0.prev = 15;
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(this.getScreenshotDataWithAdbShell(this.adb, this.opts));

      case 18:
        image = context$1$0.sent;
        context$1$0.next = 25;
        break;

      case 21:
        context$1$0.prev = 21;
        context$1$0.t1 = context$1$0['catch'](15);
        err = 'Cannot get screenshot data because of \'' + context$1$0.t1.message + '\'. ' + 'Make sure the \'LayoutParams.FLAG_SECURE\' is not set for ' + 'the current view';

        _logger2['default'].errorAndThrow(err);

      case 25:
        if (!(apiLevel < 23)) {
          context$1$0.next = 38;
          break;
        }

        context$1$0.next = 28;
        return _regeneratorRuntime.awrap(this.adb.getScreenOrientation());

      case 28:
        screenOrientation = context$1$0.sent;
        context$1$0.prev = 29;
        context$1$0.next = 32;
        return _regeneratorRuntime.awrap(image.rotate(-90 * screenOrientation));

      case 32:
        image = context$1$0.sent;
        context$1$0.next = 38;
        break;

      case 35:
        context$1$0.prev = 35;
        context$1$0.t2 = context$1$0['catch'](29);

        _logger2['default'].warn('Could not rotate screenshot due to error: ' + context$1$0.t2);

      case 38:
        getBuffer = _bluebird2['default'].promisify(image.getBuffer, { context: image });
        context$1$0.next = 41;
        return _regeneratorRuntime.awrap(getBuffer(_jimp2['default'].MIME_PNG));

      case 41:
        imgBuffer = context$1$0.sent;
        return context$1$0.abrupt('return', imgBuffer.toString('base64'));

      case 43:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[5, 11], [15, 21], [29, 35]]);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;

// adb push creates folders and overwrites existing files.

// if there is an error, throw

// if we don't get anything at all, throw

// This screenshoting approach is way faster, since it requires less external commands
// to be executed. Unfortunately, exec-out option is only supported by newer Android/SDK versions (5.0 and later)

// Android bug 8433742 - rotate screenshot if screen is rotated
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9hY3Rpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzhCQUEyQixvQkFBb0I7Ozs7c0JBQ2pDLFFBQVE7Ozs7b0JBQ0wsTUFBTTs7Ozs2QkFDTyxnQkFBZ0I7O29CQUM3QixNQUFNOzs7O3NCQUNQLFdBQVc7Ozs7d0JBQ2IsVUFBVTs7OztvQkFDUCxNQUFNOzs7OzRCQUNGLGNBQWM7O0FBRW5DLElBQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0FBQzVCLElBQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUMzQixJQUFNLHFCQUFxQixHQUFHLEdBQUcsQ0FBQzs7QUFFbEMsSUFBTSxzQkFBc0IsR0FBRyxJQUFJLE1BQU0sT0FBSyxxQkFBcUIsa0JBQWUsQ0FBQzs7QUFFbkYsSUFBSSxRQUFRLEdBQUcsRUFBRTtJQUFFLE9BQU8sR0FBRyxFQUFFO0lBQUUsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7QUFFakQsUUFBUSxDQUFDLFFBQVEsR0FBRyxvQkFBZ0IsT0FBTztNQUFFLFNBQVMseURBQUcsSUFBSTs7Ozs7QUFFM0QsNEJBQUksSUFBSSxDQUFDLDhDQUE4QyxDQUFDLENBQUM7O3lDQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7Ozs7Ozs7Ozs7Q0FDbkQsQ0FBQzs7QUFFRixRQUFRLENBQUMsWUFBWSxHQUFHLG9CQUFnQixPQUFPO01BQUUsU0FBUyx5REFBRyxJQUFJOzs7Ozt5Q0FDbEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLEVBQUMsT0FBTyxFQUFQLE9BQU8sRUFBRSxTQUFTLEVBQVQsU0FBUyxFQUFDLENBQUM7Ozs7Ozs7Ozs7Q0FDN0UsQ0FBQzs7QUFFRixRQUFRLENBQUMsZ0JBQWdCLEdBQUcsb0JBQWdCLE9BQU87TUFBRSxTQUFTLHlEQUFHLElBQUk7Ozs7O3lDQUN0RCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxrQkFB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LENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQzs7Ozs7OztDQUNwQyxDQUFDOztBQUVGLGVBQWMsVUFBVSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQyxRQUFRLEdBQVIsUUFBUTtRQUFFLE9BQU8sR0FBUCxPQUFPO3FCQUNYLFVBQVUiLCJmaWxlIjoibGliL2NvbW1hbmRzL2FjdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYW5kcm9pZEhlbHBlcnMgZnJvbSAnLi4vYW5kcm9pZC1oZWxwZXJzJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHRlbXAgZnJvbSAndGVtcCc7XHJcbmltcG9ydCB7IGZzLCB1dGlsLCB6aXAgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgbG9nIGZyb20gJy4uL2xvZ2dlcic7XHJcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcclxuaW1wb3J0IGppbXAgZnJvbSAnamltcCc7XHJcbmltcG9ydCB7IGV4ZWMgfSBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xyXG5cclxuY29uc3Qgc3dpcGVTdGVwc1BlclNlYyA9IDI4O1xyXG5jb25zdCBkcmFnU3RlcHNQZXJTZWMgPSA0MDtcclxuY29uc3QgQ09OVEFJTkVSX1BBVEhfTUFSS0VSID0gJ0AnO1xyXG4vLyBodHRwczovL3JlZ2V4MTAxLmNvbS9yL1BMZEIwRy8yXHJcbmNvbnN0IENPTlRBSU5FUl9QQVRIX1BBVFRFUk4gPSBuZXcgUmVnRXhwKGBeJHtDT05UQUlORVJfUEFUSF9NQVJLRVJ9KFteL10rKS8oLispYCk7XHJcblxyXG5sZXQgY29tbWFuZHMgPSB7fSwgaGVscGVycyA9IHt9LCBleHRlbnNpb25zID0ge307XHJcblxyXG5jb21tYW5kcy5rZXlldmVudCA9IGFzeW5jIGZ1bmN0aW9uIChrZXljb2RlLCBtZXRhc3RhdGUgPSBudWxsKSB7XHJcbiAgLy8gVE9ETyBkZXByZWNhdGUga2V5ZXZlbnQ7IGN1cnJlbnRseSB3ZCBvbmx5IGltcGxlbWVudHMga2V5ZXZlbnRcclxuICBsb2cud2FybihcImtleWV2ZW50IHdpbGwgYmUgZGVwcmVjYXRlZCB1c2UgcHJlc3NLZXlDb2RlXCIpO1xyXG4gIHJldHVybiBhd2FpdCB0aGlzLnByZXNzS2V5Q29kZShrZXljb2RlLCBtZXRhc3RhdGUpO1xyXG59O1xyXG5cclxuY29tbWFuZHMucHJlc3NLZXlDb2RlID0gYXN5bmMgZnVuY3Rpb24gKGtleWNvZGUsIG1ldGFzdGF0ZSA9IG51bGwpIHtcclxuICByZXR1cm4gYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbihcInByZXNzS2V5Q29kZVwiLCB7a2V5Y29kZSwgbWV0YXN0YXRlfSk7XHJcbn07XHJcblxyXG5jb21tYW5kcy5sb25nUHJlc3NLZXlDb2RlID0gYXN5bmMgZnVuY3Rpb24gKGtleWNvZGUsIG1ldGFzdGF0ZSA9IG51bGwpIHtcclxuICByZXR1cm4gYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbihcImxvbmdQcmVzc0tleUNvZGVcIiwge2tleWNvZGUsIG1ldGFzdGF0ZX0pO1xyXG59O1xyXG5cclxuY29tbWFuZHMuZ2V0T3JpZW50YXRpb24gPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgbGV0IHBhcmFtcyA9IHtcclxuICAgIG5hdHVyYWxPcmllbnRhdGlvbjogISF0aGlzLm9wdHMuYW5kcm9pZE5hdHVyYWxPcmllbnRhdGlvbixcclxuICB9O1xyXG4gIGxldCBvcmllbnRhdGlvbiA9IGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJvcmllbnRhdGlvblwiLCBwYXJhbXMpO1xyXG4gIHJldHVybiBvcmllbnRhdGlvbi50b1VwcGVyQ2FzZSgpO1xyXG59O1xyXG5cclxuY29tbWFuZHMuc2V0T3JpZW50YXRpb24gPSBhc3luYyBmdW5jdGlvbiAob3JpZW50YXRpb24pIHtcclxuICBvcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uLnRvVXBwZXJDYXNlKCk7XHJcbiAgbGV0IHBhcmFtcyA9IHtcclxuICAgIG9yaWVudGF0aW9uLFxyXG4gICAgbmF0dXJhbE9yaWVudGF0aW9uOiAhIXRoaXMub3B0cy5hbmRyb2lkTmF0dXJhbE9yaWVudGF0aW9uLFxyXG4gIH07XHJcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJvcmllbnRhdGlvblwiLCBwYXJhbXMpO1xyXG59O1xyXG5cclxuY29tbWFuZHMuZmFrZUZsaWNrID0gYXN5bmMgZnVuY3Rpb24gKHhTcGVlZCwgeVNwZWVkKSB7XHJcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oJ2ZsaWNrJywge3hTcGVlZCwgeVNwZWVkfSk7XHJcbn07XHJcblxyXG5jb21tYW5kcy5mYWtlRmxpY2tFbGVtZW50ID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnRJZCwgeG9mZnNldCwgeW9mZnNldCwgc3BlZWQpIHtcclxuICBsZXQgcGFyYW1zID0ge3hvZmZzZXQsIHlvZmZzZXQsIHNwZWVkLCBlbGVtZW50SWR9O1xyXG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKCdlbGVtZW50OmZsaWNrJywgcGFyYW1zKTtcclxufTtcclxuXHJcbmNvbW1hbmRzLnN3aXBlID0gYXN5bmMgZnVuY3Rpb24gKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLCBkdXJhdGlvbiwgdG91Y2hDb3VudCwgZWxJZCkge1xyXG4gIGlmIChzdGFydFggPT09ICdudWxsJykge1xyXG4gICAgc3RhcnRYID0gMC41O1xyXG4gIH1cclxuICBpZiAoc3RhcnRZID09PSAnbnVsbCcpIHtcclxuICAgIHN0YXJ0WSA9IDAuNTtcclxuICB9XHJcbiAgbGV0IHN3aXBlT3B0cyA9IHtzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSxcclxuICAgICAgICAgICAgICAgICAgIHN0ZXBzOiBNYXRoLnJvdW5kKGR1cmF0aW9uICogc3dpcGVTdGVwc1BlclNlYyl9O1xyXG4gIC8vIGdvaW5nIHRoZSBsb25nIHdheSBhbmQgY2hlY2tpbmcgZm9yIHVuZGVmaW5lZCBhbmQgbnVsbCBzaW5jZVxyXG4gIC8vIHdlIGNhbid0IGJlIGFzc3VyZWQgYGVsSWRgIGlzIGEgc3RyaW5nIGFuZCBub3QgYW4gaW50XHJcbiAgaWYgKHV0aWwuaGFzVmFsdWUoZWxJZCkpIHtcclxuICAgIHN3aXBlT3B0cy5lbGVtZW50SWQgPSBlbElkO1xyXG4gIH1cclxuICByZXR1cm4gYXdhaXQgdGhpcy5kb1N3aXBlKHN3aXBlT3B0cyk7XHJcbn07XHJcblxyXG5jb21tYW5kcy5kb1N3aXBlID0gYXN5bmMgZnVuY3Rpb24gKHN3aXBlT3B0cykge1xyXG4gIGlmICh1dGlsLmhhc1ZhbHVlKHN3aXBlT3B0cy5lbGVtZW50SWQpKSB7XHJcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbihcImVsZW1lbnQ6c3dpcGVcIiwgc3dpcGVPcHRzKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJzd2lwZVwiLCBzd2lwZU9wdHMpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbW1hbmRzLnBpbmNoQ2xvc2UgPSBhc3luYyBmdW5jdGlvbiAoc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFksIGR1cmF0aW9uLCBwZXJjZW50LCBzdGVwcywgZWxJZCkge1xyXG4gIGxldCBwaW5jaE9wdHMgPSB7XHJcbiAgICBkaXJlY3Rpb246ICdpbicsXHJcbiAgICBlbGVtZW50SWQ6IGVsSWQsXHJcbiAgICBwZXJjZW50LFxyXG4gICAgc3RlcHNcclxuICB9O1xyXG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiZWxlbWVudDpwaW5jaFwiLCBwaW5jaE9wdHMpO1xyXG59O1xyXG5cclxuY29tbWFuZHMucGluY2hPcGVuID0gYXN5bmMgZnVuY3Rpb24gKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLCBkdXJhdGlvbiwgcGVyY2VudCwgc3RlcHMsIGVsSWQpIHtcclxuICBsZXQgcGluY2hPcHRzID0ge2RpcmVjdGlvbjogJ291dCcsIGVsZW1lbnRJZDogZWxJZCwgcGVyY2VudCwgc3RlcHN9O1xyXG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiZWxlbWVudDpwaW5jaFwiLCBwaW5jaE9wdHMpO1xyXG59O1xyXG5cclxuY29tbWFuZHMuZmxpY2sgPSBhc3luYyBmdW5jdGlvbiAoZWxlbWVudCwgeFNwZWVkLCB5U3BlZWQsIHhPZmZzZXQsIHlPZmZzZXQsIHNwZWVkKSB7XHJcbiAgaWYgKGVsZW1lbnQpIHtcclxuICAgIGF3YWl0IHRoaXMuZmFrZUZsaWNrRWxlbWVudChlbGVtZW50LCB4T2Zmc2V0LCB5T2Zmc2V0LCBzcGVlZCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGF3YWl0IHRoaXMuZmFrZUZsaWNrKHhTcGVlZCwgeVNwZWVkKTtcclxuICB9XHJcbn07XHJcblxyXG5jb21tYW5kcy5kcmFnID0gYXN5bmMgZnVuY3Rpb24gKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLCBkdXJhdGlvbiwgdG91Y2hDb3VudCwgZWxlbWVudElkLCBkZXN0RWxJZCkge1xyXG4gIGxldCBkcmFnT3B0cyA9IHtcclxuICAgIGVsZW1lbnRJZCwgZGVzdEVsSWQsIHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLFxyXG4gICAgc3RlcHM6IE1hdGgucm91bmQoZHVyYXRpb24gKiBkcmFnU3RlcHNQZXJTZWMpXHJcbiAgfTtcclxuICByZXR1cm4gYXdhaXQgdGhpcy5kb0RyYWcoZHJhZ09wdHMpO1xyXG5cclxufTtcclxuXHJcbmNvbW1hbmRzLmRvRHJhZyA9IGFzeW5jIGZ1bmN0aW9uIChkcmFnT3B0cykge1xyXG4gIGlmICh1dGlsLmhhc1ZhbHVlKGRyYWdPcHRzLmVsZW1lbnRJZCkpIHtcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiZWxlbWVudDpkcmFnXCIsIGRyYWdPcHRzKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJkcmFnXCIsIGRyYWdPcHRzKTtcclxuICB9XHJcbn07XHJcblxyXG5jb21tYW5kcy5sb2NrID0gYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gIHJldHVybiBhd2FpdCB0aGlzLmFkYi5sb2NrKCk7XHJcbn07XHJcblxyXG5jb21tYW5kcy5pc0xvY2tlZCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gYXdhaXQgdGhpcy5hZGIuaXNTY3JlZW5Mb2NrZWQoKTtcclxufTtcclxuXHJcbmNvbW1hbmRzLnVubG9jayA9IGFzeW5jIGZ1bmN0aW9uICh1bmxvY2tDYXBhYmlsaXRpZXMpIHtcclxuICByZXR1cm4gYXdhaXQgYW5kcm9pZEhlbHBlcnMudW5sb2NrKHRoaXMsIHRoaXMuYWRiLCB1bmxvY2tDYXBhYmlsaXRpZXMpO1xyXG59O1xyXG5cclxuY29tbWFuZHMub3Blbk5vdGlmaWNhdGlvbnMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJvcGVuTm90aWZpY2F0aW9uXCIpO1xyXG59O1xyXG5cclxuY29tbWFuZHMuc2V0TG9jYXRpb24gPSBhc3luYyBmdW5jdGlvbiAobGF0aXR1ZGUsIGxvbmdpdHVkZSkge1xyXG4gIHJldHVybiBhd2FpdCB0aGlzLmFkYi5zZW5kVGVsbmV0Q29tbWFuZChgZ2VvIGZpeCAke2xvbmdpdHVkZX0gJHtsYXRpdHVkZX1gKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHBhcnNlQ29udGFpbmVyUGF0aCAocmVtb3RlUGF0aCkge1xyXG4gIGNvbnN0IG1hdGNoID0gQ09OVEFJTkVSX1BBVEhfUEFUVEVSTi5leGVjKHJlbW90ZVBhdGgpO1xyXG4gIGlmICghbWF0Y2gpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KGBJdCBpcyBleHBlY3RlZCB0aGF0IHBhY2thZ2UgaWRlbnRpZmllciBpcyBzZXBhcmF0ZWQgZnJvbSB0aGUgcmVsYXRpdmUgcGF0aCB3aXRoIGEgc2luZ2xlIHNsYXNoLiBgICtcclxuICAgICAgICAgICAgICAgICAgICAgIGAnJHtyZW1vdGVQYXRofScgaXMgZ2l2ZW4gaW5zdGVhZGApO1xyXG4gIH1cclxuICByZXR1cm4gW21hdGNoWzFdLCBwYXRoLnBvc2l4LnJlc29sdmUoYC9kYXRhL2RhdGEvJHttYXRjaFsxXX1gLCBtYXRjaFsyXSldO1xyXG59XHJcblxyXG5jb21tYW5kcy5wdWxsRmlsZSA9IGFzeW5jIGZ1bmN0aW9uIChyZW1vdGVQYXRoKSB7XHJcbiAgaWYgKHJlbW90ZVBhdGguZW5kc1dpdGgoJy8nKSkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEl0IGlzIGV4cGVjdGVkIHRoYXQgcmVtb3RlIHBhdGggcG9pbnRzIHRvIGEgZmlsZSBhbmQgbm90IHRvIGEgZm9sZGVyLiBgICtcclxuICAgICAgICAgICAgICAgICAgICAgIGAnJHtyZW1vdGVQYXRofScgaXMgZ2l2ZW4gaW5zdGVhZGApO1xyXG4gIH1cclxuICBsZXQgdG1wRGVzdGluYXRpb24gPSBudWxsO1xyXG4gIGlmIChyZW1vdGVQYXRoLnN0YXJ0c1dpdGgoQ09OVEFJTkVSX1BBVEhfTUFSS0VSKSkge1xyXG4gICAgY29uc3QgW3BhY2thZ2VJZCwgcGF0aEluQ29udGFpbmVyXSA9IHBhcnNlQ29udGFpbmVyUGF0aChyZW1vdGVQYXRoKTtcclxuICAgIGxvZy5pbmZvKGBQYXJzZWQgcGFja2FnZSBpZGVudGlmaWVyICcke3BhY2thZ2VJZH0nIGZyb20gJyR7cmVtb3RlUGF0aH0nLiBXaWxsIGdldCB0aGUgZGF0YSBmcm9tICcke3BhdGhJbkNvbnRhaW5lcn0nYCk7XHJcbiAgICB0bXBEZXN0aW5hdGlvbiA9IGAvZGF0YS9sb2NhbC90bXAvJHtwYXRoLnBvc2l4LmJhc2VuYW1lKHBhdGhJbkNvbnRhaW5lcil9YDtcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IHRoaXMuYWRiLnNoZWxsKFsncnVuLWFzJywgcGFja2FnZUlkLCBgY2htb2QgNzc3ICcke3BhdGhJbkNvbnRhaW5lci5yZXBsYWNlKC8nL2csICdcXFxcXFwnJyl9J2BdKTtcclxuICAgICAgYXdhaXQgdGhpcy5hZGIuc2hlbGwoWydjcCcsICctZicsIHBhdGhJbkNvbnRhaW5lciwgdG1wRGVzdGluYXRpb25dKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgbG9nLmVycm9yQW5kVGhyb3coYENhbm5vdCBhY2Nlc3MgdGhlIGNvbnRhaW5lciBvZiAnJHtwYWNrYWdlSWR9JyBhcHBsaWNhdGlvbi4gYCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGBJcyB0aGUgYXBwbGljYXRpb24gaW5zdGFsbGVkIGFuZCBoYXMgJ2RlYnVnZ2FibGUnIGJ1aWxkIG9wdGlvbiBzZXQgdG8gdHJ1ZT8gYCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNvbnN0IGxvY2FsRmlsZSA9IHRlbXAucGF0aCh7cHJlZml4OiAnYXBwaXVtJywgc3VmZml4OiAnLnRtcCd9KTtcclxuICB0cnkge1xyXG4gICAgYXdhaXQgdGhpcy5hZGIucHVsbChfLmlzU3RyaW5nKHRtcERlc3RpbmF0aW9uKSA/IHRtcERlc3RpbmF0aW9uIDogcmVtb3RlUGF0aCwgbG9jYWxGaWxlKTtcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmcy5yZWFkRmlsZShsb2NhbEZpbGUpO1xyXG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoZGF0YSkudG9TdHJpbmcoJ2Jhc2U2NCcpO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICBpZiAoYXdhaXQgZnMuZXhpc3RzKGxvY2FsRmlsZSkpIHtcclxuICAgICAgYXdhaXQgZnMudW5saW5rKGxvY2FsRmlsZSk7XHJcbiAgICB9XHJcbiAgICBpZiAoXy5pc1N0cmluZyh0bXBEZXN0aW5hdGlvbikpIHtcclxuICAgICAgYXdhaXQgdGhpcy5hZGIuc2hlbGwoWydybScsICctZicsIHRtcERlc3RpbmF0aW9uXSk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuY29tbWFuZHMucHVzaEZpbGUgPSBhc3luYyBmdW5jdGlvbiAocmVtb3RlUGF0aCwgYmFzZTY0RGF0YSkge1xyXG4gIGlmIChyZW1vdGVQYXRoLmVuZHNXaXRoKCcvJykpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KGBJdCBpcyBleHBlY3RlZCB0aGF0IHJlbW90ZSBwYXRoIHBvaW50cyB0byBhIGZpbGUgYW5kIG5vdCB0byBhIGZvbGRlci4gYCArXHJcbiAgICAgICAgICAgICAgICAgICAgICBgJyR7cmVtb3RlUGF0aH0nIGlzIGdpdmVuIGluc3RlYWRgKTtcclxuICB9XHJcbiAgY29uc3QgbG9jYWxGaWxlID0gdGVtcC5wYXRoKHtwcmVmaXg6ICdhcHBpdW0nLCBzdWZmaXg6ICcudG1wJ30pO1xyXG4gIGNvbnN0IGNvbnRlbnQgPSBuZXcgQnVmZmVyKGJhc2U2NERhdGEsICdiYXNlNjQnKTtcclxuICBsZXQgdG1wRGVzdGluYXRpb24gPSBudWxsO1xyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCBmcy53cml0ZUZpbGUobG9jYWxGaWxlLCBjb250ZW50LnRvU3RyaW5nKCdiaW5hcnknKSwgJ2JpbmFyeScpO1xyXG4gICAgaWYgKHJlbW90ZVBhdGguc3RhcnRzV2l0aChDT05UQUlORVJfUEFUSF9NQVJLRVIpKSB7XHJcbiAgICAgIGNvbnN0IFtwYWNrYWdlSWQsIHBhdGhJbkNvbnRhaW5lcl0gPSBwYXJzZUNvbnRhaW5lclBhdGgocmVtb3RlUGF0aCk7XHJcbiAgICAgIGxvZy5pbmZvKGBQYXJzZWQgcGFja2FnZSBpZGVudGlmaWVyICcke3BhY2thZ2VJZH0nIGZyb20gJyR7cmVtb3RlUGF0aH0nLiBXaWxsIHB1dCB0aGUgZGF0YSBpbnRvICcke3BhdGhJbkNvbnRhaW5lcn0nYCk7XHJcbiAgICAgIHRtcERlc3RpbmF0aW9uID0gYC9kYXRhL2xvY2FsL3RtcC8ke3BhdGgucG9zaXguYmFzZW5hbWUocGF0aEluQ29udGFpbmVyKX1gO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuYWRiLnNoZWxsKFxyXG4gICAgICAgICAgWydydW4tYXMnLCBwYWNrYWdlSWQsIGBta2RpciAtcCAnJHtwYXRoLnBvc2l4LmRpcm5hbWUocGF0aEluQ29udGFpbmVyKS5yZXBsYWNlKC8nL2csICdcXFxcXFwnJyl9J2BdXHJcbiAgICAgICAgKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmFkYi5zaGVsbChbJ3J1bi1hcycsIHBhY2thZ2VJZCwgYHRvdWNoICcke3BhdGhJbkNvbnRhaW5lci5yZXBsYWNlKC8nL2csICdcXFxcXFwnJyl9J2BdKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmFkYi5zaGVsbChbJ3J1bi1hcycsIHBhY2thZ2VJZCwgYGNobW9kIDc3NyAnJHtwYXRoSW5Db250YWluZXIucmVwbGFjZSgvJy9nLCAnXFxcXFxcJycpfSdgXSk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5hZGIucHVzaChsb2NhbEZpbGUsIHRtcERlc3RpbmF0aW9uKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmFkYi5zaGVsbChbJ2NwJywgJy1mJywgdG1wRGVzdGluYXRpb24sIHBhdGhJbkNvbnRhaW5lcl0pO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgbG9nLmVycm9yQW5kVGhyb3coYENhbm5vdCBhY2Nlc3MgdGhlIGNvbnRhaW5lciBvZiAnJHtwYWNrYWdlSWR9JyBhcHBsaWNhdGlvbi4gYCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYElzIHRoZSBhcHBsaWNhdGlvbiBpbnN0YWxsZWQgYW5kIGhhcyAnZGVidWdnYWJsZScgYnVpbGQgb3B0aW9uIHNldCB0byB0cnVlPyBgICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBgT3JpZ2luYWwgZXJyb3I6ICR7ZS5tZXNzYWdlfWApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBhZGIgcHVzaCBjcmVhdGVzIGZvbGRlcnMgYW5kIG92ZXJ3cml0ZXMgZXhpc3RpbmcgZmlsZXMuXHJcbiAgICAgIGF3YWl0IHRoaXMuYWRiLnB1c2gobG9jYWxGaWxlLCByZW1vdGVQYXRoKTtcclxuICAgIH1cclxuICB9IGZpbmFsbHkge1xyXG4gICAgaWYgKGF3YWl0IGZzLmV4aXN0cyhsb2NhbEZpbGUpKSB7XHJcbiAgICAgIGF3YWl0IGZzLnVubGluayhsb2NhbEZpbGUpO1xyXG4gICAgfVxyXG4gICAgaWYgKF8uaXNTdHJpbmcodG1wRGVzdGluYXRpb24pKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMuYWRiLnNoZWxsKFsncm0nLCAnLWYnLCB0bXBEZXN0aW5hdGlvbl0pO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmNvbW1hbmRzLnB1bGxGb2xkZXIgPSBhc3luYyBmdW5jdGlvbiAocmVtb3RlUGF0aCkge1xyXG4gIGxldCBsb2NhbEZvbGRlciA9IHRlbXAucGF0aCh7cHJlZml4OiAnYXBwaXVtJ30pO1xyXG4gIGF3YWl0IHRoaXMuYWRiLnB1bGwocmVtb3RlUGF0aCwgbG9jYWxGb2xkZXIpO1xyXG4gIHJldHVybiAoYXdhaXQgemlwLnRvSW5NZW1vcnlaaXAobG9jYWxGb2xkZXIpKS50b1N0cmluZygnYmFzZTY0Jyk7XHJcbn07XHJcblxyXG5jb21tYW5kcy5maW5nZXJwcmludCA9IGFzeW5jIGZ1bmN0aW9uIChmaW5nZXJwcmludElkKSB7XHJcbiAgaWYgKCF0aGlzLmlzRW11bGF0b3IoKSkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coXCJmaW5nZXJwcmludCBtZXRob2QgaXMgb25seSBhdmFpbGFibGUgZm9yIGVtdWxhdG9yc1wiKTtcclxuICB9XHJcbiAgYXdhaXQgdGhpcy5hZGIuZmluZ2VycHJpbnQoZmluZ2VycHJpbnRJZCk7XHJcbn07XHJcblxyXG5jb21tYW5kcy5zZW5kU01TID0gYXN5bmMgZnVuY3Rpb24gKHBob25lTnVtYmVyLCBtZXNzYWdlKSB7XHJcbiAgaWYgKCF0aGlzLmlzRW11bGF0b3IoKSkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coXCJzZW5kU01TIG1ldGhvZCBpcyBvbmx5IGF2YWlsYWJsZSBmb3IgZW11bGF0b3JzXCIpO1xyXG4gIH1cclxuICBhd2FpdCB0aGlzLmFkYi5zZW5kU01TKHBob25lTnVtYmVyLCBtZXNzYWdlKTtcclxufTtcclxuXHJcbmNvbW1hbmRzLmdzbUNhbGwgPSBhc3luYyBmdW5jdGlvbiAocGhvbmVOdW1iZXIsIGFjdGlvbikge1xyXG4gIGlmICghdGhpcy5pc0VtdWxhdG9yKCkpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KFwiZ3NtQ2FsbCBtZXRob2QgaXMgb25seSBhdmFpbGFibGUgZm9yIGVtdWxhdG9yc1wiKTtcclxuICB9XHJcbiAgYXdhaXQgdGhpcy5hZGIuZ3NtQ2FsbChwaG9uZU51bWJlciwgYWN0aW9uKTtcclxufTtcclxuXHJcbmNvbW1hbmRzLmdzbVNpZ25hbCA9IGFzeW5jIGZ1bmN0aW9uIChzaWduYWxTdHJlbmdoKSB7XHJcbiAgaWYgKCF0aGlzLmlzRW11bGF0b3IoKSkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coXCJnc21TaWduYWwgbWV0aG9kIGlzIG9ubHkgYXZhaWxhYmxlIGZvciBlbXVsYXRvcnNcIik7XHJcbiAgfVxyXG4gIGF3YWl0IHRoaXMuYWRiLmdzbVNpZ25hbChzaWduYWxTdHJlbmdoKTtcclxufTtcclxuXHJcbmNvbW1hbmRzLmdzbVZvaWNlID0gYXN5bmMgZnVuY3Rpb24gKHN0YXRlKSB7XHJcbiAgaWYgKCF0aGlzLmlzRW11bGF0b3IoKSkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coXCJnc21Wb2ljZSBtZXRob2QgaXMgb25seSBhdmFpbGFibGUgZm9yIGVtdWxhdG9yc1wiKTtcclxuICB9XHJcbiAgYXdhaXQgdGhpcy5hZGIuZ3NtVm9pY2Uoc3RhdGUpO1xyXG59O1xyXG5cclxuY29tbWFuZHMucG93ZXJBQyA9IGFzeW5jIGZ1bmN0aW9uIChzdGF0ZSkge1xyXG4gIGlmICghdGhpcy5pc0VtdWxhdG9yKCkpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KFwicG93ZXJBQyBtZXRob2QgaXMgb25seSBhdmFpbGFibGUgZm9yIGVtdWxhdG9yc1wiKTtcclxuICB9XHJcbiAgYXdhaXQgdGhpcy5hZGIucG93ZXJBQyhzdGF0ZSk7XHJcbn07XHJcblxyXG5jb21tYW5kcy5wb3dlckNhcGFjaXR5ID0gYXN5bmMgZnVuY3Rpb24gKGJhdHRlcnlQZXJjZW50KSB7XHJcbiAgaWYgKCF0aGlzLmlzRW11bGF0b3IoKSkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coXCJwb3dlckNhcGFjaXR5IG1ldGhvZCBpcyBvbmx5IGF2YWlsYWJsZSBmb3IgZW11bGF0b3JzXCIpO1xyXG4gIH1cclxuICBhd2FpdCB0aGlzLmFkYi5wb3dlckNhcGFjaXR5KGJhdHRlcnlQZXJjZW50KTtcclxufTtcclxuXHJcbmNvbW1hbmRzLm5ldHdvcmtTcGVlZCA9IGFzeW5jIGZ1bmN0aW9uIChuZXR3b3JrU3BlZWQpIHtcclxuICBpZiAoIXRoaXMuaXNFbXVsYXRvcigpKSB7XHJcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhcIm5ldHdvcmtTcGVlZCBtZXRob2QgaXMgb25seSBhdmFpbGFibGUgZm9yIGVtdWxhdG9yc1wiKTtcclxuICB9XHJcbiAgYXdhaXQgdGhpcy5hZGIubmV0d29ya1NwZWVkKG5ldHdvcmtTcGVlZCk7XHJcbn07XHJcblxyXG5oZWxwZXJzLmdldFNjcmVlbnNob3REYXRhV2l0aEFkYlNoZWxsID0gYXN5bmMgZnVuY3Rpb24gKGFkYiwgb3B0cykge1xyXG4gIGNvbnN0IGxvY2FsRmlsZSA9IHRlbXAucGF0aCh7cHJlZml4OiAnYXBwaXVtJywgc3VmZml4OiAnLnBuZyd9KTtcclxuICBpZiAoYXdhaXQgZnMuZXhpc3RzKGxvY2FsRmlsZSkpIHtcclxuICAgIGF3YWl0IGZzLnVubGluayhsb2NhbEZpbGUpO1xyXG4gIH1cclxuICB0cnkge1xyXG4gICAgY29uc3QgcG5nRGlyID0gb3B0cy5hbmRyb2lkU2NyZWVuc2hvdFBhdGggfHwgJy9kYXRhL2xvY2FsL3RtcC8nO1xyXG4gICAgY29uc3QgcG5nID0gcGF0aC5wb3NpeC5yZXNvbHZlKHBuZ0RpciwgJ3NjcmVlbnNob3QucG5nJyk7XHJcbiAgICBjb25zdCBjbWQgPSBbJy9zeXN0ZW0vYmluL3JtJywgYCR7cG5nfTtgLCAnL3N5c3RlbS9iaW4vc2NyZWVuY2FwJywgJy1wJywgcG5nXTtcclxuICAgIGF3YWl0IGFkYi5zaGVsbChjbWQpO1xyXG4gICAgaWYgKCFhd2FpdCBhZGIuZmlsZVNpemUocG5nKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBzaXplIG9mIHRoZSB0YWtlbiBzY3JlZW5zaG90IGVxdWFscyB0byB6ZXJvLicpO1xyXG4gICAgfVxyXG4gICAgYXdhaXQgYWRiLnB1bGwocG5nLCBsb2NhbEZpbGUpO1xyXG4gICAgcmV0dXJuIGF3YWl0IGppbXAucmVhZChsb2NhbEZpbGUpO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICBpZiAoYXdhaXQgZnMuZXhpc3RzKGxvY2FsRmlsZSkpIHtcclxuICAgICAgYXdhaXQgZnMudW5saW5rKGxvY2FsRmlsZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuaGVscGVycy5nZXRTY3JlZW5zaG90RGF0YVdpdGhBZGJFeGVjT3V0ID0gYXN5bmMgZnVuY3Rpb24gKGFkYikge1xyXG4gIGxldCB7c3Rkb3V0LCBzdGRlcnIsIGNvZGV9ID0gYXdhaXQgZXhlYyhhZGIuZXhlY3V0YWJsZS5wYXRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGIuZXhlY3V0YWJsZS5kZWZhdWx0QXJnc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jb25jYXQoWydleGVjLW91dCcsICcvc3lzdGVtL2Jpbi9zY3JlZW5jYXAnLCAnLXAnXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtlbmNvZGluZzogJ2JpbmFyeScsIGlzQnVmZmVyOiB0cnVlfSk7XHJcbiAgLy8gaWYgdGhlcmUgaXMgYW4gZXJyb3IsIHRocm93XHJcbiAgaWYgKGNvZGUgfHwgc3RkZXJyLmxlbmd0aCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBTY3JlZW5zaG90IHJldHVybmVkIGVycm9yLCBjb2RlOiAnJHtjb2RlfScsIHN0ZGVycjogJyR7c3RkZXJyLnRvU3RyaW5nKCl9J2ApO1xyXG4gIH1cclxuICAvLyBpZiB3ZSBkb24ndCBnZXQgYW55dGhpbmcgYXQgYWxsLCB0aHJvd1xyXG4gIGlmICghc3Rkb3V0Lmxlbmd0aCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdTY3JlZW5zaG90IHJldHVybmVkIG5vIGRhdGEnKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBhd2FpdCBqaW1wLnJlYWQoc3Rkb3V0KTtcclxufTtcclxuXHJcbmNvbW1hbmRzLmdldFNjcmVlbnNob3QgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgY29uc3QgYXBpTGV2ZWwgPSBhd2FpdCB0aGlzLmFkYi5nZXRBcGlMZXZlbCgpO1xyXG4gIGxldCBpbWFnZSA9IG51bGw7XHJcbiAgaWYgKGFwaUxldmVsID4gMjApIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIC8vIFRoaXMgc2NyZWVuc2hvdGluZyBhcHByb2FjaCBpcyB3YXkgZmFzdGVyLCBzaW5jZSBpdCByZXF1aXJlcyBsZXNzIGV4dGVybmFsIGNvbW1hbmRzXHJcbiAgICAgIC8vIHRvIGJlIGV4ZWN1dGVkLiBVbmZvcnR1bmF0ZWx5LCBleGVjLW91dCBvcHRpb24gaXMgb25seSBzdXBwb3J0ZWQgYnkgbmV3ZXIgQW5kcm9pZC9TREsgdmVyc2lvbnMgKDUuMCBhbmQgbGF0ZXIpXHJcbiAgICAgIGltYWdlID0gYXdhaXQgdGhpcy5nZXRTY3JlZW5zaG90RGF0YVdpdGhBZGJFeGVjT3V0KHRoaXMuYWRiKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgbG9nLmluZm8oYENhbm5vdCBnZXQgc2NyZWVuc2hvdCBkYXRhIHdpdGggJ2FkYiBleGVjLW91dCcgYmVjYXVzZSBvZiAnJHtlLm1lc3NhZ2V9Jy4gYCArXHJcbiAgICAgICAgICAgICAgIGBEZWZhdWx0aW5nIHRvICdhZGIgc2hlbGwnIGNhbGxgKTtcclxuICAgIH1cclxuICB9XHJcbiAgaWYgKCFpbWFnZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgaW1hZ2UgPSBhd2FpdCB0aGlzLmdldFNjcmVlbnNob3REYXRhV2l0aEFkYlNoZWxsKHRoaXMuYWRiLCB0aGlzLm9wdHMpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zdCBlcnIgPSBgQ2Fubm90IGdldCBzY3JlZW5zaG90IGRhdGEgYmVjYXVzZSBvZiAnJHtlLm1lc3NhZ2V9Jy4gYCArXHJcbiAgICAgICAgICAgICAgICAgIGBNYWtlIHN1cmUgdGhlICdMYXlvdXRQYXJhbXMuRkxBR19TRUNVUkUnIGlzIG5vdCBzZXQgZm9yIGAgK1xyXG4gICAgICAgICAgICAgICAgICBgdGhlIGN1cnJlbnQgdmlld2A7XHJcbiAgICAgIGxvZy5lcnJvckFuZFRocm93KGVycik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmIChhcGlMZXZlbCA8IDIzKSB7XHJcbiAgICAvLyBBbmRyb2lkIGJ1ZyA4NDMzNzQyIC0gcm90YXRlIHNjcmVlbnNob3QgaWYgc2NyZWVuIGlzIHJvdGF0ZWRcclxuICAgIGxldCBzY3JlZW5PcmllbnRhdGlvbiA9IGF3YWl0IHRoaXMuYWRiLmdldFNjcmVlbk9yaWVudGF0aW9uKCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBpbWFnZSA9IGF3YWl0IGltYWdlLnJvdGF0ZSgtOTAgKiBzY3JlZW5PcmllbnRhdGlvbik7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgbG9nLndhcm4oYENvdWxkIG5vdCByb3RhdGUgc2NyZWVuc2hvdCBkdWUgdG8gZXJyb3I6ICR7ZXJyfWApO1xyXG4gICAgfVxyXG4gIH1cclxuICBjb25zdCBnZXRCdWZmZXIgPSBCLnByb21pc2lmeShpbWFnZS5nZXRCdWZmZXIsIHtjb250ZXh0OiBpbWFnZX0pO1xyXG4gIGNvbnN0IGltZ0J1ZmZlciA9IGF3YWl0IGdldEJ1ZmZlcihqaW1wLk1JTUVfUE5HKTtcclxuICByZXR1cm4gaW1nQnVmZmVyLnRvU3RyaW5nKCdiYXNlNjQnKTtcclxufTtcclxuXHJcbk9iamVjdC5hc3NpZ24oZXh0ZW5zaW9ucywgY29tbWFuZHMsIGhlbHBlcnMpO1xyXG5leHBvcnQgeyBjb21tYW5kcywgaGVscGVycyB9O1xyXG5leHBvcnQgZGVmYXVsdCBleHRlbnNpb25zO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi4ifQ==
