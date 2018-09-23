'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = require('assert');

var _require = require('bytebuffer'),
    Long = _require.Long;

module.exports = {
  ULong: ULong,
  isName: isName,
  encodeName: encodeName, // encode human readable name to uint64 (number string)
  decodeName: decodeName, // decode from uint64 to human readable
  encodeNameEx: encodeNameEx,
  decodeNameEx: decodeNameEx,
  encodeNameHex: function encodeNameHex(name) {
    return Long.fromString(encodeName(name), true).toString(16);
  },
  decodeNameHex: function decodeNameHex(hex) {
    var littleEndian = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return decodeName(Long.fromString(hex, true, 16).toString(), littleEndian);
  },
  UDecimalString: UDecimalString,
  UDecimalPad: UDecimalPad,
  UDecimalImply: UDecimalImply,
  UDecimalUnimply: UDecimalUnimply,

  DecimalString: DecimalString,
  DecimalPad: DecimalPad,
  DecimalImply: DecimalImply,
  DecimalUnimply: DecimalUnimply,
  printAsset: printAsset,
  parseAsset: parseAsset,

  parseExtendedAsset: parseExtendedAsset
};

function ULong(value) {
  var unsigned = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

  if (typeof value === 'number') {
    // Some JSON libs use numbers for values under 53 bits or strings for larger.
    // Accomidate but double-check it..
    if (value > Number.MAX_SAFE_INTEGER) throw new TypeError('value parameter overflow');

    value = Long.fromString(String(value), unsigned, radix);
  } else if (typeof value === 'string') {
    value = Long.fromString(value, unsigned, radix);
  } else if (!Long.isLong(value)) {
    throw new TypeError('value parameter is a requied Long, Number or String');
  }
  return value;
}

function isName(str, err) {
  try {
    encodeName(str);
    return true;
  } catch (error) {
    if (err) {
      err(error);
    }
    return false;
  }
}

var charmap = '.12345abcdefghijklmnopqrstuvwxyz';
var charidx = function charidx(ch) {
  var idx = charmap.indexOf(ch);
  if (idx === -1) throw new TypeError('Invalid character: \'' + ch + '\'');

  return idx;
};

function encodeName(name) {
  var littleEndian = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (typeof name !== 'string') throw new TypeError('name parameter is a required string');

  if (name.length > 12) throw new TypeError('A name can be up to 12 characters long');

  var bitstr = '';
  for (var i = 0; i <= 12; i++) {
    // process all 64 bits (even if name is short)
    var c = i < name.length ? charidx(name[i]) : 0;
    var bitlen = i < 12 ? 5 : 4;
    var bits = Number(c).toString(2);
    if (bits.length > bitlen) {
      throw new TypeError('Invalid name ' + name);
    }
    bits = '0'.repeat(bitlen - bits.length) + bits;
    bitstr += bits;
  }

  var value = Long.fromString(bitstr, true, 2);

  // convert to LITTLE_ENDIAN
  var leHex = '';
  var bytes = littleEndian ? value.toBytesLE() : value.toBytesBE();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = bytes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var b = _step.value;

      var n = Number(b).toString(16);
      leHex += (n.length === 1 ? '0' : '') + n;
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

  var ulName = Long.fromString(leHex, true, 16).toString();

  // console.log('encodeName', name, value.toString(), ulName.toString(), JSON.stringify(bitstr.split(/(.....)/).slice(1)))

  return ulName.toString();
}

function decodeName(value) {
  var littleEndian = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  value = ULong(value);

  // convert from LITTLE_ENDIAN
  var beHex = '';
  var bytes = littleEndian ? value.toBytesLE() : value.toBytesBE();
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = bytes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var b = _step2.value;

      var n = Number(b).toString(16);
      beHex += (n.length === 1 ? '0' : '') + n;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  beHex += '0'.repeat(16 - beHex.length);

  var fiveBits = Long.fromNumber(0x1f, true);
  var fourBits = Long.fromNumber(0x0f, true);
  var beValue = Long.fromString(beHex, true, 16);

  var str = '';
  var tmp = beValue;

  for (var i = 0; i <= 12; i++) {
    var c = charmap[tmp.and(i === 0 ? fourBits : fiveBits)];
    str = c + str;
    tmp = tmp.shiftRight(i === 0 ? 4 : 5);
  }
  str = str.replace(/\.+$/, ''); // remove trailing dots (all of them)

  return str;
}

var NameExMapStr = '._0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
var NameExIndex = function NameExIndex(ch) {
  var idx = NameExMapStr.indexOf(ch);
  if (idx === -1) throw new TypeError('Invalid character for NameEx: \'' + ch + '\'');

  return idx;
};

