const { createU3, format } = require("u3.js/src");
const u3 = createU3();
const Balance = require("../model/balance");
const Token = require("../model/token");
const Actions = require("../model/action");
const Txs = require('../model/transaction');

/**
 * washing holder balance every minutes
 * @returns {Promise<void>}
 */
var washHolderBalance = async () => {

  try {
    //fetch all accounts contains abi with functionality of issue token
    let pageNumber = 1;
    const page = await u3.getContracts(pageNumber, 10, { "abi.version": { $regex: "UIP" } }, { _id: -1 });
    if (page.total < 1) {
      console.log("no token abi found");
      return;
    }
    iterateResolveToken(page.results);

    //iterate token abi
    while (pageNumber < page.pageCount) {
      pageNumber++;
      const page = await u3.getContracts(pageNumber, 10, { "abi.version": { $regex: "UIP" } }, { _id: -1 });
      iterateResolveToken(page.results);
    }
  } catch (e) {
    console.log(e);
  }


};


iterateResolveToken = (arr) => {

  arr && arr.forEach(async a => {

    let creator = a.name;
    let tables = a.abi.tables && a.abi.tables.filter(t => {
      return t.type === "CurrencyAccount";
    });
    let tableName = tables.length && tables[0].name || "";

    let scopes = a.abi.tables && a.abi.tables.filter(t => {
      return t.type === "CurrencyStats";
    });
    let scopeName = scopes.length && scopes[0].name || "";

    //fetch all holder holding token created by this creator
    const holders_arr = await u3.getTableByScope({
      code: creator,//token creator
      table: tableName //token table name
    });
    //console.log(holders_arr);

    //all token symbols created by the creator
    const symbols_arr = await u3.getTableByScope({
      code: creator,//token creator
      table: scopeName//token table scope
    });
    //console.log(symbols_arr)
    for (let s in symbols_arr.rows) {
      let symbol = format.decodeSymbolName(symbols_arr.rows[s].scope);
      let stats = await u3.getCurrencyStats(creator, symbol);
      //console.log(creator, symbol, stats);

      // get issue time
      let issueAction = await Actions.findOne(
        {
          "account": creator,
          "data.quantity": { $regex: symbol },
          "name": "issue"
        },
        {
          trx_id: 1
        }
      );
      issueAction = JSON.parse(JSON.stringify(issueAction));

      let issueTx = null;
      if (issueAction) {
        issueTx = await Txs.findOne({ "trx_id": issueAction.trx_id }, { createdAt: 1 });
        issueTx = JSON.parse(JSON.stringify(issueTx));
      }

      let response = stats[symbol];
      let max_supply = response.max_supply.replace(" " + symbol, "");
      let decimal_arr = max_supply.split(".");
      let decimal = decimal_arr.length < 2 ? 0 : decimal_arr[1].length;

      await Token.updateMany({
        account: creator,
        symbol: symbol
      }, {
          account: creator,
          symbol: symbol,
          decimals: decimal,
          supply: response.supply ? response.supply.replace(" " + symbol, "") : 0,
          max_supply: max_supply,
          issuer: response.issuer,
          issue_time: issueAction ? issueTx.createdAt : ''
        },
        { upsert: true }).catch(function (e) {
          console.error(e.message);
        });
    }


    for (let h in holders_arr.rows) {
      let holder_account = format.decodeName(holders_arr.rows[h].scope, false);
      let balances = await u3.getCurrencyBalance(creator, holder_account);
      console.log(creator, holder_account, balances);

      balances.forEach(async b => {

        let balance_symbol = b.split(" ");
        let balance = balance_symbol[0];
        let symbol = balance_symbol[1];

        await Balance.updateMany({
          holder_account: holder_account,
          token_account: creator,
          token_symbol: symbol
        }, {
            holder_account: holder_account,
            token_account: creator,
            token_symbol: symbol,
            current_balance: balance
          },
          { upsert: true }).catch(function (e) {
            console.error(e.message);
          });

      });

    }


  });
};

module.exports = washHolderBalance;



