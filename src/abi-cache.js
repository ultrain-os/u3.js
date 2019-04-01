const Structs = require("./structs");

module.exports = AbiCache;

function AbiCache(network, config) {
  config.abiCache = {
    abiAsync,
    abi
  };

  // Help (or "usage") needs {defaults: true}
  const abiCacheConfig = Object.assign({}, { defaults: true }, config);

  const cache = {};

  /**
   Asynchronously fetch and cache an ABI from the blockchain.
   @arg {string} account - blockchain account with deployed contract
   @arg {boolean} [force = true] false when ABI is immutable.
   */
  async function abiAsync(account, force = true) {
    if (typeof account !== "string") {
      throw new Error("account string required");
    }

    if (force === false && cache[account] != null) {
      return Promise.resolve(cache[account]);
    }

    if (network == null) {
      const abi = cache[account];
      return Promise.resolve(abi);
    }

    const code = await network.getAbi(account);
    if (!code.abi) {
      throw new Error(`Missing ABI for account: ${account}`);
    }
    return abi(account, code.abi);
  }

  /**
   Synchronously set or fetch an ABI from local cache.
   @arg {string} account - blockchain account with deployed contract
   @arg {string} [abi] - blockchain ABI json data.  Null to fetch or non-null to cache
   */
  function abi(account, abi) {
    if (typeof account !== "string") {
      throw new Error("account string required");
    }
    if (abi) {
      if (typeof abi !== "object") {
        throw new Error("abi should be object");
      }
      if (Buffer.isBuffer(abi)) {
        abi = JSON.parse(abi);
      }
      const fcSchema = abiToFcSchema(abi, account);
      const structs = Structs(abiCacheConfig, fcSchema); // returns {structs, types}
      return cache[account] = Object.assign({ abi, schema: fcSchema }, structs);
    }
    const c = cache[account];
    if (c == null) {
      throw new Error(`Abi '${account}' is not cached`);
    }
    return c;
  }

  return config.abiCache;
}

function abiToFcSchema(abi, account) {
  // customTypes
  // For FcBuffer
  const abiSchema = {};

  // convert abi types to Fcbuffer schema
  if (abi.types) { // aliases
    abi.types.forEach(e => {
      // "account_name" = "name"
      abiSchema[e.new_type_name] = e.type;
    });
  }

  if (abi.structs) {
    // transaction_header = fields[actor, permission] extends base "transaction"
    abi.structs.forEach(e => {
      const fields = {};
      for (const field of e.fields) {
        fields[field.name] = field.type;
      }
      abiSchema[e.name] = { base: e.base, fields };
      if (e.base === "") {
        delete abiSchema[e.name].base;
      }
    });
  }

  if (abi.actions) {
    // setprods = set_producers
    abi.actions.forEach(action => {
      // @example action = {name: 'setprods', type: 'set_producers'}
      const type = abiSchema[action.type];
      if (!type) {
        console.error("Missing abiSchema type", action.type, account);//, abi, abiSchema)
      } else {
        type.action = {
          name: action.name,
          account
        };
      }
    });
    // console.log('abiSchema', abiSchema);
  }

  return abiSchema;
}
