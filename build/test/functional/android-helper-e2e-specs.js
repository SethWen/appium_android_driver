'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _asyncbox = require('asyncbox');

var _libAndroidHelpers = require('../../lib/android-helpers');

var _libAndroidHelpers2 = _interopRequireDefault(_libAndroidHelpers);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _desired = require('./desired');

var _helpers = require('./helpers');

var _teen_process = require('teen_process');

var _appiumUnlock = require('appium-unlock');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var opts = {
  app: _desired.app,
  appPackage: 'io.appium.android.apis',
  androidInstallTimeout: 90000
};

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('android-helpers e2e', function () {
  var adb = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(_appiumAdb2['default'].createADB());

        case 2:
          adb = context$2$0.sent;

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  describe('installApkRemotely', function () {
    it('installs an apk by pushing it to the device then installing it from within', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            this.timeout(_helpers.MOCHA_TIMEOUT);

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(10, 500, function callee$3$0() {
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap(adb.isAppInstalled(opts.appPackage));

                  case 2:
                    if (!context$4$0.sent) {
                      context$4$0.next = 5;
                      break;
                    }

                    context$4$0.next = 5;
                    return _regeneratorRuntime.awrap(adb.uninstallApk(opts.appPackage));

                  case 5:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, this);
            }));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.isAppInstalled(opts.appPackage).should.eventually.be['false']);

          case 5:
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].installApkRemotely(adb, opts));

          case 7:
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(adb.isAppInstalled(opts.appPackage).should.eventually.be['true']);

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('ensureDeviceLocale @skip-ci', function () {
    after(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].ensureDeviceLocale(adb, 'en', 'US'));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should set device language and country', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].ensureDeviceLocale(adb, 'fr', 'FR'));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.getApiLevel());

          case 4:
            context$3$0.t0 = context$3$0.sent;

            if (!(context$3$0.t0 < 23)) {
              context$3$0.next = 12;
              break;
            }

            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(adb.getDeviceLanguage().should.eventually.equal('fr'));

          case 8:
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(adb.getDeviceCountry().should.eventually.equal('FR'));

          case 10:
            context$3$0.next = 14;
            break;

          case 12:
            context$3$0.next = 14;
            return _regeneratorRuntime.awrap(adb.getDeviceLocale().should.eventually.equal('fr-FR'));

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('pushSettingsApp', function () {
    var settingsPkg = 'io.appium.settings';
    it('should be able to upgrade from settings v1 to latest', function callee$2$0() {
      var settingsApkPath;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(adb.uninstallApk(settingsPkg));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)('npm', ['install', settingsPkg + '@2.0.0']));

          case 4:
            settingsApkPath = _path2['default'].resolve(__dirname, '..', '..', '..', 'node_modules', 'io.appium.settings', 'bin', 'settings_apk-debug.apk');
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(adb.install(settingsApkPath));

          case 7:
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)('npm', ['uninstall', settingsPkg]));

          case 9:
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)('npm', ['install', settingsPkg]));

          case 11:
            context$3$0.next = 13;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].pushSettingsApp(adb, true));

          case 13:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('pushUnlock', function () {
    var unlockPkg = 'appium-unlock';
    var unlockBundle = 'io.appium.unlock';
    it('should be able to upgrade from unlock v0.0.1 to latest', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(adb.uninstallApk(unlockBundle));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)('npm', ['install', unlockPkg + '@0.0.1']));

          case 4:
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(adb.install(_appiumUnlock.path));

          case 6:
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)('npm', ['uninstall', unlockPkg]));

          case 8:
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)('npm', ['install', unlockPkg]));

          case 10:
            context$3$0.next = 12;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].pushUnlock(adb));

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});

// this sometimes times out on Travis, so retry

// get and install old version of settings app

// old version has a different apk path, so manually enter
// otherwise pushing the app will fail because import will have the old
// path cached

// get latest version of settings app

// get and install old version of settings app

