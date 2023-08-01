var express = require("express");
var router = express.Router();
const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const passport = require("passport");

/* GET users listing. */
router.get("/signUp", function (req, res, next) {
  let massagesError = req.flash("signUpError");
  res.render("user/signUp", { massages: massagesError });
});

router.post(
  "/signUp",
  [
    check("email")
      .not()
      .isEmpty()
      .withMessage("please enter your email")
      .isEmail()
      .withMessage("please enter valid email"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("please enter your password")
      .isLength({ min: 5 })
      .withMessage("please enter password more than 5 char"),
    check("confirm-password").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("password and confirm-password not matched");
      }
      return true;
    }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationMassages = errors.errors.map((error) => error.msg);
      req.flash("signUpError", validationMassages);
      res.redirect("signUp");
      return;
    }

    passport.authenticate("local-signUp", {
      session: false,
      successRedirect: "signIn",
      failureRedirect: "signUp",
      failureMessage: true,
    })(req, res, next);
  }
);

router.get("/signIn", (req, res, next) => {
  let massagesError = req.flash("signInError");
  res.render("user/signIn", { massages: massagesError });
});

router.post(
  "/signIn",
  [
    check("email")
      .not()
      .isEmpty()
      .withMessage("please enter your email")
      .isEmail()
      .withMessage("please enter valid email"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("please enter your password")
      .isLength({ min: 5 })
      .withMessage("please enter password more than 5 char"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationMassages = errors.errors.map((error) => error.msg);
      req.flash("signInError", validationMassages);
      res.redirect("signIn");
      return;
    }

    passport.authenticate("local-signIn", {
      successRedirect: "profile",
      failureRedirect: "signIn",
      failureFlash: true,
    })(req, res, next);
  }
);

router.get("/profile", isSignin, (req, res, next) => {
  res.render("user/profile");
});

router.get("/logout", isSignin, (req, res, next) => {
  req.logOut();
  res.redirect("/");
});

function isSignin(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect("signIn");
    return;
  }
  next();
}

module.exports = router;
