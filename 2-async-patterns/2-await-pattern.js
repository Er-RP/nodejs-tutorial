const { readFile } = require("fs");

//Custom Async Promise & Refactor to Async

const getText = (path) => {
  return new Promise((resolve, reject) => {
    readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// CHECK FILE PATH!!!! [file path is mtach while using this code in app.js]
// type1

getText(`./content/first.txt`)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

//type 2
const start = async () => {
  try {
    const first = await getText("./content/first.txt", "utf8");
    const second = await getText("./content/second.txt", "utf8");
    console.log(first, second);
  } catch (err) {
    console.log(err);
  }
};
start();
