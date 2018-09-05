const assert = require('assert');
const { U3 } = require('../index');
const u3Instance = U3.createU3();

describe('block', () => {

    it("getTxsByBlockId", async () => {
        const rs = await u3Instance.getTxsByBlockId("92")
        console.log(rs);
        assert.ok(rs);
    });

    it("getAllBlocks", async () =>{
        const rs = await u3Instance.getAllBlocks(5473,20,{},{_id:-1});
        console.log(rs);
        assert.ok(rs);
    })
})

describe('tx', () => {
    it("getTxsByUsername", async () => {
        // const r = await Txs.getTxsByUsername("test1");
        // console.log(r);
        // assert.ok(r);
    });

    it("getAllTxs", async () => {
        const r = await u3Instance.getAllTxs(1,5,{},{_id:-1});
        console.log(r);
        assert.ok(r);
    });

    it("getTxByTxId", async ()=>{
        const r = await u3Instance.getTxByTxId("e2b8d473bc071efb2c846505a25665850b9c170334f48d51ccc44d1eb2a676e1");
        console.log(r);
        assert.ok(r);
    })
})

describe('action', () => {
    it("getActionsByTxid", async () => {
        const r = await u3Instance.getActionsByTxid("6572c5154c146df6e10650b87ac3116b4650e9a24ae4881759924259784a529b");
        console.log(r);
        assert.ok(r);
    });
})

describe('account', ()=>{
    it("getContracts", async () => {
        const r = await u3Instance.getContracts();
        console.log(r);
        assert.ok(r);
    })

    it("getContractByName", async ()=> {
        const r = await u3Instance.getContractByName("ultrainio");
        console.log(r);
        assert.ok(r);
    })
    it("getAccounts", async () => {
        const r = await u3Instance.getAllAccounts(1,5,{},{_id : -1});
        console.log(r);
        assert.ok(r);
    })
})