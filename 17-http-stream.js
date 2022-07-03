const http = require("http");
const fs = require("fs");

http
  .createServer(function (req, res) {
    /* Method 1*/
    // const text = fs.readFileSync("./content/big.txt", "utf8"); //sending full file
    // res.end(text);

    /* Method 2*/
    const fileStream = fs.createReadStream("./content/big.txt", "utf8"); //sending file as chunk
    fileStream.on("open", () => {
      fileStream.pipe(res);
    });
    fileStream.on("error", (err) => {
      res.end(err);
    });
  })
  .listen(5000);

/* Look at network tab on ur browser to find difference */
