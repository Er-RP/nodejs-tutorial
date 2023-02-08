# NOTES

- ## [Getting Started](#getting-started-1)
- ## [Express](#express-1)
- ## [Multiple Environments](#multiple-environments-1)

---

### Getting Started

Run the following command in terminal in root of your application.

```sh
npm init -y
```

Make sure _package.json_ file is created.

Add the following script to your package.json file.

```sh
"start" : "node index.js"
```

Create **index.js** file in the root of your application.

> index.js

```js
console.log("My first node APP");
```

Run the following code in terminal

```sh
npm start
```

In terminal _My first node app_ will be shown.

---

### Express

Install the Following packages.

```sh
npm install express dotenv
```

Create a _config.js_ file, import the _dotenv_ and return the config

> config.js

```js
require("dotenv").config();
const ENV = process.env;
module.exports = { PORT: ENV.PORT || "5000" };
```

In _Index.js_ import the express module and config module file and create a server instance.

> index.js

```js
const express = require("express");
const { PORT } = require("./config");
const app = express();
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(PORT, () =>
  console.log(`Example app listening on http://localhost:${PORT}`)
);
```

Run the following code in terminal

```sh
npm start
```

Make sure server is running by visiting the URL showing in the terminal.

---

### Multiple Environments

Install the following package.

```sh
npm install env-cmd nodemon --save-dev
```

Create a .env.test file in the directory.Add the environment variables.

Add the following script to your package.json

```sh
"dev": "env-cmd -f .env.test nodemon index.js"
```

Run the following command in terminal and make sure your app using variables from _.env.test_ file.

```sh
npm run dev
```

---
