'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumBaseDriver = require('appium-base-driver');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var commands = {},
    helpers = {},
    extensions = {};

commands.getNetworkConnection = function callee$0$0() {
  var airplaneModeOn, connection, wifiOn, dataOn;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].info("Getting network connection");
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.isAirplaneModeOn());

      case 3:
        airplaneModeOn = context$1$0.sent;
        connection = airplaneModeOn ? 1 : 0;

        if (airplaneModeOn) {
          context$1$0.next = 14;
          break;
        }

        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.isWifiOn());

      case 8:
        wifiOn = context$1$0.sent;

        connection += wifiOn ? 2 : 0;
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(this.adb.isDataOn());

      case 12:
        dataOn = context$1$0.sent;

        connection += dataOn ? 4 : 0;

      case 14:
        return context$1$0.abrupt('return', connection);

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * decoupling to override the behaviour in other drivers like UiAutomator2.
 */
commands.isWifiOn = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.isWifiOn());

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.setNetworkConnection = function callee$0$0(type) {
  var airplaneMode, wifi, data;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].info("Setting network connection");
        // decode the input
        airplaneMode = type % 2;

        type >>= 1;
        wifi = type % 2;

        type >>= 1;
        data = type % 2;
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.wrapBootstrapDisconnect(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.adb.setAirplaneMode(airplaneMode));

              case 2:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        }));

      case 8:
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(this.wrapBootstrapDisconnect(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.adb.broadcastAirplaneMode(airplaneMode));

              case 2:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        }));

      case 10:
        if (airplaneMode) {
          context$1$0.next = 13;
          break;
        }

        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(this.wrapBootstrapDisconnect(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.setWifiState(wifi));

              case 2:
                context$2$0.next = 4;
                return _regeneratorRuntime.awrap(this.adb.setDataState(data, this.isEmulator()));

              case 4:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        }));

      case 13:
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(this.getNetworkConnection());

      case 15:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 16:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * decoupling to override behaviour in other drivers like UiAutomator2.
 */