function encodeNameEx(name) {
  var littleEndian = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (typeof name !== 'string') throw new TypeError('name parameter is a required string');

  if (name.length > 21) throw new TypeError('A name_ex can be up to 21 characters long');

  var convert = function convert(str) {
    var value = Long.fromString(str, true, 2);

    // convert to LITTLE_ENDIAN
    var leHex = '';
    var bytes = littleEndian ? value.toBytesLE() : value.toBytesBE();
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = bytes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var b = _step3.value;

        var n = Number(b).toString(16);
        leHex += (n.length === 1 ? '0' : '') + n;
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    var ulName = Long.fromString(leHex, true, 16).toString();

    // console.log('encodeName', name, value.toString(), ulName.toString(), JSON.stringify(bitstr.split(/(.....)/).slice(1)))

    return ulName.toString();
  };

  var bitstr = '';
  var result = {};

  for (var i = 0; i <= 20; i++) {
    // process all 64 bits (even if name is short)
    var c = i < name.length ? NameExIndex(name[i]) : 0;
    var bitlen = 6;
    var bits = Number(c).toString(2);
    if (bits.length > bitlen) {
      throw new TypeError('Invalid name_ex ' + name);
    }
    bits = '0'.repeat(bitlen - bits.length) + bits;

    if (i <= 9) {
      bitstr = bits + bitstr;
    } else if (i == 10) {
      var lowFourBits = bits.substring(2); // low four bits
      bitstr = lowFourBits + bitstr;
      result.valL = convert(bitstr);

      bitstr = bits.substring(0, 2); // up two bits
    } else {
      bitstr = bits + bitstr;
    }
  }

  result.valH = convert(bitstr);
  return result;
}

function decodeNameEx(valueH, valueL) {
  var littleEndian = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var convert = function convert(value) {
    value = ULong(value);

    // convert from LITTLE_ENDIAN
    var beHex = '';
    var bytes = littleEndian ? value.toBytesLE() : value.toBytesBE();
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = bytes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var b = _step4.value;

        var n = Number(b).toString(16);
        beHex += (n.length === 1 ? '0' : '') + n;
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    beHex += '0'.repeat(16 - beHex.length);

    var beValue = Long.fromString(beHex, true, 16);

    return beValue;
  };

  var sixBits = Long.fromNumber(0x3f, true);
  var twoBits = Long.fromNumber(0x3, true);

  var str = '';
  var tmpH = convert(valueH);
  var tmpL = convert(valueL);

  for (var i = 0; i <= 20; i++) {
    var c = '';
    if (i <= 9) {
      c = NameExMapStr[tmpL.and(sixBits)];
      tmpL = tmpL.shiftRight(6);
    } else if (i == 10) {
      var htb = tmpH.and(twoBits);
      htb = htb.shiftLeft(4);
      htb = htb.and(tmpL);

      c = NameExMapStr[htb];
      tmpH = tmpH.shiftRight(2);
    } else {
      c = NameExMapStr[tmpH.and(sixBits)];
      tmpH = tmpH.shiftRight(6);
    }
    str = str + c;
  }
  str = str.replace(/\.+$/, ''); // remove trailing dots (all of them)

  return str;
}

function UDecimalString(value) {
  assert(value != null, 'value is required');
  value = value === 'object' && value.toString ? value.toString() : String(value);

  if (value[0] === '.') {
    value = '0' + value;
  }

  var part = value.split('.');
  assert(part.length <= 2, 'invalid decimal ' + value);
  assert(/^\d+(,?\d)*\d*$/.test(part[0]), 'invalid decimal ' + value);

  if (part.length === 2) {
    assert(/^\d*$/.test(part[1]), 'invalid decimal ' + value);
    part[1] = part[1].replace(/0+$/, ''); // remove suffixing zeros
    if (part[1] === '') {
      part.pop();
    }
  }

  part[0] = part[0].replace(/^0*/, ''); // remove leading zeros
  if (part[0] === '') {
    part[0] = '0';
  }
  return part.join('.');
}

function UDecimalPad(num, precision) {
  var value = UDecimalString(num);
  if (precision == null) {
    return num;
  }

  assert(precision >= 0 && precision <= 18, 'Precision should be 18 characters or less');

  var part = value.split('.');

  if (precision === 0 && part.length === 1) {
    return part[0];
  }

  if (part.length === 1) {
    return part[0] + '.' + '0'.repeat(precision);
  } else {
    var pad = precision - part[1].length;
    assert(pad >= 0, 'decimal \'' + value + '\' exceeds precision ' + precision);
    return part[0] + '.' + part[1] + '0'.repeat(pad);
  }
}

