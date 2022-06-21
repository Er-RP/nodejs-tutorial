const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Home Page");
  } else if (req.url === "/about") {
    // blocking code

    /*Response for the about page will be send only after the executing the loops. Same time any request for 
  other pages[path] from others will be  wait until about page send response*/
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 1000; j++) {
        console.log(`${i} ${j}`);
      }
    }
    res.end("About Page");
  } else {
    res.end("Error Page");
  }
});

server.listen(5000, () => {
  console.log("Server listening on port : 5000....");
});
/* run simultaniously about and homepages in different tabs of browswer*/