commands.setWifiState = function callee$0$0(wifi) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.setWifiState(wifi, this.isEmulator()));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.toggleData = function callee$0$0() {
  var data;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this2 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.isDataOn());

      case 2:
        data = !context$1$0.sent;

        _logger2['default'].info('Turning network data ' + (data ? 'on' : 'off'));
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.wrapBootstrapDisconnect(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.adb.setWifiAndData({ data: data }, this.isEmulator()));

              case 2:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this2);
        }));

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.toggleWiFi = function callee$0$0() {
  var wifi;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this3 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.isWifiOn());

      case 2:
        wifi = !context$1$0.sent;

        _logger2['default'].info('Turning WiFi ' + (wifi ? 'on' : 'off'));
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.wrapBootstrapDisconnect(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.adb.setWifiAndData({ wifi: wifi }, this.isEmulator()));

              case 2:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this3);
        }));

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.toggleFlightMode = function callee$0$0() {
  var flightMode;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this4 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.isAirplaneModeOn());

      case 2:
        flightMode = !context$1$0.sent;

        _logger2['default'].info('Turning flight mode ' + (flightMode ? 'on' : 'off'));
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.wrapBootstrapDisconnect(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.adb.setAirplaneMode(flightMode));

              case 2:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this4);
        }));

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.wrapBootstrapDisconnect(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.adb.broadcastAirplaneMode(flightMode));

              case 2:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this4);
        }));

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.setGeoLocation = function callee$0$0(location) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.setGeoLocation(location, this.isEmulator()));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.toggleLocationServices = function callee$0$0() {
  var api, providers, isGpsEnabled, seq;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].info("Toggling location services");
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.getApiLevel());

      case 3:
        api = context$1$0.sent;

        if (!this.isEmulator()) {
          context$1$0.next = 12;
          break;
        }

        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.adb.getLocationProviders());

      case 7:
        providers = context$1$0.sent;
        isGpsEnabled = providers.indexOf('gps') !== -1;
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(this.adb.toggleGPSLocationProvider(!isGpsEnabled));

      case 11:
        return context$1$0.abrupt('return');

      case 12:
        if (!(api > 15)) {
          context$1$0.next = 26;
          break;
        }

        seq = [19, 19];

        if (!(api === 16)) {
          context$1$0.next = 18;
          break;
        }

        // This version of Android has a "parent" button in its action bar
        seq.push(20); // down
        context$1$0.next = 22;
        break;

      case 18:
        if (!(api >= 19)) {
          context$1$0.next = 22;
          break;
        }

        // Newer versions of Android have the toggle in the Action bar
        seq = [22, 22, 19]; // right, right, up
        /*
         * Once the Location services switch is OFF, it won't receive focus
         * when going back to the Location Services settings screen unless we
         * send a dummy keyevent (UP) *before* opening the settings screen
         */
        context$1$0.next = 22;
        return _regeneratorRuntime.awrap(this.adb.keyevent(19));

      case 22:
        context$1$0.next = 24;
        return _regeneratorRuntime.awrap(this.toggleSetting('LOCATION_SOURCE_SETTINGS', seq));

      case 24:
        context$1$0.next = 27;
        break;

      case 26:
        throw new _appiumBaseDriver.errors.NotYetImplementedError();

      case 27:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.toggleSetting = function callee$0$0(setting, preKeySeq) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key, _ref, appPackage, appActivity;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this5 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        /*
         * preKeySeq is the keyevent sequence to send over ADB in order
         * to position the cursor on the right option.
         * By default it's [up, up, down] because we usually target the 1st item in
         * the screen, and sometimes when opening settings activities the cursor is
         * already positionned on the 1st item, but we can't know for sure
         */
        if (_lodash2['default'].isNull(preKeySeq)) {
          preKeySeq = [19, 19, 20]; // up, up, down
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.openSettingsActivity(setting));

      case 3:
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 6;
        _iterator = _getIterator(preKeySeq);

      case 8:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 15;
          break;
        }

        key = _step.value;
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(this.doKey(key));

      case 12:
        _iteratorNormalCompletion = true;
        context$1$0.next = 8;
        break;

      case 15:
        context$1$0.next = 21;
        break;

      case 17:
        context$1$0.prev = 17;
        context$1$0.t0 = context$1$0['catch'](6);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 21:
        context$1$0.prev = 21;
        context$1$0.prev = 22;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 24:
        context$1$0.prev = 24;

        if (!_didIteratorError) {
          context$1$0.next = 27;
          break;
        }

        throw _iteratorError;

      case 27:
        return context$1$0.finish(24);

      case 28:
        return context$1$0.finish(21);

      case 29:
        context$1$0.next = 31;
        return _regeneratorRuntime.awrap(this.adb.getFocusedPackageAndActivity());

      case 31:
        _ref = context$1$0.sent;
        appPackage = _ref.appPackage;
        appActivity = _ref.appActivity;
        context$1$0.next = 36;
        return _regeneratorRuntime.awrap(this.wrapBootstrapDisconnect(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.doKey(23));

              case 2:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this5);
        }));

      case 36:
        context$1$0.prev = 36;
        context$1$0.next = 39;
        return _regeneratorRuntime.awrap(this.adb.waitForNotActivity(appPackage, appActivity, 5000));

      case 39:
        context$1$0.next = 41;
        return _regeneratorRuntime.awrap(this.doKey(22));

      case 41:
        context$1$0.next = 43;
        return _regeneratorRuntime.awrap(this.doKey(23));

      case 43:
        context$1$0.next = 45;
        return _regeneratorRuntime.awrap(this.adb.waitForNotActivity(appPackage, appActivity, 5000));

      case 45:
        context$1$0.next = 49;
        break;

      case 47:
        context$1$0.prev = 47;
        context$1$0.t1 = context$1$0['catch'](36);

      case 49:
        context$1$0.next = 51;
        return _regeneratorRuntime.awrap(this.adb.back());

      case 51:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[6, 17, 21, 29], [22,, 24, 28], [36, 47]]);
};

