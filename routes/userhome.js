const User = require("../models/user");
const mongoose = require("mongoose");
const apps = require("../APP/apps");

module.exports = (app) => {
  app.post("/regservice", async (req, res) => {
    if (req.isAuthenticated()) {
      //loged in user details like order change username password ....
      const user = await apps.findOne(User, req.user.id);
      console.log(user);
    } else {
      //loginroute
      res.redirect("/login");
    }
  });
};
