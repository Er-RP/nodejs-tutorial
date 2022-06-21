/* The fs module enables interacting with the file system */

const { readFileSync, writeFileSync } = require("fs");
console.log("start");
const first = readFileSync("./content/first.txt", "utf8");
const second = readFileSync("./content/second.txt", "utf8");

writeFileSync(
  "./content/result-sync.txt",
  `Here is the result : ${first}, ${second}`,
  { flag: "a" } // this 'a' flag used to append instead of overwrite the existing file
);
console.log("done with this task");
console.log("starting the next one");
