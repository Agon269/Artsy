const Art = require("../models/art");
const User = require("../models/user");
const Purchase = require("../models/purchase");
const mongoose = require("mongoose");
const apps = require("../APP/apps");

module.exports = (app) => {
  //get the art to the display art page
  // get the art to the payment page
  //post payment to the order route

  app.get("/display/:art_id", async (req, res) => {
    console.log(req.params.art_id);
    res.render("artdisplay");
  });

  app.post("/order/:art_id", async (req, res) => {
    if (req.isAuthenticated()) {
      const user = await apps.findOne(User, req.user.id);

      const purchase = new Purchase({
        orderer: user.username,
        Adress: {
          country: req.body.country,
          city: req.body.city,
          streetAddress: req.body.add,
        },
        contact: { phone: req.body.pnum },
        date: req.body.date,
        paymentInfo: {
          cardnum: req.body.cardnum,
          cardsec: req.body.cardsec,
          ccv: req.body.ccv,
        },
        servicer: req.params.art_id,
        time: req.body.time,
      });

      purchase.save({ purchase }, (err, serv) => {
        if (err) {
          console.log(err);
        } else {
          //need to delete the art
          //then add the data of the art to purchased of the user array
          //then add the art to the sellers order array
          Art.findOneAndUpdate(
            { _id: req.params.art_id },
            { $push: { orders: order } },
            (err, ser) => {
              if (err) {
                console.log(err);
              } else {
                User.findOneAndUpdate(
                  { _id: req.user.id },
                  { $push: { ordered: order } },
                  (err, obj) => {
                    if (err) console.log(err);
                    else {
                      res.send("order succesfull");
                    }
                  }
                );
              }
            }
          );
          //attach to user
        }
      });
    } else {
      //loginroute
      res.send("not loged in ");
    }
  });
};
