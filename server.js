var http = require('http')
  , fs = require('fs')
  , url = require('url')
  , memoryStore = {}
  ;

var server = http.createServer(function(req, res) {
  // Parses URL for pathname and contents of query string. 
  var parsedUrl = url.parse(req.url, true)
    , pathName = parsedUrl.pathname
    , queryObject = parsedUrl.query
    , key
    , data
    ;

  if (pathName == "/set") {
    key = provideSingleKey(queryObject);
    memoryStore[key] = queryObject[key];
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Key-value pair of (' + key + ': ' + queryObject[key] + ') stored.');
  } 
  else if (pathName == "/get") {
    key = provideSingleKey(queryObject);
    if (memoryStore[key]) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Key-value pair of (' + key + ': ' + memoryStore[key] + ') retrieved.');
    } 
  }
  else if (pathName == "/save") {
    data = JSON.stringify(memoryStore);
    try {
      fs.writeFileSync('data.txt', data);
    } catch (err) {
      res.end(404, err);
    }
    res.writeHead(201, {'Content-Type': 'text/plain'});
    res.end('Memory store file data.txt created.');
  }
  res.writeHead(404);
  res.end();
})

server.listen(4000);
console.log("Node server running at http://127.0.0.1:4000");

function provideSingleKey(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return key;
    }
  }
}