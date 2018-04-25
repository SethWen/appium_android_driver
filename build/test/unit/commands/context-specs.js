'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _libWebviewHelpers = require('../../../lib/webview-helpers');

var _libWebviewHelpers2 = _interopRequireDefault(_libWebviewHelpers);

var _libCommandsContext = require('../../../lib/commands/context');

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var _appiumChromedriver = require('appium-chromedriver');

var _appiumChromedriver2 = _interopRequireDefault(_appiumChromedriver);

var _portfinder = require('portfinder');

var _portfinder2 = _interopRequireDefault(_portfinder);

var _appiumBaseDriver = require('appium-base-driver');

var driver = undefined;
var stubbedChromedriver = undefined;
var sandbox = _sinon2['default'].sandbox.create();
var expect = _chai2['default'].expect;
_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Context', function () {
  beforeEach(function () {
    sandbox.stub(_portfinder2['default'], 'getPort', function (cb) {
      // eslint-disable-line promise/prefer-await-to-callbacks
      return cb(null, 4444); // eslint-disable-line promise/prefer-await-to-callbacks
    });
    driver = new _2['default']();
    driver.adb = sandbox.stub();
    driver.adb.curDeviceId = 'device_id';
    driver.adb.getAdbServerPort = sandbox.stub().returns(5555);
    sandbox.stub(_appiumChromedriver2['default'].prototype, 'restart');
    sandbox.stub(_appiumChromedriver2['default'].prototype, 'start');
    sandbox.stub(_appiumChromedriver2['default'].prototype.proxyReq, 'bind').returns('proxy');

    stubbedChromedriver = _sinon2['default'].stub();
    stubbedChromedriver.proxyReq = _sinon2['default'].stub();
    stubbedChromedriver.proxyReq.bind = _sinon2['default'].stub();
    stubbedChromedriver.restart = _sinon2['default'].stub();
    stubbedChromedriver.stop = sandbox.stub().throws();
    stubbedChromedriver.removeAllListeners = sandbox.stub();
  });
  afterEach(function () {
    sandbox.restore();
  });
  describe('getCurrentContext', function () {
    it('should return current context', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.curContext = 'current_context';
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getCurrentContext().should.become('current_context'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('getContexts', function () {
    it('should get Chromium context where appropriate', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']({ browserName: 'Chrome' });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getContexts());

          case 3:
            context$3$0.t0 = context$3$0.sent;
            context$3$0.t1 = _libWebviewHelpers.CHROMIUM_WIN;
            expect(context$3$0.t0).to.include(context$3$0.t1);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should use ADB to figure out which webviews are available', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(_libWebviewHelpers2['default'], 'getWebviews');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getContexts());

          case 3:
            context$3$0.t0 = context$3$0.sent;
            context$3$0.t1 = _libWebviewHelpers.CHROMIUM_WIN;
            expect(context$3$0.t0).to.not.include(context$3$0.t1);

            _libWebviewHelpers2['default'].getWebviews.calledOnce.should.be['true'];

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('setContext', function () {
    beforeEach(function () {
      sandbox.stub(driver, 'getContexts').returns(['DEFAULT', 'WV', 'ANOTHER']);
      sandbox.stub(driver, 'switchContext');
    });
    it('should switch to default context if name is null', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'defaultContextName').returns('DEFAULT');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.setContext(null));

          case 3:
            driver.switchContext.calledWithExactly('DEFAULT').should.be['true'];
            driver.curContext.should.be.equal('DEFAULT');

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should switch to default web view if name is WEBVIEW', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'defaultWebviewName').returns('WV');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.setContext(_libWebviewHelpers.WEBVIEW_WIN));

          case 3:
            driver.switchContext.calledWithExactly('WV').should.be['true'];
            driver.curContext.should.be.equal('WV');

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should throw error if context does not exist', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setContext('fake').should.be.rejectedWith(_appiumBaseDriver.errors.NoSuchContextError));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should not switch to context if already in it', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.curContext = 'ANOTHER';
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.setContext('ANOTHER'));

          case 3:
            driver.switchContext.notCalled.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('switchContext', function () {
    beforeEach(function () {
      sandbox.stub(driver, 'stopChromedriverProxies');
      sandbox.stub(driver, 'startChromedriverProxy');
      sandbox.stub(driver, 'suspendChromedriverProxy');
      sandbox.stub(driver, 'isChromedriverContext');
      driver.curContext = 'current_cntx';
    });
    it('should start chrome driver proxy if requested context is webview', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.isChromedriverContext.returns(true);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.switchContext('context'));

          case 3:
            driver.startChromedriverProxy.calledWithExactly('context').should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should stop chromedriver proxy if current context is webview and requested context is not', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts = { recreateChromeDriverSessions: true };
            driver.isChromedriverContext.withArgs('requested_cntx').returns(false);
            driver.isChromedriverContext.withArgs('current_cntx').returns(true);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.switchContext('requested_cntx'));

          case 5:
            driver.stopChromedriverProxies.calledOnce.should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should suspend chrome driver proxy if current context is webview and requested context is not', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts = { recreateChromeDriverSessions: false };
            driver.isChromedriverContext.withArgs('requested_cntx').returns(false);
            driver.isChromedriverContext.withArgs('current_cntx').returns(true);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.switchContext('requested_cntx'));

          case 5:
            driver.suspendChromedriverProxy.calledOnce.should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should throw error if requested and current context are not webview', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.isChromedriverContext.withArgs('requested_cntx').returns(false);
            driver.isChromedriverContext.withArgs('current_cntx').returns(false);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.switchContext('requested_cntx').should.be.rejectedWith(/switching to context/));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('defaultContextName', function () {
    it('should return NATIVE_WIN', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.defaultContextName().should.be.equal(_libWebviewHelpers.NATIVE_WIN));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('defaultWebviewName', function () {
    it('should return WEBVIEW with package', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts = { appPackage: 'pkg' };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.defaultWebviewName().should.be.equal(_libWebviewHelpers.WEBVIEW_BASE + 'pkg'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('isWebContext', function () {
    it('should return true if current context is not native', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.curContext = 'current_context';
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.isWebContext().should.be['true']);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('startChromedriverProxy', function () {
    beforeEach(function () {
      sandbox.stub(driver, 'onChromedriverStop');
    });
    it('should start new chromedriver session', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.startChromedriverProxy('WEBVIEW_1'));

          case 2:
            driver.sessionChromedrivers.WEBVIEW_1.should.be.equal(driver.chromedriver);
            driver.chromedriver.start.getCall(0).args[0].chromeOptions.androidDeviceSerial.should.be.equal('device_id');
            driver.chromedriver.proxyPort.should.be.equal(4444);
            driver.chromedriver.proxyReq.bind.calledWithExactly(driver.chromedriver);
            driver.proxyReqRes.should.be.equal('proxy');
            driver.jwpProxyActive.should.be['true'];

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should be able to extract package from context name', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.appPackage = 'pkg';
            driver.opts.extractChromeAndroidPackageFromContextName = true;
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.startChromedriverProxy('WEBVIEW_com.pkg'));

          case 4:
            driver.chromedriver.start.getCall(0).args[0].chromeOptions.should.be.deep.include({ androidPackage: 'com.pkg' });

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should use package from opts if package extracted from context is empty', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.appPackage = 'pkg';
            driver.opts.extractChromeAndroidPackageFromContextName = true;
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.startChromedriverProxy('WEBVIEW_'));

          case 4:
            driver.chromedriver.start.getCall(0).args[0].chromeOptions.should.be.deep.include({ androidPackage: 'pkg' });

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should handle chromedriver event with STATE_STOPPED state', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.startChromedriverProxy('WEBVIEW_1'));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.chromedriver.emit(_appiumChromedriver2['default'].EVENT_CHANGED, { state: _appiumChromedriver2['default'].STATE_STOPPED }));

          case 4:
            driver.onChromedriverStop.calledWithExactly('WEBVIEW_1').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should ignore events if status is not STATE_STOPPED', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.startChromedriverProxy('WEBVIEW_1'));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.chromedriver.emit(_appiumChromedriver2['default'].EVENT_CHANGED, { state: 'unhandled_state' }));

          case 4:
            driver.onChromedriverStop.notCalled.should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should reconnect if session already exists', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            stubbedChromedriver.hasWorkingWebview = _sinon2['default'].stub().returns(true);
            driver.sessionChromedrivers = { WEBVIEW_1: stubbedChromedriver };
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.startChromedriverProxy('WEBVIEW_1'));

          case 4:
            driver.chromedriver.restart.notCalled.should.be['true'];
            driver.chromedriver.should.be.equal(stubbedChromedriver);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should restart if chromedriver has not working web view', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            stubbedChromedriver.hasWorkingWebview = _sinon2['default'].stub().returns(false);
            driver.sessionChromedrivers = { WEBVIEW_1: stubbedChromedriver };
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.startChromedriverProxy('WEBVIEW_1'));

          case 4:
            driver.chromedriver.restart.calledOnce.should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('suspendChromedriverProxy', function () {
    it('should suspend chrome driver proxy', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.suspendChromedriverProxy());

          case 2:
            (driver.chromedriver == null).should.be['true'];
            (driver.proxyReqRes == null).should.be['true'];
            driver.jwpProxyActive.should.be['false'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('onChromedriverStop', function () {
    it('should call startUnexpectedShutdown if chromedriver in active context', function callee$2$0() {
      var arg0;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            _sinon2['default'].stub(driver, 'startUnexpectedShutdown');
            driver.curContext = 'WEBVIEW_1';
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.onChromedriverStop('WEBVIEW_1'));

          case 4:
            arg0 = driver.startUnexpectedShutdown.getCall(0).args[0];

            arg0.should.be.an('error');
            arg0.message.should.include('Chromedriver quit unexpectedly during session');

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should delete session if chromedriver in non-active context', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.curContext = 'WEBVIEW_1';
            driver.sessionChromedrivers = { WEBVIEW_2: 'CHROMIUM' };
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.onChromedriverStop('WEBVIEW_2'));

          case 4:
            driver.sessionChromedrivers.should.be.empty;

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('stopChromedriverProxies', function () {
    it('should stop all chromedriver', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.sessionChromedrivers = { WEBVIEW_1: stubbedChromedriver, WEBVIEW_2: stubbedChromedriver };
            sandbox.stub(driver, 'suspendChromedriverProxy');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.stopChromedriverProxies());

          case 4:
            driver.suspendChromedriverProxy.calledOnce.should.be['true'];
            stubbedChromedriver.removeAllListeners.calledWithExactly(_appiumChromedriver2['default'].EVENT_CHANGED).should.be['true'];
            stubbedChromedriver.removeAllListeners.calledTwice.should.be['true'];
            stubbedChromedriver.stop.calledTwice.should.be['true'];
            driver.sessionChromedrivers.should.be.empty;

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('isChromedriverContext', function () {
    it('should return true if context is webview or chromium', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.isChromedriverContext(_libWebviewHelpers.WEBVIEW_WIN + '_1').should.be['true']);

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.isChromedriverContext(_libWebviewHelpers.CHROMIUM_WIN).should.be['true']);

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('setupNewChromedriver', function () {
    it('should be able to set app package from chrome options', function callee$2$0() {
      var chromedriver;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _libCommandsContext.setupNewChromedriver)({ chromeOptions: { androidPackage: 'apkg' } }));

          case 2:
            chromedriver = context$3$0.sent;

            chromedriver.start.getCall(0).args[0].chromeOptions.androidPackage.should.be.equal('apkg');

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should use prefixed chromeOptions', function callee$2$0() {
      var chromedriver;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _libCommandsContext.setupNewChromedriver)({
              'goog:chromeOptions': {
                androidPackage: 'apkg'
              }
            }));

          case 2:
            chromedriver = context$3$0.sent;

            chromedriver.start.getCall(0).args[0].chromeOptions.androidPackage.should.be.equal('apkg');

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should merge chromeOptions', function callee$2$0() {
      var chromedriver;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _libCommandsContext.setupNewChromedriver)({
              chromeOptions: {
                androidPackage: 'apkg'
              },
              'goog:chromeOptions': {
                androidWaitPackage: 'bpkg'
              },
              'appium:chromeOptions': {
                androidActivity: 'aact'
              }
            }));

          case 2:
            chromedriver = context$3$0.sent;

            chromedriver.start.getCall(0).args[0].chromeOptions.androidPackage.should.be.equal('apkg');
            chromedriver.start.getCall(0).args[0].chromeOptions.androidActivity.should.be.equal('aact');
            chromedriver.start.getCall(0).args[0].chromeOptions.androidWaitPackage.should.be.equal('bpkg');

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should be able to set androidActivity chrome option', function callee$2$0() {
      var chromedriver;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _libCommandsContext.setupNewChromedriver)({ chromeAndroidActivity: 'act' }));

          case 2:
            chromedriver = context$3$0.sent;

            chromedriver.start.getCall(0).args[0].chromeOptions.androidActivity.should.be.equal('act');

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should be able to set androidProcess chrome option', function callee$2$0() {
      var chromedriver;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _libCommandsContext.setupNewChromedriver)({ chromeAndroidProcess: 'proc' }));

          case 2:
            chromedriver = context$3$0.sent;

            chromedriver.start.getCall(0).args[0].chromeOptions.androidProcess.should.be.equal('proc');

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should be able to set loggingPrefs capability', function callee$2$0() {
      var chromedriver;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _libCommandsContext.setupNewChromedriver)({ enablePerformanceLogging: true }));

          case 2:
            chromedriver = context$3$0.sent;

            chromedriver.start.getCall(0).args[0].loggingPrefs.should.deep.equal({ performance: 'ALL' });

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should set androidActivity to appActivity if browser name is chromium-webview', function callee$2$0() {
      var chromedriver;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _libCommandsContext.setupNewChromedriver)({ browserName: 'chromium-webview',
              appActivity: 'app_act' }));

          case 2:
            chromedriver = context$3$0.sent;

            chromedriver.start.getCall(0).args[0].chromeOptions.androidActivity.should.be.equal('app_act');

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should be able to set loggingPrefs capability', function callee$2$0() {
      var chromedriver;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _libCommandsContext.setupNewChromedriver)({ pageLoadStrategy: "strategy" }));

          case 2:
            chromedriver = context$3$0.sent;

            chromedriver.start.getCall(0).args[0].pageLoadStrategy.should.be.equal("strategy");

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9jb21tYW5kcy9jb250ZXh0LXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7cUJBQzNCLE9BQU87Ozs7aUNBRTJDLDhCQUE4Qjs7OztrQ0FDN0QsK0JBQStCOztnQkFDMUMsVUFBVTs7OztrQ0FDWCxxQkFBcUI7Ozs7MEJBQ3ZCLFlBQVk7Ozs7Z0NBQ1osb0JBQW9COztBQUUzQyxJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxtQkFBbUIsWUFBQSxDQUFDO0FBQ3hCLElBQUksT0FBTyxHQUFHLG1CQUFNLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNyQyxJQUFJLE1BQU0sR0FBRyxrQkFBSyxNQUFNLENBQUM7QUFDekIsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixRQUFRLENBQUMsU0FBUyxFQUFFLFlBQVk7QUFDOUIsWUFBVSxDQUFDLFlBQU07QUFDZixXQUFPLENBQUMsSUFBSSwwQkFBYSxTQUFTLEVBQUUsVUFBVSxFQUFFLEVBQUU7O0FBQ2hELGFBQU8sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztLQUN2QixDQUFDLENBQUM7QUFDSCxVQUFNLEdBQUcsbUJBQW1CLENBQUM7QUFDN0IsVUFBTSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDNUIsVUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0FBQ3JDLFVBQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzRCxXQUFPLENBQUMsSUFBSSxDQUFDLGdDQUFhLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNoRCxXQUFPLENBQUMsSUFBSSxDQUFDLGdDQUFhLFNBQVMs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LENBQ25ELE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7Ozs7O0tBQ2hDLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3VuaXQvY29tbWFuZHMvY29udGV4dC1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xyXG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XHJcbmltcG9ydCBzaW5vbiBmcm9tICdzaW5vbic7XHJcbmltcG9ydCB7IGRlZmF1bHQgYXMgd2Vidmlld0hlbHBlcnMsXHJcbiAgICAgICAgIE5BVElWRV9XSU4sIFdFQlZJRVdfQkFTRSwgV0VCVklFV19XSU4sIENIUk9NSVVNX1dJTiB9IGZyb20gJy4uLy4uLy4uL2xpYi93ZWJ2aWV3LWhlbHBlcnMnO1xyXG5pbXBvcnQgeyBzZXR1cE5ld0Nocm9tZWRyaXZlciB9IGZyb20gJy4uLy4uLy4uL2xpYi9jb21tYW5kcy9jb250ZXh0JztcclxuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4nO1xyXG5pbXBvcnQgQ2hyb21lZHJpdmVyIGZyb20gJ2FwcGl1bS1jaHJvbWVkcml2ZXInO1xyXG5pbXBvcnQgUG9ydEZpbmRlciBmcm9tICdwb3J0ZmluZGVyJztcclxuaW1wb3J0IHsgZXJyb3JzIH0gZnJvbSAnYXBwaXVtLWJhc2UtZHJpdmVyJztcclxuXHJcbmxldCBkcml2ZXI7XHJcbmxldCBzdHViYmVkQ2hyb21lZHJpdmVyO1xyXG5sZXQgc2FuZGJveCA9IHNpbm9uLnNhbmRib3guY3JlYXRlKCk7XHJcbmxldCBleHBlY3QgPSBjaGFpLmV4cGVjdDtcclxuY2hhaS5zaG91bGQoKTtcclxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xyXG5cclxuZGVzY3JpYmUoJ0NvbnRleHQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgYmVmb3JlRWFjaCgoKSA9PiB7XHJcbiAgICBzYW5kYm94LnN0dWIoUG9ydEZpbmRlciwgJ2dldFBvcnQnLCBmdW5jdGlvbiAoY2IpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBwcm9taXNlL3ByZWZlci1hd2FpdC10by1jYWxsYmFja3NcclxuICAgICAgcmV0dXJuIGNiKG51bGwsIDQ0NDQpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHByb21pc2UvcHJlZmVyLWF3YWl0LXRvLWNhbGxiYWNrc1xyXG4gICAgfSk7XHJcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xyXG4gICAgZHJpdmVyLmFkYiA9IHNhbmRib3guc3R1YigpO1xyXG4gICAgZHJpdmVyLmFkYi5jdXJEZXZpY2VJZCA9ICdkZXZpY2VfaWQnO1xyXG4gICAgZHJpdmVyLmFkYi5nZXRBZGJTZXJ2ZXJQb3J0ID0gc2FuZGJveC5zdHViKCkucmV0dXJucyg1NTU1KTtcclxuICAgIHNhbmRib3guc3R1YihDaHJvbWVkcml2ZXIucHJvdG90eXBlLCAncmVzdGFydCcpO1xyXG4gICAgc2FuZGJveC5zdHViKENocm9tZWRyaXZlci5wcm90b3R5cGUsICdzdGFydCcpO1xyXG4gICAgc2FuZGJveC5zdHViKENocm9tZWRyaXZlci5wcm90b3R5cGUucHJveHlSZXEsICdiaW5kJykucmV0dXJucygncHJveHknKTtcclxuXHJcbiAgICBzdHViYmVkQ2hyb21lZHJpdmVyID0gc2lub24uc3R1YigpO1xyXG4gICAgc3R1YmJlZENocm9tZWRyaXZlci5wcm94eVJlcSA9IHNpbm9uLnN0dWIoKTtcclxuICAgIHN0dWJiZWRDaHJvbWVkcml2ZXIucHJveHlSZXEuYmluZCA9IHNpbm9uLnN0dWIoKTtcclxuICAgIHN0dWJiZWRDaHJvbWVkcml2ZXIucmVzdGFydCA9IHNpbm9uLnN0dWIoKTtcclxuICAgIHN0dWJiZWRDaHJvbWVkcml2ZXIuc3RvcCA9IHNhbmRib3guc3R1YigpLnRocm93cygpO1xyXG4gICAgc3R1YmJlZENocm9tZWRyaXZlci5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBzYW5kYm94LnN0dWIoKTtcclxuICB9KTtcclxuICBhZnRlckVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgc2FuZGJveC5yZXN0b3JlKCk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ2dldEN1cnJlbnRDb250ZXh0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gY3VycmVudCBjb250ZXh0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBkcml2ZXIuY3VyQ29udGV4dCA9ICdjdXJyZW50X2NvbnRleHQnO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0Q3VycmVudENvbnRleHQoKS5zaG91bGQuYmVjb21lKCdjdXJyZW50X2NvbnRleHQnKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdnZXRDb250ZXh0cycsIGZ1bmN0aW9uICgpIHtcclxuICAgIGl0KCdzaG91bGQgZ2V0IENocm9taXVtIGNvbnRleHQgd2hlcmUgYXBwcm9wcmlhdGUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKHticm93c2VyTmFtZTogJ0Nocm9tZSd9KTtcclxuICAgICAgZXhwZWN0KGF3YWl0IGRyaXZlci5nZXRDb250ZXh0cygpKS50by5pbmNsdWRlKENIUk9NSVVNX1dJTik7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdXNlIEFEQiB0byBmaWd1cmUgb3V0IHdoaWNoIHdlYnZpZXdzIGFyZSBhdmFpbGFibGUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHNhbmRib3guc3R1Yih3ZWJ2aWV3SGVscGVycywgJ2dldFdlYnZpZXdzJyk7XHJcbiAgICAgIGV4cGVjdChhd2FpdCBkcml2ZXIuZ2V0Q29udGV4dHMoKSkudG8ubm90LmluY2x1ZGUoQ0hST01JVU1fV0lOKTtcclxuICAgICAgd2Vidmlld0hlbHBlcnMuZ2V0V2Vidmlld3MuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdzZXRDb250ZXh0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdnZXRDb250ZXh0cycpLnJldHVybnMoWydERUZBVUxUJywgJ1dWJywgJ0FOT1RIRVInXSk7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdzd2l0Y2hDb250ZXh0Jyk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgc3dpdGNoIHRvIGRlZmF1bHQgY29udGV4dCBpZiBuYW1lIGlzIG51bGwnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdkZWZhdWx0Q29udGV4dE5hbWUnKS5yZXR1cm5zKCdERUZBVUxUJyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5zZXRDb250ZXh0KG51bGwpO1xyXG4gICAgICBkcml2ZXIuc3dpdGNoQ29udGV4dC5jYWxsZWRXaXRoRXhhY3RseSgnREVGQVVMVCcpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBkcml2ZXIuY3VyQ29udGV4dC5zaG91bGQuYmUuZXF1YWwoJ0RFRkFVTFQnKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBzd2l0Y2ggdG8gZGVmYXVsdCB3ZWIgdmlldyBpZiBuYW1lIGlzIFdFQlZJRVcnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdkZWZhdWx0V2Vidmlld05hbWUnKS5yZXR1cm5zKCdXVicpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuc2V0Q29udGV4dChXRUJWSUVXX1dJTik7XHJcbiAgICAgIGRyaXZlci5zd2l0Y2hDb250ZXh0LmNhbGxlZFdpdGhFeGFjdGx5KCdXVicpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBkcml2ZXIuY3VyQ29udGV4dC5zaG91bGQuYmUuZXF1YWwoJ1dWJyk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdGhyb3cgZXJyb3IgaWYgY29udGV4dCBkb2VzIG5vdCBleGlzdCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgYXdhaXQgZHJpdmVyLnNldENvbnRleHQoJ2Zha2UnKVxyXG4gICAgICAgIC5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKGVycm9ycy5Ob1N1Y2hDb250ZXh0RXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIG5vdCBzd2l0Y2ggdG8gY29udGV4dCBpZiBhbHJlYWR5IGluIGl0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBkcml2ZXIuY3VyQ29udGV4dCA9ICdBTk9USEVSJztcclxuICAgICAgYXdhaXQgZHJpdmVyLnNldENvbnRleHQoJ0FOT1RIRVInKTtcclxuICAgICAgZHJpdmVyLnN3aXRjaENvbnRleHQubm90Q2FsbGVkLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ3N3aXRjaENvbnRleHQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ3N0b3BDaHJvbWVkcml2ZXJQcm94aWVzJyk7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdzdGFydENocm9tZWRyaXZlclByb3h5Jyk7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdzdXNwZW5kQ2hyb21lZHJpdmVyUHJveHknKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2lzQ2hyb21lZHJpdmVyQ29udGV4dCcpO1xyXG4gICAgICBkcml2ZXIuY3VyQ29udGV4dCA9ICdjdXJyZW50X2NudHgnO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHN0YXJ0IGNocm9tZSBkcml2ZXIgcHJveHkgaWYgcmVxdWVzdGVkIGNvbnRleHQgaXMgd2VidmlldycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgZHJpdmVyLmlzQ2hyb21lZHJpdmVyQ29udGV4dC5yZXR1cm5zKHRydWUpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuc3dpdGNoQ29udGV4dCgnY29udGV4dCcpO1xyXG4gICAgICBkcml2ZXIuc3RhcnRDaHJvbWVkcml2ZXJQcm94eS5jYWxsZWRXaXRoRXhhY3RseSgnY29udGV4dCcpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHN0b3AgY2hyb21lZHJpdmVyIHByb3h5IGlmIGN1cnJlbnQgY29udGV4dCBpcyB3ZWJ2aWV3IGFuZCByZXF1ZXN0ZWQgY29udGV4dCBpcyBub3QnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGRyaXZlci5vcHRzID0ge3JlY3JlYXRlQ2hyb21lRHJpdmVyU2Vzc2lvbnM6IHRydWV9O1xyXG4gICAgICBkcml2ZXIuaXNDaHJvbWVkcml2ZXJDb250ZXh0LndpdGhBcmdzKCdyZXF1ZXN0ZWRfY250eCcpLnJldHVybnMoZmFsc2UpO1xyXG4gICAgICBkcml2ZXIuaXNDaHJvbWVkcml2ZXJDb250ZXh0LndpdGhBcmdzKCdjdXJyZW50X2NudHgnKS5yZXR1cm5zKHRydWUpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuc3dpdGNoQ29udGV4dCgncmVxdWVzdGVkX2NudHgnKTtcclxuICAgICAgZHJpdmVyLnN0b3BDaHJvbWVkcml2ZXJQcm94aWVzLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgc3VzcGVuZCBjaHJvbWUgZHJpdmVyIHByb3h5IGlmIGN1cnJlbnQgY29udGV4dCBpcyB3ZWJ2aWV3IGFuZCByZXF1ZXN0ZWQgY29udGV4dCBpcyBub3QnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGRyaXZlci5vcHRzID0ge3JlY3JlYXRlQ2hyb21lRHJpdmVyU2Vzc2lvbnM6IGZhbHNlfTtcclxuICAgICAgZHJpdmVyLmlzQ2hyb21lZHJpdmVyQ29udGV4dC53aXRoQXJncygncmVxdWVzdGVkX2NudHgnKS5yZXR1cm5zKGZhbHNlKTtcclxuICAgICAgZHJpdmVyLmlzQ2hyb21lZHJpdmVyQ29udGV4dC53aXRoQXJncygnY3VycmVudF9jbnR4JykucmV0dXJucyh0cnVlKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLnN3aXRjaENvbnRleHQoJ3JlcXVlc3RlZF9jbnR4Jyk7XHJcbiAgICAgIGRyaXZlci5zdXNwZW5kQ2hyb21lZHJpdmVyUHJveHkuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBlcnJvciBpZiByZXF1ZXN0ZWQgYW5kIGN1cnJlbnQgY29udGV4dCBhcmUgbm90IHdlYnZpZXcnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGRyaXZlci5pc0Nocm9tZWRyaXZlckNvbnRleHQud2l0aEFyZ3MoJ3JlcXVlc3RlZF9jbnR4JykucmV0dXJucyhmYWxzZSk7XHJcbiAgICAgIGRyaXZlci5pc0Nocm9tZWRyaXZlckNvbnRleHQud2l0aEFyZ3MoJ2N1cnJlbnRfY250eCcpLnJldHVybnMoZmFsc2UpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuc3dpdGNoQ29udGV4dCgncmVxdWVzdGVkX2NudHgnKVxyXG4gICAgICAgIC5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKC9zd2l0Y2hpbmcgdG8gY29udGV4dC8pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ2RlZmF1bHRDb250ZXh0TmFtZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIGl0KCdzaG91bGQgcmV0dXJuIE5BVElWRV9XSU4nLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5kZWZhdWx0Q29udGV4dE5hbWUoKS5zaG91bGQuYmUuZXF1YWwoTkFUSVZFX1dJTik7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnZGVmYXVsdFdlYnZpZXdOYW1lJywgZnVuY3Rpb24gKCkge1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gV0VCVklFVyB3aXRoIHBhY2thZ2UnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGRyaXZlci5vcHRzID0ge2FwcFBhY2thZ2U6ICdwa2cnfTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmRlZmF1bHRXZWJ2aWV3TmFtZSgpLnNob3VsZC5iZS5lcXVhbChXRUJWSUVXX0JBU0UgKyAncGtnJyk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnaXNXZWJDb250ZXh0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBjdXJyZW50IGNvbnRleHQgaXMgbm90IG5hdGl2ZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgZHJpdmVyLmN1ckNvbnRleHQgPSAnY3VycmVudF9jb250ZXh0JztcclxuICAgICAgYXdhaXQgZHJpdmVyLmlzV2ViQ29udGV4dCgpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ3N0YXJ0Q2hyb21lZHJpdmVyUHJveHknLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ29uQ2hyb21lZHJpdmVyU3RvcCcpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHN0YXJ0IG5ldyBjaHJvbWVkcml2ZXIgc2Vzc2lvbicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0Q2hyb21lZHJpdmVyUHJveHkoJ1dFQlZJRVdfMScpO1xyXG4gICAgICBkcml2ZXIuc2Vzc2lvbkNocm9tZWRyaXZlcnMuV0VCVklFV18xLnNob3VsZC5iZS5lcXVhbChkcml2ZXIuY2hyb21lZHJpdmVyKTtcclxuICAgICAgZHJpdmVyLmNocm9tZWRyaXZlci5zdGFydC5nZXRDYWxsKDApLmFyZ3NbMF1cclxuICAgICAgICAuY2hyb21lT3B0aW9ucy5hbmRyb2lkRGV2aWNlU2VyaWFsLnNob3VsZC5iZS5lcXVhbCgnZGV2aWNlX2lkJyk7XHJcbiAgICAgIGRyaXZlci5jaHJvbWVkcml2ZXIucHJveHlQb3J0LnNob3VsZC5iZS5lcXVhbCg0NDQ0KTtcclxuICAgICAgZHJpdmVyLmNocm9tZWRyaXZlci5wcm94eVJlcS5iaW5kLmNhbGxlZFdpdGhFeGFjdGx5KGRyaXZlci5jaHJvbWVkcml2ZXIpO1xyXG4gICAgICBkcml2ZXIucHJveHlSZXFSZXMuc2hvdWxkLmJlLmVxdWFsKCdwcm94eScpO1xyXG4gICAgICBkcml2ZXIuandwUHJveHlBY3RpdmUuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBleHRyYWN0IHBhY2thZ2UgZnJvbSBjb250ZXh0IG5hbWUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGRyaXZlci5vcHRzLmFwcFBhY2thZ2UgPSAncGtnJztcclxuICAgICAgZHJpdmVyLm9wdHMuZXh0cmFjdENocm9tZUFuZHJvaWRQYWNrYWdlRnJvbUNvbnRleHROYW1lID0gdHJ1ZTtcclxuICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0Q2hyb21lZHJpdmVyUHJveHkoJ1dFQlZJRVdfY29tLnBrZycpO1xyXG4gICAgICBkcml2ZXIuY2hyb21lZHJpdmVyLnN0YXJ0LmdldENhbGwoMCkuYXJnc1swXVxyXG4gICAgICAgIC5jaHJvbWVPcHRpb25zLnNob3VsZC5iZS5kZWVwLmluY2x1ZGUoe2FuZHJvaWRQYWNrYWdlOiAnY29tLnBrZyd9KTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB1c2UgcGFja2FnZSBmcm9tIG9wdHMgaWYgcGFja2FnZSBleHRyYWN0ZWQgZnJvbSBjb250ZXh0IGlzIGVtcHR5JywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBkcml2ZXIub3B0cy5hcHBQYWNrYWdlID0gJ3BrZyc7XHJcbiAgICAgIGRyaXZlci5vcHRzLmV4dHJhY3RDaHJvbWVBbmRyb2lkUGFja2FnZUZyb21Db250ZXh0TmFtZSA9IHRydWU7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydENocm9tZWRyaXZlclByb3h5KCdXRUJWSUVXXycpO1xyXG4gICAgICBkcml2ZXIuY2hyb21lZHJpdmVyLnN0YXJ0LmdldENhbGwoMCkuYXJnc1swXVxyXG4gICAgICAgIC5jaHJvbWVPcHRpb25zLnNob3VsZC5iZS5kZWVwLmluY2x1ZGUoe2FuZHJvaWRQYWNrYWdlOiAncGtnJ30pO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGhhbmRsZSBjaHJvbWVkcml2ZXIgZXZlbnQgd2l0aCBTVEFURV9TVE9QUEVEIHN0YXRlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBhd2FpdCBkcml2ZXIuc3RhcnRDaHJvbWVkcml2ZXJQcm94eSgnV0VCVklFV18xJyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5jaHJvbWVkcml2ZXIuZW1pdChDaHJvbWVkcml2ZXIuRVZFTlRfQ0hBTkdFRCxcclxuICAgICAgICB7c3RhdGU6IENocm9tZWRyaXZlci5TVEFURV9TVE9QUEVEfSk7XHJcbiAgICAgIGRyaXZlci5vbkNocm9tZWRyaXZlclN0b3AuY2FsbGVkV2l0aEV4YWN0bHkoJ1dFQlZJRVdfMScpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGlnbm9yZSBldmVudHMgaWYgc3RhdHVzIGlzIG5vdCBTVEFURV9TVE9QUEVEJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBhd2FpdCBkcml2ZXIuc3RhcnRDaHJvbWVkcml2ZXJQcm94eSgnV0VCVklFV18xJyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5jaHJvbWVkcml2ZXIuZW1pdChDaHJvbWVkcml2ZXIuRVZFTlRfQ0hBTkdFRCxcclxuICAgICAgICB7c3RhdGU6ICd1bmhhbmRsZWRfc3RhdGUnfSk7XHJcbiAgICAgIGRyaXZlci5vbkNocm9tZWRyaXZlclN0b3Aubm90Q2FsbGVkLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHJlY29ubmVjdCBpZiBzZXNzaW9uIGFscmVhZHkgZXhpc3RzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBzdHViYmVkQ2hyb21lZHJpdmVyLmhhc1dvcmtpbmdXZWJ2aWV3ID0gc2lub24uc3R1YigpLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIGRyaXZlci5zZXNzaW9uQ2hyb21lZHJpdmVycyA9IHtXRUJWSUVXXzE6IHN0dWJiZWRDaHJvbWVkcml2ZXJ9O1xyXG4gICAgICBhd2FpdCBkcml2ZXIuc3RhcnRDaHJvbWVkcml2ZXJQcm94eSgnV0VCVklFV18xJyk7XHJcbiAgICAgIGRyaXZlci5jaHJvbWVkcml2ZXIucmVzdGFydC5ub3RDYWxsZWQuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGRyaXZlci5jaHJvbWVkcml2ZXIuc2hvdWxkLmJlLmVxdWFsKHN0dWJiZWRDaHJvbWVkcml2ZXIpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHJlc3RhcnQgaWYgY2hyb21lZHJpdmVyIGhhcyBub3Qgd29ya2luZyB3ZWIgdmlldycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgc3R1YmJlZENocm9tZWRyaXZlci5oYXNXb3JraW5nV2VidmlldyA9IHNpbm9uLnN0dWIoKS5yZXR1cm5zKGZhbHNlKTtcclxuICAgICAgZHJpdmVyLnNlc3Npb25DaHJvbWVkcml2ZXJzID0ge1dFQlZJRVdfMTogc3R1YmJlZENocm9tZWRyaXZlcn07XHJcbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydENocm9tZWRyaXZlclByb3h5KCdXRUJWSUVXXzEnKTtcclxuICAgICAgZHJpdmVyLmNocm9tZWRyaXZlci5yZXN0YXJ0LmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnc3VzcGVuZENocm9tZWRyaXZlclByb3h5JywgZnVuY3Rpb24gKCkge1xyXG4gICAgaXQoJ3Nob3VsZCBzdXNwZW5kIGNocm9tZSBkcml2ZXIgcHJveHknLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5zdXNwZW5kQ2hyb21lZHJpdmVyUHJveHkoKTtcclxuICAgICAgKGRyaXZlci5jaHJvbWVkcml2ZXIgPT0gbnVsbCkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIChkcml2ZXIucHJveHlSZXFSZXMgPT0gbnVsbCkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGRyaXZlci5qd3BQcm94eUFjdGl2ZS5zaG91bGQuYmUuZmFsc2U7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnb25DaHJvbWVkcml2ZXJTdG9wJywgZnVuY3Rpb24gKCkge1xyXG4gICAgaXQoJ3Nob3VsZCBjYWxsIHN0YXJ0VW5leHBlY3RlZFNodXRkb3duIGlmIGNocm9tZWRyaXZlciBpbiBhY3RpdmUgY29udGV4dCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgc2lub24uc3R1Yihkcml2ZXIsICdzdGFydFVuZXhwZWN0ZWRTaHV0ZG93bicpO1xyXG4gICAgICBkcml2ZXIuY3VyQ29udGV4dCA9ICdXRUJWSUVXXzEnO1xyXG4gICAgICBhd2FpdCBkcml2ZXIub25DaHJvbWVkcml2ZXJTdG9wKCdXRUJWSUVXXzEnKTtcclxuICAgICAgbGV0IGFyZzAgPSBkcml2ZXIuc3RhcnRVbmV4cGVjdGVkU2h1dGRvd24uZ2V0Q2FsbCgwKS5hcmdzWzBdO1xyXG4gICAgICBhcmcwLnNob3VsZC5iZS5hbignZXJyb3InKTtcclxuICAgICAgYXJnMC5tZXNzYWdlLnNob3VsZC5pbmNsdWRlKCdDaHJvbWVkcml2ZXIgcXVpdCB1bmV4cGVjdGVkbHkgZHVyaW5nIHNlc3Npb24nKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBkZWxldGUgc2Vzc2lvbiBpZiBjaHJvbWVkcml2ZXIgaW4gbm9uLWFjdGl2ZSBjb250ZXh0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBkcml2ZXIuY3VyQ29udGV4dCA9ICdXRUJWSUVXXzEnO1xyXG4gICAgICBkcml2ZXIuc2Vzc2lvbkNocm9tZWRyaXZlcnMgPSB7V0VCVklFV18yOiAnQ0hST01JVU0nfTtcclxuICAgICAgYXdhaXQgZHJpdmVyLm9uQ2hyb21lZHJpdmVyU3RvcCgnV0VCVklFV18yJyk7XHJcbiAgICAgIGRyaXZlci5zZXNzaW9uQ2hyb21lZHJpdmVycy5zaG91bGQuYmUuZW1wdHk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnc3RvcENocm9tZWRyaXZlclByb3hpZXMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpdCgnc2hvdWxkIHN0b3AgYWxsIGNocm9tZWRyaXZlcicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgZHJpdmVyLnNlc3Npb25DaHJvbWVkcml2ZXJzID0ge1dFQlZJRVdfMTogc3R1YmJlZENocm9tZWRyaXZlciwgV0VCVklFV18yOiBzdHViYmVkQ2hyb21lZHJpdmVyfTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ3N1c3BlbmRDaHJvbWVkcml2ZXJQcm94eScpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuc3RvcENocm9tZWRyaXZlclByb3hpZXMoKTtcclxuICAgICAgZHJpdmVyLnN1c3BlbmRDaHJvbWVkcml2ZXJQcm94eS5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBzdHViYmVkQ2hyb21lZHJpdmVyLnJlbW92ZUFsbExpc3RlbmVyc1xyXG4gICAgICAgIC5jYWxsZWRXaXRoRXhhY3RseShDaHJvbWVkcml2ZXIuRVZFTlRfQ0hBTkdFRCkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIHN0dWJiZWRDaHJvbWVkcml2ZXIucmVtb3ZlQWxsTGlzdGVuZXJzLmNhbGxlZFR3aWNlLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBzdHViYmVkQ2hyb21lZHJpdmVyLnN0b3AuY2FsbGVkVHdpY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGRyaXZlci5zZXNzaW9uQ2hyb21lZHJpdmVycy5zaG91bGQuYmUuZW1wdHk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnaXNDaHJvbWVkcml2ZXJDb250ZXh0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBjb250ZXh0IGlzIHdlYnZpZXcgb3IgY2hyb21pdW0nLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5pc0Nocm9tZWRyaXZlckNvbnRleHQoV0VCVklFV19XSU4gKyAnXzEnKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmlzQ2hyb21lZHJpdmVyQ29udGV4dChDSFJPTUlVTV9XSU4pLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ3NldHVwTmV3Q2hyb21lZHJpdmVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIHNldCBhcHAgcGFja2FnZSBmcm9tIGNocm9tZSBvcHRpb25zJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgY2hyb21lZHJpdmVyID0gYXdhaXQgc2V0dXBOZXdDaHJvbWVkcml2ZXIoe2Nocm9tZU9wdGlvbnM6IHthbmRyb2lkUGFja2FnZTogJ2Fwa2cnfX0pO1xyXG4gICAgICBjaHJvbWVkcml2ZXIuc3RhcnQuZ2V0Q2FsbCgwKS5hcmdzWzBdLmNocm9tZU9wdGlvbnMuYW5kcm9pZFBhY2thZ2VcclxuICAgICAgICAuc2hvdWxkLmJlLmVxdWFsKCdhcGtnJyk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdXNlIHByZWZpeGVkIGNocm9tZU9wdGlvbnMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCBjaHJvbWVkcml2ZXIgPSBhd2FpdCBzZXR1cE5ld0Nocm9tZWRyaXZlcih7XHJcbiAgICAgICAgJ2dvb2c6Y2hyb21lT3B0aW9ucyc6IHtcclxuICAgICAgICAgIGFuZHJvaWRQYWNrYWdlOiAnYXBrZycsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIGNocm9tZWRyaXZlci5zdGFydC5nZXRDYWxsKDApLmFyZ3NbMF0uY2hyb21lT3B0aW9ucy5hbmRyb2lkUGFja2FnZVxyXG4gICAgICAgIC5zaG91bGQuYmUuZXF1YWwoJ2Fwa2cnKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBtZXJnZSBjaHJvbWVPcHRpb25zJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgY2hyb21lZHJpdmVyID0gYXdhaXQgc2V0dXBOZXdDaHJvbWVkcml2ZXIoe1xyXG4gICAgICAgIGNocm9tZU9wdGlvbnM6IHtcclxuICAgICAgICAgIGFuZHJvaWRQYWNrYWdlOiAnYXBrZycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnZ29vZzpjaHJvbWVPcHRpb25zJzoge1xyXG4gICAgICAgICAgYW5kcm9pZFdhaXRQYWNrYWdlOiAnYnBrZycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnYXBwaXVtOmNocm9tZU9wdGlvbnMnOiB7XHJcbiAgICAgICAgICBhbmRyb2lkQWN0aXZpdHk6ICdhYWN0JyxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgICAgY2hyb21lZHJpdmVyLnN0YXJ0LmdldENhbGwoMCkuYXJnc1swXS5jaHJvbWVPcHRpb25zLmFuZHJvaWRQYWNrYWdlXHJcbiAgICAgICAgLnNob3VsZC5iZS5lcXVhbCgnYXBrZycpO1xyXG4gICAgICBjaHJvbWVkcml2ZXIuc3RhcnQuZ2V0Q2FsbCgwKS5hcmdzWzBdLmNocm9tZU9wdGlvbnMuYW5kcm9pZEFjdGl2aXR5XHJcbiAgICAgICAgLnNob3VsZC5iZS5lcXVhbCgnYWFjdCcpO1xyXG4gICAgICBjaHJvbWVkcml2ZXIuc3RhcnQuZ2V0Q2FsbCgwKS5hcmdzWzBdLmNocm9tZU9wdGlvbnMuYW5kcm9pZFdhaXRQYWNrYWdlXHJcbiAgICAgICAgLnNob3VsZC5iZS5lcXVhbCgnYnBrZycpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gc2V0IGFuZHJvaWRBY3Rpdml0eSBjaHJvbWUgb3B0aW9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgY2hyb21lZHJpdmVyID0gYXdhaXQgc2V0dXBOZXdDaHJvbWVkcml2ZXIoe2Nocm9tZUFuZHJvaWRBY3Rpdml0eTogJ2FjdCd9KTtcclxuICAgICAgY2hyb21lZHJpdmVyLnN0YXJ0LmdldENhbGwoMCkuYXJnc1swXS5jaHJvbWVPcHRpb25zLmFuZHJvaWRBY3Rpdml0eVxyXG4gICAgICAgIC5zaG91bGQuYmUuZXF1YWwoJ2FjdCcpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gc2V0IGFuZHJvaWRQcm9jZXNzIGNocm9tZSBvcHRpb24nLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCBjaHJvbWVkcml2ZXIgPSBhd2FpdCBzZXR1cE5ld0Nocm9tZWRyaXZlcih7Y2hyb21lQW5kcm9pZFByb2Nlc3M6ICdwcm9jJ30pO1xyXG4gICAgICBjaHJvbWVkcml2ZXIuc3RhcnQuZ2V0Q2FsbCgwKS5hcmdzWzBdLmNocm9tZU9wdGlvbnMuYW5kcm9pZFByb2Nlc3NcclxuICAgICAgICAuc2hvdWxkLmJlLmVxdWFsKCdwcm9jJyk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBzZXQgbG9nZ2luZ1ByZWZzIGNhcGFiaWxpdHknLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCBjaHJvbWVkcml2ZXIgPSBhd2FpdCBzZXR1cE5ld0Nocm9tZWRyaXZlcih7ZW5hYmxlUGVyZm9ybWFuY2VMb2dnaW5nOiB0cnVlfSk7XHJcbiAgICAgIGNocm9tZWRyaXZlci5zdGFydC5nZXRDYWxsKDApLmFyZ3NbMF0ubG9nZ2luZ1ByZWZzXHJcbiAgICAgICAgLnNob3VsZC5kZWVwLmVxdWFsKHtwZXJmb3JtYW5jZTogJ0FMTCd9KTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBzZXQgYW5kcm9pZEFjdGl2aXR5IHRvIGFwcEFjdGl2aXR5IGlmIGJyb3dzZXIgbmFtZSBpcyBjaHJvbWl1bS13ZWJ2aWV3JywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgY2hyb21lZHJpdmVyID0gYXdhaXQgc2V0dXBOZXdDaHJvbWVkcml2ZXIoe2Jyb3dzZXJOYW1lOiAnY2hyb21pdW0td2VidmlldycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwQWN0aXZpdHk6ICdhcHBfYWN0J30pO1xyXG4gICAgICBjaHJvbWVkcml2ZXIuc3RhcnQuZ2V0Q2FsbCgwKS5hcmdzWzBdLmNocm9tZU9wdGlvbnMuYW5kcm9pZEFjdGl2aXR5XHJcbiAgICAgICAgLnNob3VsZC5iZS5lcXVhbCgnYXBwX2FjdCcpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gc2V0IGxvZ2dpbmdQcmVmcyBjYXBhYmlsaXR5JywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgY2hyb21lZHJpdmVyID0gYXdhaXQgc2V0dXBOZXdDaHJvbWVkcml2ZXIoe3BhZ2VMb2FkU3RyYXRlZ3k6IFwic3RyYXRlZ3lcIn0pO1xyXG4gICAgICBjaHJvbWVkcml2ZXIuc3RhcnQuZ2V0Q2FsbCgwKS5hcmdzWzBdLnBhZ2VMb2FkU3RyYXRlZ3lcclxuICAgICAgICAuc2hvdWxkLmJlLmVxdWFsKFwic3RyYXRlZ3lcIik7XHJcbiAgICB9KTtcclxuICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLlxcLi4ifQ==
