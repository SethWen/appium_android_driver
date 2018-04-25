'use strict';

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _find = require('./find');

var _find2 = _interopRequireDefault(_find);

var _general = require('./general');

var _general2 = _interopRequireDefault(_general);

var _alert = require('./alert');

var _alert2 = _interopRequireDefault(_alert);

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

var _context = require('./context');

var _context2 = _interopRequireDefault(_context);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _touch = require('./touch');

var _touch2 = _interopRequireDefault(_touch);

var _ime = require('./ime');

var _ime2 = _interopRequireDefault(_ime);

var _network = require('./network');

var _network2 = _interopRequireDefault(_network);

var _coverage = require('./coverage');

var _coverage2 = _interopRequireDefault(_coverage);

var _recordscreen = require('./recordscreen');

var _recordscreen2 = _interopRequireDefault(_recordscreen);

var _performance = require('./performance');

var _performance2 = _interopRequireDefault(_performance);

var _execute = require("./execute");

var _execute2 = _interopRequireDefault(_execute);

var _shell = require("./shell");

var _shell2 = _interopRequireDefault(_shell);

var commands = {};
_Object$assign(commands, _find2['default'], _general2['default'], _alert2['default'], _element2['default'], _context2['default'], _actions2['default'], _touch2['default'], _ime2['default'], _network2['default'], _coverage2['default'], _recordscreen2['default'], _performance2['default'], _execute2['default'], _shell2['default']);

// add other command types here
exports['default'] = commands;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O29CQUFxQixRQUFROzs7O3VCQUNMLFdBQVc7Ozs7cUJBQ2IsU0FBUzs7Ozt1QkFDUCxXQUFXOzs7O3VCQUNYLFdBQVc7Ozs7dUJBQ1osV0FBVzs7OztxQkFDWixTQUFTOzs7O21CQUNYLE9BQU87Ozs7dUJBQ0gsV0FBVzs7Ozt3QkFDVixZQUFZOzs7OzRCQUNSLGdCQUFnQjs7OzsyQkFDakIsZUFBZTs7Ozt1QkFDbkIsV0FBVzs7OztxQkFDYixTQUFTOzs7O0FBRS9CLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNsQixlQUNFLFFBQVEsa1RBZ0JULENBQUM7OztxQkFFYSxRQUFRIiwiZmlsZSI6ImxpYi9jb21tYW5kcy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmaW5kQ21kcyBmcm9tICcuL2ZpbmQnO1xyXG5pbXBvcnQgZ2VuZXJhbENtZHMgZnJvbSAnLi9nZW5lcmFsJztcclxuaW1wb3J0IGFsZXJ0Q21kcyBmcm9tICcuL2FsZXJ0JztcclxuaW1wb3J0IGVsZW1lbnRDbWRzIGZyb20gJy4vZWxlbWVudCc7XHJcbmltcG9ydCBjb250ZXh0Q21kcyBmcm9tICcuL2NvbnRleHQnO1xyXG5pbXBvcnQgYWN0aW9uQ21kcyBmcm9tICcuL2FjdGlvbnMnO1xyXG5pbXBvcnQgdG91Y2hDbWRzIGZyb20gJy4vdG91Y2gnO1xyXG5pbXBvcnQgaW1lQ21kcyBmcm9tICcuL2ltZSc7XHJcbmltcG9ydCBuZXR3b3JrQ21kcyBmcm9tICcuL25ldHdvcmsnO1xyXG5pbXBvcnQgY292ZXJhZ2VDbWRzIGZyb20gJy4vY292ZXJhZ2UnO1xyXG5pbXBvcnQgcmVjb3Jkc2NyZWVuQ21kcyBmcm9tICcuL3JlY29yZHNjcmVlbic7XHJcbmltcG9ydCBwZXJmb3JtYW5jZUNtZHMgZnJvbSAnLi9wZXJmb3JtYW5jZSc7XHJcbmltcG9ydCBleGVjdXRlQ21kcyBmcm9tIFwiLi9leGVjdXRlXCI7XHJcbmltcG9ydCBzaGVsbENtZHMgZnJvbSBcIi4vc2hlbGxcIjtcclxuXHJcbmxldCBjb21tYW5kcyA9IHt9O1xyXG5PYmplY3QuYXNzaWduKFxyXG4gIGNvbW1hbmRzLFxyXG4gIGZpbmRDbWRzLFxyXG4gIGdlbmVyYWxDbWRzLFxyXG4gIGFsZXJ0Q21kcyxcclxuICBlbGVtZW50Q21kcyxcclxuICBjb250ZXh0Q21kcyxcclxuICBhY3Rpb25DbWRzLFxyXG4gIHRvdWNoQ21kcyxcclxuICBpbWVDbWRzLFxyXG4gIG5ldHdvcmtDbWRzLFxyXG4gIGNvdmVyYWdlQ21kcyxcclxuICByZWNvcmRzY3JlZW5DbWRzLFxyXG4gIHBlcmZvcm1hbmNlQ21kcyxcclxuICBleGVjdXRlQ21kcyxcclxuICBzaGVsbENtZHMsXHJcbiAgLy8gYWRkIG90aGVyIGNvbW1hbmQgdHlwZXMgaGVyZVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tbWFuZHM7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLiJ9
