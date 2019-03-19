const { createLogger, format, transports } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const fs = require("fs");
const path = require("path");
const resolve = file => path.resolve(__dirname, file);

function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

function Logger(config) {

  const LOG_DIR = resolve(config.directory);
  const consoleLogging = config.console || false;
  const fileLogging = config.file || false;
  const printFormat = format.printf(info => `${info.timestamp} [${info.label}] - ${info.level}: ${info.message}`);

  let silent = (!consoleLogging && !fileLogging) || false;
  if (fileLogging) {
    if (!fs.existsSync(LOG_DIR)) {
      mkdirsSync(LOG_DIR);
    }
  }

  let transportArr = [];
  if (consoleLogging) {
    const transportConsole = new transports.Console({
      json: false,
      colorize: true,
    });
    transportArr.push(transportConsole);
  }
  if (fileLogging) {
    const DailyRotateFile = new transports.DailyRotateFile({
      dirname: LOG_DIR,
      filename: "%DATE%.log",
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: false,
      maxSize: "5m",
      maxFiles: "14d"
    });
    transportArr.push(DailyRotateFile);
  }


  const Logger = createLogger({
    exitOnError: false,
    level: config.level || "info",
    silent,
    format: format.combine(
      format.label({ label: 'U3' }),
      format.colorize(),
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      printFormat
    ),
    transports: transportArr
  });
  return Logger;
}


module.exports = Logger;
