'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this2 = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _asyncbox = require('asyncbox');

var _2 = require('../../../..');

var _3 = _interopRequireDefault(_2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _desired = require('../../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var BUTTON_CLASS = 'android.widget.Button';
var EDITTEXT_CLASS = 'android.widget.EditText';
var TEXTVIEW_CLASS = 'android.widget.TextView';

var PACKAGE = 'io.appium.android.apis';
var TEXTFIELD_ACTIVITY = '.view.TextFields';
var KEYEVENT_ACTIVITY = '.text.KeyEventText';

var defaultAsciiCaps = _lodash2['default'].defaults({
  newCommandTimeout: 90,
  appPackage: PACKAGE,
  appActivity: TEXTFIELD_ACTIVITY
}, _desired2['default']);

var defaultUnicodeCaps = _lodash2['default'].defaults({
  unicodeKeyboard: true,
  resetKeyboard: true
}, defaultAsciiCaps);

function deSamsungify(text) {
  // For samsung S5 text is appended with ". Editing."
  return text.replace(". Editing.", "");
}

function getElement(driver, className) {
  return _regeneratorRuntime.async(function getElement$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(10, 1000, function callee$1$0() {
          var el;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.t0 = _lodash2['default'];
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(driver.findElOrEls('class name', className, true));

              case 3:
                context$2$0.t1 = context$2$0.sent;
                el = context$2$0.t0.last.call(context$2$0.t0, context$2$0.t1);
                return context$2$0.abrupt('return', el.ELEMENT);

              case 6:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function runTextEditTest(driver, testText) {
  var keys = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
  var el, text;
  return _regeneratorRuntime.async(function runTextEditTest$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(getElement(driver, EDITTEXT_CLASS));

      case 2:
        el = context$1$0.sent;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(driver.clear(el));

      case 5:
        if (!keys) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(driver.keys([testText]));

      case 8:
        context$1$0.next = 12;
        break;

      case 10:
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(driver.setValue(testText, el));

      case 12:
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(driver.getText(el));

      case 14:
        text = context$1$0.sent;

        deSamsungify(text).should.be.equal(testText);

        return context$1$0.abrupt('return', el);

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

/*
 * The key event page needs to be cleared between runs, or else we get false
 * positives from previously run tests. The page has a single button that
 * removes all text from within the main TextView.
 */
function clearKeyEvents(driver) {
  var el;
  return _regeneratorRuntime.async(function clearKeyEvents$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(getElement(driver, BUTTON_CLASS));

      case 2:
        el = context$1$0.sent;

        driver.click(el);

        // wait a moment for the clearing to occur, lest we too quickly try to enter more text
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(_bluebird2['default'].delay(500));

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function runCombinationKeyEventTest(driver) {
  var runTest, text;
  return _regeneratorRuntime.async(function runCombinationKeyEventTest$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        runTest = function runTest() {
          var el;
          return _regeneratorRuntime.async(function runTest$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(driver.pressKeyCode(29, 193));

              case 2:
                context$2$0.next = 4;
                return _regeneratorRuntime.awrap(getElement(driver, TEXTVIEW_CLASS));

              case 4:
                el = context$2$0.sent;
                context$2$0.next = 7;
                return _regeneratorRuntime.awrap(driver.getText(el));

              case 7:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 8:
              case 'end':
                return context$2$0.stop();
            }
          }, null, this);
        };

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(clearKeyEvents(driver));

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(runTest());

      case 5:
        text = context$1$0.sent;

        if (!(text === '')) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(runTest());

      case 9:
        text = context$1$0.sent;

      case 10:
        text.should.include('keyCode=KEYCODE_A');
        text.should.include('metaState=META_SHIFT_ON');

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function runKeyEventTest(driver) {
  var runTest, text;
  return _regeneratorRuntime.async(function runKeyEventTest$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        runTest = function runTest() {
          var el;
          return _regeneratorRuntime.async(function runTest$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(driver.pressKeyCode(82));

              case 2:
                context$2$0.next = 4;
                return _regeneratorRuntime.awrap(getElement(driver, TEXTVIEW_CLASS));

              case 4:
                el = context$2$0.sent;
                context$2$0.next = 7;
                return _regeneratorRuntime.awrap(driver.getText(el));

              case 7:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 8:
              case 'end':
                return context$2$0.stop();
            }
          }, null, this);
        };

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(clearKeyEvents(driver));

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(runTest());

      case 5:
        text = context$1$0.sent;

        if (!(text === '')) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(runTest());

      case 9:
        text = context$1$0.sent;

      case 10:
        text.should.include('[keycode=82]');
        text.should.include('keyCode=KEYCODE_MENU');

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

var tests = [{ label: 'editing a text field', text: 'Life, the Universe and Everything.' }, { label: 'sending \'&-\'', text: '&-' }, { label: 'sending \'&\' and \'-\' in other text', text: 'In the mid-1990s he ate fish & chips as mayor-elect.' }, { label: 'sending \'-\' in text', text: 'Super-test.' }, { label: 'sending numbers', text: '0123456789' }];

var unicodeTests = [{ label: 'should be able to send \'-\' in unicode text', text: 'परीक्षा-परीक्षण' }, { label: 'should be able to send \'&\' in text', text: 'Fish & chips' }, { label: 'should be able to send \'&\' in unicode text', text: 'Mīna & chips' }, { label: 'should be able to send roman characters with diacritics', text: 'Áé Œ ù ḍ' }, { label: 'should be able to send a \'u\' with an umlaut', text: 'ü' }];

var languageTests = [{ label: 'should be able to send Tamil', text: 'சோதனை' }, { label: 'should be able to send Chinese', text: '测试' }, { label: 'should be able to send Arabic', text: 'تجريب' }, { label: 'should be able to send Hebrew', text: 'בדיקות' }];

describe('keyboard', function () {
  describe('ascii', function () {
    var driver = undefined;
    before(function callee$2$0() {
      var engines, selectedEngine, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, engine;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _3['default']();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(defaultAsciiCaps));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.availableIMEEngines());

          case 5:
            engines = context$3$0.sent;
            selectedEngine = _lodash2['default'].head(engines);
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            context$3$0.prev = 10;

            for (_iterator = _getIterator(engines); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              engine = _step.value;

              // it seems that the latin ime has `android.inputmethod` in its package name
              if (engine.indexOf('android.inputmethod') !== -1) {
                selectedEngine = engine;
              }
            }
            context$3$0.next = 18;
            break;

          case 14:
            context$3$0.prev = 14;
            context$3$0.t0 = context$3$0['catch'](10);
            _didIteratorError = true;
            _iteratorError = context$3$0.t0;

          case 18:
            context$3$0.prev = 18;
            context$3$0.prev = 19;

            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }

          case 21:
            context$3$0.prev = 21;

            if (!_didIteratorError) {
              context$3$0.next = 24;
              break;
            }

            throw _iteratorError;

          case 24:
            return context$3$0.finish(21);

          case 25:
            return context$3$0.finish(18);

          case 26:
            context$3$0.next = 28;
            return _regeneratorRuntime.awrap(driver.activateIMEEngine(selectedEngine));

          case 28:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2, [[10, 14, 18, 26], [19,, 21, 25]]);
    });
    after(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });

    describe('editing a text field', function () {
      before(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.startActivity(PACKAGE, TEXTFIELD_ACTIVITY));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this2);
      });

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        var _loop = function () {
          var test = _step2.value;

          describe(test.label, function () {
            it('should work with setValue: \'' + test.text + '\'', function callee$5$0() {
              return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
                while (1) switch (context$6$0.prev = context$6$0.next) {
                  case 0:
                    context$6$0.next = 2;
                    return _regeneratorRuntime.awrap(runTextEditTest(driver, test.text));

                  case 2:
                  case 'end':
                    return context$6$0.stop();
                }
              }, null, _this2);
            });
            it('should work with keys: \'' + test.text + '\'', function callee$5$0() {
              return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
                while (1) switch (context$6$0.prev = context$6$0.next) {
                  case 0:
                    context$6$0.next = 2;
                    return _regeneratorRuntime.awrap(runTextEditTest(driver, test.text, true));

                  case 2:
                  case 'end':
                    return context$6$0.stop();
                }
              }, null, _this2);
            });
          });
        };

        for (var _iterator2 = _getIterator(tests), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      it('should be able to clear a password field', function callee$3$0() {
        var els, el, textEl, text;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.findElOrEls('class name', EDITTEXT_CLASS, true));

            case 2:
              els = context$4$0.sent;
              el = els[1].ELEMENT;
              context$4$0.next = 6;
              return _regeneratorRuntime.awrap(driver.setValue('super-duper password', el));

            case 6:
              context$4$0.next = 8;
              return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'edit1Text', false));

            case 8:
              textEl = context$4$0.sent;
              context$4$0.next = 11;
              return _regeneratorRuntime.awrap(driver.getText(textEl.ELEMENT));

            case 11:
              text = context$4$0.sent;

              text.should.eql('super-duper password');

              context$4$0.next = 15;
              return _regeneratorRuntime.awrap(driver.clear(el));

            case 15:
              context$4$0.next = 17;
              return _regeneratorRuntime.awrap(driver.getText(textEl.ELEMENT));

            case 17:
              text = context$4$0.sent;

              text.should.eql('');

            case 19:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });

    describe('sending a key event', function () {
      before(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.startActivity(PACKAGE, KEYEVENT_ACTIVITY));

            case 2:
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(_bluebird2['default'].delay(500));

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this2);
      });

      it('should be able to send combination keyevents', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(runCombinationKeyEventTest(driver));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this2);
      });
      it('should be able to send keyevents', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(runKeyEventTest(driver));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this2);
      });
    });
  });

  describe('unicode', function () {
    var driver = undefined;
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _3['default']();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(defaultUnicodeCaps));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    after(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });

    describe('editing a text field', function () {
      before(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.startActivity(PACKAGE, TEXTFIELD_ACTIVITY));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this2);
      });

      var _arr = [tests, unicodeTests, languageTests];
      for (var _i = 0; _i < _arr.length; _i++) {
        var testSet = _arr[_i];var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          var _loop2 = function () {
            var test = _step3.value;

            describe(test.label, function () {
              it('should work with setValue: \'' + test.text + '\'', function callee$5$0() {
                return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
                  while (1) switch (context$6$0.prev = context$6$0.next) {
                    case 0:
                      context$6$0.next = 2;
                      return _regeneratorRuntime.awrap(runTextEditTest(driver, test.text));

                    case 2:
                    case 'end':
                      return context$6$0.stop();
                  }
                }, null, _this2);
              });
              it('should work with keys: \'' + test.text + '\'', function callee$5$0() {
                return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
                  while (1) switch (context$6$0.prev = context$6$0.next) {
                    case 0:
                      context$6$0.next = 2;
                      return _regeneratorRuntime.awrap(runTextEditTest(driver, test.text, true));

                    case 2:
                    case 'end':
                      return context$6$0.stop();
                  }
                }, null, _this2);
              });
            });
          };

          for (var _iterator3 = _getIterator(testSet), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            _loop2();
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3['return']) {
              _iterator3['return']();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    });

    describe('sending a key event', function () {
      before(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.startActivity(PACKAGE, KEYEVENT_ACTIVITY));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this2);
      });

      it('should be able to send combination keyevents', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(runCombinationKeyEventTest(driver));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this2);
      });
      it('should be able to send keyevents', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(runKeyEventTest(driver));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this2);
      });
    });
  });
});

