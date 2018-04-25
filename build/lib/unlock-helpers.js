'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _asyncbox = require('asyncbox');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var PIN_UNLOCK = "pin";
var PASSWORD_UNLOCK = "password";
var PATTERN_UNLOCK = "pattern";
var FINGERPRINT_UNLOCK = "fingerprint";
var UNLOCK_TYPES = [PIN_UNLOCK, PASSWORD_UNLOCK, PATTERN_UNLOCK, FINGERPRINT_UNLOCK];
var KEYCODE_NUMPAD_ENTER = "66";
var UNLOCK_WAIT_TIME = 100;
var HIDE_KEYBOARD_WAIT_TIME = 100;
var INPUT_KEYS_WAIT_TIME = 100;

var helpers = {};
helpers.isValidUnlockType = function (type) {
  return UNLOCK_TYPES.indexOf(type) !== -1;
};

helpers.isValidKey = function (type, key) {
  if (_lodash2['default'].isUndefined(key)) {
    return false;
  }
  if (type === PIN_UNLOCK || type === FINGERPRINT_UNLOCK) {
    return (/^[0-9]+$/.test(key.trim())
    );
  }
  if (type === PATTERN_UNLOCK) {
    if (!/^[1-9]{2,9}$/.test(key.trim())) {
      return false;
    }
    return !/([1-9]).*?\1/.test(key.trim());
  }
  // Dont trim password key, you can use blank spaces in your android password
  // ¯\_(ツ)_/¯
  if (type === PASSWORD_UNLOCK) {
    return (/.{4,}/g.test(key)
    );
  }
  throw new Error('Invalid unlock type ' + type);
};

