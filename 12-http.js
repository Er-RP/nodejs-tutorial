const http = require("http"); //http modules are used to create the server instances

const server = http.createServer((req, res) => {
  // console.log(req)
  /* Sending diffrent response based on the request url */
  if (req.url === "/") {
    res.end("Welcome to homepage");
  } else if (req.url === "/about") {
    res.end("This is aboutPage");
  } else {
    console.log("Not Found");
    res.end(`
      <h1>Oops!</h1>
      <p>We can't seem to find the page you are looking for</p>
      <a href="/">back home</a>
      `);
  }
});

server.listen(5000); // Run http server locally at port 5000
