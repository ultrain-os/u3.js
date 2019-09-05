const assert = require('assert');
const isEmpty = require('lodash.isempty');
const isString = require('lodash.isstring');
const fs = require('fs');
const path = require('path');
const defaultConfig = require('../src/config');
const { createU3, format, U3Utils, listener } = require('../');

const readKeysFromFiles = () => {
  let accounts = ['ben', 'john', 'tony', 'jack', 'bob', 'tom', 'jerry', 'alice'];
  let keys = [];
  for (let a in accounts) {
    const data = fs.readFileSync(path.resolve(__dirname, '../src/scratch/' + accounts[a]));
    keys[accounts[a]] = JSON.parse(data.toString());
  }
  return keys;
};

function randomString(length = 8, charset = 'abcdefghijklmnopqrstuvwxyz') {
  let text = '';
  for (let i = 0; i < length; i++)
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  return text;
}

const randomName = () => {
  return randomString(12, '12345abcdefghijklmnopqrstuvwxyz');
};
const randomAsset = () => {
  return randomString().toUpperCase().substring(0, 4);
};

const users = readKeysFromFiles();
const customCurrency = randomAsset();

const account1 = 'ben';
const account2 = 'bob';
const account3 = 'tony';
const account1_pk = users[account1].private_key;
const account2_pk = users[account2].private_key;
const account3_pk = users[account3].private_key;

