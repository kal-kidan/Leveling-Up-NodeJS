const http = require('http');
const url = require('url');
const querystring = require('querystring');
http
  .createServer((req, res) => {
    const path = url.parse(req.url);
    const query = querystring.parse(path.query);
    if (path.pathname == '/') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(`Hello ${query['name']}`);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('Not found');
    }
    res.end();
  })
  .listen(3000);
console.log('server is listening on port 3000');
