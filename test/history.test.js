const history = require('../src/history');
const assert = require('assert');
const { U3 } = require('../index');
const u3Instance = U3.createU3();

describe('history', async () => {

    it("getAllBlocks", async () => {
        const rs = await u3Instance.getAllBlocks(1,10,{},{_id:-1});
        console.log(rs);
        assert.ok(rs);
    });

    it("getContracts", async () => {
        const rs = await u3Instance.getContracts(1,10,{},{_id:-1});
        console.log(rs);
        assert.ok(rs);
    });
    
    it("getContractByName", async () => {
        const rs = await u3Instance.getContractByName("ultrainio");
        console.log(rs);
        assert.ok(rs);
    });

    it("getAllAccounts", async () => {
        const rs = await u3Instance.getAllAccounts(1,10,{},{_id:-1});
        console.log(rs);
        assert.ok(rs);
    });

    it("getAllTxs", async () => {
        const rs = await u3Instance.getAllTxs(1,10,{},{_id:-1});
        console.log(rs);
        assert.ok(rs);
    });

    it("getTxByTxId", async () => {
        const txs = await u3Instance.getAllTxs(1,1,{},{_id:-1});
        const rs = await u3Instance.getTxByTxId(txs.results[0].trx_id);
        console.log(rs);
        assert.ok(rs);
    });

    it("getActionsByTxid", async () => {
        const txs = await u3Instance.getAllTxs(1,1,{},{_id:-1});
        const rs = await u3Instance.getActionsByTxid(txs.results[0].trx_id);
        console.log(rs);
        assert.ok(rs);
    });

    it("getActionsByAccount", async () => {
        const rs = await u3Instance.getActionsByAccount("ultrainio");
        console.log(rs);
        assert.ok(rs);
    });

    it("getTxsByBlockId", async () => {
        const blocks = await u3Instance.getAllBlocks(1,1,{},{_id:-1});
        const rs = await u3Instance.getTxsByBlockId(blocks.results[0].block_num);
        console.log(rs);
        assert.ok(rs);
    });
})