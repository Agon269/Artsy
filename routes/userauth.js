const User = require("../models/user");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
module.exports = (app) => {
  //register
  app.post("/register", (req, res) => {
    User.register(
      { username: req.body.username },
      req.body.password,
      (err, user) => {
        if (err) {
          console.log(err);
        } else {
          passport.authenticate("local")(req, res, () => {
            //route after registration
            res.send("registered!");
          });
        }
      }
    );
  });
  //login
  app.post("/login", (req, res) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    req.login(user, (err) => {
      if (err) {
        res.send("there is a problem with password or something");
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, () => {
          res.send("success!");
        });
      }
    });
  });

  //get routes for generating form
  app.get("/login", (req, res) => {
    res.send("this is login");
  });

  app.get("/test", (req, res) => {
    if (req.isAuthenticated()) {
      res.send(req.user);
    } else {
      res.send("no cookie");
    }
  });

  //need to do logout
};
