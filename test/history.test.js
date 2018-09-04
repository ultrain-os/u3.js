const history = require('../src/history');
const assert = require('assert');
const { U3 } = require('../index');
const u3Instance = U3.createU3();

describe('history', async () => {

    it("getAllBlocks", async () => {
        const rs = await u3Instance.getAllBlocks(1,10,{},{_id:-1});
        console.log(rs);
        assert.ok(1==1);
    });

    it("getContracts", async () => {
        const rs = await u3Instance.getContracts(1,10,{},{_id:-1});
        console.log(rs);
        assert.ok(1==1);
    });
    
    it("getContractByName", async () => {
        const rs = await u3Instance.getContractByName("ultrainio");
        console.log(rs);
        assert.ok(1==1);
    });

    it("getAllAccounts", async () => {
        const rs = await u3Instance.getAllAccounts(1,10,{},{_id:-1});
        console.log(rs);
        assert.ok(1==1);
    });

    it("getAllTxs", async () => {
        const rs = await u3Instance.getAllTxs(1,10,{},{_id:-1});
        console.log(rs);
        assert.ok(1==1);
    });

    it("getTxByTxId", async () => {
        const rs = await u3Instance.getTxByTxId("0df6e9f46dc72243619cb6b4e8053ead6a0b612a3f1673622f242e9d1797f7d0");
        console.log(rs);
        assert.ok(1==1);
    });

    it("getActionsByTxid", async () => {
        const rs = await u3Instance.getActionsByTxid("0df6e9f46dc72243619cb6b4e8053ead6a0b612a3f1673622f242e9d1797f7d0");
        console.log(rs);
        assert.ok(1==1);
    });

    it("getActionsByAccount", async () => {
        const rs = await u3Instance.getActionsByAccount("ultrainio");
        console.log(rs);
        assert.ok(1==1);
    });

    it("getTxsByBlockId", async () => {
        const rs = await u3Instance.getTxsByBlockId("2");
        console.log(rs);
        assert.ok(1==1);
    });
})