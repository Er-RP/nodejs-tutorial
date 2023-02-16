# NOTES PART 2

- ## [MongoDB](#mongodb-1)
  - ## [Postman](#postman-1)
  - ## [Debug](#debug-1)
  - ## [Express Middlewares](#express-middlewares-1)

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
