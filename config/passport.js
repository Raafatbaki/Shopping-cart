const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/user");


passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, ("email"))
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
          return done(null, false, req.flash("signInError", "wrong password"));
        }
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  }
));

// passport.use('local-signUp' , new localStrategy ({
//   usernameField : 'email' ,
//   passwordField : 'password' ,
//   passReqToCallback : true
// } , ( req , email , password , done) => {
//   User.findOne({email : email} , (err , user)=>{
//       if(err){
//           return done(err)
//       }
//       if(user){
//           return done(null , false , req.flash('signupError' , 'this eamil already exist'))
//       }
//       const newUser = new User({
//           email : email ,
//           password : new User().hashPassword(password) ,
//       })

//       newUser.save((err , user)=>{
//          if(err){
//              return done(err)
//          }
//          return done(null , user) ;
//       })
//   })
// }))


passport.use('local-signUp', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, email, password, done) => {
  User.findOne({ email: email })
      .then((user) => {
          if (user) {
              return done(null, false, req.flash('signUpError', 'this email already exists'));
          }
          const newUser = new User({
              email: email,
              password: new User().hashPassword(password),
          });

          return newUser.save()
              .then((savedUser) => {
                  return done(null, savedUser);
              })
              .catch((err) => {
                  return done(err);
              });
      })
      .catch((err) => {
          return done(err);
      });
}));
