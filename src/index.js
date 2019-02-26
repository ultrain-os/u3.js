try {
  require("babel-polyfill");
} catch (e) {
  if (e.message.indexOf("only one instance of babel-polyfill is allowed") === -1) {
    console.error(e);
  }
}

const fs = require("fs");
const path = require("path");
const configDefaults = require("./config");
const { ecc } = require("u3-utils/src");
const listener = require("./utils/listener");
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
const defaultConfig = require("../src/config");

const version = pkg.version;

const defaultSignProvider = (u3, config) => async function({
                                                             sign, buf, transaction, optionsKeyProvider
                                                           }) {
  // optionsKeyProvider is a per-action key: await eos.someAction('user2' .., {keyProvider: privateKey2})
  const keyProvider = optionsKeyProvider ? optionsKeyProvider : config.keyProvider;

  if (!keyProvider) {
    throw new TypeError("This transaction requires a keyProvider for signing");
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
      // normalize format (EOSKey => PUB_K1_base58publicKey)
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

  // offline signing assumes all keys provided need to sign
  if (config.httpEndpoint == null) {
    const sigs = [];
    for (const key of keys) {
      sigs.push(sign(buf, key.private));
    }
    return sigs;
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

  return u3.getRequiredKeys(transaction, pubkeys).then(({ required_keys }) => {
    if (!required_keys.length) {
      throw new Error("missing required keys for " + JSON.stringify(transaction));
    }

    const pvts = [], missingKeys = [];

    for (let requiredKey of required_keys) {
      // normalize (EOSKey.. => PUB_K1_Key..)
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

/**
 * create U3 instance
 * @param config configuration information
 * @returns {Object} instance of U3
 */
const createU3 = (config = {}) => {
  config = Object.assign({}, configDefaults, config);
  const history = require("./history")(config);
  const defaultLogger = {
    log: config.verbose ? console.log : null,
    error: console.error
  };
  config.logger = Object.assign({}, defaultLogger, config.logger);

  const network = config.httpEndpoint != null ? apiGen("v1", api, config) : null;
  config.network = network;

  config.assetCache = AssetCache(network);
  config.abiCache = AbiCache(network, config);

  if (!config.chainId) {
    config.chainId = "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f";
  }

  _checkChainId(network, config.chainId);

  if (config.mockTransactions != null) {
    if (typeof config.mockTransactions === "string") {
      const mock = config.mockTransactions;
      config.mockTransactions = () => mock;
    }
    assert.equal(typeof config.mockTransactions, "function", "config.mockTransactions");
  }

  const { structs, types, fromBuffer, toBuffer } = Structs(config);
  const u3 = _mergeWriteFunctions(config, network, structs);

  Object.assign(u3, {
      config: safeConfig(config),
      fc: {
        structs,
        types,
        fromBuffer,
        toBuffer
      }
      , queryResource
      , deploy
      , createUser
      , sign
    },
    history
  );

  if (!config.signProvider) {
    config.signProvider = defaultSignProvider(u3, config);
  }
  return u3;
};

/**
 * deploy contract
 * @param contract path of contract，eg. utrio.UGAStem
 * @param account name of owner account，eg. ultrainio
 * @returns {Promise<*>}
 */
async function deploy (contract, account) {
  try {
    const wasm = fs.readFileSync(path.resolve(process.cwd(), `${contract}.wasm`));
    const abi = fs.readFileSync(path.resolve(process.cwd(), `${contract}.abi`));
    // If the ability of action wasn't set up, setting up the ability.
    let abi_obj = JSON.parse(abi);
    abi_obj.actions.forEach((action) => {
      if (action.ability == undefined) action.ability = "normal";
    })
    const sysContrName = "ultrainio";
    return await this.transaction(sysContrName, contr => {
      contr.setcode(account, 0, 0, wasm);
      contr.setabi(account, abi_obj);
    });
  } catch (e) {
    console.log(e);
    return {"error_msg": e};
  }
}

/**
 * create a new user account by chain, and buy some ram, net, cpu
 * @param params
 * eg format:
 * {
    creator: "ultrainio",
    name: "test123",
    owner: "UTR6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
    active: "UTR6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
    updateable: 0
  }
 * @returns {Promise<*>}
 */
async function createUser (params) {
  let defaults = {
    updateable: 1//default is updateable
  };
  let data = Object.assign({}, defaults, params);

  const c = await this.contract("ultrainio");
  return c.transaction(tr => {
    tr.newaccount({
      creator: data.creator,
      name: data.name,
      owner: data.owner,
      active: data.active,
      updateable: data.updateable
    });
  });
}

/**
 * query resource detail of an account
 * @param name  account who want to query resource
 * @returns {Promise<*>}
 */
async function queryResource (name) {
  return this.getTableRecords({
    code: "ultrainio",
    scope: name,
    table: "reslease",
    json: true
  });
}

/**
 * offline sign
 * @param unsigned_transaction
 * @param privateKeyOrMnemonic
 * @param chainId
 * @returns {Promise<*>}
 */
async function sign (unsigned_transaction, privateKeyOrMnemonic, chainId = "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f") {
  assert(unsigned_transaction, "unsigned transaction required");
  assert(privateKeyOrMnemonic, "privateKeyOrMnemonic required");

  let privateKey = privateKeyOrMnemonic;
  let isValidPrivateKey = ecc.isValidPrivate(privateKeyOrMnemonic);
  if (!isValidPrivateKey) {
    let result = ecc.generateKeyPairByMnemonic(privateKeyOrMnemonic);
    privateKey = result.private_key;
  }

  let txObject = unsigned_transaction.transaction.transaction;
  delete txObject.context_free_actions;
  delete txObject.transaction_extensions;

  const buf = Fcbuffer.toBuffer(this.fc.structs.transaction, txObject);
  const chainIdBuf = new Buffer(chainId, "hex");
  const signBuf = Buffer.concat([chainIdBuf, buf, new Buffer(new Uint8Array(32))]);

  return ecc.sign(signBuf, privateKey);
}

/**
 Set each property as read-only, read-write, no-access.  This is shallow
 in that it applies only to the root object and does not limit access
 to properties under a given object.
 */
function safeConfig (config) {
  // access control is shallow references only
  const readOnly = new Set(["httpEndpoint", "abiCache"]);
  const readWrite = new Set(["verbose", "debug", "broadcast", "logger", "sign"]);
  const protectedConfig = {};

  Object.keys(config).forEach(key => {
    Object.defineProperty(protectedConfig, key, {
      set: function(value) {
        if (readWrite.has(key)) {
          config[key] = value;
          return;
        }
        throw new Error("Access denied");
      },

      get: function() {
        if (readOnly.has(key) || readWrite.has(key)) {
          return config[key];
        }
        throw new Error("Access denied");
      }
    });
  });
  return protectedConfig;
}

/**
 * merge chain function and contract function
 * @param config
 * @param api
 * @param structs
 * @returns {*}
 * @private
 */
function _mergeWriteFunctions (config, api, structs) {
  assert(config, "network instance required");
  const { network } = config;

  // block api
  const merge = Object.assign({}, network);

  // contract abi
  const writeApi = writeApiGen(api, network, structs, config, schema);

  _throwOnDuplicate(merge, writeApi, "Conflicting methods in UltrainApi and Transaction Api");
  Object.assign(merge, writeApi);

  return merge;
}

/**
 * throw if duplicate
 * @param o1
 * @param o2
 * @param msg
 * @private
 */
function _throwOnDuplicate (o1, o2, msg) {
  for (const key in o1) {
    if (o2[key]) {
      throw new TypeError(msg + ": " + key);
    }
  }
}

/**
 * check chainId
 * @param api
 * @param chainId
 * @private
 */
function _checkChainId (api, chainId) {

  api.getChainInfo({}).then(info => {
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

module.exports = {
  createU3,
  queryResource,
  format,
  ecc,
  Fcbuffer,
  listener,
  version
};
