const Service = require("../models/service");
const User = require("../models/user");
const mongoose = require("mongoose");
const apps = require("../APP/apps");

module.exports = (app) => {
  app.post("/regservice", async (req, res) => {
    if (req.isAuthenticated()) {
      const user = await apps.findOne(User, req.user.id);
      //one user shouldnt have two services so check and elminate
      const service = new Service({
        name: req.body.name,
        description: req.body.description,
        Adress: {
          country: req.body.country,
          city: req.body.city,
          streetAddress: req.body.add,
        },
        contact: { phone: req.body.phone, email: req.body.email },
        owner: req.user.id,
      });

      service.save({ service }, (err, serv) => {
        if (err) {
          console.log(err);
        } else {
          //attach to user
          User.findOneAndUpdate(
            { _id: req.user.id },
            { provider: service._id },
            (err) => {
              if (err) {
                console.log(err);
              } else {
                //route to the providers home
                res.send("service registered");
              }
            }
          );
        }
      });
    } else {
      //loginroute
      res.send("not loged in ");
    }
  });
};
