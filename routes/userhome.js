const User = require("../models/user");
const mongoose = require("mongoose");
const apps = require("../APP/apps");
const Art = require("../models/art");

module.exports = (app) => {
  app.get("/userhome", async (req, res) => {
    if (req.isAuthenticated()) {
      const user = await apps.findOne(User, req.user.id);
      const { purchased } = user;

      let userInfo = {
        userActive: true,
        userData: req.user,
        purch: purchased,
      };
      res.render("userpurchase", userInfo);
    } else {
      //loginroute
      res.redirect("/signin");
    }
  });

  app.get("/userart", async (req, res) => {
    if (req.isAuthenticated()) {
      var arts = await apps.getHisArt(Art, req.user.id);

      let userInfo = {
        userActive: true,
        userData: req.user,
        art: arts,
      };
      res.render("userart", userInfo);
    } else {
      //loginroute
      res.redirect("/signin");
    }
  });

  app.get("/deleteart/:art_id", async (req, res) => {
    const user = await apps.findOne(User, req.user.id);
    const arts = user.arts;

    let newArt = arts.filter((item) => {
      return item != req.params.art_id;
    });

    User.findByIdAndUpdate(
      { _id: req.user.id },
      { $set: { arts: [...newArt] } },
      (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          Art.deleteOne({ _id: req.params.art_id }, (err, obl) => {
            if (err) {
              console.log(err);
            } else {
              //should rediect to users purchase route
              res.redirect("/userart");
            }
          });
        }
      }
    );
  });

  app.get("/sold", async (req, res) => {
    if (req.isAuthenticated()) {
      const user = await apps.findOne(User, req.user.id);
      const { sold } = user;

      let userInfo = {
        userActive: true,
        userData: req.user,
        sold: sold,
      };
      res.render("sold", userInfo);
    } else {
      //loginroute
      res.redirect("/signin");
    }
  });
};
