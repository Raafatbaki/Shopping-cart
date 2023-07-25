var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");

/* GET users listing. */
router.get("/signUp", function (req, res, next) {
  res.render("user/signUp");
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
      console.log(errors);
      return;
    }
    res.send("ok");
  }
);

module.exports = router;
