'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _libWebviewHelpers = require('../../lib/webview-helpers');

var _libWebviewHelpers2 = _interopRequireDefault(_libWebviewHelpers);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var sandbox = _sinon2['default'].sandbox.create();

describe('Webview Helpers', function () {
  var adb = new _appiumAdb2['default']();

  afterEach(function () {
    sandbox.restore();
  });

  describe('procFromWebview', function () {
    var webview = 'WEBVIEW_123';
    var pkg = 'io.appium.android.apis';

    it('should get package name when all fields are filled', function callee$2$0() {
      var name;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(adb, 'shell', function () {
              return 'USER           PID  PPID     VSZ    RSS WCHAN            ADDR S NAME\n' + 'root             1     0    9948   2344 SyS_epoll_wait      0 S init\n' + 'root             2     0       0      0 kthreadd            0 S [kthreadd]\n' + 'root             3     2       0      0 smpboot_thread_fn   0 S [ksoftirqd/0]\n' + 'root             5     2       0      0 worker_thread       0 S [kworker/0:0H]\n' + 'root             7     2       0      0 rcu_gp_kthread      0 S [rcu_preempt]\n' + 'u0_a88         123  1313 1513968 135756 ffffffff            0 R io.appium.android.apis\n';
            });

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libWebviewHelpers2['default'].procFromWebview(adb, webview));

          case 3:
            name = context$3$0.sent;

            name.should.eql(pkg);

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should get package name when some fields are empty', function callee$2$0() {
      var name;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(adb, 'shell', function () {
              return 'USER           PID  PPID     VSZ    RSS WCHAN            ADDR S NAME\n' + 'root             1     0    9948   2344 SyS_epoll_wait      0 S init\n' + 'root             2     0       0      0 kthreadd            0 S [kthreadd]\n' + 'root             3     2       0      0 smpboot_thread_fn   0 S [ksoftirqd/0]\n' + 'root             5     2       0      0 worker_thread       0 S [kworker/0:0H]\n' + 'root             7     2       0      0 rcu_gp_kthread      0 S [rcu_preempt]\n' + 'u0_a88         123  1313 1513968 135756                     0 R io.appium.android.apis\n';
            });

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libWebviewHelpers2['default'].procFromWebview(adb, webview));

          case 3:
            name = context$3$0.sent;

            name.should.eql(pkg);

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should get package name when some headers are empty', function callee$2$0() {
      var name;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(adb, 'shell', function () {
              return 'USER           PID  PPID     VSZ    RSS WCHAN            ADDR   NAME\n' + 'root             1     0    9948   2344 SyS_epoll_wait      0 S init\n' + 'root             2     0       0      0 kthreadd            0 S [kthreadd]\n' + 'root             3     2       0      0 smpboot_thread_fn   0 S [ksoftirqd/0]\n' + 'root             5     2       0      0 worker_thread       0 S [kworker/0:0H]\n' + 'root             7     2       0      0 rcu_gp_kthread      0 S [rcu_preempt]\n' + 'u0_a88         123  1313 1513968 135756 ffffffff            0 R io.appium.android.apis\n';
            });

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libWebviewHelpers2['default'].procFromWebview(adb, webview));

          case 3:
            name = context$3$0.sent;

            name.should.eql(pkg);

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should get package name when some headers and fields are empty', function callee$2$0() {
      var name;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(adb, 'shell', function () {
              return 'USER           PID  PPID     VSZ    RSS WCHAN            ADDR   NAME\n' + 'root             1     0    9948   2344 SyS_epoll_wait      0 S init\n' + 'root             2     0       0      0 kthreadd            0 S [kthreadd]\n' + 'root             3     2       0      0 smpboot_thread_fn   0 S [ksoftirqd/0]\n' + 'root             5     2       0      0 worker_thread       0 S [kworker/0:0H]\n' + 'root             7     2       0      0 rcu_gp_kthread      0 S [rcu_preempt]\n' + 'u0_a88         123  1313 1513968 135756                     0 R io.appium.android.apis\n';
            });

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libWebviewHelpers2['default'].procFromWebview(adb, webview));

          case 3:
            name = context$3$0.sent;

            name.should.eql(pkg);

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('When the webviews are obtained', function () {
    describe('for an app that embeds Chromium', function () {
      var webViews = undefined;

      beforeEach(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              sandbox.stub(adb, 'shell', function () {
                return 'Num       RefCount Protocol Flags    Type St Inode Path\n' + '0000000000000000: 00000002 00000000 00010000 0001 01  2818 /dev/socket/ss_conn_daemon\n' + '0000000000000000: 00000002 00000000 00010000 0001 01  9231 @mcdaemon\n' + '0000000000000000: 00000002 00000000 00010000 0001 01 245445 @webview_devtools_remote_123\n' + '0000000000000000: 00000002 00000000 00010000 0001 01  2826 /dev/socket/installd\n';
              });

              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(_libWebviewHelpers2['default'].getWebviews(adb, 'webview_devtools_remote_123'));

            case 3:
              webViews = context$4$0.sent;

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      it('then the unix sockets are queried', function () {
        adb.shell.calledOnce.should.be['true'];
        adb.shell.getCall(0).args[0].should.deep.equal(['cat', '/proc/net/unix']);
      });

      it('then the webview is returned', function () {
        webViews.length.should.equal(1);
        webViews.should.deep.equal(['WEBVIEW_123']);
      });
    });

    describe('for a Chromium webview', function () {
      var webViews = undefined;

      beforeEach(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              sandbox.stub(adb, 'shell', function () {
                return 'Num       RefCount Protocol Flags    Type St Inode Path\n' + '0000000000000000: 00000002 00000000 00010000 0001 01  2818 /dev/socket/ss_conn_daemon\n' + '0000000000000000: 00000002 00000000 00010000 0001 01  9231 @mcdaemon\n' + '0000000000000000: 00000002 00000000 00010000 0001 01 245445 @chrome_devtools_remote\n' + '0000000000000000: 00000002 00000000 00010000 0001 01  2826 /dev/socket/installd\n';
              });

              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(_libWebviewHelpers2['default'].getWebviews(adb, 'chrome_devtools_remote'));

            case 3:
              webViews = context$4$0.sent;

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      it('then the unix sockets are queried', function () {
        adb.shell.calledOnce.should.be['true'];
        adb.shell.getCall(0).args[0].should.deep.equal(['cat', '/proc/net/unix']);
      });

      it('then the webview is returned', function () {
        webViews.length.should.equal(1);
        webViews.should.deep.equal(['CHROMIUM']);
      });
    });

    describe('and no webviews exist', function () {
      var _this = this;

      var webViews = undefined;

      beforeEach(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              sandbox.stub(adb, 'shell', function () {
                return 'Num       RefCount Protocol Flags    Type St Inode Path\n' + '0000000000000000: 00000002 00000000 00010000 0001 01  2818 /dev/socket/ss_conn_daemon\n' + '0000000000000000: 00000002 00000000 00010000 0001 01  9231 @mcdaemon\n' + '0000000000000000: 00000002 00000000 00010000 0001 01  2826 /dev/socket/installd\n';
              });

              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(_libWebviewHelpers2['default'].getWebviews(adb));

            case 3:
              webViews = context$4$0.sent;

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });

      it('then the unix sockets are queried', function () {
        adb.shell.calledOnce.should.be['true'];
        adb.shell.getCall(0).args[0].should.deep.equal(['cat', '/proc/net/unix']);
      });

      it('then no webviews are returned', function () {
        webViews.length.should.equal(0);
      });
    });

    describe('and crosswalk webviews exist', function () {
      var webViews = undefined;

      beforeEach(function () {
        sandbox.stub(adb, 'shell', function () {
          return 'Num       RefCount Protocol Flags    Type St Inode Path\n' + '0000000000000000: 00000002 00000000 00010000 0001 01  2818 /dev/socket/ss_conn_daemon\n' + '0000000000000000: 00000002 00000000 00010000 0001 01  9231 @mcdaemon\n' + '0000000000000000: 00000002 00000000 00010000 0001 01 245445 @com.application.myapp_devtools_remote\n' + '0000000000000000: 00000002 00000000 00010000 0001 01  2826 /dev/socket/installd\n';
        });
      });

      describe('and the device socket is not specified', function () {
        var _this2 = this;

        beforeEach(function callee$4$0() {
          return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
            while (1) switch (context$5$0.prev = context$5$0.next) {
              case 0:
                context$5$0.next = 2;
                return _regeneratorRuntime.awrap(_libWebviewHelpers2['default'].getWebviews(adb));

              case 2:
                webViews = context$5$0.sent;

              case 3:
              case 'end':
                return context$5$0.stop();
            }
          }, null, _this2);
        });

        it('then the unix sockets are queried', function () {
          adb.shell.calledOnce.should.be['true'];
          adb.shell.getCall(0).args[0].should.deep.equal(['cat', '/proc/net/unix']);
        });

        it('then the webview is returned', function () {
          webViews.length.should.equal(1);
          webViews.should.deep.equal(['WEBVIEW_com.application.myapp']);
        });
      });

      describe('and the device socket is specified', function () {
        beforeEach(function callee$4$0() {
          return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
            while (1) switch (context$5$0.prev = context$5$0.next) {
              case 0:
                context$5$0.next = 2;
                return _regeneratorRuntime.awrap(_libWebviewHelpers2['default'].getWebviews(adb, 'com.application.myapp_devtools_remote'));

              case 2:
                webViews = context$5$0.sent;

              case 3:
              case 'end':
                return context$5$0.stop();
            }
          }, null, this);
        });

        it('then the unix sockets are queried', function () {
          adb.shell.calledOnce.should.be['true'];
          adb.shell.getCall(0).args[0].should.deep.equal(['cat', '/proc/net/unix']);
        });

        it('then the webview is returned', function () {
          webViews.length.should.equal(1);
          webViews.should.deep.equal(['WEBVIEW_com.application.myapp']);
        });
      });

      describe('and the device socket is specified but is not found', function () {
        beforeEach(function callee$4$0() {
          return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
            while (1) switch (context$5$0.prev = context$5$0.next) {
              case 0:
                context$5$0.next = 2;
                return _regeneratorRuntime.awrap(_libWebviewHelpers2['default'].getWebviews(adb, 'com.application.myotherapp_devtools_remote'));

              case 2:
                webViews = context$5$0.sent;

              case 3:
              case 'end':
                return context$5$0.stop();
            }
          }, null, this);
        });

        it('then the unix sockets are queried', function () {
          adb.shell.calledOnce.should.be['true'];
          adb.shell.getCall(0).args[0].should.deep.equal(['cat', '/proc/net/unix']);
        });

        it('then no webviews are returned', function () {
          webViews.length.should.equal(0);
        });
      });
    });

    describe('and webviews exist', function () {
      var webViews = undefined;

      beforeEach(function callee$3$0() {
        var shellStub;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              shellStub = sandbox.stub(adb, 'shell');

              shellStub.onCall(0).returns('Num               RefCount Protocol Flags    Type St Inode Path\n' + '0000000000000000: 00000002 00000000 00010000 0001 01  2818 /dev/socket/ss_conn_daemon\n' + '0000000000000000: 00000002 00000000 00010000 0001 01  9231 @mcdaemon\n' + '0000000000000000: 00000002 00000000 00010000 0001 01 245445 @webview_devtools_remote_1234\n' + '0000000000000000: 00000002 00000000 00010000 0001 01  2826 /dev/socket/installd\n');
              shellStub.onCall(1).returns('USER    PID  PPID VSIZE   RSS   WCHAN              PC   NAME\n' + 'root      1     0  5792   988   SyS_epoll_ 0000000000 S /init\n' + 'root      2     0     0     0   kthreadd   0000000000 S kthreadd\n' + 'root   1234     2     0     0   SyS_epoll_ 0000000000 S com.application.myapp\n');

              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(_libWebviewHelpers2['default'].getWebviews(adb));

            case 5:
              webViews = context$4$0.sent;

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      it('then the unix sockets and process list are queried', function () {
        adb.shell.calledTwice.should.be['true'];
        adb.shell.getCall(0).args[0].should.deep.equal(['cat', '/proc/net/unix']);
        adb.shell.getCall(1).args[0].should.equal('ps');
      });

      it('then the webview is returned', function () {
        webViews.length.should.equal(1);
        webViews.should.deep.equal(['WEBVIEW_com.application.myapp']);
      });
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC93ZWJ2aWV3LWhlbHBlci1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7cUJBQWtCLE9BQU87Ozs7aUNBQ0wsMkJBQTJCOzs7O3lCQUMvQixZQUFZOzs7O0FBRTVCLElBQUksT0FBTyxHQUFHLG1CQUFNLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7QUFFckMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLFlBQU07QUFDaEMsTUFBSSxHQUFHLEdBQUcsNEJBQVMsQ0FBQzs7QUFFcEIsV0FBUyxDQUFDLFlBQU07QUFDZCxXQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7R0FDbkIsQ0FBQyxDQUFDOztBQUVILFVBQVEsQ0FBQyxpQkFBaUIsRUFBRSxZQUFZO0FBQ3RDLFFBQU0sT0FBTyxHQUFHLGFBQWEsQ0FBQztBQUM5QixRQUFNLEdBQUcsR0FBRyx3QkFBd0IsQ0FBQzs7QUFFckMsTUFBRSxDQUFDLG9EQUFvRCxFQUFFO1VBV25ELElBQUk7Ozs7QUFWUixtQkFBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLFlBQVk7QUFDckMscUJBQU8sd0VBQXdFLEdBQ3hFLHdFQUF3RSxHQUN4RSw4RUFBOEUsR0FDOUUsaUZBQWlGLEdBQ2pGLGtGQUFrRixHQUNsRixpRkFBaUYsR0FDakYsMEZBQTBGLENBQUM7YUFDbkcsQ0FBQyxDQUFDOzs7NkNBRWMsK0JBQVEsZUFBZSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7OztBQUFsRCxnQkFBSTs7QUFDUixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7S0FDdEIsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLG9EQUFvRCxFQUFFO1VBV25ELElBQUk7Ozs7QUFWUixtQkFBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLFlBQVk7QUFDckMscUJBQU8sd0VBQXdFLEdBQ3hFLHdFQUF3RSxHQUN4RSw4RUFBOEUs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LENBQUM7OzsrQ0FFOUYsK0JBQVEsV0FBVyxDQUFDLEdBQUcsQ0FBQzs7O0FBQXpDLHNCQUFROzs7Ozs7O09BQ1QsQ0FBQyxDQUFDOztBQUVILFFBQUUsQ0FBQyxvREFBb0QsRUFBRSxZQUFZO0FBQ25FLFdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQUssQ0FBQztBQUNyQyxXQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0FBQzFFLFdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO09BQ2pELENBQUMsQ0FBQzs7QUFFSCxRQUFFLENBQUMsOEJBQThCLEVBQUUsWUFBWTtBQUM3QyxnQkFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDLGdCQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLENBQUM7T0FDL0QsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvdW5pdC93ZWJ2aWV3LWhlbHBlci1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzaW5vbiBmcm9tICdzaW5vbic7XHJcbmltcG9ydCBoZWxwZXJzIGZyb20gJy4uLy4uL2xpYi93ZWJ2aWV3LWhlbHBlcnMnO1xyXG5pbXBvcnQgQURCIGZyb20gJ2FwcGl1bS1hZGInO1xyXG5cclxubGV0IHNhbmRib3ggPSBzaW5vbi5zYW5kYm94LmNyZWF0ZSgpO1xyXG5cclxuZGVzY3JpYmUoJ1dlYnZpZXcgSGVscGVycycsICgpID0+IHtcclxuICBsZXQgYWRiID0gbmV3IEFEQigpO1xyXG5cclxuICBhZnRlckVhY2goKCkgPT4ge1xyXG4gICAgc2FuZGJveC5yZXN0b3JlKCk7XHJcbiAgfSk7XHJcblxyXG4gIGRlc2NyaWJlKCdwcm9jRnJvbVdlYnZpZXcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCB3ZWJ2aWV3ID0gJ1dFQlZJRVdfMTIzJztcclxuICAgIGNvbnN0IHBrZyA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJztcclxuXHJcbiAgICBpdCgnc2hvdWxkIGdldCBwYWNrYWdlIG5hbWUgd2hlbiBhbGwgZmllbGRzIGFyZSBmaWxsZWQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHNhbmRib3guc3R1YihhZGIsICdzaGVsbCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJ1VTRVIgICAgICAgICAgIFBJRCAgUFBJRCAgICAgVlNaICAgIFJTUyBXQ0hBTiAgICAgICAgICAgIEFERFIgUyBOQU1FXFxuJyArXHJcbiAgICAgICAgICAgICAgICdyb290ICAgICAgICAgICAgIDEgICAgIDAgICAgOTk0OCAgIDIzNDQgU3lTX2Vwb2xsX3dhaXQgICAgICAwIFMgaW5pdFxcbicgK1xyXG4gICAgICAgICAgICAgICAncm9vdCAgICAgICAgICAgICAyICAgICAwICAgICAgIDAgICAgICAwIGt0aHJlYWRkICAgICAgICAgICAgMCBTIFtrdGhyZWFkZF1cXG4nICtcclxuICAgICAgICAgICAgICAgJ3Jvb3QgICAgICAgICAgICAgMyAgICAgMiAgICAgICAwICAgICAgMCBzbXBib290X3RocmVhZF9mbiAgIDAgUyBba3NvZnRpcnFkLzBdXFxuJyArXHJcbiAgICAgICAgICAgICAgICdyb290ICAgICAgICAgICAgIDUgICAgIDIgICAgICAgMCAgICAgIDAgd29ya2VyX3RocmVhZCAgICAgICAwIFMgW2t3b3JrZXIvMDowSF1cXG4nICtcclxuICAgICAgICAgICAgICAgJ3Jvb3QgICAgICAgICAgICAgNyAgICAgMiAgICAgICAwICAgICAgMCByY3VfZ3Bfa3RocmVhZCAgICAgIDAgUyBbcmN1X3ByZWVtcHRdXFxuJyArXHJcbiAgICAgICAgICAgICAgICd1MF9hODggICAgICAgICAxMjMgIDEzMTMgMTUxMzk2OCAxMzU3NTYgZmZmZmZmZmYgICAgICAgICAgICAwIFIgaW8uYXBwaXVtLmFuZHJvaWQuYXBpc1xcbic7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgbGV0IG5hbWUgPSBhd2FpdCBoZWxwZXJzLnByb2NGcm9tV2VidmlldyhhZGIsIHdlYnZpZXcpO1xyXG4gICAgICBuYW1lLnNob3VsZC5lcWwocGtnKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBnZXQgcGFja2FnZSBuYW1lIHdoZW4gc29tZSBmaWVsZHMgYXJlIGVtcHR5JywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBzYW5kYm94LnN0dWIoYWRiLCAnc2hlbGwnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICdVU0VSICAgICAgICAgICBQSUQgIFBQSUQgICAgIFZTWiAgICBSU1MgV0NIQU4gICAgICAgICAgICBBRERSIFMgTkFNRVxcbicgK1xyXG4gICAgICAgICAgICAgICAncm9vdCAgICAgICAgICAgICAxICAgICAwICAgIDk5NDggICAyMzQ0IFN5U19lcG9sbF93YWl0ICAgICAgMCBTIGluaXRcXG4nICtcclxuICAgICAgICAgICAgICAgJ3Jvb3QgICAgICAgICAgICAgMiAgICAgMCAgICAgICAwICAgICAgMCBrdGhyZWFkZCAgICAgICAgICAgIDAgUyBba3RocmVhZGRdXFxuJyArXHJcbiAgICAgICAgICAgICAgICdyb290ICAgICAgICAgICAgIDMgICAgIDIgICAgICAgMCAgICAgIDAgc21wYm9vdF90aHJlYWRfZm4gICAwIFMgW2tzb2Z0aXJxZC8wXVxcbicgK1xyXG4gICAgICAgICAgICAgICAncm9vdCAgICAgICAgICAgICA1ICAgICAyICAgICAgIDAgICAgICAwIHdvcmtlcl90aHJlYWQgICAgICAgMCBTIFtrd29ya2VyLzA6MEhdXFxuJyArXHJcbiAgICAgICAgICAgICAgICdyb290ICAgICAgICAgICAgIDcgICAgIDIgICAgICAgMCAgICAgIDAgcmN1X2dwX2t0aHJlYWQgICAgICAwIFMgW3JjdV9wcmVlbXB0XVxcbicgK1xyXG4gICAgICAgICAgICAgICAndTBfYTg4ICAgICAgICAgMTIzICAxMzEzIDE1MTM5NjggMTM1NzU2ICAgICAgICAgICAgICAgICAgICAgMCBSIGlvLmFwcGl1bS5hbmRyb2lkLmFwaXNcXG4nO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGxldCBuYW1lID0gYXdhaXQgaGVscGVycy5wcm9jRnJvbVdlYnZpZXcoYWRiLCB3ZWJ2aWV3KTtcclxuICAgICAgbmFtZS5zaG91bGQuZXFsKHBrZyk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgZ2V0IHBhY2thZ2UgbmFtZSB3aGVuIHNvbWUgaGVhZGVycyBhcmUgZW1wdHknLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHNhbmRib3guc3R1YihhZGIsICdzaGVsbCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJ1VTRVIgICAgICAgICAgIFBJRCAgUFBJRCAgICAgVlNaICAgIFJTUyBXQ0hBTiAgICAgICAgICAgIEFERFIgICBOQU1FXFxuJyArXHJcbiAgICAgICAgICAgICAgICdyb290ICAgICAgICAgICAgIDEgICAgIDAgICAgOTk0OCAgIDIzNDQgU3lTX2Vwb2xsX3dhaXQgICAgICAwIFMgaW5pdFxcbicgK1xyXG4gICAgICAgICAgICAgICAncm9vdCAgICAgICAgICAgICAyICAgICAwICAgICAgIDAgICAgICAwIGt0aHJlYWRkICAgICAgICAgICAgMCBTIFtrdGhyZWFkZF1cXG4nICtcclxuICAgICAgICAgICAgICAgJ3Jvb3QgICAgICAgICAgICAgMyAgICAgMiAgICAgICAwICAgICAgMCBzbXBib290X3RocmVhZF9mbiAgIDAgUyBba3NvZnRpcnFkLzBdXFxuJyArXHJcbiAgICAgICAgICAgICAgICdyb290ICAgICAgICAgICAgIDUgICAgIDIgICAgICAgMCAgICAgIDAgd29ya2VyX3RocmVhZCAgICAgICAwIFMgW2t3b3JrZXIvMDowSF1cXG4nICtcclxuICAgICAgICAgICAgICAgJ3Jvb3QgICAgICAgICAgICAgNyAgICAgMiAgICAgICAwICAgICAgMCByY3VfZ3Bfa3RocmVhZCAgICAgIDAgUyBbcmN1X3ByZWVtcHRdXFxuJyArXHJcbiAgICAgICAgICAgICAgICd1MF9hODggICAgICAgICAxMjMgIDEzMTMgMTUxMzk2OCAxMzU3NTYgZmZmZmZmZmYgICAgICAgICAgICAwIFIgaW8uYXBwaXVtLmFuZHJvaWQuYXBpc1xcbic7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgbGV0IG5hbWUgPSBhd2FpdCBoZWxwZXJzLnByb2NGcm9tV2VidmlldyhhZGIsIHdlYnZpZXcpO1xyXG4gICAgICBuYW1lLnNob3VsZC5lcWwocGtnKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBnZXQgcGFja2FnZSBuYW1lIHdoZW4gc29tZSBoZWFkZXJzIGFuZCBmaWVsZHMgYXJlIGVtcHR5JywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBzYW5kYm94LnN0dWIoYWRiLCAnc2hlbGwnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICdVU0VSICAgICAgICAgICBQSUQgIFBQSUQgICAgIFZTWiAgICBSU1MgV0NIQU4gICAgICAgICAgICBBRERSICAgTkFNRVxcbicgK1xyXG4gICAgICAgICAgICAgICAncm9vdCAgICAgICAgICAgICAxICAgICAwICAgIDk5NDggICAyMzQ0IFN5U19lcG9sbF93YWl0ICAgICAgMCBTIGluaXRcXG4nICtcclxuICAgICAgICAgICAgICAgJ3Jvb3QgICAgICAgICAgICAgMiAgICAgMCAgICAgICAwICAgICAgMCBrdGhyZWFkZCAgICAgICAgICAgIDAgUyBba3RocmVhZGRdXFxuJyArXHJcbiAgICAgICAgICAgICAgICdyb290ICAgICAgICAgICAgIDMgICAgIDIgICAgICAgMCAgICAgIDAgc21wYm9vdF90aHJlYWRfZm4gICAwIFMgW2tzb2Z0aXJxZC8wXVxcbicgK1xyXG4gICAgICAgICAgICAgICAncm9vdCAgICAgICAgICAgICA1ICAgICAyICAgICAgIDAgICAgICAwIHdvcmtlcl90aHJlYWQgICAgICAgMCBTIFtrd29ya2VyLzA6MEhdXFxuJyArXHJcbiAgICAgICAgICAgICAgICdyb290ICAgICAgICAgICAgIDcgICAgIDIgICAgICAgMCAgICAgIDAgcmN1X2dwX2t0aHJlYWQgICAgICAwIFMgW3JjdV9wcmVlbXB0XVxcbicgK1xyXG4gICAgICAgICAgICAgICAndTBfYTg4ICAgICAgICAgMTIzICAxMzEzIDE1MTM5NjggMTM1NzU2ICAgICAgICAgICAgICAgICAgICAgMCBSIGlvLmFwcGl1bS5hbmRyb2lkLmFwaXNcXG4nO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGxldCBuYW1lID0gYXdhaXQgaGVscGVycy5wcm9jRnJvbVdlYnZpZXcoYWRiLCB3ZWJ2aWV3KTtcclxuICAgICAgbmFtZS5zaG91bGQuZXFsKHBrZyk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbiAgZGVzY3JpYmUoJ1doZW4gdGhlIHdlYnZpZXdzIGFyZSBvYnRhaW5lZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIGRlc2NyaWJlKCdmb3IgYW4gYXBwIHRoYXQgZW1iZWRzIENocm9taXVtJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgd2ViVmlld3M7XHJcblxyXG4gICAgICBiZWZvcmVFYWNoKGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzYW5kYm94LnN0dWIoYWRiLCAnc2hlbGwnLCAoKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gJ051bSAgICAgICBSZWZDb3VudCBQcm90b2NvbCBGbGFncyAgICBUeXBlIFN0IElub2RlIFBhdGhcXG4nICtcclxuICAgICAgICAgICAgICAgICcwMDAwMDAwMDAwMDAwMDAwOiAwMDAwMDAwMiAwMDAwMDAwMCAwMDAxMDAwMCAwMDAxIDAxICAyODE4IC9kZXYvc29ja2V0L3NzX2Nvbm5fZGFlbW9uXFxuJyArXHJcbiAgICAgICAgICAgICAgICAnMDAwMDAwMDAwMDAwMDAwMDogMDAwMDAwMDIgMDAwMDAwMDAgMDAwMTAwMDAgMDAwMSAwMSAgOTIzMSBAbWNkYWVtb25cXG4nICtcclxuICAgICAgICAgICAgICAgICcwMDAwMDAwMDAwMDAwMDAwOiAwMDAwMDAwMiAwMDAwMDAwMCAwMDAxMDAwMCAwMDAxIDAxIDI0NTQ0NSBAd2Vidmlld19kZXZ0b29sc19yZW1vdGVfMTIzXFxuJyArXHJcbiAgICAgICAgICAgICAgICAnMDAwMDAwMDAwMDAwMDAwMDogMDAwMDAwMDIgMDAwMDAwMDAgMDAwMTAwMDAgMDAwMSAwMSAgMjgyNiAvZGV2L3NvY2tldC9pbnN0YWxsZFxcbic7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHdlYlZpZXdzID0gYXdhaXQgaGVscGVycy5nZXRXZWJ2aWV3cyhhZGIsICd3ZWJ2aWV3X2RldnRvb2xzX3JlbW90ZV8xMjMnKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpdCgndGhlbiB0aGUgdW5peCBzb2NrZXRzIGFyZSBxdWVyaWVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGFkYi5zaGVsbC5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICAgIGFkYi5zaGVsbC5nZXRDYWxsKDApLmFyZ3NbMF0uc2hvdWxkLmRlZXAuZXF1YWwoWydjYXQnLCAnL3Byb2MvbmV0L3VuaXgnXSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaXQoJ3RoZW4gdGhlIHdlYnZpZXcgaXMgcmV0dXJuZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2ViVmlld3MubGVuZ3RoLnNob3VsZC5lcXVhbCgxKTtcclxuICAgICAgICB3ZWJWaWV3cy5zaG91bGQuZGVlcC5lcXVhbChbJ1dFQlZJRVdfMTIzJ10pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdmb3IgYSBDaHJvbWl1bSB3ZWJ2aWV3JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgd2ViVmlld3M7XHJcblxyXG4gICAgICBiZWZvcmVFYWNoKGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzYW5kYm94LnN0dWIoYWRiLCAnc2hlbGwnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ051bSAgICAgICBSZWZDb3VudCBQcm90b2NvbCBGbGFncyAgICBUeXBlIFN0IElub2RlIFBhdGhcXG4nICtcclxuICAgICAgICAgICAgICAgICcwMDAwMDAwMDAwMDAwMDAwOiAwMDAwMDAwMiAwMDAwMDAwMCAwMDAxMDAwMCAwMDAxIDAxICAyODE4IC9kZXYvc29ja2V0L3NzX2Nvbm5fZGFlbW9uXFxuJyArXHJcbiAgICAgICAgICAgICAgICAnMDAwMDAwMDAwMDAwMDAwMDogMDAwMDAwMDIgMDAwMDAwMDAgMDAwMTAwMDAgMDAwMSAwMSAgOTIzMSBAbWNkYWVtb25cXG4nICtcclxuICAgICAgICAgICAgICAgICcwMDAwMDAwMDAwMDAwMDAwOiAwMDAwMDAwMiAwMDAwMDAwMCAwMDAxMDAwMCAwMDAxIDAxIDI0NTQ0NSBAY2hyb21lX2RldnRvb2xzX3JlbW90ZVxcbicgK1xyXG4gICAgICAgICAgICAgICAgJzAwMDAwMDAwMDAwMDAwMDA6IDAwMDAwMDAyIDAwMDAwMDAwIDAwMDEwMDAwIDAwMDEgMDEgIDI4MjYgL2Rldi9zb2NrZXQvaW5zdGFsbGRcXG4nO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB3ZWJWaWV3cyA9IGF3YWl0IGhlbHBlcnMuZ2V0V2Vidmlld3MoYWRiLCAnY2hyb21lX2RldnRvb2xzX3JlbW90ZScpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGl0KCd0aGVuIHRoZSB1bml4IHNvY2tldHMgYXJlIHF1ZXJpZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYWRiLnNoZWxsLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgICAgYWRiLnNoZWxsLmdldENhbGwoMCkuYXJnc1swXS5zaG91bGQuZGVlcC5lcXVhbChbJ2NhdCcsICcvcHJvYy9uZXQvdW5peCddKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpdCgndGhlbiB0aGUgd2VidmlldyBpcyByZXR1cm5lZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3ZWJWaWV3cy5sZW5ndGguc2hvdWxkLmVxdWFsKDEpO1xyXG4gICAgICAgIHdlYlZpZXdzLnNob3VsZC5kZWVwLmVxdWFsKFsnQ0hST01JVU0nXSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2FuZCBubyB3ZWJ2aWV3cyBleGlzdCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IHdlYlZpZXdzO1xyXG5cclxuICAgICAgYmVmb3JlRWFjaChhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgc2FuZGJveC5zdHViKGFkYiwgJ3NoZWxsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgcmV0dXJuICdOdW0gICAgICAgUmVmQ291bnQgUHJvdG9jb2wgRmxhZ3MgICAgVHlwZSBTdCBJbm9kZSBQYXRoXFxuJyArXHJcbiAgICAgICAgICAgICAgICAnMDAwMDAwMDAwMDAwMDAwMDogMDAwMDAwMDIgMDAwMDAwMDAgMDAwMTAwMDAgMDAwMSAwMSAgMjgxOCAvZGV2L3NvY2tldC9zc19jb25uX2RhZW1vblxcbicgK1xyXG4gICAgICAgICAgICAgICAgJzAwMDAwMDAwMDAwMDAwMDA6IDAwMDAwMDAyIDAwMDAwMDAwIDAwMDEwMDAwIDAwMDEgMDEgIDkyMzEgQG1jZGFlbW9uXFxuJyArXHJcbiAgICAgICAgICAgICAgICAnMDAwMDAwMDAwMDAwMDAwMDogMDAwMDAwMDIgMDAwMDAwMDAgMDAwMTAwMDAgMDAwMSAwMSAgMjgyNiAvZGV2L3NvY2tldC9pbnN0YWxsZFxcbic7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHdlYlZpZXdzID0gYXdhaXQgaGVscGVycy5nZXRXZWJ2aWV3cyhhZGIpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGl0KCd0aGVuIHRoZSB1bml4IHNvY2tldHMgYXJlIHF1ZXJpZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYWRiLnNoZWxsLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgICAgYWRiLnNoZWxsLmdldENhbGwoMCkuYXJnc1swXS5zaG91bGQuZGVlcC5lcXVhbChbJ2NhdCcsICcvcHJvYy9uZXQvdW5peCddKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpdCgndGhlbiBubyB3ZWJ2aWV3cyBhcmUgcmV0dXJuZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2ViVmlld3MubGVuZ3RoLnNob3VsZC5lcXVhbCgwKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnYW5kIGNyb3Nzd2FsayB3ZWJ2aWV3cyBleGlzdCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IHdlYlZpZXdzO1xyXG5cclxuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XHJcbiAgICAgICAgc2FuZGJveC5zdHViKGFkYiwgJ3NoZWxsJywgKCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuICdOdW0gICAgICAgUmVmQ291bnQgUHJvdG9jb2wgRmxhZ3MgICAgVHlwZSBTdCBJbm9kZSBQYXRoXFxuJyArXHJcbiAgICAgICAgICAgICAgICAnMDAwMDAwMDAwMDAwMDAwMDogMDAwMDAwMDIgMDAwMDAwMDAgMDAwMTAwMDAgMDAwMSAwMSAgMjgxOCAvZGV2L3NvY2tldC9zc19jb25uX2RhZW1vblxcbicgK1xyXG4gICAgICAgICAgICAgICAgJzAwMDAwMDAwMDAwMDAwMDA6IDAwMDAwMDAyIDAwMDAwMDAwIDAwMDEwMDAwIDAwMDEgMDEgIDkyMzEgQG1jZGFlbW9uXFxuJyArXHJcbiAgICAgICAgICAgICAgICAnMDAwMDAwMDAwMDAwMDAwMDogMDAwMDAwMDIgMDAwMDAwMDAgMDAwMTAwMDAgMDAwMSAwMSAyNDU0NDUgQGNvbS5hcHBsaWNhdGlvbi5teWFwcF9kZXZ0b29sc19yZW1vdGVcXG4nICtcclxuICAgICAgICAgICAgICAgICcwMDAwMDAwMDAwMDAwMDAwOiAwMDAwMDAwMiAwMDAwMDAwMCAwMDAxMDAwMCAwMDAxIDAxICAyODI2IC9kZXYvc29ja2V0L2luc3RhbGxkXFxuJztcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBkZXNjcmliZSgnYW5kIHRoZSBkZXZpY2Ugc29ja2V0IGlzIG5vdCBzcGVjaWZpZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYmVmb3JlRWFjaChhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICB3ZWJWaWV3cyA9IGF3YWl0IGhlbHBlcnMuZ2V0V2Vidmlld3MoYWRiKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3RoZW4gdGhlIHVuaXggc29ja2V0cyBhcmUgcXVlcmllZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGFkYi5zaGVsbC5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICAgICAgYWRiLnNoZWxsLmdldENhbGwoMCkuYXJnc1swXS5zaG91bGQuZGVlcC5lcXVhbChbJ2NhdCcsICcvcHJvYy9uZXQvdW5peCddKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3RoZW4gdGhlIHdlYnZpZXcgaXMgcmV0dXJuZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICB3ZWJWaWV3cy5sZW5ndGguc2hvdWxkLmVxdWFsKDEpO1xyXG4gICAgICAgICAgd2ViVmlld3Muc2hvdWxkLmRlZXAuZXF1YWwoWydXRUJWSUVXX2NvbS5hcHBsaWNhdGlvbi5teWFwcCddKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBkZXNjcmliZSgnYW5kIHRoZSBkZXZpY2Ugc29ja2V0IGlzIHNwZWNpZmllZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBiZWZvcmVFYWNoKGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHdlYlZpZXdzID0gYXdhaXQgaGVscGVycy5nZXRXZWJ2aWV3cyhhZGIsICdjb20uYXBwbGljYXRpb24ubXlhcHBfZGV2dG9vbHNfcmVtb3RlJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCd0aGVuIHRoZSB1bml4IHNvY2tldHMgYXJlIHF1ZXJpZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBhZGIuc2hlbGwuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgICAgIGFkYi5zaGVsbC5nZXRDYWxsKDApLmFyZ3NbMF0uc2hvdWxkLmRlZXAuZXF1YWwoWydjYXQnLCAnL3Byb2MvbmV0L3VuaXgnXSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCd0aGVuIHRoZSB3ZWJ2aWV3IGlzIHJldHVybmVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgd2ViVmlld3MubGVuZ3RoLnNob3VsZC5lcXVhbCgxKTtcclxuICAgICAgICAgIHdlYlZpZXdzLnNob3VsZC5kZWVwLmVxdWFsKFsnV0VCVklFV19jb20uYXBwbGljYXRpb24ubXlhcHAnXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgZGVzY3JpYmUoJ2FuZCB0aGUgZGV2aWNlIHNvY2tldCBpcyBzcGVjaWZpZWQgYnV0IGlzIG5vdCBmb3VuZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBiZWZvcmVFYWNoKGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHdlYlZpZXdzID0gYXdhaXQgaGVscGVycy5nZXRXZWJ2aWV3cyhhZGIsICdjb20uYXBwbGljYXRpb24ubXlvdGhlcmFwcF9kZXZ0b29sc19yZW1vdGUnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3RoZW4gdGhlIHVuaXggc29ja2V0cyBhcmUgcXVlcmllZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGFkYi5zaGVsbC5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICAgICAgYWRiLnNoZWxsLmdldENhbGwoMCkuYXJnc1swXS5zaG91bGQuZGVlcC5lcXVhbChbJ2NhdCcsICcvcHJvYy9uZXQvdW5peCddKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3RoZW4gbm8gd2Vidmlld3MgYXJlIHJldHVybmVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgd2ViVmlld3MubGVuZ3RoLnNob3VsZC5lcXVhbCgwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnYW5kIHdlYnZpZXdzIGV4aXN0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgd2ViVmlld3M7XHJcblxyXG4gICAgICBiZWZvcmVFYWNoKGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgc2hlbGxTdHViID0gc2FuZGJveC5zdHViKGFkYiwgJ3NoZWxsJyk7XHJcblxyXG4gICAgICAgIHNoZWxsU3R1Yi5vbkNhbGwoMCkucmV0dXJucygnTnVtICAgICAgICAgICAgICAgUmVmQ291bnQgUHJvdG9jb2wgRmxhZ3MgICAgVHlwZSBTdCBJbm9kZSBQYXRoXFxuJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcwMDAwMDAwMDAwMDAwMDAwOiAwMDAwMDAwMiAwMDAwMDAwMCAwMDAxMDAwMCAwMDAxIDAxICAyODE4IC9kZXYvc29ja2V0L3NzX2Nvbm5fZGFlbW9uXFxuJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcwMDAwMDAwMDAwMDAwMDAwOiAwMDAwMDAwMiAwMDAwMDAwMCAwMDAxMDAwMCAwMDAxIDAxICA5MjMxIEBtY2RhZW1vblxcbicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnMDAwMDAwMDAwMDAwMDAwMDogMDAwMDAwMDIgMDAwMDAwMDAgMDAwMTAwMDAgMDAwMSAwMSAyNDU0NDUgQHdlYnZpZXdfZGV2dG9vbHNfcmVtb3RlXzEyMzRcXG4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzAwMDAwMDAwMDAwMDAwMDA6IDAwMDAwMDAyIDAwMDAwMDAwIDAwMDEwMDAwIDAwMDEgMDEgIDI4MjYgL2Rldi9zb2NrZXQvaW5zdGFsbGRcXG4nKTtcclxuICAgICAgICBzaGVsbFN0dWIub25DYWxsKDEpLnJldHVybnMoJ1VTRVIgICAgUElEICBQUElEIFZTSVpFICAgUlNTICAgV0NIQU4gICAgICAgICAgICAgIFBDICAgTkFNRVxcbicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncm9vdCAgICAgIDEgICAgIDAgIDU3OTIgICA5ODggICBTeVNfZXBvbGxfIDAwMDAwMDAwMDAgUyAvaW5pdFxcbicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncm9vdCAgICAgIDIgICAgIDAgICAgIDAgICAgIDAgICBrdGhyZWFkZCAgIDAwMDAwMDAwMDAgUyBrdGhyZWFkZFxcbicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncm9vdCAgIDEyMzQgICAgIDIgICAgIDAgICAgIDAgICBTeVNfZXBvbGxfIDAwMDAwMDAwMDAgUyBjb20uYXBwbGljYXRpb24ubXlhcHBcXG4nKTtcclxuXHJcbiAgICAgICAgd2ViVmlld3MgPSBhd2FpdCBoZWxwZXJzLmdldFdlYnZpZXdzKGFkYik7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaXQoJ3RoZW4gdGhlIHVuaXggc29ja2V0cyBhbmQgcHJvY2VzcyBsaXN0IGFyZSBxdWVyaWVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGFkYi5zaGVsbC5jYWxsZWRUd2ljZS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgICBhZGIuc2hlbGwuZ2V0Q2FsbCgwKS5hcmdzWzBdLnNob3VsZC5kZWVwLmVxdWFsKFsnY2F0JywgJy9wcm9jL25ldC91bml4J10pO1xyXG4gICAgICAgIGFkYi5zaGVsbC5nZXRDYWxsKDEpLmFyZ3NbMF0uc2hvdWxkLmVxdWFsKCdwcycpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGl0KCd0aGVuIHRoZSB3ZWJ2aWV3IGlzIHJldHVybmVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdlYlZpZXdzLmxlbmd0aC5zaG91bGQuZXF1YWwoMSk7XHJcbiAgICAgICAgd2ViVmlld3Muc2hvdWxkLmRlZXAuZXF1YWwoWydXRUJWSUVXX2NvbS5hcHBsaWNhdGlvbi5teWFwcCddKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLiJ9