helpers.dismissKeyguard = function callee$0$0(driver, adb) {
  var isKeyboardShown;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(driver.isKeyboardShown());

      case 2:
        isKeyboardShown = context$1$0.sent;

        if (!isKeyboardShown) {
          context$1$0.next = 8;
          break;
        }

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(driver.hideKeyboard());

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(HIDE_KEYBOARD_WAIT_TIME));

      case 8:
        // dismiss notifications
        _logger2['default'].info("Dismiss notifications from unlock view");
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(adb.shell(["service", "call", "notification", "1"]));

      case 11:
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(adb.back());

      case 13:
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(adb.getApiLevel());

      case 15:
        context$1$0.t0 = context$1$0.sent;

        if (!(context$1$0.t0 > 21)) {
          context$1$0.next = 21;
          break;
        }

        _logger2['default'].info("Trying to dismiss keyguard");
        context$1$0.next = 20;
        return _regeneratorRuntime.awrap(adb.shell(["wm", "dismiss-keyguard"]));

      case 20:
        return context$1$0.abrupt('return');

      case 21:
        _logger2['default'].info("Swiping up to dismiss keyguard");
        context$1$0.next = 24;
        return _regeneratorRuntime.awrap(helpers.swipeUp(driver));

      case 24:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.swipeUp = function callee$0$0(driver) {
  var windowSize, x0, y0, yP, actions;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(driver.getWindowSize());

      case 2:
        windowSize = context$1$0.sent;
        x0 = parseInt(windowSize.x / 2, 10);
        y0 = windowSize.y - 10;
        yP = 100;
        actions = [{ action: 'press', options: { element: null, x: x0, y: y0 } }, { action: 'moveTo', options: { element: null, x: x0, y: yP } }, { action: 'release' }];
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(driver.performTouch(actions));

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.encodePassword = function (key) {
  return key.replace(/\s/ig, "%s");
};

helpers.stringKeyToArr = function (key) {
  return key.trim().replace(/\s+/g, '').split(/\s*/);
};

helpers.fingerprintUnlock = function callee$0$0(adb, driver, capabilities) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(adb.getApiLevel());

      case 2:
        context$1$0.t0 = context$1$0.sent;

        if (!(context$1$0.t0 < 23)) {
          context$1$0.next = 5;
          break;
        }

        throw new Error("Fingerprint unlock only works for Android 6+ emulators");

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(adb.fingerprint(capabilities.unlockKey));

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(UNLOCK_WAIT_TIME));

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.pinUnlock = function callee$0$0(adb, driver, capabilities) {
  var keys, els, pins, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, e, text, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, pin, _el, el, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _el2;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].info('Trying to unlock device using pin ' + capabilities.unlockKey);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(helpers.dismissKeyguard(driver, adb));

      case 3:
        keys = helpers.stringKeyToArr(capabilities.unlockKey);
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(adb.getApiLevel());

      case 6:
        context$1$0.t0 = context$1$0.sent;

        if (!(context$1$0.t0 >= 21)) {
          context$1$0.next = 76;
          break;
        }

        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(driver.findElOrEls("id", "com.android.systemui:id/digit_text", true));

      case 10:
        els = context$1$0.sent;

        if (!_lodash2['default'].isEmpty(els)) {
          context$1$0.next = 13;
          break;
        }

        throw new Error("Error finding unlock pin buttons!");

      case 13:
        pins = {};
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 17;
        _iterator = _getIterator(els);

      case 19:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 28;
          break;
        }

        e = _step.value;
        context$1$0.next = 23;
        return _regeneratorRuntime.awrap(driver.getAttribute("text", e.ELEMENT));

      case 23:
        text = context$1$0.sent;

        pins[text] = e;

      case 25:
        _iteratorNormalCompletion = true;
        context$1$0.next = 19;
        break;

      case 28:
        context$1$0.next = 34;
        break;

      case 30:
        context$1$0.prev = 30;
        context$1$0.t1 = context$1$0['catch'](17);
        _didIteratorError = true;
        _iteratorError = context$1$0.t1;

      case 34:
        context$1$0.prev = 34;
        context$1$0.prev = 35;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 37:
        context$1$0.prev = 37;

        if (!_didIteratorError) {
          context$1$0.next = 40;
          break;
        }

        throw _iteratorError;

      case 40:
        return context$1$0.finish(37);

      case 41:
        return context$1$0.finish(34);

      case 42:
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 45;
        _iterator2 = _getIterator(keys);

      case 47:
        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
          context$1$0.next = 55;
          break;
        }

        pin = _step2.value;
        _el = pins[pin];
        context$1$0.next = 52;
        return _regeneratorRuntime.awrap(driver.click(_el.ELEMENT));

      case 52:
        _iteratorNormalCompletion2 = true;
        context$1$0.next = 47;
        break;

      case 55:
        context$1$0.next = 61;
        break;

      case 57:
        context$1$0.prev = 57;
        context$1$0.t2 = context$1$0['catch'](45);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t2;

      case 61:
        context$1$0.prev = 61;
        context$1$0.prev = 62;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 64:
        context$1$0.prev = 64;

        if (!_didIteratorError2) {
          context$1$0.next = 67;
          break;
        }

        throw _iteratorError2;

      case 67:
        return context$1$0.finish(64);

      case 68:
        return context$1$0.finish(61);

      case 69:
        context$1$0.next = 71;
        return _regeneratorRuntime.awrap(driver.findElOrEls("id", "com.android.systemui:id/key_enter", false));

      case 71:
        el = context$1$0.sent;
        context$1$0.next = 74;
        return _regeneratorRuntime.awrap(driver.click(el.ELEMENT));

      case 74:
        context$1$0.next = 112;
        break;

      case 76:
        _iteratorNormalCompletion3 = true;
        _didIteratorError3 = false;
        _iteratorError3 = undefined;
        context$1$0.prev = 79;
        _iterator3 = _getIterator(keys);

      case 81:
        if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
          context$1$0.next = 93;
          break;
        }

        pin = _step3.value;
        context$1$0.next = 85;
        return _regeneratorRuntime.awrap(driver.findElOrEls("id", 'com.android.keyguard:id/key' + pin, false));

      case 85:
        _el2 = context$1$0.sent;

        if (!(_el2 === null)) {
          context$1$0.next = 88;
          break;
        }

        throw new Error('Error finding unlock pin \'' + pin + '\' button!');

      case 88:
        context$1$0.next = 90;
        return _regeneratorRuntime.awrap(driver.click(_el2.ELEMENT));

      case 90:
        _iteratorNormalCompletion3 = true;
        context$1$0.next = 81;
        break;

      case 93:
        context$1$0.next = 99;
        break;

      case 95:
        context$1$0.prev = 95;
        context$1$0.t3 = context$1$0['catch'](79);
        _didIteratorError3 = true;
        _iteratorError3 = context$1$0.t3;

      case 99:
        context$1$0.prev = 99;
        context$1$0.prev = 100;

        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }

      case 102:
        context$1$0.prev = 102;

        if (!_didIteratorError3) {
          context$1$0.next = 105;
          break;
        }

        throw _iteratorError3;

      case 105:
        return context$1$0.finish(102);

      case 106:
        return context$1$0.finish(99);

      case 107:
        context$1$0.next = 109;
        return _regeneratorRuntime.awrap(driver.findElOrEls("id", "com.android.keyguard:id/key_enter", false));

      case 109:
        el = context$1$0.sent;
        context$1$0.next = 112;
        return _regeneratorRuntime.awrap(driver.click(el.ELEMENT));

      case 112:
        context$1$0.next = 114;
        return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(UNLOCK_WAIT_TIME));

      case 114:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[17, 30, 34, 42], [35,, 37, 41], [45, 57, 61, 69], [62,, 64, 68], [79, 95, 99, 107], [100,, 102, 106]]);
};

