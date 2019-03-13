const async = require("async");
const axios = require("axios");
const Logger = require("../utils/logger");
let logger;

module.exports = function(config) {

  logger = Logger(config.logger);

  /**
   *
   * @param { Number } page
   * @param { Number } pageSize
   * @param { mongoose.model } Model
   * @param { Object } queryParams
   * @param { Object } sortParams
   * @param {*} callback
   */
  let pageQuery = (page, pageSize, Model, queryParams, sortParams) => {
    var start = (page - 1) * pageSize;
    var $page = {
      pageNumber: page
    };
    return new Promise(function(resolve, reject) {
      async.parallel({
        count: function(done) {
          Model.countDocuments(queryParams).exec(function(err, count) {
            done(err, count);
          });
        },
        records: function(done) {
          Model.find(queryParams).skip(start).limit(pageSize).sort(sortParams).exec(function(err, doc) {
            done(err, doc);
          });
        }
      }, function(err, results) {
        var count = results.count;
        $page.total = results.count;
        $page.pageCount = (count - 1) / pageSize + 1;
        $page.results = results.records;

        if (err) reject(err);
        resolve($page);
      });
    });
  };


  /**
   * @param methodName
   * @param url
   * @param data
   * @returns {*}
   */
  let fetchUrl = (methodName, url, data) => {
    data = data || {};

    var body = JSON.stringify(data);

    logger.info(">>[" + methodName + "][post][" + url + "]" + body);

    return new Promise((resolve, reject) => {

      axios.post(url, data).then(res => {

        logger.info("<<[" + methodName + "]" + JSON.stringify(res.data));

        resolve(res.data);

      }).catch(err => {

        let message = "";
        if (err.response) {
          message = err.response.statusText;
        } else {
          message = err.message;
        }
        logger.error("Error[" + methodName + "]" + message);

        reject(message);
      });
    });

  };

  return {
    pageQuery, fetchUrl
  };
};
