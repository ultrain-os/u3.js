'use strict';

var randomBytes = require('randombytes');
var ByteBuffer = require('bytebuffer');
var crypto = require('browserify-aes');
var assert = require('assert');
var PublicKey = require('./key_public');
var PrivateKey = require('./key_private');
var hash = require('./hash');

var Long = ByteBuffer.Long;

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt
};

function encrypt(private_key, public_key, message) {
    var nonce = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : uniqueNonce();

    return crypt(private_key, public_key, nonce, message);
}

function decrypt(private_key, public_key, nonce, message, checksum) {
    return crypt(private_key, public_key, nonce, message, checksum).message;
}

function crypt(private_key, public_key, nonce, message, checksum) {
    private_key = PrivateKey(private_key);
    if (!private_key) throw new TypeError('private_key is required');

    public_key = PublicKey(public_key);
    if (!public_key) throw new TypeError('public_key is required');

    nonce = toLongObj(nonce);
    if (!nonce) throw new TypeError('nonce is required');

    if (!Buffer.isBuffer(message)) {
        if (typeof message !== 'string') throw new TypeError('message should be buffer or string');
        message = new Buffer(message, 'binary');
    }
    if (checksum && typeof checksum !== 'number') throw new TypeError('checksum should be a number');

    var S = private_key.getSharedSecret(public_key);
    var ebuf = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
    ebuf.writeUint64(nonce);
    ebuf.append(S.toString('binary'), 'binary');
    ebuf = new Buffer(ebuf.copy(0, ebuf.offset).toBinary(), 'binary');
    var encryption_key = hash.sha512(ebuf);

    // D E B U G
    // console.log('crypt', {
    //     priv_to_pub: private_key.toPublic().toString(),
    //     pub: public_key.toString(),
    //     nonce: nonce.toString(),
    //     message: message.length,
    //     checksum,
    //     S: S.toString('hex'),
    //     encryption_key: encryption_key.toString('hex'),
    // })

    var iv = encryption_key.slice(32, 48);
    var key = encryption_key.slice(0, 32);

    // check is first 64 bit of sha256 hash treated as uint64_t truncated to 32 bits.
    var check = hash.sha256(encryption_key);
    check = check.slice(0, 4);
    var cbuf = ByteBuffer.fromBinary(check.toString('binary'), ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
    check = cbuf.readUint32();

    if (checksum) {
        if (check !== checksum) throw new Error('Invalid key');
        message = cryptoJsDecrypt(message, key, iv);
    } else {
        message = cryptoJsEncrypt(message, key, iv);
    }
    return { nonce: nonce, message: message, checksum: check };
}

function cryptoJsDecrypt(message, key, iv) {
    assert(message, "Missing cipher text");
    message = toBinaryBuffer(message);
    var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    // decipher.setAutoPadding(true)
    message = Buffer.concat([decipher.update(message), decipher.final()]);
    return message;
}

function cryptoJsEncrypt(message, key, iv) {
    assert(message, "Missing plain text");
    message = toBinaryBuffer(message);
    var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    // cipher.setAutoPadding(true)
    message = Buffer.concat([cipher.update(message), cipher.final()]);
    return message;
}

function uniqueNonce() {
    if (unique_nonce_entropy === null) {
        var b = new Uint8Array(randomBytes(2));
        unique_nonce_entropy = parseInt(b[0] << 8 | b[1], 10);
    }
    var long = Long.fromNumber(Date.now());
    var entropy = ++unique_nonce_entropy % 0xFFFF;
    // console.log('uniqueNonce date\t', ByteBuffer.allocate(8).writeUint64(long).toHex(0))
    // console.log('uniqueNonce entropy\t', ByteBuffer.allocate(8).writeUint64(Long.fromNumber(entropy)).toHex(0))
    long = long.shiftLeft(16).or(Long.fromNumber(entropy));
    // console.log('uniqueNonce final\t', ByteBuffer.allocate(8).writeUint64(long).toHex(0))
    return long.toString();
}
var unique_nonce_entropy = null;
// for(let i=1; i < 10; i++) key.uniqueNonce()

var toLongObj = function toLongObj(o) {
    return o ? Long.isLong(o) ? o : Long.fromString(o) : o;
};
var toBinaryBuffer = function toBinaryBuffer(o) {
    return o ? Buffer.isBuffer(o) ? o : new Buffer(o, 'binary') : o;
};