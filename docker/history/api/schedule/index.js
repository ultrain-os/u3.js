const { createU3, format } = require("u3.js/src");
const { chain } = require("../../config");
const u3 = createU3(chain);

const Balance = require("../model/balance");
const Token = require("../model/token");
const Actions = require("../model/action");
const Txs = require("../model/transaction");

/**
 * washing holder balance every minutes
 * @returns {Promise<void>}
 */
let washHolderBalance = async () => {

  try {
    //fetch all accounts contains abi with functionality of issue token
    let pageNumber = 1;
    const page = await u3.getContracts(pageNumber, 10, { "abi.version": { $regex: "UIP" } }, { _id: -1 });
    if (page.total < 1) {
      console.log("No token abi found");
      return;
    }
    await iterateResolveToken(page.results);

    //iterate token abi
    while (pageNumber < page.pageCount) {
      pageNumber++;
      const page = await u3.getContracts(pageNumber, 10, { "abi.version": { $regex: "UIP" } }, { _id: -1 });
      await iterateResolveToken(page.results);
    }
  } catch (e) {
    console.log(e);
  }

};

let iterateUpdateHolders = async (arr, creator) => {
  //console.log(arr);
  for (let h in arr) {
    let holder_account = format.decodeName(arr[h].scope, false);
    let balances = await u3.getCurrencyBalance(creator, holder_account);
    //console.log(creator, holder_account, balances);

    for (let b in balances) {
      let balance_symbol = balances[b].split(" ");
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
          current_balance: parseFloat(balance)
        },
        { upsert: true }).catch(function(e) {
        console.error(e.message);
      });
    }
  }
};

let iterateResolveToken = (arr) => {

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
    const holders = await u3.getTableByScope({
      code: creator,//token creator
      table: tableName, //token table name
      limit: 20
    });
    let nextRow = holders.more;
    await iterateUpdateHolders(holders.rows, creator);

    while (nextRow !== 0) {
      const tempObj = await u3.getTableByScope({
        code: creator,//token creator
        table: tableName, //token table name
        limit: 20,
        lower_bound: nextRow
      });
      await iterateUpdateHolders(tempObj.rows, creator);
      nextRow = tempObj.more;
    }

    //all token symbols created by the creator
    const symbols = await u3.getTableByScope({
      code: creator,//token creator
      table: scopeName//token table scope
    });
    let SYMBOLS_ARRAY = symbols.rows;
    let nextRow2 = symbols.more;
    while (nextRow2 !== 0) {
      const tempObj = await u3.getTableByScope({
        code: creator,//token creator
        table: scopeName, //token table scope
        lower_bound: nextRow2
      });
      SYMBOLS_ARRAY = SYMBOLS_ARRAY.concat(tempObj.rows);
      nextRow2 = tempObj.more;
    }

    for (let s in SYMBOLS_ARRAY) {
      let symbol = format.decodeSymbolName(SYMBOLS_ARRAY[s].scope);
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
          issue_time: issueAction ? issueTx.createdAt : ""
        },
        { upsert: true }).catch(function(e) {
        console.error(e.message);
      });
    }

  });
};

module.exports = washHolderBalance;



