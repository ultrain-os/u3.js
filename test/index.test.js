/* eslint-env mocha */
const assert = require("assert");
const fs = require("fs");
const path = require("path");

const { createU3, format, ecc, Fcbuffer, version } = require("../src");

const wif = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"; //ultrainio
const pubkey = "UTR6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV"; //ultrainio

const wif2 = "5JbWt7ikXhe8ihrwwxBd3WQoCCwDTUPshUrPZUU66bcMmb8SZqR";//other
const pubkey2 = "UTR7Dyga8Yw17AN18YogNNmzdf29cqfdZCjj23obrVdkuxqpUeieY";

// 1.打印链信息
describe("chainInfo", () => {
  it("chainInfo", (done) => {

    const u3 = createU3();
    u3.getChainInfo((err, info) => {
      if (err) {
        throw err;
      }
      console.log(info);
      done();
    });
  });
});

// 2.打印u3.js版本信息
describe("version", () => {
  it("exposes a version number", () => {
    assert.ok(version);
  });
});

// 3.离线(broadcast: false)
describe("offline", () => {
  const headers = {
    expiration: new Date().toISOString().split(".")[0], // Don't use `new Date` in production
    ref_block_num: 1,
    ref_block_prefix: 452435776,
    net_usage_words: 0,
    max_cpu_usage_ms: 0,
    delay_sec: 0,
    context_free_actions: [],
    transaction_extensions: []
  };

  const transactionHeaders = (expireInSeconds, callback) => {
    callback(null, headers);
  };

  //TODO 离线模式下 3.1 trx.transaction.signatures.length=1?
  /*  it("multi-signature", async function() {
      const u3 = createU3({
        keyProvider: [
          wif,
          ecc.seedPrivate('key2')
        ],
        //httpEndpoint: null,
        transactionHeaders
      });

      const trx = await u3.nonce(1, {authorization: 'ultrainio'})
      assert.equal(trx.transaction.signatures.length, 2, 'signature count')
    });*/

  // 3.2 离线模式transactionHeaders
  /*it("transactionHeaders callback", async function() {
    const u3 = createU3({
      keyProvider: wif,
      //httpEndpoint: null,
      transactionHeaders
    });

    return u3.transfer("ultrainio", "test3", "1 SYS", "", false).then(trx => {
      assert.deepEqual({
        expiration: trx.transaction.transaction.expiration,
        ref_block_num: trx.transaction.transaction.ref_block_num,
        ref_block_prefix: trx.transaction.transaction.ref_block_prefix,
        net_usage_words: 0,
        max_cpu_usage_ms: 0,
        delay_sec: 0,
        context_free_actions: [],
        transaction_extensions: []
      }, headers);

      assert.equal(trx.transaction.signatures.length, 1, "signature count");
    });
  });*/

  it("generateKeyPairBySeed", function() {
    let seed = randomName();
    let keys = ecc.generateKeyPairBySeed(seed);
    assert.equal(ecc.isValidPrivate(keys.private_key), true);
    assert.equal(ecc.isValidPublic(keys.public_key), true);
  });

  it("generateKeyPairBySeed(same keys with same seed)", function() {
    let seed = randomName();
    let keys1 = ecc.generateKeyPairBySeed(seed);
    let keys2 = ecc.generateKeyPairBySeed(seed);
    assert.equal(keys1.public_key, keys2.public_key);
    assert.equal(keys1.private_key, keys2.private_key);
  });

  it("generateKeyPairWithMnemonic", function() {
    let result = ecc.generateKeyPairWithMnemonic();
    console.log(result);
    assert.ok(_.isString((result.mnemonic) && !_.isEmpty(result.mnemonic)), true);
    assert.equal(ecc.isValidPrivate(result.private_key), true);
    assert.equal(ecc.isValidPublic(result.public_key), true);
  });

  it("generateKeyPairWithMnemonic(same mnemonic same key pair)", function() {
    let result = ecc.generateKeyPairWithMnemonic();
    let result2 = ecc.generateKeyPairByMnemonic(result.mnemonic);
    assert.equal(result.public_key, result2.public_key);
    assert.equal(result.private_key, result2.private_key);
  });

});

