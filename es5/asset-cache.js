'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = require('assert');
var Structs = require('./structs');
var defaultConfig = require("../src/config");

module.exports = AssetCache;

function AssetCache(network) {

  var cache = {
    'UTR@utrio.token': { precision: 4 }
  };
  cache[defaultConfig.symbol + '@utrio.token'] = { precision: 4 };

  function lookupAsync(symbol, contract) {
    assert(symbol, 'required symbol');
    assert(contract, 'required contract');

    if (contract === 'utrio') {
      contract = 'utrio.token';
    }

    var extendedAsset = symbol + '@' + contract;

    if (cache[extendedAsset] != null) {
      return Promise.resolve(cache[extendedAsset]);
    }

    var statsPromise = network.getCurrencyStats(contract, symbol).then(function (result) {
      var stats = result[symbol];
      if (!stats) {
        cache[extendedAsset] = null; // retry (null means no asset was observed)
        // console.log(`Missing currency stats for asset: ${extendedAsset}`)
        return;
      }

      var max_supply = stats.max_supply;


      assert.equal(typeof max_supply === 'undefined' ? 'undefined' : (0, _typeof3.default)(max_supply), 'string', 'Expecting max_supply string in currency stats: ' + result);

      assert(new RegExp('^[0-9]+(.[0-9]+)? ' + symbol + '$').test(max_supply), 'Expecting max_supply string like 10000.0000 ' + defaultConfig.symbol + (', instead got: ' + max_supply));

      var _max_supply$split = max_supply.split(' '),
          _max_supply$split2 = (0, _slicedToArray3.default)(_max_supply$split, 1),
          supply = _max_supply$split2[0];

      var _supply$split = supply.split('.'),
          _supply$split2 = (0, _slicedToArray3.default)(_supply$split, 2),
          _supply$split2$ = _supply$split2[1],
          decimalstr = _supply$split2$ === undefined ? '' : _supply$split2$;

      var precision = decimalstr.length;

      assert(precision >= 0 && precision <= 18, 'unable to determine precision from string: ' + max_supply);

      return cache[extendedAsset] = { precision: precision };
    });

    promises.push(statsPromise);

    return cache[extendedAsset] = statsPromise;
  }

  function lookup(symbol, contract) {
    assert(symbol, 'required symbol');
    assert(contract, 'required contract');

    if (contract === 'utrio') {
      contract = 'utrio.token';
    }

    var extendedAsset = symbol + '@' + contract;

    var c = cache[extendedAsset];

    if (c instanceof Promise) {
      return undefined; // pending
    }

    return c;
  }

  return {
    lookupAsync: lookupAsync,
    lookup: lookup
  };
}

var promises = [];

AssetCache.resolve = function _callee() {
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator2.default.awrap(Promise.all(promises));

        case 2:
          promises = [];

        case 3:
        case 'end':
          return _context.stop();
      }
    }
  }, null, this);
};

AssetCache.pending = function () {
  return promises.length !== 0;
};