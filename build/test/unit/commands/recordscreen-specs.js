'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var _appiumTestSupport = require('appium-test-support');

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = new _2['default']();
var adb = new _appiumAdb2['default']();
driver.adb = adb;
describe('recording the screen', function () {
  this.timeout(60000);

  describe('basic', (0, _appiumTestSupport.withMocks)({ adb: adb, driver: driver }, function (mocks) {
    var remoteFile = '/sdcard/test.mp4';

    it('should fail to recording the screen on an emulator', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.driver.expects('isEmulator').returns(true);

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.startRecordingScreen(remoteFile).should.eventually.be.rejectedWith(/Screen recording does not work on emulators/));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should fail to recording the screen on a device with API level 18', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.driver.expects('isEmulator').returns(false);
            mocks.adb.expects('getApiLevel').returns(18);

            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.startRecordingScreen(remoteFile).should.eventually.be.rejectedWith(/Screen recording not available on API Level 18. Minimum API Level is 19/));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should fail if the specified file already exists', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.driver.expects('isEmulator').returns(false);
            mocks.adb.expects('getApiLevel').returns(19);
            mocks.adb.expects('fileExists').returns(true);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.startRecordingScreen(remoteFile).should.eventually.be.rejectedWith('Screen recording failed: \'' + remoteFile + '\' already exists.'));

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    describe('beginning the recording', function () {
      beforeEach(function () {
        mocks.driver.expects('isEmulator').returns(false);
        mocks.adb.expects('getApiLevel').returns(19);
        mocks.adb.expects('fileExists').returns(false);
      });
      afterEach(function () {
        mocks.driver.verify();
        mocks.adb.verify();
      });
      it('should call adb to start screen recording', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects('shell').once().withExactArgs(['screenrecord', remoteFile]).returns(new _bluebird2['default'](function () {}));
              mocks.adb.expects('fileSize').once().withExactArgs(remoteFile).returns(39571);

              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(driver.startRecordingScreen(remoteFile));

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      it('should call adb to start screen recording with non-default videoSize', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects('shell').once().withExactArgs(['screenrecord', remoteFile, '--size', 100]).returns(new _bluebird2['default'](function () {}));
              mocks.adb.expects('fileSize').once().withExactArgs(remoteFile).returns(39571);

              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(driver.startRecordingScreen(remoteFile, 100));

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      it('should call adb to start screen recording with non-default timeLimit', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects('shell').once().withExactArgs(['screenrecord', remoteFile, '--time-limit', 100]).returns(new _bluebird2['default'](function () {}));
              mocks.adb.expects('fileSize').once().withExactArgs(remoteFile).returns(39571);

              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(driver.startRecordingScreen(remoteFile, null, 100));

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      it('should call adb to start screen recording with non-default bitRate', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects('shell').once().withExactArgs(['screenrecord', remoteFile, '--bit-rate', 100]).returns(new _bluebird2['default'](function () {}));
              mocks.adb.expects('fileSize').once().withExactArgs(remoteFile).returns(39571);

              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(driver.startRecordingScreen(remoteFile, null, null, 100));

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      it('should fail if adb screen recording errors out', function callee$3$0() {
        var shellStub;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects('fileSize').withExactArgs(remoteFile).returns(31);
              shellStub = _sinon2['default'].stub(adb, 'shell');

              shellStub.returns(_bluebird2['default'].reject(new Error('shell command failed')));

              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(driver.startRecordingScreen(remoteFile).should.eventually.be.rejectedWith(/shell command failed/));

            case 5:

              shellStub.restore();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      it('should call ls multiple times until size is big enough', function callee$3$0() {
        var fileSizeStub;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects('shell').once().withExactArgs(['screenrecord', remoteFile]).returns(new _bluebird2['default'](function () {}));
              fileSizeStub = _sinon2['default'].stub(adb, 'fileSize');

              fileSizeStub.withArgs(remoteFile).onCall(0).returns(31).onCall(1).returns(42);

              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(driver.startRecordingScreen(remoteFile));

            case 5:

              fileSizeStub.restore();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      it('should call ls multiple times and fail if size never gets big enough', function callee$3$0() {
        var fileSizeStub;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects('shell').once().withExactArgs(['screenrecord', remoteFile]).returns(new _bluebird2['default'](function () {}));
              fileSizeStub = _sinon2['default'].stub(adb, 'fileSize');

              fileSizeStub.withArgs(remoteFile).returns(31);

              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(driver.startRecordingScreen(remoteFile).should.eventually.be.rejectedWith('Remote file \'' + remoteFile + '\' found but it is still too small: 31 bytes'));

            case 5:

              fileSizeStub.restore();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });

    describe('stopRecordingScreen', function () {
      afterEach(function () {
        mocks.adb.verify();
      });

      it('should kill the process', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects('killProcessesByName').once().withExactArgs('screenrecord');

              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(driver.stopRecordingScreen());

            case 3:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should fail if killProcessesByName fails', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects('killProcessesByName').once().withExactArgs('screenrecord').throws(new Error('process not killed'));

              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(driver.stopRecordingScreen().should.eventually.be.rejectedWith(/Unable to stop screen recording: process not killed/));

            case 3:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });
  }));
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9jb21tYW5kcy9yZWNvcmRzY3JlZW4tc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztnQkFDbkIsVUFBVTs7OztpQ0FDVixxQkFBcUI7O3lCQUMvQixZQUFZOzs7O3FCQUNWLE9BQU87Ozs7d0JBQ1gsVUFBVTs7OztBQUd4QixrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQUksTUFBTSxHQUFHLG1CQUFtQixDQUFDO0FBQ2pDLElBQUksR0FBRyxHQUFHLDRCQUFTLENBQUM7QUFDcEIsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDakIsUUFBUSxDQUFDLHNCQUFzQixFQUFFLFlBQVk7QUFDM0MsTUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFcEIsVUFBUSxDQUFDLE9BQU8sRUFBRSxrQ0FBVSxFQUFDLEdBQUcsRUFBSCxHQUFHLEVBQUUsTUFBTSxFQUFOLE1BQU0sRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ3BELFFBQUksVUFBVSxHQUFHLGtCQUFrQixDQUFDOztBQUVwQyxNQUFFLENBQUMsb0RBQW9ELEVBQUU7Ozs7QUFDdkQsaUJBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7OzZDQUUzQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLDZDQUE2QyxDQUFDOzs7Ozs7O0tBQy9ILENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyxtRUFBbUUsRUFBRTs7OztBQUN0RSxpQkFBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FB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QUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMscURBQXFELENBQUM7Ozs7Ozs7T0FDNUgsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDLENBQUM7Q0FDTCxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L2NvbW1hbmRzL3JlY29yZHNjcmVlbi1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xyXG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XHJcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uJztcclxuaW1wb3J0IHsgd2l0aE1vY2tzIH0gZnJvbSAnYXBwaXVtLXRlc3Qtc3VwcG9ydCc7XHJcbmltcG9ydCBBREIgZnJvbSAnYXBwaXVtLWFkYic7XHJcbmltcG9ydCBzaW5vbiBmcm9tICdzaW5vbic7XHJcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcclxuXHJcblxyXG5jaGFpLnNob3VsZCgpO1xyXG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XHJcblxyXG5sZXQgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcclxubGV0IGFkYiA9IG5ldyBBREIoKTtcclxuZHJpdmVyLmFkYiA9IGFkYjtcclxuZGVzY3JpYmUoJ3JlY29yZGluZyB0aGUgc2NyZWVuJywgZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMudGltZW91dCg2MDAwMCk7XHJcblxyXG4gIGRlc2NyaWJlKCdiYXNpYycsIHdpdGhNb2Nrcyh7YWRiLCBkcml2ZXJ9LCAobW9ja3MpID0+IHtcclxuICAgIGxldCByZW1vdGVGaWxlID0gJy9zZGNhcmQvdGVzdC5tcDQnO1xyXG5cclxuICAgIGl0KCdzaG91bGQgZmFpbCB0byByZWNvcmRpbmcgdGhlIHNjcmVlbiBvbiBhbiBlbXVsYXRvcicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgbW9ja3MuZHJpdmVyLmV4cGVjdHMoJ2lzRW11bGF0b3InKS5yZXR1cm5zKHRydWUpO1xyXG5cclxuICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0UmVjb3JkaW5nU2NyZWVuKHJlbW90ZUZpbGUpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvU2NyZWVuIHJlY29yZGluZyBkb2VzIG5vdCB3b3JrIG9uIGVtdWxhdG9ycy8pO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGZhaWwgdG8gcmVjb3JkaW5nIHRoZSBzY3JlZW4gb24gYSBkZXZpY2Ugd2l0aCBBUEkgbGV2ZWwgMTgnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIG1vY2tzLmRyaXZlci5leHBlY3RzKCdpc0VtdWxhdG9yJykucmV0dXJucyhmYWxzZSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRBcGlMZXZlbCcpLnJldHVybnMoMTgpO1xyXG5cclxuICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0UmVjb3JkaW5nU2NyZWVuKHJlbW90ZUZpbGUpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvU2NyZWVuIHJlY29yZGluZyBub3QgYXZhaWxhYmxlIG9uIEFQSSBMZXZlbCAxOC4gTWluaW11bSBBUEkgTGV2ZWwgaXMgMTkvKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBmYWlsIGlmIHRoZSBzcGVjaWZpZWQgZmlsZSBhbHJlYWR5IGV4aXN0cycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgbW9ja3MuZHJpdmVyLmV4cGVjdHMoJ2lzRW11bGF0b3InKS5yZXR1cm5zKGZhbHNlKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldEFwaUxldmVsJykucmV0dXJucygxOSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdmaWxlRXhpc3RzJykucmV0dXJucyh0cnVlKTtcclxuICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0UmVjb3JkaW5nU2NyZWVuKHJlbW90ZUZpbGUpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aChgU2NyZWVuIHJlY29yZGluZyBmYWlsZWQ6ICcke3JlbW90ZUZpbGV9JyBhbHJlYWR5IGV4aXN0cy5gKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdiZWdpbm5pbmcgdGhlIHJlY29yZGluZycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbW9ja3MuZHJpdmVyLmV4cGVjdHMoJ2lzRW11bGF0b3InKS5yZXR1cm5zKGZhbHNlKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0QXBpTGV2ZWwnKS5yZXR1cm5zKDE5KTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZmlsZUV4aXN0cycpLnJldHVybnMoZmFsc2UpO1xyXG4gICAgICB9KTtcclxuICAgICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBtb2Nrcy5kcml2ZXIudmVyaWZ5KCk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgICAgaXQoJ3Nob3VsZCBjYWxsIGFkYiB0byBzdGFydCBzY3JlZW4gcmVjb3JkaW5nJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpLm9uY2UoKVxyXG4gICAgICAgICAgLndpdGhFeGFjdEFyZ3MoWydzY3JlZW5yZWNvcmQnLCByZW1vdGVGaWxlXSkucmV0dXJucyhuZXcgQigoKSA9PiB7fSkpO1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdmaWxlU2l6ZScpLm9uY2UoKVxyXG4gICAgICAgICAgLndpdGhFeGFjdEFyZ3MocmVtb3RlRmlsZSkucmV0dXJucygzOTU3MSk7XHJcblxyXG4gICAgICAgIGF3YWl0IGRyaXZlci5zdGFydFJlY29yZGluZ1NjcmVlbihyZW1vdGVGaWxlKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgYWRiIHRvIHN0YXJ0IHNjcmVlbiByZWNvcmRpbmcgd2l0aCBub24tZGVmYXVsdCB2aWRlb1NpemUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJykub25jZSgpXHJcbiAgICAgICAgICAud2l0aEV4YWN0QXJncyhbJ3NjcmVlbnJlY29yZCcsIHJlbW90ZUZpbGUsICctLXNpemUnLCAxMDBdKS5yZXR1cm5zKG5ldyBCKCgpID0+IHt9KSk7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2ZpbGVTaXplJykub25jZSgpXHJcbiAgICAgICAgICAud2l0aEV4YWN0QXJncyhyZW1vdGVGaWxlKS5yZXR1cm5zKDM5NTcxKTtcclxuXHJcbiAgICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0UmVjb3JkaW5nU2NyZWVuKHJlbW90ZUZpbGUsIDEwMCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaXQoJ3Nob3VsZCBjYWxsIGFkYiB0byBzdGFydCBzY3JlZW4gcmVjb3JkaW5nIHdpdGggbm9uLWRlZmF1bHQgdGltZUxpbWl0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpLm9uY2UoKVxyXG4gICAgICAgICAgLndpdGhFeGFjdEFyZ3MoWydzY3JlZW5yZWNvcmQnLCByZW1vdGVGaWxlLCAnLS10aW1lLWxpbWl0JywgMTAwXSkucmV0dXJucyhuZXcgQigoKSA9PiB7fSkpO1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdmaWxlU2l6ZScpLm9uY2UoKVxyXG4gICAgICAgICAgLndpdGhFeGFjdEFyZ3MocmVtb3RlRmlsZSkucmV0dXJucygzOTU3MSk7XHJcblxyXG4gICAgICAgIGF3YWl0IGRyaXZlci5zdGFydFJlY29yZGluZ1NjcmVlbihyZW1vdGVGaWxlLCBudWxsLCAxMDApO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBhZGIgdG8gc3RhcnQgc2NyZWVuIHJlY29yZGluZyB3aXRoIG5vbi1kZWZhdWx0IGJpdFJhdGUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJykub25jZSgpXHJcbiAgICAgICAgICAud2l0aEV4YWN0QXJncyhbJ3NjcmVlbnJlY29yZCcsIHJlbW90ZUZpbGUsICctLWJpdC1yYXRlJywgMTAwXSkucmV0dXJucyhuZXcgQigoKSA9PiB7fSkpO1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdmaWxlU2l6ZScpLm9uY2UoKVxyXG4gICAgICAgICAgLndpdGhFeGFjdEFyZ3MocmVtb3RlRmlsZSkucmV0dXJucygzOTU3MSk7XHJcblxyXG4gICAgICAgIGF3YWl0IGRyaXZlci5zdGFydFJlY29yZGluZ1NjcmVlbihyZW1vdGVGaWxlLCBudWxsLCBudWxsLCAxMDApO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBhZGIgc2NyZWVuIHJlY29yZGluZyBlcnJvcnMgb3V0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdmaWxlU2l6ZScpXHJcbiAgICAgICAgICAud2l0aEV4YWN0QXJncyhyZW1vdGVGaWxlKS5yZXR1cm5zKDMxKTtcclxuICAgICAgICBsZXQgc2hlbGxTdHViID0gc2lub24uc3R1YihhZGIsICdzaGVsbCcpO1xyXG4gICAgICAgIHNoZWxsU3R1YlxyXG4gICAgICAgICAgLnJldHVybnMoQi5yZWplY3QobmV3IEVycm9yKCdzaGVsbCBjb21tYW5kIGZhaWxlZCcpKSk7XHJcblxyXG4gICAgICAgIGF3YWl0IGRyaXZlci5zdGFydFJlY29yZGluZ1NjcmVlbihyZW1vdGVGaWxlKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL3NoZWxsIGNvbW1hbmQgZmFpbGVkLyk7XHJcblxyXG4gICAgICAgIHNoZWxsU3R1Yi5yZXN0b3JlKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaXQoJ3Nob3VsZCBjYWxsIGxzIG11bHRpcGxlIHRpbWVzIHVudGlsIHNpemUgaXMgYmlnIGVub3VnaCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKS5vbmNlKClcclxuICAgICAgICAgIC53aXRoRXhhY3RBcmdzKFsnc2NyZWVucmVjb3JkJywgcmVtb3RlRmlsZV0pLnJldHVybnMobmV3IEIoKCkgPT4ge30pKTtcclxuICAgICAgICBsZXQgZmlsZVNpemVTdHViID0gc2lub24uc3R1YihhZGIsICdmaWxlU2l6ZScpO1xyXG4gICAgICAgIGZpbGVTaXplU3R1YlxyXG4gICAgICAgICAgLndpdGhBcmdzKHJlbW90ZUZpbGUpXHJcbiAgICAgICAgICAgIC5vbkNhbGwoMClcclxuICAgICAgICAgICAgICAucmV0dXJucygzMSlcclxuICAgICAgICAgICAgLm9uQ2FsbCgxKVxyXG4gICAgICAgICAgICAgIC5yZXR1cm5zKDQyKTtcclxuXHJcbiAgICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0UmVjb3JkaW5nU2NyZWVuKHJlbW90ZUZpbGUpO1xyXG5cclxuICAgICAgICBmaWxlU2l6ZVN0dWIucmVzdG9yZSgpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBscyBtdWx0aXBsZSB0aW1lcyBhbmQgZmFpbCBpZiBzaXplIG5ldmVyIGdldHMgYmlnIGVub3VnaCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKS5vbmNlKClcclxuICAgICAgICAgIC53aXRoRXhhY3RBcmdzKFsnc2NyZWVucmVjb3JkJywgcmVtb3RlRmlsZV0pLnJldHVybnMobmV3IEIoKCkgPT4ge30pKTtcclxuICAgICAgICBsZXQgZmlsZVNpemVTdHViID0gc2lub24uc3R1YihhZGIsICdmaWxlU2l6ZScpO1xyXG4gICAgICAgIGZpbGVTaXplU3R1Yi53aXRoQXJncyhyZW1vdGVGaWxlKS5yZXR1cm5zKDMxKTtcclxuXHJcbiAgICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0UmVjb3JkaW5nU2NyZWVuKHJlbW90ZUZpbGUpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aChgUmVtb3RlIGZpbGUgJyR7cmVtb3RlRmlsZX0nIGZvdW5kIGJ1dCBpdCBpcyBzdGlsbCB0b28gc21hbGw6IDMxIGJ5dGVzYCk7XHJcblxyXG4gICAgICAgIGZpbGVTaXplU3R1Yi5yZXN0b3JlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3N0b3BSZWNvcmRpbmdTY3JlZW4nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGFmdGVyRWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGl0KCdzaG91bGQga2lsbCB0aGUgcHJvY2VzcycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cygna2lsbFByb2Nlc3Nlc0J5TmFtZScpLm9uY2UoKVxyXG4gICAgICAgICAgLndpdGhFeGFjdEFyZ3MoJ3NjcmVlbnJlY29yZCcpO1xyXG5cclxuICAgICAgICBhd2FpdCBkcml2ZXIuc3RvcFJlY29yZGluZ1NjcmVlbigpO1xyXG4gICAgICB9KTtcclxuICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIGtpbGxQcm9jZXNzZXNCeU5hbWUgZmFpbHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2tpbGxQcm9jZXNzZXNCeU5hbWUnKS5vbmNlKClcclxuICAgICAgICAgIC53aXRoRXhhY3RBcmdzKCdzY3JlZW5yZWNvcmQnKVxyXG4gICAgICAgICAgLnRocm93cyhuZXcgRXJyb3IoJ3Byb2Nlc3Mgbm90IGtpbGxlZCcpKTtcclxuXHJcbiAgICAgICAgYXdhaXQgZHJpdmVyLnN0b3BSZWNvcmRpbmdTY3JlZW4oKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL1VuYWJsZSB0byBzdG9wIHNjcmVlbiByZWNvcmRpbmc6IHByb2Nlc3Mgbm90IGtpbGxlZC8pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0pKTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLlxcLi4ifQ==
