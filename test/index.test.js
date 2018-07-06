/* eslint-env mocha */
const assert = require("assert");
const fs = require("fs");
const path = require("path");

const Ultrain = require("../src");
const configDefaults = require("../src/config");
const { ecc } = Ultrain.modules;

const wif = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"; //ultrainio
const wif2 = "5JXs6Q5QVibj1eWpPqGC5jdCnZHoREC9u35sEDPrmVHEaYf1JYt"; //utrio.token

// 打印链信息
describe("chainInfo", () => {
  it("chainInfo", (done) => {

    const ultrain = Ultrain();
    ultrain.getInfo((err, info) => {
      if (err) {
        throw err;
      }
      console.log(info);
      done();
    });
  });
});

describe("version", () => {
  it("exposes a version number", () => {
    assert.ok(Ultrain.version);
  });
});

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
    callback(null/*error*/, headers);
  };

  /*it("multi-signature", async function() {
    const ultrain = Ultrain({
      keyProvider: [
        wif,
        ecc.seedPrivate("key2")
      ],
      //httpEndpoint: null,
      transactionHeaders
    });

    ultrain.nonce(1, { authorization: "ultrainio" }).then((trx) => {
      assert.equal(trx.transaction.signatures.length, 2, "signature count");
    });
  });*/

  it("transactionHeaders callback", async function() {
    const ultrain = Ultrain({
      keyProvider: wif,
      //httpEndpoint: null,
      transactionHeaders
    });

    return ultrain.transfer("ultrainio", "tester", "1 SYS", "", false).then(trx => {
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
  });

});

