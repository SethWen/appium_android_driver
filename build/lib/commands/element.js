'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _androidHelpers = require('../android-helpers');

var _androidHelpers2 = _interopRequireDefault(_androidHelpers);

var _asyncbox = require('asyncbox');

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var commands = {},
    helpers = {},
    extensions = {};

commands.getAttribute = function callee$0$0(attribute, elementId) {
  var p;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        p = { attribute: attribute, elementId: elementId };
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:getAttribute", p));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getName = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getAttribute("className", elementId));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.elementDisplayed = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getAttribute("displayed", elementId));

      case 2:
        context$1$0.t0 = context$1$0.sent;
        return context$1$0.abrupt('return', context$1$0.t0 === 'true');

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.elementEnabled = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getAttribute("enabled", elementId));

      case 2:
        context$1$0.t0 = context$1$0.sent;
        return context$1$0.abrupt('return', context$1$0.t0 === 'true');

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.elementSelected = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getAttribute("selected", elementId));

      case 2:
        context$1$0.t0 = context$1$0.sent;
        return context$1$0.abrupt('return', context$1$0.t0 === 'true');

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.setElementValue = function callee$0$0(keys, elementId) {
  var replace = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
  var text, params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        text = keys;

        if (keys instanceof Array) {
          text = keys.join("");
        }

        params = {
          elementId: elementId,
          text: text,
          replace: replace,
          unicodeKeyboard: this.opts.unicodeKeyboard
        };
        return context$1$0.abrupt('return', this.doSetElementValue(params));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Reason for isolating doSetElementValue from setElementValue is for reusing setElementValue
 * across android-drivers (like appium-uiautomator2-driver) and to avoid code duplication.
 * Other android-drivers (like appium-uiautomator2-driver) need to override doSetElementValue
 * to facilitate setElementValue.
 */
helpers.doSetElementValue = function callee$0$0(params) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:setText", params));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.setValue = function callee$0$0(keys, elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.setElementValue(keys, elementId, false));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.replaceValue = function callee$0$0(keys, elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.setElementValue(keys, elementId, true));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.setValueImmediate = function callee$0$0(keys, elementId) {
  var text;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        text = keys;

        if (keys instanceof Array) {
          text = keys.join("");
        }

        // first, make sure we are focused on the element
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.click(elementId));

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.adb.inputText(text));

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getText = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:getText", { elementId: elementId }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.clear = function callee$0$0(elementId) {
  var text, length;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getText(elementId));

      case 2:
        context$1$0.t0 = context$1$0.sent;

        if (context$1$0.t0) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.t0 = '';

      case 5:
        text = context$1$0.t0;
        length = text.length;

        if (length === 0) {
          // if length is zero there are two possibilities:
          //   1. there is nothing in the text field
          //   2. it is a password field
          // since there is little overhead to the adb call, delete 100 elements
          // if we get zero, just in case it is #2
          length = 100;
        }
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(this.click(elementId));

      case 10:
        _logger2['default'].debug('Sending up to ' + length + ' clear characters to device');
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(5, 500, function callee$1$0() {
          var remainingLength, lengthToSend;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                remainingLength = length;

              case 1:
                if (!(remainingLength > 0)) {
                  context$2$0.next = 9;
                  break;
                }

                lengthToSend = remainingLength < 50 ? remainingLength : 50;

                _logger2['default'].debug('Sending ' + lengthToSend + ' clear characters to device');
                context$2$0.next = 6;
                return _regeneratorRuntime.awrap(this.adb.clearTextField(lengthToSend));

              case 6:
                remainingLength -= lengthToSend;
                context$2$0.next = 1;
                break;

              case 9:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        }));

      case 13:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 14:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.click = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:click", { elementId: elementId }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getLocation = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:getLocation", { elementId: elementId }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getLocationInView = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getLocation(elementId));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getSize = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:getSize", { elementId: elementId }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.touchLongClick = function callee$0$0(elementId, x, y, duration) {
  var params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        params = { elementId: elementId, x: x, y: y, duration: duration };

        _androidHelpers2['default'].removeNullProperties(params);
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:touchLongClick", params));

      case 4:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.touchDown = function callee$0$0(elementId, x, y) {
  var params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        params = { elementId: elementId, x: x, y: y };

        _androidHelpers2['default'].removeNullProperties(params);
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:touchDown", params));

      case 4:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.touchUp = function callee$0$0(elementId, x, y) {
  var params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        params = { elementId: elementId, x: x, y: y };

        _androidHelpers2['default'].removeNullProperties(params);
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:touchUp", params));

      case 4:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.touchMove = function callee$0$0(elementId, x, y) {
  var params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        params = { elementId: elementId, x: x, y: y };

        _androidHelpers2['default'].removeNullProperties(params);
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:touchMove", params));

      case 4:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.complexTap = function callee$0$0(tapCount, touchCount, duration, x, y) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("click", { x: x, y: y }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.tap = function callee$0$0(elementId) {
  var x = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
  var y = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
  var count = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];
  var i;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        i = 0;

      case 1:
        if (!(i < count)) {
          context$1$0.next = 17;
          break;
        }

        if (!elementId) {
          context$1$0.next = 12;
          break;
        }

        if (!(x !== 0 || y !== 0)) {
          context$1$0.next = 8;
          break;
        }

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:click", { elementId: elementId, x: x, y: y }));

      case 6:
        context$1$0.next = 10;
        break;

      case 8:
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:click", { elementId: elementId }));

      case 10:
        context$1$0.next = 14;
        break;

      case 12:
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("click", { x: x, y: y }));

      case 14:
        i++;
        context$1$0.next = 1;
        break;

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;

// then send through adb

// we are either tapping on the default location of the element
// or an offset from the top left corner
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9lbGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs4QkFBMkIsb0JBQW9COzs7O3dCQUNqQixVQUFVOztzQkFDckIsV0FBVzs7OztBQUc5QixJQUFJLFFBQVEsR0FBRyxFQUFFO0lBQUUsT0FBTyxHQUFHLEVBQUU7SUFBRSxVQUFVLEdBQUcsRUFBRSxDQUFDOztBQUVqRCxRQUFRLENBQUMsWUFBWSxHQUFHLG9CQUFnQixTQUFTLEVBQUUsU0FBUztNQUN0RCxDQUFDOzs7O0FBQUQsU0FBQyxHQUFHLEVBQUMsU0FBUyxFQUFULFNBQVMsRUFBRSxTQUFTLEVBQVQsU0FBUyxFQUFDOzt5Q0FDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0NBQ2xFLENBQUM7O0FBRUYsUUFBUSxDQUFDLE9BQU8sR0FBRyxvQkFBZ0IsU0FBUzs7Ozs7eUNBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQzs7Ozs7Ozs7OztDQUN2RCxDQUFDOztBQUVGLFFBQVEsQ0FBQyxnQkFBZ0IsR0FBRyxvQkFBZ0IsU0FBUzs7Ozs7eUNBQ3RDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQzs7OzsrREFBSyxNQUFNOzs7Ozs7O0NBQ2xFLENBQUM7O0FBRUYsUUFBUSxDQUFDLGNBQWMsR0FBRyxvQkFBZ0IsU0FBUzs7Ozs7eUNBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQzs7OzsrREFBSyxNQUFNOzs7Ozs7O0NBQ2hFLENBQUM7O0FBRUYsUUFBUSxDQUFDLGVBQWUsR0FBRyxvQkFBZ0IsU0FBUzs7Ozs7eUNBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQzs7OzsrREFBSyxNQUFNOzs7Ozs7O0NBQ2pFLENBQUM7O0FBRUYsT0FBTyxDQUFDLGVBQWUsR0FB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QUFDLEVBQUMsQ0FBQzs7Ozs7Ozs7OztDQUN4RCxDQUFDOztBQUVGLFFBQVEsQ0FBQyxHQUFHLEdBQUcsb0JBQWdCLFNBQVM7TUFBRSxDQUFDLHlEQUFHLENBQUM7TUFBRSxDQUFDLHlEQUFHLENBQUM7TUFBRSxLQUFLLHlEQUFHLENBQUM7TUFDdEQsQ0FBQzs7OztBQUFELFNBQUMsR0FBRyxDQUFDOzs7Y0FBRSxDQUFDLEdBQUcsS0FBSyxDQUFBOzs7OzthQUNuQixTQUFTOzs7OztjQUdQLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTs7Ozs7O3lDQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxFQUFDLFNBQVMsRUFBVCxTQUFTLEVBQUUsQ0FBQyxFQUFELENBQUMsRUFBRSxDQUFDLEVBQUQsQ0FBQyxFQUFDLENBQUM7Ozs7Ozs7O3lDQUU3RCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsRUFBQyxTQUFTLEVBQVQsU0FBUyxFQUFDLENBQUM7Ozs7Ozs7O3lDQUd6RCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBQyxDQUFDLEVBQUQsQ0FBQyxFQUFFLENBQUMsRUFBRCxDQUFDLEVBQUMsQ0FBQzs7O0FBVnpCLFNBQUMsRUFBRTs7Ozs7Ozs7O0NBYS9CLENBQUM7O0FBRUYsZUFBYyxVQUFVLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLFFBQVEsR0FBUixRQUFRO1FBQUUsT0FBTyxHQUFQLE9BQU87cUJBQ1gsVUFBVSIsImZpbGUiOiJsaWIvY29tbWFuZHMvZWxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhbmRyb2lkSGVscGVycyBmcm9tICcuLi9hbmRyb2lkLWhlbHBlcnMnO1xyXG5pbXBvcnQgeyByZXRyeUludGVydmFsIH0gZnJvbSAnYXN5bmNib3gnO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4uL2xvZ2dlcic7XHJcblxyXG5cclxubGV0IGNvbW1hbmRzID0ge30sIGhlbHBlcnMgPSB7fSwgZXh0ZW5zaW9ucyA9IHt9O1xyXG5cclxuY29tbWFuZHMuZ2V0QXR0cmlidXRlID0gYXN5bmMgZnVuY3Rpb24gKGF0dHJpYnV0ZSwgZWxlbWVudElkKSB7XHJcbiAgbGV0IHAgPSB7YXR0cmlidXRlLCBlbGVtZW50SWR9O1xyXG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiZWxlbWVudDpnZXRBdHRyaWJ1dGVcIiwgcCk7XHJcbn07XHJcblxyXG5jb21tYW5kcy5nZXROYW1lID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnRJZCkge1xyXG4gIHJldHVybiBhd2FpdCB0aGlzLmdldEF0dHJpYnV0ZShcImNsYXNzTmFtZVwiLCBlbGVtZW50SWQpO1xyXG59O1xyXG5cclxuY29tbWFuZHMuZWxlbWVudERpc3BsYXllZCA9IGFzeW5jIGZ1bmN0aW9uIChlbGVtZW50SWQpIHtcclxuICByZXR1cm4gYXdhaXQgdGhpcy5nZXRBdHRyaWJ1dGUoXCJkaXNwbGF5ZWRcIiwgZWxlbWVudElkKSA9PT0gJ3RydWUnO1xyXG59O1xyXG5cclxuY29tbWFuZHMuZWxlbWVudEVuYWJsZWQgPSBhc3luYyBmdW5jdGlvbiAoZWxlbWVudElkKSB7XHJcbiAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0QXR0cmlidXRlKFwiZW5hYmxlZFwiLCBlbGVtZW50SWQpID09PSAndHJ1ZSc7XHJcbn07XHJcblxyXG5jb21tYW5kcy5lbGVtZW50U2VsZWN0ZWQgPSBhc3luYyBmdW5jdGlvbiAoZWxlbWVudElkKSB7XHJcbiAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiwgZWxlbWVudElkKSA9PT0gJ3RydWUnO1xyXG59O1xyXG5cclxuaGVscGVycy5zZXRFbGVtZW50VmFsdWUgPSBhc3luYyBmdW5jdGlvbiAoa2V5cywgZWxlbWVudElkLCByZXBsYWNlID0gZmFsc2UpIHtcclxuICBsZXQgdGV4dCA9IGtleXM7XHJcbiAgaWYgKGtleXMgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgdGV4dCA9IGtleXMuam9pbihcIlwiKTtcclxuICB9XHJcblxyXG4gIGxldCBwYXJhbXMgPSB7XHJcbiAgICBlbGVtZW50SWQsXHJcbiAgICB0ZXh0LFxyXG4gICAgcmVwbGFjZSxcclxuICAgIHVuaWNvZGVLZXlib2FyZDogdGhpcy5vcHRzLnVuaWNvZGVLZXlib2FyZFxyXG4gIH07XHJcblxyXG4gIHJldHVybiB0aGlzLmRvU2V0RWxlbWVudFZhbHVlKHBhcmFtcyk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVhc29uIGZvciBpc29sYXRpbmcgZG9TZXRFbGVtZW50VmFsdWUgZnJvbSBzZXRFbGVtZW50VmFsdWUgaXMgZm9yIHJldXNpbmcgc2V0RWxlbWVudFZhbHVlXHJcbiAqIGFjcm9zcyBhbmRyb2lkLWRyaXZlcnMgKGxpa2UgYXBwaXVtLXVpYXV0b21hdG9yMi1kcml2ZXIpIGFuZCB0byBhdm9pZCBjb2RlIGR1cGxpY2F0aW9uLlxyXG4gKiBPdGhlciBhbmRyb2lkLWRyaXZlcnMgKGxpa2UgYXBwaXVtLXVpYXV0b21hdG9yMi1kcml2ZXIpIG5lZWQgdG8gb3ZlcnJpZGUgZG9TZXRFbGVtZW50VmFsdWVcclxuICogdG8gZmFjaWxpdGF0ZSBzZXRFbGVtZW50VmFsdWUuXHJcbiAqL1xyXG5oZWxwZXJzLmRvU2V0RWxlbWVudFZhbHVlID0gYXN5bmMgZnVuY3Rpb24gKHBhcmFtcykge1xyXG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiZWxlbWVudDpzZXRUZXh0XCIsIHBhcmFtcyk7XHJcbn07XHJcblxyXG5jb21tYW5kcy5zZXRWYWx1ZSA9IGFzeW5jIGZ1bmN0aW9uIChrZXlzLCBlbGVtZW50SWQpIHtcclxuICByZXR1cm4gYXdhaXQgdGhpcy5zZXRFbGVtZW50VmFsdWUoa2V5cywgZWxlbWVudElkLCBmYWxzZSk7XHJcbn07XHJcblxyXG5jb21tYW5kcy5yZXBsYWNlVmFsdWUgPSBhc3luYyBmdW5jdGlvbiAoa2V5cywgZWxlbWVudElkKSB7XHJcbiAgcmV0dXJuIGF3YWl0IHRoaXMuc2V0RWxlbWVudFZhbHVlKGtleXMsIGVsZW1lbnRJZCwgdHJ1ZSk7XHJcbn07XHJcblxyXG5jb21tYW5kcy5zZXRWYWx1ZUltbWVkaWF0ZSA9IGFzeW5jIGZ1bmN0aW9uIChrZXlzLCBlbGVtZW50SWQpIHtcclxuICBsZXQgdGV4dCA9IGtleXM7XHJcbiAgaWYgKGtleXMgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgdGV4dCA9IGtleXMuam9pbihcIlwiKTtcclxuICB9XHJcblxyXG4gIC8vIGZpcnN0LCBtYWtlIHN1cmUgd2UgYXJlIGZvY3VzZWQgb24gdGhlIGVsZW1lbnRcclxuICBhd2FpdCB0aGlzLmNsaWNrKGVsZW1lbnRJZCk7XHJcblxyXG4gIC8vIHRoZW4gc2VuZCB0aHJvdWdoIGFkYlxyXG4gIGF3YWl0IHRoaXMuYWRiLmlucHV0VGV4dCh0ZXh0KTtcclxufTtcclxuXHJcbmNvbW1hbmRzLmdldFRleHQgPSBhc3luYyBmdW5jdGlvbiAoZWxlbWVudElkKSB7XHJcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJlbGVtZW50OmdldFRleHRcIiwge2VsZW1lbnRJZH0pO1xyXG59O1xyXG5cclxuY29tbWFuZHMuY2xlYXIgPSBhc3luYyBmdW5jdGlvbiAoZWxlbWVudElkKSB7XHJcbiAgbGV0IHRleHQgPSAoYXdhaXQgdGhpcy5nZXRUZXh0KGVsZW1lbnRJZCkpIHx8ICcnO1xyXG4gIGxldCBsZW5ndGggPSB0ZXh0Lmxlbmd0aDtcclxuICBpZiAobGVuZ3RoID09PSAwKSB7XHJcbiAgICAvLyBpZiBsZW5ndGggaXMgemVybyB0aGVyZSBhcmUgdHdvIHBvc3NpYmlsaXRpZXM6XHJcbiAgICAvLyAgIDEuIHRoZXJlIGlzIG5vdGhpbmcgaW4gdGhlIHRleHQgZmllbGRcclxuICAgIC8vICAgMi4gaXQgaXMgYSBwYXNzd29yZCBmaWVsZFxyXG4gICAgLy8gc2luY2UgdGhlcmUgaXMgbGl0dGxlIG92ZXJoZWFkIHRvIHRoZSBhZGIgY2FsbCwgZGVsZXRlIDEwMCBlbGVtZW50c1xyXG4gICAgLy8gaWYgd2UgZ2V0IHplcm8sIGp1c3QgaW4gY2FzZSBpdCBpcyAjMlxyXG4gICAgbGVuZ3RoID0gMTAwO1xyXG4gIH1cclxuICBhd2FpdCB0aGlzLmNsaWNrKGVsZW1lbnRJZCk7XHJcbiAgbG9nZ2VyLmRlYnVnKGBTZW5kaW5nIHVwIHRvICR7bGVuZ3RofSBjbGVhciBjaGFyYWN0ZXJzIHRvIGRldmljZWApO1xyXG4gIHJldHVybiBhd2FpdCByZXRyeUludGVydmFsKDUsIDUwMCwgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IHJlbWFpbmluZ0xlbmd0aCA9IGxlbmd0aDtcclxuICAgIHdoaWxlIChyZW1haW5pbmdMZW5ndGggPiAwKSB7XHJcbiAgICAgIGxldCBsZW5ndGhUb1NlbmQgPSByZW1haW5pbmdMZW5ndGggPCA1MCA/IHJlbWFpbmluZ0xlbmd0aCA6IDUwO1xyXG4gICAgICBsb2dnZXIuZGVidWcoYFNlbmRpbmcgJHtsZW5ndGhUb1NlbmR9IGNsZWFyIGNoYXJhY3RlcnMgdG8gZGV2aWNlYCk7XHJcbiAgICAgIGF3YWl0IHRoaXMuYWRiLmNsZWFyVGV4dEZpZWxkKGxlbmd0aFRvU2VuZCk7XHJcbiAgICAgIHJlbWFpbmluZ0xlbmd0aCAtPSBsZW5ndGhUb1NlbmQ7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb21tYW5kcy5jbGljayA9IGFzeW5jIGZ1bmN0aW9uIChlbGVtZW50SWQpIHtcclxuICByZXR1cm4gYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbihcImVsZW1lbnQ6Y2xpY2tcIiwge2VsZW1lbnRJZH0pO1xyXG59O1xyXG5cclxuY29tbWFuZHMuZ2V0TG9jYXRpb24gPSBhc3luYyBmdW5jdGlvbiAoZWxlbWVudElkKSB7XHJcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJlbGVtZW50OmdldExvY2F0aW9uXCIsIHtlbGVtZW50SWR9KTtcclxufTtcclxuXHJcbmNvbW1hbmRzLmdldExvY2F0aW9uSW5WaWV3ID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnRJZCkge1xyXG4gIHJldHVybiBhd2FpdCB0aGlzLmdldExvY2F0aW9uKGVsZW1lbnRJZCk7XHJcbn07XHJcblxyXG5jb21tYW5kcy5nZXRTaXplID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnRJZCkge1xyXG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiZWxlbWVudDpnZXRTaXplXCIsIHtlbGVtZW50SWR9KTtcclxufTtcclxuXHJcbmNvbW1hbmRzLnRvdWNoTG9uZ0NsaWNrID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnRJZCwgeCwgeSwgZHVyYXRpb24pIHtcclxuICBsZXQgcGFyYW1zID0ge2VsZW1lbnRJZCwgeCwgeSwgZHVyYXRpb259O1xyXG4gIGFuZHJvaWRIZWxwZXJzLnJlbW92ZU51bGxQcm9wZXJ0aWVzKHBhcmFtcyk7XHJcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJlbGVtZW50OnRvdWNoTG9uZ0NsaWNrXCIsIHBhcmFtcyk7XHJcbn07XHJcblxyXG5jb21tYW5kcy50b3VjaERvd24gPSBhc3luYyBmdW5jdGlvbiAoZWxlbWVudElkLCB4LCB5KSB7XHJcbiAgbGV0IHBhcmFtcyA9IHtlbGVtZW50SWQsIHgsIHl9O1xyXG4gIGFuZHJvaWRIZWxwZXJzLnJlbW92ZU51bGxQcm9wZXJ0aWVzKHBhcmFtcyk7XHJcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJlbGVtZW50OnRvdWNoRG93blwiLCBwYXJhbXMpO1xyXG59O1xyXG5cclxuY29tbWFuZHMudG91Y2hVcCA9IGFzeW5jIGZ1bmN0aW9uIChlbGVtZW50SWQsIHgsIHkpIHtcclxuICBsZXQgcGFyYW1zID0ge2VsZW1lbnRJZCwgeCwgeX07XHJcbiAgYW5kcm9pZEhlbHBlcnMucmVtb3ZlTnVsbFByb3BlcnRpZXMocGFyYW1zKTtcclxuICByZXR1cm4gYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbihcImVsZW1lbnQ6dG91Y2hVcFwiLCBwYXJhbXMpO1xyXG59O1xyXG5cclxuY29tbWFuZHMudG91Y2hNb3ZlID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnRJZCwgeCwgeSkge1xyXG4gIGxldCBwYXJhbXMgPSB7ZWxlbWVudElkLCB4LCB5fTtcclxuICBhbmRyb2lkSGVscGVycy5yZW1vdmVOdWxsUHJvcGVydGllcyhwYXJhbXMpO1xyXG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiZWxlbWVudDp0b3VjaE1vdmVcIiwgcGFyYW1zKTtcclxufTtcclxuXHJcbmNvbW1hbmRzLmNvbXBsZXhUYXAgPSBhc3luYyBmdW5jdGlvbiAodGFwQ291bnQsIHRvdWNoQ291bnQsIGR1cmF0aW9uLCB4LCB5KSB7XHJcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJjbGlja1wiLCB7eCwgeX0pO1xyXG59O1xyXG5cclxuY29tbWFuZHMudGFwID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnRJZCwgeCA9IDAsIHkgPSAwLCBjb3VudCA9IDEpIHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgIGlmIChlbGVtZW50SWQpIHtcclxuICAgICAgLy8gd2UgYXJlIGVpdGhlciB0YXBwaW5nIG9uIHRoZSBkZWZhdWx0IGxvY2F0aW9uIG9mIHRoZSBlbGVtZW50XHJcbiAgICAgIC8vIG9yIGFuIG9mZnNldCBmcm9tIHRoZSB0b3AgbGVmdCBjb3JuZXJcclxuICAgICAgaWYgKHggIT09IDAgfHwgeSAhPT0gMCkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJlbGVtZW50OmNsaWNrXCIsIHtlbGVtZW50SWQsIHgsIHl9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiZWxlbWVudDpjbGlja1wiLCB7ZWxlbWVudElkfSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJjbGlja1wiLCB7eCwgeX0pO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbk9iamVjdC5hc3NpZ24oZXh0ZW5zaW9ucywgY29tbWFuZHMsIGhlbHBlcnMpO1xyXG5leHBvcnQgeyBjb21tYW5kcywgaGVscGVycyB9O1xyXG5leHBvcnQgZGVmYXVsdCBleHRlbnNpb25zO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi4ifQ==