// the test is flakey... try again

// the test is flakey... try again

// sometimes the default ime is not what we are using

// the text is printed into a text field, so we can retrieve and assert
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9rZXlib2FyZC9rZXlib2FyZC1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7c0JBQy9CLFFBQVE7Ozs7d0JBQ1EsVUFBVTs7aUJBQ2QsYUFBYTs7Ozt3QkFDekIsVUFBVTs7Ozt1QkFDQyxlQUFlOzs7O0FBR3hDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBTSxZQUFZLEdBQUcsdUJBQXVCLENBQUM7QUFDN0MsSUFBTSxjQUFjLEdBQUcseUJBQXlCLENBQUM7QUFDakQsSUFBTSxjQUFjLEdBQUcseUJBQXlCLENBQUM7O0FBRWpELElBQU0sT0FBTyxHQUFHLHdCQUF3QixDQUFDO0FBQ3pDLElBQU0sa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7QUFDOUMsSUFBTSxpQkFBaUIsR0FBRyxvQkFBb0IsQ0FBQzs7QUFFL0MsSUFBSSxnQkFBZ0IsR0FBRyxvQkFBRSxRQUFRLENBQUM7QUFDaEMsbUJBQWlCLEVBQUUsRUFBRTtBQUNyQixZQUFVLEVBQUUsT0FBTztBQUNuQixhQUFXLEVBQUUsa0JBQWtCO0NBQ2hDLHVCQUFlLENBQUM7O0FBRWpCLElBQUksa0JBQWtCLEdBQUcsb0JBQUUsUUFBUSxDQUFDO0FBQ2xDLGlCQUFlLEVBQUUsSUFBSTtBQUNyQixlQUFhLEVBQUUsSUFBSTtDQUNwQixFQUFFLGdCQUFnQixDQUFDLENBQUM7O0FBRXJCLFNBQVMsWUFBWSxDQUFFLElBQUksRUFBRTs7QUFFM0IsU0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztDQUN2Qzs7QUFFRCxTQUFlLFVBQVUsQ0FBRSxNQUFNLEVBQUUsU0FBUzs7Ozs7Ozt5Q0FDN0IsNkJBQWMsRUFBRSxFQUFFLElBQUksRUFBRTtjQUMvQixFQUFFOzs7Ozs7aURB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OztBQUVILFlBQVEsQ0FBQyxxQkFBcUIsRUFBRSxZQUFNO0FBQ3BDLFlBQU0sQ0FBQzs7Ozs7K0NBQ0MsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUM7Ozs7Ozs7T0FDdkQsQ0FBQyxDQUFDOztBQUVILFFBQUUsQ0FBQyw4Q0FBOEMsRUFBRTs7Ozs7K0NBQzNDLDBCQUEwQixDQUFDLE1BQU0sQ0FBQzs7Ozs7OztPQUN6QyxDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMsa0NBQWtDLEVBQUU7Ozs7OytDQUMvQixlQUFlLENBQUMsTUFBTSxDQUFDOzs7Ozs7O09BQzlCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMva2V5Ym9hcmQva2V5Ym9hcmQtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XHJcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgcmV0cnlJbnRlcnZhbCB9IGZyb20gJ2FzeW5jYm94JztcclxuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4vLi4nO1xyXG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XHJcbmltcG9ydCBERUZBVUxUX0NBUFMgZnJvbSAnLi4vLi4vZGVzaXJlZCc7XHJcblxyXG5cclxuY2hhaS5zaG91bGQoKTtcclxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xyXG5cclxuY29uc3QgQlVUVE9OX0NMQVNTID0gJ2FuZHJvaWQud2lkZ2V0LkJ1dHRvbic7XHJcbmNvbnN0IEVESVRURVhUX0NMQVNTID0gJ2FuZHJvaWQud2lkZ2V0LkVkaXRUZXh0JztcclxuY29uc3QgVEVYVFZJRVdfQ0xBU1MgPSAnYW5kcm9pZC53aWRnZXQuVGV4dFZpZXcnO1xyXG5cclxuY29uc3QgUEFDS0FHRSA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJztcclxuY29uc3QgVEVYVEZJRUxEX0FDVElWSVRZID0gJy52aWV3LlRleHRGaWVsZHMnO1xyXG5jb25zdCBLRVlFVkVOVF9BQ1RJVklUWSA9ICcudGV4dC5LZXlFdmVudFRleHQnO1xyXG5cclxubGV0IGRlZmF1bHRBc2NpaUNhcHMgPSBfLmRlZmF1bHRzKHtcclxuICBuZXdDb21tYW5kVGltZW91dDogOTAsXHJcbiAgYXBwUGFja2FnZTogUEFDS0FHRSxcclxuICBhcHBBY3Rpdml0eTogVEVYVEZJRUxEX0FDVElWSVRZLFxyXG59LCBERUZBVUxUX0NBUFMpO1xyXG5cclxubGV0IGRlZmF1bHRVbmljb2RlQ2FwcyA9IF8uZGVmYXVsdHMoe1xyXG4gIHVuaWNvZGVLZXlib2FyZDogdHJ1ZSxcclxuICByZXNldEtleWJvYXJkOiB0cnVlXHJcbn0sIGRlZmF1bHRBc2NpaUNhcHMpO1xyXG5cclxuZnVuY3Rpb24gZGVTYW1zdW5naWZ5ICh0ZXh0KSB7XHJcbiAgLy8gRm9yIHNhbXN1bmcgUzUgdGV4dCBpcyBhcHBlbmRlZCB3aXRoIFwiLiBFZGl0aW5nLlwiXHJcbiAgcmV0dXJuIHRleHQucmVwbGFjZShcIi4gRWRpdGluZy5cIiwgXCJcIik7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldEVsZW1lbnQgKGRyaXZlciwgY2xhc3NOYW1lKSB7XHJcbiAgcmV0dXJuIGF3YWl0IHJldHJ5SW50ZXJ2YWwoMTAsIDEwMDAsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCBlbCA9IF8ubGFzdChhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2NsYXNzIG5hbWUnLCBjbGFzc05hbWUsIHRydWUpKTtcclxuICAgIHJldHVybiBlbC5FTEVNRU5UO1xyXG4gIH0pO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBydW5UZXh0RWRpdFRlc3QgKGRyaXZlciwgdGVzdFRleHQsIGtleXMgPSBmYWxzZSkge1xyXG4gIGxldCBlbCA9IGF3YWl0IGdldEVsZW1lbnQoZHJpdmVyLCBFRElUVEVYVF9DTEFTUyk7XHJcbiAgYXdhaXQgZHJpdmVyLmNsZWFyKGVsKTtcclxuXHJcbiAgaWYgKGtleXMpIHtcclxuICAgIGF3YWl0IGRyaXZlci5rZXlzKFt0ZXN0VGV4dF0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhd2FpdCBkcml2ZXIuc2V0VmFsdWUodGVzdFRleHQsIGVsKTtcclxuICB9XHJcblxyXG4gIGxldCB0ZXh0ID0gYXdhaXQgZHJpdmVyLmdldFRleHQoZWwpO1xyXG4gIGRlU2Ftc3VuZ2lmeSh0ZXh0KS5zaG91bGQuYmUuZXF1YWwodGVzdFRleHQpO1xyXG5cclxuICByZXR1cm4gZWw7XHJcbn1cclxuXHJcbi8qXHJcbiAqIFRoZSBrZXkgZXZlbnQgcGFnZSBuZWVkcyB0byBiZSBjbGVhcmVkIGJldHdlZW4gcnVucywgb3IgZWxzZSB3ZSBnZXQgZmFsc2VcclxuICogcG9zaXRpdmVzIGZyb20gcHJldmlvdXNseSBydW4gdGVzdHMuIFRoZSBwYWdlIGhhcyBhIHNpbmdsZSBidXR0b24gdGhhdFxyXG4gKiByZW1vdmVzIGFsbCB0ZXh0IGZyb20gd2l0aGluIHRoZSBtYWluIFRleHRWaWV3LlxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gY2xlYXJLZXlFdmVudHMgKGRyaXZlcikge1xyXG4gIGxldCBlbCA9IGF3YWl0IGdldEVsZW1lbnQoZHJpdmVyLCBCVVRUT05fQ0xBU1MpO1xyXG4gIGRyaXZlci5jbGljayhlbCk7XHJcblxyXG4gIC8vIHdhaXQgYSBtb21lbnQgZm9yIHRoZSBjbGVhcmluZyB0byBvY2N1ciwgbGVzdCB3ZSB0b28gcXVpY2tseSB0cnkgdG8gZW50ZXIgbW9yZSB0ZXh0XHJcbiAgYXdhaXQgQi5kZWxheSg1MDApO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBydW5Db21iaW5hdGlvbktleUV2ZW50VGVzdCAoZHJpdmVyKSB7XHJcbiAgbGV0IHJ1blRlc3QgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICBhd2FpdCBkcml2ZXIucHJlc3NLZXlDb2RlKDI5LCAxOTMpO1xyXG4gICAgbGV0IGVsID0gYXdhaXQgZ2V0RWxlbWVudChkcml2ZXIsIFRFWFRWSUVXX0NMQVNTKTtcclxuICAgIHJldHVybiBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbCk7XHJcbiAgfTtcclxuXHJcbiAgYXdhaXQgY2xlYXJLZXlFdmVudHMoZHJpdmVyKTtcclxuXHJcbiAgbGV0IHRleHQgPSBhd2FpdCBydW5UZXN0KCk7XHJcbiAgaWYgKHRleHQgPT09ICcnKSB7XHJcbiAgICAvLyB0aGUgdGVzdCBpcyBmbGFrZXkuLi4gdHJ5IGFnYWluXHJcbiAgICB0ZXh0ID0gYXdhaXQgcnVuVGVzdCgpO1xyXG4gIH1cclxuICB0ZXh0LnNob3VsZC5pbmNsdWRlKCdrZXlDb2RlPUtFWUNPREVfQScpO1xyXG4gIHRleHQuc2hvdWxkLmluY2x1ZGUoJ21ldGFTdGF0ZT1NRVRBX1NISUZUX09OJyk7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHJ1bktleUV2ZW50VGVzdCAoZHJpdmVyKSB7XHJcbiAgbGV0IHJ1blRlc3QgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICBhd2FpdCBkcml2ZXIucHJlc3NLZXlDb2RlKDgyKTtcclxuICAgIGxldCBlbCA9IGF3YWl0IGdldEVsZW1lbnQoZHJpdmVyLCBURVhUVklFV19DTEFTUyk7XHJcbiAgICByZXR1cm4gYXdhaXQgZHJpdmVyLmdldFRleHQoZWwpO1xyXG4gIH07XHJcblxyXG4gIGF3YWl0IGNsZWFyS2V5RXZlbnRzKGRyaXZlcik7XHJcblxyXG4gIGxldCB0ZXh0ID0gYXdhaXQgcnVuVGVzdCgpO1xyXG4gIGlmICh0ZXh0ID09PSAnJykge1xyXG4gICAgLy8gdGhlIHRlc3QgaXMgZmxha2V5Li4uIHRyeSBhZ2FpblxyXG4gICAgdGV4dCA9IGF3YWl0IHJ1blRlc3QoKTtcclxuICB9XHJcbiAgdGV4dC5zaG91bGQuaW5jbHVkZSgnW2tleWNvZGU9ODJdJyk7XHJcbiAgdGV4dC5zaG91bGQuaW5jbHVkZSgna2V5Q29kZT1LRVlDT0RFX01FTlUnKTtcclxufVxyXG5cclxubGV0IHRlc3RzID0gW1xyXG4gIHtsYWJlbDogJ2VkaXRpbmcgYSB0ZXh0IGZpZWxkJywgdGV4dDogJ0xpZmUsIHRoZSBVbml2ZXJzZSBhbmQgRXZlcnl0aGluZy4nfSxcclxuICB7bGFiZWw6ICdzZW5kaW5nIFxcJyYtXFwnJywgdGV4dDogJyYtJ30sXHJcbiAge2xhYmVsOiAnc2VuZGluZyBcXCcmXFwnIGFuZCBcXCctXFwnIGluIG90aGVyIHRleHQnLCB0ZXh0OiAnSW4gdGhlIG1pZC0xOTkwcyBoZSBhdGUgZmlzaCAmIGNoaXBzIGFzIG1heW9yLWVsZWN0Lid9LFxyXG4gIHtsYWJlbDogJ3NlbmRpbmcgXFwnLVxcJyBpbiB0ZXh0JywgdGV4dDogJ1N1cGVyLXRlc3QuJ30sXHJcbiAge2xhYmVsOiAnc2VuZGluZyBudW1iZXJzJywgdGV4dDogJzAxMjM0NTY3ODknfSxcclxuXTtcclxuXHJcbmxldCB1bmljb2RlVGVzdHMgPSBbXHJcbiAge2xhYmVsOiAnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBcXCctXFwnIGluIHVuaWNvZGUgdGV4dCcsIHRleHQ6ICfgpKrgpLDgpYDgpJXgpY3gpLfgpL4t4KSq4KSw4KWA4KSV4KWN4KS34KSjJ30sXHJcbiAge2xhYmVsOiAnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBcXCcmXFwnIGluIHRleHQnLCB0ZXh0OiAnRmlzaCAmIGNoaXBzJ30sXHJcbiAge2xhYmVsOiAnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBcXCcmXFwnIGluIHVuaWNvZGUgdGV4dCcsIHRleHQ6ICdNxKtuYSAmIGNoaXBzJ30sXHJcbiAge2xhYmVsOiAnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCByb21hbiBjaGFyYWN0ZXJzIHdpdGggZGlhY3JpdGljcycsIHRleHQ6ICfDgcOpIMWSIMO5IOG4jSd9LFxyXG4gIHtsYWJlbDogJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgYSBcXCd1XFwnIHdpdGggYW4gdW1sYXV0JywgdGV4dDogJ8O8J30sXHJcbl07XHJcblxyXG5sZXQgbGFuZ3VhZ2VUZXN0cyA9IFtcclxuICB7bGFiZWw6ICdzaG91bGQgYmUgYWJsZSB0byBzZW5kIFRhbWlsJywgdGV4dDogJ+CumuCvh+CuvuCupOCuqeCviCd9LFxyXG4gIHtsYWJlbDogJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgQ2hpbmVzZScsIHRleHQ6ICfmtYvor5UnfSxcclxuICB7bGFiZWw6ICdzaG91bGQgYmUgYWJsZSB0byBzZW5kIEFyYWJpYycsIHRleHQ6ICfYqtis2LHZitioJ30sXHJcbiAge2xhYmVsOiAnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBIZWJyZXcnLCB0ZXh0OiAn15HXk9eZ16fXldeqJ30sXHJcbl07XHJcblxyXG5kZXNjcmliZSgna2V5Ym9hcmQnLCAoKSA9PiB7XHJcbiAgZGVzY3JpYmUoJ2FzY2lpJywgKCkgPT4ge1xyXG4gICAgbGV0IGRyaXZlcjtcclxuICAgIGJlZm9yZShhc3luYyAoKSA9PiB7XHJcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGRlZmF1bHRBc2NpaUNhcHMpO1xyXG5cclxuICAgICAgLy8gc29tZXRpbWVzIHRoZSBkZWZhdWx0IGltZSBpcyBub3Qgd2hhdCB3ZSBhcmUgdXNpbmdcclxuICAgICAgbGV0IGVuZ2luZXMgPSBhd2FpdCBkcml2ZXIuYXZhaWxhYmxlSU1FRW5naW5lcygpO1xyXG4gICAgICBsZXQgc2VsZWN0ZWRFbmdpbmUgPSBfLmhlYWQoZW5naW5lcyk7XHJcbiAgICAgIGZvciAobGV0IGVuZ2luZSBvZiBlbmdpbmVzKSB7XHJcbiAgICAgICAgLy8gaXQgc2VlbXMgdGhhdCB0aGUgbGF0aW4gaW1lIGhhcyBgYW5kcm9pZC5pbnB1dG1ldGhvZGAgaW4gaXRzIHBhY2thZ2UgbmFtZVxyXG4gICAgICAgIGlmIChlbmdpbmUuaW5kZXhPZignYW5kcm9pZC5pbnB1dG1ldGhvZCcpICE9PSAtMSkge1xyXG4gICAgICAgICAgc2VsZWN0ZWRFbmdpbmUgPSBlbmdpbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGF3YWl0IGRyaXZlci5hY3RpdmF0ZUlNRUVuZ2luZShzZWxlY3RlZEVuZ2luZSk7XHJcbiAgICB9KTtcclxuICAgIGFmdGVyKGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdlZGl0aW5nIGEgdGV4dCBmaWVsZCcsICgpID0+IHtcclxuICAgICAgYmVmb3JlKGFzeW5jICgpID0+IHtcclxuICAgICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBY3Rpdml0eShQQUNLQUdFLCBURVhURklFTERfQUNUSVZJVFkpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGZvciAobGV0IHRlc3Qgb2YgdGVzdHMpIHtcclxuICAgICAgICBkZXNjcmliZSh0ZXN0LmxhYmVsLCAoKSA9PiB7XHJcbiAgICAgICAgICBpdChgc2hvdWxkIHdvcmsgd2l0aCBzZXRWYWx1ZTogJyR7dGVzdC50ZXh0fSdgLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIGF3YWl0IHJ1blRleHRFZGl0VGVzdChkcml2ZXIsIHRlc3QudGV4dCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGl0KGBzaG91bGQgd29yayB3aXRoIGtleXM6ICcke3Rlc3QudGV4dH0nYCwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICBhd2FpdCBydW5UZXh0RWRpdFRlc3QoZHJpdmVyLCB0ZXN0LnRleHQsIHRydWUpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBjbGVhciBhIHBhc3N3b3JkIGZpZWxkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBlbHMgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2NsYXNzIG5hbWUnLCBFRElUVEVYVF9DTEFTUywgdHJ1ZSk7XHJcbiAgICAgICAgbGV0IGVsID0gZWxzWzFdLkVMRU1FTlQ7XHJcblxyXG4gICAgICAgIGF3YWl0IGRyaXZlci5zZXRWYWx1ZSgnc3VwZXItZHVwZXIgcGFzc3dvcmQnLCBlbCk7XHJcblxyXG4gICAgICAgIC8vIHRoZSB0ZXh0IGlzIHByaW50ZWQgaW50byBhIHRleHQgZmllbGQsIHNvIHdlIGNhbiByZXRyaWV2ZSBhbmQgYXNzZXJ0XHJcbiAgICAgICAgbGV0IHRleHRFbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnaWQnLCAnZWRpdDFUZXh0JywgZmFsc2UpO1xyXG4gICAgICAgIGxldCB0ZXh0ID0gYXdhaXQgZHJpdmVyLmdldFRleHQodGV4dEVsLkVMRU1FTlQpO1xyXG4gICAgICAgIHRleHQuc2hvdWxkLmVxbCgnc3VwZXItZHVwZXIgcGFzc3dvcmQnKTtcclxuXHJcbiAgICAgICAgYXdhaXQgZHJpdmVyLmNsZWFyKGVsKTtcclxuXHJcbiAgICAgICAgdGV4dCA9IGF3YWl0IGRyaXZlci5nZXRUZXh0KHRleHRFbC5FTEVNRU5UKTtcclxuICAgICAgICB0ZXh0LnNob3VsZC5lcWwoJycpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzZW5kaW5nIGEga2V5IGV2ZW50JywgKCkgPT4ge1xyXG4gICAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFjdGl2aXR5KFBBQ0tBR0UsIEtFWUVWRU5UX0FDVElWSVRZKTtcclxuICAgICAgICBhd2FpdCBCLmRlbGF5KDUwMCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgY29tYmluYXRpb24ga2V5ZXZlbnRzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGF3YWl0IHJ1bkNvbWJpbmF0aW9uS2V5RXZlbnRUZXN0KGRyaXZlcik7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBrZXlldmVudHMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgYXdhaXQgcnVuS2V5RXZlbnRUZXN0KGRyaXZlcik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIGRlc2NyaWJlKCd1bmljb2RlJywgKCkgPT4ge1xyXG4gICAgbGV0IGRyaXZlcjtcclxuICAgIGJlZm9yZShhc3luYyAoKSA9PiB7XHJcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGRlZmF1bHRVbmljb2RlQ2Fwcyk7XHJcbiAgICB9KTtcclxuICAgIGFmdGVyKGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdlZGl0aW5nIGEgdGV4dCBmaWVsZCcsICgpID0+IHtcclxuICAgICAgYmVmb3JlKGFzeW5jICgpID0+IHtcclxuICAgICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBY3Rpdml0eShQQUNLQUdFLCBURVhURklFTERfQUNUSVZJVFkpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGZvciAobGV0IHRlc3RTZXQgb2YgW3Rlc3RzLCB1bmljb2RlVGVzdHMsIGxhbmd1YWdlVGVzdHNdKSB7XHJcbiAgICAgICAgZm9yIChsZXQgdGVzdCBvZiB0ZXN0U2V0KSB7XHJcbiAgICAgICAgICBkZXNjcmliZSh0ZXN0LmxhYmVsLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0KGBzaG91bGQgd29yayB3aXRoIHNldFZhbHVlOiAnJHt0ZXN0LnRleHR9J2AsIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICBhd2FpdCBydW5UZXh0RWRpdFRlc3QoZHJpdmVyLCB0ZXN0LnRleHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaXQoYHNob3VsZCB3b3JrIHdpdGgga2V5czogJyR7dGVzdC50ZXh0fSdgLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgYXdhaXQgcnVuVGV4dEVkaXRUZXN0KGRyaXZlciwgdGVzdC50ZXh0LCB0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzZW5kaW5nIGEga2V5IGV2ZW50JywgKCkgPT4ge1xyXG4gICAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFjdGl2aXR5KFBBQ0tBR0UsIEtFWUVWRU5UX0FDVElWSVRZKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBjb21iaW5hdGlvbiBrZXlldmVudHMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgYXdhaXQgcnVuQ29tYmluYXRpb25LZXlFdmVudFRlc3QoZHJpdmVyKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBzZW5kIGtleWV2ZW50cycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBhd2FpdCBydW5LZXlFdmVudFRlc3QoZHJpdmVyKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLlxcLi5cXC4uIn0=
