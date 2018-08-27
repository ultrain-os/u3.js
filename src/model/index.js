const mongoose = require("mongoose");

/**
 * db init
 * @param {*} param 
 */
function init (param) {
  let username_pwd = '';
  if (param.username && param.pwd) {
    username_pwd = `${param.username}:${param.pwd}@`;
  }
  let db_url = `mongodb://${username_pwd}${param.ip}:${param.port}/${param.db}`
  console.log(db_url);
  mongoose.connect(db_url, { useNewUrlParser: true });

  const db = mongoose.connection;

  db.once("open", () => {
    console.log("连接数据成功");
  });

  db.on("error", function (error) {
    console.error("Error in MongoDb connection: " + error);
    mongoose.disconnect();
  });

  db.on("close", function () {
    console.log("数据库断开，重新连接数据库");
  });
}

// init(...args)
exports.init = init;
exports.Blocks = require("./block");
exports.Txs = require("./transaction");
exports.Accounts = require("./account");
exports.dbHelper = require("../utils/dbHelper");
exports.Actions = require("./action");