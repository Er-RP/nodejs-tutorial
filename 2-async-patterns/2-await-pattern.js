const { readFile, writeFile } = require("fs");
const util = require("util");
const readFilePromise = util.promisify(readFile);
const writeFilePromise = util.promisify(writeFile);

//Custom Async Promise & Refactor to Async
// CHECK FILE PATH!!!! [file path is mtach while using this code in app.js]

const start = async () => {
  try {
    const first = await readFilePromise("./content/first.txt", "utf8");
    const second = await readFilePromise("./content/second.txt", "utf8");
    await writeFilePromise(
      "./content/async-result-mind-grenade.txt",
      `Woo hoo : ${first} ${second}`
    );
    console.log(first, second);
  } catch (err) {
    console.log(err);
  }
};
start();
