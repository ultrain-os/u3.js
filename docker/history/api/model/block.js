/**
 * 块信息
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BlockSchema = new Schema({
    block_id : String,
    block_num : Number,
    block : Object
})

BlockSchema.static('getBlockByBlockNum', async function(block_num){
    const res = await this.findOne({ block_num });
    if(!res) return {};
    return res;
})

BlockSchema.static('getBlocksByContract', async function(block_num,account,contract,contract_name){
    const res = await this.find({ 
        "block_num": { $gt: parseInt(block_num) },
        "block.transactions.trx.transaction.actions.account": contract, 
        "block.transactions.trx.transaction.actions.name": contract_name, 
        "block.transactions.trx.transaction.actions.authorization.actor": account });
    
    return res;
})

BlockSchema.static('getTrxNumByBlockNum', async function(block_num){
    let rs = await this.aggregate([{"$match":{"block_num":parseInt(block_num)}},{"$project":{"trx_num":{"$size":"$block.transactions"}}}]);
    return rs[0].trx_num;
})

BlockSchema.set('toJSON', {getters: true, virtuals: true});
BlockSchema.set('toObject', {getters: true, virtuals: true});

let Blocks = mongoose.model("blocks", BlockSchema);
module.exports = Blocks;

