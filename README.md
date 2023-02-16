1. Create the .env and .env.test file in project root.

2. Run the following commands in terminal

```sh
> npm install
> npm start / npm run dev
```

3. _npm start_ for production run and _npm run dev_ for development run.

---

## MongoDB

> MongoDB is a popular open-source document-oriented NoSQL `database` that stores data in `JSON-like documents` with dynamic schemas. It's designed to be scalable, flexible, and easy to work with.

---

# NOTES

- ## [Getting Started](#getting-started-1)
- ## [Express](#express-1)
- ## [Multiple Environments](#multiple-environments-1)
- ## [Error Handling](#error-handling-1)
- ## [Logging](#logging-1)
- ## [MongoDB](#mongodb-1)
  - ## [Postman](#postman-1)
  - ## [Debug](#debug-1)
  - ## [Express Middlewares](#express-middlewares-1)

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

### Error Handling

> Not Found Route Error handling

Add the following code after all the routes in the index.js file.

```js
app.use((req, res) => {
  const message = "Request not found";
  const err = new Error(`${message} for path ${req.path}`);
  res.status(404).send({
    success: false,
    message: err.message,
  });
});
```

In browser request from some undefined path and you will receive a 404 response with Request not found error message.

> Custom error handling

Create a **error_handlers** folder. Create _customErrors.js_ file in it and add the following code.

> customErrors.js

```js
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 500;
  }
}

class NotFoundError extends CustomError {
  constructor(message) {
    super(message || "Not found", 404);
  }
}

class BadRequestError extends CustomError {
  constructor(message) {
    super(message || "Bad request", 400);
  }
}

module.exports = { BadRequestError, NotFoundError, CustomError };
```

Create a file _errorHandler.js_ in the same directory and add the following code.

```js
const errorHandler = (error, req, res, next) => {
  // Error handling middleware functionality
  console.log(`${error.name} :  ${error.message}`); // log the error
  const status = error.status || 400;
  // send back an easily understandable error message to the caller
  return res.status(status).send(error.message);
};

module.exports = errorHandler;
```

1. Import the errorHandler module and customErrors module in index.js.
2. Create a test route _/router_ to retuen the custom erros.
3. Modify the not found route handler.
4. Add custom error handler in the bottom.

> index.js

```js
const express = require("express");
const { PORT } = require("./config");
const errorHandler = require("./error_handlers/errorHandler");
const { NotFoundError, CustomError } = require("./error_handlers/customErrors");
const app = express();

app.get("/", (req, res) => res.send("Hello World!"));

// Route with a handler function which throws an error
app.get("/error", (req, res, next) => {
  const error = new CustomError(`processing error in request at ${req.path}`);
  error.statusCode = 400;
  next(error);
});

//Error handler for the not found route.
app.use((req, res, next) => {
  const message = "Request not found";
  const err = new NotFoundError(`${message} for path ${req.path}`);
  next(err);
});

//Error Handler
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Example app listening on http://localhost:${PORT}`)
);
```

5. Now navigate in browser to _/error_ route and make sure custom errors are thrown.

---

### Logging

Install the following packages

```sh
npm install winston morgan
```

1. Create a new folder _utils_ and create a file _Logger.js_ inside the new folder.

> Logger.js

```js
const { createLogger, transports, format, addColors } = require("winston");
const { combine, timestamp, label, printf, prettyPrint, colorize } = format;
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};
const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue",
};
addColors(colors);
const colorizer = colorize();
const defaultFormatter = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  prettyPrint(
    (info) => `${info.level.toUpperCase()} ${info.timestamp}  ${info.message}`
  )
);
const allTransports = [
  new transports.Console({
    format: combine(
      timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
      printf((info) =>
        colorizer.colorize(
          `${info.level}`,
          `${info.level.toUpperCase()} ${info.timestamp} : ${info.message}`
        )
      )
    ),
  }),
  new transports.File({
    filename: "logs/error.log",
    level: "error",
    format: defaultFormatter,
  }),
  new transports.File({
    filename: "logs/all.log",
    format: defaultFormatter,
  }),
];

