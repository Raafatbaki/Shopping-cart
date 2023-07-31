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
    check("email").not().isEmpty().withMessage("please enter your email"),
    check("email").isEmail().withMessage("please enter valid email"),
    check("password").not().isEmpty().withMessage("please enter your password"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("please enter pssword more than 5 char"),
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
      let validationMassages = [];
      for (let i = 0; i < errors.errors.length; i++) {
        validationMassages.push(errors.errors[i].msg);
      }
      req.flash("signUpError", validationMassages);
      res.redirect("signup");
      return;
    }

    const newUser = new User({
      email: req.body.email,
      password: new User().hashPassword(req.body.password),
    });

    User.find({ email: req.body.email })
      .then((result) => {
        if (result) {
          req.flash("signUpError", "This Email is already exist");
          res.redirect("signUp");
          return;
        } else {
          newUser
            .save()
            .then((savedUser) => {
              res.send(savedUser);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

router.get("/signIn", (req, res, next) => {
  res.render("user/signIn");
});

router.post("/signIn", 
  passport.authenticate("local-signIn", {
    successRedirect: "profile",
    failureRedirect: "signIn",
    failureFlash: true,
  })
);

router.get("/profile", (req, res, next) => {
  console.log(req.user)
  res.render("user/profile")
})

module.exports = router;
