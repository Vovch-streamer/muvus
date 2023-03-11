import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";

import { apolloServer } from "./apolloServer.js";
import { authenticateUser, registerUser } from "./Users/users.service.js";

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.use(new LocalStrategy(authenticateUser));
// passport.use('local-signup', new LocalStrategy({
//   // by default, local strategy uses username and password, we will override with email
//   usernameField : 'login',
//   passwordField : 'passwordHash',
//   passReqToCallback : true // allows us to pass back the entire request to the callback
// },
// function(req, email, password, done) {

//   // asynchronous
//   // User.findOne wont fire unless data is sent back
//   process.nextTick(function() {

//   // find a user whose email is the same as the forms email
//   // we are checking to see if the user trying to login already exists
//   User.findOne({ 'local.email' :  email }, function(err, user) {
//       // if there are any errors, return the error
//       if (err)
//           return done(err);

//       // check to see if theres already a user with that email
//       if (user) {
//           return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
//       } else {

//           // if there is no user with that email
//           // create the user
//           var newUser            = new User();

//           // set the user's local credentials
//           newUser.local.email    = email;
//           newUser.local.password = newUser.generateHash(password);

//           // save the user
//           newUser.save(function(err) {
//               if (err)
//                   throw err;
//               return done(null, newUser);
//           });
//       }

//   });

//   });

// }));

const app = express();
const port = process.env.PORT || 3000;

app.use(
  session({
    // TODO: Remove from code
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);

app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(apolloServer));

app.post('/signup', cors(), bodyParser.json(), registerUser);

app.use(
  "/login/password",
  cors(), bodyParser.json(),
  passport.authenticate("local", { 
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