helpers.doKey = function callee$0$0(key) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_bluebird2['default'].delay(2000));

      case 2:
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.adb.keyevent(key));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.wrapBootstrapDisconnect = function callee$0$0(wrapped) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.bootstrap.ignoreUnexpectedShutdown = true;
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(wrapped());

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.adb.restart());

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.bootstrap.start(this.opts.appPackage, this.opts.disableAndroidWatchers, this.opts.acceptSslCerts));

      case 8:
        context$1$0.prev = 8;

        this.bootstrap.ignoreUnexpectedShutdown = false;
        return context$1$0.finish(8);

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1,, 8, 11]]);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;

// no need to check anything else if we are in airplane mode

/*
 * TODO: Implement isRealDevice(). This method fails on
 * real devices, it should throw a NotYetImplementedError
 */
// up, up

// There's no global location services toggle on older Android versions

/*
 * Click and handle potential ADB disconnect that occurs on official
 * emulator when the network connection is disabled
 */

/*
 * In one particular case (enable Location Services), a pop-up is
 * displayed on some platforms so the user accepts or refuses that Google
 * collects location data. So we wait for that pop-up to open, if it
 * doesn't then proceed
 */
// right
// click

// TODO: Confirm we need this delay. Seems to work without it.
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9uZXR3b3JrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O3NCQUFnQixXQUFXOzs7O3NCQUNiLFFBQVE7Ozs7Z0NBQ0Msb0JBQW9COzt3QkFDN0IsVUFBVTs7OztBQUV4QixJQUFJLFFBQVEsR0FBRyxFQUFFO0lBQUUsT0FBTyxHQUFHLEVBQUU7SUFBRSxVQUFVLEdBQUcsRUFBRSxDQUFDOztBQUVqRCxRQUFRLENBQUMsb0JBQW9CLEdBQUc7TUFFMUIsY0FBYyxFQUNkLFVBQVUsRUFJUixNQUFNLEVBRU4sTUFBTTs7OztBQVJaLDRCQUFJLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDOzt5Q0FDWixJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFOzs7QUFBbEQsc0JBQWM7QUFDZCxrQkFBVSxHQUFHLGNBQWMsR0FBRyxDQUFDLEdBQUcsQ0FBQzs7WUFHbEMsY0FBYzs7Ozs7O3lDQUNFLElBQUksQ0FBQyxRQUFRLEVBQUU7OztBQUE5QixjQUFNOztBQUNWLGtCQUFVLElBQUssTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEFBQUMsQ0FBQzs7eUNBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7OztBQUFsQyxjQUFNOztBQUNWLGtCQUFVLElBQUssTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEFBQUMsQ0FBQzs7OzRDQUcxQixVQUFVOzs7Ozs7O0NBQ2xCLENBQUM7Ozs7O0FBS0YsUUFBUSxDQUFDLFFBQVEsR0FBRzs7Ozs7eUNBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Q0FDakMsQ0FBQzs7QUFFRixRQUFRLENBQUMsb0JBQW9CLEdBQUcsb0JBQWdCLElBQUk7TUFHOUMsWUFBWSxFQUVaLElBQUksRUFFSixJQUFJOzs7Ozs7QUFOUiw0QkFBSSxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQzs7QUFFbkMsb0JBQVksR0FBRyxJQUFJLEdBQUcsQ0FBQzs7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SUFBSSxDQUFDOzs7eUNBRXZDLE9BQU8sRUFBRTs7Ozt5Q0FDVCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTs7Ozt5Q0FDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQzs7Ozs7QUFFNUcsWUFBSSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUM7Ozs7Ozs7O0NBRW5ELENBQUM7O0FBRUYsZUFBYyxVQUFVLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLFFBQVEsR0FBUixRQUFRO1FBQUUsT0FBTyxHQUFQLE9BQU87cUJBQ1gsVUFBVSIsImZpbGUiOiJsaWIvY29tbWFuZHMvbmV0d29yay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb2cgZnJvbSAnLi4vbG9nZ2VyJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgZXJyb3JzIH0gZnJvbSAnYXBwaXVtLWJhc2UtZHJpdmVyJztcclxuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xyXG5cclxubGV0IGNvbW1hbmRzID0ge30sIGhlbHBlcnMgPSB7fSwgZXh0ZW5zaW9ucyA9IHt9O1xyXG5cclxuY29tbWFuZHMuZ2V0TmV0d29ya0Nvbm5lY3Rpb24gPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgbG9nLmluZm8oXCJHZXR0aW5nIG5ldHdvcmsgY29ubmVjdGlvblwiKTtcclxuICBsZXQgYWlycGxhbmVNb2RlT24gPSBhd2FpdCB0aGlzLmFkYi5pc0FpcnBsYW5lTW9kZU9uKCk7XHJcbiAgbGV0IGNvbm5lY3Rpb24gPSBhaXJwbGFuZU1vZGVPbiA/IDEgOiAwO1xyXG5cclxuICAvLyBubyBuZWVkIHRvIGNoZWNrIGFueXRoaW5nIGVsc2UgaWYgd2UgYXJlIGluIGFpcnBsYW5lIG1vZGVcclxuICBpZiAoIWFpcnBsYW5lTW9kZU9uKSB7XHJcbiAgICBsZXQgd2lmaU9uID0gYXdhaXQgdGhpcy5pc1dpZmlPbigpO1xyXG4gICAgY29ubmVjdGlvbiArPSAod2lmaU9uID8gMiA6IDApO1xyXG4gICAgbGV0IGRhdGFPbiA9IGF3YWl0IHRoaXMuYWRiLmlzRGF0YU9uKCk7XHJcbiAgICBjb25uZWN0aW9uICs9IChkYXRhT24gPyA0IDogMCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gY29ubmVjdGlvbjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBkZWNvdXBsaW5nIHRvIG92ZXJyaWRlIHRoZSBiZWhhdmlvdXIgaW4gb3RoZXIgZHJpdmVycyBsaWtlIFVpQXV0b21hdG9yMi5cclxuICovXHJcbmNvbW1hbmRzLmlzV2lmaU9uID0gYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gIHJldHVybiBhd2FpdCB0aGlzLmFkYi5pc1dpZmlPbigpO1xyXG59O1xyXG5cclxuY29tbWFuZHMuc2V0TmV0d29ya0Nvbm5lY3Rpb24gPSBhc3luYyBmdW5jdGlvbiAodHlwZSkge1xyXG4gIGxvZy5pbmZvKFwiU2V0dGluZyBuZXR3b3JrIGNvbm5lY3Rpb25cIik7XHJcbiAgLy8gZGVjb2RlIHRoZSBpbnB1dFxyXG4gIGxldCBhaXJwbGFuZU1vZGUgPSB0eXBlICUgMjtcclxuICB0eXBlID4+PSAxO1xyXG4gIGxldCB3aWZpID0gdHlwZSAlIDI7XHJcbiAgdHlwZSA+Pj0gMTtcclxuICBsZXQgZGF0YSA9IHR5cGUgJSAyO1xyXG5cclxuICBhd2FpdCB0aGlzLndyYXBCb290c3RyYXBEaXNjb25uZWN0KGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IHRoaXMuYWRiLnNldEFpcnBsYW5lTW9kZShhaXJwbGFuZU1vZGUpO1xyXG4gIH0pO1xyXG4gIGF3YWl0IHRoaXMud3JhcEJvb3RzdHJhcERpc2Nvbm5lY3QoYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgdGhpcy5hZGIuYnJvYWRjYXN0QWlycGxhbmVNb2RlKGFpcnBsYW5lTW9kZSk7XHJcbiAgfSk7XHJcbiAgaWYgKCFhaXJwbGFuZU1vZGUpIHtcclxuICAgIGF3YWl0IHRoaXMud3JhcEJvb3RzdHJhcERpc2Nvbm5lY3QoYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhd2FpdCB0aGlzLnNldFdpZmlTdGF0ZSh3aWZpKTtcclxuICAgICAgYXdhaXQgdGhpcy5hZGIuc2V0RGF0YVN0YXRlKGRhdGEsIHRoaXMuaXNFbXVsYXRvcigpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0TmV0d29ya0Nvbm5lY3Rpb24oKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBkZWNvdXBsaW5nIHRvIG92ZXJyaWRlIGJlaGF2aW91ciBpbiBvdGhlciBkcml2ZXJzIGxpa2UgVWlBdXRvbWF0b3IyLlxyXG4gKi9cclxuY29tbWFuZHMuc2V0V2lmaVN0YXRlID0gYXN5bmMgZnVuY3Rpb24gKHdpZmkpIHtcclxuICBhd2FpdCB0aGlzLmFkYi5zZXRXaWZpU3RhdGUod2lmaSwgdGhpcy5pc0VtdWxhdG9yKCkpO1xyXG59O1xyXG5cclxuY29tbWFuZHMudG9nZ2xlRGF0YSA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICBsZXQgZGF0YSA9ICEoYXdhaXQgdGhpcy5hZGIuaXNEYXRhT24oKSk7XHJcbiAgbG9nLmluZm8oYFR1cm5pbmcgbmV0d29yayBkYXRhICR7ZGF0YSA/ICdvbicgOiAnb2ZmJ31gKTtcclxuICBhd2FpdCB0aGlzLndyYXBCb290c3RyYXBEaXNjb25uZWN0KGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IHRoaXMuYWRiLnNldFdpZmlBbmREYXRhKHtkYXRhfSwgdGhpcy5pc0VtdWxhdG9yKCkpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29tbWFuZHMudG9nZ2xlV2lGaSA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICBsZXQgd2lmaSA9ICEoYXdhaXQgdGhpcy5hZGIuaXNXaWZpT24oKSk7XHJcbiAgbG9nLmluZm8oYFR1cm5pbmcgV2lGaSAke3dpZmkgPyAnb24nIDogJ29mZid9YCk7XHJcbiAgYXdhaXQgdGhpcy53cmFwQm9vdHN0cmFwRGlzY29ubmVjdChhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCB0aGlzLmFkYi5zZXRXaWZpQW5kRGF0YSh7d2lmaX0sIHRoaXMuaXNFbXVsYXRvcigpKTtcclxuICB9KTtcclxufTtcclxuXHJcbmNvbW1hbmRzLnRvZ2dsZUZsaWdodE1vZGUgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgLypcclxuICAgKiBUT0RPOiBJbXBsZW1lbnQgaXNSZWFsRGV2aWNlKCkuIFRoaXMgbWV0aG9kIGZhaWxzIG9uXHJcbiAgICogcmVhbCBkZXZpY2VzLCBpdCBzaG91bGQgdGhyb3cgYSBOb3RZZXRJbXBsZW1lbnRlZEVycm9yXHJcbiAgICovXHJcbiAgbGV0IGZsaWdodE1vZGUgPSAhKGF3YWl0IHRoaXMuYWRiLmlzQWlycGxhbmVNb2RlT24oKSk7XHJcbiAgbG9nLmluZm8oYFR1cm5pbmcgZmxpZ2h0IG1vZGUgJHtmbGlnaHRNb2RlID8gJ29uJyA6ICdvZmYnfWApO1xyXG4gIGF3YWl0IHRoaXMud3JhcEJvb3RzdHJhcERpc2Nvbm5lY3QoYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgdGhpcy5hZGIuc2V0QWlycGxhbmVNb2RlKGZsaWdodE1vZGUpO1xyXG4gIH0pO1xyXG4gIGF3YWl0IHRoaXMud3JhcEJvb3RzdHJhcERpc2Nvbm5lY3QoYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgdGhpcy5hZGIuYnJvYWRjYXN0QWlycGxhbmVNb2RlKGZsaWdodE1vZGUpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29tbWFuZHMuc2V0R2VvTG9jYXRpb24gPSBhc3luYyBmdW5jdGlvbiAobG9jYXRpb24pIHtcclxuICByZXR1cm4gYXdhaXQgdGhpcy5hZGIuc2V0R2VvTG9jYXRpb24obG9jYXRpb24sIHRoaXMuaXNFbXVsYXRvcigpKTtcclxufTtcclxuXHJcbmNvbW1hbmRzLnRvZ2dsZUxvY2F0aW9uU2VydmljZXMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgbG9nLmluZm8oXCJUb2dnbGluZyBsb2NhdGlvbiBzZXJ2aWNlc1wiKTtcclxuICBsZXQgYXBpID0gYXdhaXQgdGhpcy5hZGIuZ2V0QXBpTGV2ZWwoKTtcclxuICBpZiAodGhpcy5pc0VtdWxhdG9yKCkpIHtcclxuICAgIGxldCBwcm92aWRlcnMgPSBhd2FpdCB0aGlzLmFkYi5nZXRMb2NhdGlvblByb3ZpZGVycygpO1xyXG4gICAgbGV0IGlzR3BzRW5hYmxlZCA9IHByb3ZpZGVycy5pbmRleE9mKCdncHMnKSAhPT0gLTE7XHJcbiAgICBhd2FpdCB0aGlzLmFkYi50b2dnbGVHUFNMb2NhdGlvblByb3ZpZGVyKCFpc0dwc0VuYWJsZWQpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgaWYgKGFwaSA+IDE1KSB7XHJcbiAgICBsZXQgc2VxID0gWzE5LCAxOV07IC8vIHVwLCB1cFxyXG4gICAgaWYgKGFwaSA9PT0gMTYpIHtcclxuICAgICAgLy8gVGhpcyB2ZXJzaW9uIG9mIEFuZHJvaWQgaGFzIGEgXCJwYXJlbnRcIiBidXR0b24gaW4gaXRzIGFjdGlvbiBiYXJcclxuICAgICAgc2VxLnB1c2goMjApOyAvLyBkb3duXHJcbiAgICB9IGVsc2UgaWYgKGFwaSA+PSAxOSkge1xyXG4gICAgICAvLyBOZXdlciB2ZXJzaW9ucyBvZiBBbmRyb2lkIGhhdmUgdGhlIHRvZ2dsZSBpbiB0aGUgQWN0aW9uIGJhclxyXG4gICAgICBzZXEgPSBbMjIsIDIyLCAxOV07IC8vIHJpZ2h0LCByaWdodCwgdXBcclxuICAgICAgLypcclxuICAgICAgICogT25jZSB0aGUgTG9jYXRpb24gc2VydmljZXMgc3dpdGNoIGlzIE9GRiwgaXQgd29uJ3QgcmVjZWl2ZSBmb2N1c1xyXG4gICAgICAgKiB3aGVuIGdvaW5nIGJhY2sgdG8gdGhlIExvY2F0aW9uIFNlcnZpY2VzIHNldHRpbmdzIHNjcmVlbiB1bmxlc3Mgd2VcclxuICAgICAgICogc2VuZCBhIGR1bW15IGtleWV2ZW50IChVUCkgKmJlZm9yZSogb3BlbmluZyB0aGUgc2V0dGluZ3Mgc2NyZWVuXHJcbiAgICAgICAqL1xyXG4gICAgICBhd2FpdCB0aGlzLmFkYi5rZXlldmVudCgxOSk7XHJcbiAgICB9XHJcbiAgICBhd2FpdCB0aGlzLnRvZ2dsZVNldHRpbmcoJ0xPQ0FUSU9OX1NPVVJDRV9TRVRUSU5HUycsIHNlcSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIFRoZXJlJ3Mgbm8gZ2xvYmFsIGxvY2F0aW9uIHNlcnZpY2VzIHRvZ2dsZSBvbiBvbGRlciBBbmRyb2lkIHZlcnNpb25zXHJcbiAgICB0aHJvdyBuZXcgZXJyb3JzLk5vdFlldEltcGxlbWVudGVkRXJyb3IoKTtcclxuICB9XHJcbn07XHJcblxyXG5oZWxwZXJzLnRvZ2dsZVNldHRpbmcgPSBhc3luYyBmdW5jdGlvbiAoc2V0dGluZywgcHJlS2V5U2VxKSB7XHJcbiAgLypcclxuICAgKiBwcmVLZXlTZXEgaXMgdGhlIGtleWV2ZW50IHNlcXVlbmNlIHRvIHNlbmQgb3ZlciBBREIgaW4gb3JkZXJcclxuICAgKiB0byBwb3NpdGlvbiB0aGUgY3Vyc29yIG9uIHRoZSByaWdodCBvcHRpb24uXHJcbiAgICogQnkgZGVmYXVsdCBpdCdzIFt1cCwgdXAsIGRvd25dIGJlY2F1c2Ugd2UgdXN1YWxseSB0YXJnZXQgdGhlIDFzdCBpdGVtIGluXHJcbiAgICogdGhlIHNjcmVlbiwgYW5kIHNvbWV0aW1lcyB3aGVuIG9wZW5pbmcgc2V0dGluZ3MgYWN0aXZpdGllcyB0aGUgY3Vyc29yIGlzXHJcbiAgICogYWxyZWFkeSBwb3NpdGlvbm5lZCBvbiB0aGUgMXN0IGl0ZW0sIGJ1dCB3ZSBjYW4ndCBrbm93IGZvciBzdXJlXHJcbiAgICovXHJcbiAgaWYgKF8uaXNOdWxsKHByZUtleVNlcSkpIHtcclxuICAgIHByZUtleVNlcSA9IFsxOSwgMTksIDIwXTsgLy8gdXAsIHVwLCBkb3duXHJcbiAgfVxyXG5cclxuICBhd2FpdCB0aGlzLm9wZW5TZXR0aW5nc0FjdGl2aXR5KHNldHRpbmcpO1xyXG5cclxuICBmb3IgKGxldCBrZXkgb2YgcHJlS2V5U2VxKSB7XHJcbiAgICBhd2FpdCB0aGlzLmRvS2V5KGtleSk7XHJcbiAgfVxyXG5cclxuICBsZXQge2FwcFBhY2thZ2UsIGFwcEFjdGl2aXR5fSA9IGF3YWl0IHRoaXMuYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcclxuXHJcbiAgLypcclxuICAgKiBDbGljayBhbmQgaGFuZGxlIHBvdGVudGlhbCBBREIgZGlzY29ubmVjdCB0aGF0IG9jY3VycyBvbiBvZmZpY2lhbFxyXG4gICAqIGVtdWxhdG9yIHdoZW4gdGhlIG5ldHdvcmsgY29ubmVjdGlvbiBpcyBkaXNhYmxlZFxyXG4gICAqL1xyXG4gIGF3YWl0IHRoaXMud3JhcEJvb3RzdHJhcERpc2Nvbm5lY3QoYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgdGhpcy5kb0tleSgyMyk7XHJcbiAgfSk7XHJcblxyXG4gIC8qXHJcbiAgICogSW4gb25lIHBhcnRpY3VsYXIgY2FzZSAoZW5hYmxlIExvY2F0aW9uIFNlcnZpY2VzKSwgYSBwb3AtdXAgaXNcclxuICAgKiBkaXNwbGF5ZWQgb24gc29tZSBwbGF0Zm9ybXMgc28gdGhlIHVzZXIgYWNjZXB0cyBvciByZWZ1c2VzIHRoYXQgR29vZ2xlXHJcbiAgICogY29sbGVjdHMgbG9jYXRpb24gZGF0YS4gU28gd2Ugd2FpdCBmb3IgdGhhdCBwb3AtdXAgdG8gb3BlbiwgaWYgaXRcclxuICAgKiBkb2Vzbid0IHRoZW4gcHJvY2VlZFxyXG4gICAqL1xyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCB0aGlzLmFkYi53YWl0Rm9yTm90QWN0aXZpdHkoYXBwUGFja2FnZSwgYXBwQWN0aXZpdHksIDUwMDApO1xyXG4gICAgYXdhaXQgdGhpcy5kb0tleSgyMik7IC8vIHJpZ2h0XHJcbiAgICBhd2FpdCB0aGlzLmRvS2V5KDIzKTsgLy8gY2xpY2tcclxuICAgIGF3YWl0IHRoaXMuYWRiLndhaXRGb3JOb3RBY3Rpdml0eShhcHBQYWNrYWdlLCBhcHBBY3Rpdml0eSwgNTAwMCk7XHJcbiAgfSBjYXRjaCAoaWduKSB7fVxyXG5cclxuICBhd2FpdCB0aGlzLmFkYi5iYWNrKCk7XHJcbn07XHJcblxyXG5oZWxwZXJzLmRvS2V5ID0gYXN5bmMgZnVuY3Rpb24gKGtleSkge1xyXG4gIC8vIFRPRE86IENvbmZpcm0gd2UgbmVlZCB0aGlzIGRlbGF5LiBTZWVtcyB0byB3b3JrIHdpdGhvdXQgaXQuXHJcbiAgYXdhaXQgQi5kZWxheSgyMDAwKTtcclxuICBhd2FpdCB0aGlzLmFkYi5rZXlldmVudChrZXkpO1xyXG59O1xyXG5cclxuaGVscGVycy53cmFwQm9vdHN0cmFwRGlzY29ubmVjdCA9IGFzeW5jIGZ1bmN0aW9uICh3cmFwcGVkKSB7XHJcbiAgdGhpcy5ib290c3RyYXAuaWdub3JlVW5leHBlY3RlZFNodXRkb3duID0gdHJ1ZTtcclxuICB0cnkge1xyXG4gICAgYXdhaXQgd3JhcHBlZCgpO1xyXG4gICAgYXdhaXQgdGhpcy5hZGIucmVzdGFydCgpO1xyXG4gICAgYXdhaXQgdGhpcy5ib290c3RyYXAuc3RhcnQodGhpcy5vcHRzLmFwcFBhY2thZ2UsIHRoaXMub3B0cy5kaXNhYmxlQW5kcm9pZFdhdGNoZXJzLCB0aGlzLm9wdHMuYWNjZXB0U3NsQ2VydHMpO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICB0aGlzLmJvb3RzdHJhcC5pZ25vcmVVbmV4cGVjdGVkU2h1dGRvd24gPSBmYWxzZTtcclxuICB9XHJcbn07XHJcblxyXG5PYmplY3QuYXNzaWduKGV4dGVuc2lvbnMsIGNvbW1hbmRzLCBoZWxwZXJzKTtcclxuZXhwb3J0IHsgY29tbWFuZHMsIGhlbHBlcnMgfTtcclxuZXhwb3J0IGRlZmF1bHQgZXh0ZW5zaW9ucztcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uIn0=