helpers.passwordUnlock = function callee$0$0(adb, driver, capabilities) {
  var key;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].info('Trying to unlock device using password ' + capabilities.unlockKey);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(helpers.dismissKeyguard(driver, adb));

      case 3:
        key = capabilities.unlockKey;

        // Replace blank spaces with %s
        key = helpers.encodePassword(key);
        // Why adb ? It was less flaky
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(adb.shell(["input", "text", key]));

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(INPUT_KEYS_WAIT_TIME));

      case 9:
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(adb.shell(["input", "keyevent", KEYCODE_NUMPAD_ENTER]));

      case 11:
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(UNLOCK_WAIT_TIME));

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.getPatternKeyPosition = function (key, initPos, piece) {
  /*
  How the math works:
  We have 9 buttons divided in 3 columns and 3 rows inside the lockPatternView,
  every button has a position on the screen corresponding to the lockPatternView since
  it is the parent view right at the middle of each column or row.
  */
  var cols = 3;
  var pins = 9;
  var xPos = function xPos(key, x, piece) {
    return Math.round(x + (key % cols || cols) * piece - piece / 2);
  };
  var yPos = function yPos(key, y, piece) {
    return Math.round(y + (Math.ceil((key % pins || pins) / cols) * piece - piece / 2));
  };
  return { x: xPos(key, initPos.x, piece), y: yPos(key, initPos.y, piece) };
};

helpers.getPatternActions = function (keys, initPos, piece) {
  var actions = [];
  var lastPos = undefined;
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = _getIterator(keys), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var key = _step4.value;

      var keyPos = helpers.getPatternKeyPosition(key, initPos, piece);
      if (key === keys[0]) {
        actions.push({ action: 'press', options: { element: null, x: keyPos.x, y: keyPos.y } });
        lastPos = keyPos;
        continue;
      }
      var _moveTo = { x: 0, y: 0 };
      var diffX = keyPos.x - lastPos.x;
      if (diffX > 0) {
        _moveTo.x = piece;
        if (Math.abs(diffX) > piece) {
          _moveTo.x += piece;
        }
      } else if (diffX < 0) {
        _moveTo.x = -1 * piece;
        if (Math.abs(diffX) > piece) {
          _moveTo.x -= piece;
        }
      }
      var diffY = keyPos.y - lastPos.y;
      if (diffY > 0) {
        _moveTo.y = piece;
        if (Math.abs(diffY) > piece) {
          _moveTo.y += piece;
        }
      } else if (diffY < 0) {
        _moveTo.y = -1 * piece;
        if (Math.abs(diffY) > piece) {
          _moveTo.y -= piece;
        }
      }
      actions.push({ action: 'moveTo', options: { element: null, x: _moveTo.x, y: _moveTo.y } });
      lastPos = keyPos;
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4['return']) {
        _iterator4['return']();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  actions.push({ action: 'release' });
  return actions;
};

helpers.patternUnlock = function callee$0$0(adb, driver, capabilities) {
  var keys, apiLevel, el, initPos, size, actions;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].info('Trying to unlock device using pattern ' + capabilities.unlockKey);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(helpers.dismissKeyguard(driver, adb));

      case 3:
        keys = helpers.stringKeyToArr(capabilities.unlockKey);
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(adb.getApiLevel());

      case 6:
        apiLevel = context$1$0.sent;
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(driver.findElOrEls("id", 'com.android.' + (apiLevel >= 21 ? 'systemui' : 'keyguard') + ':id/lockPatternView', false));

      case 9:
        el = context$1$0.sent;
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(driver.getLocation(el.ELEMENT));

      case 12:
        initPos = context$1$0.sent;
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(driver.getSize(el.ELEMENT));

      case 15:
        size = context$1$0.sent;
        actions = helpers.getPatternActions(keys, initPos, size.width / 3);
        context$1$0.next = 19;
        return _regeneratorRuntime.awrap(driver.performTouch(actions));

      case 19:
        context$1$0.next = 21;
        return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(UNLOCK_WAIT_TIME));

      case 21:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.PIN_UNLOCK = PIN_UNLOCK;
helpers.PASSWORD_UNLOCK = PASSWORD_UNLOCK;
helpers.PATTERN_UNLOCK = PATTERN_UNLOCK;
helpers.FINGERPRINT_UNLOCK = FINGERPRINT_UNLOCK;

exports['default'] = helpers;
module.exports = exports['default'];

// Waits a bit for the keyboard to hide

// Waits a bit for the device to be unlocked

// Why sleeps ? Avoid some flakyness waiting for the input to receive the keys

// Waits a bit for the device to be unlocked

/* We set the device pattern buttons as number of a regular phone
 *  | • • • |     | 1 2 3 |
 *  | • • • | --> | 4 5 6 |
 *  | • • • |     | 7 8 9 |
  The pattern view buttons are not seeing by the uiautomator since they are
included inside a FrameLayout, so we are going to try clicking on the buttons
using the parent view bounds and math.
*/

// Get actions to perform

// Perform gesture

