require("isomorphic-fetch");
const camelCase = require("camel-case");
const processArgs = require("./process-args");
const configDefaults = require("../config");
const helpers = require('./exported-helpers')

module.exports = apiGen;

function apiGen (version, definitions, config) {

  function applyDefaults(target, defaults) {
    Object.keys(defaults).forEach(key => {
      if(target[key] === undefined) {
        target[key] = defaults[key]
      }
    })
  }

  applyDefaults(config, configDefaults)
  applyDefaults(config.logger, configDefaults.logger)

  const api = {};
  const { httpEndpoint } = config;

  for (const apiGroup in definitions) {
    for (const apiMethod in definitions[apiGroup]) {
      const methodName = camelCase(apiMethod);
      const url = `${httpEndpoint}/${version}/${apiGroup}/${apiMethod}`;
      api[methodName] = fetchMethod(methodName, url, definitions[apiGroup][apiMethod], config);
    }
  }
  for(const helper in helpers.api) {
    // Insert `api` as the first parameter to all API helpers
    api[helper] = (...args) => helpers.api[helper](api, ...args)
  }
  return Object.assign(api, helpers)
}

function fetchMethod (methodName, url, definition, config) {
  const { debug, apiLog, logger } = config;

  return function(...args) {
    if (args.length === 0) {
      if (logger.log) {
        logger.log("argument length is 0");
      }
      return;
    }

    const optionsFormatter = option => {
      if (typeof option === "boolean") {
        return { broadcast: option };
      }
    };

    const processedArgs = processArgs(args, Object.keys(definition.params || []), methodName, optionsFormatter);

    const { params, options, returnPromise } = processedArgs;
    let { callback } = processedArgs;

    if (apiLog) {
      // wrap the callback with the logger

      const superCallback = callback;
      callback = (error, tr) => {
        if (error) {
          apiLog(error, methodName);
        } else {
          // TODO apiLog(error, methodName, result)
          apiLog(null, tr, methodName);
        }
        superCallback(error, tr);
      };
    }

    const body = JSON.stringify(params);
    if (debug && logger.debug) {
      logger.debug("api request >>>>>", url, body);
    }
    const fetchConfiguration = { body, method: "POST" };
    Object.assign(fetchConfiguration, config.fetchConfiguration);

    fetch(url, fetchConfiguration).then(response => {

      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        return response.text().then(bodyResp => {
          const error = new Error(bodyResp);
          error.status = response.status;
          error.statusText = response.statusText;
          throw error;
        });
      }
    }).then(objectResp => {
      if (debug && logger.debug) {
        logger.debug("api response <<<<< \n", objectResp);
        logger.debug("\n\n");
      }
      try {
        callback(null, objectResp);
      } catch (callbackError) {
        if (logger.error) {
          logger.error(callbackError);
        }
      }
    })
      .catch(error => {
        let message = "";
        try {
          // nodeos format (fail safe)
          message = JSON.parse(error.message).error.details[0];
        } catch (e2) {}

        if (logger.error) {
          logger.error("api error =>", message, url, body);
          logger.error(error);
        }

        try {
          callback(error);
        } catch (callbackError) {
          if (logger.error) {
            logger.error(callbackError);
          }
        }
      });

    return returnPromise;
  };
}
