"use strict";

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ecurve = require("ecurve");
var Point = ecurve.Point;
var secp256k1 = ecurve.getCurveByName("secp256k1");
var BigInteger = require("bigi");
var assert = require("assert");

var hash = require("./hash");
var PublicKey = require("./key_public");
var keyUtils = require("./key_utils");
var createHash = require("create-hash");
var promiseAsync = require("./promise-async");

var G = secp256k1.G;
var n = secp256k1.n;

module.exports = PrivateKey;

function PrivateKey(d) {
  if (typeof d === "string") {
    return PrivateKey.fromString(d);
  } else if (Buffer.isBuffer(d)) {
    return PrivateKey.fromBuffer(d);
  } else if ((typeof d === "undefined" ? "undefined" : (0, _typeof3.default)(d)) === "object" && BigInteger.isBigInteger(d.d)) {
    return PrivateKey(d.d);
  }

  if (!BigInteger.isBigInteger(d)) {
    throw new TypeError("Invalid private key");
  }

  function toString() {
    // todo, use PVT_K1_
    // return 'PVT_K1_' + keyUtils.checkEncode(toBuffer(), 'K1')
    return toWif();
  }

  function toWif() {
    var private_key = toBuffer();
    // checksum includes the version
    private_key = Buffer.concat([new Buffer([0x80]), private_key]);
    return keyUtils.checkEncode(private_key, "sha256x2");
  }

  var public_key = void 0;

  function toPublic() {
    if (public_key) {
      // cache
      // S L O W in the browser
      return public_key;
    }
    var Q = secp256k1.G.multiply(d);
    return public_key = PublicKey.fromPoint(Q);
  }

  function toBuffer() {
    return d.toBuffer(32);
  }

  function getSharedSecret(public_key) {
    public_key = PublicKey(public_key);
    var KB = public_key.toUncompressed().toBuffer();
    var KBP = Point.fromAffine(secp256k1, BigInteger.fromBuffer(KB.slice(1, 33)), // x
    BigInteger.fromBuffer(KB.slice(33, 65)) // y
    );
    var r = toBuffer();
    var P = KBP.multiply(BigInteger.fromBuffer(r));
    var S = P.affineX.toBuffer({ size: 32 });
    // SHA512 used in ECIES
    return hash.sha512(S);
  }

  function getChildKey(name) {
    var index = createHash("sha256").update(toBuffer()).update(name).digest();
    return PrivateKey(index);
  }

  function toHex() {
    return toBuffer().toString("hex");
  }

  return {
    d: d,
    toWif: toWif,
    toString: toString,
    toPublic: toPublic,
    toBuffer: toBuffer,
    getSharedSecret: getSharedSecret,
    getChildKey: getChildKey
  };
}

function parseKey(privateStr) {
  assert(typeof privateStr === "undefined" ? "undefined" : (0, _typeof3.default)(privateStr), "string", "privateStr");
  var match = privateStr.match(/^PVT_([A-Za-z0-9]+)_([A-Za-z0-9]+)$/);

  if (match === null) {
    // legacy WIF - checksum includes the version
    var versionKey = keyUtils.checkDecode(privateStr, "sha256x2");
    var version = versionKey.readUInt8(0);
    assert.equal(0x80, version, "Expected version " + 0x80 + ", instead got " + version);
    var _privateKey = PrivateKey.fromBuffer(versionKey.slice(1));
    var _keyType = "K1";
    var format = "WIF";
    return { privateKey: _privateKey, format: format, keyType: _keyType };
  }

  assert(match.length === 3, "Expecting private key like: PVT_K1_base58privateKey..");

  var _match = (0, _slicedToArray3.default)(match, 3),
      keyType = _match[1],
      keyString = _match[2];

  assert.equal(keyType, "K1", "K1 private key expected");
  var privateKey = PrivateKey.fromBuffer(keyUtils.checkDecode(keyString, keyType));
  return { privateKey: privateKey, format: "PVT", keyType: keyType };
}

PrivateKey.fromHex = function (hex) {
  return PrivateKey.fromBuffer(new Buffer(hex, "hex"));
};

PrivateKey.fromBuffer = function (buf) {
  if (!Buffer.isBuffer(buf)) {
    throw new Error("Expecting parameter to be a Buffer type");
  }
  if (buf.length === 33 && buf[32] === 1) {
    // remove compression flag
    buf = buf.slice(0, -1);
  }
  if (32 !== buf.length) {
    throw new Error("Expecting 32 bytes, instead got " + buf.length);
  }
  return PrivateKey(BigInteger.fromBuffer(buf));
};

PrivateKey.fromSeed = function (seed) {
  // generate_private_key
  if (!(typeof seed === "string")) {
    throw new Error("seed must be of type string");
  }
  return PrivateKey.fromBuffer(hash.sha256(seed));
};

PrivateKey.isWif = function (text) {
  try {
    assert(parseKey(text).format === "WIF");
    return true;
  } catch (e) {
    return false;
  }
};

PrivateKey.isValid = function (key) {
  try {
    PrivateKey(key);
    return true;
  } catch (e) {
    return false;
  }
};

PrivateKey.fromString = function (privateStr) {
  return parseKey(privateStr).privateKey;
};

PrivateKey.randomKey = function () {
  var cpuEntropyBits = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  return PrivateKey.initialize().then(function () {
    return PrivateKey.fromBuffer(keyUtils.random32ByteBuffer({ cpuEntropyBits: cpuEntropyBits }));
  });
};

PrivateKey.unsafeRandomKey = function () {
  return Promise.resolve(PrivateKey.fromBuffer(keyUtils.random32ByteBuffer({ safe: false })));
};

var initialized = false,
    unitTested = false;

function initialize() {
  if (initialized) {
    return;
  }

  unitTest();
  keyUtils.addEntropy.apply(keyUtils, (0, _toConsumableArray3.default)(keyUtils.cpuEntropy()));
  assert(keyUtils.entropyCount() >= 128, "insufficient entropy");

  initialized = true;
}

PrivateKey.initialize = promiseAsync(initialize);

/** @private */
var doesNotThrow = function doesNotThrow(cb, msg) {
  try {
    cb();
  } catch (error) {
    error.message = msg + " ==> " + error.message;
    throw error;
  }
};