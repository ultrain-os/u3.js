"use strict";

var Aes = require("./aes");
var PrivateKey = require("./key_private");
var PublicKey = require("./key_public");
var Signature = require("./signature");
var hash = require("./hash");
var assert = require("assert");
var isEmpty = require("lodash.isempty");
var isString = require("lodash.isstring");
var BIP39 = require("bip39");

/** @namespace */
var ecc = {

  initialize: PrivateKey.initialize,

  unsafeRandomKey: function unsafeRandomKey() {
    return PrivateKey.unsafeRandomKey().then(function (key) {
      return key.toString();
    });
  },

  randomKey: function randomKey(cpuEntropyBits) {
    return PrivateKey.randomKey(cpuEntropyBits).then(function (key) {
      return key.toString();
    });
  },

  seedPrivate: function seedPrivate(seed) {
    return PrivateKey.fromSeed(seed).toString();
  },

  /**
   * transfer private key to public key
   * @param wif
   * @returns {string}
   */
  privateToPublic: function privateToPublic(wif) {
    return PrivateKey(wif).toPublic().toString();
  },

  isValidPublic: function isValidPublic(pubkey) {
    return PublicKey.isValid(pubkey);
  },

  isValidPrivate: function isValidPrivate(wif) {
    return PrivateKey.isValid(wif);
  },

  sign: function sign(data, privateKey) {
    var encoding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "utf8";

    if (encoding === true) {
      throw new TypeError("API changed, use signHash(..) instead");
    } else {
      if (encoding === false) {
        console.log("Warning: ecc.sign hashData parameter was removed");
      }
    }
    return Signature.sign(data, privateKey, encoding).toString();
  },

  signHash: function signHash(dataSha256, privateKey) {
    var encoding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "hex";

    return Signature.signHash(dataSha256, privateKey, encoding).toString();
  },

  verify: function verify(signature, data, pubkey) {
    var encoding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "utf8";

    if (encoding === true) {
      throw new TypeError("API changed, use verifyHash(..) instead");
    } else {
      if (encoding === false) {
        console.log("Warning: ecc.verify hashData parameter was removed");
      }
    }
    signature = Signature.from(signature);
    return signature.verify(data, pubkey, encoding);
  },

  verifyHash: function verifyHash(signature, dataSha256, pubkey) {
    var encoding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "hex";

    signature = Signature.from(signature);
    return signature.verifyHash(dataSha256, pubkey, encoding);
  },


  recover: function recover(signature, data) {
    var encoding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "utf8";

    if (encoding === true) {
      throw new TypeError("API changed, use recoverHash(signature, data) instead");
    } else {
      if (encoding === false) {
        console.log("Warning: ecc.recover hashData parameter was removed");
      }
    }
    signature = Signature.from(signature);
    return signature.recover(data, encoding).toString();
  },

  recoverHash: function recoverHash(signature, dataSha256) {
    var encoding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "hex";

    signature = Signature.from(signature);
    return signature.recoverHash(dataSha256, encoding).toString();
  },

  sha256: function sha256(data) {
    var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "hex";
    return hash.sha256(data, encoding);
  },

  /**
   * generate key pair by seed
   * @param seed  a seed can regenerate the same key pair
   * @returns {{public_key: (*|string), private_key: *}}
   */
  generateKeyPairBySeed: function generateKeyPairBySeed(seed) {
    if (isEmpty(seed) || !isString(seed)) {
      assert.error("seed must a not empty string");
    }
    var wif = ecc.seedPrivate(seed);
    var pubkey = ecc.privateToPublic(wif);
    return {
      public_key: pubkey,
      private_key: wif
    };
  },

  /**
   * generate key pair with mnemonic
   * @returns {{mnemonic: *, public_key: (*|string), private_key: *}}
   */
  generateKeyPairWithMnemonic: function generateKeyPairWithMnemonic() {
    var mnemonic = BIP39.generateMnemonic();
    var seed = BIP39.mnemonicToSeed(mnemonic).toString("hex");
    var wif = ecc.seedPrivate(seed);
    var pubkey = ecc.privateToPublic(wif);
    return {
      mnemonic: mnemonic,
      public_key: pubkey,
      private_key: wif
    };
  },

  /**
   * regenerate key pair by mnemonic
   * @param mnemonic
   * @returns {{mnemonic: *, public_key: (*|string), private_key: *}}
   */
  generateKeyPairByMnemonic: function generateKeyPairByMnemonic(mnemonic) {
    var seed = BIP39.mnemonicToSeed(mnemonic).toString("hex");
    var wif = ecc.seedPrivate(seed);
    var pubkey = ecc.privateToPublic(wif);
    return {
      mnemonic: mnemonic,
      public_key: pubkey,
      private_key: wif
    };
  }
};

module.exports = ecc;