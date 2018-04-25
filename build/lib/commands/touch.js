'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _androidHelpers = require('../android-helpers');

var _androidHelpers2 = _interopRequireDefault(_androidHelpers);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _appiumBaseDriver = require('appium-base-driver');

var _asyncbox = require('asyncbox');

var commands = {},
    helpers = {},
    extensions = {};

commands.doTouchAction = function callee$0$0(action, opts) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.t0 = action;
        context$1$0.next = context$1$0.t0 === 'tap' ? 3 : context$1$0.t0 === 'press' ? 6 : context$1$0.t0 === 'release' ? 9 : context$1$0.t0 === 'moveTo' ? 12 : context$1$0.t0 === 'wait' ? 15 : context$1$0.t0 === 'longPress' ? 18 : context$1$0.t0 === 'cancel' ? 22 : 24;
        break;

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.tap(opts.element, opts.x, opts.y, opts.count));

      case 5:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.touchDown(opts.element, opts.x, opts.y));

      case 8:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 9:
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(this.touchUp(opts.element, opts.x, opts.y));

      case 11:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 12:
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(this.touchMove(opts.element, opts.x, opts.y));

      case 14:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 15:
        context$1$0.next = 17;
        return _regeneratorRuntime.awrap(_bluebird2['default'].delay(opts.ms));

      case 17:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 18:
        if (typeof opts.duration === 'undefined' || !opts.duration) {
          opts.duration = 1000;
        }
        context$1$0.next = 21;
        return _regeneratorRuntime.awrap(this.touchLongClick(opts.element, opts.x, opts.y, opts.duration));

      case 21:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 22:
        // TODO: clarify behavior of 'cancel' action and fix this
        _logger2['default'].warn("Cancel action currently has no effect");
        return context$1$0.abrupt('break', 25);

      case 24:
        _logger2['default'].errorAndThrow('unknown action ' + action);

      case 25:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// drag is *not* press-move-release, so we need to translate
// drag works fine for scroll, as well
helpers.doTouchDrag = function callee$0$0(gestures) {
  var longPress, moveTo, startX, startY, endX, endY, _ref, x, y, _ref2, apiLevel, duration;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        longPress = gestures[0];
        moveTo = gestures[1];
        startX = longPress.options.x || 0, startY = longPress.options.y || 0, endX = moveTo.options.x || 0, endY = moveTo.options.y || 0;

        if (!longPress.options.element) {
          context$1$0.next = 11;
          break;
        }

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.getLocationInView(longPress.options.element));

      case 6:
        _ref = context$1$0.sent;
        x = _ref.x;
        y = _ref.y;

        startX += x || 0;
        startY += y || 0;

      case 11:
        if (!moveTo.options.element) {
          context$1$0.next = 19;
          break;
        }

        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(this.getLocationInView(moveTo.options.element));

      case 14:
        _ref2 = context$1$0.sent;
        x = _ref2.x;
        y = _ref2.y;

        endX += x || 0;
        endY += y || 0;

      case 19:
        context$1$0.next = 21;
        return _regeneratorRuntime.awrap(this.adb.getApiLevel());

      case 21:
        apiLevel = context$1$0.sent;
        duration = apiLevel >= 5 ? 2 : 1;

        // make sure that if the long press has a duration, we use it.
        if (longPress.options && longPress.options.duration) {
          duration = Math.max(longPress.options.duration / 1000, duration);
        }

        // `drag` will take care of whether there is an element or not at that level
        context$1$0.next = 26;
        return _regeneratorRuntime.awrap(this.drag(startX, startY, endX, endY, duration, 1, longPress.options.element, moveTo.options.element));

      case 26:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 27:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// Release gesture needs element or co-ordinates to release it from that position
// or else release gesture is performed from center of the screen, so to fix it
// This method sets co-ordinates/element to release gesture if it has no options set already.
helpers.fixRelease = function callee$0$0(gestures) {
  var release, ref, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, gesture, opts, loc, size;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        release = _lodash2['default'].last(gestures);

        // sometimes there are no options
        release.options = release.options || {};
        // nothing to do if release options are already set

        if (!(release.options.element || release.options.x && release.options.y)) {
          context$1$0.next = 4;
          break;
        }

        return context$1$0.abrupt('return');

      case 4:
        // without coordinates, `release` uses the center of the screen, which,
        // generally speaking, is not what we want
        // therefore: loop backwards and use the last command with an element and/or
        // offset coordinates
        gestures = _lodash2['default'].clone(gestures);
        ref = null;
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 9;
        _iterator = _getIterator(gestures.reverse());

      case 11:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 20;
          break;
        }

        gesture = _step.value;
        opts = gesture.options;

        if (!(opts.element || opts.x && opts.y)) {
          context$1$0.next = 17;
          break;
        }

        ref = gesture;
        return context$1$0.abrupt('break', 20);

      case 17:
        _iteratorNormalCompletion = true;
        context$1$0.next = 11;
        break;

      case 20:
        context$1$0.next = 26;
        break;

      case 22:
        context$1$0.prev = 22;
        context$1$0.t0 = context$1$0['catch'](9);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 26:
        context$1$0.prev = 26;
        context$1$0.prev = 27;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 29:
        context$1$0.prev = 29;

        if (!_didIteratorError) {
          context$1$0.next = 32;
          break;
        }

        throw _iteratorError;

      case 32:
        return context$1$0.finish(29);

      case 33:
        return context$1$0.finish(26);

      case 34:
        if (!ref) {
          context$1$0.next = 51;
          break;
        }

        opts = ref.options;

        if (!opts.element) {
          context$1$0.next = 50;
          break;
        }

        context$1$0.next = 39;
        return _regeneratorRuntime.awrap(this.getLocationInView(opts.element));

      case 39:
        loc = context$1$0.sent;

        if (!(opts.x && opts.y)) {
          context$1$0.next = 44;
          break;
        }

        // this is an offset from the element
        release.options = {
          x: loc.x + opts.x,
          y: loc.y + opts.y
        };
        context$1$0.next = 48;
        break;

      case 44:
        context$1$0.next = 46;
        return _regeneratorRuntime.awrap(this.getSize(opts.element));

      case 46:
        size = context$1$0.sent;

        release.options = {
          x: loc.x + size.width / 2,
          y: loc.y + size.height / 2
        };

      case 48:
        context$1$0.next = 51;
        break;

      case 50:
        release.options = _lodash2['default'].pick(opts, 'x', 'y');

      case 51:
        return context$1$0.abrupt('return', release);

      case 52:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[9, 22, 26, 34], [27,, 29, 33]]);
};

