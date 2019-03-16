/**
 * 代币余额相关
 */
const mongoose = require("mongoose");
const Double = require("@mongoosejs/double");
const Schema = mongoose.Schema;

let BalancesSchema = new Schema({
  current_balance: { type: Double, default: 0 },
  holder_account: String,
  token_account: String,
  token_symbol: String
}, {
  timestamps: true
});

BalancesSchema.static("getAllBalanceByHolder", async function(holderAccount) {
  const res = await this.find({ "holder_account": holderAccount });
  return res;
});

BalancesSchema.set("toJSON", { getters: true, virtuals: true });
BalancesSchema.set("toObject", { getters: true, virtuals: true });

let Balances = mongoose.model("balances", BalancesSchema);
module.exports = Balances;

