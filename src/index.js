try {
  require("babel-polyfill");
} catch (e) {
  if (e.message.indexOf("only one instance of babel-polyfill is allowed") === -1) {
    console.error(e);
  }
}

const abi2json = require('./utils/abi2json');
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const configDefaults = require("./config");
const ecc = require("./ecc");
const Fcbuffer = require("fcbuffer");
const apiGen = require("./utils/apigen");
const api = require("./v1/chain");

const assert = require("assert");

const Structs = require("./structs");
const AbiCache = require("./abi-cache");

const AssetCache = require("./asset-cache");
const writeApiGen = require("./write-api");
const format = require("./format");
const schema = require("./v1/schema");
const pkg = require("../package.json");

const Ultrain = (config = {}) => {
  config = Object.assign({}, configDefaults, config);
  const defaultLogger = {
    log: config.verbose ? console.log : null,
    error: console.error
  };
  config.logger = Object.assign({}, defaultLogger, config.logger);

  let ultrainObj = createUltrain(config);
  

  Object.assign(ultrainObj,{
    deploy
  });
  return ultrainObj;
};

async function deploy(contract, account = "ultrainio"){
  
  const wasm = fs.readFileSync(path.resolve(process.cwd(), `build/${contract}.wasm`));
  const abi = fs.readFileSync(path.resolve(process.cwd(), `build/${contract}.abi`));

  this.setcode(account, 0, 0, wasm);
  this.setabi(account, JSON.parse(abi));

  const code = await this.getContract(account);
  return code;
}

module.exports = Ultrain;

Object.assign(Ultrain, {
    version: pkg.version,
    modules: {
      format,
      ecc,
      Fcbuffer
    },
    abi2json
  }
);

/**
 * create ultrain instance
 * @param config
 * @returns {Object}
 */
function createUltrain (config) {
  const network = apiGen("v1", api, config);
  config.network = network;

  config.assetCache = AssetCache(network);
  config.abiCache = AbiCache(network, config);

  if (!config.chainId) {
    config.chainId = "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f";
  }

  checkChainId(network, config.chainId);

  if (config.mockTransactions != null) {
    if (typeof config.mockTransactions === "string") {
      const mock = config.mockTransactions;
      config.mockTransactions = () => mock;
    }
    assert.equal(typeof config.mockTransactions, "function", "config.mockTransactions");
  }

  const { structs, types, fromBuffer, toBuffer } = Structs(config);
  const ultrain = mergeWriteFunctions(config, network, structs);

  Object.assign(ultrain, {
    fc: {
      structs,
      types,
      fromBuffer,
      toBuffer
    }
  });

  if (!config.signProvider) {
    config.signProvider = defaultSignProvider(ultrain, config);
  }

  return ultrain;
}

function mergeWriteFunctions (config, api, structs) {
  assert(config.network, "network instance required");
  const { network } = config;

  // block api
  const merge = Object.assign({}, network);

  // add abi.json to schema
  const list = glob.sync(path.join(process.cwd(),'build/*.json'));
  let my_schema = Object.assign({},schema);
  for(let i in list){
    my_schema = Object.assign(my_schema,require(list[i]));
  }

  // contract abi
  const writeApi = writeApiGen(api, network, structs, config, my_schema);

  throwOnDuplicate(merge, writeApi, "Conflicting methods in UltrainApi and Transaction Api");
  Object.assign(merge, writeApi);

  return merge;
}

function throwOnDuplicate (o1, o2, msg) {
  for (const key in o1) {
    if (o2[key]) {
      throw new TypeError(msg + ": " + key);
    }
  }
}

const defaultSignProvider = (ultrain, config) => async function({ sign, buf, transaction }) {
  const { keyProvider } = config;

  if (!keyProvider) {
    throw new TypeError("This transaction requires a config.keyProvider for signing");
  }

  let keys = keyProvider;
  if (typeof keyProvider === "function") {
    keys = keyProvider({ transaction });
  }

  // keyProvider may return keys or Promise<keys>
  keys = await Promise.resolve(keys);

  if (!Array.isArray(keys)) {
    keys = [keys];
  }

  keys = keys.map(key => {
    try {
      // normalize format (WIF => PVT_K1_base58privateKey)
      return { private: ecc.PrivateKey(key).toString() };
    } catch (e) {
      // normalize format (UTRKey => PUB_K1_base58publicKey)
      return { public: ecc.PublicKey(key).toString() };
    }
    assert(false, "expecting public or private keys from keyProvider");
  });

  if (!keys.length) {
    throw new Error("missing key, check your keyProvider");
  }

  // simplify default signing #17
  if (keys.length === 1 && keys[0].private) {
    const pvt = keys[0].private;
    return sign(buf, pvt);
  }

  const keyMap = new Map();

  // keys are either public or private keys
  for (const key of keys) {
    const isPrivate = key.private != null;
    const isPublic = key.public != null;

    if (isPrivate) {
      keyMap.set(ecc.privateToPublic(key.private), key.private);
    } else {
      keyMap.set(key.public, null);
    }
  }

  const pubkeys = Array.from(keyMap.keys());

  return ultrain.getRequiredKeys(transaction, pubkeys).then(({ required_keys }) => {
    if (!required_keys.length) {
      throw new Error("missing required keys for " + JSON.stringify(transaction));
    }

    const pvts = [], missingKeys = [];

    for (let requiredKey of required_keys) {
      // normalize (UTRKey.. => PUB_K1_Key..)
      requiredKey = ecc.PublicKey(requiredKey).toString();

      const wif = keyMap.get(requiredKey);
      if (wif) {
        pvts.push(wif);
      } else {
        missingKeys.push(requiredKey);
      }
    }

    if (missingKeys.length !== 0) {
      assert(typeof keyProvider === "function",
        "keyProvider function is needed for private key lookup");

      // const pubkeys = missingKeys.map(key => ecc.PublicKey(key).toStringLegacy())
      keyProvider({ pubkeys: missingKeys })
        .forEach(pvt => { pvts.push(pvt); });
    }

    const sigs = [];
    for (const pvt of pvts) {
      sigs.push(sign(buf, pvt));
    }

    return sigs;
  });
};

function checkChainId (network, chainId) {
  network.getChainInfo({}).then(info => {
    if (info.chain_id !== chainId) {
      console.warn(
        "WARN: chainId mismatch, signatures will not match transaction authority. " +
        `expected ${chainId} !== actual ${info.chain_id}`
      );
    }
  }).catch(error => {
    console.error(error);
  });
}
