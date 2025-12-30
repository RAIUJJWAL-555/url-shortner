const express = require("express");
const { handleUserSignUp, handleUserLogIn, handleUserLogOut } = require("../controllers/user");

const router = express.Router();

router.post("/",handleUserSignUp);
router.post("/login", handleUserLogIn);
router.get("/logout", handleUserLogOut);

module.exports = router;
