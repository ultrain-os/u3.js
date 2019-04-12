const assert = require("assert");
const { createU3 } = require("../");
const u3 = createU3();

describe("history", async () => {

  it("getAllBlocks", async () => {
    const rs = await u3.getAllBlocks(1, 10, {}, { _id: -1 });
    assert.ok(rs);
  });

  it("getContracts", async () => {
    const rs = await u3.getContracts(1, 10, {}, { _id: -1 });
    assert.ok(rs);
  });

  it("getContractByName", async () => {
    const rs = await u3.getContractByName("ultrainio");
    assert.ok(rs);
  });

  it("getAllAccounts", async () => {
    const rs = await u3.getAllAccounts(1, 10, {}, { _id: -1 });
    assert.ok(rs);
  });

  it("getAllTxs", async () => {
    const rs = await u3.getAllTxs(1, 10, {}, { _id: -1 });
    assert.ok(rs);
  });

  it("getTxByTxId", async () => {
    const txs = await u3.getAllTxs(1, 1, {}, { _id: -1 });
    const rs = await u3.getTxByTxId("670486eaa77994f818564ffbb5409889c27962b30d7ebbfed1947c118b1e16f5");
    assert.ok(rs);
  });

  it("getActionsByTxid", async () => {
    const txs = await u3.getAllTxs(1, 1, {}, { _id: -1 });
    const rs = await u3.getActionsByTxid(txs.results[0].trx_id);
    assert.ok(rs);
  });

  it("getExistAccount", async () => {
    const acc = await u3.getExistAccount('benyasin1112');
    assert.ok(acc);
  });

  it("getActionsByAccount", async () => {
    var requestData = {
      "page": 1,
      "pageSize": 10,
      "queryParams": { account_name: "ultrainio" },
      "sortParams": { _id: -1 }
    };
    const rs = await u3.getActionsByAccount(requestData.page, requestData.pageSize, requestData.queryParams, requestData.sortParams);
    assert.ok(rs);
  });

  it("getTxsByBlockNum", async () => {
    const blocks = await u3.getAllBlocks(1, 1, {}, { _id: -1 });
    var requestData = {
      "page": 1,
      "pageSize": 10,
      "queryParams": { block_num: blocks.results[0].block_num },
      "sortParams": { _id: -1 }
    };
    const rs = await u3.getTxsByBlockNum(requestData.page, requestData.pageSize, requestData.queryParams, requestData.sortParams);
    assert.ok(rs);
  });

  it("getBlocksByContract", async () => {
    const rs = await u3.getBlocksByContract(1, "ultrainio", "utrio.token", "transfer");
    assert.ok(rs);
  });

  it("getTxTraceByTxid", async () => {
    const txs = await u3.getAllTxs(1, 1, {}, { _id: -1 });
    const rs = await u3.getTxTraceByTxid(txs.results[0].trx_id);
    assert.ok(rs);
  });

  it("search by block_num", async () => {
    const blocks = await u3.getAllBlocks(1, 1, {}, { _id: -1 });
    let block_num = blocks.results[0].block_num;
    let rs = await u3.search(block_num);
    assert.ok(rs);
  });

  it("search by trx_id", async () => {
    let txs = await u3.getAllTxs(1, 1, {}, { _id: -1 });
    let trx_id = txs.results[0].trx_id;
    let rs = await u3.search(trx_id);
    assert.ok(rs);
  });

  it("search by account", async () => {
    let account = "jack";
    let rs = await u3.search(account);
    assert.ok(rs);
  });

  it("getCreateAccountByName", async () => {
    let account = "ot112";
    let rs = await u3.getCreateAccountByName(account);
    assert.ok(rs);
  });

  it("getAllTokens", async () => {
    let rs = await u3.getAllTokens(1, 1, {}, { _id: -1 });
    console.log(JSON.stringify(rs, null, 2));
    assert.ok(rs);
  });

  it("getTxByData", async () => {
    //let rs = await u3.getAllTxs(1, 1, { "actions.0.data.from": "user.11.111" } }, { _id: -1 });
    //same as below
    let query = { $and: [{ "actions.0.account": "ufotrackuser" }, { $or: [{ "actions.0.data.id": 1257 }, { "actions.0.data.id": "1257" }] }] };
    let rs = await u3.getAllTxs(1, 2, query, { _id: -1 });
    assert.ok(rs);
  });

  it("getTokenBySymbol", async () => {
    let rs = await u3.getTokenBySymbol("ZTPJ", "user.11.111");
    console.log(JSON.stringify(rs, null, 2));
    assert.ok(rs);
  });

  it("getBaseInfo", async () => {
    let rs = await u3.getBaseInfo();
    console.log(JSON.stringify(rs, null, 2));
    assert.ok(rs);
  });

  it("getBalanceByAccount", async () => {
    let rs = await u3.getBalanceByAccount("user.11.111");
    console.log(JSON.stringify(rs, null, 2));
    assert.ok(rs);
  });

  it("getHoldersBySymbol", async () => {
    let rs = await u3.getHoldersBySymbol(1, 10, {
      token_account: "user.11.111",
      token_symbol: "BJMZ"
    }, { current_balance: -1 });
    console.log(JSON.stringify(rs, null, 2));
    assert.ok(rs);
  });

  it("getAllBlocksHeader", async () => {
    let rs = await u3.getAllBlocksHeader(1, 1, {}, { _id: -1 });
    console.log(JSON.stringify(rs, null, 2));
    assert.ok(rs);
  });

  it("getProposerList", async () => {
    let rs = await u3.getProposerList(1, 1);
    console.log(JSON.stringify(rs, null, 2));
    assert.ok(rs);
  });
});