// some transactions that don't broadcast may require Api lookups
// if development
if (process.env["NODE_ENV"] === "development") {

  /*describe("Contracts", () => {
    it("Messages do not sort", async function() {
      const local = Ultrain();
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

  describe("Contract", () => {

    function deploy (contract, account = "ultrainio") {
      it(`deploy ${contract}@${account}`, async function() {
        this.timeout(4000);
        // console.log('todo, skipping deploy ' + `${contract}@${account}`)
        const config = { binaryen: require("binaryen"), keyProvider: wif2 };
        const ultrain = Ultrain(config);

        const wasm = fs.readFileSync(path.resolve(__dirname, `../contracts/${contract}/${contract}.wasm`));
        const abi = fs.readFileSync(path.resolve(__dirname, `../contracts/${contract}/${contract}.abi`));

        ultrain.setcode(account, 0, 0, wasm);
        ultrain.setabi(account, JSON.parse(abi));

        const code = await ultrain.getCode(account);

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
    deploy("ultrainio.token", "utrio.token");
    //deploy("ultrainio.bios","utrio.bios");
    //deploy("ultrainio.system","utrio.system");
  });

  describe("Contracts Load", () => {
    /**
     * must be a contract account
     * @param account
     */
    function load (account) {
      it(account, async function() {
        const config = { keyProvider: wif };
        const ultrain = Ultrain(config);
        const contract = await ultrain.contract(account);
        assert(contract, "contract");
      });
    }

    load("utrio.token");
  });

  describe("transactions", () => {
    const signProvider = ({ sign, buf }) => sign(buf, wif);

    const promiseSigner = (args) => Promise.resolve(signProvider(args));

    it("usage", () => {
      const ultrain = Ultrain({ signProvider });
      ultrain.transfer();
    });

    // A keyProvider can return private keys directly..
    it("keyProvider private key", () => {

      // keyProvider should return an array of keys
      const keyProvider = () => {
        return [wif];
      };

      const ultrain = Ultrain({ keyProvider });

      return ultrain.transfer("ultrainio", "tester", "1 SYS", "", false).then(tr => {
        assert.equal(tr.transaction.signatures.length, 1);
        assert.equal(typeof tr.transaction.signatures[0], "string");
      });
    });

    it("keyProvider multiple private keys (get_required_keys)", () => {

      // keyProvider should return an array of keys
      const keyProvider = () => {
        return [
          "5K84n2nzRpHMBdJf95mKnPrsqhZq7bhUvrzHyvoGwceBHq8FEPZ",
          wif
        ];
      };

      const ultrain = Ultrain({ keyProvider });

      return ultrain.transfer("ultrainio", "tester", "1.274 SYS", "", false).then(tr => {
        assert.equal(tr.transaction.signatures.length, 1);
        assert.equal(typeof tr.transaction.signatures[0], "string");
      });
    });

    it("keyProvider public keys then private key", () => {
      const pubkey = ecc.privateToPublic(wif);

      // keyProvider should return a string or array of keys.
      const keyProvider = ({ transaction, pubkeys }) => {
        if (!pubkeys) {
          assert.equal(transaction.actions[0].name, "transfer");
          return [pubkey];
        }

        if (pubkeys) {
          assert.deepEqual(pubkeys, [pubkey]);
          return [wif];
        }
        assert(false, "unexpected keyProvider callback");
      };

      const ultrain = Ultrain({ keyProvider });

      return ultrain.transfer("ultrainio", "tester", "9 SYS", "", false).then(tr => {
        assert.equal(tr.transaction.signatures.length, 1);
        assert.equal(typeof tr.transaction.signatures[0], "string");
      });
    });

    it("signProvider", () => {
      const customSignProvider = ({ buf, sign, transaction }) => {

        // All potential keys (UTR6MRy.. is the pubkey for 'wif')
        const pubkeys = ["UTR6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV"];

        return ultrain.getRequiredKeys(transaction, pubkeys).then(res => {
          // Just the required_keys need to sign
          assert.deepEqual(res.required_keys, pubkeys);
          return sign(buf, wif); // return hex string signature or array of signatures
        });
      };
      const ultrain = Ultrain({ signProvider: customSignProvider });
      return ultrain.transfer("ultrainio", "tester", "2 SYS", "", false);
    });

    // TODO issue token by contract with ts version
    /*    it("create asset", async function() {
              const ultrain = Ultrain({ signProvider });
              const pubkey = "UTR6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV";
              const auth = {
                authorization: [{
                  actor: "ultrainio",
                  permission: "active"
                }]
              };
              await ultrain.create("ultrainio", "10000 " + randomAsset(), auth);
              await ultrain.create("ultrainio", "10000.00 " + randomAsset(), auth);
            });*/

    it("newaccount (broadcast)", async () => {
      const ultrain = Ultrain({ signProvider });
      const pubkey = "UTR6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV";
      const name = randomName();
      //console.log(ecc.privateToPublic(wif))

      return ultrain.transaction(tr => {
        tr.newaccount({
          creator: "ultrainio",
          name,
          owner: pubkey,
          active: pubkey
        });
        tr.buyrambytes({
          payer: "ultrainio",
          receiver: name,
          bytes: 8192
        });
        tr.delegatebw({
          from: "ultrainio",
          receiver: name,
          stake_net_quantity: "1.0000 SYS",
          stake_cpu_quantity: "1.0000 SYS",
          transfer: 0
        });
      });
    });

    it("mockTransactions pass", () => {
      const ultrain = Ultrain({ signProvider, mockTransactions: "pass" });
      return ultrain.transfer("ultrainio", "tester", "1 SYS", "").then(transfer => {
        assert(transfer.mockTransaction, "transfer.mockTransaction");
      });
    });

    it("mockTransactions fail", () => {
      const logger = { error: null };
      const ultrain = Ultrain({ signProvider, mockTransactions: "fail", logger });
      return ultrain.transfer("ultrainio", "tester", "1 SYS", "").catch(error => {
        assert(error.indexOf("fake error") !== -1, "expecting: fake error");
      });
    });

    it("transfer (broadcast)", async () => {
      const ultrain = Ultrain({ signProvider });
      return ultrain.transfer("ultrainio", "tester", "1 SYS", "");
    });

    it("transfer custom token precision (broadcast)", () => {
      const ultrain = Ultrain({ signProvider });
      return ultrain.transfer("ultrainio", "tester", "1.618 SYS", "");
    });

    it("transfer custom authorization (broadcast)", () => {
      const ultrain = Ultrain({ signProvider });
      return ultrain.transfer("ultrainio", "tester", "1 SYS", "", { authorization: "ultrainio@owner" });
    });

    it("transfer custom authorization sorting (no broadcast)", () => {
      const ultrain = Ultrain({ signProvider });
      return ultrain.transfer("ultrainio", "tester", "1 SYS", "",
        { authorization: ["tester@owner", "ultrainio@owner"], broadcast: false }
      ).then(({ transaction }) => {
        const ans = [
          { actor: "tester", permission: "owner" },
          { actor: "ultrainio", permission: "owner" }
        ];
        assert.deepEqual(transaction.transaction.actions[0].authorization, ans);
      });
    });

    it("transfer (no broadcast)", () => {
      const ultrain = Ultrain({ signProvider });
      return ultrain.transfer("ultrainio", "tester", "1 SYS", "", { broadcast: false });
    });

    it("transfer (no broadcast, no sign)", () => {
      const ultrain = Ultrain({ signProvider });
      const opts = { broadcast: false, sign: false };
      return ultrain.transfer("ultrainio", "tester", "1 SYS", "", opts).then(tr =>
        assert.deepEqual(tr.transaction.signatures, [])
      );
    });

    it("transfer sign promise (no broadcast)", () => {
      const ultrain = Ultrain({ signProvider: promiseSigner });
      return ultrain.transfer("ultrainio", "tester", "1 SYS", "", false);
    });

    it("action to unknown contract", () => {
      const logger = { error: null };
      return Ultrain({ signProvider, logger }).contract("unknown432")
        .then(() => {throw "expecting error";})
        .catch(error => {
          assert(/unknown key/.test(error.toString()),
            "expecting \"unknown key\" error action, instead got: " + error);
        });
    });

    it("action to contract", () => {
      const keyProvider = () => {
        return [
          wif,
        ];
      };
      const ultrain = Ultrain({ keyProvider });

      return ultrain.contract("utrio.token").then(token => {

        return token.transfer("ultrainio", "tester", "1 SYS", "")
        // transaction sent on each command
          .then(tr => {
            assert.equal(1, tr.transaction.transaction.actions.length);

            return token.transfer("ultrainio", "user", "1 SYS", "")
              .then(tr => {assert.equal(1, tr.transaction.transaction.actions.length);});
          });
      }).then(r => {assert(r == undefined);});
    });

    // need to give the tester private key,eg wif2
    /*it("action to contract atomic", async function() {
      // keyProvider should return an array of keys
      const keyProvider = () => {
        return [
          wif,
          wif2
        ];
      };
      const ultrain = Ultrain({ keyProvider });

      let amt = 1; // for unique transactions
      const trTest = (ultrainio_token) => {
        if (ultrainio_token.transfer) {
          assert(ultrainio_token.transfer("ultrainio", "tester", amt + " SYS", "") == null);
          assert(ultrainio_token.transfer("tester", "ultrainio", (amt++) + " SYS", "") == null);
        } else {
          let token = ultrainio_token["utrio_token"];
          assert(token.transfer("ultrainio", "tester", amt + " SYS", "") == null);
          assert(token.transfer("tester", "ultrainio", (amt++) + " SYS", "") == null);
        }
      };

      const assertTr = tr => {
        assert.equal(2, tr.transaction.transaction.actions.length);
      };

      //  contracts can be a string or array

      await assertTr(await ultrain.transaction(["utrio.token"], (ultrainio_token) => {
          trTest(ultrainio_token);
        })
      );

      await assertTr(await ultrain.transaction("utrio.token", (ultrainio_token) => {
          trTest(ultrainio_token);
        })
      );
    });*/

    // 查询帐户余额
    it("get currenc balance", async () => {
      const ultrain = Ultrain({ signProvider });
      await ultrain.getCurrencyBalance({
        code: "utrio.token",
        account: "ultrainio",
        symbol: "SYS"
      }).then(result => {
        //console.log(result);
      });
    });

    // 查询货币状态
    it("get currency stats", async function() {
      const ultrain = Ultrain({ signProvider });
      await ultrain.getCurrencyStats("utrio.token", "UTR", (error, result) => {
        //console.log(error, result)
      });
    });

    it("action to contract (contract tr nesting)", function() {
      this.timeout(4000);
      const tn = Ultrain({ signProvider });
      return tn.contract("utrio.token").then(ultrainio_token => {
        return ultrainio_token.transaction(tr => {
          tr.transfer("ultrainio", "tester", "1 SYS", "");
          tr.transfer("ultrainio", "user", "2 SYS", "");
        }).then(() => {
          return ultrainio_token.transfer("ultrainio", "tester", "3 SYS", "");
        });
      });
    });

    it("multi-action transaction (broadcast)", () => {
      const ultrain = Ultrain({ signProvider });

      return ultrain.transaction(tr => {
        assert(tr.transfer("ultrainio", "tester", "1 SYS", "") == null);
        assert(tr.transfer("ultrainio", "user", "1 SYS", "") == null);
        // TODO the follow way throw exception
        //assert(tr.transfer({from: 'ultrainio', to: 'user', quantity: '1 SYS', memo: ''}) == null)
      }).then(tr => {
        assert.equal(2, tr.transaction.transaction.actions.length);
      });

    });

    it("multi-action transaction no inner callback", () => {
      const ultrain = Ultrain({ signProvider });
      return ultrain.transaction(tr => {
        tr.transfer("ultrainio", "ultrainio", "1 SYS", "", cb => {});
      })
        .then(() => {throw "expecting rollback";})
        .catch(error => {
          assert(/Callback during a transaction/.test(error), error);
        });
    });

    it("multi-action transaction error rollback", () => {
      const ultrain = Ultrain({ signProvider });
      return ultrain.transaction(tr => {throw "rollback";})
        .then(() => {throw "expecting rollback";})
        .catch(error => {
          assert(/rollback/.test(error), error);
        });
    });

    it("multi-action transaction Promise.reject rollback", () => {
      const ultrain = Ultrain({ signProvider });
      return ultrain.transaction(tr => Promise.reject("rollback"))
        .then(() => {throw "expecting rollback";})
        .catch(error => {
          assert(/rollback/.test(error), error);
        });
    });

    it("custom transfer", () => {
      const ultrain = Ultrain({ signProvider });
      return ultrain.transaction(
        {
          actions: [
            {
              account: "ultrainio",
              name: "transfer",
              data: {
                from: "ultrainio",
                to: "tester",
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
  it("Transaction ABI lookup", async function() {
    const ultrain = Ultrain();
    const tx = await ultrain.transaction(
      {
        actions: [
          {
            account: "ultrainio",
            name: "transfer",
            data: {
              from: "ultrainio",
              to: "tester",
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
  });

}

const randomName = () => {
  const name = String(Math.round(Math.random() * 1000000000)).replace(/[0,6-9]/g, "");
  return "a" + name + "111222333444".substring(0, 11 - name.length); // always 12 in length
};

const randomAsset = () =>
  ecc.sha256(String(Math.random())).toUpperCase().replace(/[^A-Z]/g, "").substring(0, 7);
