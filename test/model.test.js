const assert = require('assert')
const DB = require("../db");
const { Blocks,Txs,Actions,dbHelper,Accounts } = DB;
DB.init({
    ip: "127.0.0.1",
    port: "27017",
    db: "ultrain"
});
describe('block', () => {
    it("getTxByBlockId", async () => {
        const r = await Blocks.getTxByBlockId("424");
        console.log(r);
        assert.ok(r);
    });
})

describe('tx', () => {
    it("getTxsByUsername", async () => {
        const r = await Txs.getTxsByUsername("test1");
        console.log(r);
        assert.ok(r);
    });
})

describe('action', () => {
    it("getActionsByTxid", async () => {
        const r = await Actions.getActionsByTxid("4da757966839a3d2df746c062befa0fdae6a334042d3f0ab007b0ec6af7185dd");
        console.log(r);
        assert.ok(r);
    });
})

describe('account', ()=>{
    it("getContractsByPageQuery", async () => {
        const r = await dbHelper.pageQuery(1,10,Accounts,{ "abi": { $exists: true }},{_id : -1})
        console.log(r);
        assert.ok(r);
    })

    it("getContracts", async () => {
        const r = await Accounts.getContracts();
        console.log(r);
        assert.ok(r);
    })

    it("getContractByName", async ()=> {
        const r = await Accounts.getContractByName("ultrainio2");
        console.log(r);
        assert.ok(r);
    })
    it("getAccounts", async () => {
        const r = await dbHelper.pageQuery(1,20,Accounts,{},{_id : -1})
        console.log(r);
        assert.ok(r);
    })
})