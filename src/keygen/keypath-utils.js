const assert = require("assert");

module.exports = Storage;

function Storage (namespace) {

  function createKey (...elements) {
    const key = JSON.stringify([namespace, ...elements]);
    // remove [ and ] so key is prefix-friendly for searching
    const keyTrim = key.substring(1, key.length - 1);
    return Buffer.from(keyTrim).toString("hex");
  }

  function save (state, key, value, { immutable = true, clobber = true } = {}) {
    assert.equal(typeof state, "object", "state");

    key = Array.isArray(key) ? createKey(...key) : key;
    assert.equal(typeof key, "string", "key");

    assert(value == null || typeof value === "string" || typeof value === "object",
      "value should be null, a string, or a serializable object");

    const existing = deNull(state[key]); // convert 'null' string back into null

    if (value == null && existing != null && !clobber) {
      // don't erase it, keep the existing value
      value = existing;
    }

    const dirty = existing !== value;
    assert(existing == null || !(dirty && immutable), "immutable");

    if (dirty) {
      state[key] = value;
    }

    return dirty;
  }

  function get (state, key) {
    assert.equal(typeof state, "object", "state");

    key = Array.isArray(key) ? createKey(...key) : key;
    assert.equal(typeof key, "string", "key");

    return deNull(state[key]);
  }

  function query (state, keyPrefix, callback) {
    assert.equal(typeof state, "object", "state");
    assert(Array.isArray(keyPrefix), "keyPrefix is an array");
    assert.equal(typeof callback, "function", "callback");

    const prefix = createKey(...keyPrefix);
    for (const key of Object.keys(state)) {
      if (key.indexOf(prefix) !== 0) {
        continue;
      }
      const decodedKeys = JSON.parse("[" + Buffer.from(key, "hex") + "]");
      const ret = callback(decodedKeys.slice(keyPrefix.length + 1), deNull(state[key]));
      if (ret === false) {
        break;
      }
    }
  }

  return {
    createKey,
    save,
    get,
    query
  };
}

const deNull = value =>
  value === "null" ? null :
    value === "undefined" ? undefined :
      value;
