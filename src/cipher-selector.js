var selectCipherType = (function() {
    let initialized = false;
    let Cipher = {};
    return function(cipher_type) {
        if (!initialized) {
            const U3Utils = require('u3-utils');
            if (cipher_type === 'ecc') {
                Cipher = {
                    PrivateKey: U3Utils.ecc.PrivateKey,
                    PublicKey: U3Utils.ecc.PublicKey,
                    Signature: U3Utils.ecc.Signature,
                    sha256: U3Utils.ecc.sha256,
                    seedPrivate: U3Utils.ecc.seedPrivate,
                    privateToPublic: U3Utils.ecc.privateToPublic,
                    isValidPrivate: U3Utils.ecc.isValidPrivate,
                    isValidPublic: U3Utils.ecc.isValidPublic,
                    sign: U3Utils.ecc.sign,
                    verify: U3Utils.ecc.verify,
                    generateKeyPairByMnemonic: U3Utils.ecc.generateKeyPairByMnemonic,
                    generateKeyPairBySeed: U3Utils.ecc.generateKeyPairBySeed,
                    generateKeyPairWithMnemonic: U3Utils.ecc.generateKeyPairWithMnemonic,
                }
            } else if (cipher_type === 'gm') {
                Cipher = {
                    PrivateKey: U3Utils.gm.PrivateKey,
                    PublicKey: U3Utils.gm.PublicKey,
                    Signature: U3Utils.gm.Signature,
                    sha256: U3Utils.gm.sha256,
                    seedPrivate: U3Utils.gm.seedPrivate,
                    privateToPublic: U3Utils.gm.privateToPublic,
                    isValidPrivate: U3Utils.gm.isValidPrivate,
                    isValidPublic: U3Utils.gm.isValidPublic,
                    sign: U3Utils.gm.signHash,
                    verify: U3Utils.gm.verify,
                    verifyHash: U3Utils.gm.verifyHash,
                    generateKeyPairByMnemonic: U3Utils.gm.generateKeyPairByMnemonic,
                    generateKeyPairBySeed: U3Utils.gm.generateKeyPairBySeed,
                    generateKeyPairWithMnemonic: U3Utils.gm.generateKeyPairWithMnemonic,
                }
            } else {
                throw new Error('U3 only support "ecc" or "gm" by now, please correct cipher-type');
            }
            initialized = true;
        }
        return Cipher;
    }
})();

module.exports = selectCipherType;