// Waits a bit for the device to be unlocked
//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUNSLEVBQUUsRUFJRixPQUFPLEVBQ1AsSUFBSSxFQUVKLE9BQU87Ozs7QUFwQlgsNEJBQU8sSUFBSSw0Q0FBMEMsWUFBWSxDQUFDLFNBQVMsQ0FBRyxDQUFDOzt5Q0FDekUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDOzs7QUFDdEMsWUFBSSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQzs7eUNBVXBDLEdBQUcsQ0FBQyxXQUFXLEVBQUU7OztBQUFsQyxnQkFBUTs7eUNBQ0csTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLG9CQUNyQixRQUFRLElBQUksRUFBRSxHQUFHLFVBQVUsR0FBRyxVQUFVLENBQUEsMEJBQ3ZELEtBQUssQ0FDTjs7O0FBSEcsVUFBRTs7eUNBSWMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDOzs7QUFBOUMsZUFBTzs7eUNBQ00sTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDOzs7QUFBdkMsWUFBSTtBQUVKLGVBQU8sR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQzs7eUNBRWhFLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDOzs7O3lDQUU1QixxQkFBTSxnQkFBZ0IsQ0FBQzs7Ozs7OztDQUM5QixDQUFDOztBQUVGLE9BQU8sQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0FBQ2hDLE9BQU8sQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0FBQzFDLE9BQU8sQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0FBQ3hDLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQzs7cUJBRWpDLE9BQU8iLCJmaWxlIjoibGliL3VubG9jay1oZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGxvZ2dlciBmcm9tICcuL2xvZ2dlcic7XHJcbmltcG9ydCB7IHNsZWVwIH0gZnJvbSAnYXN5bmNib3gnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuY29uc3QgUElOX1VOTE9DSyA9IFwicGluXCI7XHJcbmNvbnN0IFBBU1NXT1JEX1VOTE9DSyA9IFwicGFzc3dvcmRcIjtcclxuY29uc3QgUEFUVEVSTl9VTkxPQ0sgPSBcInBhdHRlcm5cIjtcclxuY29uc3QgRklOR0VSUFJJTlRfVU5MT0NLID0gXCJmaW5nZXJwcmludFwiO1xyXG5jb25zdCBVTkxPQ0tfVFlQRVMgPSBbUElOX1VOTE9DSywgUEFTU1dPUkRfVU5MT0NLLCBQQVRURVJOX1VOTE9DSywgRklOR0VSUFJJTlRfVU5MT0NLXTtcclxuY29uc3QgS0VZQ09ERV9OVU1QQURfRU5URVIgPSBcIjY2XCI7XHJcbmNvbnN0IFVOTE9DS19XQUlUX1RJTUUgPSAxMDA7XHJcbmNvbnN0IEhJREVfS0VZQk9BUkRfV0FJVF9USU1FID0gMTAwO1xyXG5jb25zdCBJTlBVVF9LRVlTX1dBSVRfVElNRSA9IDEwMDtcclxuXHJcbmxldCBoZWxwZXJzID0ge307XHJcbmhlbHBlcnMuaXNWYWxpZFVubG9ja1R5cGUgPSBmdW5jdGlvbiAodHlwZSkge1xyXG4gIHJldHVybiBVTkxPQ0tfVFlQRVMuaW5kZXhPZih0eXBlKSAhPT0gLTE7XHJcbn07XHJcblxyXG5oZWxwZXJzLmlzVmFsaWRLZXkgPSBmdW5jdGlvbiAodHlwZSwga2V5KSB7XHJcbiAgaWYgKF8uaXNVbmRlZmluZWQoa2V5KSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBpZiAodHlwZSA9PT0gUElOX1VOTE9DSyB8fCB0eXBlID09PSBGSU5HRVJQUklOVF9VTkxPQ0spIHtcclxuICAgIHJldHVybiAvXlswLTldKyQvLnRlc3Qoa2V5LnRyaW0oKSk7XHJcbiAgfVxyXG4gIGlmICh0eXBlID09PSBQQVRURVJOX1VOTE9DSykge1xyXG4gICAgaWYgKCEvXlsxLTldezIsOX0kLy50ZXN0KGtleS50cmltKCkpKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiAhKC8oWzEtOV0pLio/XFwxLy50ZXN0KGtleS50cmltKCkpKTtcclxuICB9XHJcbiAgLy8gRG9udCB0cmltIHBhc3N3b3JkIGtleSwgeW91IGNhbiB1c2UgYmxhbmsgc3BhY2VzIGluIHlvdXIgYW5kcm9pZCBwYXNzd29yZFxyXG4gIC8vIMKvXFxfKOODhClfL8KvXHJcbiAgaWYgKHR5cGUgPT09IFBBU1NXT1JEX1VOTE9DSykge1xyXG4gICAgcmV0dXJuIC8uezQsfS9nLnRlc3Qoa2V5KTtcclxuICB9XHJcbiAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHVubG9jayB0eXBlICR7dHlwZX1gKTtcclxufTtcclxuXHJcbmhlbHBlcnMuZGlzbWlzc0tleWd1YXJkID0gYXN5bmMgZnVuY3Rpb24gKGRyaXZlciwgYWRiKSB7XHJcbiAgbGV0IGlzS2V5Ym9hcmRTaG93biA9IGF3YWl0IGRyaXZlci5pc0tleWJvYXJkU2hvd24oKTtcclxuICBpZiAoaXNLZXlib2FyZFNob3duKSB7XHJcbiAgICBhd2FpdCBkcml2ZXIuaGlkZUtleWJvYXJkKCk7XHJcbiAgICAvLyBXYWl0cyBhIGJpdCBmb3IgdGhlIGtleWJvYXJkIHRvIGhpZGVcclxuICAgIGF3YWl0IHNsZWVwKEhJREVfS0VZQk9BUkRfV0FJVF9USU1FKTtcclxuICB9XHJcbiAgLy8gZGlzbWlzcyBub3RpZmljYXRpb25zXHJcbiAgbG9nZ2VyLmluZm8oXCJEaXNtaXNzIG5vdGlmaWNhdGlvbnMgZnJvbSB1bmxvY2sgdmlld1wiKTtcclxuICBhd2FpdCBhZGIuc2hlbGwoW1wic2VydmljZVwiLCBcImNhbGxcIiwgXCJub3RpZmljYXRpb25cIiwgXCIxXCJdKTtcclxuICBhd2FpdCBhZGIuYmFjaygpO1xyXG4gIGlmIChhd2FpdCBhZGIuZ2V0QXBpTGV2ZWwoKSA+IDIxKSB7XHJcbiAgICBsb2dnZXIuaW5mbyhcIlRyeWluZyB0byBkaXNtaXNzIGtleWd1YXJkXCIpO1xyXG4gICAgYXdhaXQgYWRiLnNoZWxsKFtcIndtXCIsIFwiZGlzbWlzcy1rZXlndWFyZFwiXSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGxvZ2dlci5pbmZvKFwiU3dpcGluZyB1cCB0byBkaXNtaXNzIGtleWd1YXJkXCIpO1xyXG4gIGF3YWl0IGhlbHBlcnMuc3dpcGVVcChkcml2ZXIpO1xyXG59O1xyXG5cclxuaGVscGVycy5zd2lwZVVwID0gYXN5bmMgZnVuY3Rpb24gKGRyaXZlcikge1xyXG4gIGxldCB3aW5kb3dTaXplID0gYXdhaXQgZHJpdmVyLmdldFdpbmRvd1NpemUoKTtcclxuICBsZXQgeDAgPSBwYXJzZUludCh3aW5kb3dTaXplLnggLyAyLCAxMCk7XHJcbiAgbGV0IHkwID0gd2luZG93U2l6ZS55IC0gMTA7XHJcbiAgbGV0IHlQID0gMTAwO1xyXG4gIGxldCBhY3Rpb25zID0gW1xyXG4gICAge2FjdGlvbjogJ3ByZXNzJywgb3B0aW9uczoge2VsZW1lbnQ6IG51bGwsIHg6IHgwLCB5OiB5MH19LFxyXG4gICAge2FjdGlvbjogJ21vdmVUbycsIG9wdGlvbnM6IHtlbGVtZW50OiBudWxsLCB4OiB4MCwgeTogeVB9fSxcclxuICAgIHthY3Rpb246ICdyZWxlYXNlJ31cclxuICBdO1xyXG4gIGF3YWl0IGRyaXZlci5wZXJmb3JtVG91Y2goYWN0aW9ucyk7XHJcbn07XHJcblxyXG5oZWxwZXJzLmVuY29kZVBhc3N3b3JkID0gZnVuY3Rpb24gKGtleSkge1xyXG4gIHJldHVybiBrZXkucmVwbGFjZSgvXFxzL2lnLCBcIiVzXCIpO1xyXG59O1xyXG5cclxuaGVscGVycy5zdHJpbmdLZXlUb0FyciA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICByZXR1cm4ga2V5LnRyaW0oKS5yZXBsYWNlKC9cXHMrL2csICcnKS5zcGxpdCgvXFxzKi8pO1xyXG59O1xyXG5cclxuaGVscGVycy5maW5nZXJwcmludFVubG9jayA9IGFzeW5jIGZ1bmN0aW9uIChhZGIsIGRyaXZlciwgY2FwYWJpbGl0aWVzKSB7XHJcbiAgaWYgKGF3YWl0IGFkYi5nZXRBcGlMZXZlbCgpIDwgMjMpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkZpbmdlcnByaW50IHVubG9jayBvbmx5IHdvcmtzIGZvciBBbmRyb2lkIDYrIGVtdWxhdG9yc1wiKTtcclxuICB9XHJcbiAgYXdhaXQgYWRiLmZpbmdlcnByaW50KGNhcGFiaWxpdGllcy51bmxvY2tLZXkpO1xyXG4gIGF3YWl0IHNsZWVwKFVOTE9DS19XQUlUX1RJTUUpO1xyXG59O1xyXG5cclxuaGVscGVycy5waW5VbmxvY2sgPSBhc3luYyBmdW5jdGlvbiAoYWRiLCBkcml2ZXIsIGNhcGFiaWxpdGllcykge1xyXG4gIGxvZ2dlci5pbmZvKGBUcnlpbmcgdG8gdW5sb2NrIGRldmljZSB1c2luZyBwaW4gJHtjYXBhYmlsaXRpZXMudW5sb2NrS2V5fWApO1xyXG4gIGF3YWl0IGhlbHBlcnMuZGlzbWlzc0tleWd1YXJkKGRyaXZlciwgYWRiKTtcclxuICBsZXQga2V5cyA9IGhlbHBlcnMuc3RyaW5nS2V5VG9BcnIoY2FwYWJpbGl0aWVzLnVubG9ja0tleSk7XHJcbiAgaWYgKGF3YWl0IGFkYi5nZXRBcGlMZXZlbCgpID49IDIxKSB7XHJcbiAgICBsZXQgZWxzID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKFwiaWRcIiwgXCJjb20uYW5kcm9pZC5zeXN0ZW11aTppZC9kaWdpdF90ZXh0XCIsIHRydWUpO1xyXG4gICAgaWYgKF8uaXNFbXB0eShlbHMpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIGZpbmRpbmcgdW5sb2NrIHBpbiBidXR0b25zIVwiKTtcclxuICAgIH1cclxuICAgIGxldCBwaW5zID0ge307XHJcbiAgICBmb3IgKGxldCBlIG9mIGVscykge1xyXG4gICAgICBsZXQgdGV4dCA9IGF3YWl0IGRyaXZlci5nZXRBdHRyaWJ1dGUoXCJ0ZXh0XCIsIGUuRUxFTUVOVCk7XHJcbiAgICAgIHBpbnNbdGV4dF0gPSBlO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgcGluIG9mIGtleXMpIHtcclxuICAgICAgbGV0IGVsID0gcGluc1twaW5dO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuY2xpY2soZWwuRUxFTUVOVCk7XHJcbiAgICB9XHJcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoXCJpZFwiLCBcImNvbS5hbmRyb2lkLnN5c3RlbXVpOmlkL2tleV9lbnRlclwiLCBmYWxzZSk7XHJcbiAgICBhd2FpdCBkcml2ZXIuY2xpY2soZWwuRUxFTUVOVCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGZvciAobGV0IHBpbiBvZiBrZXlzKSB7XHJcbiAgICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscyhcImlkXCIsIGBjb20uYW5kcm9pZC5rZXlndWFyZDppZC9rZXkke3Bpbn1gLCBmYWxzZSk7XHJcbiAgICAgIGlmIChlbCA9PT0gbnVsbCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJyb3IgZmluZGluZyB1bmxvY2sgcGluICcke3Bpbn0nIGJ1dHRvbiFgKTtcclxuICAgICAgfVxyXG4gICAgICBhd2FpdCBkcml2ZXIuY2xpY2soZWwuRUxFTUVOVCk7XHJcbiAgICB9XHJcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoXCJpZFwiLCBcImNvbS5hbmRyb2lkLmtleWd1YXJkOmlkL2tleV9lbnRlclwiLCBmYWxzZSk7XHJcbiAgICBhd2FpdCBkcml2ZXIuY2xpY2soZWwuRUxFTUVOVCk7XHJcbiAgfVxyXG4gIC8vIFdhaXRzIGEgYml0IGZvciB0aGUgZGV2aWNlIHRvIGJlIHVubG9ja2VkXHJcbiAgYXdhaXQgc2xlZXAoVU5MT0NLX1dBSVRfVElNRSk7XHJcbn07XHJcblxyXG5oZWxwZXJzLnBhc3N3b3JkVW5sb2NrID0gYXN5bmMgZnVuY3Rpb24gKGFkYiwgZHJpdmVyLCBjYXBhYmlsaXRpZXMpIHtcclxuICBsb2dnZXIuaW5mbyhgVHJ5aW5nIHRvIHVubG9jayBkZXZpY2UgdXNpbmcgcGFzc3dvcmQgJHtjYXBhYmlsaXRpZXMudW5sb2NrS2V5fWApO1xyXG4gIGF3YWl0IGhlbHBlcnMuZGlzbWlzc0tleWd1YXJkKGRyaXZlciwgYWRiKTtcclxuICBsZXQga2V5ID0gY2FwYWJpbGl0aWVzLnVubG9ja0tleTtcclxuICAvLyBSZXBsYWNlIGJsYW5rIHNwYWNlcyB3aXRoICVzXHJcbiAga2V5ID0gaGVscGVycy5lbmNvZGVQYXNzd29yZChrZXkpO1xyXG4gIC8vIFdoeSBhZGIgPyBJdCB3YXMgbGVzcyBmbGFreVxyXG4gIGF3YWl0IGFkYi5zaGVsbChbXCJpbnB1dFwiLCBcInRleHRcIiwga2V5XSk7XHJcbiAgLy8gV2h5IHNsZWVwcyA/IEF2b2lkIHNvbWUgZmxha3luZXNzIHdhaXRpbmcgZm9yIHRoZSBpbnB1dCB0byByZWNlaXZlIHRoZSBrZXlzXHJcbiAgYXdhaXQgc2xlZXAoSU5QVVRfS0VZU19XQUlUX1RJTUUpO1xyXG4gIGF3YWl0IGFkYi5zaGVsbChbXCJpbnB1dFwiLCBcImtleWV2ZW50XCIsIEtFWUNPREVfTlVNUEFEX0VOVEVSXSk7XHJcbiAgLy8gV2FpdHMgYSBiaXQgZm9yIHRoZSBkZXZpY2UgdG8gYmUgdW5sb2NrZWRcclxuICBhd2FpdCBzbGVlcChVTkxPQ0tfV0FJVF9USU1FKTtcclxufTtcclxuXHJcbmhlbHBlcnMuZ2V0UGF0dGVybktleVBvc2l0aW9uID0gZnVuY3Rpb24gKGtleSwgaW5pdFBvcywgcGllY2UpIHtcclxuICAvKlxyXG4gIEhvdyB0aGUgbWF0aCB3b3JrczpcclxuICBXZSBoYXZlIDkgYnV0dG9ucyBkaXZpZGVkIGluIDMgY29sdW1ucyBhbmQgMyByb3dzIGluc2lkZSB0aGUgbG9ja1BhdHRlcm5WaWV3LFxyXG4gIGV2ZXJ5IGJ1dHRvbiBoYXMgYSBwb3NpdGlvbiBvbiB0aGUgc2NyZWVuIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGxvY2tQYXR0ZXJuVmlldyBzaW5jZVxyXG4gIGl0IGlzIHRoZSBwYXJlbnQgdmlldyByaWdodCBhdCB0aGUgbWlkZGxlIG9mIGVhY2ggY29sdW1uIG9yIHJvdy5cclxuICAqL1xyXG4gIGNvbnN0IGNvbHMgPSAzO1xyXG4gIGNvbnN0IHBpbnMgPSA5O1xyXG4gIGxldCB4UG9zID0gKGtleSwgeCwgcGllY2UpID0+IHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKHggKyAoKGtleSAlIGNvbHMpIHx8IGNvbHMpICogcGllY2UgLSBwaWVjZSAvIDIpO1xyXG4gIH07XHJcbiAgbGV0IHlQb3MgPSAoa2V5LCB5LCBwaWVjZSkgPT4ge1xyXG4gICAgcmV0dXJuIE1hdGgucm91bmQoeSArIChNYXRoLmNlaWwoKChrZXkgJSBwaW5zKSB8fCBwaW5zKSAvIGNvbHMpICogcGllY2UgLSBwaWVjZSAvIDIpKTtcclxuICB9O1xyXG4gIHJldHVybiB7eDogeFBvcyhrZXksIGluaXRQb3MueCwgcGllY2UpLCB5OiB5UG9zKGtleSwgaW5pdFBvcy55LCBwaWVjZSl9O1xyXG59O1xyXG5cclxuaGVscGVycy5nZXRQYXR0ZXJuQWN0aW9ucyA9IGZ1bmN0aW9uIChrZXlzLCBpbml0UG9zLCBwaWVjZSkge1xyXG4gIGxldCBhY3Rpb25zID0gW107XHJcbiAgbGV0IGxhc3RQb3M7XHJcbiAgZm9yIChsZXQga2V5IG9mIGtleXMpIHtcclxuICAgIGxldCBrZXlQb3MgPSBoZWxwZXJzLmdldFBhdHRlcm5LZXlQb3NpdGlvbihrZXksIGluaXRQb3MsIHBpZWNlKTtcclxuICAgIGlmIChrZXkgPT09IGtleXNbMF0pIHtcclxuICAgICAgYWN0aW9ucy5wdXNoKHthY3Rpb246ICdwcmVzcycsIG9wdGlvbnM6IHtlbGVtZW50OiBudWxsLCB4OiBrZXlQb3MueCwgeToga2V5UG9zLnl9fSk7XHJcbiAgICAgIGxhc3RQb3MgPSBrZXlQb3M7XHJcbiAgICAgIGNvbnRpbnVlO1xyXG4gICAgfVxyXG4gICAgbGV0IG1vdmVUbyA9IHt4OjAsIHk6MH07XHJcbiAgICBsZXQgZGlmZlggPSBrZXlQb3MueCAtIGxhc3RQb3MueDtcclxuICAgIGlmIChkaWZmWCA+IDApIHtcclxuICAgICAgbW92ZVRvLnggPSBwaWVjZTtcclxuICAgICAgaWYgKE1hdGguYWJzKGRpZmZYKSA+IHBpZWNlKSB7XHJcbiAgICAgICAgbW92ZVRvLnggKz0gcGllY2U7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGlmZlggPCAwKSB7XHJcbiAgICAgIG1vdmVUby54ID0gLTEgKiBwaWVjZTtcclxuICAgICAgaWYgKE1hdGguYWJzKGRpZmZYKSA+IHBpZWNlKSB7XHJcbiAgICAgICAgbW92ZVRvLnggLT0gcGllY2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCBkaWZmWSA9IGtleVBvcy55IC0gbGFzdFBvcy55O1xyXG4gICAgaWYgKGRpZmZZID4gMCkge1xyXG4gICAgICBtb3ZlVG8ueSA9IHBpZWNlO1xyXG4gICAgICBpZiAoTWF0aC5hYnMoZGlmZlkpID4gcGllY2UpIHtcclxuICAgICAgICBtb3ZlVG8ueSArPSBwaWVjZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkaWZmWSA8IDApIHtcclxuICAgICAgbW92ZVRvLnkgPSAtMSAqIHBpZWNlO1xyXG4gICAgICBpZiAoTWF0aC5hYnMoZGlmZlkpID4gcGllY2UpIHtcclxuICAgICAgICBtb3ZlVG8ueSAtPSBwaWVjZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgYWN0aW9ucy5wdXNoKHthY3Rpb246ICdtb3ZlVG8nLCBvcHRpb25zOiB7ZWxlbWVudDogbnVsbCwgeDogbW92ZVRvLngsIHk6IG1vdmVUby55fX0pO1xyXG4gICAgbGFzdFBvcyA9IGtleVBvcztcclxuICB9XHJcbiAgYWN0aW9ucy5wdXNoKHthY3Rpb246ICdyZWxlYXNlJ30pO1xyXG4gIHJldHVybiBhY3Rpb25zO1xyXG59O1xyXG5cclxuaGVscGVycy5wYXR0ZXJuVW5sb2NrID0gYXN5bmMgZnVuY3Rpb24gKGFkYiwgZHJpdmVyLCBjYXBhYmlsaXRpZXMpIHtcclxuICBsb2dnZXIuaW5mbyhgVHJ5aW5nIHRvIHVubG9jayBkZXZpY2UgdXNpbmcgcGF0dGVybiAke2NhcGFiaWxpdGllcy51bmxvY2tLZXl9YCk7XHJcbiAgYXdhaXQgaGVscGVycy5kaXNtaXNzS2V5Z3VhcmQoZHJpdmVyLCBhZGIpO1xyXG4gIGxldCBrZXlzID0gaGVscGVycy5zdHJpbmdLZXlUb0FycihjYXBhYmlsaXRpZXMudW5sb2NrS2V5KTtcclxuICAvKiBXZSBzZXQgdGhlIGRldmljZSBwYXR0ZXJuIGJ1dHRvbnMgYXMgbnVtYmVyIG9mIGEgcmVndWxhciBwaG9uZVxyXG4gICAqICB8IOKAoiDigKIg4oCiIHwgICAgIHwgMSAyIDMgfFxyXG4gICAqICB8IOKAoiDigKIg4oCiIHwgLS0+IHwgNCA1IDYgfFxyXG4gICAqICB8IOKAoiDigKIg4oCiIHwgICAgIHwgNyA4IDkgfFxyXG5cclxuICBUaGUgcGF0dGVybiB2aWV3IGJ1dHRvbnMgYXJlIG5vdCBzZWVpbmcgYnkgdGhlIHVpYXV0b21hdG9yIHNpbmNlIHRoZXkgYXJlXHJcbiAgaW5jbHVkZWQgaW5zaWRlIGEgRnJhbWVMYXlvdXQsIHNvIHdlIGFyZSBnb2luZyB0byB0cnkgY2xpY2tpbmcgb24gdGhlIGJ1dHRvbnNcclxuICB1c2luZyB0aGUgcGFyZW50IHZpZXcgYm91bmRzIGFuZCBtYXRoLlxyXG4gICovXHJcbiAgbGV0IGFwaUxldmVsID0gYXdhaXQgYWRiLmdldEFwaUxldmVsKCk7XHJcbiAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKFwiaWRcIixcclxuICAgIGBjb20uYW5kcm9pZC4ke2FwaUxldmVsID49IDIxID8gJ3N5c3RlbXVpJyA6ICdrZXlndWFyZCd9OmlkL2xvY2tQYXR0ZXJuVmlld2AsXHJcbiAgICBmYWxzZVxyXG4gICk7XHJcbiAgbGV0IGluaXRQb3MgPSBhd2FpdCBkcml2ZXIuZ2V0TG9jYXRpb24oZWwuRUxFTUVOVCk7XHJcbiAgbGV0IHNpemUgPSBhd2FpdCBkcml2ZXIuZ2V0U2l6ZShlbC5FTEVNRU5UKTtcclxuICAvLyBHZXQgYWN0aW9ucyB0byBwZXJmb3JtXHJcbiAgbGV0IGFjdGlvbnMgPSBoZWxwZXJzLmdldFBhdHRlcm5BY3Rpb25zKGtleXMsIGluaXRQb3MsIHNpemUud2lkdGggLyAzKTtcclxuICAvLyBQZXJmb3JtIGdlc3R1cmVcclxuICBhd2FpdCBkcml2ZXIucGVyZm9ybVRvdWNoKGFjdGlvbnMpO1xyXG4gIC8vIFdhaXRzIGEgYml0IGZvciB0aGUgZGV2aWNlIHRvIGJlIHVubG9ja2VkXHJcbiAgYXdhaXQgc2xlZXAoVU5MT0NLX1dBSVRfVElNRSk7XHJcbn07XHJcblxyXG5oZWxwZXJzLlBJTl9VTkxPQ0sgPSBQSU5fVU5MT0NLO1xyXG5oZWxwZXJzLlBBU1NXT1JEX1VOTE9DSyA9IFBBU1NXT1JEX1VOTE9DSztcclxuaGVscGVycy5QQVRURVJOX1VOTE9DSyA9IFBBVFRFUk5fVU5MT0NLO1xyXG5oZWxwZXJzLkZJTkdFUlBSSU5UX1VOTE9DSyA9IEZJTkdFUlBSSU5UX1VOTE9DSztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGhlbHBlcnM7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uIn0=
