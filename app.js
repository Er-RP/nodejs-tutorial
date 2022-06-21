const http = require("http");

const server = http.createServer((req, res) => {
  console.log("request event"); // only execute whenever we trigger request [i.e from browser,postman]
  res.end("Hello World");
});

server.listen(5000, () => {
  console.log("Server listening on port : 5000...."); //will executed first
});
