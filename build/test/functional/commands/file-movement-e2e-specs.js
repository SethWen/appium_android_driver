'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _2 = require('../../..');

var _3 = _interopRequireDefault(_2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _stream = require('stream');

var _stream2 = _interopRequireDefault(_stream);

var _unzip = require('unzip');

var _unzip2 = _interopRequireDefault(_unzip);

var _desired = require('../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var caps = _lodash2['default'].defaults({
  autoLaunch: false
}, _desired2['default']);

describe('file movement', function () {
  var _this = this;

  var driver = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _3['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  after(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.deleteSession());

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  function getRandomDir() {
    return '/data/local/tmp/test' + Math.random();
  }

  it('should push and pull a file', function callee$1$0() {
    var stringData, base64Data, remotePath, remoteData64, remoteData;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          stringData = 'random string data ' + Math.random();
          base64Data = new Buffer(stringData).toString('base64');
          remotePath = getRandomDir() + '/remote.txt';
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.pushFile(remotePath, base64Data));

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(driver.pullFile(remotePath));

        case 7:
          remoteData64 = context$2$0.sent;
          remoteData = new Buffer(remoteData64, 'base64').toString();

          remoteData.should.equal(stringData);

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('should pull a folder', function callee$1$0() {
    var stringData, base64Data, remoteDir, data, zipPromise;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          stringData = 'random string data ' + Math.random();
          base64Data = new Buffer(stringData).toString('base64');
          remoteDir = getRandomDir();
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.pushFile(remoteDir + '/remote0.txt', base64Data));

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(driver.pushFile(remoteDir + '/remote1.txt', base64Data));

        case 7:
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(driver.pullFolder(remoteDir));

        case 9:
          data = context$2$0.sent;
          zipPromise = new _bluebird2['default'](function (resolve) {
            var entryCount = 0;
            var zipStream = new _stream2['default'].Readable();
            zipStream._read = _lodash2['default'].noop;
            zipStream.pipe(_unzip2['default'].Parse()).on('entry', function (entry) {
              entryCount++;
              entry.autodrain();
            }).on('close', function () {
              resolve(entryCount);
            });
            zipStream.push(data, 'base64');
            zipStream.push(null);
          });
          context$2$0.next = 13;
          return _regeneratorRuntime.awrap(zipPromise);

        case 13:
          context$2$0.sent.should.equal(2);

        case 14:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});

// get the file and its contents, to check

// send the files, then pull the whole folder

// go through the folder we pulled and make sure the
// two files we pushed are in it
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maWxlLW1vdmVtZW50LWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2lCQUNuQixVQUFVOzs7O3NCQUN0QixRQUFROzs7O3dCQUNSLFVBQVU7Ozs7c0JBQ0wsUUFBUTs7OztxQkFDVCxPQUFPOzs7O3VCQUNBLFlBQVk7Ozs7QUFHckMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFJLElBQUksR0FBRyxvQkFBRSxRQUFRLENBQUM7QUFDcEIsWUFBVSxFQUFFLEtBQUs7Q0FDbEIsdUJBQWUsQ0FBQzs7QUFFakIsUUFBUSxDQUFDLGVBQWUsRUFBRSxZQUFZOzs7QUFDcEMsTUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLFFBQU0sQ0FBQzs7OztBQUNMLGdCQUFNLEdBQUcsbUJBQW1CLENBQUM7OzJDQUN2QixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzs7Ozs7OztHQUNqQyxDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDOztBQUVILFdBQVMsWUFBWSxHQUFJO0FBQ3ZCLG9DQUE4QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUc7R0FDL0M7O0FBRUQsSUFBRSxDQUFDLDZCQUE2QixFQUFFO1FBQzVCLFVBQVUsRUFDVixVQUFVLEVBQ1YsVUFBVSxFQUtWLFlBQVksRUFDWixVQUFVOzs7O0FBUlYsb0JBQVUsMkJBQXlCLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDaEQsb0JBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0FBQ3RELG9CQUFVLEdBQU0sWUFBWSxFQUFFOzsyQ0FFNUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDOzs7OzJDQUdwQixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQzs7O0FBQWhELHNCQUFZO0FBQ1osb0JBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFOztBQUM5RCxvQkFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7Ozs7Ozs7R0FDckMsQ0FBQyxDQUFDOztBQUVILElBQUUsQ0FBQyxzQkFBc0IsRUFBRTtRQUNyQixVQUFVLEVBQ1YsVUFBVSxFQUdWLFNBQVMsRUFHVCxJQUFJLEVBSUosVUFBVTs7OztBQVhWLG9CQUFVLDJCQUF5QixJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ2hELG9CQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztBQUd0RCxtQkFBUyxHQUFHLFlBQVksRUFBRTs7MkNBQ3hCLE1BQU0sQ0FBQyxRQUFRLENBQUksU0FBUyxtQkFBZ0IsVUFBVSxDQUFDOzs7OzJDQUN2RCxNQUFNLENBQUMsUUFBUSxDQUFJLFNBQVMsbUJBQWdCLFVBQVUsQ0FBQzs7OzsyQ0FDNUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7OztBQUF6QyxjQUFJO0FBSUosb0JBQVUsR0FBRywwQkFBTSxVQUFDLE9BQU8sRUFBSztBQUNsQyxnQkFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBQ25CLGdCQUFJLFNBQVMsR0FBRyxJQUFJLG9CQUFPLFFBQVEsRUFBRSxDQUFDO0FBQ3RDLHFCQUFTLENBQUMsS0FBSyxHQUFHLG9CQUFFLElBQUksQ0FBQztBQUN6QixxQkFBUyxDQUNOLElBQUksQ0FBQyxtQkFBTSxLQUFLLEVBQUUsQ0FBQyxDQUNuQixFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsS0FBSyxFQUFFO0FBQzVCLHdCQUFVLEVBQUUsQ0FBQztBQUNiLG1CQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbkIsQ0FBQyxDQUNELEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBWTtBQUN2QixxQkFBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3JCLENBQUMsQ0FBQztBQUNMLHFCQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMvQixxQkFBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztXQUN0QixDQUFDOzsyQ0FFSyxVQUFVOzs7MkJBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7O0dBQ2xDLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvZmlsZS1tb3ZlbWVudC1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcclxuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xyXG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLic7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcclxuaW1wb3J0IHN0cmVhbSBmcm9tICdzdHJlYW0nO1xyXG5pbXBvcnQgVW56aXAgZnJvbSAndW56aXAnO1xyXG5pbXBvcnQgREVGQVVMVF9DQVBTIGZyb20gJy4uL2Rlc2lyZWQnO1xyXG5cclxuXHJcbmNoYWkuc2hvdWxkKCk7XHJcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcclxuXHJcbmxldCBjYXBzID0gXy5kZWZhdWx0cyh7XHJcbiAgYXV0b0xhdW5jaDogZmFsc2VcclxufSwgREVGQVVMVF9DQVBTKTtcclxuXHJcbmRlc2NyaWJlKCdmaWxlIG1vdmVtZW50JywgZnVuY3Rpb24gKCkge1xyXG4gIGxldCBkcml2ZXI7XHJcbiAgYmVmb3JlKGFzeW5jICgpID0+IHtcclxuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XHJcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKTtcclxuICB9KTtcclxuICBhZnRlcihhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xyXG4gIH0pO1xyXG5cclxuICBmdW5jdGlvbiBnZXRSYW5kb21EaXIgKCkge1xyXG4gICAgcmV0dXJuIGAvZGF0YS9sb2NhbC90bXAvdGVzdCR7TWF0aC5yYW5kb20oKX1gO1xyXG4gIH1cclxuXHJcbiAgaXQoJ3Nob3VsZCBwdXNoIGFuZCBwdWxsIGEgZmlsZScsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCBzdHJpbmdEYXRhID0gYHJhbmRvbSBzdHJpbmcgZGF0YSAke01hdGgucmFuZG9tKCl9YDtcclxuICAgIGxldCBiYXNlNjREYXRhID0gbmV3IEJ1ZmZlcihzdHJpbmdEYXRhKS50b1N0cmluZygnYmFzZTY0Jyk7XHJcbiAgICBsZXQgcmVtb3RlUGF0aCA9IGAke2dldFJhbmRvbURpcigpfS9yZW1vdGUudHh0YDtcclxuXHJcbiAgICBhd2FpdCBkcml2ZXIucHVzaEZpbGUocmVtb3RlUGF0aCwgYmFzZTY0RGF0YSk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBmaWxlIGFuZCBpdHMgY29udGVudHMsIHRvIGNoZWNrXHJcbiAgICBsZXQgcmVtb3RlRGF0YTY0ID0gYXdhaXQgZHJpdmVyLnB1bGxGaWxlKHJlbW90ZVBhdGgpO1xyXG4gICAgbGV0IHJlbW90ZURhdGEgPSBuZXcgQnVmZmVyKHJlbW90ZURhdGE2NCwgJ2Jhc2U2NCcpLnRvU3RyaW5nKCk7XHJcbiAgICByZW1vdGVEYXRhLnNob3VsZC5lcXVhbChzdHJpbmdEYXRhKTtcclxuICB9KTtcclxuXHJcbiAgaXQoJ3Nob3VsZCBwdWxsIGEgZm9sZGVyJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IHN0cmluZ0RhdGEgPSBgcmFuZG9tIHN0cmluZyBkYXRhICR7TWF0aC5yYW5kb20oKX1gO1xyXG4gICAgbGV0IGJhc2U2NERhdGEgPSBuZXcgQnVmZmVyKHN0cmluZ0RhdGEpLnRvU3RyaW5nKCdiYXNlNjQnKTtcclxuXHJcbiAgICAvLyBzZW5kIHRoZSBmaWxlcywgdGhlbiBwdWxsIHRoZSB3aG9sZSBmb2xkZXJcclxuICAgIGxldCByZW1vdGVEaXIgPSBnZXRSYW5kb21EaXIoKTtcclxuICAgIGF3YWl0IGRyaXZlci5wdXNoRmlsZShgJHtyZW1vdGVEaXJ9L3JlbW90ZTAudHh0YCwgYmFzZTY0RGF0YSk7XHJcbiAgICBhd2FpdCBkcml2ZXIucHVzaEZpbGUoYCR7cmVtb3RlRGlyfS9yZW1vdGUxLnR4dGAsIGJhc2U2NERhdGEpO1xyXG4gICAgbGV0IGRhdGEgPSBhd2FpdCBkcml2ZXIucHVsbEZvbGRlcihyZW1vdGVEaXIpO1xyXG5cclxuICAgIC8vIGdvIHRocm91Z2ggdGhlIGZvbGRlciB3ZSBwdWxsZWQgYW5kIG1ha2Ugc3VyZSB0aGVcclxuICAgIC8vIHR3byBmaWxlcyB3ZSBwdXNoZWQgYXJlIGluIGl0XHJcbiAgICBsZXQgemlwUHJvbWlzZSA9IG5ldyBCKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIGxldCBlbnRyeUNvdW50ID0gMDtcclxuICAgICAgbGV0IHppcFN0cmVhbSA9IG5ldyBzdHJlYW0uUmVhZGFibGUoKTtcclxuICAgICAgemlwU3RyZWFtLl9yZWFkID0gXy5ub29wO1xyXG4gICAgICB6aXBTdHJlYW1cclxuICAgICAgICAucGlwZShVbnppcC5QYXJzZSgpKVxyXG4gICAgICAgIC5vbignZW50cnknLCBmdW5jdGlvbiAoZW50cnkpIHtcclxuICAgICAgICAgIGVudHJ5Q291bnQrKztcclxuICAgICAgICAgIGVudHJ5LmF1dG9kcmFpbigpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHJlc29sdmUoZW50cnlDb3VudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIHppcFN0cmVhbS5wdXNoKGRhdGEsICdiYXNlNjQnKTtcclxuICAgICAgemlwU3RyZWFtLnB1c2gobnVsbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAoYXdhaXQgemlwUHJvbWlzZSkuc2hvdWxkLmVxdWFsKDIpO1xyXG4gIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uXFwuLiJ9
