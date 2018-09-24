var async = require('async');

/**
 * 
 * @param { Number } page 
 * @param { Number } pageSize 
 * @param { mongoose.model } Model 
 * @param { Object } queryParams 
 * @param { Object } sortParams 
 * @param {*} callback 
 */
var pageQuery = function (page, pageSize, Model, queryParams, sortParams, selectItems = {}) {
    var start = (page - 1) * pageSize;
    var $page = {
        pageNumber: page
    }
    return new Promise((resolve,reject)=>{
        async.parallel({
            count: function (done) {
                Model.countDocuments(queryParams).exec(function (err, count) {
                    done(err, count);
                });
            },
            records: function (done) {
                Model.find(queryParams,selectItems).skip(start).limit(Number.parseInt(pageSize)).sort(sortParams).exec(function (err, doc) {
                    done(err, doc);
                });
            }
        }, function (err, results) {
            var count = results.count;
            $page.total = results.count;
            $page.pageCount = (count - 1) / pageSize + 1;
            $page.results = results.records;

            if(err) reject(err);
            resolve($page);
        });
    })
};

module.exports = {
    pageQuery: pageQuery
}