const express = require("express");
const { CREATE } = require("../controllers/userController");
const router = express.Router();

router.post("", CREATE);

module.exports = router;
