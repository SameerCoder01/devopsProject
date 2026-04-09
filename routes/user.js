const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const passport = require("passport");
const saveRedirectUrl = require("../middleware/saveRedirectUrl");
const { signup, login, logout, signupForm, userLoginForm, adminLoginForm, authChoice } = require("../controllers/user.js");

router.get("/", authChoice);

router.get("/login", authChoice);

router.get("/signup", signupForm);

router.post(
  "/signup",
  wrapAsync(signup),
);

router.get("/user/login", userLoginForm);

router.get("/admin/login", adminLoginForm);


//passport resets sessions so we have to save them in locals
router.post(
  "/user/login", saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/user/login",
    failureFlash: true,
  }),
  wrapAsync(login("user")),
);

router.post(
  "/admin/login", saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/admin/login",
    failureFlash: true,
  }),
  wrapAsync(login("admin")),
);

router.get("/logout", logout);

module.exports = router;
