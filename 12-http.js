const http = require("http"); //http modules are used to create the server instances

const server = http.createServer((req, res) => {
  res.write("Welcome to homepage");
  res.end();
});

server.listen(5000); // Run http server locally at port 5000
