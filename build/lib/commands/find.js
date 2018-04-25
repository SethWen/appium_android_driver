'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumBaseDriver = require('appium-base-driver');

var helpers = {},
    extensions = {};

/**
 * Reason for isolating doFindElementOrEls from findElOrEls is for reusing findElOrEls
 * across android-drivers (like appium-uiautomator2-driver) to avoid code duplication.
 * Other android-drivers (like appium-uiautomator2-driver) need to override doFindElementOrEls
 * to facilitate findElOrEls.
 */
helpers.doFindElementOrEls = function callee$0$0(params) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction('find', params));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// stategy: locator strategy
// selector: the actual selector for finding an element
// mult: multiple elements or just one?
// context: finding an element from the root context? or starting from another element
helpers.findElOrEls = function callee$0$0(strategy, selector, mult) {
  var context = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];
  var params, element, doFind;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        // throws error if not valid, uses this.locatorStrategies
        this.validateLocatorStrategy(strategy);

        if (selector) {
          context$1$0.next = 3;
          break;
        }

        throw new Error("Must provide a selector when finding elements");

      case 3:
        params = {
          strategy: strategy,
          selector: selector,
          context: context,
          multiple: mult
        };
        element = undefined;

        doFind = function doFind() {
          return _regeneratorRuntime.async(function doFind$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.prev = 0;
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(this.doFindElementOrEls(params));

              case 3:
                element = context$2$0.sent;
                context$2$0.next = 11;
                break;

              case 6:
                context$2$0.prev = 6;
                context$2$0.t0 = context$2$0['catch'](0);

                if (!(context$2$0.t0.message && context$2$0.t0.message.match(/An element could not be located/))) {
                  context$2$0.next = 10;
                  break;
                }

                return context$2$0.abrupt('return', false);

              case 10:
                throw context$2$0.t0;

              case 11:
                if (!params.multiple) {
                  context$2$0.next = 15;
                  break;
                }

                return context$2$0.abrupt('return', element && element.length !== 0);

              case 15:
                return context$2$0.abrupt('return', !_lodash2['default'].isNull(element));

              case 16:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this, [[0, 6]]);
        };

        context$1$0.prev = 6;
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.implicitWaitForCondition(doFind));

      case 9:
        context$1$0.next = 18;
        break;

      case 11:
        context$1$0.prev = 11;
        context$1$0.t0 = context$1$0['catch'](6);

        if (!(context$1$0.t0.message && context$1$0.t0.message.match(/Condition unmet/))) {
          context$1$0.next = 17;
          break;
        }

        // only get here if we are looking for multiple elements
        // condition was not met setting res to empty array
        element = [];
        context$1$0.next = 18;
        break;

      case 17:
        throw context$1$0.t0;

      case 18:
        if (!mult) {
          context$1$0.next = 22;
          break;
        }

        return context$1$0.abrupt('return', element);

      case 22:
        if (!(!element || _lodash2['default'].size(element) === 0)) {
          context$1$0.next = 24;
          break;
        }

        throw new _appiumBaseDriver.errors.NoSuchElementError();

      case 24:
        return context$1$0.abrupt('return', element);

      case 25:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[6, 11]]);
};

_Object$assign(extensions, helpers);
exports.helpers = helpers;
exports['default'] = extensions;

// we are fine with this, just indicate a retry

