const express = require("express");
const router = express.Router();

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

router.post("/sign_in", (req, res) => {
  const username = req.body.username;
  res.cookie("username", username, { maxAge: ONE_WEEK });
  res.redirect("/");
});

router.get("/", (req, res) => {
  res.render("welcome");
});

module.exports = router;