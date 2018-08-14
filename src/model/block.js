/**
 * 块信息
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

let BlockSchema = new Schema();

BlockSchema.set('toJSON', {getters: true, virtuals: true});
BlockSchema.set('toObject', {getters: true, virtuals: true});

BlockSchema.virtual('date_format').get(function () {
    return moment(this.date).format('YYYY-MM-DD HH:mm:ss')
});

let Blocks = mongoose.model("blocks", BlockSchema)
module.exports = Blocks

