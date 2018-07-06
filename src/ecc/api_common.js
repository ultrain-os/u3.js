const Aes = require("./aes");
const PrivateKey = require("./key_private");
const PublicKey = require("./key_public");
const Signature = require("./signature");
const key_utils = require("./key_utils");
const hash = require("./hash");

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
   * @param wif
   * @returns {string}
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

  verifyHash (signature, dataSha256, pubkey, encoding = "hex") {
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

  sha256: (data, encoding = "hex") => hash.sha256(data, encoding)
};

module.exports = ecc;
