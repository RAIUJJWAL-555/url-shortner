const express = require("express");
const { restrictTo } = require("../middleware/auth");
const URL = require("../models/url");
const { handleUserLogIn } = require("../controllers/user");

const router = express.Router();

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});
// router.get("/",handleUserLogIn,restrictTo("NORMAL"), async (req, res) => {
  router.get("/",restrictTo("NORMAL"), async (req, res) => {
    // if (!req.user) return res.redirect("/login");
    const allurls = await URL.find({createdBy: req.user._id });/**/
    return res.render("home", {
      urls: allurls,
    });
  });


  
  module.exports = router;
  