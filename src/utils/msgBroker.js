var http = require('http');
var url = require('url');

// Create http server.
var httpServer = http.createServer(function(req, resp) {

  // Get client request url.
  var reqUrlString = req.url;

  // Get client request path name.
  var pathName = url.parse(reqUrlString, true, false).pathname;

  // Get request method.
  var method = req.method;

  // If post.
  if ('POST' === method) {
    var postData = '';

    // Get all post data when receive data event.
    req.on('data', function(chunk) {

      postData += chunk;

    });

    // When all request post data has been received.
    req.on('end', function() {
      console.log('Client post data : ' + postData);
      resp.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
    });
  }
});
httpServer.listen(4444);
console.log('Listening at http://localhost:4444');
/*
var util = require("util"),
  EventEmitter = require("events").EventEmitter;

var Server = function(){
  console.log("init");
};

util.inherits(Server, EventEmitter);

var s = new Server();

s.on("eventName", function(para1,para2,para3){
  console.log("eventName : abc");
  console.log("para1 : "+para1);
  console.log("para2 : "+para2);
  console.log("para3 : "+para3);
});

s.emit("eventName","a","b","c");*/