/** Ensures proper trailing zeros then removes decimal place. */
function UDecimalImply(value, precision) {
  return UDecimalPad(value, precision).replace('.', '');
}

function UDecimalUnimply(value, precision) {
  assert(value != null, 'value is required');
  value = value === 'object' && value.toString ? value.toString() : String(value);
  assert(/^\d+$/.test(value), 'invalid whole number ' + value);
  assert(precision != null, 'precision required');
  assert(precision >= 0 && precision <= 18, 'Precision should be 18 characters or less');

  // Ensure minimum length
  var pad = precision - value.length;
  if (pad > 0) {
    value = '' + '0'.repeat(pad) + value;
  }

  var dotIdx = value.length - precision;
  value = value.slice(0, dotIdx) + '.' + value.slice(dotIdx);
  return UDecimalPad(value, precision); // Normalize
}

function parseExtendedAsset(str) {
  var _str$split = str.split(' '),
      _str$split2 = (0, _slicedToArray3.default)(_str$split, 1),
      amountRaw = _str$split2[0];

  var amountMatch = amountRaw.match(/^([0-9]+(\.[0-9]+)?)( |$)/);
  var amount = amountMatch ? amountMatch[1] : null;

  var precisionMatch = str.match(/(^| )([0-9]+),([A-Z]+)(@|$)/);
  var precision = precisionMatch ? Number(precisionMatch[2]) : null;

  var symbolMatch = str.match(/(^| |,)([A-Z]+)(@|$)/);
  var symbol = symbolMatch ? symbolMatch[2] : null;

  var _str$split3 = str.split('@'),
      _str$split4 = (0, _slicedToArray3.default)(_str$split3, 2),
      contractRaw = _str$split4[1];

  var contract = /^[a-z0-5]+(\.[a-z0-5]+)*$/.test(contractRaw) ? contractRaw : null;

  var join = function join(e1, e2) {
    return e1 == null ? '' : e2 == null ? '' : e1 + e2;
  };
  var asset = join(precision, ',') + symbol;
  var check = join(amount, ' ') + asset + join('@', contract);
  assert.equal(str, check, 'Invalid extended asset string: ' + str + ' !== ' + check);

  if (precision != null) {
    assert(precision >= 0 && precision <= 18, 'Precision should be 18 characters or less');
  }
  if (symbol != null) {
    assert(symbol.length <= 7, 'Asset symbol is 7 characters or less');
  }
  if (contract != null) {
    assert(contract.length <= 12, 'Contract is 12 characters or less');
  }

  var extendedAsset = join(symbol, '') + join('@', contract);
  return { amount: amount, precision: precision, symbol: symbol, contract: contract };
}

/**
 Normalize and validate decimal string (potentially large values).  Should
 avoid internationalization issues if possible but will be safe and
 throw an error for an invalid number.
 Normalization removes extra zeros or decimal.
 @return {string} value
 */
function DecimalString(value) {
  assert(value != null, 'value is required');
  value = value === 'object' && value.toString ? value.toString() : String(value);

  var neg = /^-/.test(value);
  if (neg) {
    value = value.substring(1);
  }

  if (value[0] === '.') {
    value = '0' + value;
  }

  var part = value.split('.');
  assert(part.length <= 2, 'invalid decimal ' + value);
  assert(/^\d+(,?\d)*\d*$/.test(part[0]), 'invalid decimal ' + value);

  if (part.length === 2) {
    assert(/^\d*$/.test(part[1]), 'invalid decimal ' + value);
    part[1] = part[1].replace(/0+$/, ''); // remove suffixing zeros
    if (part[1] === '') {
      part.pop();
    }
  }

  part[0] = part[0].replace(/^0*/, ''); // remove leading zeros
  if (part[0] === '') {
    part[0] = '0';
  }
  return (neg ? '-' : '') + part.join('.');
}

/**
 Ensure a fixed number of decimal places.  Safe for large numbers.
 @see ./format.test.js
 @example DecimalPad(10.2, 3) === '10.200'
 @arg {number|string|object.toString} num
 @arg {number} [precision = null] - number of decimal places.  Null skips
 padding suffix but still applies number format normalization.
 @return {string} decimal part is added and zero padded to match precision
 */
