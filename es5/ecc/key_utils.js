"use strict";

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var base58 = require("bs58");
var assert = require("assert");
var randomBytes = require("randombytes");

var hash = require("./hash");

module.exports = {
  random32ByteBuffer: random32ByteBuffer,
  addEntropy: addEntropy,
  cpuEntropy: cpuEntropy,
  entropyCount: function entropyCount() {
    return _entropyCount;
  },
  checkDecode: checkDecode,
  checkEncode: checkEncode
};

var entropyPos = 0,
    _entropyCount = 0;

var externalEntropyArray = randomBytes(101);

function random32ByteBuffer() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$cpuEntropyBits = _ref.cpuEntropyBits,
      cpuEntropyBits = _ref$cpuEntropyBits === undefined ? 0 : _ref$cpuEntropyBits,
      _ref$safe = _ref.safe,
      safe = _ref$safe === undefined ? true : _ref$safe;

  assert(typeof cpuEntropyBits === "undefined" ? "undefined" : (0, _typeof3.default)(cpuEntropyBits), "number", "cpuEntropyBits");
  assert(typeof safe === "undefined" ? "undefined" : (0, _typeof3.default)(safe), "boolean", "boolean");

  if (safe) {
    assert(_entropyCount >= 128, "Call initialize() to add entropy");
  }
  var hash_array = [];
  hash_array.push(randomBytes(32));
  hash_array.push(Buffer.from(cpuEntropy(cpuEntropyBits)));
  hash_array.push(externalEntropyArray);
  hash_array.push(browserEntropy());
  return hash.sha256(Buffer.concat(hash_array));
}

function addEntropy() {
  assert.equal(externalEntropyArray.length, 101, "externalEntropyArray");

  for (var _len = arguments.length, ints = Array(_len), _key = 0; _key < _len; _key++) {
    ints[_key] = arguments[_key];
  }

  _entropyCount += ints.length;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = ints[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;

      var pos = entropyPos++ % 101;
      var i2 = externalEntropyArray[pos] += i;
      if (i2 > 9007199254740991) externalEntropyArray[pos] = 0;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function cpuEntropy() {
  var cpuEntropyBits = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 128;

  var collected = [];
  var lastCount = null;
  var lowEntropySamples = 0;
  while (collected.length < cpuEntropyBits) {
    var count = floatingPointCount();
    if (lastCount != null) {
      var delta = count - lastCount;
      if (Math.abs(delta) < 1) {
        lowEntropySamples++;
        continue;
      }
      // how many bits of entropy were in this sample
      var bits = Math.floor(log2(Math.abs(delta)) + 1);
      if (bits < 4) {
        if (bits < 2) {
          lowEntropySamples++;
        }
        continue;
      }
      collected.push(delta);
    }
    lastCount = count;
  }
  if (lowEntropySamples > 10) {
    var pct = Number(lowEntropySamples / cpuEntropyBits * 100).toFixed(2);
    // Is this algorithm getting inefficient?
    console.warn("WARN: " + pct + "% low CPU entropy re-sampled");
  }
  return collected;
}

function floatingPointCount() {
  var workMinMs = 7;
  var d = Date.now();
  var i = 0,
      x = 0;
  while (Date.now() < d + workMinMs + 1) {
    x = Math.sin(Math.sqrt(Math.log(++i + x)));
  }
  return i;
}

var log2 = function log2(x) {
  return Math.log(x) / Math.LN2;
};

function browserEntropy() {
  var entropyStr = Array(randomBytes(101)).join();
  try {
    entropyStr += new Date().toString() + " " + window.screen.height + " " + window.screen.width + " " + window.screen.colorDepth + " " + " " + window.screen.availHeight + " " + window.screen.availWidth + " " + window.screen.pixelDepth + navigator.language + " " + window.location + " " + window.history.length;

    for (var i = 0, mimeType; i < navigator.mimeTypes.length; i++) {
      mimeType = navigator.mimeTypes[i];
      entropyStr += mimeType.description + " " + mimeType.type + " " + mimeType.suffixes + " ";
    }
  } catch (error) {
    //nodejs:ReferenceError: window is not defined
    entropyStr += hash.sha256(new Date().toString());
  }

  var b = new Buffer(entropyStr);
  entropyStr += b.toString("binary") + " " + new Date().toString();

  var entropy = entropyStr;
  var start_t = Date.now();
  while (Date.now() - start_t < 25) {
    entropy = hash.sha256(entropy);
  }return entropy;
}

function checkEncode(keyBuffer) {
  var keyType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  assert(Buffer.isBuffer(keyBuffer), "expecting keyBuffer<Buffer>");
  if (keyType === "sha256x2") {
    // legacy
    var checksum = hash.sha256(hash.sha256(keyBuffer)).slice(0, 4);
    return base58.encode(Buffer.concat([keyBuffer, checksum]));
  } else {
    var check = [keyBuffer];
    if (keyType) {
      check.push(Buffer.from(keyType));
    }
    var _checksum = hash.ripemd160(Buffer.concat(check)).slice(0, 4);
    return base58.encode(Buffer.concat([keyBuffer, _checksum]));
  }
}

function checkDecode(keyString) {
  var keyType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  assert(keyString != null, "private key expected");
  var buffer = new Buffer(base58.decode(keyString));
  var checksum = buffer.slice(-4);
  var key = buffer.slice(0, -4);

  var newCheck = void 0;
  if (keyType === "sha256x2") {
    // legacy
    newCheck = hash.sha256(hash.sha256(key)).slice(0, 4); // WIF (legacy)
  } else {
    var check = [key];
    if (keyType) {
      check.push(Buffer.from(keyType));
    }
    newCheck = hash.ripemd160(Buffer.concat(check)).slice(0, 4); //PVT
  }

  if (checksum.toString() !== newCheck.toString()) {
    throw new Error("Invalid checksum, " + (checksum.toString("hex") + " != " + newCheck.toString("hex")));
  }

  return key;
}