const http = require('http');
const port = 3002;

module.exports = function listener(callback) {

  let server = http.createServer((request, response) => {

    const { headers, method, url } = request;
    console.log(method);
    console.log(url);
    let body = [];
    request.on('error', (err) => {
      console.error(err);
    }).on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();

      //console.log(body);
      callback && callback(body);

      response.on('error', (err) => {
        console.error(err);
      });

      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');
      response.write('ok');
      response.end();
    });

  });

  server.keepAliveTimeout = 0;
  server.timeout = 0;

  server.listen(port, function() {
    console.log((new Date()) + ' Server is listening on port ' + port);
  });
};


