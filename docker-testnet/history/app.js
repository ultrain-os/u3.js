const express = require('express');
// const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const path = require('path');
const db = require('./api/model');
const { mongo } = require('./config.json');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');

const app = express();

app.use(timeout(120000));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}

app.use(logger('short'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    if (req.method === 'OPTIONS') {
        res.send(200)
    } else {
        next()
    }
})

// init mongo
db.init(`mongodb://${mongo.ip}:${mongo.port}/${mongo.dbname}`);

fs.readdirSync(path.resolve(__dirname, 'api/routes')).forEach((route) => {
    app.use(require('./api/routes/' + route));
})

module.exports = app;
