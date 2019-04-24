/* eslint-env mocha */
const assert = require('assert');
const Fcbuffer = require('fcbuffer');
const ByteBuffer = require('bytebuffer');

const {createU3,U3Utils} = require('../index');
const {PublicKey} = U3Utils.ecc;
const AssetCache = require('../src/asset-cache');
const defaultConfig = require("../src/config");

describe('shorthand', () => {

  it('authority', () => {
    const u3 = createcreatecreateU3();
    const { authority } = u3.fc.structs;

    const pubkey = 'UTR6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV';
    const auth = { threshold: 1, keys: [{ key: pubkey, weight: 1 }] };

    console.log(PublicKey.fromString(pubkey))

    assert.deepEqual(authority.fromObject(pubkey), auth);
    assert.deepEqual(
      authority.fromObject(auth),
      Object.assign({}, auth, { accounts: [], waits: [] })
    );
  });

  it('PublicKey sorting', () => {
    const u3 = createcreateU3();
    const { authority } = u3.fc.structs;

    const pubkeys = [
      'UTR7wBGPvBgRVa4wQN2zm5CjgBF6S7tP7R3JavtSa2unHUoVQGhey',
      'UTR6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV'
    ];

    const authSorted = {
      threshold: 1, keys: [
        { key: pubkeys[1], weight: 1 },
        { key: pubkeys[0], weight: 1 }
      ], accounts: [], waits: []
    };

    const authUnsorted = {
      threshold: 1, keys: [
        { key: pubkeys[0], weight: 1 },
        { key: pubkeys[1], weight: 1 }
      ], accounts: [], waits: []
    };

    // assert.deepEqual(authority.fromObject(pubkey), auth)
    assert.deepEqual(authority.fromObject(authUnsorted), authSorted);
  });

  it('public_key', () => {
    const u3 = createcreateU3();
    const { structs, types } = u3.fc;
    const PublicKeyType = types.public_key();
    const pubkey = 'UTR6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV';
    // 02c0ded2bc1f1305fb0faac5e6c03ee3a1924234985427b6167ca569d13df435cf
    assertSerializer(PublicKeyType, pubkey);
  });

  it('symbol', () => {
    const u3 = createcreateU3();
    const { types } = u3.fc;
    const Symbol = types.symbol();

    assertSerializer(Symbol, '4,' + defaultConfig.symbol, '4,' + defaultConfig.symbol, '' + defaultConfig.symbol);
  });

  it('extended_symbol', () => {
    const u3 = createU3({ defaults: true });
    const esType = u3.fc.types.extended_symbol();
    const esString = esType.toObject();
    assertSerializer(esType, esString);
  });

  it('asset', () => {
    const u3 = createcreateU3();
    const { types } = u3.fc;
    const AssetType = types.asset();
    assertSerializer(AssetType, '1.1 4,' + defaultConfig.symbol + '@utrio.token', '1.1000 ' + defaultConfig.symbol + '@utrio.token', '1.1000 ' + defaultConfig.symbol);
  });

  it('extended_asset', () => {
    const u3 = createcreateU3({ defaults: true });
    const eaType = u3.fc.types.extended_asset();
    const eaString = eaType.toObject();
    assertSerializer(eaType, eaString);
  });

  it('signature', () => {
    const u3 = createcreateU3();
    const { types } = u3.fc;
    const SignatureType = types.signature();
    const signatureString = 'SIG_K1_JwxtqesXpPdaZB9fdoVyzmbWkd8tuX742EQfnQNexTBfqryt2nn9PomT5xwsVnUB4m7KqTgTBQKYf2FTYbhkB5c7Kk9EsH';
    //const signatureString = 'SIG_K1_Jzdpi5RCzHLGsQbpGhndXBzcFs8vT5LHAtWLMxPzBdwRHSmJkcCdVu6oqPUQn1hbGUdErHvxtdSTS1YA73BThQFwV1v4G5'
    assertSerializer(SignatureType, signatureString);
  });

});

if (process.env['NODE_ENV'] === 'development') {

  describe('u3io Abi', () => {

    it('u3io token contract parses', (done) => {
      const u3 = createcreateU3();

      u3.contract('utrio.token', (error, utrio_token) => {
        assert(!error, error);
        assert(utrio_token.transfer, 'utrio.token contract');
        assert(utrio_token.issue, 'utrio.token contract');
        done();
      });
    });

  });
}

describe('Action.data', () => {
  it('json', () => {
    const u3 = createU3({ forceActionDataHex: false });
    const { structs, types } = u3.fc;
    const value = {
      account: 'utrio.token',
      name: 'transfer',
      data: {
        from: 'inita',
        to: 'initb',
        quantity: '1.0000 ' + defaultConfig.symbol,
        memo: ''
      },
      authorization: []
    };
    assertSerializer(structs.action, value);
  });

  it('force hex', () => {
    const u3 = createU3({ forceActionDataHex: true });
    const { structs, types } = u3.fc;
    const value = {
      account: 'utrio.token',
      name: 'transfer',
      data: {
        from: 'inita',
        to: 'initb',
        quantity: '1.0000 ' + defaultConfig.symbol,
        memo: ''
      },
      authorization: []
    };
    assertSerializer(structs.action, value, value);
  });

  it('unknown type', () => {
    const u3 = createU3({ forceActionDataHex: false });
    const { structs, types } = u3.fc;
    const value = {
      account: 'utrio.token',
      name: 'mytype',
      data: '030a0b0c',
      authorization: []
    };
    assertSerializer(structs.action, value);
  });
});

function assertSerializer(type, value, fromObjectResult = null, toObjectResult = fromObjectResult) {
  const obj = type.fromObject(value); // tests fromObject
  const buf = Fcbuffer.toBuffer(type, value); // tests appendByteBuffer
  const obj2 = Fcbuffer.fromBuffer(type, buf); // tests fromByteBuffer
  const obj3 = type.toObject(obj); // tests toObject

  if (!fromObjectResult && !toObjectResult) {
    assert.deepEqual(value, obj3, 'serialize object');
    assert.deepEqual(obj3, obj2, 'serialize buffer');
    return;
  }

  if (fromObjectResult) {
    assert(fromObjectResult, obj, 'fromObjectResult');
    assert(fromObjectResult, obj2, 'fromObjectResult');
  }

  if (toObjectResult) {
    assert(toObjectResult, obj3, 'toObjectResult');
  }
}
