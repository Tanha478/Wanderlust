const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {savedRedirectUrl} = require("../middleware.js");

const userController = require("../controllers/users.js");
const user = require("../models/user.js");

router.route("/signup")
.get( userController.renderSignupForm )
.post( wrapAsync(userController.signUp))


router.route("/login")
.get( userController.renderLoginForm )
.post( passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}) , userController.login)

router.get("/logout", userController.logOut )

module.exports = router;