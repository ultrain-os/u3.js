/* eslint-env mocha */
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

function randomString (length = 8, charset = "abcdefghijklmnopqrstuvwxyz") {
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
      await u3.getChainInfo((err, info) => {
        if (err) throw err;
      });
    });
  });

  // 2. version info
  describe("version", () => {
    it("exposes a version number", () => {
      console.info(version);
    });
  });

  // 3. ecc utils
  describe("offline", () => {

    // 3.1 generate key pair by seed
    it("generateKeyPairBySeed", function() {
      let seed = randomName();
      let keys = ecc.generateKeyPairBySeed(seed);
      assert.equal(ecc.isValidPrivate(keys.private_key), true);
      assert.equal(ecc.isValidPublic(keys.public_key), true);
    });

    // 3.2 re-generate key pair by the same seed
    it("generateKeyPairBySeed(same keys with same seed)", function() {
      let seed = randomName();
      let keys1 = ecc.generateKeyPairBySeed(seed);
      let keys2 = ecc.generateKeyPairBySeed(seed);
      assert.equal(keys1.public_key, keys2.public_key);
      assert.equal(keys1.private_key, keys2.private_key);
    });

    // 3.3 generate key pair with mnemonic
    it("generateKeyPairWithMnemonic", function() {
      let result = ecc.generateKeyPairWithMnemonic();
      console.log(result);
      assert.ok((isString(result.mnemonic) && !isEmpty(result.mnemonic)), true);
      assert.equal(ecc.isValidPrivate(result.private_key), true);
      assert.equal(ecc.isValidPublic(result.public_key), true);
    });

    // 3.4 re-generate key pair by the same mnemonic
    it("generateKeyPairByMnemonic(same mnemonic same key pair)", function() {
      let result = ecc.generateKeyPairWithMnemonic();
      let result2 = ecc.generateKeyPairByMnemonic(result.mnemonic);
      assert.equal(result.public_key, result2.public_key);
      assert.equal(result.private_key, result2.private_key);
    });

    // 3.5 generate publicKey by privateKey
    it("generatePublicKeyByPrivateKey", function() {
      let result = ecc.generateKeyPairWithMnemonic();
      let publicKey = ecc.privateToPublic(result.private_key);
      assert.equal(publicKey, result.public_key);
    });

  });

  // 4. contract relative
  describe("contracts", () => {

    // 4.1 deploy contract
    it("deploy contract", async function() {
      const config = { keyProvider: users["bob"].private_key };
      const u3 = createU3(config);
      const trs = await u3.deploy(path.resolve(__dirname, "../contracts/token/token"), "bob");
      assert.equal(trs.transaction.transaction.actions.length, 2);
    });

    //4.2 get contract detail (wast,abi)
    it("getContract", async () => {
      const config = { keyProvider: users["bob"].private_key };
      const u3 = createU3(config);
      let account = "bob";
      const contract = await u3.getContract(account);
      assert.equal(contract.abi.version, "ultraio:1.0:UIP06");
    });

    //4.3 get abi
    it("getAbi", async () => {
      const config = { keyProvider: users["bob"].private_key };
      const u3 = createU3(config);
      let account = "bob";
      const abi = await u3.getAbi(account);
      assert.ok(!isEmpty(abi));
    });

    // 4.4 create custom token (uip06)
    it("create custom token", async () => {
      const config = { keyProvider: users["bob"].private_key };
      const u3 = createU3(config);
      let account = "bob";
      console.log("created token named: " + customCurrency);

      //these three method can ben called separately or together
      await u3.transaction(account, token => {
        token.create(account, "10000000.0000 " + customCurrency);
        token.issue(account, "10000000.0000 " + customCurrency, "issue");
      });

      U3Utils.test.wait(10000);

      //query currency stats
      await u3.getCurrencyStats({
        "code": "bob",
        "symbol": customCurrency
      });

      //before transfer
      await u3.getCurrencyBalance({
        code: "bob",
        symbol: customCurrency,
        account: "bob"
      });
      await u3.getCurrencyBalance({
        code: "bob",
        symbol: customCurrency,
        account: "ben"
      });

      //do transfer (this is the UIP standard for transfer token)
      const tr = await u3.contract(account);
      await tr.transfer("bob", "ben", "1.0000 " + customCurrency, "", { authorization: [`bob@active`] });

      //after transfer
      await u3.getCurrencyBalance({
        code: "bob",
        symbol: customCurrency,
        account: "bob"
      });
      await u3.getCurrencyBalance({
        code: "bob",
        symbol: customCurrency,
        account: "ben"
      });

    });

    // 4.5 query token holder and token symbol when issued
    it("get table by scope", async () => {
      const config = { keyProvider: users["bob"].private_key };
      const u3 = createU3(config);
      let account = "bob";

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

  // 5. transfer UGAS
  describe("transfer", () => {
    it("transfer UGAS", async () => {
      const keyProvider = () => {
        return [users["ben"].private_key];
      };
      const u3 = createU3();
      const tr = await u3.contract("utrio.token");
      return tr.transfer("ben", "bob", "1.0000 " + defaultConfig.symbol, "", { keyProvider }).then(tr => {
        assert.equal(tr.transaction.signatures.length, 1);
        assert.equal(typeof tr.transaction.signatures[0], "string");
      });
    });
  });

  // 6. blocks (10s per block)
  describe("blocks", () => {
    it("transaction confirm", async () => {
      const keyProvider = () => {
        return [users["ben"].private_key];
      };
      const u3 = createU3({ keyProvider });
      const tr = await u3.contract("utrio.token");
      const result = await tr.transfer("ben", "bob", "1.0000 " + defaultConfig.symbol, "");

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

  // 7. sign (sign separately)
  describe("sign", () => {
    it("offline sign", async () => {
      const config = { keyProvider: users["bob"].private_key };
      const u3 = createU3(config);
      const u3_offline = createU3({ sign: false, broadcast: false });
      let account = "bob";

      // precaution (If there is a token contract)
      await u3.transaction(account, token => {
        token.create(account, "10000000.0000 " + customCurrency);
        token.issue(account, "10000000.0000 " + customCurrency, "issue");
      });
      U3Utils.test.wait(3000);

      //using { sign: false, broadcast: false } to create a offline U3 instance and call some function
      const tr = await u3_offline.contract(account);
      const unsigned_transaction = await tr.transfer("bob", "alice", "1.0000 " + customCurrency, "", { authorization: [`bob@active`] });
      let signature = await u3_offline.sign(unsigned_transaction, users["bob"].private_key, defaultConfig.chainId);
      let signedTransaction = Object.assign({}, unsigned_transaction.transaction, { signatures: [signature] });
      //console.log(signedTransaction);

      //using {sign: true, broadcast: true} to create a online U3 instance and pushTx to chain
      let processedTransaction = await u3.pushTx(signedTransaction);
      assert.equal(processedTransaction.transaction_id, unsigned_transaction.transaction_id);
    });
  });

  // 8. create user
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

      await u3.createUser(params).then(tr => {
        return u3.getAccountInfo({
          account_name: name
        }).then(result => {
          assert.equal(result.account_name, name);
        });
      });
    });
  });

  // 9. transactions
  describe("transactions", () => {

    const keyProvider = () => users["bob"].private_key;

    // 9.1 get accounts array by public key
    it("getKeyAccounts", async () => {
      const u3 = createU3({ keyProvider });
      await u3.getKeyAccounts(users["ben"].public_key).then(accounts => {
        assert.ok(accounts.account_names.includes("ben"));
      });
    });

    // 9.2 get accountsInfo by name
    it("getAccountInfo", async () => {
      const u3 = createU3();
      await u3.getAccountInfo({
        account_name: "ben"
      }).then(result => {
        assert.equal(result.account_name, "ben");
      });
    });

  });

  // 10 database query
  describe("database", () => {

    const keyProvider = () => users["bob"].private_key;

    //Returns an object containing rows from the specified table.
    //before using it, you should know table and scope defined in the contract
    it("get table records", async () => {
      const u3 = createU3({ keyProvider });
      const balance = await u3.getTableRecords({
        code: "utrio.token",//smart contract name
        scope: "bob",//account name
        table: "accounts",//table name
        json: true
      });
      assert.ok(balance !== "");
    });

    // query account's current balance
    it("get currency balance", async () => {
      const u3 = createU3();
      await u3.getCurrencyBalance({
        code: "utrio.token",
        account: "ben",
        symbol: defaultConfig.symbol
      }).then(result => {
        console.log(result);
      });
    });

    // query currency's status
    it("get currency stats", async function() {
      const u3 = createU3({ keyProvider });
      await u3.getCurrencyStats("utrio.token", defaultConfig.symbol, (error, result) => {
        console.log(error, result);
      });
    });
  });

  // 11 resource
  describe("resource", () => {

    // 11.1 buy resource and query resource
    it("lease_and_query", async () => {
      const config = { keyProvider: users["ben"].private_key };
      const u3 = createU3(config);
      const name = randomName();
      const ppm = ecc.generateKeyPairWithMnemonic();
      let params = {
        creator: "ben",
        name: name,
        owner: ppm.public_key,
        active: ppm.public_key
      };
      await u3.createUser(params);

      const c = await u3.contract("ultrainio");
      await c.resourcelease("ben", name, 1, 10); // 1 slot for 10 days
      console.log(name);

      U3Utils.test.wait(1000);

      const balance = await u3.queryResource(name)
      console.log(balance);
    });
  });

  // 12 event
  describe("subscribe", () => {

    //make sure '192.168.1.5' is your local IP
    //and 'http://192.168.1.5:3002' is an accessible service form docker

    // 12.1 subscribe event
    it("subscribe", async () => {
      const config = { keyProvider: users["ben"].private_key };
      const u3 = createU3(config);
      const sub = await u3.registerEvent("ben", "http://192.168.1.5:3002");
      console.log(sub);
    });

    // 12.2 unsubscribe event
    it("unsubscribe", async () => {
      const config = { keyProvider: users["ben"].private_key };
      const u3 = createU3(config);
      const unSub = await u3.unregisterEvent("ben", "http://192.168.1.5:3002");
      console.log(unSub);
    });

    // 12.3 event listener
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
