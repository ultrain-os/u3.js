/**
 * 块信息
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BlockSchema = new Schema();

BlockSchema.set('toJSON', {getters: true, virtuals: true});
BlockSchema.set('toObject', {getters: true, virtuals: true});

let Blocks = mongoose.model("blocks", BlockSchema)
module.exports = Blocks

