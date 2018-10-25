const Aes = require("./aes");
const PrivateKey = require("./key_private");
const PublicKey = require("./key_public");
const Signature = require("./signature");
const hash = require("./hash");
const assert = require("assert");
const isEmpty = require("lodash.isempty");
const isString = require("lodash.isstring");
const BIP39 = require("bip39");

/** @namespace */
const ecc = {

  initialize: PrivateKey.initialize,

  unsafeRandomKey: () => (
    PrivateKey.unsafeRandomKey().then(key => key.toString())
  ),

  randomKey: (cpuEntropyBits) => (
    PrivateKey.randomKey(cpuEntropyBits).then(key => key.toString())
  ),

  seedPrivate: seed => PrivateKey.fromSeed(seed).toString(),

  /**
   * transfer private key to public key
   * @param { String } wif private key
   * @returns {string}
   * 
   * @example
   * import {privateToPublic} from "u3.js/src";
   * const u3 = createU3(config)
   * u3.privateToPublic({
    "wif": "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"
   * })
   */
  privateToPublic: wif => PrivateKey(wif).toPublic().toString(),

  isValidPublic: (pubkey) => PublicKey.isValid(pubkey),

  isValidPrivate: (wif) => PrivateKey.isValid(wif),

  sign: (data, privateKey, encoding = "utf8") => {
    if (encoding === true) {
      throw new TypeError("API changed, use signHash(..) instead");
    } else {
      if (encoding === false) {
        console.log("Warning: ecc.sign hashData parameter was removed");
      }
    }
    return Signature.sign(data, privateKey, encoding).toString();
  },

  signHash: (dataSha256, privateKey, encoding = "hex") => {
    return Signature.signHash(dataSha256, privateKey, encoding).toString();
  },

  verify: (signature, data, pubkey, encoding = "utf8") => {
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

  verifyHash(signature, dataSha256, pubkey, encoding = "hex") {
    signature = Signature.from(signature);
    return signature.verifyHash(dataSha256, pubkey, encoding);
  },

  recover: (signature, data, encoding = "utf8") => {
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

  recoverHash: (signature, dataSha256, encoding = "hex") => {
    signature = Signature.from(signature);
    return signature.recoverHash(dataSha256, encoding).toString();
  },

  sha256: (data, encoding = "hex") => hash.sha256(data, encoding),

  /**
   * generate key pair by seed
   * @param { String } seed  a seed can regenerate the same key pair
   * @returns {{public_key: (*|string), private_key: *}}
   * @example
   * import {generateKeyPairBySeed} from "u3.js/src";
   * const u3 = createU3(config)
   * u3.generateKeyPairBySeed({
    "seed": "ultrain12345"
   * })
   */
  generateKeyPairBySeed: (seed) => {
    if (isEmpty(seed) || !isString(seed)) {
      assert.error("seed must a not empty string");
    }
    const wif = ecc.seedPrivate(seed);
    const pubkey = ecc.privateToPublic(wif);
    return {
      public_key: pubkey,
      private_key: wif
    };
  },

  /**
   * generate key pair with mnemonic
   * @returns {{mnemonic: *, public_key: (*|string), private_key: *}}
   */
  generateKeyPairWithMnemonic: () => {
    const mnemonic = BIP39.generateMnemonic();
    const seed = BIP39.mnemonicToSeed(mnemonic).toString("hex");
    const wif = ecc.seedPrivate(seed);
    const pubkey = ecc.privateToPublic(wif);
    return {
      mnemonic: mnemonic,
      public_key: pubkey,
      private_key: wif
    };
  },

  /**
   * regenerate key pair by mnemonic
   * @param { String } mnemonic words that help memory
   * @example
   * import {generateKeyPairByMnemonic} from "u3.js/src";
   * const u3 = createU3(config)
   * u3.generateKeyPairByMnemonic({
    "mnemonic": "ben john tony jack bob tom jerry alice"
   * })
   */
  generateKeyPairByMnemonic: (mnemonic) => {
    const seed = BIP39.mnemonicToSeed(mnemonic).toString("hex");
    const wif = ecc.seedPrivate(seed);
    const pubkey = ecc.privateToPublic(wif);
    return {
      mnemonic: mnemonic,
      public_key: pubkey,
      private_key: wif
    };
  }
};

module.exports = ecc;
