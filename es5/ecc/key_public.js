"use strict";

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = require("assert");
var ecurve = require("ecurve");
var BigInteger = require("bigi");
var secp256k1 = ecurve.getCurveByName("secp256k1");

var hash = require("./hash");
var keyUtils = require("./key_utils");

var G = secp256k1.G;
var n = secp256k1.n;

module.exports = PublicKey;

function PublicKey(Q) {
  if (typeof Q === "string") {
    var publicKey = PublicKey.fromString(Q);
    assert(publicKey != null, "Invalid public key");
    return publicKey;
  } else if (Buffer.isBuffer(Q)) {
    return PublicKey.fromBuffer(Q);
  } else if ((typeof Q === "undefined" ? "undefined" : (0, _typeof3.default)(Q)) === "object" && Q.Q) {
    return PublicKey(Q.Q);
  }

  assert.equal(typeof Q === "undefined" ? "undefined" : (0, _typeof3.default)(Q), "object", "Invalid public key");
  assert.equal((0, _typeof3.default)(Q.compressed), "boolean", "Invalid public key");

  function toBuffer() {
    var compressed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Q.compressed;

    return Q.getEncoded(compressed);
  }

  var pubdata = void 0; // cache

  /** @todo rename to toStringLegacy */
  function toString() {
    return "UTR" + keyUtils.checkEncode(toBuffer());
  }

  function toUncompressed() {
    var buf = Q.getEncoded(false);
    var point = ecurve.Point.decodeFrom(secp256k1, buf);
    return PublicKey.fromPoint(point);
  }

  function toHex() {
    return toBuffer().toString("hex");
  }

  return {
    Q: Q,
    toString: toString,
    // toStringLegacy,
    toUncompressed: toUncompressed,
    toBuffer: toBuffer,
    toHex: toHex
  };
}

PublicKey.isValid = function (text) {
  try {
    PublicKey(text);
    return true;
  } catch (e) {
    return false;
  }
};

PublicKey.fromBinary = function (bin) {
  return PublicKey.fromBuffer(new Buffer(bin, "binary"));
};

PublicKey.fromBuffer = function (buffer) {
  return PublicKey(ecurve.Point.decodeFrom(secp256k1, buffer));
};

PublicKey.fromPoint = function (point) {
  return PublicKey(point);
};

PublicKey.fromString = function (public_key) {
  try {
    return PublicKey.fromStringOrThrow(public_key);
  } catch (e) {
    return null;
  }
};

PublicKey.fromStringOrThrow = function (public_key) {
  assert(typeof public_key === "undefined" ? "undefined" : (0, _typeof3.default)(public_key), "string", "public_key");
  var match = public_key.match(/^PUB_([A-Za-z0-9]+)_([A-Za-z0-9]+)$/);
  if (match === null) {
    // legacy
    if (/^UTR/.test(public_key)) {
      public_key = public_key.substring(3);
    }
    return PublicKey.fromBuffer(keyUtils.checkDecode(public_key));
  }
  assert(match.length === 3, "Expecting public key like: PUB_K1_base58pubkey..");

  var _match = (0, _slicedToArray3.default)(match, 3),
      keyType = _match[1],
      keyString = _match[2];

  assert.equal(keyType, "K1", "K1 private key expected");
  return PublicKey.fromBuffer(keyUtils.checkDecode(keyString, keyType));
};

PublicKey.fromHex = function (hex) {
  return PublicKey.fromBuffer(new Buffer(hex, "hex"));
};

PublicKey.fromStringHex = function (hex) {
  return PublicKey.fromString(new Buffer(hex, "hex"));
};