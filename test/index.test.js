const assert = require("assert");
const isEmpty = require("lodash.isempty");
const isString = require("lodash.isstring");
const fs = require("fs");
const path = require("path");
const defaultConfig = require("../src/config");
const { createU3, format, U3Utils, listener } = require("../");

const readKeysFromFiles = () => {
  let accounts = ["ben", "john", "tony", "jack", "bob", "tom", "jerry", "alice"];
  let keys = [];
  for (let a in accounts) {
    const data = fs.readFileSync(path.resolve(__dirname, "../src/scratch/" + accounts[a]));
    keys[accounts[a]] = JSON.parse(data.toString());
  }
  return keys;
};

function randomString(length = 8, charset = "abcdefghijklmnopqrstuvwxyz") {
  let text = "";
  for (let i = 0; i < length; i++)
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  return text;
}

const randomName = () => {
  return randomString(12, "12345abcdefghijklmnopqrstuvwxyz");
};
const randomAsset = () => {
  return randomString().toUpperCase().substring(0, 4);
};

const users = readKeysFromFiles();
const customCurrency = randomAsset();

const account1 = "ben";
const account2 = "bob";
const account1_pk = users[account1].private_key;
const account2_pk = users[account2].private_key;

describe("u3.js", () => {

  // 1. chain info
  describe("chainInfo", () => {
    it("chainInfo", async () => {
      const u3 = createU3();
      await u3.getChainInfo();
    });
  });

  // 2. U3Utils.ecc utils
  describe("offline", () => {

    // 2.1 generate key pair by seed
    it("generateKeyPairBySeed", function() {
      let seed = randomName();
      let keys = U3Utils.ecc.generateKeyPairBySeed(seed);
      assert.equal(U3Utils.ecc.isValidPrivate(keys.private_key), true);
      assert.equal(U3Utils.ecc.isValidPublic(keys.public_key), true);
    });

    // 2.2 re-generate key pair by the same seed
    it("generateKeyPairBySeed(same keys with same seed)", function() {
      let seed = randomName();
      let keys1 = U3Utils.ecc.generateKeyPairBySeed(seed);
      let keys2 = U3Utils.ecc.generateKeyPairBySeed(seed);
      assert.equal(keys1.public_key, keys2.public_key);
      assert.equal(keys1.private_key, keys2.private_key);
    });

    // 2.3 generate key pair with mnemonic
    it("generateKeyPairWithMnemonic", function() {
      let result = U3Utils.ecc.generateKeyPairWithMnemonic();
      console.log(result);
      assert.ok((isString(result.mnemonic) && !isEmpty(result.mnemonic)), true);
      assert.equal(U3Utils.ecc.isValidPrivate(result.private_key), true);
      assert.equal(U3Utils.ecc.isValidPublic(result.public_key), true);
    });

    // 2.4 re-generate key pair by the same mnemonic
    it("generateKeyPairByMnemonic(same mnemonic same key pair)", function() {
      let result = U3Utils.ecc.generateKeyPairWithMnemonic();
      let result2 = U3Utils.ecc.generateKeyPairByMnemonic(result.mnemonic);
      assert.equal(result.public_key, result2.public_key);
      assert.equal(result.private_key, result2.private_key);
    });

    // 2.5 generate publicKey by privateKey
    it("generatePublicKeyByPrivateKey", function() {
      let result = U3Utils.ecc.generateKeyPairWithMnemonic();
      let publicKey = U3Utils.ecc.privateToPublic(result.private_key);
      assert.equal(publicKey, result.public_key);
    });

    // 2.5 generate publicKey from privateKey
    it("privateToPublic", function() {
      const privateKey = "5JoTvD8emJDGHNGHyRCjqvpJqRY2jMmn5G6V9j8AifnszK5jKMe";
      const publicKey = "UTR74nPcTpvZxoEugKZqXgAMysC7FvBjUAiHCB6TBSh576HNAGXz5";
      let result = U3Utils.ecc.privateToPublic(privateKey);
      assert.equal(publicKey, result);
    });

    // 2.6 sign data and verify signature
    it("sign", function() {
      const privateKey = "5JoTvD8emJDGHNGHyRCjqvpJqRY2jMmn5G6V9j8AifnszK5jKMe";
      const publicKey = "UTR74nPcTpvZxoEugKZqXgAMysC7FvBjUAiHCB6TBSh576HNAGXz5";
      let data = "12345";//must be string or hash
      let signature = U3Utils.ecc.sign(data, privateKey);
      let valid = U3Utils.ecc.verify(signature, data, publicKey);
      assert.equal(true, valid);
    });

    // 2.7 judge a string whether is a valid public key
    it("isValidPublic", function() {
      const keys = [
        [true, 'PUB_K1_859gxfnXyUriMgUeThh1fWv3oqcpLFyHa3TfFYC4PK2Ht7beeX'],
        [true, 'UTR859gxfnXyUriMgUeThh1fWv3oqcpLFyHa3TfFYC4PK2HqhToVM'],
        [false, 'MMM859gxfnXyUriMgUeThh1fWv3oqcpLFyHa3TfFYC4PK2HqhToVM'],
        [false, 'UTR859gxfnXyUriMgUeThh1fWv3oqcpLFyHa3TfFYC4PK2HqhToVm'],
      ]
      for(const key of keys) {
        assert.equal(key[0], U3Utils.ecc.isValidPublic(key[1]), key[1])
      }
    });

    // 2.8 judge a string whether is a valid private key
    it('isValidPrivate', () => {
      const keys = [
        [true, '5KYZdUEo39z3FPrtuX2QbbwGnNP5zTd7yyr2SC1j299sBCnWjss'],
        [false, '5KYZdUEo39z3FPrtuX2QbbwGnNP5zTd7yyr2SC1j299sBCnWjsm'],
      ]
      for(const key of keys) {
        assert.equal(key[0], U3Utils.ecc.isValidPrivate(key[1]), key[1])
      }
    })

    // 2.9 sign a data and verify it
    it('signatures', () => {
      const pvt = U3Utils.ecc.seedPrivate('')
      const pubkey = U3Utils.ecc.privateToPublic(pvt)

      const data = 'hi'
      const dataSha256 = U3Utils.ecc.sha256(data)

      const sigs = [
        U3Utils.ecc.sign(data, pvt),
        U3Utils.ecc.signHash(dataSha256, pvt)
      ]

      for(const sig of sigs) {
        assert(U3Utils.ecc.verify(sig, data, pubkey), 'verify data')
        assert(U3Utils.ecc.verifyHash(sig, dataSha256, pubkey), 'verify hash')
        assert.equal(pubkey, U3Utils.ecc.recover(sig, data), 'recover from data')
        assert.equal(pubkey, U3Utils.ecc.recoverHash(sig, dataSha256), 'recover from hash')
      }
    })

  });

  // 3. contract relative
  describe("contracts", () => {

    // 3.1 deploy contract only to side chain
    it("deploy contract", async () => {
      const u3 = createU3();
      const tr = await u3.deploy(path.resolve(__dirname, "../contracts/token/token"), account2, { keyProvider: account2_pk });
      assert.equal(tr.transaction.transaction.actions.length, 2);
    });

    //3.2 get contract detail (wast,abi)
    it("getContract", async () => {
      const u3 = createU3();
      const contract = await u3.getContract(account1);
      assert.equal(contract.abi.version, "ultraio:1.0:UIP06");
    });

    //3.3 get abi
    it("getAbi", async () => {
      const u3 = createU3();
      const abi = await u3.getAbi(account1);
      assert.ok(!isEmpty(abi));
    });

    // 3.4 create custom token (uip06)
    it("create custom token", async () => {
      const u3 = createU3();
      console.log("created token named: " + customCurrency);

      //these three method can user.11.111 called separately or together
      await u3.transaction(account1, token => {
        token.create(account1, "10000000.0000 " + customCurrency);
        token.issue(account1, "10000000.0000 " + customCurrency, "issue");
      }, { keyProvider: account1_pk });

      await u3.getCurrencyStats({
        "code": account1,
        "symbol": customCurrency
      });
    });

    // 3.5 query token holder and token symbol when issued
    it("get table by scope", async () => {
      const u3 = createU3();

      //all holder accounts which held tokens created by the creator
      const holders_arr = await u3.getTableByScope({
        code: account1,//token creator
        table: "accounts" //token table name
      });
      for (let h in holders_arr.rows) {
        let holder_account = format.decodeName(holders_arr.rows[h].scope, false);
        console.log(holder_account);
      }

      //all token symbols created by the creator
      const symbols_arr = await u3.getTableByScope({
        code: account1,//token creator
        table: "stat"//token table scope
      });
      for (let s in symbols_arr.rows) {
        let symbol = format.decodeSymbolName(symbols_arr.rows[s].scope);
        console.log(symbol);
      }
    });

  });

  // 4. transfer UGAS
  describe("transfer", () => {
    it("globalConfig", async () => {
      const keyProvider = [account1_pk];
      const u3 = createU3({ keyProvider });
      const c = await u3.contract("utrio.token");
      const tr = await c.transfer(account1, account2, "1.0000 " + defaultConfig.symbol, "");
      assert.equal(typeof tr.transaction_id, "string");
    });

    it("optionalConfig", async () => {
      const u3 = createU3();
      const c = await u3.contract("utrio.token");
      const tr = await c.transfer(account1, account2, "1.0000 " + defaultConfig.symbol, "", { keyProvider: account1_pk });
      assert.equal(typeof tr.transaction_id, "string");
    });
  });

  // 5. blocks
  describe("blocks", () => {

    it("getBlockInfo", async () => {
      const u3 = createU3();
      const blockInfo = await u3.getBlockInfo(1);
      assert.equal(blockInfo.block_num, 1);
    });

    it("transaction confirm", async () => {
      const u3 = createU3();
      const c = await u3.contract("utrio.token");
      const result = await c.transfer(account1, account2, "1.0000 " + defaultConfig.symbol, "", { keyProvider: account1_pk });

      // first check whether the transaction was failed
      if (!result || result.processed.receipt.status !== "executed") {
        console.log("the transaction was failed");
        return;
      }

      // then check whether the transaction was irreversible when it was not expired
      let timeout = new Date(result.transaction.transaction.expiration + "Z") - new Date();
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
  describe("sign", () => {
    it("offline sign", async () => {
      //using { sign: false, broadcast: false } to create a offline U3 instance and call some function
      const u3_offline = createU3({ sign: false, broadcast: false });
      const tr = await u3_offline.contract(account1);
      const unsigned_transaction = await tr.transfer(account1, account2, "1.0000 " + customCurrency, "", { authorization: [account1 + `@active`] });
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
  describe("user", () => {
    const publicKey = "UTR6rBwNTWJSNMYu4ZLgEigyV5gM8hHiNinqejXT1dNGZa5xsbpCB";

    // 7.1 create user only in the main chain
    // We should call a 'empoweruser' method to async the user from the main chain to the side chain if in MainNet/TestNet envirnment
    it("createUser", async () => {
      const u3 = createU3({ keyProvider: '5KR3iSRHy64dfstTtX9pd6mnXEMgrAEeAM65tbeeY3pDZRNTfHu' });
      const name = randomName();
      let params = {
        creator: 'utrioaccount',
        name: 'temp1',
        owner: publicKey,
        active: publicKey
      };
      await u3.createUser(params);

      const account_ = await u3.getAccountInfo({ account_name: name });
      assert.equal(account_.account_name, name);
    });


    // when in MainNet/TestNet
    // this testcase below only works in TestNet
    it("empoweruser", async () => {

      /**
       * accountName: cona1
       * privateKey:5JuLu9LyeCq2Rh7cddN9qPXGpgNerRU31kzt8FFYuMASNaDFxUn
       * publicKey:UTR5jKHKQZHCvrmfpZ8cjdf6QJFWKQrxUtBvj5QBPKdWUBob8BkqS
       * mnemonic:spring equip exit tool monkey palm output siren next emerge slight flush
       */
      const u3 = createU3({ keyProvider: '5JC2uWa7Pba5V8Qmn1pQPWKDPgwmRSYeZzAxK48jje6GP5iMqmM' });
      const c = await u3.contract("ultrainio");//系统合约名
      await c.empoweruser({
        user: 'temp1',
        chain_name: '11', //pioneer sidechain name
        owner_pk: 'UTR6rBwNTWJSNMYu4ZLgEigyV5gM8hHiNinqejXT1dNGZa5xsbpCB',
        active_pk: 'UTR6rBwNTWJSNMYu4ZLgEigyV5gM8hHiNinqejXT1dNGZa5xsbpCB',
        updateable: 1
      })
    });
  });

  // 8. transactions
  describe("transactions", () => {

    // 8.1 get accountsInfo by name
    it("getAccountInfo", async () => {
      const u3 = createU3();
      const account_ = await u3.getAccountInfo({ account_name: "ben" });
      assert.equal(account_.account_name, "ben");
    });
  });

  // 9. database query
  describe("database", () => {

    //9.1 Returns an object containing rows from the specified table.
    //before using it, you should know table and scope defined in the contract
    it("get table records", async () => {
      const u3 = createU3();
      const balance = await u3.getTableRecords({
        code: "utrio.token",//smart contract name
        scope: account1,//account name
        table: "accounts",//table name
        json: true
      });
      assert.ok(balance !== "");
    });

    //9.2 query account's current balance
    it("get currency balance", async () => {
      const u3 = createU3();
      const balance = await u3.getCurrencyBalance({
        code: "utrio.token",
        account: account1,
        symbol: defaultConfig.symbol
      });
      assert.ok(Array.isArray(balance));
      assert.equal(balance[0].split(" ").length, 2);
      assert.equal(balance[0].split(" ")[1], defaultConfig.symbol);
    });

    //9.3 query currency's status
    it("get currency stats", async function() {
      const u3 = createU3();
      const stats = await u3.getCurrencyStats("utrio.token", defaultConfig.symbol);
      assert.ok(stats.hasOwnProperty(defaultConfig.symbol));
      assert.ok(stats["UGAS"].hasOwnProperty("supply"));
      assert.ok(stats["UGAS"].hasOwnProperty("max_supply"));
      assert.ok(stats["UGAS"].hasOwnProperty("issuer"));
    });
  });

  // 10 resource
  describe("resource", () => {

    // 10.1 buy resource and query resource
    it("lease_and_query", async () => {
      const config = { keyProvider: account1_pk };
      const u3 = createU3(config);
      const c = await u3.contract("ultrainio");

      //lease 1 slot for 2 days.
      //the last parameter should be the name of the side chain.
      //should connect to mainchain
      await c.resourcelease(account1, account2, 1, 2, "ultrainio");

      await U3Utils.test.wait(10000);

      const account = await u3.getAccountInfo({ account_name: account2 });
      assert.ok(account.chain_resource[0].lease_num > 0);
    });

  });

  // 11 random
  describe("random", () => {

    // 10.1 buy resource and query resource
    it("queryRandom", async () => {
      const u3 = createU3();
      const c = await u3.contract("utrio.rand");
      const tx = await c.query({
        keyProvider: "5JbedY3jGfNK7HcLXcqGqSYrmX2n8wQWqZAuq6K7Gcf4Dj62UfL",
        authorization: [`ben@active`]
      });
      let randomNumU64 = tx.processed.action_traces[0].return_value;
      console.log(randomNumU64);
      assert.ok(randomNumU64.split(",")[1] > 0);
    });
  });

  // 12 event
  describe("subscribe", () => {

    //make sure '192.168.1.5' is your local IP
    //and 'http://192.168.1.5:3002' is an accessible service form docker

    // 11.1 subscribe event
    it("subscribe", async () => {
      const config = { keyProvider: users[account].private_key };
      const u3 = createU3(config);
      const sub = await u3.registerEvent(account, "http://192.168.1.5:3002");
      console.log(sub);
    });

    // 11.2 unsubscribe event
    it("unsubscribe", async () => {
      const config = { keyProvider: users[account].private_key };
      const u3 = createU3(config);
      const unSub = await u3.unregisterEvent(account, "http://192.168.1.5:3002");
      console.log(unSub);
    });

    // 11.3 event listener
    it("unsubscribe", async () => {
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
