const express = require("express");
const wrapasync = require("../utils/wrapasync");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

router.route("/signup")
.get(userController.renderSignUp)
.post(wrapasync(userController.signUp));

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect: "/login", failureFlash: true}), userController.login);


router.get("/logout",userController.logout);

module.exports = router;