// we want to return false if we want to potentially try again
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9maW5kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztzQkFBYyxRQUFROzs7O2dDQUNDLG9CQUFvQjs7QUFHM0MsSUFBSSxPQUFPLEdBQUcsRUFBRTtJQUFFLFVBQVUsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7O0FBUWxDLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxvQkFBZ0IsTUFBTTs7Ozs7eUNBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7Ozs7Ozs7Ozs7Q0FDdkQsQ0FBQzs7Ozs7O0FBTUYsT0FBTyxDQUFDLFdBQVcsR0FBRyxvQkFBZ0IsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJO01BQUUsT0FBTyx5REFBRyxFQUFFO01BUXRFLE1BQU0sRUFPTixPQUFPLEVBQ1AsTUFBTTs7Ozs7OztBQWRWLFlBQUksQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7WUFFbEMsUUFBUTs7Ozs7Y0FDTCxJQUFJLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQzs7O0FBRzlELGNBQU0sR0FBRztBQUNYLGtCQUFRLEVBQVIsUUFBUTtBQUNSLGtCQUFRLEVBQVIsUUFBUTtBQUNSLGlCQUFPLEVBQVAsT0FBTztBQUNQLGtCQUFRLEVBQUUsSUFBSTtTQUNmO0FBRUcsZUFBTzs7QUFDUCxjQUFNLEdBQUcsU0FBVCxNQUFNOzs7Ozs7aURBRVUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQzs7O0FBQS9DLHVCQUFPOzs7Ozs7OztzQkFFSCxlQUFJLE9BQU8sSUFBSSxlQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQTs7Ozs7b0RBRTlELEtBQUs7Ozs7OztxQkFNWixNQUFNLENBQUMsUUFBUTs7Ozs7b0RBQ1YsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQzs7O29EQUUvQixDQUFDLG9CQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUM7Ozs7Ozs7U0FFNUI7Ozs7eUNBR08sSUFBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQzs7Ozs7Ozs7OztjQUV2QyxlQUFJLE9BQU8sSUFBSSxlQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQTs7Ozs7OztBQUdyRCxlQUFPLEdBQUcsRUFBRSxDQUFDOzs7Ozs7OzthQU1iLElBQUk7Ozs7OzRDQUNDLE9BQU87OztjQUVWLENBQUMsT0FBTyxJQUFJLG9CQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7Ozs7O2NBQzdCLElBQUkseUJBQU8sa0JBQWtCLEVBQUU7Ozs0Q0FFaEMsT0FBTzs7Ozs7OztDQUVqQixDQUFDOztBQUVGLGVBQWMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzFCLE9BQU8sR0FBUCxPQUFPO3FCQUNELFVBQVUiLCJmaWxlIjoibGliL2NvbW1hbmRzL2ZpbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBlcnJvcnMgfSBmcm9tICdhcHBpdW0tYmFzZS1kcml2ZXInO1xyXG5cclxuXHJcbmxldCBoZWxwZXJzID0ge30sIGV4dGVuc2lvbnMgPSB7fTtcclxuXHJcbi8qKlxyXG4gKiBSZWFzb24gZm9yIGlzb2xhdGluZyBkb0ZpbmRFbGVtZW50T3JFbHMgZnJvbSBmaW5kRWxPckVscyBpcyBmb3IgcmV1c2luZyBmaW5kRWxPckVsc1xyXG4gKiBhY3Jvc3MgYW5kcm9pZC1kcml2ZXJzIChsaWtlIGFwcGl1bS11aWF1dG9tYXRvcjItZHJpdmVyKSB0byBhdm9pZCBjb2RlIGR1cGxpY2F0aW9uLlxyXG4gKiBPdGhlciBhbmRyb2lkLWRyaXZlcnMgKGxpa2UgYXBwaXVtLXVpYXV0b21hdG9yMi1kcml2ZXIpIG5lZWQgdG8gb3ZlcnJpZGUgZG9GaW5kRWxlbWVudE9yRWxzXHJcbiAqIHRvIGZhY2lsaXRhdGUgZmluZEVsT3JFbHMuXHJcbiAqL1xyXG5oZWxwZXJzLmRvRmluZEVsZW1lbnRPckVscyA9IGFzeW5jIGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuICByZXR1cm4gYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbignZmluZCcsIHBhcmFtcyk7XHJcbn07XHJcblxyXG4vLyBzdGF0ZWd5OiBsb2NhdG9yIHN0cmF0ZWd5XHJcbi8vIHNlbGVjdG9yOiB0aGUgYWN0dWFsIHNlbGVjdG9yIGZvciBmaW5kaW5nIGFuIGVsZW1lbnRcclxuLy8gbXVsdDogbXVsdGlwbGUgZWxlbWVudHMgb3IganVzdCBvbmU/XHJcbi8vIGNvbnRleHQ6IGZpbmRpbmcgYW4gZWxlbWVudCBmcm9tIHRoZSByb290IGNvbnRleHQ/IG9yIHN0YXJ0aW5nIGZyb20gYW5vdGhlciBlbGVtZW50XHJcbmhlbHBlcnMuZmluZEVsT3JFbHMgPSBhc3luYyBmdW5jdGlvbiAoc3RyYXRlZ3ksIHNlbGVjdG9yLCBtdWx0LCBjb250ZXh0ID0gJycpIHtcclxuICAvLyB0aHJvd3MgZXJyb3IgaWYgbm90IHZhbGlkLCB1c2VzIHRoaXMubG9jYXRvclN0cmF0ZWdpZXNcclxuICB0aGlzLnZhbGlkYXRlTG9jYXRvclN0cmF0ZWd5KHN0cmF0ZWd5KTtcclxuXHJcbiAgaWYgKCFzZWxlY3Rvcikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBwcm92aWRlIGEgc2VsZWN0b3Igd2hlbiBmaW5kaW5nIGVsZW1lbnRzXCIpO1xyXG4gIH1cclxuXHJcbiAgbGV0IHBhcmFtcyA9IHtcclxuICAgIHN0cmF0ZWd5LFxyXG4gICAgc2VsZWN0b3IsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgbXVsdGlwbGU6IG11bHRcclxuICB9O1xyXG5cclxuICBsZXQgZWxlbWVudDtcclxuICBsZXQgZG9GaW5kID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgZWxlbWVudCA9IGF3YWl0IHRoaXMuZG9GaW5kRWxlbWVudE9yRWxzKHBhcmFtcyk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgaWYgKGVyci5tZXNzYWdlICYmIGVyci5tZXNzYWdlLm1hdGNoKC9BbiBlbGVtZW50IGNvdWxkIG5vdCBiZSBsb2NhdGVkLykpIHtcclxuICAgICAgICAvLyB3ZSBhcmUgZmluZSB3aXRoIHRoaXMsIGp1c3QgaW5kaWNhdGUgYSByZXRyeVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICB0aHJvdyBlcnI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gd2Ugd2FudCB0byByZXR1cm4gZmFsc2UgaWYgd2Ugd2FudCB0byBwb3RlbnRpYWxseSB0cnkgYWdhaW5cclxuICAgIGlmIChwYXJhbXMubXVsdGlwbGUpIHtcclxuICAgICAgcmV0dXJuIGVsZW1lbnQgJiYgZWxlbWVudC5sZW5ndGggIT09IDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gIV8uaXNOdWxsKGVsZW1lbnQpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCB0aGlzLmltcGxpY2l0V2FpdEZvckNvbmRpdGlvbihkb0ZpbmQpO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgaWYgKGVyci5tZXNzYWdlICYmIGVyci5tZXNzYWdlLm1hdGNoKC9Db25kaXRpb24gdW5tZXQvKSkge1xyXG4gICAgICAvLyBvbmx5IGdldCBoZXJlIGlmIHdlIGFyZSBsb29raW5nIGZvciBtdWx0aXBsZSBlbGVtZW50c1xyXG4gICAgICAvLyBjb25kaXRpb24gd2FzIG5vdCBtZXQgc2V0dGluZyByZXMgdG8gZW1wdHkgYXJyYXlcclxuICAgICAgZWxlbWVudCA9IFtdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgZXJyO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKG11bHQpIHtcclxuICAgIHJldHVybiBlbGVtZW50O1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAoIWVsZW1lbnQgfHwgXy5zaXplKGVsZW1lbnQpID09PSAwKSB7XHJcbiAgICAgIHRocm93IG5ldyBlcnJvcnMuTm9TdWNoRWxlbWVudEVycm9yKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxuICB9XHJcbn07XHJcblxyXG5PYmplY3QuYXNzaWduKGV4dGVuc2lvbnMsIGhlbHBlcnMpO1xyXG5leHBvcnQgeyBoZWxwZXJzIH07XHJcbmV4cG9ydCBkZWZhdWx0IGV4dGVuc2lvbnM7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLiJ9
