'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _appiumTestSupport = require('appium-test-support');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _libUnlockHelpers = require('../../lib/unlock-helpers');

var _libUnlockHelpers2 = _interopRequireDefault(_libUnlockHelpers);

var _libDriver = require('../../lib/driver');

var _libDriver2 = _interopRequireDefault(_libDriver);

var _asyncbox = require('asyncbox');

var asyncbox = _interopRequireWildcard(_asyncbox);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var KEYCODE_NUMPAD_ENTER = "66";
var INPUT_KEYS_WAIT_TIME = 100;
var HIDE_KEYBOARD_WAIT_TIME = 100;
var UNLOCK_WAIT_TIME = 100;

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Unlock Helpers', function () {
  var adb = new _appiumAdb2['default']();
  var driver = new _libDriver2['default']();
  var sandbox = _sinon2['default'].sandbox.create();
  var expect = _chai2['default'].expect;
  describe('isValidUnlockType', function () {
    it('should verify the unlock types', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            _libUnlockHelpers2['default'].isValidUnlockType('pin').should.equal(true);
            _libUnlockHelpers2['default'].isValidUnlockType('pattern').should.equal(true);
            _libUnlockHelpers2['default'].isValidUnlockType('password').should.equal(true);
            _libUnlockHelpers2['default'].isValidUnlockType('fingerprint').should.equal(true);
            _libUnlockHelpers2['default'].isValidUnlockType('telepathy').should.equal(false);

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('isValidKey', function () {
    it('should verify the unlock keys for each type', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            _libUnlockHelpers2['default'].isValidKey('pin').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('pin', ' ').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('pin', '1111').should.equal(true);
            _libUnlockHelpers2['default'].isValidKey('pin', '1abc').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('fingerprint').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('fingerprint', ' ').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('fingerprint', '1111').should.equal(true);
            _libUnlockHelpers2['default'].isValidKey('fingerprint', '1abc').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('pattern', '1').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('pattern', '1234').should.equal(true);
            _libUnlockHelpers2['default'].isValidKey('pattern', '123456789').should.equal(true);
            _libUnlockHelpers2['default'].isValidKey('pattern', '01234').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('pattern').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('pattern', ' ').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('pattern', '1abc').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('pattern', '1213').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('password', '121c3').should.equal(true);
            _libUnlockHelpers2['default'].isValidKey('password', 'appium').should.equal(true);
            _libUnlockHelpers2['default'].isValidKey('password', 'appium-android-driver').should.equal(true);
            _libUnlockHelpers2['default'].isValidKey('password', '@#$%&-+()*"\':;!?,_ ./~`|={}\\[]').should.equal(true);
            _libUnlockHelpers2['default'].isValidKey('password', '123').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('password').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('password', '   ').should.equal(false);

          case 23:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw error if unlock type is invalid', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            expect(function () {
              return _libUnlockHelpers2['default'].isValidKey('invalid_unlock_type', '1');
            }).to['throw']('Invalid unlock type');

          case 1:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('dismissKeyguard', (0, _appiumTestSupport.withMocks)({ driver: driver, adb: adb, asyncbox: asyncbox, helpers: _libUnlockHelpers2['default'] }, function (mocks) {
    it('should hide keyboard if keyboard is snown', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.driver.expects('isKeyboardShown').returns(true);
            mocks.driver.expects('hideKeyboard').once();
            mocks.asyncbox.expects('sleep').withExactArgs(HIDE_KEYBOARD_WAIT_TIME).once();
            mocks.adb.expects('shell').once();
            mocks.adb.expects('back').once();
            mocks.adb.expects('getApiLevel').returns(20);
            mocks.helpers.expects('swipeUp').once();
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].dismissKeyguard(driver, adb));

          case 9:
            mocks.driver.verify();
            mocks.asyncbox.verify();
            mocks.helpers.verify();

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should dismiss notifications and dissmiss keyguard via swipping up', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.driver.expects('isKeyboardShown').returns(false);
            mocks.adb.expects('shell').withExactArgs(["service", "call", "notification", "1"]).once();
            mocks.adb.expects('back').once();
            mocks.adb.expects('getApiLevel').returns(21);
            mocks.helpers.expects('swipeUp').withExactArgs(driver).once();
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].dismissKeyguard(driver, adb));

          case 7:
            mocks.driver.verify();
            mocks.adb.verify();
            mocks.helpers.verify();

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should dissmiss keyguard via dismiss-keyguard shell command if API level > 21', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.driver.expects('isKeyboardShown').returns(false);
            mocks.adb.expects('shell').onCall(0).returns('');
            mocks.adb.expects('back').once();
            mocks.adb.expects('getApiLevel').returns(22);
            mocks.adb.expects('shell').withExactArgs(["wm", "dismiss-keyguard"]).once();
            mocks.helpers.expects('swipeUp').never();
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].dismissKeyguard(driver, adb));

          case 8:
            mocks.driver.verify();
            mocks.adb.verify();
            mocks.helpers.verify();

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('swipeUp', (0, _appiumTestSupport.withMocks)({ driver: driver, helpers: _libUnlockHelpers2['default'] }, function (mocks) {
    it('should perform swipe up touch action', function callee$2$0() {
      var windowSize, actions;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            windowSize = { x: 475, y: 800 };
            actions = [{ action: 'press', options: { element: null, x: 237, y: 790 } }, { action: 'moveTo', options: { element: null, x: 237, y: 100 } }, { action: 'release' }];

            mocks.driver.expects('getWindowSize').returns(windowSize);
            mocks.driver.expects('performTouch').withExactArgs(actions).once;
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].swipeUp(driver));

          case 6:
            mocks.driver.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('encodePassword', function () {
    it('should verify the password with blank space is encoded', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            _libUnlockHelpers2['default'].encodePassword('a p p i u m').should.equal("a%sp%sp%si%su%sm");
            _libUnlockHelpers2['default'].encodePassword('   ').should.equal("%s%s%s");

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('stringKeyToArr', function () {
    it('should cast string keys to array', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            _libUnlockHelpers2['default'].stringKeyToArr('1234').should.eql(['1', '2', '3', '4']);
            _libUnlockHelpers2['default'].stringKeyToArr(' 1234 ').should.eql(['1', '2', '3', '4']);
            _libUnlockHelpers2['default'].stringKeyToArr('1 2 3 4').should.eql(['1', '2', '3', '4']);
            _libUnlockHelpers2['default'].stringKeyToArr('1  2  3  4').should.eql(['1', '2', '3', '4']);

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('fingerprintUnlock', (0, _appiumTestSupport.withMocks)({ adb: adb, asyncbox: asyncbox }, function (mocks) {
    it('should be able to unlock device via fingerprint if API level >= 23', function callee$2$0() {
      var caps;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = { unlockKey: '123' };

            mocks.adb.expects('getApiLevel').returns(23);
            mocks.adb.expects('fingerprint').withExactArgs(caps.unlockKey).once();
            mocks.asyncbox.expects('sleep').withExactArgs(UNLOCK_WAIT_TIME).once();
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].fingerprintUnlock(adb, driver, caps).should.be.fulfilled);

          case 6:
            mocks.adb.verify();
            mocks.asyncbox.verify();

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw error if API level < 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApiLevel').returns(22);
            mocks.adb.expects('fingerprint').never();
            mocks.asyncbox.expects('sleep').never();
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].fingerprintUnlock(adb).should.eventually.be.rejectedWith('only works for Android 6+'));

          case 5:
            mocks.adb.verify();
            mocks.asyncbox.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('pinUnlock', (0, _appiumTestSupport.withMocks)({ adb: adb, helpers: _libUnlockHelpers2['default'], driver: driver, asyncbox: asyncbox }, function (mocks) {
    var caps = { unlockKey: '13579' };
    var keys = ['1', '3', '5', '7', '9'];
    var els = [{ ELEMENT: 1 }, { ELEMENT: 2 }, { ELEMENT: 3 }, { ELEMENT: 4 }, { ELEMENT: 5 }, { ELEMENT: 6 }, { ELEMENT: 7 }, { ELEMENT: 8 }, { ELEMENT: 9 }];
    afterEach(function () {
      sandbox.restore();
    });
    it('should be able to unlock device using pin (API level >= 21)', function callee$2$0() {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, e;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.helpers.expects('dismissKeyguard').once();
            mocks.helpers.expects('stringKeyToArr').returns(keys);
            mocks.adb.expects('getApiLevel').returns(21);
            mocks.driver.expects('findElOrEls').withExactArgs("id", "com.android.systemui:id/digit_text", true).returns(els);
            mocks.driver.expects('findElOrEls').withExactArgs("id", "com.android.systemui:id/key_enter", false).returns({ ELEMENT: 100 });
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            context$3$0.prev = 8;
            for (_iterator = _getIterator(els); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              e = _step.value;

              mocks.driver.expects('getAttribute').withExactArgs('text', e.ELEMENT).returns(e.ELEMENT.toString());
            }
            context$3$0.next = 16;
            break;

          case 12:
            context$3$0.prev = 12;
            context$3$0.t0 = context$3$0['catch'](8);
            _didIteratorError = true;
            _iteratorError = context$3$0.t0;

          case 16:
            context$3$0.prev = 16;
            context$3$0.prev = 17;

            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }

          case 19:
            context$3$0.prev = 19;

            if (!_didIteratorError) {
              context$3$0.next = 22;
              break;
            }

            throw _iteratorError;

          case 22:
            return context$3$0.finish(19);

          case 23:
            return context$3$0.finish(16);

          case 24:
            mocks.asyncbox.expects('sleep').withExactArgs(UNLOCK_WAIT_TIME).once();
            sandbox.stub(driver, 'click');

            context$3$0.next = 28;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].pinUnlock(adb, driver, caps));

          case 28:

            driver.click.getCall(0).args[0].should.equal(1);
            driver.click.getCall(1).args[0].should.equal(3);
            driver.click.getCall(2).args[0].should.equal(5);
            driver.click.getCall(3).args[0].should.equal(7);
            driver.click.getCall(4).args[0].should.equal(9);
            driver.click.getCall(5).args[0].should.equal(100);

            mocks.helpers.verify();
            mocks.driver.verify();
            mocks.adb.verify();
            mocks.asyncbox.verify();

          case 38:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this, [[8, 12, 16, 24], [17,, 19, 23]]);
    });
    it('should be able to unlock device using pin (API level < 21)', function callee$2$0() {
      var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, pin;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.helpers.expects('dismissKeyguard').once();
            mocks.helpers.expects('stringKeyToArr').returns(keys);
            mocks.adb.expects('getApiLevel').returns(20);
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            context$3$0.prev = 6;
            for (_iterator2 = _getIterator(keys); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              pin = _step2.value;

              mocks.driver.expects('findElOrEls').withExactArgs("id", 'com.android.keyguard:id/key' + pin, false).returns({ ELEMENT: parseInt(pin, 10) });
            }
            context$3$0.next = 14;
            break;

          case 10:
            context$3$0.prev = 10;
            context$3$0.t0 = context$3$0['catch'](6);
            _didIteratorError2 = true;
            _iteratorError2 = context$3$0.t0;

          case 14:
            context$3$0.prev = 14;
            context$3$0.prev = 15;

            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
              _iterator2['return']();
            }

          case 17:
            context$3$0.prev = 17;

            if (!_didIteratorError2) {
              context$3$0.next = 20;
              break;
            }

            throw _iteratorError2;

          case 20:
            return context$3$0.finish(17);

          case 21:
            return context$3$0.finish(14);

          case 22:
            mocks.driver.expects('findElOrEls').withExactArgs("id", "com.android.keyguard:id/key_enter", false).returns({ ELEMENT: 100 });
            mocks.asyncbox.expects('sleep').withExactArgs(UNLOCK_WAIT_TIME).once();
            sandbox.stub(driver, 'click');

            context$3$0.next = 27;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].pinUnlock(adb, driver, caps));

          case 27:

            driver.click.getCall(0).args[0].should.equal(1);
            driver.click.getCall(1).args[0].should.equal(3);
            driver.click.getCall(2).args[0].should.equal(5);
            driver.click.getCall(3).args[0].should.equal(7);
            driver.click.getCall(4).args[0].should.equal(9);
            driver.click.getCall(5).args[0].should.equal(100);

            mocks.helpers.verify();
            mocks.driver.verify();
            mocks.adb.verify();
            mocks.asyncbox.verify();

          case 37:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this, [[6, 10, 14, 22], [15,, 17, 21]]);
    });
    it('should throw error if pin buttons does not exist (API level >= 21)', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.helpers.expects('dismissKeyguard').once();
            mocks.helpers.expects('stringKeyToArr').once();
            mocks.adb.expects('getApiLevel').returns(21);
            mocks.driver.expects('findElOrEls').returns(null);
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].pinUnlock(adb, driver, caps).should.eventually.be.rejectedWith('Error finding unlock pin buttons!'));

          case 6:
            mocks.helpers.verify();
            mocks.driver.verify();
            mocks.adb.verify();

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw error if pin buttons does not exist (API level < 21)', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.helpers.expects('dismissKeyguard').once();
            mocks.helpers.expects('stringKeyToArr').returns(keys);
            mocks.adb.expects('getApiLevel').returns(20);
            mocks.driver.expects('findElOrEls').withExactArgs('id', 'com.android.keyguard:id/key1', false).returns(null);
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].pinUnlock(adb, driver, caps).should.eventually.be.rejectedWith('Error finding unlock pin \'1\' button!'));

          case 6:
            mocks.helpers.verify();
            mocks.driver.verify();
            mocks.adb.verify();

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('passwordUnlock', (0, _appiumTestSupport.withMocks)({ adb: adb, helpers: _libUnlockHelpers2['default'], asyncbox: asyncbox }, function (mocks) {
    it('should be able to unlock device using password', function callee$2$0() {
      var caps;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = { unlockKey: 'psswrd' };

            mocks.helpers.expects('dismissKeyguard').withExactArgs(driver, adb).once();
            mocks.helpers.expects('encodePassword').withExactArgs(caps.unlockKey).returns(caps.unlockKey);
            mocks.adb.expects('shell').withExactArgs(['input', 'text', caps.unlockKey]).once();
            mocks.asyncbox.expects('sleep').withExactArgs(INPUT_KEYS_WAIT_TIME).once();
            mocks.adb.expects('shell').withExactArgs(['input', 'keyevent', KEYCODE_NUMPAD_ENTER]);
            mocks.asyncbox.expects('sleep').withExactArgs(UNLOCK_WAIT_TIME).once();
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].passwordUnlock(adb, driver, caps));

          case 9:
            mocks.helpers.verify();
            mocks.adb.verify();
            mocks.asyncbox.verify();

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('getPatternKeyPosition', function () {
    it('should verify pattern pin is aproximatelly to its position', function callee$2$0() {
      var pins, cols, rows;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            pins = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (pin) {
              return _libUnlockHelpers2['default'].getPatternKeyPosition(pin, { x: 33, y: 323 }, 137.6);
            });
            cols = [101, 238, 375];
            rows = [391, 528, 665];

            expect(pins[0].x).to.be.within(cols[0] - 5, cols[0] + 5);
            expect(pins[1].x).to.be.within(cols[1] - 5, cols[1] + 5);
            expect(pins[2].x).to.be.within(cols[2] - 5, cols[2] + 5);
            expect(pins[3].x).to.be.within(cols[0] - 5, cols[0] + 5);
            expect(pins[4].x).to.be.within(cols[1] - 5, cols[1] + 5);
            expect(pins[5].x).to.be.within(cols[2] - 5, cols[2] + 5);
            expect(pins[6].x).to.be.within(cols[0] - 5, cols[0] + 5);
            expect(pins[7].x).to.be.within(cols[1] - 5, cols[1] + 5);
            expect(pins[8].x).to.be.within(cols[2] - 5, cols[2] + 5);
            expect(pins[0].y).to.be.within(rows[0] - 5, rows[0] + 5);
            expect(pins[1].y).to.be.within(rows[0] - 5, rows[0] + 5);
            expect(pins[2].y).to.be.within(rows[0] - 5, rows[0] + 5);
            expect(pins[3].y).to.be.within(rows[1] - 5, rows[1] + 5);
            expect(pins[4].y).to.be.within(rows[1] - 5, rows[1] + 5);
            expect(pins[5].y).to.be.within(rows[1] - 5, rows[1] + 5);
            expect(pins[6].y).to.be.within(rows[2] - 5, rows[2] + 5);
            expect(pins[7].y).to.be.within(rows[2] - 5, rows[2] + 5);
            expect(pins[8].y).to.be.within(rows[2] - 5, rows[2] + 5);

          case 21:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('getPatternActions', function () {
    it('should generate press, moveTo, relase gesture scheme to unlock by pattern', function callee$2$0() {
      var keys, actions;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
            actions = _libUnlockHelpers2['default'].getPatternActions(keys, { x: 0, y: 0 }, 1);

            actions.map(function (action, i) {
              if (i === 0) {
                action.action.should.equal('press');
              } else if (i === keys.length) {
                action.action.should.equal('release');
              } else {
                action.action.should.equal('moveTo');
              }
            });

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should verify pattern gestures moves to non consecutives pins', function callee$2$0() {
      var keys, actions;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            keys = ["7", "2", "9", "8", "5", "6", "1", "4", "3"];
            actions = _libUnlockHelpers2['default'].getPatternActions(keys, { x: 0, y: 0 }, 1);

            // Move from pin 7 to pin 2
            actions[1].options.x.should.equal(1);
            actions[1].options.y.should.equal(-2);
            // Move from pin 2 to pin 9
            actions[2].options.x.should.equal(1);
            actions[2].options.y.should.equal(2);
            // Move from pin 9 to pin 8
            actions[3].options.x.should.equal(-1);
            actions[3].options.y.should.equal(0);
            // Move from pin 8 to pin 5
            actions[4].options.x.should.equal(0);
            actions[4].options.y.should.equal(-1);
            // Move from pin 5 to pin 6
            actions[5].options.x.should.equal(1);
            actions[5].options.y.should.equal(0);
            // Move from pin 6 to pin 1
            actions[6].options.x.should.equal(-2);
            actions[6].options.y.should.equal(-1);
            // Move from pin 1 to pin 4
            actions[7].options.x.should.equal(0);
            actions[7].options.y.should.equal(1);
            // Move from pin 4 to pin 3
            actions[8].options.x.should.equal(2);
            actions[8].options.y.should.equal(-1);

          case 18:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('patternUnlock', (0, _appiumTestSupport.withMocks)({ driver: driver, helpers: _libUnlockHelpers2['default'], adb: adb, asyncbox: asyncbox }, function (mocks) {
    var el = { ELEMENT: 1 };
    var pos = { x: 10, y: 20 };
    var size = { width: 300 };
    var keys = ['1', '3', '5', '7', '9'];
    var caps = { unlockKey: '13579' };
    beforeEach(function () {
      mocks.helpers.expects('dismissKeyguard').withExactArgs(driver, adb).once();
      mocks.helpers.expects('stringKeyToArr').returns(keys);
      mocks.driver.expects('getLocation').withExactArgs(el.ELEMENT).returns(pos);
      mocks.driver.expects('getSize').withExactArgs(el.ELEMENT).returns(size);
      mocks.helpers.expects('getPatternActions').withExactArgs(keys, pos, 100).returns('actions');
      mocks.driver.expects('performTouch').withExactArgs('actions').once();
      mocks.asyncbox.expects('sleep').withExactArgs(UNLOCK_WAIT_TIME).once();
    });
    it('should be able to unlock device using pattern (API level >= 21)', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApiLevel').returns(21);
            mocks.driver.expects('findElOrEls').withExactArgs('id', 'com.android.systemui:id/lockPatternView', false).returns(el);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].patternUnlock(adb, driver, caps));

          case 4:
            mocks.helpers.verify();
            mocks.driver.verify();
            mocks.asyncbox.verify();
            mocks.adb.verify();

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to unlock device using pattern (API level < 21)', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApiLevel').returns(20);
            mocks.driver.expects('findElOrEls').withExactArgs('id', 'com.android.keyguard:id/lockPatternView', false).returns(el);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].patternUnlock(adb, driver, caps));

          case 4:
            mocks.helpers.verify();
            mocks.driver.verify();
            mocks.asyncbox.verify();
            mocks.adb.verify();

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC91bmxvY2staGVscGVyLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7aUNBQ25CLHFCQUFxQjs7cUJBQzdCLE9BQU87Ozs7Z0NBQ0wsMEJBQTBCOzs7O3lCQUNwQixrQkFBa0I7Ozs7d0JBQ2xCLFVBQVU7O0lBQXhCLFFBQVE7O3lCQUNKLFlBQVk7Ozs7QUFFNUIsSUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUM7QUFDbEMsSUFBTSxvQkFBb0IsR0FBRyxHQUFHLENBQUM7QUFDakMsSUFBTSx1QkFBdUIsR0FBRyxHQUFHLENBQUM7QUFDcEMsSUFBTSxnQkFBZ0IsR0FBRyxHQUFHLENBQUM7O0FBRTdCLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLGdCQUFnQixFQUFFLFlBQU07QUFDL0IsTUFBSSxHQUFHLEdBQUcsNEJBQVMsQ0FBQztBQUNwQixNQUFJLE1BQU0sR0FBRyw0QkFBbUIsQ0FBQztBQUNqQyxNQUFJLE9BQU8sR0FBRyxtQkFBTSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDckMsTUFBSSxNQUFNLEdBQUcsa0JBQUssTUFBTSxDQUFDO0FBQ3pCLFVBQVEsQ0FBQyxtQkFBbUIsRUFBRSxZQUFNO0FBQ2xDLE1BQUUsQ0FBQyxnQ0FBZ0MsRUFBRTs7OztBQUNuQywwQ0FBUSxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BELDBDQUFRLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEQsMENBQVEsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6RCwwQ0FB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Q0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6RCxrQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6RCxrQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6RCxrQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6RCxrQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6RCxrQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6RCxrQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6RCxrQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6RCxrQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6RCxrQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6RCxrQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6RCxrQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6RCxrQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6RCxrQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6RCxrQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6RCxrQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6RCxrQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7Ozs7OztLQUMxRCxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsbUJBQW1CLEVBQUUsWUFBTTtBQUNsQyxNQUFFLENBQUMsMkVBQTJFLEVBQUU7VUFDMUUsSUFBSSxFQUNKLE9BQU87Ozs7QUFEUCxnQkFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7QUFDcEQsbUJBQU8sR0FBRyw4QkFBUSxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUM7O0FBQzdELG1CQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsTUFBTSxFQUFFLENBQUMsRUFBSztBQUN6QixrQkFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ1gsc0JBQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztlQUNyQyxNQUFNLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDNUIsc0JBQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztlQUN2QyxNQUFNO0FBQ0wsc0JBQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztlQUN0QzthQUNGLENBQUMsQ0FBQzs7Ozs7OztLQUNKLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQywrREFBK0QsRUFBRTtVQUM5RCxJQUFJLEVBQ0osT0FBTzs7OztBQURQLGdCQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztBQUNwRCxtQkFBTyxHQUFHLDhCQUFRLGlCQUFpQixDQUFDLElBQUksRUFBRSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQzs7O0FBRTdELG1CQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLG1CQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRXRDLG1CQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLG1CQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVyQyxtQkFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RDLG1CQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVyQyxtQkFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyQyxtQkFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUV0QyxtQkFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyQyxtQkFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFckMsbUJBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0QyxtQkFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUV0QyxtQkFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyQyxtQkFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFckMsbUJBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckMsbUJBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7OztLQUN2QyxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsZUFBZSxFQUFFLGtDQUFVLEVBQUMsTUFBTSxFQUFOLE1BQU0sRUFBRSxPQUFPLCtCQUFBLEVBQUUsR0FBRyxFQUFILEdBQUcsRUFBRSxRQUFRLEVBQVIsUUFBUSxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDL0UsUUFBTSxFQUFFLEdBQUcsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUM7QUFDeEIsUUFBTSxHQUFHLEdBQUcsRUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFF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LENBQUM7QUFDdEIsaUJBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDeEIsaUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7S0FDcEIsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDLENBQUM7Q0FDTCxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L3VubG9jay1oZWxwZXItc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcclxuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xyXG5pbXBvcnQgeyB3aXRoTW9ja3MgfSBmcm9tICdhcHBpdW0tdGVzdC1zdXBwb3J0JztcclxuaW1wb3J0IHNpbm9uIGZyb20gJ3Npbm9uJztcclxuaW1wb3J0IGhlbHBlcnMgZnJvbSAnLi4vLi4vbGliL3VubG9jay1oZWxwZXJzJztcclxuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vbGliL2RyaXZlcic7XHJcbmltcG9ydCAqIGFzIGFzeW5jYm94IGZyb20gJ2FzeW5jYm94JztcclxuaW1wb3J0IEFEQiBmcm9tICdhcHBpdW0tYWRiJztcclxuXHJcbmNvbnN0IEtFWUNPREVfTlVNUEFEX0VOVEVSID0gXCI2NlwiO1xyXG5jb25zdCBJTlBVVF9LRVlTX1dBSVRfVElNRSA9IDEwMDtcclxuY29uc3QgSElERV9LRVlCT0FSRF9XQUlUX1RJTUUgPSAxMDA7XHJcbmNvbnN0IFVOTE9DS19XQUlUX1RJTUUgPSAxMDA7XHJcblxyXG5jaGFpLnNob3VsZCgpO1xyXG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XHJcblxyXG5kZXNjcmliZSgnVW5sb2NrIEhlbHBlcnMnLCAoKSA9PiB7XHJcbiAgbGV0IGFkYiA9IG5ldyBBREIoKTtcclxuICBsZXQgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcclxuICBsZXQgc2FuZGJveCA9IHNpbm9uLnNhbmRib3guY3JlYXRlKCk7XHJcbiAgbGV0IGV4cGVjdCA9IGNoYWkuZXhwZWN0O1xyXG4gIGRlc2NyaWJlKCdpc1ZhbGlkVW5sb2NrVHlwZScsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgdmVyaWZ5IHRoZSB1bmxvY2sgdHlwZXMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGhlbHBlcnMuaXNWYWxpZFVubG9ja1R5cGUoJ3BpbicpLnNob3VsZC5lcXVhbCh0cnVlKTtcclxuICAgICAgaGVscGVycy5pc1ZhbGlkVW5sb2NrVHlwZSgncGF0dGVybicpLnNob3VsZC5lcXVhbCh0cnVlKTtcclxuICAgICAgaGVscGVycy5pc1ZhbGlkVW5sb2NrVHlwZSgncGFzc3dvcmQnKS5zaG91bGQuZXF1YWwodHJ1ZSk7XHJcbiAgICAgIGhlbHBlcnMuaXNWYWxpZFVubG9ja1R5cGUoJ2ZpbmdlcnByaW50Jykuc2hvdWxkLmVxdWFsKHRydWUpO1xyXG4gICAgICBoZWxwZXJzLmlzVmFsaWRVbmxvY2tUeXBlKCd0ZWxlcGF0aHknKS5zaG91bGQuZXF1YWwoZmFsc2UpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ2lzVmFsaWRLZXknLCAgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCB2ZXJpZnkgdGhlIHVubG9jayBrZXlzIGZvciBlYWNoIHR5cGUnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGhlbHBlcnMuaXNWYWxpZEtleSgncGluJykuc2hvdWxkLmVxdWFsKGZhbHNlKTtcclxuICAgICAgaGVscGVycy5pc1ZhbGlkS2V5KCdwaW4nLCAnICcpLnNob3VsZC5lcXVhbChmYWxzZSk7XHJcbiAgICAgIGhlbHBlcnMuaXNWYWxpZEtleSgncGluJywgJzExMTEnKS5zaG91bGQuZXF1YWwodHJ1ZSk7XHJcbiAgICAgIGhlbHBlcnMuaXNWYWxpZEtleSgncGluJywgJzFhYmMnKS5zaG91bGQuZXF1YWwoZmFsc2UpO1xyXG4gICAgICBoZWxwZXJzLmlzVmFsaWRLZXkoJ2ZpbmdlcnByaW50Jykuc2hvdWxkLmVxdWFsKGZhbHNlKTtcclxuICAgICAgaGVscGVycy5pc1ZhbGlkS2V5KCdmaW5nZXJwcmludCcsICcgJykuc2hvdWxkLmVxdWFsKGZhbHNlKTtcclxuICAgICAgaGVscGVycy5pc1ZhbGlkS2V5KCdmaW5nZXJwcmludCcsICcxMTExJykuc2hvdWxkLmVxdWFsKHRydWUpO1xyXG4gICAgICBoZWxwZXJzLmlzVmFsaWRLZXkoJ2ZpbmdlcnByaW50JywgJzFhYmMnKS5zaG91bGQuZXF1YWwoZmFsc2UpO1xyXG4gICAgICBoZWxwZXJzLmlzVmFsaWRLZXkoJ3BhdHRlcm4nLCAnMScpLnNob3VsZC5lcXVhbChmYWxzZSk7XHJcbiAgICAgIGhlbHBlcnMuaXNWYWxpZEtleSgncGF0dGVybicsICcxMjM0Jykuc2hvdWxkLmVxdWFsKHRydWUpO1xyXG4gICAgICBoZWxwZXJzLmlzVmFsaWRLZXkoJ3BhdHRlcm4nLCAnMTIzNDU2Nzg5Jykuc2hvdWxkLmVxdWFsKHRydWUpO1xyXG4gICAgICBoZWxwZXJzLmlzVmFsaWRLZXkoJ3BhdHRlcm4nLCAnMDEyMzQnKS5zaG91bGQuZXF1YWwoZmFsc2UpO1xyXG4gICAgICBoZWxwZXJzLmlzVmFsaWRLZXkoJ3BhdHRlcm4nKS5zaG91bGQuZXF1YWwoZmFsc2UpO1xyXG4gICAgICBoZWxwZXJzLmlzVmFsaWRLZXkoJ3BhdHRlcm4nLCAnICcpLnNob3VsZC5lcXVhbChmYWxzZSk7XHJcbiAgICAgIGhlbHBlcnMuaXNWYWxpZEtleSgncGF0dGVybicsICcxYWJjJykuc2hvdWxkLmVxdWFsKGZhbHNlKTtcclxuICAgICAgaGVscGVycy5pc1ZhbGlkS2V5KCdwYXR0ZXJuJywgJzEyMTMnKS5zaG91bGQuZXF1YWwoZmFsc2UpO1xyXG4gICAgICBoZWxwZXJzLmlzVmFsaWRLZXkoJ3Bhc3N3b3JkJywgJzEyMWMzJykuc2hvdWxkLmVxdWFsKHRydWUpO1xyXG4gICAgICBoZWxwZXJzLmlzVmFsaWRLZXkoJ3Bhc3N3b3JkJywgJ2FwcGl1bScpLnNob3VsZC5lcXVhbCh0cnVlKTtcclxuICAgICAgaGVscGVycy5pc1ZhbGlkS2V5KCdwYXNzd29yZCcsICdhcHBpdW0tYW5kcm9pZC1kcml2ZXInKS5zaG91bGQuZXF1YWwodHJ1ZSk7XHJcbiAgICAgIGhlbHBlcnMuaXNWYWxpZEtleSgncGFzc3dvcmQnLCAnQCMkJSYtKygpKlwiXFwnOjshPyxfIC4vfmB8PXt9XFxcXFtdJykuc2hvdWxkLmVxdWFsKHRydWUpO1xyXG4gICAgICBoZWxwZXJzLmlzVmFsaWRLZXkoJ3Bhc3N3b3JkJywgJzEyMycpLnNob3VsZC5lcXVhbChmYWxzZSk7XHJcbiAgICAgIGhlbHBlcnMuaXNWYWxpZEtleSgncGFzc3dvcmQnKS5zaG91bGQuZXF1YWwoZmFsc2UpO1xyXG4gICAgICBoZWxwZXJzLmlzVmFsaWRLZXkoJ3Bhc3N3b3JkJywgJyAgICcpLnNob3VsZC5lcXVhbChmYWxzZSk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdGhyb3cgZXJyb3IgaWYgdW5sb2NrIHR5cGUgaXMgaW52YWxpZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgZXhwZWN0KCgpID0+IGhlbHBlcnMuaXNWYWxpZEtleSgnaW52YWxpZF91bmxvY2tfdHlwZScsICcxJykpXHJcbiAgICAgICAgLnRvLnRocm93KCdJbnZhbGlkIHVubG9jayB0eXBlJyk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnZGlzbWlzc0tleWd1YXJkJywgd2l0aE1vY2tzKHtkcml2ZXIsICBhZGIsIGFzeW5jYm94LCBoZWxwZXJzfSwgKG1vY2tzKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGhpZGUga2V5Ym9hcmQgaWYga2V5Ym9hcmQgaXMgc25vd24nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmRyaXZlci5leHBlY3RzKCdpc0tleWJvYXJkU2hvd24nKS5yZXR1cm5zKHRydWUpO1xyXG4gICAgICBtb2Nrcy5kcml2ZXIuZXhwZWN0cygnaGlkZUtleWJvYXJkJykub25jZSgpO1xyXG4gICAgICBtb2Nrcy5hc3luY2JveC5leHBlY3RzKCdzbGVlcCcpLndpdGhFeGFjdEFyZ3MoSElERV9LRVlCT0FSRF9XQUlUX1RJTUUpLm9uY2UoKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJykub25jZSgpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnYmFjaycpLm9uY2UoKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldEFwaUxldmVsJykucmV0dXJucygyMCk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygnc3dpcGVVcCcpLm9uY2UoKTtcclxuICAgICAgYXdhaXQgaGVscGVycy5kaXNtaXNzS2V5Z3VhcmQoZHJpdmVyLCBhZGIpO1xyXG4gICAgICBtb2Nrcy5kcml2ZXIudmVyaWZ5KCk7XHJcbiAgICAgIG1vY2tzLmFzeW5jYm94LnZlcmlmeSgpO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGRpc21pc3Mgbm90aWZpY2F0aW9ucyBhbmQgZGlzc21pc3Mga2V5Z3VhcmQgdmlhIHN3aXBwaW5nIHVwJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5kcml2ZXIuZXhwZWN0cygnaXNLZXlib2FyZFNob3duJykucmV0dXJucyhmYWxzZSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpXHJcbiAgICAgICAgLndpdGhFeGFjdEFyZ3MoW1wic2VydmljZVwiLCBcImNhbGxcIiwgXCJub3RpZmljYXRpb25cIiwgXCIxXCJdKS5vbmNlKCk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdiYWNrJykub25jZSgpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0QXBpTGV2ZWwnKS5yZXR1cm5zKDIxKTtcclxuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdzd2lwZVVwJykud2l0aEV4YWN0QXJncyhkcml2ZXIpLm9uY2UoKTtcclxuICAgICAgYXdhaXQgaGVscGVycy5kaXNtaXNzS2V5Z3VhcmQoZHJpdmVyLCBhZGIpO1xyXG4gICAgICBtb2Nrcy5kcml2ZXIudmVyaWZ5KCk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgbW9ja3MuaGVscGVycy52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBkaXNzbWlzcyBrZXlndWFyZCB2aWEgZGlzbWlzcy1rZXlndWFyZCBzaGVsbCBjb21tYW5kIGlmIEFQSSBsZXZlbCA+IDIxJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5kcml2ZXIuZXhwZWN0cygnaXNLZXlib2FyZFNob3duJykucmV0dXJucyhmYWxzZSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpLm9uQ2FsbCgwKS5yZXR1cm5zKCcnKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2JhY2snKS5vbmNlKCk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRBcGlMZXZlbCcpLnJldHVybnMoMjIpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKS53aXRoRXhhY3RBcmdzKFtcIndtXCIsIFwiZGlzbWlzcy1rZXlndWFyZFwiXSkub25jZSgpO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ3N3aXBlVXAnKS5uZXZlcigpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLmRpc21pc3NLZXlndWFyZChkcml2ZXIsIGFkYik7XHJcbiAgICAgIG1vY2tzLmRyaXZlci52ZXJpZnkoKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgfSkpO1xyXG4gIGRlc2NyaWJlKCdzd2lwZVVwJywgd2l0aE1vY2tzKHtkcml2ZXIsIGhlbHBlcnN9LCAobW9ja3MpID0+IHtcclxuICAgIGl0KCdzaG91bGQgcGVyZm9ybSBzd2lwZSB1cCB0b3VjaCBhY3Rpb24nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGxldCB3aW5kb3dTaXplID0ge3g6IDQ3NSwgeTogODAwfTtcclxuICAgICAgbGV0IGFjdGlvbnMgPSBbXHJcbiAgICAgICAge2FjdGlvbjogJ3ByZXNzJywgb3B0aW9uczoge2VsZW1lbnQ6IG51bGwsIHg6IDIzNywgeTogNzkwfX0sXHJcbiAgICAgICAge2FjdGlvbjogJ21vdmVUbycsIG9wdGlvbnM6IHtlbGVtZW50OiBudWxsLCB4OiAyMzcsIHk6IDEwMH19LFxyXG4gICAgICAgIHthY3Rpb246ICdyZWxlYXNlJ31cclxuICAgICAgXTtcclxuICAgICAgbW9ja3MuZHJpdmVyLmV4cGVjdHMoJ2dldFdpbmRvd1NpemUnKS5yZXR1cm5zKHdpbmRvd1NpemUpO1xyXG4gICAgICBtb2Nrcy5kcml2ZXIuZXhwZWN0cygncGVyZm9ybVRvdWNoJykud2l0aEV4YWN0QXJncyhhY3Rpb25zKS5vbmNlO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLnN3aXBlVXAoZHJpdmVyKTtcclxuICAgICAgbW9ja3MuZHJpdmVyLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgfSkpO1xyXG4gIGRlc2NyaWJlKCdlbmNvZGVQYXNzd29yZCcsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgdmVyaWZ5IHRoZSBwYXNzd29yZCB3aXRoIGJsYW5rIHNwYWNlIGlzIGVuY29kZWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGhlbHBlcnMuZW5jb2RlUGFzc3dvcmQoJ2EgcCBwIGkgdSBtJykuc2hvdWxkLmVxdWFsKFwiYSVzcCVzcCVzaSVzdSVzbVwiKTtcclxuICAgICAgaGVscGVycy5lbmNvZGVQYXNzd29yZCgnICAgJykuc2hvdWxkLmVxdWFsKFwiJXMlcyVzXCIpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ3N0cmluZ0tleVRvQXJyJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBjYXN0IHN0cmluZyBrZXlzIHRvIGFycmF5JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBoZWxwZXJzLnN0cmluZ0tleVRvQXJyKCcxMjM0Jykuc2hvdWxkLmVxbChbJzEnLCAnMicsICczJywgJzQnXSk7XHJcbiAgICAgIGhlbHBlcnMuc3RyaW5nS2V5VG9BcnIoJyAxMjM0ICcpLnNob3VsZC5lcWwoWycxJywgJzInLCAnMycsICc0J10pO1xyXG4gICAgICBoZWxwZXJzLnN0cmluZ0tleVRvQXJyKCcxIDIgMyA0Jykuc2hvdWxkLmVxbChbJzEnLCAnMicsICczJywgJzQnXSk7XHJcbiAgICAgIGhlbHBlcnMuc3RyaW5nS2V5VG9BcnIoJzEgIDIgIDMgIDQnKS5zaG91bGQuZXFsKFsnMScsICcyJywgJzMnLCAnNCddKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdmaW5nZXJwcmludFVubG9jaycsIHdpdGhNb2Nrcyh7YWRiLCBhc3luY2JveH0sIChtb2NrcykgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIHVubG9jayBkZXZpY2UgdmlhIGZpbmdlcnByaW50IGlmIEFQSSBsZXZlbCA+PSAyMycsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IGNhcHMgPSB7dW5sb2NrS2V5OiAnMTIzJ307XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRBcGlMZXZlbCcpLnJldHVybnMoMjMpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZmluZ2VycHJpbnQnKS53aXRoRXhhY3RBcmdzKGNhcHMudW5sb2NrS2V5KS5vbmNlKCk7XHJcbiAgICAgIG1vY2tzLmFzeW5jYm94LmV4cGVjdHMoJ3NsZWVwJykud2l0aEV4YWN0QXJncyhVTkxPQ0tfV0FJVF9USU1FKS5vbmNlKCk7XHJcbiAgICAgIGF3YWl0IGhlbHBlcnMuZmluZ2VycHJpbnRVbmxvY2soYWRiLCBkcml2ZXIsIGNhcHMpLnNob3VsZC5iZS5mdWxmaWxsZWQ7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgbW9ja3MuYXN5bmNib3gudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdGhyb3cgZXJyb3IgaWYgQVBJIGxldmVsIDwgMjMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRBcGlMZXZlbCcpLnJldHVybnMoMjIpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZmluZ2VycHJpbnQnKS5uZXZlcigpO1xyXG4gICAgICBtb2Nrcy5hc3luY2JveC5leHBlY3RzKCdzbGVlcCcpLm5ldmVyKCk7XHJcbiAgICAgIGF3YWl0IGhlbHBlcnMuZmluZ2VycHJpbnRVbmxvY2soYWRiKVxyXG4gICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoJ29ubHkgd29ya3MgZm9yIEFuZHJvaWQgNisnKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICBtb2Nrcy5hc3luY2JveC52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gIH0pKTtcclxuICBkZXNjcmliZSgncGluVW5sb2NrJywgd2l0aE1vY2tzKHthZGIsIGhlbHBlcnMsIGRyaXZlciwgYXN5bmNib3h9LCAobW9ja3MpID0+IHtcclxuICAgIGNvbnN0IGNhcHMgPSB7dW5sb2NrS2V5OiAnMTM1NzknfTtcclxuICAgIGNvbnN0IGtleXMgPSBbJzEnLCAnMycsICc1JywgJzcnLCAnOSddO1xyXG4gICAgY29uc3QgZWxzID0gW3tFTEVNRU5UOiAxfSwge0VMRU1FTlQ6IDJ9LCB7RUxFTUVOVDogM30sXHJcbiAgICAgICAgICAgICAgICAge0VMRU1FTlQ6IDR9LCB7RUxFTUVOVDogNX0sIHtFTEVNRU5UOiA2fSxcclxuICAgICAgICAgICAgICAgICB7RUxFTUVOVDogN30sIHtFTEVNRU5UOiA4fSwge0VMRU1FTlQ6IDl9XTtcclxuICAgIGFmdGVyRWFjaCgoKSA9PiB7XHJcbiAgICAgIHNhbmRib3gucmVzdG9yZSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gdW5sb2NrIGRldmljZSB1c2luZyBwaW4gKEFQSSBsZXZlbCA+PSAyMSknLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygnZGlzbWlzc0tleWd1YXJkJykub25jZSgpO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ3N0cmluZ0tleVRvQXJyJykucmV0dXJucyhrZXlzKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldEFwaUxldmVsJykucmV0dXJucygyMSk7XHJcbiAgICAgIG1vY2tzLmRyaXZlci5leHBlY3RzKCdmaW5kRWxPckVscycpXHJcbiAgICAgICAgLndpdGhFeGFjdEFyZ3MoXCJpZFwiLCBcImNvbS5hbmRyb2lkLnN5c3RlbXVpOmlkL2RpZ2l0X3RleHRcIiwgdHJ1ZSlcclxuICAgICAgICAucmV0dXJucyhlbHMpO1xyXG4gICAgICBtb2Nrcy5kcml2ZXIuZXhwZWN0cygnZmluZEVsT3JFbHMnKVxyXG4gICAgICAgIC53aXRoRXhhY3RBcmdzKFwiaWRcIiwgXCJjb20uYW5kcm9pZC5zeXN0ZW11aTppZC9rZXlfZW50ZXJcIiwgZmFsc2UpXHJcbiAgICAgICAgLnJldHVybnMoe0VMRU1FTlQ6IDEwMH0pO1xyXG4gICAgICBmb3IgKGxldCBlIG9mIGVscykge1xyXG4gICAgICAgIG1vY2tzLmRyaXZlci5leHBlY3RzKCdnZXRBdHRyaWJ1dGUnKS53aXRoRXhhY3RBcmdzKCd0ZXh0JywgZS5FTEVNRU5UKVxyXG4gICAgICAgICAgLnJldHVybnMoZS5FTEVNRU5ULnRvU3RyaW5nKCkpO1xyXG4gICAgICB9XHJcbiAgICAgIG1vY2tzLmFzeW5jYm94LmV4cGVjdHMoJ3NsZWVwJykud2l0aEV4YWN0QXJncyhVTkxPQ0tfV0FJVF9USU1FKS5vbmNlKCk7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdjbGljaycpO1xyXG5cclxuICAgICAgYXdhaXQgaGVscGVycy5waW5VbmxvY2soYWRiLCBkcml2ZXIsIGNhcHMpO1xyXG5cclxuICAgICAgZHJpdmVyLmNsaWNrLmdldENhbGwoMCkuYXJnc1swXS5zaG91bGQuZXF1YWwoMSk7XHJcbiAgICAgIGRyaXZlci5jbGljay5nZXRDYWxsKDEpLmFyZ3NbMF0uc2hvdWxkLmVxdWFsKDMpO1xyXG4gICAgICBkcml2ZXIuY2xpY2suZ2V0Q2FsbCgyKS5hcmdzWzBdLnNob3VsZC5lcXVhbCg1KTtcclxuICAgICAgZHJpdmVyLmNsaWNrLmdldENhbGwoMykuYXJnc1swXS5zaG91bGQuZXF1YWwoNyk7XHJcbiAgICAgIGRyaXZlci5jbGljay5nZXRDYWxsKDQpLmFyZ3NbMF0uc2hvdWxkLmVxdWFsKDkpO1xyXG4gICAgICBkcml2ZXIuY2xpY2suZ2V0Q2FsbCg1KS5hcmdzWzBdLnNob3VsZC5lcXVhbCgxMDApO1xyXG5cclxuICAgICAgbW9ja3MuaGVscGVycy52ZXJpZnkoKTtcclxuICAgICAgbW9ja3MuZHJpdmVyLnZlcmlmeSgpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIG1vY2tzLmFzeW5jYm94LnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gdW5sb2NrIGRldmljZSB1c2luZyBwaW4gKEFQSSBsZXZlbCA8IDIxKScsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdkaXNtaXNzS2V5Z3VhcmQnKS5vbmNlKCk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygnc3RyaW5nS2V5VG9BcnInKS5yZXR1cm5zKGtleXMpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0QXBpTGV2ZWwnKS5yZXR1cm5zKDIwKTtcclxuICAgICAgZm9yIChsZXQgcGluIG9mIGtleXMpIHtcclxuICAgICAgICBtb2Nrcy5kcml2ZXIuZXhwZWN0cygnZmluZEVsT3JFbHMnKVxyXG4gICAgICAgICAgLndpdGhFeGFjdEFyZ3MoXCJpZFwiLCBgY29tLmFuZHJvaWQua2V5Z3VhcmQ6aWQva2V5JHtwaW59YCwgZmFsc2UpXHJcbiAgICAgICAgICAucmV0dXJucyh7RUxFTUVOVDogcGFyc2VJbnQocGluLCAxMCl9KTtcclxuICAgICAgfVxyXG4gICAgICBtb2Nrcy5kcml2ZXIuZXhwZWN0cygnZmluZEVsT3JFbHMnKVxyXG4gICAgICAgIC53aXRoRXhhY3RBcmdzKFwiaWRcIiwgXCJjb20uYW5kcm9pZC5rZXlndWFyZDppZC9rZXlfZW50ZXJcIiwgZmFsc2UpXHJcbiAgICAgICAgLnJldHVybnMoe0VMRU1FTlQ6IDEwMH0pO1xyXG4gICAgICBtb2Nrcy5hc3luY2JveC5leHBlY3RzKCdzbGVlcCcpLndpdGhFeGFjdEFyZ3MoVU5MT0NLX1dBSVRfVElNRSkub25jZSgpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnY2xpY2snKTtcclxuXHJcbiAgICAgIGF3YWl0IGhlbHBlcnMucGluVW5sb2NrKGFkYiwgZHJpdmVyLCBjYXBzKTtcclxuXHJcbiAgICAgIGRyaXZlci5jbGljay5nZXRDYWxsKDApLmFyZ3NbMF0uc2hvdWxkLmVxdWFsKDEpO1xyXG4gICAgICBkcml2ZXIuY2xpY2suZ2V0Q2FsbCgxKS5hcmdzWzBdLnNob3VsZC5lcXVhbCgzKTtcclxuICAgICAgZHJpdmVyLmNsaWNrLmdldENhbGwoMikuYXJnc1swXS5zaG91bGQuZXF1YWwoNSk7XHJcbiAgICAgIGRyaXZlci5jbGljay5nZXRDYWxsKDMpLmFyZ3NbMF0uc2hvdWxkLmVxdWFsKDcpO1xyXG4gICAgICBkcml2ZXIuY2xpY2suZ2V0Q2FsbCg0KS5hcmdzWzBdLnNob3VsZC5lcXVhbCg5KTtcclxuICAgICAgZHJpdmVyLmNsaWNrLmdldENhbGwoNSkuYXJnc1swXS5zaG91bGQuZXF1YWwoMTAwKTtcclxuXHJcbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XHJcbiAgICAgIG1vY2tzLmRyaXZlci52ZXJpZnkoKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICBtb2Nrcy5hc3luY2JveC52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBlcnJvciBpZiBwaW4gYnV0dG9ucyBkb2VzIG5vdCBleGlzdCAoQVBJIGxldmVsID49IDIxKScsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdkaXNtaXNzS2V5Z3VhcmQnKS5vbmNlKCk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygnc3RyaW5nS2V5VG9BcnInKS5vbmNlKCk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRBcGlMZXZlbCcpLnJldHVybnMoMjEpO1xyXG4gICAgICBtb2Nrcy5kcml2ZXIuZXhwZWN0cygnZmluZEVsT3JFbHMnKS5yZXR1cm5zKG51bGwpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLnBpblVubG9jayhhZGIsIGRyaXZlciwgY2Fwcykuc2hvdWxkLmV2ZW50dWFsbHkuYmVcclxuICAgICAgICAucmVqZWN0ZWRXaXRoKCdFcnJvciBmaW5kaW5nIHVubG9jayBwaW4gYnV0dG9ucyEnKTtcclxuICAgICAgbW9ja3MuaGVscGVycy52ZXJpZnkoKTtcclxuICAgICAgbW9ja3MuZHJpdmVyLnZlcmlmeSgpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdGhyb3cgZXJyb3IgaWYgcGluIGJ1dHRvbnMgZG9lcyBub3QgZXhpc3QgKEFQSSBsZXZlbCA8IDIxKScsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdkaXNtaXNzS2V5Z3VhcmQnKS5vbmNlKCk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygnc3RyaW5nS2V5VG9BcnInKS5yZXR1cm5zKGtleXMpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0QXBpTGV2ZWwnKS5yZXR1cm5zKDIwKTtcclxuICAgICAgbW9ja3MuZHJpdmVyLmV4cGVjdHMoJ2ZpbmRFbE9yRWxzJylcclxuICAgICAgICAud2l0aEV4YWN0QXJncygnaWQnLCAnY29tLmFuZHJvaWQua2V5Z3VhcmQ6aWQva2V5MScsIGZhbHNlKVxyXG4gICAgICAgIC5yZXR1cm5zKG51bGwpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLnBpblVubG9jayhhZGIsIGRyaXZlciwgY2Fwcykuc2hvdWxkLmV2ZW50dWFsbHkuYmVcclxuICAgICAgICAucmVqZWN0ZWRXaXRoKGBFcnJvciBmaW5kaW5nIHVubG9jayBwaW4gJzEnIGJ1dHRvbiFgKTtcclxuICAgICAgbW9ja3MuaGVscGVycy52ZXJpZnkoKTtcclxuICAgICAgbW9ja3MuZHJpdmVyLnZlcmlmeSgpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICB9KSk7XHJcbiAgZGVzY3JpYmUoJ3Bhc3N3b3JkVW5sb2NrJywgd2l0aE1vY2tzKHthZGIsIGhlbHBlcnMsIGFzeW5jYm94fSwgKG1vY2tzKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gdW5sb2NrIGRldmljZSB1c2luZyBwYXNzd29yZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IGNhcHMgPSB7dW5sb2NrS2V5OiAncHNzd3JkJ307XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygnZGlzbWlzc0tleWd1YXJkJykud2l0aEV4YWN0QXJncyhkcml2ZXIsIGFkYikub25jZSgpO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ2VuY29kZVBhc3N3b3JkJykud2l0aEV4YWN0QXJncyhjYXBzLnVubG9ja0tleSkucmV0dXJucyhjYXBzLnVubG9ja0tleSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpLndpdGhFeGFjdEFyZ3MoWydpbnB1dCcsICd0ZXh0JywgY2Fwcy51bmxvY2tLZXldKS5vbmNlKCk7XHJcbiAgICAgIG1vY2tzLmFzeW5jYm94LmV4cGVjdHMoJ3NsZWVwJykud2l0aEV4YWN0QXJncyhJTlBVVF9LRVlTX1dBSVRfVElNRSkub25jZSgpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKS53aXRoRXhhY3RBcmdzKFsnaW5wdXQnLCAna2V5ZXZlbnQnLCBLRVlDT0RFX05VTVBBRF9FTlRFUl0pO1xyXG4gICAgICBtb2Nrcy5hc3luY2JveC5leHBlY3RzKCdzbGVlcCcpLndpdGhFeGFjdEFyZ3MoVU5MT0NLX1dBSVRfVElNRSkub25jZSgpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLnBhc3N3b3JkVW5sb2NrKGFkYiwgZHJpdmVyLCBjYXBzKTtcclxuICAgICAgbW9ja3MuaGVscGVycy52ZXJpZnkoKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICBtb2Nrcy5hc3luY2JveC52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gIH0pKTtcclxuICBkZXNjcmliZSgnZ2V0UGF0dGVybktleVBvc2l0aW9uJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCB2ZXJpZnkgcGF0dGVybiBwaW4gaXMgYXByb3hpbWF0ZWxseSB0byBpdHMgcG9zaXRpb24nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGxldCBwaW5zID0gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDldLm1hcCgocGluKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGhlbHBlcnMuZ2V0UGF0dGVybktleVBvc2l0aW9uKHBpbiwge3g6IDMzLCB5OjMyM30sIDEzNy42KTtcclxuICAgICAgfSk7XHJcbiAgICAgIGxldCBjb2xzID0gWzEwMSwgMjM4LCAzNzVdO1xyXG4gICAgICBsZXQgcm93cyA9IFszOTEsIDUyOCwgNjY1XTtcclxuICAgICAgZXhwZWN0KHBpbnNbMF0ueCkudG8uYmUud2l0aGluKGNvbHNbMF0gLSA1LCBjb2xzWzBdICsgNSk7XHJcbiAgICAgIGV4cGVjdChwaW5zWzFdLngpLnRvLmJlLndpdGhpbihjb2xzWzFdIC0gNSwgY29sc1sxXSArIDUpO1xyXG4gICAgICBleHBlY3QocGluc1syXS54KS50by5iZS53aXRoaW4oY29sc1syXSAtIDUsIGNvbHNbMl0gKyA1KTtcclxuICAgICAgZXhwZWN0KHBpbnNbM10ueCkudG8uYmUud2l0aGluKGNvbHNbMF0gLSA1LCBjb2xzWzBdICsgNSk7XHJcbiAgICAgIGV4cGVjdChwaW5zWzRdLngpLnRvLmJlLndpdGhpbihjb2xzWzFdIC0gNSwgY29sc1sxXSArIDUpO1xyXG4gICAgICBleHBlY3QocGluc1s1XS54KS50by5iZS53aXRoaW4oY29sc1syXSAtIDUsIGNvbHNbMl0gKyA1KTtcclxuICAgICAgZXhwZWN0KHBpbnNbNl0ueCkudG8uYmUud2l0aGluKGNvbHNbMF0gLSA1LCBjb2xzWzBdICsgNSk7XHJcbiAgICAgIGV4cGVjdChwaW5zWzddLngpLnRvLmJlLndpdGhpbihjb2xzWzFdIC0gNSwgY29sc1sxXSArIDUpO1xyXG4gICAgICBleHBlY3QocGluc1s4XS54KS50by5iZS53aXRoaW4oY29sc1syXSAtIDUsIGNvbHNbMl0gKyA1KTtcclxuICAgICAgZXhwZWN0KHBpbnNbMF0ueSkudG8uYmUud2l0aGluKHJvd3NbMF0gLSA1LCByb3dzWzBdICsgNSk7XHJcbiAgICAgIGV4cGVjdChwaW5zWzFdLnkpLnRvLmJlLndpdGhpbihyb3dzWzBdIC0gNSwgcm93c1swXSArIDUpO1xyXG4gICAgICBleHBlY3QocGluc1syXS55KS50by5iZS53aXRoaW4ocm93c1swXSAtIDUsIHJvd3NbMF0gKyA1KTtcclxuICAgICAgZXhwZWN0KHBpbnNbM10ueSkudG8uYmUud2l0aGluKHJvd3NbMV0gLSA1LCByb3dzWzFdICsgNSk7XHJcbiAgICAgIGV4cGVjdChwaW5zWzRdLnkpLnRvLmJlLndpdGhpbihyb3dzWzFdIC0gNSwgcm93c1sxXSArIDUpO1xyXG4gICAgICBleHBlY3QocGluc1s1XS55KS50by5iZS53aXRoaW4ocm93c1sxXSAtIDUsIHJvd3NbMV0gKyA1KTtcclxuICAgICAgZXhwZWN0KHBpbnNbNl0ueSkudG8uYmUud2l0aGluKHJvd3NbMl0gLSA1LCByb3dzWzJdICsgNSk7XHJcbiAgICAgIGV4cGVjdChwaW5zWzddLnkpLnRvLmJlLndpdGhpbihyb3dzWzJdIC0gNSwgcm93c1syXSArIDUpO1xyXG4gICAgICBleHBlY3QocGluc1s4XS55KS50by5iZS53aXRoaW4ocm93c1syXSAtIDUsIHJvd3NbMl0gKyA1KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdnZXRQYXR0ZXJuQWN0aW9ucycsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgZ2VuZXJhdGUgcHJlc3MsIG1vdmVUbywgcmVsYXNlIGdlc3R1cmUgc2NoZW1lIHRvIHVubG9jayBieSBwYXR0ZXJuJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQga2V5cyA9IFtcIjFcIiwgXCIyXCIsIFwiM1wiLCBcIjRcIiwgXCI1XCIsIFwiNlwiLCBcIjdcIiwgXCI4XCIsIFwiOVwiXTtcclxuICAgICAgbGV0IGFjdGlvbnMgPSBoZWxwZXJzLmdldFBhdHRlcm5BY3Rpb25zKGtleXMsIHt4OiAwLCB5OjB9LCAxKTtcclxuICAgICAgYWN0aW9ucy5tYXAoKGFjdGlvbiwgaSkgPT4ge1xyXG4gICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICBhY3Rpb24uYWN0aW9uLnNob3VsZC5lcXVhbCgncHJlc3MnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGkgPT09IGtleXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICBhY3Rpb24uYWN0aW9uLnNob3VsZC5lcXVhbCgncmVsZWFzZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhY3Rpb24uYWN0aW9uLnNob3VsZC5lcXVhbCgnbW92ZVRvJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB2ZXJpZnkgcGF0dGVybiBnZXN0dXJlcyBtb3ZlcyB0byBub24gY29uc2VjdXRpdmVzIHBpbnMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGxldCBrZXlzID0gW1wiN1wiLCBcIjJcIiwgXCI5XCIsIFwiOFwiLCBcIjVcIiwgXCI2XCIsIFwiMVwiLCBcIjRcIiwgXCIzXCJdO1xyXG4gICAgICBsZXQgYWN0aW9ucyA9IGhlbHBlcnMuZ2V0UGF0dGVybkFjdGlvbnMoa2V5cywge3g6IDAsIHk6MH0sIDEpO1xyXG4gICAgICAvLyBNb3ZlIGZyb20gcGluIDcgdG8gcGluIDJcclxuICAgICAgYWN0aW9uc1sxXS5vcHRpb25zLnguc2hvdWxkLmVxdWFsKDEpO1xyXG4gICAgICBhY3Rpb25zWzFdLm9wdGlvbnMueS5zaG91bGQuZXF1YWwoLTIpO1xyXG4gICAgICAvLyBNb3ZlIGZyb20gcGluIDIgdG8gcGluIDlcclxuICAgICAgYWN0aW9uc1syXS5vcHRpb25zLnguc2hvdWxkLmVxdWFsKDEpO1xyXG4gICAgICBhY3Rpb25zWzJdLm9wdGlvbnMueS5zaG91bGQuZXF1YWwoMik7XHJcbiAgICAgIC8vIE1vdmUgZnJvbSBwaW4gOSB0byBwaW4gOFxyXG4gICAgICBhY3Rpb25zWzNdLm9wdGlvbnMueC5zaG91bGQuZXF1YWwoLTEpO1xyXG4gICAgICBhY3Rpb25zWzNdLm9wdGlvbnMueS5zaG91bGQuZXF1YWwoMCk7XHJcbiAgICAgIC8vIE1vdmUgZnJvbSBwaW4gOCB0byBwaW4gNVxyXG4gICAgICBhY3Rpb25zWzRdLm9wdGlvbnMueC5zaG91bGQuZXF1YWwoMCk7XHJcbiAgICAgIGFjdGlvbnNbNF0ub3B0aW9ucy55LnNob3VsZC5lcXVhbCgtMSk7XHJcbiAgICAgIC8vIE1vdmUgZnJvbSBwaW4gNSB0byBwaW4gNlxyXG4gICAgICBhY3Rpb25zWzVdLm9wdGlvbnMueC5zaG91bGQuZXF1YWwoMSk7XHJcbiAgICAgIGFjdGlvbnNbNV0ub3B0aW9ucy55LnNob3VsZC5lcXVhbCgwKTtcclxuICAgICAgLy8gTW92ZSBmcm9tIHBpbiA2IHRvIHBpbiAxXHJcbiAgICAgIGFjdGlvbnNbNl0ub3B0aW9ucy54LnNob3VsZC5lcXVhbCgtMik7XHJcbiAgICAgIGFjdGlvbnNbNl0ub3B0aW9ucy55LnNob3VsZC5lcXVhbCgtMSk7XHJcbiAgICAgIC8vIE1vdmUgZnJvbSBwaW4gMSB0byBwaW4gNFxyXG4gICAgICBhY3Rpb25zWzddLm9wdGlvbnMueC5zaG91bGQuZXF1YWwoMCk7XHJcbiAgICAgIGFjdGlvbnNbN10ub3B0aW9ucy55LnNob3VsZC5lcXVhbCgxKTtcclxuICAgICAgLy8gTW92ZSBmcm9tIHBpbiA0IHRvIHBpbiAzXHJcbiAgICAgIGFjdGlvbnNbOF0ub3B0aW9ucy54LnNob3VsZC5lcXVhbCgyKTtcclxuICAgICAgYWN0aW9uc1s4XS5vcHRpb25zLnkuc2hvdWxkLmVxdWFsKC0xKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdwYXR0ZXJuVW5sb2NrJywgd2l0aE1vY2tzKHtkcml2ZXIsIGhlbHBlcnMsIGFkYiwgYXN5bmNib3h9LCAobW9ja3MpID0+IHtcclxuICAgIGNvbnN0IGVsID0ge0VMRU1FTlQ6IDF9O1xyXG4gICAgY29uc3QgcG9zID0ge3g6IDEwLCB5OiAyMH07XHJcbiAgICBjb25zdCBzaXplID0ge3dpZHRoOiAzMDB9O1xyXG4gICAgY29uc3Qga2V5cyA9IFsnMScsICczJywgJzUnLCAnNycsICc5J107XHJcbiAgICBjb25zdCBjYXBzID0ge3VubG9ja0tleTogJzEzNTc5J307XHJcbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcclxuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdkaXNtaXNzS2V5Z3VhcmQnKS53aXRoRXhhY3RBcmdzKGRyaXZlciwgYWRiKS5vbmNlKCk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygnc3RyaW5nS2V5VG9BcnInKS5yZXR1cm5zKGtleXMpO1xyXG4gICAgICBtb2Nrcy5kcml2ZXIuZXhwZWN0cygnZ2V0TG9jYXRpb24nKS53aXRoRXhhY3RBcmdzKGVsLkVMRU1FTlQpLnJldHVybnMocG9zKTtcclxuICAgICAgbW9ja3MuZHJpdmVyLmV4cGVjdHMoJ2dldFNpemUnKS53aXRoRXhhY3RBcmdzKGVsLkVMRU1FTlQpLnJldHVybnMoc2l6ZSk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygnZ2V0UGF0dGVybkFjdGlvbnMnKVxyXG4gICAgICAgIC53aXRoRXhhY3RBcmdzKGtleXMsIHBvcywgMTAwKS5yZXR1cm5zKCdhY3Rpb25zJyk7XHJcbiAgICAgIG1vY2tzLmRyaXZlci5leHBlY3RzKCdwZXJmb3JtVG91Y2gnKS53aXRoRXhhY3RBcmdzKCdhY3Rpb25zJykub25jZSgpO1xyXG4gICAgICBtb2Nrcy5hc3luY2JveC5leHBlY3RzKCdzbGVlcCcpLndpdGhFeGFjdEFyZ3MoVU5MT0NLX1dBSVRfVElNRSkub25jZSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gdW5sb2NrIGRldmljZSB1c2luZyBwYXR0ZXJuIChBUEkgbGV2ZWwgPj0gMjEpJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0QXBpTGV2ZWwnKS5yZXR1cm5zKDIxKTtcclxuICAgICAgbW9ja3MuZHJpdmVyLmV4cGVjdHMoJ2ZpbmRFbE9yRWxzJylcclxuICAgICAgICAud2l0aEV4YWN0QXJncygnaWQnLCAnY29tLmFuZHJvaWQuc3lzdGVtdWk6aWQvbG9ja1BhdHRlcm5WaWV3JywgZmFsc2UpXHJcbiAgICAgICAgLnJldHVybnMoZWwpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLnBhdHRlcm5VbmxvY2soYWRiLCBkcml2ZXIsIGNhcHMpO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLnZlcmlmeSgpO1xyXG4gICAgICBtb2Nrcy5kcml2ZXIudmVyaWZ5KCk7XHJcbiAgICAgIG1vY2tzLmFzeW5jYm94LnZlcmlmeSgpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byB1bmxvY2sgZGV2aWNlIHVzaW5nIHBhdHRlcm4gKEFQSSBsZXZlbCA8IDIxKScsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldEFwaUxldmVsJykucmV0dXJucygyMCk7XHJcbiAgICAgIG1vY2tzLmRyaXZlci5leHBlY3RzKCdmaW5kRWxPckVscycpXHJcbiAgICAgICAgLndpdGhFeGFjdEFyZ3MoJ2lkJywgJ2NvbS5hbmRyb2lkLmtleWd1YXJkOmlkL2xvY2tQYXR0ZXJuVmlldycsIGZhbHNlKVxyXG4gICAgICAgIC5yZXR1cm5zKGVsKTtcclxuICAgICAgYXdhaXQgaGVscGVycy5wYXR0ZXJuVW5sb2NrKGFkYiwgZHJpdmVyLCBjYXBzKTtcclxuICAgICAgbW9ja3MuaGVscGVycy52ZXJpZnkoKTtcclxuICAgICAgbW9ja3MuZHJpdmVyLnZlcmlmeSgpO1xyXG4gICAgICBtb2Nrcy5hc3luY2JveC52ZXJpZnkoKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgfSkpO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uIn0=