// Perform one gesture
helpers.performGesture = function callee$0$0(gesture) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.doTouchAction(gesture.action, gesture.options || {}));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
        context$1$0.prev = 6;
        context$1$0.t0 = context$1$0['catch'](0);

        if (!((0, _appiumBaseDriver.isErrorType)(context$1$0.t0, _appiumBaseDriver.errors.NoSuchElementError) && gesture.action === 'release' && gesture.options.element)) {
          context$1$0.next = 14;
          break;
        }

        delete gesture.options.element;
        _logger2['default'].debug('retrying release without element opts: ' + gesture.options + '.');
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(this.doTouchAction(gesture.action, gesture.options || {}));

      case 13:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 14:
        throw context$1$0.t0;

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 6]]);
};

commands.performTouch = function callee$0$0(gestures) {
  var swipeOpts, actions, press, wait, fixedGestures, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, g;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isWebContext()) {
          context$1$0.next = 2;
          break;
        }

        throw new _appiumBaseDriver.errors.NotYetImplementedError();

      case 2:
        if (!(gestures.length === 4 && gestures[0].action === 'press' && gestures[1].action === 'wait' && gestures[2].action === 'moveTo' && gestures[3].action === 'release')) {
          context$1$0.next = 9;
          break;
        }

        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.getSwipeOptions(gestures));

      case 5:
        swipeOpts = context$1$0.sent;
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.swipe(swipeOpts.startX, swipeOpts.startY, swipeOpts.endX, swipeOpts.endY, swipeOpts.duration, swipeOpts.touchCount, swipeOpts.element));

      case 8:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 9:
        actions = _lodash2['default'].map(gestures, "action");

        if (!(actions[0] === 'longPress' && actions[1] === 'moveTo' && actions[2] === 'release')) {
          context$1$0.next = 16;
          break;
        }

        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(this.doTouchDrag(gestures));

      case 13:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 16:
        if (actions.length === 2) {
          // `press` without a wait is too slow and gets interpretted as a `longPress`
          if (_lodash2['default'].head(actions) === 'press' && _lodash2['default'].last(actions) === 'release') {
            actions[0] = 'tap';
            gestures[0].action = 'tap';
          }

          // the `longPress` and `tap` methods release on their own
          if ((_lodash2['default'].head(actions) === 'tap' || _lodash2['default'].head(actions) === 'longPress') && _lodash2['default'].last(actions) === 'release') {
            gestures.pop();
            actions.pop();
          }
        } else {
          // longpress followed by anything other than release should become a press and wait
          if (actions[0] === 'longPress') {
            actions = ['press', 'wait'].concat(_toConsumableArray(actions.slice(1)));

            press = gestures.shift();

            press.action = 'press';
            wait = {
              action: 'wait',
              options: { ms: press.options.duration || 1000 }
            };

            delete press.options.duration;
            gestures = [press, wait].concat(_toConsumableArray(gestures));
          }
        }

        context$1$0.next = 19;
        return _regeneratorRuntime.awrap(this.parseTouch(gestures, false));

      case 19:
        fixedGestures = context$1$0.sent;

        if (!(actions[actions.length - 1] === 'release')) {
          context$1$0.next = 24;
          break;
        }

        context$1$0.next = 23;
        return _regeneratorRuntime.awrap(this.fixRelease(gestures));

      case 23:
        actions[actions.length - 1] = context$1$0.sent;

      case 24:
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 27;
        _iterator2 = _getIterator(fixedGestures);

      case 29:
        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
          context$1$0.next = 36;
          break;
        }

        g = _step2.value;
        context$1$0.next = 33;
        return _regeneratorRuntime.awrap(this.performGesture(g));

      case 33:
        _iteratorNormalCompletion2 = true;
        context$1$0.next = 29;
        break;

      case 36:
        context$1$0.next = 42;
        break;

      case 38:
        context$1$0.prev = 38;
        context$1$0.t0 = context$1$0['catch'](27);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t0;

      case 42:
        context$1$0.prev = 42;
        context$1$0.prev = 43;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 45:
        context$1$0.prev = 45;

        if (!_didIteratorError2) {
          context$1$0.next = 48;
          break;
        }

        throw _iteratorError2;

      case 48:
        return context$1$0.finish(45);

      case 49:
        return context$1$0.finish(42);

      case 50:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[27, 38, 42, 50], [43,, 45, 49]]);
};

helpers.parseTouch = function callee$0$0(gestures, multi) {
  var touchStateObjects, prevPos, time, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, state, timeOffset;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        // because multi-touch releases at the end by default
        if (multi && _lodash2['default'].last(gestures).action === 'release') {
          gestures.pop();
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _asyncbox.asyncmap)(gestures, function callee$1$0(gesture) {
          var options, elementId, pos, size, touchStateObject, offset;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                options = gesture.options || {};

                if (!_lodash2['default'].includes(['press', 'moveTo', 'tap', 'longPress'], gesture.action)) {
                  context$2$0.next = 23;
                  break;
                }

                options.offset = false;
                elementId = gesture.options.element;

                if (!elementId) {
                  context$2$0.next = 16;
                  break;
                }

                context$2$0.next = 7;
                return _regeneratorRuntime.awrap(this.getLocationInView(elementId));

              case 7:
                pos = context$2$0.sent;
                context$2$0.next = 10;
                return _regeneratorRuntime.awrap(this.getSize(elementId));

              case 10:
                size = context$2$0.sent;

                if (gesture.options.x || gesture.options.y) {
                  options.x = pos.x + (gesture.options.x || 0);
                  options.y = pos.y + (gesture.options.y || 0);
                } else {
                  options.x = pos.x + size.width / 2;
                  options.y = pos.y + size.height / 2;
                }
                touchStateObject = {
                  action: gesture.action,
                  options: options,
                  timeOffset: 0.005
                };
                return context$2$0.abrupt('return', touchStateObject);

              case 16:
                // expects absolute coordinates, so we need to save these as offsets
                // and then translate when everything is done
                options.offset = true;
                options.x = gesture.options.x || 0;
                options.y = gesture.options.y || 0;

                touchStateObject = {
                  action: gesture.action,
                  options: options,
                  timeOffset: 0.005
                };
                return context$2$0.abrupt('return', touchStateObject);

              case 21:
                context$2$0.next = 27;
                break;

              case 23:
                offset = 0.005;

                if (gesture.action === 'wait') {
                  options = gesture.options;
                  offset = parseInt(gesture.options.ms, 10) / 1000;
                }
                touchStateObject = {
                  action: gesture.action,
                  options: options,
                  timeOffset: offset
                };
                return context$2$0.abrupt('return', touchStateObject);

              case 27:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        }, false));

      case 3:
        touchStateObjects = context$1$0.sent;
        prevPos = null, time = 0;
        _iteratorNormalCompletion3 = true;
        _didIteratorError3 = false;
        _iteratorError3 = undefined;
        context$1$0.prev = 8;

        for (_iterator3 = _getIterator(touchStateObjects); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          state = _step3.value;

          if (_lodash2['default'].isUndefined(state.options.x) && _lodash2['default'].isUndefined(state.options.y) && prevPos !== null) {
            // this happens with wait
            state.options.x = prevPos.x;
            state.options.y = prevPos.y;
          }
          if (state.options.offset && prevPos) {
            // the current position is an offset
            state.options.x += prevPos.x;
            state.options.y += prevPos.y;
          }
          delete state.options.offset;
          if (!_lodash2['default'].isUndefined(state.options.x) && !_lodash2['default'].isUndefined(state.options.y)) {
            prevPos = state.options;
          }

          if (multi) {
            timeOffset = state.timeOffset;

            time += timeOffset;
            state.time = _androidHelpers2['default'].truncateDecimals(time, 3);

            // multi gestures require 'touch' rather than 'options'
            if (!_lodash2['default'].isUndefined(state.options.x) && !_lodash2['default'].isUndefined(state.options.y)) {
              state.touch = {
                x: state.options.x,
                y: state.options.y
              };
            }
            delete state.options;
          }
          delete state.timeOffset;
        }
        context$1$0.next = 16;
        break;

      case 12:
        context$1$0.prev = 12;
        context$1$0.t0 = context$1$0['catch'](8);
        _didIteratorError3 = true;
        _iteratorError3 = context$1$0.t0;

      case 16:
        context$1$0.prev = 16;
        context$1$0.prev = 17;

        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }

      case 19:
        context$1$0.prev = 19;

        if (!_didIteratorError3) {
          context$1$0.next = 22;
          break;
        }

        throw _iteratorError3;

      case 22:
        return context$1$0.finish(19);

      case 23:
        return context$1$0.finish(16);

      case 24:
        return context$1$0.abrupt('return', touchStateObjects);

      case 25:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[8, 12, 16, 24], [17,, 19, 23]]);
};