// get latest version of settings app
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9hbmRyb2lkLWhlbHBlci1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7Ozt3QkFDZixVQUFVOztpQ0FDcEIsMkJBQTJCOzs7O3lCQUMvQixZQUFZOzs7O3VCQUNSLFdBQVc7O3VCQUNELFdBQVc7OzRCQUNwQixjQUFjOzs0QkFDRyxlQUFlOztvQkFDcEMsTUFBTTs7OztBQUd2QixJQUFJLElBQUksR0FBRztBQUNULEtBQUcsY0FBQTtBQUNILFlBQVUsRUFBRyx3QkFBd0I7QUFDckMsdUJBQXFCLEVBQUcsS0FBSztDQUM5QixDQUFDOztBQUVGLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLHFCQUFxQixFQUFFLFlBQVk7QUFDMUMsTUFBSSxHQUFHLFlBQUEsQ0FBQztBQUNSLFFBQU0sQ0FBQzs7Ozs7MkNBQ08sdUJBQUksU0FBUyxFQUFFOzs7QUFBM0IsYUFBRzs7Ozs7OztHQUNKLENBQUMsQ0FBQztBQUNILFVBQVEsQ0FBQyxvQkFBb0IsRUFBRSxZQUFZO0FBQ3pDLE1BQUUsQ0FBQyw0RUFBNEUsRUFBRTs7OztBQUMvRSxnQkFBSSxDQUFDLE9BQU8sd0JBQWUsQ0FBQzs7OzZDQUV0Qiw2QkFBYyxFQUFFLEVBQUUsR0FBRyxFQUFFOzs7OztxREFDakIsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDOzs7Ozs7Ozs7cURBRXJDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7Ozs7OzthQUUxQyxDQUFDOzs7OzZDQUNJLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxTQUFNOzs7OzZDQUM5RCwrQkFBUSxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDOzs7OzZDQUNyQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBSzs7Ozs7OztLQUNwRSxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsNkJBQTZCLEVBQUUsWUFBWTtBQUNsRCxTQUFLLENBQUM7Ozs7OzZDQUNFLCtCQUFRLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDOzs7Ozs7O0tBQ2xELENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyx3Q0FBd0MsRUFBRTs7Ozs7NkNBQ3JDLCtCQUFRLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDOzs7OzZDQUV2QyxHQUFHLENBQUMsV0FBVyxFQUFFOzs7OzttQ0FBRyxFQUFFOzs7Ozs7NkNBQ3hCLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzs7Ozs2Q0FDckQsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs2Q0FFcEQsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQzs7Ozs7OztLQUUvRCxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsaUJBQWlCLEVBQUUsWUFBWTtBQUN0QyxRQUFNLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQztBQUN6QyxNQUFFLENBQUMsc0RBQXNELEVBQUU7VUFRbkQsZUFBZTs7Ozs7NkNBUGYsR0FBRyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUM7Ozs7NkNBRzdCLHdCQUFLLEtBQUssRUFBRSxDQUFDLFNBQVMsRUFBSyxXQUFXLFlBQVMsQ0FBQzs7O0FBSWhELDJCQUFlLEdBQUcsa0JBQUssT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFDOUQsY0FBYyxFQUFFLG9CQUFvQixFQUFFLEtBQUssRUFBRSx3QkFBd0IsQ0FBQzs7NkNBRWxFLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDOzs7OzZDQUc1Qix3QkFBSyxLQUFLLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7Ozs7NkNBQ3ZDLHdCQUFLLEtBQUssRUFBRSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQzs7Ozs2Q0FFckMsK0JBQVEsZUFBZSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7Ozs7Ozs7S0FDekMsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0FBQ0gsVUFBUSxDQUFDLFlBQVksRUFBRSxZQUFZO0FBQ2pDLFFBQU0sU0FBUyxHQUFHLGVBQWUsQ0FBQztBQUNsQyxRQUFNLFlBQVksR0FBRyxrQkFBa0IsQ0FBQztBQUN4QyxNQUFFLENBQUMsd0RBQXdELEVBQUU7Ozs7OzZDQUNyRCxHQUFHLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQzs7Ozs2Q0FHOUIsd0JBQUssS0FBSyxFQUFFLENBQUMsU0FBUyxFQUFLLFNBQVMsWUFBUyxDQUFDOzs7OzZDQUM5QyxHQUFHLENBQUMsT0FBTyxvQkFBZTs7Ozs2Q0FHMUIsd0JBQUssS0FBSyxFQUFFLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDOzs7OzZDQUNyQyx3QkFBSyxLQUFLLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7Ozs7NkNBRW5DLCtCQUFRLFVBQVUsQ0FBQyxHQUFHLENBQUM7Ozs7Ozs7S0FDOUIsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9hbmRyb2lkLWhlbHBlci1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcclxuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xyXG5pbXBvcnQgeyByZXRyeUludGVydmFsIH0gZnJvbSAnYXN5bmNib3gnO1xyXG5pbXBvcnQgaGVscGVycyBmcm9tICcuLi8uLi9saWIvYW5kcm9pZC1oZWxwZXJzJztcclxuaW1wb3J0IEFEQiBmcm9tICdhcHBpdW0tYWRiJztcclxuaW1wb3J0IHsgYXBwIH0gZnJvbSAnLi9kZXNpcmVkJztcclxuaW1wb3J0IHsgTU9DSEFfVElNRU9VVCB9IGZyb20gJy4vaGVscGVycyc7XHJcbmltcG9ydCB7IGV4ZWMgfSBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xyXG5pbXBvcnQgeyBwYXRoIGFzIHVubG9ja0Fwa1BhdGggfSBmcm9tICdhcHBpdW0tdW5sb2NrJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5cclxubGV0IG9wdHMgPSB7XHJcbiAgYXBwLFxyXG4gIGFwcFBhY2thZ2UgOiAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcycsXHJcbiAgYW5kcm9pZEluc3RhbGxUaW1lb3V0IDogOTAwMDBcclxufTtcclxuXHJcbmNoYWkuc2hvdWxkKCk7XHJcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcclxuXHJcbmRlc2NyaWJlKCdhbmRyb2lkLWhlbHBlcnMgZTJlJywgZnVuY3Rpb24gKCkge1xyXG4gIGxldCBhZGI7XHJcbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgIGFkYiA9IGF3YWl0IEFEQi5jcmVhdGVBREIoKTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnaW5zdGFsbEFwa1JlbW90ZWx5JywgZnVuY3Rpb24gKCkge1xyXG4gICAgaXQoJ2luc3RhbGxzIGFuIGFwayBieSBwdXNoaW5nIGl0IHRvIHRoZSBkZXZpY2UgdGhlbiBpbnN0YWxsaW5nIGl0IGZyb20gd2l0aGluJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLnRpbWVvdXQoTU9DSEFfVElNRU9VVCk7XHJcblxyXG4gICAgICBhd2FpdCByZXRyeUludGVydmFsKDEwLCA1MDAsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoYXdhaXQgYWRiLmlzQXBwSW5zdGFsbGVkKG9wdHMuYXBwUGFja2FnZSkpIHtcclxuICAgICAgICAgIC8vIHRoaXMgc29tZXRpbWVzIHRpbWVzIG91dCBvbiBUcmF2aXMsIHNvIHJldHJ5XHJcbiAgICAgICAgICBhd2FpdCBhZGIudW5pbnN0YWxsQXBrKG9wdHMuYXBwUGFja2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgYXdhaXQgYWRiLmlzQXBwSW5zdGFsbGVkKG9wdHMuYXBwUGFja2FnZSkuc2hvdWxkLmV2ZW50dWFsbHkuYmUuZmFsc2U7XHJcbiAgICAgIGF3YWl0IGhlbHBlcnMuaW5zdGFsbEFwa1JlbW90ZWx5KGFkYiwgb3B0cyk7XHJcbiAgICAgIGF3YWl0IGFkYi5pc0FwcEluc3RhbGxlZChvcHRzLmFwcFBhY2thZ2UpLnNob3VsZC5ldmVudHVhbGx5LmJlLnRydWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnZW5zdXJlRGV2aWNlTG9jYWxlIEBza2lwLWNpJywgZnVuY3Rpb24gKCkge1xyXG4gICAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBhd2FpdCBoZWxwZXJzLmVuc3VyZURldmljZUxvY2FsZShhZGIsICdlbicsICdVUycpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHNldCBkZXZpY2UgbGFuZ3VhZ2UgYW5kIGNvdW50cnknLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGF3YWl0IGhlbHBlcnMuZW5zdXJlRGV2aWNlTG9jYWxlKGFkYiwgJ2ZyJywgJ0ZSJyk7XHJcblxyXG4gICAgICBpZiAoYXdhaXQgYWRiLmdldEFwaUxldmVsKCkgPCAyMykge1xyXG4gICAgICAgIGF3YWl0IGFkYi5nZXREZXZpY2VMYW5ndWFnZSgpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdmcicpO1xyXG4gICAgICAgIGF3YWl0IGFkYi5nZXREZXZpY2VDb3VudHJ5KCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ0ZSJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXdhaXQgYWRiLmdldERldmljZUxvY2FsZSgpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdmci1GUicpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgncHVzaFNldHRpbmdzQXBwJywgZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3Qgc2V0dGluZ3NQa2cgPSAnaW8uYXBwaXVtLnNldHRpbmdzJztcclxuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byB1cGdyYWRlIGZyb20gc2V0dGluZ3MgdjEgdG8gbGF0ZXN0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBhd2FpdCBhZGIudW5pbnN0YWxsQXBrKHNldHRpbmdzUGtnKTtcclxuXHJcbiAgICAgIC8vIGdldCBhbmQgaW5zdGFsbCBvbGQgdmVyc2lvbiBvZiBzZXR0aW5ncyBhcHBcclxuICAgICAgYXdhaXQgZXhlYygnbnBtJywgWydpbnN0YWxsJywgYCR7c2V0dGluZ3NQa2d9QDIuMC4wYF0pO1xyXG4gICAgICAvLyBvbGQgdmVyc2lvbiBoYXMgYSBkaWZmZXJlbnQgYXBrIHBhdGgsIHNvIG1hbnVhbGx5IGVudGVyXHJcbiAgICAgIC8vIG90aGVyd2lzZSBwdXNoaW5nIHRoZSBhcHAgd2lsbCBmYWlsIGJlY2F1c2UgaW1wb3J0IHdpbGwgaGF2ZSB0aGUgb2xkXHJcbiAgICAgIC8vIHBhdGggY2FjaGVkXHJcbiAgICAgIGNvbnN0IHNldHRpbmdzQXBrUGF0aCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLicsICcuLicsICcuLicsXHJcbiAgICAgICAgJ25vZGVfbW9kdWxlcycsICdpby5hcHBpdW0uc2V0dGluZ3MnLCAnYmluJywgJ3NldHRpbmdzX2Fway1kZWJ1Zy5hcGsnKTtcclxuXHJcbiAgICAgIGF3YWl0IGFkYi5pbnN0YWxsKHNldHRpbmdzQXBrUGF0aCk7XHJcblxyXG4gICAgICAvLyBnZXQgbGF0ZXN0IHZlcnNpb24gb2Ygc2V0dGluZ3MgYXBwXHJcbiAgICAgIGF3YWl0IGV4ZWMoJ25wbScsIFsndW5pbnN0YWxsJywgc2V0dGluZ3NQa2ddKTtcclxuICAgICAgYXdhaXQgZXhlYygnbnBtJywgWydpbnN0YWxsJywgc2V0dGluZ3NQa2ddKTtcclxuXHJcbiAgICAgIGF3YWl0IGhlbHBlcnMucHVzaFNldHRpbmdzQXBwKGFkYiwgdHJ1ZSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBkZXNjcmliZSgncHVzaFVubG9jaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHVubG9ja1BrZyA9ICdhcHBpdW0tdW5sb2NrJztcclxuICAgIGNvbnN0IHVubG9ja0J1bmRsZSA9ICdpby5hcHBpdW0udW5sb2NrJztcclxuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byB1cGdyYWRlIGZyb20gdW5sb2NrIHYwLjAuMSB0byBsYXRlc3QnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGF3YWl0IGFkYi51bmluc3RhbGxBcGsodW5sb2NrQnVuZGxlKTtcclxuXHJcbiAgICAgIC8vIGdldCBhbmQgaW5zdGFsbCBvbGQgdmVyc2lvbiBvZiBzZXR0aW5ncyBhcHBcclxuICAgICAgYXdhaXQgZXhlYygnbnBtJywgWydpbnN0YWxsJywgYCR7dW5sb2NrUGtnfUAwLjAuMWBdKTtcclxuICAgICAgYXdhaXQgYWRiLmluc3RhbGwodW5sb2NrQXBrUGF0aCk7XHJcblxyXG4gICAgICAvLyBnZXQgbGF0ZXN0IHZlcnNpb24gb2Ygc2V0dGluZ3MgYXBwXHJcbiAgICAgIGF3YWl0IGV4ZWMoJ25wbScsIFsndW5pbnN0YWxsJywgdW5sb2NrUGtnXSk7XHJcbiAgICAgIGF3YWl0IGV4ZWMoJ25wbScsIFsnaW5zdGFsbCcsIHVubG9ja1BrZ10pO1xyXG5cclxuICAgICAgYXdhaXQgaGVscGVycy5wdXNoVW5sb2NrKGFkYik7XHJcbiAgICB9KTtcclxuICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLiJ9
