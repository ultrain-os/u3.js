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

BlockSchema.static('getTxsByBlockId', async function (block_num) {
    const res = await this.findOne({block_num});
    let trx = [];
    if(res){
        trx = res.block.transactions;
    }
    return trx;
})

BlockSchema.set('toJSON', {getters: true, virtuals: true});
BlockSchema.set('toObject', {getters: true, virtuals: true});

let Blocks = mongoose.model("blocks", BlockSchema);
module.exports = Blocks;