const Logger = createLogger({
  level: level(),
  levels,
  format: combine(
    label({ label: "CUSTOM LOGGER" }),
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    prettyPrint()
  ),
  transports: allTransports,
});

module.exports = Logger;
```

2. Import the _Logger_ in _index.js_ and replace the following code in bottom

```js
app.listen(PORT, () =>
  Logger.info(`Example app listening on http://localhost:${PORT}`)
);
```

3. Make sure now your logs are appearing colorful and logged in file.

4. Create a _middlewares_ folder and create a _requestMiddleware.js_

> requestMiddleware.js

```js
const morgan = require("morgan");
const Logger = require("../utils/Logger");

const stream = {
  write: (message) => Logger.http(message),
};

const skip = (req, res) => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development" || res.statusCode === 400;
};
const requestMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
);

module.exports = requestMiddleware;
```

5. Import the request middleware intp _index.js_, add middleware in top.
6. emove _Logger_ import and change the app.listen to normal console.log

> index.js

```js
const express = require("express");
const { PORT } = require("./config");
const errorHandler = require("./error_handlers/errorHandler");
const { NotFoundError, CustomError } = require("./error_handlers/customErrors");
const requestMiddleware = require("./middlewares/requestMiddleware");
const app = express();

//Middlewares
// 1. Request middleware
app.use(requestMiddleware);

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/error", (req, res, next) => {
  const error = new CustomError(`Error in request at ${req.path}`);
  error.statusCode = 400;
  next(error);
});
//No-Contet for favicon.ico
app.get("/favicon.ico", (req, res) => res.status(204).json());
app.use((req, res, next) => {
  const message = "Request not found";
  const err = new NotFoundError(`${message} for path ${req.path}`);
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () =>
  console.info(`Example app listening on http://localhost:${PORT}`)
);
```

---

---

### MongoDB

We are using `mongoose` to connect with MongoDB.  
Mongoose is an Object Data Modeling (ODM) library for MongoDB in Node.js. It provides a powerful and easy-to-use way to interact with MongoDB databases by defining schemas and models that help you to manage data in a structured way.  
Run the following command in terminal in root of your application.

```sh
npm i mongoose
```

> We are connecting to MongoDB using mongoose by providing MongoDB URI. We are creating a model,controller,route for user.  
> Model used to define the schema.  
> Controller used to controll the actions perform on the model.  
> Routes used to configure the route for each controller actions.

1.  Create a _connectDB.js_ file in utils folder.

    <details>
      <summary>connectDB.js</summary>

    ```js
    const mongoose = require("mongoose");
    const { MONGO_URI } = require("../config");

    const connectDB = async () => {
      try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
      } catch (error) {
        console.error("Could not Connect to Database", error);
        process.exit(1);
      }
    };

    module.exports = connectDB;
    ```

    </details>

2.  Import the _connectDB_ into index.js, invoke the `connectDB` function, make sure our server listen only after the DB connected.

    <details>
      <summary>index.js</summary>

    ```js
    const express = require("express");
    const { PORT } = require("./config");
    const mongoose = require("mongoose");
    const connectDB = require("./utils/connectDB");
    const errorHandler = require("./error_handlers/errorHandler");
    const {
      NotFoundError,
      CustomError,
    } = require("./error_handlers/customErrors");
    const requestMiddleware = require("./middlewares/requestMiddleware");
    const app = express();
    app.use(requestMiddleware);

    //Connect to MongoDB
    connectDB();
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "Connection Error :"));

    app.get("/", (req, res) => res.send("Hello World!"));
    app.get("/error", (req, res, next) => {
      const error = new CustomError(`Error in request at ${req.path}`);
      error.statusCode = 400;
      next(error);
    });
    app.get("/favicon.ico", (req, res) => res.status(204).json());
    app.use((req, res, next) => {
      const message = "Request not found";
      const err = new NotFoundError(`${message} for path ${req.path}`);
      next(err);
    });
    app.use(errorHandler);

    //Make sure our server is listen after sucessfully connected with mongodb
    db.once("open", () =>
      app.listen(PORT, () =>
        console.info(`Example app listening on http://localhost:${PORT}`)
      )
    );
    ```

     </details>

3.  Create a folders _models,controllers,routes_ in the root folder.

4.  Inside models folder create _userModel.js_ and create a schema for user

    <details>
        <summary>userModel.js</summary>

    ```js
    const mongoose = require("mongoose");

    const userSchema = new mongoose.Schema({
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      email: {
        type: String,
      },
      employeeId: {
        type: String,
      },
      roles: {
        type: [String],
      },
      isActive: {
        type: Boolean,
      },
    });

    module.exports = mongoose.model("User", userSchema);
    ```

      </details>

5.  Inside controllers folder create _userController.js_

    <details>
      <summary>_userController.js</summary>

    ```js
    const USER = require("../models/userModel");

    const CREATE = async (req, res, next) => {
      try {
        const payload = req.body;
        const newUser = await USER.create(payload);
        return res.json(newUser);
      } catch (err) {
        console.error(err);
      }
    };
    const GET = async (req, res, next) => {};
    const UPDATE = async (req, res, next) => {};

    module.exports = { CREATE };
    ```

    </details>

6.  Inside routes folder create _index.js_ and _userRoute.js_

    <details>
      <summary>userRoute.js</summary>

    ```js
    const express = require("express");
    const { CREATE } = require("../controllers/userController");
    const router = express.Router();

    router.post("", CREATE);

    module.exports = router;
    ```

    </details>

    <details>
      <summary>index.js</summary>

    ```js
    const express = require("express");
    const router = express.Router();
    router.use("/user", require("./userRoute"));
    module.exports = router;
    ```

    </details>

#### Postman

> Postman is a popular collaboration platform for API development that provides a graphical user interface for sending HTTP requests and testing APIs. It is used by developers to test, develop, and document APIs.

7.  Test out our user creation endpoint using postman .

    > Endpoint : {{BASE-URL}}/api/user  
    > Method : POST  
    > body : { "firstName":"test", "lastName":"user", "email":"user@test.com", "employeeId":"AA100", "roles":["Employee"] }

    > Response : { "roles": [], "\_id": "63ee07428ca460b041652e82", "\_\_v": 0 }

8.  We have successfully created a user in the database. But, if you look at the Response it doesn't contain any user information. It's time to `DEBUG`. So, we can understand what's going on.

#### Debug

> Debugging is the process of finding and fixing errors and issues.

9. Let's console our req.body to make sure we receive the body of the request and invoke API again.

> userController.js

```js
try {
    const payload = req.body;
    console.log("User Payload :", JSON.stringify(payload));
    const newUser = await USER.create(payload);
    return res.json(newUser);
  }
```

> In terminal you can see the `User Payload : undefined`

10. We need to figure out the way to parse the _req.body_.

#### Express Middlewares

11. Express provides middlewares to parse Payload from the request.

> express.json() - When a client sends a JSON payload in a request, such as in the request body of a POST or PUT request, the express.json() middleware will automatically parse the JSON data and make it available in the req.body object of the Express request object.

> express.urlencoded() - When a client sends a URL-encoded payload in a request, such as in the request body of a form submission, the express.urlencoded() middleware will automatically parse the data and make it available in the req.body object of the Express request object.

12. Add the `express.json()` middleware in root folder index.js.

> index.js

```js
//Middlewares
// 1. Request middleware
app.use(requestMiddleware);
// 2. Request JSON body parser middleware
app.use(express.json());
```

13. Let's create a User again using API. This time we can able to see the req.body in our console output and successful response with all the user information too.

> User Payload : {"firstName":"test","lastName":"user","email":"user@test.com","employeeId":"AA100","roles":["Employee"]}

> Response : { "firstName": "test", "lastName": "user", "email": "user@test.com", "employeeId": "AA100", "roles": [ "Employee" ], "\_id": "63ee3525c2dce2ccf8bc4d23", "\_\_v": 0 }
