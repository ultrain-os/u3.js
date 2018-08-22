const assert = require('assert')
const DB = require("../db");
const { Blocks,Txs } = DB;
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
    it("getActionsById", async () => {
        const r = await Txs.getActionsById("6ad4fc6ad7526207ddd3a5f85e9df7afa0f80f9bd207382a461fb24f07d19fd4");
        console.log(r);
        assert.ok(r);
    });
})