describe('u3.js', () => {

  // 1. chain info
  describe('chainInfo', () => {
    it('chainInfo', async () => {
      const u3 = createU3();
      await u3.getChainInfo();
    });
  });

  // 2. U3Utils.ecc utils
  describe('offline', () => {

    // 2.1 generate key pair by seed
    it('generateKeyPairBySeed', function() {
      let seed = randomName();
      let keys = U3Utils.ecc.generateKeyPairBySeed(seed);
      assert.equal(U3Utils.ecc.isValidPrivate(keys.private_key), true);
      assert.equal(U3Utils.ecc.isValidPublic(keys.public_key), true);
    });

    // 2.2 re-generate key pair by the same seed
    it('generateKeyPairBySeed(same keys with same seed)', function() {
      let seed = randomName();
      let keys1 = U3Utils.ecc.generateKeyPairBySeed(seed);
      let keys2 = U3Utils.ecc.generateKeyPairBySeed(seed);
      assert.equal(keys1.public_key, keys2.public_key);
      assert.equal(keys1.private_key, keys2.private_key);
    });

    // 2.3 generate key pair with mnemonic
    it('generateKeyPairWithMnemonic', function() {
      let result = U3Utils.ecc.generateKeyPairWithMnemonic();
      assert.ok((isString(result.mnemonic) && !isEmpty(result.mnemonic)), true);
      assert.equal(U3Utils.ecc.isValidPrivate(result.private_key), true);
      assert.equal(U3Utils.ecc.isValidPublic(result.public_key), true);
    });

    // 2.4 re-generate key pair by the same mnemonic
    it('generateKeyPairByMnemonic(same mnemonic same key pair)', function() {
      let result = U3Utils.ecc.generateKeyPairWithMnemonic();
      let result2 = U3Utils.ecc.generateKeyPairByMnemonic(result.mnemonic);
      assert.equal(result.public_key, result2.public_key);
      assert.equal(result.private_key, result2.private_key);
    });

    // 2.5 generate publicKey by privateKey
    it('generatePublicKeyByPrivateKey', function() {
      let result = U3Utils.ecc.generateKeyPairWithMnemonic();
      let publicKey = U3Utils.ecc.privateToPublic(result.private_key);
      assert.equal(publicKey, result.public_key);
    });

    // 2.5 generate publicKey from privateKey
    it('privateToPublic', function() {
      const privateKey = '5JoTvD8emJDGHNGHyRCjqvpJqRY2jMmn5G6V9j8AifnszK5jKMe';
      const publicKey = 'UTR74nPcTpvZxoEugKZqXgAMysC7FvBjUAiHCB6TBSh576HNAGXz5';
      let result = U3Utils.ecc.privateToPublic(privateKey);
      assert.equal(publicKey, result);
    });

    // 2.6 sign data and verify signature
    it('sign', function() {
      const privateKey = '5JoTvD8emJDGHNGHyRCjqvpJqRY2jMmn5G6V9j8AifnszK5jKMe';
      const publicKey = 'UTR74nPcTpvZxoEugKZqXgAMysC7FvBjUAiHCB6TBSh576HNAGXz5';
      let data = '12345';//must be string or hash
      let signature = U3Utils.ecc.sign(data, privateKey);
      let valid = U3Utils.ecc.verify(signature, data, publicKey);
      assert.equal(true, valid);
    });

    // 2.7 judge a string whether is a valid public key
    it('isValidPublic', function() {
      const keys = [
        [true, 'PUB_K1_859gxfnXyUriMgUeThh1fWv3oqcpLFyHa3TfFYC4PK2Ht7beeX'],
        [true, 'UTR859gxfnXyUriMgUeThh1fWv3oqcpLFyHa3TfFYC4PK2HqhToVM'],
        [false, 'MMM859gxfnXyUriMgUeThh1fWv3oqcpLFyHa3TfFYC4PK2HqhToVM'],
        [false, 'UTR859gxfnXyUriMgUeThh1fWv3oqcpLFyHa3TfFYC4PK2HqhToVm'],
      ];
      for (const key of keys) {
        assert.equal(key[0], U3Utils.ecc.isValidPublic(key[1]), key[1]);
      }
    });

    // 2.8 judge a string whether is a valid private key
    it('isValidPrivate', () => {
      const keys = [
        [true, '5KYZdUEo39z3FPrtuX2QbbwGnNP5zTd7yyr2SC1j299sBCnWjss'],
        [false, '5KYZdUEo39z3FPrtuX2QbbwGnNP5zTd7yyr2SC1j299sBCnWjsm'],
      ];
      for (const key of keys) {
        assert.equal(key[0], U3Utils.ecc.isValidPrivate(key[1]), key[1]);
      }
    });

    // 2.9 sign a data and verify it
    it('signatures', () => {
      const pvt = U3Utils.ecc.seedPrivate('');
      const pubkey = U3Utils.ecc.privateToPublic(pvt);

      const data = 'hi';
      const dataSha256 = U3Utils.ecc.sha256(data);

      const sigs = [
        U3Utils.ecc.sign(data, pvt),
        U3Utils.ecc.signHash(dataSha256, pvt),
      ];

      for (const sig of sigs) {
        assert(U3Utils.ecc.verify(sig, data, pubkey), 'verify data');
        assert(U3Utils.ecc.verifyHash(sig, dataSha256, pubkey), 'verify hash');
        assert.equal(pubkey, U3Utils.ecc.recover(sig, data), 'recover from data');
        assert.equal(pubkey, U3Utils.ecc.recoverHash(sig, dataSha256), 'recover from hash');
      }
    });

  });

  // 3. contract relative
  describe('contracts', () => {

    // 3.1 deploy contract only to side chain
    it('deploy contract', async () => {
      const u3 = createU3();
      const tr = await u3.deploy(path.resolve(__dirname, '../contracts/token/token'), account2, { keyProvider: account2_pk });
      assert.equal(tr.transaction.transaction.actions.length, 2);
    });

    //3.2 get contract detail (wast,abi)
    it('getContract', async () => {
      const u3 = createU3();
      const contract = await u3.getContract(account1);
      assert.equal(contract.abi.version, 'ultraio:1.0:UIP06');
    });

    //3.3 get abi
    it('getAbi', async () => {
      const u3 = createU3();
      const abi = await u3.getAbi(account1);
      assert.ok(!isEmpty(abi));
    });

    // 3.4 create custom token (uip06)
    it('create custom token', async () => {
      const u3 = createU3();
      console.log('created token named: ' + customCurrency);

      //these three method can user.11.111 called separately or together
      await u3.transaction(account1, token => {
        token.create(account1, '10000000.0000 ' + customCurrency);
        token.issue(account1, '10000000.0000 ' + customCurrency, 'issue');
      }, { keyProvider: account1_pk });

      await u3.getCurrencyStats({
        'code': account1,
        'symbol': customCurrency,
      });
    });

    // 3.5 query token holder and token symbol when issued
    it('get table by scope', async () => {
      const u3 = createU3();

      //all holder accounts which held tokens created by the creator
      const holders_arr = await u3.getTableByScope({
        code: account1,//token creator
        table: 'accounts', //token table name
      });
      for (let h in holders_arr.rows) {
        let holder_account = format.decodeName(holders_arr.rows[h].scope, false);
        console.log(holder_account);
      }

      //all token symbols created by the creator
      const symbols_arr = await u3.getTableByScope({
        code: account1,//token creator
        table: 'stat',//token table scope
      });
      for (let s in symbols_arr.rows) {
        let symbol = format.decodeSymbolName(symbols_arr.rows[s].scope);
        console.log(symbol);
      }
    });

  });

  // 4. transfer UGAS
  describe('transfer', () => {
    it('globalConfig', async () => {
      const keyProvider = [account1_pk];
      const u3 = createU3({ keyProvider });
      const c = await u3.contract('utrio.token');
      const tr = await c.transfer(account1, account2, '1.0000 ' + defaultConfig.symbol, '');
      assert.equal(typeof tr.transaction_id, 'string');
    });

    it('optionalConfig', async () => {
      const u3 = createU3();
      const c = await u3.contract('utrio.token');
      const tr = await c.transfer(account1, account2, '1.0000 ' + defaultConfig.symbol, '', { keyProvider: account1_pk });
      assert.equal(typeof tr.transaction_id, 'string');
    });

    it('getTransFee', async () => {
      const u3 = createU3();
      const fee = await u3.getTransFee('1');
      assert.equal(typeof fee.fee, 'string');
    });
  });

  // 5. blocks
  describe('blocks', () => {

    it('getBlockInfo', async () => {
      const u3 = createU3();
      const blockInfo = await u3.getBlockInfo(1);
      assert.equal(blockInfo.block_num, 1);
    });

    it('transaction confirm', async () => {
      const u3 = createU3();
      const c = await u3.contract('utrio.token');
      const result = await c.transfer(account1, account2, '1.0000 ' + defaultConfig.symbol, '', { keyProvider: account1_pk });

      // first check whether the transaction was failed
      if (!result || result.processed.receipt.status !== 'executed') {
        console.log('the transaction was failed');
        return;
      }

      // then check whether the transaction was irreversible when it was not expired
      let timeout = new Date(result.transaction.transaction.expiration + 'Z') - new Date();
      let finalResult = false;
      try {
        await U3Utils.test.waitUntil(async () => {
          let tx = await u3.getTxByTxId(result.transaction_id);
          finalResult = tx && tx.irreversible;
          if (finalResult) return true;
        }, timeout, 1000);
      } catch (e) {
        console.log(finalResult);
      }
    });
  });

  // 6. sign (sign separately)
  describe('sign', () => {

    const publicKey = 'UTR6rBwNTWJSNMYu4ZLgEigyV5gM8hHiNinqejXT1dNGZa5xsbpCB';

    /*
     * 6.1
     * sign is separate from pushTx when transfer
     * using { sign: false, broadcast: false } to create a offline U3 instance and call some function
     * offline transaction will still initiate a network request to get the newest abi
     */
    it('sign_separate_from_pushTx_with_network', async () => {
      const u3_offline = createU3({
        sign: false,
        broadcast: false,
      });
      const tr = await u3_offline.contract('utrio.token');
      const unsigned_transaction = await tr.transfer(account1, account2, '1.0000 ' + defaultConfig.symbol, '', { authorization: [account1 + `@active`] });
      let signature = await u3_offline.sign(unsigned_transaction, account1_pk, defaultConfig.chainId);
      let signedTransaction = Object.assign({}, unsigned_transaction.transaction, { signatures: [signature] });
      //console.log(signedTransaction);

      //using {sign: true, broadcast: true} to create a online U3 instance and pushTx to chain
      const config = { keyProvider: account1_pk };
      const u3 = createU3(config);
      let processedTransaction = await u3.pushTx(signedTransaction);
      assert.equal(processedTransaction.transaction_id, unsigned_transaction.transaction_id);
    });

    /*
     * 6.2
     * sign is separate from pushTx when transfer
     * using { sign: false, broadcast: false } to create a offline U3 instance and call some function
     * offline transaction will not initiate a network request if you set httpEndpoint to null
     * pass the abi parameter you want
     * the max expiration time is an hour (3600)
     * fetch the ref_block_num and ref_block_prefix through `u3.getBlockInfo` or `http://xxx/v1/chain/get_block_info`
     */
    it('sign_separate_from_pushTx_without_network', async () => {
      let expiration = new Date(new Date().getTime() + 60 * 1000);
      const u3_offline = createU3({
        sign: false,
        broadcast: false,
        httpEndpoint: null,
        transactionHeaders: {
          expiration: expiration.toISOString().split('.')[0],
          ref_block_num: 0,
          ref_block_prefix: 0,
        },
        abi: JSON.parse('{"version":"ultraio:1.0","types":[{"new_type_name":"account_name","type":"name"}],"structs":[{"name":"transfer","base":"","fields":[{"name":"from","type":"account_name"},{"name":"to","type":"account_name"},{"name":"quantity","type":"asset"},{"name":"memo","type":"string"}]},{"name":"safe_transfer","base":"","fields":[{"name":"from","type":"account_name"},{"name":"to","type":"account_name"},{"name":"quantity","type":"asset"},{"name":"memo","type":"string"}]},{"name":"create","base":"","fields":[{"name":"issuer","type":"account_name"},{"name":"maximum_supply","type":"asset"}]},{"name":"issue","base":"","fields":[{"name":"to","type":"account_name"},{"name":"quantity","type":"asset"},{"name":"memo","type":"string"}]},{"name":"account","base":"","fields":[{"name":"balance","type":"asset"},{"name":"last_block_height","type":"uint32"}]},{"name":"currency_stats","base":"","fields":[{"name":"supply","type":"asset"},{"name":"max_supply","type":"asset"},{"name":"issuer","type":"account_name"}]}],"actions":[{"name":"transfer","type":"transfer","ricardian_contract":""},{"name":"safe_transfer","type":"safe_transfer","ricardian_contract":""},{"name":"issue","type":"issue","ricardian_contract":""},{"name":"create","type":"create","ricardian_contract":""}],"tables":[{"name":"accounts","type":"account","index_type":"i64","key_names":["currency"],"key_types":["uint64"]},{"name":"stat","type":"currency_stats","index_type":"i64","key_names":["currency"],"key_types":["uint64"]}],"ricardian_clauses":[],"abi_extensions":[]}'),
      });
      const tr = await u3_offline.contract('utrio.token');
      const unsigned_transaction = await tr.transfer(account1, account2, '1.0000 ' + defaultConfig.symbol, '', { authorization: [account1 + `@active`] });
      let signature = await u3_offline.sign(unsigned_transaction, account1_pk, defaultConfig.chainId);
      let signedTransaction = Object.assign({}, unsigned_transaction.transaction, { signatures: [signature] });
      //console.log(signedTransaction);

      //using {sign: true, broadcast: true} to create a online U3 instance and pushTx to chain
      const config = { keyProvider: account1_pk };
      const u3 = createU3(config);
      let processedTransaction = await u3.pushTx(signedTransaction);
      assert.equal(processedTransaction.transaction_id, unsigned_transaction.transaction_id);
    });

    /*
     * 6.3
     * sign is separate from pushTx when transfer
     * using { sign: false, broadcast: false } to create a offline U3 instance and call some function
     * offline transaction will not initiate a network request if you set httpEndpoint to null
     * the default cached abis are 'ultrainio' and 'utrio.token'
     * the max expiration time is an hour (3600)
     * fetch the ref_block_num and ref_block_prefix through `u3.getBlockInfo` or `http://xxx/v1/chain/get_block_info`
     */
    it('sign_separate_from_pushTx_without_network_and_abi', async () => {
      let expiration = new Date(new Date().getTime() + 60 * 1000);
      const u3_offline = createU3({
        sign: false,
        broadcast: false,
        httpEndpoint: null,
        transactionHeaders: {
          expiration: expiration.toISOString().split('.')[0],
          ref_block_num: 0,
          ref_block_prefix: 0,
        },
      });
      const tr = await u3_offline.contract('utrio.token');
      const unsigned_transaction = await tr.transfer(account1, account2, '1.0000 ' + defaultConfig.symbol, '', { authorization: [account1 + `@active`] });
      let signature = await u3_offline.sign(unsigned_transaction, account1_pk, defaultConfig.chainId);
      let signedTransaction = Object.assign({}, unsigned_transaction.transaction, { signatures: [signature] });
      //console.log(signedTransaction);

      //using {sign: true, broadcast: true} to create a online U3 instance and pushTx to chain
      const config = { keyProvider: account1_pk };
      const u3 = createU3(config);
      let processedTransaction = await u3.pushTx(signedTransaction);
      assert.equal(processedTransaction.transaction_id, unsigned_transaction.transaction_id);
    });


    /*
     * 6.4
     * sign is separate from pushTx when createUser
     * sign need network still
     */
    it('createUser_sign_separate_from_pushTx_with_network', async () => {
      let expiration = new Date(new Date().getTime() + 60 * 1000);
      const u3_offline = createU3();
      const name = randomName();
      let params = {
        creator: account1,
        name: name,
        owner: publicKey,
        active: publicKey,
      };
      const unsigned_transaction = await u3_offline.createUser(params, {
        sign: false,
        broadcast: false,
        authorization: [account1 + `@active`],
      });
      let signature = await u3_offline.sign(unsigned_transaction, account1_pk, defaultConfig.chainId);

      let signedTransaction = Object.assign({}, unsigned_transaction.transaction, { signatures: [signature] });
      //console.log(signedTransaction);

      //using {sign: true, broadcast: true} to create a online U3 instance and pushTx to chain
      const config = { keyProvider: account1_pk };
      const u3 = createU3(config);
      let processedTransaction = await u3.pushTx(signedTransaction);
      assert.equal(processedTransaction.transaction_id, unsigned_transaction.transaction_id);
    });

    /*
     * 6.5
     * sign is separate from pushTx when createUser
     * sign does not need network
     * pass in the newest abi
     * the max expiration time is an hour (3600)
     * fetch the ref_block_num and ref_block_prefix through `u3.getBlockInfo` or `http://xxx/v1/chain/get_block_info`
     */
    it('createUser_sign_separate_from_pushTx_without_network', async () => {
      let expiration = new Date(new Date().getTime() + 60 * 1000);
      const u3_offline = createU3({
        httpEndpoint: null,
        transactionHeaders: {
          expiration: expiration.toISOString().split('.')[0],
          ref_block_num: 0,
          ref_block_prefix: 0,
        },
        abi: JSON.parse('{"version":"ultrainio::abi/1.0","types":[{"new_type_name":"account_name","type":"name"},{"new_type_name":"permission_name","type":"name"},{"new_type_name":"action_name","type":"name_ex"},{"new_type_name":"transaction_id_type","type":"checksum256"},{"new_type_name":"weight_type","type":"uint16"},{"new_type_name":"block_id_type","type":"checksum256"}],"structs":[{"name":"permission_level","base":"","fields":[{"name":"actor","type":"account_name"},{"name":"permission","type":"permission_name"}]},{"name":"proposeminer_info","base":"","fields":[{"name":"account","type":"account_name"},{"name":"public_key","type":"string"},{"name":"bls_key","type":"string"},{"name":"url","type":"string"},{"name":"location","type":"name"},{"name":"adddel_miner","type":"bool"},{"name":"approve_num","type":"int64"}]},{"name":"proposeaccount_info","base":"","fields":[{"name":"account","type":"account_name"},{"name":"owner_key","type":"string"},{"name":"active_key","type":"string"},{"name":"updateable","type":"bool"},{"name":"location","type":"name"},{"name":"approve_num","type":"int64"}]},{"name":"proposeresource_info","base":"","fields":[{"name":"account","type":"account_name"},{"name":"lease_num","type":"uint64"},{"name":"block_height_interval","type":"uint32"},{"name":"location","type":"name"},{"name":"approve_num","type":"int64"}]},{"name":"hash_vote","base":"","fields":[{"name":"hash","type":"checksum256"},{"name":"file_size","type":"uint64"},{"name":"votes","type":"uint64"},{"name":"valid","type":"bool"},{"name":"accounts","type":"account_name[]"}]},{"name":"block_reward","base":"","fields":[{"name":"consensus_period","type":"uint16"},{"name":"reward","type":"uint64"}]},{"name":"provided_proposer","base":"","fields":[{"name":"account","type":"account_name"},{"name":"last_vote_blockheight","type":"uint32"},{"name":"resource_index","type":"uint64"}]},{"name":"key_weight","base":"","fields":[{"name":"key","type":"public_key"},{"name":"weight","type":"weight_type"}]},{"name":"bidname","base":"","fields":[{"name":"bidder","type":"account_name"},{"name":"newname","type":"account_name"},{"name":"bid","type":"asset"}]},{"name":"votecommittee","base":"","fields":[{"name":"proposer","type":"account_name"},{"name":"proposeminer","type":"proposeminer_info[]"}]},{"name":"voteaccount","base":"","fields":[{"name":"proposer","type":"account_name"},{"name":"proposeaccount","type":"proposeaccount_info[]"}]},{"name":"reportsubchainhash","base":"","fields":[{"name":"subchain","type":"name"},{"name":"blocknum","type":"uint64"},{"name":"hash","type":"checksum256"},{"name":"file_size","type":"uint64"}]},{"name":"voteresourcelease","base":"","fields":[{"name":"proposer","type":"account_name"},{"name":"proposeresource","type":"proposeresource_info[]"}]},{"name":"regchaintype","base":"","fields":[{"name":"type_id","type":"uint64"},{"name":"min_producer_num","type":"uint16"},{"name":"max_producer_num","type":"uint16"},{"name":"sched_step","type":"uint16"},{"name":"consensus_period","type":"uint16"}]},{"name":"regsubchain","base":"","fields":[{"name":"chain_name","type":"name"},{"name":"chain_type","type":"uint64"}]},{"name":"setsched","base":"","fields":[{"name":"is_enabled","type":"bool"},{"name":"sched_period","type":"uint16"},{"name":"confirm_period","type":"uint16"}]},{"name":"extension","base":"","fields":[{"name":"type","type":"uint16"},{"name":"data","type":"bytes"}]},{"name":"block_header","base":"","fields":[{"name":"timestamp","type":"block_timestamp_type"},{"name":"proposer","type":"account_name"},{"name":"version","type":"uint32"},{"name":"previous","type":"checksum256"},{"name":"transaction_mroot","type":"checksum256"},{"name":"action_mroot","type":"checksum256"},{"name":"committee_mroot","type":"checksum256"},{"name":"header_extensions","type":"extension[]"}]},{"name":"acceptheader","base":"","fields":[{"name":"chain_name","type":"name"},{"name":"headers","type":"block_header[]"}]},{"name":"clearchain","base":"","fields":[{"name":"chain_name","type":"name"},{"name":"users_only","type":"bool"}]},{"name":"empoweruser","base":"","fields":[{"name":"user","type":"account_name"},{"name":"chain_name","type":"name"},{"name":"owner_pk","type":"string"},{"name":"active_pk","type":"string"}]},{"name":"permission_level_weight","base":"","fields":[{"name":"permission","type":"permission_level"},{"name":"weight","type":"weight_type"}]},{"name":"wait_weight","base":"","fields":[{"name":"wait_sec","type":"uint32"},{"name":"weight","type":"weight_type"}]},{"name":"authority","base":"","fields":[{"name":"threshold","type":"uint32"},{"name":"keys","type":"key_weight[]"},{"name":"accounts","type":"permission_level_weight[]"},{"name":"waits","type":"wait_weight[]"}]},{"name":"newaccount","base":"","fields":[{"name":"creator","type":"account_name"},{"name":"name","type":"account_name"},{"name":"owner","type":"authority"},{"name":"active","type":"authority"},{"name":"updateable","type":"bool"}]},{"name":"deletetable","base":"","fields":[{"name":"code","type":"account_name"}]},{"name":"setcode","base":"","fields":[{"name":"account","type":"account_name"},{"name":"vmtype","type":"uint8"},{"name":"vmversion","type":"uint8"},{"name":"code","type":"bytes"}]},{"name":"setabi","base":"","fields":[{"name":"account","type":"account_name"},{"name":"abi","type":"bytes"}]},{"name":"updateauth","base":"","fields":[{"name":"account","type":"account_name"},{"name":"permission","type":"permission_name"},{"name":"parent","type":"permission_name"},{"name":"auth","type":"authority"}]},{"name":"deleteauth","base":"","fields":[{"name":"account","type":"account_name"},{"name":"permission","type":"permission_name"}]},{"name":"linkauth","base":"","fields":[{"name":"account","type":"account_name"},{"name":"code","type":"account_name"},{"name":"type","type":"action_name"},{"name":"requirement","type":"permission_name"}]},{"name":"unlinkauth","base":"","fields":[{"name":"account","type":"account_name"},{"name":"code","type":"account_name"},{"name":"type","type":"action_name"}]},{"name":"canceldelay","base":"","fields":[{"name":"canceling_auth","type":"permission_level"},{"name":"trx_id","type":"transaction_id_type"}]},{"name":"onerror","base":"","fields":[{"name":"sender_id","type":"uint128"},{"name":"sent_trx","type":"bytes"}]},{"name":"resourcelease","base":"","fields":[{"name":"from","type":"account_name"},{"name":"receiver","type":"account_name"},{"name":"combosize","type":"uint64"},{"name":"days","type":"uint64"},{"name":"location","type":"name"}]},{"name":"delegatecons","base":"","fields":[{"name":"from","type":"account_name"},{"name":"receiver","type":"account_name"},{"name":"stake_cons_quantity","type":"asset"}]},{"name":"undelegatecons","base":"","fields":[{"name":"from","type":"account_name"},{"name":"receiver","type":"account_name"}]},{"name":"refundcons","base":"","fields":[{"name":"owner","type":"account_name"}]},{"name":"recycleresource","base":"","fields":[{"name":"owner","type":"account_name"},{"name":"lease_num","type":"uint64"}]},{"name":"delegated_consensus","base":"","fields":[{"name":"from","type":"account_name"},{"name":"to","type":"account_name"},{"name":"cons_weight","type":"asset"}]},{"name":"refund_cons","base":"","fields":[{"name":"owner","type":"account_name"},{"name":"request_time","type":"time_point_sec"},{"name":"cons_amount","type":"asset"}]},{"name":"resources_lease","base":"","fields":[{"name":"owner","type":"account_name"},{"name":"lease_num","type":"uint64"},{"name":"start_block_height","type":"uint32"},{"name":"end_block_height","type":"uint32"},{"name":"modify_block_height","type":"uint32"}]},{"name":"schedule_setting","base":"","fields":[{"name":"is_schedule_enabled","type":"bool"},{"name":"schedule_period","type":"uint16"},{"name":"expire_minutes","type":"uint16"}]},{"name":"blockchain_parameters","base":"","fields":[{"name":"max_block_net_usage","type":"uint64"},{"name":"target_block_net_usage_pct","type":"uint32"},{"name":"max_transaction_net_usage","type":"uint32"},{"name":"base_per_transaction_net_usage","type":"uint32"},{"name":"net_usage_leeway","type":"uint32"},{"name":"context_free_discount_net_usage_num","type":"uint32"},{"name":"context_free_discount_net_usage_den","type":"uint32"},{"name":"max_block_cpu_usage","type":"uint32"},{"name":"target_block_cpu_usage_pct","type":"uint32"},{"name":"max_transaction_cpu_usage","type":"uint32"},{"name":"min_transaction_cpu_usage","type":"uint32"},{"name":"max_transaction_lifetime","type":"uint32"},{"name":"deferred_trx_expiration_window","type":"uint32"},{"name":"max_transaction_delay","type":"uint32"},{"name":"max_inline_action_size","type":"uint32"},{"name":"max_inline_action_depth","type":"uint16"},{"name":"max_authority_depth","type":"uint16"}]},{"name":"ultrainio_system_params","base":"","fields":[{"name":"chain_type","type":"uint64"},{"name":"max_ram_size","type":"uint64"},{"name":"min_activated_stake","type":"int64"},{"name":"min_committee_member_number","type":"uint32"},{"name":"block_reward_vec","type":"block_reward[]"},{"name":"max_resources_number","type":"uint16"},{"name":"newaccount_fee","type":"uint32"},{"name":"chain_name","type":"name"},{"name":"worldstate_interval","type":"uint64"}]},{"name":"master_chain_info","base":"","fields":[{"name":"owner","type":"account_name"},{"name":"master_prods","type":"role_base[]"},{"name":"block_height","type":"uint64"}]},{"name":"ultrainio_global_state","base":"blockchain_parameters","fields":[{"name":"max_ram_size","type":"uint64"},{"name":"min_activated_stake","type":"int64"},{"name":"min_committee_member_number","type":"uint32"},{"name":"total_ram_bytes_used","type":"uint64"},{"name":"start_blcok","type":"uint64"},{"name":"block_reward_vec","type":"block_reward[]"},{"name":"pervote_bucket","type":"int64"},{"name":"perblock_bucket","type":"int64"},{"name":"total_unpaid_balance","type":"uint64"},{"name":"total_activated_stake","type":"int64"},{"name":"last_name_close","type":"block_timestamp_type"},{"name":"max_resources_number","type":"uint16"},{"name":"total_resources_used_number","type":"uint16"},{"name":"newaccount_fee","type":"uint32"},{"name":"chain_name","type":"name"},{"name":"cur_committee_number","type":"uint32"},{"name":"worldstate_interval","type":"uint64"},{"name":"table_extension","type":"extension[]"}]},{"name":"producer_brief","base":"","fields":[{"name":"owner","type":"account_name"},{"name":"location","type":"name"},{"name":"in_disable","type":"bool"}]},{"name":"role_base","base":"","fields":[{"name":"owner","type":"account_name"},{"name":"producer_key","type":"string"},{"name":"bls_key","type":"string"}]},{"name":"disabled_producer","base":"role_base","fields":[{"name":"total_cons_staked","type":"int64"},{"name":"url","type":"string"},{"name":"total_produce_block","type":"uint64"},{"name":"last_operate_blocknum","type":"uint64"},{"name":"delegated_cons_blocknum","type":"uint64"},{"name":"claim_rewards_account","type":"account_name"}]},{"name":"producer_info","base":"disabled_producer","fields":[{"name":"unpaid_balance","type":"uint64"},{"name":"vote_number","type":"uint64"},{"name":"last_vote_blocenum","type":"uint64"},{"name":"table_extension","type":"extension[]"}]},{"name":"chaintype","base":"","fields":[{"name":"type_id","type":"uint64"},{"name":"stable_min_producers","type":"uint16"},{"name":"stable_max_producers","type":"uint16"},{"name":"sched_inc_step","type":"uint16"},{"name":"consensus_period","type":"uint16"},{"name":"table_extension","type":"extension[]"}]},{"name":"user_info","base":"","fields":[{"name":"user_name","type":"account_name"},{"name":"owner_key","type":"string"},{"name":"active_key","type":"string"},{"name":"emp_time","type":"time_point_sec"},{"name":"is_producer","type":"bool"}]},{"name":"chain_resource","base":"","fields":[{"name":"max_resources_number","type":"uint16"},{"name":"total_resources_used_number","type":"uint16"},{"name":"max_ram_size","type":"uint64"},{"name":"total_ram_bytes_used","type":"uint64"}]},{"name":"changing_committee","base":"","fields":[{"name":"removed_members","type":"role_base[]"},{"name":"new_added_members","type":"role_base[]"}]},{"name":"block_header_digest","base":"","fields":[{"name":"proposer","type":"account_name"},{"name":"block_id","type":"block_id_type"},{"name":"block_number","type":"uint32"},{"name":"transaction_mroot","type":"checksum256"},{"name":"trx_hashs","type":"checksum256[]"},{"name":"table_extension","type":"extension[]"}]},{"name":"unconfirmed_block_header","base":"block_header_digest","fields":[{"name":"fork_id","type":"uint16"},{"name":"to_be_paid","type":"bool"},{"name":"is_leaf","type":"bool"},{"name":"is_synced","type":"bool"},{"name":"committee_mroot","type":"checksum256"},{"name":"committee_info","type":"string"}]},{"name":"subchain","base":"","fields":[{"name":"chain_name","type":"name"},{"name":"chain_type","type":"uint64"},{"name":"genesis_time","type":"block_timestamp_type"},{"name":"global_resource","type":"chain_resource"},{"name":"is_synced","type":"bool"},{"name":"is_schedulable","type":"bool"},{"name":"committee_num","type":"uint16"},{"name":"deprecated_committee","type":"role_base[]"},{"name":"changing_info","type":"changing_committee"},{"name":"changing_block_num","type":"uint32"},{"name":"recent_users","type":"user_info[]"},{"name":"total_user_num","type":"uint32"},{"name":"chain_id","type":"checksum256"},{"name":"committee_mroot","type":"checksum256"},{"name":"confirmed_block_number","type":"uint32"},{"name":"highest_block_number","type":"uint32"},{"name":"unconfirmed_blocks","type":"unconfirmed_block_header[]"},{"name":"table_extension","type":"extension[]"}]},{"name":"pending_miner","base":"","fields":[{"name":"owner","type":"account_name"},{"name":"proposal_miner","type":"proposeminer_info[]"},{"name":"provided_approvals","type":"provided_proposer[]"}]},{"name":"pending_acc","base":"","fields":[{"name":"owner","type":"account_name"},{"name":"proposal_account","type":"proposeaccount_info[]"},{"name":"provided_approvals","type":"provided_proposer[]"}]},{"name":"pending_res","base":"","fields":[{"name":"owner","type":"account_name"},{"name":"proposal_resource","type":"proposeresource_info[]"},{"name":"provided_approvals","type":"provided_proposer[]"}]},{"name":"subchain_ws_hash","base":"","fields":[{"name":"block_num","type":"uint64"},{"name":"hash_v","type":"hash_vote[]"},{"name":"accounts","type":"account_name[]"},{"name":"table_extension","type":"extension[]"}]},{"name":"regproducer","base":"","fields":[{"name":"producer","type":"account_name"},{"name":"producer_key","type":"string"},{"name":"bls_key","type":"string"},{"name":"rewards_account","type":"account_name"},{"name":"url","type":"string"},{"name":"location","type":"name"}]},{"name":"unregprod","base":"","fields":[{"name":"producer","type":"account_name"}]},{"name":"setsysparams","base":"","fields":[{"name":"params","type":"ultrainio_system_params"}]},{"name":"setmasterchaininfo","base":"","fields":[{"name":"chaininfo","type":"master_chain_info"}]},{"name":"claimrewards","base":"","fields":[]},{"name":"setpriv","base":"","fields":[{"name":"account","type":"account_name"},{"name":"is_priv","type":"int8"}]},{"name":"set_account_limits","base":"","fields":[{"name":"account","type":"account_name"},{"name":"ram_bytes","type":"int64"},{"name":"net_weight","type":"int64"},{"name":"cpu_weight","type":"int64"}]},{"name":"set_global_limits","base":"","fields":[{"name":"cpu_usec_per_period","type":"int64"}]},{"name":"forcesetblock","base":"","fields":[{"name":"chain_name","type":"name"},{"name":"header_dig","type":"block_header_digest"},{"name":"committee_mrt","type":"checksum256"}]},{"name":"producer_key","base":"","fields":[{"name":"producer_name","type":"account_name"},{"name":"block_signing_key","type":"string"}]},{"name":"set_producers","base":"","fields":[{"name":"schedule","type":"producer_key[]"}]},{"name":"require_auth","base":"","fields":[{"name":"from","type":"account_name"}]},{"name":"setparams","base":"","fields":[{"name":"params","type":"blockchain_parameters"}]},{"name":"synctransfer","base":"","fields":[{"name":"chain_name","type":"name"},{"name":"block_number","type":"uint32"},{"name":"merkle_proofs","type":"string[]"},{"name":"tx_bytes","type":"uint8[]"}]},{"name":"connector","base":"","fields":[{"name":"balance","type":"asset"},{"name":"weight","type":"float64"}]},{"name":"exchange_state","base":"","fields":[{"name":"supply","type":"asset"},{"name":"base","type":"connector"},{"name":"quote","type":"connector"}]},{"name":"namebid_info","base":"","fields":[{"name":"newname","type":"account_name"},{"name":"high_bidder","type":"account_name"},{"name":"high_bid","type":"int64"},{"name":"last_bid_time","type":"uint64"}]}],"actions":[{"name":"newaccount","type":"newaccount","ricardian_contract":"","ability":"normal"},{"name":"deletetable","type":"deletetable","ricardian_contract":"","ability":"normal"},{"name":"setcode","type":"setcode","ricardian_contract":"","ability":"normal"},{"name":"setabi","type":"setabi","ricardian_contract":"","ability":"normal"},{"name":"updateauth","type":"updateauth","ricardian_contract":"","ability":"normal"},{"name":"deleteauth","type":"deleteauth","ricardian_contract":"","ability":"normal"},{"name":"linkauth","type":"linkauth","ricardian_contract":"","ability":"normal"},{"name":"unlinkauth","type":"unlinkauth","ricardian_contract":"","ability":"normal"},{"name":"canceldelay","type":"canceldelay","ricardian_contract":"","ability":"normal"},{"name":"onerror","type":"onerror","ricardian_contract":"","ability":"normal"},{"name":"resourcelease","type":"resourcelease","ricardian_contract":"","ability":"normal"},{"name":"delegatecons","type":"delegatecons","ricardian_contract":"","ability":"normal"},{"name":"undelegatecons","type":"undelegatecons","ricardian_contract":"","ability":"normal"},{"name":"refundcons","type":"refundcons","ricardian_contract":"","ability":"normal"},{"name":"recycleresource","type":"recycleresource","ricardian_contract":"","ability":"normal"},{"name":"regproducer","type":"regproducer","ricardian_contract":"","ability":"normal"},{"name":"setsysparams","type":"setsysparams","ricardian_contract":"","ability":"normal"},{"name":"setmasterchaininfo","type":"setmasterchaininfo","ricardian_contract":"","ability":"normal"},{"name":"bidname","type":"bidname","ricardian_contract":"","ability":"normal"},{"name":"votecommittee","type":"votecommittee","ricardian_contract":"","ability":"normal"},{"name":"reportsubchainhash","type":"reportsubchainhash","ricardian_contract":"","ability":"normal"},{"name":"voteaccount","type":"voteaccount","ricardian_contract":"","ability":"normal"},{"name":"voteresourcelease","type":"voteresourcelease","ricardian_contract":"","ability":"normal"},{"name":"regchaintype","type":"regchaintype","ricardian_contract":"","ability":"normal"},{"name":"regsubchain","type":"regsubchain","ricardian_contract":"","ability":"normal"},{"name":"acceptheader","type":"acceptheader","ricardian_contract":"","ability":"normal"},{"name":"clearchain","type":"clearchain","ricardian_contract":"","ability":"normal"},{"name":"empoweruser","type":"empoweruser","ricardian_contract":"","ability":"normal"},{"name":"unregprod","type":"unregprod","ricardian_contract":"","ability":"normal"},{"name":"claimrewards","type":"claimrewards","ricardian_contract":"","ability":"normal"},{"name":"setpriv","type":"setpriv","ricardian_contract":"","ability":"normal"},{"name":"setalimits","type":"set_account_limits","ricardian_contract":"","ability":"normal"},{"name":"setglimits","type":"set_global_limits","ricardian_contract":"","ability":"normal"},{"name":"setprods","type":"set_producers","ricardian_contract":"","ability":"normal"},{"name":"reqauth","type":"require_auth","ricardian_contract":"","ability":"normal"},{"name":"setsched","type":"setsched","ricardian_contract":"","ability":"normal"},{"name":"forcesetblock","type":"forcesetblock","ricardian_contract":"","ability":"normal"},{"name":"setparams","type":"setparams","ricardian_contract":"","ability":"normal"},{"name":"synctransfer","type":"synctransfer","ricardian_contract":"","ability":"normal"}],"tables":[{"name":"producers","index_type":"i64","key_names":["owner"],"key_types":["uint64"],"type":"producer_info"},{"name":"global","index_type":"i64","key_names":[],"key_types":[],"type":"ultrainio_global_state"},{"name":"delcons","index_type":"i64","key_names":["to"],"key_types":["uint64"],"type":"delegated_consensus"},{"name":"rammarket","index_type":"i64","key_names":["supply"],"key_types":["uint64"],"type":"exchange_state"},{"name":"refundscons","index_type":"i64","key_names":["owner"],"key_types":["uint64"],"type":"refund_cons"},{"name":"reslease","index_type":"i64","key_names":["owner"],"key_types":["uint64"],"type":"resources_lease"},{"name":"namebids","index_type":"i64","key_names":["newname"],"key_types":["account_name"],"type":"namebid_info"},{"name":"pendingque","index_type":"i64","key_names":[],"key_types":[],"type":"role_base[]"},{"name":"subchains","index_type":"i64","key_names":["chain_name"],"key_types":["uint64"],"type":"subchain"},{"name":"pendingminer","index_type":"i64","key_names":["owner"],"key_types":["uint64"],"type":"pending_miner"},{"name":"pendingacc","index_type":"i64","key_names":["owner"],"key_types":["uint64"],"type":"pending_acc"},{"name":"pendingres","index_type":"i64","key_names":["owner"],"key_types":["uint64"],"type":"pending_res"},{"name":"wshash","index_type":"i64","key_names":["block_num"],"key_types":["uint64"],"type":"subchain_ws_hash"},{"name":"chaintypes","index_type":"i64","key_names":["type_id"],"key_types":["uint64"],"type":"chaintype"},{"name":"schedset","index_type":"i64","key_names":[],"key_types":[],"type":"schedule_setting"},{"name":"blockheaders","index_type":"i64","key_names":["block_number"],"key_types":["uint64"],"type":"block_header_digest"},{"name":"briefprod","index_type":"i64","key_names":["owner"],"key_types":["uint64"],"type":"producer_brief"},{"name":"disableprods","index_type":"i64","key_names":["owner"],"key_types":["uint64"],"type":"disabled_producer"},{"name":"masterinfos","index_type":"i64","key_names":["owner"],"key_types":["uint64"],"type":"master_chain_info"}],"ricardian_clauses":[],"error_messages":[],"abi_extensions":[]}'),
      });
      const name = randomName();
      let params = {
        creator: account1,
        name: name,
        owner: publicKey,
        active: publicKey,
      };
      const unsigned_transaction = await u3_offline.createUser(params, {
        sign: false,
        broadcast: false,
        authorization: [account1 + `@active`],
      });
      let signature = await u3_offline.sign(unsigned_transaction, account1_pk, defaultConfig.chainId);

      let signedTransaction = Object.assign({}, unsigned_transaction.transaction, { signatures: [signature] });
      //console.log(signedTransaction);

      //using {sign: true, broadcast: true} to create a online U3 instance and pushTx to chain
      const config = { keyProvider: account1_pk };
      const u3 = createU3(config);
      let processedTransaction = await u3.pushTx(signedTransaction);
      assert.equal(processedTransaction.transaction_id, unsigned_transaction.transaction_id);
    });

    /*
     * 6.6
     * sign is separate from pushTx when createUser
     * sign does not need network
     * sign with the default cached abi
     * the max expiration time is an hour (3600)
     * fetch the ref_block_num and ref_block_prefix through `u3.getBlockInfo` or `http://xxx/v1/chain/get_block_info`
     */
    it('createUser_sign_separate_from_pushTx_without_network_and_abi', async () => {
      let expiration = new Date(new Date().getTime() + 60 * 1000);
      const u3_offline = createU3({
        httpEndpoint: null,
        transactionHeaders: {
          expiration: expiration.toISOString().split('.')[0],
          ref_block_num: 0,
          ref_block_prefix: 0,
        },
      });
      const name = randomName();
      let params = {
        creator: account1,
        name: name,
        owner: publicKey,
        active: publicKey,
      };
      const unsigned_transaction = await u3_offline.createUser(params, {
        sign: false,
        broadcast: false,
        authorization: [account1 + `@active`],
      });
      let signature = await u3_offline.sign(unsigned_transaction, account1_pk, defaultConfig.chainId);

      let signedTransaction = Object.assign({}, unsigned_transaction.transaction, { signatures: [signature] });
      //console.log(signedTransaction);

      //using {sign: true, broadcast: true} to create a online U3 instance and pushTx to chain
      const config = { keyProvider: account1_pk };
      const u3 = createU3(config);
      let processedTransaction = await u3.pushTx(signedTransaction);
      assert.equal(processedTransaction.transaction_id, unsigned_transaction.transaction_id);
    });

  });

  // 7. create user and async user
  describe('user', () => {
    const publicKey = 'UTR6rBwNTWJSNMYu4ZLgEigyV5gM8hHiNinqejXT1dNGZa5xsbpCB';

    // 7.1 create user only in the main chain
    // We should call a 'empoweruser' method to async the user from the main chain to the side chain if in MainNet/TestNet envirnment
    it('createUser', async () => {
      const u3 = createU3({ keyProvider: account1_pk });
      const name = randomName();
      let params = {
        creator: 'ben',
        name: name,
        owner: publicKey,
        active: publicKey,
      };
      await u3.createUser(params);

      const account_ = await u3.getAccountInfo({ account_name: name });
      assert.equal(account_.account_name, name);
    });

    // 7.2 when in MainNet/TestNet
    // this testcase below only works in TestNet
    it('empoweruser', async () => {
      /**
       * accountName: cona1
       * privateKey:5JuLu9LyeCq2Rh7cddN9qPXGpgNerRU31kzt8FFYuMASNaDFxUn
       * publicKey:UTR5jKHKQZHCvrmfpZ8cjdf6QJFWKQrxUtBvj5QBPKdWUBob8BkqS
       * mnemonic:spring equip exit tool monkey palm output siren next emerge slight flush
       */
      const u3 = createU3({ keyProvider: '5JC2uWa7Pba5V8Qmn1pQPWKDPgwmRSYeZzAxK48jje6GP5iMqmM' });
      const c = await u3.contract('ultrainio');//系统合约名
      await c.empoweruser({
        user: 'temp1',
        chain_name: '11', //pioneer sidechain name
        owner_pk: 'UTR6rBwNTWJSNMYu4ZLgEigyV5gM8hHiNinqejXT1dNGZa5xsbpCB',
        active_pk: 'UTR6rBwNTWJSNMYu4ZLgEigyV5gM8hHiNinqejXT1dNGZa5xsbpCB',
        updateable: 1,
      });
    });


    // 7.3 updateAuth
    it('updateAuth', async () => {

      const u3 = createU3({ keyProvider: account3_pk });
      const c = await u3.contract('ultrainio');

      let account_ = account3;
      let publicKey = 'UTR6ujHgxt2hUz7BfvJz6epfvWzhXEp1ChVKEFZxf1Ld5ea83WE6V';

      await u3.getAccountInfo({ account_name: account_ });

      let activeObj = {
        account: account_,
        auth: {
          'threshold': 1,
          'keys': [{ 'key': publicKey, 'weight': 1 }],
          'accounts': [],
          'waits': [],
        },
        parent: 'owner',
        permission: 'active',
      };
      await c.updateauth(activeObj, { authorization: [account_ + `@active`] });

      let ownerObj = {
        account: account_,
        auth: {
          'threshold': 1,
          'keys': [{ 'key': publicKey, 'weight': 1 }],
          'accounts': [],
          'waits': [],
        },
        parent: '',
        permission: 'owner',
      };
      await c.updateauth(ownerObj, { authorization: [account_ + `@owner`] });

      await u3.getAccountInfo({ account_name: account_ });

    });
  });

  // 8. transactions
  describe('transactions', () => {

    // 8.1 get accountsInfo by name
    it('getAccountInfo', async () => {
      const u3 = createU3();
      const account_ = await u3.getAccountInfo({ account_name: 'ben' });
      assert.equal(account_.account_name, 'ben');
    });
  });

  // 9. database query
  describe('database', () => {

    //9.1 Returns an object containing rows from the specified table.
    //before using it, you should know table and scope defined in the contract
    it('get table records', async () => {
      const u3 = createU3();
      const balance = await u3.getTableRecords({
        code: 'utrio.token',//smart contract name
        scope: account1,//account name
        table: 'accounts',//table name
        json: true,
      });
      assert.ok(balance !== '');
    });

    //9.2 query account's current balance
    it('get currency balance', async () => {
      const u3 = createU3();
      const balance = await u3.getCurrencyBalance({
        code: 'utrio.token',
        account: account1,
        symbol: defaultConfig.symbol,
      });
      assert.ok(Array.isArray(balance));
      assert.equal(balance[0].split(' ').length, 2);
      assert.equal(balance[0].split(' ')[1], defaultConfig.symbol);
    });

    //9.3 query currency's status
    it('get currency stats', async function() {
      const u3 = createU3();
      const stats = await u3.getCurrencyStats('utrio.token', defaultConfig.symbol);
      assert.ok(stats.hasOwnProperty(defaultConfig.symbol));
      assert.ok(stats['UGAS'].hasOwnProperty('supply'));
      assert.ok(stats['UGAS'].hasOwnProperty('max_supply'));
      assert.ok(stats['UGAS'].hasOwnProperty('issuer'));
    });
  });

  // 10 resource
  describe('resource', () => {

    // 10.1 buy resource and query resource
    it('lease_and_query', async () => {
      const config = { keyProvider: account1_pk };
      const u3 = createU3(config);
      const c = await u3.contract('ultrainio');

      //lease 1 slot for 2 days.
      //the last parameter should be the name of the side chain.
      //should connect to mainchain
      await c.resourcelease(account1, account2, 1, 2, 'ultrainio');

      await U3Utils.test.wait(10000);

      const account = await u3.getAccountInfo({ account_name: account2 });
      assert.ok(account.chain_resource[0].lease_num > 0);
    });

  });

  // 11 random
  describe('random', () => {

    // 10.1 buy resource and query resource
    it('queryRandom', async () => {
      const u3 = createU3();
      const c = await u3.contract('utrio.rand');
      const tx = await c.query({
        keyProvider: '5JbedY3jGfNK7HcLXcqGqSYrmX2n8wQWqZAuq6K7Gcf4Dj62UfL',
        authorization: [`ben@active`],
      });
      let randomNumU64 = tx.processed.action_traces[0].return_value;
      console.log(randomNumU64);
      assert.ok(randomNumU64.split(',')[1] > 0);
    });
  });

  // 12 event
  describe('subscribe', () => {

    //make sure '192.168.1.5' is your local IP
    //and 'http://192.168.1.5:3002' is an accessible service form docker

    // 11.1 subscribe event
    it('subscribe', async () => {
      const config = { keyProvider: users[account].private_key };
      const u3 = createU3(config);
      const sub = await u3.registerEvent(account, 'http://192.168.1.5:3002');
      console.log(sub);
    });

    // 11.2 unsubscribe event
    it('unsubscribe', async () => {
      const config = { keyProvider: users[account].private_key };
      const u3 = createU3(config);
      const unSub = await u3.unregisterEvent(account, 'http://192.168.1.5:3002');
      console.log(unSub);
    });

    // 11.3 event listener
    it('unsubscribe', async () => {
      // just do some biz in the callback
      // the data is the message that ultrain will push to you
      listener(function(data) {
        console.log(data);
      });

      await U3Utils.test.wait(2000);

      //emit event defined  in the contract action
      //...
    });

  });
});