function DecimalPad(num, precision) {
  var value = DecimalString(num);
  if (precision == null) {
    return value;
  }

  assert(precision >= 0 && precision <= 18, 'Precision should be 18 characters or less');

  var part = value.split('.');

  if (precision === 0 && part.length === 1) {
    return part[0];
  }

  if (part.length === 1) {
    return part[0] + '.' + '0'.repeat(precision);
  } else {
    var pad = precision - part[1].length;
    assert(pad >= 0, 'decimal \'' + value + '\' exceeds precision ' + precision);
    return part[0] + '.' + part[1] + '0'.repeat(pad);
  }
}

/** Ensures proper trailing zeros then removes decimal place. */
function DecimalImply(value, precision) {
  return DecimalPad(value, precision).replace('.', '');
}

/**
 Put the decimal place back in its position and return the normalized number
 string (with any unnecessary zeros or an unnecessary decimal removed).
 @arg {string|number|value.toString} value 10000
 @arg {number} precision 4
 @return {number} 1.0000
 */
function DecimalUnimply(value, precision) {
  assert(value != null, 'value is required');
  value = value === 'object' && value.toString ? value.toString() : String(value);
  var neg = /^-/.test(value);
  if (neg) {
    value = value.substring(1);
  }
  assert(/^\d+$/.test(value), 'invalid whole number ' + value);
  assert(precision != null, 'precision required');
  assert(precision >= 0 && precision <= 18, 'Precision should be 18 characters or less');

  // Ensure minimum length
  var pad = precision - value.length;
  if (pad > 0) {
    value = '' + '0'.repeat(pad) + value;
  }

  var dotIdx = value.length - precision;
  value = value.slice(0, dotIdx) + '.' + value.slice(dotIdx);
  return (neg ? '-' : '') + DecimalPad(value, precision); // Normalize
}

/** @private for now, support for asset strings is limited
 */
function printAsset(_ref) {
  var amount = _ref.amount,
      precision = _ref.precision,
      symbol = _ref.symbol,
      contract = _ref.contract;

  assert.equal(typeof symbol === 'undefined' ? 'undefined' : (0, _typeof3.default)(symbol), 'string', 'symbol is a required string');

  if (amount != null && precision != null) {
    amount = DecimalPad(amount, precision);
  }

  var join = function join(e1, e2) {
    return e1 == null ? '' : e2 == null ? '' : e1 + e2;
  };

  if (amount != null) {
    // the amount contains the precision
    return join(amount, ' ') + symbol + join('@', contract);
  }

  return join(precision, ',') + symbol + join('@', contract);
}

/**
 Attempts to parse all forms of the asset strings (symbol, asset, or extended
 versions).  If the provided string contains any additional or appears to have
 invalid information an error is thrown.
 @return {object} {amount, precision, symbol, contract}
 @throws AssertionError
 */
function parseAsset(str) {
  var _str$split5 = str.split(' '),
      _str$split6 = (0, _slicedToArray3.default)(_str$split5, 1),
      amountRaw = _str$split6[0];

  var amountMatch = amountRaw.match(/^(-?[0-9]+(\.[0-9]+)?)( |$)/);
  var amount = amountMatch ? amountMatch[1] : null;

  var precisionMatch = str.match(/(^| )([0-9]+),([A-Z]+)(@|$)/);
  var precisionSymbol = precisionMatch ? Number(precisionMatch[2]) : null;
  var precisionAmount = amount ? (amount.split('.')[1] || '').length : null;
  var precision = precisionSymbol != null ? precisionSymbol : precisionAmount;

  var symbolMatch = str.match(/(^| |,)([A-Z]+)(@|$)/);
  var symbol = symbolMatch ? symbolMatch[2] : null;

  var _str$split7 = str.split('@'),
      _str$split8 = (0, _slicedToArray3.default)(_str$split7, 2),
      _str$split8$ = _str$split8[1],
      contractRaw = _str$split8$ === undefined ? '' : _str$split8$;

  var contract = /^[a-z0-5]+(\.[a-z0-5]+)*$/.test(contractRaw) ? contractRaw : null;

  var check = printAsset({ amount: amount, precision: precision, symbol: symbol, contract: contract });

  assert.equal(str, check, 'Invalid asset string: ' + str + ' !== ' + check);

  if (precision != null) {
    assert(precision >= 0 && precision <= 18, 'Precision should be 18 characters or less');
  }
  if (symbol != null) {
    assert(symbol.length <= 7, 'Asset symbol is 7 characters or less');
  }
  if (contract != null) {
    assert(contract.length <= 12, 'Contract is 12 characters or less');
  }

  return { amount: amount, precision: precision, symbol: symbol, contract: contract };
}