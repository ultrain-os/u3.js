const fs = require("fs");
const path = require("path");
const assert = require("assert");
const Fcbuffer = require("fcbuffer");
const U3Utils = require("u3-utils");
const configDefaults = require("./src/config");
const listener = require("./src/utils/listener");
const apiGen = require("./src/utils/apigen");
const historyGen = require("./src/history");
const api = require("./src/v1/chain");
const Structs = require("./src/structs");
const AbiCache = require("./src/abi-cache");
const AssetCache = require("./src/asset-cache");
const writeApiGen = require("./src/write-api");
const format = require("./src/format");
const schema = require("./src/v1/schema");
const Logger = require("./src/utils/logger");
let logger;

const defaultSignProvider = (u3, config) => function({ sign, buf, transaction, optionsKeyProvider }) {
  const keyProvider = optionsKeyProvider ? optionsKeyProvider : config.keyProvider;
  if (!keyProvider) {
    throw new TypeError("This transaction requires a keyProvider for signing");
  }

  let keys = keyProvider;
  if (!Array.isArray(keys)) {
    keys = [keys];
  }

  keys = keys.map(key => {
    try {
      // normalize format (WIF => PVT_K1_base58privateKey)
      return { private: U3Utils.ecc.PrivateKey(key).toString() };
    } catch (e) {
      // normalize format (UTRKey => PUB_K1_base58publicKey)
      return { public: U3Utils.ecc.PublicKey(key).toString() };
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
};

/**
 * deploy contract
 * @param contract path of contract，eg. utrio.UGAStem
 * @param account name of owner account，eg. ultrainio
 * @param options eg:{keyProvider: 'xxx...'}
 * @returns {Promise<*>}
 */
async function deploy(contract, account, options) {
  try {
    const wasm = fs.readFileSync(path.resolve(process.cwd(), `${contract}.wasm`));
    const abi = fs.readFileSync(path.resolve(process.cwd(), `${contract}.abi`));

    let abi_obj = JSON.parse(abi);
    abi_obj.actions.forEach((action) => {
      if (!action.ability)
        action.ability = "normal";
    });

    const tr = await this.transaction("ultrainio", c => {
      c.setcode(account, 0, 0, wasm);
      c.setabi(account, abi_obj);
    }, options);
    return tr;
  } catch (e) {
    logger.error(e);
  }
}

/**
 * create a new user account by chain, and buy some ram, net, cpu
 * @param params
 * @param options: eg:{keyProvider: 'xxx...'}
 *
 * params format:
 * {
    creator: "ultrainio",
    name: "test123",
    owner: "UTR6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
    active: "UTR6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
    updateable: 1
  }
 * @returns {Promise<*>}
 */
async function createUser(params, options) {
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
  }, options);
}

/**
 * offline sign
 * @param unsigned_transaction
 * @param privateKeyOrMnemonic
 * @param chainId
 * @returns {Promise<*>}
 */
async function sign(unsigned_transaction, privateKeyOrMnemonic, chainId = "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f") {
  assert(unsigned_transaction, "unsigned transaction required");
  assert(privateKeyOrMnemonic, "privateKeyOrMnemonic required");

  let privateKey = privateKeyOrMnemonic;
  let isValidPrivateKey = U3Utils.ecc.isValidPrivate(privateKeyOrMnemonic);
  if (!isValidPrivateKey) {
    let result = U3Utils.ecc.generateKeyPairByMnemonic(privateKeyOrMnemonic);
    privateKey = result.private_key;
  }

  let txObject = unsigned_transaction.transaction.transaction;

  const buf = Fcbuffer.toBuffer(this.fc.structs.transaction, txObject);
  const chainIdBuf = new Buffer(chainId, "hex");
  const signBuf = Buffer.concat([chainIdBuf, buf, new Buffer(new Uint8Array(32))]);

  return U3Utils.ecc.sign(signBuf, privateKey);
}

/**
 * merge chain function and contract function
 * @param config
 * @param api
 * @param structs
 * @returns {*}
 * @private
 */
function _mergeWriteFunctions(config, api, structs) {
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
function _throwOnDuplicate(o1, o2, msg) {
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
async function _checkChainId(api, chainId) {
  let info = await api.getChainInfo();
  if (info.chain_id !== chainId) {
    logger.warn(
      "WARN: chainId mismatch, signatures will not match transaction authority. " +
      `expected ${chainId} !== actual ${info.chain_id}`
    );
  }
};

/**
 * create U3 instance
 * @param config configuration information
 * @returns {Object} instance of U3
 */
const createU3 = (config = {}) => {
  config = Object.assign({}, configDefaults, config);
  const loggerConfig = Object.assign({}, configDefaults.logger, config.logger);
  config.logger = loggerConfig;
  logger = new Logger(loggerConfig);

  const history = historyGen(config);
  const network = config.httpEndpoint != null ? apiGen("v1", api, config) : null;
  config.network = network;

  config.assetCache = AssetCache(network);
  config.abiCache = AbiCache(network, config);

  //_checkChainId(network, config.chainId);

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
      config,
      fc: {
        structs,
        types,
        fromBuffer,
        toBuffer
      }
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


module.exports = {
  createU3,
  format,
  U3Utils,
  Fcbuffer,
  listener
};
