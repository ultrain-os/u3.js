const camelCase = require("camel-case");
const processArgs = require("./process-args");
const helpers = require("./exported-helpers");
const Axios = require("axios");

function apiGen(version, definitions, config) {
  config = Object.assign({
    httpEndpoint: "http://127.0.0.1:8888",
    verbose: true
  }, config);

  var defaultLogger = {
    log: config.verbose ? console.log : "",
    error: console.error
  };

  config.logger = Object.assign({}, defaultLogger, config.logger);

  var api = {};
  var _config = config,
    httpEndpoint = _config.httpEndpoint;

  for (var apiGroup in definitions) {
    for (var apiMethod in definitions[apiGroup]) {
      var methodName = camelCase(apiMethod);
      var url = httpEndpoint + "/" + version + "/" + apiGroup + "/" + apiMethod;
      api[methodName] = fetchMethod(methodName, url, definitions[apiGroup][apiMethod], config);
    }
  }

  var _loop = function _loop(helper) {
    // Insert `api` as the first parameter to all API helpers
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

function fetchMethod(methodName, url, definition, config) {
  var logger = config.logger;

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
    if (logger.log) {
      logger.log("[ " + methodName + " ]:", method, url, "\t", body);
    }
    var fetchConfiguration = { body: body, method: "POST" };
    Object.assign(fetchConfiguration, config.fetchConfiguration);

    return new Promise((resolve, reject) => {
      Axios[method](url, params).then(res => {
        if (logger.log) {
          logger.log("\n\t", "[ " + methodName + " ]", "response:", JSON.stringify(res.data), "\n");
        }
        resolve(res.data);
      }).catch(err => {
        let message = err.response.data.error.details[0];
        if (logger.error) {
          logger.error('\n\t', '[ ' + methodName + ' ]', 'result callback', ':', message)
        }
        reject(message);
      });
    });

  };
}

module.exports = apiGen;
