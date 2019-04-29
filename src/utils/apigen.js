const camelCase = require("camel-case");
const processArgs = require("./process-args");
const helpers = require("./exported-helpers");
const Axios = require("axios");
const Logger = require("./logger");
let logger;

function apiGen(version, definitions, config) {

  logger = new Logger(config.logger);

  let api = {};
  let _config = config, httpEndpoint = _config.httpEndpoint;

  for (var apiGroup in definitions) {
    for (var apiMethod in definitions[apiGroup]) {
      var methodName = camelCase(apiMethod);
      var url = httpEndpoint + "/" + version + "/" + apiGroup + "/" + apiMethod;
      api[methodName] = fetchMethod(methodName, url, definitions[apiGroup][apiMethod]);
    }
  }

  let _loop = function _loop(helper) {
    api[helper] = function() {
      var _helpers$api;
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return (_helpers$api = helpers.api)[helper].apply(_helpers$api, [api].concat(args));
    };
  };

  for (var helper in helpers.api) {
    _loop(helper);
  }
  return Object.assign(api, helpers);
}

function fetchMethod(methodName, url, definition) {

  return async function() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var optionsFormatter = function optionsFormatter(option) {
      if (typeof option === "boolean") {
        return { broadcast: option };
      }
    };

    var processedArgs = processArgs(args, Object.keys(definition.params || []), methodName, optionsFormatter);
    var params = processedArgs.params;

    const method = url.endsWith("chain/get_chain_info") ? "get" : "post";
    var body = JSON.stringify(params);

    logger.info(">>[" + methodName + "][" + method + "][" + url + "]" + body + " ");

    return new Promise((resolve, reject) => {
      Axios[method](url, params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded", "Connection": "keep-alive" }
      }).then(res => {
        logger.info("<<[" + methodName + "]" + JSON.stringify(res.data));
        resolve(res.data);
      }).catch(err => {
        let message = "";
        if (err.response &&
          err.response.data &&
          err.response.data.error) {
          message = err.response.data.error.details[0];
          if (Object.prototype.toString.call(message) === "[object Object]") {
            message = message.message;
          }
        } else if (err.message) {
          message = err.message;
        }
        logger.error("Error[" + methodName + "]result callback:" + message);
        reject(message);
      });
    });

  };
}

module.exports = apiGen;
