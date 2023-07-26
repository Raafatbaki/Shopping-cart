const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const user = require("../models/user");

passport.use(new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      User.findone({ email: email })
        .then((user) => {
          if (!user) {
            return done(null,false,req.flash("signInError", "this user not found"));
          }

          return user.comparePassword(password)
            .then((isMatch) => {
              if (!isMatch) {
                return done(null,false,req.flash("signinError", "wrong password"));
              }
              return done(null, user);
            })
            .catch((err) => {
              return done(err);
            });
        })

        .catch((err) => {
          return done(err);
        });
    }
  )
);

