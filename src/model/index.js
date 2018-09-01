const mongoose = require("mongoose");

/**
 * db init
 * @param {*} dbUrl
 */
function init ({ dbUrl }) {
  mongoose.connect(dbUrl, { useNewUrlParser: true });
  mongoose.set('useFindAndModify', false);

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

exports.init = init;