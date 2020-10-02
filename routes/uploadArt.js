const Art = require("../models/art");
const User = require("../models/user");
const mongoose = require("mongoose");
const apps = require("../APP/apps");

module.exports = (app) => {
  app.post("/uploadart", async (req, res) => {
    if (req.isAuthenticated()) {
      const art = new Art({
        name: req.body.name,
        description: req.body.description,
        Adress: {
          address1: req.body.address1,
          address2: req.body.address2,
        },
        artist: req.body.painter,

        owner: req.user._id,
      });

      art.save({ art }, (err, serv) => {
        if (err) {
          console.log(err);
        } else {
          //attach to user
          User.findOneAndUpdate(
            { _id: req.user.id },
            { $push: { arts: art.id } },
            (err) => {
              if (err) {
                console.log(err);
              } else {
                //route to the providers home
                res.redirect("/");
              }
            }
          );
        }
      });
    } else {
      res.redirect("sigin");
    }
  });

  app.get("/uploadart", (req, res) => {
    if (req.isAuthenticated()) {
      res.render("uploadart");
    } else {
      res.redirect("signin");
    }
  });
};
