const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { dbURI } = require("./config");
const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middlewares/authMiddleware");

const app = express();
const PORT = 5000;

// middleware
app.use(express.json());
app.use(cookieParser());

// database connection
// const dbURI =
//   "mongodb+srv://shaun:test1234@cluster0.del96.mongodb.net/node-auth";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => console.log("Mongodb Connected"))
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.send("Welcome to JWT Tutorial"));
app.get("/privateRoute", requireAuth, (req, res) =>
  res.send("You have access to privateRoute . (You are logged in User)")
);
app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Server is up and running @ http://localhost:${PORT}`);
});
