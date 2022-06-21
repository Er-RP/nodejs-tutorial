const { readFile, writeFile } = require("fs").promises;
//Custom Async Promise & Refactor to Async
// CHECK FILE PATH!!!! [file path is mtach while using this code in app.js]

const start = async () => {
  try {
    const first = await readFile("./content/first.txt", "utf8");
    const second = await readFile("./content/second.txt", "utf8");
    await writeFile(
      "./content/async-result-mind-grenade.txt",
      `Woo hoo : ${first} ${second}`
    );
    console.log(first, second);
  } catch (err) {
    console.log(err);
  }
};
start();
