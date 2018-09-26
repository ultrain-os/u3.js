const assert = require("assert");
const ecurve = require("ecurve");
const BigInteger = require("bigi");
const secp256k1 = ecurve.getCurveByName("secp256k1");

const hash = require("./hash");
const keyUtils = require("./key_utils");

var G = secp256k1.G;
var n = secp256k1.n;

module.exports = PublicKey;

function PublicKey (Q) {
  if (typeof Q === "string") {
    const publicKey = PublicKey.fromString(Q);
    assert(publicKey != null, "Invalid public key");
    return publicKey;
  } else if (Buffer.isBuffer(Q)) {
    return PublicKey.fromBuffer(Q);
  } else if (typeof Q === "object" && Q.Q) {
    return PublicKey(Q.Q);
  }

  assert.equal(typeof Q, "object", "Invalid public key");
  assert.equal(typeof Q.compressed, "boolean", "Invalid public key");

  function toBuffer (compressed = Q.compressed) {
    return Q.getEncoded(compressed);
  }

  let pubdata; // cache

  /** @todo rename to toStringLegacy */
  function toString () {
    return "UTR" + keyUtils.checkEncode(toBuffer());
  }

  function toUncompressed () {
    var buf = Q.getEncoded(false);
    var point = ecurve.Point.decodeFrom(secp256k1, buf);
    return PublicKey.fromPoint(point);
  }

  function toHex () {
    return toBuffer().toString("hex");
  }

  return {
    Q,
    toString,
    // toStringLegacy,
    toUncompressed,
    toBuffer,
    toHex
  };
}

PublicKey.isValid = function(text) {
  try {
    PublicKey(text);
    return true;
  } catch (e) {
    return false;
  }
};

PublicKey.fromBinary = function(bin) {
  return PublicKey.fromBuffer(new Buffer(bin, "binary"));
};

PublicKey.fromBuffer = function(buffer) {
  return PublicKey(ecurve.Point.decodeFrom(secp256k1, buffer));
};

PublicKey.fromPoint = function(point) {
  return PublicKey(point);
};

PublicKey.fromString = function(public_key) {
  try {
    return PublicKey.fromStringOrThrow(public_key);
  } catch (e) {
    return null;
  }
};

PublicKey.fromStringOrThrow = function(public_key) {
  assert(typeof public_key, "string", "public_key");
  const match = public_key.match(/^PUB_([A-Za-z0-9]+)_([A-Za-z0-9]+)$/);
  if (match === null) {
    // legacy
    if (/^UTR/.test(public_key)) {
      public_key = public_key.substring(3);
    }
    return PublicKey.fromBuffer(keyUtils.checkDecode(public_key));
  }
  assert(match.length === 3, "Expecting public key like: PUB_K1_base58pubkey..");
  const [, keyType, keyString] = match;
  assert.equal(keyType, "K1", "K1 private key expected");
  return PublicKey.fromBuffer(keyUtils.checkDecode(keyString, keyType));
};

PublicKey.fromHex = function(hex) {
  return PublicKey.fromBuffer(new Buffer(hex, "hex"));
};

PublicKey.fromStringHex = function(hex) {
  return PublicKey.fromString(new Buffer(hex, "hex"));
};
