const assert = require('assert');
const Structs = require('./structs');
const defaultConfig = require("../src/config");

module.exports = AssetCache;

function AssetCache(network) {

  const cache = {
    'UTR@utrio.token': { precision: 4 }
  };
  cache[defaultConfig.symbol + '@utrio.token'] = { precision: 4 };

  function lookupAsync(symbol, contract) {
    assert(symbol, 'required symbol');
    assert(contract, 'required contract');

    if (contract === 'utrio') {
      contract = 'utrio.token';
    }

    const extendedAsset = `${symbol}@${contract}`;

    if (cache[extendedAsset] != null) {
      return Promise.resolve(cache[extendedAsset]);
    }

    const statsPromise = network.getCurrencyStats(contract, symbol).then(result => {
      const stats = result[symbol];
      if (!stats) {
        cache[extendedAsset] = null; // retry (null means no asset was observed)
        // console.log(`Missing currency stats for asset: ${extendedAsset}`)
        return;
      }

      const { max_supply } = stats;

      assert.equal(typeof max_supply, 'string',
        `Expecting max_supply string in currency stats: ${result}`);

      assert(new RegExp(`^[0-9]+(\.[0-9]+)? ${symbol}$`).test(max_supply),
        `Expecting max_supply string like 10000.0000 ` + defaultConfig.symbol + `, instead got: ${max_supply}`);

      const [supply] = max_supply.split(' ');
      const [, decimalstr = ''] = supply.split('.');
      const precision = decimalstr.length;

      assert(precision >= 0 && precision <= 18,
        'unable to determine precision from string: ' + max_supply);

      return cache[extendedAsset] = { precision };
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

    const extendedAsset = `${symbol}@${contract}`;

    const c = cache[extendedAsset];

    if (c instanceof Promise) {
      return undefined; // pending
    }

    return c;
  }

  return {
    lookupAsync,
    lookup
  };
}

let promises = [];

AssetCache.resolve = async function() {
  await Promise.all(promises);
  promises = [];
};

AssetCache.pending = function() {
  return promises.length !== 0;
};
