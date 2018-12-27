const express = require('express');
const router = express.Router();
const History = require('../service');

/**
 * get contract by name
 */
router.post('/contracts/:name', async function (req, res, next) {
  let result = await History.getContractByName(req.params.name || '');
  res.json(result);
  next();
});

/**
 * get all contracts
 */
router.post('/contracts', async function (req, res, next) {
  let page = req.body.page || 1;
  let pageSize = req.body.pageSize || 10;
  let queryParams = req.body.queryParams || {};
  let sortParams = req.body.sortParams || { _id: -1 };

  let result = await History.getContracts(page, pageSize, queryParams, sortParams);
  res.json(result);
  next();
});

/**
 * get all blocks
 */
router.post('/blocks', async function (req, res, next) {
  let page = req.body.page || 1;
  let pageSize = req.body.pageSize || 10;
  let queryParams = req.body.queryParams || {};
  let sortParams = req.body.sortParams || { _id: -1 };

  let result = await History.getAllBlocks(page, pageSize, queryParams, sortParams);
  res.json(result);
  next();
});

/**
 * get all accounts
 */
router.post('/accounts', async function (req, res, next) {
  let page = req.body.page || 1;
  let pageSize = req.body.pageSize || 10;
  let queryParams = req.body.queryParams || {};
  let sortParams = req.body.sortParams || { _id: -1 };

  let result;
  if (req.query.type && req.query.type == 'clow') {
    result = await History.getAllAccountsForClow(page, pageSize, queryParams, sortParams);
  } else {
    result = await History.getAllAccounts(page, pageSize, queryParams, sortParams);
  }
  res.json(result);
  next();
});

/**
 * get account by name
 */
router.post('/accounts/:name', async function (req, res, next) {
  let result = await History.getAccountByName(req.params.name || '');
  res.json(result);
  next();
});

router.post('/txs', async function (req, res, next) {
  let page = req.body.page || 1;
  let pageSize = req.body.pageSize || 10;
  let queryParams = req.body.queryParams || {};
  let sortParams = req.body.sortParams || { _id: -1 };

  let result = await History.getAllTxs(page, pageSize, queryParams, sortParams);
  res.json(result);
  next();
});

/**
 * get tx by trx_id
 */
router.post('/txs/:trx_id', async function (req, res, next) {
  let result = await History.getTxByTxId(req.params.trx_id || '');
  res.json(result);
  next();
});

/**
 * get actions by tx_id
 */
router.post('/actions/tx/:tx_id', async function (req, res, next) {
  let result = await History.getActionsByTxid(req.params.tx_id || '');
  res.json(result);
  next();
});

/**
 * get actions by account
 */
router.post('/actions/by/account', async function (req, res, next) {
  let page = req.body.page || 1;
  let pageSize = req.body.pageSize || 10;
  let queryParams = req.body.queryParams || {};
  let sortParams = req.body.sortParams || { _id: -1 };

  if (!queryParams.account_name)
    return res.json({ error_msg: "queryParams.account_name is required." });

  let result = await History.getActionsByAccount(page, pageSize, queryParams, sortParams);
  res.json(result);
  next();
});

/**
 * get txs by block_id
 */
router.post('/txs/by/blocknum', async function (req, res, next) {
  let page = req.body.page || 1;
  let pageSize = req.body.pageSize || 10;
  let queryParams = req.body.queryParams || {};
  let sortParams = req.body.sortParams || { _id: -1 };
  if (!queryParams.block_num)
    return res.json({ error_msg: "queryParams.block_num is required." });

  try {
    queryParams.block_num = parseInt(queryParams.block_num);
  } catch (e) {
    return res.json({ error_msg: "queryParams.block_num must be number." });
  }

  console.log(queryParams);

  let result = await History.getTxsByBlockNum(page, pageSize, queryParams, sortParams);
  res.json(result);
  next();
});

/**
 * get blocks by block_num、account_name、contract_name、contract_method
 */
router.post('/blocks/contract', async function (req, res, next) {
  const block_num = req.body.block_num;
  const account = req.body.account;
  const contract = req.body.contract;
  const contract_method = req.body.contract_method;

  if (!block_num || !account || !contract || !contract_method) {
    return res.json({ "error_msg": "invalid params." });
  }

  let result = await History.getBlocksByContract(block_num, account, contract, contract_method);
  res.json(result);
  next();
});

/**
 * get tx by block_id
 */
router.post('/txtraces/:tx_id', async function (req, res, next) {
  let result = await History.getTxTraceByTxid(req.params.tx_id || '');
  res.json(result);
  next();
});

/**
 * search api 
 * query params block_num,tx_hash,accunt,account of contract
 */
router.post('/search/:query', async function (req, res, next) {
  if (!req.params || !req.params.query) {
    return res.json({ error_msg: 'invaild params.' });
  }

  let result = await History.search(req.params.query);
  res.json(result);
  next();
});

router.post('/getcreateaccount', async function (req, res, next) {
  if (!req.params || !req.body.name) {
    return res.json({ error_msg: 'invaild params.' });
  }

  let result = await History.getCreateAccountByName(req.body.name);
  res.json(result);
  next();
});

router.post('/base', async function (req, res, next) {
  let result = await History.getBaseInfo();
  res.json(result);
  next();
});

router.post('/tokens', async function (req, res, next) {
  let page = req.body.page || 1;
  let pageSize = req.body.pageSize || 10;
  let queryParams = req.body.queryParams || {};
  let sortParams = req.body.sortParams || { _id: -1 };

  let result = await History.getAllTokens(page, pageSize, queryParams, sortParams);
  res.json(result);
  next();
});

router.post('/balance/:account', async function (req, res, next) {
  if (!req.params || !req.params.account) {
    return res.json({ error_msg: 'invaild params.' });
  }

  let result = await History.getTokenBalanceByAccount(req.params.account);
  res.json(result);
  next();
});

router.post('/holders/by/symbol', async function (req, res, next) {
  let page = req.body.page || 1;
  let pageSize = req.body.pageSize || 10;
  let queryParams = req.body.queryParams || {};
  let sortParams = req.body.sortParams || { current_balance: -1 };

  let result = await History.getHoldersBySymbol(page, pageSize, queryParams, sortParams);
  res.json(result);
  next();
});

router.post('/token/:symbol/:creator', async function (req, res, next) {
  if (!req.params || !req.params.symbol || !req.params.creator) {
    return res.json({ error_msg: 'invaild params.' });
  }

  let result = await History.getTokenBySymbol(req.params.symbol, req.params.creator);
  res.json(result);
  next();
});

/**
 * get all blocks
 */
router.post('/blocksheader', async function (req, res, next) {
  let page = req.body.page || 1;
  let pageSize = req.body.pageSize || 10;
  let queryParams = req.body.queryParams || {};
  let sortParams = req.body.sortParams || { _id: -1 };

  let result = await History.getAllBlocksHeader(page, pageSize, queryParams, sortParams);
  res.json(result);
  next();
});

router.post('/proposers', async function (req, res, next) {
  let page = req.body.page || 1;
  let pageSize = req.body.pageSize || 10;
  let queryParams = req.body.queryParams || {};
  let sortParams = req.body.sortParams || {
    total_produce_block: - 1
  };

  let result = await History.getProposerList(page, pageSize, queryParams, sortParams);
  res.json(result);
  next();
});

router.post('/award', async function (req, res, next) {
  let result = await History.getAward();
  res.json(result);
  next();
});

router.get('/', function (req, res, next) {


  res.send("test");
});

module.exports = router;