// some transactions that don't broadcast may require Api lookups
// if development
if (process.env["NODE_ENV"] === "development") {

  // 4
  /*describe("Contracts", () => {
    it("Messages do not sort", async function() {
      const local = createU3();
      const opts = { sign: false, broadcast: false };
      const tx = await local.transaction(["currency", "utrio.token"], ({ currency, ultrainio_token }) => {
        // make sure {account: 'utrio.token', ..} remains first
        ultrainio_token.transfer("ultrainio", "user", "1.1 SYS", "");

        // {account: 'currency', ..} remains second (reverse sort)
        currency.transfer("ultrainio", "user", "1.2 SYS", "");

      }, opts);
      assert.equal(tx.transaction.transaction.actions[0].account, "utrio.token");
      assert.equal(tx.transaction.transaction.actions[1].account, "currency");
    });
  });*/

  /*describe("Contract", () => {

    function deploy (contract, account = "ultrainio") {
      it(`deploy ${contract}@${account}`, async function() {
        this.timeout(4000);
        // console.log('todo, skipping deploy ' + `${contract}@${account}`)
        const config = { binaryen: require("binaryen"), keyProvider: wif };
        const u3 = createU3(config);

        const code = await u3.deploy(contract,account);

        // const wasm = fs.readFileSync(path.resolve(__dirname, `../build/${contract}.wasm`));
        const abi = fs.readFileSync(path.resolve(__dirname, `../build/${contract}.abi`));

        // u3.setcode(account, 0, 0, wasm);
        // u3.setabi(account, JSON.parse(abi));

        // const code = await u3.getContract(account);

        const diskAbi = JSON.parse(abi);
        delete diskAbi.____comment;
        if (!diskAbi.error_messages) {
          diskAbi.error_messages = [];
        }

        assert.deepEqual(diskAbi, code.abi);
      });
    }

    // When ran multiple times, deploying to the same account
    // avoids a same contract version deploy error.
    // TODO: undeploy contract instead (when API allows this)

    //deploy("ultrainio.msig","utrio.msig");
    deploy("ultrainio.token","utrio.token");
    //deploy("ultrainio.bios","utrio.bios");
    //deploy("ultrainio.UTRtem","utrio.UTRtem");
  });

  describe("Contracts Load", () => {
    /!**
     * must be a contract account
     * @param account
     *!/
    function load (account) {
      it(account, async function() {
        const config = { keyProvider: wif };
        const u3 = createU3(config);
        const contract = await u3.contract(account);
        assert(contract, "contract");
      });
    }

    load("utrio.token");
  });*/

  // 5 交易
  describe("transactions", () => {

    const signProvider = ({ sign, buf }) => sign(buf, wif);

    const promiseSigner = (args) => Promise.resolve(signProvider(args));

    // 5.1 方法使用
    it("usage", () => {
      const u3 = createU3({ signProvider });
      u3.transfer();
    });

    // 5.2 转账keyProvider
    it("keyProvider private key", () => {
      const keyProvider = () => {
        return [wif];
      };
      const u3 = createU3({ keyProvider });

      return u3.transfer("ultrainio", "test1", "1 SYS", "").then(tr => {
        assert.equal(tr.transaction.signatures.length, 1);
        assert.equal(typeof tr.transaction.signatures[0], "string");
      });
    });

    // 5.3 转账signProvider
    it("signProvider", () => {
      const customSignProvider = ({ buf, sign, transaction }) => {
        // All potential keys (UTR6MRy.. is the pubkey for 'wif')
        const pubkeys = [pubkey];

        return u3.getRequiredKeys(transaction, pubkeys).then(res => {
          // Just the required_keys need to sign
          assert.deepEqual(res.required_keys, pubkeys);
          return sign(buf, wif); // return hex string signature or array of signatures
        });
      };
      const u3 = createU3({ signProvider: customSignProvider });
      return u3.transfer("ultrainio", "test3", "2 SYS", "");
    });

    // TODO issue token by contract with ts version

    it("createUser", async () => {
      const u3 = createU3({ signProvider });
      const pubkey = pubkey2;
      const name = randomName();
      let params = {
        creator: "ultrainio",
        name: name,
        owner: pubkey,
        active: pubkey,
        updateable: 0,
        ram_bytes: 8912,
        stake_net_quantity: "1.0000 SYS",
        stake_cpu_quantity: "1.0000 SYS",
        transfer: 0
      };
      await u3.createUser(params).then(tr => {
        return u3.getAccountInfo({
          account_name: name
        }).then(result => {
          assert.equal(result.account_name, name);
        });
      });
    });

    it("buyram", async () => {
      const u3 = createU3({ signProvider });
      await u3.getAccountInfo({
        account_name: "test1"
      }).then(async before => {
        console.log("\n-----before:", before.ram_quota);
        return await u3.buyram({
          payer: "ultrainio",
          receiver: "test1",
          quant: "1 SYS"
        }).then(async tr => {
          return await u3.getAccountInfo({
            account_name: "test1"
          }).then(after => {
            console.log("\n-----after:", after.ram_quota);
            assert.ok(after.ram_quota - before.ram_quota > 0);
          });
        });
      });
    });

    //TODO not increase accurate,wby?
    it("buyrambytes", async () => {
      const u3 = createU3({ signProvider });
      await u3.getAccountInfo({
        account_name: "test1"
      }).then(async before => {
        console.log("\n-----before:", before.ram_quota, "\n");
        return await u3.buyrambytes({
          payer: "ultrainio",
          receiver: "test1",
          bytes: 10000
        }).then(async tr => {
          return await u3.getAccountInfo({
            account_name: "test1"
          }).then(after => {
            console.log("\n-----after:", after.ram_quota, "\n");
            assert.ok(after.ram_quota - before.ram_quota > 0);
          });
        });
      });
    });

    it("sellram", async () => {
      const signProvider = ({ sign, buf }) => sign(buf, wif2);
      const u3 = createU3({ signProvider });
      await u3.getAccountInfo({
        account_name: "test1"
      }).then(async before => {
        console.log("\n-----before:", before.ram_quota, "\n");
        return await u3.sellram({
          account: "test1",
          bytes: 10000
        }).then(async tr => {
          return await u3.getAccountInfo({
            account_name: "test1"
          }).then(after => {
            console.log("\n-----after:", after.ram_quota, "\n");
            assert.ok(after.ram_quota - before.ram_quota < 0);
          });
        });
      });
    });

    it("delegatebw", async () => {
      const u3 = createU3({ signProvider });
      await u3.getAccountInfo({
        account_name: "test1"
      }).then(async before => {
        console.log("\n-----before:", before.net_weight, before.cpu_weight, "\n");
        return await u3.delegatebw({
          from: "ultrainio",
          receiver: "test1",
          stake_net_quantity: "1 SYS",
          stake_cpu_quantity: "1 SYS",
          transfer: 0
        }).then(async tr => {
          return await u3.getAccountInfo({
            account_name: "test1"
          }).then(after => {
            console.log("\n-----after:", after.net_weight, after.cpu_weight, "\n");
            assert.ok(after.net_weight - before.net_weight > 0);
            assert.ok(after.cpu_weight - before.cpu_weight > 0);
          });
        });
      });
    });

    //TODO cannot undelegate bandwidth until the chain is activated (at least 15% of all tokens participate in voting)
    /*it("undelegatebw", async () => {
      const u3 = createU3({ signProvider });
      await u3.getAccountInfo({
        account_name: "test1"
      }).then(async before => {
        console.log("\n-----before:", before.net_weight, before.cpu_weight);
        return await u3.undelegatebw({
          from: "ultrainio",
          receiver: "test1",
          unstake_net_quantity: '0.0010 SYS',
          unstake_cpu_quantity: '0.0010 SYS',
        }).then(async tr => {
          return await u3.getAccountInfo({
            account_name: "test1"
          }).then(after => {
            console.log("\n-----after:", after.net_weight, after.cpu_weight);
            assert.ok(after.net_weight - before.net_weight < 0);
            assert.ok(after.cpu_weight - before.cpu_weight < 0);
          });
        });
      });
    });*/


    // get accounts array by public key
    it("getKeyAccounts", async () => {
      const u3 = createU3({ signProvider });
      await u3.getKeyAccounts(pubkey2).then(accounts => {
        assert.ok(accounts.account_names.includes("test1"));
      });
    });

    it("mockTransactions pass", () => {
      const u3 = createU3({ signProvider, mockTransactions: "pass" });
      return u3.transfer("ultrainio", "test3", "1 SYS", "").then(transfer => {
        assert(transfer.mockTransaction, "transfer.mockTransaction");
      });
    });

    it("mockTransactions fail", () => {
      const logger = { error: null };
      const u3 = createU3({ signProvider, mockTransactions: "fail", logger });
      return u3.transfer("ultrainio", "test3", "1 SYS", "").catch(error => {
        assert(error.indexOf("fake error") !== -1, "expecting: fake error");
      });
    });

    it("transfer (broadcast)", async () => {
      const u3 = createU3({ signProvider });
      return u3.transfer("ultrainio", "test2", "1 SYS", "");
    });

    it("transfer custom token precision (broadcast)", () => {
      const u3 = createU3({ signProvider });
      return u3.transfer("ultrainio", "test3", "1.618 SYS", "");
    });

    it("transfer custom authorization (broadcast)", () => {
      const u3 = createU3({ signProvider });
      return u3.transfer("ultrainio", "test3", "1 SYS", "", { authorization: "ultrainio@owner" });
    });

    it("transfer custom authorization sorting (no broadcast)", () => {
      const u3 = createU3({ signProvider });
      return u3.transfer("ultrainio", "test3", "1 SYS", "",
        { authorization: ["test3@owner", "ultrainio@owner"], broadcast: false }
      ).then(({ transaction }) => {
        const ans = [
          { actor: "test3", permission: "owner" },
          { actor: "ultrainio", permission: "owner" }
        ];
        assert.deepEqual(transaction.transaction.actions[0].authorization, ans);
      });
    });

    it("transfer (no broadcast)", () => {
      const u3 = createU3({ signProvider });
      return u3.transfer("ultrainio", "test3", "1 SYS", "", { broadcast: false });
    });

    it("transfer (no broadcast, no sign)", () => {
      const u3 = createU3({ signProvider });
      const opts = { broadcast: false, sign: false };
      return u3.transfer("ultrainio", "test3", "1 SYS", "", opts).then(tr =>
        assert.deepEqual(tr.transaction.signatures, [])
      );
    });

    it("transfer sign promise (no broadcast)", () => {
      const u3 = createU3({ signProvider: promiseSigner });
      return u3.transfer("ultrainio", "test3", "1 SYS", "", false);
    });

    it("action to unknown contract", () => {
      const logger = { error: null };
      return createU3({ signProvider, logger }).contract("unknown432")
        .then(() => {
          throw "expecting error";
        })
        .catch(error => {
          assert(error);
        });
    });

    it("action to contract", () => {
      const keyProvider = () => {
        return [
          wif
        ];
      };
      const u3 = createU3({ keyProvider });

      return u3.contract("utrio.token").then(token => {

        return token.transfer("ultrainio", "test1", "1 SYS", "")
        // transaction sent on each command
          .then(tr => {
            assert.equal(1, tr.transaction.transaction.actions.length);

            return token.transfer("ultrainio", "test2", "1 SYS", "")
              .then(tr => {
                assert.equal(1, tr.transaction.transaction.actions.length);
              });
          });
      }).then(r => {
        assert(r == undefined);
      });
    });

    // need to give the test3 private key,eg wif2
    it("action to contract atomic", async function() {
      // keyProvider should return an array of keys
      const keyProvider = () => {
        return [
          wif,
          wif2
        ];
      };
      const u3 = createU3({ keyProvider });

      let amt = 1; // for unique transactions
      const trTest = (ultrainio_token) => {
        if (ultrainio_token.transfer) {
          assert(ultrainio_token.transfer("ultrainio", "test1", amt + " SYS", "") == null);
          assert(ultrainio_token.transfer("test1", "ultrainio", (amt++) + " SYS", "") == null);
        } else {
          let token = ultrainio_token["utrio_token"];
          assert(token.transfer("ultrainio", "test1", amt + " SYS", "") == null);
          assert(token.transfer("test1", "ultrainio", (amt++) + " SYS", "") == null);
        }
      };

      const assertTr = tr => {
        assert.equal(2, tr.transaction.transaction.actions.length);
      };

      //  contracts can be a string or array

      await assertTr(await u3.transaction(["utrio.token"], (ultrainio_token) => {
          trTest(ultrainio_token);
        })
      );

      await assertTr(await u3.transaction("utrio.token", (ultrainio_token) => {
          trTest(ultrainio_token);
        })
      );
    });

    // 查询帐户余额
    it("get currenc balance", async () => {
      // const signProvider2 = ({ sign, buf }) => sign(buf, "5Jp11wdvQFc89B73NGRu3vJi6rgm4wjQ6BywFgaKMyH94ZRko3r");
      const u3 = createU3({ signProvider });
      await u3.getCurrencyBalance({
        code: "utrio.token",
        account: "ultrainio",
        symbol: "SYS"
      }).then(result => {
        console.log(result);
      });
    });

    // 查询货币状态
    it("get currency stats", async function() {
      const u3 = createU3({ signProvider });
      await u3.getCurrencyStats("utrio.token", "SYS", (error, result) => {
        //console.log(error, result)
      });
    });

    it("action to contract (contract tr nesting)", function() {
      this.timeout(4000);
      const tn = createU3({ signProvider });
      return tn.contract("utrio.token").then(ultrainio_token => {
        return ultrainio_token.transaction(tr => {
          tr.transfer("ultrainio", "test3", "1 SYS", "");
          tr.transfer("ultrainio", "test1", "2 SYS", "");
        }).then(() => {
          return ultrainio_token.transfer("ultrainio", "test3", "3 SYS", "");
        });
      });
    });

    it("multi-action transaction (broadcast)", () => {
      const u3 = createU3({ signProvider });

      return u3.transaction(tr => {
        assert(tr.transfer("ultrainio", "test3", "1 SYS", "") == null);
        assert(tr.transfer("ultrainio", "test1", "1 SYS", "") == null);
        // TODO the follow way throw exception
        //assert(tr.transfer({from: 'ultrainio', to: 'user', quantity: '1 SYS', memo: ''}) == null)
      }).then(tr => {
        assert.equal(2, tr.transaction.transaction.actions.length);
      });

    });

    it("multi-action transaction no inner callback", () => {
      const signProvider2 = ({ sign, buf }) => sign(buf, "5KYKw6jYLKR16ZZGEmZGJ12WUNyVEAaZHWS31ijgWEdv1timojk");

      const u3 = createU3({ signProvider2 });
      return u3.transaction(tr => {
        tr.transfer("ultrainio", "ultrainio", "1 SYS", "", cb => {

        });
      })
        .then(() => {
          throw "expecting rollback";
        })
        .catch(error => {
          assert(/Callback during a transaction/.test(error), error);
        });
    });

    it("multi-action transaction error rollback", () => {
      const u3 = createU3({ signProvider });
      return u3.transaction(tr => {
        throw "rollback";
      })
        .then(() => {
          throw "expecting rollback";
        })
        .catch(error => {
          assert(/rollback/.test(error), error);
        });
    });

    it("multi-action transaction Promise.reject rollback", () => {
      const u3 = createU3({ signProvider });
      return u3.transaction(tr => Promise.reject("rollback"))
        .then(() => {
          throw "expecting rollback";
        })
        .catch(error => {
          assert(/rollback/.test(error), error);
        });
    });

    it("custom transfer", () => {
      const u3 = createU3({ signProvider });
      return u3.transaction(
        {
          actions: [
            {
              account: "ultrainio",
              name: "transfer",
              data: {
                from: "ultrainio",
                to: "test3",
                quantity: "13 SYS",
                memo: "爱"
              },
              authorization: [{
                actor: "ultrainio",
                permission: "active"
              }]
            }
          ]
        },
        { broadcast: false }
      );
    });

  });

  // ./ultrainioc set contract currency build/contracts/currency/currency.wasm build/contracts/currency/currency.abi
  /*it("Transaction ABI lookup", async function() {
    const u3 = createU3();
    const tx = await u3.transaction(
      {
        actions: [
          {
            account: "ultrainio",
            name: "transfer",
            data: {
              from: "ultrainio",
              to: "test3",
              quantity: "13 SYS",
              memo: ""
            },
            authorization: [{
              actor: "ultrainio",
              permission: "active"
            }]
          }
        ]
      },
      { sign: false, broadcast: false }
    );
    assert.equal(tx.transaction.transaction.actions[0].account, "ultrainio");
  });*/

}

const randomName = () => {
  const name = String(Math.round(Math.random() * 1000000000)).replace(/[0,6-9]/g, "");
  return "b" + name + "111222333444".substring(0, 11 - name.length); // always 12 in length
};

const randomAsset = () =>
  ecc.sha256(String(Math.random())).toUpperCase().replace(/[^A-Z]/g, "").substring(0, 7);
