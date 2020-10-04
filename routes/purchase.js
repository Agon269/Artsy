const Art = require("../models/art");
const User = require("../models/user");
const Purchase = require("../models/purchase");
const mongoose = require("mongoose");
const apps = require("../APP/apps");

module.exports = (app) => {
  //get the art to the display art page
  app.get("/display/:art_id", async (req, res) => {
    const art = await apps.findOne(Art, req.params.art_id);

    if (req.isAuthenticated()) {
      let disInfo = {
        userActive: true,
        userData: req.user,
        data: art,
      };
      res.render("artdisplay", disInfo);
    } else {
      let disInfo = {
        userActive: false,
        data: art,
      };
      res.render("artdisplay", disInfo);
    }
  });
  // get the art to the payment page

  app.get("/payment/:art_id", async (req, res) => {
    const art = await apps.findOne(Art, req.params.art_id);

    if (req.isAuthenticated()) {
      let payInfo = {
        userActive: true,
        userData: req.user,
        data: art,
      };
      res.render("payment", payInfo);
    } else {
      //need to route to login if they are not authed

      res.redirect("/signin");
    }
  });
  //post payment to the order route

  app.post("/purchase/:art_id", async (req, res) => {
    if (req.isAuthenticated()) {
      const theArt = req.params.art_id;
      const art = await apps.findOne(Art, theArt);
      const seller = art.owner;
      const artist = art.artist;
      price = parseInt(art.price.replace(/\D/g, ""));
      var tot = price + 5;
      const date = new Date();

      const purchase = new Purchase({
        purchaser: req.body.fname + " " + req.body.lname,
        Adress: { adress: req.body.Adress, email: req.body.email },
        date: date,
        seller: seller,
        artist: artist,
        totPaied: tot,
      });

      //filter art from user and move to sold
      const user1 = await apps.findOne(User, seller);
      const arts = user1.arts;

      let newArt = arts.filter((item) => {
        return item != theArt;
      });
      //newArt will be pushed to arts
      //theArt will be pushed to sold

      purchase.save({ purchase }, (err, serv) => {
        if (err) {
          console.log(err);
        } else {
          //here
          User.findByIdAndUpdate(
            { _id: seller },
            { $set: { arts: [...newArt] }, $push: { sold: art } },
            (err, docs) => {
              if (err) {
                console.log(err);
              } else {
                User.findByIdAndUpdate(
                  { _id: req.user.id },
                  { $push: { purchased: art } },
                  (err, docs) => {
                    if (err) {
                      console.log(err);
                    } else {
                      Art.deleteOne({ _id: theArt }, (err, obl) => {
                        if (err) {
                          console.log(err);
                        } else {
                          //should rediect to users purchase route
                          res.redirect("/");
                        }
                      });
                    }
                  }
                );
              }
            }
          );
        }
      });
    } else {
      res.redirect("/signin");
    }
  });
};
