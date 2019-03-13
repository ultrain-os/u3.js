const assert = require("assert");
const isEmpty = require("lodash.isempty");
const isString = require("lodash.isstring");
const fs = require("fs");
const path = require("path");
const defaultConfig = require("../src/config");
const U3Utils = require("u3-utils/src");

const { createU3, format, ecc, Fcbuffer, listener, version } = require("../src");

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

describe("u3.js", () => {

  // 1. chain info
  describe("chainInfo", () => {
    it("chainInfo", async () => {
      const u3 = createU3();
      await u3.getChainInfo();
    });
  });

  // 2. ecc utils
  describe("offline", () => {

    // 2.1 generate key pair by seed
    it("generateKeyPairBySeed", function() {
      let seed = randomName();
      let keys = ecc.generateKeyPairBySeed(seed);
      assert.equal(ecc.isValidPrivate(keys.private_key), true);
      assert.equal(ecc.isValidPublic(keys.public_key), true);
    });

    // 2.2 re-generate key pair by the same seed
    it("generateKeyPairBySeed(same keys with same seed)", function() {
      let seed = randomName();
      let keys1 = ecc.generateKeyPairBySeed(seed);
      let keys2 = ecc.generateKeyPairBySeed(seed);
      assert.equal(keys1.public_key, keys2.public_key);
      assert.equal(keys1.private_key, keys2.private_key);
    });

    // 2.3 generate key pair with mnemonic
    it("generateKeyPairWithMnemonic", function() {
      let result = ecc.generateKeyPairWithMnemonic();
      console.log(result);
      assert.ok((isString(result.mnemonic) && !isEmpty(result.mnemonic)), true);
      assert.equal(ecc.isValidPrivate(result.private_key), true);
      assert.equal(ecc.isValidPublic(result.public_key), true);
    });

    // 2.4 re-generate key pair by the same mnemonic
    it("generateKeyPairByMnemonic(same mnemonic same key pair)", function() {
      let result = ecc.generateKeyPairWithMnemonic();
      let result2 = ecc.generateKeyPairByMnemonic(result.mnemonic);
      assert.equal(result.public_key, result2.public_key);
      assert.equal(result.private_key, result2.private_key);
    });

    // 2.5 generate publicKey by privateKey
    it("generatePublicKeyByPrivateKey", function() {
      let result = ecc.generateKeyPairWithMnemonic();
      let publicKey = ecc.privateToPublic(result.private_key);
      assert.equal(publicKey, result.public_key);
    });

  });

  // 3. contract relative
  describe("contracts", () => {

    // 3.1 deploy contract
    it("deploy contract", async () => {
      const config = { keyProvider: users["ben"].private_key };
      const u3 = createU3(config);
      const tr = await u3.deploy(path.resolve(__dirname, "../contracts/token/token"), "ben");
      assert.equal(tr.transaction.transaction.actions.length, 2);
    });

    //3.2 get contract detail (wast,abi)
    it("getContract", async () => {
      const config = { keyProvider: users["ben"].private_key };
      const u3 = createU3(config);
      let account = "ben";
      const contract = await u3.getContract(account);
      assert.equal(contract.abi.version, "ultraio:1.0:UIP06");
    });

    //3.3 get abi
    it("getAbi", async () => {
      const config = { keyProvider: users["ben"].private_key };
      const u3 = createU3(config);
      let account = "ben";
      const abi = await u3.getAbi(account);
      assert.ok(!isEmpty(abi));
    });

    // 3.4 create custom token (uip06)
    it("create custom token", async () => {
      const config = { keyProvider: users["ben"].private_key };
      const u3 = createU3(config);
      let account = "ben";
      console.log("created token named: " + customCurrency);

      //these three method can ben called separately or together
      await u3.transaction(account, token => {
        token.create(account, "10000000.0000 " + customCurrency);
        token.issue(account, "10000000.0000 " + customCurrency, "issue");
      });

      U3Utils.test.wait(10000);

      //query currency stats
      await u3.getCurrencyStats({
        "code": "ben",
        "symbol": customCurrency
      });

      //before transfer
      await u3.getCurrencyBalance({
        code: "ben",
        symbol: customCurrency,
        account: "ben"
      });
      await u3.getCurrencyBalance({
        code: "ben",
        symbol: customCurrency,
        account: "bob"
      });

      //do transfer (this is the UIP standard for transfer token)
      const c = await u3.contract(account);
      await c.transfer("ben", "bob", "1.0000 " + customCurrency, "", { authorization: [`ben@active`] });

      //after transfer
      await u3.getCurrencyBalance({
        code: "ben",
        symbol: customCurrency,
        account: "bob"
      });
      await u3.getCurrencyBalance({
        code: "ben",
        symbol: customCurrency,
        account: "ben"
      });

    });

    // 3.5 query token holder and token symbol when issued
    it("get table by scope", async () => {
      const config = { keyProvider: users["ben"].private_key };
      const u3 = createU3(config);
      let account = "ben";

      //all holder accounts which held tokens created by the creator
      const holders_arr = await u3.getTableByScope({
        code: account,//token creator
        table: "accounts" //token table name
      });
      for (let h in holders_arr.rows) {
        let holder_account = format.decodeName(holders_arr.rows[h].scope, false);
        console.log(holder_account);
      }

      //all token symbols created by the creator
      const symbols_arr = await u3.getTableByScope({
        code: account,//token creator
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
    it("transfer UGAS", async () => {
      const keyProvider = [users["ben"].private_key];
      const u3 = createU3({keyProvider});
      const c = await u3.contract("utrio.token");
      const tr = await c.transfer("ben", "bob", "1.0000 " + defaultConfig.symbol, "");
      assert.equal(typeof tr.transaction_id, "string");
    });
  });

  // 5. blocks (10s per block)
  describe("blocks", () => {
    it("transaction confirm", async () => {
      const keyProvider = [users["ben"].private_key];
      const u3 = createU3({ keyProvider });
      const c = await u3.contract("utrio.token");
      const result = await c.transfer("ben", "bob", "1.0000 " + defaultConfig.symbol, "");

      //wait until block confirm
      let tx = await u3.getTxByTxId(result.transaction_id);
      while (!tx.irreversible) {
        await U3Utils.test.wait(1000);
        tx = await u3.getTxByTxId(result.transaction_id);
        if (tx.irreversible) {
          console.log(tx);
          break;
        }
      }
    });
  });

  // 6. sign (sign separately)
  describe("sign", () => {
    it("offline sign", async () => {
      const config = { keyProvider: users["ben"].private_key };
      const u3 = createU3(config);
      const u3_offline = createU3({ sign: false, broadcast: false });
      let account = "ben";

      let symbol = "";
      const symbols_arr = await u3.getTableByScope({
        code: account,//token creator
        table: "stat"//token table scope
      });
      for (let s in symbols_arr.rows) {
        symbol = format.decodeSymbolName(symbols_arr.rows[s].scope);
        console.log(symbol);
        break;
      }

      //using { sign: false, broadcast: false } to create a offline U3 instance and call some function
      const tr = await u3_offline.contract(account);
      const unsigned_transaction = await tr.transfer("ben", "alice", "1.0000 " + symbol, "", { authorization: [`ben@active`] });
      let signature = await u3_offline.sign(unsigned_transaction, users["ben"].private_key, defaultConfig.chainId);
      let signedTransaction = Object.assign({}, unsigned_transaction.transaction, { signatures: [signature] });
      //console.log(signedTransaction);

      //using {sign: true, broadcast: true} to create a online U3 instance and pushTx to chain
      let processedTransaction = await u3.pushTx(signedTransaction);
      assert.equal(processedTransaction.transaction_id, unsigned_transaction.transaction_id);
    });
  });

  // 7. create user
  describe("createUser", () => {
    it("createUser", async () => {
      const u3 = createU3({ keyProvider: users["ben"].private_key });
      const name = randomName();
      const ppm = ecc.generateKeyPairWithMnemonic();
      let params = {
        creator: "ben",
        name: name,
        owner: ppm.public_key,
        active: ppm.public_key
      };

      await u3.createUser(params);
      const account = await u3.getAccountInfo({ account_name: name });
      assert.equal(account.account_name, name);
    });
  });

  // 8. transactions
  describe("transactions", () => {

    const keyProvider = () => users["ben"].private_key;

    // 8.1 get accounts array by public key
    it("getKeyAccounts", async () => {
      const u3 = createU3({ keyProvider });
      const accounts = await u3.getKeyAccounts(users["ben"].public_key);
      assert.ok(accounts.account_names.includes("ben"));
    });

    // 8.2 get accountsInfo by name
    it("getAccountInfo", async () => {
      const name = "ben";
      const u3 = createU3();
      const account = await u3.getAccountInfo({ account_name: name });
      assert.equal(account.account_name, name);
    });

  });

  // 9. database query
  describe("database", () => {

    const keyProvider = () => users["ben"].private_key;

    //9.1 Returns an object containing rows from the specified table.
    //before using it, you should know table and scope defined in the contract
    it("get table records", async () => {
      const u3 = createU3({ keyProvider });
      const balance = await u3.getTableRecords({
        code: "utrio.token",//smart contract name
        scope: "ben",//account name
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
        account: "ben",
        symbol: defaultConfig.symbol
      });
      assert.ok(Array.isArray(balance));
      assert.equal(balance[0].split(" ").length, 2);
      assert.equal(balance[0].split(" ")[1], "UGAS");
    });

    //9.3 query currency's status
    it("get currency stats", async function() {
      const u3 = createU3({ keyProvider });
      const stats = await u3.getCurrencyStats("utrio.token", defaultConfig.symbol);
      assert.ok(stats.hasOwnProperty('UGAS'));
      assert.ok(stats['UGAS'].hasOwnProperty('supply'));
      assert.ok(stats['UGAS'].hasOwnProperty('max_supply'));
      assert.ok(stats['UGAS'].hasOwnProperty('issuer'));
    });
  });

  // 10 resource
  describe("resource", () => {

    // 10.1 buy resource and query resource
    it("lease_and_query", async () => {
      const config = { keyProvider: users["ben"].private_key };
      const u3 = createU3(config);
      const c = await u3.contract("ultrainio");
      await c.resourcelease("ben", 'bob', 1, 2); // 1 slot for 2 days

      U3Utils.test.wait(1000);

      const balance = await u3.queryResource('bob');
      assert.equal(balance['rows'][0]['owner'],'bob');
    });
  });

  // 11 event
  describe("subscribe", () => {

    //make sure '192.168.1.5' is your local IP
    //and 'http://192.168.1.5:3002' is an accessible service form docker

    // 11.1 subscribe event
    it("subscribe", async () => {
      const config = { keyProvider: users["ben"].private_key };
      const u3 = createU3(config);
      const sub = await u3.registerEvent("ben", "http://192.168.1.5:3002");
      console.log(sub);
    });

    // 11.2 unsubscribe event
    it("unsubscribe", async () => {
      const config = { keyProvider: users["ben"].private_key };
      const u3 = createU3(config);
      const unSub = await u3.unregisterEvent("ben", "http://192.168.1.5:3002");
      console.log(unSub);
    });

    // 11.3 event listener
    it("unsubscribe", async () => {
      // just do some biz in the callback
      // the data is the message that ultrain will push to you
      listener(function(data) {
        console.log(data);
      });

      U3Utils.test.wait(2000);

      //emit event defined  in the contract action
      //...
    });

  });
});
