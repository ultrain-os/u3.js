/**
 * 代币相关
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TokensSchema = new Schema({
  account: String,
  symbol: String,
  decimals: Number,
  supply: String,
  max_supply: String,
  issuer: String
}, {
  timestamps: true
});

TokensSchema.static("getAllTokens", async function() {
  const res = await this.find({});
  return res;
});

TokensSchema.set("toJSON", { getters: true, virtuals: true });
TokensSchema.set("toObject", { getters: true, virtuals: true });


let Tokens = mongoose.model("tokens", TokensSchema);
module.exports = Tokens;

