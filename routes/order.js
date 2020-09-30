const Service = require("../models/service");
const User = require("../models/user");
const Order = require("../models/orderSchema");
const mongoose = require("mongoose");
const apps = require("../APP/apps");

module.exports = (app) => {
  app.post("/order/:service_id", async (req, res) => {
    if (req.isAuthenticated()) {
      const user = await apps.findOne(User, req.user.id);
      //const service = await apps.findOne(Service, req.params.service_id);

      //add order to buyer
      //add order to provider
      //create order
      const order = new Order({
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
        servicer: req.params.service_id,
        time: req.body.time,
      });

      order.save({ order }, (err, serv) => {
        if (err) {
          console.log(err);
        } else {
          Service.findOneAndUpdate(
            { _id: req.params.service_id },
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
