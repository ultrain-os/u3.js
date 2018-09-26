var async = require('async');
var axios = require('axios');

/**
 *
 * @param { Number } page
 * @param { Number } pageSize
 * @param { mongoose.model } Model
 * @param { Object } queryParams
 * @param { Object } sortParams
 * @param {*} callback
 */
var pageQuery = function(page, pageSize, Model, queryParams, sortParams) {
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
 * @param url
 * @param data
 * @returns {*}
 */
var fetchUrl = function(url, data) {
  data = data || {}
  return axios.post(url, data)
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      var err = {
        error_msg: ''
      };
      if (error.response) {
        err.error_msg = error.response.statusText;
      } else {
        err.error_msg = error.message;
      }
      return err;
    });
};

module.exports = {
  pageQuery:pageQuery,
  fetchUrl:fetchUrl
};