commands.performMultiAction = function callee$0$0(actions, elementId) {
  var states;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this2 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isWebContext()) {
          context$1$0.next = 2;
          break;
        }

        throw new _appiumBaseDriver.errors.NotYetImplementedError();

      case 2:
        if (!(actions.length === 1)) {
          context$1$0.next = 4;
          break;
        }

        throw new Error("Multi Pointer Gestures need at least two actions. " + "Use Touch Actions for a single action.");

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap((0, _asyncbox.asyncmap)(actions, function callee$1$0(action) {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.parseTouch(action, true));

              case 2:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 3:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this2);
        }, false));

      case 6:
        states = context$1$0.sent;
        return context$1$0.abrupt('return', this.doPerformMultiAction(elementId, states));

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Reason for isolating doPerformMultiAction from performMultiAction is for reusing performMultiAction
 * across android-drivers (like appium-uiautomator2-driver) and to avoid code duplication.
 * Other android-drivers (like appium-uiautomator2-driver) need to override doPerformMultiAction
 * to facilitate performMultiAction.
 */
commands.doPerformMultiAction = function callee$0$0(elementId, states) {
  var opts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        opts = undefined;

        if (!elementId) {
          context$1$0.next = 8;
          break;
        }

        opts = {
          elementId: elementId,
          actions: states
        };
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:performMultiPointerGesture", opts));

      case 5:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 8:
        opts = {
          actions: states
        };
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("performMultiPointerGesture", opts));

      case 11:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;

// lollipop takes a little longer to get things rolling

// this is the center of the element

// sometime the element is not available when releasing, retry without it

// press-wait-moveTo-release is `swipe`, so use native method

// some things are special

// fix release action then perform all actions

// we need to change the time (which is now an offset)
// and the position (which may be an offset)

