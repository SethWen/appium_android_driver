'use strict';

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _appiumAndroidBootstrap = require('appium-android-bootstrap');

var _appiumAndroidBootstrap2 = _interopRequireDefault(_appiumAndroidBootstrap);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mockFs = require('mock-fs');

var _mockFs2 = _interopRequireDefault(_mockFs);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var _libAndroidHelpers = require('../../../lib/android-helpers');

var _libAndroidHelpers2 = _interopRequireDefault(_libAndroidHelpers);

var _appiumSupport = require('appium-support');

var support = _interopRequireWildcard(_appiumSupport);

var _temp = require('temp');

var _temp2 = _interopRequireDefault(_temp);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _jimp = require('jimp');

var _jimp2 = _interopRequireDefault(_jimp);

var _libCommandsActions = require('../../../lib/commands/actions');

var _libCommandsActions2 = _interopRequireDefault(_libCommandsActions);

var _teen_process = require('teen_process');

var teen_process = _interopRequireWildcard(_teen_process);

var driver = undefined;
var sandbox = _sinon2['default'].sandbox.create();
_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Actions', function () {
  beforeEach(function () {
    driver = new _2['default']();
    driver.adb = new _appiumAdb2['default']();
    driver.bootstrap = new _appiumAndroidBootstrap2['default']();
    sandbox.stub(driver.bootstrap, 'sendAction');
  });
  afterEach(function () {
    sandbox.restore();
  });
  describe('keyevent', function () {
    it('shoudle be able to execute keyevent via pressKeyCode', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'pressKeyCode');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.keyevent('66', 'meta'));

          case 3:
            driver.pressKeyCode.calledWithExactly('66', 'meta').should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should set metastate to null by default', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'pressKeyCode');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.keyevent('66'));

          case 3:
            driver.pressKeyCode.calledWithExactly('66', null).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('pressKeyCode', function () {
    it('shoudle be able to press key code', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.pressKeyCode('66', 'meta'));

          case 2:
            driver.bootstrap.sendAction.calledWithExactly('pressKeyCode', { keycode: '66', metastate: 'meta' }).should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should set metastate to null by default', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.pressKeyCode('66'));

          case 2:
            driver.bootstrap.sendAction.calledWithExactly('pressKeyCode', { keycode: '66', metastate: null }).should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('longPressKeyCode', function () {
    it('shoudle be able to press key code', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.longPressKeyCode('66', 'meta'));

          case 2:
            driver.bootstrap.sendAction.calledWithExactly('longPressKeyCode', { keycode: '66', metastate: 'meta' }).should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should set metastate to null by default', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.longPressKeyCode('66'));

          case 2:
            driver.bootstrap.sendAction.calledWithExactly('longPressKeyCode', { keycode: '66', metastate: null }).should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('getOrientation', function () {
    it('shoudle be able to get orientation', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.bootstrap.sendAction.withArgs('orientation', { naturalOrientation: false }).returns('landscape');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getOrientation().should.become('LANDSCAPE'));

          case 3:
            driver.bootstrap.sendAction.calledWithExactly('orientation', { naturalOrientation: false }).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('setOrientation', function () {
    it('shoudle be able to set orientation', function callee$2$0() {
      var opts;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            opts = { orientation: 'SOMESCAPE', naturalOrientation: false };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.setOrientation('somescape'));

          case 3:
            driver.bootstrap.sendAction.calledWithExactly('orientation', opts).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('fakeFlick', function () {
    it('shoudle be able to do fake flick', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.fakeFlick(12, 34));

          case 2:
            driver.bootstrap.sendAction.calledWithExactly('flick', { xSpeed: 12, ySpeed: 34 }).should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('fakeFlickElement', function () {
    it('shoudle be able to do fake flick on element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.fakeFlickElement(5000, 56, 78, 1.32));

          case 2:
            driver.bootstrap.sendAction.calledWithExactly('element:flick', { xoffset: 56, yoffset: 78, speed: 1.32, elementId: 5000 }).should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('swipe', function () {
    it('should swipe an element', function () {
      var swipeOpts = { startX: 10, startY: 11, endX: 20, endY: 22,
        steps: 3, elementId: 'someElementId' };
      driver.swipe(10, 11, 20, 22, 0.1, null, 'someElementId');
      driver.bootstrap.sendAction.calledWithExactly('element:swipe', swipeOpts).should.be['true'];
    });
    it('should swipe without an element', function () {
      driver.swipe(0, 0, 1, 1, 0, 1);
      driver.bootstrap.sendAction.calledWith('swipe').should.be['true'];
    });
    it('should set start point to (0.5;0.5) if startX and startY are "null"', function callee$2$0() {
      var swipeOpts;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            swipeOpts = { startX: 0.5, startY: 0.5, endX: 0, endY: 0, steps: 0 };

            sandbox.stub(driver, 'doSwipe');
            driver.swipe('null', 'null', 0, 0, 0);
            driver.doSwipe.calledWithExactly(swipeOpts).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('pinchClose', function () {
    it('should be able to pinch in element', function callee$2$0() {
      var pinchOpts;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            pinchOpts = { direction: 'in', elementId: 'el01', percent: 0.5, steps: 5 };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.pinchClose(null, null, null, null, null, 0.5, 5, 'el01'));

          case 3:
            driver.bootstrap.sendAction.calledWithExactly('element:pinch', pinchOpts).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('pinchOpen', function () {
    it('should be able to pinch out element', function callee$2$0() {
      var pinchOpts;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            pinchOpts = { direction: 'out', elementId: 'el01', percent: 0.5, steps: 5 };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.pinchOpen(null, null, null, null, null, 0.5, 5, 'el01'));

          case 3:
            driver.bootstrap.sendAction.calledWithExactly('element:pinch', pinchOpts).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('flick', function () {
    it('should call fakeFlickElement if element is passed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'fakeFlickElement');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.flick('elem', null, null, 1, 2, 3));

          case 3:
            driver.fakeFlickElement.calledWith('elem', 1, 2, 3).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call fakeFlick if element is not passed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'fakeFlick');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.flick(null, 1, 2));

          case 3:
            driver.fakeFlick.calledWith(1, 2).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('drag', function () {
    var dragOpts = {
      elementId: 'elem1', destElId: 'elem2',
      startX: 1, startY: 2, endX: 3, endY: 4, steps: 1
    };
    it('should drag an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.drag(1, 2, 3, 4, 0.02, null, 'elem1', 'elem2');
            driver.bootstrap.sendAction.calledWithExactly('element:drag', dragOpts).should.be['true'];

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should drag without an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            dragOpts.elementId = null;
            driver.drag(1, 2, 3, 4, 0.02, null, null, 'elem2');
            driver.bootstrap.sendAction.calledWithExactly('drag', dragOpts).should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('lock', function () {
    it('should call adb.lock()', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'lock');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.lock());

          case 3:
            driver.adb.lock.calledOnce.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('isLocked', function () {
    it('should call adb.isScreenLocked()', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'isScreenLocked').returns('lock_status');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.isLocked().should.become('lock_status'));

          case 3:
            driver.adb.isScreenLocked.calledOnce.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('unlock', function () {
    it('should call android-helpers.unlock()', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(_libAndroidHelpers2['default'], 'unlock');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.unlock('caps'));

          case 3:
            _libAndroidHelpers2['default'].unlock.calledWithExactly(driver, driver.adb, 'caps').should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('openNotifications', function () {
    it('should be able to open notifications', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.openNotifications());

          case 2:
            driver.bootstrap.sendAction.calledWithExactly('openNotification').should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('setLocation', function () {
    it('should be able to set location', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'sendTelnetCommand');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.setLocation('lat', 'long'));

          case 3:
            driver.adb.sendTelnetCommand.calledWithExactly('geo fix long lat').should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('pullFile', function () {
    it('should be able to pull file from device', function callee$2$0() {
      var localFile;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            localFile = 'local/tmp_file';

            sandbox.stub(_temp2['default'], 'path').returns(localFile);
            sandbox.stub(driver.adb, 'pull');
            sandbox.stub(support.fs, 'readFile').withArgs(localFile).returns('appium');
            sandbox.stub(support.fs, 'exists').withArgs(localFile).returns(true);
            sandbox.stub(support.fs, 'unlink');
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(driver.pullFile('remote_path').should.become('YXBwaXVt'));

          case 8:
            driver.adb.pull.calledWithExactly('remote_path', localFile).should.be['true'];
            support.fs.unlink.calledWithExactly(localFile).should.be['true'];

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should be able to pull file located in application container from the device', function callee$2$0() {
      var localFile, packageId, remotePath, tmpPath;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            localFile = 'local/tmp_file';
            packageId = 'com.myapp';
            remotePath = 'path/in/container';
            tmpPath = '/data/local/tmp/container';

            sandbox.stub(_temp2['default'], 'path').returns(localFile);
            sandbox.stub(driver.adb, 'pull');
            sandbox.stub(driver.adb, 'shell');
            sandbox.stub(support.fs, 'readFile').withArgs(localFile).returns('appium');
            sandbox.stub(support.fs, 'exists').withArgs(localFile).returns(true);
            sandbox.stub(support.fs, 'unlink');
            context$3$0.next = 12;
            return _regeneratorRuntime.awrap(driver.pullFile('@' + packageId + '/' + remotePath).should.become('YXBwaXVt'));

          case 12:
            driver.adb.pull.calledWithExactly(tmpPath, localFile).should.be['true'];
            driver.adb.shell.calledWithExactly(['run-as', packageId, 'chmod 777 \'/data/data/' + packageId + '/' + remotePath + '\'']).should.be['true'];
            driver.adb.shell.calledWithExactly(['cp', '-f', '/data/data/' + packageId + '/' + remotePath, tmpPath]).should.be['true'];
            support.fs.unlink.calledWithExactly(localFile).should.be['true'];
            driver.adb.shell.calledWithExactly(['rm', '-f', tmpPath]).should.be['true'];

          case 17:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });

  describe('pushFile', function () {
    it('should be able to push file to device', function callee$2$0() {
      var localFile, content;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            localFile = 'local/tmp_file';
            content = 'appium';

            sandbox.stub(_temp2['default'], 'path').returns(localFile);
            sandbox.stub(driver.adb, 'push');
            sandbox.stub(support.fs, 'writeFile');
            sandbox.stub(support.fs, 'exists').withArgs(localFile).returns(true);
            sandbox.stub(support.fs, 'unlink');
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(driver.pushFile('remote_path', 'YXBwaXVt'));

          case 9:
            support.fs.writeFile.calledWithExactly(localFile, content, 'binary').should.be['true'];
            support.fs.unlink.calledWithExactly(localFile).should.be['true'];
            driver.adb.push.calledWithExactly(localFile, 'remote_path').should.be['true'];

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should be able to push file located in application container to the device', function callee$2$0() {
      var localFile, content, packageId, remotePath, tmpPath;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            localFile = 'local/tmp_file';
            content = 'appium';
            packageId = 'com.myapp';
            remotePath = 'path/in/container';
            tmpPath = '/data/local/tmp/container';

            sandbox.stub(_temp2['default'], 'path').returns(localFile);
            sandbox.stub(driver.adb, 'push');
            sandbox.stub(driver.adb, 'shell');
            sandbox.stub(support.fs, 'writeFile');
            sandbox.stub(support.fs, 'exists').withArgs(localFile).returns(true);
            sandbox.stub(support.fs, 'unlink');
            context$3$0.next = 13;
            return _regeneratorRuntime.awrap(driver.pushFile('@' + packageId + '/' + remotePath, 'YXBwaXVt'));

          case 13:
            support.fs.writeFile.calledWithExactly(localFile, content, 'binary').should.be['true'];
            driver.adb.push.calledWithExactly(localFile, tmpPath).should.be['true'];
            driver.adb.shell.calledWithExactly(['run-as', packageId, 'mkdir -p \'/data/data/' + packageId + '/path/in\'']).should.be['true'];
            driver.adb.shell.calledWithExactly(['run-as', packageId, 'touch \'/data/data/' + packageId + '/' + remotePath + '\'']).should.be['true'];
            driver.adb.shell.calledWithExactly(['run-as', packageId, 'chmod 777 \'/data/data/' + packageId + '/' + remotePath + '\'']).should.be['true'];
            driver.adb.shell.calledWithExactly(['cp', '-f', tmpPath, '/data/data/' + packageId + '/' + remotePath]).should.be['true'];
            support.fs.unlink.calledWithExactly(localFile).should.be['true'];
            driver.adb.shell.calledWithExactly(['rm', '-f', tmpPath]).should.be['true'];

          case 21:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('pullFolder', function () {
    var zippedDir = undefined,
        unzippedDir = undefined,
        tempDir = undefined,
        tempPathStub = undefined;

    before(function () {
      var _mockFS;

      // Create in-memory mock file system for file writes
      zippedDir = '/mock/path/to/zipped';
      unzippedDir = '/mock/path/to/unzipped';
      tempDir = '/mock/path/to/temp-dir';
      (0, _mockFs2['default'])((_mockFS = {}, _defineProperty(_mockFS, zippedDir, {}), _defineProperty(_mockFS, unzippedDir, {}), _defineProperty(_mockFS, tempDir, {}), _mockFS));

      // Stub temp.path to use an in-memory filepath
      tempPathStub = _sinon2['default'].stub(_temp2['default'], 'path', function () {
        return tempDir;
      });
    });

    after(function () {
      tempPathStub.restore();
      _mockFs2['default'].restore();
    });

    it('should pull a folder and return base64 zip', function callee$2$0() {
      var adbPullStub, pull, zippedBase64;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        var _this2 = this;

        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adbPullStub = undefined;

            pull = function pull(ignore, localPath) {
              return _regeneratorRuntime.async(function pull$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap(support.fs.writeFile(_path2['default'].resolve(localPath, 'a.txt'), 'hello world', { flags: 'w' }));

                  case 2:
                    context$4$0.next = 4;
                    return _regeneratorRuntime.awrap(support.fs.writeFile(_path2['default'].resolve(localPath, 'b.txt'), 'foobar', { flags: 'w' }));

                  case 4:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, _this2);
            };

            if (!driver.adb) {
              driver.adb = { pull: pull };
            } else {
              adbPullStub = _sinon2['default'].stub(driver.adb, 'pull', pull);
            }

            // Call 'driver.pullFolder' and zip the base64 contents to a .zip file
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.pullFolder('/does/not/matter'));

          case 5:
            zippedBase64 = context$3$0.sent;

            (typeof zippedBase64).should.equal('string');
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(support.fs.writeFile(_path2['default'].resolve(zippedDir, 'zipped.zip'), zippedBase64, { encoding: 'base64', flags: 'w' }));

          case 9:
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(support.zip.extractAllTo(_path2['default'].resolve(zippedDir, 'zipped.zip'), unzippedDir));

          case 11:
            context$3$0.next = 13;
            return _regeneratorRuntime.awrap(support.fs.readFile(_path2['default'].resolve(unzippedDir, 'a.txt'), 'utf8').should.eventually.equal('hello world'));

          case 13:
            context$3$0.next = 15;
            return _regeneratorRuntime.awrap(support.fs.readFile(_path2['default'].resolve(unzippedDir, 'b.txt'), 'utf8').should.eventually.equal('foobar'));

          case 15:

            // Restore stub
            if (adbPullStub) {
              adbPullStub.restore();
            } else {
              delete driver.adb;
            }

          case 16:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('fingerprint', function () {
    it('should call fingerprint adb command for emulator', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'fingerprint');
            sandbox.stub(driver, 'isEmulator').returns(true);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.fingerprint(1111));

          case 4:
            driver.adb.fingerprint.calledWithExactly(1111).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw exception for real device', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'fingerprint');
            sandbox.stub(driver, 'isEmulator').returns(false);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.fingerprint(1111).should.be.rejectedWith('fingerprint method is only available for emulators'));

          case 4:
            driver.adb.fingerprint.notCalled.should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('sendSMS', function () {
    it('should call sendSMS adb command for emulator', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'sendSMS');
            sandbox.stub(driver, 'isEmulator').returns(true);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.sendSMS(4509, 'Hello Appium'));

          case 4:
            driver.adb.sendSMS.calledWithExactly(4509, 'Hello Appium').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw exception for real device', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'sendSMS');
            sandbox.stub(driver, 'isEmulator').returns(false);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.sendSMS(4509, 'Hello Appium').should.be.rejectedWith('sendSMS method is only available for emulators'));

          case 4:
            driver.adb.sendSMS.notCalled.should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('gsmCall', function () {
    it('should call gsmCall adb command for emulator', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'gsmCall');
            sandbox.stub(driver, 'isEmulator').returns(true);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.gsmCall(4509, 'call'));

          case 4:
            driver.adb.gsmCall.calledWithExactly(4509, 'call').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw exception for real device', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'gsmCall');
            sandbox.stub(driver, 'isEmulator').returns(false);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.gsmCall(4509, 'call').should.be.rejectedWith('gsmCall method is only available for emulators'));

          case 4:
            driver.adb.gsmCall.notCalled.should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('gsmSignal', function () {
    it('should call gsmSignal adb command for emulator', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'gsmSignal');
            sandbox.stub(driver, 'isEmulator').returns(true);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.gsmSignal(3));

          case 4:
            driver.adb.gsmSignal.calledWithExactly(3).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw exception for real device', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'gsmSignal');
            sandbox.stub(driver, 'isEmulator').returns(false);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.gsmSignal(3).should.be.rejectedWith('gsmSignal method is only available for emulators'));

          case 4:
            driver.adb.gsmSignal.notCalled.should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('gsmVoice', function () {
    it('should call gsmVoice adb command for emulator', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'gsmVoice');
            sandbox.stub(driver, 'isEmulator').returns(true);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.gsmVoice('roaming'));

          case 4:
            driver.adb.gsmVoice.calledWithExactly('roaming').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw exception for real device', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'gsmVoice');
            sandbox.stub(driver, 'isEmulator').returns(false);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.gsmVoice('roaming').should.be.rejectedWith('gsmVoice method is only available for emulators'));

          case 4:
            driver.adb.gsmVoice.notCalled.should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('powerAC', function () {
    it('should call powerAC adb command for emulator', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'powerAC');
            sandbox.stub(driver, 'isEmulator').returns(true);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.powerAC('off'));

          case 4:
            driver.adb.powerAC.calledWithExactly('off').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw exception for real device', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'powerAC');
            sandbox.stub(driver, 'isEmulator').returns(false);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.powerAC('roaming').should.be.rejectedWith('powerAC method is only available for emulators'));

          case 4:
            driver.adb.powerAC.notCalled.should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('powerCapacity', function () {
    it('should call powerCapacity adb command for emulator', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'powerCapacity');
            sandbox.stub(driver, 'isEmulator').returns(true);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.powerCapacity(5));

          case 4:
            driver.adb.powerCapacity.calledWithExactly(5).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw exception for real device', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'powerCapacity');
            sandbox.stub(driver, 'isEmulator').returns(false);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.powerCapacity(5).should.be.rejectedWith('powerCapacity method is only available for emulators'));

          case 4:
            driver.adb.powerCapacity.notCalled.should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('networkSpeed', function () {
    it('should call networkSpeed adb command for emulator', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'networkSpeed');
            sandbox.stub(driver, 'isEmulator').returns(true);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.networkSpeed('gsm'));

          case 4:
            driver.adb.networkSpeed.calledWithExactly('gsm').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw exception for real device', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'networkSpeed');
            sandbox.stub(driver, 'isEmulator').returns(false);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.networkSpeed('gsm').should.be.rejectedWith('networkSpeed method is only available for emulators'));

          case 4:
            driver.adb.networkSpeed.notCalled.should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('getScreenshotDataWithAdbShell', function () {
    var defaultDir = '/data/local/tmp/';
    var png = '/path/sc.png';
    var localFile = 'local_file';
    beforeEach(function () {
      sandbox.stub(_temp2['default'], 'path');
      sandbox.stub(support.fs, 'exists');
      sandbox.stub(support.fs, 'unlink');
      sandbox.stub(driver.adb, 'shell');
      sandbox.stub(driver.adb, 'pull');
      sandbox.stub(_path2['default'].posix, 'resolve');
      sandbox.stub(_jimp2['default'], 'read');
      sandbox.stub(driver.adb, 'fileSize');
      _temp2['default'].path.returns(localFile);
      support.fs.exists.withArgs(localFile).returns(true);
      support.fs.unlink.withArgs(localFile).returns(true);
      _path2['default'].posix.resolve.withArgs(defaultDir, 'screenshot.png').returns(png);
      driver.adb.fileSize.withArgs(png).returns(1);
      _jimp2['default'].read.withArgs(localFile).returns('screenshoot_context');
    });
    it('should be able to get screenshot via adb shell', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(_libCommandsActions2['default'].getScreenshotDataWithAdbShell(driver.adb, {}).should.become('screenshoot_context'));

          case 2:
            driver.adb.shell.calledWithExactly(['/system/bin/rm', png + ';', '/system/bin/screencap', '-p', png]).should.be['true'];
            driver.adb.pull.calledWithExactly(png, localFile).should.be['true'];
            _jimp2['default'].read.calledWithExactly(localFile).should.be['true'];
            support.fs.exists.calledTwice.should.be['true'];
            support.fs.unlink.calledTwice.should.be['true'];

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be possible to change default png dir', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            _path2['default'].posix.resolve.withArgs('/custom/path/tmp/', 'screenshot.png').returns(png);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libCommandsActions2['default'].getScreenshotDataWithAdbShell(driver.adb, { androidScreenshotPath: '/custom/path/tmp/' }).should.become('screenshoot_context'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw error if size of the screenshot is zero', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.adb.fileSize.withArgs(png).returns(0);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libCommandsActions2['default'].getScreenshotDataWithAdbShell(driver.adb, {}).should.be.rejectedWith('equals to zero'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('getScreenshotDataWithAdbExecOut', function () {
    it('should be able to take screenshot via exec-out', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(teen_process, 'exec');
            sandbox.stub(_jimp2['default'], 'read');
            teen_process.exec.returns({ stdout: 'stdout', stderr: '' });
            driver.adb.executable.path = 'path/to/adb';
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(_libCommandsActions2['default'].getScreenshotDataWithAdbExecOut(driver.adb));

          case 6:
            teen_process.exec.calledWithExactly(driver.adb.executable.path, driver.adb.executable.defaultArgs.concat(['exec-out', '/system/bin/screencap', '-p']), { encoding: 'binary', isBuffer: true }).should.be['true'];
            _jimp2['default'].read.calledWithExactly('stdout').should.be['true'];

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw error if size of the screenshot is zero', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(teen_process, 'exec');
            teen_process.exec.returns({ stdout: '', stderr: '' });
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libCommandsActions2['default'].getScreenshotDataWithAdbExecOut(driver.adb).should.be.rejectedWith('Screenshot returned no data'));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw error if code is not 0', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(teen_process, 'exec');
            teen_process.exec.returns({ code: 1, stdout: '', stderr: '' });
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libCommandsActions2['default'].getScreenshotDataWithAdbExecOut(driver.adb).should.be.rejectedWith('Screenshot returned error, code: \'1\', stderr: \'\''));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw error if stderr is not empty', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(teen_process, 'exec');
            teen_process.exec.returns({ code: 0, stdout: '', stderr: 'Oops' });
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libCommandsActions2['default'].getScreenshotDataWithAdbExecOut(driver.adb).should.be.rejectedWith('Screenshot returned error, code: \'0\', stderr: \'Oops\''));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('getScreenshot', function () {
    var image = undefined;
    beforeEach(function () {
      image = new _jimp2['default'](1, 1);
      sandbox.stub(driver.adb, 'getApiLevel');
      sandbox.stub(driver.adb, 'getScreenOrientation');
      sandbox.stub(driver, 'getScreenshotDataWithAdbExecOut');
      sandbox.stub(driver, 'getScreenshotDataWithAdbShell');
      sandbox.stub(image, 'getBuffer', function (mime, cb) {
        // eslint-disable-line promise/prefer-await-to-callbacks
        return cb.call(this, null, new Buffer('appium'));
      });
      sandbox.stub(image, 'rotate');
      driver.adb.getScreenOrientation.returns(2);
      image.rotate.withArgs(-180).returns(image);
    });
    it('should be able to take screenshot via exec-out (API level > 20)', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.adb.getApiLevel.returns(24);
            driver.getScreenshotDataWithAdbExecOut.withArgs(driver.adb).returns(image);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getScreenshot().should.become('YXBwaXVt'));

          case 4:
            driver.getScreenshotDataWithAdbExecOut.calledOnce.should.be['true'];
            driver.getScreenshotDataWithAdbShell.notCalled.should.be['true'];
            image.getBuffer.calledWith(_jimp2['default'].MIME_PNG).should.be['true'];

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to take screenshot via adb shell (API level <= 20)', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.adb.getApiLevel.returns(20);
            driver.getScreenshotDataWithAdbShell.withArgs(driver.adb, driver.opts).returns(image);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getScreenshot().should.become('YXBwaXVt'));

          case 4:
            driver.getScreenshotDataWithAdbShell.calledOnce.should.be['true'];
            driver.getScreenshotDataWithAdbExecOut.notCalled.should.be['true'];
            image.getBuffer.calledWith(_jimp2['default'].MIME_PNG).should.be['true'];

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should tries to take screenshot via adb shell if exec-out failed (API level > 20)', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.adb.getApiLevel.returns(24);
            driver.getScreenshotDataWithAdbExecOut.throws();
            driver.getScreenshotDataWithAdbShell.withArgs(driver.adb, driver.opts).returns(image);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.getScreenshot().should.become('YXBwaXVt'));

          case 5:
            driver.getScreenshotDataWithAdbShell.calledOnce.should.be['true'];
            driver.getScreenshotDataWithAdbShell.calledOnce.should.be['true'];

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw error if adb shell failed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.adb.getApiLevel.returns(20);
            driver.getScreenshotDataWithAdbShell.throws();
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getScreenshot().should.be.rejectedWith('Cannot get screenshot'));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should rotate image if API level < 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.adb.getApiLevel.returns(22);
            driver.getScreenshotDataWithAdbExecOut.withArgs(driver.adb).returns(image);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getScreenshot());

          case 4:
            driver.adb.getScreenOrientation.calledOnce.should.be['true'];
            image.rotate.calledOnce.should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not rotate image if API level >= 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.adb.getApiLevel.returns(23);
            driver.getScreenshotDataWithAdbExecOut.withArgs(driver.adb).returns(image);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getScreenshot());

          case 4:
            driver.adb.getScreenOrientation.notCalled.should.be['true'];
            image.rotate.notCalled.should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not throws error if rotate image failed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            image.rotate.resetBehavior();
            image.rotate.throws();
            driver.adb.getApiLevel.returns(22);
            driver.getScreenshotDataWithAdbExecOut.withArgs(driver.adb).returns(image);
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.getScreenshot().should.be.fulfilled);

          case 6:
            image.rotate.threw().should.be['true'];

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
});

// Stub in driver.adb and make it pull a folder with two files

// Extract the zip file and verify it's contents
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9jb21tYW5kcy9hY3Rpb25zLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7cUJBQzNCLE9BQU87Ozs7c0NBQ0gsMEJBQTBCOzs7O29CQUMvQixNQUFNOzs7O3NCQUNKLFNBQVM7Ozs7Z0JBQ0YsVUFBVTs7OztpQ0FDVCw4QkFBOEI7Ozs7NkJBQ2hDLGdCQUFnQjs7SUFBN0IsT0FBTzs7b0JBQ0YsTUFBTTs7Ozt5QkFDUCxZQUFZOzs7O29CQUNYLE1BQU07Ozs7a0NBQ0gsK0JBQStCOzs7OzRCQUNyQixjQUFjOztJQUFoQyxZQUFZOztBQUV4QixJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxPQUFPLEdBQUcsbUJBQU0sT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3JDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLFNBQVMsRUFBRSxZQUFNO0FBQ3hCLFlBQVUsQ0FBQyxZQUFNO0FBQ2YsVUFBTSxHQUFHLG1CQUFtQixDQUFDO0FBQzdCLFVBQU0sQ0FBQyxHQUFHLEdBQUcsNEJBQVMsQ0FBQztBQUN2QixVQUFNLENBQUMsU0FBUyxHQUFHLHlDQUFlLENBQUM7QUFDbkMsV0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO0dBQzlDLENBQUMsQ0FBQztBQUNILFdBQVMsQ0FBQyxZQUFNO0FBQ2QsV0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0dBQ25CLENBQUMsQ0FBQztBQUNILFVBQVEsQ0FBQyxVQUFVLEVBQUUsWUFBTTtBQUN6QixNQUFFLENBQUMsc0RBQXNELEVBQUU7Ozs7QUFDekQsbUJBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxDQUFDOzs2Q0FDL0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJ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Q0FBQyxDQUFDOzs2Q0FDckUsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUzs7O0FBQ2hELGlCQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQUssQ0FBQzs7Ozs7OztLQUNyQyxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L2NvbW1hbmRzL2FjdGlvbnMtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcclxuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xyXG5pbXBvcnQgc2lub24gZnJvbSAnc2lub24nO1xyXG5pbXBvcnQgQm9vdHN0cmFwIGZyb20gJ2FwcGl1bS1hbmRyb2lkLWJvb3RzdHJhcCc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgbW9ja0ZTIGZyb20gJ21vY2stZnMnO1xyXG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLic7XHJcbmltcG9ydCBhbmRyb2lkSGVscGVycyBmcm9tICcuLi8uLi8uLi9saWIvYW5kcm9pZC1oZWxwZXJzJztcclxuaW1wb3J0ICogYXMgc3VwcG9ydCBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XHJcbmltcG9ydCB0ZW1wIGZyb20gJ3RlbXAnO1xyXG5pbXBvcnQgQURCIGZyb20gJ2FwcGl1bS1hZGInO1xyXG5pbXBvcnQgamltcCBmcm9tICdqaW1wJztcclxuaW1wb3J0IGhlbHBlcnMgZnJvbSAnLi4vLi4vLi4vbGliL2NvbW1hbmRzL2FjdGlvbnMnO1xyXG5pbXBvcnQgKiBhcyB0ZWVuX3Byb2Nlc3MgZnJvbSAndGVlbl9wcm9jZXNzJztcclxuXHJcbmxldCBkcml2ZXI7XHJcbmxldCBzYW5kYm94ID0gc2lub24uc2FuZGJveC5jcmVhdGUoKTtcclxuY2hhaS5zaG91bGQoKTtcclxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xyXG5cclxuZGVzY3JpYmUoJ0FjdGlvbnMnLCAoKSA9PiB7XHJcbiAgYmVmb3JlRWFjaCgoKSA9PiB7XHJcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xyXG4gICAgZHJpdmVyLmFkYiA9IG5ldyBBREIoKTtcclxuICAgIGRyaXZlci5ib290c3RyYXAgPSBuZXcgQm9vdHN0cmFwKCk7XHJcbiAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmJvb3RzdHJhcCwgJ3NlbmRBY3Rpb24nKTtcclxuICB9KTtcclxuICBhZnRlckVhY2goKCkgPT4ge1xyXG4gICAgc2FuZGJveC5yZXN0b3JlKCk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ2tleWV2ZW50JywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VkbGUgYmUgYWJsZSB0byBleGVjdXRlIGtleWV2ZW50IHZpYSBwcmVzc0tleUNvZGUnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdwcmVzc0tleUNvZGUnKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmtleWV2ZW50KCc2NicsICdtZXRhJyk7XHJcbiAgICAgIGRyaXZlci5wcmVzc0tleUNvZGUuY2FsbGVkV2l0aEV4YWN0bHkoJzY2JywgJ21ldGEnKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBzZXQgbWV0YXN0YXRlIHRvIG51bGwgYnkgZGVmYXVsdCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ3ByZXNzS2V5Q29kZScpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIua2V5ZXZlbnQoJzY2Jyk7XHJcbiAgICAgIGRyaXZlci5wcmVzc0tleUNvZGUuY2FsbGVkV2l0aEV4YWN0bHkoJzY2JywgbnVsbCkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgncHJlc3NLZXlDb2RlJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VkbGUgYmUgYWJsZSB0byBwcmVzcyBrZXkgY29kZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLnByZXNzS2V5Q29kZSgnNjYnLCAnbWV0YScpO1xyXG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb25cclxuICAgICAgICAuY2FsbGVkV2l0aEV4YWN0bHkoJ3ByZXNzS2V5Q29kZScsIHtrZXljb2RlOiAnNjYnLCBtZXRhc3RhdGU6ICdtZXRhJ30pXHJcbiAgICAgICAgLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHNldCBtZXRhc3RhdGUgdG8gbnVsbCBieSBkZWZhdWx0JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhd2FpdCBkcml2ZXIucHJlc3NLZXlDb2RlKCc2NicpO1xyXG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb25cclxuICAgICAgICAuY2FsbGVkV2l0aEV4YWN0bHkoJ3ByZXNzS2V5Q29kZScsIHtrZXljb2RlOiAnNjYnLCBtZXRhc3RhdGU6IG51bGx9KVxyXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdsb25nUHJlc3NLZXlDb2RlJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VkbGUgYmUgYWJsZSB0byBwcmVzcyBrZXkgY29kZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLmxvbmdQcmVzc0tleUNvZGUoJzY2JywgJ21ldGEnKTtcclxuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uXHJcbiAgICAgICAgLmNhbGxlZFdpdGhFeGFjdGx5KCdsb25nUHJlc3NLZXlDb2RlJywge2tleWNvZGU6ICc2NicsIG1ldGFzdGF0ZTogJ21ldGEnfSlcclxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgc2V0IG1ldGFzdGF0ZSB0byBudWxsIGJ5IGRlZmF1bHQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5sb25nUHJlc3NLZXlDb2RlKCc2NicpO1xyXG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb25cclxuICAgICAgICAuY2FsbGVkV2l0aEV4YWN0bHkoJ2xvbmdQcmVzc0tleUNvZGUnLCB7a2V5Y29kZTogJzY2JywgbWV0YXN0YXRlOiBudWxsfSlcclxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnZ2V0T3JpZW50YXRpb24nLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWRsZSBiZSBhYmxlIHRvIGdldCBvcmllbnRhdGlvbicsIGFzeW5jICgpID0+IHtcclxuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uLndpdGhBcmdzKCdvcmllbnRhdGlvbicsIHtuYXR1cmFsT3JpZW50YXRpb246IGZhbHNlfSlcclxuICAgICAgICAucmV0dXJucygnbGFuZHNjYXBlJyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRPcmllbnRhdGlvbigpLnNob3VsZC5iZWNvbWUoJ0xBTkRTQ0FQRScpO1xyXG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb25cclxuICAgICAgICAuY2FsbGVkV2l0aEV4YWN0bHkoJ29yaWVudGF0aW9uJywge25hdHVyYWxPcmllbnRhdGlvbjogZmFsc2V9KVxyXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdzZXRPcmllbnRhdGlvbicsICgpID0+IHtcclxuICAgIGl0KCdzaG91ZGxlIGJlIGFibGUgdG8gc2V0IG9yaWVudGF0aW9uJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgb3B0cyA9IHtvcmllbnRhdGlvbjogJ1NPTUVTQ0FQRScsIG5hdHVyYWxPcmllbnRhdGlvbjogZmFsc2V9O1xyXG4gICAgICBhd2FpdCBkcml2ZXIuc2V0T3JpZW50YXRpb24oJ3NvbWVzY2FwZScpO1xyXG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb24uY2FsbGVkV2l0aEV4YWN0bHkoJ29yaWVudGF0aW9uJywgb3B0cylcclxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnZmFrZUZsaWNrJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VkbGUgYmUgYWJsZSB0byBkbyBmYWtlIGZsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZmFrZUZsaWNrKDEyLCAzNCk7XHJcbiAgICAgIGRyaXZlci5ib290c3RyYXAuc2VuZEFjdGlvblxyXG4gICAgICAgIC5jYWxsZWRXaXRoRXhhY3RseSgnZmxpY2snLCB7eFNwZWVkOiAxMiwgeVNwZWVkOiAzNH0pLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ2Zha2VGbGlja0VsZW1lbnQnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWRsZSBiZSBhYmxlIHRvIGRvIGZha2UgZmxpY2sgb24gZWxlbWVudCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgZHJpdmVyLmZha2VGbGlja0VsZW1lbnQoNTAwMCwgNTYsIDc4LCAxLjMyKTtcclxuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uXHJcbiAgICAgICAgLmNhbGxlZFdpdGhFeGFjdGx5KCdlbGVtZW50OmZsaWNrJyxcclxuICAgICAgICAgIHt4b2Zmc2V0OiA1NiwgeW9mZnNldDogNzgsIHNwZWVkOiAxLjMyLCBlbGVtZW50SWQ6IDUwMDB9KVxyXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdzd2lwZScsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgc3dpcGUgYW4gZWxlbWVudCcsICgpID0+IHtcclxuICAgICAgbGV0IHN3aXBlT3B0cyA9IHtzdGFydFg6IDEwLCBzdGFydFk6IDExLCBlbmRYOiAyMCwgZW5kWTogMjIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgc3RlcHM6IDMsIGVsZW1lbnRJZDogJ3NvbWVFbGVtZW50SWQnfTtcclxuICAgICAgZHJpdmVyLnN3aXBlKDEwLCAxMSwgMjAsIDIyLCAwLjEsIG51bGwsICdzb21lRWxlbWVudElkJyk7XHJcbiAgICAgIGRyaXZlci5ib290c3RyYXAuc2VuZEFjdGlvbi5jYWxsZWRXaXRoRXhhY3RseSgnZWxlbWVudDpzd2lwZScsIHN3aXBlT3B0cylcclxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgc3dpcGUgd2l0aG91dCBhbiBlbGVtZW50JywgKCkgPT4ge1xyXG4gICAgICBkcml2ZXIuc3dpcGUoMCwgMCwgMSwgMSwgMCwgMSk7XHJcbiAgICAgIGRyaXZlci5ib290c3RyYXAuc2VuZEFjdGlvbi5jYWxsZWRXaXRoKCdzd2lwZScpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHNldCBzdGFydCBwb2ludCB0byAoMC41OzAuNSkgaWYgc3RhcnRYIGFuZCBzdGFydFkgYXJlIFwibnVsbFwiJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgc3dpcGVPcHRzID0ge3N0YXJ0WDogMC41LCBzdGFydFk6IDAuNSwgZW5kWDogMCwgZW5kWTogMCwgc3RlcHM6IDB9O1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnZG9Td2lwZScpO1xyXG4gICAgICBkcml2ZXIuc3dpcGUoJ251bGwnLCAnbnVsbCcsIDAsIDAsIDApO1xyXG4gICAgICBkcml2ZXIuZG9Td2lwZS5jYWxsZWRXaXRoRXhhY3RseShzd2lwZU9wdHMpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ3BpbmNoQ2xvc2UnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gcGluY2ggaW4gZWxlbWVudCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IHBpbmNoT3B0cyA9IHtkaXJlY3Rpb246ICdpbicsIGVsZW1lbnRJZDogJ2VsMDEnLCBwZXJjZW50OiAwLjUsIHN0ZXBzOiA1fTtcclxuICAgICAgYXdhaXQgZHJpdmVyLnBpbmNoQ2xvc2UobnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgMC41LCA1LCAnZWwwMScpO1xyXG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb24uY2FsbGVkV2l0aEV4YWN0bHkoJ2VsZW1lbnQ6cGluY2gnLCBwaW5jaE9wdHMpXHJcbiAgICAgICAgLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ3BpbmNoT3BlbicsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBwaW5jaCBvdXQgZWxlbWVudCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IHBpbmNoT3B0cyA9IHtkaXJlY3Rpb246ICdvdXQnLCBlbGVtZW50SWQ6ICdlbDAxJywgcGVyY2VudDogMC41LCBzdGVwczogNX07XHJcbiAgICAgIGF3YWl0IGRyaXZlci5waW5jaE9wZW4obnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgMC41LCA1LCAnZWwwMScpO1xyXG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb24uY2FsbGVkV2l0aEV4YWN0bHkoJ2VsZW1lbnQ6cGluY2gnLCBwaW5jaE9wdHMpXHJcbiAgICAgICAgLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ2ZsaWNrJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBjYWxsIGZha2VGbGlja0VsZW1lbnQgaWYgZWxlbWVudCBpcyBwYXNzZWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdmYWtlRmxpY2tFbGVtZW50Jyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5mbGljaygnZWxlbScsIG51bGwsIG51bGwsIDEsIDIsIDMpO1xyXG4gICAgICBkcml2ZXIuZmFrZUZsaWNrRWxlbWVudC5jYWxsZWRXaXRoKCdlbGVtJywgMSwgMiwgMykuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgY2FsbCBmYWtlRmxpY2sgaWYgZWxlbWVudCBpcyBub3QgcGFzc2VkJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnZmFrZUZsaWNrJyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5mbGljayhudWxsLCAxLCAyKTtcclxuICAgICAgZHJpdmVyLmZha2VGbGljay5jYWxsZWRXaXRoKDEsIDIpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ2RyYWcnLCAoKSA9PiB7XHJcbiAgICBsZXQgZHJhZ09wdHMgPSB7XHJcbiAgICAgIGVsZW1lbnRJZDogJ2VsZW0xJywgZGVzdEVsSWQ6ICdlbGVtMicsXHJcbiAgICAgIHN0YXJ0WDogMSwgc3RhcnRZOiAyLCBlbmRYOiAzLCBlbmRZOiA0LCBzdGVwczogMVxyXG4gICAgfTtcclxuICAgIGl0KCdzaG91bGQgZHJhZyBhbiBlbGVtZW50JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBkcml2ZXIuZHJhZygxLCAyLCAzLCA0LCAwLjAyLCBudWxsLCAnZWxlbTEnLCAnZWxlbTInKTtcclxuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uLmNhbGxlZFdpdGhFeGFjdGx5KCdlbGVtZW50OmRyYWcnLCBkcmFnT3B0cylcclxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgZHJhZyB3aXRob3V0IGFuIGVsZW1lbnQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGRyYWdPcHRzLmVsZW1lbnRJZCA9IG51bGw7XHJcbiAgICAgIGRyaXZlci5kcmFnKDEsIDIsIDMsIDQsIDAuMDIsIG51bGwsIG51bGwsICdlbGVtMicpO1xyXG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb24uY2FsbGVkV2l0aEV4YWN0bHkoJ2RyYWcnLCBkcmFnT3B0cylcclxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnbG9jaycsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgY2FsbCBhZGIubG9jaygpJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2xvY2snKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmxvY2soKTtcclxuICAgICAgZHJpdmVyLmFkYi5sb2NrLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnaXNMb2NrZWQnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGNhbGwgYWRiLmlzU2NyZWVuTG9ja2VkKCknLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnaXNTY3JlZW5Mb2NrZWQnKS5yZXR1cm5zKCdsb2NrX3N0YXR1cycpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuaXNMb2NrZWQoKS5zaG91bGQuYmVjb21lKCdsb2NrX3N0YXR1cycpO1xyXG4gICAgICBkcml2ZXIuYWRiLmlzU2NyZWVuTG9ja2VkLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgndW5sb2NrJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBjYWxsIGFuZHJvaWQtaGVscGVycy51bmxvY2soKScsIGFzeW5jICgpID0+IHtcclxuICAgICAgc2FuZGJveC5zdHViKGFuZHJvaWRIZWxwZXJzLCAndW5sb2NrJyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci51bmxvY2soJ2NhcHMnKTtcclxuICAgICAgYW5kcm9pZEhlbHBlcnMudW5sb2NrLmNhbGxlZFdpdGhFeGFjdGx5KGRyaXZlciwgZHJpdmVyLmFkYiwgJ2NhcHMnKVxyXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdvcGVuTm90aWZpY2F0aW9ucycsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBvcGVuIG5vdGlmaWNhdGlvbnMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5vcGVuTm90aWZpY2F0aW9ucygpO1xyXG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb24uY2FsbGVkV2l0aEV4YWN0bHkoJ29wZW5Ob3RpZmljYXRpb24nKVxyXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdzZXRMb2NhdGlvbicsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBzZXQgbG9jYXRpb24nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnc2VuZFRlbG5ldENvbW1hbmQnKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLnNldExvY2F0aW9uKCdsYXQnLCAnbG9uZycpO1xyXG4gICAgICBkcml2ZXIuYWRiLnNlbmRUZWxuZXRDb21tYW5kLmNhbGxlZFdpdGhFeGFjdGx5KCdnZW8gZml4IGxvbmcgbGF0JylcclxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgncHVsbEZpbGUnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gcHVsbCBmaWxlIGZyb20gZGV2aWNlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgbG9jYWxGaWxlID0gJ2xvY2FsL3RtcF9maWxlJztcclxuICAgICAgc2FuZGJveC5zdHViKHRlbXAsICdwYXRoJykucmV0dXJucyhsb2NhbEZpbGUpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ3B1bGwnKTtcclxuICAgICAgc2FuZGJveC5zdHViKHN1cHBvcnQuZnMsICdyZWFkRmlsZScpLndpdGhBcmdzKGxvY2FsRmlsZSkucmV0dXJucygnYXBwaXVtJyk7XHJcbiAgICAgIHNhbmRib3guc3R1YihzdXBwb3J0LmZzLCAnZXhpc3RzJykud2l0aEFyZ3MobG9jYWxGaWxlKS5yZXR1cm5zKHRydWUpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoc3VwcG9ydC5mcywgJ3VubGluaycpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIucHVsbEZpbGUoJ3JlbW90ZV9wYXRoJykuc2hvdWxkLmJlY29tZSgnWVhCd2FYVnQnKTtcclxuICAgICAgZHJpdmVyLmFkYi5wdWxsLmNhbGxlZFdpdGhFeGFjdGx5KCdyZW1vdGVfcGF0aCcsIGxvY2FsRmlsZSlcclxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIHN1cHBvcnQuZnMudW5saW5rLmNhbGxlZFdpdGhFeGFjdGx5KGxvY2FsRmlsZSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gcHVsbCBmaWxlIGxvY2F0ZWQgaW4gYXBwbGljYXRpb24gY29udGFpbmVyIGZyb20gdGhlIGRldmljZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IGxvY2FsRmlsZSA9ICdsb2NhbC90bXBfZmlsZSc7XHJcbiAgICAgIGNvbnN0IHBhY2thZ2VJZCA9ICdjb20ubXlhcHAnO1xyXG4gICAgICBjb25zdCByZW1vdGVQYXRoID0gJ3BhdGgvaW4vY29udGFpbmVyJztcclxuICAgICAgY29uc3QgdG1wUGF0aCA9ICcvZGF0YS9sb2NhbC90bXAvY29udGFpbmVyJztcclxuICAgICAgc2FuZGJveC5zdHViKHRlbXAsICdwYXRoJykucmV0dXJucyhsb2NhbEZpbGUpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ3B1bGwnKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdzaGVsbCcpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoc3VwcG9ydC5mcywgJ3JlYWRGaWxlJykud2l0aEFyZ3MobG9jYWxGaWxlKS5yZXR1cm5zKCdhcHBpdW0nKTtcclxuICAgICAgc2FuZGJveC5zdHViKHN1cHBvcnQuZnMsICdleGlzdHMnKS53aXRoQXJncyhsb2NhbEZpbGUpLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIHNhbmRib3guc3R1YihzdXBwb3J0LmZzLCAndW5saW5rJyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5wdWxsRmlsZShgQCR7cGFja2FnZUlkfS8ke3JlbW90ZVBhdGh9YCkuc2hvdWxkLmJlY29tZSgnWVhCd2FYVnQnKTtcclxuICAgICAgZHJpdmVyLmFkYi5wdWxsLmNhbGxlZFdpdGhFeGFjdGx5KHRtcFBhdGgsIGxvY2FsRmlsZSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGRyaXZlci5hZGIuc2hlbGwuY2FsbGVkV2l0aEV4YWN0bHkoWydydW4tYXMnLCBwYWNrYWdlSWQsIGBjaG1vZCA3NzcgJy9kYXRhL2RhdGEvJHtwYWNrYWdlSWR9LyR7cmVtb3RlUGF0aH0nYF0pLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBkcml2ZXIuYWRiLnNoZWxsLmNhbGxlZFdpdGhFeGFjdGx5KFsnY3AnLCAnLWYnLCBgL2RhdGEvZGF0YS8ke3BhY2thZ2VJZH0vJHtyZW1vdGVQYXRofWAsIHRtcFBhdGhdKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgc3VwcG9ydC5mcy51bmxpbmsuY2FsbGVkV2l0aEV4YWN0bHkobG9jYWxGaWxlKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgZHJpdmVyLmFkYi5zaGVsbC5jYWxsZWRXaXRoRXhhY3RseShbJ3JtJywgJy1mJywgdG1wUGF0aF0pLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIGRlc2NyaWJlKCdwdXNoRmlsZScsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBwdXNoIGZpbGUgdG8gZGV2aWNlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgbG9jYWxGaWxlID0gJ2xvY2FsL3RtcF9maWxlJztcclxuICAgICAgbGV0IGNvbnRlbnQgPSAnYXBwaXVtJztcclxuICAgICAgc2FuZGJveC5zdHViKHRlbXAsICdwYXRoJykucmV0dXJucyhsb2NhbEZpbGUpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ3B1c2gnKTtcclxuICAgICAgc2FuZGJveC5zdHViKHN1cHBvcnQuZnMsICd3cml0ZUZpbGUnKTtcclxuICAgICAgc2FuZGJveC5zdHViKHN1cHBvcnQuZnMsICdleGlzdHMnKS53aXRoQXJncyhsb2NhbEZpbGUpLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIHNhbmRib3guc3R1YihzdXBwb3J0LmZzLCAndW5saW5rJyk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5wdXNoRmlsZSgncmVtb3RlX3BhdGgnLCAnWVhCd2FYVnQnKTtcclxuICAgICAgc3VwcG9ydC5mcy53cml0ZUZpbGUuY2FsbGVkV2l0aEV4YWN0bHkobG9jYWxGaWxlLCBjb250ZW50LCAnYmluYXJ5Jykuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIHN1cHBvcnQuZnMudW5saW5rLmNhbGxlZFdpdGhFeGFjdGx5KGxvY2FsRmlsZSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGRyaXZlci5hZGIucHVzaC5jYWxsZWRXaXRoRXhhY3RseShsb2NhbEZpbGUsICdyZW1vdGVfcGF0aCcpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIHB1c2ggZmlsZSBsb2NhdGVkIGluIGFwcGxpY2F0aW9uIGNvbnRhaW5lciB0byB0aGUgZGV2aWNlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgbG9jYWxGaWxlID0gJ2xvY2FsL3RtcF9maWxlJztcclxuICAgICAgbGV0IGNvbnRlbnQgPSAnYXBwaXVtJztcclxuICAgICAgY29uc3QgcGFja2FnZUlkID0gJ2NvbS5teWFwcCc7XHJcbiAgICAgIGNvbnN0IHJlbW90ZVBhdGggPSAncGF0aC9pbi9jb250YWluZXInO1xyXG4gICAgICBjb25zdCB0bXBQYXRoID0gJy9kYXRhL2xvY2FsL3RtcC9jb250YWluZXInO1xyXG4gICAgICBzYW5kYm94LnN0dWIodGVtcCwgJ3BhdGgnKS5yZXR1cm5zKGxvY2FsRmlsZSk7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAncHVzaCcpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ3NoZWxsJyk7XHJcbiAgICAgIHNhbmRib3guc3R1YihzdXBwb3J0LmZzLCAnd3JpdGVGaWxlJyk7XHJcbiAgICAgIHNhbmRib3guc3R1YihzdXBwb3J0LmZzLCAnZXhpc3RzJykud2l0aEFyZ3MobG9jYWxGaWxlKS5yZXR1cm5zKHRydWUpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoc3VwcG9ydC5mcywgJ3VubGluaycpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIucHVzaEZpbGUoYEAke3BhY2thZ2VJZH0vJHtyZW1vdGVQYXRofWAsICdZWEJ3YVhWdCcpO1xyXG4gICAgICBzdXBwb3J0LmZzLndyaXRlRmlsZS5jYWxsZWRXaXRoRXhhY3RseShsb2NhbEZpbGUsIGNvbnRlbnQsICdiaW5hcnknKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgZHJpdmVyLmFkYi5wdXNoLmNhbGxlZFdpdGhFeGFjdGx5KGxvY2FsRmlsZSwgdG1wUGF0aCkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGRyaXZlci5hZGIuc2hlbGwuY2FsbGVkV2l0aEV4YWN0bHkoWydydW4tYXMnLCBwYWNrYWdlSWQsIGBta2RpciAtcCAnL2RhdGEvZGF0YS8ke3BhY2thZ2VJZH0vcGF0aC9pbidgXSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGRyaXZlci5hZGIuc2hlbGwuY2FsbGVkV2l0aEV4YWN0bHkoWydydW4tYXMnLCBwYWNrYWdlSWQsIGB0b3VjaCAnL2RhdGEvZGF0YS8ke3BhY2thZ2VJZH0vJHtyZW1vdGVQYXRofSdgXSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGRyaXZlci5hZGIuc2hlbGwuY2FsbGVkV2l0aEV4YWN0bHkoWydydW4tYXMnLCBwYWNrYWdlSWQsIGBjaG1vZCA3NzcgJy9kYXRhL2RhdGEvJHtwYWNrYWdlSWR9LyR7cmVtb3RlUGF0aH0nYF0pLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBkcml2ZXIuYWRiLnNoZWxsLmNhbGxlZFdpdGhFeGFjdGx5KFsnY3AnLCAnLWYnLCB0bXBQYXRoLCBgL2RhdGEvZGF0YS8ke3BhY2thZ2VJZH0vJHtyZW1vdGVQYXRofWBdKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgc3VwcG9ydC5mcy51bmxpbmsuY2FsbGVkV2l0aEV4YWN0bHkobG9jYWxGaWxlKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgZHJpdmVyLmFkYi5zaGVsbC5jYWxsZWRXaXRoRXhhY3RseShbJ3JtJywgJy1mJywgdG1wUGF0aF0pLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ3B1bGxGb2xkZXInLCAoKSA9PiB7XHJcbiAgICBsZXQgemlwcGVkRGlyLCB1bnppcHBlZERpciwgdGVtcERpciwgdGVtcFBhdGhTdHViO1xyXG5cclxuICAgIGJlZm9yZSgoKSA9PiB7XHJcbiAgICAgIC8vIENyZWF0ZSBpbi1tZW1vcnkgbW9jayBmaWxlIHN5c3RlbSBmb3IgZmlsZSB3cml0ZXNcclxuICAgICAgemlwcGVkRGlyID0gJy9tb2NrL3BhdGgvdG8vemlwcGVkJztcclxuICAgICAgdW56aXBwZWREaXIgPSAnL21vY2svcGF0aC90by91bnppcHBlZCc7XHJcbiAgICAgIHRlbXBEaXIgPSAnL21vY2svcGF0aC90by90ZW1wLWRpcic7XHJcbiAgICAgIG1vY2tGUyh7XHJcbiAgICAgICAgW3ppcHBlZERpcl06IHt9LFxyXG4gICAgICAgIFt1bnppcHBlZERpcl06IHt9LFxyXG4gICAgICAgIFt0ZW1wRGlyXToge30sXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gU3R1YiB0ZW1wLnBhdGggdG8gdXNlIGFuIGluLW1lbW9yeSBmaWxlcGF0aFxyXG4gICAgICB0ZW1wUGF0aFN0dWIgPSBzaW5vbi5zdHViKHRlbXAsICdwYXRoJywgKCkgPT4gdGVtcERpcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZnRlcigoKSA9PiB7XHJcbiAgICAgIHRlbXBQYXRoU3R1Yi5yZXN0b3JlKCk7XHJcbiAgICAgIG1vY2tGUy5yZXN0b3JlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIHB1bGwgYSBmb2xkZXIgYW5kIHJldHVybiBiYXNlNjQgemlwJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAvLyBTdHViIGluIGRyaXZlci5hZGIgYW5kIG1ha2UgaXQgcHVsbCBhIGZvbGRlciB3aXRoIHR3byBmaWxlc1xyXG4gICAgICBsZXQgYWRiUHVsbFN0dWI7XHJcbiAgICAgIGNvbnN0IHB1bGwgPSBhc3luYyAoaWdub3JlLCBsb2NhbFBhdGgpID0+IHtcclxuICAgICAgICBhd2FpdCBzdXBwb3J0LmZzLndyaXRlRmlsZShwYXRoLnJlc29sdmUobG9jYWxQYXRoLCAnYS50eHQnKSwgJ2hlbGxvIHdvcmxkJywge2ZsYWdzOiAndyd9KTtcclxuICAgICAgICBhd2FpdCBzdXBwb3J0LmZzLndyaXRlRmlsZShwYXRoLnJlc29sdmUobG9jYWxQYXRoLCAnYi50eHQnKSwgJ2Zvb2JhcicsIHtmbGFnczogJ3cnfSk7XHJcbiAgICAgIH07XHJcbiAgICAgIGlmICghZHJpdmVyLmFkYikge1xyXG4gICAgICAgIGRyaXZlci5hZGIgPSB7cHVsbH07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWRiUHVsbFN0dWIgPSBzaW5vbi5zdHViKGRyaXZlci5hZGIsICdwdWxsJywgcHVsbCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIENhbGwgJ2RyaXZlci5wdWxsRm9sZGVyJyBhbmQgemlwIHRoZSBiYXNlNjQgY29udGVudHMgdG8gYSAuemlwIGZpbGVcclxuICAgICAgY29uc3QgemlwcGVkQmFzZTY0ID0gYXdhaXQgZHJpdmVyLnB1bGxGb2xkZXIoJy9kb2VzL25vdC9tYXR0ZXInKTtcclxuICAgICAgKHR5cGVvZiB6aXBwZWRCYXNlNjQpLnNob3VsZC5lcXVhbCgnc3RyaW5nJyk7XHJcbiAgICAgIGF3YWl0IHN1cHBvcnQuZnMud3JpdGVGaWxlKHBhdGgucmVzb2x2ZSh6aXBwZWREaXIsICd6aXBwZWQuemlwJyksIHppcHBlZEJhc2U2NCwge2VuY29kaW5nOiAnYmFzZTY0JywgZmxhZ3M6ICd3J30pO1xyXG5cclxuICAgICAgLy8gRXh0cmFjdCB0aGUgemlwIGZpbGUgYW5kIHZlcmlmeSBpdCdzIGNvbnRlbnRzXHJcbiAgICAgIGF3YWl0IHN1cHBvcnQuemlwLmV4dHJhY3RBbGxUbyhwYXRoLnJlc29sdmUoemlwcGVkRGlyLCAnemlwcGVkLnppcCcpLCB1bnppcHBlZERpcik7XHJcbiAgICAgIGF3YWl0IHN1cHBvcnQuZnMucmVhZEZpbGUocGF0aC5yZXNvbHZlKHVuemlwcGVkRGlyLCAnYS50eHQnKSwgJ3V0ZjgnKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnaGVsbG8gd29ybGQnKTtcclxuICAgICAgYXdhaXQgc3VwcG9ydC5mcy5yZWFkRmlsZShwYXRoLnJlc29sdmUodW56aXBwZWREaXIsICdiLnR4dCcpLCAndXRmOCcpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdmb29iYXInKTtcclxuXHJcbiAgICAgIC8vIFJlc3RvcmUgc3R1YlxyXG4gICAgICBpZiAoYWRiUHVsbFN0dWIpIHtcclxuICAgICAgICBhZGJQdWxsU3R1Yi5yZXN0b3JlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGVsZXRlIGRyaXZlci5hZGI7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdmaW5nZXJwcmludCcsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgY2FsbCBmaW5nZXJwcmludCBhZGIgY29tbWFuZCBmb3IgZW11bGF0b3InLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnZmluZ2VycHJpbnQnKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2lzRW11bGF0b3InKS5yZXR1cm5zKHRydWUpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZmluZ2VycHJpbnQoMTExMSk7XHJcbiAgICAgIGRyaXZlci5hZGIuZmluZ2VycHJpbnQuY2FsbGVkV2l0aEV4YWN0bHkoMTExMSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdGhyb3cgZXhjZXB0aW9uIGZvciByZWFsIGRldmljZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdmaW5nZXJwcmludCcpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnaXNFbXVsYXRvcicpLnJldHVybnMoZmFsc2UpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZmluZ2VycHJpbnQoMTExMSkuc2hvdWxkLmJlXHJcbiAgICAgICAgLnJlamVjdGVkV2l0aCgnZmluZ2VycHJpbnQgbWV0aG9kIGlzIG9ubHkgYXZhaWxhYmxlIGZvciBlbXVsYXRvcnMnKTtcclxuICAgICAgZHJpdmVyLmFkYi5maW5nZXJwcmludC5ub3RDYWxsZWQuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnc2VuZFNNUycsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgY2FsbCBzZW5kU01TIGFkYiBjb21tYW5kIGZvciBlbXVsYXRvcicsIGFzeW5jICgpID0+IHtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdzZW5kU01TJyk7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdpc0VtdWxhdG9yJykucmV0dXJucyh0cnVlKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLnNlbmRTTVMoNDUwOSwgJ0hlbGxvIEFwcGl1bScpO1xyXG4gICAgICBkcml2ZXIuYWRiLnNlbmRTTVMuY2FsbGVkV2l0aEV4YWN0bHkoNDUwOSwgJ0hlbGxvIEFwcGl1bScpXHJcbiAgICAgICAgLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHRocm93IGV4Y2VwdGlvbiBmb3IgcmVhbCBkZXZpY2UnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnc2VuZFNNUycpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnaXNFbXVsYXRvcicpLnJldHVybnMoZmFsc2UpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuc2VuZFNNUyg0NTA5LCAnSGVsbG8gQXBwaXVtJylcclxuICAgICAgICAuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgnc2VuZFNNUyBtZXRob2QgaXMgb25seSBhdmFpbGFibGUgZm9yIGVtdWxhdG9ycycpO1xyXG4gICAgICBkcml2ZXIuYWRiLnNlbmRTTVMubm90Q2FsbGVkLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ2dzbUNhbGwnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGNhbGwgZ3NtQ2FsbCBhZGIgY29tbWFuZCBmb3IgZW11bGF0b3InLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnZ3NtQ2FsbCcpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnaXNFbXVsYXRvcicpLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5nc21DYWxsKDQ1MDksICdjYWxsJyk7XHJcbiAgICAgIGRyaXZlci5hZGIuZ3NtQ2FsbC5jYWxsZWRXaXRoRXhhY3RseSg0NTA5LCAnY2FsbCcpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHRocm93IGV4Y2VwdGlvbiBmb3IgcmVhbCBkZXZpY2UnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnZ3NtQ2FsbCcpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnaXNFbXVsYXRvcicpLnJldHVybnMoZmFsc2UpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZ3NtQ2FsbCg0NTA5LCAnY2FsbCcpXHJcbiAgICAgICAgLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoJ2dzbUNhbGwgbWV0aG9kIGlzIG9ubHkgYXZhaWxhYmxlIGZvciBlbXVsYXRvcnMnKTtcclxuICAgICAgZHJpdmVyLmFkYi5nc21DYWxsLm5vdENhbGxlZC5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdnc21TaWduYWwnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGNhbGwgZ3NtU2lnbmFsIGFkYiBjb21tYW5kIGZvciBlbXVsYXRvcicsIGFzeW5jICgpID0+IHtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdnc21TaWduYWwnKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2lzRW11bGF0b3InKS5yZXR1cm5zKHRydWUpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZ3NtU2lnbmFsKDMpO1xyXG4gICAgICBkcml2ZXIuYWRiLmdzbVNpZ25hbC5jYWxsZWRXaXRoRXhhY3RseSgzKVxyXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBleGNlcHRpb24gZm9yIHJlYWwgZGV2aWNlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2dzbVNpZ25hbCcpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnaXNFbXVsYXRvcicpLnJldHVybnMoZmFsc2UpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZ3NtU2lnbmFsKDMpXHJcbiAgICAgICAgLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoJ2dzbVNpZ25hbCBtZXRob2QgaXMgb25seSBhdmFpbGFibGUgZm9yIGVtdWxhdG9ycycpO1xyXG4gICAgICBkcml2ZXIuYWRiLmdzbVNpZ25hbC5ub3RDYWxsZWQuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnZ3NtVm9pY2UnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGNhbGwgZ3NtVm9pY2UgYWRiIGNvbW1hbmQgZm9yIGVtdWxhdG9yJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2dzbVZvaWNlJyk7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdpc0VtdWxhdG9yJykucmV0dXJucyh0cnVlKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdzbVZvaWNlKCdyb2FtaW5nJyk7XHJcbiAgICAgIGRyaXZlci5hZGIuZ3NtVm9pY2UuY2FsbGVkV2l0aEV4YWN0bHkoJ3JvYW1pbmcnKVxyXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBleGNlcHRpb24gZm9yIHJlYWwgZGV2aWNlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2dzbVZvaWNlJyk7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdpc0VtdWxhdG9yJykucmV0dXJucyhmYWxzZSk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5nc21Wb2ljZSgncm9hbWluZycpXHJcbiAgICAgICAgLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoJ2dzbVZvaWNlIG1ldGhvZCBpcyBvbmx5IGF2YWlsYWJsZSBmb3IgZW11bGF0b3JzJyk7XHJcbiAgICAgIGRyaXZlci5hZGIuZ3NtVm9pY2Uubm90Q2FsbGVkLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ3Bvd2VyQUMnLCAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGNhbGwgcG93ZXJBQyBhZGIgY29tbWFuZCBmb3IgZW11bGF0b3InLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAncG93ZXJBQycpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnaXNFbXVsYXRvcicpLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5wb3dlckFDKCdvZmYnKTtcclxuICAgICAgZHJpdmVyLmFkYi5wb3dlckFDLmNhbGxlZFdpdGhFeGFjdGx5KCdvZmYnKVxyXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBleGNlcHRpb24gZm9yIHJlYWwgZGV2aWNlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ3Bvd2VyQUMnKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2lzRW11bGF0b3InKS5yZXR1cm5zKGZhbHNlKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLnBvd2VyQUMoJ3JvYW1pbmcnKVxyXG4gICAgICAgIC5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKCdwb3dlckFDIG1ldGhvZCBpcyBvbmx5IGF2YWlsYWJsZSBmb3IgZW11bGF0b3JzJyk7XHJcbiAgICAgIGRyaXZlci5hZGIucG93ZXJBQy5ub3RDYWxsZWQuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgncG93ZXJDYXBhY2l0eScsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgY2FsbCBwb3dlckNhcGFjaXR5IGFkYiBjb21tYW5kIGZvciBlbXVsYXRvcicsIGFzeW5jICgpID0+IHtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdwb3dlckNhcGFjaXR5Jyk7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdpc0VtdWxhdG9yJykucmV0dXJucyh0cnVlKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLnBvd2VyQ2FwYWNpdHkoNSk7XHJcbiAgICAgIGRyaXZlci5hZGIucG93ZXJDYXBhY2l0eS5jYWxsZWRXaXRoRXhhY3RseSg1KVxyXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBleGNlcHRpb24gZm9yIHJlYWwgZGV2aWNlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ3Bvd2VyQ2FwYWNpdHknKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2lzRW11bGF0b3InKS5yZXR1cm5zKGZhbHNlKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLnBvd2VyQ2FwYWNpdHkoNSlcclxuICAgICAgICAuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgncG93ZXJDYXBhY2l0eSBtZXRob2QgaXMgb25seSBhdmFpbGFibGUgZm9yIGVtdWxhdG9ycycpO1xyXG4gICAgICBkcml2ZXIuYWRiLnBvd2VyQ2FwYWNpdHkubm90Q2FsbGVkLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ25ldHdvcmtTcGVlZCcsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgY2FsbCBuZXR3b3JrU3BlZWQgYWRiIGNvbW1hbmQgZm9yIGVtdWxhdG9yJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ25ldHdvcmtTcGVlZCcpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnaXNFbXVsYXRvcicpLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5uZXR3b3JrU3BlZWQoJ2dzbScpO1xyXG4gICAgICBkcml2ZXIuYWRiLm5ldHdvcmtTcGVlZC5jYWxsZWRXaXRoRXhhY3RseSgnZ3NtJylcclxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdGhyb3cgZXhjZXB0aW9uIGZvciByZWFsIGRldmljZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICduZXR3b3JrU3BlZWQnKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2lzRW11bGF0b3InKS5yZXR1cm5zKGZhbHNlKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLm5ldHdvcmtTcGVlZCgnZ3NtJylcclxuICAgICAgICAuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgnbmV0d29ya1NwZWVkIG1ldGhvZCBpcyBvbmx5IGF2YWlsYWJsZSBmb3IgZW11bGF0b3JzJyk7XHJcbiAgICAgIGRyaXZlci5hZGIubmV0d29ya1NwZWVkLm5vdENhbGxlZC5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdnZXRTY3JlZW5zaG90RGF0YVdpdGhBZGJTaGVsbCcsICgpID0+IHtcclxuICAgIGNvbnN0IGRlZmF1bHREaXIgPSAnL2RhdGEvbG9jYWwvdG1wLyc7XHJcbiAgICBjb25zdCBwbmcgPSAnL3BhdGgvc2MucG5nJztcclxuICAgIGNvbnN0IGxvY2FsRmlsZSA9ICdsb2NhbF9maWxlJztcclxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xyXG4gICAgICBzYW5kYm94LnN0dWIodGVtcCwgJ3BhdGgnKTtcclxuICAgICAgc2FuZGJveC5zdHViKHN1cHBvcnQuZnMsICdleGlzdHMnKTtcclxuICAgICAgc2FuZGJveC5zdHViKHN1cHBvcnQuZnMsICd1bmxpbmsnKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdzaGVsbCcpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ3B1bGwnKTtcclxuICAgICAgc2FuZGJveC5zdHViKHBhdGgucG9zaXgsICdyZXNvbHZlJyk7XHJcbiAgICAgIHNhbmRib3guc3R1YihqaW1wLCAncmVhZCcpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2ZpbGVTaXplJyk7XHJcbiAgICAgIHRlbXAucGF0aC5yZXR1cm5zKGxvY2FsRmlsZSk7XHJcbiAgICAgIHN1cHBvcnQuZnMuZXhpc3RzLndpdGhBcmdzKGxvY2FsRmlsZSkucmV0dXJucyh0cnVlKTtcclxuICAgICAgc3VwcG9ydC5mcy51bmxpbmsud2l0aEFyZ3MobG9jYWxGaWxlKS5yZXR1cm5zKHRydWUpO1xyXG4gICAgICBwYXRoLnBvc2l4LnJlc29sdmUud2l0aEFyZ3MoZGVmYXVsdERpciwgJ3NjcmVlbnNob3QucG5nJykucmV0dXJucyhwbmcpO1xyXG4gICAgICBkcml2ZXIuYWRiLmZpbGVTaXplLndpdGhBcmdzKHBuZykucmV0dXJucygxKTtcclxuICAgICAgamltcC5yZWFkLndpdGhBcmdzKGxvY2FsRmlsZSkucmV0dXJucygnc2NyZWVuc2hvb3RfY29udGV4dCcpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gZ2V0IHNjcmVlbnNob3QgdmlhIGFkYiBzaGVsbCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgaGVscGVycy5nZXRTY3JlZW5zaG90RGF0YVdpdGhBZGJTaGVsbChkcml2ZXIuYWRiLCB7fSlcclxuICAgICAgICAuc2hvdWxkLmJlY29tZSgnc2NyZWVuc2hvb3RfY29udGV4dCcpO1xyXG4gICAgICBkcml2ZXIuYWRiLnNoZWxsLmNhbGxlZFdpdGhFeGFjdGx5KFsnL3N5c3RlbS9iaW4vcm0nLCBgJHtwbmd9O2BcclxuICAgICAgICAsICcvc3lzdGVtL2Jpbi9zY3JlZW5jYXAnLCAnLXAnLCBwbmddKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgZHJpdmVyLmFkYi5wdWxsLmNhbGxlZFdpdGhFeGFjdGx5KHBuZywgbG9jYWxGaWxlKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgamltcC5yZWFkLmNhbGxlZFdpdGhFeGFjdGx5KGxvY2FsRmlsZSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIHN1cHBvcnQuZnMuZXhpc3RzLmNhbGxlZFR3aWNlLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBzdXBwb3J0LmZzLnVubGluay5jYWxsZWRUd2ljZS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBiZSBwb3NzaWJsZSB0byBjaGFuZ2UgZGVmYXVsdCBwbmcgZGlyJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBwYXRoLnBvc2l4LnJlc29sdmUud2l0aEFyZ3MoJy9jdXN0b20vcGF0aC90bXAvJywgJ3NjcmVlbnNob3QucG5nJykucmV0dXJucyhwbmcpO1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLmdldFNjcmVlbnNob3REYXRhV2l0aEFkYlNoZWxsKGRyaXZlci5hZGJcclxuICAgICAgICAsIHthbmRyb2lkU2NyZWVuc2hvdFBhdGg6ICcvY3VzdG9tL3BhdGgvdG1wLyd9KVxyXG4gICAgICAgIC5zaG91bGQuYmVjb21lKCdzY3JlZW5zaG9vdF9jb250ZXh0Jyk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdGhyb3cgZXJyb3IgaWYgc2l6ZSBvZiB0aGUgc2NyZWVuc2hvdCBpcyB6ZXJvJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBkcml2ZXIuYWRiLmZpbGVTaXplLndpdGhBcmdzKHBuZykucmV0dXJucygwKTtcclxuICAgICAgYXdhaXQgaGVscGVycy5nZXRTY3JlZW5zaG90RGF0YVdpdGhBZGJTaGVsbChkcml2ZXIuYWRiLCB7fSlcclxuICAgICAgICAuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgnZXF1YWxzIHRvIHplcm8nKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdnZXRTY3JlZW5zaG90RGF0YVdpdGhBZGJFeGVjT3V0JywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIHRha2Ugc2NyZWVuc2hvdCB2aWEgZXhlYy1vdXQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yih0ZWVuX3Byb2Nlc3MsICdleGVjJyk7XHJcbiAgICAgIHNhbmRib3guc3R1YihqaW1wLCAncmVhZCcpO1xyXG4gICAgICB0ZWVuX3Byb2Nlc3MuZXhlYy5yZXR1cm5zKHtzdGRvdXQ6ICdzdGRvdXQnLCBzdGRlcnI6ICcnfSk7XHJcbiAgICAgIGRyaXZlci5hZGIuZXhlY3V0YWJsZS5wYXRoID0gJ3BhdGgvdG8vYWRiJztcclxuICAgICAgYXdhaXQgaGVscGVycy5nZXRTY3JlZW5zaG90RGF0YVdpdGhBZGJFeGVjT3V0KGRyaXZlci5hZGIpO1xyXG4gICAgICB0ZWVuX3Byb2Nlc3MuZXhlYy5jYWxsZWRXaXRoRXhhY3RseShkcml2ZXIuYWRiLmV4ZWN1dGFibGUucGF0aCxcclxuICAgICAgICBkcml2ZXIuYWRiLmV4ZWN1dGFibGUuZGVmYXVsdEFyZ3NcclxuICAgICAgICAgIC5jb25jYXQoWydleGVjLW91dCcsICcvc3lzdGVtL2Jpbi9zY3JlZW5jYXAnLCAnLXAnXSksXHJcbiAgICAgICAge2VuY29kaW5nOiAnYmluYXJ5JywgaXNCdWZmZXI6IHRydWV9KS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgamltcC5yZWFkLmNhbGxlZFdpdGhFeGFjdGx5KCdzdGRvdXQnKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBlcnJvciBpZiBzaXplIG9mIHRoZSBzY3JlZW5zaG90IGlzIHplcm8nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yih0ZWVuX3Byb2Nlc3MsICdleGVjJyk7XHJcbiAgICAgIHRlZW5fcHJvY2Vzcy5leGVjLnJldHVybnMoe3N0ZG91dDogJycsIHN0ZGVycjogJyd9KTtcclxuICAgICAgYXdhaXQgaGVscGVycy5nZXRTY3JlZW5zaG90RGF0YVdpdGhBZGJFeGVjT3V0KGRyaXZlci5hZGIpXHJcbiAgICAgICAgLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoJ1NjcmVlbnNob3QgcmV0dXJuZWQgbm8gZGF0YScpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHRocm93IGVycm9yIGlmIGNvZGUgaXMgbm90IDAnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yih0ZWVuX3Byb2Nlc3MsICdleGVjJyk7XHJcbiAgICAgIHRlZW5fcHJvY2Vzcy5leGVjLnJldHVybnMoe2NvZGU6IDEsIHN0ZG91dDogJycsIHN0ZGVycjogJyd9KTtcclxuICAgICAgYXdhaXQgaGVscGVycy5nZXRTY3JlZW5zaG90RGF0YVdpdGhBZGJFeGVjT3V0KGRyaXZlci5hZGIpXHJcbiAgICAgICAgLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoYFNjcmVlbnNob3QgcmV0dXJuZWQgZXJyb3IsIGNvZGU6ICcxJywgc3RkZXJyOiAnJ2ApO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHRocm93IGVycm9yIGlmIHN0ZGVyciBpcyBub3QgZW1wdHknLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNhbmRib3guc3R1Yih0ZWVuX3Byb2Nlc3MsICdleGVjJyk7XHJcbiAgICAgIHRlZW5fcHJvY2Vzcy5leGVjLnJldHVybnMoe2NvZGU6IDAsIHN0ZG91dDogJycsIHN0ZGVycjogJ09vcHMnfSk7XHJcbiAgICAgIGF3YWl0IGhlbHBlcnMuZ2V0U2NyZWVuc2hvdERhdGFXaXRoQWRiRXhlY091dChkcml2ZXIuYWRiKVxyXG4gICAgICAgIC5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKGBTY3JlZW5zaG90IHJldHVybmVkIGVycm9yLCBjb2RlOiAnMCcsIHN0ZGVycjogJ09vcHMnYCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnZ2V0U2NyZWVuc2hvdCcsICgpID0+IHtcclxuICAgIGxldCBpbWFnZTtcclxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xyXG4gICAgICBpbWFnZSA9IG5ldyBqaW1wKDEsIDEpO1xyXG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2dldEFwaUxldmVsJyk7XHJcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnZ2V0U2NyZWVuT3JpZW50YXRpb24nKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2dldFNjcmVlbnNob3REYXRhV2l0aEFkYkV4ZWNPdXQnKTtcclxuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2dldFNjcmVlbnNob3REYXRhV2l0aEFkYlNoZWxsJyk7XHJcbiAgICAgIHNhbmRib3guc3R1YihpbWFnZSwgJ2dldEJ1ZmZlcicsIGZ1bmN0aW9uIChtaW1lLCBjYikgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHByb21pc2UvcHJlZmVyLWF3YWl0LXRvLWNhbGxiYWNrc1xyXG4gICAgICAgIHJldHVybiBjYi5jYWxsKHRoaXMsIG51bGwsIG5ldyBCdWZmZXIoJ2FwcGl1bScpKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHNhbmRib3guc3R1YihpbWFnZSwgJ3JvdGF0ZScpO1xyXG4gICAgICBkcml2ZXIuYWRiLmdldFNjcmVlbk9yaWVudGF0aW9uLnJldHVybnMoMik7XHJcbiAgICAgIGltYWdlLnJvdGF0ZS53aXRoQXJncygtMTgwKS5yZXR1cm5zKGltYWdlKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIHRha2Ugc2NyZWVuc2hvdCB2aWEgZXhlYy1vdXQgKEFQSSBsZXZlbCA+IDIwKScsIGFzeW5jICgpID0+IHtcclxuICAgICAgZHJpdmVyLmFkYi5nZXRBcGlMZXZlbC5yZXR1cm5zKDI0KTtcclxuICAgICAgZHJpdmVyLmdldFNjcmVlbnNob3REYXRhV2l0aEFkYkV4ZWNPdXQud2l0aEFyZ3MoZHJpdmVyLmFkYikucmV0dXJucyhpbWFnZSk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRTY3JlZW5zaG90KCkuc2hvdWxkLmJlY29tZSgnWVhCd2FYVnQnKTtcclxuICAgICAgZHJpdmVyLmdldFNjcmVlbnNob3REYXRhV2l0aEFkYkV4ZWNPdXQuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgZHJpdmVyLmdldFNjcmVlbnNob3REYXRhV2l0aEFkYlNoZWxsLm5vdENhbGxlZC5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgaW1hZ2UuZ2V0QnVmZmVyLmNhbGxlZFdpdGgoamltcC5NSU1FX1BORykuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byB0YWtlIHNjcmVlbnNob3QgdmlhIGFkYiBzaGVsbCAoQVBJIGxldmVsIDw9IDIwKScsIGFzeW5jICgpID0+IHtcclxuICAgICAgZHJpdmVyLmFkYi5nZXRBcGlMZXZlbC5yZXR1cm5zKDIwKTtcclxuICAgICAgZHJpdmVyLmdldFNjcmVlbnNob3REYXRhV2l0aEFkYlNoZWxsLndpdGhBcmdzKGRyaXZlci5hZGIsIGRyaXZlci5vcHRzKS5yZXR1cm5zKGltYWdlKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdldFNjcmVlbnNob3QoKS5zaG91bGQuYmVjb21lKCdZWEJ3YVhWdCcpO1xyXG4gICAgICBkcml2ZXIuZ2V0U2NyZWVuc2hvdERhdGFXaXRoQWRiU2hlbGwuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgZHJpdmVyLmdldFNjcmVlbnNob3REYXRhV2l0aEFkYkV4ZWNPdXQubm90Q2FsbGVkLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBpbWFnZS5nZXRCdWZmZXIuY2FsbGVkV2l0aChqaW1wLk1JTUVfUE5HKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0cmllcyB0byB0YWtlIHNjcmVlbnNob3QgdmlhIGFkYiBzaGVsbCBpZiBleGVjLW91dCBmYWlsZWQgKEFQSSBsZXZlbCA+IDIwKScsIGFzeW5jICgpID0+IHtcclxuICAgICAgZHJpdmVyLmFkYi5nZXRBcGlMZXZlbC5yZXR1cm5zKDI0KTtcclxuICAgICAgZHJpdmVyLmdldFNjcmVlbnNob3REYXRhV2l0aEFkYkV4ZWNPdXQudGhyb3dzKCk7XHJcbiAgICAgIGRyaXZlci5nZXRTY3JlZW5zaG90RGF0YVdpdGhBZGJTaGVsbC53aXRoQXJncyhkcml2ZXIuYWRiLCBkcml2ZXIub3B0cykucmV0dXJucyhpbWFnZSk7XHJcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRTY3JlZW5zaG90KCkuc2hvdWxkLmJlY29tZSgnWVhCd2FYVnQnKTtcclxuICAgICAgZHJpdmVyLmdldFNjcmVlbnNob3REYXRhV2l0aEFkYlNoZWxsLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGRyaXZlci5nZXRTY3JlZW5zaG90RGF0YVdpdGhBZGJTaGVsbC5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHRocm93IGVycm9yIGlmIGFkYiBzaGVsbCBmYWlsZWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGRyaXZlci5hZGIuZ2V0QXBpTGV2ZWwucmV0dXJucygyMCk7XHJcbiAgICAgIGRyaXZlci5nZXRTY3JlZW5zaG90RGF0YVdpdGhBZGJTaGVsbC50aHJvd3MoKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdldFNjcmVlbnNob3QoKS5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKCdDYW5ub3QgZ2V0IHNjcmVlbnNob3QnKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCByb3RhdGUgaW1hZ2UgaWYgQVBJIGxldmVsIDwgMjMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGRyaXZlci5hZGIuZ2V0QXBpTGV2ZWwucmV0dXJucygyMik7XHJcbiAgICAgIGRyaXZlci5nZXRTY3JlZW5zaG90RGF0YVdpdGhBZGJFeGVjT3V0LndpdGhBcmdzKGRyaXZlci5hZGIpLnJldHVybnMoaW1hZ2UpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0U2NyZWVuc2hvdCgpO1xyXG4gICAgICBkcml2ZXIuYWRiLmdldFNjcmVlbk9yaWVudGF0aW9uLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGltYWdlLnJvdGF0ZS5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIG5vdCByb3RhdGUgaW1hZ2UgaWYgQVBJIGxldmVsID49IDIzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBkcml2ZXIuYWRiLmdldEFwaUxldmVsLnJldHVybnMoMjMpO1xyXG4gICAgICBkcml2ZXIuZ2V0U2NyZWVuc2hvdERhdGFXaXRoQWRiRXhlY091dC53aXRoQXJncyhkcml2ZXIuYWRiKS5yZXR1cm5zKGltYWdlKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLmdldFNjcmVlbnNob3QoKTtcclxuICAgICAgZHJpdmVyLmFkYi5nZXRTY3JlZW5PcmllbnRhdGlvbi5ub3RDYWxsZWQuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIGltYWdlLnJvdGF0ZS5ub3RDYWxsZWQuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgbm90IHRocm93cyBlcnJvciBpZiByb3RhdGUgaW1hZ2UgZmFpbGVkJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBpbWFnZS5yb3RhdGUucmVzZXRCZWhhdmlvcigpO1xyXG4gICAgICBpbWFnZS5yb3RhdGUudGhyb3dzKCk7XHJcbiAgICAgIGRyaXZlci5hZGIuZ2V0QXBpTGV2ZWwucmV0dXJucygyMik7XHJcbiAgICAgIGRyaXZlci5nZXRTY3JlZW5zaG90RGF0YVdpdGhBZGJFeGVjT3V0LndpdGhBcmdzKGRyaXZlci5hZGIpLnJldHVybnMoaW1hZ2UpO1xyXG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0U2NyZWVuc2hvdCgpLnNob3VsZC5iZS5mdWxmaWxsZWQ7XHJcbiAgICAgIGltYWdlLnJvdGF0ZS50aHJldygpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi5cXC4uIn0=
