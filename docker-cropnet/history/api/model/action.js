const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ActionSchema = new Schema({
    trx_id : String,
    name : String,
    actions : Object
})

ActionSchema.static('getActionsByTxid',async function(trx_id){
    const res = await this.find({trx_id});
    return res;
})

ActionSchema.static('getActionsByAccount',async function(account){
    const res = await this.find({"authorization.actor": account});
    return res;
})

ActionSchema.set('toJSON', {getters: true, virtuals: true});
ActionSchema.set('toObject', {getters: true, virtuals: true});

let Actions = mongoose.model("actions", ActionSchema);
module.exports = Actions;

