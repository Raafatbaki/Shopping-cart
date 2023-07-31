const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/user");


passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});


passport.use("local-signIn", new localStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },
  (req, email, password, done) => {
    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return done(null, false, req.flash("signInError", "this user not found"));
        }

        if (!user.comparePassword(password)) {
          return done(null, false, req.flash("signinError", "wrong password"));
        }
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  }
));


