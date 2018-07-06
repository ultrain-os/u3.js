const assert = require("assert");
const minimatch = require("minimatch");

const validate = require("./validate");

module.exports = UriRules;

function UriRules (rules) {
  assert.equal(typeof rules, "object", "rules");
  rules = Object.assign({}, rules);

  for (const path in rules) {
    const uriMatchers = rules[path];
    const rePatterns = createUrlRules(uriMatchers);
    rules[path] = rePatterns;
  }

  function check (uri, paths) {
    return checkUrl(uri, paths, rules);
  }

  function allow (uri, paths) {
    return checkUrl(uri, paths, rules).allow;
  }

  function deny (uri, paths) {
    return checkUrl(uri, paths, rules).deny;
  }

  return {
    check,
    allow,
    deny
  };
}

function createUrlRules (uriMatchers) {
  if (typeof uriMatchers === "string") {
    uriMatchers = [uriMatchers];
  }
  return uriMatchers.map(uriPattern => {
    assert.equal(typeof uriPattern, "string", uriPattern);

    uriPattern = uriPattern.trim();
    assert.notEqual(uriPattern.charAt(0), "^", "uriPattern");

    const prefix = "^";

    // Allow: /contracts, /contracts/abc, /contracts#hp=1, /contracts?qp=1
    // Do not allow: /contracts2
    const suffix = uriPattern.charAt(uriPattern.length - 1) === "$" ? "" : "\/?([#\?].*)?$";

    uriPattern = new RegExp(prefix + uriPattern + suffix, "i");
    return uriPattern;
  });
}

/** @private */
function checkUrl (uri, paths, rules) {
  assert.equal(typeof uri, "string", "uri");

  if (typeof paths === "string") {
    paths = [paths];
  }

  assert(paths instanceof Array || paths instanceof Set,
    "paths is a Set or Array");

  for (const path of paths) {
    validate.path(path);
  }

  function fullUrlPathSet (path) {
    const uriPaths = [];
    for (const rulePath in rules) {
      let match;
      // active key is derived from owner (but this is implied)
      if (minimatch(rulePath, "owner") && minimatch(path, "active{,/**}")) {
        match = true;
      } else {
        const accumulativePath = [];
        for (const part of path.split("/")) {
          accumulativePath.push(part);
          match = minimatch(accumulativePath.join("/"), rulePath);
          if (match) {
            break;
          }
        }
      }
      if (match) {
        uriPaths.push(rules[rulePath]);
      }
    }
    return uriPaths.length ? [].concat.apply([], uriPaths) : null;
  }

  const allow = [], deny = [];
  for (const path of paths) {
    const uriPathSet = fullUrlPathSet(path);
    if (uriPathSet) {
      let oneMatches = false;
      for (const uriPathRegExp of uriPathSet) {
        oneMatches = uriPathRegExp.test(uri);
        // console.log('uriPathRegExp', uriPathRegExp, uri, oneMatches)
        if (oneMatches) {
          allow.push(path);
          break;
        }
      }
      if (!oneMatches) {
        deny.push(path);
      }
    } else {
      deny.push(path);
      // console.log('Missing uriRule for: ' + uri, path)
    }
  }
  assert.equal(paths.length, allow.length + deny.length, "missing path(s)");
  return { allow, deny };
}
