'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var app = require.resolve('android-apidemos');

var DEFAULT_CAPS = {
  app: app,
  deviceName: 'Android',
  platformName: 'Android'
};

var CONTACT_MANAGER_CAPS = _lodash2['default'].defaults({
  app: _path2['default'].resolve(__dirname, '..', '..', '..', 'test', 'assets', 'ContactManager.apk')
}, DEFAULT_CAPS);

var CHROME_CAPS = _lodash2['default'].defaults({
  browserName: 'chrome'
}, DEFAULT_CAPS);

exports.app = app;
exports.DEFAULT_CAPS = DEFAULT_CAPS;
exports.CONTACT_MANAGER_CAPS = CONTACT_MANAGER_CAPS;
exports.CHROME_CAPS = CHROME_CAPS;
exports['default'] = DEFAULT_CAPS;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9kZXNpcmVkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7O3NCQUNULFFBQVE7Ozs7QUFHdEIsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOztBQUVoRCxJQUFNLFlBQVksR0FBRztBQUNuQixLQUFHLEVBQUgsR0FBRztBQUNILFlBQVUsRUFBRSxTQUFTO0FBQ3JCLGNBQVksRUFBRSxTQUFTO0NBQ3hCLENBQUM7O0FBRUYsSUFBTSxvQkFBb0IsR0FBRyxvQkFBRSxRQUFRLENBQUM7QUFDdEMsS0FBRyxFQUFFLGtCQUFLLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsQ0FBQztDQUN2RixFQUFFLFlBQVksQ0FBQyxDQUFDOztBQUVqQixJQUFNLFdBQVcsR0FBRyxvQkFBRSxRQUFRLENBQUM7QUFDN0IsYUFBVyxFQUFFLFFBQVE7Q0FDdEIsRUFBRSxZQUFZLENBQUMsQ0FBQzs7UUFFUixHQUFHLEdBQUgsR0FBRztRQUFFLFlBQVksR0FBWixZQUFZO1FBQUUsb0JBQW9CLEdBQXBCLG9CQUFvQjtRQUFFLFdBQVcsR0FBWCxXQUFXO3FCQUM5QyxZQUFZIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9kZXNpcmVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5cclxuY29uc3QgYXBwID0gcmVxdWlyZS5yZXNvbHZlKCdhbmRyb2lkLWFwaWRlbW9zJyk7XHJcblxyXG5jb25zdCBERUZBVUxUX0NBUFMgPSB7XHJcbiAgYXBwLFxyXG4gIGRldmljZU5hbWU6ICdBbmRyb2lkJyxcclxuICBwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJyxcclxufTtcclxuXHJcbmNvbnN0IENPTlRBQ1RfTUFOQUdFUl9DQVBTID0gXy5kZWZhdWx0cyh7XHJcbiAgYXBwOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4nLCAnLi4nLCAnLi4nLCAndGVzdCcsICdhc3NldHMnLCAnQ29udGFjdE1hbmFnZXIuYXBrJyksXHJcbn0sIERFRkFVTFRfQ0FQUyk7XHJcblxyXG5jb25zdCBDSFJPTUVfQ0FQUyA9IF8uZGVmYXVsdHMoe1xyXG4gIGJyb3dzZXJOYW1lOiAnY2hyb21lJ1xyXG59LCBERUZBVUxUX0NBUFMpO1xyXG5cclxuZXhwb3J0IHsgYXBwLCBERUZBVUxUX0NBUFMsIENPTlRBQ1RfTUFOQUdFUl9DQVBTLCBDSFJPTUVfQ0FQUyB9O1xyXG5leHBvcnQgZGVmYXVsdCBERUZBVUxUX0NBUFM7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLiJ9
