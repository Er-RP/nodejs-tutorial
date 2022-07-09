const { Router } = require("express");
const router = Router();
const authControllers = require("../controllers/authControllers");

router.post("/signup", authControllers.SIGNUP);
router.post("/login", authControllers.LOGIN);
router.get("/signup", authControllers.SIGNUP_GET);
router.get("/login", authControllers.LOGIN_GET);
router.get("/logout", authControllers.LOGOUT);

module.exports = router;
