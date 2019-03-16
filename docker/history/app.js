const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const db = require("./api/model");
const { mongo } = require("./config.json");
const bodyParser = require("body-parser");
const timeout = require("connect-timeout");
const expressModifyResponse = require("express-modify-response");
const config = require("./config.json");
const Logger = require("./api/utils/logger");
const logger = new Logger(config.logger);
const requestIp = require("request-ip");

app.use(timeout(120000));
app.use((req, res, next) => {
  if (!req.timedout) next();
});

//logger middleware
app.use(expressModifyResponse(
  (req, res) => {
    logger.info(">>[getContracts][" + req.method + "][" + req.originalUrl + "][" + requestIp.getClientIp(req) + "]" + JSON.stringify(req.body));
    return true;
  },
  (req, res, body) => {
    const result = body.toString();
    logger.info("<<[getContracts][" + req.method + "][" + req.originalUrl + "]" + result);
    return result;
  }
));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  if (req.method === "OPTIONS") {
    res.send(200);
  } else {
    next();
  }
});

// init mongo
if (mongo.user && mongo.pass) {
  db.init(`mongodb://${mongo.user}:${mongo.pass}@${mongo.ip}:${mongo.port}/${mongo.dbname}`);
} else {
  db.init(`mongodb://${mongo.ip}:${mongo.port}/${mongo.dbname}`);
}

fs.readdirSync(path.resolve(__dirname, "api/routes")).forEach((route) => {
  app.use(require("./api/routes/" + route));
});

module.exports = app;
