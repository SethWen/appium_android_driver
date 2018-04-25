'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _appiumAndroidBootstrap = require('appium-android-bootstrap');

var _appiumAndroidBootstrap2 = _interopRequireDefault(_appiumAndroidBootstrap);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _libAndroidHelpers = require('../../../lib/android-helpers');

var _libAndroidHelpers2 = _interopRequireDefault(_libAndroidHelpers);

var driver = undefined;
var sandbox = _sinon2['default'].sandbox.create();
_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Element', function () {
  beforeEach(function () {
    driver = new _2['default']();
    driver.adb = new _appiumAdb2['default']();
    driver.bootstrap = new _appiumAndroidBootstrap2['default']();
    sandbox.stub(driver.bootstrap, 'sendAction');
    sandbox.stub(_libAndroidHelpers2['default'], 'removeNullProperties');
    driver.opts = { unicodeKeyboard: true };
  });
  afterEach(function () {
    sandbox.restore();
  });
  describe('getAttribute', function () {
    it('should get element attribute', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.bootstrap.sendAction.withArgs('element:getAttribute').returns('attr_value');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getAttribute('attr', 'el1').should.become('attr_value'));

          case 3:
            driver.bootstrap.sendAction.calledWithExactly('element:getAttribute', { attribute: 'attr', elementId: 'el1' }).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('getName', function () {
    it('should get element name', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getAttribute');
            driver.getAttribute.returns('el_name');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getName('el1').should.become('el_name'));

          case 4:
            driver.getAttribute.calledWithExactly('className', 'el1').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('elementDisplayed', function () {
    it('should return true if element displayed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getAttribute');
            driver.getAttribute.returns('true');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.elementDisplayed('el1').should.become(true));

          case 4:
            driver.getAttribute.calledWithExactly('displayed', 'el1').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return false if element not displayed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getAttribute');
            driver.getAttribute.returns('false');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.elementDisplayed('el1').should.become(false));

          case 4:
            driver.getAttribute.calledWithExactly('displayed', 'el1').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('elementEnabled', function () {
    it('should return true if element enabled', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getAttribute');
            driver.getAttribute.returns('true');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.elementEnabled('el1').should.become(true));

          case 4:
            driver.getAttribute.calledWithExactly('enabled', 'el1').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return false if element not enabled', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getAttribute');
            driver.getAttribute.returns('false');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.elementEnabled('el1').should.become(false));

          case 4:
            driver.getAttribute.calledWithExactly('enabled', 'el1').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('elementSelected', function () {
    it('should return true if element selected', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getAttribute');
            driver.getAttribute.returns('true');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.elementSelected('el1').should.become(true));

          case 4:
            driver.getAttribute.calledWithExactly('selected', 'el1').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return false if element not selected', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getAttribute');
            driver.getAttribute.returns('false');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.elementSelected('el1').should.become(false));

          case 4:
            driver.getAttribute.calledWithExactly('selected', 'el1').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('setElementValue', function () {
    var params = { elementId: 'el0', text: 'text to set', replace: true,
      unicodeKeyboard: true };
    it('should call doSetElementValue', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'doSetElementValue');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.setElementValue('text to set', 'el0', true));

          case 3:
            driver.doSetElementValue.calledWithExactly(params).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should join keys parameter if keys is instance of Array', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'doSetElementValue');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.setElementValue(['t', 'ext', ' to ', 'se', 't'], 'el0', true));

          case 3:
            driver.doSetElementValue.calledWithExactly(params).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should set replace to false by default', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            params.replace = false;
            sandbox.stub(driver, 'doSetElementValue');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.setElementValue(['t', 'ext', ' to ', 'se', 't'], 'el0'));

          case 4:
            driver.doSetElementValue.calledWithExactly(params).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('doSetElementValue', function () {
    it('should call setText to set element value', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.doSetElementValue('params'));

          case 2:
            driver.bootstrap.sendAction.calledWithExactly('element:setText', 'params').should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('setValue', function () {
    it('should call setElementValue to set value', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'setElementValue');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.setValue('keys', 'el1'));

          case 3:
            driver.setElementValue.calledWithExactly('keys', 'el1', false).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('replaceValue', function () {
    it('should call setElementValue to replace value', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'setElementValue');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.replaceValue('keys', 'el1'));

          case 3:
            driver.setElementValue.calledWithExactly('keys', 'el1', true).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('setValueImmediate', function () {
    it('should set value via adb inputText command', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'click');
            sandbox.stub(driver.adb, 'inputText');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.setValueImmediate('keys', 'el1'));

          case 4:
            driver.click.calledWithExactly('el1').should.be['true'];
            driver.adb.inputText.calledWithExactly('keys').should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should join keys parameter if keys is instance of Array', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'click');
            sandbox.stub(driver.adb, 'inputText');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.setValueImmediate(['k', 'ey', 's'], 'el1'));

          case 4:
            driver.adb.inputText.calledWithExactly('keys').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('getText', function () {
    it('should get element text', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.bootstrap.sendAction.withArgs('element:getText').returns('el_text');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getText('el1').should.become('el_text'));

          case 3:
            driver.bootstrap.sendAction.calledWithExactly('element:getText', { elementId: 'el1' }).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('clear', function () {
    it('should clear text of an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getText');
            sandbox.stub(driver, 'click');
            sandbox.stub(driver.adb, 'clearTextField');
            driver.getText.withArgs('el1').returns('#'.repeat(110));
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.clear('el1'));

          case 6:
            driver.getText.calledWithExactly('el1').should.be['true'];
            driver.click.calledWithExactly('el1').should.be['true'];
            driver.adb.clearTextField.getCall(0).args[0].should.be.equal(50);
            driver.adb.clearTextField.getCall(1).args[0].should.be.equal(50);
            driver.adb.clearTextField.getCall(2).args[0].should.be.equal(10);

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should do five retries and then fail if clearTextField throws error', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            this.timeout(10000);

            sandbox.stub(driver, 'getText');
            sandbox.stub(driver, 'click');
            sandbox.stub(driver.adb, 'clearTextField');
            driver.adb.clearTextField.throws();
            driver.getText.withArgs('el1').returns('#'.repeat(1));
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(driver.clear('el1').should.be.rejected);

          case 8:
            driver.adb.clearTextField.alwaysCalledWith(1).should.be['true'];
            driver.adb.clearTextField.callCount.should.be.equal(5);

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('it should assume that the text have 100 chars if getText returns empty string', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getText');
            sandbox.stub(driver, 'click');
            sandbox.stub(driver.adb, 'clearTextField');
            driver.getText.withArgs('el1').returns('');
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.clear('el1'));

          case 6:
            driver.adb.clearTextField.getCall(0).args[0].should.be.equal(50);
            driver.adb.clearTextField.getCall(1).args[0].should.be.equal(50);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('click', function () {
    it('should click an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.click('el1'));

          case 2:
            driver.bootstrap.sendAction.calledWithExactly('element:click', { elementId: 'el1' }).should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('getLocation', function () {
    it('should get location of an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.bootstrap.sendAction.withArgs('element:getLocation').returns('loc_info');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getLocation('el1').should.become('loc_info'));

          case 3:
            driver.bootstrap.sendAction.calledWithExactly('element:getLocation', { elementId: 'el1' }).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('getLocationInView', function () {
    it('should get location of an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getLocation');
            driver.getLocation.returns('loc_info');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getLocationInView('el1').should.become('loc_info'));

          case 4:
            driver.getLocation.calledWithExactly('el1').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('getSize', function () {
    it('should get size of an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.bootstrap.sendAction.withArgs('element:getSize').returns('size_info');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getSize('el1').should.become('size_info'));

          case 3:
            driver.bootstrap.sendAction.calledWithExactly('element:getSize', { elementId: 'el1' }).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('touchLongClick', function () {
    it('should do touch long click on element', function callee$2$0() {
      var params;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            params = { elementId: 'el1', x: 12, y: 34, duration: 5 };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.touchLongClick('el1', 12, 34, 5));

          case 3:
            _libAndroidHelpers2['default'].removeNullProperties.calledWithExactly(params).should.be['true'];
            driver.bootstrap.sendAction.calledWithExactly('element:touchLongClick', params).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('touchDown', function () {
    it('should do touch down on element', function callee$2$0() {
      var params;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            params = { elementId: 'el1', x: 12, y: 34 };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.touchDown('el1', 12, 34));

          case 3:
            _libAndroidHelpers2['default'].removeNullProperties.calledWithExactly(params).should.be['true'];
            driver.bootstrap.sendAction.calledWithExactly('element:touchDown', params).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('touchUp', function () {
    it('should do touch up on element', function callee$2$0() {
      var params;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            params = { elementId: 'el1', x: 12, y: 34 };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.touchUp('el1', 12, 34));

          case 3:
            _libAndroidHelpers2['default'].removeNullProperties.calledWithExactly(params).should.be['true'];
            driver.bootstrap.sendAction.calledWithExactly('element:touchUp', params).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('touchMove', function () {
    it('should get element attribute', function callee$2$0() {
      var params;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            params = { elementId: 'el1', x: 12, y: 34 };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.touchMove('el1', 12, 34));

          case 3:
            _libAndroidHelpers2['default'].removeNullProperties.calledWithExactly(params).should.be['true'];
            driver.bootstrap.sendAction.calledWithExactly('element:touchMove', params).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('complexTap', function () {
    it('should tap an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.complexTap(null, null, null, 12, 34));

          case 2:
            driver.bootstrap.sendAction.calledWithExactly('click', { x: 12, y: 34 }).should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('tap', function () {
    it('shoulde tap an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.tap('el1', 12, 34, 3));

          case 2:
            driver.bootstrap.sendAction.alwaysCalledWith('element:click', { elementId: 'el1', x: 12, y: 34 }).should.be['true'];
            driver.bootstrap.sendAction.calledThrice.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should tap without an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.tap(null, 12, 34, 3));

          case 2:
            driver.bootstrap.sendAction.alwaysCalledWith('click', { x: 12, y: 34 }).should.be['true'];
            driver.bootstrap.sendAction.calledThrice.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should perform single tap on element if x, y and count are not passed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.tap('el1'));

          case 2:
            driver.bootstrap.sendAction.alwaysCalledWith('element:click').should.be['true'];
            driver.bootstrap.sendAction.calledOnce.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9jb21tYW5kcy9lbGVtZW50LXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztxQkFDM0IsT0FBTzs7OztzQ0FDSCwwQkFBMEI7Ozs7Z0JBQ3RCLFVBQVU7Ozs7eUJBQ3BCLFlBQVk7Ozs7aUNBQ0QsOEJBQThCOzs7O0FBRXpELElBQUksTUFBTSxZQUFBLENBQUM7QUFDWCxJQUFJLE9BQU8sR0FBRyxtQkFBTSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDckMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixRQUFRLENBQUMsU0FBUyxFQUFFLFlBQU07QUFDeEIsWUFBVSxDQUFDLFlBQU07QUFDZixVQUFNLEdBQUcsbUJBQW1CLENBQUM7QUFDN0IsVUFBTSxDQUFDLEdBQUcsR0FBRyw0QkFBUyxDQUFDO0FBQ3ZCLFVBQU0sQ0FBQyxTQUFTLEdBQUcseUNBQWUsQ0FBQztBQUNuQyxXQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDN0MsV0FBTyxDQUFDLElBQUksaUNBQWlCLHNCQUFzQixDQUFDLENBQUM7QUFDckQsVUFBTSxDQUFDLElBQUksR0FBRyxFQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUMsQ0FBQztHQUN2QyxDQUFDLENBQUM7QUFDSCxXQUFTLENBQUMsWUFBTTtBQUNkLFdBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztHQUNuQixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsY0FBYyxFQUFFLFlBQU07QUFDN0IsTUFBRSxDQUFDLDhCQUE4QixFQUFFOzs7O0FBQ2pDLGtCQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7OzZDQUM3RSxNQUFNLENBQUMs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TSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQUssQ0FBQzs7Ozs7OztLQUN6RCxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsK0JBQStCLEVBQUU7Ozs7OzZDQUM1QixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzs7O0FBQ2pDLGtCQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsRUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUNsRSxNQUFNLENBQUMsRUFBRSxRQUFLLENBQUM7QUFDbEIsa0JBQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFLLENBQUM7Ozs7Ozs7S0FDekQsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLHVFQUF1RSxFQUFFOzs7Ozs2Q0FDcEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7OztBQUN2QixrQkFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBSyxDQUFDO0FBQzdFLGtCQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBSyxDQUFDOzs7Ozs7O0tBQ3ZELENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3VuaXQvY29tbWFuZHMvZWxlbWVudC1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xyXG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XHJcbmltcG9ydCBzaW5vbiBmcm9tICdzaW5vbic7XHJcbmltcG9ydCBCb290c3RyYXAgZnJvbSAnYXBwaXVtLWFuZHJvaWQtYm9vdHN0cmFwJztcclxuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4nO1xyXG5pbXBvcnQgQURCIGZyb20gJ2FwcGl1bS1hZGInO1xyXG5pbXBvcnQgYW5kcm9pZEhlbHBlcnMgZnJvbSAnLi4vLi4vLi4vbGliL2FuZHJvaWQtaGVscGVycyc7XHJcblxyXG5sZXQgZHJpdmVyO1xyXG5sZXQgc2FuZGJveCA9IHNpbm9uLnNhbmRib3guY3JlYXRlKCk7XHJcbmNoYWkuc2hvdWxkKCk7XHJcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcclxuXHJcbmRlc2NyaWJlKCdFbGVtZW50JywgKCkgPT4ge1xyXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xyXG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcclxuICAgIGRyaXZlci5hZGIgPSBuZXcgQURCKCk7XHJcbiAgICBkcml2ZXIuYm9vdHN0cmFwID0gbmV3IEJvb3RzdHJhcCgpO1xyXG4gICAgc2FuZGJveC5zdHViKGRyaXZlci5ib290c3RyYXAsICdzZW5kQWN0aW9uJyk7XHJcbiAgICBzYW5kYm94LnN0dWIoYW5kcm9pZEhlbHBlcnMsICdyZW1vdmVOdWxsUHJvcGVydGllcycpO1xyXG4gICAgZHJpdmVyLm9wdHMgPSB7dW5pY29kZUtleWJvYXJkOiB0cnVlfTtcclxuICB9KTtcclxuICBhZnRlckVhY2goKCkgPT4ge1xyXG4gICAgc2FuZGJveC5yZXN0b3JlKCk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ2dldEF0dHJpYnV0ZScsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgZ2V0IGVsZW1lbnQgYXR0cmlidXRlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb24ud2l0aEFyZ3MoJ2VsZW1lbnQ6Z2V0QXR0cmlidXRlJykucmV0dXJucygnYXR0cl92YWx1ZScpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0QXR0cmlidXRlKCdhdHRyJywgJ2VsMScpLnNob3VsZC5iZWNvbWUoJ2F0dHJfdmFsdWUnKTtcclxuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uXHJcbiAgICAgICAgLmNhbGxlZFdpdGhFeGFjdGx5KCdlbGVtZW50OmdldEF0dHJpYnV0ZScsIHthdHRyaWJ1dGU6ICdhdHRyJywgZWxlbWVudElkOiAnZWwxJ30pXHJcbiAgICAgICAgLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ2dldE5hbWUnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGdldCBlbGVtZW50IG5hbWUnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdnZXRBdHRyaWJ1dGUnKTtcclxuICAgICAgZHJpdmVyLmdldEF0dHJpYnV0ZS5yZXR1cm5zKCdlbF9uYW1lJyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5nZXROYW1lKCdlbDEnKS5zaG91bGQuYmVjb21lKCdlbF9uYW1lJyk7XHJcbiAgICAgIGRyaXZlci5nZXRBdHRyaWJ1dGUuY2FsbGVkV2l0aEV4YWN0bHkoJ2NsYXNzTmFtZScsICdlbDEnKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdlbGVtZW50RGlzcGxheWVkJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBlbGVtZW50IGRpc3BsYXllZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2dldEF0dHJpYnV0ZScpO1xyXG4gICAgICBkcml2ZXIuZ2V0QXR0cmlidXRlLnJldHVybnMoJ3RydWUnKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmVsZW1lbnREaXNwbGF5ZWQoJ2VsMScpLnNob3VsZC5iZWNvbWUodHJ1ZSk7XHJcbiAgICAgIGRyaXZlci5nZXRBdHRyaWJ1dGUuY2FsbGVkV2l0aEV4YWN0bHkoJ2Rpc3BsYXllZCcsICdlbDEnKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgZWxlbWVudCBub3QgZGlzcGxheWVkJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnZ2V0QXR0cmlidXRlJyk7XHJcbiAgICAgIGRyaXZlci5nZXRBdHRyaWJ1dGUucmV0dXJucygnZmFsc2UnKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmVsZW1lbnREaXNwbGF5ZWQoJ2VsMScpLnNob3VsZC5iZWNvbWUoZmFsc2UpO1xyXG4gICAgICBkcml2ZXIuZ2V0QXR0cmlidXRlLmNhbGxlZFdpdGhFeGFjdGx5KCdkaXNwbGF5ZWQnLCAnZWwxJykuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnZWxlbWVudEVuYWJsZWQnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIGVsZW1lbnQgZW5hYmxlZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2dldEF0dHJpYnV0ZScpO1xyXG4gICAgICBkcml2ZXIuZ2V0QXR0cmlidXRlLnJldHVybnMoJ3RydWUnKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmVsZW1lbnRFbmFibGVkKCdlbDEnKS5zaG91bGQuYmVjb21lKHRydWUpO1xyXG4gICAgICBkcml2ZXIuZ2V0QXR0cmlidXRlLmNhbGxlZFdpdGhFeGFjdGx5KCdlbmFibGVkJywgJ2VsMScpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBlbGVtZW50IG5vdCBlbmFibGVkJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnZ2V0QXR0cmlidXRlJyk7XHJcbiAgICAgIGRyaXZlci5nZXRBdHRyaWJ1dGUucmV0dXJucygnZmFsc2UnKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmVsZW1lbnRFbmFibGVkKCdlbDEnKS5zaG91bGQuYmVjb21lKGZhbHNlKTtcclxuICAgICAgZHJpdmVyLmdldEF0dHJpYnV0ZS5jYWxsZWRXaXRoRXhhY3RseSgnZW5hYmxlZCcsICdlbDEnKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdlbGVtZW50U2VsZWN0ZWQnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIGVsZW1lbnQgc2VsZWN0ZWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdnZXRBdHRyaWJ1dGUnKTtcclxuICAgICAgZHJpdmVyLmdldEF0dHJpYnV0ZS5yZXR1cm5zKCd0cnVlJyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5lbGVtZW50U2VsZWN0ZWQoJ2VsMScpLnNob3VsZC5iZWNvbWUodHJ1ZSk7XHJcbiAgICAgIGRyaXZlci5nZXRBdHRyaWJ1dGUuY2FsbGVkV2l0aEV4YWN0bHkoJ3NlbGVjdGVkJywgJ2VsMScpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBlbGVtZW50IG5vdCBzZWxlY3RlZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2dldEF0dHJpYnV0ZScpO1xyXG4gICAgICBkcml2ZXIuZ2V0QXR0cmlidXRlLnJldHVybnMoJ2ZhbHNlJyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5lbGVtZW50U2VsZWN0ZWQoJ2VsMScpLnNob3VsZC5iZWNvbWUoZmFsc2UpO1xyXG4gICAgICBkcml2ZXIuZ2V0QXR0cmlidXRlLmNhbGxlZFdpdGhFeGFjdGx5KCdzZWxlY3RlZCcsICdlbDEnKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdzZXRFbGVtZW50VmFsdWUnLCAoKSA9PiB7XHJcbiAgICBjb25zdCBwYXJhbXMgPSB7ZWxlbWVudElkOiAnZWwwJywgdGV4dDogJ3RleHQgdG8gc2V0JywgIHJlcGxhY2U6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgIHVuaWNvZGVLZXlib2FyZDogdHJ1ZX07XHJcbiAgICBpdCgnc2hvdWxkIGNhbGwgZG9TZXRFbGVtZW50VmFsdWUnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdkb1NldEVsZW1lbnRWYWx1ZScpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuc2V0RWxlbWVudFZhbHVlKCd0ZXh0IHRvIHNldCcsICdlbDAnLCB0cnVlKTtcclxuICAgICAgZHJpdmVyLmRvU2V0RWxlbWVudFZhbHVlLmNhbGxlZFdpdGhFeGFjdGx5KHBhcmFtcykuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgam9pbiBrZXlzIHBhcmFtZXRlciBpZiBrZXlzIGlzIGluc3RhbmNlIG9mIEFycmF5JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnZG9TZXRFbGVtZW50VmFsdWUnKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLnNldEVsZW1lbnRWYWx1ZShbJ3QnLCAnZXh0JywgJyB0byAnLCAnc2UnLCAndCddLCAnZWwwJywgdHJ1ZSk7XHJcbiAgICAgIGRyaXZlci5kb1NldEVsZW1lbnRWYWx1ZS5jYWxsZWRXaXRoRXhhY3RseShwYXJhbXMpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHNldCByZXBsYWNlIHRvIGZhbHNlIGJ5IGRlZmF1bHQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHBhcmFtcy5yZXBsYWNlID0gZmFsc2U7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdkb1NldEVsZW1lbnRWYWx1ZScpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuc2V0RWxlbWVudFZhbHVlKFsndCcsICdleHQnLCAnIHRvICcsICdzZScsICd0J10sICdlbDAnKTtcclxuICAgICAgZHJpdmVyLmRvU2V0RWxlbWVudFZhbHVlLmNhbGxlZFdpdGhFeGFjdGx5KHBhcmFtcykuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnZG9TZXRFbGVtZW50VmFsdWUnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGNhbGwgc2V0VGV4dCB0byBzZXQgZWxlbWVudCB2YWx1ZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLmRvU2V0RWxlbWVudFZhbHVlKCdwYXJhbXMnKTtcclxuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uLmNhbGxlZFdpdGhFeGFjdGx5KCdlbGVtZW50OnNldFRleHQnLFxyXG4gICAgICAgICdwYXJhbXMnKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdzZXRWYWx1ZScsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgY2FsbCBzZXRFbGVtZW50VmFsdWUgdG8gc2V0IHZhbHVlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnc2V0RWxlbWVudFZhbHVlJyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5zZXRWYWx1ZSgna2V5cycsICdlbDEnKTtcclxuICAgICAgZHJpdmVyLnNldEVsZW1lbnRWYWx1ZS5jYWxsZWRXaXRoRXhhY3RseSgna2V5cycsICdlbDEnLCBmYWxzZSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgncmVwbGFjZVZhbHVlJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBjYWxsIHNldEVsZW1lbnRWYWx1ZSB0byByZXBsYWNlIHZhbHVlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnc2V0RWxlbWVudFZhbHVlJyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5yZXBsYWNlVmFsdWUoJ2tleXMnLCAnZWwxJyk7XHJcbiAgICAgIGRyaXZlci5zZXRFbGVtZW50VmFsdWUuY2FsbGVkV2l0aEV4YWN0bHkoJ2tleXMnLCAnZWwxJywgdHJ1ZSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnc2V0VmFsdWVJbW1lZGlhdGUnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIHNldCB2YWx1ZSB2aWEgYWRiIGlucHV0VGV4dCBjb21tYW5kJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnY2xpY2snKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdpbnB1dFRleHQnKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLnNldFZhbHVlSW1tZWRpYXRlKCdrZXlzJywgJ2VsMScpO1xyXG4gICAgICBkcml2ZXIuY2xpY2suY2FsbGVkV2l0aEV4YWN0bHkoJ2VsMScpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBkcml2ZXIuYWRiLmlucHV0VGV4dC5jYWxsZWRXaXRoRXhhY3RseSgna2V5cycpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGpvaW4ga2V5cyBwYXJhbWV0ZXIgaWYga2V5cyBpcyBpbnN0YW5jZSBvZiBBcnJheScsIGFzeW5jICgpID0+IHtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2NsaWNrJyk7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnaW5wdXRUZXh0Jyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5zZXRWYWx1ZUltbWVkaWF0ZShbJ2snLCAnZXknLCAncyddLCAnZWwxJyk7XHJcbiAgICAgIGRyaXZlci5hZGIuaW5wdXRUZXh0LmNhbGxlZFdpdGhFeGFjdGx5KCdrZXlzJykuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnZ2V0VGV4dCcsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgZ2V0IGVsZW1lbnQgdGV4dCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uLndpdGhBcmdzKCdlbGVtZW50OmdldFRleHQnKS5yZXR1cm5zKCdlbF90ZXh0Jyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KCdlbDEnKS5zaG91bGQuYmVjb21lKCdlbF90ZXh0Jyk7XHJcbiAgICAgIGRyaXZlci5ib290c3RyYXAuc2VuZEFjdGlvblxyXG4gICAgICAgIC5jYWxsZWRXaXRoRXhhY3RseSgnZWxlbWVudDpnZXRUZXh0Jywge2VsZW1lbnRJZDogJ2VsMSd9KVxyXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdjbGVhcicsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgY2xlYXIgdGV4dCBvZiBhbiBlbGVtZW50JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnZ2V0VGV4dCcpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnY2xpY2snKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdjbGVhclRleHRGaWVsZCcpO1xyXG4gICAgICBkcml2ZXIuZ2V0VGV4dC53aXRoQXJncygnZWwxJykucmV0dXJucygnIycucmVwZWF0KDExMCkpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuY2xlYXIoJ2VsMScpO1xyXG4gICAgICBkcml2ZXIuZ2V0VGV4dC5jYWxsZWRXaXRoRXhhY3RseSgnZWwxJykuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGRyaXZlci5jbGljay5jYWxsZWRXaXRoRXhhY3RseSgnZWwxJykuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGRyaXZlci5hZGIuY2xlYXJUZXh0RmllbGQuZ2V0Q2FsbCgwKS5hcmdzWzBdLnNob3VsZC5iZS5lcXVhbCg1MCk7XHJcbiAgICAgIGRyaXZlci5hZGIuY2xlYXJUZXh0RmllbGQuZ2V0Q2FsbCgxKS5hcmdzWzBdLnNob3VsZC5iZS5lcXVhbCg1MCk7XHJcbiAgICAgIGRyaXZlci5hZGIuY2xlYXJUZXh0RmllbGQuZ2V0Q2FsbCgyKS5hcmdzWzBdLnNob3VsZC5iZS5lcXVhbCgxMCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgZG8gZml2ZSByZXRyaWVzIGFuZCB0aGVuIGZhaWwgaWYgY2xlYXJUZXh0RmllbGQgdGhyb3dzIGVycm9yJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLnRpbWVvdXQoMTAwMDApO1xyXG5cclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2dldFRleHQnKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2NsaWNrJyk7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnY2xlYXJUZXh0RmllbGQnKTtcclxuICAgICAgZHJpdmVyLmFkYi5jbGVhclRleHRGaWVsZC50aHJvd3MoKTtcclxuICAgICAgZHJpdmVyLmdldFRleHQud2l0aEFyZ3MoJ2VsMScpLnJldHVybnMoJyMnLnJlcGVhdCgxKSk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5jbGVhcignZWwxJykuc2hvdWxkLmJlLnJlamVjdGVkO1xyXG4gICAgICBkcml2ZXIuYWRiLmNsZWFyVGV4dEZpZWxkLmFsd2F5c0NhbGxlZFdpdGgoMSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGRyaXZlci5hZGIuY2xlYXJUZXh0RmllbGQuY2FsbENvdW50LnNob3VsZC5iZS5lcXVhbCg1KTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ2l0IHNob3VsZCBhc3N1bWUgdGhhdCB0aGUgdGV4dCBoYXZlIDEwMCBjaGFycyBpZiBnZXRUZXh0IHJldHVybnMgZW1wdHkgc3RyaW5nJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnZ2V0VGV4dCcpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnY2xpY2snKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdjbGVhclRleHRGaWVsZCcpO1xyXG4gICAgICBkcml2ZXIuZ2V0VGV4dC53aXRoQXJncygnZWwxJykucmV0dXJucygnJyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5jbGVhcignZWwxJyk7XHJcbiAgICAgIGRyaXZlci5hZGIuY2xlYXJUZXh0RmllbGQuZ2V0Q2FsbCgwKS5hcmdzWzBdLnNob3VsZC5iZS5lcXVhbCg1MCk7XHJcbiAgICAgIGRyaXZlci5hZGIuY2xlYXJUZXh0RmllbGQuZ2V0Q2FsbCgxKS5hcmdzWzBdLnNob3VsZC5iZS5lcXVhbCg1MCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnY2xpY2snLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGNsaWNrIGFuIGVsZW1lbnQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5jbGljaygnZWwxJyk7XHJcbiAgICAgIGRyaXZlci5ib290c3RyYXAuc2VuZEFjdGlvbi5jYWxsZWRXaXRoRXhhY3RseSgnZWxlbWVudDpjbGljaycsIHtlbGVtZW50SWQ6ICdlbDEnfSlcclxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnZ2V0TG9jYXRpb24nLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGdldCBsb2NhdGlvbiBvZiBhbiBlbGVtZW50JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb25cclxuICAgICAgICAud2l0aEFyZ3MoJ2VsZW1lbnQ6Z2V0TG9jYXRpb24nKS5yZXR1cm5zKCdsb2NfaW5mbycpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0TG9jYXRpb24oJ2VsMScpLnNob3VsZC5iZWNvbWUoJ2xvY19pbmZvJyk7XHJcbiAgICAgIGRyaXZlci5ib290c3RyYXAuc2VuZEFjdGlvblxyXG4gICAgICAgIC5jYWxsZWRXaXRoRXhhY3RseSgnZWxlbWVudDpnZXRMb2NhdGlvbicsIHtlbGVtZW50SWQ6ICdlbDEnfSlcclxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnZ2V0TG9jYXRpb25JblZpZXcnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGdldCBsb2NhdGlvbiBvZiBhbiBlbGVtZW50JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnZ2V0TG9jYXRpb24nKTtcclxuICAgICAgZHJpdmVyLmdldExvY2F0aW9uLnJldHVybnMoJ2xvY19pbmZvJyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRMb2NhdGlvbkluVmlldygnZWwxJykuc2hvdWxkLmJlY29tZSgnbG9jX2luZm8nKTtcclxuICAgICAgZHJpdmVyLmdldExvY2F0aW9uLmNhbGxlZFdpdGhFeGFjdGx5KCdlbDEnKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdnZXRTaXplJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBnZXQgc2l6ZSBvZiBhbiBlbGVtZW50JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb25cclxuICAgICAgICAud2l0aEFyZ3MoJ2VsZW1lbnQ6Z2V0U2l6ZScpLnJldHVybnMoJ3NpemVfaW5mbycpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0U2l6ZSgnZWwxJykuc2hvdWxkLmJlY29tZSgnc2l6ZV9pbmZvJyk7XHJcbiAgICAgIGRyaXZlci5ib290c3RyYXAuc2VuZEFjdGlvblxyXG4gICAgICAgIC5jYWxsZWRXaXRoRXhhY3RseSgnZWxlbWVudDpnZXRTaXplJywge2VsZW1lbnRJZDogJ2VsMSd9KVxyXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCd0b3VjaExvbmdDbGljaycsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgZG8gdG91Y2ggbG9uZyBjbGljayBvbiBlbGVtZW50JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgcGFyYW1zID0ge2VsZW1lbnRJZDogJ2VsMScsIHg6IDEyLCB5OiAzNCwgZHVyYXRpb246IDV9O1xyXG4gICAgICBhd2FpdCBkcml2ZXIudG91Y2hMb25nQ2xpY2soJ2VsMScsIDEyLCAzNCwgNSk7XHJcbiAgICAgIGFuZHJvaWRIZWxwZXJzLnJlbW92ZU51bGxQcm9wZXJ0aWVzLmNhbGxlZFdpdGhFeGFjdGx5KHBhcmFtcylcclxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGRyaXZlci5ib290c3RyYXAuc2VuZEFjdGlvbi5jYWxsZWRXaXRoRXhhY3RseSgnZWxlbWVudDp0b3VjaExvbmdDbGljaycsIHBhcmFtcylcclxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgndG91Y2hEb3duJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBkbyB0b3VjaCBkb3duIG9uIGVsZW1lbnQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGxldCBwYXJhbXMgPSB7ZWxlbWVudElkOiAnZWwxJywgeDogMTIsIHk6IDM0fTtcclxuICAgICAgYXdhaXQgZHJpdmVyLnRvdWNoRG93bignZWwxJywgMTIsIDM0KTtcclxuICAgICAgYW5kcm9pZEhlbHBlcnMucmVtb3ZlTnVsbFByb3BlcnRpZXMuY2FsbGVkV2l0aEV4YWN0bHkocGFyYW1zKVxyXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uLmNhbGxlZFdpdGhFeGFjdGx5KCdlbGVtZW50OnRvdWNoRG93bicsIHBhcmFtcylcclxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgndG91Y2hVcCcsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgZG8gdG91Y2ggdXAgb24gZWxlbWVudCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IHBhcmFtcyA9IHtlbGVtZW50SWQ6ICdlbDEnLCB4OiAxMiwgeTogMzR9O1xyXG4gICAgICBhd2FpdCBkcml2ZXIudG91Y2hVcCgnZWwxJywgMTIsIDM0KTtcclxuICAgICAgYW5kcm9pZEhlbHBlcnMucmVtb3ZlTnVsbFByb3BlcnRpZXMuY2FsbGVkV2l0aEV4YWN0bHkocGFyYW1zKVxyXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uLmNhbGxlZFdpdGhFeGFjdGx5KCdlbGVtZW50OnRvdWNoVXAnLCBwYXJhbXMpXHJcbiAgICAgICAgLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ3RvdWNoTW92ZScsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgZ2V0IGVsZW1lbnQgYXR0cmlidXRlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgcGFyYW1zID0ge2VsZW1lbnRJZDogJ2VsMScsIHg6IDEyLCB5OiAzNH07XHJcbiAgICAgIGF3YWl0IGRyaXZlci50b3VjaE1vdmUoJ2VsMScsIDEyLCAzNCk7XHJcbiAgICAgIGFuZHJvaWRIZWxwZXJzLnJlbW92ZU51bGxQcm9wZXJ0aWVzLmNhbGxlZFdpdGhFeGFjdGx5KHBhcmFtcylcclxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGRyaXZlci5ib290c3RyYXAuc2VuZEFjdGlvbi5jYWxsZWRXaXRoRXhhY3RseSgnZWxlbWVudDp0b3VjaE1vdmUnLCBwYXJhbXMpXHJcbiAgICAgICAgLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ2NvbXBsZXhUYXAnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIHRhcCBhbiBlbGVtZW50JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhd2FpdCBkcml2ZXIuY29tcGxleFRhcChudWxsLCBudWxsLCBudWxsLCAxMiwgMzQpO1xyXG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb24uY2FsbGVkV2l0aEV4YWN0bHkoJ2NsaWNrJywge3g6IDEyLCB5OjM0fSlcclxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgndGFwJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZGUgdGFwIGFuIGVsZW1lbnQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGRyaXZlci50YXAoJ2VsMScsIDEyLCAzNCwgMyk7XHJcbiAgICAgIGRyaXZlci5ib290c3RyYXAuc2VuZEFjdGlvbi5hbHdheXNDYWxsZWRXaXRoKCdlbGVtZW50OmNsaWNrJyxcclxuICAgICAgICB7ZWxlbWVudElkOiAnZWwxJywgeDogMTIsIHk6IDM0fSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGRyaXZlci5ib290c3RyYXAuc2VuZEFjdGlvbi5jYWxsZWRUaHJpY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdGFwIHdpdGhvdXQgYW4gZWxlbWVudCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLnRhcChudWxsLCAxMiwgMzQsIDMpO1xyXG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb24uYWx3YXlzQ2FsbGVkV2l0aCgnY2xpY2snLCB7eDogMTIsIHk6IDM0fSlcclxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGRyaXZlci5ib290c3RyYXAuc2VuZEFjdGlvbi5jYWxsZWRUaHJpY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgcGVyZm9ybSBzaW5nbGUgdGFwIG9uIGVsZW1lbnQgaWYgeCwgeSBhbmQgY291bnQgYXJlIG5vdCBwYXNzZWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGRyaXZlci50YXAoJ2VsMScpO1xyXG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb24uYWx3YXlzQ2FsbGVkV2l0aCgnZWxlbWVudDpjbGljaycpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb24uY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uXFwuLiJ9
