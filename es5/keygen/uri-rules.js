"use strict";

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = require("assert");
var minimatch = require("minimatch");

var validate = require("./validate");

module.exports = UriRules;

function UriRules(rules) {
  assert.equal(typeof rules === "undefined" ? "undefined" : (0, _typeof3.default)(rules), "object", "rules");
  rules = Object.assign({}, rules);

  for (var path in rules) {
    var uriMatchers = rules[path];
    var rePatterns = createUrlRules(uriMatchers);
    rules[path] = rePatterns;
  }

  function check(uri, paths) {
    return checkUrl(uri, paths, rules);
  }

  function allow(uri, paths) {
    return checkUrl(uri, paths, rules).allow;
  }

  function deny(uri, paths) {
    return checkUrl(uri, paths, rules).deny;
  }

  return {
    check: check,
    allow: allow,
    deny: deny
  };
}

function createUrlRules(uriMatchers) {
  if (typeof uriMatchers === "string") {
    uriMatchers = [uriMatchers];
  }
  return uriMatchers.map(function (uriPattern) {
    assert.equal(typeof uriPattern === "undefined" ? "undefined" : (0, _typeof3.default)(uriPattern), "string", uriPattern);

    uriPattern = uriPattern.trim();
    assert.notEqual(uriPattern.charAt(0), "^", "uriPattern");

    var prefix = "^";

    // Allow: /contracts, /contracts/abc, /contracts#hp=1, /contracts?qp=1
    // Do not allow: /contracts2
    var suffix = uriPattern.charAt(uriPattern.length - 1) === "$" ? "" : "\/?([#\?].*)?$";

    uriPattern = new RegExp(prefix + uriPattern + suffix, "i");
    return uriPattern;
  });
}

/** @private */
function checkUrl(uri, paths, rules) {
  assert.equal(typeof uri === "undefined" ? "undefined" : (0, _typeof3.default)(uri), "string", "uri");

  if (typeof paths === "string") {
    paths = [paths];
  }

  assert(paths instanceof Array || paths instanceof Set, "paths is a Set or Array");

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = paths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var path = _step.value;

      validate.path(path);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  function fullUrlPathSet(path) {
    var uriPaths = [];
    for (var rulePath in rules) {
      var match = void 0;
      // active key is derived from owner (but this is implied)
      if (minimatch(rulePath, "owner") && minimatch(path, "active{,/**}")) {
        match = true;
      } else {
        var accumulativePath = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = path.split("/")[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var part = _step2.value;

            accumulativePath.push(part);
            match = minimatch(accumulativePath.join("/"), rulePath);
            if (match) {
              break;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
      if (match) {
        uriPaths.push(rules[rulePath]);
      }
    }
    return uriPaths.length ? [].concat.apply([], uriPaths) : null;
  }

  var allow = [],
      deny = [];
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = paths[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _path = _step3.value;

      var uriPathSet = fullUrlPathSet(_path);
      if (uriPathSet) {
        var oneMatches = false;
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = uriPathSet[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var uriPathRegExp = _step4.value;

            oneMatches = uriPathRegExp.test(uri);
            // console.log('uriPathRegExp', uriPathRegExp, uri, oneMatches)
            if (oneMatches) {
              allow.push(_path);
              break;
            }
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        if (!oneMatches) {
          deny.push(_path);
        }
      } else {
        deny.push(_path);
        // console.log('Missing uriRule for: ' + uri, path)
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  assert.equal(paths.length, allow.length + deny.length, "missing path(s)");
  return { allow: allow, deny: deny };
}