// Android needs at least two actions to be able to perform a multi pointer gesture
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy90b3VjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O3NCQUFnQixXQUFXOzs7O3NCQUNiLFFBQVE7Ozs7OEJBQ0ssb0JBQW9COzs7O3dCQUNqQyxVQUFVOzs7O2dDQUNZLG9CQUFvQjs7d0JBQy9CLFVBQVU7O0FBRW5DLElBQUksUUFBUSxHQUFHLEVBQUU7SUFBRSxPQUFPLEdBQUcsRUFBRTtJQUFFLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRWpELFFBQVEsQ0FBQyxhQUFhLEdBQUcsb0JBQWdCLE1BQU0sRUFBRSxJQUFJOzs7O3lCQUMzQyxNQUFNOzhDQUNQLEtBQUssMEJBRUwsT0FBTywwQkFFUCxTQUFTLDBCQUVULFFBQVEsMkJBRVIsTUFBTSwyQkFFTixXQUFXLDJCQUtYLFFBQVE7Ozs7O3lDQWRFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQzs7Ozs7Ozt5Q0FFbEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozt5Q0FFNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozt5Q0FFMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozt5Q0FFNUMsc0JBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Ozs7OztBQUU3QixZQUFJLE9BQU8sSUFBSSxDQUFDLFFBQVEsS0FBSyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFF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QUFvQyxFQUFFLElBQUksQ0FBQzs7Ozs7O0FBRWxGLFlBQUksR0FBRztBQUNMLGlCQUFPLEVBQUUsTUFBTTtTQUNoQixDQUFDOzt5Q0FDVyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyw0QkFBNEIsRUFBRSxJQUFJLENBQUM7Ozs7Ozs7Ozs7Q0FFN0UsQ0FBQzs7QUFFRixlQUFjLFVBQVUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEMsUUFBUSxHQUFSLFFBQVE7UUFBRSxPQUFPLEdBQVAsT0FBTztxQkFDWCxVQUFVIiwiZmlsZSI6ImxpYi9jb21tYW5kcy90b3VjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb2cgZnJvbSAnLi4vbG9nZ2VyJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IGFuZHJvaWRIZWxwZXJzIGZyb20gJy4uL2FuZHJvaWQtaGVscGVycyc7XHJcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcclxuaW1wb3J0IHsgZXJyb3JzLCBpc0Vycm9yVHlwZSB9IGZyb20gJ2FwcGl1bS1iYXNlLWRyaXZlcic7XHJcbmltcG9ydCB7IGFzeW5jbWFwIH0gZnJvbSAnYXN5bmNib3gnO1xyXG5cclxubGV0IGNvbW1hbmRzID0ge30sIGhlbHBlcnMgPSB7fSwgZXh0ZW5zaW9ucyA9IHt9O1xyXG5cclxuY29tbWFuZHMuZG9Ub3VjaEFjdGlvbiA9IGFzeW5jIGZ1bmN0aW9uIChhY3Rpb24sIG9wdHMpIHtcclxuICBzd2l0Y2ggKGFjdGlvbikge1xyXG4gICAgY2FzZSAndGFwJzpcclxuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMudGFwKG9wdHMuZWxlbWVudCwgb3B0cy54LCBvcHRzLnksIG9wdHMuY291bnQpO1xyXG4gICAgY2FzZSAncHJlc3MnOlxyXG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy50b3VjaERvd24ob3B0cy5lbGVtZW50LCBvcHRzLngsIG9wdHMueSk7XHJcbiAgICBjYXNlICdyZWxlYXNlJzpcclxuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMudG91Y2hVcChvcHRzLmVsZW1lbnQsIG9wdHMueCwgb3B0cy55KTtcclxuICAgIGNhc2UgJ21vdmVUbyc6XHJcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLnRvdWNoTW92ZShvcHRzLmVsZW1lbnQsIG9wdHMueCwgb3B0cy55KTtcclxuICAgIGNhc2UgJ3dhaXQnOlxyXG4gICAgICByZXR1cm4gYXdhaXQgQi5kZWxheShvcHRzLm1zKTtcclxuICAgIGNhc2UgJ2xvbmdQcmVzcyc6XHJcbiAgICAgIGlmICh0eXBlb2Ygb3B0cy5kdXJhdGlvbiA9PT0gJ3VuZGVmaW5lZCcgfHwgIW9wdHMuZHVyYXRpb24pIHtcclxuICAgICAgICBvcHRzLmR1cmF0aW9uID0gMTAwMDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy50b3VjaExvbmdDbGljayhvcHRzLmVsZW1lbnQsIG9wdHMueCwgb3B0cy55LCBvcHRzLmR1cmF0aW9uKTtcclxuICAgIGNhc2UgJ2NhbmNlbCc6XHJcbiAgICAgIC8vIFRPRE86IGNsYXJpZnkgYmVoYXZpb3Igb2YgJ2NhbmNlbCcgYWN0aW9uIGFuZCBmaXggdGhpc1xyXG4gICAgICBsb2cud2FybihcIkNhbmNlbCBhY3Rpb24gY3VycmVudGx5IGhhcyBubyBlZmZlY3RcIik7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgbG9nLmVycm9yQW5kVGhyb3coYHVua25vd24gYWN0aW9uICR7YWN0aW9ufWApO1xyXG4gIH1cclxufTtcclxuXHJcblxyXG4vLyBkcmFnIGlzICpub3QqIHByZXNzLW1vdmUtcmVsZWFzZSwgc28gd2UgbmVlZCB0byB0cmFuc2xhdGVcclxuLy8gZHJhZyB3b3JrcyBmaW5lIGZvciBzY3JvbGwsIGFzIHdlbGxcclxuaGVscGVycy5kb1RvdWNoRHJhZyA9IGFzeW5jIGZ1bmN0aW9uIChnZXN0dXJlcykge1xyXG4gIGxldCBsb25nUHJlc3MgPSBnZXN0dXJlc1swXTtcclxuICBsZXQgbW92ZVRvID0gZ2VzdHVyZXNbMV07XHJcbiAgbGV0IHN0YXJ0WCA9IGxvbmdQcmVzcy5vcHRpb25zLnggfHwgMCxcclxuICAgICAgc3RhcnRZID0gbG9uZ1ByZXNzLm9wdGlvbnMueSB8fCAwLFxyXG4gICAgICBlbmRYID0gbW92ZVRvLm9wdGlvbnMueCB8fCAwLFxyXG4gICAgICBlbmRZID0gbW92ZVRvLm9wdGlvbnMueSB8fCAwO1xyXG4gIGlmIChsb25nUHJlc3Mub3B0aW9ucy5lbGVtZW50KSB7XHJcbiAgICBsZXQge3gsIHl9ID0gYXdhaXQgdGhpcy5nZXRMb2NhdGlvbkluVmlldyhsb25nUHJlc3Mub3B0aW9ucy5lbGVtZW50KTtcclxuICAgIHN0YXJ0WCArPSB4IHx8IDA7XHJcbiAgICBzdGFydFkgKz0geSB8fCAwO1xyXG4gIH1cclxuICBpZiAobW92ZVRvLm9wdGlvbnMuZWxlbWVudCkge1xyXG4gICAgbGV0IHt4LCB5fSA9IGF3YWl0IHRoaXMuZ2V0TG9jYXRpb25JblZpZXcobW92ZVRvLm9wdGlvbnMuZWxlbWVudCk7XHJcbiAgICBlbmRYICs9IHggfHwgMDtcclxuICAgIGVuZFkgKz0geSB8fCAwO1xyXG4gIH1cclxuXHJcbiAgbGV0IGFwaUxldmVsID0gYXdhaXQgdGhpcy5hZGIuZ2V0QXBpTGV2ZWwoKTtcclxuICAvLyBsb2xsaXBvcCB0YWtlcyBhIGxpdHRsZSBsb25nZXIgdG8gZ2V0IHRoaW5ncyByb2xsaW5nXHJcbiAgbGV0IGR1cmF0aW9uID0gYXBpTGV2ZWwgPj0gNSA/IDIgOiAxO1xyXG4gIC8vIG1ha2Ugc3VyZSB0aGF0IGlmIHRoZSBsb25nIHByZXNzIGhhcyBhIGR1cmF0aW9uLCB3ZSB1c2UgaXQuXHJcbiAgaWYgKGxvbmdQcmVzcy5vcHRpb25zICYmIGxvbmdQcmVzcy5vcHRpb25zLmR1cmF0aW9uKSB7XHJcbiAgICBkdXJhdGlvbiA9IE1hdGgubWF4KGxvbmdQcmVzcy5vcHRpb25zLmR1cmF0aW9uIC8gMTAwMCwgZHVyYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgLy8gYGRyYWdgIHdpbGwgdGFrZSBjYXJlIG9mIHdoZXRoZXIgdGhlcmUgaXMgYW4gZWxlbWVudCBvciBub3QgYXQgdGhhdCBsZXZlbFxyXG4gIHJldHVybiBhd2FpdCB0aGlzLmRyYWcoc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFksIGR1cmF0aW9uLCAxLCBsb25nUHJlc3Mub3B0aW9ucy5lbGVtZW50LCBtb3ZlVG8ub3B0aW9ucy5lbGVtZW50KTtcclxufTtcclxuXHJcbi8vIFJlbGVhc2UgZ2VzdHVyZSBuZWVkcyBlbGVtZW50IG9yIGNvLW9yZGluYXRlcyB0byByZWxlYXNlIGl0IGZyb20gdGhhdCBwb3NpdGlvblxyXG4vLyBvciBlbHNlIHJlbGVhc2UgZ2VzdHVyZSBpcyBwZXJmb3JtZWQgZnJvbSBjZW50ZXIgb2YgdGhlIHNjcmVlbiwgc28gdG8gZml4IGl0XHJcbi8vIFRoaXMgbWV0aG9kIHNldHMgY28tb3JkaW5hdGVzL2VsZW1lbnQgdG8gcmVsZWFzZSBnZXN0dXJlIGlmIGl0IGhhcyBubyBvcHRpb25zIHNldCBhbHJlYWR5LlxyXG5oZWxwZXJzLmZpeFJlbGVhc2UgPSBhc3luYyBmdW5jdGlvbiAoZ2VzdHVyZXMpIHtcclxuICBsZXQgcmVsZWFzZSA9IF8ubGFzdChnZXN0dXJlcyk7XHJcbiAgLy8gc29tZXRpbWVzIHRoZXJlIGFyZSBubyBvcHRpb25zXHJcbiAgcmVsZWFzZS5vcHRpb25zID0gcmVsZWFzZS5vcHRpb25zIHx8IHt9O1xyXG4gIC8vIG5vdGhpbmcgdG8gZG8gaWYgcmVsZWFzZSBvcHRpb25zIGFyZSBhbHJlYWR5IHNldFxyXG4gIGlmIChyZWxlYXNlLm9wdGlvbnMuZWxlbWVudCB8fCAocmVsZWFzZS5vcHRpb25zLnggJiYgcmVsZWFzZS5vcHRpb25zLnkpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIC8vIHdpdGhvdXQgY29vcmRpbmF0ZXMsIGByZWxlYXNlYCB1c2VzIHRoZSBjZW50ZXIgb2YgdGhlIHNjcmVlbiwgd2hpY2gsXHJcbiAgLy8gZ2VuZXJhbGx5IHNwZWFraW5nLCBpcyBub3Qgd2hhdCB3ZSB3YW50XHJcbiAgLy8gdGhlcmVmb3JlOiBsb29wIGJhY2t3YXJkcyBhbmQgdXNlIHRoZSBsYXN0IGNvbW1hbmQgd2l0aCBhbiBlbGVtZW50IGFuZC9vclxyXG4gIC8vIG9mZnNldCBjb29yZGluYXRlc1xyXG4gIGdlc3R1cmVzID0gXy5jbG9uZShnZXN0dXJlcyk7XHJcbiAgbGV0IHJlZiA9IG51bGw7XHJcbiAgZm9yIChsZXQgZ2VzdHVyZSBvZiBnZXN0dXJlcy5yZXZlcnNlKCkpIHtcclxuICAgIGxldCBvcHRzID0gZ2VzdHVyZS5vcHRpb25zO1xyXG4gICAgaWYgKG9wdHMuZWxlbWVudCB8fCAob3B0cy54ICYmIG9wdHMueSkpIHtcclxuICAgICAgcmVmID0gZ2VzdHVyZTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmIChyZWYpIHtcclxuICAgIGxldCBvcHRzID0gcmVmLm9wdGlvbnM7XHJcbiAgICBpZiAob3B0cy5lbGVtZW50KSB7XHJcbiAgICAgIGxldCBsb2MgPSBhd2FpdCB0aGlzLmdldExvY2F0aW9uSW5WaWV3KG9wdHMuZWxlbWVudCk7XHJcbiAgICAgIGlmIChvcHRzLnggJiYgb3B0cy55KSB7XHJcbiAgICAgICAgLy8gdGhpcyBpcyBhbiBvZmZzZXQgZnJvbSB0aGUgZWxlbWVudFxyXG4gICAgICAgIHJlbGVhc2Uub3B0aW9ucyA9IHtcclxuICAgICAgICAgIHg6IGxvYy54ICsgb3B0cy54LFxyXG4gICAgICAgICAgeTogbG9jLnkgKyBvcHRzLnlcclxuICAgICAgICB9O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIHRoaXMgaXMgdGhlIGNlbnRlciBvZiB0aGUgZWxlbWVudFxyXG4gICAgICAgIGxldCBzaXplID0gYXdhaXQgdGhpcy5nZXRTaXplKG9wdHMuZWxlbWVudCk7XHJcbiAgICAgICAgcmVsZWFzZS5vcHRpb25zID0ge1xyXG4gICAgICAgICAgeDogbG9jLnggKyBzaXplLndpZHRoIC8gMixcclxuICAgICAgICAgIHk6IGxvYy55ICsgc2l6ZS5oZWlnaHQgLyAyXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVsZWFzZS5vcHRpb25zID0gXy5waWNrKG9wdHMsICd4JywgJ3knKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHJlbGVhc2U7XHJcbn07XHJcblxyXG4vLyBQZXJmb3JtIG9uZSBnZXN0dXJlXHJcbmhlbHBlcnMucGVyZm9ybUdlc3R1cmUgPSBhc3luYyBmdW5jdGlvbiAoZ2VzdHVyZSkge1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5kb1RvdWNoQWN0aW9uKGdlc3R1cmUuYWN0aW9uLCBnZXN0dXJlLm9wdGlvbnMgfHwge30pO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIC8vIHNvbWV0aW1lIHRoZSBlbGVtZW50IGlzIG5vdCBhdmFpbGFibGUgd2hlbiByZWxlYXNpbmcsIHJldHJ5IHdpdGhvdXQgaXRcclxuICAgIGlmIChpc0Vycm9yVHlwZShlLCBlcnJvcnMuTm9TdWNoRWxlbWVudEVycm9yKSAmJiBnZXN0dXJlLmFjdGlvbiA9PT0gJ3JlbGVhc2UnICYmXHJcbiAgICAgICAgZ2VzdHVyZS5vcHRpb25zLmVsZW1lbnQpIHtcclxuICAgICAgZGVsZXRlIGdlc3R1cmUub3B0aW9ucy5lbGVtZW50O1xyXG4gICAgICBsb2cuZGVidWcoYHJldHJ5aW5nIHJlbGVhc2Ugd2l0aG91dCBlbGVtZW50IG9wdHM6ICR7Z2VzdHVyZS5vcHRpb25zfS5gKTtcclxuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZG9Ub3VjaEFjdGlvbihnZXN0dXJlLmFjdGlvbiwgZ2VzdHVyZS5vcHRpb25zIHx8IHt9KTtcclxuICAgIH1cclxuICAgIHRocm93IGU7XHJcbiAgfVxyXG59O1xyXG5cclxuY29tbWFuZHMucGVyZm9ybVRvdWNoID0gYXN5bmMgZnVuY3Rpb24gKGdlc3R1cmVzKSB7XHJcbiAgaWYgKHRoaXMuaXNXZWJDb250ZXh0KCkpIHtcclxuICAgIHRocm93IG5ldyBlcnJvcnMuTm90WWV0SW1wbGVtZW50ZWRFcnJvcigpO1xyXG4gIH1cclxuXHJcbiAgLy8gcHJlc3Mtd2FpdC1tb3ZlVG8tcmVsZWFzZSBpcyBgc3dpcGVgLCBzbyB1c2UgbmF0aXZlIG1ldGhvZFxyXG4gIGlmIChnZXN0dXJlcy5sZW5ndGggPT09IDQgJiZcclxuICAgICAgZ2VzdHVyZXNbMF0uYWN0aW9uID09PSAncHJlc3MnICYmXHJcbiAgICAgIGdlc3R1cmVzWzFdLmFjdGlvbiA9PT0gJ3dhaXQnICYmXHJcbiAgICAgIGdlc3R1cmVzWzJdLmFjdGlvbiA9PT0gJ21vdmVUbycgJiZcclxuICAgICAgZ2VzdHVyZXNbM10uYWN0aW9uID09PSAncmVsZWFzZScpIHtcclxuXHJcbiAgICBsZXQgc3dpcGVPcHRzID0gYXdhaXQgdGhpcy5nZXRTd2lwZU9wdGlvbnMoZ2VzdHVyZXMpO1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuc3dpcGUoc3dpcGVPcHRzLnN0YXJ0WCwgc3dpcGVPcHRzLnN0YXJ0WSwgc3dpcGVPcHRzLmVuZFgsXHJcbiAgICAgICAgc3dpcGVPcHRzLmVuZFksIHN3aXBlT3B0cy5kdXJhdGlvbiwgc3dpcGVPcHRzLnRvdWNoQ291bnQsXHJcbiAgICAgICAgc3dpcGVPcHRzLmVsZW1lbnQpO1xyXG4gIH1cclxuICBsZXQgYWN0aW9ucyA9IF8ubWFwKGdlc3R1cmVzLCBcImFjdGlvblwiKTtcclxuXHJcbiAgaWYgKGFjdGlvbnNbMF0gPT09ICdsb25nUHJlc3MnICYmIGFjdGlvbnNbMV0gPT09ICdtb3ZlVG8nICYmIGFjdGlvbnNbMl0gPT09ICdyZWxlYXNlJykge1xyXG4gICAgLy8gc29tZSB0aGluZ3MgYXJlIHNwZWNpYWxcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmRvVG91Y2hEcmFnKGdlc3R1cmVzKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKGFjdGlvbnMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgIC8vIGBwcmVzc2Agd2l0aG91dCBhIHdhaXQgaXMgdG9vIHNsb3cgYW5kIGdldHMgaW50ZXJwcmV0dGVkIGFzIGEgYGxvbmdQcmVzc2BcclxuICAgICAgaWYgKF8uaGVhZChhY3Rpb25zKSA9PT0gJ3ByZXNzJyAmJiBfLmxhc3QoYWN0aW9ucykgPT09ICdyZWxlYXNlJykge1xyXG4gICAgICAgIGFjdGlvbnNbMF0gPSAndGFwJztcclxuICAgICAgICBnZXN0dXJlc1swXS5hY3Rpb24gPSAndGFwJztcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gdGhlIGBsb25nUHJlc3NgIGFuZCBgdGFwYCBtZXRob2RzIHJlbGVhc2Ugb24gdGhlaXIgb3duXHJcbiAgICAgIGlmICgoXy5oZWFkKGFjdGlvbnMpID09PSAndGFwJyB8fCBfLmhlYWQoYWN0aW9ucykgPT09ICdsb25nUHJlc3MnKSAmJiBfLmxhc3QoYWN0aW9ucykgPT09ICdyZWxlYXNlJykge1xyXG4gICAgICAgIGdlc3R1cmVzLnBvcCgpO1xyXG4gICAgICAgIGFjdGlvbnMucG9wKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGxvbmdwcmVzcyBmb2xsb3dlZCBieSBhbnl0aGluZyBvdGhlciB0aGFuIHJlbGVhc2Ugc2hvdWxkIGJlY29tZSBhIHByZXNzIGFuZCB3YWl0XHJcbiAgICAgIGlmIChhY3Rpb25zWzBdID09PSAnbG9uZ1ByZXNzJykge1xyXG4gICAgICAgIGFjdGlvbnMgPSBbJ3ByZXNzJywgJ3dhaXQnLCAuLi5hY3Rpb25zLnNsaWNlKDEpXTtcclxuXHJcbiAgICAgICAgbGV0IHByZXNzID0gZ2VzdHVyZXMuc2hpZnQoKTtcclxuICAgICAgICBwcmVzcy5hY3Rpb24gPSAncHJlc3MnO1xyXG4gICAgICAgIGxldCB3YWl0ID0ge1xyXG4gICAgICAgICAgYWN0aW9uOiAnd2FpdCcsXHJcbiAgICAgICAgICBvcHRpb25zOiB7bXM6IHByZXNzLm9wdGlvbnMuZHVyYXRpb24gfHwgMTAwMH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGRlbGV0ZSBwcmVzcy5vcHRpb25zLmR1cmF0aW9uO1xyXG4gICAgICAgIGdlc3R1cmVzID0gW3ByZXNzLCB3YWl0LCAuLi5nZXN0dXJlc107XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgZml4ZWRHZXN0dXJlcyA9IGF3YWl0IHRoaXMucGFyc2VUb3VjaChnZXN0dXJlcywgZmFsc2UpO1xyXG4gICAgLy8gZml4IHJlbGVhc2UgYWN0aW9uIHRoZW4gcGVyZm9ybSBhbGwgYWN0aW9uc1xyXG4gICAgaWYgKGFjdGlvbnNbYWN0aW9ucy5sZW5ndGggLSAxXSA9PT0gJ3JlbGVhc2UnKSB7XHJcbiAgICAgIGFjdGlvbnNbYWN0aW9ucy5sZW5ndGggLSAxXSA9IGF3YWl0IHRoaXMuZml4UmVsZWFzZShnZXN0dXJlcyk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBnIG9mIGZpeGVkR2VzdHVyZXMpIHtcclxuICAgICAgYXdhaXQgdGhpcy5wZXJmb3JtR2VzdHVyZShnKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5oZWxwZXJzLnBhcnNlVG91Y2ggPSBhc3luYyBmdW5jdGlvbiAoZ2VzdHVyZXMsIG11bHRpKSB7XHJcbiAgLy8gYmVjYXVzZSBtdWx0aS10b3VjaCByZWxlYXNlcyBhdCB0aGUgZW5kIGJ5IGRlZmF1bHRcclxuICBpZiAobXVsdGkgJiYgXy5sYXN0KGdlc3R1cmVzKS5hY3Rpb24gPT09ICdyZWxlYXNlJykge1xyXG4gICAgZ2VzdHVyZXMucG9wKCk7XHJcbiAgfVxyXG5cclxuICBsZXQgdG91Y2hTdGF0ZU9iamVjdHMgPSBhd2FpdCBhc3luY21hcChnZXN0dXJlcywgYXN5bmMgKGdlc3R1cmUpID0+IHtcclxuICAgIGxldCBvcHRpb25zID0gZ2VzdHVyZS5vcHRpb25zIHx8IHt9O1xyXG4gICAgaWYgKF8uaW5jbHVkZXMoWydwcmVzcycsICdtb3ZlVG8nLCAndGFwJywgJ2xvbmdQcmVzcyddLCBnZXN0dXJlLmFjdGlvbikpIHtcclxuICAgICAgb3B0aW9ucy5vZmZzZXQgPSBmYWxzZTtcclxuICAgICAgbGV0IGVsZW1lbnRJZCA9IGdlc3R1cmUub3B0aW9ucy5lbGVtZW50O1xyXG4gICAgICBpZiAoZWxlbWVudElkKSB7XHJcbiAgICAgICAgbGV0IHBvcyA9IGF3YWl0IHRoaXMuZ2V0TG9jYXRpb25JblZpZXcoZWxlbWVudElkKTtcclxuICAgICAgICBsZXQgc2l6ZSA9IGF3YWl0IHRoaXMuZ2V0U2l6ZShlbGVtZW50SWQpO1xyXG4gICAgICAgIGlmIChnZXN0dXJlLm9wdGlvbnMueCB8fCBnZXN0dXJlLm9wdGlvbnMueSkge1xyXG4gICAgICAgICAgb3B0aW9ucy54ID0gcG9zLnggKyAoZ2VzdHVyZS5vcHRpb25zLnggfHwgMCk7XHJcbiAgICAgICAgICBvcHRpb25zLnkgPSBwb3MueSArIChnZXN0dXJlLm9wdGlvbnMueSB8fCAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgb3B0aW9ucy54ID0gcG9zLnggKyAoc2l6ZS53aWR0aCAvIDIpO1xyXG4gICAgICAgICAgb3B0aW9ucy55ID0gcG9zLnkgKyAoc2l6ZS5oZWlnaHQgLyAyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRvdWNoU3RhdGVPYmplY3QgPSB7XHJcbiAgICAgICAgICBhY3Rpb246IGdlc3R1cmUuYWN0aW9uLFxyXG4gICAgICAgICAgb3B0aW9ucyxcclxuICAgICAgICAgIHRpbWVPZmZzZXQ6IDAuMDA1LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRvdWNoU3RhdGVPYmplY3Q7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gZXhwZWN0cyBhYnNvbHV0ZSBjb29yZGluYXRlcywgc28gd2UgbmVlZCB0byBzYXZlIHRoZXNlIGFzIG9mZnNldHNcclxuICAgICAgICAvLyBhbmQgdGhlbiB0cmFuc2xhdGUgd2hlbiBldmVyeXRoaW5nIGlzIGRvbmVcclxuICAgICAgICBvcHRpb25zLm9mZnNldCA9IHRydWU7XHJcbiAgICAgICAgb3B0aW9ucy54ID0gKGdlc3R1cmUub3B0aW9ucy54IHx8IDApO1xyXG4gICAgICAgIG9wdGlvbnMueSA9IChnZXN0dXJlLm9wdGlvbnMueSB8fCAwKTtcclxuXHJcbiAgICAgICAgbGV0IHRvdWNoU3RhdGVPYmplY3QgPSB7XHJcbiAgICAgICAgICBhY3Rpb246IGdlc3R1cmUuYWN0aW9uLFxyXG4gICAgICAgICAgb3B0aW9ucyxcclxuICAgICAgICAgIHRpbWVPZmZzZXQ6IDAuMDA1LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRvdWNoU3RhdGVPYmplY3Q7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBvZmZzZXQgPSAwLjAwNTtcclxuICAgICAgaWYgKGdlc3R1cmUuYWN0aW9uID09PSAnd2FpdCcpIHtcclxuICAgICAgICBvcHRpb25zID0gZ2VzdHVyZS5vcHRpb25zO1xyXG4gICAgICAgIG9mZnNldCA9IChwYXJzZUludChnZXN0dXJlLm9wdGlvbnMubXMsIDEwKSAvIDEwMDApO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCB0b3VjaFN0YXRlT2JqZWN0ID0ge1xyXG4gICAgICAgIGFjdGlvbjogZ2VzdHVyZS5hY3Rpb24sXHJcbiAgICAgICAgb3B0aW9ucyxcclxuICAgICAgICB0aW1lT2Zmc2V0OiBvZmZzZXQsXHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiB0b3VjaFN0YXRlT2JqZWN0O1xyXG4gICAgfVxyXG4gIH0sIGZhbHNlKTtcclxuICAvLyB3ZSBuZWVkIHRvIGNoYW5nZSB0aGUgdGltZSAod2hpY2ggaXMgbm93IGFuIG9mZnNldClcclxuICAvLyBhbmQgdGhlIHBvc2l0aW9uICh3aGljaCBtYXkgYmUgYW4gb2Zmc2V0KVxyXG4gIGxldCBwcmV2UG9zID0gbnVsbCxcclxuICAgICAgdGltZSA9IDA7XHJcbiAgZm9yIChsZXQgc3RhdGUgb2YgdG91Y2hTdGF0ZU9iamVjdHMpIHtcclxuICAgIGlmIChfLmlzVW5kZWZpbmVkKHN0YXRlLm9wdGlvbnMueCkgJiYgXy5pc1VuZGVmaW5lZChzdGF0ZS5vcHRpb25zLnkpICYmIHByZXZQb3MgIT09IG51bGwpIHtcclxuICAgICAgLy8gdGhpcyBoYXBwZW5zIHdpdGggd2FpdFxyXG4gICAgICBzdGF0ZS5vcHRpb25zLnggPSBwcmV2UG9zLng7XHJcbiAgICAgIHN0YXRlLm9wdGlvbnMueSA9IHByZXZQb3MueTtcclxuICAgIH1cclxuICAgIGlmIChzdGF0ZS5vcHRpb25zLm9mZnNldCAmJiBwcmV2UG9zKSB7XHJcbiAgICAgIC8vIHRoZSBjdXJyZW50IHBvc2l0aW9uIGlzIGFuIG9mZnNldFxyXG4gICAgICBzdGF0ZS5vcHRpb25zLnggKz0gcHJldlBvcy54O1xyXG4gICAgICBzdGF0ZS5vcHRpb25zLnkgKz0gcHJldlBvcy55O1xyXG4gICAgfVxyXG4gICAgZGVsZXRlIHN0YXRlLm9wdGlvbnMub2Zmc2V0O1xyXG4gICAgaWYgKCFfLmlzVW5kZWZpbmVkKHN0YXRlLm9wdGlvbnMueCkgJiYgIV8uaXNVbmRlZmluZWQoc3RhdGUub3B0aW9ucy55KSkge1xyXG4gICAgICBwcmV2UG9zID0gc3RhdGUub3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBpZiAobXVsdGkpIHtcclxuICAgICAgbGV0IHRpbWVPZmZzZXQgPSBzdGF0ZS50aW1lT2Zmc2V0O1xyXG4gICAgICB0aW1lICs9IHRpbWVPZmZzZXQ7XHJcbiAgICAgIHN0YXRlLnRpbWUgPSBhbmRyb2lkSGVscGVycy50cnVuY2F0ZURlY2ltYWxzKHRpbWUsIDMpO1xyXG5cclxuICAgICAgLy8gbXVsdGkgZ2VzdHVyZXMgcmVxdWlyZSAndG91Y2gnIHJhdGhlciB0aGFuICdvcHRpb25zJ1xyXG4gICAgICBpZiAoIV8uaXNVbmRlZmluZWQoc3RhdGUub3B0aW9ucy54KSAmJiAhXy5pc1VuZGVmaW5lZChzdGF0ZS5vcHRpb25zLnkpKSB7XHJcbiAgICAgICAgc3RhdGUudG91Y2ggPSB7XHJcbiAgICAgICAgICB4OiBzdGF0ZS5vcHRpb25zLngsXHJcbiAgICAgICAgICB5OiBzdGF0ZS5vcHRpb25zLnlcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIGRlbGV0ZSBzdGF0ZS5vcHRpb25zO1xyXG4gICAgfVxyXG4gICAgZGVsZXRlIHN0YXRlLnRpbWVPZmZzZXQ7XHJcbiAgfVxyXG4gIHJldHVybiB0b3VjaFN0YXRlT2JqZWN0cztcclxufTtcclxuXHJcblxyXG5jb21tYW5kcy5wZXJmb3JtTXVsdGlBY3Rpb24gPSBhc3luYyBmdW5jdGlvbiAoYWN0aW9ucywgZWxlbWVudElkKSB7XHJcbiAgaWYgKHRoaXMuaXNXZWJDb250ZXh0KCkpIHtcclxuICAgIHRocm93IG5ldyBlcnJvcnMuTm90WWV0SW1wbGVtZW50ZWRFcnJvcigpO1xyXG4gIH1cclxuXHJcbiAgLy8gQW5kcm9pZCBuZWVkcyBhdCBsZWFzdCB0d28gYWN0aW9ucyB0byBiZSBhYmxlIHRvIHBlcmZvcm0gYSBtdWx0aSBwb2ludGVyIGdlc3R1cmVcclxuICBpZiAoYWN0aW9ucy5sZW5ndGggPT09IDEpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIk11bHRpIFBvaW50ZXIgR2VzdHVyZXMgbmVlZCBhdCBsZWFzdCB0d28gYWN0aW9ucy4gXCIgK1xyXG4gICAgICAgIFwiVXNlIFRvdWNoIEFjdGlvbnMgZm9yIGEgc2luZ2xlIGFjdGlvbi5cIik7XHJcbiAgfVxyXG5cclxuICBsZXQgc3RhdGVzID0gYXdhaXQgYXN5bmNtYXAoYWN0aW9ucywgYXN5bmMgKGFjdGlvbikgPT4ge1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMucGFyc2VUb3VjaChhY3Rpb24sIHRydWUpO1xyXG4gIH0sIGZhbHNlKTtcclxuXHJcbiAgcmV0dXJuIHRoaXMuZG9QZXJmb3JtTXVsdGlBY3Rpb24oZWxlbWVudElkLCBzdGF0ZXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlYXNvbiBmb3IgaXNvbGF0aW5nIGRvUGVyZm9ybU11bHRpQWN0aW9uIGZyb20gcGVyZm9ybU11bHRpQWN0aW9uIGlzIGZvciByZXVzaW5nIHBlcmZvcm1NdWx0aUFjdGlvblxyXG4gKiBhY3Jvc3MgYW5kcm9pZC1kcml2ZXJzIChsaWtlIGFwcGl1bS11aWF1dG9tYXRvcjItZHJpdmVyKSBhbmQgdG8gYXZvaWQgY29kZSBkdXBsaWNhdGlvbi5cclxuICogT3RoZXIgYW5kcm9pZC1kcml2ZXJzIChsaWtlIGFwcGl1bS11aWF1dG9tYXRvcjItZHJpdmVyKSBuZWVkIHRvIG92ZXJyaWRlIGRvUGVyZm9ybU11bHRpQWN0aW9uXHJcbiAqIHRvIGZhY2lsaXRhdGUgcGVyZm9ybU11bHRpQWN0aW9uLlxyXG4gKi9cclxuY29tbWFuZHMuZG9QZXJmb3JtTXVsdGlBY3Rpb24gPSBhc3luYyBmdW5jdGlvbiAoZWxlbWVudElkLCBzdGF0ZXMpIHtcclxuICBsZXQgb3B0cztcclxuICBpZiAoZWxlbWVudElkKSB7XHJcbiAgICBvcHRzID0ge1xyXG4gICAgICBlbGVtZW50SWQsXHJcbiAgICAgIGFjdGlvbnM6IHN0YXRlc1xyXG4gICAgfTtcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiZWxlbWVudDpwZXJmb3JtTXVsdGlQb2ludGVyR2VzdHVyZVwiLCBvcHRzKTtcclxuICB9IGVsc2Uge1xyXG4gICAgb3B0cyA9IHtcclxuICAgICAgYWN0aW9uczogc3RhdGVzXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJwZXJmb3JtTXVsdGlQb2ludGVyR2VzdHVyZVwiLCBvcHRzKTtcclxuICB9XHJcbn07XHJcblxyXG5PYmplY3QuYXNzaWduKGV4dGVuc2lvbnMsIGNvbW1hbmRzLCBoZWxwZXJzKTtcclxuZXhwb3J0IHsgY29tbWFuZHMsIGhlbHBlcnMgfTtcclxuZXhwb3J0IGRlZmF1bHQgZXh0ZW5zaW9ucztcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uIn0=
